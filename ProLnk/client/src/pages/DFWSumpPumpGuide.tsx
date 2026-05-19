import { useState } from 'react';

const recommendations: Record<string, Record<string, { pumpType: string; backup: string; cost: string; notes: string }>> = {
  stormShelter: {
    low: { pumpType: 'Pedestal Sump Pump (1/3 HP)', backup: 'Battery backup recommended — DFW storms can cause outages during heaviest rain', cost: '$150–$400 pump; $200–$500 professional install', notes: 'Storm shelters in DFW accumulate groundwater and condensation. A pedestal pump keeps the motor above water level.' },
    medium: { pumpType: 'Submersible Sump Pump (1/2 HP)', backup: 'Battery backup unit essential — combine primary + backup in one system', cost: '$200–$600 pump; $350–$700 installed', notes: 'Medium flood risk zones: check FEMA flood map. DFW has expanded floodplains after recent development.' },
    high: { pumpType: 'Submersible Sump Pump (3/4 HP) + Secondary Unit', backup: 'Water-powered backup + battery backup dual system recommended', cost: '$500–$1,200 system; $600–$1,000 installed', notes: 'High flood risk (Zone AE/AO on FEMA map): run two sump pumps. Consider French drain + sump combination.' },
  },
  pumpRoom: {
    low: { pumpType: 'Submersible Sump Pump (1/3–1/2 HP)', backup: 'Battery backup recommended — even low-risk pump rooms see condensation buildup', cost: '$150–$500 pump; $250–$600 installed', notes: 'Equipment rooms with water heaters, softeners, or HVAC coils generate condensation and minor leaks.' },
    medium: { pumpType: 'Submersible Sump Pump (1/2 HP) with check valve', backup: 'Battery backup required — pump failure during storm = flooded equipment', cost: '$250–$600 pump; $400–$800 installed', notes: 'Check valve prevents backflow. Critical for DFW homes where pump rooms sit 2–4 ft below grade.' },
    high: { pumpType: 'Commercial-grade Submersible (3/4–1 HP)', backup: 'Dual pump system with alternating operation. Battery + generator backup.', cost: '$600–$1,500 system; $800–$1,500 installed', notes: 'High risk pump rooms: consider sump basin enlargement and alarm system for overflow detection.' },
  },
  crawlspace: {
    low: { pumpType: 'Crawlspace-specific sump pump with wide basin', backup: 'Battery backup with alert system — crawlspace flooding is often undetected', cost: '$200–$500 pump; $400–$900 installed with basin', notes: 'DFW has limited crawlspace homes but those that exist often have drainage issues from clay soil.' },
    medium: { pumpType: 'Submersible Sump Pump (1/2 HP) with crawlspace encapsulation', backup: 'Battery backup + water alarm at different heights', cost: '$800–$2,500 full encapsulation + pump system', notes: 'Encapsulate crawlspace with vapor barrier while installing pump to prevent recurrence.' },
    high: { pumpType: 'Heavy-duty Submersible + Drainage matting system', backup: 'Dual pump + battery backup + remote monitoring alert', cost: '$1,500–$4,000 full remediation system', notes: 'High-risk crawlspaces in DFW may need exterior waterproofing and French drains before pumping alone helps.' },
  },
  belowGradeRoom: {
    low: { pumpType: 'Submersible Sump Pump (1/2 HP) in dedicated basin', backup: 'Battery backup unit — power outages during DFW storms are common', cost: '$300–$700 pump + basin; $500–$1,000 installed', notes: 'Below-grade finished rooms (offices, media rooms) are rare in DFW but exist in newer custom homes.' },
    medium: { pumpType: 'Submersible (3/4 HP) with interior drainage channel', backup: 'Battery backup + overflow alarm installed at floor level', cost: '$1,000–$3,000 drainage + pump system', notes: 'Interior drainage channel routes water to sump basin before it reaches finished flooring.' },
    high: { pumpType: 'Commercial submersible + interior waterproofing system', backup: 'Dual pump system + generator hookup + remote water sensor alerts', cost: '$3,000–$8,000 full waterproofing system', notes: 'Zone AE/AO homes with below-grade rooms: consult waterproofing contractor before pump selection.' },
  },
};

const spaceLabels: Record<string, string> = { stormShelter: '🌪️ Storm Shelter / Safe Room', pumpRoom: '⚙️ Below-Grade Pump Room', crawlspace: '🏠 Crawlspace', belowGradeRoom: '🛋️ Below-Grade Living Space' };
const riskLabels: Record<string, string> = { low: '🟢 Low Flood Risk', medium: '🟡 Medium Flood Risk', high: '🔴 High Flood Risk (FEMA Zone AE/AO)' };

export default function DFWSumpPumpGuide() {
  const [spaceType, setSpaceType] = useState('');
  const [floodRisk, setFloodRisk] = useState('');
  const result = spaceType && floodRisk ? recommendations[spaceType]?.[floodRisk] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🏡 DFW HOME SYSTEMS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Sump Pump Guide — DFW</h1>
        <p style={{ color: '#A0AABB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          DFW homes rarely have full basements, but many have storm shelters, pump rooms, crawlspaces, or below-grade spaces that need sump pump protection — especially during DFW's severe storm season when power outages and heavy rainfall coincide.
        </p>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ Why Battery Backup Matters in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { emoji: '⛈️', label: 'DFW Storm Pattern', desc: 'Severe thunderstorms in spring/fall bring 3–6 inch rainfall events. Power outages often occur during peak water infiltration.' },
              { emoji: '🔋', label: 'Battery Backup Units', desc: 'Provide 5–12 hours of pump operation during outages. Trigger automatically when primary power fails.' },
              { emoji: '💧', label: 'Water-Powered Backup', desc: 'Uses city water pressure to pump. Requires municipal water supply. Never fails due to battery drain.' },
              { emoji: '📱', label: 'Smart Monitoring', desc: 'Wi-Fi sump alarms send phone alerts when water level rises. Critical for DFW homeowners away during storms.' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.emoji}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#A0AABB', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Space Type + Flood Risk Lookup</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>Below-Grade Space Type</label>
              <select value={spaceType} onChange={e => setSpaceType(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select space...</option>
                {Object.entries(spaceLabels).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Flood Risk Level</label>
              <select value={floodRisk} onChange={e => setFloodRisk(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select risk...</option>
                {Object.entries(riskLabels).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              {[
                { label: 'RECOMMENDED PUMP TYPE', val: result.pumpType },
                { label: 'BACKUP RECOMMENDATION', val: result.backup },
                { label: 'ESTIMATED COST', val: result.cost },
                { label: 'DFW-SPECIFIC NOTES', val: result.notes },
              ].map(row => (
                <div key={row.label} style={{ marginBottom: 14 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{row.label}</div>
                  <div style={{ color: '#A0AABB', fontSize: 14, lineHeight: 1.5 }}>{row.val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🗺️ CHECK YOUR FEMA FLOOD MAP</div>
          <div style={{ color: '#A0AABB', fontSize: 14, lineHeight: 1.6 }}>Visit msc.fema.gov to look up your DFW address flood zone designation. Zone X = minimal risk. Zone AE/AO = 1% annual chance of flooding. Zone AE homes in DFW require flood insurance if federally backed mortgage.</div>
        </div>
      </div>
    </div>
  );
}
