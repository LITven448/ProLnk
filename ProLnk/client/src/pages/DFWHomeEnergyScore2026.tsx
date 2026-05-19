import { useState } from 'react';

export default function DFWHomeEnergyScore2026() {
  const [homeAge, setHomeAge] = useState('');

  type AgeKey = 'pre1980′ | '1980s' | '1990s' | '2000s' | '2010s' | '2020plus';

  const ageData: Record<AgeKey, { score: number; grade: string; color: string; issues: string[]; upgrades: string[]; savings: string }> = {
    pre1980: {
      score: 2,
      grade: 'F',
      color: '#ef4444',
      issues: ['Single-pane aluminum windows', 'No attic insulation or R-11 max', 'No air barrier — major infiltration', 'Original HVAC likely 8-10 SEER', 'No vapor control in slab/walls'],
      upgrades: ['Air seal attic thoroughly (biggest DFW win)', 'Blow in R-38+ attic insulation', 'Replace HVAC with SEER2 16+ heat pump', 'Low-E replacement windows (SHGC 0.25)', 'Radiant barrier in attic'],
      savings: '35-50% energy reduction possible',
    },
    '1980s': {
      score: 3,
      grade: 'D',
      color: '#f97316',
      issues: ['R-11 wall / R-19 attic insulation (insufficient)', 'Drafty original windows', 'HVAC likely at end of life (10-14 SEER)', 'Minimal air sealing', 'Electric resistance water heater common'],
      upgrades: ['Top off attic insulation to R-38', 'Air seal top plates and penetrations', 'Replace AC with SEER2 16+', 'Add radiant barrier to attic', 'Heat pump water heater upgrade'],
      savings: '25-40% energy reduction possible',
    },
    '1990s': {
      score: 4,
      grade: 'C',
      color: '#eab308',
      issues: ['R-19 attic (better but still below optimal)', 'Double-pane windows but likely high SHGC', 'HVAC 12-14 SEER (still inefficient for DFW)', 'Some air sealing but gaps remain', 'Gas water heater typical'],
      upgrades: ['Add blown-in to reach R-38 attic', 'HVAC upgrade to SEER2 17+', 'Air seal HVAC ducts (major DFW gain)', 'Smart thermostat for TOU optimization', 'Heat pump water heater'],
      savings: '20-30% energy reduction possible',
    },
    '2000s': {
      score: 5,
      grade: 'C+',
      color: '#84cc16',
      issues: ['R-30 attic typical — still 20% short', 'Windows may not meet 2026 DFW specs', 'HVAC 14-16 SEER — upgrade opportunity', 'Duct leakage still 15-20% typical', 'No solar/battery'],
      upgrades: ['Top off attic to R-38 or R-49', 'Duct sealing / Aeroseal for DFW attic ducts', 'HVAC upgrade to SEER2 17+ at replacement', 'Smart thermostat + TOU rate plan', 'Solar evaluation (8-10 kW for DFW)'],
      savings: '15-25% energy reduction possible',
    },
    '2010s': {
      score: 6,
      grade: 'B',
      color: '#22c55e',
      issues: ['R-30 to R-38 attic — near optimal', 'Low-E windows standard', 'HVAC 14-16 SEER2 — good but upgradeable', 'Better air sealing but not blower-door tested', 'No solar/battery typically'],
      upgrades: ['Solar PV system (largest DFW gain remaining)', 'Battery backup for DFW storm resilience', 'HVAC upgrade to SEER2 18+ inverter', 'Smart thermostat with demand response', 'EV charger prep for all-electric future'],
      savings: '10-20% energy reduction + solar offsets',
    },
    '2020plus': {
      score: 7,
      grade: 'B+',
      color: '#F5E642',
      issues: ['R-38+ attic — good for DFW', 'SEER2 15+ HVAC minimum', 'Meets 2021 IECC or Texas energy code', 'Low-E windows standard', 'Needs solar to reach net zero'],
      upgrades: ['Solar PV (8-10 kW) — already efficient, solar completes picture', 'Battery backup for DFW outage protection', 'EV charger if not pre-wired', 'Occupancy sensors and smart panels', 'Evaluate for net zero certification'],
      savings: 'Solar offsets 80-100% of remaining energy use',
    },
  };

  const sel = homeAge ? ageData[homeAge as AgeKey] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏆</div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>DFW Home Energy Score Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>DOE 1-10 scale — avg DFW home scores 4-5. See your home's score and improvement path.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '28px' }}>
          {[
            { emoji: '📊', stat: '1-10', label: 'DOE Score Scale' },
            { emoji: '🏠', stat: '4-5', label: 'Avg DFW Home Score' },
            { emoji: '💰', stat: '10-15%', label: 'Savings Per Score Point' },
          ].map(item => (
            <div key={item.stat} style={{ backgroundColor: '#1e3a5f', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{item.emoji}</div>
              <div style={{ color: '#F5E642', fontSize: '22px', fontWeight: 700 }}>{item.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '14px' }}>🏠 Select Your Home's Build Era</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {([['pre1980','Pre-1980'],['1980s','1980s'],['1990s','1990s'],['2000s','2000s'],['2010s','2010s'],['2020plus','2020+']] as [AgeKey, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setHomeAge(key)} style={{ backgroundColor: homeAge === key ? '#F5E642′ : '#0A1628', color: homeAge === key ? '#0A1628' : '#fff', border: '2px solid ' + (homeAge === key ? '#F5E642' : '#1e3a5f'), borderRadius: '8px', padding: '12px', cursor: ’pointer', fontWeight: 600, fontSize: '15px' }}>{label}</button>
            ))}
          </div>
        </div>

        {sel && (
          <div style={{ border: '2px solid ' + sel.color, borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ backgroundColor: sel.color, padding: '16px', textAlign: 'center' }}>
              <div style={{ color: '#0A1628', fontSize: '32px', fontWeight: 700 }}>Score: {sel.score}/10 — Grade {sel.grade}</div>
              <div style={{ color: '#0A1628', fontSize: '14px', marginTop: '4px' }}>{sel.savings}</div>
            </div>
            <div style={{ backgroundColor: '#1e3a5f', padding: '20px' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ color: '#f97316', fontWeight: 600, marginBottom: '8px' }}>⚠️ Typical Issues for This Era</div>
                {sel.issues.map((i, idx) => <div key={idx} style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '4px' }}>• {i}</div>)}
              </div>
              <div>
                <div style={{ color: '#22c55e', fontWeight: 600, marginBottom: '8px' }}>✅ Priority Upgrades for DFW</div>
                {sel.upgrades.map((u, idx) => <div key={idx} style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '4px' }}>• {u}</div>)}
              </div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2540', borderRadius: '10px', padding: '18px', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', lineHeight: '1.7′ }}>Get officially scored: Find a DOE-certified Home Energy Score assessor at homeenergyscore.doe.gov — cost $150-300 in DFW. Buyers pay up to $10,000 more for homes with documented energy scores in DFW market.</p>
        </div>
      </div>
    </div>
  );
}