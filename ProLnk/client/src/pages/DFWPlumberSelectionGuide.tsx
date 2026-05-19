import { useState } from 'react';

const projectTypes = [
  {
    label: 'Emergency Leak / Burst Pipe',
    criteria: ['TSBPE license required', 'Available 24/7 with clear after-hours rate', 'Response time commitment in writing'],
    licenseCheck: 'Verify at tsbpe.texas.gov — enter name or company',
    scope: ['Exact pipe location and access method', 'Water shutoff and restoration included', 'Drywall or tile repair responsibility defined'],
    notes: 'Emergency rates in DFW typically run 1.5–2x standard. Get the total estimate in writing before work begins even in urgency.',
  },
  {
    label: 'Water Heater Replacement',
    criteria: ['TSBPE license required', 'Permit required in most DFW cities', 'Ask about tankless vs tank suitability for DFW water hardness'],
    licenseCheck: 'Verify at tsbpe.texas.gov — confirm Master Plumber license for gas work',
    scope: ['Brand and model specified by name', 'Old unit disposal included', 'Permit and inspection cost included', 'Warranty on parts and labor separately listed'],
    notes: 'DFW water is moderately hard. Tankless units require a water softener to avoid scale damage — ask if they account for this.',
  },
  {
    label: 'Sewer / Drain Issue',
    criteria: ['TSBPE license required', 'Camera inspection before recommending dig', 'Get scope findings in writing'],
    licenseCheck: 'Verify at tsbpe.texas.gov — some sewer companies use unlicensed crews',
    scope: ['Footage inspected with camera report', 'Repair method (liner vs dig vs spot repair) explained', 'Warranty on sewer line work'],
    notes: 'DFW clay soil expands and contracts with moisture — sewer line issues are extremely common. Never approve a dig without a camera report.',
  },
  {
    label: 'Remodel / New Construction Plumbing',
    criteria: ['TSBPE Master Plumber license required', 'Permit required — contractor must pull it', 'Rough-in inspection before wall close required'],
    licenseCheck: 'Verify at tsbpe.texas.gov — must be Master Plumber for new installation',
    scope: ['Fixture list with brands and models', 'Rough-in dimensions committed before framing', 'Inspection schedule and who attends'],
    notes: 'Never allow walls or slabs to be closed before plumbing passes rough-in inspection. Fix costs escalate dramatically after closure.',
  },
];

export default function DFWPlumberSelectionGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>DFW Plumber Selection Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            How to hire the right plumber in Dallas-Fort Worth — license verification, rates, and what to get in writing.
          </p>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🔎 License & Verification</h2>
          <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
            All plumbers in Texas must be licensed by the <strong style={{ color: '#e2e8f0' }}>Texas State Board of Plumbing Examiners (TSBPE)</strong>. Verify at tsbpe.texas.gov before any work begins. Look for a Master Plumber license for any gas or new-installation work — Journeyman license is for repairs under supervision only.
          </div>
          <div style={{ backgroundColor: '#0f1e3a', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>Local vs National Franchise Tradeoffs</div>
            {[
              ['Local Plumber', 'Lower overhead, owner on-site, relationship-based. Verify license carefully — smaller operations sometimes cut corners.'],
              ['National Franchise', 'Consistent pricing, branded trucks, 24/7 availability. Markup is often higher and upsell pressure common.'],
            ].map(([name, desc]) => (
              <div key={name} style={{ marginBottom: 10 }}>
                <span style={{ color: '#60a5fa', fontWeight: 600 }}>{name}: </span>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>💰 Emergency vs Non-Emergency Rates</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>
            DFW plumbers typically charge $85–$150/hr standard and $150–$250/hr after-hours or emergency. Always ask for the emergency rate before committing. If a company refuses to quote rates over the phone, that is itself a warning sign. Get a written estimate before any work starts — even in emergencies, most reputable plumbers will spend 10 minutes writing a scope.
          </p>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🛠️ Project Type → Criteria, License Check & Scope</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {projectTypes.map((p, i) => (
              <button key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  borderColor: selected === i ? '#F5E642' : '#2d3f6b',
                  backgroundColor: selected === i ? '#F5E642' : 'transparent',
                  color: selected === i ? '#0A1628' : '#94a3b8' }}>
                {p.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0f1e3a', borderRadius: 10, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14 }}>{projectTypes[selected].label}</h3>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 6 }}>Contractor Criteria</div>
                {projectTypes[selected].criteria.map((c, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 4 }}>• {c}</div>)}
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 6 }}>License Check Method</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{projectTypes[selected].licenseCheck}</div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 6 }}>What to Include in Written Scope</div>
                {projectTypes[selected].scope.map((s, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 4 }}>• {s}</div>)}
              </div>
              <div style={{ backgroundColor: '#1a2744', borderRadius: 8, padding: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 600 }}>DFW Note: </span>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{projectTypes[selected].notes}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
