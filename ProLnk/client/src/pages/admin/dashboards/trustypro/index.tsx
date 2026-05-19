import CompanyDashboard, { CompanyDashboardConfig } from "../CompanyDashboard";
import { D } from "@/components/DashboardShared";

const BASE = "/admin/tp";
const COLOR = "#82D616";
const ACCENT = "#17C1E8";

const SCAN_DATA = [12, 18, 14, 24, 31, 42, 38, 47, 52, 61, 74, 89];

function makeConfig(tab: CompanyDashboardConfig["tab"]): CompanyDashboardConfig {
  const configs: Record<string, Partial<CompanyDashboardConfig["metrics"]>> = {
    executive: {
      primary: [
        { label: "Homeowners Scanned",  value: "512",   sub: "Total Home Health scans",  trend: 22.4 },
        { label: "Issues Detected",     value: "1,847", sub: "Across all properties",    trend: 18.7 },
        { label: "Pros Matched",        value: "284",   sub: "Homeowner → Pro matches",  trend: 14.2 },
        { label: "Avg Issues/Home",     value: "3.6",   sub: "Identified per scan",      trend: 2.1  },
      ],
      donut: [
        { label: "Roofing",      value: 34, color: COLOR  },
        { label: "HVAC",         value: 22, color: ACCENT },
        { label: "Plumbing",     value: 18, color: D.amber },
        { label: "Electrical",   value: 14, color: D.purple },
        { label: "Other",        value: 12, color: D.muted },
      ],
      topItems: [
        { label: "Top Issue Category",  value: "Roof wear (34%)",   color: COLOR  },
        { label: "Avg Scan Time",       value: "8.4 minutes",       color: D.text },
        { label: "Scan Accuracy",       value: "95.4%",             color: ACCENT },
        { label: "Homeowner NPS",       value: "81",                color: D.green },
        { label: "Waitlist Size",       value: "423 homeowners",    color: D.amber },
      ],
      goals: [
        { label: "Scan Target: 1,000 homes",    value: 512, max: 1000, color: COLOR  },
        { label: "Match Rate: 80%",             value: 55,  max: 80,   color: ACCENT },
        { label: "Issues/Home Target: 5",       value: 3.6, max: 5,    color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "4 new homeowner scans processed — ZIP 75034" },
        { time: "11:45 AM", type: "success", message: "Roof wear detected: 2 properties — Frisco — matched to Apex Roofing" },
        { time: "11:30 AM", type: "info",    message: "Home Health Vault updated: 12 new records added" },
        { time: "11:00 AM", type: "success", message: "Homeowner onboarded: 5-room scan complete — 4 issues found" },
        { time: "10:30 AM", type: "warning", message: "Photo quality alert: 2 photos too dark — homeowner notified" },
      ],
    },
    operations: {
      primary: [
        { label: "Scans In Queue",    value: "34",  sub: "Pending AI analysis",    trend: 12.4 },
        { label: "Avg Analysis Time", value: "2.1m",sub: "Per photo batch",        trend: -8.2 },
        { label: "Vault Records",     value: "512", sub: "Home Health profiles",   trend: 22.4 },
        { label: "Photo Quality",     value: "94%", sub: "Usable for analysis",    trend: 1.8  },
      ],
      donut: [
        { label: "Processed",  value: 78, color: D.green },
        { label: "In Queue",   value: 16, color: D.amber },
        { label: "Failed",     value: 6,  color: D.red   },
      ],
      topItems: [
        { label: "Fastest Scan",      value: "3-room (4.2 min)",    color: D.green },
        { label: "Most Common Issue", value: "Roof wear",           color: COLOR   },
        { label: "Retry Rate",        value: "6.2%",                color: D.amber },
      ],
      goals: [
        { label: "Queue < 20 scans",    value: 34, max: 20,  color: D.amber },
        { label: "Photo Quality: 98%",  value: 94, max: 98,  color: D.green },
        { label: "Vault: 1,000 homes",  value: 512, max: 1000, color: COLOR  },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "Batch #B-284: 8 photos analyzed — 3 issues flagged" },
        { time: "11:30 AM", type: "info",    message: "Vault sync: 12 new Home Health records written" },
        { time: "11:00 AM", type: "warning", message: "Photo retry: 2 dark photos — homeowner re-upload requested" },
        { time: "10:30 AM", type: "success", message: "AI model: roof wear detection accuracy improved to 96.2%" },
      ],
    },
    sales: {
      primary: [
        { label: "New Homeowners",   value: "89",   sub: "Signed up this month",   trend: 31.4 },
        { label: "Scan Conversion",  value: "72%",  sub: "Signup → completed scan",trend: 4.2  },
        { label: "Pro Matches",      value: "284",  sub: "Homeowner → Pro",        trend: 14.2 },
        { label: "Revenue/Scan",     value: "$28",  sub: "Avg per homeowner scan", trend: 8.7  },
      ],
      donut: [
        { label: "Organic",   value: 52, color: D.green  },
        { label: "Referral",  value: 31, color: COLOR    },
        { label: "ProLnk",    value: 17, color: ACCENT   },
      ],
      topItems: [
        { label: "Top Acquisition",  value: "ProLnk referral (31%)", color: ACCENT },
        { label: "Best ZIP",         value: "75034 Frisco",          color: COLOR  },
        { label: "Avg LTV",          value: "$340/homeowner",        color: D.text },
      ],
      goals: [
        { label: "Monthly Signups: 150",  value: 89,  max: 150, color: COLOR  },
        { label: "Conversion: 80%",       value: 72,  max: 80,  color: ACCENT },
        { label: "Pro Matches: 500/mo",   value: 284, max: 500, color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "4 new homeowner signups — ZIP 75034, 75035" },
        { time: "11:30 AM", type: "success", message: "Scan completed: 5-room home — 4 issues → 3 pro matches" },
        { time: "11:00 AM", type: "info",    message: "Referral: 2 homeowners from ProLnk partner Apex Roofing" },
      ],
    },
    marketing: {
      primary: [
        { label: "Waitlist Signups",  value: "423",  sub: "Homeowners pre-launch",  trend: 28.4 },
        { label: "Email Open Rate",   value: "71%",  sub: "Homeowner emails",       trend: 6.2  },
        { label: "Social Reach",      value: "8.4K", sub: "Monthly impressions",    trend: 22.1 },
        { label: "Brand Mentions",    value: "47",   sub: "Social + press",         trend: 14.3 },
      ],
      donut: [
        { label: "Organic",   value: 48, color: D.green  },
        { label: "ProLnk",    value: 32, color: COLOR    },
        { label: "Paid",      value: 12, color: D.amber  },
        { label: "Referral",  value: 8,  color: D.purple },
      ],
      topItems: [
        { label: "Best Campaign",  value: "Home Health Vault launch",  color: COLOR  },
        { label: "Top ZIP",        value: "75034 Frisco",              color: ACCENT },
        { label: "Avg CTR",        value: "4.8%",                     color: D.text },
      ],
      goals: [
        { label: "Waitlist: 1,000",   value: 423, max: 1000, color: COLOR  },
        { label: "Social: 20K reach", value: 8400, max: 20000, color: ACCENT },
        { label: "Email List: 500",   value: 312, max: 500,  color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "4 new homeowner waitlist signups" },
        { time: "11:30 AM", type: "info",    message: "Home Health Vault email: 423 recipients — 71% open rate" },
        { time: "11:00 AM", type: "success", message: "Instagram post: 1,240 impressions — 89 saves" },
      ],
    },
    support: {
      primary: [
        { label: "Open Tickets",    value: "4",    sub: "Homeowner support",      trend: -25.0 },
        { label: "Avg Resolution",  value: "2.8h", sub: "Time to close",          trend: -12.4 },
        { label: "CSAT Score",      value: "4.9",  sub: "Out of 5.0",             trend: 2.1   },
        { label: "Escalations",     value: "0",    sub: "All resolved",           trend: -100  },
      ],
      donut: [
        { label: "Resolved",    value: 92, color: D.green },
        { label: "In Progress", value: 8,  color: D.amber },
      ],
      topItems: [
        { label: "Top Issue",      value: "Photo quality (42%)",  color: D.amber },
        { label: "Homeowner NPS",  value: "81",                   color: D.green },
        { label: "Retry Rate",     value: "6.2%",                 color: COLOR   },
      ],
      goals: [
        { label: "CSAT: 5.0",       value: 4.9, max: 5,  color: D.green },
        { label: "Resolution < 2h", value: 2.8, max: 2,  color: D.amber },
        { label: "Zero Escalations",value: 0,   max: 0.1, color: D.green },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "Ticket #T-112 resolved — photo upload issue — homeowner satisfied" },
        { time: "11:00 AM", type: "success", message: "CSAT: 5/5 from homeowner in ZIP 75034" },
        { time: "10:30 AM", type: "info",    message: "FAQ updated: photo quality tips added to onboarding flow" },
      ],
    },
    financial: {
      primary: [
        { label: "Monthly Revenue",  value: "$24K",  sub: "TrustyPro sources",     trend: 28.4 },
        { label: "Revenue/Scan",     value: "$28",   sub: "Avg per homeowner",     trend: 8.7  },
        { label: "Pro Match Fees",   value: "$8.4K", sub: "Referral commissions",  trend: 14.2 },
        { label: "ARR Projection",   value: "$288K", sub: "Current trajectory",    trend: 22.1 },
      ],
      donut: [
        { label: "Scan Fees",   value: 58, color: COLOR  },
        { label: "Match Fees",  value: 35, color: ACCENT },
        { label: "Vault Subs",  value: 7,  color: D.amber },
      ],
      topItems: [
        { label: "MRR",              value: "$24,000",  color: D.green },
        { label: "Net Margin",       value: "41%",      color: COLOR   },
        { label: "CAC",              value: "$12/user", color: D.text  },
        { label: "LTV",              value: "$340",     color: ACCENT  },
      ],
      goals: [
        { label: "Monthly Revenue: $50K",  value: 24, max: 50,  color: COLOR  },
        { label: "Margin: 50%",            value: 41, max: 50,  color: ACCENT },
        { label: "ARR: $600K",             value: 288, max: 600, color: D.amber },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "Scan fee collected: $28 — homeowner #H-512" },
        { time: "11:30 AM", type: "success", message: "Match fee: $42 — 3 pro referrals from ZIP 75034" },
        { time: "11:00 AM", type: "info",    message: "Monthly revenue milestone: $24K — new record" },
      ],
    },
    agents: {
      primary: [
        { label: "TrustyPro Agent",  value: "89",    sub: "Actions today",         trend: 14.2 },
        { label: "Photo AI",         value: "284",   sub: "Photos analyzed",       trend: 22.4 },
        { label: "Comms Agent",      value: "47",    sub: "Homeowner messages",    trend: 8.7  },
        { label: "Success Rate",     value: "95.4%", sub: "All TP agents",         trend: 0.4  },
      ],
      donut: [
        { label: "Photo AI",       value: 284, color: D.purple },
        { label: "TrustyPro",      value: 89,  color: COLOR    },
        { label: "Comms",          value: 47,  color: D.teal   },
        { label: "Waitlist Agent", value: 34,  color: D.orange },
      ],
      topItems: [
        { label: "Most Active",  value: "Photo AI (284)",       color: D.purple },
        { label: "Best Rate",    value: "Comms Agent (99.1%)",  color: D.teal   },
        { label: "Needs Review", value: "TrustyPro (95.4%)",   color: D.amber  },
      ],
      goals: [
        { label: "Daily Scans: 100",    value: 89,  max: 100, color: COLOR    },
        { label: "Success Rate: 98%",   value: 95,  max: 98,  color: D.green  },
        { label: "Photo Queue < 20",    value: 34,  max: 20,  color: D.amber  },
      ],
      activities: [
        { time: "12:00 PM", type: "success", message: "[TrustyPro Agent] 4 scans processed — 9 issues flagged" },
        { time: "11:58 AM", type: "success", message: "[Photo AI] Roof wear detected — 2 properties — Frisco" },
        { time: "11:30 AM", type: "info",    message: "[Comms Agent] 12 homeowner check-ins sent" },
        { time: "11:00 AM", type: "success", message: "[Waitlist Agent] 4 new signups — welcome sequence triggered" },
      ],
    },
  };

  return {
    name: "TrustyPro",
    tagline: "AI-powered Home Health Vault for homeowners",
    color: COLOR,
    accentColor: ACCENT,
    basePath: BASE,
    tab,
    metrics: {
      revenueData: SCAN_DATA,
      ...configs[tab],
    } as CompanyDashboardConfig["metrics"],
  };
}

export function TrustyProExecutive()   { return <CompanyDashboard config={makeConfig("executive")}   />; }
export function TrustyProOperations()  { return <CompanyDashboard config={makeConfig("operations")}  />; }
export function TrustyProSales()       { return <CompanyDashboard config={makeConfig("sales")}       />; }
export function TrustyProMarketing()   { return <CompanyDashboard config={makeConfig("marketing")}   />; }
export function TrustyProSupport()     { return <CompanyDashboard config={makeConfig("support")}     />; }
export function TrustyProFinancial()   { return <CompanyDashboard config={makeConfig("financial")}   />; }
export function TrustyProAgents()      { return <CompanyDashboard config={makeConfig("agents")}      />; }
