import { useState } from 'react';

const companies = [
  { name: 'Olshan Foundation Solutions', icon: '🏗️', type: 'Full-Service', score: 94, note: '50+ yr DFW legacy, transferable lifetime warranty, engineer oversight on all jobs' },
  { name: 'Perma-Pier', icon: '🔩', type: 'Texas-Focused', score: 91, note: 'Texas-only specialist, steel pier system designed for expansive clay soils' },
  { name: 'HD Foundations', icon: '📐', type: 'DFW Specialty', score: 89, note: 'DFW-exclusive, free structural engineer evaluation, pier + beam expertise' },
  { name: 'Ram Jack', icon: '🔨', type: 'National + Local', score: 87, note: 'Nationwide brand with strong DFW office, helical piers for challenging soils' },
];

const selectionGuide: Record<string, { company: string; reason: string }> = {
  'Slab Settlement': { company: 'Olshan Foundation Solutions', reason: 'DFW clay soil expertise + concrete pressed pier system — most common DFW fix' },
  'Pier & Beam': { company: 'HD Foundations', reason: 'DFW pier & beam specialists — older Dallas homes near White Rock Lake area' },
  'Expansive Clay Soil': { company: 'Perma-Pier', reason: 'Steel pier system engineered specifically for Texas black clay soil' },
  'Transferable Warranty': { company: 'Olshan Foundation Solutions', reason: 'Lifetime transferable warranty — increases home resale value in DFW' },
  'Challenging Soil': { company: 'Ram Jack', reason: 'Helical piers penetrate past problem soil layers — good for low-bearing capacity sites' },
};

const warnings = [
  'Always require a licensed structural engineer report — not just a sales inspection',
  'Transferable warranty is critical for DFW resale — verify before signing',
  'Get 3 bids minimum — DFW foundation repair prices vary by 40–60%',
  'Check for city permits — required for all foundation work in DFW municipalities',
];

export default function DFWFoundationBrandGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [need, setNeed] = useState<string>('Slab Settlement');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Foundation Brand Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Foundation repair companies serving Dallas-Fort Worth — clay soil specialists</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🌎 DFW Foundation Reality</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>
            DFW sits on expansive black clay (Vertisols) that swells 30–40% when wet and shrinks dramatically during drought. Over 60% of DFW homes experience foundation movement. This is not if — it is when. Understanding companies and methods before you need them saves thousands.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {companies.map(c => (
            <div key={c.name} onClick={() => setSelected(selected === c.name ? null : c.name)}
              style={{ background: selected === c.name ? '#1e3a5f' : '#112240', border: `1px solid ${selected === c.name ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: 16, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 16 }}>{c.name}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{c.type}</div>
                  </div>
                </div>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 10px', fontWeight: 800, fontSize: 14 }}>{c.score}/100</div>
              </div>
              {selected === c.name && <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 10, borderTop: '1px solid #1e3a5f', paddingTop: 10 }}>{c.note}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>🔍 Need → Company Selection Guide</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {Object.keys(selectionGuide).map(n => (
              <button key={n} onClick={() => setNeed(n)}
                style={{ background: need === n ? '#F5E642′ : '#0A1628', color: need === n ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 8, padding: '6px 14px', cursor: ’pointer', fontSize: 12, fontWeight: 600 }}>
                {n}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>✅ {selectionGuide[need].company}</div>
            <div style={{ color: '#cbd5e1', fontSize: 14, marginTop: 6 }}>{selectionGuide[need].reason}</div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 16, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>⚠️ What to Watch Out For</h2>
          {warnings.map((w, i) => <p key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>• {w}</p>)}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 28 }}>ProLnk connects you with DFW foundation pros who carry engineer certifications and transferable warranty programs.</p>
      </div>
    </div>
  );
}
