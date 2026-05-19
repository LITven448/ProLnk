import { useState } from 'react';

const CONCERNS = [
  {
    id: 'fresh',
    label: 'Just had piers installed',
    guide: 'Walk the perimeter within 48 hours of installation. Each bracket should be fully engaged on the pier head — no rocking, no visible gap between bracket and grade beam. Request the installation report with bracket engagement depths.',
  },
  {
    id: 'movement',
    label: 'Still seeing movement post-repair',
    guide: 'Post-repair movement within 90 days may indicate shallow bracket engagement or a pier that did not reach load-bearing stratum. Have the original installer inspect — most DFW foundation companies offer a warranty inspection at no charge.',
  },
  {
    id: 'shallow',
    label: 'Concerned about shallow installation',
    guide: 'DFW expansive clay requires piers to reach the stable zone — typically 15–25 ft deep. Shallow piers move with the clay. Ask your contractor for the pier installation log showing depth at refusal for each pier.',
  },
  {
    id: 'welded',
    label: 'Welded vs bolted bracket question',
    guide: 'Welded brackets are generally more rigid but cannot be adjusted. Bolted brackets allow minor adjustment post-installation. Both are acceptable — the critical factor is bracket engagement depth and pier diameter, not connection type.',
  },
  {
    id: 'inspection',
    label: 'Want independent inspection',
    guide: 'A licensed structural engineer (PE) can perform a post-repair elevation survey and bracket inspection. ProLnk connects DFW homeowners with licensed foundation engineers for independent verification — not affiliated with the repair contractor.',
  },
];

export default function DFWFoundationPierConnector2026() {
  const [selected, setSelected] = useState('fresh');

  const current = CONCERNS.find(c => c.id === selected) || CONCERNS[0];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>🏗️ DFW Foundation Pier-to-Bracket Connection Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>The critical connection point in DFW foundation repair — how pier top brackets work and what can go wrong.</p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📊 Key Facts</div>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>The pier-to-bracket connection transfers load from grade beam to pier shaft</li>
            <li><strong style={{ color: '#fff' }}>Welded brackets</strong>: rigid, no post-install adjustment, common in DFW</li>
            <li><strong style={{ color: '#fff' }}>Bolted brackets</strong>: allow minor adjustment, requires torque spec verification</li>
            <li>Bracket must engage pier head with <strong style={{ color: '#fff' }}>full surface contact</strong> — no tipping or rocking</li>
            <li>Common DFW error: shallow bracket engagement (pier too short for bracket seat)</li>
            <li>Pier must reach stable stratum — typically 15–25 ft in North Texas</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 Post-Repair Concern Guide</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {CONCERNS.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', background: selected === c.id ? '#F5E642′ : '#1e3a5f', color: selected === c.id ? '#0A1628' : '#cbd5e1', fontWeight: selected === c.id ? 700 : 400, cursor: ’pointer', textAlign: 'left', fontSize: 14 }}>
                {c.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642′ }}>
            <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>{current.guide}</div>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>✅ Post-Installation Checklist</div>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Request pier installation log (depth at refusal per pier)</li>
            <li>Inspect each bracket for full engagement — no rocking</li>
            <li>Verify concrete patching over bracket is flush with slab</li>
            <li>Get elevation survey baseline within 30 days of completion</li>
            <li>Schedule 1-year follow-up elevation survey</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', padding: '16px 0', borderTop: '1px solid #1e3a5f' }}>
          <span style={{ color: '#475569', fontSize: 12 }}>ProLnk © 2026 · DFW Home Services Platform</span>
        </div>
      </div>
    </div>
  );
}
