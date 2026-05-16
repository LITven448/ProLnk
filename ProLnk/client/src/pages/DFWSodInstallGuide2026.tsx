import { useState } from 'react';

export default function DFWSodInstallGuide2026() {
  const [lawnCondition, setLawnCondition] = useState('');
  const [timing, setTiming] = useState('');
  const [result, setResult] = useState('');

  const getGuide = () => {
    if (!lawnCondition || !timing) { setResult('Please select both options.'); return; }
    const guides: Record<string, Record<string, string>> = {
      bare: {
        spring: '🌱 Ideal! Install Bermuda sod April–June. Till 4–6 inches, add 2 inches compost for DFW clay. Water 3x daily first 2 weeks.',
        summer: '☀️ Viable but demanding. Water 4x daily in DFW heat. Install before 10am. Bermuda establishes fast — stay off grass 3 weeks.',
        fall: '🍂 Marginal. Bermuda goes dormant by November. Consider St. Augustine for better fall establishment. Water daily first 2 weeks.',
        winter: '❄️ Not recommended Dec–Feb. Bermuda won\'t root in cold DFW soil. Wait until March soil temps hit 65°F+.',
      },
      patchy: {
        spring: '🌿 Great timing. Remove dead patches, till 4 inches, level with sandy loam. Match existing grass type for seamless look.',
        summer: '💧 Doable with aggressive watering. Keep new sod moist every 4–6 hours. Avoid midday installation in direct sun.',
        fall: '🍂 Fair. Patch repairs hold better than full installs. Water daily through establishment before first frost.',
        winter: '🚫 Skip it. Dormant soil = no root growth. Mark patches for spring repair instead.',
      },
      renovation: {
        spring: '🔄 Best time to renovate. Kill existing lawn with glyphosate 2 weeks prior. Till 6 inches, add compost + pre-plant fertilizer (10-10-10).',
        summer: '🔥 High risk in DFW heat. If renovating, do it fast — sod must root before 100°F days hit. Irrigation is non-negotiable.',
        fall: '🍂 Good for cool-season grass, not Bermuda. Plan full renovation for following spring if Bermuda is goal.',
        winter: '❌ Do not renovate in winter. Soil is too cold. Plan and prep now, install in March–April.',
      },
    };
    setResult(guides[lawnCondition]?.[timing] || 'Select valid options for a guide.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌿 PROLNK LAWN GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>DFW Sod Installation Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Everything you need to install sod successfully in the Dallas-Fort Worth climate.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[['🌑 Bare Soil', 'bare'], ['🌿 Patchy Lawn', 'patchy'], ['🔄 Full Renovation', 'renovation']].map(([label, val]) => (
            <button key={val} onClick={() => setLawnCondition(val)} style={{ padding: '14px', border: lawnCondition === val ? '2px solid #F5E642' : '1px solid #1e3a5f', borderRadius: 8, background: lawnCondition === val ? '#1e3a5f' : '#0d1f3c', color: '#fff', cursor: 'pointer', textAlign: 'left' }}>{label}</button>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Select installation timing:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🌸 Spring (Mar–May)', 'spring'], ['☀️ Summer (Jun–Aug)', 'summer'], ['🍂 Fall (Sep–Nov)', 'fall'], ['❄️ Winter (Dec–Feb)', 'winter']].map(([label, val]) => (
              <button key={val} onClick={() => setTiming(val)} style={{ padding: '12px', border: timing === val ? '2px solid #F5E642' : '1px solid #1e3a5f', borderRadius: 8, background: timing === val ? '#1e3a5f' : '#0d1f3c', color: '#fff', cursor: 'pointer' }}>{label}</button>
            ))}
          </div>
        </div>

        <button onClick={getGuide} style={{ width: '100%', padding: '16px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 20 }}>Get My Sod Installation Guide ➜</button>

        {result && <div style={{ padding: 20, background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 8, lineHeight: 1.7 }}>{result}</div>}

        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[['🪱 Soil Prep', 'Till 4–6 inches deep. Amend DFW clay with 2–3 inches of compost. Grade away from structures.'],['💧 First 2 Weeks', 'Water 3x daily minimum. Keep sod moist — never soggy. DFW summer may require 4x daily.'],['🧪 Fertilizer', 'Wait 4–6 weeks post-install. Use slow-release 15-5-10 starter fertilizer for DFW clay soil.'],['🚶 Traffic', 'Stay off new sod 3 weeks. Roots need time to anchor into DFW\'s dense clay substrate.']].map(([title, desc]) => (
            <div key={title as string} style={{ padding: 16, background: '#0d1f3c', borderRadius: 8, border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: 20, background: '#0d1f3c', borderRadius: 8, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Need a Sod Pro in DFW?</div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>ProLnk connects you with vetted DFW lawn professionals. Free quotes, no obligation.</p>
          <button style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}