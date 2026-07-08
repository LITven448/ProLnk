// TrustyPro v3 — Plans, referral, recall alert, notification prefs, home switcher, ES strings

// ===== Maintenance plan (subscription) ============================
function W3Plans({ go }) {
  const [plan, setPlan] = React.useState("year");
  const items = [
    ["Spring", "AC tune-up + coil clean"],
    ["Summer", "Water heater flush — tank or tankless descale"],
    ["Fall", "Furnace inspection + filter"],
    ["Winter", "Pipe freeze + weatherseal check"],
  ];
  return (
    <div data-screen-label="Care plan" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.surface, overflowY: "auto", padding: "54px 22px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <BackBtn onClick={() => go("home")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>TrustyPro Care</span>
      </div>

      <h1 style={{ fontFamily: T3.sans, fontSize: 25, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 6px", lineHeight: 1.12 }}>Your home,<br/>on a schedule.</h1>
      <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 20px" }}>
        Four seasonal checkups a year by vetted pros. Small problems get caught while they're still small — and your Health Score stays strong.
      </p>

      <div style={{ background: "white", borderRadius: 18, border: `1px solid ${T3.border}`, padding: "6px 18px", boxShadow: T3.rest, marginBottom: 18 }}>
        {items.map(([k, v], i) => (
          <div key={k} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 0", borderBottom: i < 3 ? `1px solid ${T3.borderSubtle}` : "none" }}>
            <span style={{ fontFamily: T3.sans, fontSize: 12, fontWeight: 700, color: T3.indigo, width: 58, flexShrink: 0 }}>{k}</span>
            <span style={{ fontFamily: T3.sans, fontSize: 13.5, color: T3.ink }}>{v}</span>
            <I3 name="check" size={14} color={T3.green} strokeWidth={2.4} style={{ marginLeft: "auto" }} />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {[
          { id: "month", label: "Monthly", price: "$19/mo", sub: "cancel anytime" },
          { id: "year", label: "Yearly", price: "$199/yr", sub: "save $29", best: true },
        ].map(p => (
          <button key={p.id} onClick={() => setPlan(p.id)} style={{ flex: 1, background: plan === p.id ? T3.tint : "white", border: `1.5px solid ${plan === p.id ? T3.indigo : T3.border}`, borderRadius: 16, padding: "15px 13px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            {p.best && <span style={{ position: "absolute", top: -9, right: 12, background: T3.indigo, color: "white", borderRadius: 999, padding: "2px 9px", fontFamily: T3.sans, fontSize: 10, fontWeight: 700 }}>Best value</span>}
            <div style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 700, color: T3.ink }}>{p.label}</div>
            <div style={{ fontFamily: T3.sans, fontSize: 19, fontWeight: 800, color: plan === p.id ? T3.indigo : T3.ink, letterSpacing: "-0.02em", marginTop: 3 }}>{p.price}</div>
            <div style={{ fontFamily: T3.sans, fontSize: 11, color: T3.muted, marginTop: 2 }}>{p.sub}</div>
          </button>
        ))}
      </div>

      <Btn>Start my Care plan</Btn>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 10 }}>
        <I3 name="shield" size={12} color={T3.muted} />
        <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>Checkout completes on trustypro.io</span>
      </div>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>Priority matching + member pricing on all repairs included</span>
      </div>
    </div>
  );
}

// ===== Referral ===================================================
function W3Referral({ go }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <div data-screen-label="Referral" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.surface, overflowY: "auto", padding: "54px 22px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <BackBtn onClick={() => go("profile")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Refer a neighbor</span>
      </div>

      <h1 style={{ fontFamily: T3.sans, fontSize: 25, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 6px", lineHeight: 1.12 }}>Give your neighbor<br/>a head start.</h1>
      <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 18px" }}>
        Neighbors who join with your link get their home's past inspection report free — a ready-made Health Vault on day one.
      </p>

      {/* What each side gets */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 13, background: "white", border: `1px solid ${T3.border}`, borderRadius: 15, padding: "14px 16px", boxShadow: T3.rest }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: T3.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I3 name="gift" size={17} color={T3.indigo} />
          </div>
          <div>
            <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 700, color: T3.ink }}>They get</div>
            <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, lineHeight: 1.5, marginTop: 2 }}>Their home's past inspection report free ($29 value) — their Vault starts pre-filled, not empty.</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 13, background: "white", border: `1px solid ${T3.border}`, borderRadius: 15, padding: "14px 16px", boxShadow: T3.rest }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: T3.greenBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I3 name="shieldCheck" size={17} color={T3.green} />
          </div>
          <div>
            <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 700, color: T3.ink }}>You get</div>
            <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, lineHeight: 1.5, marginTop: 2 }}>A free month of TrustyPro Care each time a neighbor books their first service. 12 referrals = a free year.</div>
          </div>
        </div>
      </div>

      <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }} style={{ width: "100%", background: "white", border: `1.5px dashed ${T3.indigo}`, borderRadius: 16, padding: "17px 18px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 14 }}>
        <span style={{ fontFamily: T3.mono, fontSize: 15, fontWeight: 700, color: T3.indigo, flex: 1, textAlign: "left" }}>trustypro.io/r/SARAH</span>
        <span style={{ fontFamily: T3.sans, fontSize: 12.5, fontWeight: 700, color: copied ? "#066E4C" : T3.ink2 }}>{copied ? "Copied ✓" : "Copy"}</span>
      </button>
      <Btn kind="dark" style={{ marginBottom: 24 }}><I3 name="send" size={16} color="white" /> Share my link</Btn>

      <Sect label="Your referrals" />
      <div style={{ background: "white", borderRadius: 16, border: `1px solid ${T3.border}`, padding: "4px 18px", boxShadow: T3.rest }}>
        {[
          ["Maria G. — 2 doors down", "Joined · booked a roofer", "+1 mo Care"],
          ["Tom W. — Elm Ct", "Joined · hasn't booked yet", "pending"],
        ].map(([n, s, v], i) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: i < 1 ? `1px solid ${T3.borderSubtle}` : "none" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink }}>{n}</div>
              <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted, marginTop: 1 }}>{s}</div>
            </div>
            <span style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 700, color: v === "pending" ? T3.muted : "#066E4C" }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <span style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2 }}>Earned so far: <b style={{ color: T3.ink }}>1 free month of Care</b></span>
      </div>
    </div>
  );
}

