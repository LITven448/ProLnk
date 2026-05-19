import { useState } from 'react';

const dataSources = [
  { id: 'oncor', label: 'Oncor Electricity Usage', icon: '⚡', how: 'Log in at smartmetertexas.com — get 15-min interval data for up to 24 months. Export as CSV.', reveals: 'Hourly spikes show when your AC cycles, phantom loads at night, and if your HVAC is short-cycling.' },
  { id: 'gas', label: 'Atmos / CoServ Gas Data', icon: '🔥', how: 'Request monthly usage history at atmosenergy.com or coserv.com — usually 13 months available online.', reveals: 'Winter spikes vs. baseline reveal furnace efficiency. Flat summer usage = no gas cooking issues.' },
  { id: 'water', label: 'City Water Records', icon: '💧', how: 'Dallas/Fort Worth utilities offer 12-month usage in your online portal. Download from your city utility.', reveals: 'Sudden spikes = irrigation system leaks. High baseline = running toilet or slow leak in the slab.' },
  { id: 'hers', label: 'HERS Rating / Energy Audit Report', icon: '📊', how: 'Ask your builder or prior owner. If not available, hire a RESNET-certified rater ($300–$500 in DFW).', reveals: 'HERS score of 100 = average new construction. Below 70 = efficient. Above 130 = major improvement potential.' },
];

const problems: Record<string, { label: string; data: string[]; reveals: string; next: string }> = {
  highsummer: { label: 'Very high summer bills', data: ['oncor', 'hers'], reveals: 'Smart meter data shows hourly AC runtime. If cycling every 15 min, the system is undersized or the load is too high from air leaks.', next: 'Pull Smart Meter Texas 15-min data for July. Look for AC on >45 min/hr during 2–6pm heat peak.' },
  winter: { label: 'High winter heating bills', data: ['gas', 'oncor', 'hers'], reveals: 'Compare gas usage to heating degree days (weather-normalized). High usage relative to HDD = poor insulation or infiltration.', next: 'Request 24-month Atmos usage and overlay with NOAA DFW HDD data for the same months.' },
  spike: { label: 'Sudden unexplained usage spike', data: ['oncor', 'water'], reveals: '15-min electricity data reveals the exact day usage changed — helps isolate a new appliance, failed HVAC, or wiring issue. Water spike isolates irrigation vs. indoor leak.', next: 'Log into Smart Meter Texas. Find the exact day the spike started. Check if it was a weather event, equipment change, or occupancy change.' },
  humidity: { label: 'Indoor humidity problems', data: ['oncor', 'hers'], reveals: 'Short-cycling signature in 15-min data (AC on <10 min intervals) means oversized HVAC that cannot dehumidify. HERS reveals latent load calculation errors.', next: 'Pull 15-min data during humid weather. Count cycles per hour — more than 3–4 cycles/hr = oversized system.' },
};

export default function DFWHomeEnergyDataGuide() {
  const [selected, setSelected] = useState('');
  const [showResult, setShowResult] = useState(false);

  const result = selected ? problems[selected] : null;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 40 }}>📈</div>
          <h1 style={{ color: '#0A1628', fontSize: '1.8rem', marginBottom: 8 }}>DFW Home Energy Data Guide</h1>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>
            Where to find your home energy data in DFW — and exactly what it reveals about your efficiency problems.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          {dataSources.map(d => (
            <div key={d.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{d.icon}</div>
              <div style={{ fontWeight: 700, color: '#0A1628', fontSize: '0.9rem', marginBottom: 4 }}>{d.label}</div>
              <div style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.5, marginBottom: 6 }}>{d.how}</div>
              <div style={{ background: '#f1f5f9', borderRadius: 6, padding: '0.4rem 0.6rem', fontSize: '0.76rem', color: '#334155′ }}>
                Reveals: {d.reveals}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#0A1628', fontSize: '1.1rem', marginBottom: '1rem' }}>Describe your energy problem</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {Object.entries(problems).map(([k, v]) => (
              <div
                key={k}
                onClick={() => { setSelected(k); setShowResult(false); }}
                style={{
                  padding: '0.8rem 1rem', borderRadius: 8, cursor: 'pointer',
                  background: selected === k ? '#0A1628′ : '#f8fafc',
                  border: selected === k ? '1px solid #0A1628′ : '1px solid #e2e8f0',
                  color: selected === k ? '#F5E642′ : '#334155',
                  fontWeight: selected === k ? 600 : 400, fontSize: '0.9rem',
                }}
              >
                {v.label}
              </div>
            ))}
          </div>
        </div>

        {selected && (
          <button
            onClick={() => setShowResult(true)}
            style={{ width: '100%', background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '0.85rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: '1.5rem' }}
          >
            Show Data Sources + Next Steps →
          </button>
        )}

        {showResult && result && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h3 style={{ color: '#0A1628', marginBottom: '0.75rem' }}>📋 Pull These Data Sources First</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {result.data.map(id => {
                const src = dataSources.find(d => d.id === id);
                return src ? (
                  <span key={id} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 8, padding: '0.3rem 0.7rem', fontSize: '0.82rem', color: '#0A1628′ }}>
                    {src.icon} {src.label}
                  </span>
                ) : null;
              })}
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '1rem', marginBottom: '1rem', borderLeft: '3px solid #0A1628′ }}>
              <div style={{ fontWeight: 600, color: '#0A1628', marginBottom: 4, fontSize: '0.85rem' }}>What it reveals:</div>
              <p style={{ color: '#475569', fontSize: '0.85rem', margin: 0, lineHeight: 1.6 }}>{result.reveals}</p>
            </div>
            <div style={{ background: '#fefce8', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 600, color: '#0A1628', marginBottom: 4, fontSize: '0.85rem' }}>⚡ Immediate next step:</div>
              <p style={{ color: '#475569', fontSize: '0.85rem', margin: 0, lineHeight: 1.6 }}>{result.next}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
