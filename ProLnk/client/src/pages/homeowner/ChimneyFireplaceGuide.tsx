import { useState } from 'react';

const checklistItems = [
  { id: 'inspection', label: 'Annual chimney inspection', urgencyMonths: 12 },
  { id: 'sweep', label: 'Chimney sweep (wood-burning)', urgencyMonths: 12 },
  { id: 'gasService', label: 'Gas fireplace / log set service', urgencyMonths: 12 },
  { id: 'capCheck', label: 'Chimney cap checked for animal nests', urgencyMonths: 6 },
  { id: 'coDetector', label: 'CO detector tested within 15 ft', urgencyMonths: 1 },
  { id: 'damper', label: 'Damper operation confirmed', urgencyMonths: 12 },
  { id: 'crownCheck', label: 'Crown and mortar inspected after storm', urgencyMonths: 6 },
];

function monthsSince(dateStr: string) {
  if (!dateStr) return 9999;
  const d = new Date(dateStr);
  const now = new Date();
  return (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
}

export default function ChimneyFireplaceGuide() {
  const [dates, setDates] = useState<Record<string, string>>({});
  const [score, setScore] = useState<{ level: string; color: string; items: string[] } | null>(null);

  function evaluate() {
    const overdue: string[] = [];
    const ok: string[] = [];
    checklistItems.forEach(item => {
      const ms = monthsSince(dates[item.id] || '');
      if (ms > item.urgencyMonths) overdue.push(item.label);
      else ok.push(item.label);
    });
    const pct = ok.length / checklistItems.length;
    let level = 'Low Risk';
    let color = '#4ade80';
    if (pct < 0.5) { level = 'High Risk — Action Required'; color = '#f87171'; }
    else if (pct < 0.8) { level = 'Moderate Risk'; color = '#fbbf24'; }
    setScore({ level, color, items: overdue });
  }

  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh', color: '#e8eaf0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #3e1a00 0%, #7c2d00 50%, #0a0f1e 100%)', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔥</div>
        <h1 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, margin: '0 0 16px', color: '#fff' }}>
          DFW Chimney and Fireplace Guide
        </h1>
        <p style={{ fontSize: 18, color: '#fed7aa', maxWidth: 560, margin: '0 auto' }}>
          Safety and Efficiency — Even in Mild DFW Winters
        </p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px' }}>

        {/* Reality Check */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fb923c', marginBottom: 16 }}>🏠 DFW Fireplace Reality</h2>
          <div style={{ background: '#1a0e00', border: '1px solid #7c2d00', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#fed7aa', lineHeight: 1.7, margin: 0 }}>
              <strong>70% of DFW homes</strong> have decorative fireplaces that go years — sometimes decades — without a professional inspection. Because DFW winters are mild, most homeowners assume chimneys don't need maintenance. They’re wrong. Infrequently used chimneys attract animals, collect moisture damage, and develop blockages that can be fatal when the fireplace is finally turned on.
            </p>
          </div>
        </section>

        {/* Why Inspection Matters */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fb923c', marginBottom: 16 }}>⚠️ Why DFW Chimneys Still Need Annual Inspection</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
            {[
              { icon: '🐦', title: 'Bird Nests', desc: 'Starlings and sparrows nest in chimneys spring through fall — blocking flue and creating fire risk.' },
              { icon: '🦝', title: 'Animal Intrusion', desc: 'Raccoons and squirrels enter chimneys for warmth, causing blockages and structural damage to liners.' },
              { icon: '🌩️', title: 'Storm Mortar Damage', desc: 'Texas severe storms crack chimney crowns and chase covers — inviting water infiltration year-round.' },
              { icon: '🔵', title: 'Gas Log Maintenance', desc: 'Gas fireplace logs need annual service even if used only a few times per year — pilot, burner, and damper degrade.' },
            ].map(r => (
              <div key={r.title} style={{ background: '#111827', border: '1px solid #2d1810', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{r.icon}</div>
                <div style={{ fontWeight: 700, color: '#fb923c', marginBottom: 6 }}>{r.title}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Fireplace Types */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fb923c', marginBottom: 16 }}>🪵 Types of DFW Fireplaces</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              {
                type: 'Wood-Burning Masonry',
                icon: '🪵',
                service: 'Annual sweep + Level II inspection',
                cost: '$150–$300',
                notes: 'Use only seasoned hardwood — never pine or green wood. Creosote buildup at more than ⅛" thick is a fire risk requiring immediate sweep.',
              },
              {
                type: 'Gas Log Set (Vented)',
                icon: '🔵',
                service: 'Annual inspection by fireplace tech',
                cost: '$100–$200',
                notes: 'Technician checks pilot, burner, gas logs alignment, and damper operation. Vented logs require an open damper — never run sealed.',
              },
              {
                type: 'Gas Insert (Sealed)',
                icon: '♨️',
                service: 'Annual inspection by HVAC or fireplace tech',
                cost: '$100–$200',
                notes: 'Highly efficient — converts masonry fireplace into real heat source. Sealed combustion means safer operation but still requires annual service.',
              },
              {
                type: 'Electric Fireplace',
                icon: '💡',
                service: 'No chimney maintenance needed',
                cost: 'Clean as needed',
                notes: 'No combustion, no flue, no sweep required. Clean the glass and check the heating element annually.',
              },
            ].map(fp => (
              <div key={fp.type} style={{ background: '#111827', border: '1px solid #2d1810', borderRadius: 12, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 32, flexShrink: 0 }}>{fp.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#fb923c', marginBottom: 4 }}>{fp.type}</div>
                  <div style={{ fontSize: 13, color: '#60a5fa', marginBottom: 6 }}>{fp.service} · <strong style={{ color: '#4ade80′ }}>{fp.cost}</strong></div>
                  <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{fp.notes}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Problems */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fb923c', marginBottom: 16 }}>🔎 Common DFW Chimney Problems</h2>
          <div style={{ background: '#111827', border: '1px solid #2d1810', borderRadius: 12, padding: 24 }}>
            {[
              { icon: '⬛', prob: 'Creosote Buildup', fix: 'Annual sweep required when buildup exceeds ⅛". Third-degree creosote is glazed and extremely difficult to remove — can cost $1,000+ to treat.' },
              { icon: '🌧️', prob: 'Cracked Crown', fix: 'Rain enters and freezes in mortar joints, accelerating deterioration. Repair cost: $300–$800. Replacement: $1,000–$2,500.' },
              { icon: '🐿️', prob: 'Animal Nesting', fix: 'Install a stainless chimney cap with screen — standard solution, $100–$200 installed. Most pros include this in annual service.' },
              { icon: '💨', prob: 'Failed Damper', fix: 'A stuck-open damper wastes conditioned air year-round. In DFW this can add $15–$30/month to energy bills. Replacement: $200–$400.' },
            ].map(item => (
              <div key={item.prob} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid #1e2d40′ }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#fca5a5', marginBottom: 4 }}>{item.prob}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{item.fix}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CO Warning */}
        <section style={{ marginTop: 40 }}>
          <div style={{ background: '#1a0a0a', border: '2px solid #dc2626', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>☠️</span>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#f87171′ }}>Carbon Monoxide Warning</h3>
            </div>
            <p style={{ color: '#fca5a5', margin: 0, lineHeight: 1.6 }}>
              Gas fireplaces <strong>must have working CO detectors within 15 feet</strong>. If your gas fireplace produces a <strong>yellow or orange flame</strong> (it should always burn blue), turn it off immediately and call a licensed technician — do not use it again until inspected. Yellow flame indicates incomplete combustion and CO production.
            </p>
          </div>
        </section>

        {/* Interactive Checklist */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fb923c', marginBottom: 8 }}>✅ Maintenance Checklist + Urgency Score</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Enter the date you last completed each task. Leave blank if never done.</p>
          <div style={{ background: '#111827', border: '1px solid #2d1810', borderRadius: 12, padding: 28 }}>
            {checklistItems.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e2d40', flexWrap: 'wrap', gap: 8 }}>
                <label style={{ fontSize: 14, color: '#e2e8f0', flex: 1 }}>{item.label}</label>
                <input
                  type="date"
                  value={dates[item.id] || ''}
                  onChange={e => setDates(prev => ({ ...prev, [item.id]: e.target.value }))}
                  style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '8px 10px', color: '#e2e8f0', fontSize: 13 }}
                />
              </div>
            ))}
            <button
              onClick={evaluate}
              style={{ marginTop: 20, background: '#c2410c', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}
            >
              Get My Urgency Score
            </button>
            {score && (
              <div style={{ marginTop: 20, background: '#0f172a', border: `2px solid ${score.color}`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: score.color, marginBottom: 8 }}>{score.level}</div>
                {score.items.length > 0 ? (
                  <>
                    <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Overdue tasks:</div>
                    {score.items.map(i => (
                      <div key={i} style={{ fontSize: 13, color: '#fca5a5', padding: '4px 0′ }}>• {i}</div>
                    ))}
                  </>
                ) : (
                  <div style={{ fontSize: 14, color: '#4ade80′ }}>All maintenance tasks are current. Great job keeping your chimney safe!</div>
                )}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
