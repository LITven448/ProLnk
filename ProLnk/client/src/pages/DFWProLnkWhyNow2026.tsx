import { useState } from 'react';

export default function DFWProLnkWhyNow2026() {
  const [userType, setUserType] = useState<string>("");

  const reasons: Record<string, { title: string; points: string[]; urgency: string }> = {
    pro: {
      title: "🔧 Why Right Now for DFW Service Pros",
      points: [
        "🚨 DFW contractor shortage: 30% of trade jobs are unfilled in 2026 — demand is at a record high",
        "🏆 Charter closes at 500 applications — first movers lock in best network position forever",
        "💰 Charter members get $149/mo locked for life — price increases after launch",
        "📈 Network income compounds from Day 1 — every week you wait is passive income lost",
        "🗺️ DFW launch imminent — early pros own the best territory positions in the network",
        "🤖 ProLnk AI handles job matching, dispatch, and follow-up — you just show up and do the work",
      ],
      urgency: "⚡ Charter applications are closing. Join before 500 slots fill.",
    },
    homeowner: {
      title: "🏠 Why Right Now for DFW Homeowners",
      points: [
        "🔍 Finding reliable contractors in DFW takes an average of 3.2 weeks in 2026 — ProLnk changes that",
        "💰 Joining Health Vault now starts building your documented home history before you need it",
        "📊 Documented homes sell for 4–8% more in the DFW market — start now, benefit at resale",
        "🚀 ProLnk is launching now — early homeowners get verified by the most responsive pros",
        "🏥 Home health tracking prevents expensive emergency repairs through proactive alerts",
        "🤝 Refer neighbors to ProLnk now and earn origination income on every home you bring in",
      ],
      urgency: "🏘️ DFW homeowner waitlist is open now. Secure your position.",
    },
    investor: {
      title: "💼 Why Right Now for DFW Investors",
      points: [
        "📈 DFW home services is a $4.2B annual market — growing 12% YoY from population growth",
        "🤖 ProLnk operates on 85% net margins with AI handling 80% of operations",
        "🧱 Data moat: Health Vault data becomes a permanent proprietary asset with 50M+ home potential",
        "🏆 First-mover: No competitor has combined lead marketplace + network income + home data",
        "🚀 Infrastructure complete — revenue model proven, launching into the fastest-growing US metro",
        "⏰ Seed round opens now — Charter waitlist validates market demand before close",
      ],
      urgency: "📊 Seed round access available now. Demand validation underway.",
    },
    scout: {
      title: "🌟 Why Right Now for ProLnk Scouts",
      points: [
        "💰 Scout origination rights are permanent — every home you originate pays you forever",
        "🏘️ DFW has 2.8M homes — scouts who start now can originate thousands of homes early",
        "📱 No trade license required — scouts are community connectors, not contractors",
        "🎯 HOA board members, property managers, and neighborhood leaders are perfect scouts",
        "🔗 Scouts earn on referrals, home originations, and pro recruitments simultaneously",
        "⚡ Early scouts get the best DFW territories before network is saturated",
      ],
      urgency: "🌐 Scout positions are unlimited now — but best territories are claimed first.",
    },
  };

  const stats = [
    { icon: "📉", stat: "30%", label: "DFW trade jobs unfilled" },
    { icon: "🏠", stat: "2.8M", label: "DFW homes to service" },
    { icon: "⏳", stat: "500", label: "Charter slots total" },
    { icon: "📈", stat: "12%", label: "Annual market growth" },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 800, margin: "8px 0 4px" }}>
            ProLnk Why Now Guide 2026
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>2026 is the only moment this opportunity exists. Here is why.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#1E2D45", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ color: "#F5E642", fontWeight: 900, fontSize: 24, marginTop: 4 }}>{s.stat}</div>
              <div style={{ color: "#94A3B8", fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 12 }}>👤 Who are you?</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[["pro", "🔧 Service Pro"], ["homeowner", "🏠 Homeowner"], ["investor", "💼 Investor"], ["scout", "🌟 Scout/Referrer"]].map(([val, label]) => (
              <button key={val} onClick={() => setUserType(val)} style={{
                padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer",
                background: userType === val ? "#F5E642" : "#0A1628",
                color: userType === val ? "#0A1628" : "#94A3B8",
                fontWeight: 700, fontSize: 13,
              }}>{label}</button>
            ))}
          </div>
        </div>

        {userType && reasons[userType] && (
          <div style={{ background: "#132137", borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #F5E642" }}>
            <div style={{ color: "#F5E642", fontWeight: 800, fontSize: 16, marginBottom: 14 }}>{reasons[userType].title}</div>
            {reasons[userType].points.map((point, i) => (
              <div key={i} style={{ color: "#CBD5E1", fontSize: 14, marginBottom: 10, paddingLeft: 8, borderLeft: "2px solid #F5E642" }}>
                {point}
              </div>
            ))}
            <div style={{ background: "#F5E642", borderRadius: 8, padding: "10px 14px", marginTop: 14 }}>
              <div style={{ color: "#0A1628", fontWeight: 800, fontSize: 13 }}>{reasons[userType].urgency}</div>
            </div>
          </div>
        )}

        <div style={{ background: "#F5E642", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>🚀</div>
          <div style={{ color: "#0A1628", fontWeight: 800, fontSize: 16, marginTop: 8 }}>The Window Is Open Now</div>
          <div style={{ color: "#1E2D45", fontSize: 13, marginTop: 6 }}>In 12 months, the best DFW network positions will be taken. In 24 months, Charter will be a legend. The time to act is today.</div>
        </div>
      </div>
    </div>
  );
}
