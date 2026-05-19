import { useState } from 'react';

export default function DFWSmokeCODetectorGuide() {
  const [bedrooms, setBedrooms] = useState(3);
  const [stories, setStories] = useState(1);
  const [hasGasAppliances, setHasGasAppliances] = useState(true);
  const [hasAttachedGarage, setHasAttachedGarage] = useState(false);
  const [newConstruction, setNewConstruction] = useState(false);
  const [result, setResult] = useState<null | {
    smokeCount: number;
    coCount: number;
    totalCost: [number, number];
    placements: string[];
    notes: string[];
  }>(null);

  function calculate() {
    const smokeBase = bedrooms + stories;
    const smokeCount = newConstruction ? smokeBase + 1 : smokeBase;
    let coCount = 0;
    const placements: string[] = [];
    const notes: string[] = [];

    for (let i = 1; i <= bedrooms; i++) placements.push(`Smoke detector: Bedroom ${i} ceiling`);
    for (let i = 1; i <= stories; i++) placements.push(`Smoke detector: Level ${i} hallway`);
    if (newConstruction) { placements.push('Smoke detector: Basement/utility area (interconnected)'); notes.push('New construction requires interconnected smoke alarms'); }

    if (hasGasAppliances) { coCount++; placements.push('CO detector: Near furnace/water heater (within 10 ft)'); }
    if (hasAttachedGarage) { coCount++; placements.push('CO detector: Wall between garage and living area'); }
    if (bedrooms > 1) { coCount++; placements.push('CO detector: Hallway outside sleeping areas'); }

    const costLow = smokeCount * 22 + coCount * 28;
    const costHigh = smokeCount * 55 + coCount * 65;
    notes.push('Replace smoke detectors every 10 years; CO detectors every 5–7 years');
    notes.push('Test all detectors monthly using the test button');
    if (newConstruction) notes.push('10-year sealed battery units now required in several DFW cities');

    setResult({ smokeCount, coCount, totalCost: [costLow, costHigh], placements, notes });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🔥 DFW HOME SAFETY GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>Smoke & CO Detector Guide</h1>
        <p style={{ color: '#9AA3B2', marginBottom: '2rem' }}>Texas law requires smoke detectors in every sleeping area. CO detectors are required near gas appliances and sleeping areas. Get your home's custom placement plan below.</p>

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 Texas Code Requirements</h2>
          <ul style={{ color: '#C8D0DC', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li>Smoke detector required in each bedroom and outside each sleeping area</li>
            <li>One detector per floor (including basement)</li>
            <li>New construction: all detectors must be interconnected (one trips all)</li>
            <li>CO detector required within 10 feet of each sleeping area if gas appliances present</li>
            <li>Several DFW cities (Plano, Frisco) now require 10-year sealed battery units</li>
            <li>Landlords must provide working detectors; tenant must notify within 7 days of failure</li>
          </ul>
        </div>

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏠 Your Home Layout</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Number of Bedrooms</span>
              <input type="number" min={1} max={10} value={bedrooms} onChange={e => setBedrooms(Number(e.target.value))} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Number of Stories</span>
              <input type="number" min={1} max={4} value={stories} onChange={e => setStories(Number(e.target.value))} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }} />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasGasAppliances} onChange={e => setHasGasAppliances(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>Gas appliances (furnace, water heater, stove)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasAttachedGarage} onChange={e => setHasAttachedGarage(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>Attached garage</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={newConstruction} onChange={e => setNewConstruction(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>New construction or major renovation</span>
            </label>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontSize: '1rem' }}>
              Generate Placement Plan
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Your Placement Plan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642' }}>🔴 {result.smokeCount}</div>
                <div style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Smoke Detectors</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642' }}>💨 {result.coCount}</div>
                <div style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>CO Detectors</div>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              {result.placements.map((p, i) => <div key={i} style={{ color: '#C8D0DC', padding: '0.3rem 0', borderBottom: '1px solid #2A3A5C' }}>✓ {p}</div>)}
            </div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>
              Estimated Cost: ${result.totalCost[0]} – ${result.totalCost[1]}
            </div>
            {result.notes.map((n, i) => <div key={i} style={{ color: '#9AA3B2', fontSize: '0.85rem', marginTop: 4 }}>ℹ️ {n}</div>)}
          </div>
        )}

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🗓️ Replacement Schedule</h2>
          <p style={{ color: '#C8D0DC', lineHeight: 1.7 }}>Smoke detectors: replace every 10 years. CO detectors: every 5–7 years. Write the install date on a sticker inside the unit. Most DFW fire departments offer free detector installation for qualifying households — call your local non-emergency line.</p>
        </div>
      </div>
    </div>
  );
}
