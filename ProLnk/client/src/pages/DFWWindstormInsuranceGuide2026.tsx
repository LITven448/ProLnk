import { useState } from 'react';

const windConcerns = [
  { id: 'deductible', label: '🌀 Wind/Hail Deductible', desc: 'DFW policies carry a separate wind/hail deductible — typically 1-2% of dwelling value. On a $400K home that\'s $4,000-$8,000 out of pocket before coverage kicks in.', tip: 'Ask your agent for the exact dollar amount of your wind/hail deductible and compare it across carriers.' },
  { id: 'coverage', label: '🏠 Standard Coverage', desc: 'Unlike coastal Texas homeowners who need a separate Texas Windstorm Insurance Association (TWIA) policy, DFW homeowners get wind coverage bundled in their standard HO-3 policy.', tip: 'Confirm your HO-3 declarations page lists wind and hail as covered perils — it should for DFW.' },
  { id: 'discount', label: '💰 Roof Discount', desc: 'Impact-resistant (Class 3 or Class 4) roofing materials can earn 15-30% discounts on wind/hail premiums in DFW. The savings often offset the cost of upgrading during a re-roof.', tip: 'Ask for a quote with Class 4 roofing — get the UL 2218 rating certificate from your roofer.' },
  { id: 'rating', label: '📊 DFW vs Gulf Coast', desc: 'DFW properties are rated in a much lower wind risk tier than Gulf Coast homes. Premiums reflect this — DFW wind coverage costs a fraction of what Galveston homeowners pay for TWIA.', tip: 'If an agent quotes Gulf-Coast-level wind premiums for a DFW address, get a second opinion immediately.' },
];

export default function DFWWindstormInsuranceGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = windConcerns.find(w => w.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '0.4rem 1rem', display: 'inline-block', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1rem' }}>DFW INSURANCE GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🌀 DFW Windstorm Insurance Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>Unlike coastal Texas, DFW homeowners get wind coverage in their standard HO-3 policy — but the details matter. Here is what every DFW homeowner needs to know about windstorm protection in 2026.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚡ Key DFW Wind Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['🗺️ Coverage Type', 'Standard HO-3 (not TWIA)'],['💸 Wind Deductible', '1-2% of dwelling value'],['🏆 Roof Discount', 'Up to 30% for Class 4 roofing'],['📍 Risk Tier', 'Lower than Gulf Coast — better rates']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.2rem' }}>{label}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>Select a windstorm concern for guidance:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {windConcerns.map(w => (
            <button key={w.id} onClick={() => setSelected(selected === w.id ? null : w.id)} style={{ background: selected === w.id ? '#F5E642' : '#112240', color: selected === w.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '0.9rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s' }}>{w.label}</button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>{active.label}</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1rem' }}>{active.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💡 Action: </span>
              <span style={{ color: '#94a3b8' }}>{active.tip}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>🔧 Get a ProLnk-Vetted Roofer</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>Class 4 impact-resistant roofing can save DFW homeowners thousands annually. ProLnk connects you only with licensed, insured roofing pros — no storm chasers, no door-knockers.</p>
        </div>
      </div>
    </div>
  );
}