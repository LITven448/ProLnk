import { useState } from 'react';

const petPlans: Record<string, Record<string, string[]>> = {
  dog: {
    '1': [
      '🐕 1 dog: Change MERV-11 filter every 45 days (vs. 90 days without pets)',
      '🌀 Run air purifier with HEPA in main living area — dog dander + DFW pollen is brutal combo',
      '🌡️ Emergency plan: if AC fails in DFW summer, move dog to car with AC within 30 min',
      '💧 Dog panting raises indoor humidity — monitor and keep below 60%',
      '🧹 Vacuum HVAC return vents weekly — dog hair accumulates fast near floor returns',
    ],
    '2-3': [
      '🐕🐕 2–3 dogs: MERV-13 required — upgrade now, filter change every 30 days',
      '🌀 Whole-home air purifier or 2 room units — dander load exceeds single purifier capacity',
      '🌡️ Emergency protocol: 2–3 dogs in DFW heat = hotel with pets within 20 min of AC failure',
      '💧 Multiple dogs increase humidity — run dehumidifier if above 60%',
      '📅 Schedule HVAC maintenance every 6 months — dog hair clogs coils in DFW heat',
      '🧹 Clean evaporator coil annually — pet hair and dander coat coils, reducing efficiency 20%+',
    ],
    '4+': [
      '🐕🐕🐕 4+ dogs: MERV-16 or HEPA whole-home filtration — standard filters fail fast',
      '🌀 Commercial-grade air purifier minimum — consider central UV purifier install',
      '🌡️ CRITICAL: 4+ dogs in DFW summer = emergency within 15 min of AC failure. Keep vet number handy',
      '💧 High humidity risk — dedicated dehumidifier required in DFW summer months',
      '📅 Monthly HVAC inspection recommended — coil cleaning every 6 months at minimum',
      '🔧 Consider dedicated dog room with separate mini-split to protect main system',
    ],
  },
  cat: {
    '1': [
      '🐈 1 cat: MERV-11 filter, change every 60 days',
      '🌀 Air purifier near cat’s favorite spots — cats groom and release dander constantly',
      '🌡️ Cats tolerate heat better than dogs but still need AC below 80°F in DFW summer',
      '🧹 Clean return vents monthly — cat hair is finer and penetrates filters more easily',
    ],
    '2-3': [
      '🐈🐈 2–3 cats: MERV-13 filter, change every 45 days',
      '🌀 Two air purifiers — cats spread dander across multiple rooms',
      '🌡️ Multiple cats in DFW heat: keep home below 78°F — cats show distress above 80°F',
      '🧹 Weekly vent cleaning — multiple cats shed constantly',
      '📅 Bi-annual HVAC service — cat dander coats coils differently than dog hair',
    ],
    '4+': [
      '🐈🐈🐈 4+ cats: MERV-16 required, change every 30 days',
      '🌀 Whole-home purification — dander volume exceeds room purifiers',
      '🌡️ DFW heat + 4+ cats: maintain below 76°F, cats cannot sweat',
      '📅 Monthly filter check, quarterly coil inspection',
      '🔧 Consider UV air purifier installation to address cat-specific allergens',
    ],
  },
  mixed: {
    '1': [
      '🐾 Mixed pets: MERV-13 filter, change every 30–45 days',
      '🌀 HEPA air purifier — mixed pet dander is most aggressive allergen combination',
      '🌡️ DFW emergency plan: identify closest pet-friendly hotel for AC failure scenario',
      '🧹 Vacuum returns bi-weekly — mixed pet hair jams differently than single species',
    ],
    '2-3': [
      '🐾🐾 Mixed pets (2–3): MERV-13 to MERV-16, change every 30 days',
      '🌀 Two HEPA purifiers in main living areas',
      '🌡️ DFW summer AC failure: call HVAC within 10 min — mixed pets overheat faster together',
      '📅 Quarterly HVAC service — mixed pet homes have highest coil contamination rate',
      '🧹 Monthly duct inspection — mixed hair mats into ducts faster than single species',
    ],
    '4+': [
      '🐾🐾🐾 4+ mixed pets: HEPA whole-home or UV system — standard filters inadequate',
      '🌀 Commercial purification strategy — consult IAQ professional',
      '🌡️ CRITICAL PRIORITY: AC maintenance is animal welfare issue in DFW with 4+ mixed pets',
      '📅 Monthly HVAC service contract recommended',
      '🔧 Dedicated AC zone for pet areas — protects main system longevity',
    ],
  },
};

export default function DFWHVACForPetOwners() {
  const [petType, setPetType] = useState('');
  const [petCount, setPetCount] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (petType && petCount) setSubmitted(true);
  };

  const plan = submitted && petType && petCount && petPlans[petType]?.[petCount];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2 }}>HVAC for DFW Pet Owners 🐾</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7 }}>
            Dogs clog your HVAC filters 2x faster than homes without pets. In DFW where your AC runs nearly year-round, a pet-neglected system can cost $3,000+ in avoidable repairs.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>⚠️ AC Failure with Pets in DFW Summer</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            When DFW outdoor temps hit 105°F, an unair-conditioned home reaches dangerous temperatures for pets in under 2 hours. Dogs and cats cannot sweat — they rely entirely on your HVAC. <strong style={{ color: '#F5E642' }}>AC failure is a pet emergency, not just an inconvenience.</strong>
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>🔬 How Pets Change Your HVAC</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '💨', label: 'Filter Life Halved', desc: 'Pet hair and dander clog filters 2x faster — standard 90-day filters need changing every 30-45 days' },
              { icon: '🌿', label: 'DFW Pollen + Pet Dander', desc: 'Combined allergen load in DFW is among highest in US — your HVAC is the primary defense' },
              { icon: '🧪', label: 'Coil Contamination', desc: 'Pet hair coats evaporator coils, reducing efficiency 15–25% — annual coil cleaning is essential' },
              { icon: '💧', label: 'Humidity Disruption', desc: 'Dogs panting in DFW heat raises indoor humidity — monitor and control to protect system and pets' },
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
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>🐾 Get Your Pet + HVAC Safety Plan</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>PET TYPE</label>
              <select value={petType} onChange={e => { setPetType(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select pet type...</option>
                <option value="dog">Dog(s) only</option>
                <option value="cat">Cat(s) only</option>
                <option value="mixed">Mixed (dogs + cats)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>NUMBER OF PETS</label>
              <select value={petCount} onChange={e => { setPetCount(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select count...</option>
                <option value="1">1 pet</option>
                <option value="2-3">2–3 pets</option>
                <option value="4+">4 or more pets</option>
              </select>
            </div>
          </div>
          <button onClick={handleSubmit} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Generate My Pet HVAC Safety Plan →
          </button>
        </div>

        {plan && Array.isArray(plan) && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Your Pet HVAC Safety Plan</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {plan.map((item: string, i: number) => (
                <li key={i} style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Get a pet-optimized HVAC assessment from a DFW pro</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free Pet HVAC Quote — DFW
          </button>
        </div>
      </div>
    </div>
  );
}
