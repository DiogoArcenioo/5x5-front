import { ImageResponse } from "next/og";

export const alt =
  "5x5 — jogo gratuito de draft e simulação de Major de Counter-Strike";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "72px 84px",
        color: "#f4f5f7",
        background:
          "radial-gradient(circle at 82% 12%, rgba(255,92,26,.28), transparent 36%), radial-gradient(circle at 12% 88%, rgba(47,184,198,.2), transparent 34%), #0a0c10",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 112,
            height: 112,
            background: "#ff5c1a",
            color: "#0a0c10",
            fontSize: 38,
            fontWeight: 900,
          }}
        >
          5x5
        </div>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 900 }}>
          5x5
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 50,
          maxWidth: 950,
          fontSize: 62,
          fontWeight: 900,
          lineHeight: 1.05,
        }}
      >
        Monte sua lineup. Dispute um Major.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 26,
          color: "#aeb7c8",
          fontSize: 27,
        }}
      >
        Draft histórico de Counter-Strike · gratuito no navegador
      </div>
    </div>,
    size,
  );
}
