// TrustyPro v2 — Service request, tracking, shop-this-look, proactive notification
// Matching is INVISIBLE to the homeowner: they request → they get matched. No pro browse.

// ─────────────────────────────────────────────────────────────
// Request Service — calm 3-step flow (trade → scope → confirm → success)
// ─────────────────────────────────────────────────────────────
function RequestService({ prefill, back, toTracking }) {
  const [step, setStep] = React.useState(prefill ? 1 : 0);
  const [trade, setTrade] = React.useState(prefill || null);
  const [scope, setScope] = React.useState(prefill ? `Following up on the AI scan finding — ${prefill} issue flagged in the report.` : "");

  const trades = [
    { label: "HVAC", icon: "thermometer" }, { label: "Plumbing", icon: "droplets" },
    { label: "Roofing", icon: "home" }, { label: "Electrical", icon: "zap" },
    { label: "Foundation", icon: "wrench" }, { label: "Appliances", icon: "fridge" },
    { label: "General repair", icon: "wrench" }, { label: "Something else", icon: "plus" },
  ];

  const Header = ({ title }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
      <button onClick={() => step === 0 ? back() : setStep(s => s - 1)} style={{ width: 40, height: 40, borderRadius: 20, background: TP.surface, border: `1px solid ${TP.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <Icon name="chevronLeft" size={20} color={TP.navy} />
      </button>
      <div style={{ fontFamily: TP.sans, fontSize: 15, fontWeight: 600, color: TP.navy }}>{title}</div>
      <div style={{ marginLeft: "auto", fontFamily: TP.mono, fontSize: 12, color: TP.muted }}>{step + 1} / 3</div>
    </div>
  );

  // Progress bar
  const Progress = () => (
    <div style={{ display: "flex", gap: 6, margin: "14px 0 22px" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? TP.blue : TP.border, transition: "background 240ms" }} />
      ))}
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "56px 24px 120px" }}>
      {step === 0 && (
        <React.Fragment>
          <Header title="Request a service" />
          <Progress />
          <h1 style={{ fontFamily: TP.serif, fontSize: 26, fontWeight: 700, color: TP.navy, letterSpacing: -0.6, margin: "0 0 8px", lineHeight: 1.15 }}>
            What do you need help with?
          </h1>
          <p style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text2, lineHeight: 1.5, marginBottom: 22 }}>
            Pick a category. We'll match you with a vetted, background-checked pro — no searching required.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {trades.map(t => {
              const on = trade === t.label;
              return (
                <button key={t.label} onClick={() => { setTrade(t.label); setTimeout(() => setStep(1), 160); }} style={{
                  background: on ? TP.navy : "white", border: `1px solid ${on ? TP.navy : TP.border}`, borderRadius: 14,
                  padding: "18px 14px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 12,
                  boxShadow: TP.cardRest, transition: "all 160ms",
                }}>
                  <Icon name={t.icon} size={22} color={on ? "white" : TP.blue} strokeWidth={1.6} />
                  <span style={{ fontFamily: TP.sans, fontSize: 14, fontWeight: 600, color: on ? "white" : TP.navy }}>{t.label}</span>
                </button>
              );
            })}
          </div>
        </React.Fragment>
      )}

      {step === 1 && (
        <React.Fragment>
          <Header title="Request a service" />
          <Progress />
          <h1 style={{ fontFamily: TP.serif, fontSize: 26, fontWeight: 700, color: TP.navy, letterSpacing: -0.6, margin: "0 0 8px", lineHeight: 1.15 }}>
            Tell us a little more.
          </h1>
          <p style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text2, lineHeight: 1.5, marginBottom: 20 }}>
            A sentence or two is plenty. The pro will follow up with anything else.
          </p>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: TP.sans, fontSize: 12, fontWeight: 600, color: TP.text2, marginBottom: 8 }}>Service</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: TP.tint, border: `1px solid #D6D3F7`, borderRadius: 10, padding: "10px 14px" }}>
              <Icon name="checkCircle" size={16} color={TP.blue} />
              <span style={{ fontFamily: TP.sans, fontSize: 14, fontWeight: 600, color: TP.navy }}>{trade}</span>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: TP.sans, fontSize: 12, fontWeight: 600, color: TP.text2, marginBottom: 8 }}>What's going on?</div>
            <textarea value={scope} onChange={e => setScope(e.target.value)} placeholder="e.g. AC isn't cooling well and it's 14 years old…" rows={4} style={{
              width: "100%", border: `1px solid ${TP.border}`, borderRadius: 12, padding: 14,
              fontFamily: TP.sans, fontSize: 14, color: TP.text, resize: "none", outline: "none", lineHeight: 1.5,
            }} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: TP.sans, fontSize: 12, fontWeight: 600, color: TP.text2, marginBottom: 8 }}>Address</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: TP.surface, border: `1px solid ${TP.border}`, borderRadius: 12, padding: "12px 14px" }}>
              <Icon name="mapPin" size={16} color={TP.muted} />
              <span style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text }}>1234 Main St, Frisco, TX 75033</span>
              <span style={{ marginLeft: "auto", fontFamily: TP.sans, fontSize: 11, color: TP.blue, fontWeight: 600 }}>From your home</span>
            </div>
          </div>

          <PrimaryCTA onClick={() => setStep(2)}>
            Continue <Icon name="arrowRight" size={18} color="white" />
          </PrimaryCTA>
        </React.Fragment>
      )}

      {step === 2 && (
        <React.Fragment>
          <Header title="Request a service" />
          <Progress />
          <h1 style={{ fontFamily: TP.serif, fontSize: 26, fontWeight: 700, color: TP.navy, letterSpacing: -0.6, margin: "0 0 8px", lineHeight: 1.15 }}>
            How should we reach you?
          </h1>
          <p style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text2, lineHeight: 1.5, marginBottom: 22 }}>
            Your matched pro uses this to confirm timing. We never share it more widely.
          </p>

          {[
            { label: "Name", value: "Sarah Mitchell" },
            { label: "Phone", value: "(214) 555-0188" },
            { label: "Email", value: "sarah.m@email.com" },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: TP.sans, fontSize: 12, fontWeight: 600, color: TP.text2, marginBottom: 8 }}>{f.label}</div>
              <div style={{ border: `1px solid ${TP.border}`, borderRadius: 12, padding: "13px 14px", fontFamily: TP.sans, fontSize: 14, color: TP.text }}>{f.value}</div>
            </div>
          ))}

          <div style={{ background: TP.surface, borderRadius: 12, padding: 16, margin: "18px 0 22px", display: "flex", gap: 12 }}>
            <Icon name="checkCircle" size={18} color={TP.green} style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontFamily: TP.sans, fontSize: 13, color: TP.text2, lineHeight: 1.5 }}>
              <b style={{ color: TP.navy }}>Free for you.</b> TrustyPro is always free for homeowners — you'll only ever pay the pro directly for work you approve.
            </div>
          </div>

          <PrimaryCTA onClick={toTracking}>
            Submit request <Icon name="arrowRight" size={18} color="white" />
          </PrimaryCTA>
        </React.Fragment>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Request Tracking (/my-request) — Submitted → Matching → Pro Assigned
