// prolnk-briefcase.jsx — Digital Briefcase (company compliance) + ProPass (per-person credentials)
const { useState: useBc } = React;

const BRIEFCASE_DOCS = [
  { group: 'Business compliance', items: [
    { name: 'Plumbing Contractor License', sub: 'TX-PC 20441 · exp 08/2027', ok: true },
    { name: 'General Liability Insurance', sub: '$2M COI · Hartford · exp 01/2027', ok: true },
    { name: 'Workers’ Comp Policy', sub: 'TX-WC 99120 · exp 01/2027', ok: true },
    { name: 'Surety Bond', sub: '$25,000 · required for TX plumbing', ok: true },
  ]},
  { group: 'Legal & entity docs', items: [
    { name: 'LLC Formation + EIN', sub: 'Reyes Plumbing & Drain LLC · TX', ok: true },
    { name: 'W-9 on file', sub: 'For 1099 reporting', ok: true },
    { name: 'ProLnk Partner Agreement', sub: 'Signed Mar 2026 · v2026-1', ok: true },
  ]},
  { group: 'Business checks', items: [
    { name: 'Lawsuit & judgment screen', sub: 'County + federal · clear', ok: true, badge: 'Renews annually' },
    { name: 'Business credit & liens', sub: 'No liens on record', ok: true },
    { name: 'Better Business Bureau', sub: 'A rating · 0 unresolved complaints', ok: true },
  ]},
];

const PROPASSES = [
  { name: 'Marcus Reyes', role: 'Owner · Master Plumber', initials: 'MR', bg: 'clear', creds: 5, tier: 'Gold', tc: '#d4af37', expSoon: null },
  { name: 'Danny Reyes', role: 'Journeyman Plumber', initials: 'DR', bg: 'clear', creds: 3, tier: 'Silver', tc: '#a8a9ad', expSoon: null },
  { name: 'Luis Ortega', role: 'Apprentice', initials: 'LO', bg: 'clear', creds: 2, tier: 'Bronze', tc: '#cd7f32', expSoon: 'Gas Fitter exp 11/2026' },
  { name: 'Sam Wick', role: 'Drain Tech · contractor', initials: 'SW', bg: 'pending', creds: 1, tier: null, tc: null, expSoon: null },
];

function PassShield({ color, size = 30 }) {
  const mask = 'url(assets/trustypro-shield.png) center / contain no-repeat';
  return <div style={{ width: size, height: size * 1.08, background: color || '#CBD5E1', WebkitMask: mask, mask: mask, flexShrink: 0 }} />;
}

