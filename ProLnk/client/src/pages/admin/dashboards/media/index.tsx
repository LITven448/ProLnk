import CompanyDashboard, { CompanyDashboardConfig } from "../CompanyDashboard";
import { D } from "@/components/DashboardShared";

const BASE = "/admin/media-dash";
const COLOR = "#FBB140";
const ACCENT = "#7928CA";

const AD_DATA = [8, 12, 10, 16, 22, 28, 31, 27, 34, 41, 48, 56];

function makeConfig(tab: CompanyDashboardConfig["tab"]): CompanyDashboardConfig {
  const configs: Record<string, Partial<CompanyDashboardConfig["metrics"]>> = {
    executive: {
      primary: [
        { label: "Ad Revenue (MTD)",   value: "$18K",  sub: "All media sources",     trend: 24.1 },
        { label: "Active Advertisers", value: "24",    sub: "Insurance + services",  trend: 12.4 },
        { label: "Impressions (MTD)",  value: "84K",   sub: "Across all placements", trend: 31.7 },
        { label: "Avg CPM",            value: "$14.20",sub: "Per 1,000 impressions", trend: 4.2  },
      ],
      donut: [
        { label: "Insurance",     value: 42, color: COLOR  },
        { label: "Home Services", value: 28, color: ACCENT },
        { label: "Real Estate",   value: 18, color: D.green },
        { label: "Other",         value: 12, color: D.muted },
      ],
      topItems: [
        { label: "Top Advertiser",   value: "Apex Insurance DFW",  color: COLOR  },
        { label: "Best Placement",   value: "Partner Dashboard",   color: ACCENT },
        { label: "Avg CTR",          value: "3.8%",                color: D.text },
        { label: "Renewal Rate",     value: "87%",                 color: D.green },
        { label: "ARR Projection",   value: "$216K",               color: D.amber },
      ],
      goals: [
        { label: "Monthly Revenue: $30K",  value: 18, max: 30,  color: COLOR  },
        { label: "Advertisers: 50",        value: 24, max: 50,  color: ACCENT },
        { label: "Impressions: 200K/mo",   value: 84, max: 200, color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "New advertiser: DFW Auto Insurance — $1,200/mo contract" },
        { time: "11:30 AM", type: "info",    message: "Ad campaign: Apex Insurance — 12,400 impressions this week" },
        { time: "11:00 AM", type: "success", message: "Renewal: State Farm DFW — 3-month contract renewed" },
        { time: "10:30 AM", type: "info",    message: "Real estate agent added: Keller Williams Frisco" },
      ],
    },
    operations: {
      primary: [
        { label: "Active Campaigns",  value: "18",   sub: "Running now",           trend: 12.4 },
        { label: "Avg Campaign ROI",  value: "4.2x", sub: "For advertisers",       trend: 8.7  },
        { label: "Ad Placements",     value: "6",    sub: "Across platform",       trend: 0    },
        { label: "Pending Approvals", value: "3",    sub: "New ad creatives",      trend: -25.0 },
      ],
      donut: [
        { label: "Active",   value: 75, color: D.green },
        { label: "Paused",   value: 15, color: D.amber },
        { label: "Pending",  value: 10, color: D.muted },
      ],
      topItems: [
        { label: "Best Placement",  value: "Partner Dashboard (3.8% CTR)", color: COLOR  },
        { label: "Worst Placement", value: "Email footer (0.4% CTR)",      color: D.red  },
        { label: "Avg Campaign",    value: "45 days",                      color: D.text },
      ],
      goals: [
        { label: "Active Campaigns: 30",  value: 18, max: 30, color: COLOR  },
        { label: "Avg CTR: 5%",           value: 3.8, max: 5, color: ACCENT },
        { label: "Zero Pending > 48h",    value: 3,  max: 0.1, color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "info",    message: "Campaign #C-18 launched: Apex Insurance — partner dashboard" },
        { time: "11:30 AM", type: "warning", message: "Ad creative pending review: DFW Auto Insurance — 36h" },
        { time: "11:00 AM", type: "success", message: "Campaign #C-14 performance: 4.8x ROI — renewed for 3 months" },
      ],
    },
    sales: {
      primary: [
        { label: "New Advertisers",   value: "4",    sub: "Signed this month",     trend: 33.3 },
        { label: "Pipeline Value",    value: "$84K", sub: "Open proposals",        trend: 22.4 },
        { label: "Close Rate",        value: "62%",  sub: "Proposal → contract",   trend: 8.7  },
        { label: "Avg Contract",      value: "$900", sub: "Per advertiser/month",  trend: 4.2  },
      ],
      donut: [
        { label: "Insurance",   value: 45, color: COLOR  },
        { label: "Real Estate", value: 30, color: ACCENT },
        { label: "Services",    value: 25, color: D.green },
      ],
      topItems: [
        { label: "Best Vertical",   value: "Insurance (45%)",  color: COLOR  },
        { label: "Avg Sales Cycle", value: "8.4 days",         color: D.text },
        { label: "Top Referral",    value: "ProLnk partners",  color: ACCENT },
      ],
      goals: [
        { label: "Monthly New: 8",     value: 4,  max: 8,   color: COLOR  },
        { label: "Pipeline: $200K",    value: 84, max: 200, color: ACCENT },
        { label: "Close Rate: 75%",    value: 62, max: 75,  color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "New contract: DFW Auto Insurance — $1,200/mo — 3 months" },
        { time: "11:30 AM", type: "info",    message: "Proposal sent: Keller Williams Frisco — $800/mo" },
        { time: "11:00 AM", type: "success", message: "Renewal: Apex Insurance — upgraded to premium placement" },
      ],
    },
    marketing: {
      primary: [
        { label: "Advertiser Waitlist", value: "38",   sub: "Pre-launch interest",   trend: 41.2 },
        { label: "Media Kit Downloads", value: "124",  sub: "This month",            trend: 28.4 },
        { label: "Outreach Sent",       value: "284",  sub: "To target advertisers", trend: 14.2 },
        { label: "Response Rate",       value: "22%",  sub: "Outreach → reply",      trend: 4.8  },
      ],
      donut: [
        { label: "Email",    value: 52, color: COLOR  },
        { label: "LinkedIn", value: 28, color: ACCENT },
        { label: "Referral", value: 20, color: D.green },
      ],
      topItems: [
        { label: "Best Channel",   value: "Email (52%)",     color: COLOR  },
        { label: "Best Subject",   value: "\"Your clients are on ProLnk\"", color: D.text },
        { label: "Avg Open Rate",  value: "34%",             color: ACCENT },
      ],
      goals: [
        { label: "Waitlist: 100 advertisers", value: 38,  max: 100, color: COLOR  },
        { label: "Response Rate: 30%",        value: 22,  max: 30,  color: ACCENT },
        { label: "Media Kit: 500 downloads",  value: 124, max: 500, color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "3 new advertiser waitlist signups — insurance vertical" },
        { time: "11:30 AM", type: "info",    message: "Outreach batch: 48 insurance agencies — 22% open rate" },
        { time: "11:00 AM", type: "success", message: "Media kit downloaded: Keller Williams Frisco" },
      ],
    },
    support: {
      primary: [
        { label: "Open Tickets",    value: "2",    sub: "Advertiser support",     trend: -33.3 },
        { label: "Avg Resolution",  value: "3.4h", sub: "Time to close",          trend: -8.2  },
        { label: "CSAT Score",      value: "4.7",  sub: "Advertiser satisfaction",trend: 1.4   },
        { label: "Escalations",     value: "0",    sub: "All resolved",           trend: -100  },
      ],
      donut: [
        { label: "Resolved",    value: 89, color: D.green },
        { label: "In Progress", value: 11, color: D.amber },
      ],
      topItems: [
        { label: "Top Issue",       value: "Creative approval (58%)", color: D.amber },
        { label: "Advertiser NPS",  value: "74",                      color: D.green },
        { label: "Churn Rate",      value: "13%",                     color: D.red   },
      ],
      goals: [
        { label: "CSAT: 5.0",       value: 4.7, max: 5,  color: D.green },
        { label: "Churn < 5%",      value: 13,  max: 5,  color: D.red   },
        { label: "Resolution < 2h", value: 3.4, max: 2,  color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "Ticket #T-24 resolved — creative approval — Apex Insurance" },
        { time: "11:00 AM", type: "info",    message: "Advertiser check-in: State Farm DFW — all campaigns healthy" },
      ],
    },
    financial: {
      primary: [
        { label: "Ad Revenue (MTD)",  value: "$18K",  sub: "All media sources",     trend: 24.1 },
        { label: "Avg Contract",      value: "$900",  sub: "Per advertiser/month",  trend: 4.2  },
        { label: "MRR",               value: "$21.6K",sub: "Recurring contracts",   trend: 12.4 },
        { label: "ARR Projection",    value: "$216K", sub: "Current trajectory",    trend: 22.1 },
      ],
      donut: [
        { label: "Premium Placement", value: 58, color: COLOR  },
        { label: "Standard",          value: 32, color: ACCENT },
        { label: "Email Inclusion",   value: 10, color: D.amber },
      ],
      topItems: [
        { label: "Top Revenue",     value: "Apex Insurance ($1,800/mo)", color: COLOR  },
        { label: "Net Margin",      value: "72%",                        color: D.green },
        { label: "Pending Invoices",value: "$3,600",                     color: D.amber },
        { label: "Renewal Rate",    value: "87%",                        color: ACCENT  },
      ],
      goals: [
        { label: "Monthly Revenue: $30K",  value: 18, max: 30,  color: COLOR  },
        { label: "MRR: $50K",              value: 21.6, max: 50, color: ACCENT },
        { label: "ARR: $600K",             value: 216, max: 600, color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "Invoice paid: DFW Auto Insurance — $1,200" },
        { time: "11:30 AM", type: "info",    message: "Renewal reminder sent: 4 contracts expiring in 30 days" },
        { time: "11:00 AM", type: "success", message: "New MRR record: $21,600 — up 24% from last month" },
      ],
    },
    agents: {
      primary: [
        { label: "Media Agent",     value: "34",   sub: "Actions today",         trend: 8.7  },
        { label: "Comms Agent",     value: "124",  sub: "Advertiser messages",   trend: 14.2 },
        { label: "Finance Agent",   value: "12",   sub: "Invoice automations",   trend: 4.2  },
        { label: "Success Rate",    value: "98.8%",sub: "All media agents",      trend: 0.2  },
      ],
      donut: [
        { label: "Comms Agent",    value: 124, color: D.teal   },
        { label: "Media Agent",    value: 34,  color: COLOR    },
        { label: "Finance Agent",  value: 12,  color: D.lime   },
      ],
      topItems: [
        { label: "Most Active",  value: "Comms Agent (124)",   color: D.teal  },
        { label: "Best Rate",    value: "Finance Agent (99%)", color: D.lime  },
        { label: "Needs Review", value: "None",                color: D.green },
      ],
      goals: [
        { label: "Daily Actions: 200",  value: 170, max: 200, color: COLOR   },
        { label: "Success Rate: 99%",   value: 98,  max: 99,  color: D.green },
        { label: "Invoice Automation",  value: 100, max: 100, color: D.lime  },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "[Media Agent] Campaign #C-18 performance report generated" },
        { time: "11:30 AM", type: "success", message: "[Comms Agent] 8 advertiser check-ins sent automatically" },
        { time: "11:00 AM", type: "success", message: "[Finance Agent] Invoice batch: $3,600 sent to 4 advertisers" },
      ],
    },
  };

  return {
    name: "ProLnk Media",
    tagline: "Hyper-targeted advertising inside the ProLnk partner network",
    color: COLOR,
    accentColor: ACCENT,
    basePath: BASE,
    tab,
    metrics: {
      revenueData: AD_DATA,
      ...configs[tab],
    } as CompanyDashboardConfig["metrics"],
  };
}

export function MediaExecutive()   { return <CompanyDashboard config={makeConfig("executive")}   />; }
export function MediaOperations()  { return <CompanyDashboard config={makeConfig("operations")}  />; }
export function MediaSales()       { return <CompanyDashboard config={makeConfig("sales")}       />; }
export function MediaMarketing()   { return <CompanyDashboard config={makeConfig("marketing")}   />; }
export function MediaSupport()     { return <CompanyDashboard config={makeConfig("support")}     />; }
export function MediaFinancial()   { return <CompanyDashboard config={makeConfig("financial")}   />; }
export function MediaAgents()      { return <CompanyDashboard config={makeConfig("agents")}      />; }
