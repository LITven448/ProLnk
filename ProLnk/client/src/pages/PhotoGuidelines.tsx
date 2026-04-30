import { useState } from "react";
import { Camera, CheckCircle, XCircle, Info, ChevronDown, ChevronUp, Home, Leaf, Bug, Wind, Droplets, Zap, Wrench, PaintBucket, Shield } from "lucide-react";

// --- Universal rules -----------------------------------------------------------
const UNIVERSAL_DO = [
  "Take photos in natural daylight -- open blinds and turn on overhead lights",
  "Capture the full space in one frame before zooming in on details",
  "Take a BEFORE photo before starting any work, and an AFTER photo when complete",
  "Photograph from a clean, unobstructed angle -- move equipment and debris out of frame",
  "Hold the phone horizontal (landscape) for exterior shots; vertical (portrait) is fine for tight interior spaces",
  "Capture the full roof line on exterior shots -- stand far enough back",
  "Document any existing damage or wear before touching it -- this protects you legally",
  "Take a 'clean site' photo at the end of every job showing the area left tidy",
];

const UNIVERSAL_DONT = [
  "Do not photograph people -- homeowners, children, or your own crew",
  "Do not intentionally photograph pets (incidental appearances in a yard photo are fine)",
  "Do not photograph personal items -- mail, medication, valuables, or family photos",
  "Do not photograph areas unrelated to your trade (an HVAC tech should not photograph the kitchen)",
  "Do not use flash indoors if it creates harsh shadows -- use available light",
  "Do not submit blurry, dark, or partially cropped photos -- retake if needed",
  "Do not photograph from inside a vehicle or through a dirty windshield",
];

