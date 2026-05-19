import { useState } from 'react';

const amendments = [
  { name: "Compost", emoji: "♻️", problem: "clay", benefit: "Improves water retention, drainage, and microbial life simultaneously. The single most impactful amendment for DFW clay soil. Apply 3–4 inches annually and till in." },
  { name: "Humic Acid", emoji: "🧪", problem: "compaction", benefit: "Breaks up compacted DFW clay at the molecular level. Increases nutrient absorption. Apply as liquid drench in spring and fall for best results." },
  { name: "Decomposed Granite", emoji: "🪨", problem: "drainage", benefit: "Native Texas material. Improves drainage and soil structure in DFW clay. Use as topdressing or mix into planting holes. Does not raise pH like lime." },
  { name: "Biochar", emoji: "⚡", problem: "microbial", benefit: "Inoculate with compost before applying. Creates permanent habitat for soil microbes. Long-lasting soil improvement — stays active for hundreds of years." },
  { name: "Expanded Shale", emoji: "🔵", problem: "drainage", benefit: "Made in Texas, perfect for DFW clay. Permanently improves drainage and aeration. Mix 1/4–1/3 volume into planting areas." },
];

const recs: Record<string, string> = {
  clay: "Compost (top priority) + Expanded Shale for permanent improvement",
  compaction: "Humic Acid liquid drench + Biochar to rebuild microbial activity",
  drainage: "Decomposed Granite or Expanded Shale — both DFW-appropriate options",
  microbial: "Biochar inoculated with compost + Humic Acid as activator",
  all: "Full program: Compost + Expanded Shale + Biochar + Humic Acid — complete DFW clay rehabilitation",
};

export default function DFWCompostTeaGuide2026() {
  const [problem, setProblem] = useState("clay");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🌱</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", fontWeight: 700, margin: "0.5rem 0" }}>DFW Compost & Soil Amendment Guide 2026</h1>
          <p style={{ color: "#94A3B8″, margin: 0 }}>Improving DFW clay soil — organic amendments, humic acid, granite, and biochar for North Texas landscapes</p>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>🔬 Why DFW Soil Is Challenging</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
            {[["🧱", "Heavy Clay", "Shrinks when dry, swells when wet — cracks foundations and kills plants"], ["💧", "Drainage Issues", "Water pools after rain, then soil becomes rock-hard in summer drought"], ["⚗️", "High pH", "DFW soil often alkaline — limits nutrient availability for many plants"], ["🦠", "Low Organic Matter", "Native prairie was stripped — rebuilding microbial life takes effort"]].map(([e, t, d]) => (
              <div key={t as string} style={{ background: "#0A1628″, borderRadius: 8, padding: "0.75rem" }}>
                <div style={{ fontSize: "1.5rem" }}>{e}</div>
                <div style={{ color: "#F5E642″, fontWeight: 600, margin: "0.25rem 0" }}>{t}</div>
                <div style={{ color: "#94A3B8″, fontSize: "0.8rem" }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>🎯 DFW Soil Problem Solver</h2>
          <label style={{ color: "#94A3B8″, fontSize: "0.85rem", display: "block", marginBottom: 6 }}>My Primary Soil Problem</label>
          <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: "100%", background: "#1E3A5F", color: "#E8EDF5″, border: "1px solid #F5E642", borderRadius: 8, padding: "0.5rem", marginBottom: "1rem" }}>
            <option value="clay">Too Much Clay / Brick-Hard When Dry</option>
            <option value="compaction">Compacted / Nothing Grows</option>
            <option value="drainage">Pools Water / Stays Wet</option>
            <option value="microbial">Dead Soil / Nothing Thrives</option>
            <option value="all">All of the Above — Full Rehab</option>
          </select>
          <div style={{ background: "#F5E642″, borderRadius: 8, padding: "1rem", color: "#0A1628", fontWeight: 600 }}>
            ✅ DFW Amendment Strategy: {recs[problem]}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {amendments.map(a => (
            <div key={a.name} onClick={() => setSelected(selected === a.name ? null : a.name)} style={{ background: selected === a.name ? "#1E3A5F" : "#0F2040″, border: `1px solid ${selected === a.name ? "#F5E642" : "#1E3A5F"}`, borderRadius: 10, padding: "1.25rem", cursor: "pointer" }}>
              <div style={{ fontSize: "2rem" }}>{a.emoji}</div>
              <h3 style={{ color: "#F5E642″, margin: "0.5rem 0 0.25rem" }}>{a.name}</h3>
              <span style={{ background: "#0A1628″, color: "#94A3B8", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>Best for: {a.problem} issues</span>
              {selected === a.name && <p style={{ color: "#CBD5E1″, fontSize: "0.9rem", margin: "0.75rem 0 0" }}>{a.benefit}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", border: "1px solid #1E3A5F", textAlign: "center" }}>
          <p style={{ color: "#94A3B8″, margin: "0 0 1rem" }}>Need a DFW landscaping pro for soil remediation and amendment?</p>
          <a href="https://prolnk.io" style={{ background: "#F5E642″, color: "#0A1628", fontWeight: 700, padding: "0.75rem 2rem", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>Find a DFW Landscaper on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}