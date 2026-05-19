import { useState } from 'react';

const SITUATION_PROFILES: Record<string, { priorities: string[]; insight: string; prolnk: string }> = {
  'New homeowner (<2 years)': {
    priorities: ['Understand your foundation type and start a moisture routine immediately', 'Identify your panel brand — replace if Federal Pacific or Zinsco', 'Get a termite bond — not optional in DFW', 'Know your roof age and whether you have RCV or ACV insurance', 'Set up a soaker hose system before first summer drought'],
    insight: 'The first 2 years set habits that determine 10-year maintenance costs. DFW homes require active moisture management — passive ownership leads to foundation and plumbing damage that costs $15K–$50K to repair.',
    prolnk: 'ProLnk can connect you with a vetted home inspector for a new-owner baseline audit — plumbing, electrical, foundation, roof, and pest in one visit.',
  },
  'Established owner (2-10 years)': {
    priorities: ['Annual HVAC service before summer — DFW heat pushes systems to limit', 'Verify roof hail damage after every significant storm', 'Check water heater age — DFW hard water kills heaters in 6-8 years', 'Monitor foundation for new cracks or door binding after droughts', 'Re-evaluate pest control frequency — quarterly is DFW standard'],
    insight: 'Years 5–10 are when deferred maintenance compounds. HVAC units, water heaters, and roofs all approach end-of-life simultaneously in this window for many DFW homes.',
    prolnk: 'ProLnk pros handle all five of your priority areas. Bundle seasonal maintenance for better pricing.',
  },
  'Long-term owner (10+ years)': {
    priorities: ['Full electrical audit — panel capacity, GFCI/AFCI compliance, weatherhead condition', 'Slab plumbing leak detection — electronic listening test every 3 years', 'Foundation engineer report if you see new cracks or have not had one in 5 years', 'Roof replacement planning — DFW shingles rarely exceed 20 years with UV/hail', 'HVAC system efficiency review — replace if over 12 years old'],
    insight: 'Long-term DFW ownership means managing multiple concurrent system replacements. Budget $3K–$8K per year for capital maintenance is the professional standard for 20+ year DFW homes.',
    prolnk: 'ProLnk\’s Home Health Vault tracks your system ages and maintenance history — get ahead of replacements with scheduled bids.',
  },
  'Investor/landlord': {
    priorities: ['Annual professional inspection for each property', 'Termite bond and quarterly pest control — non-negotiable for rentals', 'HVAC filter replacement program for tenants', 'Document all foundation and plumbing conditions before each tenancy', 'Know your local rent-ready standards — HVAC, plumbing, and electrical must be code-compliant'],
    insight: 'Deferred maintenance in rental properties compounds faster than owner-occupied. DFW tenant standards are rising — HVAC failures and pest issues are top causes of complaint filings.',
    prolnk: 'ProLnk\’s portfolio tools let landlords manage multiple properties, schedule recurring service, and track maintenance documentation in one place.',
  },
};

export default function DFWHomeKnowledgeSummary2026() {
  const [situation, setSituation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const profile = situation ? SITUATION_PROFILES[situation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 32 }}>🌟</span>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>Ultimate DFW Homeowner Knowledge Summary 2026</h1>
          <p style={{ color: '#8B9BB4', margin: 0 }}>The complete DFW homeowner education — clay soil, hail alley, HVAC demands, hard water, property taxes, and ProLnk's role in protecting your home.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '🌍', title: 'Clay Soil', body: 'Blackland Prairie clay is the defining challenge of DFW homeownership. Every system — foundation, plumbing, landscaping — must account for 2–4 inch seasonal movement.' },
            { icon: '🌨️', title: 'Hail Alley', body: 'DFW is in the most hail-active corridor in North America. Class 4 impact-resistant roofing + RCV insurance is the baseline protection strategy — not optional.' },
            { icon: '🌡️', title: 'HVAC Demands', body: '100°F+ days June–September. HVAC runs 10–12 hours daily. Systems last 10–14 years in DFW vs. 18–20 in northern climates. Annual service is maintenance, not luxury.' },
            { icon: '💧', title: 'Hard Water', body: '15–25 GPG water hardness destroys water heaters, clogs fixtures, and shortens pipe life. Whole-home softener + filter is the single highest-ROI home system upgrade in DFW.' },
            { icon: '🏛️', title: 'Property Taxes', body: 'DFW property taxes average 2.1–2.8% — among the highest in the US. Protest your appraisal every year. File by May 15. Professional protest services charge 30% of savings only if they win.' },
            { icon: '🏘️', title: 'HOA Culture', body: 'DFW has one of the highest HOA penetration rates in the US — 65%+ of new communities. Understand CC&Rs before any exterior modification. Violations compound with daily fines in many HOAs.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2140', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6, fontSize: 14 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#A8B8CC', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 16px', fontSize: 18 }}>🏠 Your Personalized DFW Priority Summary</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ flex: 1, minWidth: 220, background: '#0A1628', border: '1px solid #2A4A6F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 14 }}>
              <option value="">Select your situation</option>
              {Object.keys(SITUATION_PROFILES).map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={() => setSubmitted(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Generate My Summary</button>
          </div>
          {submitted && profile && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12, fontSize: 16 }}>Your Top 5 DFW Priorities:</div>
              {profile.priorities.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span style={{ color: '#E8EAF0′ }}>{p}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: 14, background: '#0F2140', borderRadius: 8, border: '1px solid #1E3A5F' }}>
                <div style={{ color: '#8B9BB4', fontSize: 14, marginBottom: 10, fontStyle: 'italic' }}>💡 {profile.insight}</div>
                <div style={{ color: '#6EE7B7', fontSize: 14 }}>🤝 {profile.prolnk}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0F2140, #1A3A60)', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 10 }}>🏆 ProLnk: Your DFW Home's Command Center</div>
          <p style={{ color: '#A8B8CC', fontSize: 14, margin: '0 0 12px', lineHeight: 1.6 }}>ProLnk exists because DFW homeownership is uniquely demanding. Clay soil, hail alley, extreme heat, hard water, and high property taxes create a maintenance burden unlike any other US metro. We built ProLnk to give every DFW homeowner access to vetted, licensed professionals — no guesswork, no storm chasers, no kickbacks.</p>
          <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 600 }}>Every ProLnk partner: Licensed · Insured · Vetted · Local · Competitive</div>
        </div>
      </div>
    </div>
  );
}
