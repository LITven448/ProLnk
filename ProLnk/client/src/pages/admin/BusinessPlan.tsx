import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText, Download, ChevronDown, ChevronRight,
  TrendingUp, Users, DollarSign, Target, Globe,
  Shield, Zap, BarChart3, Building2, Lightbulb
} from "lucide-react";

const SECTIONS = [
  {
    id: "executive",
    icon: Lightbulb,
    title: "Executive Summary",
    color: "text-teal-400",
    content: `ProLnk is an AI-powered home service partner network that transforms every completed service job into a qualified lead for adjacent trades. When a lawn care technician finishes a yard, ProLnk's AI analyzes job photos to detect roofing damage, pest evidence, HVAC issues, and 50+ other service opportunities — then automatically routes those leads to vetted partner contractors in the same neighborhood.

**The Problem:** Home service contractors spend 15-30% of revenue on marketing with declining ROI. Homeowners struggle to find trusted professionals for secondary needs discovered during routine service visits. The referral economy is broken — it relies on memory, business cards, and goodwill.

**The Solution:** ProLnk creates a closed-loop referral network where every job generates compounding leads. Partners earn 5% commission on referred jobs they close. ProLnk earns 10-15% on every transaction. The AI does the prospecting — partners just show up and close.

**Traction:** Launching in DFW with 151 vetted partners across 53 service categories. Platform is fully built with Field OS mobile app, AI opportunity detection, automated deal delivery, and Stripe commission payouts.

**Ask:** Seeking $500K seed round to fund DFW market saturation (500 partners), first 3 market expansions (Houston, Austin, San Antonio), and sales team hiring.`,
  },
  {
    id: "problem",
    icon: Target,
    title: "Problem & Opportunity",
    color: "text-red-400",
    content: `**The $600B Home Services Market is Fragmented and Inefficient**

The U.S. home services market generates $600B annually, yet the referral infrastructure connecting trades is stuck in 1995. Three compounding problems create the opportunity:

**1. The Marketing Treadmill**
The average home service contractor spends $8,000-$25,000/year on Google Ads, Yelp, and Angi leads — with conversion rates below 3%. As competition increases, CPL rises. Partners are trapped paying more for less.

**2. The Invisible Opportunity**
Every service visit surfaces 3-7 adjacent needs the homeowner doesn't know they have. A lawn care tech sees the cracked driveway, the rotting fascia board, the wasp nest under the eave — but has no system to monetize that observation. That intelligence evaporates.

**3. The Trust Deficit**
Homeowners don't trust cold referrals from strangers. They trust their existing service provider. When a vetted partner says "I noticed your gutters need attention — I know a great company," that warm referral converts at 40%+ vs. 3% for cold leads.

**Market Size:**
- TAM: $600B U.S. home services market
- SAM: $45B referral-addressable segment (contractors who use referral networks)
- SOM (Year 3): $12M ARR from 3,000 partners across 10 markets`,
  },
  {
    id: "solution",
    icon: Zap,
    title: "Solution & Product",
    color: "text-yellow-400",
    content: `**ProLnk: The AI Referral OS for Home Service Professionals**

ProLnk is a three-sided platform connecting partners, homeowners, and the AI detection layer:

**Field OS (Partner App)**
A mobile-first PWA where technicians log jobs, upload photos, and receive AI-detected opportunity alerts. The app includes: job logging with GPS, photo upload with AI analysis, real-time lead notifications, earnings tracker, and a leaderboard for gamified engagement.

**AI Opportunity Engine**
Proprietary computer vision + LLM pipeline that analyzes job photos to detect:
- Structural issues (roofing, foundation, siding)
- Mechanical systems (HVAC, plumbing, electrical)
- Landscaping and exterior needs
- Pest and wildlife indicators
- Safety hazards

Each detection generates a confidence score, estimated job value, and a matched partner recommendation from the local network.

**Customer Deal Page**
A no-login mobile page sent to homeowners via SMS/email. Shows the AI-detected issue with before/after photo evidence, a vetted partner's profile and reviews, transparent pricing estimate, and a one-tap scheduling CTA. Expires in 72 hours to create urgency.

**Partner NetworkOS (Admin)**
Full command center for managing the partner network: deal pipeline kanban, commission payouts, partner compliance (strikes, suspensions), analytics, broadcast messaging, and market expansion planning.

**TrustyPro (Homeowner Portal)**
Public-facing homeowner portal where residents can upload photos for AI analysis, browse the partner directory, and manage their property's service history.`,
  },
  {
    id: "business-model",
    icon: DollarSign,
    title: "Business Model",
    color: "text-green-400",
    content: `**Revenue Streams**

**1. Transaction Commissions (Primary — 80% of revenue)**
ProLnk earns 10-15% on every job closed through the platform. Partners earn 5% on jobs they refer. The net spread (5-10%) is ProLnk's margin.

Example: A $2,400 HVAC replacement referred by a lawn care partner generates:
- Partner commission: $120 (5%)
- ProLnk revenue: $240-360 (10-15%)
- Total platform take: $360-480

**2. Partner Subscriptions (Secondary — 15% of revenue)**
Monthly SaaS fee for access to Field OS, lead routing, and analytics:
- Scout (Free): Basic job logging, limited leads
- Pro ($49/mo): Full Field OS, priority lead routing, analytics
- Elite ($99/mo): Dedicated account manager, co-branded marketing, top routing priority
- Enterprise ($299/mo): Multi-crew, API access, custom integrations

**3. Premium Placement (Tertiary — 5% of revenue)**
Partners can pay for featured placement in the partner directory and priority routing for new leads in their category.

**Unit Economics:**
- Average job value: $1,200
- ProLnk take rate: 12% = $144/job
- Partner LTV (Year 1): 18 referred jobs × $144 = $2,592 revenue/partner
- Partner CAC: $180 (onboarding + marketing)
- LTV:CAC ratio: 14.4:1

**Year 3 Revenue Projection:**
- 3,000 active partners × 18 jobs/year × $144/job = $7.8M transaction revenue
- 1,500 Pro/Elite subscriptions × $74/mo avg × 12 = $1.3M subscription revenue
- **Total: $9.1M ARR**`,
  },
  {
    id: "market",
    icon: Globe,
    title: "Market Strategy",
    color: "text-blue-400",
    content: `**Go-To-Market: The DFW Beachhead**

DFW is the ideal launch market: 7.8M population, 2.9M housing units, 85°F+ summers driving HVAC/lawn/pool demand, and a fragmented contractor market with no dominant referral network.

**Phase 1: DFW Saturation (Months 1-12)**
- Target: 500 active partners across all 53 service categories
- Strategy: Direct outreach to top-rated Yelp/Google contractors in each category
- Activation: Free 90-day Pro trial, co-branded marketing kit, onboarding support
- KPI: 500 partners, 5,000 jobs logged, $500K in referred job value

**Phase 2: Texas Expansion (Months 13-24)**
- Markets: Houston, Austin, San Antonio
- Strategy: Hire 1 market manager per city, replicate DFW playbook
- Target: 1,500 total partners, $2M ARR

**Phase 3: National Rollout (Months 25-36)**
- Markets: Phoenix, Atlanta, Denver, Nashville, Charlotte
- Strategy: Partner with regional contractor associations, FSM platforms (Jobber, HCP)
- Target: 5,000 partners, $9M ARR

**Partner Acquisition Channels:**
1. Direct outreach (LinkedIn, Google Maps scraping)
2. FSM platform integrations (Jobber, HCP, ServiceTitan webhooks)
3. Contractor association partnerships
4. Referral from existing partners (partner-refers-partner program)
5. CompanyCam integration (photo upload triggers ProLnk onboarding)`,
  },
  {
    id: "competition",
    icon: Shield,
    title: "Competitive Analysis",
    color: "text-purple-400",
    content: `**Competitive Landscape**

| Platform | Model | Weakness | ProLnk Advantage |
|----------|-------|----------|-----------------|
| Angi/HomeAdvisor | Pay-per-lead marketplace | Cold leads, low conversion, expensive | Warm referrals from trusted partners |
| Thumbtack | Bidding marketplace | Race to bottom on price | Fixed commission, no bidding |
| Jobber | FSM software | No referral network | Integrates with Jobber, adds referral layer |
| Yelp | Review platform | No active referral mechanism | AI-detected opportunities, not passive reviews |
| Neighborly | Franchise network | Franchise model, slow expansion | Asset-light, any contractor can join |

**Defensible Moats:**

1. **Network Effects:** Each new partner makes the network more valuable for all others. A new electrician benefits every HVAC, plumbing, and roofing partner already on the platform.

2. **AI Training Data:** Every job photo improves the detection model. After 500K photos, the model becomes a proprietary asset that competitors cannot replicate.

3. **Partner Lock-In:** Partners who earn $2,000+/month in commissions have no incentive to leave. The earnings history, reviews, and tier status are not portable.

4. **FSM Integration Depth:** Deep Jobber/HCP/ServiceTitan integrations mean job data flows automatically — no manual logging required for integrated partners.`,
  },
  {
    id: "team",
    icon: Users,
    title: "Team",
    color: "text-orange-400",
    content: `**Founding Team**

**Andrew Duke — Founder & CEO**
Serial entrepreneur with 10+ years in home services. Founded multiple home service companies, DukeOS (franchise operating system), and ProLnk. Deep domain expertise in contractor operations, franchise development, and field service management. Personally manages 150+ partner relationships in DFW.

**Advisory Board (Forming)**
- Operations Advisor: Former VP Operations at ServiceMaster
- Technology Advisor: ML engineer from Google Maps
- Finance Advisor: PE-backed home services operator
- Legal Advisor: IP attorney specializing in platform businesses

**Key Hires (Post-Seed)**
- CTO: Full-stack engineer with FSM integration experience
- Head of Partner Success: 5 years at Jobber or HCP
- Market Manager (DFW): Local contractor network relationships
- AI/ML Engineer: Computer vision for opportunity detection`,
  },
  {
    id: "financials",
    icon: BarChart3,
    title: "Financial Projections",
    color: "text-teal-400",
    content: `**5-Year Financial Model**

| Metric | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|--------|--------|--------|--------|--------|--------|
| Active Partners | 500 | 1,500 | 3,000 | 5,000 | 8,000 |
| Jobs Logged | 9,000 | 27,000 | 54,000 | 90,000 | 144,000 |
| Referred Jobs Closed | 1,800 | 5,400 | 10,800 | 18,000 | 28,800 |
| Avg Job Value | $1,200 | $1,250 | $1,300 | $1,350 | $1,400 |
| Transaction Revenue | $259K | $810K | $1.7M | $2.9M | $4.8M |
| Subscription Revenue | $74K | $333K | $1.3M | $2.7M | $5.2M |
| **Total Revenue** | **$333K** | **$1.1M** | **$3.0M** | **$5.6M** | **$10.0M** |
| Gross Margin | 72% | 75% | 78% | 80% | 82% |
| EBITDA | -$420K | -$180K | $540K | $1.7M | $4.2M |

**Key Assumptions:**
- Partner churn: 15%/year (industry standard for SaaS)
- Referral conversion rate: 20% (conservative; warm referrals typically 35-45%)
- Average jobs logged per partner per month: 1.5
- Take rate: 12% blended (10% transaction + 2% subscription equivalent)

**Funding Use ($500K Seed):**
- Product & Engineering (30%): $150K — AI model improvements, mobile app, integrations
- Sales & Marketing (40%): $200K — Partner acquisition in DFW, brand marketing
- Operations (20%): $100K — Partner success team, onboarding infrastructure
- G&A (10%): $50K — Legal, accounting, insurance`,
  },
  {
    id: "technology",
    icon: Building2,
    title: "Technology Stack",
    color: "text-cyan-400",
    content: `**Technology Architecture**

ProLnk is built on a modern, scalable stack designed for rapid iteration and enterprise reliability:

**Frontend**
- React 19 + TypeScript + Tailwind CSS 4
- tRPC for end-to-end type-safe API layer
- Vite for sub-second HMR development
- PWA with service worker for offline Field OS support
- Google Maps integration via Manus proxy (no API key required)

**Backend**
- Node.js + Express 4 + tRPC 11
- TiDB (MySQL-compatible distributed SQL) for horizontal scaling
- Drizzle ORM for type-safe database queries
- Manus OAuth for partner/admin authentication
- Stripe Connect for automated commission payouts

**AI Pipeline**
- Photo upload → S3 storage → LLM vision analysis
- Structured JSON output with issue type, confidence score, estimated value
- Automated deal generation and partner matching
- n8n workflow automation for email/SMS sequences

**Integrations**
- Jobber webhook receiver (job completion events)
- Housecall Pro API sync
- ServiceTitan integration stub
- CompanyCam photo import
- Stripe Connect (partner bank accounts + automated payouts)
- Twilio SMS (deal delivery + reminders)

**Security & Compliance**
- JWT session cookies (httpOnly, secure, sameSite)
- Stripe PCI-DSS Level 1 compliance
- SSL/TLS on all endpoints
- CCPA-compliant data handling
- SOC 2 Type II (roadmap)`,
  },
  {
    id: "ip",
    icon: Shield,
    title: "IP & Patent Strategy",
    color: "text-indigo-400",
    content: `**Intellectual Property**

ProLnk's core innovation — the AI-powered photo analysis → lead generation → partner routing pipeline — is a patentable business method and system.

**Patent Application (In Preparation)**
Title: "System and Method for AI-Powered Cross-Trade Referral Generation from Field Service Job Documentation"

Claims:
1. A computer-implemented method for generating service referrals from job site photographs using machine learning object detection
2. A system for routing detected service opportunities to geographically proximate vetted service providers based on specialty matching and performance scoring
3. A homeowner deal delivery system with time-limited acceptance windows and partner commission tracking

**Trade Secrets**
- Partner Priority Score (PPS) algorithm: 8-factor weighted scoring model for partner routing
- AI confidence calibration model trained on 500K+ home service photos
- Cross-trade referral conversion optimization model

**Brand IP**
- ProLnk® trademark (application filed)
- TrustyPro® trademark (application filed)
- Field OS™ brand
- ProLnk Exchange™ (commercial platform)

**Defensive Strategy**
- Publish provisional patent before seed announcement
- File continuation patents as AI model improves
- License IP to FSM platforms (Jobber, HCP) as B2B revenue stream`,
  },
  {
    id: "risks",
    icon: Target,
    title: "Risk Analysis",
    color: "text-red-400",
    content: `**Key Risks & Mitigations**

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Partner churn before network effects kick in | Medium | High | 90-day free trial, co-branded marketing, earnings guarantee |
| AI false positives erode homeowner trust | Medium | High | Confidence threshold >75% required to generate deal, human review queue |
| Large FSM platform (Jobber) builds competing feature | Low | High | Deep integration makes ProLnk additive, not competitive; patent protection |
| Commission circumvention (partners go direct) | Medium | Medium | Stripe Connect with job verification, partner agreement with clawback clause |
| Regulatory (contractor licensing verification) | Low | Medium | Automated license/COI verification via third-party APIs |
| Homeowner privacy concerns (photo analysis) | Low | Medium | Explicit consent in TOS, photos stored with AES-256 encryption, no PII in AI pipeline |

**Scenario Analysis:**
- **Bear Case:** 200 partners, 15% conversion rate → $180K ARR Year 1, extend runway with subscription revenue
- **Base Case:** 500 partners, 20% conversion rate → $333K ARR Year 1, raise Series A at $5M ARR
- **Bull Case:** 800 partners, 30% conversion rate → $600K ARR Year 1, accelerate to 5 markets by Month 18`,
  },
  {
    id: "ask",
    icon: TrendingUp,
    title: "The Ask",
    color: "text-green-400",
    content: `**Seed Round: $500,000**

ProLnk is raising a $500K seed round to fund DFW market saturation and the first 3 Texas market expansions.

**Use of Funds:**
- **Partner Acquisition (40% — $200K):** Outbound sales team (2 FTEs), co-branded marketing kits, partner incentive program
- **Product & AI (30% — $150K):** AI model improvements, Jobber/HCP deep integrations, mobile app polish
- **Operations (20% — $100K):** Partner success manager, onboarding infrastructure, legal/compliance
- **G&A (10% — $50K):** Accounting, insurance, IP filing

**Milestones (18 months):**
- Month 6: 500 active DFW partners, $50K MRR
- Month 12: Houston + Austin launch, 1,200 total partners, $120K MRR
- Month 18: San Antonio launch, 2,000 partners, $250K MRR → Series A ready

**Terms:**
- $500K SAFE note
- $4M pre-money valuation cap
- 20% discount on Series A

**Why Now:**
The FSM software market is maturing — Jobber, HCP, and ServiceTitan have captured the workflow layer. The referral network layer remains unbuilt. ProLnk is 18 months ahead of any potential competitor, with a working product, 151 vetted partners, and a patent-pending AI pipeline.

**Contact:** Andrew Duke | andrew@prolnk.com`,
  },
];

