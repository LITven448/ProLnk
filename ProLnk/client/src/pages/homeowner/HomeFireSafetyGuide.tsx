import { useState } from 'react';

interface SafetyItem {
  id: string;
  category: string;
  label: string;
  detail: string;
  points: number;
}

const safetyItems: SafetyItem[] = [
  { id: 's1', category: 'Smoke Detectors', label: 'Smoke detector in every bedroom', detail: 'Required in each sleeping room — not just hallways. Use ionization type for fast-flaming fires.', points: 10 },
  { id: 's2', category: 'Smoke Detectors', label: 'Smoke detector in each hallway', detail: 'At least one per level in the hallway outside bedrooms. Photoelectric type better for smoldering fires.', points: 8 },
  { id: 's3', category: 'Smoke Detectors', label: 'Detectors tested in last 6 months', detail: 'Press and hold the test button — alarm should sound within 5 seconds.', points: 8 },
  { id: 's4', category: 'Smoke Detectors', label: 'No detector older than 10 years', detail: 'The sensor degrades after 10 years. Check manufacture date on back of unit.', points: 7 },
  { id: 's5', category: 'CO Detectors', label: 'CO detector near sleeping areas', detail: 'Carbon monoxide is odorless — detector must be within 15 feet of each sleeping area.', points: 10 },
  { id: 's6', category: 'CO Detectors', label: 'CO detector on each level with gas appliances', detail: 'Any level with a furnace, water heater, stove, or attached garage needs CO detection.', points: 8 },
  { id: 's7', category: 'Fire Extinguishers', label: 'ABC extinguisher on each floor', detail: 'Minimum 2.5 lb ABC extinguisher — one per level. Mount near exit, not next to stove.', points: 10 },
  { id: 's8', category: 'Fire Extinguishers', label: 'Kitchen has Type K or ABC extinguisher', detail: 'Grease fires need Type K or ABC — NEVER use water. Mount within reach but away from stove.', points: 8 },
  { id: 's9', category: 'Fire Extinguishers', label: 'Extinguishers inspected in last 12 months', detail: 'Check pressure gauge is in green zone. Replace any extinguisher over 12 years old.', points: 5 },
  { id: 's10', category: 'Escape Plan', label: '2 exits identified for each bedroom', detail: 'Every bedroom should have a window as secondary exit. Test that it opens fully.', points: 10 },
  { id: 's11', category: 'Escape Plan', label: 'Outdoor meeting point established', detail: 'Everyone in the household knows the designated meeting spot — neighbor’s mailbox, street sign, etc.', points: 7 },
  { id: 's12', category: 'Escape Plan', label: 'Escape plan practiced in last 12 months', detail: 'Walk through the plan at night (eyes closed or blindfolded) — smoke reduces visibility to near zero.', points: 8 },
  { id: 's13', category: 'Electrical', label: 'No overloaded power strips or extension cords', detail: 'Extension cords are temporary — not permanent wiring. Never daisy-chain power strips.', points: 8 },
  { id: 's14', category: 'Electrical', label: 'GFCI outlets in kitchen, bathrooms, garage', detail: 'GFCI protects against shock and arc faults. Test monthly by pressing the test button.', points: 7 },
  { id: 's15', category: 'Electrical', label: 'No warm/discolored outlets or switch plates', detail: 'Warm outlets indicate arcing or overload — call an electrician immediately.', points: 7 },
];

const categories = [...new Set(safetyItems.map(i => i.category))];
const categoryColors: Record<string, string> = {
  'Smoke Detectors': '#F59E0B',
  'CO Detectors': '#8B5CF6',
  'Fire Extinguishers': '#EF4444',
  'Escape Plan': '#3B82F6',
  'Electrical': '#22C55E',
};

