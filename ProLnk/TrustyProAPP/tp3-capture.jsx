// TrustyPro v3 — Capture hub + Fix / Document / Redesign flows + affiliate shop

// ===== local data =================================================
const CAP_MODES = [
  {
    id: "fix", icon: "wrench", photo: T3_PHOTOS.bathroom,
    title: "Fix something",
    desc: "Snap a problem area — a leak, a crack, a broken fixture — and describe it with AI. We'll match you to a pro.",
    accent: T3.indigo,
  },
  {
    id: "document", icon: "scan3d", photo: T3_PHOTOS.living,
    title: "Document a space",
    desc: "Scan a room into 3D and log every appliance, fixture, and finish. Builds your Home Health Vault.",
    accent: "#0E9F6E",
  },
  {
    id: "design", icon: "wand", photo: T3_PHOTOS.livingAfter,
    title: "Reimagine a space",
    desc: "Photograph a room and let AI restyle it to your taste — then shop the exact pieces to make it real.",
    accent: "#D97706",
  },
  {
    id: "appliance", icon: "fridge", photo: T3_PHOTOS.hvacUnit || T3_PHOTOS.roofNow,
    title: "Log a system or appliance",
    desc: "Snap the nameplate on any unit — AI reads make, model, age, and checks recalls & warranties.",
    accent: "#7C3AED",
  },
  {
    id: "docs", icon: "archive", photo: T3_PHOTOS.kitchen,
    title: "File a document",
    desc: "Scan warranties, manuals, utility bills, closing docs — AI reads, names, and files them for you.",
    accent: "#0E9F8E",
  },
];

const DESIGN_STYLES = ["Warm minimal", "Modern", "Cozy & layered", "Mid-century", "Coastal", "Japandi", "Bold & colorful"];

// affiliate catalog — anchor x/y = where the pin sits on the render
const SHOP_CATALOG = [
  { id: "s1", cat: "Seating",  name: "Boucle accent chair", brand: "West Elm", price: 899,  x: 23, y: 62 },
  { id: "s2", cat: "Rugs",     name: "Hand-knotted wool rug", brand: "Revival", price: 1240, x: 50, y: 88 },
  { id: "s3", cat: "Lighting", name: "Arc floor lamp, brass", brand: "Lumens", price: 329,  x: 73, y: 36 },
  { id: "s4", cat: "Drapes",   name: "Linen drapery, pair", brand: "Quince",  price: 158,  x: 90, y: 28 },
  { id: "s5", cat: "Seating",  name: "Linen sofa, 3-seat", brand: "Article", price: 1799, x: 52, y: 58 },
  { id: "s6", cat: "Decor",    name: "Ceramic table lamp", brand: "CB2",     price: 149,  x: 34, y: 47 },
  { id: "s7", cat: "Decor",    name: "Framed art set of 3", brand: "Minted", price: 268,  x: 64, y: 30 },
  { id: "s8", cat: "Rugs",     name: "Jute runner",        brand: "Annie Selke", price: 198, x: 16, y: 80 },
];
const SHOP_CATS = ["All", "Seating", "Rugs", "Lighting", "Drapes", "Decor"];

const money = (n) => "$" + n.toLocaleString();

