import { useState } from 'react';

const userTypes = ['homeowner', 'partner', 'platform'] as const;
type UserType = typeof userTypes[number];

const success: Record<UserType, { emoji: string; title: string; definition: string[]; measure: string[]; obstacles: string[] }> = {
  homeowner: {
    emoji: '🏡',
    title: 'Success for a ProLnk Homeowner',
    definition: [
      '⚡ Receive 3 qualified quotes within 24 hours of posting a job',
      '✅ All matched contractors are licensed, insured, and vetted',
      '💰 Fair pricing — within 15% of DFW market rate for your job type',
      '⭐ Work completed on time and to the standard described',
      '📞 Responsive contractor communication start to finish',
    ],
    measure: [
      '📊 Time-to-first-quote: target < 4 hours',
      '⭐ Job satisfaction rating you submit after completion',
      '🔁 Whether you use ProLnk again for your next project',
      '💬 Would you refer ProLnk to a neighbor? (your NPS score)',
    ],
    obstacles: [
      '📋 Vague job description → fewer or wrong matches',
      '📞 Slow response → contractor takes another job',
      '🏘️ Rural or specialty trade → fewer pros in your area',
    ],
  },
  partner: {
    emoji: '💼',
    title: 'Success for a ProLnk Partner',
    definition: [
      '💰 Consistent match income — 12–70% commission on every accepted job',
      '📈 Growing network income from your directly recruited pros',
      '🏆 Charter status maintained — 25 active referrals, $149/mo locked',
      '🔄 Passive income from 4-level cascade — earning while not working',
      '🌍 Expansion beyond DFW into next 3 target markets',
    ],
    measure: [
      '💵 Monthly gross commission vs. your monthly target',
      '🌱 Number of active referrals in your direct Level 1 network',
      '📊 Network depth — how many active Level 2–4 pros you have',
      '🔁 Retention rate of pros you recruited (target > 80% 6-month)',
    ],
    obstacles: [
      '🎯 Recruiting uncommitted pros who churn in month 1',
      '📣 Poor pitch — not showing real earnings data builds skepticism',
      '🚫 Recruiting in oversaturated trade categories in your market',
    ],
  },
  platform: {
    emoji: '🏗️',
    title: 'Success for the ProLnk Platform',
    definition: [
      '📍 DFW home services market: better quality, faster service, fairer prices',
      '🤝 Every match is a verified professional + a homeowner who needed them',
      '🔄 Network effect: more pros → better matches → more homeowners → more pros',
      '🌱 Home Health Vault: 50M+ homes with accurate, usable service data',
      '🏆 ProLnk becomes the default first call for DFW home repairs by 2027',
    ],
    measure: [
      '📊 Match acceptance rate: target > 75% of homeowner requests filled',
      '⭐ Platform NPS: target > 60 (industry benchmark: 32)',
      '💰 Gross Marketplace Volume (GMV): jobs completed through the platform',
      '🔁 Annual homeowner repeat rate: target > 50%',
    ],
    obstacles: [
      '🔧 Contractor quality variance — one bad pro damages trust platform-wide',
      '📉 Cold start in new markets — chicken-and-egg supply/demand problem',
      '🚫 Circumvention — pros and homeowners transacting off-platform',
    ],
  },
};

export default function ProLnkSuccessDefinition() {
  const [selected, setSelected] = useState<UserType>('homeowner');
  const [tab, setTab] = useState<'definition' | 'measure' | 'obstacles'>('definition');
  const s = success[selected];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏆</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: 0 }}>What Success Looks Like</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>ProLnk success is specific — select your role to see what it means for you</p>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
          {userTypes.map(u => (
            <button key={u} onClick={() => setSelected(u)} style={{
              padding: '8px 20px', borderRadius: 24, border: '2px solid',
              borderColor: selected === u ? '#F5E642' : '#334155',
              background: selected === u ? '#F5E642' : 'transparent',
              color: selected === u ? '#0A1628' : '#94A3B8',
              fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize', fontSize: 14,
            }}>{u}</button>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 16, padding: 28, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 28 }}>{s.emoji}</span>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'white', margin: 0 }}>{s.title}</h2>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {(['definition', 'measure', 'obstacles'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: tab === t ? '#F5E642' : '#1E3A5F', color: tab === t ? '#0A1628' : '#94A3B8',
              }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {s[tab].map((item, i) => (
              <li key={i} style={{ padding: '10px 0', borderBottom: i < s[tab].length - 1 ? '1px solid #1E3A5F' : 'none', color: '#CBD5E1', fontSize: 14 }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '16px 20px' }}>
          <p style={{ color: '#0A1628', fontSize: 13, margin: 0, fontWeight: 600 }}>
            🎯 Success at ProLnk is measurable, not vague. If you can't track it, it doesn't count.
          </p>
        </div>
      </div>
    </div>
  );
}
