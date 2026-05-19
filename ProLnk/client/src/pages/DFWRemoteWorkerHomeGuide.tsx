import { useState } from 'react';

export default function DFWRemoteWorkerHomeGuide() {
  const [layout, setLayout] = useState('');
  const [workType, setWorkType] = useState('');
  const [result, setResult] = useState<null | { plan: string[]; cost: string; roi: string }>(null);

  function calculate() {
    const hasDedicated = layout === 'dedicated';
    const isVideo = workType === 'video';
    const isDeep = workType === 'deep';

    const plan: string[] = [];

    if (!hasDedicated) {
      plan.push('Designate a room with a door — shared spaces erode focus and professionalism on calls');
      plan.push('Add a room divider or bookcase to create visual separation if no spare room exists');
    }

    if (isVideo) {
      plan.push('Acoustic panels on wall behind/beside you — reduces echo for video calls ($80–$200)');
      plan.push('Ring light or window-facing desk setup — DFW sun from the side washes you out on camera');
      plan.push('Wired ethernet to desk — AT&T Fiber in DFW is excellent, but Wi-Fi drops during storms');
    }

    plan.push('Internet: AT&T Fiber is the DFW gold standard for WFH. Spectrum as backup. Avoid DSL.');
    plan.push('Dedicated circuit for office equipment — prevents breaker trips when AC kicks on in summer');

    if (isDeep) {
      plan.push('Noise-canceling headphones for focus — open-plan DFW homes conduct sound easily');
      plan.push('Blackout curtains in office — DFW sun angle in afternoons creates monitor glare');
    }

    plan.push('Mini-split for office if it runs hot in summer — standard DFW HVAC struggles to reach back rooms');
    plan.push('Standing desk or monitor arm — ergonomics matter at 40+ hours/week');

    const cost = hasDedicated
      ? '$500–$2,500 depending on acoustic treatment, mini-split, and ethernet run'
      : '$1,200–$4,000 if converting a space + all improvements';

    const roi = isVideo
      ? 'Better video presence = better client perception. Reduced call anxiety and setup friction saves ~30 min/day. Mini-split pays back in productivity within 60 DFW summer days.'
      : 'Dedicated focus space documented to improve deep work output by 40%+ in remote-work studies. Ergonomic setup prevents $2,000–$10,000 in future medical costs.';

    setResult({ plan, cost, roi });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW HOME GUIDE — REMOTE WORKERS</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          💻 Optimize Your Home for Remote Work
        </h1>
        <p style={{ fontSize: 16, color: '#aab4c8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW homes weren't designed for 40-hour remote work weeks. Here's the specific setup that makes the difference between struggling through another Zoom call and doing your best work every day.
        </p>

        <div style={{ background: 'rgba(245,230,66,0.08)', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '3px solid #F5E642' }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📡 DFW Internet Reality</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, fontSize: 14, color: '#ddd' }}>
            <li><strong>AT&T Fiber</strong> — symmetrical speeds, most reliable for WFH in DFW, check availability first</li>
            <li><strong>Spectrum</strong> — solid backup, asymmetric upload speeds, fine for most workers</li>
            <li><strong>Frontier Fiber</strong> — expanding in DFW suburbs, competitive with AT&T</li>
            <li><strong>Avoid DSL or satellite</strong> — latency kills video calls and async collaboration</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🏠 Your Setup</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#aab4c8' }}>Home layout</label>
            {[{ v: 'dedicated', l: '🚪 I have a dedicated room for work' }, { v: 'shared', l: '🛋️ I work in a shared or open space' }].map(opt => (
              <label key={opt.v} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                <input type="radio" name="layout" value={opt.v} checked={layout === opt.v} onChange={() => setLayout(opt.v)} />
                {opt.l}
              </label>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#aab4c8' }}>Work type</label>
            {[{ v: 'video', l: '📹 Heavy video calls and client-facing work' }, { v: 'deep', l: '🧠 Deep focus, async, minimal calls' }, { v: 'mixed', l: '⚖️ Mix of both' }].map(opt => (
              <label key={opt.v} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                <input type="radio" name="workType" value={opt.v} checked={workType === opt.v} onChange={() => setWorkType(opt.v)} />
                {opt.l}
              </label>
            ))}
          </div>
          <button onClick={calculate} disabled={!layout || !workType}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 800, cursor: 'pointer', width: '100%' }}>
            Build My Office Plan →
          </button>
        </div>

        {result && (
          <div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>Your Optimization Plan</h3>
              {result.plan.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0, marginTop: 2 }}>→</span>
                  <span style={{ fontSize: 14, lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>ESTIMATED COST</div>
                <div style={{ fontSize: 14, lineHeight: 1.6 }}>{result.cost}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>PRODUCTIVITY ROI</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: '#ddd' }}>{result.roi}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🛠️ ProLnk for Home Office Upgrades</h2>
          <p style={{ color: '#aab4c8', lineHeight: 1.7, fontSize: 14 }}>Electricians for dedicated circuits, HVAC specialists for mini-splits, handymen for mounting and cable runs — all vetted, licensed, and available through ProLnk without cold calls or guessing.</p>
        </div>
      </div>
    </div>
  );
}
