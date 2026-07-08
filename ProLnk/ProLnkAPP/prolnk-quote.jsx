// prolnk-quote.jsx — Send Quote flow + Confetti + CountUp + Notifications panel
const { useState: useQ, useEffect: useEQ, useRef: useRQ } = React;

// ── animated count-up money ──
function CountUp({ value, style, duration = 900 }) {
  const [n, setN] = useQ(0);
  useEQ(() => {
    const start = Date.now();
    setN(0);
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / duration);
      const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(Math.round(value * e));
      if (p >= 1) clearInterval(id);
    }, 33);
    return () => clearInterval(id);
  }, [value]);
  return <span style={{ fontVariantNumeric: 'tabular-nums', ...style }}>${n.toLocaleString('en-US')}</span>;
}

// ── confetti burst (brand colors, CSS-driven) ──
function ConfettiBurst({ fireKey }) {
  if (!fireKey) return null;
  const colors = ['#0D9488', '#5EEAD4', '#16A34A', '#FBBF24', '#0F172A', '#99F6E4'];
  const pieces = Array.from({ length: 30 }, (_, i) => {
    const ang = (i / 30) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 90 + Math.random() * 150;
    return {
      tx: Math.cos(ang) * dist, ty: Math.sin(ang) * dist - 110 - Math.random() * 110,
      rr: (Math.random() * 540 - 270) + 'deg', c: colors[i % colors.length],
      w: 7 + Math.random() * 5, h: 9 + Math.random() * 7, d: Math.random() * 0.12,
      round: Math.random() > 0.6,
    };
  });
  return (
    <div key={fireKey} style={{ position: 'absolute', inset: 0, zIndex: 300, pointerEvents: 'none', overflow: 'hidden' }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: '50%', top: '46%', width: p.w, height: p.h,
          background: p.c, borderRadius: p.round ? 99 : 2,
          '--tx': p.tx + 'px', '--ty': p.ty + 'px', '--rr': p.rr,
          animation: `plconfetti 1.25s cubic-bezier(.16,.8,.4,1) ${p.d}s forwards`,
          opacity: 0,
        }} />
      ))}
    </div>
  );
}

