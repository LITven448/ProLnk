// prolnk-screens-growth.jsx — My Network, Scout, Profile
const { useState: useStateG } = React;

// ════════════════════════════════════════════════════════════
// MY NETWORK
// ════════════════════════════════════════════════════════════
function Network({ onInvite }) {
  const N = NETWORK;
  const [copied, setCopied] = useStateG(false);
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };
  return (
    <Screen>
      <Header title="My Network" sub="Referral income" />
      <Body>
        {/* hero earnings */}
        <Card style={{ background: PL.slate, borderColor: 'transparent', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -20, width: 140, height: 140, borderRadius: 99, background: 'radial-gradient(circle, rgba(13,148,136,0.4), transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Network income earned</div>
            <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: '4px 0 2px' }}><Money value={N.totalEarned} /></div>
            <div style={{ fontSize: 13, color: '#5EEAD4', fontWeight: 600 }}><Money value={N.monthEarned} sign /> this month · {N.active} active pros</div>
          </div>
        </Card>

        {/* founding network cohort */}
        {PRO.founding && (
          <Card style={{ marginBottom: 16, display: 'flex', gap: 13, alignItems: 'flex-start', background: PL.amberBg, borderColor: PL.amberSoft }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: PL.amber, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="award" size={20} color="#fff" /></div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14.5, fontWeight: 800, color: '#92400E' }}>Founding Network member</span>
              </div>
              <div style={{ fontSize: 12.5, color: '#B45309', marginTop: 3, lineHeight: 1.5 }}>You joined through a founding-network referral — everyone you bring in joins the founding network too. Pros who find ProLnk on their own join as regular members.</div>
            </div>
          </Card>
        )}

        {/* referral link */}
        <SectionLabel>Your invite link</SectionLabel>
        <Card style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: PL.bg, border: `1px solid ${PL.border}`, borderRadius: 11, padding: '11px 13px', marginBottom: 11 }}>
            <Ic name="share" size={18} color={PL.teal} />
            <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: PL.slate3, letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{N.link}</span>
            <button onClick={copy} style={{ border: 'none', background: copied ? PL.green : PL.slate, color: '#fff', fontSize: 12.5, fontWeight: 700, padding: '7px 12px', borderRadius: 9, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Ic name={copied ? 'check' : 'copy'} size={14} color="#fff" />{copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <Btn tone="teal" full onClick={onInvite}><Ic name="plus" size={18} color="#fff" />Invite a pro</Btn>
          <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 10, textAlign: 'center', lineHeight: 1.5 }}>Every pro you bring earns you a share of their work — across 4 levels deep.</div>
        </Card>

        {/* level breakdown */}
        <SectionLabel>Income by level</SectionLabel>
        <Card style={{ marginBottom: 18, padding: '6px 16px' }}>
          {N.levels.map((lv, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i === N.levels.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: lv.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: lv.tone }}>{lv.rate}%</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: PL.ink }}>{lv.name}</div>
                <div style={{ fontSize: 12, color: PL.faint }}>L{lv.depth} · {lv.label} · {lv.count} pros</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: PL.ink }}><Money value={lv.earned} /></div>
            </div>
          ))}
        </Card>

        {/* recruits */}
        <SectionLabel>Pros you recruited</SectionLabel>
        {N.recruits.map((r, i) => (
          <Card key={i} style={{ marginBottom: 9, display: 'flex', alignItems: 'center', gap: 12, opacity: r.active ? 1 : 0.65 }}>
            <Avatar initials={r.initials} size={42} tone={['#0D9488', '#7C3AED', '#D97706', '#0EA5E9'][i % 4]} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: PL.ink }}>{r.name}</div>
              <div style={{ fontSize: 12.5, color: PL.muted, marginTop: 1 }}>{r.trade} · {r.jobs} jobs · {r.active ? <span style={{ color: PL.green, fontWeight: 700 }}>Active</span> : <span style={{ color: PL.faint }}>Inactive</span>}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: PL.teal }}><Money value={r.earned} /></div>
              <div style={{ fontSize: 11, color: PL.faint }}>earned you</div>
            </div>
          </Card>
        ))}
      </Body>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// SCOUT
