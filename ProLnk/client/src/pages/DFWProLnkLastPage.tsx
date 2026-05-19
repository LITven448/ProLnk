import { useState } from 'react';

const timeRanges = [
  { id: 'just', label: 'Just arrived', desc: 'You just landed on this page' },
  { id: 'few', label: 'A few minutes', desc: 'You’ve been exploring a bit' },
  { id: 'while', label: 'A while (15+ min)', desc: 'You’ve been reading seriously' },
  { id: 'deep', label: 'Deep dive (30+ min)', desc: 'You’re a true DFW home resource explorer' },
];

const resources: Record<string, { icon: string; title: string; desc: string }[]> = {
  just: [
    { icon: '🏠', title: 'DFW Morning Home Checklist', desc: 'Start every morning right — AC, foundation, storm damage. Your 5-minute daily routine.' },
    { icon: '🧮', title: 'Maintenance Cost Calculator', desc: 'Find out exactly what your DFW home costs to maintain annually.' },
    { icon: '🔧', title: 'DIY Repairs That Save Real Money', desc: '10 repairs any homeowner can do — no license, no contractor fee.' },
  ],
  few: [
    { icon: '🌡️', title: 'DFW HVAC Survival Guide', desc: 'When AC fails in July, you need answers fast. This guide has them.' },
    { icon: '🌧️', title: 'Storm Damage Response Timeline', desc: 'What to do in the first 24 hours after a DFW hailstorm or tornado.' },
    { icon: '💧', title: 'Foundation Watering Guide', desc: 'DFW clay soil demands a consistent watering schedule. Here’s the formula.' },
  ],
  while: [
    { icon: '📋', title: 'Annual Home Maintenance Calendar', desc: 'Every task, every month, organized for DFW’s unique climate.' },
    { icon: '🏊', title: 'DFW Pool Owner’s Maintenance Guide', desc: 'Year-round pool care for DFW’s brutal summers and surprise freezes.' },
    { icon: '🔍', title: 'How to Evaluate a Contractor Quote', desc: 'What’s included, what’s not, what’s a red flag. Read this before you sign.' },
  ],
  deep: [
    { icon: '🏗️', title: 'DFW Renovation ROI Guide', desc: 'Which home improvements actually pay back in the DFW market?' },
    { icon: '📊', title: 'Home Health Score Explained', desc: 'How ProLnk’s Home Health Vault scores your property and why it matters.' },
    { icon: '🤝', title: 'The ProLnk Pro Network Explained', desc: 'How we vet, rank, and match contractors — and why it’s better than Google.' },
  ],
};

const promises = [
  { icon: '🆓', text: 'Always free for homeowners — no surprises, no fees, ever' },
  { icon: '🔒', text: 'Your home data belongs to you — never sold, never shared' },
  { icon: '✅', text: 'Every contractor is licensed, insured, and background-checked' },
  { icon: '📈', text: 'We get better every day — your feedback shapes the platform' },
];

export default function DFWProLnkLastPage() {
  const [timeRange, setTimeRange] = useState('few');

  const recs = resources[timeRange] || [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🤝</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '16px 0 10px' }}>Thank You, DFW</h1>
          <p style={{ color: '#8B9BB4', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>You trusted ProLnk with your home. That means everything to us. DFW homeowners deserve a platform that's actually on their side — and that's what we built.</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>The ProLnk Promise</h2>
          <p style={{ color: '#8B9BB4', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>We built ProLnk because DFW homeowners were getting overcharged, misled, and underserved. These four commitments are non-negotiable — now and always.</p>
          {promises.map(p => (
            <div key={p.text} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid #1A2E4A', alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{p.icon}</span>
              <span style={{ fontSize: 14, color: '#E8EAF0', lineHeight: 1.5 }}>{p.text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ color: '#8B9BB4', fontSize: 13, marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>How long have you been reading today?</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {timeRanges.map(t => (
              <button key={t.id} onClick={() => setTimeRange(t.id)} style={{ padding: '9px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: timeRange === t.id ? '#F5E642' : '#1A2E4A', color: timeRange === t.id ? '#0A1628' : '#8B9BB4' }}>{t.label}</button>
            ))}
          </div>
          <h2 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📚 Top Resources For Your Journey</h2>
          {recs.map(r => (
            <div key={r.title} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid #1A2E4A', alignItems: 'flex-start' }}>
              <span style={{ fontSize: 26, flexShrink: 0 }}>{r.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#E8EAF0', marginBottom: 4 }}>{r.title}</div>
                <div style={{ fontSize: 13, color: '#8B9BB4', lineHeight: 1.5 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1A2E4A 0%, #0A1628 100%)', borderRadius: 16, padding: 32, textAlign: 'center', border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🏠</div>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Ready to Get Quotes?</h2>
          <p style={{ color: '#8B9BB4', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>Tell us what you need. We'll match you with vetted DFW contractors in minutes. No fees. No spam. No pressure.</p>
          <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, padding: '14px 36px', borderRadius: 10 }}>Get Free Quotes — It's Free 🚀</div>
        </div>
      </div>
    </div>
  );
}
