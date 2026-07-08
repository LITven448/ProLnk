// prolnk-coach.jsx — onboarding coaching: how ProLnk works, step by step
const { useState: useCo } = React;

const COACH_STEPS = [
  { icon: 'feed', tone: '#0D9488', bg: '#CCFBF1', title: 'Referrals find you',
    body: 'Homeowners report a problem, our AI scopes it, and the referral routes to the best-ranked pro in that trade and area. No bidding, no lead auctions, no paying per lead.',
    tip: 'Higher rank = first look at more referrals.' },
  { icon: 'bolt', tone: '#D97706', bg: '#FEF3C7', title: 'You set the price',
    body: 'Claim a referral and send your own quote — AI takeoff builds it from photos and measurements, then you adjust. At settlement ProLnk takes a platform fee on the job total — 3–15% by job type, 8% for standard residential — and the rest is yours at your keep rate, which climbs as you complete jobs.',
    tip: 'Never a markup on your labor rate. Never a per-lead fee.' },
  { icon: 'shield', tone: '#16A34A', bg: '#DCFCE7', title: 'Trust is the algorithm', badges: true,
    body: 'A current annual background check, verified license, and insurance keep you at full rank. Great work and fair pricing push you higher. Gouging, poor work, or lapses dock you.',
    tip: 'Your TrustyPro badge climbs from Bronze to Platinum — homeowners see exactly why to trust you.' },
  { icon: 'earnings', tone: '#7C3AED', bg: '#EDE9FE', title: 'More ways to earn',
    body: 'Job revenue from quotes you win — your keep rate grows with every completed job. Referral overrides when pros you invite stay active — a share of their membership, every month. And Scout work: project cuts and a monthly share for every home you document.',
    tip: 'Everything is itemized in Earnings — no fine print.' },
  { icon: 'msg', tone: '#0EA5E9', bg: '#E0F2FE', title: 'Everything stays in-app',
    body: 'Chat, scheduling, documents, and payouts all live inside ProLnk. Phone numbers are never shared — both sides stay protected — and payouts hit your bank via Stripe.',
    tip: 'Taking jobs off-platform gets accounts removed.' },
];

const BADGE_LEVELS = [
  { name: 'None', c: '#CBD5E1' },
  { name: 'Bronze', c: '#cd7f32' },
  { name: 'Silver', c: '#a8a9ad' },
  { name: 'Gold', c: '#d4af37' },
  { name: 'Platinum', platinum: true },
];

function BadgeShield({ color, size = 44, platinum = false }) {
  const mask = 'url(assets/trustypro-shield.png) center / contain no-repeat';
  if (platinum) return (
    <div style={{ position: 'relative', width: size, height: size * 1.08, flexShrink: 0, filter: 'drop-shadow(0 3px 10px rgba(125,140,220,0.55))' }}>
      <div style={{ position: 'absolute', inset: 0, WebkitMask: mask, mask: mask,
        background: 'linear-gradient(135deg, #F4F5FB 0%, #C7CDEC 22%, #8E9DE0 45%, #E9EBF7 62%, #9FAAE4 80%, #D8DCF2 100%)' }} />
      <div className="pl-sheen" style={{ position: 'absolute', inset: 0, WebkitMask: mask, mask: mask,
        background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.9) 48%, transparent 62%)', backgroundSize: '250% 100%' }} />
    </div>
  );
  return <div style={{ width: size, height: size * 1.08, background: color, WebkitMask: mask, mask: mask, flexShrink: 0 }} />;
}

function CoachScreen({ onDone, onSkip }) {
  const [i, setI] = useCo(0);
  const s = COACH_STEPS[i];
  const last = i === COACH_STEPS.length - 1;
  return (
    <Screen bg="#fff">
      <div style={{ paddingTop: 56, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 20px 0' }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: PL.faint, letterSpacing: '0.06em', textTransform: 'uppercase' }}>How ProLnk works · {i + 1}/{COACH_STEPS.length}</div>
        <button onClick={onSkip} style={{ border: 'none', background: 'none', color: PL.faint, fontWeight: 700, fontSize: 13.5, cursor: 'pointer', padding: 4 }}>Skip</button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
        <div key={i}>
          <div style={{ width: 76, height: 76, borderRadius: 24, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 26 }}>
            <Ic name={s.icon} size={36} color={s.tone} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 14 }}>{s.title}</div>
          <div style={{ fontSize: 15.5, color: PL.body, lineHeight: 1.65, marginBottom: 18 }}>{s.body}</div>
          {s.badges && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 18, justifyContent: 'space-between' }}>
              {BADGE_LEVELS.map(b => (
                <div key={b.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1, transform: b.platinum ? 'scale(1.22)' : 'none' }}>
                  <BadgeShield color={b.c} size={40} platinum={b.platinum} />
                  <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.02em', color: b.name === 'None' ? PL.faint : b.c, ...(b.platinum ? { background: 'linear-gradient(90deg, #8E9DE0, #5C6BC0, #A5AEE4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } : {}) }}>{b.name}</span>
                </div>
              ))}
            </div>
          )}
          {s.badges && <style>{`.pl-sheen{ animation: plSheen 2.6s ease-in-out infinite; } @keyframes plSheen { 0%, 55% { background-position: 180% 0; } 100% { background-position: -80% 0; } }`}</style>}
          <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', background: PL.bg, border: `1px solid ${PL.border}`, borderRadius: 12, padding: '11px 14px' }}>
            <Ic name="spark" size={16} color={s.tone} style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 13, color: PL.slate3, fontWeight: 600, lineHeight: 1.5 }}>{s.tip}</span>
          </div>
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: '0 20px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginBottom: 18 }}>
          {COACH_STEPS.map((_, j) => (
            <button key={j} onClick={() => setI(j)} style={{ width: j === i ? 22 : 7, height: 7, borderRadius: 99, border: 'none', padding: 0, cursor: 'pointer', background: j === i ? PL.teal : '#E2E8F0', transition: 'all .25s' }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {i > 0 && <Btn tone="ghost" size="lg" onClick={() => setI(i - 1)} style={{ flex: 1 }}>Back</Btn>}
          <Btn tone="teal" size="lg" onClick={() => last ? onDone() : setI(i + 1)} style={{ flex: 2.2 }}>
            {last ? 'Got it — get verified' : 'Next'}<Ic name="chevR" size={18} color="#fff" />
          </Btn>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { CoachScreen });
