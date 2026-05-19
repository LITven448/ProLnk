import { useState } from 'react';

const tabs = [
  {
    id: 'buying',
    label: '🛒 Buying',
    headline: 'What to Know When Buying an HVAC System in DFW',
    items: [
      { title: 'Size It Right', desc: 'DFW homes need Manual J load calculations — never accept a "rule of thumb" sizing. Oversized units short-cycle and fail faster.' },
      { title: 'SEER2 Minimum', desc: 'Texas requires SEER2 14 minimum. DFW pros: go 16–18 SEER2 — payback is 5–7 years due to our 3,500+ cooling hours.' },
      { title: 'Heat Pump vs Gas', desc: 'Dual-fuel heat pump is the DFW sweet spot — efficient cooling + gas heat for the occasional below-40°F night.' },
      { title: 'Brand Matters Less Than Install', desc: 'Carrier, Trane, Lennox, Rheem — all good. A bad install ruins any brand. Choose the contractor, not just the equipment.' },
      { title: 'Get 3 Bids', desc: 'DFW replacement bids range $6,000–$16,000 for the same work. Always get 3 quotes from TrustyPro-verified pros.' },
    ],
  },
  {
    id: 'maintaining',
    label: '🔧 Maintaining',
    headline: 'DFW HVAC Maintenance Calendar',
    items: [
      { title: 'March Tune-Up', desc: 'Annual tune-up before DFW summer. Catches refrigerant loss, failing capacitors, and dirty coils before they fail at 105°F.' },
      { title: 'Monthly Filter Changes', desc: "DFW dust + pollen clogs filters fast. Run 1-inch MERV-8 and change monthly April–September. Don't skip it." },
      { title: 'Clear the Condenser', desc: 'Keep 2 feet clear around the outdoor unit. DFW storms dump debris — check after every major storm.' },
      { title: 'Coil Cleaning', desc: 'Evaporator coil cleaning every 2–3 years keeps efficiency up. Add it to your fall checkup.' },
      { title: 'Duct Inspection', desc: 'DFW attics reach 140°F+ — duct seals fail. Have ducts inspected every 5 years; leaky ducts waste 20–30% of your cooling.' },
    ],
  },
  {
    id: 'repairing',
    label: '🔨 Repairing',
    headline: 'DFW HVAC Repairs: What to Fix, What to Watch',
    items: [
      { title: 'Capacitor ($150–$300)', desc: 'Most common DFW summer failure. If your system hums but does not start, this is usually the issue. Fix immediately.' },
      { title: 'Refrigerant Recharge ($200–$600)', desc: 'Requires leak search first — just adding refrigerant without fixing the leak wastes money and harms performance.' },
      { title: 'Contactor ($100–$250)', desc: 'Switches power to compressor. Fails from DFW heat stress. Easy replacement; do not delay.' },
      { title: 'Blower Motor ($400–$800)', desc: 'Fan does not run → no airflow. In DFW summer, dangerous for elderly. Fix within 24 hours.' },
      { title: '5,000 Rule', desc: 'Age × Repair Cost > $5,000 = Replace. Example: 12-yr-old unit needing $500 repair = 12×500=$6,000 → replace.' },
    ],
  },
  {
    id: 'replacing',
    label: '🔄 Replacing',
    headline: 'DFW HVAC Replacement: The Complete Checklist',
    items: [
      { title: 'When to Replace', desc: 'System 13+ years old, repair cost >50% of replacement, two major failures in one season, or R-22 refrigerant system.' },
      { title: 'Best DFW Timing', desc: 'Replace in fall (Oct–Nov) or early spring (Feb–March) — contractor availability is better and prices are 10–15% lower.' },
      { title: 'What to Replace Together', desc: 'Always replace indoor and outdoor units together. Mismatched systems lose efficiency and void warranties.' },
      { title: 'Tax Credits Available', desc: 'Federal 25C credit: up to $2,000 for heat pumps, up to $600 for high-efficiency AC. Ask your contractor for Sec. 25C-eligible models.' },
      { title: 'Ductwork Assessment', desc: 'Ask contractor to assess duct condition during replacement — if ducts are 20+ years old, reseal or replace simultaneously.' },
    ],
  },
];

export default function DFWHVACAllinOne() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🌡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>
            DFW HVAC All-in-One Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            The complete DFW HVAC reference — Buying, Maintaining, Repairing, Replacing
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28, justifyContent: 'center' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t)}
              style={{
                padding: '12px 20px',
                borderRadius: 10,
                border: '2px solid',
                borderColor: activeTab.id === t.id ? '#F5E642' : '#1e3a5f',
                background: activeTab.id === t.id ? '#F5E642' : '#112240',
                color: activeTab.id === t.id ? '#0A1628' : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 14, padding: 28, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 24 }}>{activeTab.headline}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {activeTab.items.map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16, display: 'flex', gap: 14 }}>
                <div style={{ background: '#F5E642', color: '#0A1628', width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: '#e2e8f0' }}>{item.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>🏆 Why TrustyPro for DFW HVAC</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px', fontSize: 13 }}>✅ Licensed & background-checked DFW pros only</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px', fontSize: 13 }}>⭐ Verified reviews from real DFW homeowners</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px', fontSize: 13 }}>💰 Competitive bids — no price gouging</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px', fontSize: 13 }}>🏠 Home Health Vault integration included</div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>
            🌡️ Connect with a TrustyPro-verified DFW HVAC contractor today
          </p>
          <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15 }}>
            Get My Free DFW HVAC Quote
          </div>
        </div>
      </div>
    </div>
  );
}