function BriefcaseScreen({ onBack, onPass }) {
  const total = BRIEFCASE_DOCS.reduce((s, g) => s + g.items.length, 0);
  const okAll = BRIEFCASE_DOCS.every(g => g.items.every(x => x.ok));
  const passIssues = PROPASSES.filter(p => p.bg !== 'clear' || p.expSoon).length;
  return (
    <Screen>
      <Header onBack={onBack} title="Digital Briefcase" sub="Company compliance · one place" />
      <Body>
        {/* compliance hero */}
        <Card style={{ background: PL.slate, borderColor: 'transparent', marginBottom: 18, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -35, right: -25, width: 150, height: 150, borderRadius: 99, background: 'radial-gradient(circle, rgba(13,148,136,0.35), transparent 70%)' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 15, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="briefcase" size={26} color="#5EEAD4" /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{okAll ? 'Fully compliant' : 'Action needed'}</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', marginTop: 3, lineHeight: 1.45 }}>{total} company documents verified · what homeowners’ trust is built on</div>
            </div>
            {okAll && <Badge tone="green" solid><Ic name="check" size={12} color="#fff" sw={3} />Verified</Badge>}
          </div>
        </Card>

        {BRIEFCASE_DOCS.map(g => (
          <div key={g.group}>
            <SectionLabel>{g.group}</SectionLabel>
            <Card style={{ padding: '4px 16px', marginBottom: 14 }}>
              {g.items.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderBottom: i === g.items.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: d.ok ? PL.greenBg : PL.amberBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={d.ok ? 'check' : 'clock'} size={15} color={d.ok ? PL.green : PL.amber} sw={2.6} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: PL.ink, lineHeight: 1.25 }}>{d.name}</div>
                    <div style={{ fontSize: 11.5, color: PL.faint, marginTop: 1 }}>{d.sub}</div>
                  </div>
                  {d.badge && <Badge tone="slate">{d.badge}</Badge>}
                </div>
              ))}
            </Card>
          </div>
        ))}

        {/* ProPass roster */}
        <SectionLabel action={passIssues ? `${passIssues} need attention` : 'All clear'}>ProPasses · your crew</SectionLabel>
        <div style={{ fontSize: 12.5, color: PL.muted, lineHeight: 1.5, margin: '-4px 0 10px' }}>Every employee and contractor on your jobs carries a ProPass — their licenses, certs, and background check in one card homeowners can trust.</div>
        {PROPASSES.map((p, i) => (
          <Card key={i} onClick={() => onPass(p)} style={{ marginBottom: 9, display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', cursor: 'pointer' }}>
            <div style={{ width: 42, height: 42, borderRadius: 99, background: PL.slate, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{p.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: PL.ink, lineHeight: 1.2 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: PL.faint, marginTop: 1 }}>{p.role} · {p.creds} credential{p.creds === 1 ? '' : 's'}</div>
              {p.expSoon && <div style={{ fontSize: 11.5, color: PL.amber, fontWeight: 700, marginTop: 2 }}>⚠ {p.expSoon}</div>}
            </div>
            {p.bg === 'clear' ? <PassShield color={p.tc || '#16A34A'} /> : <Badge tone="amber">Check pending</Badge>}
            <Ic name="chevR" size={17} color={PL.faint} />
          </Card>
        ))}
        {/* bulk crew onboarding — no barriers */}
        <SectionLabel>Add your crew · zero friction</SectionLabel>
        <Card style={{ padding: '4px 16px', marginBottom: 12 }}>
          {[
            ['link', PL.teal, PL.tealBg, 'Crew invite link', 'Text or QR — each person completes their own ProPass in ~10 min; background check auto-orders'],
            ['doc', '#2563EB', '#EFF6FF', 'Import a roster', 'Upload a CSV or payroll export — we create every seat and ProPass, then chase the missing pieces'],
            ['bolt', '#7C3AED', '#EDE9FE', 'Sync from your FSM', 'Pull your whole team from Housecall Pro, ServiceTitan, or Jobber in one tap'],
          ].map(([ic, fg, bg, t, s], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i === 2 ? 'none' : `1px solid ${PL.border2}`, cursor: 'pointer' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={ic} size={18} color={fg} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: PL.ink }}>{t}</div>
                <div style={{ fontSize: 12, color: PL.muted, marginTop: 1, lineHeight: 1.4 }}>{s}</div>
              </div>
              <Ic name="chevR" size={16} color={PL.faint} />
            </div>
          ))}
        </Card>
        <div style={{ fontSize: 12, color: PL.faint, textAlign: 'center', lineHeight: 1.5 }}>A crew member without a clear ProPass can’t be assigned to ProLnk jobs — but they can start the moment theirs clears.</div>
        <div style={{ height: 8 }} />
      </Body>
    </Screen>
  );
}

