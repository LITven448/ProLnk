import { useState } from 'react';

const situations = [
  'I want to ask the seller why they are moving',
  'I want to tell the seller how much I love the house',
  'I want to ask about the neighborhood directly',
  'Seller left a note asking me to call them',
  'I saw the seller at the home during showing',
  'I want to ask about repairs not in the contract',
  'I want to negotiate after inspection',
  'I want to complain about the seller not cooperating',
  'I want to ask if the seller has other offers',
  'Closing is delayed — I want to contact seller directly',
];

function getGuidance(situation: string) {
  const guides: Record<string, { channel: string; canSay: string; askAgent: string; warning: string }> = {
    'I want to ask the seller why they are moving': {
      channel: '📞 Through your agent only',
      canSay: 'Nothing directly. Your agent can ask the listing agent, who may or may not share. Motivation is legitimately private.',
      askAgent: 'Ask your agent to find out the seller’s timeline and motivation. Agents share what their client allows — sometimes the listing agent reveals divorce, job relocation, or financial pressure, which is valuable intel.',
      warning: 'Direct contact to ask personal questions is inappropriate and could be seen as pressure. Let your agent handle this.'
    },
    'I want to tell the seller how much I love the house': {
      channel: '✉️ Buyer letter — use carefully',
      canSay: 'In Texas, a buyer love letter is allowed but carries legal risk. You can mention your plans for the home, your connection to the neighborhood, or your family. Do NOT mention your race, religion, national origin, family composition, or disability — Fair Housing Act violations apply to buyers too.',
      askAgent: 'Ask your agent whether the listing agent advises against love letters (many sellers' agents now reject them to avoid Fair Housing liability). Some listings explicitly say no letters.',
      warning: 'Love letters can backfire if they reveal protected class information. Keep it about the home, not your identity.'
    },
    'I want to ask about the neighborhood directly': {
      channel: '🏘️ Direct with neighbors — allowed',
      canSay: 'You may speak directly with neighbors — they are not party to the transaction. Ask about noise, HOA enforcement, traffic, neighbor behavior, anything. Neighbors are often the most honest source.',
      askAgent: 'Ask your agent if there are any known neighborhood issues disclosed in the listing. Also ask for HOA meeting minutes if there is an HOA.',
      warning: 'Do not discuss your offer price or terms with neighbors — word travels fast in DFW neighborhoods.'
    },
    'Seller left a note asking me to call them': {
      channel: '🚫 Do not call — route through agent',
      canSay: 'Nothing. Even if the seller initiates direct contact, responding directly creates legal and ethical problems. You could inadvertently create a side agreement, waive rights, or expose yourself to manipulation.',
      askAgent: 'Tell your agent immediately. They will contact the listing agent and address whatever the seller wants through proper channels.',
      warning: 'In Texas, all material communications affecting the contract should be in writing through licensed agents. A phone call with the seller is not binding but can be used against you.'
    },
    'I saw the seller at the home during showing': {
      channel: '👋 Brief courtesy only',
      canSay: 'A polite greeting is fine. You may comment on the weather, the neighborhood, or general pleasantries. Do not discuss price, your offer, other homes you are considering, your deadline, or financing.',
      askAgent: 'If the seller said anything material about price or motivation, tell your agent immediately — it may be useful leverage.',
      warning: 'Sellers sometimes attend showings to gauge buyer interest and create urgency. Do not reveal enthusiasm or financial capacity.'
    },
    'I want to ask about repairs not in the contract': {
      channel: '📋 Through agents in writing',
      canSay: 'Nothing directly. Any repair request after inspection must go through the TREC Amendment to Contract, signed by both parties.',
      askAgent: 'Give your agent a list of repair requests. They will draft the amendment and submit to the listing agent. Verbal repair agreements are not enforceable in Texas.',
      warning: 'Agreeing to repairs outside the written amendment creates disputes at closing. Everything must be in writing.'
    },
    'I want to negotiate after inspection': {
      channel: '📋 Through agents in writing only',
      canSay: 'Nothing directly to the seller. Your negotiation position, repair requests, and credit asks are communicated through your agent via the TREC Amendment to Contract.',
      askAgent: 'Tell your agent exactly what you want — dollar credit vs. completed repairs, specific items, deadline. They handle all communication with the listing agent.',
      warning: 'Texas inspection negotiations have a specific option period window. Know your option period expiration date — after it passes, you have no right to walk for any reason.'
    },
    'I want to complain about the seller not cooperating': {
      channel: '📞 To your agent only',
      canSay: 'Nothing to the seller or listing agent directly. Express your concerns to your own agent and let them advocate.',
      askAgent: 'Your agent can escalate to the listing agent, the listing broker, or TREC if there is a license law violation. Describe exactly what happened — delays, non-disclosure, refusal to allow inspections.',
      warning: 'Going directly to the seller or listing agent to complain creates animosity that kills deals. Channel frustration through your agent.'
    },
    'I want to ask if the seller has other offers': {
      channel: '📞 Through your agent',
      canSay: 'Nothing directly. This is a negotiating data point the seller controls.',
      askAgent: 'Your agent can ask the listing agent if there are multiple offers. The listing agent is not obligated to share this, but many will confirm whether the seller is in a multiple offer situation. Your agent can also observe: days on market, list price relative to comps, and showing traffic to infer demand.',
      warning: 'In Texas, sellers are not required to disclose other offers. If the listing agent says there are multiple offers, that may or may not be true — use it as motivation, not certainty.'
    },
    'Closing is delayed — I want to contact seller directly': {
      channel: '🚫 Absolutely through agents only',
      canSay: 'Nothing directly. Closing delays are contractual and legal matters. Any direct communication could be interpreted as waiving rights, agreeing to terms, or creating liability.',
      askAgent: 'Contact your agent immediately. They will coordinate with title company, lender, and listing agent. Extensions require written amendments. Know your closing date rights — if seller caused the delay, you may have remedies under the contract.',
      warning: 'Direct contact during a closing dispute is the fastest way to waive legal protections you have under the TREC contract. Everything in writing, through agents.'
    },
  };
  return guides[situation] || { channel: 'Through your agent', canSay: 'Consult your agent before any direct communication.', askAgent: 'Describe the situation to your agent and let them advise on proper channels.', warning: 'When in doubt, all communications go through your licensed agent.' };
}

