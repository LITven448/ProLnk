import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  MessageSquare, Mail, Zap, CheckCircle2, AlertCircle, Copy, CheckCheck,
  ExternalLink, Users, Clock, Shield, ArrowRight, Settings2, Bell,
  Phone, Send, Activity, Globe, TrendingUp, Code2
} from "lucide-react";

// ─── Twilio Config ─────────────────────────────────────────────────────────────
const TWILIO_EVENTS = [
  { trigger: "Partner application approved", channel: "SMS", template: "Welcome to ProLnk! Your application has been approved. Log in at prolnk.io to complete setup.", agent: "Onboarding Agent" },
  { trigger: "New inbound lead assigned", channel: "SMS", template: "New lead: [Address] needs [Service]. Respond within 2 hours to claim. View: prolnk.io/leads", agent: "Lead Routing Agent" },
  { trigger: "Commission paid", channel: "SMS", template: "Commission of $[amount] has been sent to your account for job at [address].", agent: "Financial Agent" },
  { trigger: "Homeowner deal offer", channel: "SMS", template: "A pro near you can help with [service] at [address]. View offer: prolnk.io/deal/[token]", agent: "Communication Agent" },
  { trigger: "Job photo AI analysis complete", channel: "SMS", template: "AI found [N] opportunities at [address]. View report: prolnk.io/my-home", agent: "Photo Analysis Agent" },
  { trigger: "Partner tier upgrade", channel: "SMS", template: "Congrats! You've reached [Tier] status. New benefits unlocked. View: prolnk.io/dashboard/tier", agent: "Onboarding Agent" },
];

const TWILIO_SETUP = [
  { step: 1, title: "Create Twilio Account & Get Phone Number", desc: "Sign up at twilio.com. Purchase a local DFW number (+1 214 or +1 817). This is your sender number for all ProLnk SMS.", done: true },
  { step: 2, title: "Add TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN to Secrets", desc: "Go to Settings → Secrets in the ProLnk admin. Add both values from your Twilio Console dashboard.", done: false },
  { step: 3, title: "Add TWILIO_FROM_NUMBER to Secrets", desc: "The purchased phone number in E.164 format: +12145551234", done: false },
  { step: 4, title: "Test SMS via Admin Broadcast", desc: "Use Admin → Broadcast Center to send a test SMS to yourself. Verify delivery and sender ID.", done: false },
];

const TWILIO_CODE = `// server/notifications/sms.ts (add this helper)
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendSMS(to: string, body: string) {
  return client.messages.create({
    from: process.env.TWILIO_FROM_NUMBER,
    to,
    body,
  });
}

// Usage in any tRPC procedure or agent:
// await sendSMS(partner.phone, \`New lead at \${address}\`);`;

// ─── SendGrid Config ───────────────────────────────────────────────────────────
const SENDGRID_TEMPLATES = [
  { name: "Partner Approval", trigger: "Application approved", recipient: "Partner", category: "Onboarding" },
  { name: "Commission Statement", trigger: "Monthly close", recipient: "Partner", category: "Financial" },
  { name: "New Lead Alert", trigger: "Lead assigned", recipient: "Partner", category: "Operations" },
  { name: "Homeowner Deal Offer", trigger: "AI opportunity detected", recipient: "Homeowner", category: "Revenue" },
  { name: "Home Passport Transfer", trigger: "Home sale initiated", recipient: "New Owner", category: "TrustyPro" },
  { name: "Welcome to TrustyPro", trigger: "Homeowner signup", recipient: "Homeowner", category: "Onboarding" },
  { name: "AI Photo Report", trigger: "Analysis complete", recipient: "Homeowner", category: "TrustyPro" },
  { name: "Tier Upgrade Congratulations", trigger: "Tier change", recipient: "Partner", category: "Engagement" },
  { name: "1099 Tax Form", trigger: "Year-end", recipient: "Partner", category: "Financial" },
  { name: "Review Request", trigger: "Job complete + 48h", recipient: "Homeowner", category: "Social Proof" },
];

