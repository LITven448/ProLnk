// prolnk-verify.jsx — verification gate: Get-verified hub, Licenses & certs, locked Referrals
const { useState: useV } = React;

// ════════════════════════════════════════════════════════════
// GET VERIFIED — the gate / checklist hub
// ════════════════════════════════════════════════════════════
function VerifyHub({ bgStatus, licenses, extras, unlocked, onStartBg, onGoLicenses, onEnter, onStatus }) {
  const done = (bgStatus !== 'unfiled' ? 1 : 0) + (licenses.length > 0 ? 1 : 0);
  const item = (icon, iconBg, iconColor, title, sub, right) =>
  <Card style={{ marginBottom: 11, display: 'flex', alignItems: 'center', gap: 13 }}>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={icon} size={21} color={iconColor} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: PL.ink, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: PL.muted, marginTop: 2 }}>{sub}</div>
      </div>
      {right}
    </Card>;

  const doneChip = <div style={{ width: 28, height: 28, borderRadius: 99, background: PL.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="check" size={16} color="#fff" sw={3} /></div>;

  return (
    <Screen>
      <Header title="Get verified" sub={`Welcome, ${PRO.first}`} />
      <Body>
        {/* gamified status */}
        {onStatus && <StatusBanner bgStatus={bgStatus} licenses={licenses} extras={extras} onOpen={onStatus} />}

        {/* status banner */}
        <div style={{ background: unlocked ? PL.greenBg : PL.amberBg, border: `1px solid ${unlocked ? PL.greenSoft : PL.amberSoft}`, borderRadius: 16, padding: 16, marginBottom: 18, display: 'flex', gap: 13, alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: unlocked ? PL.green : PL.amber, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Ic name={unlocked ? 'check' : 'shield'} size={22} color="#fff" sw={unlocked ? 2.8 : 2} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: unlocked ? '#15803D' : '#92400E', lineHeight: 1.25 }}>{unlocked ? 'You’re verified — referrals are open' : 'You’re in — referrals are locked'}</div>
            <div style={{ fontSize: 13, color: unlocked ? '#15803D' : '#92400E', opacity: 0.85, marginTop: 3, lineHeight: 1.45 }}>{unlocked ? 'Homeowner referrals are now flowing to your feed.' : 'File your background check and add a license to start receiving homeowner referrals.'}</div>
          </div>
        </div>

        {/* progress */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: PL.slate3 }}>Verification progress</span>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: unlocked ? PL.green : PL.amber }}>{done} / 2 required</span>
        </div>
        <div style={{ marginBottom: 22 }}><Progress value={done} max={2} color={unlocked ? PL.green : PL.amber} /></div>

        <SectionLabel>Required to unlock referrals</SectionLabel>
        {/* background check */}
        {item('shield',
        bgStatus === 'unfiled' ? '#F1F5F9' : bgStatus === 'clear' ? PL.greenBg : PL.amberBg,
        bgStatus === 'unfiled' ? PL.slate3 : bgStatus === 'clear' ? PL.green : PL.amber,
        'Background check',
        bgStatus === 'unfiled' ? 'Required · one-time Checkr screening' : bgStatus === 'clear' ? 'Cleared by Checkr' : 'Filed · in review — you can start now',
        bgStatus === 'unfiled' ?
        <Btn tone="slate" size="sm" onClick={onStartBg}>Start</Btn> :
        bgStatus === 'clear' ? doneChip : <Badge tone="amber">Filed</Badge>
        )}
        {/* licenses */}
        {item('doc',
        licenses.length ? PL.greenBg : '#F1F5F9',
        licenses.length ? PL.green : PL.slate3,
        'Licenses & certifications',
        licenses.length ? `${licenses.length} added · verifying` : 'Required · add at least one to take work',
        licenses.length ?
        doneChip :
        <Btn tone="slate" size="sm" onClick={onGoLicenses}>Add</Btn>
        )}

        <div style={{ height: 8 }} />
        <SectionLabel>Already done for you</SectionLabel>
        {item('bolt', PL.tealBg, PL.teal, 'Membership active', 'Pro tier · $149/mo', <Badge tone="teal"><Ic name="check" size={11} color={PL.teal} />Active</Badge>)}
        {item('card', PL.tealBg, PL.teal, 'Stripe payouts', 'Connected — ready to get paid', <Badge tone="teal"><Ic name="check" size={11} color={PL.teal} />Linked</Badge>)}

        <div style={{ marginTop: 14 }}>
          {unlocked ?
          <Btn tone="teal" full size="lg" onClick={onEnter}>Start receiving referrals <Ic name="chevR" size={18} color="#fff" /></Btn> :
          <div style={{ textAlign: 'center', fontSize: 12.5, color: PL.faint, padding: '6px 12px', lineHeight: 1.5 }}><Ic name="shield" size={15} color={PL.faint} style={{ verticalAlign: '-3px', marginRight: 5 }} />Referrals stay locked until both required steps are complete.</div>}
        </div>
      </Body>
    </Screen>);

}

