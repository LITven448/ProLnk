// prolnk-web-shell.jsx — brand, sidebar journey stepper, topbar, app state
const { useState: useS } = React;

// ── journey definition ──
const STEPS = [
  { key: 'apply', label: 'Apply & tier', icon: 'bolt', phase: 'Join' },
  { key: 'verify', label: 'Background check', icon: 'shield', phase: 'Join' },
  { key: 'offers', label: 'Your offers', icon: 'feed', phase: 'Work' },
  { key: 'jobs', label: 'Active jobs', icon: 'jobs', phase: 'Work' },
  { key: 'earnings', label: 'Earnings', icon: 'earnings', phase: 'Grow' },
  { key: 'network', label: 'Referral network', icon: 'network', phase: 'Grow' },
  { key: 'scout', label: 'Scout', icon: 'scout', phase: 'Grow' },
];
const PHASES = [
  { name: 'Join', desc: 'Sign up & get verified' },
  { name: 'Work', desc: 'Accept & complete jobs' },
  { name: 'Grow', desc: 'Earn, refer & compound' },
];

// ── brand logo ──
function Logo({ light = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: PL.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(13,148,136,0.4)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" fill="#fff" /></svg>
      </div>
      <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em', color: light ? '#fff' : PL.ink }}>Pro<span style={{ color: '#5EEAD4' }}>Lnk</span></span>
    </div>
  );
}

