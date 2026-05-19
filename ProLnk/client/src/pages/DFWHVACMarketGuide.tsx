import { useState } from 'react';

const submarkets = ['Plano', 'Frisco', 'McKinney', 'Allen', 'Garland', 'Irving', 'Arlington', 'Fort Worth', 'Denton', 'Mansfield'];
const urgencyLevels = ['Planning Ahead (60+ days)', 'Soon (30-60 days)', 'Urgent (1-2 weeks)', 'Emergency (Now)'];

const marketData: Record<string, Record<string, { conditions: string; strategy: string; wait: string; priceRange: string }>> = {
  'Plano': {
    'Planning Ahead (60+ days)': { conditions: '🟢 Favorable — Pre-season availability is high. Contractors competing for business.', strategy: 'Lock in a spring tune-up contract now. Request multi-year pricing to lock rates before summer surge.', wait: '2–5 days', priceRange: '$89–$129 tune-up' },
    'Soon (30-60 days)': { conditions: '🟡 Moderate — Demand beginning to climb as temps rise. Good contractors booking up fast.', strategy: 'Book within the week. Ask for a maintenance agreement to jump the queue later.', wait: '5–10 days', priceRange: '$99–$149 tune-up' },
    'Urgent (1-2 weeks)': { conditions: '🟠 Tight — Peak season. Quality contractors booked 2–3 weeks out.', strategy: 'Expand search radius to adjacent suburbs. Be ready to schedule at off-peak hours.', wait: '10–18 days', priceRange: '$149–$249′ },
    'Emergency (Now)': { conditions: '🔴 Critical — Emergency pricing active. Wait times unpredictable.', strategy: 'Use ProLnk to broadcast to all available Plano-area contractors simultaneously. Emergency dispatch adds 40–80%.', wait: 'Same day (variable)', priceRange: '$250–$600+' },
  },
  'Frisco': {
    'Planning Ahead (60+ days)': { conditions: '🟢 Favorable — Fast-growing area, more new contractors entering market.', strategy: 'Vet and lock in a preferred contractor before demand spikes. Ask about new-construction specialist availability.', wait: '2–4 days', priceRange: '$89–$129 tune-up' },
    'Soon (30-60 days)': { conditions: '🟡 Moderate — New builds competing for same pool of HVAC techs.', strategy: 'Book early. Frisco new construction absorbs significant tech capacity April–June.', wait: '5–12 days', priceRange: '$99–$159′ },
    'Urgent (1-2 weeks)': { conditions: '🟠 Tight — High demand from rapid population growth strains local capacity.', strategy: 'Be flexible on scheduling. Accept early morning slots to get faster service.', wait: '12–20 days', priceRange: '$149–$249′ },
    'Emergency (Now)': { conditions: '🔴 Critical — Emergency only. Costs elevated significantly.', strategy: 'Broadcast via ProLnk across Frisco and Prosper. Many Frisco techs work both areas.', wait: '2–6 hours', priceRange: '$300–$700+' },
  },
};

const fallback = (urgency: string) => ({
  conditions: urgency === 'Emergency (Now)' ? '🔴 Critical — Emergency pricing active. Limited availability.' : urgency === 'Urgent (1-2 weeks)' ? '🟠 Tight — Peak season demand elevated.' : urgency === 'Soon (30-60 days)' ? '🟡 Moderate — Booking up, act soon.' : '🟢 Favorable — Good availability and pricing.',
  strategy: urgency === 'Emergency (Now)' ? 'Use ProLnk emergency broadcast. Prepare for 40–80% emergency premium.' : urgency === 'Urgent (1-2 weeks)' ? 'Book immediately. Be flexible on time slots.' : urgency === 'Soon (30-60 days)' ? 'Secure your appointment this week to get preferred times.' : 'Lock in a contractor now and negotiate multi-year maintenance pricing.',
  wait: urgency === 'Emergency (Now)' ? '2–8 hours' : urgency === 'Urgent (1-2 weeks)' ? '10–18 days' : urgency === 'Soon (30-60 days)' ? '5–12 days' : '2–5 days',
  priceRange: urgency === 'Emergency (Now)' ? '$250–$600+' : urgency === 'Urgent (1-2 weeks)' ? '$149–$249′ : '$99–$159',
});

export default function DFWHVACMarketGuide() {
  const [submarket, setSubmarket] = useState('');
  const [urgency, setUrgency] = useState('');

  const result = submarket && urgency ? (marketData[submarket]?.[urgency] || fallback(urgency)) : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW MARKET GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌡️ DFW HVAC Market</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>North Texas has a persistent HVAC technician shortage driven by explosive population growth, extreme summers, and high turnover. Knowing when and how to book can save you hundreds.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[['⚠️', 'Tech Shortage', 'DFW is 15–20% short on certified HVAC techs vs demand'], ['🌡️', 'Summer Surges', 'June–Aug emergency calls spike 300%. Pre-season is the only safe window.'], ['💰', 'Pricing Swing', 'Emergency pricing runs 40–80% above standard rates. Plan ahead.']].map(([icon, title, desc]) => (
            <div key={String(title)} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Check Your Market Conditions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>DFW Submarket</label>
              <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select area...</option>
                {submarkets.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Urgency</label>
              <select value={urgency} onChange={e => setUrgency(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select urgency...</option>
                {urgencyLevels.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ marginBottom: 12, fontWeight: 600 }}>Market Conditions</div>
              <div style={{ marginBottom: 12, color: '#e2e8f0′ }}>{result.conditions}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 600 }}>Recommended Strategy: </span>{result.strategy}</div>
              <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
                <div><span style={{ color: '#94a3b8', fontSize: 13 }}>Est. Wait Time</span><div style={{ fontWeight: 700, color: '#F5E642′ }}>{result.wait}</div></div>
                <div><span style={{ color: '#94a3b8', fontSize: 13 }}>Price Range</span><div style={{ fontWeight: 700, color: '#F5E642′ }}>{result.priceRange}</div></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Lock In Your HVAC Pro Before Peak Season</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginBottom: 12 }}>ProLnk connects you with vetted DFW HVAC contractors — before you need emergency service.</div>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, padding: '10px 24px', borderRadius: 8, display: 'inline-block' }}>Join ProLnk Waitlist →</div>
        </div>
      </div>
    </div>
  );
}
