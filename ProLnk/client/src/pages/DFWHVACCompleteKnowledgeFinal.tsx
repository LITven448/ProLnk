import { useState } from 'react';

const knowledgeLevels = [
  { id: 'newbie', label: '🌱 New DFW Homeowner (Just moved here)', desc: 'Learning everything from scratch' },
  { id: 'basic', label: '🏠 Basic DFW Homeowner (2-5 years)', desc: 'Know the basics, want to go deeper' },
  { id: 'experienced', label: '🔧 Experienced DFW Owner (5-15 years)', desc: 'Seasoned but want pro-level knowledge' },
  { id: 'expert', label: '🏆 DFW HVAC Power User (15+ years)', desc: 'Deep expertise, want advanced protocols' },
];

const resources: Record<string, { title: string; items: string[] }[]> = {
  newbie: [
    { title: '🌡️ DFW Climate Fundamentals', items: [
      'DFW averages 100+ days above 90°F annually — your AC runs constantly June-September',
      'Humidity swings from 20% (dry winter) to 80%+ (summer storms) — impacts both comfort and system load',
      'Your HVAC is the most expensive mechanical system in your DFW home — budget $200-400/year for maintenance',
      'Change your air filter every 30-60 days in DFW — dust, pollen, and cedar season clog filters fast',
    ]},
    { title: '📋 DFW HVAC Basics', items: [
      'Your system has two parts: indoor air handler/furnace and outdoor compressor/condenser',
      'Keep 2 feet clear around your outdoor unit — DFW storms drop debris constantly',
      'Never close more than 20% of your vents — DFW systems are sized for total airflow',
      'Set fan to AUTO not ON — continuous fan wastes energy and pulls DFW humidity back in',
    ]},
  ],
  basic: [
    { title: '⚡ DFW HVAC Efficiency', items: [
      'Programmable schedule: 78°F when away, 74°F when home (DFW summer) saves 15-20% monthly',
      'Each degree lower in DFW summer costs 3% more energy — be strategic with setpoints',
      'Ceiling fans let you raise thermostat 4°F with same comfort — DFW savings add up fast',
      'Seal air leaks around DFW attic access panels — attic hits 150°F+ in summer, leaks kill efficiency',
    ]},
    { title: '🔧 DFW Maintenance Rhythm', items: [
      'Spring tune-up (March-April): clean coils, check refrigerant, test capacitors before DFW summer',
      'Fall tune-up (October): test heat exchanger, igniter, and gas valve before DFW cold snaps',
      'Quarterly: pour bleach down condensate drain to prevent clogs in DFW humidity',
      'Annual: have ducts inspected — DFW attic heat degrades duct seals over time',
    ]},
  ],
  experienced: [
    { title: '🏆 Advanced DFW HVAC Operations', items: [
      'SEER2 ratings: DFW climate justifies 18+ SEER2 — payback period under 5 years given run hours',
      'Two-stage or variable-speed systems excel in DFW — they modulate to handle 105°F days efficiently',
      'Zoning systems: critical for DFW two-story homes — upstairs needs 3-5°F more capacity',
      'Monitor supply/return static pressure — DFW systems often have undersized returns; a pro can add a return',
    ]},
    { title: '📊 DFW System Diagnostics', items: [
      'Measure supply temp at register vs return temp — DFW summer delta-T should be 16-22°F',
      'If delta-T is low (<14°F in DFW heat), suspect low refrigerant or dirty evap coil',
      'Monitor runtime: healthy DFW system cycles 2-3 times/hour — continuous run = undersized or failing',
      'Check refrigerant lines: suction line should sweat in DFW summer — if it\’s warm, call a pro',
    ]},
  ],
  expert: [
    { title: '🔬 DFW HVAC Mastery Protocol', items: [
      'Manual J load calculation: verify your DFW system is correctly sized — most are 10-15% oversized (short-cycling risk)',
      'Duct leakage testing: DFW attic systems lose 25-40% of cooling to leaks — blower door test reveals true losses',
      'Refrigerant subcooling/superheat: proper DFW charging means 10-15°F subcooling at condenser outlet',
      'Demand response programs: Oncor/TXU offer DFW HVAC cycling credits — enroll for $100-300/year passive income',
    ]},
    { title: '🛡️ DFW Long-Term Asset Management', items: [
      'System replacement timing: DFW systems age 15-18 years vs 20+ national average — plan replacement at year 12',
      'R-410A phase-out: systems using R-410A will face refrigerant cost increases — factor into 2026-2030 replacement plans',
      'Geothermal feasibility: DFW clay soil limits ground loops — requires detailed geo study, rarely cost-effective',
      'AI/smart controls: integrate with Ecobee/Nest API for DFW-specific weather-responsive pre-conditioning',
    ]},
  ],
};

export default function DFWHVACCompleteKnowledgeFinal() {
  const [level, setLevel] = useState('');
  const sections = level ? resources[level] || [] : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 12, color: '#F5E642', letterSpacing: 2, marginBottom: 8 }}>DFW HVAC COMPLETE GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>🏆 The Final DFW HVAC Knowledge Resource</h1>
        <p style={{ color: '#8899AA', marginBottom: 12 }}>
          Every DFW homeowner deserves to understand their HVAC system — the single most expensive and critical mechanical system in their home. This is the complete reference, personalized to your experience level.
        </p>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '10px 16px', marginBottom: 28, fontWeight: 600, fontSize: 14 }}>
          🌡️ DFW HVAC systems work harder than nearly anywhere in America. Knowledge is your best maintenance tool.
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>📊 Your HVAC Knowledge Level</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {knowledgeLevels.map(l => (
              <button key={l.id} onClick={() => setLevel(l.id)}
                style={{ background: level === l.id ? '#F5E642′ : '#1A2D4A', color: level === l.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {l.label}
                <span style={{ display: 'block', fontWeight: 400, fontSize: 12, marginTop: 3, opacity: 0.85 }}>{l.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {sections.map((section, i) => (
          <div key={i} style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 17 }}>{section.title}</h3>
            {section.items.map((item, j) => (
              <div key={j} style={{ background: '#1A2D4A', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>{item}</div>
            ))}
          </div>
        ))}

        {level && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginTop: 8 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🤝 Connect with a DFW HVAC Pro</h3>
            <p style={{ color: '#8899AA', fontSize: 14, lineHeight: 1.7 }}>
              No guide replaces a licensed DFW HVAC technician who has seen your exact system in your exact DFW neighborhood. The best DFW homeowners build a relationship with one trusted pro — call them before problems, not after.
            </p>
            <div style={{ marginTop: 14, padding: '12px 16px', background: '#F5E642', borderRadius: 8, color: '#0A1628', fontWeight: 700, textAlign: 'center', fontSize: 15 }}>
              📞 ProLnk connects DFW homeowners with verified local HVAC professionals
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
