// TrustyPro v3 — tokens, icons, core components
// "Concierge calm": indigo primary, white + soft neutral surfaces, Inter, big friendly headings.

const T3 = {
  // color
  bg: "#FFFFFF",
  surface: "#F6F6FB",
  surface2: "#EFEFF7",
  ink: "#14122B",
  ink2: "#4D4A6A",
  muted: "#9794B0",
  indigo: "var(--tp-accent, #4F46E5)",
  indigoDeep: "#3B34B8",
  tint: "var(--tp-tint, #EEF0FE)",
  tintBorder: "var(--tp-tint-bd, #DBDDFA)",
  border: "#E8E7F2",
  borderSubtle: "#F2F1F8",
  green: "#0E9F6E",
  greenBg: "#EAFAF3",
  greenBd: "#B5EBD4",
  greenInk: "#066E4C",
  amber: "#D97706",
  amberBg: "#FEF5E7",
  amberBd: "#F8DFB6",
  amberInk: "#92400E",
  orange: "#EA580C",
  orangeBg: "#FFF1E7",
  orangeBd: "#FBD7BC",
  red: "#DC2626",
  redBg: "#FEECEC",
  redBd: "#F9C6C6",
  redInk: "#B91C1C",
  // type
  sans: '"Inter", -apple-system, "SF Pro Display", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
  // shadow
  rest: "0 1px 3px rgba(20,18,43,0.05)",
  lift: "0 6px 20px rgba(20,18,43,0.09)",
  fab: "0 10px 28px rgba(20,18,43,0.18)",
};

