import React from 'react';
import { useState } from "react";
import { Link } from "wouter";
import {
  Code2, Copy, CheckCircle, ChevronDown, ChevronRight,
  Zap, Shield, Key, Globe, BookOpen, Terminal, AlertCircle, Clock
} from "lucide-react";
import { toast } from "sonner";

// --- Types --------------------------------------------------------------------
type SnippetLang = "curl" | "javascript" | "python";

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  desc: string;
  body?: string;
  response: string;
  rateLimit?: string;
}

interface EndpointGroup {
  group: string;
  color: string;
  icon: React.ElementType;
  endpoints: Endpoint[];
}

// --- Endpoint data ------------------------------------------------------------
const ENDPOINTS: EndpointGroup[] = [
  {
    group: "Waitlist",
    color: "#0891b2",
    icon: Globe,
    endpoints: [
      {
        method: "POST",
        path: "/api/trpc/waitlist.joinProWaitlist",
        desc: "Register a service professional on the Pro waitlist. Sends a confirmation email on success.",
        body: JSON.stringify({
          name: "Jane Smith",
          email: "jane@acmehvac.com",
          phone: "214-555-0199",
          trade: "hvac",
          serviceArea: "Dallas, TX",
          yearsExperience: 8,
        }),
        response: JSON.stringify({
          result: {
            data: {
              id: 1042,
              status: "waitlisted",
              position: 317,
              message: "You're on the list! We'll be in touch soon.",
            },
          },
        }),
      },
      {
        method: "POST",
        path: "/api/trpc/waitlist.joinHomeWaitlist",
        desc: "Register a homeowner on the homeowner waitlist. Sends a confirmation email on success.",
        body: JSON.stringify({
          name: "Robert Chen",
          email: "robert@example.com",
          phone: "469-555-0312",
          address: "1234 Maple Ave, Plano, TX 75024",
          serviceNeeded: "roof_repair",
          urgency: "within_month",
        }),
        response: JSON.stringify({
          result: {
            data: {
              id: 5801,
              status: "waitlisted",
              estimatedMatchDate: "2026-06-01",
              message: "We'll match you with a verified pro soon.",
            },
          },
        }),
      },
    ],
  },
  {
    group: "Admin",
    color: "#7C3AED",
    icon: Shield,
    endpoints: [
      {
        method: "GET",
        path: "/api/trpc/admin.getNetworkStats",
        desc: "Returns aggregate platform statistics. Requires admin JWT in the Authorization header.",
        response: JSON.stringify({
          result: {
            data: {
              totalPros: 312,
              totalHomeowners: 1847,
              activeMatches: 94,
              averageMatchTime: "4.2 hours",
              topTrades: ["hvac", "plumbing", "electrical"],
            },
          },
        }),
        rateLimit: "60 requests / minute per token",
      },
    ],
  },
  {
    group: "TrustyPro",
    color: "#059669",
    icon: Zap,
    endpoints: [
      {
        method: "POST",
        path: "/api/trpc/trustyPro.analyzePhotos",
        desc: "Submit job-site photos for AI analysis. Returns damage assessments, material identification, and recommended services. Rate-limited to 5 requests per hour per IP.",
        body: JSON.stringify({
          photoUrls: [
            "https://cdn.example.com/job-photo-1.jpg",
            "https://cdn.example.com/job-photo-2.jpg",
          ],
          context: "roof_damage",
        }),
        response: JSON.stringify({
          result: {
            data: {
              analysisId: "anl_9f2c3d",
              findings: [
                { category: "structural", severity: "moderate", description: "Missing shingles along ridge line, ~12 sq ft affected" },
                { category: "water_damage", severity: "low", description: "Minor staining on fascia, no active leak detected" },
              ],
              recommendedServices: ["roof_repair", "gutter_inspection"],
              estimatedRepairRange: { low: 800, high: 2400, currency: "USD" },
              confidence: 0.91,
            },
          },
        }),
        rateLimit: "5 requests / hour per IP",
      },
    ],
  },
  {
    group: "Partner",
    color: "#d97706",
    icon: Terminal,
    endpoints: [
      {
        method: "GET",
        path: "/api/trpc/partners.getMyProfile",
        desc: "Get the authenticated partner's full profile, tier, and performance stats.",
        response: JSON.stringify({
          result: {
            data: {
              partner: { id: 1, businessName: "Acme HVAC", tier: "pro", jobsLogged: 42 },
              inboundOpportunities: 12,
              convertedOpportunities: 8,
            },
          },
        }),
      },
      {
        method: "GET",
        path: "/api/trpc/partners.getCommissions",
        desc: "Get commission ledger for the authenticated partner.",
        response: JSON.stringify({
          result: {
            data: [
              { id: 1, amount: "150.00", status: "paid", createdAt: "2026-01-15T00:00:00.000Z" },
              { id: 2, amount: "320.00", status: "pending", createdAt: "2026-04-22T00:00:00.000Z" },
            ],
          },
        }),
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

// --- Helpers ------------------------------------------------------------------
function buildSnippets(lang: SnippetLang, ep: Endpoint, baseUrl: string): string {
  const isPost = ep.method === "POST";
  const url = `${baseUrl}${ep.path}`;
  const bodyStr = ep.body ? JSON.stringify(JSON.parse(ep.body)) : undefined;

  if (lang === "curl") {
    const lines = [
      `curl -X ${ep.method} "${url}"`,
      `  -H "Authorization: Bearer YOUR_API_KEY"`,
      `  -H "Content-Type: application/json"`,
    ];
    if (isPost && bodyStr) lines.push(`  -d '${bodyStr}'`);
    return lines.join(" \\\n");
  }

  if (lang === "javascript") {
    const opts: string[] = [
      `  method: "${ep.method}"`,
      `  headers: {`,
      `    "Authorization": "Bearer YOUR_API_KEY",`,
      `    "Content-Type": "application/json"`,
      `  }`,
    ];
    if (isPost && bodyStr) opts.push(`  body: JSON.stringify(${bodyStr})`);
    return [
      `const res = await fetch("${url}", {`,
      ...opts.map((l, i) => (i < opts.length - 1 && !l.endsWith("{") ? l + "," : l)),
      `});`,
      `const data = await res.json();`,
      `console.log(data);`,
    ].join("\n");
  }

  // python
  const lines = [
    `import requests`,
    ``,
    `headers = {`,
    `    "Authorization": "Bearer YOUR_API_KEY",`,
    `    "Content-Type": "application/json",`,
    `}`,
    ``,
  ];
  if (isPost && bodyStr) {
    lines.push(`payload = ${JSON.stringify(JSON.parse(ep.body!), null, 4).replace(/^/gm, "").split("\n").join("\n")}`);
    lines.push(``);
    lines.push(`res = requests.${ep.method.toLowerCase()}("${url}", json=payload, headers=headers)`);
  } else {
    lines.push(`res = requests.${ep.method.toLowerCase()}("${url}", headers=headers)`);
  }
  lines.push(`print(res.json())`);
  return lines.join("\n");
}

// --- Sub-components -----------------------------------------------------------
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
      {copied
        ? <CheckCircle className="w-3.5 h-3.5 text-green-400" />
        : <Copy className="w-3.5 h-3.5 text-gray-400" />}
    </button>
  );
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-white/10"
        style={{ backgroundColor: "#0A1628" }}
      >
        <span className="text-xs text-gray-400 font-mono">{lang ?? "json"}</span>
        <CopyButton text={code} />
      </div>
      <pre className="text-xs p-4 overflow-x-auto leading-relaxed" style={{ backgroundColor: "#0D1D36", color: "#A0C4D8" }}>
        {code}
      </pre>
    </div>
  );
}

function EndpointBlock({ ep, baseUrl }: { ep: Endpoint; baseUrl: string }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<SnippetLang>("curl");

  const snippet = buildSnippets(lang, ep, baseUrl);

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
        <span className="text-xs text-gray-400 hidden sm:block flex-shrink-0 max-w-xs truncate">{ep.desc}</span>
        {open
          ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
          : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>

      {open && (
        <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
          <p className="text-sm text-gray-600">{ep.desc}</p>

          {ep.rateLimit && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span className="text-xs text-amber-700"><strong>Rate limit:</strong> {ep.rateLimit}</span>
            </div>
          )}

          {/* Language tabs */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              {(["curl", "javascript", "python"] as SnippetLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-xs px-3 py-1 rounded-full font-mono transition-all ${
                    lang === l
                      ? "bg-[#0A1628] text-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <CodeBlock code={snippet} lang={lang} />
          </div>

          {ep.body && (
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-1.5">Request Body</div>
              <CodeBlock code={JSON.stringify(JSON.parse(ep.body), null, 2)} lang="json" />
            </div>
          )}

          <div>
            <div className="text-xs font-semibold text-gray-500 mb-1.5">Response</div>
            <CodeBlock code={JSON.stringify(JSON.parse(ep.response), null, 2)} lang="json" />
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Page ----------------------------------------------------------------
export default function ApiDocs() {
  const [activeGroup, setActiveGroup] = useState("Waitlist");

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://prolnk.xyz";

  const authExample = `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

  const curlAuthExample = `curl -X GET "${baseUrl}/api/trpc/admin.getNetworkStats" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="text-sm text-gray-500 hover:text-gray-700">Home</button>
            </Link>
            <span className="text-gray-300">/</span>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#0A1628]" />
              <h1 className="text-lg font-heading font-bold text-gray-900">ProLnk API Reference</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded-full font-semibold">v1.0</span>
            <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full font-semibold">Live</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sticky top-20 space-y-4">
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">On this page</div>
                <nav className="space-y-0.5">
                  {["Introduction", "Authentication", "Rate Limits"].map((s) => (
                    <a
                      key={s}
                      href={`#${s.toLowerCase().replace(" ", "-")}`}
                      className="block text-sm text-gray-500 hover:text-gray-800 py-1 px-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      {s}
                    </a>
                  ))}
                </nav>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Endpoints</div>
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
                        <span className="ml-auto text-xs opacity-50">{g.endpoints.length}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Resources</div>
                <Link href="/compliance">
                  <button className="w-full text-left text-xs text-gray-500 hover:text-gray-700 py-1 flex items-center gap-1.5">
                    <Shield className="w-3 h-3" /> Compliance & Legal
                  </button>
                </Link>
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

            {/* Introduction */}
            <div id="introduction" className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Introduction</h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                The ProLnk API is a tRPC-over-HTTP interface that powers the ProLnk and TrustyPro platforms. Use it to integrate partner workflows, submit waitlist signups, trigger AI-powered photo analysis, and retrieve platform analytics — all from your own systems.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Base URL", value: "prolnk.xyz/api/trpc" },
                  { label: "Protocol", value: "HTTPS only" },
                  { label: "Format", value: "JSON (tRPC)" },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                    <div className="text-sm font-mono font-semibold text-gray-800">{item.value}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400">
                All tRPC queries use <code className="bg-gray-100 px-1 py-0.5 rounded">GET</code> requests; mutations use <code className="bg-gray-100 px-1 py-0.5 rounded">POST</code>. Input parameters for queries are passed as a URL-encoded <code className="bg-gray-100 px-1 py-0.5 rounded">input</code> query param; mutations accept a JSON body.
              </p>
            </div>

            {/* Authentication */}
            <div id="authentication" className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Key className="w-5 h-5 text-[#0A1628]" />
                <h2 className="text-xl font-heading font-bold text-gray-900">Authentication</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Protected endpoints require a Bearer token in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Authorization</code> header. Obtain your API key from the partner dashboard under <strong>Settings → API Keys</strong>.
              </p>
              <CodeBlock code={authExample} lang="http header" />
              <div className="mt-4">
                <div className="text-xs font-semibold text-gray-500 mb-1.5">Example authenticated request</div>
                <CodeBlock code={curlAuthExample} lang="curl" />
              </div>
              <div className="mt-4 flex items-start gap-3 p-3 rounded-xl border border-blue-100 bg-blue-50">
                <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-700 leading-relaxed">
                  <strong>Public endpoints</strong> (waitlist signups) require no authentication. <strong>Partner endpoints</strong> require a Partner JWT. <strong>Admin endpoints</strong> require a JWT with the <code className="bg-blue-100 px-1 rounded">admin: true</code> claim.
                </div>
              </div>
            </div>

            {/* Rate limits */}
            <div id="rate-limits" className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-[#0A1628]" />
                <h2 className="text-xl font-heading font-bold text-gray-900">Rate Limits</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Rate limits are enforced per IP (unauthenticated) or per API key (authenticated). Exceeding a limit returns <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">HTTP 429</code> with a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Retry-After</code> header.
              </p>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">Endpoint group</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">Limit</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">Window</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono text-xs text-gray-700">
                    {[
                      { group: "Waitlist (public)", limit: "30 req", window: "per minute per IP" },
                      { group: "Partner endpoints", limit: "120 req", window: "per minute per token" },
                      { group: "Admin endpoints", limit: "60 req", window: "per minute per token" },
                      { group: "trustyPro.analyzePhotos", limit: "5 req", window: "per hour per IP" },
                    ].map((row) => (
                      <tr key={row.group} className="hover:bg-gray-50">
                        <td className="px-4 py-2.5">{row.group}</td>
                        <td className="px-4 py-2.5 text-teal-700 font-semibold">{row.limit}</td>
                        <td className="px-4 py-2.5 text-gray-400">{row.window}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                    <span className="text-xs text-gray-400">{group.endpoints.length} endpoint{group.endpoints.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="space-y-3">
                    {group.endpoints.map((ep, i) => (
                      <EndpointBlock key={i} ep={ep} baseUrl={baseUrl} />
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
