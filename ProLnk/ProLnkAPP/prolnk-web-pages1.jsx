// prolnk-web-pages1.jsx — Apply, Background check, Offers, Active jobs (desktop)
const { useState: useW1 } = React;

// ── shared desktop page head ──
function PageHead({ eyebrow, title, desc, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 28 }}>
      <div style={{ maxWidth: 640 }}>
        {eyebrow && <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: PL.teal, marginBottom: 10 }}>{eyebrow}</div>}
        <h1 style={{ fontSize: 30, fontWeight: 800, color: PL.ink, letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0 }}>{title}</h1>
        {desc && <p style={{ fontSize: 15.5, color: PL.muted, lineHeight: 1.6, margin: '12px 0 0' }}>{desc}</p>}
      </div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  );
}

function WebCard({ children, style, className = '', onClick }) {
  return <div onClick={onClick} className={'pl-card ' + className} style={{ background: '#fff', border: `1px solid ${PL.border}`, borderRadius: 18, ...style }}>{children}</div>;
}

// ════════════════════════════════════════════════════════════
// 1 · APPLY & TIER
// ════════════════════════════════════════════════════════════
function WebApply({ onNext }) {
  const [trade, setTrade] = useW1('Plumbing');
  const [tier, setTier] = useW1('Pro');
  const trades = ['Plumbing', 'Electrical', 'HVAC', 'Roofing', 'Drain', 'Remodeling'];
  return (
    <div>
      <PageHead eyebrow="Step 1 · Join ProLnk" title="Apply and choose your tier"
        desc="Tell us your trade and service area, then pick the membership that fits. Your tier sets your keep rate, how many areas you cover, and your Scout access." />

      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* tiers */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {TIERS.map(t => {
              const sel = tier === t.name;
              return (
                <button key={t.name} onClick={() => t.price && setTier(t.name)} className="pl-tier" style={{
                  textAlign: 'left', cursor: t.price ? 'pointer' : 'default', padding: 20, borderRadius: 18, position: 'relative',
                  border: `1.5px solid ${sel ? PL.teal : PL.border}`, background: sel ? PL.tealBg : '#fff', transition: 'all .15s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: PL.ink }}>{t.name}</span>
                    {t.name === 'Pro' && <Badge tone="teal">Popular</Badge>}
                    {sel && <span style={{ width: 22, height: 22, borderRadius: 99, background: PL.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="check" size={14} color="#fff" sw={3} /></span>}
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', marginBottom: 14 }}>{t.price ? <>${t.price}<span style={{ fontSize: 14, color: PL.faint, fontWeight: 600 }}>/mo</span></> : 'Custom'}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {t.perks.map((p, i) => <span key={i} style={{ fontSize: 13, color: PL.slate3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}><Ic name="check" size={15} color={PL.teal} sw={2.4} />{p}</span>)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* form */}
        <WebCard style={{ padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: PL.ink, marginBottom: 4 }}>Your business</div>
          <div style={{ fontSize: 13.5, color: PL.muted, marginBottom: 20 }}>What homeowners and our matching engine see.</div>

          <WLabel>Your trade</WLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
            {trades.map(t => (
              <button key={t} onClick={() => setTrade(t)} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', border: `1.5px solid ${trade === t ? PL.teal : PL.border}`, background: trade === t ? PL.tealBg : '#fff', color: trade === t ? PL.tealDark : PL.slate3 }}>{t}</button>
            ))}
          </div>

          <WLabel>Business name</WLabel>
          <WInput placeholder="Reyes Plumbing & Drain" />
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}><WLabel>Service ZIP</WLabel><WInput placeholder="78704" /></div>
            <div style={{ flex: 1 }}><WLabel>License #</WLabel><WInput placeholder="TX-MPL 41882" /></div>
          </div>
          <WLabel>Referral / charter code</WLabel>
          <WInput placeholder="Optional — locks your tier" />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, paddingTop: 20, borderTop: `1px solid ${PL.border2}` }}>
            <div><div style={{ fontSize: 12.5, color: PL.faint, fontWeight: 600 }}>Due today</div><div style={{ fontSize: 20, fontWeight: 800, color: PL.ink }}>${TIERS.find(t => t.name === tier)?.price}.00</div></div>
            <Btn tone="teal" size="lg" onClick={onNext}>Join as {tier} <Ic name="chevR" size={18} color="#fff" /></Btn>
          </div>
        </WebCard>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 2 · BACKGROUND CHECK
// ════════════════════════════════════════════════════════════
function WebVerify({ onNext }) {
  const [state, setState] = useW1('intro'); // intro, submitted, pending, clear
  React.useEffect(() => {
    if (state === 'submitted') { const t = setTimeout(() => setState('pending'), 1400); return () => clearTimeout(t); }
    if (state === 'pending') { const t = setTimeout(() => setState('clear'), 2400); return () => clearTimeout(t); }
  }, [state]);
  const order = ['intro', 'submitted', 'pending', 'clear'];
  const idx = order.indexOf(state);
  const stages = [['submitted', 'Identity submitted'], ['pending', 'Screening in progress'], ['clear', 'Report clear']];

  return (
    <div>
      <PageHead eyebrow="Step 2 · Join ProLnk" title="Background check"
        desc="Every ProLnk pro is screened through Checkr. It’s a one-time check that builds the homeowner trust your business runs on — most clear within minutes." />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, alignItems: 'start' }}>
        <WebCard style={{ padding: 32 }}>
          {state === 'intro' ? (
            <>
              <div style={{ width: 60, height: 60, borderRadius: 18, background: PL.tealBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}><Ic name="shield" size={32} color={PL.teal} /></div>
              <div style={{ fontSize: 21, fontWeight: 800, color: PL.ink, marginBottom: 8 }}>This is what earns homeowner trust</div>
              <div style={{ fontSize: 15, color: PL.muted, lineHeight: 1.6, marginBottom: 24, maxWidth: 460 }}>We verify identity, criminal history, and the sex-offender registry through Checkr. Your data is encrypted and never shown to homeowners.</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: PL.border, borderRadius: 14, overflow: 'hidden', border: `1px solid ${PL.border}`, marginBottom: 24 }}>
                {[['Provider', 'Checkr'], ['One-time fee', '$34.00'], ['What’s checked', 'Identity · criminal'], ['Typical result', 'Minutes – 24h']].map(([l, v], i) => (
                  <div key={i} style={{ background: '#fff', padding: '16px 18px' }}><div style={{ fontSize: 12, color: PL.faint, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 5 }}>{l}</div><div style={{ fontSize: 15, fontWeight: 700, color: PL.ink }}>{v}</div></div>
                ))}
              </div>
              <Btn tone="teal" size="lg" onClick={() => setState('submitted')}>Pay $34 & start check</Btn>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              {state === 'clear' ? (
                <div style={{ width: 84, height: 84, borderRadius: 26, background: PL.green, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px', boxShadow: '0 12px 32px rgba(22,163,74,0.3)' }}><Ic name="check" size={44} color="#fff" sw={2.6} /></div>
              ) : (
                <div style={{ width: 84, height: 84, borderRadius: 26, background: PL.amberBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 26, border: `3px solid ${PL.amberSoft}`, borderTopColor: PL.amber, animation: 'plspin .9s linear infinite' }} />
                  <Ic name="clock" size={36} color={PL.amber} />
                </div>
              )}
              <div style={{ fontSize: 22, fontWeight: 800, color: PL.ink, marginBottom: 8 }}>{state === 'clear' ? 'You’re cleared' : state === 'pending' ? 'Screening in progress' : 'Submitted to Checkr'}</div>
              <div style={{ fontSize: 14.5, color: PL.muted, maxWidth: 380, margin: '0 auto 26px', lineHeight: 1.55 }}>{state === 'clear' ? 'Your report came back clear. You’re fully verified and ready to receive offers.' : 'This usually takes a few minutes. You can move on — we’ll notify you the moment it’s done.'}</div>
              {state === 'clear' && <Btn tone="teal" size="lg" onClick={onNext}>See your first offers <Ic name="chevR" size={18} color="#fff" /></Btn>}
            </div>
          )}
        </WebCard>

        <WebCard style={{ padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Status</div>
          {stages.map(([k, label], i) => {
            const si = order.indexOf(k); const active = idx >= si; const current = state === k && k !== 'clear';
            return (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: i === stages.length - 1 ? 0 : 18, position: 'relative' }}>
                {i < stages.length - 1 && <div style={{ position: 'absolute', left: 12, top: 26, height: 18, width: 2, background: idx > si ? PL.teal : PL.border }} />}
                <div style={{ width: 26, height: 26, borderRadius: 99, flexShrink: 0, background: active ? (k === 'clear' ? PL.green : PL.teal) : '#fff', border: active ? 'none' : `2px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>{active && <Ic name="check" size={15} color="#fff" sw={3} />}</div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: active ? 700 : 500, color: active ? PL.ink : PL.faint }}>{label}</span>
                {current && <Badge tone="amber">Working…</Badge>}
              </div>
            );
          })}
          {state === 'intro' && <div style={{ marginTop: 18, fontSize: 12.5, color: PL.faint, lineHeight: 1.5, display: 'flex', gap: 7 }}><Ic name="shield" size={15} color={PL.faint} style={{ flexShrink: 0, marginTop: 1 }} />Pay once, screened for life of your membership.</div>}
        </WebCard>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 3 · OFFERS
// ════════════════════════════════════════════════════════════
function WebOfferCard({ offer, onAccept, onPass, featured }) {
  return (
    <WebCard className="pl-offer" style={{ overflow: 'hidden', borderColor: offer.urgent ? '#FCA5A5' : PL.border, gridColumn: featured ? '1 / -1' : 'auto' }}>
      <div style={{ display: featured ? 'grid' : 'block', gridTemplateColumns: featured ? '1fr 300px' : 'none' }}>
        <div style={{ padding: 22, borderRight: featured ? `1px solid ${PL.border2}` : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <TradeChip trade={offer.trade} />
            {offer.urgent && <Badge tone="red"><Ic name="flame" size={11} fill color={PL.red} />Urgent</Badge>}
            <div style={{ flex: 1 }} />
            <Countdown minutes={offer.expiresInMins} compact />
          </div>
          <div style={{ fontSize: featured ? 22 : 18, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>{offer.title}</div>
          <div style={{ fontSize: 14, color: PL.muted, lineHeight: 1.55, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: featured ? 3 : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{offer.scope}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: PL.slate3, fontWeight: 600, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}><Ic name="pin" size={15} color={PL.faint} />{offer.neighborhood} · {offer.zip}</span>
            <span style={{ color: PL.faint, whiteSpace: 'nowrap' }}>{offer.distanceMi} mi away</span>
            <span style={{ color: PL.faint, whiteSpace: 'nowrap' }}>for {offer.homeowner}</span>
          </div>
        </div>
        <div style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: featured ? PL.bg : 'transparent', borderTop: featured ? 'none' : `1px solid ${PL.border2}` }}>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Estimated pay</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: PL.green, letterSpacing: '-0.02em', lineHeight: 1 }}><Money value={offer.pay} /></div>
          <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 4, fontWeight: 500 }}>range ${fmt(offer.estLow)}–${fmt(offer.estHigh)}</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Btn tone="outline" size="sm" style={{ flex: 1 }} onClick={() => onPass(offer.id)}><Ic name="x" size={16} color={PL.muted} />Pass</Btn>
            <Btn tone="teal" size="sm" style={{ flex: 1.6 }} onClick={() => onAccept(offer.id)}><Ic name="check" size={16} color="#fff" />Accept</Btn>
          </div>
        </div>
      </div>
    </WebCard>
  );
}

function WebOffers({ offers, onAccept, onPass }) {
  const pending = offers.filter(o => o.status === 'pending');
  const featured = pending.find(o => o.urgent);
  const rest = pending.filter(o => o !== featured);
  const total = pending.reduce((s, o) => s + o.pay, 0);
  return (
    <div>
      <PageHead eyebrow="Step 3 · Work" title="Your offers"
        desc="Jobs matched to your trade, area, and tier — no bidding, no race to the bottom. Accept to lock it and unlock the homeowner’s contact."
        right={<div style={{ display: 'flex', gap: 12 }}>
          <WStat label="Matched today" value={pending.length} />
          <WStat label="Potential" value={<Money value={total} />} tone={PL.green} />
        </div>} />
      {pending.length ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {featured && <WebOfferCard offer={featured} onAccept={onAccept} onPass={onPass} featured />}
          {rest.map(o => <WebOfferCard key={o.id} offer={o} onAccept={onAccept} onPass={onPass} />)}
        </div>
      ) : (
        <WebCard style={{ padding: '60px 40px', textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: PL.tealBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Ic name="check" size={34} color={PL.teal} /></div>
          <div style={{ fontSize: 20, fontWeight: 800, color: PL.ink, marginBottom: 8 }}>You’re all caught up</div>
          <div style={{ fontSize: 15, color: PL.muted, maxWidth: 420, margin: '0 auto 24px', lineHeight: 1.6 }}>No offers waiting. Expand your service areas or keep your response time fast — both push you higher in matching.</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}><Btn tone="slate"><Ic name="plus" size={17} color="#fff" />Add a service area</Btn><Btn tone="outline">How matching works</Btn></div>
        </WebCard>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 4 · ACTIVE JOBS
// ════════════════════════════════════════════════════════════
function WebJobs({ jobs, onComplete }) {
  const [tab, setTab] = useW1('active');
  const active = jobs.filter(j => j.status === 'active');
  const done = jobs.filter(j => j.status === 'done');
  const kept = done.reduce((s, j) => s + (j.kept || 0), 0);
  return (
    <div>
      <PageHead eyebrow="Step 4 · Work" title="Active jobs"
        desc="Everything you’ve accepted. Contact the homeowner, work the job, mark it complete — that triggers your payout."
        right={<div style={{ display: 'inline-flex', background: '#fff', border: `1px solid ${PL.border}`, borderRadius: 12, padding: 4 }}>
          {[['active', `Active · ${active.length}`], ['done', `Completed · ${done.length}`]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ padding: '9px 16px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 13.5, fontWeight: 700, background: tab === k ? PL.slate : 'transparent', color: tab === k ? '#fff' : PL.slate3 }}>{l}</button>
          ))}
        </div>} />

      {tab === 'active' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {active.length ? active.map(j => (
            <WebCard key={j.id} style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                    <Badge tone={j.stage === 'in_progress' ? 'amber' : 'teal'}>{j.stage === 'in_progress' ? 'In progress' : 'Scheduled'}</Badge>
                    <span style={{ fontSize: 12.5, color: PL.faint, fontWeight: 600, whiteSpace: 'nowrap' }}>{j.id}</span>
                  </div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: PL.ink }}>{j.title}</div>
                  <div style={{ fontSize: 14, color: PL.muted, marginTop: 4 }}>{j.homeowner} · {j.address} · {j.scheduledFor}</div>
                </div>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: 24, fontWeight: 800, color: PL.green }}><Money value={j.pay} /></div><div style={{ fontSize: 12, color: PL.faint }}>you keep ${Math.round(j.pay * PRO.keepRate / 100)}</div></div>
              </div>
              {/* horizontal timeline */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 22 }}>
                {j.timeline.map((t, i) => (
                  <React.Fragment key={i}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, width: 80, flexShrink: 0 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 99, background: t.done ? PL.teal : '#fff', border: t.done ? 'none' : `2px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.done ? <Ic name="check" size={14} color="#fff" sw={3} /> : <span style={{ width: 7, height: 7, borderRadius: 99, background: PL.border }} />}</div>
                      <span style={{ fontSize: 11, fontWeight: t.done ? 700 : 500, color: t.done ? PL.slate3 : PL.faint, textAlign: 'center', lineHeight: 1.3 }}>{t.label}</span>
                    </div>
                    {i < j.timeline.length - 1 && <div style={{ flex: 1, height: 2, background: j.timeline[i + 1].done ? PL.teal : PL.border, marginTop: -18 }} />}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Btn tone="ghost" size="sm"><Ic name="phone" size={15} color={PL.slate3} />Call {j.homeowner}</Btn>
                <Btn tone="ghost" size="sm"><Ic name="msg" size={15} color={PL.slate3} />Message</Btn>
                <div style={{ flex: 1 }} />
                <Btn tone="green" size="sm" onClick={() => onComplete(j.id)}><Ic name="check" size={16} color="#fff" />Mark complete & get paid</Btn>
              </div>
            </WebCard>
          )) : <WebCard style={{ padding: '50px', textAlign: 'center', color: PL.muted }}>No active jobs — accept an offer to get started.</WebCard>}
        </div>
      ) : (
        <WebCard style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', background: PL.greenBg, borderBottom: `1px solid ${PL.greenSoft}` }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#15803D' }}>Kept from {done.length} completed jobs</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: PL.green }}><Money value={kept} /></span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ textAlign: 'left' }}>{['Job', 'Homeowner', 'Completed', 'Rating', 'Total', 'You kept'].map(h => <th key={h} style={{ fontSize: 11.5, fontWeight: 800, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '14px 22px' }}>{h}</th>)}</tr></thead>
            <tbody>{done.map((j, i) => (
              <tr key={j.id} style={{ borderTop: `1px solid ${PL.border2}` }}>
                <td style={{ padding: '16px 22px', fontSize: 14.5, fontWeight: 700, color: PL.ink }}>{j.title}</td>
                <td style={{ padding: '16px 22px', fontSize: 14, color: PL.muted }}>{j.homeowner}</td>
                <td style={{ padding: '16px 22px', fontSize: 14, color: PL.muted }}>{j.completed}</td>
                <td style={{ padding: '16px 22px' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 13.5, fontWeight: 700, color: PL.amber }}><Ic name="star" size={14} fill color={PL.amber} />{j.rated}.0</span></td>
                <td style={{ padding: '16px 22px', fontSize: 14, color: PL.muted, fontWeight: 600 }}>${j.pay}</td>
                <td style={{ padding: '16px 22px', fontSize: 15, fontWeight: 800, color: PL.green }}><Money value={j.kept} /></td>
              </tr>
            ))}</tbody>
          </table>
        </WebCard>
      )}
    </div>
  );
}

// ── small form/stat atoms ──
function WLabel({ children }) { return <div style={{ fontSize: 12.5, fontWeight: 700, color: PL.slate3, marginBottom: 7 }}>{children}</div>; }
function WInput({ placeholder }) { return <input placeholder={placeholder} style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', fontSize: 14.5, fontWeight: 600, color: PL.ink, border: `1.5px solid ${PL.border}`, borderRadius: 11, outline: 'none', marginBottom: 16, fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = PL.teal} onBlur={e => e.target.style.borderColor = PL.border} />; }
function WStat({ label, value, tone }) { return <div style={{ background: '#fff', border: `1px solid ${PL.border}`, borderRadius: 13, padding: '12px 18px', textAlign: 'right' }}><div style={{ fontSize: 11.5, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{label}</div><div style={{ fontSize: 20, fontWeight: 800, color: tone || PL.ink, letterSpacing: '-0.02em' }}>{value}</div></div>; }

Object.assign(window, { PageHead, WebCard, WebApply, WebVerify, WebOffers, WebJobs, WebOfferCard, WLabel, WInput, WStat });
