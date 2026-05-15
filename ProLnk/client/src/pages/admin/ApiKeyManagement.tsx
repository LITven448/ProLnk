import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { D, DCard, SectionHeader, StatusBadge } from "@/components/DashboardShared";
import { Key, RotateCcw, Trash2, Plus, AlertTriangle, Globe, Zap } from "lucide-react";

type KeyStatus = "active" | "expiring" | "revoked";

interface ApiKey {
  service: string;
  masked: string;
  lastUsed: string;
  created: string;
  status: KeyStatus;
  daysLeft?: number;
  color: string;
}

interface Webhook {
  name: string;
  url: string;
  events: string[];
  lastTriggered: string;
  status: "active" | "error";
}

const API_KEYS: ApiKey[] = [
  { service: "Stripe",          masked: "sk_live_••••••••••••3k9f",   lastUsed: "2 min ago",    created: "Jan 12, 2026", status: "active",   color: D.purple  },
  { service: "Twilio",          masked: "AC••••••••••••4e2a",         lastUsed: "14 min ago",   created: "Jan 12, 2026", status: "active",   color: D.blue    },
  { service: "Resend",          masked: "re_••••••••••••7bx1",        lastUsed: "1 hour ago",   created: "Feb 3, 2026",  status: "active",   color: D.cyan    },
  { service: "Anthropic",       masked: "sk-ant-••••••••••••9ZkP",    lastUsed: "3 hours ago",  created: "Feb 14, 2026", status: "expiring", daysLeft: 7,  color: D.amber  },
  { service: "ATTOM Data",      masked: "att_••••••••••••2mB7",       lastUsed: "Yesterday",    created: "Mar 1, 2026",  status: "expiring", daysLeft: 12, color: D.orange },
  { service: "Smarty Streets",  masked: "ss_••••••••••••Xq9c",        lastUsed: "3 days ago",   created: "Mar 1, 2026",  status: "expiring", daysLeft: 18, color: D.teal   },
];

const WEBHOOKS: Webhook[] = [
  {
    name: "Stripe Payment Events",
    url: "https://prolnk.io/api/webhooks/stripe/••••••••",
    events: ["payment_intent.succeeded", "customer.subscription.updated"],
    lastTriggered: "2 min ago",
    status: "active",
  },
  {
    name: "n8n Commission Trigger",
    url: "https://n8n.prolnk.io/webhook/••••••••/commission",
    events: ["match.completed", "commission.approved"],
    lastTriggered: "18 min ago",
    status: "active",
  },
  {
    name: "Twilio SMS Inbound",
    url: "https://prolnk.io/api/webhooks/twilio/••••••••",
    events: ["message.received"],
    lastTriggered: "47 min ago",
    status: "active",
  },
  {
    name: "ATTOM Property Data",
    url: "https://prolnk.io/api/webhooks/attom/••••••••",
    events: ["property.updated", "valuation.refreshed"],
    lastTriggered: "6 hours ago",
    status: "error",
  },
  {
    name: "Resend Delivery Events",
    url: "https://prolnk.io/api/webhooks/resend/••••••••",
    events: ["email.delivered", "email.bounced", "email.opened"],
    lastTriggered: "1 hour ago",
    status: "active",
  },
];

const SCOPE_OPTIONS = ["read:partners", "write:partners", "read:leads", "write:leads", "read:commissions", "write:commissions", "admin:all"];

