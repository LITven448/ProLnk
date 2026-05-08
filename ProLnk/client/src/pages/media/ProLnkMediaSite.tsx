import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Google Fonts ─────────────────────────────────────────────────────────────

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById("prolnk-media-fonts")) return;
    const link = document.createElement("link");
    link.id = "prolnk-media-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);
}

// ─── Tokens ───────────────────────────────────────────────────────────────────

const T = {
  bg: "#080C14",
  surface: "#0D1424",
  card: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(255,255,255,0.07)",
  cream: "#F5F0E8",
  creamMuted: "rgba(245,240,232,0.65)",
  creamFaint: "rgba(245,240,232,0.35)",
  gold: "#E8A020",
  goldFaint: "rgba(232,160,32,0.15)",
  teal: "#0EA5E9",
  tealFaint: "rgba(14,165,233,0.12)",
  green: "#10B981",
  purple: "#A855F7",
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const playfair = "'Playfair Display', Georgia, serif";
const inter = "'Inter', system-ui, -apple-system, sans-serif";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useScrolled(px = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > px);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [px]);
  return scrolled;
}

function useMobile(bp = 768) {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= bp
  );
  useEffect(() => {
    const h = () => setMobile(window.innerWidth <= bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return mobile;
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function Counter({
  target,
  suffix = "",
  prefix = "",
  inView,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  inView: boolean;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const DURATION = 2000;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return (
    <>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </>
  );
}

// ─── Reveal Wrapper ───────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  y = 30,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: T.ease, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav({ onCta }: { onCta: () => void }) {
  const scrolled = useScrolled();
  const mobile = useMobile(700);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        height: 68,
        padding: "0 clamp(20px, 4vw, 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(8,12,20,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.cardBorder}` : "none",
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: `rgba(232,160,32,0.1)`,
            border: `1px solid rgba(232,160,32,0.3)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L14.5 12.5H1.5L8 1Z" fill={T.gold} fillOpacity="0.9" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: inter,
            fontWeight: 800,
            fontSize: 16,
            color: T.cream,
            letterSpacing: "-0.02em",
          }}
        >
          ProLnk{" "}
          <span style={{ color: T.gold, fontWeight: 400, fontFamily: playfair, fontStyle: "italic" }}>
            Media
          </span>
        </span>
      </div>

      {!mobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {["How It Works", "Targeting", "Results", "Pricing"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                fontFamily: inter,
                fontSize: 14,
                fontWeight: 500,
                color: T.creamFaint,
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = T.cream;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = T.creamFaint;
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      <button
        onClick={onCta}
        style={{
          fontFamily: inter,
          fontWeight: 700,
          fontSize: 14,
          color: "#080C14",
          background: T.gold,
          border: "none",
          borderRadius: 8,
          padding: "10px 22px",
          cursor: "pointer",
          letterSpacing: "0.01em",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: "0 4px 20px rgba(232,160,32,0.3)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 32px rgba(232,160,32,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(232,160,32,0.3)";
        }}
      >
        Book a Campaign →
      </button>
    </nav>
  );
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function Hero({ onCta }: { onCta: () => void }) {
  const mobile = useMobile();

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 700,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/4kBvYpFmoTde_d24a0312.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(8,12,20,0.6) 0%, rgba(8,12,20,0.3) 50%, rgba(8,12,20,0.88) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: T.ease }}
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 clamp(20px, 6vw, 80px)",
          maxWidth: 1040,
          width: "100%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: T.ease, delay: 0.2 }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: inter,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: T.gold,
              border: `1px solid rgba(232,160,32,0.4)`,
              borderRadius: 100,
              padding: "6px 20px",
              marginBottom: 40,
              background: "rgba(232,160,32,0.08)",
            }}
          >
            ProLnk Media Network
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: T.ease, delay: 0.35 }}
          style={{
            fontFamily: playfair,
            fontWeight: 900,
            fontSize: mobile ? "clamp(44px, 11vw, 68px)" : "clamp(56px, 8.5vw, 96px)",
            lineHeight: 1.05,
            color: T.cream,
            margin: "0 0 28px",
            letterSpacing: "-0.01em",
          }}
        >
          Reach the People
          <br />
          <em style={{ fontStyle: "italic", color: "#fff" }}>Who Build</em> America's
          <br />
          Homes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: T.ease, delay: 0.5 }}
          style={{
            fontFamily: inter,
            fontSize: mobile ? 16 : 20,
            color: "rgba(245,240,232,0.7)",
            maxWidth: 640,
            margin: "0 auto 52px",
            lineHeight: 1.65,
          }}
        >
          The only advertising platform inside the job-site — reaching contractors
          and homeowners at the exact moment they need your brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: T.ease, delay: 0.65 }}
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onCta}
            style={{
              fontFamily: inter,
              fontWeight: 700,
              fontSize: 18,
              color: "#080C14",
              background: T.gold,
              border: "none",
              borderRadius: 10,
              padding: "18px 44px",
              cursor: "pointer",
              boxShadow: "0 8px 40px rgba(232,160,32,0.4)",
              transition: "transform 0.25s, box-shadow 0.25s",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 56px rgba(232,160,32,0.55)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 40px rgba(232,160,32,0.4)";
            }}
          >
            Book a Campaign →
          </button>
          <a
            href="#pricing"
            style={{
              fontFamily: inter,
              fontWeight: 600,
              fontSize: 18,
              color: T.cream,
              background: "transparent",
              border: `1px solid rgba(245,240,232,0.25)`,
              borderRadius: 10,
              padding: "18px 44px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              letterSpacing: "-0.01em",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(232,160,32,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.color = T.gold;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,240,232,0.25)";
              (e.currentTarget as HTMLAnchorElement).style.color = T.cream;
            }}
          >
            View Rate Card
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            marginTop: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: mobile ? 16 : 40,
            flexWrap: "wrap",
          }}
        >
          {[
            "Trusted by brands in 8 industries",
            "100,000+ verified contractors",
            "150,000+ homeowner profiles",
          ].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: inter,
                fontSize: 13,
                color: "rgba(245,240,232,0.45)",
                letterSpacing: "0.02em",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {i > 0 && !mobile && (
                <span style={{ color: "rgba(232,160,32,0.4)", fontSize: 16 }}>·</span>
              )}
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: inter,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: T.cream,
          }}
        >
          Scroll
        </span>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M8 1v14M2 13l6 6 6-6" stroke={T.cream} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}

// ─── Section 2: The Numbers ───────────────────────────────────────────────────

const STATS = [
  { target: 100000, suffix: "+", label: "Verified Service Professionals" },
  { target: 150000, suffix: "+", label: "Homeowner Profiles" },
  { target: 850, prefix: "$", label: "Average Deal Value Influenced" },
  { target: 42, suffix: "×", divisor: 10, label: "Average Campaign ROI" },
];

function Numbers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const mobile = useMobile();

  return (
    <section
      id="how-it-works"
      ref={ref}
      style={{
        background: T.surface,
        padding: "100px clamp(20px, 5vw, 64px)",
        borderTop: `1px solid ${T.cardBorder}`,
        borderBottom: `1px solid ${T.cardBorder}`,
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: 48,
        }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.8, ease: T.ease }}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                fontFamily: playfair,
                fontWeight: 900,
                fontSize: mobile ? "clamp(40px, 9vw, 64px)" : "clamp(48px, 5vw, 72px)",
                color: T.gold,
                lineHeight: 1,
                marginBottom: 14,
                letterSpacing: "-0.02em",
              }}
            >
              {s.divisor ? (
                inView ? `${s.target / s.divisor}×` : "0×"
              ) : (
                <Counter
                  target={s.target}
                  suffix={s.suffix}
                  prefix={s.prefix}
                  inView={inView}
                />
              )}
            </div>
            <div
              style={{
                fontFamily: inter,
                fontSize: 13,
                fontWeight: 500,
                color: T.creamMuted,
                letterSpacing: "0.03em",
                lineHeight: 1.4,
              }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Section 3: Why ProLnk Media ─────────────────────────────────────────────

const WHY_CARDS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L20 7.5V14.5L11 20L2 14.5V7.5L11 2Z" stroke={T.gold} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="11" cy="11" r="3" fill={T.gold} fillOpacity="0.5" />
      </svg>
    ),
    title: "Verified Audience",
    body: "No bots. Every contractor is licensed and verified. Every homeowner owns their home. Your impressions reach real buyers.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2v4M2 11h4M20 11h-4M11 20v-4" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="11" r="5" stroke={T.gold} strokeWidth="1.5" />
        <circle cx="11" cy="11" r="1.5" fill={T.gold} />
      </svg>
    ),
    title: "Job-Event Targeting",
    body: "Your ad fires when a roofer logs a job in your category. Not a keyword guess — a live event signal from inside the workflow.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3C7.13 3 4 6.13 4 10c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z" stroke={T.gold} strokeWidth="1.5" />
        <circle cx="11" cy="10" r="2.5" fill={T.gold} fillOpacity="0.5" />
      </svg>
    ),
    title: "The Moment of Decision",
    body: "Reach contractors when they're recommending products to homeowners, not after they've already decided. Own the recommendation layer.",
  },
];

function WhySection() {
  const mobile = useMobile();

  return (
    <section
      id="targeting"
      style={{
        background: T.bg,
        padding: "120px clamp(20px, 5vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Reveal>
          <p
            style={{
              fontFamily: inter,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: T.gold,
              marginBottom: 20,
            }}
          >
            Why ProLnk Media
          </p>
          <h2
            style={{
              fontFamily: playfair,
              fontWeight: 900,
              fontSize: mobile ? "clamp(36px, 9vw, 56px)" : "clamp(40px, 5.5vw, 64px)",
              color: T.cream,
              lineHeight: 1.08,
              margin: "0 0 20px",
              letterSpacing: "-0.01em",
              maxWidth: 680,
            }}
          >
            Advertising Inside{" "}
            <em style={{ color: T.gold }}>the Job.</em>
          </h2>
          <p
            style={{
              fontFamily: inter,
              fontSize: 18,
              color: T.creamMuted,
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 0 72px",
            }}
          >
            Every impression happens when your audience is actively working in homes
            — not scrolling a feed.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {WHY_CARDS.map((card, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                style={{
                  background: T.card,
                  border: T.cardBorder,
                  borderLeft: `3px solid ${T.gold}`,
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderLeftWidth: "3px",
                  borderLeftColor: T.gold,
                  borderTopColor: T.cardBorder,
                  borderRightColor: T.cardBorder,
                  borderBottomColor: T.cardBorder,
                  borderRadius: 16,
                  padding: "36px 32px",
                  backdropFilter: "blur(12px)",
                  height: "100%",
                  boxSizing: "border-box",
                  transition: "background 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(232,160,32,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = T.card;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{ marginBottom: 20 }}>{card.icon}</div>
                <h3
                  style={{
                    fontFamily: playfair,
                    fontWeight: 700,
                    fontSize: 22,
                    color: T.cream,
                    marginBottom: 14,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: inter,
                    fontSize: 15,
                    color: T.creamMuted,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Placement Showcase ────────────────────────────────────────────

const PLACEMENTS = [
  {
    tag: "DASHBOARD",
    title: "Partner Dashboard Banner",
    sub: "2.4M impressions/month on the pro homepage",
    accent: T.gold,
    mock: (
      <div
        style={{
          background: "#0D1424",
          borderRadius: 12,
          padding: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
          {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div
          style={{
            width: "100%",
            height: 36,
            borderRadius: 7,
            background: `linear-gradient(90deg, rgba(232,160,32,0.35) 0%, rgba(232,160,32,0.12) 100%)`,
            border: "1px solid rgba(232,160,32,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: inter,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.12em",
              color: T.gold,
              textTransform: "uppercase",
            }}
          >
            Sponsored — Your Brand
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          {[55, 75, 40].map((w, i) => (
            <div key={i} style={{ height: 8, width: `${w}%`, background: "rgba(255,255,255,0.06)", borderRadius: 4 }} />
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
          }}
        >
          {[1, 2].map((k) => (
            <div key={k} style={{ height: 52, background: "rgba(255,255,255,0.04)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    tag: "AI TRIGGERED",
    title: "Scan Results Spotlight",
    sub: "First brand seen when AI detects your trade category",
    accent: T.teal,
    mock: (
      <div
        style={{
          background: "#0D1424",
          borderRadius: 12,
          padding: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: 6, background: `rgba(14,165,233,0.15)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4" stroke={T.teal} strokeWidth="1.5" />
              <path d="M6 3v3l2 1" stroke={T.teal} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ height: 6, width: 70, background: "rgba(255,255,255,0.12)", borderRadius: 3, marginBottom: 4 }} />
            <div style={{ height: 5, width: 48, background: "rgba(255,255,255,0.06)", borderRadius: 3 }} />
          </div>
          <div
            style={{
              marginLeft: "auto",
              background: `rgba(14,165,233,0.15)`,
              border: `1px solid rgba(14,165,233,0.3)`,
              borderRadius: 6,
              padding: "3px 8px",
            }}
          >
            <span style={{ fontFamily: inter, fontSize: 8, fontWeight: 700, color: T.teal, letterSpacing: "0.1em" }}>SPONSORED</span>
          </div>
        </div>
        {[80, 65, 90].map((w, i) => (
          <div key={i} style={{ height: 6, width: `${w}%`, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginBottom: 6 }} />
        ))}
      </div>
    ),
  },
  {
    tag: "DIRECT EMAIL",
    title: "Direct Email to Pros",
    sub: "Targeted by trade, zip code, tier level",
    accent: T.green,
    mock: (
      <div
        style={{
          background: "#0D1424",
          borderRadius: 12,
          padding: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 9,
            color: "rgba(245,240,232,0.3)",
            marginBottom: 10,
            letterSpacing: "0.04em",
          }}
        >
          From: media@prolnk.io
        </div>
        <div style={{ height: 7, width: "85%", background: "rgba(255,255,255,0.1)", borderRadius: 3, marginBottom: 5 }} />
        <div style={{ height: 5, width: "65%", background: "rgba(255,255,255,0.06)", borderRadius: 3, marginBottom: 12 }} />
        <div
          style={{
            width: "100%",
            height: 28,
            background: `rgba(16,185,129,0.15)`,
            border: `1px solid rgba(16,185,129,0.3)`,
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <span style={{ fontFamily: inter, fontSize: 8, fontWeight: 800, color: T.green, letterSpacing: "0.1em" }}>VIEW OFFER →</span>
        </div>
        {[80, 55].map((w, i) => (
          <div key={i} style={{ height: 5, width: `${w}%`, background: "rgba(255,255,255,0.05)", borderRadius: 3, marginBottom: 5 }} />
        ))}
      </div>
    ),
  },
  {
    tag: "FIELD MOBILE",
    title: "Mobile Push to Field Pros",
    sub: "Catch contractors on the job site",
    accent: T.purple,
    mock: (
      <div
        style={{
          background: "rgba(20,16,32,0.95)",
          borderRadius: 14,
          padding: 16,
          border: "1px solid rgba(168,85,247,0.15)",
          width: 160,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1L9 5.5H1L5 1Z" fill={T.purple} />
            </svg>
          </div>
          <span style={{ fontFamily: inter, fontSize: 9, fontWeight: 600, color: "rgba(245,240,232,0.5)" }}>ProLnk · now</span>
        </div>
        <div style={{ fontFamily: inter, fontSize: 10, fontWeight: 700, color: T.cream, marginBottom: 5 }}>New HVAC lead nearby</div>
        <div style={{ fontFamily: inter, fontSize: 9, color: "rgba(245,240,232,0.45)", lineHeight: 1.45 }}>
          3BR home, Irving TX · Sponsored by Carrier
        </div>
      </div>
    ),
  },
];

function PlacementShowcase() {
  const mobile = useMobile();

  return (
    <section
      style={{
        background: T.surface,
        padding: "120px 0",
        overflow: "hidden",
        borderTop: `1px solid ${T.cardBorder}`,
      }}
    >
      <div style={{ padding: "0 clamp(20px, 5vw, 64px)" }}>
        <Reveal>
          <p
            style={{
              fontFamily: inter,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: T.teal,
              marginBottom: 20,
            }}
          >
            Placements
          </p>
          <h2
            style={{
              fontFamily: playfair,
              fontWeight: 900,
              fontSize: mobile ? "clamp(36px, 9vw, 52px)" : "clamp(40px, 5vw, 60px)",
              color: T.cream,
              lineHeight: 1.08,
              margin: "0 0 72px",
            }}
          >
            Where Your Brand Lives.
          </h2>
        </Reveal>
      </div>

      <div
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          padding: "8px clamp(20px, 5vw, 64px) 32px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {PLACEMENTS.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: T.ease }}
              style={{
                minWidth: mobile ? 280 : 300,
                maxWidth: 320,
                flexShrink: 0,
                background: T.card,
                border: `1px solid ${T.cardBorder}`,
                borderTop: `2px solid ${p.accent}`,
                borderRadius: 18,
                overflow: "hidden",
                cursor: "default",
              }}
            >
              <div
                style={{
                  height: 200,
                  background: `linear-gradient(135deg, rgba(13,20,36,0.95) 0%, rgba(8,12,20,0.98) 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 24,
                  borderBottom: `1px solid ${T.cardBorder}`,
                }}
              >
                <div style={{ width: "100%" }}>{p.mock}</div>
              </div>
              <div style={{ padding: "24px 24px 28px" }}>
                <span
                  style={{
                    fontFamily: inter,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: p.accent,
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 10,
                  }}
                >
                  {p.tag}
                </span>
                <h3
                  style={{
                    fontFamily: playfair,
                    fontWeight: 700,
                    fontSize: 20,
                    color: T.cream,
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: inter,
                    fontSize: 14,
                    color: T.creamMuted,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {p.sub}
                </p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Section 5: Targeting Bento Grid ─────────────────────────────────────────

const BENTO = [
  {
    emoji: "🎯",
    title: "Trade Category",
    body: "Roofing only. HVAC only. Or all 65+ trades.",
    span: 1,
  },
  {
    emoji: "📍",
    title: "Geographic Radius",
    body: "Zip code, city, or DMA. Down to 5-mile radius.",
    span: 1,
  },
  {
    emoji: "⚡",
    title: "Job Event Trigger",
    body: "Ad fires when contractor logs a specific job type.",
    span: 2,
    featured: true,
  },
  {
    emoji: "🏆",
    title: "Partner Tier",
    body: "Reach Charter Partners only — your highest-value audience.",
    span: 2,
    featured: true,
  },
  {
    emoji: "🏠",
    title: "Property Value",
    body: "Target homeowners in $400K–$800K homes.",
    span: 1,
  },
  {
    emoji: "📅",
    title: "Seasonal & Weather",
    body: "Storm season? We trigger ads based on NOAA weather events.",
    span: 1,
  },
];

function TargetingBento() {
  const mobile = useMobile();

  return (
    <section
      style={{
        background: T.bg,
        padding: "120px clamp(20px, 5vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Reveal>
          <p
            style={{
              fontFamily: inter,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: T.gold,
              marginBottom: 20,
            }}
          >
            Targeting
          </p>
          <h2
            style={{
              fontFamily: playfair,
              fontWeight: 900,
              fontSize: mobile ? "clamp(36px, 9vw, 52px)" : "clamp(40px, 5vw, 60px)",
              color: T.cream,
              lineHeight: 1.08,
              margin: "0 0 64px",
            }}
          >
            Surgical Precision{" "}
            <em style={{ color: T.gold }}>Targeting.</em>
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(4, 1fr)",
            gridTemplateRows: "auto",
            gap: 16,
          }}
        >
          {BENTO.map((cell, i) => (
            <Reveal key={i} delay={i * 0.07} style={{ gridColumn: mobile ? "span 1" : `span ${cell.span}` }}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.25, ease: T.ease }}
                style={{
                  background: cell.featured
                    ? `linear-gradient(135deg, rgba(232,160,32,0.08) 0%, rgba(232,160,32,0.03) 100%)`
                    : T.card,
                  border: `1px solid ${cell.featured ? "rgba(232,160,32,0.2)" : T.cardBorder}`,
                  borderRadius: 16,
                  padding: cell.featured ? "36px 32px" : "28px 28px",
                  height: "100%",
                  boxSizing: "border-box",
                  transition: "background 0.25s",
                }}
              >
                <span
                  style={{
                    fontSize: cell.featured ? 32 : 26,
                    display: "block",
                    marginBottom: 16,
                    lineHeight: 1,
                  }}
                >
                  {cell.emoji}
                </span>
                <h3
                  style={{
                    fontFamily: playfair,
                    fontWeight: 700,
                    fontSize: cell.featured ? 22 : 18,
                    color: T.cream,
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cell.title}
                </h3>
                <p
                  style={{
                    fontFamily: inter,
                    fontSize: 14,
                    color: T.creamMuted,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {cell.body}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Results / Social Proof ────────────────────────────────────────

function Results() {
  const mobile = useMobile();

  return (
    <section
      id="results"
      style={{
        background: T.surface,
        padding: "120px clamp(20px, 5vw, 64px)",
        borderTop: `1px solid ${T.cardBorder}`,
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Reveal>
          <p
            style={{
              fontFamily: inter,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: T.green,
              marginBottom: 20,
            }}
          >
            Results
          </p>
          <h2
            style={{
              fontFamily: playfair,
              fontWeight: 900,
              fontSize: mobile ? "clamp(36px, 9vw, 52px)" : "clamp(40px, 5vw, 60px)",
              color: T.cream,
              lineHeight: 1.08,
              margin: "0 0 64px",
            }}
          >
            Built for Measurable{" "}
            <em style={{ color: T.green }}>Returns.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              background: T.card,
              border: `1px solid ${T.cardBorder}`,
              borderLeft: `4px solid ${T.green}`,
              borderRadius: 20,
              padding: mobile ? "36px 28px" : "52px 56px",
              marginBottom: 48,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                fontFamily: playfair,
                fontSize: mobile ? 52 : 80,
                color: "rgba(245,240,232,0.06)",
                lineHeight: 1,
                position: "absolute",
                top: 16,
                left: 32,
                fontWeight: 900,
                userSelect: "none",
              }}
            >
              "
            </div>
            <blockquote
              style={{
                fontFamily: playfair,
                fontSize: mobile ? 20 : 26,
                fontWeight: 400,
                fontStyle: "italic",
                color: T.cream,
                lineHeight: 1.6,
                margin: "0 0 28px",
                position: "relative",
                zIndex: 1,
                paddingTop: 16,
              }}
            >
              ProLnk is the only channel where every dollar we spend reaches someone
              actively working in a home. Our HVAC campaign saw a 6.2× ROAS in the
              first 60 days.
            </blockquote>
            <cite
              style={{
                fontFamily: inter,
                fontSize: 14,
                fontStyle: "normal",
                color: T.creamMuted,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span>— VP Marketing, Regional HVAC Manufacturer</span>
              <span style={{ color: T.gold, letterSpacing: 2 }}>★★★★★</span>
            </cite>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {[
            { val: "6.2×", label: "ROAS First 60 Days", accent: T.green },
            { val: "340%", label: "Increase in Contractor Brand Preference", accent: T.teal },
            { val: "$0.34", label: "Cost Per Verified Impression", accent: T.gold },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                style={{
                  background: T.card,
                  border: `1px solid ${T.cardBorder}`,
                  borderRadius: 14,
                  padding: "32px 28px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: playfair,
                    fontWeight: 900,
                    fontSize: 48,
                    color: stat.accent,
                    lineHeight: 1,
                    marginBottom: 12,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.val}
                </div>
                <div
                  style={{
                    fontFamily: inter,
                    fontSize: 13,
                    fontWeight: 500,
                    color: T.creamMuted,
                    letterSpacing: "0.03em",
                    lineHeight: 1.4,
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Pricing ───────────────────────────────────────────────────────

const TIERS = [
  {
    name: "Spotlight",
    price: "$499",
    period: "/mo",
    highlight: false,
    accent: T.teal,
    features: [
      "Directory listing + partner badge",
      "1 email blast/month",
      "Partner dashboard banner",
      "ZIP code targeting",
      "Monthly analytics report",
      "Cancel anytime",
    ],
    cta: "Start Spotlight",
  },
  {
    name: "Featured",
    price: "$1,499",
    period: "/mo",
    highlight: true,
    accent: T.gold,
    badge: "Most Popular",
    features: [
      "Everything in Spotlight",
      "Priority placement in feed",
      "Weekly email to 5K+ pros",
      "Scan result spotlight",
      "Conversion tracking dashboard",
      "Territory exclusivity option",
    ],
    cta: "Go Featured",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    highlight: false,
    accent: T.purple,
    features: [
      "Full managed campaigns",
      "Dedicated account rep",
      "Custom integrations",
      "White-glove creative services",
      "Quarterly strategy calls",
      "Brand safety guarantee + SLA",
    ],
    cta: "Contact Sales",
  },
];

function Pricing({ onCta }: { onCta: () => void }) {
  const mobile = useMobile();

  return (
    <section
      id="pricing"
      style={{
        background: T.bg,
        padding: "120px clamp(20px, 5vw, 64px)",
        borderTop: `1px solid ${T.cardBorder}`,
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <Reveal>
          <p
            style={{
              fontFamily: inter,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: T.gold,
              marginBottom: 20,
            }}
          >
            Rate Card
          </p>
          <h2
            style={{
              fontFamily: playfair,
              fontWeight: 900,
              fontSize: mobile ? "clamp(36px, 9vw, 52px)" : "clamp(40px, 5vw, 60px)",
              color: T.cream,
              lineHeight: 1.08,
              margin: "0 0 72px",
            }}
          >
            Campaign <em style={{ color: T.gold }}>Tiers.</em>
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {TIERS.map((tier, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                style={{
                  background: tier.highlight
                    ? `rgba(232,160,32,0.05)`
                    : T.card,
                  border: `1px solid ${tier.highlight ? "rgba(232,160,32,0.3)" : T.cardBorder}`,
                  borderTop: `3px solid ${tier.accent}`,
                  borderRadius: 18,
                  padding: "40px 32px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: tier.highlight
                    ? `0 0 80px rgba(232,160,32,0.08)`
                    : "none",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                {tier.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: T.gold,
                      color: "#080C14",
                      fontFamily: inter,
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 18px",
                      borderRadius: 100,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tier.badge}
                  </div>
                )}

                <div style={{ marginBottom: 8 }}>
                  <span
                    style={{
                      fontFamily: inter,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: tier.accent,
                      textTransform: "uppercase",
                    }}
                  >
                    {tier.name}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: 32,
                  }}
                >
                  <span
                    style={{
                      fontFamily: playfair,
                      fontWeight: 900,
                      fontSize: 52,
                      color: T.cream,
                      letterSpacing: "-0.025em",
                      lineHeight: 1,
                    }}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span
                      style={{
                        fontFamily: inter,
                        fontSize: 15,
                        color: T.creamFaint,
                      }}
                    >
                      {tier.period}
                    </span>
                  )}
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    flex: 1,
                  }}
                >
                  {tier.features.map((f, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontFamily: inter,
                        fontSize: 14,
                        color: T.creamMuted,
                        lineHeight: 1.5,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        style={{ flexShrink: 0, marginTop: 2 }}
                      >
                        <circle cx="7" cy="7" r="6.5" stroke={tier.accent} strokeOpacity="0.4" />
                        <path d="M4.5 7l2 2 3-3" stroke={tier.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onCta}
                  style={{
                    width: "100%",
                    background: tier.highlight ? T.gold : "rgba(255,255,255,0.06)",
                    color: tier.highlight ? "#080C14" : T.cream,
                    border: tier.highlight
                      ? "none"
                      : `1px solid ${T.cardBorder}`,
                    borderRadius: 10,
                    padding: "15px 0",
                    fontFamily: inter,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.01em",
                    transition: "all 0.22s",
                    boxShadow: tier.highlight
                      ? "0 4px 28px rgba(232,160,32,0.3)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                >
                  {tier.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 8: Close CTA ─────────────────────────────────────────────────────

function CloseCta({ onCta }: { onCta: () => void }) {
  const mobile = useMobile();

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/NEu2wYCLPuV7_f84a4e52.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(8,12,20,0.72) 0%, rgba(8,12,20,0.55) 40%, rgba(8,12,20,0.82) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 clamp(20px, 6vw, 80px)",
          maxWidth: 900,
        }}
      >
        <Reveal y={40}>
          <h2
            style={{
              fontFamily: playfair,
              fontWeight: 900,
              fontSize: mobile ? "clamp(52px, 13vw, 80px)" : "clamp(72px, 9vw, 110px)",
              color: T.cream,
              lineHeight: 1.02,
              margin: "0 0 56px",
              letterSpacing: "-0.015em",
            }}
          >
            Your Brand.
            <br />
            <em style={{ color: T.gold }}>Their Job Site.</em>
            <br />
            Every Day.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <motion.button
            onClick={onCta}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                "0 8px 48px rgba(232,160,32,0.35)",
                "0 16px 80px rgba(232,160,32,0.6)",
                "0 8px 48px rgba(232,160,32,0.35)",
              ],
            }}
            transition={{
              boxShadow: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.25 },
            }}
            style={{
              fontFamily: inter,
              fontWeight: 700,
              fontSize: mobile ? 18 : 20,
              color: "#080C14",
              background: T.gold,
              border: "none",
              borderRadius: 100,
              padding: "22px 68px",
              cursor: "pointer",
              letterSpacing: "-0.01em",
              display: "inline-block",
            }}
          >
            Book Your Campaign
          </motion.button>
        </Reveal>

        <Reveal delay={0.35}>
          <p
            style={{
              fontFamily: inter,
              fontSize: 14,
              color: "rgba(245,240,232,0.4)",
              marginTop: 28,
              letterSpacing: "0.02em",
              lineHeight: 1.6,
            }}
          >
            Average campaign goes live in 48 hours · Minimum 30-day commitment
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contact Modal ────────────────────────────────────────────────────────────

interface FormState {
  companyName: string;
  contactName: string;
  email: string;
  budget: string;
  trade: string;
  message: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(245,240,232,0.04)",
  border: `1px solid rgba(245,240,232,0.1)`,
  borderRadius: 10,
  padding: "13px 16px",
  fontSize: 14,
  color: T.cream,
  outline: "none",
  fontFamily: inter,
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  appearance: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: inter,
  fontSize: 11,
  fontWeight: 600,
  color: T.creamFaint,
  marginBottom: 7,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

function Modal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  const mobile = useMobile();
  const [form, setForm] = useState<FormState>({
    companyName: "",
    contactName: "",
    email: "",
    budget: "Under $1K",
    trade: "All Trades",
    message: "",
  });

  const set =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/trpc/advertiserLead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ json: form }),
    }).catch(() => {});
    setDone(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.5, ease: T.ease }}
        style={{
          background: T.surface,
          border: `1px solid ${T.cardBorder}`,
          borderBottom: "none",
          borderRadius: "20px 20px 0 0",
          padding: mobile ? "36px 24px 40px" : "48px 52px 56px",
          width: "100%",
          maxWidth: 680,
          maxHeight: "92vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 -40px 120px rgba(0,0,0,0.6)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(245,240,232,0.06)",
            border: `1px solid rgba(245,240,232,0.1)`,
            color: T.creamMuted,
            width: 34,
            height: 34,
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: inter,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,240,232,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,240,232,0.06)";
          }}
        >
          ✕
        </button>

        {done ? (
          <div style={{ textAlign: "center", paddingTop: 40, paddingBottom: 40 }}>
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(232,160,32,0.1)",
                border: `2px solid rgba(232,160,32,0.4)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
                fontSize: 28,
                color: T.gold,
              }}
            >
              ✓
            </motion.div>
            <h3
              style={{
                fontFamily: playfair,
                fontSize: 32,
                fontWeight: 900,
                color: T.cream,
                marginBottom: 14,
                letterSpacing: "-0.02em",
              }}
            >
              You're in the Network.
            </h3>
            <p
              style={{
                fontFamily: inter,
                fontSize: 16,
                color: T.creamMuted,
                lineHeight: 1.65,
                marginBottom: 36,
              }}
            >
              Our team will reach out within 24 hours to build your campaign.
            </p>
            <button
              onClick={onClose}
              style={{
                fontFamily: inter,
                background: T.gold,
                color: "#080C14",
                border: "none",
                borderRadius: 10,
                padding: "13px 36px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p
              style={{
                fontFamily: inter,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: T.gold,
                marginBottom: 10,
              }}
            >
              Book a Campaign
            </p>
            <h3
              style={{
                fontFamily: playfair,
                fontSize: 32,
                fontWeight: 900,
                color: T.cream,
                marginBottom: 36,
                letterSpacing: "-0.02em",
              }}
            >
              Let's build your campaign.
            </h3>

            <form
              onSubmit={submit}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <label style={labelStyle}>Company Name</label>
                  <input
                    required
                    style={inputStyle}
                    placeholder="Carrier Corp."
                    value={form.companyName}
                    onChange={set("companyName")}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(232,160,32,0.5)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(245,240,232,0.1)";
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Contact Name</label>
                  <input
                    required
                    style={inputStyle}
                    placeholder="Jane Smith"
                    value={form.contactName}
                    onChange={set("contactName")}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(232,160,32,0.5)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(245,240,232,0.1)";
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Work Email</label>
                <input
                  required
                  type="email"
                  style={inputStyle}
                  placeholder="jane@carrier.com"
                  value={form.email}
                  onChange={set("email")}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(232,160,32,0.5)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(245,240,232,0.1)";
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <label style={labelStyle}>Campaign Budget</label>
                  <select
                    value={form.budget}
                    onChange={set("budget")}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option>Under $1K</option>
                    <option>$1K–$5K</option>
                    <option>$5K–$20K</option>
                    <option>$20K+</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Target Trade</label>
                  <select
                    value={form.trade}
                    onChange={set("trade")}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option>All Trades</option>
                    <option>HVAC</option>
                    <option>Roofing</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>Flooring</option>
                    <option>Painting</option>
                    <option>Landscaping</option>
                    <option>Home Security</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Message (optional)</label>
                <textarea
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                  placeholder="Tell us about your audience, goals, or any questions..."
                  value={form.message}
                  onChange={set("message")}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLTextAreaElement).style.borderColor = "rgba(232,160,32,0.5)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLTextAreaElement).style.borderColor = "rgba(245,240,232,0.1)";
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: inter,
                  background: T.gold,
                  color: "#080C14",
                  border: "none",
                  borderRadius: 10,
                  padding: "17px 0",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  transition: "transform 0.22s, box-shadow 0.22s",
                  boxShadow: "0 4px 28px rgba(232,160,32,0.35)",
                  marginTop: 4,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 40px rgba(232,160,32,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 28px rgba(232,160,32,0.35)";
                }}
              >
                Submit Campaign Request →
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const mobile = useMobile(600);

  return (
    <footer
      style={{
        background: T.surface,
        borderTop: `1px solid ${T.cardBorder}`,
        padding: "36px clamp(20px, 5vw, 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: playfair, fontStyle: "italic", fontSize: 18, color: T.gold, fontWeight: 700 }}>
          ProLnk
        </span>
        <span style={{ fontFamily: inter, fontSize: 13, color: T.creamFaint, fontWeight: 400 }}>
          Media
        </span>
      </div>
      {!mobile && (
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "prolnk.io", href: "https://prolnk.io" },
            { label: "trustypro.io", href: "https://trustypro.io" },
            { label: "media@prolnk.io", href: "mailto:media@prolnk.io" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: inter,
                fontSize: 13,
                color: "rgba(245,240,232,0.25)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = T.creamMuted;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,232,0.25)";
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
      <span
        style={{
          fontFamily: inter,
          fontSize: 12,
          color: "rgba(245,240,232,0.18)",
        }}
      >
        © 2026 ProLnk LLC — Dallas, Texas
      </span>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ProLnkMediaSite() {
  useGoogleFonts();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <div
      style={{
        fontFamily: inter,
        background: T.bg,
        color: T.cream,
        overflowX: "hidden",
      }}
    >
      <Nav onCta={openModal} />
      <Hero onCta={openModal} />
      <Numbers />
      <WhySection />
      <PlacementShowcase />
      <TargetingBento />
      <Results />
      <Pricing onCta={openModal} />
      <CloseCta onCta={openModal} />
      <Footer />

      <AnimatePresence>
        {modal && <Modal onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}
