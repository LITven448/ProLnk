import { useState } from 'react';

type ConditionType = 'Foundation Repairs' | 'Flood or Water Damage' | 'HVAC Issues' | 'Roof Leaks or Damage' | 'Mold or Mildew' | 'Neighbor Disputes' | 'HOA Violations' | 'Previous Pest Infestation' | 'Deaths on Property' | 'Zoning/Permit Issues';

const disclosureData: Record<ConditionType, { mustDisclose: boolean; how: string; risk: string; asIsNote: string }> = {
  'Foundation Repairs': { mustDisclose: true, how: 'Check "Yes" on SDN Item 2. Attach all engineer reports and repair receipts.', risk: 'HIGH — Undisclosed foundation issues are #1 cause of post-sale litigation in TX.', asIsNote: 'Even as-is sales require disclosure. "As-is" means no repairs, not no disclosure.' },
  'Flood or Water Damage': { mustDisclose: true, how: 'Check "Yes" on SDN Item 4. Include all flood insurance claims and repair records.', risk: 'HIGH — FEMA flood zone properties have additional federal disclosure requirements.', asIsNote: 'TX Property Code §5.008 mandates flood disclosure regardless of sale terms.' },
  'HVAC Issues': { mustDisclose: true, how: 'Check "Yes" on SDN Item 6. List all known defects. Service records help.', risk: 'MEDIUM — Buyers will discover in inspection. Better to disclose and price accordingly.', asIsNote: 'Known defects must be disclosed even in as-is sales.' },
  'Roof Leaks or Damage': { mustDisclose: true, how: 'Check "Yes" on SDN Item 3. Attach repair history and any insurance claims.', risk: 'HIGH — Undisclosed roof leaks with water damage inside creates liability.', asIsNote: 'Current leaks must be disclosed. Past leaks that were properly repaired may not be required.' },
  'Mold or Mildew': { mustDisclose: true, how: 'Check "Yes" on SDN Item 4. Include remediation reports and lab results.', risk: 'HIGH — Mold non-disclosure leads to rescission demands and lawsuits in TX.', asIsNote: 'Remediated mold still needs disclosure if you have knowledge of prior mold.' },
  'Neighbor Disputes': { mustDisclose: true, how: 'Describe in SDN Section 11 (Other Material Facts). Be factual, not emotional.', risk: 'MEDIUM — Buyers can rescind if neighbor dispute materially affects enjoyment.', asIsNote: 'Ongoing disputes with legal action must be disclosed.' },
  'HOA Violations': { mustDisclose: true, how: 'Disclose in SDN Section 11. Include any pending fines or legal notices.', risk: 'MEDIUM — Active HOA violations transfer to buyer and can kill deals at closing.', asIsNote: 'HOA violations and pending assessments are always material facts.' },
  'Previous Pest Infestation': { mustDisclose: true, how: 'Check "Yes" on SDN Item 7 if damage exists. Attach termite bond/treatment records.', risk: 'MEDIUM — Structural termite damage must always be disclosed.', asIsNote: 'Treated infestations without structural damage: check with your REALTOR® on TX specifics.' },
  'Deaths on Property': { mustDisclose: false, how: 'TX does not require disclosure of natural deaths. Stigmatized property disclosure is limited.', risk: 'LOW — Violent crimes may require disclosure if buyer directly asks.', asIsNote: 'TX Property Code §93.012 limits stigmatized property disclosure requirements.' },
  'Zoning/Permit Issues': { mustDisclose: true, how: 'Disclose any unpermitted additions or known zoning violations in SDN Section 11.', risk: 'HIGH — Unpermitted work can void buyer financing and trigger city enforcement.', asIsNote: 'Unpermitted additions must be disclosed even in as-is sales.' },
};

