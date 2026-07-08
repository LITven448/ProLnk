// prolnk-status.jsx — TrustyPro certification: levels, XP, badge wall, reward ladder (gamified onboarding)
const { useState: useSt, useEffect: useESt } = React;

// ── completion model ─────────────────────────────────────────
// Each task grants XP + (some) a badge. Levels are XP thresholds.
function buildStatus({ bgStatus, licenses, extras = {} }) {
  const hasCert = licenses.some(l => l.kind === 'Certification');
  const tasks = [
    { key: 'email',    label: 'Verify your email',      xp: 10, done: !!extras.email, route: 'task:email', sub: 'Tap the link we sent you' },
    { key: 'bg',       label: 'Pass background check',  xp: 40, done: bgStatus !== 'unfiled', route: 'bgcheck', sub: 'One-time Checkr screening' },
    { key: 'license',  label: 'Add a trade license',    xp: 30, done: licenses.length > 0,    route: 'licenses', sub: 'At least one on file' },
    { key: 'payout',   label: 'Set up Stripe payouts',  xp: 15, done: !!extras.payout, route: 'task:payout', sub: 'Bank & KYC via Stripe Connect' },
    { key: 'insurance',label: 'Upload proof of insurance', xp: 25, done: !!extras.insurance, route: 'task:insurance', sub: 'General liability coverage' },
    { key: 'cert',     label: 'Add a certification',    xp: 20, done: hasCert,                route: 'licenses', sub: 'Backflow, EPA, etc.' },
    { key: 'photo',    label: 'Add business logo & photo', xp: 15, done: !!extras.photo,      route: 'task:photo', sub: 'Builds homeowner trust' },
    { key: 'area',     label: 'Confirm service areas',  xp: 10, done: !!extras.area,          route: 'task:area', sub: 'Where you take work' },
    { key: 'reviews',  label: 'Earn a 5-star review',   xp: 15, done: (PRO.reviews || 0) > 0, route: null, sub: `${PRO.reviews} reviews` },
  ];
  const earned = tasks.filter(t => t.done).reduce((s, t) => s + t.xp, 0);
  const total = tasks.reduce((s, t) => s + t.xp, 0);

  const LEVELS = [
    { n: 1, name: 'Applicant',         min: 0,   reward: 'On the platform · finish steps to unlock referrals', leads: '—',
      how: 'Sign up, pick your plan and service ZIPs.',
      tier: 'Unbadged', bc: '#94A3B8', bc2: '#64748B' },
    { n: 2, name: 'Verified Pro',      min: 55,  reward: 'Referrals unlocked · standard lead flow',            leads: '1×',
      how: 'Pass your background check and upload your license + insurance.',
      tier: 'Bronze', bc: '#cd7f32', bc2: '#9c5a1e' },
    { n: 3, name: 'TrustyPro Certified', min: 110, reward: 'Certified badge shown to homeowners · 2× referrals · featured profile', leads: '2×',
      how: 'Add certifications, connect payouts, and complete your first 10 jobs at 4.5★+.',
      tier: 'Silver', bc: '#a8a9ad', bc2: '#77787d' },
    { n: 4, name: 'Elite Pro',         min: 155, reward: 'First pick on premium referrals · top of search',    leads: '3×',
      how: '25+ completed jobs, 4.8★+ rating, under-15-min response time, clean annual renewal.',
      tier: 'Gold', bc: '#d4af37', bc2: '#a8861f' },
    { n: 5, name: 'Platinum Pro',      min: 200, reward: 'Highest trust placement · concierge referrals · invite-only work', leads: '4×',
      how: '100+ jobs, zero disputes, sustained 4.9★ — held by the top 2% of pros.',
      tier: 'Platinum', bc: '#C7CDEC', bc2: '#7D8CDC' },
  ];
  let lvl = LEVELS[0];
  for (const L of LEVELS) if (earned >= L.min) lvl = L;
  const next = LEVELS.find(L => L.min > earned) || null;
  const span = next ? next.min - lvl.min : 1;
  const intoLevel = earned - lvl.min;
  const pct = next ? Math.min(1, intoLevel / span) : 1;

  // badge wall — each badge carries ranking weight in the matching algorithm
  const badges = [
    { key: 'trusty',    name: 'TrustyPro Certified', icon: 'trophy',  tone: '#0D9488', earned: earned >= 110, hero: true, w: 20 },
    { key: 'verified',  name: 'Background Cleared', icon: 'shield',  tone: '#16A34A', earned: bgStatus === 'clear', w: 15 },
    { key: 'licensed',  name: 'Licensed',           icon: 'doc',     tone: '#2563EB', earned: licenses.length > 0, w: 12 },
    { key: 'toprated',  name: 'Top Rated',          icon: 'star',    tone: '#D97706', earned: (PRO.rating || 0) >= 4.8, w: 12 },
    { key: 'certified', name: 'Certified',          icon: 'award',   tone: '#7C3AED', earned: hasCert, w: 10 },
    { key: 'insured',   name: 'Insured',            icon: 'umbrella',tone: '#0D9488', earned: !!extras.insurance, w: 8 },
    { key: 'fast',      name: 'Fast Responder',     icon: 'bolt',    tone: '#DC2626', earned: (PRO.responseMins || 99) <= 15, w: 8 },
    { key: 'paid',      name: 'Payout Ready',       icon: 'card',    tone: '#0891B2', earned: !!extras.payout, w: 3 },
  ];

  return { tasks, earned, total, lvl, next, pct, badges, LEVELS };
}

