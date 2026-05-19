import { useState } from 'react';

const CONTAMINANTS = [
  { id: 'bacteria', label: '🦠 Bacteria/Coliform', treatment: 'UV disinfection system + annual shocking of well' },
  { id: 'nitrates', label: '⚗️ Nitrates', treatment: 'Reverse osmosis (RO) system at kitchen tap' },
  { id: 'iron', label: '🟤 Iron/Manganese', treatment: 'Iron filter + water softener combination' },
  { id: 'hardness', label: '💎 Hardness (Minerals)', treatment: 'Whole-house water softener (salt or salt-free)' },
  { id: 'sulfur', label: '🥚 Sulfur/H2S Odor', treatment: 'Aeration system + carbon filtration' },
];

const COUNTIES = ['Parker', 'Wise', 'Johnson', 'Hood', 'Palo Pinto', 'Somervell'];
const TEST_FREQ = ['Annual (recommended for all wells)', 'After flooding or heavy rain', 'If taste/odor changes', 'After nearby construction or drilling'];

export default function DFWWellWaterGuide2026() {
  const [selectedContaminant, setSelectedContaminant] = useState<string | null>(null);
  const [county, setCounty] = useState('');

  const found = CONTAMINANTS.find(c => c.id === selectedContaminant);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💧 DFW Well Water Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Outer DFW counties including Parker, Wise, Johnson, Hood, and Palo Pinto have significant private well water use. Annual testing is strongly recommended — Texas has no regulatory oversight of private wells after initial permitting.
        </p>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📍 Select Your County</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {COUNTIES.map(c => (
              <button key={c} onClick={() => setCounty(c)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: county === c ? '#F5E642′ : '#1e2d4a', color: county === c ? '#0A1628' : '#fff' }}>{c} County</button>
            ))}
          </div>
          {county && <p style={{ marginTop: 12, color: '#F5E642', fontSize: 14 }}>✅ {county} County: Texas Commission on Environmental Quality (TCEQ) licensed well drillers required.</p>}
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔬 When to Test Your Well</h2>
          {TEST_FREQ.map((t, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e2d4a', fontSize: 14, color: '#cbd5e1′ }}>✅ {t}</div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚗️ Water Test Results → Treatment Recommendation</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Select your contaminant finding to see the recommended treatment:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {CONTAMINANTS.map(c => (
              <button key={c.id} onClick={() => setSelectedContaminant(c.id)} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, textAlign: 'left', backgroundColor: selectedContaminant === c.id ? '#F5E642′ : '#1e2d4a', color: selectedContaminant === c.id ? '#0A1628' : '#fff' }}>{c.label}</button>
            ))}
          </div>
          {found && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>Recommended Treatment:</div>
              <div style={{ color: '#e2e8f0', fontSize: 15 }}>🛠️ {found.treatment}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h2 style={{ color: '#0A1628', fontWeight: 800, marginBottom: 8 }}>Connect with Water Treatment Pros</h2>
          <p style={{ color: '#0A1628', marginBottom: 16, fontSize: 14 }}>ProLnk matches you with licensed water treatment specialists and well service companies across outer DFW.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Water Treatment Quotes →</button>
        </div>
      </div>
    </div>
  );
}