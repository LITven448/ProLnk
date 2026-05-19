import { useState } from 'react';

const situations = [
  {
    id: 'new-owner',
    label: '🏠 Just bought a DFW home',
    insight: 'Schedule a $89-$150 HVAC inspection immediately. Know the system age, condition, and expected replacement window before you need emergency service at 3am in July.',
    action: 'Book an inspection within 30 days of move-in.',
  },
  {
    id: 'aging-system',
    label: '⏳ System is 8+ years old',
    insight: 'Begin your replacement fund now. Budget $800-$1,200/month for 12 months. Replacing before failure gives you time to get 3 quotes, negotiate, and schedule off-season — saving $1,500-$3,000.',
    action: 'Open a dedicated savings account. Get one quote now as a baseline.',
  },
  {
    id: 'high-bills',
    label: '💸 Paying $300-$500+ in summer',
    insight: 'Your system is working too hard. Dirty coils, low refrigerant, or poor airflow are costing you $80-$150/month in wasted energy. A $150 tune-up often cuts bills by 15-25%.',
    action: 'Schedule a tune-up. Ask specifically about coil cleaning and refrigerant charge.',
  },
  {
    id: 'selling',
    label: '🏡 Planning to sell within 2 years',
    insight: 'HVAC is the #1 inspection red flag in DFW. A failed inspection or demanded credit can cost you 2-4x what maintenance would have. Invest in the system before listing.',
    action: 'Get a full HVAC inspection and address any findings before listing.',
  },
  {
    id: 'comfortable',
    label: '✅ System is good, just staying informed',
    insight: 'Your single best action is annual preventive maintenance. DFW HVAC systems that receive annual tune-ups last 30-40% longer. $150/year can defer a $12,000 replacement by 3-5 years.',
    action: 'Set a calendar reminder every October for a fall tune-up.',
  },
];

const pillars = [
  { icon: '🌡️', title: 'Biggest Comfort Factor', body: 'In DFW’s 100°F+ summers, HVAC failure is not an inconvenience — it’s a health emergency. No other home system affects daily quality of life more.' },
  { icon: '💰', title: 'Biggest Operating Expense', body: 'HVAC accounts for 50-70% of a DFW home’s energy bill. Over 10 years, you’ll spend $18K-$35K on energy and maintenance. It deserves active management.' },
  { icon: '🏠', title: 'Biggest Equity Risk', body: 'A failing HVAC can trigger $8K-$15K in buyer credits or kill a sale outright. No other deferred maintenance item has this much power over your transaction.' },
  { icon: '🔄', title: 'Best Maintenance ROI', body: 'Annual $150 tune-ups return $800-$2,500/year in energy savings + extended system life. No home improvement beats preventive HVAC maintenance on ROI.' },
];

export default function DFWHVACFinalInsight() {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>The Most Important HVAC Insight for DFW Homeowners</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
            Your HVAC is your home's most important system. Here’s why — and what to do about it.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 40 }}>
          {pillars.map(p => (
            <div key={p.title} style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{p.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🎯 Your Single Most Important HVAC Insight</h2>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Tell us your situation — get the one thing you most need to know right now:</p>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#0A1628', color: selected === s.id ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 10, padding: '12px 16px', cursor: ’pointer', textAlign: 'left', fontWeight: 600, fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
          {chosen && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8, fontSize: 16 }}>Your Key Insight:</div>
              <div style={{ color: '#E8EDF5', lineHeight: 1.7, marginBottom: 16 }}>{chosen.insight}</div>
              <div style={{ borderTop: '1px solid #1E3A5F', paddingTop: 12 }}>
                <span style={{ fontWeight: 700, color: '#F5E642′ }}>Next Action: </span>
                <span style={{ color: '#CBD5E1′ }}>{chosen.action}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#0A1628', marginBottom: 8 }}>ProLnk makes your next HVAC action easier and safer.</div>
          <div style={{ color: '#1A2A40', fontSize: 14 }}>Vetted DFW pros. No guessing. No phone book roulette. Just matched, accountable service.</div>
        </div>
      </div>
    </div>
  );
}
