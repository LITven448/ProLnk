// TrustyPro v3 — Filing Cabinet: scan documents, AI classifies + files them.
// The junk drawer, retired.

// ===== data =======================================================
const DOC_FOLDERS = [
  { id: "warranty", icon: "fileCheck", name: "Warranties", count: 6, tint: "#EAFAF3", ink: "#066E4C" },
  { id: "manuals",  icon: "bookOpen",  name: "Manuals",    count: 9, tint: "#EEF0FE", ink: "#4F46E5" },
  { id: "utilities",icon: "zap",       name: "Utilities & providers", count: 5, tint: "#FEF5E7", ink: "#92400E" },
  { id: "closing",  icon: "key",       name: "Closing & title", count: 4, tint: "#F2EAFE", ink: "#6D28D9" },
  { id: "insurance",icon: "shield",    name: "Insurance",  count: 3, tint: "#FCEEE8", ink: "#9A3412" },
  { id: "inspections", icon: "search", name: "Home inspections", count: 2, tint: "#EEF0FE", ink: "#4F46E5" },
  { id: "pros",     icon: "wrench",    name: "Past pros & work", count: 7, tint: "#F2EAFE", ink: "#6D28D9" },
  { id: "receipts", icon: "receipt",   name: "Receipts & service", count: 8, tint: "#F6F6FB", ink: "#4D4A6A" },
];

const DOC_RECENT = [
  { icon: "search",    name: "2019 home inspection · 1234 Main St", folder: "Home inspections", meta: "48 pages · auto-filled your Vault", ai: true },
  { icon: "wrench",    name: "Comfort Climate Co. — HVAC job", folder: "Past pros", meta: "Jul 3 · $177 · photos + invoice + warranty on labor", ai: true },
  { icon: "fileCheck", name: "LG refrigerator warranty", folder: "Warranties", meta: "Expires Mar 2027 · auto-reminder set", ai: true },
  { icon: "zap",       name: "Oncor — electricity", folder: "Utilities", meta: "Acct #4821-A · provider saved", ai: true },
  { icon: "wifi",      name: "AT&T Fiber — internet", folder: "Utilities", meta: "1GB plan · $80/mo · support #", ai: true },
  { icon: "key",       name: "Closing disclosure", folder: "Closing & title", meta: "Aug 2019 · 42 pages", ai: false },
  { icon: "receipt",   name: "HVAC service receipt", folder: "Receipts", meta: "Feb 2026 · $185 · logged to HVAC", ai: true },
];

// bookOpen icon lives in v2 set only — add lightweight fallback
const DOC_ICON_FALLBACK = { bookOpen: "file" };
const docIcon = (n) => (I3 && n === "bookOpen") ? "file" : n;

// ===== Filing Cabinet =============================================
function W3DocCabinet({ go, justFiled }) {
  return (
    <div data-screen-label="Filing cabinet" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.surface, overflowY: "auto", padding: "54px 22px 120px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <BackBtn onClick={() => go("vault")} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Filing cabinet</span>
        <button onClick={() => go("docSnap")} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, background: T3.ink, color: "white", border: "none", borderRadius: 999, padding: "9px 15px", fontFamily: T3.sans, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
          <I3 name="camera" size={14} color="white" /> Scan a doc
        </button>
      </div>

      <h1 style={{ fontFamily: T3.sans, fontSize: 26, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 6px", lineHeight: 1.12 }}>
        Every document,<br/>out of the junk drawer.
      </h1>
      <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 20px" }}>
        Scan anything — AI reads it, names it, files it, and sets reminders for expirations and renewals.
      </p>

      {justFiled && (
        <div className="t3-in" style={{ display: "flex", alignItems: "center", gap: 10, background: T3.greenBg, border: `1px solid ${T3.greenBd}`, borderRadius: 14, padding: "12px 15px", marginBottom: 18 }}>
          <I3 name="checkC" size={17} color={T3.green} />
          <span style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 600, color: T3.greenInk }}>Filed: LG refrigerator warranty → Warranties</span>
        </div>
      )}

      {/* search */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "white", border: `1px solid ${T3.border}`, borderRadius: 14, padding: "0 15px", height: 48, marginBottom: 20 }}>
        <I3 name="search" size={17} color={T3.muted} />
        <input placeholder='Try "fridge warranty" or "wifi password"' style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: T3.sans, fontSize: 13.5, color: T3.ink }} />
        <I3 name="sparkles" size={15} color={T3.indigo} />
      </div>

      {/* folders */}
      <Sect label="Folders" action={<span style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted, fontWeight: 500 }}>AI-organized</span>} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginBottom: 24 }}>
        {DOC_FOLDERS.map(f => (
          <button key={f.id} style={{ background: "white", border: `1px solid ${T3.border}`, borderRadius: 16, padding: "14px 15px", cursor: "pointer", textAlign: "left", boxShadow: T3.rest }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: f.tint, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <I3 name={docIcon(f.icon)} size={17} color={f.ink} />
            </div>
            <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 700, color: T3.ink, lineHeight: 1.2 }}>{f.name}</div>
            <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted, marginTop: 3 }}>{f.count} documents</div>
          </button>
        ))}
      </div>

      {/* recent */}
      <Sect label="Recently filed" />
      <div style={{ background: "white", borderRadius: 16, border: `1px solid ${T3.border}`, padding: "4px 16px", boxShadow: T3.rest }}>
        {DOC_RECENT.map((d, i) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < DOC_RECENT.length - 1 ? `1px solid ${T3.borderSubtle}` : "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: T3.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <I3 name={docIcon(d.icon)} size={16} color={T3.indigo} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink }}>{d.name}</div>
              <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted, marginTop: 1 }}>{d.folder} · {d.meta}</div>
            </div>
            {d.ai && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: T3.tint, borderRadius: 999, padding: "3px 9px", flexShrink: 0 }}>
                <I3 name="sparkles" size={10} color={T3.indigo} />
                <span style={{ fontFamily: T3.sans, fontSize: 9.5, fontWeight: 700, color: T3.indigo }}>AI</span>
              </span>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 18 }}>
        <I3 name="shield" size={13} color={T3.muted} />
        <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>Encrypted · transfers with the home when you sell</span>
      </div>
    </div>
  );
}

