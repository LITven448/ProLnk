import { useState } from 'react';

export default function DFWFoundationWireMeshGuide2026() {
  const [vintage, setVintage] = useState('');
  const [result, setResult] = useState('');

  const vintages = [
    { label: 'Built before 1970', key: 'pre1970′ },
    { label: 'Built 1970–1985', key: '70s85′ },
    { label: 'Built 1986–1999', key: '86to99′ },
    { label: 'Built 2000–2015', key: '2000s' },
    { label: 'Built 2016–present', key: 'modern' },
  ];

  const results: Record<string, string> = {
    pre1970: '🏚️ Likely unreinforced or minimal wire mesh (6x6 W1.4). Older DFW homes often have thinner slabs 3.5–4 inches. Expansive clay movement is your biggest concern. Engineer inspection recommended before any foundation work.',
    '70s85': '🔧 Wire mesh (6x6 W2.9) common in this era — adequate for the time but undersized for DFW clay. Watch for mid-slab cracking patterns. Many of these slabs have had previous repairs. Check for evidence of epoxy injection.',
    '86to99': '⚙️ Transition era — mix of wire mesh and early rebar (#3 at 18″ spacing). Some early post-tension systems appear. Check with original builder records if accessible. Reinforcement quality varies widely by subdivision.',
    '2000s': '🏗️ Rebar dominant (#3 or #4 at 12–18″ spacing) with growing post-tension adoption especially post-2005. Most DFW builders shifted to post-tension by 2008. Consult original engineering documents for your subdivision.',
    modern: '⚡ Almost certainly post-tension. DFW standard since mid-2000s. Fiber reinforcement may supplement as crack control. NEVER cut slab without detensiometer scan. Original slab plans should be available from builder or HOA.',
  };

  const types = [
    { icon: '🕸️', name: 'Wire Mesh', pros: 'Low cost, easy installation', cons: 'Weaker, prone to mid-slab cracks', era: 'Pre-1990′ },
    { icon: '🔩', name: 'Rebar', pros: 'Strong, reliable in DFW clay', cons: 'Higher cost, labor intensive', era: '1985–2005′ },
    { icon: '⚡', name: 'Post-Tension', pros: 'Best for DFW clay, thinner slab', cons: 'Cable cut risk, complex repairs', era: '1995–present' },
    { icon: '🧵', name: 'Fiber Reinf.', pros: 'Reduces micro-cracking', cons: 'Not structural, supplement only', era: '2010–present' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🕸️</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>DFW Wire Mesh vs Rebar Foundation Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>Foundation reinforcement in DFW — what's in your slab and what it means for repairs</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {types.map(t => (
            <div key={t.name} style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{t.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px', marginBottom: '4px' }}>{t.name}</div>
              <div style={{ color: '#64748B', fontSize: '11px', marginBottom: '10px' }}>Era: {t.era}</div>
              <div style={{ marginBottom: '6px' }}>
                <span style={{ color: '#22C55E', fontSize: '12px', fontWeight: '600′ }}>✅ {t.pros}</span>
              </div>
              <div>
                <span style={{ color: '#EF4444', fontSize: '12px', fontWeight: '600′ }}>⚠️ {t.cons}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>🏠 Home Vintage → Likely Reinforcement Type</h2>
          <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '16px' }}>Select your home's build era:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {vintages.map(v => (
              <button key={v.key} onClick={() => { setVintage(v.key); setResult(results[v.key]); }}
                style={{ background: vintage === v.key ? '#F5E642′ : '#1E3A5F', color: vintage === v.key ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: '8px', padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: '600′ }}>
                {v.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px' }}>
              <p style={{ color: '#E8EAF0', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{result}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>📊 DFW Reinforcement Facts</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {[
              { label: 'Wire Mesh Homes', value: '~40% of DFW stock', icon: '🕸️' },
              { label: 'Post-Tension Today', value: '70%+ new builds', icon: '⚡' },
              { label: 'Fiber as Supplement', value: 'Not structural alone', icon: '🧵' },
            ].map(f => (
              <div key={f.label} style={{ textAlign: 'center', padding: '12px', background: '#0A1628', borderRadius: '8px' }}>
                <div style={{ fontSize: '22px', marginBottom: '6px' }}>{f.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '13px' }}>{f.value}</div>
                <div style={{ color: '#64748B', fontSize: '11px', marginTop: '4px' }}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}