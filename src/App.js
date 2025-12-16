// src/App.js
import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  Lightbulb,
  Sparkles,
  BookOpen,
  Calendar,
  MapPin,
  Clock,
  Link as LinkIcon,
  X,
  MessageCircle,
  Wrench,
} from "lucide-react";
import Linkify from "linkify-react";

/* ------------ Constantes ------------ */

const GEMINI_URL =
  "https://gemini.google.com/gem/1eAez_W8DALYxBVNPQTzmg2CVx4XDn6w7?usp=sharing";

const DRIVE_EXAMPLES_URL =
  "https://drive.google.com/drive/folders/12hkdkdgrNgK8W3b5qXjJvcPaKsinLEuj?usp=sharing";

const TEAMS_CHAT_URL =
  "https://teams.microsoft.com/l/chat/0/0?users=arne.breemeersch@sint-rembert.be";

const BOT_ZUID_AVATAR = "/media/bot-zuid.png";

const OUTLOOK_MEETING_URL =
  "https://outlook.office.com/calendar/0/deeplink/compose?to=arne.breemeersch@sint-rembert.be&subject=Afspraak%20ICT%20%2F%20AI&body=Beschrijf%20kort%20je%20vraag%20over%20ICT%20of%20AI.";

const LEREN_PROMPTEN_URL =
  "https://chatgpt.com/g/g-6773b281c35c8191a20e8182134d34ca-leren-prompten-aivoorstudenten";

const BEST_PRACTICE_KEY = "sr-best-practices-likes";

const TRAINING_TARGET_ISO = "2026-01-13T16:00:00"; // Bijscholing Lovable

const isBotEmbed =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("embed") === "bot";

/* ------------ Intro video overlay ------------ */

function IntroVideoOverlay() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="relative max-w-3xl w-full">
        <video
          src="/media/promo1.mp4"
          autoPlay
          controls
          className="w-full rounded-xl shadow-2xl border border-white/20"
        />
        <button
          onClick={() => setVisible(false)}
          className="absolute -top-3 -right-3 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center font-bold shadow-lg hover:bg-slate-200"
          aria-label="Sluit video"
        >
          ×
        </button>
      </div>
    </div>
  );
}

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
  <div
    className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
  >
    {children}
  </div>
);

/* ------------ PromptBlock met copy-knop ------------ */

const PromptBlock = ({ label, text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Kon niet kopiëren", e);
    }
  };

  return (
    <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800">
      <div className="flex items-center justify-between gap-2 mb-2">
        {label && (
          <p className="font-semibold text-slate-900 text-[11px] sm:text-xs">
            {label}
          </p>
        )}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-700 hover:bg-slate-100"
        >
          {copied ? "Gekopieerd!" : "Kopieer prompt"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-[11px] leading-relaxed font-mono">
        {text}
      </pre>
    </div>
  );
};

/* ------------ Best practices van collega's ------------ */

