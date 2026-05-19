import { useState } from 'react';

const dfwSuburbs = ['Frisco', 'Plano', 'Allen', 'McKinney', 'Prosper', 'Celina', 'Southlake', 'Keller', 'Colleyville', 'Flower Mound', 'Coppell', 'Grapevine', 'Arlington', 'Mansfield', 'Rockwall', 'Other DFW suburb'];
const hoaStatuses = ['No HOA', 'HOA with mailbox style requirements', 'HOA requires matching neighborhood mailbox'];
const mailboxTypes = ['Standard post-mount (curbside)', 'Locking / anti-theft mailbox', 'Wall-mount (attached to house)', 'Column / brick mailbox', 'Cluster / neighborhood shared'];

type MailboxRec = { type: string; uspsNote: string; cost: string; material: string; heatNote: string };

const recommendations: Record<string, MailboxRec> = {
  'No HOA-Standard post-mount (curbside)': { type: 'Steel or Aluminum Post-Mount', uspsNote: 'USPS requires 41–45″ height to bottom of box, 6–8″ back from curb face, minimum 3″×5″ opening.', cost: '$80–$400 installed', material: 'Powder-coated steel or aluminum — avoid plastic in DFW (UV degrades in 2–3 seasons)', heatNote: 'Black mailboxes in DFW direct sun can reach 150°F+ — affects mail and locking mechanisms.' },
  'No HOA-Locking / anti-theft mailbox': { type: 'Heavy-Gauge Locking Mailbox', uspsNote: 'USPS Package Mail requires parcel slot. Confirm carrier approval — some locking designs require separate carrier access.', cost: '$150–$600 installed', material: 'Cast aluminum or heavy steel — Mail Boss and Architectural Mailboxes are DFW-popular brands', heatNote: 'Ensure locking mechanism is rated for 130°F+ — cheap locks seize in DFW summers.' },
  'HOA with mailbox style requirements-Standard post-mount (curbside)': { type: 'HOA-Approved Style (Verify Exact Model)', uspsNote: 'USPS compliance required regardless of HOA style — confirm both.', cost: '$120–$500 installed', material: 'Match HOA spec exactly — color, post height, and number plate style are often specified', heatNote: 'HOAs in DFW typically specify powder-coated finishes that handle heat well.' },
  'HOA requires matching neighborhood mailbox-Standard post-mount (curbside)': { type: 'Matched Neighborhood Unit — Buy from HOA Source', uspsNote: 'USPS compliance is the HOA supplier\’s responsibility — confirm before purchase.', cost: '$200–$800 through HOA', material: 'Order through HOA preferred vendor — mismatched units get violation notices within days in active DFW HOAs', heatNote: 'Standard HOA units are typically rated for DFW conditions.' },
};

const uspsRequirements = [
  { rule: 'Height', spec: '41″–45″ from road surface to bottom of mailbox' },
  { rule: 'Distance from curb', spec: '6″–8″ back from curb face (or as directed by postmaster)' },
  { rule: 'Opening size', spec: 'Minimum 3″×5″ opening for standard mail' },
  { rule: 'Address numbers', spec: 'Required on mailbox — minimum 1″ high, contrasting color' },
  { rule: 'Secure post', spec: 'Post must be able to withstand mail carrier pulling on door' },
];

export default function DFWMailboxReplaceGuide() {
  const [suburb, setSuburb] = useState('');
  const [hoaStatus, setHoaStatus] = useState('');
  const [mailboxType, setMailboxType] = useState('');
  const [result, setResult] = useState<null | MailboxRec>(null);

  function calculate() {
    if (!suburb || !hoaStatus || !mailboxType) return;
    const key = `${hoaStatus}-${mailboxType}`;
    const rec = recommendations[key] || recommendations['No HOA-Standard post-mount (curbside)'];
    setResult(rec);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642′ }}>📬 DFW Exterior Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>Mailbox Replacement Guide — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: '1.6′ }}>Package theft in DFW suburbs is up 40% since 2022. A proper mailbox choice involves USPS specs, HOA rules, and DFW heat tolerance — all at once.</p>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>📏 USPS Compliance Requirements</h2>
          <p style={{ color: '#CBD5E1', marginBottom: '14px', fontSize: '14px' }}>Non-compliant mailboxes can result in USPS refusing delivery. Always verify with your local DFW postmaster before installing a non-standard unit.</p>
          <div style={{ display: 'grid', gap: '8px' }}>
            {uspsRequirements.map(r => (
              <div key={r.rule} style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px' }}>
                <div style={{ color: '#F5E642', fontWeight: '700', width: '140px', flexShrink: 0, fontSize: '14px' }}>{r.rule}</div>
                <div style={{ color: '#CBD5E1', fontSize: '14px' }}>{r.spec}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>🔒 Package Theft Reality in DFW Suburbs</h2>
          <p style={{ color: '#CBD5E1', lineHeight: '1.7', marginBottom: '12px' }}>Frisco, Plano, McKinney, and Allen rank among Texas's highest-growth suburban areas — and package theft has grown with population density. Ring camera footage shows most porch piracy happens 11am–2pm on weekdays. A locking parcel mailbox ($200–$500) eliminates the risk for most standard-size packages.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ backgroundColor: '#7F1D1D', borderRadius: '8px', padding: '14px' }}>
              <div style={{ color: '#FCA5A5', fontWeight: '600', marginBottom: '4px' }}>⚠️ HOA Locking Mailbox Trap</div>
              <p style={{ color: '#FCA5A5', fontSize: '13px', margin: 0 }}>Many DFW HOAs prohibit aftermarket locking mailboxes. Check before buying — violations can be $50–$200/day.</p>
            </div>
            <div style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '14px' }}>
              <div style={{ color: '#22C55E', fontWeight: '600', marginBottom: '4px' }}>✅ Smart Alternative</div>
              <p style={{ color: '#CBD5E1', fontSize: '13px', margin: 0 }}>Amazon Hub Locker or UPS Access Point in local CVS/Staples — free, no HOA issues, package secure.</p>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🔮 Get Your Mailbox Recommendation</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <select value={suburb} onChange={e => setSuburb(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select your DFW suburb...</option>
              {dfwSuburbs.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={hoaStatus} onChange={e => setHoaStatus(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select HOA status...</option>
              {hoaStatuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={mailboxType} onChange={e => setMailboxType(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select mailbox type...</option>
              {mailboxTypes.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: '700', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '16px', cursor: 'pointer' }}>Get My Mailbox Recommendation →</button>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>✅ Recommendation: {result.type}</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { label: 'Estimated Cost', value: result.cost, color: '#F5E642′ },
                { label: 'Best Material for DFW', value: result.material, color: '#CBD5E1′ },
                { label: 'USPS Compliance Note', value: result.uspsNote, color: '#CBD5E1′ },
                { label: '🌡️ DFW Heat Note', value: result.heatNote, color: '#FCD34D' },
              ].map(item => (
                <div key={item.label} style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ color: item.color, fontSize: '14px' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
