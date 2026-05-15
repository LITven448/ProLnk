import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare, Users, Send, Clock, BarChart2,
  CheckCircle, AlertTriangle, ChevronDown, RefreshCw,
  UserX, Shield, Zap, Phone,
} from "lucide-react";

type RecipientGroup = "all_partners" | "by_tier" | "by_trade" | "custom" | "homeowners";
type ScheduleType = "now" | "scheduled" | "recurring";

interface Campaign {
  id: string;
  date: string;
  recipients: number;
  preview: string;
  delivery: string;
  clicks: string;
  replies: number;
}

const RECIPIENT_GROUPS: { value: RecipientGroup; label: string; count: number }[] = [
  { value: "all_partners", label: "All Partners", count: 1247 },
  { value: "by_tier", label: "By Tier", count: 0 },
  { value: "by_trade", label: "By Trade", count: 0 },
  { value: "custom", label: "Custom List", count: 0 },
  { value: "homeowners", label: "Homeowners", count: 3841 },
];

const VARIABLES = [
  { tag: "{first_name}", label: "First name" },
  { tag: "{jobs_this_week}", label: "Jobs this week" },
  { tag: "{commission_this_month}", label: "Commission this month" },
  { tag: "{lead_count}", label: "Lead count" },
];

const SAMPLE_RECIPIENT = {
  first_name: "Marcus",
  jobs_this_week: "4",
  commission_this_month: "$847",
  lead_count: "12",
};

const CAMPAIGNS: Campaign[] = [
  { id: "1", date: "May 14, 2026", recipients: 1247, preview: "Hey {first_name}, new leads in your area this week!", delivery: "98.8%", clicks: "41%", replies: 23 },
  { id: "2", date: "May 10, 2026", recipients: 412, preview: "Your commission for April is ready. {commission_this_month} earned!", delivery: "99.1%", clicks: "38%", replies: 11 },
  { id: "3", date: "May 6, 2026", recipients: 3841, preview: "ProLnk launches today — claim your founding partner spot.", delivery: "97.9%", clicks: "52%", replies: 87 },
  { id: "4", date: "Apr 28, 2026", recipients: 298, preview: "Storm alert in DFW — {lead_count} homeowners need roofing quotes now.", delivery: "99.3%", clicks: "61%", replies: 34 },
  { id: "5", date: "Apr 21, 2026", recipients: 890, preview: "Spring is here! Update your service area to capture seasonal leads.", delivery: "98.4%", clicks: "29%", replies: 8 },
  { id: "6", date: "Apr 14, 2026", recipients: 1247, preview: "Tier upgrade: 3 partners hit Founding status this week.", delivery: "97.6%", clicks: "22%", replies: 5 },
  { id: "7", date: "Apr 7, 2026", recipients: 156, preview: "Hi {first_name}, you have {jobs_this_week} jobs scheduled this week.", delivery: "99.0%", clicks: "33%", replies: 4 },
  { id: "8", date: "Mar 31, 2026", recipients: 2100, preview: "Q1 recap: ProLnk partners earned $284K in commissions.", delivery: "98.2%", clicks: "44%", replies: 19 },
];

function resolveVariables(msg: string): string {
  let out = msg;
  for (const [k, v] of Object.entries(SAMPLE_RECIPIENT)) {
    out = out.replaceAll(`{${k}}`, v);
  }
  return out;
}

