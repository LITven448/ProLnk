import { useState } from 'react';

export default function DFWHVACRefrigerantTypes2026() {
  const [age, setAge] = useState('');
  const [refrigerant, setRefrigerant] = useState('');

  const getGuide = () => {
    if (!age || !refrigerant) return null;
    const yr = parseInt(age);
    if (refrigerant === 'r22') {
      return yr < 2010
        ? 'Your R-22 system is older and uses a refrigerant phased out Jan 2020. Recharge is still legal using reclaimed R-22 but costs $80-150/lb vs $10/lb for modern refrigerants. A leak repair + recharge on an old system often costs more than replacement. Budget $6,000-10,000 for a new system with R-410A or R-454B.'
        : 'R-22 was phased out in 2020. Even newer R-22 systems cannot be recharged with virgin refrigerant. You must use reclaimed R-22 (expensive) or replace the system. Conversion to R-410A is NOT possible — different pressures, different compressor. Replacement is your best path.';
    }
    if (refrigerant === 'r410a') {
      return 'R-410A is being phased out for new equipment (2023-2025 under EPA rules) but existing systems can still be serviced. Recharge runs $150-300 for a typical DFW home. Your system is fine to keep running — parts and refrigerant remain available. New replacement systems now use R-32 or R-454B.';
    }
    if (refrigerant === 'r32') {
      return 'R-32 is a current-generation refrigerant used in new mini-splits and some central systems. It has lower global warming potential than R-410A. Recharge is straightforward and affordable. Parts availability is excellent. You are on a future-proof refrigerant.';
    }
    if (refrigerant === 'r454b') {
      return 'R-454B (Puron Advance) is Carrier’s primary replacement for R-410A in new equipment as of 2025. It meets EPA 2025 requirements. Lower GWP than R-410A. Recharge costs are similar to R-410A. You have a modern, compliant system — maintain it well and it will last 15-20 years.';
    }
    return null;
  };

  const guide = getGuide();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 4 }}>❄️</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW HVAC Refrigerant Types Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: 28 }}>Know exactly what refrigerant your DFW system uses and what it means for your wallet.</p>

        {[
          { label: 'R-22 (Freon) — Phased Out 2020', emoji: '⚠️', desc: 'Existing systems only. Very expensive to recharge ($80-150/lb). No new R-22 production allowed.' },
          { label: 'R-410A (Puron) — Phase-Out 2023-2025', emoji: '🔄', desc: 'Still serviceable. Being replaced in new equipment. $150-300 recharge typical.' },
          { label: 'R-32 — Current Standard', emoji: '✅', desc: 'Used in new mini-splits. Lower GWP. Affordable service.' },
          { label: 'R-454B (Puron Advance) — New Equipment 2025+', emoji: '🆕', desc: 'EPA-compliant for 2025+ equipment. Future-proof choice.' },
        ].map(r => (
          <div key={r.label} style={{ background: '#112240', borderRadius: 10, padding: '14px 18px', marginBottom: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.emoji} {r.label}</div>
            <div style={{ color: '#a0aec0', fontSize: 14 }}>{r.desc}</div>
          </div>
        ))}

        <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Get Your Refrigerant Guide</h2>
          <label style={{ color: '#a0aec0', fontSize: 14 }}>System Age (years)</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 12″ style={{ display: 'block', width: '100%', marginTop: 6, marginBottom: 16, padding: '10px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }} />
          <label style={{ color: '#a0aec0', fontSize: 14 }}>Refrigerant Type</label>
          <select value={refrigerant} onChange={e => setRefrigerant(e.target.value)} style={{ display: 'block', width: '100%', marginTop: 6, marginBottom: 20, padding: '10px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }}>
            <option value="">Select refrigerant...</option>
            <option value="r22″>R-22 (Freon)</option>
            <option value="r410a">R-410A (Puron)</option>
            <option value="r32″>R-32</option>
            <option value="r454b">R-454B (Puron Advance)</option>
          </select>
          {guide && <div style={{ background: '#0A1628', borderRadius: 8, padding: '16px', color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>{guide}</div>}
        </div>

        <div style={{ marginTop: 28, background: '#112240', borderRadius: 10, padding: '16px 20px' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🏠 ProLnk</span>
          <span style={{ color: '#a0aec0', marginLeft: 8 }}>connects DFW homeowners with certified HVAC techs who know every refrigerant type.</span>
        </div>
      </div>
    </div>
  );
}
