// TrustyPro v2 — Onboarding + Scan flow screens

// ─────────────────────────────────────────────────────────────
// 4.1 Welcome
// ─────────────────────────────────────────────────────────────
function WelcomeScreen({ next }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "white" }}>
      <div style={{ flex: "0 0 58%", position: "relative", overflow: "hidden" }}>
        <PhotoPlaceholder
          kind="exterior"
          height="100%"
          radius={0}
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=85&auto=format&fit=crop"
        />
        {/* Soft top vignette so brand wordmark sits well */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 130, background: "linear-gradient(to bottom, rgba(10,22,40,0.35), transparent)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "62px 24px 0", display: "flex", justifyContent: "space-between", color: "white", zIndex: 5 }}>
          <div style={{ fontFamily: TP.serif, fontSize: 17, fontWeight: 700, letterSpacing: -0.2, textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}>TrustyPro</div>
        </div>
        {/* Bottom fade into white card */}
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, transparent, white)" }} />
      </div>
      <div style={{ flex: "1 0 auto", padding: "8px 28px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontFamily: TP.serif, fontSize: 40, lineHeight: 1.08, fontWeight: 700, color: TP.navy, letterSpacing: -1.2, margin: 0 }}>
            Know your home<br/>like never before.
          </h1>
          <p style={{ fontFamily: TP.sans, fontSize: 15.5, lineHeight: 1.55, color: TP.text2, marginTop: 16, maxWidth: 300 }}>
            TrustyPro builds your home's complete profile — so you can protect, maintain, and improve what matters most.
          </p>
        </div>
        <div>
          <PrimaryCTA onClick={() => next("address")}>
            Start your profile <Icon name="arrowRight" size={18} color="white" />
          </PrimaryCTA>
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <span style={{ fontFamily: TP.sans, fontSize: 13, color: TP.muted }}>Already have an account? </span>
            <button style={{ background: "none", border: "none", color: TP.navy, fontFamily: TP.sans, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 }}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4.2 Address Entry
// ─────────────────────────────────────────────────────────────
function AddressEntry({ next }) {
  const [value, setValue] = React.useState("");
  const suggestions = [
    "1234 Main St, Frisco, TX 75033",
    "1234 Main St, Plano, TX 75093",
    "1234 Main Ave, Dallas, TX 75201",
    "1234 Mainland Dr, McKinney, TX 75070",
  ].filter(s => !value || s.toLowerCase().includes(value.toLowerCase()));

  return (
    <div style={{ position: "absolute", inset: 0, background: "white", padding: "82px 24px 30px", overflowY: "auto" }}>
      <h2 style={{ fontFamily: TP.serif, fontSize: 26, fontWeight: 700, color: TP.navy, letterSpacing: -0.6, margin: 0 }}>Where's your home?</h2>
      <p style={{ fontFamily: TP.sans, fontSize: 15, lineHeight: 1.5, color: TP.text2, marginTop: 8, marginBottom: 28 }}>
        We'll pull your property records and guide you from there.
      </p>

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", background: "white", border: `1px solid ${value ? TP.navy : TP.border}`, borderRadius: 14, padding: "0 16px", height: 56, transition: "border-color 200ms" }}>
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter address"
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: TP.sans, fontSize: 16, color: TP.text }}
            autoFocus
          />
          <Icon name="search" size={20} color={TP.muted} />
        </div>

        {value && suggestions.length > 0 && (
          <div style={{ background: "white", border: `1px solid ${TP.border}`, borderRadius: 14, marginTop: 8, boxShadow: TP.cardHover, overflow: "hidden" }}>
            {suggestions.slice(0, 5).map((s, i) => (
              <button key={s} onClick={() => next("confirm")} style={{
                width: "100%", textAlign: "left", background: "transparent", border: "none",
                padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
                borderBottom: i < Math.min(suggestions.length, 5) - 1 ? `1px solid ${TP.borderSubtle}` : "none",
              }}>
                <Icon name="mapPin" size={16} color={TP.muted} />
                <span style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text }}>{s}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <p style={{ fontFamily: TP.sans, fontSize: 12, lineHeight: 1.5, color: TP.muted, marginTop: 18, maxWidth: 320 }}>
        We use public property records to set up your home. Your data stays private — opt in any time to share.
      </p>

      {!value && (
        <button onClick={() => next("confirm")} style={{
          marginTop: 26, background: TP.surface, border: `1px solid ${TP.border}`, borderRadius: 12, padding: 14,
          display: "flex", alignItems: "center", gap: 10, width: "100%", cursor: "pointer", fontFamily: TP.sans,
        }}>
          <Icon name="sparkles" size={16} color={TP.blue} />
          <span style={{ fontSize: 13, color: TP.text2 }}>Demo — skip and use a sample home</span>
          <Icon name="chevronRight" size={16} color={TP.muted} style={{ marginLeft: "auto" }} />
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4.3 Address Confirmation
// ─────────────────────────────────────────────────────────────
function AddressConfirm({ next }) {
  const facts = [
    { k: "Beds",  v: "4" },
    { k: "Baths", v: "2.5" },
    { k: "Size",  v: "2,400 sqft" },
    { k: "Built", v: "2003" },
    { k: "Garage", v: "2-car" },
    { k: "Lot",   v: "0.18 acre" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto" }}>
      <div style={{ height: 320, position: "relative" }}>
        <PhotoPlaceholder kind="exterior" height="100%" radius={0} label="STREET VIEW · 1234 MAIN ST" />
        <button style={{ position: "absolute", top: 62, left: 20, width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.9)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevronLeft" size={20} color={TP.navy} />
        </button>
      </div>

      <div style={{ background: "white", borderRadius: "24px 24px 0 0", marginTop: -28, padding: "28px 24px 30px", position: "relative" }}>
        <Eyebrow>Your home</Eyebrow>
        <h1 style={{ fontFamily: TP.serif, fontSize: 26, fontWeight: 700, color: TP.navy, letterSpacing: -0.6, margin: "8px 0 22px", lineHeight: 1.15 }}>
          1234 Main St,<br/>Frisco, TX 75033
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
          {facts.map(f => (
            <div key={f.k} style={{ background: TP.surface, border: `1px solid ${TP.borderSubtle}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontFamily: TP.sans, fontSize: 11, color: TP.muted, textTransform: "uppercase", letterSpacing: 1 }}>{f.k}</div>
              <div style={{ fontFamily: TP.serif, fontSize: 20, fontWeight: 600, color: TP.navy, marginTop: 2, letterSpacing: -0.3 }}>{f.v}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${TP.borderSubtle}`, paddingTop: 18, marginBottom: 18 }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: TP.sans, fontSize: 11, color: TP.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Roof</div>
            <div style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text }}>Asphalt shingle · est. 22 years old</div>
          </div>
          <div>
            <div style={{ fontFamily: TP.sans, fontSize: 11, color: TP.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>HVAC</div>
            <div style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text }}>Central air · gas furnace</div>
          </div>
        </div>

        <PrimaryCTA onClick={() => next("coaching")}>
          Looks right — let's start <Icon name="arrowRight" size={18} color="white" />
        </PrimaryCTA>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <TextLink color={TP.text2}>Edit details</TextLink>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4.4 Pre-Scan Coaching
// ─────────────────────────────────────────────────────────────
function ScanCoaching({ next, room = "Kitchen", index = 1, total = 11 }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: TP.tint, padding: "72px 24px 30px", overflowY: "auto" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "white", padding: "5px 12px", borderRadius: 999, marginBottom: 24, border: `1px solid ${TP.border}` }}>
        <span style={{ fontFamily: TP.mono, fontSize: 11, color: TP.navy }}>{String(index).padStart(2,"0")} / {String(total).padStart(2,"0")}</span>
        <span style={{ fontFamily: TP.sans, fontSize: 11, color: TP.text2 }}>spaces</span>
      </div>

      <h1 style={{ fontFamily: TP.serif, fontSize: 32, fontWeight: 700, color: TP.navy, letterSpacing: -0.9, margin: 0, lineHeight: 1.15 }}>
        Let's start with your {room.toLowerCase()}.
      </h1>
      <p style={{ fontFamily: TP.sans, fontSize: 15, lineHeight: 1.5, color: TP.text2, marginTop: 12, marginBottom: 26 }}>
        Stand in the doorway and slowly pan from left to right. The app will guide you.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 26 }}>
        {[
          "photo-1556911220-e15b29be8c8f",
          "photo-1556911220-bff31c812dba",
          "photo-1565538810643-b5bdb714032a",
          "photo-1600566752355-35792bedcfea",
        ].map((id, i) => (
          <PhotoPlaceholder
            key={id}
            kind="kitchen"
            height={108}
            label={`ANGLE ${String(i + 1).padStart(2, "0")}`}
            src={`https://images.unsplash.com/${id}?w=600&q=85&auto=format&fit=crop`}
          />
        ))}
      </div>

      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14, marginBottom: 30 }}>
        {[
          "Stand back so the whole room is visible",
          "Pan slowly — about 5 seconds per wall",
          "Tap the model number on any appliances when you spot them",
        ].map((step, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: TP.navy, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TP.sans, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontFamily: TP.sans, fontSize: 15, color: TP.text, lineHeight: 1.45, paddingTop: 4 }}>{step}</div>
          </li>
        ))}
      </ol>

      <PrimaryCTA onClick={() => next("camera")}>
        Open camera <Icon name="arrowRight" size={18} color="white" />
      </PrimaryCTA>
      <div style={{ textAlign: "center", marginTop: 14 }}>
        <TextLink color={TP.text2}>Skip — choose a different room</TextLink>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4.5 Camera / Scan View
// ─────────────────────────────────────────────────────────────
function ScanCamera({ next }) {
  const [captured, setCaptured] = React.useState(3);
  const [done, setDone] = React.useState(false);

  // Auto-progress to fullness, then complete
  React.useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      setCaptured(c => {
        if (c >= 8) { clearInterval(t); return c; }
        return c + 1;
      });
    }, 1100);
    return () => clearInterval(t);
  }, [done]);

  React.useEffect(() => {
    if (captured >= 8 && !done) {
      setDone(true);
      const t = setTimeout(() => next("complete"), 900);
      return () => clearTimeout(t);
    }
  }, [captured, done, next]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0a0a0a" }}>
      {/* Faux camera viewfinder */}
      <PhotoPlaceholder
        kind="kitchen"
        height="100%"
        radius={0}
        src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop"
        style={{ filter: "brightness(0.78) saturate(0.92)" }}
      />

      {/* Top gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 130, background: "linear-gradient(to bottom, rgba(10,22,40,0.75), transparent)" }} />
      <div style={{ position: "absolute", top: 56, left: 0, right: 0, padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
        <button style={{ width: 36, height: 36, borderRadius: 18, background: "rgba(0,0,0,0.4)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="x" size={28} color="white" />
        </button>
        <div style={{ fontFamily: TP.sans, fontSize: 16, fontWeight: 600 }}>Kitchen scan</div>
        <button style={{ width: 36, height: 36, borderRadius: 18, background: "rgba(0,0,0,0.4)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="flash" size={20} color="white" />
        </button>
      </div>

      {/* AR-style frame guides */}
      <div style={{ position: "absolute", inset: "160px 40px 220px" }}>
        {[[0,0],[0,1],[1,0],[1,1]].map(([y, x], i) => (
          <div key={i} style={{
            position: "absolute",
            [y ? "bottom" : "top"]: -2,
            [x ? "right" : "left"]: -2,
            width: 36, height: 36,
            [y ? "borderBottom" : "borderTop"]: "2px solid white",
            [x ? "borderRight" : "borderLeft"]: "2px solid white",
            borderRadius: 4,
          }} />
        ))}
        <div className="ar-pulse" style={{ position: "absolute", inset: 0, border: "1.5px solid rgba(255,255,255,0.45)", borderRadius: 4 }} />
      </div>

      {/* Bottom controls */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 240, background: "linear-gradient(to top, rgba(10,22,40,0.85), transparent)" }} />
      <div style={{ position: "absolute", bottom: 50, left: 0, right: 0, padding: "0 24px", color: "white" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: TP.sans, fontSize: 15, fontWeight: 500 }}>
            {done ? "Capturing — finishing up" : "Pan slowly to the right →"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ width: 64, opacity: 0.5, fontFamily: TP.mono, fontSize: 11 }}>HISTORY</div>
          <button onClick={() => setCaptured(c => Math.min(c + 1, 8))} style={{
            width: 80, height: 80, borderRadius: 40, border: "4px solid rgba(255,255,255,0.95)",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 60, height: 60, borderRadius: 30, background: "white" }} />
          </button>
          <div style={{ width: 64, textAlign: "right", color: "white" }}>
            <div style={{ fontFamily: TP.mono, fontSize: 18, fontWeight: 600 }}>{captured} / 8</div>
            <div style={{ fontFamily: TP.sans, fontSize: 11, opacity: 0.7 }}>walls</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes arPulse { 0%,100% { transform: scale(1); opacity: 0.5 } 50% { transform: scale(1.02); opacity: 0.8 } }
        .ar-pulse { animation: arPulse 2.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4.6 Scan Complete
// ─────────────────────────────────────────────────────────────
function ScanComplete({ next }) {
  const [score, setScore] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setScore(12), 250);
    return () => clearTimeout(t);
  }, []);
  const captured = [
    "Room dimensions",
    "Refrigerator (LG model LRMVS3006S)",
    "Range (GE)",
    "Dishwasher",
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "white", padding: "82px 28px 30px", overflowY: "auto" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: 26, background: TP.tint, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
          <Icon name="check" size={26} color={TP.blue} strokeWidth={2} />
        </div>
        <h1 style={{ fontFamily: TP.serif, fontSize: 28, fontWeight: 700, color: TP.navy, letterSpacing: -0.7, margin: 0 }}>
          Kitchen documented.
        </h1>
        <p style={{ fontFamily: TP.sans, fontSize: 15, lineHeight: 1.5, color: TP.text2, marginTop: 10, maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>
          We captured 8 angles and 3 appliances. Your Home Health Score just went up.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
        <ScoreRing score={score} size={160} stroke={9} />
      </div>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <span style={{ fontFamily: TP.sans, fontSize: 13, fontWeight: 600, color: TP.green }}>+12 this scan</span>
      </div>

      <div style={{ marginTop: 30, marginBottom: 22 }}>
        {captured.map(c => (
          <div key={c} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${TP.borderSubtle}` }}>
            <Icon name="check" size={16} color={TP.blue} strokeWidth={2.5} />
            <span style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text }}>{c}</span>
          </div>
        ))}
      </div>

      <PrimaryCTA onClick={() => next("hub")}>
        Continue — Living Room <Icon name="arrowRight" size={18} color="white" />
      </PrimaryCTA>
      <div style={{ textAlign: "center", marginTop: 14 }}>
        <TextLink color={TP.text2} onClick={() => next("hub")}>I'll come back later</TextLink>
      </div>
    </div>
  );
}

Object.assign(window, { WelcomeScreen, AddressEntry, AddressConfirm, ScanCoaching, ScanCamera, ScanComplete });
