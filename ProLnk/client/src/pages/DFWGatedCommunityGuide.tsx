import { useState } from 'react';

const GATE_TYPES = [
  { type: 'Basic Keypad Gate', cost: '+$30-60/mo HOA', security: 'Low-Medium', notes: 'Codes shared widely; rarely changed; creates inconvenience more than security' },
  { type: 'Card/Fob Access', cost: '+$50-80/mo HOA', security: 'Medium', notes: 'Individual credentials trackable; lost fobs revocable; common in mid-tier communities' },
  { type: 'License Plate Reader (LPR)', cost: '+$80-150/mo HOA', security: 'Medium-High', notes: 'Logs all entries; fastest throughput; increasingly common in DFW new developments' },
  { type: 'Staffed Gate (24/7)', cost: '+$150-300/mo HOA', security: 'High', notes: 'Human verification of guests; highest cost; typically only in luxury communities' },
  { type: 'App-Based Access (ButterflyMX, etc.)', cost: '+$60-100/mo HOA', security: 'Medium-High', notes: 'Video intercom on phone; guest passes via SMS; modern standard in premium DFW communities' },
];

const MYTHS_VS_FACTS = [
  { myth: 'Gated = crime-free', fact: 'Studies show gated communities experience similar property crime rates; burglars often tailgate through open gates' },
  { myth: 'HOA maintains the gate at no extra cost', fact: 'Gate maintenance and staffing is billed to residents via HOA dues - typically $30-300/mo premium' },
  { myth: 'Emergency vehicles can always get in fast', fact: 'Gates must have Knox Box override, but malfunctions cause delays; verify your gate has Knox Box before buying' },
  { myth: 'Gated adds significant resale value everywhere', fact: 'Premium varies by submarket; in luxury DFW markets adds 5-15%; in mid-market adds 2-5% at most' },
  { myth: 'Delivery and service workers have easy access', fact: 'Frequent friction point; Amazon and delivery drivers often struggle with gated access; adds 10-20min to service calls' },
];

const GATE_HOA_COSTS = [
  { community: 'Southlake luxury enclave', type: 'Staffed + LPR', premium: '$200-300/mo' },
  { community: 'Frisco master-planned', type: 'App + LPR', premium: '$80-120/mo' },
  { community: 'McKinney mid-tier', type: 'Keypad + camera', premium: '$40-70/mo' },
  { community: 'Allen/Plano standard', type: 'Keypad only', premium: '$30-50/mo' },
  { community: 'Prosper premium', type: 'LPR + app', premium: '$100-150/mo' },
];

function getRecommendation(budget: number, securityPriority: number, communityType: string): { recommendation: string; reasoning: string; monthlyCostPremium: string } {
  const isLuxury = budget > 700000;
  const isSecurity = securityPriority >= 4;
  const isMPC = communityType === 'mpc';

  if (isLuxury && isSecurity) {
    return {
      recommendation: 'Gated - Staffed + LPR technology',
      reasoning: 'At your budget and security priority, staffed gate communities in Southlake, Westlake, or Colleyville offer genuine access control with 24/7 monitoring.',
      monthlyCostPremium: '+$150-300/mo on HOA'
    };
  }
  if (isMPC && !isSecurity) {
    return {
      recommendation: 'Non-gated MPC recommended',
      reasoning: 'Master-planned communities without gates offer better amenities per dollar and avoid delivery friction. Security cameras at entry points provide monitoring without gate overhead.',
      monthlyCostPremium: '+$0/mo - save the premium for amenities'
    };
  }
  if (isSecurity && !isLuxury) {
    return {
      recommendation: 'Gated with LPR or App technology',
      reasoning: 'For your budget, Frisco or Prosper gated communities with license plate reader technology offer good security-to-cost ratio without staffing premiums.',
      monthlyCostPremium: '+$80-120/mo on HOA'
    };
  }
  return {
    recommendation: 'Non-gated with security camera package',
    reasoning: 'The gate HOA premium ($40-120/mo) is better invested in a home security system (Ring, ADT) which provides real-time alerts vs a gate that slows down your Amazon deliveries.',
    monthlyCostPremium: 'Save $40-120/mo; invest in home security system instead'
  };
}

