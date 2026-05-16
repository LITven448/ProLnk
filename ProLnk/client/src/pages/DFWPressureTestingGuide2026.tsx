import { useState } from 'react';

type TestSituation = 'post_repair' | 'new_install' | 'suspect_leak' | 'pre_sale' | 'permit';

const situations: { id: TestSituation; label: string; emoji: string }[] = [
  { id: 'post_repair', label: 'Verifying a repair just completed', emoji: '🔧' },
  { id: 'new_install', label: 'New plumbing installation', emoji: '🏗️' },
  { id: 'suspect_leak', label: 'Suspect a leak but can't find it', emoji: '🔍' },
  { id: 'pre_sale', label: 'Pre-sale plumbing inspection', emoji: '🏠' },
  { id: 'permit', label: 'City permit inspection requirement', emoji: '📋' },
];

const guides: Record<TestSituation, { test: string; steps: string[]; passNote: string }> = {
  post_repair: {
    test: 'Static Pressure Hold Test',
    steps: ['Shut off main supply valve', 'Attach pressure gauge to hose bib', 'Pressurize to normal operating level (60-80 PSI in DFW)', 'Watch gauge for 15 minutes — no drop = pass'],
    passNote: 'Pressure holds steady → repair is solid. Any drop → locate and fix before closing walls.'
  },
  new_install: {
    test: 'Hydrostatic Pressure Test',
    steps: ['Cap all open ends', 'Fill system with water (no air pockets)', 'Pressurize to 1.5x working pressure (typically 100-150 PSI)', 'Hold for 2 hours — no pressure loss = pass'],
    passNote: 'Standard for new DFW construction — required before inspector signs off.'
  },
  suspect_leak: {
    test: 'Leak-Down Test',
    steps: ['Shut off all fixtures and valves', 'Record meter reading', 'Wait 2 hours with no water use', 'Re-read meter — any change = active leak somewhere'],
    passNote: 'Meter moves with everything off → you have a leak. Call a plumber for camera inspection.'
  },
  pre_sale: {
    test: 'Full System Inspection + Static Test',
    steps: ['Check all supply lines for corrosion or drips', 'Run static pressure test at each fixture zone', 'DFW typical PSI: 60-80 (above 80 = PRV needed)', 'Document results for buyer disclosure'],
    passNote: 'DFW homes often have PRV issues — high pressure is a common disclosure item.'
  },
  permit: {
    test: 'City-Required Pressure Test (DFW standard)',
    steps: ['Pressurize system to 150 PSI (city standard)', 'Hold for 15 minutes minimum', 'Inspector witnesses or reviews documented results', 'All joints visible — no drywall until pass'],
    passNote: 'Dallas/Fort Worth inspectors require documented pressure hold — get written sign-off.'
  },
};

export default function DFWPressureTestingGuide2026() {
  const [selected, setSelected] = useState<TestSituation | null>(null);

  const guide = selected ? guides[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>📊</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Plumbing Pressure Testing Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>Know your PSI — pressure testing plumbing in DFW homes</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>💡 DFW Pressure Basics</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li>Normal DFW water supply pressure: <strong style={{ color: '#F5E642' }}>60–80 PSI</strong></li>
            <li>Above 80 PSI: pressure reducing valve (PRV) required — common DFW issue</li>
            <li>Below 40 PSI: low pressure issue — check for galvanized restriction or PRV failure</li>
            <li>Pressure drop during hold test = active leak — find it before finishing work</li>
          </ul>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Testing Situation → Guide</h2>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#0f172a', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.75rem 1rem', textAlign: 'left', cursor: 'pointer', fontSize: '0.95rem' }}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
          {guide && (
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.75rem' }}>🧪 {guide.test}</div>
              <ol style={{ color: '#cbd5e1', paddingLeft: '1.2rem', lineHeight: 1.8, margin: '0 0 0.75rem' }}>
                {guide.steps.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>✅ {guide.passNote}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}