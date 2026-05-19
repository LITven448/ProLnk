import { useState } from 'react';

const healthConcerns = ['Asthma / respiratory issues', 'Seasonal allergies', 'Chronic sinusitis', 'Dry skin / eyes', 'Frequent headaches', 'General wellness'];
const allergenTypes = ['Cedar pollen (Jan–Mar)', 'Oak / elm pollen (Spring)', 'Grass pollen (May–Jun)', 'Ragweed (Fall)', 'Mold spores (humid periods)', 'Dust mites year-round'];

type HealthPlan = { upgrades: string[]; cost: string; explanation: string; };

function getHealthPlan(concern: string, allergen: string): HealthPlan {
  const isCedar = allergen.includes('Cedar');
  const isMold = allergen.includes('Mold');
  const isAsthma = concern.includes('Asthma');
  const isAllergy = concern.includes('allergies');
  const isDry = concern.includes('Dry');
  const isHeadache = concern.includes('headaches');
  const filterGrade = isAsthma || isCedar ? 'MERV 13′ : isAllergy ? ’MERV 11′ : ’MERV 8';
  const costRange = isAsthma && isCedar ? '$800–$1,400′ : isMold ? '$600–$1,100' : '$200–$600';
  return {
    upgrades: [
      `🔬 Upgrade to ${filterGrade} filters — ${isCedar ? 'captures DFW cedar particles as small as 0.3 microns' : 'traps allergens reducing indoor load by 60–80%'}`,
      isMold ? '💧 Install whole-home dehumidifier — DFW summer humidity causes mold in ductwork' : '💨 Add ERV (Energy Recovery Ventilator) for fresh air without outdoor allergen infiltration',
      isAsthma ? '☀️ Install UV-C germicidal light in air handler — kills mold, bacteria, and viruses in ductwork' : '🏠 Seal duct leaks — leaky ducts pull attic allergens directly into living space',
      isDry ? '💦 Add whole-home humidifier — DFW winter drops indoor humidity below 20%, damaging skin and airways' : '🌬️ Run HVAC fan continuously on low — constant filtration reduces particle buildup',
      isHeadache ? '🪟 Check for CO — have HVAC tech inspect heat exchanger for cracks, install CO detector' : '📅 Change filters every 30 days during DFW cedar season (Jan–Mar), 60 days otherwise',
    ],
    cost: costRange,
    explanation: isCedar ? 'DFW cedar fever season (Jan–Mar) is among the worst in the US — mountain cedar pollen counts regularly exceed 1,500 grains/m³. MERV 13 is mandatory, not optional.' : isMold ? 'DFW summer humidity combined with AC condensation creates ideal mold conditions in ductwork. Dehumidification + UV is the proven protocol.' : 'Standard DFW allergen protocol: upgrade filtration, improve ventilation, seal the envelope.',
  };
}

export default function DFWHVACHealthGuide() {
  const [concern, setConcern] = useState('');
  const [allergen, setAllergen] = useState('');
  const [plan, setPlan] = useState<HealthPlan | null>(null);
  function generate() { if (concern && allergen) setPlan(getHealthPlan(concern, allergen)); }
  const sel = { width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 } as const;
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', paddingBottom: 60 }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '1px solid #1E3A5F', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC GUIDE</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>HVAC Health & Wellness<br /><span style={{ color: '#F5E642′ }}>for DFW Homeowners</span></h1>
          <p style={{ fontSize: 17, color: '#A8B4C8', lineHeight: 1.7, margin: 0 }}>DFW's climate — cedar fever winters, humid summers, dusty falls — makes indoor air quality a health necessity, not a luxury. Your HVAC system is your first line of defense.</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 0′ }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['🌿', '1,500+', 'Cedar grains/m³ peak DFW'], ['💧', '75%', 'DFW summer humidity avg'], ['🏠', '5x', 'Indoor vs outdoor pollution ratio']].map(([icon, stat, label]) => (
            <div key={label} style={{ background: '#0D1F3C', borderRadius: 12, padding: '20px 16px', textAlign: 'center', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642′ }}>{stat}</div>
              <div style={{ fontSize: 12, color: '#6B7A99', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: '#F5E642′ }}>🫁 Get Your Air Quality Improvement Plan</h2>
          <p style={{ fontSize: 13, color: '#6B7A99', margin: '0 0 20px' }}>Tell us your health concern and primary DFW allergen for a targeted HVAC upgrade plan.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>HEALTH CONCERN</label>
              <select value={concern} onChange={e => setConcern(e.target.value)} style={sel}>
                <option value="">Select concern</option>
                {healthConcerns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>PRIMARY DFW ALLERGEN</label>
              <select value={allergen} onChange={e => setAllergen(e.target.value)} style={sel}>
                <option value="">Select allergen</option>
                {allergenTypes.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} disabled={!concern || !allergen} style={{ background: concern && allergen ? '#F5E642′ : '#1E3A5F', color: concern && allergen ? '#0A1628' : '#4A5568', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: concern && allergen ? 'pointer' : 'not-allowed' }}>Get My Air Quality Plan →</button>
        </div>
        {plan && (
          <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #F5E642′ }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: '#F5E642′ }}>Your DFW Air Quality Plan</h3>
            <div style={{ fontSize: 14, color: '#A8B4C8', marginBottom: 20 }}>Estimated improvement investment: <span style={{ color: '#F5E642', fontWeight: 700 }}>{plan.cost}</span></div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 14, marginBottom: 20, fontSize: 13, color: '#A8B4C8', lineHeight: 1.7, borderLeft: '3px solid #F5E642′ }}>{plan.explanation}</div>
            <div>
              {plan.upgrades.map((item, i) => <div key={i} style={{ padding: '10px 0', borderBottom: i < plan.upgrades.length - 1 ? '1px solid #1E3A5F' : 'none', fontSize: 14, lineHeight: 1.6 }}>{item}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
