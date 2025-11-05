import React from "react";
import { ChevronRight, Link as LinkIcon, HelpCircle, Home, Lightbulb } from "lucide-react";

// --- Primitives ---
const Button = ({ children, onClick, as: Tag = "button", href, variant = "primary", className = "", ...rest }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400 shadow-sm",
    secondary: "bg-white/80 backdrop-blur text-gray-900 hover:bg-white focus:ring-gray-300 border border-gray-200 shadow-sm",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  const isLink = Tag === "a" || href;
  const props = { className: cls, onClick, href, target: isLink ? "_blank" : undefined, rel: isLink ? "noopener noreferrer" : undefined, ...rest };
  return isLink ? <a {...props}>{children}</a> : <button {...props}>{children}</button>;
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur shadow-sm ${className}`}>{children}</div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50">
      {/* Topbar */}
      <div className="border-b border-gray-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Scholengroep Sint‑Rembert · SiVi & VLTI</h1>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600">
            Werkgroep <strong className="ml-1">Digitale Didactiek</strong>
            <Button as="a" href="#" variant="secondary" className="ml-3"><Home className="h-4 w-4" /> Home</Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* Hero cover (teruggeplaatst) */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-sm border border-gray-200/70">
          <img
            src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1600&auto=format&fit=crop&q=80"
            alt="ICT‑sfeerbeeld: technologie en samenwerking"
            className="w-full h-64 sm:h-72 md:h-80 object-cover"
          />
        </div>
        {/* Intro */}
        <Card className="p-6 sm:p-8 mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welkom op het Sint‑Rembert Portaal</h2>
            <p className="mt-2 text-gray-700">Vind snel de juiste ondersteuning voor <strong>ICT</strong> en <strong>AI in het onderwijs</strong>.</p>
            <div className="mt-5 text-gray-800 leading-relaxed">
              <p className="font-medium">Werkgroep <strong>Digitale Didactiek</strong></p>
              <p className="mt-1"><span className="font-semibold">Technisch team:</span> Mieke Verbeerst, Barbara Van Hecke, Arne Breemeersch.</p>
              <p><span className="font-semibold">Pedagogisch team:</span> Jasper Gerits, Glenn Van de Voorde.</p>
              <p className="mt-1">Is iets onduidelijk? <strong>Spreek ons gerust aan.</strong></p>
            </div>
          </div>
        </Card>

        {/* Two-column balanced layout */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: Vragen */}
          <Card className="p-0 overflow-hidden">
            <div className="p-6 sm:p-7 flex items-start gap-3 border-b border-gray-200/70 bg-gradient-to-r from-blue-50 to-transparent">
              <div className="rounded-xl p-2.5 bg-blue-600 text-white shadow-sm"><HelpCircle className="h-5 w-5" /></div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Vragen</h3>
                <p className="text-gray-700">Snelle ICT‑hulp via Chatbot Zuid en ons ticketsysteem.</p>
              </div>
            </div>

            <div className="divide-y divide-gray-200/70">
              <div className="p-6 sm:p-7 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl p-3 bg-indigo-600 text-white shadow-sm"><LinkIcon className="h-4 w-4" /></div>
                  <div>
                    <p className="text-xs text-gray-600">Chatbot</p>
                    <p className="font-semibold text-gray-900">Bot Zuid – ICT</p>
                  </div>
                </div>
                <Button as="a" href="https://chatgpt.com/g/g-68ee3d6afa348191a579bac4aa7c14da-ict-zuid">Open Chatbot <ChevronRight className="h-4 w-4" /></Button>
              </div>

              <div className="p-6 sm:p-7">
                <h4 className="text-base font-semibold text-gray-900">Problemen met ICT‑materiaal?</h4>
                <p className="text-gray-700 mt-1">Dien snel een ticket in via ons officiële ondersteuningsportaal.</p>
                <div className="mt-4"><Button as="a" href="https://sint-rembert.topdesk.net/" variant="secondary">Naar Topdesk <ChevronRight className="h-4 w-4" /></Button></div>
              </div>
            </div>
          </Card>

          {/* Right: AI */}
          <Card className="p-0 overflow-hidden">
            <div className="p-6 sm:p-7 flex items-start gap-3 border-b border-gray-200/70 bg-gradient-to-r from-fuchsia-50 to-transparent">
              <div className="rounded-xl p-2.5 bg-fuchsia-600 text-white shadow-sm"><Lightbulb className="h-5 w-5" /></div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Waarom AI gebruiken in het onderwijs?</h3>
                <p className="text-gray-700">AI maakt leren persoonlijker, efficiënter en creatiever.</p>
              </div>
            </div>

            <div className="divide-y divide-gray-200/70">
              {/* Kernvoordelen */}
              <div className="p-6 sm:p-7">
                <h4 className="text-base font-semibold text-gray-900 mb-2">Kernvoordelen</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1.5">
                  <li><strong>Dieper leren door reflectie</strong> – AI genereert gerichte reflectievragen.</li>
                  <li><strong>Structuur via mindmaps</strong> – AI helpt thema’s ordenen en verbanden zien.</li>
                  <li><strong>Schrijf- & leesvaardigheid</strong> – Gepersonaliseerde feedback en niveau‑aanpassing.</li>
                  <li><strong>Oefenen van spreekvaardigheid</strong> – Virtuele gesprekspartners in een veilige omgeving.</li>
                  <li><strong>Sneller inzicht</strong> – Automatische samenvattingen met de hoofdlijnen.</li>
                  <li><strong>Creativiteit stimuleren</strong> – Beeld, audio en verhalen met o.a. DALL·E en Suno.</li>
                  <li><strong>Efficiënt evalueren</strong> – Snel vragen en quizzen genereren.</li>
                  <li><strong>Rekenondersteuning</strong> – Stapsgewijze oplossingen en alternatieve aanpakken.</li>
                </ul>
                <ul className="list-disc list-inside mt-3 space-y-1">
                  <li><a className="text-blue-700 hover:text-blue-900 underline" href="https://www.ser.nl/nl/actueel/Nieuws/ChatGPT-in-het-onderwijs" target="_blank" rel="noopener noreferrer">ChatGPT in het onderwijs – SER</a></li>
                  <li><a className="text-blue-700 hover:text-blue-900 underline" href="https://www.destudentenadvocaat.nl/blog/voordelen-chatgpt-onderwijs" target="_blank" rel="noopener noreferrer">Voordelen van ChatGPT in het onderwijs – De Studentenadvocaat</a></li>
                </ul>
              </div>

              {/* Formatief handelen */}
              <div className="p-6 sm:p-7">
                <h4 className="text-base font-semibold text-gray-900 mb-1">AI en formatief handelen</h4>
                <p className="text-gray-700">AI helpt tijd besparen, patronen herkennen en feedback gerichter inzetten.</p>
                <div className="mt-4"><Button as="a" href="https://toetsrevolutie.nl/tijd-besparen-met-ai-formatief-handelen-in-de-praktijk/?utm_source=teachertapp&utm_medium=app" variant="secondary">Lees meer over formatief handelen <ChevronRight className="h-4 w-4" /></Button></div>
              </div>

              {/* Tools */}
              <div className="p-6 sm:p-7">
                <h4 className="text-base font-semibold text-gray-900 mb-2">AI‑tools</h4>
                <p className="text-gray-700 mb-3">Snelle toegang tot handige toepassingen voor in de klas.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Button as="a" href="https://chatgpt.com/" variant="secondary">ChatGPT</Button>
                  <Button as="a" href="https://gemini.google.com/" variant="secondary">Google Gemini</Button>
                  <Button as="a" href="https://www.genial.ly/" variant="secondary">Genially</Button>
                  <Button as="a" href="https://notebooklm.google.com/" variant="secondary">NotebookLM</Button>
                  <Button as="a" href="https://gamma.app/" variant="secondary">Gamma</Button>
                  <Button as="a" href="https://lovable.dev/" variant="secondary">Lovable</Button>
                  <Button as="a" href="https://aistudio.google.com/" variant="secondary">Google AI Studio</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <p className="mt-10 text-center text-xs text-gray-500">© {new Date().getFullYear()} Scholengroep Sint‑Rembert · Digitale Didactiek</p>
      </main>
    </div>
  );
}
