import { useState } from 'react';

export default function DFWWidowerHomeGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [knowledge, setKnowledge] = useState('');
  const [result, setResult] = useState<null | { priorities: string[]; checklist: string[]; setup: string[] }>(null);

  function calculate() {
    const age = parseInt(homeAge) || 0;
    const isOld = age > 20;
    const isNovice = knowledge === 'none';
    const isMid = knowledge === 'some';

    const priorities: string[] = [];
    const checklist: string[] = [];
    const setup: string[] = [];

    priorities.push('HVAC — filter changes every 90 days, annual tune-up before summer');
    priorities.push('Water heater — know where shutoff is, typical lifespan 10-12 years');
    priorities.push('Main water shutoff location — memorize it before you need it');
    if (isOld) {
      priorities.push('Foundation — DFW clay soil causes movement; watch for new cracks');
      priorities.push('Roof — inspect after every hail storm; DFW gets hail April–June');
    }
    priorities.push('Electrical panel — know where breakers are and what they control');

    checklist.push(isNovice ? '⬜ Walk every room and photograph current condition' : '✅ Condition documented');
    checklist.push('⬜ Locate and label all shutoff valves (water, gas if applicable)');
    checklist.push('⬜ Find all circuit breakers and label them');
    checklist.push('⬜ Test smoke and CO detectors — replace batteries');
    checklist.push('⬜ Confirm HVAC filter size and set a phone reminder to replace');
    if (isOld) checklist.push('⬜ Get a home inspection — know what your spouse managed silently');
    checklist.push('⬜ Create a home binder: warranties, manuals, contractor receipts');

    if (isMid || isNovice) {
      setup.push('ProLnk annual maintenance plan — vetted pros, no cold calls, no upsells');
      setup.push('Plumber on speed dial before you have an emergency');
      setup.push('Licensed electrician referral for anything beyond a breaker reset');
    }
    setup.push('HVAC company with a service agreement — priority scheduling in DFW summers');
    setup.push('Foundation specialist for a free assessment if home is over 15 years old');

    setResult({ priorities, checklist, setup });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f0', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>DFW HOME GUIDE — LIFE TRANSITION</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          🏡 Home Management After Loss
        </h1>
        <p style={{ fontSize: 16, color: '#444', marginBottom: 8, lineHeight: 1.6 }}>
          If your spouse handled the home and now you're on your own, you’re not behind — you just need a clear starting point. This guide is for surviving spouses in DFW who want to feel confident, not overwhelmed.
        </p>
        <p style={{ fontSize: 15, color: '#666', marginBottom: 32, fontStyle: 'italic' }}>
          No shame in not knowing. Every homeowner learned this somewhere.
        </p>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #e0ddd5′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚠️ The DFW Home Reality Check</h2>
          <p style={{ color: '#555', lineHeight: 1.7, marginBottom: 12 }}>DFW has specific challenges most homeowners don't learn until something breaks:</p>
          <ul style={{ lineHeight: 2, paddingLeft: 20, color: '#333′ }}>
            <li><strong>Extreme heat:</strong> AC failure in July is an emergency, not an inconvenience</li>
            <li><strong>Clay soil:</strong> Foundation movement is normal — but you need to know your baseline</li>
            <li><strong>Hail:</strong> DFW gets hail every year. Know how to document and file a claim</li>
            <li><strong>Hard water:</strong> Mineral buildup destroys water heaters faster here than most cities</li>
          </ul>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #e0ddd5′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>📋 Build Your Priority List</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Home age (years)</label>
            <input
              type="number"
              value={homeAge}
              onChange={e => setHomeAge(e.target.value)}
              placeholder="e.g. 18″
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 15, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>How much do you know about home systems?</label>
            {[{ v: 'none', l: '🤷 Very little — this is new to me' }, { v: 'some', l: '🔧 Some basics, but not confident' }, { v: 'solid', l: '✅ I know enough to handle most things' }].map(opt => (
              <label key={opt.v} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                <input type="radio" name="knowledge" value={opt.v} checked={knowledge === opt.v} onChange={() => setKnowledge(opt.v)} />
                {opt.l}
              </label>
            ))}
          </div>
          <button onClick={calculate} disabled={!homeAge || !knowledge}
            style={{ background: '#1a1a2e', color: '#F5E642', padding: '12px 28px', borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Build My Plan →
          </button>
        </div>

        {result && (
          <div>
            <div style={{ background: '#1a1a2e', borderRadius: 12, padding: 24, color: '#fff', marginBottom: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>🔴 Priority Items to Learn First</h3>
              {result.priorities.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
                  <span style={{ lineHeight: 1.5, fontSize: 14 }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid #e0ddd5′ }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>✅ Protection Checklist</h3>
              {result.checklist.map((c, i) => <div key={i} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.6 }}>{c}</div>)}
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e0ddd5′ }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🛡️ Trusted Service Setup</h3>
              <p style={{ color: '#666', fontSize: 14, marginBottom: 12 }}>ProLnk screens every contractor before they can contact you. No cold calls, no fake reviews.</p>
              {result.setup.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#1a1a2e' }}>•</span>
                  <span style={{ fontSize: 14, lineHeight: 1.6 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
