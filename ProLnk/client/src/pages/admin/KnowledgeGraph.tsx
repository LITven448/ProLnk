import { useEffect, useRef, useState, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Network, RefreshCw, ZoomIn, ZoomOut, Maximize2,
  CheckCircle2, Clock, Zap, AlertTriangle, Bot,
  DollarSign, GitBranch, Shield, TrendingUp, Users,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type NodeType = "holding" | "business" | "agent" | "integration" | "revenue";
type NodeStatus = "active" | "in-dev" | "planned" | "error";

interface GNode {
  id: string;
  label: string;
  sublabel?: string;
  type: NodeType;
  status: NodeStatus;
  description: string;
  parent?: string;
  // simulation state
  x: number; y: number; vx: number; vy: number;
  pinned?: boolean;
}

interface GEdge {
  source: string;
  target: string;
  label?: string;
  weight: number; // 0-1, higher = shorter ideal length
}

// ─── Graph Data ───────────────────────────────────────────────────────────────

const RAW_NODES: Omit<GNode, "x"|"y"|"vx"|"vy">[] = [
  // Holding
  { id: "journy-works", label: "Journy Works", sublabel: "Holding Company", type: "holding", status: "active", description: "Parent holding company. Owns ProLnk and TrustyPro. Andrew is 75% owner; Lit Ventures holds 15%." },

  // Businesses
  { id: "prolnk", label: "ProLnk", sublabel: "B2B SaaS", type: "business", status: "active", description: "AI-powered home services partner network. Subscription-based (Connect/Growth/Elite) with commission revenue on completed jobs.", parent: "journy-works" },
  { id: "trustypro", label: "TrustyPro", sublabel: "B2C Platform", type: "business", status: "in-dev", description: "AI photo analysis platform. Homeowners upload room/yard photos → AI detects 150+ issue categories → matched to vetted ProLnk partners.", parent: "journy-works" },

  // ProLnk Agents
  { id: "storm-agent", label: "Storm Agent", sublabel: "ProLnk", type: "agent", status: "active", description: "Monitors NOAA weather data. Triggers post-storm outreach to all partners in affected zip codes within 2 hours of event.", parent: "prolnk" },
  { id: "lead-scoring", label: "Lead Scoring Agent", sublabel: "ProLnk", type: "agent", status: "active", description: "Scores inbound partner applications using trade category, zip code density, tier fit, and review history.", parent: "prolnk" },
  { id: "referral-agent", label: "Referral Agent", sublabel: "ProLnk", type: "agent", status: "active", description: "Tracks referral links, attributes signups, calculates commission splits, and triggers Stripe payouts to referring partners.", parent: "prolnk" },
  { id: "comm-agent", label: "Comm Sequence Agent", sublabel: "ProLnk", type: "agent", status: "active", description: "Sends automated onboarding, nurture, and re-engagement email/SMS sequences to partners via Resend + n8n.", parent: "prolnk" },
  { id: "market-expand", label: "Market Expansion Agent", sublabel: "ProLnk", type: "agent", status: "in-dev", description: "Identifies underserved zip codes using partner density data. Surfaces expansion opportunities to admin dashboard.", parent: "prolnk" },
  { id: "partner-health", label: "Partner Health Agent", sublabel: "ProLnk", type: "agent", status: "planned", description: "Monitors partner activity scores. Flags at-risk accounts and triggers intervention sequences before churn.", parent: "prolnk" },

  // TrustyPro Agents
  { id: "photo-analysis", label: "Photo Analysis Agent", sublabel: "TrustyPro", type: "agent", status: "in-dev", description: "Runs GPT-4o vision + computer vision on homeowner photos. Detects 150+ issue categories. Returns structured JSON with severity, category, and recommended trade.", parent: "trustypro" },
  { id: "quality-gate", label: "Quality Gate Agent", sublabel: "TrustyPro", type: "agent", status: "planned", description: "Pre-screens photos for blur, darkness, and coverage before passing to the analysis pipeline. Rejects unusable images with user-friendly feedback.", parent: "trustypro" },
  { id: "pro-match", label: "Pro Match Agent", sublabel: "TrustyPro", type: "agent", status: "planned", description: "Routes detected issues to the highest-scored ProLnk partner in the homeowner's zip code. Considers tier, trade category, and availability.", parent: "trustypro" },
  { id: "home-vault", label: "Home Vault Agent", sublabel: "TrustyPro", type: "agent", status: "planned", description: "Builds and maintains a persistent encrypted property profile. Tracks issue history, repair forecasts, and home value impact over time.", parent: "trustypro" },
  { id: "homeowner-nurture", label: "Homeowner Nurture Agent", sublabel: "TrustyPro", type: "agent", status: "planned", description: "Automated follow-up sequences for waitlist, scan-pending, and post-job homeowners. Personalized by property type and detected issues.", parent: "trustypro" },

  // Shared Integrations
  { id: "stripe", label: "Stripe", sublabel: "Payments", type: "integration", status: "active", description: "Payment processing for subscriptions, commission collection, and Stripe Connect payouts to referring partners." },
  { id: "n8n", label: "n8n", sublabel: "Automation", type: "integration", status: "active", description: "Workflow automation hub connecting all agents, webhooks, and third-party services. Separate instances per business entity." },
  { id: "resend", label: "Resend", sublabel: "Email", type: "integration", status: "active", description: "Transactional email delivery for all partner and homeowner communications. React Email templates." },
  { id: "openai", label: "GPT-4o Vision", sublabel: "OpenAI", type: "integration", status: "active", description: "Vision and language model powering photo analysis, lead scoring, and content generation. Called server-side only." },
  { id: "noaa", label: "NOAA API", sublabel: "Weather", type: "integration", status: "active", description: "Real-time weather event data feeding the Storm Agent trigger system. Monitors hail, wind, and flood events by zip code." },

  // Revenue
  { id: "prolnk-rev", label: "ProLnk Revenue", sublabel: "MRR + Commission", type: "revenue", status: "active", description: "Subscription fees (Connect $49 / Growth $99 / Elite $199) + commission share from partner-completed jobs.", parent: "prolnk" },
  { id: "trustypro-rev", label: "TrustyPro Revenue", sublabel: "Homeowner Subs", type: "revenue", status: "planned", description: "Homeowner subscriptions + commission share from TrustyPro-originated jobs. Referral partner splits included.", parent: "trustypro" },
];

const EDGES: GEdge[] = [
  // Holding → Business
  { source: "journy-works", target: "prolnk", label: "owns", weight: 0.9 },
  { source: "journy-works", target: "trustypro", label: "owns", weight: 0.9 },

  // ProLnk → Agents
  { source: "prolnk", target: "storm-agent", weight: 0.7 },
  { source: "prolnk", target: "lead-scoring", weight: 0.7 },
  { source: "prolnk", target: "referral-agent", weight: 0.7 },
  { source: "prolnk", target: "comm-agent", weight: 0.7 },
  { source: "prolnk", target: "market-expand", weight: 0.6 },
  { source: "prolnk", target: "partner-health", weight: 0.6 },

  // TrustyPro → Agents
  { source: "trustypro", target: "photo-analysis", weight: 0.7 },
  { source: "trustypro", target: "quality-gate", weight: 0.7 },
  { source: "trustypro", target: "pro-match", weight: 0.7 },
  { source: "trustypro", target: "home-vault", weight: 0.6 },
  { source: "trustypro", target: "homeowner-nurture", weight: 0.6 },

  // Cross-business
  { source: "prolnk", target: "trustypro", label: "shares partners", weight: 0.3 },
  { source: "pro-match", target: "prolnk", label: "routes to", weight: 0.4 },

  // Integrations
  { source: "prolnk", target: "stripe", weight: 0.5 },
  { source: "trustypro", target: "stripe", weight: 0.5 },
  { source: "prolnk", target: "n8n", weight: 0.5 },
  { source: "trustypro", target: "n8n", weight: 0.5 },
  { source: "prolnk", target: "resend", weight: 0.4 },
  { source: "trustypro", target: "resend", weight: 0.4 },
  { source: "photo-analysis", target: "openai", weight: 0.7 },
  { source: "lead-scoring", target: "openai", weight: 0.4 },
  { source: "storm-agent", target: "noaa", weight: 0.7 },
  { source: "referral-agent", target: "stripe", weight: 0.5 },
  { source: "comm-agent", target: "resend", weight: 0.6 },
  { source: "comm-agent", target: "n8n", weight: 0.6 },

  // Revenue
  { source: "prolnk", target: "prolnk-rev", weight: 0.6 },
  { source: "trustypro", target: "trustypro-rev", weight: 0.6 },
  { source: "stripe", target: "prolnk-rev", weight: 0.4 },
  { source: "stripe", target: "trustypro-rev", weight: 0.4 },
];

// ─── Style Maps ───────────────────────────────────────────────────────────────

const TYPE_COLOR: Record<NodeType, string> = {
  holding:     "#00D4FF",
  business:    "#3b82f6",
  agent:       "#22c55e",
  integration: "#f59e0b",
  revenue:     "#f97316",
};

const STATUS_COLOR: Record<NodeStatus, string> = {
  active:   "#22c55e",
  "in-dev": "#eab308",
  planned:  "#64748b",
  error:    "#ef4444",
};

const TYPE_RADIUS: Record<NodeType, number> = {
  holding:     36,
  business:    30,
  agent:       20,
  integration: 18,
  revenue:     16,
};

// ─── Force Simulation ─────────────────────────────────────────────────────────

function initNodes(w: number, h: number): GNode[] {
  const cx = w / 2, cy = h / 2;
  return RAW_NODES.map((n) => ({
    ...n,
    x: cx + (Math.random() - 0.5) * Math.min(w, h) * 0.6,
    y: cy + (Math.random() - 0.5) * Math.min(w, h) * 0.5,
    vx: 0, vy: 0,
  }));
}

function runTick(nodes: GNode[], edges: GEdge[], w: number, h: number, alpha: number): GNode[] {
  const cx = w / 2, cy = h / 2;
  const ns = nodes.map(n => ({ ...n }));
  const byId: Record<string, GNode> = {};
  for (const n of ns) byId[n.id] = n;

  // Repulsion
  for (let i = 0; i < ns.length; i++) {
    for (let j = i + 1; j < ns.length; j++) {
      const dx = ns[j].x - ns[i].x;
      const dy = ns[j].y - ns[i].y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const minDist = (TYPE_RADIUS[ns[i].type] + TYPE_RADIUS[ns[j].type]) * 4;
      const f = (minDist * minDist) / (d * d) * alpha * 0.8;
      ns[i].vx -= (dx / d) * f;
      ns[i].vy -= (dy / d) * f;
      ns[j].vx += (dx / d) * f;
      ns[j].vy += (dy / d) * f;
    }
  }

  // Spring attraction
  for (const e of edges) {
    const a = byId[e.source];
    const b = byId[e.target];
    if (!a || !b) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1;
    const ideal = 80 + (1 - e.weight) * 120;
    const f = ((d - ideal) / d) * 0.06 * alpha;
    a.vx += dx * f; a.vy += dy * f;
    b.vx -= dx * f; b.vy -= dy * f;
  }

  // Gravity toward center
  for (const n of ns) {
    n.vx += (cx - n.x) * 0.004 * alpha;
    n.vy += (cy - n.y) * 0.004 * alpha;
    // Damping
    n.vx *= 0.82; n.vy *= 0.82;
    // Apply
    n.x += n.vx; n.y += n.vy;
    // Bounds
    const r = TYPE_RADIUS[n.type];
    n.x = Math.max(r + 10, Math.min(w - r - 10, n.x));
    n.y = Math.max(r + 10, Math.min(h - r - 10, n.y));
  }

  return ns;
}

// ─── Icons for node types ─────────────────────────────────────────────────────

const TYPE_ICON_CHAR: Record<NodeType, string> = {
  holding: "◈",
  business: "◉",
  agent: "⬡",
  integration: "◆",
  revenue: "$",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const nodesRef = useRef<GNode[]>([]);
  const animRef = useRef<number>(0);
  const tickRef = useRef(0);
  const [selected, setSelected] = useState<GNode | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState<NodeType | "all">("all");
  const [simKey, setSimKey] = useState(0);
  const isDraggingCanvas = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const draggingNode = useRef<GNode | null>(null);

  // Resize observer
  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDims({ w: width, h: height });
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Init simulation
  useEffect(() => {
    if (dims.w === 0) return;
    nodesRef.current = initNodes(dims.w, dims.h);
    tickRef.current = 0;
  }, [dims.w, dims.h, simKey]);

  // Filtered data
  const visibleNodes = filter === "all"
    ? nodesRef.current
    : nodesRef.current.filter(n => n.type === filter || n.type === "holding" || n.type === "business");
  const visibleEdges = EDGES.filter(e =>
    visibleNodes.some(n => n.id === e.source) && visibleNodes.some(n => n.id === e.target)
  );

  // Canvas draw loop
  useEffect(() => {
    if (dims.w === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const MAX_TICKS = 400;

    function draw() {
      if (!ctx || !canvas) return;
      const { w, h } = dims;

      // Advance simulation
      if (tickRef.current < MAX_TICKS) {
        const alpha = Math.max(0.01, 1 - tickRef.current / MAX_TICKS);
        const filtered = filter === "all"
          ? nodesRef.current
          : nodesRef.current.filter(n => n.type === filter || n.type === "holding" || n.type === "business");
        const filteredEdges = EDGES.filter(e =>
          filtered.some(n => n.id === e.source) && filtered.some(n => n.id === e.target)
        );
        const updated = runTick(nodesRef.current, filteredEdges, w, h, alpha);
        nodesRef.current = updated;
        tickRef.current++;
      }

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = "#0a0f1a";
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      ctx.restore();

      // Apply pan + zoom
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      const nodeMap: Record<string, GNode> = {};
      for (const n of nodesRef.current) nodeMap[n.id] = n;

      const vNodes = filter === "all"
        ? nodesRef.current
        : nodesRef.current.filter(n => n.type === filter || n.type === "holding" || n.type === "business");
      const vEdges = EDGES.filter(e =>
        vNodes.some(n => n.id === e.source) && vNodes.some(n => n.id === e.target)
      );

      // Draw edges
      for (const edge of vEdges) {
        const a = nodeMap[edge.source];
        const b = nodeMap[edge.target];
        if (!a || !b) continue;
        const isHighlighted = selected?.id === a.id || selected?.id === b.id;
        ctx.save();
        ctx.strokeStyle = isHighlighted ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.07)";
        ctx.lineWidth = isHighlighted ? 1.5 : 1;
        ctx.setLineDash(edge.label ? [4, 4] : []);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Edge label
        if (edge.label && isHighlighted) {
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          ctx.font = "9px system-ui";
          ctx.fillStyle = "rgba(255,255,255,0.4)";
          ctx.textAlign = "center";
          ctx.fillText(edge.label, mx, my - 4);
        }

        // Arrowhead
        const angle = Math.atan2(b.y - a.y, b.x - a.x);
        const r = TYPE_RADIUS[b.type] + 4;
        const ax = b.x - Math.cos(angle) * r;
        const ay = b.y - Math.sin(angle) * r;
        ctx.fillStyle = isHighlighted ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)";
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - Math.cos(angle - 0.4) * 8, ay - Math.sin(angle - 0.4) * 8);
        ctx.lineTo(ax - Math.cos(angle + 0.4) * 8, ay - Math.sin(angle + 0.4) * 8);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Draw nodes
      for (const node of vNodes) {
        const color = TYPE_COLOR[node.type];
        const statusColor = STATUS_COLOR[node.status];
        const r = TYPE_RADIUS[node.type];
        const isSelected = selected?.id === node.id;
        const isHovered = hoveredId === node.id;

        ctx.save();

        // Glow
        if (isSelected || isHovered) {
          const grd = ctx.createRadialGradient(node.x, node.y, r, node.x, node.y, r * 2.5);
          grd.addColorStop(0, color + "40");
          grd.addColorStop(1, "transparent");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Outer ring (selected)
        if (isSelected) {
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Background fill
        const bgGrd = ctx.createRadialGradient(node.x - r * 0.3, node.y - r * 0.3, 0, node.x, node.y, r);
        bgGrd.addColorStop(0, color + "30");
        bgGrd.addColorStop(1, color + "10");
        ctx.fillStyle = bgGrd;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = color;
        ctx.lineWidth = node.type === "holding" ? 2.5 : 1.5;
        ctx.globalAlpha = isSelected || isHovered ? 1 : 0.8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Icon char
        ctx.font = `bold ${Math.round(r * 0.65)}px system-ui`;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(TYPE_ICON_CHAR[node.type], node.x, node.y);

        // Status dot
        const sdx = node.x + r * 0.72;
        const sdy = node.y - r * 0.72;
        ctx.fillStyle = "#0a0f1a";
        ctx.beginPath();
        ctx.arc(sdx, sdy, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = statusColor;
        ctx.beginPath();
        ctx.arc(sdx, sdy, 4, 0, Math.PI * 2);
        ctx.fill();

        // Label
        const labelY = node.y + r + 14;
        ctx.font = `${node.type === "holding" ? "bold 12" : node.type === "business" ? "bold 11" : "500 9"}px system-ui`;
        ctx.fillStyle = isSelected ? color : "rgba(255,255,255,0.85)";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(node.label, node.x, labelY);

        if (node.sublabel) {
          ctx.font = "8px system-ui";
          ctx.fillStyle = color + "80";
          ctx.fillText(node.sublabel, node.x, labelY + 13);
        }

        ctx.restore();
      }

      ctx.restore(); // end pan/zoom

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [dims, zoom, pan, filter, hoveredId, selected, simKey]);

  // Mouse interaction helpers
  const canvasToWorld = useCallback((cx: number, cy: number) => ({
    x: (cx - pan.x) / zoom,
    y: (cy - pan.y) / zoom,
  }), [pan, zoom]);

  const getNodeAt = useCallback((wx: number, wy: number) => {
    const vNodes = filter === "all"
      ? nodesRef.current
      : nodesRef.current.filter(n => n.type === filter || n.type === "holding" || n.type === "business");
    for (let i = vNodes.length - 1; i >= 0; i--) {
      const n = vNodes[i];
      const dx = wx - n.x, dy = wy - n.y;
      if (Math.sqrt(dx * dx + dy * dy) <= TYPE_RADIUS[n.type] + 6) return n;
    }
    return null;
  }, [filter]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const { x, y } = canvasToWorld(e.clientX - rect.left, e.clientY - rect.top);

    if (draggingNode.current) {
      draggingNode.current.x = x;
      draggingNode.current.y = y;
      draggingNode.current.vx = 0;
      draggingNode.current.vy = 0;
      tickRef.current = 0; // restart sim
      return;
    }
    if (isDraggingCanvas.current) {
      setPan({ x: dragStart.current.px + (e.clientX - dragStart.current.mx), y: dragStart.current.py + (e.clientY - dragStart.current.my) });
      return;
    }
    const node = getNodeAt(x, y);
    setHoveredId(node?.id ?? null);
    if (canvasRef.current) canvasRef.current.style.cursor = node ? "pointer" : "grab";
  }, [canvasToWorld, getNodeAt]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const { x, y } = canvasToWorld(e.clientX - rect.left, e.clientY - rect.top);
    const node = getNodeAt(x, y);
    if (node) {
      draggingNode.current = nodesRef.current.find(n => n.id === node.id) ?? null;
    } else {
      isDraggingCanvas.current = true;
      dragStart.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
    }
  }, [canvasToWorld, getNodeAt, pan]);

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    if (draggingNode.current) {
      const rect = canvasRef.current!.getBoundingClientRect();
      const { x, y } = canvasToWorld(e.clientX - rect.left, e.clientY - rect.top);
      const dx = x - draggingNode.current.x;
      const dy = y - draggingNode.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < 5) {
        // It was a click, not a drag
        const clicked = RAW_NODES.find(n => n.id === draggingNode.current!.id) as GNode | undefined;
        setSelected(prev => prev?.id === draggingNode.current!.id ? null : (clicked ?? null));
      }
      draggingNode.current = null;
    }
    isDraggingCanvas.current = false;
  }, [canvasToWorld]);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setZoom(z => Math.max(0.25, Math.min(4, z * (1 - e.deltaY * 0.001))));
  }, []);

  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
  const rerun = () => { setSimKey(k => k + 1); setSelected(null); };

  const stats = {
    active: RAW_NODES.filter(n => n.status === "active").length,
    inDev: RAW_NODES.filter(n => n.status === "in-dev").length,
    planned: RAW_NODES.filter(n => n.status === "planned").length,
    agents: RAW_NODES.filter(n => n.type === "agent").length,
    integrations: RAW_NODES.filter(n => n.type === "integration").length,
  };

  const selectedConnections = selected
    ? EDGES.filter(e => e.source === selected.id || e.target === selected.id).map(e => {
        const otherId = e.source === selected.id ? e.target : e.source;
        const other = RAW_NODES.find(n => n.id === otherId);
        return { other, dir: e.source === selected.id ? "→" : "←", label: e.label };
      }).filter(c => c.other)
    : [];

  return (
    <AdminLayout>
      <div className="flex flex-col h-[calc(100vh-64px)] bg-[#0a0f1a] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/10 bg-[#0d1420] shrink-0">
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <Network className="w-4 h-4 text-[#00D4FF]" />
              Journy Works — Knowledge Graph
            </h1>
            <p className="text-[11px] text-white/40 mt-0.5">ProLnk · TrustyPro · Agents · Integrations · Revenue</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3 mr-3 text-[11px] text-white/50">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />{stats.active} Active</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />{stats.inDev} In Dev</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />{stats.planned} Planned</span>
              <span className="flex items-center gap-1 text-[#22c55e]"><Bot className="w-3 h-3" />{stats.agents} Agents</span>
            </div>
            <Button size="sm" variant="outline" onClick={() => setZoom(z => Math.min(4, z + 0.2))} className="border-white/20 text-white/70 bg-transparent hover:bg-white/10 h-7 w-7 p-0"><ZoomIn className="w-3.5 h-3.5" /></Button>
            <Button size="sm" variant="outline" onClick={() => setZoom(z => Math.max(0.25, z - 0.2))} className="border-white/20 text-white/70 bg-transparent hover:bg-white/10 h-7 w-7 p-0"><ZoomOut className="w-3.5 h-3.5" /></Button>
            <Button size="sm" variant="outline" onClick={resetView} className="border-white/20 text-white/70 bg-transparent hover:bg-white/10 h-7 w-7 p-0"><Maximize2 className="w-3.5 h-3.5" /></Button>
            <Button size="sm" variant="outline" onClick={rerun} className="border-white/20 text-white/70 bg-transparent hover:bg-white/10 h-7 px-2 text-xs gap-1"><RefreshCw className="w-3 h-3" />Re-run</Button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 px-5 py-2 border-b border-white/10 bg-[#0d1420] shrink-0">
          {(["all", "agent", "integration", "revenue"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${filter === f ? "bg-[#00D4FF] text-[#0a0f1a]" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
            </button>
          ))}
          <span className="text-[10px] text-white/25 ml-2">Scroll to zoom · Drag canvas to pan · Drag nodes to reposition · Click for details</span>
        </div>

        {/* Canvas + Detail panel */}
        <div className="flex flex-1 overflow-hidden">
          <div ref={containerRef} className="flex-1 relative">
            <canvas
              ref={canvasRef}
              width={dims.w}
              height={dims.h}
              className="absolute inset-0"
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => { isDraggingCanvas.current = false; draggingNode.current = null; setHoveredId(null); }}
              onWheel={handleWheel}
              style={{ cursor: "grab" }}
            />

            {/* Legend overlay */}
            <div className="absolute bottom-4 left-4 bg-[#0d1420]/90 backdrop-blur border border-white/10 rounded-xl p-3 space-y-1.5 pointer-events-none">
              {(Object.entries(TYPE_COLOR) as [NodeType, string][]).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2 text-[10px] text-white/55">
                  <span className="w-3 h-3 rounded-full border-2 inline-block shrink-0" style={{ borderColor: color, backgroundColor: color + "20" }} />
                  {type === "holding" ? "Holding Co" : type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
              ))}
              <div className="border-t border-white/10 pt-1.5 mt-1 space-y-1">
                {(Object.entries(STATUS_COLOR) as [NodeStatus, string][]).map(([s, c]) => (
                  <div key={s} className="flex items-center gap-2 text-[10px] text-white/45">
                    <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: c }} />
                    {s === "in-dev" ? "In Dev" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="w-72 border-l border-white/10 bg-[#0d1420] p-4 overflow-y-auto shrink-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-bold mb-1" style={{ color: TYPE_COLOR[selected.type] }}>{selected.label}</div>
                  {selected.sublabel && <div className="text-[10px] text-white/40 mb-1.5">{selected.sublabel}</div>}
                  <div className="flex items-center gap-2">
                    <Badge className="text-[10px] px-2 py-0.5 border-0" style={{ backgroundColor: TYPE_COLOR[selected.type] + "20", color: TYPE_COLOR[selected.type] }}>
                      {selected.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-[10px] font-medium" style={{ color: STATUS_COLOR[selected.status] }}>
                      {selected.status === "active" && <CheckCircle2 className="w-3 h-3" />}
                      {selected.status === "in-dev" && <Zap className="w-3 h-3" />}
                      {selected.status === "planned" && <Clock className="w-3 h-3" />}
                      {selected.status === "error" && <AlertTriangle className="w-3 h-3" />}
                      {selected.status === "in-dev" ? "In Dev" : selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white/70 text-xl leading-none mt-0.5">×</button>
              </div>

              <p className="text-[11px] text-white/60 leading-relaxed mb-4">{selected.description}</p>

              {selectedConnections.length > 0 && (
                <>
                  <div className="text-[10px] font-semibold text-white/35 uppercase tracking-wider mb-2">Connections ({selectedConnections.length})</div>
                  <div className="space-y-1.5">
                    {selectedConnections.map((c, i) => {
                      const other = c.other!;
                      return (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-white/50 cursor-pointer hover:text-white/80 transition-colors" onClick={() => setSelected(other as GNode)}>
                          <span className="text-white/25 font-mono">{c.dir}</span>
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: TYPE_COLOR[(other as GNode).type] }} />
                          <span>{other.label}</span>
                          {c.label && <span className="text-white/25 italic text-[10px]">({c.label})</span>}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {selected.parent && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="text-[10px] font-semibold text-white/35 uppercase tracking-wider mb-1.5">Parent Entity</div>
                  <div className="text-[11px] cursor-pointer hover:opacity-80 transition-opacity" style={{ color: TYPE_COLOR["business"] }} onClick={() => setSelected(RAW_NODES.find(n => n.id === selected.parent) as GNode ?? null)}>
                    {RAW_NODES.find(n => n.id === selected.parent)?.label}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
