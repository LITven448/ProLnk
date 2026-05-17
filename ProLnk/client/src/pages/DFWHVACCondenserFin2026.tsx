import { useState } from 'react';

const situations: Record<string, { title: string; steps: string[]; warning: string }> = {
  dirty: {
    title: '🧹 Dirty / Clogged Fins (Cottonwood Season)',
    steps: ['Turn OFF power to outdoor condenser unit at disconnect box', 'Remove any debris (cottonwood, leaves) from top and sides by hand', 'Spray fins from INSIDE OUT with garden hose — never outside in or you push debris deeper', 'Use gentle stream, not pressure washer — high pressure bends aluminum fins', 'Allow unit to dry 10–15 min before restoring power'],
    warning: 'DFW cottonwood season (April–May) can clog condenser fins in 48 hours. Weekly inspection during this period is recommended.',
  },
  bent: {
    title: '🔧 Bent Fins (Post-Hail or Physical Damage)',
    steps: ['Purchase a fin comb / fin straightening tool ($10–$15 at hardware stores)', 'Select the tine spacing that matches your fin pitch (typically 14–17 fins per inch)', 'Gently comb bent sections in the direction of fin orientation — never sideways', 'Work in 6-inch sections top to bottom to avoid re-bending adjacent fins', 'After straightening, inspect for any fins that tore — torn fins need professional repair'],
    warning: 'DFW hail storms frequently dent condenser fins. Even 20% fin damage can reduce efficiency 5–10%. After any hail event, inspect before the next hot stretch.',
  },
  blocked: {
    title: '🌿 Blocked Airflow (Landscaping / Enclosure)',
    steps: ['Clear 18–24 inches of open space around all sides of condenser unit', 'Trim shrubs, hedges, or grass that has grown into clearance zone', 'Remove any condenser enclosures, decorative fencing, or fence-adjacent placement that restricts airflow', 'Check for volunteer trees or vines growing through the fins from below', 'Reposition if unit is sited against a wall with less than 12 inches clearance'],
    warning: 'Many DFW homes have condensers behind fences or in landscape beds. Restricted airflow raises head pressure and can shorten compressor life by years.',
  },
  efficiency: {
    title: '📉 Reduced Efficiency (System Runs Longer)',
    steps: ['Start with a full visual inspection — look for fin damage, debris, and clearance issues', 'Clean fins per the dirty fins procedure above even if they look OK', 'Check for ice forming on refrigerant lines — ice indicates airflow restriction or low charge', 'After cleaning, monitor supply vs. return temperature differential (target 15–20°F in DFW summer)', 'If differential does not improve after cleaning, schedule HVAC technician to check refrigerant charge'],
    warning: 'A dirty condenser in DFW summer can raise electricity bills 10–25% while reducing cooling capacity. Annual cleaning is the highest-ROI HVAC maintenance task.',
  },
};

export default function DFWHVACCondenserFin2026() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>🌬️ AC Condenser Fin Cleaning & Repair Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.6 }}>Maintaining condenser fins in DFW — aluminum fins bend easily in hail, clog with cottonwood, and lose efficiency when blocked. Fin care is the highest-impact DIY HVAC maintenance task.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📐 Understanding Condenser Fins</h2>
          {[
            ['🌬️', 'Function', 'Aluminum fins surround the condenser coil — they maximize surface area for heat transfer from refrigerant to outdoor air.'],
            ['⚡', 'Efficiency Impact', 'Bent or clogged fins restrict airflow. Even 15% restriction raises operating pressure and reduces cooling output.'],
            ['🌧️', 'DFW Hail Risk', 'DFW averages 5–8 significant hail events per year. Quarter-size hail (1 inch) will bend fins on any exposed unit.'],
            ['🌸', 'Cottonwood Clog', 'Cottonwood tree seeds blanket DFW from mid-April to late May — condensers can clog to near-zero airflow in days.'],
          ].map(([icon, label, text]) => (
            <div key={label} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.85rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.3rem', flexShrink: 0 }}>{icon}</div>
              <div><div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem' }}>{label}</div><div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{text}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Select Your Condenser Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {Object.entries(situations).map(([key, val]) => (
              <button key={key} onClick={() => setSelected(key)} style={{ background: selected === key ? '#1E3A5F' : '#0A1628', color: '#E2E8F0', border: `1px solid ${selected === key ? '#F5E642' : '#2D4A7A'}`, borderRadius: 8, padding: '0.75rem 1rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem', textAlign: 'left' }}>{val.title}</button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>{situations[selected].title}</div>
              {situations[selected].steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0, fontWeight: 700 }}>{i + 1}.</span>
                  <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{s}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', background: '#0F2040', borderLeft: '3px solid #EF4444', padding: '0.75rem', borderRadius: 6 }}>
                <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>⚠️ {situations[selected].warning}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🛠️ DFW Maintenance Calendar</h2>
          {[['March', 'Pre-season inspection — clean fins, clear debris, check clearances before 90°F weather arrives'], ['April–May', 'Weekly cottonwood debris removal — check fins every 5–7 days during shedding season'], ['June–August', 'Monthly cleaning — DFW peak season, maximum heat load, fins collect dust and grass clippings'], ['After Any Hail', 'Immediate fin inspection — straighten bent fins before the next hot day']].map(([m, t]) => (
            <div key={m} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0, width: 80 }}>{m}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{t}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>ProLnk DFW HVAC Resource · 2026</div>
      </div>
    </div>
  );
}