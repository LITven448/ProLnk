// prolnk-showcase.jsx — screen list · live phone · design system (v2: quote flow, notifs, scout add-on, confetti)
const { useState: useSc, useRef: useScR } = React;

const SC_SCREENS = [
  { group: 'Join', items: [
    { id: 'apply', name: 'Apply & plan', desc: 'Trades · subscription · ZIPs · add-ons' },
    { id: 'coach', name: 'Coaching', desc: 'How ProLnk works · benefits' },
    { id: 'verify', name: 'Get verified', desc: 'Gate · unlock referrals' },
    { id: 'status', name: 'TrustyPro status', desc: 'Levels · badges · rewards' },
    { id: 'bgcheck', name: 'Background check', desc: 'Checkr · pay · status' },
    { id: 'licenses', name: 'Credentials', desc: 'Add · upload · verify' },
    { id: 'trust', name: 'Trust & ranking', desc: 'How you gain · lose rank' },
  ]},
  { group: 'Daily driver', items: [
    { id: 'referrals', name: 'Referrals', desc: 'Matched leads · storm alerts' },
    { id: 'emergency', name: 'Emergency alert', desc: 'On-call · loud · first to accept' },
    { id: 'detail', name: 'Referral detail', desc: 'Scope · findings · claim' },
    { id: 'quote', name: 'Send quote', desc: 'AI takeoff · your price' },
    { id: 'jobs', name: 'Active jobs', desc: 'Track · complete · get paid' },
    { id: 'messages', name: 'Messages', desc: 'Homeowner chat · in-thread' },
    { id: 'schedule', name: 'Schedule', desc: 'Availability · bookings' },
  ]},
  { group: 'Grow', items: [
    { id: 'earnings', name: 'Earnings', desc: 'Streams · tier · payouts' },
    { id: 'analytics', name: 'Analytics', desc: 'Weeks · months · years · revenue' },
    { id: 'network', name: 'Referral network', desc: 'Founding-network members only' },
    { id: 'scout', name: 'Scout', desc: 'PM projects · document homes' },
    { id: 'scoutproject', name: 'Scout project', desc: 'Multi-trade · team build' },
    { id: 'board', name: 'Job board', desc: 'Claim scout-posted pieces' },
    { id: 'supply', name: 'Supplier savings', desc: 'GPO group discounts' },
  ]},
  { group: 'Account', items: [
    { id: 'profile', name: 'Business profile', desc: 'Verification · settings' },
    { id: 'integrations', name: 'Integrations', desc: 'Stripe · field service tools' },
    { id: 'briefcase', name: 'Digital Briefcase', desc: 'Compliance · ProPasses' },
    { id: 'membership', name: 'Membership & billing', desc: 'Plan · add-ons · web checkout' },
  ]},
];
const SC_FLAT = SC_SCREENS.flatMap(g => g.items);
const SC_TABS = {
  referrals: 'referrals',
  jobs: 'jobs', messages: 'jobs', schedule: 'jobs',
  earnings: 'earnings', analytics: 'earnings', scout: 'earnings', scoutproject: 'earnings', supply: 'earnings',
  network: 'network',
  profile: 'profile', status: 'profile', membership: 'profile', integrations: 'profile', trust: 'profile', briefcase: 'profile', propass: 'profile',
};
const SC_TABBED = new Set(Object.keys(SC_TABS));
const SC_DARK = new Set(['earnings']);

