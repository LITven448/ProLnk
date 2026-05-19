import { useState } from 'react';

const officeTypes = ['Dedicated home office', 'Shared bedroom office', 'Living room setup', 'Garage conversion', 'Sunroom office'];
const acSystems = ['Central AC (standard)', 'Central AC (high-efficiency)', 'Mini-split system', 'Window units', 'Heat pump system'];

type Plan = { optimization: string[]; energyCost: string; tips: string[]; };

function getPlan(office: string, ac: string): Plan {
  const isGarage = office.includes('Garage');
  const isSunroom = office.includes('Sunroom');
  const isHighEff = ac.includes('high-efficiency');
  const isMiniSplit = ac.includes('Mini-split');
  const baseCost = isGarage ? '$280–$380' : isSunroom ? '$220–$320' : '$140–$220';
  const adjustedCost = isHighEff || isMiniSplit ? baseCost.replace(/\d+/g, n => String(Math.round(Number(n) * 0.72))) : baseCost;
  return {
    optimization: [
      isMiniSplit ? '✅ Zone your mini-split to office only during work hours' : '✅ Use a smart thermostat with geofencing for your office zone',
      isGarage ? '⚠️ Add insulation to garage door — R-18 minimum for DFW summers' : '✅ Seal window gaps with weatherstripping before June heat arrives',
      '✅ Set office AC to 70°F during work, bump to 74°F on breaks',
      '✅ Pre-cool your office to 68°F before 8am while DFW temps are still below 90°F',
      isHighEff ? '✅ Use programmable schedules — your system handles longer cycles efficiently' : '⚡ Upgrade to 16+ SEER system — DFW WFH adds $600–900/yr to cooling bills',
    ],
    energyCost: adjustedCost + '/month (Jun–Sep)',
    tips: [
      '🌡️ DFW outdoor temps hit 100–108°F in July — every degree above 72°F indoors cuts productivity 3–8%',
      '💡 Run ceiling fan counterclockwise at medium speed — feels 4°F cooler, saves AC runtime',
      '🕗 Shift intensive work to 8am–12pm before DFW heat load peaks',
      '🪟 Close south and west blinds by 11am — solar gain adds 15–20°F to unshaded rooms',
    ],
  };
}

export default function DFWHVACProductivityGuide() {
  const [office, setOffice] = useState('');
  const [ac, setAc] = useState('');
  const [plan, setPlan] = useState<Plan | null>(null);
  function generate() { if (office && ac) setPlan(getPlan(office, ac)); }
  const sel = { width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 } as const;
  const card = { background: '#0D1F3C', borderRadius: 12, padding: '20px 16px', textAlign: 'center' as const, border: '1px solid #1E3A5F' };
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', paddingBottom: 60 }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '1px solid #1E3A5F', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC GUIDE</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Work From Home Productivity<br /><span style={{ color: '#F5E642' }}>in DFW's Extreme Climate</span></h1>
          <p style={{ fontSize: 17, color: '#A8B4C8', lineHeight: 1.7, margin: 0 }}>Maintaining 68–72°F when outside temps hit 100°F+ demands smart HVAC strategy. Here's how DFW homeowners optimize their home offices without destroying their energy bills.</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['🌡️', '108°F', 'DFW peak summer temp'], ['💸', '+$780/yr', 'WFH energy premium'], ['🧠', '8%', 'Productivity loss above 75°F']].map(([icon, stat, label]) => (
            <div key={label} style={card}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642' }}>{stat}</div>
              <div style={{ fontSize: 12, color: '#6B7A99', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 20px', color: '#F5E642' }}>🔧 Get Your WFH Optimization Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>HOME OFFICE TYPE</label>
              <select value={office} onChange={e => setOffice(e.target.value)} style={sel}>
                <option value="">Select office type</option>
                {officeTypes.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>AC SYSTEM</label>
              <select value={ac} onChange={e => setAc(e.target.value)} style={sel}>
                <option value="">Select AC system</option>
                {acSystems.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} disabled={!office || !ac} style={{ background: office && ac ? '#F5E642' : '#1E3A5F', color: office && ac ? '#0A1628' : '#4A5568', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: office && ac ? 'pointer' : 'not-allowed' }}>Generate My Plan →</button>
        </div>
        {plan && (
          <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #F5E642' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: '#F5E642' }}>Your WFH HVAC Plan</h3>
            <div style={{ fontSize: 14, color: '#A8B4C8', marginBottom: 20 }}>Estimated cooling cost: <span style={{ color: '#F5E642', fontWeight: 700 }}>{plan.energyCost}</span></div>
            <div style={{ marginBottom: 20 }}>
              {plan.optimization.map((item, i) => <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1E3A5F', fontSize: 14, lineHeight: 1.6 }}>{item}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F5E642', marginBottom: 10, letterSpacing: 1 }}>DFW PRO TIPS</div>
              {plan.tips.map((t, i) => <div key={i} style={{ fontSize: 13, color: '#A8B4C8', padding: '5px 0', lineHeight: 1.6 }}>{t}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
