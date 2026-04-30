// Style C: Cinematic Dark -- Story panels like a graphic novel, dark background, dramatic lighting

import { useState } from "react";

const SCENES = [
  {
    id: 1,
    label: "Scene 01",
    title: "Referring Pro Finishes the Job",
    trade: "Lawn Care  Pest Control  Pool Service  Any trade",
    description: "Marcus wraps up a lawn mowing job at a Frisco home. He opens the ProLnk Field OS and snaps 2 quick photos -- front yard before, front yard after. 60 seconds. Done.",
    detail: "The photos are uploaded automatically. Marcus doesn't know it yet, but his camera just found him $150.",
    icon: "",
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.15)",
    character: "REFERRING PRO",
    characterSub: "Lawn Care  HVAC  Any Trade",
    svgChar: (
      <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
        {/* Ground shadow */}
        <ellipse cx="60" cy="145" rx="35" ry="6" fill="rgba(0,0,0,0.3)"/>
        {/* Body */}
        <rect x="38" y="72" width="44" height="55" rx="10" fill="#065f46"/>
        {/* Vest */}
        <rect x="42" y="72" width="36" height="55" rx="8" fill="#047857"/>
        {/* Head */}
        <circle cx="60" cy="52" r="26" fill="#fbbf24"/>
        {/* Hat */}
        <ellipse cx="60" cy="30" rx="30" ry="9" fill="#14532d"/>
        <rect x="30" y="27" width="60" height="8" rx="4" fill="#166534"/>
        {/* Eyes */}
        <circle cx="52" cy="52" r="3.5" fill="#1f2937"/>
        <circle cx="68" cy="52" r="3.5" fill="#1f2937"/>
        <circle cx="53" cy="51" r="1" fill="white"/>
        <circle cx="69" cy="51" r="1" fill="white"/>
        {/* Smile */}
        <path d="M52 62 Q60 69 68 62" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Left arm */}
        <rect x="16" y="75" width="24" height="12" rx="6" fill="#065f46"/>
        {/* Right arm holding phone */}
        <rect x="80" y="72" width="24" height="12" rx="6" fill="#065f46"/>
        {/* Phone */}
        <rect x="86" y="62" width="16" height="26" rx="4" fill="#111827"/>
        <rect x="88" y="65" width="12" height="18" rx="2" fill="#10b981"/>
        <circle cx="94" cy="84" r="2" fill="#111827"/>
        {/* Legs */}
        <rect x="40" y="120" width="16" height="24" rx="6" fill="#14532d"/>
        <rect x="64" y="120" width="16" height="24" rx="6" fill="#14532d"/>
        {/* Boots */}
        <rect x="38" y="138" width="20" height="10" rx="4" fill="#111827"/>
        <rect x="62" y="138" width="20" height="10" rx="4" fill="#111827"/>
      </svg>
    ),
  },
  {
    id: 2,
    label: "Scene 02",
    title: "The AI Goes to Work",
    trade: "Computer Vision  50+ Detection Categories  <3 Seconds",
    description: "ProLnk's AI analyzes both photos simultaneously. It spots an unpainted fence along the property line, drainage pooling near the foundation, and overgrown shrubs blocking the AC unit.",
    detail: "Three separate referral opportunities generated from two photos. The AI flags the fence as the highest-value opportunity: estimated job value $1,800-$2,800.",
    icon: "[BOT]",
    accentColor: "#0d9488",
    glowColor: "rgba(13,148,136,0.15)",
    character: "ProLnk AI",
    characterSub: "Opportunity Engine  Patent Pending",
    svgChar: (
      <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
        <ellipse cx="60" cy="145" rx="35" ry="6" fill="rgba(0,0,0,0.3)"/>
        {/* Body */}
        <rect x="30" y="75" width="60" height="60" rx="12" fill="#134e4a"/>
        {/* Chest panel */}
        <rect x="38" y="83" width="44" height="30" rx="6" fill="#0f766e"/>
        {/* Scanning lines */}
        <rect x="42" y="88" width="36" height="3" rx="1.5" fill="#2dd4bf"/>
        <rect x="42" y="94" width="28" height="3" rx="1.5" fill="#2dd4bf"/>
        <rect x="42" y="100" width="32" height="3" rx="1.5" fill="#2dd4bf"/>
        {/* Head */}
        <rect x="25" y="28" width="70" height="52" rx="14" fill="#0f766e"/>
        {/* Eye screens */}
        <rect x="30" y="36" width="24" height="18" rx="6" fill="#134e4a"/>
        <rect x="66" y="36" width="24" height="18" rx="6" fill="#134e4a"/>
        {/* Scanning eyes */}
        <rect x="33" y="40" width="18" height="3" rx="1.5" fill="#2dd4bf"/>
        <rect x="33" y="46" width="12" height="3" rx="1.5" fill="#2dd4bf"/>
        <rect x="69" y="40" width="18" height="3" rx="1.5" fill="#2dd4bf"/>
        <rect x="69" y="46" width="12" height="3" rx="1.5" fill="#2dd4bf"/>
        {/* Mouth */}
        <rect x="35" y="62" width="50" height="10" rx="5" fill="#134e4a"/>
        <rect x="39" y="64" width="6" height="6" rx="2" fill="#2dd4bf"/>
        <rect x="49" y="64" width="6" height="6" rx="2" fill="#2dd4bf"/>
        <rect x="59" y="64" width="6" height="6" rx="2" fill="#2dd4bf"/>
        <rect x="69" y="64" width="6" height="6" rx="2" fill="#2dd4bf"/>
        {/* Antenna */}
        <rect x="55" y="14" width="10" height="18" rx="5" fill="#0d9488"/>
        <circle cx="60" cy="12" r="8" fill="#2dd4bf"/>
        <circle cx="60" cy="12" r="4" fill="#0d9488"/>
        {/* Arms */}
        <rect x="8" y="80" width="24" height="12" rx="6" fill="#0f766e"/>
        <rect x="88" y="80" width="24" height="12" rx="6" fill="#0f766e"/>
        {/* Legs */}
        <rect x="38" y="128" width="16" height="18" rx="6" fill="#134e4a"/>
        <rect x="66" y="128" width="16" height="18" rx="6" fill="#134e4a"/>
        <rect x="36" y="140" width="20" height="8" rx="4" fill="#0f766e"/>
        <rect x="64" y="140" width="20" height="8" rx="4" fill="#0f766e"/>
      </svg>
    ),
  },
  {
    id: 3,
    label: "Scene 03",
    title: "The Homeowner Gets the Deal",
    trade: "SMS  Email  In-App  Delivered Within 2 Hours",
    description: "Sarah gets a text: her lawn looks great -- here are the before & after photos. And by the way, her fence could use staining -- here's a 12% discount from a vetted local pro, valid for 48 hours.",
    detail: "Sarah didn't ask for this. But the timing is perfect -- she was already thinking about the fence. She clicks 'Claim This Deal' in 4 minutes.",
    icon: "[PHONE]",
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.15)",
    character: "THE HOMEOWNER",
    characterSub: "Sarah  Frisco, TX",
    svgChar: (
      <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
        <ellipse cx="60" cy="145" rx="35" ry="6" fill="rgba(0,0,0,0.3)"/>
        {/* Body */}
        <rect x="36" y="72" width="48" height="58" rx="12" fill="#b45309"/>
        {/* Shirt detail */}
        <rect x="40" y="72" width="40" height="58" rx="10" fill="#d97706"/>
        {/* Head */}
        <circle cx="60" cy="50" r="28" fill="#fcd34d"/>
        {/* Hair */}
        <path d="M32 42 Q60 16 88 42 Q88 28 60 22 Q32 28 32 42Z" fill="#92400e"/>
        {/* Eyes - happy squint */}
        <path d="M48 50 Q52 46 56 50" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M64 50 Q68 46 72 50" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Big smile */}
        <path d="M48 62 Q60 74 72 62" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        {/* Teeth */}
        <path d="M52 63 Q60 70 68 63" fill="white"/>
        {/* Arms */}
        <rect x="14" y="76" width="24" height="12" rx="6" fill="#b45309"/>
        <rect x="82" y="72" width="24" height="12" rx="6" fill="#b45309"/>
        {/* Phone in right hand */}
        <rect x="88" y="60" width="18" height="30" rx="4" fill="#111827"/>
        <rect x="90" y="63" width="14" height="22" rx="2" fill="#f59e0b"/>
        <circle cx="97" cy="87" r="2" fill="#111827"/>
        {/* Legs */}
        <rect x="40" y="122" width="16" height="22" rx="6" fill="#92400e"/>
        <rect x="64" y="122" width="16" height="22" rx="6" fill="#92400e"/>
        <rect x="38" y="136" width="20" height="10" rx="4" fill="#111827"/>
        <rect x="62" y="136" width="20" height="10" rx="4" fill="#111827"/>
      </svg>
    ),
  },
  {
    id: 4,
    label: "Scene 04",
    title: "Receiving Pro Wins the Job",
    trade: "Fence  HVAC  Plumbing  Electrical  Roofing  Any Trade",
    description: "Rodriguez Fence Co. gets a ProLnk lead notification: qualified homeowner, pre-approved interest, job address, estimated value $2,200-$2,800. They call Sarah within the hour. Job closed.",
    detail: "Rodriguez pays $275 -- the 11% referral fee on the $2,500 job. That's cheaper than a single Angi lead. Marcus gets $150. ProLnk keeps $125. Sarah saves $300 on the job.",
    icon: "[AWARD]",
    accentColor: "#7c3aed",
    glowColor: "rgba(124,58,237,0.15)",
    character: "RECEIVING PRO",
    characterSub: "Fence  HVAC  Plumbing  Any Trade",
    svgChar: (
      <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
        <ellipse cx="60" cy="145" rx="35" ry="6" fill="rgba(0,0,0,0.3)"/>
        {/* Body */}
        <rect x="36" y="72" width="48" height="58" rx="12" fill="#4c1d95"/>
        {/* Vest */}
        <rect x="40" y="72" width="40" height="58" rx="10" fill="#5b21b6"/>
        {/* Head */}
        <circle cx="60" cy="50" r="28" fill="#fbbf24"/>
        {/* Hard hat */}
        <ellipse cx="60" cy="28" rx="32" ry="10" fill="#6d28d9"/>
        <rect x="28" y="26" width="64" height="8" rx="4" fill="#7c3aed"/>
        {/* Eyes - confident */}
        <circle cx="52" cy="50" r="3.5" fill="#1f2937"/>
        <circle cx="68" cy="50" r="3.5" fill="#1f2937"/>
        <circle cx="53" cy="49" r="1" fill="white"/>
        <circle cx="69" cy="49" r="1" fill="white"/>
        {/* Determined brows */}
        <path d="M48 42 L56 45" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M64 45 L72 42" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Confident smile */}
        <path d="M52 62 Q60 70 68 62" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        {/* Arms */}
        <rect x="12" y="76" width="26" height="12" rx="6" fill="#4c1d95"/>
        <rect x="82" y="76" width="26" height="12" rx="6" fill="#4c1d95"/>
        {/* Tool in left hand */}
        <rect x="8" y="66" width="8" height="32" rx="4" fill="#92400e"/>
        {/* Trophy / checkmark in right */}
        <circle cx="100" cy="76" r="10" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2"/>
        <path d="M95 76 L99 80 L106 70" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Legs */}
        <rect x="40" y="122" width="16" height="22" rx="6" fill="#3b0764"/>
        <rect x="64" y="122" width="16" height="22" rx="6" fill="#3b0764"/>
        <rect x="38" y="136" width="20" height="10" rx="4" fill="#111827"/>
        <rect x="62" y="136" width="20" height="10" rx="4" fill="#111827"/>
      </svg>
    ),
  },
];

