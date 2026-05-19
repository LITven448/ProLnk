import { useState } from 'react';

const situations = [
  { id: 'doors', label: 'Doors and windows sticking', guide: 'Some door and window binding is normal in the 30-90 days after DFW foundation repair. DFW clay soil takes time to consolidate and equalize moisture content around new piers. If binding persists past 90 days or gets worse, request a re-level check. Document: which doors, which direction they bind, and when you first noticed.' },
  { id: 'cracks', label: 'New or returning cracks', guide: 'Photograph all existing cracks with a ruler before repair, then again at 30, 60, and 90 days. Hairline cracks (under 1/16″) are cosmetic and may appear as the structure settles to new pier positions. Cracks wider than 1/4″, cracks that were repaired and reopened, or stair-step cracks in brick that grow indicate re-movement — call your contractor.' },
  { id: 'settling', label: 'Soil consolidation period', guide: 'DFW clay soil around piers consolidates for 60-180 days after installation. During this period, you may notice minor creaking, seasonal shifting as soil moisture changes, and slight variations in floor level readings. This is normal. Avoid overwatering around the foundation during this period — DFW clay swells dramatically with excess moisture.' },
  { id: 'relevel', label: '6-month re-level check', guide: 'Most reputable DFW foundation companies include a 6-month re-level in their warranty. Schedule it at month 5-6 — before warranty period closes. Bring your pre-repair floor level readings if you have them. DFW soil movement is seasonal; a summer repair may read differently in January after rain season.' },
  { id: 'warranty', label: 'Warranty documentation', guide: 'Store warranty documentation in your Home Health Vault immediately after repair. DFW foundation warranties vary: lifetime transferable (best), 10-year (standard), or 2-year (avoid). Confirm what voids the warranty — improper drainage is the most common DFW warranty dispute. Grading must drain away from foundation; gutter downspouts must extend 4+ feet.' },
];

export default function DFWFoundationPostRepairCheck2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '1px', textTransform: 'uppercase' }}>ProLnk DFW Guide · Foundation</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>DFW Foundation Post-Repair Inspection Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '32px' }}>What to monitor after DFW foundation repair. Select a post-repair situation below.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{ padding: '14px 16px', borderRadius: '10px', border: '2px solid', borderColor: selected === s.id ? '#F5E642′ : '#1e3a5f', backgroundColor: selected === s.id ? '#F5E64220' : '#0d1f3c', color: '#ffffff', cursor: ’pointer', textAlign: 'left', fontSize: '14px', fontWeight: 600, transition: 'all 0.2s' }}>
              🏗️ {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#0d1f3c', border: '2px solid #F5E642', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Monitoring Guide</div>
            <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>🏗️ {active.label}</h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{active.guide}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#0d1f3c', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#F5E642′ }}>📅 DFW Post-Repair Monitoring Timeline</h2>
          {[{t:'Day 1',a:'Photograph all cracks with ruler and date stamp'},{t:'Day 30',a:'Document door/window operation'},{t:'Day 60',a:'Second crack photo series'},{t:'Day 90',a:'Third crack series — flag growth > 1/16″'},{t:'Month 6',a:'Schedule warranty re-level check'},{t:'Annual',a:'Drainage inspection around foundation'}].map((r,i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', padding: '10px 0', borderBottom: '1px solid #1e3a5f', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '13px', minWidth: '64px' }}>{r.t}</span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{r.a}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#0d1f3c', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>🏠</div>
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>Foundation concerns in DFW?</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>ProLnk matches DFW homeowners with verified foundation specialists who include re-level warranties.</div>
          <a href="/" style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>Get Matched Free →</a>
        </div>
      </div>
    </div>
  );
}
