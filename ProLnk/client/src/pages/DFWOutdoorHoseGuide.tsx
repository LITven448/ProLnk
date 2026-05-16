import { useState } from 'react';

const bibIssues = [
  {
    id: 'drip',
    name: 'Dripping / Leaking Bib',
    description: 'Most common DFW hose bib failure. Usually a worn packer washer or seat washer inside the valve.',
    dfwNote: '🔧 DFW water pressure is often 80–100 PSI at the street — higher than the 60–80 PSI residential standard. High pressure accelerates washer wear.',
    repairType: 'DIY: Replace packer/stem washer ($3–$8 parts). Pro: $80–$150.',
    freezeRisk: 'Low — dripping indicates functioning valve, not freeze damage.',
    timeline: 'Fix within 30 days — a slow drip wastes 1,000+ gallons/month at DFW rates.',
  },
  {
    id: 'freeze',
    name: 'Freeze-Damaged Bib',
    description: 'Bib cracked or burst during a DFW freeze event. Water comes out of the wall, not the spout.',
    dfwNote: '❄️ DFW had 4 notable freeze events 2021–2025. Standard exterior bibs without shut-off valves crack in sub-28°F temps — common in DFW north suburbs.',
    repairType: 'Pro only: Replace bib + add interior shut-off valve. $200–$500.',
    freezeRisk: 'High — indicates no interior shut-off. Install frost-free bib to prevent recurrence.',
    timeline: 'Emergency repair — shut off water at meter until fixed.',
  },
  {
    id: 'noflow',
    name: 'No Water Flow',
    description: 'Bib turns but no water comes out. Usually a closed interior shut-off, failed valve, or pipe that froze and collapsed internally.',
    dfwNote: '🔍 Check the interior shut-off valve first (behind the wall or in crawl space). DFW slab homes often have shut-offs inside a utility closet or under the sink.',
    repairType: 'DIY: Check interior shut-off. Pro: Diagnose collapsed pipe $150–$300, repair $300–$800.',
    freezeRisk: 'Medium — may indicate internally collapsed pipe from freeze.',
    timeline: 'Diagnose before next irrigation season.',
  },
  {
    id: 'backflow',
    name: 'No Anti-Siphon Device',
    description: 'Required by most DFW cities to prevent irrigation water from back-flowing into the potable water supply.',
    dfwNote: '📋 Arlington, Garland, Irving, and Fort Worth require anti-siphon devices on all outdoor hose bibs. Plano and Dallas require backflow prevention on irrigation systems.',
    repairType: 'DIY: Add hose-end vacuum breaker $8–$20. Pro: Install integral anti-siphon bib $150–$300.',
    freezeRisk: 'Low — separate from freeze issue.',
    timeline: 'Required before connecting irrigation. Code violation if not installed.',
  },
];

const freezeProtection = [
  { method: 'Frost-Free (Anti-Siphon) Bib', desc: 'Valve seat located 6–12 inches inside the wall — water drains out after shutoff, preventing freeze.', cost: '$150–$350 installed', recommended: true },
  { method: 'Interior Shut-Off Valve', desc: 'Ball valve inside the home on the bib supply line. Drain the bib after shutoff each fall.', cost: '$80–$180 installed', recommended: true },
  { method: 'Foam Bib Cover', desc: 'Insulating cover for exterior bib. Provides minimal protection — only effective above 20°F for a few hours.', cost: '$5–$15 DIY', recommended: false },
  { method: 'Heated Pipe Wrap', desc: 'Electric heat tape on exposed pipe runs to bib. Effective but requires outdoor-rated outlet nearby.', cost: '$30–$80 DIY', recommended: false },
];

const recommend = (age: string, issue: string): typeof bibIssues[0] | null => {
  return bibIssues.find(b => b.id === issue) ?? null;
};

export default function DFWOutdoorHoseGuide() {
  const [age, setAge] = useState('');
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState<typeof bibIssues[0] | null>(null);

  const getRecommendation = () => {
    if (!age || !issue) return;
    setResult(recommend(age, issue));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚰 DFW Outdoor Hose Bib Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>After 2021's Uri and recurring DFW freeze events, outdoor hose bibs are the #1 residential plumbing failure. Most DFW homes built before 2000 lack proper freeze protection and anti-siphon compliance.</p>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Hose Bib Troubleshooter</h2>
        <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Home Age</label>
            <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              <option value="">Select home age...</option>
              <option value="pre1980">Pre-1980 (older DFW home)</option>
              <option value="1980s">1980s–1999</option>
              <option value="2000s">2000–2015</option>
              <option value="new">2016 or newer</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Hose Bib Issue</label>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              <option value="">Select issue...</option>
              <option value="drip">💧 Dripping or leaking when off</option>
              <option value="freeze">❄️ Cracked / burst (freeze damage)</option>
              <option value="noflow">🚫 No water when turned on</option>
              <option value="backflow">📋 No anti-siphon / backflow device</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get Repair Guide →
          </button>
        </div>

        {result && (
          <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32, border: '2px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>✅ Diagnosis: {result.name}</div>
            <p style={{ color: '#94A3B8', marginBottom: 12 }}>{result.description}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14 }}>{result.dfwNote}</div>
            <div style={{ marginBottom: 8 }}><strong>🔧 Repair:</strong> {result.repairType}</div>
            <div style={{ marginBottom: 8 }}><strong>❄️ Freeze Risk:</strong> {result.freezeRisk}</div>
            <div style={{ color: '#F5E642' }}><strong>⏰ Timeline:</strong> {result.timeline}</div>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>DFW Freeze Protection Options</h2>
        {freezeProtection.map(fp => (
          <div key={fp.method} style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginBottom: 16, border: fp.recommended ? '1px solid #F5E642' : '1px solid #1E3A5F' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h3 style={{ fontWeight: 700 }}>{fp.method}</h3>
              {fp.recommended && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>RECOMMENDED</span>}
            </div>
            <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 8 }}>{fp.desc}</p>
            <div style={{ color: '#F5E642', fontSize: 13 }}>💰 {fp.cost}</div>
          </div>
        ))}

        <div style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginTop: 8 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📋 DFW Annual Winterization Checklist</div>
          <ul style={{ color: '#94A3B8', fontSize: 14, paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}>Close interior shut-off valves for all exterior bibs (October)</li>
            <li style={{ marginBottom: 6 }}>Open exterior bib handle to drain remaining water in pipe</li>
            <li style={{ marginBottom: 6 }}>Disconnect all hoses — trapped water in connected hoses causes bib failure</li>
            <li style={{ marginBottom: 6 }}>Verify anti-siphon device is present and functional on all bibs</li>
            <li>Watch for DFW freeze watches — shut off at meter if temps forecast below 25°F</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
