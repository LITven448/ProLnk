import { useState } from 'react';

const viewingStyles: Record<string, { display: string; seating: string; acoustic: string; note: string }> = {
  movies: {
    display: 'Projector + 120"–150" screen — best cinematic experience, but DFW afternoon sun requires 100% blackout shades (budget $400–$900)',
    seating: 'Tiered recliner seating (2–3 rows) with USB charging and cupholder armrests',
    acoustic: 'Acoustic panels on side walls + bass traps in corners — critical for DFW open-plan adjacency',
    note: 'DFW tip: West-facing rooms get brutal afternoon sun — projectors work best in north or east-facing rooms',
  },
  sports: {
    display: '85"–100" 4K QLED or OLED TV — handles DFW ambient light better than projector, no blackout required',
    seating: 'Stadium-style seating or sectional with clear sightlines — multiple viewing angles for game day',
    acoustic: 'Sound bar or 5.1 surround system — sports audio benefits from directional front speakers',
    note: 'DFW tip: Football season crowds need 8–12 seat capacity — design around your biggest game day',
  },
  gaming: {
    display: '55"–77" OLED with <1ms response — wall-mount at seated eye level, no projector lag',
    seating: 'Gaming chairs or low-profile seating 6–10 ft from screen — ergonomic for extended sessions',
    acoustic: 'Surround headphone setup or ceiling Atmos speakers — keeps peace with DFW neighbors',
    note: 'DFW tip: Dedicated gaming room benefits from dimmable bias lighting (Govee or Philips Hue)',
  },
};

const budgetCosts: Record<string, Record<string, string>> = {
  small: { economy: '$8,000–$15,000', mid: '$15,000–$28,000', luxury: '$28,000–$55,000' },
  medium: { economy: '$12,000–$22,000', mid: '$22,000–$40,000', luxury: '$40,000–$80,000' },
  large: { economy: '$18,000–$32,000', mid: '$32,000–$60,000', luxury: '$60,000–$120,000' },
};

export default function DFWMediaRoomGuide() {
  const [roomSize, setRoomSize] = useState('');
  const [viewStyle, setViewStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { display: string; seating: string; acoustic: string; note: string; cost: string }>(null);

  function calculate() {
    if (!roomSize || !viewStyle || !budget) return;
    const rec = viewingStyles[viewStyle];
    const cost = budgetCosts[roomSize][budget];
    setResult({ ...rec, cost });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🎬</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Media Room Guide</h1>
          <p style={{ color: '#9AA5B4', fontSize: 16 }}>Dedicated media rooms are standard in DFW homes over 3,000 sq ft — design yours right the first time.</p>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🌞 DFW-Specific Considerations</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['DFW sunlight intensity (300+ sunny days/yr) favors TVs over projectors in rooms without full blackout','Open floor plans common in DFW new builds require acoustic separation — sound bleeds to living areas','DFW summer heat: HVAC must be sized for AV equipment heat load (receivers, amps add BTUs)','Resale value: dedicated media room adds $15,000–$40,000 perceived value in DFW $500K+ homes'].map(tip => (
              <li key={tip} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>
                <span style={{ color: '#CBD5E0', fontSize: 14 }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20 }}>🔧 Media Room Configurator</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Room Size</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['small','📦 Small (200–350 sq ft)'],['medium','🏠 Medium (350–550 sq ft)'],['large','🏢 Large (550+ sq ft)']].map(([key, label]) => (
                <button key={key} onClick={() => setRoomSize(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: roomSize === key ? '#F5E642' : '#1E3A5F', backgroundColor: roomSize === key ? '#F5E6421A' : 'transparent', color: roomSize === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Primary Viewing Style</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['movies','🎬 Movies / Streaming'],['sports','🏈 Sports / Live TV'],['gaming','🎮 Gaming']].map(([key, label]) => (
                <button key={key} onClick={() => setViewStyle(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: viewStyle === key ? '#F5E642' : '#1E3A5F', backgroundColor: viewStyle === key ? '#F5E6421A' : 'transparent', color: viewStyle === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Budget Range</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['economy','💰 Economy'],['mid','💎 Mid-Range'],['luxury','👑 Luxury']].map(([key, label]) => (
                <button key={key} onClick={() => setBudget(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: budget === key ? '#F5E642' : '#1E3A5F', backgroundColor: budget === key ? '#F5E6421A' : 'transparent', color: budget === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate}
            style={{ width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            Design My Media Room →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#1E3A5F', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🎬 Your DFW Media Room Plan</h3>
            {[['📺 Display System', result.display],['🛋️ Seating Configuration', result.seating],['🔊 Acoustic Treatment', result.acoustic],['🌞 DFW-Specific Tip', result.note],['💵 Estimated DFW Cost', result.cost]].map(([label, value]) => (
              <div key={label as string} style={{ marginBottom: 14 }}>
                <div style={{ color: '#9AA5B4', fontSize: 12, marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#E8E8E8', fontSize: 14, lineHeight: 1.5 }}>{value as string}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
