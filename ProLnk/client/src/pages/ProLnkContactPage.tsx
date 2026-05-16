import { useState } from 'react';

const reasons = ['partner support', 'homeowner support', 'press', 'investor', 'bug report'] as const;
type Reason = typeof reasons[number];

const contacts: Record<Reason, { emoji: string; channel: string; include: string[]; response: string; color: string }> = {
  'partner support': {
    emoji: '🤝',
    channel: 'partners@prolnk.io — or live chat in your Partner Dashboard',
    include: [
      '📋 Your Partner ID (found in dashboard → Account)',
      '💰 The commission or payout in question with date and amount',
      '📸 Screenshot of the issue if applicable',
      '📝 Description of what you expected vs. what happened',
    ],
    response: '⏱️ Response within 4 business hours for active partners',
    color: '#3B82F6',
  },
  'homeowner support': {
    emoji: '🏠',
    channel: 'help@prolnk.io — or text HELP to 214-555-0199 (DFW only)',
    include: [
      '📍 Your property address used during signup',
      '📋 The job type and approximate date of your request',
      '🔧 Name of the contractor if your issue involves a specific pro',
      '📝 What happened and what resolution you are looking for',
    ],
    response: '⏱️ Response within 1 business day — urgent issues same day',
    color: '#10B981',
  },
  'press': {
    emoji: '📰',
    channel: 'press@prolnk.io — no calls please',
    include: [
      '🗞️ Your publication name and article topic',
      '📅 Your publication deadline',
      '🎙️ Whether you need a quote, interview, or data',
      '📧 Best email and phone to reach you',
    ],
    response: '⏱️ Response within 2 business days — deadline requests flagged immediately',
    color: '#8B5CF6',
  },
  'investor': {
    emoji: '💼',
    channel: 'invest@prolnk.io — deck and data room available on request',
    include: [
      '🏢 Your firm name and fund size (if applicable)',
      '📊 Specific stage and check size you focus on',
      '🔗 LinkedIn or website so we can learn about your thesis',
      '📅 Timeline — are you actively deploying or exploring?',
    ],
    response: '⏱️ Response within 3 business days — active round through Q3 2026',
    color: '#F59E0B',
  },
  'bug report': {
    emoji: '🐛',
    channel: 'bugs@prolnk.io — or open an issue on our public GitHub',
    include: [
      '🌐 Browser, device, and OS where the bug occurred',
      '🔄 Steps to reproduce the issue reliably',
      '📸 Screenshot or screen recording if possible',
      '⚠️ Severity: does it block core functionality or cause data loss?',
    ],
    response: '⏱️ Acknowledgment within 1 business day — critical bugs patched same day',
    color: '#EF4444',
  },
};

export default function ProLnkContactPage() {
  const [selected, setSelected] = useState<Reason>('homeowner support');
  const c = contacts[selected];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📬</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: 0 }}>Contact ProLnk</h1>
          <p style={{ color: '#64748B', marginTop: 8 }}>Select your reason to get the right channel and faster help</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
          {reasons.map(r => (
            <button key={r} onClick={() => setSelected(r)} style={{
              padding: '8px 16px', borderRadius: 24, border: '2px solid',
              borderColor: selected === r ? '#0A1628' : '#CBD5E1',
              background: selected === r ? '#0A1628' : 'white',
              color: selected === r ? 'white' : '#0A1628',
              fontWeight: 700, cursor: 'pointer', fontSize: 13, textTransform: 'capitalize',
            }}>{r}</button>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 28, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 32 }}>{c.emoji}</span>
            <div>
              <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Contact Channel</div>
              <div style={{ fontSize: 15, color: '#0A1628', fontWeight: 700, marginTop: 2 }}>{c.channel}</div>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', marginBottom: 10 }}>📝 Include in your message:</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {c.include.map((item, i) => (
                <li key={i} style={{ padding: '8px 0', borderBottom: i < c.include.length - 1 ? '1px solid #F1F5F9' : 'none', color: '#374151', fontSize: 14 }}>{item}</li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '12px 16px', borderLeft: `4px solid ${c.color}` }}>
            <p style={{ margin: 0, color: '#0A1628', fontSize: 14, fontWeight: 600 }}>{c.response}</p>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '16px 20px' }}>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>
            📍 ProLnk is headquartered in Dallas, TX. Business hours: M–F 8am–6pm CT
          </p>
        </div>
      </div>
    </div>
  );
}