export default function DFWSellerDisclosureGuide() {
  const [condition, setCondition] = useState<ConditionType | ''>('');

  const result = condition ? disclosureData[condition] : null;

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>
            Texas Seller Disclosure Guide
          </h1>
          <p style={{ fontSize: 18, color: '#555', maxWidth: 600, margin: '0 auto' }}>
            What you must disclose, how to disclose it, and what happens if you don't — for DFW home sellers.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff3cd', borderRadius: 16, padding: 24, marginBottom: 40, border: '1px solid #ffc107′ }}>
          <h2 style={{ color: '#856404', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>⚠️ The Texas SDN Requirement</h2>
          <p style={{ color: '#533f03', fontSize: 14, lineHeight: 1.7 }}>
            Texas requires sellers of residential property (1–4 units) to complete the <strong>Seller's Disclosure Notice (SDN)</strong> — TREC Form OP-H — before or at signing. Failing to disclose known material defects can result in <strong>rescission of sale, damages, and personal liability</strong>.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🏗️', title: 'Foundation Repairs', desc: '#1 cause of TX post-sale disputes' },
            { icon: '🌊', title: 'Flood/Water Damage', desc: 'Federal + state disclosure required' },
            { icon: '❄️', title: 'HVAC Issues', desc: 'Buyers expect working AC in DFW' },
            { icon: '🏚️', title: 'HOA Violations', desc: 'Active fines transfer to buyer' },
          ].map(item => (
            <div key={item.title} style={{ backgroundColor: '#f8f9ff', borderRadius: 12, padding: 20, border: '1px solid #e0e4ff', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 15, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: '#888′ }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#f0fdf4', borderRadius: 16, padding: 28, marginBottom: 48, border: '1px solid #bbf7d0′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#166534', marginBottom: 16 }}>📝 "As-Is" Sales Still Require Disclosure</h2>
          <p style={{ color: '#15803d', fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
            A common seller misconception: selling "as-is" means you don't have to disclose problems. <strong>This is false in Texas.</strong>
          </p>
          <ul style={{ paddingLeft: 20, color: '#166534', fontSize: 14, lineHeight: 2 }}>
            <li>"As-is" means you won't make repairs — not that you can hide known defects</li>
            <li>You must still complete and deliver the SDN form</li>
            <li>Intentional concealment = fraud in Texas</li>
            <li>Buyers can sue for rescission up to 4 years after closing</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 16, padding: 32, marginBottom: 32, color: '#fff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔍 Disclosure Checker</h2>
          <p style={{ color: '#9aa5b4', marginBottom: 16, fontSize: 14 }}>Select a condition type to find out what to disclose and how.</p>

          <select value={condition} onChange={e => setCondition(e.target.value as ConditionType)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, backgroundColor: '#1a2a40', color: '#fff', border: '1px solid #2a3a50', fontSize: 14, marginBottom: 20 }}>
            <option value="">Select a condition type...</option>
            {Object.keys(disclosureData).map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 20, borderRadius: 12, backgroundColor: result.mustDisclose ? '#1a3a1a' : '#1a2a3a', border: `2px solid ${result.mustDisclose ? '#4ade80' : '#818cf8'}` }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: result.mustDisclose ? '#4ade80′ : '#818cf8', marginBottom: 4 }}>
                  {result.mustDisclose ? '⚠️ MUST DISCLOSE' : '✅ DISCLOSURE NOT REQUIRED'}
                </div>
              </div>
              <div style={{ padding: 20, borderRadius: 12, backgroundColor: '#1a2a40′ }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>📋 HOW TO DISCLOSE</div>
                <p style={{ color: '#ccc', fontSize: 14, lineHeight: 1.6 }}>{result.how}</p>
              </div>
              <div style={{ padding: 20, borderRadius: 12, backgroundColor: '#1a2a40′ }}>
                <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>⚡ BUYER REACTION RISK</div>
                <p style={{ color: '#ccc', fontSize: 14, lineHeight: 1.6 }}>{result.risk}</p>
              </div>
              <div style={{ padding: 20, borderRadius: 12, backgroundColor: '#1a2a40', borderLeft: '4px solid #818cf8′ }}>
                <div style={{ color: '#818cf8', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>🏷️ AS-IS SALES NOTE</div>
                <p style={{ color: '#ccc', fontSize: 14, lineHeight: 1.6 }}>{result.asIsNote}</p>
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#888', fontSize: 13 }}>
          ⚠️ This guide is for informational purposes only. Consult a Texas real estate attorney for specific legal advice.
        </p>
      </div>
    </div>
  );
}
