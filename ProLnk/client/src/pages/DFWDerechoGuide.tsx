import { useState } from 'react';

const homeTypes = ['Wood Frame', 'Brick Veneer', 'Masonry/Stucco', 'Metal Building'];
const exposureTypes = ['Open Field / Rural', 'Suburban (some trees)', 'Dense Trees / Wooded', 'Urban High-Rise Area'];

const riskMap: Record<string, Record<string, { risk: string; color: string; checklist: string[]; damages: string[]; recovery: string[] }>> = {
  'Wood Frame': {
    'Open Field / Rural': { risk: 'VERY HIGH', color: '#EF4444', checklist: ['Anchor roof decking with ring-shank nails', 'Install hurricane straps on all rafters', 'Reinforce garage door with bracing kit', 'Secure outbuildings with ground anchors', 'Clear debris within 30ft of structure'], damages: ['Roof decking lift-off', 'Siding panel loss', 'Window failure from debris', 'Unsecured structure total loss'], recovery: ['Roof inspection first', 'Structural integrity check', 'Document all damage before cleanup', 'HVAC system inspection'] },
    'Suburban (some trees)': { risk: 'HIGH', color: '#F97316', checklist: ['Trim tree limbs within 10ft of roof', 'Reinforce entry doors with deadbolts', 'Secure fence panels', 'Store patio furniture inside', 'Check attic ventilation screens'], damages: ['Tree impact on roof', 'Fence and gate damage', 'Gutter system loss', 'Soffit and fascia damage'], recovery: ['Tree removal first', 'Roof and attic inspection', 'Gutter reattachment', 'Fence replacement'] },
    'Dense Trees / Wooded': { risk: 'EXTREME', color: '#DC2626', checklist: ['Professional tree risk assessment annually', 'Emergency tree removal budget in place', 'Reinforce all roof penetrations', 'Impact-resistant shingles required', 'Whole-home generator for outage prep'], damages: ['Major tree falls on structure', 'Extended power outages (5-10 days)', 'Complete roof section loss', 'Foundation impact from large falls'], recovery: ['Emergency tree service immediately', 'Structural engineer assessment', 'Extended accommodation plan', 'Full insurance documentation'] },
    'Urban High-Rise Area': { risk: 'MODERATE', color: '#EAB308', checklist: ['Secure rooftop HVAC units', 'Check building facade anchoring', 'Store balcony items inside', 'Verify building emergency plan'], damages: ['Rooftop equipment displacement', 'Balcony furniture projectiles', 'Facade material loss', 'Window pressure failure'], recovery: ['Building management coordination', 'Balcony inspection', 'Window seal check', 'HVAC restart procedure'] },
  },
};

export default function DFWDerechoGuide() {
  const [homeType, setHomeType] = useState('');
  const [exposure, setExposure] = useState('');
  const result = homeType && exposure ? (riskMap[homeType]?.[exposure] ?? null) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌬️ DFW Derecho Guide</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>Straight-Line Wind Events in DFW</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', lineHeight: 1.6 }}>Derechos are widespread, long-lived wind events producing sustained damage across hundreds of miles. Unlike tornadoes, derecho winds hit from one direction but can exceed 100 mph over massive areas — DFW has experienced multiple events including the 2022 and 2024 derechos that left millions without power.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ emoji: '🌀', title: 'Tornado vs Derecho', desc: 'Tornadoes rotate and are narrow. Derechos are straight-line and wide — damage hits an entire neighborhood simultaneously, not just one path.' }, { emoji: '📏', title: 'Scale of Damage', desc: 'A single derecho can damage homes across 400+ miles. The 2022 DFW event caused $1.2B in insured losses across 8 counties in under 3 hours.' }, { emoji: '⏱️', title: 'Warning Time', desc: 'Derechos can intensify rapidly. NWS may issue Severe Thunderstorm Warnings just 20-30 minutes before peak winds arrive at your location.' }, { emoji: '🏠', title: 'DFW Vulnerability', desc: "DFW homes are largely wood-frame construction designed for heat, not high winds. Garage doors are the most common failure point in derecho events." }].map(c => (
            <div key={c.title} style={{ background: '#132038', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.25rem' }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132038', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🔍 Your Derecho Risk Assessment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Home Construction Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E2E8F0', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '0.75rem', fontSize: '1rem' }}>
                <option value="">Select type...</option>
                {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>DFW Exposure Level</label>
              <select value={exposure} onChange={e => setExposure(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E2E8F0', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '0.75rem', fontSize: '1rem' }}>
                <option value="">Select exposure...</option>
                {exposureTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div>
              <div style={{ background: result.color + '22', border: `2px solid ${result.color}`, borderRadius: '8px', padding: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Your Derecho Risk Level</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: result.color }}>{result.risk}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                {[{ title: '✅ Prep Checklist', items: result.checklist }, { title: '⚠️ Expected Damages', items: result.damages }, { title: '🔧 Recovery Priority', items: result.recovery }].map(s => (
                  <div key={s.title} style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem', fontSize: '0.875rem' }}>{s.title}</div>
                    {s.items.map((item, i) => <div key={i} style={{ color: '#94A3B8', fontSize: '0.8rem', marginBottom: '0.4rem', lineHeight: 1.4 }}>{item}</div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1a0a0a', border: '1px solid #7F1D1D', borderRadius: '8px', padding: '1rem' }}>
          <div style={{ fontWeight: 600, color: '#FCA5A5', marginBottom: '0.5rem' }}>⚡ During a Derecho Warning</div>
          <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6 }}>Move to interior rooms away from windows. Do NOT shelter in a garage — garage doors are the highest failure point. Avoid trees. If in a vehicle, do not park under overpasses. Power outages will likely last 3-7 days in major events — prepare accordingly.</div>
        </div>
      </div>
    </div>
  );
}
