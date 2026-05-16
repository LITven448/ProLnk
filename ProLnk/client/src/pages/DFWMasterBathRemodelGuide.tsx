import { useState } from 'react';

const BATH_SIZES = ['Small (under 80 sqft)', 'Medium (80-120 sqft)', 'Large (120-200 sqft)', 'Luxury (200+ sqft)'];
const LAYOUTS = ['Single vanity, tub/shower combo', 'Single vanity, separate tub & shower', 'Dual vanity, separate tub & shower', 'Open concept, walk-in only'];
const BUDGETS = ['$15K–$25K', '$25K–$45K', '$45K–$80K', '$80K–$150K+'];

const COST_MATRIX: Record<string, Record<string, string>> = {
  'Small (under 80 sqft)': { '$15K–$25K': '$18K–$23K', '$25K–$45K': '$28K–$38K', '$45K–$80K': '$50K–$65K', '$80K–$150K+': '$70K–$90K' },
  'Medium (80-120 sqft)': { '$15K–$25K': '$22K–$30K', '$25K–$45K': '$35K–$48K', '$45K–$80K': '$55K–$75K', '$80K–$150K+': '$85K–$120K' },
  'Large (120-200 sqft)': { '$15K–$25K': 'Budget too low for size', '$25K–$45K': '$40K–$58K', '$45K–$80K': '$65K–$88K', '$80K–$150K+': '$95K–$140K' },
  'Luxury (200+ sqft)': { '$15K–$25K': 'Budget too low for size', '$25K–$45K': 'Budget too low for scope', '$45K–$80K': '$70K–$95K', '$80K–$150K+': '$110K–$160K+' },
};

const RESALE_IMPACT: Record<string, string> = {
  'Small (under 80 sqft)': '60–70% cost recoup at resale',
  'Medium (80-120 sqft)': '70–80% cost recoup — DFW buyers prioritize this size',
  'Large (120-200 sqft)': '75–85% recoup — spa master baths command premium in Frisco/Plano',
  'Luxury (200+ sqft)': '65–75% recoup — luxury tier, target buyer pool narrows',
};

export default function DFWMasterBathRemodelGuide() {
  const [size, setSize] = useState('');
  const [layout, setLayout] = useState('');
  const [budget, setBudget] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const canGenerate = size && layout && budget;

  const features = [
    { icon: '🚿', label: 'Walk-in shower', note: 'DFW #1 request — frameless glass, rainfall head' },
    { icon: '🛁', label: 'Soaking tub', note: 'Freestanding preferred; ~60% of buyers skip in DFW' },
    { icon: '🪞', label: 'Dual vanity', note: 'Non-negotiable for resale in DFW market' },
    { icon: '🌡️', label: 'Heated floors', note: 'DFW winters short but cold — high ROI for feel' },
    { icon: '💡', label: 'Layered lighting', note: 'Vanity + ambient + accent circuits' },
    { icon: '🪟', label: 'Natural light', note: 'Tubular skylights common in DFW center-bath situations' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW REMODEL GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Master Bath Remodel Guide 🛁</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Spa-feel master baths are the #1 buyer request in DFW. Here's how to plan yours right.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {features.map(f => (
            <div key={f.label} style={{ background: '#132035', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{f.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{f.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 Build Your Remodel Plan</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[{ label: 'Bathroom Size', val: size, set: setSize, opts: BATH_SIZES },
              { label: 'Current Layout', val: layout, set: setLayout, opts: LAYOUTS },
              { label: 'Budget Range', val: budget, set: setBudget, opts: BUDGETS }].map(({ label, val, set, opts }) => (
              <div key={label}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {opts.map(o => (
                    <button key={o} onClick={() => { set(o); setShowPlan(false); }}
                      style={{ padding: '0.4rem 0.9rem', borderRadius: 6, border: `1px solid ${val === o ? '#F5E642' : '#2a3a55'}`, background: val === o ? '#F5E642' : 'transparent', color: val === o ? '#0A1628' : '#fff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: val === o ? 700 : 400 }}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowPlan(true)} disabled={!canGenerate}
            style={{ marginTop: '1.5rem', padding: '0.75rem 2rem', background: canGenerate ? '#F5E642' : '#2a3a55', color: canGenerate ? '#0A1628' : '#64748b', borderRadius: 8, border: 'none', fontWeight: 800, cursor: canGenerate ? 'pointer' : 'not-allowed', fontSize: '1rem' }}>
            Generate My Plan →
          </button>
        </div>

        {showPlan && size && layout && budget && (
          <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Your DFW Master Bath Plan</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Estimated Cost Range</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{COST_MATRIX[size]?.[budget] ?? 'See contractor for custom quote'}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>DFW Resale Impact</div>
                <div>{RESALE_IMPACT[size]}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Recommended Scope for DFW Market</div>
                <div style={{ color: '#94a3b8', lineHeight: 1.6 }}>Prioritize large walk-in shower over soaking tub • Dual vanity required for resale • Heated floors add ~$4K but high perceived value • Frameless glass enclosure • Quartz countertops on vanity • Permit required for any plumbing or electrical moves</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Timeline</div>
                <div>6–10 weeks typical in DFW • Tile lead times can add 2 weeks • Schedule inspections early</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
