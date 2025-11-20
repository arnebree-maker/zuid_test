import React, { useState } from "react";
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
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg focus:ring-blue-400 shadow-md",
    secondary:
      "bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-300 border border-gray-200 shadow-sm hover:shadow-md",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
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
    className={`rounded-3xl border border-gray-200/50 bg-white backdrop-blur shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
  >
    {children}
  </div>
);

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const event = new Date(targetDate);
      const diff = event.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("De bijscholing is gestart! 🎉");
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
      <p className="font-mono text-lg font-semibold text-fuchsia-700">
        {timeLeft}
      </p>
      <p className="text-[11px] text-gray-500">
        Beperkt aantal plaatsen – schrijf tijdig in.
      </p>
    </div>
  );
}


export default function App() {
  const [showExamples, setShowExamples] = useState(false);
  const [showAiWhy, setShowAiWhy] = useState(true);

  const openGeminiChat = () => {
    if (typeof window !== "undefined") {
      const features =
        "width=500,height=750,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes";
      window.open(GEMINI_URL, "BotZuidICT", features);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Top bar */}
      <div className="border-b border-white/20 bg-white/60 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            Scholengroep Sint-Rembert · SiVi & VLTI
          </h1>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600">
            Werkgroep <strong className="ml-1">Digitale Didactiek</strong>
            <Button as="a" href="#" variant="secondary" className="ml-3">
              <Home className="h-4 w-4" /> Home
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero */}
        <div className="relative -mx-4 sm:-mx-6 mb-12 sm:mb-16">
          <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
            <img
              src="/media/01037808-bc10-468e-a00f-af57eea24fce.jpeg"
              alt="Team samenwerking en enthousiasme"
              className="w-full h-full object-cover object-left scale-105 hover:scale-100 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-end">
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 pb-8 sm:pb-16">
                <div className="max-w-3xl">
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
                    Welkom op het
                    <br />
                    Sint-Rembert Portaal
                  </h2>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium drop-shadow-lg">
                    Vind snel de juiste ondersteuning voor <strong>ICT</strong> en{" "}
                    <strong>AI in het onderwijs</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

{/* Werkgroep + Lovable opleiding naast elkaar */}
<div className="grid md:grid-cols-2 gap-6 mb-12">
  {/* Team kaart */}
  <Card className="p-8 sm:p-10 shadow-xl border-0 bg-white">
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold mb-6">
        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
        Werkgroep Digitale Didactiek
      </div>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <div className="grid sm:grid-cols-2 gap-6 mt-8 text-left">
          <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
            <p className="font-semibold text-gray-900 mb-2">Technisch team</p>
            <p className="text-sm">Mieke Verbeerst, Barbara Van Hecke, Arne Breemeersch</p>
          </div>
          <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
            <p className="font-semibold text-gray-900 mb-2">Pedagogisch team</p>
            <p className="text-sm">Jasper Gerits, Glenn Van de Voorde</p>
          </div>
        </div>
        <p className="mt-6 text-base">
          Is iets onduidelijk? <strong className="text-blue-700">Spreek ons gerust aan.</strong>
        </p>
      </div>
    </div>
  </Card>

  {/* NIEUW BLOK – Lovable Bijscholing (gepimpt) */}
  <Card className="p-8 sm:p-10 shadow-xl border-0 bg-gradient-to-br from-blue-50 via-fuchsia-50 to-fuchsia-100 hover:-translate-y-1 hover:shadow-2xl transition-transform duration-200">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-xs font-semibold mb-4">
      <span className="w-1.5 h-1.5 bg-fuchsia-600 rounded-full" />
      🔥 Nieuw in december
    </div>

    {/* Titel + icoon */}
    <div className="flex items-center gap-2 mb-3">
      <div className="p-2 rounded-xl bg-fuchsia-600 text-white shadow-md">
        <Sparkles className="h-5 w-5" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900">
        Bijscholing: <span className="text-fuchsia-700">Lovable</span>
      </h3>
    </div>

    {/* Korte beschrijving */}
    <p className="text-gray-700 text-sm mb-4">
      Maak in 1 uur een eigen AI-website met <strong>Lovable</strong>. Ideaal om
      snel een portaal, projectsite of oefenapp voor je leerlingen te bouwen.
    </p>

    {/* Bullets */}
    <ul className="text-sm text-gray-800 space-y-1.5 mb-4">
      <li>✅ Basis van Lovable in onderwijscontext</li>
      <li>✅ Voorbeelden van sites van collega’s</li>
      <li>✅ Tijd om zelf iets te bouwen</li>
    </ul>

    {/* Meta: datum, lokaal, doelgroep */}
    <div className="mt-2 space-y-2 text-sm text-gray-700">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-fuchsia-700" />
        <span>
          <strong>Datum:</strong> 15 december 2025
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-fuchsia-700" />
        <span>
          <strong>Startuur:</strong> bv. 16u00 (pas gerust aan)
        </span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-fuchsia-700" />
        <span>
          <strong>Locatie:</strong> Lokaal Z314
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-1 rounded-full bg-fuchsia-700/10 text-fuchsia-800 font-semibold">
          Doelgroep: alle leerkrachten · beginners welkom
        </span>
      </div>
    </div>

    {/* Countdown timer blok */}
    <div className="mt-6 p-4 bg-white/80 rounded-2xl shadow-inner border border-fuchsia-200">
      <p className="text-xs text-gray-600 mb-1">⏳ Tijd tot start</p>
      <CountdownTimer targetDate="2025-12-15T16:00:00" />
    </div>

    {/* Inschrijven knop + extra link */}
    <div className="mt-6 space-y-2">
      <Button
        as="a"
        href="#"
        // TODO: vervang "#" door je echte inschrijfformulier (bv. Google Form)
        variant="primary"
        className="w-full justify-center bg-fuchsia-600 hover:bg-fuchsia-700"
      >
        📥 Schrijf je in
      </Button>
      <button
        type="button"
        className="w-full text-xs text-fuchsia-800 underline flex items-center justify-center gap-1"
      >
        <LinkIcon className="h-3 w-3" />
        🤖 Bekijk voorbeelden van Lovable-projecten
      </button>
    </div>
  </Card>
</div>



        {/* Twee hoofdcards naast elkaar */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* AI-tools kaart (links) */}
          <Card className="p-0 overflow-hidden group">
            <div className="p-6 sm:p-7 flex items-start gap-3 border-b border-gray-200/50 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600">
              <div className="rounded-xl p-2.5 bg-white/20 backdrop-blur text-white shadow-lg">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AI-tools</h3>
                <p className="text-white/90">Snelle toegang tot handige toepassingen voor in de klas.</p>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-5 bg-white">
              {/* AI-tool buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

              {/* Hoe toepassen-button */}
              <Button
                onClick={() => setShowExamples(true)}
                variant="primary"
                className="w-full justify-center mt-3 bg-blue-600 hover:bg-blue-700"
              >
                <BookOpen className="h-4 w-4" /> Hoe toepassen in je les?
              </Button>

              {/* Oranje + paarse kaart */}
              <div className="space-y-3 mt-4">
                <div className="bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-2xl p-5 shadow-lg">
                  <p className="text-xs font-bold mb-2 tracking-wide">COLLECTIEVE INSPIRATIE!</p>
                  <p className="text-sm mb-4">
                    Bekijk wat je collega&apos;s hebben gemaakt en voeg jouw beste ideeën toe!
                  </p>
                  <Button
                    as="a"
                    href="https://drive.google.com/drive/folders/12hkdkdgrNgK8W3b5qXjJvcPaKsinLEuj?usp=drive_link"
                    variant="secondary"
                    className="w-full bg-white text-orange-600 hover:bg-orange-50 shadow-md border-0 justify-center"
                  >
                    <LinkIcon className="h-4 w-4" />
                    Drop je eigen ideeën hier
                  </Button>
                </div>

                <div className="bg-gradient-to-br from-fuchsia-50 to-pink-100 rounded-2xl p-5 border border-fuchsia-100 shadow-md">
                  <p className="text-xs font-bold text-fuchsia-800 mb-2 tracking-wide">
                    Deze website is gemaakt met AI
                  </p>
                  <p className="text-sm text-fuchsia-900">
                    Gebouwd met Lovable.dev – een voorbeeld van AI in de praktijk!
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Vragen kaart (rechts) – ZONDER iframe, met knop naar popup */}
          <Card className="p-0 overflow-hidden group">
            <div className="p-6 sm:p-7 flex items-start gap-3 border-b border-gray-200/50 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600">
              <div className="rounded-xl p-2.5 bg-white/20 backdrop-blur text-white shadow-lg">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Vragen</h3>
                <p className="text-white/90">Snelle ICT-hulp via Bot Zuid (Gemini) en ons ticketsysteem.</p>
              </div>
            </div>

            <div className="divide-y divide-gray-200/50 bg-white">
              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-xl p-3 bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md">
                    <LinkIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Chatbot</p>
                    <p className="font-bold text-gray-900">Bot Zuid – ICT (Gemini)</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">
                  Stel je vraag over ICT of AI in de klas. De chatbot is gebouwd met{" "}
                  <strong>Google Gemini</strong>.
                </p>

                <div className="flex flex-col gap-2">
                  <Button variant="primary" className="justify-center" onClick={openGeminiChat}>
                    Open Chatbot <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button as="a" href={GEMINI_URL} variant="secondary" className="justify-center">
                    Open in nieuw tabblad
                  </Button>
                </div>
              </div>

              <div className="p-6 sm:p-7 hover:bg-blue-50/50 transition-colors">
                <h4 className="text-base font-bold text-gray-900">Problemen met ICT-materiaal?</h4>
                <p className="text-gray-700 mt-1">
                  Dien snel een ticket in via ons officiële ondersteuningsportaal.
                </p>
                <div className="mt-4">
                  <Button as="a" href="https://sint-rembert.topdesk.net/" variant="secondary">
                    Naar Topdesk <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Brede groene kaart onderaan met chevron / uitklappen */}
        <Card className="mt-10 p-0 overflow-hidden group">
          <button
            type="button"
            onClick={() => setShowAiWhy(!showAiWhy)}
            className="w-full p-6 sm:p-7 flex items-start gap-3 border-b border-gray-200/50 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600"
          >
            <div className="rounded-xl p-2.5 bg-white/20 backdrop-blur text-white shadow-lg">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div className="flex-1 flex items-center justify-between gap-4">
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">Waarom AI gebruiken in het onderwijs?</h3>
                <p className="text-white/90">AI maakt leren persoonlijker, efficiënter en creatiever.</p>
              </div>
              <div className="shrink-0 rounded-full bg-white/15 p-2">
                <ChevronDown
                  className={`h-5 w-5 text-white transition-transform ${
                    showAiWhy ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </div>
            </div>
          </button>

          {showAiWhy && (
            <div className="divide-y divide-gray-200/50 bg-white">
              <div className="p-6 sm:p-7">
                <h4 className="text-base font-bold text-gray-900 mb-3">Kernvoordelen</h4>
                <ul className="list-none text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Dieper leren door reflectie</strong> – AI genereert gerichte reflectievragen.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Structuur via mindmaps</strong> – AI helpt thema&apos;s ordenen en verbanden zien.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Schrijf- &amp; leesvaardigheid</strong> – Gepersonaliseerde feedback en
                      niveau-aanpassing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Oefenen van spreekvaardigheid</strong> – Virtuele gesprekspartners in een veilige
                      omgeving.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Sneller inzicht</strong> – Automatische samenvattingen met de hoofdlijnen.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Creativiteit stimuleren</strong> – Beeld, audio en verhalen met o.a. DALL·E en Suno.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Efficiënt evalueren</strong> – Snel vragen en quizzen genereren.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Rekenondersteuning</strong> – Stapsgewijze oplossingen en alternatieve
                      aanpakken.
                    </span>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs font-semibold text-blue-900 mb-2">Meer lezen?</p>
                  <ul className="space-y-1.5">
                    <li>
                      <a
                        className="text-blue-700 hover:text-blue-900 underline text-sm font-medium"
                        href="https://www.ser.nl/nl/actueel/Nieuws/ChatGPT-in-het-onderwijs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ChatGPT in het onderwijs – SER
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blue-700 hover:text-blue-900 underline text-sm font-medium"
                        href="https://www.destudentenadvocaat.nl/blog/voordelen-chatgpt-onderwijs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Voordelen van ChatGPT – De Studentenadvocaat
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 sm:p-7 bg-gradient-to-br from-slate-50 to-emerald-50">
                <h4 className="text-base font-bold text-gray-900 mb-2">AI en formatief handelen</h4>
                <p className="text-gray-700">
                  AI helpt tijd besparen, patronen herkennen en feedback gerichter inzetten.
                </p>
                <div className="mt-4">
                  <Button
                    as="a"
                    href="https://toetsrevolutie.nl/tijd-besparen-met-ai-formatief-handelen-in-de-praktijk/?utm_source=teachertapp&utm_medium=app"
                    variant="secondary"
                  >
                    Lees meer over formatief handelen <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="mt-16 mb-8 text-center">
          <div className="inline-block px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Scholengroep Sint-Rembert · Digitale Didactiek
            </p>
          </div>
        </div>
      </main>

      {/* Floating chat bubble rechtsonder */}
      <button
        type="button"
        onClick={openGeminiChat}
        className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full shadow-xl bg-blue-600 text-white h-14 w-14 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      >
        <HelpCircle className="h-6 w-6" />
        <span className="sr-only">Chat met Bot Zuid (Gemini)</span>
      </button>

      {/* Modal: Hoe toepassen in je les? */}
      {showExamples && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 border-b border-blue-700/20 p-6 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-2xl font-bold text-white">Hoe toepassen in je les?</h2>
              <button
                onClick={() => setShowExamples(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* NotebookLM voorbeelden */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-xl p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">NotebookLM Voorbeelden</h3>
                </div>
                <p className="text-gray-700 mb-5">
                  NotebookLM helpt leerlingen samenvattingen te maken, bronnen te analyseren en diepgaande
                  vragen te stellen over hun leerstof.
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-emerald-500 bg-emerald-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Geschiedenis: Tweede Wereldoorlog Analyse</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Upload hoofdstukken uit het geschiedenishandboek en laat NotebookLM een interactieve
                      samenvatting maken met tijdlijn en kernconcepten.
                    </p>
                    <Button as="a" href="https://notebooklm.google.com/" variant="secondary" className="text-xs">
                      Probeer NotebookLM <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Wetenschappen: Onderzoeksrapporten Samenvatten</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Leerlingen uploaden wetenschappelijke artikelen en NotebookLM extraheert de belangrijkste
                      bevindingen, methodologie en conclusies.
                    </p>
                    <Button as="a" href="https://notebooklm.google.com/" variant="secondary" className="text-xs">
                      Probeer NotebookLM <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Talen: Literatuuranalyse</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Upload een boek of gedicht en laat NotebookLM thema&apos;s, personages en literaire
                      technieken analyseren voor diepere tekstbegrip.
                    </p>
                    <Button as="a" href="https://notebooklm.google.com/" variant="secondary" className="text-xs">
                      Probeer NotebookLM <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="border-l-4 border-amber-500 bg-amber-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Examens: Studiemateriaal Omzetten naar Podcast
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Upload notities en laat NotebookLM een audio-discussie genereren tussen twee sprekers die
                      de leerstof uitleggen – perfect voor auditieve leerlingen.
                    </p>
                    <Button as="a" href="https://notebooklm.google.com/" variant="secondary" className="text-xs">
                      Probeer NotebookLM <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Lovable voorbeelden */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-xl p-3 bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Lovable Voorbeelden</h3>
                </div>
                <p className="text-gray-700 mb-5">
                  Lovable helpt leerlingen en leerkrachten eenvoudig interactieve webapplicaties te bouwen zonder
                  programmeerkennis.
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-cyan-500 bg-cyan-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Project: Interactieve Quiz App</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Leerlingen maken een quiz-app voor hun klasgenoten over hun vakinhoudsonderwerp – ideaal
                      voor STEM-vakken of talen.
                    </p>
                    <Button as="a" href="https://lovable.dev/" variant="secondary" className="text-xs">
                      Probeer Lovable <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="border-l-4 border-pink-500 bg-pink-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Creatief Project: Digitaal Portfolio</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Bouw een persoonlijk portfolio-website voor eindwerk, kunstprojecten of reflecties zonder
                      code te hoeven schrijven.
                    </p>
                    <Button as="a" href="https://lovable.dev/" variant="secondary" className="text-xs">
                      Probeer Lovable <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="border-l-4 border-teal-500 bg-teal-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Leerkracht Tool: Lesplanner App</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Maak een gepersonaliseerde lesplanningstool met agenda, to-do-lijsten en leermiddelen – volledig
                      aangepast aan jouw behoeften.
                    </p>
                    <Button as="a" href="https://lovable.dev/" variant="secondary" className="text-xs">
                      Probeer Lovable <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="border-l-4 border-orange-500 bg-orange-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Digitale Vaardigheden: Eigen Website Bouwen
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Leer leerlingen basis webdesign-concepten door hun eigen website te laten maken – van
                      simpele landingspagina tot interactieve app.
                    </p>
                    <Button as="a" href="https://lovable.dev/" variant="secondary" className="text-xs">
                      Probeer Lovable <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tips voor gebruik in de klas */}
              <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-inner">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Tips voor gebruik in de klas
                </h4>
                <ul className="list-none text-sm text-gray-700 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-0.5">→</span>
                    <span>Begin met een demo voor de hele klas voordat leerlingen zelfstandig aan de slag gaan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-0.5">→</span>
                    <span>Laat leerlingen in tweetallen werken om elkaar te ondersteunen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-0.5">→</span>
                    <span>Geef duidelijke instructies over wat wel en niet gedeeld mag worden.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-0.5">→</span>
                    <span>Moedig kritisch denken aan: AI is een hulpmiddel, geen vervanging voor eigen werk.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-0.5">→</span>
                    <span>Bespreek ethiek en privacy bij het gebruik van AI-tools.</span>
                  </li>
                </ul>
              </div>

              {/* Deel je ervaring */}
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-6 shadow-xl">
                <h4 className="font-bold text-white mb-3 text-lg">Deel je ervaring!</h4>
                <p className="text-sm text-white/95 mb-4">
                  Heb je zelf interessante projecten of toepassingen in je les? Deel je ideeën en ervaringen met de
                  hele werkgroep. Dit helpt iedereen om van elkaar te leren!
                </p>
                <Button
                  as="a"
                  href="https://drive.google.com/drive/folders/12hkdkdgrNgK8W3b5qXjJvcPaKsinLEuj?usp=drive_link"
                  variant="secondary"
                  className="w-full bg-white text-black hover:bg-blue-50 shadow-lg border-0 justify-center"
                >
                  <LinkIcon className="h-4 w-4" /> Drop je projectjes in de Google Drive
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
