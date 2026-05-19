import { useState } from 'react';

const locations = [
  { id: 'westfortworth', label: 'West Fort Worth / Aledo / Weatherford' },
  { id: 'denton', label: 'Denton / Argyle / Northlake' },
  { id: 'dallas', label: 'Dallas / East DFW' },
  { id: 'tarrant', label: 'Central Tarrant (Arlington / Hurst / Euless)' },
  { id: 'collin', label: 'Collin County (Frisco / Plano / McKinney)' },
];

const geoRisks: Record<string, { riskType: string; color: string; level: string; description: string; watch: string[]; triggers: string[] }> = {
  westfortworth: {
    riskType: 'Limestone Karst + Clay Collapse',
    color: '#CC0000',
    level: 'Highest in DFW',
    description: 'Western Parker and eastern Palo Pinto counties sit on the Ellenburger limestone karst formation. Dissolution of limestone by groundwater creates underground voids that can collapse suddenly — true sinkholes. Separately, the Trinity clay soils in western Tarrant also experience localized soil collapse when dried clay channels are saturated rapidly.',
    watch: [
      'Circular depressions forming in yard — even gradual ones',
      'Cracks in slab or foundation that appear suddenly (not seasonal)',
      'Fence posts or trees leaning without explanation',
      'Sections of driveway or sidewalk sinking unevenly',
      'Well water becoming turbid after rain (karst indicator)',
      'Unusual ponding in areas that previously drained',
    ],
    triggers: [
      'Any circular depression larger than 12″ diameter → call geotechnical engineer immediately',
      'Rapid crack opening (more than 1/4″ in 30 days) → foundation inspection priority',
      'Multiple neighbors reporting similar ground movement → county survey recommended',
      'Any visible hole forming in yard → do not approach — call engineering first',
    ],
  },
  denton: {
    riskType: 'Barnett Shale Clay + Localized Karst Margins',
    color: '#FF6600',
    level: 'Moderate-High',
    description: 'Denton County straddles the eastern edge of the Ft. Worth Basin and the karst transition zone. Much of Denton is underlain by Eagle Ford and Woodbine shale, which swell and shrink with moisture but do not form true karst voids. However, the western Denton/Northlake area near Flower Mound has some karst limestone exposure. Clay collapse (not true sinkholes) is more common — rapid soil settlement after drought followed by rain.',
    watch: [
      'Gradual saucer-shaped depressions in lawn — especially after drought-flood cycle',
      'Gutter downspouts that were level now sloping differently',
      'Doors/windows that previously worked fine now sticking',
      'Longitudinal cracks along brick mortar lines',
      'Areas of yard that stay wet longer than surrounding soil',
    ],
    triggers: [
      'Door or window misalignment appearing suddenly → foundation inspection within 60 days',
      'Any depression deeper than 3″ forming within a week → geotechnical consult',
      'Foundation crack wider than 1/4″ → structural engineer, not just a foundation company',
      'Utility company noting pipe deflection or breakage → ground movement indicator',
    ],
  },
  dallas: {
    riskType: 'Clay Soil Collapse (Non-Karst)',
    color: '#F5E642',
    level: 'Low-Moderate',
    description: 'East Dallas and most of Dallas County overlies Austin Chalk and Eagle Ford shale — not limestone karst. True sinkholes are extremely rare. The primary risk is clay soil collapse: DFW\’s expansive clay shrinks dramatically during drought, creating underground channels. When rain saturates those channels, the soil collapses inward. This mimics a sinkhole but has a different mechanism and is generally less severe.',
    watch: [
      'Seasonal depressions that appear in August-September (peak drought) and fill in after fall rains',
      'Cracks in clay soil adjacent to foundation — normal in DFW but track width trends',
      'Settling around tree stumps or large removed trees (root decomposition voids)',
      'Areas near old water or sewer lines — pipe failure creates subsurface voids',
    ],
    triggers: [
      'Depression near foundation perimeter → get foundation inspection to check for undermining',
      'New crack in slab foundation (not hairline) → licensed structural engineer review',
      'Old large tree removal site subsiding → fill with compacted soil, monitor drainage',
      'City water or sewer work nearby + new ground movement → request utility inspection',
    ],
  },
  tarrant: {
    riskType: 'Clay Settlement + Occasional Karst Fringe',
    color: '#F5E642',
    level: 'Low-Moderate',
    description: 'Central Tarrant County (Arlington, Hurst, Euless, Bedford) sits on Trinity clay and Austin Chalk. True karst sinkholes are uncommon. Settlement from clay shrinkage and expansion is the dominant ground movement type. Western portions of Tarrant near Fort Worth begin to approach the karst transition zone.',
    watch: [
      'Foundation movement following multi-year drought — typical DFW clay shrinkage',
      'Water line breaks causing underground voids — common in aging Mid-Cities infrastructure',
      'Tree root excavation creating temporary depressions that fill in',
      'Any sudden ground opening near utility corridors',
    ],
    triggers: [
      'Sudden depression forming near utility easement → call city utility line first',
      'Foundation crack wider than 3/16″ → licensed foundation contractor + engineer',
      'Visible gap between soil and foundation beam → immediate soaker hose and inspection',
      'Any water meter spike without explanation → possible underground pipe leak feeding void',
    ],
  },
  collin: {
    riskType: 'Engineered Fill + Clay Expansion',
    color: '#22c55e',
    level: 'Low',
    description: 'Most of Collin County is built on engineered fill over Woodbine and Eagle Ford shale — not karst formation. Rapid development in this area means engineered lots were graded and filled, sometimes improperly. Settlement of fill soil and expansive clay are the primary risks. True sinkholes from limestone dissolution are very rare in this area.',
    watch: [
      'Uneven settlement in newer construction — look for slab cracks in first 5 years',
      'Fill soil compacting in low areas of yard after first rainy seasons',
      'Retaining wall movement in cut-and-fill lots',
      'Drainage swales filling in or redirecting unexpectedly',
    ],
    triggers: [
      'Slab crack in home under 10 years old → contact builder warranty if applicable; engineer if not',
      'Retaining wall leaning or cracking → geotechnical engineer to assess fill stability',
      'Large yard depression forming after heavy rain → fill compaction issue, confirm with survey',
      'Any void appearing near foundation → immediate engineering evaluation',
    ],
  },
};

