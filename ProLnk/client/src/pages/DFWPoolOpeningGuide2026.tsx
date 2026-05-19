import { useState } from 'react';

export default function DFWPoolOpeningGuide2026() {
  const [poolType, setPoolType] = useState('');
  const [poolSize, setPoolSize] = useState('');
  const [showChecklist, setShowChecklist] = useState(false);

  const getChemicals = () => {
    const size = poolSize === 'small' ? 10000 : poolSize === 'medium' ? 20000 : 35000;
    const gallonFactor = size / 10000;
    return {
      shock: (2 * gallonFactor).toFixed(1) + ' lbs',
      chlorine: (1 * gallonFactor).toFixed(1) + ' lbs/week',
      algaecide: (16 * gallonFactor).toFixed(0) + ' oz',
      balancer: (6 * gallonFactor).toFixed(1) + ' lbs',
    };
  };

  const checklists: Record<string, string[]> = {
    inground: [
      '🌡️ Confirm water temp 70°F+ (typically March–April DFW)',
      '🔌 Reconnect pump, filter, and heater lines',
      '🧹 Remove winter cover and debris',
      '💧 Top off water to operating level',
      '⚡ Prime and restart circulation pump',
      '🧪 Test and balance all chemistry',
      '💥 Shock pool with chlorine (double dose)',
      '🦠 Add algaecide preventatively',
      '🔍 Inspect lights, skimmers, drains for damage',
      '🤖 Run robotic cleaner for 2 full cycles',
    ],
    aboveground: [
      '🌡️ Wait for consistent 70°F water temp',
      '🪤 Remove ice compensator or air pillow',
      '🧹 Remove and store winter cover',
      '💧 Refill if water level dropped',
      '🔌 Reconnect filter system and hoses',
      '🧪 Test water — DFW tap is hard (300+ ppm)',
      '💥 Shock with 1 lb per 10,000 gallons',
      '🔁 Run filter 24 hrs before swimming',
    ],
    fiberglass: [
      '🌡️ DFW fiberglass pools rarely go fully dormant',
      '🔍 Inspect shell for blistering or cracks',
      '⚖️ Check water balance — fiberglass is pH-sensitive',
      '🧪 Calcium hardness critical: keep 200–400 ppm',
      '💧 Backwash or clean filter thoroughly',
      '💥 Shock and circulate 12 hours',
      '🌀 Check auto-cleaner tracks and brushes',
    ],
  };

  const chems = poolSize ? getChemicals() : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏊</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Pool Opening Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Water temp hits 70°F in DFW typically March–April — here's how to open right</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>🌡️ DFW Opening Window</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
            {[['Early Open', 'March', '65–70°F water, risk of algae bloom'],['Prime Window', 'April', '70°F+ consistent, ideal timing'],['Late Open', 'May', 'Pool ready late — miss spring swim season']].map(([label, month, note]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{month}</div>
                <div style={{ fontSize: 12, color: '#F5E642', opacity: 0.8 }}>{label}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>⚙️ Build Your Opening Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pool Type</label>
              <select value={poolType} onChange={e => setPoolType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px' }}>
                <option value=''>Select type</option>
                <option value='inground'>Inground (Plaster/Gunite)</option>
                <option value='aboveground'>Above Ground</option>
                <option value='fiberglass'>Fiberglass</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pool Size</label>
              <select value={poolSize} onChange={e => setPoolSize(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px' }}>
                <option value=''>Select size</option>
                <option value='small'>Small (~10,000 gal)</option>
                <option value='medium'>Medium (~20,000 gal)</option>
                <option value='large'>Large (~35,000 gal)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowChecklist(true)} disabled={!poolType || !poolSize} style={{ background: poolType && poolSize ? '#F5E642′ : '#334155', color: '#0A1628', fontWeight: 700, border: ’none', borderRadius: 8, padding: '12px 28px', cursor: poolType && poolSize ? 'pointer' : 'not-allowed' }}>
            Generate My Opening Plan →
          </button>
        </div>

        {showChecklist && poolType && chems && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>✅ Your Opening Checklist</h2>
            {checklists[poolType].map((item, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #0A1628', fontSize: 14 }}>{item}</div>
            ))}
            <h3 style={{ color: '#F5E642', marginTop: 20 }}>🧪 Chemical Quantities</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Object.entries(chems).map(([k, v]) => (
                <div key={k} style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12, textTransform: 'capitalize' }}>{k}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 24 }}>
          ProLnk connects DFW homeowners with licensed pool pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
