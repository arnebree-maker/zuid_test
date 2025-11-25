import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  HelpCircle,
  Lightbulb,
  Sparkles,
  BookOpen,
  Calendar,
  MapPin,
  Clock,
  Link as LinkIcon,
} from "lucide-react";

const TEAMS_CHAT_URL =
  "https://teams.microsoft.com/l/chat/0/0?users=arne.breemeersch@sint-rembert.be";

const OUTLOOK_MEETING_URL =
  "https://outlook.office.com/calendar/0/deeplink/compose?to=arne.breemeersch@sint-rembert.be&subject=Afspraak%20ICT%20%2F%20AI&body=Beschrijf%20kort%20je%20vraag%20over%20ICT%20of%20AI.";

const GEMINI_URL =
  "https://gemini.google.com/gem/1eAez_W8DALYxBVNPQTzmg2CVx4XDn6w7?usp=sharing";

const DRIVE_EXAMPLES_URL =
  "https://drive.google.com/drive/folders/12hkdkdgrNgK8W3b5qXjJvcPaKsinLEuj?usp=sharing";

// Teams / Outlook links
const TEAMS_CHAT_URL =
  "https://teams.microsoft.com/l/chat/0/0?users=arne.breemeersch@sint-rembert.be";
const OUTLOOK_CALENDAR_URL =
  "https://outlook.office.com/calendar/view/week";

/* ------------ Basis UI-componenten ------------ */

const Button = ({
  children,
  onClick,
  as: Tag = "button",
  href,
  variant = "primary",
  className = "",
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 focus:ring-blue-500",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-300",
  };

  const cls = `${base} ${variants[variant]} ${className}`;
  const isLink = Tag === "a" || href;

  const props = {
    className: cls,
    onClick,
    href,
    target: isLink ? "_blank" : undefined,
    rel: isLink ? "noopener noreferrer" : undefined,
    ...rest,
  };

  return isLink ? <a {...props}>{children}</a> : <button {...props}>{children}</button>;
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

/* ------------ Chatcomponent ------------ */

function SupportChat() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hallo! Ik ben Bot Zuid. Stel hier je vraag over ICT of AI in de klas.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: "user", text: input.trim() }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      const reply =
        data?.reply ||
        "Er ging iets mis bij het ophalen van een antwoord. Probeer later opnieuw.";

      setMessages([...newMessages, { role: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          role: "bot",
          text: "Er ging iets mis bij de verbinding met de server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="h-40 overflow-y-auto space-y-2 mb-3 pr-1 text-xs sm:text-sm">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-2.5 py-1.5 rounded-lg ${
              m.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-white text-slate-800 border border-slate-200"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="mr-auto bg-white text-slate-500 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200">
            Bot Zuid is aan het typen…
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 rounded-md border border-slate-200 px-2 py-1.5 text-xs sm:text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Typ je vraag…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="primary" className="px-3 py-1.5 text-xs">
          Verstuur
        </Button>
      </form>
    </div>
  );
}

/* ------------ Timer voor bijscholing ------------ */

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const event = new Date(targetDate);
      const diff = event.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("De bijscholing is gestart.");
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${d} dagen · ${h}u ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-sm font-semibold text-slate-800">{timeLeft}</p>
      <p className="text-[11px] text-slate-500">
        Beperkt aantal plaatsen – schrijf tijdig in.
      </p>
    </div>
  );
}

/* ------------ Subsecties (AI-tools, voorbeelden, …) ------------ */

function AiToolsSection() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
          <Lightbulb className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            AI-tools voor in de klas
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Overzicht van handige AI-tools die je als leerkracht kan uitproberen.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
        <Button as="a" href="https://chatgpt.com/" variant="secondary" className="justify-center">
          ChatGPT
        </Button>
        <Button as="a" href="https://gemini.google.com/" variant="secondary" className="justify-center">
          Google Gemini
        </Button>
        <Button as="a" href="https://www.genial.ly/" variant="secondary" className="justify-center">
          Genially
        </Button>
        <Button
          as="a"
          href="https://notebooklm.google.com/"
          variant="secondary"
          className="justify-center"
        >
          NotebookLM
        </Button>
        <Button as="a" href="https://gamma.app/" variant="secondary" className="justify-center">
          Gamma
        </Button>
        <Button as="a" href="https://lovable.dev/" variant="secondary" className="justify-center">
          Lovable
        </Button>
        <Button
          as="a"
          href="https://aistudio.google.com/"
          variant="secondary"
          className="justify-center sm:col-span-2"
        >
          Google AI Studio
        </Button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600">
        Tip: kies één tool en test die in een kleine opdracht. Laat leerlingen meedenken over
        wat werkt en wat niet.
      </p>
    </Card>
  );
}

