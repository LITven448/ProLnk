import { useState } from 'react';

const homeAges = ['Built after 2000', 'Built 1980–2000', 'Built 1960–1980', 'Built before 1960'];
const protectionLevels = ['No surge protection', 'Some power strips only', 'Whole-home unit installed', 'Full grounding + whole-home surge'];

const damageable = [
  { icon: '❄️', item: 'HVAC System', risk: 'Very High', cost: '$3,000–$12,000 to replace' },
  { icon: '🖥️', item: 'Computers & TVs', risk: 'Very High', cost: '$500–$3,000 to replace' },
  { icon: '🎮', item: 'Gaming Consoles', risk: 'High', cost: '$300–$700 per unit' },
  { icon: '🍳', item: 'Smart Appliances', risk: 'High', cost: '$800–$2,500 to replace' },
  { icon: '🔊', item: 'Home Theater', risk: 'Very High', cost: '$1,000–$8,000 to replace' },
  { icon: '📡', item: 'Internet/Router', risk: 'Medium', cost: '$100–$400 to replace' },
];

function getRiskScore(homeAge: string, protection: string) {
  let risk = 0;

  if (homeAge === 'Built before 1960') risk += 4;
  else if (homeAge === 'Built 1960–1980') risk += 3;
  else if (homeAge === 'Built 1980–2000') risk += 2;
  else risk += 1;

  if (protection === 'No surge protection') risk += 4;
  else if (protection === 'Some power strips only') risk += 2;
  else if (protection === 'Whole-home unit installed') risk += 1;
  else risk = Math.max(0, risk - 1);

  const label = risk >= 7 ? 'CRITICAL' : risk >= 5 ? 'HIGH' : risk >= 3 ? 'MODERATE' : 'LOW';
  const color = risk >= 7 ? '#FF4444′ : risk >= 5 ? '#FF8C00' : risk >= 3 ? '#FFB347' : '#4ECDC4';

  const upgrades: string[] = [];
  if (homeAge !== 'Built after 2000') upgrades.push('Inspect and update grounding — older DFW homes often have ungrounded outlets');
  if (protection === 'No surge protection') upgrades.push('Install whole-home surge protector at panel — cost $200–$600 with install');
  if (protection !== 'Full grounding + whole-home surge') upgrades.push('Add point-of-use surge protectors for HVAC disconnect and AV equipment');
  if (homeAge === 'Built before 1960') upgrades.push('Consider full electrical inspection — wiring may not support modern loads safely');
  if (homeAge === 'Built 1960–1980') upgrades.push('Check for aluminum wiring — common in 1965–1973, requires CO/ALR devices or rewiring');

  return { label, color, score: risk, upgrades };
}

export default function DFWGroundingAndSurgeGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [protection, setProtection] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getRiskScore> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>⚡</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW Grounding & Surge Protection Guide
          </h1>
        </div>
        <p style={{ color: '#8A9AB5', fontSize: 16, marginBottom: 40 }}>
          DFW logs 50–70 thunderstorm days per year. Lightning strikes are a top cause of electrical damage in North Texas.
        </p>

        <div style={{ background: '#2A1A1A', borderRadius: 12, padding: 20, marginBottom: 32, border: '1px solid #5C1E1E', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 28 }}>⚠️</span>
          <div>
            <div style={{ color: '#FF6B6B', fontWeight: 700, marginBottom: 4 }}>DFW Lightning Risk: Above Average</div>
            <p style={{ color: '#8A9AB5', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              The Dallas-Fort Worth area sits in "Tornado Alley" and also experiences frequent severe thunderstorms with 
              cloud-to-ground lightning. A single nearby strike can send a surge of 10,000–100,000 volts through your 
              home's electrical system — destroying electronics, HVAC systems, and even causing fires.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          <div style={{ background: '#111E35', borderRadius: 12, padding: 22, border: '1px solid #1E2D4A' }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>🏠</div>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>Whole-Home Surge Protector</h3>
            <p style={{ color: '#8A9AB5', fontSize: 13, lineHeight: 1.6, margin: '0 0 12px' }}>
              Installed at your main panel — protects all circuits simultaneously. First line of defense against 
              large surges from lightning or utility switching. One device covers your entire home.
            </p>
            <div style={{ color: '#4ECDC4', fontWeight: 700 }}>$200–$600 installed</div>
            <div style={{ color: '#8A9AB5', fontSize: 12, marginTop: 4 }}>Best brands: Siemens FS140, Eaton CHSPT2SURGE, Square D HOM2CPS</div>
          </div>
          <div style={{ background: '#111E35', borderRadius: 12, padding: 22, border: '1px solid #1E2D4A' }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>🔌</div>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>Point-of-Use Protection</h3>
            <p style={{ color: '#8A9AB5', fontSize: 13, lineHeight: 1.6, margin: '0 0 12px' }}>
              Surge strips or surge outlet plates at individual devices. Second line of defense — catches 
              smaller internal surges not stopped by whole-home unit. Required for HVAC, AV equipment, computers.
            </p>
            <div style={{ color: '#4ECDC4', fontWeight: 700 }}>$20–$150 per location</div>
            <div style={{ color: '#8A9AB5', fontSize: 12, marginTop: 4 }}>Look for: UL 1449 Listed, clamping voltage under 400V, joule rating 2,000+</div>
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>💸 What Surges Can Destroy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {damageable.map(d => (
              <div key={d.item} style={{ background: '#0A1628', borderRadius: 8, padding: 14, border: '1px solid #1E2D4A' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{d.icon}</div>
                <div style={{ fontWeight: 600, color: '#E8EDF5', fontSize: 14, marginBottom: 4 }}>{d.item}</div>
                <div style={{ color: d.risk === 'Very High' ? '#FF6B6B' : '#FFB347', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                  {d.risk} Risk
                </div>
                <div style={{ color: '#8A9AB5', fontSize: 12 }}>{d.cost}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>🏚️ Grounding Issues in Older DFW Homes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { era: 'Pre-1960', issue: 'Knob-and-tube wiring, no ground at all. Major fire and surge risk.', action: 'Full electrical inspection + rewire recommended', urgency: 'CRITICAL' },
              { era: '1960–1973', issue: 'Aluminum wiring common in DFW — expands/contracts, causes loose connections and fire risk.', action: 'CO/ALR devices or rewiring to copper', urgency: 'HIGH' },
              { era: '1974–1990', issue: 'Often 2-prong outlets (ungrounded). Many lack GFCI in wet areas.', action: 'Update to grounded outlets or GFCI protection', urgency: 'MODERATE' },
              { era: '1990–2000', issue: 'Generally safe but may lack arc fault protection (AFCI) on bedroom circuits.', action: 'Add AFCI breakers, verify panel is not recalled brand', urgency: 'LOW' },
            ].map(e => (
              <div key={e.era} style={{ background: '#0A1628', borderRadius: 8, padding: 14, border: '1px solid #1E2D4A' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{e.era}</span>
                  <span style={{ color: e.urgency === 'CRITICAL' ? '#FF4444′ : e.urgency === ’HIGH' ? '#FF8C00′ : e.urgency === ’MODERATE' ? '#FFB347′ : '#4ECDC4', fontSize: 12, fontWeight: 700 }}>{e.urgency}</span>
                </div>
                <p style={{ color: '#8A9AB5', fontSize: 12, margin: '0 0 6px', lineHeight: 1.5 }}>{e.issue}</p>
                <div style={{ color: '#4ECDC4', fontSize: 12, fontWeight: 600 }}>→ {e.action}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 28, border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>🔍 Your Home Risk Assessment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Age / Build Era</label>
              <select value={homeAge} onChange={e => setHomeAge(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select era</option>
                {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Surge Protection</label>
              <select value={protection} onChange={e => setProtection(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select level</option>
                {protectionLevels.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => { if (homeAge && protection) setResult(getRiskScore(homeAge, protection)); }}
            disabled={!homeAge || !protection}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', opacity: !homeAge || !protection ? 0.5 : 1 }}>
            Calculate Risk Score →
          </button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, border: `1px solid ${result.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ color: result.color, fontWeight: 800, fontSize: 22 }}>Risk Level: {result.label}</span>
                <span style={{ color: '#8A9AB5', fontSize: 14 }}>Score: {result.score}/8</span>
              </div>
              <h4 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: 14 }}>Recommended Upgrades:</h4>
              {result.upgrades.map((u, i) => (
                <div key={i} style={{ color: '#8A9AB5', fontSize: 13, padding: '6px 0', borderTop: i > 0 ? '1px solid #1E2D4A' : 'none' }}>
                  → {u}
                </div>
              ))}
              {result.upgrades.length === 0 && <div style={{ color: '#4ECDC4', fontSize: 14 }}>✓ Your protection level is good! Annual inspection recommended.</div>}
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ color: '#8A9AB5', fontSize: 13 }}>Get quotes from licensed DFW electricians on ProLnk</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 8, border: 'none', cursor: 'pointer', marginTop: 12 }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