const SENDGRID_SETUP = [
  { step: 1, title: "Create SendGrid Account & Verify Domain", desc: "Sign up at sendgrid.com. Add prolnk.io as a sender domain. Complete DNS verification (CNAME records). This ensures emails land in inbox, not spam.", done: false },
  { step: 2, title: "Add SENDGRID_API_KEY to Secrets", desc: "Create an API key in SendGrid with 'Mail Send' permissions. Add to Settings → Secrets.", done: false },
  { step: 3, title: "Set SENDGRID_FROM_EMAIL", desc: "Use noreply@prolnk.io or hello@prolnk.io. Add to Secrets.", done: false },
  { step: 4, title: "Create Email Templates in SendGrid", desc: "Build dynamic templates for each trigger above. Use {{partner_name}}, {{address}}, {{amount}} variables.", done: false },
  { step: 5, title: "Add SENDGRID_TEMPLATE_IDs to Secrets", desc: "One secret per template: SENDGRID_TEMPLATE_APPROVAL, SENDGRID_TEMPLATE_COMMISSION, etc.", done: false },
];

// ─── OneSignal Config ──────────────────────────────────────────────────────────
const ONESIGNAL_SEGMENTS = [
  { segment: "Active Partners", size: "All approved partners", triggers: ["New lead", "Commission paid", "Tier upgrade"] },
  { segment: "TrustyPro Homeowners", size: "All homeowner accounts", triggers: ["AI analysis complete", "Deal offer", "Maintenance reminder"] },
  { segment: "Founding Partners", size: "First 50 partners", triggers: ["Exclusive early access", "Beta features", "Priority leads"] },
  { segment: "At-Risk Partners", size: "No activity 30+ days", triggers: ["Re-engagement campaign", "New feature alert"] },
];

