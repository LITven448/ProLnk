import { useState } from 'react';

const internetProviders = [
  { name: 'AT&T Fiber', type: 'Fiber', speed: 'Up to 5 Gbps', availability: 'Most DFW cities', price: '$55–$110/mo', rating: 5 },
  { name: 'Spectrum', type: 'Cable', speed: 'Up to 1 Gbps', availability: 'Widespread', price: '$50–$80/mo', rating: 3 },
  { name: 'Google Fiber', type: 'Fiber', speed: 'Up to 8 Gbps', availability: 'Limited (select areas)', price: '$70–$100/mo', rating: 5 },
  { name: 'Frontier Fiber', type: 'Fiber', speed: 'Up to 2 Gbps', availability: 'Expanding in DFW', price: '$50–$90/mo', rating: 4 },
];

export default function DFWUtilitiesGuide() {
  const [homeSqft, setHomeSqft] = useState(1800);

  const electricMonthly = Math.round(homeSqft * 0.065);
  const gasMonthly = Math.round(homeSqft * 0.02);
  const waterMonthly = Math.round(homeSqft * 0.015 + 40);
  const internetMonthly = 70;
  const totalMonthly = electricMonthly + gasMonthly + waterMonthly + internetMonthly;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '0 0 80px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ paddingTop: 60, paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#F5C842', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>DFW Homeowner Guide</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>DFW Utilities Guide</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, margin: 0 }}>Choose providers, compare electric rates, and lower your monthly bills. Texas deregulated electric market means you have real choices.</p>
        </div>

        <div style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.25)', borderRadius: 16, padding: 32, margin: '48px 0' }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            <span style={{ fontSize: 28 }}>⚡</span>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>Electric — Texas is Deregulated. You Choose Your Provider.</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                Texas is one of the few states with a deregulated electricity market. You are not stuck with a single utility monopoly — you choose your retail electricity provider, plan type, and contract length. This is a major advantage most Texans do not fully use.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
            {([
              ['Fixed Rate', 'Rate locked for contract term (6–24 months)', 'Best for budget predictability. Protects against summer spikes.', '🔒'],
              ['Variable Rate', 'Rate floats with wholesale market price', 'Risky in Texas — can spike 10–100x during grid events. Avoid unless you watch markets.', '⚠️'],
              ['Time-of-Use', 'Lower rates off-peak, higher peak hours', 'Best if you can shift dishwasher, laundry, EV charging to nights and weekends.', '⏰'],
            ] as [string, string, string, string][]).map(([name, sub, note, icon], i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 20 }}>
                <span style={{ fontSize: 24 }}>{icon}</span>
                <div style={{ fontWeight: 700, fontSize: 15, margin: '10px 0 4px' }}>{name}</div>
                <div style={{ color: '#F5C842', fontSize: 12, marginBottom: 10 }}>{sub}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.6 }}>{note}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, background: 'rgba(0,0,0,0.25)', borderRadius: 10, padding: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>How to Shop Electric Rates</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.7 }}>
              Use <span style={{ color: '#F5C842', fontWeight: 600 }}>powertosave.com</span> — the PUCT regulated official comparison tool. DFW average household uses 1,100–1,400 kWh per month. Compare per kWh at that usage level, not just the monthly estimate shown at 1,000 kWh. Look for the EFL (Electricity Facts Label) before signing any plan.
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 48 }}>
          {([
            { icon: '🔥', title: 'Natural Gas', provider: 'Atmos Energy', note: 'Not deregulated. Atmos Energy is the single provider across most of DFW. Bills avg $40–120 per month depending on season and home size.', color: '#ef4444' },
            { icon: '💧', title: 'Water', provider: 'Varies by City', note: 'Frisco, Plano, Dallas, Fort Worth, and surrounding municipalities all have separate water utilities and billing systems. Contact your city directly after closing.', color: '#3b82f6' },
            { icon: '♻️', title: 'Waste and Recycling', provider: 'City-Managed', note: 'Typically bundled with water or billed separately by city. Most DFW cities offer single-stream recycling pickup. Some charge extra for bulk item pickup.', color: '#22c55e' },
          ] as { icon: string; title: string; provider: string; note: string; color: string }[]).map((util, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
              <span style={{ fontSize: 28 }}>{util.icon}</span>
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: '12px 0 4px' }}>{util.title}</h3>
              <div style={{ color: util.color, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{util.provider}</div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{util.note}</p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Internet Providers in DFW</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {internetProviders.map((isp, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{isp.name}</div>
                  <div style={{ color: '#F5C842', fontSize: 12, fontWeight: 600, marginTop: 2 }}>{isp.type} · {isp.availability}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Speed</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{isp.speed}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Price</div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#4ade80' }}>{isp.price}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Rating</div>
                  <div style={{ fontSize: 16 }}>{'★'.repeat(isp.rating)}{'☆'.repeat(5 - isp.rating)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Annual Utility Cost Estimator</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '0 0 28px' }}>Adjust your home size to estimate your DFW utility costs.</p>

          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontWeight: 600 }}>Home Size</span>
              <span style={{ color: '#F5C842', fontWeight: 700 }}>{homeSqft.toLocaleString()} sq ft</span>
            </div>
            <input
              type="range" min={800} max={5000} step={100} value={homeSqft}
              onChange={(e) => setHomeSqft(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5C842' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 4 }}>
              <span>800 sq ft</span><span>5,000 sq ft</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {([
              ['⚡', 'Electric', electricMonthly],
              ['🔥', 'Natural Gas', gasMonthly],
              ['💧', 'Water', waterMonthly],
              ['📡', 'Internet', internetMonthly],
            ] as [string, string, number][]).map(([icon, label, amount]) => (
              <div key={label} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <span style={{ fontSize: 24 }}>{icon}</span>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: '8px 0 4px' }}>{label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#F5C842' }}>${amount}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>per month</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Estimated Total Monthly</div>
            <div style={{ fontSize: 42, fontWeight: 800, color: '#F5C842', margin: '8px 0 4px' }}>${totalMonthly}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>${(totalMonthly * 12).toLocaleString()} per year — estimates only; actual costs vary by usage, provider, and plan.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
