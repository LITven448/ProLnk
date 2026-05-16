import { useState } from 'react';

const homeTypes = [
  { label: '🏡 Pre-2000 single-family home', base: 20 },
  { label: '🏢 Post-2000 construction', base: 55 },
  { label: '🏘️ Townhome / condo', base: 40 },
  { label: '🏚️ Manufactured / mobile home', base: 10 },
];

const upgrades = [
  { label: '✅ Insulated exterior pipes', pts: 15 },
  { label: '✅ Whole-home generator installed', pts: 20 },
  { label: '✅ Know main water shutoff location', pts: 10 },
  { label: '✅ Battery-backup heat source', pts: 15 },
  { label: '✅ 5+ days emergency food + water stored', pts: 10 },
  { label: '✅ Smart thermostat with remote monitoring', pts: 10 },
];

export default function DFWTexasFreezeLessons2026() {
  const [homeIdx, setHomeIdx] = useState<number | null>(null);
  const [checked, setChecked] = useState<boolean[]>(new Array(upgrades.length).fill(false));

  const toggle = (i: number) => setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  const base = homeIdx !== null ? homeTypes[homeIdx].base : 0;
  const bonus = upgrades.reduce((sum, u, i) => sum + (checked[i] ? u.pts : 0), 0);
  const score = Math.min(base + bonus, 100);
  const grade = score >= 85 ? '🟢 Uri-Ready' : score >= 60 ? '🟡 Improving' : '🔴 At Risk';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Home Resilience · 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>❄️ Texas Winter Storm Uri — 5 Years Later</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>Uri (Feb 2021) killed 246 Texans and caused $195B in damage. Five years on, here's how DFW homeowners have adapted — and what you still need to do.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['🌡️','-2°F','DFW low during Uri — lowest since 1989'],['💧','~12M','Texas residents without water during Uri'],['🔧','1 in 3','DFW homes had burst pipes (Tarrant Co.)'],['⚡','Days','Average outage in DFW: 3.2 days']].map(([icon,label,val]) => (
            <div key={label} style={{ background: '#111C30', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{label}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏠 Step 1: Select Your Home Type</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {homeTypes.map((h, i) => (
            <button key={i} onClick={() => setHomeIdx(i)} style={{ background: homeIdx === i ? '#1E3A5F' : '#111C30', border: `2px solid ${homeIdx === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '0.9rem', color: '#E8EAF6', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>{h.label}</button>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🛡️ Step 2: Mark Your Upgrades</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {upgrades.map((u, i) => (
            <button key={i} onClick={() => toggle(i)} style={{ background: checked[i] ? '#1E3A5F' : '#111C30', border: `2px solid ${checked[i] ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '0.75rem', color: '#E8EAF6', cursor: 'pointer', textAlign: 'left' }}>{u.label} <span style={{ color: '#F5E642', float: 'right' }}>+{u.pts}pts</span></button>
          ))}
        </div>

        {homeIdx !== null && (
          <div style={{ background: '#111C30', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#F5E642' }}>{score}/100</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: 4 }}>{grade}</div>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: 8 }}>Connect with DFW insulation, generator, or plumbing pros on ProLnk to boost your score.</p>
          </div>
        )}
      </div>
    </div>
  );
}