import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
/** Shared social card, same identity as the site: ivory, ink, logo blue. */
export function renderOgImage({
  label,
  title,
  accent,
  footer,
}: {
  label: string;
  title: string;
  accent: string;
  footer: string;
}) {
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
        <span style={{ fontSize: 15, letterSpacing: 3, color: "#62685e" }}>{label}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: title.length > 26 ? 72 : 84,
          lineHeight: 1.05,
          letterSpacing: -4,
        }}
      >
        <span>{title}</span>
        <span style={{ color: "#345bff" }}>{accent}</span>
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
        <span>{footer}</span>
        <span style={{ color: "#345bff", fontSize: 28 }}>↗</span>
      </div>
    </div>,
    ogSize,
  );
}
