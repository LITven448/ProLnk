import { useState } from 'react';

const homeSizes = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–4,000 sq ft', '4,000+ sq ft'];
const lifestyles = ['Single / couple, no pets', 'Family with kids', 'Pets in the home', 'Work-from-home (all day)'];

function getSchedule(size: string, lifestyle: string) {
  const large = size === '4,000+ sq ft';
  const hasPets = lifestyle === 'Pets in the home';
  const hasKids = lifestyle === 'Family with kids';

  const daily = [
    '🌿 Wipe entryways — DFW pollen settles on entry surfaces daily',
    '🫧 Wipe kitchen counters and stovetop',
    hasKids ? '🧒 Spot-clean high-touch surfaces (doorknobs, light switches)' : '🖐️ Wipe light switches and door handles',
    hasPets ? '🐾 Sweep/vacuum pet hair from floors daily' : '🧹 Quick floor sweep in kitchen and entry',
  ];

  const weekly = [
    '❄️ Check AC filter — DFW summer requires 2-week checks (1″ filters)',
    '🚿 Full bathroom scrub: toilet, sink, shower/tub',
    '🪣 Mop hard floors with DFW-appropriate hard water solution',
    hasPets ? '🛁 Wash pet bedding and vacuum pet areas' : '🛏️ Change and wash bed linens',
    '🌀 Vacuum all carpets and rugs (HEPA filter recommended during pollen season)',
    large ? '🔲 Wipe baseboards in 1–2 rooms per week (rotation)' : '🔲 Wipe visible baseboards',
  ];

  const monthly = [
    '🌬️ Clean ceiling fan blades — DFW dust accumulates fast in dry months',
    '🪟 Wipe window sills and blinds (DFW pollen settles here)',
    '🧊 Clean refrigerator coils and interior',
    '🚿 Descale showerheads — DFW hard water causes heavy buildup',
    hasPets ? '🛋️ Shampoo upholstered furniture for pet dander' : '🛋️ Vacuum upholstered furniture',
    '🗑️ Deep clean trash cans inside and out',
  ];

  const seasonal = [
    '🌡️ Spring: deep clean AC vents, replace filters before summer heat',
    '🍂 Fall: clean gutters after DFW oak leaf drop (Sep–Nov)',
    '❄️ Winter: check weatherstripping — DFW freeze events cause seal damage',
    '☀️ Summer: power wash driveway/patio — DFW storms track mud and algae',
  ];

  return { daily, weekly, monthly, seasonal };
}

export default function DFWHouseCleaningScheduleGuide() {
  const [size, setSize] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const schedule = size && lifestyle ? getSchedule(size, lifestyle) : null;

  const Section = ({ title, items }: { title: string; items: string[] }) => (
    <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F', marginBottom: 16 }}>
      <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>{title}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
        {items.map(item => <li key={item} style={{ color: '#CBD5E1', paddingLeft: 4 }}>{item}</li>)}
      </ul>
    </div>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>📋 DFW CLEANING SCHEDULE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW House Cleaning Schedule</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW has unique cleaning demands: clay soil, intense pollen seasons, scorching summers, and occasional ice storms. Your schedule should reflect your zip code's reality.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🤧', label: 'Pollen Season', value: 'Dec–Apr' },
            { icon: '🌡️', label: 'AC Runtime', value: '8+ months' },
            { icon: '🌧️', label: 'Storm Season', value: 'Apr–Jun' },
            { icon: '🧊', label: 'Freeze Risk', value: 'Dec–Feb' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F1F3D', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontWeight: 700, color: '#F5E642′ }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 20 }}>🏡 Build My DFW Schedule</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>HOME SIZE</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select home size...</option>
                {homeSizes.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>DFW LIFESTYLE</label>
              <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select lifestyle...</option>
                {lifestyles.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        {schedule && (
          <div>
            <Section title="📅 Daily Tasks" items={schedule.daily} />
            <Section title="🗓️ Weekly Tasks" items={schedule.weekly} />
            <Section title="🌙 Monthly Tasks" items={schedule.monthly} />
            <Section title="🍃 Seasonal DFW Tasks" items={schedule.seasonal} />
          </div>
        )}
      </div>
    </div>
  );
}
