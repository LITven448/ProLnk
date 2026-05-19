import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, AlertTriangle, Clock, Zap, Settings, Link,
  RefreshCw, Webhook
} from "lucide-react";

const connectedIntegrations = [
  {
    key: "stripe",
    name: "Stripe",
    category: "Payments",
    lastSync: "2 min ago",
    description: "Payment processing and commission payouts",
  },
  {
    key: "twilio",
    name: "Twilio",
    category: "SMS",
    lastSync: "5 min ago",
    description: "SMS notifications and pro alerts",
  },
  {
    key: "resend",
    name: "Resend",
    category: "Email",
    lastSync: "1 min ago",
    description: "Transactional email delivery",
  },
];

const readyIntegrations = [
  {
    name: "ServiceTitan",
    category: "FSM",
    description: "Sync pro job history and CRM data",
    action: "Connect",
    connected: false,
  },
  {
    name: "Jobber",
    category: "FSM",
    description: "Two-way job and scheduling sync",
    action: "Connect",
    connected: false,
  },
  {
    name: "HouseCall Pro",
    category: "FSM",
    description: "Requires partner approval",
    action: "Request Access",
    connected: false,
  },
  {
    name: "CompanyCam",
    category: "Photos",
    description: "Requires partner approval",
    action: "Request Access",
    connected: false,
  },
  {
    name: "Checkr",
    category: "Background",
    description: "Background checks for pro verification",
    action: "Connect",
    connected: false,
  },
  {
    name: "Smarty",
    category: "Address",
    description: "Address validation for homeowners",
    action: "Configure",
    connected: true,
  },
  {
    name: "ATTOM",
    category: "Property",
    description: "Property data enrichment",
    action: "Configure",
    connected: true,
  },
  {
    name: "Tomorrow.io",
    category: "Weather",
    description: "Storm lead generation",
    action: "Configure",
    connected: true,
  },
  {
    name: "Mapbox",
    category: "Maps",
    description: "Geographic routing and coverage maps",
    action: "Configure",
    connected: true,
  },
];

const comingSoon = [
  "AccuLynx", "JobNimbus", "Leap", "EagleView", "Workiz",
  "FieldEdge", "Successware", "ServiceFusion", "Certn", "Tax1099″,
];

const webhookLog = [
  { service: "Stripe", event: "payment_intent.succeeded", time: "2 min ago", status: "Success" },
  { service: "Twilio", event: "message.delivered", time: "5 min ago", status: "Success" },
  { service: "Resend", event: "email.delivered", time: "6 min ago", status: "Success" },
  { service: "Stripe", event: "customer.subscription.updated", time: "12 min ago", status: "Success" },
  { service: "Twilio", event: "message.failed", time: "18 min ago", status: "Failed" },
  { service: "Resend", event: "email.bounced", time: "24 min ago", status: "Failed" },
  { service: "Stripe", event: "invoice.payment_succeeded", time: "31 min ago", status: "Success" },
  { service: "Twilio", event: "message.delivered", time: "44 min ago", status: "Success" },
  { service: "Resend", event: "email.delivered", time: "52 min ago", status: "Success" },
  { service: "Stripe", event: "charge.succeeded", time: "1 hr ago", status: "Success" },
];

const categoryColor: Record<string, string> = {
  FSM: "bg-blue-500/20 text-blue-400″,
  Photos: "bg-purple-500/20 text-purple-400″,
  Background: "bg-orange-500/20 text-orange-400″,
  Address: "bg-teal-500/20 text-teal-400″,
  Property: "bg-green-500/20 text-green-400″,
  Weather: "bg-sky-500/20 text-sky-400″,
  Maps: "bg-indigo-500/20 text-indigo-400″,
};

export default function IntegrationsDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8″>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2″>
              <Link className="h-6 w-6 text-teal-400″ />
              Integrations Hub
            </h1>
            <p className="text-slate-400 mt-1″>Connect your field service stack to ProLnk</p>
          </div>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700″>
            <RefreshCw className="h-4 w-4 mr-2″ />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4″>
          {[
            { label: "Connected", value: 3, color: "text-green-400″, Icon: CheckCircle },
            { label: "Pending Setup", value: 8, color: "text-yellow-400″, Icon: Clock },
            { label: "Coming Soon", value: 12, color: "text-slate-400″, Icon: AlertTriangle },
            { label: "Total Available", value: 23, color: "text-teal-400″, Icon: Zap },
          ].map(({ label, value, color, Icon }) => (
            <Card key={label} className="bg-slate-800/60 border-slate-700″>
              <CardContent className="pt-5″>
                <div className="flex items-center gap-3″>
                  <Icon className={`h-8 w-8 ${color}`} />
                  <div>
                    <p className={`text-2xl font-bold ${color}`}>{value}</p>
                    <p className="text-xs text-slate-400″>{label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3″>Active Connections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
            {connectedIntegrations.map((i) => (
              <Card key={i.key} className="bg-slate-800/60 border-slate-700″>
                <CardContent className="pt-5″>
                  <div className="flex items-center justify-between mb-3″>
                    <div className="flex items-center gap-3″>
                      <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm">
                        {i.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-medium">{i.name}</p>
                        <Badge className="bg-slate-700 text-slate-300 text-xs">{i.category}</Badge>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-green-400″>
                      <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                      Live
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3″>{i.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500″>Synced {i.lastSync}</span>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 h-7 text-xs">
                      <Settings className="h-3 w-3 mr-1″ />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3″>Ready to Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4″>
            {readyIntegrations.map((i) => (
              <Card key={i.name} className="bg-slate-800/60 border-slate-700″>
                <CardContent className="pt-5″>
                  <div className="flex items-start justify-between mb-2″>
                    <div className="flex items-center gap-2″>
                      <div className="w-8 h-8 rounded-md bg-slate-700 flex items-center justify-center text-slate-300 font-semibold text-xs">
                        {i.name[0]}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium flex items-center gap-1.5″>
                          {i.name}
                          {i.connected && <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />}
                        </p>
                        <Badge className={`text-xs ${categoryColor[i.category] ?? "bg-slate-700 text-slate-300"}`}>
                          {i.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-3″>{i.description}</p>
                  <Button
                    size="sm"
                    className={
                      i.connected
                        ? "w-full h-7 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300″
                        : i.action === "Request Access"
                        ? "w-full h-7 text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30″
                        : "w-full h-7 text-xs bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30″
                    }
                    variant="ghost"
                  >
                    {i.connected ? "Configure" : i.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3″>Coming Soon</h2>
          <div className="flex flex-wrap gap-2″>
            {comingSoon.map((name) => (
              <span
                key={name}
                className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <Card className="bg-slate-800/60 border-slate-700″>
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2″>
              <Webhook className="h-4 w-4 text-teal-400″ />
              Webhook Log
              <span className="text-xs font-normal text-slate-400 ml-1″>Last 10 events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-700″>
                    <th className="pb-2 pr-4″>Service</th>
                    <th className="pb-2 pr-4″>Event</th>
                    <th className="pb-2 pr-4″>Time</th>
                    <th className="pb-2″>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {webhookLog.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50 last:border-0″>
                      <td className="py-2 pr-4 text-slate-300 font-medium">{row.service}</td>
                      <td className="py-2 pr-4 text-slate-400 font-mono text-xs">{row.event}</td>
                      <td className="py-2 pr-4 text-slate-500 text-xs">{row.time}</td>
                      <td className="py-2″>
                        <Badge
                          className={
                            row.status === "Success"
                              ? "bg-green-500/20 text-green-400″
                              : "bg-red-500/20 text-red-400″
                          }
                        >
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