export default function HomeFireSafetyGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const earnedPoints = safetyItems.filter(i => checked[i.id]).reduce((sum, i) => sum + i.points, 0);
  const totalPoints = safetyItems.reduce((sum, i) => sum + i.points, 0);
  const pct = Math.round((earnedPoints / totalPoints) * 100);

  function getGrade(): { grade: string; color: string; label: string } {
    if (pct >= 90) return { grade: 'A', color: '#22C55E', label: 'Fire Ready' };
    if (pct >= 75) return { grade: 'B', color: '#84CC16', label: 'Mostly Prepared' };
    if (pct >= 60) return { grade: 'C', color: '#F59E0B', label: 'Moderate Risk' };
    if (pct >= 40) return { grade: 'D', color: '#F97316', label: 'High Risk' };
    return { grade: 'F', color: '#EF4444', label: 'Serious Danger' };
  }

  const grade = getGrade();

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#F1F5F9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: '#EF4444', fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>DFW Home Safety</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
            🔥 DFW Home Fire Safety Guide
          </h1>
          <p style={{ fontSize: 20, color: '#FCA5A5', fontWeight: 700, margin: '0 0 12px' }}>8 Minutes Is All You Have</p>
          <p style={{ fontSize: 16, color: '#94A3B8', margin: 0 }}>
            The average house fire gives occupants 8 minutes to escape safely. DFW sees <strong style={{ color: '#F1F5F9′ }}>6,400+ home fires annually</strong>. 
            Take this assessment to see how prepared your home is.
          </p>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '⏱️', stat: '8 min', label: 'Avg escape window once smoke detected' },
            { icon: '🏠', stat: '6,400+', label: 'DFW home fires per year' },
            { icon: '💀', stat: '2/3', label: 'Fire deaths — no working smoke alarm' },
            { icon: '🌿', stat: '40%', label: 'Fires start in kitchen' },
          ].map(item => (
            <div key={item.stat} style={{ background: '#1E2D45', borderRadius: 10, padding: 20, textAlign: 'center', border: '1px solid #2D3F5A' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#EF4444', marginBottom: 4 }}>{item.stat}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Checklist by Category */}
        {categories.map(cat => (
          <div key={cat} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px', color: categoryColors[cat], borderBottom: `2px solid ${categoryColors[cat]}33`, paddingBottom: 8 }}>
              {cat}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {safetyItems.filter(i => i.category === cat).map(item => (
                <div
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  style={{ background: checked[item.id] ? 'rgba(34,197,94,0.08)' : '#1E2D45', border: `1px solid ${checked[item.id] ? '#22C55E' : '#2D3F5A'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'flex-start' }}
                >
                  <div style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${checked[item.id] ? '#22C55E' : '#4B5563'}`, background: checked[item.id] ? '#22C55E' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, color: '#fff', fontWeight: 800, fontSize: 14 }}>
                    {checked[item.id] ? '✓' : ''}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: checked[item.id] ? '#86EFAC' : '#F1F5F9', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ color: categoryColors[cat], fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>+{item.points} pts</div>
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Score */}
        <div style={{ background: '#1E3A5F', borderRadius: 16, padding: 32, marginBottom: 48, border: `2px solid ${grade.color}`, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 80, fontWeight: 900, color: grade.color, lineHeight: 1 }}>{grade.grade}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: grade.color }}>{grade.label}</div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{earnedPoints}/{totalPoints} points ({pct}%)</div>
            <div style={{ background: '#0A1628', borderRadius: 999, height: 12, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ height: '100%', width: `${pct}%`, background: grade.color, borderRadius: 999, transition: 'width 0.4s' }} />
            </div>
            <p style={{ color: '#94A3B8', margin: 0, fontSize: 15, lineHeight: 1.6 }}>
              {pct < 75 ? 'Address unchecked items before the next fire season. DFW has high electrical fire risk due to heat-stressed wiring in older homes.' : 'Great job! Review unchecked items and schedule any needed professional work.'}
            </p>
          </div>
        </div>

        {/* DFW Wildfire Note */}
        <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 12, padding: 24, marginBottom: 48 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#FB923C', margin: '0 0 12px' }}>🌿 DFW Wildfire Interface Risk</h3>
          <p style={{ color: '#CBD5E1', margin: '0 0 12px', fontSize: 15, lineHeight: 1.7 }}>
            Homes in outer DFW suburbs — <strong style={{ color: '#F1F5F9′ }}>Celina, Prosper, Aubrey, Forney, Waxahachie, and rural edges</strong> — sit in the 
            Wildland-Urban Interface (WUI). During dry summers, grass fires can reach these neighborhoods in minutes.
          </p>
          <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#94A3B8', fontSize: 14, lineHeight: 2 }}>
            <li>Keep grass mowed within 30 feet of structure</li>
            <li>Remove dead vegetation and wood piles from against house</li>
            <li>Metal screens on vents prevent ember entry</li>
            <li>Know 2 evacuation routes — fire can cut off one route fast</li>
            <li>Sign up for Wireless Emergency Alerts in your county</li>
          </ul>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '32px', background: 'linear-gradient(135deg, #1E3A5F, #1a2a4a)', borderRadius: 16, border: '1px solid #2D4A7A' }}>
          <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 12px' }}>Fix Fire Safety Issues Now</h3>
          <p style={{ color: '#94A3B8', margin: '0 0 24px' }}>Electricians, fire safety inspectors, and smoke detector installation pros — all available through ProLnk.</p>
          <a href="/get-quotes" style={{ display: 'inline-block', padding: '14px 32px', background: '#EF4444', color: '#fff', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>
            Get Safety Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}
