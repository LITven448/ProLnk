// prolnk-screens-core.jsx — Offer Feed, Offer Detail, Earnings, Active Jobs
const { useState: useStateC } = React;

// ════════════════════════════════════════════════════════════
// OFFER CARD
// ════════════════════════════════════════════════════════════
function OfferCard({ offer, onOpen, onAccept, onPass }) {
  return (
    <Card pad={0} style={{ overflow: 'hidden', marginBottom: 12, borderColor: offer.urgent ? '#FCA5A5' : PL.border, boxShadow: offer.urgent ? '0 1px 0 rgba(220,38,38,0.04)' : 'none' }}>
      {offer.urgent && (
        <div style={{ background: PL.redBg, color: PL.red, fontSize: 11.5, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #FECACA', whiteSpace: 'nowrap' }}>
          <Ic name="flame" size={14} fill color={PL.red} /> Urgent · active leak
        </div>
      )}
      <div onClick={onOpen} style={{ padding: 16, cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <TradeChip trade={offer.trade} />
          <Countdown minutes={offer.expiresInMins} compact />
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: PL.ink, letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: 7 }}>{offer.title}</div>
        <div style={{ fontSize: 13.5, color: PL.muted, lineHeight: 1.5, marginBottom: 13, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{offer.scope}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, fontSize: 12.5, color: PL.slate3, fontWeight: 600 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic name="pin" size={14} color={PL.faint} />{offer.neighborhood} · {offer.zip}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: PL.faint }}>{offer.distanceMi} mi</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 13, borderTop: `1px solid ${PL.border2}` }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: PL.faint, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 2 }}>Est. job value</div>
            <div style={{ fontSize: 23, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>${fmt(offer.estLow)}–${fmt(offer.estHigh)}</div>
            <div style={{ fontSize: 12, color: PL.faint, marginTop: 3, fontWeight: 500 }}>you set the quote</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: PL.faint, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 2 }}>Homeowner</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: PL.slate3 }}>{offer.homeowner}</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 9, padding: '0 16px 16px' }}>
        <Btn tone="outline" onClick={() => onPass(offer.id)} style={{ flex: 1 }}><Ic name="x" size={17} color={PL.muted} /> Pass</Btn>
        <Btn tone="teal" onClick={() => onAccept(offer.id)} style={{ flex: 2 }}><Ic name="check" size={18} color="#fff" /> Claim referral</Btn>
      </div>
    </Card>
  );
}

