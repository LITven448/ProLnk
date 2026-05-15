import { useState } from "react";
import { Link } from "wouter";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Leaf, Droplets, Sun, Snowflake, ChevronDown, ChevronUp,
  AlertTriangle, ExternalLink, Calendar,
} from "lucide-react";

const D = {
  bg: "#0D0F14",
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8",
  dim: "#555B72",
  green: "#00E676",
  cyan: "#00D4FF",
  amber: "#FFB300",
  red: "#FF4444",
  blue: "#3B82F6",
  teal: "#14B8A6",
  lime: "#84CC16",
};

const CURRENT_MONTH = new Date().getMonth();

const CALENDAR: { month: string; tasks: string[]; highlight?: boolean }[] = [
  { month: "Jan", tasks: ["Plan spring projects", "Prune dormant trees", "Check irrigation system"] },
  { month: "Feb", tasks: ["Pre-emergent herbicide", "Soil amendment prep", "Order seeds/plants"] },
  { month: "Mar", tasks: ["Fertilize lawn (15-5-10)", "Plant cool-season annuals", "Start irrigation system"] },
  { month: "Apr", tasks: ["Mow at 3.5\"", "Edge beds", "Mulch (2–3 inch layer)", "Watch for fire ants"] },
  { month: "May", tasks: ["Apply slow-release fertilizer", "Deep water 2× week", "Plant warm-season annuals"] },
  { month: "Jun", tasks: ["Fertilize again (June–July rule)", "Mow weekly", "Water 1\"/week minimum"] },
  { month: "Jul", tasks: ["Water early AM only", "Check for chinch bugs", "Raise mower height to 4\""] },
  { month: "Aug", tasks: ["Last major fertilizer push", "Water deeply 2× week", "Treat for grubs if needed"] },
  { month: "Sep", tasks: ["Aerate lawn", "Overseed thin spots", "Plant fall color", "Fertilize one final time"] },
  { month: "Oct", tasks: ["Overseed cool-season grass", "Plant shrubs/trees", "Reduce irrigation frequency"] },
  { month: "Nov", tasks: ["Winterize irrigation system", "Final mow at 3\"", "Plant spring bulbs"] },
  { month: "Dec", tasks: ["Prune dead branches", "Protect tropical plants", "Plan next year's landscape budget"] },
];

interface Plant {
  name: string;
  type: string;
  sun: string;
  water: string;
  season: string;
  color: string;
}

const PLANTS: Plant[] = [
  { name: "Texas Sage", type: "Shrub", sun: "Full sun", water: "Very low — drought tolerant", season: "Summer/Fall bloom", color: D.purple ?? "#A855F7" },
  { name: "Live Oak", type: "Tree", sun: "Full sun", water: "Low once established", season: "Year-round shade", color: D.green },
  { name: "Crape Myrtle", type: "Ornamental tree", sun: "Full sun", water: "Moderate", season: "Summer bloom (June–Sep)", color: D.cyan },
  { name: "Buffalo Grass", type: "Turfgrass", sun: "Full sun", water: "Very low — native", season: "Green Apr–Oct", color: D.lime },
  { name: "Mexican Feathergrass", type: "Ornamental grass", sun: "Full/part sun", water: "Low", season: "Spring–Fall", color: D.amber },
  { name: "Red Yucca", type: "Perennial", sun: "Full sun", water: "Very low", season: "Spring–Summer bloom", color: D.red },
];

interface Mistake {
  id: string;
  title: string;
  detail: string;
  fix: string;
}