// --- Trade-specific rules ------------------------------------------------------
const TRADES = [
  {
    id: "lawn",
    name: "Lawn Care & Landscaping",
    icon: Leaf,
    color: "#22C55E",
    bg: "#22C55E15",
    border: "#22C55E30",
    photograph: [
      "Full front yard from the street -- capture the entire lawn and bed lines",
      "Full back yard from the rear of the property",
      "Close-up of any bare patches, disease, or pest damage in the turf",
      "Bed edges before and after edging",
      "Any hardscape elements (walkways, borders, retaining walls) that are part of the job",
      "Irrigation heads or drip lines if serviced",
    ],
    avoid: [
      "Do not photograph the home's interior through windows",
      "Do not photograph the driveway or street unless it is part of the scope",
      "Do not photograph the roof or gutters -- those belong to other trades",
    ],
    aiSignals: "Turf color, bare patches, overgrown beds, and hardscape condition generate referral signals for pest control, irrigation, and fence repair.",
  },
  {
    id: "pest",
    name: "Pest Control",
    icon: Bug,
    color: "#F59E0B",
    bg: "#F59E0B15",
    border: "#F59E0B30",
    photograph: [
      "Exterior perimeter of the home at foundation level -- all four sides",
      "Any visible entry points: gaps in siding, cracks in foundation, open vents",
      "Evidence of infestation: droppings, nests, mud tubes, or damage",
      "Treated areas after application (show the work was done)",
      "Attic access hatch if attic was treated",
      "Crawl space entry if applicable",
    ],
    avoid: [
      "Do not photograph inside living spaces unless the treatment was interior",
      "Do not photograph personal belongings or food storage areas",
      "Do not photograph the yard unless pest activity was found there",
    ],
    aiSignals: "Foundation cracks, wood damage, and moisture staining generate referral signals for foundation repair, waterproofing, and HVAC.",
  },
  {
    id: "hvac",
    name: "HVAC",
    icon: Wind,
    color: "#3B82F6",
    bg: "#3B82F615",
    border: "#3B82F630",
    photograph: [
      "Outdoor condenser unit -- full unit, all four sides",
      "Indoor air handler or furnace -- full unit with serial/model tag visible",
      "Thermostat before and after any adjustment",
      "Filter slot before and after filter replacement",
      "Ductwork connections at the air handler if accessed",
      "Condensate drain pan and line if inspected or cleared",
      "Any refrigerant line insulation showing wear or damage",
    ],
    avoid: [
      "Do not photograph the kitchen, bathrooms, or bedrooms",
      "Do not photograph the electrical panel unless it is directly related to the HVAC circuit",
      "Do not photograph the roof unless it is a rooftop unit",
    ],
    aiSignals: "Unit age (visible on serial tag), rust, refrigerant line wear, and duct condition generate referral signals for insulation, electrical, and plumbing.",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: Droplets,
    color: "#06B6D4",
    bg: "#06B6D415",
    border: "#06B6D430",
    photograph: [
      "Water heater -- full unit with serial/model tag visible",
      "Under-sink cabinet before and after any repair",
      "Toilet base and supply line if serviced",
      "Any visible water staining or damage on walls, floors, or ceilings",
      "Shut-off valves before and after replacement",
      "Sewer cleanout access point if used",
      "Hose bibs and exterior spigots if inspected",
    ],
    avoid: [
      "Do not photograph inside medicine cabinets or vanity drawers",
      "Do not photograph personal hygiene items",
      "Do not photograph the kitchen unless the job was in the kitchen",
    ],
    aiSignals: "Water heater age, supply line condition, and water staining generate referral signals for HVAC, mold remediation, and flooring.",
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: Zap,
    color: "#EAB308",
    bg: "#EAB30815",
    border: "#EAB30830",
    photograph: [
      "Electrical panel -- full panel with cover off, showing breaker labels",
      "Any outlets, switches, or fixtures that were replaced -- before and after",
      "Exterior meter base and weatherhead if inspected",
      "Any visible wire damage, scorching, or improper wiring discovered",
      "Smoke and CO detector locations if installed or tested",
    ],
    avoid: [
      "Do not photograph inside walls unless actively working in an open wall",
      "Do not photograph the homeowner's personal items near the panel",
      "Do not photograph areas of the home unrelated to the electrical scope",
    ],
    aiSignals: "Panel age, double-tapped breakers, and outdated wiring generate referral signals for whole-home rewiring, EV charger installation, and solar.",
  },
  {
    id: "roofing",
    name: "Roofing",
    icon: Home,
    color: "#8B5CF6",
    bg: "#8B5CF615",
    border: "#8B5CF630",
    photograph: [
      "Full aerial or elevated view of the entire roof surface",
      "Close-up of any damaged, missing, or lifted shingles",
      "Flashing at all penetrations: chimney, vents, skylights, valleys",
      "Gutters and fascia from the roofline",
      "Attic decking if visible during inspection",
      "Downspout discharge points at grade",
    ],
    avoid: [
      "Do not photograph inside the home through skylights or attic hatches",
      "Do not photograph neighbors' roofs or properties",
      "Do not photograph HVAC equipment on the roof unless it is part of the scope",
    ],
    aiSignals: "Shingle age, granule loss, flashing condition, and gutter debris generate referral signals for gutter cleaning, attic insulation, and pest control.",
  },
  {
    id: "cabinets",
    name: "Cabinets & Millwork",
    icon: Wrench,
    color: "#D97706",
    bg: "#D9770615",
    border: "#D9770630",
    photograph: [
      "Full kitchen -- stand in the doorway and capture the entire room",
      "Full bathroom vanity -- capture the full wall of cabinetry",
      "Close-up of any damaged doors, hinges, or drawer slides",
      "Interior of cabinets if hardware or shelving is being replaced",
      "Any water damage at the base of lower cabinets",
      "Countertop edge condition if relevant to the scope",
    ],
    avoid: [
      "Do not photograph the attic, crawl space, or mechanical rooms",
      "Do not photograph the yard, garage, or exterior",
      "Do not photograph personal items on countertops -- clear the area first or ask the homeowner",
      "Do not photograph other rooms unless cabinetry work was done there",
    ],
    aiSignals: "Cabinet age, water damage at base, and countertop condition generate referral signals for plumbing, flooring, and painting.",
  },
  {
    id: "painting",
    name: "Painting",
    icon: PaintBucket,
    color: "#EC4899",
    bg: "#EC489915",
    border: "#EC489930",
    photograph: [
      "Full wall or room before painting -- capture the entire surface",
      "Close-up of any cracks, holes, or surface damage being repaired",
      "Full wall or room after painting -- same angle as the before shot",
      "Exterior: full elevation of each side being painted",
      "Trim and door frames before and after",
      "Any surface prep work: sanding, priming, caulking",
    ],
    avoid: [
      "Do not photograph personal artwork, family photos, or valuables",
      "Do not photograph rooms that were not part of the painting scope",
      "Do not photograph the homeowner's furniture unless it is covered and part of the job documentation",
    ],
    aiSignals: "Surface condition, crack patterns, and moisture staining generate referral signals for drywall repair, waterproofing, and foundation assessment.",
  },
  {
    id: "fencing",
    name: "Fencing & Gates",
    icon: Shield,
    color: "#14B8A6",
    bg: "#14B8A615",
    border: "#14B8A630",
    photograph: [
      "Full fence line -- walk the perimeter and capture each side",
      "Gate hardware: hinges, latch, and post before and after",
      "Any rotted, broken, or leaning posts -- close-up with context",
      "Post footings if being set or replaced",
      "Full gate before and after installation",
      "Property corners and property line markers if visible",
    ],
    avoid: [
      "Do not photograph the neighbor's yard or property",
      "Do not photograph the home's exterior walls unless fence attaches to them",
      "Do not photograph interior rooms or the garage",
    ],
    aiSignals: "Post rot, leaning sections, and gate condition generate referral signals for pest control (termites), landscaping, and concrete/driveway.",
  },
];

