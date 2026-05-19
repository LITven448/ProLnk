import { useState } from 'react';

const scenarios = [
  { id: 'filter', label: '🧱 Dirty / clogged filter', fix: ['Turn AC to FAN ONLY mode (not cool) — no more cooling load on coils', 'Let ice fully thaw — takes 1-4 hours in DFW heat', 'Replace filter immediately — use MERV 8-11 for DFW dust', 'Turn back to COOL and monitor for refreezing'] },
  { id: 'refrigerant', label: '🧪 Low refrigerant', fix: ['Turn system completely OFF at thermostat', 'Let unit thaw for 2-4 hours', 'Do NOT add refrigerant yourself — EPA requires licensed tech', 'Call a pro to check for leaks and recharge'] },
  { id: 'vents', label: '🚪 Blocked vents', fix: ['Turn off AC, let thaw completely', 'Open ALL supply vents — even in unused rooms', 'Move furniture blocking return air vents', 'DFW homes often have too few return air paths — ask pro to evaluate'] },
  { id: 'blower', label: '💨 Blower motor issue', fix: ['Turn system OFF completely', 'Do not run AC — motor may overheat and fail', 'Call an HVAC tech — blower replacement is $300-800', 'Let thaw before tech arrives'] },
];

export default function DFWACFreezingUpGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = scenarios.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>🧊 DFW AC Freezing Up Guide — 2026</h1>
          <p style={{ margin: '8px 0 0', fontWeight: 600 }}>Ironic in Texas heat — but freezing evaporator coils are common. Here's why and how to fix it.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>❄️ Signs Your AC Is Freezing Up</h2>
          {['Ice visible on copper refrigerant lines outside', 'Ice on indoor evaporator coil (in air handler)', 'AC runs but no cool air coming out', 'Water dripping / flooding around indoor unit', 'System short-cycling (turns on and off rapidly)'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642' }}>❄️</span>
              <span style={{ color: '#cdd9e5' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🔍 What caused your freeze-up?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {scenarios.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '14px 18px', fontSize: 15, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ marginTop: 20, background: '#0d1f3c', borderRadius: 8, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>Fix Guide</h3>
              {active.fix.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
                  <span style={{ color: '#F5E642', fontWeight: 800, minWidth: 24 }}>{i + 1}.</span>
                  <span style={{ color: '#cdd9e5' }}>{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🛑 Never Do This When AC Is Frozen</h2>
          {['Do NOT run AC in COOL mode while frozen — compressor damage', 'Do NOT chip away ice — damages coils', 'Do NOT ignore it — it will get worse and flood your home'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f', color: '#ff6b6b', fontWeight: 600 }}>❌ {item}</div>
          ))}
          <div style={{ marginTop: 20, background: '#F5E642', borderRadius: 8, padding: 16, textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>Need a DFW HVAC tech? ProLnk has you covered.</div>
          </div>
        </div>
      </div>
    </div>
  );
}