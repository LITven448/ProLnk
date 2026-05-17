import { useState } from 'react';

export default function DFWRoofingConvectionLoss2026() {
  const [concern, setConcern] = useState('cooling');

  const solutions: Record<string, { icon: string; transfer: string; solution: string; detail: string }> = {
    cooling: { icon: '🌞', transfer: 'Radiation (dominant in DFW summers)', solution: 'Radiant Barrier Decking', detail: 'Radiant barriers reflect 95%+ of infrared radiation before it enters your attic. In DFW summers, this is the dominant heat gain pathway — attic temps drop 20–30°F, cutting AC load significantly.' },
    drafts: { icon: '💨', transfer: 'Convection (air movement through gaps)', solution: 'Air Sealing + Dense-Pack Insulation', detail: 'Convective heat transfer happens when air moves through penetrations, gaps at top plates, and bypasses. Air sealing every penetration before adding insulation reduces convective losses by 40–60% in DFW homes.' },
    walls: { icon: '🧱', transfer: 'Conduction (through solid materials)', solution: 'Higher R-Value Insulation', detail: 'Conduction is the direct transfer of heat through roofing materials — shingles, decking, joists. Adding R-value (R-38 to R-60 in DFW attics) slows conductive heat flow during 100°F+ summer days.' },
    all: { icon: '🏠', transfer: 'All Three Mechanisms', solution: 'Whole-Roof Thermal Package', detail: 'Optimal DFW roof thermal performance: radiant barrier on decking (radiation), dense-pack or spray foam at eaves (convection), R-49 blown insulation over floor (conduction). Typical AC savings: 18–28%.' },
  };

  const sol = solutions[concern];

  const info = [
    { icon: '☀️', title: 'DFW Radiation: The Big Problem', body: 'DFW receives 220+ sunny days per year. In summer, a dark shingle roof reaches 160–180°F. Infrared radiation from the roof deck heats attic air to 140–150°F without a radiant barrier — overwhelming standard insulation.' },
    { icon: '💨', title: 'Convection: Often Overlooked', body: 'Attic bypasses around recessed lights, top plates, and HVAC penetrations allow hot attic air to convect directly into conditioned space. Air sealing these gaps is cost-effective at $500–$1,500 and addresses convective loss.' },
    { icon: '🧱', title: 'Conduction: Material Matters', body: 'Concrete tile conducts less heat than asphalt shingle. Metal roofing with air gap conducts and radiates less than direct-applied materials. Material selection matters in DFW — especially for new construction or full replacement.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Roof Heat Transfer Guide 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>Conduction, convection, and radiation through North Texas roofs</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 DFW Heat Concern → Solution Guide</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>What is your primary concern?</label>
          <select value={concern} onChange={e => setConcern(e.target.value)}
            style={{ background: '#1a2d4a', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '8px 12px', width: '100%', marginBottom: 16 }}>
            <option value="cooling">High summer cooling bills</option>
            <option value="drafts">Drafts and uneven temperatures</option>
            <option value="walls">Heat through walls and ceilings</option>
            <option value="all">Comprehensive roof thermal package</option>
          </select>
          <div style={{ background: '#122040', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{sol.icon}</div>
            <div style={{ color: '#8899AA', fontSize: 12, marginBottom: 4 }}>Primary Transfer: {sol.transfer}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 8 }}>Recommended: {sol.solution}</div>
            <p style={{ color: '#B0C4D8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{sol.detail}</p>
          </div>
        </div>

        {info.map((item, i) => (
          <div key={i} style={{ background: '#0D1F38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>{item.icon} {item.title}</h3>
            <p style={{ color: '#B0C4D8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{item.body}</p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0D1F38', borderRadius: 12 }}>
          <p style={{ color: '#8899AA', fontSize: 12, margin: '0 0 12px' }}>Get a DFW roofing insulation quote through ProLnk</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get Roofing Quote
          </button>
        </div>
      </div>
    </div>
  );
}