export default function SMSCampaignBuilder() {
  const [recipientGroup, setRecipientGroup] = useState<RecipientGroup>("all_partners");
  const [message, setMessage] = useState("");
  const [scheduleType, setScheduleType] = useState<ScheduleType>("now");
  const [showRecipientDropdown, setShowRecipientDropdown] = useState(false);
  const [confirmSend, setConfirmSend] = useState(false);

  const selectedGroup = RECIPIENT_GROUPS.find(g => g.value === recipientGroup)!;
  const charCount = message.length;
  const charLeft = 160 - charCount;
  const recipientCount = selectedGroup.count || 1247;

  function insertVariable(tag: string) {
    setMessage(prev => prev + tag);
  }

  return (
    <AdminLayout>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #6D28D9, #7C3AED)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MessageSquare size={22} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#F8FAFC", margin: 0 }}>
                SMS Campaign Builder
              </h1>
              <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Direct to their pocket</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "SMS Sent Today", value: "847", icon: Send, color: "#6366F1" },
            { label: "Delivery Rate", value: "98.2%", icon: CheckCircle, color: "#10B981" },
            { label: "Click Rate", value: "34%", icon: BarChart2, color: "#F59E0B" },
            { label: "Opt-outs", value: "3", icon: UserX, color: "#EF4444" },
          ].map(stat => {
            const StatIcon = stat.icon;
            return (
              <Card key={stat.label} style={{ background: "#1E293B", border: "1px solid #334155" }}>
                <CardContent style={{ padding: "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 11, color: "#64748B", marginBottom: 4 }}>{stat.label}</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: "#F1F5F9" }}>{stat.value}</div>
                    </div>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: `${stat.color}20`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <StatIcon size={16} color={stat.color} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20, alignItems: "start" }}>

          {/* Composer */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card style={{ background: "#1E293B", border: "1px solid #334155" }}>
              <CardContent style={{ padding: "20px 24px" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9", marginBottom: 16 }}>
                  Compose Campaign
                </div>

                {/* Recipient Selector */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: "#64748B", display: "block", marginBottom: 6 }}>
                    Recipients
                  </label>
                  <div style={{ position: "relative" }}>
                    <div
                      onClick={() => setShowRecipientDropdown(p => !p)}
                      style={{
                        background: "#0F172A", border: "1px solid #334155", borderRadius: 10,
                        padding: "10px 14px", cursor: "pointer",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                      }}
                    >
                      <div>
                        <span style={{ fontSize: 14, color: "#E2E8F0", fontWeight: 600 }}>
                          {selectedGroup.label}
                        </span>
                        <span style={{ fontSize: 12, color: "#64748B", marginLeft: 8 }}>
                          ~{recipientCount.toLocaleString()} recipients
                        </span>
                      </div>
                      <ChevronDown size={16} color="#64748B" />
                    </div>
                    {showRecipientDropdown && (
                      <div style={{
                        position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 50,
                        background: "#1E293B", border: "1px solid #334155", borderRadius: 10,
                        overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                      }}>
                        {RECIPIENT_GROUPS.map(g => (
                          <div
                            key={g.value}
                            onClick={() => { setRecipientGroup(g.value); setShowRecipientDropdown(false); }}
                            style={{
                              padding: "11px 14px", cursor: "pointer",
                              display: "flex", justifyContent: "space-between",
                              background: recipientGroup === g.value ? "rgba(99,102,241,0.15)" : "transparent",
                              borderBottom: "1px solid #293548",
                            }}
                          >
                            <span style={{ fontSize: 14, color: "#E2E8F0" }}>{g.label}</span>
                            {g.count > 0 && (
                              <span style={{ fontSize: 12, color: "#64748B" }}>
                                {g.count.toLocaleString()}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Textarea */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <label style={{ fontSize: 12, color: "#64748B" }}>Message</label>
                    <span style={{
                      fontSize: 12, fontWeight: 700,
                      color: charLeft < 20 ? "#EF4444" : charLeft < 40 ? "#F59E0B" : "#64748B",
                    }}>
                      {charLeft} chars left
                    </span>
                  </div>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value.slice(0, 160))}
                    placeholder="Type your message... (max 160 chars)"
                    rows={4}
                    style={{
                      width: "100%", background: "#0F172A", border: "1px solid #334155",
                      borderRadius: 10, padding: "12px 14px", color: "#E2E8F0",
                      fontSize: 14, resize: "vertical", outline: "none",
                      fontFamily: "inherit", lineHeight: 1.6, boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Variable Chips */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: "#64748B", marginBottom: 8 }}>Insert variable</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {VARIABLES.map(v => (
                      <button
                        key={v.tag}
                        onClick={() => insertVariable(v.tag)}
                        style={{
                          background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
                          borderRadius: 8, padding: "4px 10px", cursor: "pointer",
                          fontSize: 12, color: "#A5B4FC", fontFamily: "monospace",
                        }}
                      >
                        {v.tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Schedule */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, color: "#64748B", marginBottom: 8 }}>Schedule</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { value: "now" as ScheduleType, label: "Send now" },
                      { value: "scheduled" as ScheduleType, label: "Schedule" },
                      { value: "recurring" as ScheduleType, label: "Recurring" },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setScheduleType(opt.value)}
                        style={{
                          flex: 1, padding: "8px 0", borderRadius: 8, cursor: "pointer",
                          fontSize: 13, fontWeight: 600,
                          background: scheduleType === opt.value ? "rgba(99,102,241,0.2)" : "transparent",
                          border: scheduleType === opt.value ? "1px solid #6366F1" : "1px solid #334155",
                          color: scheduleType === opt.value ? "#A5B4FC" : "#64748B",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {scheduleType === "scheduled" && (
                    <input
                      type="datetime-local"
                      style={{
                        marginTop: 10, width: "100%", background: "#0F172A",
                        border: "1px solid #334155", borderRadius: 8,
                        padding: "8px 12px", color: "#E2E8F0", fontSize: 13,
                        fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                      }}
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: 10 }}>
                  <Button
                    variant="outline"
                    style={{
                      flex: 1, border: "1px solid #334155", background: "transparent",
                      color: "#94A3B8", borderRadius: 10,
                    }}
                  >
                    <Phone size={14} style={{ marginRight: 6 }} />
                    Send Test
                  </Button>
                  <Button
                    onClick={() => setConfirmSend(true)}
                    disabled={!message.trim()}
                    style={{
                      flex: 2,
                      background: message.trim() ? "linear-gradient(135deg, #6D28D9, #7C3AED)" : "#1E293B",
                      color: message.trim() ? "#fff" : "#475569",
                      border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14,
                    }}
                  >
                    <Send size={14} style={{ marginRight: 6 }} />
                    Send Campaign
                  </Button>
                </div>

                {confirmSend && message.trim() && (
                  <div style={{
                    marginTop: 12, padding: "12px 16px",
                    background: "rgba(234, 179, 8, 0.1)", border: "1px solid rgba(234, 179, 8, 0.3)",
                    borderRadius: 10,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#FCD34D", marginBottom: 6 }}>
                      Confirm: Send to {recipientCount.toLocaleString()} recipients?
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => setConfirmSend(false)}
                        style={{
                          flex: 1, padding: "7px 0", borderRadius: 8, cursor: "pointer",
                          background: "#16A34A", border: "none", color: "#fff",
                          fontSize: 13, fontWeight: 700,
                        }}
                      >
                        Confirm Send
                      </button>
                      <button
                        onClick={() => setConfirmSend(false)}
                        style={{
                          flex: 1, padding: "7px 0", borderRadius: 8, cursor: "pointer",
                          background: "transparent", border: "1px solid #475569", color: "#94A3B8",
                          fontSize: 13,
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Compliance Notice */}
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              padding: "12px 16px",
              background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)",
              borderRadius: 10,
            }}>
              <Shield size={15} color="#34D399" style={{ marginTop: 1 }} />
              <p style={{ fontSize: 12, color: "#6EE7B7", margin: 0, lineHeight: 1.6 }}>
                All SMS campaigns sent via Twilio with <strong>TCPA-compliant opt-out instructions</strong> appended
                automatically. Reply STOP to unsubscribe is included with every message.
              </p>
            </div>
          </div>

          {/* Sidebar: Preview + Opt-outs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Preview */}
            <Card style={{ background: "#1E293B", border: "1px solid #334155" }}>
              <CardContent style={{ padding: "18px 20px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8", marginBottom: 14 }}>
                  Preview — {SAMPLE_RECIPIENT.first_name} (sample)
                </div>
                <div style={{
                  background: "#0F172A", borderRadius: 12, padding: "14px 16px",
                  border: "1px solid #293548", minHeight: 80,
                }}>
                  <div style={{
                    display: "inline-block", background: "#6366F1",
                    borderRadius: "14px 14px 14px 4px", padding: "10px 14px",
                    maxWidth: "85%",
                  }}>
                    <p style={{ fontSize: 13, color: "#fff", margin: 0, lineHeight: 1.6 }}>
                      {message ? resolveVariables(message) : (
                        <span style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>
                          Your message will appear here...
                        </span>
                      )}
                    </p>
                  </div>
                  {message && (
                    <div style={{ fontSize: 11, color: "#475569", marginTop: 6, paddingLeft: 4 }}>
                      Reply STOP to unsubscribe
                    </div>
                  )}
                </div>
                {message && (
                  <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "#64748B" }}>
                      {message.length + " Reply STOP to unsubscribe".length + 1} total chars
                    </span>
                    <span style={{ fontSize: 11, color: "#64748B" }}>1 SMS segment</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Opt-out Management */}
            <Card style={{ background: "#1E293B", border: "1px solid #334155" }}>
              <CardContent style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <UserX size={15} color="#F87171" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#F1F5F9" }}>Opt-out Management</span>
                </div>
                <p style={{ fontSize: 13, color: "#94A3B8", margin: "0 0 10px", lineHeight: 1.5 }}>
                  3 partners have opted out of SMS.
                </p>
                <button style={{
                  background: "transparent", border: "1px solid #334155",
                  borderRadius: 8, padding: "7px 12px", cursor: "pointer",
                  fontSize: 12, color: "#60A5FA", width: "100%",
                }}>
                  View opt-out list →
                </button>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Recent Campaigns */}
        <div style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", marginBottom: 14 }}>
            Recent campaigns
          </h2>
          <Card style={{ background: "#1E293B", border: "1px solid #334155", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #293548" }}>
                    {["Date", "Recipients", "Message preview", "Delivery", "Clicks", "Replies"].map(col => (
                      <th key={col} style={{
                        padding: "11px 16px", textAlign: "left",
                        fontSize: 11, fontWeight: 700, color: "#64748B",
                        textTransform: "uppercase", letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                      }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CAMPAIGNS.map((c, i) => (
                    <tr key={c.id} style={{
                      borderBottom: i < CAMPAIGNS.length - 1 ? "1px solid #1E293B" : "none",
                    }}>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#94A3B8", whiteSpace: "nowrap" }}>
                        {c.date}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#E2E8F0" }}>
                        {c.recipients.toLocaleString()}
                      </td>
                      <td style={{
                        padding: "12px 16px", fontSize: 13, color: "#CBD5E1",
                        maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {c.preview}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          fontSize: 12, fontWeight: 700, color: "#34D399",
                          background: "rgba(52,211,153,0.1)", padding: "3px 8px", borderRadius: 20,
                        }}>
                          {c.delivery}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          fontSize: 12, fontWeight: 700, color: "#60A5FA",
                          background: "rgba(96,165,250,0.1)", padding: "3px 8px", borderRadius: 20,
                        }}>
                          {c.clicks}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#94A3B8" }}>
                        {c.replies}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </div>
    </AdminLayout>
  );
}
