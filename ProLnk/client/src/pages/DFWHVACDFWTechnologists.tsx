import { useState } from 'react';

const technologies = [
  {
    id: 'inverter',
    label: '⚙️ Inverter / Variable-Speed Compressors',
    status: 'proven',
    recommendation: 'ADOPT NOW. Variable-speed compressors are mature, proven, and specifically ideal for DFW — they modulate at 40-120% capacity to handle 95°F shoulder-season days without short-cycling. Every major brand offers them. ROI in 4-6 years in DFW.',
    maturity: '✅ Proven DFW Technology',
  },
  {
    id: 'heat-pump',
    label: '🔥 Cold-Climate Heat Pumps',
    status: 'proven',
    recommendation: 'ADOPT NOW. Modern cold-climate heat pumps (Bosch, Mitsubishi, Daikin) are rated to -13°F and perform efficiently at 105°F ambient — DFW’s full range. Pairs with solar and batteries for near-zero utility cost. Proven in DFW for 5+ years.',
    maturity: '✅ Proven DFW Technology',
  },
  {
    id: 'smart-controls',
    label: '🧠 Smart Thermostats + Grid Integration',
    status: 'proven',
    recommendation: 'ADOPT NOW. Ecobee and Google Nest integrate with ERCOT demand-response programs. DFW homeowners earn $100-300/summer letting the grid briefly shift their setpoint. The technology is mature and the economics are clear.',
    maturity: '✅ Proven DFW Technology',
  },
  {
    id: 'predictive',
    label: '📊 Predictive Maintenance Sensors',
    status: 'maturing',
    recommendation: 'WAIT 12-18 MONTHS. Vibration and refrigerant sensors that predict failures are promising but diagnostic accuracy in DFW’s extreme duty cycles is still inconsistent. Early adopters report 20% false-positive rates. Leading brands are Augury and SpotSee — check back in 2027.',
    maturity: '⏳ Maturing — Wait for DFW Track Record',
  },
  {
    id: 'solar-hvac',
    label: '☀️ Solar-Integrated HVAC',
    status: 'maturing',
    recommendation: 'ADOPT WITH CAUTION. Solar DC-direct HVAC (no inverter losses) is genuinely innovative and DFW’s 300+ sun days make it economically strong. However, installation quality varies wildly. ProLnk can match you with the 3-4 DFW contractors with real track records in this system.',
    maturity: '⚠️ Promising — Vet Your Contractor Carefully',
  },
];

export default function DFWHVACDFWTechnologists() {
  const [selected, setSelected] = useState(null);
  const tech = technologies.find(t => t.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>DFW HVAC Technology Adopters</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            Cutting-edge HVAC technology — what to adopt now vs. what to watch in DFW.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          <span style={{ background: '#166534', color: '#4ADE80', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>✅ Proven</span>
          <span style={{ background: '#713F12', color: '#FDE68A', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>⏳ Maturing</span>
          <span style={{ background: '#92400E', color: '#FDBA74', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>⚠️ Promising</span>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {technologies.map(t => (
            <button
              key={t.id}
              onClick={() => setSelected(selected === t.id ? null : t.id)}
              style={{
                background: selected === t.id ? '#F5E642' : '#1E2D45',
                color: selected === t.id ? '#0A1628' : '#E8EDF5',
                border: 'none',
                borderRadius: 10,
                padding: '16px 20px',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tech && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32, borderLeft: '4px solid #F5E642' }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ background: '#0A1628', color: '#F5E642', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>{tech.maturity}</span>
            </div>
            <p style={{ color: '#E2E8F0', lineHeight: 1.8, fontSize: 15 }}>{tech.recommendation}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>ProLnk Matches You With DFW's Tech Leaders</h3>
          <p style={{ color: '#1E2D45', fontSize: 14, lineHeight: 1.6 }}>
            ProLnk tracks which DFW contractors have real experience with emerging technologies — not just sales certifications.
          </p>
        </div>
      </div>
    </div>
  );
}
