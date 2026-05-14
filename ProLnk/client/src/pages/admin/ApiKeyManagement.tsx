import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Key, Shield, Clock, RotateCcw, Plus, Copy, Trash2, CheckCircle,
  AlertTriangle, XCircle, CreditCard, Brain, Mail, Server
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const API_KEYS = [
  { id: 1, name: "Stripe Live", service: "Stripe", category: "payment", created: "2026-01-12", lastUsed: "2 min ago", permissions: "Write", status: "active" },
  { id: 2, name: "Stripe Webhook", service: "Stripe", category: "payment", created: "2026-01-12", lastUsed: "5 min ago", permissions: "Read", status: "active" },
  { id: 3, name: "Anthropic Claude", service: "Anthropic", category: "ai", created: "2026-02-01", lastUsed: "1 min ago", permissions: "Write", status: "active" },
  { id: 4, name: "OpenAI Embeddings", service: "OpenAI", category: "ai", created: "2026-02-15", lastUsed: "8 hrs ago", permissions: "Read", status: "active" },
  { id: 5, name: "Resend Email", service: "Resend", category: "comms", created: "2026-01-20", lastUsed: "12 min ago", permissions: "Write", status: "active" },
  { id: 6, name: "Twilio SMS", service: "Twilio", category: "comms", created: "2026-02-10", lastUsed: "2 days ago", permissions: "Write", status: "active" },
  { id: 7, name: "AWS S3 Storage", service: "AWS", category: "infra", created: "2026-01-08", lastUsed: "1 hr ago", permissions: "Admin", status: "active" },
  { id: 8, name: "Cloudflare CDN", service: "Cloudflare", category: "infra", created: "2026-01-08", lastUsed: "3 hrs ago", permissions: "Write", status: "active" },
];

const ROTATION_DUE = [
  { name: "Stripe Live", service: "Stripe", dueIn: "3 days", risk: "high" },
  { name: "AWS S3 Storage", service: "AWS", dueIn: "5 days", risk: "high" },
  { name: "Anthropic Claude", service: "Anthropic", dueIn: "12 days", risk: "medium" },
  { name: "Twilio SMS", service: "Twilio", dueIn: "18 days", risk: "low" },
];

const AUDIT_LOG = [
  { event: "Key rotated", key: "OpenAI Embeddings", user: "andrew@lit-ventures.com", time: "2 hrs ago", type: "rotation" },
  { event: "Key created", key: "Qdrant Vector DB", user: "andrew@lit-ventures.com", time: "1 day ago", type: "create" },
  { event: "Key revoked", key: "Mapbox Legacy", user: "system", time: "3 days ago", type: "revoke" },
  { event: "Key used", key: "Stripe Live", user: "api-service", time: "3 days ago", type: "use" },
  { event: "Key expired", key: "N8N Webhook v1", user: "system", time: "7 days ago", type: "expire" },
];

const categoryIcon = (cat: string) => {
  if (cat === "payment") return <CreditCard className="h-4 w-4 text-emerald-400" />;
  if (cat === "ai") return <Brain className="h-4 w-4 text-purple-400" />;
  if (cat === "comms") return <Mail className="h-4 w-4 text-blue-400" />;
  return <Server className="h-4 w-4 text-orange-400" />;
};

const statusBadge = (status: string) => {
  if (status === "active") return <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-xs">Active</Badge>;
  if (status === "expired") return <Badge className="bg-red-500/20 text-red-400 border-0 text-xs">Expired</Badge>;
  return <Badge className="bg-slate-600/40 text-slate-400 border-0 text-xs">Revoked</Badge>;
};

const riskBadge = (risk: string) => {
  if (risk === "high") return <Badge className="bg-red-500/20 text-red-400 border-0 text-xs">High</Badge>;
  if (risk === "medium") return <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs">Medium</Badge>;
  return <Badge className="bg-slate-600/40 text-slate-400 border-0 text-xs">Low</Badge>;
};

const auditIcon = (type: string) => {
  if (type === "create") return <Plus className="h-3.5 w-3.5 text-emerald-400" />;
  if (type === "revoke") return <Trash2 className="h-3.5 w-3.5 text-red-400" />;
  if (type === "rotation") return <RotateCcw className="h-3.5 w-3.5 text-blue-400" />;
  if (type === "expire") return <Clock className="h-3.5 w-3.5 text-amber-400" />;
  return <Key className="h-3.5 w-3.5 text-slate-400" />;
};

