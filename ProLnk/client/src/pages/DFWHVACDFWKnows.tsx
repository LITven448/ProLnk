import { useState } from 'react';

const knowledgeAreas = [
  {
    id: 'clay-soil',
    label: '🏗️ Clay Soil Impact',
    wrong: 'National advice: size your HVAC for square footage alone.',
    right: 'DFW clay soil shifts foundations seasonally — outdoor unit pads crack, refrigerant lines stress, and airflow paths in crawl spaces change. DFW homeowners must inspect unit leveling annually and use flexible line sets.',
  },
  {
    id: 'ercot',
    label: '⚡ ERCOT Grid Design',
    wrong: 'National advice: buy the most efficient unit available.',
    right: 'ERCOT is an islanded grid — demand spikes during DFW summer push prices to $9/kWh. Variable-speed units with demand-response capability cut summer bills 30-40% vs single-stage units. Grid-aware scheduling is essential.',
  },
  {
    id: 'hard-water',
    label: '💧 DFW Hard Water',
    wrong: 'National advice: flush your condensate drain once a year.',
    right: 'DFW water hardness averages 15-20 gpg. Scale buildup clogs condensate pans in 6-8 months, not 12. Quarterly drain treatments and annual evaporator coil descaling are DFW-standard maintenance, not optional.',
  },
  {
    id: 'humidity',
    label: '🌡️ Humidity Swings',
    wrong: 'National advice: set humidity to 50% year-round.',
    right: 'DFW swings from 80%+ summer humidity to under 20% in winter ice storms. Dual-setpoint humidistats and two-stage cooling prevent mold in summer and static damage in winter — a DFW-specific system configuration.',
  },
  {
    id: 'radiant',
    label: '☀️ Radiant Heat Load',
    wrong: 'National advice: insulate to R-30 and call it done.',
    right: 'DFW attics reach 160°F in July. Standard load calculations underestimate radiant gain by 20-30%. DFW pros use Manual J with DFW-specific solar gain coefficients — never generic national software defaults.',
  },
];

export default function DFWHVACDFWKnows() {
  const [selected, setSelected] = useState(null);
  const area = knowledgeAreas.find(a => a.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🤠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>What DFW Knows</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            DFW-specific HVAC knowledge national resources miss — built from thousands of local installs.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {knowledgeAreas.map(a => (
            <button
              key={a.id}
              onClick={() => setSelected(selected === a.id ? null : a.id)}
              style={{
                background: selected === a.id ? '#F5E642′ : '#1E2D45',
                color: selected === a.id ? '#0A1628′ : '#E8EDF5',
                border: 'none',
                borderRadius: 10,
                padding: '16px 20px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              {a.label}
            </button>
          ))}
        </div>

        {area && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#F87171', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>❌ WHAT NATIONAL ADVICE GETS WRONG</div>
              <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>{area.wrong}</p>
            </div>
            <div>
              <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>✅ WHAT DFW HOMEOWNERS MUST KNOW</div>
              <p style={{ color: '#E2E8F0', lineHeight: 1.7 }}>{area.right}</p>
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>ProLnk Matches You With DFW-Trained Pros</h3>
          <p style={{ color: '#1E2D45', fontSize: 14, lineHeight: 1.6 }}>
            Every ProLnk HVAC pro understands DFW soil, grid, and water — not just national certification minimums.
          </p>
        </div>
      </div>
    </div>
  );
}
