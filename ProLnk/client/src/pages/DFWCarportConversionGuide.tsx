import { useState } from 'react';

const CARPORT_SIZES = ['Single (10x20)', 'Double (20x20)', 'Oversized single (12x22)', 'Double wide (24x24+)'];
const INTENDED_USES = ['Enclosed garage (attached)', 'Enclosed garage (detached)', 'Living space addition', 'Workshop / storage', 'Mixed use — garage + storage'];
const HOA_STATUS = ['No HOA', 'HOA — approval pending', 'HOA — approved', 'HOA — unknown'];

const FEASIBILITY: Record<string, string> = {
  'Enclosed garage (attached)': 'High feasibility — most common DFW carport conversion. Requires foundation inspection, framing, exterior walls, garage door, and electrical.',
  'Enclosed garage (detached)': 'High feasibility if carport is detached. Same scope as attached but simpler permitting in some cities.',
  'Living space addition': 'Moderate — requires higher insulation standard, HVAC tie-in, and habitability permits. HOA approval critical.',
  'Workshop / storage': 'Easiest conversion — walls, lighting, and electrical only. Minimal permitting in most DFW cities.',
  'Mixed use — garage + storage': 'Common result: enclose half for garage door, partition remainder for storage or workshop.',
};

const COST_BY_USE: Record<string, Record<string, string>> = {
  'Single (10x20)': {
    'Enclosed garage (attached)': '$15K–$28K',
    'Enclosed garage (detached)': '$14K–$26K',
    'Living space addition': '$28K–$55K',
    'Workshop / storage': '$8K–$16K',
    'Mixed use — garage + storage': '$14K–$25K',
  },
  'Double (20x20)': {
    'Enclosed garage (attached)': '$22K–$40K',
    'Enclosed garage (detached)': '$20K–$38K',
    'Living space addition': '$45K–$85K',
    'Workshop / storage': '$12K–$22K',
    'Mixed use — garage + storage': '$20K–$35K',
  },
  'Oversized single (12x22)': {
    'Enclosed garage (attached)': '$18K–$32K',
    'Enclosed garage (detached)': '$16K–$30K',
    'Living space addition': '$32K–$60K',
    'Workshop / storage': '$10K–$18K',
    'Mixed use — garage + storage': '$16K–$28K',
  },
  'Double wide (24x24+)': {
    'Enclosed garage (attached)': '$30K–$55K',
    'Enclosed garage (detached)': '$28K–$50K',
    'Living space addition': '$55K–$100K+',
    'Workshop / storage': '$16K–$30K',
    'Mixed use — garage + storage': '$25K–$45K',
  },
};

const HOA_NOTES: Record<string, string> = {
  'No HOA': 'No HOA restriction. Proceed with city permit only.',
  'HOA — approval pending': 'Submit architectural review request before pulling city permit. Most DFW HOAs allow garage enclosures.',
  'HOA — approved': 'Proceed to city permit. Keep HOA approval letter on file during construction.',
  'HOA — unknown': 'Check CC&Rs and call HOA before any work. Unauthorized enclosures can require reversal at owner expense.',
};

export default function DFWCarportConversionGuide() {
  const [carportSize, setCarportSize] = useState('');
  const [intendedUse, setIntendedUse] = useState('');
  const [hoa, setHoa] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const canGenerate = carportSize && intendedUse && hoa;

  const scope = [
    { icon: '🏗️', label: 'Foundation', note: 'Existing slab assessed for cracks and level. Edge perimeter footings may be added.' },
    { icon: '🪵', label: 'Framing', note: 'Stud walls on open sides. Header over garage door opening.' },
    { icon: '🧱', label: 'Exterior', note: 'Match existing home siding — critical for permit approval in most DFW cities.' },
    { icon: '🚪', label: 'Garage door', note: '9x7 or 16x7 sectional door. Opener wiring included.' },
    { icon: '⚡', label: 'Electrical', note: 'Subpanel or circuit extension. Outlets, lighting, and opener circuit required.' },
    { icon: '🌡️', label: 'Insulation', note: 'Walls and door minimum. Ceiling insulation critical in DFW summer.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW REMODEL GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Carport Conversion Guide 🏠</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Thousands of DFW homes — especially 1960s–1980s builds — have carports instead of garages. Converting adds significant value.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {scope.map(s => (
            <div key={s.label} style={{ background: '#132035', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{s.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{s.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 Plan Your Conversion</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[{ label: 'Carport Size', val: carportSize, set: setCarportSize, opts: CARPORT_SIZES },
              { label: 'Intended Use', val: intendedUse, set: setIntendedUse, opts: INTENDED_USES },
              { label: 'HOA Status', val: hoa, set: setHoa, opts: HOA_STATUS }].map(({ label, val, set, opts }) => (
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
            Generate My Conversion Plan →
          </button>
        </div>

        {showPlan && carportSize && intendedUse && hoa && (
          <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Your Carport Conversion Plan</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Feasibility Assessment</div>
                <div style={{ color: '#94a3b8', lineHeight: 1.6 }}>{FEASIBILITY[intendedUse]}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Estimated Cost</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{COST_BY_USE[carportSize]?.[intendedUse] ?? 'Custom quote needed'}</div>
              </div>
              <div style={{ background: hoa === 'HOA — unknown' ? '#2a1a0a' : '#0A1628', padding: '1rem', borderRadius: 8, border: hoa === 'HOA — unknown' ? '1px solid #f97316' : 'none' }}>
                <div style={{ color: hoa === 'HOA — unknown' ? '#f97316' : '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>🏘️ HOA Note</div>
                <div style={{ color: '#94a3b8' }}>{HOA_NOTES[hoa]}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>DFW Resale Value Add</div>
                <div style={{ color: '#94a3b8' }}>Garage-to-carport conversions typically add $15K–$30K in appraised value in DFW. Detached garages add less than attached. Highest impact in suburbs like Garland, Mesquite, Irving where carport homes sell at discount.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
