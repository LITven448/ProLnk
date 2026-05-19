import { useState } from 'react';

const redFlags = [
  { id: 'no-manual-j', flag: 'No Manual J Load Calculation', severity: 'CRITICAL', what: 'Manual J is the industry-standard calculation that determines the right system size for your specific DFW home. Without it, the tech is guessing.', means: 'You will likely get an oversized system — a common DFW problem that causes short cycling, high humidity, and early failure.', action: 'Refuse the quote. Any legitimate DFW HVAC company will run Manual J before quoting.' },
  { id: 'phone-quote', flag: 'Quoted Price Over the Phone Without Site Visit', severity: 'CRITICAL', what: 'Proper HVAC sizing requires measuring your home, checking ductwork, and assessing your attic.', means: 'They are guessing at size and materials. You could end up with a system 1–2 tons off from what DFW actually requires.', action: 'Always require an in-person assessment before any quote for full system replacement.' },
  { id: 'no-permit', flag: 'No Permit Mentioned for New System', severity: 'HIGH', what: 'Texas requires permits for HVAC system replacements in most DFW municipalities. Dallas, Fort Worth, Plano, Arlington — all require permits.', means: 'Unpermitted work can void your homeowner insurance, create issues at resale, and leave you liable for code violations.', action: 'Ask directly: Will you pull the permit? If they say no or hesitate, find another contractor.' },
  { id: 'full-deposit', flag: '100% Deposit Required Upfront', severity: 'HIGH', what: 'Legitimate DFW HVAC companies typically require 50% down, 50% on completion — not 100% upfront.', means: 'This is a common DFW summer scam tactic. Once paid, some contractors delay or disappear — especially during peak season.', action: 'Never pay more than 50% before installation begins. Get a written timeline with payment tied to milestones.' },
  { id: 'urgency', flag: 'Extreme Same-Day Urgency Pressure', severity: 'MODERATE', what: 'Phrases like "this price is only good today" or "I have another job and can install tomorrow only" are pressure tactics.', means: 'Legitimate DFW pros are busy in summer but will still give you time to review. Urgency tactics rush you past red flags.', action: 'Sleep on any quote over $3,000. If the deal disappears overnight, it was not a real offer.' },
  { id: 'wrong-refrigerant', flag: 'Quoting R-22 Refrigerant (Freon) for New System', severity: 'CRITICAL', what: 'R-22 was phased out in 2020. New systems cannot legally be manufactured with R-22. Any new system quote should show R-410A or R-32.', means: 'They may be trying to sell you an old or reconditioned system — or they do not know basic refrigerant law.', action: 'Reject immediately. New systems in DFW must use R-410A or the newer R-32 (Puron Advance).' },
  { id: 'no-warranty', flag: 'No Manufacturer Warranty or Labor Warranty Discussed', severity: 'HIGH', what: 'DFW HVAC systems should come with 10-year manufacturer parts warranty (Carrier, Lennox, Trane, Daikin) and 1–5 year labor warranty.', means: 'If a quote skips warranty discussion, they may be installing off-brand equipment or skipping registration.', action: 'Ask for warranty documentation in writing before signing. Require they register the equipment with the manufacturer.' },
  { id: 'no-duct-check', flag: 'No Mention of Existing Ductwork Inspection', severity: 'MODERATE', what: 'A new system installed on DFW attic ductwork that is leaking will never perform at rated efficiency.', means: 'You spend $10,000+ on a new system that delivers 60% of its rated output because the ductwork was never addressed.', action: 'Ask: Will you inspect and test my existing ductwork? Require a duct leakage test or visual inspection report.' },
  { id: 'vague-brand', flag: 'Quote Does Not Specify Brand, Model, and SEER Rating', severity: 'HIGH', what: 'A legitimate quote will name the exact equipment: e.g. Carrier 25VNA048A003 (3-ton, 20 SEER2 variable speed).', means: 'Vague quotes allow bait-and-switch — they quote a good system and install a cheaper one.', action: 'Require exact model numbers in writing before signing. Compare the installed equipment on the day of install.' },
  { id: 'no-load', flag: 'Replacing "Like for Like" Without Reassessing Load', severity: 'MODERATE', what: 'If you replaced windows, added insulation, or added square footage since the original install, your load has changed.', means: 'DFW homes change over time. Like-for-like replacement often means the wrong size — undersized or oversized.', action: 'Always require a new Manual J even for replacements. Loads change; equipment should match current needs.' },
];