export default function BusinessPlan() {
  const [expanded, setExpanded] = useState<string>("executive");

  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-teal-400" />
              ProLnk Business Plan
            </h1>
            <p className="text-slate-400 text-sm mt-1">Confidential — For Investor Review Only</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">Seed Stage</Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">$500K Ask</Badge>
            <Button
              onClick={handlePrint}
              className="bg-teal-600 hover:bg-teal-700 text-white gap-2"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Market Size", value: "$600B", sub: "U.S. Home Services" },
            { label: "Year 3 ARR", value: "$3.0M", sub: "Base Case" },
            { label: "LTV:CAC", value: "14.4×", sub: "Unit Economics" },
            { label: "Seed Ask", value: "$500K", sub: "$4M Cap SAFE" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-teal-400">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {SECTIONS.map((section, idx) => {
            const Icon = section.icon;
            const isOpen = expanded === section.id;
            return (
              <Card key={section.id} className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/30 transition-colors"
                  onClick={() => setExpanded(isOpen ? "" : section.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-sm font-mono w-6">{String(idx + 1).padStart(2, "0")}</span>
                    <Icon className={`w-5 h-5 ${section.color}`} />
                    <span className="font-semibold text-white">{section.title}</span>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {isOpen && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="border-t border-slate-700 pt-4">
                      <div className="prose prose-invert prose-sm max-w-none">
                        {section.content.split("\n\n").map((para, i) => {
                          if (para.startsWith("| ")) {
                            // Simple table rendering
                            const rows = para.split("\n").filter(r => r.startsWith("|"));
                            return (
                              <div key={i} className="overflow-x-auto my-4">
                                <table className="w-full text-sm border-collapse">
                                  {rows.map((row, ri) => {
                                    const cells = row.split("|").filter(c => c.trim());
                                    if (ri === 1) return null; // separator row
                                    return (
                                      <tr key={ri} className={ri === 0 ? "border-b border-slate-600" : "border-b border-slate-700/50"}>
                                        {cells.map((cell, ci) => (
                                          ri === 0
                                            ? <th key={ci} className="text-left px-3 py-2 text-slate-300 font-semibold">{cell.trim()}</th>
                                            : <td key={ci} className="px-3 py-2 text-slate-400">{cell.trim()}</td>
                                        ))}
                                      </tr>
                                    );
                                  })}
                                </table>
                              </div>
                            );
                          }
                          return (
                            <p key={i} className="text-slate-300 leading-relaxed mb-3"
                              dangerouslySetInnerHTML={{
                                __html: para
                                  .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700 text-center">
          <p className="text-slate-500 text-xs">
            This document contains confidential and proprietary information of ProLnk Inc.
            Unauthorized disclosure is prohibited. © 2026 ProLnk Inc. All rights reserved.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
