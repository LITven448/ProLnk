import { useState } from 'react';

const situations = [
  { id: 'no-model', label: 'No family homeownership model', icon: '🗺️' },
  { id: 'limited-credit', label: 'Building credit from scratch', icon: '📊' },
  { id: 'down-payment', label: 'Down payment help needed', icon: '💰' },
  { id: 'process-confused', label: 'Confused about the process', icon: '❓' },
];

const resources: Record<string, { headline: string; programs: { name: string; what: string; amount: string; how: string }[]; parentGap: string; action: string }> = {
  'no-model': {
    headline: 'You\’re learning what your parents couldn\’t teach you — that\’s normal and fixable',
    programs: [
      { name: 'HUD-Approved Counseling (FREE)', what: 'One-on-one homebuyer education from certified counselors — they explain every step', amount: 'Free', how: 'Find via hud.gov/counseling' },
      { name: 'TSAHC First-Time Homebuyer', what: 'TX State Affordable Housing Corp — education + down payment assistance combo', amount: 'Up to 5% down payment help', how: 'tsahc.org — apply through approved lenders' },
      { name: 'Framework Homebuyer Course', what: 'Self-paced online education — covers everything from credit to closing', amount: '$75 one-time fee', how: 'frameworkhomeownership.org' },
    ],
    parentGap: 'Your parents may not know: you don\’t need 20% down, your credit score can be built in 12 months, and there are programs specifically for people like you.',
    action: 'Start with HUD counseling. It\’s free, unbiased, and will answer every question without pressure to buy anything.',
  },
  'limited-credit': {
    headline: 'Credit can be built intentionally in 12–18 months — you have more control than you think',
    programs: [
      { name: 'FHA Loan (580+ credit score)', what: 'Federal program designed for lower credit scores — 3.5% down if score is 580+', amount: '3.5% down payment minimum', how: 'Any FHA-approved lender in DFW — find at hud.gov/lenders' },
      { name: 'Secured Credit Card Path', what: 'Deposit $500, get a card, pay it off monthly — builds 6-12 months of positive history', amount: '$0 if you pay on time', how: 'Discover Secured or Capital One Platinum Secured are beginner-friendly' },
      { name: 'Credit Builder Loan', what: 'Small loan held in savings — you make payments, lender reports to all 3 bureaus', amount: '$10–25/mo for 12–24 months', how: 'Self Financial (self.inc) or local credit unions in DFW' },
    ],
    parentGap: 'Your parents may not know: credit score is not permanent. 12 months of on-time payments can move a 580 to a 680. That difference saves $40,000+ over a mortgage.',
    action: 'Pull your free credit reports at annualcreditreport.com. Find errors — 1 in 5 credit reports has a mistake that can be disputed for free.',
  },
  'down-payment': {
    headline: 'DFW has more down payment assistance programs than most buyers know about — you may qualify for multiple',
    programs: [
      { name: 'Texas Department of Housing (TDHCA)', what: 'My First Texas Home: 30yr fixed rate + 5% down payment assistance grant', amount: 'Up to 5% of loan amount', how: 'tdhca.state.tx.us — income limits apply' },
      { name: 'Dallas Homebuyer Assistance Program', what: 'City of Dallas: forgivable loan for down payment — goes to $0 after 5 years', amount: 'Up to $60,000 in some cases', how: 'dallascityhall.com/housing — 80% AMI income limit' },
      { name: 'Fort Worth Down Payment Assistance', what: 'City of Fort Worth: grants for first-gen buyers buying within city limits', amount: '$14,999–$25,000', how: 'fortworthtexas.gov/housing — income limits' },
    ],
    parentGap: 'Your parents may not know: down payment assistance programs exist specifically because generational wealth gaps exist. These programs are designed for exactly your situation — use them.',
    action: 'Contact a HUD-approved housing counselor in DFW to identify all programs you qualify for simultaneously. You may be able to stack multiple.',
  },
  'process-confused': {
    headline: 'The homebuying process has 12 steps — here\’s exactly what happens in order',
    programs: [
      { name: 'Step 1–3: Financial Prep', what: 'Check credit, save for down payment, get pre-approved by a lender', amount: 'Takes 2–6 months to prepare', how: 'Pre-approval letter is your shopping permission slip — get it first' },
      { name: 'Step 4–7: Find & Offer', what: 'Hire a buyer\’s agent (free to you — seller pays), tour homes, make an offer, negotiate', amount: 'Buyer agent = free', how: 'Your agent writes the offer. Earnest money (1–2%) holds the home during inspection.' },
      { name: 'Step 8–12: Close', what: 'Inspection, appraisal, final approval, walk-through, closing day — you get keys', amount: 'Closing costs: 2–5% of home price', how: 'Closing day: sign documents, pay closing costs, receive keys. It takes about 30–45 days from accepted offer.' },
    ],
    parentGap: 'Your parents may not know: buyer\’s agents are free to you (seller pays commission). You don\’t need to navigate this alone. A good agent explains every step and advocates for you.',
    action: 'Interview 2–3 buyer\’s agents in DFW. Ask: "Have you worked with first-generation homebuyers?" Their answer tells you everything.',
  },
};

