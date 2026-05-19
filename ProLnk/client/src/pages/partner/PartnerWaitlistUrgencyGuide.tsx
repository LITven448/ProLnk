import { useState } from 'react';

const SITUATIONS = [
  'Prospect is interested but wants to wait',
  'Prospect says they\’ll think about it',
  'Prospect asks "how long do I have?"',
  'Prospect doubts the waitlist is real',
  'Prospect already knows someone in ProLnk',
  'Prospect wants to talk to their spouse first',
];

const messages: Record<string, { subject: string; timing: string; message: string; followUp: string }> = {
  'Prospect is interested but wants to wait': {
    subject: 'What they\’re waiting for doesn\’t exist after 500',
    timing: 'Use within the same conversation — don\’t let them leave without this.',
    message: 'Totally understand. Here\’s the thing — waiting doesn\’t cost you nothing, it costs you Charter. After 500 applications close, there\’s no "come back and get Charter later." The $149/month locked forever, the 25% commission floor, the 4-level cascade — those are only for the 500 who apply before the door shuts. After that, the platform is open, but Charter is gone. Is there something specific you\’re waiting on that I can help you sort out today?',
    followUp: 'Send a "waitlist counter" screenshot 24h later showing progress toward 500.',
  },
  'Prospect says they\’ll think about it': {
    subject: 'Reframe "think about it" to what changes after Charter closes',
    timing: 'Send within 2 hours while you\’re still fresh in their mind.',
    message: 'Totally fair — this is a real decision. While you\’re thinking, here\’s the one thing worth knowing: the thinking window and the Charter window are the same window. Once 500 applications are in, Charter closes. No exceptions. What opens after is a solid opportunity — but not this one. What questions can I answer that would help you think faster?',
    followUp: 'Share the Charter vs Post-Charter comparison table 48h later.',
  },
  'Prospect asks "how long do I have?"': {
    subject: 'Give them an honest, specific answer',
    timing: 'Deliver in real-time — this is an active interest signal.',
    message: 'Honest answer: we don\’t know exactly — it\’s not time-based, it\’s application-based. When we hit 500 approved Charter applications, that\’s it. Right now we\’re [XX] applications in. Based on our current pace, we\’re weeks away, not months. The right question isn\’t "how long do I have?" — it\’s "do I want to be in the first 500 or not?" Because the benefits are categorically different.',
    followUp: 'Follow up with current application count in 3 days to show movement.',
  },
  'Prospect doubts the waitlist is real': {
    subject: 'Show, don\’t just tell',
    timing: 'Address this in real-time — doubt unaddressed becomes a no.',
    message: 'Fair skepticism. Here\’s what\’s real: the platform is built and being tested now. The network income structure is locked in by contract, not by policy — it\’s in the Charter member agreement you\’d sign. The 500-application cap is enforced by the system, not a sales tactic. Happy to walk you through the Charter member agreement or show you the active platform. What would make this feel real to you?',
    followUp: 'Offer a platform walkthrough or send the Charter member agreement document.',
  },
  'Prospect already knows someone in ProLnk': {
    subject: 'They\’re closer than they think — use social proof',
    timing: 'This is a warm moment — close it now.',
    message: 'That\’s actually a great sign — you already know the community is real. The people you know are Charter members. That\’s the tier you\’d be joining. You\’d be at the same level, with the same locked benefits, in the same network. The question is whether you join them or watch them build while you wait.',
    followUp: 'Offer to connect them with their ProLnk contact for validation.',
  },
  'Prospect wants to talk to their spouse first': {
    subject: 'Give them the tools to make that conversation easy',
    timing: 'Send within the hour — strike while engagement is high.',
    message: 'Completely reasonable — this is worth a conversation. Here\’s what I\’d share with them: the decision is $149/month, locked forever. That\’s less than most streaming subscriptions. What you\’re deciding is whether to get in at Charter pricing while it exists, or pay a higher rate when the platform opens publicly. The opportunity is real; I\’d just hate for the timing to be the thing that changes everything.',
    followUp: 'Send a spouse-friendly one-pager they can share: "What is ProLnk? What are we deciding?"',
  },
};

export default function PartnerWaitlistUrgencyGuide() {
  const [situation, setSituation] = useState(SITUATIONS[0]);
  const data = messages[situation];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>⏱️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Waitlist Urgency Guide</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>Communicate urgency truthfully. Charter closes at 500 applications — here\'s how to say that in every situation.</p>
        </div>

        <div style={{ background: '#FEF2F2', borderRadius: 10, padding: 16, marginBottom: 24, border: '1px solid #FECACA' }}>
          <p style={{ color: '#991B1B', fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>🔑 The Core Truth (Never Exaggerate Beyond This)</p>
          <p style={{ color: '#7F1D1D', margin: 0, fontSize: 13, lineHeight: 1.6 }}>Charter tier closes permanently at 500 applications. After that, ProLnk remains open — but the $149/month lock, 25% commission floor, and 4-level cascade are gone forever. That is the real urgency. Use it truthfully.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🎯 Select Prospect Situation</h2>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#0A1628′ }}>
            {SITUATIONS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {data && (
          <>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, margin: 0 }}>💬 What to Say</h2>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{data.subject}</span>
              </div>
              <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642′ }}>
                <p style={{ color: '#334155', margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>"{data.message}"</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#EFF6FF', borderRadius: 12, padding: 18, border: '1px solid #BFDBFE' }}>
                <h3 style={{ color: '#1E40AF', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>⏰ Timing</h3>
                <p style={{ color: '#1E3A8A', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{data.timing}</p>
              </div>
              <div style={{ background: '#F0FDF4', borderRadius: 12, padding: 18, border: '1px solid #BBF7D0′ }}>
                <h3 style={{ color: '#14532D', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>📤 Follow-Up</h3>
                <p style={{ color: '#15803D', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{data.followUp}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
