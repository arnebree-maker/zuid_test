// src/App.js
import React, { useState, useEffect } from "react";
import {
  Sparkles,
  BookOpen,
  Lightbulb,
  Calendar,
  Clock,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

/* ---------------- CONSTANTS ---------------- */

const BOT_ZUID_AVATAR = "/media/bot-zuid.png";
const GEMINI_URL =
  "https://gemini.google.com/gem/1eAez_W8DALYxBVNPQTzmg2CVx4XDn6w7?usp=sharing";
const DRIVE_EXAMPLES_URL =
  "https://drive.google.com/drive/folders/12hkdkdgrNgK8W3b5qXjJvcPaKsinLEuj?usp=sharing";
const TEAMS_URL =
  "https://teams.microsoft.com/l/chat/0/0?users=arne.breemeersch@sint-rembert.be";

/* ---------------- UI BASIS ---------------- */

const Button = ({ children, as: Tag = "button", href, variant = "primary", className = "", ...rest }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  };

  const cls = `${base} ${variants[variant]} ${className}`;
  if (Tag === "a" || href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

/* ---------------- VIDEO OVERLAY ---------------- */

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

/* ---------------- CHATBOT ---------------- */

function SupportChat() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hallo! Ik ben Bot Zuid. Stel hier je vraag over projectie, Kurzweil, Smartschool, printers of ICT-materiaal." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.slice(-6) }),
      });

      const data = await res.json();
      const reply = data.reply || "Er ging iets mis. Probeer later opnieuw.";
      setMessages([...newMessages, { role: "bot", text: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "bot", text: "Er is een verbindingsfout. Probeer later opnieuw." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
      <div className="h-40 overflow-y-auto space-y-2 mb-3 pr-1 text-xs sm:text-sm">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
            {m.role === "bot" && (
              <img src={BOT_ZUID_AVATAR} className="h-7 w-7 rounded-full" alt="Bot Zuid" />
            )}
            <div
              className={`px-2.5 py-1.5 rounded-lg ${
                m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <img src={BOT_ZUID_AVATAR} className="h-7 w-7 rounded-full" alt="" />
            <div className="px-2.5 py-1.5 rounded-lg border text-xs text-slate-500">
              Bot Zuid is aan het nadenken…
            </div>
          </div>
        )}
      </div>

      <form onSubmit={send} className="flex gap-2">
        <input
          className="flex-1 border border-slate-200 rounded-md px-2 py-1.5 text-xs"
          placeholder="Beschrijf kort je technisch probleem…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" className="px-3 py-1.5 text-xs">
          Verstuur
        </Button>
      </form>

      <p className="text-[10px] text-slate-400 mt-1">Geen gevoelige leerlinggegevens invoeren.</p>
    </div>
  );
}

/* ---------------- FIGURE SECTION: VOORBEELDEN ---------------- */

function Examples() {
  return (
    <Card className="p-6 space-y-5">
      <div className="flex gap-3 items-center">
        <div className="h-9 w-9 bg-slate-900 rounded-lg text-white flex items-center justify-center">
          <BookOpen className="h-4 w-4" />
        </div>
        <h2 className="text-lg font-semibold">Voorbeelden</h2>
      </div>

      {/* --- LOVABLE --- */}
      <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50">
        <h3 className="font-semibold text-sm">Voorbeeld – Lovable</h3>
        <p className="text-sm text-slate-600">
          AI-website die automatisch lessen, oefeningen en info genereert.
        </p>
        <Button as="a" href="https://rekenenindelogistiek.lovable.app/" variant="primary">
          Lovable-voorbeeld openen
        </Button>
      </div>

      {/* AI Studio */}
      <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50">
        <h3 className="font-semibold text-sm">Voorbeeld – Google AI Studio</h3>
        <img src="/media/pizzabestellen.png" alt="" className="rounded-xl border" />
      </div>

      {/* NotebookLM */}
      <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50">
        <h3 className="font-semibold text-sm">Voorbeeld – NotebookLM</h3>
        <img src="/media/notebooklm.png" alt="" className="rounded-xl border" />
      </div>

      {/* Drive link */}
      <div className="border border-blue-200 bg-blue-50 p-4 rounded-xl">
        <p className="text-sm font-semibold">Meer voorbeelden</p>
        <p className="text-xs text-slate-600">
          Bekijk extra voorbeelden van collega's in onze Drive-map.
        </p>
        <Button as="a" href={DRIVE_EXAMPLES_URL} variant="secondary" className="mt-2">
          Open Drive-map
        </Button>
      </div>
    </Card>
  );
}

/* ---------------- AAN DE SLAG ---------------- */

function GettingStarted() {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex gap-3 items-center">
        <div className="h-9 w-9 bg-blue-600 rounded-lg text-white flex items-center justify-center">
          <Sparkles className="h-4 w-4" />
        </div>
        <h2 className="text-lg font-semibold">Aan de slag</h2>
      </div>

      <p className="text-sm text-slate-700">
        Korte introductie tot prompten, website bouwen in Lovable, chatbot maken in AI Studio en NotebookLM-vragen genereren.
      </p>

      <p className="text-xs text-slate-500">
        (Originele inhoud uit jouw vorige sectie blijft behouden.)
      </p>
    </Card>
  );
}

/* ---------------- BIJSCHOLING ---------------- */

function Training() {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex gap-3 items-center">
        <div className="h-9 w-9 bg-emerald-600 text-white rounded-lg flex items-center justify-center">
          <Sparkles className="h-4 w-4" />
        </div>
        <h2 className="text-lg font-semibold">Bijscholing – Lovable</h2>
      </div>

      <div className="space-y-2 text-sm">
        <p><strong>Datum:</strong> 15 december 2025</p>
        <p><strong>Start:</strong> 16u00</p>
        <p><strong>Locatie:</strong> Lokaal Z314</p>
      </div>

      <Button variant="primary">Inschrijven</Button>
    </Card>
  );
}

/* ---------------- HOOFDCOMPONENT ---------------- */

export default function App() {
  const [activePage, setActivePage] = useState("voorbeelden");
  const [showIntroVideo, setShowIntroVideo] = useState(true);

  const SECTIONS = {
    voorbeelden: { label: "Voorbeelden", component: Examples },
    "aan-de-slag": { label: "Aan de slag", component: GettingStarted },
  };

  const activeConfig =
    SECTIONS[activePage] || SECTIONS["voorbeelden"];
  const ActiveSection = activeConfig.component;

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-100">
      {showIntroVideo && <IntroVideoOverlay onClose={() => setShowIntroVideo(false)} />}

      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <h1 className="text-sm font-semibold">Scholengroep Sint-Rembert · Digitale Didactiek</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* HERO */}
        <section className="relative rounded-3xl overflow-hidden border bg-slate-900 text-white p-6">
          <h2 className="text-3xl font-semibold">
            Alles rond ICT & AI op één plek
          </h2>
          <p className="text-slate-300 mt-1 max-w-md">
            Start met voorbeelden of leer hoe je zelf een AI-tool maakt.
          </p>

          <div className="mt-4 flex gap-2">
            <Button variant="primary" onClick={() => setActivePage("voorbeelden")}>
              Voorbeelden
            </Button>
            <Button variant="secondary" onClick={() => setActivePage("aan-de-slag")}>
              Aan de slag
            </Button>
          </div>

          <button
            onClick={() => setShowIntroVideo(true)}
            className="mt-3 underline text-sm text-blue-200"
          >
            Intro-video bekijken
          </button>
        </section>

        {/* Bot Zuid */}
        <Card className="p-5 bg-gradient-to-br from-blue-600 to-sky-500 text-white">
          <h3 className="text-lg font-semibold mb-2">Probleem met ICT?</h3>
          <p className="text-sm text-blue-100 mb-3">
            Start met Bot Zuid. Werkt het niet? Gebruik ons officiële ticketsysteem.
          </p>
          <SupportChat />

          <div className="mt-3">
            <Button as="a" href="https://sint-rembert.topdesk.net/" variant="secondary">
              Naar Topdesk
            </Button>
          </div>
        </Card>

        {/* ACTIEVE SECTIE */}
        <ActiveSection />

        {/* BIJSCHOLING */}
        <Training />

        {/* FOOTER */}
        <footer className="text-center text-xs text-slate-500 py-6">
          © {year} Scholengroep Sint-Rembert
        </footer>
      </main>
    </div>
  );
}
