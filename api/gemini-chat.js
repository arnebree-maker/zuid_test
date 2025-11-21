// api/gemini-chat.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY ontbreekt op de server");
    return res.status(500).json({
      reply: "Serverfout: de API-sleutel (GEMINI_API_KEY) is niet ingesteld.",
    });
  }

  try {
    const { messages } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      console.error("Geen geldige messages array:", req.body);
      return res.status(400).json({
        reply: "Serverfout: gesprek kon niet worden ingelezen.",
      });
    }

    // 👉 Context / persoonlijkheid van Bot Zuid
    const contextText = `
Je bent **Bot Zuid**, de digitale ICT- en AI-assistent van Scholengroep Sint-Rembert
(SiVi en VLTI in Torhout).

Jouw taak:
- Help leerkrachten met vragen over ICT, Smartschool, hardware (beamers, laptops, wifi),
  software en veilig gebruik van AI in de klas.
- Geef korte, duidelijke en vriendelijke antwoorden in het Nederlands.
- Denk stap voor stap en stel verduidelijkingsvragen als dat nodig is.
- Verwijs waar zinvol naar de interne helpkanalen:
  - Topdesk voor technische problemen
  - De werkgroep Digitale Didactiek voor didactische/AI-vragen.
- Als een vraag buiten jouw domein valt (bv. privézaken), zeg dat eerlijk en
  probeer eventueel een veilig, algemeen advies te geven.

Belangrijke stijl:
- Toon begrip (“Ik begrijp dat dat lastig is in de les.”).
- Geef concrete stappen (1, 2, 3…) in plaats van vage uitleg.
- Geef geen gevoelige of privacy-schendende informatie.
`.trim();

    // 👇 Zet de context eerst, daarna de echte conversatiegeschiedenis
    const contents = [
      {
        role: "user",
        parts: [{ text: contextText }],
      },
      ...messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      })),
    ];

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=" +
      apiKey;

    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Gemini API-fout:", data);
      const msg =
        data?.error?.message || "Onbekende fout bij het antwoord genereren.";
      return res.status(500).json({
        reply:
          "Er ging iets mis bij het gesprek met Bot Zuid (Gemini API): " +
          msg,
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("") || "Ik kon geen antwoord genereren, probeer het even opnieuw.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Serverfout:", err);
    return res.status(500).json({
      reply:
        "Er ging iets mis op de server bij het ophalen van het antwoord van Bot Zuid.",
    });
  }
}
