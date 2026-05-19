import React from 'react';
import type React from "react";
import { useState } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import {
  LayoutDashboard, Save, Eye, Share2, Plus, X, Settings2,
  BarChart2, PieChart, Table2, Activity, Map, Trophy, Flame,
  Filter, TrendingUp, Grid, AlignLeft,
} from "lucide-react";

const FONT_STYLE: React.CSSProperties = { fontFamily: FONT };

const LABEL: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: T.muted,
  fontFamily: FONT,
};

interface WidgetDef {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  preview: string;
}

const WIDGET_LIBRARY: WidgetDef[] = [
  { id: "metric", name: "MetricCard", icon: TrendingUp, color: "#3b82f6″, preview: "KPI" },
  { id: "bar", name: "BarChart", icon: BarChart2, color: "#f97316″, preview: "Bars" },
  { id: "donut", name: "DonutChart", icon: PieChart, color: "#ec4899″, preview: "Donut" },
  { id: "table", name: "DataTable", icon: Table2, color: "#8b5cf6″, preview: "Table" },
  { id: "feed", name: "ActivityFeed", icon: Activity, color: "#10b981″, preview: "Feed" },
  { id: "map", name: "MapView", icon: Map, color: "#0d9488″, preview: "Map" },
  { id: "leaderboard", name: "Leaderboard", icon: Trophy, color: T.amber, preview: "Rank" },
  { id: "heatmap", name: "HeatMap", icon: Flame, color: "#ef4444″, preview: "Heat" },
  { id: "funnel", name: "Funnel", icon: Filter, color: "#6366f1″, preview: "Funnel" },
  { id: "sparkline", name: "Sparkline", icon: TrendingUp, color: "#14b8a6″, preview: "Spark" },
  { id: "status", name: "StatusGrid", icon: Grid, color: "#64748b", preview: "Grid" },
  { id: "progress", name: "ProgressBars", icon: AlignLeft, color: "#f59e0b", preview: "Bars" },
];

interface PlacedWidget {
  instanceId: string;
  widgetId: string;
  title: string;
  col: number;
  row: number;
}

const INITIAL_WIDGETS: PlacedWidget[] = [
  { instanceId: "w1″, widgetId: "metric", title: "Total Revenue", col: 0, row: 0 },
  { instanceId: "w2″, widgetId: "bar", title: "Monthly Signups", col: 1, row: 0 },
  { instanceId: "w3″, widgetId: "donut", title: "Revenue Split", col: 2, row: 0 },
  { instanceId: "w4″, widgetId: "feed", title: "Recent Activity", col: 0, row: 1 },
];

const TEMPLATES = [
  {
    name: "Executive Overview",
    desc: "Revenue, signups, and platform health KPIs",
    widgets: 6,
    color: BADGE_GRADIENTS.blue,
  },
  {
    name: "Operations Daily",
    desc: "Lead flow, match rate, and agent status",
    widgets: 8,
    color: BADGE_GRADIENTS.green,
  },
  {
    name: "Sales Pipeline",
    desc: "Funnel conversion, outreach, and close rate",
    widgets: 5,
    color: BADGE_GRADIENTS.orange,
  },
];

const DATA_SOURCES = [
  "Platform Revenue",
  "Partner Signups",
  "Homeowner Waitlist",
  "Lead Feed",
  "Commission Ledger",
  "Agent Activity",
  "Network Tree",
  "Job Log",
];

const DATE_RANGES = ["Last 7 days", "Last 30 days", "Last 90 days", "Year to date", "All time"];
const REFRESH_INTERVALS = ["Manual", "5 min", "15 min", "30 min", "1 hour"];

function SmallWidgetTile({ def, onAdd }: { def: WidgetDef; onAdd: (id: string) => void }) {
  const Icon = def.icon;
  return (
    <div
      onClick={() => onAdd(def.id)}
      style={{
        backgroundColor: T.bg,
        border: `1.5px solid ${T.border}`,
        borderRadius: 10,
        padding: "10px 8px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = def.color; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = T.border; }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: `${def.color}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon style={{ width: 16, height: 16, color: def.color }} />
      </div>
      <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: T.text, textAlign: "center", lineHeight: 1.2 }}>
        {def.name}
      </div>
    </div>
  );
}

function CanvasWidget({
  placed,
  def,
  isSelected,
  onSelect,
  onRemove,
}: {
  placed: PlacedWidget;
  def: WidgetDef;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const Icon = def.icon;
  return (
    <div
      onClick={onSelect}
      style={{
        backgroundColor: T.card,
        border: `2px solid ${isSelected ? def.color : T.border}`,
        borderRadius: 12,
        padding: 14,
        cursor: "pointer",
        position: "relative",
        boxShadow: isSelected ? `0 0 0 3px ${def.color}33` : "0 1px 6px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minHeight: 120,
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#ef444422″,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <X style={{ width: 10, height: 10, color: "#ef4444″ }} />
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: `${def.color}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon style={{ width: 13, height: 13, color: def.color }} />
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 12, color: T.text }}>{placed.title}</div>
      </div>
      <div
        style={{
          flex: 1,
          background: `${def.color}0A`,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: FONT, fontSize: 11, color: T.muted }}>{def.preview} preview</div>
      </div>
    </div>
  );
}

export default function DashboardBuilder() {
  const [widgets, setWidgets] = useState<PlacedWidget[]>(INITIAL_WIDGETS);
  const [selectedInstance, setSelectedInstance] = useState<string | null>("w1″);
  const [dashName, setDashName] = useState("My Dashboard");
  const [saved, setSaved] = useState(false);

  const selectedWidget = widgets.find((w) => w.instanceId === selectedInstance);
  const selectedDef = WIDGET_LIBRARY.find((d) => d.id === selectedWidget?.widgetId);

  const [configState, setConfigState] = useState<Record<string, { source: string; range: string; refresh: string }>>({
    w1: { source: "Platform Revenue", range: "Last 30 days", refresh: "15 min" },
    w2: { source: "Partner Signups", range: "Last 30 days", refresh: "15 min" },
    w3: { source: "Revenue Split", range: "Year to date", refresh: "1 hour" },
    w4: { source: "Agent Activity", range: "Last 7 days", refresh: "5 min" },
  });

  const addWidget = (widgetId: string) => {
    const def = WIDGET_LIBRARY.find((d) => d.id === widgetId);
    if (!def) return;
    const newId = `w${Date.now()}`;
    setWidgets((prev) => [
      ...prev,
      {
        instanceId: newId,
        widgetId,
        title: def.name,
        col: prev.length % 3,
        row: Math.floor(prev.length / 3),
      },
    ]);
    setConfigState((prev) => ({
      ...prev,
      [newId]: { source: DATA_SOURCES[0], range: "Last 30 days", refresh: "15 min" },
    }));
    setSelectedInstance(newId);
  };

  const removeWidget = (instanceId: string) => {
    setWidgets((prev) => prev.filter((w) => w.instanceId !== instanceId));
    if (selectedInstance === instanceId) setSelectedInstance(null);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div style={{ padding: "24px 32px 40px", fontFamily: FONT }}>
        {/* Header toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LayoutDashboard style={{ width: 22, height: 22, color: "#0d9488″ }} />
            <h1 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 22, color: T.text, margin: 0 }}>
              Dashboard Builder
            </h1>
          </div>
          <input
            value={dashName}
            onChange={(e) => setDashName(e.target.value)}
            style={{
              border: `1.5px solid ${T.border}`,
              borderRadius: 8,
              padding: "6px 12px",
              fontFamily: FONT,
              fontSize: 13,
              color: T.text,
              background: T.card,
              minWidth: 200,
            }}
          />
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {[
              { label: saved ? "Saved!" : "Save Dashboard", icon: Save, gradient: BADGE_GRADIENTS.green, action: handleSave },
              { label: "Preview", icon: Eye, gradient: BADGE_GRADIENTS.blue, action: () => {} },
              { label: "Share", icon: Share2, gradient: BADGE_GRADIENTS.purple, action: () => {} },
            ].map(({ label, icon: Icon, gradient, action }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  background: gradient,
                  color: "#fff",
                  border: "none",
                  borderRadius: 9,
                  padding: "8px 16px",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
                }}
              >
                <Icon style={{ width: 13, height: 13 }} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates */}
        <div
          style={{
            backgroundColor: T.card,
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            padding: "16px 20px",
            marginBottom: 20,
          }}
        >
          <div style={{ ...LABEL, marginBottom: 12 }}>Pre-built Templates</div>
          <div style={{ display: "flex", gap: 12 }}>
            {TEMPLATES.map((t) => (
              <div
                key={t.name}
                style={{
                  border: `1.5px solid ${T.border}`,
                  borderRadius: 10,
                  padding: "12px 16px",
                  flex: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#3b82f6″; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = T.border; }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: t.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <LayoutDashboard style={{ width: 16, height: 16, color: "#fff" }} />
                </div>
                <div>
                  <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 13, color: T.text }}>{t.name}</div>
                  <div style={{ fontFamily: FONT, fontSize: 11, color: T.muted, marginTop: 2 }}>{t.desc}</div>
                  <div style={{ fontFamily: FONT, fontSize: 10, color: T.muted, marginTop: 2 }}>{t.widgets} widgets</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-column builder layout */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 260px", gap: 16, alignItems: "start" }}>
          {/* Left: Widget library */}
          <div
            style={{
              backgroundColor: T.card,
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              padding: "16px",
            }}
          >
            <div style={{ ...LABEL, marginBottom: 12 }}>Widget Library</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {WIDGET_LIBRARY.map((def) => (
                <SmallWidgetTile key={def.id} def={def} onAdd={addWidget} />
              ))}
            </div>
            <div style={{ marginTop: 12, fontFamily: FONT, fontSize: 10, color: T.muted, textAlign: "center" }}>
              Click to add to canvas
            </div>
          </div>

          {/* Center: Canvas */}
          <div
            style={{
              backgroundColor: T.card,
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              padding: "16px 20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={LABEL}>Canvas — {widgets.length} widgets</div>
              <button
                onClick={() => addWidget("metric")}
                style={{
                  background: BADGE_GRADIENTS.cyan,
                  color: "#fff",
                  border: "none",
                  borderRadius: 7,
                  padding: "4px 12px",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 11,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Plus style={{ width: 11, height: 11 }} /> Add Widget
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                minHeight: 300,
                background: T.bg,
                borderRadius: 10,
                padding: 12,
              }}
            >
              {widgets.map((w) => {
                const def = WIDGET_LIBRARY.find((d) => d.id === w.widgetId) ?? WIDGET_LIBRARY[0];
                return (
                  <CanvasWidget
                    key={w.instanceId}
                    placed={w}
                    def={def}
                    isSelected={selectedInstance === w.instanceId}
                    onSelect={() => setSelectedInstance(w.instanceId)}
                    onRemove={() => removeWidget(w.instanceId)}
                  />
                );
              })}
              {widgets.length < 6 && (
                <div
                  onClick={() => addWidget("metric")}
                  style={{
                    border: `2px dashed ${T.border}`,
                    borderRadius: 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: "pointer",
                    minHeight: 120,
                    color: T.muted,
                  }}
                >
                  <Plus style={{ width: 20, height: 20 }} />
                  <div style={{ fontFamily: FONT, fontSize: 11 }}>Add widget</div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Config panel */}
          <div
            style={{
              backgroundColor: T.card,
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <Settings2 style={{ width: 14, height: 14, color: T.muted }} />
              <div style={LABEL}>Widget Config</div>
            </div>
            {selectedWidget && selectedDef ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Widget identity */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    background: `${selectedDef.color}12`,
                    borderRadius: 10,
                    border: `1.5px solid ${selectedDef.color}33`,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: `${selectedDef.color}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {React.createElement(selectedDef.icon, { style: { width: 14, height: 14, color: selectedDef.color } })}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 12, color: T.text }}>{selectedWidget.title}</div>
                    <div style={{ fontFamily: FONT, fontSize: 10, color: T.muted }}>{selectedDef.name}</div>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <div style={{ ...LABEL, marginBottom: 6 }}>Widget Title</div>
                  <input
                    value={selectedWidget.title}
                    onChange={(e) => {
                      setWidgets((prev) =>
                        prev.map((w) =>
                          w.instanceId === selectedWidget.instanceId ? { ...w, title: e.target.value } : w
                        )
                      );
                    }}
                    style={{
                      width: "100%",
                      border: `1.5px solid ${T.border}`,
                      borderRadius: 8,
                      padding: "7px 10px",
                      fontFamily: FONT,
                      fontSize: 12,
                      color: T.text,
                      background: T.bg,
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Data source */}
                <div>
                  <div style={{ ...LABEL, marginBottom: 6 }}>Data Source</div>
                  <select
                    value={configState[selectedWidget.instanceId]?.source ?? DATA_SOURCES[0]}
                    onChange={(e) =>
                      setConfigState((prev) => ({
                        ...prev,
                        [selectedWidget.instanceId]: { ...prev[selectedWidget.instanceId], source: e.target.value },
                      }))
                    }
                    style={{
                      width: "100%",
                      border: `1.5px solid ${T.border}`,
                      borderRadius: 8,
                      padding: "7px 10px",
                      fontFamily: FONT,
                      fontSize: 12,
                      color: T.text,
                      background: T.bg,
                    }}
                  >
                    {DATA_SOURCES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <div style={{ ...LABEL, marginBottom: 6 }}>Accent Color</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["#3b82f6″, "#10b981", T.amber, "#ec4899", "#8b5cf6", "#ef4444"].map((c) => (
                      <div
                        key={c}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: c,
                          cursor: "pointer",
                          border: selectedDef.color === c ? "2px solid #000″ : "2px solid transparent",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Date range */}
                <div>
                  <div style={{ ...LABEL, marginBottom: 6 }}>Date Range</div>
                  <select
                    value={configState[selectedWidget.instanceId]?.range ?? DATE_RANGES[1]}
                    onChange={(e) =>
                      setConfigState((prev) => ({
                        ...prev,
                        [selectedWidget.instanceId]: { ...prev[selectedWidget.instanceId], range: e.target.value },
                      }))
                    }
                    style={{
                      width: "100%",
                      border: `1.5px solid ${T.border}`,
                      borderRadius: 8,
                      padding: "7px 10px",
                      fontFamily: FONT,
                      fontSize: 12,
                      color: T.text,
                      background: T.bg,
                    }}
                  >
                    {DATE_RANGES.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Refresh interval */}
                <div>
                  <div style={{ ...LABEL, marginBottom: 6 }}>Refresh Interval</div>
                  <select
                    value={configState[selectedWidget.instanceId]?.refresh ?? REFRESH_INTERVALS[2]}
                    onChange={(e) =>
                      setConfigState((prev) => ({
                        ...prev,
                        [selectedWidget.instanceId]: { ...prev[selectedWidget.instanceId], refresh: e.target.value },
                      }))
                    }
                    style={{
                      width: "100%",
                      border: `1.5px solid ${T.border}`,
                      borderRadius: 8,
                      padding: "7px 10px",
                      fontFamily: FONT,
                      fontSize: 12,
                      color: T.text,
                      background: T.bg,
                    }}
                  >
                    {REFRESH_INTERVALS.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 0″,
                  color: T.muted,
                  fontFamily: FONT,
                  fontSize: 12,
                }}
              >
                Select a widget on the canvas to configure it.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
