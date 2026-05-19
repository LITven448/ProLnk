import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Link } from "wouter";
import {
  CheckCircle, Circle, Home, Calendar, ShieldCheck,
  AlertTriangle, Activity,
} from "lucide-react";

const D = {
  bg: "#0D0F14″,
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8″,
  teal: "#00C2A8″,
  green: "#22C55E",
  amber: "#F59E0B",
  blue: "#3B82F6″,
};

interface CheckItem {
  id: string;
  label: string;
  note?: string;
}

interface Section {
  id: string;
  title: string;
  icon: typeof Calendar;
  color: string;
  items: CheckItem[];
}

const SECTIONS: Section[] = [
  {
    id: "week1″,
    title: "Week 1″,
    icon: Calendar,
    color: D.teal,
    items: [
      { id: "w1-1″, label: "Change all locks and garage codes" },
      { id: "w1-2″, label: "Locate and test water main shutoff" },
      { id: "w1-3″, label: "Find electrical panel, label all breakers" },
      { id: "w1-4″, label: "Test all smoke and CO detectors" },
      { id: "w1-5″, label: "Locate gas shutoff valve" },
      { id: "w1-6″, label: "Get copies of all warranties from seller" },
      { id: "w1-7″, label: "Change HVAC filter" },
    ],
  },
  {
    id: "month1″,
    title: "Month 1″,
    icon: Activity,
    color: D.blue,
    items: [
      { id: "m1-1″, label: "Schedule HVAC inspection", note: "$89–150" },
      { id: "m1-2″, label: "Roof inspection if not done during purchase" },
      { id: "m1-3″, label: "Get to know your neighbors" },
      { id: "m1-4″, label: "Set up mail forwarding completely" },
      { id: "m1-5″, label: "Update driver's license address" },
      { id: "m1-6″, label: "Locate nearest urgent care" },
    ],
  },
  {
    id: "month3″,
    title: "Months 2–3″,
    icon: ShieldCheck,
    color: D.green,
    items: [
      { id: "m3-1″, label: "Deep clean air ducts if older home" },
      { id: "m3-2″, label: "Check attic for insulation and pest signs" },
      { id: "m3-3″, label: "Test all outlets with GFCI tester" },
      { id: "m3-4″, label: "Document all home systems (photos + serial numbers)" },
      { id: "m3-5″, label: "Open a home maintenance savings account", note: "$200/mo recommended" },
    ],
  },
];

export default function FirstTimeBuyerGuide() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const total = SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
  const done = checked.size;
  const pct = Math.round((done / total) * 100);

  return (
    <HomeownerLayout>
      <div style={{ background: D.bg, minHeight: "100vh", padding: "32px 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Home size={22} color={D.teal} />
              <h1 style={{ color: D.text, fontSize: 26, fontWeight: 700, margin: 0 }}>
                New Homeowner Guide
              </h1>
            </div>
            <p style={{ color: D.muted, fontSize: 15, margin: 0 }}>
              The first 90 days checklist
            </p>
          </div>

          {/* Welcome Card */}
          <div style={{
            background: `linear-gradient(135deg, ${D.teal}14 0%, ${D.teal}06 100%)`,
            border: `1px solid ${D.teal}35`, borderRadius: 12, padding: 20, marginBottom: 24,
          }}>
            <p style={{ color: D.text, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              Congratulations on your new home! Here's what to do in the first 3 months to protect your investment.
            </p>
          </div>

          {/* Progress */}
          <div style={{
            background: D.card, border: `1px solid ${D.border}`,
            borderRadius: 12, padding: 18, marginBottom: 24,
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: D.text, fontSize: 14, fontWeight: 600 }}>Overall progress</span>
                <span style={{ color: D.teal, fontSize: 14, fontWeight: 700 }}>{done}/{total} complete</span>
              </div>
              <div style={{ background: D.border, borderRadius: 4, height: 6, overflow: "hidden" }}>
                <div style={{
                  height: "100%", background: D.teal, borderRadius: 4,
                  width: `${pct}%`, transition: "width 0.3s ease",
                }} />
              </div>
            </div>
            <div style={{ color: D.teal, fontSize: 22, fontWeight: 800, minWidth: 52, textAlign: "right" }}>
              {pct}%
            </div>
          </div>

          {/* Sections */}
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const sectionDone = section.items.filter((i) => checked.has(i.id)).length;
            return (
              <div key={section.id} style={{
                background: D.card, border: `1px solid ${D.border}`,
                borderRadius: 12, marginBottom: 20, overflow: "hidden",
              }}>
                <div style={{
                  padding: "16px 20px", borderBottom: `1px solid ${D.border}`,
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: `${section.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={17} color={section.color} />
                  </div>
                  <span style={{ color: D.text, fontWeight: 700, fontSize: 16 }}>{section.title}</span>
                  <span style={{
                    marginLeft: "auto", color: section.color,
                    fontSize: 13, fontWeight: 600,
                  }}>
                    {sectionDone}/{section.items.length}
                  </span>
                </div>
                <div style={{ padding: "8px 20px 12px" }}>
                  {section.items.map((item) => {
                    const isChecked = checked.has(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "10px 0″, cursor: "pointer",
                          borderBottom: `1px solid ${D.border}`,
                        }}
                      >
                        {isChecked
                          ? <CheckCircle size={18} color={D.green} style={{ flexShrink: 0 }} />
                          : <Circle size={18} color={D.muted} style={{ flexShrink: 0 }} />
                        }
                        <div style={{ flex: 1 }}>
                          <span style={{
                            color: isChecked ? D.muted : D.text,
                            fontSize: 14, textDecoration: isChecked ? "line-through" : "none",
                          }}>
                            {item.label}
                          </span>
                          {item.note && (
                            <span style={{ color: D.teal, fontSize: 12, marginLeft: 8 }}>
                              {item.note}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* DFW Alert */}
          <div style={{
            background: `${D.amber}10`, border: `1px solid ${D.amber}35`,
            borderRadius: 12, padding: 18, marginBottom: 24,
            display: "flex", gap: 14,
          }}>
            <AlertTriangle size={20} color={D.amber} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ color: D.amber, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                If you moved to DFW
              </div>
              <p style={{ color: D.text, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                Start foundation watering schedule immediately. DFW clay soil is the #1 risk to your home.
                Water the perimeter every 2–3 days during dry spells to prevent shrink/swell cycles that
                crack your slab.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{
            background: `linear-gradient(135deg, ${D.teal}14 0%, ${D.teal}06 100%)`,
            border: `1px solid ${D.teal}35`, borderRadius: 14, padding: 28,
            textAlign: "center",
          }}>
            <Home size={28} color={D.teal} style={{ marginBottom: 12 }} />
            <h3 style={{ color: D.text, fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>
              Protect Your Investment Permanently
            </h3>
            <p style={{ color: D.muted, fontSize: 13, margin: "0 0 20px", lineHeight: 1.6 }}>
              Add your home to the Home Health Vault and track systems, maintenance history, and value over time.
            </p>
            <Link href="/homeowner/vault">
              <a style={{
                display: "inline-block",
                background: D.teal, color: "#000″,
                fontWeight: 700, fontSize: 15, padding: "12px 28px",
                borderRadius: 8, textDecoration: "none",
              }}>
                Add to Home Health Vault
              </a>
            </Link>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