// ════════════════════════════════════════════════════════════
function Scout({ onAdd, active = true, onActivate }) {
  const S = SCOUT;
  if (!active) return (
    <Screen>
      <Header title="Scout" sub="Add-on · $49/mo" />
      <Body>
        <Card style={{ background: 'linear-gradient(135deg, #1E1B4B, #312E81)', borderColor: 'transparent', marginBottom: 16, position: 'relative', overflow: 'hidden', textAlign: 'center', padding: '26px 20px' }}>
          <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: 99, background: 'radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ width: 56, height: 56, borderRadius: 17, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}><Ic name="lock" size={26} color="#C4B5FD" /></div>
            <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>Become a Scout.<br />Quote it. Build the team. Get your cut.</div>
            <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, margin: '10px auto 0', maxWidth: 290 }}>Scouts are the generalists of ProLnk. When a homeowner needs a big multi-trade job — a remodel, a renovation, a repair list — the Scout scopes and quotes the whole thing, posts each trade piece to the job board, builds the team like a project manager, and takes a cut off the top.</div>
          </div>
        </Card>

        {[['network', '#7C3AED', '#EDE9FE', 'Run multi-trade projects', 'Quote the whole job, post the pieces to the job board, and manage the team of pros through completion — your cut comes off the top of the quote.'],
          ['doc', '#0D9488', '#CCFBF1', 'Document homes · full check-ups', 'Photograph the water heater, roof, HVAC, appliances — everything. Your upload raises the home’s Home Score and feeds your quote at the same time.'],
          ['earnings', '#16A34A', '#DCFCE7', 'Work from agents & inspectors', 'Real-estate agents send pre-closing repair lists; inspectors send reports. You scope it, price it, and staff it — they share in the referral where permitted.']].map(([ic, fg, bg, t, s], i) => (
          <Card key={i} style={{ marginBottom: 10, display: 'flex', gap: 13, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={ic} size={20} color={fg} /></div>
            <div><div style={{ fontSize: 14.5, fontWeight: 800, color: PL.ink }}>{t}</div><div style={{ fontSize: 12.5, color: PL.muted, lineHeight: 1.5, marginTop: 2 }}>{s}</div></div>
          </Card>
        ))}

        <div style={{ marginTop: 16 }}>
          <Btn tone="teal" full size="lg" onClick={onActivate}><Ic name="scout" size={18} color="#fff" />Add Scout · $49/mo</Btn>
          <div style={{ textAlign: 'center', fontSize: 12, color: PL.faint, marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Ic name="globe" size={13} color={PL.faint} />Billed on the web · no app-store fees · cancel anytime</div>
        </div>
      </Body>
    </Screen>
  );
  return (
    <Screen>
      <Header title="Scout" sub="Origination income" />
      <Body>
        <Card style={{ background: 'linear-gradient(135deg, #1E1B4B, #312E81)', borderColor: 'transparent', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: 99, background: 'radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Ic name="scout" size={20} color="#C4B5FD" />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Recurring origination</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}><Money value={S.monthIncome} /></div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>this month · <Money value={S.lifetimeIncome} /> lifetime</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#C4B5FD' }}>{S.properties}</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>properties</div>
              </div>
            </div>
          </div>
        </Card>

        {/* how it works */}
        <div style={{ background: '#fff', border: `1px solid ${PL.border}`, borderRadius: 14, padding: '14px 16px', marginBottom: 18, display: 'flex', gap: 11 }}>
          <Ic name="bolt" size={20} fill color="#7C3AED" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 13, color: PL.body, lineHeight: 1.55 }}><b style={{ color: PL.ink }}>What’s a Scout?</b> While you’re at a home for any job, you register the property onto ProLnk — its systems, their age, what’s coming due. That makes you its <b style={{ color: PL.ink }}>originator, permanently</b>: every job the home ever books through ProLnk — any trade, any pro — pays you an origination share.</div>
        </div>

        <SectionLabel action="+ Add property" onAction={onAdd}>Your properties</SectionLabel>
        {S.homes.map((h, i) => (
          <Card key={i} style={{ marginBottom: 11 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 11 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="pin" size={20} color="#7C3AED" /></div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: PL.ink }}>{h.addr}</div>
                  <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 1 }}>{h.city} · since {h.onboarded}</div>
                </div>
              </div>
              <Sparkline data={h.trend} w={64} h={32} color="#7C3AED" fill={false} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 11, borderTop: `1px solid ${PL.border2}` }}>
              <span style={{ fontSize: 12.5, color: PL.muted, fontWeight: 600 }}>{h.jobs} jobs originated</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#7C3AED' }}><Money value={h.lifetime} /> earned</span>
            </div>
          </Card>
        ))}

        <Btn tone="outline" full size="lg" onClick={onAdd} style={{ marginTop: 6, borderStyle: 'dashed' }}><Ic name="plus" size={18} color={PL.slate3} />Onboard another property</Btn>
      </Body>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// PROFILE / SETTINGS
