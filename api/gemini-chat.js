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
Kurzweil

Voor leerkrachten omzetten:

https://new.express.adobe.com/webpage/MBQDpcouiCnm1

Wat is Kurzweil?

Leerlingen met dyslexie of andere leesproblemen kunnen gebruik maken van kurzweil (voorleessoftware) tijdens de les of de proefwerken. Voor evaluatiemomenten is het belangrijk dat je als leerkracht je documenten hiervoor omzet, beveiligt en op de juiste plaats klaar zet. Hoe je dit doet vind je in deze instructiefiche

Kurzweil installeren

Ga naar de app "Bedrijfsportal" op je gekregen laptop van de school.
Zoek de ongeïnstalleerde app "Kurzweil" in Bedrijfsportal.
Installeer Kurzweil

De app "Kurzweil 3000"

Indien het niet lukt, controleer of je alle updates gedaan hebt op je computer. Dit doe je als volgt: systeeminstellingen>Windows Update>Naar updates zoeken.

Tips bij het opstellen van het examen

Tijdens het opstellen van je examens hou je best al rekening met Kurzweil:

Voorzie volle antwoordlijnen, dus geen stippellijnen (en ook geen lege ruimte).
Voorzie ruim voldoende plaats om te antwoorden
Leerlingen kunnen gebruik maken van de invulfunctie binnen het programma. Voor kleuropdrachten, doorstreepopdrachten,…. lukt dit niet altijd. Controleer dus steeds beide versies (papier en digitaal)!
De leerlingen printen zelf hun ingevulde versie uit en nieten deze aan het origineel, er is in elke kurzweilklas een nietjesmachine aanwezig.

Examens omzetten naar Kesi

Optie 1: PDF-examens omzetten

Open je examen (werkt enkel met PDF).
Kies voor ‘afdrukken’.
Selecteer als printer de ‘KESI Virtual Printer’.
Klik op ‘Afdrukken’.

Afdrukken in Word via KESI Virtual Printer

Kurzweil zal nu automatisch openen
Log je in en het examen is nu omgezet in een Kurzweil-bestand (wacht eventjes tot je rechts onderaan alle pagina’s ziet)

Eindresultaat

Optie 2: PDF-examens omzetten

Open het programma Kurzweil en meld daar aan met je Kurzweil logingegevens. Indien je het onderstaande scherm niet krijgt, herstart het programma nog eens.
Kies onderaan bij ‘Converteren’ voor ‘PDF omzetten naar KES’.

Kies voor "PDF omzetten naar KES"

Navigeer naar de map waar je pdf-examens staan. Selecteer de examens die in de map staan en kies onderaan voor ‘Accepteren’ om de conversie te starten.
Navigeer naar de map waar je kesi-examens moeten komen.
Bij 3 hoef je niks speciaals aan te duiden. Tenzij je hier specifiek voor kiest.
Kies voor ‘Conversie starten’ en klik daarna op 'OK'.
De weg naar het converseren. Volg bovenstaande stappen.

Belangrijke beperkingen instellen

Open het menu ‘Hulpmiddelen/functies blokkeren’
Zet bij ‘Schrijven’ een vinkje bij alles.
Zet bij ‘Online’ een vinkje bij alles.
Zet bij ‘Referentie’ een vinkje bij alles.
Klik onderaan op ‘Toepassen’ en kies vervolgens voor ‘OK’.

Hulpmiddelen ==> functies blokkeren

Kies voor ‘Bestand/Eigenschappen…’.
Indien je een melding krijgt, vink ‘Deze boodschap niet opnieuw tonen’ aan en klik op ‘OK’.
Vink ‘Geblokkeerde functies bij dit document opslaan’ aan en klik op ‘OK’.
Klik op ‘Ja’, de leerlingen kunnen daarna de functies zelf niet meer aanzetten!

Bestand ==> eigenschappen

Bestand opslaan als

Kies voor ‘Bestand/Opslaan als’ en zet je exemplaar in de Zuid groepsmappen/Kurzweil bij de juiste leerling op het juiste proefwerkmoment.
Je vindt per leerling een mapje terug met zijn/haar klas en naam
Bij elke leerling heb je de examendagen staan, met daarin telkens een A-,B-,C- en D- beurt.
Kopieer je examen naar de juiste leerlingen, zet deze uiteraard op de juiste dag, binnen de juiste beurt!

Toezicht houden in een Kurzweilklas

Leerkrachten die toezicht houden in een Kurzweilklas:

Vraag de leerlingen regelmatig om op te slaan!
De logins voor de leerlingen moeten in de klas blijven!

