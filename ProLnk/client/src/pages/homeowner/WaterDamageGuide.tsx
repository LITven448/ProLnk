import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle, CheckCircle, Phone, Droplets, Zap,
  ChevronDown, ChevronUp, ShieldCheck, Clock, Camera,
  Home, Thermometer, Waves, Wind,
} from "lucide-react";

interface AccordionItem {
  id: string;
  icon: typeof Droplets;
  title: string;
  spotIt: string;
  action: string;
  cost: string;
}

interface CheckItem {
  id: string;
  label: string;
}

interface Pro {
  name: string;
  company: string;
  rating: number;
  responseTime: string;
  phone: string;
}

const SOURCES: AccordionItem[] = [
  {
    id: "burst",
    icon: Waves,
    title: "Burst Pipes",
    spotIt: "Sudden drop in water pressure, water stains on walls or ceilings, unexplained puddles under sinks.",
    action: "Shut off water main immediately. Open faucets to drain remaining pressure. Document all damage with photos.",
    cost: "$400–$1,500 repair + $2,000–$10,000 water damage restoration",
  },
  {
    id: "heater",
    icon: Thermometer,
    title: "Water Heater Failure",
    spotIt: "Puddle around base, rust-colored water, popping or rumbling sounds, no hot water.",
    action: "Shut off cold water supply valve to the heater. Turn dial to Pilot. Call plumber for same-day service.",
    cost: "$800–$2,500 replacement + restoration if significant leak",
  },
  {
    id: "hvac",
    icon: Wind,
    title: "HVAC Condensate Overflow",
    spotIt: "Water stains near air handler, drip pan full, AC not cooling effectively.",
    action: "Turn off AC at thermostat. Locate and clear condensate drain line. Check float switch.",
    cost: "$75–$250 drain clearing, $150–$600 if pan damage",
  },
  {
    id: "roof",
    icon: Home,
    title: "Roof Leak",
    spotIt: "Water stains on ceiling (often yellow/brown rings), dripping after rain, damp attic insulation.",
    action: "Place buckets, move valuables. Do NOT go on wet roof. Call roofer for emergency tarp. Document everything.",
    cost: "$300–$1,500 repair, $5,000–$15,000 if decking or insulation damage",
  },
  {
    id: "appliance",
    icon: Droplets,
    title: "Appliance Leak",
    spotIt: "Water under dishwasher, fridge, or washing machine. Slow leak often goes undetected for weeks.",
    action: "Pull appliance away from wall. Shut off supply valve. Inspect hoses for cracks or loose connections.",
    cost: "$150–$600 repair + mold remediation if undetected ($2,000–$8,000)",
  },
  {
    id: "sewer",
    icon: AlertTriangle,
    title: "Sewer Backup",
    spotIt: "Multiple drains backing up simultaneously, gurgling toilets, foul odor from drains.",
    action: "Do NOT use any water fixtures. Call emergency plumber immediately — raw sewage is a health hazard.",
    cost: "$3,000–$25,000 depending on line damage and contamination cleanup",
  },
];

const CHECKLIST: CheckItem[] = [
  { id: "1", label: "Inspect water heater annually (flush sediment, check anode rod)" },
  { id: "2", label: "Check washing machine hoses every 3 years — replace if cracked" },
  { id: "3", label: "Know your water shutoff location and test it annually" },
  { id: "4", label: "Install water leak detectors under sinks and near water heater" },
  { id: "5", label: "Clean AC condensate drain line each spring" },
  { id: "6", label: "Inspect roof flashing around chimneys and skylights annually" },
  { id: "7", label: "Check dishwasher and fridge water line connections annually" },
  { id: "8", label: "Maintain proper grading — soil should slope away from foundation" },
];

const PROS: Pro[] = [
  { name: "Marcus W.", company: "Rapid Restoration DFW", rating: 4.9, responseTime: "< 45 min", phone: "(972) 555-0182" },
  { name: "ServiceMaster", company: "ServiceMaster Restore Frisco", rating: 4.8, responseTime: "< 60 min", phone: "(972) 555-0241" },
];

