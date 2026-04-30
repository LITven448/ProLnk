import { useState } from "react";
import { Link } from "wouter";
import {
  Code2, Copy, CheckCircle, ChevronDown, ChevronRight,
  Zap, Shield, Key, Globe, BookOpen, Terminal
} from "lucide-react";
import { toast } from "sonner";

// --- Endpoint data ------------------------------------------------------------
const ENDPOINTS = [
  {
    group: "Authentication",
    color: "#7C3AED",
    icon: Shield,
    endpoints: [
      {
        method: "GET",
        path: "/api/trpc/auth.me",
        desc: "Get the currently authenticated user",
        response: `{ "result": { "data": { "id": 1, "email": "partner@example.com", "name": "John Doe" } } }`,
      },
      {
        method: "POST",
        path: "/api/trpc/auth.logout",
        desc: "Log out the current session",
        response: `{ "result": { "data": { "success": true } } }`,
      },
    ],
  },
  {
    group: "Partner",
    color: "#0891b2",
    icon: Zap,
    endpoints: [
      {
        method: "GET",
        path: "/api/trpc/partners.getMyProfile",
        desc: "Get the authenticated partner's full profile, tier, and stats",
        response: `{ "result": { "data": { "partner": { "id": 1, "businessName": "Acme HVAC", "tier": "pro", "jobsLogged": 42 }, "inboundOpportunities": 12, "convertedOpportunities": 8 } } }`,
      },
      {
        method: "GET",
        path: "/api/trpc/partners.getOutboundReferrals",
        desc: "Get all referrals this partner has sent",
        response: `{ "result": { "data": [{ "id": 1, "description": "Roof inspection needed", "status": "closed", "commissionAmount": "150.00" }] } }`,
      },
      {
        method: "GET",
        path: "/api/trpc/partners.getInboundLeads",
        desc: "Get all inbound leads routed to this partner",
        response: `{ "result": { "data": [{ "id": 1, "opportunityType": "roof_repair", "estimatedJobValue": "2500.00", "status": "pending" }] } }`,
      },
      {
        method: "GET",
        path: "/api/trpc/partners.getCommissions",
        desc: "Get commission ledger for the authenticated partner",
        response: `{ "result": { "data": [{ "id": 1, "amount": "150.00", "status": "paid", "createdAt": "2026-01-15T00:00:00.000Z" }] } }`,
      },
    ],
  },
  {
    group: "Jobs",
    color: "#059669",
    icon: Globe,
    endpoints: [
      {
        method: "POST",
        path: "/api/trpc/partners.logJob",
        desc: "Log a completed job with photos and homeowner details",
        body: `{ "homeownerName": "Jane Smith", "homeownerPhone": "214-555-0100", "serviceType": "hvac_repair", "jobValue": 1200, "photoUrls": ["https://cdn.example.com/photo1.jpg"] }`,
        response: `{ "result": { "data": { "id": 42, "status": "pending_review" } } }`,
      },
      {
        method: "GET",
        path: "/api/trpc/partners.getJobHistory",
        desc: "Get all jobs logged by the authenticated partner",
        response: `{ "result": { "data": [{ "id": 42, "serviceType": "hvac_repair", "jobValue": "1200.00", "createdAt": "2026-01-15T00:00:00.000Z" }] } }`,
      },
    ],
  },
  {
    group: "Opportunities",
    color: "#d97706",
    icon: Terminal,
    endpoints: [
      {
        method: "POST",
        path: "/api/trpc/partners.acceptOpportunity",
        desc: "Accept an inbound lead opportunity",
        body: `{ "opportunityId": 99 }`,
        response: `{ "result": { "data": { "success": true, "dealToken": "abc123xyz" } } }`,
      },
      {
        method: "POST",
        path: "/api/trpc/partners.declineOpportunity",
        desc: "Decline an inbound lead opportunity",
        body: `{ "opportunityId": 99, "reason": "Outside service area" }`,
        response: `{ "result": { "data": { "success": true } } }`,
      },
    ],
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "#059669",
  POST: "#0891b2",
  PUT: "#d97706",
  DELETE: "#DC2626",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard");
  };
  return (
    <button onClick={copy} className="p-1.5 rounded hover:bg-white/10 transition-colors">
      {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
    </button>
  );
}

function EndpointBlock({ ep }: { ep: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span
          className="text-xs font-mono font-bold px-2 py-0.5 rounded flex-shrink-0"
          style={{ backgroundColor: `${METHOD_COLORS[ep.method]}18`, color: METHOD_COLORS[ep.method] }}
        >
          {ep.method}
        </span>
        <code className="text-sm text-gray-700 font-mono flex-1 truncate">{ep.path}</code>
        <span className="text-xs text-gray-400 hidden sm:block flex-shrink-0">{ep.desc}</span>
        {open ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-3">
          <p className="text-sm text-gray-600">{ep.desc}</p>
          {ep.body && (
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-1.5">Request Body</div>
              <div className="relative rounded-lg overflow-hidden">
                <pre className="text-xs p-3 overflow-x-auto" style={{ backgroundColor: "#0A1628", color: "#A0B4C8" }}>
                  {JSON.stringify(JSON.parse(ep.body), null, 2)}
                </pre>
                <div className="absolute top-2 right-2">
                  <CopyButton text={ep.body} />
                </div>
              </div>
            </div>
          )}
          <div>
            <div className="text-xs font-semibold text-gray-500 mb-1.5">Response</div>
            <div className="relative rounded-lg overflow-hidden">
              <pre className="text-xs p-3 overflow-x-auto" style={{ backgroundColor: "#0A1628", color: "#A0B4C8" }}>
                {JSON.stringify(JSON.parse(ep.response), null, 2)}
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text={ep.response} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Page ----------------------------------------------------------------
export default function ApiDocs() {
  const [activeGroup, setActiveGroup] = useState("Authentication");

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://your-domain.manus.space";
  const curlExample = `curl -X GET "${baseUrl}/api/trpc/partners.getMyProfile" \\
  -H "Cookie: session=YOUR_SESSION_COOKIE" \\
  -H "Content-Type: application/json"`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="text-sm text-gray-500 hover:text-gray-700"> Home</button>
            </Link>
            <span className="text-gray-300">/</span>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#0A1628]" />
              <h1 className="text-lg font-heading font-bold text-gray-900">ProLnk API Reference</h1>
            </div>
          </div>
          <span className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded-full font-semibold">v1.0</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar nav */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sticky top-20">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Endpoints</div>
              <nav className="space-y-1">
                {ENDPOINTS.map((g) => {
                  const Icon = g.icon;
                  return (
                    <button
                      key={g.group}
                      onClick={() => setActiveGroup(g.group)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all text-left ${
                        activeGroup === g.group ? "font-semibold" : "text-gray-600 hover:bg-gray-50"
                      }`}
                      style={activeGroup === g.group ? { backgroundColor: `${g.color}12`, color: g.color } : {}}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      {g.group}
                    </button>
                  );
                })}
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Resources</div>
                <Link href="/dashboard">
                  <button className="w-full text-left text-xs text-gray-500 hover:text-gray-700 py-1 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3" /> Partner Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Intro */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-2">Getting Started</h2>
              <p className="text-sm text-gray-600 mb-4">
                The ProLnk API uses tRPC over HTTP. All endpoints are available at <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/api/trpc</code>. Authentication is session-based -- log in via the partner portal to receive a session cookie.
              </p>
              <div className="relative rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/10" style={{ backgroundColor: "#0A1628" }}>
                  <span className="text-xs text-gray-400">Example Request</span>
                  <CopyButton text={curlExample} />
                </div>
                <pre className="text-xs p-4 overflow-x-auto" style={{ backgroundColor: "#0A1628", color: "#A0B4C8" }}>
                  {curlExample}
                </pre>
              </div>
            </div>

            {/* Auth note */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-yellow-200 bg-yellow-50">
              <Key className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <strong>Authentication required:</strong> All partner endpoints require an active session cookie. Direct users to <code className="bg-yellow-100 px-1 rounded text-xs">/login</code> to authenticate via Manus OAuth.
              </div>
            </div>

            {/* Endpoint groups */}
            {ENDPOINTS.filter(g => g.group === activeGroup).map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.group}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${group.color}18` }}>
                      <Icon className="w-4 h-4" style={{ color: group.color }} />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-gray-900">{group.group}</h3>
                    <span className="text-xs text-gray-400">{group.endpoints.length} endpoints</span>
                  </div>
                  <div className="space-y-3">
                    {group.endpoints.map((ep, i) => (
                      <EndpointBlock key={i} ep={ep} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