// ─────────────────────────────────────────────────────────────
// Icons — Lucide-style, 1.5 stroke
// ─────────────────────────────────────────────────────────────
function I3({ name, size = 20, color = "currentColor", strokeWidth = 1.5, style }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", style };
  const p = {
    home:        <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z"/>,
    camera:      <React.Fragment><path d="M14.5 4h-5L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4l-1.5-2z"/><circle cx="12" cy="13" r="4"/></React.Fragment>,
    shield:      <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/>,
    shieldCheck: <React.Fragment><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="M9 11.5l2 2 4-4.5"/></React.Fragment>,
    user:        <React.Fragment><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></React.Fragment>,
    wrench:      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
    chevR:       <path d="M9 18l6-6-6-6"/>,
    chevL:       <path d="M15 18l-6-6 6-6"/>,
    chevD:       <path d="M6 9l6 6 6-6"/>,
    x:           <path d="M18 6L6 18M6 6l12 12"/>,
    plus:        <path d="M12 5v14M5 12h14"/>,
    search:      <React.Fragment><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></React.Fragment>,
    check:       <path d="M20 6L9 17l-5-5"/>,
    checkC:      <React.Fragment><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></React.Fragment>,
    clock:       <React.Fragment><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></React.Fragment>,
    bell:        <React.Fragment><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></React.Fragment>,
    zap:         <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
    thermo:      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>,
    droplet:     <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/>,
    sparkles:    <path d="M12 3l2.09 6.26L20 12l-5.91 2.74L12 21l-2.09-6.26L4 12l5.91-2.74L12 3z"/>,
    arrowR:      <path d="M5 12h14M13 5l7 7-7 7"/>,
    mapPin:      <React.Fragment><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></React.Fragment>,
    sofa:        <React.Fragment><path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z"/></React.Fragment>,
    bed:         <React.Fragment><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20"/><circle cx="8" cy="11" r="2"/></React.Fragment>,
    bath:        <path d="M9 6l-2-2H4a2 2 0 0 0-2 2v8a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-2H2"/>,
    utensils:    <path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zM18 22v-7"/>,
    fridge:      <React.Fragment><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 10h14M9 6v2M9 14v3"/></React.Fragment>,
    flame:       <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>,
    file:        <React.Fragment><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></React.Fragment>,
    download:    <React.Fragment><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></React.Fragment>,
    settings:    <React.Fragment><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></React.Fragment>,
    gift:        <React.Fragment><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></React.Fragment>,
    eye:         <React.Fragment><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></React.Fragment>,
    flash:       <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
    history:     <React.Fragment><path d="M3 12a9 9 0 1 0 2.64-6.36L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></React.Fragment>,
    grid:        <React.Fragment><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></React.Fragment>,
    phone:       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>,
    message:     <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>,
    tag:         <React.Fragment><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/></React.Fragment>,
    car:         <React.Fragment><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h3"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></React.Fragment>,
    paint:       <React.Fragment><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/><path d="M14.5 17.5 4.5 15"/></React.Fragment>,
    ruler:       <React.Fragment><path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m7.5 10.5 2 2M10.5 7.5l2 2M13.5 4.5l2 2M4.5 13.5l2 2"/></React.Fragment>,
    hammer:      <React.Fragment><path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h.86c.85 0 1.65.34 2.25.93l1.25 1.25"/></React.Fragment>,
    leaf:        <React.Fragment><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></React.Fragment>,
    bug:         <React.Fragment><path d="M12 20c-3.3 0-6-2.7-6-6v-3a6 6 0 0 1 12 0v3c0 3.3-2.7 6-6 6Z"/><path d="M12 20v-9"/><path d="m8 3 1.5 2M16 3l-1.5 2"/><path d="M6.5 10H3M21 10h-3.5M6 16H3M21 16h-3"/></React.Fragment>,
    window:      <React.Fragment><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18M12 3v18"/></React.Fragment>,
    door:        <React.Fragment><path d="M13 4h3a2 2 0 0 1 2 2v14M2 20h20M11 4H8a2 2 0 0 0-2 2v14M10 12v.01"/></React.Fragment>,
    sun:         <React.Fragment><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></React.Fragment>,
    key:         <React.Fragment><circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.6-9.6M16.5 4.5l3 3"/></React.Fragment>,
    waves:       <React.Fragment><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/></React.Fragment>,
    broom:       <React.Fragment><path d="m13 11 5-5M11 13l-5 5M19 5l-2 2M3 21l4-4M7.5 13.5 3 18l3 3 4.5-4.5M14 10l-4 4"/></React.Fragment>,
    send:        <React.Fragment><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></React.Fragment>,
    bag:         <React.Fragment><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></React.Fragment>,
    trash:       <React.Fragment><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></React.Fragment>,
    cube:        <React.Fragment><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></React.Fragment>,
    rotate:      <React.Fragment><path d="M16.5 9.4 7.5 4.21M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7 12 12l8.7-5"/></React.Fragment>,
    minus:       <path d="M5 12h14"/>,
    plusC:       <React.Fragment><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></React.Fragment>,
    sliders:     <React.Fragment><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></React.Fragment>,
    layers:      <React.Fragment><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></React.Fragment>,
    image:       <React.Fragment><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></React.Fragment>,
    scan3d:      <React.Fragment><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="m12 8 4 2.3v4.4L12 17l-4-2.3v-4.4L12 8z"/></React.Fragment>,
    wand:        <React.Fragment><path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M15 9h0M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5"/></React.Fragment>,
    folder:      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>,
    archive:     <React.Fragment><rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/></React.Fragment>,
    wifi:        <React.Fragment><path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 9.5a15 15 0 0 1 20 0"/><circle cx="12" cy="20" r="1"/></React.Fragment>,
    receipt:     <React.Fragment><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"/><path d="M16 8h-6M16 12h-6M10 16h-2"/></React.Fragment>,
    fileCheck:   <React.Fragment><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/></React.Fragment>,
  };
  return <svg {...props}>{p[name] || null}</svg>;
}

