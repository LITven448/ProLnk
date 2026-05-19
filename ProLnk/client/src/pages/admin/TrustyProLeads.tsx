import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Home, Search, Eye, Phone, Mail, MapPin, Clock, AlertTriangle, CheckCircle, Camera, Loader2, UserCheck, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  new:        { label: "New",        bg: "#DBEAFE", text: "#1D4ED8" },
  analyzing:  { label: "Analyzing",  bg: "#EDE9FE", text: "#7C3AED" },
  matched:    { label: "Matched",    bg: "#D1FAE5", text: "#059669" },
  contacted:  { label: "Contacted",  bg: "#FEF3C7", text: "#D97706" },
  closed:     { label: "Closed",     bg: "#F3F4F6", text: "#6B7280" },
  lost:       { label: "Lost",       bg: "#FEE2E2", text: "#DC2626" },
};

export default function TrustyProLeads() {
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<number | null>(null);
  const [routePartnerId, setRoutePartnerId] = useState("");

  const { data: leads = [], isLoading, refetch } = trpc.trustyPro.getLeads.useQuery();
  const { data: partners = [] } = trpc.directory.getApprovedPartners.useQuery();

  const routeLead = trpc.trustyPro.routeLeadToPartner.useMutation({
    onSuccess: (data) => {
      toast.success(`Lead routed to ${data.partnerName}`);
      setRoutePartnerId("");
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateStatus = trpc.trustyPro.updateLeadStatus.useMutation({
    onSuccess: () => { toast.success("Status updated"); refetch(); },
    onError: (err) => toast.error(err.message),
  });

  const filtered = leads.filter(l =>
    !search ||
    l.name?.toLowerCase().includes(search.toLowerCase()) ||
    l.email?.toLowerCase().includes(search.toLowerCase()) ||
    l.address?.toLowerCase().includes(search.toLowerCase()) ||
    l.source?.toLowerCase().includes(search.toLowerCase())
  );

  const selected = selectedLead != null ? leads.find(l => l.id === selectedLead) : null;

  const newCount = leads.filter(l => l.status === "new").length;
  const matchedCount = leads.filter(l => l.status === "matched").length;
  const scanCount = leads.filter(l => l.source === "trustypro_scan").length;

  return (
    <AdminLayout title="TrustyPro Leads">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Leads", value: leads.length, icon: Home, color: "#1B4FD8" },
            { label: "New Leads", value: newCount, icon: Clock, color: "#D97706" },
            { label: "Matched", value: matchedCount, icon: CheckCircle, color: "#059669" },
            { label: "AI Scans", value: scanCount, icon: Camera, color: "#7C3AED" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.color + "18" }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-1.5">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
        </div>

        <div className="flex gap-4">
          {/* Lead list */}
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <Home className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm">No TrustyPro leads yet</p>
                <p className="text-xs mt-1">Leads appear when homeowners submit requests or AI scans</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map((lead) => {
                  const statusCfg = STATUS_CONFIG[lead.status] ?? STATUS_CONFIG.new;
                  const isSelected = selectedLead === lead.id;
                  return (
                    <button
                      key={lead.id}
                      onClick={() => setSelectedLead(isSelected ? null : lead.id)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${isSelected ? "bg-blue-50" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900 text-sm">{lead.name ?? "Anonymous"}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: statusCfg.bg, color: statusCfg.text }}>{statusCfg.label}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">{lead.source ?? "General Inquiry"}</p>
                          {lead.address && <p className="text-xs text-gray-400 truncate">{lead.address}</p>}
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-xs text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</p>
                          {lead.source === "trustypro_scan" && (
                            <span className="text-xs text-purple-600 flex items-center gap-1 justify-end mt-0.5">
                              <Camera className="w-3 h-3" /> AI Scan
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Lead detail panel */}
          {selected && (
            <div className="w-80 bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4 flex-shrink-0">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900">{selected.name ?? "Anonymous"}</h3>
                <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">&times;</button>
              </div>

              <div className="space-y-2">
                {selected.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${selected.email}`} className="hover:text-blue-600 truncate">{selected.email}</a>
                  </div>
                )}
                {selected.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${selected.phone}`} className="hover:text-blue-600">{selected.phone}</a>
                  </div>
                )}
                {selected.address && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <span>{selected.address}{selected.city ? `, ${selected.city}` : ""}</span>
                  </div>
                )}
              </div>

              {/* AI Analysis */}
              {selected.aiAnalysis && (() => {
                try {
                  const parsed = typeof selected.aiAnalysis === "string" ? JSON.parse(selected.aiAnalysis) : selected.aiAnalysis;
                  const issues = parsed?.issues ?? [];
                  if (!issues.length) return null;
                  return (
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-purple-700 mb-1 flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5" /> AI Scan -- {issues.length} issue{issues.length !== 1 ? "s" : ""} detected
                      </p>
                      {issues.slice(0, 3).map((issue: { name: string; severity: string }, i: number) => (
                        <div key={i} className="flex items-center gap-1.5 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                          <span className="text-xs text-purple-600">{issue.name} ({issue.severity})</span>
                        </div>
                      ))}
                    </div>
                  );
                } catch { return null; }
              })()}

              {/* Notes */}
              {selected.notes && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Notes</p>
                  <p className="text-sm text-gray-600">{selected.notes}</p>
                </div>
              )}

              {/* Route to partner */}
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Route to Partner</p>
                <select
                  value={routePartnerId}
                  onChange={(e) => setRoutePartnerId(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select a partner...</option>
                  {(partners as Array<{ id: number; businessName: string; businessType: string }>).map((p) => (
                    <option key={p.id} value={p.id}>{p.businessName} -- {p.businessType}</option>
                  ))}
                </select>
                <Button
                  size="sm"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white gap-1.5"
                  disabled={!routePartnerId || routeLead.isPending}
                  onClick={() => routeLead.mutate({ leadId: selected.id, partnerId: parseInt(routePartnerId) })}
                >
                  {routeLead.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCheck className="w-4 h-4" />}
                  Route Lead
                </Button>
              </div>

              {/* Status update */}
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Update Status</p>
                <div className="flex flex-wrap gap-1.5">
                  {(["new", "contacted", "matched", "closed", "lost"] as const).map((s) => {
                    const cfg = STATUS_CONFIG[s];
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus.mutate({ leadId: selected.id, status: s })}
                        className="text-xs px-2.5 py-1 rounded-full font-medium border transition-opacity hover:opacity-80"
                        style={{ backgroundColor: cfg.bg, color: cfg.text, borderColor: cfg.text + "40" }}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact actions */}
              <div className="flex gap-2 pt-1">
                {selected.email && (
                  <Button size="sm" className="flex-1 text-white" style={{ backgroundColor: "#1B4FD8" }} asChild>
                    <a href={`mailto:${selected.email}?subject=Your TrustyPro Service Request&body=Hi ${selected.name ?? "there"},%0A%0AThank you for submitting a service request through TrustyPro. We've matched you with a verified professional in your area and they'll be reaching out shortly.%0A%0ABest regards,%0AThe ProLnk Team`}>
                      <Mail className="w-3.5 h-3.5 mr-1" /> Email
                    </a>
                  </Button>
                )}
                {selected.phone && (
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <a href={`tel:${selected.phone}`}>
                      <Phone className="w-3.5 h-3.5 mr-1" /> Call
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
