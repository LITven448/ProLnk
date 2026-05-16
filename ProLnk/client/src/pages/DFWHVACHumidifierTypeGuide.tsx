import { useState } from 'react';

const humidifierData = {
  bypass: {
    name: 'Bypass Humidifier',
    bestFor: 'Homes under 2,500 sq ft with moderate dry spells',
    sizing: '0.7 gallons/hr per 1,000 sq ft',
    cost: '$300–$600 installed',
    pros: ['Low cost', 'Low maintenance', 'Quiet operation'],
    cons: ['Requires furnace to run', 'Less precise humidity control'],
    dfwNote: 'Works well for DFW mild winters but struggles during severe cold snaps',
  },
  fanPowered: {
    name: 'Fan-Powered Humidifier',
    bestFor: 'Homes 2,000–4,000 sq ft with frequent dry spells',
    sizing: '1.0 gallon/hr per 1,000 sq ft',
    cost: '$500–$900 installed',
    pros: ['Works without furnace running', '33% more efficient than bypass', 'Better humidity control'],
    cons: ['Higher upfront cost', 'More moving parts'],
    dfwNote: 'Best match for DFW — handles 15-20% humidity winters without over-humidifying in mild spells',
  },
  steam: {
    name: 'Steam Humidifier',
    bestFor: 'Homes over 4,000 sq ft or with severe dry air problems',
    sizing: 'Up to 34 gallons/day for large DFW homes',
    cost: '$800–$1,800 installed',
    pros: ['Most precise control', 'Works independently of HVAC', 'Fastest humidity recovery'],
    cons: ['Highest cost', 'Higher energy use', 'Annual electrode replacement'],
    dfwNote: 'Ideal for DFW luxury homes with high ceilings — handles massive volume quickly',
  },
};

const getRecommendation = (size: string, problem: string) => {
  if (problem === 'severe' || size === 'large') return 'steam';
  if (size === 'medium' || problem === 'moderate') return 'fanPowered';
  return 'bypass';
};

export default function DFWHVACHumidifierTypeGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [humidityProblem, setHumidityProblem] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleCheck = () => {
    if (!homeSize || !humidityProblem) return;
    setResult(getRecommendation(homeSize, humidityProblem));
  };

  const rec = result ? humidifierData[result as keyof typeof humidifierData] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>💧 DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Humidifier Type Guide for DFW Homes
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW winters drop indoor humidity to 15–20% — triggering nosebleeds, cracking wood floors, static shocks, and
          respiratory irritation. Three humidifier types handle DFW dry spells differently. Here's how to choose.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Find Your Humidifier Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>HOME SIZE</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#1a2f55', color: '#fff', border: '1px solid #2a4080' }}>
                <option value="">Select size</option>
                <option value="small">Under 2,000 sq ft</option>
                <option value="medium">2,000–4,000 sq ft</option>
                <option value="large">Over 4,000 sq ft</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>DRY AIR PROBLEM</label>
              <select value={humidityProblem} onChange={e => setHumidityProblem(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#1a2f55', color: '#fff', border: '1px solid #2a4080' }}>
                <option value="">Select severity</option>
                <option value="mild">Mild — occasional static</option>
                <option value="moderate">Moderate — nosebleeds, dry skin</option>
                <option value="severe">Severe — cracking floors, frequent illness</option>
              </select>
            </div>
          </div>
          <button onClick={handleCheck}
            style={{ background: '#F5E642', color: '#0A1628', padding: '0.7rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
            Get Recommendation →
          </button>
        </div>

        {rec && (
          <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>✅ Recommended: {rec.name}</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>{rec.dfwNote}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div><div style={{ color: '#F5E642', fontSize: '0.75rem' }}>BEST FOR</div><div style={{ fontSize: '0.9rem' }}>{rec.bestFor}</div></div>
              <div><div style={{ color: '#F5E642', fontSize: '0.75rem' }}>SIZING</div><div style={{ fontSize: '0.9rem' }}>{rec.sizing}</div></div>
              <div><div style={{ color: '#F5E642', fontSize: '0.75rem' }}>INSTALLED COST</div><div style={{ fontSize: '0.9rem' }}>{rec.cost}</div></div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>📊 All Three Types Compared</h2>
        {Object.values(humidifierData).map(h => (
          <div key={h.name} style={{ background: '#0f1f3d', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
            <h3 style={{ marginBottom: '0.4rem' }}>🌡️ {h.name}</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{h.dfwNote}</p>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem' }}>
              <div><span style={{ color: '#F5E642' }}>Cost: </span>{h.cost}</div>
              <div><span style={{ color: '#F5E642' }}>Sizing: </span>{h.sizing}</div>
            </div>
          </div>
        ))}

        <div style={{ background: '#0f1f3d', borderRadius: '10px', padding: '1.2rem', marginTop: '1rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>⚠️ DFW Install Tips</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 2, paddingLeft: '1.2rem' }}>
            <li>Set humidistat to 35–45% RH for DFW winters — don't chase 50%+ or you'll get window condensation</li>
            <li>Install a whole-home humidistat, not just a furnace-mounted one, for accurate readings</li>
            <li>Bypass and fan-powered models need annual pad replacement — budget $30–60/yr</li>
            <li>Steam humidifiers need distilled water or annual electrode replacement in DFW's hard water areas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
