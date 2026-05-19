import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle, Bell, BellOff, Bot, CheckCircle,
  ChevronDown, ChevronUp, CloudLightning, DollarSign,
  Flame, Info, Leaf, Shield, Tag, ThumbsUp, Wrench, Zap,
} from "lucide-react";

type Severity = "critical" | "warning" | "info";

interface Alert {
  id: string;
  icon: typeof Wrench;
  iconBg: string;
  title: string;
  description: string;
  severity: Severity;
  ignoredCost: string;
  fixCost: string;
}

const ACTIVE_ALERTS: Alert[] = [
  {
    id: "a1",
    icon: Flame,
    iconBg: "#EF4444",
    title: "HVAC filter overdue",
    description: "94 days since last filter change. Dirty coils reduce efficiency 15–25% and can cause coil freeze, turning a $15 DIY fix into an $800 service call.",
    severity: "critical",
    ignoredCost: "$800+ emergency repair",
    fixCost: "$15 DIY",
  },
  {
    id: "a2",
    icon: Leaf,
    iconBg: "#F59E0B",
    title: "Foundation watering reminder",
    description: "High heat forecast this week (101°F+). DFW clay soil shrinks rapidly without consistent moisture. Skipping watering in this heat is the #1 cause of foundation damage.",
    severity: "warning",
    ignoredCost: "$5,000–$80,000 foundation repair",
    fixCost: "$0 — water twice daily",
  },
  {
    id: "a3",
    icon: Shield,
    iconBg: "#F59E0B",
    title: "Roof age alert",
    description: "Your roof is approximately 11 years old. DFW storm season starts in April. Asphalt shingles typically last 15–20 years — a pre-season inspection now costs $150–$350 vs. $15K+ in emergency repairs.",
    severity: "warning",
    ignoredCost: "$5,000–$20,000 storm damage",
    fixCost: "$150–350 inspection",
  },
  {
    id: "a4",
    icon: Tag,
    iconBg: "#0D9488",
    title: "Spring tune-up discount",
    description: "3 HVAC pros in your ZIP code are offering 15% off tune-ups through May 31. Lock in your summer-ready service before the summer heat rush drives wait times to 2+ weeks.",
    severity: "info",
    ignoredCost: "Pay full price after June 1",
    fixCost: "$76–128 with discount",
  },
];

const DISMISSED_ALERTS = [
  "Smoke detector battery check (dismissed 3 days ago)",
  "Irrigation zone 3 pressure drop (dismissed 5 days ago)",
  "Pest control quarterly reminder (dismissed 1 week ago)",
  "Water heater age notice — 8 years (dismissed 2 weeks ago)",
  "Attic ventilation check (dismissed 3 weeks ago)",
  "Garage door spring lubrication (dismissed 1 month ago)",
  "Dryer vent cleaning reminder (dismissed 1 month ago)",
  "Carbon monoxide detector test (dismissed 6 weeks ago)",
];

const SEVERITY_CONFIG: Record<Severity, { label: string; bg: string; text: string; border: string }> = {
  critical: { label: "Critical",  bg: "#450A0A", text: "#FCA5A5", border: "#EF4444" },
  warning:  { label: "Warning",   bg: "#431407", text: "#FCD34D", border: "#F59E0B" },
  info:     { label: "Info",      bg: "#042F2E", text: "#5EEAD4", border: "#0D9488" },
};

const TOGGLES = [
  { id: "storm",    icon: CloudLightning, label: "Storm warnings",        sub: "Hail, high wind, and freeze alerts for your ZIP" },
  { id: "seasonal", icon: Wrench,         label: "Seasonal maintenance",  sub: "Reminders based on your home age and history" },
  { id: "deals",    icon: Tag,            label: "Deal alerts",           sub: "Discounts from vetted pros in your area" },
];

