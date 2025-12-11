
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
- Geen antwoorden geven die niet letterlijk in het document staan

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
    // 2) VOLLEDIGE KENNISTEKST (KENNISBOTZUID)
    //    → letterlijk overgenomen uit je document
    // ───────────────────────────────────────────────
    const kennisDocument = `
Chatbot
Bookwidgets:
Activeren van bookwidgets: https://new.express.adobe.com/webpage/YutJ3fIVAh7PU 
Kennis van Bookwidgets kennisbank: https://kb-nl.bookwidgets.com/ 
Werken van resultaten van leerlingen terugsturen: https://www.youtube.com/watch?v=cvO-GYA46FA 
Vragen imorteren, verplaatsen en verwijderne: youtube.com/watch?v=LNoOTPLTBGw&feature=youtu.be 
BW delen met collega’s: youtube.com/watch?v=jT2kKCHAXgM&feature=youtu.be 
Youtube filmpjes toevoegen: youtube.com/watch?v=7N1RqWG8esY&feature=youtu.be 
Gekregen Bookwidgets naar eigen map en koppelen aan smartschool: youtube.com/watch?v=pFDv7Xg52XE&feature=youtu.be 
Hoe punten importeren in SmartSchool: https://www.youtube.com/watch?v=ibqwN3jiPss&feature=youtu.be 

Aanwezigheden scannen: 
https://new.express.adobe.com/publishedV2/urn:aaid:sc:EU:6d6845c5-9925-4c38-8b01-7cf4f3c0ca23?promoid=Y69SGM5H&mv=other 
Scenario 1: Leerling is alleen (bijv. IT, onthaal, te laat)
•	Actie: Elke individuele leerling moet gescand worden.
•	Opslaan: Klik WEL op opslaan na de laatste scan.
Scenario 2: Volledige klasgroep
•	Optie 1 (Scannen): Scan alle leerlingen. Klik NIET op opslaan (systeem doet dit automatisch).
•	Optie 2 (Via Laptop):
1.	Refresh de pagina.
2.	Donkergroen of geel? Status laten staan.
3.	Lichtgroen? Status aanpassen (betekent nog niet bevestigd).
Algemene regels:
•	Afwezigheden ieder lesuur ingeven.
Bij 2 aansluitende lesuren (blokuren): slechts één keer ingeven

Projectieproblemen (geen beeld, projectie werkt niet)
Stappenplan : werken met meerdere schermen
https://new.express.adobe.com/publishedV2/urn:aaid:sc:EU:6d6845c5-9925-4c38-8b01-7cf4f3c0ca23?promoid=Y69SGM5H&mv=other 

1.	Projectie op 3 schermen? Als alles werkt: niets aanpassen.
Geen idee hoe? https://www.youtube.com/watch?v=JA-Yrfdz0t0 
2.	Kabel: Zit de USB-C goed in de laptop? (Tip: als de laptop oplaadt, zit de kabel correct) .
3.	Staat het kanaal goed? https://www.youtube.com/watch?v=E3vwykYUwlk 
4.	Scherminstellingen dupliceren:
o	Rechtermuisklik op bureaublad > Beeldscherminstellingen.
o	Scroll naar 'Meerdere beeldschermen' en kies Deze beeldschermen dupliceren.
5.	Flikkerend beeld (Geavanceerd):
o	Ga naar Geavanceerd beeldscherm in instellingen.
o	Selecteer de TV of Monitor.
o	Zet de frequentie op 30 Hz (of 29,97 Hz).

Geluid werkt niet meer (Laptop speakers)
1.	Klik op het Windows-logo en ga naar Instellingen > Geluid.
2.	Scroll naar beneden en klik op Assistentie.
3.	Klik op Ja bij de vraag om toestemming.
4.	De laptop installeert het stuurprogramma opnieuw, waarna het geluid weer werkt.

Classroomcloud
Je kan alles vinden op deze website: https://new.express.adobe.com/webpage/hrQ5GgNjvoH7E 
-Welke browser gebruik je het best?
-Wat moet je doen als de leerlingen niet zichtbaar zijn?
-Wat moet je doen als de leerling geen klascode kan ingeven?
-Wanneer zijn de leerlingen zichtbaar?

Hoe werkt Alinea? 
Je kan alles hier vinden: https://new.express.adobe.com/webpage/gNWhE7OGkwp3s 

Kurzweil
Hoe werkt kurzweil?
https://new.express.adobe.com/webpage/MBQDpcouiCnm1 
Hoe installeer ik Kurzweil als leerkracht?
1.	Ga naar de app Bedrijfsportal op je gekregen laptop van de school.
2.	Zoek de ongeïnstalleerde app Kurzweil in Bedrijfsportal.
3.	Klik op Installeren.
4.	Lukt het niet? Controleer of je alle Windows Updates gedaan hebt (Systeeminstellingen > Windows Update > Naar updates zoeken).

Hoe Kurzweil omzetten? 
________________________________________
2. Kurzweil: Examens voorbereiden (Voor Leerkrachten)
Tips bij het opstellen van het examen:
•	Voorzie volle antwoordlijnen, geen stippellijnen en geen lege ruimtes.
•	Voorzie ruim voldoende plaats om te antwoorden.
•	Leerlingen kunnen gebruik maken van de invulfunctie, maar voor kleur- of doorstreepopdrachten lukt dit niet altijd.
•	Controleer steeds beide versies (papier en digitaal).
•	De leerlingen printen zelf hun ingevulde versie uit en nieten deze aan het origineel (nietjesmachine aanwezig in Kurzweilklas).

Examens omzetten: Optie 1 (PDF-examens via KESI Virtual Printer)
1.	Open je examen (werkt enkel met PDF).
2.	Kies voor Afdrukken.
3.	Selecteer als printer de KESI Virtual Printer.
4.	Klik op Afdrukken.
5.	Kurzweil opent nu automatisch. Log in en wacht tot je rechts onderaan alle pagina’s ziet.

Examens omzetten: Optie 2 (Rechtstreeks in Kurzweil)
1.	Open het programma Kurzweil en meld aan met je logingegevens.
2.	Kies onderaan bij ‘Converteren’ voor PDF omzetten naar KES.
3.	Navigeer naar de map met PDF-examens, selecteer ze en kies Accepteren.
4.	Kies de map waar de KES-bestanden moeten komen.
5.	Klik op Conversie starten en daarna op OK.

Belangrijke beperkingen instellen (Verplicht!)
1.	Open het menu Hulpmiddelen > Functies blokkeren.
2.	Zet bij Schrijven, Online en Referentie overal een vinkje bij.
3.	Klik op Toepassen en kies vervolgens voor OK.
4.	Ga naar Bestand > Eigenschappen.
5.	Vink Geblokkeerde functies bij dit document opslaan aan en klik op OK.
6.	Klik op Ja bij de melding. De leerlingen kunnen de functies nu niet meer zelf aanzetten.
Waar sla ik het examen op?
1.	Kies voor Bestand > Opslaan als.
2.	Sla het op in de map: Zuid groepsmappen/Kurzweil/[Naam Leerling]/[Juiste Examendag]/[Juiste Beurt (A/B/C/D)].

Stappenplan toezichten Kurzweil/A-klas 
•	Leerlingen maken eerst verbinding met de Wifi (via hun gewone laptopaccount). 
•	Leerlingen melden aan op de laptop met Rembert-Kurzweilaccount (ingewikkeld wachtwoord zonder fruit). 
•	Leerlingen openen het Kurzweilexamen via de snelkoppeling Kurzweil (gele ster) op hun bureaublad. 
•	Leerlingen melden aan op Kurzweil met Kurzweilaccount (eenvoudig wachtwoord met fruit). 
•	Check of bij alle leerlingen de “blauwe Classroom.cloud balk” actief staat nadat ze aangemeld zijn, bij deze leerlingen wordt de internettoegang door de ITcoördinatoren vergrendeld. 
•	Leerlingen die invullen moeten zelf hun bestand op regelmatige basis bewaren! Het is goed om hen daar bij de start van het proefwerk eens aan te herinneren. NA INDIENEN EXAMEN MOET DE LEERLING DE LAPTOP AFSLUITEN!! Let op: proefwerken moeten ingediend zijn bij het belsignaal, anders kunnen ze niet meer bewaren!!! 
Problemen? Via Teams/Chat/zuid.proefwerken word je verder geholpen door de juiste collega. 

CHECKLIST TOEZICHTHOUDENDE LEERKRACHTEN ALINEA
In de A-klas werken de leerlingen (die anders Kurzweil gebruiken) met Alinea/ExaMode. Dit is op zich al beveiligd. Classroom.cloud moet niet geactiveerd worden. 
Leerlingen kunnen met hun gewone laptopaccount aanmelden op hun laptop.
 Meer info over de werking van Alinea/ExaMode volgt nog via een Smartschoolbericht.
 Problemen? Via Teams/Chat/zuid.proefwerken word je verder geholpen door de juiste collega. 
LESFICHE EN PLANNER

Doel: Lesfiches koppelen leerplandoelen aan je lessen en maken je agenda herbruikbaar.

Een lesfiche maken:
1.	Ga naar Mijn lesfiches en maak een nieuwe aan.
2.	Vul titel in (bijv. inhoudsopgave cursus) en selecteer het vak.
3.	Doelen toevoegen: Klik op 'LLinkid-doelen selecteren', kies het leerplan en duid de doelen aan (+GFL/GLI). Klik op 'Toevoegen'.
o	2de graad: Selecteer lesdoelen (GFL/GLI mag ook).
o	3de graad: Doelen selecteren is niet verplicht.
4.	Taken/Toetsen: Geef een titel, kies type (meebrengen/opdracht/taak/toets) en selecteer eventueel labels.
5.	Je kunt een bijlage toevoegen zodat leerlingen deze nooit kwijt zijn.

Lesfiches inplannen in de agenda:
1.	Ga naar de Planner in Smartschool.
2.	Klik op een lesmoment en kies Lesfiche plannen.
3.	Selecteer de gewenste fiche en klik op Plannen.
Schoolactiviteit plannen (voor coördinatoren): Gebruik dit voor vakvergaderingen of afspraken met collega’s, niet voor lessen.
1.	Kies Schoolactiviteit plannen.
2.	Geef titel, tijdstip en deelnemers op en klik op Plannen.

Laptop wil niet afsluiten (SEB Reset) 
Handleiding: https://new.express.adobe.com/webpage/AyiF9bBCGetTp 

Gebruik dit als de laptop vastzit door Safe Exam Browser (SEB).
1.	Open de SEB Reset Utility tool.
2.	Kies de optie: Reset system configuration to default values.
3.	Zoek je gebruikersgegevens op via de opdrachtprompt (cmd > typ whoami).
4.	Plak de gegevens in de tool en wacht tot de reset voltooid is.
5.	Herstart de computer.

Untis werkt niet
•	Bekijk de instructievideo: https://youtu.be/3S8POkdLPE0.

Geluid werkt niet meer (Laptop speakers)
1.	Klik op het Windows-logo en ga naar Instellingen > Geluid.
2.	Scroll naar beneden en klik op Assistentie.
3.	Klik op Ja bij de vraag om toestemming.
4.	De laptop installeert het stuurprogramma opnieuw, waarna het geluid weer werkt.

Controle examens:
⭐ KLAAR VOOR DE PROEFWERKEN?
Naamgeving kopies

- S_Vak_Lkr_K1as_Datum.pdf
Graag tijdig doorgeven en datum correct zetten!

-Kurzweil
Niet vergeten klaarzetten :-)

-Instructies voor toezichters doornemen!
Voorleessoftware in A-klas: examen uploaden en Excel invullen.

-Deadlines Skore
3 D & D/A: di 16-12 om 16:00
4 D & D/A: wo 17-12 om 12:00
5 D & D/A: di 16-12 om 16:00
6 D & D/A: wo 17-12 om 12:00
7 D/A: wo 17-12 om 12:00
3/4/5/6 A: di 16-12 om 10:00

-Oogjes
Donderdag 18-12 om 20:00
-Commentaren
Tot start klassenraad
Geen enters!

⚠️ Problemen tijdens je proefwerk?

Meld het via een Teams-chat aan zuid.proefwerken.
We brengen de juiste mensen op de hoogte.

Hoe stuur je een bericht?
Open Teams
Nieuwe chat
Zoek zuid.proefwerken
Klik op het mailadres om te starten

Aan: zuid.proefwerken
Mailadres: zuid.proefwerken@sint-rembert.be

Tekstherkenning – Tekst uit een afbeelding halen? Dit doe je zo!
https://new.express.adobe.com/webpage/XvaNp4iyEd0mT

Geluid uit je bordboek opnemen? Check IT out!
https://new.express.adobe.com/webpage/2lXwka1Cef84z
`.trim();


    // Combineer regels + kennis in één contextblok
    const contextText = `${promptHeader}\n\n===== KENNISDOCUMENT BOT-ZUID =====\n\n${kennisDocument}`;

    // ───────────────────────────────────────────────
    // 3) CONTENTS VOOR GEMINI: EERST CONTEXT, DAN CHAT
    // ───────────────────────────────────────────────
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

    // ✅ Modelkeuze
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