// --- Component -----------------------------------------------------------------
export default function PhotoGuidelines() {
  const [openTrade, setOpenTrade] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #050d1a 0%, #0a1628 60%, #0d1f3c 100%)" }}>
      {/* Header */}
      <div className="border-b px-6 py-5" style={{ borderColor: "#1E3A5F" }}>
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0A162820" }}>
            <Camera className="w-5 h-5" style={{ color: "#0A1628" }} />
          </div>
          <div>
            <h1 className="font-bold text-white text-xl">Partner Photo Guidelines</h1>
            <p className="text-sm" style={{ color: "#4A6FA5" }}>How to document jobs for maximum referral signal quality</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8">

        {/* Why this matters */}
        <div className="rounded-2xl border p-6" style={{ backgroundColor: "#0F1F35", borderColor: "#1E3A5F" }}>
          <div className="flex items-start gap-3 mb-4">
            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#0A1628" }} />
            <div>
              <h2 className="font-bold text-white text-lg mb-1">Why photos matter</h2>
              <p className="text-sm" style={{ color: "#A0B4C8" }}>
                Every photo you upload is analyzed by the platform's AI to identify referral opportunities for other pros in the network. A well-documented job can generate 2-5 additional referral signals -- meaning more commissions for you and better service for the homeowner. Poor or off-topic photos generate no signals and can delay payout verification.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Before photo", desc: "Documents existing condition, protects you legally" },
              { label: "After photo", desc: "Confirms job completion, triggers payout verification" },
              { label: "Clean site photo", desc: "Shows professionalism, builds homeowner trust" },
            ].map(item => (
              <div key={item.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: "#0A1628", border: "1px solid #1E3A5F" }}>
                <p className="text-xs font-bold text-white mb-1">{item.label}</p>
                <p className="text-xs" style={{ color: "#4A6FA5" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Universal rules */}
        <div className="rounded-2xl border p-6" style={{ backgroundColor: "#0F1F35", borderColor: "#1E3A5F" }}>
          <h2 className="font-bold text-white text-lg mb-5">Universal rules -- every trade, every job</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "#22C55E" }}>
                <CheckCircle className="w-4 h-4" /> Always do this
              </h3>
              <ul className="space-y-2">
                {UNIVERSAL_DO.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#22C55E" }} />
                    <span className="text-sm" style={{ color: "#A0B4C8" }}>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "#EF4444" }}>
                <XCircle className="w-4 h-4" /> Never do this
              </h3>
              <ul className="space-y-2">
                {UNIVERSAL_DONT.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
                    <span className="text-sm" style={{ color: "#A0B4C8" }}>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trade-specific sections */}
        <div>
          <h2 className="font-bold text-white text-lg mb-4">Trade-specific guidelines</h2>
          <div className="space-y-3">
            {TRADES.map(trade => {
              const Icon = trade.icon;
              const isOpen = openTrade === trade.id;
              return (
                <div key={trade.id} className="rounded-2xl border overflow-hidden transition-all"
                  style={{ borderColor: isOpen ? trade.border : "#1E3A5F", backgroundColor: "#0F1F35" }}>
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenTrade(isOpen ? null : trade.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: trade.bg, border: `1px solid ${trade.border}` }}>
                        <Icon className="w-4.5 h-4.5" style={{ color: trade.color }} />
                      </div>
                      <span className="font-semibold text-white">{trade.name}</span>
                    </div>
                    {isOpen
                      ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: "#4A6FA5" }} />
                      : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "#4A6FA5" }} />
                    }
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 space-y-5 border-t" style={{ borderColor: "#1E3A5F" }}>
                      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <h4 className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: "#22C55E" }}>
                            <CheckCircle className="w-3.5 h-3.5" /> Photograph these
                          </h4>
                          <ul className="space-y-1.5">
                            {trade.photograph.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "#22C55E" }} />
                                <span className="text-xs" style={{ color: "#A0B4C8" }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: "#EF4444" }}>
                            <XCircle className="w-3.5 h-3.5" /> Do not photograph
                          </h4>
                          <ul className="space-y-1.5">
                            {trade.avoid.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "#EF4444" }} />
                                <span className="text-xs" style={{ color: "#A0B4C8" }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="rounded-xl p-3 flex items-start gap-2"
                        style={{ backgroundColor: `${trade.color}10`, border: `1px solid ${trade.border}` }}>
                        <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: trade.color }} />
                        <p className="text-xs" style={{ color: "#A0B4C8" }}>
                          <strong className="text-white">AI referral signals: </strong>{trade.aiSignals}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <div className="rounded-2xl border p-5 flex items-start gap-3" style={{ backgroundColor: "#0F1F35", borderColor: "#1E3A5F" }}>
          <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#0A1628" }} />
          <div>
            <p className="text-sm font-semibold text-white mb-1">Privacy and legal protection</p>
            <p className="text-sm" style={{ color: "#4A6FA5" }}>
              All photos uploaded through the platform are stored securely and used only for job documentation, AI analysis, and referral matching. Photos are never shared publicly without homeowner consent. Following these guidelines protects you from liability disputes -- a timestamped before photo is your best defense if a homeowner later claims pre-existing damage was caused by your crew.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
