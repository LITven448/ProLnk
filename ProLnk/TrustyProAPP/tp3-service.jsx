// TrustyPro v3 — Request service, tracking, shop-this-look (hotspots), proactive notification

// ─────────────────────────────────────────────────────────────
// Request Service — 3 calm steps. Prefills from a finding.
// ─────────────────────────────────────────────────────────────
function W3Request({ go, prefillFinding, onSubmit }) {
  const [step, setStep] = React.useState(prefillFinding ? 1 : 0);
  const [urgent, setUrgent] = React.useState(false);
  const [trade, setTrade] = React.useState(prefillFinding ? prefillFinding.trade : null);
  const [scope, setScope] = React.useState(prefillFinding ? `From my Health Vault: ${prefillFinding.title.toLowerCase()}. ${prefillFinding.description.split(".")[0]}.` : "");
  // photos attached to the request — prefilled with the scan photo when coming from a finding
  const [photos, setPhotos] = React.useState(prefillFinding && prefillFinding.photo ? [{ src: prefillFinding.photo, fromScan: true }] : []);
  const fileRef = React.useRef(null);

  const onFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const next = files.map((f) => ({ src: URL.createObjectURL(f), fromScan: false }));
    setPhotos((p) => [...p, ...next].slice(0, 6));
    e.target.value = "";
  };
  const removePhoto = (i) => setPhotos((p) => p.filter((_, idx) => idx !== i));

  const Header = () =>
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
      <BackBtn onClick={() => step === 0 ? go("back") : setStep((s) => s - 1)} />
      <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Request a service</span>
      <span style={{ marginLeft: "auto", fontFamily: T3.mono, fontSize: 11.5, color: T3.muted }}>{step + 1} / 3</span>
    </div>;

  const Progress = () =>
  <div style={{ display: "flex", gap: 6, margin: "16px 0 24px" }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? T3.indigo : T3.border, transition: "background 240ms" }} />)}
    </div>;

  const H = ({ children }) => <h1 style={{ fontFamily: T3.sans, fontSize: 26, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 8px", lineHeight: 1.15 }}>{children}</h1>;
  const P = ({ children }) => <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 22px" }}>{children}</p>;
  const Label = ({ children }) => <div style={{ fontFamily: T3.sans, fontSize: 12.5, fontWeight: 600, color: T3.ink2, marginBottom: 8 }}>{children}</div>;

  return (
    <div data-screen-label="Request service" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "58px 24px 40px" }}>
      <Header /><Progress />

      {step === 0 &&
      <div className="t3-in">
          <H>What needs doing?</H>
          <P>Pick a category. We'll match you with a vetted, background-checked pro — you never have to search.</P>
          <button onClick={() => { setUrgent(true); go("emergency"); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, background: T3.redBg, border: `1.5px solid ${T3.redBd}`, borderRadius: 15, padding: "14px 16px", cursor: "pointer", marginBottom: 16, textAlign: "left" }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <I3 name="zap" size={17} color={T3.red} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 700, color: T3.redInk }}>It's an emergency</div>
              <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.ink2, marginTop: 1 }}>Burst pipe, no heat, no power — priority match in minutes</div>
            </div>
            <I3 name="chevR" size={16} color={T3.redInk} />
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {T3_TRADES.map((t) => {
            const on = trade === t.label;
            return (
              <button key={t.label} onClick={() => {setTrade(t.label);setTimeout(() => setStep(1), 170);}} style={{
                background: on ? T3.ink : "white", border: `1.5px solid ${on ? T3.ink : T3.border}`, borderRadius: 16,
                padding: "18px 15px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 11,
                boxShadow: T3.rest, transition: "all 160ms"
              }}>
                  <I3 name={t.icon} size={21} color={on ? "white" : T3.indigo} strokeWidth={1.6} />
                  <span style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 700, color: on ? "white" : T3.ink }}>{t.label}</span>
                </button>);

          })}
          </div>
        </div>
      }

      {step === 1 &&
      <div className="t3-in">
          <H>Tell us a little more.</H>
          <P>A sentence is plenty — your pro follows up on the rest.</P>

          {prefillFinding &&
        <div style={{ display: "flex", gap: 11, background: T3.tint, border: `1px solid ${T3.tintBorder}`, borderRadius: 13, padding: "12px 14px", marginBottom: 16 }}>
              <I3 name="sparkles" size={16} color={T3.indigo} style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, lineHeight: 1.5 }}>
                <b style={{ color: T3.ink }}>Prefilled from your scan.</b> We attached the photos and details automatically.
              </div>
            </div>
        }

          <Label>Service</Label>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T3.surface, border: `1px solid ${T3.border}`, borderRadius: 11, padding: "10px 15px", marginBottom: 18 }}>
            <I3 name="checkC" size={15} color={T3.indigo} />
            <span style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 700, color: T3.ink }}>{trade}</span>
          </div>

          <Label>What's going on?</Label>
          <textarea value={scope} onChange={(e) => setScope(e.target.value)} placeholder="e.g. AC isn't cooling like it used to…" rows={4}
        style={{ width: "100%", border: `1.5px solid ${T3.border}`, borderRadius: 14, padding: 15, fontFamily: T3.sans, fontSize: 14, color: T3.ink, resize: "none", outline: "none", lineHeight: 1.5, marginBottom: 18, boxSizing: "border-box" }} />

          <Label>Add photos <span style={{ color: T3.muted, fontWeight: 500 }}>· optional, helps your pro quote faster</span></Label>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={onFiles} style={{ display: "none" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 26 }}>
            {photos.map((ph, i) => (
              <div key={i} style={{ position: "relative", width: 78, height: 78, borderRadius: 13, overflow: "hidden", border: `1px solid ${T3.border}` }}>
                <Img src={ph.src} h="100%" />
                {ph.fromScan && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(79,70,229,0.92)", padding: "2px 0", textAlign: "center" }}>
                    <span style={{ fontFamily: T3.sans, fontSize: 8.5, fontWeight: 700, color: "white", letterSpacing: 0.4 }}>FROM SCAN</span>
                  </div>
                )}
                <button onClick={() => removePhoto(i)} style={{ position: "absolute", top: 3, right: 3, width: 20, height: 20, borderRadius: 10, background: "rgba(20,18,43,0.72)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
                  <I3 name="x" size={13} color="white" strokeWidth={2.5} />
                </button>
              </div>
            ))}
            {photos.length < 6 && (
              <button onClick={() => fileRef.current && fileRef.current.click()} style={{ width: 78, height: 78, borderRadius: 13, border: `1.5px dashed ${T3.border}`, background: T3.surface, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer" }}>
                <I3 name="camera" size={19} color={T3.indigo} />
                <span style={{ fontFamily: T3.sans, fontSize: 10.5, fontWeight: 600, color: T3.ink2 }}>Add</span>
              </button>
            )}
          </div>

          <Label>Address</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: T3.surface, border: `1px solid ${T3.border}`, borderRadius: 13, padding: "13px 15px", marginBottom: 26 }}>
            <I3 name="mapPin" size={16} color={T3.muted} />
            <span style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink, flex: 1 }}>{T3_PROPERTY.address}, {T3_PROPERTY.cityState}</span>
            <span style={{ fontFamily: T3.sans, fontSize: 11, color: T3.indigo, fontWeight: 700 }}>AUTO</span>
          </div>

          <Btn onClick={() => setStep(2)}>Continue <I3 name="arrowR" size={18} color="white" /></Btn>
        </div>
      }

      {step === 2 &&
      <div className="t3-in">
          <H>Confirm and send.</H>
          <P>Everything happens in the app — messages, scheduling, updates. No phone numbers change hands.</P>

          <Label>Your name</Label>
          <div style={{ border: `1.5px solid ${T3.border}`, borderRadius: 13, padding: "14px 15px", fontFamily: T3.sans, fontSize: 14, color: T3.ink, fontWeight: 500, marginBottom: 18 }}>Sarah Mitchell</div>

          <div style={{ display: "flex", gap: 11, background: T3.tint, border: `1px solid ${T3.tintBorder}`, borderRadius: 13, padding: "13px 15px", marginBottom: 16 }}>
            <I3 name="message" size={17} color={T3.indigo} style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, lineHeight: 1.5 }}>
              <b style={{ color: T3.ink }}>In-app messaging only.</b> Your pro reaches you through TrustyPro chat — your phone number and email stay private.
            </div>
          </div>

          <div style={{ display: "flex", gap: 11, background: T3.greenBg, border: `1px solid ${T3.greenBd}`, borderRadius: 13, padding: "13px 15px", margin: "0 0 24px" }}>
            <I3 name="shieldCheck" size={17} color={T3.green} style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.greenInk, lineHeight: 1.5 }}>
              <b>Free for you, always.</b> You only ever pay the pro directly, for work you approve.
            </div>
          </div>

          <Btn onClick={() => {onSubmit(trade, prefillFinding ? prefillFinding.id : null, urgent);go("tracking");}}>
            Submit request <I3 name="arrowR" size={18} color="white" />
          </Btn>
        </div>
      }
    </div>);

}