export default function SmartAlerts() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [historyOpen, setHistoryOpen] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>({ storm: true, seasonal: true, deals: true });

  const activeVisible = ACTIVE_ALERTS.filter((a) => !dismissed.has(a.id));

  function flipToggle(id: string) {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <HomeownerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#0D9488" }}>
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Smart Alerts</h1>
          </div>
          <p className="text-gray-400 ml-13 mt-1 pl-1">Your AI home monitor — catch problems before they become expensive</p>
        </div>

        {/* AI Summary Card */}
        <Card style={{ background: "#0F2A2A", border: "1px solid #0D9488" }}>
          <CardContent className="py-4 px-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#134E4A" }}>
                <Bot className="w-4 h-4" style={{ color: "#5EEAD4" }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">AI Home Health Summary</p>
                <p className="text-sm text-gray-300">
                  Your home is in <span style={{ color: "#FCD34D" }} className="font-medium">moderate health</span>. 2 items need attention in the next 30 days. Addressing the HVAC filter today takes 5 minutes and prevents the highest-probability expense on your list.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Active Alerts ({activeVisible.length})</h2>
            {activeVisible.length < ACTIVE_ALERTS.length && (
              <span className="text-xs text-gray-500">{ACTIVE_ALERTS.length - activeVisible.length} dismissed</span>
            )}
          </div>

          {activeVisible.length === 0 && (
            <Card style={{ background: "#111827", border: "1px solid #1F2937" }}>
              <CardContent className="py-10 text-center">
                <ThumbsUp className="w-8 h-8 mx-auto mb-3" style={{ color: "#10B981" }} />
                <p className="text-white font-semibold">All clear</p>
                <p className="text-sm text-gray-400 mt-1">No active alerts right now. Check back after the next AI scan.</p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {activeVisible.map((alert) => {
              const cfg = SEVERITY_CONFIG[alert.severity];
              const Icon = alert.icon;
              return (
                <Card key={alert.id} style={{ background: "#111827", border: `1px solid ${cfg.border}33` }}>
                  <CardContent className="py-5 px-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${alert.iconBg}22` }}>
                        <Icon className="w-5 h-5" style={{ color: alert.iconBg }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <p className="text-white font-semibold text-sm leading-snug">{alert.title}</p>
                          <Badge className="text-xs px-2 py-0.5 flex-shrink-0" style={{ background: cfg.bg, color: cfg.text, border: "none" }}>
                            {cfg.label}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 leading-relaxed">{alert.description}</p>
                        <div className="flex items-center gap-4 mb-4 text-xs">
                          <div className="flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                            <span className="text-gray-400">If ignored: </span>
                            <span style={{ color: "#FCA5A5" }} className="font-medium">{alert.ignoredCost}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" style={{ color: "#10B981" }} />
                            <span className="text-gray-400">Fix: </span>
                            <span style={{ color: "#6EE7B7" }} className="font-medium">{alert.fixCost}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="text-white font-medium" style={{ background: "#0D9488" }}>
                            Get Quote
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-white"
                            onClick={() => setDismissed((prev) => new Set([...prev, alert.id]))}
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Dismissed History */}
        <section>
          <button
            onClick={() => setHistoryOpen((v) => !v)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            {historyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Dismissed alerts ({DISMISSED_ALERTS.length})
          </button>
          {historyOpen && (
            <Card className="mt-3" style={{ background: "#111827", border: "1px solid #1F2937" }}>
              <CardContent className="py-4 px-5">
                <ul className="space-y-2">
                  {DISMISSED_ALERTS.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <BellOff className="w-3.5 h-3.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Alert Preferences */}
        <section>
          <h2 className="text-base font-semibold text-white mb-4">Alert Preferences</h2>
          <Card style={{ background: "#111827", border: "1px solid #1F2937" }}>
            <CardContent className="py-2 px-5 divide-y divide-gray-800">
              {TOGGLES.map(({ id, icon: Icon, label, sub }) => (
                <div key={id} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-gray-500">{sub}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => flipToggle(id)}
                    className="relative w-10 h-5 rounded-full transition-colors flex-shrink-0"
                    style={{ background: toggles[id] ? "#0D9488" : "#374151" }}
                  >
                    <span
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow"
                      style={{ transform: toggles[id] ? "translateX(21px)" : "translateX(2px)" }}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

      </div>
    </HomeownerLayout>
  );
}
