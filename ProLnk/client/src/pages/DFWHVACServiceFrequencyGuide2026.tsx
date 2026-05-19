import { useState } from 'react';

const ageOptions = ['0-5 years', '5-10 years', '10-15 years', '15+ years'];

const recommendations: Record<string, { frequency: string; services: string[]; budget: string; icon: string }> = {
  '0-5 years': {
    frequency: 'Annual tune-up',
    services: ['Spring AC check', 'Filter replacement every 90 days', 'Coil cleaning', 'Refrigerant level check'],
    budget: '$150-250/year',
    icon: '🟢',
  },
  '5-10 years': {
    frequency: 'Bi-annual (Spring + Fall)',
    services: ['Spring cooling prep', 'Fall heating prep', 'Duct inspection', 'Capacitor + contactor check', 'Filter every 60 days'],
    budget: '$300-500/year',
    icon: '🟡',
  },
  '10-15 years': {
    frequency: 'Quarterly inspections',
    services: ['4x per year visits', 'Blower motor check', 'Heat exchanger inspection', 'Refrigerant leak test', 'Filter monthly'],
    budget: '$500-900/year',
    icon: '🟠',
  },
  '15+ years': {
    frequency: 'Quarterly + replacement planning',
    services: ['Quarterly tune-ups', 'Emergency fund allocation', 'Efficiency audit', 'Replacement quote comparison', 'Filter monthly'],
    budget: '$800-1500/year + replacement reserve',
    icon: '🔴',
  },
};

export default function DFWHVACServiceFrequencyGuide2026() {
  const [selectedAge, setSelectedAge] = useState<string>('');

  const rec = selectedAge ? recommendations[selectedAge] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>❄️🔥</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW HVAC Service Frequency Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Dallas-Fort Worth's extreme summers and mild winters demand a tailored HVAC maintenance schedule.
            Select your system age for a personalized recommendation.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>📅 How Old Is Your HVAC System?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ageOptions.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: selectedAge === age ? '2px solid #F5E642′ : '2px solid #2d3f5a',
                  backgroundColor: selectedAge === age ? '#F5E642′ : '#0d1f36',
                  color: selectedAge === age ? '#0A1628′ : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {rec && (
          <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 24 }}>{rec.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{rec.frequency}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>Recommended for {selectedAge} DFW systems</div>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8, fontWeight: 600, textTransform: 'uppercase' }}>Included Services</div>
              {rec.services.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #2d3f5a', color: '#e2e8f0', fontSize: 14 }}>
                  <span style={{ color: '#F5E642′ }}>✓</span> {s}
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#0d1f36', borderRadius: 8, padding: 12 }}>
              <span style={{ color: '#64748b', fontSize: 13 }}>💰 Estimated Annual Budget: </span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{rec.budget}</span>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>🌡️ DFW Climate Facts</h3>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            DFW averages <strong style={{ color: '#e2e8f0′ }}>100+ days above 90°F</strong> annually, pushing HVAC systems harder than most U.S. cities.
            Regular maintenance can extend system life by <strong style={{ color: '#F5E642′ }}>3-5 years</strong> and reduce energy costs by up to <strong style={{ color: '#F5E642' }}>15%</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}