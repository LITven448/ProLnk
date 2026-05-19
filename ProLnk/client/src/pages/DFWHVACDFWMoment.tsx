import { useState } from "react";

const situations = [
  {
    now: "My AC has not been serviced this year",
    action: "Book a tune-up this week. The DFW tune-up window closes in late May — after that, every certified tech is on emergency calls. A tune-up now costs $150-$250. An emergency call in July starts at $400 plus parts.",
  },
  {
    now: "I am on the ProLnk Charter waitlist",
    action: "You are in the right place. The Charter waitlist closes at 500 applications. At that point, founding pricing locks and the next tier opens at higher rates. Review the 3,200+ page DFW library now — it is all available to waitlist members.",
  },
  {
    now: "I have not joined the waitlist yet",
    action: "Join today. Charter membership locks in founding pricing permanently — even after ProLnk goes live to the full DFW market. The waitlist closes at 500 applications and we are approaching that number now.",
  },
  {
    now: "My system is making unusual sounds",
    action: "Do not wait. Unusual sounds in May — before peak season — are your warning window. A failing capacitor or low refrigerant caught now is a $200-$400 fix. The same problem in July during a heat wave means 3-5 day wait plus emergency rates.",
  },
  {
    now: "I want to add my home to the Home Health Vault",
    action: "May is ideal. Adding your home now means your first summer's data — system performance, service records, efficiency metrics — is captured from the start. This is the data buyers will ask for when you sell.",
  },
  {
    now: "I am comparing ProLnk to other services",
    action: "The 3,200+ pages of DFW-specific content available now — before launch — is the comparison. No other home services platform has built a DFW knowledge library of this depth. Read any 10 pages and you will understand the difference.",
  },
];

export default function DFWHVACDFWMoment() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>⏱️</div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: "800″, color: "#F5E642", marginBottom: "16px", lineHeight: 1.2 }}>
            What DFW Homeowners Should Know Right Now
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#94a3b8″, maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
            May 2026 is a specific moment with specific stakes. Summer is 3-4 weeks away. The tune-up window is closing. The Charter waitlist is closing. Here is what to do today based on your situation.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "36px" }}>
          {[
            { label: "Weeks to Peak Heat", value: "3-4″, desc: "DFW July average: 99F" },
            { label: "Pages Available Now", value: "3,200+", desc: "All DFW HVAC content" },
            { label: "Charter Spots Left", value: "Limited", desc: "Closes at 500 applications" },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: "#0F2040″, borderRadius: "12px", padding: "20px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: "800″, color: "#F5E642", marginBottom: "4px" }}>{stat.value}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: "700″, color: "#fff", marginBottom: "4px" }}>{stat.label}</div>
              <div style={{ fontSize: "0.78rem", color: "#94a3b8″ }}>{stat.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "1.4rem", fontWeight: "700″, color: "#fff", marginBottom: "20px", textAlign: "center" }}>
          Select your situation right now to see what to do today
        </h2>

        <div style={{ display: "grid", gap: "12px", marginBottom: "32px" }}>
          {situations.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                backgroundColor: selected === i ? "#F5E642″ : "#0F2040",
                color: selected === i ? "#0A1628″ : "#fff",
                border: "1px solid " + (selected === i ? "#F5E642″ : "#1e3a5f"),
                borderRadius: "10px",
                padding: "16px 20px",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600″,
                transition: "all 0.2s",
                width: "100%",
              }}
            >
              {selected === i ? "✅" : "📍"} {item.now}
              {selected === i && (
                <div style={{ marginTop: "10px", fontSize: "0.92rem", fontWeight: "400″, color: "#0A1628", lineHeight: 1.6 }}>
                  ⚡ {item.action}
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: "#0F2040″, borderRadius: "16px", padding: "28px", border: "1px solid #F5E642" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700″, color: "#F5E642", marginBottom: "10px" }}>🕐 The Window That Closes</h3>
          <p style={{ color: "#94a3b8″, lineHeight: 1.7, margin: 0 }}>
            Two windows close this month: the HVAC tune-up window (before summer demand peaks) and the Charter waitlist (before ProLnk goes live). Both are time-sensitive. Both have permanent consequences. DFW homeowners who act in May 2026 will look back at this as the right moment.
          </p>
        </div>
      </div>
    </div>
  );
}
