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

const GEMINI_URL =
  "https://gemini.google.com/gem/1eAez_W8DALYxBVNPQTzmg2CVx4XDn6w7?usp=sharing";

const DRIVE_EXAMPLES_URL =
  "https://drive.google.com/drive/folders/12hkdkdgrNgK8W3b5qXjJvcPaKsinLEuj?usp=sharing";

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

/* ---- Subsecties voor de "pagina's" ---- */

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

/* ---- Hoofdcomponent ---- */

export default function App() {
  const [activePage, setActivePage] = useState(null); // null = enkel home

  const openGeminiChat = () => {
    if (typeof window !== "undefined") {
      const features =
        "width=500,height=750,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes";
      window.open(GEMINI_URL, "BotZuidICT", features);
    }
  };

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
        {/* Compacte hero */}
        <section className="mt-6 mb-4">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
            <div className="relative h-[38vh] sm:h-[42vh]">
              <img
                src="/media/01037808-bc10-468e-a00f-af57eea24fce.jpeg"
                alt="Team samenwerking en enthousiasme"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/55 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="px-6 sm:px-8 max-w-xl space-y-3">
                  <p className="text-[11px] font-semibold tracking-wide text-blue-300 uppercase">
                    Portaal Digitale Didactiek
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
                    ICT &amp; AI-ondersteuning
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-md">
                    Startpunt voor AI-tools, voorbeelden en hulp bij ICT-vragen binnen
                    Scholengroep Sint-Rembert.
                  </p>
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

{/* Snel naar de juiste info (links, sticky) + Bot Zuid (rechts) */}
<section className="mb-6 grid gap-4 md:grid-cols-3 items-start">
  {/* Snel naar de juiste info – links, 1/3 breed en sticky */}
  <Card className="h-full p-5 flex flex-col md:col-span-1 md:sticky md:top-24">
    <div className="flex items-center gap-2 mb-3">
      <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
        <Sparkles className="h-4 w-4" />
      </div>
      <div>
        <h3 className="text-sm sm:text-base font-semibold text-slate-900">
          Snel naar de juiste info
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Kies een onderdeel. De inhoud verschijnt onderaan op deze pagina.
        </p>
      </div>
    </div>

    {/* Links onder elkaar */}
    <div className="flex flex-col gap-2 text-sm">
      <button
        type="button"
        onClick={() => setActivePage("ai-tools")}
        className={`group rounded-lg border px-3 py-2.5 text-left transition-colors ${
          activePage === "ai-tools"
            ? "border-blue-500 bg-blue-50"
            : "border-slate-200 bg-slate-50 hover:border-blue-500 hover:bg-blue-50"
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-slate-900">AI-tools</span>
          <Lightbulb className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
        </div>
        <p className="text-xs text-slate-600">
          Overzicht van tools zoals ChatGPT, Gemini, NotebookLM, Genially…
        </p>
      </button>

      <button
        type="button"
        onClick={() => setActivePage("voorbeelden")}
        className={`group rounded-lg border px-3 py-2.5 text-left transition-colors ${
          activePage === "voorbeelden"
            ? "border-blue-500 bg-blue-50"
            : "border-slate-200 bg-slate-50 hover:border-blue-500 hover:bg-blue-50"
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-slate-900">
            Voorbeelden &amp; scenario&apos;s
          </span>
          <BookOpen className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
        </div>
        <p className="text-xs text-slate-600">
          Drive-map met concrete lesvoorbeelden en prompts van collega&apos;s.
        </p>
      </button>

      <button
        type="button"
        onClick={() => setActivePage("bijscholing")}
        className={`group rounded-lg border px-3 py-2.5 text-left transition-colors ${
          activePage === "bijscholing"
            ? "border-blue-500 bg-blue-50"
            : "border-slate-200 bg-slate-50 hover:border-blue-500 hover:bg-blue-50"
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-slate-900">
            Bijscholing &amp; vorming
          </span>
          <Sparkles className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
        </div>
        <p className="text-xs text-slate-600">
          Info over Lovable-sessies en toekomstige AI-/ICT-vormingen.
        </p>
      </button>

      <button
        type="button"
        onClick={() => setActivePage("ai-beleid")}
        className={`group rounded-lg border px-3 py-2.5 text-left transition-colors ${
          activePage === "ai-beleid"
            ? "border-blue-500 bg-blue-50"
            : "border-slate-200 bg-slate-50 hover:border-blue-500 hover:bg-blue-50"
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-slate-900">AI-richtlijnen</span>
          <Lightbulb className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
        </div>
        <p className="text-xs text-slate-600">
          Wat mag wel/niet met AI + links naar achtergrondinfo.
        </p>
      </button>
    </div>

    {/* Kleine extra tekst + link onderaan */}
    <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] sm:text-xs text-slate-600 space-y-1">
      <p className="font-semibold text-slate-800">
        Tip: start met de voorbeelden.
      </p>
      <p>
        In de Drive-map vind je kant-en-klare lessen en prompts die je meteen kan
        uitproberen in de klas.
      </p>
      <Button
        as="a"
        href={DRIVE_EXAMPLES_URL}
        variant="ghost"
        className="justify-start px-0 text-[11px]"
      >
        <LinkIcon className="h-3 w-3 mr-1" />
        Open de map met voorbeelden
      </Button>
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
          <section className="mb-10">
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

      
    </div>
  );
}
