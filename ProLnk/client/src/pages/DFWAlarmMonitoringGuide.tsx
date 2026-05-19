import { useState } from 'react';

const plans = {
  self: { label: 'Self-Monitoring', icon: '📱', cost: '$0/mo (hardware: $300-$800)', description: 'Alerts go directly to your phone. You call 911 yourself.', dfwNote: 'Works well if you are always reachable. DFW police response without monitoring averages 15-25 mins.', pros: ['No monthly fee', 'Full control', 'No false alarm fines (you cancel)'], cons: ['You must be available 24/7', 'No backup if phone is dead', 'Slower police dispatch'] },
  basic: { label: 'Basic Professional Monitoring', icon: '🛡️', cost: '$15-$30/mo', description: 'Monitoring center calls you, then dispatches police if no answer.', dfwNote: 'Reduces DFW response time to 8-15 mins. Dallas charges $50+ per false alarm — get pet-immune sensors.', pros: ['24/7 coverage', 'Faster police dispatch', 'Works when you are unavailable'], cons: ['Monthly fee', 'False alarm fines possible', 'Call before dispatch delay'] },
  premium: { label: 'Premium Monitoring + Smart Integration', icon: '🏆', cost: '$35-$65/mo', description: 'Instant dispatch, camera verification, smart home integration, cellular backup.', dfwNote: 'Camera verification reduces DFW false alarm fines — police prioritize verified alarms.', pros: ['Instant verified dispatch', 'Camera verification', 'Cellular backup (no WiFi needed)', 'Smart home integration'], cons: ['Higher monthly cost', 'Contract often required'] },
};

const suburbMap: Record<string, Record<string, string>> = {
  dallas: { selfmonitor: 'basic', professional: 'premium', unsure: 'basic' },
  plano: { selfmonitor: 'self', professional: 'premium', unsure: 'basic' },
  frisco: { selfmonitor: 'self', professional: 'basic', unsure: 'basic' },
  fortworth: { selfmonitor: 'basic', professional: 'premium', unsure: 'premium' },
};

export default function DFWAlarmMonitoringGuide() {
  const [suburb, setSuburb] = useState('');
  const [preference, setPreference] = useState('');
  const [result, setResult] = useState('');
  function getRecommendation() { if (!suburb || !preference) return; setResult(suburbMap[suburb]?.[preference] ?? 'basic'); }
  const rec = result ? plans[result as keyof typeof plans] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1 }}>DFW HOME SECURITY</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚨 Alarm Monitoring Guide for DFW</h1>
        <p style={{ color: '#9EAFC2', marginBottom: 12, lineHeight: 1.6 }}>Professional monitoring vs self-monitoring — what DFW homeowners need to know about response times, false alarm fines, and police partnerships.</p>
        <div style={{ background: '#1A0A0A', border: '1px solid #F87171', borderRadius: 10, padding: 14, marginBottom: 28, fontSize: 13, color: '#F87171′ }}>
          ⚠️ DFW False Alarm Fines: Dallas charges $50+ per false alarm. Plano and Frisco have similar policies. Reduce false alarms with pet-immune sensors and cellular backup to prevent power outage triggers.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 32 }}>
          {Object.entries(plans).map(([k, p]) => (
            <div key={k} style={{ background: '#111E35', borderRadius: 12, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: '#F5E642′ }}>{p.label}</div>
              <div style={{ color: '#4ADE80', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{p.cost}</div>
              <div style={{ color: '#9EAFC2', fontSize: 12, marginBottom: 10 }}>{p.description}</div>
              <div style={{ background: '#1E3A5F', borderRadius: 6, padding: 8, fontSize: 11, color: '#F5E642', marginBottom: 10 }}>🌡️ {p.dfwNote}</div>
              {p.pros.map((pr: string, i: number) => <div key={i} style={{ fontSize: 11, color: '#4ADE80', marginBottom: 2 }}>✓ {pr}</div>)}
              {p.cons.map((c: string, i: number) => <div key={i} style={{ fontSize: 11, color: '#F87171', marginBottom: 2 }}>✗ {c}</div>)}
            </div>
          ))}
        </div>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🎯 Find Your Monitoring Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9EAFC2', marginBottom: 8 }}>DFW Suburb</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['dallas', 'Dallas'], ['plano', 'Plano'], ['frisco', 'Frisco'], ['fortworth', 'Fort Worth']].map(([v, l]) => (
                <button key={v} onClick={() => setSuburb(v)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: suburb === v ? '#F5E642′ : '#1E3A5F', color: suburb === v ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9EAFC2', marginBottom: 8 }}>Monitoring Preference</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['selfmonitor', 'Self-monitor'], ['professional', 'Professional'], ['unsure', 'Not sure']].map(([v, l]) => (
                <button key={v} onClick={() => setPreference(v)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: preference === v ? '#F5E642′ : '#1E3A5F', color: preference === v ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>{l}</button>
              ))}
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Recommendation →</button>
        </div>
        {rec && (
          <div style={{ background: '#0F2940', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{rec.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 4 }}>Recommended: {rec.label}</div>
            <div style={{ color: '#4ADE80', fontWeight: 700, marginBottom: 8 }}>{rec.cost}</div>
            <div style={{ color: '#9EAFC2', fontSize: 14 }}>{rec.dfwNote}</div>
          </div>
        )}
        <div style={{ marginTop: 32, textAlign: 'center', color: '#9EAFC2', fontSize: 12 }}>🏠 ProLnk connects you with licensed DFW alarm and security specialists</div>
      </div>
    </div>
  );
}
