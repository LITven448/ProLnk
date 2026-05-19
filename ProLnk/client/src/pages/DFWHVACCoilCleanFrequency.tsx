import { useState } from 'react';

const signs = [
  { icon: '🌡️', label: 'Warm air from vents', detail: 'Dirty evaporator coil can no longer transfer heat effectively.' },
  { icon: '💧', label: 'Water pooling near air handler', detail: 'Buildup blocks airflow and causes condensation to overflow.' },
  { icon: '💨', label: 'Reduced airflow', detail: 'Coil surface blocked with debris restricts air movement through system.' },
  { icon: '🤧', label: 'Musty/moldy smell', detail: 'DFW humidity + dirty coil = mold growth. Do not ignore this in DFW.' },
  { icon: '⚡', label: 'Higher electric bills', detail: 'System works harder to achieve setpoint when coil is dirty.' },
];

const conditions = ['High pollen season (Jan–May)', 'Post-renovation or remodel', 'Multiple pets in home', 'Near construction site', 'Standard DFW home'];
const histories = ['Never cleaned', 'Cleaned 1-2 years ago', 'Cleaned within last year', 'Just installed'];

function getSchedule(condition: string, history: string) {
  if (history === 'Never cleaned') return { freq: 'Immediately, then annually', type: 'Professional', note: 'Never-cleaned coils in DFW can have years of pollen/debris buildup. Start with a pro.' };
  if (condition === 'Post-renovation or remodel') return { freq: 'Immediately after project', type: 'Professional', note: 'Construction dust and drywall particles clog coils fast. Do not wait.' };
  if (condition === 'High pollen season (Jan–May)') return { freq: 'Annually — schedule April/May', type: 'Professional', note: 'End of DFW pollen season is the ideal annual cleaning window.' };
  if (condition === 'Multiple pets in home') return { freq: 'Every 6 months', type: 'Professional or DIY + Pro annually', note: 'Pet dander accumulates on coil fins rapidly in DFW heat.' };
  if (condition === 'Near construction site') return { freq: 'Every 6-8 months', type: 'Professional', note: 'Construction particulate is extremely damaging to coil fins.' };
  if (history === 'Just installed') return { freq: 'Annual starting year 2', type: 'Professional', note: 'New DFW systems need first cleaning by year 2 to maintain warranty.' };
  return { freq: 'Annually', type: 'Professional', note: 'DFW minimum is annual coil cleaning. High pollen years may require twice.' };
}

export default function DFWHVACCoilCleanFrequency() {
  const [condition, setCondition] = useState('');
  const [history, setHistory] = useState('');
  const schedule = condition && history ? getSchedule(condition, history) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>HVAC Coil Cleaning Frequency for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 12 }}>DFW's oak and cedar pollen season loads coils faster than most US cities. The minimum is annual — post-renovation or heavy pollen exposure requires immediate cleaning.</p>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: '14px 20px', marginBottom: 32, display: 'flex', gap: 32 }}>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>1x</div><div style={{ fontSize: 12, color: '#94a3b8' }}>Annual minimum for DFW</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>2x</div><div style={{ fontSize: 12, color: '#94a3b8' }}>Recommended with pets/pollen</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>ASAP</div><div style={{ fontSize: 12, color: '#94a3b8' }}>Post-renovation always</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>$150-350</div><div style={{ fontSize: 12, color: '#94a3b8' }}>Typical DFW pro cleaning cost</div></div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚠️ Signs Your DFW Coil Needs Cleaning Now</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {signs.map(s => (
            <div key={s.label} style={{ background: '#0f1f3d', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div><div style={{ fontWeight: 600, marginBottom: 4 }}>{s.label}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>{s.detail}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>📅 Get Your DFW Coil Cleaning Schedule</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>DFW Home Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select condition...</option>
                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>Last Coil Cleaning</label>
              <select value={history} onChange={e => setHistory(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select history...</option>
                {histories.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
          {schedule && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>🧹 Schedule: {schedule.freq}</div>
              <div style={{ color: '#94a3b8', marginBottom: 6 }}>Service type: <span style={{ color: '#fff' }}>{schedule.type}</span></div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{schedule.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Book a DFW Coil Cleaning Before Summer Peaks</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>April–May bookings fill fast. Get matched with a local DFW HVAC tech today.</div>
        </div>
      </div>
    </div>
  );
}
