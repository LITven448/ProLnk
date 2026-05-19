import { useState } from 'react';

const areas = [
  {
    id: 'frisco-isd',
    label: 'Frisco ISD area',
    steps: ['Visit friscoisd.org → "Attendance Zones" tool — enter address', 'Call Frisco ISD enrollment office: (469) 633-6000 to confirm', 'Boundary changes: Frisco ISD has rezoned multiple times as new campuses open'],
    risk: 'HIGH — Frisco ISD is one of the fastest-growing districts in Texas. New schools open every 1–2 years, triggering boundary redraws that can reassign homes mid-ownership.',
    private: ['Covenant Christian Academy (Frisco)', 'Wakeland Christian School', 'Frisco Christian School — from $6,500/yr'],
  },
  {
    id: 'plano-isd',
    label: 'Plano ISD area',
    steps: ['Visit pisd.edu → "School Locator" tool', 'Cross-check with Collin CAD parcel data for exact address mapping', 'Confirm in writing with enrollment office before closing'],
    risk: 'MEDIUM — Plano ISD is more stable than growth-boom districts, but Wylie ISD and Plano ISD share contested geography near Murphy/Wylie borders.',
    private: ['Plano ISD Choice Programs (magnet — no boundary required)', 'Parish Episcopal', 'Coram Deo Academy — from $9,000/yr'],
  },
  {
    id: 'dallas-isd',
    label: 'Dallas ISD (City of Dallas)',
    steps: ['Visit dallasisd.org → "School Finder" with full address', 'Call enrollment: (972) 925-3740 — boundaries vary block by block in Dallas', 'For magnet/choice programs: verify separate enrollment deadlines (typically Jan–Feb)'],
    risk: 'HIGH — Dallas ISD boundaries are complex. Same street can have different elementary schools on opposite sides. Neighborhood rezoning projects have been ongoing since 2018.',
    private: ['Parish Episcopal', 'St. Marks School of Texas (boys)', 'Bishop Lynch', 'Greenhill School — from $22,000/yr'],
  },
  {
    id: 'keller-nrh',
    label: 'Keller ISD / North Richland Hills area',
    steps: ['Visit kellerisd.net → "School Boundaries" map', 'For NRH specifically: confirm Birdville ISD vs. Keller ISD boundary before closing', 'Properties near North Tarrant Pkwy have historically been reassigned'],
    risk: 'MEDIUM — Keller ISD has been more stable, but new development west of I-35W has created some boundary ambiguity with neighboring districts.',
    private: ['Trinity Christian Academy (Addison for HS)', 'Nolan Catholic (Fort Worth)', 'Fort Worth Christian School — from $8,500/yr'],
  },
];

export default function DFWSchoolBoundaryCheckGuide() {
  const [selected, setSelected] = useState('');
  const match = areas.find(a => a.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏫 📍 ✅</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW School Boundary Verification Guide</h1>
          <p style={{ margin: 0, color: '#555', fontSize: 15, lineHeight: 1.6 }}>
            In DFW's fast-growing school districts, <strong>never assume</strong> the school listed on Zillow or by your agent is correct. Boundaries change. The same street can have different schools on opposite sides. Verify before you close.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🚨', title: 'Why This Matters More in DFW Than Anywhere Else', body: 'DFW adds more residents than almost any metro in the US. New schools open constantly. Boundaries are redrawn to balance enrollment — sometimes with just 30 days\’ notice. Families have moved in expecting one school and had their kids rezoned before school started.' },
            { icon: '📋', title: 'The Only Reliable Verification Method', body: 'Step 1: Use the district\’s official online school locator with your EXACT address. Step 2: Call the enrollment office and confirm verbally. Step 3: Request written confirmation if possible. Zillow, Realtor.com, and Google are routinely wrong in DFW.' },
            { icon: '🗺️', title: 'What Happens When Boundaries Change After You Buy', body: 'Districts are under no legal obligation to keep your child in their original school if a boundary change occurs. Grandfathering (allowing current students to stay) exists but varies by district and is never guaranteed for future siblings or kindergarteners.' },
            { icon: '⏰', title: 'When to Verify During the Buying Process', body: 'Verify at initial search, verify again at offer stage, and verify a final time before closing — especially if your timeline extends past a school year calendar. Request your agent to get district confirmation in writing as part of due diligence.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon}</div>
              <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700 }}>{card.title}</h3>
              <p style={{ margin: 0, color: '#555', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700 }}>🔍 Your DFW Area → Verification Steps + Risk Level</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {areas.map(a => (
              <button key={a.id} onClick={() => setSelected(a.id)}
                style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === a.id ? '#2563eb' : '#e0e0e0'}`, background: selected === a.id ? '#eff6ff' : '#fafafa', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                {a.label}
              </button>
            ))}
          </div>
          {match && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>📋 Verification Steps</div>
                {match.steps.map((step, i) => <div key={i} style={{ fontSize: 14, padding: '8px 0', borderBottom: '1px solid #f0f0f0', color: '#333′ }}>{i + 1}. {step}</div>)}
              </div>
              <div style={{ background: match.risk.startsWith('HIGH') ? '#fef2f2′ : '#fffbeb', borderRadius: 8, padding: 14, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 4, color: match.risk.startsWith('HIGH') ? '#dc2626′ : '#d97706' }}>⚠️ Boundary Change Risk</div>
                <div style={{ fontSize: 13, color: '#555′ }}>{match.risk}</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>🏫 Backup Private School Options</div>
                {match.private.map((p, i) => <div key={i} style={{ fontSize: 13, padding: '5px 0', color: '#555′ }}>• {p}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
