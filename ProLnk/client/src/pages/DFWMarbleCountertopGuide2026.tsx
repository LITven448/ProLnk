import { useState } from 'react';

const applications = [
  { location: "Master Bathroom Vanity", lifestyle: "Low traffic", suitable: "✅ Excellent", reason: "Low-use, minimal acidic exposure, stunning visual impact" },
  { location: "Kitchen Island", lifestyle: "Moderate cooking", suitable: "⚠️ Caution", reason: "Risk from lemon, tomato, wine. Requires strict pH-neutral protocol" },
  { location: "Kitchen Perimeter", lifestyle: "Active cooking", suitable: "❌ Not Recommended", reason: "Daily acid exposure from DFW cooking destroys marble fast" },
  { location: "Fireplace Surround", lifestyle: "Decorative", suitable: "✅ Excellent", reason: "Zero liquid or acid exposure — marble shines as a statement piece" },
  { location: "Powder Room Vanity", lifestyle: "Guest-only", suitable: "✅ Excellent", reason: "Occasional use, easy to maintain with pH-neutral products" },
];

const suitabilityGuide: Record<string, { verdict: string; advice: string }> = {
  "Master bath, moderate lifestyle": { verdict: "✅ Great Choice", advice: "Marble thrives in master baths with moderate use. Seal every 6 months. Keep a pH-neutral stone cleaner under the sink at all times." },
  "Kitchen primary surface, active cook": { verdict: "❌ Avoid Marble Here", advice: "DFW hard water etches marble within months. Citrus, wine, and tomato sauce cause permanent dull spots. Consider quartzite or granite instead." },
  "Fireplace or decorative surface": { verdict: "✅ Perfect Application", advice: "No liquids, no acids, no hard water exposure. Marble is unmatched for fireplace surrounds and decorative ledges in DFW homes." },
  "Second bath or powder room, guests only": { verdict: "✅ Low-Risk, High Impact", advice: "Powder rooms see minimal traffic and no food prep. Marble adds luxury with manageable maintenance for DFW homeowners." },
};

export default function DFWMarbleCountertopGuide2026() {
  const [selection, setSelection] = useState("");

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: "0.85rem", marginBottom: "0.5rem" }}>🏡 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>DFW Marble Countertop Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Marble is breathtaking — but DFW hard water and acidic foods are marble worst enemies. Know before you buy.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "💧", title: "DFW Hard Water Etches Fast", body: "DFW water is highly alkaline. Combined with acidic foods (lemon, wine, tomato), marble etches into a dull, rough surface within months. pH-neutral cleaners are non-negotiable." },
            { icon: "🛡️", title: "Seal Every 6 Months", body: "Unlike granite (annual), marble requires sealing every 6 months in DFW conditions. Skip a cycle and hard water deposits become permanent staining." },
            { icon: "🌡️", title: "Heat Resistant", body: "Marble is natural stone — heat from pots and pans will not damage it. This is a genuine advantage over quartz for DFW homeowners who cook frequently." },
            { icon: "🎨", title: "Best for Low-Use Surfaces", body: "Marble delivers maximum beauty with minimum risk in master baths, fireplace surrounds, and powder rooms — not busy DFW kitchens with daily cooking." },
          ].map((c) => (
            <div key={c.title} style={{ background: "#1a2744", borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{c.icon}</div>
              <div style={{ color: "#F5E642", fontWeight: 600, marginBottom: "0.4rem" }}>{c.title}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{c.body}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642", fontSize: "1.25rem", marginBottom: "1rem" }}>Marble Suitability by DFW Application</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {applications.map((a) => (
            <div key={a.location} style={{ background: "#1a2744", borderRadius: 10, padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
              <div>
                <div style={{ fontWeight: 600 }}>{a.location}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{a.lifestyle} · {a.reason}</div>
              </div>
              <div style={{ fontSize: "1.2rem", whiteSpace: "nowrap" }}>{a.suitable}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642", fontSize: "1.25rem", marginBottom: "1rem" }}>🎯 Is Marble Right for Your DFW Home?</h2>
        <div style={{ background: "#1a2744", borderRadius: 12, padding: "1.5rem" }}>
          <label style={{ color: "#94a3b8", fontSize: "0.85rem" }}>SELECT YOUR SITUATION</label>
          <select
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
            style={{ display: "block", width: "100%", marginTop: "0.5rem", padding: "0.75rem", borderRadius: 8, background: "#0A1628", color: "#fff", border: "1px solid #2d3f6b", fontSize: "1rem", marginBottom: "1rem" }}
          >
            <option value="">— Select your situation —</option>
            {Object.keys(suitabilityGuide).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          {selection && (
            <div style={{ background: "#0A1628", borderRadius: 8, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.4rem" }}>{suitabilityGuide[selection].verdict}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{suitabilityGuide[selection].advice}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: "2rem", background: "#1a2744", borderRadius: 10, padding: "1.25rem", borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>🔑 DFW Pro Tip</div>
          <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Consider quartzite if you love the marble look but need kitchen durability. Quartzite is harder than marble, resists DFW hard water better, and requires only annual sealing — giving you the aesthetic without the maintenance anxiety.</div>
        </div>
      </div>
    </div>
  );
}