import { useState } from 'react';

const PLATFORMS = ['Facebook', 'LinkedIn', 'Nextdoor', 'Instagram', 'TikTok'];
const TIME_OPTIONS = ['2 hrs/week', '5 hrs/week', '10 hrs/week', '15+ hrs/week'];

const PLATFORM_INFO: Record<string, { icon: string; audience: string; best: string; tip: string }> = {
  Facebook: { icon: '📘', audience: 'Homeowners 35–65', best: 'Local groups, before/after photos, testimonials', tip: 'Post in neighborhood groups — always add value first, pitch second.' },
  LinkedIn: { icon: '💼', audience: 'Trade professionals, contractors', best: 'Career opportunities, income transparency, ProLnk story', tip: 'Recruits pros who want a better income model. Lead with income math.' },
  Nextdoor: { icon: '🏘️', audience: 'Hyperlocal homeowners', best: 'Service recommendations, local presence posts', tip: 'Be a neighbor first. Recommend other pros before promoting yourself.' },
  Instagram: { icon: '📸', audience: 'Homeowners 25–45', best: 'Reels of job sites, behind-the-scenes, income milestones', tip: 'Visual wins. Show real jobs, real results, real earnings (compliant).' },
  TikTok: { icon: '🎵', audience: 'Homeowners + young tradespeople', best: 'Day-in-the-life, quick tips, ProLnk explainers', tip: 'Authenticity > polish. 60-second "how I earn 5 ways from one job" crushes.' },
};

const SCHEDULE: Record<string, Record<string, string[]>> = {
  '2 hrs/week': {
    Facebook: ['2x/week: local group value posts', '1 testimonial repost/week'],
    LinkedIn: ['1x/week: income transparency post'],
    Nextdoor: ['1x/week: neighborhood recommendation'],
    Instagram: ['1x/week: photo post'],
    TikTok: ['1x/week: quick tip video'],
  },
  '5 hrs/week': {
    Facebook: ['4x/week: group posts + 1 video', 'Daily story'],
    LinkedIn: ['3x/week: career + income posts', '1 article/month'],
    Nextdoor: ['3x/week: recommendations + local news'],
    Instagram: ['3x/week: mix of Reels + photos'],
    TikTok: ['3x/week: varied content formats'],
  },
  '10 hrs/week': {
    Facebook: ['Daily posts + live Q&A weekly', 'Run a local homeowner group'],
    LinkedIn: ['Daily posts', 'Comment on 10 posts/day', 'DM new connections'],
    Nextdoor: ['Daily', 'Become neighborhood expert'],
    Instagram: ['5x/week: Reels priority', 'Stories daily'],
    TikTok: ['5x/week', 'Engage in comments aggressively'],
  },
  '15+ hrs/week': {
    Facebook: ['Full content machine: lives, groups, ads'],
    LinkedIn: ['Build a recruitment funnel with DMs + articles'],
    Nextdoor: ['Neighborhood anchor strategy across 5+ neighborhoods'],
    Instagram: ['Full Reels + collab strategy'],
    TikTok: ['Series content + duets with trade influencers'],
  },
};

const CONTENT_CALENDAR = [
  { day: 1, type: 'Value post', platform: 'Facebook', example: '"3 questions every homeowner should ask before hiring an HVAC tech"' },
  { day: 3, type: 'Income transparency', platform: 'LinkedIn', example: '"Here is exactly how I earned $1,847 last Tuesday from one job referral"' },
  { day: 5, type: 'Neighbor rec', platform: 'Nextdoor', example: '"Looking for a great plumber in Frisco? Here is who I trust and why"' },
  { day: 8, type: 'Behind the scenes', platform: 'Instagram', example: 'Photo of a job site walkthrough with caption on ProLnk process' },
  { day: 10, type: 'Quick tip', platform: 'TikTok', example: '"5 income streams from one home service job — here is how it works"' },
  { day: 14, type: 'Testimonial', platform: 'Facebook', example: 'Screenshot or quote from a pro you recruited hitting their first milestone' },
  { day: 17, type: 'Recruiting post', platform: 'LinkedIn', example: '"Are you a licensed HVAC tech in DFW? This is worth 3 minutes of your time"' },
  { day: 20, type: 'Local story', platform: 'Nextdoor', example: '"What I learned helping 12 McKinney homeowners find great contractors this year"' },
  { day: 23, type: 'Income milestone', platform: 'Instagram', example: 'Celebrate a network income milestone (compliant — no income guarantees)' },
  { day: 27, type: 'Explainer', platform: 'TikTok', example: '"ProLnk vs traditional referral fees — the math surprised me"' },
  { day: 30, type: 'Month recap', platform: 'Facebook', example: 'Honest recap of your ProLnk month — what worked, what you learned' },
];

