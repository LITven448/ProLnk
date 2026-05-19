import { useState } from 'react';

const petTypes = ['Dog (large, heavy shedding)', 'Dog (small, light shedding)', 'Cat (indoor)', 'Multiple cats', 'Dog + cat mix', 'Rabbit / small animal'];
const petCounts = ['1 pet', '2 pets', '3 pets', '4+ pets'];

type PetPlan = { filterPlan: string[]; maintenancePlan: string[]; safetyCost: string; summerSafety: string[]; };

function getPetPlan(petType: string, count: string): PetPlan {
  const isHeavyShed = petType.includes('heavy shedding') || petType.includes('Multiple cats');
  const isMultiple = count.includes('3') || count.includes('4+') || petType.includes('mix') || petType.includes('Multiple');
  const isDog = petType.includes('Dog');
  const isSmall = petType.includes('small animal') || petType.includes('Rabbit');
  const filterDays = isHeavyShed && isMultiple ? 15 : isHeavyShed ? 21 : isMultiple ? 30 : 45;
  const costRange = isMultiple && isHeavyShed ? '$340–$580/yr' : isHeavyShed ? '$220–$380/yr' : '$140–$240/yr';
  return {
    filterPlan: [
      `🐾 Change HVAC filter every ${filterDays} days — ${isHeavyShed ? 'heavy shedding pets clog DFW filters 3x faster than standard' : 'pet dander accumulates rapidly in DFW\'s dry air'}`,
      `🔬 Upgrade to MERV 11–13 — captures pet dander (2.5–10 microns) + DFW allergens simultaneously`,
      isMultiple ? '💡 Install pre-filter ahead of main filter — extends main filter life by 40%, saves $80–120/yr' : '✅ Use electrostatic filters if budget allows — washable and captures 95% of pet hair',
      isDog ? '🛁 Bathe pets every 2 weeks during DFW spring — reduces dander load into HVAC system by 50%' : '🪮 Groom cats weekly indoors with damp cloth — reduces airborne dander entering return vents',
      '📍 Place return air vent covers with magnetic filter strips in pet-heavy rooms for extra capture',
    ],
    maintenancePlan: [
      `⚙️ Schedule professional HVAC cleaning every ${isMultiple ? '12' : '18'} months — ${isMultiple ? 'multi-pet' : 'single pet'} homes build dander in ducts faster`,
      '🌬️ Clean blower motor fan blades annually — pet hair wraps around blades reducing airflow 20–35%',
      isDog ? '🐕 Keep dog away from return air vents — dogs instinctively sleep near vents, depositing maximum dander' : '🐈 Install vent covers with pet-proof screens — cats insert toys and disturb dampers',
      isSmall ? '🐇 Keep small animal habitat away from return vents — bedding fibers damage HVAC motors' : '✅ Vacuum HVAC vents monthly with brush attachment to prevent dander buildup in ductwork',
      '💧 Check condensate drain monthly — pet hair accelerates algae growth causing AC drain clogs',
    ],
    safetyCost: costRange,
    summerSafety: [
      `🌡️ DFW summer temps hit 108°F — a failed AC with ${isDog ? 'a dog' : 'pets'} indoors becomes life-threatening within 2–3 hours`,
      '⚠️ Keep emergency vet number in your phone along with your HVAC service number',
      '🔔 Install a smart thermostat with phone alerts — get notified if temp rises above 80°F while you\’re away',
      isDog ? '🐕 Never leave dogs in a car — DFW car interior hits 140°F within 10 min in July' : '🐈 Cats tolerate heat better than dogs but need AC below 85°F — install temperature sensor in pet area',
      '🧊 Emergency plan: frozen water bottles in towels, wet towel on pet, immediate vet contact if pet is panting excessively',
    ],
  };
}

export default function DFWHVACPetGuide() {
  const [petType, setPetType] = useState('');
  const [count, setCount] = useState('');
  const [plan, setPlan] = useState<PetPlan | null>(null);
  function generate() { if (petType && count) setPlan(getPetPlan(petType, count)); }
  const sel = { width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 } as const;
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', paddingBottom: 60 }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '1px solid #1E3A5F', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC GUIDE</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>HVAC & Pets in DFW:<br /><span style={{ color: '#F5E642′ }}>Filters, Safety & Summer Survival</span></h1>
          <p style={{ fontSize: 17, color: '#A8B4C8', lineHeight: 1.7, margin: 0 }}>DFW pets clog HVAC filters 2–3x faster than normal. Add 108°F summers and cedar pollen winters, and your HVAC system needs a pet-specific maintenance plan — and so do your pets.</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 0′ }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['🐾', '3x', 'Faster filter clogging with pets'], ['🌡️', '108°F', 'DFW peak — dangerous for pets'], ['💰', '$340+', 'Extra HVAC cost with multiple pets']].map(([icon, stat, label]) => (
            <div key={label} style={{ background: '#0D1F3C', borderRadius: 12, padding: '20px 16px', textAlign: 'center', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642′ }}>{stat}</div>
              <div style={{ fontSize: 12, color: '#6B7A99', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: '#F5E642′ }}>🐾 Get Your Pet HVAC Plan</h2>
          <p style={{ fontSize: 13, color: '#6B7A99', margin: '0 0 20px' }}>Tell us your pet situation for a filter schedule, maintenance plan, and DFW summer safety checklist.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>PET TYPE</label>
              <select value={petType} onChange={e => setPetType(e.target.value)} style={sel}>
                <option value="">Select pet type</option>
                {petTypes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>NUMBER OF PETS</label>
              <select value={count} onChange={e => setCount(e.target.value)} style={sel}>
                <option value="">Select count</option>
                {petCounts.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} disabled={!petType || !count} style={{ background: petType && count ? '#F5E642′ : '#1E3A5F', color: petType && count ? '#0A1628' : '#4A5568', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: petType && count ? 'pointer' : 'not-allowed' }}>Get My Pet HVAC Plan →</button>
        </div>
        {plan && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #F5E642′ }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 12px', color: '#F5E642′ }}>🔬 Filter Plan</h3>
              <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 14 }}>Annual extra HVAC cost with pets: <span style={{ color: '#F5E642', fontWeight: 700 }}>{plan.safetyCost}</span></div>
              {plan.filterPlan.map((item, i) => <div key={i} style={{ padding: '7px 0', borderBottom: '1px solid #1E3A5F', fontSize: 14, lineHeight: 1.6 }}>{item}</div>)}
            </div>
            <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 12px', color: '#F5E642′ }}>⚙️ Maintenance Acceleration Plan</h3>
              {plan.maintenancePlan.map((item, i) => <div key={i} style={{ padding: '7px 0', borderBottom: '1px solid #1E3A5F', fontSize: 14, lineHeight: 1.6 }}>{item}</div>)}
            </div>
            <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #EF4444′ }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 12px', color: '#EF4444′ }}>🚨 DFW Summer Pet Safety Plan</h3>
              {plan.summerSafety.map((item, i) => <div key={i} style={{ padding: '7px 0', borderBottom: '1px solid #1E3A5F', fontSize: 14, lineHeight: 1.6 }}>{item}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
