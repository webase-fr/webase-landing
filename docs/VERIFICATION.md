# Vérifications de la refonte

Historique de la revue locale du 7 septembre 2026. Les contrôles Firefox, les correctifs d’hydratation et la décision de publication du 8 septembre sont détaillés dans [la revue de production](REVUE-PRODUCTION.md).

## Code et contrats

- `pnpm check` : ESLint, génération des types Next, TypeScript strict et 48 tests Vitest réussis.
- `pnpm build` et `pnpm format:check` : réussis. Le serveur de production a passé le contrôle HTTP de 15 variantes de routes et 40 liens internes.
- Validation client/serveur, bornes de saisie, prix indicatifs, recommandations d’offres et validation des projets.
- Questionnaires React express et complet : étapes, validation, récapitulatif, retour arrière, conservation après erreur, identifiant stable et blocage du double clic.
- Server Action : payloads valides/invalides, champ piège, limites de taille et réponses d’erreur sans faux succès.
- Transport Resend simulé : destinataire fixe, Reply-To, HTML échappé, texte brut, contenu des deux briefs, idempotence et erreurs fournisseur.
- Limitation Redis simulée et mémoire locale : compteurs, expiration, indisponibilité et refus en production sans configuration.
- `pnpm audit --prod` : aucune vulnérabilité connue signalée lors du contrôle. Ce constat dépend de la base d’avis à cette date.

## Navigateur

13 tests Playwright réussis en développement puis sur le build final de production, dans Chromium avec un profil isolé dans le projet. Le navigateur intégré à l’application n’était pas disponible ; aucun profil personnel n’a été utilisé.

- Dix pages, aux largeurs 320, 390, 768, 1024 et 1440 px : aucun débordement horizontal détecté, aucun échec JavaScript/erreur console lors du parcours.
- Menu mobile : ouverture, navigation, Échap, retour du focus et fermeture lors du passage au bureau.
- Brief express hydraté : validation, progression, estimation indicative et conservation des réponses en arrière.
- Accueil : accès direct aux deux formats depuis la section ciblée par le bouton principal.
- Aide au choix : recommandation, navigation et conservation d’une page unique avec gestion autonome jusque dans le brief complet.
- FAQ native au clavier.
- Axe : aucune violation détectée pour WCAG 2 A/AA et 2.1 AA sur l’accueil, les offres, le contact, la sélection des briefs, les premières étapes express/complet et les réalisations ; contrôle aussi effectué sur l’aide au choix ouverte avec un résultat.
- Captures consultées sur mobile et ordinateur : accueil, tarifs, briefs, sélection et aide au choix. Fichiers dans `.cache/visual-review/`, ignorés par Git.

Un contrôle automatique Axe ne constitue pas une certification d’accessibilité. Les lecteurs d’écran, Safari/iOS, Firefox, le zoom navigateur et les appareils physiques restent à examiner avant une validation d’accessibilité exhaustive.

## Fluidité

Une comparaison locale de l’accueil a mesuré environ 824 Ko de JavaScript compressé transféré en développement contre 152 Ko dans le build de production précédent les derniers ajouts. Les mesures locales initiales donnaient zéro déplacement de mise en page et aucune tâche longue sur la seconde visite. Elles ne représentent ni un réseau mobile réel ni les performances d’un hébergement encore non choisi.

Sur le build final, avec Chromium, processeur ralenti quatre fois et réseau local non limité :

| Largeur | JS transféré | LCP    | CLS | Intervalle entre images au défilement, 95e percentile | Intervalles > 50 ms |
| ------- | ------------ | ------ | --- | ----------------------------------------------------- | ------------------- |
| 390 px  | 154 Ko       | 112 ms | 0   | 17 ms                                                 | 0 / 119             |
| 1440 px | 154 Ko       | 120 ms | 0   | 17 ms                                                 | 0 / 119             |

Le défilement a été exercé sur 120 cycles `requestAnimationFrame`. Ces observations ne sont pas des données de terrain ni un score Lighthouse. Résultat brut local : `.cache/performance-final.json`.

Un incident du serveur de développement a ensuite été reproduit : connexion HMR en échec et contrôles HTML sans hydratation. Le redémarrage du serveur a rétabli les interactions ; la suite navigateur a alors passé intégralement. Le serveur de développement doit être redémarré après une modification de ses dépendances.

La navigation garde le préchargement Next standard. La route dynamique d’estimation possède un état de chargement pour permettre une réponse visuelle pendant l’attente du serveur. La navbar ne calcule plus de flou de fond et aucun défilement animé global n’est imposé.

## Services externes et publication

La boîte destinataire confirmée est `luis.doudeau@gmail.com`. Les tests simulent Resend et Redis : aucun message réel n’a été envoyé pendant la vérification. Il faut encore renseigner la clé Resend, un expéditeur sur domaine vérifié et Redis, puis effectuer un test de livraison depuis chacun des trois formulaires. Aucun mot de passe Gmail n’est requis.

Le domaine public `https://webase.fr` a été confirmé et renseigné dans la configuration locale. L’expéditeur `Webase <projets@mail.webase.fr>` est préparé, mais sa vérification DNS dans Resend reste à effectuer. Les informations de l’hébergeur restent à renseigner. `pnpm preflight` contrôle les champs requis sans exposer les secrets. L’indexation reste désactivée si `SITE_URL` est vide ; avec le domaine renseigné, le prochain build autorise l’indexation et génère le sitemap public. Le portfolio est volontairement vide jusqu’à l’ajout de projets réels. Aucun lien de réservation de rendez-vous n’a été fourni ; aucun agenda fictif n’a été ajouté.

Après configuration du domaine, `pnpm preflight` signale six paramètres manquants : `RESEND_API_KEY`, les deux paramètres Upstash et les trois paramètres d’hébergement. Il reste à les renseigner, vérifier le domaine d’envoi et tester la livraison avant activation des services et publication.

Aucun déploiement ni publication n’a été effectué.
