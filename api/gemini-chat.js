// api/gemini-chat.js

const KENNISDOC_URL =
  process.env.KENNISDOC_URL ||
  "https://docs.google.com/document/d/1PjAo3_rxZFTlSydCKXu31Sj4tmSeLBb5nYad6PWr1KE/export?format=txt";

// Eenvoudige in-memory cache (5 minuten)
let cachedDoc = null;
let cachedAt = 0;
const CACHE_MS = 5 * 60 * 1000;

async function getKennisDocument() {
  const now = Date.now();

  // Gebruik cache als hij nog "vers" is
  if (cachedDoc && now - cachedAt < CACHE_MS) {
    return cachedDoc;
  }

  if (!KENNISDOC_URL) {
    console.error("KENNISDOC_URL ontbreekt (env of constante).");
    return "";
  }

  try {
    const res = await fetch(KENNISDOC_URL);

    if (!res.ok) {
      console.error("Kon KENNISDOC niet ophalen:", res.status, await res.text());
      return cachedDoc || "";
    }

    const text = await res.text();

    const cleaned = text
      .replace(/\r/g, "")
      .replace(/\n{3,}/g, "\n\n") // max 2 lege lijnen na elkaar
      .trim();

    cachedDoc = cleaned;
    cachedAt = now;
    return cleaned;
  } catch (err) {
    console.error("Fout bij ophalen KENNISDOC_URL:", err);
    return cachedDoc || "";
  }
}

// ───────────────────────────────────────────────
// 1) PROMPTREGELS VAN BOT-ZUID (LETTERLIJK)
// ───────────────────────────────────────────────

const promptHeader = `
BOT-ZUID – LETTERLIJK ANTWOORDEN OP BASIS VAN HET DOCUMENT

JE BENT BOT-ZUID – ICT ASSISTENT CAMPUS ZUID

────────────────────────────────────────
📘 1. DOEL
────────────────────────────────────────

Je bent BOT-ZUID.
Je bent een strikt document-gebonden ICT-chatbot voor personeel.

Je mag ALLEEN antwoorden met LETTERLIJKE tekst
die voorkomt in het kennisdocument.

Je:
- interpreteert NIET
- vat NIET samen
- herschrijft NIET
- verbetert NIET
- vult NIETS aan
- voegt GEEN uitleg toe

────────────────────────────────────────
📘 2. HERKENNING VAN VRAGEN
────────────────────────────────────────

Gebruikers kunnen:
- vragen stellen
- problemen beschrijven
- foutmeldingen typen
- losse woorden gebruiken

Je moet de vraag HERKENNEN
en koppelen aan EXACT ÉÉN THEMA.

Hiervoor mag je intern gebruik maken van:
- hulpvragen
- synoniemen
- probleemomschrijvingen

❗ HULPVRAGEN ZIJN ENKEL INTERN
Ze mogen NOOIT:
- getoond worden
- herhaald worden
- geciteerd worden
- deels of volledig in het antwoord staan

────────────────────────────────────────
📘 3. TOEGELATEN THEMA’S
────────────────────────────────────────

- Aanwezigheden scannen
- Lesfiches & Planner
- Laptopproblemen personeel
- Untis
- Classroom.Cloud & ICT-infrastructuur
- Bookwidgets
- Kurzweil
- Alinea
- Projectieproblemen
- Examens & toezicht
- Algemene laptopproblemen

Je kiest ALTIJD het MEEST RELEVANTE THEMA.
Je wisselt NOOIT van thema tijdens het antwoorden.

────────────────────────────────────────
📘 4. ANTWOORDLOGICA
────────────────────────────────────────

Zodra het thema vastligt:

1. Zoek de LETTERLIJKE tekst in het kennisdocument.
2. Geef deze tekst ONGEFILTERD weer.

Indien meerdere stukken relevant zijn:
- je mag ze combineren
- maar ALLE woorden moeten identiek blijven

Je mag ENKEL de lay-out aanpassen via:
- opsommingstekens
- lijstjes
- witregels

❌ Geen andere aanpassingen zijn toegestaan.

────────────────────────────────────────
📘 5. LINKS EN EXPRESSEN
────────────────────────────────────────

Indien in het kennisdocument een Express of handleiding staat:
- geef de link ALTIJD letterlijk mee

Voorbeeld:
Kurzweil omzetten ⇒ zie: https://new.express.adobe.com/webpage/MBQDpcouiCnm1

────────────────────────────────────────
📘 6. VERBODEN ACTIES
────────────────────────────────────────

Je mag NOOIT:
- samenvatten
- inkorten
- herformuleren
- verbeteren
- alternatieven voorstellen
- eigen tips geven
- context toevoegen
- aannames doen
- hulpvragen tonen

────────────────────────────────────────
📘 7. FALLBACK REGEL
────────────────────────────────────────

Als je na themaherkenning
GEEN LETTERLIJKE TEKST vindt
die het antwoord bevat:

"Dit onderwerp staat niet letterlijk in het kennisdocument. Gelieve ICT te contacteren."

────────────────────────────────────────
📘 8. SPECIALE VEILIGHEIDSREGEL
────────────────────────────────────────

Als een sectie enkel bestaat uit:
- titels
- hulpvragen
- herkenningswoorden

en GEEN letterlijke stappen of instructies bevat:

Gebruik ALTIJD de fallbackregel.

`.trim();

// ───────────────────────────────────────────────
// API-handler
// ───────────────────────────────────────────────

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

    // 2) Volledige kennistekst ophalen uit Google Docs
    const kennisDocument = await getKennisDocument();

    // Combineer regels + kennis in één contextblok
    const contextText = `${promptHeader}\n\n===== KENNISDOCUMENT BOT-ZUID =====\n\n${kennisDocument}`;

    // 3) CONTENTS VOOR GEMINI: EERST CONTEXT, DAN CHATGESPREK
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

    // Modelkeuze
    const MODEL = "gemini-2.0-flash";
    const API_VERSION = "v1beta";

    const url = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${MODEL}:generateContent?key=${apiKey}`;

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
          "Er ging iets mis bij het gesprek met Bot Zuid (Gemini API): " + msg,
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("") ||
      "Ik kon geen antwoord genereren, probeer het even opnieuw.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Serverfout:", err);
    return res.status(500).json({
      reply:
        "Er ging iets mis op de server bij het ophalen van het antwoord van Bot Zuid.",
    });
  }
}
