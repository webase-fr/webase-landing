# Recevoir les demandes sur Gmail, sans mot de passe Gmail

## Circuit réel

Formulaire → Server Action Next.js → validation Zod → limites partagées Redis → API Resend → `luis.doudeau@gmail.com`.

Le client voit un succès uniquement si Resend accepte la demande avec un identifiant. L’acceptation ne garantit pas l’arrivée dans la boîte principale : vérifier les statuts de livraison et la réception lors de la mise en service. Aucun succès simulé, aucun mailto utilisé comme mécanisme de soumission.

## Mise en service

Le domaine public confirmé est `webase.fr`. La configuration locale utilise `SITE_URL=https://webase.fr`. L’expéditeur prévu est `Webase <projets@mail.webase.fr>`, avec réception sur `luis.doudeau@gmail.com`. Ce champ prépare l’envoi ; il ne signifie pas que Resend a vérifié le domaine.

1. Créer un compte [Resend](https://resend.com/), puis ajouter le sous-domaine d’envoi `mail.webase.fr`.
2. Ajouter chez le registrar les enregistrements DNS fournis par Resend et attendre le statut « verified ». Utiliser les valeurs affichées par le fournisseur, pas des valeurs copiées d’un exemple.
3. Créer une clé limitée à l’envoi sur ce domaine. La placer dans `RESEND_API_KEY`, jamais dans le code ni dans une variable NEXT_PUBLIC.
4. Définir `MAIL_FROM="Webase <projets@mail.webase.fr>"` et `MAIL_TO=luis.doudeau@gmail.com`. L’expéditeur doit appartenir au domaine vérifié. Le destinataire peut rester Gmail. Le Reply-To contient l’e-mail du client.
5. Créer une base Redis Upstash pour les compteurs d’abus, idéalement dans l’UE. Copier `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN`.
6. Renseigner les autres paramètres de `.env.example` dans `.env.local`, puis dans l’environnement de l’hébergeur. Les modifier dans la plateforme impose un redéploiement.
7. Exécuter `pnpm preflight`. Ce contrôle vérifie les formats et la présence de configuration sans afficher les secrets et sans envoyer de mail.
8. Depuis chaque parcours, envoyer une demande de test clairement nommée, vérifier sa livraison dans Resend et sa réception dans Gmail, puis utiliser « Répondre » pour confirmer le Reply-To. Les tests automatiques utilisent exclusivement des transports simulés.

Resend documente [la configuration de domaine](https://resend.com/docs/dashboard/domains/introduction), [l’intégration Next.js](https://resend.com/docs/send-with-nextjs) et [l’idempotence](https://resend.com/docs/dashboard/emails/idempotency-keys). Redis utilise [l’API REST officielle Upstash](https://upstash.com/docs/redis/features/restapi).

## Protection et confidentialité

- Champs bornés, validation client et serveur, URL http(s) contrôlées, consentement d’information vérifié.
- Texte brut et HTML échappé pour toutes les réponses ; ni pièces jointes arbitraires, ni accès à des fichiers ou URL fournis par le visiteur.
- Destinataire fixé côté serveur : le client ne peut pas utiliser l’application pour expédier à d’autres personnes.
- Piège antispam sans faux message de réussite.
- Limites atomiques : 5 tentatives par e-mail et par heure, 20 par IP de confiance si disponible, 100 globalement. Ces limites portent sur les tentatives validées, même si le fournisseur mail échoue ensuite.
- Compteurs identifiés par empreinte SHA-256 ; aucun contenu de demande dans Redis. Expiration après une heure.
- Limiteur mémoire uniquement hors production ; en production, l’absence ou la panne de Redis bloque l’envoi avec une erreur explicite.
- Ne configurer `TRUSTED_IP_HEADER` que si le proxy écrase la valeur fournie par le visiteur. Pour Vercel, utiliser `x-vercel-forwarded-for`. Les limites e-mail et globale restent actives sans IP.
- Clé d’idempotence fondée sur l’identifiant d’envoi et le contenu normalisé. Une nouvelle tentative identique sur la même page réutilise la clé ; Resend la conserve 24 h.
- Aucun contenu client ni secret dans les journaux d’application ; seulement un code d’erreur.
- Pas de confirmation automatique envoyée à une adresse client non vérifiée.
- La mémoire de la page conserve les réponses pendant une erreur. Une fermeture ou un rechargement de page les efface.
- Nettoyer les échanges sans suite de la boîte du studio à 12 mois, conformément à la politique affichée. Configurer aussi les durées de conservation des prestataires.

## Diagnostic

| Code dans les journaux         | Action                                                       |
| ------------------------------ | ------------------------------------------------------------ |
| MAIL_NOT_CONFIGURED            | Renseigner la clé Resend et l’expéditeur                     |
| MAIL_CONFIG_INVALID            | Corriger le format des adresses                              |
| MAIL_PROVIDER_401 / 403        | Vérifier la clé, ses droits et le domaine                    |
| MAIL_PROVIDER_429              | Vérifier le quota ou la limitation du fournisseur            |
| MAIL_CONNECTION_FAILED         | Vérifier la connectivité et la disponibilité Resend          |
| MAIL_PROVIDER_INVALID_RESPONSE | Examiner le statut fournisseur, ne pas déclarer de livraison |
| RATE_LIMIT_NOT_CONFIGURED      | Configurer Redis en production                               |
| RATE_LIMIT_UNAVAILABLE         | Vérifier Redis ; aucun repli silencieux en mémoire           |

Une clé API et un domaine vérifié restent indispensables : aucun service ne peut expédier de manière fiable au nom de Webase sans autoriser un expéditeur. Le mot de passe de Gmail n’est jamais nécessaire.
