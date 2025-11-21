// pages/index.js
import React, { useState } from "react";
import {
  ChevronRight,
  HelpCircle,
  Home,
  Lightbulb,
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

// Eenvoudige inline chat die je bestaande /api/gemini-chat gebruikt
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

export default function HomePage() {
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

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        {/* Hero / banner */}
        <section className="mt-6 mb-10">
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
                      Snelle ondersteuning voor digitale lessen binnen Sint-Rembert.
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-200 max-w-xl">
                    Start hier met je vragen over ICT, AI-tools en lesvoorbeelden. De rest van
                    de inhoud vind je via de snelkoppelingen hieronder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rij: Werkgroep + Bot Zuid */}
        <section className="mb-10 grid gap-5 md:grid-cols-2">
          {/* Werkgroep kaart (links) */}
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
                    Mieke Verbeerst
                    <br />
                    Barbara Van Hecke
                    <br />
                    Arne Breemeersch
                  </p>
                </div>
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                  <p className="font-semibold text-slate-800 text-sm">Pedagogisch team</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Jasper Gerits
                    <br />
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

          {/* Bot Zuid – prominente kaart (rechts) */}
          <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500">
            <div className="absolute inset-x-0 top-0 h-1 bg-white/40" />
            <div className="relative space-y-4 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center shadow-sm border border-white/30">
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
                Stel je vraag over Smartschool, hardware, software of AI in de klas. Bot Zuid is
                gebouwd met Google Gemini en afgestemd op Scholengroep Sint-Rembert.
              </p>

              <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm space-y-4">
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
              </div>

              <div className="flex flex-wrap gap-1.5 text-[11px]">
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

        {/* Snelkoppelingen naar andere pagina's */}
        <section className="mb-10">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                  Snel naar de juiste info
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Kies wat je nodig hebt. De rest van de informatie staat overzichtelijk op aparte pagina&apos;s.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
              <a
                href="/ai-tools"
                className="group rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 flex flex-col justify-between hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900">AI-tools</span>
                  <Lightbulb className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
                </div>
                <p className="text-xs text-slate-600">
                  Overzicht van AI-tools zoals ChatGPT, Gemini, NotebookLM, Genially...
                </p>
              </a>

              <a
                href="/voorbeelden"
                className="group rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 flex flex-col justify-between hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900">Voorbeelden &amp; scenario&apos;s</span>
                  <BookOpenIcon className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
                </div>
                <p className="text-xs text-slate-600">
                  Uitgewerkte lessen, prompts en ideeën van collega&apos;s in één map.
                </p>
              </a>

              <a
                href="/bijscholing"
                className="group rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 flex flex-col justify-between hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900">Bijscholing &amp; vorming</span>
                  <Sparkles className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
                </div>
                <p className="text-xs text-slate-600">
                  Info over Lovable-sessies en toekomstige vormingen rond AI &amp; ICT.
                </p>
              </a>

              <a
                href="/ai-beleid"
                className="group rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 flex flex-col justify-between hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900">AI-richtlijnen</span>
                  <Lightbulb className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
                </div>
                <p className="text-xs text-slate-600">
                  Wat mag wel/niet met AI, en links naar verder leesvoer.
                </p>
              </a>
            </div>
          </Card>
        </section>

        {/* Footer */}
        <footer className="mt-8 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2">
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Scholengroep Sint-Rembert · Werkgroep Digitale Didactiek
            </p>
          </div>
        </footer>
      </main>

      {/* Floating chat bubble rechtsonder – opent Gemini direct */}
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
        <span className="hidden sm:inline text-xs font-medium">Chat met Bot Zuid</span>
      </button>
    </div>
  );
}

// Klein icoon voor boekje (om BookOpen niet opnieuw te importeren als je dat niet hebt)
function BookOpenIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 7H20" />
      <path d="M6.5 7A2.5 2.5 0 0 0 4 9.5v10" />
      <path d="M6.5 17A2.5 2.5 0 0 0 4 19.5" />
      <path d="M20 4v13" />
    </svg>
  );
}
