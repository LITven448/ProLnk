// prolnk-ui.jsx — shared atoms: icons, badges, countdown, money, sparkline, sheet
const { useState, useEffect, useRef } = React;

// ── money formatting (tabular) ──
function fmt(n) { return n.toLocaleString('en-US'); }
function Money({ value, sign = false, className, style }) {
  const s = (value < 0 ? '-' : (sign ? '+' : '')) + '$' + fmt(Math.abs(value));
  return <span style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em', ...style }} className={className}>{s}</span>;
}

// ── icon set (stroke, Lucide-ish) ──
const Icon = ({ d, fill, size = 22, sw = 1.9, color = 'currentColor', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? color : 'none'}
    stroke={fill ? 'none' : color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {typeof d === 'string' ? <path d={d} /> : d}
  </svg>
);
const ICONS = {
  feed: 'M3 5h18M3 12h18M3 19h12',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  earnings: 'M3 17l5-5 4 4 8-9M21 7v5h-5',
  network: <g><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M7.7 7.6 10.6 16M16.3 7.6 13.4 16M8 6h8"/></g>,
  jobs: 'M9 11l3 3 8-8M21 12v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h11',
  scout: <g><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></g>,
  user: <g><circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/></g>,
  clock: <g><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>,
  pin: <g><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.4"/></g>,
  chevR: 'M9 6l6 6-6 6',
  chevL: 'M15 6l-6 6 6 6',
  check: 'M5 12l5 5L20 7',
  x: 'M6 6l12 12M18 6 6 18',
  phone: 'M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L19 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  msg: 'M21 12a8 8 0 0 1-11 7.3L4 21l1.7-6A8 8 0 1 1 21 12Z',
  plus: 'M12 5v14M5 12h14',
  shield: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z',
  spark: 'M12 3v4M12 17v4M5 12H3M21 12h-2M6 6l1.5 1.5M16.5 16.5 18 18M6 18l1.5-1.5M16.5 7.5 18 6',
  arrowUp: 'M12 19V5M6 11l6-6 6 6',
  share: <g><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8 11l8-4M8 13l8 4"/></g>,
  copy: <g><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></g>,
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  gear: <g><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 0 0-1.7-1l-.4-2.6h-4l-.4 2.6a7 7 0 0 0-1.7 1l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5a7 7 0 0 0 .1-1Z"/></g>,
  card: <g><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/></g>,
  star: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z',
  doc: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5',
  wrench: 'M14.5 6a3.5 3.5 0 0 0 4.6 4.6L21 12l-7 7-2-2 1.4-1.9A3.5 3.5 0 0 0 8.8 8.5L4 13l-1-1 7-7 2 2-1.5 1.5',
  flame: 'M12 3c0 3-4 4-4 8a4 4 0 0 0 8 0c0-1.2-.6-2-1.2-2.8C14.4 10 15 12 13.5 13c.6-2-1.5-3-1.5-5 0-2 0-4 0-5Z',
  external: <g><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></g>,
  globe: <g><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></g>,
  lock: <g><rect x="4.5" y="11" width="15" height="10" rx="2.2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></g>,
  arrowDown: 'M12 5v14M6 13l6 6 6-6',
  sliders: <g><path d="M4 8h10M18 8h2M4 16h2M10 16h10"/><circle cx="16" cy="8" r="2.3"/><circle cx="8" cy="16" r="2.3"/></g>,
  search: <g><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></g>,
  award: <g><circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5"/></g>,
  trophy: <g><path d="M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4v1a3 3 0 0 0 3 3M17 5h3v1a3 3 0 0 1-3 3M9 21h6M12 13.5V17"/></g>,
  umbrella: <g><path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Z"/><path d="M12 12v6a2.5 2.5 0 0 0 5 0"/></g>,
  link: <g><path d="M9 15l6-6"/><path d="M11 6l1-1a4 4 0 0 1 6 6l-1 1"/><path d="M13 18l-1 1a4 4 0 0 1-6-6l1-1"/></g>,
  briefcase: <g><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M3 12.5h18"/></g>,
  siren: <g><path d="M6 18v-5a6 6 0 0 1 12 0v5"/><rect x="4" y="18" width="16" height="3" rx="1.5"/><path d="M12 3v2M4.5 6.5L6 8M19.5 6.5L18 8"/></g>,
  building: <g><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/><path d="M10 21v-3h4v3"/></g>,
  crown: <g><path d="M3 17h18l-1.5-9-4.5 3.5L12 5l-3 6.5L4.5 8Z"/><path d="M5 20h14"/></g>,
  storm: <g><path d="M17 16a4.5 4.5 0 0 0-.9-8.9A6 6 0 0 0 4.7 9.2 3.8 3.8 0 0 0 6 16"/><path d="M12 11l-2.5 4h4L11 19.5"/></g>,
};
const Ic = ({ name, ...p }) => <Icon d={ICONS[name]} fill={['user','jobs','network','scout','clock','pin','share','copy','card','gear'].includes(name) ? false : false} {...p} />;

// ── pill badge ──
function Badge({ children, tone = 'slate', solid = false, style }) {
  const map = {
    slate: ['#64748B', '#F1F5F9'], teal: ['#0D9488', '#CCFBF1'],
    green: ['#16A34A', '#DCFCE7'], amber: ['#B45309', '#FEF3C7'],
    red: ['#DC2626', '#FEE2E2'], purple: ['#7C3AED', '#EDE9FE'],
  };
  const [fg, bg] = map[tone] || map.slate;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 11.5, fontWeight: 700, letterSpacing: '0.02em',
      padding: '4px 9px', borderRadius: 7, lineHeight: 1.1,
      color: solid ? '#fff' : fg, background: solid ? fg : bg, whiteSpace: 'nowrap',
      textTransform: 'uppercase', ...style,
    }}>{children}</span>
  );
}

