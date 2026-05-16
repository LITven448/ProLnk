import { useState } from 'react';

const innovations = [
  { label: 'My system breaks down often', key: 'breakdowns', title: 'AI Predictive Diagnostics', desc: 'New AI diagnostic platforms analyze compressor patterns, refrigerant pressure trends, and motor amp draw to predict failures 30–60 days early. DFW HVAC pros now offer subscription monitoring that catches problems before your system quits in July.', fit: 'High fit — predictive monitoring could eliminate your emergency repair pattern entirely.' },
  { label: 'I want lower energy bills', key: 'bills', title: 'Variable-Speed Inverter Tech + Smart Zoning', desc: '2025–2026 inverter-driven compressors modulate output continuously instead of cycling on and off. Combined with smart zoning (only conditioning occupied rooms), DFW homeowners are seeing 30–45% bill reductions versus 2015-era systems.', fit: 'High fit — inverter systems with zoning are the biggest ROI upgrade available in 2026.' },
  { label: 'I care about refrigerant', key: 'refrigerant', title: 'Smart Refrigerant Recovery Systems', desc: 'New EPA R-454B regulations (phasing out R-410A) drove innovation in smart recovery equipment. 2026 service trucks use automated recovery that captures 99.9% of refrigerant — reducing environmental impact and cutting service costs as regulations tighten.', fit: 'Medium fit — relevant when you replace your system or do major repairs. Ask about R-454B compatible equipment.' },
  { label: 'I want to go all-electric', key: 'electric', title: 'Cold-Climate Heat Pump Breakthroughs', desc: 'New-generation heat pumps maintain efficiency down to 5°F — well below DFW's coldest temperatures. This makes all-electric operation viable in DFW without backup gas, eliminating monthly gas bills entirely.', fit: 'High fit — DFW's mild winters make heat pump economics excellent. Payback typically 4–7 years versus dual-fuel systems.' },
  { label: 'I have a smart home', key: 'smarthome', title: 'Predictive Maintenance Sensors + AI Scheduling', desc: 'New IoT sensor kits mounted on air handlers, condensers, and ducts feed real-time data to apps that learn your usage patterns. They auto-schedule maintenance, alert you to filter needs, and share data with your HVAC pro before visits.', fit: 'High fit — integrates with most smart home platforms. DFW pros are being trained on these systems in 2026.' },
];

export default function DFWHVACInnovation2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = innovations.find(i => i.key === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>🚀 DFW HVAC 2026</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>HVAC Innovations Hitting DFW in 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2.5rem' }}>AI diagnostics, heat pump breakthroughs, and smart refrigerant recovery — here is what is actually available in the DFW market right now.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>⚡ What's Your Situation?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {innovations.map(i => (
              <button key={i.key} onClick={() => setSelected(i.key)} style={{ background: selected === i.key ? '#F5E642' : '#1a3a5c', color: selected === i.key ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>{i.label}</button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>🔬 {match.title}</div>
              <div style={{ color: '#e2e8f0', marginBottom: '0.75rem', lineHeight: 1.6 }}>{match.desc}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>✅ Fit for you: <span style={{ color: '#F5E642' }}>{match.fit}</span></div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🤖', stat: '30–60 days', label: 'Early failure detection with AI diagnostics' },
            { icon: '📉', stat: '30–45%', label: 'Energy savings with inverter + zoning systems' },
            { icon: '♻️', stat: '99.9%', label: 'Refrigerant recovery with new smart equipment' },
            { icon: '🌡️', stat: '5°F', label: 'Heat pump efficiency threshold in 2026 models' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.5rem' }}>{s.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Find a DFW Pro Who Knows 2026 Tech</div>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.95rem' }}>ProLnk matches you with HVAC pros trained on the latest DFW-relevant innovations.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
