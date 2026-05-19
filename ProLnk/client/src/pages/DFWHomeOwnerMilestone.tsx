import { useState } from 'react';

const topics = [
  { label: 'Seasonal Maintenance', emoji: '🌤️', detail: 'You now know that DFW summers demand AC checks in April, and winters need pipe insulation before December. That knowledge saves $800–$2,400 per year on average.' },
  { label: 'Contractor Vetting', emoji: '🔍', detail: 'You understand how to verify licenses, read reviews across platforms, and spot red flags before signing. Most DFW homeowners learn this the hard way—after a $3,000 mistake.' },
  { label: 'Home Health Systems', emoji: '🏠', detail: 'You\’ve learned how plumbing, electrical, HVAC, and foundation systems interact. That systems view helps you catch cascading problems early.' },
  { label: 'Market-Aware Repairs', emoji: '📊', detail: 'You understand how DFW\’s fast-moving real estate market affects repair ROI. Not every fix adds value—but the right ones do.' },
];

const masteryLevels = [
  { min: 0, max: 2, label: 'Getting Started', emoji: '🌱', message: 'You\’ve begun building real DFW homeowner knowledge. Every page you\’ve read is worth dollars saved.' },
  { min: 3, max: 5, label: 'Informed Owner', emoji: '📘', message: 'You know more than 70% of DFW homeowners. You can spot problems early and hire smarter.' },
  { min: 6, max: 9, label: 'Savvy Homeowner', emoji: '🏆', message: 'You\’re operating at expert level. You ask the right questions, hire confidently, and protect your investment.' },
  { min: 10, max: 999, label: 'DFW Mastery', emoji: '⭐', message: 'You\’ve achieved genuine mastery. ProLnk was built for homeowners exactly like you—ready to make every service decision count.' },
];

export default function DFWHomeOwnerMilestone() {
  const [pagesRead, setPagesRead] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const mastery = masteryLevels.find(m => pagesRead >= m.min && pagesRead <= m.max) || masteryLevels[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🏡</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW Homeowner Milestone
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.6 }}>
            Celebrating your mastery of DFW homeownership knowledge — what you've learned, what it’s worth, and what comes next.
          </p>
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>
            📖 How much have you read?
          </h2>
          <p style={{ color: '#94A3B8', marginBottom: 16 }}>Drag to reflect how many ProLnk DFW guides you've gone through:</p>
          <input
            type="range" min={0} max={15} value={pagesRead}
            onChange={e => setPagesRead(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F5E642', marginBottom: 12 }}
          />
          <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, color: '#F5E642′ }}>
            {pagesRead} {pagesRead === 1 ? 'guide' : 'guides'}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{mastery.emoji}</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>{mastery.label}</h2>
          <p style={{ fontSize: 16, color: '#CBD5E1', lineHeight: 1.7 }}>{mastery.message}</p>
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>💡 What you've learned — tap to explore</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {topics.map((t, i) => (
              <button key={i} onClick={() => setSelectedTopic(selectedTopic === i ? null : i)}
                style={{ background: selectedTopic === i ? '#F5E642′ : '#0A1628', color: selectedTopic === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 10, padding: '14px 12px', cursor: ’pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
          {selectedTopic !== null && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, color: '#CBD5E1', lineHeight: 1.7 }}>
              {topics[selectedTopic].detail}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>ProLnk Extends Your Knowledge Into Action</h2>
          <p style={{ color: '#132040', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
            Everything you've learned here — ProLnk turns into verified contractors, transparent pricing, and protected decisions for your home.
          </p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Join the ProLnk Waitlist →
          </button>
        </div>

      </div>
    </div>
  );
}
