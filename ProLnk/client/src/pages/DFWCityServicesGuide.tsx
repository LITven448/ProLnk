import { useState } from 'react';

const services = [
  {
    service: 'Street & Pothole Repair',
    cities: {
      Dallas: { handler: 'Dallas Street Services', how: 'Report via 311 or dallasstreets.com', time: '2–8 weeks' },
      'Fort Worth': { handler: 'Transportation & Public Works', how: 'Call 817-392-8100 or use FW app', time: '1–4 weeks' },
      Plano: { handler: 'Plano Public Works', how: 'MyPlano app or 972-941-7151', time: '2–6 weeks' },
      Frisco: { handler: 'Frisco Engineering Dept', how: 'SeeClickFix or 972-292-5300', time: '3–10 weeks' },
      McKinney: { handler: 'McKinney Public Works', how: 'McKinney Connect app', time: '2–6 weeks' },
    },
  },
  {
    service: 'Trash & Recycling Pickup',
    cities: {
      Dallas: { handler: 'Dallas Sanitation (city-operated)', how: '311 for missed pickup', time: 'Next scheduled day' },
      'Fort Worth': { handler: 'Republic Services (contracted)', how: 'Call Republic at 817-338-7600', time: 'Next scheduled day' },
      Plano: { handler: 'Republic Services (contracted)', how: 'Plano Environmental Waste Services', time: 'Next scheduled day' },
      Frisco: { handler: 'IESI / WM (contracted)', how: 'Frisco utility bill dept 972-292-5301', time: 'Next scheduled day' },
      McKinney: { handler: 'Waste Connections (contracted)', how: 'Report via McKinney Connect', time: 'Next scheduled day' },
    },
  },
  {
    service: 'Building Permits',
    cities: {
      Dallas: { handler: 'Dallas Development Services', how: 'Online at dallasdev.com', time: '2–8 weeks standard' },
      'Fort Worth': { handler: 'Fort Worth Development Services', how: 'CSS online portal', time: '1–6 weeks' },
      Plano: { handler: 'Plano Building Inspections', how: 'eTRAKIT online portal', time: '1–3 weeks' },
      Frisco: { handler: 'Frisco Development Services', how: 'Accela online portal', time: '2–4 weeks' },
      McKinney: { handler: 'McKinney Development Services', how: 'EnerGov online portal', time: '1–4 weeks' },
    },
  },
];

export default function DFWCityServicesGuide() {
  const [selectedCity, setSelectedCity] = useState<string>('Dallas');
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const cityList = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney'];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏛️</div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F5E642', marginBottom: '8px' }}>
            DFW City Services Comparison Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            Who handles what in your DFW city — and how to actually get things done.
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '10px' }}>Select your city:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {cityList.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                style={{
                  backgroundColor: selectedCity === c ? '#F5E642′ : '#1e2d4a',
                  color: selectedCity === c ? '#0A1628′ : '#fff',
                  border: '1px solid #F5E642',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {services.map((s, idx) => {
            const info = s.cities[selectedCity as keyof typeof s.cities];
            return (
              <div
                key={idx}
                onClick={() => setSelectedService(selectedService === idx ? null : idx)}
                style={{
                  backgroundColor: '#1e2d4a',
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  border: selectedService === idx ? '2px solid #F5E642′ : '2px solid transparent',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#F5E642′ }}>{s.service}</h3>
                  <span style={{ color: '#F5E642′ }}>{selectedService === idx ? '▲' : '▼'}</span>
                </div>
                {info && selectedService === idx && (
                  <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ color: '#94a3b8', fontSize: '12px' }}>HANDLED BY</span>
                      <p style={{ color: '#fff', fontWeight: '600', marginTop: '2px' }}>{info.handler}</p>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ color: '#94a3b8', fontSize: '12px' }}>HOW TO REQUEST</span>
                      <p style={{ color: '#cbd5e1', fontSize: '14px', marginTop: '2px' }}>{info.how}</p>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', fontSize: '12px' }}>TYPICAL RESPONSE TIME</span>
                      <p style={{ color: '#F5E642', fontWeight: '700', marginTop: '2px' }}>{info.time}</p>
                    </div>
                  </div>
                )}
                {!info && selectedService === idx && (
                  <p style={{ color: '#94a3b8', marginTop: '12px', fontSize: '13px' }}>Select a city above to see details for this service.</p>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '32px', backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>🔧 Need a Home Pro in {selectedCity}?</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>ProLnk connects you with vetted service professionals throughout DFW.</p>
        </div>
      </div>
    </div>
  );
}
