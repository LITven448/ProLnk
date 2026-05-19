import { Helmet } from "react-helmet-async";
import { Camera, CheckCircle, Zap, Eye, Sun, Maximize2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const TIPS = [
  {
    icon: <Sun className="w-5 h-5 text-teal-400″ />,
    title: "Natural light is your best friend",
    desc: "Take photos near windows or doorways. Avoid flash — it flattens details the AI needs to analyze.",
  },
  {
    icon: <Maximize2 className="w-5 h-5 text-teal-400″ />,
    title: "Capture the full system, not just the damage",
    desc: "Step back to show the full HVAC unit, roof section, or electrical panel. Wide shots give the AI context.",
  },
  {
    icon: <Eye className="w-5 h-5 text-teal-400″ />,
    title: "Close-ups for details",
    desc: "After the wide shot, take a close-up of the issue. Labels, model numbers, and serial plates are gold.",
  },
  {
    icon: <Zap className="w-5 h-5 text-teal-400″ />,
    title: "Every room counts",
    desc: "Upload photos of HVAC, water heater, electrical panel, roof, gutters, and any visible issues. More photos = more AI detections = more leads.",
  },
];

const CATEGORIES = [
  { label: "HVAC", items: ["Unit exterior", "Filter condition", "Thermostat", "Ductwork visible areas"] },
  { label: "Roofing", items: ["Full roof section", "Shingles close-up", "Gutters", "Flashing at chimney"] },
  { label: "Electrical", items: ["Main panel", "Breaker labels", "Visible wiring", "Outlets in older homes"] },
  { label: "Plumbing", items: ["Water heater (label + age)", "Visible pipes", "Shutoff valves", "Drain areas"] },
  { label: "Exterior", items: ["Foundation visible areas", "Siding condition", "Windows", "Entryways"] },
  { label: "Interior", items: ["Ceilings for water stains", "Flooring condition", "Caulking in bathrooms", "Attic access"] },
];

export default function PhotoGuide() {
  return (
    <>
      <Helmet>
        <title>Photo Guide — ProLnk Partner Resource</title>
        <meta name="description" content="How to take job site photos that generate the most AI-detected leads. Tips for lighting, composition, and which systems to capture." />
      </Helmet>
      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-4 max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-lg">
            <Camera className="w-5 h-5″ /> Photo Guide
          </div>
          <Link href="/photo-upload">
            <button className="text-sm bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              Upload Photos →
            </button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10 space-y-10″>
          {/* Hero */}
          <div>
            <h1 className="text-3xl font-bold mb-3″>How to take job photos that generate leads</h1>
            <p className="text-slate-400 max-w-2xl leading-relaxed">
              Every photo you upload is analyzed by our AI across 65 categories. Better photos = more detections = more leads routed to your network. Here's how to maximize every upload.
            </p>
          </div>

          {/* Key tips */}
          <div>
            <h2 className="text-xl font-bold mb-5″>4 rules for high-detection photos</h2>
            <div className="grid md:grid-cols-2 gap-4″>
              {TIPS.map((tip, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0″>
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1″>{tip.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What to photograph */}
          <div>
            <h2 className="text-xl font-bold mb-2″>What to photograph on every job site</h2>
            <p className="text-slate-400 text-sm mb-5″>Check off each category. The AI detects all of these — even systems unrelated to the job you're doing.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4″>
              {CATEGORIES.map((cat, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                  <h3 className="font-bold text-teal-400 text-sm mb-3″>{cat.label}</h3>
                  <ul className="space-y-1.5″>
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-slate-300″>
                        <CheckCircle className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5″ />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-8 text-center">
            <Camera className="w-10 h-10 text-teal-400 mx-auto mb-3″ />
            <h2 className="text-xl font-bold mb-2″>Ready to start earning from your photos?</h2>
            <p className="text-slate-400 text-sm mb-5″>Upload your first job photo and see what the AI detects. Leads are generated automatically.</p>
            <Link href="/photo-upload">
              <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                Upload Your First Photo <ArrowRight className="w-4 h-4″ />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