Eerste hulp bij Kurzweilproblemen

De leerling krijgt de melding ‘Stem kan niet worden geactiveerd’. Oortjes zitten niet in of niet goed genoeg in.
Er is geen kurzweilmap te vinden. Leerling moet aanmelden op de pc met examenaccount en niet met gewone account.
Er is geen examen beschikbaar. Kijken of een andere leerling met hetzelfde examen het wel heeft en eventueel kopiëren, indien niet beschikbaar: melden bij opvoeder, leerkracht is het vergeten!
Leerling kan niets laten voorlezen of invullen. Leerkracht heeft de voorleesfunctie of schrijffunctie ook geblokkeerd. Opvoeder moet gecontacteerd worden om correcte examen te bezorgen.

En werkt alles nu?

Als het mogelijk is om (geluid) af te spelen en het voorleesprogramma te laten starten, is het "kes" bestand goed omgezet. Daarnaast moet de optie er zijn om te kunnen typen en markeren in het bestand doorheen het examen.
Veel succes!

Voor toezichten:

KURZWEILEXAMENS IN GEWONE PROEFWERKENLOKALEN CHECKLIST TOEZICHTHOUDENDE LEERKRACHTEN SIVI

Leerlingen maken eerst verbinding met de Wifi (via hun gewone laptopaccount). Leerlingen melden aan op de laptop met Rembert-Kurzweilaccount (ingewikkeld wachtwoord zonder fruit).

Leerlingen openen het Kurzweilexamen via de snelkoppeling Kurzweil (gele ster) op hun bureaublad. Leerlingen melden aan op Kurzweil met Kurzweilaccount (eenvoudig wachtwoord met fruit). 

Check of bij alle leerlingen de “blauwe Classroom.cloud balk” actief staat nadat ze aangemeld zijn, bij deze leerlingen wordt de internettoegang door de ITcoördinatoren vergrendeld. Leerlingen die invullen moeten zelf hun bestand op regelmatige basis bewaren! Het is goed om hen daar bij de start van het proefwerk eens aan te herinneren. 

NA INDIENEN EXAMEN MOET DE LEERLING DE LAPTOP AFSLUITEN!! Let op: proefwerken moeten ingediend zijn bij het belsignaal, anders kunnen ze niet meer bewaren!!! Problemen? Via Teams/Chat/zuid.proefwerken word je verder geholpen door de juiste collega. 

EXAMENS IN DE A-KLAS (PROEFOPZET ALINEA/EXAMODE) CHECKLIST TOEZICHTHOUDENDE LEERKRACHTEN SIVI 

In de A-klas werken de leerlingen (die anders Kurzweil gebruiken) met Alinea/ExaMode. Dit is op zich al beveiligd. Classroom.cloud moet niet geactiveerd worden. Leerlingen kunnen met hun gewone laptopaccount aanmelden op hun laptop. Meer info over de werking van Alinea/ExaMode volgt nog via een Smartschoolbericht.

Projectieproblemen

Problemen met TV-schermen? Volg eerst dit stappenplan.

🔷 PROJECTIE OP 3 SCHERMEN?

(= Meestal: laptop + bord + tv)

➤ YES → je komt bij “Lesgeven en afblijven!”
= Alles werkt → niets aanpassen.

➤ NO → volgende vraag: docking aangesloten?

YES → Controleer beeldscherminstellingen
NO → USB-C in laptop steken
Tip: als de laptop oplaadt, zit de kabel correct.

🟧 Contoleer beeldscherminstellingen!

Deze stap splitst zich in 3 mogelijkheden:

🔸 1. Geavanceerd beeldscherm (bij tv’s)

Hier staat de werkwijze:

Rechtermuisklik bureaublad
Beeldscherminstellingen
Geavanceerde beeldscherminstellingen
Selecteer LG-tv, Samsung-tv of PC-monitor
Frequentie aanpassen naar 29,97 Hz of 23,98 Hz

Hoe?  Geen beeld op een tv en alle andere mogelijkheden al geprobeerd? Flikkerend beeld? Klik met je rechtermuisknop op je bureaublad en kies voor ‘beeldscherminstellingen’. Scrol naar beneden en kies voor geavanceerd beeldscherm onder verwante instellingen. Zorg ervoor dat je op het juiste beeldscherm zit. Klik onderaan op vernieuwingsfrequentie kiezen. Pas dit aan naar 30 Hz. Klik op ‘Wijzigingen behouden’.