// ─────────────────────────────────────────────────────────────
// Tracking — Submitted → Matching → Pro Assigned (live)
// ─────────────────────────────────────────────────────────────
function W3Tracking({ go, state, onAssigned }) {
  const req = state.requests[0] || { trade: "HVAC", status: "matching" };
  const assigned = req.status === "assigned";

  React.useEffect(() => {
    if (!assigned) {
      const t = setTimeout(() => onAssigned && onAssigned(), 3400);
      return () => clearTimeout(t);
    }
  }, [assigned]);

  const steps = [
  { title: "Request submitted", sub: `${req.trade} · today, 2:14 PM` },
  { title: "Finding your pros", sub: "Vetted, background-checked, nearby", live: req.urgent ? "Priority match — under 15 minutes" : "Usually under an hour" },
  { title: "3 quotes ready", sub: "Compare prices and availability — you pick" }];


  return (
    <div data-screen-label="Request tracking" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "58px 24px 130px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <BackBtn onClick={() => go("home")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Your request</span>
        <span style={{ marginLeft: "auto", fontFamily: T3.mono, fontSize: 11, color: T3.muted }}>#TP-4821</span>
      </div>

      <div style={{ background: assigned ? T3.greenBg : T3.tint, border: `1px solid ${assigned ? T3.greenBd : T3.tintBorder}`, borderRadius: 20, padding: 22, marginBottom: 26, transition: "all 400ms" }}>
        <div style={{ fontFamily: T3.sans, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: assigned ? T3.greenInk : T3.indigo }}>{req.trade}</div>
        <div style={{ fontFamily: T3.sans, fontSize: 23, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "6px 0 5px" }}>
          {assigned ? "You're matched." : "We're on it."}
        </div>
        <div style={{ fontFamily: T3.sans, fontSize: 13.5, color: T3.ink2, lineHeight: 1.55 }}>
          {assigned ? "A trusted pro accepted your request and will be in touch shortly." : "Sit tight — we're matching you with the right pro. No bidding wars, no spam calls, ever."}
        </div>
      </div>

      <StatusTimeline steps={steps} current={assigned ? 3 : 1} />

      {assigned &&
      <div className="t3-in" style={{ marginTop: 6, background: "white", border: `1px solid ${T3.border}`, borderRadius: 20, padding: 20, boxShadow: T3.lift }}>
          <div style={{ fontFamily: T3.sans, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: T3.muted, marginBottom: 13 }}>Your matched pro</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, background: T3.ink, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T3.sans, fontSize: 15, fontWeight: 800 }}>CC</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontFamily: T3.sans, fontSize: 16, fontWeight: 800, color: T3.ink, letterSpacing: "-0.01em" }}>Comfort Climate Co.</span>
              </div>
              <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, marginTop: 2 }}>{req.trade} specialist · serving Frisco</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 7, background: T3.greenBg, border: `1px solid ${T3.greenBd}`, borderRadius: 999, padding: "3px 10px" }}>
                <I3 name="shieldCheck" size={12} color={T3.green} />
                <span style={{ fontFamily: T3.sans, fontSize: 10.5, fontWeight: 700, color: T3.greenInk }}>Vetted · background-checked · insured</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <Btn size="sm" style={{ flex: 1 }}><I3 name="message" size={15} color="white" /> Message in app</Btn>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
            <I3 name="shield" size={12} color={T3.muted} />
            <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>All chat, scheduling, and updates stay in TrustyPro</span>
          </div>
        </div>
      }
    </div>);

}

