import { useState } from 'react';

const stages = ['Just started looking', 'Actively touring homes', 'Found the one', 'Ready to submit offer'];

const checklist = [
  { id: 1, item: 'Pre-approval letter is current (within 90 days)', time: '1–3 days if expired', critical: true },
  { id: 2, item: 'Proof of funds ready for earnest money (1–2% of price)', time: '30 minutes', critical: true },
  { id: 3, item: 'Agent has reviewed the contract with you line by line', time: '1–2 hours', critical: true },
  { id: 4, item: 'Title company selected (your agent can recommend DFW options)', time: '15 minutes', critical: false },
  { id: 5, item: 'Homeowners insurance quote obtained (DFW hail zone — shop carefully)', time: '1 day', critical: true },
  { id: 6, item: 'Inspection company identified and available within option period', time: '30 minutes', critical: true },
  { id: 7, item: 'HOA docs requested if applicable (review before offer)', time: '1–3 days', critical: false },
  { id: 8, item: 'Offer strategy decided: price, terms, option period, closing date', time: '30 minutes', critical: true },
  { id: 9, item: 'Escalation clause prepared if market is competitive', time: '15 minutes', critical: false },
  { id: 10, item: 'Down payment funds confirmed and accessible', time: '1 day', critical: true },
];

export default function DFWOfferReadinessGuide() {
  const [stage, setStage] = useState('');
  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (id: number) =>
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const visible = stage
    ? stage === 'Ready to submit offer' ? checklist : checklist.filter(c => c.critical)
    : [];

  const pct = visible.length ? Math.round((checked.filter(id => visible.some(c => c.id === id)).length / visible.length) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>DFW OFFER READINESS GUIDE</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>📝 Before You Submit an Offer</h1>
          <p style={{ color: '#94a3b8', margin: '8px 0 0' }}>Don't leave money or protection on the table in a fast DFW market.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>📍 Where are you in the process?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {stages.map(s => (
              <button key={s} onClick={() => { setStage(s); setChecked([]); }} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: 8, border: stage === s ? '2px solid #F5E642' : '1px solid #e2e8f0', background: stage === s ? '#0A1628' : '#fff', color: stage === s ? '#F5E642' : '#0A1628', fontWeight: stage === s ? 700 : 400, cursor: 'pointer', fontSize: 15 }}>
                {stage === s ? '✅ ' : '○ '}{s}
              </button>
            ))}
          </div>
        </div>

        {stage && (
          <>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ fontWeight: 700 }}>
                  {stage === 'Ready to submit offer' ? '🔑 Full Readiness Checklist' : '⚡ Critical Items for Your Stage'}
                </div>
                <div style={{ background: pct === 100 ? '#dcfce7' : '#fef9c3', color: pct === 100 ? '#16a34a' : '#92400e', fontWeight: 700, fontSize: 14, padding: '4px 12px', borderRadius: 20 }}>
                  {pct}% Ready
                </div>
              </div>
              <div style={{ background: '#e2e8f0', borderRadius: 8, height: 8, marginBottom: 20 }}>
                <div style={{ width: `${pct}%`, height: 8, borderRadius: 8, background: pct === 100 ? '#16a34a' : '#F5E642', transition: 'width 0.3s' }} />
              </div>
              {visible.map(c => (
                <label key={c.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, cursor: 'pointer' }}>
                  <input type="checkbox" checked={checked.includes(c.id)} onChange={() => toggle(c.id)} style={{ marginTop: 3, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: checked.includes(c.id) ? 400 : 600, color: checked.includes(c.id) ? '#94a3b8' : '#0A1628', textDecoration: checked.includes(c.id) ? 'line-through' : 'none' }}>
                      {c.critical && <span style={{ color: '#dc2626', marginRight: 6 }}>★</span>}{c.item}
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>⏱️ Time to complete: {c.time}</div>
                  </div>
                </label>
              ))}
              {stage !== 'Ready to submit offer' && (
                <div style={{ marginTop: 8, fontSize: 13, color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                  💡 Switch to "Ready to submit offer" to see all 10 checklist items.
                </div>
              )}
            </div>

            {pct === 100 && (
              <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center', fontWeight: 700, fontSize: 18 }}>
                🎉 You're offer-ready! Talk to your agent and move fast — DFW moves quickly.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
