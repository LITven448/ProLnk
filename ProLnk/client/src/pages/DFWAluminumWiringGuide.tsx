import { useState } from 'react';

type RemediationKey = 'confirmed' | 'suspected' | 'unsure';

const remediationOptions: Record<RemediationKey, { options: { name: string; cost: string; risk: string; note: string }[] }> = {
  confirmed: {
    options: [
      { name: 'CO/ALR Outlets & Switches', cost: '$800 – $2,500', risk: 'Moderate reduction', note: 'Cheapest fix; must replace every outlet and switch with CO/ALR-rated devices' },
      { name: 'Copper Pigtailing (AlumiConn or COPALUM)', cost: '$2,000 – $6,000', risk: 'High reduction', note: 'CPSC-approved method; licensed electrician only; AlumiConn connectors at every junction' },
      { name: 'Full Copper Rewire', cost: '$8,000 – $18,000', risk: 'Eliminates risk', note: 'Gold standard; required by some DFW insurers; adds home value' },
    ]
  },
  suspected: {
    options: [
      { name: 'Inspection First', cost: '$150 – $400', risk: 'No change until confirmed', note: 'Have a licensed electrician confirm aluminum branch circuits before spending on remediation' },
      { name: 'CO/ALR Outlets (Precautionary)', cost: '$600 – $1,800', risk: 'Low reduction if not aluminum', note: 'Low cost, does no harm even if wiring turns out to be copper' },
    ]
  },
  unsure: {
    options: [
      { name: 'Licensed Inspection', cost: '$150 – $400', risk: 'Diagnosis only', note: 'Check panel wiring labels and outlets — aluminum wiring is silver-colored and often marked AL or CU/AL' },
    ]
  }
};

export default function DFWAluminumWiringGuide() {
  const [vintage, setVintage] = useState('');
  const [alStatus, setAlStatus] = useState<RemediationKey | ''>('');
  const [result, setResult] = useState<typeof remediationOptions[RemediationKey] | null>(null);

  function assess() {
    if (!alStatus) return;
    setResult(remediationOptions[alStatus as RemediationKey]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔩⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: 0 }}>DFW Aluminum Wiring Guide</h1>
          <p style={{ color: '#8899BB', marginTop: 12, fontSize: 16 }}>1965–1973 DFW homes — what aluminum branch circuits mean for safety and insurance</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📅 The Aluminum Wiring Window</h2>
          <p style={{ color: '#C8D8EE', lineHeight: 1.7 }}>During 1965–1973, copper prices surged and builders switched to aluminum for branch circuit wiring (outlets, switches, lighting). Homes built in this era across <strong style={{ color: '#F5E642′ }}>Garland, Irving, Mesquite, Plano, and North Dallas suburbs</strong> often have aluminum wiring throughout.</p>
          <p style={{ color: '#C8D8EE', lineHeight: 1.7 }}>Aluminum expands and contracts more than copper with heat cycling. Over decades this causes connections to loosen, arc, and overheat — a known fire risk. The CPSC has documented aluminum-wired homes as 55× more likely to have a fire hazard connection.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔍 How to Identify Aluminum Wiring</h2>
          <ul style={{ color: '#C8D8EE', lineHeight: 2 }}>
            <li>Check the main panel — aluminum service entrance wires are normal; look for silver branch circuit wires</li>
            <li>Outlet wires: aluminum is dull silver; copper is bright orange/gold</li>
            <li>Wire jacket may be stamped "AL" or "ALUM"</li>
            <li>Outlets may be marked CU/AL (rated for both) or copper-only</li>
            <li>DFW building permits 1965–1973 may note aluminum branch circuits</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🏦 Insurance Disclosure Requirement</h2>
          <p style={{ color: '#C8D8EE', lineHeight: 1.7 }}>Texas homeowner insurance applications ask about wiring type. Failing to disclose aluminum wiring can void your coverage. Many DFW insurers require proof of remediation (pigtailing certificate or full rewire permit) to write or renew a policy on aluminum-wired homes.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🧮 Remediation Options Estimator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#8899BB', display: 'block', marginBottom: 6 }}>Home construction vintage</label>
            <select value={vintage} onChange={e => setVintage(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #2A4070', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select...</option>
              <option value="pre-1965″>Before 1965</option>
              <option value="1965-1973″>1965 – 1973</option>
              <option value="post-1973″>After 1973</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#8899BB', display: 'block', marginBottom: 6 }}>Aluminum wiring status</label>
            <select value={alStatus} onChange={e => setAlStatus(e.target.value as RemediationKey)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #2A4070', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select...</option>
              <option value="confirmed">Confirmed aluminum branch circuits</option>
              <option value="suspected">Suspected but not confirmed</option>
              <option value="unsure">Not sure — home is from the era</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Show Remediation Options →</button>
          {result && (
            <div style={{ marginTop: 20 }}>
              {result.options.map((opt, i) => (
                <div key={i} style={{ background: '#0A1628', border: '1px solid #2A4070', borderRadius: 10, padding: 18, marginBottom: 12 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{opt.name}</div>
                  <div style={{ color: '#C8D8EE', marginBottom: 4 }}>💰 Cost: {opt.cost}</div>
                  <div style={{ color: '#C8D8EE', marginBottom: 4 }}>🛡️ Risk Reduction: {opt.risk}</div>
                  <div style={{ color: '#8899BB', fontSize: 13 }}>{opt.note}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔌</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>Connect with a CPSC-Certified DFW Electrician for Aluminum Wiring Remediation via ProLnk</p>
        </div>
      </div>
    </div>
  );
}
