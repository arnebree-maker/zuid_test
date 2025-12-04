// src/App.js
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
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

const TEAMS_CHAT_URL =
  "https://teams.microsoft.com/l/chat/0/0?users=arne.breemeersch@sint-rembert.be";

const BOT_ZUID_AVATAR = "/media/bot-zuid.png";

const OUTLOOK_MEETING_URL =
  "https://outlook.office.com/calendar/0/deeplink/compose?to=arne.breemeersch@sint-rembert.be&subject=Afspraak%20ICT%20%2F%20AI&body=Beschrijf%20kort%20je%20vraag%20over%20ICT%20of%20AI.";

const LEREN_PROMPTEN_URL =
  "https://chatgpt.com/g/g-6773b281c35c8191a20e8182134d34ca-leren-prompten-aivoorstudenten";

const BEST_PRACTICE_KEY = "sr-best-practices-likes";

/* ------------ Data buiten componenten houden ------------ */

// Best practices items
const BEST_PRACTICE_ITEMS = [
  {
    id: "engels-chatbot",
    title: "Engelse chatbot voor vrije spreekvaardigheid",
    teacher: "3e graad TSO · Engels",
    description:
      "Leerlingen kiezen een thema (hobby's, reizen, werk) en voeren een gestructureerd gesprek met een AI-chatbot. Nadien maken ze een korte reflectie op hun fouten en nieuwe woorden.",
    tools: "Google AI Studio",
  },
  {
    id: "lovable-portfolio",
    title: "Lovable-portfolio voor praktijkprojecten",
    teacher: "2e graad BSO · Praktijkvakken",
    description:
      "Elke leerling krijgt een eigen Lovable-site als digitaal portfolio. Ze uploaden foto's, korte verslagen en AI-gegenereerde reflectievragen.",
    tools: "Lovable + foto's / documenten",
  },
  {
    id: "notebooklm-samenvattingen",
    title: "NotebookLM als samenvattingscoach",
    teacher: "3e graad ASO · Economie",
    description:
      "Hoofdstukken uit de cursus worden in NotebookLM gezet. Leerlingen vergelijken hun eigen samenvatting met de AI-samenvatting en verbeteren die stap voor stap.",
    tools: "NotebookLM",
  },
];

// Prompts voor Aan de slag
const BASIC_PROMPT = `Je bent een didactische assistent voor leerkrachten secundair onderwijs.
Ik geef les in het vak [vak] aan leerlingen van [graad / richting].
Maak 3 ideeën voor een korte klasopdracht van max. 20 minuten.
Gebruik eenvoudige taal die past bij mijn leerlingen.`;

const LOVABLE_PROMPT = `Je bent een webdesigner voor een secundaire school.
Bouw een eenvoudige, overzichtelijke website voor mijn lessen [vak] aan leerlingen van [studierichting / graad].

De website moet minstens deze pagina's hebben:
- Startpagina met korte uitleg over het vak en een welkomstboodschap.
- Pagina "Lessen" met een overzicht van thema's of hoofdstukken.
- Pagina "Oefeningen" met ruimte voor opdrachten, oefeningen en online tools.
- Pagina "Praktische info" met afspraken, evaluatie en contact.

Gebruik een rustige, moderne lay-out.
Zorg dat ik teksten achteraf makkelijk kan aanpassen.
De taal is Nederlands en gericht op 14–18-jarigen.`;

const AI_STUDIO_PROMPT = `You are an English conversation tutor for secondary school students in Belgium (ages 14–18).
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

const NOTEBOOKLM_PROMPTS = `Voorbeelden van prompts in NotebookLM:

