import { useState } from 'react';

const prospects = ['licensed contractor', 'sales professional', 'homeowner', 'investor'] as const;
type Prospect = typeof prospects[number];

const situations = ['just exploring', 'ready to join', 'on the fence'] as const;
type SitType = typeof situations[number];

const pitches: Record<Prospect, Record<SitType, { reason: string; gain: string[]; loss: string[]; next: string }>> = {
  'licensed contractor': {
    'just exploring': {
      reason: 'Explore now — Charter closes at 500 and you\’re in a window most pros miss',
      gain: ['🔒 $149/mo subscription locked forever at Charter rate', '💰 25 referral slots at 72% commission keep rate', '🏆 Founding member status — priority lead routing in DFW'],
      loss: ['📈 Every week you wait, another contractor in your trade claims Charter', '⬆️ Next tier is $199/mo — $50/mo more for the same access'],
      next: 'Browse the lead feed at prolnk.io — no commitment required to see what\’s available',
    },
    'ready to join': {
      reason: 'You\’re exactly who Charter was built for — lock your rate before it\’s gone',
      gain: ['⚡ Claim Charter in under 5 minutes — app, trade, service area', '🔧 Lead delivery starts within 48 hours of verification', '💳 No payment until your first match — zero risk to start'],
      loss: ['⏳ 500-application limit — at current signup rate, closes in < 30 days', '🚫 After Charter: no founding benefits, no locked rate, no referral head start'],
      next: 'Apply at prolnk.io/pro — 3 fields, 4 minutes, done',
    },
    'on the fence': {
      reason: 'The fence is expensive — Charter won\’t exist in 6 months',
      gain: ['📋 Apply with zero commitment — explore the platform before you decide', '💬 Talk to a current Charter contractor: partner@prolnk.io', '🔄 Cancel anytime in the first 30 days — no questions asked'],
      loss: ['💸 Founding rate gone after 500 apps — next tier is $199/mo minimum', '📉 Contractor slots in your trade are finite — your area fills up'],
      next: 'Start the application — you can pause at any step and come back',
    },
  },
  'sales professional': {
    'just exploring': {
      reason: 'Network income on a platform with real demand is the rare combination',
      gain: ['🌐 4-level commission cascade — earn from pros you recruit and their recruits', '📊 Real dashboard with real earnings — show prospects your numbers', '🏆 Charter partners get access to all 5 income streams from day one'],
      loss: ['📉 More Charter slots claimed daily — your referral advantage shrinks', '🔒 Rate lock expires with the tier — all future partners pay more'],
      next: 'Download the income structure at prolnk.io/partners and model your market',
    },
    'ready to join': {
      reason: 'You\’ve done the math — now claim your spot before someone in your network beats you to it',
      gain: ['🚀 Start building your Level 1 network immediately after approval', '📈 Commission tracking live from first referral — no black-box payouts', '🎯 Marketing materials provided — you don\’t have to build from scratch'],
      loss: ['⏳ 475 of 500 Charter slots spoken for — this is not urgency theater', '🤝 The pros you know are your best recruits — someone else may get to them first'],
      next: 'Apply at prolnk.io/partner — 5 minutes to Charter status',
    },
    'on the fence': {
      reason: 'The risk is $149 — the opportunity is a 4-level network income system',
      gain: ['🔄 30-day money-back if you don\’t see value — no gotchas', '💬 Partner support team walks you through your first 5 recruits', '📊 Real earnings data from current partners available on request'],
      loss: ['🏁 Charter is a founding moment — you can\’t recreate it later', '📅 Prices increase at each tier — waiting costs real money long-term'],
      next: 'Email partner@prolnk.io with "Fence" in the subject — we\’ll answer every question',
    },
  },
  'homeowner': {
    'just exploring': {
      reason: 'Free to explore — ProLnk never charges homeowners',
      gain: ['🏠 Post a job in 2 minutes — no account required to browse', '⚡ First quote typically within 4 hours of posting', '✅ All matched pros verified, licensed, and insured in Texas'],
      loss: ['📅 Unvetted pros fill the gap while you wait — quality isn\’t guaranteed', '💰 Homeowners who wait pay 20–35% more on average for rush jobs'],
      next: 'Post your first job free at prolnk.io — see who\’s available in your zip code',
    },
    'ready to join': {
      reason: 'You already know you need it — let\’s get you matched today',
      gain: ['📲 Post now, quotes by tonight — DFW contractors check leads hourly', '🔒 Your address and contact info encrypted — never sold to advertisers', '⭐ Rate the pro after — your review helps the whole community'],
      loss: ['🕐 Every day delayed is a day the job sits undone', '🔧 Texas summers are brutal — HVAC, roofing, and plumbing wait for no one'],
      next: 'Post your job at prolnk.io — it takes less time than calling 3 contractors',
    },
    'on the fence': {
      reason: 'Free for homeowners — there\’s no financial risk to trying it once',
      gain: ['💬 Read reviews from real DFW homeowners before committing', '🚫 Decline any quote that doesn\’t feel right — zero obligation', '📞 ProLnk support available if anything goes wrong'],
      loss: ['⚠️ DIY platforms require you to vet pros yourself — ProLnk does it for you', '⏳ Good contractors book up fast — waiting shrinks your options'],
      next: 'Try it risk-free at prolnk.io — post one job, see what comes back',
    },
  },
  'investor': {
    'just exploring': {
      reason: 'The seed round is moving — data room is open but the window is short',
      gain: ['📊 ProLnk unit economics: 85% margin at 500 pros, 10,000 pro capacity', '🏆 Home Health Vault: structural data on 50M+ US homes — standalone asset', '🌐 Network income creates retention that SaaS can\’t match'],
      loss: ['📅 Round closes Q3 2026 — early-access terms are not available post-close', '🏁 Lead investor anchor in negotiation — available now, not after lead closes'],
      next: 'Request the data room: invest@prolnk.io — deck and financials returned same day',
    },
    'ready to join': {
      reason: 'You\’ve reviewed the numbers — let\’s talk structure and close',
      gain: ['⚡ Term sheet drafted within 48 hours of verbal commitment', '📋 Founders available for extended diligence call this week', '💼 Co-investor rights available at seed terms — ask about pro-rata'],
      loss: ['🏁 Lead investor slot filled — follow-on terms are set by lead', '📅 Delay risks missing DFW launch window data — most valuable early metric'],
      next: 'Email invest@prolnk.io with "Committed" in subject — we move fast',
    },
    'on the fence': {
      reason: 'The marketplace model is proven — this is a timing and execution bet',
      gain: ['📞 Reference calls available: current Charter partners, early homeowners', '🔍 Full cap table and use of funds available under NDA', '📊 Monthly investor updates from day one — no black boxes'],
      loss: ['🌱 Seed valuations increase post-launch — entering now captures the most upside', '🏆 DFW launch creates real data in < 90 days — valuation moves on launch data'],
      next: 'Schedule a founder call: invest@prolnk.io — 30 minutes, all questions welcome',
    },
  },
};

