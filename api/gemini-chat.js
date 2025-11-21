export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      reply: "Serverfout: GEMINI_API_KEY ontbreekt.",
    });
  }

  try {
    const { messages } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        reply: "Serverfout: geen geldige berichten ontvangen.",
      });
    }

const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=" +
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
      return res.status(500).json({
        reply:
          "Gemini API-fout: " +
          (data.error?.message || JSON.stringify(data)),
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("") || "Ik kon geen antwoord genereren.";

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({
      reply: "Serverfout: " + (err.message || String(err)),
    });
  }
}
