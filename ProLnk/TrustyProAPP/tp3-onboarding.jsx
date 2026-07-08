// TrustyPro v3 — Welcome, Add Home (magic autofill), Scan flow

// ─────────────────────────────────────────────────────────────
// Welcome — "Your home, handled."
// ─────────────────────────────────────────────────────────────
function W3Welcome({ go, tweaks = {} }) {
  const es = tweaks.lang === "ES";
  const hero = tweaks.heroPhoto || T3_PHOTOS.heroExterior;
  const headline = es ? ES_WELCOME.headline : (tweaks.headline || "Your home,\nhandled.");
  const subhead = es ? ES_WELCOME.subhead : (tweaks.subhead || "Scan your home, see its health, and get matched with vetted pros — all free, all in one place.");
  return (
    <div data-screen-label="Welcome" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "white" }}>
      <div style={{ flex: "0 0 55%", position: "relative", overflow: "hidden" }}>
        <Img src={hero} h="100%" />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 140, background: "linear-gradient(to bottom, rgba(20,18,43,0.45), transparent)" }} />
        <div style={{ position: "absolute", top: 56, left: 22 }}>
          <TrustyLockup height={36} white style={{ filter: "drop-shadow(0 2px 10px rgba(20,18,43,0.4))" }} />
        </div>
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 110, background: "linear-gradient(to bottom, transparent, white)" }} />
      </div>

      <div style={{ flex: 1, padding: "4px 26px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div className="t3-in">
          <h1 style={{ fontFamily: T3.sans, fontSize: 38, lineHeight: 1.06, fontWeight: 800, color: T3.ink, letterSpacing: "-0.035em", margin: 0, whiteSpace: "pre-line" }}>
            {headline}
          </h1>
          <p style={{ fontFamily: T3.sans, fontSize: 15.5, lineHeight: 1.55, color: T3.ink2, marginTop: 14, maxWidth: 300 }}>
            {subhead}
          </p>
        </div>
        <div>
          <Btn onClick={() => go("addHome")}>{es ? ES_WELCOME.addHome : "Add my home"} <I3 name="arrowR" size={18} color="white" /></Btn>
          <Btn kind="ghost" style={{ marginTop: 10 }} onClick={() => go("home")}>{es ? ES_WELCOME.signIn : "Sign in"}</Btn>
          {tweaks.freeBadge !== false &&
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 16 }}>
            <I3 name="checkC" size={13} color={T3.green} />
            <span style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted }}>{es ? ES_WELCOME.freeBadge : "Always free for homeowners"}</span>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Add Home — address autofill → "magic" property data cascade
