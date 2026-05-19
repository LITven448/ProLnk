import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  CheckSquare, Square, Home, ChefHat, Bath, Sofa, BedDouble,
  Car, Sun, TrendingUp, Star, PhoneCall, Wind, Droplets, Sparkles,
} from "lucide-react";

interface CheckItem {
  id: string;
  label: string;
  checked: boolean;
}

interface Room {
  id: string;
  name: string;
  icon: typeof Home;
  color: string;
  items: CheckItem[];
}

function makeItems(roomId: string, labels: string[]): CheckItem[] {
  return labels.map((label, i) => ({ id: `${roomId}-${i}`, label, checked: false }));
}

const INITIAL_ROOMS: Room[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    icon: ChefHat,
    color: "#F59E0B",
    items: makeItems("kitchen", [
      "Clean refrigerator coils (vacuum beneath/behind)",
      "Replace or clean range hood filter",
      "Clear dishwasher drain trap and run hot cycle",
      "Wipe cabinet tops — grease and dust buildup",
      "Descale faucets and sink drain",
      "Deep clean oven interior and broiler pan",
      "Sanitize trash can and recycling bins",
      "Clean behind and under the refrigerator",
    ]),
  },
  {
    id: "bathrooms",
    name: "Bathrooms",
    icon: Bath,
    color: "#06B6D4″,
    items: makeItems("bathrooms", [
      "Scrub tile grout with baking soda + brush",
      "Clean exhaust fan blades and housing",
      "Purge and wipe down medicine cabinet",
      "Inspect and replace caulk around tub/shower",
      "Descale shower head with vinegar soak",
      "Sanitize toilet tank interior",
    ]),
  },
  {
    id: "living",
    name: "Living Areas",
    icon: Sofa,
    color: "#8B5CF6″,
    items: makeItems("living", [
      "Wipe ceiling fan blades — both sides",
      "Vacuum and wipe baseboards throughout",
      "Clean window tracks and sill channels",
      "Remove and vacuum HVAC vent covers",
      "Wash throw pillows and couch cushion covers",
    ]),
  },
  {
    id: "bedrooms",
    name: "Bedrooms",
    icon: BedDouble,
    color: "#10B981″,
    items: makeItems("bedrooms", [
      "Vacuum and sanitize under all beds",
      "Declutter and organize closets fully",
      "Flip or rotate mattress, air out 2 hrs",
      "Launder curtains and dry-clean drapes",
    ]),
  },
  {
    id: "garage",
    name: "Garage",
    icon: Car,
    color: "#EF4444″,
    items: makeItems("garage", [
      "Apply degreaser to concrete floor and rinse",
      "Organize tools, shelving, and storage bins",
      "Inspect for pest entry points and seal gaps",
      "Lubricate garage door rollers and hinges",
      "Test and replace weather stripping at door base",
    ]),
  },
  {
    id: "exterior",
    name: "Exterior",
    icon: Sun,
    color: "#F97316″,
    items: makeItems("exterior", [
      "Pressure wash driveway, sidewalks, and siding",
      "Clean and seal deck or patio surface",
      "Wipe down and inspect outdoor furniture",
      "Wash exterior windows inside and out",
      "Clear gutters of spring debris",
    ]),
  },
];

