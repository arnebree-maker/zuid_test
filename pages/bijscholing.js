// pages/bijscholing.js
import React, { useState, useEffect } from "react";
import { Home, Sparkles, Calendar, MapPin, Clock, Link as LinkIcon } from "lucide-react";

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

export default function BijscholingPage() {
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
                Bijscholing &amp; vorming
              </h1>
              <p className="text-xs text-slate-500">
                Sessies rond AI, ICT en digitale didactiek.
              </p>
            </div>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"
          >
            <Home className="h-4 w-4" />
            Terug naar start
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
        {/* Lovable-bijscholing */}
        <section>
          <Card className="p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-[11px] font-medium text-blue-600 uppercase tracking-wide">
                  Bijscholing
                </p>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-2 mt-1">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  Lovable · AI-website bouwen
                </h2>
                <p className="text-sm sm:text-[15px] text-slate-600 mt-2 leading-relaxed">
                  In 1 uur leer je hoe je met <span className="font-semibold">Lovable</span> een
                  eenvoudige AI-gestuurde website maakt voor je eigen lespraktijk. Ideaal voor
                  leerkrachten die een portaal, projectsite of oefenapp willen bouwen.
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
                <p className="text-xs font-semibold text-slate-500 uppercase">Je leert o.a.:</p>
                <ul className="text-sm text-slate-700 space-y-1.5">
                  <li>• Basis van Lovable in onderwijscontext.</li>
                  <li>• Een eenvoudige les- of projectsite opzetten.</li>
                  <li>• Voorbeelden van collega&apos;s bekijken en hergebruiken.</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
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
        </section>

        {/* Placeholder voor toekomstige sessies */}
        <section>
          <Card className="p-6">
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
              Toekomstige sessies
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              Hier zullen we toekomstige bijscholingen rond AI, NotebookLM, Genially, evalueren
              met AI, … opnemen. Heb je zelf een idee of wil je iets mee begeleiden? Laat het
              weten aan de werkgroep Digitale Didactiek.
            </p>
            <p className="text-xs text-slate-500">
              Voorlopig plannen: voorjaar 2026 – NotebookLM in de klas, Genially escape rooms,
              AI &amp; formatief handelen.
            </p>
          </Card>
        </section>

        {/* Terug naar start */}
        <section className="pt-2">
          <Button as="a" href="/" variant="ghost" className="gap-1 text-xs">
            <Home className="h-4 w-4" />
            Terug naar startpagina
          </Button>
        </section>
      </main>
    </div>
  );
}