// Matching is invisible; the pro is revealed when assigned.
// ─────────────────────────────────────────────────────────────
function RequestTracking({ back }) {
  const [current, setCurrent] = React.useState(1); // start at "Matching"
  const assigned = current >= 2;

  React.useEffect(() => {
    const t = setTimeout(() => setCurrent(2), 3200);
    return () => clearTimeout(t);
  }, []);

  const steps = [
    { title: "Request submitted", sub: "We received your HVAC request · today, 2:14 PM" },
    { title: "Finding your pro", sub: assigned ? "Matched with a vetted local pro" : "Matching you with a vetted, background-checked pro nearby", live: assigned ? null : "Usually under an hour" },
    { title: "Pro assigned", sub: assigned ? "They'll reach out to confirm timing" : "We'll notify you the moment this happens" },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "56px 24px 120px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <button onClick={back} style={{ width: 40, height: 40, borderRadius: 20, background: TP.surface, border: `1px solid ${TP.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevronLeft" size={20} color={TP.navy} />
        </button>
        <div style={{ fontFamily: TP.sans, fontSize: 15, fontWeight: 600, color: TP.navy }}>Your request</div>
      </div>

      <div style={{ background: TP.tint, borderRadius: 18, padding: 20, marginBottom: 26 }}>
        <Eyebrow color={TP.blue}>HVAC · Request #TP-4821</Eyebrow>
        <div style={{ fontFamily: TP.serif, fontSize: 22, fontWeight: 700, color: TP.navy, letterSpacing: -0.4, margin: "8px 0 4px" }}>
          {assigned ? "You're matched." : "We're on it."}
        </div>
        <div style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text2, lineHeight: 1.5 }}>
          {assigned ? "A trusted pro has accepted your request and will be in touch shortly." : "Sit tight — we're matching you with the right pro. No bidding wars, no spam calls."}
        </div>
      </div>

      <SectionHeader label="Status" />
      <Stepper steps={steps} current={current} />

      {assigned && (
        <div style={{ marginTop: 8, background: "white", border: `1px solid ${TP.border}`, borderRadius: 16, padding: 18, boxShadow: TP.cardHover, animation: "tpfade 500ms ease" }}>
          <Eyebrow color={TP.muted}>Your matched pro</Eyebrow>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12 }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, background: TP.navy, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TP.sans, fontSize: 16, fontWeight: 700 }}>CC</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: TP.sans, fontSize: 16, fontWeight: 700, color: TP.navy }}>Comfort Climate Co.</span>
                <StatusChip kind="verified">Verified</StatusChip>
              </div>
              <div style={{ fontFamily: TP.sans, fontSize: 13, color: TP.text2, marginTop: 2 }}>HVAC specialist · serving Frisco</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <SecondaryCTA full style={{ flex: 1 }}>Message</SecondaryCTA>
            <PrimaryCTA full={false} style={{ flex: 1 }}>Call</PrimaryCTA>
          </div>
          <style>{`@keyframes tpfade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Shop This Look — AI render of an improved room + purchasable products
// ─────────────────────────────────────────────────────────────
function ShopThisLook({ back }) {
  const [view, setView] = React.useState("after"); // before | after
  const products = [
    { name: "Boucle accent chair", brand: "West Elm", price: "$899", kind: "livingRoom" },
    { name: "Hand-knotted wool rug", brand: "Revival", price: "$1,240", kind: "interior" },
    { name: "Arc floor lamp, brass", brand: "Lumens", price: "$329", kind: "bedroom" },
    { name: "Ceramic table lamp", brand: "CB2", price: "$149", kind: "kitchen" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", paddingBottom: 120 }}>
      <div style={{ position: "relative", height: 320 }}>
        <PhotoPlaceholder
          kind="livingRoom"
          height="100%"
          radius={0}
          src={view === "after"
            ? "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=85&auto=format&fit=crop"
            : "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=85&auto=format&fit=crop"}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(30,27,58,0.25), transparent 30%)" }} />
        <button onClick={back} style={{ position: "absolute", top: 56, left: 20, width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevronLeft" size={20} color={TP.navy} />
        </button>

        {/* before/after toggle */}
        <div style={{ position: "absolute", top: 56, right: 20, display: "flex", background: "rgba(255,255,255,0.92)", borderRadius: 999, padding: 3, backdropFilter: "blur(6px)" }}>
          {["before", "after"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              border: "none", borderRadius: 999, padding: "6px 14px", cursor: "pointer",
              background: view === v ? TP.navy : "transparent", color: view === v ? "white" : TP.text2,
              fontFamily: TP.sans, fontSize: 12, fontWeight: 600, textTransform: "capitalize",
            }}>{v}</button>
          ))}
        </div>

        {view === "after" && (
          <div style={{ position: "absolute", bottom: 16, left: 20, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(79,70,229,0.92)", color: "white", borderRadius: 999, padding: "6px 12px", backdropFilter: "blur(6px)" }}>
            <Icon name="sparkles" size={14} color="white" />
            <span style={{ fontFamily: TP.sans, fontSize: 12, fontWeight: 600 }}>AI rendering</span>
          </div>
        )}
      </div>

      <div style={{ padding: "22px 24px 0" }}>
        <Eyebrow>Living room · refreshed</Eyebrow>
        <h1 style={{ fontFamily: TP.serif, fontSize: 25, fontWeight: 700, color: TP.navy, letterSpacing: -0.5, margin: "8px 0 8px", lineHeight: 1.15 }}>
          Here's how it could look.
        </h1>
        <p style={{ fontFamily: TP.sans, fontSize: 14, color: TP.text2, lineHeight: 1.55, marginBottom: 18 }}>
          We reimagined your space with pieces that fit its dimensions and light. Tap any item to shop it.
        </p>

        <button style={{ width: "100%", background: TP.navy, color: "white", border: "none", borderRadius: 14, padding: "14px 18px", fontFamily: TP.sans, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
          <Icon name="camera" size={18} color="white" /> View in my room (AR)
        </button>

        <SectionHeader label="Shop this look" action={<span style={{ fontFamily: TP.sans, fontSize: 12, color: TP.muted }}>4 items</span>} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {products.map(p => (
            <div key={p.name} style={{ background: "white", border: `1px solid ${TP.border}`, borderRadius: 14, overflow: "hidden", boxShadow: TP.cardRest }}>
              <PhotoPlaceholder kind={p.kind} height={120} radius={0} />
              <div style={{ padding: "12px 12px 14px" }}>
                <div style={{ fontFamily: TP.sans, fontSize: 11, color: TP.muted, fontWeight: 600 }}>{p.brand}</div>
                <div style={{ fontFamily: TP.sans, fontSize: 13.5, fontWeight: 600, color: TP.navy, lineHeight: 1.3, marginTop: 2 }}>{p.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                  <span style={{ fontFamily: TP.sans, fontSize: 15, fontWeight: 700, color: TP.navy }}>{p.price}</span>
                  <span style={{ width: 32, height: 32, borderRadius: 16, background: TP.tint, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="arrowRight" size={15} color={TP.blue} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: TP.sans, fontSize: 11, color: TP.muted, textAlign: "center", marginTop: 18, lineHeight: 1.5 }}>
          Prices from partner retailers. TrustyPro may earn a small commission — never charged to you.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Proactive Notification — "We noticed something at your home"
// The moat: surfaced as a full-screen state with before/after + opt-in.
// ─────────────────────────────────────────────────────────────
function ProactiveNotice({ dismiss, toRequest }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", paddingBottom: 40 }}>
      <div style={{ position: "relative", height: 300 }}>
        <PhotoPlaceholder
          kind="exterior"
          height="100%"
          radius={0}
          src="https://images.unsplash.com/photo-1632759145351-1d592919f522?w=900&q=85&auto=format&fit=crop"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(30,27,58,0.55), rgba(30,27,58,0.1) 40%, transparent)" }} />
        <button onClick={dismiss} style={{ position: "absolute", top: 56, right: 20, width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="x" size={28} color={TP.navy} />
        </button>
        <div style={{ position: "absolute", top: 60, left: 24, display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.92)", borderRadius: 999, padding: "7px 13px", backdropFilter: "blur(6px)" }}>
          <Icon name="bell" size={15} color={TP.blue} />
          <span style={{ fontFamily: TP.sans, fontSize: 12, fontWeight: 700, color: TP.navy }}>TrustyPro noticed something</span>
        </div>
        {/* highlight ring on the issue */}
        <div style={{ position: "absolute", top: "52%", left: "30%", width: 64, height: 64, borderRadius: 32, border: `3px solid ${TP.amber}`, boxShadow: `0 0 0 6px ${TP.amber}33` }} />
      </div>

      <div style={{ padding: "26px 24px 0" }}>
        <Eyebrow color={TP.amber}>Roof · Medium priority</Eyebrow>
        <h1 style={{ fontFamily: TP.serif, fontSize: 26, fontWeight: 700, color: TP.navy, letterSpacing: -0.6, margin: "8px 0 10px", lineHeight: 1.18 }}>
          A few shingles look lifted near your north gable.
        </h1>
        <p style={{ fontFamily: TP.sans, fontSize: 15, color: TP.text2, lineHeight: 1.55, marginBottom: 22 }}>
          Our latest scan of your home spotted early wear. It's not urgent — but catching it now is far cheaper than waiting for a leak. Here's what a repair would look like.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
          <div>
            <div style={{ fontFamily: TP.sans, fontSize: 11, fontWeight: 700, color: TP.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>Now</div>
            <PhotoPlaceholder kind="exterior" height={120} radius={10} src="https://images.unsplash.com/photo-1632759145351-1d592919f522?w=500&q=80&auto=format&fit=crop" />
          </div>
          <div>
            <div style={{ fontFamily: TP.sans, fontSize: 11, fontWeight: 700, color: TP.blue, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>After repair</div>
            <PhotoPlaceholder kind="exterior" height={120} radius={10} src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&q=80&auto=format&fit=crop" />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <StatChip>Roofing</StatChip>
          <StatChip>Est. $450–900</StatChip>
        </div>

        <PrimaryCTA onClick={toRequest}>Get a quote — free</PrimaryCTA>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <TextLink color={TP.text2} onClick={dismiss}>Not now, remind me later</TextLink>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RequestService, RequestTracking, ShopThisLook, ProactiveNotice });
