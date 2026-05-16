import { useState } from 'react';

export default function DFWNewParentHomeGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [babyAge, setBabyAge] = useState('');
  const [result, setResult] = useState<null | { items: Array<{ task: string; cost: string; urgency: string }>; dfwNote: string }>(null);

  function calculate() {
    const age = parseInt(homeAge) || 0;
    const baby = parseInt(babyAge) || 0;
    const isPreBirth = baby === 0;
    const isOldHome = age >= 1978;
    const isMobile = baby >= 6;

    const items: Array<{ task: string; cost: string; urgency: string }> = [];

    if (isOldHome || age > 40) {
      items.push({ task: 'Lead paint test — required if home built before 1978', cost: '$30–$50 DIY kit or $200–$400 pro', urgency: '🔴 Critical' });
    }
    items.push({ task: 'HVAC filter upgrade to MERV-13 + duct cleaning', cost: '$150–$400', urgency: isPreBirth ? '🔴 Do before arrival' : '🟡 Soon' });
    items.push({ task: 'VOC-free nursery paint — let off-gas 2+ weeks before occupancy', cost: '$60–$120 for nursery', urgency: isPreBirth ? '🔴 Do now' : '✅ Done or N/A' });
    items.push({ task: 'Water heater temperature to 120°F — prevents scalding', cost: '$0 — DIY thermostat adjust', urgency: '🔴 Do today' });
    if (isMobile) {
      items.push({ task: 'Outlet covers on all accessible outlets', cost: '$15–$30', urgency: '🔴 Urgent — crawling starts' });
      items.push({ task: 'Cabinet locks on cleaning supply cabinets', cost: '$20–$40', urgency: '🔴 Urgent' });
      items.push({ task: 'Furniture anchoring — bookshelves, dressers to wall', cost: '$25–$60', urgency: '🔴 Urgent before walking' });
    } else {
      items.push({ task: 'Outlet covers — install now, done before they need it', cost: '$15–$30', urgency: '🟡 Proactive' });
    }
    items.push({ task: 'Carbon monoxide detector on every floor', cost: '$25–$50 per unit', urgency: '🔴 Non-negotiable' });
    items.push({ task: 'Radon test — DFW is lower risk but worth confirming', cost: '$15–$30 DIY kit', urgency: '🟡 Good to know' });

    const dfwNote = age >= 15
      ? 'DFW alert: AC reliability is life-safety with a newborn in summer. If your unit is 10+ years old, get a tune-up before June. Heat index hits 110°F+ in July — do not risk an AC failure with an infant.'
      : 'DFW alert: Even with a newer AC, set up annual tune-ups now. DFW summer with a baby is not the time to learn your system is undersized for a nursery.';

    setResult({ items, dfwNote });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW HOME GUIDE — NEW PARENTS</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          👶 Home Prep for New Parents
        </h1>
        <p style={{ fontSize: 16, color: '#aab4c8', marginBottom: 32, lineHeight: 1.6 }}>
          Your home wasn't built for a baby. These are the specific changes DFW parents need to make — with costs, urgency levels, and the DFW-specific risks most guides miss.
        </p>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, marginBottom: 24, color: '#0A1628' }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>⚠️ DFW-Specific Risks</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, fontSize: 14 }}>
            <li><strong>AC failure in summer</strong> — heat index 110°F+ is life-threatening to infants</li>
            <li><strong>Lead paint</strong> — DFW has many pre-1978 homes; test before any renovation</li>
            <li><strong>Hard water</strong> — affects baby formula if using tap; consider a filter</li>
            <li><strong>Air quality</strong> — DFW ozone days; keep windows closed on Code Orange days</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🏠 Tell Us About Your Home</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: '#aab4c8' }}>Home built (year)</label>
            <input
              type="number"
              value={homeAge}
              onChange={e => setHomeAge(e.target.value)}
              placeholder="e.g. 1995"
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', fontSize: 15, background: 'rgba(255,255,255,0.08)', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: '#aab4c8' }}>Baby's age (months, 0 = not born yet)</label>
            <input
              type="number"
              value={babyAge}
              onChange={e => setBabyAge(e.target.value)}
              placeholder="e.g. 3"
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', fontSize: 15, background: 'rgba(255,255,255,0.08)', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>
          <button onClick={calculate} disabled={!homeAge || babyAge === ''}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 800, cursor: 'pointer', width: '100%' }}>
            Show My Priority List →
          </button>
        </div>

        {result && (
          <div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>Your Home Safety Checklist</h3>
              {result.items.map((item, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4, lineHeight: 1.4 }}>{item.task}</div>
                    <div style={{ fontSize: 13, color: '#aab4c8' }}>{item.cost}</div>
                  </div>
                  <div style={{ fontSize: 12, whiteSpace: 'nowrap', paddingTop: 2 }}>{item.urgency}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628' }}>
              <h3 style={{ fontWeight: 800, marginBottom: 8 }}>🌡️ DFW-Specific Note</h3>
              <p style={{ lineHeight: 1.7, fontSize: 14 }}>{result.dfwNote}</p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🛡️ ProLnk for New Parents</h2>
          <p style={{ color: '#aab4c8', lineHeight: 1.7, fontSize: 14 }}>Every contractor in ProLnk is background-checked and license-verified. When you need an HVAC tune-up, lead test, or outlet installation, you're not rolling the dice on Craigslist — you're getting someone vetted before they walk through your door.</p>
        </div>
      </div>
    </div>
  );
}
