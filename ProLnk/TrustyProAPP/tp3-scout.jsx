// TrustyPro v3 — Scout flow (homeowner side)
// Big multi-trade projects: one Scout, one quote, one point of contact.

const SCOUT_PROJECTS = [
  { id: "kitchen",  icon: "utensils", label: "Kitchen remodel" },
  { id: "bath",     icon: "bath",     label: "Bathroom remodel" },
  { id: "wholehome",icon: "home",     label: "Whole-home refresh" },
  { id: "outdoor",  icon: "leaf",     label: "Outdoor living" },
  { id: "addition", icon: "plus",     label: "Addition / conversion" },
  { id: "other",    icon: "hammer",   label: "Something big" },
];

const SCOUT_PIECES = [
  { trade: "Demo & haul-off",   price: 3200,  status: "claimed", pro: "R&B Demolition",   week: "Week 1" },
  { trade: "Plumbing rough-in", price: 8600,  status: "claimed", pro: "BlueLine Plumbing", week: "Week 1–2" },
  { trade: "Electrical",        price: 7400,  status: "claimed", pro: "Hartz Electric",    week: "Week 2" },
  { trade: "Cabinets & install",price: 15200, status: "open",    pro: null,                week: "Week 3–4" },
  { trade: "Flooring & tile",   price: 9800,  status: "open",    pro: null,                week: "Week 4" },
  { trade: "Paint & finish",    price: 4300,  status: "open",    pro: null,                week: "Week 5" },
];
const sm = n => "$" + n.toLocaleString();

