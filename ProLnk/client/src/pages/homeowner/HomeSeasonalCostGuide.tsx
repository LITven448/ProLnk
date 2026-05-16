import { useState } from 'react';

const months = [
  { name: 'January', emoji: '❄️', items: [{ label: 'Heating bills peak', cost: '$180–$300/mo' }, { label: 'No major maintenance items', cost: '' }] },
  { name: 'February', emoji: '🌨️', items: [{ label: 'Freeze aftermath — pipe checks', cost: '$50–$200' }, { label: 'Heating bills continue', cost: '$180–$300/mo' }] },
  { name: 'March', emoji: '🌱', items: [{ label: 'Pest control treatment', cost: '$80–$120' }, { label: 'Irrigation system startup', cost: '$75–$150' }, { label: 'HVAC tune-up (spring)', cost: '$89–$150' }] },
  { name: 'April', emoji: '🌸', items: [{ label: 'Landscaping spring cleanup', cost: '$200–$400' }, { label: 'Foundation watering starts', cost: '$20–$60/mo' }] },
  { name: 'May', emoji: '🌻', items: [{ label: 'Exterior painting prep', cost: '$50–$150' }, { label: 'Foundation watering continues', cost: '$20–$60/mo' }] },
  { name: 'June', emoji: '☀️', items: [{ label: 'HVAC filter change', cost: '$15–$30' }, { label: 'Cooling bills ramp up', cost: '$200–$350/mo' }] },
  { name: 'July', emoji: '🔥', items: [{ label: 'Peak electric bills', cost: '$300–$500/mo' }, { label: 'Pool chemicals (if pool)', cost: '$50–$100/mo' }] },
  { name: 'August', emoji: '🌡️', items: [{ label: 'Electric bills remain high', cost: '$300–$500/mo' }, { label: 'Pool chemicals continue', cost: '$50–$100/mo' }] },
  { name: 'September', emoji: '🍂', items: [{ label: 'Gutter cleaning', cost: '$150–$250' }, { label: 'Roof inspection', cost: '$150–$300' }] },
  { name: 'October', emoji: '🎃', items: [{ label: 'Heating system service', cost: '$89–$150' }, { label: 'Window caulk check/repair', cost: '$50–$150' }] },
  { name: 'November', emoji: '🍁', items: [{ label: 'Irrigation winterization', cost: '$75–$150' }, { label: 'Pest control fall treatment', cost: '$80–$120' }] },
  { name: 'December', emoji: '🎄', items: [{ label: 'Holiday lighting (if hired)', cost: '$200–$500' }, { label: 'Heating starts again', cost: '$120–$250/mo' }] },
];

const sizeMultipliers = { small: 0.75, medium: 1.0, large: 1.35 };
const ageMultipliers = { new: 0.7, mid: 1.0, older: 1.4 };

export default function HomeSeasonalCostGuide() {
  const [homeSize, setHomeSize] = useState('medium');
  const [homeAge, setHomeAge] = useState('mid');
  const [selectedMonth, setSelectedMonth] = useState(null);

  const baseAnnualMin = 4200;
  const baseAnnualMax = 6800;
  const mult = sizeMultipliers[homeSize] * ageMultipliers[homeAge];
  const estMin = Math.round(baseAnnualMin * mult / 100) * 100;
  const estMax = Math.round(baseAnnualMax * mult / 100) * 100;

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '40px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#7c8db5', marginBottom: 8 }}>🏠 DFW Homeowner Resources</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#f1f5f9', margin: '0 0 12px' }}>
            DFW Seasonal Home Cost Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0 }}>
            Budget for the year — month-by-month maintenance and utility costs for DFW homeowners
          </p>
        </div>

        {/* Annual stat */}
        <div style={{ background: '#1a2040', border: '1px solid #2d3a6b', borderRadius: 12, padding: 24, marginBottom: 32, textAlign: 'center' }}>
          <p style={{ color: '#93c5fd', fontSize: 15, margin: '0 0 8px' }}>Average DFW homeowner annual maintenance + utilities (excl. mortgage)</p>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#f1f5f9' }}>$4,200–$6,800 / year</div>
        </div>

        {/* Month Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 40 }}>
          {months.map((m, i) => (
            <div key={m.name} onClick={() => setSelectedMonth(selectedMonth === i ? null : i)}
              style={{ background: selectedMonth === i ? '#1e3a5f' : '#1e2436', borderRadius: 10, padding: 16, cursor: 'pointer', border: `2px solid ${selectedMonth === i ? '#3b82f6' : 'transparent'}`, transition: 'all 0.2s' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{m.emoji}</div>
              <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>{m.name}</div>
              {selectedMonth === i ? (
                <div style={{ display: 'grid', gap: 6 }}>
                  {m.items.map(item => (
                    <div key={item.label} style={{ fontSize: 12 }}>
                      <div style={{ color: '#94a3b8' }}>{item.label}</div>
                      {item.cost && <div style={{ color: '#60a5fa', fontWeight: 600 }}>{item.cost}</div>}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: '#64748b' }}>{m.items.length} item{m.items.length !== 1 ? 's' : ''} — tap to expand</div>
              )}
            </div>
          ))}
        </div>

        {/* Budget Calculator */}
        <div style={{ background: '#1e2436', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginTop: 0, marginBottom: 20 }}>🧮 Your Personalized Annual Budget</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 13, color: '#7c8db5', display: 'block', marginBottom: 10 }}>Home Size</label>
              <div style={{ display: 'grid', gap: 8 }}>
                {[{ id: 'small', label: '🏠 Under 1,800 sq ft' }, { id: 'medium', label: '🏡 1,800–3,000 sq ft' }, { id: 'large', label: '🏘️ Over 3,000 sq ft' }].map(s => (
                  <button key={s.id} onClick={() => setHomeSize(s.id)}
                    style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', borderColor: homeSize === s.id ? '#3b82f6' : '#2d3748', background: homeSize === s.id ? '#1e3a5f' : '#0f1117', color: homeSize === s.id ? '#93c5fd' : '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: 600, textAlign: 'left' }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#7c8db5', display: 'block', marginBottom: 10 }}>Home Age</label>
              <div style={{ display: 'grid', gap: 8 }}>
                {[{ id: 'new', label: '✨ Under 10 years' }, { id: 'mid', label: '🏠 10–25 years' }, { id: 'older', label: '🔧 Over 25 years' }].map(a => (
                  <button key={a.id} onClick={() => setHomeAge(a.id)}
                    style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', borderColor: homeAge === a.id ? '#3b82f6' : '#2d3748', background: homeAge === a.id ? '#1e3a5f' : '#0f1117', color: homeAge === a.id ? '#93c5fd' : '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: 600, textAlign: 'left' }}>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: '#0f1117', borderRadius: 10, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>Your estimated annual maintenance + utilities</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#60a5fa' }}>${estMin.toLocaleString()} – ${estMax.toLocaleString()}</div>
            <div style={{ fontSize: 13, color: '#7c8db5', marginTop: 8 }}>${Math.round(estMin / 12).toLocaleString()} – ${Math.round(estMax / 12).toLocaleString()} per month on average</div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', padding: '16px 40px', borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            📅 Set a Maintenance Reminder Calendar
          </a>
          <p style={{ color: '#4b5563', fontSize: 14, marginTop: 12 }}>Join TrustyPro to get automated seasonal reminders for your home.</p>
        </div>

      </div>
    </div>
  );
}
