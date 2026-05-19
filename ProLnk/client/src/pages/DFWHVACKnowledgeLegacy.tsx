import { useState } from 'react';

const levels = [
  {
    id: 'beginner',
    label: 'Just Getting Started',
    emoji: '🌱',
    knew: 'You now know what SEER ratings mean, why filter changes matter monthly in DFW summers, and how to read the data plate on your unit.',
    change: 'You will never again accept a vague repair quote. You will ask: what part failed, what is the manufacturer cost, and what is your labor rate — and you will understand the answer.',
  },
  {
    id: 'intermediate',
    label: 'Somewhat Familiar',
    emoji: '🔄',
    knew: 'You now understand refrigerant recovery regulations, what a static pressure test reveals, and how duct design affects efficiency.',
    change: 'You will catch a duct leak diagnosis before a contractor tries to sell you a full replacement. That saves $3,000 to $8,000 on average in DFW.',
  },
  {
    id: 'advanced',
    label: 'Already Knew the Basics',
    emoji: '⚡',
    knew: 'You now understand load calculations, Manual J principles, and how oversized systems cause humidity problems in DFW clay soil homes.',
    change: 'You will design your next system replacement correctly — not oversized, not undersized — and your home will be more comfortable and cheaper to operate.',
  },
  {
    id: 'expert',
    label: 'HVAC Enthusiast',
    emoji: '🏆',
    knew: 'You deepened your understanding of DFW-specific challenges: alkaline soil corrosion, extreme humidity swings, and the economics of heat pump adoption in North Texas.',
    change: 'You can now help your neighbors make better decisions. That is the real compounding value of HVAC knowledge in a community.',
  },
];

export default function DFWHVACKnowledgeLegacy() {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = levels.find(l => l.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>📚</div>
          <h1 style={{ fontSize: '38px', fontWeight: '800', color: '#F5E642', marginBottom: '16px', lineHeight: 1.2 }}>
            Your HVAC Knowledge Compounds
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            Not knowing is a liability. Knowing changes every decision you make — the contractors you hire, the quotes you accept, the systems you choose. In DFW, where HVAC is a $4,000 to $18,000 decision, knowledge is money.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Avg DFW HVAC replacement cost', value: '$11,200', emoji: '💰' },
            { label: 'Savings from informed decisions', value: '$2,400+', emoji: '📉' },
            { label: 'Years of compounding benefit', value: '15–20 yrs', emoji: '📆' },
            { label: 'Neighbors you can now help', value: 'Unlimited', emoji: '🏘️' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.emoji}</div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: '#F5E642', marginBottom: '6px' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8′ }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
            Where were you when you started?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {levels.map(l => (
              <button
                key={l.id}
                onClick={() => setSelected(l.id)}
                style={{
                  backgroundColor: selected === l.id ? '#F5E642′ : '#0f2040',
                  color: selected === l.id ? '#0A1628′ : '#fff',
                  border: `2px solid ${selected === l.id ? '#F5E642' : '#1e3a5f'}`,
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '22px', display: 'block', marginBottom: '6px' }}>{l.emoji}</span>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {chosen && (
          <div style={{ marginBottom: '36px' }}>
            <div style={{ backgroundColor: '#0f2040', borderRadius: '14px', padding: '28px', border: '2px solid #F5E642', marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', color: '#F5E642', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>What you now know</p>
              <p style={{ fontSize: '16px', color: '#e2e8f0', lineHeight: 1.7 }}>{chosen.knew}</p>
            </div>
            <div style={{ backgroundColor: '#0f2040', borderRadius: '14px', padding: '28px', border: '1px solid #1e3a5f' }}>
              <p style={{ fontSize: '14px', color: '#F5E642', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>How it changes every future decision</p>
              <p style={{ fontSize: '16px', color: '#e2e8f0', lineHeight: 1.7 }}>{chosen.change}</p>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#F5E642', borderRadius: '14px', padding: '28px', textAlign: 'center' }}>
          <p style={{ fontSize: '20px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>ProLnk preserves your knowledge legacy</p>
          <p style={{ fontSize: '15px', color: '#0A1628', marginBottom: '16px' }}>The Home Health Vault stores every piece of your system history — so the next owner inherits your knowledge too.</p>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', borderRadius: '8px', padding: '14px 28px', display: 'inline-block', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
            Start Your Home Vault →
          </div>
        </div>
      </div>
    </div>
  );
}
