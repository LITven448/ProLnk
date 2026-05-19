import { useState } from 'react';

const situations = [
  { id: 'first-buy', label: 'First-time single buyer', icon: '🏠' },
  { id: 'safety', label: 'Safety is top priority', icon: '🔒' },
  { id: 'budget', label: 'All costs on one income', icon: '💰' },
  { id: 'size', label: 'Right-sizing for one person', icon: '📐' },
];

const guides: Record<string, { headline: string; items: { title: string; detail: string; dfwSpecific: string }[]; neighborhoods: { name: string; why: string; price: string }[] }> = {
  'first-buy': {
    headline: 'Single buyers are 17% of the market — you\’re not unusual, and you have real advantages',
    items: [
      { title: 'You move faster', detail: 'No need to align schedules or compromise on location — you decide and act', dfwSpecific: 'DFW median days on market is 18 — solo buyers can move same-day on offers' },
      { title: 'Qualifying alone', detail: 'Lenders look at your income only — ensure your DTI (debt-to-income) is under 43%', dfwSpecific: 'FHA loans at 3.5% down work well for single incomes in DFW\’s $300–400K range' },
      { title: 'Budget reality check', detail: 'Total housing cost (PITI + HOA) should be under 28% of gross monthly income', dfwSpecific: 'At $70K/yr income, target homes under $325K in DFW for comfortable margins' },
    ],
    neighborhoods: [
      { name: 'Addison', why: 'Walkable, vibrant, single-friendly, nightlife, restaurants', price: '$280–380K condos/townhomes' },
      { name: 'Uptown Dallas', why: 'Social scene, walkability, trendy restaurants, close to work', price: '$350–500K condos' },
      { name: 'Grapevine', why: 'Historic Main St, safe, charming, manageable size', price: '$350–450K homes' },
    ],
  },
  'safety': {
    headline: 'Safety is a practical priority for single homeowners — here\’s a DFW-specific approach',
    items: [
      { title: 'Alarm system first', detail: 'Install before move-in: ADT, SimpliSafe, Ring — monitored systems deter break-ins by 60%', dfwSpecific: 'SimpliSafe is popular in DFW — works on cell, no landline required, month-to-month contract' },
      { title: 'Neighborhood research', detail: 'Use SpotCrime.com, NeighborhoodScout, and city crime maps before buying', dfwSpecific: 'DFW crime varies dramatically by ZIP — 75201 (Downtown) vs 76244 (Keller) are completely different' },
      { title: 'Community matters', detail: 'An active HOA and engaged neighbors are your best security system', dfwSpecific: 'NextDoor app is very active in DFW suburbs — check neighbor engagement before buying' },
      { title: 'Smart home basics', detail: 'Video doorbell (Ring/Nest), motion lights, smart locks — total cost $400–600', dfwSpecific: 'Ring Doorbell works well in DFW heat — verified to operate up to 120°F' },
    ],
    neighborhoods: [
      { name: 'Southlake', why: 'Consistently ranked Texas\’s safest city, excellent schools', price: '$600K+ (premium)' },
      { name: 'Frisco', why: 'Top 10 safest in TX, active community, excellent lighting', price: '$450–650K' },
      { name: 'Allen', why: 'Low crime, walkable town center, camera systems throughout', price: '$380–520K' },
    ],
  },
  'budget': {
    headline: 'One income, all costs — budget precisely and build reserves before you need them',
    items: [
      { title: 'True monthly cost', detail: 'PITI (Principal+Interest+Tax+Insurance) + HOA + utilities + maintenance reserve', dfwSpecific: 'DFW property taxes are HIGH: 2.0–2.8% of assessed value/yr — add $500–700/mo on a $350K home' },
      { title: 'Emergency fund first', detail: 'Build 6 months of housing costs in savings BEFORE buying — single income has no backup', dfwSpecific: 'DFW HVAC replacement averages $6,000–12,000 — the Texas heat is brutal on systems' },
      { title: 'HOA-free options', detail: 'In DFW, many suburbs have HOA-free streets — saves $100–400/mo', dfwSpecific: 'Older Garland, Mesquite, Grand Prairie neighborhoods: HOA-free, affordable, single-family' },
      { title: 'Income growth runway', detail: 'Buy at 80% of what you technically qualify for — career income should grow into the payment', dfwSpecific: 'DFW job market is strong — median household income growing 4% annually, good long-term outlook' },
    ],
    neighborhoods: [
      { name: 'Mesquite', why: 'DFW\’s best value for singles — low property tax rate (relatively)', price: '$265–320K homes' },
      { name: 'Garland', why: 'HOA-free options, diverse, affordable, near DART', price: '$280–360K homes' },
      { name: 'Haltom City', why: 'Cheap entry price, Fort Worth proximity, improving area', price: '$220–290K homes' },
    ],
  },
  'size': {
    headline: 'DFW homes skew large — for single buyers, smaller is often smarter',
    items: [
      { title: 'Townhome advantage', detail: '1,400–2,000 sqft townhomes: lower maintenance, usually HOA covers exterior, lock-and-leave lifestyle', dfwSpecific: 'Addison, Plano, Grapevine townhome communities: ideal for single professionals' },
      { title: 'The large home trap', detail: 'A 3,000 sqft home at $450K = higher taxes, more maintenance, higher utilities for one person', dfwSpecific: 'TX summer electricity bills in a large home: $300–500/mo. Smaller home = $120–180/mo' },
      { title: 'Condo considerations', detail: 'DFW condos are viable — check HOA health, reserve fund, and rental cap before buying', dfwSpecific: 'Dallas condo market is thin but improving — Uptown and Addison have best inventory' },
      { title: 'Right-size with exit in mind', detail: 'A 2/2 in a desirable area will resell more easily than a 4/3 in a family suburb', dfwSpecific: 'Single-buyer neighborhoods in DFW: Addison, Uptown, McKinney downtown area' },
    ],
    neighborhoods: [
      { name: 'Addison townhomes', why: 'Perfect single-person density, walkable, lock-and-leave', price: '$350–480K' },
      { name: 'McKinney Historic District', why: 'Walkable, charming, good community, smaller homes', price: '$320–450K' },
      { name: 'Grapevine Old Town area', why: 'Walkable, active, right-sized homes, good community', price: '$340–460K' },
    ],
  },
};

