import { useState } from "react";
import {
  Camera, TrendingUp, Star, Zap, ChevronRight, CheckCircle, X, BookOpen,
} from "lucide-react";

const STATS = [
  { label: "Photos Uploaded", value: "847″ },
  { label: "Opportunities Detected", value: "134″ },
  { label: "Detection Rate", value: "15.8%" },
];

const CATEGORIES = [
  { name: "HVAC Units", tip: "Show the full unit, condenser coil, and any visible wear. Photograph the age label sticker — AI reads it." },
  { name: "Roofing", tip: "Get close to shingle edges, gutters, and flashing. Post-storm photos are the highest-value uploads." },
  { name: "Foundation", tip: "Horizontal shots showing the full perimeter. Note any cracks or soil separation." },
  { name: "Electrical Panel", tip: "Open the panel door and photograph clearly — AI reads brand, age, and capacity." },
  { name: "Plumbing", tip: "Photograph under sinks, water heater connections, and visible pipe runs." },
  { name: "Windows & Doors", tip: "Show seal condition, weatherstripping, and any gaps at frames." },
  { name: "Attic", tip: "Capture insulation depth, ventilation, and any moisture staining." },
  { name: "Exterior", tip: "Full shots from each corner — siding condition, trim, paint, and drainage." },
];

const DOS_DONTS = [
  { do: true, text: "Shoot in landscape orientation for best AI analysis" },
  { do: true, text: "Ensure good lighting — avoid shooting into bright windows" },
  { do: true, text: "Take before AND after shots for maximum opportunity detection" },
  { do: true, text: "Upload within 24 hours of completing the job" },
  { do: false, text: "Don't use blurry or heavily cropped photos" },
  { do: false, text: "Don't upload photos with homeowner faces visible" },
];

export default function PhotoTipsGuide() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#0A1628″, color: "#F0F4FF" }}>
      <div className="max-w-2xl mx-auto p-4 pb-10 space-y-6″>

        <div className="pt-4″>
          <h1 className="text-2xl font-bold flex items-center gap-2″>
            <Camera className="w-6 h-6 text-teal-400″ />
            Photo Tips
          </h1>
          <p className="text-slate-400 text-sm mt-1″>Every photo is a lead opportunity — maximize detection</p>
        </div>

        <div className="grid grid-cols-3 gap-3″>
          {STATS.map(s => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "#152035″, border: "1px solid #1E2E45" }}>
              <p className="text-xl font-bold text-teal-400″>{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5″>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-4″ style={{ background: "#152035", border: "1px solid #2DD4BF40" }}>
          <div className="flex items-start gap-3″>
            <Zap className="w-5 h-5 text-teal-400 mt-0.5 shrink-0″ />
            <div>
              <p className="font-semibold text-teal-300″>3x more leads</p>
              <p className="text-sm text-slate-300 mt-1″>Photos with clear angles, good lighting, and multiple shots generate 3x more AI-detected opportunities than single blurry shots.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3 text-white flex items-center gap-2″>
            <BookOpen className="w-4 h-4 text-teal-400″ />
            What to photograph
          </h2>
          <div className="space-y-2″>
            {CATEGORIES.map((cat, i) => (
              <div key={cat.name} className="rounded-xl overflow-hidden" style={{ background: "#152035″, border: "1px solid #1E2E45" }}>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center justify-between p-3 text-left"
                >
                  <span className="text-sm font-medium text-white">{cat.name}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expanded === i ? "rotate-90" : ""}`} />
                </button>
                {expanded === i && (
                  <div className="px-3 pb-3″>
                    <p className="text-sm text-slate-300″>{cat.tip}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-3 text-white flex items-center gap-2″>
            <Star className="w-4 h-4 text-teal-400″ />
            Best practices
          </h2>
          <div className="space-y-2″>
            {DOS_DONTS.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "#152035″, border: "1px solid #1E2E45" }}>
                {item.do
                  ? <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 shrink-0″ />
                  : <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0″ />
                }
                <p className="text-sm text-slate-300″>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0D9488, #0F172A)", border: "1px solid #2DD4BF40″ }}>
          <TrendingUp className="w-8 h-8 text-teal-300 mx-auto mb-2″ />
          <p className="font-semibold text-white">Upload your job photos now</p>
          <p className="text-sm text-teal-200 mt-1″>Every photo you upload could generate 1-3 new leads</p>
        </div>

      </div>
    </div>
  );
}
