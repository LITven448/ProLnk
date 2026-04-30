import { useState } from "react";
import { InfographicStyleA } from "@/components/InfographicStyleA";
import { InfographicStyleB } from "@/components/InfographicStyleB";
import { InfographicStyleC } from "@/components/InfographicStyleC";

const STYLES = [
  {
    id: "A",
    name: "Comic / Bold",
    desc: "Hand-drawn feel, thick borders, speech bubbles. High energy, very shareable on social media. Great for Instagram and Facebook ads.",
    tag: "Social-First",
    tagColor: "bg-yellow-400 text-gray-900",
  },
  {
    id: "B",
    name: "Clean / Modern",
    desc: "Professional, minimal, flowing timeline. Works well on the landing page, pitch decks, and investor materials. Timeless design.",
    tag: "Landing Page",
    tagColor: "bg-[#0A1628] text-white",
  },
  {
    id: "C",
    name: "Cinematic / Dark",
    desc: "Interactive story panels with character scenes. Dramatic, immersive, premium feel. Best for demos, presentations, and the partner portal.",
    tag: "Demo-Ready",
    tagColor: "bg-violet-600 text-white",
  },
];

export default function InfographicShowcase() {
  const [active, setActive] = useState<"A" | "B" | "C">("A");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#050d1a] px-6 py-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Infographic Style Showcase</h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">Three visual directions for the ProLnk transaction flow. Pick the one that fits the context -- or use all three in different channels.</p>
      </div>

      {/* Style selector */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id as "A" | "B" | "C")}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl border-2 transition-all text-left ${
                  active === s.id
                    ? "border-[#0A1628] bg-[#F5E642]/10 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${active === s.id ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-500"}`}>
                  {s.id}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{s.name}</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full font-semibold inline-block mt-0.5 ${s.tagColor}`}>{s.tag}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#0A1628]/10 flex items-center justify-center text-[#0A1628] font-black text-lg flex-shrink-0">
            {active}
          </div>
          <div>
            <div className="font-bold text-gray-900 mb-1">Style {active}: {STYLES.find(s => s.id === active)?.name}</div>
            <p className="text-gray-600 text-sm">{STYLES.find(s => s.id === active)?.desc}</p>
          </div>
        </div>
      </div>

      {/* Infographic display */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {active === "A" && <InfographicStyleA />}
        {active === "B" && <InfographicStyleB />}
        {active === "C" && <InfographicStyleC />}
      </div>

      {/* All three side by side (small) */}
      <div className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">All Three at a Glance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id as "A" | "B" | "C")}
                className={`text-left rounded-2xl border-2 p-4 transition-all hover:shadow-md ${
                  active === s.id ? "border-[#0A1628] shadow-md" : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${active === s.id ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-500"}`}>
                    {s.id}
                  </div>
                  <span className="font-bold text-gray-900 text-sm">{s.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ml-auto ${s.tagColor}`}>{s.tag}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                <div className="mt-3 text-[#0A1628] text-xs font-semibold">
                  {active === s.id ? "Currently viewing " : "Click to preview "}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
