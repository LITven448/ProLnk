import { useState } from 'react';

type Config = { age: string; foundation: string };

const ages = ['Under 10 yrs', '10–25 yrs', '25+ yrs'];
const foundations = ['Slab', 'Pier & Beam', 'Crawl Space'];

function getGuide(cfg: Config): { icon: string; task: string; urgency: string }[] {
  const isOld = cfg.age === '25+ yrs';
  const isMid = cfg.age === '10–25 yrs';
  const isPier = cfg.foundation === 'Pier & Beam';
  const isCrawl = cfg.foundation === 'Crawl Space';

  const base = [
    { icon: '🚪', task: 'Check all interior doors — sticky doors signal foundation shift', urgency: 'High' },
    { icon: '🔍', task: 'Walk perimeter — look for new cracks wider than 1/4 inch', urgency: 'High' },
    { icon: '💧', task: 'Set soaker hoses 18 inches from foundation — soil is dry', urgency: 'High' },
    { icon: '🌿', task: 'Trim tree roots — DFW clay soil shrinks when roots pull moisture', urgency: 'Medium' },
    { icon: '📐', task: 'Check floors for slope with a level — 1 inch over 10 ft = concern', urgency: 'Medium' },
  ];

  if (isOld || isMid) base.push({ icon: '👷', task: 'Get licensed engineer assessment — not just a repair company', urgency: 'High' });
  if (isOld) base.push({ icon: '📸', task: 'Document all cracks with photos and dates for insurance', urgency: 'High' });
  if (isPier) base.push({ icon: '🔩', task: 'Inspect pier blocks and beams for rot or settlement', urgency: 'High' });
  if (isCrawl) base.push({ icon: '💨', task: 'Check crawl space ventilation — moisture buildup damages beams', urgency: 'High' });

  return base;
}

export default function DFWSpringFoundationCheck2026() {
  const [age, setAge] = useState<string | null>(null);
  const [foundation, setFoundation] = useState<string | null>(null);

  const guide = age && foundation ? getGuide({ age, foundation }) : null;

  const urgencyColor: Record<string, string> = { High: '#F5E642', Medium: '#FFA500', Low: '#4CAF50′ };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Spring Foundation Check 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Spring is the best window to assess your foundation — before summer drought stresses DFW clay soil again.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ Why Spring Matters for DFW Foundations</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ color: '#cbd5e1′ }}>🧱 DFW expansive clay soil moves with moisture — spring rains re-hydrate it</li>
            <li style={{ color: '#cbd5e1′ }}>☀️ Summer drought will shrink soil again — assess now while stable</li>
            <li style={{ color: '#cbd5e1′ }}>🚪 Sticking doors or windows = first warning sign of shift</li>
            <li style={{ color: '#cbd5e1′ }}>👷 Engineer inspection ≠ repair company — get independent assessment first</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 12 }}>Home age + foundation type → spring assessment guide</h2>

        <div style={{ marginBottom: 16 }}>
          <p style={{ color: '#94a3b8', marginBottom: 8 }}>Home age:</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {ages.map(a => (
              <button key={a} onClick={() => setAge(a)}
                style={{ padding: '9px 18px', borderRadius: 8, border: '2px solid',
                  borderColor: age === a ? '#F5E642′ : '#1e3a5f',
                  background: age === a ? '#F5E642′ : '#112240',
                  color: age === a ? '#0A1628′ : '#fff', fontWeight: 600, cursor: ’pointer' }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <p style={{ color: '#94a3b8', marginBottom: 8 }}>Foundation type:</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {foundations.map(f => (
              <button key={f} onClick={() => setFoundation(f)}
                style={{ padding: '9px 18px', borderRadius: 8, border: '2px solid',
                  borderColor: foundation === f ? '#F5E642′ : '#1e3a5f',
                  background: foundation === f ? '#F5E642′ : '#112240',
                  color: foundation === f ? '#0A1628′ : '#fff', fontWeight: 600, cursor: ’pointer' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {guide && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {guide.map((item, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: 10, padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: 14, border: '1px solid #1e3a5f' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ flex: 1, color: '#e2e8f0′ }}>{item.task}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: urgencyColor[item.urgency] }}>{item.urgency}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, padding: 20, background: '#112240', borderRadius: 12, border: '1px solid #F5E642′ }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🏠 ProLnk connects you with vetted DFW foundation pros</p>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Licensed structural engineers, foundation repair specialists, and drainage contractors across DFW.</p>
        </div>
      </div>
    </div>
  );
}