export default function DFWFirstGenerationHomeownerGuide() {
  const [selected, setSelected] = useState('');
  const result = resources[selected];

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🌱</div>
          <h1 style={{ fontSize: '2.2rem', color: '#0A1628', margin: '0.5rem 0′ }}>DFW First-Generation Homeowner Guide</h1>
          <p style={{ color: '#5A7090', fontSize: '1.05rem' }}>Buying a home when your family has no homeownership tradition — resources, programs, and what your parents couldn't tell you</p>
        </div>

        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, padding: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
          <span style={{ color: '#1D4ED8', fontWeight: 700 }}>💙 You Belong Here: </span>
          <span style={{ color: '#1E40AF' }}>39% of Dallas-area homebuyers are first-generation. These programs exist because the system was built to help you — use them.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#0A1628′ : '#FFFFFF', color: selected === s.id ? '#F5E642' : '#1A2B3C', border: `2px solid ${selected === s.id ? '#0A1628' : '#E0E8F0'}`, borderRadius: 12, padding: '1.2rem', cursor: ’pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
              <div style={{ fontWeight: 600, marginTop: 6, fontSize: '0.95rem' }}>{s.label}</div>
            </button>
          ))}
        </div>

        {result && (
          <div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E0E8F0', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ color: '#1D4ED8', fontWeight: 600, marginBottom: '1.2rem', fontSize: '1rem' }}>💬 {result.headline}</div>
              {result.programs.map(p => (
                <div key={p.name} style={{ background: '#F8F9FA', borderRadius: 10, padding: '1rem', marginBottom: '0.8rem', borderLeft: '4px solid #0A1628′ }}>
                  <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 4 }}>📋 {p.name}</div>
                  <div style={{ color: '#5A7090', fontSize: '0.88rem', marginBottom: 4 }}>{p.what}</div>
                  <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem' }}>
                    <span><strong style={{ color: '#059669′ }}>💵 {p.amount}</strong></span>
                    <span style={{ color: '#5A7090′ }}>📌 {p.how}</span>
                  </div>
                </div>
              ))}
              <div style={{ background: '#FEF9C3', borderRadius: 10, padding: '1rem', marginTop: '0.5rem' }}>
                <div style={{ color: '#92400E', fontWeight: 700, marginBottom: 4 }}>👨‍👩‍👧 What Your Parents Might Not Know:</div>
                <div style={{ color: '#78350F', fontSize: '0.9rem' }}>{result.parentGap}</div>
              </div>
              <div style={{ background: '#DCFCE7', borderRadius: 8, padding: '0.8rem', marginTop: '0.8rem' }}>
                <span style={{ color: '#166534', fontWeight: 700 }}>✅ Your Next Action: </span>
                <span style={{ color: '#15803D', fontSize: '0.9rem' }}>{result.action}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#FFFFFF', border: '1px solid #E0E8F0', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', marginTop: 0, fontSize: '1.1rem' }}>📍 DFW First-Gen Friendly Neighborhoods</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
            {[['Grand Prairie', '$295–340K median, culturally diverse, DPA eligible'],['Garland', '$280–320K median, strong community orgs, TDHCA area'],['DeSoto', '$310–370K, excellent schools, Black homeownership community'],['Mesquite', '$265–310K, DFW\’s most affordable near-suburb, growing'],['Fort Worth (76112)', '$230–280K, Fort Worth DPA program eligible, improving'],['Irving', '$320–375K, diverse, Las Colinas jobs nearby, programs available']].map(([city, desc]) => (
              <div key={city} style={{ background: '#F8F9FA', borderRadius: 8, padding: '0.8rem' }}>
                <div style={{ color: '#0A1628', fontWeight: 700, fontSize: '0.85rem' }}>🏘️ {city}</div>
                <div style={{ color: '#5A7090', fontSize: '0.78rem', marginTop: 2 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
