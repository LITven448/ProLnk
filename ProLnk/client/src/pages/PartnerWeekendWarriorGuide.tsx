import { useState } from 'react';

type TradeType = 'hvac' | 'plumbing' | 'electrical' | 'general' | 'landscaping' | 'roofing';

interface EarningsResult {
  monthlyLow: number;
  monthlyHigh: number;
  monthsToFullTime: number;
  weeklyJobs: number;
  notes: string[];
}

const HOURLY_RATES: Record<TradeType, { low: number; high: number; label: string }> = {
  hvac: { low: 85, high: 140, label: 'HVAC Technician' },
  plumbing: { low: 90, high: 150, label: 'Plumber' },
  electrical: { low: 80, high: 135, label: 'Electrician' },
  general: { low: 55, high: 90, label: 'General Contractor' },
  landscaping: { low: 45, high: 75, label: 'Landscaping / Lawn' },
  roofing: { low: 70, high: 120, label: 'Roofer' },
};

function calcEarnings(hoursPerWeek: number, trade: TradeType): EarningsResult {
  const rate = HOURLY_RATES[trade];
  const billable = hoursPerWeek * 0.75;
  const monthlyLow = Math.round(billable * rate.low * 4.3);
  const monthlyHigh = Math.round(billable * rate.high * 4.3);
  const fullTimeTarget = rate.high * 160;
  const monthsToFT = Math.ceil(fullTimeTarget / ((monthlyLow + monthlyHigh) / 2) * 12);
  const weeklyJobs = Math.round(billable / 2.5);
  const notes: string[] = [];
  if (hoursPerWeek <= 4) notes.push('4 hours/week is the sweet spot — two focused weekend jobs');
  if (hoursPerWeek >= 8) notes.push('8+ hours gives you full mini-business income without quitting your job');
  if (trade === 'hvac') notes.push('Storm season (spring/fall) creates massive surge demand — keep availability open');
  if (trade === 'plumbing') notes.push('Weekend emergency calls command 1.5-2x rates — high-value work');
  if (trade === 'electrical') notes.push('Panel upgrades and EV charger installs are high-ticket weekend projects');
  notes.push('Upload job photos immediately — AI-verified jobs build trust score faster');
  return { monthlyLow, monthlyHigh, monthsToFullTime: Math.min(monthsToFT, 24), weeklyJobs, notes };
}

