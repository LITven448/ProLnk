import { useState } from 'react';

const OPTIONS = [
  { id: 'greensky', name: 'GreenSky', emoji: '🌿', range: '$2K–$65K', apr: '6.99–17.99%', term: 'Up to 84 mo', best: 'Good credit (680+), large system' },
  { id: 'servicefinance', name: 'Service Finance', emoji: '🔧', range: '$1K–$55K', apr: '7.99–19.99%', term: 'Up to 144 mo', best: 'Fair credit (640+), long-term payoff' },
  { id: 'hfs', name: 'HFS Financial', emoji: '🏦', range: '$5K–$150K', apr: '5.49–17.99%', term: 'Up to 20 yr', best: 'Excellent credit, whole-home HVAC/solar' },
  { id: 'synchrony', name: 'Synchrony HOME Card', emoji: '💳', range: '$500–$25K', apr: '0% promo, then 26.99%', term: '12–18 mo deferred', best: 'Pay off in full within promo period' },
  { id: 'sofi', name: 'SoFi Personal Loan', emoji: '🤝', range: '$5K–$100K', apr: '8.99–25.81%', term: '24–84 mo', best: 'High income, strong credit, no home equity' },
];

const CREDIT_PROFILES = ['Excellent (750+)', 'Good (700–749)', 'Fair (650–699)', 'Rebuilding (<650)'];
const AMOUNTS = ['Under $5K', '$5K–$15K', '$15K–$30K', 'Over $30K'];

function rank(credit: string, amount: string): string[] {
  if (credit === 'Rebuilding (<650)') return ['servicefinance', 'synchrony'];
  if (amount === 'Under $5K') return ['synchrony', 'greensky', 'servicefinance'];
  if (amount === 'Over $30K') return ['hfs', 'sofi', 'greensky'];
  if (credit === 'Excellent (750+)') return ['hfs', 'sofi', 'greensky'];
  return ['greensky', 'servicefinance', 'sofi'];
}

export default function DFWHVACReplacementFinancing2026B() {
  const [credit, setCredit] = useState('');
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const ranked = credit && amount ? rank(credit, amount) : [];
  const active = OPTIONS.find(o => o.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW HVAC Replacement Financing 2026 — Part 2
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>All financing options for DFW HVAC replacement — find the right fit for your credit profile</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>🎯 Match My Credit Profile + Loan Amount</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>Credit Profile</label>
              <select value={credit} onChange={e => setCredit(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px', fontSize: 14 }}>
                <option value="">Select...</option>
                {CREDIT_PROFILES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>Loan Amount Needed</label>
              <select value={amount} onChange={e => setAmount(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px', fontSize: 14 }}>
                <option value="">Select...</option>
                {AMOUNTS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          {ranked.length > 0 && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <p style={{ color: '#F5E642', fontSize: 13, margin: '0 0 6px', fontWeight: 700 }}>Recommended order for your profile:</p>
              {ranked.map((id, i) => {
                const opt = OPTIONS.find(o => o.id === id);
                return opt ? <p key={id} style={{ color: '#CBD5E1', fontSize: 13, margin: '2px 0′ }}>{i + 1}. {opt.emoji} {opt.name}</p> : null;
              })}
            </div>
          )}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>💰 All Financing Options — Click to Compare</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 10, marginBottom: 24 }}>
          {OPTIONS.map(o => (
            <button key={o.id} onClick={() => setSelected(o.id === selected ? null : o.id)}
              style={{ background: selected === o.id ? '#1E3A5F' : '#112240', border: `2px solid ${selected === o.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 10px', cursor: 'pointer', color: '#fff', textAlign: 'center' }}>
              <div style={{ fontSize: 26 }}>{o.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 6 }}>{o.name}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{o.range}</div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 12px' }}>{active.emoji} {active.name}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[{label: 'Loan Range', val: active.range},{label: 'APR', val: active.apr},{label: 'Term', val: active.term},{label: 'Best For', val: active.best}].map(r => (
                <div key={r.label} style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
                  <div style={{ color: '#94A3B8', fontSize: 11 }}>{r.label}</div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginTop: 4 }}>{r.val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 12px' }}>Get HVAC quotes with financing options included</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            ❄️ Get HVAC Quotes in DFW
          </button>
        </div>
      </div>
    </div>
  );
}
