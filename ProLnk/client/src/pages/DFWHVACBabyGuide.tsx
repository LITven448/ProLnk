import { useState } from 'react';

const babyAges = ['Newborn (0–3 months)', 'Infant (3–12 months)', 'Toddler (1–2 years)', 'Pre-baby — preparing nursery'];
const homeTypes = ['New DFW construction (2015+)', 'Older DFW home (1980s–2000s)', 'Older DFW home (pre-1980)', 'DFW apartment / condo', 'DFW townhome'];

type BabyPlan = { priority: string[]; checklist: string[]; humidity: string; coNote: string; cost: string; };

function getBabyPlan(age: string, home: string): BabyPlan {
  const isNewborn = age.includes('Newborn');
  const isPreparing = age.includes('preparing');
  const isOldHome = home.includes('pre-1980') || home.includes('1980s');
  const isNew = home.includes('2015+');
  const isApt = home.includes('apartment');
  return {
    priority: [
      `🔬 ${isPreparing || isNewborn ? 'URGENT: ' : ''}Upgrade nursery filter to MERV 11–13 — babies breathe 3x faster than adults, inhaling proportionally more airborne particles`,
      isOldHome ? '⚠️ PRIORITY: Have ductwork inspected for mold and debris — older DFW homes accumulate decades of allergens in ducts' : '✅ Seal all duct connections in nursery zone — new construction ducts often have installation gaps',
      isNewborn ? '🌡️ Nursery target: 68–72°F consistently — newborns cannot regulate body temperature and are vulnerable to both overheating and chilling' : '🌡️ Maintain 70–72°F in toddler room — toddlers are active and generate more body heat than infants',
      '💧 Install whole-home or room humidifier — DFW winter drops humidity below 20%, causing infant nose bleeds, dry skin, and increased illness susceptibility',
      isApt ? '🏠 Place portable HEPA purifier in nursery — apartment HVAC is often shared and uncontrollable' : '📍 Install dedicated smart thermostat sensor in nursery — monitors temperature independently of main system',
    ],
    checklist: [
      `${isPreparing ? '📋 Before baby arrives' : '✅ This week'}: Replace all filters with MERV 13, schedule professional duct cleaning`,
      '🔴 Install CO detector within 10 feet of sleeping area AND within 10 feet of any gas heating equipment',
      '🔥 Test all smoke detectors — DFW winter heating season (Nov–Feb) spikes CO incidents from gas furnaces',
      isOldHome ? '⚠️ Schedule heat exchanger inspection — cracked exchangers in older DFW furnaces leak CO into living space' : '✅ Verify gas furnace has been serviced in the last 12 months before baby arrives',
      '🌬️ Ensure nursery has at least one supply vent and one return vent — single-vent rooms create temperature dead zones',
      '🧹 Clean all vents and registers before baby moves into nursery room — construction dust in new homes is hazardous',
      isNewborn ? '📱 Set up temperature monitoring alert on smart thermostat — alert if nursery exceeds 74°F or drops below 66°F' : '✅ Move nursery humidifier away from crib — position 3+ feet from sleeping area, clean weekly to prevent mold',
    ],
    humidity: isOldHome ? 'DFW winter target: 40–50% humidity in nursery. Older DFW homes with poor insulation lose humidity faster — expect to run humidifier 6–8 hours/day in January.' : 'DFW winter target: 40–45% humidity in nursery. DFW summer: run AC to keep humidity below 50% — above 60% promotes mold growth near cribs.',
    coNote: isOldHome ? '🚨 CO PRIORITY: Pre-1980 DFW homes with original gas furnaces have highest CO risk. Annual inspection is non-negotiable with a baby in the home.' : '✅ CO SAFETY: Install Kidde or First Alert CO detector at baby\’s breathing level (crib height), not ceiling mounted. CO is heavier than air.',
    cost: isPreparing ? '$600–$1,200 (full nursery prep)' : isOldHome ? '$400–$900 (inspection + upgrades)' : '$200–$500 (filter + humidifier + CO detectors)',
  };
}

export default function DFWHVACBabyGuide() {
  const [age, setAge] = useState('');
  const [home, setHome] = useState('');
  const [plan, setPlan] = useState<BabyPlan | null>(null);
  function generate() { if (age && home) setPlan(getBabyPlan(age, home)); }
  const sel = { width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 } as const;
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', paddingBottom: 60 }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '1px solid #1E3A5F', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC GUIDE</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>HVAC & Baby Safety<br /><span style={{ color: '#F5E642′ }}>Preparing Your DFW Home</span></h1>
          <p style={{ fontSize: 17, color: '#A8B4C8', lineHeight: 1.7, margin: 0 }}>Babies breathe 3x faster than adults and cannot regulate body temperature. In DFW — with extreme humidity swings, cedar pollen winters, and scorching summers — your HVAC system is a critical safety system, not just comfort.</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 0′ }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['👶', '3x', 'Faster breathing rate than adults'], ['💧', '20%', 'DFW winter humidity (too dry)'], ['🔴', '#1', 'CO: leading cause of infant poisoning']].map(([icon, stat, label]) => (
            <div key={label} style={{ background: '#0D1F3C', borderRadius: 12, padding: '20px 16px', textAlign: 'center', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642′ }}>{stat}</div>
              <div style={{ fontSize: 12, color: '#6B7A99', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: '#F5E642′ }}>👶 Get Your Baby HVAC Prep Checklist</h2>
          <p style={{ fontSize: 13, color: '#6B7A99', margin: '0 0 20px' }}>Tell us your baby's age and your DFW home type for a prioritized preparation checklist.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>BABY'S AGE</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={sel}>
                <option value="">Select age</option>
                {babyAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>DFW HOME TYPE</label>
              <select value={home} onChange={e => setHome(e.target.value)} style={sel}>
                <option value="">Select home type</option>
                {homeTypes.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} disabled={!age || !home} style={{ background: age && home ? '#F5E642′ : '#1E3A5F', color: age && home ? '#0A1628' : '#4A5568', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: age && home ? 'pointer' : 'not-allowed' }}>Get Baby HVAC Checklist →</button>
        </div>
        {plan && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #F5E642′ }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: '#F5E642′ }}>🌟 Priority HVAC Upgrades</h3>
              <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 14 }}>Estimated investment: <span style={{ color: '#F5E642', fontWeight: 700 }}>{plan.cost}</span></div>
              {plan.priority.map((item, i) => <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1E3A5F', fontSize: 14, lineHeight: 1.6 }}>{item}</div>)}
            </div>
            <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 12px', color: '#F5E642′ }}>📋 Safety Checklist</h3>
              {plan.checklist.map((item, i) => <div key={i} style={{ padding: '7px 0', borderBottom: '1px solid #1E3A5F', fontSize: 14, lineHeight: 1.6 }}>{item}</div>)}
            </div>
            <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 20, border: '1px solid #3B82F6′ }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', marginBottom: 8 }}>💧 HUMIDITY GUIDE FOR DFW</div>
              <div style={{ fontSize: 13, color: '#A8B4C8', lineHeight: 1.7 }}>{plan.humidity}</div>
            </div>
            <div style={{ background: '#1A0A0A', borderRadius: 16, padding: 20, border: '1px solid #EF4444′ }}>
              <div style={{ fontSize: 13, color: '#E8EAF0', lineHeight: 1.7 }}>{plan.coNote}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