// ─── ATTOM Config ──────────────────────────────────────────────────────────────
const ATTOM_ENDPOINTS = [
  { endpoint: "/property/detail", use: "Full property profile on address lookup", agent: "Property Intelligence Agent", priority: "critical" },
  { endpoint: "/avm/detail", use: "Automated valuation model — current market value", agent: "Property Intelligence Agent", priority: "critical" },
  { endpoint: "/sale/detail", use: "Sale history — detect home sales for passport transfer", agent: "Home Transfer Agent", priority: "high" },
  { endpoint: "/permit/detail", use: "Permit history — verify contractor work, identify unpermitted work", agent: "Property Intelligence Agent", priority: "high" },
  { endpoint: "/hazard/detail", use: "Natural hazard risk scores for insurance partnerships", agent: "Insurance Intelligence Agent", priority: "medium" },
  { endpoint: "/school/detail", use: "School district data for homeowner profiles", agent: "Property Intelligence Agent", priority: "low" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied");
  };
  return (
    <button onClick={copy} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors">
      {copied ? <CheckCheck className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function CommsIntegrations() {
  const [activeTab, setActiveTab] = useState<"twilio" | "sendgrid" | "onesignal" | "attom">("twilio");

  const tabs = [
    { id: "twilio", label: "Twilio SMS", icon: MessageSquare, color: "#DC2626" },
    { id: "sendgrid", label: "SendGrid Email", icon: Mail, color: "#0284C7" },
    { id: "onesignal", label: "OneSignal Push", icon: Bell, color: "#D97706" },
    { id: "attom", label: "ATTOM Data", icon: Globe, color: "#0891B2" },
  ];

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Send className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Communications & Data Integrations</h1>
          </div>
          <p className="text-sm text-gray-500">Setup guides for Twilio, SendGrid, OneSignal, and ATTOM — the communication and intelligence backbone of the AGaaS stack</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  activeTab === tab.id
                    ? "text-white border-transparent shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
                style={activeTab === tab.id ? { background: tab.color, borderColor: tab.color } : {}}>
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── TWILIO TAB ── */}
        {activeTab === "twilio" && (
          <div className="space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Open Rate (SMS vs Email)", value: "98% vs 20%", icon: TrendingUp, color: "#DC2626" },
                { label: "Avg Response Time", value: "90 seconds", icon: Clock, color: "#D97706" },
                { label: "Cost per SMS", value: "$0.0079", icon: Activity, color: "#059669" },
                { label: "Delivery Rate", value: "99.9%", icon: CheckCircle2, color: "#0284C7" },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                    <Icon className="w-5 h-5 mb-2" style={{ color: s.color }} />
                    <p className="text-xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Setup steps */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-4">Setup Checklist</h2>
              <div className="space-y-3">
                {TWILIO_SETUP.map(s => (
                  <div key={s.step} className={`flex gap-3 p-3 rounded-xl ${s.done ? "bg-green-50" : "bg-gray-50"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      s.done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                    }`}>{s.done ? "✓" : s.step}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SMS triggers */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Automated SMS Triggers</h2>
                <p className="text-xs text-gray-500 mt-0.5">Every SMS is sent autonomously by an agent — no human action required</p>
              </div>
              <div className="divide-y divide-gray-50">
                {TWILIO_EVENTS.map(e => (
                  <div key={e.trigger} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 bg-red-50 text-red-700 rounded-full font-medium">{e.channel}</span>
                          <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-medium">{e.agent}</span>
                        </div>
                        <p className="font-medium text-gray-900 text-sm">{e.trigger}</p>
                        <p className="text-xs text-gray-500 mt-1 italic">"{e.template}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code snippet */}
            <div className="bg-gray-900 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400 font-mono">server/notifications/sms.ts</span>
                </div>
                <CopyButton text={TWILIO_CODE} />
              </div>
              <pre className="text-sm text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">{TWILIO_CODE}</pre>
            </div>
          </div>
        )}

        {/* ── SENDGRID TAB ── */}
        {activeTab === "sendgrid" && (
          <div className="space-y-5">
            {/* Setup */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-4">Setup Checklist</h2>
              <div className="space-y-3">
                {SENDGRID_SETUP.map(s => (
                  <div key={s.step} className={`flex gap-3 p-3 rounded-xl ${s.done ? "bg-green-50" : "bg-gray-50"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      s.done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                    }`}>{s.done ? "✓" : s.step}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email templates */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Email Template Library</h2>
                <p className="text-xs text-gray-500 mt-0.5">10 automated email flows covering the full partner and homeowner lifecycle</p>
              </div>
              <div className="divide-y divide-gray-50">
                {SENDGRID_TEMPLATES.map(t => (
                  <div key={t.name} className="p-4 flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 text-sm">{t.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          t.category === "Financial" ? "bg-green-50 text-green-700" :
                          t.category === "Onboarding" ? "bg-blue-50 text-blue-700" :
                          t.category === "Revenue" ? "bg-purple-50 text-purple-700" :
                          t.category === "TrustyPro" ? "bg-teal-50 text-teal-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>{t.category}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Trigger: {t.trigger} · To: {t.recipient}</p>
                    </div>
                    <span className="text-xs text-gray-400 hidden md:block">Build in SendGrid</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain verification note */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 text-sm">Critical: Domain Authentication</p>
                  <p className="text-xs text-blue-700 mt-1">Without domain authentication, your emails will land in spam. Add these DNS records to prolnk.io:</p>
                  <div className="mt-2 space-y-1 font-mono text-xs text-blue-800">
                    <p>CNAME: em1234.prolnk.io → u1234567.wl234.sendgrid.net</p>
                    <p>CNAME: s1._domainkey.prolnk.io → s1.domainkey.u1234567.wl234.sendgrid.net</p>
                    <p>CNAME: s2._domainkey.prolnk.io → s2.domainkey.u1234567.wl234.sendgrid.net</p>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">Exact values provided by SendGrid after domain setup.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ONESIGNAL TAB ── */}
        {activeTab === "onesignal" && (
          <div className="space-y-5">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 text-sm">Why Push Notifications Matter for AGaaS</p>
                  <p className="text-xs text-amber-700 mt-1">Push notifications are the real-time layer of the Communication Agent. When the Photo Analysis Agent detects an opportunity at 2am, the homeowner gets a push notification immediately — no human involvement, no delay. This is what AGaaS looks like in practice.</p>
                </div>
              </div>
            </div>

            {/* Segments */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Notification Segments</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {ONESIGNAL_SEGMENTS.map(s => (
                  <div key={s.segment} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{s.segment}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{s.size}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {s.triggers.map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Setup steps */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-4">Setup Steps</h2>
              <div className="space-y-3">
                {[
                  { step: 1, title: "Create OneSignal App", desc: "Sign up at onesignal.com. Create a new app for 'ProLnk PWA'. Select 'Web Push' as the platform." },
                  { step: 2, title: "Add ONESIGNAL_APP_ID and ONESIGNAL_REST_API_KEY to Secrets", desc: "Found in OneSignal Dashboard → Settings → Keys & IDs." },
                  { step: 3, title: "Add OneSignal SDK to the PWA", desc: "Install @onesignal/node-onesignal. Add the OneSignal service worker to client/public/. Initialize in main.tsx." },
                  { step: 4, title: "Tag users on login", desc: "When a user logs in, call OneSignal.login(userId) to link their device to their ProLnk account. Tag with role: 'partner' or 'homeowner'." },
                  { step: 5, title: "Test push from Admin Broadcast", desc: "Use Admin → Broadcast Center to send a test push to yourself. Verify it appears on desktop and mobile." },
                ].map(s => (
                  <div key={s.step} className="flex gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 text-sm font-bold">{s.step}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ATTOM TAB ── */}
        {activeTab === "attom" && (
          <div className="space-y-5">
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-teal-900 text-sm">ATTOM: The Property Intelligence Backbone</p>
                  <p className="text-xs text-teal-700 mt-1">Every address that enters the ProLnk network gets enriched with ATTOM data automatically. This is what transforms a job photo into a full property intelligence profile — and what makes the Home Passport credible enough for insurance carriers and real estate platforms.</p>
                </div>
              </div>
            </div>

            {/* Endpoints */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">API Endpoints Used</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {ATTOM_ENDPOINTS.map(e => (
                  <div key={e.endpoint} className="p-4 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        e.priority === "critical" ? "bg-red-50 text-red-700" :
                        e.priority === "high" ? "bg-orange-50 text-orange-700" :
                        e.priority === "medium" ? "bg-yellow-50 text-yellow-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>{e.priority}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-sm text-blue-700 font-medium">{e.endpoint}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{e.use}</p>
                      <p className="text-xs text-amber-600 mt-0.5 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {e.agent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Setup */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-4">Setup Checklist</h2>
              <div className="space-y-3">
                {[
                  { step: 1, title: "Sign up for ATTOM API", desc: "Go to api.attomdata.com. Choose the 'Property API' plan. The Basic plan ($99/mo) covers AVM, ownership, and permit data — sufficient for launch.", done: false },
                  { step: 2, title: "Add ATTOM_API_KEY to Secrets", desc: "Found in your ATTOM Dashboard → API Keys. Add to Settings → Secrets in ProLnk admin.", done: false },
                  { step: 3, title: "Test address lookup", desc: "Use the ATTOM API Explorer to test a DFW address. Confirm AVM and ownership data returns correctly.", done: false },
                  { step: 4, title: "Wire into Property Intelligence Agent", desc: "The enrichment call is already scaffolded in server/agents/propertyIntelligence.ts. It fires automatically on every new address added to the network.", done: false },
                  { step: 5, title: "Set up home sale detection", desc: "ATTOM sale history endpoint detects ownership changes. Wire to the Home Transfer Agent to trigger passport transfer flow automatically.", done: false },
                ].map(s => (
                  <div key={s.step} className={`flex gap-3 p-3 rounded-xl ${s.done ? "bg-green-50" : "bg-gray-50"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      s.done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                    }`}>{s.done ? "✓" : s.step}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing note */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 text-sm">Pricing Strategy</p>
                  <p className="text-xs text-blue-700 mt-1">ATTOM charges per API call at scale. Cache enrichment results in the database — you only need to re-fetch when a property is updated (sale, permit, etc.). At 10,000 properties, caching reduces API costs by ~90%. The Home Passport data pays for itself: a single insurance carrier partnership is worth more than 3 years of ATTOM fees.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
