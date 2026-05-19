import { useState } from 'react';

const VIOLATIONS = [
  {
    type: 'Overgrown Grass / Weeds',
    icon: '🌿',
    cities: { Dallas: '10 days to cure, $50–$500/day after', 'Fort Worth': '10 days, $200–$500/day', Plano: '7 days, $500/day', Arlington: '10 days, $200/day' },
    cure: 'Mow to under 12 inches immediately. Document with photos after mowing. Request re-inspection within cure window.',
    appeal: 'File written appeal within 10–15 days of notice (varies by city). Cite extenuating circumstances (medical, travel, hardship).',
    report: 'Most DFW cities accept anonymous online reports via 311 portal or mobile app. Dallas: 311.dallascityhall.com'
  },
  {
    type: 'Junk Vehicles',
    icon: '🚗',
    cities: { Dallas: '15 days, then city removes at owner cost', 'Fort Worth': '10 days', Plano: '7 days', Arlington: '15 days' },
    cure: 'Vehicle must be operable, registered, and not stored for more than 72 hours in most DFW codes. Repair or remove.',
    appeal: 'Claim vehicle is actively being repaired. Provide mechanic receipts. Request extension in writing.',
    report: 'Include make, model, color, and license plate in report. Photos accelerate enforcement.'
  },
  {
    type: 'Unpermitted Structures',
    icon: '🏗️',
    cities: { Dallas: 'Stop work order + permit or demolish', 'Fort Worth': 'Same; 30-day cure', Plano: '15 days + retroactive permit or remove', Arlington: '30 days' },
    cure: 'Apply for retroactive permit immediately. If structure doesn’t meet code, you may need to modify or demolish. Permit fees are retroactive plus penalty (typically 2x normal).',
    appeal: 'Hardship appeals and variances available at Board of Adjustment. Hire a permit expeditor ($500–$2,000) to navigate.',
    report: 'Requires specific address. Provide description and approximate size of unpermitted structure.'
  },
  {
    type: 'Exterior Deterioration',
    icon: '🏚️',
    cities: { Dallas: '30 days for paint/repair', 'Fort Worth': '30–60 days', Plano: '30 days', Arlington: '45 days' },
    cure: 'Repair peeling paint, broken windows, damaged siding. Document all repair work with receipts and before/after photos. Request extension if needed.',
    appeal: 'Financial hardship appeals accepted by most DFW cities. Provide documentation of scheduled contractor work.',
    report: 'Anonymous in all major DFW cities. Include specific exterior element in description (roof, siding, windows, paint).'
  }
];

export default function DFWCodeViolationGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const [city, setCity] = useState('Dallas');
  const item = selected !== null ? VIOLATIONS[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112040 100%)', padding: '48px 24px 36px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px' }}>Code Violation Guide</h1>
          <p style={{ fontSize: 15, color: '#9AA5B8', margin: 0 }}>How to respond, cure timelines, appeal rights, and how to report neighbors.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 0′ }}>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginRight: 12 }}>Your DFW City:</label>
          {['Dallas', 'Fort Worth', 'Plano', 'Arlington'].map(c => (
            <button key={c} onClick={() => setCity(c)}
              style={{ marginRight: 8, padding: '6px 14px', borderRadius: 20, border: `2px solid ${city === c ? '#F5E642' : '#1E3A5F'}`, background: city === c ? '#F5E642′ : ’transparent', color: city === c ? '#0A1628′ : '#CBD5E0', fontWeight: 700, fontSize: 13, cursor: ’pointer' }}>
              {c}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 14, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>Violation type:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {VIOLATIONS.map((v, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#F5E642′ : '#112040', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px', cursor: ’pointer', textAlign: 'left' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{v.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: selected === i ? '#0A1628′ : '#E8EAF0' }}>{v.type}</div>
            </button>
          ))}
        </div>

        {item && (
          <div style={{ background: '#112040', border: '1px solid #1E3A5F', borderRadius: 14, padding: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{item.icon} {item.type}</h2>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 20, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>📍 {city} — FINE STRUCTURE</div>
              <p style={{ fontSize: 13, color: '#CBD5E0', margin: 0 }}>{(item.cities as Record<string, string>)[city]}</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>✅ HOW TO CURE</div>
              <p style={{ fontSize: 14, color: '#CBD5E0', lineHeight: 1.6, margin: 0 }}>{item.cure}</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>📋 APPEALS PROCESS</div>
              <p style={{ fontSize: 14, color: '#CBD5E0', lineHeight: 1.6, margin: 0 }}>{item.appeal}</p>
            </div>
            <div style={{ background: '#1A2F4E', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#9AA5B8', marginBottom: 4 }}>📣 HOW TO REPORT A NEIGHBOR</div>
              <p style={{ fontSize: 13, color: '#CBD5E0', margin: 0 }}>{item.report}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
