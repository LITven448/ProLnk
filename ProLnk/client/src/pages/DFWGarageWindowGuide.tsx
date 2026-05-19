import { useState } from 'react';

const GARAGE_SIZES = [
  { id: 'single', label: '1-Car Garage (~250 sq ft)', heatMultiplier: 1.0, baseTemp: 148 },
  { id: 'double', label: '2-Car Garage (~500 sq ft)', heatMultiplier: 1.6, baseTemp: 152 },
  { id: 'triple', label: '3-Car Garage (~750 sq ft)', heatMultiplier: 2.1, baseTemp: 155 },
];

const INSULATION_LEVELS = [
  { id: 'none', label: 'No Insulation (R-0)', rValue: 0, costPerSqFt: 0 },
  { id: 'low', label: 'Basic (R-6)', rValue: 6, costPerSqFt: 0.8 },
  { id: 'mid', label: 'Standard (R-12)', rValue: 12, costPerSqFt: 1.4 },
  { id: 'high', label: 'Premium (R-18)', rValue: 18, costPerSqFt: 2.2 },
];

const UPGRADES = [
  { id: 'windows', label: 'Window Inserts in Garage Door', cost: 280, tempReduction: 4, desc: 'Polycarbonate panels in existing door panels — adds light, minimal heat gain' },
  { id: 'skylight', label: 'Tubular Skylight', cost: 650, tempReduction: 0, desc: 'Brings in daylight without heat — uses reflective tube from roof to ceiling' },
  { id: 'vent_fan', label: 'Exhaust Fan + Vent', cost: 420, tempReduction: 18, desc: 'Most effective cooling — exhausts superheated air from peak of garage' },
  { id: 'mini_split', label: 'Mini-Split AC Unit', cost: 2800, tempReduction: 45, desc: 'Full temperature control — required for workshop or conditioned garage' },
];

export default function DFWGarageWindowGuide() {
  const [garageSize, setGarageSize] = useState('double');
  const [insulation, setInsulation] = useState('none');
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);

  const selectedGarage = GARAGE_SIZES.find(g => g.id === garageSize)!;
  const selectedInsulation = INSULATION_LEVELS.find(i => i.id === insulation)!;

  const toggleUpgrade = (id: string) => {
    setSelectedUpgrades(prev => prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]);
  };

  const insRValue = selectedInsulation.rValue;
  const upgradeCost = selectedUpgrades.reduce((sum, id) => {
    const u = UPGRADES.find(u => u.id === id);
    return sum + (u ? u.cost : 0);
  }, 0);
  const insulationCost = Math.round(selectedInsulation.costPerSqFt * (garageSize === 'single' ? 250 : garageSize === 'double' ? 500 : 750));
  const tempReduction = Math.round(
    (insRValue / 18) * 35 +
    selectedUpgrades.reduce((sum, id) => {
      const u = UPGRADES.find(u => u.id === id);
      return sum + (u ? u.tempReduction : 0);
    }, 0)
  );
  const estimatedTemp = Math.max(72, selectedGarage.baseTemp - tempReduction);
  const totalCost = upgradeCost + insulationCost;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 10px', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
            DFW GARAGE GUIDE
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
          🏠 Garage Window & Insulation Guide — DFW
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 36 }}>
          An uninsulated garage in Dallas can reach 150–155°F on a July afternoon. That heat radiates through shared walls into your living space — adding 10–20% to your cooling bill. Here's how to fix it.
        </p>

        <div style={{ background: '#2D1B00', border: '1px solid #F59E0B', borderRadius: 10, padding: 20, marginBottom: 28 }}>
          <div style={{ color: '#FCD34D', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🌡️ The DFW Garage Heat Problem</div>
          <p style={{ color: '#FDE68A', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            A standard 2-car garage in DFW with no insulation reaches 150°F+ by mid-afternoon in July. A typical attached garage shares 200–400 sq ft of wall with your living space.
            That wall becomes a heat radiator — your AC fights it constantly. R-18 insulation on garage doors + exhaust fans can drop peak temperature by 40–50°F.
          </p>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, fontSize: 18 }}>🪟 Window Insert Options (Adding Light Without Heat)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {[
              { icon: '🔲', label: 'Polycarbonate Panel Inserts', cost: '$80–150/panel', note: 'Snap into existing door sections — diffused light, minimal heat gain, no glass breakage risk' },
              { icon: '🌅', label: 'Tubular Skylight', cost: '$450–850 installed', note: 'Roof-mounted, 10–21″ tube channels daylight in — zero heat gain vs standard skylights' },
              { icon: '🏚️', label: 'Fixed Transom Windows', cost: '$300–600 installed', note: 'Above garage door on wall — natural light at peak, out of sun angle, minimal heat gain' },
            ].map(opt => (
              <div key={opt.label} style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{opt.icon}</div>
                <div style={{ fontWeight: 700, color: '#E8EDF4', fontSize: 14, marginBottom: 4 }}>{opt.label}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{opt.cost}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.5 }}>{opt.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#131F33', border: '1.5px solid #F5E642', borderRadius: 14, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 24 }}>🌡️ Heat Reduction Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Garage Size</label>
              <select value={garageSize} onChange={e => setGarageSize(e.target.value)}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#E8EDF4', fontSize: 14, width: '100%' }}>
                {GARAGE_SIZES.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Current Garage Door Insulation</label>
              <select value={insulation} onChange={e => setInsulation(e.target.value)}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#E8EDF4', fontSize: 14, width: '100%' }}>
                {INSULATION_LEVELS.map(i => <option key={i.id} value={i.id}>{i.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 12 }}>Add-On Upgrades (select all that apply)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
              {UPGRADES.map(u => (
                <div key={u.id}
                  onClick={() => toggleUpgrade(u.id)}
                  style={{ background: selectedUpgrades.includes(u.id) ? '#1A3A2A' : '#1E2D45', border: `2px solid ${selectedUpgrades.includes(u.id) ? '#22C55E' : '#2D3F57'}`, borderRadius: 10, padding: 14, cursor: 'pointer' }}>
                  <div style={{ fontWeight: 700, color: '#E8EDF4', fontSize: 13, marginBottom: 4 }}>{u.label}</div>
                  <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>+${u.cost.toLocaleString()}</div>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>{u.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'Total Upgrade Cost', value: `$${totalCost.toLocaleString()}` },
              { label: 'Est. Peak Temp After', value: `${estimatedTemp}°F`, color: estimatedTemp < 100 ? '#22C55E' : estimatedTemp < 120 ? '#F59E0B' : '#EF4444′ },
              { label: 'Temperature Reduction', value: `${Math.min(tempReduction, selectedGarage.baseTemp - 72)}°F` },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>{stat.label}</div>
                <div style={{ color: (stat as any).color || '#F5E642', fontWeight: 800, fontSize: 24 }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>✅ DFW Garage Insulation Recommendations</h3>
          {[
            { r: 'R-6 minimum', desc: 'Better than nothing — stops radiant heat from door surface. Adequate for detached garages.' },
            { r: 'R-12 sweet spot', desc: 'Recommended for attached garages. Reduces shared wall heat transfer by ~60%.' },
            { r: 'R-18+ for workshops', desc: 'Required if you work in garage regularly. Pairs with exhaust fan for a livable space year-round.' },
          ].map(rec => (
            <div key={rec.r} style={{ display: 'flex', gap: 14, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap', marginTop: 2 }}>{rec.r}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.5 }}>{rec.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
