import { useState } from 'react';

const services = [
  { type: 'HVAC', icon: '❄️', steps: ['Submit your request in 60 seconds', 'Get matched with 3 vetted HVAC pros in DFW', 'Compare transparent quotes — no surprises', 'Job recorded in your Home Health Vault'] },
  { type: 'Plumbing', icon: '🔧', steps: ['Submit your request in 60 seconds', 'Matched with licensed plumbers near you', 'Upfront pricing before any work starts', 'Permanent record stored in your Vault'] },
  { type: 'Electrical', icon: '⚡', steps: ['Submit your request in 60 seconds', 'Only pre-screened electricians sent your way', 'Transparent quotes, zero bidding wars', 'Electrical history logged for resale value'] },
  { type: 'Roofing', icon: '🏠', steps: ['Submit your request in 60 seconds', 'Storm-ready roofing pros matched fast', 'Insurance-friendly documentation included', 'Roof history stored permanently in Vault'] },
  { type: 'General Repair', icon: '🔨', steps: ['Submit your request in 60 seconds', 'Vetted handyman pros dispatched fast', 'Fair, flat-rate pricing shown upfront', 'Every repair added to your Home History'] },
];

export default function ProLnkForHomeowners() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>ProLnk for DFW Homeowners</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>Vetted pros only. Transparent pricing. Every job recorded forever.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 48 }}>
          {['🛡️ Vetted Pros Only', '💰 Transparent Pricing', '📋 Home Health Vault'].map((f, i) => (
            <div key={i} style={{ background: '#132040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>{f}</div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>What service do you need?</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          {services.map((s, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642' : '#132040', color: selected === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
              {s.icon} {s.type}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#132040', border: '1px solid #F5E642', borderRadius: 16, padding: 28, marginBottom: 40 }}>
            <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>How ProLnk handles {services[selected].type}</h3>
            {services[selected].steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: 13 }}>{i + 1}</span>
                <span style={{ color: '#cbd5e1', fontSize: 15 }}>{step}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Join the DFW Waitlist</h3>
          <p style={{ color: '#0A1628', marginBottom: 4 }}>500 homeowner spots available at launch.</p>
          <p style={{ color: '#0A1628', fontWeight: 600 }}>📧 homeowners@prolnk.io</p>
        </div>
      </div>
    </div>
  );
}