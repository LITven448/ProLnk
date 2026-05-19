import { useState } from 'react';

export default function ProLnkHowItWorks() {
  const [userType, setUserType] = useState<'homeowner' | 'pro'>('homeowner');

  const homeownerSteps = [
    { icon: "📝", step: "Step 1″, title: "Submit Your Request", desc: "Tell us what you need — trade type, urgency, property address, and any details. Takes 90 seconds." },
    { icon: "🔗", step: "Step 2″, title: "ProLnk Matches You", desc: "Our algorithm instantly finds verified local pros ranked by proximity, specialty, availability, and performance score." },
    { icon: "⭐", step: "Step 3″, title: "Pro Delivers, You Rate", desc: "Your pro shows up, completes the work, and you rate the experience. Every job logs to your Home Health Vault automatically." },
  ];

  const proSteps = [
    { icon: "✅", step: "Step 1″, title: "Get Verified", desc: "Complete license check, insurance verification, and background screen. Earn your ProLnk Verified badge in 24-48 hours." },
    { icon: "📲", step: "Step 2″, title: "Receive Matched Leads", desc: "Charter Pros get first pick of every match in their territory. Respond within your availability window to claim the job." },
    { icon: "💰", step: "Step 3″, title: "Complete and Earn", desc: "Deliver the service, collect payment, and watch your performance score rise. Higher scores mean priority on future matches." },
  ];

  const steps = userType === 'homeowner' ? homeownerSteps : proSteps;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔗</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, marginBottom: 12 }}>How ProLnk Works</h1>
          <p style={{ fontSize: 18, color: "#94a3b8″, lineHeight: 1.6, maxWidth: 580, margin: "0 auto" }}>
            Simple. Transparent. No hidden fees. ProLnk connects verified pros with homeowners in 3 steps.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 36 }}>
          {(['homeowner', 'pro'] as const).map((t) => (
            <button key={t} onClick={() => setUserType(t)}
              style={{ background: userType === t ? "#F5E642″ : "#0f1f3d", color: userType === t ? "#0A1628" : "#fff", border: "1px solid #1e3a6e", borderRadius: 24, padding: "10px 28px", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
              {t === 'homeowner' ? '🏠 I Need Work Done' : '🔧 I Am a Pro'}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
          {steps.map((s, i) => (
            <div key={s.step} style={{ display: "flex", gap: 20, alignItems: "flex-start", background: "#0f1f3d", borderRadius: 14, padding: 24, border: "1px solid #1e3a6e" }}>
              <div style={{ background: "#F5E642″, color: "#0A1628", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
                {i + 1}
              </div>
              <div>
                <div style={{ color: "#F5E642″, fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{s.step}</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{s.icon} {s.title}</div>
                <div style={{ color: "#94a3b8″, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { icon: "🚫", label: "No Hidden Fees", desc: "Price shown is price paid. ProLnk earns from pro subscriptions, not homeowner markups." },
            { icon: "⭐", label: "Charter Pro Priority", desc: "Charter members get first pick of every match in their trade and territory." },
            { icon: "🏦", label: "Auto Vault Logging", desc: "Every completed job automatically logs to the homeowner's Home Health Vault." },
          ].map((item) => (
            <div key={item.label} style={{ background: "#0f1f3d", borderRadius: 12, padding: 18, textAlign: "center", border: "1px solid #1e3a6e" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 6, fontSize: 14 }}>{item.label}</div>
              <div style={{ color: "#94a3b8″, fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
