import { useState } from 'react';

const steps = [
  { emoji: '🏠', title: 'Homeowner Submits', desc: 'Trade type, location, urgency (emergency/same-day/scheduled), budget range, and job description' },
  { emoji: '🤖', title: 'AI Analyzes', desc: 'Weights trade match, geo proximity, pro rating, availability, past job similarity, and response rate' },
  { emoji: '🎯', title: '3 Partners Matched', desc: 'Top 3 qualified partners notified simultaneously — never more, never fewer' },
  { emoji: '⚡', title: 'Speed + Quality Win', desc: 'First qualified partner to accept gets the job. Rating and match score break ties' },
  { emoji: '✅', title: 'Homeowner Confirms', desc: 'Reviews match, confirms booking, job enters active status in both dashboards' },
];

const jobTypes = ['Emergency plumbing', 'HVAC tune-up', 'Roof inspection', 'Electrical panel upgrade'];
const urgencies = ['Emergency (2hrs)', 'Same-day', 'This week', 'Flexible'];

export default function ProLnkMatchingAlgorithm() {
  const [jobType, setJobType] = useState(0);
  const [urgency, setUrgency] = useState(0);

  const responseTime = urgency === 0 ? '< 15 min' : urgency === 1 ? '< 2 hrs' : urgency === 2 ? '< 24 hrs' : '< 48 hrs';
  const priority = urgency === 0 ? 'Rating + proximity only — speed is mandatory' : urgency === 1 ? 'Availability + proximity + rating' : 'Rating + price + fit score equally weighted';
  const advantage = urgency < 2 ? 'Open marketplaces can\’t guarantee emergency response. ProLnk guarantees 3 vetted partners in minutes.' : 'Hand-picked partners, not a 200-bid race to the bottom.';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>SMART MATCHING</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, margin: '0 0 16px' }}>🤖 How the Algorithm Works</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 580, margin: '0 auto' }}>
            Not a lead dump. Not a bidding war. Precision matching — 3 vetted partners, every time.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 48, position: 'relative' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: '20px 24px', marginBottom: 8 }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, minWidth: 32 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 22 }}>{s.emoji}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>{s.title}</span>
                </div>
                <div style={{ color: '#94a3b8′ }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, marginBottom: 20 }}>🔍 Match Simulator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Job Type</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {jobTypes.map((j, i) => (
                  <button key={i} onClick={() => setJobType(i)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 13,
                      background: jobType === i ? '#F5E642′ : '#1e3a5f', color: jobType === i ? '#0A1628' : '#fff' }}>{j}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Urgency</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {urgencies.map((u, i) => (
                  <button key={i} onClick={() => setUrgency(i)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 13,
                      background: urgency === i ? '#F5E642′ : '#1e3a5f', color: urgency === i ? '#0A1628' : '#fff' }}>{u}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, display: 'grid', gap: 12 }}>
            <div><span style={{ color: '#64748b', fontSize: 13 }}>Expected Response: </span><span style={{ color: '#22c55e', fontWeight: 700 }}>{responseTime}</span></div>
            <div><span style={{ color: '#64748b', fontSize: 13 }}>Priority Weighting: </span><span style={{ color: '#fff' }}>{priority}</span></div>
            <div><span style={{ color: '#64748b', fontSize: 13 }}>Why ProLnk Wins: </span><span style={{ color: '#F5E642′ }}>{advantage}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