export default function DFWHVACQuoteRedFlags() {
  const [quoteDetails, setQuoteDetails] = useState({ phone: false, noManualJ: false, noPermit: false, fullDeposit: false, urgency: false, noWarranty: false });
  const [result, setResult] = useState<null | { found: typeof redFlags; proceed: string }>(null);

  function evaluate() {
    const found: typeof redFlags = [];
    if (quoteDetails.noManualJ) found.push(redFlags[0]);
    if (quoteDetails.phone) found.push(redFlags[1]);
    if (quoteDetails.noPermit) found.push(redFlags[2]);
    if (quoteDetails.fullDeposit) found.push(redFlags[3]);
    if (quoteDetails.urgency) found.push(redFlags[4]);
    if (quoteDetails.noWarranty) found.push(redFlags[6]);
    const criticals = found.filter(f => f.severity === 'CRITICAL').length;
    const proceed = criticals > 0 ? 'DO NOT SIGN — Critical red flags present' : found.length > 2 ? 'NEGOTIATE OR WALK AWAY' : found.length > 0 ? 'GET CLARIFICATION FIRST' : 'LOW RISK — Verify equipment model and proceed';
    setResult({ found, proceed });
  }

  const toggle = (key: keyof typeof quoteDetails) => setQuoteDetails(prev => ({ ...prev, [key]: !prev[key] }));
  const proceedColor = result ? (result.proceed.startsWith('DO NOT') ? '#FF6B6B' : result.proceed.startsWith('NEG') ? '#F5A623′ : result.proceed.startsWith(’GET') ? '#F5E642′ : '#22C55E') : '#F5E642';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', fontWeight: 600, letterSpacing: '0.08em' }}>DFW HVAC RESOURCE LIBRARY</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>HVAC Quote Red Flags Guide</h1>
        <p style={{ color: '#9AA5B8', marginBottom: '2rem', fontSize: '1rem' }}>The 10 biggest red flags in a DFW HVAC quote — and exactly what to do about each one.</p>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🚩 The 10 DFW HVAC Quote Red Flags</h2>
        <div style={{ display: 'grid', gap: '0.85rem', marginBottom: '2.5rem' }}>
          {redFlags.map((f, i) => (
            <div key={f.id} style={{ background: '#0F2040', borderRadius: '10px', padding: '1.1rem 1.25rem', border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 800, color: '#F5E642', minWidth: '24px' }}>{i + 1}.</span>
                <span style={{ fontWeight: 700 }}>{f.flag}</span>
                <span style={{ background: f.severity === 'CRITICAL' ? '#FF6B6B30′ : f.severity === ’HIGH' ? '#F5A62330′ : '#F5E64220', color: f.severity === ’CRITICAL' ? '#FF6B6B' : f.severity === 'HIGH' ? '#F5A623′ : '#F5E642', fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '20px' }}>{f.severity}</span>
              </div>
              <div style={{ fontSize: '0.84rem', color: '#9AA5B8', marginBottom: '0.3rem' }}>{f.means}</div>
              <div style={{ fontSize: '0.83rem', color: '#22C55E' }}>→ {f.action}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🧮 Evaluate Your Quote</h2>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.9rem', color: '#9AA5B8', marginBottom: '1rem' }}>Check all that apply to your quote:</div>
          <div style={{ display: 'grid', gap: '0.7rem', marginBottom: '1.25rem' }}>
            {[
              ['noManualJ', 'No Manual J load calculation was mentioned'],
              ['phone', 'Quote was given over the phone without site visit'],
              ['noPermit', 'Permits were not mentioned'],
              ['fullDeposit', '100% deposit required upfront'],
              ['urgency', 'Same-day pricing pressure or urgency tactics'],
              ['noWarranty', 'Warranty was not discussed'],
            ].map(([key, label]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input type="checkbox" checked={quoteDetails[key as keyof typeof quoteDetails]} onChange={() => toggle(key as keyof typeof quoteDetails)} style={{ width: '18px', height: '18px', accentColor: '#F5E642', cursor: 'pointer' }} />
                {label}
              </label>
            ))}
          </div>
          <button onClick={evaluate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Evaluate This Quote →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: `2px solid ${proceedColor}` }}>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', color: proceedColor, marginBottom: '1rem' }}>📊 {result.proceed}</div>
            {result.found.length === 0
              ? <div style={{ color: '#22C55E', fontSize: '0.9rem' }}>No major red flags detected from the items you checked. Verify the exact equipment model number and warranty documentation before signing.</div>
              : result.found.map((f, i) => (
                <div key={i} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: i < result.found.length - 1 ? '1px solid #1E3A5F' : 'none' }}>
                  <div style={{ fontWeight: 700, color: '#FF6B6B', marginBottom: '0.3rem' }}>🚩 {f.flag}</div>
                  <div style={{ fontSize: '0.875rem', color: '#9AA5B8', marginBottom: '0.25rem' }}>{f.means}</div>
                  <div style={{ fontSize: '0.875rem', color: '#22C55E' }}>→ {f.action}</div>
                </div>
              ))
            }
          </div>
        )}

        <div style={{ marginTop: '3rem', background: '#0F2040', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Get quotes from ProLnk-vetted DFW HVAC companies.</div>
          <div style={{ color: '#9AA5B8', fontSize: '0.9rem' }}>Every pro we match runs Manual J, pulls permits, and stands behind their work.</div>
        </div>
      </div>
    </div>
  );
}
