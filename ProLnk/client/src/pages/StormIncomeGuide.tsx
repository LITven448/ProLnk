import { Link } from "wouter";

const timelineSteps = [
  {
    time: "Hour 0",
    event: "Storm Detected",
    detail: "Tomorrow.io weather API identifies hail event — size, speed, and affected ZIP codes logged in real time.",
  },
  {
    time: "Hour 0–15 min",
    event: "Storm Intelligence Activated",
    detail: "ProLnk Storm Intelligence cross-references affected ZIPs against registered partner service areas.",
  },
  {
    time: "Hour 15 min",
    event: "Leads Auto-Dispatched",
    detail: "Storm leads pushed instantly to active roofing and exterior partners in the affected area.",
  },
  {
    time: "Hours 1–4",
    event: "Partners Accept & Contact",
    detail: "Partners claim leads via the app and begin making contact with homeowners while damage is fresh.",
  },
  {
    time: "Hours 4–24",
    event: "Estimates, Claims & Bookings",
    detail: "Estimates submitted, insurance claims filed, jobs booked. Fast movers lock the best jobs.",
  },
  {
    time: "Hours 24–72",
    event: "Peak Earning Window",
    detail: "A prepared partner completes 3–8 inspections per day during this window. This is where income is made.",
  },
];

const checklist = [
  "Profile complete with license, photos, and service area",
  "Job photos uploaded (minimum 5 recent projects)",
  "Service area ZIP codes current and accurate",
  "Storm alert notifications enabled in settings",
  "Phone charged and available — leads arrive fast",
];

export default function StormIncomeGuide() {
  return (
    <div style={{ background: "#FAFAF9", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "#0F2D52", padding: "64px 24px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#F5C842", color: "#0F2D52", fontWeight: 700, fontSize: 12, letterSpacing: 2, padding: "4px 14px", borderRadius: 20, marginBottom: 20, textTransform: "uppercase" }}>
          Storm Dispatch System
        </div>
        <h1 style={{ color: "#fff", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800, margin: "0 auto 20px", maxWidth: 760, lineHeight: 1.2 }}>
          The DFW Storm Income Guide — How to Earn $3,000+ in 48 Hours After a Hail Event
        </h1>
        <p style={{ color: "#CBD5E1", fontSize: 18, maxWidth: 660, margin: "0 auto" }}>
          DFW averages 3–5 significant hail events per year. The 72 hours after a major storm are the
          highest-earning opportunity in home services. ProLnk partners have earned{" "}
          <strong style={{ color: "#F5C842" }}>$3,000–$8,000 in a single weekend</strong> using the Storm Dispatch system.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 24px" }}>

        {/* Timeline */}
        <h2 style={{ color: "#0F2D52", fontSize: 26, fontWeight: 700, marginBottom: 32 }}>
          What Happens When a Storm Hits
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {timelineSteps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              {/* spine */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 40 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", background: "#F5C842",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 14, color: "#0F2D52", flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                {i < timelineSteps.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: "#E2E8F0", minHeight: 32 }} />
                )}
              </div>
              {/* content */}
              <div style={{ paddingBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ background: "#EFF6FF", color: "#1E40AF", fontWeight: 700, fontSize: 12, padding: "2px 10px", borderRadius: 12 }}>
                    {step.time}
                  </span>
                  <span style={{ fontWeight: 700, color: "#0F2D52", fontSize: 17 }}>{step.event}</span>
                </div>
                <p style={{ color: "#475569", fontSize: 15, margin: "8px 0 0", lineHeight: 1.6 }}>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Real Math */}
        <div style={{ background: "#0F2D52", borderRadius: 16, padding: "36px 36px", margin: "48px 0", color: "#fff" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#F5C842", textTransform: "uppercase", marginBottom: 12 }}>
            Real Storm Weekend Math
          </div>
          <div style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, marginBottom: 24 }}>
            One storm weekend = $2,419
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              ["6", "Storm leads dispatched"],
              ["×40%", "Book rate"],
              ["×$14,000", "Avg roof replacement"],
              ["×10%", "ProLnk partner commission"],
              ["×72%", "Your take-home after network"],
              ["= $2,419", "Storm weekend income"],
            ].map(([val, label], i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: i === 5 ? "#F5C842" : "#fff" }}>{val}</div>
                <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#94A3B8", fontSize: 13, marginTop: 20 }}>
            Based on 6 dispatched leads, 40% booking rate, $14,000 average roof replacement value, 10% ProLnk commission, 72% partner take-home after network fee share.
          </p>
        </div>

        {/* Storm Prep Checklist */}
        <h2 style={{ color: "#0F2D52", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
          Storm Prep Checklist
        </h2>
        <p style={{ color: "#64748B", fontSize: 15, marginBottom: 24 }}>
          When a storm hits, the first partners to respond win. Be ready before the season starts.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {checklist.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <span style={{ color: "#16A34A", fontWeight: 800, fontSize: 13 }}>✓</span>
              </div>
              <span style={{ color: "#1E293B", fontSize: 15, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#64748B", textTransform: "uppercase", marginBottom: 12 }}>
            Be Ready Before the Next Storm
          </div>
          <h2 style={{ color: "#0F2D52", fontSize: 28, fontWeight: 800, marginBottom: 16 }}>
            Activate Your Storm Alerts
          </h2>
          <p style={{ color: "#64748B", fontSize: 16, maxWidth: 480, margin: "0 auto 28px" }}>
            Join the network now and be positioned when the next hail event hits DFW.
          </p>
          <Link
            to="/apply"
            style={{
              display: "inline-block", background: "#F5C842", color: "#0F2D52",
              fontWeight: 800, fontSize: 17, padding: "16px 40px", borderRadius: 10,
              textDecoration: "none",
            }}
          >
            Activate Storm Alerts →
          </Link>
        </div>

      </div>
    </div>
  );
}
