import { useState } from 'react';

export default function ProLnkCommunicationGuide() {
  const [scenario, setScenario] = useState('');

  const scenarios = [
    { id: 'first_contact', label: '👋 First Contact After Match' },
    { id: 'scheduling', label: '📅 Scheduling the Job' },
    { id: 'no_response', label: '🔕 Pro Not Responding' },
    { id: 'personal_info', label: '📱 Pro Asks for Personal Number' },
    { id: 'job_change', label: '📝 Scope Change Request' },
    { id: 'after_job', label: '✅ After Job Complete' },
  ];

  const guides: Record<string, { icon: string; rule: string; howTo: string; vault: boolean; warning?: string }> = {
    first_contact: {
      icon: '💬',
      rule: 'All first contact happens in-app via ProLnk Messenger.',
      howTo: 'After a match is confirmed, both parties receive an in-app notification. Open the job thread and introduce yourself. Charter pros are expected to respond within 60 minutes.',
      vault: false,
    },
    scheduling: {
      icon: '📅',
      rule: 'All scheduling conversations must stay in ProLnk Messenger.',
      howTo: 'Use the Schedule tab inside the job thread to propose times. The pro confirms directly in-app. Your confirmed appointment is stored in your account and added to your calendar automatically.',
      vault: true,
    },
    no_response: {
      icon: '⏰',
      rule: 'Charter pros must respond within 60 minutes or the match can be reassigned.',
      howTo: 'If you haven't heard back after 60 minutes, tap "Request New Pro" in the job thread. ProLnk logs the no-response, flags the pro's response score, and dispatches a new Charter match immediately.',
      vault: false,
    },
    personal_info: {
      icon: '🚫',
      rule: 'Pros may NOT request personal phone numbers or emails before match confirmation.',
      howTo: 'If a pro asks you to take the conversation off-platform before the job is confirmed, tap Report in the thread. This is a policy violation. All communication must stay in-app until both parties choose to share contact info after confirmation.',
      vault: false,
      warning: '⚠️ Never share personal contact info before the match is confirmed — doing so removes ProLnk dispute protections.',
    },
    job_change: {
      icon: '📝',
      rule: 'Any scope changes must be documented in the ProLnk job thread.',
      howTo: 'If you or your pro want to change the job scope, message the change request in the app before any additional work starts. The pro can then submit a revised quote. Both parties tap Agree to make it official and update the job record.',
      vault: true,
    },
    after_job: {
      icon: '⭐',
      rule: 'Post-job communication can move off-platform — but job records stay in the Vault.',
      howTo: 'Once a job is marked complete and both parties confirm, you may share contact info freely. All job history — messages, quotes, scope, rating — are permanently stored in your Home Health Vault for future reference and warranty tracking.',
      vault: true,
    },
  };

  const selected = scenario ? guides[scenario] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>💬</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>Communication Standards</h1>
          <p style={{ color: '#94a3b8' }}>How pros and homeowners communicate on ProLnk — safely and on the record</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 40 }}>
          {[
            { icon: '🔒', label: 'All In-App' },
            { icon: '⏱️', label: '60-Min Response' },
            { icon: '🏦', label: 'Vault Recorded' },
          ].map(item => (
            <div key={item.label} style={{ background: '#1e3a5f', borderRadius: 12, padding: '18px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#94a3b8', marginBottom: 16, fontWeight: 600 }}>Select a communication scenario:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
          {scenarios.map(s => (
            <button key={s.id} onClick={() => setScenario(s.id)}
              style={{ background: scenario === s.id ? '#F5E642' : '#1e3a5f', border: '2px solid #F5E642', borderRadius: 10, padding: '14px 14px', color: scenario === s.id ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
              {s.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1e3a5f', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 36 }}>{selected.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>The Rule</div>
                <p style={{ color: '#fff', margin: 0, fontSize: 15 }}>{selected.rule}</p>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #334', paddingTop: 16, marginBottom: selected.vault ? 12 : 0 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>How It Works</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6, margin: 0, fontSize: 14 }}>{selected.howTo}</p>
            </div>
            {selected.vault && (
              <div style={{ background: '#0d2e1a', borderRadius: 8, padding: '10px 14px', marginTop: 12, fontSize: 13, color: '#86efac' }}>
                🏦 This interaction is recorded in your Home Health Vault
              </div>
            )}
            {selected.warning && (
              <div style={{ background: '#2e1a0d', borderRadius: 8, padding: '10px 14px', marginTop: 12, fontSize: 13, color: '#fbbf24' }}>
                {selected.warning}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

