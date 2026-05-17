import { useState } from 'react';

export default function DFWHVACProfessional2026() {
  const [concern, setConcern] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const concernOptions = [
    { label: 'System not cooling well', value: 'cooling' },
    { label: 'High energy bills', value: 'bills' },
    { label: 'Strange noises or smells', value: 'noises' },
    { label: 'Getting a quote for replacement', value: 'replacement' },
    { label: 'Annual maintenance', value: 'maintenance' },
  ];

  const results: Record<string, string> = {
    cooling: 'PROFESSIONAL STANDARD: A tech should run a full diagnostic before touching anything — measure supply/return temperatures, check static pressure, test refrigerant levels with manifold gauges (not assumed), inspect air handler and coil for issues. A tech who immediately recommends refrigerant recharge without diagnostics is not following professional standards. ProLnk Charter pros start every call with a written diagnostic.',
    bills: 'PROFESSIONAL STANDARD: High bills without comfort issues often indicate refrigerant charge issues, dirty coils, or duct leakage. A professional should measure system efficiency (Delta T across coil, static pressure, airflow), not just replace filters. Ask for a static pressure reading — a properly sized DFW system should measure under 0.5 inches w.c. external static pressure.',
    noises: 'PROFESSIONAL STANDARD: Banging, grinding, or refrigerant hissing sounds require physical inspection of all mechanical components before any quote. Electrical burning smells require immediate power-off and capacitor/wiring inspection. A tech who quotes without inspecting the source of the noise is guessing. Get a written inspection report.',
    replacement: 'PROFESSIONAL STANDARD FOR REPLACEMENT QUOTES: Proper replacement requires Manual J load calculation (not just matching old tonnage), written proposal with equipment model numbers and SEER2 ratings, permit pulled before installation (required in DFW), and post-install refrigerant charge verification. Ask if they pull permits — unpermitted installs void manufacturer warranties.',
    maintenance: 'PROFESSIONAL ANNUAL MAINTENANCE INCLUDES: Coil cleaning (evaporator and condenser), refrigerant level check with gauges, capacitor and contactor inspection, condensate drain flush, thermostat calibration, filter replacement, and written report of findings. A 20-minute maintenance visit that skips coil cleaning and refrigerant verification is not a full maintenance.',
  };

  const standards = [
    { emoji: '🔬', label: 'Full diagnostic before quote', detail: 'Not parts-swapping — measure, test, verify first' },
    { emoji: '🌡️', label: 'Refrigerant testing with gauges', detail: 'Never assumed — manifold gauges required every time' },
    { emoji: '📊', label: 'Static pressure measurement', detail: 'Airflow problems are often the hidden culprit' },
    { emoji: '📋', label: 'Written estimate before work', detail: 'No verbal-only quotes on major HVAC work' },
    { emoji: '🏛️', label: 'Permit for major work', detail: 'Required in DFW for full replacements — ask if they pull one' },
    { emoji: '✅', label: 'Post-install verification', detail: 'Refrigerant charge verified after every new install' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>What to Expect from a DFW HVAC Professional</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>Professional HVAC service standards in DFW — what every homeowner should know before any tech touches their system.</p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {standards.map((s) => (
            <div key={s.label} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 14, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{s.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{s.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🔍 What should I expect for my situation?</div>
          <select
            value={concern}
            onChange={(e) => { setConcern(e.target.value); setResult(results[e.target.value] ?? null); }}
            style={{ width: '100%', padding: '12px 14px', backgroundColor: '#0A1628', color: '#E8EDF4', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14, marginBottom: 16 }}
          >
            <option value="">Select your service concern...</option>
            {concernOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642', color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1a1a2e', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>⚡ ProLnk Charter HVAC Pros</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>Every Charter HVAC pro meets all 6 standards above — written diagnostics, permit compliance, and A2L certification for next-gen refrigerants.</div>
        </div>
      </div>
    </div>
  );
}
