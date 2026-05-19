import { useState } from 'react';

const situations = [
  { label: 'On my second or third HVAC system', value: 'multiple' },
  { label: 'Know my system inside and out', value: 'expert' },
  { label: 'Managing multiple properties long-term', value: 'multi' },
  { label: 'Helping neighbors and family with HVAC decisions', value: 'advisor' },
];

const resources: Record<string, { title: string; points: string[]; prolnkValue: string; insight: string }> = {
  multiple: {
    title: 'Multi-Cycle Owner: What Changes After Cycle Two',
    points: [
      'Your second system teaches you what your first one hid — note every difference',
      'DFW efficiency standards have jumped: 14 SEER (old minimum) vs. 15 SEER+ (2023+ minimum)',
      'Variable-speed compressors were rare 20 years ago — now standard in quality installs',
      'Refrigerant shift: R-410A being phased out, R-454B is new standard — affects repair pricing',
      'Connected thermostats give you system diagnostics your earlier systems never could',
      'Home Health Vault stores your full HVAC history across all cycles — never lose records again',
    ],
    prolnkValue: 'ProLnk matches you with DFW HVAC pros who understand your full ownership history, not just the current system. Your experience is an asset in negotiating the right install.',
    insight: 'Owners on their third DFW system have seen the industry change dramatically. Variable speed and inverter compressors deliver 30-50% energy savings vs. single-stage systems from 20 years ago.',
  },
  expert: {
    title: 'Expert Owner Resources — Level Up Further',
    points: [
      'Learn to read your system static pressure readings — undersized ducts rob you even with perfect equipment',
      'Track superheat and subcooling numbers after each service — deviations signal refrigerant issues early',
      'Consider a whole-house energy monitor (Emporia, Sense) to track HVAC consumption in real time',
      'Explore ASHRAE 62.2 ventilation standards — DFW homes are often under-ventilated',
      'Evaluate ERV or HRV systems for fresh air without losing conditioned air',
      'Use ProLnk to vet new HVAC techs — even expert owners need a second opinion on major repairs',
    ],
    prolnkValue: 'ProLnk lets expert owners filter for highly-rated, technically proficient HVAC contractors — not just the cheapest price. Match on capability, not just availability.',
    insight: 'Expert owners who track their own static pressure readings negotiate better. Techs know you cannot be upsold on issues you can verify yourself — that changes the conversation.',
  },
  multi: {
    title: 'Multi-Property Long-Term HVAC Management',
    points: [
      'Standardize on one or two HVAC brands across properties — techs learn your systems faster',
      'Establish a preventive maintenance contract with 1-2 trusted DFW HVAC companies',
      'Track all systems in ProLnk Home Health Vault — age, model, warranty, service history by property',
      'Stagger replacement budgets across properties — plan 1-2 replacements per year at scale',
      'Connected thermostats on every property alert you to failures before tenants call',
      'Bulk service agreements with HVAC contractors often reduce per-visit costs 15-25%',
    ],
    prolnkValue: 'ProLnk scales with multi-property owners — track all HVAC assets in Home Health Vault, get competitive bids across properties, and build relationships with DFW HVAC pros who serve your whole portfolio.',
    insight: 'Multi-property owners who standardize on Carrier or Trane 2-ton and 3-ton equipment often get faster service scheduling — techs know exactly what they are walking into.',
  },
  advisor: {
    title: 'Becoming a Trusted HVAC Advisor in Your Network',
    points: [
      'Share the 50% rule: if repair exceeds 50% of replacement cost, replace — saves neighbors thousands',
      'Warn people off emergency summer replacements: July costs 20-30% more than April',
      'Recommend they check SEER ratings — most people do not know what they bought',
      'Suggest Home Health Vault for storing HVAC records — resale value and warranty claims depend on it',
      'Introduce them to ProLnk for competitive bids — prevents the single-quote mistake',
      'Join ProLnk referral network: you earn every time someone you refer books a match',
    ],
    prolnkValue: 'ProLnk referral program rewards long-term homeowners who help their community. Every match you originate earns you a share — your 20+ years of knowledge has real economic value here.',
    insight: 'Long-term DFW homeowners have seen enough to know the patterns most people learn the hard way. ProLnk turns that knowledge into income through the referral network.',
  },
};

export default function DFWHVACLongOwnerGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const res = selected ? resources[selected] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>DFW HVAC — Long-Term Owner Guide</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          20+ Years in DFW: The Expert Homeowner HVAC Resource
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>
          You have seen it all — multiple systems, good techs and bad ones, the full DFW heat cycle. Here is how to leverage that knowledge and where ProLnk adds value even for experienced owners.
        </p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>🏠 What is your long-term owner situation?</div>
          <div style={{ display: 'grid', gap: '10px' }}>
            {situations.map(s => (
              <button key={s.value} onClick={() => setSelected(s.value)}
                style={{ padding: '14px 18px', borderRadius: '8px', border: selected === s.value ? '2px solid #F5E642′ : '2px solid #1e3a5f', backgroundColor: selected === s.value ? '#1a2f50' : ’transparent', color: selected === s.value ? '#F5E642′ : '#cbd5e1', cursor: ’pointer', textAlign: 'left', fontSize: '15px', fontWeight: selected === s.value ? 700 : 400 }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {res && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#F5E642', marginBottom: '16px' }}>🎓 {res.title}</div>
            <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
              {res.points.map((point, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>→</span>
                  <span style={{ color: '#cbd5e1', lineHeight: 1.5 }}>{point}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#1a2f50', borderRadius: '8px', padding: '16px', marginBottom: '12px', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '6px' }}>🔗 HOW PROLNK HELPS YOU</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5 }}>{res.prolnkValue}</div>
            </div>
            <div style={{ backgroundColor: '#1a2f50', borderRadius: '8px', padding: '14px', borderLeft: '4px solid #22c55e' }}>
              <div style={{ fontSize: '13px', color: '#22c55e', fontWeight: 600, marginBottom: '4px' }}>💡 EXPERT INSIGHT</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5 }}>{res.insight}</div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>🔗 Your Experience Has Value — Join ProLnk</div>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            20+ years of DFW homeownership means you know what most homeowners learn the hard way. ProLnk referral network lets you help your community and earn from every match you originate.
          </p>
        </div>
      </div>
    </div>
  );
}
