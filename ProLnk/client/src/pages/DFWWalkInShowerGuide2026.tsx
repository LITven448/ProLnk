import { useState } from 'react';

const sizes = [
  { label: 'Small (under 40 sq ft)', budgets: [{ range: 'Under $5,000', scope: 'Curbless prefab insert, basic grab bars, linear drain.' }, { range: '$5,000–$8,000', scope: 'Full tile curbless, fold-down bench, handheld showerhead, ADA grab bars.' }] },
  { label: 'Medium (40–60 sq ft)', budgets: [{ range: 'Under $5,000', scope: 'Low-threshold base, tile walls, grab bar package.' }, { range: '$5,000–$8,000', scope: 'Full curbless conversion, niche shelving, frameless glass, ADA bar set.' }] },
  { label: 'Large (60+ sq ft)', budgets: [{ range: '$5,000–$8,000', scope: 'Curbless with bench, linear drain, tile walls, full glass enclosure.' }, { range: '$8,000+', scope: 'Luxury roll-in shower, heated floor, body sprays, fully custom tile.' }] },
];

export default function DFWWalkInShowerGuide2026() {
  const [sizeIdx, setSizeIdx] = useState<number | null>(null);
  const [budgetIdx, setBudgetIdx] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: 4, fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          DFW GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🚿 Walk-In Shower Conversion — DFW 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          Converting a tub to a walk-in shower is one of the top aging-in-place investments. DFW costs range $4,000–$8,000. Permits typically not required unless plumbing is relocated. Timeline: 5–7 days.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[{ label: 'DFW Avg Cost', value: '$4K–$8K', icon: '💰' }, { label: 'Project Timeline', value: '5–7 Days', icon: '📅' }, { label: 'Permit Required', value: 'Usually No', icon: '📋' }, { label: 'ROI at Resale', value: '~70%', icon: '📈' }].map(s => (
            <div key={s.label} style={{ background: '#132036', borderRadius: 10, padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>Step 1: What is your bathroom size?</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {sizes.map((s, i) => (
            <button key={i} onClick={() => { setSizeIdx(i); setBudgetIdx(null); }}
              style={{ background: sizeIdx === i ? '#F5E642' : '#132036', color: sizeIdx === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
              {s.label}
            </button>
          ))}
        </div>

        {sizeIdx !== null && (
          <>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>Step 2: Select your budget range</h2>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {sizes[sizeIdx].budgets.map((b, i) => (
                <button key={i} onClick={() => setBudgetIdx(i)}
                  style={{ background: budgetIdx === i ? '#F5E642' : '#132036', color: budgetIdx === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                  {b.range}
                </button>
              ))}
            </div>
          </>
        )}

        {sizeIdx !== null && budgetIdx !== null && (
          <div style={{ background: '#132036', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem', borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642' }}>Your Recommended Scope</h3>
            <p style={{ lineHeight: 1.7 }}>{sizes[sizeIdx].budgets[budgetIdx].scope}</p>
            <p style={{ color: '#94A3B8', fontSize: 13, marginTop: '0.75rem' }}>ADA grab bar placement: 33–36" from floor on side wall, 36" on back wall. Verify with your contractor.</p>
          </div>
        )}

        <div style={{ background: '#132036', borderRadius: 10, padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Get a DFW Walk-In Shower Quote</h3>
          <p style={{ color: '#94A3B8', marginBottom: '1rem', fontSize: 14 }}>ProLnk matches you with licensed, insured bathroom contractors in DFW who specialize in tub-to-shower conversions.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get Free Quotes from DFW Contractors →
          </button>
        </div>
      </div>
    </div>
  );
}