export default function DFWGatedCommunityGuide() {
  const [budget, setBudget] = useState(500000);
  const [securityPriority, setSecurityPriority] = useState(3);
  const [communityType, setCommunityType] = useState('standard');
  const [result, setResult] = useState<{ recommendation: string; reasoning: string; monthlyCostPremium: string } | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 32px', borderBottom: '2px solid #F5E642' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', letterSpacing: '2px', marginBottom: '12px' }}>🏠 DFW COMMUNITY GUIDE</div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 12px' }}>DFW Gated Community Guide</h1>
          <p style={{ fontSize: '16px', color: '#94A3B8', margin: '0', maxWidth: '620px' }}>
            What gating actually provides, what it costs, technology options, and whether it is worth the HOA premium.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '20px' }}>🔐 Gate Technology Options</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {GATE_TYPES.map((g, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: '10px', padding: '20px', border: '1px solid #1E3A5F' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF' }}>{g.type}</div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#F5E642', fontWeight: '600' }}>{g.cost}</span>
                    <span style={{ fontSize: '12px', color: '#64748B', background: '#0A1628', padding: '2px 10px', borderRadius: '10px' }}>{g.security}</span>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#94A3B8' }}>{g.notes}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '20px' }}>💰 DFW Gated Community HOA Premiums</h2>
          <div style={{ background: '#112240', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', background: '#0A1628', padding: '12px 20px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>Community Type</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>Gate Technology</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#F5E642' }}>Monthly Premium</span>
            </div>
            {GATE_HOA_COSTS.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', padding: '14px 20px', borderBottom: '1px solid #0A1628' }}>
                <span style={{ fontSize: '13px', color: '#CBD5E1' }}>{row.community}</span>
                <span style={{ fontSize: '13px', color: '#94A3B8' }}>{row.type}</span>
                <span style={{ fontSize: '13px', color: '#F5E642', fontWeight: '600' }}>{row.premium}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '20px' }}>❓ Gated Community Myths vs Reality</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {MYTHS_VS_FACTS.map((m, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 20px', background: '#1E3A5F', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '16px' }}>❌</span>
                  <div style={{ fontSize: '14px', color: '#EF4444', fontWeight: '600' }}>MYTH: {m.myth}</div>
                </div>
                <div style={{ padding: '14px 20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '16px' }}>✅</span>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>REALITY: {m.fact}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '40px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>🎯 Gated vs Non-Gated Recommender</h2>
          <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>Tell us your situation and we will give you a straight recommendation.</p>

          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#CBD5E1' }}>
            Home Budget: <strong style={{ color: '#F5E642' }}>${budget.toLocaleString()}</strong>
          </label>
          <input type="range" min={250000} max={2000000} step={25000} value={budget} onChange={e => setBudget(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '20px', accentColor: '#F5E642' }} />

          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#CBD5E1' }}>
            Security Priority (1 = low, 5 = very high): <strong style={{ color: '#F5E642' }}>{securityPriority}/5</strong>
          </label>
          <input type="range" min={1} max={5} step={1} value={securityPriority} onChange={e => setSecurityPriority(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '20px', accentColor: '#F5E642' }} />

          <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#CBD5E1' }}>Community Type Preference:</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[{ value: 'mpc', label: '🏘️ Master-Planned' }, { value: 'standard', label: '🏠 Standard Subdivision' }, { value: 'luxury', label: '💎 Luxury Enclave' }].map(opt => (
              <button key={opt.value} onClick={() => setCommunityType(opt.value)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', fontSize: '13px', cursor: 'pointer',
                  background: communityType === opt.value ? '#F5E642' : 'transparent',
                  color: communityType === opt.value ? '#0A1628' : '#94A3B8',
                  borderColor: communityType === opt.value ? '#F5E642' : '#334155' }}>
                {opt.label}
              </button>
            ))}
          </div>

          <button onClick={() => setResult(getRecommendation(budget, securityPriority, communityType))}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            Get Recommendation
          </button>

          {result && (
            <div style={{ marginTop: '24px', padding: '20px', background: '#0A1628', borderRadius: '10px' }}>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#F5E642', marginBottom: '12px' }}>{result.recommendation}</div>
              <div style={{ fontSize: '14px', color: '#CBD5E1', marginBottom: '12px' }}>{result.reasoning}</div>
              <div style={{ background: '#112240', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', color: '#94A3B8' }}>
                💰 Cost Premium: <strong style={{ color: '#F5E642' }}>{result.monthlyCostPremium}</strong>
              </div>
            </div>
          )}
        </section>

        <div style={{ background: '#112240', borderRadius: '10px', padding: '20px', fontSize: '13px', color: '#64748B' }}>
          📋 Knox Box requirements for emergency access vary by municipality in DFW. Always verify your specific gate has a Knox Box before purchasing in a gated community.
        </div>
      </div>
    </div>
  );
}
