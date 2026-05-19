import { useState } from 'react';

const loads: Array<{ label: string; key: string; amps: number }> = [
  { label: 'Central AC — 3 Ton', key: 'ac3', amps: 24 },
  { label: 'Central AC — 4 Ton', key: 'ac4', amps: 32 },
  { label: 'Central AC — 5 Ton', key: 'ac5', amps: 40 },
  { label: 'Electric Range / Oven', key: 'range', amps: 40 },
  { label: 'Electric Dryer', key: 'dryer', amps: 24 },
  { label: 'Electric Water Heater', key: 'wh', amps: 18 },
  { label: 'Dishwasher', key: 'dw', amps: 12 },
  { label: 'Pool Pump (1 HP)', key: 'pool', amps: 8 },
  { label: 'Hot Tub / Spa', key: 'spa', amps: 40 },
  { label: 'EV Charger Level 2 (48A)', key: 'ev48', amps: 48 },
  { label: 'EV Charger Level 2 (32A)', key: 'ev32', amps: 32 },
  { label: 'General Lighting & Outlets (per 1,000 sq ft)', key: 'lighting', amps: 3 },
  { label: 'Second AC Unit', key: 'ac2nd', amps: 24 },
  { label: 'Electric Vehicle (second car)', key: 'ev2', amps: 32 },
  { label: 'Home Office — High Load', key: 'office', amps: 8 },
];

export default function DFWLoadCalculationGuide() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [sqft, setSqft] = useState('');
  const [service, setService] = useState('');

  const toggleLoad = (key: string) => setSelected(prev => ({ ...prev, [key]: !prev[key] }));

  const lightingAmps = sqft ? Math.ceil(Number(sqft) / 1000) * 3 : 0;
  const applianceAmps = loads
    .filter(l => l.key !== 'lighting' && selected[l.key])
    .reduce((sum, l) => sum + l.amps, 0);
  const totalAmps = applianceAmps + lightingAmps;
  const serviceNum = Number(service) || 0;

  const getAssessment = () => {
    if (!serviceNum || !totalAmps) return null;
    const headroom = serviceNum - totalAmps;
    if (headroom >= 40) return { level: 'ok', label: '✅ Adequate Service', color: '#22C55E', msg: `Your ${serviceNum}A service has ${headroom}A of headroom. You\'re in good shape for current and near-term loads.` };
    if (headroom >= 0) return { level: 'warn', label: '⚠️ Tight — Monitor Closely', color: '#F59E0B', msg: `Only ${headroom}A of headroom. Adding any major load (EV charger, second AC) will require a service upgrade.` };
    return { level: 'bad', label: '🔴 Service Upgrade Required', color: '#EF4444', msg: `Your calculated load (${totalAmps}A) exceeds your ${serviceNum}A service by ${Math.abs(headroom)}A. A service upgrade to 200A or 400A is necessary before adding new loads.` };
  };

  const assessment = getAssessment();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>⚡ DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Electrical Load Calculation Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW homes running AC, pool pumps, EV chargers, and electric appliances simultaneously can exceed 200A service.
          Check whether your panel can handle your modern load profile.
        </p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#94A3B8', fontSize: 13 }}>Home size (sq ft)</label>
              <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 2400"
                style={{ width: '100%', padding: '10px 14px', background: '#162035', border: '1px solid #2D3F5E', borderRadius: 8, color: '#E8F0FE', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#94A3B8', fontSize: 13 }}>Current service size (A)</label>
              <select value={service} onChange={e => setService(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#162035', border: '1px solid #2D3F5E', borderRadius: 8, color: '#E8F0FE', fontSize: 15 }}>
                <option value="">— select —</option>
                <option value="100">100A</option>
                <option value="150">150A</option>
                <option value="200">200A</option>
                <option value="400">400A</option>
              </select>
            </div>
          </div>
          <label style={{ display: 'block', marginBottom: 10, color: '#94A3B8', fontSize: 13 }}>Select your major loads</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {loads.filter(l => l.key !== 'lighting').map(l => (
              <label key={l.key} style={{ display: 'flex', alignItems: 'center', gap: 10, background: selected[l.key] ? '#1a2f50' : '#162035', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', border: selected[l.key] ? '1px solid #F5E642' : '1px solid #2D3F5E' }}>
                <input type="checkbox" checked={!!selected[l.key]} onChange={() => toggleLoad(l.key)} style={{ accentColor: '#F5E642' }} />
                <span style={{ flex: 1, fontSize: 13, color: '#CBD5E1' }}>{l.label}</span>
                <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{l.amps}A</span>
              </label>
            ))}
          </div>
        </div>

        {(totalAmps > 0 || lightingAmps > 0) && (
          <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: '#94A3B8' }}>Lighting & Outlets ({sqft || 0} sq ft)</span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{lightingAmps}A</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: '#94A3B8' }}>Major Appliances & Loads</span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{applianceAmps}A</span>
            </div>
            <div style={{ borderTop: '1px solid #2D3F5E', paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#E8F0FE', fontWeight: 700, fontSize: 18 }}>Calculated Total Load</span>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{totalAmps}A</span>
            </div>
          </div>
        )}

        {assessment && (
          <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, borderLeft: `3px solid ${assessment.color}`, marginBottom: 24 }}>
            <div style={{ color: assessment.color, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{assessment.label}</div>
            <p style={{ color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>{assessment.msg}</p>
          </div>
        )}

        <div style={{ marginTop: 16, textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', marginBottom: 12 }}>Get a licensed DFW electrician to perform a formal load calculation and assess your panel.</p>
          <a href="/get-quote" style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Get a Free DFW Load Assessment</a>
        </div>
      </div>
    </div>
  );
}