// ════════════════════════════════════════════════════════════
// OFFER FEED
// ════════════════════════════════════════════════════════════
function OfferFeed({ offers, onOpen, onAccept, onPass, onBell, unread = 0 }) {
  const [filter, setFilter] = useStateC('All');
  const pending = offers.filter(o => o.status === 'pending');
  const filtered = pending.filter(o => filter === 'All' ? true : filter === 'Urgent' ? o.urgent : o.trade === filter);
  const totalVal = pending.reduce((s, o) => s + o.pay, 0);
  const chips = ['All', 'Urgent', 'Plumbing', 'Drain'];

  return (
    <Screen>
      <Header sub={`Good morning, ${PRO.first}`} title="Referrals"
        right={<button onClick={onBell} style={{ position: 'relative', border: 'none', background: '#F1F5F9', width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Ic name="bell" size={20} color={PL.slate3} />
          {unread > 0 && <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 17, height: 17, borderRadius: 99, background: PL.red, border: '2px solid #fff', color: '#fff', fontSize: 9.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>{unread}</span>}
        </button>}>
        <div style={{ display: 'flex', gap: 8, padding: '0 18px 14px', overflowX: 'auto' }}>
          {chips.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              flexShrink: 0, padding: '7px 14px', borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              border: 'none', background: filter === c ? PL.slate : '#F1F5F9', color: filter === c ? '#fff' : PL.slate3,
              display: 'inline-flex', alignItems: 'center', gap: 5,
            }}>{c === 'Urgent' && <Ic name="flame" size={13} fill color={filter === c ? '#fff' : PL.red} />}{c}</button>
          ))}
        </div>
      </Header>
      <Body>
        {/* storm alert — auto-generated leads */}
        {STORM.active && pending.some(o => o.storm) && (
          <div style={{ background: 'linear-gradient(120deg, #7C2D12, #B45309)', borderRadius: 14, padding: '13px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -10, width: 90, height: 90, borderRadius: 99, background: 'radial-gradient(circle, rgba(251,191,36,0.35), transparent 70%)' }} />
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}><Ic name="storm" size={20} color="#FDE68A" /></div>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', lineHeight: 1.15 }}>{STORM.kind} · {STORM.zips.join(', ')}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2, lineHeight: 1.4 }}>{STORM.note}</div>
            </div>
          </div>
        )}

        {pending.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: PL.tealBg, border: `1px solid ${PL.tealSoft}`, borderRadius: 14, padding: '12px 16px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: PL.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="bolt" size={20} fill color="#fff" /></div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: PL.tealDark, lineHeight: 1.1 }}>{pending.length} referrals matched to you</div>
                <div style={{ fontSize: 12.5, color: PL.teal, fontWeight: 600, marginTop: 1 }}>Reach out & send your quote · no bidding</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: PL.tealDark, letterSpacing: '-0.02em' }}><Money value={totalVal} /></div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: PL.teal, textTransform: 'uppercase', letterSpacing: '0.04em' }}>est. value</div>
            </div>
          </div>
        )}

        {filtered.length > 0 ? filtered.map(o => (
          <OfferCard key={o.id} offer={o} onOpen={() => onOpen(o.id)} onAccept={onAccept} onPass={onPass} />
        )) : (
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ width: 72, height: 72, borderRadius: 22, background: '#fff', border: `1px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <Ic name="check" size={32} color={PL.teal} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: PL.ink, marginBottom: 8 }}>{pending.length === 0 ? 'You’re all caught up' : `No ${filter.toLowerCase()} referrals`}</div>
            <div style={{ fontSize: 14, color: PL.muted, lineHeight: 1.55, maxWidth: 280, margin: '0 auto 22px' }}>No referrals waiting right now. Want more? Expand your service areas or keep your response time fast — both push you up in matching.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, maxWidth: 260, margin: '0 auto' }}>
              <Btn tone="slate" full><Ic name="plus" size={17} color="#fff" /> Add a service area</Btn>
              <Btn tone="outline" full>How matching works</Btn>
            </div>
          </div>
        )}
      </Body>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// OFFER DETAIL  (overlay)
// ════════════════════════════════════════════════════════════
function OfferDetail({ offer, accepted, onAccept, onPass, onBack, onGotoJobs, onQuote }) {
  if (!offer) return null;
  return (
    <Screen bg="#fff">
      <Header onBack={onBack} sub={`Referral ${offer.id}`} title={offer.title} />
      <Body style={{ padding: '16px 16px 130px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
          <Countdown minutes={offer.expiresInMins} />
          {offer.urgent && <Badge tone="red"><Ic name="flame" size={12} fill color={PL.red} />Urgent</Badge>}
          <Badge tone="teal">{offer.trade}</Badge>
        </div>

        {/* photos */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto' }}>
          {offer.photos.map((c, i) => (
            <div key={i} style={{ flexShrink: 0, width: 132, height: 100, borderRadius: 13, background: `linear-gradient(135deg, ${c}, ${c}dd)`, display: 'flex', alignItems: 'flex-end', padding: 8, position: 'relative' }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.3)', padding: '2px 7px', borderRadius: 6 }}>Homeowner photo {i + 1}</span>
            </div>
          ))}
        </div>

        {/* est job value */}
        <Card style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Estimated job value</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', lineHeight: 1.1 }}>${fmt(offer.estLow)}–${fmt(offer.estHigh)}</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 12.5, color: PL.teal, fontWeight: 700, maxWidth: 120, lineHeight: 1.4 }}>You set the quote when you reach out</div>
        </Card>

        {/* AI findings */}
        <SectionLabel>AI-detected findings</SectionLabel>
        <Card style={{ marginBottom: 18, padding: '4px 16px' }}>
          {offer.findings.map((f, i) => <KV key={i} k={f.label} v={f.value} last={i === offer.findings.length - 1} />)}
        </Card>

        {/* scope */}
        <SectionLabel>Scope</SectionLabel>
        <div style={{ fontSize: 14.5, color: PL.body, lineHeight: 1.6, marginBottom: 18 }}>{offer.scope}</div>

        {/* location / contact */}
        <SectionLabel>Location & homeowner</SectionLabel>
        <Card style={{ padding: '4px 16px', marginBottom: 8 }}>
          <KV k="Area" v={`${offer.neighborhood}, ${offer.city} ${offer.zip}`} />
          <KV k="Distance" v={`${offer.distanceMi} mi from you`} />
          <KV k="Homeowner" v={offer.homeowner} />
          <KV k="Full address" v={accepted ? offer.address || `1408 Kinney Ave, ${offer.city}` : <span style={{ color: PL.faint }}>Revealed when you claim</span>} />
          <KV k="Contact" v={accepted ? <span style={{ color: PL.teal }}>In-app chat & calls</span> : <span style={{ color: PL.faint }}>Unlocks when you claim</span>} last />
        </Card>
        {!accepted && <div style={{ fontSize: 12.5, color: PL.faint, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}><Ic name="shield" size={14} color={PL.faint} />All contact happens in-app — phone numbers are never shared, both ways.</div>}

        {accepted && (
          <Card style={{ background: PL.tealBg, borderColor: PL.tealSoft, marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <Ic name="check" size={20} color={PL.teal} /><span style={{ fontSize: 15.5, fontWeight: 800, color: PL.tealDark }}>Referral claimed — send your quote</span>
            </div>
            <div style={{ display: 'flex', gap: 9 }}>
              <Btn tone="outline" style={{ flex: 1 }}><Ic name="msg" size={17} color={PL.slate3} />Chat in app</Btn>
              <Btn tone="teal" style={{ flex: 1.5 }} onClick={onQuote}><Ic name="bolt" size={16} fill color="#fff" />Send quote</Btn>
            </div>
          </Card>
        )}
      </Body>

      {/* sticky action bar */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 16px 30px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${PL.border}`, zIndex: 20 }}>
        {accepted ? (
          <Btn tone="teal" full size="lg" onClick={onQuote}><Ic name="bolt" size={18} fill color="#fff" />Send your quote <Ic name="chevR" size={18} color="#fff" /></Btn>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn tone="outline" onClick={() => onPass(offer.id)} style={{ flex: 1 }} size="lg"><Ic name="x" size={18} color={PL.muted} />Pass</Btn>
            <Btn tone="teal" onClick={() => onAccept(offer.id)} style={{ flex: 2 }} size="lg"><Ic name="check" size={19} color="#fff" />Claim referral</Btn>
          </div>
        )}
      </div>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// EARNINGS DASHBOARD