// ════════════════════════════════════════════════════════════
// LICENSES & CERTIFICATIONS
// ════════════════════════════════════════════════════════════
// ══ LICENSES & CERTIFICATIONS — pros carry 3–6 credentials ══
const LICENSE_PRESETS = [
{ kind: 'Trade license', who: 'person', trade: 'Master Plumber', number: 'TX-MPL 41882', state: 'TX', expiry: 'Exp 08/2027' },
{ kind: 'Contractor license', who: 'business', trade: 'Plumbing Contractor', number: 'TX-PC 20441', state: 'TX', expiry: 'Exp 08/2027' },
{ kind: 'Endorsement', who: 'person', trade: 'Backflow Prevention', number: 'BPAT-22907', state: 'TX', expiry: 'Exp 03/2027' },
{ kind: 'Endorsement', who: 'person', trade: 'Gas Fitter', number: 'TX-GF 8834', state: 'TX', expiry: 'Exp 11/2026' },
{ kind: 'Industry cert', who: 'person', trade: 'Medical Gas (ASSE 6010)', number: 'ASSE-60455', state: 'US', expiry: 'Exp 05/2028' }];

// what the pro's trades require (state-specific — TX shown)
const TRADE_REQS = [
  { name: 'Master or Journeyman Plumber', kind: 'Trade license · the person', req: true, match: 'Master Plumber' },
  { name: 'Plumbing Contractor License', kind: 'Contractor license · the business', req: true, match: 'Plumbing Contractor' },
  { name: 'Backflow Prevention Cert', kind: 'Endorsement · to test/install backflow', req: false, match: 'Backflow Prevention' },
  { name: 'Gas Fitter License', kind: 'Endorsement · gas lines (TX separate)', req: false, match: 'Gas Fitter' },
];


