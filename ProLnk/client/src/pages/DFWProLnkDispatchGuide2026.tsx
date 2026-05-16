import { useState } from 'react';

const scenarios: Record<string, { steps: string[]; tips: string[] }> = {
  "New Match Arrives": {
    steps: [
      "📱 Push notification + SMS sent simultaneously — check both",
      "🔲 Open ProLnk app — match details show homeowner scope, location, and job type",
      "🔲 Review match score — Charter pros see matches ranked by fit to your trade and territory",
      "⏱️ Accept within 30 minutes for Priority status — response time is scored",
      "🔲 Tap Accept — homeowner notified instantly, contact info unlocked",
      "🔲 Call or message homeowner within 1 hour of accepting",
      "🔲 Confirm scheduling in app — ProLnk logs confirmation timestamp",
    ],
    tips: [
      "💡 Accepting in under 10 min boosts your response score and future match priority",
      "💡 Homeowner sees your Charter badge, reviews, and trade credentials immediately",
      "💡 Job details are pre-filled from Home Health Vault — homeowner scope is already there",
    ],
  },
  "Declining a Match": {
    steps: [
      "🔲 You may decline 1 match per day without penalty",
      "🔲 Tap Decline in app — select reason from menu (capacity, distance, scope mismatch)",
      "🔲 Match is released to next Charter pro in queue automatically",
      "⚠️ Second decline in one day lowers your daily match priority for 48 hours",
      "⚠️ Three declines in a week triggers a Charter review notification",
      "🔲 If at capacity, use Snooze Availability in settings — no penalty",
    ],
    tips: [
      "💡 Snooze mode is always better than declining — preserves your response score",
      "💡 Set snooze with end date — system auto-restores your match flow",
      "💡 Capacity management is a Charter metric — pros who manage it well rank higher",
    ],
  },
  "Scheduling Confirmation": {
    steps: [
      "🔲 After accepting, open the Scheduling tab on the job",
      "🔲 Select available time slots — homeowner selects from your options",
      "🔲 Homeowner confirms — both parties receive confirmation notification",
      "🔲 24-hour reminder sent automatically by ProLnk to both parties",
      "🔲 Day-of reminder sent at 7am — homeowner receives ETA window",
      "🔲 Mark En Route in app when leaving — homeowner gets live notification",
      "🔲 Mark Job Started on arrival — timestamps the job record",
    ],
    tips: [
      "💡 Offering same-day or next-day slots increases acceptance rate significantly",
      "💡 Homeowners rate communication speed — in-app messaging is tracked",
    ],
  },
  "Job Completion": {
    steps: [
      "🔲 Complete all work as scoped",
      "🔲 Mark Job Complete in app — triggers homeowner review request",
      "🔲 Capture completion photos — stored in homeowner Home Health Vault permanently",
      "🔲 Submit invoice through ProLnk — homeowner pays in app",
      "🔲 Payment released to your payout account within 2 business days",
      "🔲 Review and rating sent to homeowner — respond to all reviews in app",
    ],
    tips: [
      "💡 Completion photos are a Charter differentiator — homeowners see them in their Vault forever",
      "💡 Payment disputes are rare when scope is confirmed in app before work begins",
    ],
  },
};

const scenarioKeys = Object.keys(scenarios);

export default function DFWProLnkDispatchGuide2026() {
  const [scenario, setScenario] = useState<string>(scenarioKeys[0]);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>📡</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", margin: "12px 0 8px" }}>
            ProLnk Job Dispatch & Scheduling Guide 2026
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 580, margin: "0 auto" }}>
            How ProLnk dispatches matches to Charter pros — what to expect, how to respond, and how to protect your response score.
          </p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 8 }}>⚡ Response Time Scoring</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
            {[["Under 10 min", "🏆 Priority Boost"], ["10-30 min", "✅ Standard"], ["30-60 min", "⚠️ Below Average"], ["60+ min", "🔴 Score Penalty"]].map(([time, label]) => (
              <div key={time} style={{ background: "#0A1628", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e3a5f", textAlign: "center" }}>
                <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13 }}>{time}</div>
                <div style={{ color: "#94a3b8", fontSize: 12 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>Select Scenario → Pro Response Guide</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
            {scenarioKeys.map(s => (
              <button
                key={s}
                onClick={() => setScenario(s)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: scenario === s ? "#F5E642" : "#1a2f55",
                  color: scenario === s ? "#0A1628" : "#e2e8f0",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {scenarios[scenario].steps.map((item, i) => (
              <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "11px 16px", fontSize: 14, color: "#e2e8f0", border: "1px solid #1e3a5f" }}>
                {item}
              </div>
            ))}
          </div>
          <h3 style={{ color: "#F5E642", fontSize: 14, marginBottom: 10 }}>Pro Tips</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {scenarios[scenario].tips.map((tip, i) => (
              <div key={i} style={{ background: "#0a1a0a", borderRadius: 8, padding: "11px 16px", fontSize: 14, color: "#86efac", border: "1px solid #14532d" }}>
                {tip}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <p style={{ color: "#0A1628", fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>Join ProLnk Charter — DFW Founding Slots Available</p>
          <p style={{ color: "#1a2f55", fontSize: 14, margin: 0 }}>Lock your founding rate at prolnk.io — waitlist closes at 500 Charter members</p>
        </div>
      </div>
    </div>
  );
}

