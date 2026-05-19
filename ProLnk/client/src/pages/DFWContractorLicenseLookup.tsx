import { useState } from 'react';

const tradeData: Record<string, { authority: string; website: string; lookupSteps: string; redFlags: string; cityNote: string }> = {
  hvac: {
    authority: 'TDLR — Texas Department of Licensing and Regulation',
    website: 'license.tdlr.texas.gov',
    lookupSteps: 'Go to site → License Lookup → Select "Air Conditioning and Refrigeration Contractor" → Enter license number or company name → Confirm Active status and expiration date',
    redFlags: 'License shows "Expired," "Revoked," or "Inactive." Company name on license differs from invoice. No EPA 608 certification for refrigerant work.',
    cityNote: 'TDLR license is state-wide. No city-specific HVAC license needed in DFW — state license covers all municipalities.',
  },
  electrical: {
    authority: 'TDLR — Electrical Division',
    website: 'license.tdlr.texas.gov',
    lookupSteps: 'TDLR License Lookup → "Electrician" → Search by name or license # → Verify "Master Electrician" status for contractors pulling permits. Journeyman electricians work under master only.',
    redFlags: 'Journeyman license presented as contractor license. License in individual name, not matched to company. Expired date within last 12 months (common lapse).',
    cityNote: 'Dallas and Fort Worth also require a city electrical permit registration separate from the state license. Ask for both.',
  },
  plumbing: {
    authority: 'TSBPE — Texas State Board of Plumbing Examiners',
    website: 'www.tsbpe.texas.gov/online-services/license-search',
    lookupSteps: 'TSBPE License Search → Enter company or license number → Verify "Master Plumber" or "Journeyman Plumber" status → Check complaint history on same page.',
    redFlags: 'No TSBPE license at all (common with unlicensed handymen). Residential Utilities Installer license offered for full plumbing work (not sufficient). Complaint history showing repeated violations.',
    cityNote: 'Plumbing is state-licensed only in Texas. However, Dallas, Fort Worth, and Denton require plumbers to register with the city in addition to state license.',
  },
  general: {
    authority: 'City Building Department (no state GC license in Texas)',
    website: 'Check your specific city\’s development/permits portal',
    lookupSteps: 'Texas has NO state general contractor license. Verify through city: (1) Ask for city contractor registration number, (2) Check city\’s registered contractor list, (3) Confirm liability insurance + workers\’ comp certificates directly.',
    redFlags: 'Cannot provide proof of liability insurance ($1M minimum). No city registration for the city where work is happening. Only offering verbal guarantee of license.',
    cityNote: 'License does NOT transfer between DFW cities. A contractor registered in Plano must separately register in Frisco, Allen, McKinney, etc. Always verify in your specific city.',
  },
  roofing: {
    authority: 'No state license required — City registration + insurance only',
    website: 'Contact city building department for registered roofer list',
    lookupSteps: '(1) Ask for proof of city registration in your municipality, (2) Verify $1M liability insurance certificate with your city named as additional insured, (3) Check BBB rating and storm chaser complaint history.',
    redFlags: 'Storm chasers offering "free roof" via insurance — high fraud rate in DFW. No local address (out-of-state post-storm crews). Pressure to sign Assignment of Benefits on the spot.',
    cityNote: 'Roofing is among least-regulated trades in Texas. Homeowners carry most of the risk — vet heavily via references and BBB.',
  },
};

export default function DFWContractorLicenseLookup() {
  const [trade, setTrade] = useState('');
  const info = tradeData[trade];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>🏠 PROLNK DFW RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Contractor License Lookup Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>Where to verify every trade license in DFW — and what fake licenses look like.</p>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Select Trade Type</label>
          <select value={trade} onChange={e => setTrade(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#162033', color: '#E2E8F0', border: '1px solid #2D3E55', fontSize: 14 }}>
            <option value=''>Choose a trade...</option>
            <option value='hvac'>HVAC / Air Conditioning</option>
            <option value='electrical'>Electrical</option>
            <option value='plumbing'>Plumbing</option>
            <option value='general'>General Contractor / Remodeler</option>
            <option value='roofing'>Roofing</option>
          </select>
        </div>

        {info && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 24, border: '1px solid #2D3E55' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🏛️ Licensing Authority</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{info.authority}</div>
              <div style={{ color: '#60A5FA', fontSize: 14 }}>🌐 {info.website}</div>
            </div>

            <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 24, border: '1px solid #2D3E55' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🔍 How to Verify — Step by Step</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{info.lookupSteps}</div>
            </div>

            <div style={{ backgroundColor: '#1a0a0a', borderRadius: 12, padding: 24, border: '1px solid #7f1d1d' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FCA5A5', marginBottom: 12 }}>🚨 Red Flags — Fake or Invalid Licenses</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.8 }}>{info.redFlags}</div>
            </div>

            <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 20, border: '1px solid #2D3E55' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🗺️ DFW-Specific Note</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>{info.cityNote}</div>
            </div>
          </div>
        )}

        {!info && (
          <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 24, border: '1px solid #2D3E55', color: '#94A3B8', fontSize: 15, lineHeight: 1.8 }}>
            <div style={{ fontWeight: 700, color: '#E2E8F0', marginBottom: 12 }}>📌 Key DFW Licensing Facts</div>
            <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 2 }}>
              <li>Texas has <strong style={{ color: '#F5E642' }}>no state general contractor license</strong> — verify city registrations</li>
              <li>HVAC and Electrical licensed through <strong style={{ color: '#F5E642' }}>TDLR</strong> statewide</li>
              <li>Plumbing licensed through <strong style={{ color: '#F5E642' }}>TSBPE</strong> statewide</li>
              <li>City registrations <strong style={{ color: '#F5E642' }}>do not transfer</strong> between DFW municipalities</li>
              <li>Always verify insurance certificates independently — don't trust copies alone</li>
            </ul>
          </div>
        )}

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 12 }}>ProLnk pre-verifies every contractor's license before matching.</div>
          <a href='https://prolnk.io' style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Matched with Licensed Pros →</a>
        </div>
      </div>
    </div>
  );
}
