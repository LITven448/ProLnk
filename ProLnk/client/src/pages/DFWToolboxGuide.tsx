import { useState } from 'react';

const toolsByAge = {
  'pre-1980': {
    essential: ['Foundation moisture meter', 'Pressure gauge (water line)', 'Pipe wrench set', 'Circuit tester', 'HVAC filter gauge', 'Caulk gun', 'Drill/driver', 'Stud finder'],
    rent: ['Roto-rooter', 'Air compressor (large)', 'Wet/dry vac (industrial)', 'Scaffold'],
    invest: '$620–$940'
  },
  '1980-2005': {
    essential: ['HVAC filter gauge', 'Cordless drill', 'Stud finder', 'Pressure gauge', 'Level (48")', 'Utility knife set', 'Adjustable wrench', 'Voltage tester'],
    rent: ['Pressure washer', 'Tile saw', 'Drywall lift', 'Concrete grinder'],
    invest: '$480–$720'
  },
  'post-2005': {
    essential: ['Smart leak sensor (x2)', 'HVAC filter gauge', 'Cordless drill', 'Voltage tester', 'Caulk gun', 'Level', 'Utility knife', 'Pipe tape'],
    rent: ['Pressure washer', 'Paint sprayer', 'Core drill', 'Scaffolding'],
    invest: '$320–$520'
  }
};

const comfortBonus: Record<string, string[]> = {
  beginner: ['Instruction manual binder', 'Color-coded tool organizer', 'Safety glasses + gloves'],
  intermediate: ['Oscillating multi-tool', 'Laser level', 'Inspection camera'],
  advanced: ['Reciprocating saw', 'Impact driver', 'Moisture meter (wall-grade)']
};

export default function DFWToolboxGuide() {
  const [age, setAge] = useState('');
  const [comfort, setComfort] = useState('');
  const result = age ? toolsByAge[age as keyof typeof toolsByAge] : null;
  const bonus = comfort ? comfortBonus[comfort] : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER RESOURCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>🧰 The DFW Homeowner Toolbox Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Essential tools, DFW-specific must-haves, and what to rent vs own — built for North Texas homes.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 DFW-Specific Must-Haves</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🌡️ Foundation Moisture Meter','Clay soil expansion damages slabs — monitor monthly'],['⏱️ Water Pressure Gauge','DFW pressure spikes bust supply lines'],['🔧 HVAC Filter Gauge','Tracks static pressure; DFW dust clogs fast'],['💧 Leak Sensor Set','Humidity swings cause hidden leaks under sinks']].map(([icon, desc]) => (
              <div key={icon} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Build Your Toolbox</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Home Age</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['pre-1980','1980-2005','post-2005'] as const).map(a => (
                <button key={a} onClick={() => setAge(a)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, background: age === a ? '#F5E642' : '#1E3A5F', color: age === a ? '#0A1628' : '#E8EDF5' }}>{a}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>DIY Comfort Level</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['beginner','intermediate','advanced'] as const).map(c => (
                <button key={c} onClick={() => setComfort(c)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, background: comfort === c ? '#F5E642' : '#1E3A5F', color: comfort === c ? '#0A1628' : '#E8EDF5', textTransform: 'capitalize' }}>{c}</button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>✅ Essential Toolbox ({result.invest} est.)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[...result.essential, ...bonus].map(t => <div key={t} style={{ background: '#0A1628', borderRadius: 6, padding: '8px 12px', fontSize: 13 }}>{t}</div>)}
              </div>
            </div>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🏪 Rent, Don't Buy</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {result.rent.map(t => <span key={t} style={{ background: '#1E3A5F', borderRadius: 20, padding: '6px 14px', fontSize: 13 }}>{t}</span>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
