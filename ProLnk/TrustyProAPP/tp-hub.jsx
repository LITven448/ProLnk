// TrustyPro v2 — Home Profile hub + detail screens

// ─────────────────────────────────────────────────────────────
// 4.7 Home Profile (THE HUB)
// ─────────────────────────────────────────────────────────────
function HomeProfile({ next, openTab }) {
  const [invTab, setInvTab] = React.useState("Rooms");
  const score = 73;

  const components = [
    { label: "Completeness", pct: 70 },
    { label: "Condition",    pct: 78 },
    { label: "Maintenance",  pct: 65 },
    { label: "Safety",       pct: 82 },
  ];

  const next3 = [
    { title: "Capture your electrical panel", sub: "+10 to score", kind: "panel", cta: "Scan now", icon: "zap" },
    { title: "Your HVAC is 14 years old", sub: "Aging — get it inspected", kind: "hvac", cta: "Request a quote", icon: "thermometer", warn: true },
    { title: "Spring maintenance guide", sub: "Read · 6 min", kind: "article", cta: "Read", icon: "bookOpen" },
  ];

  const rooms = [
    { name: "Kitchen", kind: "kitchen", status: "scanned" },
    { name: "Living Room", kind: "livingRoom", status: "scanned" },
    { name: "Master Bed", kind: "bedroom", status: "scanned" },
    { name: "Bedroom 2", kind: "bedroom", status: "scanned" },
    { name: "Bedroom 3", kind: "bedroom", status: "pending" },
    { name: "Master Bath", kind: "bath", status: "pending" },
  ];
  const systems = [
    { name: "HVAC", kind: "hvac", status: "action", sub: "14 yrs", icon: "thermometer" },
    { name: "Electrical Panel", kind: "panel", status: "pending", sub: "Not scanned", icon: "zap" },
    { name: "Water Heater", kind: "hvac", status: "scanned", sub: "8 yrs", icon: "droplets" },
    { name: "Roof", kind: "exterior", status: "pending", sub: "Not scanned", icon: "home" },
  ];
  const appliances = [
    { name: "Refrigerator", sub: "LG · 2019", kind: "fridge", status: "scanned", icon: "fridge" },
    { name: "Range", sub: "GE · gas", kind: "range", status: "scanned", icon: "flame" },
    { name: "Dishwasher", sub: "Bosch", kind: "kitchen", status: "scanned", icon: "droplets" },
    { name: "Microwave", sub: "Whirlpool", kind: "kitchen", status: "scanned", icon: "flame" },
    { name: "Washer", sub: "Samsung · 6 yrs", kind: "panel", status: "scanned", icon: "droplets" },
    { name: "Dryer", sub: "Samsung · 6 yrs", kind: "panel", status: "scanned", icon: "flame" },
  ];
  const exterior = [
    { name: "Roof", kind: "exterior", status: "pending" },
    { name: "Gutters", kind: "exterior", status: "pending" },
    { name: "Siding", kind: "exterior", status: "scanned" },
    { name: "Landscape", kind: "exterior", status: "scanned" },
  ];

  const activity = [
    { thumb: "kitchen",     text: "You captured the kitchen", time: "2 hours ago" },
    { thumb: "fridge",      text: "3 appliances added",       time: "yesterday" },
    { thumb: "bedroom",     text: "Master bedroom documented", time: "2 days ago" },
  ];

  const articles = [
    { title: "How to prep for storm season", kind: "exterior" },
    { title: "Should you replace or repair your 12-year-old AC?", kind: "hvac" },
  ];

  // Detected issues/opportunities from the AI photo scan (mirrors backend fields)
  const findings = [
    { category: "HVAC", title: "Aging AC unit", severity: "medium", trade: "HVAC", costRange: "$6,800–9,200",
      description: "Your condenser is 14 years old — at the end of its typical lifespan. An inspection now can catch failures before peak summer." },
    { category: "Roof", title: "Lifted shingles, north gable", severity: "high", trade: "Roofing", costRange: "$450–900",
      description: "The scan spotted early shingle wear. Repairing now is far cheaper than addressing a leak later." },
    { category: "Plumbing", title: "Water heater nearing service", severity: "low", trade: "Plumbing", costRange: "$180–340",
      description: "Your water heater is due for a flush to keep it running efficiently. A quick, inexpensive bit of upkeep." },
  ];

  const Tab = ({ id }) => (
    <button onClick={() => setInvTab(id)} style={{
      background: invTab === id ? TP.navy : "transparent",
      color: invTab === id ? "white" : TP.text2,
      border: "none", padding: "8px 14px", borderRadius: 999,
      fontFamily: TP.sans, fontSize: 13, fontWeight: 600, cursor: "pointer",
      transition: "all 200ms",
    }}>{id}</button>
  );

  const items = invTab === "Rooms" ? rooms : invTab === "Systems" ? systems : invTab === "Appliances" ? appliances : exterior;

  return (
    <div style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", paddingBottom: 200 }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, background: "white", zIndex: 5, padding: "56px 24px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${TP.borderSubtle}` }}>
        <div style={{ fontFamily: TP.serif, fontSize: 17, fontWeight: 700, color: TP.navy, letterSpacing: -0.2 }}>TrustyPro</div>
        <div style={{ width: 34, height: 34, borderRadius: 17, background: TP.navy, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TP.sans, fontSize: 13, fontWeight: 600 }}>S</div>
      </div>

      {/* Section 1: Health Score banner */}
      <div style={{ padding: "20px 24px 8px" }}>
        <button onClick={() => next("score")} style={{
          width: "100%", background: TP.tint, borderRadius: 18, padding: 20, border: "none", textAlign: "left", cursor: "pointer",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <Eyebrow color={TP.blue}>Home Health Score</Eyebrow>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}>
                <span style={{ fontFamily: TP.serif, fontSize: 56, fontWeight: 700, color: TP.navy, letterSpacing: -2, lineHeight: 1 }}>{score}</span>
                <span style={{ fontFamily: TP.sans, fontSize: 13, color: TP.text2 }}>of 100</span>
              </div>
              <div style={{ fontFamily: TP.sans, fontSize: 13, color: TP.navy, marginTop: 6, fontWeight: 500 }}>
                Strong — 3 spaces left to capture
              </div>
            </div>
            <ScoreRing score={score} size={70} stroke={6} showLabel={false} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
            {components.map(c => (
              <div key={c.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: TP.sans, fontSize: 11, color: TP.text2, marginBottom: 4 }}>
                  <span>{c.label}</span>
                  <span style={{ fontWeight: 600, color: TP.navy }}>{c.pct}%</span>
                </div>
                <div style={{ height: 3, background: "rgba(10,22,40,0.1)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: 3, width: `${c.pct}%`, background: TP.navy, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </button>
      </div>

      {/* Quick actions */}
      <div style={{ padding: "12px 24px 4px", display: "flex", gap: 12 }}>
        <button onClick={() => next("coaching")} style={{ flex: 1, background: TP.navy, color: "white", border: "none", borderRadius: 14, padding: "14px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
          <Icon name="camera" size={20} color="white" strokeWidth={1.7} />
          <span style={{ fontFamily: TP.sans, fontSize: 14, fontWeight: 600 }}>Scan a space</span>
        </button>
        <button onClick={() => next("requestService")} style={{ flex: 1, background: "white", color: TP.navy, border: `1px solid ${TP.border}`, borderRadius: 14, padding: "14px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, boxShadow: TP.cardRest }}>
          <Icon name="wrench" size={20} color={TP.blue} strokeWidth={1.7} />
          <span style={{ fontFamily: TP.sans, fontSize: 14, fontWeight: 600 }}>Request a service</span>
        </button>
      </div>

      {/* Section: What we found (AI scan findings) */}
      <div style={{ padding: "22px 24px 8px" }}>
        <SectionHeader label="What we found" action={<span style={{ fontFamily: TP.sans, fontSize: 12, color: TP.muted }}>{findings.length} items</span>} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {findings.map((f, i) => (
            <FindingCard key={i} finding={f} onAction={() => next("requestService")} />
          ))}
        </div>
        {/* All-clear hint — what the positive state looks like */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, padding: "12px 14px", background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 12 }}>
          <Icon name="checkCircle" size={18} color="#047857" />
          <span style={{ fontFamily: TP.sans, fontSize: 13, color: "#065F46", lineHeight: 1.4 }}>
            Everything else looks healthy. We'll keep watching and tell you the moment something changes.
          </span>
        </div>
      </div>

      {/* Section 2: What's next */}
      <div style={{ padding: "22px 0 8px" }}>
        <div style={{ padding: "0 24px" }}>
          <SectionHeader label="What's next" />
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 24px 4px", scrollSnapType: "x mandatory" }}>
          {next3.map((c, i) => (
            <div key={i} style={{
              flexShrink: 0, width: 260, background: "white", border: `1px solid ${TP.border}`,
              borderRadius: 16, overflow: "hidden", scrollSnapAlign: "start", boxShadow: TP.cardRest,
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ height: 92, position: "relative" }}>
                <PhotoPlaceholder kind={c.kind} height="100%" radius={0} />
                <div style={{ position: "absolute", top: 10, left: 10, width: 30, height: 30, borderRadius: 15, background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                  {c.warn && <div style={{ position: "absolute", top: -3, right: -3, width: 10, height: 10, borderRadius: 5, background: TP.amber, border: "2px solid white" }} />}
                  <Icon name={c.icon} size={15} color={TP.navy} />
                </div>
              </div>
              <div style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: TP.sans, fontSize: 14, fontWeight: 600, color: TP.navy, lineHeight: 1.3 }}>{c.title}</div>
                  <div style={{ fontFamily: TP.sans, fontSize: 12, color: TP.text2, marginTop: 4 }}>{c.sub}</div>
                </div>
                <TextLink onClick={() => i === 0 ? next("coaching") : i === 1 ? next("requestService") : openTab("discover")} style={{ marginTop: 10, fontSize: 13 }}>{c.cta} →</TextLink>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Your Home (inventory) */}
      <div style={{ padding: "22px 24px 8px" }}>
        <SectionHeader label="Your home" action={<TextLink>View all</TextLink>} />
        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {["Rooms", "Systems", "Appliances", "Exterior"].map(t => <Tab key={t} id={t} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {items.map(item => {
            const greyed = item.status === "pending";
            return (
              <button key={item.name} onClick={() => !greyed && next("roomDetail")} style={{
                background: "white", border: `1px solid ${TP.border}`, borderRadius: 14, overflow: "hidden",
                padding: 0, cursor: greyed ? "default" : "pointer", textAlign: "left", display: "block",
                opacity: greyed ? 0.55 : 1, boxShadow: TP.cardRest,
              }}>
                <div style={{ position: "relative", height: 86 }}>
                  <PhotoPlaceholder kind={item.kind} height="100%" radius={0} />
                  {item.icon && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.45)", backdropFilter: "blur(2px)" }}>
                      <Icon name={item.icon} size={26} color={TP.navy} strokeWidth={1.4} />
                    </div>
                  )}
                </div>
                <div style={{ padding: "10px 12px 12px" }}>
                  <div style={{ fontFamily: TP.sans, fontSize: 13, fontWeight: 600, color: TP.navy }}>{item.name}</div>
                  <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {item.sub
                      ? <span style={{ fontFamily: TP.sans, fontSize: 11, color: TP.text2 }}>{item.sub}</span>
                      : <StatusChip kind={item.status}>{item.status === "scanned" ? "Scanned" : item.status === "action" ? "Action needed" : item.status === "pending" ? "Not scanned" : "Captured"}</StatusChip>
                    }
                    {item.status === "action" && <span style={{ width: 8, height: 8, borderRadius: 4, background: TP.amber }} />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 4: Recent activity */}
      <div style={{ padding: "26px 24px 8px" }}>
        <SectionHeader label="Recent activity" />
        {activity.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < activity.length - 1 ? `1px solid ${TP.borderSubtle}` : "none" }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
              <PhotoPlaceholder kind={a.thumb} height="100%" radius={0} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text }}>{a.text}</div>
              <div style={{ fontFamily: TP.sans, fontSize: 12, color: TP.muted, marginTop: 2 }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Section 5: Discover */}
      <div style={{ padding: "26px 24px 0" }}>
        <SectionHeader label="Discover" action={<TextLink onClick={() => openTab("discover")}>See all</TextLink>} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {articles.map((a, i) => (
            <button key={i} onClick={() => openTab("discover")} style={{ position: "relative", height: 160, borderRadius: 16, overflow: "hidden", border: "none", padding: 0, cursor: "pointer" }}>
              <PhotoPlaceholder kind={a.kind} height="100%" radius={0} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.78), transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, textAlign: "left" }}>
                <Eyebrow color="white" style={{ opacity: 0.85 }}>Article</Eyebrow>
                <div style={{ fontFamily: TP.serif, fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1.25, letterSpacing: -0.3, marginTop: 6 }}>{a.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Scan FAB */}
      <button onClick={() => next("coaching")} style={{
        position: "fixed", bottom: 102, right: 24, zIndex: 30,
        background: TP.blue, color: "white", border: "none", padding: "14px 22px",
        borderRadius: 999, fontFamily: TP.sans, fontSize: 14, fontWeight: 600, cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 8,
        boxShadow: TP.fab,
      }}>
        <Icon name="camera" size={18} color="white" /> Scan something
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4.8 Room Detail (Kitchen)
// ─────────────────────────────────────────────────────────────
function RoomDetail({ next, back }) {
  const [tab, setTab] = React.useState("Photos");
  const items = [
    { name: "Refrigerator", sub: "LG · LRMVS3006S", kind: "fridge", status: "scanned" },
    { name: "Range", sub: "GE · gas", kind: "range", status: "scanned" },
    { name: "Dishwasher", sub: "Bosch", kind: "kitchen", status: "scanned" },
    { name: "Sink fixture", sub: "Moen", kind: "bath", status: "scanned" },
  ];
  const history = [
    { date: "Mar 18, 2026", title: "Captured", body: "8 angles + 3 appliances logged" },
    { date: "Feb 4, 2026",  title: "Pro service", body: "Leak repair under sink — $185" },
    { date: "Jul 2024",     title: "Renovation", body: "Counters and backsplash replaced" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", paddingBottom: 120 }}>
      <div style={{ position: "relative", height: 280 }}>
        <PhotoPlaceholder
          kind="kitchen"
          height="100%"
          radius={0}
          label="KITCHEN · CAPTURED MAR 18"
          src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=85&auto=format&fit=crop"
        />
        <button onClick={back} style={{ position: "absolute", top: 56, left: 20, width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.9)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevronLeft" size={20} color={TP.navy} />
        </button>
        <button style={{ position: "absolute", top: 56, right: 20, width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.9)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="share" size={18} color={TP.navy} />
        </button>
      </div>

      <div style={{ background: "white", marginTop: -22, borderRadius: "22px 22px 0 0", padding: "22px 24px 12px", position: "relative" }}>
        <Eyebrow>Room</Eyebrow>
        <h1 style={{ fontFamily: TP.serif, fontSize: 26, fontWeight: 700, color: TP.navy, letterSpacing: -0.5, margin: "6px 0 14px" }}>Kitchen</h1>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          <StatChip>180 sqft</StatChip>
          <StatChip>3 fixtures</StatChip>
          <StatChip>4 appliances</StatChip>
          <StatChip>Renovated 2024</StatChip>
        </div>

        <div style={{ display: "flex", gap: 24, borderBottom: `1px solid ${TP.border}`, marginBottom: 18 }}>
          {["Photos", "Items", "History"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", padding: "0 0 12px", cursor: "pointer", fontFamily: TP.sans, fontSize: 14, fontWeight: tab === t ? 700 : 500, color: tab === t ? TP.navy : TP.muted, borderBottom: tab === t ? `2px solid ${TP.navy}` : "2px solid transparent", marginBottom: -1 }}>{t}</button>
          ))}
        </div>

        {tab === "Photos" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              "photo-1556911220-e15b29be8c8f",
              "photo-1556911220-bff31c812dba",
              "photo-1565538810643-b5bdb714032a",
              "photo-1600566752355-35792bedcfea",
            ].map((id, i) => (
              <PhotoPlaceholder
                key={id}
                kind="kitchen"
                height={156}
                label={`ANGLE ${String(i + 1).padStart(2, "0")}`}
                radius={10}
                src={`https://images.unsplash.com/${id}?w=600&q=85&auto=format&fit=crop`}
              />
            ))}
          </div>
        )}

        {tab === "Items" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {items.map((it, i) => (
              <button key={it.name} onClick={() => next("systemDetail")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", border: "none", background: "transparent", cursor: "pointer", borderBottom: i < items.length - 1 ? `1px solid ${TP.borderSubtle}` : "none", width: "100%", textAlign: "left" }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                  <PhotoPlaceholder kind={it.kind} height="100%" radius={0} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: TP.sans, fontSize: 14, fontWeight: 600, color: TP.navy }}>{it.name}</div>
                  <div style={{ fontFamily: TP.sans, fontSize: 12, color: TP.text2, marginTop: 2 }}>{it.sub}</div>
                </div>
                <Icon name="chevronRight" size={16} color={TP.muted} />
              </button>
            ))}
          </div>
        )}

        {tab === "History" && (
          <div>
            {history.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: i < history.length - 1 ? `1px solid ${TP.borderSubtle}` : "none" }}>
                <div style={{ width: 8, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: TP.navy }} />
                  {i < history.length - 1 && <div style={{ width: 1, flex: 1, background: TP.border, marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: TP.mono, fontSize: 11, color: TP.muted }}>{h.date}</div>
                  <div style={{ fontFamily: TP.sans, fontSize: 14, fontWeight: 600, color: TP.navy, marginTop: 2 }}>{h.title}</div>
                  <div style={{ fontFamily: TP.sans, fontSize: 13, color: TP.text2, marginTop: 2 }}>{h.body}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky action bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "white", borderTop: `1px solid ${TP.border}`, padding: "14px 20px 30px", display: "flex", gap: 10 }}>
        <SecondaryCTA full style={{ flex: 1 }}>Add a photo</SecondaryCTA>
        <PrimaryCTA full={false} onClick={() => next("requestService")} style={{ flex: 1.2 }}>Schedule a service</PrimaryCTA>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4.9 System Detail (HVAC)
