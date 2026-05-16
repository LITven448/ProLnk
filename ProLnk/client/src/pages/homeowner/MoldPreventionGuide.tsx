import { useState } from 'react';

const checklist = [
  { id: 'filter', label: 'HVAC filter changed every 1–3 months', risk: 'High — dirty filters reduce airflow and increase duct moisture' },
  { id: 'exhaust', label: 'Bathroom exhaust fan vented outside (not into attic)', risk: 'High — attic-vented exhaust creates condensation and mold growth' },
  { id: 'attic', label: 'Attic properly ventilated (1:150 sqft ratio)', risk: 'High — inadequate ventilation is the #1 DFW mold source' },
  { id: 'crawl', label: 'Crawl space vapor barrier installed', risk: 'Medium — ground moisture migrates upward without barrier' },
  { id: 'grout', label: 'Grout/caulk inspected and resealed annually', risk: 'Medium — cracked caulk allows moisture into wall cavities' },
  { id: 'humidity', label: 'Indoor humidity kept below 60%', risk: 'High — mold begins growing above 60% RH within 24–48 hours' },
  { id: 'drain', label: 'HVAC condensate drain line cleared annually', risk: 'High — clogged drain causes pan overflow and ceiling damage' },
];

const riskFactors = [
  { id: 'age', label: 'Home is over 20 years old', weight: 2 },
  { id: 'humid', label: 'Indoor humidity regularly above 60%', weight: 3 },
  { id: 'flooding', label: 'Past flooding or water intrusion', weight: 4 },
  { id: 'atticvent', label: 'Attic ventilation is inadequate or unknown', weight: 3 },
  { id: 'hvacold', label: 'HVAC system is over 10 years old', weight: 2 },
  { id: 'musty', label: 'Musty smell in any area of the home', weight: 5 },
];

const hotspots = [
  { icon: '🏚️', location: 'Attic', detail: 'Inadequate ventilation + roof condensation. Most common DFW mold location. Check for dark staining on rafters and roof decking.' },
  { icon: '❄️', location: 'HVAC System', detail: 'Drain pan, evaporator coils, and ductwork. Mold thrives here during humid months (April–September). Inspect annually.' },
  { icon: '🚿', location: 'Bathroom', detail: 'Grout and caulk are primary entry points. Poor exhaust ventilation = chronic elevated humidity. Check behind toilet and under sink.' },
  { icon: '🏗️', location: 'Crawl Space', detail: 'Ground moisture + humid air = perfect mold environment. Vapor barrier + ventilation are non-negotiable in DFW.' },
  { icon: '🌧️', location: 'Post-Storm Zones', detail: 'Any area with water intrusion must be dried within 24–48 hours. After DFW storms, check attic, window sills, and garage walls immediately.' },
];