// ════════════════════════════════════════════════════════════
function Profile({ onTier, onScout, onRestart, onStatus, onIntegrations, onTrust, onBriefcase, bgStatus, licenses, extras }) {
  return (
    <Screen>
      <Header title="Business" sub="Profile & settings" />
      <Body>
        {/* gamified TrustyPro status */}
        {onStatus && <StatusBanner bgStatus={bgStatus || 'clear'} licenses={licenses || [{ kind: 'License' }]} extras={extras || {}} onOpen={onStatus} />}

        {/* identity card */}
        <Card style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <Avatar initials={PRO.initials} size={56} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: PL.ink, lineHeight: 1.1 }}>{PRO.business}</div>
              <div style={{ fontSize: 13.5, color: PL.muted, marginTop: 2 }}>{PRO.name} · {PRO.city}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5 }}>
                <Ic name="star" size={14} fill color={PL.amber} />
                <span style={{ fontSize: 13, fontWeight: 700, color: PL.ink }}>{PRO.rating}</span>
                <span style={{ fontSize: 12.5, color: PL.faint }}>({PRO.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: PL.border, borderRadius: 12, overflow: 'hidden', border: `1px solid ${PL.border}` }}>
            {[['Response', `${PRO.responseRate}%`], ['Avg accept', `${PRO.responseMins}m`], ['Tier', PRO.tier]].map(([l, v], i) => (
              <div key={i} style={{ background: '#fff', padding: '11px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: PL.ink }}>{v}</div>
                <div style={{ fontSize: 10.5, color: PL.faint, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* work style + portfolio */}
        <SectionLabel>Work style</SectionLabel>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {[['Solo', true], ['Crew', false], ['Scout', true]].map(([w, on]) => (
            <span key={w} style={{ flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 12, fontSize: 13.5, fontWeight: 700, border: `1.5px solid ${on ? PL.teal : PL.border}`, background: on ? PL.tealBg : '#fff', color: on ? PL.tealDark : PL.faint }}>{w}{on ? ' ✓' : ''}</span>
          ))}
        </div>

        <SectionLabel action="+ Add photo">Portfolio</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 18 }}>
          {[['#0F766E', 'Water heater install'], ['#334155', 'Repipe — Zilker'], ['#475569', 'Master bath rough-in']].map(([c, label], i) => (
            <div key={i} style={{ aspectRatio: '1', borderRadius: 12, background: `linear-gradient(135deg, ${c}, ${c}cc)`, display: 'flex', alignItems: 'flex-end', padding: 7 }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,0.9)', background: 'rgba(0,0,0,0.35)', padding: '2px 6px', borderRadius: 5, lineHeight: 1.25 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* reviews received */}
        <SectionLabel action={`${PRO.rating} ★ · ${PRO.reviews}`}>Reviews received</SectionLabel>
        {REVIEWS.map((r, i) => (
          <Card key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 13.5, fontWeight: 800, color: PL.ink }}>{r.who}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12.5, fontWeight: 700, color: PL.amber }}>{Array.from({ length: r.stars }).map((_, j) => <Ic key={j} name="star" size={12} fill color={PL.amber} />)}<span style={{ color: PL.faint, fontWeight: 600, marginLeft: 4 }}>{r.when}</span></span>
            </div>
            <div style={{ fontSize: 13.5, color: PL.body, lineHeight: 1.55 }}>{r.text}</div>
          </Card>
        ))}
        <div style={{ height: 8 }} />

        {/* verification */}
        <SectionLabel>Verification</SectionLabel>
        <Card style={{ marginBottom: 18, padding: '4px 16px' }}>
          <SettingRow icon="shield" iconBg={PL.greenBg} iconColor={PL.green} title="Background check" detail={<Badge tone="green"><Ic name="check" size={11} color={PL.green} />Clear</Badge>} />
          <SettingRow icon="doc" iconBg="#EFF6FF" iconColor="#2563EB" title="License" detail={PRO.license} />
          <SettingRow icon="card" iconBg={PL.tealBg} iconColor={PL.teal} title="Stripe payouts" detail={<Badge tone="teal"><Ic name="check" size={11} color={PL.teal} />Connected</Badge>} last />
        </Card>

        {/* business */}
        <SectionLabel>Business</SectionLabel>
        <Card style={{ marginBottom: 18, padding: '4px 16px' }}>
          <SettingRow icon="wrench" iconBg="#F1F5F9" iconColor={PL.slate3} title="Trades" detail={PRO.trades.join(', ')} />
          <SettingRow icon="pin" iconBg="#F1F5F9" iconColor={PL.slate3} title="Service areas" detail={`${PRO.serviceZips.length} ZIPs`} />
          <SettingRow icon="bolt" iconBg="#F1F5F9" iconColor={PL.slate3} title="Subscription & tier" detail="Pro · $149/mo" onClick={onTier} />
          <SettingRow icon="link" iconBg="#EFF6FF" iconColor="#2563EB" title="Integrations" detail="Stripe · Housecall +" onClick={onIntegrations} />
          <SettingRow icon="briefcase" iconBg={PL.tealBg} iconColor={PL.teal} title="Digital Briefcase" detail="Compliance · 4 ProPasses" onClick={onBriefcase} />
          <SettingRow icon="scout" iconBg="#EDE9FE" iconColor="#7C3AED" title="Scout add-on" detail="Active" onClick={onScout} last />
        </Card>

        {/* prefs */}
        <SectionLabel>Preferences</SectionLabel>
        <Card style={{ marginBottom: 18, padding: '4px 16px' }}>
          <SettingRow icon="trophy" iconBg={PL.tealBg} iconColor={PL.teal} title="TrustyPro status & badges" detail="View" onClick={onStatus} />
          <SettingRow icon="bell" iconBg="#F1F5F9" iconColor={PL.slate3} title="Notifications" detail="New referrals, payouts" />
          <SettingRow icon="msg" iconBg={PL.tealBg} iconColor={PL.teal} title="Help & support" detail="Chat · tickets" onClick={() => {}} />
          <SettingRow icon="shield" iconBg={PL.amberBg} iconColor={PL.amber} title="Trust & ranking policy" detail="Annual check due Mar 2027" onClick={onTrust} />
          <SettingRow icon="globe" iconBg="#F1F5F9" iconColor={PL.slate3} title="Language" detail="English · Español" />
          <SettingRow icon="gear" iconBg="#F1F5F9" iconColor={PL.slate3} title="Account & security" last />
        </Card>

        <Btn tone="ghost" full onClick={onRestart} style={{ marginBottom: 8 }}>↻ Replay onboarding flow</Btn>
        <div style={{ textAlign: 'center', fontSize: 12, color: PL.faint, marginTop: 6 }}>ProLnk · member since {PRO.joined} · {PRO.referralCode}</div>
      </Body>
    </Screen>
  );
}

function SettingRow({ icon, iconBg, iconColor, title, detail, onClick, last }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: last ? 'none' : `1px solid ${PL.border2}`, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={icon} size={18} color={iconColor} /></div>
      <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: PL.ink }}>{title}</span>
      {typeof detail === 'string' ? <span style={{ fontSize: 13.5, color: PL.muted, fontWeight: 600 }}>{detail}</span> : detail}
      {onClick && <Ic name="chevR" size={18} color={PL.faint} />}
    </div>
  );
}

Object.assign(window, { Network, Scout, Profile, SettingRow });
