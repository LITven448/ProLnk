import { useState } from 'react';

const regions = [
  {
    label: 'North',
    emoji: '⬆️',
    areas: 'Celina, Prosper, Gunter, Melissa, Anna, Van Alstyne',
    typicalSystem: '3–3.5 ton heat pump',
    buildEra: '2015–present',
    utilityProvider: 'CoServ / Oncor — MUD-dependent',
    hvacHighlight: 'Heat pumps standard in many new builds. MUD districts govern infrastructure.',
    watchFor: 'Verify MUD district rules before replacing systems. Builder warranties often still active.',
    contractorWait: '2–4 days',
    avgSEER: '16+',
  },
  {
    label: 'South',
    emoji: '⬇️',
    areas: 'Waxahachie, Mansfield, Burleson, Midlothian, Cedar Hill',
    typicalSystem: '3.5–4 ton split system',
    buildEra: '1980s–present (mixed)',
    utilityProvider: 'Oncor / Johnson County co-ops',
    hvacHighlight: 'Ellis County runs hotter and drier — systems size up. Multi-county complexity.',
    watchFor: 'Older Cedar Hill homes have aging ductwork. Ellis County: oversize by half a ton.',
    contractorWait: '2–5 days',
    avgSEER: '14–16',
  },
  {
    label: 'East',
    emoji: '➡️',
    areas: 'Rockwall, Forney, Terrell, Rowlett, Garland',
    typicalSystem: '3.5–4 ton with dehumidification',
    buildEra: '1970s–present (mixed)',
    utilityProvider: 'Oncor (primary)',
    hvacHighlight: 'Lake Ray Hubbard raises humidity. Corrosion accelerates on outdoor units near water.',
    watchFor: 'Condensate drain lines need quarterly flushing. Dehumidification integration recommended.',
    contractorWait: '2–7 days',
    avgSEER: '14–16',
  },
  {
    label: 'West',
    emoji: '⬅️',
    areas: 'Fort Worth, Weatherford, Granbury, Aledo, Azle',
    typicalSystem: '3.5–4 ton split system',
    buildEra: '1960s–present (mixed)',
    utilityProvider: 'Oncor / Tri-County / CoServ',
    hvacHighlight: 'Multiple utility providers. Rural areas see 7–12 day contractor wait vs 2–3 centrally.',
    watchFor: 'Verify utility provider before scheduling. Rural co-op areas have limited contractor coverage.',
    contractorWait: '3–12 days',
    avgSEER: '14–15',
  },
  {
    label: 'Urban Core',
    emoji: '🏙️',
    areas: 'Uptown, Deep Ellum, Knox-Henderson, Downtown FW, Oak Cliff',
    typicalSystem: 'Mini-split or building central plant',
    buildEra: '1920s–present (highly varied)',
    utilityProvider: 'Oncor (primary)',
    hvacHighlight: 'HOA-controlled systems, converted lofts, historic restrictions on condenser placement.',
    watchFor: 'Always check HOA approval. Mini-splits best for lofts. High ceilings require upsizing.',
    contractorWait: '1–3 days',
    avgSEER: 'Varies by building',
  },
];

export default function DFWHVACSuburbComplete() {
  const [selected, setSelected] = useState<string | null>(null);

  const profile = regions.find((r) => r.label === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>🏠 DFW HVAC Guide — Complete Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>DFW Complete Suburb HVAC Reference</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          The definitive HVAC guide for all DFW suburbs — north, south, east, west, and urban core.
          Select your region to see what's typical, what to watch for, and what to expect from contractors.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
          {regions.map((r) => (
            <button
              key={r.label}
              onClick={() => setSelected(r.label)}
              style={{
                padding: '1rem 0.75rem',
                borderRadius: 10,
                border: `2px solid ${selected === r.label ? '#F5E642' : '#1e3a5f'}`,
                background: selected === r.label ? '#F5E642′ : '#0F2040',
                color: selected === r.label ? '#0A1628′ : '#fff',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '1rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>{r.emoji}</div>
              {r.label}
            </button>
          ))}
        </div>

        {profile && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '0.5rem' }}>{profile.emoji} {profile.label} DFW</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1.25rem', fontSize: '0.9rem' }}>{profile.areas}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Typical System', value: profile.typicalSystem },
                { label: 'Build Era', value: profile.buildEra },
                { label: 'Utility Provider', value: profile.utilityProvider },
                { label: 'Contractor Wait', value: profile.contractorWait },
                { label: 'Avg SEER', value: profile.avgSEER },
              ].map((item) => (
                <div key={item.label} style={{ background: '#1a2f50', borderRadius: 8, padding: '0.85rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.9rem' }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem', color: '#cbd5e1′ }}>
              💡 <strong>HVAC Highlight:</strong> {profile.hvacHighlight}
            </div>
            <div style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem', color: '#fbbf24′ }}>
              ⚠️ <strong>Watch For:</strong> {profile.watchFor}
            </div>
          </div>
        )}

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📊 DFW Region Quick Comparison</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                  {['Region', 'Typical System', 'Wait Time', 'SEER'].map((h) => (
                    <th key={h} style={{ padding: '0.5rem 0.75rem', textAlign: 'left', color: '#94a3b8′ }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {regions.map((r) => (
                  <tr key={r.label} style={{ borderBottom: '1px solid #0F2040′ }}>
                    <td style={{ padding: '0.6rem 0.75rem', color: '#F5E642', fontWeight: 600 }}>{r.emoji} {r.label}</td>
                    <td style={{ padding: '0.6rem 0.75rem', color: '#cbd5e1′ }}>{r.typicalSystem}</td>
                    <td style={{ padding: '0.6rem 0.75rem', color: '#cbd5e1′ }}>{r.contractorWait}</td>
                    <td style={{ padding: '0.6rem 0.75rem', color: '#cbd5e1′ }}>{r.avgSEER}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🛠️ Universal DFW HVAC Tips</h3>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>Schedule service in March or October — avoid $300/hr emergency summer rates</li>
            <li>Get a Manual J load calculation before any full replacement — not just a rule-of-thumb size</li>
            <li>Ductwork condition determines 40% of system performance — inspect before upgrading unit</li>
            <li>Verify your utility provider at powertochoose.org — it affects rebate eligibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
