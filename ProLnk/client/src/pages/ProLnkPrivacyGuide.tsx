import { useState } from 'react';

const concerns = ["What We Collect", "What We Don't Sell", "Your CCPA Rights", "Account Deletion", "Data Retention"];

const answers: Record<string, { icon: string; title: string; body: string }[]> = {
  "What We Collect": [
    { icon: "📧", title: "Contact Information", body: "Name, email, phone, and mailing address — used to create your account and deliver service matches." },
    { icon: "🏠", title: "Home Data", body: "Your address, home age, square footage, and service history — stored in your Home Health Vault and used to match you with the right pros." },
    { icon: "📋", title: "Service Records", body: "Details of jobs requested, completed, and rated — used to improve match quality and maintain your Vault history." },
    { icon: "📍", title: "Location Data", body: "Approximate location (zip code + city) used for geo-matching. We do not track GPS or real-time movement." },
  ],
  "What We Don't Sell": [
    { icon: "🚫", title: "No Data Sales — Ever", body: "ProLnk does not sell, rent, trade, or license your personal data to any third party. Our business model is subscriptions and match fees, not data monetization." },
    { icon: "🚫", title: "No Advertising Profiles", body: "We do not build advertising profiles from your data or share data with ad platforms like Google Ads, Meta, or programmatic networks." },
    { icon: "🚫", title: "No Broker Sharing", body: "We do not share data with data brokers, background check companies, or marketing aggregators." },
  ],
  "Your CCPA Rights": [
    { icon: "🔍", title: "Right to Know", body: "You can request a full report of what data ProLnk holds about you. Requests are fulfilled within 45 days." },
    { icon: "🗑️", title: "Right to Delete", body: "Request deletion of all your personal data at any time. Deletion is completed within 30 days, with confirmation sent to your email." },
    { icon: "🚫", title: "Right to Opt Out", body: "You can opt out of any non-essential data use. ProLnk does not sell data, so this right is already exercised by default." },
    { icon: "⚖️", title: "Non-Discrimination", body: "Exercising your privacy rights will not affect your service quality, pricing, or access to ProLnk features." },
  ],
  "Account Deletion": [
    { icon: "🗑️", title: "How to Delete Your Account", body: "Go to Account Settings → Privacy → Delete Account. Confirm your identity and the deletion process begins immediately." },
    { icon: "⏱️", title: "Deletion Timeline", body: "Personal data is removed within 30 days. Anonymized, aggregated records (e.g., job category totals) may be retained for platform analytics." },
    { icon: "📦", title: "Export Before Deleting", body: "We recommend exporting your Home Health Vault data before deletion. Exports are available in PDF or JSON format within 48 hours of request." },
  ],
  "Data Retention": [
    { icon: "📅", title: "Active Account Data", body: "Retained for the life of your account plus 90 days after closure for dispute resolution." },
    { icon: "📊", title: "Financial Records", body: "Transaction records are retained for 7 years per IRS requirements. These are anonymized after account deletion." },
    { icon: "🔒", title: "Vault Records", body: "Home Health Vault data is retained until you explicitly request deletion — it is your data asset to keep or remove." },
  ],
};

export default function ProLnkPrivacyGuide() {
  const [activeConcern, setActiveConcern] = useState(concerns[0]);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>Privacy Guide</h1>
          <p style={{ color: "#94A3B8", fontSize: 16 }}>Plain English explanation of how ProLnk protects your data</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32, justifyContent: "center" }}>
          {concerns.map((c) => (
            <button key={c} onClick={() => setActiveConcern(c)}
              style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                background: activeConcern === c ? "#F5E642" : "#1E2D45", color: activeConcern === c ? "#0A1628" : "#94A3B8" }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {(answers[activeConcern] || []).map((item, i) => (
            <div key={i} style={{ background: "#1E2D45", borderRadius: 12, padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <p style={{ fontWeight: 700, color: "#F5E642", marginBottom: 6 }}>{item.title}</p>
                <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.7 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, background: "#1E2D45", borderRadius: 16, padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📬</div>
          <p style={{ fontWeight: 700, color: "#fff", marginBottom: 6 }}>Privacy questions or requests?</p>
          <p style={{ color: "#94A3B8", fontSize: 13, marginBottom: 20 }}>Email privacy@prolnk.io — we respond within 2 business days</p>
          <button style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer" }}>
            Submit a Privacy Request
          </button>
        </div>
      </div>
    </div>
  );
}