import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Droplets, AlertTriangle, CheckCircle, Wrench, ThumbsUp, ThumbsDown,
  ChevronRight, Zap, Home, ShieldCheck
} from "lucide-react";

type CheckStatus = "done" | "due" | "todo" | "na";

interface CheckItem {
  id: string;
  label: string;
  status: CheckStatus;
  note?: string;
}

interface HardWaterCard {
  title: string;
  impact: string;
  detail: string;
  icon: typeof Droplets;
  color: string;
}

interface DIVItem {
  task: string;
  rec: "DIY" | "Pro";
  reason: string;
}

const STATUS_CONFIG: Record<CheckStatus, { color: string; bg: string; label: string }> = {
  done: { color: "#16A34A", bg: "#DCFCE7", label: "Done" },
  due:  { color: "#D97706", bg: "#FEF3C7", label: "Due" },
  todo: { color: "#64748B", bg: "#F1F5F9", label: "To Do" },
  na:   { color: "#94A3B8", bg: "#F8FAFC", label: "N/A" },
};

const INITIAL_CHECKLIST: CheckItem[] = [
  { id: "softener", label: "Water softener salt refilled", status: "done" },
  { id: "screens",  label: "Drain screens cleaned", status: "done" },
  { id: "heater",   label: "Hot water heater flushed", status: "due", note: "Recommended annually — reduces sediment, extends life" },
  { id: "winter",   label: "Outdoor faucets winterized", status: "todo", note: "Seasonal — before first hard freeze" },
  { id: "flappers", label: "Toilet flappers checked", status: "todo" },
  { id: "supply",   label: "Under-sink supply lines inspected", status: "done" },
  { id: "sump",     label: "Sump pump tested", status: "na", note: "If applicable — typically in flood-prone zones" },
];

const HARD_WATER: HardWaterCard[] = [
  { title: "Scale buildup in pipes", impact: "Reduces flow up to 40%", detail: "Mineral deposits narrow pipe diameter over years. DFW 300+ PPM accelerates this.", icon: Droplets, color: "#3B82F6" },
  { title: "Water heater efficiency", impact: "+25% energy use", detail: `A ¼" layer of scale on heating element increases energy consumption by 25%.`, icon: Zap, color: "#F59E0B" },
  { title: "Appliance lifespan", impact: "30–50% shorter life", detail: "Dishwashers, washing machines, and coffee makers all suffer from mineral buildup.", icon: Home, color: "#EF4444" },
  { title: "Shower heads", impact: "Clog quarterly", detail: "Soak in white vinegar overnight to clear mineral deposits. Replace every 2–3 years.", icon: Droplets, color: "#8B5CF6" },
];

const DIV_ITEMS: DIVItem[] = [
  { task: "Toilet flapper replacement", rec: "DIY", reason: "20-min job, $8 part. Turn off supply valve, swap flapper, done." },
  { task: "Running toilet (flapper confirmed bad)", rec: "DIY", reason: "Most running toilets are just a worn flapper or float. No plumber needed." },
  { task: "Leaky faucet (worn washer)", rec: "DIY", reason: "Shut off supply, replace cartridge or washer. YouTube your exact faucet model." },
  { task: "Slow-draining sink", rec: "DIY", reason: "Zip-it hair tool + baking soda + vinegar flush. Only call a pro if persists." },
  { task: "Water heater anode rod", rec: "Pro", reason: "Requires draining tank and torquing a corroded hex bolt. High burn/flooding risk." },
  { task: "Main line clog", rec: "Pro", reason: "Requires sewer snake or hydro-jet equipment. Raw sewage risk if done wrong." },
];