// ===== Recall alert ===============================================
function W3Recall({ go }) {
  return (
    <div data-screen-label="Recall alert" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "54px 22px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <BackBtn onClick={() => go("vault")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Recall check</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <SevBadge severity="urgent" />
        <span style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted, fontWeight: 500 }}>Matched to your kitchen scan</span>
      </div>
      <h1 style={{ fontFamily: T3.sans, fontSize: 24, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 10px", lineHeight: 1.18 }}>
        Your refrigerator has an open safety recall.
      </h1>
      <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.6, margin: "0 0 20px" }}>
        We check every appliance you scan against the CPSC recall database — automatically, forever. This one matched.
      </p>

      <div style={{ background: T3.surface, borderRadius: 18, padding: "18px 18px 8px", marginBottom: 20 }}>
        {[
          ["Product", "LG refrigerator · LRMVS3006S"],
          ["Recall", "CPSC #26-118 — compressor overheating"],
          ["Remedy", "Free repair from LG — covered fully"],
          ["Found", "Matched from your kitchen scan, Mar 18"],
        ].map(([k, v], i) => (
          <div key={k} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: i > 0 ? `1px solid ${T3.border}` : "none" }}>
            <span style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.muted, width: 64, flexShrink: 0, fontWeight: 600 }}>{k}</span>
            <span style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink, lineHeight: 1.45 }}>{v}</span>
          </div>
        ))}
      </div>

      <Btn>Start LG's free repair claim</Btn>
      <div style={{ marginTop: 10 }}>
        <Btn kind="ghost" onClick={() => go("request")}>Have a TrustyPro handle it instead</Btn>
      </div>
    </div>
  );
}