// phone bottom tab bar (showcase) — Network tab only for founding-network members
function ScTabs({ active, go, founding }) {
  const tabs = [
    { k: 'referrals', label: 'Referrals', icon: 'feed' },
    { k: 'jobs', label: 'Jobs', icon: 'jobs' },
    { k: 'earnings', label: 'Earnings', icon: 'earnings' },
    ...(founding ? [{ k: 'network', label: 'Network', icon: 'network' }] : []),
    { k: 'profile', label: 'Business', icon: 'user' },
  ];
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 40, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(18px) saturate(180%)', borderTop: `1px solid ${PL.border}`, paddingBottom: 22 }}>
      <div style={{ display: 'flex', padding: '8px 6px 4px' }}>
        {tabs.map(t => {
          const on = active === t.k;
          return (
            <button key={t.k} onClick={() => go(t.k)} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '4px 0' }}>
              <Ic name={t.icon} size={24} color={on ? PL.teal : '#94A3B8'} sw={on ? 2.2 : 1.9} />
              <span style={{ fontSize: 10.5, fontWeight: on ? 800 : 600, color: on ? PL.teal : '#94A3B8' }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScToast({ toast }) {
  if (!toast) return null;
  const C = { teal: PL.teal, green: PL.green, amber: PL.amber }[toast.tone] || PL.slate;
  return (
    <div style={{ position: 'absolute', left: 16, right: 16, bottom: 92, zIndex: 160 }}>
      <div style={{ background: PL.slate, color: '#fff', borderRadius: 14, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 11, boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: C, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={toast.icon || 'check'} size={16} color="#fff" sw={2.6} /></div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700 }}>{toast.title}</div>{toast.sub && <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>{toast.sub}</div>}</div>
      </div>
    </div>
  );
}

function Showcase() {
  const [screen, setScreen] = useSc('verify');
  const [detailId, setDetailId] = useSc('OF-4821');
  const [bgStatus, setBgStatus] = useSc('unfiled');   // unfiled → pending → clear
  const [licenses, setLicenses] = useSc([]);
  const [extras, setExtras] = useSc({});   // insurance, photo, area — gamified profile completion
  const [offers, setOffers] = useSc(() => OFFERS.map(o => ({ ...o, status: 'pending' })));
  const [jobs, setJobs] = useSc(() => JOBS.map(j => ({ ...j })));
  const [toast, setToast] = useSc(null);
  const [bill, setBill] = useSc(null);        // billing redirect sheet action
  const [portal, setPortal] = useSc(false);   // faux in-app web portal
  const [scoutOn, setScoutOn] = useSc(false); // Scout add-on owned?
  const [integrations, setIntegrations] = useSc({ stripe: true, housecall: true });
  const [quoteJobId, setQuoteJobId] = useSc(null);
  const [confetti, setConfetti] = useSc(0);
  const [founding, setFounding] = useSc(true); // demo pro joined via a founding invite
  const [emAlert, setEmAlert] = useSc(false);
  const [passSel, setPassSel] = useSc(null);
  const [notifOpen, setNotifOpen] = useSc(false);
  const [chatOpen, setChatOpen] = useSc(false);
  const [notifs, setNotifs] = useSc([
    { icon: 'doc', tone: 'teal', title: 'Master Plumber license verified', sub: 'TX-MPL 41882 · cleared in 4 hours', time: '2h', unread: true },
    { icon: 'feed', tone: 'amber', title: 'New referral matched', sub: 'Burst pipe · Bouldin Creek · expires soon', time: '3h', unread: true },
    { icon: 'card', tone: 'green', title: 'Payout sent — $1,840', sub: 'Stripe · arrived in your bank', time: 'May 30' },
  ]);
  const pendingBill = useScR(null);

  const unlocked = bgStatus !== 'unfiled' && licenses.length > 0;
  const unread = notifs.filter(n => n.unread).length;

  const flash = (t) => { setToast(t); setTimeout(() => setToast(null), 2800); };
  const pushNotif = (n) => setNotifs(p => [{ ...n, time: 'now', unread: true }, ...p]);
  const pop = () => setConfetti(k => k + 1);

  const go = (id) => {
    setChatOpen(false);
    if (id === 'detail' && screen !== 'detail') setDetailId(offers.find(o => o.status === 'pending')?.id || 'OF-4821');
    if (id === 'quote') {
      const claimed = jobs.find(j => j.status === 'active' && j.stage === 'claimed');
      if (claimed) setQuoteJobId(claimed.id);
      else {
        const o = offers.find(x => x.status === 'pending');
        if (o) { accept(o.id); return; }
        setQuoteJobId(jobs.find(j => j.status === 'active')?.id || jobs[0]?.id);
      }
    }
    setScreen(id);
  };

  // claim a referral → land directly in the quote composer
  const accept = (id) => {
    const o = offers.find(x => x.id === id);
    const jobId = 'JB-' + Math.floor(2210 + Math.random() * 80);
    setOffers(p => p.map(x => x.id === id ? { ...x, status: 'accepted' } : x));
    setJobs(p => [{
      id: jobId, trade: o.trade, status: 'active', stage: 'claimed',
      title: o.title, homeowner: o.homeowner, homeownerPhone: o.homeownerPhone,
      address: `${o.neighborhood}, ${o.city} ${o.zip}`, estLow: o.estLow, estHigh: o.estHigh,
      pay: o.pay, accepted: 'Just now', scheduledFor: 'Book your site visit',
      timeline: [
        { label: 'Referral claimed', done: true, at: 'Just now' },
        { label: 'Site visit', done: false }, { label: 'Quote sent', done: false }, { label: 'Quote accepted', done: false },
        { label: 'Marked complete', done: false },
      ],
    }, ...p]);
    setQuoteJobId(jobId);
    setScreen('visit');
    flash({ title: 'Referral claimed — it\u2019s yours', sub: `Book a time to review the job with ${o.homeowner}`, tone: 'green' });
  };

  // book the site review; quote comes after the walk-through
  const bookVisit = (jobId, day, win) => {
    setJobs(p => p.map(x => x.id === jobId ? {
      ...x, stage: 'visit', scheduledFor: `Site visit · ${day}, ${win}`,
      timeline: [
        { label: 'Referral claimed', done: true, at: x.accepted },
        { label: `Site visit · ${day}, ${win}`, done: true, at: 'Booked' },
        { label: 'Quote sent', done: false }, { label: 'Quote accepted', done: false },
        { label: 'Marked complete', done: false },
      ],
    } : x));
    pushNotif({ icon: 'clock', tone: 'teal', title: `Site visit booked · ${day}, ${win}`, sub: 'Homeowner confirmed in-app' });
  };

  const pass = (id) => { setOffers(p => p.map(x => x.id === id ? { ...x, status: 'declined' } : x)); if (screen === 'detail') setScreen('referrals'); flash({ title: 'Referral passed', sub: 'Cascades to the next matched pro', tone: 'amber', icon: 'x' }); };

  // pro sends their quote → homeowner responds live a few seconds later
  const sendQuote = (jobId, total, win) => {
    const j = jobs.find(x => x.id === jobId);
    const who = j?.homeowner || 'The homeowner';
    const title = j?.title || '';
    setJobs(p => p.map(x => x.id === jobId ? {
      ...x, stage: 'quote_sent', pay: total, scheduledFor: 'Quote sent \u00b7 awaiting reply',
      timeline: [
        { label: 'Referral claimed', done: true, at: x.accepted },
        { label: 'Site visit', done: true },
        { label: `Quote sent \u00b7 $${fmt(total)}`, done: true, at: 'Just now' },
        { label: 'Quote accepted', done: false },
        { label: 'Scheduled', done: false }, { label: 'Marked complete', done: false },
      ],
    } : x));
    setTimeout(() => {
      setJobs(p => p.map(x => x.id === jobId ? {
        ...x, stage: 'scheduled', scheduledFor: `${win} \u00b7 confirmed`,
        timeline: [
          { label: 'Referral claimed', done: true, at: x.accepted },
          { label: 'Site visit', done: true },
          { label: `Quote sent \u00b7 $${fmt(total)}`, done: true },
          { label: 'Quote accepted', done: true, at: 'Just now' },
          { label: `Scheduled \u00b7 ${win}`, done: true, at: 'Just now' },
          { label: 'Marked complete', done: false },
        ],
      } : x));
      pushNotif({ icon: 'check', tone: 'green', title: `${who} accepted your $${fmt(total)} quote`, sub: `${title} \u00b7 ${win}` });
      pop();
      flash({ title: `${who} accepted your quote!`, sub: `$${fmt(total)} \u00b7 ${win} \u00b7 it\u2019s on the calendar`, tone: 'green' });
    }, 6500);
  };

  const complete = (id) => {
    const j = jobs.find(x => x.id === id);
    setJobs(p => p.map(x => x.id === id ? { ...x, status: 'done', completed: 'Today', kept: x.pay, rated: 5 } : x));
    pushNotif({ icon: 'card', tone: 'green', title: `Payout queued \u2014 $${fmt(j?.pay || 0)}`, sub: 'Stripe \u00b7 arrives Friday' });
    flash({ title: 'Job complete \u2014 payout queued', sub: `$${fmt(Math.round((j?.pay || 0) * (1 - JOB_FEE)))} after the platform fee \u00b7 via Stripe`, tone: 'green' });
  };

  const openPortal = () => { pendingBill.current = bill; setBill(null); setTimeout(() => setPortal(true), 180); };
  const portalConfirm = () => {
    const a = pendingBill.current;
    setPortal(false);
    if (a?.key === 'addon-scout' && !scoutOn) {
      setScoutOn(true);
      pushNotif({ icon: 'scout', tone: 'teal', title: 'Scout added to your plan', sub: '$49/mo \u00b7 origination rights unlocked' });
      pop();
      flash({ title: 'Scout is live on your account', sub: 'Onboard your first property to start earning', tone: 'teal', icon: 'scout' });
      setScreen('scout');
    } else {
      flash({ title: 'Change confirmed on prolnk.xyz', sub: 'Synced back to the app instantly', tone: 'teal', icon: 'globe' });
    }
    pendingBill.current = null;
  };

  const enterReferrals = () => { pop(); go('referrals'); flash({ title: 'You\u2019re live', sub: `${offers.filter(o => o.status === 'pending').length} referrals already matched to you`, tone: 'green' }); };

  const detailOffer = offers.find(o => o.id === detailId);
  const quoteJob = jobs.find(j => j.id === quoteJobId);
  const isDark = SC_DARK.has(screen);
  const showTabs = SC_TABBED.has(screen) && !(screen === 'messages' && chatOpen);
  const activeTab = SC_TABS[screen];
  const findJobForOffer = (o) => jobs.find(j => j.status === 'active' && j.title === o?.title);

  let body = null;
  if (screen === 'apply') body = <Onboarding charter={null} onFinish={() => { setBgStatus('clear'); go('coach'); }} />;
  if (screen === 'coach') body = <CoachScreen onDone={() => go('verify')} onSkip={() => go('verify')} />;
  if (screen === 'verify') body = <VerifyHub bgStatus={bgStatus} licenses={licenses} extras={extras} unlocked={unlocked} onStatus={() => go('status')} onStartBg={() => go('bgcheck')} onGoLicenses={() => go('licenses')} onEnter={enterReferrals} />;
  if (screen === 'status') body = <ProStatus bgStatus={bgStatus} licenses={licenses} extras={extras} onBack={() => go('verify')} onTask={(route) => {
    if (route && route.startsWith('task:')) {
      const k = route.slice(5);
      setExtras(p => ({ ...p, [k]: true }));
      const names = { insurance: 'Proof of insurance', photo: 'Logo & photo', area: 'Service areas', email: 'Email verified', payout: 'Stripe payouts connected' };
      pushNotif({ icon: 'check', tone: 'teal', title: `${names[k]} added`, sub: 'XP earned · keep climbing' });
      pop();
      flash({ title: `${names[k]} added · +XP`, sub: 'TrustyPro level updated', tone: 'teal' });
    } else if (route) { go(route); }
  }} />;
  if (screen === 'bgcheck') body = <BackgroundCheck onDone={() => { setBgStatus('clear'); go('verify'); }} />;
  if (screen === 'licenses') body = <LicensesScreen licenses={licenses} onAdd={(l) => { setLicenses(p => [...p, l]); flash({ title: 'License added', sub: 'Verifying \u2014 usually within 24h', tone: 'teal' }); }} onBack={() => go('verify')} onContinue={() => go('verify')} />;
  if (screen === 'emergency') body = (
    <>
      {unlocked ? <OfferFeed offers={offers} onOpen={() => {}} onAccept={() => {}} onPass={() => {}} onBell={() => {}} unread={unread} /> : null}
      <EmergencyAlert alert={EM_ALERT} onAccept={() => { go('jobs'); flash({ title: 'Emergency accepted — go now', sub: '1408 Kinney Ave · homeowner notified · +rank bonus applied', tone: 'green' }); pushNotif({ icon: 'siren', tone: 'amber', title: 'Emergency claimed · burst pipe', sub: 'You beat 11 on-call pros · +rank bonus' }); }} onDismiss={() => go('referrals')} />
    </>
  );
  if (screen === 'referrals') body = unlocked
    ? <OfferFeed offers={offers} onOpen={(id) => { setDetailId(id); setScreen('detail'); }} onAccept={accept} onPass={pass} onBell={() => { setNotifOpen(true); }} unread={unread} />
    : <ReferralsLocked bgStatus={bgStatus} licenses={licenses} onVerify={() => go('verify')} />;
  if (screen === 'detail') body = <OfferDetail offer={detailOffer} accepted={detailOffer?.status === 'accepted'} onAccept={accept} onPass={pass} onBack={() => go('referrals')} onGotoJobs={() => go('jobs')} onQuote={() => { const j = findJobForOffer(detailOffer); if (j) { setQuoteJobId(j.id); setScreen('quote'); } }} />;
  if (screen === 'visit') body = quoteJob ? <VisitScheduler key={'v' + quoteJob.id} job={quoteJob} onBack={() => go('jobs')} onBooked={bookVisit} onQuoteNow={() => setScreen('quote')} /> : null;
  if (screen === 'quote') body = quoteJob ? <QuoteComposer key={quoteJob.id} job={quoteJob} onBack={() => go('jobs')} onSend={sendQuote} /> : null;
  if (screen === 'jobs') body = <ActiveJobs jobs={jobs} onComplete={complete} onQuote={(id) => { setQuoteJobId(id); setScreen('quote'); }} onVisit={(id) => { setQuoteJobId(id); setScreen('visit'); }} />;
  if (screen === 'earnings') body = <Earnings onScout={() => go('scout')} onTier={() => go('membership')} onAnalytics={() => go('analytics')} scoutActive={scoutOn} />;
  if (screen === 'analytics') body = <AnalyticsScreen onBack={() => go('earnings')} />;
  if (screen === 'network') body = founding
    ? <Network onInvite={() => flash({ title: 'Invite link copied', tone: 'teal' })} />
    : <Screen><Header title="Referral network" sub="Founding network" /><Body><Card style={{ textAlign: 'center', padding: '38px 24px' }}>
        <div style={{ width: 58, height: 58, borderRadius: 18, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Ic name="lock" size={26} color={PL.slate3} /></div>
        <div style={{ fontSize: 17, fontWeight: 800, color: PL.ink, marginBottom: 8 }}>Founding network only</div>
        <div style={{ fontSize: 13.5, color: PL.muted, lineHeight: 1.6, maxWidth: 280, margin: '0 auto' }}>The referral network is available to members who joined through a founding-network invite. Regular memberships don’t include it — and never see it.</div>
      </Card></Body></Screen>;
  if (screen === 'scout') body = scoutOn
    ? <ScoutHub onProject={() => go('scoutproject')} onBoard={() => go('board')} onAdd={() => flash({ title: 'Check-up started', sub: 'Document assets to raise the Home Score', tone: 'teal' })} />
    : <Scout active={false} onAdd={() => {}} onActivate={() => setBill({ key: 'addon-scout', title: 'Add Scout to your plan', note: 'Scout unlocks project management, home documentation, and permanent origination rights. Confirm and pay on the web; it syncs back instantly.', summary: [['Scout add-on', '$49/mo'], ['New monthly total', '$198/mo']] })} />;
  if (screen === 'scoutproject') body = <ScoutProject onBack={() => go('scout')} onBoard={() => go('board')} onPost={() => { flash({ title: 'Pieces posted to the board', sub: 'Matched pros in each trade were notified', tone: 'teal' }); pushNotif({ icon: 'network', tone: 'teal', title: 'Project pieces posted', sub: 'Kitchen remodel \u00b7 3 open trades' }); }} />;
  if (screen === 'board') body = <JobBoard onBack={() => go('scout')} onClaim={(p) => { flash({ title: p.trade + ' piece claimed \u2014 $' + fmt(p.pay), sub: 'The scout will schedule your hand-off', tone: 'green' }); pushNotif({ icon: 'check', tone: 'green', title: 'You claimed ' + p.trade.toLowerCase() + ' \u00b7 $' + fmt(p.pay), sub: SCOUT_PROJECT.title }); }} />;
  if (screen === 'briefcase') body = <BriefcaseScreen onBack={() => go('profile')} onPass={(p) => { setPassSel(p); go('propass'); }} />;
  if (screen === 'propass') body = <ProPassScreen pass={passSel} onBack={() => go('briefcase')} />;
  if (screen === 'trust') body = <TrustRules onBack={() => go('profile')} />;
  if (screen === 'messages') body = <MessagesScreen onBack={() => go('referrals')} onThreadState={setChatOpen} />;
  if (screen === 'schedule') body = <ScheduleScreen onBack={() => go('jobs')} />;
  if (screen === 'supply') body = <SupplyScreen onBack={() => go('earnings')} onLink={(name) => { flash({ title: `${name} account linked`, sub: 'Group tier pricing active within 24h', tone: 'green' }); pushNotif({ icon: 'link', tone: 'green', title: `${name} linked`, sub: 'GPO group discount applied' }); }} />;
  if (screen === 'profile') body = <Profile onTrust={() => go('trust')} onBriefcase={() => go('briefcase')} onTier={() => go('membership')} onScout={() => go('scout')} onStatus={() => go('status')} onIntegrations={() => go('integrations')} bgStatus={bgStatus} licenses={licenses} extras={extras} onRestart={() => go('apply')} />;
  if (screen === 'integrations') body = <IntegrationsScreen onBack={() => go('profile')} connected={integrations} onToggle={(k, on) => {
    setIntegrations(p => ({ ...p, [k]: on }));
    flash({ title: on ? 'Connected' : 'Disconnected', sub: on ? 'Syncing with ProLnk now' : 'No longer syncing', tone: on ? 'teal' : 'amber', icon: on ? 'check' : 'x' });
    if (on) pushNotif({ icon: 'link', tone: 'teal', title: 'Integration connected', sub: 'Your jobs now sync with ProLnk' });
  }} />;
  if (screen === 'membership') body = <MembershipScreen onBack={() => go('profile')} onManage={(action) => setBill(action)} addons={scoutOn ? ['scout'] : []} />;

  return (
    <React.Fragment>
      {/* LEFT — brand + screen list */}
      <div className="sidecol">
        <div className="brand-eyebrow">ProLnk · pro app</div>
        <h1 className="h1">Your business,<br />matched and paid.</h1>
        <p className="lede">Get matched with vetted homeowner <b>referrals</b> — no bidding, no lead auctions. Claim one, send <b>your own quote</b>, and watch the homeowner accept it live. You set the price; ProLnk charges membership plus a platform fee on the job total (3–15% by job type, 8% standard residential) — never a markup on your labor rate.</p>

        <div className="screenlist">
          <button onClick={() => setFounding(f => !f)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', marginBottom: 14, padding: '10px 12px', borderRadius: 11, border: `1.5px solid ${founding ? '#F5D28A' : PL.border}`, background: founding ? '#FEF7E6' : '#fff', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ width: 34, height: 20, borderRadius: 99, background: founding ? '#D97706' : '#CBD5E1', position: 'relative', flexShrink: 0, transition: 'background .2s' }}>
              <div style={{ position: 'absolute', top: 2, left: founding ? 16 : 2, width: 16, height: 16, borderRadius: 99, background: '#fff', transition: 'left .2s' }} />
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: founding ? '#92400E' : PL.slate3 }}>Founding-network member{founding ? '' : ' (off — Network tab hidden)'}</span>
          </button>
          {SC_SCREENS.map(group => (
            <React.Fragment key={group.group}>
              <div className="screen-group">{group.group}</div>
              {group.items.map(s => {
                const idx = SC_FLAT.findIndex(x => x.id === s.id);
                return (
                  <button key={s.id} className={screen === s.id ? 'on' : ''} onClick={() => go(s.id)}>
                    <span className="num">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="label"><span className="name">{s.name}</span><span className="desc">{s.desc}</span></span>
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* CENTER — phone */}
      <div style={{ position: 'relative' }}>
        <IOSDevice width={390} height={844} dark={isDark}>
          <div style={{ position: 'relative', height: '100%', background: isDark ? PL.slate : '#fff', overflow: 'hidden' }}>
            <div key={screen} style={{ height: '100%' }}>{body}</div>
            {showTabs && <ScTabs active={activeTab} go={go} founding={founding} />}
            <NotifPanel open={notifOpen} items={notifs} onClose={() => setNotifOpen(false)} onClear={() => setNotifs(p => p.map(n => ({ ...n, unread: false })))} />
            <BillingSheet open={!!bill} action={bill} onClose={() => setBill(null)} onOpen={openPortal} />
            <WebPortal open={portal} onClose={() => setPortal(false)} onConfirm={portalConfirm} />
            <ConfettiBurst fireKey={confetti} />
            <ScToast toast={toast} />
          </div>
        </IOSDevice>
      </div>

      {/* RIGHT — design system */}
      <div className="sidecol right">
        <div className="brand-eyebrow">Design system</div>

        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 14, padding: 18 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Here&rsquo;s a referral.<br />Go win it.</div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 6 }}>Inter · 800 · dense display</div>
          <div style={{ fontSize: 13.5, color: '#475569', marginTop: 12, lineHeight: 1.5 }}>Direct, pro-to-pro, money-forward. Tabular figures everywhere. We show the pro <b style={{ color: PL.ink }}>their</b> money — never platform margins.</div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 6 }}>Inter · 400 / 600 / 800</div>
        </div>

        <div className="meta">
          <div>
            <div className="meta-row"><span>Palette</span><b>Teal · Slate · Money-green</b></div>
            <div className="swatchrow">
              {['#0D9488', '#0F172A', '#16A34A', '#D97706', '#DC2626', '#F8FAFC', '#E5E7EB'].map(c => <div key={c} className="swatch" style={{ background: c }} title={c} />)}
            </div>
          </div>
          <div className="meta-row"><span>Type</span><b>Inter, tabular</b></div>
          <div className="meta-row"><span>Icons</span><b>Lucide 1.9</b></div>
          <div className="meta-row"><span>Radii</span><b>16 / 13 / 11 / 8</b></div>
          <div className="meta-row"><span>Billing</span><b>Web only · no app-store fees</b></div>
        </div>

        <div className="tip" style={{ marginTop: 18 }}>
          <b>The model:</b> ProLnk hands you a <span style={{ color: PL.teal }}>referral</span> — never a price. You claim it and send <b>your own quote</b>. Membership + a platform fee on the job total (3–15% by job type, 8% standard residential); never a markup on your labor rate, never a per-lead fee.
        </div>
        <div className="tip" style={{ marginTop: 12 }}>
          <b>Try the loop:</b> claim a referral → build your quote → <span style={{ color: PL.teal }}>send it</span> → wait ~6s for the homeowner to accept (confetti) → complete the job in <span style={{ color: PL.teal }}>Jobs</span> → see it hit <span style={{ color: PL.teal }}>Earnings</span>. Also try adding <span style={{ color: '#7C3AED' }}>Scout</span> — billing happens on the web, never in-app.
        </div>
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Showcase />);
