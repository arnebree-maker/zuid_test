import React from "react";

export default function Examples() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #eff6ff, #ffffff, #eef2ff)",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#111827", marginBottom: "1.5rem" }}>
        Voorbeelden met AI-tools
      </h1>

      <p style={{ color: "#374151", marginBottom: "1rem" }}>
        Hier zie je een paar concrete toepassingen van AI in het onderwijs.
      </p>

      <ul style={{ color: "#1f2937", marginLeft: "1.25rem" }}>
        <li>Gebruik ChatGPT om reflectievragen te genereren.</li>
        <li>Laat Gemini een samenvatting maken van een tekst.</li>
        <li>Maak interactieve presentaties met Genially of Gamma.</li>
      </ul>

      <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
        Terug naar de hoofdsite? Sluit dit tabblad of ga naar{" "}
        <a href="https://zuid-test.vercel.app" style={{ color: "#2563eb", textDecoration: "underline" }}>
          het portaal
        </a>.
      </p>
    </div>
  );
}