import { useState } from 'react';

const SCENARIOS: Record<string, { approach: string; template: string; avoid: string }> = {
  giving_scope: {
    approach: 'Send a written summary before the call. Use text for quick questions, email for scope details. Contractors appreciate clarity upfront — it reduces back-and-forth and leads to more accurate bids.',
    template: 'Hey [Name], here\’s what I need: [specific task]. Location: [room/area]. Timeline: [flexible/asap/date]. Preferred contact: [text/call]. Please confirm you\’ve seen this before the estimate. Thanks.',
    avoid: 'Avoid vague descriptions like "fix my plumbing" — it signals you don\’t know what you want and leads to inflated estimates.',
  },
  change_order: {
    approach: 'Always request change orders in writing before work begins. A text message is legally sufficient in Texas. Ask for revised scope, added cost, and timeline impact upfront.',
    template: 'Hi [Name], I\’d like to add [new task] to the project. Can you send me an updated quote with the added cost and any timeline change? I want to confirm in writing before you proceed. Thanks.',
    avoid: 'Never say "just do it, we\’ll figure out the cost later" — this removes your ability to dispute the bill and often leads to disputes.',
  },
  subpar_work: {
    approach: 'Address issues immediately, calmly, and in writing. Take photos before contacting the contractor. Give them a chance to fix it before involving a third party or leaving a review.',
    template: 'Hi [Name], I noticed [specific issue] with the work completed on [date]. I\’ve attached photos. I\’d like to give you the opportunity to address this before we proceed further. Can we set a time to review? Thanks.',
    avoid: 'Don\’t go straight to a public review or threaten legal action in the first message — it backs contractors into a corner and often delays resolution.',
  },
  scheduling: {
    approach: 'Text for scheduling. Call only if no response in 24 hours. Confirm the day before and the hour before. DFW contractors are stretched thin — clear confirmations prevent no-shows.',
    template: 'Hi [Name], confirming our appointment for [day] at [time] at [address]. Please let me know if anything changes. See you then.',
    avoid: 'Don\’t call repeatedly or send multiple texts — it signals anxiety and can put contractors on the defensive.',
  },
  payment_dispute: {
    approach: 'Request an itemized invoice before any final payment. Review line-by-line. If something looks wrong, email a specific question — don\’t withhold payment without notice.',
    template: 'Hi [Name], I received the invoice. I have a question about line item [X]. Can you clarify what that covers? I want to get this resolved so I can pay promptly.',
    avoid: 'Never withhold full payment over a disputed item without saying why — it damages the relationship and can trigger mechanics lien in Texas.',
  },
};

export default function DFWContractorCommunicationGuide() {
  const [scenario, setScenario] = useState('giving_scope');
  const [submitted, setSubmitted] = useState(false);

  const result = SCENARIOS[scenario];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '0.5rem 1rem', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          💬 DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>How to Communicate with Contractors</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 15 }}>
          DFW contractors are busy and respond to clarity. Know when to text, when to call, how to handle change orders, and how to complain without burning the relationship.
        </p>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>📋 What's your communication challenge?</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              ['giving_scope', '📝 Giving clear project scope'],
              ['change_order', '📄 Requesting a change order'],
              ['subpar_work', '😤 Addressing subpar work'],
              ['scheduling', '📅 Scheduling & confirmations'],
              ['payment_dispute', '💳 Disputing an invoice'],
            ].map(([val, label]) => (
              <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '0.75rem 1rem', borderRadius: 8, background: scenario === val ? '#1e3a5f' : '#162035', border: `2px solid ${scenario === val ? '#F5E642' : '#334155'}` }}>
                <input type="radio" name="scenario" value={val} checked={scenario === val} onChange={() => setScenario(val)} style={{ accentColor: '#F5E642′ }} />
                <span style={{ fontWeight: scenario === val ? 700 : 400 }}>{label}</span>
              </label>
            ))}
            <button onClick={() => setSubmitted(true)}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: 15, marginTop: 4 }}>
              💡 Get My Approach + Template
            </button>
          </div>
        </div>

        {submitted && result && (
          <div>
            <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.25rem', marginBottom: 14, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>✅ Recommended Approach</div>
              <div style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.6 }}>{result.approach}</div>
            </div>
            <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.25rem', marginBottom: 14, borderLeft: '4px solid #4ade80′ }}>
              <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>📱 Template Message</div>
              <div style={{ fontSize: 13, color: '#e2e8f0', fontStyle: 'italic', lineHeight: 1.7, background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                "{result.template}"
              </div>
            </div>
            <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.25rem', borderLeft: '4px solid #ef4444′ }}>
              <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🚫 What to Avoid</div>
              <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{result.avoid}</div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, background: '#0f2044', borderRadius: 10, padding: '1rem', fontSize: 13, color: '#94a3b8′ }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>💡 DFW Pro Tip: </span>
          Text is preferred by 80% of DFW contractors. Call only when urgent. Email for documentation. Never rely on verbal agreements for scope or price.
        </div>

        <div style={{ marginTop: 24, background: '#0f2044', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Work with pre-vetted DFW contractors who communicate clearly</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>ProLnk pros are rated on communication, not just work quality.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
            Find a Pro on ProLnk →
          </button>
        </div>
      </div>
    </div>
  );
}
