import { useState } from 'react';

const situations = [
  { id: 'refrigerant', label: 'Verify refrigerant charge', guide: 'Use manifold gauge set: check high-side and low-side pressures against manufacturer spec at actual outdoor temperature. DFW summer installs must be done above 65°F outdoor temp for accurate readings. Target: superheat 8-14°F (TXV systems) or subcooling 10-15°F. Document readings in startup report.' },
  { id: 'tempdiff', label: 'Temperature differential test', guide: 'Measure supply air temp at register closest to air handler vs return air temp. DFW target: 15-20°F differential with system running 15 minutes. Below 12°F = possible low charge or airflow problem. Above 22°F = possible airflow restriction (dirty filter, closed registers, undersized ducts).' },
  { id: 'static', label: 'Static pressure reading', guide: 'Total external static pressure should be under 0.5 inches water column for most residential systems. DFW attic duct systems frequently exceed 0.8 w.c. — this strains the blower motor and reduces efficiency 15-30%. Installer should measure and document at startup. High static = duct design problem.' },
  { id: 'vents', label: 'Vent and airflow check', guide: 'All supply registers open and unobstructed — confirm airflow at each register. Return air path clear and unblocked. DFW homes often have only 1-2 return registers — if undersized, house will pressurize, causing doors to swing and air infiltration. Check for furniture blocking returns.' },
  { id: 'condensate', label: 'Condensate drain test', guide: 'Pour water into primary drain pan — verify it flows out. Check secondary drain pan (if attic install) is dry. DFW humidity causes condensate systems to clog within the first summer if not properly sloped and treated. Ask installer to add condensate treatment tablet. Float switch should shut system if pan fills.' },
  { id: 'permit', label: 'Permit and inspection status', guide: 'Verify mechanical permit was pulled before install (ask for permit number). City inspector must verify electrical connections, refrigerant certification, and duct sealing. DFW cities: Frisco, Plano, McKinney require inspection before system is commissioned. Failed inspection = rework at contractor cost.' },
];

export default function DFWHVACPostInstallCheck2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '1px', textTransform: 'uppercase' }}>ProLnk DFW Guide · HVAC</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>DFW HVAC Post-Installation Inspection Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '32px' }}>What to check after your new DFW HVAC system is installed. Select a post-install situation below.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{ padding: '14px 16px', borderRadius: '10px', border: '2px solid', borderColor: selected === s.id ? '#F5E642′ : '#1e3a5f', backgroundColor: selected === s.id ? '#F5E64220' : '#0d1f3c', color: '#ffffff', cursor: ’pointer', textAlign: 'left', fontSize: '14px', fontWeight: 600, transition: 'all 0.2s' }}>
              🌡️ {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#0d1f3c', border: '2px solid #F5E642', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Inspection Checklist</div>
            <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>🌡️ {active.label}</h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{active.guide}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#0d1f3c', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#F5E642′ }}>📋 Day-1 Post-Install Checklist</h2>
          {['Manifold gauge readings documented by installer','Temperature differential 15-20°F confirmed','Static pressure under 0.5″ w.c.','All registers open and flowing','Condensate drain flowing freely','Permit inspection scheduled'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <span style={{ color: '#F5E642′ }}>✅</span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#0d1f3c', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>🌡️</div>
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>HVAC install concerns in DFW?</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>ProLnk connects DFW homeowners with verified HVAC pros who document every install step.</div>
          <a href="/" style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>Get Matched Free →</a>
        </div>
      </div>
    </div>
  );
}