// ─────────────────────────────────────────────────────────────
// 1 · Big project request — routes to a Scout
// ─────────────────────────────────────────────────────────────
function W3ScoutRequest({ go }) {
  const [picked, setPicked] = React.useState(null);
  const [notes, setNotes] = React.useState("");
  const [step, setStep] = React.useState(0); // 0 pick, 1 explain+schedule
  const sel = SCOUT_PROJECTS.find(p => p.id === picked);

  return (
    <div data-screen-label="Big project" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "54px 22px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <BackBtn onClick={() => step === 0 ? go("home") : setStep(0)} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Big project</span>
      </div>

      {step === 0 && (
        <div className="t3-in">
          <h1 style={{ fontFamily: T3.sans, fontSize: 25, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 6px", lineHeight: 1.12 }}>Dreaming bigger than<br/>one repair?</h1>
          <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 18px" }}>
            Remodels and renovations need several trades. You get <b style={{ color: T3.ink }}>one person</b> who scopes it, prices it, and runs the whole thing.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {SCOUT_PROJECTS.map(p => {
              const on = picked === p.id;
              return (
                <button key={p.id} onClick={() => setPicked(p.id)} style={{ background: on ? T3.ink : "white", border: `1.5px solid ${on ? T3.ink : T3.border}`, borderRadius: 15, padding: "16px 14px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 10, boxShadow: T3.rest, transition: "all 150ms" }}>
                  <I3 name={p.icon} size={20} color={on ? "white" : T3.indigo} strokeWidth={1.6} />
                  <span style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 700, color: on ? "white" : T3.ink, lineHeight: 1.25 }}>{p.label}</span>
                </button>
              );
            })}
          </div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Tell us about it — 'gut the kitchen, new cabinets, open up the wall to the dining room…'" rows={3}
            style={{ width: "100%", border: `1.5px solid ${T3.border}`, borderRadius: 14, padding: 15, fontFamily: T3.sans, fontSize: 14, color: T3.ink, resize: "none", outline: "none", lineHeight: 1.5, marginBottom: 18, boxSizing: "border-box" }} />
          <Btn style={{ opacity: picked ? 1 : 0.45 }} onClick={() => picked && setStep(1)}>Continue <I3 name="arrowR" size={18} color="white" /></Btn>
        </div>
      )}

      {step === 1 && (
        <div className="t3-in">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: T3.tint, borderRadius: 999, padding: "6px 14px", marginBottom: 14 }}>
            <I3 name={sel.icon} size={13} color={T3.indigo} />
            <span style={{ fontFamily: T3.sans, fontSize: 12, fontWeight: 700, color: T3.indigo }}>{sel.label} · multi-trade</span>
          </div>
          <h1 style={{ fontFamily: T3.sans, fontSize: 25, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 6px", lineHeight: 1.12 }}>This one gets a Scout.</h1>
          <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 18px" }}>
            A Scout is a seasoned generalist — they walk your whole project once, then handle everything.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {[
              { icon: "search",  t: "One visit, full scope", d: "They walk the project, measure, photograph — and document your whole home while they're there. Your Home Score goes up." },
              { icon: "receipt", t: "One quote, everything in", d: "Every trade, every material allowance, one number. No juggling six bids." },
              { icon: "user",    t: "One person, start to finish", d: "Your Scout books vetted pros for each piece, runs the schedule, and answers for the result." },
            ].map((b, i) => (
              <div key={b.t} style={{ display: "flex", gap: 13, background: T3.surface, borderRadius: 14, padding: "14px 15px" }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: "white", border: `1px solid ${T3.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I3 name={b.icon} size={16} color={T3.indigo} />
                </div>
                <div>
                  <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 700, color: T3.ink }}>{b.t}</div>
                  <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, lineHeight: 1.5, marginTop: 2 }}>{b.d}</div>
                </div>
              </div>
            ))}
          </div>

          <Sect label="Pick a visit time" />
          <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
            {["Thu 10", "Fri 11", "Sat 12", "Mon 14"].map((d, i) => (
              <button key={d} style={{ flex: 1, minWidth: 70, background: i === 1 ? T3.indigo : "white", color: i === 1 ? "white" : T3.ink2, border: `1.5px solid ${i === 1 ? T3.indigo : T3.border}`, borderRadius: 12, padding: "11px 8px", fontFamily: T3.sans, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
                Jul {d.split(" ")[1]}<br/><span style={{ fontWeight: 500, fontSize: 11 }}>{d.split(" ")[0]} · 9–11a</span>
              </button>
            ))}
          </div>

          <Btn onClick={() => go("scoutQuote")}>Book my Scout visit — free <I3 name="arrowR" size={18} color="white" /></Btn>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
            <I3 name="shieldCheck" size={13} color={T3.green} />
            <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>The visit and quote cost nothing — pay only if you go ahead</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2 · Scout quote — one number, trade breakdown, walkthrough bonus
// ─────────────────────────────────────────────────────────────
function W3ScoutQuote({ go }) {
  const total = SCOUT_PIECES.reduce((n, p) => n + p.price, 0);
  const [open, setOpen] = React.useState(false);
  return (
    <div data-screen-label="Scout quote" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "54px 22px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <BackBtn onClick={() => go("scoutRequest")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Your project quote</span>
        <span style={{ marginLeft: "auto", fontFamily: T3.mono, fontSize: 11, color: T3.muted }}>#SP-1107</span>
      </div>

      {/* Scout card */}
      <div style={{ display: "flex", alignItems: "center", gap: 13, background: T3.surface, borderRadius: 16, padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ width: 46, height: 46, borderRadius: 23, background: T3.ink, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T3.sans, fontSize: 14, fontWeight: 800, flexShrink: 0 }}>DW</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T3.sans, fontSize: 14.5, fontWeight: 800, color: T3.ink }}>Dale Whitfield · your Scout</div>
          <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.ink2, marginTop: 1 }}>28 yrs in residential construction · 61 projects run</div>
        </div>
        <button onClick={() => {}} style={{ width: 38, height: 38, borderRadius: 19, background: "white", border: `1px solid ${T3.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <I3 name="message" size={16} color={T3.indigo} />
        </button>
      </div>

      {/* Walkthrough bonus */}
      <div style={{ display: "flex", gap: 11, background: T3.greenBg, border: `1px solid ${T3.greenBd}`, borderRadius: 13, padding: "12px 15px", marginBottom: 20 }}>
        <I3 name="sparkles" size={16} color={T3.green} style={{ flexShrink: 0, marginTop: 1 }} />
        <span style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.greenInk, lineHeight: 1.5 }}><b>Bonus from Dale's walkthrough:</b> 14 items documented across your home · Home Score +6</span>
      </div>

      {/* The one number */}
      <div style={{ background: T3.ink, borderRadius: 20, padding: "22px 22px 18px", marginBottom: 16 }}>
        <div style={{ fontFamily: T3.sans, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Kitchen remodel · everything in</div>
        <div style={{ fontFamily: T3.sans, fontSize: 42, fontWeight: 800, color: "white", letterSpacing: "-0.04em", margin: "8px 0 2px", fontVariantNumeric: "tabular-nums" }}>{sm(total)}</div>
        <div style={{ fontFamily: T3.sans, fontSize: 12.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>One quote, one schedule, one accountable person. Fixed unless you change the scope.</div>
        <button onClick={() => setOpen(o => !o)} style={{ marginTop: 14, width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 11, padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: T3.sans, fontSize: 12.5, fontWeight: 700, color: "white" }}>What's inside — {SCOUT_PIECES.length} trade pieces</span>
          <I3 name="chevD" size={14} color="white" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms" }} />
        </button>
        {open && (
          <div className="t3-in" style={{ marginTop: 10 }}>
            {SCOUT_PIECES.map((p, i) => (
              <div key={p.trade} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 2px", borderBottom: i < SCOUT_PIECES.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <div>
                  <div style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 600, color: "white" }}>{p.trade}</div>
                  <div style={{ fontFamily: T3.sans, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{p.week}</div>
                </div>
                <span style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 700, color: "white", fontVariantNumeric: "tabular-nums" }}>{sm(p.price)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 11, background: T3.tint, border: `1px solid ${T3.tintBorder}`, borderRadius: 13, padding: "12px 15px", marginBottom: 20 }}>
        <I3 name="user" size={16} color={T3.indigo} style={{ flexShrink: 0, marginTop: 1 }} />
        <span style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, lineHeight: 1.5 }}><b style={{ color: T3.ink }}>You never coordinate a crew.</b> Dale books each vetted pro, runs the schedule, and stays your only contact — all in the app.</span>
      </div>

      <Btn onClick={() => go("scoutProject")}>Accept quote — start my project</Btn>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
        <I3 name="shield" size={12} color={T3.muted} />
        <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>Pay per milestone on trustypro.io — never all up front</span>
      </div>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button onClick={() => go("home")} style={{ background: "none", border: "none", fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2, cursor: "pointer" }}>I need to think about it</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3 · Project tracking — crews claim pieces, one schedule, one contact
// ─────────────────────────────────────────────────────────────
function W3ScoutProject({ go }) {
  const [pieces, setPieces] = React.useState(SCOUT_PIECES);
  // simulate a piece being claimed live
  React.useEffect(() => {
    const t = setTimeout(() => {
      setPieces(ps => ps.map(p => p.trade === "Cabinets & install" ? { ...p, status: "claimed", pro: "Maple & Grain Cabinetry", justNow: true } : p));
    }, 3200);
    return () => clearTimeout(t);
  }, []);
  const claimed = pieces.filter(p => p.status === "claimed").length;

  return (
    <div data-screen-label="Scout project" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.surface, overflowY: "auto", paddingBottom: 40 }}>
      <div style={{ background: "white", padding: "54px 22px 20px", borderBottom: `1px solid ${T3.borderSubtle}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <BackBtn onClick={() => go("home")} />
          <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Kitchen remodel</span>
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, background: T3.greenBg, border: `1px solid ${T3.greenBd}`, borderRadius: 999, padding: "5px 12px" }}>
            <span className="t3-ping" style={{ width: 7, height: 7, borderRadius: 4, background: T3.green }} />
            <span style={{ fontFamily: T3.sans, fontSize: 11.5, fontWeight: 700, color: T3.greenInk }}>Active</span>
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink2 }}>Crew assembly</span>
          <span style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 700, color: T3.ink, fontVariantNumeric: "tabular-nums" }}>{claimed} of {pieces.length} trades booked</span>
        </div>
        <div style={{ height: 6, background: T3.surface2, borderRadius: 3, overflow: "hidden", marginBottom: 18 }}>
          <div style={{ height: 6, width: `${(claimed / pieces.length) * 100}%`, background: T3.indigo, borderRadius: 3, transition: "width 600ms cubic-bezier(0.2,0.7,0.3,1)" }} />
        </div>

        {/* Scout contact */}
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: T3.ink, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T3.sans, fontSize: 13, fontWeight: 800, flexShrink: 0 }}>DW</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 700, color: T3.ink }}>Dale Whitfield · your Scout</div>
            <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>Your only contact — questions, changes, anything</div>
          </div>
          <Btn size="sm" full={false}><I3 name="message" size={14} color="white" /> Message</Btn>
        </div>
      </div>

      {/* Pieces */}
      <div style={{ padding: "20px 22px 0" }}>
        <Sect label="The crew" action={<span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted, fontWeight: 500 }}>Dale's price, no bidding</span>} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {pieces.map(p => (
            <div key={p.trade} className={p.justNow ? "t3-in" : ""} style={{ background: "white", border: `1.5px solid ${p.justNow ? T3.green : T3.border}`, borderRadius: 15, padding: "13px 15px", display: "flex", alignItems: "center", gap: 13, boxShadow: T3.rest, transition: "border-color 400ms" }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: p.status === "claimed" ? T3.greenBg : T3.surface, border: `1px solid ${p.status === "claimed" ? T3.greenBd : T3.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {p.status === "claimed" ? <I3 name="check" size={15} color={T3.green} strokeWidth={2.4} /> : <span className="t3-ping" style={{ width: 8, height: 8, borderRadius: 4, background: T3.muted }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 700, color: T3.ink }}>{p.trade}</div>
                <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: p.status === "claimed" ? T3.greenInk : T3.muted, marginTop: 1 }}>
                  {p.status === "claimed" ? `${p.pro}${p.justNow ? " · just claimed" : ""}` : "Posting to vetted pros…"}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 800, color: T3.ink, fontVariantNumeric: "tabular-nums" }}>{sm(p.price)}</div>
                <div style={{ fontFamily: T3.sans, fontSize: 10.5, color: T3.muted }}>{p.week}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 11, background: T3.tint, border: `1px solid ${T3.tintBorder}`, borderRadius: 13, padding: "12px 15px", margin: "18px 0 0" }}>
          <I3 name="sparkles" size={16} color={T3.indigo} style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.ink2, lineHeight: 1.5 }}>Each finished piece is photographed and filed to your <b style={{ color: T3.ink }}>Vault</b> automatically — warranty, invoice, and who did the work.</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { W3ScoutRequest, W3ScoutQuote, W3ScoutProject, SCOUT_PROJECTS, SCOUT_PIECES });
