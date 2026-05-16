import { useState } from 'react';

const services = [
  {
    id: 'amazon',
    name: 'Amazon Subscribe & Save',
    logo: '📦',
    price: 'Varies (15–20% discount)',
    delivery: 'Monthly or custom',
    dfwFit: 'Good',
    pros: ['Lowest per-filter price', 'Easy to pause or skip', 'Huge filter brand selection'],
    cons: ['Manual selection required', 'No DFW-specific guidance', 'Packaging can vary in quality'],
  },
  {
    id: 'filtereasy',
    name: 'FilterEasy',
    logo: '🌬️',
    price: '$10–$40/filter delivered',
    delivery: 'Every 30/60/90 days',
    dfwFit: 'Great',
    pros: ['Sends reminders before delivery', 'Filter quality guarantee', 'DFW monthly = 30-day default'],
    cons: ['Slightly higher cost than Amazon', 'Fewer exotic MERV options'],
  },
  {
    id: 'secondnature',
    name: 'Second Nature',
    logo: '🍃',
    price: '$20–$60/filter/mo',
    delivery: 'Monthly (auto-set)',
    dfwFit: 'Excellent',
    pros: ['Eco-friendly packaging', 'MERV-11 default = ideal for DFW', 'Great customer service'],
    cons: ['Premium pricing', 'Fewer budget options'],
  },
  {
    id: 'nordicpure',
    name: 'Nordic Pure',
    logo: '❄️',
    price: '$8–$35/filter',
    delivery: 'Subscribe via website',
    dfwFit: 'Good',
    pros: ['Best MERV rating range (1–16)', 'Great for allergy sufferers', 'Custom sizes available'],
    cons: ['Subscription UX less polished', 'Slower shipping than Amazon'],
  },
];

const recommendations: Record<string, string> = {
  budget: 'amazon',
  allergy: 'nordicpure',
  convenience: 'secondnature',
  large: 'filtereasy',
};

const situationLabels: { id: string; label: string }[] = [
  { id: 'budget', label: '💰 Budget-conscious — lowest cost per filter' },
  { id: 'allergy', label: '🤧 Allergy household — need best air quality' },
  { id: 'convenience', label: '⏱️ Set-it-and-forget-it — maximum convenience' },
  { id: 'large', label: '🏠 Large home, multiple systems or filters' },
];

export default function DFWHVACFilterSubscriptions() {
  const [situation, setSituation] = useState<string | null>(null);

  const recommended = situation ? recommendations[situation] : null;
  const rec = services.find((s) => s.id === recommended);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK • DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>HVAC Filter Subscription<br />Services for DFW</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          DFW summers demand monthly filter changes — not quarterly. A subscription eliminates the friction of remembering. Here's how the top services compare for North Texas homeowners.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '20px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>🌡️ Why DFW Makes Subscriptions Worth It</div>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            In Dallas–Fort Worth, your HVAC runs 10–14 hours daily from June through September. Standard 90-day filters clog in 30 days during summer pollen and dust season. Monthly delivery means you're never running a dirty filter during peak load — which directly impacts energy bills and equipment lifespan.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {services.map((s) => (
            <div key={s.id} style={{ background: '#112240', borderRadius: 12, padding: '20px', borderLeft: `4px solid ${s.dfwFit === 'Excellent' ? '#F5E642' : s.dfwFit === 'Great' ? '#4ADE80' : '#94A3B8'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{s.logo} {s.name}</div>
                <div style={{ fontSize: 12, color: s.dfwFit === 'Excellent' ? '#F5E642' : s.dfwFit === 'Great' ? '#4ADE80' : '#94A3B8', fontWeight: 700 }}>DFW Fit: {s.dfwFit}</div>
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>{s.price} · {s.delivery}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#4ADE80', fontWeight: 700, marginBottom: 4 }}>PROS</div>
                  {s.pros.map((p, i) => <div key={i} style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.5 }}>✓ {p}</div>)}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#F87171', fontWeight: 700, marginBottom: 4 }}>CONS</div>
                  {s.cons.map((c, i) => <div key={i} style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.5 }}>✗ {c}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your Best Fit</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {situationLabels.map((s) => (
            <button key={s.id} onClick={() => setSituation(s.id)} style={{
              background: situation === s.id ? '#F5E642' : '#1E3A5F', color: situation === s.id ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 8, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: 600,
            }}>{s.label}</button>
          ))}
        </div>

        {rec && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginBottom: 32, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Recommended for You</div>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>{rec.logo} {rec.name}</div>
            <div style={{ color: '#94A3B8', fontSize: 14 }}>{rec.price} · Delivers {rec.delivery}</div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Need a DFW HVAC Tune-Up Too?</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects you with vetted DFW HVAC pros — free quotes, no obligation.</div>
        </div>
      </div>
    </div>
  );
}
