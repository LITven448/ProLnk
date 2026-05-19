import { useState } from 'react';

const systems = [
  { id: 'adt', icon: '🔵', label: 'ADT', install: 'Professional', contract: '36-month', monitoring: '$45–$65/mo', dfwCoverage: 'Largest DFW footprint — fastest response times in North Texas', pros: 'Largest dealer network in DFW, professional install, cellular + WiFi backup, 24/7 monitoring', cons: '3-year contract, higher monthly cost, equipment not owned until contract end, cancellation fees', bestFor: 'Homeowners wanting full-service, hands-off security with professional monitoring SLA' },
  { id: 'simplisafe', icon: '⚪', label: 'SimpliSafe', install: 'DIY', contract: 'No contract', monitoring: '$20–$30/mo', dfwCoverage: 'Good DFW coverage; cellular monitoring via national network', pros: 'No contract, DIY install (under 1 hr), move with you, affordable monitoring, solid DFW reviews', cons: 'No local DFW dealer support, some advanced features require Pro tier, camera quality varies', bestFor: 'Renters, first-time homeowners, or DFW residents who move frequently' },
  { id: 'ring', icon: '🟡', label: 'Ring Alarm', install: 'DIY', contract: 'No contract', monitoring: '$10–$20/mo', dfwCoverage: 'Ring Neighbors community active in most DFW suburbs — crowd-sourced crime alerts', pros: 'Amazon ecosystem, lowest monitoring cost, Neighbors app for DFW crime visibility, easy DIY setup', cons: 'Amazon data privacy concerns, camera subscription required for recording, basic professional monitoring', bestFor: 'Amazon-ecosystem DFW households wanting budget-friendly monitoring + community crime data' },
  { id: 'vivint', icon: '🟠', label: 'Vivint', install: 'Professional', contract: '60-month', monitoring: '$30–$60/mo', dfwCoverage: 'Strong DFW presence; whole-home integration including smart locks, HVAC, and garage', pros: 'Premium hardware, whole-home integration, best smart home + security combo, 24/7 professional monitoring', cons: 'Longest contract (60 months), highest total cost, must use Vivint ecosystem exclusively', bestFor: 'DFW homeowners building a full smart home who want one integrated system for everything' },
];

const priorities = [
  { label: 'Budget-Conscious', rec: 'Ring Alarm — lowest monthly cost, no contract, still professional monitoring. Add Ring cameras for full coverage.' },
  { label: 'No-Contract Freedom', rec: 'SimpliSafe — best no-contract experience with solid DFW monitoring coverage and easy DIY install.' },
  { label: 'Full Smart Home', rec: 'Vivint — integrates security with smart locks, HVAC control, and garage. Worth the premium for DFW homeowners going all-in.' },
  { label: 'Fastest Professional Response', rec: 'ADT — largest DFW dealer network means fastest install, best local support, and established monitoring SLA.' },
  { label: 'Amazon Ecosystem', rec: 'Ring Alarm — deep Alexa integration, Ring Neighbors community for DFW crime awareness, lowest entry cost.' },
];

export default function DFWHomeSecuritySystemCompare2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);

  const sys = systems.find(s => s.id === selected);
  const pri = priorities.find(p => p.label === priority);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Home Security System Comparison 2026</h1>
          <p style={{ color: '#8BA5C4', margin: 0 }}>ADT vs SimpliSafe vs Ring vs Vivint — for North Texas homes</p>
        </div>

        <div style={{ background: '#1A2840', borderRadius: 10, padding: '14px 18px', marginBottom: 24, fontSize: 14, lineHeight: 1.6 }}>
          <strong style={{ color: '#F5E642′ }}>DFW Context:</strong> DFW burglary rates vary significantly by suburb. 
          Plano and Frisco rank among safest; parts of Dallas/Garland have higher rates. Ring Neighbors community coverage is strong across most DFW suburbs.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>Compare Systems</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12, marginBottom: 24 }}>
          {systems.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#1E3A5F' : '#0F2040', border: `2px solid ${selected === s.id ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 10, padding: 16, cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 30 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#E8F4FD', margin: '6px 0 4px' }}>{s.label}</div>
              <div style={{ fontSize: 12, color: '#F5E642′ }}>{s.monitoring}</div>
              <div style={{ fontSize: 11, color: '#8BA5C4', marginTop: 4 }}>{s.contract}</div>
            </button>
          ))}
        </div>

        {sys && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 22, border: '2px solid #F5E642', marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 14px' }}>{sys.icon} {sys.label}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
              {[{ k: 'Install', v: sys.install }, { k: 'Contract', v: sys.contract }, { k: 'Monitoring', v: sys.monitoring }].map(item => (
                <div key={item.k} style={{ background: '#1A2840', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ color: '#8BA5C4', fontSize: 11 }}>{item.k}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginTop: 4 }}>{item.v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1A2840', borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <div style={{ color: '#8BA5C4', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>DFW COVERAGE</div>
              <div style={{ fontSize: 14, color: '#B8D4EA' }}>{sys.dfwCoverage}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              <div style={{ background: '#0A2010', borderRadius: 8, padding: 10 }}>
                <div style={{ color: '#44BB44', fontWeight: 700, marginBottom: 4 }}>✅ Pros</div>
                <div style={{ fontSize: 13, color: '#B8D4EA' }}>{sys.pros}</div>
              </div>
              <div style={{ background: '#200A0A', borderRadius: 8, padding: 10 }}>
                <div style={{ color: '#FF6666', fontWeight: 700, marginBottom: 4 }}>⚠️ Cons</div>
                <div style={{ fontSize: 13, color: '#B8D4EA' }}>{sys.cons}</div>
              </div>
            </div>
            <div style={{ background: '#1A2840', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#8BA5C4', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>BEST FOR</div>
              <div style={{ fontSize: 14, color: '#F5E642′ }}>{sys.bestFor}</div>
            </div>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>Your Priority → Recommendation</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {priorities.map(p => (
            <button key={p.label} onClick={() => setPriority(p.label)}
              style={{ background: priority === p.label ? '#1E3A5F' : '#0F2040', border: `2px solid ${priority === p.label ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 10, padding: '14px 18px', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: priority === p.label ? 8 : 0 }}>{p.label}</div>
              {priority === p.label && <div style={{ fontSize: 14, color: '#B8D4EA', lineHeight: 1.6 }}>{p.rec}</div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

