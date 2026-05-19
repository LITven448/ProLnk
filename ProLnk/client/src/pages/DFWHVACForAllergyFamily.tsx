import { useState } from 'react';

const allergyPlans: Record<string, Record<string, string[]>> = {
  cedar: {
    small: [
      '🌲 Cedar Fever (Jan–Feb): DFW mountain cedar is #1 allergy trigger in Texas',
      '💨 MERV-13 minimum during cedar season — cedar pollen particles are microscopic',
      '🚫 Keep windows CLOSED during January cedar peak — outdoor air is toxic for sufferers',
      '🌀 Run air purifier with HEPA 24/7 during cedar season',
      '📅 Replace filter January 1 — start cedar season with fresh filtration',
      '🌡️ Keep home at 65–68°F during cedar peak — cold air slows inflammation response',
    ],
    medium: [
      '🌲 Cedar Fever in medium DFW home: your HVAC system is your primary protection',
      '💨 Upgrade to MERV-16 for cedar season — MERV-13 misses 15–20% of cedar pollen',
      '🚫 Seal gaps around doors and windows before January — cedar pollen infiltrates everything',
      '🌀 Two-room HEPA purifiers minimum: bedroom + main living area',
      '📅 Pre-cedar prep in December: tune-up, new filter, seal checks',
      '🔧 Consider whole-home UV air purifier — destroys pollen at source',
    ],
    large: [
      '🌲 Cedar Fever in large DFW home: central purification is worth the investment',
      '💨 Whole-home HEPA or electronic air cleaner — room units insufficient for large homes',
      '🚫 Zone isolation: seal and run air purification in primary living zones',
      '🌀 Central UV purifier + MERV-16 combination is the gold standard for DFW cedar',
      '📅 Annual HVAC contract: cedar season prep + spring clean-up',
      '🔧 Duct sealing investment pays off in DFW allergy homes — leaky ducts bring outdoor air in',
    ],
  },
  oak: {
    small: [
      '🌳 Oak Pollen (March–April): DFW oak season follows cedar — back-to-back allergy months',
      '💨 MERV-13 filter; change at end of February before oak peak',
      '🚫 Morning hours worst for oak pollen in DFW — keep windows closed before noon',
      '🌀 HEPA purifier in bedroom — sleep is when your body recovers from allergy exposure',
      '📅 Filter change cadence: Jan 1 (cedar), Mar 1 (oak), May 1 (grass)',
    ],
    medium: [
      '🌳 Oak season in medium DFW home: layer your filtration approach',
      '💨 MERV-13 with activated carbon — carbon layer captures pollen-related VOCs',
      '🚫 Keep AC fan on AUTO (not ON) — continuous fan circulation spreads captured pollen',
      '🌀 HEPA purifiers in bedroom and home office during oak peak',
      '📅 Tri-filter change schedule maps to DFW allergy seasons',
      '🔧 Consider ERV (Energy Recovery Ventilator) — brings fresh air without pollen',
    ],
    large: [
      '🌳 Oak season in large DFW home: whole-home approach required',
      '💨 Whole-home filtration — large homes cannot rely on room purifiers alone',
      '🚫 Positive pressure strategy: run HVAC slightly overpressured to keep infiltration out',
      '🌀 ERV with HEPA pre-filter: fresh air without DFW pollen penetration',
      '📅 Seasonal HVAC service aligned with cedar, oak, and grass peaks',
    ],
  },
  grass: {
    small: [
      '🌾 Grass Pollen (May–July): DFW grass season overlaps with peak AC demand',
      '💨 MERV-13 required; change every 30 days during grass season (high load)',
      '🚫 Avoid outdoor activity 5–10am during grass peak — pollen counts highest at dawn',
      '🌀 Bedroom HEPA essential — grass pollen triggers overnight symptoms',
      '📅 Change filter May 1 and June 1 during peak grass season',
      '🌡️ Keep AC at 70°F — warm humid indoor air worsens grass allergy symptoms',
    ],
    medium: [
      '🌾 Grass season in medium DFW home: humidity control is critical',
      '💨 MERV-13 plus dehumidifier — DFW summer humidity + grass pollen = worst combination',
      '🚫 Keep indoor humidity below 50% — mold growth compounds grass allergy',
      '🌀 Two HEPA purifiers: bedroom + main living area',
      '📅 Monthly filter change June–August; HVAC tune-up in April before grass peak',
      '🔧 Air sealing gaps — grass pollen is particularly fine and infiltrates older homes',
    ],
    large: [
      '🌾 Grass season in large DFW home: multi-pronged strategy',
      '💨 Whole-home dehumidification + MERV-16 filtration',
      '🚫 Zoning: actively ventilate bedrooms at night when pollen counts drop',
      '🌀 Central purification system — room units cannot handle large home volume',
      '📅 Quarterly HVAC service; monthly filter inspection during June–August',
    ],
  },
  multiple: {
    small: [
      '🤧 Multiple Allergens in small DFW home: year-round defense required',
      '💨 MERV-16 filter year-round — allergy-grade filtration non-negotiable',
      '🚫 Track DFW allergy calendar: cedar (Jan), oak (Mar–Apr), grass (May–Jul), ragweed (Sep)',
      '🌀 HEPA purifier in bedroom year-round — most critical exposure is during sleep',
      '📅 Filter change every 30 days — multiple allergens load filters faster',
      '🌡️ Maintain 68–70°F and 45–50% humidity — optimal for allergy management',
      '🔧 Annual duct cleaning — multi-allergen homes accumulate mixed allergen load in ducts',
    ],
    medium: [
      '🤧 Multiple Allergens in medium DFW home: whole-home system investment justified',
      '💨 MERV-16 + activated carbon combination filter',
      '🚫 Air quality monitor helps you know when to increase filtration intensity',
      '🌀 Two HEPA purifiers + central UV system — layered defense for year-round DFW allergens',
      '📅 Filter change every 30 days; semi-annual professional HVAC service',
      '🔧 Duct sealing + central air purifier: best ROI for multi-allergen households in DFW',
      '💧 Dehumidifier in summer — humidity amplifies all allergen responses',
    ],
    large: [
      '🤧 Multiple Allergens in large DFW home: professional IAQ assessment warranted',
      '💨 Whole-home HEPA or electronic air cleaner — MERV alone insufficient for large home',
      '🚫 Zone isolation strategy: create allergy-safe primary zones',
      '🌀 Central UV + ERV + MERV-16 triple system — gold standard for severe multiple allergies',
      '📅 Monthly inspection; quarterly professional service; annual duct cleaning',
      '🔧 IAQ professional assessment: identify home-specific allergen sources',
    ],
  },
};