// ===== Notification preferences (TCPA) ============================
function W3NotifPrefs({ go }) {
  const [prefs, setPrefs] = React.useState({ push: true, email: true, sms: false });
  const [cats, setCats] = React.useState({ storm: true, maint: true, msgs: true, offers: false });
  const Row = ({ label, sub, on, onToggle }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: `1px solid ${T3.borderSubtle}` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 600, color: T3.ink }}>{label}</div>
        {sub && <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted, marginTop: 1, lineHeight: 1.4 }}>{sub}</div>}
      </div>
      <button onClick={onToggle} style={{ width: 46, height: 27, borderRadius: 14, border: "none", background: on ? T3.indigo : T3.border, cursor: "pointer", position: "relative", transition: "background 180ms", flexShrink: 0 }}>
        <span style={{ position: "absolute", top: 3, left: on ? 22 : 3, width: 21, height: 21, borderRadius: 11, background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 180ms" }} />
      </button>
    </div>
  );
  return (
    <div data-screen-label="Notifications" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.surface, overflowY: "auto", padding: "54px 22px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <BackBtn onClick={() => go("profile")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Notifications</span>
      </div>

      <Sect label="Channels" />
      <div style={{ background: "white", borderRadius: 16, border: `1px solid ${T3.border}`, padding: "2px 18px", boxShadow: T3.rest, marginBottom: 8 }}>
        <Row label="Push" on={prefs.push} onToggle={() => setPrefs(p => ({ ...p, push: !p.push }))} />
        <Row label="Email" on={prefs.email} onToggle={() => setPrefs(p => ({ ...p, email: !p.email }))} />
        <Row label="Text messages (SMS)" sub="By turning on SMS you agree to receive service texts from TrustyPro. Msg & data rates may apply. Reply STOP to opt out anytime." on={prefs.sms} onToggle={() => setPrefs(p => ({ ...p, sms: !p.sms }))} />
      </div>
      <div style={{ marginBottom: 22 }} />

      <Sect label="What we tell you about" />
      <div style={{ background: "white", borderRadius: 16, border: `1px solid ${T3.border}`, padding: "2px 18px", boxShadow: T3.rest }}>
        <Row label="Storm & safety alerts" sub="Recommended — hail, freeze, recalls" on={cats.storm} onToggle={() => setCats(c => ({ ...c, storm: !c.storm }))} />
        <Row label="Maintenance reminders" on={cats.maint} onToggle={() => setCats(c => ({ ...c, maint: !c.maint }))} />
        <Row label="Quotes & messages" on={cats.msgs} onToggle={() => setCats(c => ({ ...c, msgs: !c.msgs }))} />
        <Row label="Offers & neighborhood deals" on={cats.offers} onToggle={() => setCats(c => ({ ...c, offers: !c.offers }))} />
      </div>
    </div>
  );
}

// ===== Home switcher sheet (multi-property) =======================
function W3HomeSwitcher({ onClose, onPick, current }) {
  const homes = [
    { id: "h1", addr: "1234 Main St", city: "Frisco, TX", score: 73, photo: T3_PHOTOS.heroExterior },
    { id: "h2", addr: "482 Elm Ct", city: "McKinney, TX · rental", score: 61, photo: T3_PHOTOS.street },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(20,18,43,0.4)", zIndex: 60, display: "flex", flexDirection: "column", justifyContent: "flex-end" }} onClick={onClose}>
      <div className="t3-in" onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: "24px 24px 0 0", padding: "20px 22px 34px" }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: T3.border, margin: "0 auto 16px" }} />
        <h2 style={{ fontFamily: T3.sans, fontSize: 18, fontWeight: 800, color: T3.ink, letterSpacing: "-0.02em", margin: "0 0 14px" }}>Your properties</h2>
        {homes.map(h => (
          <button key={h.id} onClick={() => onPick(h)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 13, background: current === h.id ? T3.tint : "white", border: `1.5px solid ${current === h.id ? T3.indigo : T3.border}`, borderRadius: 16, padding: 12, cursor: "pointer", marginBottom: 10, textAlign: "left" }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
              <Img src={h.photo} h="100%" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 700, color: T3.ink }}>{h.addr}</div>
              <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted, marginTop: 1 }}>{h.city}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: T3.sans, fontSize: 17, fontWeight: 800, color: T3.indigo }}>{h.score}</div>
              <div style={{ fontFamily: T3.sans, fontSize: 9, color: T3.muted, fontWeight: 700 }}>SCORE</div>
            </div>
          </button>
        ))}
        <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "white", border: `1.5px dashed ${T3.border}`, borderRadius: 16, padding: 15, cursor: "pointer", fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2 }}>
          <I3 name="plus" size={15} color={T3.ink2} /> Add a property
        </button>
      </div>
    </div>
  );
}