// ─────────────────────────────────────────────────────────────
function W3AddHome({ go }) {
  const [phase, setPhase] = React.useState("type");   // type | pulling | revealed
  const [value, setValue] = React.useState("");
  const [shown, setShown] = React.useState(0);        // how many fields revealed

  const suggestions = [
    "1234 Main St, Frisco, TX 75033",
    "1234 Main St, Plano, TX 75093",
    "1234 Mainsail Dr, McKinney, TX 75070",
  ].filter(s => !value || s.toLowerCase().includes(value.toLowerCase()));

  const pick = () => {
    setValue(T3_PROPERTY.address + ", " + T3_PROPERTY.cityState);
    setPhase("pulling");
    setTimeout(() => setPhase("revealed"), 1400);
  };

  // cascade fields in
  React.useEffect(() => {
    if (phase !== "revealed") return;
    setShown(0);
    const t = setInterval(() => setShown(n => {
      if (n >= T3_PROPERTY.fields.length) { clearInterval(t); return n; }
      return n + 1;
    }), 90);
    return () => clearInterval(t);
  }, [phase]);

  return (
    <div data-screen-label="Add home" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "58px 24px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <BackBtn onClick={() => go("welcome")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Add your home</span>
      </div>

      <h1 style={{ fontFamily: T3.sans, fontSize: 28, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.12 }}>
        Where's home?
      </h1>
      <p style={{ fontFamily: T3.sans, fontSize: 14.5, lineHeight: 1.5, color: T3.ink2, marginTop: 8, marginBottom: 22 }}>
        Start typing — we'll pull your property records automatically.
      </p>

      {/* Address field */}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "white", border: `1.5px solid ${phase !== "type" ? T3.indigo : value ? T3.ink : T3.border}`, borderRadius: 15, padding: "0 16px", height: 56, transition: "border-color 200ms" }}>
          <I3 name="mapPin" size={18} color={phase !== "type" ? T3.indigo : T3.muted} />
          <input value={value} onChange={e => { setValue(e.target.value); }} placeholder="Enter your address" disabled={phase !== "type"}
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: T3.sans, fontSize: 15, color: T3.ink, fontWeight: 500 }} />
          {phase === "type" ? <I3 name="search" size={18} color={T3.muted} /> : <I3 name="checkC" size={18} color={T3.indigo} />}
        </div>

        {phase === "type" && value && suggestions.length > 0 && (
          <div className="t3-in" style={{ background: "white", border: `1px solid ${T3.border}`, borderRadius: 15, marginTop: 8, boxShadow: T3.lift, overflow: "hidden", position: "relative", zIndex: 10 }}>
            {suggestions.map((s, i) => (
              <button key={s} onClick={pick} style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 11, borderBottom: i < suggestions.length - 1 ? `1px solid ${T3.borderSubtle}` : "none" }}>
                <I3 name="mapPin" size={15} color={T3.muted} />
                <span style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink }}>{s}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Demo helper */}
      {phase === "type" && !value && (
        <button onClick={pick} style={{ marginTop: 14, width: "100%", background: T3.surface, border: `1px dashed ${T3.border}`, borderRadius: 13, padding: 14, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <I3 name="sparkles" size={15} color={T3.indigo} />
          <span style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink2 }}>Demo — use 1234 Main St, Frisco</span>
        </button>
      )}

      {/* Pulling records */}
      {phase === "pulling" && (
        <div className="t3-in" style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span className="t3-ping" style={{ width: 8, height: 8, borderRadius: 4, background: T3.indigo }} />
            <span style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.indigo }}>Pulling public property records…</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className="t3-shimmer" style={{ height: 64, borderRadius: 13 }} />
            ))}
          </div>
        </div>
      )}

      {/* Revealed property data */}
      {phase === "revealed" && (
        <div style={{ marginTop: 22 }}>
          <div className="t3-in" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <I3 name="sparkles" size={15} color={T3.indigo} />
            <span style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 700, color: T3.ink }}>Found it. Here's what the records say:</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {T3_PROPERTY.fields.map((f, i) => (
              <div key={f.k} className={i < shown ? "t3-in" : ""} style={{
                background: T3.surface, border: `1px solid ${T3.borderSubtle}`, borderRadius: 13, padding: "11px 14px",
                opacity: i < shown ? 1 : 0, transition: "opacity 150ms",
              }}>
                <div style={{ fontFamily: T3.sans, fontSize: 10.5, color: T3.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6 }}>{f.k}</div>
                <div style={{ fontFamily: T3.sans, fontSize: 15.5, fontWeight: 700, color: T3.ink, marginTop: 2, letterSpacing: "-0.01em" }}>{f.v}</div>
              </div>
            ))}
          </div>

          {shown >= T3_PROPERTY.fields.length && (
            <div className="t3-in" style={{ marginTop: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: T3.tint, border: `1px solid ${T3.tintBorder}`, borderRadius: 14, padding: "13px 15px", marginBottom: 16 }}>
                <I3 name="fileCheck" size={18} color={T3.indigo} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 700, color: T3.ink }}>We found a 2019 inspection of this home.</div>
                  <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.ink2, marginTop: 1 }}>$29 — auto-fills your Vault with systems, ages & known issues</div>
                </div>
                <I3 name="chevR" size={15} color={T3.indigo} />
              </div>
              <Btn onClick={() => go("scanCoach")}>Looks right — scan my home <I3 name="arrowR" size={18} color="white" /></Btn>
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <button style={{ background: "none", border: "none", fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2, cursor: "pointer" }}>Something's off — edit details</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Scan coaching
// ─────────────────────────────────────────────────────────────
function W3ScanCoach({ go }) {
  return (
    <div data-screen-label="Scan coaching" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.tint, overflowY: "auto", padding: "58px 24px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
        <BackBtn onClick={() => go("addHome")} />
        <span style={{ fontFamily: T3.mono, fontSize: 11.5, color: T3.indigo, background: "white", borderRadius: 999, padding: "6px 13px", border: `1px solid ${T3.tintBorder}` }}>SPACE 01 / 11</span>
      </div>

      <h1 style={{ fontFamily: T3.sans, fontSize: 30, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.12 }}>
        Let's start with<br/>your kitchen.
      </h1>
      <p style={{ fontFamily: T3.sans, fontSize: 14.5, lineHeight: 1.55, color: T3.ink2, marginTop: 10, marginBottom: 24 }}>
        Stand in the doorway and pan slowly left to right. We'll guide you the whole way.
      </p>

      <Img src={T3_PHOTOS.kitchen} h={170} radius={18} label="Like this — whole room visible" style={{ marginBottom: 24, boxShadow: T3.lift }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 30 }}>
        {[
          "Stand back so the whole room fits the frame",
          "Pan slowly — about 5 seconds per wall",
          "We'll spot appliances and model numbers for you",
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 13, background: "white", borderRadius: 14, padding: "13px 15px", border: `1px solid ${T3.tintBorder}` }}>
            <div style={{ width: 26, height: 26, borderRadius: 13, background: T3.indigo, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T3.sans, fontSize: 12.5, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink, lineHeight: 1.45, paddingTop: 3, fontWeight: 500 }}>{step}</div>
          </div>
        ))}
      </div>

      <Btn onClick={() => go("scanCam")}><I3 name="camera" size={19} color="white" /> Open camera</Btn>
      <div style={{ textAlign: "center", marginTop: 13 }}>
        <button onClick={() => go("vault")} style={{ background: "none", border: "none", fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2, cursor: "pointer" }}>Skip for now</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Camera — auto-capture with AR guides