- Maak een beknopte samenvatting van dit hoofdstuk in maximum 200 woorden, in het Nederlands.
- Formuleer 5 meerkeuzevragen met telkens 4 opties over de kernbegrippen van dit hoofdstuk.
- Stel 5 open vragen die peilen naar inzicht (geen pure reproductie).
- Leg de belangrijkste begrippen eenvoudig uit zoals aan een leerling van 14 jaar.
- Maak een stappenplan dat de leerling kan volgen om dit hoofdstuk zelfstandig te studeren.`;

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

/* ------------ Intro video overlay ------------ */

function IntroVideoOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="relative max-w-3xl w-full">
        <video
          src="/media/promo.mp4"
          autoPlay
          controls
          className="w-full rounded-xl shadow-2xl border border-white/20"
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center font-bold shadow-lg hover:bg-slate-200"
        >
          ×
        </button>
      </div>
    </div>
  );
}

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
              Gebruik de ⭐ om aan te duiden wat jou inspireert. Later kan dit een echte
              verzameling worden van gedeelde lesideeën.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          {BEST_PRACTICE_ITEMS.map((item) => (
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

/* ------------ Chatcomponent (Bot Zuid – technisch) ------------ */

function SupportChat() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hallo! Ik ben Bot Zuid. Stel hier je vraag over projectie, Kurzweil, Smartschool, printers of ander ICT-materiaal.",
    },
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
        {messages.map((m, i) => {
          const isUser = m.role === "user";
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
                  alt="Bot Zuid"
                  className="h-7 w-7 rounded-full bg-slate-200 object-cover flex-shrink-0"
                />
              )}
              <div
                className={`max-w-[75%] px-2.5 py-1.5 rounded-lg ${
                  isUser
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-white text-slate-800 border border-slate-200 mr-auto"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex items-end gap-2 justify-start">
            <img
              src={BOT_ZUID_AVATAR}
              alt="Bot Zuid"
              className="h-7 w-7 rounded-full bg-slate-200 object-cover flex-shrink-0"
            />
            <div className="bg-white text-slate-500 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200">
              Bot Zuid is aan het nadenken… Dit kan enkele seconden duren.
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 rounded-md border border-slate-200 px-2 py-1.5 text-xs sm:text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Beschrijf kort je technisch probleem…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            className="px-3 py-1.5 text-xs"
          >
            Verstuur
          </Button>
        </div>

        <p className="text-[10px] text-slate-400">
          Deel geen gevoelige leerling- of personeelsgegevens. Als het niet lukt, maak
          een ticket aan in Topdesk.
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
      <p className="font-mono text-sm font-semibold text-slate-800">
        {timeLeft}
      </p>
      <p className="text-[11px] text-slate-500">
        Beperkt aantal plaatsen – schrijf tijdig in.
      </p>
    </div>
  );
}

/* ------------ AI-tools (extra onderdeel) ------------ */

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
        <Button
          as="a"
          href="https://chatgpt.com/"
          variant="secondary"
          className="justify-center"
        >
          ChatGPT
        </Button>
        <Button
          as="a"
          href="https://gemini.google.com/"
          variant="secondary"
          className="justify-center"
        >
          Google Gemini
        </Button>
        <Button
          as="a"
          href="https://www.genial.ly/"
          variant="secondary"
          className="justify-center"
        >
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
        <Button
          as="a"
          href="https://gamma.app/"
          variant="secondary"
          className="justify-center"
        >
          Gamma
        </Button>
        <Button
          as="a"
          href="https://lovable.dev/"
          variant="secondary"
          className="justify-center"
        >
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
        Tip: kies één tool en test die in een kleine opdracht. Laat leerlingen meedenken
        over wat werkt en wat niet.
      </p>
    </Card>
  );
}

/* ------------ Voorbeelden-overzicht ------------ */

