// TrustyPro v3 — AI chat: window.claude.complete wrapper + reusable chat thread
// Always works: if the AI helper is unavailable (offline / sandbox), a scripted
// fallback keeps the conversation moving so the prototype never dead-ends.

// ─────────────────────────────────────────────────────────────
// aiComplete — single call, returns string or null on any failure
// Primes persona via a leading user/assistant pair (no system role needed).
// ─────────────────────────────────────────────────────────────
async function aiComplete(persona, history, userText) {
  try {
    if (!window.claude || !window.claude.complete) return null;
    const messages = [
      { role: "user", content: persona },
      { role: "assistant", content: "Understood — I'll keep replies short, warm, and plain-spoken." },
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: "user", content: userText },
    ];
    const out = await window.claude.complete({ messages });
    return (out || "").trim() || null;
  } catch (e) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// TypingDots
// ─────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: "inline-flex", gap: 4, alignItems: "center", padding: "12px 16px" }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{ width: 7, height: 7, borderRadius: 4, background: T3.muted, animation: `t3bounce 1.1s ${i * 0.15}s ease-in-out infinite` }} />
      ))}
      <style>{`@keyframes t3bounce { 0%,80%,100%{transform:translateY(0);opacity:.5} 40%{transform:translateY(-4px);opacity:1} }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ChatBubble
// ─────────────────────────────────────────────────────────────
function ChatBubble({ role, children }) {
  const me = role === "user";
  return (
    <div style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start", marginBottom: 10 }}>
      <div style={{
        maxWidth: "80%", padding: "11px 15px", borderRadius: 18,
        borderBottomRightRadius: me ? 5 : 18, borderBottomLeftRadius: me ? 18 : 5,
        background: me ? T3.indigo : "white",
        color: me ? "white" : T3.ink,
        border: me ? "none" : `1px solid ${T3.border}`,
        fontFamily: T3.sans, fontSize: 14, lineHeight: 1.5, fontWeight: me ? 500 : 400,
        boxShadow: me ? "none" : T3.rest,
      }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AIChat — the reusable thread.
//   persona:   instruction string defining the assistant's role
//   seed:      first assistant message
//   quickReplies: array of suggested user replies (chips) shown until first send
//   fallback(userText, turnIndex): scripted reply when AI is unavailable
//   readyAfter: turns after which the CTA appears
//   cta / onCta: button under the thread when ready
//   headerPhoto: optional image shown pinned at top (the captured photo)
//   headerLabel: caption on the photo
// ─────────────────────────────────────────────────────────────
function AIChat({ persona, seed, quickReplies = [], fallback, readyAfter = 2, cta, onCta, headerPhoto, headerLabel, onBack, title }) {
  const [messages, setMessages] = React.useState([{ role: "assistant", content: seed }]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [turns, setTurns] = React.useState(0);
  const scrollRef = React.useRef(null);
  const userTurns = messages.filter(m => m.role === "user").length;
  const ready = userTurns >= readyAfter;

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  const send = async (text) => {
    const t = (text != null ? text : input).trim();
    if (!t || busy) return;
    setInput("");
    const history = messages;
    const next = [...messages, { role: "user", content: t }];
    setMessages(next);
    setBusy(true);
    const ai = await aiComplete(persona, history, t);
    const reply = ai || (fallback ? fallback(t, turns) : "Got it — thanks for the detail.");
    setTurns(n => n + 1);
    // small delay so the typing indicator reads naturally even when AI is instant
    setTimeout(() => {
      setMessages(m => [...m, { role: "assistant", content: reply }]);
      setBusy(false);
    }, ai ? 200 : 650);
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: T3.surface, display: "flex", flexDirection: "column" }}>
      {/* header */}
      <div style={{ background: "white", borderBottom: `1px solid ${T3.borderSubtle}`, padding: "54px 18px 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0, zIndex: 2 }}>
        {onBack && <BackBtn onClick={onBack} />}
        <div style={{ width: 34, height: 34, borderRadius: 17, background: T3.indigo, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <I3 name="sparkles" size={17} color="white" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: T3.sans, fontSize: 14.5, fontWeight: 700, color: T3.ink }}>{title || "TrustyPro Assistant"}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: T3.green }} />
            <span style={{ fontFamily: T3.sans, fontSize: 11.5, color: T3.muted }}>{busy ? "typing…" : "online"}</span>
          </div>
        </div>
      </div>

      {/* thread */}
      <div ref={scrollRef} className="t3-screen" style={{ flex: 1, overflowY: "auto", padding: "16px 18px 8px" }}>
        {headerPhoto && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <div style={{ width: 150 }}>
              <Img src={headerPhoto} h={110} radius={14} label={headerLabel} />
            </div>
          </div>
        )}
        {messages.map((m, i) => <ChatBubble key={i} role={m.role}>{m.content}</ChatBubble>)}
        {busy && <div style={{ display: "flex", justifyContent: "flex-start" }}><div style={{ background: "white", border: `1px solid ${T3.border}`, borderRadius: 18, borderBottomLeftRadius: 5 }}><TypingDots /></div></div>}

        {ready && !busy && (
          <div className="t3-in" style={{ margin: "8px 0 4px" }}>
            <Btn onClick={onCta}>{cta} <I3 name="arrowR" size={17} color="white" /></Btn>
          </div>
        )}
      </div>

      {/* quick replies */}
      {userTurns === 0 && quickReplies.length > 0 && (
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "8px 18px", flexShrink: 0 }}>
          {quickReplies.map(q => (
            <button key={q} onClick={() => send(q)} style={{ whiteSpace: "nowrap", background: "white", border: `1px solid ${T3.tintBorder}`, color: T3.indigo, borderRadius: 999, padding: "8px 14px", fontFamily: T3.sans, fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>{q}</button>
          ))}
        </div>
      )}

      {/* composer */}
      <div style={{ background: "white", borderTop: `1px solid ${T3.borderSubtle}`, padding: "12px 16px 26px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", background: T3.surface, border: `1px solid ${T3.border}`, borderRadius: 22, padding: "0 6px 0 16px" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Type a message…"
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: T3.sans, fontSize: 14, color: T3.ink, padding: "12px 0" }}
          />
        </div>
        <button onClick={() => send()} disabled={!input.trim() || busy} style={{ width: 44, height: 44, borderRadius: 22, border: "none", background: input.trim() && !busy ? T3.indigo : T3.border, display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() && !busy ? "pointer" : "default", flexShrink: 0, transition: "background 160ms" }}>
          <I3 name="send" size={18} color="white" />
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { aiComplete, AIChat, ChatBubble, TypingDots });
