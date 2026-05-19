import { useState } from 'react';

type DisclosureDetail = {
  verification: string;
  meaning: string;
  negotiation: string;
  severity: 'watch' | 'serious' | 'critical';
};

const disclosures: Record<string, DisclosureDetail> = {
  flooding: {
    verification: 'Request permits, insurance claims history via CLUE report (seller must provide on request), check FEMA flood maps, ask neighbors, review aerial imagery after storms',
    meaning: 'Even one flood event can mean ongoing risk, high insurance premiums ($2,000-8,000/yr in DFW flood zones), and reduced resale pool',
    negotiation: 'Price reduction to cover elevation certificate cost + 2 years flood insurance, or walk away if property flooded twice',
    severity: 'critical',
  },
  foundation: {
    verification: 'Hire a structural engineer (not just home inspector), pull permits for any foundation work done, ask for transferable warranty documentation',
    meaning: 'DFW expansive clay soil means foundation issues are common — the key is whether repair was done properly and with a warranty',
    negotiation: 'Demand transferable engineer warranty, price reduction for risk, or seller credit equal to engineer\’s recommended preventive maintenance cost',
    severity: 'serious',
  },
  hvac: {
    verification: 'Check age of system on unit data plate, request service records, have HVAC tech inspect during option period',
    meaning: 'DFW summers are extreme — an aging or repaired HVAC is a real cost risk. Replacement runs $5,000-15,000 per unit',
    negotiation: 'Seller credit for unit age remaining, repair of disclosed issue, or price reduction if unit is near end of life',
    severity: 'watch',
  },
  roof: {
    verification: 'Request insurance claim history, check permit pull for replacement, get roofing company to inspect and estimate remaining life',
    meaning: 'DFW hail frequency means roofs take a beating. An undisclosed roof repair (vs. replacement) can fail within years',
    negotiation: 'If insurance claim pending: ensure it transfers. If repaired not replaced: price adjustment or seller replaces before close',
    severity: 'serious',
  },
  plumbing: {
    verification: 'Sewer scope ($150-300) is essential for homes 20+ years old, check if cast iron pipes present (common pre-1980), water pressure test',
    meaning: 'Cast iron sewer pipe failure is a $5,000-20,000 repair in DFW. Tree root intrusion common in older neighborhoods',
    negotiation: 'Scope reveals issue: seller repairs, provides credit, or reduce price by repair estimate plus contingency',
    severity: 'serious',
  },
  deaths: {
    verification: 'Texas does not require disclosure of natural death or suicide unless buyer asks in writing. Check DiedInHouse.com, ask agent directly',
    meaning: 'Texas law (TRELA) exempts stigmatized property in most cases but murder must be disclosed if buyer asks. Natural death is not required disclosure',
    negotiation: 'Not a legal defect — negotiate based on your personal comfort level. No recourse if seller failed to disclose natural death',
    severity: 'watch',
  },
};

const items = [
  { key: 'flooding', label: '💧 Flooding History' },
  { key: 'foundation', label: '🏗️ Foundation Repairs' },
  { key: 'hvac', label: '❄️ HVAC Issues' },
  { key: 'roof', label: '🏠 Roof Repairs' },
  { key: 'plumbing', label: '🔧 Plumbing Issues' },
  { key: 'deaths', label: '⚰️ Deaths on Property' },
];

const sevColors = { watch: '#FEF3C7', serious: '#FEE2E2', critical: '#EDE9FE' };
const sevText = { watch: '#92400E', serious: '#991B1B', critical: '#5B21B6' };
const sevLabel = { watch: 'Monitor Closely', serious: 'Serious — Negotiate Hard', critical: 'Critical — Consider Walking' };

export default function DFWPropertyDisclosureGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const info = selected ? disclosures[selected] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋 Texas Seller's Disclosure Guide</div>
          <p style={{ fontSize: '1.05rem', color: '#374151' }}>
            Texas sellers must complete the Seller's Disclosure Notice (TAR 1406). It covers material defects they are <em>aware of</em> — not everything that could be wrong. Knowing what's required, what isn't, and how to verify each item protects your investment.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#F0FDF4', borderRadius: 12, padding: '1.25rem', border: '1px solid #BBF7D0' }}>
            <div style={{ fontWeight: 700, color: '#166534', marginBottom: '0.75rem' }}>✅ Must Disclose</div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.9 }}>
              <li>Flooding, drainage, or water damage</li>
              <li>Foundation repairs or movement</li>
              <li>Roof repairs (not just replacement)</li>
              <li>HVAC repairs and known issues</li>
              <li>Any known material defects</li>
              <li>Pending litigation on property</li>
              <li>Murder (if buyer asks in writing)</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#FEF2F2', borderRadius: 12, padding: '1.25rem', border: '1px solid #FECACA' }}>
            <div style={{ fontWeight: 700, color: '#991B1B', marginBottom: '0.75rem' }}>❌ Not Required in Texas</div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.9 }}>
              <li>Natural death on property</li>
              <li>Suicide (unless buyer asks)</li>
              <li>Nearby sex offenders</li>
              <li>School rezoning plans</li>
              <li>Future development nearby</li>
              <li>Neighbors' issues</li>
              <li>Property's full insurance claim history</li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>🎯 Select a Disclosure Item</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: info ? '1.5rem' : 0 }}>
            {items.map(({ key, label }) => (
              <button key={key} onClick={() => setSelected(selected === key ? null : key)}
                style={{ padding: '0.6rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === key ? '#F5E642' : '#E5E7EB', backgroundColor: selected === key ? '#F5E642' : '#fff', color: '#0A1628', fontWeight: selected === key ? 700 : 400, cursor: 'pointer', fontSize: '0.88rem' }}>
                {label}
              </button>
            ))}
          </div>
          {info && (
            <div>
              <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 6, marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 700, backgroundColor: sevColors[info.severity], color: sevText[info.severity] }}>
                {sevLabel[info.severity]}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#1D4ED8', marginBottom: '0.4rem' }}>🔍 How to Verify</div>
                  <div style={{ fontSize: '0.92rem' }}>{info.verification}</div>
                </div>
                <div style={{ backgroundColor: '#F9FAFB', borderRadius: 8, padding: '1rem', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>💡 What It Means</div>
                  <div style={{ fontSize: '0.92rem' }}>{info.meaning}</div>
                </div>
                <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#166534', marginBottom: '0.4rem' }}>🤝 How to Handle in Negotiation</div>
                  <div style={{ fontSize: '0.92rem' }}>{info.negotiation}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#FEF9C3', borderRadius: 12, padding: '1.5rem', border: '1px solid #FDE047' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>⚡ Critical: Disclosure ≠ Full Protection</div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.8 }}>
            <li>Sellers must disclose what they <strong>know</strong> — they can legitimately not know about hidden defects</li>
            <li>Your inspection period is your protection — hire specialists, not just a general inspector</li>
            <li>Get the CLUE report (insurance claims history) — reveals issues sellers may have "forgotten"</li>
            <li>In DFW: always ask specifically about hail damage, roof insurance claims, and foundation engineer reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
