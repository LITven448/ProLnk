import { useState } from 'react';

type RoomType = "Living Room" | "Bedroom" | "Kitchen" | "Bathroom" | "Hallway";
type Condition = "Good (minor scuffs)" | "Fair (old paint, stains)" | "Poor (holes, peeling)";

const GUIDES: Record<RoomType, Record<Condition, { prep: string; coats: string; roller: string; tip: string }>> = {
  "Living Room": {
    "Good (minor scuffs)": { prep: "Wipe walls, fill scuffs with spackling, sand smooth", coats: "2 coats eggshell", roller: "3/8in nap for smooth walls", tip: "DFW low humidity in winter dries paint fast — keep windows closed, work in sections" },
    "Fair (old paint, stains)": { prep: "Clean with TSP solution, spot-prime stains, sand rough areas", coats: "1 coat primer + 2 coats eggshell", roller: "3/8in nap", tip: "Use stain-blocking primer on any water stains before finish coat" },
    "Poor (holes, peeling)": { prep: "Strip peeling paint, fill holes with joint compound, sand, full prime", coats: "1 coat PVA primer + 2 finish coats", roller: "1/2in nap for texture", tip: "Large holes need mesh patch + two coats joint compound, sand between each" },
  },
  "Bedroom": {
    "Good (minor scuffs)": { prep: "Dust, fill nail holes, sand", coats: "2 coats matte or eggshell", roller: "3/8in nap", tip: "Matte finish hides imperfections better — good choice for older DFW homes" },
    "Fair (old paint, stains)": { prep: "Wash walls, prime stains, sand", coats: "1 primer + 2 finish", roller: "3/8in nap", tip: "DFW summers create humidity that can cause bubbling — prime thoroughly" },
    "Poor (holes, peeling)": { prep: "Full strip, repair drywall, sand, prime", coats: "PVA primer + 2 finish", roller: "1/2in nap", tip: "Skim coat the entire wall for best results on heavily damaged surfaces" },
  },
  "Kitchen": {
    "Good (minor scuffs)": { prep: "Degrease with TSP, rinse, dry fully", coats: "2 coats satin (cleanable)", roller: "3/8in nap", tip: "Kitchen walls need satin or semi-gloss — matte absorbs grease and cannot be wiped" },
    "Fair (old paint, stains)": { prep: "Heavy degrease, stain block primer, sand", coats: "1 primer + 2 satin", roller: "3/8in nap", tip: "Grease stains will bleed through without oil-based stain blocking primer" },
    "Poor (holes, peeling)": { prep: "Degrease, full repair, oil primer", coats: "Oil primer + 2 satin", roller: "3/8in nap", tip: "Oil-based primer bonds best to kitchen surfaces with heavy grease history" },
  },
  "Bathroom": {
    "Good (minor scuffs)": { prep: "Clean mildew with bleach solution, rinse, dry", coats: "2 coats bathroom-specific semi-gloss", roller: "3/8in nap", tip: "Always use mildew-resistant paint in DFW bathrooms — humidity is high year-round" },
    "Fair (old paint, stains)": { prep: "Kill mildew, prime, sand", coats: "Mildew-block primer + 2 semi-gloss", roller: "3/8in nap", tip: "DFW hard water leaves mineral stains — use CLR before painting" },
    "Poor (holes, peeling)": { prep: "Remove mildew, repair, mold-resistant primer", coats: "Mold-resistant primer + 2 semi-gloss", roller: "3/8in nap", tip: "If mold is present behind walls, stop and call a pro — this is not a DIY situation" },
  },
  "Hallway": {
    "Good (minor scuffs)": { prep: "Wipe down, fill scuffs", coats: "2 coats satin (high traffic)", roller: "3/8in nap", tip: "Satin holds up to touching and cleaning in high-traffic DFW hallways" },
    "Fair (old paint, stains)": { prep: "Wash, spot prime, sand", coats: "1 primer + 2 satin", roller: "3/8in nap", tip: "Cut in corners carefully — hallways are narrow and roller overlap shows" },
    "Poor (holes, peeling)": { prep: "Full repair, sand, prime", coats: "PVA primer + 2 satin", roller: "1/2in nap", tip: "Bright lighting in hallways reveals every imperfection — take time on prep" },
  },
};

export default function DFWPaintingTechniquesGuide2026() {
  const [room, setRoom] = useState<RoomType>("Living Room");
  const [cond, setCond] = useState<Condition>("Good (minor scuffs)");
  const guide = GUIDES[room][cond];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK - DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🎨 DFW Interior Painting Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32 }}>Select your room and current wall condition for the right approach.</p>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 10, fontSize: 14 }}>ROOM TYPE</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(Object.keys(GUIDES) as RoomType[]).map((r) => (
              <button key={r} onClick={() => setRoom(r)} style={{ padding: "8px 14px", borderRadius: 8, border: "2px solid", borderColor: room === r ? "#F5E642″ : "#1e3a5f", background: room === r ? "#F5E642" : "transparent", color: room === r ? "#0A1628" : "#fff", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>{r}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 10, fontSize: 14 }}>WALL CONDITION</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(Object.keys(GUIDES[room]) as Condition[]).map((c) => (
              <button key={c} onClick={() => setCond(c)} style={{ padding: "8px 14px", borderRadius: 8, border: "2px solid", borderColor: cond === c ? "#F5E642″ : "#1e3a5f", background: cond === c ? "#F5E642" : "transparent", color: cond === c ? "#0A1628" : "#fff", fontWeight: 600, cursor: "pointer", fontSize: 12 }}>{c}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[["🧹 SURFACE PREP", guide.prep], ["🎨 COATS REQUIRED", guide.coats], ["🖌️ ROLLER NAP", guide.roller]].map(([label, val]) => (
            <div key={label} style={{ background: "#0f2035″, borderRadius: 10, padding: 18, border: "1px solid #1e3a5f" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>{label}</div>
              <div style={{ color: "#e2e8f0″, fontSize: 14 }}>{val}</div>
            </div>
          ))}
          <div style={{ background: "#162d4a", borderRadius: 10, padding: 18, border: "1px solid #F5E642″ }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>DFW PRO TIP</div>
            <div style={{ color: "#fef9c3″, fontSize: 14, lineHeight: 1.6 }}>💡 {guide.tip}</div>
          </div>
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#64748b", fontSize: 13 }}>ProLnk - Connecting DFW Homeowners with Trusted Pros - prolnk.io</div>
      </div>
    </div>
  );
}