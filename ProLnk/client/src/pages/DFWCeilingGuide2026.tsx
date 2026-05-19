import { useState } from 'react';

const issues = [
  { id: 'popcorn', label: '🍿 Popcorn Ceiling', recs: ['Homes built before 1978 may have asbestos in popcorn texture — test before disturbing', 'DIY asbestos test kit: ~$35, send sample to lab, results in 3-5 days', 'If negative for asbestos: wet and scrape with a 10-inch drywall knife', 'Mist section by section — do not soak, ceiling drywall will sag', 'After scraping: skim coat with joint compound for smooth ceiling trend', 'Prime with high-hide primer before paint — popcorn ghosts show through flat paint'] },
  { id: 'nailPop', label: '📌 Ceiling Nail Pops', recs: ['Ceiling nail pops are caused by attic humidity cycling — very common in DFW', 'Drive 1-5/8″ drywall screws 2″ on each side of the popped nail', 'Dimple screws slightly below surface, do not break paper', 'Fill with lightweight spackle, allow to fully dry — ceilings take longer than walls', 'Match existing texture before painting — ceiling texture is very visible', 'If pops appear across a large area, inspect attic insulation and ventilation'] },
  { id: 'waterStain', label: '💧 Water Stain', recs: ['DFW water stains: 60% roof flashing, 25% HVAC condensate, 15% upstairs plumbing', 'Do not paint over — identify source first or stain will reappear', 'After dry-out (use moisture meter, target under 12%): apply Zinsser BIN shellac primer', 'For crown-shaped stains, check roof valley and chimney flashing first', 'Center-of-room stains often indicate HVAC secondary drain pan overflowing', 'Roof inspection after any hail event — DFW averages 30+ hail days per year'] },
  { id: 'skylight', label: '☀️ Skylight Leak / Flashing', recs: ['Skylight leaks in DFW are almost always flashing failures, not the glass', 'DFW freeze-thaw cycles stress step flashing and counter flashing annually', 'Curb-mounted skylights fail at the curb-to-glass seal — inspect with binoculars', 'Re-caulking is temporary — proper fix requires new flashing kit', 'Velux and FAKRO have skylight flashing kits for DIY ($150-$400) — follow exactly', 'Replacement skylights: budget $600-$2,000 installed for standard sizes'] },
];

export default function DFWCeilingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = issues.find(i => i.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Ceiling Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW ceilings face unique stresses: popcorn texture from the building boom of the 1970s-80s, nail pops driven by attic humidity cycling, and water stains from the 30+ annual hail events that damage roofs across North Texas.
        </p>

        <div style={{ background: '#111d30', borderRadius: 10, padding: 20, marginBottom: 24, border: '1px solid #f87171′ }}>
          <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 8 }}>⚠️ Asbestos Warning — Read Before Touching Popcorn Ceilings</div>
          <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Popcorn (acoustic) ceilings installed before 1978 may contain asbestos. Disturbing asbestos-containing material without proper containment is hazardous and illegal in Texas without abatement certification. Always test first. An intact popcorn ceiling with no damage is considered safe to leave undisturbed.
          </p>
        </div>

        <div style={{ background: '#111d30', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📊 DFW Ceiling Issue Frequency</div>
          {[
            { issue: 'Nail pops from attic humidity cycling', freq: 85 },
            { issue: 'Water stains from roof or HVAC', freq: 70 },
            { issue: 'Popcorn ceiling removal requests', freq: 60 },
            { issue: 'Skylight flashing failures', freq: 25 },
          ].map(f => (
            <div key={f.issue} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: '#e2e8f0′ }}>{f.issue}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{f.freq}%</span>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 4, height: 6 }}>
                <div style={{ background: '#F5E642', width: `${f.freq}%`, height: '100%', borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🔍 Select Your Ceiling Issue</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {issues.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id === selected ? null : i.id)}
              style={{ background: selected === i.id ? '#F5E642′ : '#111d30', color: selected === i.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '14px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {i.label}
            </button>
          ))}
        </div>

        {current && (
          <div style={{ background: '#111d30', borderRadius: 10, padding: 20 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 14 }}>Repair Guide: {current.label}</h3>
            {current.recs.map((r, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 7px', fontWeight: 700, fontSize: 12, minWidth: 22, textAlign: 'center' }}>{idx + 1}</span>
                <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>{r}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
