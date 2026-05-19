import { useState } from 'react';

const WARRANTY_TYPES = {
  builder: { label: 'Builder Warranty (1-2-10)', yr1: true, yr2: true, yr10: true },
  state: { label: 'Texas Statutory Only', yr1: true, yr2: false, yr10: true },
  extended: { label: 'Extended Third-Party', yr1: true, yr2: true, yr10: true },
};

const COVERAGE = {
  workmanship: {
    label: '1-Year Workmanship',
    covered: ['Paint defects', 'Drywall cracks', 'Floor gaps', 'Trim separation', 'Door alignment', 'Grout cracking'],
    excluded: ['Normal wear and tear', 'Homeowner damage', 'Acts of God', 'Cosmetic after 1 year'],
  },
  systems: {
    label: '2-Year Systems',
    covered: ['HVAC distribution', 'Electrical wiring defects', 'Plumbing leaks (interior)', 'Mechanical ventilation'],
    excluded: ['Appliances (separate warranty)', 'HVAC unit itself', 'Water heater unit', 'Cosmetic only'],
  },
  structural: {
    label: '10-Year Structural',
    covered: ['Foundation defects', 'Load-bearing wall failures', 'Roof framing', 'Beam/column failure'],
    excluded: ['Drainage issues outside footprint', 'Cosmetic cracks', 'Settlement within tolerance', 'Soil movement'],
  },
};

export default function DFWBuilderWarrantyGuide() {
  const [homeAge, setHomeAge] = useState(1);
  const [warrantyType, setWarrantyType] = useState('builder');

  const yr1Active = homeAge <= 1;
  const yr2Active = homeAge <= 2;
  const yr10Active = homeAge <= 10;

  const getStatus = (active: boolean) => active
    ? { label: 'ACTIVE', color: '#22c55e' }
    : { label: 'EXPIRED', color: '#ef4444' };

  const inspectItems = [
    yr1Active && 'Document all cosmetic defects NOW before 1-year expires',
    yr2Active && 'Test all HVAC zones, check electrical outlets, inspect plumbing under sinks',
    yr10Active && 'Have foundation inspected by licensed engineer',
    !yr1Active && yr10Active && 'Focus on structural — document any new cracks or settlement',
    !yr10Active && 'All warranty coverage expired — maintenance is 100% owner responsibility',
  ].filter(Boolean);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 12 }}>
          DFW Construction Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Builder Warranty Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40 }}>
          Understand the 1-2-10 warranty, what's actually covered, and how to protect yourself before it expires.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { period: '1 Year', type: 'Workmanship', icon: '🔨', active: yr1Active, desc: 'Paint, drywall, trim, doors' },
            { period: '2 Years', type: 'Systems', icon: '⚡', active: yr2Active, desc: 'HVAC, electrical, plumbing' },
            { period: '10 Years', type: 'Structural', icon: '🏗️', active: yr10Active, desc: 'Foundation, framing, roof' },
          ].map(item => (
            <div key={item.period} style={{ background: item.active ? '#0d2a1a' : '#1a0d0d', border: `2px solid ${item.active ? '#22c55e' : '#ef4444'}`, borderRadius: 12, padding: 20, textAlign: 'center' as const }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{item.period}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.type}</div>
              <div style={{ color: item.active ? '#22c55e' : '#ef4444', fontSize: 12, fontWeight: 700 }}>{item.active ? '✓ ACTIVE' : '✗ EXPIRED'}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>🏠 Check Your Coverage</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Home Age (Years)</label>
              <input type="number" value={homeAge} onChange={e => setHomeAge(Math.max(0, Number(e.target.value)))} min={0} max={30}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 16, marginTop: 8, boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Warranty Type</label>
              <select value={warrantyType} onChange={e => setWarrantyType(e.target.value)}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, marginTop: 8 }}>
                {Object.entries(WARRANTY_TYPES).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ background: '#1a2a4a', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📋 What To Do Right Now</div>
            {inspectItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{ color: '#F5E642' }}>→</span>
                <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item as string}</span>
              </div>
            ))}
          </div>
        </div>

        {Object.entries(COVERAGE).map(([key, section]) => (
          <div key={key} style={{ background: '#0d1f38', borderRadius: 16, padding: 28, marginBottom: 20, border: '1px solid #1e3a5f' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>{section.label}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>✓ COVERED</div>
                {section.covered.map(item => (
                  <div key={item} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>• {item}</div>
                ))}
              </div>
              <div>
                <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>✗ EXCLUDED</div>
                {section.excluded.map(item => (
                  <div key={item} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>• {item}</div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div style={{ background: '#1a2a0a', borderRadius: 16, padding: 24, border: '1px solid #2a4a1a' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📞 How to File a Warranty Claim</h3>
          {['Submit written request to builder warranty department (email creates paper trail)', 'Include photos, dates noticed, and description of defect', 'Request written confirmation of receipt within 5 business days', 'Builder must respond within 10 days under Texas law (Tex. Prop. Code 430)', 'If denied, escalate to Texas Real Estate Commission or file in small claims court'].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, paddingTop: 2 }}>{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
