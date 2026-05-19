import { useState } from "react";
import HomeownerLayout from "../../layouts/HomeownerLayout";
import { CheckCircle, Circle, AlertTriangle, Phone, Zap } from "lucide-react";

type CheckItem = { id: string; label: string; checked: boolean };

const initialCategories: { title: string; items: CheckItem[] }[] = [
  {
    title: "Before Storm Season (March)",
    items: [
      { id: "roof", label: "Roof inspection completed", checked: true },
      { id: "gutters", label: "Gutters cleaned and secured", checked: true },
      { id: "trees", label: "Tree limbs trimmed within 10ft of house", checked: true },
      { id: "hvac", label: "HVAC unit secured/inspected", checked: true },
      { id: "furniture", label: "Outdoor furniture stored or secured", checked: false },
      { id: "insurance", label: "Insurance policy reviewed", checked: false },
    ],
  },
  {
    title: "Emergency Kit",
    items: [
      { id: "water", label: "72-hour water supply (1 gal/person/day)", checked: false },
      { id: "flashlights", label: "Flashlights + batteries", checked: true },
      { id: "firstaid", label: "First aid kit", checked: true },
      { id: "radio", label: "Battery-powered weather radio", checked: false },
      { id: "docs", label: "Important docs in waterproof bag", checked: false },
      { id: "cash", label: "Cash ($200+)", checked: false },
    ],
  },
  {
    title: "Home Systems",
    items: [
      { id: "shutoff", label: "Water main shutoff location known", checked: true },
      { id: "generator", label: "Generator tested and fueled", checked: false },
      { id: "sump", label: "Sump pump tested", checked: false },
      { id: "surge", label: "Surge protectors on electronics", checked: true },
    ],
  },
];

const afterItems = [
  "Document all damage with photos BEFORE cleanup",
  "Call insurance within 24 hours",
  "Don't sign contractor agreements at the door",
  "Get 3 estimates before approving repairs",
];

export default function StormPrepChecklist() {
  const [categories, setCategories] = useState(initialCategories);

  const toggle = (catIdx: number, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat, ci) =>
        ci !== catIdx
          ? cat
          : {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
      )
    );
  };

  const allItems = categories.flatMap((c) => c.items);
  const checkedCount = allItems.filter((i) => i.checked).length;
  const total = allItems.length;
  const pct = Math.round((checkedCount / total) * 100);
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (pct / 100) * circumference;

  const scoreColor = pct >= 80 ? "#14B8A6″ : pct >= 50 ? "#F59E0B" : "#EF4444";

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="max-w-4xl mx-auto px-4 py-12″>
          <div className="mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6″>
            <div>
              <h1 className="text-4xl font-bold mb-2″>DFW Storm Prep Checklist</h1>
              <p className="text-[#94A3B8] text-lg">Be ready before the sirens</p>
              <div className="mt-4 bg-[#1E293B] rounded-xl p-4 max-w-lg">
                <p className="text-sm text-[#CBD5E1]">
                  DFW storm season peaks <span className="text-[#14B8A6] font-semibold">April–June</span>. Tornadoes, hail, and flash floods are routine. This checklist could save you{" "}
                  <span className="text-white font-semibold">$20,000+ in preventable damage.</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center bg-[#1E293B] rounded-2xl p-6 min-w-[140px]">
              <svg width="100″ height="100" viewBox="0 0 100 100">
                <circle cx="50″ cy="50" r="40" fill="none" stroke="#1E3A5F" strokeWidth="10" />
                <circle
                  cx="50″
                  cy="50″
                  r="40″
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth="10″
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dashoffset 0.4s ease" }}
                />
                <text x="50″ y="56" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                  {pct}%
                </text>
              </svg>
              <p className="text-xs text-[#94A3B8] mt-2 text-center">
                Readiness<br />
                {checkedCount}/{total} complete
              </p>
            </div>
          </div>

          <div className="space-y-8″>
            {categories.map((cat, ci) => (
              <div key={cat.title} className="bg-[#1E293B] rounded-2xl p-6″>
                <h2 className="text-lg font-semibold mb-4 text-[#14B8A6]">{cat.title}</h2>
                <ul className="space-y-3″>
                  {cat.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => toggle(ci, item.id)}
                    >
                      {item.checked ? (
                        <CheckCircle className="w-5 h-5 text-[#14B8A6] flex-shrink-0″ />
                      ) : (
                        <Circle className="w-5 h-5 text-[#475569] flex-shrink-0 group-hover:text-[#94A3B8]" />
                      )}
                      <span className={item.checked ? "text-white" : "text-[#94A3B8]"}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-[#1E293B] rounded-2xl p-6″>
              <h2 className="text-lg font-semibold mb-4 text-[#14B8A6]">After a Storm</h2>
              <ul className="space-y-3″>
                {afterItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3″>
                    <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5″ />
                    <span className="text-[#CBD5E1]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#1E293B] rounded-2xl p-6″>
              <h2 className="text-lg font-semibold mb-4 text-[#14B8A6]">Emergency Contacts</h2>
              <div className="space-y-3″>
                {[
                  { label: "Gas — Atmos Energy", number: "800-460-3030″ },
                  { label: "Electric — Oncor", number: "888-313-4747″ },
                  { label: "Insurance Agent", number: "Your agent" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center justify-between bg-[#0A1628] rounded-lg px-4 py-3″>
                    <div className="flex items-center gap-2″>
                      <Phone className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-sm text-[#CBD5E1]">{c.label}</span>
                    </div>
                    <span className="text-sm font-mono text-white">{c.number}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full flex items-center justify-center gap-2 bg-[#14B8A6] hover:bg-[#0D9488] text-white font-semibold py-3 rounded-xl transition-colors">
                <Zap className="w-5 h-5″ />
                Find Emergency Pros
              </button>
            </div>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