export function InfographicStyleC() {
  const [activeScene, setActiveScene] = useState(0);
  const scene = SCENES[activeScene];

  return (
    <div className="w-full rounded-3xl overflow-hidden" style={{ background: "#050d1a", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Film strip header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
        <div className="flex gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full" style={{ background: i === 0 ? "#ef4444" : i === 1 ? "#f59e0b" : i === 2 ? "#22c55e" : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
        <span className="text-white/40 text-xs font-mono tracking-widest uppercase">ProLnk  Transaction Story  Patent Pending</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-[#0A1628]/70 text-xs font-mono">LIVE</span>
        </div>
      </div>

      {/* Scene selector tabs */}
      <div className="flex border-b border-white/10">
        {SCENES.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveScene(i)}
            className="flex-1 py-3 text-xs font-mono transition-all"
            style={{
              color: activeScene === i ? s.accentColor : "rgba(255,255,255,0.3)",
              borderBottom: activeScene === i ? `2px solid ${s.accentColor}` : "2px solid transparent",
              background: activeScene === i ? s.glowColor : "transparent",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Active scene */}
      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Character */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              {/* Glow backdrop */}
              <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: scene.glowColor, transform: "scale(1.5)" }} />
              <div className="relative">
                {scene.svgChar}
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-2" style={{ background: scene.glowColor, border: `1px solid ${scene.accentColor}40` }}>
              <span className="text-xs font-black tracking-widest" style={{ color: scene.accentColor }}>{scene.character}</span>
            </div>
            <p className="text-white/40 text-xs">{scene.characterSub}</p>
          </div>

          {/* Right: Story */}
          <div>
            <div className="text-xs font-mono mb-2" style={{ color: scene.accentColor }}>{scene.label}  {scene.trade}</div>
            <h3 className="text-2xl font-bold text-white mb-4">{scene.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">{scene.description}</p>
            <div className="rounded-xl p-4" style={{ background: scene.glowColor, border: `1px solid ${scene.accentColor}30` }}>
              <p className="text-xs leading-relaxed" style={{ color: scene.accentColor }}>{scene.detail}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Commission breakdown footer */}
      <div className="px-6 pb-6">
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="text-center text-white/30 text-xs font-mono mb-4 tracking-widest uppercase">Commission Breakdown  $2,500 Fence Job</div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Referring Pro earns", value: "$150", color: "#10b981" },
              { label: "ProLnk keeps", value: "$125", color: "#0d9488" },
              { label: "Receiving Pro pays", value: "$275 total", color: "#7c3aed" },
              { label: "Receiving Pro nets", value: "$2,225", color: "#f59e0b" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl px-4 py-2.5" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${item.color}30` }}>
                <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                <span className="text-white/50 text-xs">{item.label}</span>
                <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
