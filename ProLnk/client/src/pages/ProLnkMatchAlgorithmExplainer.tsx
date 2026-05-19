import { useState } from 'react';

export default function ProLnkMatchAlgorithmExplainer() {
  const [jobType, setJobType] = useState<string | null>(null);

  const jobs: Record<string, { factor: string; detail: string }[]> = {
    "🔥 HVAC Emergency": [
      { factor: "1. Proximity", detail: "Finds all HVAC pros within 15 miles — emergency radius is tighter for faster response." },
      { factor: "2. Emergency Availability", detail: "Only shows pros who have marked availability for urgent same-day calls right now." },
      { factor: "3. Charter Priority", detail: "Charter Pros with emergency capability are surfaced first — they committed to fast response times." },
      { factor: "4. Performance Score", detail: "Among available Charter Pros, ranked by their 90-day homeowner rating (out of 5.0)." },
      { factor: "5. Response Time", detail: "Pros with faster average response-to-accept times are ranked higher to ensure you get a reply fast." },
    ],
    "🏠 Roof Replacement": [
      { factor: "1. Specialty Match", detail: "Only licensed roofing contractors are considered — no generalists for a full replacement job." },
      { factor: "2. Proximity", detail: "Prioritizes pros within 25 miles for material delivery and multi-day project logistics." },
      { factor: "3. Charter Priority", detail: "Charter Pros have pre-qualified for larger projects and get first look at replacement jobs." },
      { factor: "4. Project Capacity", detail: "Algorithm checks current workload — pros already booked solid this week are deprioritized." },
      { factor: "5. Performance Score", detail: "Final ranking by 12-month performance score, weighted toward large-project reviews specifically." },
    ],
    "💧 Plumbing Leak": [
      { factor: "1. Proximity", detail: "Radius tightened to 10 miles — active leak means every minute matters." },
      { factor: "2. License Type", detail: "Confirms state plumbing license — not just a handyman with plumbing experience." },
      { factor: "3. Availability", detail: "Real-time availability check across all matched pros before surfacing options." },
      { factor: "4. Charter Priority", detail: "Charter Pros are shown first regardless of tier if they are within 10 miles and available." },
      { factor: "5. Performance Score", detail: "Ranked by overall score, then by number of completed plumbing jobs specifically." },
    ],
    "⚡ Electrical Panel": [
      { factor: "1. Specialty Match", detail: "Panel work requires licensed electrician — algorithm filters strictly on license type and scope." },
      { factor: "2. Permit Capability", detail: "Prioritizes pros who can pull permits — panel work almost always requires one." },
      { factor: "3. Proximity", detail: "25-mile radius with preference for pros who know local inspector relationships." },
      { factor: "4. Charter Priority", detail: "Charter Pros flagged for commercial/panel work are surfaced first in this specialty." },
      { factor: "5. Performance Score", detail: "Ranked by electrical-specific reviews, weighted for permit and inspection success rates." },
    ],
  };

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🧠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, marginBottom: 12 }}>The ProLnk Match Algorithm</h1>
          <p style={{ fontSize: 18, color: "#94a3b8″, lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
            Not random. Not paid placement. ProLnk matches on 5 factors in real time — proximity, specialty, availability, performance, and tier.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 36 }}>
          {[
            { icon: "📍", label: "Proximity", desc: "Distance-weighted radius by job urgency and type" },
            { icon: "🎯", label: "Specialty", desc: "License and trade-specific experience match" },
            { icon: "📅", label: "Availability", desc: "Real-time schedule and capacity check" },
            { icon: "⭐", label: "Performance", desc: "90-day and 12-month homeowner rating scores" },
            { icon: "👑", label: "Charter Tier", desc: "Charter Pros get first pick of every matching job" },
            { icon: "⚡", label: "Response Time", desc: "Historical accept speed for urgent jobs" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#0f1f3d", borderRadius: 12, padding: 16, textAlign: "center", border: "1px solid #1e3a6e" }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: 14, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: "#94a3b8″, fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 16, padding: 28, border: "1px solid #1e3a6e" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642″, marginBottom: 6 }}>How Your Job Gets Matched</h2>
          <p style={{ color: "#94a3b8″, fontSize: 14, marginBottom: 20 }}>Select a job type to see the step-by-step match logic:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {Object.keys(jobs).map((j) => (
              <button key={j} onClick={() => setJobType(jobType === j ? null : j)}
                style={{ background: jobType === j ? "#F5E642″ : "#1e3a6e", color: jobType === j ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                {j}
              </button>
            ))}
          </div>
          {jobType && (
            <div style={{ background: "#0A1628″, borderRadius: 10, padding: 16, border: "1px solid #F5E642" }}>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 14 }}>{jobType} — Match Steps:</div>
              {jobs[jobType].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <div style={{ background: "#F5E642″, color: "#0A1628", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#e2e8f0″, marginBottom: 2 }}>{step.factor}</div>
                    <div style={{ color: "#94a3b8″, fontSize: 14, lineHeight: 1.5 }}>{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
