import { useState } from 'react';

const zoneTypes = ['Small lawn area (under 500 sq ft)', 'Large lawn area (500+ sq ft)', 'Landscape beds', 'Slopes or irregular areas', 'Mixed lawn + beds', 'Water-restricted neighborhood'];

const headGuide: Record<string, { type: string; icon: string; precip: string; pros: string[]; cons: string[]; dfwNote: string }> = {
  'Small lawn area (under 500 sq ft)': { type: 'Fixed Spray Heads', icon: '💦', precip: '1.5–2.0 in/hr', pros: ['Inexpensive', 'Easy to install', 'Good for tight spaces'], cons: ['High precipitation rate challenges DFW 2x/week limits', 'Wind drift in DFW storms'], dfwNote: 'Use short run times (8–10 min) to stay within DFW water budgets on spray zones.' },
  'Large lawn area (500+ sq ft)': { type: 'Rotor Heads', icon: '🔄', precip: '0.5–1.0 in/hr', pros: ['Lower precip rate — DFW restriction friendly', 'Covers 15–35 ft radius', 'Less wind drift'], cons: ['Slower application — needs longer run time', 'Higher cost per head'], dfwNote: 'Rotors are ideal for DFW — longer run time + lower rate works well with even/odd watering schedules.' },
  'Landscape beds': { type: 'Drip Emitters / Low-Angle Sprays', icon: '🌿', precip: '0.1–0.5 in/hr (drip)', pros: ['Highly water-efficient', 'No overspray on sidewalks', 'DFW water authority approved for unrestricted use (drip)'], cons: ['Requires pressure regulation', 'DFW hard water clogs emitters without filter'], dfwNote: 'Many DFW cities exempt drip from watering day restrictions — verify with your water provider.' },
  'Slopes or irregular areas': { type: 'MP Rotators (Hunter MP or Rain Bird)', icon: '🏔️', precip: '0.4–0.6 in/hr', pros: ['Matched precipitation rate', 'Low precip = less runoff on DFW clay slopes', 'Works in spray head bodies'], cons: ['Slightly higher cost than standard sprays', 'Requires 30–50 PSI min'], dfwNote: 'Best head for DFW slopes — slow rate allows clay soil absorption before runoff occurs.' },
  'Mixed lawn + beds': { type: 'Separate Zones: Rotors for lawn, Drip for beds', icon: '🔀', precip: 'Zone-specific', pros: ['Optimal efficiency', 'Separate scheduling', 'DFW-compliant'], cons: ['More zones required', 'Higher install cost'], dfwNote: 'Never mix — lawn needs 2x the water beds do. Shared zones cause over/under watering in DFW heat.' },
  'Water-restricted neighborhood': { type: 'MP Rotators + Drip Hybrid', icon: '💧', precip: '0.4–0.6 in/hr', pros: ['Max efficiency', 'Works within 2x/week DFW limits', 'Often qualifies for DFW water rebates'], cons: ['Higher upfront cost', 'Design complexity'], dfwNote: 'Check NTMWD or your city for smart irrigation rebates — up to $200 back for MP rotator conversion.' },
};

export default function DFWSprayHeadVsRotorDFW2026() {
  const [selected, setSelected] = useState('');

  const guide = selected ? headGuide[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk DFW Guide · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>💦 DFW Spray Head vs Rotor Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>Which irrigation head is right for your DFW yard? Precipitation rate, drought restrictions, and clay soil make head selection critical in North Texas.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Fixed Spray', precip: '1.5–2.0 in/hr', best: 'Small areas', icon: '💦', color: '#3B82F6' },
            { label: 'Rotor', precip: '0.5–1.0 in/hr', best: 'Large lawns', icon: '🔄', color: '#10B981' },
            { label: 'MP Rotator', precip: '0.4–0.6 in/hr', best: 'Slopes / DFW', icon: '🏔️', color: '#F5E642' },
          ].map(h => (
            <div key={h.label} style={{ background: '#0F2040', borderRadius: 12, padding: 18, borderTop: `3px solid ${h.color}`, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{h.icon}</div>
              <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 15 }}>{h.label}</div>
              <div style={{ color: '#F5E642', fontSize: 13, margin: '4px 0' }}>{h.precip}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>Best for: {h.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔧 Find Your DFW Head Type</h2>
          <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>What is your irrigation zone situation?</label>
          <select value={selected} onChange={e => setSelected(e.target.value)} style={{ width: '100%', background: '#162035', border: '1px solid #1E3A5F', color: '#E8EAF6', borderRadius: 8, padding: '12px 14px', fontSize: 15, marginBottom: 20 }}>
            <option value=''>Select zone type</option>
            {zoneTypes.map(z => <option key={z}>{z}</option>)}
          </select>
          {guide && (
            <div style={{ background: '#162035', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{guide.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 4 }}>Recommended: {guide.type}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 14 }}>Precipitation rate: {guide.precip}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <div style={{ color: '#10B981', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>✅ Pros</div>
                  {guide.pros.map(p => <div key={p} style={{ color: '#94A3B8', fontSize: 12, marginBottom: 3 }}>• {p}</div>)}
                </div>
                <div>
                  <div style={{ color: '#EF4444', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>⚠️ Cons</div>
                  {guide.cons.map(c => <div key={c} style={{ color: '#94A3B8', fontSize: 12, marginBottom: 3 }}>• {c}</div>)}
                </div>
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 12 }}>🌵 DFW NOTE: </span>
                <span style={{ color: '#94A3B8', fontSize: 12 }}>{guide.dfwNote}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get a DFW Irrigation Head Upgrade Quote</div>
          <div style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>Licensed DFW irrigators, MP rotator conversions, same-week service.</div>
          <a href='/' style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}