import { useState } from 'react';

const FSBO_SERVICES = [
  { name: 'Flat Fee MLS Texas', fee: '$299', includes: 'MLS listing, yard sign, lockbox' },
  { name: 'Texas FSBO', fee: '$399', includes: 'MLS + showing scheduler + contracts' },
  { name: 'Homie Texas', fee: '$500', includes: 'MLS + agent support + offer review' },
];

const RISK_LEVELS: Record<string, string[]> = {
  pricing: ['Overpricing without comp analysis', 'Leaving money on table with underpricing'],
  legal: ['Incorrect TREC form completion', 'Seller disclosure omissions — liability risk'],
  negotiation: ['Inexperienced negotiating against buyer agents', 'Contingency management errors'],
  exposure: ['Limited showing coordination', 'No professional photography guidance'],
};

export default function DFWFSBOGuide() {
  const [homePrice, setHomePrice] = useState('');
  const [fsboReason, setFsboReason] = useState('');
  const [result, setResult] = useState<{ savings: number; risks: string[]; service: string } | null>(null);

  function calculate() {
    const price = parseFloat(homePrice.replace(/,/g, '')) || 0;
    const agentCommission = price * 0.03;
    const flatFeeCost = 399;
    const savings = agentCommission - flatFeeCost;
    const risks = fsboReason === 'privacy'
      ? [...RISK_LEVELS.pricing, ...RISK_LEVELS.legal]
      : fsboReason === 'speed'
      ? [...RISK_LEVELS.negotiation, ...RISK_LEVELS.exposure]
      : [...RISK_LEVELS.pricing, ...RISK_LEVELS.negotiation];
    const service = price > 500000 ? 'Homie Texas' : 'Texas FSBO';
    setResult({ savings, risks, service });
  }

  return (
    <div style={{ background: '#f8f6f0', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: '#888′ }}>DFW Seller Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 12px', lineHeight: 1.2 }}>
          🏡 For Sale By Owner in DFW
        </h1>
        <p style={{ fontSize: 17, color: '#555', marginBottom: 40, lineHeight: 1.7 }}>
          Texas is one of the most FSBO-friendly states in the country. TREC forms are publicly available, flat fee MLS services are robust, and the NAR settlement has shifted how buyers and agents interact. Here's exactly what you need to know.
        </p>

        <div style={{ display: 'grid', gap: 24, marginBottom: 40 }}>
          {[
            { icon: '📋', title: 'Texas FSBO Legal Landscape', body: "Texas doesn’t require a real estate license to sell your own home. TREC (Texas Real Estate Commission) forms are free to download at trec.texas.gov. You'll need the One to Four Family Residential Contract and the Seller's Disclosure Notice — the same forms agents use." },
            { icon: '📢', title: 'Flat Fee MLS — Your Best Tool', body: "Without MLS access, your home is invisible to 90% of buyers using Zillow, Realtor.com, and Redfin. A flat fee MLS service lists your home for $299–$500 vs. the 3% listing agent commission you’d otherwise pay. On a $400K home, that’s $12,000 vs. $399." },
            { icon: '💼', title: "Buyer's Agents Still Get Involved", body: "Here's the reality post-NAR settlement: buyers now negotiate agent compensation directly with their agent. However, many sellers still offer 2–3% buyer's agent commission to attract more buyers. You can offer $0, but be prepared for some agents to steer their clients away." },
            { icon: '⚠️', title: "Seller's Disclosure — No Shortcuts", body: "Texas law requires the same Seller's Disclosure Notice whether you use an agent or not. This covers known defects, foundation issues, roof age, HVAC condition, and more. Omitting known issues = lawsuit risk. When in doubt, disclose." },
            { icon: '📊', title: 'NAR Settlement Impact on FSBO', body: "Since August 2024, buyer agent compensation is no longer advertised on MLS. This means FSBO sellers are on more equal footing — buyers and their agents negotiate compensation separately. This actually makes FSBO more attractive in DFW than ever before." },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', borderRadius: 12, padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 24px' }}>💰 FSBO Savings Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Home Price (estimated)</label>
              <input
                type="text"
                value={homePrice}
                onChange={e => setHomePrice(e.target.value)}
                placeholder="e.g. 450,000″
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Primary Reason for FSBO</label>
              <select
                value={fsboReason}
                onChange={e => setFsboReason(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15 }}
              >
                <option value="">Select reason...</option>
                <option value="savings">Maximize savings / no agent commission</option>
                <option value="control">Control over showings and negotiations</option>
                <option value="privacy">Privacy (no agents in my home)</option>
                <option value="speed">Already have a buyer lined up</option>
              </select>
            </div>
          </div>
          <button
            onClick={calculate}
            style={{ background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
          >
            Calculate My FSBO Savings →
          </button>

          {result && (
            <div style={{ marginTop: 24, padding: '20px', background: '#f0f9f0', borderRadius: 10, borderLeft: '4px solid #2d8a4e' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#2d8a4e', marginBottom: 8 }}>
                Estimated Savings: ${result.savings.toLocaleString()}
              </div>
              <div style={{ fontSize: 14, color: '#555', marginBottom: 12 }}>vs. paying a 3% listing agent commission</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Recommended Service: {result.service}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 12, marginBottom: 6 }}>⚠️ Key Risks to Manage:</div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {result.risks.map((r, i) => (
                  <li key={i} style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🛠️ Recommended DFW Flat Fee MLS Services</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {FSBO_SERVICES.map(s => (
              <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#f8f6f0', borderRadius: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: '#777', marginTop: 2 }}>{s.includes}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#2d8a4e' }}>{s.fee}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
