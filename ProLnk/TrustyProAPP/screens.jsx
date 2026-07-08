// TrustyPro Homeowner — 5 screens, dark mode, matching existing RN app

const BG = "#050d1a", CARD = "#0F1E35", CARD2 = "#13243d", BORDER = "#1E2E45";
const TEXT = "#F0F4FF", MUTED = "#7A8BA8";
const INDIGO = "#4F46E5", INDIGO_DIM = "#3730A3";
const YELLOW = "#FACC15", GREEN = "#10B981", AMBER = "#F59E0B", RED = "#EF4444", BLUE = "#3B82F6";

// ── Header used at top of most screens ───────────────────────────
function ScreenHeader({ eyebrow, title, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
      <div>
        {eyebrow && <div style={{ color: MUTED, fontSize: 13 }}>{eyebrow}</div>}
        <div style={{ color: TEXT, fontSize: 24, fontWeight: 800, letterSpacing: -0.4 }}>{title}</div>
      </div>
      {right}
    </div>
  );
}

// ── HOME ────────────────────────────────────────────────────────
function HealthRing({ score }) {
  const r = 56, circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  return (
    <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto" }}>
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle cx={70} cy={70} r={r} stroke={BORDER} strokeWidth={10} fill="none" />
        <circle cx={70} cy={70} r={r} stroke={INDIGO} strokeWidth={10} fill="none"
          strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 70 70)" style={{ transition: "stroke-dasharray 800ms ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: TEXT, fontSize: 32, fontWeight: 900, letterSpacing: -1 }}>{score}</div>
        <div style={{ color: MUTED, fontSize: 11, marginTop: -2 }}>/ 100</div>
      </div>
    </div>
  );
}

function HomeScreen({ goTab, setScanPhase }) {
  const [alertDismissed, setAlertDismissed] = React.useState(false);
  const chips = [
    { label: "Foundation", status: "✅" }, { label: "HVAC", status: "⚠️" },
    { label: "Roof", status: "✅" }, { label: "Plumbing", status: "✅" },
  ];
  const tasks = [
    { emoji: "🌡️", name: "HVAC Filter Change", cost: "$15", cta: "Schedule", primary: true },
    { emoji: "🏠", name: "Gutter Inspection", cost: "$150", cta: "Schedule", primary: true },
    { emoji: "💧", name: "Foundation Watering", cost: "Free", cta: "Remind me" },
  ];
  return (
    <div style={{ padding: "8px 20px 110px" }}>
      <ScreenHeader
        eyebrow="Good morning"
        title="Sarah 👋"
        right={<div style={{ width: 42, height: 42, borderRadius: 21, background: INDIGO, color: TEXT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>S</div>}
      />

      <HealthRing score={84} />
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <div style={{ color: MUTED, fontSize: 13 }}>Home Health Score</div>
        <div style={{ display: "inline-block", marginTop: 6, padding: "3px 12px", borderRadius: 12, background: GREEN + "26", border: `1px solid ${GREEN}`, color: GREEN, fontWeight: 700, fontSize: 12 }}>Good</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", margin: "20px 0 24px" }}>
        {chips.map(c => (
          <div key={c.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "6px 12px", color: TEXT, fontSize: 12, display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12 }}>{c.status}</span>{c.label}
          </div>
        ))}
      </div>

      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 16, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ color: TEXT, fontWeight: 800, fontSize: 14 }}>Due This Month</div>
          <div style={{ color: MUTED, fontSize: 12 }}>3 tasks</div>
        </div>
        {tasks.map((t, i) => (
          <div key={t.name} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: i < tasks.length - 1 ? `1px solid ${BORDER}` : "none" }}>
            <div style={{ fontSize: 22, marginRight: 12 }}>{t.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: TEXT, fontSize: 13, fontWeight: 600 }}>{t.name}</div>
              <div style={{ color: MUTED, fontSize: 12 }}>{t.cost}</div>
            </div>
            <button style={{ background: t.primary ? INDIGO : "transparent", color: TEXT, border: t.primary ? "none" : `1px solid ${BORDER}`, padding: "7px 12px", borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{t.cta}</button>
          </div>
        ))}
      </div>

      {!alertDismissed && (
        <div style={{ background: AMBER + "1a", border: `1px solid ${AMBER}55`, borderLeft: `4px solid ${AMBER}`, borderRadius: 14, padding: 14, marginBottom: 14, display: "flex" }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: AMBER, fontWeight: 800, fontSize: 13 }}>⚠️ Storm Alert</div>
            <div style={{ color: TEXT, fontSize: 12, marginTop: 4, lineHeight: 1.45 }}>Hail warning for ZIP 75034 — inspect your roof within 72h</div>
            <button onClick={() => goTab("find-pro")} style={{ background: "transparent", border: "none", color: INDIGO, fontWeight: 700, fontSize: 12, marginTop: 8, padding: 0, cursor: "pointer" }}>Find a Roofer →</button>
          </div>
          <button onClick={() => setAlertDismissed(true)} style={{ background: "transparent", border: "none", color: MUTED, fontSize: 18, cursor: "pointer" }}>×</button>
        </div>
      )}

      <button onClick={() => { setScanPhase(0); goTab("scan"); }} style={{ width: "100%", background: INDIGO, color: TEXT, border: "none", borderRadius: 16, padding: 18, fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: `0 8px 24px ${INDIGO}55` }}>
        📷  Scan My Home
      </button>
    </div>
  );
}

