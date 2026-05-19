import { useState } from 'react';

type Urgency = 'emergency' | 'soon' | 'planned';

const urgencyData: Record<Urgency, { label: string; wait: string; advice: string; cost: string }> = {
  emergency: {
    label: '🚨 Emergency (active leak/break)',
    wait: 'Same day – 4 hours',
    cost: 'Premium: 1.5x – 2x standard rate',
    advice: 'Plumbers respond to emergencies 24/7 in DFW. Expect after-hours surcharges. Shut off main water valve now to limit damage.',
  },
  soon: {
    label: '⚠️ Urgent (within a week)',
    wait: '1 – 3 days',
    cost: 'Standard to slight premium',
    advice: 'Best balance of speed and price. Book Charter pros Monday-Wednesday for fastest slots. Avoid post-freeze periods (Feb) when demand spikes.',
  },
  planned: {
    label: '✅ Planned (no rush)',
    wait: '3 – 7 days',
    cost: 'Standard or discounted',
    advice: 'Slab leak season peaks June-August as soil contracts. Schedule inspections in April or September for best pricing and availability. Early February tune-ups prevent freeze emergencies.',
  },
};

const tips = [
  { icon: '🧊', text: 'Post-freeze surge (Dec-Feb): Premium pricing. Book tune-ups in October.' },
  { icon: '☀️', text: 'Slab leak season (Jun-Aug): Soil contracts = pipe stress. Inspect in spring.' },
  { icon: '💡', text: 'Early February: Perfect time for pipe insulation before next winter.' },
  { icon: '📅', text: 'Plumbers are busy year-round in DFW — plan ahead whenever possible.' },
];

export default function DFWBestTimeToHirePlumber2026() {
  const [urgency, setUrgency] = useState<Urgency | null>(null);
  const data = urgency ? urgencyData[urgency] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🔧💧</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Best Time to Hire a Plumber in DFW 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          DFW plumbers stay busy year-round. Timing your job right can save 30-50%. Post-freeze and slab leak season both spike demand and pricing.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⏱️ How Urgent Is Your Job?</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {(Object.keys(urgencyData) as Urgency[]).map((key) => (
            <button key={key} onClick={() => setUrgency(key)} style={{
              background: urgency === key ? '#F5E642' : '#1e2d45',
              color: urgency === key ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 14,
            }}>{urgencyData[key].label}</button>
          ))}
        </div>

        {data && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div><div style={{ color: '#64748b', fontSize: 12 }}>Expected Wait</div><div style={{ fontWeight: 700, fontSize: 18 }}>{data.wait}</div></div>
              <div><div style={{ color: '#64748b', fontSize: 12 }}>Pricing</div><div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642' }}>{data.cost}</div></div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#cbd5e1', fontSize: 14 }}>{data.advice}</div>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 DFW Plumbing Timing Tips</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {tips.map((t) => (
            <div key={t.text} style={{ background: '#1e2d45', borderRadius: 8, padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{t.text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🏆 ProLnk Charter Advantage</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Charter plumbers commit to same-day emergency response and agreed rates — no post-freeze price gouging.</div>
        </div>
      </div>
    </div>
  );
}
