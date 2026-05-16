import { useState } from 'react';

const severityData: Record<string, { window: string; priority: string[]; estimate: string; fema: boolean }> = {
  minor: {
    window: '48 hours to prevent mold growth',
    priority: ['Extract standing water immediately', 'Run industrial dehumidifiers', 'Remove wet insulation and drywall', 'Document all damage with photos/video'],
    estimate: '$5,000–$25,000',
    fema: false,
  },
  moderate: {
    window: '24 hours — mold starts in wet drywall within 24–48 hours',
    priority: ['Call water mitigation company first — they take priority over general contractors', 'Photograph EVERYTHING before touching', 'Contact FEMA (if federally declared disaster zone)', 'Do not use electrical until cleared by licensed electrician'],
    estimate: '$25,000–$80,000',
    fema: true,
  },
  severe: {
    window: 'Act within hours — structural integrity may be compromised',
    priority: ['Do not re-enter until structure is cleared', 'Emergency mitigation company for water extraction', 'Structural engineer assessment before repairs begin', 'File FEMA + insurance claim simultaneously'],
    estimate: '$80,000–$250,000+',
    fema: true,
  },
};

const sequence = ['1️⃣ Water Mitigation (Day 1–5)', '2️⃣ Mold Testing & Remediation (Day 3–14)', '3️⃣ Structural Drying Verification (Day 7–21)', '4️⃣ Structural Repairs — framing, subfloor (Week 3–6)', '5️⃣ Mechanical Rough-in — HVAC, plumbing, electrical (Week 5–10)', '6️⃣ Insulation & Drywall (Week 8–14)', '7️⃣ Cosmetic Finishes — flooring, paint, trim (Week 12–18)'];

export default function DFWFloodRepairGuide() {
  const [severity, setSeverity] = useState('moderate');
  const [homeType, setHomeType] = useState('slab');
  const [showResults, setShowResults] = useState(false);

  const data = severityData[severity];
  const crawlspaceExtra = homeType === 'crawl' ? ' Crawlspace homes require additional moisture extraction and pier inspection.' : '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🌊 DFW Flood Damage Repair Guide</h1>
        <p style={{ color: '#8A9BB5', fontSize: 16, marginBottom: 32 }}>DFW flash floods are fast and destructive. The first 24–48 hours after flooding determine whether you have a repair or a rebuild.</p>

        <div style={{ background: '#1a0a0a', border: '1px solid #8B2020', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ color: '#FF6B6B', fontWeight: 700, marginBottom: 8 }}>⚠️ Critical Window</div>
          <div style={{ color: '#E8EDF5' }}>Mold begins colonizing wet drywall within 24–48 hours. Water mitigation must begin immediately — before structural or cosmetic contractors are called.</div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔧 Contractor Sequence</h2>
          {sequence.map((step, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: i < sequence.length - 1 ? '1px solid #1E2F4A' : 'none', fontSize: 14, color: '#C8D8E8' }}>
              {step}
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>📋 Get Your Action Plan</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Flood Severity:</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[['minor', '🟡 Minor (under 6")'], ['moderate', '🟠 Moderate (6"–2ft)'], ['severe', '🔴 Severe (2ft+)']].map(([val, label]) => (
                <button key={val} onClick={() => setSeverity(val)}
                  style={{ flex: 1, padding: '10px 8px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    background: severity === val ? '#F5E642' : '#1E2F4A', color: severity === val ? '#0A1628' : '#8A9BB5' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Foundation Type:</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[['slab', 'Slab Foundation'], ['crawl', 'Crawlspace'], ['pier', 'Pier & Beam']].map(([val, label]) => (
                <button key={val} onClick={() => setHomeType(val)}
                  style={{ flex: 1, padding: '10px 8px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    background: homeType === val ? '#F5E642' : '#1E2F4A', color: homeType === val ? '#0A1628' : '#8A9BB5' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResults(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Generate Action Plan →
          </button>
        </div>

        {showResults && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🚨 Priority Actions</h2>
            <div style={{ color: '#8A9BB5', marginBottom: 6, fontSize: 14 }}>Act within: <span style={{ color: '#FF6B6B', fontWeight: 700 }}>{data.window}</span></div>
            <div style={{ color: '#8A9BB5', marginBottom: 16, fontSize: 14 }}>Estimated total cost: <span style={{ color: '#F5E642', fontWeight: 700 }}>{data.estimate}</span>{crawlspaceExtra}</div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.priority.map((item, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1E2F4A', fontSize: 14, display: 'flex', gap: 10 }}>
                  <span style={{ color: '#F5E642' }}>▸</span>{item}
                </li>
              ))}
            </ul>
            {data.fema && (
              <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>🏛️ FEMA Assistance</div>
                <div style={{ color: '#8A9BB5', fontSize: 14 }}>If your area is under a federal disaster declaration, apply at DisasterAssistance.gov within 60 days of the incident date. FEMA assistance does not replace homeowner's insurance — both can be collected.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
