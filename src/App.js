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
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-semibold">
              SR
            </span>
            <div>
              <h1 className="text-sm sm:text-base font-semibold">
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
        {/* Hero – groot zoals vroeger */}
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
                    Vind AI-tools, voorbeelden (o.a. met{" "}
                    <span className="font-semibold">Google Forms</span>) en duidelijke
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
                <h3 className="text-sm font-semibold text-slate-800">
                  Werkgroep Digitale Didactiek
                </h3>
                <p className="text-xs text-slate-500">
                  Aanspreekpunt voor vragen over ICT &amp; AI in je les.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                  <p className="font-semibold text-slate-800 text-sm">Technisch team</p>
                  <p className="text-xs text-slate-600">
                    Mieke Verbeerst<br />
                    Barbara Van Hecke<br />
                    Arne Breemeersch
                  </p>
                </div>
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                  <p className="font-semibold text-slate-800 text-sm">Pedagogisch team</p>
                  <p className="text-xs text-slate-600">
                    Jasper Gerits<br />
                    Glenn Van de Voorde
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600">
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
                <h3 className="text-sm font-semibold text-slate-900 mt-1">
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
              <p className="text-xs text-slate-700">
                Stel je vraag over Smartschool, hardware, software of AI in de klas. De
                chatbot is getraind op de context van onze scholengroep.
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
              <p className="text-xs text-slate-500 mt-1">
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
                  <h3 className="text-sm font-semibold text-slate-900">AI-tools</h3>
                  <p className="text-xs text-slate-500">
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

              <div className="border border-dashed border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-600 bg-slate-50">
                Meer weten over concrete lesvoorbeelden (incl. Google Forms)? Zie het
                blok{" "}
                <span className="font-semibold">
                  &ldquo;AI in je les: voorbeelden&rdquo;
                </span>{" "}
                hieronder.
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
                <p className="text-sm text-slate-600 mt-2">
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

        {/* AI in je les: aparte blok, met voorbeelden & Drive-link */}
        <section className="mb-10">
          <Card className="p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-[11px] font-medium text-blue-600 uppercase tracking-wide">
                  Praktijk
                </p>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                  AI in je les: voorbeelden &amp; Google Forms
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Concrete voorbeelden om AI en digitale tools (zoals{" "}
                  <span className="font-semibold">Google Forms</span>) in te zetten in je lessen.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-100">
                Aanrader om mee te starten
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div className="space-y-2">
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>AI laten meehelpen bij het maken van vragen in Google Forms.</li>
                  <li>Reflectieformulieren genereren na een toets of project.</li>
                  <li>Resultaten uit Forms samenvatten met AI (sterktes/zwaktes van de klas).</li>
                  <li>Kleine opdrachten waarbij leerlingen AI als hulplijn gebruiken.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  Direct aan de slag
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    as="a"
                    href={DRIVE_EXAMPLES_URL}
                    variant="primary"
                    className="justify-center"
                  >
                    📂 Open map met voorbeelden (Drive)
                  </Button>
                  <Button
                    as="a"
                    href="https://forms.google.com"
                    variant="secondary"
                    className="justify-center text-xs"
                  >
                    <LinkIcon className="h-3 w-3" />
                    Open Google Forms
                  </Button>
                  <Button
                    onClick={() => setShowExamples(true)}
                    variant="ghost"
                    className="justify-center text-xs"
                  >
                    <BookOpen className="h-3 w-3" />
                    Bekijk uitgewerkte scenario&apos;s
                  </Button>
                </div>
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
                  <h3 className="text-sm font-semibold text-slate-900">
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
                  <ul className="text-sm text-slate-700 space-y-2">
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

      {/* Modal: Voorbeelden / scenario's (incl. Google Forms) */}
      {showExamples && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                Voorbeelden: AI in je les (incl. Google Forms)
              </h2>
              <button
                onClick={() => setShowExamples(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 space-y-6 text-sm text-slate-700">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  NotebookLM – werken met leerstof
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Hoofdstukken uit handboeken laten samenvatten voor leerlingen.</li>
                  <li>Belangrijke begrippen laten uitlichten met voorbeelden.</li>
                  <li>Vragen laten genereren als voorbereiding op een toets.</li>
                </ul>
              </div>

              {/* Google Forms blok – opvallend */}
              <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">
                <p className="text-[11px] font-semibold text-blue-700 uppercase tracking-wide mb-1">
                  Voorbeelden met Google Forms
                </p>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Google Forms + AI – toetsen &amp; bevragingen
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Laat een AI-tool (bv. ChatGPT/Gemini) meerkeuzevragen genereren op basis van je cursus, en
                    plak ze in een Google Form.
                  </li>
                  <li>
                    Vraag AI om verbeterde feedbackzinnen te maken voor juiste/foute antwoorden in het formulier.
                  </li>
                  <li>
                    Gebruik AI om samenvattingen van de resultaten te maken (sterktes/zwaktes van de klas) op basis van de
                    Google Forms-export naar Sheets.
                  </li>
                  <li>
                    Bouw met AI een korte reflectievragenlijst (Google Form) na een toets of project.
                  </li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    as="a"
                    href="https://forms.google.com"
                    variant="secondary"
                    className="text-xs"
                  >
                    <LinkIcon className="h-3 w-3" />
                    <span className="ml-1">Open Google Forms</span>
                  </Button>
                  <Button
                    as="a"
                    href={DRIVE_EXAMPLES_URL}
                    variant="ghost"
                    className="text-xs"
                  >
                    📂 Map met voorbeelden (Drive)
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Lovable – kleine webapps en portals
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Een eenvoudige klas- of projectwebsite maken.</li>
                  <li>Een oefenplatform rond één thema (bv. examens, hoofdstuk).</li>
                  <li>Leerlingen zelf een mini-site laten bouwen als opdracht.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Praktische tips
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Begin met een korte klassikale demo voor je leerlingen aan de slag laat gaan.</li>
                  <li>Werk bij voorkeur in duo’s: zo helpen ze elkaar.</li>
                  <li>Maak duidelijke afspraken rond privacy en wat ze wel/niet mogen ingeven.</li>
                  <li>Laat leerlingen steeds kritisch blijven: AI is een hulpmiddel, geen einddoel.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
