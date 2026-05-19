import { useState } from 'react';

const RENO_MAP: Record<string, Record<string, { costRange: string; timeline: string; permits: string[] }>> = {
  cosmetic: {
    small: { costRange: '$8–$18 per sq ft', timeline: '2–4 weeks', permits: ['No permit typically required for paint/carpet','Electrical permit if adding outlets','Verify with city if changing light fixtures'] },
    medium: { costRange: '$12–$22 per sq ft', timeline: '3–6 weeks', permits: ['Interior painting: no permit','Ceiling tile replacement: no permit','New electrical circuits: permit required','ADA compliance review recommended'] },
    large: { costRange: '$15–$25 per sq ft', timeline: '5–10 weeks', permits: ['Electrical permit for panel upgrades','Sprinkler modification if ceiling changes','Building dept notification for large projects','Fire marshal sign-off if egress changes'] },
  },
  partial: {
    small: { costRange: '$35–$60 per sq ft', timeline: '4–8 weeks', permits: ['Building permit required','Mechanical permit for HVAC changes','Electrical permit','Plumbing permit if adding restrooms'] },
    medium: { costRange: '$45–$80 per sq ft', timeline: '6–14 weeks', permits: ['Full building permit package','ADA compliance required for renovated areas','Fire marshal approval','Zoning verification for occupancy type'] },
    large: { costRange: '$55–$95 per sq ft', timeline: '10–20 weeks', permits: ['Architect-stamped drawings required','Building, mechanical, electrical, plumbing permits','Certificate of occupancy update','TI allowance negotiation with landlord'] },
  },
  full: {
    small: { costRange: '$65–$100 per sq ft', timeline: '8–14 weeks', permits: ['Full permit package required','Engineer-stamped structural if walls removed','ADA full compliance','Fire suppression review','CO required before occupancy'] },
    medium: { costRange: '$80–$130 per sq ft', timeline: '14–24 weeks', permits: ['Architect required','All trade permits','ADA path of travel compliance','Accessibility ramp if grade change','Updated fire alarm panel'] },
    large: { costRange: '$100–$160 per sq ft', timeline: '20–36 weeks', permits: ['Owner\’s rep recommended','All permits + city plan review','Energy code compliance (IECC)','Life safety plan','CO and TAS inspection'] },
  },
};

const scopeLabel: Record<string, string> = { cosmetic: 'Cosmetic Only', partial: 'Partial Renovation', full: 'Full Build-Out' };
const sizeLabel: Record<string, string> = { small: 'Under 3,000 sq ft', medium: '3,000–10,000 sq ft', large: 'Over 10,000 sq ft' };

export default function DFWOfficeRenovationGuide() {
  const [scope, setScope] = useState('');
  const [size, setSize] = useState('');
  const [result, setResult] = useState<{ costRange: string; timeline: string; permits: string[] } | null>(null);

  function calculate() {
    if (!scope || !size) return;
    setResult(RENO_MAP[scope]?.[size] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🏗️ DFW Office Renovation Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 12 }}>Office Renovations for <span style={{ color: '#F5E642' }}>DFW Small Businesses</span></h1>
        <p style={{ color: '#94A3B8', fontSize: 17, marginBottom: 36 }}>DFW office market is shifting. Open floor plans are giving way to hybrid models with focus rooms and collaboration zones. Here's how to renovate smart in 2026.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🏢', title: 'Open vs. Private Offices', body: 'Post-pandemic: 40% of DFW tenants moving to hybrid layouts. Mix of 70% open workstations + 30% enclosed offices/focus rooms shows highest employee satisfaction scores.' },
            { icon: '♿', title: 'ADA Compliance', body: 'Any renovation to an area requires bringing that zone to ADA compliance. Path of travel from public entrance to renovated space must also comply. Non-compliance risks $75K+ fines.' },
            { icon: '💻', title: 'IT Infrastructure', body: 'Plan conduit during renovation — not after. Cat6A for 10GB networks, dedicated circuits for server rooms, structured cabling in raised floors or ceiling trays.' },
            { icon: '❄️', title: 'HVAC Zone Control', body: 'Open offices need 1 zone per 2,000 sq ft. Private offices need individual zone control. VAV boxes (variable air volume) are standard in DFW commercial HVAC.' },
            { icon: '💰', title: 'TI Allowances', body: 'DFW landlords currently offering $35–$80/sq ft in tenant improvement allowances for 5-year leases. Negotiate before signing — it\’s your money to spend on the build-out.' },
            { icon: '📐', title: 'Design Trend: Biophilic', body: 'Plants, natural light, wood tones. DFW contractors report 25% increase in biophilic design requests since 2024. Adds $5–$15/sq ft but reduces sick days 15%.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F5E642' }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, border: '1px solid #F5E642', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>📊 Renovation Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Renovation Scope</label>
              <select value={scope} onChange={e => setScope(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select scope...</option>
                <option value="cosmetic">Cosmetic (paint, carpet, lighting)</option>
                <option value="partial">Partial (walls, HVAC, electrical)</option>
                <option value="full">Full Build-Out (gut renovation)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Office Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select size...</option>
                <option value="small">Small (under 3,000 sq ft)</option>
                <option value="medium">Medium (3,000–10,000 sq ft)</option>
                <option value="large">Large (over 10,000 sq ft)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Estimate Project →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #2A4A7F' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 17, marginBottom: 16 }}>{scopeLabel[scope]} — {sizeLabel[size]}</div>
              <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
                <div><span style={{ color: '#94A3B8', fontSize: 13 }}>COST ESTIMATE</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginTop: 4 }}>{result.costRange}</div></div>
                <div><span style={{ color: '#94A3B8', fontSize: 13 }}>TYPICAL TIMELINE</span><div style={{ color: '#E8EDF5', marginTop: 4 }}>{result.timeline}</div></div>
              </div>
              <div><span style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10 }}>PERMIT REQUIREMENTS</span>
                {result.permits.map((p, i) => <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}><span style={{ color: '#F5E642' }}>→</span><span style={{ color: '#E8EDF5', fontSize: 14 }}>{p}</span></div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: 26, marginBottom: 12 }}>🏗️</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Get Office Renovation Bids</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>ProLnk connects DFW businesses with licensed general contractors who specialize in commercial office renovation and TI build-outs.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Request Office Renovation Quotes →</button>
        </div>
      </div>
    </div>
  );
}
