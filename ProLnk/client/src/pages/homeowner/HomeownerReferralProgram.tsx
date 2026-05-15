import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Gift, Copy, Share2, Users, CheckCircle, Clock,
  ArrowRight, Mail, MessageSquare, QrCode, Star,
  BookUser, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const STATS = [
  { label: "Neighbors Referred", value: "3",  icon: Users,   color: "#67E8F9" },
  { label: "Credits Earned",     value: "$75", icon: Gift,    color: "#22C55E" },
  { label: "Credits Available",  value: "$25", icon: Zap,     color: "#F59E0B" },
];

const STEPS = [
  { num: 1, icon: Share2,       label: "Share your link",         desc: "Send your unique referral link to a neighbor via text, email, or social media." },
  { num: 2, icon: Users,        label: "Neighbor signs up",       desc: "They create a free TrustyPro account using your referral link." },
  { num: 3, icon: CheckCircle,  label: "You both earn $25",       desc: "Once their first job is booked, you each receive a $25 service credit automatically." },
];

const REFERRAL_URL = "trustypro.io/join?ref=homeowner123";

interface Referral {
  name: string;
  city: string;
  date: string;
  status: "Signed Up" | "First Job Booked" | "Pending";
  credit: number | null;
}

const MOCK_REFERRALS: Referral[] = [
  { name: "Sarah M.",   city: "Allen, TX",    date: "May 3, 2026",  status: "First Job Booked", credit: 25 },
  { name: "James T.",   city: "Frisco, TX",   date: "May 8, 2026",  status: "Signed Up",        credit: null },
  { name: "Linda K.",   city: "McKinney, TX", date: "May 11, 2026", status: "Pending",           credit: null },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  "First Job Booked": { bg: "rgba(34,197,94,0.10)",  color: "#22C55E", border: "rgba(34,197,94,0.25)"  },
  "Signed Up":        { bg: "rgba(103,232,249,0.10)", color: "#67E8F9", border: "rgba(103,232,249,0.25)" },
  "Pending":          { bg: "rgba(245,158,11,0.10)",  color: "#F59E0B", border: "rgba(245,158,11,0.25)"  },
};

const STATUS_ICON: Record<string, typeof CheckCircle> = {
  "First Job Booked": CheckCircle,
  "Signed Up":        Users,
  "Pending":          Clock,
};

