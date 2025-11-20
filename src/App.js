import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronDown,
  Link as LinkIcon,
  HelpCircle,
  Home,
  Lightbulb,
  BookOpen,
  X,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
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
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
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
  <div
    className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
  >
    {children}
  </div>
);

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
      <p className="font-mono text-sm font-semibold text-slate-800">
        {timeLeft}
      </p>
      <p className="text-[11px] text-slate-500">
        Beperkt aantal plaatsen – schrijf tijdig in.
      </p>
    </div>
  );
}

export default function App() {
  const [showExamples, setShowExamples] = useState(false);
  const [showAiWhy, setShowAiWhy] = useState(false); // start dicht

  const openGeminiChat = () => {
    if (typeof window !== "undefined") {
      const features =
        "width=500,height=750,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes";
      window.open(GEMINI_URL, "BotZuidICT", features);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
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
            Werkgroep <span className="font-semibold text-slate-700">Digitale Didactiek</span>
            <Button as="a" href="#" variant="secondary" className="ml-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        {/* Hero – groot */}
        <section className="mt-6 mb-12">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
            <div className="relative h-[55vh] sm:h-[60vh] md:h-[65vh]">
              <img
                src="/media/01037808-bc10-468e-a00f-af57eea24fce.jpeg"
                alt="Team samenwerking en enthousiasme"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/55 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="px-6 sm:px-10 max-w-2xl space-y-4">
                  <p className="text-xs font-semibold tracking-wide text-blue-300 uppercase">
                    Portaal Digitale Didactiek
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
                    ICT &amp; AI-ondersteuning
                    <span className="block text-slate-200 text-base sm:text-lg font-normal mt-2">
                      Alles wat je nodig hebt voor digitale lessen binnen Sint-Rembert.
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-200 max-w-xl">
                    Vind AI-tools, voorbeelden van collega&apos;s en duidelijke
                    hulpkanalen voor ICT-vragen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rij 1: Werkgroep + Vragen & ondersteuning */}
        <section className="mb-10 grid gap-5 md:grid-cols-2">
          {/* Werkgroep kaart */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-800">
                  Werkgroep Digitale Didactiek
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Aanspreekpunt voor vragen over ICT &amp; AI in je les.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                  <p className="font-semibold text-slate-800 text-sm">Technisch team</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mieke Verbeerst<br />
                    Barbara Van Hecke<br />
                    Arne Breemeersch
                  </p>
                </div>
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                  <p className="font-semibold text-slate-800 text-sm">Pedagogisch team</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Jasper Gerits<br />
                    Glenn Van de Voorde
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600">
                Liever offline?{" "}
                <span className="font-semibold text-slate-800">
                  Spreek ons gerust aan op school.
                </span>
              </p>
            </div>
          </Card>

          {/* Vragen & ondersteuning – chatbot laten opvallen */}
          <Card className="p-6 relative overflow-hidden">
            {/* subtiele banner */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600" />

            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
                  Vragen &amp; ondersteuning
                </p>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 mt-1">
                  Snelle hulp bij ICT en AI
                </h3>
              </div>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-100">
                Nieuw: Bot Zuid
              </span>
            </div>

            {/* Chatbot blok */}
            <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-blue-700 font-semibold">
                    Chatbot
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    Bot Zuid – ICT (Gemini)
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Stel je vraag over Smartschool, hardware, software of AI in de klas. De
                chatbot is gebouwd met Google Gemini en afgestemd op onze scholengroep.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="primary"
                  onClick={openGeminiChat}
                  className="flex-1 justify-center"
                >
                  <span className="inline-flex items-center gap-1">
                    Chat met Bot Zuid
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </Button>
                <Button
                  as="a"
                  href={GEMINI_URL}
                  variant="ghost"
                  className="flex-1 justify-center text-xs"
                >
                  <LinkIcon className="h-3 w-3" />
                  Open in nieuw tabblad
                </Button>
              </div>
            </div>

            {/* Topdesk blok */}
            <div className="pt-3 border-t border-slate-200 mt-2">
              <h4 className="text-sm font-semibold text-slate-900">
                Problemen met ICT-materiaal?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Gebruik ons officiële ticketsysteem voor storingen, defecten en aanvragen.
              </p>
              <div className="mt-3">
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
          </Card>
        </section>

        {/* Rij 2: AI-tools + Lovable bijscholing */}
        <section className="mb-10 grid gap-5 md:grid-cols-2">
          {/* AI-tools kaart */}
          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 px-5 py-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                    AI-tools
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Overzicht van tools die je in de klas kan gebruiken.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <Button as="a" href="https://chatgpt.com/" variant="secondary" className="justify-center">
                  ChatGPT
                </Button>
                <Button as="a" href="https://gemini.google.com/" variant="secondary" className="justify-center">
                  Google Gemini
                </Button>
                <Button as="a" href="https://www.genial.ly/" variant="secondary" className="justify-center">
                  Genially
                </Button>
                <Button as="a" href="https://notebooklm.google.com/" variant="secondary" className="justify-center">
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

              <div className="border border-dashed border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-600 bg-slate-50 leading-relaxed">
                Op zoek naar kant-en-klare voorbeelden en prompts? Bekijk de{" "}
                <span className="font-semibold">
                  voorbeeldenmap en scenario&apos;s
                </span>{" "}
                verder op deze pagina.
              </div>
            </div>
          </Card>

          {/* Lovable bijscholing – rechts naast AI-tools */}
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
                <p className="text-sm sm:text-[15px] text-slate-600 mt-2 leading-relaxed">
                  In 1 uur leer je hoe je met <span className="font-semibold">Lovable</span> een
                  eenvoudige AI-gestuurde website maakt voor je eigen lespraktijk.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
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
                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600">
                    Doelgroep: alle leerkrachten · beginners welkom
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  Je leert o.a.:
                </p>
                <ul className="text-sm text-slate-700 space-y-1.5">
                  <li>• Basis van Lovable in onderwijscontext</li>
                  <li>• Een eenvoudige les- of projectsite opzetten</li>
                  <li>• Voorbeelden van collega’s bekijken</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                <p className="text-xs text-slate-500 mb-1">Tijd tot start</p>
                <CountdownTimer targetDate="2025-12-15T16:00:00" />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  as="a"
                  href="#"
                  // TODO: vervang "#" door je echte inschrijfformulier
                  variant="primary"
                  className="w-full justify-center"
                >
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
        </section>

        {/* AI in je les: uitgewerkte scenario’s & Drive */}
        <section className="mb-10">
          <Card className="p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-[12px] font-medium text-blue-600 uppercase tracking-wide">
                  Praktijkvoorbeelden
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                  AI in je les: uitgewerkte scenario’s &amp; inspiratie
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Een groeiende verzameling voorbeelden, oefeningen, tools, AI-prompts en ideeën
                  gedeeld door collega’s binnen de scholengroep.
                </p>
              </div>

              <span className="hidden sm:inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-100">
                Community driven
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-sm leading-relaxed">
              <div className="space-y-3">
                <p className="font-semibold text-slate-800">Wat vind je in deze map?</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                  <li>Kant-en-klare lesvoorbeelden met AI-tools.</li>
                  <li>Voorbeelden van collega’s uit verschillende vakken.</li>
                  <li>Prompts die effectief werken in de klas.</li>
                  <li>Voorbeelden voor Genially, NotebookLM, Lovable enz.</li>
                  <li>Digitale oefeningen, stappenplannen en mini-apps.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  Direct gebruiken of zelf bijdragen
                </p>

                <Button
                  as="a"
                  href={DRIVE_EXAMPLES_URL}
                  variant="primary"
                  className="justify-center font-semibold"
                >
                  📁 Open de map met alle voorbeelden
                </Button>

                <Button
                  onClick={() => setShowExamples(true)}
                  variant="ghost"
                  className="justify-center text-xs"
                >
                  <BookOpen className="h-3 w-3" />
                  Bekijk uitgewerkte scenario’s
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* AI uitleg sectie – uitvouwbaar, met formatief-handelen link */}
        <section className="mt-2">
          <Card className="overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAiWhy(!showAiWhy)}
              className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                    Waarom AI gebruiken in het onderwijs?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Klik om deze uitleg {showAiWhy ? "te verbergen" : "uit te vouwen"}.
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-slate-500 transition-transform ${
                  showAiWhy ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>

            {showAiWhy && (
              <div className="divide-y divide-slate-200">
                <div className="px-5 py-4">
                  <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
                    <li>• Persoonlijke feedback en gerichte oefening voor leerlingen.</li>
                    <li>• Sneller materiaal maken: toetsen, rubrics, voorbeeldopdrachten.</li>
                    <li>• Ondersteuning bij differentiatie en remediëring.</li>
                    <li>• Hulp bij samenvatten, structureren en visualiseren van leerstof.</li>
                    <li>• Mogelijkheid om leerlingen kritisch te leren omgaan met AI.</li>
                  </ul>
                </div>
                <div className="px-5 py-4 bg-slate-50">
                  <p className="text-xs font-semibold text-slate-500 mb-2">
                    Meer lezen (incl. formatief handelen)
                  </p>
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
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* Footer */}
        <footer className="mt-12 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2">
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Scholengroep Sint-Rembert · Werkgroep Digitale Didactiek
            </p>
          </div>
        </footer>
      </main>

      {/* Floating chat bubble rechtsonder – extra opvallend */}
      <button
        type="button"
        onClick={openGeminiChat}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full shadow-lg bg-blue-600 text-white px-4 h-12 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-9 w-9 rounded-full bg-blue-500 opacity-60 animate-ping" />
          <span className="relative inline-flex h-9 w-9 rounded-full bg-blue-600 items-center justify-center">
            <HelpCircle className="h-5 w-5" />
          </span>
        </div>
        <span className="hidden sm:inline text-xs font-medium">
          Chat met Bot Zuid
        </span>
      </button>

      {/* Modal: Uitgewerkte scenario's (Forms-vrij, Drive centraal) */}
      {showExamples && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Uitgewerkte scenario’s &amp; inspiratievoorbeelden
              </h2>
              <button
                onClick={() => setShowExamples(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-8 text-sm leading-relaxed text-slate-700">
              {/* NotebookLM */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  NotebookLM – werken met leerstof
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Hoofdstukken automatisch laten samenvatten.</li>
                  <li>Belangrijke kernconcepten en begrippen laten uitlichten.</li>
                  <li>Vragen genereren om leerstof te verdiepen.</li>
                  <li>Audio-uitleg laten maken voor leerlingen die auditief leren.</li>
                </ul>
              </div>

              {/* Genially */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  Genially – interactieve presentaties
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Interactieve quizzen en escape rooms bouwen.</li>
                  <li>Visuele uitlegpagina’s genereren vanuit AI-content.</li>
                  <li>Leerlingen interactieve mindmaps en infographics laten maken.</li>
                </ul>
              </div>

              {/* Lovable */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  Lovable – mini-websites &amp; AI-tools
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Een AI-gestuurd opdrachtenportaal bouwen.</li>
                  <li>Klaswebsites voor projecten, excursies of thema’s.</li>
                  <li>Mini-apps voor oefenreeksen met eigen prompts.</li>
                </ul>
              </div>

              {/* Andere ideeën */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  Andere inspirerende toepassingen
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>AI-gegenereerde dialogen voor taallessen.</li>
                  <li>Korte reflectievragen creëren voor na een toets.</li>
                  <li>Snelle differentiatie: makkelijke/moeilijke versies laten maken.</li>
                  <li>Automatische mindmaps en overzichtstabellen voor moeilijke hoofdstukken.</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-2">
                  Alle uitgewerkte voorbeelden en bestanden vind je terug in de gezamenlijke Drive-map:
                </p>
                <Button
                  as="a"
                  href={DRIVE_EXAMPLES_URL}
                  variant="primary"
                  className="font-semibold"
                >
                  📁 Open de map met voorbeelden (Drive)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
