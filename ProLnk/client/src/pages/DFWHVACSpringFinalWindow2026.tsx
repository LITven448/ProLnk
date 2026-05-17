import { useState } from 'react';

const months = [
  { id: 'march', label: '❄️ March Pricing', rate: '$50 diagnostic', urgency: 'low', note: 'Best time — low demand, full pro availability, standard scheduling windows.' },
  { id: 'april', label: '🌤 April Pricing', rate: '$65 diagnostic', urgency: 'medium', note: 'Moderate pricing — still comfortable weather, pros starting to book up for May.' },
  { id: 'may', label: '☀️ May (Now)', rate: '$75 diagnostic', urgency: 'high', note: 'Last call for standard rates. Book your tune-up now before summer surge hits in June.' },
  { id: 'june', label: '🔥 June Pricing', rate: '$85-150 diagnostic', urgency: 'critical', note: 'Emergency rates. Pros are booked solid. Wait times 5-10 days for non-emergency calls.' },
];

export default function DFWHVACSpringFinalWindow2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = months.find(m => m.id === selected);
  const urgencyColor: Record<string, string> = { low: '#22C55E', medium: '#F59E0B', high: '#F5E642', critical: '#EF4444' };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC · MAY 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          DFW HVAC Spring Tune-Up<br />Final Window 2026
        </h1>
        <p style={{ color: '#8899AA', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          May is the last affordable month for HVAC service in DFW. By June, diagnostic rates jump
          40-100% and wait times stretch to 5-10 days. ProLnk Charter pros hold standard rates
          for members year-round — but you need to book now.
        </p>

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>DFW SEASONAL PRICING CURVE</div>
          <div style={{ display: 'grid', gap: 2 }}>
            {months.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#0A1628', borderRadius: 6 }}>
                <span style={{ fontSize: 14 }}>{m.label}</span>
                <span style={{ fontWeight: 700, color: urgencyColor[m.urgency], fontSize: 14 }}>{m.rate}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>SELECT A TIME PERIOD FOR DETAILS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {months.map(m => (
              <button key={m.id} onClick={() => setSelected(m.id)} style={{
                background: selected === m.id ? '#F5E642' : '#111D2E',
                color: selected === m.id ? '#0A1628' : '#fff',
                border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{m.label}</button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 32, fontWeight: 600, fontSize: 15 }}>
            {active.note}
          </div>
        )}

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>MAY CHECKLIST — DO THIS NOW</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              '🌡 Replace air filter (every 30-90 days in DFW summer)',
              '🧹 Clear debris from outdoor condenser unit',
              '📋 Schedule professional tune-up before June 1',
              '💧 Check condensate drain line — clogs cause water damage in peak season',
              '🌡 Test thermostat at 95°F setting before you need it',
            ].map(item => (
              <div key={item} style={{ fontSize: 14, color: '#CBD5E1' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>PROLNK CHARTER ADVANTAGE</div>
          <p style={{ color: '#8899AA', fontSize: 14, margin: 0 }}>
            Charter members get access to ProLnk-vetted HVAC pros who honor standard rates year-round.
            Join the waitlist now — Charter closes at 500 applicants.
          </p>
        </div>
      </div>
    </div>
  );
}