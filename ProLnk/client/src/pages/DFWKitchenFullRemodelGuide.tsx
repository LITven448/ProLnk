import { useState } from 'react';

const SQFT_OPTS = ['Under 150 sqft', '150–250 sqft', '250–400 sqft', '400+ sqft'];
const SCOPE_OPTS = ['Cabinet refacing only', 'New cabinets + counters', 'Full gut (no layout change)', 'Full gut + layout change'];
const BUDGET_OPTS = ['$20K–$40K', '$40K–$75K', '$75K–$120K', '$120K–$200K+'];

const TIMELINE: Record<string, string> = {
  'Cabinet refacing only': '2–3 weeks',
  'New cabinets + counters': '4–6 weeks',
  'Full gut (no layout change)': '8–10 weeks',
  'Full gut + layout change': '10–14 weeks — permits add 2–4 weeks in most DFW cities',
};

const COST_GUIDE: Record<string, Record<string, string>> = {
  'Under 150 sqft': { '$20K–$40K': '$22K–$38K', '$40K–$75K': '$42K–$68K', '$75K–$120K': '$78K–$110K', '$120K–$200K+': '$125K–$170K' },
  '150–250 sqft': { '$20K–$40K': 'Tight for full scope', '$40K–$75K': '$45K–$72K', '$75K–$120K': '$82K–$118K', '$120K–$200K+': '$130K–$185K' },
  '250–400 sqft': { '$20K–$40K': 'Budget too low', '$40K–$75K': 'Tight — refacing only', '$75K–$120K': '$88K–$125K', '$120K–$200K+': '$140K–$200K' },
  '400+ sqft': { '$20K–$40K': 'Budget too low', '$40K–$75K': 'Budget too low', '$75K–$120K': 'Partial scope only', '$120K–$200K+': '$155K–$220K+' },
};

export default function DFWKitchenFullRemodelGuide() {
  const [sqft, setSqft] = useState('');
  const [scope, setScope] = useState('');
  const [budget, setBudget] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const canGenerate = sqft && scope && budget;

  const includes = [
    { icon: '🏚️', label: 'Demo & haul-off', note: 'Full gut includes all cabinets, counters, flooring, sometimes ceilings' },
    { icon: '🔧', label: 'Plumbing rough-in', note: 'Moving sink or island requires permit + licensed plumber' },
    { icon: '⚡', label: 'Electrical', note: '20A dedicated circuits for appliances — code requirement in DFW' },
    { icon: '🪟', label: 'Open concept', note: 'DFW #1 preference — kitchen open to living room. Wall removal may be structural' },
    { icon: '🍽️', label: 'Island or peninsula', note: 'High demand in DFW; requires seating overhang + potential outlet' },
    { icon: '💡', label: 'Lighting layers', note: 'Under-cabinet, pendant over island, recessed ambient — all separate circuits' },
  ];

  const permits = [
    '✅ Moving/adding walls — structural permit required',
    '✅ Moving plumbing — plumbing permit required',
    '✅ Adding/moving electrical circuits — electrical permit required',
    '❌ No permit needed for cabinet swap, countertop swap, appliance swap (same location)',
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW REMODEL GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Full Kitchen Remodel Guide 🍳</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW buyers want open, functional kitchens. A full gut remodel is the highest-ROI project for resale in North Texas.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {includes.map(f => (
            <div key={f.label} style={{ background: '#132035', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{f.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{f.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>📋 DFW Permit Requirements</h2>
          <div style={{ display: 'grid', gap: '0.4rem' }}>
            {permits.map(p => <div key={p} style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{p}</div>)}
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 Build Your Remodel Plan</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[{ label: 'Kitchen Size', val: sqft, set: setSqft, opts: SQFT_OPTS },
              { label: 'Scope Level', val: scope, set: setScope, opts: SCOPE_OPTS },
              { label: 'Budget Range', val: budget, set: setBudget, opts: BUDGET_OPTS }].map(({ label, val, set, opts }) => (
              <div key={label}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {opts.map(o => (
                    <button key={o} onClick={() => { set(o); setShowPlan(false); }}
                      style={{ padding: '0.4rem 0.9rem', borderRadius: 6, border: `1px solid ${val === o ? '#F5E642' : '#2a3a55'}`, background: val === o ? '#F5E642′ : ’transparent', color: val === o ? '#0A1628′ : '#fff', cursor: ’pointer', fontSize: '0.82rem', fontWeight: val === o ? 700 : 400 }}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowPlan(true)} disabled={!canGenerate}
            style={{ marginTop: '1.5rem', padding: '0.75rem 2rem', background: canGenerate ? '#F5E642′ : '#2a3a55', color: canGenerate ? '#0A1628' : '#64748b', borderRadius: 8, border: ’none', fontWeight: 800, cursor: canGenerate ? 'pointer' : 'not-allowed', fontSize: '1rem' }}>
            Generate My Plan →
          </button>
        </div>

        {showPlan && sqft && scope && budget && (
          <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Your DFW Kitchen Remodel Plan</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Estimated Cost</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{COST_GUIDE[sqft]?.[budget] ?? 'Custom quote needed'}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Timeline</div>
                <div>{TIMELINE[scope]}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>DFW Market Notes</div>
                <div style={{ color: '#94a3b8', lineHeight: 1.6 }}>Open-to-living layout adds 5–8% to list price in DFW • Quartz counters preferred over granite • White/gray shaker cabinets sell fastest • Island seating is expected in homes over 2,000 sqft • Resale recoup: 65–80% depending on neighborhood</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