function ExamplesSection() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
          <BookOpen className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            Voorbeelden &amp; scenario&apos;s
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Uitgewerkte lessen, prompts en ideeën van collega&apos;s.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 text-sm leading-relaxed mb-4">
        <div>
          <p className="font-semibold text-slate-800 mb-1">Wat vind je in de map?</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Lesvoorbeelden per vak en graad.</li>
            <li>Prompts die effectief waren in de klas.</li>
            <li>Genially- en Lovable-projecten voor directe inzet.</li>
            <li>NotebookLM-notebooks met samenvattingen.</li>
          </ul>
        </div>
        <div className="space-y-2">
          <Button
            as="a"
            href={DRIVE_EXAMPLES_URL}
            variant="primary"
            className="justify-center"
          >
            <LinkIcon className="h-4 w-4" />
            Open de Drive-map met voorbeelden
          </Button>
          <p className="text-xs text-slate-600">
            Je mag materiaal gebruiken, aanpassen en nieuwe voorbeelden toevoegen. Vermeld
            eventueel kort je naam en vak in de bestandsnaam.
          </p>
        </div>
      </div>
    </Card>
  );
}

function TrainingSection() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-[11px] font-medium text-blue-600 uppercase tracking-wide">
            Bijscholing
          </p>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-2 mt-1">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Lovable · AI-website bouwen
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            In 1 uur leer je hoe je met <span className="font-semibold">Lovable</span> een
            eenvoudige AI-gestuurde website maakt voor je les of project.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-700">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>
              <span className="font-semibold">Datum:</span> 15 december 2025
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>
              <span className="font-semibold">Startuur:</span> 16u00
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span>
              <span className="font-semibold">Locatie:</span> Lokaal Z314
            </span>
          </div>
          <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600 mt-1">
            Doelgroep: alle leerkrachten · beginners welkom
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Je leert o.a.:</p>
          <ul className="text-sm text-slate-700 space-y-1.5">
            <li>• Basis van Lovable in onderwijscontext.</li>
            <li>• Een eenvoudige les- of projectsite opzetten.</li>
            <li>• Voorbeelden van collega&apos;s bekijken en hergebruiken.</li>
          </ul>
        </div>
      </div>

      <div className="mt-3 grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
          <p className="text-xs text-slate-500 mb-1">Tijd tot start</p>
          <CountdownTimer targetDate="2025-12-15T16:00:00" />
        </div>
        <div className="flex flex-col gap-2">
          <Button as="a" href="#" variant="primary" className="w-full justify-center">
            Inschrijven voor Lovable
          </Button>
          <Button
            as="a"
            href={DRIVE_EXAMPLES_URL}
            variant="ghost"
            className="w-full justify-center text-xs"
          >
            <LinkIcon className="h-3 w-3" />
            Bekijk voorbeeldprojecten (Drive)
          </Button>
        </div>
      </div>
    </Card>
  );
}