// ── XP progress ring ─────────────────────────────────────────
function LevelRing({ pct, level, size = 132 }) {
  const r = (size - 16) / 2, c = 2 * Math.PI * r;
  const [draw, setDraw] = useSt(0);
  useESt(() => { const t = setTimeout(() => setDraw(pct), 120); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="9" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#5EEAD4" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - draw)} style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {size >= 90 && <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', lineHeight: 1, marginBottom: 4 }}>Level {level}</div>}
        <div style={{ fontSize: size * 0.30, fontWeight: 800, color: '#fff', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{Math.round(pct * 100)}<span style={{ fontSize: size * 0.155 }}>%</span></div>
      </div>
    </div>
  );
}

// ── tier seal: the TrustyPro shield in its badge-tier finish ──
function TierSeal({ L, size = 44, locked = false }) {
  const mask = 'url(assets/trustypro-shield.png) center / contain no-repeat';
  const h = size * 1.08;
  const lockChip = locked ? (
    <div style={{ position: 'absolute', right: -3, bottom: -2, width: size * 0.42, height: size * 0.42, borderRadius: 99, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(15,23,42,0.25)' }}>
      <Ic name="lock" size={size * 0.24} color={PL.slate3} />
    </div>
  ) : null;
  if (L.tier === 'Platinum') return (
    <div style={{ position: 'relative', width: size, height: h, flexShrink: 0, filter: locked ? 'none' : 'drop-shadow(0 3px 9px rgba(125,140,220,0.5))', opacity: locked ? 0.85 : 1 }}>
      <div style={{ position: 'absolute', inset: 0, WebkitMask: mask, mask: mask,
        background: 'linear-gradient(135deg, #F4F5FB 0%, #C7CDEC 22%, #8E9DE0 45%, #E9EBF7 62%, #9FAAE4 80%, #D8DCF2 100%)' }} />
      {!locked && <div className="pl-sheen" style={{ position: 'absolute', inset: 0, WebkitMask: mask, mask: mask,
        background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.9) 48%, transparent 62%)', backgroundSize: '250% 100%' }} />}
      {lockChip}
    </div>
  );
  if (L.tier === 'Unbadged') return (
    <div style={{ position: 'relative', width: size, height: h, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, WebkitMask: mask, mask: mask, background: '#CBD5E1' }} />
      {lockChip}
    </div>
  );
  return (
    <div style={{ position: 'relative', width: size, height: h, flexShrink: 0, filter: locked ? 'none' : `drop-shadow(0 2px 6px ${L.bc}55)`, opacity: locked ? 0.85 : 1 }}>
      <div style={{ position: 'absolute', inset: 0, WebkitMask: mask, mask: mask, background: L.bc }} />
      {lockChip}
    </div>
  );
}
if (!document.getElementById('pl-sheen-kf')) {
  const plSt = document.createElement('style'); plSt.id = 'pl-sheen-kf';
  plSt.textContent = '.pl-sheen{ animation: plSheen 2.6s ease-in-out infinite; } @keyframes plSheen { 0%, 55% { background-position: 180% 0; } 100% { background-position: -80% 0; } }';
  document.head.appendChild(plSt);
}

// ── one achievement badge medallion ──────────────────────────
function BadgeMedal({ b }) {
  const earned = b.earned;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: earned ? 1 : 0.5 }}>
      <div style={{
        width: 52, height: 52, borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: earned ? b.tone + '14' : '#F6F7F9',
        border: earned ? `1.5px solid ${b.tone}33` : `1.5px dashed ${PL.border}`,
      }}>
        <Ic name={earned ? b.icon : 'lock'} size={23} color={earned ? b.tone : PL.faint} />
      </div>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: earned ? PL.slate3 : PL.faint, textAlign: 'center', lineHeight: 1.2, maxWidth: 74 }}>{b.name}</span>
      <span style={{ fontSize: 10, fontWeight: 800, color: earned ? PL.teal : PL.faint, background: earned ? PL.tealBg : '#F6F7F9', padding: '2px 7px', borderRadius: 99, lineHeight: 1.2 }}>+{b.w} rank</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// PRO STATUS — the gamified hub
// ════════════════════════════════════════════════════════════
function ProStatus({ bgStatus, licenses, extras, onTask, onBack }) {
  const S = buildStatus({ bgStatus, licenses, extras });
  const earnedBadges = S.badges.filter(b => b.earned).length;
  const certified = S.earned >= 110;

  return (
    <Screen>
      {/* hero */}
      <div style={{ background: PL.slate, paddingTop: 52, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -40, width: 220, height: 220, borderRadius: 99, background: `radial-gradient(circle, ${certified ? 'rgba(13,148,136,0.45)' : 'rgba(217,119,6,0.32)'}, transparent 70%)` }} />
        <div style={{ padding: '6px 18px 12px', display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          {onBack && <button onClick={onBack} style={{ border: 'none', background: 'rgba(255,255,255,0.14)', width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Ic name="chevL" size={20} color="#fff" /></button>}
          <div style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>TrustyPro status</div>
        </div>
        <div style={{ padding: '4px 22px 26px', display: 'flex', alignItems: 'center', gap: 20, position: 'relative' }}>
          <LevelRing pct={S.pct} level={S.lvl.n} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{S.lvl.name}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 7, lineHeight: 1.45 }}>
              {S.next
                ? <><b style={{ color: '#5EEAD4' }}>{S.next.min - S.earned} XP</b> to {S.next.name}</>
                : <b style={{ color: '#5EEAD4' }}>Top level reached</b>}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 11, background: 'rgba(255,255,255,0.1)', borderRadius: 99, padding: '4px 12px 4px 5px' }}>
              <TierSeal L={S.lvl} size={22} locked={S.lvl.tier === 'Unbadged'} />
              <span style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '0.01em' }}>{S.lvl.tier === 'Unbadged' ? 'No badge yet' : `${S.lvl.tier} badge`}</span>
            </div>
          </div>
        </div>
      </div>

      <Body>
        {/* badge tiers & rewards */}
        <SectionLabel>Badge tiers & rewards</SectionLabel>
        <Card style={{ marginBottom: 18, padding: '4px 16px' }}>
          {S.LEVELS.map((L, i) => {
            const reached = S.earned >= L.min;
            const current = S.lvl.n === L.n;
            return (
              <div key={L.n} style={{ display: 'flex', gap: 13, padding: '14px 0', borderBottom: i === S.LEVELS.length - 1 ? 'none' : `1px solid ${PL.border2}`, alignItems: 'center' }}>
                <TierSeal L={L} size={38} locked={!reached} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 800, color: reached ? PL.ink : PL.slate3, ...(L.tier === 'Platinum' && reached ? { background: 'linear-gradient(90deg, #8E9DE0, #5C6BC0, #A5AEE4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } : {}) }}>{L.name}</span>
                    {current && <Badge tone="teal">You’re here</Badge>}
                    {L.leads !== '—' && <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 800, color: reached ? PL.teal : PL.faint }}>{L.leads} leads</span>}
                  </div>
                  <div style={{ fontSize: 12.5, color: PL.muted, marginTop: 3, lineHeight: 1.45 }}>
                    {L.tier !== 'Unbadged' && <span style={{ fontWeight: 800, color: L.tier === 'Platinum' ? '#7D8CDC' : L.bc, textTransform: 'uppercase', letterSpacing: '0.03em', fontSize: 11 }}>{L.tier} · </span>}{L.reward}
                  </div>
                  {!reached && L.how && (
                    <div style={{ fontSize: 12, color: PL.slate3, marginTop: 5, lineHeight: 1.45, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                      <Ic name="arrowUp" size={13} color={PL.teal} style={{ flexShrink: 0, marginTop: 1.5 }} />
                      <span><b style={{ color: PL.tealDark }}>How to get here:</b> {L.how} <span style={{ color: PL.faint, fontWeight: 700 }}>({L.min - S.earned > 0 ? `${L.min - S.earned} XP away` : 'threshold met'})</span></span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </Card>

        {/* badge wall */}
        <SectionLabel action={`${earnedBadges}/${S.badges.length}`}>Badges</SectionLabel>
        <div style={{ fontSize: 12.5, color: PL.muted, lineHeight: 1.5, margin: '-4px 0 10px' }}>Ordered by ranking weight — every badge you earn adds match priority in the algorithm.</div>
        <Card style={{ marginBottom: 18, padding: '18px 12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px 4px' }}>
            {S.badges.map(b => <BadgeMedal key={b.key} b={b} />)}
          </div>
        </Card>

        {/* task checklist */}
        <SectionLabel>Finish your profile</SectionLabel>
        <Card style={{ marginBottom: 18, padding: '4px 16px' }}>
          {S.tasks.map((t, i) => (
            <div key={t.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: i === S.tasks.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
              <div style={{ width: 24, height: 24, borderRadius: 99, flexShrink: 0, background: t.done ? PL.green : '#fff', border: t.done ? 'none' : `2px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.done ? <Ic name="check" size={14} color="#fff" sw={3} /> : <span style={{ width: 6, height: 6, borderRadius: 99, background: PL.faint }} />}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.done ? PL.muted : PL.ink, lineHeight: 1.25 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: PL.faint, marginTop: 1 }}>{t.sub}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: t.done ? PL.green : PL.faint }}>+{t.xp}</span>
                {!t.done && t.route && <Btn tone="slate" size="sm" onClick={() => onTask(t.route)}>Do it</Btn>}
              </div>
            </div>
          ))}
        </Card>
        <div style={{ height: 10 }} />
      </Body>
    </Screen>
  );
}

// ── compact status banner (for Verify hub / Profile) ─────────
function StatusBanner({ bgStatus, licenses, extras, onOpen }) {
  const S = buildStatus({ bgStatus, licenses, extras });
  return (
    <Card onClick={onOpen} style={{ marginBottom: 18, background: PL.slate, borderColor: 'transparent', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: 99, background: 'radial-gradient(circle, rgba(13,148,136,0.4), transparent 70%)' }} />
      <div style={{ position: 'relative', flexShrink: 0 }}><LevelRing pct={S.pct} level={S.lvl.n} size={68} /></div>
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.15 }}>{S.lvl.name}</div>
        <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.7)', marginTop: 3, lineHeight: 1.4 }}>{S.next ? <><b style={{ color: '#5EEAD4' }}>{S.next.min - S.earned} XP</b> to {S.next.name}</> : 'Top level reached'}</div>
      </div>
      <Ic name="chevR" size={20} color="rgba(255,255,255,0.5)" style={{ position: 'relative' }} />
    </Card>
  );
}

Object.assign(window, { ProStatus, StatusBanner, buildStatus, LevelRing });
