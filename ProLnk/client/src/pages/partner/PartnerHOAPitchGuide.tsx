import { useState } from 'react';

const HOA_SIZES = ['Small (< 50 homes)', 'Mid (50–200 homes)', 'Large (200+ homes)'];
const COMMUNITY_TYPES = ['Single-Family', 'Townhome', 'Condo / High-Rise'];

const pitchData: Record<string, Record<string, { approach: string; points: string[]; objections: string[] }>> = {
  'Small (< 50 homes)': {
    'Single-Family': {
      approach: 'Peer-to-peer trust pitch — small boards know every homeowner personally. Frame ProLnk as the neighborhood advantage.',
      points: ['Vetted pros reduce fly-by-night contractor risk for neighbors', 'Home values stay consistent when maintenance is reliable', 'One contact for every trade — board members stop fielding contractor questions'],
      objections: ['We already have preferred vendors → ProLnk expands the bench, no exclusivity required', 'We don’t want to endorse anyone → It’s a resource, not an endorsement'],
    },
    'Townhome': {
      approach: 'Shared-wall sensitivity pitch — townhome boards face liability when one owner’s neglect damages neighbors.',
      points: ['Preventive maintenance culture reduces shared-wall incidents', 'Documented repair history helps in disputes', 'Residents get quotes fast — fewer deferred repairs'],
      objections: ['CC&Rs restrict contractor access → ProLnk coordinates with HOA approval workflows', 'Board bandwidth is limited → We handle all resident coordination'],
    },
    'Condo / High-Rise': {
      approach: 'Interior unit pitch — condo HOAs care about in-unit work that impacts common areas.',
      points: ['Insured pros only — protects association from liability', 'Scheduling coordination reduces elevator / lobby disruption', 'Maintenance logs support reserve study documentation'],
      objections: ['We have a property manager → ProLnk complements, doesn’t replace', 'Unit owners handle their own repairs → We make it easy for them to do it right'],
    },
  },
  'Mid (50–200 homes)': {
    'Single-Family': {
      approach: 'Property value protection pitch — mid-size boards are sensitive to comps and curb appeal.',
      points: ['Consistent maintenance raises comp averages across the subdivision', 'Partner discount passes savings to every homeowner', 'Board can share ProLnk link in newsletter — zero overhead'],
      objections: ['Homeowners are independent → This is opt-in, not mandated', 'We tried referral programs before → ProLnk tracks and delivers; no manual coordination'],
    },
    'Townhome': {
      approach: 'Operational efficiency pitch — mid-size townhome boards manage more shared systems.',
      points: ['One platform for roofing, HVAC, plumbing across all units', 'Bulk scheduling potential for exterior maintenance windows', 'Reduces board liability via documented, insured work'],
      objections: ['Too complicated for residents → Simple link, they request quotes like Amazon', 'Who pays for it? → Free for homeowners; pros pay platform fees'],
    },
    'Condo / High-Rise': {
      approach: 'Reserve study alignment pitch — mid-size condo boards are usually in active reserve planning.',
      points: ['Maintenance history data supports reserve study accuracy', 'Preferred pro relationships reduce emergency markup costs', 'Resident satisfaction metric improves board re-election outcomes'],
      objections: ['We use a management company → Integrate with them, not around them', 'Legal review required → Happy to provide insurance certs and T&C'],
    },
  },
  'Large (200+ homes)': {
    'Single-Family': {
      approach: 'Scale and data pitch — large boards think in aggregate. Give them community-level metrics.',
      points: ['Aggregate maintenance data flags infrastructure trends early', 'Volume of homes = better pro pricing for all residents', 'Board gets quarterly report: trade categories, activity, satisfaction'],
      objections: ['We have a professional management company → ProLnk is a resident-facing tool they’d want', 'Risk of recommending a platform → No-liability referral, purely informational'],
    },
    'Townhome': {
      approach: 'Portfolio management pitch — large townhome communities are closer to commercial real estate.',
      points: ['Systemized maintenance reduces deferred capital expenditure', 'Pro accountability via reviews protects association reputation', 'Consistent exterior work keeps master insurance premiums stable'],
      objections: ['We do RFPs for contractors → ProLnk pros can participate in RFP process', 'Board approval required for all spending → Resident-initiated, no board approval needed for individual units'],
    },
    'Condo / High-Rise': {
      approach: 'Institutional pitch — large condo boards operate like small businesses. Speak ROI.',
      points: ['Documented maintenance history supports asset valuation', 'Reduce uninsured contractor incidents that become association liability', 'Resident engagement tool — differentiator for HOA marketing'],
      objections: ['Our attorney would need to review → Standard referral program, no formal agreement required', 'We’re already overwhelmed → This requires zero board time after one announcement'],
    },
  },
};

export default function PartnerHOAPitchGuide() {
  const [size, setSize] = useState(HOA_SIZES[0]);
  const [type, setType] = useState(COMMUNITY_TYPES[0]);

  const data = pitchData[size]?.[type];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏘️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>HOA Pitch Guide</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>How to approach HOA boards and get ProLnk endorsed as the community's home services resource.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🎯 Configure Your Pitch</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#64748B', marginBottom: 6 }}>HOA Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#0A1628' }}>
                {HOA_SIZES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#64748B', marginBottom: 6 }}>Community Type</label>
              <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#0A1628' }}>
                {COMMUNITY_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {data && (
          <>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📋 Recommended Approach</h2>
              <p style={{ color: '#334155', lineHeight: 1.6, margin: 0 }}>{data.approach}</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>💬 Talking Points</h2>
              {data.points.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ background: '#F5E642', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#0A1628', flexShrink: 0 }}>{i + 1}</span>
                  <p style={{ color: '#334155', margin: 0, lineHeight: 1.5 }}>{p}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🛡️ Expected Objections & Responses</h2>
              {data.objections.map((o, i) => {
                const [obj, res] = o.split(' → ');
                return (
                  <div key={i} style={{ background: '#F8FAFC', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                    <p style={{ color: '#DC2626', fontWeight: 600, margin: '0 0 4px', fontSize: 14 }}>"{obj}"</p>
                    <p style={{ color: '#16A34A', margin: 0, fontSize: 14 }}>→ {res}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
