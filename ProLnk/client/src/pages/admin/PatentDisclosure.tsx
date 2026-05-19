import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "sonner";
import { Shield, FileText, Lock, Zap, Camera, Network, ArrowRight, Download, CreditCard, Building2, CheckCircle, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


const PATENTS = [
  {
    id: "PAT-001",
    title: "AI-Driven Cross-Trade Lead Generation via Field Photo Analysis",
    status: "Pending",
    filedDate: "2025-Q4",
    version: "V11",
    icon: Camera,
    description:
      "A system and method for automatically identifying cross-trade home service opportunities by applying computer vision and large language model analysis to photos captured by field service technicians during routine job visits. The system generates structured opportunity records with confidence scores, estimated job values, and matched partner recommendations without requiring homeowner initiation.",
    claims: [
      "Automatic detection of home service opportunities from field technician photos using AI/ML",
      "Confidence-scored opportunity dispatch to pre-qualified partner network members",
      "Commission attribution chain linking source technician to receiving partner to closed job",
      "Real-time opportunity routing based on partner tier, service area, and availability",
    ],
    novelty:
      "No existing platform combines field-captured photo analysis with automated cross-trade lead dispatch and commission tracking in a single integrated workflow. Competitors (Angi, Thumbtack, Jobber) require homeowner initiation — this system is entirely partner-initiated and AI-driven.",
    defensibility: "High",
  },
  {
    id: "PAT-002",
    title: "Homeowner Property Intelligence Platform with Tiered AI Offer Classification",
    status: "Pending",
    filedDate: "2025-Q4",
    version: "V11",
    icon: Zap,
    description:
      "A system for building and maintaining a structured homeowner property intelligence profile that combines self-reported data (systems inventory, improvement history, wish list with budget/urgency), AI-analyzed property photos, and behavioral signals to generate two-track service offers: repair offers (issue-based, no visualization required) and transformation offers (AI-generated before/after images showing the desired outcome).",
    claims: [
      "Two-track offer classification engine distinguishing repair vs. transformation service opportunities",
      "AI-generated before/after property transformation images as a conversion mechanism for discretionary upgrades",
      "Structured homeowner wish list with budget ranges and urgency signals as a declared purchase intent data asset",
      "Integration of field technician AI scan data with homeowner self-reported profile for comprehensive property intelligence",
    ],
    novelty:
      "The two-track classification (repair vs. transformation) with AI-generated visualization for transformation offers is novel. Existing platforms show static before/after photos from past projects — this system generates personalized visualizations of the homeowner's specific property.",
    defensibility: "Very High",
  },
  {
    id: "PAT-003",
    title: "Automated Commission Attribution and Payout System for Multi-Party Home Service Networks",
    status: "Pending",
    filedDate: "2025-Q4",
    version: "V11",
    icon: Network,
    description:
      "A system for automatically calculating, attributing, and distributing commissions across a multi-party home service partner network where a single job may generate commission obligations to a source partner (who identified the opportunity), a platform operator (network fee), and optionally a referring partner (referral bonus). The system integrates with FSM platforms (Jobber, Housecall Pro, ServiceTitan) via webhook to trigger commission events on job close.",
    claims: [
      "Multi-party commission attribution across source partner, platform operator, and referral partner in a single transaction",
      "FSM webhook integration for automatic commission triggering on job close without manual entry",
      "Commission cap enforcement preventing total commission from exceeding configurable percentage of job value",
      "Tiered commission rate structure where partner tier determines both earning rate and commission cap",
    ],
    novelty:
      "Existing FSM platforms handle billing and job management but do not support multi-party commission attribution across a partner network. This system bridges FSM job close events to network commission distribution automatically.",
    defensibility: "High",
  },
  {
    id: "PAT-004",
    title: "Zero-Self-Reporting Automated Payment Collection via Homeowner Check-In Confirmation",
    status: "Pending",
    filedDate: "2026-Q1",
    version: "V12",
    icon: CheckCircle,
    description:
      "A system and method for automatically collecting platform commissions and homeowner payments triggered solely by the homeowner's digital confirmation of job completion — without any manual reporting, invoice submission, or action from the service partner. The system stores a homeowner payment method on file at deal acceptance and executes milestone-based charges (deposit on job start, balance on homeowner check-in) through a tokenized payment processor, eliminating the possibility of commission evasion through non-reporting.",
    claims: [
      "Claim 20: Automatic platform commission collection triggered by homeowner digital check-in confirmation, requiring no partner action or self-reporting",
      "Claim 21: Milestone-based payment scheduling (deposit + balance) stored against a homeowner card-on-file at deal acceptance, executed automatically at predefined job lifecycle events",
      "Claim 22: Dual-path payment architecture supporting (a) homeowner card-on-file for standard jobs and (b) ACH debit authorization for insurance-funded jobs, with automatic path selection based on job type classification",
      "Claim 23: NACHA-compliant ACH debit authorization workflow for insurance job commission collection, where partner signs a digital mandate at deal assignment and the platform pulls the commission automatically upon homeowner check-in confirmation",
    ],
    novelty:
      "No existing home service platform uses homeowner check-in as the sole trigger for automatic commission collection. All competitors rely on partner self-reporting (invoice submission, job close button) which creates evasion risk. This system makes commission collection structurally unavoidable by tying it to the homeowner's independent confirmation action. The dual-path architecture (card vs. ACH based on job type) is also novel in the home services context.",
    defensibility: "Very High",
  },
];

const TRADE_SECRETS = [
  {
    title: "Partner Priority Score (PPS) Algorithm",
    description:
      "The weighted scoring formula that ranks partners for lead dispatch, including the specific weights assigned to response speed, job close rate, review score, tier level, and activity recency. This formula is the core of fair lead distribution and is not disclosed publicly.",
  },
  {
    title: "AI Opportunity Detection Prompt Engineering",
    description:
      "The specific system prompts, confidence thresholds, and category-to-business-type mapping used in the photo analysis pipeline. These prompts represent significant iteration and tuning investment.",
  },
  {
    title: "Homeowner Wish List Valuation Model",
    description:
      "The methodology for calculating the aggregate declared purchase intent value of the homeowner database, including how budget ranges are normalized and how urgency signals are weighted for lead prioritization.",
  },
  {
    title: "Zero-Self-Reporting Commission Evasion Prevention Logic",
    description:
      "The specific sequence of payment method tokenization, milestone trigger conditions, and webhook reconciliation that makes commission evasion structurally impossible. The implementation details of the check-in-to-charge pipeline are a trade secret even if the high-level concept is patented.",
  },
];

const VERSION_COLORS: Record<string, string> = {
  V11: "border-blue-500/40 text-blue-400",
  V12: "border-emerald-500/40 text-emerald-400",
};

export default function PatentDisclosure() {
  
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExportPDF = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>ProLnk Patent & IP Disclosure — Confidential</title>
<style>
  body { font-family: 'Georgia', serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #111; }
  h1 { font-size: 24px; border-bottom: 2px solid #0A1628; padding-bottom: 8px; }
  h2 { font-size: 18px; color: #0A1628; margin-top: 32px; }
  h3 { font-size: 14px; color: #444; margin-top: 16px; }
  .meta { font-size: 12px; color: #666; margin-bottom: 8px; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
  .badge-filed { background: #dbeafe; color: #1e40af; }
  .badge-pending { background: #fef9c3; color: #92400e; }
  .badge-documented { background: #f3f4f6; color: #374151; }
  ol li { margin-bottom: 6px; font-size: 13px; line-height: 1.6; }
  p { font-size: 13px; line-height: 1.7; }
  hr { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
  .footer { margin-top: 48px; font-size: 11px; color: #9ca3af; text-align: center; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
<h1>ProLnk Patent &amp; IP Disclosure</h1>
<p class="meta">Confidential — For internal use, investor due diligence, and M&amp;A purposes only.<br/>Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
<hr/>
${PATENTS.map(p => `
<h2>${p.id} — ${p.title}</h2>
<p class="meta">
  <span class="badge badge-${p.status === 'Filed' ? 'filed' : p.status === 'Patent Pending' ? 'pending' : 'documented'}">${p.status}</span>
  &nbsp;Filed: ${p.filedDate} &nbsp;|&nbsp; Version: ${p.version} &nbsp;|&nbsp; Defensibility: ${p.defensibility}
</p>
<p>${p.description}</p>
<h3>Key Claims</h3>
<ol>${p.claims.map(c => `<li>${c}</li>`).join('')}</ol>
<h3>Novelty Argument</h3>
<p>${p.novelty}</p>
<hr/>
`).join('')}
<div class="footer">ProLnk &mdash; Confidential &mdash; All Rights Reserved &mdash; ${new Date().getFullYear()}</div>
</body>
</html>`;

    const printWin = window.open('', '_blank', 'width=900,height=700');
    if (!printWin) {
      // Fallback: download as HTML file
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ProLnk-Patent-Disclosure-V12-${new Date().toISOString().slice(0, 10)}.html`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      printWin.document.write(htmlContent);
      printWin.document.close();
      setTimeout(() => {
        printWin.print();
      }, 500);
    }
    toast.success("Patent Disclosure opened for printing — use 'Save as PDF' in the print dialog.");
  };

  return (
    <AdminLayout>
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Patent & IP Disclosure</h1>
          <p className="text-gray-400 text-sm">
            Confidential — For internal use, investor due diligence, and M&A purposes only.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-white/20 text-gray-300 hover:text-white"
          onClick={handleExportPDF}
        >
          <Download className="w-4 h-4" />
          Export for Attorney
        </Button>
      </div>

      {/* Summary Banner */}
      <Card className="bg-indigo-950/40 border-indigo-500/30">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-white font-semibold mb-1">4 Patent Applications — V12 Updated</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                ProLnk has identified four novel, defensible workflows eligible for utility patent protection.
                PAT-001 through PAT-003 were identified in V11. PAT-004 (Zero-Self-Reporting Payment Collection)
                was added in V12 and represents the most structurally defensible innovation — it makes commission
                evasion architecturally impossible. All four represent first-mover innovations with no direct prior art
                from existing competitors.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Badge variant="outline" className="border-blue-500/40 text-blue-400 text-xs">3 V11 Claims</Badge>
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-xs">1 V12 Claim (New)</Badge>
                <Badge variant="outline" className="border-yellow-500/40 text-yellow-400 text-xs">4 Total Pending</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patent Applications */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-white">Patent Applications</h2>
        {PATENTS.map((patent) => {
          const Icon = patent.icon;
          const isExpanded = expandedId === patent.id;
          const isNew = patent.version === "V12";

          return (
            <Card
              key={patent.id}
              className={`border transition-all ${isNew ? "bg-emerald-950/20 border-emerald-500/30" : "bg-gray-900 border-white/10"}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${isNew ? "bg-emerald-500/10" : "bg-indigo-500/10"}`}>
                      <Icon className={`w-4.5 h-4.5 ${isNew ? "text-emerald-400" : "text-indigo-400"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs text-gray-500 font-mono">{patent.id}</span>
                        <Badge variant="outline" className="border-yellow-500/40 text-yellow-400 text-xs">
                          {patent.status}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${VERSION_COLORS[patent.version] ?? ""}`}>
                          {patent.version}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            patent.defensibility === "Very High"
                              ? "border-emerald-500/40 text-emerald-400 text-xs"
                              : "border-blue-500/40 text-blue-400 text-xs"
                          }
                        >
                          {patent.defensibility} Defensibility
                        </Badge>
                        {isNew && (
                          <Badge className="bg-emerald-600/30 text-emerald-300 text-xs border-0">NEW</Badge>
                        )}
                      </div>
                      <CardTitle className="text-white text-base leading-snug">{patent.title}</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-500 whitespace-nowrap">Filed: {patent.filedDate}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-white h-7 px-2"
                      onClick={() => setExpandedId(isExpanded ? null : patent.id)}
                    >
                      {isExpanded ? "Collapse" : "Expand"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed">{patent.description}</p>

                <div>
                  <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-2">Key Claims</p>
                  <ul className="space-y-1.5">
                    {patent.claims.map((claim, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <ArrowRight className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${isNew ? "text-emerald-400" : "text-indigo-400"}`} />
                        {claim}
                      </li>
                    ))}
                  </ul>
                </div>

                {isExpanded && (
                  <div className="bg-gray-800/60 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1">Novelty Argument</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{patent.novelty}</p>
                  </div>
                )}

                {!isExpanded && (
                  <button
                    className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                    onClick={() => setExpandedId(patent.id)}
                  >
                    Show novelty argument →
                  </button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* V12 Architecture Note */}
      <Card className="bg-emerald-950/30 border-emerald-500/30">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold mb-2">V12 Architecture — Patent Attorney Briefing Notes</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>
                  <strong className="text-gray-300">Core Innovation (Claim 20):</strong> The homeowner check-in is an independent third-party confirmation that cannot be colluded with the partner. This makes it a structurally superior trigger for commission collection compared to any partner-controlled event (invoice submission, job close button). The patent should emphasize the independence of the trigger.
                </p>
                <p>
                  <strong className="text-gray-300">Dual-Path Architecture (Claims 22-23):</strong> The automatic selection between card-on-file and ACH debit based on job type classification (insurance vs. standard) is novel. The system reads the deal's insurance flag and routes to the appropriate payment collection mechanism without any manual selection.
                </p>
                <p>
                  <strong className="text-gray-300">Prior Art Risk:</strong> Stripe's standard card-on-file and ACH products exist, but the specific application to home service commission collection triggered by a third-party (homeowner) confirmation event is novel. The patent should be drafted around the workflow, not the payment technology.
                </p>
                <p>
                  <strong className="text-gray-300">Recommended Filing Strategy:</strong> File PAT-004 as a continuation-in-part of PAT-003 to establish the V11 priority date for the commission attribution claims, while adding the V12 payment collection claims as new matter.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trade Secrets */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">Trade Secrets (Not for Patent Filing)</h2>
        </div>
        <p className="text-sm text-gray-400">
          The following proprietary elements are better protected as trade secrets than patents, as disclosure through
          the patent process would enable competitors to design around them.
        </p>
        <div className="grid gap-4">
          {TRADE_SECRETS.map((secret, i) => (
            <Card key={i} className="bg-gray-900 border-yellow-500/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm mb-1">{secret.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{secret.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Actions */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Recommended Next Steps (V12 Updated)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            "File PAT-004 as a continuation-in-part of PAT-003 to capture the V12 zero-self-reporting payment architecture. Engage IP attorney immediately — the V12 system is live and public disclosure starts the 1-year USPTO clock.",
            "File provisional applications for PAT-001, PAT-002, and PAT-003 before any public launch or investor presentation. Provisional applications (~$1,500–$3,000 each) establish a priority date.",
            "Prepare a trade secret protection policy — document that PPS algorithm, AI prompts, valuation models, and the check-in-to-charge pipeline implementation are confidential and require NDA before disclosure.",
            "Include the V12 payment architecture infographic and this IP schedule in the data room for any M&A due diligence process.",
            "Consider filing a design patent for the two-track offer card UI (before/after transformation visualization) as a supplementary IP layer.",
          ].map((action, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                {i + 1}
              </span>
              <p className="text-sm text-gray-400 leading-relaxed">{action}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="text-xs text-gray-600 text-center pb-4">
        This document is confidential and intended solely for internal use, investor due diligence, and M&A purposes.
        Do not distribute without NDA. Last updated: V12 — {new Date().toLocaleDateString()}.
      </p>
    </div>
    </AdminLayout>
  );
}
