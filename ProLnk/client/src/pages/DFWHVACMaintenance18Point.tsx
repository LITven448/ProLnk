import { useState } from 'react';

const checklistItems = [
  { id: 1, item: 'Air filter inspection & replacement', why: 'DFW dust and pollen load is extreme — clogged filters reduce airflow 30%+ and spike energy bills', frequency: 'Every visit (monthly DIY between)' },
  { id: 2, item: 'Evaporator coil cleaning', why: 'Houston humidity pushes into DFW — dirty coils grow mold and lose 40% cooling efficiency', frequency: 'Every visit' },
  { id: 3, item: 'Condenser coil cleaning', why: 'DFW outdoor units collect cotton, debris, and clay dust — clogged coils cause compressor failure', frequency: 'Every visit' },
  { id: 4, item: 'Condensate drain line flush', why: 'DFW humidity causes algae growth — blocked drain floods your home ($5K+ water damage)', frequency: 'Every visit' },
  { id: 5, item: 'Capacitor voltage test', why: 'The #1 DFW summer failure — capacitors degrade fast in 100°F+ heat', frequency: 'Every visit' },
  { id: 6, item: 'Contactor inspection', why: 'Pitting contactors cause compressor failure — DFW heat accelerates degradation 3x', frequency: 'Every visit' },
  { id: 7, item: 'Refrigerant pressure check', why: 'Low refrigerant = frozen coils in DFW humidity = compressor damage ($2,000-3,500 repair)', frequency: 'Every visit' },
  { id: 8, item: 'Thermostat calibration', why: 'Off-by-2° calibration wastes $40-80/month in DFW summer electricity bills', frequency: 'Every visit' },
  { id: 9, item: 'Airflow measurement (static pressure)', why: 'DFW homes with poor airflow cycle on/off inefficiently — diagnosis prevents premature failure', frequency: 'Every visit' },
  { id: 10, item: 'Electrical connections tighten & inspect', why: 'Loose connections arc and cause fires — DFW lightning season June-September adds risk', frequency: 'Every visit' },
  { id: 11, item: 'Blower motor inspection & lubrication', why: 'Motor failure mid-July in DFW = 3-day emergency wait + $600-900 repair', frequency: 'Every visit' },
  { id: 12, item: 'Heat exchanger inspection (heating systems)', why: 'Cracked heat exchangers leak CO — required by code in DFW and life-safety critical', frequency: 'Fall visit only' },
  { id: 13, item: 'Ignitor & flame sensor check', why: 'DFW February ice storms are the real test — a failed ignitor means no heat when you need it most', frequency: 'Fall visit only' },
  { id: 14, item: 'Safety switch testing', why: 'High-limit and pressure switches prevent catastrophic failure — test confirms protection is active', frequency: 'Every visit' },
  { id: 15, item: 'Duct leakage visual inspection', why: 'DFW homes average 25-30% duct loss — major energy waste spotted during maintenance', frequency: 'Every visit' },
  { id: 16, item: 'UV light/air quality system inspection', why: 'DFW allergen counts are among highest nationally — UV system effectiveness degrades annually', frequency: 'Every visit' },
  { id: 17, item: 'Outdoor unit level & clearance check', why: 'Settled foundations (common in DFW clay soil) tilt units — unlevel units cause compressor oil failure', frequency: 'Every visit' },
  { id: 18, item: 'System performance test (delta-T measurement)', why: 'Temperature split across coil confirms overall system efficiency — catch decline before failure', frequency: 'Every visit' },
];

export default function DFWHVACMaintenance18Point() {
  const [checked, setChecked] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  function toggle(id: number) {
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const pct = Math.round((checked.length / checklistItems.length) * 100);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>18-Point Maintenance Checklist</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>Every item your DFW HVAC tech should complete at each maintenance visit — with why it matters in this specific climate.</p>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ position: 'relative', width: 80, height: 80 }}>
            <svg viewBox="0 0 80 80″ style={{ width: 80, height: 80, transform: 'rotate(-90deg)' }}>
              <circle cx="40″ cy="40" r="34" fill="none" stroke="#1E3A5F" strokeWidth="8" />
              <circle cx="40″ cy="40" r="34" fill="none" stroke="#F5E642" strokeWidth="8" strokeDasharray={`${pct * 2.136} 213.6`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: '#F5E642′ }}>{pct}%</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{checked.length} of 18 Items Checked</div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>
              {pct < 50 ? '⚠️ Incomplete inspection — ask your tech about missing items' : pct < 89 ? '📋 Good progress — a few items remain' : '✅ Full 18-point inspection complete!'}
            </div>
          </div>
        </div>

        {checklistItems.map((ci) => (
          <div key={ci.id} style={{ background: '#111D35', borderRadius: 10, marginBottom: 10, overflow: 'hidden', border: checked.includes(ci.id) ? '1px solid #22C55E' : '1px solid #1E3A5F' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', gap: 14, cursor: 'pointer' }} onClick={() => setExpanded(expanded === ci.id ? null : ci.id)}>
              <div onClick={e => { e.stopPropagation(); toggle(ci.id); }} style={{ width: 24, height: 24, borderRadius: 6, border: '2px solid', borderColor: checked.includes(ci.id) ? '#22C55E' : '#1E3A5F', background: checked.includes(ci.id) ? '#22C55E' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
                {checked.includes(ci.id) && <span style={{ color: '#0A1628', fontSize: 14, fontWeight: 900 }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600, fontSize: 15, textDecoration: checked.includes(ci.id) ? 'line-through' : 'none', color: checked.includes(ci.id) ? '#64748B' : '#E8EDF5′ }}>
                  {ci.id}. {ci.item}
                </span>
              </div>
              <span style={{ fontSize: 12, color: '#F5E642', background: '#1A2A10', padding: '3px 10px', borderRadius: 20, flexShrink: 0 }}>{ci.frequency.includes('Fall') ? '🍂 Fall' : '🔄 Each Visit'}</span>
              <span style={{ color: '#64748B', fontSize: 16 }}>{expanded === ci.id ? '▲' : '▼'}</span>
            </div>
            {expanded === ci.id && (
              <div style={{ padding: '0 18px 16px 56px', borderTop: '1px solid #1E3A5F' }}>
                <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 12, lineHeight: 1.6 }}>🌡️ {ci.why}</div>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>Frequency: {ci.frequency}</div>
              </div>
            )}
          </div>
        ))}

        <div style={{ marginTop: 32, padding: '20px 24px', background: '#0F1E38', borderRadius: 12, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>💡 Pro Tip: Print & Bring This List</div>
          <div style={{ fontSize: 14, color: '#94A3B8′ }}>Hand this checklist to your technician at the start of every visit. Legitimate DFW HVAC companies welcome it. If a tech is annoyed by the list, that’s a red flag worth noting.</div>
        </div>
      </div>
    </div>
  );
}
