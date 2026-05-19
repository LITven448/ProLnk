import { useState } from 'react';

export default function DFWSeepageVsSlabLeak2026() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState('');

  const options = [
    { id: 'hotfloor', label: '🌡️ Hot spot on floor' },
    { id: 'running', label: '🔊 Sound of running water (no fixtures on)' },
    { id: 'billspike', label: '💧 Sudden water bill spike (localized)' },
    { id: 'coldac', label: '❄️ Cold spot in AC output (wet insulation near slab)' },
    { id: 'wetwall', label: '🧱 Wet walls or floors near exterior after rain' },
    { id: 'groundwater', label: '🌧️ Wet after heavy rain only' },
    { id: 'crackwall', label: '🔲 Cracks in walls/foundation near wet area' },
  ];

  const toggle = (id: string) => setSymptoms(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const assess = () => {
    const slab = ['hotfloor', 'running', 'billspike', 'coldac'].filter(s => symptoms.includes(s)).length;
    const seep = ['wetwall', 'groundwater', 'crackwall'].filter(s => symptoms.includes(s)).length;
    if (slab >= 2 && seep === 0) setResult('🚨 HIGH probability SLAB LEAK — call a plumber immediately. Use electronic leak detection. Average DFW slab repair: $1,500–$4,000.');
    else if (seep >= 2 && slab === 0) setResult('🌧️ Likely SEEPAGE — exterior waterproofing or French drain needed. Check grade slope away from foundation. DFW clay soil expands and pushes water toward foundation.');
    else if (slab >= 1 && seep >= 1) setResult('🔍 Mixed symptoms — both issues possible. Schedule a plumber (slab leak test) + foundation inspector together to isolate cause.');
    else setResult('📋 Insufficient data — monitor for 1–2 weeks and note when moisture appears (after rain vs. always present).');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW Plumbing Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>💦 DFW Seepage vs Slab Leak Guide 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Two completely different problems — same symptom of unexpected moisture. Here's how to tell them apart in DFW homes.</p>

        {[
          { icon: '🔥', title: 'Slab Leak Signals', body: 'Hot water line under slab breaks → hot spot on floor, water sound with no fixtures running, sudden bill spike. DFW homes with post-tension slabs are common — slab leaks require specialized detection.' },
          { icon: '🌧️', title: 'Seepage Signals', body: 'DFW clay soil swells with rain and pushes groundwater toward foundation. Wet walls near exterior, moisture only after heavy rain, musty smell in low areas — classic seepage.' },
          { icon: '🔬', title: 'Diagnosis Methods', body: 'Slab leak: electronic acoustic detection ($150–300), thermal imaging. Seepage: visual inspection of grade, downspout discharge, window wells. Key question: does it happen independent of rain?' },
          { icon: '🔧', title: 'Repair Differences', body: 'Slab leak: re-route pipe through attic (tunneling is last resort in DFW). Seepage: regrade soil, extend downspouts, French drain, interior waterproofing membrane.' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#132035', borderRadius: 12, padding: '20px', marginBottom: 16 }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon} <strong>{c.title}</strong></div>
            <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{c.body}</div>
          </div>
        ))}

        <div style={{ background: '#132035', borderRadius: 12, padding: '24px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🩺 Seepage vs Slab Leak Assessment</h2>
          <p style={{ color: '#94A3B8', marginBottom: 16 }}>Select all symptoms you're seeing:</p>
          {options.map(o => (
            <label key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={symptoms.includes(o.id)} onChange={() => toggle(o.id)} style={{ width: 18, height: 18 }} />
              <span style={{ color: '#CBD5E1′ }}>{o.label}</span>
            </label>
          ))}
          <button onClick={assess} style={{ marginTop: 12, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer' }}>
            Assess My Situation
          </button>
          {result && <div style={{ marginTop: 16, padding: '16px', background: '#0A1628', borderRadius: 8, color: '#F5E642', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ marginTop: 32, padding: '20px', background: '#132035', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get a DFW plumber or foundation specialist today</div>
          <div style={{ color: '#94A3B8′ }}>ProLnk matches you with vetted local pros — free quotes in minutes.</div>
        </div>
      </div>
    </div>
  );
}