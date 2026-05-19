import { useState } from 'react';

export default function ProLnkJobCompletionFlow() {
  const [step, setStep] = useState(0);
  const [outcome, setOutcome] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const outcomes = [
    { id: 'completed', label: '✅ Job Completed' },
    { id: 'partial', label: '⚠️ Partially Done' },
    { id: 'issue', label: '❌ Issue Occurred' },
  ];

  const steps = [
    { icon: '🏠', title: 'Homeowner Confirms Completion', desc: 'You receive a push notification asking if the job is done. One tap confirms.' },
    { icon: '⭐', title: 'Rate Your Pro', desc: '1-5 stars plus an optional comment. Takes 30 seconds and helps the whole network.' },
    { icon: '🏦', title: 'Health Vault Updated', desc: 'Job record — trade, date, pro, scope — auto-added to your Home Health Vault permanently.' },
    { icon: '🧾', title: 'Invoice Generated', desc: 'Itemized invoice created instantly. Sent to your email and stored in your account.' },
    { icon: '💸', title: 'Pro Paid Within 48 Hours', desc: 'Funds released to the pro after your confirmation. Charter pros guaranteed 48-hour payout.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>✅</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>Job Completion Flow</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>What happens the moment your ProLnk job wraps up</p>
        </div>

        {step === 0 && (
          <div>
            <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 24 }}>Select your job outcome to walk through the flow:</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              {outcomes.map(o => (
                <button key={o.id} onClick={() => { setOutcome(o.id); setStep(1); }}
                  style={{ background: '#1e3a5f', border: '2px solid #F5E642', borderRadius: 12, padding: '18px 28px', color: '#fff', fontSize: 16, cursor: 'pointer', fontWeight: 600 }}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step >= 1 && step <= 5 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
              {steps.map((_, i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: i + 1 <= step ? '#F5E642' : '#1e3a5f', color: i + 1 <= step ? '#0A1628' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{i + 1}</div>
              ))}
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 32, textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{steps[step - 1].icon}</div>
              <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 12 }}>{steps[step - 1].title}</h2>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{steps[step - 1].desc}</p>
              {step === 2 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
                    {[1,2,3,4,5].map(n => (
                      <span key={n} onClick={() => setRating(n)} style={{ fontSize: 32, cursor: 'pointer', color: n <= rating ? '#F5E642' : '#1e3a5f', filter: 'drop-shadow(0 0 2px #000)' }}>★</span>
                    ))}
                  </div>
                  <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Optional comment..." style={{ background: '#0A1628', border: '1px solid #334', borderRadius: 8, padding: '10px 14px', color: '#fff', width: '80%', fontSize: 14 }} />
                </div>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              {step > 1 && <button onClick={() => setStep(s => s - 1)} style={{ background: 'transparent', border: '1px solid #334', borderRadius: 8, padding: '10px 24px', color: '#94a3b8', cursor: 'pointer' }}>← Back</button>}
              {step < 5 ? <button onClick={() => setStep(s => s + 1)} style={{ background: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 28px', color: '#0A1628', fontWeight: 700, cursor: 'pointer' }}>Next Step →</button>
              : <button onClick={() => { setStep(0); setOutcome(''); setRating(0); }} style={{ background: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 28px', color: '#0A1628', fontWeight: 700, cursor: 'pointer' }}>Start Over 🔄</button>}
            </div>
          </div>
        )}

        {outcome === 'issue' && step === 1 && (
          <p style={{ textAlign: 'center', color: '#fbbf24', marginTop: 16 }}>⚠️ Issues? Our dispute team is here. Continue below or visit Dispute Resolution.</p>
        )}
      </div>
    </div>
  );
}