// ── live countdown badge ──
function Countdown({ minutes, compact = false }) {
  const [secs, setSecs] = useState(minutes * 60);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
  const urgent = secs < 3600;
  const warn = secs < 6 * 3600;
  const tone = urgent ? PL.red : warn ? PL.amber : PL.slate3;
  const bg = urgent ? PL.redBg : warn ? PL.amberBg : '#F1F5F9';
  const txt = h > 0 ? `${h}h ${String(m).padStart(2,'0')}m` : `${m}:${String(s).padStart(2,'0')}`;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: compact ? 12 : 13, fontWeight: 700, color: tone, background: bg,
      padding: compact ? '3px 8px' : '5px 10px', borderRadius: 8,
      fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
      animation: urgent ? 'plpulse 1.4s ease-in-out infinite' : 'none',
    }}>
      <Ic name="clock" size={compact ? 13 : 14} sw={2.2} color={tone} />
      {txt}{!compact && <span style={{ fontWeight: 600, opacity: 0.7 }}> left</span>}
    </span>
  );
}

// ── progress bar ──
function Progress({ value, max = 100, color = PL.teal, h = 8, bg = '#E2E8F0' }) {
  return (
    <div style={{ height: h, borderRadius: 99, background: bg, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(100, value / max * 100)}%`, height: '100%', borderRadius: 99,
        background: color, transition: 'width .6s cubic-bezier(.4,0,.2,1)' }} />
    </div>
  );
}

// ── sparkline ──
function Sparkline({ data, w = 120, h = 36, color = PL.teal, fill = true }) {
  const max = Math.max(...data), min = Math.min(...data);
  const rng = max - min || 1;
  const pts = data.map((v, i) => [i / (data.length - 1) * w, h - 4 - (v - min) / rng * (h - 8)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L${w} ${h} L0 ${h} Z`;
  const id = 'sg' + Math.random().toString(36).slice(2, 7);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={color} stopOpacity="0.22" /><stop offset="1" stopColor={color} stopOpacity="0" />
      </linearGradient></defs>
      {fill && <path d={area} fill={`url(#${id})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2.8" fill={color} />
    </svg>
  );
}

// ── avatar ──
function Avatar({ initials, size = 40, tone = PL.teal, bg }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.32, flexShrink: 0,
      background: bg || tone, color: '#fff', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontWeight: 700, fontSize: size * 0.4, letterSpacing: '0.01em',
    }}>{initials}</div>
  );
}

// ── card ──
function Card({ children, style, pad = 16, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 16, border: `1px solid ${PL.border}`,
      padding: pad, ...(onClick ? { cursor: 'pointer' } : {}), ...style,
    }}>{children}</div>
  );
}

// ── bottom sheet / modal ──
function Sheet({ open, onClose, children, height = 'auto', title }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200, pointerEvents: open ? 'auto' : 'none',
    }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.45)',
        opacity: open ? 1 : 0, transition: 'opacity .28s ease',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#fff', borderRadius: '24px 24px 0 0', height,
        maxHeight: '88%', overflow: 'auto', paddingBottom: 34,
        transform: open ? 'translateY(0)' : 'translateY(101%)',
        transition: 'transform .34s cubic-bezier(.32,.72,0,1)',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
          <div style={{ width: 38, height: 5, borderRadius: 99, background: '#CBD5E1' }} />
        </div>
        {title && <div style={{ padding: '14px 20px 4px', fontSize: 19, fontWeight: 800, color: PL.ink }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

// ── section label ──
function SectionLabel({ children, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '0 0 10px' }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: PL.faint }}>{children}</div>
      {action && <button onClick={onAction} style={{ border: 'none', background: 'none', color: PL.teal, fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: 0 }}>{action}</button>}
    </div>
  );
}

// ── trade dot ──
function TradeChip({ trade }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 700, color: PL.slate3 }}>
    <span style={{ width: 7, height: 7, borderRadius: 99, background: PL.teal }} />{trade}
  </span>;
}

// ── screen shell ──
function Screen({ children, bg = PL.bg }) {
  return <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: bg }}>{children}</div>;
}

// ── app header (clears status bar) ──
function Header({ title, sub, right, dark = false, accent, children, onBack }) {
  const fg = dark ? '#fff' : PL.ink;
  return (
    <div style={{
      paddingTop: 52, flexShrink: 0,
      background: accent || (dark ? PL.slate : '#fff'),
      borderBottom: dark ? 'none' : `1px solid ${PL.border}`,
      position: 'relative', zIndex: 6,
    }}>
      <div style={{ padding: '6px 18px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{ border: 'none', background: dark ? 'rgba(255,255,255,0.14)' : '#F1F5F9', width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <Ic name="chevL" size={20} color={fg} />
          </button>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {sub && <div style={{ fontSize: 12.5, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.6)' : PL.faint, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 2 }}>{sub}</div>}
          <div style={{ fontSize: 25, fontWeight: 800, color: fg, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{title}</div>
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

// ── scroll body ──
function Body({ children, style }) {
  return <div style={{ flex: 1, overflow: 'auto', WebkitOverflowScrolling: 'touch', padding: '16px 16px 110px', ...style }}>{children}</div>;
}

// ── stat tile ──
function Stat({ label, children, sub, style }) {
  return (
    <div style={{ ...style }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: PL.faint, marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>{children}</div>
      {sub && <div style={{ fontSize: 12.5, color: PL.muted, marginTop: 4, fontWeight: 500 }}>{sub}</div>}
    </div>
  );
}

// ── key/value row ──
function KV({ k, v, last }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: last ? 'none' : `1px solid ${PL.border2}` }}>
      <span style={{ fontSize: 14, color: PL.muted, fontWeight: 500 }}>{k}</span>
      <span style={{ fontSize: 14, color: PL.ink, fontWeight: 600, textAlign: 'right' }}>{v}</span>
    </div>
  );
}

// ── primary button ──
function Btn({ children, onClick, tone = 'teal', size = 'md', full, disabled, style }) {
  const tones = {
    teal: { bg: PL.teal, fg: '#fff' }, slate: { bg: PL.slate, fg: '#fff' },
    green: { bg: PL.green, fg: '#fff' }, ghost: { bg: '#F1F5F9', fg: PL.slate3 },
    outline: { bg: '#fff', fg: PL.slate3, border: `1.5px solid ${PL.border}` },
    danger: { bg: PL.redBg, fg: PL.red },
  };
  const t = tones[tone] || tones.teal;
  const sz = size === 'lg' ? { p: '15px', fs: 16.5 } : size === 'sm' ? { p: '9px 14px', fs: 13.5 } : { p: '13px', fs: 15 };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: full ? '100%' : undefined, padding: sz.p, fontSize: sz.fs, fontWeight: 700,
      border: t.border || 'none', borderRadius: 13, background: t.bg, color: t.fg,
      cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.45 : 1,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, whiteSpace: 'nowrap',
      letterSpacing: '-0.01em', transition: 'transform .1s, filter .15s', WebkitTapHighlightColor: 'transparent',
      ...style,
    }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.975)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >{children}</button>
  );
}

Object.assign(window, { fmt, Money, Icon, Ic, ICONS, Badge, Countdown, Progress, Sparkline, Avatar, Card, Sheet, SectionLabel, TradeChip, Screen, Header, Body, Stat, KV, Btn });
