import { useState } from 'react';

const conditions = ['Strong Buyer Market', 'Balanced Market', 'Moderate Seller Market', 'Hot Seller Market'];
const findingLevels = ['No Issues', 'Minor Issues (<$2K)', 'Moderate Issues ($2K-$10K)', 'Major Issues (>$10K)'];

const strategies: Record<string, Record<string, { strategy: string; ask: string[]; outcome: string }>> = {
  'Strong Buyer Market': {
    'No Issues': { strategy: 'Full leverage — negotiate price down 3-5%', ask: ['Price reduction 3-5%', 'Seller pays closing costs', '1-year home warranty', 'Flexible possession date'], outcome: 'High chance seller accepts most requests' },
    'Minor Issues (<$2K)': { strategy: 'Request repair credit at closing', ask: ['$2K credit at closing', 'Seller pays closing costs', '1-year home warranty'], outcome: 'Seller likely to comply to keep deal alive' },
    'Moderate Issues ($2K-$10K)': { strategy: 'Price reduction or repair credit — your choice', ask: ['Price reduction equal to repair cost', 'Or seller-paid repairs before close', 'Closing cost assistance'], outcome: 'Strong position — seller needs to move property' },
    'Major Issues (>$10K)': { strategy: 'Aggressive renegotiation or walk away', ask: ['Full repair credit or price reduction', 'Licensed contractor repairs', 'Extended inspection period'], outcome: 'Seller must respond — you hold the cards' },
  },
  'Balanced Market': {
    'No Issues': { strategy: 'Modest negotiation — ask for closing costs', ask: ['Seller pays 1-2% closing costs', '1-year home warranty', 'Preferred possession date'], outcome: 'Seller will likely negotiate on smaller asks' },
    'Minor Issues (<$2K)': { strategy: 'Small repair credit is reasonable', ask: ['$1,500-$2,000 repair credit', 'Home warranty'], outcome: 'Most sellers will agree to avoid deal falling apart' },
    'Moderate Issues ($2K-$10K)': { strategy: 'Split the cost is fair framing', ask: ['50% of repair cost as credit', 'Or seller fixes critical items only'], outcome: 'Expect counter-offer — be ready to meet in middle' },
    'Major Issues (>$10K)': { strategy: 'Strong renegotiation position post-inspection', ask: ['Full credit for safety/structural issues', 'Price reduction on cosmetic items'], outcome: 'Seller may push back but will likely compromise' },
  },
  'Moderate Seller Market': {
    'No Issues': { strategy: 'Limited leverage — DFW sellers are price-aware', ask: ['Home warranty only', 'Minor possession flexibility'], outcome: 'Do not lowball — DFW sellers reject low offers quickly' },
    'Minor Issues (<$2K)': { strategy: 'Small ask only — keep deal intact', ask: ['$1,000-$1,500 repair credit max', 'Or seller fixes one specific item'], outcome: 'Seller may reject — be ready to proceed anyway' },
    'Moderate Issues ($2K-$10K)': { strategy: 'Focus on safety/structural, not cosmetic', ask: ['Credit for safety issues only', 'Accept cosmetic items as-is'], outcome: 'Reasonable sellers will credit for real issues' },
    'Major Issues (>$10K)': { strategy: 'Negotiate hard — major issues justify it', ask: ['Full credit for structural/mechanical issues', 'Or walk away and find better property'], outcome: 'This is your best negotiation window in a seller market' },
  },
  'Hot Seller Market': {
    'No Issues': { strategy: 'No price negotiation — focus on terms', ask: ['Home warranty if possible', 'Leaseback if seller needs time'], outcome: 'DFW hot pockets: lowball offers killed immediately' },
    'Minor Issues (<$2K)': { strategy: 'Accept or ask for warranty only', ask: ['Home warranty to cover items', 'Or accept as-is and build repair budget'], outcome: 'Seller has backup offers — keep asks minimal' },
    'Moderate Issues ($2K-$10K)': { strategy: 'Inspection contingency is your only leverage', ask: ['Credit for major safety issues only', 'Cosmetic issues: accept or walk'], outcome: 'Seller may say take-it-or-leave-it — know your walk-away price' },
    'Major Issues (>$10K)': { strategy: 'Negotiate or exit — this is justified', ask: ['Credit for structural/mechanical only', 'Get contractor quote before asking'], outcome: 'Even hot sellers must address major defects — push firmly' },
  },
};

export default function DFWNegotiationGuide() {
  const [condition, setCondition] = useState('');
  const [finding, setFinding] = useState('');
  const result = condition && finding ? strategies[condition]?.[finding] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🤝</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a2744', marginBottom: '0.5rem' }}>DFW Negotiation Guide</h1>
          <p style={{ color: '#555', fontSize: '1.05rem' }}>Know your leverage. Know DFW seller culture. Negotiate smart.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2744', marginBottom: '1rem' }}>⚠️ DFW Seller Culture Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { icon: '❌', text: 'Lowball offers are quickly rejected — DFW sellers know their market' },
              { icon: '✅', text: 'Inspection findings = your only leverage in a hot market' },
              { icon: '📊', text: 'DFW sellers track Zillow, Redfin, and comps obsessively' },
              { icon: '⚡', text: 'Speed matters — delayed responses signal weak buyers' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                <span style={{ fontSize: '0.9rem', color: '#444′ }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2744', marginBottom: '1rem' }}>🎯 What You Can Negotiate</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
            {['Purchase Price', 'Closing Cost Assistance', 'Repairs or Credits', 'Home Warranty', 'Possession Date', 'Personal Property'].map((item, i) => (
              <div key={i} style={{ padding: '0.75rem', backgroundColor: '#e8f4fd', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#1a2744′ }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2744', marginBottom: '1rem' }}>🔧 Build Your Strategy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.4rem' }}>Market Conditions</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #ddd', fontSize: '0.95rem' }}>
                <option value=''>Select...</option>
                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.4rem' }}>Inspection Findings</label>
              <select value={finding} onChange={e => setFinding(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #ddd', fontSize: '0.95rem' }}>
                <option value=''>Select...</option>
                {findingLevels.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ backgroundColor: '#1a2744', borderRadius: '10px', padding: '1.5rem', color: '#fff' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.75rem' }}>📋 {result.strategy}</div>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.4rem' }}>ASK FOR:</div>
                {result.ask.map((a, i) => <div key={i} style={{ fontSize: '0.9rem', color: '#e0e0e0', marginBottom: '0.25rem' }}>• {a}</div>)}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#F5E642', fontWeight: 600 }}>Expected: {result.outcome}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
