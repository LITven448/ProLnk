import { useState } from 'react';

const budgetPlans: Record<string, Record<string, string[]>> = {
  tight: {
    repair: [
      '💵 Tight budget + needs repair: repair if system is under 10 years old and repair cost is under $800',
      '🔧 Ask for itemized quote — avoid "diagnostic fee + labor + parts" bundles that obscure actual costs',
      '🛡️ Get 3 quotes minimum in DFW — HVAC pricing varies 30–50% across contractors',
      '📋 DIY safe tasks: filter changes, thermostat battery replacement, clearing drain line with vinegar',
      '🚫 Never DIY: refrigerant, electrical connections, coil cleaning — safety and legal risk',
      '📅 Stop the bleeding: a $150 tune-up often prevents $800 repair within 6–12 months',
    ],
    replace: [
      '💵 Tight budget + needs replacement: financing is often smarter than delaying replacement',
      '💳 0% financing through manufacturer programs: Carrier, Trane, Lennox all offer 12–18 month no-interest',
      '🏦 PACE financing: Property Assessed Clean Energy — attached to property, low rate, no credit impact',
      '📋 SEER2 15 basic system: lowest qualifying efficiency, usually $3,000–4,500 installed in DFW',
      '🛡️ Get quotes in off-peak: January–February and September–October have 15–25% lower install prices',
      '💰 Oncor rebates: up to $500 for qualifying high-efficiency systems — reduces out-of-pocket cost',
    ],
    maintain: [
      '💵 Tight budget maintenance: DIY what you can, spend wisely on professional service',
      '📋 DIY monthly: change filter ($8–25), clear condensate drain, clean vents',
      '🔧 Annual professional tune-up: $89–150 — prevents 80% of emergency repair costs',
      '📅 Schedule annual service in spring before DFW peak demand — avoid emergency summer rates',
      '🛒 Buy filters in bulk: 12-pack of MERV-11 from warehouse club is 40% cheaper than one-at-a-time',
      '📊 Track thermostat settings: every 2°F warmer in summer saves ~4% on DFW electricity bill',
    ],
  },
  moderate: {
    repair: [
      '💰 Moderate budget + repair: repair if system under 12 years and repair under 50% of replacement cost',
      '🔧 The 5,000 rule: if age × repair cost > $5,000 — replace instead of repair',
      '🛡️ 3 quotes standard practice; ask each contractor for repair vs. replace recommendation',
      '📋 Priority repairs in DFW: capacitor, contactor, refrigerant leak — these fail most in DFW heat',
      '💡 Consider extended warranty at repair time: 1-year parts and labor adds $150–300, worth it on older systems',
      '📅 Post-repair: schedule preventive maintenance to extend life of repaired system',
    ],
    replace: [
      '💰 Moderate budget + replacement: SEER2 16–18 range hits the efficiency sweet spot for DFW',
      '💳 Finance vs. pay cash: if financing rate is under 6%, often better to preserve cash for emergencies',
      '🏦 Manufacturer rebates + Oncor rebates can reduce net cost by $800–1,500',
      '📋 Two-stage system at moderate budget: better humidity control in DFW summer justifies ~10% premium',
      '🛡️ Warranty negotiation: 10-year parts is standard, push for 10-year labor on moderate-budget purchase',
      '📅 Best DFW install windows: Feb, Sep, Oct — contractors have availability and prices are lower',
    ],
    maintain: [
      '💰 Moderate budget maintenance: invest in annual service contract ($150–250/year)',
      '🔧 Service contract benefits: priority scheduling in DFW peak summer, discounts on repairs, annual tune-up',
      '📋 Smart thermostat: $150–250 installed, pays back in 12–18 months in DFW energy savings',
      '💡 Programmable schedule: set 78°F when away, 72°F when home — saves $40–80/month in DFW summer',
      '📅 Bi-annual filter change minimum; monthly check recommended in summer',
      '🌡️ Ceiling fan strategy: run counterclockwise in summer, raises perceived comfort 4°F — AC runs less',
    ],
  },
  emergency: {
    repair: [
      '🚨 Emergency + repair decision: in DFW summer, AC failure is a health emergency — act fast',
      '🔧 Same-day emergency rates: expect 25–50% premium over normal rates in DFW peak season',
      '🛡️ Emergency triage: check breaker first ($0), then capacitor (common DFW summer failure, $150–300)',
      '📋 While waiting for tech: close blinds, move to lowest floor, wet towels help, check on vulnerable household members',
      '💡 Service contract holders get priority: emergency call wait time is often 2–4 hours vs. 8–12 hours for non-members',
      '📱 Backup plan: identify pet-friendly hotel in advance for extended outage in DFW summer',
    ],
    replace: [
      '🚨 Emergency replacement: DFW peak season install adds $300–700 to normal cost — unavoidable',
      '💳 Emergency financing: most DFW HVAC companies offer same-day credit decisions for qualified buyers',
      '🔧 Temporary solutions while waiting: portable AC unit ($300–500) rents time without wasting emergency premium',
      '📋 Package unit (roof-mounted): sometimes faster install in emergencies — discuss with contractor',
      '🛡️ Don\’t panic-buy: even in emergency, getting 2 quotes takes 2 hours and can save $500–1,000',
      '📅 Off-season replacement after emergency repair: patch to survive summer, replace in fall at lower cost',
    ],
    maintain: [
      '🚨 Emergency prevention is the best budget strategy in DFW',
      '🔧 Post-emergency: ask technician for honest assessment of system lifespan',
      '📋 Emergency fund for HVAC: DFW homeowners should have $500–1,000 reserved for HVAC',
      '💡 Capacitors and contactors fail most often in DFW heat — $150–300 repairs that are predictable',
      '📅 Spring tune-up is the highest-ROI preventive spend: $150 tune-up prevents most DFW summer emergencies',
      '🛡️ Join a service plan: transforms emergency reactive spend into predictable annual cost',
    ],
  },
};

