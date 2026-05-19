import { useState } from 'react';

type BreakerResult = {
  safety: string;
  urgency: string;
  cost: string;
  color: string;
  detail: string;
};

const breakerData: Record<string, BreakerResult> = {
  'fpe': { safety: 'UNSAFE — Recall-level risk', urgency: 'Replace immediately', cost: '$1,500 – $4,500 panel replacement', color: '#FF3333', detail: 'Federal Pacific Electric (FPE) Stab-Lok panels fail to trip on overcurrent up to 65% of the time per CPSC research. DFW has thousands of these in 1960s–1980s homes. Do not delay.' },
  'zinsco': { safety: 'UNSAFE — Known failure mode', urgency: 'Replace within 90 days', cost: '$1,500 – $4,000 panel replacement', color: '#FF5500', detail: 'Zinsco / GTE-Sylvania breakers melt and fuse to the bus bar, preventing tripping. Common in DFW homes built 1960–1975. A ticking clock.' },
  'pushmatic': { safety: 'End-of-life — High concern', urgency: 'Replace within 1 year', cost: '$2,000 – $5,000', color: '#FF8800', detail: 'Pushmatic panels have no off position and use aging springs. Parts are discontinued. DFW summer load accelerates failure. Replacement strongly recommended.' },
  'cutler': { safety: 'Generally safe — monitor', urgency: 'Inspect if tripping frequently', cost: '$100 – $400 for breaker replacement', color: '#44BB44', detail: 'Cutler-Hammer / Eaton is a reliable brand. Frequent tripping usually means overloaded circuits, not panel failure. Add circuits for high-demand areas.' },
  'square-d': { safety: 'Safe — industry standard', urgency: 'No urgent action needed', cost: '$80 – $300 for breaker replacement', color: '#44BB44', detail: 'Square D / Homeline / QO are code-compliant and widely used by DFW electricians. Address overloads by adding circuits, not replacing the panel.' },
  'siemens': { safety: 'Safe — industry standard', urgency: 'No urgent action needed', cost: '$80 – $300 for breaker replacement', color: '#44BB44', detail: 'Siemens panels are code-compliant and well-supported. Tripping is an overload symptom, not panel failure. Add circuits for AC, EV, or kitchen demand.' },
  'unknown': { safety: 'Unknown — Inspection required', urgency: 'Schedule inspection', cost: '$150 – $350 inspection', color: '#8899BB', detail: 'Brand identification is critical. Open the panel door — the brand is usually printed on the panel interior. A licensed DFW electrician can identify and assess in under an hour.' },
};

export default function DFWCircuitBreakerGuide() {
  const [vintage, setVintage] = useState('');
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<BreakerResult | null>(null);

  function assess() {
    if (!brand) return;
    setResult(breakerData[brand]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔌🛑</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: 0 }}>DFW Circuit Breaker Guide</h1>
          <p style={{ color: '#8899BB', marginTop: 12, fontSize: 16 }}>Tripping breakers, dangerous panel brands, and when to upgrade — for DFW homeowners</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>☀️ Why DFW Summer Kills Circuits</h2>
          <p style={{ color: '#C8D8EE', lineHeight: 1.7 }}>DFW summers push central AC units to run near-continuously from June through September. AC compressors draw 15–50 amps each. Older homes with 100-amp service and original wiring weren't designed for modern HVAC loads — add a mini-split, EV charger, or pool pump and you’ve got a chronic overload problem.</p>
          <p style={{ color: '#C8D8EE', lineHeight: 1.7 }}>Tripping breakers are a symptom, not a problem in themselves — unless your breaker is a brand known to not trip reliably.</p>
        </div>

        <div style={{ background: '#FF1111', borderRadius: 12, padding: 24, marginBottom: 24, border: '2px solid #FF4444′ }}>
          <h2 style={{ color: '#FFFFFF', marginTop: 0, fontSize: 20 }}>🚨 Dangerous Breaker Brands in DFW Homes</h2>
          <p style={{ color: '#FFEEEE', lineHeight: 1.7, margin: 0 }}><strong>Federal Pacific Electric (Stab-Lok)</strong> and <strong>Zinsco / GTE-Sylvania</strong> panels are documented fire hazards still present in tens of thousands of DFW homes built 1960–1985. If you have either, replacement is urgent — not optional.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📊 Add Circuits vs Upgrade Panel</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #2A4070′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>➕ Add Circuits When:</div>
              <ul style={{ color: '#C8D8EE', margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
                <li>Safe panel with open slots</li>
                <li>Specific room overloads</li>
                <li>New appliance added</li>
                <li>EV charger needed</li>
              </ul>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #2A4070′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔄 Upgrade Panel When:</div>
              <ul style={{ color: '#C8D8EE', margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
                <li>FPE/Zinsco/Pushmatic brand</li>
                <li>Under 200A service capacity</li>
                <li>No open slots remaining</li>
                <li>Adding solar or whole-home backup</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🧮 Safety Assessment & Cost Estimator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#8899BB', display: 'block', marginBottom: 6 }}>Home construction vintage</label>
            <select value={vintage} onChange={e => setVintage(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #2A4070', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select...</option>
              <option value="pre-1960″>Before 1960</option>
              <option value="1960-1985″>1960 – 1985</option>
              <option value="post-1985″>After 1985</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#8899BB', display: 'block', marginBottom: 6 }}>Breaker panel brand</label>
            <select value={brand} onChange={e => setBrand(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #2A4070', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select brand...</option>
              <option value="fpe">Federal Pacific Electric (Stab-Lok)</option>
              <option value="zinsco">Zinsco / GTE-Sylvania</option>
              <option value="pushmatic">Pushmatic / Bulldog</option>
              <option value="cutler">Cutler-Hammer / Eaton</option>
              <option value="square-d">Square D / Homeline / QO</option>
              <option value="siemens">Siemens / Murray</option>
              <option value="unknown">Don't know / Can’t read label</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Assess My Panel →</button>
          {result && (
            <div style={{ marginTop: 20, padding: 20, borderRadius: 10, border: `2px solid ${result.color}`, background: '#0A1628′ }}>
              <div style={{ color: result.color, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>🛡️ {result.safety}</div>
              <div style={{ color: '#F5E642', marginBottom: 6 }}>⏰ Urgency: {result.urgency}</div>
              <div style={{ color: '#C8D8EE', marginBottom: 10 }}>💰 Est. Cost: {result.cost}</div>
              <p style={{ color: '#8899BB', margin: 0, fontSize: 13, lineHeight: 1.6 }}>{result.detail}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>Get Panel Replacement Quotes from Vetted DFW Electricians via ProLnk</p>
        </div>
      </div>
    </div>
  );
}
