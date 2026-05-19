import { useState } from 'react';

const moldData: Record<string, { level: string; color: string; steps: string[] }> = {
  attic: { level: 'HIGH RISK', color: '#ef4444', steps: ['🔍 Inspect ridge vent and soffit vents for blockage','🌬️ Ensure attic has 1 sq ft ventilation per 150 sq ft','📏 Check insulation not blocking soffit vents','🛠️ Install powered attic fan if passive vents insufficient','📞 Call pro if visible mold already present'] },
  bathroom: { level: 'MODERATE RISK', color: '#f59e0b', steps: ['💨 Run exhaust fan during and 30 min after shower','🔧 Upgrade to 110 CFM fan if bathroom >60 sq ft','🧹 Clean grout lines quarterly with mold-inhibiting cleaner','🪟 Keep window cracked if fan is undersized','🔍 Inspect caulk around tub/shower annually'] },
  hvac: { level: 'HIGH RISK', color: '#ef4444', steps: ['❄️ Change air filter every 60 days (DFW humidity demands this)','🧊 Inspect evaporator coil annually for mold/slime','💧 Ensure condensate drain line is clear and flowing','📊 Keep indoor humidity 45–55% with dehumidifier if needed','📞 HVAC tune-up in April before humidity season'] },
  crawlspace: { level: 'VERY HIGH RISK', color: '#dc2626', steps: ['🛡️ Install 6-mil vapor barrier on crawl space floor','💨 Ensure cross-ventilation or encapsulation','📏 Maintain 18-inch clearance below joists','🔍 Inspect after heavy rain events','📞 Encapsulation recommended for DFW clay soil homes'] },
  basement: { level: 'MODERATE RISK', color: '#f59e0b', steps: ['💧 Run dehumidifier to keep below 60% RH','🔍 Check window well drains after storms','🧱 Apply masonry waterproofer on bare concrete walls','📦 Store items off floor on pallets or shelving','📞 Consider interior French drain if chronic seepage'] },
};

export default function DFWMoldPreventionGuide2026() {
  const [area, setArea] = useState('');
  const result = area ? moldData[area] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME HEALTH VAULT · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🍄 DFW Mold Prevention Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>DFW spring humidity surges create prime mold conditions. Attic, bathroom, and HVAC are the top three problem spots in North Texas homes.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
          {[['🌧️','DFW Spring RH','70–90% humidity common'],['🏠','Top Threat','Attic + HVAC coils'],['💲','Avg Remediation','$1,500–$15,000']].map(([icon, title, sub]) => (
            <div key={title} style={{ background: '#1a2744', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642′ }}>{title}</div>
              <div style={{ fontSize: 12, color: '#94a3b8′ }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 Mold Risk Assessment</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>Select area of concern:</label>
          <select value={area} onChange={e => setArea(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155', fontSize: 15, marginBottom: 16 }}>
            <option value=''>-- Select area --</option>
            <option value='attic'>Attic</option>
            <option value='bathroom'>Bathroom</option>
            <option value='hvac'>HVAC / Air Handler</option>
            <option value='crawlspace'>Crawl Space</option>
            <option value='basement'>Basement</option>
          </select>
          {result && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12, borderLeft: `4px solid ${result.color}` }}>
                <div style={{ fontWeight: 700, color: result.color }}>{result.level}</div>
              </div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Action Steps:</div>
              {result.steps.map(s => <div key={s} style={{ fontSize: 14, color: '#cbd5e1', marginBottom: 6 }}>{s}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🔬 DIY vs. Call a Pro</h2>
          {[['🧹','DIY OK','Surface mold under 10 sq ft on non-porous surfaces'],['📞','Call Pro','Any mold on drywall, wood, or insulation'],['🚨','Emergency','Musty smell from HVAC vents — potential systemic spread'],['🏥','Health Alert','Respiratory symptoms + visible mold = immediate remediation']].map(([icon, label, desc]) => (
            <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 20 }}>{icon}</div>
              <div><div style={{ fontWeight: 600, fontSize: 14, color: '#F5E642′ }}>{label}</div><div style={{ fontSize: 13, color: '#94a3b8' }}>{desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
