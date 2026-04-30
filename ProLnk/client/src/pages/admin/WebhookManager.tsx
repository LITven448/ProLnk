import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Webhook, Plus, Trash2, ToggleLeft, ToggleRight, RefreshCw,
  Copy, ExternalLink, Info, ChevronDown, ChevronUp
} from "lucide-react";

const N8N_EVENTS = [
  { value: "partner.approved",         label: "Partner Approved",         desc: "Fires when admin approves a partner application" },
  { value: "partner.rejected",         label: "Partner Rejected",         desc: "Fires when admin rejects a partner application" },
  { value: "partner.application_submitted", label: "Application Submitted", desc: "Fires when a new partner submits an application" },
  { value: "lead.dispatched",          label: "Lead Dispatched",          desc: "Fires when a lead is sent to a partner" },
  { value: "lead.accepted",            label: "Lead Accepted",            desc: "Fires when a partner accepts a dispatched lead" },
  { value: "lead.rejected",            label: "Lead Rejected",            desc: "Fires when a partner rejects a dispatched lead" },
  { value: "lead.expired",             label: "Lead Expired",             desc: "Fires when a lead expires without response" },
  { value: "commission.earned",        label: "Commission Earned",        desc: "Fires when a commission is created" },
  { value: "commission.paid",          label: "Commission Paid",          desc: "Fires when a commission is marked as paid" },
  { value: "commission.auto_closed",   label: "Commission Auto-Closed",   desc: "Fires when FSM webhook auto-closes a commission" },
  { value: "job.logged",               label: "Job Logged",               desc: "Fires when a partner logs a new job" },
  { value: "job.photos_analyzed",      label: "Photos Analyzed",          desc: "Fires when AI analyzes job photos" },
  { value: "pps.recalculated",         label: "PPS Recalculated",         desc: "Fires when partner priority scores are recalculated" },
  { value: "homeowner.profile_created",label: "Homeowner Profile Created",desc: "Fires when a homeowner creates a TrustyPro profile" },
  { value: "homeowner.photo_uploaded", label: "Homeowner Photo Uploaded", desc: "Fires when a homeowner uploads a property photo" },
];