// ─────────────────────────────────────────────────────────────
function SystemDetail({ back, next }) {
  const stats = [
    { k: "Age", v: "14 years" },
    { k: "Capacity", v: "3 tons" },
    { k: "Last service", v: "None recorded" },
    { k: "Replacement", v: "$6,800–9,200" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", paddingBottom: 120 }}>
      <div style={{ position: "relative", height: 260 }}>
        <PhotoPlaceholder kind="hvac" height="100%" radius={0} label="CARRIER · MODEL 24ACC636A003" />
        <button onClick={back} style={{ position: "absolute", top: 56, left: 20, width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.9)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevronLeft" size={20} color={TP.navy} />
        </button>
        <button style={{ position: "absolute", top: 56, right: 20, width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.9)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="edit" size={16} color={TP.navy} />
        </button>
      </div>

      <div style={{ background: "white", marginTop: -22, borderRadius: "22px 22px 0 0", padding: "22px 24px 12px", position: "relative" }}>
        <Eyebrow>System</Eyebrow>
        <h1 style={{ fontFamily: TP.serif, fontSize: 26, fontWeight: 700, color: TP.navy, letterSpacing: -0.5, margin: "6px 0 6px" }}>Central Air Conditioning</h1>
        <div style={{ fontFamily: TP.sans, fontSize: 13, color: TP.text2, marginBottom: 18 }}>
          Carrier · Model 24ACC636A003 · Installed 2012
        </div>

        {/* Status banner */}
        <div style={{ background: TP.amberBg, borderRadius: 14, padding: 16, marginBottom: 22, display: "flex", gap: 14, border: "1px solid #fde68a" }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: "rgba(245,158,11,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="clock" size={18} color="#92400E" />
          </div>
          <div>
            <div style={{ fontFamily: TP.sans, fontSize: 14, fontWeight: 600, color: TP.navy }}>Aging — average lifespan reached</div>
            <div style={{ fontFamily: TP.sans, fontSize: 13, lineHeight: 1.45, color: TP.text2, marginTop: 4 }}>
              Most units this age benefit from an inspection to catch issues early.
            </div>
            <TextLink style={{ marginTop: 8 }} onClick={() => next && next("requestService")}>Schedule inspection →</TextLink>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
          {stats.map(s => (
            <div key={s.k} style={{ background: TP.surface, border: `1px solid ${TP.borderSubtle}`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontFamily: TP.sans, fontSize: 11, color: TP.muted, textTransform: "uppercase", letterSpacing: 1 }}>{s.k}</div>
              <div style={{ fontFamily: TP.serif, fontSize: 19, fontWeight: 600, color: TP.navy, marginTop: 4, letterSpacing: -0.3 }}>{s.v}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${TP.borderSubtle}`, paddingTop: 18, marginBottom: 18 }}>
          <SectionHeader label="Maintenance log" />
          <div style={{ padding: "20px 0", textAlign: "center" }}>
            <div style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text2, marginBottom: 12 }}>No service records yet.</div>
            <SecondaryCTA>Log a service</SecondaryCTA>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "white", borderTop: `1px solid ${TP.border}`, padding: "14px 20px 30px", display: "flex", gap: 10 }}>
        <SecondaryCTA full style={{ flex: 1 }} onClick={() => next && next("shopLook")}>Find replacements</SecondaryCTA>
        <PrimaryCTA full={false} style={{ flex: 1.4 }} onClick={() => next && next("requestService")}>Get inspection quote</PrimaryCTA>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4.10 Health Score Detail
// ─────────────────────────────────────────────────────────────
function ScoreDetail({ back }) {
  const components = [
    { label: "Completeness", pct: 70, desc: "How much of your home is documented.", missing: "3 rooms · 2 systems left" },
    { label: "Condition",    pct: 78, desc: "Visible state of finishes, fixtures, and items captured.", missing: "Roof not yet captured" },
    { label: "Maintenance",  pct: 65, desc: "Whether systems are serviced on a regular cadence.", missing: "HVAC overdue · filter change due" },
    { label: "Safety",       pct: 82, desc: "Detectors, panels, water shutoff and recall checks.", missing: "Electrical panel not captured" },
  ];
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", paddingBottom: 80 }}>
      <div style={{ position: "sticky", top: 0, background: "white", zIndex: 5, padding: "56px 20px 14px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={back} style={{ width: 40, height: 40, borderRadius: 20, background: "transparent", border: `1px solid ${TP.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevronLeft" size={20} color={TP.navy} />
        </button>
        <div style={{ fontFamily: TP.sans, fontSize: 15, fontWeight: 600, color: TP.navy }}>Home Health Score</div>
      </div>

      <div style={{ padding: "20px 24px", textAlign: "center" }}>
        <ScoreRing score={73} size={200} stroke={10} />
        <div style={{ marginTop: 14, fontFamily: TP.sans, fontSize: 15, color: TP.navy, fontWeight: 500 }}>Strong</div>
        <div style={{ fontFamily: TP.sans, fontSize: 13, color: TP.text2, marginTop: 2 }}>3 spaces left to reach 'Excellent'</div>
      </div>

      <div style={{ padding: "10px 24px 0" }}>
        <SectionHeader label="Components" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {components.map(c => (
            <div key={c.label} style={{ background: "white", border: `1px solid ${TP.border}`, borderRadius: 16, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontFamily: TP.sans, fontSize: 16, fontWeight: 600, color: TP.navy }}>{c.label}</div>
                <div style={{ fontFamily: TP.serif, fontSize: 28, fontWeight: 700, color: TP.navy, letterSpacing: -1 }}>{c.pct}<span style={{ fontFamily: TP.sans, fontSize: 13, fontWeight: 500, color: TP.muted, marginLeft: 2 }}>%</span></div>
              </div>
              <div style={{ height: 4, background: TP.borderSubtle, borderRadius: 2, marginTop: 10, marginBottom: 12, overflow: "hidden" }}>
                <div style={{ height: 4, width: `${c.pct}%`, background: TP.navy, borderRadius: 2 }} />
              </div>
              <div style={{ fontFamily: TP.sans, fontSize: 13, color: TP.text2, lineHeight: 1.5 }}>{c.desc}</div>
              <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: TP.sans, fontSize: 12, color: TP.muted }}>Missing: {c.missing}</span>
                <TextLink>View →</TextLink>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "22px 24px 0" }}>
        <button onClick={() => setOpen(o => !o)} style={{ width: "100%", background: TP.surface, border: `1px solid ${TP.borderSubtle}`, borderRadius: 14, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
          <span style={{ fontFamily: TP.sans, fontSize: 14, fontWeight: 600, color: TP.navy }}>How is this calculated?</span>
          <Icon name={open ? "chevronLeft" : "chevronRight"} size={16} color={TP.muted} style={{ transform: open ? "rotate(-90deg)" : "rotate(0)" }} />
        </button>
        {open && (
          <div style={{ background: TP.surface, marginTop: -1, borderRadius: "0 0 14px 14px", padding: "0 16px 18px", border: `1px solid ${TP.borderSubtle}`, borderTop: "none" }}>
            <p style={{ fontFamily: TP.sans, fontSize: 13, color: TP.text2, lineHeight: 1.6, margin: 0 }}>
              Your score blends four components, each weighted by how much they affect resale value, insurance risk, and day-to-day livability. Documentation rigor counts as much as condition — a well-recorded home is easier to sell, insure, and maintain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { HomeProfile, RoomDetail, SystemDetail, ScoreDetail });