export default function WaterDamageGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [knowsShutoff, setKnowsShutoff] = useState<boolean | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setExpanded(prev => prev === id ? null : id);
  }

  function toggleCheck(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

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
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", margin: 0 }}>Water Damage Guide</h1>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>Act fast, save thousands</p>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div style={{
          background: "linear-gradient(135deg, #7F1D1D, #991B1B)",
          borderRadius: 16, padding: "20px 24px", marginBottom: 20,
          border: "1px solid #DC2626",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <AlertTriangle size={22} color="#FCA5A5" />
            <span style={{ fontSize: 18, fontWeight: 700, color: "#FEF2F2" }}>
              Active water damage? Do this NOW:
            </span>
          </div>
          {[
            "Turn off the main water shutoff valve",
            "Turn off electricity if water is near outlets or your electrical panel",
            "Move valuables, documents, and electronics to dry areas",
            "Document everything with photos and video before touching anything",
            "Call a water restoration pro immediately — every hour matters",
          ].map((step, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              padding: "8px 0",
              borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}>
              <div style={{
                minWidth: 26, height: 26, borderRadius: "50%",
                background: "#DC2626", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff",
              }}>{i + 1}</div>
              <span style={{ fontSize: 15, color: "#FEF2F2", lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>

        {/* Cost Without Quick Action */}
        <Card style={{ marginBottom: 20, border: "1px solid #FED7AA", background: "#FFF7ED" }}>
          <CardContent style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Clock size={18} color="#EA580C" />
              <span style={{ fontWeight: 700, color: "#9A3412", fontSize: 15 }}>Time is money — literally</span>
            </div>
            {[
              { label: "Water damage left for 24 hrs", impact: "Costs 3× more to remediate" },
              { label: "Left for 48 hrs", impact: "Mold begins growing in wet materials" },
              { label: "Left for 72 hrs", impact: "Structural damage risk — drywall, subfloor, framing" },
            ].map((row, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0",
                borderBottom: i < 2 ? "1px solid #FED7AA" : "none",
              }}>
                <span style={{ fontSize: 14, color: "#7C2D12" }}>{row.label}</span>
                <span style={{
                  fontSize: 13, fontWeight: 600, color: "#EA580C",
                  background: "#FFEDD5", padding: "2px 8px", borderRadius: 20,
                }}>{row.impact}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Water Shutoff Toggle */}
        <Card style={{ marginBottom: 20 }}>
          <CardContent style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <ShieldCheck size={18} color="#2563EB" />
              <span style={{ fontWeight: 700, fontSize: 16, color: "#0F172A" }}>
                Do you know where your water shutoff is?
              </span>
            </div>
            <p style={{ fontSize: 14, color: "#64748B", marginBottom: 14 }}>
              In an emergency, you have 30 seconds to stop hundreds of gallons of water.
            </p>
            <div style={{ display: "flex", gap: 10, marginBottom: knowsShutoff === false ? 16 : 0 }}>
              <button
                onClick={() => setKnowsShutoff(true)}
                style={{
                  padding: "8px 20px", borderRadius: 8, border: "2px solid",
                  borderColor: knowsShutoff === true ? "#16A34A" : "#E2E8F0",
                  background: knowsShutoff === true ? "#DCFCE7" : "#F8FAFC",
                  color: knowsShutoff === true ? "#15803D" : "#475569",
                  fontWeight: 600, cursor: "pointer", fontSize: 14,
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                {knowsShutoff === true && <CheckCircle size={15} color="#16A34A" />}
                Yes, I know it
              </button>
              <button
                onClick={() => setKnowsShutoff(false)}
                style={{
                  padding: "8px 20px", borderRadius: 8, border: "2px solid",
                  borderColor: knowsShutoff === false ? "#DC2626" : "#E2E8F0",
                  background: knowsShutoff === false ? "#FEF2F2" : "#F8FAFC",
                  color: knowsShutoff === false ? "#991B1B" : "#475569",
                  fontWeight: 600, cursor: "pointer", fontSize: 14,
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                {knowsShutoff === false && <AlertTriangle size={15} color="#DC2626" />}
                Not sure
              </button>
            </div>
            {knowsShutoff === false && (
              <div style={{
                background: "#EFF6FF", border: "1px solid #BFDBFE",
                borderRadius: 10, padding: "14px 16px",
              }}>
                <p style={{ fontWeight: 600, color: "#1E40AF", marginBottom: 8, fontSize: 14 }}>
                  Finding your shutoff in DFW homes:
                </p>
                <ul style={{ margin: 0, paddingLeft: 18, color: "#1D4ED8", fontSize: 13, lineHeight: 1.8 }}>
                  <li>Outside near the front of the house, usually in a ground-level box in the lawn</li>
                  <li>Inside utility closet, garage wall, or near the water heater</li>
                  <li>Under the kitchen sink (sub-shutoff, not main)</li>
                  <li>In the garage on the wall shared with the street side</li>
                </ul>
                <p style={{ fontSize: 13, color: "#3B82F6", marginTop: 8, marginBottom: 0 }}>
                  Tip: Tag it with a bright piece of tape and show every household member where it is.
                </p>
              </div>
            )}
            {knowsShutoff === true && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#15803D", fontSize: 14, fontWeight: 600 }}>
                <CheckCircle size={16} color="#16A34A" />
                Great — you're prepared for the most common emergency step.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Common Sources Accordion */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 14 }}>
          Common sources of water damage
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {SOURCES.map((src) => {
            const Icon = src.icon;
            const open = expanded === src.id;
            return (
              <Card key={src.id} style={{
                border: open ? "1px solid #3B82F6" : "1px solid #E2E8F0",
                overflow: "hidden",
              }}>
                <button
                  onClick={() => toggle(src.id)}
                  style={{
                    width: "100%", background: "none", border: "none", cursor: "pointer",
                    padding: "14px 20px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon size={18} color="#2563EB" />
                    <span style={{ fontWeight: 600, fontSize: 15, color: "#0F172A" }}>{src.title}</span>
                  </div>
                  {open ? <ChevronUp size={18} color="#64748B" /> : <ChevronDown size={18} color="#64748B" />}
                </button>
                {open && (
                  <div style={{ padding: "0 20px 18px", borderTop: "1px solid #EFF6FF" }}>
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#6366F1", textTransform: "uppercase", letterSpacing: 0.5 }}>
                        How to spot it
                      </span>
                      <p style={{ fontSize: 14, color: "#334155", marginTop: 4, marginBottom: 0 }}>{src.spotIt}</p>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: 0.5 }}>
                        Immediate action
                      </span>
                      <p style={{ fontSize: 14, color: "#334155", marginTop: 4, marginBottom: 0 }}>{src.action}</p>
                    </div>
                    <div style={{
                      background: "#FFF7ED", border: "1px solid #FED7AA",
                      borderRadius: 8, padding: "8px 12px", display: "flex", gap: 6, alignItems: "flex-start",
                    }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#EA580C" }}>Typical cost:</span>
                      <span style={{ fontSize: 12, color: "#7C2D12" }}>{src.cost}</span>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Prevention Checklist */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 14 }}>
          Prevention checklist
        </h2>
        <Card style={{ marginBottom: 24 }}>
          <CardContent style={{ padding: "8px 0" }}>
            {CHECKLIST.map((item, i) => {
              const done = checked.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "12px 20px", cursor: "pointer",
                    borderBottom: i < CHECKLIST.length - 1 ? "1px solid #F1F5F9" : "none",
                    background: done ? "#F0FDF4" : "transparent",
                    transition: "background 0.2s",
                  }}
                >
                  <div style={{
                    minWidth: 22, height: 22, borderRadius: 6,
                    border: done ? "none" : "2px solid #CBD5E1",
                    background: done ? "#16A34A" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: 1,
                  }}>
                    {done && <CheckCircle size={14} color="#fff" />}
                  </div>
                  <span style={{
                    fontSize: 14, color: done ? "#15803D" : "#334155",
                    textDecoration: done ? "line-through" : "none",
                    lineHeight: 1.5,
                  }}>{item.label}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* 24/7 Restoration Pros */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 14 }}>
          24/7 restoration pros
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {PROS.map((pro) => (
            <Card key={pro.company} style={{ border: "1px solid #E2E8F0" }}>
              <CardContent style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{pro.company}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, color: "#16A34A",
                        background: "#DCFCE7", padding: "2px 8px", borderRadius: 20,
                      }}>Available now</span>
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#64748B" }}>
                      <span>⭐ {pro.rating}</span>
                      <span><Clock size={12} style={{ display: "inline", marginRight: 3 }} />{pro.responseTime}</span>
                    </div>
                  </div>
                  <a href={`tel:${pro.phone}`}>
                    <Button size="sm" style={{ background: "#DC2626", borderColor: "#DC2626", color: "#fff" }}>
                      <Phone size={14} style={{ marginRight: 6 }} />
                      Call Now
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Insurance Tip */}
        <div style={{
          background: "#F0F9FF", border: "1px solid #BAE6FD",
          borderRadius: 12, padding: "16px 20px",
          display: "flex", alignItems: "flex-start", gap: 12,
        }}>
          <Camera size={20} color="#0284C7" style={{ minWidth: 20, marginTop: 2 }} />
          <div>
            <p style={{ fontWeight: 700, color: "#075985", fontSize: 15, marginBottom: 4 }}>Insurance tip</p>
            <p style={{ fontSize: 14, color: "#0369A1", margin: 0, lineHeight: 1.6 }}>
              Most homeowner policies cover sudden and accidental water damage.
              Document everything — photos, video, timestamps — <strong>before cleanup begins</strong>.
              Call your insurance agent within 24 hours of discovery.
            </p>
          </div>
        </div>

      </div>
    </HomeownerLayout>
  );
}
