import { useState } from 'react';

const SITUATIONS = ['My gas furnace is aging out', 'I want to reduce my carbon footprint', 'My electric bills are too high in summer', 'I am building or doing a major renovation', 'I want the best long-term investment'];

const PRIORITIES = ['Maximum environmental impact', 'Lowest operating cost', 'Best comfort in DFW heat', 'Highest rebates available', 'Balanced approach'];

type RecoKey = string;

const RECOMMENDATIONS: Record<RecoKey, { title: string; description: string; impact: string; cost: string; rebate: string }> = {
  'My gas furnace is aging out|Maximum environmental impact': {
    title: '🌿 Cold-Climate Heat Pump (All-Electric)',
    description: 'Replace your gas furnace and AC with a single all-electric heat pump. Modern cold-climate heat pumps work efficiently down to 0°F — well below any DFW winter. You eliminate gas entirely.',
    impact: 'Reduces home carbon emissions by 40-60% depending on ERCOT grid mix. Impact improves every year as Texas grid gets cleaner.',
    cost: '$6,000 – $12,000 installed depending on home size and current ductwork condition.',
    rebate: 'Federal IRA: up to $2,000. Oncor: up to $400. Net cost often under $8,000 after credits.',
  },
  default: {
    title: '⚡ High-SEER2 Heat Pump System',
    description: 'A heat pump rated SEER2 18+ with R-454B refrigerant (low global warming potential) is the most environmentally responsible HVAC choice for DFW. It provides both heating and cooling from one efficient system.',
    impact: 'A heat pump uses electricity 3x more efficiently than resistance heating. In DFW mild winters, a heat pump covers 90%+ of heating demand without backup heat.',
    cost: 'Typically $5,000 – $10,000 installed for a 3-ton system.',
    rebate: 'Federal IRA: up to $2,000. Oncor rebate: up to $400. Manufacturer rebate: $100-$300.',
  },
};

function getReco(situation: string, priority: string) {
  const key = `${situation}|${priority}`;
  return RECOMMENDATIONS[key] || RECOMMENDATIONS['default'];
}

const GREEN_PRINCIPLES = [
  { icon: '🔄', title: 'Right-Size First', desc: 'Oversized equipment is the biggest hidden waste in DFW homes. A properly sized system runs longer cycles, dehumidifies better, and uses less energy over its life.' },
  { icon: '🌡️', title: 'Refrigerant Choice Matters', desc: 'R-410A (common in older systems) has a GWP of 2,088. New R-454B and R-32 refrigerants have GWP under 700 — a 65%+ reduction in leak impact.' },
  { icon: '⚡', title: 'Heat Pumps Are 3x More Efficient', desc: 'A heat pump moves heat rather than generating it. For every 1 kWh of electricity, a heat pump delivers 3 kWh of heating or cooling. Gas furnaces top out at 98% efficient.' },
  { icon: '🏠', title: 'The Envelope First', desc: 'Adding insulation and air sealing before replacing equipment means you can install a smaller, cheaper system. The building envelope multiplies every upgrade.' },
];

export default function DFWHVACGreenUpgradeGuide() {
  const [situation, setSituation] = useState('');
  const [priority, setPriority] = useState('');
  const reco = situation && priority ? getReco(situation, priority) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Green HVAC Upgrades for DFW Homes</h1>
        <p style={{ color: '#8899AA', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          The most environmentally responsible HVAC choices for DFW are also often the most cost-effective long term. Here is what actually matters — and what does not.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🌍 Green HVAC Principles for DFW</h2>
          {GREEN_PRINCIPLES.map(p => (
            <div key={p.title} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: '#8899AA', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📍 Your Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SITUATIONS.map(s => (
              <button key={s} onClick={() => setSituation(s)} style={{ background: situation === s ? '#F5E642' : '#162030', color: situation === s ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: situation === s ? 700 : 400, fontSize: 14 }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🎯 Your Green Priority</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PRIORITIES.map(p => (
              <button key={p} onClick={() => setPriority(p)} style={{ background: priority === p ? '#F5E642' : '#162030', color: priority === p ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: priority === p ? 700 : 400, fontSize: 13 }}>{p}</button>
            ))}
          </div>
        </div>

        {reco && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>✅ Your Green Upgrade Recommendation</h2>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{reco.title}</div>
            <p style={{ fontSize: 14, color: '#ddd', lineHeight: 1.7, marginBottom: 16 }}>{reco.description}</p>
            {[['🌱 Environmental Impact', reco.impact], ['💰 Estimated Cost', reco.cost], ['🏷️ Available Rebates', reco.rebate]].map(([label, value]) => (
              <div key={label} style={{ background: '#162030', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6, color: '#F5E642' }}>{label}</div>
                <div style={{ fontSize: 13, color: '#ddd', lineHeight: 1.6 }}>{value}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>ProLnk Matches You with Green-Certified Techs</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>Heat pump installation requires specific training. ProLnk vets techs for NATE certification and heat pump experience so your green upgrade is done right.</div>
        </div>
      </div>
    </div>
  );
}