export default function WebhookManager() {
  const utils = trpc.useUtils();
  const [showAdd, setShowAdd] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [newEvent, setNewEvent] = useState(N8N_EVENTS[0].value);
  const [newUrl, setNewUrl] = useState("");
  const [newSecret, setNewSecret] = useState("");

  const { data: subs, isLoading } = trpc.admin.getWebhookSubscriptions.useQuery();

  const create = trpc.admin.createWebhookSubscription.useMutation({
    onSuccess: () => {
      utils.admin.getWebhookSubscriptions.invalidate();
      setShowAdd(false);
      setNewUrl("");
      setNewSecret("");
      toast.success("Webhook subscription created");
    },
    onError: (e) => toast.error(e.message),
  });

  const update = trpc.admin.updateWebhookSubscription.useMutation({
    onSuccess: () => { utils.admin.getWebhookSubscriptions.invalidate(); toast.success("Updated"); },
    onError: (e) => toast.error(e.message),
  });

  const del = trpc.admin.deleteWebhookSubscription.useMutation({
    onSuccess: () => { utils.admin.getWebhookSubscriptions.invalidate(); toast.success("Deleted"); },
    onError: (e) => toast.error(e.message),
  });

  const handleCreate = () => {
    if (!newUrl) { toast.error("URL is required"); return; }
    create.mutate({ event: newEvent, url: newUrl, secret: newSecret || undefined, isActive: true });
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Webhook className="w-6 h-6 text-purple-600" /> n8n Webhook Manager
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Configure outbound webhooks to trigger n8n workflows on platform events
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowGuide(!showGuide)} className="gap-1.5">
              <Info className="w-3.5 h-3.5" /> Setup Guide
            </Button>
            <Button size="sm" onClick={() => setShowAdd(!showAdd)} className="gap-1.5 bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="w-3.5 h-3.5" /> Add Webhook
            </Button>
          </div>
        </div>

        {/* Setup Guide */}
        {showGuide && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-purple-800">How to Connect n8n</h3>
            <ol className="text-xs text-purple-700 space-y-1.5 list-decimal list-inside">
              <li>In n8n, create a new workflow and add a <strong>Webhook</strong> trigger node</li>
              <li>Set the HTTP method to <strong>POST</strong> and copy the webhook URL from n8n</li>
              <li>Paste the URL in the form below and select the event you want to trigger it</li>
              <li>Optionally set a secret -- ProLnk will include it as <code className="bg-purple-100 px-1 rounded">X-ProLnk-Secret</code> in the header</li>
              <li>All payloads are signed with HMAC-SHA256 in the <code className="bg-purple-100 px-1 rounded">X-ProLnk-Signature</code> header</li>
            </ol>
            <div className="bg-white border border-purple-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-purple-800 mb-1">Payload Structure</p>
              <pre className="text-xs text-gray-700 overflow-x-auto">{`{
  "event": "partner.approved",
  "timestamp": "2026-03-24T00:00:00.000Z",
  "data": { /* event-specific fields */ }
}`}</pre>
            </div>
          </div>
        )}

        {/* Add Form */}
        {showAdd && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">New Webhook Subscription</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Event</label>
                <select
                  value={newEvent}
                  onChange={(e) => setNewEvent(e.target.value)}
                  className="w-full h-8 text-xs border border-gray-200 rounded-md px-2 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  {N8N_EVENTS.map((ev) => (
                    <option key={ev.value} value={ev.value}>{ev.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-0.5">
                  {N8N_EVENTS.find((e) => e.value === newEvent)?.desc}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Webhook URL</label>
                <Input
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://your-n8n.com/webhook/..."
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Secret (optional)</label>
                <Input
                  value={newSecret}
                  onChange={(e) => setNewSecret(e.target.value)}
                  placeholder="Optional shared secret"
                  className="h-8 text-xs"
                  type="password"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button size="sm" onClick={handleCreate} disabled={create.isPending} className="bg-purple-600 hover:bg-purple-700 text-white">
                {create.isPending ? "Creating..." : "Create Subscription"}
              </Button>
            </div>
          </div>
        )}

        {/* Subscriptions List */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">Loading...</div>
          ) : !subs?.length ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Webhook className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm text-gray-500 font-medium">No webhook subscriptions yet</p>
              <p className="text-xs text-gray-400 mt-1">Add a subscription to start triggering n8n workflows</p>
              <Button size="sm" onClick={() => setShowAdd(true)} className="mt-3 gap-1.5 bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="w-3.5 h-3.5" /> Add First Webhook
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {subs.map((sub: any) => {
                const eventMeta = N8N_EVENTS.find((e) => e.value === sub.event);
                return (
                  <div key={sub.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/50">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-gray-800">{eventMeta?.label ?? sub.event}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${sub.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {sub.isActive ? "Active" : "Paused"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{sub.url}</p>
                      {eventMeta?.desc && (
                        <p className="text-xs text-gray-400 mt-0.5">{eventMeta.desc}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { navigator.clipboard.writeText(sub.url); toast.success("URL copied"); }}
                        className="h-7 w-7 p-0"
                        title="Copy URL"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => update.mutate({ id: sub.id, isActive: !sub.isActive })}
                        className="h-7 w-7 p-0"
                        title={sub.isActive ? "Pause" : "Activate"}
                      >
                        {sub.isActive
                          ? <ToggleRight className="w-4 h-4 text-green-600" />
                          : <ToggleLeft className="w-4 h-4 text-gray-400" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { if (confirm("Delete this webhook?")) del.mutate({ id: sub.id }); }}
                        className="h-7 w-7 p-0 text-red-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Available Events Reference */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Available Events ({N8N_EVENTS.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {N8N_EVENTS.map((ev) => (
              <div key={ev.value} className="flex items-start gap-2">
                <code className="text-xs bg-white border border-gray-200 text-purple-700 px-1.5 py-0.5 rounded font-mono shrink-0">{ev.value}</code>
                <span className="text-xs text-gray-500">{ev.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