// ─────────────────────────────────────────────────────────────
// Shop This Look — AI render with product hotspots
// ─────────────────────────────────────────────────────────────
function W3ShopLook({ go }) {
  const [view, setView] = React.useState("after");
  const [active, setActive] = React.useState(null);
  const cardRefs = React.useRef({});

  const tapHotspot = (id) => {
    setActive(id);
    const el = cardRefs.current[id];
    if (el && el.offsetParent) {
      const scroller = el.closest(".t3-screen");
      if (scroller) scroller.scrollTo({ top: el.offsetTop - 320, behavior: "smooth" });
    }
  };

  return (
    <div data-screen-label="Shop this look" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", paddingBottom: 50 }}>
      <div style={{ position: "relative", height: 330 }}>
        <Img src={view === "after" ? T3_PHOTOS.livingAfter : T3_PHOTOS.livingBefore} h="100%" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,18,43,0.35), transparent 35%)" }} />
        <div style={{ position: "absolute", top: 56, left: 20 }}><BackBtn light onClick={() => go("home")} /></div>
        <div style={{ position: "absolute", top: 56, right: 20, display: "flex", background: "rgba(255,255,255,0.94)", borderRadius: 999, padding: 3, backdropFilter: "blur(6px)" }}>
          {["before", "after"].map((v) =>
          <button key={v} onClick={() => setView(v)} style={{ border: "none", borderRadius: 999, padding: "7px 15px", cursor: "pointer", background: view === v ? T3.ink : "transparent", color: view === v ? "white" : T3.ink2, fontFamily: T3.sans, fontSize: 12, fontWeight: 700, textTransform: "capitalize", transition: "all 180ms" }}>{v}</button>
          )}
        </div>

        {/* hotspots on the render */}
        {view === "after" && T3_PRODUCTS.map((p, i) =>
        <button key={p.id} onClick={() => tapHotspot(p.id)} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)",
          width: 28, height: 28, borderRadius: 14, border: "none", cursor: "pointer",
          background: active === p.id ? T3.indigo : "rgba(255,255,255,0.95)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: T3.sans, fontSize: 12, fontWeight: 800, color: active === p.id ? "white" : T3.ink,
          transition: "all 180ms"
        }}>{i + 1}</button>
        )}

        {view === "after" &&
        <div style={{ position: "absolute", bottom: 14, left: 20, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(79,70,229,0.94)", color: "white", borderRadius: 999, padding: "6px 13px", backdropFilter: "blur(6px)" }}>
            <I3 name="sparkles" size={13} color="white" />
            <span style={{ fontFamily: T3.sans, fontSize: 11.5, fontWeight: 700 }}>AI render of your living room</span>
          </div>
        }
      </div>

      <div style={{ padding: "22px 24px 0" }}>
        <h1 style={{ fontFamily: T3.sans, fontSize: 24, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.15 }}>
          Here's how it could look.
        </h1>
        <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "8px 0 18px" }}>
          Rendered from your scan — every piece fits your room's real dimensions and light. Tap a numbered dot to see the piece.
        </p>

        <Btn kind="dark" style={{ marginBottom: 26 }}><I3 name="eye" size={18} color="white" /> View in my room (AR)</Btn>

        <Sect label="Shop the pieces" action={<span style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted, fontWeight: 500 }}>{T3_PRODUCTS.length} items</span>} />
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {T3_PRODUCTS.map((p, i) =>
          <div key={p.id} ref={(el) => cardRefs.current[p.id] = el} onClick={() => setActive(p.id)} style={{
            display: "flex", alignItems: "center", gap: 14, background: "white",
            border: `1.5px solid ${active === p.id ? T3.indigo : T3.border}`, borderRadius: 16, padding: "13px 15px",
            boxShadow: active === p.id ? T3.lift : T3.rest, cursor: "pointer", transition: "all 180ms"
          }}>
              <div style={{ width: 30, height: 30, borderRadius: 15, background: active === p.id ? T3.indigo : T3.surface, color: active === p.id ? "white" : T3.ink, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T3.sans, fontSize: 13, fontWeight: 800, flexShrink: 0, transition: "all 180ms" }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 700, color: T3.ink }}>{p.name}</div>
                <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted, marginTop: 1 }}>{p.brand}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 800, color: T3.ink, fontVariantNumeric: "tabular-nums" }}>{p.price}</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 3, color: T3.indigo, fontFamily: T3.sans, fontSize: 11.5, fontWeight: 700 }}>
                  Shop <I3 name="arrowR" size={11} color={T3.indigo} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={{ fontFamily: T3.sans, fontSize: 11, color: T3.muted, textAlign: "center", margin: "18px 0 8px", lineHeight: 1.5 }}>
          Prices from partner retailers. Never any cost to you from TrustyPro.
        </div>
      </div>
    </div>);

}