// ===== Home inspections — archived reports + book new ============
function W3Inspections({ go }) {
  return (
    <div data-screen-label="Inspections" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.surface, overflowY: "auto", padding: "54px 22px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <BackBtn onClick={() => go("vault")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Home inspections</span>
      </div>

      <h1 style={{ fontFamily: T3.sans, fontSize: 25, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 6px", lineHeight: 1.12 }}>Your home's history,<br/>already written.</h1>
      <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 20px" }}>
        We partner with licensed inspectors holding 80,000+ past inspections. If your home's in the archive, its report jump-starts your Health Vault instantly.
      </p>

      {/* archived report — found */}
      <div style={{ background: "white", border: `1.5px solid ${T3.indigo}`, borderRadius: 18, padding: 18, boxShadow: T3.lift, marginBottom: 14, position: "relative" }}>
        <span style={{ position: "absolute", top: -9, left: 16, background: T3.indigo, color: "white", borderRadius: 999, padding: "3px 11px", fontFamily: T3.sans, fontSize: 10.5, fontWeight: 700 }}>Found for your address</span>
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginTop: 4 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: T3.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I3 name="fileCheck" size={20} color={T3.indigo} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T3.sans, fontSize: 14.5, fontWeight: 700, color: T3.ink }}>2019 inspection · 1234 Main St</div>
            <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.ink2, marginTop: 2 }}>48 pages · licensed TREC inspector · photos included</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: T3.sans, fontSize: 19, fontWeight: 800, color: T3.ink }}>$29</div>
          </div>
        </div>
        <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, lineHeight: 1.5, margin: "12px 0" }}>
          Buying it auto-fills your Vault — systems, ages, and known issues from the day it was inspected.
        </div>
        <Btn size="sm">Buy report · $29</Btn>
        <div style={{ textAlign: "center", marginTop: 9 }}>
          <span style={{ fontFamily: T3.sans, fontSize: 11, color: T3.muted }}>Checkout on trustypro.io · inspector receives 20%</span>
        </div>
      </div>

      {/* book new */}
      <div style={{ background: "white", border: `1px solid ${T3.border}`, borderRadius: 18, padding: 18, boxShadow: T3.rest }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: T3.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I3 name="search" size={19} color={T3.ink} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T3.sans, fontSize: 14.5, fontWeight: 700, color: T3.ink }}>Book a fresh inspection</div>
            <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.ink2, marginTop: 2 }}>Full TREC inspection · licensed · report lands in your Vault</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 800, color: T3.ink }}>from $375</div>
          </div>
        </div>
        <div style={{ marginTop: 13 }}>
          <Btn kind="ghost" size="sm">Get matched with an inspector</Btn>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 18 }}>
        <I3 name="shield" size={13} color={T3.muted} />
        <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>Reports stay in your filing cabinet — and transfer when you sell</span>
      </div>
    </div>
  );
}