export default function ApiKeyManagement() {
  const [showRotateConfirm, setShowRotateConfirm] = useState<string | null>(null);
  const [showNewKey, setShowNewKey] = useState(false);
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["read:partners"]);

  const expiringCount = API_KEYS.filter(k => k.status === "expiring").length;

  function toggleScope(s: string) {
    setSelectedScopes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: D.bg, minHeight: "100vh" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2" style={{ color: D.text }}>
              <Key className="w-6 h-6" style={{ color: D.amber }} />
              API Key Management
            </h1>
            <p className="text-sm mt-1" style={{ color: D.muted }}>Manage third-party API keys and inbound webhook endpoints</p>
          </div>
          <button
            onClick={() => setShowNewKey(!showNewKey)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
            style={{ backgroundColor: `${D.cyan}20`, color: D.cyan, border: `1px solid ${D.cyan}40` }}
          >
            <Plus className="w-4 h-4" />
            Generate New Key
          </button>
        </div>

        {expiringCount > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: `${D.amber}12`, border: `1px solid ${D.amber}40` }}>
            <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: D.amber }} />
            <p className="text-sm" style={{ color: D.amber }}>
              <strong>Key Rotation Policy:</strong> Rotate every 90 days — <strong>{expiringCount} keys expiring soon</strong>. Schedule rotation to avoid service disruption.
            </p>
          </div>
        )}

        {showNewKey && (
          <DCard>
            <SectionHeader title="Generate New API Key" subtitle="Select scopes and assign a service name" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>Service Name</label>
                <input
                  className="mt-2 w-full px-3 py-2 rounded-lg text-sm"
                  placeholder="e.g. Mapbox Integration"
                  style={{ backgroundColor: D.surface, color: D.text, border: `1px solid ${D.border}` }}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>Scopes</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SCOPE_OPTIONS.map(s => {
                    const active = selectedScopes.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => toggleScope(s)}
                        className="px-2 py-1 rounded-md text-xs font-semibold"
                        style={{
                          backgroundColor: active ? `${D.cyan}25` : D.surface,
                          color: active ? D.cyan : D.muted,
                          border: `1px solid ${active ? D.cyan + "50" : D.border}`,
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 rounded-lg text-sm font-bold" style={{ backgroundColor: D.cyan, color: D.bg }}>
                Generate Key
              </button>
              <button onClick={() => setShowNewKey(false)} className="px-4 py-2 rounded-lg text-sm font-bold" style={{ backgroundColor: D.surface, color: D.muted, border: `1px solid ${D.border}` }}>
                Cancel
              </button>
            </div>
          </DCard>
        )}

        <DCard>
          <SectionHeader title="API Keys" subtitle="6 configured integrations" />
          <div className="mt-3 overflow-x-auto rounded-xl" style={{ border: `1px solid ${D.border}` }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${D.border}`, backgroundColor: D.surface }}>
                  {["Service", "Key", "Last Used", "Created", "Status", "Actions"].map((h, i) => (
                    <th key={i} className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-left" style={{ color: D.muted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {API_KEYS.map((k, i) => (
                  <tr key={k.service} style={{ borderBottom: i < API_KEYS.length - 1 ? `1px solid ${D.border}` : "none", backgroundColor: i % 2 === 0 ? D.card : D.surface }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: k.color }} />
                        <span className="font-bold text-sm" style={{ color: D.text }}>{k.service}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: D.dim }}>{k.masked}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: D.muted }}>{k.lastUsed}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: D.dim }}>{k.created}</td>
                    <td className="px-4 py-3">
                      {k.status === "expiring" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold" style={{ backgroundColor: `${D.amber}20`, color: D.amber }}>
                          <AlertTriangle className="w-3 h-3" />
                          {k.daysLeft}d left
                        </span>
                      ) : (
                        <StatusBadge status={k.status === "active" ? "success" : "error"} />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {showRotateConfirm === k.service ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setShowRotateConfirm(null)}
                            className="px-2 py-1 rounded text-xs font-bold"
                            style={{ backgroundColor: D.amber, color: D.bg }}
                          >
                            Confirm
                          </button>
                          <button onClick={() => setShowRotateConfirm(null)} className="px-2 py-1 rounded text-xs" style={{ color: D.muted }}>Cancel</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button onClick={() => setShowRotateConfirm(k.service)} className="p-1.5 rounded-lg transition-colors" style={{ color: D.amber, backgroundColor: `${D.amber}10` }} title="Rotate key">
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg transition-colors" style={{ color: D.red, backgroundColor: `${D.red}10` }} title="Revoke key">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DCard>

        <DCard>
          <SectionHeader title="Webhook Endpoints" subtitle="5 configured inbound webhooks" />
          <div className="mt-3 space-y-3">
            {WEBHOOKS.map(wh => (
              <div key={wh.name} className="rounded-xl p-4" style={{ backgroundColor: D.surface, border: `1px solid ${wh.status === "error" ? D.red + "40" : D.border}` }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: wh.status === "error" ? `${D.red}20` : `${D.blue}20` }}>
                      {wh.status === "error" ? <AlertTriangle className="w-4 h-4" style={{ color: D.red }} /> : <Globe className="w-4 h-4" style={{ color: D.blue }} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: D.text }}>{wh.name}</span>
                        <StatusBadge status={wh.status} />
                      </div>
                      <code className="text-xs mt-0.5 block" style={{ color: D.dim }}>{wh.url}</code>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs" style={{ color: D.dim }}>Last triggered</div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: D.muted }}>{wh.lastTriggered}</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {wh.events.map(ev => (
                    <span key={ev} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono" style={{ backgroundColor: `${D.cyan}10`, color: D.cyan, border: `1px solid ${D.cyan}20` }}>
                      <Zap className="w-2.5 h-2.5" />
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DCard>
      </div>
    </AdminLayout>
  );
}