const MISTAKES: Mistake[] = [
  {
    id: "overwater",
    title: "Overwatering",
    detail: "DFW clay soil holds water for days. Most homeowners water 2× what's needed, causing root rot and fungal disease.",
    fix: "Water deeply 2× per week in summer. Use a screwdriver test — if it slides in 6 inches, soil is moist enough.",
  },
  {
    id: "grass",
    title: "Wrong Grass Type",
    detail: "Planting tall fescue or Kentucky bluegrass in DFW results in dead turf by July. Both require 2× the water and still struggle.",
    fix: "Use St. Augustine (Bermuda in sun, Zoysia for shade). These are bred for DFW heat and clay soil.",
  },
  {
    id: "tropical",
    title: "Planting Tropical Plants",
    detail: "Hibiscus, bougainvillea, and banana trees die every freeze (and DFW gets hard freezes most winters).",
    fix: "Stick to USDA zone 7–8 plants. Texas sage, esperanza, and knockout roses all survive DFW winters.",
  },
  {
    id: "mulch",
    title: "Skipping Mulch in Beds",
    detail: "Without 2–3 inches of mulch, beds lose moisture in days, bake in summer, and invite weeds year-round.",
    fix: "Apply cedar or hardwood mulch every spring. Keep mulch 2 inches from plant stems to prevent rot.",
  },
  {
    id: "winterize",
    title: "Skipping Winterization",
    detail: "Irrigation lines left active during hard freezes burst — a $500–$2,000 repair. Outdoor plants also need protection.",
    fix: "Winterize irrigation by Nov 15. Wrap tropical plants in frost cloth when temps drop below 28°F.",
  },
];

