import { useState } from 'react';

const measures = [
  { id: 'cameras', label: 'Visible cameras at all entry points', deterrence: 25, discount: 5 },
  { id: 'lighting', label: 'Motion-activated exterior lighting', deterrence: 15, discount: 2 },
  { id: 'locks', label: 'Smart locks (deadbolts with app control)', deterrence: 12, discount: 3 },
  { id: 'doorbell', label: 'Video doorbell', deterrence: 10, discount: 2 },
  { id: 'signs', label: 'Yard signs/window stickers', deterrence: 8, discount: 1 },
  { id: 'alarm', label: 'Monitored alarm (3-5 min response)', deterrence: 18, discount: 8 },
];

export default function HomeSecuritySystemGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const selected = measures.filter(m => checked[m.id]);
  const deterrenceScore = Math.min(100, selected.reduce((s, m) => s + m.deterrence, 0));
  const discountPct = Math.min(15, selected.reduce((s, m) => s + m.discount, 0));
  const avgPolicy = 3240;
  const discountDollars = Math.round(avgPolicy * discountPct / 100);

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#94a3b8', letterSpacing: 1 }}>DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.15 }}>
          DFW Home Security Guide<br />
          <span style={{ color: '#38bdf8′ }}>What Works, What Doesn’t</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 48, maxWidth: 600 }}>
          DFW property crime has declined 18% since 2019 — but vehicle theft increased 34%. Smart cameras reduce property crime risk by 25%. Here's what actually moves the needle.
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#e2e8f0′ }}>🔒 Security System Tiers</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 48 }}>
          {[
            { tier: 'Tier 1 — DIY Monitored', cost: '$20–50/mo', brands: 'Ring, SimpliSafe, Abode', detail: 'Easy install, no contract, reliable monitoring. Best starting point for most DFW homeowners.' },
            { tier: 'Tier 2 — Professional Installed', cost: '$40–80/mo', brands: 'ADT, Brinks, Vivint', detail: 'Contract required (2–3 years). Professional-grade equipment and faster response guarantees.' },
            { tier: 'Tier 3 — Enterprise Grade', cost: '$100+/mo', brands: 'Commercial systems', detail: 'For estate homes and complex properties. Dedicated monitoring centers, redundant systems.' },
          ].map(t => (
            <div key={t.tier} style={{ background: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #334155′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 17, color: '#f1f5f9′ }}>{t.tier}</div>
                <div style={{ background: '#0f172a', padding: '4px 14px', borderRadius: 20, fontSize: 14, color: '#38bdf8', fontWeight: 600 }}>{t.cost}</div>
              </div>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 6 }}>{t.brands}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{t.detail}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#e2e8f0′ }}>📊 Most Effective DFW Security Measures</h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Ranked by crime deterrence data. Select what you have to see your security score.</p>
        <div style={{ background: '#1e293b', borderRadius: 12, padding: 28, border: '1px solid #334155', marginBottom: 32 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            {measures.map((m, i) => (
              <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', padding: '10px 0', borderBottom: i < measures.length - 1 ? '1px solid #1e293b' : 'none' }}>
                <input
                  type="checkbox"
                  checked={!!checked[m.id]}
                  onChange={() => toggle(m.id)}
                  style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#38bdf8′ }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ color: '#e2e8f0', fontSize: 15 }}>#{i + 1} {m.label}</span>
                </div>
                <span style={{ fontSize: 12, color: '#64748b' }}>+{m.deterrence}% deterrence</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0c4a6e, #075985)', borderRadius: 16, padding: 32, marginBottom: 48 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#f0f9ff' }}>🎯 Your Security Assessment</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontSize: 13, color: '#7dd3fc', marginBottom: 6 }}>DETERRENCE SCORE</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: deterrenceScore >= 60 ? '#4ade80′ : deterrenceScore >= 30 ? '#facc15' : '#f87171' }}>{deterrenceScore}%</div>
              <div style={{ fontSize: 13, color: '#7dd3fc', marginTop: 4 }}>
                {deterrenceScore >= 60 ? 'Strong deterrence' : deterrenceScore >= 30 ? 'Moderate — add more measures' : 'Low — significant gaps'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#7dd3fc', marginBottom: 6 }}>EST. INSURANCE DISCOUNT</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#4ade80′ }}>${discountDollars}/yr</div>
              <div style={{ fontSize: 13, color: '#7dd3fc', marginTop: 4 }}>{discountPct}% off avg DFW policy</div>
            </div>
          </div>
          {selected.length === 0 && (
            <p style={{ color: '#7dd3fc', fontSize: 14, marginTop: 16 }}>Select the measures you have installed above to see your score.</p>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #334155', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>💡 INSURANCE SAVINGS</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 15 }}>
            Most DFW security systems qualify for <strong style={{ color: '#f1f5f9′ }}>5–15% home insurance discounts</strong> — averaging <strong style={{ color: '#38bdf8' }}>$162–$486/year</strong> on a typical DFW policy. Always notify your insurer after installation.
          </p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e40af)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🔧</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: '12px 0 8px', color: '#f1f5f9′ }}>Find Security Installation Contractors</h3>
          <p style={{ color: '#93c5fd', marginBottom: 24 }}>Connect with vetted DFW security system installers through ProLnk. Get quotes in 24 hours.</p>
          <a href="/homeowner-signup" style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Get Free Quotes →
          </a>
        </div>

      </div>
    </div>
  );
}
