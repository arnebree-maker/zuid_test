// api/gemini-chat.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // API key ophalen uit Vercel
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY ontbreekt op de server");
    return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
  }

  try {
    // Body veilig inlezen (werkt 100% op Vercel)
    let rawBody = "";
    await new Promise((resolve) => {
      req.on("data", (chunk) => (rawBody += chunk));
      req.on("end", resolve);
    });

    let parsed = {};
    try {
      parsed = rawBody ? JSON.parse(rawBody) : {};
    } catch (e) {
      console.error("❌ Kon JSON niet parsen:", rawBody);
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    const { messages } = parsed;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing messages array" });
    }

    // 🚀 CALL NAAR GEMINI
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: messages.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }],
          })),
        }),
      }
    );

    if (!geminiResponse.ok) {
      const err = await geminiResponse.text();
      console.error("❌ Gemini API fout:", err);
      return res.status(500).json({ error: "Gemini API error" });
    }

    const data = await geminiResponse.json();

    const reply =
      data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("") || "Ik kon geen antwoord genereren.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ Server fout:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
