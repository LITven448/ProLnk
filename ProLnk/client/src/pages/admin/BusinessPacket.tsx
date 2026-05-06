import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  DollarSign,
  Settings,
  Users,
  TrendingUp,
  Shield,
  CheckCircle2,
  Circle,
  AlertCircle,
  Download,
  Upload,
  Building2,
  Cpu,
  BarChart3,
  BookOpen,
  Lock,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DocItem {
  name: string;
  status: "uploaded" | "missing" | "pending";
  required: boolean;
  notes?: string;
}

interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  docs: DocItem[];
}

interface ChecklistItem {
  id: string;
  task: string;
  category: string;
  completed: boolean;
  critical: boolean;
  notes?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DOC_SECTIONS: DocSection[] = [
  {
    id: "legal",
    title: "Legal & Corporate",
    icon: <Shield className="w-4 h-4" />,
    color: "text-blue-400",
    docs: [
      { name: "LLC Operating Agreement", status: "missing", required: true },
      { name: "Articles of Organization", status: "missing", required: true },
      { name: "Patent Applications (ProLnk + TrustyPro)", status: "missing", required: true },
      { name: "IP Assignment Agreements", status: "missing", required: true },
      { name: "Non-Circumvention Agreement Template", status: "missing", required: true },
      { name: "Partner/Pro Agreement Template", status: "missing", required: true },
      { name: "Privacy Policy (ProLnk)", status: "pending", required: true },
      { name: "Privacy Policy (TrustyPro)", status: "pending", required: true },
      { name: "Terms of Service (ProLnk)", status: "pending", required: true },
      { name: "Terms of Service (TrustyPro)", status: "pending", required: true },
      { name: "Vendor Contracts", status: "missing", required: false },
    ],
  },
  {
    id: "financial",
    title: "Financial Records",
    icon: <DollarSign className="w-4 h-4" />,
    color: "text-emerald-400",
    docs: [
      { name: "P&L Statement (Year 1)", status: "missing", required: true },
      { name: "MRR History Export", status: "missing", required: true },
      { name: "Stripe Transaction History", status: "missing", required: true },
      { name: "Customer Acquisition Cost Analysis", status: "missing", required: true },
      { name: "LTV by Customer Segment", status: "missing", required: true },
      { name: "Churn Rate Report", status: "missing", required: true },
      { name: "Outstanding Liabilities Summary", status: "missing", required: true },
      { name: "Bank Account Statements (12 mo)", status: "missing", required: false },
    ],
  },
  {
    id: "technical",
    title: "Technical Documentation",
    icon: <Cpu className="w-4 h-4" />,
    color: "text-purple-400",
    docs: [
      { name: "System Architecture Diagram", status: "pending", required: true, notes: "See AI Strategy doc" },
      { name: "Database Schema Documentation", status: "pending", required: true },
      { name: "API Integration Map", status: "pending", required: true },
      { name: "n8n Workflow Exports", status: "missing", required: true },
      { name: "LangFlow Agent Exports", status: "missing", required: false, notes: "Not yet built" },
      { name: "GitHub Repository Access Guide", status: "missing", required: true },
      { name: "Credentials & API Keys Inventory", status: "missing", required: true, notes: "Store in 1Password, transfer at close" },
      { name: "Server/Hosting Account Guide", status: "missing", required: true },
    ],
  },
  {
    id: "operations",
    title: "Operations Manual",
    icon: <BookOpen className="w-4 h-4" />,
    color: "text-amber-400",
    docs: [
      { name: "Partner Onboarding SOP", status: "missing", required: true },
      { name: "Homeowner Onboarding SOP", status: "missing", required: true },
      { name: "Commission Dispute Resolution SOP", status: "missing", required: true },
      { name: "Photo Analysis QA SOP", status: "missing", required: true },
      { name: "Customer Support Playbook", status: "missing", required: true },
      { name: "Vendor Contact List", status: "missing", required: true },
      { name: "Escalation Procedures", status: "missing", required: false },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Brand",
    icon: <TrendingUp className="w-4 h-4" />,
    color: "text-rose-400",
    docs: [
      { name: "Brand Guidelines (ProLnk)", status: "pending", required: true },
      { name: "Brand Guidelines (TrustyPro)", status: "pending", required: true },
      { name: "SEO Keyword Rankings Report", status: "missing", required: false },
      { name: "Email List Export", status: "missing", required: true },
      { name: "Paid Ad Account Access Guide", status: "missing", required: false },
      { name: "Content Calendar & Strategy", status: "missing", required: false },
      { name: "Social Media Account Access Guide", status: "missing", required: false },
    ],
  },
];

const TRANSFER_CHECKLIST: ChecklistItem[] = [
  { id: "1", task: "All legal documents uploaded to vault", category: "Legal", completed: false, critical: true },
  { id: "2", task: "Patent applications filed or in process", category: "Legal", completed: false, critical: true },
  { id: "3", task: "IP assignments signed by all contributors", category: "Legal", completed: false, critical: true },
  { id: "4", task: "3 years of financial statements prepared", category: "Financial", completed: false, critical: true },
  { id: "5", task: "Stripe Connect payouts fully operational", category: "Financial", completed: false, critical: true },
  { id: "6", task: "MRR > $10,000/mo (minimum viable valuation)", category: "Financial", completed: false, critical: true },
  { id: "7", task: "All credentials documented in password manager", category: "Technical", completed: false, critical: true },
  { id: "8", task: "GitHub repos transferred to company org", category: "Technical", completed: false, critical: true },
  { id: "9", task: "n8n workflows exported and documented", category: "Technical", completed: false, critical: true },
  { id: "10", task: "Database backup and restore procedure documented", category: "Technical", completed: false, critical: true },
  { id: "11", task: "All SOPs written and reviewed", category: "Operations", completed: false, critical: true },
  { id: "12", task: "Customer support handed off or documented", category: "Operations", completed: false, critical: false },
  { id: "13", task: "Vendor relationships documented with contacts", category: "Operations", completed: false, critical: false },
  { id: "14", task: "Email list and CRM exported", category: "Marketing", completed: false, critical: true },
  { id: "15", task: "Brand guidelines finalized", category: "Marketing", completed: false, critical: false },
  { id: "16", task: "Domain registrar access transferred", category: "Technical", completed: false, critical: true },
  { id: "17", task: "Stripe account ownership transferred", category: "Financial", completed: false, critical: true },
  { id: "18", task: "All partner agreements signed and filed", category: "Legal", completed: false, critical: true },
  { id: "19", task: "Non-disclosure agreement with buyer executed", category: "Legal", completed: false, critical: true },
  { id: "20", task: "30-day transition support period agreed", category: "Operations", completed: false, critical: false },
];

const BUSINESSES = [
  { name: "ProLnk", status: "active", stage: "Pre-launch", mrr: 0, valuation: "TBD" },
  { name: "TrustyPro", status: "active", stage: "Pre-launch", mrr: 0, valuation: "TBD" },
  { name: "Scoop Duke", status: "active", stage: "Operating", mrr: null, valuation: "TBD" },
  { name: "Duke Partners", status: "active", stage: "Holding", mrr: null, valuation: "TBD" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BusinessPacket() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["legal"]));
  const [checklist, setChecklist] = useState<ChecklistItem[]>(TRANSFER_CHECKLIST);
  const [activeTab, setActiveTab] = useState<"overview" | "vault" | "checklist" | "runbook">("overview");

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const totalDocs = DOC_SECTIONS.reduce((sum, s) => sum + s.docs.length, 0);
  const uploadedDocs = DOC_SECTIONS.reduce(
    (sum, s) => sum + s.docs.filter((d) => d.status === "uploaded").length,
    0
  );
  const completedChecklist = checklist.filter((i) => i.completed).length;
  const readinessScore = Math.round(
    ((uploadedDocs / totalDocs) * 0.6 + (completedChecklist / checklist.length) * 0.4) * 100
  );

  const statusBadge = (status: DocItem["status"]) => {
    if (status === "uploaded")
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">Uploaded</Badge>;
    if (status === "pending")
      return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">In Progress</Badge>;
    return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Missing</Badge>;
  };

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "vault" as const, label: "Document Vault", icon: <FileText className="w-4 h-4" /> },
    { id: "checklist" as const, label: "Transfer Checklist", icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: "runbook" as const, label: "Technical Runbook", icon: <Cpu className="w-4 h-4" /> },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-amber-400" />
              Business Packet
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              Everything a buyer, investor, or new operator needs to take over the business.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              {readinessScore}% Sale Ready
            </Badge>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Readiness Score */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">Sale Readiness Score</h3>
                    <p className="text-slate-400 text-sm">Based on documents uploaded and checklist completion</p>
                  </div>
                  <div className="text-4xl font-bold text-amber-400">{readinessScore}%</div>
                </div>
                <Progress value={readinessScore} className="h-3 bg-slate-700" />
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>Documents: {uploadedDocs}/{totalDocs} uploaded</span>
                  <span>Checklist: {completedChecklist}/{checklist.length} complete</span>
                </div>
              </CardContent>
            </Card>