export default function ProLnkCallToAction() {
  const [prospect, setProspect] = useState<Prospect>('licensed contractor');
  const [situation, setSituation] = useState<SitType>('just exploring');
  const p = pitches[prospect][situation];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#F5E642', margin: 0 }}>Why Wait?</h1>
          <p style={{ color: '#94A3B8', marginTop: 8, fontSize: 15 }}>Charter waitlist closes at 500. Tell us who you are and where you stand.</p>
          <div style={{ display: 'inline-block', background: '#EF4444', color: 'white', borderRadius: 20, padding: '4px 16px', fontSize: 13, fontWeight: 700, marginTop: 8 }}>
            🔴 Charter spots remaining: limited — no counter to avoid gaming
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#94A3B8', fontSize: 13, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>I am a...</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {prospects.map(p => (
              <button key={p} onClick={() => setProspect(p)} style={{
                padding: '8px 18px', borderRadius: 24, border: '2px solid',
                borderColor: prospect === p ? '#F5E642' : '#334155',
                background: prospect === p ? '#F5E642' : 'transparent',
                color: prospect === p ? '#0A1628' : '#94A3B8',
                fontWeight: 700, cursor: 'pointer', fontSize: 13, textTransform: 'capitalize',
              }}>{p}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: '#94A3B8', fontSize: 13, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Right now I am...</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {situations.map(s => (
              <button key={s} onClick={() => setSituation(s)} style={{
                padding: '8px 18px', borderRadius: 24, border: '2px solid',
                borderColor: situation === s ? '#F5E642' : '#334155',
                background: situation === s ? '#F5E642' : 'transparent',
                color: situation === s ? '#0A1628' : '#94A3B8',
                fontWeight: 700, cursor: 'pointer', fontSize: 13, textTransform: 'capitalize',
              }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 16, padding: 28, marginBottom: 20 }}>
          <p style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginTop: 0, marginBottom: 20, lineHeight: 1.5 }}>"{p.reason}"</p>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#22C55E', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>✅ What you gain by joining now:</div>
            {p.gain.map((g, i) => (
              <div key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '6px 0', borderBottom: i < p.gain.length - 1 ? '1px solid #1E3A5F' : 'none' }}>{g}</div>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#EF4444', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>❌ What you lose by waiting:</div>
            {p.loss.map((l, i) => (
              <div key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '6px 0', borderBottom: i < p.loss.length - 1 ? '1px solid #1E3A5F' : 'none' }}>{l}</div>
            ))}
          </div>

          <div style={{ background: '#F5E642', borderRadius: 10, padding: '14px 18px' }}>
            <div style={{ color: '#0A1628', fontSize: 13, fontWeight: 800, marginBottom: 4 }}>Next step:</div>
            <div style={{ color: '#0A1628', fontSize: 14 }}>{p.next}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
