import { useState } from 'react';

const redFlags = [
  { id: 'storm_chaser', label: '🚩 Storm Chaser (out-of-state plates)', description: 'Arrives within 48 hrs of a storm from Oklahoma, Louisiana, or elsewhere. No local ties, will be gone before warranty issues surface.', weight: -2 },
  { id: 'door_knock', label: '🚩 Unsolicited Door-to-Door', description: 'Legitimate local roofers don\’t cold knock after storms. This is the #1 indicator of a scam operation in DFW.', weight: -2 },
  { id: 'no_address', label: '🚩 No Local Physical Address', description: 'P.O. Box, UPS Store, or address that matches a residence. Can\’t be served legally if things go wrong.', weight: -2 },
  { id: 'cash_only', label: '🚩 Cash or Zelle Only', description: 'No paper trail. No recourse. No warranty enforcement. A legitimate contractor accepts check or credit card.', weight: -2 },
  { id: 'aob', label: '🚩 Requests Assignment of Benefits', description: 'Signing AOB transfers your insurance rights to the contractor. Illegal in some states, extremely risky in TX.', weight: -2 },
  { id: 'sign_today', label: '🚩 "Sign Today" Pressure', description: 'High-quality roofers are in demand and don\’t need to pressure you. Same-day pressure is a manipulation tactic.', weight: -1 },
  { id: 'no_written', label: '🚩 No Written Estimate', description: 'Verbal estimates are unenforceable. Everything must be in writing: materials, scope, cost, timeline, warranty.', weight: -1 },
  { id: 'low_ball', label: '🚩 Estimate Way Below Others', description: 'If one bid is 40%+ below others, they\’re planning to cut corners or add extras mid-job. Not a deal — a trap.', weight: -1 },
];

const greenFlags = [
  { id: 'tx_license', label: '✅ Texas Roofing Contractor License', description: 'Texas does not require state licensing for roofers but top contractors pursue RCAT certification. Verify with your city.' },
  { id: 'local_address', label: '✅ Established Local Address (5+ Years)', description: 'A real office in DFW you can find on Google Maps Street View. Longevity matters — storm chasers don\’t last.' },
  { id: 'bbb', label: '✅ Better Business Bureau A+ Rating', description: 'Check bbb.org. Look for rating AND complaint history. An A+ with zero complaints is the standard to aim for.' },
  { id: 'manufacturer_cert', label: '✅ Manufacturer Certification (GAF, Owens Corning)', description: 'Certified contractors receive training and can offer extended warranties unavailable to uncertified roofers.' },
  { id: 'written_warranty', label: '✅ Written Workmanship Warranty (5+ Years)', description: 'Manufacturer warranties cover materials. Workmanship warranties cover installation errors. Both in writing.' },
];

export default function DFWRooferVetting() {
  const [checkedRed, setCheckedRed] = useState<string[]>([]);
  const [checkedGreen, setCheckedGreen] = useState<string[]>([]);

  const toggleRed = (id: string) => setCheckedRed(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleGreen = (id: string) => setCheckedGreen(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const redScore = checkedRed.reduce((acc, id) => acc + (redFlags.find(r => r.id === id)?.weight ?? 0), 0);
  const greenScore = checkedGreen.length * 2;
  const rawScore = 10 + redScore + greenScore;
  const score = Math.max(0, Math.min(10, rawScore));

  const getVerdict = () => {
    if (score >= 8) return { label: '✅ Strong Candidate', color: '#4ADE80', bg: '#0D2A1A', border: '#1A5C35', desc: 'This contractor checks out well. Proceed with a written contract and verify all claims before signing.' };
    if (score >= 5) return { label: '⚠️ Proceed with Caution', color: '#FBBF24', bg: '#2A200D', border: '#5C4A1A', desc: 'Some concerns present. Get two more bids and verify every green flag independently before committing.' };
    return { label: '🚫 High Risk — Walk Away', color: '#F87171', bg: '#2A0D0D', border: '#7C1A1A', desc: 'Multiple red flags detected. Do not sign anything. Report door-to-door solicitation to the TX AG office.' };
  };

  const verdict = getVerdict();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW CONSUMER GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          How to Choose a DFW Roofer — Avoid Scams
        </h1>
        <p style={{ color: '#9AA3B4', fontSize: 16, marginBottom: 32 }}>
          DFW is one of the most targeted markets for roofing fraud in the country. Use this checklist to score any contractor before signing.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
          <div style={{ background: '#111E33', borderRadius: 16, padding: 22 }}>
            <h2 style={{ color: '#F87171', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>🚩 Red Flags — Check All That Apply</h2>
            {redFlags.map(f => (
              <label key={f.id} style={{ display: 'flex', gap: 10, marginBottom: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
                <input type="checkbox" checked={checkedRed.includes(f.id)} onChange={() => toggleRed(f.id)}
                  style={{ marginTop: 3, accentColor: '#F87171', width: 16, height: 16, flexShrink: 0 }} />
                <div>
                  <div style={{ color: '#E8EAF0', fontWeight: 600, fontSize: 13 }}>{f.label}</div>
                  <div style={{ color: '#6B7A99', fontSize: 12, marginTop: 2 }}>{f.description}</div>
                </div>
              </label>
            ))}
          </div>
          <div style={{ background: '#111E33', borderRadius: 16, padding: 22 }}>
            <h2 style={{ color: '#4ADE80', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>✅ Green Flags — Check All That Apply</h2>
            {greenFlags.map(f => (
              <label key={f.id} style={{ display: 'flex', gap: 10, marginBottom: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
                <input type="checkbox" checked={checkedGreen.includes(f.id)} onChange={() => toggleGreen(f.id)}
                  style={{ marginTop: 3, accentColor: '#4ADE80', width: 16, height: 16, flexShrink: 0 }} />
                <div>
                  <div style={{ color: '#E8EAF0', fontWeight: 600, fontSize: 13 }}>{f.label}</div>
                  <div style={{ color: '#6B7A99', fontSize: 12, marginTop: 2 }}>{f.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div style={{ background: verdict.bg, border: `2px solid ${verdict.border}`, borderRadius: 16, padding: 24, marginBottom: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: verdict.color, marginBottom: 4 }}>{score}/10</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: verdict.color, marginBottom: 8 }}>{verdict.label}</div>
          <div style={{ color: '#C5CAD8', fontSize: 15 }}>{verdict.desc}</div>
        </div>

        <div style={{ padding: '16px 20px', background: '#111E33', borderRadius: 12, borderLeft: '4px solid #F5E642′ }}>
          <strong style={{ color: '#F5E642′ }}>Always verify independently:</strong>
          <span style={{ color: '#9AA3B4', marginLeft: 8 }}>
            Call the manufacturer (GAF: 800-766-3411, Owens Corning: 800-438-7465) to confirm contractor certification status — not just the certificate they show you.
          </span>
        </div>
      </div>
    </div>
  );
}