// ===== Capture Hub ================================================
function W3CaptureHub({ go, onPickMode, onBack }) {
  return (
    <div data-screen-label="Capture" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.surface, overflowY: "auto", padding: "54px 22px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <BackBtn onClick={onBack} />
        <span style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: 600, color: T3.ink }}>Capture</span>
      </div>

      <h1 style={{ fontFamily: T3.sans, fontSize: 27, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 6px", lineHeight: 1.12 }}>
        What would you<br/>like to do?
      </h1>
      <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 22px" }}>
        Point your camera at anything — a problem, a whole room, or a space you'd love to reimagine.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {CAP_MODES.map(m => (
          <button key={m.id} onClick={() => onPickMode(m.id)} style={{
            position: "relative", border: `1px solid ${T3.border}`, borderRadius: 20, overflow: "hidden",
            padding: 0, cursor: "pointer", textAlign: "left", background: "white", boxShadow: T3.rest, display: "block",
          }}>
            <div style={{ position: "relative", height: 116 }}>
              <Img src={m.photo} h="100%" dim={0.18} />
              <div style={{ position: "absolute", top: 12, left: 12, width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: T3.rest }}>
                <I3 name={m.icon} size={21} color={m.accent} strokeWidth={1.7} />
              </div>
            </div>
            <div style={{ padding: "13px 16px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: T3.sans, fontSize: 16.5, fontWeight: 800, color: T3.ink, letterSpacing: "-0.02em" }}>{m.title}</span>
                <I3 name="arrowR" size={17} color={T3.muted} />
              </div>
              <div style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink2, lineHeight: 1.5, marginTop: 5 }}>{m.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== Reusable single-shot camera ================================
function W3Snap({ title, hint, photo, badge, onCapture, onBack }) {
  const [shot, setShot] = React.useState(false);
  const capture = () => { setShot(true); setTimeout(onCapture, 650); };
  return (
    <div data-screen-label="Camera" style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0a0a12" }}>
      <Img src={photo} h="100%" style={{ filter: shot ? "brightness(1.15)" : "brightness(0.85)", transition: "filter 200ms" }} />
      {shot && <div style={{ position: "absolute", inset: 0, background: "white", animation: "t3flash 600ms ease" }} />}

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 130, background: "linear-gradient(to bottom, rgba(10,10,18,0.78), transparent)" }} />
      <div style={{ position: "absolute", top: 56, left: 0, right: 0, padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 19, background: "rgba(0,0,0,0.45)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <I3 name="x" size={19} color="white" />
        </button>
        <div style={{ fontFamily: T3.sans, fontSize: 15.5, fontWeight: 600, color: "white" }}>{title}</div>
        <button style={{ width: 38, height: 38, borderRadius: 19, background: "rgba(0,0,0,0.45)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <I3 name="flash" size={18} color="white" />
        </button>
      </div>

      {badge && (
        <div style={{ position: "absolute", top: 110, left: "50%", transform: "translateX(-50%)", display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(79,70,229,0.92)", borderRadius: 999, padding: "7px 14px", backdropFilter: "blur(6px)", whiteSpace: "nowrap" }}>
          <I3 name="sparkles" size={13} color="white" />
          <span style={{ fontFamily: T3.sans, fontSize: 12, fontWeight: 600, color: "white" }}>{badge}</span>
        </div>
      )}

      {/* framing guides */}
      <div style={{ position: "absolute", inset: "164px 44px 240px" }}>
        {[[0,0],[0,1],[1,0],[1,1]].map(([y, x], i) => (
          <div key={i} style={{ position: "absolute", [y ? "bottom" : "top"]: -2, [x ? "right" : "left"]: -2, width: 32, height: 32, [y ? "borderBottom" : "borderTop"]: "2.5px solid rgba(255,255,255,0.9)", [x ? "borderRight" : "borderLeft"]: "2.5px solid rgba(255,255,255,0.9)", borderRadius: 5 }} />
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 220, background: "linear-gradient(to top, rgba(10,10,18,0.85), transparent)" }} />
      <div style={{ position: "absolute", bottom: 52, left: 0, right: 0, padding: "0 26px", textAlign: "center" }}>
        <div style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 500, color: "white", marginBottom: 20 }}>{hint}</div>
        <button onClick={capture} style={{ width: 78, height: 78, borderRadius: 39, border: "4px solid rgba(255,255,255,0.95)", background: "rgba(255,255,255,0.14)", backdropFilter: "blur(8px)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: 30, background: "white" }} />
        </button>
      </div>
      <style>{`@keyframes t3flash{0%{opacity:.9}100%{opacity:0}}`}</style>
    </div>
  );
}

// ===== FIX: AI chat to describe the problem =======================
function W3FixChat({ go, photo }) {
  const persona = "You are TrustyPro's repair assistant. A homeowner just photographed a home problem (looks like a bathroom fixture — possibly a running or leaking toilet). Your job: ask one short, friendly clarifying question at a time to understand the issue (how long, how bad, any water damage), so a pro can scope it. Keep every reply under 2 sentences, plain-spoken, no jargon, no exclamation overload. After you understand it, reassure them you can find a vetted pro.";
  const fallback = (txt, turn) => {
    const lines = [
      "Thanks — that helps. How long has it been doing that?",
      "Got it. Is there any water pooling on the floor or just running in the bowl?",
      "Understood. That's a common fix — I can line up a vetted plumber who handles exactly this. Want me to find one?",
    ];
    return lines[Math.min(turn, lines.length - 1)];
  };
  return (
    <AIChat
      title="Repair assistant"
      onBack={() => go("capture")}
      headerPhoto={photo} headerLabel="YOUR PHOTO"
      persona={persona}
      seed="I can see a bathroom fixture here. Tell me what's going on — what's it doing that it shouldn't?"
      quickReplies={["Toilet keeps running", "It's leaking at the base", "Won't flush properly"]}
      fallback={fallback}
      readyAfter={2}
      cta="Find me a pro"
      onCta={() => go("request", { finding: {
        id: "fix1", trade: "Plumbing", title: "Toilet repair", category: "Plumbing",
        severity: "medium", costRange: "$120–260", photo,
        description: "Captured and described in chat — running toilet, intermittent, no major floor pooling.",
      }})}
    />
  );
}

// ===== DOCUMENT: 3D result ========================================
function W3Capture3D({ go, state, onScore }) {
  const [orbit, setOrbit] = React.useState(0);
  React.useEffect(() => { onScore && onScore(); }, []);
  const inventory = [
    { icon: "fridge",  name: "Refrigerator", sub: "LG · LRMVS3006S · 2019" },
    { icon: "flame",   name: "Range", sub: "GE · gas" },
    { icon: "droplet", name: "Dishwasher", sub: "Bosch · 2021" },
    { icon: "zap",     name: "Recessed lighting", sub: "5 fixtures" },
  ];
  return (
    <div data-screen-label="3D result" className="t3-screen" style={{ position: "absolute", inset: 0, background: T3.surface, overflowY: "auto", padding: "0 0 40px" }}>
      {/* 3D viewer */}
      <div style={{ position: "relative", height: 320, background: `radial-gradient(120% 90% at 50% 10%, #20203A, #0c0c18)`, overflow: "hidden" }}>
        <button onClick={() => go("capture")} style={{ position: "absolute", top: 56, left: 20, zIndex: 3, width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.14)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <I3 name="x" size={19} color="white" />
        </button>
        <div style={{ position: "absolute", top: 60, right: 20, zIndex: 3, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(14,159,110,0.92)", borderRadius: 999, padding: "6px 12px" }}>
          <I3 name="cube" size={13} color="white" />
          <span style={{ fontFamily: T3.sans, fontSize: 11.5, fontWeight: 700, color: "white" }}>3D model ready</span>
        </div>

        {/* faux 3D room: photo on a tilted plane */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", perspective: 900 }}>
          <div style={{ width: 230, height: 168, borderRadius: 12, overflow: "hidden", transform: `rotateX(12deg) rotateY(${orbit}deg)`, transition: "transform 300ms ease", boxShadow: "0 30px 60px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <Img src={T3_PHOTOS.kitchen} h="100%" />
          </div>
        </div>

        {/* dimension labels */}
        <div style={{ position: "absolute", bottom: 70, left: "50%", transform: "translateX(-50%)", fontFamily: T3.mono, fontSize: 11, color: "rgba(255,255,255,0.7)", display: "flex", gap: 16 }}>
          <span>12'4" × 11'8"</span><span>·</span><span>145 sq ft</span><span>·</span><span>9' ceil</span>
        </div>

        {/* orbit control */}
        <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.1)", borderRadius: 999, padding: "6px 8px", backdropFilter: "blur(8px)" }}>
          <button onClick={() => setOrbit(o => o - 25)} style={{ width: 34, height: 34, borderRadius: 17, border: "none", background: "rgba(255,255,255,0.16)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><I3 name="chevL" size={16} color="white" /></button>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 4px" }}><I3 name="rotate" size={14} color="rgba(255,255,255,0.8)" /><span style={{ fontFamily: T3.sans, fontSize: 11.5, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Drag to orbit</span></div>
          <button onClick={() => setOrbit(o => o + 25)} style={{ width: 34, height: 34, borderRadius: 17, border: "none", background: "rgba(255,255,255,0.16)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><I3 name="chevR" size={16} color="white" /></button>
        </div>
      </div>

      <div style={{ padding: "22px 22px 0" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: T3.greenBg, border: `1px solid ${T3.greenBd}`, borderRadius: 999, padding: "5px 12px", marginBottom: 12 }}>
          <I3 name="check" size={13} color={T3.green} strokeWidth={2.4} />
          <span style={{ fontFamily: T3.sans, fontSize: 12, fontWeight: 700, color: T3.greenInk }}>Kitchen documented · +9 to score</span>
        </div>
        <h1 style={{ fontFamily: T3.sans, fontSize: 24, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Captured in 3D.</h1>
        <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "0 0 20px" }}>
          We mapped the room and logged everything in it. It's all saved to your Vault.
        </p>

        <Sect label="Logged in this room" action={<span style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted, fontWeight: 500 }}>{inventory.length} items</span>} />
        <div style={{ background: "white", borderRadius: 16, border: `1px solid ${T3.border}`, padding: "4px 16px", boxShadow: T3.rest, marginBottom: 22 }}>
          {inventory.map((it, i) => (
            <div key={it.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < inventory.length - 1 ? `1px solid ${T3.borderSubtle}` : "none" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: T3.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I3 name={it.icon} size={16} color={T3.indigo} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink }}>{it.name}</div>
                <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted }}>{it.sub}</div>
              </div>
              <I3 name="check" size={15} color={T3.green} strokeWidth={2.2} />
            </div>
          ))}
        </div>

        <Btn onClick={() => go("vault")}>See it in my Vault <I3 name="arrowR" size={18} color="white" /></Btn>
        <div style={{ textAlign: "center", marginTop: 13 }}>
          <button onClick={() => go("capture")} style={{ background: "none", border: "none", fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2, cursor: "pointer" }}>Document another space</button>
        </div>
      </div>
    </div>
  );
}

// ===== DESIGN: AI style chat ======================================
function W3DesignChat({ go, photo }) {
  const persona = "You are TrustyPro's interior design assistant. A homeowner photographed their living room and wants an AI restyle. Ask one short question at a time about their taste — preferred style, colors, mood, must-keeps — so you can generate a render they'll love. Keep replies under 2 sentences, warm and concrete. After a couple of answers, tell them you're ready to generate the render.";
  const fallback = (txt, turn) => {
    const lines = [
      "Love that direction. What colors feel like home to you — warm neutrals, moody darks, or something brighter?",
      "Perfect. Anything you want to keep — the sofa, the rug, the light fixture?",
      "Got a clear picture now. I'll render your living room in that style — give me a moment.",
    ];
    return lines[Math.min(turn, lines.length - 1)];
  };
  return (
    <AIChat
      title="Design assistant"
      onBack={() => go("capture")}
      headerPhoto={photo} headerLabel="YOUR ROOM"
      persona={persona}
      seed="Beautiful room to work with. What look are you going for? Tell me a vibe, or pick one below."
      quickReplies={DESIGN_STYLES}
      fallback={fallback}
      readyAfter={2}
      cta="Generate my render"
      onCta={() => go("designRender")}
    />
  );
}

// ===== DESIGN: render reveal ======================================
function W3DesignRender({ go }) {
  const [done, setDone] = React.useState(false);
  const stages = ["Reading your room…", "Applying your style…", "Placing furniture & light…"];
  const [stage, setStage] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setStage(s => {
      if (s >= stages.length - 1) { clearInterval(t); setTimeout(() => setDone(true), 700); return s; }
      return s + 1;
    }), 850);
    return () => clearInterval(t);
  }, []);

  if (!done) return (
    <div style={{ position: "absolute", inset: 0, background: T3.ink, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{ position: "relative", width: "100%", height: 210, borderRadius: 18, overflow: "hidden", marginBottom: 26 }}>
        <Img src={T3_PHOTOS.living} h="100%" style={{ filter: "brightness(0.7)" }} />
        <div className="w3-scanline" style={{ position: "absolute", left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #C9A227, transparent)", boxShadow: "0 0 16px #D97706" }} />
      </div>
      <div style={{ fontFamily: T3.sans, fontSize: 18, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>Rendering your space</div>
      <div key={stage} className="t3-in" style={{ fontFamily: T3.sans, fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 10 }}>{stages[stage]}</div>
      <style>{`@keyframes w3scan { 0%{top:8%} 100%{top:88%} } .w3-scanline { animation: w3scan 1.5s ease-in-out infinite alternate; }`}</style>
    </div>
  );

  return (
    <div data-screen-label="Design render" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", paddingBottom: 40 }}>
      <div style={{ position: "relative", height: 300 }}>
        <Img src={T3_PHOTOS.livingAfter} h="100%" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,18,43,0.3), transparent 35%)" }} />
        <button onClick={() => go("capture")} style={{ position: "absolute", top: 56, left: 20, width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <I3 name="x" size={19} color={T3.ink} />
        </button>
        <div style={{ position: "absolute", bottom: 14, left: 20, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217,119,6,0.94)", color: "white", borderRadius: 999, padding: "6px 13px", backdropFilter: "blur(6px)" }}>
          <I3 name="sparkles" size={13} color="white" />
          <span style={{ fontFamily: T3.sans, fontSize: 11.5, fontWeight: 700 }}>AI render · Warm minimal</span>
        </div>
      </div>

      <div style={{ padding: "22px 22px 0" }}>
        <h1 style={{ fontFamily: T3.sans, fontSize: 24, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.15 }}>Your living room, reimagined.</h1>
        <p style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2, lineHeight: 1.55, margin: "8px 0 18px" }}>
          Rendered in your style, fit to the room's real dimensions and light. Love it? Make it real — shop the exact pieces.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
          <Chip>Warm minimal</Chip><Chip>Light woods</Chip><Chip>Boucle & linen</Chip>
        </div>
        <Btn onClick={() => go("designShop")}><I3 name="bag" size={18} color="white" /> Shop this look</Btn>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <Btn kind="ghost" size="sm" style={{ flex: 1 }} onClick={() => go("designChat")}><I3 name="sliders" size={15} color={T3.ink} /> Tweak the style</Btn>
          <Btn kind="ghost" size="sm" style={{ flex: 1 }}><I3 name="eye" size={15} color={T3.ink} /> View in AR</Btn>
        </div>
      </div>
    </div>
  );
}

// ===== DESIGN: affiliate shop (add products onto the render) =======
function W3DesignShop({ go }) {
  const [cat, setCat] = React.useState("All");
  const [cart, setCart] = React.useState(["s1", "s3"]); // a couple pre-placed
  const [checkout, setCheckout] = React.useState(false);
  const inCart = (id) => cart.includes(id);
  const toggle = (id) => setCart(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);
  const items = SHOP_CATALOG.filter(p => cat === "All" || p.cat === cat);
  const cartItems = SHOP_CATALOG.filter(p => inCart(p.id));
  const total = cartItems.reduce((s, p) => s + p.price, 0);

  return (
    <div data-screen-label="Shop the look" style={{ position: "absolute", inset: 0, background: T3.surface, display: "flex", flexDirection: "column" }}>
      {/* render with live product pins */}
      <div style={{ position: "relative", height: 264, flexShrink: 0 }}>
        <Img src={T3_PHOTOS.livingAfter} h="100%" />
        <button onClick={() => go("designRender")} style={{ position: "absolute", top: 56, left: 20, width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 3 }}>
          <I3 name="chevL" size={20} color={T3.ink} />
        </button>
        <div style={{ position: "absolute", top: 60, right: 20, zIndex: 3, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.94)", borderRadius: 999, padding: "6px 12px" }}>
          <I3 name="layers" size={13} color={T3.indigo} />
          <span style={{ fontFamily: T3.sans, fontSize: 11.5, fontWeight: 700, color: T3.ink }}>{cartItems.length} placed</span>
        </div>
        {/* pins for items in cart */}
        {cartItems.map((p, i) => (
          <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)", zIndex: 2 }}>
            <div className="t3-in" style={{ width: 26, height: 26, borderRadius: 13, background: T3.indigo, border: "2px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T3.sans, fontSize: 12, fontWeight: 800, color: "white" }}>{i + 1}</div>
          </div>
        ))}
        <div style={{ position: "absolute", bottom: 12, left: 20, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(20,18,43,0.6)", color: "white", borderRadius: 999, padding: "5px 11px", backdropFilter: "blur(6px)" }}>
          <I3 name="sparkles" size={12} color="white" />
          <span style={{ fontFamily: T3.sans, fontSize: 11, fontWeight: 600 }}>Tap Add to drop a piece into your render</span>
        </div>
      </div>

      {/* category filter */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "12px 18px 10px", background: "white", borderBottom: `1px solid ${T3.borderSubtle}`, flexShrink: 0 }}>
        {SHOP_CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ whiteSpace: "nowrap", background: cat === c ? T3.ink : "white", color: cat === c ? "white" : T3.ink2, border: cat === c ? "none" : `1px solid ${T3.border}`, borderRadius: 999, padding: "7px 14px", fontFamily: T3.sans, fontSize: 12.5, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>{c}</button>
        ))}
      </div>

      {/* product list */}
      <div className="t3-screen" style={{ flex: 1, overflowY: "auto", padding: "14px 18px 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {items.map(p => {
            const added = inCart(p.id);
            return (
              <div key={p.id} style={{ background: "white", border: `1.5px solid ${added ? T3.indigo : T3.border}`, borderRadius: 16, overflow: "hidden", boxShadow: added ? T3.lift : T3.rest, transition: "all 160ms" }}>
                <Img src={T3_PHOTOS[p.cat === "Rugs" ? "living" : p.cat === "Drapes" ? "bedroom" : p.cat === "Lighting" ? "livingAfter" : "kitchen"]} h={92} />
                <div style={{ padding: "10px 12px 12px" }}>
                  <div style={{ fontFamily: T3.sans, fontSize: 10.5, color: T3.muted, fontWeight: 600 }}>{p.brand}</div>
                  <div style={{ fontFamily: T3.sans, fontSize: 12.5, fontWeight: 700, color: T3.ink, lineHeight: 1.25, marginTop: 2, minHeight: 31 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                    <span style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 800, color: T3.ink, fontVariantNumeric: "tabular-nums" }}>{money(p.price)}</span>
                    <button onClick={() => toggle(p.id)} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: added ? T3.tint : T3.ink, color: added ? T3.indigo : "white", border: "none", borderRadius: 9, padding: "7px 11px", fontFamily: T3.sans, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                      {added ? <React.Fragment><I3 name="check" size={13} color={T3.indigo} strokeWidth={2.5} /> Added</React.Fragment> : <React.Fragment><I3 name="plus" size={13} color="white" strokeWidth={2.5} /> Add</React.Fragment>}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily: T3.sans, fontSize: 11, color: T3.muted, textAlign: "center", margin: "18px 0 0", lineHeight: 1.5 }}>
          Prices from partner retailers. TrustyPro earns a small commission — never charged to you.
        </div>
      </div>

      {/* sticky cart bar */}
      {cartItems.length > 0 && !checkout && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "white", borderTop: `1px solid ${T3.border}`, padding: "14px 18px 28px", display: "flex", alignItems: "center", gap: 14, zIndex: 20 }}>
          <div>
            <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted, fontWeight: 500 }}>{cartItems.length} pieces</div>
            <div style={{ fontFamily: T3.sans, fontSize: 20, fontWeight: 800, color: T3.ink, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{money(total)}</div>
          </div>
          <Btn style={{ flex: 1 }} onClick={() => setCheckout(true)}><I3 name="bag" size={17} color="white" /> Check out</Btn>
        </div>
      )}

      {/* checkout sheet */}
      {checkout && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,18,43,0.4)", zIndex: 30, display: "flex", flexDirection: "column", justifyContent: "flex-end" }} onClick={() => setCheckout(false)}>
          <div className="t3-in" onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: "24px 24px 0 0", padding: "22px 22px 30px", maxHeight: "82%", overflowY: "auto" }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: T3.border, margin: "0 auto 18px" }} />
            <h2 style={{ fontFamily: T3.sans, fontSize: 20, fontWeight: 800, color: T3.ink, letterSpacing: "-0.02em", margin: "0 0 4px" }}>Your look</h2>
            <p style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink2, margin: "0 0 18px" }}>Check out with each retailer in one tap. We keep your render synced.</p>
            {cartItems.map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: `1px solid ${T3.borderSubtle}` }}>
                <div style={{ width: 46, height: 46, borderRadius: 11, overflow: "hidden", flexShrink: 0 }}>
                  <Img src={T3_PHOTOS[p.cat === "Rugs" ? "living" : p.cat === "Lighting" ? "livingAfter" : "kitchen"]} h="100%" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink }}>{p.name}</div>
                  <div style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>{p.brand}</div>
                </div>
                <span style={{ fontFamily: T3.sans, fontSize: 14, fontWeight: 700, color: T3.ink, fontVariantNumeric: "tabular-nums" }}>{money(p.price)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0 18px" }}>
              <span style={{ fontFamily: T3.sans, fontSize: 14, color: T3.ink2 }}>Total</span>
              <span style={{ fontFamily: T3.sans, fontSize: 24, fontWeight: 800, color: T3.ink, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{money(total)}</span>
            </div>
            <Btn onClick={() => { setCheckout(false); go("home"); }}>Check out all <I3 name="arrowR" size={18} color="white" /></Btn>
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <button onClick={() => setCheckout(false)} style={{ background: "none", border: "none", fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2, cursor: "pointer" }}>Keep shopping</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== APPLIANCE/SYSTEM: nameplate identify result =================
function W3NameplateResult({ go }) {
  const stages = ["Reading the nameplate…", "Found: Carrier · 24ACC636A003", "Checking recalls & warranty…"];
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
      <div style={{ position: "relative", width: 220, height: 150, borderRadius: 14, background: "#2A2A44", marginBottom: 28, padding: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ fontFamily: T3.mono, fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 1, marginBottom: 8 }}>MODEL NO. 24ACC636A003</div>
        <div style={{ fontFamily: T3.mono, fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 1, marginBottom: 8 }}>SERIAL 1912E47821</div>
        <div style={{ fontFamily: T3.mono, fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>MFR DATE 03/2012 · 3.0 TON</div>
        <div className="w3-scanline" style={{ position: "absolute", left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #A78BFA, transparent)", boxShadow: "0 0 16px #7C3AED" }} />
      </div>
      <div style={{ fontFamily: T3.sans, fontSize: 18, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>Identifying the unit</div>
      <div key={stage} className="t3-in" style={{ fontFamily: T3.sans, fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 10, textAlign: "center" }}>{stages[stage]}</div>
      <style>{`@keyframes w3scan { 0%{top:8%} 100%{top:88%} } .w3-scanline { animation: w3scan 1.4s ease-in-out infinite alternate; }`}</style>
    </div>
  );

  return (
    <div data-screen-label="Unit logged" className="t3-screen" style={{ position: "absolute", inset: 0, background: "white", overflowY: "auto", padding: "70px 26px 40px" }}>
      <div style={{ textAlign: "center" }}>
        <div className="t3-in" style={{ width: 54, height: 54, borderRadius: 27, background: "#F2EAFE", border: "1px solid #DDD0F8", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
          <I3 name="thermo" size={25} color="#7C3AED" strokeWidth={1.8} />
        </div>
        <h1 style={{ fontFamily: T3.sans, fontSize: 26, fontWeight: 800, color: T3.ink, letterSpacing: "-0.03em", margin: 0 }}>Logged to your Vault.</h1>
        <p style={{ fontFamily: T3.sans, fontSize: 14.5, lineHeight: 1.55, color: T3.ink2, marginTop: 8, maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>
          One photo of the nameplate — here's everything AI pulled from it.
        </p>
      </div>

      <div style={{ background: T3.surface, borderRadius: 18, padding: "18px 18px 8px", margin: "24px 0 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "#F2EAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I3 name="thermo" size={17} color="#7C3AED" />
          </div>
          <div>
            <div style={{ fontFamily: T3.sans, fontSize: 14.5, fontWeight: 700, color: T3.ink }}>Central AC — Carrier</div>
            <div style={{ fontFamily: T3.sans, fontSize: 12, color: T3.muted }}>Filed under Systems</div>
          </div>
        </div>
        {[
          ["Model", "24ACC636A003 · serial 1912E47821"],
          ["Age", "14 years (mfr. Mar 2012) — at typical lifespan"],
          ["Capacity", "3.0 tons"],
          ["Recalls", "None found — monitored going forward"],
          ["Warranty", "Expired 2022 — repairs are out-of-pocket"],
        ].map(([k, v], i) => (
          <div key={k} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: `1px solid ${T3.border}` }}>
            <span style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.muted, width: 70, flexShrink: 0, fontWeight: 600 }}>{k}</span>
            <span style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink, lineHeight: 1.45 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 11, background: T3.amberBg, border: `1px solid ${T3.amberBd}`, borderRadius: 13, padding: "12px 15px", marginBottom: 20 }}>
        <I3 name="clock" size={16} color={T3.amberInk} style={{ flexShrink: 0, marginTop: 1 }} />
        <span style={{ fontFamily: T3.sans, fontSize: 12.5, color: T3.amberInk, lineHeight: 1.5 }}><b>Heads up:</b> units this age often benefit from a pre-summer inspection. Want a quote?</span>
      </div>

      <Btn onClick={() => go("vault")}>See it in my Vault <I3 name="arrowR" size={18} color="white" /></Btn>
      <div style={{ textAlign: "center", marginTop: 13 }}>
        <button onClick={() => go("capture")} style={{ background: "none", border: "none", fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, color: T3.ink2, cursor: "pointer" }}>Log another unit</button>
      </div>
    </div>
  );
}

Object.assign(window, { W3CaptureHub, W3Snap, W3FixChat, W3Capture3D, W3DesignChat, W3DesignRender, W3DesignShop, W3NameplateResult, CAP_MODES });