export default function DFWBuyersCommunicationsGuide() {
  const [situation, setSituation] = useState('');
  const result = situation ? getGuidance(situation) : null;

  return (
    <div style={{ background: '#F8F6F1', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ borderBottom: '3px solid #1A2B3C', paddingBottom: 24, marginBottom: 40 }}>
          <p style={{ color: '#5C7A9F', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase', margin: '0 0 12px' }}>DFW Buyer Guide • 2026</p>
          <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.15 }}>Buyer-Seller Communication Guide</h1>
          <p style={{ color: '#4A5568', fontSize: 17, margin: 0, lineHeight: 1.6 }}>How communication flows in a DFW transaction — what you can say, what must go through your agent, and why direct contact creates risk.</p>
        </div>

        <div style={{ background: '#1A2B3C', color: '#F8F6F1', borderRadius: 6, padding: 20, marginBottom: 32 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 15 }}>⚖️ The Core Rule in Texas Real Estate</p>
          <p style={{ margin: 0, color: '#CBD5E0', fontSize: 14, lineHeight: 1.6 }}>Once both parties are represented by agents, all substantive communications go agent-to-agent. Direct buyer-seller contact is not illegal, but it creates risk: side agreements, waived rights, Fair Housing exposure, and deal-killing animosity. When in doubt — do not.</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <label style={{ display: 'block', color: '#1A2B3C', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>📌 Your Communication Situation</label>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#fff', border: '1.5px solid #CBD5E0', color: '#1A2B3C', padding: '12px 16px', fontSize: 15, borderRadius: 4 }}>
            <option value=''>Select your situation...</option>
            {situations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 6, padding: 32, marginBottom: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'inline-block', background: '#F0F4FF', border: '1.5px solid #CBD5E0', borderRadius: 4, padding: '6px 14px', fontSize: 14, fontWeight: 700, marginBottom: 20 }}>{result.channel}</div>
            <h2 style={{ color: '#1A2B3C', fontSize: 20, margin: '0 0 24px', borderBottom: '2px solid #E2E8F0', paddingBottom: 12 }}>What To Do →</h2>
            {[['💬 What You Can Say Directly', result.canSay, '#2D6A4F'], ['🤝 What To Ask Through Your Agent', result.askAgent, '#1A4A8C'], ['⚠️ Watch Out For', result.warning, '#9B2335']].map(([label, text, color]) => (
              <div key={label as string} style={{ borderLeft: '4px solid ' + color, paddingLeft: 16, marginBottom: 24 }}>
                <div style={{ color: color as string, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>{label}</div>
                <div style={{ color: '#4A5568', lineHeight: 1.7, fontSize: 15 }}>{text}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[['✅ Always Allowed', 'Neighbors, city offices, HOA management companies, title company (about your own file), your lender'],['🚫 Route Through Agent', 'Seller, listing agent, seller’s attorney, any party to the contract on the other side']].map(([label, text]) => (
            <div key={label as string} style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 4, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 15, color: '#1A2B3C' }}>{label}</div>
              <div style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
