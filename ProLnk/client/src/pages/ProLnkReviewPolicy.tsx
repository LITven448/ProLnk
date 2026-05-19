import { useState } from 'react';

const STAR_IMPACTS = [
  { stars: 5, label: '⭐⭐⭐⭐⭐', priority: 'Highest Priority', matchBoost: '+40% match frequency', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0′ },
  { stars: 4.5, label: '⭐⭐⭐⭐½', priority: 'High Priority', matchBoost: '+20% match frequency', color: '#0369a1', bg: '#eff6ff', border: '#bfdbfe' },
  { stars: 4.0, label: '⭐⭐⭐⭐', priority: 'Standard Priority', matchBoost: 'Baseline', color: '#78350f', bg: '#fefce8', border: '#fde68a' },
  { stars: 3.5, label: '⭐⭐⭐½', priority: 'Reduced Priority', matchBoost: '−15% match frequency', color: '#c2410c', bg: '#fff7ed', border: '#fed7aa' },
  { stars: 3.0, label: '⭐⭐⭐', priority: 'Low Priority', matchBoost: '−30% match frequency', color: '#b91c1c', bg: '#fef2f2', border: '#fecaca' },
  { stars: 2.5, label: '⭐⭐½ and below', priority: 'Suspension Review', matchBoost: 'Account reviewed for removal', color: '#7f1d1d', bg: '#fef2f2', border: '#fca5a5′ },
];

const DISPUTE_STEPS = [
  { icon: '📝', step: 'Submit Dispute', detail: 'Go to Reviews → Flag Review. Explain why you believe the review is unfair.' },
  { icon: '🔍', step: 'ProLnk Reviews', detail: 'Our team reviews the flagged review within 3 business days, checking for policy violations.' },
  { icon: '📊', step: 'Evidence Evaluated', detail: 'We look at message history, job completion records, and any photos you submit.' },
  { icon: '⚖️', step: 'Decision Made', detail: 'Review is either upheld, modified, or removed. You are notified of the outcome.' },
];

export default function ProLnkReviewPolicy() {
  const [selectedStars, setSelectedStars] = useState<number | null>(null);

  const selectedImpact = selectedStars !== null ? STAR_IMPACTS.find(s => s.stars === selectedStars) : null;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'system-ui, sans-serif', color: '#111827′ }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#fef9c3', color: '#854d0e', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            ⭐ Review System
          </span>
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2 }}>
          How ProLnk Reviews Work
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 40 }}>
          Your rating is the most important factor in your match priority. Here's exactly how the system works — and how to protect your score.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🏠', title: 'Who Can Review', detail: 'Only homeowners who completed a verified match with you can leave a review. No anonymous reviews.' },
            { icon: '⏱️', title: 'Review Window', detail: 'Homeowners have 14 days after job completion to submit a review. After that, the window closes.' },
            { icon: '🔒', title: 'Verified Only', detail: 'Reviews are attached to real jobs. Fake reviews from non-customers are automatically removed.' },
            { icon: '📊', title: 'Rolling Average', detail: 'Your rating is a weighted rolling average of your last 50 reviews, giving more weight to recent work.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{card.detail}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>⭐ Star Rating → Match Priority</h2>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>Click any rating to see its match impact.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {STAR_IMPACTS.map(item => (
              <button
                key={item.stars}
                onClick={() => setSelectedStars(selectedStars === item.stars ? null : item.stars)}
                style={{
                  width: '100%', textAlign: 'left', border: `2px solid ${selectedStars === item.stars ? item.color : '#e5e7eb'}`,
                  background: selectedStars === item.stars ? item.bg : '#fff',
                  borderRadius: 10, padding: '14px 18px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                  <span style={{ fontSize: 20, minWidth: 100 }}>{item.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: item.color }}>{item.priority}</span>
                </div>
                <span style={{ fontSize: 13, color: '#6b7280', whiteSpace: 'nowrap' }}>{item.matchBoost}</span>
              </button>
            ))}
          </div>
          {selectedImpact && (
            <div style={{ marginTop: 20, background: selectedImpact.bg, border: `1px solid ${selectedImpact.border}`, borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: selectedImpact.color, marginBottom: 8 }}>
                {selectedImpact.stars} Stars: {selectedImpact.priority}
              </div>
              <p style={{ fontSize: 14, color: '#374151', margin: 0, lineHeight: 1.7 }}>
                A {selectedImpact.stars}-star rating results in <strong>{selectedImpact.matchBoost}</strong>. 
                {selectedImpact.stars >= 4.5 && ' You are in the top tier — your profile appears first in homeowner match queues.'}
                {selectedImpact.stars === 4.0 && ' You are at the platform baseline. Maintaining this rating keeps you competitive.'}
                {selectedImpact.stars === 3.5 && ' You are below baseline. Focus on response speed, communication, and work quality.'}
                {selectedImpact.stars <= 3.0 && ' You are at risk. ProLnk will reach out with coaching. Further decline may result in suspension.'}
              </p>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🔍 How to Dispute an Unfair Review</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {DISPUTE_STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{i + 1}. {step.step}</div>
                  <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4, lineHeight: 1.6 }}>{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 8, padding: 14 }}>
            <p style={{ fontSize: 13, color: '#78350f', margin: 0 }}>
              ⚠️ You can dispute a review once. Groundless disputes that waste team time may count against your account standing.
            </p>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🚫 What Gets a Pro Removed</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Rating below 2.5 stars for more than 30 days',
              '3 or more verified homeowner complaints in 90 days',
              'Evidence of fraudulent job completion claims',
              'Threatening or abusive behavior toward homeowners',
              'Operating without required licenses or insurance',
              'Paying for or soliciting fake reviews',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 14, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8 }}>
                <span style={{ color: '#dc2626', flexShrink: 0 }}>🚫</span>
                <span style={{ fontSize: 14, color: '#374151′ }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 12px', color: '#15803d' }}>💡 How Fraud Reviews Are Handled</h3>
          <p style={{ fontSize: 14, color: '#166534', margin: 0, lineHeight: 1.7 }}>
            ProLnk uses automated detection and manual review to catch fake reviews. Red flags include: reviews from accounts with no match history with the pro, identical language across multiple reviews, and suspicious timing patterns. Fraud reviews are removed without notice, and accounts that submit them are suspended.
          </p>
        </div>
      </div>
    </div>
  );
}
