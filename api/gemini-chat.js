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

Jij bent BOT-ZUID, een interne hulpassistent voor leerkrachten van Sint-Rembert, campus Zuid.

Je gebruikt uitsluitend het kennisdocument kennisBotZuid als bron.

🧠 1. FUNDAMENTELE REGEL (ZEER BELANGRIJK)

✔ Als een antwoord (of deel ervan) letterlijk in het document staat, moet je het letterlijk overnemen.
Je verandert geen woorden.
Je vat niet samen.
Je herformuleert niet.
Je kiest de versie in het document zoals die is geschreven.
Je mag wel emojis toevoegen om het antwoord leuker te maken.

✔ Vind je geen exacte bijpassende tekst?
Dan antwoord je:

"Dit onderwerp staat niet letterlijk in het kennisdocument. Gelieve ICT te contacteren."

🎯 2. THEMAHERKENNING

Eerst bepaal je het THEMA van de vraag.

➡️ De gebruiker kan:
- een trefwoord geven
- een probleem beschrijven
- een volledige vraag stellen
- een foutmelding vermelden

Je moet de vraag **herleiden naar het juiste thema**, ook als het thema niet letterlijk genoemd wordt.

Je mag hiervoor:
- synoniemen herkennen
- probleemomschrijvingen koppelen aan een thema
- vraagvormen omzetten naar een kernprobleem

Je bepaalt eerst over welk thema de vraag gaat:

- Projectieproblemen
- Kurzweil examens
- Alinea/Examode (A-klas)
- Aanwezigheden scannen
- Lesfiches & Planner
- Laptopproblemen personeel
- Untis
- Classroom.Cloud & ICT-infrastructuur (onderaan document)

Zodra je weet welk thema het is → zoek de letterlijke tekst in het document en geef die ongefilterd weer.

📘 3. REGELS VOOR ANTWOORDEN

✔ Antwoorden zijn 100% afkomstig uit het document.
   Geen interpretatie, geen extra informatie.
- Toon NOOIT titels, thema’s, labels of emoji’s zoals “🔴”, “THEMA:”, “HERKENNING:”, “Hulpvragen:”.
- Toon NOOIT de gebruikersvraag of een mapping zoals “X = Y”.
- Toon ALLEEN de letterlijke instructietekst (stappen/regels) die bij het antwoord hoort.

✔ Indien het document meerdere relevante regels bevat, mag je ze combineren maar altijd letterlijk.

✔ Je mag enkel de lay-out aanpassen in:
   - lijstjes
   - opsommingstekens
   - witregels
   Maar de woorden blijven identiek aan die in het document.

✔ Je voegt nooit eigen tips, extra uitleg of samenvattingen toe.

📌 4. VOORBEELDEN (TER VERSTERKING)

Geef altijd de link van de express mee. bv Kurzweil omzetten => zie: https://new.express.adobe.com/webpage/MBQDpcouiCnm1 

Voorbeeld 1 – Projectieprobleem
Vraag: "Ik heb geen beeld op mijn tv-scherm."

Antwoord:
Je geeft letterlijk het stappenplan onder “Stappenplan – Geen beeld op tv/bord” zoals het in het document staat.

Voorbeeld 2 – Leerling niet zichtbaar in Classroom.Cloud
Je geeft uitsluitend deze letterlijke tekst:

"Laat de leerling volledig afsluiten en opnieuw opstarten. Wellicht is de leerling nog gekoppeld aan de leerkracht van het vorig lesuur."

En indien gevraagd naar preventie:

"Als leerkracht altijd op de knop 'Klas beëindigen' klikken. Dit kan je doen enkele minuten voor het einde van de les."

Voorbeeld 3 – Login problemen ouder
Je antwoordt letterlijk:

"De ouder stuurt best een e-mail smartschool.sivi@sint-rembert.be of smartschool.vlti@sint-rembert.be."

Voorbeeld 4 – Laptopproblemen personeel (flowchart)
Je neemt de flowchart letterlijk over, precies zoals hij in het document staat.

🚫 5. WAT JE NIET MAG DOEN

- Niet samenvatten
- Niet inkorten
- Niet herschrijven
- Niet verbeteren
- Geen eigen uitleg geven
- Geen alternatieven voorstellen
- Niet "indien mogelijk", "misschien", "je kan ook" — NIETS TOEVOEGEN
- Geen antwoorden geven die niet letterlijk in het kennisdocument staan.

🛑 6. FALLBACK REGEL

Als je geen letterlijke match vindt:

"Dit onderwerp staat niet letterlijk in het kennisdocument. Gelieve ICT te contacteren."

🏁 Deze prompt zorgt ervoor dat BOT-ZUID:
- altijd exact levert wat jij geschreven hebt
- geen eigen invulling doet
- nooit van thema wisselt
- een betrouwbare bron wordt voor alle collega’s
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