Zie ook: https://www.youtube.com/watch?v=JA-Yrfdz0t0+&feature=youtu.be
Zie ook:https://www.youtube.com/watch?v=E3vwykYUwlk+&feature=youtu.be

🔸 2. Beeldscherm dupliceren of uitbreiden

Dupliceren (1/2) → alle schermen tonen hetzelfde
Uitbreiden (1/2/3) → schermen werken los van elkaar

Ook mogelijk:
Enkel een combinatie dupliceren van twee schermen → “Bureaublad dupliceren op … en …”

🔸 3. Gelukt?

YES → klaar (duimpje)
NO → volgende stappen

Zo niet gelukt:

Geef kabel een duwtje (niet uittrekken!)
Contacteer TOPdesk (ICT-pedagogisch)

Geen beeld op tv of tweede scherm

https://www.youtube.com/watch?v=JA-Yrfdz0t0+&feature=youtu.be
https://www.youtube.com/watch?v=E3vwykYUwlk+&feature=youtu.be

Wanneer je op je tv of digitaal bord geen signaal krijgt, los je dat als volgt op: Leg je tv of digitaal bord aan! Klik met je rechtermuisknop op het bureaublad en kies voor ‘Beeldscherminstellingen’ Scroll een beetje naar beneden en kies bij ‘Meerdere beeldschermen’ voor ‘Deze beeldschermen dupliceren’.

Aanwezigheden scannen

Scenario 1 — Leerling alleen?

(bijvoorbeeld IT, LLB, onthaal, opvoeders…)

➤ Actie: VERPLICHT scannen

Elke individuele leerling die alleen verschijnt, moet gescand worden.

Daaronder staat een voorbeeldfoto:

“Klaar na de laatste”

Je ziet dat er wél op opslaan moet worden geklikt na de laatste scan.

🔷 Scenario 2 — Volledige klasgroep

➤ Twee mogelijkheden:

🟩 1. Via scannen (met smartphone of toestel)

Actie: Alle leerlingen worden gescand.
Belangrijk: NIET op opslaan klikken!
Het systeem registreert dit automatisch.

🟩 2. Via de laptop

Hier staan 3 controle-stappen:

① Pagina refreshen
② Staat leerling op donkergroen of geel?
➡️ Status laten staan (dus niets wijzigen).
③ Staat leerling op lichtgroen?
➡️ Status aanpassen (meestal betekent lichtgroen: nog geen aanwezigheid bevestigd).

❗ Belangrijke algemene regels (onderaan in kader)

Afwezigheden ieder lesuur ingeven!
Uitzondering:
Lesblok van 2 aansluitende lesuren → slechts één keer ingeven.

Verplichte momenten:
Maandag en dinsdag om 13u15 voor iedereen, ook voor blokuren.

Lesfiches en planner

1. Inleiding

Vanaf dit schooljaar starten we met de lesfiches en planner.
De lesfiches zijn jouw lesonderwerpen en bieden heel wat voordelen, zoals:

integratie van de leerplandoelen
bruikbaar over meerdere schooljaren
mogelijkheid om achteraf te controleren welke leerplandoelen je bereikt hebt

De planner is jouw schoolagenda uit het verleden.
In deze handleiding leer je hoe je lesfiches koppelt aan je planner.

2. Lesfiches

2.1 Lesfiche aanmaken

Noteer de titel van je lesfiche.
Je kan de inhoudsopgave van je cursus gebruiken als basis.
Selecteer het vak waarvoor je een lesfiche wil maken.
Klik op het sterretje naast je vak om het bij je favorieten te zetten.
Selecteer de nodige labels die je wilt koppelen.
Je kan ook zelf labels aanmaken.
Gebruik voldoende labels zodat je later makkelijk kan filteren.

2.2 Lesdoelen toevoegen

Klik op LLinkid-doelen selecteren en:
Selecteer het correcte leerplan.
Duik de juiste doelen aan (+GFL en GLI).
Klik rechts onderaan op Toevoegen.

Toelichting per graad:

2de graad:
Je selecteert je lesdoelen.
Je mag ook doelen uit GLI en GFL toevoegen.
Belangrijk om op het einde van het schooljaar te weten welke doelen bereikt zijn.

3de graad:
Je hoeft geen doelen te selecteren.

Tekstvak "Organisatie/verloop":
Niet verplicht; niet zichtbaar voor leerlingen.
Voorbeelden: oefeningen noteren, link naar filmpje, enz.

🎉 TADAAAA! Jouw eerste lesfiche is gemaakt.

2.3 Taken en toetsen plannen

