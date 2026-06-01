import { useState } from 'react';

const WORKSHOP_TYPES = ['Woodworking','Metalworking','Auto/Garage','General DIY','Painting/Finishing'];
const TOOL_SETS: Record<string,string[]> = {
  'Woodworking': ['Table saw','Router','Sander','Lathe','Band saw'],
  'Metalworking': ['Welder','Grinder','Drill press','Plasma cutter','Metal lathe'],
  'Auto/Garage': ['Air compressor','Impact wrench','Floor jack','Battery charger','Spray gun'],
  'General DIY': ['Drill','Circular saw','Jigsaw','Sander','Grinder'],
  'Painting/Finishing': ['Spray gun','HVLP sprayer','Air compressor','Heat gun','Respirator station'],
};

interface SafetyResult { ventilation: string; electrical: string; fire: string; amps: number; }

const safetyMap: Record<string,SafetyResult> = {
  'Woodworking': { ventilation: 'Dedicated dust collector + air filtration unit required. DFW summer heat (100°F+) accelerates sawdust combustion risk — never leave collector unattended.', electrical: '240V 50A circuit for table saw + 20A for dust collector', fire: 'Fire extinguisher class ABC within 10ft. Empty dust bags after every session.', amps: 60 },
  'Metalworking': { ventilation: 'Welding fume extractor mandatory. DFW humidity can cause fume concentration — cross-ventilation with 2 openings minimum.', electrical: '240V welder circuit + dedicated ground. Plasma cutter needs clean power.', fire: 'Class D extinguisher for metal chips. 3ft metal-free zone around welder.', amps: 80 },
  'Auto/Garage': { ventilation: 'CO detector required if running engine indoors. 4-air-change minimum per hour in DFW heat to prevent CO buildup.', electrical: '20A for compressor + 20A general + GFCI on all outlets', fire: 'Class B for flammables. Store oil/gas in approved containers only.', amps: 40 },
  'General DIY': { ventilation: 'Box fan exhaust minimum. DFW summer — ventilate during cooler morning hours.', electrical: '20A circuits on opposite walls for flexibility', fire: 'ABC extinguisher. Keep floor clear of scrap and shavings.', amps: 30 },
  'Painting/Finishing': { ventilation: 'Explosion-proof exhaust fan required for spray finishing. DFW humidity affects finish times — monitor with gauge.', electrical: 'Explosion-proof fixtures only in spray area. All switches outside spray zone.', fire: 'Class B extinguisher. Zero ignition sources during spray operations.', amps: 30 },
};

export default function DFWWorkshopSafetyGuide() {
  const [workshopType, setWorkshopType] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [result, setResult] = useState<SafetyResult|null>(null);

  function toggleTool(tool: string) {
    setSelectedTools(prev => prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]);
  }

  function calculate() {
    if (!workshopType) return;
    setResult(safetyMap[workshopType]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>Workshop Safety Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 32, fontSize: 16 }}>DFW heat and humidity create unique workshop hazards. Here's what DFW homeowners need to know.</p>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>⚠️ DFW-Specific Risks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '🌡️', title: 'Extreme Heat', desc: '100°F+ summers accelerate sawdust combustion and make workshop fires 3x more likely June-September' },
              { icon: '💨', title: 'Dust + Humidity', desc: 'DFW humidity swings cause wood dust to clump and clog collectors — inspect bags weekly' },
              { icon: '⚡', title: 'Electrical Load', desc: 'DFW grid stress during summer peaks — surge protection on all sensitive equipment' },
              { icon: '🌪️', title: 'Storm Season', desc: 'Spring storms bring power surges — UPS recommended for CNC and digital equipment' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#8899AA', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Get Your Safety Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>Workshop Type</label>
            <select value={workshopType} onChange={e => { setWorkshopType(e.target.value); setSelectedTools([]); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3050', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15 }}>
              <option value=''>Select type...</option>
              {WORKSHOP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {workshopType && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 8 }}>Tools in Your Shop (select all that apply)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TOOL_SETS[workshopType].map(tool => (
                  <button key={tool} onClick={() => toggleTool(tool)} style={{ background: selectedTools.includes(tool) ? '#F5E642' : '#0A1628', color: selectedTools.includes(tool) ? '#0A1628' : '#fff', border: '1px solid #1E3050', borderRadius: 20, padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: selectedTools.includes(tool) ? 700 : 400 }}>{tool}</button>
                ))}
              </div>
            </div>
          )}
          <button onClick={calculate} disabled={!workshopType} style={{ background: workshopType ? '#F5E642' : '#1E3050', color: workshopType ? '#0A1628' : '#8899AA', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: workshopType ? 'pointer' : 'not-allowed', width: '100%' }}>Generate Safety Plan</button>
        </div>

        {result && (
          <div style={{ background: '#0D2137', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛡️ Your Workshop Safety Requirements</h3>
            {[
              { label: '💨 Ventilation', value: result.ventilation },
              { label: '⚡ Electrical', value: result.electrical },
              { label: '🔥 Fire Safety', value: result.fire },
              { label: '📊 Recommended Panel Capacity', value: `${result.amps}A` },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #1E3050' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#CCD6E0', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
