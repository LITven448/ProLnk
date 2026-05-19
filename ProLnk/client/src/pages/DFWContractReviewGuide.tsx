import { useState } from 'react';

const CONTRACT_ELEMENTS = [
  { id: 'scope', label: '📋 Detailed written scope of work', critical: true },
  { id: 'materials', label: '🧱 Materials specified by brand/model/grade', critical: true },
  { id: 'start', label: '📅 Project start date stated', critical: true },
  { id: 'end', label: '🏁 Estimated completion date stated', critical: true },
  { id: 'payment', label: '💳 Payment schedule tied to milestones', critical: true },
  { id: 'permits', label: '📋 Who pulls permits is specified (should be contractor)', critical: true },
  { id: 'cleanup', label: '🧹 Daily cleanup and final disposal responsibilities', critical: false },
  { id: 'warranty', label: '🛡️ Workmanship warranty (1yr minimum)', critical: true },
  { id: 'license', label: '✅ Contractor license number listed', critical: true },
  { id: 'insurance', label: '🔒 Proof of liability + workers comp insurance', critical: true },
  { id: 'change', label: '🔄 Change order process defined in writing', critical: false },
  { id: 'lien', label: '⚖️ Lien waiver provisions included', critical: false },
  { id: 'dispute', label: '🤝 Dispute resolution process stated', critical: false },
];

const RED_FLAGS = [
  '🚩 No permit mention — DFW requires permits for most structural, MEP work',
  '🚩 Vague scope like "remodel bathroom" with no measurements or specs',
  '🚩 Deposit >25% of total contract value',
  '🚩 Cash-only payment requirement',
  '🚩 No written warranty of any kind',
  '🚩 Contractor asks you to pull the permits (liability shifts to you)',
  '🚩 No license number or insurance certificates provided',
  '🚩 Pressure to sign same-day without review period',
];

export default function DFWContractReviewGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [scored, setScored] = useState(false);

  function toggle(id: string) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const criticalItems = CONTRACT_ELEMENTS.filter(e => e.critical);
  const criticalChecked = criticalItems.filter(e => checked[e.id]).length;
  const totalChecked = CONTRACT_ELEMENTS.filter(e => checked[e.id]).length;
  const score = Math.round((totalChecked / CONTRACT_ELEMENTS.length) * 100);
  const criticalScore = Math.round((criticalChecked / criticalItems.length) * 100);
  const missing = CONTRACT_ELEMENTS.filter(e => !checked[e.id]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Tools</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>📄 Contract Review Guide</h1>
        <p style={{ color: '#9BA3B4', marginBottom: '2rem' }}>Check every element before signing. Critical items are marked — missing even one is a reason to pause.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>✅ Contract Elements Checklist</h2>
          {CONTRACT_ELEMENTS.map(el => (
            <label key={el.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid #1E2E45', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!checked[el.id]} onChange={() => toggle(el.id)}
                style={{ marginTop: 3, accentColor: '#F5E642', width: 16, height: 16 }} />
              <span style={{ color: checked[el.id] ? '#F5E642′ : '#C8D0DC' }}>{el.label}</span>
              {el.critical && <span style={{ background: '#2A1A1A', color: '#FF6B6B', borderRadius: 4, padding: '0 6px', fontSize: '0.75rem', marginLeft: 'auto', whiteSpace: 'nowrap' }}>CRITICAL</span>}
            </label>
          ))}
          <button onClick={() => setScored(true)}
            style={{ marginTop: '1.25rem', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.85rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>
            Score My Contract →
          </button>
        </div>

        {scored && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📊 Contract Quality Score</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ color: '#9BA3B4', fontSize: '0.85rem' }}>Overall Score</div>
                <div style={{ color: score >= 80 ? '#4CAF50′ : score >= 60 ? '#F5E642' : '#FF6B6B', fontSize: '2rem', fontWeight: 800 }}>{score}%</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ color: '#9BA3B4', fontSize: '0.85rem' }}>Critical Items</div>
                <div style={{ color: criticalScore === 100 ? '#4CAF50′ : '#FF6B6B', fontSize: '2rem', fontWeight: 800 }}>{criticalScore}%</div>
              </div>
            </div>
            {missing.length > 0 && (
              <>
                <h3 style={{ color: '#FF6B6B', marginBottom: '0.75rem' }}>❌ Missing — Add Before Signing</h3>
                {missing.map(m => <div key={m.id} style={{ color: '#9BA3B4', padding: '0.35rem 0', borderBottom: '1px solid #1E2E45′ }}>• {m.label}</div>)}
              </>
            )}
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#FF6B6B', marginBottom: '1rem' }}>🚩 DFW Contract Red Flags</h2>
          {RED_FLAGS.map(r => <div key={r} style={{ color: '#9BA3B4', padding: '0.4rem 0′ }}>{r}</div>)}
        </div>
      </div>
    </div>
  );
}