// ── single ProPass detail ──
function ProPassScreen({ pass, onBack }) {
  const p = pass || PROPASSES[0];
  const creds = p.name === 'Marcus Reyes'
    ? [['Master Plumber', 'TX-MPL 41882 · exp 08/2027'], ['Backflow Prevention', 'BPAT-22907 · exp 03/2027'], ['Gas Fitter', 'TX-GF 8834 · exp 11/2026'], ['Medical Gas (ASSE 6010)', 'ASSE-60455 · exp 05/2028'], ['OSHA 30', 'Card 8841-C · no expiry']]
    : p.name === 'Danny Reyes'
    ? [['Journeyman Plumber', 'TX-JP 55210 · exp 04/2027'], ['Backflow Prevention', 'BPAT-30112 · exp 06/2027'], ['OSHA 10', 'Card 9102-B · no expiry']]
    : p.name === 'Luis Ortega'
    ? [['Apprentice Plumber', 'TX-AP 71005 · exp 02/2027'], ['Gas Fitter', 'TX-GF 9921 · exp 11/2026']]
    : [['IICRC WRT', 'Cert 44018 · exp 09/2027']];
  return (
    <Screen bg="#fff">
      <Header onBack={onBack} title="ProPass" sub={p.name} />
      <Body style={{ padding: '16px 16px 30px' }}>
        {/* the pass card */}
        <Card style={{ background: PL.slate, borderColor: 'transparent', marginBottom: 18, position: 'relative', overflow: 'hidden', padding: 20 }}>
          <div style={{ position: 'absolute', top: -30, right: -20, width: 140, height: 140, borderRadius: 99, background: 'radial-gradient(circle, rgba(94,234,212,0.25), transparent 70%)' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: 99, background: 'rgba(255,255,255,0.14)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 800, flexShrink: 0 }}>{p.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', lineHeight: 1.15 }}>{p.name}</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{p.role} · Reyes Plumbing & Drain</div>
            </div>
            {p.tc && <PassShield color={p.tc} size={38} />}
          </div>
          <div style={{ position: 'relative', display: 'flex', gap: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 11, overflow: 'hidden', marginTop: 16 }}>
            {[['Background', p.bg === 'clear' ? 'Clear' : 'Pending'], ['Credentials', String(creds.length)], ['Badge', p.tier || '—']].map(([l, v], i) => (
              <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', padding: '9px 6px', textAlign: 'center' }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: p.bg === 'clear' || i > 0 ? '#5EEAD4' : '#FCD34D' }}>{v}</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </Card>

        <SectionLabel>Licenses & certifications</SectionLabel>
        <Card style={{ padding: '4px 16px', marginBottom: 16 }}>
          {creds.map(([n, s], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderBottom: i === creds.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="doc" size={15} color="#2563EB" /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: PL.ink }}>{n}</div>
                <div style={{ fontSize: 11.5, color: PL.faint, marginTop: 1 }}>{s}</div>
              </div>
              <Ic name="check" size={15} color={PL.green} sw={2.6} />
            </div>
          ))}
        </Card>

        <SectionLabel>Background check</SectionLabel>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: p.bg === 'clear' ? PL.greenBg : PL.amberBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="shield" size={19} color={p.bg === 'clear' ? PL.green : PL.amber} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: PL.ink }}>{p.bg === 'clear' ? 'Clear · Checkr' : 'In progress · Checkr'}</div>
            <div style={{ fontSize: 12, color: PL.faint, marginTop: 1 }}>{p.bg === 'clear' ? 'Renews annually · next due Mar 2027' : 'Filed 2 days ago · usually 3–5 days'}</div>
          </div>
          <Badge tone={p.bg === 'clear' ? 'green' : 'amber'}>{p.bg === 'clear' ? 'Verified' : 'Pending'}</Badge>
        </Card>

        <div style={{ fontSize: 12.5, color: PL.faint, display: 'flex', gap: 7, lineHeight: 1.5 }}><Ic name="shield" size={15} color={PL.faint} style={{ flexShrink: 0, marginTop: 1 }} />Homeowners see this ProPass when {p.name.split(' ')[0]} is assigned to their job — name, badge, and verification status. Numbers stay private.</div>
      </Body>
    </Screen>
  );
}

Object.assign(window, { BriefcaseScreen, ProPassScreen, PROPASSES });
