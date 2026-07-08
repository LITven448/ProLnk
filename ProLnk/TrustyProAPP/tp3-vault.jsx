// TrustyPro v3 — Health Vault (signature screen) + Home dashboard

// ─────────────────────────────────────────────────────────────
// Health Vault — score gauge, ATTOM facts, findings, inventory, scan history.
// `allClear` prop renders the positive empty state.
// ─────────────────────────────────────────────────────────────
function W3Vault({ go, state, allClear }) {
  const [invTab, setInvTab] = React.useState("Rooms");
  const score = allClear ? 86 : state.score;
  const findings = allClear ? [] : T3_FINDINGS;

  const components = [
    { label: "Completeness", pct: allClear ? 92 : 70 },
    { label: "Condition",    pct: allClear ? 88 : 76 },
    { label: "Maintenance",  pct: allClear ? 81 : 64 },
    { label: "Safety",       pct: allClear ? 90 : 84 },
  ];

  return (
    <div data-screen-label="Health Vault" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.surface, overflowY: "auto", paddingBottom: 130 }}>
      {/* Header */}
      <div style={{ background: "white", padding: "58px 24px 0", borderBottom: `1px solid ${T3.borderSubtle}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div>
            <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.muted, fontWeight: 500 }}>{T3_PROPERTY.address} · {T3_PROPERTY.cityState}</div>
            <h1 style={{ fontFamily: T3.sans, fontSize: 24, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "2px 0 0" }}>Health Vault</h1>
          </div>
          <button onClick={() => go("profile")} style={{ width: 38, height: 38, borderRadius: 19, background: T3.ink, color: "white", border: "none", fontFamily: T3.sans, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>S</button>
        </div>

        {/* Gauge */}
        <div style={{ display: "flex", justifyContent: "center", padding: "14px 0 4px" }}>
          <HealthScoreRing score={score} size={190} />
        </div>

        {/* Component bars */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px", padding: "10px 4px 22px" }}>
          {components.map(c => (
            <div key={c.label}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: T3.sans, fontSize: 11.5, marginBottom: 5 }}>
                <span style={{ color: T3.ink2, fontWeight: 500 }}>{c.label}</span>
                <span style={{ fontWeight: 700, color: T3.ink, fontVariantNumeric: "tabular-nums" }}>{c.pct}%</span>
              </div>
              <div style={{ height: 4, background: T3.surface2, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: 4, width: `${c.pct}%`, background: T3.indigo, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Findings OR all-clear */}
      <div style={{ padding: "22px 24px 0" }}>
        {findings.length > 0 ? (
          <React.Fragment>
            <Sect label="What we found" action={<span style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted, fontWeight: 500 }}>{findings.length} open</span>} />
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {findings.map(f => (
                <FindingCard key={f.id} finding={f} requested={state.requests.some(r => r.findingId === f.id)} onAction={() => go("request", { finding: f })} />
              ))}
            </div>
          </React.Fragment>
        ) : (
          <div style={{ background: "white", border: `1px solid ${T3.greenBd}`, borderRadius: 18, padding: "26px 22px", textAlign: "center", boxShadow: T3.rest }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, background: T3.greenBg, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <I3 name="shieldCheck" size={26} color={T3.green} strokeWidth={1.8} />
            </div>
            <div style={{ fontFamily: T3.sans, fontSize: 17, fontWeight: 800, color: T3.ink, letterSpacing: "-0.02em" }}>All clear.</div>
            <div style={{ fontFamily: T3.sans, fontSize: 13.5, color: T3.ink2, lineHeight: 1.55, marginTop: 6, maxWidth: 270, marginLeft: "auto", marginRight: "auto" }}>
              Nothing needs your attention right now. We keep watching — storms, recalls, aging systems — and we'll tell you the moment something changes.
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 14, background: T3.surface, borderRadius: 999, padding: "6px 14px" }}>
              <span className="t3-ping" style={{ width: 6, height: 6, borderRadius: 3, background: T3.green }} />
              <span style={{ fontFamily: T3.sans, fontSize: 12, color: T3.ink2, fontWeight: 600 }}>Monitoring active</span>
            </div>
          </div>
        )}
      </div>

      {/* Property facts */}
      <div style={{ padding: "26px 24px 0" }}>
        <Sect label="Property record" action={<button style={{ background: "none", border: "none", fontFamily: T3.sans, fontSize: 12.5, fontWeight: 600, color: T3.indigo, cursor: "pointer" }}>Edit</button>} />
        <div style={{ background: "white", borderRadius: 16, border: `1px solid ${T3.border}`, padding: "4px 18px", boxShadow: T3.rest }}>
          {T3_PROPERTY.fields.slice(0, 6).map((f, i) => (
            <div key={f.k} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: i < 5 ? `1px solid ${T3.borderSubtle}` : "none" }}>
              <span style={{ fontFamily: T3.sans, fontSize: 13.5, color: T3.ink2 }}>{f.k}</span>
              <span style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink }}>{f.v}</span>
            </div>
          ))}
          <button style={{ width: "100%", background: "none", border: "none", padding: "12px 0 14px", fontFamily: T3.sans, fontSize: 13, fontWeight: 600, color: T3.indigo, cursor: "pointer" }}>
            Show all 12 fields
          </button>
        </div>
      </div>

      {/* Inventory */}
      <div style={{ padding: "26px 24px 0" }}>
        <Sect label="Your spaces" />
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {["Rooms", "Systems", "Appliances"].map(t => (
            <button key={t} onClick={() => setInvTab(t)} style={{ background: invTab === t ? T3.ink : "white", color: invTab === t ? "white" : T3.ink2, border: invTab === t ? "none" : `1px solid ${T3.border}`, padding: "8px 16px", borderRadius: 999, fontFamily: T3.sans, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{t}</button>
          ))}
        </div>

        {invTab === "Rooms" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {T3_ROOMS.map(r => {
              const pending = r.status === "pending";
              return (
                <button key={r.id} onClick={() => pending && go("scanCoach")} style={{ background: "white", border: `1px solid ${T3.border}`, borderRadius: 16, overflow: "hidden", padding: 0, textAlign: "left", cursor: "pointer", boxShadow: T3.rest, opacity: pending ? 0.75 : 1 }}>
                  {r.photo
                    ? <Img src={r.photo} h={84} />
                    : <div style={{ height: 84, background: T3.surface, display: "flex", alignItems: "center", justifyContent: "center" }}><I3 name="plus" size={20} color={T3.muted} /></div>}
                  <div style={{ padding: "10px 13px 13px" }}>
                    <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 700, color: T3.ink }}>{r.name}</div>
                    <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: pending ? T3.indigo : T3.muted, marginTop: 3, fontWeight: pending ? 600 : 400 }}>
                      {pending ? "Tap to scan · +8 pts" : `${r.items} items captured`}
                    </div>
                  </div>
                </button>
              );
            })}
            {/* add a room */}
            <button onClick={() => go("scanCoach")} style={{ background: T3.surface, border: `1.5px dashed ${T3.border}`, borderRadius: 16, minHeight: 148, padding: 0, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: "white", border: `1px solid ${T3.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I3 name="plus" size={17} color={T3.indigo} />
              </div>
              <span style={{ fontFamily: T3.sans, fontSize: 12.5, fontWeight: 600, color: T3.ink2 }}>Add a room</span>
            </button>
          </div>
        ) : invTab === "Systems" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {T3_SYSTEMS.map(s => (
              <div key={s.id} style={{ background: "white", border: `1px solid ${T3.border}`, borderRadius: 14, padding: "13px 15px", display: "flex", alignItems: "center", gap: 13, boxShadow: T3.rest }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: T3.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <I3 name={s.icon} size={17} color={s.status === "action" ? T3.amber : T3.indigo} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 600, color: T3.ink }}>{s.name}</div>
                  <div style={{ fontFamily: T3.sans, fontSize: 12, color: s.status === "action" ? T3.amberInk : T3.muted, marginTop: 1 }}>{s.sub}</div>
                </div>
                {s.status === "action" && <span style={{ width: 8, height: 8, borderRadius: 4, background: T3.amber }} />}
                <I3 name="chevR" size={16} color={T3.muted} />
              </div>
            ))}
            <button onClick={() => go("capture")} style={{ background: T3.surface, border: `1.5px dashed ${T3.border}`, borderRadius: 14, padding: "14px 15px", display: "flex", alignItems: "center", gap: 13, cursor: "pointer" }}>
              <div style={{ width: 38, height: 38, borderRadius: 19, background: "white", border: `1px solid ${T3.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I3 name="plus" size={17} color={T3.indigo} />
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2 }}>Add a system</div>
                <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted, marginTop: 1 }}>Pool, sprinklers, solar, generator…</div>
              </div>
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {T3_APPLIANCES.map(a => {
              const pending = a.status === "pending";
              return (
                <div key={a.id} onClick={() => pending && go("capture")} style={{ background: "white", border: `1px solid ${T3.border}`, borderRadius: 14, padding: "13px 15px", display: "flex", alignItems: "center", gap: 13, boxShadow: T3.rest, opacity: pending ? 0.72 : 1, cursor: pending ? "pointer" : "default" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: T3.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <I3 name={a.icon} size={17} color={pending ? T3.muted : T3.indigo} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 600, color: T3.ink }}>{a.name}</div>
                    <div style={{ fontFamily: T3.sans, fontSize: 12, color: pending ? T3.indigo : T3.muted, marginTop: 1, fontWeight: pending ? 600 : 400 }}>{pending ? "Tap to capture · photo the nameplate" : a.sub}</div>
                  </div>
                  <I3 name="chevR" size={16} color={T3.muted} />
                </div>
              );
            })}
            <button onClick={() => go("capture")} style={{ background: T3.surface, border: `1.5px dashed ${T3.border}`, borderRadius: 14, padding: "14px 15px", display: "flex", alignItems: "center", gap: 13, cursor: "pointer" }}>
              <div style={{ width: 38, height: 38, borderRadius: 19, background: "white", border: `1px solid ${T3.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I3 name="plus" size={17} color={T3.indigo} />
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2 }}>Add an appliance</div>
                <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted, marginTop: 1 }}>Snap the nameplate — AI logs make, model & warranty</div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Scan history */}
      <div style={{ padding: "26px 24px 0" }}>
        <Sect label="Scan history" />
        <div style={{ background: "white", borderRadius: 16, border: `1px solid ${T3.border}`, padding: "16px 18px 6px", boxShadow: T3.rest }}>
          {T3_SCANS.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 13 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 9, height: 9, borderRadius: 5, background: s.new ? T3.indigo : T3.border, marginTop: 5, flexShrink: 0 }} />
                {i < T3_SCANS.length - 1 && <div style={{ width: 1.5, flex: 1, background: T3.borderSubtle, margin: "3px 0" }} />}
              </div>
              <div style={{ paddingBottom: 16 }}>
                <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>{s.date}</div>
                <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 600, color: T3.ink, marginTop: 1 }}>{s.label}</div>
                <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: s.new ? T3.amberInk : T3.ink2 }}>{s.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filing cabinet + report */}
      <div style={{ padding: "20px 24px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        <button onClick={() => go("docCabinet")} style={{ width: "100%", background: "white", border: `1px solid ${T3.border}`, borderRadius: 16, padding: "15px 18px", display: "flex", alignItems: "center", gap: 13, cursor: "pointer", boxShadow: T3.rest }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "#EAFAF3", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I3 name="archive" size={17} color="#066E4C" />
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 600, color: T3.ink }}>Filing cabinet</div>
            <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted }}>35 documents · warranties, utilities, closing</div>
          </div>
          <I3 name="chevR" size={16} color={T3.muted} />
        </button>
        <button style={{ width: "100%", background: "white", border: `1px solid ${T3.border}`, borderRadius: 16, padding: "15px 18px", display: "flex", alignItems: "center", gap: 13, cursor: "pointer", boxShadow: T3.rest }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: T3.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I3 name="download" size={17} color={T3.indigo} />
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 600, color: T3.ink }}>Home Health Report</div>
            <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted }}>Free PDF — share with anyone</div>
          </div>
          <I3 name="chevR" size={16} color={T3.muted} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Home dashboard — returning homeowner
