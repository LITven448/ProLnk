import { useState } from 'react';

const crops: Record<string, string[]> = {
  spring: ["Tomatoes (transplant Feb–Mar)", "Peppers (transplant Mar)", "Squash (direct sow Mar)", "Cucumbers (Apr)", "Beans (Mar–Apr)"],
  fall: ["Broccoli (transplant Aug–Sep)", "Lettuce (Sep–Oct)", "Kale (Sep–Oct)", "Carrots (Sep)", "Spinach (Oct–Nov)"],
  winter: ["Kale (protected)", "Spinach (protected)", "Chard (with cover)", "Root parsley"],
};

const guides: Record<string, Record<string, string>> = {
  beginner: { small: "Start with one 4x8 bed. Spring: cherry tomatoes + basil. Fall: lettuce + spinach. Master watering before scaling.", medium: "Two 4x8 beds. Dedicate one to spring crops (tomatoes, peppers), one to fall/winter (greens, brassicas). Drip irrigation from day one.", large: "Three beds minimum. Rotate crops annually. Drip irrigation with timer essential for DFW summer survival." },
  intermediate: { small: "Intensive planting in one bed. Succession plant lettuce every 3 weeks in fall. Train tomatoes vertically to maximize space.", medium: "Add perennial herbs in a third bed. Try DFW-adapted pepper varieties. Install automatic drip with fertilizer injector.", large: "Full rotation plan. Compost tea program. Add trellising for vertical cucumbers and pole beans." },
  advanced: { small: "Year-round production with season extenders. Winter greens under row cover. Soil block seeding for transplants.", medium: "Integrated pest management. Build beneficial insect habitat. Ferment plant extracts for biostimulants.", large: "Closed-loop system: compost everything, save seeds, harvest rainwater. Full year documented crop plan." },
};

export default function DFWRaisedBedGardeningGuide2026() {
  const [bedSize, setBedSize] = useState("medium");
  const [exp, setExp] = useState("beginner");
  const [season, setSeason] = useState("spring");
  const [selected, setSelected] = useState<string | null>(null);

  const guide = guides[exp]?.[bedSize] ?? "";

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🥦</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", fontWeight: 700, margin: "0.5rem 0" }}>DFW Raised Bed Vegetable Gardening Guide 2026</h1>
          <p style={{ color: "#94A3B8″, margin: 0 }}>Bypass DFW clay soil and grow vegetables year-round with raised beds — soil mix, timing, and watering secrets</p>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>🧱 DFW Raised Bed Soil Mix Formula</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {[{ label: "60%", name: "Quality Topsoil", emoji: "🪨" }, { label: "30%", name: "Compost", emoji: "♻️" }, { label: "10%", name: "Perlite", emoji: "⚪" }].map(m => (
              <div key={m.name} style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: "2rem" }}>{m.emoji}</div>
                <div style={{ color: "#F5E642″, fontSize: "1.5rem", fontWeight: 700 }}>{m.label}</div>
                <div style={{ color: "#94A3B8″, fontSize: "0.85rem" }}>{m.name}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#94A3B8″, fontSize: "0.85rem", marginTop: "0.75rem", marginBottom: 0 }}>⚠️ Minimum 12-inch bed depth for most vegetables. 18 inches ideal for root crops like carrots in DFW.</p>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>🎯 Your DFW Raised Bed Plan</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: "#94A3B8″, fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Garden Size</label>
              <select value={bedSize} onChange={e => setBedSize(e.target.value)} style={{ width: "100%", background: "#1E3A5F", color: "#E8EDF5″, border: "1px solid #F5E642", borderRadius: 8, padding: "0.5rem" }}>
                <option value="small">1 raised bed (4x8)</option>
                <option value="medium">2–3 raised beds</option>
                <option value="large">4+ raised beds</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: "#94A3B8″, fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Experience Level</label>
              <select value={exp} onChange={e => setExp(e.target.value)} style={{ width: "100%", background: "#1E3A5F", color: "#E8EDF5″, border: "1px solid #F5E642", borderRadius: 8, padding: "0.5rem" }}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div style={{ background: "#F5E642″, borderRadius: 8, padding: "1rem", color: "#0A1628" }}>
            <strong>Your DFW Plan:</strong>
            <p style={{ margin: "0.5rem 0 0″, fontWeight: 500 }}>{guide}</p>
          </div>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>📅 DFW Seasonal Planting Guide</h2>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            {(["spring", "fall", "winter"] as const).map(s => (
              <button key={s} onClick={() => setSeason(s)} style={{ background: season === s ? "#F5E642″ : "#1E3A5F", color: season === s ? "#0A1628" : "#E8EDF5", border: "none", borderRadius: 6, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, textTransform: "capitalize" }}>{s}</button>
            ))}
          </div>
          <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
            {crops[season].map(c => <li key={c} style={{ color: "#CBD5E1″, marginBottom: "0.25rem" }}>{c}</li>)}
          </ul>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", border: "1px solid #1E3A5F", textAlign: "center" }}>
          <p style={{ color: "#94A3B8″, margin: "0 0 1rem" }}>Need a DFW landscaper to build and install raised beds?</p>
          <a href="https://prolnk.io" style={{ background: "#F5E642″, color: "#0A1628", fontWeight: 700, padding: "0.75rem 2rem", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>Find a DFW Landscaper on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}