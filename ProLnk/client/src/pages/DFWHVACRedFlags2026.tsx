import { useState } from 'react';

const redFlags = [
  { id: 'r22', label: '🚨 Contractor Recommending R-22 Refrigerant', category: 'refrigerant' },
  { id: 'lowseer', label: '📉 Quoting a System Below SEER2 15', category: 'efficiency' },
  { id: 'noload', label: '📐 No Load Calculation Mentioned', category: 'sizing' },
  { id: 'nopermit', label: '🚫 "We Don\’t Need a Permit" Claim', category: 'permit' },
  { id: 'cash', label: '💵 Cash Only, No Written Contract', category: 'business' },
  { id: 'verbal', label: '🗣️ Verbal Quote Only — No Itemized Estimate', category: 'pricing' },
];

const details: Record<string, { severity: string; meaning: string; avoid: string; dfwContext: string }> = {
  refrigerant: {
    severity: '🔴 Walk Away Immediately',
    meaning: 'R-22 (Freon) has been illegal to manufacture in the US since 2020. Any contractor still working with R-22 systems is either using illegal stockpiles or doesn\’t know current regulations. New systems must use R-410A minimum; 2026 systems should use R-454B or R-32.',
    avoid: 'Get the quote in writing showing refrigerant type. Verify with EPA Section 608 regulations.',
    dfwContext: 'DFW has thousands of aging R-22 systems. Reputable contractors will tell you it\’s time to replace, not recharge.',
  },
  efficiency: {
    severity: '🔴 Code Violation Risk',
    meaning: 'Texas follows DOE\’s 2023 SEER2 minimums: 14.3 SEER2 for split systems in the South region. Quoting below this is either a mistake or fraud. In DFW\’s extreme heat, you want 16+ SEER2 anyway for reasonable utility bills.',
    avoid: 'Ask specifically for the SEER2 rating (not SEER — they\’re different metrics). Get it in writing.',
    dfwContext: 'A low-efficiency system in DFW will cost you $200-400 extra per summer in electric bills. The upgrade pays back fast.',
  },
  sizing: {
    severity: '🟠 Major Risk — Wrong-Size System',
    meaning: 'Manual J is the ACCA-approved load calculation that determines the correct HVAC size for your home. Without it, contractors guess — and a wrong-size system (over or undersized) will fail to dehumidify, short-cycle, or run constantly.',
    avoid: 'Ask: "Will you do a Manual J calculation?" A reputable contractor says yes. Replacing Rule-of-Thumb sizing with Manual J.',
    dfwContext: 'DFW homes need precise sizing — oversized units don\’t remove humidity, leaving homes feeling clammy even at 72°F.',
  },
  permit: {
    severity: '🔴 Illegal and Risky for You',
    meaning: 'HVAC replacement requires a permit in virtually all DFW municipalities (Dallas, Fort Worth, Plano, Frisco, etc.). Unpermitted work can void your homeowner\’s insurance, create issues at sale, and leave you with no recourse if work is done wrong.',
    avoid: 'Always ask: "Will you pull a permit?" If no, find another contractor. Permit cost is typically included in reputable quotes.',
    dfwContext: 'DFW municipalities actively inspect HVAC work. Unpermitted systems are flagged during home sales — a major problem.',
  },
  business: {
    severity: '🔴 Fraud Risk',
    meaning: 'Cash-only with no contract is a textbook sign of unlicensed contractors. In Texas, HVAC contractors must hold a TDLR license. No contract means no recourse if work is poor or incomplete.',
    avoid: 'Always get a written contract with scope of work, equipment model numbers, warranty terms, and payment schedule.',
    dfwContext: 'After major DFW weather events (ice storms, heat waves), unlicensed contractors flood the market. Be vigilant.',
  },
  pricing: {
    severity: '🟠 High Risk of Bait-and-Switch',
    meaning: 'A verbal-only quote with no itemization gives contractors room to add costs after installation begins. Equipment model, refrigerant type, labor, permits, and warranty should all be itemized in writing.',
    avoid: 'Request an itemized written estimate. Compare model numbers across quotes — same model = direct price comparison.',
    dfwContext: 'DFW HVAC is competitive. Reputable contractors provide detailed written estimates without prompting.',
  },
};

export default function DFWHVACRedFlags2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const detail = selected ? details[redFlags.find(f => f.id === selected)?.category || ''] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🚩⚠️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          DFW HVAC Red Flags 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          The DFW HVAC market has excellent contractors — and some who will cost you thousands. Know the 2026 red flags
          before you get a quote. These signals separate professionals from problems.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 Select a Red Flag to Learn More</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {redFlags.map(f => (
            <button key={f.id} onClick={() => setSelected(f.id)}
              style={{ background: selected === f.id ? '#F5E642′ : '#112240', color: selected === f.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === f.id ? '#F5E642' : '#1e3a5f'), borderRadius: 8, padding: '12px 16px', cursor: ’pointer', textAlign: 'left', fontWeight: 600, fontSize: 15 }}>
              {f.label}
            </button>
          ))}
        </div>

        {detail && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, borderLeft: '4px solid #ef4444', marginBottom: 24 }}>
            <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 17, marginBottom: 12 }}>{detail.severity}</div>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>What It Means:</div>
            <p style={{ color: '#cbd5e1', marginBottom: 12, fontSize: 14 }}>{detail.meaning}</p>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>How to Avoid:</div>
            <p style={{ color: '#cbd5e1', marginBottom: 12, fontSize: 14 }}>{detail.avoid}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>🌡️ DFW Context</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{detail.dfwContext}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Find Vetted DFW HVAC Pros</div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>ProLnk pre-screens contractors for licensing, permits, and transparent pricing. No red flags guaranteed.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Find My Vetted HVAC Pro
          </button>
        </div>
      </div>
    </div>
  );
}