// ===== Scan → AI classify =========================================
function W3DocClassify({ go }) {
  const stages = ["Reading the document…", "Found: warranty · LG Electronics", "Extracting dates & coverage…", "Filing under Warranties…"];
  const [stage, setStage] = React.useState(0);
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setStage(s => {
      if (s >= stages.length - 1) { clearInterval(t); setTimeout(() => setDone(true), 650); return s; }
      return s + 1;
    }), 800);
    return () => clearInterval(t);
  }, []);

  if (!done) return (
    <div style={{ position: "absolute", inset: 0, background: T3.ink, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      {/* faux document */}
      <div style={{ position: "relative", width: 210, height: 270, borderRadius: 14, background: "white", marginBottom: 28, padding: 20, overflow: "hidden" }}>
        <div style={{ height: 12, width: "60%", background: "#DBDBE8", borderRadius: 3, marginBottom: 14 }} />
        {[90, 75, 85, 60, 80, 70, 88, 55].map((w, i) => (
          <div key={i} style={{ height: 7, width: `${w}%`, background: "#EEEEF5", borderRadius: 3, marginBottom: 9 }} />
        ))}
        <div className="w3-scanline" style={{ position: "absolute", left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #0E9F8E, transparent)", boxShadow: "0 0 16px #0E9F8E" }} />
      </div>
      <div style={{ fontFamily: T3.sans, fontSize: 18, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>Filing your document</div>
      <div key={stage} className="t3-in" style={{ fontFamily: T3.sans, fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 10, textAlign: "center" }}>{stages[stage]}</div>
      <style>{`@keyframes w3scan { 0%{top:8%} 100%{top:88%} } .w3-scanline { animation: w3scan 1.4s ease-in-out infinite alternate; }`}</style>
    </div>
  );

  return (
    <div data-screen-label="Doc filed" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "70px 26px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <div className="t3-in" style={{ width: 54, height: 54, borderRadius: 27, background: T3.greenBg, border: `1px solid ${T3.greenBd}`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
          <I3 name="fileCheck" size={25} color={T3.green} strokeWidth={1.8} />
        </div>
        <h1 style={{ fontFamily: T3.sans, fontSize: 26, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: 0 }}>Filed it for you.</h1>
        <p style={{ fontFamily: T3.sans, fontSize: 14.5, lineHeight: 1.55, color: T3.ink2, marginTop: 8, maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>
          AI read the document, pulled the details, and put it where you'll find it.
        </p>
      </div>

      {/* what AI extracted */}
      <div style={{ background: T3.surface, borderRadius: 18, padding: "18px 18px 8px", margin: "24px 0 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "#EAFAF3", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I3 name="fileCheck" size={17} color="#066E4C" />
          </div>
          <div>
            <div style={{ fontFamily: T3.sans, fontSize: 14.5, fontWeight: 700, color: T3.ink }}>LG refrigerator warranty</div>
            <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted }}>Filed under Warranties</div>
          </div>
        </div>
        {[
          ["Product", "LRMVS3006S — matched to your kitchen scan"],
          ["Coverage", "Parts & labor · 2 years, sealed system 5"],
          ["Expires", "Mar 12, 2027 — reminder set 30 days out"],
        ].map(([k, v], i) => (
          <div key={k} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: `1px solid ${T3.border}` }}>
            <span style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.muted, width: 74, flexShrink: 0, fontWeight: 600 }}>{k}</span>
            <span style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink, lineHeight: 1.45 }}>{v}</span>
          </div>
        ))}
      </div>

      <Btn onClick={() => go("docCabinet", { filed: true })}>See my filing cabinet <I3 name="arrowR" size={18} color="white" /></Btn>
      <div style={{ textAlign: "center", marginTop: 13 }}>
        <button onClick={() => go("docSnap")} style={{ background: "none", border: "none", fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2, cursor: "pointer" }}>Scan another document</button>
      </div>
    </div>
  );
}

Object.assign(window, { W3DocCabinet, W3DocClassify, DOC_FOLDERS, DOC_RECENT });