export default function DFWHVACForAllergyFamily() {
  const [allergyType, setAllergyType] = useState('');
  const [homeSize, setHomeSize] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (allergyType && homeSize) setSubmitted(true);
  };

  const plan = submitted && allergyType && homeSize && allergyPlans[allergyType]?.[homeSize];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2 }}>HVAC for DFW Allergy Families 🤧</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7 }}>
            DFW ranks in the top 5 worst allergy cities in the US — cedar fever, oak, grass pollen, and ragweed hit back-to-back across nearly 8 months. Your HVAC system is your family's primary defense.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>📅 DFW Allergy Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {[
              { month: 'January–February', trigger: '🌲 Mountain Cedar (SEVERE)' },
              { month: 'March–April', trigger: '🌳 Oak & Elm Pollen (HIGH)' },
              { month: 'May–July', trigger: '🌾 Grass Pollen (HIGH)' },
              { month: 'August–September', trigger: '🌼 Ragweed (MODERATE)' },
            ].map(item => (
              <div key={item.month} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '12px' }}>
                <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>{item.month}</div>
                <div style={{ color: '#cbd5e1', fontWeight: 600, fontSize: 14 }}>{item.trigger}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>🛡️ HVAC as Your Allergy Defense</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '💨', label: 'MERV Rating Matters', desc: 'MERV-8 (standard): 20% pollen capture. MERV-13: 75%. MERV-16: 95%. DFW allergy families need MERV-13 minimum' },
              { icon: '🌀', label: 'Air Purifiers Add a Layer', desc: 'HEPA purifiers capture what filters miss — especially in bedrooms where sleep exposure matters most' },
              { icon: '🔧', label: 'UV Air Purifiers', desc: 'UV systems destroy pollen and mold spores at the air handler — whole-home protection with no filter changes' },
              { icon: '💧', label: 'Humidity Control', desc: 'DFW summer humidity above 60% grows mold — a second allergen on top of pollen. Dehumidifier is often essential' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>🤧 Get Your HVAC Allergy Management Plan</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>PRIMARY ALLERGY TYPE</label>
              <select value={allergyType} onChange={e => { setAllergyType(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select allergy type...</option>
                <option value="cedar">Cedar Fever (worst in January)</option>
                <option value="oak">Oak / Tree Pollen (spring)</option>
                <option value="grass">Grass Pollen (summer)</option>
                <option value="multiple">Multiple / Year-Round</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW HOME SIZE</label>
              <select value={homeSize} onChange={e => { setHomeSize(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select home size...</option>
                <option value="small">Small (under 1,500 sq ft)</option>
                <option value="medium">Medium (1,500–2,500 sq ft)</option>
                <option value="large">Large (2,500+ sq ft)</option>
              </select>
            </div>
          </div>
          <button onClick={handleSubmit} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Generate My Allergy HVAC Plan →
          </button>
        </div>

        {plan && Array.isArray(plan) && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Your HVAC Allergy Management Plan</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {plan.map((item: string, i: number) => (
                <li key={i} style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Get an allergy-optimized HVAC assessment from a certified DFW pro</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free Allergy HVAC Quote — DFW
          </button>
        </div>
      </div>
    </div>
  );
}
