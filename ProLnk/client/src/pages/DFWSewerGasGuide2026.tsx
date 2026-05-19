import { useState } from 'react';

type SmellLocation = 'basement' | 'bathroom' | 'kitchen' | 'laundry' | 'whole_house';

const locations: { id: SmellLocation; label: string; emoji: string }[] = [
  { id: 'basement', label: 'Basement or crawl space', emoji: '🏚️' },
  { id: 'bathroom', label: 'Bathroom (toilet or floor drain area)', emoji: '🚽' },
  { id: 'kitchen', label: 'Kitchen sink area', emoji: '🍳' },
  { id: 'laundry', label: 'Laundry room', emoji: '👕' },
  { id: 'whole_house', label: 'Whole house or multiple rooms', emoji: '🏠' },
];

const investigations: Record<SmellLocation, { cause: string; dfwNote: string; steps: string[]; urgency: string }> = {
  basement: {
    cause: 'Cracked sewer lateral or failed cleanout cap',
    dfwNote: 'DFW clay soil movement cracks buried sewer laterals — very common in older DFW neighborhoods',
    steps: ['Check floor drain for dry P-trap — pour water in and wait 24 hours to test', 'Inspect cleanout caps for cracks or missing covers', 'Schedule camera inspection of lateral to rule out crack'],
    urgency: 'High — methane from sewer gas is combustible, act promptly'
  },
  bathroom: {
    cause: 'Dry P-trap or failed wax ring seal',
    dfwNote: 'Guest bathrooms rarely used = dry P-trap is most common DFW sewer gas call',
    steps: ['Run all fixtures for 60 seconds to refill P-traps', 'Check toilet base for wax ring failure (rocking toilet = red flag)', 'Inspect floor drain if present — pour water to re-seal trap'],
    urgency: 'Medium — likely dry trap, quick fix if caught early'
  },
  kitchen: {
    cause: 'Dry P-trap under sink or cracked drain connection',
    dfwNote: 'Infrequently used kitchen sinks and ice maker drains dry out in DFW heat',
    steps: ['Run sink water for 2 minutes to refill P-trap', 'Check drain connection at wall for cracks or gaps', 'Inspect garbage disposal flange seal'],
    urgency: 'Low-Medium — usually a simple P-trap fix'
  },
  laundry: {
    cause: 'Floor drain dry trap or standpipe issue',
    dfwNote: 'Laundry floor drains in DFW often go unused — evaporation leaves dry trap open to sewer',
    steps: ['Pour 2 cups of water into floor drain to reseal trap', 'Check standpipe connection for gaps around washing machine drain hose', 'If smell persists, inspect for cracked drain connection behind wall'],
    urgency: 'Low — floor drain dry trap is the most likely cause, easy fix'
  },
  whole_house: {
    cause: 'Cracked sewer main, failed vent stack, or major lateral break',
    dfwNote: 'Widespread smell in DFW often means clay movement cracked the main sewer line under the slab',
    steps: ['Do not use gas appliances until source is confirmed — methane risk', 'Open windows for ventilation immediately', 'Call a plumber for emergency camera inspection of sewer main', 'If smell is sulfur/rotten egg and very strong, call 911 (gas vs sewer confirmation)'],
    urgency: 'Critical — evacuate if smell is sudden and strong, call emergency services'
  },
};

export default function DFWSewerGasGuide2026() {
  const [selected, setSelected] = useState<SmellLocation | null>(null);

  const guide = selected ? investigations[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>👃</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Sewer Gas Guide 2026</h1>
          <p style={{ color: '#94a3b8′ }}>Rotten egg smell in your DFW home — causes and what to do</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>⚠️ What Is Sewer Gas?</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li><strong style={{ color: '#F5E642′ }}>Hydrogen sulfide</strong> — rotten egg odor, toxic in high concentrations</li>
            <li><strong style={{ color: '#F5E642′ }}>Methane</strong> — odorless but combustible, explosion risk</li>
            <li>DFW clay soil movement cracks sewer laterals — most common entry point in DFW</li>
            <li>Dry P-traps from unused fixtures are the most frequent sewer gas cause in DFW</li>
          </ul>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔍 Smell Location → Investigation Guide</h2>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            {locations.map(l => (
              <button key={l.id} onClick={() => setSelected(selected === l.id ? null : l.id)}
                style={{ background: selected === l.id ? '#F5E642′ : '#0f172a', color: selected === l.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.75rem 1rem', textAlign: ’left', cursor: 'pointer', fontSize: '0.95rem' }}>
                {l.emoji} {l.label}
              </button>
            ))}
          </div>
          {guide && (
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Most Likely Cause: {guide.cause}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem', fontStyle: 'italic' }}>🌍 {guide.dfwNote}</div>
              <ol style={{ color: '#cbd5e1', paddingLeft: '1.2rem', lineHeight: 1.8, margin: '0 0 0.75rem' }}>
                {guide.steps.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
              <div style={{ color: guide.urgency.startsWith('Critical') ? '#ef4444′ : '#F5E642', fontWeight: 600, fontSize: '0.9rem' }}>⚡ Urgency: {guide.urgency}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}