// ── sidebar with journey stepper ──
function Sidebar({ step, setStep, maxReached }) {
  let lastPhase = null;
  return (
    <div style={{ width: 296, flexShrink: 0, background: PL.slate, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
      <div style={{ padding: '26px 26px 20px' }}><Logo light /></div>

      <div style={{ padding: '4px 16px', flex: 1, overflow: 'auto' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '12px 12px 14px' }}>Your journey</div>
        {STEPS.map((s, i) => {
          const done = i < maxReached;
          const current = i === step;
          const showPhase = s.phase !== lastPhase; lastPhase = s.phase;
          const ph = PHASES.find(p => p.name === s.phase);
          return (
            <React.Fragment key={s.key}>
              {showPhase && (
                <div style={{ padding: i === 0 ? '0 12px 10px' : '18px 12px 10px' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#5EEAD4', letterSpacing: '0.04em' }}>{ph.name}</div>
                  <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{ph.desc}</div>
                </div>
              )}
              <button onClick={() => setStep(i)} className="pl-step" style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 13, padding: '10px 12px', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: current ? 'rgba(13,148,136,0.18)' : 'transparent', position: 'relative', textAlign: 'left',
              }}>
                {/* connector */}
                {i < STEPS.length - 1 && !showPhaseNext(i) && <div style={{ position: 'absolute', left: 28, top: 38, height: 14, width: 2, background: i < maxReached ? PL.teal : 'rgba(255,255,255,0.12)' }} />}
                <div style={{ width: 32, height: 32, borderRadius: 99, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: done ? PL.teal : current ? PL.teal : 'rgba(255,255,255,0.08)',
                  border: current && !done ? `2px solid #5EEAD4` : 'none',
                  boxShadow: current ? '0 0 0 4px rgba(13,148,136,0.2)' : 'none' }}>
                  {done ? <Ic name="check" size={16} color="#fff" sw={3} /> : <Ic name={s.icon} size={16} color={current ? '#fff' : 'rgba(255,255,255,0.55)'} fill={false} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: current ? 700 : 600, color: current ? '#fff' : done ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)' }}>{s.label}</div>
                </div>
                {current && <div style={{ width: 6, height: 6, borderRadius: 99, background: '#5EEAD4' }} />}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* pro profile */}
      <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
          <Avatar initials={PRO.initials} size={38} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{PRO.business}</div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)' }}>{PRO.name}</div>
          </div>
          <span style={{ fontSize: 10.5, fontWeight: 800, color: '#5EEAD4', background: 'rgba(13,148,136,0.2)', padding: '3px 8px', borderRadius: 6 }}>PRO</span>
        </div>
      </div>
    </div>
  );
}
function showPhaseNext(i) { return STEPS[i + 1] && STEPS[i + 1].phase !== STEPS[i].phase; }

// ── topbar ──
function Topbar({ step }) {
  const s = STEPS[step];
  return (
    <div style={{ height: 68, flexShrink: 0, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 36px', position: 'sticky', top: 0, zIndex: 30 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, color: PL.muted, fontWeight: 600, whiteSpace: 'nowrap' }}>
        <span style={{ color: PL.teal, fontWeight: 700 }}>{s.phase}</span>
        <Ic name="chevR" size={14} color={PL.faint} />
        <span style={{ color: PL.ink, fontWeight: 700 }}>{s.label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.3 }}>This month</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: PL.green, lineHeight: 1.2 }}><Money value={EARNINGS.month} /></div>
        </div>
        <div style={{ width: 1, height: 28, background: PL.border }} />
        <button style={{ position: 'relative', border: `1px solid ${PL.border}`, background: '#fff', width: 40, height: 40, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Ic name="bell" size={19} color={PL.slate3} />
          <span style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: 99, background: PL.red, border: '2px solid #fff' }} />
        </button>
        <Avatar initials={PRO.initials} size={40} />
      </div>
    </div>
  );
}

// ── simple modal ──
function WebModal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.55)', animation: 'plfade .2s ease' }} />
      <div style={{ position: 'relative', width: 440, maxWidth: '90vw', background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 24px 70px rgba(0,0,0,0.3)', animation: 'plpop .24s cubic-bezier(.32,.72,0,1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontSize: 19, fontWeight: 800, color: PL.ink }}>{title}</span>
          <button onClick={onClose} style={{ border: 'none', background: '#F1F5F9', width: 32, height: 32, borderRadius: 9, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="x" size={18} color={PL.slate3} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── toast ──
function WebToast({ toast }) {
  if (!toast) return null;
  const C = { teal: PL.teal, green: PL.green, amber: PL.amber }[toast.tone] || PL.slate;
  return (
    <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 120, animation: 'pltoast .3s cubic-bezier(.32,.72,0,1)' }}>
      <div style={{ background: PL.slate, color: '#fff', borderRadius: 13, padding: '13px 18px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 16px 40px rgba(0,0,0,0.3)', minWidth: 300 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: C, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={toast.icon || 'check'} size={16} color="#fff" sw={2.6} /></div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700 }}>{toast.title}</div>{toast.sub && <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>{toast.sub}</div>}</div>
      </div>
    </div>
  );
}

// ── ROOT WEB APP ──
function WebApp() {
  const [step, setStepRaw] = useS(0);
  const [maxReached, setMax] = useS(0);
  const [offers, setOffers] = useS(() => OFFERS.map(o => ({ ...o, status: 'pending' })));
  const [jobs, setJobs] = useS(() => JOBS.map(j => ({ ...j })));
  const [toast, setToast] = useS(null);
  const [modal, setModal] = useS(null);
  const scroller = React.useRef(null);

  const setStep = (i) => { setStepRaw(i); setMax(m => Math.max(m, i)); if (scroller.current) scroller.current.scrollTop = 0; };
  const flash = (t) => { setToast(t); setTimeout(() => setToast(null), 2600); };
  const goNext = () => { if (step < STEPS.length - 1) setStep(step + 1); };

  const accept = (id) => {
    const o = offers.find(x => x.id === id);
    setOffers(p => p.map(x => x.id === id ? { ...x, status: 'accepted' } : x));
    setJobs(p => [{ id: 'JB-' + Math.floor(2210 + Math.random() * 80), trade: o.trade, status: 'active', stage: 'scheduled', title: o.title, homeowner: o.homeowner, homeownerPhone: o.homeownerPhone, address: `${o.neighborhood}, ${o.city} ${o.zip}`, pay: o.pay, accepted: 'Just now', scheduledFor: 'Awaiting schedule', timeline: [{ label: 'Accepted', done: true }, { label: 'Contacted', done: false }, { label: 'Scheduled', done: false }, { label: 'On site', done: false }, { label: 'Complete', done: false }] }, ...p]);
    flash({ title: 'Job accepted', sub: `${o.homeowner}’s job moved to Active jobs`, tone: 'green' });
  };
  const pass = (id) => { setOffers(p => p.map(x => x.id === id ? { ...x, status: 'declined' } : x)); flash({ title: 'Offer passed', sub: 'Cascades to the next matched pro', tone: 'amber', icon: 'x' }); };
  const complete = (id) => { setJobs(p => p.map(j => j.id === id ? { ...j, status: 'done', completed: 'Today', kept: Math.round(j.pay * PRO.keepRate / 100), rated: 5 } : j)); flash({ title: 'Job completed', sub: 'Payout triggered to Stripe', tone: 'green' }); };

  const key = STEPS[step].key;
  const nextStep = STEPS[step + 1];

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: PL.bg }}>
      <Sidebar step={step} setStep={setStep} maxReached={maxReached} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Topbar step={step} />
        <div ref={scroller} style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', padding: '36px 36px 40px' }}>
            {key === 'apply' && <WebApply onNext={goNext} />}
            {key === 'verify' && <WebVerify onNext={goNext} />}
            {key === 'offers' && <WebOffers offers={offers} onAccept={accept} onPass={pass} />}
            {key === 'jobs' && <WebJobs jobs={jobs} onComplete={complete} />}
            {key === 'earnings' && <WebEarnings onGoNetwork={() => setStep(5)} onGoScout={() => setStep(6)} />}
            {key === 'network' && <WebNetwork onInvite={() => setModal('invite')} />}
            {key === 'scout' && <WebScout onAdd={() => setModal('addProp')} />}

            {/* journey nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 36, paddingTop: 24, borderTop: `1px solid ${PL.border}` }}>
              <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: 'none', background: 'none', cursor: step === 0 ? 'default' : 'pointer', color: step === 0 ? PL.faint : PL.slate3, fontWeight: 700, fontSize: 14, opacity: step === 0 ? 0.4 : 1 }}><Ic name="chevL" size={18} color="currentColor" />Back</button>
              {nextStep ? (
                <button onClick={goNext} className="pl-next" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, border: `1px solid ${PL.border}`, background: '#fff', cursor: 'pointer', padding: '10px 12px 10px 18px', borderRadius: 13 }}>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}><div style={{ fontSize: 11, color: PL.faint, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Next</div><div style={{ fontSize: 14, fontWeight: 700, color: PL.ink }}>{nextStep.label}</div></div>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: PL.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="chevR" size={18} color="#fff" /></div>
                </button>
              ) : (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: PL.teal }}><Ic name="check" size={18} color={PL.teal} />You’ve seen the full journey</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* modals */}
      <WebModal open={modal === 'invite'} onClose={() => setModal(null)} title="Invite a pro">
        <div style={{ fontSize: 14, color: PL.muted, lineHeight: 1.6, marginBottom: 18 }}>Share your link. When they join and start working, you earn <b style={{ color: PL.teal }}>7%</b> of their network income — and a share four levels deep.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: PL.bg, border: `1px solid ${PL.border}`, borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
          <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: PL.slate3 }}>{NETWORK.link}</span><Ic name="copy" size={18} color={PL.teal} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}><Btn tone="outline" style={{ flex: 1 }}><Ic name="msg" size={17} color={PL.slate3} />Text</Btn><Btn tone="teal" style={{ flex: 1 }} onClick={() => { setModal(null); flash({ title: 'Invite sent', tone: 'teal' }); }}><Ic name="share" size={17} color="#fff" />Share link</Btn></div>
      </WebModal>

      <WebModal open={modal === 'addProp'} onClose={() => setModal(null)} title="Onboard a property">
        <div style={{ fontSize: 14, color: PL.muted, lineHeight: 1.6, marginBottom: 18 }}>Claim permanent origination rights — you’ll earn recurring income on every job this home ever generates.</div>
        <WLabel>Property address</WLabel>
        <WInput placeholder="Start typing an address…" />
        {['1408 Kinney Ave, Austin TX 78704', '610 Mary St, Austin TX 78704'].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 6px', borderBottom: `1px solid ${PL.border2}` }}><Ic name="pin" size={17} color={PL.faint} /><span style={{ fontSize: 14, color: PL.slate3, fontWeight: 600 }}>{a}</span></div>
        ))}
        <Btn tone="teal" full size="lg" style={{ marginTop: 18 }} onClick={() => { setModal(null); flash({ title: 'Property claimed', sub: 'You now hold origination rights', tone: 'teal' }); }}>Claim origination rights</Btn>
      </WebModal>

      <WebToast toast={toast} />
    </div>
  );
}

Object.assign(window, { WebApp, Sidebar, Topbar, Logo, STEPS });
