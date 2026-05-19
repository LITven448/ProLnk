import { useState } from 'react';

const DELIVERY_METHODS = {
  designBuild: { label: 'Design-Build', pros: ['Single contract', 'Faster delivery', 'Builder accountability'], cons: ['Less design control', 'Potential cost conflicts'], cost: '+5%', time: '14-18 months' },
  designBidBuild: { label: 'Design-Bid-Build', pros: ['Competitive bids', 'Architect advocates for you', 'Full design control'], cons: ['Slower process', 'Coordination risk', 'Change order exposure'], cost: 'Standard', time: '18-24 months' },
  ownerBuilder: { label: 'Owner-Builder', pros: ['Maximum savings potential', 'Full control'], cons: ['License required in TX', 'High time commitment', 'Financing harder'], cost: '-15%', time: '24-36 months' },
};

const BUDGET_TIERS = [
  { min: 0, max: 400000, rec: 'production', label: 'Production Builder', note: 'DR Horton, Lennar, Centex — limited customization, fastest timeline' },
  { min: 400000, max: 700000, rec: 'semiCustom', label: 'Semi-Custom Builder', note: 'Highland, Meritage, Perry — floor plan modifications, higher finish options' },
  { min: 700000, max: 99999999, rec: 'custom', label: 'Custom Builder', note: 'Fully bespoke — find licensed builder, hire architect separately' },
];

const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const LOAN_STEPS = [
  { step: 'Pre-qualify', note: 'Construction lenders require 20-25% down, 680+ credit score' },
  { step: 'Lot purchase', note: 'Often requires separate lot loan or cash — finalize before construction loan' },
  { step: 'Construction loan approval', note: 'Bank reviews builder plans, specs, and builder license' },
  { step: 'Draw schedule', note: 'Funds released in stages (foundation, framing, drywall, completion)' },
  { step: 'Convert to mortgage', note: 'One-time close or two-time close — one-time saves money but locks rate early' },
];

export default function DFWCustomHomeBuildGuide() {
  const [budget, setBudget] = useState(600000);
  const [location, setLocation] = useState('north');
  const [timeline, setTimeline] = useState(18);
  const [delivery, setDelivery] = useState('designBidBuild');

  const tier = BUDGET_TIERS.find(t => budget >= t.min && budget < t.max) || BUDGET_TIERS[2];
  const dm = DELIVERY_METHODS[delivery as keyof typeof DELIVERY_METHODS];

  const LOCATIONS = {
    north: 'North DFW (Collin/Denton County)',
    east: 'East DFW (Kaufman/Rockwall)',
    south: 'South DFW (Ellis/Johnson County)',
    core: 'Inner DFW (Dallas/Tarrant)',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 12 }}>
          DFW Construction Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Custom Home Building Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40 }}>
          From lot search to move-in — your complete roadmap for building a custom home in DFW.
        </p>

        <div style={{ background: '#0d1f38', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#F5E642′ }}>🎯 Find Your Path</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Total Budget</label>
              <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} step={50000}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 16, marginTop: 8, boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Timeline (months)</label>
              <input type="number" value={timeline} onChange={e => setTimeline(Number(e.target.value))} min={12} max={48}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 16, marginTop: 8, boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Location Preference</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, marginTop: 8 }}>
                {Object.entries(LOCATIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Delivery Method</label>
              <select value={delivery} onChange={e => setDelivery(e.target.value)}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, marginTop: 8 }}>
                {Object.entries(DELIVERY_METHODS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' as const }}>
            <div style={{ color: '#0A1628', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>RECOMMENDED APPROACH</div>
            <div style={{ color: '#0A1628', fontSize: 26, fontWeight: 900, marginBottom: 4 }}>{tier.label}</div>
            <div style={{ color: '#1a2a4a', fontSize: 14 }}>{tier.note}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {Object.entries(DELIVERY_METHODS).map(([key, val]) => (
            <div key={key} onClick={() => setDelivery(key)}
              style={{ background: delivery === key ? '#1a2a4a' : '#0d1f38', border: `2px solid ${delivery === key ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: 20, cursor: 'pointer' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{val.label}</div>
              <div style={{ color: '#22c55e', fontSize: 13, marginBottom: 2 }}>Cost: {val.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Timeline: {val.time}</div>
              {val.pros.slice(0, 2).map(p => <div key={p} style={{ color: '#cbd5e1', fontSize: 12, marginBottom: 3 }}>+ {p}</div>)}
              {val.cons.slice(0, 1).map(c => <div key={c} style={{ color: '#94a3b8', fontSize: 12 }}>- {c}</div>)}
            </div>
          ))}
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 16, padding: 28, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🏦 Construction Loan Process</h3>
          {LOAN_STEPS.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{item.step}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a0d0d', borderRadius: 16, padding: 24, border: '1px solid #4a1e1e' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#ef4444′ }}>🚩 Builder Vetting Red Flags</h3>
          {['Unlicensed contractor (verify at TDLR.texas.gov)', 'Cannot provide 3+ references from last 2 years', 'Asks for more than 10% upfront before any work', 'No written draw schedule or payment milestones', 'Vague contract language around change order pricing', 'Cannot show proof of liability insurance and workers comp'].map(flag => (
            <div key={flag} style={{ color: '#fca5a5', fontSize: 14, marginBottom: 8 }}>⚠️ {flag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
