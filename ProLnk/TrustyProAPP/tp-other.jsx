// TrustyPro v2 — Discover, Profile, Scan launcher, Tab bar

// ─────────────────────────────────────────────────────────────
// 4.11 Discover tab
// ─────────────────────────────────────────────────────────────
function DiscoverTab({ next }) {
  const [filter, setFilter] = React.useState("All");
  const filters = ["All", "Maintenance", "DIY", "Inspiration", "Improve"];

  const hero = { title: "Spring Home Prep Checklist", kicker: "Seasonal · 8 min read", kind: "exterior" };
  const cards = [
    { title: "Should you replace or repair your 12-year-old AC?", tag: "Decision guide", kind: "hvac" },
    { title: "5 small kitchen upgrades that hold their value", tag: "Renovation", kind: "kitchen" },
    { title: "How a verified Home Profile lowers your insurance", tag: "Money", kind: "interior" },
    { title: "See your living room, restyled", tag: "Shop the look", kind: "livingRoom", action: "shopLook" },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", paddingBottom: 130 }}>
      <div style={{ position: "sticky", top: 0, background: "white", zIndex: 5, padding: "56px 24px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
          <h1 style={{ fontFamily: TP.serif, fontSize: 28, fontWeight: 700, color: TP.navy, letterSpacing: -0.6, margin: 0 }}>Discover</h1>
          <Icon name="search" size={20} color={TP.text2} />
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", margin: "0 -24px", padding: "0 24px 4px" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? TP.navy : "white", color: filter === f ? "white" : TP.text2,
              border: filter === f ? "none" : `1px solid ${TP.border}`,
              padding: "8px 14px", borderRadius: 999, fontFamily: TP.sans, fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "12px 24px 4px" }}>
        <div style={{ position: "relative", height: 220, borderRadius: 18, overflow: "hidden" }}>
          <PhotoPlaceholder kind={hero.kind} height="100%" radius={0} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.85), transparent 55%)" }} />
          <div style={{ position: "absolute", bottom: 18, left: 18, right: 18 }}>
            <Eyebrow color="white" style={{ opacity: 0.85 }}>Featured</Eyebrow>
            <div style={{ fontFamily: TP.serif, fontSize: 22, fontWeight: 700, color: "white", letterSpacing: -0.4, lineHeight: 1.2, marginTop: 6 }}>{hero.title}</div>
            <div style={{ fontFamily: TP.sans, fontSize: 12, color: "rgba(255,255,255,0.78)", marginTop: 6 }}>{hero.kicker}</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: "20px 24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {cards.map((c, i) => (
          <button key={i} onClick={() => c.action && next && next(c.action)} style={{ background: "white", border: `1px solid ${TP.border}`, borderRadius: 14, overflow: "hidden", boxShadow: TP.cardRest, padding: 0, textAlign: "left", cursor: c.action ? "pointer" : "default" }}>
            <PhotoPlaceholder kind={c.kind} height={110} radius={0} />
            <div style={{ padding: "12px 12px 14px" }}>
              <div style={{ fontFamily: TP.sans, fontSize: 10, color: TP.blue, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{c.tag}</div>
              <div style={{ fontFamily: TP.serif, fontSize: 15, fontWeight: 600, color: TP.navy, lineHeight: 1.3, letterSpacing: -0.2, marginTop: 6 }}>{c.title}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Need something fixed? — invisible matching, NOT a pro browse */}
      <div style={{ padding: "26px 24px 0" }}>
        <button onClick={() => next && next("requestService")} style={{ width: "100%", background: TP.navy, borderRadius: 18, padding: 22, border: "none", textAlign: "left", cursor: "pointer", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -20, width: 140, height: 140, borderRadius: 70, background: "rgba(79,70,229,0.35)" }} />
          <div style={{ position: "relative" }}>
            <Eyebrow color="#C7C3F7">Need something fixed?</Eyebrow>
            <div style={{ fontFamily: TP.serif, fontSize: 21, fontWeight: 700, color: "white", letterSpacing: -0.4, lineHeight: 1.2, margin: "8px 0 8px", maxWidth: 240 }}>
              Tell us what's wrong. We'll find the right pro.
            </div>
            <div style={{ fontFamily: TP.sans, fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, maxWidth: 250 }}>
              No searching, no bidding wars. Every pro is vetted and background-checked.
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, color: "white", fontFamily: TP.sans, fontSize: 14, fontWeight: 600 }}>
              Request a service <Icon name="arrowRight" size={16} color="white" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4.12 Profile tab