export default function PartnerWeekendWarriorGuide() {
  const [hours, setHours] = useState('8');
  const [trade, setTrade] = useState<TradeType>('hvac');
  const result = calcEarnings(Number(hours) || 8, trade);

  const dayJobExamples = [
    { dayJob: 'HVAC tech at commercial firm', prolnk: 'Evenings + weekends for residential service calls', income: '$1,200-2,500/mo extra' },
    { dayJob: 'Plumber at construction company', prolnk: 'Weekend residential repairs and installs', income: '$1,500-3,000/mo extra' },
    { dayJob: 'Electrician (any employer)', prolnk: 'Weekend panel upgrades + EV charger installs', income: '$1,800-3,500/mo extra' },
    { dayJob: 'General contractor employee', prolnk: 'Weekend handyman and small project work', income: '$800-1,800/mo extra' },
    { dayJob: 'Landscaping crew lead', prolnk: 'Independent residential accounts on weekends', income: '$600-1,200/mo extra' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#0369a1', fontWeight: 600, letterSpacing: 1 }}>
          🔧 PARTNER RESOURCES
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: '#0f172a' }}>
          ProLnk Weekend Warrior Guide
        </h1>
        <p style={{ fontSize: 18, color: '#475569', marginBottom: 40, lineHeight: 1.7 }}>
          Part-Time Contractor, Full-Time Income Potential
        </p>

        <div style={{ background: '#e0f2fe', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #0284c7′ }}>
          <p style={{ fontSize: 16, color: '#0c4a6e', lineHeight: 1.7, margin: 0 }}>
            💡 <strong>The weekend warrior opportunity:</strong> 35% of ProLnk partners work their trade part-time (weekends, evenings, holidays). They earn $800-2,500/month extra — without quitting their day job. Here's exactly how to do it.
          </p>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>📅 How to Maximize Part-Time ProLnk Income</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📅', title: 'Weekend-Specific Availability', body: 'Set your availability to weekends only in your partner dashboard. Leads are dispatched to available partners first — setting precise availability ensures you get routed the right jobs without missing out or being overwhelmed.' },
            { icon: '📸', title: 'Photo Uploads = Trust Score', body: 'Take photos during every job, upload immediately. AI verifies job completion and builds your trust score faster. Partners with higher trust scores get priority routing. It takes 2 minutes and pays dividends for months.' },
            { icon: '⛈️', title: 'Storm Response = Peak Earnings', body: 'Weekends after DFW storms are peak earning time. Roof damage, flooding, fence repairs, HVAC failures. Keep your phone charged and notifications on. Storm weekends can generate 2-3x normal earnings in a single day.' },
            { icon: '⏱️', title: 'The 4-Hour Weekend Rule', body: '"The partners who earn the most on weekends are those who dedicate 4 focused hours — not fragmented." Two jobs done well beats four jobs rushed. Block the time, commit to it, and treat it like a second shift.' },
          ].map(item => (
            <div key={item.title} style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 8, fontSize: 16 }}>{item.title}</div>
                <div style={{ color: '#64748b', lineHeight: 1.7, fontSize: 15 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>🏗️ Day Job → ProLnk Income Combinations</h2>
        <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f1f5f9′ }}>
                {['Day Job', 'ProLnk Focus', 'Est. Extra Income'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', color: '#475569', fontSize: 13, fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dayJobExamples.map((ex, i) => (
                <tr key={ex.dayJob} style={{ borderTop: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                  <td style={{ padding: '14px 20px', color: '#0f172a', fontWeight: 600, fontSize: 14 }}>{ex.dayJob}</td>
                  <td style={{ padding: '14px 20px', color: '#475569', fontSize: 14 }}>{ex.prolnk}</td>
                  <td style={{ padding: '14px 20px', color: '#059669', fontWeight: 700, fontSize: 14 }}>{ex.income}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>💰 Tax Advantage of Part-Time Self-Employment</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🚗', title: 'Vehicle Mileage', desc: '67 cents/mile deduction in 2026. If you drive 300 miles/month for ProLnk jobs, that is $240/mo in deductions.' },
            { icon: '🔧', title: 'Tools & Equipment', desc: 'Tools purchased for your ProLnk work are deductible. New tool set, specialty equipment, safety gear.' },
            { icon: '📱', title: 'Phone & App Costs', desc: 'Portion of phone bill used for business (typically 50-80% if you use it for job coordination).' },
            { icon: '📚', title: 'Training & Licenses', desc: 'License renewal fees, continuing education, certifications — all deductible against self-employment income.' },
          ].map(item => (
            <div key={item.title} style={{ background: 'white', borderRadius: 10, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{item.title}</div>
              <div style={{ color: '#64748b', lineHeight: 1.6, fontSize: 13 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#f0fdf4', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#14532d', marginBottom: 12 }}>🚀 Growing to Full-Time</h3>
          <p style={{ color: '#166534', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>
            "Our most successful partners started part-time. When ProLnk income exceeds 60% of day job income, they make the switch. Average time to full-time: 12-18 months."
          </p>
          <p style={{ color: '#166534', lineHeight: 1.7, fontSize: 15, margin: 0 }}>
            The transition is gradual: start with weekends only → add 1-2 evening availability windows → as income builds, reduce day job hours → full independence when revenue is stable.
          </p>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>🧮 Part-Time Income Estimator</h2>
        <div style={{ background: 'white', borderRadius: 16, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ display: 'block', color: '#475569', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>
                Hours Available Per Week
              </label>
              <input
                type="number"
                value={hours}
                onChange={e => setHours(e.target.value)}
                min="2″
                max="30″
                style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 16px', color: '#0f172a', fontSize: 16, boxSizing: 'border-box' }}
                placeholder="8″
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#475569', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>
                Your Trade
              </label>
              <select
                value={trade}
                onChange={e => setTrade(e.target.value as TradeType)}
                style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 16px', color: '#0f172a', fontSize: 16, boxSizing: 'border-box' }}
              >
                <option value="hvac">HVAC Technician</option>
                <option value="plumbing">Plumber</option>
                <option value="electrical">Electrician</option>
                <option value="general">General Contractor</option>
                <option value="landscaping">Landscaping / Lawn</option>
                <option value="roofing">Roofer</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Monthly Low Est.', value: `$${result.monthlyLow.toLocaleString()}`, color: '#0284c7′ },
              { label: 'Monthly High Est.', value: `$${result.monthlyHigh.toLocaleString()}`, color: '#059669′ },
              { label: 'Jobs Per Week', value: `${result.weeklyJobs} jobs`, color: '#7c3aed' },
              { label: 'Months to Full-Time', value: `${result.monthsToFullTime} mo`, color: '#ea580c' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#f8fafc', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ color: '#64748b', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>PERSONALIZED TIPS</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {result.notes.map((note, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#0284c7', fontWeight: 700, flexShrink: 0 }}>→</span>
                  <span style={{ color: '#475569', fontSize: 14, lineHeight: 1.5 }}>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0c4a6e, #075985)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔧</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 12 }}>Ready to Start Earning on Weekends?</h3>
          <p style={{ color: '#bae6fd', marginBottom: 24, lineHeight: 1.6 }}>
            Join the ProLnk network as a weekend warrior. Set your own hours, work your existing trade, and build income on your schedule.
          </p>
          <a href="/waitlist/pro" style={{ display: 'inline-block', background: '#38bdf8', color: '#0c4a6e', fontWeight: 800, padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 16 }}>
            Join as a Partner
          </a>
        </div>

      </div>
    </div>
  );
}