// ─────────────────────────────────────────────────────────────
// useCountUp — animate a number rising
// ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1100, start = 0, delay = 250) {
  const [val, setVal] = React.useState(start);
  React.useEffect(() => {
    let raf, t0;
    const from = start;
    const tick = (t) => {
      if (!t0) t0 = t;
      const k = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [target]);
  return val;
}

// ─────────────────────────────────────────────────────────────
// HealthScoreRing — premium gauge: gradient arc, tick marks, count-up
// ─────────────────────────────────────────────────────────────
function HealthScoreRing({ score, size = 180, stroke = 12, animate = true, label = true }) {
  const shown = animate ? useCountUp(score) : score;
  const r = (size - stroke - 8) / 2;
  const cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  // 270° arc, gap at bottom
  const arcFrac = 0.75;
  const arcLen = circ * arcFrac;
  const filled = (shown / 100) * arcLen;
  const rot = 135; // start at bottom-left
  const status = score >= 80 ? "Excellent" : score >= 60 ? "Strong" : score >= 35 ? "Building" : "Just started";
  const gid = React.useMemo(() => "g" + Math.random().toString(36).slice(2, 8), []);
  // tick marks along the arc
  const ticks = [];
  for (let i = 0; i <= 20; i++) {
    const a = ((135 + 270 * (i / 20)) * Math.PI) / 180;
    const r1 = r + stroke / 2 + 3, r2 = r1 + 3;
    ticks.push(<line key={i} x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)} x2={cx + r2 * Math.cos(a)} y2={cy + r2 * Math.sin(a)} stroke={T3.border} strokeWidth={1.5} />);
  }
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gid} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--tp-accent, #4F46E5)" stopOpacity="0.72" />
            <stop offset="100%" stopColor="var(--tp-accent, #4F46E5)" stopOpacity="1" />
          </linearGradient>
        </defs>
        {ticks}
        <circle cx={cx} cy={cy} r={r} stroke={T3.surface2} strokeWidth={stroke} fill="none"
          strokeDasharray={`${arcLen} ${circ}`} strokeLinecap="round" transform={`rotate(${rot} ${cx} ${cy})`} />
        <circle cx={cx} cy={cy} r={r} stroke={`url(#${gid})`} strokeWidth={stroke} fill="none"
          strokeDasharray={`${Math.max(filled, 0.001)} ${circ}`} strokeLinecap="round" transform={`rotate(${rot} ${cx} ${cy})`} />
      </svg>
      {label && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: T3.sans, fontSize: size * 0.27, fontWeight: 800, color: T3.ink, lineHeight: 1, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>{shown}</div>
          <div style={{ fontFamily: T3.sans, fontSize: size * 0.072, color: T3.muted, marginTop: 4, fontWeight: 500 }}>of 100</div>
          <div style={{ fontFamily: T3.sans, fontSize: size * 0.078, color: T3.indigo, marginTop: 6, fontWeight: 700 }}>{status}</div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Img — photo with graceful gradient fallback if URL fails
// ─────────────────────────────────────────────────────────────
function Img({ src, h = 200, radius = 0, label, style, children, dim = 0 }) {
  const [err, setErr] = React.useState(false);
  return (
    <div style={{ width: "100%", height: h, borderRadius: radius, overflow: "hidden", position: "relative", background: "linear-gradient(135deg, #E4E0D5 0%, #CCC3B0 60%, #A89878 100%)", ...style }}>
      {!err && src && <img src={src} onError={() => setErr(true)} alt={label || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
      {dim > 0 && <div style={{ position: "absolute", inset: 0, background: `rgba(20,18,43,${dim})` }} />}
      {label && (
        <div style={{ position: "absolute", bottom: 10, left: 12, fontFamily: T3.mono, fontSize: 9.5, color: "rgba(255,255,255,0.95)", letterSpacing: 0.8, textTransform: "uppercase", background: "rgba(20,18,43,0.45)", padding: "3px 8px", borderRadius: 5, backdropFilter: "blur(4px)" }}>{label}</div>
      )}
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Buttons & chips
// ─────────────────────────────────────────────────────────────
function Btn({ children, onClick, kind = "primary", full = true, size = "lg", style }) {
  const base = {
    width: full ? "100%" : "auto",
    border: "none", cursor: "pointer",
    fontFamily: T3.sans, fontWeight: 600,
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    transition: "transform 120ms ease, box-shadow 120ms ease",
    borderRadius: size === "lg" ? 16 : 12,
    padding: size === "lg" ? "17px 22px" : "11px 16px",
    fontSize: size === "lg" ? 16 : 13.5,
  };
  const kinds = {
    primary: { background: T3.indigo, color: "white", boxShadow: T3.fab },
    dark:    { background: T3.ink, color: "white" },
    soft:    { background: T3.tint, color: T3.indigo },
    ghost:   { background: "white", color: T3.ink, border: `1.5px solid ${T3.border}` },
  };
  return <button onClick={onClick} style={{ ...base, ...kinds[kind], ...style }}>{children}</button>;
}

function Chip({ children, style }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 11px", borderRadius: 9, background: T3.surface, border: `1px solid ${T3.border}`, fontFamily: T3.sans, fontSize: 12, fontWeight: 500, color: T3.ink2, ...style }}>{children}</span>;
}

const SEV3 = {
  low:    { label: "Low",    ink: T3.greenInk, bg: T3.greenBg, bd: T3.greenBd, dot: T3.green },
  medium: { label: "Medium", ink: T3.amberInk, bg: T3.amberBg, bd: T3.amberBd, dot: T3.amber },
  high:   { label: "High",   ink: "#9A3412",   bg: T3.orangeBg, bd: T3.orangeBd, dot: T3.orange },
  urgent: { label: "Urgent", ink: T3.redInk,   bg: T3.redBg,   bd: T3.redBd,   dot: T3.red },
};

function SevBadge({ severity }) {
  const s = SEV3[severity] || SEV3.low;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 999, background: s.bg, border: `1px solid ${s.bd}`, color: s.ink, fontFamily: T3.sans, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, background: s.dot }} />{s.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// FindingCard — detected issue: category, severity, description, trade, cost
// ─────────────────────────────────────────────────────────────
function FindingCard({ finding, onAction, requested }) {
  const s = SEV3[finding.severity] || SEV3.low;
  return (
    <div style={{ background: "white", border: `1px solid ${T3.border}`, borderRadius: 18, overflow: "hidden", boxShadow: T3.rest }}>
      {finding.photo && (
        <Img src={finding.photo} h={110} dim={0.06}>
          <div style={{ position: "absolute", top: 10, left: 10 }}><SevBadge severity={finding.severity} /></div>
        </Img>
      )}
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: T3.sans, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: T3.muted }}>{finding.category}</div>
            <div style={{ fontFamily: T3.sans, fontSize: 15.5, fontWeight: 700, color: T3.ink, marginTop: 3, lineHeight: 1.25, letterSpacing: "-0.01em" }}>{finding.title}</div>
          </div>
          {!finding.photo && <SevBadge severity={finding.severity} />}
        </div>
        <div style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink2, lineHeight: 1.5, marginTop: 7 }}>{finding.description}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          <Chip><I3 name="wrench" size={12} color={T3.muted} />{finding.trade}</Chip>
          <Chip>Est. {finding.costRange}</Chip>
        </div>
        {requested ? (
          <div style={{ marginTop: 13, display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", background: T3.greenBg, border: `1px solid ${T3.greenBd}`, borderRadius: 11 }}>
            <I3 name="checkC" size={16} color={T3.green} />
            <span style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 600, color: T3.greenInk }}>Quote requested — matching you now</span>
          </div>
        ) : (
          <button onClick={onAction} style={{ marginTop: 13, width: "100%", background: T3.tint, color: T3.indigo, border: "none", borderRadius: 11, padding: "12px 14px", fontFamily: T3.sans, fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            Get a quote — free <I3 name="arrowR" size={15} color={T3.indigo} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// StatusTimeline — Submitted → Matching → Pro Assigned
// ─────────────────────────────────────────────────────────────
function StatusTimeline({ steps, current }) {
  return (
    <div>
      {steps.map((st, i) => {
        const done = i < current, active = i === current;
        return (
          <div key={st.title} style={{ display: "flex", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 30, height: 30, borderRadius: 15, flexShrink: 0, background: done ? T3.indigo : "white", border: `2px solid ${done || active ? T3.indigo : T3.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 300ms" }}>
                {done ? <I3 name="check" size={15} color="white" strokeWidth={2.5} /> : <div className={active ? "t3-ping" : ""} style={{ width: 9, height: 9, borderRadius: 5, background: active ? T3.indigo : T3.border }} />}
              </div>
              {i < steps.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 30, background: done ? T3.indigo : T3.border, margin: "3px 0", transition: "background 300ms" }} />}
            </div>
            <div style={{ paddingBottom: 24, paddingTop: 4 }}>
              <div style={{ fontFamily: T3.sans, fontSize: 15, fontWeight: done || active ? 700 : 500, color: done || active ? T3.ink : T3.muted }}>{st.title}</div>
              {st.sub && <div style={{ fontFamily: T3.sans, fontSize: 13, color: T3.ink2, marginTop: 3, lineHeight: 1.45 }}>{st.sub}</div>}
              {active && st.live && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 8, background: T3.tint, borderRadius: 999, padding: "5px 12px" }}>
                  <span className="t3-ping" style={{ width: 7, height: 7, borderRadius: 4, background: T3.indigo }} />
                  <span style={{ fontFamily: T3.sans, fontSize: 12, color: T3.indigo, fontWeight: 600 }}>{st.live}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section header + misc
// ─────────────────────────────────────────────────────────────
function Sect({ label, action, style }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 13, ...style }}>
      <div style={{ fontFamily: T3.sans, fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em", color: T3.ink }}>{label}</div>
      {action}
    </div>
  );
}

function BackBtn({ onClick, light }) {
  return (
    <button onClick={onClick} style={{ width: 40, height: 40, borderRadius: 20, background: light ? "rgba(255,255,255,0.92)" : T3.surface, border: light ? "none" : `1px solid ${T3.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
      <I3 name="chevL" size={20} color={T3.ink} />
    </button>
  );
}

// Shared keyframes injected once
function T3Styles() {
  return (
    <style>{`
      @keyframes t3ping { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.35)} }
      .t3-ping { animation: t3ping 1.3s ease-in-out infinite; }
      @keyframes t3in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      .t3-in { animation: t3in 360ms cubic-bezier(0.2,0.7,0.3,1) both; }
      @keyframes t3shimmer { 0% { background-position: -200px 0; } 100% { background-position: 200px 0; } }
      .t3-shimmer { background: linear-gradient(90deg, #EFEFF7 25%, #E2E1F0 50%, #EFEFF7 75%); background-size: 400px 100%; animation: t3shimmer 1.1s linear infinite; }
      .t3-screen::-webkit-scrollbar { display: none; }
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────
// TrustyPro logo — the real brand asset (transparent PNGs)
// ─────────────────────────────────────────────────────────────
function TrustyMark({ size = 28, style }) {
  return <img src="trustypro-mark.png" alt="TrustyPro" style={{ height: size, width: "auto", display: "block", ...style }} />;
}

function TrustyLockup({ height = 24, white = false, style }) {
  return <img src={white ? "trustypro-logo-white.png" : "trustypro-logo.png"} alt="TrustyPro" style={{ height, width: "auto", display: "block", ...style }} />;
}

Object.assign(window, { T3, I3, useCountUp, HealthScoreRing, Img, Btn, Chip, SEV3, SevBadge, FindingCard, StatusTimeline, Sect, BackBtn, T3Styles, TrustyMark, TrustyLockup });