// ─────────────────────────────────────────────────────────────
function W3ScanCam({ go }) {
  const [walls, setWalls] = React.useState(2);
  React.useEffect(() => {
    const t = setInterval(() => setWalls(w => {
      if (w >= 8) { clearInterval(t); return w; }
      return w + 1;
    }), 900);
    return () => clearInterval(t);
  }, []);
  React.useEffect(() => {
    if (walls >= 8) {
      const t = setTimeout(() => go("scanProc"), 700);
      return () => clearTimeout(t);
    }
  }, [walls]);

  return (
    <div data-screen-label="Camera" style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0a0a12" }}>
      <Img src={T3_PHOTOS.kitchen} h="100%" style={{ filter: "brightness(0.82)" }} />

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 140, background: "linear-gradient(to bottom, rgba(10,10,18,0.8), transparent)" }} />
      <div style={{ position: "absolute", top: 56, left: 0, right: 0, padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => go("scanCoach")} style={{ width: 38, height: 38, borderRadius: 19, background: "rgba(0,0,0,0.45)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <I3 name="x" size={19} color="white" />
        </button>
        <div style={{ fontFamily: T3.sans, fontSize: 15.5, fontWeight: 600, color: "white" }}>Kitchen scan</div>
        <button style={{ width: 38, height: 38, borderRadius: 19, background: "rgba(0,0,0,0.45)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <I3 name="flash" size={18} color="white" />
        </button>
      </div>

      {/* AR corners */}
      <div style={{ position: "absolute", inset: "160px 36px 230px" }}>
        {[[0,0],[0,1],[1,0],[1,1]].map(([y, x], i) => (
          <div key={i} style={{ position: "absolute", [y ? "bottom" : "top"]: -2, [x ? "right" : "left"]: -2, width: 34, height: 34, [y ? "borderBottom" : "borderTop"]: "2.5px solid white", [x ? "borderRight" : "borderLeft"]: "2.5px solid white", borderRadius: 5 }} />
        ))}
        {/* detected-appliance tag */}
        {walls >= 4 && (
          <div className="t3-in" style={{ position: "absolute", top: "38%", left: "12%", background: "rgba(79,70,229,0.92)", borderRadius: 9, padding: "6px 11px", display: "flex", alignItems: "center", gap: 6, backdropFilter: "blur(4px)" }}>
            <I3 name="fridge" size={13} color="white" />
            <span style={{ fontFamily: T3.sans, fontSize: 11.5, fontWeight: 600, color: "white" }}>Refrigerator · LG</span>
          </div>
        )}
        {walls >= 6 && (
          <div className="t3-in" style={{ position: "absolute", top: "62%", right: "10%", background: "rgba(79,70,229,0.92)", borderRadius: 9, padding: "6px 11px", display: "flex", alignItems: "center", gap: 6, backdropFilter: "blur(4px)" }}>
            <I3 name="flame" size={13} color="white" />
            <span style={{ fontFamily: T3.sans, fontSize: 11.5, fontWeight: 600, color: "white" }}>Range · GE</span>
          </div>
        )}
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 250, background: "linear-gradient(to top, rgba(10,10,18,0.88), transparent)" }} />
      <div style={{ position: "absolute", bottom: 48, left: 0, right: 0, padding: "0 26px" }}>
        <div style={{ textAlign: "center", marginBottom: 16, fontFamily: T3.sans, fontSize: 14.5, fontWeight: 500, color: "white" }}>
          {walls >= 8 ? "Got it — wrapping up" : "Pan slowly to the right →"}
        </div>
        {/* progress segments */}
        <div style={{ display: "flex", gap: 5, marginBottom: 20 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < walls ? T3.indigo : "rgba(255,255,255,0.25)", transition: "background 300ms" }} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: 60 }} />
          <button onClick={() => setWalls(w => Math.min(w + 1, 8))} style={{ width: 76, height: 76, borderRadius: 38, border: "4px solid rgba(255,255,255,0.95)", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 58, height: 58, borderRadius: 29, background: "white" }} />
          </button>
          <div style={{ width: 60, textAlign: "right" }}>
            <div style={{ fontFamily: T3.sans, fontSize: 17, fontWeight: 700, color: "white", fontVariantNumeric: "tabular-nums" }}>{walls}/8</div>
            <div style={{ fontFamily: T3.sans, fontSize: 11, color: "rgba(255,255,255,0.65)" }}>walls</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Processing — staged AI messages
// ─────────────────────────────────────────────────────────────
function W3ScanProc({ go }) {
  const stages = ["Stitching your room…", "Identifying appliances…", "Reading model numbers…", "Checking for issues…"];
  const [stage, setStage] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setStage(s => {
      if (s >= stages.length - 1) { clearInterval(t); setTimeout(() => go("scanDone"), 900); return s; }
      return s + 1;
    }), 850);
    return () => clearInterval(t);
  }, []);
  return (
    <div data-screen-label="Analyzing" style={{ position: "absolute", inset: 0, background: T3.ink, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{ position: "relative", width: "100%", height: 190, borderRadius: 18, overflow: "hidden", marginBottom: 28 }}>
        <Img src={T3_PHOTOS.kitchen} h="100%" style={{ filter: "brightness(0.75) saturate(0.9)" }} />
        <div className="w3-scanline" style={{ position: "absolute", left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, #8B85F2, transparent)`, boxShadow: "0 0 16px #6D64F2" }} />
      </div>
      <div style={{ fontFamily: T3.sans, fontSize: 18, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>Analyzing your kitchen</div>
      <div key={stage} className="t3-in" style={{ fontFamily: T3.sans, fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 10 }}>{stages[stage]}</div>
      <div style={{ display: "flex", gap: 6, marginTop: 22 }}>
        {stages.map((_, i) => (
          <div key={i} style={{ width: i === stage ? 22 : 7, height: 7, borderRadius: 4, background: i <= stage ? "#8B85F2" : "rgba(255,255,255,0.2)", transition: "all 300ms" }} />
        ))}
      </div>
      <style>{`@keyframes w3scan { 0%{top:8%} 100%{top:88%} } .w3-scanline { animation: w3scan 1.5s ease-in-out infinite alternate; }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Scan complete — score rises, captured list
// ─────────────────────────────────────────────────────────────
function W3ScanDone({ go, onComplete }) {
  React.useEffect(() => { onComplete && onComplete(); }, []);
  const captured = [
    { icon: "grid",    label: "Room dimensions", sub: "182 sqft mapped" },
    { icon: "fridge",  label: "Refrigerator", sub: "LG · LRMVS3006S · 2019" },
    { icon: "flame",   label: "Range", sub: "GE · gas" },
    { icon: "droplet", label: "Dishwasher", sub: "Bosch · 2021" },
  ];
  return (
    <div data-screen-label="Scan complete" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "70px 26px 36px" }}>
      <div style={{ textAlign: "center" }}>
        <div className="t3-in" style={{ width: 54, height: 54, borderRadius: 27, background: T3.greenBg, border: `1px solid ${T3.greenBd}`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
          <I3 name="check" size={26} color={T3.green} strokeWidth={2.2} />
        </div>
        <h1 style={{ fontFamily: T3.sans, fontSize: 27, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: 0 }}>Kitchen documented.</h1>
        <p style={{ fontFamily: T3.sans, fontSize: 14.5, lineHeight: 1.5, color: T3.ink2, marginTop: 8, maxWidth: 290, marginLeft: "auto", marginRight: "auto" }}>
          8 angles, 3 appliances, zero issues. Your Home Health Score just moved.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "22px 0 6px" }}>
        <HealthScoreRing score={12} size={170} />
      </div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <span style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 700, color: T3.greenInk, background: T3.greenBg, border: `1px solid ${T3.greenBd}`, borderRadius: 999, padding: "5px 13px" }}>▲ 12 from this scan</span>
      </div>

      <div style={{ background: T3.surface, borderRadius: 16, padding: "6px 16px", marginBottom: 22 }}>
        {captured.map((c, i) => (
          <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < captured.length - 1 ? `1px solid ${T3.border}` : "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "white", border: `1px solid ${T3.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <I3 name={c.icon} size={16} color={T3.indigo} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink }}>{c.label}</div>
              <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted }}>{c.sub}</div>
            </div>
            <I3 name="check" size={15} color={T3.green} strokeWidth={2.2} />
          </div>
        ))}
      </div>

      <Btn onClick={() => go("vault")}>See my Health Vault <I3 name="arrowR" size={18} color="white" /></Btn>
      <div style={{ textAlign: "center", marginTop: 13 }}>
        <button onClick={() => go("scanCoach")} style={{ background: "none", border: "none", fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2, cursor: "pointer" }}>Scan the next room</button>
      </div>
    </div>
  );
}

Object.assign(window, { W3Welcome, W3AddHome, W3ScanCoach, W3ScanCam, W3ScanProc, W3ScanDone });
