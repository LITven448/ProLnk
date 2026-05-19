import { useState } from 'react';

const TRADES = [
  'Plumber', 'Electrician', 'HVAC Technician', 'Roofer',
  'General Contractor', 'Handyman', 'Painter', 'Landscaper',
];

const BASE_SCHEDULE = [
  { time: '7:00–7:30 AM', label: 'Morning Routine', emoji: '🌅', tasks: [
    'Check ProLnk dashboard for new leads',
    'Accept leads in today’s service area',
    'Review any storm/weather alerts',
    'Upload photos from yesterday if not done',
  ]},
  { time: 'All Day', label: 'On Job Sites', emoji: '🔧', tasks: [
    'Upload photos DURING or immediately AFTER each job',
    'Note any upsell opportunities for the homeowner',
    'Capture before AND after photos for every job',
    'Log job start/end times in dashboard',
  ]},
  { time: '5:30–5:45 PM', label: 'Evening Wrap', emoji: '🌇', tasks: [
    'Confirm all leads accepted for tomorrow',
    'Review any new dispatches',
    'Send follow-up message to today’s homeowners',
    'Check for new recruits' activity in your network',
  ]},
];

export default function PartnerDailyPlannerGuide() {
  const [trade, setTrade] = useState('');
  const [startHour, setStartHour] = useState('7');
  const [endHour, setEndHour] = useState('17');
  const [generated, setGenerated] = useState(false);

  function handleGenerate() {
    if (trade) setGenerated(true);
  }

  const jobHours = Number(endHour) - Number(startHour) - 0.5;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#6366f1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ProLnk Partner Playbook
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 16px', color: '#0f172a' }}>
          The Ideal ProLnk Partner Daily Schedule
        </h1>
        <p style={{ fontSize: 18, color: '#64748b', maxWidth: 620, lineHeight: 1.7, margin: '0 0 48px' }}>
          Maximize Every Hour
        </p>

        {/* Key insight */}
        <div style={{ background: '#312e81', borderRadius: 16, padding: 28, marginBottom: 40, color: '#e0e7ff' }}>
          <div style={{ fontSize: 22, marginBottom: 12 }}>💡</div>
          <p style={{ margin: 0, lineHeight: 1.7, fontSize: 16 }}>
            "90% of your ProLnk income is generated in 10% of your time — the time you're on a job site with your camera out. Everything else is amplification."
          </p>
        </div>

        {/* Daily schedule */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 24px', color: '#0f172a' }}>📅 Daily Routine</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {BASE_SCHEDULE.map((block, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 24 }}>{block.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 16 }}>{block.label}</div>
                    <div style={{ color: '#6366f1', fontSize: 13, fontWeight: 600 }}>{block.time}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {block.tasks.map(t => (
                    <div key={t} style={{ display: 'flex', gap: 10, color: '#475569', fontSize: 15, lineHeight: 1.5 }}>
                      <span style={{ color: '#a5b4fc', flexShrink: 0 }}>→</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly tasks */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px', color: '#0f172a' }}>📆 Weekly Tasks (1 hour)</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              'Review Photo Detection Rate — adjust what you’re photographing if below 12%',
              'Send one recruiting message to a qualified prospect',
              'Post one before/after photo on social media',
              'Add 5 homes to your origination vault',
            ].map(t => (
              <div key={t} style={{ display: 'flex', gap: 12, color: '#475569', fontSize: 15, alignItems: 'flex-start' }}>
                <span style={{ color: '#6366f1', flexShrink: 0, fontWeight: 700 }}>•</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly tasks */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginBottom: 40, boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px', color: '#0f172a' }}>🗓️ Monthly Tasks (2 hours)</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              'Review income statements across all 5 income streams',
              'Set goals for next month: photos, recruits, origination homes',
              'Schedule coaching call with any inactive recruits',
            ].map(t => (
              <div key={t} style={{ display: 'flex', gap: 12, color: '#475569', fontSize: 15, alignItems: 'flex-start' }}>
                <span style={{ color: '#6366f1', flexShrink: 0, fontWeight: 700 }}>•</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Builder */}
        <div style={{ background: '#f1f5f9', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', color: '#0f172a' }}>🛠️ Build Your Custom Schedule</h2>
          <p style={{ color: '#64748b', margin: '0 0 24px', fontSize: 15 }}>Enter your working hours and trade to get a personalized daily ProLnk plan.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Trade</label>
              <select
                value={trade}
                onChange={e => { setTrade(e.target.value); setGenerated(false); }}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontSize: 15, color: '#0f172a' }}
              >
                <option value="">Select trade...</option>
                {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Start Hour</label>
              <select
                value={startHour}
                onChange={e => { setStartHour(e.target.value); setGenerated(false); }}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontSize: 15, color: '#0f172a' }}
              >
                {['6','7','8','9'].map(h => <option key={h} value={h}>{h}:00 AM</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 6 }}>End Hour</label>
              <select
                value={endHour}
                onChange={e => { setEndHour(e.target.value); setGenerated(false); }}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontSize: 15, color: '#0f172a' }}
              >
                {['14','15','16','17','18','19'].map(h => <option key={h} value={h}>{Number(h) > 12 ? `${Number(h)-12}:00 PM` : `${h}:00 PM`}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!trade}
            style={{
              background: trade ? '#6366f1' : '#cbd5e1', color: '#fff',
              border: 'none', borderRadius: 10, padding: '12px 28px',
              fontSize: 15, fontWeight: 700, cursor: trade ? 'pointer' : 'not-allowed',
              marginBottom: generated ? 24 : 0,
            }}
          >
            Generate My Schedule
          </button>

          {generated && (
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#312e81', fontSize: 17, marginBottom: 16 }}>
                Your Custom ProLnk Schedule — {trade}
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#475569' }}>🌅 Morning dashboard check</span>
                  <span style={{ color: '#6366f1', fontWeight: 600 }}>{startHour}:00–{startHour}:30 AM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#475569' }}>🔧 On-site jobs + photo uploads</span>
                  <span style={{ color: '#6366f1', fontWeight: 600' }}>{startHour}:30 AM – {Number(endHour) > 12 ? `${Number(endHour)-12}:00 PM` : `${endHour}:00`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                  <span style={{ color: '#475569' }}>🌇 Evening wrap-up</span>
                  <span style={{ color: '#6366f1', fontWeight: 600 }}>{Number(endHour) > 12 ? `${Number(endHour)-12}:00` : endHour}–{Number(endHour) > 12 ? `${Number(endHour)-11}:15 PM` : `${Number(endHour)+1}:15`}</span>
                </div>
              </div>
              <div style={{ marginTop: 16, background: '#f8f7ff', borderRadius: 8, padding: 14, color: '#4338ca', fontSize: 14 }}>
                💡 At {jobHours} hours of field time per day, a {trade.toLowerCase()} averaging 3 jobs/day could generate <strong>$450–900/month</strong> in ProLnk commissions at Tier 2.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
