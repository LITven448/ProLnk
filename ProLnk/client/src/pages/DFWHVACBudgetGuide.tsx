import { useState } from 'react';

const budgetTiers = [
  {
    id: 'budget',
    label: 'Budget',
    range: '$3,500 – $5,000',
    emoji: '💰',
    tagline: 'Basic replacement — functional cooling',
    whatYouGet: [
      '14 SEER2 single-stage AC (minimum DFW code)',
      'Entry-level brand (Goodman, Ameristar)',
      'Standard installation, no extras',
      'Basic programmable thermostat',
      '1-year labor warranty',
    ],
    tradeoffs: [
      'Higher energy bills — 14 SEER2 vs 18 SEER2 can cost $400+/yr extra in DFW',
      'No humidity control — hot humid DFW summers feel worse',
      'Shorter lifespan — expect 10–12 years vs 15–18 for premium',
      'No zoning — whole home one temp',
    ],
    verdict: '⚠️ Adequate if cash is tight, but DFW heat will drive up monthly bills. Budget at least $3,800 for a reputable installer.',
    adequate: false,
  },
  {
    id: 'midrange',
    label: 'Mid-Range',
    range: '$6,000 – $9,000',
    emoji: '🏅',
    tagline: 'Quality replacement — smart value for DFW',
    whatYouGet: [
      '16–17 SEER2 two-stage AC (handles DFW swing days well)',
      'Tier-2 brand (Carrier 24ACC, Trane XR15)',
      'Variable-speed air handler for better humidity control',
      'Smart thermostat (Ecobee or Nest included)',
      '5-year parts + 2-year labor warranty',
    ],
    tradeoffs: [
      'Upfront cost $2K–4K more than budget tier',
      'Savings of $300–600/yr on DFW energy bills — ROI in 5–7 years',
      'Still single-zone unless you add dampers ($800–1,500 more)',
    ],
    verdict: '✅ Best value for most DFW homeowners. Two-stage operation handles Texas shoulder seasons (March, October) much better than budget units.',
    adequate: true,
  },
  {
    id: 'premium',
    label: 'Premium',
    range: '$10,000 – $15,000',
    emoji: '⭐',
    tagline: 'Best efficiency — built for DFW summers',
    whatYouGet: [
      '18–21 SEER2 variable-speed inverter compressor',
      'Top brand (Carrier Infinity, Trane XV21, Lennox XC25)',
      'Humidity control down to 30% RH (critical for DFW)',
      'Multi-zone capability (2–4 zones included)',
      'IAQ add-ons: UV light, media filter, ventilator',
      '10-year parts + 5-year labor warranty',
    ],
    tradeoffs: [
      'Highest upfront cost — not always right if you plan to sell soon',
      'Complex systems need trained technicians for service',
      'Energy savings of $600–900/yr — ROI in 12–15 years in DFW',
    ],
    verdict: '✅ Right choice if you plan to stay 10+ years, have DFW allergies/asthma, or value comfort over cost. Inverter tech excels in DFW extreme heat.',
    adequate: true,
  },
];

export default function DFWHVACBudgetGuide() {
  const [selected, setSelected] = useState('midrange');
  const tier = budgetTiers.find((t) => t.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>💵</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW HVAC Budget Guide</h1>
          <p style={{ color: '#9BB0CC', margin: 0 }}>What does your DFW HVAC budget actually get you?</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
          {budgetTiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              style={{
                padding: '0.6rem 1.4rem', borderRadius: 8, border: '2px solid',
                borderColor: selected === t.id ? '#F5E642' : '#1E3A5F',
                background: selected === t.id ? '#F5E642' : '#112240',
                color: selected === t.id ? '#0A1628' : '#fff',
                fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >{t.emoji} {t.label}<br /><span style={{ fontSize: '0.75rem', fontWeight: 400 }}>{t.range}</span></button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ color: '#F5E642', marginTop: 0 }}>{tier.emoji} {tier.label} — {tier.range}</h2>
              <p style={{ color: '#9BB0CC', margin: 0 }}>{tier.tagline}</p>
            </div>
            <div style={{ background: tier.adequate ? '#0F4C2A' : '#4C1F0F', borderRadius: 8, padding: '0.4rem 0.8rem', fontSize: '0.85rem', fontWeight: 700, color: tier.adequate ? '#4ADE80' : '#FB923C', whiteSpace: 'nowrap' }}>
              {tier.adequate ? '✅ DFW Adequate' : '⚠️ Budget Risk'}
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🛠 What You Get</h3>
          {tier.whatYouGet.map((item, i) => (
            <div key={i} style={{ padding: '0.4rem 0', borderBottom: '1px solid #1E3A5F', color: '#CBD5E1', display: 'flex', gap: '0.5rem' }}>
              <span>✔</span><span>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>⚖️ Trade-Offs</h3>
          {tier.tradeoffs.map((item, i) => (
            <div key={i} style={{ padding: '0.4rem 0', borderBottom: '1px solid #1E3A5F', color: '#CBD5E1', display: 'flex', gap: '0.5rem' }}>
              <span>•</span><span>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', border: '2px solid #F5E642', borderRadius: 10, padding: '1.25rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🎯 DFW Verdict</h3>
          <p style={{ margin: 0, lineHeight: 1.7, color: '#CBD5E1' }}>{tier.verdict}</p>
        </div>
      </div>
    </div>
  );
}