// ─────────────────────────────────────────────────────────────
// Proactive notice — "we noticed something" full screen
// ─────────────────────────────────────────────────────────────
function W3Proactive({ go }) {
  return (
    <div data-screen-label="Proactive alert" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", paddingBottom: 44 }}>
      <div style={{ position: "relative", height: 290 }}>
        <Img src={T3_PHOTOS.roofNow} h="100%" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,18,43,0.6), rgba(20,18,43,0.08) 45%, transparent)" }} />
        <button onClick={() => go("home")} style={{ position: "absolute", top: 56, right: 20, width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <I3 name="x" size={19} color={T3.ink} />
        </button>
        <div style={{ position: "absolute", top: 62, left: 24, display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.94)", borderRadius: 999, padding: "8px 14px", backdropFilter: "blur(6px)" }}>
          <I3 name="bell" size={14} color={T3.indigo} />
          <span style={{ fontFamily: T3.sans, fontSize: 12, fontWeight: 700, color: T3.ink }}>We noticed something at your home</span>
        </div>
        <div className="t3-ping" style={{ position: "absolute", top: "54%", left: "32%", width: 60, height: 60, borderRadius: 30, border: `3px solid ${T3.amber}`, boxShadow: `0 0 0 7px rgba(217,119,6,0.25)` }} />
      </div>

      <div style={{ padding: "24px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <SevBadge severity="high" />
          <span style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted, fontWeight: 500 }}>Roof · spotted in yesterday's scan</span>
        </div>
        <h1 style={{ fontFamily: T3.sans, fontSize: 25, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.18 }}>
          A few shingles look lifted near your north gable.
        </h1>
        <p style={{ fontFamily: T3.sans, fontSize: 14.5, color: T3.ink2, lineHeight: 1.6, margin: "10px 0 22px" }}>
          Not urgent — but catching it now is far cheaper than a leak later. Here's what a repair would look like.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: T3.sans, fontSize: 11, fontWeight: 700, color: T3.muted, textTransform: "uppercase", letterSpacing: 0.7, marginBottom: 6 }}>Now</div>
            <Img src={T3_PHOTOS.roofNow} h={115} radius={13} />
          </div>
          <div>
            <div style={{ fontFamily: T3.sans, fontSize: 11, fontWeight: 700, color: T3.indigo, textTransform: "uppercase", letterSpacing: 0.7, marginBottom: 6 }}>After repair</div>
            <Img src={T3_PHOTOS.roofAfter} h={115} radius={13} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <Chip><I3 name="wrench" size={12} color={T3.muted} />Roofing</Chip>
          <Chip>Est. $450–900</Chip>
          <Chip>~½ day</Chip>
        </div>

        <Btn onClick={() => go("request", { finding: T3_FINDINGS[0] })}>Get a quote — free</Btn>
        <div style={{ textAlign: "center", marginTop: 13 }}>
          <button onClick={() => go("home")} style={{ background: "none", border: "none", fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2, cursor: "pointer" }}>Remind me later</button>
        </div>
      </div>
    </div>);

}

// ─────────────────────────────────────────────────────────────
// Push banner — iOS-style notification that drops in over the app
// ─────────────────────────────────────────────────────────────
function W3PushBanner({ onTap, onDismiss }) {
  return (
    <button onClick={onTap} className="w3-push" style={{
      position: "absolute", top: 58, left: 12, right: 12, zIndex: 80,
      background: "rgba(250,250,253,0.97)", backdropFilter: "blur(16px)",
      border: "none", borderRadius: 20, padding: "13px 15px",
      display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", textAlign: "left",
      boxShadow: "0 10px 40px rgba(20,18,43,0.28)"
    }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: "white", border: `1px solid ${T3.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 6 }}>
        <TrustyMark size={26} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 700, color: T3.ink }}>TrustyPro</span>
          <span style={{ fontFamily: T3.sans, fontSize: 11, color: T3.muted }}>now</span>
        </div>
        <div style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink, marginTop: 1, fontWeight: 600 }}>We noticed something at your home</div>
        <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, marginTop: 1, lineHeight: 1.4 }}>Possible shingle lift on your roof — see what we found and what it'd cost to fix.</div>
      </div>
      <style>{`@keyframes w3push { from { transform: translateY(-120%); opacity: 0; } to { transform: none; opacity: 1; } } .w3-push { animation: w3push 480ms cubic-bezier(0.2,0.9,0.3,1.05) both; }`}</style>
    </button>);

}

Object.assign(window, { W3Request, W3Tracking, W3ShopLook, W3Proactive, W3PushBanner });