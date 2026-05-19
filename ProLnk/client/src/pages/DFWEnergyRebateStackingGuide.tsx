import { useState } from 'react';

type Project = { id: string; label: string; oncor: number; ira: number; city: number; mfr: number; canStack: string[]; note: string };

const projects: Project[] = [
  { id: 'heatpump', label: 'Heat Pump Installation', oncor: 500, ira: 2000, city: 200, mfr: 150, canStack: ['ira','city','mfr'], note: 'All programs stack — claim Oncor first' },
  { id: 'weatherize', label: 'Weatherization (air seal + insulation)', oncor: 200, ira: 1200, city: 300, mfr: 0, canStack: ['ira','city'], note: 'Oncor + IRA + city rebate all stackable' },
  { id: 'thermostat', label: 'Smart Thermostat', oncor: 85, ira: 0, city: 0, mfr: 75, canStack: ['mfr'], note: 'No federal credit; Oncor + manufacturer both pay' },
  { id: 'solarpanel', label: 'Solar Panel System', oncor: 0, ira: 7500, city: 0, mfr: 0, canStack: [], note: 'No Oncor rebate for solar — IRA credit only (30%)' },
  { id: 'waterheater', label: 'Heat Pump Water Heater', oncor: 100, ira: 2000, city: 0, mfr: 100, canStack: ['ira','mfr'], note: 'Oncor + IRA stack; city programs vary by municipality' },
  { id: 'windows', label: 'Energy-Efficient Windows', oncor: 0, ira: 600, city: 150, mfr: 200, canStack: ['city','mfr'], note: 'No Oncor rebate; IRA + city + manufacturer stack' },
  { id: 'evcharger', label: 'EV Charger (Level 2)', oncor: 0, ira: 1000, city: 250, mfr: 100, canStack: ['city','mfr'], note: 'IRA 30C credit; city utility rebates also available' },
];

export default function DFWEnergyRebateStackingGuide() {
  const [sel, setSel] = useState<string[]>([]);
  const toggle = (id: string) => setSel(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const chosen = projects.filter(p => sel.includes(p.id));
  const totals = { oncor: 0, ira: 0, city: 0, mfr: 0 };
  chosen.forEach(p => { totals.oncor += p.oncor; totals.ira += p.ira; totals.city += p.city; totals.mfr += p.mfr; });
  const grand = totals.oncor + totals.ira + totals.city + totals.mfr;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8ECF0', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642′ }}>💰 DFW Energy Programs</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Energy Rebate Stacking Guide — DFW</h1>
        <p style={{ color: '#9BA8B8', marginBottom: 32, fontSize: 15 }}>Maximize your savings by combining Oncor utility rebates, federal IRA credits, city programs, and manufacturer offers.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 32 }}>
          {[{label:'Oncor Utility',color:'#F5E642',desc:'Paid by Oncor via Trade Ally'},{label:'Federal IRA',color:'#4ADE80',desc:'Tax credit (Form 5695)'},{label:'City + Manufacturer',color:'#60A5FA',desc:'Dallas, FW, Plano programs'}].map(b => (
            <div key={b.label} style={{ background: '#111D2E', border: '1px solid #1E2D42', borderRadius: 10, padding: 14 }}>
              <div style={{ color: b.color, fontWeight: 700, fontSize: 13 }}>{b.label}</div>
              <div style={{ color: '#9BA8B8', fontSize: 12, marginTop: 4 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, color: '#F5E642′ }}>🔧 Select Your Planned Improvements</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {projects.map(p => (
            <div key={p.id} onClick={() => toggle(p.id)} style={{ background: sel.includes(p.id) ? 'rgba(245,230,66,0.08)' : '#111D2E', border: `1px solid ${sel.includes(p.id) ? '#F5E642' : '#1E2D42'}`, borderRadius: 10, padding: '14px 16px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{p.label}</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {p.oncor > 0 && <span style={{ color: '#F5E642', fontSize: 13 }}>Oncor ${p.oncor}</span>}
                  {p.ira > 0 && <span style={{ color: '#4ADE80', fontSize: 13 }}>IRA ${p.ira}</span>}
                  {p.city > 0 && <span style={{ color: '#60A5FA', fontSize: 13 }}>City ${p.city}</span>}
                  {p.mfr > 0 && <span style={{ color: '#C084FC', fontSize: 13 }}>Mfr ${p.mfr}</span>}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#9BA8B8', marginTop: 6 }}>💡 {p.note}</div>
            </div>
          ))}
        </div>

        {chosen.length > 0 && (
          <div style={{ background: '#111D2E', border: '1px solid #1E2D42', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#F5E642′ }}>📊 Stacked Rebate Calculation</h3>
            {[{label:'Oncor Utility Rebates',val:totals.oncor,color:'#F5E642'},{label:'Federal IRA Tax Credits',val:totals.ira,color:'#4ADE80'},{label:'City Program Rebates',val:totals.city,color:'#60A5FA'},{label:'Manufacturer Rebates',val:totals.mfr,color:'#C084FC'}].map(row => row.val > 0 && (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E2D42', fontSize: 14 }}>
                <span style={{ color: '#9BA8B8′ }}>{row.label}</span><span style={{ color: row.color, fontWeight: 600 }}>${row.val.toLocaleString()}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 20 }}>
              <span>Total Stacked Savings</span><span style={{ color: '#F5E642′ }}>${grand.toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 12, background: 'rgba(74,222,128,0.08)', borderRadius: 8, padding: 12, fontSize: 13, color: '#4ADE80′ }}>
              ✅ Apply for Oncor rebates through your contractor, then claim IRA credits on your tax return — these are independent programs and do not reduce each other.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
