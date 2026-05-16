import { useState } from 'react';

const phases = [
  {
    id: 'foundation',
    label: 'Foundation Pour',
    emoji: '🧱',
    scans: ['Slab edge cracking or honeycombing at initial pour', 'Rebar exposure before concrete sets', 'Form board alignment and elevation variance', 'Drainage slope around foundation perimeter'],
    lookFor: 'Voids, honeycombing, cold joints in concrete — these are almost impossible to detect after backfill',
    builderUse: 'Send AI scan report to builder with photo timestamps before they pour the slab to document pre-existing grade conditions. File with your inspection record for warranty disputes.',
  },
  {
    id: 'framing',
    label: 'Framing',
    emoji: '🪵',
    scans: ['Stud spacing compliance (16" OC standard)', 'Header sizing over openings', 'Shear wall blocking presence', 'Roof rafter and ridge board alignment', 'Fire blocking in wall cavities'],
    lookFor: 'Missing fire blocking and incorrect header sizing are the two most commonly missed framing defects that disappear behind drywall',
    builderUse: 'Document framing before insulation and drywall goes up. If issues surface later, you have timestamped proof they were present — and whether they were corrected.',
  },
  {
    id: 'predrywall',
    label: 'Pre-Drywall',
    emoji: '📦',
    scans: ['MEP rough-in — visible pipe runs and electrical boxes', 'Insulation coverage and voids in exterior walls', 'Window and door buck flashing', 'Duct run routing and size', 'HVAC equipment model and serial capture'],
    lookFor: 'Insulation voids and improper window flashing are the biggest sources of future moisture intrusion — they vanish permanently at drywall stage',
    builderUse: "This is TrustyPro's highest-value scan window. Walk the home with the app before drywall install. The AI creates a full mechanical, electrical, and plumbing rough-in record that becomes part of your permanent home file.",
  },
  {
    id: 'punchlist',
    label: 'Punch List',
    emoji: '✅',
    scans: ['Paint defects, roller marks, and missed areas', 'Trim gaps and caulk voids', 'Cabinet door alignment and hinge gaps', 'Grout cracking and tile lippage', 'Exterior finish completeness'],
    lookFor: 'Trim and paint defects are easiest to document now — builders are incentivized to close and will push back less when evidence is immediate and photo-backed',
    builderUse: 'Export TrustyPro punch list report and send to your builder contact and project manager simultaneously. AI groups items by trade for faster resolution routing.',
  },
  {
    id: 'year1warranty',
    label: 'Year 1 Warranty Scan',
    emoji: '📅',
    scans: ['Settlement cracks in drywall at corners and around openings', 'Grout cracking in tile areas over slab movement', 'Exterior caulk shrinkage and gap formation', 'HVAC performance indicators (visible airflow, refrigerant line condensation)', 'Foundation movement from first year soil settlement'],
    lookFor: 'Most builders warranty structural defects for 10 years and workmanship for 1 year. Year 1 is your window to document everything before workmanship coverage expires.',
    builderUse: "File your TrustyPro Year 1 report with the builder's warranty department before month 11. AI-dated evidence is significantly harder to dispute than verbal claims at warranty close-out.",
  },
];

export default function TrustyProForNewBuilds() {
  const [phase, setPhase] = useState(phases[2]);

  return (
    <div style={{ minHeight: '100vh', background: '#050d1a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>TrustyPro for New Construction</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 640, margin: '0 auto' }}>
            Scan at every critical phase — from foundation to year-one warranty close-out. Catch issues before they're buried, document everything builders hope you forget.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Why New Construction Needs Documentation Too</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>
            DFW new construction volume is among the highest in the US — and so is new-build complaint volume. Production builders move fast. TrustyPro gives buyers a visual record at each phase transition so defects can't be "discovered" after the warranty window closes. Pre-drywall scans alone catch issues that would cost $8,000–$40,000 to repair after close.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Select Construction Phase</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {phases.map(p => (
              <button key={p.id} onClick={() => setPhase(p)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: phase.id === p.id ? '#4F46E5' : '#1e3a5f', color: '#fff' }}>
                {p.emoji} {p.label}
              </button>
            ))}
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#FACC15' }}>{phase.emoji} {phase.label} — What TrustyPro Scans</h3>
          <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
            {phase.scans.map(s => <li key={s} style={{ color: '#e2e8f0', fontSize: 15, marginBottom: 8, lineHeight: 1.6 }}>{s}</li>)}
          </ul>

          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #FACC15' }}>
            <div style={{ color: '#FACC15', fontWeight: 700, marginBottom: 8 }}>🔍 What to Look For at This Phase</div>
            <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{phase.lookFor}</p>
          </div>

          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, borderLeft: '4px solid #4F46E5' }}>
            <div style={{ color: '#4F46E5', fontWeight: 700, marginBottom: 8 }}>📋 How to Use This Report with Your Builder</div>
            <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{phase.builderUse}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
