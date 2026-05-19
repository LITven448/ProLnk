import { useState } from 'react';

const services = [
  {
    id: 'tuneup',
    label: '🔧 Tune-Up / Maintenance',
    traditional: { wait: '3–7 business days', price: '$89–$180', quality: 'Variable — depends on who picks up the phone' },
    prolnk: { wait: '24–48 hours', price: '$120–$160 flat (transparent)', quality: 'NATE-certified, background-checked, reviewed by past homeowners' },
    insight: 'Spring 2026 is unusually busy in DFW. Pre-booking through ProLnk locks in a slot before demand peaks.',
  },
  {
    id: 'repair',
    label: '⚙️ Emergency Repair',
    traditional: { wait: '4–24 hours, often next-day', price: '$200–$800+ with surprise add-ons', quality: 'Unknown — usually whoever answers the call' },
    prolnk: { wait: 'Same-day matched pro in your ZIP', price: 'Itemized upfront quote before work starts', quality: 'Verified license + 4.5-star minimum rating requirement' },
    insight: 'In summer 2026, DFW HVAC repair demand will peak in July–August. ProLnk\’s pre-matched network means faster access.',
  },
  {
    id: 'quote',
    label: '💰 Replacement Quote',
    traditional: { wait: '1–2 weeks for multiple quotes', price: 'Often padded — no comparison baseline', quality: 'Hard to evaluate without industry knowledge' },
    prolnk: { wait: '2–3 quotes in 48–72 hours', price: 'Side-by-side comparison with equipment specs', quality: 'All contractors meet ProLnk license + insurance minimums' },
    insight: 'Replacement quotes in DFW typically range $5,500–$14,000. ProLnk ensures you see real competition, not inflated retail.',
  },
  {
    id: 'installation',
    label: '🏗️ New System Install',
    traditional: { wait: '2–4 weeks from quote to install', price: 'Often bundled with aggressive financing', quality: 'Warranty valid only if contractor registered — often missed' },
    prolnk: { wait: '1–2 weeks from quote to install', price: 'Clean itemized proposal: equipment + labor + permit', quality: 'Contractor handles ACCA Manual J sizing and permit filing' },
    insight: 'Proper sizing is critical in DFW\’s extreme heat. Undersized systems run constantly. Oversized systems short-cycle. ProLnk pros are trained on Manual J.',
  },
  {
    id: 'smart',
    label: '📱 Smart Thermostat',
    traditional: { wait: 'Appointment-dependent', price: '$150–$350 install, thermostat sold separately', quality: 'May or may not enable ERCOT demand response' },
    prolnk: { wait: 'Often same-day add-on with other service', price: 'Bundled pricing available', quality: 'Pros verify ERCOT demand-response compatibility at install' },
    insight: 'ERCOT demand-response credits can offset up to $120/summer. ProLnk pros know which thermostats qualify.',
  },
];

export default function DFWHVACDFWExpect2026() {
  const [selected, setSelected] = useState(services[0].id);
  const active = services.find(s => s.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC 2026</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>What to Expect from DFW HVAC Service in 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 580, margin: '0 auto' }}>Select a service type to see 2026 wait times, pricing norms, and how ProLnk improves each.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 36 }}>
          {services.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: selected === s.id ? '#F5E642′ : '#1E3A5F', backgroundColor: selected === s.id ? '#F5E642' : '#0F2340', color: selected === s.id ? '#0A1628' : '#CBD5E1', fontWeight: 600, cursor: ’pointer', fontSize: 14 }}>{s.label}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          {[{ label: '📞 Traditional Contractor', data: active.traditional, accent: '#334155′ }, { label: '🔗 With ProLnk', data: active.prolnk, accent: '#F5E642' }].map(col => (
            <div key={col.label} style={{ backgroundColor: '#0F2340', borderRadius: 14, padding: 28, border: `2px solid ${col.accent}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: col.accent, marginBottom: 18 }}>{col.label}</div>
              {[['⏱️ Wait Time', col.data.wait], ['💵 Pricing', col.data.price], ['✅ Quality', col.data.quality]].map(([k, v]) => (
                <div key={k as string} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
                  <div style={{ color: '#E2E8F0', fontSize: 14, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2340', borderRadius: 12, padding: '20px 24px', border: '1px solid #1E3A5F', marginBottom: 36 }}>
          <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>2026 DFW Insight</div>
          <p style={{ color: '#CBD5E1', margin: 0, fontSize: 15, lineHeight: 1.6 }}>{active.insight}</p>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0F2340', borderRadius: 12, padding: 28, border: '1px solid #F5E642′ }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Set the Right Expectations — Before You Need Service</div>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Free for homeowners. Vetted pros. Transparent quotes.</p>
          <a href="https://prolnk.io" style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>Join ProLnk Free</a>
        </div>
      </div>
    </div>
  );
}