function LicensesScreen({ licenses, onAdd, onBack, onContinue }) {
  const [picking, setPicking] = useV(false);
  const next = LICENSE_PRESETS[licenses.length % LICENSE_PRESETS.length];
  return (
    <Screen bg="#fff">
      <Header onBack={onBack} title="Credentials" sub="Verification" />
      <Body style={{ padding: '16px 16px 130px' }}>
        <div style={{ fontSize: 14.5, color: PL.body, lineHeight: 1.6, marginBottom: 16 }}>Most pros carry <b style={{ color: PL.ink }}>3–6 credentials</b> — a trade license for you, a contractor license for the business, plus federal certs and endorsements. Licenses and insurance are <b style={{ color: PL.ink }}>required</b> before referrals open up.</div>

        {/* what your trades require */}
        <SectionLabel>Required for Plumbing & Drain · TX</SectionLabel>
        <Card style={{ padding: '4px 16px', marginBottom: 16 }}>
          {TRADE_REQS.map((r, i) => {
            const have = licenses.some(l => (l.trade || '').includes(r.match));
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderBottom: i === TRADE_REQS.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
                <div style={{ width: 22, height: 22, borderRadius: 99, flexShrink: 0, background: have ? PL.green : '#fff', border: have ? 'none' : `2px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{have && <Ic name="check" size={13} color="#fff" sw={3} />}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: PL.ink, lineHeight: 1.25 }}>{r.name}</div>
                  <div style={{ fontSize: 11.5, color: PL.faint, marginTop: 1 }}>{r.kind}</div>
                </div>
                <Badge tone={r.req ? (have ? 'green' : 'amber') : 'slate'}>{r.req ? 'Required' : 'Boosts rank'}</Badge>
              </div>
            );
          })}
        </Card>

        {licenses.length > 0 && <SectionLabel>Added</SectionLabel>}
        {licenses.map((l, i) =>
        <Card key={i} style={{ marginBottom: 11, display: 'flex', alignItems: 'center', gap: 13 }}>
            <div style={{ width: 46, height: 46, borderRadius: 11, background: l.kind === 'Trade license' ? '#EFF6FF' : l.kind === 'Contractor license' ? PL.tealBg : '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={l.who === 'business' ? 'briefcase' : 'doc'} size={22} color={l.kind === 'Trade license' ? '#2563EB' : l.kind === 'Contractor license' ? PL.teal : '#7C3AED'} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: PL.ink }}>{l.trade}</span>
                <Badge tone={l.kind === 'Trade license' ? 'slate' : l.kind === 'Contractor license' ? 'teal' : 'purple'}>{l.kind}</Badge>
              </div>
              <div style={{ fontSize: 12.5, color: PL.muted, marginTop: 2 }}>{l.number} · {l.state} · {l.expiry}{l.who === 'business' ? ' · covers the business' : ''}</div>
            </div>
            <Badge tone="amber">Verifying</Badge>
          </Card>
        )}

        <SectionLabel>{licenses.length ? 'Add another' : 'Add your first'}</SectionLabel>
        <Card style={{ padding: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <Field label="Type"><FakeInput>{next.kind}</FakeInput></Field>
            <Field label="State"><FakeInput>{next.state}</FakeInput></Field>
          </div>
          <Field label="Name / class"><FakeInput>{next.trade}</FakeInput></Field>
          <Field label="License / cert number"><FakeInput>{next.number}</FakeInput></Field>
          {/* upload tile */}
          <div style={{ marginTop: 4, marginBottom: 16 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: PL.slate3, marginBottom: 7 }}>Upload document</div>
            <div style={{ border: `1.5px dashed ${PL.border}`, borderRadius: 12, padding: '18px 14px', display: 'flex', alignItems: 'center', gap: 12, background: PL.bg }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', border: `1px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="plus" size={20} color={PL.teal} /></div>
              <div><div style={{ fontSize: 13.5, fontWeight: 700, color: PL.slate3 }}>Tap to upload a photo or PDF</div><div style={{ fontSize: 12, color: PL.faint, marginTop: 1 }}>Front of license or certificate</div></div>
            </div>
          </div>
          <Btn tone="teal" full onClick={() => onAdd(next)}><Ic name="plus" size={18} color="#fff" />Add {next.kind.toLowerCase()}</Btn>
        </Card>

        <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 14, display: 'flex', gap: 7, lineHeight: 1.5 }}><Ic name="shield" size={15} color={PL.faint} style={{ flexShrink: 0, marginTop: 1 }} />Most licenses verify within 24 hours. State licenses are valid in their state only — federal certs (EPA 608, Lead RRP) travel with you. We track every expiry and remind you 60 days out; a lapsed credential pauses referrals for that trade.</div>
      </Body>

      {onContinue &&
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 16px 30px', background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${PL.border}` }}>
          <Btn tone={licenses.length ? 'teal' : 'ghost'} full size="lg" disabled={!licenses.length} onClick={onContinue}>{licenses.length ? 'Done — back to verification' : 'Add a license to continue'} {licenses.length ? <Ic name="chevR" size={18} color="#fff" /> : null}</Btn>
        </div>
      }
    </Screen>);

}

function Field({ label, children }) {return <div><div style={{ fontSize: 12, fontWeight: 700, color: PL.slate3, marginBottom: 6 }}>{label}</div>{children}</div>;}
function FakeInput({ children }) {return <div style={{ padding: '11px 13px', fontSize: 14, fontWeight: 600, color: PL.ink, border: `1.5px solid ${PL.border}`, borderRadius: 11, background: '#fff' }}>{children}</div>;}

// ════════════════════════════════════════════════════════════
// REFERRALS — LOCKED STATE
// ════════════════════════════════════════════════════════════
function ReferralsLocked({ bgStatus, licenses, onVerify }) {
  return (
    <Screen>
      <Header sub={`Good morning, ${PRO.first}`} title="Referrals" />
      <Body>
        <div style={{ position: 'relative' }}>
          {/* blurred faux feed behind */}
          <div style={{ filter: 'blur(5px)', opacity: 0.5, pointerEvents: 'none', userSelect: 'none' }}>
            {[0, 1].map((i) =>
            <Card key={i} style={{ marginBottom: 12, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}><div style={{ width: 90, height: 12, borderRadius: 6, background: '#E2E8F0' }} /><div style={{ width: 54, height: 12, borderRadius: 6, background: '#E2E8F0' }} /></div>
                <div style={{ width: '80%', height: 16, borderRadius: 6, background: '#E2E8F0', marginBottom: 10 }} />
                <div style={{ width: '100%', height: 11, borderRadius: 6, background: '#EEF2F6', marginBottom: 6 }} />
                <div style={{ width: '60%', height: 11, borderRadius: 6, background: '#EEF2F6', marginBottom: 16 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div style={{ width: 100, height: 22, borderRadius: 6, background: '#E2E8F0' }} /><div style={{ width: 120, height: 38, borderRadius: 11, background: '#E2E8F0' }} /></div>
              </Card>
            )}
          </div>

          {/* lock overlay */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 20 }}>
            <Card style={{ width: '100%', padding: 24, textAlign: 'center', boxShadow: '0 12px 40px rgba(15,23,42,0.12)' }}>
              <div style={{ width: 64, height: 64, borderRadius: 19, background: PL.amberBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Ic name="shield" size={32} color={PL.amber} /></div>
              <div style={{ fontSize: 19, fontWeight: 800, color: PL.ink, marginBottom: 8 }}>Referrals are locked</div>
              <div style={{ fontSize: 14, color: PL.muted, lineHeight: 1.55, marginBottom: 20 }}>You’re on the platform — but homeowner referrals only start once you’re verified. Two quick steps:</div>

              <div style={{ textAlign: 'left', marginBottom: 20 }}>
                {[['Background check filed', bgStatus !== 'unfiled'], ['At least one license added', licenses.length > 0]].map(([label, ok], i) =>
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0', borderBottom: i === 0 ? `1px solid ${PL.border2}` : 'none' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 99, flexShrink: 0, background: ok ? PL.green : '#fff', border: ok ? 'none' : `2px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ok ? <Ic name="check" size={14} color="#fff" sw={3} /> : <span style={{ width: 7, height: 7, borderRadius: 99, background: PL.amber }} />}</div>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: ok ? PL.ink : PL.slate3 }}>{label}</span>
                    {ok ? <Badge tone="green">Done</Badge> : <Badge tone="amber">Needed</Badge>}
                  </div>
                )}
              </div>

              <Btn tone="teal" full size="lg" onClick={onVerify}><Ic name="shield" size={18} color="#fff" />Finish verifying</Btn>
            </Card>
          </div>
        </div>
      </Body>
    </Screen>);

}

Object.assign(window, { VerifyHub, LicensesScreen, ReferralsLocked });