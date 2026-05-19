import { useState } from 'react';

const ROOMS = [
  { id: 'bathroom', label: 'Bathroom', required: true, since: 1975, diy: true },
  { id: 'kitchen', label: 'Kitchen (within 6ft of sink)', required: true, since: 1987, diy: true },
  { id: 'garage', label: 'Garage', required: true, since: 1978, diy: true },
  { id: 'outdoor', label: 'Outdoor outlets', required: true, since: 1978, diy: true },
  { id: 'crawl', label: 'Crawl space', required: true, since: 1990, diy: false },
  { id: 'pool', label: 'Pool / spa area', required: true, since: 1990, diy: false },
  { id: 'laundry', label: 'Laundry room', required: true, since: 2005, diy: true },
  { id: 'basement', label: 'Unfinished basement', required: true, since: 1990, diy: true },
];

export default function DFWGFCIOutletGuide() {
  const [homeAge, setHomeAge] = useState(1995);
  const [selected, setSelected] = useState<string[]>(['bathroom', 'kitchen', 'garage']);
  const [result, setResult] = useState<null | {
    missing: typeof ROOMS;
    diyCount: number;
    proCount: number;
    costLow: number;
    costHigh: number;
  }>(null);

  function toggleRoom(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  }

  function calculate() {
    const missing = ROOMS.filter(r => selected.includes(r.id) && homeAge < r.since);
    const diyCount = missing.filter(r => r.diy).length;
    const proCount = missing.filter(r => !r.diy).length;
    const costLow = diyCount * 10 + proCount * 75;
    const costHigh = diyCount * 25 + proCount * 150;
    setResult({ missing, diyCount, proCount, costLow, costHigh });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>🔌 DFW HOME SAFETY GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>GFCI Outlet Guide</h1>
        <p style={{ color: '#9AA3B2', marginBottom: '2rem' }}>GFCI outlets prevent electrocution by cutting power in milliseconds when current leaks — critical near water. NEC requirements have expanded over decades, meaning older DFW homes often have dangerous gaps.</p>

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚡ How GFCIs Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>1/40</div>
              <div style={{ color: '#9AA3B2', fontSize: '0.8rem' }}>seconds to trip</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>5mA</div>
              <div style={{ color: '#9AA3B2', fontSize: '0.8rem' }}>trip threshold</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>10yr</div>
              <div style={{ color: '#9AA3B2', fontSize: '0.8rem' }}>typical lifespan</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🧪 Monthly Test Protocol</h2>
          <div style={{ color: '#C8D0DC', lineHeight: 1.8 }}>
            <div>1. Press the <strong style={{ color: '#F5E642′ }}>TEST</strong> button — the outlet should go dead</div>
            <div>2. Plug in a lamp to confirm power is off</div>
            <div>3. Press the <strong style={{ color: '#F5E642′ }}>RESET</strong> button — power should restore</div>
            <div style={{ color: '#E67E22', marginTop: 8 }}>⚠️ If RESET won't hold → GFCI has failed and must be replaced immediately</div>
          </div>
        </div>

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Check My Home's Compliance</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Year Home Was Built</span>
              <input type="number" min={1900} max={2026} value={homeAge} onChange={e => setHomeAge(Number(e.target.value))} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }} />
            </label>
            <div>
              <div style={{ color: '#9AA3B2', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Which areas does your home have? (select all that apply)</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {ROOMS.map(room => (
                  <label key={room.id} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: '#0A1628', borderRadius: 8, padding: '0.6rem' }}>
                    <input type="checkbox" checked={selected.includes(room.id)} onChange={() => toggleRoom(room.id)} />
                    <span style={{ color: '#C8D0DC', fontSize: '0.9rem' }}>{room.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontSize: '1rem' }}>
              Check GFCI Compliance
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 Your GFCI Gap Report</h2>
            {result.missing.length === 0 ? (
              <div style={{ color: '#2ECC71', fontWeight: 600 }}>✅ All selected areas should have GFCI protection for your home's age.</div>
            ) : (
              <>
                {result.missing.map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2A3A5C', color: '#C8D0DC' }}>
                    <span>⚠️ {r.label}</span>
                    <span style={{ color: r.diy ? '#2ECC71′ : '#E67E22', fontSize: '0.85rem' }}>{r.diy ? '🔧 DIY OK' : '👷 Need electrician'}</span>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>Estimated Fix: ${result.costLow} – ${result.costHigh}</div>
                  <div style={{ color: '#9AA3B2', fontSize: '0.85rem', marginTop: 4 }}>DIY: {result.diyCount} location(s) at $10–25/outlet • Electrician: {result.proCount} location(s) at $75–150 each</div>
                </div>
              </>
            )}
          </div>
        )}

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🔧 DIY Replacement Guide</h2>
          <p style={{ color: '#C8D0DC', lineHeight: 1.7 }}>Turn off the breaker. Use a non-contact voltage tester to confirm power is off. GFCI outlets have LINE (from panel) and LOAD (downstream outlets) terminals — connect correctly or downstream protection won't work. One GFCI outlet can protect all downstream outlets on the same circuit. Always test after installation.</p>
        </div>
      </div>
    </div>
  );
}