// ===== Emergency — fast path with shut-off guidance ================
function W3Emergency({ go, onSubmit }) {
  const [picked, setPicked] = React.useState(null);
  const TYPES = [
    { id: "pipe",   icon: "droplet", label: "Burst pipe / flooding", tip: "Shut off your main water valve — usually in the garage, at the street, or near the water heater." },
    { id: "sewage", icon: "bath",    label: "Sewage backup / toilet overflow", tip: "Stop using water and flushing anywhere in the house — it all feeds the same line." },
    { id: "wheater",icon: "flame",   label: "Water heater leaking / failed", tip: "Turn the cold-water shutoff on top of the tank, and switch the breaker (electric) or gas valve to off." },
    { id: "heat",   icon: "thermo",  label: "No heat / no AC", tip: "Check the breaker first — if it trips again, leave it off until the pro arrives." },
    { id: "power",  icon: "zap",     label: "No power / sparking", tip: "If you see sparks or smell burning, flip the main breaker off and don't touch the panel again." },
    { id: "gas",    icon: "flame",   label: "Gas smell", tip: "Leave the house now, don't flip any switches, and call 911 or Atmos (866-322-8667) from outside first." },
    { id: "roof",   icon: "home",    label: "Roof leak in a storm", tip: "Move valuables, catch drips in a bin, and poke a small hole in any ceiling bulge to drain it safely." },
    { id: "lock",   icon: "shield",  label: "Locked out / door won't secure", tip: "If it's after a break-in, call the police for a report first — you'll want it for insurance." },
    { id: "glass",  icon: "grid",    label: "Broken window / glass", tip: "Keep kids and pets clear — the pro boards it up today and quotes the replacement." },
    { id: "tree",   icon: "home",    label: "Tree down on house / drive", tip: "Stay away from anything touching a power line — report those to Oncor (888-313-4747) first." },
    { id: "garage", icon: "car",     label: "Garage door stuck", tip: "Pull the red release cord to open it manually — lift with your legs, it's heavier than it looks." },
    { id: "pest",   icon: "search",  label: "Pest emergency", tip: "Snake, wasp nest, or animal in the house — keep the room closed off and don't corner it." },
  ];
  const sel = TYPES.find(t => t.id === picked);
  return (
    <div data-screen-label="Emergency" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "54px 22px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <BackBtn onClick={() => go("home")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Emergency</span>
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, background: T3.redBg, border: `1px solid ${T3.redBd}`, borderRadius: 999, padding: "5px 12px" }}>
          <span className="t3-ping" style={{ width: 7, height: 7, borderRadius: 4, background: T3.red }} />
          <span style={{ fontFamily: T3.sans, fontSize: 11.5, fontWeight: 700, color: T3.redInk }}>Priority line</span>
        </span>
      </div>

      <h1 style={{ fontFamily: T3.sans, fontSize: 25, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 6px", lineHeight: 1.12 }}>What's happening?</h1>
      <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 14px" }}>
        Pick one — we page every on-call pro in your area at once. First to accept gets dispatched.
      </p>

      {/* 911 banner — not a service request */}
      <div style={{ display: "flex", gap: 11, background: T3.red, borderRadius: 14, padding: "13px 15px", marginBottom: 16, alignItems: "center" }}>
        <I3 name="bell" size={18} color="white" style={{ flexShrink: 0 }} />
        <span style={{ fontFamily: T3.sans, fontSize: 13, color: "white", lineHeight: 1.45 }}>
          <b>Fire, smoke, or CO alarm? Call 911 now.</b> We can help with cleanup and repairs after everyone's safe.
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 18 }}>
        {TYPES.map(t => (
          <button key={t.id} onClick={() => setPicked(t.id)} style={{ display: "flex", flexDirection: "column", gap: 9, background: picked === t.id ? T3.redBg : "white", border: `1.5px solid ${picked === t.id ? T3.red : T3.border}`, borderRadius: 14, padding: "13px 13px", cursor: "pointer", textAlign: "left", transition: "all 150ms" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: picked === t.id ? "white" : T3.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <I3 name={t.icon} size={16} color={picked === t.id ? T3.red : T3.ink} />
            </div>
            <span style={{ fontFamily: T3.sans, fontSize: 12.5, fontWeight: 700, lineHeight: 1.3, color: picked === t.id ? T3.redInk : T3.ink }}>{t.label}</span>
          </button>
        ))}
      </div>

      {sel && (
        <div className="t3-in" style={{ display: "flex", gap: 11, background: T3.amberBg, border: `1px solid ${T3.amberBd}`, borderRadius: 13, padding: "13px 15px", marginBottom: 18 }}>
          <I3 name="shield" size={16} color={T3.amberInk} style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.amberInk, lineHeight: 1.55 }}><b>While you wait:</b> {sel.tip}</span>
        </div>
      )}

      <Btn style={{ background: T3.red, boxShadow: "0 10px 28px rgba(220,38,38,0.3)", opacity: picked ? 1 : 0.45 }} onClick={() => { if (picked) { onSubmit(sel.label, null, true); go("tracking"); } }}>
        <I3 name="zap" size={18} color="white" /> Dispatch a pro now
      </Btn>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
        <I3 name="clock" size={12} color={T3.muted} />
        <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>Median response: 22 minutes · emergency rates shown before you confirm</span>
      </div>
    </div>
  );
}

// ===== All Services — grouped directory, searchable ================
const SVC_META = {
  "Systems & repair":     { photo: T3_PHOTOS.roofNow,     tint: "#EEF0FE", ink: "#4F46E5", tagline: "The guts of the house" },
  "Finishes & remodel":   { photo: T3_PHOTOS.kitchen,     tint: "#F2EAFE", ink: "#6D28D9", tagline: "Make it yours" },
  "Cleaning & upkeep":    { photo: T3_PHOTOS.bathroom,    tint: "#EAFAF3", ink: "#066E4C", tagline: "Keep it fresh" },
  "Exterior & structure": { photo: T3_PHOTOS.heroExterior,tint: "#FCEEE8", ink: "#9A3412", tagline: "Curb appeal & bones" },
  "Yard & outdoors":      { photo: T3_PHOTOS.street,      tint: "#EAFAF3", ink: "#066E4C", tagline: "Beyond the walls" },
  "Specialty":            { photo: T3_PHOTOS.livingAfter, tint: "#FEF5E7", ink: "#92400E", tagline: "The big projects" },
};

