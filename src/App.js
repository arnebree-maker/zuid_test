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
              In deze Drive-map vind je kant-en-klare lessen en prompts van collega&apos;s.
              Je mag hier ook zelf je eigen AI-lessen of projecten uploaden.
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