export default function PartnerSocialMediaPlaybook() {
  const [platform, setPlatform] = useState('Facebook');
  const [time, setTime] = useState('5 hrs/week');

  const info = PLATFORM_INFO[platform];
  const schedule = SCHEDULE[time]?.[platform] || [];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📱</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Social Media Playbook</h1>
          <p style={{ fontSize: 18, color: '#4B5563', maxWidth: 600, margin: '0 auto' }}>
            Platform-by-platform strategy to grow your ProLnk partner network online.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 32 }}>
          {PLATFORMS.map(p => (
            <button key={p} onClick={() => setPlatform(p)}
              style={{ padding: '12px 8px', borderRadius: 10, border: '2px solid',
                borderColor: platform === p ? '#0A1628' : '#E5E7EB',
                background: platform === p ? '#0A1628' : '#fff',
                color: platform === p ? '#F5E642' : '#374151',
                fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              {PLATFORM_INFO[p].icon} {p}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{info.icon} {platform} Strategy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div style={{ background: '#F3F4F6', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', marginBottom: 4 }}>AUDIENCE</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{info.audience}</div>
            </div>
            <div style={{ background: '#F3F4F6', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', marginBottom: 4 }}>BEST CONTENT</div>
              <div style={{ fontSize: 14 }}>{info.best}</div>
            </div>
          </div>
          <div style={{ background: '#FEF9C3', borderRadius: 10, padding: 14, marginTop: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#92400E', marginBottom: 4 }}>💡 PRO TIP</div>
            <div style={{ fontSize: 14 }}>{info.tip}</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⏱️ Posting Schedule Generator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Time Available Per Week</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TIME_OPTIONS.map(t => (
                <button key={t} onClick={() => setTime(t)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid',
                    borderColor: time === t ? '#F5E642' : '#E5E7EB',
                    background: time === t ? '#F5E642' : '#fff',
                    fontWeight: time === t ? 700 : 400, fontSize: 13, cursor: 'pointer' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#F9FAFB', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#6B7280' }}>
              RECOMMENDED FOR {platform.toUpperCase()} @ {time.toUpperCase()}
            </div>
            {schedule.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F5E642', marginTop: 6, flexShrink: 0 }} />
                <div style={{ fontSize: 14 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>📅 30-Day Content Calendar</h2>
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>Sample content rotation across all platforms</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CONTENT_CALENDAR.map(item => (
              <div key={item.day} style={{ display: 'grid', gridTemplateColumns: '40px 120px 100px 1fr', gap: 12,
                alignItems: 'center', padding: '10px 14px', background: '#F9FAFB', borderRadius: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#0A1628' }}>Day {item.day}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7280' }}>{item.type}</div>
                <div style={{ fontSize: 12, background: '#E5E7EB', borderRadius: 6, padding: '2px 8px', textAlign: 'center' }}>{item.platform}</div>
                <div style={{ fontSize: 12, color: '#374151' }}>{item.example}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#FEF2F2', borderRadius: 16, padding: 24, border: '1px solid #FECACA' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#B91C1C', marginBottom: 12 }}>🚫 What NOT to Post (Compliance)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Specific income guarantees ("You will make $10K/month")',
              'Unverified testimonials presented as typical results',
              '"Unlimited income" or "financial freedom" without context',
              'Anything that sounds like pyramid scheme promotion',
              'Photos of cash or checks — it looks predatory, not professional',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: '#B91C1C', fontWeight: 700 }}>✗</span>
                <span style={{ fontSize: 14, color: '#374151' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
