import { useState } from 'react';

const knowledgeLevels = [
  { id: 'new', label: 'New homeowner — never dealt with HVAC', icon: '🌱', pages: 'Start with: How a Central AC System Works, DFW HVAC System Types Guide, and What Size AC Do I Need for My DFW Home. These three pages give you the foundation everything else builds on.' },
  { id: 'shopping', label: 'Shopping for a new system', icon: '🛒', pages: 'Go to: HVAC Brand Comparison DFW 2026 (Trane vs Carrier vs Lennox vs Goodman), SEER2 Rating Guide for DFW Climate, and Variable Speed vs Single Stage vs Two Stage Guide. Also read our DFW HVAC Installation Cost Guide.' },
  { id: 'troubleshoot', label: 'System not cooling or acting up', icon: '🔧', pages: 'Start with: DFW AC Troubleshooting Guide, Why Your AC Runs All Day Without Cooling, and Is Your Refrigerant Low? Signs and Costs in DFW. If recent hail: check Condenser Coil Hail Damage Signs.' },
  { id: 'efficiency', label: 'High electric bills / efficiency focus', icon: '⚡', pages: 'Read: DFW Home Energy Audit Guide, Attic Insulation R-Value for DFW Climate, Smart Thermostat ROI Guide DFW, and Is a Two-Stage System Worth It in Texas Heat. DFW summer bills can be cut 25-40% with right upgrades.' },
  { id: 'refrigerant', label: 'Questions about refrigerant / R-22 phase out', icon: '🧪', pages: 'Go to: R-22 Phase Out DFW Guide, R-410A vs R-454B Comparison, and When to Replace vs Recharge a DFW AC System. R-22 systems are now repair-or-replace decisions only.' },
  { id: 'career', label: 'HVAC as a career or business', icon: '💼', pages: 'See: How to Get an HVAC License in Texas, Starting an HVAC Business in DFW, DFW HVAC Technician Salary Guide 2026, and How to Join ProLnk as an HVAC Pro. The DFW market supports 4,000+ active HVAC businesses.' },
];

const stats = [
  { value: '300+', label: 'HVAC pages' },
  { value: '15', label: 'Brands covered' },
  { value: '40+', label: 'Troubleshooting guides' },
  { value: '25+', label: 'Career pages' },
];

export default function DFWHVAC5000Milestone2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = knowledgeLevels.find(k => k.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW · Milestone 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW HVAC Resources: 5,000 Pages Milestone</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          ProLnk's HVAC library is the largest in the DFW market — 300+ pages built specifically for North Texas heat, humidity, and energy costs. From system selection to refrigerant transitions to career guides, this is the most comprehensive DFW HVAC resource available.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginBottom: 28 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#0f2037', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{s.value}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2037', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 12 }}>☀️ Why DFW HVAC is Different</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>DFW averages 100+ days above 90°F — systems run harder and longer than anywhere in the US</li>
            <li>Humidity swings from extreme dry to high humidity create unique comfort challenges</li>
            <li>Clay soil affects outdoor unit pad stability (linked to compressor damage)</li>
            <li>Attic temps can exceed 150°F — duct efficiency losses are severe without insulation upgrades</li>
            <li>Texas deregulated energy market means utility costs vary dramatically by zip code</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, marginBottom: 12 }}>📚 What is your HVAC knowledge level?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {knowledgeLevels.map(k => (
            <button
              key={k.id}
              onClick={() => setSelected(k.id)}
              style={{
                background: selected === k.id ? '#1a3a5c' : '#0f2037',
                border: selected === k.id ? '2px solid #F5E642′ : '2px solid #1e3a5f',
                borderRadius: 8, padding: '12px 16px', color: '#fff',
                textAlign: 'left', cursor: 'pointer', fontSize: 15,
              }}
            >
              {k.icon} {k.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#0f2037', border: '1px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{result.icon} Best Starting Pages for You</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{result.pages}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>❄️ Match with a DFW HVAC Pro</div>
          <p style={{ color: '#0A1628', fontSize: 14 }}>ProLnk matches DFW homeowners with vetted HVAC contractors who know North Texas systems. Join the waitlist for early access.</p>
        </div>
      </div>
    </div>
  );
}
