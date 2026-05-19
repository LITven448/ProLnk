import { useState } from 'react';

export default function DFWRoofingInsuranceCover2026() {
  const [damageType, setDamageType] = useState('');
  const [result, setResult] = useState<{ covered: string; detail: string } | null>(null);

  const damageTypes = [
    { id: 'hail', label: '🌨️ Hail damage' },
    { id: 'wind', label: '💨 Wind damage' },
    { id: 'wear', label: '⚙️ Normal wear and aging' },
    { id: 'improper', label: '🔨 Improper installation or defect' },
    { id: 'tree', label: '🌳 Tree fell on roof' },
    { id: 'ice', label: '🧊 Ice dam or freeze damage' },
  ];

  const guides: Record<string, { covered: string; detail: string }> = {
    hail: { covered: 'COVERED — Separate deductible applies', detail: 'Hail is the #1 insurance claim in DFW. Covered under dwelling policy. Important: most DFW policies have a separate wind/hail deductible of 1–2% of dwelling value (a $400K home = $4,000–$8,000 deductible). File within 12 months of the storm. Use a licensed roofing contractor for the estimate — not a door-to-door storm chaser.' },
    wind: { covered: 'COVERED — Same deductible as hail', detail: 'Wind damage lifting shingles, tearing flashing, or removing sections of roofing is covered. The same wind/hail deductible applies. Document missing shingles with photos the day after the storm. Check if neighbors also filed claims — it establishes the storm event date for your insurer.' },
    wear: { covered: 'NOT COVERED', detail: 'Gradual deterioration, granule loss, shingle cracking from age, and normal weathering are explicitly excluded. If an adjuster notes your roof was already aged and storm damage is minimal, they may deny or reduce the claim. Annual maintenance documentation helps establish pre-storm condition.' },
    improper: { covered: 'NOT COVERED (by your policy)', detail: 'Improper installation and manufacturer defects are the contractor’s or manufacturer’s liability, not your insurer’s. A workmanship warranty covers contractor errors (get one in writing). Manufacturer defects are covered by the shingle warranty — register your shingles within 30 days of installation.' },
    tree: { covered: 'COVERED — With nuances', detail: 'A tree falling on your roof is covered as a sudden and accidental event regardless of whose tree it was. Your policy covers the roof repair. Tree removal from the roof is usually covered up to $500–$1,000. However, your insurer may subrogate against the neighbor’s liability policy if their dead/diseased tree caused damage.' },
    ice: { covered: 'SOMETIMES COVERED', detail: 'Ice dams are rare in DFW but occurred during Winter Storm Uri (2021). Water intrusion caused by an ice dam is covered if sudden and accidental. Freeze damage to roofing materials may be covered. Document immediately after the freeze event — don’t wait until spring. Pre-existing leaks discovered after a freeze are typically excluded.' },
  };

  function evaluate() {
    if (!damageType) return;
    setResult(guides[damageType] || null);
  }

  const isCovered = result?.covered.startsWith('COVERED');
  const isPartial = result?.covered.startsWith('SOMETIMES');
  const borderColor = isCovered ? '#22C55E' : isPartial ? '#F5E642' : '#FF4444';
  const headerColor = isCovered ? '#22C55E' : isPartial ? '#F5E642' : '#FF6B6B';

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW Roofing Insurance Coverage Guide 2026
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            DFW averages 8+ hail storms per year. Know what your policy covers and how to document it before you need to file.
          </p>
        </div>

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔍 What Type of Roof Damage?</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {damageTypes.map(d => (
              <button key={d.id} onClick={() => { setDamageType(d.id); setResult(null); }}
                style={{ background: damageType === d.id ? '#F5E642' : '#1A2F4A', color: damageType === d.id ? '#0A1628' : '#E8EAF0', border: 'none', borderRadius: 8, padding: '14px 20px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
                {d.label}
              </button>
            ))}
          </div>
          <button onClick={evaluate} disabled={!damageType}
            style={{ marginTop: 20, width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '16px', fontWeight: 800, fontSize: 16, cursor: damageType ? 'pointer' : 'not-allowed', opacity: damageType ? 1 : 0.5 }}>
            Check Coverage Likelihood →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2139', borderRadius: 12, padding: 28, marginBottom: 28, borderLeft: `4px solid ${borderColor}` }}>
            <h3 style={{ color: headerColor, marginBottom: 12 }}>{result.covered}</h3>
            <p style={{ lineHeight: 1.7, fontSize: 15 }}>{result.detail}</p>
          </div>
        )}

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📋 DFW Roof Claim Tips</h3>
          <div style={{ display: 'grid', gap: 8, fontSize: 13 }}>
            {['📸 Photograph roof within 48 hours of any storm', '📅 File within 12 months — DFW standard deadline', '🚫 Avoid door-to-door storm chasers after hail', '💰 Know your wind/hail deductible before filing', '📂 Annual roof photos prove pre-storm condition'].map((item, i) => (
              <div key={i} style={{ background: '#1A2F4A', borderRadius: 8, padding: '10px 16px' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>🏠 Roof Documentation in Your Home Health Vault</p>
          <p style={{ color: '#1A2F4A', fontSize: 14 }}>ProLnk stores dated roof photos and contractor records — ready when you need to file.</p>
        </div>
      </div>
    </div>
  );
}
