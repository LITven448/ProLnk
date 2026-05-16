import { useState } from 'react';

export default function DFWSummerCoolingCostComparison() {
  const [homeSize, setHomeSize] = useState('');
  const [currentSystem, setCurrentSystem] = useState('');
  const [result, setResult] = useState<null | { monthly: string; annual: string; best: string; savings: string; notes: string }>(null);

  function calculate() {
    if (!homeSize || !currentSystem) return;
    const sq = parseInt(homeSize);
    const kwhRate = 0.134;
    const dfwCoolingHours = 1800;
    const tons = Math.ceil(sq / 500);

    const systems: Record<string, { effBtu: number; label: string }> = {
      central_old: { effBtu: 8000, label: 'Old Central AC (pre-2006, 10 SEER)' },
      central_new: { effBtu: 13000, label: 'New Central AC (16 SEER2)' },
      minisplit: { effBtu: 18000, label: 'Mini-Split (20+ SEER2)' },
      window: { effBtu: 8500, label: 'Window Units' },
      portable: { effBtu: 5500, label: 'Portable AC' },
    };

    const costs: Record<string, number> = {};
    Object.entries(systems).forEach(([key, sys]) => {
      const watts = (tons * 12000) / sys.effBtu * 1000;
      costs[key] = Math.round((watts / 1000) * dfwCoolingHours * kwhRate);
    });

    const current = costs[currentSystem] || 0;
    const best = Math.min(...Object.values(costs));
    const bestKey = Object.keys(costs).find(k => costs[k] === best) || '';
    const saving = current - best;

    const monthly = `$${Math.round(current / 5)} – $${Math.round(current / 4)}/month (Jun–Sep avg)`;
    const annual = `$${Math.round(current * 0.85).toLocaleString()}/year total cooling`;
    const bestSystem = systems[bestKey]?.label || '';
    const savings = saving > 0 ? `Save $${Math.round(saving * 0.85).toLocaleString()}/year vs your current system` : 'Already running optimal system';

    let notes = '';
    if (currentSystem === 'central_old') notes = 'Upgrading from a 10 SEER unit to a 16+ SEER2 pays back in 4–6 years in DFW. At 100°F+, old equipment runs continuously—efficiency gap is massive.';
    else if (currentSystem === 'window') notes = 'Window units are 40–60% less efficient than central AC at DFW temperatures. Combined with DFW electricity rates, they are rarely the right choice for whole-home cooling.';
    else if (currentSystem === 'portable') notes = 'Portable ACs are the least efficient option in DFW heat. They exhaust hot air back through a hose, reducing net cooling. For emergency only.';
    else if (currentSystem === 'minisplit') notes = 'Mini-splits are the gold standard for DFW efficiency. In DFW climates, they outperform central AC by 25–35% and provide superior dehumidification.';
    else notes = 'Modern central AC is a solid choice for DFW. Consider variable-speed upgrade for further savings during peak summer hours.';

    setResult({ monthly, annual, best: bestSystem, savings, notes });
  }

  const compare = [
    { system: 'Mini-Split (20+ SEER2)', monthly2k: '$95–$130', monthly3k: '$140–$190', note: 'Best DFW choice' },
    { system: 'New Central AC (16 SEER2)', monthly2k: '$130–$175', monthly3k: '$190–$255', note: 'Most common upgrade' },
    { system: 'Old Central AC (10 SEER)', monthly2k: '$205–$280', monthly3k: '$300–$410', note: 'Replace ASAP' },
    { system: 'Window Units (whole home)', monthly2k: '$195–$270', monthly3k: '$290–$400', note: 'Inefficient at 100°F+' },
    { system: 'Portable AC (emergency)', monthly2k: '$310–$430', monthly3k: '$460–$640', note: 'Not viable for DFW summer' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>💸</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Summer Cooling Cost Comparison</h1>
        </div>
        <p style={{ color: '#9BAEC8', marginBottom: 28 }}>At 100°F+, system efficiency differences cost thousands per year. Know what you're actually paying.</p>
        <div style={{ background: '#1A0820', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '3px solid #F5A642' }}>
          <span style={{ color: '#F5A642', fontWeight: 700 }}>⚡ DFW Fact: </span>
          <span style={{ color: '#E8EDF5', fontSize: 14 }}>DFW homes run AC 1,700–2,000 hours/year — nearly double the national average. At 100°F+, a 10 SEER unit uses 60% more electricity than a 16 SEER2 system.</span>
        </div>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 Monthly Cooling Cost by System Type</h2>
          <p style={{ color: '#9BAEC8', fontSize: 13, marginBottom: 16 }}>Based on DFW avg $0.134/kWh, June–September peak cooling season</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1A3055' }}>
                {['System', '2,000 sq ft', '3,000 sq ft', 'DFW Note'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: '#F5E642' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.map(row => (
                <tr key={row.system} style={{ borderBottom: '1px solid #0A1628' }}>
                  <td style={{ padding: '9px 10px', color: '#E8EDF5', fontWeight: 600 }}>{row.system}</td>
                  <td style={{ padding: '9px 10px', color: '#9BAEC8' }}>{row.monthly2k}</td>
                  <td style={{ padding: '9px 10px', color: '#9BAEC8' }}>{row.monthly3k}</td>
                  <td style={{ padding: '9px 10px', color: row.note.includes('Best') ? '#4ADE80' : row.note.includes('Replace') ? '#F87171' : '#9BAEC8', fontSize: 12 }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Calculate Your DFW Cooling Cost</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Home Size (sq ft)</label>
              <input type="number" placeholder="e.g. 2400" value={homeSize} onChange={e => setHomeSize(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Your Current System</label>
              <select value={currentSystem} onChange={e => setCurrentSystem(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select system...</option>
                <option value="central_old">Old Central AC (pre-2006 / 10 SEER)</option>
                <option value="central_new">New Central AC (16+ SEER2)</option>
                <option value="minisplit">Mini-Split System</option>
                <option value="window">Window Units</option>
                <option value="portable">Portable AC Units</option>
              </select>
            </div>
            <button onClick={calculate}
              style={{ padding: '14px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
              Calculate DFW Cooling Cost →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '3px solid #F5E642' }}>
              <div style={{ display: 'grid', gap: 10 }}>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Your Estimated Monthly Cost</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginTop: 2 }}>{result.monthly}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Annual Cooling Estimate</span><div style={{ color: '#F5E642', fontWeight: 700, marginTop: 2 }}>{result.annual}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Most Efficient Option</span><div style={{ color: '#4ADE80', fontWeight: 600, marginTop: 2 }}>{result.best}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Upgrade Savings Potential</span><div style={{ color: '#4ADE80', fontWeight: 700, marginTop: 2 }}>{result.savings}</div></div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#9BAEC8', fontSize: 12, marginBottom: 4 }}>📍 DFW Analysis</div>
                  <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>{result.notes}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <p style={{ color: '#4A6080', fontSize: 13, textAlign: 'center' }}>Estimates use DFW average utility rates. Actual costs vary by home insulation, orientation, and thermostat settings.</p>
      </div>
    </div>
  );
}
