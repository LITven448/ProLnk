// prolnk-trust.jsx — Trust & Ranking policy: how you earn more jobs, how you get docked
const TRUST_RULES = {
  earn: [
    { t: 'Do great work', s: '5-star reviews and completed jobs push you up the ranking — quality is the #1 signal.' },
    { t: 'Price fairly', s: 'Quotes in line with your market build trust. Fair pricing compounds into more referrals.' },
    { t: 'Respond fast', s: 'Quick claims and quick homeowner replies raise your match priority.' },
    { t: 'Stay verified', s: 'Current license, insurance, and a fresh annual background check keep you at full rank.' },
  ],
  dock: [
    { t: 'Annual background check lapses', s: 'A background check is due every year. Let it expire and your ranking drops until it’s renewed.' },
    { t: 'Lawsuits or violent criminal history', s: 'Active lawsuits against you or your contractors, past violent criminal history, or any crimes against children dock your business in the algorithm — or remove you entirely.' },
    { t: 'Price gouging', s: 'Quotes far above market on urgent jobs are flagged. Gouging costs you future referral opportunities.' },
    { t: 'Poor workmanship', s: 'Low ratings, callbacks, and unresolved complaints reduce the referrals you see.' },
  ],
  removal: [
    { t: 'Breaking the law', s: 'Criminal conduct on the platform means suspension or permanent removal.' },
    { t: 'Bypassing the platform', s: 'Taking matched jobs off-platform to avoid the fee gets your account suspended or removed.' },
    { t: 'Abandoning a job', s: 'Skip out on an accepted job and ProLnk will pursue you legally on behalf of the homeowner — and replace you with another pro on the job.' },
  ],
};

function TrustRules({ onBack }) {
  const Section = ({ icon, tone, bg, title, sub, items }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name={icon} size={18} color={tone} /></div>
        <div>
          <div style={{ fontSize: 15.5, fontWeight: 800, color: PL.ink, lineHeight: 1.15 }}>{title}</div>
          <div style={{ fontSize: 12, color: PL.faint, fontWeight: 600 }}>{sub}</div>
        </div>
      </div>
      <Card style={{ padding: '4px 16px' }}>
        {items.map((r, i) => (
          <div key={i} style={{ padding: '12px 0', borderBottom: i === items.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: PL.ink, marginBottom: 3 }}>{r.t}</div>
            <div style={{ fontSize: 13, color: PL.muted, lineHeight: 1.55 }}>{r.s}</div>
          </div>
        ))}
      </Card>
    </div>
  );

  return (
    <Screen>
      <Header onBack={onBack} title="Trust & ranking" sub="How the algorithm treats you" />
      <Body>
        {/* bottom line, up top */}
        <Card style={{ marginBottom: 20, background: PL.slate, borderColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -20, width: 130, height: 130, borderRadius: 99, background: 'radial-gradient(circle, rgba(13,148,136,0.4), transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#5EEAD4', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>The bottom line</div>
            <div style={{ fontSize: 16.5, fontWeight: 700, color: '#fff', lineHeight: 1.5 }}>Be trustworthy and ethical — you get more jobs. Do good work — you get more jobs. Break the law or bypass the platform — you’re suspended or removed.</div>
          </div>
        </Card>

        <Section icon="arrowUp" tone={PL.green} bg={PL.greenBg} title="How you earn more jobs" sub="Signals that raise your ranking" items={TRUST_RULES.earn} />
        <Section icon="x" tone={PL.amber} bg={PL.amberBg} title="How you get docked" sub="Signals that lower your ranking" items={TRUST_RULES.dock} />
        <Section icon="shield" tone={PL.red} bg={PL.redBg} title="Suspension & removal" sub="Zero-tolerance conduct" items={TRUST_RULES.removal} />

        <div style={{ fontSize: 12.5, color: PL.faint, lineHeight: 1.55, display: 'flex', gap: 7 }}><Ic name="clock" size={15} color={PL.faint} style={{ flexShrink: 0, marginTop: 1 }} />Reminder: your background check renews every 12 months. We’ll notify you 30 days before it’s due — renewing on time keeps your rank intact.</div>
        <div style={{ height: 10 }} />
      </Body>
    </Screen>
  );
}

Object.assign(window, { TrustRules });
