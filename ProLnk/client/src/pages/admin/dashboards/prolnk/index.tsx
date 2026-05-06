/**
 * ProLnk Residential — 7 Company Dashboards
 * Each file is a thin wrapper around CompanyDashboard with ProLnk-specific data.
 */

import CompanyDashboard, { CompanyDashboardConfig } from "../CompanyDashboard";
import { D } from "@/components/DashboardShared";

const BASE = "/admin/prolnk";
const COLOR = "#17C1E8";
const ACCENT = "#82D616";

const REVENUE = [38, 52, 47, 63, 71, 85, 92, 86, 99, 114, 128, 147];

function makeConfig(tab: CompanyDashboardConfig["tab"]): CompanyDashboardConfig {
  const configs: Record<string, Partial<CompanyDashboardConfig["metrics"]>> = {
    executive: {
      primary: [
        { label: "Monthly Revenue",    value: "$147K",  sub: "All ProLnk sources",     trend: 12.4 },
        { label: "Active Partners",    value: "112",    sub: "Verified & active",       trend: 8.2  },
        { label: "Leads This Month",   value: "214",    sub: "Photo-detected opps",     trend: 18.7 },
        { label: "Avg Commission",     value: "$1,312", sub: "Per closed job",          trend: 3.1  },
      ],
      donut: [
        { label: "Roofing",     value: 42, color: COLOR  },
        { label: "HVAC",        value: 24, color: ACCENT },
        { label: "Plumbing",    value: 18, color: D.amber },
        { label: "Electrical",  value: 16, color: D.purple },
      ],
      topItems: [
        { label: "Top ZIP",          value: "75034 (Frisco)",   color: D.text  },
        { label: "Top Partner Tier", value: "Elite (38%)",      color: COLOR   },
        { label: "Avg Job Value",    value: "$8,400",           color: ACCENT  },
        { label: "Churn Rate",       value: "2.1%",             color: D.green },
        { label: "NPS Score",        value: "72",               color: D.cyan  },
        { label: "Waitlist Size",    value: "847",              color: D.amber },
      ],
      goals: [
        { label: "Q2 Revenue Target: $450K",  value: 147, max: 450, color: COLOR  },
        { label: "Partner Target: 200",        value: 112, max: 200, color: ACCENT },
        { label: "Lead Target: 1,000/mo",      value: 214, max: 1000, color: D.amber },
      ],
      activities: [
        { time: "12:02 PM", type: "success", message: "3 new partner applications approved — Frisco, Allen, Plano" },
        { time: "11:58 AM", type: "success", message: "Photo AI: 12 new opportunities detected in ZIP 75035" },
        { time: "11:30 AM", type: "info",    message: "Weekly digest sent to 112 partners — 94% open rate" },
        { time: "11:00 AM", type: "success", message: "Commission payout: $4,368 to Apex Roofing DFW" },
        { time: "10:30 AM", type: "warning", message: "Partner churn risk: DFW Plumbing Pro — no activity 14 days" },
      ],
    },
    operations: {
      primary: [
        { label: "Jobs In Progress",  value: "34",    sub: "Across all partners",   trend: 5.2  },
        { label: "Avg Job Duration",  value: "4.2d",  sub: "From lead to close",    trend: -8.1 },
        { label: "Photo Queue",       value: "127",   sub: "Pending AI analysis",   trend: 22.4 },
        { label: "Coverage ZIPs",     value: "89",    sub: "Active service areas",  trend: 6.7  },
      ],
      donut: [
        { label: "On Track",    value: 68, color: D.green  },
        { label: "At Risk",     value: 22, color: D.amber  },
        { label: "Delayed",     value: 10, color: D.red    },
      ],
      topItems: [
        { label: "Fastest Partner",   value: "Apex Roofing (1.8d)",  color: D.green },
        { label: "Slowest Avg",       value: "Landscaping (7.1d)",   color: D.amber },
        { label: "Photo Accuracy",    value: "97.8%",                color: COLOR   },
        { label: "Lead-to-Job Rate",  value: "68%",                  color: ACCENT  },
        { label: "Cancellation Rate", value: "4.2%",                 color: D.red   },
      ],
      goals: [
        { label: "Job Completion Rate: 95%",  value: 91, max: 95,  color: D.green },
        { label: "Photo Queue < 50",          value: 127, max: 200, color: D.amber },
        { label: "Coverage: 150 ZIPs",        value: 89, max: 150,  color: COLOR   },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "Job #4821 closed — Apex Roofing — $8,400 gross" },
        { time: "11:45 AM", type: "info",    message: "Photo batch: 34 photos processed — 9 opportunities" },
        { time: "11:30 AM", type: "warning", message: "Job #4819 delayed — partner unresponsive 48h" },
        { time: "11:00 AM", type: "success", message: "New ZIP added: 75078 (Prosper) — 2 partners assigned" },
      ],
    },
    sales: {
      primary: [
        { label: "New Partners (MTD)", value: "14",    sub: "Applications approved",  trend: 16.7 },
        { label: "Pipeline Value",     value: "$284K", sub: "Open opportunities",     trend: 9.3  },
        { label: "Conversion Rate",    value: "68%",   sub: "Lead → closed job",      trend: 2.4  },
        { label: "Avg Deal Size",      value: "$8,400",sub: "Per closed job",         trend: 3.1  },
      ],
      donut: [
        { label: "Elite",    value: 38, color: D.amber  },
        { label: "Pro",      value: 44, color: COLOR    },
        { label: "Starter",  value: 18, color: D.muted  },
      ],
      topItems: [
        { label: "Best Performing Tier", value: "Elite ($12.4K avg)", color: D.amber },
        { label: "Fastest Conversion",   value: "Roofing (2.1d)",     color: COLOR   },
        { label: "Top Referral Source",  value: "CompanyCam (34%)",   color: ACCENT  },
        { label: "Avg Sales Cycle",      value: "4.2 days",           color: D.text  },
      ],
      goals: [
        { label: "Monthly Partner Target: 20",  value: 14, max: 20,  color: COLOR  },
        { label: "Q2 Pipeline: $1M",            value: 284, max: 1000, color: ACCENT },
        { label: "Elite Tier Ratio: 50%",       value: 38, max: 50,  color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "New Elite partner approved: Apex Roofing DFW — ZIP 75034" },
        { time: "11:30 AM", type: "info",    message: "Lead #L-4821 matched to 3 partners — awaiting response" },
        { time: "11:00 AM", type: "success", message: "Tier upgrade: DFW Plumbing Pro → Elite (14 jobs this month)" },
        { time: "10:30 AM", type: "warning", message: "Application stalled: Texas HVAC Masters — missing insurance doc" },
      ],
    },
    marketing: {
      primary: [
        { label: "Waitlist Signups",  value: "847",   sub: "Total pre-launch",      trend: 24.1 },
        { label: "Email Open Rate",   value: "68%",   sub: "Weekly partner digest",  trend: 4.2  },
        { label: "Referral Traffic",  value: "1,240", sub: "Monthly site visitors",  trend: 31.7 },
        { label: "Brand Mentions",    value: "89",    sub: "Social + press",         trend: 12.3 },
      ],
      donut: [
        { label: "Organic",    value: 44, color: D.green  },
        { label: "Referral",   value: 28, color: COLOR    },
        { label: "Direct",     value: 18, color: D.amber  },
        { label: "Paid",       value: 10, color: D.purple },
      ],
      topItems: [
        { label: "Top Traffic Source",  value: "Google (44%)",      color: D.green },
        { label: "Best Email Campaign", value: "Storm Alert (82%)",  color: COLOR   },
        { label: "Top Waitlist ZIP",    value: "75034 (Frisco)",     color: ACCENT  },
        { label: "Avg Time on Site",    value: "3m 42s",             color: D.text  },
      ],
      goals: [
        { label: "Waitlist Target: 1,000",  value: 847, max: 1000, color: COLOR  },
        { label: "Email List: 500",         value: 312, max: 500,  color: ACCENT },
        { label: "Monthly Visitors: 5K",    value: 1240, max: 5000, color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "4 new waitlist signups — ZIP 75034, 75035" },
        { time: "11:30 AM", type: "info",    message: "Storm alert email sent — 847 recipients — 82% open rate" },
        { time: "11:00 AM", type: "success", message: "Google Business: 3 new reviews — avg 4.9 stars" },
        { time: "10:00 AM", type: "info",    message: "Weekly SEO report: +12% organic traffic vs last week" },
      ],
    },
    support: {
      primary: [
        { label: "Open Tickets",     value: "7",    sub: "Partner support",        trend: -14.3 },
        { label: "Avg Resolution",   value: "4.2h", sub: "Time to close",          trend: -8.7  },
        { label: "CSAT Score",       value: "4.8",  sub: "Out of 5.0",             trend: 1.2   },
        { label: "Escalations",      value: "2",    sub: "Requiring intervention", trend: -33.3 },
      ],
      donut: [
        { label: "Resolved",    value: 84, color: D.green  },
        { label: "In Progress", value: 12, color: D.amber  },
        { label: "Escalated",   value: 4,  color: D.red    },
      ],
      topItems: [
        { label: "Top Issue Type",   value: "Payout delay (38%)",  color: D.amber },
        { label: "Fastest Agent",    value: "Comms Agent (1.2h)",  color: D.green },
        { label: "Partner NPS",      value: "72",                  color: COLOR   },
        { label: "Dispute Rate",     value: "0.8%",                color: D.text  },
      ],
      goals: [
        { label: "CSAT Target: 4.9",      value: 4.8, max: 5,   color: D.green },
        { label: "Resolution < 2h",       value: 4.2, max: 24,  color: D.amber },
        { label: "Zero Escalations",      value: 2,   max: 0.1, color: D.red   },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "Ticket #T-284 resolved — payout delay — Apex Roofing" },
        { time: "11:30 AM", type: "warning", message: "Escalation #E-012: Partner dispute — $285 held" },
        { time: "11:00 AM", type: "success", message: "CSAT survey response: 5/5 — DFW Plumbing Pro" },
        { time: "10:30 AM", type: "info",    message: "Comms Agent: 8 partner check-ins sent automatically" },
      ],
    },
    financial: {
      primary: [
        { label: "Monthly Revenue",  value: "$147K",  sub: "All sources",           trend: 12.4 },
        { label: "Partner Payouts",  value: "$98K",   sub: "To 112 partners",       trend: 12.6 },
        { label: "Net Margin",       value: "33.3%",  sub: "After payouts",         trend: -0.8 },
        { label: "ARR Projection",   value: "$1.76M", sub: "Current trajectory",    trend: 18.2 },
      ],
      donut: [
        { label: "Commissions",  value: 89, color: D.green  },
        { label: "Subscriptions",value: 34, color: COLOR    },
        { label: "Media",        value: 18, color: D.amber  },
        { label: "Other",        value: 6,  color: D.purple },
      ],
      topItems: [
        { label: "Highest Payout",   value: "Apex Roofing ($4,368)", color: D.green },
        { label: "Avg Commission",   value: "8.2%",                  color: COLOR   },
        { label: "MRR",              value: "$34,000",               color: ACCENT  },
        { label: "Pending Payouts",  value: "$12,400",               color: D.amber },
      ],
      goals: [
        { label: "Q2 Revenue: $450K",  value: 147, max: 450, color: D.green },
        { label: "Margin Target: 40%", value: 33,  max: 40,  color: COLOR   },
        { label: "ARR Target: $2M",    value: 1760, max: 2000, color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "Payout batch: $4,368 to Apex Roofing — confirmed" },
        { time: "11:30 AM", type: "success", message: "Commission: Job #4821 — $8,400 gross, $689 commission" },
        { time: "11:00 AM", type: "warning", message: "Dispute #D-012: $285 held pending resolution" },
        { time: "10:30 AM", type: "success", message: "Subscription renewal: 8 Pro partners — $2,424 MRR" },
      ],
    },
    agents: {
      primary: [
        { label: "Actions Today",   value: "1,951", sub: "All ProLnk agents",      trend: 14.2 },
        { label: "Success Rate",    value: "98.1%", sub: "All agents combined",    trend: 0.4  },
        { label: "Active Agents",   value: "8 / 8", sub: "All systems nominal",    trend: 0    },
        { label: "Auto/Hour",       value: "~142",  sub: "Peak: 214 at 11 AM",     trend: 8.7  },
      ],
      donut: [
        { label: "Orchestrator",  value: 847, color: D.cyan   },
        { label: "Photo AI",      value: 284, color: D.purple },
        { label: "Lead Router",   value: 214, color: D.green  },
        { label: "Comms Agent",   value: 412, color: D.teal   },
      ],
      topItems: [
        { label: "Most Active",   value: "Orchestrator (847)",  color: D.cyan   },
        { label: "Best Rate",     value: "Finance Agent (99.8%)", color: D.green },
        { label: "Needs Review",  value: "TrustyPro Agent",      color: D.amber  },
      ],
      goals: [
        { label: "Daily Actions: 2,000",  value: 1951, max: 2000, color: D.cyan  },
        { label: "Success Rate: 99%",     value: 98,   max: 99,   color: D.green },
        { label: "Agent Coverage: 100%",  value: 100,  max: 100,  color: D.amber },
      ],
      activities: [
        { time: "12:02 PM", type: "success", message: "[Orchestrator] Routed 3 leads to Lead Router" },
        { time: "11:58 AM", type: "success", message: "[Photo AI] 12 photos processed — 9 opportunities" },
        { time: "11:45 AM", type: "success", message: "[Lead Router] 7 leads matched — avg response 4.2 min" },
        { time: "11:30 AM", type: "info",    message: "[Comms Agent] Weekly digest sent to 112 partners" },
        { time: "11:00 AM", type: "success", message: "[Finance Agent] Payout batch: $2,140 to 6 partners" },
      ],
    },
  };

  return {
    name: "ProLnk Residential",
    tagline: "Photo-to-referral network for home service professionals",
    color: COLOR,
    accentColor: ACCENT,
    basePath: BASE,
    tab,
    metrics: {
      revenueData: REVENUE,
      ...configs[tab],
    } as CompanyDashboardConfig["metrics"],
  };
}

export function ProLnkExecutive()   { return <CompanyDashboard config={makeConfig("executive")}   />; }
export function ProLnkOperations()  { return <CompanyDashboard config={makeConfig("operations")}  />; }
export function ProLnkSales()       { return <CompanyDashboard config={makeConfig("sales")}       />; }
export function ProLnkMarketing()   { return <CompanyDashboard config={makeConfig("marketing")}   />; }
export function ProLnkSupport()     { return <CompanyDashboard config={makeConfig("support")}     />; }
export function ProLnkFinancial()   { return <CompanyDashboard config={makeConfig("financial")}   />; }
export function ProLnkAgents()      { return <CompanyDashboard config={makeConfig("agents")}      />; }
