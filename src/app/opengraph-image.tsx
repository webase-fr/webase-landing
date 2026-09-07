import { ImageResponse } from "next/og";
export const alt =
  "Webase — Votre savoir-faire. Un site à sa hauteur. Studio web indépendant à Orléans.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f8f8f2",
        padding: "65px 72px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#20261f",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 38, fontWeight: 700, letterSpacing: -2 }}>webase.</span>
        <span style={{ fontSize: 15, letterSpacing: 3, color: "#62685e" }}>
          STUDIO WEB INDÉPENDANT · ORLÉANS
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 84,
          lineHeight: 1.05,
          letterSpacing: -5,
        }}
      >
        <span>Votre savoir-faire.</span>
        <span style={{ color: "#345bff" }}>Un site à sa hauteur.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #dcded4",
          paddingTop: 28,
          fontSize: 19,
          color: "#62685e",
        }}
      >
        <span>Design & développement pour les indépendants et TPE.</span>
        <span style={{ color: "#345bff", fontSize: 28 }}>↗</span>
      </div>
    </div>,
    size,
  );
}