            {/* Business Portfolio */}
            <div>
              <h3 className="text-white font-semibold mb-3">Business Portfolio</h3>
              <div className="grid grid-cols-2 gap-3">
                {BUSINESSES.map((biz) => (
                  <Card key={biz.name} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{biz.name}</span>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                          {biz.status}
                        </Badge>
                      </div>
                      <div className="text-slate-400 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span>Stage</span>
                          <span className="text-slate-300">{biz.stage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MRR</span>
                          <span className="text-slate-300">
                            {biz.mrr !== null ? `$${biz.mrr.toLocaleString()}` : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Valuation</span>
                          <span className="text-slate-300">{biz.valuation}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {DOC_SECTIONS.reduce((s, sec) => s + sec.docs.filter((d) => d.status === "missing" && d.required).length, 0)}
                  </div>
                  <div className="text-slate-400 text-xs mt-1">Critical Docs Missing</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-amber-400">
                    {checklist.filter((i) => i.critical && !i.completed).length}
                  </div>
                  <div className="text-slate-400 text-xs mt-1">Critical Tasks Remaining</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-400">~18 mo</div>
                  <div className="text-slate-400 text-xs mt-1">Est. Time to Sale Ready</div>
                </CardContent>
              </Card>
            </div>

            {/* Key Resources */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium">Key Strategy Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { name: "AI Agent Stack Strategy & Integration Map", desc: "Full tool recommendations, agent roster, commission flow" },
                  { name: "Photo Analysis Pipeline Architecture", desc: "153-category taxonomy, CV gate, GPT-4o pipeline" },
                  { name: "Demo Video Production Plan", desc: "Storyboards and Runway Gen-3 prompts for both videos" },
                  { name: "Commission Flow Documentation", desc: "End-to-end money flow with all edge cases" },
                ].map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <div className="text-white text-sm font-medium">{doc.name}</div>
                      <div className="text-slate-400 text-xs">{doc.desc}</div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Document Vault Tab */}
        {activeTab === "vault" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                {uploadedDocs} of {totalDocs} documents uploaded. Red items are required for a sale.
              </p>
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
            {DOC_SECTIONS.map((section) => (
              <Card key={section.id} className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/30 transition-colors"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className={section.color}>{section.icon}</span>
                    <span className="text-white font-medium">{section.title}</span>
                    <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                      {section.docs.filter((d) => d.status === "uploaded").length}/{section.docs.length}
                    </Badge>
                  </div>
                  {expandedSections.has(section.id) ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {expandedSections.has(section.id) && (
                  <div className="border-t border-slate-700">
                    {section.docs.map((doc, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 last:border-0 hover:bg-slate-700/20 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {doc.required ? (
                            <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                          )}
                          <div className="min-w-0">
                            <div className="text-slate-200 text-sm truncate">{doc.name}</div>
                            {doc.notes && <div className="text-slate-500 text-xs">{doc.notes}</div>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                          {statusBadge(doc.status)}
                          {doc.status === "uploaded" ? (
                            <Button variant="ghost" size="sm" className="text-slate-400 h-7 px-2">
                              <Download className="w-3.5 h-3.5" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="text-slate-400 h-7 px-2">
                              <Upload className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Transfer Checklist Tab */}
        {activeTab === "checklist" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                {completedChecklist} of {checklist.length} tasks complete.{" "}
                {checklist.filter((i) => i.critical && !i.completed).length} critical tasks remaining.
              </p>
              <Progress value={(completedChecklist / checklist.length) * 100} className="w-32 h-2 bg-slate-700" />
            </div>
            {["Legal", "Financial", "Technical", "Operations", "Marketing"].map((category) => {
              const items = checklist.filter((i) => i.category === category);
              const done = items.filter((i) => i.completed).length;
              return (
                <Card key={category} className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-sm font-medium">{category}</CardTitle>
                      <span className="text-slate-400 text-xs">{done}/{items.length}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 cursor-pointer group"
                        onClick={() => toggleChecklistItem(item.id)}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5 group-hover:text-slate-400 transition-colors" />
                        )}
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-sm ${
                              item.completed ? "text-slate-500 line-through" : "text-slate-200"
                            }`}
                          >
                            {item.task}
                          </span>
                          {item.critical && !item.completed && (
                            <Badge className="ml-2 bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                              Critical
                            </Badge>
                          )}
                          {item.notes && (
                            <div className="text-slate-500 text-xs mt-0.5">{item.notes}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Technical Runbook Tab */}
        {activeTab === "runbook" && (
          <div className="space-y-4">
            <p className="text-slate-400 text-sm">
              Everything a technical buyer or new CTO needs to understand and operate the infrastructure.
            </p>

            {/* Integration Status */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                  <Settings className="w-4 h-4 text-purple-400" />
                  Integration Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { name: "Stripe Payments", status: "live", note: "Test mode — claim sandbox before May 19" },
                  { name: "Resend Email", status: "live", note: "Transactional emails active" },
                  { name: "Supabase / TiDB Database", status: "live", note: "MySQL-compatible, hosted" },
                  { name: "Manus OAuth", status: "live", note: "Admin authentication" },
                  { name: "n8n Workflows", status: "configured", note: "Webhook base URL set" },
                  { name: "Stripe Connect (Partner Payouts)", status: "pending", note: "Not yet implemented" },
                  { name: "LangFlow (Agent Builder)", status: "not_started", note: "See AI Strategy doc" },
                  { name: "Qdrant (Vector DB)", status: "not_started", note: "See AI Strategy doc" },
                  { name: "Mem0 (Property Memory)", status: "not_started", note: "See AI Strategy doc" },
                  { name: "Google Cloud Vision API", status: "not_started", note: "Photo quality gate" },
                  { name: "Twilio SMS", status: "not_started", note: "Partner notifications" },
                  { name: "Mapbox", status: "not_started", note: "Territory mapping" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <div className="text-slate-200 text-sm">{item.name}</div>
                      <div className="text-slate-500 text-xs">{item.note}</div>
                    </div>
                    <Badge
                      className={
                        item.status === "live"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs"
                          : item.status === "configured"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
                          : item.status === "pending"
                          ? "bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs"
                          : "bg-slate-500/20 text-slate-400 border-slate-500/30 text-xs"
                      }
                    >
                      {item.status === "live"
                        ? "Live"
                        : item.status === "configured"
                        ? "Configured"
                        : item.status === "pending"
                        ? "Pending"
                        : "Not Started"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Credential Transfer Guide */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  Credential Transfer Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-slate-400 text-sm">
                  At the time of sale, all credentials must be transferred to the buyer via a secure password manager
                  handoff (1Password Business or similar). Never send credentials via email or chat.
                </p>
                <div className="space-y-2 mt-3">
                  {[
                    "Stripe account ownership transfer (requires Stripe verification)",
                    "GitHub organization ownership transfer",
                    "Domain registrar account (prolnk.io, trustypro.io)",
                    "Manus project ownership transfer",
                    "n8n instance credentials and workflow exports",
                    "Resend API key and domain verification",
                    "All third-party API keys (Google Cloud, Twilio, Mapbox)",
                    "Database connection strings and backup access",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-slate-500 mt-0.5 flex-shrink-0">{i + 1}.</span>
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Architecture Summary */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  Architecture Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Frontend", value: "React 19 + Tailwind 4 + shadcn/ui" },
                    { label: "Backend", value: "Express 4 + tRPC 11 + TypeScript" },
                    { label: "Database", value: "MySQL (TiDB) via Drizzle ORM" },
                    { label: "Auth", value: "Manus OAuth + JWT sessions" },
                    { label: "Payments", value: "Stripe (test mode)" },
                    { label: "Email", value: "Resend API" },
                    { label: "Hosting", value: "Manus managed (manus.space)" },
                    { label: "Automation", value: "n8n (webhook-driven)" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-xs">{item.label}</div>
                      <div className="text-slate-200 font-medium mt-0.5">{item.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