function PolicySection() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
          <Lightbulb className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            AI-richtlijnen · wat mag wel / niet?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Praktische samenvatting – volg steeds het officiële beleid van de scholengroep.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm mb-4">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="font-semibold text-emerald-800 mb-1">✅ Wel doen</p>
          <ul className="space-y-1 text-emerald-900">
            <li>• AI gebruiken voor inspiratie, herformulering en voorbeelden.</li>
            <li>• Lesmateriaal laten verbeteren en differentiëren.</li>
            <li>• Leerlingen begeleiden bij kritisch denken over AI-output.</li>
            <li>• Geen echte namen of gevoelige gegevens invoeren.</li>
          </ul>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="font-semibold text-amber-900 mb-1">
            ⚠️ Voorzichtig mee / liever niet
          </p>
          <ul className="space-y-1 text-amber-900">
            <li>• Geen vertrouwelijke leerling- of personeelsgegevens invoeren.</li>
            <li>• Geen volledige taken door AI laten maken zonder eigen inbreng.</li>
            <li>• AI-output nooit ongecheckt overnemen.</li>
            <li>• Geen accounts laten aanmaken door leerlingen zonder toestemming.</li>
          </ul>
        </div>
      </div>

      <p className="text-xs text-slate-600 mb-1">Meer lezen:</p>
      <div className="flex flex-wrap gap-3 text-xs">
        <a
          href="https://www.ser.nl/nl/actueel/Nieuws/ChatGPT-in-het-onderwijs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          ChatGPT in het onderwijs – SER
        </a>
        <a
          href="https://www.destudentenadvocaat.nl/blog/voordelen-chatgpt-onderwijs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          Voordelen van ChatGPT – De Studentenadvocaat
        </a>
        <a
          href="https://toetsrevolutie.nl/tijd-besparen-met-ai-formatief-handelen-in-de-praktijk/?utm_source=teachertapp&utm_medium=app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          AI &amp; formatief handelen – Toetsrevolutie
        </a>
      </div>
    </Card>
  );
}

/* ------------ Zwevend plannertje rechtsonder (Teams) ------------ */

