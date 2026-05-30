import { useState } from 'react';

const backgrounds = ['Real estate agent', 'Home inspector', 'Contractor/trades', 'Insurance agent', 'Financial advisor', 'Property manager', 'General networker', 'Other'];
const networkSizes = ['<25 contacts', '25-100 contacts', '100-300 contacts', '300+ contacts'];
const dfwAreas = ['Dallas proper', 'Fort Worth area', 'Plano/Frisco/McKinney', 'Arlington/Mansfield', 'Irving/Grand Prairie', 'Garland/Mesquite', 'Southlake/Keller', 'Other DFW suburb'];

const baseActions = [
  { icon: '👤', title: 'Complete Your Partner Profile', desc: 'Add photo, bio, and DFW service area — partners with complete profiles get 3x more referral trust.' },
  { icon: '📋', title: 'Review the Commission Structure', desc: 'Charter partners earn 60% of match fees + 4-level network overrides. Know your numbers before your first conversation.' },
  { icon: '🏡', title: 'Understand What Makes a Good Referral', desc: 'Ideal DFW homeowner: owns their home, 1+ service need in past 12mo, DFW metro area, responsive to follow-up.' },
  { icon: '📱', title: 'Download the Partner App', desc: 'Track referrals, earnings, and network activity in real time.' },
  { icon: '🗣️', title: 'Practice Your 30-Second Pitch', desc: '"I connect DFW homeowners with vetted service pros — you get quotes fast, I earn when jobs close."' },
  { icon: '🎯', title: 'Identify Your First 3 Prospects', desc: 'Think: who do you know that owns a DFW home AND has mentioned a repair/project in the last 6 months?' },
];

const bgActions: Record<string, string> = {
  'Real estate agent': 'Your buyers just closed — reach out within 30 days. New homeowners have immediate repair lists.',
  'Home inspector': 'Your inspection reports ARE your referral list. Every deficiency is a ProLnk opportunity.',
  'Contractor/trades': 'Refer overflow leads you cannot handle — earn on work you would have turned down anyway.',
  'Insurance agent': 'Claims conversations reveal repair needs. ProLnk pros become your trusted referral.',
  'Financial advisor': 'Home equity clients often need home health assessments. Position as value-add service.',
  'Property manager': 'Your landlord clients have ongoing maintenance needs — highest lifetime value partners.',
  'General networker': 'Focus on HOA communities and neighborhood Facebook groups — highest density of DFW homeowners.',
  'Other': 'Map your existing contacts to homeowners first — that is your fastest path to first match.',
};

export default function DFWProLnkPartnerDay1() {
  const [bg, setBg] = useState('');
  const [network, setNetwork] = useState('');
  const [area, setArea] = useState('');
  const [generated, setGenerated] = useState(false);

  const ready = bg && network && area;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: 'white', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 8 }}>🤝 PROLNK PARTNER SYSTEM</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Day 1 Partner Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Everything to do in your first 24 hours as a new DFW ProLnk partner. Answer 3 questions for a personalized action plan.</p>
        </div>

        <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Your background?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {backgrounds.map(b => (
              <button key={b} onClick={() => setBg(b)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid',
                  borderColor: bg === b ? '#F5E642' : '#1e3a5f',
                  background: bg === b ? 'rgba(245,230,66,0.12)' : 'transparent',
                  color: bg === b ? '#F5E642' : '#94a3b8', cursor: 'pointer', fontSize: 13, textAlign: 'left' }}>
                {b}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Your current DFW contact network size?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {networkSizes.map(n => (
              <button key={n} onClick={() => setNetwork(n)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid',
                  borderColor: network === n ? '#F5E642' : '#1e3a5f',
                  background: network === n ? 'rgba(245,230,66,0.12)' : 'transparent',
                  color: network === n ? '#F5E642' : '#94a3b8', cursor: 'pointer', fontSize: 13 }}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Your primary DFW area?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {dfwAreas.map(a => (
              <button key={a} onClick={() => setArea(a)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid',
                  borderColor: area === a ? '#F5E642' : '#1e3a5f',
                  background: area === a ? 'rgba(245,230,66,0.12)' : 'transparent',
                  color: area === a ? '#F5E642' : '#94a3b8', cursor: 'pointer', fontSize: 13 }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => setGenerated(true)} disabled={!ready}
          style={{ width: '100%', padding: '16px', background: ready ? '#F5E642' : '#1e3a5f',
            color: ready ? '#0A1628' : '#4a6080', border: 'none', borderRadius: 12,
            fontWeight: 700, fontSize: 16, cursor: ready ? 'pointer' : 'not-allowed' }}>
          {ready ? 'Generate My Day 1 Plan →' : 'Answer all 3 questions to continue'}
        </button>

        {generated && (
          <div style={{ marginTop: 24 }}>
            <div style={{ background: '#0f1f3a', borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🌟 Your Personalized Day 1 Plan — {area}</div>
              <div style={{ background: 'rgba(245,230,66,0.1)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#F5E642' }}>
                💡 {bgActions[bg] || bgActions['Other']}
              </div>
              {baseActions.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{a.title}</div>
                    <div style={{ fontSize: 13, color: '#94a3b8' }}>{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🎯 Your Day 1 Target</div>
              <div style={{ fontSize: 14, color: '#cbd5e1' }}>
                With a {network} network in {area}, aim to identify <strong style={{ color: 'white' }}>3 homeowner prospects</strong> today.
                Even one referral in week 1 puts you ahead of 80% of new partners.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