export default function DFWSinkholeRiskGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = selected ? geoRisks[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🪨 DFW HOME RISK</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Sinkhole & Soil Collapse Risk Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW is not a major sinkhole zone like Florida, but specific areas — particularly west of Fort Worth and parts of Denton County — overlie limestone karst where genuine sinkholes can occur. More commonly, DFW homeowners see clay soil collapse: expansive clay creates underground channels during drought that collapse when re-saturated. Understanding which risk type applies to your location determines what to watch for.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            ['True Karst Sinkholes', 'Limestone dissolves in groundwater over decades, creating underground voids. Collapse can be sudden and serious. Western DFW edge.'],
            ['Clay Soil Collapse', 'DFW\’s expansive clay creates channels when drought-dry, then collapses when wet. Mimics sinkholes — usually shallower and repairable.'],
            ['Engineered Fill Settlement', 'Rapid DFW development left some lots with improperly compacted fill. Can settle years after construction, especially in Collin County.'],
            ['Utility-Induced Voids', 'Leaking water and sewer lines throughout DFW create underground voids that surface as depressions — any area, any age of home.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ background: '#0f2240', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Select Your DFW Location</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {locations.map(l => (
            <button key={l.id} onClick={() => setSelected(l.id)}
              style={{ background: selected === l.id ? '#F5E642′ : '#0f2240', color: selected === l.id ? '#0A1628' : '#fff', border: '2px solid #F5E642', borderRadius: 8, padding: '10px 14px', cursor: ’pointer', fontWeight: 700, fontSize: 13 }}>
              {l.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#0f2240', borderRadius: 12, padding: 24, border: `2px solid ${result.color}` }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: result.color, marginBottom: 4 }}>{result.riskType}</div>
            <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 12 }}>Risk Level: <span style={{ color: result.color, fontWeight: 700 }}>{result.level}</span></div>
            <div style={{ color: '#e2e8f0', lineHeight: 1.7, marginBottom: 16 }}>{result.description}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 8 }}>👁️ WHAT TO WATCH FOR</div>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#cbd5e1', lineHeight: 2 }}>
                {result.watch.map(w => <li key={w} style={{ fontSize: 13 }}>{w}</li>)}
              </ul>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 8 }}>🚨 FOUNDATION INSPECTION TRIGGERS</div>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#cbd5e1', lineHeight: 2 }}>
                {result.triggers.map(t => <li key={t} style={{ fontSize: 13 }}>{t}</li>)}
              </ul>
            </div>
          </div>
        )}

        <div style={{ marginTop: 28, background: '#0f2240', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>📞 When to Call a Geotechnical Engineer vs. Foundation Company</div>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>Foundation companies specialize in pier repairs and slab lifting — they diagnose and fix what they find above grade. A geotechnical engineer evaluates the underlying soil and geology. If you suspect a true void or karst issue, start with a geotechnical engineer — they can determine if the ground is safe before any repair work begins.
          </p>
        </div>
      </div>
    </div>
  );
}