function BestPractices() {
  const [likes, setLikes] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const stored = localStorage.getItem(BEST_PRACTICE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const items = [
    {
      id: "engels-chatbot",
      title: "Engelse chatbot voor vrije spreekvaardigheid",
      teacher: "3e graad TSO · Engels",
      description:
        "Leerlingen kiezen een thema en voeren een gestructureerd gesprek met een AI-chatbot. Nadien reflecteren ze op fouten en nieuwe woorden.",
      tools: "Google AI Studio",
    },
    {
      id: "lovable-portfolio",
      title: "Lovable-portfolio voor praktijkprojecten",
      teacher: "2e graad BSO · Praktijkvakken",
      description:
        "Elke leerling krijgt een eigen site als digitaal portfolio. Ze uploaden foto's, korte verslagen en AI-reflectievragen.",
      tools: "Lovable + foto's / documenten",
    },
    {
      id: "notebooklm-samenvattingen",
      title: "NotebookLM als samenvattingscoach",
      teacher: "3e graad ASO · Economie",
      description:
        "Hoofdstukken in NotebookLM. Leerlingen vergelijken hun samenvatting met de AI-samenvatting en verbeteren stap voor stap.",
      tools: "NotebookLM",
    },
  ];

  const toggleLike = (id) => {
    setLikes((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      if (typeof window !== "undefined") {
        localStorage.setItem(BEST_PRACTICE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <section className="mt-6">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-blue-500">
              Best practices van collega&apos;s
            </p>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">
              Voorbeelden die al in onze scholengroep gebruikt worden
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Gebruik de ⭐ om aan te duiden wat jou inspireert.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">{item.teacher}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleLike(item.id)}
                  className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-slate-200 bg-white hover:bg-amber-50"
                  aria-label="Like"
                >
                  <span
                    className={
                      likes[item.id]
                        ? "text-amber-500 text-sm"
                        : "text-slate-400 text-sm"
                    }
                  >
                    ★
                  </span>
                </button>
              </div>
              <p className="text-[11px] text-slate-700 mb-2 flex-1">
                {item.description}
              </p>
              <p className="text-[10px] text-slate-500">
                <span className="font-semibold">Tools:</span> {item.tools}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

/* ------------ Tijdslijn / laatste nieuws ------------ */

const NEWS_ITEMS = [
  {
    id: 1,
    date: "jan 2025",
    title: "Floris flowbot live (testfase)",
    description:
      "Floris flowbot helpt je bij vragen over projectie, Kurzweil, Classroom.cloud, lesfiches en meer.",
    tag: "ICT-ondersteuning",
  },
  {
    id: 2,
    date: "dec 2025",
    title: "Examens 1e trimester",
    description: "Infobundel. Klik hier om te downloaden.",
    tag: "Examens",
    fileUrl: "/Infobundel.pdf",
    fileLabel: "📄 Download de Proefwerken Gids (PDF)",
  },
  {
    id: 3,
    date: "dec 2025",
    title: "Proefwerken: Kurzweil & A-klas",
    description: "Problemen rond Kurzweil. Klik hier om het op te lossen.",
    tag: "Proefwerken",
  },
];

function NewsTimeline() {
  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-blue-500 font-semibold">
            Laatste nieuws
          </p>
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            Updates vanuit lokaal 209
          </h3>
        </div>
      </div>

      <div className="relative mt-4">
        <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-slate-200" />

        <div className="space-y-4">
          {NEWS_ITEMS.map((item) => (
            <div key={item.id} className="relative flex gap-3 pl-7 sm:pl-9">
              <div className="absolute left-1 sm:left-2 mt-1.5 h-3 w-3 rounded-full bg-blue-500 border-2 border-white shadow-sm" />

              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  {item.date}
                </p>
                <h4 className="text-sm font-semibold text-slate-900">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {item.description}
                </p>

                {item.fileUrl && (
                  <div className="mt-1">
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 underline"
                    >
                      <LinkIcon className="h-3 w-3" />
                      {item.fileLabel || "Download bijlage"}
                    </a>
                  </div>
                )}

                {item.tag && (
                  <span className="inline-flex mt-1 rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600">
                    {item.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-slate-400">
          Scroll verder voor oudere berichten.
        </p>
      </div>
    </Card>
  );
}

/* ------------ Chatcomponent (Bot Zuid) ------------ */

const linkifyOptions = {
  nl2br: true,
  attributes: { target: "_blank", rel: "noopener noreferrer" },
  className: "chat-link",
};

function SupportChat() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "INTRO_MESSAGE" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input.trim() };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const slimMessages = newMessages.slice(-6);

    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: slimMessages }),
      });

      const data = await res.json();
      const reply =
        data?.reply ||
        "Er ging iets mis bij het ophalen van een antwoord. Probeer het later nog eens. 🙈";

      setMessages([...newMessages, { role: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          role: "bot",
          text:
            "Er ging iets mis bij de verbinding met de server. Controleer je internetverbinding of probeer later opnieuw. 🖥️⚠️",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 p-3 flex flex-col max-h-[70vh]">
      <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1 text-xs sm:text-sm">
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          const isIntroBotMessage = !isUser && i === 0;

          return (
            <div
              key={i}
              className={`flex items-end gap-2 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser && (
                <img
                  src={BOT_ZUID_AVATAR}
                  alt="Floris flowbot"
                  className="h-7 w-7 rounded-full bg-slate-200 object-cover flex-shrink-0"
                />
              )}

              <div
                className={`max-w-[75%] px-2.5 py-1.5 rounded-lg whitespace-pre-wrap ${
                  isUser
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-white text-slate-800 border border-slate-200 mr-auto"
                }`}
              >
                {isIntroBotMessage ? (
                  <div className="space-y-1 text-[11px] leading-relaxed">
                    <p className="font-semibold text-slate-900">
                      Hallo! Ik ben Floris flowbot 👋
                    </p>
                    <p>Ik help je met praktische ICT-vragen zoals:</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>📺 Projectie / beamers</li>
                      <li>🧑‍💻 Kurzweil / Alinea</li>
                      <li>📲 Smartschool</li>
                      <li>💻 Laptopproblemen</li>
                    </ul>
                  </div>
                ) : (
                  <Linkify options={linkifyOptions}>{m.text}</Linkify>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-end gap-2 justify-start">
            <img
              src={BOT_ZUID_AVATAR}
              alt="Floris flowbot"
              className="h-7 w-7 rounded-full bg-slate-200 object-cover flex-shrink-0"
            />
            <div className="bg-white text-slate-500 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200">
              Ik ben even aan het nadenken… Dit kan enkele seconden duren 🤖💭
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row items-stretch gap-2">
          <input
            type="text"
            className="flex-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs sm:text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Beschrijf kort je technisch probleem…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full sm:w-auto px-3 py-1.5 text-xs"
          >
            Verstuur
          </Button>
        </div>

        <p className="text-[10px] text-slate-400">
          Deel geen gevoelige leerling- of personeelsgegevens. Als het niet lukt,
          maak een ticket aan in Topdesk. ✅
        </p>
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

/* ------------ AI-tools ------------ */

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
            Overzicht van handige AI-tools.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
        <Button as="a" href="https://chatgpt.com/" variant="secondary">
          ChatGPT
        </Button>
        <Button as="a" href="https://gemini.google.com/" variant="secondary">
          Google Gemini
        </Button>
        <Button as="a" href="https://www.genial.ly/" variant="secondary">
          Genially
        </Button>
        <Button as="a" href="https://notebooklm.google.com/" variant="secondary">
          NotebookLM
        </Button>
        <Button as="a" href="https://gamma.app/" variant="secondary">
          Gamma
        </Button>
        <Button as="a" href="https://lovable.dev/" variant="secondary">
          Lovable
        </Button>
        <Button
          as="a"
          href="https://aistudio.google.com/"
          variant="secondary"
          className="sm:col-span-2"
        >
          Google AI Studio
        </Button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600">
        Tip: kies één tool en test die in een kleine opdracht.
      </p>
    </Card>
  );
}

/* ------------ Voorbeelden-overzicht ------------ */

function ExamplesOverview() {
  return (
    <div className="space-y-6">
      {/* NotebookLM */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Voorbeeld – NotebookLM
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              AI-samenvattingen en uitleg op basis van je eigen bronnen.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <span className="font-semibold">Wat is NotebookLM?</span> Upload je
              documenten en laat samenvattingen, vragen en uitleg genereren.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Laat leerlingen vragen stellen over een hoofdstuk.</li>
              <li>Genereer voorbeeldvragen en begripsvragen.</li>
              <li>Gebruik audio-studio als “podcast” over de leerstof.</li>
            </ul>

            <Button
              as="a"
              href="https://notebooklm.google.com/notebook/5e8fec43-9ffc-4e71-b5a5-7705d2de9043"
              variant="primary"
              className="justify-center w-full sm:w-auto"
            >
              <LinkIcon className="h-4 w-4" />
              Open NotebookLM-voorbeeld
            </Button>
          </div>

          <div className="relative rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden">
            <img
              src="/media/resultatenNotebooklm.png"
              alt="NotebookLM-voorbeeld"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Card>

      {/* Lovable */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center text-white">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Voorbeeld – Lovable (AI-website)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              AI-gestuurde webapp om snel les- of projectsites te bouwen.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <span className="font-semibold">Wat is Lovable?</span> Op basis van
              tekst (prompts) genereert Lovable een volledige webapp.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Laat AI een eerste versie van je site maken.</li>
              <li>Pas teksten en oefeningen achteraf aan.</li>
              <li>Publiceer met één klik en deel de link.</li>
            </ul>

            <Button
              as="a"
              href="https://rekenenindelogistiek.lovable.app/"
              variant="primary"
              className="justify-center w-full sm:w-auto"
            >
              <LinkIcon className="h-4 w-4" />
              Open Lovable-voorbeeld
            </Button>
          </div>

          <div className="relative rounded-2xl border border-slate-200 bg-slate-950/90 overflow-hidden">
            <iframe
              title="Lovable voorbeeld"
              src="https://rekenenindelogistiek.lovable.app/"
              className="w-full h-72 sm:h-80 md:h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </Card>

      {/* AI Studio */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Voorbeeld – Google AI Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Prompts ontwerpen, testen en verfijnen met Gemini.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <span className="font-semibold">Wat is AI Studio?</span> Ontwerp eigen
              AI-bots en oefenchats. Maak bots per taak.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Oefenchats per vak of vaardigheid.</li>
              <li>Bouw een chatbot in een andere taal.</li>
              <li>Publiceer en deel met leerlingen.</li>
            </ul>

            <Button
              as="a"
              href="https://ai.studio/apps/drive/1SMyT079OFgchM9EoBf1Guv2J39XkADu4?fullscreenApplet=true"
              variant="primary"
              className="justify-center w-full sm:w-auto"
            >
              <LinkIcon className="h-4 w-4" />
              Open AI Studio-voorbeeld
            </Button>
          </div>

          <div className="relative rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden">
            <img
              src="/media/pizzabestellen.png"
              alt="Voorbeeld prompt in Google AI Studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Card>

      {/* Meer voorbeelden in Drive */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
          <div>
            <p className="font-semibold text-slate-900">
              Meer voorbeelden & eigen materiaal
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              In deze Drive-map vind je extra voorbeelden. Je mag ook zelf uploaden.
            </p>
          </div>
          <Button
            as="a"
            href={DRIVE_EXAMPLES_URL}
            variant="secondary"
            className="justify-center w-full sm:w-auto"
          >
            <LinkIcon className="h-4 w-4" />
            Open de Drive-map met voorbeelden
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ------------ Waarom AI? (met jouw afbeelding) ------------ */

function WaaromAISection() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
          <Lightbulb className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            Waarom AI?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Differentiatie, toegankelijkheid en meer diepgang.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 items-start">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Differentiatie:</span> oefeningen op maat
              en tempo.
            </li>
            <li>
              <span className="font-semibold">Toegankelijkheid:</span> uitleg wanneer
              nodig, in eenvoudiger taal.
            </li>
            <li>
              <span className="font-semibold">Diepgang:</span> minder routinewerk,
              meer focus op “waarom?” en kritisch denken.
            </li>
          </ul>

          <p className="text-xs text-slate-500">
            De essentie: AI vervangt de leerkracht niet — het versterkt leerkracht én leerling.
          </p>
        </div>

        <div className="relative rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden">
          <img
            src="/media/waaromAI.jpg"
            alt="Waarom AI infographic"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Card>
  );
}

/* ------------ Getting Started – Aan de slag (met 'hoe prompten' afbeelding) ------------ */

function GettingStartedSection() {
  const [unlocked, setUnlocked] = useState(false);

  const lovablePrompt = `Je bent een webdesigner voor een secundaire school.
Bouw een eenvoudige, overzichtelijke website voor mijn lessen [vak] aan leerlingen van [studierichting / graad].

De website moet minstens deze pagina's hebben:
- Startpagina met korte uitleg over het vak en een welkomstboodschap.
- Pagina "Lessen" met een overzicht van thema's of hoofdstukken.
- Pagina "Oefeningen" met ruimte voor opdrachten, oefeningen en online tools.
- Pagina "Praktische info" met afspraken, evaluatie en contact.

Gebruik een rustige, moderne lay-out.
Zorg dat ik teksten achteraf makkelijk kan aanpassen.
De taal is Nederlands en gericht op 14–18-jarigen.`;

  const aiStudioPrompt = `You are an English conversation tutor for secondary school students in Belgium (ages 14–18).
Your goal is to help students practise everyday English in a safe and motivating way.

Rules:
- Always answer in simple, clear English (level A2–B1).
- Ask short follow-up questions to keep the conversation going.
- Correct important grammar or vocabulary mistakes, but in a friendly way.
- Never give full translations unless the student explicitly asks.
- Encourage the student and keep the tone positive.

Start with:
"Hi! I am your English chatbot. Let's practise English together.
What would you like to talk about today? Hobbies, school, work, travel, or something else?"`;

  const notebookLmPrompts = `Voorbeelden van prompts in NotebookLM:

- Maak een beknopte samenvatting van dit hoofdstuk in maximum 200 woorden, in het Nederlands.
- Formuleer 5 meerkeuzevragen met telkens 4 opties over de kernbegrippen van dit hoofdstuk.
- Stel 5 open vragen die peilen naar inzicht (geen pure reproductie).
- Leg de belangrijkste begrippen eenvoudig uit zoals aan een leerling van 14 jaar.
- Maak een stappenplan dat de leerling kan volgen om dit hoofdstuk zelfstandig te studeren.`;

  const basicPrompt = `Je bent een didactische assistent voor leerkrachten secundair onderwijs.
Ik geef les in het vak [vak] aan leerlingen van [graad / richting].
Maak 3 ideeën voor een korte klasopdracht van max. 20 minuten.
Gebruik eenvoudige taal die past bij mijn leerlingen.`;

  return (
    <div className="space-y-4">
      {/* Jouw afbeelding "hoe prompten" bovenaan */}
      <div className="relative rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden">
        <img
          src="/media/hoe%20prompten.png"
          alt="Hoe prompten infographic"
          className="w-full h-full object-cover"
        />
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Stap 1 – Leren prompten
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Basisprincipes + een oefen-chat. Daarna kan je door naar Lovable, AI Studio of NotebookLM.
            </p>

            <div className="mt-3">
              <Button
                as="a"
                href={LEREN_PROMPTEN_URL}
                variant="secondary"
                className="text-xs"
              >
                Open oefen-chat “Leren prompten”
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-700">
          <div className="space-y-2">
            <p className="font-semibold text-slate-900">Basisprincipes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <span className="font-semibold">Geef context:</span> vak, klas, niveau.
              </li>
              <li>
                <span className="font-semibold">Zeg wat je wil:</span> oefening, uitleg, rubriek…
              </li>
              <li>
                <span className="font-semibold">Leg grenzen vast:</span> max woorden, taal, stijl.
              </li>
              <li>
                <span className="font-semibold">Vraag varianten:</span> “geef 3 opties”.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <PromptBlock
              label="Voorbeeldprompt voor leerkrachten (algemeen)"
              text={basicPrompt}
            />
            <p className="text-[11px] text-slate-500">
              Tip: verzamel sterke prompts in de Drive-map.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[11px] text-slate-500">
            Test dit even, klik daarna door naar de volgende stappen.
          </p>
          <Button
            type="button"
            variant="primary"
            onClick={() => setUnlocked(true)}
            className="self-start sm:self-auto text-xs"
          >
            Ik heb dit geprobeerd – toon de volgende stappen
          </Button>
        </div>
      </Card>

      {unlocked && (
        <>
          {/* Lovable */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                  Stap 2 – Lovable: eenvoudige leswebsite bouwen
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  In 30 minuten een eerste versie van een lessenwebsite.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-700">
              <div className="space-y-2">
                <p className="font-semibold">Stappenplan:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Ga naar lovable.dev en log in.</li>
                  <li>Klik op “Create new app”.</li>
                  <li>Plak de prompt in het tekstvak.</li>
                  <li>Laat genereren, pas aan, publiceer.</li>
                </ol>
              </div>

              <div className="space-y-3">
                <PromptBlock label="Prompt om te kopiëren in Lovable" text={lovablePrompt} />
              </div>
            </div>
          </Card>

          {/* AI Studio */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                  Stap 3 – Google AI Studio: chatbot Engels
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Maak een chatbot waarmee leerlingen Engels oefenen.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-700">
              <div className="space-y-2">
                <p className="font-semibold">Stappenplan:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Ga naar aistudio.google.com.</li>
                  <li>Klik “New chat” of “New prompt”.</li>
                  <li>Plak de prompt, test, deel.</li>
                </ol>
              </div>

              <div className="space-y-3">
                <PromptBlock label="Prompt voor een Engelse oefen-chatbot" text={aiStudioPrompt} />
              </div>
            </div>
          </Card>

          {/* NotebookLM */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                  Stap 4 – NotebookLM: werk met een echt hoofdstuk
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Upload een hoofdstuk en laat AI vragen & uitleg maken.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-700">
              <div className="space-y-2">
                <p className="font-semibold">Stappenplan:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Ga naar notebooklm.google.com.</li>
                  <li>New notebook → upload hoofdstuk.</li>
                  <li>Stel testvragen en laat leerlingen oefenen.</li>
                </ol>
              </div>

              <div className="space-y-3">
                <PromptBlock label="Voorbeelden van prompts in NotebookLM" text={notebookLmPrompts} />
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

/* ------------ Policy ------------ */

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
            Praktische samenvatting (volg steeds het officiële beleid).
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm mb-4">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="font-semibold text-emerald-800 mb-1">✅ Wel doen</p>
          <ul className="space-y-1 text-emerald-900">
            <li>• AI gebruiken voor inspiratie, herformulering en voorbeelden.</li>
            <li>• Lesmateriaal differentiëren en verbeteren.</li>
            <li>• Leerlingen leren kritisch kijken naar AI-output.</li>
            <li>• Geen echte namen of gevoelige gegevens invoeren.</li>
          </ul>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="font-semibold text-amber-900 mb-1">⚠️ Voorzichtig mee</p>
          <ul className="space-y-1 text-amber-900">
            <li>• Geen vertrouwelijke leerling- of personeelsgegevens invoeren.</li>
            <li>• AI-output nooit ongecheckt overnemen.</li>
            <li>• Geen accounts laten aanmaken zonder toestemming.</li>
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
      </div>
    </Card>
  );
}

/* ------------ Bijscholing / Training ------------ */

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
            In 1 uur leer je hoe je met <span className="font-semibold">Lovable</span>{" "}
            een eenvoudige AI-website maakt voor je les of project.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-700">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>
              <span className="font-semibold">Datum:</span> 13 januari 2026
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
          <p className="text-xs font-semibold text-slate-500 mb-1">Tijd tot start</p>
          <CountdownTimer targetDate={TRAINING_TARGET_ISO} />
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

/* ------------ Floating planner ------------ */

function FloatingPlanner() {
  const [open, setOpen] = useState(false);

  const statusLabel = "Meestal beschikbaar tijdens de lesuren";
  const statusState = "free";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 w-72 sm:w-80 rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 p-4 text-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-blue-500 font-semibold">
                Afspraak in Teams
              </p>
              <h3 className="text-sm font-semibold text-slate-900">
                Plan een moment met Glenn, Jasper of Arne
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Handig voor vragen over Pedagogische ICT &amp; AI of een korte 1-op-1.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-6 w-6 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200 text-xs"
              aria-label="Sluit"
            >
              ✕
            </button>
          </div>

          <div className="mb-3 space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px]">
              <span
                className={`h-2 w-2 rounded-full ${
                  statusState === "free" ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              <span className="font-semibold text-slate-700">
                {statusState === "free" ? "Beschikbaar" : "Waarschijnlijk bezet"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{statusLabel}</p>
          </div>

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
              <p>Voeg bij het plannen kort toe waarover je vraag gaat.</p>
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

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/40 px-3 py-2 text-xs sm:text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Plan een moment over digitale didactiek"
      >
        <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
          <span className="text-[13px] font-semibold">AB</span>
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="font-semibold">Pedagogische vragen?</span>
          <span className="text-[10px] text-blue-100">Teams / Outlook · klik om te plannen</span>
        </div>
      </button>
    </div>
  );
}

/* ------------ Overlays ------------ */

function AiOverlay({ onClose }) {
  const [tab, setTab] = useState("waarom");

  const tabs = useMemo(
    () => [
      { id: "waarom", label: "Waarom AI?" },
      { id: "voorbeelden", label: "Voorbeelden" },
      { id: "aandeslag", label: "Aan de slag" },
      { id: "inschrijven", label: "Inschrijven bijscholing" },
    ],
    []
  );

  return (
    <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-50 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 bg-white">
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-blue-500 font-semibold">
              AI in mijn les
            </p>
            <h2 className="text-sm sm:text-base font-semibold text-slate-900">
              Netjes geordend per thema
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200"
            aria-label="Sluit overlay"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-3 border-b border-slate-200 bg-white">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  tab === t.id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            Klik op een tab om sneller te navigeren.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-6">
          {tab === "waarom" && <WaaromAISection />}

          {tab === "voorbeelden" && (
            <>
              <ExamplesOverview />
              <BestPractices />
            </>
          )}

          {tab === "aandeslag" && (
            <>
              <GettingStartedSection />
              <AiToolsSection />
              <PolicySection />
            </>
          )}

          {tab === "inschrijven" && <TrainingSection />}
        </div>
      </div>
    </div>
  );
}

function BotOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-50 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 bg-white">
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-blue-500 font-semibold">
              Technische hulp
            </p>
            <h2 className="text-sm sm:text-base font-semibold text-slate-900">
              Floris flowbot & officiële helpkanalen
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200"
            aria-label="Sluit overlay"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          <Card className="p-4 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 text-white border-none">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full overflow-hidden bg-white/15 shadow-sm border border-white/40">
                  <img
                    src={BOT_ZUID_AVATAR}
                    alt="Floris flowbot"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide font-semibold text-blue-100">
                    Floris flowbot · technische ICT-vragen
                  </p>
                  <h3 className="text-sm sm:text-base font-semibold">
                    Floris flowbot – projectie, Kurzweil &amp; Smartschool
                  </h3>
                </div>
              </div>
              <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">
                Experimenteel
              </span>
            </div>
            <p className="text-xs sm:text-sm text-blue-50 leading-relaxed">
              Stel je vraag over projector, Kurzweil, Smartschool, printers, wifi en ander ICT-materiaal.
            </p>
          </Card>

          <Card className="p-4 bg-white">
            <p className="text-[11px] font-semibold text-slate-500 mb-1">
              Direct chatten met Floris flowbot
            </p>
            <SupportChat />
          </Card>

          <Card className="p-4 bg-white">
            <h4 className="text-sm font-semibold text-slate-900 mb-1">
              Problemen met ICT-materiaal?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mb-2">
              Gebruik het officiële ticketsysteem voor storingen, defecten en aanvragen.
            </p>
            <Button
              as="a"
              href="https://sint-rembert.topdesk.net/"
              variant="secondary"
            >
              Naar Topdesk
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Card>

          <Card className="p-4 bg-slate-50">
            <p className="text-[11px] text-slate-500 mb-1">
              Werkt dit venster niet goed?
            </p>
            <Button
              as="a"
              href={GEMINI_URL}
              variant="ghost"
              className="justify-start text-xs"
            >
              <MessageCircle className="h-4 w-4" />
              Open Floris flowbot in een nieuw tabblad
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ------------ Hoofdcomponent ------------ */

export default function App() {
  const [activeOverlay, setActiveOverlay] = useState(null);

  const now = new Date();
  const trainingDate = new Date(TRAINING_TARGET_ISO);
  const diffMs = trainingDate.getTime() - now.getTime();
  const daysLeft = diffMs > 0 ? Math.floor(diffMs / (1000 * 60 * 60 * 24)) : 0;

  // Speciale embed-modus enkel voor de bot (voor Smartschool / iframe)
  if (isBotEmbed) {
    return (
      <div className="w-full h-full min-h-screen bg-slate-100 p-2 overflow-auto">
        <Card className="w-full h-full p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <img
              src={BOT_ZUID_AVATAR}
              alt="Floris flowbot"
              className="h-8 w-8 rounded-full bg-slate-200 object-cover"
            />
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-blue-500 font-semibold">
                Floris flowbot
              </p>
              <h1 className="text-sm sm:text-base font-semibold text-slate-900">
                Technische hulp · Campus Zuid
              </h1>
            </div>
          </div>
          <SupportChat />
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-100 text-slate-900">
      <IntroVideoOverlay />

      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
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

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-xs text-slate-500">
              <span>Werkgroep</span>
              <span className="font-semibold text-slate-700">Digitale Didactiek</span>
            </div>

            <Button
              as="a"
              href="#"
              variant="secondary"
              className="flex items-center gap-2 px-3 py-1.5 text-[11px]"
            >
              <Sparkles className="h-3 w-3 text-blue-500" />
              <span className="font-semibold text-slate-800">Bijscholing Lovable</span>
              <span className="text-[10px] text-slate-500">
                {daysLeft > 0
                  ? `over ${daysLeft} dag${daysLeft === 1 ? "" : "en"}`
                  : "vandaag / afgelopen"}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
          {/* Hero */}
          <section className="mt-6 mb-6 snap-start">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-slate-900 shadow-xl">
              <div className="relative h-[75vh] sm:h-[80vh] md:h-[80vh]">
                <img
                  src="/media/01037808-bc10-468e-a00f-af57eea24fce.jpeg"
                  alt="Team samenwerking en enthousiasme"
                  className="w-full h-full object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/10" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-end pb-10 sm:pb-12 md:pb-16">
                  <div className="w-full px-6 sm:px-8 md:px-10">
                    <div className="max-w-2xl space-y-4 md:space-y-5 bg-slate-900/60 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-4 sm:py-5 border border-slate-700/60">
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

                      <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                          Alles rond ICT &amp; AI
                          <span className="block text-sm sm:text-base md:text-lg text-slate-200 font-normal mt-1.5">
                            Eén startpunt voor tools, voorbeelden, bijscholing en ondersteuning.
                          </span>
                        </h2>
                      </div>

                      <p className="text-[11px] sm:text-xs text-slate-200">
                        We helpen je met: AI in je les, technische ICT-vragen en vorming.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-[10px] text-slate-200">
                  <div className="inline-flex flex-col items-center gap-1">
                    <span>Scroll om te starten</span>
                    <span className="animate-bounce text-lg">↓</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tegels */}
          <section className="mb-8 snap-start">
            <div className="grid gap-4 md:grid-cols-2 items-stretch">
              <Card className="p-5 flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-blue-500 font-semibold">
                      AI in mijn les
                    </p>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                      Waarom AI? · Voorbeelden · Aan de slag · Bijscholing
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-3">
                  Alles rond AI netjes geordend in tabs (sneller vinden, minder scrollen).
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Voor leerkrachten die iets willen uitproberen.</span>
                  <Button
                    type="button"
                    variant="primary"
                    className="text-xs px-3 py-1.5"
                    onClick={() => setActiveOverlay("ai")}
                  >
                    Open AI in mijn les
                  </Button>
                </div>
              </Card>

              <Card className="p-5 flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-slate-700 font-semibold">
                      Technische hulp
                    </p>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                      Floris flowbot & ICT-ondersteuning
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-3">
                  Vragen over projector, Kurzweil, Smartschool, printers of wifi?
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Voor technische vragen of storingen.</span>
                  <Button
                    type="button"
                    variant="secondary"
                    className="text-xs px-3 py-1.5"
                    onClick={() => setActiveOverlay("bot")}
                  >
                    Open technische hulp
                  </Button>
                </div>
              </Card>
            </div>
          </section>

          {/* Tijdslijn */}
          <section className="mb-8 snap-start">
            <NewsTimeline />
          </section>

          <footer className="mt-6 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2">
              <p className="text-[11px] text-slate-500">
                © {new Date().getFullYear()} Scholengroep Sint-Rembert · Werkgroep Digitale Didactiek
              </p>
            </div>
          </footer>
        </div>
      </main>

      <FloatingPlanner />

      {activeOverlay === "ai" && <AiOverlay onClose={() => setActiveOverlay(null)} />}
      {activeOverlay === "bot" && <BotOverlay onClose={() => setActiveOverlay(null)} />}
    </div>
  );
}