const PRO_SERVICES = [
  { name: "Carpet Deep Clean", range: "$150–$250″, note: "High-traffic areas trap allergens", icon: Sparkles, color: "#8B5CF6" },
  { name: "Air Duct Cleaning", range: "$200–$400″, note: "Removes pollen, mold spores, dust", icon: Wind, color: "#06B6D4" },
  { name: "Pressure Washing", range: "$150–$300″, note: "Siding, driveway, roof stains", icon: Droplets, color: "#3B82F6" },
  { name: "Window Cleaning", range: "$150–$400″, note: "Interior + exterior, all stories", icon: Sun, color: "#F59E0B" },
];

function ProgressRing({ pct, size = 80, stroke = 8 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 80 ? "#10B981″ : pct >= 40 ? "#F59E0B" : "#00B5B8";
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1E3A5F" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  );
}

export default function DeepCleaningGuide() {
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);

  function toggle(roomId: string, itemId: string) {
    setRooms(prev =>
      prev.map(room =>
        room.id === roomId
          ? { ...room, items: room.items.map(it => it.id === itemId ? { ...it, checked: !it.checked } : it) }
          : room
      )
    );
  }

  const totalItems = rooms.reduce((s, r) => s + r.items.length, 0);
  const totalChecked = rooms.reduce((s, r) => s + r.items.filter(i => i.checked).length, 0);
  const overallPct = Math.round((totalChecked / totalItems) * 100);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-8 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8″>
          <div className="flex items-center gap-3 mb-2″>
            <div className="w-10 h-10 rounded-xl bg-[#00B5B8]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#00B5B8]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Deep Cleaning Guide</h1>
              <p className="text-sm text-[#94A3B8]">A clean home is a healthy home</p>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-xs text-[#10B981]">
            <Sun className="w-3.5 h-3.5″ />
            Spring Cleaning Focus — May 2026
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-[#0D2137] rounded-2xl border border-[#1E3A5F] p-6 mb-8 flex items-center gap-6″>
          <div className="relative flex-shrink-0″>
            <ProgressRing pct={overallPct} size={100} stroke={10} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">{overallPct}%</span>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold mb-1″>Overall Progress</p>
            <p className="text-[#94A3B8] text-sm">{totalChecked} of {totalItems} tasks complete across {rooms.length} rooms</p>
            {overallPct === 100 && (
              <div className="mt-2 flex items-center gap-2 text-[#10B981] text-sm font-medium">
                <Star className="w-4 h-4″ /> Spring cleaning complete!
              </div>
            )}
          </div>
          <div className="ml-auto text-right hidden sm:block">
            <p className="text-3xl font-bold text-[#00B5B8]">{totalChecked}</p>
            <p className="text-xs text-[#94A3B8]">tasks done</p>
          </div>
        </div>

        {/* DFW Tip */}
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4 mb-8 flex gap-3″>
          <Wind className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5″ />
          <p className="text-sm text-[#FCD34D]">
            <span className="font-semibold">DFW Tip:</span> Texas spring means heavy pollen. MERV-11 filters and weekly vacuuming reduce indoor pollen by 60%. Replace your filter now before peak cedar/oak season.
          </p>
        </div>

        {/* Room Checklists */}
        <div className="space-y-4 mb-10″>
          {rooms.map(room => {
            const checked = room.items.filter(i => i.checked).length;
            const pct = Math.round((checked / room.items.length) * 100);
            const Icon = room.icon;
            return (
              <div key={room.id} className="bg-[#0D2137] rounded-2xl border border-[#1E3A5F] overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4 border-b border-[#1E3A5F]/50″>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: room.color + "20″ }}>
                    <Icon className="w-5 h-5″ style={{ color: room.color }} />
                  </div>
                  <div className="flex-1″>
                    <p className="font-semibold">{room.name}</p>
                    <p className="text-xs text-[#94A3B8]">{checked}/{room.items.length} complete</p>
                  </div>
                  <div className="flex items-center gap-3″>
                    <div className="relative">
                      <ProgressRing pct={pct} size={40} stroke={4} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-bold">{pct}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-[#1E3A5F]/30″>
                  {room.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggle(room.id, item.id)}
                      className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#1E3A5F]/30 transition-colors text-left"
                    >
                      {item.checked
                        ? <CheckSquare className="w-5 h-5 flex-shrink-0″ style={{ color: room.color }} />
                        : <Square className="w-5 h-5 flex-shrink-0 text-[#4B5563]" />
                      }
                      <span className={`text-sm ${item.checked ? "line-through text-[#4B5563]" : "text-[#CBD5E1]"}`}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* When to Hire Pros */}
        <div className="mb-10″>
          <div className="flex items-center gap-2 mb-4″>
            <TrendingUp className="w-5 h-5 text-[#00B5B8]" />
            <h2 className="text-lg font-semibold">When to Hire Pros</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3″>
            {PRO_SERVICES.map(svc => {
              const Icon = svc.icon;
              return (
                <div key={svc.name} className="bg-[#0D2137] border border-[#1E3A5F] rounded-xl p-4 flex gap-3″>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0″ style={{ background: svc.color + "20" }}>
                    <Icon className="w-5 h-5″ style={{ color: svc.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{svc.name}</p>
                    <p className="text-[#00B5B8] font-bold text-sm">{svc.range}</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5″>{svc.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#00B5B8]/20 to-[#0D2137] border border-[#00B5B8]/40 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4″>
          <div className="flex-1″>
            <p className="font-semibold text-lg mb-1″>Ready to go deeper?</p>
            <p className="text-[#94A3B8] text-sm">Connect with a vetted DFW cleaning pro for the tasks you'd rather skip.</p>
          </div>
          <button className="flex items-center gap-2 bg-[#00B5B8] hover:bg-[#009EA1] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors flex-shrink-0″>
            <PhoneCall className="w-4 h-4″ />
            Book a Cleaning Pro
          </button>
        </div>

      </div>
    </HomeownerLayout>
  );
}
