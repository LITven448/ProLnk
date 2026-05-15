import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp, Wrench, Droplets, Star } from "lucide-react";

const maintenanceItems = [
  { label: "Grout sealed within 2 years", status: "fail" },
  { label: "No cracked or missing grout", status: "warn" },
  { label: "Caulk at tile-to-wall transitions", status: "pass" },
  { label: "No staining or discoloration", status: "warn" },
  { label: "Grout color consistent", status: "pass" },
  { label: "No loose tiles", status: "pass" },
];

const diyRepairs = [
  {
    title: "Grout resealing",
    difficulty: "Easiest",
    cost: "$25 materials",
    desc: "Apply grout sealer with a brush or roller applicator. Let dry 24 hours before exposure to water.",
    color: "text-green-400",
  },
  {
    title: "Grout color refresh",
    difficulty: "Easy",
    cost: "$50–100",
    desc: "Use grout colorant or paint to restore original color. Clean thoroughly first. Works on any sanded grout.",
    color: "text-green-400",
  },
  {
    title: "Replace cracked grout",
    difficulty: "Moderate",
    cost: "$75–200",
    desc: "Use a grout saw or oscillating tool to remove old grout. Regrout with matching color and seal after 72 hours.",
    color: "text-yellow-400",
  },
  {
    title: "Replace cracked tile",
    difficulty: "Pro recommended",
    cost: "$150–400",
    desc: "Requires breaking out old tile without damaging adjacent ones. Matching tile can be tricky — keep spares from original install.",
    color: "text-orange-400",
  },
];

const cleaningTips = [
  { tip: "Never use vinegar on grout", detail: "Vinegar etches grout and causes long-term degradation. Avoid all acidic cleaners." },
  { tip: "Use pH-neutral cleaner", detail: "Tile-specific pH-neutral cleaners are safest for both tile and grout on every surface." },
  { tip: "Steam cleaning for deep clean", detail: "Steam loosens embedded dirt without chemicals. Ideal for periodic deep cleans every 3–6 months." },
  { tip: "Avoid bleach on colored grout", detail: "Bleach strips colorant from pigmented grout. Use oxygen-based cleaner instead for stain removal." },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "pass") return <CheckCircle className="w-5 h-5 text-green-400" />;
  if (status === "warn") return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
  return <XCircle className="w-5 h-5 text-red-400" />;
}

export default function TileGroutGuide() {
  const [openClean, setOpenClean] = useState<number | null>(null);

  const passCount = maintenanceItems.filter((i) => i.status === "pass").length;
  const warnCount = maintenanceItems.filter((i) => i.status === "warn").length;
  const failCount = maintenanceItems.filter((i) => i.status === "fail").length;

  return (
    <HomeownerLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Tile & Grout Guide</h1>
          <p className="text-gray-400 mt-1">Keep it clean, sealed, and beautiful</p>
        </div>

        {/* Your tile card */}
        <div className="bg-[#0F1E35] border border-[#1E3A5F] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-white font-semibold text-lg">Your Tile</h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Ceramic tile (kitchen / bath / entryway), installed <span className="text-white font-medium">2015</span> — 10 years old.{" "}
            <span className="text-yellow-400 font-medium">Grout re-sealing overdue.</span>
          </p>
        </div>

        {/* DFW context */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
          <h3 className="text-blue-300 font-semibold mb-2">DFW Foundation Movement</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            DFW foundation movement cracks grout lines more than most US cities. Re-grouting every{" "}
            <span className="text-white font-medium">5–7 years</span> is typical here. Use{" "}
            <span className="text-white font-medium">flexible grout near transitions</span> (where tile meets wall,
            tub, or cabinet) to absorb seasonal movement.
          </p>
        </div>

        {/* Maintenance checklist */}
        <div className="bg-[#0F1E35] border border-[#1E3A5F] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-lg">Maintenance Checklist</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-green-400">{passCount} ✓</span>
              <span className="text-yellow-400">{warnCount} ⚠</span>
              <span className="text-red-400">{failCount} ✗</span>
            </div>
          </div>
          <div className="space-y-3">
            {maintenanceItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2 border-b border-[#1E3A5F] last:border-0"
              >
                <span className="text-gray-300 text-sm">{item.label}</span>
                <StatusIcon status={item.status} />
              </div>
            ))}
          </div>
        </div>

        {/* DIY repair guide */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">DIY Repair Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {diyRepairs.map((r) => (
              <div key={r.title} className="bg-[#0F1E35] border border-[#1E3A5F] rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-medium">{r.title}</h3>
                  <span className={`text-xs font-semibold ${r.color}`}>{r.difficulty}</span>
                </div>
                <p className="text-teal-400 text-xs font-medium mb-2">{r.cost}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cleaning guide */}
        <div className="bg-[#0F1E35] border border-[#1E3A5F] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <Droplets className="w-5 h-5 text-teal-400" />
            <h2 className="text-white font-semibold text-lg">Cleaning Best Practices</h2>
          </div>
          <div className="space-y-2">
            {cleaningTips.map((item, i) => (
              <div key={item.tip} className="border border-[#1E3A5F] rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#1E3A5F]/30 transition-colors"
                  onClick={() => setOpenClean(openClean === i ? null : i)}
                >
                  <span className="text-white text-sm font-medium">{item.tip}</span>
                  {openClean === i ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>
                {openClean === i && (
                  <div className="px-4 pb-3">
                    <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-600/20 to-blue-600/20 border border-teal-500/30 rounded-xl p-6 text-center">
          <Wrench className="w-8 h-8 text-teal-400 mx-auto mb-3" />
          <h3 className="text-white font-semibold text-lg mb-2">Need a Tile Professional?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get matched with vetted tile and grout specialists in the DFW area.
          </p>
          <button className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Find a Tile Pro
          </button>
        </div>
      </div>
    </HomeownerLayout>
  );
}