export default function LandscapingGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <HomeownerLayout>
      <div style={{ background: D.bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "linear-gradient(135deg, #00E67622, #00E67644)",
                border: "1px solid #00E67630",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Leaf size={22} color={D.green} />
              </div>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: D.text, margin: 0 }}>Landscaping Guide</h1>
                <p style={{ fontSize: 13, color: D.muted, margin: 0 }}>A beautiful yard that's right for Texas</p>
              </div>
            </div>
          </div>

          {/* DFW context card */}
          <div style={{
            background: "linear-gradient(135deg, #00E67610, #14B8A610)",
            border: "1px solid #00E67630",
            borderRadius: 16, padding: "18px 22px", marginBottom: 28,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Sun size={18} color={D.amber} />
              <span style={{ fontSize: 14, fontWeight: 700, color: D.text }}>DFW Climate Reality</span>
            </div>
            <p style={{ fontSize: 14, color: D.muted, margin: 0, lineHeight: 1.7 }}>
              DFW has <strong style={{ color: D.amber }}>hot, dry summers</strong> (100°F+ for weeks) and
              <strong style={{ color: D.cyan }}> occasional hard freezes</strong> in winter. Your landscaping
              needs to work with the climate, not against it. The right plants and schedule save thousands
              in water bills and replacement costs.
            </p>
          </div>

          {/* Lawn care calendar */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Calendar size={18} color={D.cyan} />
              <h2 style={{ fontSize: 17, fontWeight: 700, color: D.text, margin: 0 }}>Lawn Care Calendar</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {CALENDAR.map((m, i) => {
                const isCurrent = i === CURRENT_MONTH;
                return (
                  <div key={m.month} style={{
                    background: isCurrent ? "linear-gradient(135deg, #00D4FF18, #00D4FF28)" : D.card,
                    border: `1px solid ${isCurrent ? "#00D4FF50" : D.border}`,
                    borderRadius: 12, padding: "14px 16px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{
                        fontSize: 13, fontWeight: 700,
                        color: isCurrent ? D.cyan : D.text,
                      }}>{m.month}</span>
                      {isCurrent && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: D.cyan,
                          background: "#00D4FF18", border: "1px solid #00D4FF30",
                          borderRadius: 20, padding: "2px 8px",
                        }}>NOW</span>
                      )}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 14, listStyle: "disc" }}>
                      {m.tasks.map((t, j) => (
                        <li key={j} style={{ fontSize: 11, color: D.muted, lineHeight: 1.7 }}>{t}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Water-wise tips */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Droplets size={18} color={D.blue} />
              <h2 style={{ fontSize: 17, fontWeight: 700, color: D.text, margin: 0 }}>Water-Wise Tips for DFW</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
              {[
                { tip: "Water at 5–8am to reduce evaporation", detail: "Midday watering loses 30–50% to evaporation. Evening watering promotes fungal disease on grass." },
                { tip: "Use drip irrigation for beds, not sprinklers", detail: "Drip delivers water directly to roots, cutting bed water use by 50%. Sprinklers overspray and cause runoff." },
                { tip: "St. Augustine grass needs 1\" water/week in summer", detail: "One deep watering beats multiple shallow ones. Use a rain gauge or tuna can to measure." },
                { tip: "Foundation watering: 30-min soak, 3× per week minimum", detail: "DFW clay shrinks in drought and expands in rain. Consistent soil moisture prevents foundation movement." },
                { tip: "Xeriscape: save 50–75% on water bill", detail: "Replacing 30% of turf with native plants and rock can cut outdoor water use by half. Average DFW savings: $800–$1,400/yr." },
              ].map((item, i) => (
                <div key={i} style={{
                  background: D.card, border: `1px solid ${D.border}`,
                  borderRadius: 12, padding: "14px 18px",
                  display: "flex", alignItems: "flex-start", gap: 12,
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: "#3B82F620", border: "1px solid #3B82F630",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                  }}>
                    <Droplets size={14} color={D.blue} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: D.text, margin: 0, marginBottom: 4 }}>{item.tip}</p>
                    <p style={{ fontSize: 12, color: D.muted, margin: 0, lineHeight: 1.6 }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plant recommendations */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Leaf size={18} color={D.green} />
              <h2 style={{ fontSize: 17, fontWeight: 700, color: D.text, margin: 0 }}>Native & Adapted Plants for DFW</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {PLANTS.map(plant => (
                <div key={plant.name} style={{
                  background: D.card, border: `1px solid ${D.border}`,
                  borderRadius: 14, padding: "16px 18px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: `${plant.color}18`,
                      border: `1px solid ${plant.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Leaf size={16} color={plant.color} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: D.text, margin: 0 }}>{plant.name}</p>
                      <p style={{ fontSize: 11, color: D.muted, margin: 0 }}>{plant.type}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Sun size={12} color={D.amber} />
                      <span style={{ fontSize: 12, color: D.muted }}>{plant.sun}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Droplets size={12} color={D.blue} />
                      <span style={{ fontSize: 12, color: D.muted }}>{plant.water}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Calendar size={12} color={plant.color} />
                      <span style={{ fontSize: 12, color: D.muted }}>{plant.season}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common mistakes accordion */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <AlertTriangle size={18} color={D.amber} />
              <h2 style={{ fontSize: 17, fontWeight: 700, color: D.text, margin: 0 }}>Common Landscaping Mistakes</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
              {MISTAKES.map(m => {
                const open = expanded === m.id;
                return (
                  <div key={m.id} style={{
                    background: D.card,
                    border: `1px solid ${open ? D.amber + "50" : D.border}`,
                    borderRadius: 12, overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}>
                    <button
                      onClick={() => setExpanded(open ? null : m.id)}
                      style={{
                        width: "100%", background: "none", border: "none", cursor: "pointer",
                        padding: "14px 18px",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <AlertTriangle size={15} color={D.amber} />
                        <span style={{ fontSize: 14, fontWeight: 600, color: D.text }}>{m.title}</span>
                      </div>
                      {open
                        ? <ChevronUp size={16} color={D.muted} />
                        : <ChevronDown size={16} color={D.muted} />
                      }
                    </button>
                    {open && (
                      <div style={{ padding: "0 18px 16px", borderTop: `1px solid ${D.border}` }}>
                        <p style={{ fontSize: 13, color: D.muted, margin: "12px 0 10px", lineHeight: 1.6 }}>{m.detail}</p>
                        <div style={{
                          background: "#00E67610", border: "1px solid #00E67630",
                          borderRadius: 8, padding: "10px 14px",
                        }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: D.green, textTransform: "uppercase" as const, letterSpacing: 0.6 }}>Fix: </span>
                          <span style={{ fontSize: 13, color: D.text }}>{m.fix}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Find a Landscaper CTA */}
          <div style={{
            background: "linear-gradient(135deg, #14B8A618, #00E67618)",
            border: "1px solid #14B8A630",
            borderRadius: 16, padding: "22px 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: D.text, margin: 0, marginBottom: 4 }}>
                Ready to upgrade your yard?
              </p>
              <p style={{ fontSize: 13, color: D.muted, margin: 0 }}>
                Connect with DFW-vetted landscaping pros. Free quotes, no obligation.
              </p>
            </div>
            <Link href="/trustypro/book?trade=landscaping">
              <button style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 22px", borderRadius: 10,
                background: "linear-gradient(135deg, #00E676, #14B8A6)",
                border: "none", color: "#0D0F14", fontWeight: 700, fontSize: 14,
                cursor: "pointer", whiteSpace: "nowrap" as const,
              }}>
                <Leaf size={16} />
                Find a Landscaper
                <ExternalLink size={13} />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
