import { useState } from 'react';

export default function DFWHomeOwnerPriorityMatrix2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<Array<{ need: string; tier: string; reason: string; icon: string; color: string }> | null>(null);

  const allNeeds: Record<string, { tier: number; label: string; reason: string; icon: string }> = {
    co_detector: { tier: 1, label: 'CO Detector Missing/Expired', reason: 'Life safety. Replace immediately — 5-yr lifespan. Texas law requires in homes with gas appliances.', icon: '🚨' },
    electrical_hazard: { tier: 1, label: 'Electrical Hazard (sparks, burning smell)', reason: 'Fire risk. Call electrician same day. Do not ignore sparks, tripping breakers, or burning smells.', icon: '⚡' },
    roof_leak: { tier: 2, label: 'Active Roof Leak', reason: 'Habitability. Water intrusion causes mold within 48 hrs in DFW humidity. Emergency roof tarping + repair.', icon: '🏗️' },
    hvac_failure: { tier: 2, label: 'HVAC Failure (summer)', reason: 'Habitability. DFW summer (100°F+) makes HVAC failure a health emergency for elderly/children. Priority 1 in June-Sept.', icon: '❄️' },
    plumbing_burst: { tier: 2, label: 'Burst Pipe / No Water', reason: 'Habitability. Shut main valve immediately. Call plumber same day. DFW rare freeze events cause mass burst pipes.', icon: '🔧' },
    foundation_crack: { tier: 3, label: 'Foundation Crack (new)', reason: 'Structural. Document with photos. Get engineer assessment within 30 days. DFW clay soil makes this common.', icon: '🏠' },
    roof_aging: { tier: 3, label: 'Aging Roof (15+ years)', reason: 'Structural. Schedule inspection. DFW hail accelerates aging — plan replacement before active leak develops.', icon: '🏚️' },
    paint_fading: { tier: 4, label: 'Exterior Paint Fading', reason: 'Cosmetic. Schedule when budget allows. DFW UV intensity fades paint faster — repaint every 5-7 years.', icon: '🎨' },
    landscape: { tier: 4, label: 'Landscaping / Curb Appeal', reason: 'Cosmetic. Lowest urgency. Address after all safety/structural issues resolved.', icon: '🌳' },
  };

  const tierConfig: Record<number, { label: string; color: string; desc: string }> = {
    1: { label: 'Tier 1: Safety', color: '#ff4444', desc: 'Act immediately — life or fire risk' },
    2: { label: 'Tier 2: Habitability', color: '#ff8800', desc: 'Act within 24-72 hours' },
    3: { label: 'Tier 3: Structural', color: '#F5E642', desc: 'Act within 30-90 days' },
    4: { label: 'Tier 4: Cosmetic', color: '#22cc66', desc: 'Schedule when budget allows' },
  };

  const handlePrioritize = () => {
    if (selected.length === 0) return;
    const results = selected
      .map((key) => ({ key, ...allNeeds[key] }))
      .sort((a, b) => a.tier - b.tier)
      .map((item) => ({
        need: item.label,
        tier: tierConfig[item.tier].label,
        reason: item.reason,
        icon: item.icon,
        color: tierConfig[item.tier].color,
      }));
    setPriorities(results);
  };

  const toggleNeed = (key: string) => {
    setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
    setPriorities(null);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Homeowner Priority Matrix 2026</h1>
        <p style={{ color: '#8899aa', marginBottom: 24 }}>Competing home needs? Use the DFW priority framework — safety first, cosmetic last.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {Object.entries(tierConfig).map(([tier, cfg]) => (
            <div key={tier} style={{ background: '#132240', borderRadius: 10, padding: '14px 16px', borderLeft: `4px solid ${cfg.color}` }}>
              <div style={{ fontWeight: 700, color: cfg.color, fontSize: 14 }}>{cfg.label}</div>
              <div style={{ color: '#8899aa', fontSize: 12, marginTop: 2 }}>{cfg.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Priority Matrix Tool</div>
          <div style={{ color: '#8899aa', fontSize: 13, marginBottom: 16 }}>Select all issues your home has — get prioritized order of action.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {Object.entries(allNeeds).map(([key, need]) => (
              <button key={key} onClick={() => toggleNeed(key)}
                style={{ background: selected.includes(key) ? '#F5E642' : '#0A1628', color: selected.includes(key) ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: 600 }}>
                {need.icon} {need.label}
              </button>
            ))}
          </div>
          <button onClick={handlePrioritize}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', fontSize: 15 }}>
            Get Priority Order
          </button>
          {priorities && (
            <div style={{ marginTop: 20 }}>
              {priorities.map((p, i) => (
                <div key={p.need} style={{ background: '#0A1628', borderRadius: 8, padding: '14px', marginBottom: 10, borderLeft: `4px solid ${p.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 800, color: p.color }}>#{i + 1}</span>
                    <span style={{ fontWeight: 700 }}>{p.need}</span>
                  </div>
                  <div style={{ color: '#8899aa', fontSize: 12, marginBottom: 4 }}>{p.tier}</div>
                  <div style={{ color: '#cdd9e5', fontSize: 13 }}>{p.reason}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>ProLnk Covers All 4 Priority Tiers</div>
          <div style={{ fontSize: 14 }}>Emergency pros for Tier 1-2. Vetted specialists for Tier 3-4. One platform for all your DFW home needs.</div>
        </div>
      </div>
    </div>
  );
}