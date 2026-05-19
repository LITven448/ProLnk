import { useState } from 'react';

const tradeMarketing = {
  hvac: {
    label: 'HVAC Tech',
    channels: [
      { name: 'Google Business Profile', cost: 0, impact: 'Very High', tip: 'HVAC is high-intent search. "AC repair DFW" and "HVAC near me" are top searches Jun-Aug. Complete every GBP field, post weekly, respond to every review.' },
      { name: 'Nextdoor Ads', cost: 60, impact: 'High', tip: 'DFW neighborhoods share HVAC recommendations constantly. Seasonal posts before summer heat waves drive direct calls.' },
      { name: 'Truck Wrap', cost: 2800, impact: 'High', tip: 'HVAC vans are parked at DFW homes for 2-4 hours. Neighbors notice. Wrap pays back in 3-4 jobs.' },
      { name: 'Google Ads (LSA)', cost: 400, impact: 'Very High', tip: 'Local Service Ads appear above regular search. HVAC techs with Google Guaranteed badge close more DFW leads.' }
    ]
  },
  plumber: {
    label: 'Plumber',
    channels: [
      { name: 'Google Business Profile', cost: 0, impact: 'Very High', tip: 'Plumbing is emergency-driven. DFW homeowners search "plumber near me" when pipes burst. 4.8+ star average is critical.' },
      { name: 'Nextdoor Business Page', cost: 0, impact: 'High', tip: 'Free Nextdoor business page gets you in front of DFW homeowners asking for plumber recommendations.' },
      { name: 'Truck Wrap', cost: 2500, impact: 'Medium-High', tip: 'Plumbing trucks seen in a DFW neighborhood generate calls from neighbors with deferred maintenance.' },
      { name: 'Google Ads (LSA)', cost: 350, impact: 'High', tip: 'Pay per lead, not per click. DFW plumbing LSA leads convert at 35-50% vs 8-15% for standard ads.' }
    ]
  },
  electrician: {
    label: 'Electrician',
    channels: [
      { name: 'Google Business Profile', cost: 0, impact: 'Very High', tip: 'DFW electrical work often comes from home sales inspections. Reviews mentioning "panel upgrade" and "code compliance" rank well.' },
      { name: 'Angi/HomeAdvisor', cost: 200, impact: 'Medium', tip: 'Use for supplemental leads only. DFW electrical customers from these platforms price-shop more than ProLnk leads.' },
      { name: 'Truck Wrap', cost: 2200, impact: 'Medium', tip: 'Electrician trucks generate neighbor calls especially in DFW new developments with common electrical issues.' },
      { name: 'Facebook/Instagram Ads', cost: 250, impact: 'Medium-High', tip: 'Target DFW homeowners 30-65 with home ownership signals. Panel upgrade and EV charger ads perform well.' }
    ]
  },
  roofer: {
    label: 'Roofer',
    channels: [
      { name: 'Google Business Profile', cost: 0, impact: 'High', tip: 'DFW roofing is hail-storm driven. Update GBP immediately after storms with availability posts. Storm chasers flood the market - reviews differentiate you.' },
      { name: 'Door Hangers Post-Storm', cost: 150, impact: 'Very High', tip: 'After a DFW hail event, door hangers in affected zip codes convert at 8-15%. Fastest ROI in roofing marketing.' },
      { name: 'Truck Wrap', cost: 3500, impact: 'High', tip: 'Multiple trucks wrapped = perceived scale. DFW homeowners trust roofing companies that look established.' },
      { name: 'Nextdoor Storm Posts', cost: 0, impact: 'Very High', tip: 'Post availability after every DFW storm in affected neighborhoods. Neighborhood-level targeting is free and converts well.' }
    ]
  }
};

const budgets = {
  low: { label: 'Bootstrap ($0-200/mo)', max: 200 },
  mid: { label: 'Growing ($200-600/mo)', max: 600 },
  high: { label: 'Scaling ($600+/mo)', max: 9999 }
};

export default function DFWTradeMarketingGuide() {
  const [trade, setTrade] = useState('');
  const [budget, setBudget] = useState('');

  const t = trade ? tradeMarketing[trade as keyof typeof tradeMarketing] : null;
  const b = budget ? budgets[budget as keyof typeof budgets] : null;
  const filtered = t && b ? t.channels.filter(c => c.cost <= b.max) : t?.channels;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>PROLNK DFW PRO RESOURCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Trade Marketing Guide</h1>
        <p style={{ color: '#94a3b8', margin: '0 0 32px', lineHeight: 1.6 }}>ProLnk sends you qualified leads, but your own marketing multiplies your pipeline. DFW homeowners hire tradespeople they find AND recognize. Build a presence that makes you the obvious choice.</p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>Get Your DFW Marketing Priority List</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {Object.entries(tradeMarketing).map(([k, v]) => (
              <button key={k} onClick={() => setTrade(k)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: trade === k ? '#F5E642′ : '#1e3a5f', background: trade === k ? '#F5E642' : ’transparent', color: trade === k ? '#0A1628′ : '#fff', fontWeight: 700, cursor: ’pointer' }}>{v.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.entries(budgets).map(([k, v]) => (
              <button key={k} onClick={() => setBudget(k)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: budget === k ? '#F5E642′ : '#1e3a5f', background: budget === k ? '#F5E642' : ’transparent', color: budget === k ? '#0A1628′ : '#fff', fontWeight: 700, cursor: ’pointer' }}>{v.label}</button>
            ))}
          </div>
        </div>

        {filtered && (
          <div style={{ display: 'grid', gap: 16 }}>
            {filtered.map((channel, i) => (
              <div key={i} style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{channel.name}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ background: channel.cost === 0 ? '#14532d' : '#1e3a5f', color: channel.cost === 0 ? '#86efac' : '#93c5fd', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{channel.cost === 0 ? 'FREE' : '$' + channel.cost + '/mo'}</span>
                      <span style={{ background: channel.impact === 'Very High' ? '#713f12′ : '#1e3a5f', color: channel.impact === ’Very High' ? '#fde68a' : '#93c5fd', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{channel.impact} Impact</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642′ }}>#{i + 1}</div>
                </div>
                <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14, lineHeight: 1.6 }}>{channel.tip}</p>
              </div>
            ))}

            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>How to Get DFW Homeowner Reviews on ProLnk</div>
              {[
                'Ask at job completion while you are still on site. Verbal commitment converts at 60-70%.',
                'Text a direct review link within 30 min of finishing. SMS beats email for follow-through.',
                'Offer to walk them through the process if they have never left a review before.',
                'Respond to every review within 24 hours. DFW homeowners read responses.',
                'Use reviews in your next ProLnk bio update. Social proof compounds over time.'
              ].map((tip, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: i < 4 ? '1px solid #1e3a5f' : 'none', fontSize: 14, color: '#cbd5e1′ }}>{i + 1}. {tip}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
