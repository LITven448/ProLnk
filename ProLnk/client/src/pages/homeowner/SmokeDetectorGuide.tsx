import { useState } from 'react';

const rooms = [
  'Primary Bedroom',
  'Bedroom 2',
  'Bedroom 3',
  'Bedroom 4',
  'Hallway (outside bedrooms)',
  'Main Level',
  'Basement',
  'Garage Area',
];

export default function SmokeDetectorGuide() {
  const [checkedRooms, setCheckedRooms] = useState<Record<string, boolean>>({});
  const [installYear, setInstallYear] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const toggleRoom = (room: string) => {
    setCheckedRooms(prev => ({ ...prev, [room]: !prev[room] }));
  };

  const calcRecommendation = () => {
    const year = parseInt(installYear);
    if (!year || year < 1990 || year > 2026) {
      setRecommendation('Please enter a valid installation year (1990–2026).');
      return;
    }
    const age = 2026 - year;
    if (age >= 10) {
      setRecommendation(`Your detectors are ${age} years old — replace ALL smoke AND CO detectors immediately. Smoke detectors expire at 10 years; CO detectors at 5–7 years.`);
    } else if (age >= 7) {
      setRecommendation(`Your detectors are ${age} years old — replace CO detectors now (expired at 5–7 years). Smoke detectors should be replaced within ${10 - age} year(s).`);
    } else if (age >= 5) {
      setRecommendation(`Your CO detectors are ${age} years old — approaching or past expiration. Plan to replace CO detectors this year. Smoke detectors have ${10 - age} years remaining.`);
    } else {
      setRecommendation(`Your detectors are ${age} years old — within safe lifespan. Test monthly, clean annually. Next CO check at year 5, smoke at year 10.`);
    }
  };

  const checkedCount = Object.values(checkedRooms).filter(Boolean).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0D2144 0%, #1A3A6B 100%)', padding: '60px 24px 48px', borderBottom: '1px solid #1E3A5F' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔥 🚨</div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.2 }}>
            Smoke & CO Detector Guide
          </h1>
          <p style={{ fontSize: 18, color: '#8FB0D4', margin: 0 }}>DFW Life Safety Requirements — Know What Texas Law Requires</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>

        {/* Texas Code Requirements */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#60A5FA', marginBottom: 24 }}>🏛️ Texas Code Requirements</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { icon: '🔴', title: 'Smoke Detectors — Required Locations', items: ['Each sleeping room', 'Outside each sleeping area (hallways)', 'On each level of the home including basement'] },
              { icon: '💨', title: 'CO Detectors — Required Locations', items: ['Within 15 feet of all sleeping rooms', 'In homes with gas appliances (furnace, water heater, range)', 'In homes with an attached garage'] },
              { icon: '🔗', title: 'Interconnection (New Construction)', items: ['All detectors must be interconnected', 'When one alarm sounds, all alarms sound throughout the home', 'Applies to all new construction in Texas'] },
            ].map(card => (
              <div key={card.title} style={{ background: '#0D2144', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{card.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>{card.title}</h3>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {card.items.map(item => (
                    <li key={item} style={{ color: '#A8C4E0', fontSize: 14, marginBottom: 6 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Lifespan & Maintenance */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#60A5FA', marginBottom: 24 }}>⏱️ Lifespan & Maintenance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '🔴', label: 'Smoke Detectors', life: '10 years', note: 'Check manufacture date on the back panel' },
              { icon: '💨', label: 'CO Detectors', life: '5–7 years', note: 'Replace even if still beeping during test' },
              { icon: '🔘', label: 'Monthly Testing', life: 'Press test button', note: 'A working chirp confirms sensor is live' },
              { icon: '💨', label: 'Annual Cleaning', life: 'Compressed air only', note: 'Blow out dust from vents — do not vacuum' },
              { icon: '🔋', label: 'Battery Backup', life: 'Even hardwired units', note: 'Battery backup required by code for hardwired systems' },
            ].map(card => (
              <div key={card.label} style={{ background: '#0D2144', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{card.label}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#60A5FA', marginBottom: 6 }}>{card.life}</div>
                <div style={{ fontSize: 12, color: '#8FB0D4′ }}>{card.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DFW-Specific */}
        <section style={{ marginTop: 48, background: '#0D2144', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#FCD34D', marginBottom: 16 }}>🌵 DFW-Specific Note</h2>
          <p style={{ color: '#A8C4E0', fontSize: 15, margin: '0 0 12px', lineHeight: 1.7 }}>
            Wildfire smoke from west Texas and Oklahoma occasionally drifts into DFW airspace, triggering false alarms on ionization-type detectors.
          </p>
          <p style={{ color: '#A8C4E0', fontSize: 15, margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#FFFFFF' }}>Recommendation:</strong> Choose <strong style={{ color: '#60A5FA' }}>photoelectric detectors</strong> for living areas — they are significantly better at detecting slow-smoldering fires and have fewer false alarms from distant wildfire smoke. Ionization detectors respond faster to flaming fires but are prone to nuisance trips.
          </p>
        </section>

        {/* Interactive Checklist */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#60A5FA', marginBottom: 8 }}>✅ Room-by-Room Detector Checklist</h2>
          <p style={{ color: '#8FB0D4', fontSize: 14, marginBottom: 24 }}>Check off each location where a functioning detector is installed and tested.</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {rooms.map(room => (
              <div
                key={room}
                onClick={() => toggleRoom(room)}
                style={{
                  background: checkedRooms[room] ? '#0D3321′ : '#0D2144',
                  border: `1px solid ${checkedRooms[room] ? '#22C55E' : '#1E3A5F'}`,
                  borderRadius: 10,
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: checkedRooms[room] ? '#22C55E' : 'transparent',
                  border: `2px solid ${checkedRooms[room] ? '#22C55E' : '#4A6A8A'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, color: '#FFFFFF', flexShrink: 0,
                }}>
                  {checkedRooms[room] ? '✓' : ''}
                </div>
                <span style={{ fontSize: 15, color: checkedRooms[room] ? '#4ADE80′ : '#E8EDF5', fontWeight: checkedRooms[room] ? 600 : 400 }}>{room}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '12px 20px', background: '#0D2144', borderRadius: 10, border: '1px solid #1E3A5F' }}>
            <span style={{ color: '#8FB0D4', fontSize: 14 }}>Coverage: </span>
            <span style={{ color: '#60A5FA', fontWeight: 700 }}>{checkedCount} of {rooms.length}</span>
            <span style={{ color: '#8FB0D4', fontSize: 14 }}> locations covered</span>
            {checkedCount === rooms.length && <span style={{ color: '#22C55E', marginLeft: 12, fontSize: 14 }}>🏆 Fully covered!</span>}
          </div>
        </section>

        {/* Expiry Calculator */}
        <section style={{ marginTop: 48, background: '#0D2144', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>🗓️ When Did Your Detectors Expire?</h2>
          <p style={{ color: '#8FB0D4', fontSize: 14, marginBottom: 20 }}>Enter the year your detectors were installed to get a replacement recommendation.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#8FB0D4', marginBottom: 6 }}>Installation Year</label>
              <input
                type="number"
                value={installYear}
                onChange={e => setInstallYear(e.target.value)}
                placeholder="e.g. 2018″
                style={{ width: '100%', padding: '10px 14px', background: '#162A4A', border: '1px solid #2A4A6A', borderRadius: 8, color: '#FFFFFF', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <button
              onClick={calcRecommendation}
              style={{ padding: '10px 24px', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
            >
              Check Status
            </button>
          </div>
          {recommendation && (
            <div style={{ marginTop: 20, padding: 16, background: '#162A4A', borderRadius: 10, border: '1px solid #2A4A6A', color: '#A8C4E0', fontSize: 14, lineHeight: 1.7 }}>
              {recommendation}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