function FloatingPlanner() {
  const [open, setOpen] = useState(false);

  // Hier kan je eventueel later een echte status ophalen (Graph API e.d.)
  const statusLabel = "Meestal beschikbaar op maandag–donderdag, 8u30–16u30";
  const statusState: "free" | "busy" = "free"; // manueel aanpasbaar

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Uitgeklapt paneel */}
      {open && (
        <div className="mb-3 w-72 sm:w-80 rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 p-4 text-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-blue-500 font-semibold">
                Afspraak in Teams
              </p>
              <h3 className="text-sm font-semibold text-slate-900">
                Plan een moment met Arne
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Handig voor vragen over ICT &amp; AI of een korte 1-op-1.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-6 w-6 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200 text-xs"
            >
              ✕
            </button>
          </div>

          {/* Status */}
          <div className="mb-3 space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px]">
              <span
                className={`h-2 w-2 rounded-full ${
                  statusState === "free" ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              <span className="font-semibold text-slate-700">
                {statusState === "free" ? "Beschikbaar (indicatief)" : "Waarschijnlijk bezet"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{statusLabel}</p>
          </div>

          {/* Contactopties */}
          <div className="space-y-2">
<Button
  as="a"
  href={TEAMS_CHAT_URL}
  variant="primary"
  className="w-full justify-center text-xs"
>
  <span className="text-base">💬</span>
  Start een Teams-chat
</Button>

<Button
  as="a"
  href={OUTLOOK_MEETING_URL}
  variant="secondary"
  className="w-full justify-center text-xs"
>
  <Calendar className="h-3 w-3" />
  Plan via Outlook / Teams
</Button>


            <div className="text-[11px] text-slate-500 leading-snug">
              <p>
                Voeg bij het plannen in je uitnodiging kort toe waarover je vraag gaat.{" "}
              </p>
              <p className="mt-1">
                E-mail:{" "}
                <a
                  href="mailto:arne.breemeersch@sint-rembert.be"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  arne.breemeersch@sint-rembert.be
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Drijvende knop */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/40 px-3 py-2 text-xs sm:text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
          <span className="text-[13px] font-semibold">AB</span>
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="font-semibold">Afspraak met Arne</span>
          <span className="text-[10px] text-blue-100">
            Teams / Outlook · klik om te plannen
          </span>
        </div>
      </button>
    </div>
  );
}

/* ------------ Hoofdcomponent ------------ */

export default function App() {
  const [activePage, setActivePage] = useState(null); // null = enkel home

  // label om te tonen welke sectie geopend is
  const activePageLabel =
    {
      "ai-tools": "AI-tools",
      voorbeelden: "Voorbeelden & scenario's",
      bijscholing: "Bijscholing & vorming",
      "ai-beleid": "AI-richtlijnen",
    }[activePage] || null;

  const renderActiveSection = () => {
    if (activePage === "ai-tools") return <AiToolsSection />;
    if (activePage === "voorbeelden") return <ExamplesSection />;
    if (activePage === "bijscholing") return <TrainingSection />;
    if (activePage === "ai-beleid") return <PolicySection />;
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-semibold">
              SR
            </span>
            <div>
              <h1 className="text-sm sm:text-base font-semibold tracking-tight">
                Scholengroep Sint-Rembert · SiVi &amp; VLTI
              </h1>
              <p className="text-xs text-slate-500">
                Portaal Digitale Didactiek &amp; ICT
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            Werkgroep{" "}
            <span className="font-semibold text-slate-700">Digitale Didactiek</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        {/* Hero / banner – moderner & groter */}
        <section className="mt-6 mb-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-slate-900 shadow-xl">
            <div className="relative h-[46vh] sm:h-[55vh] md:h-[65vh]">
              <img
                src="/media/01037808-bc10-468e-a00f-af57eea24fce.jpeg"
                alt="Team samenwerking en enthousiasme"
                className="w-full h-full object-cover opacity-80"
              />

              {/* overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/10" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* content */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full px-6 sm:px-8 md:px-10">
                  <div className="max-w-2xl space-y-4 md:space-y-5 bg-slate-900/60 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-4 sm:py-5 border border-slate-700/60">
                    {/* kleine labels bovenaan */}
                    <div className="flex flex-wrap gap-2 text-[10px] sm:text-[11px]">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 border border-blue-300/40 px-2 py-1 text-blue-100 font-semibold uppercase tracking-wide">
                        <Sparkles className="h-3 w-3" />
                        Digitale didactiek
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/70 border border-slate-600 px-2 py-1 text-slate-200">
                        ICT &amp; AI-ondersteuning
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-300/40 px-2 py-1 text-emerald-100">
                        Voor alle leerkrachten
                      </span>
                    </div>

                    {/* titel + baseline */}
                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                        Alles rond ICT &amp; AI
                        <span className="block text-sm sm:text-base md:text-lg text-slate-200 font-normal mt-1.5">
                          Eén startpunt voor tools, voorbeelden, bijscholing en ondersteuning
                          binnen Scholengroep Sint-Rembert.
                        </span>
                      </h2>
                    </div>

                    {/* “call to action” knoppen – klikken zet meteen de juiste sectie open */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                      <Button
                        type="button"
                        variant="primary"
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => setActivePage("ai-tools")}
                      >
                        <Lightbulb className="h-4 w-4" />
                        AI-tools bekijken
                      </Button>

                      <Button
                        type="button"
                        variant="secondary"
                        className="border-slate-500/70 bg-slate-900/40 text-slate-100 hover:bg-slate-800"
                        onClick={() => setActivePage("voorbeelden")}
                      >
                        <BookOpen className="h-4 w-4" />
                        Voorbeelden &amp; scenario&apos;s
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        className="text-slate-200 hover:bg-slate-800/60"
                        onClick={() => setActivePage("bijscholing")}
                      >
                        <Sparkles className="h-4 w-4" />
                        Bijscholing Lovable
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Werkgroep klein onder de foto */}
        <section className="mb-8">
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-slate-800">
                  Werkgroep Digitale Didactiek
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Aanspreekpunt voor vragen over ICT &amp; AI in je les.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px] sm:text-xs text-slate-700">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Technisch team</p>
                  <p className="leading-relaxed">
                    Mieke Verbeerst
                    <br />
                    Barbara Van Hecke
                    <br />
                    Arne Breemeersch
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Pedagogisch team</p>
                  <p className="leading-relaxed">
                    Jasper Gerits
                    <br />
                    Glenn Van de Voorde
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Snel naar de juiste info (links, sticky, opvallend) + Bot Zuid (rechts) */}
        <section className="mb-6 grid gap-4 md:grid-cols-3 items-start">
          {/* Snel naar de juiste info – links, 1/3 breed, sticky en extra opvallend */}
          <Card className="h-full p-0 md:col-span-1 md:sticky md:top-24 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white border-0 shadow-2xl">
            {/* bovenste band */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400" />

            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-blue-500/20 border border-blue-300/40 text-[11px] font-semibold text-blue-100">
                    <Sparkles className="h-3 w-3" />
                    <span>Stap 1: kies een onderdeel</span>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-blue-200 font-semibold">
                      Navigatie
                    </p>
                    <h3 className="text-sm sm:text-base font-semibold">
                      Snel naar de juiste info
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-200 mt-1">
                      <span className="font-semibold text-blue-100">Klik op een tegel</span> – onderaan
                      deze pagina verschijnt de bijhorende sectie.
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/40 border border-blue-200/60">
                  <ChevronRight className="h-4 w-4 text-blue-100" />
                </div>
              </div>

              {/* Tegels onder elkaar */}
              <div className="flex flex-col gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => setActivePage("ai-tools")}
                  className={`group rounded-lg border px-3 py-2.5 text-left transition-all ${
                    activePage === "ai-tools"
                      ? "border-blue-300 bg-white text-slate-900 shadow-md scale-[1.02]"
                      : "border-white/20 bg-white/5 hover:border-blue-300 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-semibold text-xs ${
                        activePage === "ai-tools" ? "text-slate-900" : "text-white"
                      }`}
                    >
                      AI-tools
                    </span>
                    <Lightbulb
                      className={`h-4 w-4 ${
                        activePage === "ai-tools"
                          ? "text-blue-600"
                          : "text-blue-200 group-hover:text-blue-300"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-[11px] ${
                      activePage === "ai-tools" ? "text-slate-600" : "text-slate-200"
                    }`}
                  >
                    Overzicht van tools zoals ChatGPT, Gemini, NotebookLM, Genially…
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePage("voorbeelden")}
                  className={`group rounded-lg border px-3 py-2.5 text-left transition-all ${
                    activePage === "voorbeelden"
                      ? "border-blue-300 bg-white text-slate-900 shadow-md scale-[1.02]"
                      : "border-white/20 bg-white/5 hover:border-blue-300 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-semibold text-xs ${
                        activePage === "voorbeelden" ? "text-slate-900" : "text-white"
                      }`}
                    >
                      Voorbeelden &amp; scenario&apos;s
                    </span>
                    <BookOpen
                      className={`h-4 w-4 ${
                        activePage === "voorbeelden"
                          ? "text-blue-600"
                          : "text-blue-200 group-hover:text-blue-300"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-[11px] ${
                      activePage === "voorbeelden" ? "text-slate-600" : "text-slate-200"
                    }`}
                  >
                    Drive-map met concrete lesvoorbeelden en prompts van collega&apos;s.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePage("bijscholing")}
                  className={`group rounded-lg border px-3 py-2.5 text-left transition-all ${
                    activePage === "bijscholing"
                      ? "border-blue-300 bg-white text-slate-900 shadow-md scale-[1.02]"
                      : "border-white/20 bg-white/5 hover:border-blue-300 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-semibold text-xs ${
                        activePage === "bijscholing" ? "text-slate-900" : "text-white"
                      }`}
                    >
                      Bijscholing &amp; vorming
                    </span>
                    <Sparkles
                      className={`h-4 w-4 ${
                        activePage === "bijscholing"
                          ? "text-blue-600"
                          : "text-blue-200 group-hover:text-blue-300"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-[11px] ${
                      activePage === "bijscholing" ? "text-slate-600" : "text-slate-200"
                    }`}
                  >
                    Info over Lovable-sessies en toekomstige AI-/ICT-vormingen.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePage("ai-beleid")}
                  className={`group rounded-lg border px-3 py-2.5 text-left transition-all ${
                    activePage === "ai-beleid"
                      ? "border-blue-300 bg-white text-slate-900 shadow-md scale-[1.02]"
                      : "border-white/20 bg-white/5 hover:border-blue-300 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-semibold text-xs ${
                        activePage === "ai-beleid" ? "text-slate-900" : "text-white"
                      }`}
                    >
                      AI-richtlijnen
                    </span>
                    <Lightbulb
                      className={`h-4 w-4 ${
                        activePage === "ai-beleid"
                          ? "text-blue-600"
                          : "text-blue-200 group-hover:text-blue-300"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-[11px] ${
                      activePage === "ai-beleid" ? "text-slate-600" : "text-slate-200"
                    }`}
                  >
                    Wat mag wel/niet met AI + links naar achtergrondinfo.
                  </p>
                </button>
              </div>

              {/* Actieve melding: laat zien dat er iets onderaan verschijnt */}
              {activePageLabel && (
                <div className="mt-3 pt-3 border-t border-white/20 text-[11px] text-slate-100 space-y-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white text-slate-900 px-3 py-1 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-500 animate-pulse" />
                    <span className="font-semibold">
                      {activePageLabel} is geopend hieronder op de pagina.
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-200">
                    Scroll naar beneden om de inhoud te bekijken.
                  </p>
                </div>
              )}

              {/* Extra link naar Drive */}
              <div className="mt-3 pt-3 border-t border-white/20 text-[11px] text-slate-100 space-y-1">
                <p className="font-semibold text-blue-100">
                  Tip: start met de voorbeelden.
                </p>
                <p className="text-[10px] text-slate-200">
                  In de Drive-map vind je kant-en-klare lessen en prompts die je meteen kan
                  uitproberen in de klas.
                </p>
                <Button
                  as="a"
                  href={DRIVE_EXAMPLES_URL}
                  variant="ghost"
                  className="justify-start px-0 text-[11px] text-blue-100 hover:text-white"
                >
                  <LinkIcon className="h-3 w-3 mr-1" />
                  Open de map met voorbeelden
                </Button>
              </div>
            </div>
          </Card>

          {/* Bot Zuid – rechts, 2/3 breed */}
          <Card className="h-full p-5 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 md:col-span-2">
            <div className="absolute inset-x-0 top-0 h-1 bg-white/40" />
            <div className="relative space-y-3 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center shadow-sm border border-white/30">
                    <span className="text-lg font-semibold">🤖</span>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide font-semibold text-blue-100">
                      Chatbot · ICT &amp; AI
                    </p>
                    <h3 className="text-sm sm:text-base font-semibold">
                      Bot Zuid – ICT (Gemini)
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">
                  Nieuw &amp; experimenteel
                </span>
              </div>

              <p className="text-xs sm:text-sm text-blue-50 leading-relaxed">
                Stel je vraag over Smartschool, hardware, software of AI in de klas. Bot Zuid
                is afgestemd op onze scholengroep en antwoordt kort, duidelijk en in het
                Nederlands.
              </p>

              <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm space-y-3">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 mb-1">
                    Direct chatten met Bot Zuid
                  </p>
                  <SupportChat />
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Problemen met ICT-materiaal?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Gebruik ons officiële ticketsysteem voor storingen, defecten en aanvragen.
                  </p>
                  <div className="mt-2">
                    <Button
                      as="a"
                      href="https://sint-rembert.topdesk.net/"
                      variant="secondary"
                    >
                      Naar Topdesk
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="px-2 py-1 rounded-full bg-white/15 border border-white/20">
                  💻 “Mijn projector werkt niet…”
                </span>
                <span className="px-2 py-1 rounded-full bg-white/15 border border-white/20">
                  📱 “Hoe kan ik AI veilig gebruiken?”
                </span>
                <span className="px-2 py-1 rounded-full bg-white/15 border border-white/20">
                  🧪 “Idee voor AI in mijn les…”
                </span>
              </div>

              <Button
                as="a"
                href={GEMINI_URL}
                variant="secondary"
                className="w-full justify-center bg-white/10 text-white border-white/40 hover:bg-white/20 text-xs"
              >
                Werkt dit niet? Open Bot Zuid in een nieuw tabblad
              </Button>
            </div>
          </Card>
        </section>

        {/* Actieve "subpagina" */}
        {activePage && (
          <section className="mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-[11px] sm:text-xs text-blue-800 font-semibold">
              <Sparkles className="h-3 w-3" />
              <span>
                Je bekijkt nu: <span className="underline">{activePageLabel}</span>
              </span>
            </div>
            {renderActiveSection()}
          </section>
        )}

        {/* Footer */}
        <footer className="mt-6 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2">
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Scholengroep Sint-Rembert · Werkgroep Digitale Didactiek
            </p>
          </div>
        </footer>
      </main>

      {/* Zwevend plannertje rechtsonder */}
      <FloatingPlanner />
    </div>
  );
}
