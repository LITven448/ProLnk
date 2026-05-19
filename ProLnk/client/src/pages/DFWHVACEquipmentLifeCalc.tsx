import { useState } from 'react';

const USE_LEVELS = [
  { label: 'Light use — often away, set at 80°F+', hrsPerYr: 2000 },
  { label: 'Average — home most days, 74–76°F', hrsPerYr: 2700 },
  { label: 'Heavy — home always, thermostat 70–72°F', hrsPerYr: 3200 },
  { label: 'Extreme — large home, multiple zones', hrsPerYr: 3600 },
];

const EQUIPMENT_TYPES = [
  { label: 'Central AC + Gas Furnace', totalLife: 36000 },
  { label: 'Heat Pump (all-electric)', totalLife: 30000 },
  { label: 'Package Unit', totalLife: 28000 },
  { label: 'Mini-Split / Ductless', totalLife: 40000 },
];

export default function DFWHVACEquipmentLifeCalc() {
  const [year, setYear] = useState(2015);
  const [useIdx, setUseIdx] = useState(1);
  const [eqIdx, setEqIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const currentYear = 2026;
  const age = currentYear - year;
  const useLevel = USE_LEVELS[useIdx];
  const equipment = EQUIPMENT_TYPES[eqIdx];

  const hoursUsed = age * useLevel.hrsPerYr;
  const hoursRemaining = Math.max(0, equipment.totalLife - hoursUsed);
  const yearsRemaining = hoursRemaining > 0 ? Math.floor(hoursRemaining / useLevel.hrsPerYr) : 0;
  const replacementYear = currentYear + yearsRemaining;
  const pctUsed = Math.min(100, Math.round((hoursUsed / equipment.totalLife) * 100));

  const urgency =
    pctUsed >= 90 ? 'Replace Now' : pctUsed >= 75 ? 'Plan Replacement' : pctUsed >= 50 ? 'Monitor Closely' : 'In Good Shape';
  const urgencyColor =
    pctUsed >= 90 ? '#ef4444′ : pctUsed >= 75 ? '#f97316' : pctUsed >= 50 ? '#eab308' : '#22c55e';

  const northernHrsPerYr = 900;
  const northernEquiv = Math.round(hoursUsed / northernHrsPerYr);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8 }}>⏳ DFW HVAC TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Equipment Life Calculator</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          DFW units run 2,500–3,600 hours/yr vs 800–1,000 in northern states. Your system ages 3x faster here.
        </p>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>🗓️ System Install Year: <span style={{ color: '#F5E642', fontWeight: 700 }}>{year}</span> ({age} yrs old)</div>
          <input type="range" min={1995} max={2025} value={year} onChange={e => setYear(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F5E642′ }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginTop: 4 }}>
            <span>1995</span><span>2025</span>
          </div>
        </div>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>🌡️ DFW Use Level</div>
          {USE_LEVELS.map((u, i) => (
            <button key={i} onClick={() => setUseIdx(i)} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', marginBottom: 6,
              borderRadius: 8, border: `2px solid ${useIdx === i ? '#F5E642' : 'transparent'}`,
              background: useIdx === i ? '#1e2d4a' : '#0d1829', color: '#fff', cursor: 'pointer', fontSize: 13
            }}>
              {u.label} <span style={{ color: '#64748b' }}>({u.hrsPerYr.toLocaleString()} hrs/yr)</span>
            </button>
          ))}
        </div>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>⚙️ Equipment Type</div>
          {EQUIPMENT_TYPES.map((e, i) => (
            <button key={i} onClick={() => setEqIdx(i)} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', marginBottom: 6,
              borderRadius: 8, border: `2px solid ${eqIdx === i ? '#F5E642' : 'transparent'}`,
              background: eqIdx === i ? '#1e2d4a' : '#0d1829', color: '#fff', cursor: 'pointer', fontSize: 13
            }}>
              {e.label} <span style={{ color: '#64748b' }}>({e.totalLife.toLocaleString()} hr design life)</span>
            </button>
          ))}
        </div>

        <button onClick={() => setSubmitted(true)} style={{ width: '100%', background: '#F5E642', color: '#0A1628', padding: '14px', borderRadius: 10, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 24 }}>
          Calculate Remaining Life 🔍
        </button>

        {submitted && (
          <div style={{ background: '#111c35', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: '#94a3b8′ }}>Life Used</div>
                <div style={{ fontSize: 38, fontWeight: 800, color: urgencyColor }}>{pctUsed}%</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#94a3b8′ }}>Status</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: urgencyColor }}>{urgency}</div>
              </div>
            </div>
            <div style={{ background: '#1e2d4a', borderRadius: 99, height: 14, marginBottom: 20 }}>
              <div style={{ width: `${pctUsed}%`, background: urgencyColor, borderRadius: 99, height: '100%', transition: 'width 0.4s' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              {[
                { label: '⏱️ Hours Accumulated', val: `${hoursUsed.toLocaleString()} hrs` },
                { label: '⏳ Hours Remaining', val: hoursRemaining > 0 ? `${hoursRemaining.toLocaleString()} hrs` : 'Overdue' },
                { label: '📅 Replace By', val: hoursRemaining > 0 ? String(replacementYear) : 'Now' },
                { label: '🌍 Northern Equivalent', val: `${northernEquiv} yr system` },
              ].map(({ label, val }) => (
                <div key={label} style={{ background: '#1e2d4a', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1a1a2e', borderRadius: 10, padding: 14, fontSize: 13, color: '#94a3b8′ }}>
              💡 DFW units accumulate roughly <strong style={{ color: '#fff' }}>{useLevel.hrsPerYr.toLocaleString()} hours/year</strong>. This system has used the equivalent of a <strong style={{ color: '#F5E642′ }}>{northernEquiv}-year-old</strong> northern-state unit.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