// ─────────────────────────────────────────────────────────────
function ProfileTab() {
  const sections = [
    { label: "Home", rows: [
      { icon: "home", title: "Edit property details", sub: "1234 Main St, Frisco" },
      { icon: "plus", title: "Add another property" },
    ]},
    { label: "Perks & Savings", rows: [
      { icon: "checkCircle", title: "Verified Home Status", sub: "Active · since Feb 2026" },
      { icon: "gift", title: "Active discounts", sub: "3 available" },
      { icon: "share", title: "Referral code", sub: "SARAH-FRISCO" },
    ]},
    { label: "Reports", rows: [
      { icon: "download", title: "Home Health Report", sub: "Free PDF" },
      { icon: "file", title: "Pre-listing report", sub: "Premium" },
    ]},
    { label: "Settings", rows: [
      { icon: "bell", title: "Notifications" },
      { icon: "user", title: "Privacy & data" },
      { icon: "share", title: "Sharing" },
    ]},
    { label: "Help", rows: [
      { icon: "helpCircle", title: "Support" },
      { icon: "bookOpen", title: "FAQ" },
      { icon: "file", title: "About TrustyPro" },
    ]},
  ];

  return (
    <div style={{ position: "absolute", inset: 0, background: TP.surface, overflowY: "auto", paddingBottom: 130 }}>
      <div style={{ background: "white", padding: "60px 24px 22px", borderBottom: `1px solid ${TP.borderSubtle}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: 30, background: TP.navy, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TP.serif, fontSize: 22, fontWeight: 700 }}>S</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: TP.serif, fontSize: 22, fontWeight: 700, color: TP.navy, letterSpacing: -0.4 }}>Sarah Mitchell</div>
            <div style={{ fontFamily: TP.sans, fontSize: 13, color: TP.text2, marginTop: 2 }}>1234 Main St, Frisco, TX</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <ScoreRing score={73} size={48} stroke={4} showLabel={false} />
            <div style={{ fontFamily: TP.sans, fontSize: 11, color: TP.text2, marginTop: 4 }}>73 / 100</div>
          </div>
        </div>
      </div>

      {sections.map((sec, i) => (
        <div key={sec.label} style={{ marginTop: 24 }}>
          <div style={{ padding: "0 24px 8px" }}>
            <Eyebrow color={TP.muted}>{sec.label}</Eyebrow>
          </div>
          <div style={{ background: "white", marginInline: 16, borderRadius: 14, overflow: "hidden", border: `1px solid ${TP.borderSubtle}` }}>
            {sec.rows.map((r, j) => (
              <button key={r.title} style={{ background: "transparent", border: "none", width: "100%", padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left", borderBottom: j < sec.rows.length - 1 ? `1px solid ${TP.borderSubtle}` : "none" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: TP.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={r.icon} size={16} color={TP.navy} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: TP.sans, fontSize: 14, color: TP.navy, fontWeight: 500 }}>{r.title}</div>
                  {r.sub && <div style={{ fontFamily: TP.sans, fontSize: 12, color: TP.text2, marginTop: 2 }}>{r.sub}</div>}
                </div>
                <Icon name="chevronRight" size={16} color={TP.muted} />
              </button>
            ))}
          </div>
        </div>
      ))}

      <div style={{ padding: "30px 24px 12px", textAlign: "center" }}>
        <span style={{ fontFamily: TP.mono, fontSize: 11, color: TP.muted }}>TrustyPro v1.0.2</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Scan launcher (when tapping the Scan tab — chooses a room)
// ─────────────────────────────────────────────────────────────
function ScanLauncher({ next, back }) {
  const remaining = [
    { name: "Living Room", kind: "livingRoom", icon: "sofa" },
    { name: "Master Bed", kind: "bedroom", icon: "bed" },
    { name: "Master Bath", kind: "bath", icon: "bath" },
    { name: "Electrical Panel", kind: "panel", icon: "zap" },
    { name: "Roof / Exterior", kind: "exterior", icon: "home" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "56px 24px 130px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <button onClick={back} style={{ width: 40, height: 40, borderRadius: 20, background: TP.surface, border: `1px solid ${TP.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevronLeft" size={20} color={TP.navy} />
        </button>
        <div style={{ fontFamily: TP.sans, fontSize: 15, fontWeight: 600, color: TP.navy }}>Capture</div>
      </div>
      <Eyebrow>What's left</Eyebrow>
      <h1 style={{ fontFamily: TP.serif, fontSize: 28, fontWeight: 700, color: TP.navy, letterSpacing: -0.7, margin: "8px 0 10px", lineHeight: 1.15 }}>
        Pick a space to document.
      </h1>
      <p style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text2, lineHeight: 1.5, marginBottom: 24 }}>
        Each scan takes about 2 minutes. Your score improves with every space.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {remaining.map(r => (
          <button key={r.name} onClick={() => next("coaching")} style={{
            display: "flex", alignItems: "center", gap: 14, padding: 14, background: "white",
            border: `1px solid ${TP.border}`, borderRadius: 14, cursor: "pointer", textAlign: "left", width: "100%",
            boxShadow: TP.cardRest,
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 10, overflow: "hidden", flexShrink: 0, position: "relative" }}>
              <PhotoPlaceholder kind={r.kind} height="100%" radius={0} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.4)" }}>
                <Icon name={r.icon} size={22} color={TP.navy} strokeWidth={1.4} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: TP.sans, fontSize: 15, fontWeight: 600, color: TP.navy }}>{r.name}</div>
              <div style={{ fontFamily: TP.sans, fontSize: 12, color: TP.text2, marginTop: 2 }}>2 min · +8 to score</div>
            </div>
            <Icon name="chevronRight" size={18} color={TP.muted} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bottom tab bar (4 tabs, light)
// ─────────────────────────────────────────────────────────────
function BottomTabBar({ tab, openTab, onScanTap }) {
  const tabs = [
    { id: "home",     icon: "home",    label: "Home" },
    { id: "scan",     icon: "camera",  label: "Scan", isScan: true },
    { id: "discover", icon: "compass", label: "Discover" },
    { id: "profile",  icon: "user",    label: "Profile" },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 92,
      paddingBottom: 28, paddingTop: 8, paddingInline: 20,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)",
      borderTop: `1px solid ${TP.borderSubtle}`,
      display: "flex", alignItems: "center", justifyContent: "space-around", zIndex: 40,
    }}>
      {tabs.map(t => {
        const active = tab === t.id || (t.id === "scan" && tab === "scanLauncher");
        if (t.isScan) {
          return (
            <button key={t.id} onClick={onScanTap} style={{
              background: TP.navy, border: "none",
              width: 52, height: 52, borderRadius: 26, marginTop: -16,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: TP.fab,
            }}>
              <Icon name="camera" size={22} color="white" strokeWidth={1.8} />
            </button>
          );
        }
        return (
          <button key={t.id} onClick={() => openTab(t.id)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: 6, flex: 1,
          }}>
            <Icon name={t.icon} size={22} color={active ? TP.navy : TP.muted} strokeWidth={active ? 2 : 1.5} />
            <span style={{ fontFamily: TP.sans, fontSize: 10, fontWeight: active ? 600 : 500, color: active ? TP.navy : TP.muted }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { DiscoverTab, ProfileTab, ScanLauncher, BottomTabBar });
