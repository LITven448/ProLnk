import { useState } from 'react';

const auditSections = [
  { id: 'exterior', label: '🏠 Exterior', items: ['Roof condition — missing/curling shingles', 'Gutters clear and properly sloped', 'Foundation perimeter — cracks, gaps, soil level', 'Siding/brick — cracks, efflorescence, gaps at trim', 'Driveway and walkways — heaving or cracking'] },
  { id: 'hvac', label: '❄️ HVAC Systems', items: ['Filter replaced (every 60–90 days in DFW)', 'Condenser coils clean and fins straight', 'Attic insulation R-value (should be R-38+ in DFW)', 'Ductwork visible sections — no disconnects or mold', 'Thermostat calibration and programming current'] },
  { id: 'plumbing', label: '🚿 Plumbing', items: ['Water heater age and anode rod condition', 'Under-sink areas — drips, staining, corrosion', 'Exterior hose bibs — winterized and functioning', 'Water pressure — should be 40–80 PSI', 'Drain flow speed — slow drains signal buildup'] },
  { id: 'electrical', label: '⚡ Electrical', items: ['Panel — no double-tapping, all breakers labeled', 'GFCI outlets in kitchen, bath, garage, exterior', 'Smoke/CO detectors — test and replace batteries', 'Exterior outlets and lighting — weatherproof covers', 'Ceiling fans — check for wobble or noise'] },
  { id: 'financial', label: '💰 Financial Audit', items: ['Utility bills — compare Jan–Dec YoY', 'Total maintenance spend vs. 1% of home value', 'Deferred repairs list — update and cost estimate', 'Insurance coverage vs. current rebuild cost', 'Property tax assessment vs. comparable sales'] },
];

export default function DFWHomeAuditGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [lastAudit, setLastAudit] = useState('');
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const age = parseInt(homeAge) || 0;
  const yearsSince = lastAudit ? new Date().getFullYear() - parseInt(lastAudit) : 99;

  const urgency = yearsSince > 2 ? 'HIGH' : yearsSince > 1 ? 'MODERATE' : 'ROUTINE';
  const urgencyColor = urgency === 'HIGH' ? '#ef4444' : urgency === 'MODERATE' ? '#f59e0b' : '#22c55e';

  const priorityItems: string[] = [];
  if (age > 20) priorityItems.push('🔴 Electrical panel inspection — 20+ year home');
  if (age > 15) priorityItems.push('🔴 Roof inspection — document before hail season');
  if (age > 10) priorityItems.push('🟡 Water heater replacement planning (avg 10–12yr life)');
  if (age > 8) priorityItems.push('🟡 HVAC service contract — units approaching mid-life');
  priorityItems.push('🟢 Foundation perimeter soil moisture — DFW clay critical year-round');
  priorityItems.push('🟢 Gutter cleaning — fall leaves + spring pollen = clogs');

  const toggle = (key: string) => setChecked(prev => { const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s; });
  const total = auditSections.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Annual DFW Home Audit Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>Conduct your own annual home review — what to inspect, what to measure, and how to prioritize for the coming year.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📊 Audit Setup</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>HOME AGE (years)</label>
              <input type="number" value={homeAge} onChange={e => setHomeAge(e.target.value)} placeholder="e.g. 18" style={{ backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '8px 12px', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>LAST AUDIT YEAR</label>
              <input type="number" value={lastAudit} onChange={e => setLastAudit(e.target.value)} placeholder="e.g. 2023" style={{ backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '8px 12px', width: '100%', boxSizing: 'border-box' }} />
            </div>
          </div>
          {(homeAge || lastAudit) && (
            <div style={{ marginTop: 16, backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>AUDIT URGENCY</div>
              <div style={{ color: urgencyColor, fontWeight: 700, fontSize: 18 }}>{urgency}</div>
              {yearsSince > 1 && <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Last audit was {yearsSince > 50 ? 'never' : `${yearsSince} year(s) ago`} — schedule comprehensive review</div>}
            </div>
          )}
        </div>

        {priorityItems.length > 0 && homeAge && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🎯 Priority Items for Your Home</h2>
            {priorityItems.map((item, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 14, padding: '6px 0', borderBottom: '1px solid #1e3a5f' }}>{item}</div>)}
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16 }}>📋 Audit Checklist</h2>
            <span style={{ color: '#94a3b8', fontSize: 13 }}>{checked.size}/{total} complete</span>
          </div>
          {auditSections.map(section => (
            <div key={section.id} style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>{section.label}</div>
              {section.items.map(item => {
                const key = `${section.id}-${item}`;
                return (
                  <div key={key} onClick={() => toggle(key)} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '6px 0', cursor: 'pointer', borderBottom: '1px solid #0A1628' }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, border: '2px solid #F5E642', backgroundColor: checked.has(key) ? '#F5E642' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#0A1628', fontWeight: 700 }}>{checked.has(key) ? '✓' : ''}</div>
                    <span style={{ color: checked.has(key) ? '#64748b' : '#e2e8f0', fontSize: 14, textDecoration: checked.has(key) ? 'line-through' : 'none' }}>{item}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Need pros for any audit findings?</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>ProLnk connects DFW homeowners with vetted local contractors</div>
        </div>
      </div>
    </div>
  );
}
