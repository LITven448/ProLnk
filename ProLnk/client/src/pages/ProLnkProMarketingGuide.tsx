import { useState } from 'react';

export default function ProLnkProMarketingGuide() {
  const [profileLevel, setProfileLevel] = useState(40);

  const getStatus = (score: number) => {
    if (score < 30) return { label: 'Bare Minimum', color: '#FF4444', next: 'Add a professional photo — pros with photos get 3x more matches' };
    if (score < 50) return { label: 'Getting Started', color: '#FF8C00', next: 'List all your services (every service = more matches in the lead feed)' };
    if (score < 70) return { label: 'Competitive', color: '#F5E642', next: 'Set your service radius precisely — too large = diluted, too tight = missed jobs' };
    if (score < 90) return { label: 'Strong Profile', color: '#44BB44', next: 'Ask your next 3 customers for a ProLnk review within 1 hour of job completion' };
    return { label: 'Elite Profile', color: '#00DDAA', next: 'You are in top 10% — respond to matches within 15 min to maintain status' };
  };

  const status = getStatus(profileLevel);

  const tactics = [
    { icon: '📸', title: 'Photo First', desc: 'Professional headshot or truck photo. Blurry selfies lose matches.' },
    { icon: '⚡', title: '30-Min Response', desc: 'Pros who respond in <30 min win 68% of matches. Set phone notifications.' },
    { icon: '⭐', title: 'Ask For Reviews Fast', desc: 'Ask the moment the job is done: "Mind leaving a quick ProLnk review?"' },
    { icon: '🏠', title: 'Win Via The Vault', desc: 'Homeowners with their home in the Vault become repeat clients for life.' },
    { icon: '📍', title: 'Tight Service Radius', desc: 'Set radius to where you actually want to work — quality beats volume.' },
    { icon: '🔧', title: 'List Every Service', desc: 'Each service sub-type is a separate matching category. List them all.' },
  ];

  const profileItems = [
    { label: 'Profile photo', points: 15, done: profileLevel >= 15 },
    { label: 'All services listed', points: 20, done: profileLevel >= 35 },
    { label: 'Service area set', points: 15, done: profileLevel >= 50 },
    { label: 'Bio / about section', points: 10, done: profileLevel >= 60 },
    { label: 'First review earned', points: 15, done: profileLevel >= 75 },
    { label: '5+ reviews', points: 10, done: profileLevel >= 85 },
    { label: 'Response rate >90%', points: 15, done: profileLevel >= 100 },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>📣</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Pro Marketing Guide</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>Win More Matches · Build Reputation on ProLnk</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 8 }}>
            PROFILE COMPLETION: <span style={{ color: status.color, fontWeight: 700 }}>{profileLevel}% — {status.label}</span>
          </label>
          <div style={{ background: '#1A2E4A', borderRadius: 8, height: 12, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ background: status.color, height: '100%', width: `${profileLevel}%`, transition: 'width 0.3s' }} />
          </div>
          <input type="range" min={0} max={100} value={profileLevel}
            onChange={e => setProfileLevel(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
          <div style={{ background: '#1A2E4A', borderRadius: 8, padding: '10px 14px', marginTop: 12 }}>
            <span style={{ color: '#F5E642', fontSize: 13 }}>Next: {status.next}</span>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 14px', fontSize: 14 }}>Profile Checklist</h3>
          {profileItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0',
              borderBottom: i < profileItems.length - 1 ? '1px solid #1A2E4A' : 'none' }}>
              <span style={{ fontSize: 16 }}>{item.done ? '✅' : '⬜'}</span>
              <span style={{ flex: 1, color: item.done ? '#ccc' : '#8899AA', fontSize: 13 }}>{item.label}</span>
              <span style={{ color: '#F5E642', fontSize: 12 }}>+{item.points}%</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {tactics.map((t, i) => (
            <div key={i} style={{ background: '#0F2040', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{t.title}</div>
              <div style={{ color: '#8899AA', fontSize: 12, lineHeight: 1.4 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
