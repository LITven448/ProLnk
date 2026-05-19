import { useState } from 'react';

const FAUCET_TYPES = ['Ball (older Delta single-handle)', 'Cartridge (most modern single/dual)', 'Ceramic disc (premium, lever style)', 'Compression (2-handle, older home)'];
const HARDNESS_LEVELS = [
  { label: 'DFW Average (15–20 GPG)', value: 'high' },
  { label: 'North DFW / Plano (12–15 GPG)', value: 'medium' },
  { label: 'Filtered / softened water', value: 'low' },
];
const EXPERIENCE = ['First time — never done plumbing', 'Some experience — changed a showerhead', 'Comfortable — replaced a toilet'];

const VALVE_TYPES: Record<string, string> = {
  'Ball (older Delta single-handle)': 'Ball valve — brass ball controls flow. DFW hard water corrodes ball seats every 3–5 years. Rebuild kit ~$18.',
  'Cartridge (most modern single/dual)': 'Cartridge valve — most common in DFW new construction. Cartridge slides out, drops in. DFW hard water clogs ceramic cartridge in 5–8 yrs.',
  'Ceramic disc (premium, lever style)': 'Ceramic disc — most durable, but DFW hard water pits the disc surface. Full cartridge replacement ~$35–60.',
  'Compression (2-handle, older home)': 'Compression — oldest type. Still common in pre-1990 DFW homes. Rubber seat and washer wear fast — rebuild every 2–3 yrs in DFW.',
};

function getRecommendation(faucetType: string, hardness: string, experience: string) {
  const isHigh = hardness === 'high';
  const isFirst = experience.startsWith('First');
  const isBall = faucetType.startsWith('Ball');
  const isCompression = faucetType.startsWith('Compression');

  const action = isFirst && isBall ? 'replace' : isCompression && isHigh ? 'repair' : 'repair';
  const parts = isBall ? ['Ball faucet rebuild kit (Delta/Moen brand specific)', 'Adjustable pliers', 'Hex key set', 'Plumber\’s grease', 'Bucket'] : ['Replacement cartridge (brand + model specific)', 'Cartridge puller tool', 'Needle-nose pliers', 'Teflon tape', 'Bucket'];
  const hours = isFirst ? 2.5 : 1.5;
  const cost = action === 'replace' ? 120 : isHigh ? 45 : 30;
  const callPro = isFirst && isHigh;
  return { action, parts, hours, cost, callPro };
}

export default function DFWDIYFaucetGuide() {
  const [faucetType, setFaucetType] = useState('');
  const [hardness, setHardness] = useState('');
  const [experience, setExperience] = useState('');
  const [showResults, setShowResults] = useState(false);

  const ready = faucetType && hardness && experience;
  const rec = ready ? getRecommendation(faucetType, hardness, experience) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0′ }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 36px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🚰</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>DFW DIY Faucet Repair & Replacement Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>DFW hard water destroys faucet internals — know your valve type and when to repair vs. replace.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>⚠️ DFW Hard Water Destroys Faucets</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>At 15–20 GPG (grains per gallon), DFW water is classified "very hard." Mineral scale builds inside faucet cartridges, ceramic discs, and ball seats, causing dripping within 3–7 years even on quality fixtures. If your faucet drips shortly after installation, suspect the water — not the faucet brand.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>🛑 Shutoff Valve — Do This First</h2>
          {[
            ['Locate shutoffs under sink', 'Turn clockwise to close — if stuck or leaking, this is your first problem to fix'],
            ['Test shutoff completely stops water', 'Turn on faucet to confirm — in DFW older homes shutoffs fail silently'],
            ['No shutoff?', 'Turn off water at main (outside) — call a plumber to add angle stops before proceeding'],
            ['After repair', 'Turn water on slowly, check all connections for drips for 24 hrs'],
          ].map(([step, detail]) => (
            <div key={step} style={{ marginBottom: 12, padding: 14, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{step}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>🔍 Identify Your Valve Type</h2>
          {Object.entries(VALVE_TYPES).map(([type, desc]) => (
            <div key={type} style={{ marginBottom: 12, padding: 14, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{type}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>🛑 When to Call a Plumber</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>Call a pro if: shutoff valves won't close or are corroded, supply lines are corroded copper (DFW pre-1985 homes), the faucet base is cracked or corroded through, you discover water damage inside the cabinet, or you’re replacing a kitchen faucet with different hole configuration.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, margin: '0 0 20px' }}>🧮 Repair vs. Replace Estimator</h2>

          <div style={{ marginBottom: 18 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Faucet Type</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FAUCET_TYPES.map(f => (
                <button key={f} onClick={() => setFaucetType(f)} style={{ padding: '10px 16px', borderRadius: 8, border: '2px solid', borderColor: faucetType === f ? '#F5E642′ : '#334155', background: faucetType === f ? '#F5E64215' : ’transparent', color: faucetType === f ? '#F5E642′ : '#94a3b8', textAlign: ’left', cursor: 'pointer', fontSize: 14 }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Your DFW Water Hardness</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {HARDNESS_LEVELS.map(h => (
                <button key={h.value} onClick={() => setHardness(h.value)} style={{ padding: '10px 16px', borderRadius: 8, border: '2px solid', borderColor: hardness === h.value ? '#F5E642′ : '#334155', background: hardness === h.value ? '#F5E64215' : ’transparent', color: hardness === h.value ? '#F5E642′ : '#94a3b8', textAlign: ’left', cursor: 'pointer', fontSize: 14 }}>
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>DIY Experience Level</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {EXPERIENCE.map(e => (
                <button key={e} onClick={() => setExperience(e)} style={{ padding: '10px 16px', borderRadius: 8, border: '2px solid', borderColor: experience === e ? '#F5E642′ : '#334155', background: experience === e ? '#F5E64215' : ’transparent', color: experience === e ? '#F5E642′ : '#94a3b8', textAlign: ’left', cursor: 'pointer', fontSize: 14 }}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResults(true)} disabled={!ready} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', opacity: !ready ? 0.4 : 1 }}>
            Get My Plan →
          </button>

          {showResults && rec && (
            <div style={{ marginTop: 24, padding: 20, background: '#0A1628', borderRadius: 12, borderLeft: '4px solid ' + (rec.callPro ? '#f87171′ : '#4ade80') }}>
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 14, color: rec.callPro ? '#f87171′ : '#4ade80' }}>
                {rec.callPro ? '📞 Consider calling a plumber — DFW hard water + first-time plumbing is a risky combo' : `✅ ${rec.action === 'replace' ? 'Replace the faucet' : 'Repair the cartridge/valve'} — you can handle this`}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                {[['🕐 Time', `${rec.hours} hrs`], ['💰 Parts Cost', `~$${rec.cost}`]].map(([label, val]) => (
                  <div key={label} style={{ background: '#112240', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 8 }}>Parts List:</div>
              <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#94a3b8', fontSize: 14 }}>
                {rec.parts.map((p, i) => <li key={i} style={{ marginBottom: 4 }}>{p}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