// ════════════════════════════════════════════════════════════
function Earnings({ onScout, onTier, onAnalytics, scoutActive = true }) {
  const E = EARNINGS;
  const streamTotal = E.streams.reduce((s, x) => s + x.amount, 0);
  return (
    <Screen>
      {/* slate hero */}
      <div style={{ background: PL.slate, paddingTop: 52, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -30, width: 180, height: 180, borderRadius: 99, background: 'radial-gradient(circle, rgba(13,148,136,0.35), transparent 70%)' }} />
        <div style={{ padding: '8px 20px 20px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Earnings · {E.monthLabel}</span>
            <Badge tone="green" solid><Ic name="arrowUp" size={12} color="#fff" />{E.monthDelta}% MoM</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginBottom: 4 }}>This month</div>
              <div style={{ fontSize: 44, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}><CountUp value={E.month} /></div>
            </div>
            <div style={{ marginBottom: 4 }}><Sparkline data={E.spark} w={108} h={48} color="#5EEAD4" /></div>
          </div>
          <button onClick={onAnalytics} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', marginTop: 16, padding: '10px 0', borderRadius: 11, border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
            <Ic name="arrowUp" size={15} color="#5EEAD4" />View analytics · weeks, months, years
          </button>
        </div>
      </div>

      <Body>
        {/* 3 stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: PL.border, borderRadius: 16, overflow: 'hidden', border: `1px solid ${PL.border}`, marginBottom: 18 }}>
          {[['Lifetime', <Money value={E.lifetime} />, null], ['Pending', <Money value={E.pending} />, 'in escrow'], ['Next payout', E.nextPayout.split(',')[0], E.nextPayout.split(',')[1]]].map(([l, v, s], i) => (
            <div key={i} style={{ background: '#fff', padding: '14px 12px' }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 6 }}>{l}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>{v}</div>
              {s && <div style={{ fontSize: 11, color: PL.faint, marginTop: 3 }}>{s}</div>}
            </div>
          ))}
        </div>

        {/* streams */}
        <SectionLabel>Where it comes from</SectionLabel>
        <Card style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', height: 12, borderRadius: 99, overflow: 'hidden', marginBottom: 16 }}>
            {E.streams.map(s => <div key={s.key} style={{ width: `${s.amount / streamTotal * 100}%`, background: s.color }} />)}
          </div>
          {E.streams.map((s, i) => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 0', borderBottom: i === E.streams.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: PL.ink, lineHeight: 1.2 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: PL.faint, marginTop: 1 }}>{s.note}</div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: PL.ink, letterSpacing: '-0.01em' }}><Money value={s.amount} /></div>
            </div>
          ))}
        </Card>

        {/* tier progress */}
        <SectionLabel>Your tier</SectionLabel>
        <Card onClick={onTier} style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: PL.slate, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="bolt" size={22} fill color="#5EEAD4" /></div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: PL.ink, lineHeight: 1.1 }}>Pro tier</div>
                <div style={{ fontSize: 12.5, color: PL.muted, fontWeight: 600 }}>Priority matching · 8 ZIPs · 2 seats · $149/mo</div>
              </div>
            </div>
            <Ic name="chevR" size={20} color={PL.faint} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>
            <span style={{ color: PL.slate3 }}>Progress to Business tier</span>
            <span style={{ color: PL.teal, whiteSpace: 'nowrap' }}>{PRO.matchesThisTier} / {PRO.matchesNeeded} matches</span>
          </div>
          <Progress value={PRO.matchesThisTier} max={PRO.matchesNeeded} />
          <div style={{ fontSize: 12, color: PL.faint, marginTop: 9 }}>2 more wins unlocks <b style={{ color: PL.slate3 }}>Top priority</b> + Scout included.</div>
        </Card>

        {/* payout history */}
        <SectionLabel action="Stripe ✓ connected">Payout history</SectionLabel>
        <Card style={{ padding: '4px 16px', marginBottom: 18 }}>
          {E.payouts.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i === E.payouts.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: PL.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="check" size={17} color={PL.green} /></div>
                <div><div style={{ fontSize: 14, fontWeight: 700, color: PL.ink }}>Payout</div><div style={{ fontSize: 12, color: PL.faint }}>{p.date} · Stripe</div></div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: PL.green }}><Money value={p.amount} sign /></div>
            </div>
          ))}
        </Card>

        {scoutActive ? (
        <Card onClick={onScout} style={{ background: 'linear-gradient(135deg, #1E1B4B, #312E81)', borderColor: 'transparent', display: 'flex', alignItems: 'center', gap: 13, cursor: 'pointer' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="scout" size={22} color="#C4B5FD" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>Scout is earning <Money value={SCOUT.monthIncome} /> this month</div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>3 properties · recurring origination income</div>
          </div>
          <Ic name="chevR" size={20} color="rgba(255,255,255,0.5)" />
        </Card>
        ) : (
        <Card onClick={onScout} style={{ background: 'linear-gradient(135deg, #1E1B4B, #312E81)', borderColor: 'transparent', display: 'flex', alignItems: 'center', gap: 13, cursor: 'pointer' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="lock" size={20} color="#C4B5FD" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>Unlock a 3rd income stream</div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Scout add-on · recurring origination · $49/mo</div>
          </div>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: '#C4B5FD', whiteSpace: 'nowrap' }}>Add →</span>
        </Card>
        )}
      </Body>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// ACTIVE JOBS / HISTORY
// ════════════════════════════════════════════════════════════
function ActiveJobs({ jobs, onComplete, onQuote, onVisit }) {
  const [tab, setTab] = useStateC('active');
  const active = jobs.filter(j => j.status === 'active');
  const done = jobs.filter(j => j.status === 'done');
  const totalKept = done.reduce((s, j) => s + (j.kept || 0), 0);

  return (
    <Screen>
      <Header title="Jobs" sub="Active & history">
        <div style={{ display: 'flex', gap: 6, padding: '0 16px 12px' }}>
          {[['active', `Active · ${active.length}`], ['done', `Completed · ${done.length}`]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ flex: 1, padding: '9px', borderRadius: 11, border: 'none', cursor: 'pointer', fontSize: 13.5, fontWeight: 700, background: tab === k ? PL.slate : '#F1F5F9', color: tab === k ? '#fff' : PL.slate3 }}>{l}</button>
          ))}
        </div>
      </Header>
      <Body>
        {tab === 'active' ? (
          active.length ? active.map(j => (
            <Card key={j.id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {(() => { const m = { claimed: ['amber', 'Book site visit'], visit: ['teal', 'Visit booked'], quote_sent: ['amber', 'Quote sent'], in_progress: ['amber', 'In progress'], scheduled: ['teal', 'Scheduled'] }; const [tn, lb] = m[j.stage] || ['teal', 'Active']; return <Badge tone={tn}>{lb}</Badge>; })()}
                    <span style={{ fontSize: 12, color: PL.faint, fontWeight: 600 }}>{j.id}</span>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: PL.ink, lineHeight: 1.2 }}>{j.title}</div>
                  <div style={{ fontSize: 13, color: PL.muted, marginTop: 3 }}>{j.homeowner} · {j.scheduledFor}</div>
                </div>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: 19, fontWeight: 800, color: PL.green }}><Money value={j.pay} /></div></div>
              </div>

              {/* timeline */}
              <div style={{ margin: '14px 0 4px' }}>
                {j.timeline.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'center', paddingBottom: i === j.timeline.length - 1 ? 0 : 11, position: 'relative' }}>
                    {i < j.timeline.length - 1 && <div style={{ position: 'absolute', left: 9, top: 19, bottom: 0, width: 2, background: t.done ? PL.teal : PL.border }} />}
                    <div style={{ width: 19, height: 19, borderRadius: 99, flexShrink: 0, zIndex: 1, background: t.done ? PL.teal : '#fff', border: t.done ? 'none' : `2px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.done && <Ic name="check" size={12} color="#fff" sw={3} />}</div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13.5, fontWeight: t.done ? 600 : 500, color: t.done ? PL.ink : PL.faint }}>{t.label}</span>
                      {t.at && <span style={{ fontSize: 12, color: PL.faint }}>{t.at}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
                <Btn tone="ghost" size="sm" style={{ flex: 1 }}><Ic name="msg" size={15} color={PL.slate3} />Chat</Btn>
                {j.stage === 'claimed' && <Btn tone="teal" size="sm" style={{ flex: 1.7 }} onClick={() => onVisit && onVisit(j.id)}><Ic name="clock" size={15} color="#fff" />Schedule visit</Btn>}
                {j.stage === 'visit' && <Btn tone="teal" size="sm" style={{ flex: 1.7 }} onClick={() => onQuote && onQuote(j.id)}><Ic name="bolt" size={15} fill color="#fff" />Send quote</Btn>}
                {j.stage === 'quote_sent' && <Btn tone="ghost" size="sm" style={{ flex: 1.7 }} disabled><Ic name="clock" size={15} color={PL.amber} />Awaiting reply</Btn>}
                {(j.stage === 'scheduled' || j.stage === 'in_progress') && <Btn tone="green" size="sm" style={{ flex: 1.6 }} onClick={() => onComplete(j.id)}><Ic name="check" size={16} color="#fff" />Complete</Btn>}
              </div>
            </Card>
          )) : <Empty label="No active jobs" sub="Claim a referral from your feed and it shows up here." />
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: PL.greenBg, border: `1px solid ${PL.greenSoft}`, borderRadius: 14, padding: '13px 16px', marginBottom: 14 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: '#15803D' }}>Collected from {done.length} completed jobs — your prices</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: PL.green }}><Money value={totalKept} /></span>
            </div>
            {done.map(j => (
              <Card key={j.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 13 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: PL.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="wrench" size={20} color={PL.green} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: PL.ink, lineHeight: 1.2 }}>{j.title}</div>
                  <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 2, display: 'flex', alignItems: 'center', gap: 7 }}>{j.homeowner} · {j.completed}<span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: PL.amber }}><Ic name="star" size={12} fill color={PL.amber} />{j.rated}.0</span></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: PL.green }}><Money value={j.kept} /></div>
                  <div style={{ fontSize: 11, color: PL.faint }}>your quote · paid in full</div>
                </div>
              </Card>
            ))}
          </>
        )}
      </Body>
    </Screen>
  );
}

function Empty({ label, sub }) {
  return (
    <div style={{ textAlign: 'center', padding: '52px 24px' }}>
      <div style={{ width: 64, height: 64, borderRadius: 20, background: '#fff', border: `1px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Ic name="jobs" size={28} color={PL.faint} /></div>
      <div style={{ fontSize: 17, fontWeight: 800, color: PL.ink, marginBottom: 7 }}>{label}</div>
      <div style={{ fontSize: 14, color: PL.muted, maxWidth: 260, margin: '0 auto', lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
}

Object.assign(window, { OfferFeed, OfferDetail, Earnings, ActiveJobs, OfferCard, Empty });