export default function ApiKeyManagement() {
  const [copied, setCopied] = useState<number | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [newService, setNewService] = useState("");
  const [newPermission, setNewPermission] = useState("");
  const [newExpiry, setNewExpiry] = useState("");

  const handleCopy = (id: number) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Key className="h-6 w-6 text-teal-400" />
              API Key Management
            </h1>
            <p className="text-slate-400 mt-1">Manage and rotate API keys for all third-party integrations</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-500 text-white gap-2">
            <Plus className="h-4 w-4" /> Add Key
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Total Keys</span>
                <Key className="h-4 w-4 text-teal-400" />
              </div>
              <div className="text-2xl font-bold text-white">14</div>
              <div className="text-xs text-slate-400 mt-0.5">across 6 services</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Expiring Soon</span>
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-amber-400">2</div>
              <div className="text-xs text-slate-400 mt-0.5">within 5 days</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Last Rotation</span>
                <RotateCcw className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">7d</div>
              <div className="text-xs text-slate-400 mt-0.5">ago</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Security Score</span>
                <Shield className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-400">A+</div>
              <div className="text-xs text-slate-400 mt-0.5">excellent</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Key className="h-4 w-4 text-teal-400" /> Active API Keys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 font-medium pb-2 pr-4">Name</th>
                    <th className="text-left text-slate-400 font-medium pb-2 pr-4">Service</th>
                    <th className="text-left text-slate-400 font-medium pb-2 pr-4">Created</th>
                    <th className="text-left text-slate-400 font-medium pb-2 pr-4">Last Used</th>
                    <th className="text-left text-slate-400 font-medium pb-2 pr-4">Permissions</th>
                    <th className="text-left text-slate-400 font-medium pb-2 pr-4">Status</th>
                    <th className="text-left text-slate-400 font-medium pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {API_KEYS.map((k) => (
                    <tr key={k.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          {categoryIcon(k.category)}
                          <span className="text-white font-medium">{k.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-slate-300">{k.service}</td>
                      <td className="py-3 pr-4 text-slate-400">{k.created}</td>
                      <td className="py-3 pr-4 text-slate-400">{k.lastUsed}</td>
                      <td className="py-3 pr-4">
                        <Badge className={
                          k.permissions === "Admin" ? "bg-red-500/20 text-red-400 border-0 text-xs" :
                          k.permissions === "Write" ? "bg-amber-500/20 text-amber-400 border-0 text-xs" :
                          "bg-slate-600/40 text-slate-400 border-0 text-xs"
                        }>{k.permissions}</Badge>
                      </td>
                      <td className="py-3 pr-4">{statusBadge(k.status)}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(k.id)}
                            className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-teal-400 transition-colors"
                            title="Copy key"
                          >
                            {copied === k.id ? <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                          <button className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors" title="Revoke">
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-amber-400" /> Rotation Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ROTATION_DUE.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-amber-400 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-white font-medium">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.service} · due in {item.dueIn}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {riskBadge(item.risk)}
                      <Button size="sm" className="h-7 text-xs bg-teal-600/80 hover:bg-teal-600 text-white border-0 gap-1">
                        <RotateCcw className="h-3 w-3" /> Rotate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Plus className="h-4 w-4 text-teal-400" /> Add New Key
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input
                  placeholder="Key name (e.g. Stripe Test)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 h-9 text-sm"
                />
                <Select value={newService} onValueChange={setNewService}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="stripe" className="text-white hover:bg-slate-700">Stripe</SelectItem>
                    <SelectItem value="anthropic" className="text-white hover:bg-slate-700">Anthropic</SelectItem>
                    <SelectItem value="openai" className="text-white hover:bg-slate-700">OpenAI</SelectItem>
                    <SelectItem value="resend" className="text-white hover:bg-slate-700">Resend</SelectItem>
                    <SelectItem value="twilio" className="text-white hover:bg-slate-700">Twilio</SelectItem>
                    <SelectItem value="aws" className="text-white hover:bg-slate-700">AWS</SelectItem>
                    <SelectItem value="cloudflare" className="text-white hover:bg-slate-700">Cloudflare</SelectItem>
                    <SelectItem value="qdrant" className="text-white hover:bg-slate-700">Qdrant</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={newPermission} onValueChange={setNewPermission}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm">
                    <SelectValue placeholder="Permission level" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="read" className="text-white hover:bg-slate-700">Read</SelectItem>
                    <SelectItem value="write" className="text-white hover:bg-slate-700">Write</SelectItem>
                    <SelectItem value="admin" className="text-white hover:bg-slate-700">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  placeholder="Expiry date (optional)"
                  value={newExpiry}
                  onChange={(e) => setNewExpiry(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm"
                />
                <Button className="w-full bg-teal-600 hover:bg-teal-500 text-white gap-2 h-9 text-sm">
                  <Plus className="h-4 w-4" /> Generate API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-teal-400" /> Audit Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {AUDIT_LOG.map((entry, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-700/20 rounded-lg">
                  <div className="p-1.5 rounded bg-slate-700/60">
                    {auditIcon(entry.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-white">{entry.event}</span>
                    <span className="text-sm text-teal-400 mx-1.5">·</span>
                    <span className="text-sm text-slate-300">{entry.key}</span>
                  </div>
                  <div className="text-xs text-slate-500 shrink-0">{entry.user}</div>
                  <div className="text-xs text-slate-500 shrink-0">{entry.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