// ── SCAN ────────────────────────────────────────────────────────
function ScanScreen({ phase, setPhase }) {
  React.useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 2400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === 0) {
    return (
      <div style={{ position: "absolute", inset: 0, background: "#06090f", overflow: "hidden" }}>
        {/* faux camera feed */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 40%, #0e1a2b 0%, #050a14 70%)" }} />
        <div style={{ position: "absolute", top: 90, left: 0, right: 0, textAlign: "center", color: TEXT, fontSize: 14, fontWeight: 600 }}>Point at any part of your home</div>
        <div style={{ position: "absolute", top: 90, right: 24 }}>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "6px 10px", color: TEXT, fontSize: 11, border: `1px solid ${BORDER}` }}>History (47) →</div>
        </div>

        {/* viewfinder */}
        <div style={{ position: "absolute", inset: "150px 36px 220px", borderRadius: 18, border: `2px dashed ${INDIGO}88` }} />
        {[[0,0],[0,1],[1,0],[1,1]].map(([y,x],i) => (
          <div key={i} style={{
            position: "absolute",
            [y ? "bottom" : "top"]: y ? 220 : 150,
            [x ? "right" : "left"]: x ? 36 : 36,
            width: 24, height: 24,
            [y ? "borderBottomWidth" : "borderTopWidth"]: 3,
            [x ? "borderRightWidth" : "borderLeftWidth"]: 3,
            borderColor: YELLOW, borderStyle: "solid",
          }} />
        ))}

        <div style={{ position: "absolute", top: "42%", left: "12%", right: "12%", color: YELLOW, fontSize: 11, fontFamily: "monospace", textAlign: "center", textShadow: "0 0 6px rgba(0,0,0,0.6)" }}>
          DETECTING SURFACES…
        </div>

        {/* shutter */}
        <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <button onClick={() => setPhase(1)} style={{ width: 76, height: 76, borderRadius: 38, background: TEXT, border: `4px solid ${INDIGO}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>📷</button>
        </div>
        <div style={{ position: "absolute", bottom: 36, left: 0, right: 0, textAlign: "center", color: MUTED, fontSize: 11 }}>Tap to capture</div>
      </div>
    );
  }

  if (phase === 1) {
    return (
      <div style={{ position: "absolute", inset: 0, background: "#050505", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
        <div style={{ position: "relative", width: "78%", height: 220, background: "#0d1424", borderRadius: 14, overflow: "hidden", border: `1px solid ${BORDER}` }}>
          <div className="scan-line" style={{ position: "absolute", left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${INDIGO}, transparent)`, boxShadow: `0 0 12px ${INDIGO}` }} />
        </div>
        <div style={{ color: TEXT, fontSize: 17, fontWeight: 700 }}>AI is analyzing your home...</div>
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2].map(i => <div key={i} className="dot" style={{ width: 8, height: 8, borderRadius: 4, background: INDIGO, animationDelay: `${i * 150}ms` }} />)}
        </div>
        <div style={{ color: MUTED, fontSize: 12 }}>This takes about 5 seconds</div>
        <style>{`
          @keyframes scan { 0%{top:0} 100%{top:100%} }
          .scan-line { animation: scan 1.4s ease-in-out infinite alternate; }
          @keyframes pulse { 0%,80%,100%{opacity:.25} 40%{opacity:1} }
          .dot { animation: pulse 1.2s infinite; }
        `}</style>
      </div>
    );
  }

  // Results
  const results = [
    { icon: "✅", label: "Foundation", detail: "Stable", confidence: 94, color: GREEN },
    { icon: "⚠️", label: "Roof Shingles", detail: "Granule loss detected", confidence: 87, color: AMBER },
    { icon: "✅", label: "Gutters", detail: "Clear", confidence: 91, color: GREEN },
    { icon: "⚠️", label: "HVAC Unit", detail: "Age: 9 yrs — service recommended", confidence: 82, color: AMBER },
  ];
  return (
    <div style={{ padding: "8px 0 110px" }}>
      <div style={{ padding: "0 20px" }}>
        <ScreenHeader title="Scan Result" right={<button onClick={() => setPhase(0)} style={{ background: "transparent", border: `1px solid ${BORDER}`, color: TEXT, borderRadius: 18, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>↻ Rescan</button>} />
      </div>
      <div style={{ margin: "0 20px", height: 160, background: "linear-gradient(135deg, #0d1424, #122036)", borderRadius: 16, position: "relative", overflow: "hidden", border: `1px solid ${BORDER}`, marginBottom: 18 }}>
        {/* fake photo strip */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 8px, transparent 8px 16px)" }} />
        <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.5)", color: YELLOW, fontSize: 10, fontFamily: "monospace", padding: "3px 8px", borderRadius: 6 }}>CAPTURE • 2 issues</div>
        <div style={{ position: "absolute", top: "30%", left: "20%", width: 50, height: 50, borderRadius: 25, border: `2px solid ${AMBER}`, boxShadow: `0 0 0 4px ${AMBER}22` }} />
        <div style={{ position: "absolute", top: "60%", right: "25%", width: 38, height: 38, borderRadius: 19, border: `2px solid ${AMBER}`, boxShadow: `0 0 0 4px ${AMBER}22` }} />
      </div>

      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ color: TEXT, fontWeight: 800, fontSize: 16 }}>📊 Scan Complete</div>
          <div style={{ color: AMBER, fontSize: 12, fontWeight: 600 }}>Fair — 2 items</div>
        </div>
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
          {results.map((r, i) => (
            <div key={r.label} style={{ display: "flex", alignItems: "center", padding: "12px 14px", borderBottom: i < results.length - 1 ? `1px solid ${BORDER}` : "none" }}>
              <div style={{ fontSize: 18, marginRight: 10 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: TEXT, fontSize: 13, fontWeight: 600 }}>{r.label}</div>
                <div style={{ color: MUTED, fontSize: 11 }}>{r.detail}</div>
              </div>
              <div style={{ color: r.color, fontSize: 12, fontWeight: 700 }}>{r.confidence}%</div>
            </div>
          ))}
        </div>
        <button style={{ width: "100%", background: INDIGO, color: TEXT, border: "none", borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 800, cursor: "pointer", marginBottom: 8 }}>Get Quotes for Issues</button>
        <button style={{ width: "100%", background: "transparent", color: MUTED, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 12, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save to My Record</button>
      </div>
    </div>
  );
}