export default function MoldPreventionGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [riskChecked, setRiskChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleRisk = (id: string) => setRiskChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const doneCount = checklist.filter(c => checked[c.id]).length;
  const riskScore = riskFactors.reduce((sum, f) => sum + (riskChecked[f.id] ? f.weight : 0), 0);
  const maxRisk = riskFactors.reduce((sum, f) => sum + f.weight, 0);
  const riskPct = Math.round((riskScore / maxRisk) * 100);

  const riskLevel = riskPct < 25 ? { label: 'Low Risk', color: '#16a34a', bg: '#0d2818' }
    : riskPct < 55 ? { label: 'Moderate Risk', color: '#f59e0b', bg: '#2d1f06' }
    : { label: 'High Risk', color: '#ef4444', bg: '#2d0a0a' };

  return (
    <div style={{ background: '#0d1117', minHeight: '100vh', color: '#e6edf3', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 13, color: '#58a6ff', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            🍄 DFW Mold Prevention
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 14px', lineHeight: 1.2 }}>
            DFW Mold Prevention Guide
          </h1>
          <p style={{ fontSize: 18, color: '#8b949e', maxWidth: 560, margin: '0 auto' }}>
            Stop it before it starts — DFW's humidity swings create ideal mold conditions year-round
          </p>
        </div>

        {/* DFW Context */}
        <div style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 24, marginBottom: 40 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 12px', color: '#f0f6fc' }}>⚠️ Why DFW Is High-Risk</h2>
          <p style={{ fontSize: 14, color: '#8b949e', lineHeight: 1.7, margin: 0 }}>
            DFW humidity swings from 15% in winter to 85%+ in spring — creating perfect mold conditions during transition months.
            Spring (March–June) is the highest-risk period. Any moisture intrusion + 48 hours = mold can begin growing on drywall, wood, and insulation.
            Testing: $30 mold test kit detects presence. Professional assessment: $200–500. Remediation: small area (&lt;10 sqft) = DIY with N95 + bleach solution. Larger areas: $500–$5,000+ professional.
          </p>
        </div>

        {/* DFW Hotspots */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', color: '#f0f6fc' }}>DFW Mold Hotspots</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {hotspots.map((h, i) => (
            <div key={i} style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 20, display: 'flex', gap: 16 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{h.icon}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f6fc', marginBottom: 6 }}>{h.location}</div>
                <div style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.6 }}>{h.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Prevention Checklist */}
        <div style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 28, marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#f0f6fc' }}>✅ Prevention Checklist</h2>
            <span style={{ fontSize: 13, color: '#3fb950', fontWeight: 700 }}>{doneCount}/{checklist.length} complete</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {checklist.map(item => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                style={{ display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'pointer', padding: 14, borderRadius: 8, background: checked[item.id] ? '#0d2818' : '#0d1117', border: `1px solid ${checked[item.id] ? '#238636' : '#30363d'}`, transition: 'all 0.2s' }}
              >
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked[item.id] ? '#3fb950' : '#30363d'}`, background: checked[item.id] ? '#238636' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  {checked[item.id] && <span style={{ fontSize: 12, color: '#fff' }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#8b949e' }}>{item.risk}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Score Calculator */}
        <div style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: '#f0f6fc' }}>🎯 Mold Risk Assessment</h2>
          <p style={{ fontSize: 13, color: '#8b949e', margin: '0 0 20px' }}>Check all that apply to your home</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {riskFactors.map(f => (
              <label key={f.id} style={{ display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" checked={!!riskChecked[f.id]} onChange={() => toggleRisk(f.id)} style={{ accentColor: '#f59e0b', width: 16, height: 16 }} />
                <span style={{ fontSize: 14, color: '#8b949e' }}>{f.label}</span>
              </label>
            ))}
          </div>
          <div style={{ background: riskLevel.bg, border: `1px solid ${riskLevel.color}`, borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: riskLevel.color, fontWeight: 600, marginBottom: 4 }}>Your Mold Risk Level</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: riskLevel.color }}>{riskLevel.label}</div>
            {riskPct >= 55 && (
              <div style={{ fontSize: 13, color: '#8b949e', marginTop: 8 }}>
                Priority actions: Professional HVAC inspection, attic ventilation check, dehumidifier installation
              </div>
            )}
            {riskPct >= 25 && riskPct < 55 && (
              <div style={{ fontSize: 13, color: '#8b949e', marginTop: 8 }}>
                Review checklist items above — address any unchecked items within the next 30 days
              </div>
            )}
            {riskPct < 25 && (
              <div style={{ fontSize: 13, color: '#8b949e', marginTop: 8 }}>
                Good standing — continue annual maintenance routine
              </div>
            )}
          </div>
        </div>

        {/* TrustyPro CTA */}
        <div style={{ background: 'linear-gradient(135deg, #0d2818 0%, #0a1628 100%)', borderRadius: 16, border: '1px solid #238636', padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🔍</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px', color: '#f0f6fc' }}>TrustyPro AI Scan Detects Mold Risk Early</h3>
          <p style={{ fontSize: 14, color: '#8b949e', margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Our AI scan identifies moisture staining, water intrusion patterns, and HVAC drain issues that often precede mold growth — catching problems before they become expensive remediation projects.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#238636', color: '#fff', fontWeight: 700, padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 15 }}
          >
            Add Your Home to TrustyPro
          </a>
        </div>
      </div>
    </div>
  );
}