// ── notifications panel (slides from top) ──
function NotifPanel({ open, items, onClose, onClear }) {
  if (!open) return null;
  const toneMap = { green: [PL.green, PL.greenBg], teal: [PL.teal, PL.tealBg], amber: [PL.amber, PL.amberBg], slate: [PL.slate3, '#F1F5F9'] };
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 150 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.35)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: '#fff', borderRadius: '0 0 26px 26px', paddingTop: 56, boxShadow: '0 16px 48px rgba(15,23,42,0.25)', maxHeight: '78%', overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 20px 10px' }}>
          <span style={{ fontSize: 19, fontWeight: 800, color: PL.ink }}>Activity</span>
          <button onClick={onClear} style={{ border: 'none', background: 'none', color: PL.teal, fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: 4 }}>Mark all read</button>
        </div>
        <div style={{ padding: '0 16px 16px' }}>
          {items.length === 0 && <div style={{ textAlign: 'center', padding: '28px 0', fontSize: 13.5, color: PL.faint }}>You’re all caught up.</div>}
          {items.map((n, i) => {
            const [fg, bg] = toneMap[n.tone] || toneMap.slate;
            return (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 6px', borderBottom: i === items.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={n.icon || 'bell'} size={18} color={fg} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: PL.ink, lineHeight: 1.3 }}>{n.title}{n.unread && <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 99, background: PL.teal, marginLeft: 7, verticalAlign: '2px' }} />}</div>
                  {n.sub && <div style={{ fontSize: 12.5, color: PL.muted, marginTop: 2, lineHeight: 1.4 }}>{n.sub}</div>}
                </div>
                <span style={{ fontSize: 11.5, color: PL.faint, fontWeight: 600, flexShrink: 0 }}>{n.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// VISIT SCHEDULER — book the site review before quoting
// ════════════════════════════════════════════════════════════
const VISIT_DAYS = ['Today', 'Tomorrow', 'Wed 9', 'Thu 10'];
const VISIT_WINDOWS = ['8–10 AM', '10–12 PM', '1–3 PM', '3–5 PM'];

function VisitScheduler({ job, onBack, onBooked, onQuoteNow }) {
  const [day, setDay] = useQ('Tomorrow');
  const [win, setWin] = useQ('8–10 AM');
  const [booked, setBooked] = useQ(false);

  if (booked) return (
    <Screen bg="#fff">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 32px', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: 26, background: PL.tealBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}><Ic name="clock" size={38} color={PL.teal} /></div>
        <div style={{ fontSize: 25, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', marginBottom: 10 }}>Visit booked</div>
        <div style={{ fontSize: 14.5, color: PL.muted, lineHeight: 1.6, maxWidth: 300 }}>{job.homeowner} is confirmed for <b style={{ color: PL.ink }}>{day}, {win}</b>. Walk the job, take your photos — then build your quote from what you actually saw.</div>
      </div>
      <div style={{ padding: '12px 20px 36px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        <Btn tone="teal" full size="lg" onClick={onQuoteNow}><Ic name="bolt" size={17} fill color="#fff" />Reviewed it — build my quote</Btn>
        <Btn tone="ghost" full onClick={onBack}>Back to jobs</Btn>
      </div>
    </Screen>
  );

  return (
    <Screen bg="#fff">
      <Header onBack={onBack} sub={`${job.id} · ${job.homeowner}`} title="Schedule your site visit" />
      <Body style={{ padding: '16px 16px 130px' }}>
        <Card style={{ marginBottom: 16, background: PL.bg }}>
          <div style={{ fontSize: 15.5, fontWeight: 800, color: PL.ink, lineHeight: 1.25, marginBottom: 5 }}>{job.title}</div>
          <div style={{ fontSize: 12.5, color: PL.muted, display: 'flex', alignItems: 'center', gap: 6 }}><Ic name="pin" size={14} color={PL.faint} />{job.address}</div>
        </Card>

        <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', background: PL.tealBg, border: `1px solid ${PL.tealSoft}`, borderRadius: 12, padding: '12px 14px', marginBottom: 20 }}>
          <Ic name="spark" size={16} color={PL.teal} style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 13, color: PL.tealDark, fontWeight: 600, lineHeight: 1.5 }}>See it before you price it. Book a time with {job.homeowner} to walk the job — your quote comes after the review.</span>
        </div>

        <SectionLabel>Pick a day</SectionLabel>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {VISIT_DAYS.map(d => (
            <button key={d} onClick={() => setDay(d)} style={{ padding: '10px 15px', borderRadius: 12, border: `1.5px solid ${day === d ? PL.teal : PL.border}`, background: day === d ? PL.tealBg : '#fff', fontSize: 13.5, fontWeight: 700, color: day === d ? PL.tealDark : PL.slate3, cursor: 'pointer' }}>{d}</button>
          ))}
        </div>

        <SectionLabel>Arrival window</SectionLabel>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {VISIT_WINDOWS.map(w => (
            <button key={w} onClick={() => setWin(w)} style={{ padding: '10px 15px', borderRadius: 12, border: `1.5px solid ${win === w ? PL.teal : PL.border}`, background: win === w ? PL.tealBg : '#fff', fontSize: 13.5, fontWeight: 700, color: win === w ? PL.tealDark : PL.slate3, cursor: 'pointer' }}>{w}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 7, fontSize: 12.5, color: PL.faint, lineHeight: 1.5 }}><Ic name="shield" size={15} color={PL.faint} style={{ flexShrink: 0, marginTop: 1 }} />{job.homeowner} confirms in-app. If the time stops working, reschedule from the job — never by phone.</div>
      </Body>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 16px 30px', background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${PL.border}`, zIndex: 20 }}>
        <Btn tone="teal" full size="lg" onClick={() => { setBooked(true); onBooked(job.id, day, win); }}><Ic name="clock" size={18} color="#fff" />Book visit · {day}, {win}</Btn>
      </div>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// QUOTE COMPOSER — the pro sets THEIR price
// ════════════════════════════════════════════════════════════
const QUOTE_CHIPS = [
  { name: 'Trip fee', price: 49 },
  { name: 'Haul away & disposal', price: 35 },
  { name: 'Permit handling', price: 120 },
  { name: 'After-hours surcharge', price: 75 },
];
const QUOTE_WINDOWS = ['Today PM', 'Tomorrow AM', 'Tomorrow PM', 'This week'];

function QuoteComposer({ job, onBack, onSend }) {
  const est = job.estLow && job.estHigh ? `$${fmt(job.estLow)}–$${fmt(job.estHigh)}` : null;
  const [items, setItems] = useQ(() => [
    { name: 'Labor — diagnosis & repair', price: Math.round((job.pay || 300) * 0.65 / 5) * 5 },
    { name: 'Parts & materials', price: Math.round((job.pay || 300) * 0.35 / 5) * 5 },
  ]);
  const [win, setWin] = useQ('Tomorrow AM');
  const [sent, setSent] = useQ(false);
  const [scanning, setScanning] = useQ(false);
  const [scanned, setScanned] = useQ(false);
  const total = items.reduce((s, x) => s + x.price, 0);
  const fee = Math.round(total * JOB_FEE);

  const aiTakeoff = () => {
    setScanning(true);
    setTimeout(() => {
      setItems([
        { name: 'Labor — access, cut-out & repair', price: Math.round((job.pay || 300) * 0.55 / 5) * 5 },
        { name: 'Parts — PEX-A, fittings, shutoff', price: Math.round((job.pay || 300) * 0.3 / 5) * 5 },
        { name: 'Insulation wrap — exposed runs', price: 45 },
        { name: 'Trip fee', price: 49 },
      ]);
      setScanning(false); setScanned(true);
    }, 1600);
  };

  const bump = (i, d) => setItems(p => p.map((x, j) => j === i ? { ...x, price: Math.max(0, x.price + d) } : x));
  const remove = (i) => setItems(p => p.filter((_, j) => j !== i));
  const addChip = (c) => setItems(p => [...p, { ...c }]);

  if (sent) return (
    <Screen bg={PL.slate}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: 260, height: 260, borderRadius: 99, background: 'radial-gradient(circle, rgba(13,148,136,0.4), transparent 70%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ width: 84, height: 84, borderRadius: 26, background: PL.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 12px 40px rgba(13,148,136,0.5)' }}><Ic name="check" size={44} color="#fff" sw={2.6} /></div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>Quote sent</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 300, margin: '0 auto 18px' }}><b style={{ color: '#5EEAD4' }}>{job.homeowner}</b> just got your quote for <b style={{ color: '#fff' }}>${fmt(total)}</b> · {win}. We’ll ping you the second they respond.</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 99, padding: '8px 16px', fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: '#FBBF24', animation: 'plpulse 1.4s infinite' }} />Awaiting homeowner response
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 20px 36px' }}>
        <Btn tone="teal" full size="lg" onClick={onBack}>Back to jobs <Ic name="chevR" size={18} color="#fff" /></Btn>
      </div>
    </Screen>
  );

  return (
    <Screen bg="#fff">
      <Header onBack={onBack} sub={`${job.id} · ${job.homeowner}`} title="Send your quote" />
      <Body style={{ padding: '16px 16px 150px' }}>
        {/* referral summary */}
        <Card style={{ marginBottom: 16, background: PL.bg }}>
          <div style={{ fontSize: 15.5, fontWeight: 800, color: PL.ink, lineHeight: 1.25, marginBottom: 5 }}>{job.title}</div>
          <div style={{ fontSize: 12.5, color: PL.muted, display: 'flex', alignItems: 'center', gap: 6 }}><Ic name="pin" size={14} color={PL.faint} />{job.address}</div>
          {est && <div style={{ fontSize: 12, color: PL.teal, fontWeight: 700, marginTop: 7 }}>Similar jobs nearby: {est} — but this is <b>your price</b>.</div>}
        </Card>

        {/* line items */}
        <SectionLabel>Your line items</SectionLabel>
        <button onClick={aiTakeoff} disabled={scanning} style={{ width: '100%', marginBottom: 10, padding: '13px 15px', borderRadius: 13, cursor: scanning ? 'default' : 'pointer', border: '1.5px solid #DDD6FE', background: 'linear-gradient(120deg, #F5F3FF, #EDE9FE)', display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left' }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
            {scanning && <div style={{ position: 'absolute', inset: -3, borderRadius: 12, border: '2.5px solid #DDD6FE', borderTopColor: '#7C3AED', animation: 'plspin .8s linear infinite' }} />}
            <Ic name="spark" size={18} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: '#5B21B6' }}>{scanning ? 'Scanning photos & measurements…' : scanned ? 'AI takeoff applied — adjust below' : 'AI takeoff — build from photos & scan'}</div>
            <div style={{ fontSize: 11.5, color: '#7C3AED', marginTop: 1, fontWeight: 600 }}>{scanning ? 'Material list + labor estimate' : 'Auto-fills materials & labor · you stay in control'}</div>
          </div>
        </button>
        <Card style={{ padding: '4px 16px', marginBottom: 12 }}>
          {items.map((x, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: i === items.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
              <button onClick={() => remove(i)} style={{ width: 24, height: 24, borderRadius: 8, border: 'none', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><Ic name="x" size={13} color={PL.faint} sw={2.4} /></button>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: PL.ink, lineHeight: 1.3 }}>{x.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
                <button onClick={() => bump(i, -25)} style={qBtn}>−</button>
                <span style={{ fontSize: 15, fontWeight: 800, color: PL.ink, fontVariantNumeric: 'tabular-nums', minWidth: 52, textAlign: 'center' }}>${fmt(x.price)}</span>
                <button onClick={() => bump(i, 25)} style={qBtn}>+</button>
              </div>
            </div>
          ))}
        </Card>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {QUOTE_CHIPS.filter(c => !items.some(x => x.name === c.name)).map(c => (
            <button key={c.name} onClick={() => addChip(c)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 99, border: `1.5px dashed ${PL.border}`, background: '#fff', fontSize: 12.5, fontWeight: 700, color: PL.slate3, cursor: 'pointer' }}>
              <Ic name="plus" size={13} color={PL.teal} sw={2.6} />{c.name} · ${c.price}
            </button>
          ))}
        </div>

        {/* arrival window */}
        <SectionLabel>Arrival window</SectionLabel>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {QUOTE_WINDOWS.map(w => (
            <button key={w} onClick={() => setWin(w)} style={{ padding: '10px 15px', borderRadius: 12, border: `1.5px solid ${win === w ? PL.teal : PL.border}`, background: win === w ? PL.tealBg : '#fff', fontSize: 13.5, fontWeight: 700, color: win === w ? PL.tealDark : PL.slate3, cursor: 'pointer' }}>{w}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 7, fontSize: 12.5, color: PL.faint, lineHeight: 1.5 }}><Ic name="shield" size={15} color={PL.faint} style={{ flexShrink: 0, marginTop: 1 }} />Your price, your terms. ProLnk adds a 2.5% job fee at settlement — never a commission on your labor, never a lead fee.</div>
      </Body>

      {/* sticky total + send */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 16px 30px', background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${PL.border}`, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Quote total · {win}</span>
          <span style={{ fontSize: 26, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>${fmt(total)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 11 }}>
          <span style={{ fontSize: 12, color: PL.faint, fontWeight: 600 }}>you receive <b style={{ color: PL.green }}>${fmt(total - fee)}</b> after the 8% platform fee</span>
        </div>
        <Btn tone="teal" full size="lg" disabled={total === 0 || items.length === 0} onClick={() => { setSent(true); onSend(job.id, total, win); }}><Ic name="bolt" size={18} fill color="#fff" />Send quote to {job.homeowner}</Btn>
      </div>
    </Screen>
  );
}

const qBtn = { width: 28, height: 28, borderRadius: 9, border: `1.5px solid #E5E7EB`, background: '#fff', fontSize: 16, fontWeight: 800, color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, padding: 0 };

Object.assign(window, { QuoteComposer, VisitScheduler, ConfettiBurst, CountUp, NotifPanel });
