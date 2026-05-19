import { useState } from 'react';

const originData: Record<string, { differences: string[]; surprises: string[] }> = {
  california: {
    differences: [
      "Property taxes are lower (~1.7%) but still shock Californians used to Prop 13 caps",
      "Homes are dramatically larger for the price — 3,000 sqft is standard",
      "HOA culture is pervasive — most new builds have mandatory HOAs",
      "Texas pride is real — state flag everywhere, Lone Star everything",
      "No state income tax (major win coming from CA)",
    ],
    surprises: [
      "Summer heat is more intense than expected — 100F+ for weeks",
      "Hail storms can damage your car and roof — add comprehensive coverage",
      "Property taxes reset at purchase value every sale",
      "Neighbors are friendlier and more community-oriented",
    ],
  },
  northeast: {
    differences: [
      "Sprawl is extreme — you will drive everywhere, always",
      "BBQ culture means beef brisket, not pork — adjustment required",
      "Thunderstorms are dramatic and frequent spring through fall",
      "Gun culture is normalized — bumper stickers, open carry in some areas",
      "Sales tax exists but no income tax — net win for most",
    ],
    surprises: [
      "The food scene rivals NYC and Boston at a fraction of the cost",
      "Traffic rivals major northeastern cities on major corridors",
      "People say y'all unironically and it grows on you fast",
      "Home sizes feel excessive — you will fill the space eventually",
    ],
  },
  midwest: {
    differences: [
      "Cost of living is higher than Midwest but lower than coasts",
      "Diversity is much greater than most Midwest cities",
      "Mexican food quality is dramatically better",
      "Airport connectivity is world-class — DFW hub is massive",
      "Corporate relocations bring constant new neighbors",
    ],
    surprises: [
      "HOA rules can be stricter than expected — read CC&Rs carefully",
      "Wildfire smoke from western states drifts in some summers",
      "The job market is extremely competitive and dynamic",
      "Property tax bills arrive in October and are due January 31",
    ],
  },
  south: {
    differences: [
      "DFW moves faster — more corporate, more cosmopolitan",
      "Traffic is worse than most southern cities",
      "Home prices are higher but appreciation is stronger",
      "Restaurant variety is significantly broader",
      "Property taxes hit harder than most southern states",
    ],
    surprises: [
      "Winter ice storms shut down the city — stock up in November",
      "The international food scene is world-class",
      "HOA enforcement can be surprisingly aggressive",
      "The DFW tech scene rivals Austin — remote work hubs everywhere",
    ],
  },
};

const firstThirtyDays = [
  { week: "Week 1", tasks: ["Register vehicle with Texas DMV (90-day window)", "Get Texas driver license (30-day window if employed)", "Set up utilities: Oncor/TXU Energy, Atmos Gas, city water"] },
  { week: "Week 2", tasks: ["File homestead exemption at county appraisal district", "Find your HOA contact and read CC&Rs cover to cover", "Locate nearest urgent care, ER, and primary care physicians"] },
  { week: "Week 3", tasks: ["Join neighborhood Facebook group and Nextdoor", "Explore your city park system and trail network", "Identify your school district and enrollment deadlines"] },
  { week: "Week 4", tasks: ["Attend a local community event or city council meeting", "Check your property tax appraisal and protest deadline", "Connect with a local real estate attorney for estate planning update"] },
];

export default function DFWNewMoverGuide2026() {
  const [origin, setOrigin] = useState<string>("");
  const [showGuide, setShowGuide] = useState(false);

  const originOptions = [
    { value: "california", label: "California" },
    { value: "northeast", label: "Northeast (NY, NJ, MA, CT)" },
    { value: "midwest", label: "Midwest (IL, OH, MI, MN)" },
    { value: "south", label: "South (GA, FL, TN, NC)" },
  ];

  const selected = originData[origin];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>New Mover Guide: Welcome to DFW 🤠</h1>
        <p style={{ color: "#8899AA", fontSize: 16, marginBottom: 40 }}>Everything you need to know for your first 30 days in the Dallas-Fort Worth Metroplex.</p>

        <div style={{ background: "#111D2E", borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🗺️ Your First 30 Days — Week by Week</h2>
          {firstThirtyDays.map((w) => (
            <div key={w.week} style={{ marginBottom: 16 }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 6 }}>{w.week}</div>
              {w.tasks.map((t, i) => (
                <div key={i} style={{ color: "#CBD5E1", fontSize: 14, marginBottom: 4, paddingLeft: 16 }}>✓ {t}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ background: "#111D2E", borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🏡 DFW Culture Essentials</h2>
          <p style={{ color: "#8899AA", fontSize: 14, marginBottom: 12 }}>Texas is its own world. Here is what every newcomer needs to understand.</p>
          {[
            "Texas pride is identity — it is not just patriotism, it is a lifestyle. Embrace it.",
            "Property taxes reset on every sale — budget 1.7–2.4% of purchase price annually.",
            "HOAs govern most neighborhoods — violations can result in fines and liens.",
            "Big homes are normal — 2,500+ sqft starter homes are common in suburbs.",
            "Drought and hail are real risks — landscaping and roof insurance matter.",
          ].map((tip, i) => (
            <div key={i} style={{ color: "#CBD5E1", fontSize: 14, marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid #F5E642" }}>{tip}</div>
          ))}
        </div>

        <div style={{ background: "#111D2E", borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📍 Where Are You Moving From?</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            {originOptions.map((o) => (
              <button key={o.value} onClick={() => { setOrigin(o.value); setShowGuide(true); }}
                style={{ background: origin === o.value ? "#F5E642" : "#1E2D42", color: origin === o.value ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                {o.label}
              </button>
            ))}
          </div>
          {showGuide && selected && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 10 }}>🔄 Key Differences from {originOptions.find(o => o.value === origin)?.label}</div>
                {selected.differences.map((d, i) => <div key={i} style={{ color: "#CBD5E1", fontSize: 14, marginBottom: 6 }}>• {d}</div>)}
              </div>
              <div>
                <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 10 }}>😲 What Surprises People from Your Region</div>
                {selected.surprises.map((s, i) => <div key={i} style={{ color: "#CBD5E1", fontSize: 14, marginBottom: 6 }}>• {s}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
