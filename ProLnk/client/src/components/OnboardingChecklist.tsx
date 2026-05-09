import { CheckCircle, Circle, Clock, ExternalLink } from "lucide-react";
import { Link } from "wouter";

const QUALIFICATION_STEPS = [
  {
    id: "license",
    title: "Active Trade License",
    desc: "Your license will be verified by ProLnk before admission.",
    action: "Upload in Profile Settings",
    href: "/profile",
    required: true,
  },
  {
    id: "insurance",
    title: "General Liability Insurance",
    desc: "Current certificate of insurance confirming active coverage.",
    action: "Upload COI",
    href: "/profile",
    required: true,
  },
  {
    id: "background",
    title: "Background Check",
    desc: "Processed through ProLnk\'s screening partner. Takes 24-48 hours.",
    action: "Authorize Check",
    href: "/profile",
    required: true,
  },
  {
    id: "homes",
    title: "Document 15 Homes",
    desc: "Upload job-site photos at 15 properties. Each documented home earns you permanent origination rights.",
    action: "Upload Photos",
    href: "/photo-upload",
    required: true,
    count: true,
    target: 15,
  },
  {
    id: "referrals",
    title: "Refer 5 Qualified Professionals",
    desc: "Invite 5 licensed, insured pros to apply. They must meet the same qualification standard.",
    action: "Share Referral Link",
    href: "/waitlist-status",
    required: true,
    count: true,
    target: 5,
  },
  {
    id: "profile",
    title: "Complete Your Profile",
    desc: "Full service area, trade categories, and business information.",
    action: "Complete Profile",
    href: "/profile",
    required: true,
  },
  {
    id: "subscription",
    title: "Subscription Commitment",
    desc: "$149/month after 90-day free trial. Locked forever at this rate.",
    action: "Start Free Trial",
    href: "/checkout",
    required: true,
  },
];

interface Props {
  completedSteps?: string[];
  homeCount?: number;
  referralCount?: number;
}

export default function OnboardingChecklist({ completedSteps = [], homeCount = 0, referralCount = 0 }: Props) {
  const totalRequired = QUALIFICATION_STEPS.length;
  const completed = completedSteps.length;
  const pct = Math.round((completed / totalRequired) * 100);

  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0A1628", marginBottom: 4 }}>
          Qualification Checklist
        </h3>
        <p style={{ fontSize: 13, color: "#6B7280" }}>
          {completed}/{totalRequired} requirements met · {pct}% complete
        </p>
        <div style={{ marginTop: 10, background: "#F3F4F6", borderRadius: 100, height: 8 }}>
          <div style={{ background: "#0A1628", borderRadius: 100, height: 8, width: `${pct}%`, transition: "width 0.5s ease" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {QUALIFICATION_STEPS.map(step => {
          const done = completedSteps.includes(step.id) ||
            (step.id === "homes" && homeCount >= 15) ||
            (step.id === "referrals" && referralCount >= 5);
          
          const current = step.id === "homes" ? homeCount : step.id === "referrals" ? referralCount : null;

          return (
            <div key={step.id} style={{
              display: "flex",
              gap: 12,
              padding: "12px 16px",
              background: done ? "#F0FDF4" : "#F9FAFB",
              border: `1px solid ${done ? "#BBF7D0" : "#E5E7EB"}`,
              borderRadius: 12,
            }}>
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                {done
                  ? <CheckCircle style={{ width: 18, height: 18, color: "#10B981" }} />
                  : <Circle style={{ width: 18, height: 18, color: "#D1D5DB" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: done ? "#065F46" : "#111827", margin: 0 }}>
                    {step.title}
                    {current !== null && (
                      <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 400, color: current >= (step.target || 0) ? "#10B981" : "#6B7280" }}>
                        {current}/{step.target}
                      </span>
                    )}
                  </p>
                  {!done && step.href && (
                    <Link href={step.href}>
                      <span style={{ fontSize: 12, color: "#0A1628", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
                        {step.action} <ExternalLink style={{ width: 10, height: 10 }} />
                      </span>
                    </Link>
                  )}
                </div>
                <p style={{ fontSize: 12, color: "#6B7280", margin: "4px 0 0" }}>{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {completed === totalRequired && (
        <div style={{ marginTop: 16, background: "#0A1628", borderRadius: 12, padding: 16, textAlign: "center" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, margin: 0 }}>
            ✓ All requirements met — Application under review
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: "4px 0 0" }}>
            ProLnk will contact you within 24 hours with your approval decision.
          </p>
        </div>
      )}
    </div>
  );
}
