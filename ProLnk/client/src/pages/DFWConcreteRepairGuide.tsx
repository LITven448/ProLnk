import { useState } from 'react';

const repairMethods = [
  { method: 'Crack Injection / Filling', bestFor: 'Hairline to 1/4″ cracks', costPerSqft: '$3–$6', longevity: '5–10 years', dfwNote: 'Fast fix for clay soil surface cracking' },
  { method: 'Resurfacing / Overlay', bestFor: 'Surface spalling, minor cracks', costPerSqft: '$3–$8', longevity: '7–12 years', dfwNote: 'Good for DFW driveways showing weathering' },
  { method: 'Mudjacking / Slabjacking', bestFor: 'Sunken, uneven slabs', costPerSqft: '$3–$8', longevity: '5–10 years', dfwNote: 'Common in DFW clay — pumps slurry under slab' },
  { method: 'Polyurethane Foam Lifting', bestFor: 'Sunken slabs, trip hazards', costPerSqft: '$5–$14', longevity: '10–15 years', dfwNote: 'More durable than mudjacking in expansive soil' },
  { method: 'Partial Slab Replacement', bestFor: 'Heavily damaged sections', costPerSqft: '$8–$18', longevity: '25–30 years', dfwNote: 'Best when >30% of slab is compromised' },
  { method: 'Full Driveway Replacement', bestFor: 'Extensive structural failure', costPerSqft: '$6–$12', longevity: '30–40 years', dfwNote: 'Standard 4″ reinforced with rebar for DFW clay' },
];

const crackSeverity = [
  { level: 'Hairline', width: '< 1/16″', cause: 'Normal curing shrinkage or thermal', action: 'Monitor or seal with crack filler', urgent: false },
  { level: 'Moderate', width: '1/16″–1/4″', cause: 'Clay soil movement or freeze-thaw', action: 'Seal or inject epoxy filler', urgent: false },
  { level: 'Wide', width: '1/4″–1″', cause: 'Significant clay heave or subsidence', action: 'Mudjacking or polyurethane lift', urgent: true },
  { level: 'Structural', width: '> 1″ or vertical displacement', cause: 'Soil failure or drainage issue', action: 'Professional assessment + possible replacement', urgent: true },
];

const areaSizes = [500, 1000, 1500, 2000];

export default function DFWConcreteRepairGuide() {
  const [severity, setSeverity] = useState('Hairline');
  const [area, setArea] = useState(500);

  const matchedSeverity = crackSeverity.find((c) => c.level === severity);

  const getMethodAndCost = () => {
    if (severity === 'Hairline') return { method: 'Crack Sealing', low: area * 1, high: area * 3 };
    if (severity === 'Moderate') return { method: 'Epoxy Injection / Resurfacing', low: area * 3, high: area * 8 };
    if (severity === 'Wide') return { method: 'Mudjacking or Foam Lifting', low: area * 3, high: area * 14 };
    return { method: 'Partial or Full Replacement', low: area * 8, high: area * 18 };
  };

  const rec = getMethodAndCost();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOME IMPROVEMENT GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
          Concrete Repair Cost Guide
        </h1>
        <p style={{ color: '#A0ADBF', fontSize: 16, marginBottom: 36 }}>
          Dallas–Fort Worth 2026 pricing for driveway and sidewalk concrete repair — clay soil movement, mudjacking vs replacement, freeze-thaw effects, and cost by severity.
        </p>

        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>🏔️ DFW Clay Soil: The Root Cause</div>
          <p style={{ color: '#C8D4E8', margin: 0, lineHeight: 1.6 }}>
            DFW sits on expansive black clay (Blackland Prairie soil) that swells when wet and shrinks when dry. This movement cracks concrete, lifts slabs, and creates trip hazards on sidewalks and driveways — often within 3–5 years of installation. Managing moisture (irrigation, drainage) is the #1 way to extend concrete life in DFW.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>🔍 Crack Severity Assessment</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {crackSeverity.map((c, i) => (
            <div key={i} style={{ backgroundColor: '#112244', borderRadius: 10, padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', gap: 12, alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: c.urgent ? '#EF4444′ : '#FFFFFF', fontSize: 14 }}>{c.level}</div>
                <div style={{ color: '#A0ADBF', fontSize: 12 }}>{c.width}</div>
              </div>
              <div style={{ color: '#C8D4E8', fontSize: 12 }}>{c.cause}</div>
              <div>
                {c.urgent && <span style={{ backgroundColor: '#EF4444', color: '#FFFFFF', fontSize: 11, padding: '2px 8px', borderRadius: 4 }}>URGENT</span>}
              </div>
              <div style={{ color: '#A0ADBF', fontSize: 13 }}>{c.action}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>⚙️ Interactive: Crack Severity + Area → Repair Recommendation</h2>
        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 28, marginBottom: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#A0ADBF', fontSize: 13, marginBottom: 8 }}>CRACK SEVERITY</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#FFFFFF', border: '1px solid #2A3E5C', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}
              >
                {crackSeverity.map((c) => <option key={c.level}>{c.level}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0ADBF', fontSize: 13, marginBottom: 8 }}>AFFECTED AREA (SQ FT)</label>
              <select
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#FFFFFF', border: '1px solid #2A3E5C', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}
              >
                {areaSizes.map((a) => <option key={a} value={a}>{a.toLocaleString()} sq ft</option>)}
              </select>
            </div>
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 13, color: '#A0ADBF', marginBottom: 4 }}>RECOMMENDED REPAIR METHOD</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>{rec.method}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: '#A0ADBF' }}>ESTIMATED COST RANGE</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF' }}>${rec.low.toLocaleString()} – ${rec.high.toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ color: '#C8D4E8', fontSize: 13 }}>For {area.toLocaleString()} sq ft of affected concrete in the DFW area</div>
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>📊 Repair Method Comparison</h2>
        <div style={{ overflowX: 'auto', marginBottom: 36 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: '#1A2E50′ }}>
                {['Method', 'Best For', 'Cost/sq ft', 'Longevity', 'DFW Clay Note'].map((h) => (
                  <th key={h} style={{ padding: '11px 14px', textAlign: 'left', color: '#F5E642′ }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {repairMethods.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#0D1E38′ : '#0A1628', borderBottom: '1px solid #1A2E50' }}>
                  <td style={{ padding: '10px 14px', color: '#FFFFFF', fontWeight: 600 }}>{r.method}</td>
                  <td style={{ padding: '10px 14px', color: '#C8D4E8′ }}>{r.bestFor}</td>
                  <td style={{ padding: '10px 14px', color: '#F5E642′ }}>{r.costPerSqft}</td>
                  <td style={{ padding: '10px 14px', color: '#C8D4E8′ }}>{r.longevity}</td>
                  <td style={{ padding: '10px 14px', color: '#A0ADBF' }}>{r.dfwNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#1A2E50', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>❄️ Freeze-Thaw Cycles in DFW</div>
          <p style={{ color: '#C8D4E8', lineHeight: 1.7, margin: 0 }}>
            DFW averages 20–40 freeze events per winter. While mild compared to northern states, water infiltrating existing cracks freezes and expands, widening damage. Seal existing cracks before November each year. After the February 2021 ice storm, DFW concrete repair demand surged 300% — get bids in fall to avoid spring backlogs.
          </p>
        </div>

      </div>
    </div>
  );
}
