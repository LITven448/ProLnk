import { useState } from 'react';

export default function DFWContractorQuoteComparison2026() {
  const [discrepancyType, setDiscrepancyType] = useState('price');

  const guides: Record<string, { title: string; flags: string[]; steps: string[] }> = {
    price: {
      title: 'Large Price Difference',
      flags: ['Quote excludes permit fees (DFW permits: $500–$3,000)', 'No mention of material grades or brands', 'Labor-only price without materials breakdown', 'No warranty terms specified'],
      steps: ['Request itemized line-item breakdowns from all bidders', 'Confirm same material specs (e.g., Carrier vs. no-name HVAC)', 'Ask lowest bidder what is excluded', 'Compare total project cost including permits and disposal'],
    },
    timeline: {
      title: 'Timeline Mismatch',
      flags: ['Unusually fast timelines often mean subcontractors', 'No buffer for DFW material delivery delays', 'No mention of weather contingency (DFW storms)', 'Payment milestones front-loaded vs. completion'],
      steps: ['Ask for detailed schedule with milestone payments', 'Verify crew size and subcontractor usage', 'Request references for similar-scope DFW projects', 'Confirm permit pull timeline with city/county'],
    },
    materials: {
      title: 'Materials Discrepancy',
      flags: ['Vague descriptions like "standard grade" with no brand', 'No mention of manufacturer warranties', 'Missing energy efficiency ratings for DFW climate', 'No allowance for DFW soil/foundation considerations'],
      steps: ['Request material spec sheets from each contractor', 'Compare energy ratings (SEER for AC, R-value for insulation)', 'Ask about DFW-specific requirements (e.g., radiant barriers)', 'Verify all materials meet current DFW building codes'],
    },
    warranty: {
      title: 'Warranty Differences',
      flags: ['No written warranty offered', 'Warranty voided if homeowner makes any changes', 'Labor warranty under 1 year for major work', 'No manufacturer warranty pass-through'],
      steps: ['Request all warranty terms in writing before signing', 'Compare labor warranty length (standard DFW: 1–2 years)', 'Verify manufacturer warranties are transferable', 'Ask how warranty claims are handled and turnaround time'],
    },
  };

  const guide = guides[discrepancyType];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Contractor Quote Comparison 2026</h1>
          <p style={{ color: '#8899BB', fontSize: 14 }}>Compare apples-to-apples and spot red flags before you sign</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>What discrepancy are you seeing?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {Object.entries({ price: '💰 Price Gap', timeline: '📅 Timeline', materials: '🧱 Materials', warranty: '🛡️ Warranty' }).map(([k, label]) => (
              <button key={k} onClick={() => setDiscrepancyType(k)}
                style={{ padding: '12px', background: discrepancyType === k ? '#F5E642' : '#1A2A45',
                  color: discrepancyType === k ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🚩 Red Flags: {guide.title}</h2>
          {guide.flags.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, padding: '10px', background: '#1A0A0A', borderRadius: 8, borderLeft: '3px solid #E55' }}>
              <span>⚠️</span><span style={{ color: '#ccc', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>✅ Evaluation Steps</h2>
          {guide.steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ color: '#ccc', fontSize: 14, paddingTop: 3 }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', border: '2px solid #F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 20 }}>🔗</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>ProLnk Standardizes DFW Quotes</div>
          <div style={{ color: '#8899BB', fontSize: 13 }}>Every ProLnk quote uses the same scope template — no more apples-to-oranges comparisons</div>
        </div>
      </div>
    </div>
  );
}

