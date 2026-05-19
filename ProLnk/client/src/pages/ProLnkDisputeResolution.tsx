import { useState } from 'react';

export default function ProLnkDisputeResolution() {
  const [disputeType, setDisputeType] = useState('');
  const [phase, setPhase] = useState(0);

  const disputeTypes = [
    { id: 'quality', label: '🔧 Poor Workmanship' },
    { id: 'incomplete', label: '⏳ Job Not Finished' },
    { id: 'pricing', label: '💰 Pricing Dispute' },
    { id: 'conduct', label: '🤝 Pro Conduct Issue' },
  ];

  const resolutionPaths: Record<string, { icon: string; title: string; desc: string }[]> = {
    quality: [
      { icon: '📸', title: 'Document the Issue', desc: 'Take clear photos/video of the problem area. The more detail the better for our team to assess.' },
      { icon: '📋', title: 'File a Claim', desc: 'Submit through the app within 30 days of job completion. Include your job ID and photos.' },
      { icon: '🧑‍⚖️', title: 'ProLnk Mediates', desc: 'Our team reviews within 5 business days. We contact both parties and review the job record.' },
      { icon: '🔄', title: 'Re-Service or Refund', desc: 'For verified quality issues: pro returns to fix at no charge, or ProLnk issues a full refund.' },
    ],
    incomplete: [
      { icon: '📝', title: 'Note What’s Missing', desc: 'List the specific tasks from your original quote that were not completed.' },
      { icon: '📋', title: 'File Incomplete Claim', desc: 'Submit within 48 hours. ProLnk flags the job and puts payment on hold.' },
      { icon: '📞', title: 'Contact Attempt', desc: 'ProLnk contacts the pro to schedule return visit within 48 hours.' },
      { icon: '💵', title: 'Partial Refund', desc: 'If pro cannot return, you are refunded for unfinished scope only.' },
    ],
    pricing: [
      { icon: '📄', title: 'Review Your Quote', desc: 'Compare final invoice to the original quote. Identify line items that differ.' },
      { icon: '💬', title: 'In-App Resolution', desc: 'Message your pro directly — most pricing questions resolve within an hour.' },
      { icon: '🧑‍⚖️', title: 'Escalate to ProLnk', desc: 'If unresolved, ProLnk reviews DFW standard rates and mediates a fair amount.' },
      { icon: '✅', title: 'Adjusted Payment', desc: 'If overcharge confirmed, difference is refunded. Charter pros are held to rate guidelines.' },
    ],
    conduct: [
      { icon: '⚠️', title: 'Report Immediately', desc: 'Use the in-app Report button on the job screen. All reports go directly to our safety team.' },
      { icon: '🔒', title: 'Account Review', desc: 'Pro account is flagged pending investigation. They cannot receive new matches.' },
      { icon: '📞', title: 'ProLnk Safety Call', desc: 'Our team calls you within 4 hours to gather details and ensure you are safe.' },
      { icon: '🚫', title: 'Removal if Confirmed', desc: 'Verified conduct violations result in permanent removal from the ProLnk network.' },
    ],
  };

  const steps = disputeType ? resolutionPaths[disputeType] : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🛡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>Dispute Resolution</h1>
          <p style={{ color: '#94a3b8′ }}>ProLnk mediates every dispute — 5 business day resolution guarantee</p>
        </div>

        {!disputeType && (
          <div>
            <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 24 }}>What type of issue are you experiencing?</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {disputeTypes.map(d => (
                <button key={d.id} onClick={() => { setDisputeType(d.id); setPhase(0); }}
                  style={{ background: '#1e3a5f', border: '2px solid #F5E642', borderRadius: 12, padding: '22px 16px', color: '#fff', fontSize: 16, cursor: 'pointer', fontWeight: 600 }}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {disputeType && steps.length > 0 && (
          <div>
            <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 32, textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{steps[phase].icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Step {phase + 1} of {steps.length}</div>
              <h2 style={{ color: '#fff', fontSize: 22, marginBottom: 12 }}>{steps[phase].title}</h2>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{steps[phase].desc}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              {phase > 0 && <button onClick={() => setPhase(p => p - 1)} style={{ background: 'transparent', border: '1px solid #334', borderRadius: 8, padding: '10px 24px', color: '#94a3b8', cursor: 'pointer' }}>← Back</button>}
              {phase < steps.length - 1
                ? <button onClick={() => setPhase(p => p + 1)} style={{ background: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 28px', color: '#0A1628', fontWeight: 700, cursor: 'pointer' }}>Next →</button>
                : <button onClick={() => { setDisputeType(''); setPhase(0); }} style={{ background: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 28px', color: '#0A1628', fontWeight: 700, cursor: 'pointer' }}>Start Over 🔄</button>
              }
            </div>
            <p style={{ textAlign: 'center', marginTop: 20, color: '#475569', fontSize: 13 }}>Need help now? Tap Support in the app or email support@prolnk.io</p>
          </div>
        )}
      </div>
    </div>
  );
}