function W3Services({ go }) {
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(T3_CATALOG[0].group);
  const ql = q.trim().toLowerCase();
  const groups = ql
    ? T3_CATALOG.map(g => ({ ...g, items: g.items.filter(i => i.toLowerCase().includes(ql)) })).filter(g => g.items.length)
    : T3_CATALOG;
  const total = T3_CATALOG.reduce((n, g) => n + g.items.length, 0);

  return (
    <div data-screen-label="All services" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "54px 22px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <BackBtn onClick={() => go("home")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>All services</span>
        <span style={{ marginLeft: "auto", fontFamily: T3.mono, fontSize: 11.5, color: T3.muted }}>{total} SERVICES</span>
      </div>

      <h1 style={{ fontFamily: T3.sans, fontSize: 25, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 6px", lineHeight: 1.12 }}>If your home needs it,<br/>we cover it.</h1>
      <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 16px" }}>
        Every service, every pro vetted the same way. Tap anything to request it.
      </p>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: T3.surface, border: `1.5px solid ${T3.border}`, borderRadius: 14, padding: "0 15px", height: 50, marginBottom: 18 }}>
        <I3 name="search" size={17} color={T3.muted} />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search — sprinkler, holiday lights, mold…"
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: T3.sans, fontSize: 14, color: T3.ink }} />
        {q && <button onClick={() => setQ("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}><I3 name="x" size={15} color={T3.muted} /></button>}
      </div>

      {groups.length === 0 && (
        <div style={{ textAlign: "center", padding: "30px 20px" }}>
          <div style={{ fontFamily: T3.sans, fontSize: 14.5, fontWeight: 700, color: T3.ink }}>No match for "{q}"</div>
          <div style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink2, marginTop: 6, lineHeight: 1.5 }}>Request it anyway — if a vetted pro does it, we'll match you.</div>
          <Btn size="sm" full={false} style={{ marginTop: 14 }} onClick={() => go("request")}>Request "{q}"</Btn>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {groups.map(g => {
          const isOpen = ql ? true : open === g.group;
          const meta = SVC_META[g.group] || {};
          return (
            <div key={g.group} style={{ border: `1px solid ${isOpen ? "transparent" : T3.border}`, borderRadius: 18, overflow: "hidden", boxShadow: isOpen ? T3.lift : T3.rest, transition: "box-shadow 220ms" }}>
              <button onClick={() => setOpen(isOpen && !ql ? null : g.group)} style={{ width: "100%", position: "relative", height: isOpen ? 96 : 72, border: "none", padding: 0, cursor: "pointer", textAlign: "left", display: "block", transition: "height 220ms", overflow: "hidden" }}>
                <Img src={meta.photo} h="100%" dim={0.18} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(20,18,43,0.82) 20%, rgba(20,18,43,0.35) 70%, rgba(20,18,43,0.15))" }} />
                <div style={{ position: "absolute", inset: 0, padding: "0 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <I3 name={g.icon} size={17} color="white" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: T3.sans, fontSize: 15.5, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>{g.group}</div>
                    <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: "rgba(255,255,255,0.75)", marginTop: 1 }}>{meta.tagline} · {g.items.length} services</div>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: 14, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <I3 name="chevD" size={14} color="white" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 220ms" }} />
                  </div>
                </div>
              </button>
              {isOpen && (
                <div className="t3-in" style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "14px 15px 16px", background: "white" }}>
                  {g.items.map(item => {
                    const bigProject = /remodel|addition|kitchen remodel|bath remodel|outdoor kitchens/i.test(item);
                    return (
                      <button key={item} onClick={() => go(bigProject ? "scoutRequest" : "request")} style={{ background: meta.tint || T3.surface, border: "none", borderRadius: 999, padding: "9px 15px", cursor: "pointer", fontFamily: T3.sans, fontSize: 12.5, fontWeight: 600, color: meta.ink || T3.ink2 }}>{item}</button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 20 }}>
        <I3 name="shieldCheck" size={13} color={T3.green} />
        <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>Every category: vetted, background-checked, insured pros only</span>
      </div>
    </div>
  );
}

// ===== PRO SIDE concept: emergency on-call opt-in at signup ========
function W3ProOnCall({ go }) {
  const [optIn, setOptIn] = React.useState(true);
  return (
    <div data-screen-label="Pro on-call opt-in" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "54px 22px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <BackBtn onClick={() => go("home")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Pro signup</span>
        <span style={{ marginLeft: "auto", fontFamily: T3.mono, fontSize: 11.5, color: T3.muted }}>STEP 4 / 5</span>
      </div>
      <div style={{ display: "flex", gap: 6, margin: "12px 0 24px" }}>
        {[0,1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= 3 ? T3.indigo : T3.border }} />)}
      </div>

      <h1 style={{ fontFamily: T3.sans, fontSize: 25, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 6px", lineHeight: 1.15 }}>Join Emergency Services?</h1>
      <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 20px" }}>
        Go on-call for urgent jobs — burst pipes, no heat, gas issues. Optional, and you set your own on-call hours.
      </p>

      {/* Opt-in card */}
      <button onClick={() => setOptIn(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, background: optIn ? T3.redBg : "white", border: `1.5px solid ${optIn ? T3.red : T3.border}`, borderRadius: 16, padding: "16px 17px", cursor: "pointer", textAlign: "left", marginBottom: 18, transition: "all 160ms" }}>
        <div style={{ width: 42, height: 42, borderRadius: 21, background: optIn ? T3.red : T3.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 160ms" }}>
          <I3 name="zap" size={19} color={optIn ? "white" : T3.muted} strokeWidth={2} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 800, color: T3.ink }}>On-call for emergencies</div>
          <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, marginTop: 2 }}>{optIn ? "You're in — set your hours next" : "Tap to opt in"}</div>
        </div>
        <div style={{ width: 46, height: 28, borderRadius: 14, background: optIn ? T3.red : T3.border, position: "relative", transition: "all 160ms", flexShrink: 0 }}>
          <div style={{ position: "absolute", top: 3, left: optIn ? 21 : 3, width: 22, height: 22, borderRadius: 11, background: "white", transition: "all 160ms", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
        </div>
      </button>

      {/* Why it's worth it */}
      <Sect label="Why pros opt in" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {[
          { icon: "tag",    t: "Emergency rates", d: "Urgent jobs pay a premium — homeowners see and accept the higher rate before you're dispatched." },
          { icon: "zap",    t: "Algorithm priority", d: "On-call pros rank higher for regular jobs too. Reliability when it matters counts double in matching." },
          { icon: "clock",  t: "Your hours, your call", d: "Set an on-call schedule — nights, weekends, or whenever your crew has capacity. Pause anytime." },
        ].map(b => (
          <div key={b.t} style={{ display: "flex", gap: 13, background: T3.surface, borderRadius: 14, padding: "13px 15px" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "white", border: `1px solid ${T3.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <I3 name={b.icon} size={16} color={T3.indigo} />
            </div>
            <div>
              <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 700, color: T3.ink }}>{b.t}</div>
              <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, lineHeight: 1.5, marginTop: 2 }}>{b.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* The commitment */}
      <div style={{ display: "flex", gap: 11, background: T3.amberBg, border: `1px solid ${T3.amberBd}`, borderRadius: 13, padding: "13px 15px", marginBottom: 22 }}>
        <I3 name="bell" size={16} color={T3.amberInk} style={{ flexShrink: 0, marginTop: 1 }} />
        <span style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.amberInk, lineHeight: 1.55 }}><b>The deal:</b> during your on-call hours, accept or decline pages within 5 minutes. Missing pages hurts your priority — declining honestly doesn't.</span>
      </div>

      <Btn onClick={() => go("home")}>{optIn ? "Continue — set my on-call hours" : "Skip for now"} <I3 name="arrowR" size={18} color="white" /></Btn>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>You can join or leave Emergency Services anytime in settings</span>
      </div>
    </div>
  );
}

// ===== Spanish strings for Welcome (key-screen ES toggle) =========
const ES_WELCOME = {
  headline: "Tu hogar,\nen buenas manos.",
  subhead: "Escanea tu casa, revisa su salud y conéctate con profesionales verificados — todo gratis, en un solo lugar.",
  addHome: "Agregar mi casa",
  signIn: "Iniciar sesión",
  freeBadge: "Siempre gratis para propietarios",
};

Object.assign(window, { W3Plans, W3Referral, W3Recall, W3NotifPrefs, W3HomeSwitcher, W3Inspections, W3Emergency, W3Services, W3ProOnCall, ES_WELCOME });