export default function HomeownerReferralProgram() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${REFERRAL_URL}`).then(() => {
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleShareText = () => {
    const msg = `Hey! I've been using TrustyPro for home services and love it. Sign up with my link and we both get $25 credit: https://${REFERRAL_URL}`;
    if (navigator.share) {
      navigator.share({ title: "Join TrustyPro", text: msg });
    } else {
      window.open(`sms:&body=${encodeURIComponent(msg)}`);
    }
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("Get $25 off your first home service with TrustyPro");
    const body = encodeURIComponent(
      `Hi!\n\nI've been using TrustyPro to find trusted home service pros and it's been great. Use my referral link to sign up and we'll both earn $25 in service credits when you book your first job.\n\nhttps://${REFERRAL_URL}\n\nHope you enjoy it!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <HomeownerLayout>
      <div style={{ minHeight: "100vh", background: "#0A1628", fontFamily: "'Inter', system-ui, sans-serif", paddingBottom: 48 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px 0" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, background: "rgba(103,232,249,0.10)",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
              border: "1px solid rgba(103,232,249,0.20)",
            }}>
              <Gift size={26} color="#67E8F9" />
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F0F4FF", margin: "0 0 8px" }}>
              Refer Neighbors, Earn Rewards
            </h1>
            <div style={{
              display: "inline-block", padding: "4px 16px", borderRadius: 99,
              background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.25)",
              color: "#22C55E", fontSize: 14, fontWeight: 700,
            }}>Give $25, Get $25</div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
            {STATS.map(({ label, value, icon: Icon, color }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14, padding: "16px 12px", textAlign: "center",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, margin: "0 auto 10px",
                  background: `${color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={17} color={color} />
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#F0F4FF" }}>{value}</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, padding: 20, marginBottom: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Star size={15} color="#F59E0B" />
              <span style={{ color: "#F0F4FF", fontWeight: 700, fontSize: 14 }}>How It Works</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {STEPS.map(({ num, icon: Icon, label, desc }, i) => (
                <div key={num} style={{ display: "flex", gap: 14, position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                      background: "rgba(103,232,249,0.12)", border: "1px solid rgba(103,232,249,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={16} color="#67E8F9" />
                    </div>
                    {i < STEPS.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: "rgba(103,232,249,0.12)", margin: "4px 0" }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < STEPS.length - 1 ? 16 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#67E8F9", textTransform: "uppercase", letterSpacing: "0.07em" }}>Step {num}</span>
                    </div>
                    <div style={{ fontWeight: 700, color: "#E5E7EB", fontSize: 13 }}>{label}</div>
                    <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2, lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral link */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, padding: 20, marginBottom: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <QrCode size={15} color="#67E8F9" />
              <span style={{ color: "#F0F4FF", fontWeight: 700, fontSize: 14 }}>Your Referral Link</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <Input
                readOnly
                value={REFERRAL_URL}
                style={{
                  flex: 1, fontSize: 12, fontFamily: "monospace",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)",
                  color: "#9CA3AF",
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                style={{
                  flexShrink: 0, gap: 6, fontSize: 12, fontWeight: 600,
                  background: copied ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.06)",
                  border: copied ? "1px solid rgba(34,197,94,0.30)" : "1px solid rgba(255,255,255,0.10)",
                  color: copied ? "#22C55E" : "#E5E7EB",
                }}
              >
                {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>

            {/* QR placeholder */}
            <div style={{
              width: 96, height: 96, borderRadius: 10, margin: "0 auto",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <QrCode size={28} color="#4B5563" />
              <span style={{ fontSize: 9, color: "#4B5563", fontWeight: 600, textTransform: "uppercase" }}>QR Code</span>
            </div>
          </div>

          {/* Share tools */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, padding: 20, marginBottom: 20,
          }}>
            <div style={{ fontWeight: 700, color: "#F0F4FF", fontSize: 14, marginBottom: 14 }}>Share With Neighbors</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={handleShareText}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  borderRadius: 10, cursor: "pointer", textAlign: "left",
                  background: "rgba(103,232,249,0.06)", border: "1px solid rgba(103,232,249,0.16)",
                  transition: "background 0.12s",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(103,232,249,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MessageSquare size={16} color="#67E8F9" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#E5E7EB", fontSize: 13 }}>Share via Text</div>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>Pre-composed message ready to send</div>
                </div>
                <ArrowRight size={14} color="#4B5563" style={{ marginLeft: "auto" }} />
              </button>

              <button
                onClick={handleShareEmail}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  borderRadius: 10, cursor: "pointer", textAlign: "left",
                  background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.16)",
                  transition: "background 0.12s",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(34,197,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Mail size={16} color="#22C55E" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#E5E7EB", fontSize: 13 }}>Share via Email</div>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>Opens your mail app with a friendly note</div>
                </div>
                <ArrowRight size={14} color="#4B5563" style={{ marginLeft: "auto" }} />
              </button>

              <button
                onClick={handleCopy}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  borderRadius: 10, cursor: "pointer", textAlign: "left",
                  background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.16)",
                  transition: "background 0.12s",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,158,11,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Copy size={16} color="#F59E0B" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#E5E7EB", fontSize: 13 }}>Copy Link</div>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>Paste anywhere — Nextdoor, iMessage, etc.</div>
                </div>
                <ArrowRight size={14} color="#4B5563" style={{ marginLeft: "auto" }} />
              </button>
            </div>
          </div>

          {/* Referral history */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, padding: 20, marginBottom: 20,
          }}>
            <div style={{ fontWeight: 700, color: "#F0F4FF", fontSize: 14, marginBottom: 14 }}>Referral History</div>
            <div>
              {MOCK_REFERRALS.map((r, i) => {
                const s = STATUS_STYLE[r.status];
                const StatusIcon = STATUS_ICON[r.status];
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "11px 0",
                      borderBottom: i < MOCK_REFERRALS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "rgba(255,255,255,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, color: "#9CA3AF", fontSize: 13, flexShrink: 0,
                    }}>{r.name[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: "#E5E7EB", fontSize: 13 }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>{r.city} · {r.date}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700,
                        background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                      }}>
                        <StatusIcon size={9} />
                        {r.status}
                      </span>
                      {r.credit != null && (
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#22C55E" }}>+${r.credit}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bonus milestone */}
          <div style={{
            background: "linear-gradient(135deg, rgba(103,232,249,0.07), rgba(34,197,94,0.07))",
            border: "1px solid rgba(103,232,249,0.18)",
            borderRadius: 16, padding: 20, marginBottom: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(103,232,249,0.12)", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Zap size={17} color="#67E8F9" />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#F0F4FF", fontSize: 14 }}>Bonus Milestone</div>
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>Refer 5 neighbors = free TrustyPro Premium for 3 months</div>
              </div>
            </div>
            <div style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: "#6B7280" }}>Progress</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#67E8F9" }}>3 / 5</span>
              </div>
              <div style={{ height: 7, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "60%", background: "linear-gradient(90deg, #67E8F9, #22C55E)", borderRadius: 99 }} />
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#6B7280" }}>2 more referrals to unlock free Premium!</div>
          </div>

          {/* Invite from Contacts */}
          <button
            onClick={() => toast.info("Contacts integration coming soon!")}
            style={{
              width: "100%", padding: "14px 20px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 14, cursor: "pointer",
              fontWeight: 700, color: "#9CA3AF", fontSize: 14,
              transition: "background 0.12s",
            }}
          >
            <BookUser size={18} color="#6B7280" />
            Invite from Contacts
          </button>

          <p style={{ textAlign: "center", fontSize: 11, color: "#374151", marginTop: 20 }}>
            Credits are applied automatically to your next service booking. No expiration.
          </p>
        </div>
      </div>
    </HomeownerLayout>
  );
}