export default function PlumbingGuide() {
  const [checklist, setChecklist] = useState<CheckItem[]>(INITIAL_CHECKLIST);

  function toggleItem(id: string) {
    setChecklist(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const cycle: CheckStatus[] = item.status === "na" ? ["na"] : ["todo", "done", "todo"];
        const next: CheckStatus = item.status === "done" ? "todo" : item.status === "todo" ? "done" : item.status;
        return { ...item, status: next };
      })
    );
  }

  const doneCount = checklist.filter(i => i.status === "done").length;
  const totalCount = checklist.filter(i => i.status !== "na").length;

  return (
    <HomeownerLayout>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #1D4ED8, #2563EB)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Droplets size={22} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", margin: 0 }}>Plumbing Guide</h1>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>Keep your water flowing</p>
            </div>
          </div>
        </div>

        {/* DFW Context */}
        <div style={{
          background: "#EFF6FF", border: "1px solid #BFDBFE",
          borderRadius: 12, padding: "14px 18px", marginBottom: 20,
          display: "flex", alignItems: "flex-start", gap: 10,
        }}>
          <ShieldCheck size={18} color="#2563EB" style={{ minWidth: 18, marginTop: 2 }} />
          <p style={{ fontSize: 14, color: "#1D4ED8", margin: 0, lineHeight: 1.6 }}>
            <strong>DFW plumbing context:</strong> Hard water (300-500 PPM in DFW) causes mineral buildup in pipes and appliances.
            Texas freeze events cause burst pipes. Know your system before an emergency hits.
          </p>
        </div>

        {/* Emergency Banner */}
        <div style={{
          background: "linear-gradient(135deg, #7F1D1D, #991B1B)",
          borderRadius: 16, padding: "20px 24px", marginBottom: 20,
          border: "1px solid #DC2626",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <AlertTriangle size={22} color="#FCA5A5" />
            <span style={{ fontSize: 18, fontWeight: 700, color: "#FEF2F2" }}>
              Water emergency? Turn off main shutoff FIRST.
            </span>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {[
              { loc: "Outdoor ground box", tip: "Front yard, near street — look for a metal or plastic lid flush with the lawn" },
              { loc: "Inside near water heater", tip: "Utility closet, garage wall, or behind a panel — usually a ball valve" },
              { loc: "Garage street-side wall", tip: "Many DFW homes have a shutoff inside the garage on the wall facing the street" },
              { loc: "Under kitchen sink", tip: "Sub-shutoff only — stops kitchen water, not whole home" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "8px 0",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
              }}>
                <div style={{
                  minWidth: 8, height: 8, borderRadius: "50%",
                  background: "#FCA5A5", marginTop: 6,
                }} />
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#FEF2F2" }}>{item.loc}</span>
                  <span style={{ fontSize: 13, color: "#FECACA", marginLeft: 6 }}>- {item.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Annual Maintenance Checklist */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
          Annual maintenance checklist
        </h2>
        <p style={{ fontSize: 13, color: "#64748B", marginBottom: 14 }}>
          {doneCount} of {totalCount} complete
        </p>
        <div style={{ width: "100%", background: "#E2E8F0", borderRadius: 4, height: 6, marginBottom: 16 }}>
          <div style={{
            width: `${Math.round((doneCount / Math.max(totalCount, 1)) * 100)}%`,
            background: "#16A34A", height: 6, borderRadius: 4, transition: "width 0.3s",
          }} />
        </div>
        <Card style={{ marginBottom: 24 }}>
          <CardContent style={{ padding: "8px 0" }}>
            {checklist.map((item, i) => {
              const cfg = STATUS_CONFIG[item.status];
              const clickable = item.status !== "na";
              return (
                <div
                  key={item.id}
                  onClick={() => clickable && toggleItem(item.id)}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "12px 20px",
                    borderBottom: i < checklist.length - 1 ? "1px solid #F1F5F9" : "none",
                    cursor: clickable ? "pointer" : "default",
                    background: item.status === "done" ? "#F0FDF4" : "transparent",
                  }}
                >
                  <div style={{
                    minWidth: 22, height: 22, borderRadius: 6,
                    background: item.status === "done" ? "#16A34A" : "transparent",
                    border: item.status === "done" ? "none" : `2px solid ${item.status === "na" ? "#CBD5E1" : "#CBD5E1"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: 1,
                  }}>
                    {item.status === "done" && <CheckCircle size={14} color="#fff" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: 14, color: item.status === "done" ? "#15803D" : "#334155",
                        textDecoration: item.status === "done" ? "line-through" : "none",
                        lineHeight: 1.5,
                      }}>{item.label}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                        background: cfg.bg, color: cfg.color,
                      }}>{cfg.label}</span>
                    </div>
                    {item.note && (
                      <p style={{ fontSize: 12, color: "#94A3B8", margin: "3px 0 0" }}>{item.note}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Hard Water Effects */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 14 }}>
          Hard water effects in DFW
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {HARD_WATER.map(item => {
            const Icon = item.icon;
            return (
              <Card key={item.title} style={{ border: "1px solid #E2E8F0" }}>
                <CardContent style={{ padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Icon size={16} color={item.color} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{item.title}</span>
                  </div>
                  <div style={{
                    fontSize: 13, fontWeight: 700, color: item.color,
                    background: `${item.color}18`, padding: "3px 10px", borderRadius: 20,
                    display: "inline-block", marginBottom: 8,
                  }}>
                    {item.impact}
                  </div>
                  <p style={{ fontSize: 12, color: "#64748B", margin: 0, lineHeight: 1.5 }}>{item.detail}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Water Softener Guide */}
        <Card style={{ marginBottom: 24, border: "1px solid #BFDBFE", background: "#EFF6FF" }}>
          <CardContent style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Droplets size={18} color="#2563EB" />
              <span style={{ fontWeight: 700, fontSize: 15, color: "#1E40AF" }}>Water softener guide</span>
            </div>
            <p style={{ fontSize: 14, color: "#1D4ED8", margin: "0 0 10px", lineHeight: 1.6 }}>
              DFW water hardness: <strong>300-500 PPM</strong>. A water softener is recommended for homes above 180 PPM.
              At 300+ PPM (most of DFW), scale buildup is measurable within 1-2 years.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { label: "Salt refill interval", value: "Every 6–8 weeks" },
                { label: "Resin bed cleaning", value: "Annually" },
                { label: "ROI payback period", value: "2–3 years in appliance savings" },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: 11, color: "#3B82F6", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1E3A8A" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* DIY vs Pro */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 14 }}>
          DIY vs. Pro guide
        </h2>
        <Card style={{ marginBottom: 28 }}>
          <CardContent style={{ padding: "8px 0" }}>
            {DIV_ITEMS.map((item, i) => (
              <div key={item.task} style={{
                display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 20px",
                borderBottom: i < DIV_ITEMS.length - 1 ? "1px solid #F1F5F9" : "none",
              }}>
                <div style={{
                  minWidth: 28, height: 28, borderRadius: 8,
                  background: item.rec === "DIY" ? "#DCFCE7" : "#FEE2E2",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {item.rec === "DIY"
                    ? <ThumbsUp size={14} color="#16A34A" />
                    : <Wrench size={14} color="#DC2626" />
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{item.task}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: "1px 8px", borderRadius: 20,
                      background: item.rec === "DIY" ? "#DCFCE7" : "#FEE2E2",
                      color: item.rec === "DIY" ? "#15803D" : "#DC2626",
                    }}>{item.rec}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.4 }}>{item.reason}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <div style={{
          background: "linear-gradient(135deg, #1E3A8A, #1D4ED8)",
          borderRadius: 16, padding: "24px", textAlign: "center",
        }}>
          <Wrench size={32} color="#93C5FD" style={{ margin: "0 auto 12px" }} />
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
            Need a plumber in DFW?
          </h3>
          <p style={{ fontSize: 14, color: "#BFDBFE", margin: "0 0 18px", lineHeight: 1.5 }}>
            Connect with licensed, background-checked plumbers. Same-day availability in most DFW zip codes.
          </p>
          <a href="/trustypro/book?trade=plumbing">
            <Button style={{
              background: "#fff", color: "#1D4ED8", fontWeight: 700,
              padding: "10px 28px", fontSize: 15, borderRadius: 10,
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              Find a Plumber <ChevronRight size={16} />
            </Button>
          </a>
        </div>

      </div>
    </HomeownerLayout>
  );
}
