import { useState } from 'react';

const situations = [
  {
    id: 'first-time',
    label: 'First-time buyer, just starting to look',
    rec: 'Sign a non-exclusive buyer agency agreement (BAA) limited to 90 days with a specific agent before touring any homes — now legally required.',
    agreement: ['Commission rate clearly stated (typically 2.5–3%)', 'Term length: 90 days or less to start', 'Specific vs. exclusive representation', 'How to terminate early if relationship isn\’t working'],
    flags: ['Agent refuses to give you a written agreement', 'Agreement locks you in for 12 months', 'Agent won\’t disclose their compensation'],
  },
  {
    id: 'unrepresented',
    label: 'Considering going unrepresented to save money',
    rec: 'Proceed with caution. Texas law allows unrepresented buyers but listing agents represent the seller. You\’ll negotiate alone against a professional.',
    agreement: ['Request a "transaction broker" or "intermediary" arrangement in writing', 'Never assume the listing agent represents your interests', 'Consider a flat-fee buyer\’s agent for review only'],
    flags: ['Listing agent implies they can represent both parties equally', 'No written disclosure of agency relationship', 'Agent discourages you from getting independent legal review'],
  },
  {
    id: 'switching-agents',
    label: 'Unhappy with current agent, want to switch',
    rec: 'Review your existing BAA for termination clause. Most allow 30-day written notice. Get new agreement in place before touring new homes.',
    agreement: ['Confirm prior agreement is terminated in writing', 'Ensure new agent knows you were previously represented', 'Check if prior agent has claim on homes you toured with them'],
    flags: ['New agent pressures you to tour before signing agreement', 'No clear process for transferring your transaction history', 'Prior agent threatens legal action without reviewing BAA terms'],
  },
];

export default function DFWBuyerBrokerageGuide2026() {
  const [selected, setSelected] = useState('');
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🤝 📄</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Buyer Brokerage Guide 2026</h1>
          <p style={{ margin: 0, color: '#555', fontSize: 15, lineHeight: 1.6 }}>
            The <strong>NAR settlement (effective August 2024)</strong> changed the rules. Buyer agents can no longer assume sellers will pay their commission — and you must sign a written buyer agency agreement before touring homes.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '📝', title: 'The New Rule: Written Agreement First', body: 'As of August 2024, REALTORS must have a signed Buyer Representation Agreement before showing any property. This is NOT optional. If an agent shows you homes without one, they\’re violating NAR rules.' },
            { icon: '💰', title: 'Who Pays the Buyer Agent Now?', body: 'Sellers are no longer required to offer buyer agent compensation. Buyers may pay their own agent directly, negotiate compensation into the purchase offer, or find sellers who voluntarily offer buyer agent co-op. Always negotiate — this is a new world.' },
            { icon: '⚖️', title: 'Unrepresented Buyer Risks in Texas', body: 'Texas listing agents represent the seller. If you tour and offer without your own agent, you\’re negotiating against a trained professional. In DFW\’s competitive market, this can cost you thousands — or result in missing critical inspection or contract protections.' },
            { icon: '🔎', title: 'What to Put in Your Buyer Agreement', body: 'Negotiate: commission rate (not all charge 3%), term length (90 days max to start), geographic scope (don\’t sign for all of DFW unless you\’re ready), and early termination rights. Get it in writing and don\’t sign under pressure.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon}</div>
              <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700 }}>{card.title}</h3>
              <p style={{ margin: 0, color: '#555', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700 }}>🎯 Your Situation → Buyer Rep Recommendation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === s.id ? '#2563eb' : '#e0e0e0'}`, background: selected === s.id ? '#eff6ff' : '#fafafa', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div>
              <div style={{ background: '#eff6ff', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>💡 Recommendation</div>
                <div style={{ fontSize: 14, lineHeight: 1.6 }}>{match.rec}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>📋 What to Include in Your Agreement</div>
                {match.agreement.map((item, i) => <div key={i} style={{ fontSize: 14, padding: '6px 0', borderBottom: '1px solid #f0f0f0', color: '#333′ }}>✔️ {item}</div>)}
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 8, color: '#dc2626′ }}>🚩 Red Flags to Watch For</div>
                {match.flags.map((flag, i) => <div key={i} style={{ fontSize: 14, padding: '6px 0', borderBottom: '1px solid #f0f0f0', color: '#555′ }}>⚠️ {flag}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
