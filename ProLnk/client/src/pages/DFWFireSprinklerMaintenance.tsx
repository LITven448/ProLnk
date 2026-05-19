import { useState } from 'react';

const INSPECTION_TABLE: Record<string, Record<string, { frequency: string; cost: string; questions: string[] }>> = {
  wet: {
    small: { frequency: 'Annual full inspection (NFPA 25) + quarterly gauge checks', cost: '$350–$650/yr', questions: ['Ask for ITM (Inspection, Testing, Maintenance) report format', 'Do you provide trip test documentation?', 'What is your response time for impairment notifications?', 'Are you licensed with the Texas State Fire Marshal?'] },
    medium: { frequency: 'Annual + semi-annual flow tests for systems >20 heads/zone', cost: '$700–$1,400/yr', questions: ['Do you coordinate with our insurance carrier?', 'Can you handle 5-year internal obstruction inspection?', 'What software do you use for inspection records?', 'Do you offer 24/7 emergency impairment support?'] },
    large: { frequency: 'Annual + semi-annual + 5-year internal obstruction inspection', cost: '$1,500–$3,500+/yr', questions: ['Do you have experience with high-piled storage systems?', 'Can you manage multi-building inspection scheduling?', 'Do you coordinate with DFW fire marshal office directly?', 'What is your fastest deficiency correction turnaround?'] },
  },
  dry: {
    small: { frequency: 'Annual full + trip test + quarterly air pressure checks', cost: '$500–$900/yr', questions: ['Do you include internal pipe inspection in annual?', 'What dry pipe valve maintenance is included?', 'How do you address low-point drain requirements?', 'Do you document compressor runtime?'] },
    medium: { frequency: 'Annual + semi-annual dry pipe valve checks', cost: '$900–$1,800/yr', questions: ['Do you service the compressor and air dryer?', 'How do you handle freezing pipe prevention in DFW winters?', 'Can you provide trip test certificates for insurance?', 'Do you coordinate sprinkler impairment with alarm company?'] },
    large: { frequency: 'Annual + semi-annual + 3-year full trip test cycle', cost: '$2,000–$4,500+/yr', questions: ['How do you manage multi-zone dry systems?', 'What is your deficiency escalation protocol?', 'Do you have experience with freezer/cooler dry systems?', 'Can you provide NFPA 25 compliant digital records?'] },
  },
};

export default function DFWFireSprinklerMaintenance() {
  const [systemType, setSystemType] = useState('');
  const [systemSize, setSystemSize] = useState('');
  const [result, setResult] = useState<{ frequency: string; cost: string; questions: string[] } | null>(null);

  function generate() {
    if (!systemType || !systemSize) return;
    setResult(INSPECTION_TABLE[systemType]?.[systemSize] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#F5E642', padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🔥</div>
        <h1 style={{ color: '#0A1628', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Fire Sprinkler Maintenance Guide</h1>
        <p style={{ color: '#0A1628', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>NFPA 25 compliance, DFW fire marshal requirements, and what every property owner must know about sprinkler inspections.</p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📋 NFPA 25 Inspection Requirements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Weekly', 'Gauges and valves — visual only, for larger systems'], ['Monthly', 'Valve supervisory signals, alarm valves'], ['Quarterly', 'Alarm devices, gauges, valve condition'], ['Annual', 'Full system inspection + sprinkler head condition'], ['3 Years', 'Loaded sprinkler head internal testing'], ['5 Years', 'Internal pipe obstruction inspection']].map(([period, desc]) => (
              <div key={period} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0 }}>{period}</div>
                <div style={{ color: '#CBD5E1', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏛️ DFW Fire Marshal Requirements</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 16 }}>All fire sprinkler inspection, testing, and maintenance (ITM) in Texas must be performed by a licensed fire protection sprinkler contractor registered with the Texas State Fire Marshal's Office (SFMO). The SFMO requires inspection reports to be retained on-site for a minimum of 3 years. DFW jurisdictions (Dallas, Fort Worth, Frisco, Plano, etc.) may have additional local ordinances requiring permit notification for impairments.</p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Cost vs. Value</div>
            <div style={{ color: '#94A3B8', fontSize: 14 }}>Annual inspection cost: $350–$3,500. Average sprinkler system damage from deferred maintenance: $80,000–$450,000. Your insurance carrier may deny claims if NFPA 25 records cannot be produced.</div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏠 Residential Sprinkler Notes</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>Texas does not statewide require residential sprinklers in single-family homes, but many newer DFW developments (particularly in Frisco, McKinney, and Allen) include them voluntarily. If your home has a residential system (NFPA 13D), annual inspection is recommended — cost is typically $150–$350. Sprinkler heads should be replaced every 50 years or after any activation.</p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, marginBottom: 20 }}>🔧 Get Your Inspection Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>System Type</label>
              <select value={systemType} onChange={e => setSystemType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select type</option>
                <option value="wet">Wet Pipe System</option>
                <option value="dry">Dry Pipe System</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>System Size</label>
              <select value={systemSize} onChange={e => setSystemSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select size</option>
                <option value="small">Small (&lt;50 heads)</option>
                <option value="medium">Medium (50–200 heads)</option>
                <option value="large">Large (200+ heads)</option>
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>Get Inspection Plan →</button>
          {result && (
            <div style={{ marginTop: 20, background: '#fff', borderRadius: 8, padding: 20 }}>
              <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Inspection Schedule: {result.frequency}</div>
              <div style={{ color: '#374151', fontSize: 15, marginBottom: 16 }}>Estimated Cost: <strong>{result.cost}</strong></div>
              <div style={{ color: '#374151', fontWeight: 700, marginBottom: 8 }}>❓ Questions to Ask the Inspector:</div>
              {result.questions.map((q, i) => <div key={i} style={{ color: '#374151', fontSize: 13, padding: '4px 0', borderBottom: i < result.questions.length - 1 ? '1px solid #F1F5F9' : 'none' }}>• {q}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, marginTop: 20, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 18, marginBottom: 8 }}>🔥 Find a Licensed Sprinkler Contractor</h3>
          <p style={{ color: '#0A1628', fontSize: 14, marginBottom: 16 }}>ProLnk matches DFW property owners with SFMO-licensed sprinkler inspection and repair contractors.</p>
          <a href="/homeowner-signup" style={{ background: '#0A1628', color: '#F5E642', textDecoration: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700 }}>Find a Contractor →</a>
        </div>
      </div>
    </div>
  );
}