export default function DFWSinglePersonHomeGuide() {
  const [selected, setSelected] = useState('');
  const result = guides[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🙋</div>
          <h1 style={{ fontSize: '2.2rem', color: '#F5E642', margin: '0.5rem 0′ }}>DFW Single Person Home Buyer Guide</h1>
          <p style={{ color: '#8A9BB5', fontSize: '1.05rem' }}>Buying alone in DFW — safety, budget, right-sizing, and the real numbers for one income</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#1A3A6F' : '#0F2040', border: `2px solid ${selected === s.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: '1.2rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
              <div style={{ color: selected === s.id ? '#F5E642′ : '#E8EDF5', fontWeight: 600, marginTop: 6 }}>{s.label}</div>
            </button>
          ))}
        </div>

        {result && (
          <div>
            <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ color: '#5BA4F5', fontWeight: 600, marginBottom: '1.2rem', fontSize: '1rem' }}>💡 {result.headline}</div>
              {result.items.map(item => (
                <div key={item.title} style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', marginBottom: '0.8rem' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>📌 {item.title}</div>
                  <div style={{ color: '#8A9BB5', fontSize: '0.88rem', marginBottom: 4 }}>{item.detail}</div>
                  <div style={{ color: '#5BA4F5', fontSize: '0.84rem' }}>🏙️ DFW: {item.dfwSpecific}</div>
                </div>
              ))}
              <div style={{ marginTop: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🏘️ DFW Neighborhoods for You:</div>
                {result.neighborhoods.map(n => (
                  <div key={n.name} style={{ display: 'flex', justifyContent: 'space-between', background: '#0A1628', borderRadius: 8, padding: '0.7rem 1rem', marginBottom: 6 }}>
                    <div>
                      <span style={{ color: '#E8EDF5', fontWeight: 600, fontSize: '0.9rem' }}>📍 {n.name} — </span>
                      <span style={{ color: '#8A9BB5', fontSize: '0.88rem' }}>{n.why}</span>
                    </div>
                    <div style={{ color: '#4ADE80', fontSize: '0.82rem', whiteSpace: 'nowrap', marginLeft: 12 }}>{n.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>📊 Single Buyer Reality Check</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
            {['Property tax on $350K DFW home = $7,000–9,800/yr ($583–816/mo)', 'Single buyer FHA: 3.5% down on $350K = $12,250 needed', 'Budget for 1–2% of home value/yr in maintenance ($3,500–7,000)', 'DFW HVAC runs April–October — central air is not optional', 'Lock-and-leave lifestyle: townhomes with HOA covering exterior', 'Security system priority: $25/mo monitored = best ROI safety spend'].map(f => (
              <div key={f} style={{ background: '#0A1628', borderRadius: 8, padding: '0.7rem', fontSize: '0.82rem', color: '#8A9BB5′ }}>⚡ {f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
