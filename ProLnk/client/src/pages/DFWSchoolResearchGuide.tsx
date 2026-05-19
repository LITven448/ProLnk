import { useState } from 'react';

const familyPriorities = [
  { key: 'academics', label: '📚 Academics & AP/IB rigor', isds: ['Carroll ISD (Southlake)', 'Frisco ISD', 'Coppell ISD', 'Highland Park ISD'] },
  { key: 'arts', label: '🎭 Arts, theater & music programs', isds: ['Grapevine-Colleyville ISD', 'Lewisville ISD', 'Plano ISD', 'McKinney ISD'] },
  { key: 'sports', label: '🏈 Athletics & competitive sports', isds: ['Allen ISD', 'Southlake Carroll ISD', 'Katy-adjacent districts', 'Prosper ISD'] },
  { key: 'stem', label: '🔬 STEM, robotics & coding', isds: ['Frisco ISD', 'Richardson ISD', 'Plano ISD', 'McKinney ISD'] },
  { key: 'diversity', label: '🌍 Cultural diversity & inclusion', isds: ['Richardson ISD', 'Garland ISD', 'Irving ISD', 'Grand Prairie ISD'] },
];

const ratingPlatforms = [
  {
    name: 'TEA (Texas Education Agency)',
    emoji: '🏛️',
    what: 'Official state accountability ratings (A–F). Based on student achievement, growth, and closing gaps.',
    strengths: 'Most objective — tied to actual test scores and graduation rates.',
    limits: 'Lags 1–2 years. Doesn\’t capture culture, safety, or teacher quality.',
    url: 'tea.texas.gov',
  },
  {
    name: 'GreatSchools',
    emoji: '📊',
    what: 'Composite rating 1–10 blending test scores, growth data, and equity metrics.',
    strengths: 'Easy to compare quickly across districts.',
    limits: 'Criticized for penalizing diverse schools. Higher income = higher score. Not the whole picture.',
    url: 'greatschools.org',
  },
  {
    name: 'Niche',
    emoji: '⭐',
    what: 'Combines test data with parent/student reviews, teacher surveys, and diversity stats.',
    strengths: 'Captures school culture and community vibe better than pure stats.',
    limits: 'Reviews can be gamed. Subjective and skewed toward vocal parents.',
    url: 'niche.com',
  },
];

const beyondRatings = [
  { emoji: '🚶', tip: 'Visit in person during school hours — watch how teachers interact with students in hallways.' },
  { emoji: '💬', tip: 'Find local Facebook parent groups (search "[City] Moms" or "[ISD] Parents") — raw, unfiltered opinions.' },
  { emoji: '📋', tip: 'Ask: What AP/IB courses are offered? What\’s the participation rate? What\’s the passing rate?' },
  { emoji: '🎨', tip: 'Look up the school\’s UIL participation — competitive arts, academics, and athletics all appear here.' },
  { emoji: '👩‍🏫', tip: 'Check teacher tenure data. High turnover often signals administrative or culture problems.' },
  { emoji: '🏫', tip: 'Drive the actual bus route or carpool path — pickup time and logistics matter daily.' },
];

export default function DFWSchoolResearchGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = familyPriorities.find(p => p.key === selected);

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏫</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>DFW School Research Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 16, margin: 0 }}>How to research schools beyond a rating number — and find the right ISD for your family.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>What matters most to your family?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {familyPriorities.map(p => (
              <button key={p.key} onClick={() => setSelected(p.key)}
                style={{ textAlign: 'left', padding: '14px 20px', borderRadius: 10, border: '2px solid', cursor: 'pointer',
                  borderColor: selected === p.key ? '#F5E642′ : '#E2E8F0',
                  backgroundColor: selected === p.key ? '#FEFCE8′ : '#F9FAFB',
                  color: '#0A1628', fontWeight: 600, fontSize: 15 }}>
                {p.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Top DFW ISDs for this priority:</div>
              {match.isds.map(isd => (
                <div key={isd} style={{ color: '#CBD5E1', padding: '6px 0', borderBottom: '1px solid #1E3A5F', fontSize: 15 }}>✅ {isd}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Understanding the rating platforms</h2>
          {ratingPlatforms.map(r => (
            <div key={r.name} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #F1F5F9′ }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>{r.emoji} {r.name}</div>
              <p style={{ color: '#334155', margin: '0 0 6px' }}>{r.what}</p>
              <p style={{ color: '#16A34A', margin: '0 0 4px', fontSize: 14 }}>✅ <strong>Best for:</strong> {r.strengths}</p>
              <p style={{ color: '#DC2626', margin: 0, fontSize: 14 }}>⚠️ <strong>Watch out:</strong> {r.limits}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Beyond the rating: how to actually research</h2>
          {beyondRatings.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{b.emoji}</span>
              <p style={{ color: '#334155', margin: 0, lineHeight: 1.6 }}>{b.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
