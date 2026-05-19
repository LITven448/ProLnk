import { useState } from 'react';

const situations = [
  { id: 'old', label: 'My system is 10+ years old', emoji: '🏚️', impact: 'Your current system will likely not survive to see the full heat pump era. You have a 3 to 5 year decision window. Plan for a hybrid heat pump system — they work in DFW climates and qualify for the 30% federal tax credit today.', action: 'Get a ProLnk HVAC assessment now so you replace on your timeline, not when your system fails in August.' },
  { id: 'new', label: 'My system is under 5 years old', emoji: '✨', impact: 'You are well positioned. AI-predictive maintenance will arrive before your system needs replacement. In the meantime, subscribe to a maintenance plan and document every service call in the ProLnk Vault.', action: 'Use your remaining system life to fund a savings account for heat pump adoption — aim for $3,000 to $5,000 buffer.' },
  { id: 'renting', label: 'I rent my home', emoji: '🏠', impact: 'Tenants increasingly have rights around HVAC efficiency standards. As DFW municipalities adopt energy codes, landlords will be required to upgrade systems. Knowing this gives you negotiating power.', action: 'Document your current system age and SEER rating with ProLnk — it becomes leverage in lease negotiations.' },
  { id: 'investor', label: 'I own investment properties', emoji: '💼', impact: 'Heat pump retrofits will become a standard capital improvement for investment properties in DFW by 2030. Properties with high-efficiency systems command 4 to 7% premium rents. Early adopters win.', action: 'Use ProLnk to audit all properties and create a staggered replacement plan that maximizes tax credits across years.' },
];

const trends = [
  { title: 'AI Predictive Maintenance', timeline: '2027–2029', desc: 'Sensors on your system will predict failures 30 days out. ProLnk dispatches a pro before you lose cooling.', emoji: '🤖' },
  { title: 'Residential Mini-Grid Integration', timeline: '2028–2031', desc: 'Your HVAC will talk to your solar panels and battery storage, shifting loads to save $600 to $1,200 per year.', emoji: '⚡' },
  { title: 'Gas Furnace Phase-Out', timeline: '2026–2030', desc: 'New DFW construction will move to all-electric heat pumps. Existing homes will get incentive programs.', emoji: '🔥' },
  { title: 'Heat Pump Dominance', timeline: '2027–2032', desc: 'Cold-climate heat pumps now work to -13°F. DFW winters are no barrier. Adoption will accelerate rapidly.', emoji: '🌡️' },
];

export default function DFWHVACDFWFuture() {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔭</div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#F5E642', marginBottom: '16px', lineHeight: 1.2 }}>
            DFW HVAC in 5 to 10 Years
          </h1>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto' }}>
            The HVAC industry is in the middle of its biggest transformation since central air conditioning arrived in the 1950s. DFW homeowners who understand what is coming will make dramatically better decisions today.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
          {trends.map(t => (
            <div key={t.title} style={{ backgroundColor: '#0f2040', borderRadius: '14px', padding: '22px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{t.emoji}</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#F5E642', marginBottom: '4px' }}>{t.title}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px', fontWeight: '600′ }}>{t.timeline}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '8px', textAlign: 'center' }}>
            How does the future affect you?
          </h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '20px', fontSize: '15px' }}>Select your situation for a personalized outlook.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {situations.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  backgroundColor: selected === s.id ? '#F5E642′ : '#0f2040',
                  color: selected === s.id ? '#0A1628′ : '#fff',
                  border: `2px solid ${selected === s.id ? '#F5E642' : '#1e3a5f'}`,
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '22px', display: 'block', marginBottom: '6px' }}>{s.emoji}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {chosen && (
          <div style={{ marginBottom: '36px' }}>
            <div style={{ backgroundColor: '#0f2040', borderRadius: '14px', padding: '24px', border: '2px solid #F5E642', marginBottom: '14px' }}>
              <p style={{ fontSize: '14px', color: '#F5E642', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>How the future affects you</p>
              <p style={{ fontSize: '16px', color: '#e2e8f0', lineHeight: 1.7 }}>{chosen.impact}</p>
            </div>
            <div style={{ backgroundColor: '#0f2040', borderRadius: '14px', padding: '24px', border: '1px solid #1e3a5f' }}>
              <p style={{ fontSize: '14px', color: '#F5E642', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>What to do today</p>
              <p style={{ fontSize: '16px', color: '#e2e8f0', lineHeight: 1.7 }}>{chosen.action}</p>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#F5E642', borderRadius: '14px', padding: '28px', textAlign: 'center' }}>
          <p style={{ fontSize: '20px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>ProLnk is built for what is coming</p>
          <p style={{ fontSize: '15px', color: '#0A1628', marginBottom: '16px' }}>The Home Health Vault, AI matching, and our vetted pro network are designed to serve DFW homeowners through the next decade of HVAC change.</p>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', borderRadius: '8px', padding: '14px 28px', display: 'inline-block', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
            Join the ProLnk Waitlist →
          </div>
        </div>
      </div>
    </div>
  );
}
