import { useState } from 'react';

type PhaseDetail = {
  checklist: string[];
  negotiate: string[];
  redFlags: string[];
};

const phases: Record<string, PhaseDetail> = {
  preConstruction: {
    checklist: [
      'Research builder\’s BBB rating, Yelp, Google reviews — look for patterns not outliers',
      'Check Texas Residential Construction Commission (TRCC) history — builder complaints are public',
      'Pull builder\’s certificate of insurance and bond status',
      'Review the purchase contract with a real estate attorney before signing',
      'Understand MUD district boundaries and extra tax rates (can add $2,000-6,000/yr)',
      'Request builder\’s warranty documentation before you sign anything',
      'Ask for a list of completed communities — visit and knock on doors',
    ],
    negotiate: [
      'Lot premium — builders often negotiate this more than base price',
      'Upgrades included: appliance packages, flooring tier, hardware finishes',
      'Closing cost assistance (builders often offer $10,000-20,000 toward closing)',
      'Rate buy-down through builder\’s preferred lender (can be significant)',
      'Fence, landscaping, blinds — often excluded and expensive to add after',
    ],
    redFlags: [
      'Builder won\’t let you use your own real estate agent',
      'Contract has no option period or inspection rights',
      'Builder pressures immediate signature with same-day expiration',
      'No public complaint history findable — too good to be true',
      'Builder\’s preferred lender gives no GFE comparison',
    ],
  },
  underConstruction: {
    checklist: [
      'Hire an independent inspector for frame inspection (before drywall) — this is critical',
      'Visit the site during business hours every 1-2 weeks',
      'Document change orders in writing — never verbal only',
      'Photograph every stage before it\’s covered (foundation, framing, rough-in)',
      'Verify your lot corners are staked and match your plat',
      'Request certificate of occupancy inspection schedule from builder',
      'Confirm all subcontractors are licensed with TDLR where required',
    ],
    negotiate: [
      'Change orders: builders have markup on upgrades — negotiate at signing, not mid-build',
      'Construction delays: ask for a per-day closing cost credit if builder delays beyond 30 days',
      'Material substitutions: get any change in materials documented and approved by you',
      'Landscaping and grading completion before close — don\’t close on a dirt yard',
    ],
    redFlags: [
      'Builder won\’t allow independent inspection access',
      'Multiple subcontractor crews rotating — quality control issue',
      'Neighbors report builder won\’t respond to warranty claims post-close',
      'Visible framing or foundation issues they dismiss without engineering review',
      'Builder pushing to close before CO is issued',
    ],
  },
  preClose: {
    checklist: [
      'Final walkthrough: create a punch list — every item must be in writing',
      'Verify all permitted work has passed final inspection',
      'Test every appliance, fixture, outlet, door, and window',
      'Confirm warranty documentation is in hand before closing day',
      'Review the survey to confirm structure is within setbacks',
      'Verify MUD tax rate with the MUD district directly — not just the builder\’s estimate',
      'Confirm HOA transfer documents and any builder-controlled HOA transition timeline',
    ],
    negotiate: [
      'Punch list items: builder should complete before close, not after — get it in writing',
      'Rate lock: if builder\’s preferred lender, confirm your rate lock date and expiration',
      'Closing date flexibility: negotiate per-day credits if close is delayed by builder',
      'Landscaping completion: confirm scope of what\’s included before signing final documents',
    ],
    redFlags: [
      'Builder refuses to complete punch list before closing',
      'Certificate of occupancy not issued at time of closing',
      'Builder wants you to sign off on completion before walkthrough',
      'Warranty terms changed from what was promised at signing',
      'Builder\’s title company has undisclosed relationship — use your own title attorney',
    ],
  },
};

const phaseOptions = [
  { key: 'preConstruction', label: '📝 Pre-Construction' },
  { key: 'underConstruction', label: '🏗️ Under Construction' },
  { key: 'preClose', label: '🔑 Pre-Close' },
];

export default function DFWNewConstructionDueDiligence() {
  const [selected, setSelected] = useState<string | null>(null);
  const info = selected ? phases[selected] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏗️ DFW New Construction Due Diligence</div>
          <p style={{ fontSize: '1.05rem', color: '#374151' }}>
            New construction in DFW is different from resale. Builders use their own contracts, push their own lenders, and control the process. This guide puts you back in control — from vetting the builder to closing day.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.75rem' }}>🏠 DFW Builder Landscape</div>
          <p style={{ fontSize: '0.92rem', color: '#374151', marginBottom: '1rem' }}>DFW has national builders (D.R. Horton, Lennar, Pulte, KB Home, Meritage) and strong regional players (Coventry, Grand Homes, Normandy). Each has different quality tiers and reputation patterns.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {[
              ['💰 Entry-Level', 'D.R. Horton, LGI', 'Speed over finish quality'],
              ['🏡 Mid-Market', 'Lennar, KB Home, Pulte', 'Balance of features and value'],
              ['✨ Premium', 'Coventry, Normandy, Grand', 'Higher customization, slower builds'],
            ].map(([tier, builders, note], i) => (
              <div key={i} style={{ backgroundColor: '#F9FAFB', borderRadius: 8, padding: '0.75rem', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>{tier}</div>
                <div style={{ fontSize: '0.82rem', color: '#374151', marginBottom: '0.25rem' }}>{builders}</div>
                <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#FEF2F2', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #FECACA' }}>
          <div style={{ fontWeight: 700, color: '#991B1B', marginBottom: '0.5rem' }}>⚠️ MUD District Alert</div>
          <p style={{ fontSize: '0.92rem', margin: 0 }}>
            Most new DFW communities are in Municipal Utility Districts. MUD taxes fund infrastructure (water, sewer, roads) and can add <strong>$2,000–$6,000/year</strong> to your tax bill on top of county/city taxes. Always ask for the MUD tax rate and get it from the district directly — builder estimates are often low.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>🎯 Select Construction Phase</div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: info ? '1.5rem' : 0 }}>
            {phaseOptions.map(({ key, label }) => (
              <button key={key} onClick={() => setSelected(selected === key ? null : key)}
                style={{ padding: '0.7rem 1.2rem', borderRadius: 8, border: '2px solid', borderColor: selected === key ? '#F5E642' : '#E5E7EB', backgroundColor: selected === key ? '#F5E642' : '#fff', color: '#0A1628', fontWeight: selected === key ? 700 : 400, cursor: 'pointer', fontSize: '0.9rem', flex: 1 }}>
                {label}
              </button>
            ))}
          </div>
          {info && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#1D4ED8', marginBottom: '0.75rem' }}>✅ Due Diligence Checklist</div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.9 }}>
                  {info.checklist.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#166534', marginBottom: '0.75rem' }}>🤝 What to Negotiate</div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.9 }}>
                  {info.negotiate.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div style={{ backgroundColor: '#FEF2F2', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#991B1B', marginBottom: '0.75rem' }}>🚩 Red Flags</div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.9 }}>
                  {info.redFlags.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#FEF9C3', borderRadius: 12, padding: '1.5rem', border: '1px solid #FDE047' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>⚡ Non-Negotiable Rules for DFW New Construction</div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.8 }}>
            <li>Always hire your own independent inspector for frame stage — after drywall, defects are hidden forever</li>
            <li>Always use your own real estate agent — builder sales agents represent the builder, not you</li>
            <li>Always get the 1-year builder warranty AND 10-year structural warranty in writing before signing</li>
            <li>Always verify the MUD tax rate with the district before making your offer — it changes annually</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
