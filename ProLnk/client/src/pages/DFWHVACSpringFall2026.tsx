import { useState } from 'react';

const months = [
  { id: 'march', label: 'March', icon: '🌱', advice: 'Transition month — DFW averages 65F high. Run AC only above 75F indoor. Open windows 6-10 AM and 7-10 PM when temps are 55-65F. Schedule your annual AC tune-up now, before summer rush pricing begins.' },
  { id: 'april', label: 'April', icon: '🌸', advice: 'Best DFW shoulder month — average 73F high, low humidity. Whole-house fan ideal: run 30 min before bed to flush hot air, wake to cool home. AC use should be minimal. If running daily, check filter and coils.' },
  { id: 'october', label: 'October', icon: '🍂', advice: 'Relief month — temps drop from 95F to 73F by month-end. First two weeks: still AC weather. Last two weeks: windows at night. Schedule fall furnace inspection in October to avoid November backlogs.' },
  { id: 'november', label: 'November', icon: '🍁', advice: 'Heating transition — DFW averages 55F high. Heat rarely needed until evenings. Set thermostat to 65F heat, 78F cool — system stays off most days. Ideal time to add weatherstripping and attic insulation.' },
];

const situations = [
  { id: 'window-timing', label: 'When should I open windows?', strategy: 'Open windows when outdoor temp is 58-72F AND indoor temp exceeds outdoor by 3F+. In DFW spring/fall this window is typically 6-10 AM and 7-10 PM. Close before afternoon heat builds.' },
  { id: 'whole-house-fan', label: 'Is a whole-house fan worth it in DFW?', strategy: 'Yes — DFW shoulder seasons offer 90+ nights per year below 70F. A whole-house fan ($400-800 installed) flushes hot attic air in 15 min, can delay AC startup by 1-2 hours daily. Payback: 2-3 years.' },
  { id: 'ac-off', label: 'Can I turn AC completely off in spring/fall?', strategy: 'April and October: yes, many days. Set to 80F cooling setpoint so it only runs if truly hot. This protects against humidity spikes (DFW spring can hit 80% RH) without unnecessary cooling.' },
  { id: 'mold-risk', label: 'Worried about mold during open-window season', strategy: 'DFW spring humidity risk is real. Keep indoor humidity below 55% (buy a $15 hygrometer). If humidity climbs above 60% with windows open, close and run AC in dry mode or at 76F.' },
];

export default function DFWHVACSpringFall2026() {
  const [month, setMonth] = useState('');
  const [situation, setSituation] = useState('');
  const matchMonth = months.find(m => m.id === month);
  const matchSit = situations.find(s => s.id === situation);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
          🌤️ Shoulder Season HVAC Guide for DFW
        </h1>
        <p style={{ color: '#8FA3BF', fontSize: 16, margin: '0 0 32px', lineHeight: 1.6 }}>
          March, April, October, and November are the four months when DFW homeowners can dramatically reduce HVAC use. These 120 days represent your biggest opportunity to cut energy costs — if you know when to open windows, when to run the fan, and when to let the system rest.
        </p>

        <div style={{ background: '#0F2140', border: '1px solid #F5E642', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 16 }}>📅 Select Your DFW Month</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
            {months.map(m => (
              <button key={m.id} onClick={() => setMonth(m.id)} style={{ background: month === m.id ? '#F5E642′ : '#162840', color: month === m.id ? '#0A1628' : '#E8EDF5', border: '1px solid #2A4A6B', borderRadius: 8, padding: '14px 8px', cursor: ’pointer', fontWeight: month === m.id ? 700 : 400, fontSize: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{m.icon}</div>
                {m.label}
              </button>
            ))}
          </div>
          {matchMonth && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{matchMonth.icon} {matchMonth.label} HVAC Strategy</div>
              <div style={{ color: '#C8D8E8', fontSize: 15, lineHeight: 1.7 }}>{matchMonth.advice}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2140', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 16 }}>❓ Your Shoulder Season Question</div>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id)} style={{ background: situation === s.id ? '#F5E642′ : '#162840', color: situation === s.id ? '#0A1628' : '#E8EDF5', border: '1px solid #2A4A6B', borderRadius: 8, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: situation === s.id ? 700 : 400, fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
          {matchSit && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#C8D8E8', fontSize: 15, lineHeight: 1.7 }}>{matchSit.strategy}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, borderTop: '3px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔗 ProLnk: DFW HVAC tune-ups before peak season</div>
          <div style={{ color: '#8FA3BF', fontSize: 14 }}>Schedule spring AC tune-ups and fall furnace checks with vetted DFW pros before the seasonal rush. ProLnk homeowner signup is open now.</div>
        </div>
      </div>
    </div>
  );
}