Geef een passende titel.
Kies een opdrachttype: meebrengen / opdracht / taak / toets.
Selecteer één of meerdere labels.
Selecteer de leerplandoelen (opnieuw via LLinkid-doelen).
Je kan een bijlage toevoegen (bv. opdrachtfiche).
→ Dan kunnen leerlingen het nooit kwijt zijn.

2.4 Filteren op lesfiches

Klik links bovenaan op Mijn lesfiches.
Klik rechts bovenaan op Filter.
Filter op labels, vakken en/of type.

2.5 Filteren op opdrachten

Klik links bovenaan op Mijn opdrachten.
Klik rechts bovenaan op Filter.

2.6 Lesfiches delen

Als je lesfiches deelt met een parallel-collega, worden alle lesfiches gedeeld.
Indien gewenst kan je delen via:

Klik op het handje.
Zoek de persoon of groep waarmee je wil delen.
Klik op OK.

3. Planner

3.1 Waar vind je de planner?

In Smartschool, onder je agenda.

3.2 Lesfiche plannen in de planner

Klik op je lesmoment.
Klik op Lesfiche plannen.
Selecteer de gewenste lesfiche.
Klik op Plannen.

3.3 Opdracht of toets plannen in de planner

Klik op je lesmoment.
Klik op Opdracht plannen.
Selecteer de juiste lesfiche.
Klik op Plannen.

4. Schoolactiviteit plannen

(enkel voor coördinatoren en vakverantwoordelijken)

Gebruik dit voor:

vakvergaderingen
afspraken met collega’s

School- en klasactiviteiten worden via memo's doorgegeven en door roosteraars ingepland.

Procedure:

Geef een titel op.
Kies tijdstip.
Voeg deelnemers toe (kan ook per vakgroep, bv. aardrijkskunde).
Voeg eventueel een bijlage toe (bv. agenda van de vergadering).
Klik op Schoolactiviteit plannen.

5. Afspraak plannen

(enkel met leerlingen, niet met collega’s)

Klik op je lesmoment.
Klik op Afspraak plannen.
Geef een titel op.
Kies het moment.
Indien herhaling nodig is → instellen.
Voeg deelnemers toe.
Optioneel: bijlage toevoegen.
Leerlingen moeten de afspraak bevestigen via mail.

6. Verjaardagen

Klik bovenaan je dag op Verjaardagen.
Klik links onderaan op Acties.
Kies welke verjaardagen je wil tonen

Laptop wilt niet afsluiten

https://new.express.adobe.com/webpage/AyiF9bBCGetTp

Stap 1 - Klik op installeren en wacht tot de schermen bij Stap 2 tevoorschijn komen

Stap 2 - SEB Reset Utility

Duid de optie 'Reset system configuration to default values' aan.

Je krijgt daarna dit scherm

Zoek de correcte gebruikersgegevens op

Open cmd

Geef in whoami

Kopieer de gebruikersgegevens

Stap 3: plak de gebruiker gegevens in de SEB Reset-tool

Wacht tot de reset-procedure is voltooid.

Stap 4: herstart de computer

Geef in het opdrachtenvenster het commando

Stap 5: Controleer na het heropstarten of je je computer weer op de normale manier kunt afsluiten

Geluid werkt niet meer

Wat als er geen geluid uit mijn luidsprekers komt? Wat als er geen geluid uit mijn luidsprekers komt? Wat als er geen geluid uit mijn luidsprekers komt? Plots komt er geen geluid meer uit de luidsprekers van je laptop. Via onderstaand stappenplan kan je ervoor zorgen dat de luidsprekers opnieuw werken.

• Klik op het Windows-logo in de taakbalk.
• Open de ‘Instellingen’ van je laptop. Klik daarvoor op het logo van ‘instellingen’.
• Open de instellingen van geluid.
• Scroll helemaal naar beneden tot je ‘Assistentie ziet staan’. Klik op Assistentie. Er opent nu een nieuw venster.
• Scroll in het venster naar beneden tot je de vraag ‘Hebben we uw toestemming om door te gaan…’ ziet staan. Klik op ‘Ja’.
• Je laptop gaat nu het apparaat scannen. Na een tijdje krijg je de vraag ‘Geeft u ons toestemming om het stuurprogramma…’. Hier klik je opnieuw ‘Ja’.
• Je laptop gaat het stuurprogramma opnieuw installeren. Na deze stap werken de luidsprekers van je laptop opnieuw.

Untis werkt niet

Zie: https://youtu.be/3S8POkdLPE0

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
