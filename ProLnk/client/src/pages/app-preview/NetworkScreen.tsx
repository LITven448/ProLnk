import { useState } from "react";

const NAV = [
  { icon: "🏠", label: "Home", key: "home" },
  { icon: "⚡", label: "Leads", key: "leads", center: true },
  { icon: "$", label: "Earn", key: "earn" },
  { icon: "👥", label: "Network", key: "network" },
  { icon: "👤", label: "Profile", key: "profile" },
];

const COLORS = {
  bg: "#0A1628",
  card: "#152035",
  border: "#1E2E45",
  text: "#F0F4FF",
  muted: "#7A8BA8",
  yellow: "#F5E642",
  green: "#10B981",
};

function OrgCard({ name, trade, jobs, size = "sm" }: { name: string; trade: string; jobs: number; size?: "sm" | "md" }) {
  return (
    <div style={{ background: "#0A1628", border: `1px solid #1E2E45`, borderRadius: 10, padding: size === "md" ? "10px 12px" : "8px 10px", textAlign: "center", minWidth: size === "md" ? 90 : 76 }}>
      <div style={{ fontSize: size === "md" ? 12 : 11, fontWeight: 700, color: "#F0F4FF" }}>{name}</div>
      <div style={{ fontSize: 10, color: "#7A8BA8", marginTop: 1 }}>{trade}</div>
      <div style={{ fontSize: 10, color: "#10B981", marginTop: 2 }}>{jobs} jobs</div>
    </div>
  );
}

export default function NetworkScreen() {
  const [navActive, setNavActive] = useState("network");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ width: 390, minHeight: 844, background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column", margin: "0 auto", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600 }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6 }}><span>●●●●</span><span>WiFi</span><span>🔋</span></div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 16px" }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>My Network</div>
        <div style={{ background: `${COLORS.yellow}22`, border: `1px solid ${COLORS.yellow}`, borderRadius: 10, padding: "5px 12px", fontSize: 12, fontWeight: 700, color: COLORS.yellow }}>
          Charter ⭐
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
        {/* 3 stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[
            { label: "Total Network", value: "23" },
            { label: "Direct Recruits", value: "8" },
            { label: "Passive Income", value: "$247/mo", green: true },
          ].map((c) => (
            <div key={c.label} style={{ background: COLORS.card, borderRadius: 12, padding: "12px 10px", border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: c.green ? COLORS.green : COLORS.yellow }}>{c.value}</div>
              <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 3, lineHeight: 1.3 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* CSS Org Tree */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 16, border: `1px solid ${COLORS.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Network Tree</div>

          {/* You (root) */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 0 }}>
            <div style={{ background: COLORS.bg, border: `2px solid ${COLORS.yellow}`, borderRadius: 12, padding: "10px 18px", textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.yellow }}>You</div>
              <div style={{ fontSize: 10, color: COLORS.muted }}>Charter · HVAC</div>
            </div>
          </div>

          {/* Vertical line down */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 2, height: 16, background: COLORS.border }} />
          </div>

          {/* Override label */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 0 }}>
            <div style={{ background: `${COLORS.yellow}22`, border: `1px solid ${COLORS.yellow}55`, borderRadius: 6, padding: "2px 8px", fontSize: 10, color: COLORS.yellow, fontWeight: 700 }}>7% override</div>
          </div>

          {/* Horizontal branch */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 0, marginTop: 0 }}>
            {/* Horizontal line */}
            <div style={{ position: "absolute", top: 8, left: "18%", right: "18%", height: 2, background: COLORS.border }} />
            {/* 3 L1 nodes */}
            {[
              { name: "Marcus R.", trade: "Plumbing", jobs: 6 },
              { name: "David C.", trade: "Electric", jobs: 4 },
              { name: "Jennifer T.", trade: "HVAC", jobs: 9 },
            ].map((p, i) => (
              <div key={p.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{ width: 2, height: 16, background: COLORS.border }} />
                <OrgCard {...p} size="md" />
              </div>
            ))}
          </div>

          {/* L2 under Marcus R. */}
          <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: 14, marginTop: 4 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ background: `${COLORS.yellow}22`, border: `1px solid ${COLORS.yellow}44`, borderRadius: 6, padding: "2px 8px", fontSize: 10, color: COLORS.yellow, fontWeight: 700, marginBottom: 2 }}>4% override</div>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 2, height: 10, background: COLORS.border }} />
                  <OrgCard name="James W." trade="HVAC" jobs={3} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 2, height: 10, background: COLORS.border }} />
                  <OrgCard name="Amy L." trade="Plumb" jobs={2} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings by level table */}
        <div style={{ background: COLORS.card, borderRadius: 16, border: `1px solid ${COLORS.border}`, marginBottom: 14, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#0A162888", padding: "10px 16px" }}>
            {["Level", "Recruits", "This Month"].map((h) => (
              <div key={h} style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>{h}</div>
            ))}
          </div>
          {[
            { level: "L1 Direct", recruits: "8", month: "$174" },
            { level: "L2", recruits: "11", month: "$73" },
            { level: "L3–L4", recruits: "4", month: "$0" },
            { level: "Total", recruits: "23", month: "$247", total: true },
          ].map((row) => (
            <div key={row.level} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px 16px", borderTop: `1px solid ${COLORS.border}`, background: row.total ? `${COLORS.yellow}0A` : "transparent" }}>
              <div style={{ fontSize: 13, fontWeight: row.total ? 700 : 400, color: row.total ? COLORS.yellow : COLORS.text }}>{row.level}</div>
              <div style={{ fontSize: 13, color: COLORS.muted }}>{row.recruits}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: row.total ? COLORS.yellow : COLORS.green }}>{row.month}</div>
            </div>
          ))}
        </div>

        {/* Referral link */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 14, border: `1px solid ${COLORS.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Your Referral Link</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ flex: 1, background: COLORS.bg, borderRadius: 8, padding: "9px 12px", fontSize: 12, color: COLORS.text, border: `1px solid ${COLORS.border}`, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
              prolnk.io/join?ref=marcus-hvac
            </div>
            <button onClick={handleCopy} style={{ background: copied ? COLORS.green : COLORS.yellow, color: COLORS.bg, border: "none", borderRadius: 8, padding: "9px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}>
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Recruit CTA */}
        <button style={{ width: "100%", background: COLORS.yellow, color: COLORS.bg, border: "none", borderRadius: 14, padding: "16px 20px", fontSize: 15, fontWeight: 800, cursor: "pointer", marginBottom: 20 }}>
          👥 Recruit More — $70/mo per $1K earner
        </button>
      </div>

      {/* Bottom Nav */}
      <div style={{ height: 80, background: COLORS.card, borderTop: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8px 8px", flexShrink: 0 }}>
        {NAV.map((item) =>
          item.center ? (
            <div key={item.key} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: COLORS.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginTop: -20, boxShadow: `0 4px 16px ${COLORS.yellow}55` }}>
                <span style={{ color: COLORS.bg, fontWeight: 800 }}>⚡</span>
              </div>
              <span style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}>{item.label}</span>
            </div>
          ) : (
            <button key={item.key} onClick={() => setNavActive(item.key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}>
              <span style={{ fontSize: 20, opacity: navActive === item.key ? 1 : 0.4 }}>{item.icon}</span>
              <span style={{ fontSize: 10, color: navActive === item.key ? COLORS.yellow : COLORS.muted }}>{item.label}</span>
              {navActive === item.key && <div style={{ width: 4, height: 4, borderRadius: 2, background: COLORS.yellow }} />}
            </button>
          )
        )}
      </div>
    </div>
  );
}
