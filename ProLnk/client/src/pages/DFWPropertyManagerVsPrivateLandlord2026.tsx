import { useState } from 'react';

const portfolioData = {
  '1 property': {
    recommendation: 'Self-Manage',
    emoji: '🔧',
    reasoning: [
      'DFW PM fee on $1,800/mo rent = $144-$216/mo — significant cost for one property',
      'Learning landlord operations on one property is manageable',
      'ProLnk lets you source vetted contractors without a PM as middleman',
      'Single property: 2-4 maintenance calls per year on average in DFW',
      'You retain full control over tenant selection and lease terms',
    ],
    pmCost: '$144-$216/month for 8-12% PM fee on $1,800 avg DFW rent',
    prolnkRole: 'Use ProLnk to source plumbers, HVAC, electricians — skip PM markup on contractors',
  },
  '2-4 properties': {
    recommendation: 'Hybrid — ProLnk + Light PM',
    emoji: '⚖️',
    reasoning: [
      'At 3-4 properties, coordination overhead starts to grow',
      'Consider a leasing-only agent (DFW: ~1 month rent one-time) to find tenants, then self-manage',
      'Full PM at $144-216/mo × 4 properties = $576-$864/mo ongoing',
      'ProLnk can replace most contractor coordination — saves PM markup',
      'Still manageable with good systems — 1 maintenance call per month avg',
    ],
    pmCost: '$576-$864/month for full PM on 4 properties at avg DFW rent',
    prolnkRole: 'ProLnk as your contractor network — handles 80% of what a PM does on maintenance side',
  },
  '5-9 properties': {
    recommendation: 'Consider Professional PM',
    emoji: '🏢',
    reasoning: [
      'DFW PM becomes cost-efficient at scale vs your time value',
      'Vacancy coordination, lease renewals, 24/7 maintenance calls become burdensome',
      'Good DFW PMs: Granite Properties, Lincoln Property, Roscoe Properties',
      'Negotiate PM fee down at 5+ units (ask for 8% flat)',
      'Evaluate: what is your hourly rate vs PM hourly cost per unit',
    ],
    pmCost: '$720-$1,080/month for 5 properties — evaluate against your time value',
    prolnkRole: 'Even with PM, ProLnk gives you a second quote source — keeps PM contractors honest',
  },
  '10+ properties': {
    recommendation: 'Professional PM + In-House Coordinator',
    emoji: '🏗️',
    reasoning: [
      'At 10+ units, professional management is almost always justified in DFW',
      'Consider dedicated PM software (AppFolio, Buildium) for DIY operators at scale',
      'DFW: explore hiring a part-time property coordinator (W2 employee) at ~$40K/yr',
      'Portfolio insurance pricing and bulk contractor contracts become available',
      'Tax complexity increases — entity structure and depreciation strategy critical',
    ],
    pmCost: '$1,440-$2,160/month at 10 properties — may justify in-house hire',
    prolnkRole: 'ProLnk as preferred contractor network for your coordinator — consistent vetted pros',
  },
};

export default function DFWPropertyManagerVsPrivateLandlord2026() {
  const [portfolio, setPortfolio] = useState('');

  const guide = portfolioData[portfolio as keyof typeof portfolioData];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏘️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Property Manager vs Self-Managing 2026</h1>
          <p style={{ color: '#9AA3B2', fontSize: 15 }}>When to hire a PM in DFW — and when ProLnk makes self-management work</p>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <span>📊</span>
            <span style={{ fontSize: 14, color: '#F5E642', fontWeight: 600 }}>DFW PM fees: 8-12% of monthly rent. On a $1,800/mo DFW home that's $144-$216/month — or $1,728-$2,592 per year, per property.</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span>🔑</span>
            <span style={{ fontSize: 14, color: '#E8EAF0′ }}>What PMs do: tenant screening, lease execution, maintenance coordination, rent collection, legal compliance, and evictions. The key question: is their fee worth your time saved?</span>
          </div>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>Your Portfolio Size → PM vs Self-Manage Recommendation</label>
          <select value={portfolio} onChange={e => setPortfolio(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2A3A50', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
            <option value=''>Select your portfolio size...</option>
            {Object.keys(portfolioData).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        {guide && (
          <>
            <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 40 }}>{guide.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22, marginTop: 8 }}>Recommendation: {guide.recommendation}</div>
              <div style={{ color: '#9AA3B2', fontSize: 13, marginTop: 6 }}>{guide.pmCost}</div>
            </div>

            <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>📋 Why This Makes Sense for Your Portfolio</h2>
              {guide.reasoning.map(r => (
                <div key={r} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span>➡️</span>
                  <span style={{ fontSize: 14, color: '#E8EAF0′ }}>{r}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>🔗 ProLnk Role for Your Portfolio</h2>
              <div style={{ display: 'flex', gap: 10 }}>
                <span>⭐</span>
                <span style={{ fontSize: 14, color: '#E8EAF0′ }}>{guide.prolnkRole}</span>
              </div>
            </div>
          </>
        )}

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#9AA3B2', fontSize: 13 }}>DFW landlords: self-managing is easier with the right contractor network.</p>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginTop: 4 }}>ProLnk connects DFW landlords with vetted local pros — your maintenance network without PM fees.</p>
        </div>
      </div>
    </div>
  );
}