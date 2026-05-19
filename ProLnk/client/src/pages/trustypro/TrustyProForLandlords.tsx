import { useState } from 'react';

const configs = [
  { id: 'small-sfr', label: 'Small (1–5 SFR)', emoji: '🏠', help: 'Move-in / move-out scan pairs eliminate deposit disputes. AI documents every visible surface in 8 minutes. One prevented dispute covers your annual cost.', costPerUnit: '$4.17/mo per property', timeSaved: '4 hours per turnover on documentation' },
  { id: 'medium-sfr', label: 'Medium (6–20 SFR)', emoji: '🏘️', help: 'Portfolio condition dashboard shows all properties ranked by deferred maintenance score. Prioritize capital spend before it becomes emergency spend.', costPerUnit: '$3.50/mo per property at volume pricing', timeSaved: '12 hours/month on cross-property tracking' },
  { id: 'large-sfr', label: 'Large (21+ SFR)', emoji: '🏗️', help: 'Aggregate condition scoring by neighborhood, vintage year, or acquisition cohort. Identify patterns before they become portfolio-wide problems.', costPerUnit: '$2.80/mo per property at enterprise tier', timeSaved: '20+ hours/month — replaces one part-time inspection coordinator role' },
  { id: 'multifamily', label: 'Multifamily', emoji: '🏢', help: 'Unit-by-unit baseline scans at lease-up. Common area and exterior scans quarterly. Condition delta reports at every turnover automatically generated.', costPerUnit: '$1.90/mo per unit at multifamily pricing', timeSaved: '6 hours per unit turnover on documentation and dispute prep' },
];

export default function TrustyProForLandlords() {
  const [portfolio, setPortfolio] = useState(configs[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#050d1a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏘️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>TrustyPro for DFW Landlords</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 620, margin: '0 auto' }}>
            Visual AI documentation at move-in and move-out. Prevent deposit disputes before they start. Track condition across your entire portfolio in one dashboard.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '📸', title: 'Move-In Scan', desc: 'Timestamped, AI-verified baseline of every visible surface before tenant occupancy' },
            { emoji: '🔄', title: 'Move-Out Comparison', desc: 'Automatic delta report shows exactly what changed, with confidence score on each finding' },
            { emoji: '🗂️', title: 'Portfolio View', desc: 'All properties ranked by condition score, deferred maintenance, and maintenance history' },
            { emoji: '⚖️', title: 'Dispute Evidence', desc: 'AI-stamped reports are date-verified and exportable for small claims or mediation' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0f1f3d', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{f.emoji}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Why Deposit Disputes Are a Hidden Landlord Tax</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>
            In Texas, a landlord who improperly withholds a deposit can be liable for 3x the deposit amount plus attorney fees. The average contested deposit dispute in DFW costs $1,200–$2,400 in lost time, filing fees, and potential judgment. TrustyPro's move-in/move-out delta report is timestamped, AI-authenticated, and formatted for Texas JP Court submission — making disputes close faster and in your favor.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Select Your Portfolio</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {configs.map(c => (
              <button key={c.id} onClick={() => setPortfolio(c)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, background: portfolio.id === c.id ? '#4F46E5' : '#1e3a5f', color: '#fff' }}>
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          <div style={{ background: '#050d1a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#FACC15' }}>How TrustyPro Helps — {portfolio.label}</h3>
            <p style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7 }}>{portfolio.help}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#050d1a', borderRadius: 10, padding: 18, borderLeft: '4px solid #4F46E5' }}>
              <div style={{ color: '#4F46E5', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>💵 COST PER UNIT</div>
              <div style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 600 }}>{portfolio.costPerUnit}</div>
            </div>
            <div style={{ background: '#050d1a', borderRadius: 10, padding: 18, borderLeft: '4px solid #FACC15' }}>
              <div style={{ color: '#FACC15', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>⏱️ TIME SAVED</div>
              <div style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 600 }}>{portfolio.timeSaved}</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, background: '#4F46E5', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🚀</div>
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Built for DFW's Rental Market</h3>
          <p style={{ color: '#c7d2fe', fontSize: 15 }}>TrustyPro is tuned for Tarrant, Dallas, Collin, and Denton County property types — from 1970s brick ranch to new construction townhomes in Frisco and Prosper.</p>
        </div>
      </div>
    </div>
  );
}
