import { useState } from 'react';

const SITUATION_MAP: Record<string, { appropriate: string; protocol: string; waitTime: string; alternatives: string }> = {
  'Post-flood/water damage mold': {
    appropriate: 'Yes — ozone is effective for mold remediation in unoccupied spaces after water damage is fully dried.',
    protocol: 'Remove all people, pets, and plants. Run generator at high output for 3–6 hours. Seal the space.',
    waitTime: '2–4 hours after generator stops. Ventilate fully with fresh air before re-entry.',
    alternatives: 'Professional mold remediation (recommended first), HEPA air scrubbers for ongoing spore control.',
  },
  'Smoke odor (fire or cigarette)': {
    appropriate: 'Yes — ozone is one of the few treatments that neutralizes smoke odor molecules embedded in materials.',
    protocol: 'Vacate completely. Run 4–8 hours depending on severity. Higher concentrations for heavy smoke damage.',
    waitTime: '3–6 hours after completion. Open all windows and run fans before re-entry. Sniff test required.',
    alternatives: 'Thermal fogging (professional), hydroxyl generators (safer, slower), activated carbon placement.',
  },
  'Pet odor': {
    appropriate: 'Sometimes — effective for severe embedded odor but overkill for mild cases. Treat source first.',
    protocol: 'Clean all soiled areas thoroughly first. Then run ozone treatment in vacated home for 2–4 hours.',
    waitTime: '1–2 hours after completion with full ventilation.',
    alternatives: 'Enzymatic cleaners on source areas, activated carbon air purifiers, HEPA filtration.',
  },
  'General freshening': {
    appropriate: 'No — ozone is NOT appropriate for routine air freshening. Health risks outweigh minimal benefit.',
    protocol: 'Do not use ozone generators for this purpose.',
    waitTime: 'N/A',
    alternatives: 'Ventilation with fresh air, activated carbon filters, MERV-13 filtration, UV IAQ systems.',
  },
};

export default function DFWHVACOzoneGeneratorGuide() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<null | { appropriate: string; protocol: string; waitTime: string; alternatives: string }>(null);

  function evaluate() {
    setResult(SITUATION_MAP[situation] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>⚠️ DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Ozone Generators for DFW Homes: Safe Use Guide</h1>
        <p style={{ color: '#9BA8BB', marginBottom: '2rem', lineHeight: 1.7 }}>
          Ozone generators produce O₃ to neutralize mold, smoke odors, and biological contaminants. They're powerful tools for specific
          remediation situations — but dangerous if used incorrectly. This guide covers safe DFW use cases and protocols.
        </p>

        <div style={{ background: '#7F1D1D', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #EF4444' }}>
          <h2 style={{ color: '#FCA5A5', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🚨 Critical Safety Rules — DFW & Everywhere</h2>
          <ul style={{ color: '#FECACA', lineHeight: 2, paddingLeft: '1.25rem', margin: 0 }}>
            <li><strong>NEVER run an ozone generator while occupied.</strong> Ozone damages lungs at high concentrations.</li>
            <li>Remove all people, pets, fish, plants, and living things before starting.</li>
            <li>DFW is an ozone non-attainment area — outdoor ozone is already elevated in summer. Extra caution required.</li>
            <li>Do not re-enter until ozone has fully dissipated (test with detector or wait prescribed time).</li>
            <li>Ozone attacks rubber, latex, and some plastics — remove sensitive items.</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⏱️ General Re-Entry Wait Times</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { scenario: 'Light treatment (1–2 hrs)', wait: '1–2 hrs ventilation' },
              { scenario: 'Moderate treatment (3–5 hrs)', wait: '2–4 hrs ventilation' },
              { scenario: 'Heavy treatment (6–8 hrs)', wait: '4–6 hrs ventilation' },
              { scenario: 'Shock treatment (8+ hrs)', wait: '6+ hrs; test before entry' },
            ].map(row => (
              <div key={row.scenario} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#E8EDF5', fontWeight: 600, fontSize: '0.9rem' }}>{row.scenario}</div>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', marginTop: '0.25rem' }}>{row.wait}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🌡️ DFW Ozone Generator Advisor</h2>
          <label style={{ display: 'block', color: '#9BA8BB', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Your DFW Situation</label>
          <select
            value={situation}
            onChange={e => setSituation(e.target.value)}
            style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: '0.6rem 1rem', width: '100%', marginBottom: '1rem', fontSize: '0.95rem' }}
          >
            <option value="">Select your situation...</option>
            {Object.keys(SITUATION_MAP).map(k => <option key={k}>{k}</option>)}
          </select>
          <button
            onClick={evaluate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
          >
            Is Ozone Right for Me?
          </button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ marginBottom: '0.5rem' }}>✅ <strong>Appropriate?</strong> {result.appropriate}</div>
              <div style={{ marginBottom: '0.5rem' }}>📋 <strong>Protocol:</strong> {result.protocol}</div>
              <div style={{ marginBottom: '0.5rem' }}>⏱️ <strong>Wait Time:</strong> {result.waitTime}</div>
              <div>🔄 <strong>Alternatives:</strong> {result.alternatives}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
          <p style={{ color: '#9BA8BB', fontSize: '0.9rem', margin: 0 }}>
            🏠 <strong style={{ color: '#F5E642' }}>ProLnk Tip:</strong> For water damage mold in DFW, hire a certified mold remediator first — ozone alone won't remove existing mold mass, only surface contamination.
          </p>
        </div>
      </div>
    </div>
  );
}
