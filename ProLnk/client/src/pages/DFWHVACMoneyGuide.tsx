import { useState } from 'react';

const situations = [
  { id: 'struggling', label: '💸 Tight budget, aging system', strategy: 'Focus on maintenance over replacement. A $150 tune-up can extend system life 3-5 years. Get 3 quotes before any major repair. Negotiate — DFW has 600+ HVAC companies competing for your business.' },
  { id: 'comfortable', label: '🏠 Stable income, 8-12yr system', strategy: 'Plan your replacement proactively. Systems replaced before failure get 20-30% better pricing. Budget $8K-$14K for a full 3-ton system. Spring or fall installs save $500-$1,500 off peak pricing.' },
  { id: 'investing', label: '📈 Building equity, upgrading home', strategy: 'Invest in a 16+ SEER2 system. DFW buyers pay $3K-$8K premiums for new high-efficiency HVAC. Consider smart thermostats (+$200-$500) — they signal tech-forward ownership to buyers.' },
  { id: 'selling', label: '🏡 Planning to sell in 1-3 years', strategy: 'Replace if system is 10+ years old. Inspection failures kill deals. A $9K replacement can save a $350K sale. Disclose age honestly — buyers price in HVAC age regardless.' },
];

const tips = [
  { icon: '🔍', title: 'Negotiate Every Time', body: 'HVAC contractors in DFW expect negotiation. Ask for 10% off, free thermostat, or extended labor warranty. At least 40% of customers who ask get something.' },
  { icon: '📅', title: 'Buy Off-Season', body: 'Install in October-November or February-March. Demand drops 40%, installers discount to keep crews busy. Same system, $800-$1,800 cheaper.' },
  { icon: '🏷️', title: 'Ignore "Efficiency" Upsells', body: 'Jumping from 14 SEER2 to 18 SEER2 costs $2,000+ extra but saves only $120/yr in DFW. Payback is 16+ years — rarely worth it unless you plan to stay long-term.' },
  { icon: '📋', title: 'Demand Itemized Quotes', body: 'Any contractor who refuses to itemize labor vs. parts is hiding markup. In DFW, labor should be $800-$1,500 for a full install. If they quote only a lump sum, walk away.' },
];

export default function DFWHVACMoneyGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💰</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>DFW HVAC Money Guide</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
            When to spend. When to save. How to negotiate. What actually adds value in the DFW market.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
          {tips.map(t => (
            <div key={t.title} style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{t.title}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{t.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🎯 Your DFW HVAC Money Strategy</h2>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Select your financial situation to get a tailored recommendation:</p>
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
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Your Strategy:</div>
              <div style={{ color: '#E8EDF5', lineHeight: 1.7 }}>{chosen.strategy}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#0A1628', marginBottom: 8 }}>ProLnk connects you with vetted DFW HVAC pros who compete for your job.</div>
          <div style={{ color: '#1A2A40', fontSize: 14 }}>No phone book roulette. No inflated quotes. Just matched, accountable professionals.</div>
        </div>
      </div>
    </div>
  );
}
