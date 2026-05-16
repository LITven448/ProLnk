import { useState } from 'react';

export default function DFWHVACRefrigerantR410A2026() {
  const [acAge, setAcAge] = useState(10);
  const [result, setResult] = useState('');

  const assess = () => {
    if (acAge <= 5) setResult('✅ Your system uses R-410A — still under warranty. Monitor for 2025-2026 phase-out price increases on refrigerant.');
    else if (acAge <= 10) setResult('⚠️ Mid-life system on R-410A. Budget for potential refrigerant top-off costs rising 40-60% as supply tightens. Plan replacement within 5 years.');
    else if (acAge <= 15) setResult('🔴 Aging R-410A system. Refrigerant costs will spike dramatically. A single recharge may cost $800-1,500+. Replacement with R-32/R-454B system is cost-effective.');
    else setResult('🚨 System approaching end-of-life AND refrigerant is being phased out. Replace immediately with modern R-32 or R-454B unit — do not invest in repairs.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>🌡️ DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>R-410A Refrigerant Phase-Out Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>What DFW homeowners need to know before summer 2026</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '❄️', title: 'R-410A Phase-Out', body: 'EPA banned R-410A production in new equipment starting Jan 1, 2025. Existing supply dwindles — recharge costs up 40-60% in 2026.' },
            { icon: '🔄', title: 'Replacement Refrigerants', body: 'R-32: 67% lower GWP, 8-12% more efficient. R-454B (Puron Advance): near-drop-in replacement, now standard in new Carrier/Trane units.' },
            { icon: '🏠', title: 'Impact on DFW Homes', body: 'DFW runs AC 8-9 months per year. A refrigerant leak on an old system means a painful choice: pay $1,000+ for recharge or replace the system.' },
            { icon: '📅', title: 'Repair vs Replace Guide', body: 'System under 8 years: repair. 8-12 years: weigh refrigerant cost vs. new unit savings. Over 12 years: replace — new systems are 40% more efficient.' },
          ].map((card) => (
            <div key={card.title} style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🔍 Refrigerant Impact Assessment</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>Your AC system age: <strong style={{ color: '#F5E642' }}>{acAge} years</strong></label>
          <input type="range" min={1} max={25} value={acAge} onChange={(e) => setAcAge(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 16, accentColor: '#F5E642' }} />
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Assess My System
          </button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>💡 ProLnk Tip</div>
          <div style={{ color: '#cbd5e1', fontSize: 14 }}>Get 3 competing quotes from DFW-vetted HVAC pros for refrigerant-ready system upgrades. ProLnk matches you with licensed contractors who stock R-32 and R-454B equipment.</div>
        </div>
      </div>
    </div>
  );
}
