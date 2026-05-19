import { useState } from 'react';

export default function DFWLandlordFirstPropertyGuide() {
  const [propType, setPropType] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<null | { checklist: string[]; costs: string[]; risks: string[] }>(null);

  function calculate() {
    const isSfh = propType === 'sfh';
    const isCondo = propType === 'condo';
    const isInner = location === 'inner';

    const checklist: string[] = [];
    const costs: string[] = [];
    const risks: string[] = [];

    checklist.push('✅ Order a pre-tenancy home inspection ($300–$500) — know your baseline before complaints start');
    checklist.push('✅ Change all locks — you have no idea who has copies from previous owners');
    checklist.push('✅ Test all smoke and CO detectors — Texas landlord liability if missing');
    checklist.push('✅ Service HVAC and document it — AC failure is the #1 Texas landlord maintenance call');
    checklist.push('✅ Texas required disclosure: lead paint if built before 1978');
    checklist.push('✅ Security deposit: Texas max is unlimited but must be returned within 30 days of move-out');
    if (isSfh) {
      checklist.push('✅ Pest control inspection — Texas law is vague; get baseline before tenant moves in');
      checklist.push('✅ Foundation photo documentation — DFW clay soil moves; have baseline evidence');
    }
    if (isCondo) {
      checklist.push('✅ Review HOA rules for rentals — some have rental caps or approval requirements');
      checklist.push('✅ Clarify HOA vs landlord maintenance split before lease is signed');
    }

    costs.push('Property tax: DFW averages 2.1–2.5% of assessed value annually');
    costs.push('Insurance (landlord policy): $150–$300/mo for SFH in DFW');
    costs.push('HVAC maintenance: $150–$300/year for tune-ups');
    costs.push('Vacancy buffer: budget 1 month vacancy per year (8% loss)');
    costs.push('Repairs reserve: 1% of home value per year is industry standard');
    if (!isInner) {
      costs.push('Property manager (if not self-managing): 8–10% of monthly rent in DFW suburbs');
    } else {
      costs.push('Property manager: 8–12% in Dallas proper; higher for shorter-term or premium rentals');
    }

    risks.push('🔴 Tenant non-payment — Texas eviction is 30–45 days if handled correctly; longer if contested');
    risks.push('🔴 HVAC failure in July — your legal obligation is habitable temp; budget emergency repair fund');
    risks.push('🟡 Lease violation disputes — use Texas Association of Realtors lease form, not DIY');
    risks.push('🟡 Security deposit disputes — document move-in condition with timestamped photos and video');
    risks.push('🟡 Maintenance delay claims — respond in writing within 7 days per Texas Property Code');

    setResult({ checklist, costs, risks });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f0', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>DFW HOME GUIDE — FIRST-TIME LANDLORD</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          🔑 First Rental Property in DFW
        </h1>
        <p style={{ fontSize: 16, color: '#444', marginBottom: 32, lineHeight: 1.6 }}>
          Texas is a landlord-friendly state — but that doesn't mean it's simple. Here's exactly what to do before your first tenant moves in, what it actually costs, and what could go wrong.
        </p>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #e0ddd5' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📜 Texas Landlord Basics</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, color: '#333', fontSize: 14 }}>
            <li><strong>No rent control</strong> in Texas — you set market rate</li>
            <li><strong>Security deposit:</strong> No state maximum, must return within 30 days with itemized deductions</li>
            <li><strong>Habitability:</strong> Must maintain working AC, heat, plumbing, and weatherproofing</li>
            <li><strong>Entry:</strong> Give reasonable notice (24 hours is standard, not legally required)</li>
            <li><strong>Eviction:</strong> Must follow Texas Property Code — self-help eviction is illegal and costly</li>
          </ul>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #e0ddd5' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🏠 Your Property</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Property type</label>
            {[{ v: 'sfh', l: '🏡 Single-family home' }, { v: 'condo', l: '🏢 Condo or townhome' }, { v: 'duplex', l: '🏘️ Duplex or small multi-family' }].map(opt => (
              <label key={opt.v} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                <input type="radio" name="propType" value={opt.v} checked={propType === opt.v} onChange={() => setPropType(opt.v)} />
                {opt.l}
              </label>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Location</label>
            {[{ v: 'inner', l: '🏙️ Dallas / Fort Worth proper' }, { v: 'suburb', l: '🌳 DFW suburb (Plano, Frisco, McKinney, etc.)' }].map(opt => (
              <label key={opt.v} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                <input type="radio" name="location" value={opt.v} checked={location === opt.v} onChange={() => setLocation(opt.v)} />
                {opt.l}
              </label>
            ))}
          </div>
          <button onClick={calculate} disabled={!propType || !location}
            style={{ background: '#1a1a2e', color: '#F5E642', padding: '12px 28px', borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Build My Landlord Checklist →
          </button>
        </div>

        {result && (
          <div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid #e0ddd5' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>✅ Before Your First Tenant</h3>
              {result.checklist.map((c, i) => <div key={i} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.6 }}>{c}</div>)}
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid #e0ddd5' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>💰 Estimated Monthly Operating Costs</h3>
              {result.costs.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#1a1a2e' }}>•</span>
                  <span style={{ fontSize: 14, lineHeight: 1.6 }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#1a1a2e', borderRadius: 12, padding: 24, color: '#fff' }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>⚠️ What Could Go Wrong</h3>
              {result.risks.map((r, i) => <div key={i} style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>{r}</div>)}
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e0ddd5' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🛠️ ProLnk for Landlords</h2>
          <p style={{ color: '#555', lineHeight: 1.7, fontSize: 14 }}>Tenant calls at 9pm about AC. Plumbing backup on a Saturday. ProLnk gives DFW landlords access to vetted, licensed contractors with verified pricing — so you're not panicking on Yelp when things break.</p>
        </div>
      </div>
    </div>
  );
}
