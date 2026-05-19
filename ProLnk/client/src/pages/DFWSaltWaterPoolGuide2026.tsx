import { useState } from 'react';

const poolTypes = [
  { id: 'existing-chlorine', label: '🏊 Existing Chlorine Pool', steps: ['Test current calcium hardness — DFW avg 200-400 ppm; if >400 ppm, partial drain before conversion', 'Install salt chlorinator cell sized for your pool volume (1.5x capacity recommended for DFW heat)', 'Add pool-grade salt (NaCl) to reach 3,000-3,500 ppm — about 50 lbs per 2,000 gallons from zero', 'Run pump 8-10 hours to dissolve salt, then test with a digital salinity meter', 'Set cell to 50-60% output initially; dial in based on weekly FC tests', 'DFW hard water: clean cell every 90 days with diluted muriatic acid (10:1 water:acid)'] },
  { id: 'new-pool', label: '🆕 New Pool Build', steps: ['Specify salt system during design — plumbing and cell housing built in from day 1', 'Upgrade to a variable-speed pump; required for most modern salt systems and saves $400-600/year in DFW', 'Select a cell rated 50% larger than your pool volume to account for DFW heat load', 'Use a phosphate remover during initial startup — DFW water often has elevated phosphates', 'Dial in stabilizer (CYA) at 70-80 ppm for salt pools in full DFW sun exposure', 'Budget $2,500-4,000 for full salt system on a new build'] },
  { id: 'above-ground', label: '🔵 Above-Ground Pool', steps: ['Smaller salt systems available for above-ground ($400-800 all-in)', 'Above-ground pools heat faster in DFW sun — check salt levels weekly as temp swings affect readings', 'Use a sacrificial zinc anode to protect metal walls from electrolytic corrosion with salt water', 'Saltwater is gentler on vinyl liners than liquid chlorine bleach', 'Drain and winterize if temps forecast below 28°F — rare in DFW but plan ahead', 'Budget $500-1,000 for above-ground conversion'] },
];

export default function DFWSaltWaterPoolGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const steps = poolTypes.find(p => p.id === selected)?.steps ?? [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🧂</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Salt Water Pool Guide 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            Salt pools are booming in DFW — but DFW hard water creates unique calcium challenges. This guide covers
            everything from conversion costs to cell maintenance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '💰', label: 'Conversion: $1,500-2,500', desc: 'Typical DFW in-ground pool salt system installed' },
            { icon: '🔋', label: 'Cell Life: 3-5 Years', desc: 'Shorter in DFW hard water without quarterly cleaning' },
            { icon: '🧱', label: '3,000-3,500 ppm', desc: 'Target salt level for optimal chlorine generation' },
            { icon: '📉', label: 'Lower Running Cost', desc: 'Save $300-500/year vs chlorine tabs in DFW' },
          ].map(c => (
            <div key={c.label} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem', border: '1px solid #2d4a7a' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2d4a7a' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>⚠️ DFW Hard Water Warning</h2>
          <p style={{ color: '#94a3b8′ }}>DFW tap water averages 200-400 ppm calcium hardness. Salt chlorinators generate a slight pH rise which, combined with DFW hard water, accelerates calcium scaling on the cell plates. This is the #1 reason cells fail early in DFW. Quarterly acid washes and a CalHypo-free chemical approach keep your cell running at full capacity for its full 5-year life.</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', border: '1px solid #2d4a7a' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🏊 Select Pool Type → Salt Water Conversion Guide</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {poolTypes.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === p.id ? '#F5E642′ : '#2d4a7a', background: selected === p.id ? '#F5E642' : '#0A1628', color: selected === p.id ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600 }}>
                {p.label}
              </button>
            ))}
          </div>
          {steps.length > 0 && (
            <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {steps.map(s => <li key={s} style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>{s}</li>)}
            </ol>
          )}
          {!selected && <p style={{ color: '#94a3b8′ }}>Select your pool type above to see your DFW-specific salt conversion steps.</p>}
        </div>
      </div>
    </div>
  );
}