import { useState } from 'react';

const roofAges = [
  { id: 'new', label: '0–10 Years' },
  { id: 'mid', label: '11–20 Years' },
  { id: 'old', label: '21+ Years' },
];

const materials = [
  { id: 'asphalt', label: 'Asphalt Shingles' },
  { id: 'metal', label: 'Metal Roof' },
  { id: 'tile', label: 'Tile / Flat' },
];

function getPriority(age: string, material: string): { icon: string; task: string; urgency: string }[] {
  const isOld = age === '21+ Years';
  const isMid = age === '11–20 Years';
  const isMetal = material === 'Metal Roof';
  const isTile = material === 'Tile / Flat';

  const base = [
    { icon: '🔭', task: 'Self-inspect from ground with binoculars — never walk wet roof', urgency: 'High' },
    { icon: '📸', task: 'Photograph entire roof surface before storm season begins', urgency: 'High' },
    { icon: '🌊', task: 'Check gutters for granule loss — filled gutters = shingle wear', urgency: 'High' },
    { icon: '🔩', task: 'Inspect flashings at chimney, vents, and valleys', urgency: 'High' },
    { icon: '🏔️', task: 'Check ridge caps — they take first impact from hail', urgency: 'Medium' },
  ];

  if (isOld) {
    base.push({ icon: '👷', task: 'Schedule professional inspection — aging roofs need documented assessment', urgency: 'High' });
    base.push({ icon: '📋', task: 'Get replacement estimate now — lead times are 4–8 weeks', urgency: 'High' });
  }
  if (isMid) {
    base.push({ icon: '📋', task: 'Review homeowner insurance coverage before storm season', urgency: 'High' });
  }
  if (isMetal) {
    base.push({ icon: '🔩', task: 'Check all fasteners and seams — expansion cracks appear in spring', urgency: 'Medium' });
    base.push({ icon: '🎨', task: 'Look for rust spots at exposed fastener heads', urgency: 'Medium' });
  }
  if (isTile) {
    base.push({ icon: '🏺', task: 'Walk tile perimeter — cracked tiles must be replaced immediately', urgency: 'High' });
    base.push({ icon: '💧', task: 'Check flat roof drains — debris blocks cause ponding damage', urgency: 'High' });
  }

  return base;
}

export default function DFWSpringRoofInspection2026() {
  const [roofAge, setRoofAge] = useState<string | null>(null);
  const [material, setMaterial] = useState<string | null>(null);

  const priority = roofAge && material ? getPriority(roofAge, material) : null;
  const urgencyColor: Record<string, string> = { High: '#F5E642', Medium: '#FFA500', Low: '#4CAF50' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Spring Roof Inspection 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Post-winter, pre-hail-season: the best window to inspect your DFW roof and document its condition for insurance.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ DFW Roof Season Facts</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ color: '#cbd5e1' }}>⛈️ DFW averages 8–10 hail events per year — peak March–June</li>
            <li style={{ color: '#cbd5e1' }}>📸 Pre-storm photos are critical for insurance claims</li>
            <li style={{ color: '#cbd5e1' }}>🚫 Never walk a wet or steep roof — use binoculars from ground</li>
            <li style={{ color: '#cbd5e1' }}>📅 File insurance claims within 30 days of any storm</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 12 }}>Roof age + material → inspection priority guide</h2>

        <div style={{ marginBottom: 16 }}>
          <p style={{ color: '#94a3b8', marginBottom: 8 }}>Roof age:</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {roofAges.map(a => (
              <button key={a.id} onClick={() => setRoofAge(a.label)}
                style={{ padding: '9px 18px', borderRadius: 8, border: '2px solid',
                  borderColor: roofAge === a.label ? '#F5E642' : '#1e3a5f',
                  background: roofAge === a.label ? '#F5E642' : '#112240',
                  color: roofAge === a.label ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <p style={{ color: '#94a3b8', marginBottom: 8 }}>Roof material:</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {materials.map(m => (
              <button key={m.id} onClick={() => setMaterial(m.label)}
                style={{ padding: '9px 18px', borderRadius: 8, border: '2px solid',
                  borderColor: material === m.label ? '#F5E642' : '#1e3a5f',
                  background: material === m.label ? '#F5E642' : '#112240',
                  color: material === m.label ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {priority && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {priority.map((item, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: 10, padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: 14, border: '1px solid #1e3a5f' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ flex: 1, color: '#e2e8f0' }}>{item.task}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: urgencyColor[item.urgency] }}>{item.urgency}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, padding: 20, background: '#112240', borderRadius: 12, border: '1px solid #F5E642' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🏠 ProLnk connects you with vetted DFW roofing pros</p>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Licensed roofing contractors for inspections, hail repairs, and full replacements across the Metroplex.</p>
        </div>
      </div>
    </div>
  );
}