export default function DFWHVACForBudgetOwner() {
  const [budget, setBudget] = useState('');
  const [situation, setSituation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (budget && situation) setSubmitted(true);
  };

  const plan = submitted && budget && situation && budgetPlans[budget]?.[situation];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2 }}>Budget HVAC Strategy for DFW 💵</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7 }}>
            In DFW, HVAC is not optional — it's a safety system. This guide helps you protect your family and home on a limited budget, knowing when to spend and when to wait.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>⚖️ Repair vs. Replace: The DFW Decision Framework</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: '0 0 12px' }}>
            Use the <strong style={{ color: '#F5E642′ }}>5,000 Rule</strong>: multiply your system age (years) by the repair cost ($). If the result exceeds $5,000 — replace instead of repair.
          </p>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>Example: 12-year-old system × $450 repair = $5,400. That crosses the threshold — lean toward replacement.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>💡 Smart Budget HVAC Moves</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '🛒', label: 'Buy Filters in Bulk', desc: 'A 12-pack of MERV-11 filters costs 40% less per unit than buying one at a time at hardware stores' },
              { icon: '📅', label: 'Off-Season Scheduling', desc: 'January–February and September–October: DFW HVAC prices are 15–25% lower and contractors have availability' },
              { icon: '🔧', label: '$150 Tune-Up ROI', desc: 'Annual tune-up prevents 80% of emergency repairs — a $150 spend often prevents a $600–1,200 summer crisis' },
              { icon: '💳', label: 'Manufacturer Financing', desc: 'Carrier, Trane, and Lennox all offer 12–18 month 0% financing — often better than depleting emergency savings' },
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
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>💵 Get Your Budget HVAC Strategy</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>BUDGET SITUATION</label>
              <select value={budget} onChange={e => { setBudget(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select your budget situation...</option>
                <option value="tight">Tight budget (under $500 available)</option>
                <option value="moderate">Moderate budget ($500–2,000 available)</option>
                <option value="emergency">Emergency — need solution today</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>YOUR HVAC SITUATION</label>
              <select value={situation} onChange={e => { setSituation(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select situation...</option>
                <option value="repair">System has a problem — repair or replace?</option>
                <option value="replace">System is old — planning replacement</option>
                <option value="maintain">System works — how to maintain on budget</option>
              </select>
            </div>
          </div>
          <button onClick={handleSubmit} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Generate My Budget HVAC Strategy →
          </button>
        </div>

        {plan && Array.isArray(plan) && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Your Budget HVAC Strategy</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {plan.map((item: string, i: number) => (
                <li key={i} style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Get honest, transparent HVAC quotes from vetted DFW pros</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free HVAC Quote — DFW
          </button>
        </div>
      </div>
    </div>
  );
}
