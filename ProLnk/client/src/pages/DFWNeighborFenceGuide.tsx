import { useState } from 'react';

const disputes = [
  {
    type: 'Shared fence repair — who pays?',
    law: 'Texas Property Code §74.101 — Line Fence Act',
    detail: 'Texas treats a fence on the property line as a "line fence" — both neighbors are joint owners and share maintenance costs equally unless otherwise agreed.',
    steps: ['Document the damage with photos and dates', 'Send written notice to neighbor requesting cost-sharing', 'Get 2-3 contractor estimates', 'Split the agreed repair cost 50/50', 'If neighbor refuses, file in small claims court (JP Court) for your half'],
    hoa: 'HOA may have separate fence standards — check CC&Rs before choosing materials or color',
    legal: 'Small claims JP Court if neighbor refuses to pay their share (up to $20K in Texas)',
  },
  {
    type: 'Neighbor built fence on my property',
    law: 'Texas Property Code — Trespass and Encroachment',
    detail: 'If a fence is built on your land without permission, it is an encroachment. You have the right to have it removed. A survey is required to prove the line.',
    steps: ['Hire a licensed surveyor to establish the official property line', 'Send a certified letter to neighbor with survey results', 'Request they move the fence within 30 days', 'If no action, file in county court for encroachment removal', 'Do not remove the fence yourself without a court order'],
    hoa: 'HOA typically cannot force fence removal — this is a property law matter between owners',
    legal: 'County civil court for encroachment — attorney recommended for disputes over $10K value',
  },
  {
    type: 'Neighbor fence violates HOA rules',
    law: 'HOA CC&Rs and Deed Restrictions (contractual, not state law)',
    detail: 'HOA fence rules are private contracts enforced by the association. Violations can result in fines. The HOA — not the city or courts — is the first enforcement body.',
    steps: ['Document the violation with photos', 'File a formal complaint with HOA board in writing', 'Request HOA enforce the CC&Rs (they are legally obligated)', 'Attend HOA hearing if one is scheduled', 'If HOA refuses to act, consult an HOA attorney about member rights'],
    hoa: 'HOA has duty to enforce its own rules — failure to do so may be grounds for legal action against the HOA',
    legal: 'HOA enforcement first; small claims or civil court if HOA fails its duty',
  },
  {
    type: 'Fence height or style dispute',
    law: 'City ordinance (varies by DFW city) + HOA CC&Rs',
    detail: 'Most DFW cities allow 6 ft fences in residential backyards and 4 ft in front yards. HOA may be stricter. Neighbor preferences alone are not enforceable — only code violations are.',
    steps: ['Look up your city’s fence ordinance (search "[city name] fence permit ordinance")', 'Check HOA CC&Rs for height, material, and style restrictions', 'If city/HOA rules are met, neighbor cannot force changes', 'If code violation exists, report to city code enforcement'],
    hoa: 'HOA style rules override personal preferences — enforce through HOA complaint process',
    legal: 'City code enforcement for ordinance violations; HOA dispute process for CC&R violations',
  },
];

export default function DFWNeighborFenceGuide() {
  const [idx, setIdx] = useState(0);
  const [result, setResult] = useState<null | typeof disputes[0]>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏡 DFW PROPERTY GUIDE</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>DFW Neighbor Fence Dispute Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: '2rem' }}>Fence disputes are among the most common neighbor conflicts in DFW. Texas law, HOA rules, and city ordinances each play a different role. Know which applies before you act.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚖️ Texas Law: The Line Fence Act</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['🤝 Joint Ownership', 'A fence on the property line belongs to both neighbors — you each own half and share maintenance costs'], ['💰 Cost Sharing', 'Repairs to a line fence are split 50/50 by default under Texas law — in writing is better'], ['📍 Placement', 'Building within your property avoids joint ownership — entirely your fence, your cost'], ['📋 Written Agreement', 'Always document fence agreements in writing — verbal agreements are hard to enforce']].map(([icon, desc]) => (
              <div key={icon} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{icon}</div>
                <div style={{ fontSize: '0.85rem', color: '#9BA3B8′ }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Dispute Resolution Tool</h2>
          <label style={{ display: 'block', color: '#9BA3B8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>What is your dispute?</label>
          <select value={idx} onChange={e => { setIdx(+e.target.value); setResult(null); }} style={{ width: '100%', padding: '0.7rem', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, marginBottom: '1rem' }}>
            {disputes.map((d, i) => <option key={i} value={i}>{d.type}</option>)}
          </select>
          <button onClick={() => setResult(disputes[idx])} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Get Resolution Steps</button>
          {result && (
            <div style={{ marginTop: '1.5rem', background: '#0A1628', borderRadius: 8, padding: '1.5rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📜 {result.law}</div>
              <p style={{ color: '#9BA3B8', fontSize: '0.9rem', marginBottom: '1rem' }}>{result.detail}</p>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>Resolution Steps:</div>
              {result.steps.map((s, i) => <div key={i} style={{ padding: '0.4rem 0', borderBottom: '1px solid #1E3A5F', fontSize: '0.9rem' }}>{i + 1}. {s}</div>)}
              <div style={{ marginTop: '1rem', background: '#0F2040', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>🏘 HOA Angle</div>
                <div style={{ color: '#9BA3B8', fontSize: '0.85rem' }}>{result.hoa}</div>
              </div>
              <div style={{ marginTop: '0.75rem', background: '#0F2040', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>⚖️ Legal Escalation</div>
                <div style={{ color: '#9BA3B8', fontSize: '0.85rem' }}>{result.legal}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 DFW Fence Quick Facts</h2>
          {[['📏 Height Limits', 'Most DFW cities: 6 ft backyard, 4 ft front yard — verify with your city'], ['🎨 Materials', 'Wood, vinyl, wrought iron, masonry — HOA often restricts to match neighborhood'], ['🏗 Permits', 'Many DFW cities require a fence permit — check before building'], ['📐 Survey First', 'Always get a survey before building near the property line to avoid disputes']].map(([icon, desc]) => (
            <div key={icon} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #1E3A5F', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.1rem', minWidth: 28 }}>{icon}</span>
              <span style={{ fontSize: '0.9rem', color: '#9BA3B8′ }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
