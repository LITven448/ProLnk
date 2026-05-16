import { useState } from 'react';

const climateData = [
  { month: 'Jan', cdd: 0, hdd: 620, humidity: 55, desc: 'Peak heating month — gas furnace runs daily' },
  { month: 'Feb', cdd: 10, hdd: 480, humidity: 56, desc: 'Cold snaps possible — freeze-watch HVAC mode' },
  { month: 'Mar', cdd: 45, hdd: 280, humidity: 60, desc: 'Transition — system shifts heat to cool mid-month' },
  { month: 'Apr', cdd: 120, hdd: 80, humidity: 65, desc: 'Shoulder season — minimal run time, ideal for tune-up' },
  { month: 'May', cdd: 280, hdd: 10, humidity: 68, desc: 'AC kicks in — 90°F days begin, humidity rises' },
  { month: 'Jun', cdd: 420, hdd: 0, humidity: 62, desc: 'Hot and dry — AC runs 8-12 hrs/day' },
  { month: 'Jul', cdd: 580, hdd: 0, humidity: 55, desc: 'Peak cooling — 100°F+ days, highest bills' },
  { month: 'Aug', cdd: 560, hdd: 0, humidity: 52, desc: 'Near-peak — still brutal, dry heat stress on compressor' },
  { month: 'Sep', cdd: 380, hdd: 0, humidity: 58, desc: 'Still hot — relief comes late, AC needed through month' },
  { month: 'Oct', cdd: 160, hdd: 40, humidity: 62, desc: 'Transition back — some 80°F days still possible' },
  { month: 'Nov', cdd: 20, hdd: 280, humidity: 58, desc: 'Heating returns — first cold fronts arrive' },
  { month: 'Dec', cdd: 0, hdd: 520, humidity: 56, desc: 'Full winter — furnace season, watch for ice damming' },
];

const vintageMap: Record<string, string> = {
  'Pre-1980': 'Your older home likely has R-22 refrigerant (now banned), duct leakage up to 30%, and undersized equipment for modern DFW summers. Priority: duct sealing, refrigerant check, and right-sizing.',
  '1980-2000': 'SEER 8-10 era systems, possibly R-22. Insulation is marginal for 100°F+ summers. Consider upgrading to SEER 18+ for 40% savings.',
  '2000-2015': 'R-410A era. Likely SEER 12-16. Duct design improved but attic insulation may still be insufficient for DFW heat load. Good candidate for zoning.',
  'Post-2015': 'Modern systems, SEER 16-20+. Focus on smart thermostat programming and duct balancing for max efficiency in DFW climate.',
};

export default function DFWHVACDFWClimateSummary() {
  const [vintage, setVintage] = useState('');

  const totalCDD = climateData.reduce((s, m) => s + m.cdd, 0);
  const totalHDD = climateData.reduce((s, m) => s + m.hdd, 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600 }}>🌡️ DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Climate Summary for HVAC Owners</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, fontSize: 15 }}>
          Dallas-Fort Worth sits at the crossroads of hot Texas summers and cold Gulf-fed winters — one of the most demanding HVAC climates in the U.S.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'Cooling Degree Days', value: , sub: 'Annual CDD' },
            { label: 'Heating Degree Days', value: , sub: 'Annual HDD' },
            { label: 'Summer Design Temp', value: '100°F', sub: 'Equipment sizing basis' },
            { label: 'Winter Design Temp', value: '25°F', sub: 'Heating load basis' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F2240', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📅 Month-by-Month Climate Breakdown</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {climateData.map(m => (
              <div key={m.month} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 32, fontWeight: 700, color: '#F5E642', fontSize: 13 }}>{m.month}</div>
                <div style={{ flex: 1, fontSize: 13, color: '#CBD5E1' }}>{m.desc}</div>
                <div style={{ minWidth: 100, fontSize: 11, color: '#64748B', textAlign: 'right' }}>
                  {m.cdd > 0 ?  : ''}{m.hdd > 0 ?  : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🏠 What Does This Mean for My DFW Home?</h2>
          <select
            value={vintage}
            onChange={e => setVintage(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14, marginBottom: 16 }}
          >
            <option value=>Select your home vintage...</option>
            {Object.keys(vintageMap).map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          {vintage && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
              <strong style={{ color: '#F5E642' }}>{vintage} in DFW:</strong><br />{vintageMap[vintage]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
