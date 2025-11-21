// pages/ai-tools.js
import React from "react";
import { Home, Lightbulb, Link as LinkIcon } from "lucide-react";

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

export default function AiToolsPage() {
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
                AI-tools voor in de klas
              </h1>
              <p className="text-xs text-slate-500">
                Overzicht van handige AI-toepassingen voor leerkrachten.
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
            Overzicht AI-tools
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            Hieronder vind je een selectie van tools die binnen Sint-Rembert vaak gebruikt
            worden. Gebruik ze als inspiratiebron – kies 1 of 2 tools die bij jouw les passen
            in plaats van alles tegelijk te proberen.
          </p>
        </section>

        {/* AI-tools kaart */}
        <section>
          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 px-5 py-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                    AI-tools voor leerkrachten
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Klik door naar de tool en probeer 1 klein experiment in je les.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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

              <div className="grid gap-4 sm:grid-cols-3 text-xs sm:text-sm">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-800">Tekst &amp; uitleg</p>
                  <p className="text-slate-600">
                    <strong>ChatGPT</strong> en <strong>Gemini</strong> zijn ideaal om uitleg,
                    voorbeelden, toetsvragen en rubrics te genereren. Laat ze meedenken, maar
                    lees altijd kritisch na.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-slate-800">Visuals &amp; interactie</p>
                  <p className="text-slate-600">
                    Met <strong>Genially</strong> en <strong>Gamma</strong> maak je interactieve
                    presentaties, escape rooms en visuele uitleg. AI helpt je opstarten.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-slate-800">Structuur &amp; websites</p>
                  <p className="text-slate-600">
                    <strong>NotebookLM</strong> helpt leerstof structureren en samenvatten.
                    Met <strong>Lovable</strong> bouw je eenvoudig een eigen les- of
                    projectwebsite.
                  </p>
                </div>
              </div>

              <div className="border border-dashed border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-600 bg-slate-50 leading-relaxed">
                Tip: Kies voor één les een heel concrete vraag, bijvoorbeeld{" "}
                <em>&quot;maak drie differentiatie-opdrachten voor deze leerstof&quot;</em> of{" "}
                <em>&quot;herformuleer deze uitleg voor 2de graad leerlingen&quot;</em>.
              </div>
            </div>
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

