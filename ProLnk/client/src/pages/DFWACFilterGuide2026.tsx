import { useState } from 'react';

export default function DFWACFilterGuide2026() {
  const [pets, setPets] = useState(false);
  const [allergies, setAllergies] = useState(false);
  const [dusty, setDusty] = useState(false);
  const [homeSize, setHomeSize] = useState('medium');

  const getMerv = () => {
    if (allergies) return { merv: 'MERV 13', change: 'Monthly during cedar/pollen season', cost: '$18-30', note: 'DFW cedar season (Dec-Feb) is brutal — upgrade to MERV 13' };
    if (pets || dusty) return { merv: 'MERV 11', change: 'Every 45 days', cost: '$12-20', note: 'Pets and DFW dust require more frequent changes' };
    return { merv: 'MERV 8', change: 'Every 90 days', cost: '$8-15', note: 'Minimum recommended — DFW air quality demands at least MERV 8' };
  };

  const rec = getMerv();

  const mervData = [
    { rating: 'MERV 1-4', use: 'Fiberglass throwaway', capture: 'Dust, pollen only', dfwNote: 'Not recommended for DFW' },
    { rating: 'MERV 8', use: 'Standard pleated', capture: 'Mold, dust, pollen', dfwNote: 'Minimum for DFW homes' },
    { rating: 'MERV 11', use: 'Pets/dusty homes', capture: 'Pet dander, fine dust', dfwNote: 'Recommended for most DFW homes' },
    { rating: 'MERV 13', use: 'Allergy/asthma', capture: 'Bacteria, smoke, virus', dfwNote: 'Cedar season essential' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>🌬️ ProLnk DFW AC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW AC Filter Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>A dirty filter in DFW summer can cost $50-150/mo extra in electricity — the easiest AC maintenance.</p>

        <div style={{ overflowX: 'auto', marginBottom: 32 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#1e3a5f' }}>
                {['MERV Rating', 'Best For', 'Captures', 'DFW Note'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642', fontSize: 13 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mervData.map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid #1e3a5f', backgroundColor: i % 2 === 0 ? '#0d1f3a' : 'transparent' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#F5E642' }}>{row.rating}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>{row.use}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#94a3b8' }}>{row.capture}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#94a3b8' }}>{row.dfwNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🎯 Filter Selector for Your DFW Home</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            {[
              { id: 'pets', label: '🐕 Pets at Home', val: pets, set: setPets },
              { id: 'allergies', label: '🤧 Allergy/Asthma', val: allergies, set: setAllergies },
              { id: 'dusty', label: '🏗️ Near Construction', val: dusty, set: setDusty },
            ].map(item => (
              <button key={item.id} onClick={() => item.set(!item.val)}
                style={{ padding: '14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  borderColor: item.val ? '#F5E642' : '#1e3a5f',
                  backgroundColor: item.val ? 'rgba(245,230,66,0.15)' : '#0A1628', color: '#fff' }}>
                {item.label}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div><div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642' }}>{rec.merv}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>Recommended Rating</div></div>
              <div><div style={{ fontSize: 18, fontWeight: 600 }}>{rec.change}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>Change Frequency</div></div>
              <div><div style={{ fontSize: 18, fontWeight: 600, color: '#F5E642' }}>{rec.cost}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>Per Filter</div></div>
            </div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>{rec.note}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Get Your DFW AC Inspected</div>
          <div style={{ color: '#0A1628', marginBottom: 16 }}>A pro filter check + coil cleaning takes 30 min and saves hundreds in DFW summer bills</div>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Book AC Inspection →
          </button>
        </div>
      </div>
    </div>
  );
}