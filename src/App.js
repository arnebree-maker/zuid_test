import React, { useState } from "react";
import { ChevronRight, Link as LinkIcon, HelpCircle, Home, Lightbulb, BookOpen, X } from "lucide-react";

const Button = ({ children, onClick, as: Tag = "button", href, variant = "primary", className = "", ...rest }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg focus:ring-blue-400 shadow-md",
    secondary: "bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-300 border border-gray-200 shadow-sm hover:shadow-md",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  const isLink = Tag === "a" || href;
  const props = { className: cls, onClick, href, target: isLink ? "_blank" : undefined, rel: isLink ? "noopener noreferrer" : undefined, ...rest };
  return isLink ? <a {...props}>{children}</a> : <button {...props}>{children}</button>;
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-3xl border border-gray-200/50 bg-white backdrop-blur shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>{children}</div>
);

export default function App() {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="border-b border-white/20 bg-white/60 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">Scholengroep Sint‑Rembert · SiVi & VLTI</h1>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600">
            Werkgroep <strong className="ml-1">Digitale Didactiek</strong>
            <Button as="a" href="#" variant="secondary" className="ml-3"><Home className="h-4 w-4" /> Home</Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6">
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
                    Welkom op het<br />Sint‑Rembert Portaal
                  </h2>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium drop-shadow-lg">
                    Vind snel de juiste ondersteuning voor <strong>ICT</strong> en <strong>AI in het onderwijs</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="p-8 sm:p-10 mb-12 shadow-xl border-0 bg-white">
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
              <p className="mt-6 text-base">Is iets onduidelijk? <strong className="text-blue-700">Spreek ons gerust aan.</strong></p>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-0 overflow-hidden group">
            <div className="p-6 sm:p-7 flex items-start gap-3 border-b border-gray-200/50 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600">
              <div className="rounded-xl p-2.5 bg-white/20 backdrop-blur text-white shadow-lg"><HelpCircle className="h-5 w-5" /></div>
              <div>
                <h3 className="text-xl font-bold text-white">Vragen</h3>
                <p className="text-white/90">Snelle ICT‑hulp via Chatbot Zuid en ons ticketsysteem.</p>
              </div>
            </div>

            <div className="divide-y divide-gray-200/50">
              <div className="p-6 sm:p-7 flex items-center justify-between gap-4 hover:bg-blue-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl p-3 bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md"><LinkIcon className="h-4 w-4" /></div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Chatbot</p>
                    <p className="font-bold text-gray-900">Bot Zuid – ICT</p>
                  </div>
                </div>
                <Button as="a" href="https://chatgpt.com/g/g-68ee3d6afa348191a579bac4aa7c14da-ict-zuid">Open Chatbot <ChevronRight className="h-4 w-4" /></Button>
              </div>

              <div className="p-6 sm:p-7 hover:bg-blue-50/50 transition-colors">
                <h4 className="text-base font-bold text-gray-900">Problemen met ICT‑materiaal?</h4>
                <p className="text-gray-700 mt-1">Dien snel een ticket in via ons officiële ondersteuningsportaal.</p>
                <div className="mt-4"><Button as="a" href="https://sint-rembert.topdesk.net/" variant="secondary">Naar Topdesk <ChevronRight className="h-4 w-4" /></Button></div>
              </div>

              <div className="p-6 sm:p-7 bg-gradient-to-br from-slate-50 to-blue-50">
                <h3 className="text-xl font-bold text-gray-900">AI-tools</h3>
                <p className="text-gray-700 mb-4">Snelle toegang tot handige toepassingen voor in de klas.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button as="a" href="https://chatgpt.com/" variant="secondary" className="justify-start">ChatGPT</Button>
                  <Button as="a" href="https://gemini.google.com/" variant="secondary" className="justify-start">Google Gemini</Button>
                  <Button as="a" href="https://www.genial.ly/" variant="secondary" className="justify-start">Genially</Button>
                  <Button as="a" href="https://notebooklm.google.com/" variant="secondary" className="justify-start">NotebookLM</Button>
                  <Button as="a" href="https://gamma.app/" variant="secondary" className="justify-start">Gamma</Button>
                  <Button as="a" href="https://lovable.dev/" variant="secondary" className="justify-start">Lovable</Button>
                  <Button as="a" href="https://aistudio.google.com/" variant="secondary" className="justify-start sm:col-span-2">Google AI Studio</Button>
                </div>
                <div className="mt-5 space-y-3">
                  <Button onClick={() => setShowExamples(true)} variant="primary" className="w-full shadow-lg">
                    <BookOpen className="h-4 w-4" /> Hoe toepassen in je les?
                  </Button>
                  <div className="bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-2xl p-5 shadow-lg transform hover:scale-105 transition-transform">
                    <p className="text-xs font-bold mb-2 tracking-wide">COLLECTIEVE INSPIRATIE!</p>
                    <p className="text-sm mb-4">Bekijk wat je collega's hebben gemaakt en voeg jouw beste ideeën toe!</p>
                    <Button as="a" href="https://drive.google.com/drive/folders/12hkdkdgrNgK8W3b5qXjJvcPaKsinLEuj?usp=drive_link" className="w-full bg-white text-orange-600 hover:bg-orange-50 shadow-md">
                      <LinkIcon className="h-4 w-4" /> Drop je eigen ideeën hier
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-0 overflow-hidden group">
            <div className="p-6 sm:p-7 flex items-start gap-3 border-b border-gray-200/50 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600">
              <div className="rounded-xl p-2.5 bg-white/20 backdrop-blur text-white shadow-lg"><Lightbulb className="h-5 w-5" /></div>
              <div>
                <h3 className="text-xl font-bold text-white">Waarom AI gebruiken in het onderwijs?</h3>
                <p className="text-white/90">AI maakt leren persoonlijker, efficiënter en creatiever.</p>
              </div>
            </div>

            <div className="divide-y divide-gray-200/50">
              <div className="p-6 sm:p-7 hover:bg-emerald-50/50 transition-colors">
                <h4 className="text-base font-bold text-gray-900 mb-3">Kernvoordelen</h4>
                <ul className="list-none text-gray-700 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Dieper leren door reflectie</strong> – AI genereert gerichte reflectievragen.</span></li>
                  <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Structuur via mindmaps</strong> – AI helpt thema's ordenen en verbanden zien.</span></li>
                  <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Schrijf- & leesvaardigheid</strong> – Gepersonaliseerde feedback en niveau‑aanpassing.</span></li>
                  <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Oefenen van spreekvaardigheid</strong> – Virtuele gesprekspartners in een veilige omgeving.</span></li>
                  <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Sneller inzicht</strong> – Automatische samenvattingen met de hoofdlijnen.</span></li>
                  <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Creativiteit stimuleren</strong> – Beeld, audio en verhalen met o.a. DALL·E en Suno.</span></li>
                  <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Efficiënt evalueren</strong> – Snel vragen en quizzen genereren.</span></li>
                  <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">✓</span><span><strong>Rekenondersteuning</strong> – Stapsgewijze oplossingen en alternatieve aanpakken.</span></li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs font-semibold text-blue-900 mb-2">Meer lezen?</p>
                  <ul className="space-y-1.5">
                    <li><a className="text-blue-700 hover:text-blue-900 underline text-sm font-medium" href="https://www.ser.nl/nl/actueel/Nieuws/ChatGPT-in-het-onderwijs" target="_blank" rel="noopener noreferrer">ChatGPT in het onderwijs – SER</a></li>
                    <li><a className="text-blue-700 hover:text-blue-900 underline text-sm font-medium" href="https://www.destudentenadvocaat.nl/blog/voordelen-chatgpt-onderwijs" target="_blank" rel="noopener noreferrer">Voordelen van ChatGPT – De Studentenadvocaat</a></li>
                  </ul>
                </div>
              </div>

              <div className="p-6 sm:p-7 bg-gradient-to-br from-slate-50 to-emerald-50">
                <h4 className="text-base font-bold text-gray-900 mb-2">AI en formatief handelen</h4>
                <p className="text-gray-700">AI helpt tijd besparen, patronen herkennen en feedback gerichter inzetten.</p>
                <div className="mt-4"><Button as="a" href="https://toetsrevolutie.nl/tijd-besparen-met-ai-formatief-handelen-in-de-praktijk/?utm_source=teachertapp&utm_medium=app" variant="secondary">Lees meer over formatief handelen <ChevronRight className="h-4 w-4" /></Button></div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-16 mb-8 text-center">
          <div className="inline-block px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200">
            <p className="text-xs text-gray-600">© {new Date().getFullYear()} Scholengroep Sint‑Rembert · Digitale Didactiek</p>
          </div>
        </div>
      </main>

      {showExamples && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 border-b border-blue-700/20 p-6 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-2xl font-bold text-white">Hoe toepassen in je les?</h2>
              <button onClick={() => setShowExamples(false)} className="p-2 hover:bg-white/20 rounded-xl transition text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-xl p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">NotebookLM Voorbeelden</h3>
                </div>
                <p className="text-gray-700 mb-5">NotebookLM helpt leerlingen samenvattingen te maken, bronnen te analyseren en diepgaande vragen te stellen over hun leerstof.</p>
                <div className="space-y-4">
                  <div className="border-l-4 border-emerald-500 bg-emerald-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Geschiedenis: Tweede Wereldoorlog Analyse</h4>
                    <p className="text-sm text-gray-700 mb-3">Upload hoofdstukken uit het geschiedenishandboek en laat NotebookLM een interactieve samenvatting maken met tijdlijn en kernconcepten.</p>
                    <Button as="a" href="https://notebooklm.google.com/" variant="secondary" className="text-xs">Probeer NotebookLM <ChevronRight className="h-3 w-3" /></Button>
                  </div>
                  <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Wetenschappen: Onderzoeksrapporten Samenvatten</h4>
                    <p className="text-sm text-gray-700 mb-3">Leerlingen uploaden wetenschappelijke artikelen en NotebookLM extraheert de belangrijkste bevindingen, methodologie en conclusies.</p>
                    <Button as="a" href="https://notebooklm.google.com/" variant="secondary" className="text-xs">Probeer NotebookLM <ChevronRight className="h-3 w-3" /></Button>
                  </div>
                  <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Talen: Literatuuranalyse</h4>
                    <p className="text-sm text-gray-700 mb-3">Upload een boek of gedicht en laat NotebookLM thema's, personages en literaire technieken analyseren voor diepere tekstbegrip.</p>
                    <Button as="a" href="https://notebooklm.google.com/" variant="secondary" className="text-xs">Probeer NotebookLM <ChevronRight className="h-3 w-3" /></Button>
                  </div>
                  <div className="border-l-4 border-amber-500 bg-amber-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Examens: Studiemateriaal Omzetten naar Podcast</h4>
                    <p className="text-sm text-gray-700 mb-3">Upload notities en laat NotebookLM een audio-discussie genereren tussen twee sprekers die de leerstof uitleggen - perfect voor auditieve leerlingen.</p>
                    <Button as="a" href="https://notebooklm.google.com/" variant="secondary" className="text-xs">Probeer NotebookLM <ChevronRight className="h-3 w-3" /></Button>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-xl p-3 bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Lovable Voorbeelden</h3>
                </div>
                <p className="text-gray-700 mb-5">Lovable helpt leerlingen en leerkrachten eenvoudig interactieve webapplicaties te bouwen zonder programmeerkennis.</p>
                <div className="space-y-4">
                  <div className="border-l-4 border-cyan-500 bg-cyan-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Project: Interactieve Quiz App</h4>
                    <p className="text-sm text-gray-700 mb-3">Leerlingen maken een quiz-app voor hun klasgenoten over hun vakinhoudsonderwerp - ideaal voor STEM-vakken of talen.</p>
                    <Button as="a" href="https://lovable.dev/" variant="secondary" className="text-xs">Probeer Lovable <ChevronRight className="h-3 w-3" /></Button>
                  </div>
                  <div className="border-l-4 border-pink-500 bg-pink-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Creatief Project: Digitaal Portfolio</h4>
                    <p className="text-sm text-gray-700 mb-3">Bouw een persoonlijk portfolio website voor eindwerk, kunstprojecten of reflecties zonder code te hoeven schrijven.</p>
                    <Button as="a" href="https://lovable.dev/" variant="secondary" className="text-xs">Probeer Lovable <ChevronRight className="h-3 w-3" /></Button>
                  </div>
                  <div className="border-l-4 border-teal-500 bg-teal-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Leerkracht Tool: Lesplanner App</h4>
                    <p className="text-sm text-gray-700 mb-3">Maak een gepersonaliseerde lesplanning tool met agenda, to-do lijsten en leermiddelen - volledig aangepast aan jouw behoeften.</p>
                    <Button as="a" href="https://lovable.dev/" variant="secondary" className="text-xs">Probeer Lovable <ChevronRight className="h-3 w-3" /></Button>
                  </div>
                  <div className="border-l-4 border-orange-500 bg-orange-50 rounded-r-xl p-5 hover:shadow-lg transition-all hover:translate-x-1">
                    <h4 className="font-bold text-gray-900 mb-2">Digitale Vaardigheden: Eigen Website Bouwen</h4>
                    <p className="text-sm text-gray-700 mb-3">Leer leerlingen basis webdesign concepten door hun eigen website te laten maken - van simpele landingspagina tot interactieve app.</p>
                    <Button as="a" href="https://lovable.dev/" variant="secondary" className="text-xs">Probeer Lovable <ChevronRight className="h-3 w-3" /></Button>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-inner">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Tips voor gebruik in de klas
                </h4>
                <ul className="list-none text-sm text-gray-700 space-y-2.5">
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold mt-0.5">→</span><span>Begin met een demo voor de hele klas voordat leerlingen zelfstandig aan de slag gaan</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold mt-0.5">→</span><span>Laat leerlingen in tweetallen werken om elkaar te ondersteunen</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold mt-0.5">→</span><span>Geef duidelijke instructies over wat wel en niet gedeeld mag worden</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold mt-0.5">→</span><span>Moedig kritisch denken aan: AI is een hulpmiddel, geen vervanging voor eigen werk</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold mt-0.5">→</span><span>Bespreek ethiek en privacy bij het gebruik van AI-tools</span></li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-6 shadow-xl">
                <h4 className="font-bold text-white mb-3 text-lg">Deel je ervaring!</h4>
                <p className="text-sm text-white/95 mb-4">Heb je zelf interessante projecten of toepassingen in je les? Deel je ideeën en ervaringen met de hele werkgroep. Dit helpt iedereen om van elkaar te leren!</p>
                <Button as="a" href="https://drive.google.com/drive/folders/12hkdkdgrNgK8W3b5qXjJvcPaKsinLEuj?usp=drive_link" className="w-full bg-white text-blue-700 hover:bg-blue-50 shadow-lg">
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
