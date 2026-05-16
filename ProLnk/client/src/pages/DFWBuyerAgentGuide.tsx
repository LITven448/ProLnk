import { useState } from 'react';

const situations = [
  { id: 'first', label: 'First-Time Buyer' },
  { id: 'repeat', label: 'Repeat Buyer' },
  { id: 'investor', label: 'Investor / Multiple Homes' },
  { id: 'relocation', label: 'Relocation — Unfamiliar with DFW' },
];

function getCriteria(situation: string, first: boolean) {
  const base = [
    'Signed buyer agency agreement before touring — required post-NAR settlement',
    'Commission disclosed upfront — no surprises at closing',
    'Dedicated to buyer interests only — no listing-side conflicts',
  ];
  if (situation === 'first' || first) return [...base, 'Patient educator — explains every document', 'Knows first-time buyer programs in DFW', 'Communication style that matches yours'];
  if (situation === 'investor') return [...base, 'Investment property expertise', 'Knows cap rates by DFW submarket', 'Access to off-market inventory'];
  if (situation === 'relocation') return [...base, 'Deep DFW neighborhood knowledge', 'Remote-friendly touring options', 'Familiar with corporate relocation packages'];
  return [...base, 'Efficient — respects your experience', 'Strong negotiator', 'Digital-first process preferred'];
}

function getQuestions(situation: string) {
  const universal = [
    'What does your buyer agency agreement include and how long does it last?',
    'How is your commission paid — and what if the seller will not cover it?',
    'How many buyers are you currently working with?',
    'What is your average days-to-close in DFW right now?',
  ];
  if (situation === 'first') return [...universal, 'What first-time buyer programs apply to me?', 'Walk me through offer to keys.'];
  if (situation === 'investor') return [...universal, 'What submarkets have the best rent-to-price ratios?', 'Do you have off-market or pre-MLS access?'];
  return [...universal, 'How do you handle multiple offers in DFW competitive submarkets?'];
}

export default function DFWBuyerAgentGuide() {
  const [situation, setSituation] = useState('');
  const [firstBuyer, setFirstBuyer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const criteria = situation ? getCriteria(situation, firstBuyer) : [];
  const questions = situation ? getQuestions(situation) : [];

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '6px 14px', borderRadius: 4, fontSize: 13, marginBottom: 16 }}>
          🏡 DFW BUYER GUIDE
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>Working with a Buyer Agent in DFW</h1>
        <p style={{ fontSize: 17, color: '#555', marginBottom: 36 }}>
          The 2024 NAR settlement changed how buyer agents are compensated. Here is what every DFW buyer needs to know before signing anything.
        </p>
        <div style={{ background: '#fff', border: '2px solid #0A1628', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 New NAR Rules 2024 — What Changed</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
            <li><strong>Buyer agency agreements now required</strong> before an agent shows you homes</li>
            <li>Sellers are <strong>no longer obligated</strong> to offer buyer-agent compensation via MLS</li>
            <li>You must negotiate agent compensation <strong>directly</strong> — from seller concession or out of pocket</li>
            <li>Compensation must be <strong>disclosed and agreed in writing</strong> before touring</li>
          </ul>
        </div>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⚠️ DFW Dual Agency — Avoid It</h2>
          <p style={{ lineHeight: 1.7, color: '#444' }}>
            Dual agency means one agent represents both buyer and seller. Legal in Texas but creates inherent conflict. The agent cannot fully advocate for your price while protecting the seller. In DFW where gaps between offer and list commonly exceed $50,000, dedicated representation matters.
          </p>
        </div>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔑 What a Buyer Agent Actually Does</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {['MLS and off-market listing access', 'Schedule and accompany showings', 'Competitive market analysis', 'Draft and negotiate your offer', 'Coordinate inspection and option period', 'Liaison with title, lender, seller agent', 'Review all disclosures and contracts', 'Attend closing with you'].map(item => (
              <div key={item} style={{ background: '#F0F4FF', borderRadius: 8, padding: '10px 14px', fontSize: 14 }}>✅ {item}</div>
            ))}
          </div>
        </div>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: 28, marginBottom: 28, color: '#fff' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🧮 Find Your Agent Criteria</h2>
          <p style={{ color: '#ccc', marginBottom: 20 }}>Select your situation to get agent selection criteria and key questions to ask</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => { setSituation(s.id); setShowResult(false); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: situation === s.id ? '#F5E642' : '#444', background: situation === s.id ? '#F5E642' : 'transparent', color: situation === s.id ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {s.label}
              </button>
            ))}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
            <input type="checkbox" checked={firstBuyer} onChange={e => setFirstBuyer(e.target.checked)} style={{ width: 18, height: 18 }} />
            <span style={{ color: '#ccc' }}>This is my first home purchase</span>
          </label>
          <button onClick={() => setShowResult(true)} disabled={!situation}
            style={{ background: situation ? '#F5E642' : '#333', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: situation ? 'pointer' : 'not-allowed', fontSize: 16 }}>
            Show My Criteria →
          </button>
          {showResult && situation && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>✅ Agent Selection Criteria</h3>
              {criteria.map(c => <div key={c} style={{ background: 'rgba(245,230,66,0.1)', borderLeft: '3px solid #F5E642', padding: '8px 14px', marginBottom: 8, borderRadius: 4, fontSize: 14 }}>{c}</div>)}
              <h3 style={{ color: '#F5E642', margin: '20px 0 12px' }}>❓ Questions to Ask Before Signing</h3>
              {questions.map(q => <div key={q} style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 14px', marginBottom: 8, borderRadius: 4, fontSize: 14, fontStyle: 'italic' }}>{q}</div>)}
            </div>
          )}
        </div>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>📌 DFW-Specific Notes</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 2, color: '#444' }}>
            <li>DFW has <strong>32 plus distinct submarkets</strong> — pick an agent who knows your target area</li>
            <li>Typical buyer agent fee: <strong>2.5 to 3 percent</strong> of purchase price, often negotiable</li>
            <li>Many DFW sellers still offer buyer-agent compensation — ask your agent to verify</li>
            <li>Interview at least <strong>two or three agents</strong> before signing any agreement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