function ExamplesOverview() {
  return (
    <>
      {/* Lovable */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center text-white">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Voorbeeld 1 – Lovable (AI-website)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              AI-gestuurde webapp om snel les- of projectsites te bouwen.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <span className="font-semibold">Wat is Lovable?</span> Lovable is een tool
              die op basis van tekst (prompts) een volledige webapplicatie maakt. Ideaal
              om snel een interactieve leersite of een tool voor leerlingen te bouwen.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Laat AI een eerste versie van je site genereren.</li>
              <li>Pas teksten, oefeningen en stijl achteraf aan.</li>
              <li>Publiceer met één klik en deel de link met leerlingen.</li>
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

      {/* AI Studio – met screenshot */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Voorbeeld 2 – Google AI Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Prompts ontwerpen, testen en verfijnen met Gemini-modellen.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <span className="font-semibold">Wat is AI Studio?</span> In Google AI
              Studio kan je prompts bouwen en uitproberen met verschillende
              Gemini-modellen. Vanuit daar kan je ze kopiëren naar Classroom-materiaal,
              scripts of eigen tools.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Test veilig prompts voor toetsen en oefeningen.</li>
              <li>Bewaar “goede” prompts als templates voor collega&apos;s.</li>
              <li>Bekijk meteen verschillende varianten van een antwoord.</li>
            </ul>

            <Button
              as="a"
              href="https://aistudio.google.com/apps/drive/17F82NQrZhAf6lxeTwzl2GwvayVbGK-hD?fullscreenApplet=true&showPreview=true&showAssistant=true"
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
              alt="Voorbeeld prompt in Google AI Studio - pizzabestelling"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Card>

      {/* NotebookLM – screenshot */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Voorbeeld 3 – NotebookLM
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              AI-samenvattingen, uitleg en audio-studio op basis van je eigen bronnen.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <span className="font-semibold">Wat is NotebookLM?</span> NotebookLM laat je
              eigen documenten uploaden (PDF, Google Docs, websites…) en maakt daar
              samenvattingen, leervragen en audio-uitleg van.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Laat leerlingen vragen stellen over een hoofdstuk.</li>
              <li>Genereer voorbeeldvragen en begripsvragen.</li>
              <li>Gebruik de audio-studio als “podcast” over de leerstof.</li>
            </ul>

            <Button
              as="a"
              href="https://notebooklm.google.com/notebook/a316cc47-7fd7-46aa-aa65-cca2a9d7a8a7?artifactId=3be602e1-0406-418c-899f-e54dad77c9e6"
              variant="primary"
              className="justify-center w-full sm:w-auto"
            >
              <LinkIcon className="h-4 w-4" />
              Open NotebookLM-voorbeeld
            </Button>
          </div>

          <div className="relative rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden">
            <img
              src="/media/notebooklm.png"
              alt="NotebookLM-voorbeeld"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Card>

      {/* Extra: meer voorbeelden in Drive */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
          <div>
            <p className="font-semibold text-slate-900">
              Meer voorbeelden & eigen materiaal
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              In deze Drive-map vind je nog extra voorbeelden van collega&apos;s. Je mag
              hier ook zelf je eigen AI-lessen of projecten uploaden.
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

      <BestPractices />
    </>
  );
}

/* ------------ Aan de slag – leren prompten + stappen ------------ */

function GettingStartedSection() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="space-y-4">
      {/* Stap 1 – Leren prompten */}
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
              In 10 minuten leer je hoe je duidelijke vragen kan stellen aan AI. Daarna
              kan je kiezen tussen een website, een chatbot of NotebookLM.
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
                <span className="font-semibold">Geef context:</span> voor welk vak,
                welke klas, welk niveau?
              </li>
              <li>
                <span className="font-semibold">Zeg wat je wil:</span> samenvatting,
                oefening, uitleg, rubriek…
              </li>
              <li>
                <span className="font-semibold">Leg beperkingen vast:</span> max.
                aantal woorden, taal, stijl.
              </li>
              <li>
                <span className="font-semibold">Vraag om controle:</span> “toon eerst
                een voorstel”, “stel 3 varianten voor”.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <PromptBlock
              label="Voorbeeldprompt voor leerkrachten (algemeen)"
              text={BASIC_PROMPT}
            />
            <p className="text-[11px] text-slate-500">
              Tip: laat collega&apos;s hun beste prompts delen in de Drive-map en bouw
              zo een gezamenlijke prompt-bibliotheek.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[11px] text-slate-500">
            Lees deze basis even door, test het in een AI-tool en klik daarna verder.
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

      {/* Alleen tonen als stap 1 "ontgrendeld" is */}
      {unlocked && (
        <>
          {/* Stap 2 – Lovable */}
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
                  In 30 minuten een eerste versie van een lessenwebsite voor je klas.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-700">
              <div className="space-y-2">
                <p className="font-semibold">Stappenplan:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    Ga naar{" "}
                    <a
                      href="https://lovable.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      lovable.dev
                    </a>{" "}
                    en log in (Google / Microsoft).
                  </li>
                  <li>
                    Klik op <span className="font-semibold">“Create new app”</span>.
                  </li>
                  <li>Plak de prompt hiernaast in het tekstvak.</li>
                  <li>Laat Lovable een eerste versie genereren en bekijk het resultaat.</li>
                  <li>
                    Pas teksten, kleuren en titels aan zodat het echt bij jouw vak past.
                  </li>
                  <li>Publiceer en kopieer de link voor je leerlingen.</li>
                </ol>
              </div>

              <div className="space-y-3">
                <PromptBlock
                  label="Prompt om te kopiëren in Lovable"
                  text={LOVABLE_PROMPT}
                />
                <p className="text-[11px] text-slate-500">
                  Laat deelnemers tijdens de sessie hun vak invullen en de site
                  personaliseren.
                </p>
              </div>
            </div>
          </Card>

          {/* Stap 3 – AI Studio */}
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
                  Maak een chatbot waarmee leerlingen Engels kunnen oefenen.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-700">
              <div className="space-y-2">
                <p className="font-semibold">Stappenplan:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    Ga naar{" "}
                    <a
                      href="https://aistudio.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      aistudio.google.com
                    </a>
                    .
                  </li>
                  <li>
                    Klik op <span className="font-semibold">“New chat”</span> of “New
                    prompt” (afhankelijk van de interface).
                  </li>
                  <li>
                    Kies een Gemini-model dat geschikt is voor onderwijs (bv. 1.5 Flash /
                    Pro).
                  </li>
                  <li>Plak de prompt hiernaast in het instructieveld.</li>
                  <li>
                    Test zelf enkele voorbeeldvragen (bv. “Start a dialogue about
                    hobbies”).
                  </li>
                  <li>
                    Laat leerlingen in duo&apos;s chatten en geef hen voorbeeldopdrachten.
                  </li>
                </ol>
              </div>

              <div className="space-y-3">
                <PromptBlock
                  label="Prompt voor een Engelse oefen-chatbot"
                  text={AI_STUDIO_PROMPT}
                />
                <p className="text-[11px] text-slate-500">
                  Pas het niveau (A2/B1/B2) aan in de prompt, afhankelijk van je klas.
                </p>
              </div>
            </div>
          </Card>

          {/* Stap 4 – NotebookLM */}
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
                  Upload een hoofdstuk uit een cursus en laat AI er vragen & uitleg bij
                  maken.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-700">
              <div className="space-y-2">
                <p className="font-semibold">Stappenplan:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    Ga naar{" "}
                    <a
                      href="https://notebooklm.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      notebooklm.google.com
                    </a>
                    .
                  </li>
                  <li>
                    Klik op <span className="font-semibold">“New notebook”</span>.
                  </li>
                  <li>Upload één hoofdstuk (PDF of Google Doc) van een cursus.</li>
                  <li>Wacht tot NotebookLM het document heeft verwerkt.</li>
                  <li>
                    Stel enkele testvragen zoals “Maak 5 meerkeuzevragen over paragraaf
                    2”.
                  </li>
                  <li>
                    Laat leerlingen bijvoorbeeld zelf examenvragen formuleren met
                    NotebookLM.
                  </li>
                </ol>
              </div>

              <div className="space-y-3">
                <PromptBlock
                  label="Voorbeelden van prompts in NotebookLM"
                  text={NOTEBOOKLM_PROMPTS}
                />
                <p className="text-[11px] text-slate-500">
                  Toon ook eens hoe de audio-studio werkt en laat NotebookLM een korte
                  “podcast” maken van het hoofdstuk.
                </p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

/* ------------ Bijscholing / Policy (extra onderdelen) ------------ */

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
          <p className="text-xs font-semibold text-slate-500 mb-1">Tijd tot start</p>
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

  const statusLabel = "Meestal beschikbaar tijdens de lesuren";
  const statusState = "free"; // "free" of "busy"

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
              <p>
                Voeg bij het plannen in je uitnodiging kort toe waarover je vraag
                gaat.
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
          <span className="text-[10px] text-blue-100">
            Teams / Outlook · klik om te plannen
          </span>
        </div>
      </button>
    </div>
  );
}

/* ------------ Sectie-config (belangrijke vs extra onderdelen) ------------ */

const SECTIONS = {
  "aan-de-slag": {
    label: "Aan de slag",
    description: "Leren prompten + stappen voor website, chatbot en NotebookLM.",
    Icon: Sparkles,
    component: GettingStartedSection,
    primary: true,
  },
  voorbeelden: {
    label: "Voorbeelden",
    description: "Concrete voorbeelden (Lovable, AI Studio, NotebookLM) met preview.",
    Icon: BookOpen,
    component: ExamplesOverview,
    primary: true,
  },
  "ai-tools": {
    label: "AI-tools",
    description: "Overzicht van tools zoals ChatGPT, Gemini, NotebookLM, Genially…",
    Icon: Lightbulb,
    component: AiToolsSection,
    primary: false,
  },
  bijscholing: {
    label: "Bijscholing",
    description: "Info over Lovable-sessies en toekomstige AI-/ICT-vormingen.",
    Icon: Sparkles,
    component: TrainingSection,
    primary: false,
  },
  "ai-beleid": {
    label: "AI-richtlijnen",
    description: "Wat mag wel/niet met AI + links naar achtergrondinfo.",
    Icon: Lightbulb,
    component: PolicySection,
    primary: false,
  },
};

/* ------------ Navigatie in de donkere kaart links ------------ */

function SectionNav({ activePage, setActivePage }) {
  const primarySections = Object.entries(SECTIONS).filter(
    ([, cfg]) => cfg.primary
  );
  const extraSections = Object.entries(SECTIONS).filter(
    ([, cfg]) => !cfg.primary
  );
  const [showExtra, setShowExtra] = useState(false);

  return (
    <div className="flex flex-col gap-3 text-sm">
      {/* Belangrijkste secties */}
      <div className="flex flex-col gap-2">
        {primarySections.map(([key, cfg]) => {
          const isActive = activePage === key;
          const Icon = cfg.Icon;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActivePage(key)}
              className={`group rounded-lg border px-3 py-2.5 text-left transition-all ${
                isActive
                  ? "border-blue-300 bg-white text-slate-900 shadow-md scale-[1.02]"
                  : "border-white/20 bg-white/5 hover:border-blue-300 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`font-semibold text-xs ${
                    isActive ? "text-slate-900" : "text-white"
                  }`}
                >
                  {cfg.label}
                </span>
                <Icon
                  className={`h-4 w-4 ${
                    isActive
                      ? "text-blue-600"
                      : "text-blue-200 group-hover:text-blue-300"
                  }`}
                />
              </div>
              <p
                className={`text-[11px] ${
                  isActive ? "text-slate-600" : "text-slate-200"
                }`}
              >
                {cfg.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Extra onderdelen onder een inklapbaar blokje */}
      {extraSections.length > 0 && (
        <div className="pt-2 border-t border-white/15">
          <button
            type="button"
            onClick={() => setShowExtra((v) => !v)}
            className="text-[11px] text-blue-100 underline underline-offset-2"
          >
            {showExtra
              ? "Verberg extra onderdelen"
              : "Toon extra onderdelen (AI-tools, bijscholing, richtlijnen)"}
          </button>

          {showExtra && (
            <div className="mt-2 flex flex-col gap-2">
              {extraSections.map(([key, cfg]) => {
                const isActive = activePage === key;
                const Icon = cfg.Icon;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivePage(key)}
                    className={`group rounded-lg border px-3 py-2 text-left text-[11px] transition-all ${
                      isActive
                        ? "border-blue-200 bg-white text-slate-900"
                        : "border-white/15 bg-white/5 hover:border-blue-200 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-3 w-3 text-blue-200" />
                      <span>{cfg.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------ Hoofdcomponent ------------ */

export default function App() {
  // Standaard focus: Voorbeelden
  const [activePage, setActivePage] = useState("voorbeelden");
  const [showIntroVideo, setShowIntroVideo] = useState(false);

  const activeConfig = SECTIONS[activePage];
  const activePageLabel = activeConfig?.label ?? null;

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {showIntroVideo && (
        <IntroVideoOverlay onClose={() => setShowIntroVideo(false)} />
      )}

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
            <span className="font-semibold text-slate-700">
              Digitale Didactiek
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        {/* Hero / banner – eenvoudiger, focus op twee stappen */}
        <section className="mt-6 mb-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-slate-900 shadow-xl">
            <div className="relative h-[40vh] sm:h-[50vh] md:h-[54vh]">
              <img
                src="/media/01037808-bc10-468e-a00f-af57eea24fce.jpeg"
                alt="Team samenwerking en enthousiasme"
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/10" />

              <div className="absolute inset-0 flex items-center">
                <div className="w-full px-6 sm:px-8 md:px-10">
                  <div className="max-w-xl space-y-4 bg-slate-950/60 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-4 sm:py-5 border border-slate-700/60">
                    <p className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 border border-blue-300/40 px-3 py-1 text-[11px] font-semibold text-blue-100 uppercase tracking-wide">
                      <Sparkles className="h-3 w-3" />
                      Digitale didactiek &amp; ICT
                    </p>
                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
                        Eén startpunt voor ICT &amp; AI in je les
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-200">
                        Kies wat je nu nodig hebt: voorbeelden voor in de klas, zelf aan
                        de slag met AI of hulp bij een technisch probleem.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => setActivePage("voorbeelden")}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <BookOpen className="h-4 w-4" />
                        Voorbeelden bekijken
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setActivePage("aan-de-slag")}
                        className="border-slate-500/70 bg-slate-900/40 text-slate-100 hover:bg-slate-800"
                      >
                        <Sparkles className="h-4 w-4" />
                        Zelf aan de slag
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowIntroVideo(true)}
                        className="text-slate-200 hover:bg-slate-800/60"
                      >
                        🎥 Bekijk de korte intro-video
                      </Button>
                    </div>

                    <p className="text-[11px] text-slate-300">
                      Technisch probleem? Scroll naar beneden voor Bot Zuid of gebruik de
                      Teams-knop rechtsonder voor pedagogische vragen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Werkgroep klein onder de foto */}
        <section className="mb-6">
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
                  <p className="font-semibold text-slate-800 mb-1">
                    Pedagogisch team
                  </p>
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

        {/* Navigatie + Bot Zuid */}
        <section className="mb-8 grid gap-4 md:grid-cols-3 items-start">
          {/* Linkerkaart: sectie-navigatie */}
          <Card className="h-full p-0 md:col-span-1 md:sticky md:top-24 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white border-0 shadow-2xl">
            <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400" />

            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-blue-500/20 border border-blue-300/40 text-[11px] font-semibold text-blue-100">
                    <Sparkles className="h-3 w-3" />
                    <span>Kies een onderdeel</span>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-blue-200 font-semibold">
                      Navigatie
                    </p>
                    <h3 className="text-sm sm:text-base font-semibold">
                      Snel naar de juiste info
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-200 mt-1">
                      Klik op een tegel – onderaan deze pagina verschijnt de inhoud van
                      dat onderdeel.
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/40 border border-blue-200/60">
                  <ChevronRight className="h-4 w-4 text-blue-100" />
                </div>
              </div>

              <SectionNav activePage={activePage} setActivePage={setActivePage} />

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

              <div className="mt-3 pt-3 border-t border-white/20 text-[11px] text-slate-100 space-y-1">
                <p className="font-semibold text-blue-100">
                  Tip: start met de voorbeelden.
                </p>
                <p className="text-[10px] text-slate-200">
                  In de Drive-map vind je kant-en-klare lessen en prompts die je meteen
                  kan uitproberen in de klas.
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

          {/* Bot Zuid – rechts */}
          <Card className="h-full p-5 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 md:col-span-2">
            <div className="absolute inset-x-0 top-0 h-1 bg-white/40" />
            <div className="relative space-y-3 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full overflow-hidden bg-white/15 shadow-sm border border-white/40">
                    <img
                      src={BOT_ZUID_AVATAR}
                      alt="Bot Zuid"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wide font-semibold text-blue-100">
                      Probleem met ICT?
                    </p>
                    <h3 className="text-sm sm:text-base font-semibold">
                      Bot Zuid – projector, Kurzweil &amp; Smartschool
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">
                  Nieuw &amp; experimenteel
                </span>
              </div>

              <p className="text-xs sm:text-sm text-blue-50 leading-relaxed">
                Stel je vraag over projector, Kurzweil, Smartschool, printers, wifi en
                ander ICT-materiaal. Bot Zuid helpt je eerst zelf op weg. Werkt het niet?
                Gebruik dan het officiële ticketsysteem.
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
                    Werkt het nog steeds niet?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Gebruik ons officiële ticketsysteem voor storingen, defecten en
                    aanvragen.
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
                  💻 “Mijn projector toont niets…”
                </span>
                <span className="px-2 py-1 rounded-full bg-white/15 border border-white/20">
                  📚 “Kurzweil werkt niet bij een leerling…”
                </span>
                <span className="px-2 py-1 rounded-full bg-white/15 border border-white/20">
                  🔐 “Probleem met inloggen in Smartschool…”
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
        {activeConfig && (
          <section className="mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-[11px] sm:text-xs text-blue-800 font-semibold">
              <Sparkles className="h-3 w-3" />
              <span>
                Je bekijkt nu: <span className="underline">{activeConfig.label}</span>
              </span>
            </div>
            <activeConfig.component />
          </section>
        )}

        {/* Footer */}
        <footer className="mt-6 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2">
            <p className="text-[11px] text-slate-500">
              © {currentYear} Scholengroep Sint-Rembert · Werkgroep Digitale Didactiek
            </p>
          </div>
        </footer>
      </main>

      <FloatingPlanner />
    </div>
  );
}