// ─────────────────────────────────────────────────────────────
function W3Home({ go, state, onSwitchHome }) {
  const open = state.requests.length;
  const req = state.requests[0];
  const STRIP = {
    matching: ["Matching", "We're finding your pros — usually under an hour"],
    quotes:   ["3 quotes ready", "Compare prices and pick your pro"],
    booked:   ["Booked", req && req.slot ? `${req.pro ? req.pro.name : ""} · ${req.slot}` : "Scheduled"],
    done:     ["Work complete", "Review and release payment"],
    paid:     ["Paid", "Rate the job when you have a sec"],
    rated:    ["Job closed", "Receipt saved to your filing cabinet"],
  };
  const strip = req ? (STRIP[req.status] || STRIP.matching) : null;
  return (
    <div data-screen-label="Home" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.surface, overflowY: "auto", paddingBottom: 130 }}>
      {/* Greeting */}
      <div style={{ padding: "60px 24px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: T3.sans, fontSize: 13, color: T3.muted, fontWeight: 500 }}>Thursday, July 3</div>
          <h1 style={{ fontFamily: T3.sans, fontSize: 25, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "2px 0 0" }}>Morning, Sarah.</h1>
          <button onClick={onSwitchHome} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, marginTop: 5, cursor: "pointer" }}>
            <span style={{ fontFamily: T3.sans, fontSize: 12.5, fontWeight: 600, color: T3.indigo }}>{T3_PROPERTY.address}</span>
            <I3 name="chevD" size={13} color={T3.indigo} />
            <span style={{ fontFamily: T3.sans, fontSize: 11, color: T3.muted }}>2 properties</span>
          </button>
        </div>
        <button onClick={() => go("profile")} style={{ width: 40, height: 40, borderRadius: 20, background: T3.ink, color: "white", border: "none", fontFamily: T3.sans, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>S</button>
      </div>

      {/* Home card */}
      <div style={{ padding: "0 24px" }}>
        <button onClick={() => go("vault")} style={{ width: "100%", background: "white", border: `1px solid ${T3.border}`, borderRadius: 20, overflow: "hidden", padding: 0, textAlign: "left", cursor: "pointer", boxShadow: T3.rest, display: "block" }}>
          <Img src={T3_PHOTOS.heroExterior} h={130} dim={0.08} />
          <div style={{ padding: "14px 18px 16px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T3.sans, fontSize: 15.5, fontWeight: 700, color: T3.ink, letterSpacing: "-0.01em" }}>{T3_PROPERTY.address}</div>
              <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.muted, marginTop: 2 }}>{T3_PROPERTY.cityState}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, background: T3.tint, borderRadius: 999, padding: "4px 11px" }}>
                <span style={{ fontFamily: T3.sans, fontSize: 11.5, fontWeight: 700, color: T3.indigo }}>Open the Vault</span>
                <I3 name="arrowR" size={12} color={T3.indigo} />
              </div>
            </div>
            <div style={{ position: "relative", width: 86, height: 86, flexShrink: 0 }}>
              <HealthScoreRing score={state.score} size={86} stroke={7} animate={false} label={false} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                <span style={{ fontFamily: T3.sans, fontSize: 23, fontWeight: 800, color: T3.ink, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{state.score}</span>
                <span style={{ fontFamily: T3.sans, fontSize: 8.5, color: T3.muted, fontWeight: 700, letterSpacing: 0.6, marginTop: 2 }}>SCORE</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Open request strip */}
      {open > 0 && (
        <div style={{ padding: "14px 24px 0" }}>
          <button onClick={() => go("tracking")} style={{ width: "100%", background: T3.ink, borderRadius: 16, padding: "15px 18px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 13, textAlign: "left" }}>
            <span className="t3-ping" style={{ width: 8, height: 8, borderRadius: 4, background: "#8B85F2", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 700, color: "white" }}>{req.trade} request · {strip[0]}</div>
              <div style={{ fontFamily: T3.sans, fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>
                {strip[1]}
              </div>
            </div>
            <I3 name="chevR" size={16} color="rgba(255,255,255,0.6)" />
          </button>
        </div>
      )}

      {/* Emergency button */}
      <div style={{ padding: "12px 24px 0" }}>
        <button onClick={() => go("emergency")} style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          background: T3.red, border: "none", borderRadius: 16, padding: "17px 20px", cursor: "pointer",
          boxShadow: "0 10px 28px rgba(220,38,38,0.32)",
        }}>
          <I3 name="zap" size={20} color="white" strokeWidth={2} />
          <span style={{ fontFamily: T3.sans, fontSize: 16, fontWeight: 800, color: "white", letterSpacing: "-0.01em" }}>Emergency Services</span>
        </button>
        <div style={{ textAlign: "center", marginTop: 7 }}>
          <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>Burst pipe · no heat · gas smell — a pro dispatched in minutes</span>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: "16px 24px 0", display: "flex", gap: 12 }}>
        <button onClick={() => go("scanCoach")} style={{ flex: 1, background: "white", border: `1px solid ${T3.border}`, borderRadius: 16, padding: "16px 15px", cursor: "pointer", textAlign: "left", boxShadow: T3.rest }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: T3.tint, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <I3 name="camera" size={17} color={T3.indigo} />
          </div>
          <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 700, color: T3.ink }}>Scan a space</div>
          <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted, marginTop: 2 }}>1 room left · +8 pts</div>
        </button>
        <button onClick={() => go("request")} style={{ flex: 1, background: "white", border: `1px solid ${T3.border}`, borderRadius: 16, padding: "16px 15px", cursor: "pointer", textAlign: "left", boxShadow: T3.rest }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: T3.tint, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <I3 name="wrench" size={17} color={T3.indigo} />
          </div>
          <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 700, color: T3.ink }}>Request service</div>
          <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted, marginTop: 2 }}>Matched, not searched</div>
        </button>
      </div>

      {/* Needs attention preview */}
      <div style={{ padding: "26px 24px 0" }}>
        <Sect label="Needs attention" action={<button onClick={() => go("vault")} style={{ background: "none", border: "none", fontFamily: T3.sans, fontSize: 12.5, fontWeight: 600, color: T3.indigo, cursor: "pointer" }}>View all</button>} />
        <FindingCard finding={T3_FINDINGS[0]} requested={state.requests.some(r => r.findingId === "f1")} onAction={() => go("request", { finding: T3_FINDINGS[0] })} />
      </div>

      {/* Feature directory — every feature, two taps max */}
      <div style={{ padding: "26px 24px 0" }}>
        <Sect label="Everything" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { icon: "wrench",  label: "All services",   to: "services" },
            { icon: "hammer",  label: "Big project",    to: "scoutRequest" },
            { icon: "scan3d",  label: "Document in 3D", to: "capture" },
            { icon: "wand",    label: "Reimagine & shop", to: "designRender" },
            { icon: "archive", label: "Filing cabinet", to: "docCabinet" },
            { icon: "clock",   label: "Care plan",      to: "plans" },
            { icon: "bell",    label: "Recall check",   to: "recall" },
            { icon: "gift",    label: "Refer & earn",   to: "referral" },
            { icon: "download",label: "Health report",  to: "vault" },
            { icon: "fileCheck",label: "Inspections",   to: "inspections" },
          ].map(f => (
            <button key={f.label} onClick={() => go(f.to)} style={{ background: "white", border: `1px solid ${T3.border}`, borderRadius: 14, padding: "13px 8px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, boxShadow: T3.rest }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: T3.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I3 name={f.icon} size={16} color={T3.indigo} strokeWidth={1.7} />
              </div>
              <span style={{ fontFamily: T3.sans, fontSize: 10.5, fontWeight: 600, color: T3.ink, textAlign: "center", lineHeight: 1.25 }}>{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shop this look teaser */}
      <div style={{ padding: "26px 24px 0" }}>
        <Sect label="Imagine it better" />
        <button onClick={() => go("shopLook")} style={{ width: "100%", position: "relative", height: 170, borderRadius: 20, overflow: "hidden", border: "none", padding: 0, cursor: "pointer", display: "block", boxShadow: T3.rest }}>
          <Img src={T3_PHOTOS.livingAfter} h="100%" dim={0.25} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,18,43,0.75), transparent 55%)" }} />
          <div style={{ position: "absolute", top: 14, left: 14, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.94)", borderRadius: 999, padding: "6px 12px" }}>
            <I3 name="sparkles" size={13} color={T3.indigo} />
            <span style={{ fontFamily: T3.sans, fontSize: 11.5, fontWeight: 700, color: T3.ink }}>AI render</span>
          </div>
          <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, textAlign: "left" }}>
            <div style={{ fontFamily: T3.sans, fontSize: 17, fontWeight: 800, color: "white", letterSpacing: "-0.02em", lineHeight: 1.25 }}>Your living room, restyled</div>
            <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: "rgba(255,255,255,0.8)", marginTop: 3 }}>See it · shop the pieces · view in AR</div>
          </div>
        </button>
      </div>

      {/* Recent activity */}
      <div style={{ padding: "26px 24px 0" }}>
        <Sect label="Recent activity" />
        <div style={{ background: "white", borderRadius: 16, border: `1px solid ${T3.border}`, padding: "4px 18px", boxShadow: T3.rest }}>
          {[
            { text: "Exterior scan — 1 issue found", time: "Today" },
            { text: "Kitchen documented, 3 appliances", time: "Mar 18" },
            { text: "Property records imported", time: "Mar 12" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: i < 2 ? `1px solid ${T3.borderSubtle}` : "none" }}>
              <span style={{ fontFamily: T3.sans, fontSize: 13.5, color: T3.ink }}>{a.text}</span>
              <span style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Profile — light account screen
// ─────────────────────────────────────────────────────────────
function W3Profile({ go, state }) {
  const rows = [
    { icon: "home", title: "Property details", sub: T3_PROPERTY.address },
    { icon: "grid", title: "My properties", sub: "2 homes · add a rental" },
    { icon: "clock", title: "TrustyPro Care plan", sub: "Seasonal checkups · from $19/mo", goTo: "plans" },
    { icon: "receipt", title: "Invoices & receipts", sub: "HVAC · $177 · Jul 3" },
    { icon: "gift", title: "Refer a neighbor", sub: "Give $25, get $25", goTo: "referral" },
    { icon: "download", title: "Home Health Report", sub: "Free PDF" },
    { icon: "bell", title: "Notifications", sub: "Push · email · SMS preferences", goTo: "notifPrefs" },
    { icon: "settings", title: "Privacy & data", sub: "Your data stays yours" },
  ];
  return (
    <div data-screen-label="Profile" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.surface, overflowY: "auto", paddingBottom: 130 }}>
      <div style={{ background: "white", padding: "60px 24px 22px", borderBottom: `1px solid ${T3.borderSubtle}`, display: "flex", alignItems: "center", gap: 15 }}>
        <div style={{ width: 58, height: 58, borderRadius: 29, background: T3.ink, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T3.sans, fontSize: 20, fontWeight: 800 }}>S</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T3.sans, fontSize: 20, fontWeight: 800, color: T3.ink, letterSpacing: "-0.02em" }}>Sarah Mitchell</div>
          <div style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink2, marginTop: 2 }}>{T3_PROPERTY.address}, Frisco</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: T3.sans, fontSize: 21, fontWeight: 800, color: T3.indigo, fontVariantNumeric: "tabular-nums" }}>{state.score}</div>
          <div style={{ fontFamily: T3.sans, fontSize: 9.5, color: T3.muted, fontWeight: 700, letterSpacing: 0.6 }}>SCORE</div>
        </div>
      </div>

      <div style={{ padding: "18px 16px 0" }}>
        <div style={{ background: "white", borderRadius: 18, border: `1px solid ${T3.border}`, overflow: "hidden", boxShadow: T3.rest }}>
          {rows.map((r, i) => (
            <button key={r.title} onClick={() => r.goTo && go(r.goTo)} style={{ width: "100%", background: "none", border: "none", padding: "15px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left", borderBottom: i < rows.length - 1 ? `1px solid ${T3.borderSubtle}` : "none" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: T3.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I3 name={r.icon} size={16} color={T3.ink} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 600, color: T3.ink }}>{r.title}</div>
                <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted, marginTop: 1 }}>{r.sub}</div>
              </div>
              <I3 name="chevR" size={16} color={T3.muted} />
            </button>
          ))}
        </div>
        <div style={{ textAlign: "center", padding: "22px 0" }}>
          <TrustyLockup height={22} style={{ margin: "0 auto" }} />
          <div style={{ fontFamily: T3.mono, fontSize: 11, color: T3.muted, marginTop: 8 }}>Free for homeowners, always</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { W3Vault, W3Home, W3Profile });
