import { useState } from 'react';

const COMPARISONS = [
  { label: 'Who Shows Up', google: 'Paid Google Ads at top, then map listings — anyone who pays or has reviews', prolnk: 'Only pre-screened, background-checked, licensed contractors who applied and passed vetting' },
  { label: 'Vetting', google: 'Google Local Services Ads have some screening, standard results have none', prolnk: 'Criminal background check, license verification, and insurance confirmation — mandatory' },
  { label: 'Quote Process', google: 'Call each contractor individually — no structured comparison', prolnk: 'One job post gets 3 competing quotes delivered directly to you' },
  { label: 'Spam Risk', google: 'High — your number goes to whoever you call, no gatekeeping', prolnk: 'Low — ProLnk controls which contractors see your job, limited to 3′ },
  { label: 'Review Integrity', google: 'Reviews can be bought, gamed, or disputed away — not always reliable', prolnk: 'Performance scores tied to real completed jobs on the platform' },
  { label: 'Emergency Search', google: 'Must browse and call — slow for time-sensitive situations', prolnk: 'Urgent queue contacts available vetted pros within minutes' },
];

const SCENARIOS = [
  { label: 'Under $500 — Simple fix', rec: 'either', reason: 'Low-stakes job. Google Maps reviews can work fine, but ProLnk still gets you vetted contractors with competing quotes.' },
  { label: '$500–$5,000 — Mid-size project', rec: 'prolnk', reason: 'At this budget, license and insurance verification matters. ProLnk protects you from unqualified contractors.' },
  { label: 'Over $5,000 — Major renovation', rec: 'prolnk', reason: 'High-dollar work requires verified licensing, insurance, and accountability. Google results are unvetted.' },
  { label: 'Emergency — any budget', rec: 'prolnk', reason: 'ProLnk urgent queue connects you to vetted available pros faster than Google search + call + wait.' },
];

const VETTING_STEPS = [
  { emoji: '📋', step: 'Application Review', desc: 'Contractor submits trade, license number, service area, and insurance info' },
  { emoji: '🔍', step: 'Background Check', desc: 'Criminal history, sex offender registry, and identity verification' },
  { emoji: '📜', step: 'License Verification', desc: 'State license database check — trade-specific and current' },
  { emoji: '🛡️', step: 'Insurance Confirm', desc: "General liability and workers' comp certificate review" },
  { emoji: '✅', step: 'Activation', desc: 'Contractor goes live — performance score tracking begins immediately' },
];

export default function ProLnkVsGoogle() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const rec = SCENARIOS[selectedIdx].rec;
  const recLabel = rec === 'prolnk' ? '⚡ Use ProLnk' : '✅ Either works';
  const recColor = rec === 'prolnk' ? '#F5E642′ : '#93C5FD';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 38, marginBottom: 12 }}>🔎 ⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>ProLnk vs Google Search</h1>
          <p style={{ fontSize: 16, color: '#6B7280′ }}>Finding a contractor on Google vs using a vetted marketplace</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', backgroundColor: '#0A1628', padding: '14px 20px' }}>
            <div style={{ color: '#CBD5E1', fontSize: 13, fontWeight: 600 }}>CATEGORY</div>
            <div style={{ color: '#4285F4', fontSize: 13, fontWeight: 700 }}>🔎 Google Search</div>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>⚡ ProLnk</div>
          </div>
          {COMPARISONS.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', padding: '16px 20px', borderBottom: '1px solid #F3F4F6', backgroundColor: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#374151′ }}>{c.label}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', paddingRight: 12 }}>{c.google}</div>
              <div style={{ fontSize: 12, color: '#059669', paddingRight: 12 }}>{c.prolnk}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The ProLnk Vetting Process</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {VETTING_STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 16px', backgroundColor: '#F9FAFB', borderRadius: 8 }}>
                <span style={{ fontSize: 22 }}>{s.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628′ }}>{s.step}</div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Google or ProLnk?</h2>
          <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>Select your budget and job complexity:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {SCENARIOS.map((s, i) => (
              <button key={i} onClick={() => setSelectedIdx(i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selectedIdx === i ? '#F5E642′ : '#E5E7EB',
                  backgroundColor: selectedIdx === i ? '#F5E642′ : '#fff', color: '#0A1628', fontWeight: 600, fontSize: 12, cursor: ’pointer' }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#F9FAFB', borderRadius: 10, padding: 20, borderLeft: '4px solid ' + recColor }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>{recLabel}</div>
            <p style={{ fontSize: 13, color: '#4B5563', margin: 0 }}>{SCENARIOS[selectedIdx].reason}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0A1628', borderRadius: 16, padding: 36 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Stop Gambling on Google Results</h2>
          <p style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 22 }}>Get 3 quotes from vetted contractors — free for homeowners.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 32px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
            Join ProLnk Waitlist →
          </button>
        </div>
      </div>
    </div>
  );
}
