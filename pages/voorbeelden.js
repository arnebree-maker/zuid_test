// pages/voorbeelden.js
import React from "react";
import { Home, BookOpen, Link as LinkIcon } from "lucide-react";

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

export default function VoorbeeldenPage() {
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
                Voorbeelden &amp; scenario&apos;s
              </h1>
              <p className="text-xs text-slate-500">
                Praktische voorbeelden van collega&apos;s binnen Sint-Rembert.
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
        {/* Intro */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
            AI in je les: uitgewerkte scenario&apos;s
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl">
            In deze map verzamelen we voorbeelden, scenario&apos;s, prompts en oefeningen die
            leerkrachten binnen de scholengroep gemaakt hebben. Je mag ze gebruiken,
            aanpassen en er zelf nieuwe voorbeelden aan toevoegen.
          </p>
        </section>

        {/* Hoofdkaart: Drive-map */}
        <section>
          <Card className="p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-[12px] font-medium text-blue-600 uppercase tracking-wide">
                  Praktijkvoorbeelden
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                  Centrale Drive-map met alle voorbeelden
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Hier vind je voorbeelden per vak, per tool en per type opdracht. Gebruik ze
                  als inspiratiebron of vertrekpunt voor je eigen les.
                </p>
              </div>

              <span className="hidden sm:inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-100">
                Gemaakt door collega&apos;s
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-sm leading-relaxed">
              <div className="space-y-3">
                <p className="font-semibold text-slate-800">Wat vind je in deze map?</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                  <li>Kant-en-klare lesvoorbeelden met AI-tools (per vak en graad).</li>
                  <li>Voorbeeldprompts die écht gewerkt hebben in de klas.</li>
                  <li>Genially- en Gamma-projecten (quizzen, escape rooms, presentaties).</li>
                  <li>NotebookLM-notebooks met gestructureerde leerstof.</li>
                  <li>Lovable-sites met oefenmateriaal en leerlingenportalen.</li>
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
                  <LinkIcon className="h-4 w-4" />
                  Open de map met alle voorbeelden (Drive)
                </Button>

                <p className="text-xs sm:text-sm text-slate-600">
                  Tip: Maak een eigen submap per klas of per project. Zo blijft duidelijk wat
                  je gebruikt hebt en wat je nog wil uitproberen.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Extra: voorbeelden per tool */}
        <section className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">
            Inspiratie per tool
          </h3>
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <Card className="p-4">
              <h4 className="font-semibold text-slate-900 mb-2">
                NotebookLM – werken met leerstof
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li>Hoofdstukken automatisch laten samenvatten voor herhaling.</li>
                <li>Belangrijke kernbegrippen laten highlighten met korte uitleg.</li>
                <li>Vragen laten genereren voor formatieve evaluatie.</li>
                <li>Audio-uitleg laten maken voor leerlingen die auditief leren.</li>
              </ul>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold text-slate-900 mb-2">
                Genially &amp; Lovable – interactieve leerwegen
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li>Escape rooms rond een thema (bv. WO II, logistiek, talen).</li>
                <li>
                  Een Lovable-site als klassikaal portaal met opdrachten, rubrics en
                  deadlines.
                </li>
                <li>Interactiviteit via hotspots, quizzen en feedbackschermen.</li>
              </ul>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold text-slate-900 mb-2">
                ChatGPT / Gemini – taaltaken &amp; reflectie
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li>Dialogen genereren om spreekvaardigheid te oefenen.</li>
                <li>Alternatieve verwoordingen voor moeilijke teksten.</li>
                <li>Reflectievragen na een toets of project laten formuleren.</li>
              </ul>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold text-slate-900 mb-2">
                Andere inspirerende toepassingen
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li>Mindmaps genereren rond nieuwe thema&apos;s.</li>
                <li>Overzichtstabellen voor complexe leerinhouden.</li>
                <li>Snelle remediëringsopdrachten op verschillende niveaus.</li>
              </ul>
            </Card>
          </div>
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