// ── PROPERTY ────────────────────────────────────────────────────
function PropertyScreen() {
  const [tab, setTab] = React.useState(0);
  const tabs = ["Systems", "History", "Documents", "Warranties"];
  const systems = [
    { emoji: "🌡️", name: "HVAC", badge: "Service due", badgeColor: AMBER, info: "9 years old" },
    { emoji: "💧", name: "Plumbing", badge: "Good", badgeColor: GREEN, info: "Checked 6mo ago" },
    { emoji: "🏠", name: "Roof", badge: "Granule loss", badgeColor: AMBER, info: "Scan detected" },
    { emoji: "⚡", name: "Electrical", badge: "Good", badgeColor: GREEN, info: "Panel 2021" },
    { emoji: "🏗️", name: "Foundation", badge: "Stable", badgeColor: GREEN, info: "Last 6mo" },
    { emoji: "🔌", name: "Appliances", badge: "4 tracked", badgeColor: INDIGO, info: "" },
    { emoji: "🪟", name: "Windows", badge: "Not logged", badgeColor: MUTED, info: "" },
    { emoji: "🌿", name: "Landscape", badge: "Maintained", badgeColor: GREEN, info: "1mo ago" },
  ];
  const history = [
    { date: "May 12", type: "AI Scan", desc: "2 issues detected — roof + HVAC" },
    { date: "Mar 8", type: "Service", desc: "HVAC filter replaced — $15" },
    { date: "Jan 15", type: "Inspection", desc: "Annual home inspection — passed" },
    { date: "Oct 2024", type: "Repair", desc: "Foundation perimeter watering added" },
  ];
  return (
    <div style={{ padding: "8px 0 110px" }}>
      <div style={{ padding: "0 20px", marginBottom: 18 }}>
        <div style={{ color: TEXT, fontSize: 22, fontWeight: 800, letterSpacing: -0.4 }}>1234 Oak Creek Dr</div>
        <div style={{ color: MUTED, fontSize: 13 }}>Frisco, TX 75034</div>
        <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
          {["Built 2015", "2,400 sqft", "4bd / 3ba"].map(s => <div key={s} style={{ color: MUTED, fontSize: 12 }}>{s}</div>)}
        </div>
      </div>
      <div style={{ display: "flex", gap: 24, padding: "0 20px", borderBottom: `1px solid ${BORDER}` }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{ background: "transparent", border: "none", padding: "0 0 12px", cursor: "pointer", color: tab === i ? TEXT : MUTED, fontWeight: tab === i ? 700 : 500, fontSize: 13, borderBottom: tab === i ? `2px solid ${INDIGO}` : "2px solid transparent", marginBottom: -1 }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: 20 }}>
        {tab === 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {systems.map(s => (
              <div key={s.name} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 14 }}>
                <div style={{ fontSize: 24 }}>{s.emoji}</div>
                <div style={{ color: TEXT, fontWeight: 700, fontSize: 13, marginTop: 6 }}>{s.name}</div>
                <div style={{ display: "inline-block", padding: "3px 8px", borderRadius: 8, background: s.badgeColor + "26", border: `1px solid ${s.badgeColor}`, color: s.badgeColor, fontSize: 10, fontWeight: 700, marginTop: 6 }}>{s.badge}</div>
                {s.info && <div style={{ color: MUTED, fontSize: 10, marginTop: 4 }}>{s.info}</div>}
                <div style={{ color: INDIGO, fontSize: 11, fontWeight: 700, marginTop: 8, cursor: "pointer" }}>Schedule →</div>
              </div>
            ))}
          </div>
        )}
        {tab === 1 && history.map((h, i) => (
          <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 14, marginBottom: 14, borderBottom: i < history.length - 1 ? `1px solid ${BORDER}` : "none" }}>
            <div style={{ width: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: INDIGO, marginTop: 4 }} />
              {i < history.length - 1 && <div style={{ width: 2, flex: 1, background: BORDER, marginTop: 4 }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: MUTED, fontSize: 11 }}>{h.date}</div>
              <div style={{ color: TEXT, fontWeight: 700, fontSize: 13 }}>{h.type}</div>
              <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{h.desc}</div>
            </div>
          </div>
        ))}
        {tab === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Home Inspection Report", "Survey Plat", "HOA Documents", "Permit — HVAC 2022"].map(d => (
              <div key={d} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: TEXT, fontSize: 13 }}>📄 {d}</div>
                <div style={{ color: INDIGO, fontSize: 14 }}>↓</div>
              </div>
            ))}
            <button style={{ background: "transparent", border: `2px dashed ${BORDER}`, borderRadius: 10, padding: 16, color: MUTED, cursor: "pointer", fontSize: 13 }}>+ Upload Document</button>
          </div>
        )}
        {tab === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { name: "HVAC System", expires: "Aug 2028", status: GREEN, label: "Active" },
              { name: "Home Warranty", expires: "Dec 2026", status: GREEN, label: "Active" },
              { name: "Roof (builder)", expires: "Jun 2025", status: AMBER, label: "Expiring" },
              { name: "Appliances", expires: "Various", status: MUTED, label: "Mixed" },
            ].map(w => (
              <div key={w.name} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: TEXT, fontWeight: 600, fontSize: 13 }}>{w.name}</div>
                  <div style={{ color: MUTED, fontSize: 11 }}>Expires {w.expires}</div>
                </div>
                <div style={{ background: w.status + "26", border: `1px solid ${w.status}`, color: w.status, padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700 }}>{w.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── FIND PRO ────────────────────────────────────────────────────
function FindProScreen() {
  const [selected, setSelected] = React.useState("HVAC");
  const [filter, setFilter] = React.useState("Available Now");
  const trades = [
    { emoji: "🌡️", label: "HVAC" }, { emoji: "💧", label: "Plumbing" },
    { emoji: "🏠", label: "Roofing" }, { emoji: "⚡", label: "Electrical" },
    { emoji: "🏗️", label: "Foundation" }, { emoji: "🐛", label: "Pest" },
    { emoji: "🌿", label: "Landscape" }, { emoji: "🔧", label: "Handyman" },
  ];
  const pros = [
    { name: "Marcus Rivera", rating: "4.9", reviews: 84, distance: "2.3mi", price: "$89–150", verified: true },
    { name: "David Chen", rating: "4.7", reviews: 62, distance: "3.1mi", price: "$79–140", verified: true },
    { name: "Sarah Williams", rating: "4.8", reviews: 91, distance: "4.2mi", price: "$95–160", verified: true },
  ];
  return (
    <div style={{ padding: "8px 20px 110px" }}>
      <ScreenHeader title="Find a Pro" />
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "0 14px", display: "flex", alignItems: "center", marginBottom: 18 }}>
        <span style={{ fontSize: 14, marginRight: 8 }}>🔍</span>
        <input placeholder="What do you need?" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: TEXT, padding: "14px 0", fontSize: 14 }} />
        <div style={{ background: INDIGO + "30", border: `1px solid ${INDIGO}`, color: INDIGO, padding: "4px 10px", borderRadius: 18, fontSize: 11, fontWeight: 700 }}>📍 75034</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        {trades.map(t => {
          const on = selected === t.label;
          return (
            <button key={t.label} onClick={() => setSelected(on ? null : t.label)} style={{ background: on ? INDIGO : CARD, border: `1px solid ${on ? INDIGO : BORDER}`, borderRadius: 12, padding: "12px 6px", color: TEXT, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 22 }}>{t.emoji}</span>
              <span style={{ fontSize: 10, color: on ? TEXT : MUTED }}>{t.label}</span>
            </button>
          );
        })}
      </div>

      {selected && (
        <React.Fragment>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" }}>
            {["Available Now", "4.5★+", "Verified Only"].map(f => {
              const on = filter === f;
              return (
                <button key={f} onClick={() => setFilter(f)} style={{ background: on ? INDIGO : CARD, border: `1px solid ${on ? INDIGO : BORDER}`, color: TEXT, padding: "8px 14px", borderRadius: 18, fontSize: 12, fontWeight: on ? 700 : 500, cursor: "pointer", whiteSpace: "nowrap" }}>{f}</button>
              );
            })}
          </div>

          <div style={{ background: INDIGO + "20", border: `1px solid ${INDIGO}55`, borderRadius: 12, padding: 14, marginBottom: 14 }}>
            <div style={{ color: TEXT, fontSize: 12, fontWeight: 700 }}>🤖 AI Recommendation</div>
            <div style={{ color: MUTED, fontSize: 12, marginTop: 4 }}>Based on your HVAC alert, <span style={{ color: TEXT, fontWeight: 600 }}>Marcus Rivera</span> is a great match — highest rating in your ZIP</div>
          </div>

          {pros.map((p, i) => (
            <div key={p.name} style={{ background: CARD, border: `1px solid ${i === 0 ? INDIGO : BORDER}`, borderRadius: 14, padding: 16, marginBottom: 12, position: "relative" }}>
              {i === 0 && <div style={{ position: "absolute", top: -8, left: 14, background: INDIGO, color: TEXT, padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700 }}>RECOMMENDED</div>}
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: INDIGO, color: TEXT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{p.name.split(" ").map(n => n[0]).join("")}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: TEXT, fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                    <span style={{ color: YELLOW, fontSize: 12 }}>⭐ {p.rating} ({p.reviews})</span>
                    {p.verified && <span style={{ color: GREEN, fontSize: 12 }}>✅ Verified</span>}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, color: MUTED, fontSize: 12 }}>
                <span>📍 {p.distance}</span>
                <span>💰 {p.price}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ flex: 1, background: YELLOW, color: BG, border: "none", borderRadius: 10, padding: 11, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>Book Now</button>
                <button style={{ background: "transparent", border: `1px solid ${BORDER}`, color: TEXT, borderRadius: 10, padding: "11px 18px", fontSize: 13, cursor: "pointer" }}>Message</button>
              </div>
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
}

// ── ALERTS ──────────────────────────────────────────────────────
function AlertsScreen() {
  const [dismissed, setDismissed] = React.useState([]);
  const [tab, setTab] = React.useState(0);
  const tabs = ["All", "Urgent", "Deals", "Maintenance"];
  const data = [
    { id: 1, cat: "Urgent", border: RED, icon: "🚨", title: "Storm Alert", body: "Hail warning: ZIP 75034 — inspect your roof within 72 hours", time: "2h ago", cta: "Find a Roofer", ctaColor: RED },
    { id: 2, cat: "Urgent", border: AMBER, icon: "⚠️", title: "Recall Notice", body: "GE panel model XA48 — check if your home is affected", time: "1d ago", cta: "Check My Home", ctaColor: AMBER },
    { id: 3, cat: "Deals", border: INDIGO, icon: "💰", title: "Group Deal", body: "HVAC Pre-Season Tune-up — 8 of 10 neighbors joined · $89 (normally $149)", time: "2d ago", cta: "Join Group", ctaColor: YELLOW, progress: 0.8 },
    { id: 4, cat: "Maintenance", border: GREEN, icon: "🔧", title: "Maintenance Due", body: "HVAC filter — 94 days since last change. Prevent coil freeze.", time: "2d ago", cta: "Schedule Service", ctaColor: GREEN },
    { id: 5, cat: "All", border: BLUE, icon: "💡", title: "Insight", body: "Your roof is 9 years old — peak DFW hail season starts April", time: "3d ago", cta: "View Report", ctaColor: BLUE },
  ];
  const filterCat = tabs[tab];
  const visible = data.filter(a => !dismissed.includes(a.id) && (filterCat === "All" || a.cat === filterCat));
  return (
    <div style={{ padding: "8px 0 110px" }}>
      <div style={{ padding: "0 20px" }}>
        <ScreenHeader title="Alerts" right={<div style={{ background: RED, color: TEXT, fontWeight: 700, fontSize: 12, padding: "4px 9px", borderRadius: 12 }}>{visible.length} unread</div>} />
        <div style={{ display: "flex", gap: 20, borderBottom: `1px solid ${BORDER}`, marginBottom: 16 }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{ background: "transparent", border: "none", padding: "0 0 12px", cursor: "pointer", color: tab === i ? TEXT : MUTED, fontWeight: tab === i ? 700 : 500, fontSize: 13, borderBottom: tab === i ? `2px solid ${INDIGO}` : "2px solid transparent", marginBottom: -1 }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        {visible.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: MUTED }}>
            <div style={{ fontSize: 48 }}>✅</div>
            <div style={{ color: TEXT, fontSize: 16, fontWeight: 700, marginTop: 12 }}>All caught up!</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>No alerts in this category</div>
          </div>
        )}
        {visible.map(a => (
          <div key={a.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${a.border}`, borderRadius: 14, padding: 14, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ color: a.border, fontWeight: 800, fontSize: 13 }}>{a.icon} {a.title}</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: MUTED, fontSize: 11 }}>{a.time}</span>
                <button onClick={() => setDismissed(d => [...d, a.id])} style={{ background: "transparent", border: "none", color: MUTED, fontSize: 18, cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
              </div>
            </div>
            <div style={{ color: TEXT, fontSize: 13, lineHeight: 1.45, marginBottom: 12 }}>{a.body}</div>
            {a.progress && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ height: 6, background: BORDER, borderRadius: 3, overflow: "hidden", marginBottom: 4 }}>
                  <div style={{ height: 6, width: `${a.progress * 100}%`, background: INDIGO, borderRadius: 3 }} />
                </div>
                <div style={{ color: MUTED, fontSize: 11 }}>8 of 10 neighbors joined</div>
              </div>
            )}
            <button style={{ background: a.ctaColor === YELLOW ? YELLOW : a.ctaColor + "22", color: a.ctaColor === YELLOW ? BG : a.ctaColor, border: `1px solid ${a.ctaColor}`, borderRadius: 10, padding: "8px 12px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{a.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bottom Tab Bar ──────────────────────────────────────────────
function TabBar({ tab, goTab }) {
  const tabs = [
    { id: "home", emoji: "🏠", label: "Home" },
    { id: "scan", emoji: "📷", label: "Scan", raised: true },
    { id: "property", emoji: "🏡", label: "Property" },
    { id: "find-pro", emoji: "👷", label: "Find Pro" },
    { id: "alerts", emoji: "🔔", label: "Alerts" },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 88, paddingBottom: 24, background: BG, borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-around", alignItems: "center", zIndex: 40 }}>
      {tabs.map(t => {
        const active = tab === t.id;
        if (t.raised) {
          return (
            <button key={t.id} onClick={() => goTab(t.id)} style={{ background: active ? INDIGO : "#1a1a2e", border: "none", borderRadius: 28, width: 56, height: 56, marginTop: -20, color: TEXT, fontSize: 22, cursor: "pointer", boxShadow: active ? `0 10px 24px ${INDIGO}88` : `0 6px 16px rgba(0,0,0,0.5)` }}>
              {t.emoji}
            </button>
          );
        }
        return (
          <button key={t.id} onClick={() => goTab(t.id)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 4px" }}>
            <span style={{ fontSize: 20, opacity: active ? 1 : 0.55 }}>{t.emoji}</span>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: active ? INDIGO : "transparent" }} />
          </button>
        );
      })}
    </div>
  );
}

window.HomeScreen = HomeScreen;
window.ScanScreen = ScanScreen;
window.PropertyScreen = PropertyScreen;
window.FindProScreen = FindProScreen;
window.AlertsScreen = AlertsScreen;
window.TabBar = TabBar;
window.TRUSTY_COLORS = { BG, CARD, BORDER, TEXT, MUTED, INDIGO, YELLOW, GREEN, AMBER, RED };
