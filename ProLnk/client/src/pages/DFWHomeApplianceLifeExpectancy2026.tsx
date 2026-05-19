import { useState } from 'react';

export default function DFWHomeApplianceLifeExpectancy2026() {
  const [appliance, setAppliance] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<{ status: string; action: string; color: string } | null>(null);

  const applianceData: Record<string, { min: number; max: number; note: string }> = {
    refrigerator: { min: 13, max: 17, note: 'DFW heat adds compressor stress. Check door seals and condenser coils annually.' },
    dishwasher: { min: 9, max: 12, note: 'DFW hard water (300+ ppm) shortens lifespan. Install water softener to extend by 2-3 yrs.' },
    washer: { min: 10, max: 13, note: 'Front-loaders last longer but need drum cleaning monthly due to DFW humidity.' },
    dryer: { min: 10, max: 13, note: 'Clean lint trap every load. Vent cleaning annually critical in DFW (fire risk in summer heat).' },
    range: { min: 13, max: 15, note: 'Gas ranges outlast electric in DFW. Clean burners quarterly to prevent efficiency loss.' },
    disposal: { min: 8, max: 12, note: 'DFW hard water builds up quickly. Run cold water 30 sec after use. Replace if grinding sound changes.' },
  };

  const handleCheck = () => {
    const a = applianceData[appliance];
    const ageNum = parseInt(age);
    if (!a || isNaN(ageNum)) return;
    if (ageNum < a.min * 0.6) {
      setResult({ status: 'Good Shape', action: 'Perform routine maintenance. Schedule annual inspection to maximize lifespan.', color: '#22cc66′ });
    } else if (ageNum < a.min) {
      setResult({ status: 'Mid-Life', action: `Budget for replacement in ${a.min - ageNum}-${a.max - ageNum} years. ${a.note}`, color: '#F5E642′ });
    } else if (ageNum <= a.max) {
      setResult({ status: 'End of Life Zone', action: `Start replacement planning now. Average lifespan: ${a.min}-${a.max} yrs. ${a.note}`, color: '#ff8800′ });
    } else {
      setResult({ status: 'Overdue for Replacement', action: `Past expected lifespan. Risk of failure increases rapidly. ${a.note}`, color: '#ff4444′ });
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Appliance Life Expectancy Guide 2026</h1>
        <p style={{ color: '#8899aa', marginBottom: 32 }}>How long appliances last in DFW — hard water, heat, and humidity all shorten the clock.</p>

        <div style={{ background: '#132240', borderRadius: 12, padding: '20px', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                {['Appliance', 'DFW Lifespan', 'Key DFW Factor'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['🧊 Refrigerator', '13-17 yrs', 'Heat stress on compressor'],
                ['🍽️ Dishwasher', '9-12 yrs', 'Hard water scale buildup'],
                ['👕 Washer', '10-13 yrs', 'Humidity / mineral deposits'],
                ['🔥 Dryer', '10-13 yrs', 'Lint fire risk in summer heat'],
                ['🍳 Range/Oven', '13-15 yrs', 'Gas outlasts electric here'],
                ['🔩 Garbage Disposal', '8-12 yrs', 'Hard water mineral buildup'],
              ].map((row) => (
                <tr key={row[0]} style={{ borderBottom: '1px solid #1e3a5f' }}>
                  {row.map((cell, i) => (
                    <td key={i} style={{ padding: '10px 12px', color: i === 0 ? '#fff' : '#cdd9e5', fontSize: 14 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Appliance Age Calculator</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <select value={appliance} onChange={(e) => { setAppliance(e.target.value); setResult(null); }}
              style={{ padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #F5E642', fontSize: 15 }}>
              <option value="">Select appliance...</option>
              <option value="refrigerator">Refrigerator</option>
              <option value="dishwasher">Dishwasher</option>
              <option value="washer">Washer</option>
              <option value="dryer">Dryer</option>
              <option value="range">Range/Oven</option>
              <option value="disposal">Garbage Disposal</option>
            </select>
            <input type="number" placeholder="Age in years" value={age} onChange={(e) => { setAge(e.target.value); setResult(null); }}
              style={{ padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #F5E642', fontSize: 15 }} />
          </div>
          <button onClick={handleCheck}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', fontSize: 15 }}>
            Check Life Expectancy
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: '16px', borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontWeight: 700, color: result.color, marginBottom: 6 }}>{result.status}</div>
              <div style={{ color: '#cdd9e5', fontSize: 14 }}>{result.action}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>Find a DFW Appliance Pro on ProLnk</div>
          <div style={{ fontSize: 14 }}>Repair or replacement — match with vetted DFW appliance specialists in minutes.</div>
        </div>
      </div>
    </div>
  );
}