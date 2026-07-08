// TrustyPro v3 — app shell: navigation, tab bar, push banner, journey state

// ─────────────────────────────────────────────────────────────
// Tab bar — Home · Vault · [Scan] · Requests · Profile
// ─────────────────────────────────────────────────────────────
function W3TabBar({ screen, go, hasRequest }) {
  const tabs = [
    { id: "home",    icon: "home",   label: "Home" },
    { id: "vault",   icon: "shield", label: "Vault" },
    { id: "scan",    isScan: true },
    { id: "tracking", icon: "wrench", label: "Jobs", badge: hasRequest },
    { id: "profile", icon: "user",   label: "Profile" },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 90,
      paddingBottom: 26, paddingTop: 8, paddingInline: 14,
      background: "rgba(255,255,255,0.94)", backdropFilter: "blur(16px)",
      borderTop: `1px solid ${T3.borderSubtle}`,
      display: "flex", alignItems: "center", justifyContent: "space-around", zIndex: 40,
    }}>
      {tabs.map(t => {
        if (t.isScan) {
          return (
            <button key="scan" onClick={() => go("capture")} style={{
              background: T3.indigo, border: "none", width: 54, height: 54, borderRadius: 27, marginTop: -22,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: T3.fab, flexShrink: 0,
            }}>
              <I3 name="camera" size={23} color="white" strokeWidth={1.8} />
            </button>
          );
        }
        const active = screen === t.id || (t.id === "vault" && screen === "vault");
        return (
          <button key={t.id} onClick={() => go(t.id)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: 6, flex: 1, position: "relative" }}>
            <I3 name={t.icon} size={22} color={active ? T3.indigo : T3.muted} strokeWidth={active ? 2 : 1.5} />
            <span style={{ fontFamily: T3.sans, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? T3.indigo : T3.muted }}>{t.label}</span>
            {t.badge && <span style={{ position: "absolute", top: 4, right: "calc(50% - 16px)", width: 8, height: 8, borderRadius: 4, background: T3.indigo, border: "2px solid white" }} />}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// App — owns journey state. `journey` prop: "new" | "returning" | "proactive" | "allclear"
// ─────────────────────────────────────────────────────────────
const W3_START = {
  new:       { screen: "welcome",  score: 0,  requests: [], push: false },
  returning: { screen: "home",     score: 73, requests: [], push: false },
  proactive: { screen: "home",     score: 73, requests: [], push: true },
  allclear:  { screen: "vault",    score: 86, requests: [], push: false },
};

function W3App({ journey = "new", screenOverride, onScreenChange, tweaks = {} }) {
  const start = W3_START[journey] || W3_START.new;
  const [screen, setScreen] = React.useState(start.screen);
  const [score, setScore] = React.useState(start.score);
  const [requests, setRequests] = React.useState(start.requests);
  const [push, setPush] = React.useState(false);
  const [prefillFinding, setPrefill] = React.useState(null);
  const [captureIntent, setIntent] = React.useState(null);
  const [justFiled, setJustFiled] = React.useState(false);
  const [showHomes, setShowHomes] = React.useState(false);
  const allClear = journey === "allclear";

  // Reset when journey changes
  React.useEffect(() => {
    const s = W3_START[journey] || W3_START.new;
    setScreen(s.screen); setScore(s.score); setRequests(s.requests); setPush(false); setPrefill(null); setIntent(null);
  }, [journey]);

  // Jump from left rail
  React.useEffect(() => {
    if (screenOverride) { setShowHomes(false); setScreen(screenOverride.id); }
  }, [screenOverride]);

  // Proactive journey: drop the push banner in after 1.8s on home
  React.useEffect(() => {
    if (journey === "proactive" && screen === "home") {
      const t = setTimeout(() => setPush(true), 1800);
      return () => clearTimeout(t);
    }
  }, [journey, screen]);

  React.useEffect(() => { onScreenChange && onScreenChange(screen); }, [screen]);

  const go = (id, opts) => {
    if (id === "back") id = "home";
    setShowHomes(false);
    if (id === "request") setPrefill(opts && opts.finding ? opts.finding : null);
    if (id === "docCabinet") setJustFiled(!!(opts && opts.filed));
    // Document-mode scan reuses the kitchen scan flow, then lands on the 3D result
    if (id === "scanDone" && captureIntent === "document") id = "capture3D";
    setScreen(id);
  };

  const pickMode = (mode) => {
    setIntent(mode);
    setScreen(mode === "fix" ? "fixSnap" : mode === "design" ? "designSnap" : mode === "docs" ? "docSnap" : mode === "appliance" ? "applianceSnap" : "scanCoach");
  };

  const submitRequest = (trade, findingId, urgent) => {
    setRequests([{ trade, findingId, urgent: !!urgent, status: "matching" }]);
  };
  const quotesReady = () => setRequests(rs => rs.map(r => ({ ...r, status: "quotes" })));
  const pickQuote = (pro) => { setRequests(rs => rs.map(r => ({ ...r, pro }))); setScreen("booking"); };
  const bookSlot = (pro, slot) => { setRequests(rs => rs.map(r => ({ ...r, pro, slot, status: "booked" }))); setScreen("tracking"); };
  const jobDone = () => setRequests(rs => rs.map(r => ({ ...r, status: "done" })));
  const markPaid = () => { setRequests(rs => rs.map(r => ({ ...r, status: "paid" }))); setScreen("rate"); };
  const markRated = () => setRequests(rs => rs.map(r => ({ ...r, status: "rated" })));

  // Jumping into a job screen from the rail with no request? Seed a demo one.
  React.useEffect(() => {
    if (!screenOverride) return;
    const id = screenOverride.id;
    const needsReq = ["quotes", "booking", "payment", "rate"].includes(id);
    if (needsReq && requests.length === 0) {
      const status = id === "quotes" ? "quotes" : id === "booking" ? "quotes" : id === "payment" ? "done" : "paid";
      setRequests([{ trade: "HVAC", findingId: null, status, pro: JOB_QUOTES[0], slot: "Today · 2:00 PM" }]);
    }
  }, [screenOverride]);

  const state = { score, requests };
  const TAB_SCREENS = new Set(["home", "vault", "profile"]);

  let body = null;
  if (screen === "welcome")   body = <W3Welcome go={go} tweaks={tweaks} />;
  if (screen === "addHome")   body = <W3AddHome go={go} />;
  if (screen === "scanCoach") body = <W3ScanCoach go={go} />;
  if (screen === "scanCam")   body = <W3ScanCam go={go} />;
  if (screen === "scanProc")  body = <W3ScanProc go={go} />;
  if (screen === "scanDone")  body = <W3ScanDone go={go} onComplete={() => journey === "new" && setScore(12)} />;
  if (screen === "vault")     body = <W3Vault go={go} state={state} allClear={allClear} />;
  if (screen === "home")      body = <W3Home go={go} state={state} onSwitchHome={() => setShowHomes(true)} />;
  if (screen === "profile")   body = <W3Profile go={go} state={state} />;
  if (screen === "request")   body = <W3Request go={go} prefillFinding={prefillFinding} onSubmit={submitRequest} />;
  const req = requests[0];
  if (screen === "tracking") {
    if (!req)                          body = <W3Request go={go} prefillFinding={null} onSubmit={submitRequest} />;
    else if (req.status === "matching") body = <W3Tracking go={go} state={state} onAssigned={quotesReady} />;
    else if (req.status === "quotes")   body = <W3Quotes go={go} onPick={pickQuote} />;
    else if (req.status === "booked")   body = <W3JobStatus go={go} req={req} onJobDone={() => { jobDone(); setScreen("payment"); }} />;
    else if (req.status === "done")     body = <W3Payment go={go} req={req} onPaid={markPaid} />;
    else if (req.status === "paid")     body = <W3RatePro go={go} req={req} onRated={markRated} />;
    else                                body = <W3JobStatus go={go} req={req} onJobDone={() => {}} />;
  }
  if (screen === "quotes")   body = <W3Quotes go={go} onPick={pickQuote} />;
  if (screen === "booking")  body = <W3Booking go={go} pro={req && req.pro} onBook={bookSlot} />;
  if (screen === "payment")  body = <W3Payment go={go} req={req} onPaid={markPaid} />;
  if (screen === "rate")     body = <W3RatePro go={go} req={req} onRated={markRated} />;
  if (screen === "plans")    body = <W3Plans go={go} />;
  if (screen === "referral") body = <W3Referral go={go} />;
  if (screen === "recall")   body = <W3Recall go={go} />;
  if (screen === "notifPrefs") body = <W3NotifPrefs go={go} />;
  if (screen === "inspections") body = <W3Inspections go={go} />;
  if (screen === "emergency") body = <W3Emergency go={go} onSubmit={submitRequest} />;
  if (screen === "services") body = <W3Services go={go} />;
  if (screen === "scoutRequest") body = <W3ScoutRequest go={go} />;
  if (screen === "scoutQuote") body = <W3ScoutQuote go={go} />;
  if (screen === "scoutProject") body = <W3ScoutProject go={go} />;
  if (screen === "shopLook")  body = <W3ShopLook go={go} />;
  if (screen === "proactive") body = <W3Proactive go={go} />;
  // Capture hub + AI flows
  if (screen === "capture")    body = <W3CaptureHub go={go} onPickMode={pickMode} onBack={() => go("home")} />;
  if (screen === "fixSnap")    body = <W3Snap title="Snap the problem" hint="Frame the issue, then tap to capture" photo={T3_PHOTOS.bathroom} badge="AI will identify what it sees" onBack={() => go("capture")} onCapture={() => go("fixChat")} />;
  if (screen === "fixChat")    body = <W3FixChat go={go} photo={T3_PHOTOS.bathroom} />;
  if (screen === "capture3D")  body = <W3Capture3D go={go} state={state} onScore={() => setScore(s => Math.min(s + 9, 100))} />;
  if (screen === "designSnap") body = <W3Snap title="Capture your room" hint="Fit the whole space in frame" photo={T3_PHOTOS.living} badge="We'll restyle this with AI" onBack={() => go("capture")} onCapture={() => go("designChat")} />;
  if (screen === "designChat") body = <W3DesignChat go={go} photo={T3_PHOTOS.living} />;
  if (screen === "designRender") body = <W3DesignRender go={go} />;
  if (screen === "designShop") body = <W3DesignShop go={go} />;
  // Filing cabinet
  if (screen === "docSnap")     body = <W3Snap title="Scan a document" hint="Lay it flat — AI reads and files it" photo={T3_PHOTOS.kitchen} badge="Warranties, bills, manuals — anything" onBack={() => go("capture")} onCapture={() => go("docClassify")} />;
  if (screen === "docClassify") body = <W3DocClassify go={go} />;
  if (screen === "applianceSnap") body = <W3Snap title="Snap the nameplate" hint="Get close — the sticker with model & serial" photo={T3_PHOTOS.roofNow} badge="AI reads make, model, age & recalls" onBack={() => go("capture")} onCapture={() => go("applianceResult")} />;
  if (screen === "applianceResult") body = <W3NameplateResult go={go} />;
  if (screen === "docCabinet")  body = <W3DocCabinet go={go} justFiled={justFiled} />;

  return (
    <div style={{ position: "relative", height: "100%", background: "white", overflow: "hidden" }}>
      <T3Styles />
      <div key={screen} className="t3-in" style={{ position: "absolute", inset: 0 }}>
        {body}
      </div>
      {TAB_SCREENS.has(screen) && <W3TabBar screen={screen} go={go} hasRequest={requests.length > 0} />}
      {push && screen === "home" && (
        <W3PushBanner onTap={() => { setPush(false); go("proactive"); }} onDismiss={() => setPush(false)} />
      )}
      {showHomes && <W3HomeSwitcher current="h1" onClose={() => setShowHomes(false)} onPick={() => setShowHomes(false)} />}
    </div>
  );
}

Object.assign(window, { W3App, W3TabBar, W3_START });
