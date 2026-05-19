import { useState } from 'react';

const situations = [
  { id: "new", label: "Just bought a DFW home", message: "Welcome to North Texas homeownership. Your HVAC is about to become your best friend and biggest maintenance line. The good news: you now have everything you need. Start with a spring tune-up, set your thermostat to 78°F when home and 85°F when away — never off — and change your filter every month May through October. You are already ahead of 80% of DFW homeowners.", emoji: "🏠" },
  { id: "old", label: "My HVAC is 10+ years old", message: "You are in the decision zone. Start applying the $5,000 rule to every repair: multiply the unit's age by the repair cost. If the number exceeds $5,000, replacement is almost always smarter. Get 3 quotes now so you are never making this decision in a DFW July emergency. A 16+ SEER2 replacement will cut your electricity bill 20–35%. You have done the research — now act before summer.", emoji: "⏰" },
  { id: "emergency", label: "AC stopped working in summer", message: "Call a tech immediately — this is a DFW emergency. While you wait: check the circuit breaker, check the drain float switch (it may have shut off due to a clog), and check the thermostat batteries. Do NOT crank the thermostat to 60°F. Once the tech arrives, ask for a full diagnostic, not just the fix. Understand WHY it failed so you can prevent it next time. ProLnk can connect you with a vetted tech in under 24 hours.", emoji: "🚨" },
  { id: "high-bill", label: "My electricity bill is sky-high", message: "The top DFW culprits: a dirty evaporator coil (reduces efficiency 20–30%), low refrigerant (unit runs non-stop), a failing capacitor (draws excess amps), or a 10+ SEER2 unit that needs replacement. Start with a tune-up — the tech will catch all of these. Also check your setpoints: every degree below 78°F costs 6–8% more in DFW summers. Small changes compound into hundreds of dollars.", emoji: "💸" },
  { id: "considering", label: "Thinking about replacing my unit", message: "Smart move to research first. In DFW, 16–18 SEER2 is the sweet spot. Consider dual-fuel (heat pump + gas backup) for maximum efficiency year-round. Get quotes in March or September — not July — for the best pricing and fastest installation. Ask about Oncor and Reliant rebates ($300–$800 available). Finance if needed: the electricity savings will cover the payment. ProLnk can get you 3 vetted quotes with one request.", emoji: "🔄" },
  { id: "done", label: "Just finished reading everything", message: "You have just completed one of the most comprehensive DFW HVAC resources ever assembled. 3,100+ pages of North Texas-specific guidance. You now know more about DFW HVAC than most contractors' service managers. The knowledge is yours. The next step is execution: one tune-up, one filter change, one smart thermostat. Start this week. Your HVAC will reward you with years of reliable service — and ProLnk will be here when you need a pro.", emoji: "🎓" },
];

const stats = [
  { num: "3,100+", label: "Pages built" },
  { num: "15″, label: "Best practices" },
  { num: "10″, label: "Worst practices" },
  { num: "5″, label: "Decision guides" },
  { num: "8″, label: "Timeline stages" },
  { num: "1″, label: "ProLnk promise" },
];

export default function DFWHVACCompletionPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);

  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 52 }}>🏆</div>
          <h1 style={{ color: "#F5E642″, fontSize: 30, margin: "12px 0 8px" }}>The Most Comprehensive DFW HVAC Resource Ever Built</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16, margin: 0 }}>3,100+ pages. One mission: DFW homeowners who never get taken advantage of again.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 36 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "#1e293b", border: "1px solid #334155″, borderRadius: 10, padding: "16px 12px", textAlign: "center" }}>
              <div style={{ color: "#F5E642″, fontSize: 26, fontWeight: 700 }}>{s.num}</div>
              <div style={{ color: "#94a3b8″, fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 22, marginBottom: 28 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Your HVAC situation → your personalized final message</div>
          <div style={{ display: "grid", gap: 8 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{ background: selected === s.id ? "#1e3a5f" : "#0A1628″, border: selected === s.id ? "1px solid #F5E642" : "1px solid #334155", borderRadius: 8, padding: "11px 16px", cursor: "pointer", textAlign: "left", color: "#fff", display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 20 }}>{s.emoji}</span>
                <span style={{ fontWeight: 500 }}>{s.label}</span>
                {selected === s.id && <span style={{ marginLeft: "auto", color: "#F5E642″ }}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: "#1e3a5f", border: "1px solid #F5E642″, borderRadius: 12, padding: 24, marginBottom: 28 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{active.emoji}</div>
            <p style={{ color: "#e2e8f0″, lineHeight: 1.8, margin: 0, fontSize: 16 }}>{active.message}</p>
          </div>
        )}

        <div style={{ background: "linear-gradient(135deg, #1e293b, #1e3a5f)", border: "2px solid #F5E642″, borderRadius: 16, padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🤝</div>
          <h2 style={{ color: "#F5E642″, fontSize: 22, margin: "0 0 12px" }}>The ProLnk Promise for DFW HVAC</h2>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7, marginBottom: 20, fontSize: 15 }}>
            Every contractor in our network is licensed, insured, and reviewed by real DFW homeowners.
            No bait-and-switch pricing. No unnecessary upsells. Just vetted professionals who show up on time.
          </p>
          {joined ? (
            <div style={{ background: "#14532d", border: "1px solid #22c55e", borderRadius: 10, padding: "14px 20px", color: "#86efac", fontWeight: 700, fontSize: 16 }}>
              ✅ You're on the list. We’ll reach out when we launch in your area.
            </div>
          ) : (
            <button onClick={() => setJoined(true)}
              style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 10, padding: "14px 36px", fontWeight: 700, fontSize: 17, cursor: "pointer", display: "block", margin: "0 auto", width: "100%", maxWidth: 320 }}>
              🚀 Join the ProLnk Waitlist — Free
            </button>
          )}
          <p style={{ color: "#64748b", fontSize: 12, marginTop: 12 }}>No spam. No sales calls. Just access when we launch.</p>
        </div>
      </div>
    </div>
  );
}
