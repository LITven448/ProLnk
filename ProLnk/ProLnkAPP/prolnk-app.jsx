// prolnk-app.jsx — shell, nav, routing, state
const { useState: useStateA } = React;

// ── TIER SCREEN (overlay) ──
function TierScreen({ onBack }) {
  return (
    <Screen>
      <Header onBack={onBack} title="Membership" sub="Tiers & keep rate" />
      <Body>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: PL.tealBg, border: `1px solid ${PL.tealSoft}`, borderRadius: 14, padding: '13px 16px', marginBottom: 18 }}>
          <Ic name="bolt" size={20} fill color={PL.teal} />
          <div style={{ flex: 1 }}><div style={{ fontSize: 14.5, fontWeight: 800, color: PL.tealDark }}>You’re on Pro · 50% keep rate</div><div style={{ fontSize: 12.5, color: PL.teal, fontWeight: 600 }}>2 more matches unlocks Business</div></div>
        </div>
        {TIERS.map(t => {
          const cur = t.name === PRO.tier;
          const up = ['Business', 'Enterprise'].includes(t.name);
          return (
            <Card key={t.name} style={{ marginBottom: 12, border: `1.5px solid ${cur ? PL.teal : PL.border}`, background: cur ? PL.tealBg : '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: PL.ink }}>{t.name}</span>
                  {cur && <Badge tone="teal">Current</Badge>}
                </div>
                <span style={{ fontSize: 18, fontWeight: 800, color: PL.ink }}>{t.price ? `$${t.price}` : 'Custom'}{t.price && <span style={{ fontSize: 12.5, color: PL.faint, fontWeight: 600 }}>/mo</span>}</span>
              </div>
              <div style={{ display: 'flex', gap: 1, background: PL.border, borderRadius: 11, overflow: 'hidden', border: `1px solid ${PL.border}`, marginBottom: t.name === 'Enterprise' ? 0 : 13 }}>
                {[['Keep', `${t.keep}%`], ['Areas', `${t.areas}`], ['Scout', t.scout === true ? 'Incl.' : t.scout === 'add-on' ? 'Add-on' : '—']].map(([l, v], i) => (
                  <div key={i} style={{ flex: 1, background: cur ? PL.tealBg : '#fff', padding: '10px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: PL.ink }}>{v}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.03em', marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
              {!cur && t.name !== 'Enterprise' && <Btn tone={up ? 'teal' : 'outline'} full size="sm">{up ? `Upgrade to ${t.name}` : `Switch to ${t.name}`}</Btn>}
            </Card>
          );
        })}
      </Body>
    </Screen>
  );
}

// ── BOTTOM NAV ──
function TabBar({ tab, setTab }) {
  const tabs = [
    { k: 'offers', label: 'Referrals', icon: 'feed' },
    { k: 'jobs', label: 'Jobs', icon: 'jobs' },
    { k: 'earnings', label: 'Earnings', icon: 'earnings' },
    { k: 'network', label: 'Network', icon: 'network' },
    { k: 'profile', label: 'Business', icon: 'user' },
  ];
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 40, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(18px) saturate(180%)', borderTop: `1px solid ${PL.border}`, paddingBottom: 22 }}>
      <div style={{ display: 'flex', padding: '8px 6px 4px' }}>
        {tabs.map(t => {
          const on = tab === t.k;
          return (
            <button key={t.k} onClick={() => setTab(t.k)} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '4px 0', WebkitTapHighlightColor: 'transparent' }}>
              <Ic name={t.icon} size={24} color={on ? PL.teal : '#94A3B8'} sw={on ? 2.2 : 1.9} fill={false} />
              <span style={{ fontSize: 10.5, fontWeight: on ? 800 : 600, color: on ? PL.teal : '#94A3B8', letterSpacing: '0.01em' }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── TOAST ──
function Toast({ toast }) {
  if (!toast) return null;
  const C = { teal: PL.teal, green: PL.green, slate: PL.slate, amber: PL.amber }[toast.tone] || PL.slate;
  return (
    <div style={{ position: 'absolute', left: 16, right: 16, bottom: 92, zIndex: 60 }}>
      <div style={{ background: PL.slate, color: '#fff', borderRadius: 14, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 11, boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: C, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={toast.icon || 'check'} size={16} color="#fff" sw={2.6} /></div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700 }}>{toast.title}</div>{toast.sub && <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>{toast.sub}</div>}</div>
      </div>
    </div>
  );
}

// ── ROOT APP ──
function App({ onStatus }) {
  const [view, setView] = useStateA('app');           // 'app' | 'onboard'
  const [tab, setTab] = useStateA('offers');
  const [overlay, setOverlay] = useStateA(null);       // {type:'detail',id} | {type:'scout'} | {type:'tier'}
  const [sheet, setSheet] = useStateA(null);           // 'invite' | 'addProp'
  const [offers, setOffers] = useStateA(() => OFFERS.map(o => ({ ...o, status: 'pending' })));
  const [jobs, setJobs] = useStateA(() => JOBS.map(j => ({ ...j })));
  const [toast, setToast] = useStateA(null);

  const flash = (t) => { setToast(t); setTimeout(() => setToast(null), 2600); };

  const accept = (id) => {
    const o = offers.find(x => x.id === id);
    setOffers(p => p.map(x => x.id === id ? { ...x, status: 'accepted' } : x));
    setJobs(p => [{
      id: 'JB-' + Math.floor(2210 + Math.random() * 80), trade: o.trade, status: 'active', stage: 'scheduled',
      title: o.title, homeowner: o.homeowner, homeownerPhone: o.homeownerPhone, address: `${o.neighborhood}, ${o.city} ${o.zip}`,
      pay: o.pay, accepted: 'Just now', scheduledFor: 'Awaiting schedule',
      timeline: [{ label: 'Referral claimed', done: true, at: 'Just now' }, { label: 'Homeowner contacted', done: false }, { label: 'Quote sent', done: false }, { label: 'Scheduled', done: false }, { label: 'Marked complete', done: false }],
    }, ...p]);
    flash({ title: 'Referral claimed', sub: `Reach out to ${o.homeowner} & send your quote`, tone: 'green', icon: 'check' });
  };
  const pass = (id) => {
    setOffers(p => p.map(x => x.id === id ? { ...x, status: 'declined' } : x));
    if (overlay?.type === 'detail') setOverlay(null);
    flash({ title: 'Offer passed', sub: 'Cascades to the next matched pro', tone: 'amber', icon: 'x' });
  };
  const complete = (id) => {
    setJobs(p => p.map(j => j.id === id ? { ...j, status: 'done', completed: 'Today', kept: Math.round(j.pay * PRO.keepRate / 100), rated: 5 } : j));
    flash({ title: 'Job completed', sub: 'Payout triggered to Stripe', tone: 'green', icon: 'check' });
  };

  // onboarding (handled after hooks below)

  const detailOffer = overlay?.type === 'detail' ? offers.find(o => o.id === overlay.id) : null;

  // status bar tint — earnings hero is dark at the top
  const statusDark = (view !== 'onboard') && (tab === 'earnings' && !overlay);
  React.useEffect(() => { onStatus && onStatus(statusDark); }, [statusDark, view]);

  if (view === 'onboard') return <Onboarding charter={null} onFinish={() => { setView('app'); setTab('offers'); }} />;

  return (
    <>
      {/* base tab screen */}
      {tab === 'offers' && <OfferFeed offers={offers} onOpen={(id) => setOverlay({ type: 'detail', id })} onAccept={accept} onPass={pass} />}
      {tab === 'jobs' && <ActiveJobs jobs={jobs} onComplete={complete} />}
      {tab === 'earnings' && <Earnings onScout={() => setOverlay({ type: 'scout' })} onTier={() => setOverlay({ type: 'tier' })} />}
      {tab === 'network' && <Network onInvite={() => setSheet('invite')} />}
      {tab === 'profile' && <Profile onTier={() => setOverlay({ type: 'tier' })} onScout={() => setOverlay({ type: 'scout' })} onRestart={() => setView('onboard')} />}

      {!overlay && <TabBar tab={tab} setTab={(t) => { setTab(t); setOverlay(null); }} />}

      {/* overlays */}
      {overlay?.type === 'detail' && <div style={ovStyle}><OfferDetail offer={detailOffer} accepted={detailOffer?.status === 'accepted'} onAccept={accept} onPass={pass} onBack={() => setOverlay(null)} onGotoJobs={() => { setOverlay(null); setTab('jobs'); }} /></div>}
      {overlay?.type === 'scout' && <div style={ovStyle}><ScoutWrap onBack={() => setOverlay(null)} onAdd={() => setSheet('addProp')} /></div>}
      {overlay?.type === 'tier' && <div style={ovStyle}><TierScreen onBack={() => setOverlay(null)} /></div>}

      {/* sheets */}
      <Sheet open={sheet === 'invite'} onClose={() => setSheet(null)} title="Invite a pro">
        <div style={{ padding: '8px 20px 20px' }}>
          <div style={{ fontSize: 14, color: PL.muted, lineHeight: 1.55, marginBottom: 18 }}>Share your link. When they join and start working, you earn <b style={{ color: PL.teal }}>7%</b> of their network income — and a share 4 levels deep.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: PL.bg, border: `1px solid ${PL.border}`, borderRadius: 12, padding: '13px 14px', marginBottom: 14 }}>
            <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: PL.slate3 }}>{NETWORK.link}</span>
            <Ic name="copy" size={18} color={PL.teal} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn tone="outline" style={{ flex: 1 }}><Ic name="msg" size={17} color={PL.slate3} />Text</Btn>
            <Btn tone="teal" style={{ flex: 1 }}><Ic name="share" size={17} color="#fff" />Share link</Btn>
          </div>
        </div>
      </Sheet>

      <Sheet open={sheet === 'addProp'} onClose={() => setSheet(null)} title="Onboard a property">
        <div style={{ padding: '8px 20px 20px' }}>
          <div style={{ fontSize: 14, color: PL.muted, lineHeight: 1.55, marginBottom: 18 }}>Claim permanent origination rights. You’ll earn recurring income on every job this home ever generates.</div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: PL.slate3, marginBottom: 7 }}>Property address</div>
          <div style={{ position: 'relative', marginBottom: 6 }}>
            <input placeholder="Start typing an address…" style={{ width: '100%', boxSizing: 'border-box', padding: '13px 14px 13px 42px', fontSize: 15, fontWeight: 600, border: `1.5px solid ${PL.border}`, borderRadius: 12, outline: 'none', fontFamily: 'inherit' }} />
            <Ic name="scout" size={18} color={PL.faint} style={{ position: 'absolute', left: 14, top: 14 }} />
          </div>
          {['1408 Kinney Ave, Austin TX 78704', '610 Mary St, Austin TX 78704'].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 6px', borderBottom: `1px solid ${PL.border2}` }}>
              <Ic name="pin" size={17} color={PL.faint} /><span style={{ fontSize: 14, color: PL.slate3, fontWeight: 600 }}>{a}</span>
            </div>
          ))}
          <Btn tone="teal" full size="lg" style={{ marginTop: 18 }} onClick={() => { setSheet(null); flash({ title: 'Property claimed', sub: 'You now hold origination rights', tone: 'teal', icon: 'check' }); }}>Claim origination rights</Btn>
        </div>
      </Sheet>

      <Toast toast={toast} />
    </>
  );
}

function ScoutWrap({ onBack, onAdd }) {
  return (
    <Screen>
      <Header onBack={onBack} title="Scout" sub="Origination income" />
      <Body style={{ paddingTop: 0 }}>
        {/* reuse Scout body via direct render minus its own header */}
        <ScoutInner onAdd={onAdd} />
      </Body>
    </Screen>
  );
}
// Scout body without header (extract)
function ScoutInner({ onAdd }) {
  const S = SCOUT;
  return (
    <div style={{ paddingTop: 16 }}>
      <Card style={{ background: 'linear-gradient(135deg, #1E1B4B, #312E81)', borderColor: 'transparent', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: 99, background: 'radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><Ic name="scout" size={20} color="#C4B5FD" /><span style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Recurring origination</span></div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div><div style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}><Money value={S.monthIncome} /></div><div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>this month · <Money value={S.lifetimeIncome} /> lifetime</div></div>
            <div style={{ textAlign: 'right' }}><div style={{ fontSize: 26, fontWeight: 800, color: '#C4B5FD' }}>{S.properties}</div><div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>properties</div></div>
          </div>
        </div>
      </Card>
      <div style={{ background: '#fff', border: `1px solid ${PL.border}`, borderRadius: 14, padding: '14px 16px', marginBottom: 18, display: 'flex', gap: 11 }}>
        <Ic name="bolt" size={20} fill color="#7C3AED" style={{ flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 13, color: PL.body, lineHeight: 1.5 }}>Onboard a property once and you <b style={{ color: PL.ink }}>claim permanent origination rights</b> — you earn on every job that home ever generates, forever.</div>
      </div>
      <SectionLabel action="+ Add property" onAction={onAdd}>Your properties</SectionLabel>
      {S.homes.map((h, i) => (
        <Card key={i} style={{ marginBottom: 11 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 11 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="pin" size={20} color="#7C3AED" /></div>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: PL.ink }}>{h.addr}</div><div style={{ fontSize: 12.5, color: PL.faint, marginTop: 1 }}>{h.city} · since {h.onboarded}</div></div>
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
    </div>
  );
}

const ovStyle = { position: 'absolute', inset: 0, zIndex: 100, background: PL.bg };

Object.assign(window, { App, TabBar, Toast, TierScreen, ScoutWrap });
