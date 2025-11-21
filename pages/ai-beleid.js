// pages/ai-beleid.js
import React, { useState } from "react";
import { Home, Lightbulb, ChevronDown } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

export default function AiBeleidPage() {
  const [openWhy, setOpenWhy] = useState(true);

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
                AI-richtlijnen &amp; inspiratie
              </h1>
              <p className="text-xs text-slate-500">
                Wat mag wel, wat niet, en waarom AI zinvol kan zijn.
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
        {/* AI-beleid light */}
        <section>
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="sm:w-1/2 space-y-2">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-blue-600">
                  AI in de klas · Richtlijnen in één oogopslag
                </p>
                <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                  Wat mag wel, wat liever niet?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Deze samenvatting is bedoeld als praktische steun voor leerkrachten. Raadpleeg
                  altijd het officiële school- of scholengroepbeleid voor de volledige
                  afspraken rond privacy, data en gebruik.
                </p>
              </div>

              <div className="sm:w-1/2 grid gap-4 sm:grid-cols-2 mt-2 sm:mt-0 text-xs sm:text-sm">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                  <p className="font-semibold text-emerald-800 mb-1">✅ Wel doen</p>
                  <ul className="space-y-1 text-emerald-900">
                    <li>• AI gebruiken voor inspiratie, herformulering en voorbeelden.</li>
                    <li>• Lesmateriaal laten verbeteren en differentiëren.</li>
                    <li>• Leerlingen begeleiden bij het kritisch beoordelen van AI-output.</li>
                    <li>• Geen echte namen of gevoelige gegevens invoeren.</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <p className="font-semibold text-amber-900 mb-1">
                    ⚠️ Voorzichtig mee / liever niet
                  </p>
                  <ul className="space-y-1 text-amber-900">
                    <li>• Geen vertrouwelijke leerling- of personeelsgegevens ingeven.</li>
                    <li>• Geen volledige taken door AI laten maken zonder eigen inbreng.</li>
                    <li>• AI-output nooit ongecheckt overnemen (altijd nalezen).</li>
                    <li>• Geen accounts laten aanmaken door leerlingen zonder toestemming.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Waarom AI gebruiken? */}
        <section>
          <Card className="overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenWhy(!openWhy)}
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
                    Klik om deze uitleg {openWhy ? "te verbergen" : "uit te vouwen"}.
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-slate-500 transition-transform ${
                  openWhy ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>

            {openWhy && (
              <div className="divide-y divide-slate-200">
                <div className="px-5 py-4">
                  <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
                    <li>• Persoonlijke feedback en gerichte oefening voor leerlingen.</li>
                    <li>• Sneller materiaal maken: toetsen, rubrics, voorbeeldopdrachten.</li>
                    <li>• Ondersteuning bij differentiatie en remediëring.</li>
                    <li>• Hulp bij samenvatten, structureren en visualiseren van leerstof.</li>
                    <li>• Kansen om leerlingen kritisch te leren omgaan met AI.</li>
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

        {/* Terug naar start */}
        <section className="pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"
          >
            <Home className="h-4 w-4" />
            Terug naar startpagina
          </a>
        </section>
      </main>
    </div>
  );
}

