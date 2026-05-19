import { useState } from 'react';

export default function DFWFireplaceHeatingGuide2026() {
  const [fireplaceType, setFireplaceType] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!fireplaceType) { setResult('Please select your fireplace type.'); return; }
    if (fireplaceType === 'wood-open') {
      setResult('🔴 Least efficient. Traditional open wood fireplaces send 80–90% of heat up the chimney. Net effect: your room may actually get colder as the fireplace draws warm air from the house. Best use: ambiance only. To improve: add glass doors and a heat circulator kit ($200–$400).');
      return;
    }
    if (fireplaceType === 'wood-insert') {
      setResult('✅ Good supplemental heat. Wood inserts are 65–80% efficient — close the damper with the insert and heat circulates into the room. Can heat 500–1,000 sqft effectively. DFW wood: mesquite and oak burn well. Cost: $2,500–$5,000 installed.');
      return;
    }
    if (fireplaceType === 'gas-logs') {
      setResult('🟡 Decorative only. Unvented gas logs produce heat (99% efficient) but add moisture and CO to indoor air — not recommended for extended use. Vented gas logs are ~30% efficient (70% up the flue). Good for ambiance, not meaningful supplemental heat in DFW.');
      return;
    }
    if (fireplaceType === 'gas-insert') {
      setResult('✅ Best gas option. Gas inserts achieve 70–85% efficiency. Direct vent models bring outside air for combustion — safer for DFW airtight homes. Can reduce HVAC run time during mild DFW cold spells. Installation: $3,000–$6,000.');
      return;
    }
    if (fireplaceType === 'electric') {
      setResult('✅ 100% heat to room. Electric fireplaces convert all electricity to heat — no flue loss. At 1,500W they produce ~5,100 BTU/hr. Cost: $0.18–$0.30/hr in DFW. Best for zone heating a single room while turning HVAC down. Portable units $150–$400, built-in $800–$2,500.');
      return;
    }
    setResult('Select a fireplace type to see your assessment.');
  };

  const types = [
    { icon: '🪵', name: 'Wood Open', eff: '10–20%', heat: 'Net negative', note: 'Draws warm air out' },
    { icon: '🔥', name: 'Wood Insert', eff: '65–80%', heat: 'Good', note: '500–1,000 sqft range' },
    { icon: '🔵', name: 'Gas Logs', eff: '30%', heat: 'Minimal', note: 'Decorative primary use' },
    { icon: '💙', name: 'Gas Insert', eff: '70–85%', heat: 'Good', note: 'Best gas option' },
    { icon: '⚡', name: 'Electric', eff: '100%', heat: 'Zone heat', note: 'Best for single room' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Fireplace as Heat Source Guide 2026</h1>
          <p style={{ color: '#a0aec0′ }}>Not all fireplaces heat your home — here’s the real story</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f', overflowX: 'auto' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>Efficiency Comparison</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                {['Type', 'Efficiency', 'Heating Value', 'DFW Note'].map(h => (
                  <th key={h} style={{ color: '#F5E642', textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #1e3a5f' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {types.map((t, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e3a5f' }}>
                  <td style={{ padding: '0.5rem', color: '#e2e8f0′ }}>{t.icon} {t.name}</td>
                  <td style={{ padding: '0.5rem', color: '#F5E642', fontWeight: 700 }}>{t.eff}</td>
                  <td style={{ padding: '0.5rem', color: '#a0aec0′ }}>{t.heat}</td>
                  <td style={{ padding: '0.5rem', color: '#a0aec0′ }}>{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🌡️', title: 'DFW Usage Reality', desc: 'DFW homeowners use fireplaces 10–20 evenings per year on average. At this usage level, even an inefficient fireplace has minimal impact on annual heating costs — comfort and ambiance drive the purchase decision more than economics.' },
            { icon: '💨', title: 'Chimney Draft Issues', desc: 'Open wood fireplaces in DFW often have draft issues in mild weather — the temperature differential isn\’t strong enough to create good chimney draw. Result: smoke in the room. A gas insert eliminates this problem entirely.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', margin: '0 0 0.5rem', fontSize: '1rem' }}>{card.title}</h3>
              <p style={{ color: '#a0aec0', margin: 0, fontSize: '0.875rem', lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔥 Fireplace Efficiency Tool</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#a0aec0', fontSize: '0.875rem' }}>Your Fireplace Type</label>
            <select value={fireplaceType} onChange={e => setFireplaceType(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 4, padding: '0.5rem', borderRadius: 6, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff' }}>
              <option value=''>Select fireplace type</option>
              <option value='wood-open'>Traditional open wood-burning</option>
              <option value='wood-insert'>Wood insert (sealed, with blower)</option>
              <option value='gas-logs'>Gas logs (vented or unvented)</option>
              <option value='gas-insert'>Gas insert (direct vent)</option>
              <option value='electric'>Electric fireplace</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get Recommendation
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}
