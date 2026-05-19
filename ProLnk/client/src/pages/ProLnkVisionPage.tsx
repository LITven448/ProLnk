import { useState } from 'react';

const milestones = [
  { year: '2026', label: 'DFW Launch + Texas Expansion', emoji: '🚀', detail: 'Waitlist converts to active platform. DFW goes live, Houston and Austin launch before year end. First 1,000 founding partners locked in.' },
  { year: '2027', label: 'National Rollout Begins', emoji: '🗺️', detail: '25 major metros live. Home Health Vault reaches 100K homes. AI matching model has processed 500K+ jobs — accuracy improves dramatically.' },
  { year: '2028', label: 'AI Predictive Maintenance', emoji: '🤖', detail: 'ProLnk moves from reactive to proactive. AI recommends maintenance before failure — flagging HVAC age, roof wear cycles, plumbing pressure anomalies.' },
  { year: '2029', label: 'TrustyPro Visual Scanning Mainstream', emoji: '📡', detail: 'TrustyPro visual scanning deployed nationally. Contractors scan homes at job completion. 3D structural data in 1M+ Home Health Vaults.' },
  { year: '2030', label: '1M Homes. National Marketplace.', emoji: '🏘️', detail: 'ProLnk and TrustyPro operate as the infrastructure layer for home services in America. Partner networks create generational income. Vault data becomes a permanent national asset.' },
];

const visions = [
  {
    type: 'Homeowner',
    emoji: '🏠',
    future: [
      'Your home\’s entire life story lives in one place — searchable, shareable, and yours forever.',
      'AI recommends maintenance before problems happen — saving you thousands in emergency repair costs.',
      'Every contractor you ever hire is pre-vetted, insured, rated, and accountable.',
      'Your Home Health Vault adds measurable value to your home at sale — verified history builds buyer trust.',
    ],
  },
  {
    type: 'Partner',
    emoji: '🤝',
    future: [
      'Founding Partners who locked in at $149/mo never see a rate increase — ever.',
      'A network built today compounds for years. Each new pro you recruit earns you 4 levels deep.',
      'As ProLnk expands nationally, your network expands with it — no extra work required.',
      'The partner network becomes a generational income asset — one you can transfer and build upon.',
    ],
  },
  {
    type: 'Contractor',
    emoji: '🔧',
    future: [
      'AI matching sends you only jobs that fit your trade, territory, and schedule — no more spray-and-pray.',
      'Your quality score builds a reputation that replaces all your marketing costs.',
      'Home Health Vault integration means every job you complete is permanently documented — building your legacy.',
      'National expansion means more markets, more volume, and an AI that gets smarter about matching you every month.',
    ],
  },
];

export default function ProLnkVisionPage() {
  const [selectedVision, setSelectedVision] = useState(0);
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const v = visions[selectedVision];
  const m = milestones[selectedMilestone];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 3, marginBottom: 12 }}>5-YEAR VISION</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 16px' }}>Where ProLnk Is Going</h1>
          <p style={{ color: '#8899aa', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
            We are not building a lead generation tool. We are building the operating system for American home services — with data, AI, and a network that compounds forever.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 }}>
          {milestones.map((ml, i) => (
            <button
              key={i}
              onClick={() => setSelectedMilestone(i)}
              style={{
                background: selectedMilestone === i ? '#F5E642' : '#111e35',
                color: selectedMilestone === i ? '#0A1628' : '#ccc',
                border: '1px solid #1e3a5f',
                borderRadius: 8,
                padding: '10px 16px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {ml.year} {ml.emoji}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 14, padding: 28, border: '1px solid #1e3a5f', marginBottom: 36 }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{m.emoji} {m.label}</div>
          <p style={{ color: '#cdd9e5', margin: 0, lineHeight: 1.7 }}>{m.detail}</p>
        </div>

        <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 3, marginBottom: 16, textAlign: 'center' }}>WHAT THE VISION MEANS FOR YOU</div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28 }}>
          {visions.map((vis, i) => (
            <button
              key={i}
              onClick={() => setSelectedVision(i)}
              style={{
                background: selectedVision === i ? '#F5E642' : '#111e35',
                color: selectedVision === i ? '#0A1628' : '#ccc',
                border: '1px solid #1e3a5f',
                borderRadius: 8,
                padding: '12px 22px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {vis.emoji} {vis.type}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 14, padding: 28, border: '1px solid #1e3a5f' }}>
          {v.future.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: i < v.future.length - 1 ? 18 : 0 }}>
              <div style={{ color: '#F5E642', fontSize: 18, marginTop: 1 }}>→</div>
              <p style={{ color: '#cdd9e5', margin: 0, lineHeight: 1.7 }}>{f}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 36px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Join the Founding Network →
          </button>
        </div>
      </div>
    </div>
  );
}
