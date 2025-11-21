// api/gemini-chat.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY ontbreekt op de server");
    return res
      .status(500)
      .json({ reply: "Serverfout: GEMINI_API_KEY is niet ingesteld." });
  }

  try {
    // In Vercel wordt req.body al als JSON aangeleverd (zoals we zagen bij de test)
    const { messages } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      console.error("Geen geldige messages array:", req.body);
      return res
        .status(400)
        .json({ reply: "Serverfout: geen geldige berichtenlijst ontvangen." });
    }

    // ➜ Gebruik de v1beta-endpoint, die zeker met jouw AI Studio key werkt
const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=" +
  apiKey;


    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: messages.map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        })),
      }),
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("❌ Gemini API fout:", data);
      const msg =
        data.error?.message ||
        JSON.stringify(data) ||
        "Onbekende fout van Gemini.";
      // Let op: we stoppen de fout TEVENS in 'reply' zodat jij hem in de chat ziet
      return res.status(500).json({
        reply: "Gemini API-fout: " + msg,
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("") || "Ik kon geen antwoord genereren.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ Serverfout:", err);
    return res.status(500).json({
      reply:
        "Serverfout bij het praten met Gemini: " + (err.message || String(err)),
    });
  }
}
