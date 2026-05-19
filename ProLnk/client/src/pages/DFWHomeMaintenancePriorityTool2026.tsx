import { useState } from 'react';

export default function DFWHomeMaintenancePriorityTool2026() {
  const [homeAge, setHomeAge] = useState(15);
  const [hvacCondition, setHvacCondition] = useState('fair');
  const [roofCondition, setRoofCondition] = useState('good');
  const [foundationCondition, setFoundationCondition] = useState('good');
  const [plumbingCondition, setPlumbingCondition] = useState('good');
  const [electricalCondition, setElectricalCondition] = useState('good');

  const scoreMap = { poor: 3, fair: 2, good: 1 };
  const ageFactor = homeAge > 30 ? 2 : homeAge > 15 ? 1 : 0;

  const systems = [
    { name: 'HVAC', icon: '❄️', condition: hvacCondition, score: scoreMap[hvacCondition as keyof typeof scoreMap] + ageFactor,
      costs: { poor: '$6,000–$14,000 replacement', fair: '$300–$800 tune-up + repair', good: '$150–$250 annual service' },
      tip: 'DFW HVAC runs 9+ months/yr — highest priority system' },
    { name: 'Roof', icon: '🏠', condition: roofCondition, score: scoreMap[roofCondition as keyof typeof scoreMap] + ageFactor,
      costs: { poor: '$12,000–$28,000 replacement', fair: '$1,500–$4,000 repair', good: '$200–$500 inspection' },
      tip: 'DFW hail storms cause $2B+ damage annually — document condition' },
    { name: 'Foundation', icon: '🏗️', condition: foundationCondition, score: scoreMap[foundationCondition as keyof typeof scoreMap] + (ageFactor * 2),
      costs: { poor: '$8,000–$35,000 repair', fair: '$3,000–$10,000 stabilization', good: '$350–$600 inspection' },
      tip: 'DFW clay soil expands/contracts — biggest hidden risk in DFW' },
    { name: 'Plumbing', icon: '🚿', condition: plumbingCondition, score: scoreMap[plumbingCondition as keyof typeof scoreMap] + ageFactor,
      costs: { poor: '$4,000–$15,000 repiping', fair: '$500–$3,000 repairs', good: '$100–$300 annual check' },
      tip: 'DFW hard water accelerates pipe corrosion — check water softener' },
    { name: 'Electrical', icon: '⚡', condition: electricalCondition, score: scoreMap[electricalCondition as keyof typeof scoreMap] + ageFactor,
      costs: { poor: '$8,000–$20,000 rewire', fair: '$1,000–$5,000 panel upgrade', good: '$200–$400 safety inspection' },
      tip: 'Homes 30+ yrs often have outdated panels — insurance concern' },
  ];

  const sorted = [...systems].sort((a, b) => b.score - a.score);
  const priorityColors = ['#E55555', '#E59000', '#E5C500', '#55A055', '#5599CC'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Home Maintenance Priority Tool 2026</h1>
          <p style={{ color: '#8899BB', fontSize: 14 }}>Score your home systems to get a prioritized maintenance plan</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>Home Age: {homeAge} years</div>
          <input type="range" min={1} max={60} value={homeAge} onChange={e => setHomeAge(+e.target.value)}
            style={{ width: '100%', accentColor: '#F5E642′ }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8899BB', fontSize: 12 }}><span>New</span><span>60 yrs</span></div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>System Conditions</div>
          {[
            ['HVAC', hvacCondition, setHvacCondition],
            ['Roof', roofCondition, setRoofCondition],
            ['Foundation', foundationCondition, setFoundationCondition],
            ['Plumbing', plumbingCondition, setPlumbingCondition],
            ['Electrical', electricalCondition, setElectricalCondition],
          ].map(([name, val, setter]) => (
            <div key={name as string} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ width: 90, color: '#ccc', fontSize: 14 }}>{name as string}</div>
              {['good', 'fair', 'poor'].map(opt => (
                <button key={opt} onClick={() => (setter as (v: string) => void)(opt)}
                  style={{ padding: '5px 12px', background: val === opt ? (opt === 'good' ? '#2A7A2A' : opt === 'fair' ? '#8A6000′ : '#8A2A2A') : '#1A2A45',
                    color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, textTransform: 'capitalize', fontWeight: val === opt ? 700 : 400 }}>
                  {opt}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 16 }}>📊 Your Priority Maintenance Plan</div>
        {sorted.map((sys, i) => (
          <div key={sys.name} style={{ background: '#111D35', borderRadius: 10, padding: 16, marginBottom: 12, borderLeft: `4px solid ${priorityColors[i]}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontWeight: 700 }}>{sys.icon} {sys.name}</div>
              <div style={{ background: priorityColors[i], color: '#0A1628', borderRadius: 12, padding: '2px 10px', fontSize: 12, fontWeight: 900 }}>
                Priority {i + 1}
              </div>
            </div>
            <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>💰 {sys.costs[sys.condition as keyof typeof sys.costs]}</div>
            <div style={{ color: '#8899BB', fontSize: 12 }}>💡 {sys.tip}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

