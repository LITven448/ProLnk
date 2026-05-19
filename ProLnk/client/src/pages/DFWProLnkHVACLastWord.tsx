import { useState } from 'react';

const personas = [
  {
    id: 'homeowner',
    label: '🏡 I am a DFW homeowner',
    message: 'You deserve to know your HVAC tech before they arrive. You deserve fair, competitive quotes without spending a week calling around. You deserve a record of your home’s HVAC history that travels with the house. ProLnk is building all of it — for you, starting now. Join the waitlist. Be one of the first DFW homeowners with a verified tech in their corner.',
  },
  {
    id: 'landlord',
    label: '🏘️ I own rental properties in DFW',
    message: 'HVAC failure in a rental is an emergency on someone else’s timeline. ProLnk gives you a network of vetted pros you can dispatch fast. Health Vault tracks every system across every property. Maintenance history builds evidence for security deposit disputes. This is property management infrastructure that pays for itself in the first emergency.',
  },
  {
    id: 'contractor',
    label: '🔧 I am a DFW HVAC contractor',
    message: 'You are tired of paying for leads that go nowhere. ProLnk sends you qualified homeowners with real HVAC problems — pre-screened, location-matched, and ready to book. You pay per matched job, not per click. Your reputation builds in the network as you close jobs. The best DFW contractors will be ProLnk partners. Join now while the network is small.',
  },
  {
    id: 'mover',
    label: '📦 I am moving to DFW',
    message: 'Everything about DFW HVAC will surprise you. The season length. The hail risk. The clay soil. The ERCOT grid. You need a vetted local tech before your first summer, not after your first breakdown. ProLnk is the fastest way to find one. Join the waitlist and arrive with your HVAC situation already handled.',
  },
];

export default function DFWProLnkHVACLastWord() {
  const [active, setActive] = useState<string | null>(null);
  const selected = personas.find(p => p.id === active);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: '0.5rem' }}>Our Last Word on DFW HVAC</h1>
        <p style={{ color: '#94a3b8', marginBottom: '0.75rem' }}>DFW homeowners deserve better HVAC service. ProLnk is delivering it.</p>
        <div style={{ background: '#0f1f35', borderRadius: 10, padding: '1rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            The promise is simple: <strong style={{ color: '#F5E642' }}>vetted techs, fair prices, no games.</strong> Tell us who you are — we will tell you exactly what ProLnk means for you.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {personas.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(active === p.id ? null : p.id)}
              style={{
                background: active === p.id ? '#1a2e4a' : '#0f1f35',
                border: `2px solid ${active === p.id ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10,
                padding: '1rem 1.25rem',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 15,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0f1f35', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <p style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: 15, margin: 0 }}>{selected.message}</p>
          </div>
        )}
        <div style={{ background: 'linear-gradient(135deg, #1a2e4a, #0f1f35)', borderRadius: 14, padding: '2rem', textAlign: 'center', border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔗</div>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22, marginBottom: 10 }}>Join the ProLnk Waitlist</div>
          <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
            Be among the first DFW homeowners and contractors in the ProLnk network.<br />
            Early members get priority matching when we launch.
          </div>
          <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, padding: '0.85rem 2rem', borderRadius: 8 }}>
            Get Early Access →
          </div>
        </div>
      </div>
    </div>
  );
}
