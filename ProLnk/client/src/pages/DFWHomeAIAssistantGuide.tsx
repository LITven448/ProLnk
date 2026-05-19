import { useState } from 'react';

const aiFeatures = [
  { id: 'hvac', label: 'Smart HVAC', now: ['Nest/Ecobee auto-scheduling', 'Energy usage reports', 'Remote control via app'], soon: ['Compressor failure prediction', 'Auto-schedule ProLnk HVAC tech', 'AI-optimized setpoints by DFW weather'] },
  { id: 'security', label: 'Security System', now: ['Motion alerts', 'Smart lock control', 'Camera AI person detection'], soon: ['Predictive intrusion patterns', 'Neighborhood threat correlation', 'AI insurance discount filing'] },
  { id: 'plumbing', label: 'Water & Plumbing', now: ['Leak sensors + shutoff valves', 'Water usage tracking'], soon: ['Pipe corrosion prediction', 'ProLnk plumber pre-dispatch', 'DFW water pressure anomaly alerts'] },
  { id: 'basic', label: 'Basic Smart Home', now: ['Smart bulbs', 'Voice assistant', 'Smart plugs'], soon: ['AI routine optimization', 'Energy arbitrage scheduling', 'Contractor briefing packets'] },
];

export default function DFWHomeAIAssistantGuide() {
  const [selected, setSelected] = useState('hvac');
  const feature = aiFeatures.find(f => f.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🤖</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '16px 0 8px' }}>AI Home Assistant Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>How AI is transforming DFW home management in 2026 — from smart quotes to predictive maintenance</p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>⚡ What AI Is Doing for DFW Homes Right Now</h2>
          {[
            ['🔍', 'Quote Intelligence', 'ProLnk AI analyzes 3–5 contractor quotes instantly, flags outliers, and explains pricing differences in plain English.'],
            ['🌡️', 'Predictive HVAC Scheduling', 'AI learns your DFW cooling habits and pre-cools before peak rate hours (3–7pm) saving $40–$90/month.'],
            ['🏠', 'Natural Language Control', '"Make it 74 and don\’t run the AC after 6pm on weekdays" — AI understands context, not just commands.'],
            ['📋', 'Contractor Briefing Packets', 'ProLnk\’s AI generates home-specific briefing docs so techs arrive knowing your system\’s history.'],
          ].map(([icon, title, desc]) => (
            <div key={title as string} style={{ display: 'flex', gap: 16, marginBottom: 20, background: '#0A1628', borderRadius: 12, padding: 16 }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{title}</div><div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>🔮 Your Setup → AI Capabilities</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Select your current smart home setup to see what AI can do for your DFW home now vs. coming soon:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {aiFeatures.map(f => (
              <button key={f.id} onClick={() => setSelected(f.id)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: selected === f.id ? '#F5E642′ : '#1e3a5f', background: selected === f.id ? '#F5E642' : ’transparent', color: selected === f.id ? '#0A1628′ : '#94a3b8', fontWeight: 700, cursor: ’pointer', fontSize: 14 }}>{f.label}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 10 }}>✅ Available Now</div>
              {feature.now.map(item => <div key={item} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8, paddingLeft: 8, borderLeft: '2px solid #22c55e' }}>{item}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🚀 Coming Soon</div>
              {feature.soon.map(item => <div key={item} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8, paddingLeft: 8, borderLeft: '2px solid #F5E642′ }}>{item}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏡</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get AI-Matched with DFW Pros</h3>
          <p style={{ color: '#112240', fontSize: 15, marginBottom: 16 }}>ProLnk uses AI to match your home's exact needs with the right contractor — no guesswork, no overpaying.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Join the ProLnk Waitlist →</button>
        </div>
      </div>
    </div>
  );
}
