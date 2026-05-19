import { useState } from 'react';

const plans: Record<string, { fixtures: string; cost: string; tips: string[]; control: string }> = {
  'patio-small': { fixtures: '4 path lights + 2 uplights + 1 string light strand (25 ft)', cost: '$800–$1,400', tips: ['Focus uplights on 1–2 feature trees or plants', 'String lights on pergola or fence create instant ambiance', 'Low-voltage system: DIY-friendly'], control: 'Dusk-to-dawn timer' },
  'patio-medium': { fixtures: '8 path lights + 4 uplights + 2 string strands + 2 step lights', cost: '$1,800–$3,200', tips: ['Layer lighting: ambient (string) + accent (uplight) + task (path)', 'Add step lights for safety on any grade changes', 'Smart control syncs with your phone'], control: 'Smart hub (Lutron/Kasa)' },
  'patio-large': { fixtures: '12+ path lights + 6 uplights + 4 string strands + downlights + step lights', cost: '$3,500–$7,000', tips: ['Professional design recommended for large areas', 'Run all wiring underground before hardscaping', 'Use transformers with multiple zones for flexibility'], control: 'Smart hub with zones' },
  'pool-small': { fixtures: '2 underwater LED + 4 path lights + 2 uplights', cost: '$1,200–$2,000', tips: ['Underwater LEDs must be line-voltage rated for pools', 'Warm white (2700K) creates resort ambiance', 'Hire licensed electrician for underwater fixtures'], control: 'Timer with override' },
  'pool-medium': { fixtures: '4 underwater LEDs + 8 path lights + 4 uplights + 2 palms uplighted', cost: '$3,000–$5,500', tips: ['Color-changing LEDs (RGB) let you set moods', 'Downlighting from trees simulates moonlight', 'Keep path lights 8–10 ft apart around pool deck'], control: 'Smart hub with color control' },
  'pool-large': { fixtures: 'Full design: underwater + landscape + feature + architectural', cost: '$6,000–$15,000+', tips: ['Commission a lighting designer for pools over 600 sq ft', 'Budget for future phase — pool lighting expands well', 'Integrate with pool automation system (Pentair/Hayward)'], control: 'Integrated pool automation' },
  'front-small': { fixtures: '4 path lights + 2 uplights on front trees + 1 coach light', cost: '$600–$1,100', tips: ['Path lights define driveway and walkway safely', 'Uplight your best front yard tree for curb appeal', 'Match fixture finish to house hardware (bronze, black)'], control: 'Dusk-to-dawn photocell' },
  'front-medium': { fixtures: '8 path lights + 4 uplights + 2 coach lights + soffit wash', cost: '$1,500–$2,800', tips: ['Soffit lights wash facade without harsh shadows', 'Avoid lighting the garage door — draws eye to utilitarian space', 'Cool white (3000K) on architectural elements looks crisp'], control: 'Smart timer with seasonal adjust' },
  'front-large': { fixtures: 'Full curb appeal package: path + uplights + facade + garage + entry feature', cost: '$3,000–$6,000', tips: ['Professional design elevates home value significantly', 'DFW homes with landscape lighting sell 15% faster', 'Match lighting zones to HOA nighttime restrictions'], control: 'Smart hub with astronomical timer' },
};

export default function DFWOutdoorLightingDesignGuide() {
  const [spaceType, setSpaceType] = useState('patio');
  const [size, setSize] = useState('medium');
  const [showPlan, setShowPlan] = useState(false);

  const key = `${spaceType}-${size}` as keyof typeof plans;
  const plan = plans[key];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          💡 DFW OUTDOOR LIGHTING GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Outdoor Lighting Design for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW outdoor living peaks in the evening — escape daytime heat and extend your space with strategic landscape lighting.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
          {[
            { icon: '🌳', title: 'Uplighting', desc: 'Accent trees and plants from below. Creates drama and depth at night.' },
            { icon: '🚶', title: 'Path Lights', desc: 'Safety + ambiance along walkways and driveways. 8–10 ft spacing ideal.' },
            { icon: '✨', title: 'String Lights', desc: 'Pergolas, fences, trees. Warm 2700K bulbs for DFW outdoor dining feel.' },
            { icon: '🏠', title: 'Soffit/Facade', desc: 'Wash home\’s front face with light. Huge curb appeal boost.' },
            { icon: '🌊', title: 'Pool/Water', desc: 'Underwater LEDs + surrounding landscape lighting = resort at home.' },
            { icon: '📱', title: 'Smart Controls', desc: 'Schedule, dim, and color-shift from phone. Worth the upgrade for large installs.' },
          ].map(p => (
            <div key={p.title} style={{ background: '#1E2D45', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>⚡ Low Voltage vs. Line Voltage</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Low Voltage (12V)</div>
              {['DIY-friendly installation', 'Safe to touch wiring', 'Ideal for path, uplights, string', 'Transformer required ($80–$300)', 'Most landscape lighting is 12V'].map(t => <div key={t} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>✓ {t}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Line Voltage (120V)</div>
              {['Licensed electrician required', 'Underwater/pool fixtures', 'High-output floods and spots', 'More powerful coverage', 'Higher installation cost'].map(t => <div key={t} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>⚡ {t}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Lighting Plan Builder</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Outdoor Space Type</label>
              <select value={spaceType} onChange={e => { setSpaceType(e.target.value); setShowPlan(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="patio">Patio / Backyard</option>
                <option value="pool">Pool Area</option>
                <option value="front">Front Yard / Curb Appeal</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Area Size</label>
              <select value={size} onChange={e => { setSize(e.target.value); setShowPlan(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="small">Small (&lt;300 sq ft)</option>
                <option value="medium">Medium (300–800 sq ft)</option>
                <option value="large">Large (800+ sq ft)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowPlan(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Generate My Lighting Plan 💡
          </button>
          {showPlan && plan && (
            <div style={{ marginTop: 20 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: 12, borderLeft: '4px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>Recommended Fixtures: {plan.fixtures}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Estimated Cost: {plan.cost} · Control: {plan.control}</div>
              </div>
              {plan.tips.map(t => <div key={t} style={{ background: '#162032', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: 8, color: '#94A3B8', fontSize: 14 }}>💡 {t}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#162032', borderRadius: 10, padding: '1rem 1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Need a lighting professional?</div>
          <div style={{ color: '#94A3B8', fontSize: 14 }}>ProLnk connects you with licensed DFW electricians and landscape lighting specialists.</div>
        </div>
      </div>
    </div>
  );
}
