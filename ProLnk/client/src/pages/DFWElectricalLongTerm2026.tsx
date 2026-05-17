import { useState } from 'react';

export default function DFWElectricalLongTerm2026() {
  const [elecAge, setElecAge] = useState('');
  const [plan, setPlan] = useState(false);

  const phases = [
    { label: 'Years 0–10', icon: '🔌', title: 'Safety Baseline', tasks: ['Test all GFCI outlets monthly (reset button = functional)', 'Add AFCI breakers if panel predates 2008 NEC', 'Verify panel has no recalled breaker brands (FPE, Zinsco)', 'Label all breakers clearly — DFW storm outages are frequent'] },
    { label: 'Years 10–20', icon: '🔍', title: 'Panel Inspection & EV Prep', tasks: ['Full panel inspection by licensed master electrician', 'Add 50-amp EV circuit if vehicle purchased or planned', 'Inspect aluminum wiring if 1965–1973 home', 'Test whole-home surge protector — replace if over 10 years'] },
    { label: 'Years 20–30', icon: '🔧', title: 'Outlet & Panel Update', tasks: ['Replace original outlet covers and switches (brittle in DFW heat)', 'Full panel inspection — look for double-tapped breakers', 'Add GFCI protection to all kitchens, baths, garages, outdoors', 'Inspect all exterior outlets for weatherproofing'] },
    { label: 'Years 30+', icon: '⚡', title: 'Panel Replacement Consideration', tasks: ['Panels over 30 years: consider full replacement', '200-amp service upgrade if still on 100-amp', 'Budget $4,000–$8,000 for full panel replacement in DFW', 'Document all electrical work for resale — buyers ask in DFW'] },
  ];

  const statusMap: Record<string, { color: string; msg: string }> = {
    'under10': { color: '#22c55e', msg: '🟢 Modern electrical. Monthly GFCI testing and AFCI protection are your primary tasks. DFW storms surge — add whole-home surge protection.' },
    '10to20': { color: '#eab308', msg: '🟡 Panel inspection time. EV charger demand is rising fast in DFW — plan that circuit now before peak installer demand.' },
    '20to30': { color: '#f97316', msg: '🟠 Full electrical checkup needed. Double-tapped breakers and aging GFCI devices are common in this age range in DFW homes.' },
    'over30': { color: '#dc2626', msg: '🔴 Panel replacement evaluation recommended. Homes over 30 in DFW often have undersized service for modern loads (EV, AC, home office).' },
  };

  const s = elecAge ? statusMap[elecAge] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Electrical Long-Term Ownership Plan 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>30-year electrical ownership plan for North Texas homes</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Home Electrical Age</h2>
          <select value={elecAge} onChange={e => { setElecAge(e.target.value); setPlan(false); }} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px', fontSize: 14, marginBottom: 16 }}>
            <option value="">-- Select electrical system age --</option>
            <option value="under10">Under 10 years</option>
            <option value="10to20">10–20 years</option>
            <option value="20to30">20–30 years</option>
            <option value="over30">Over 30 years</option>
          </select>
          <button onClick={() => setPlan(true)} disabled={!elecAge} style={{ background: elecAge ? '#F5E642' : '#334155', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: elecAge ? 'pointer' : 'default' }}>
            Generate My Electrical Plan →
          </button>
        </div>

        {plan && s && (
          <div style={{ background: '#1e2d45', borderLeft: `3px solid ${s.color}`, borderRadius: 12, padding: 20, marginBottom: 20, fontSize: 14 }}>
            {s.msg}
          </div>
        )}

        {plan && phases.map((p, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{p.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>{p.label}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{p.title}</div>
              </div>
            </div>
            {p.tasks.map((t, j) => <div key={j} style={{ padding: '7px 12px', background: '#0A1628', borderRadius: 6, marginBottom: 6, fontSize: 13 }}>✓ {t}</div>)}
          </div>
        ))}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginTop: 8 }}>
          <h3 style={{ color: '#F5E642', fontSize: 14, marginBottom: 10 }}>⚡ DFW Electrical Facts</h3>
          {['DFW storm surges cause ~$800M in electrical damage annually', 'ERCOT grid — DFW at risk during extreme heat events', 'FPE Stab-Lok panels: banned in some DFW municipalities', 'EV charger installation DFW avg cost: $1,200–$2,500'].map((f, i) => (
            <div key={i} style={{ fontSize: 13, color: '#cbd5e1', padding: '6px 0', borderBottom: i < 3 ? '1px solid #334155' : 'none' }}>📍 {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
