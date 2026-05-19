import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Camera,
  Cpu,
  Network,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Thermometer,
  Home,
  Plug,
  Droplets,
  Wind,
  TreePine,
  AlertTriangle,
  Filter,
  Eye,
  UserCheck,
  Send,
  Lock,
} from "lucide-react";

const TEAL = "#14b8a6″;
const NAVY = "#0A1628″;

const PIPELINE_STEPS = [
  {
    step: "01″,
    icon: Camera,
    title: "Pro uploads job site photos",
    body: "While finishing a job on any trade — HVAC, roofing, plumbing, electrical — the partner snaps photos of visible home systems using our field app. Takes under 30 seconds. Works on any smartphone.",
    highlight: "Any trade · Any job · 30 seconds",
    color: TEAL,
  },
  {
    step: "02″,
    icon: Eye,
    title: "Vision AI scans for condition indicators",
    body: "Our AI analyzes every photo for 65+ condition indicators: roof granule loss, HVAC age, foundation cracks, moisture stains, electrical panel age, plumbing material type, and more — all from a single image.",
    highlight: "65+ condition categories detected",
    color: "#6366f1″,
  },
  {
    step: "03″,
    icon: Filter,
    title: "Quality gate: cheap model filters first",
    body: "Before deep analysis, a lightweight model runs a quality check. Blurry photos, non-relevant images, and unusable uploads are filtered out automatically — saving compute costs and keeping the signal clean.",
    highlight: "Blurry & off-topic photos discarded",
    color: "#f59e0b",
  },
  {
    step: "04″,
    icon: Cpu,
    title: "Opportunity analysis: deeper model assesses each issue",
    body: "Photos that pass quality screening are handed to a deeper vision model that assesses each detected issue for lead potential — severity, urgency, likely cost range, and which trade is best positioned to close it.",
    highlight: "Severity · Urgency · Trade match",
    color: "#8b5cf6″,
  },
  {
    step: "05″,
    icon: UserCheck,
    title: "Admin review: human-in-the-loop quality control",
    body: "Before any homeowner is contacted, a ProLnk admin reviews AI findings for accuracy. This human-in-the-loop layer ensures homeowners only receive relevant, verified outreach — not machine noise.",
    highlight: "Human approval before homeowner contact",
    color: "#ef4444″,
  },
  {
    step: "06″,
    icon: Send,
    title: "Lead dispatch: matched homeowners receive personalized quote requests",
    body: "Once approved, the system identifies the homeowner associated with the property and sends a personalized outreach explaining what was noticed and offering to connect them with a vetted contractor.",
    highlight: "Personalized · Relevant · Opted-in only",
    color: "#22c55e",
  },
];

const AI_ACCURACY = [
  { label: "HVAC age identification", pct: 94, color: TEAL },
  { label: "Roof damage detection", pct: 89, color: "#f59e0b" },
  { label: "Electrical panel identification", pct: 97, color: "#a78bfa" },
  { label: "Water damage indicators", pct: 91, color: "#3b82f6″ },
  { label: "Foundation crack detection", pct: 86, color: "#ef4444″ },
  { label: "Plumbing material identification", pct: 93, color: "#22c55e" },
];

const WHAT_AI_SEES = [
  {
    icon: Wind,
    label: "Outdoor HVAC condenser",
    color: TEAL,
    bg: "rgba(20,184,166,0.1)",
    reveals: ["Unit manufacturer and model range", "Estimated installation decade", "Refrigerant line condition", "Coil fin cleanliness", "Likelihood of R-22 vs modern refrigerant"],
  },
  {
    icon: Home,
    label: "Roof surface photo",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    reveals: ["Shingle granule loss percentage", "Estimated remaining life", "Moss or algae presence", "Flashing and ridge cap wear", "Gutter attachment condition"],
  },
  {
    icon: Plug,
    label: "Electrical panel",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    reveals: ["Panel age and manufacturer", "Amp capacity estimate", "Federal Pacific / Zinsco flags", "Breaker condition at a glance", "EV charger upgrade potential"],
  },
  {
    icon: Droplets,
    label: "Water heater",
    color: "#3b82f6″,
    bg: "rgba(59,130,246,0.1)",
    reveals: ["Tank vs. tankless identification", "Estimated unit age", "Sediment and corrosion indicators", "Pipe material and connection type", "Replacement urgency signal"],
  },
  {
    icon: AlertTriangle,
    label: "Foundation or crawl space",
    color: "#ef4444″,
    bg: "rgba(239,68,68,0.1)",
    reveals: ["Crack pattern classification", "Horizontal vs. vertical vs. diagonal", "Settlement indicators", "Moisture staining presence", "Immediate vs. monitor classification"],
  },
  {
    icon: Home,
    label: "Interior ceiling or wall",
    color: "#e879f9″,
    bg: "rgba(232,121,249,0.1)",
    reveals: ["Water stain age estimation", "Active vs. dried moisture", "Mold probability score", "Insulation visibility", "Source trade identification (plumbing vs. roof)"],
  },
];

export default function HowAIWorks() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: NAVY }}>
      <Helmet>
        <title>How ProLnk AI Works | Photo Intelligence Pipeline</title>
        <meta
          name="description"
          content="ProLnk's AI analyzes job site photos in under 2 seconds, detecting 65+ categories of home systems and routing leads automatically to licensed pros in your network."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-teal-900/40″>
        <div
          className="absolute inset-0 opacity-10″
          style={{ backgroundImage: "radial-gradient(ellipse at 60% 40%, #14b8a6 0%, transparent 60%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5 mb-8″>
            <Zap className="w-3.5 h-3.5 text-teal-400″ />
            <span className="text-teal-400 text-sm font-medium">Sub-2-second analysis</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6″>
            ProLnk's AI turns job photos
            <br />
            <span style={{ color: TEAL }}>into revenue.</span>
            <br />
            <span className="text-slate-300″>Here's how.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every photo a partner uploads is a scan of the homeowner's systems. Our AI identifies 65+ categories of work, then routes those opportunities as leads — automatically, in real time.
          </p>
        </div>
      </section>

      {/* Photo-to-Lead Pipeline */}
      <section className="max-w-5xl mx-auto px-6 py-20″>
        <div className="text-center mb-14″>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6″ style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.25)" }}>
            <Camera className="w-3.5 h-3.5″ style={{ color: TEAL }} />
            <span className="text-sm font-semibold" style={{ color: TEAL }}>THE PHOTO-TO-LEAD PIPELINE</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3″>Six steps from shutter to lead</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every photo runs through a multi-stage pipeline designed for accuracy, privacy, and speed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6″>
          {PIPELINE_STEPS.map(({ step, icon: Icon, title, body, highlight, color }) => (
            <div
              key={step}
              className="relative rounded-2xl border p-8 flex flex-col gap-5″
              style={{ backgroundColor: `${color}08`, borderColor: `${color}30` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-5xl font-black" style={{ color: `${color}25` }}>{step}</span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                  <Icon className="w-5 h-5″ style={{ color }} />
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2″>{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
              </div>
              <div
                className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 self-start"
                style={{ backgroundColor: `${color}15`, color }}
              >
                <CheckCircle className="w-3 h-3″ />
                {highlight}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Accuracy Stats */}
      <section className="border-t border-b py-20″ style={{ borderColor: "rgba(20,184,166,0.15)" }}>
        <div className="max-w-5xl mx-auto px-6″>
          <div className="text-center mb-14″>
            <h2 className="text-3xl font-bold text-white mb-3″>AI Detection Accuracy</h2>
            <p className="text-slate-400 text-lg">Measured across 10,000+ validated property photos in controlled testing.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8″>
            {AI_ACCURACY.map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between mb-2″>
                  <span className="text-slate-300 text-sm font-medium">{label}</span>
                  <span className="font-bold text-sm" style={{ color }}>{pct}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs text-center mt-8″>
            Accuracy figures reflect detection under standard lighting conditions. Performance may vary on low-resolution or partially obscured photos.
          </p>
        </div>
      </section>

      {/* What the AI sees */}
      <section className="max-w-5xl mx-auto px-6 py-20″>
        <div className="text-center mb-14″>
          <h2 className="text-3xl font-bold text-white mb-3″>What the AI sees</h2>
          <p className="text-slate-400 text-lg">Six photo types and what each one reveals to our vision model.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6″>
          {WHAT_AI_SEES.map(({ icon: Icon, label, color, bg, reveals }) => (
            <div key={label} className="rounded-2xl border p-6″ style={{ backgroundColor: bg, borderColor: `${color}30` }}>
              <div className="flex items-center gap-3 mb-5″>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0″ style={{ backgroundColor: `${color}25` }}>
                  <Icon className="w-4 h-4″ style={{ color }} />
                </div>
                <h3 className="text-white font-bold text-base">{label}</h3>
              </div>
              <ul className="space-y-1.5″>
                {reveals.map(item => (
                  <li key={item} className="flex items-start gap-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5″ style={{ backgroundColor: color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Detection categories */}
      <section className="border-t border-b py-20″ style={{ borderColor: "rgba(20,184,166,0.15)" }}>
        <div className="max-w-5xl mx-auto px-6″>
          <div className="text-center mb-14″>
            <h2 className="text-3xl font-bold text-white mb-3″>What We Can See</h2>
            <p className="text-slate-400 text-lg">65 detection categories organized by trade. Every category maps to a lead.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6″>
            {[
              {
                icon: Wind, label: "HVAC", color: TEAL, bg: "rgba(20,184,166,0.1)",
                items: ["Unit age & model", "Filter condition", "Ductwork visible", "Refrigerant lines", "Thermostat type", "Outdoor condenser", "Heat pump vs. gas", "Mini-split presence", "Return air grilles", "Zoning indicators"],
              },
              {
                icon: Home, label: "Roofing", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",
                items: ["Shingle material", "Roof age estimate", "Moss / algae", "Missing shingles", "Flashing condition", "Ridge cap wear", "Skylight presence", "Chimney condition", "Gutter attachment", "Ice dam risk"],
              },
              {
                icon: Droplets, label: "Plumbing", color: "#3b82f6″, bg: "rgba(59,130,246,0.1)",
                items: ["Water heater age", "Tank vs. tankless", "Pipe material", "Fixture brands", "Shutoff valve type", "Sump pump visible", "Hose bib condition", "Water softener", "PRV presence", "Sediment trap"],
              },
              {
                icon: Plug, label: "Electrical", color: "#a78bfa", bg: "rgba(167,139,250,0.1)",
                items: ["Panel age", "Breaker brand", "Amp capacity", "Grounding indicators", "Fuse vs. breaker", "Knob-and-tube flags", "EV charger readiness", "Generator tie-in", "Outlet type (2 vs. 3)", "GFCI presence"],
              },
              {
                icon: Thermometer, label: "Exterior", color: "#f97316″, bg: "rgba(249,115,22,0.1)",
                items: ["Siding material & age", "Window type & seals", "Door condition", "Gutter material", "Downspout routing", "Foundation cracks", "Deck condition", "Fascia & soffit", "Caulk condition", "Driveway surface"],
              },
              {
                icon: AlertTriangle, label: "Safety", color: "#ef4444″, bg: "rgba(239,68,68,0.1)",
                items: ["Mold indicators", "Structural sag", "Fire hazard flags", "CO detector absence", "Smoke detector age", "Exposed wiring", "Trip hazards", "Asbestos-era materials", "Lead paint risk", "Radon test kit absent"],
              },
              {
                icon: TreePine, label: "Landscaping", color: "#22c55e", bg: "rgba(34,197,94,0.1)",
                items: ["Tree proximity to roof", "Irrigation visible", "Lawn condition", "Retaining wall", "Drainage grade", "Hardscape type", "Fence material", "Outdoor lighting", "Pool / spa presence", "Pest indicators"],
              },
              {
                icon: Home, label: "Interior", color: "#e879f9″, bg: "rgba(232,121,249,0.1)",
                items: ["Flooring type & wear", "Paint condition", "Cabinet style & age", "Countertop material", "Appliance brands", "Ceiling condition", "Insulation visible", "Attic access", "Crawl space signs", "Vapor barrier"],
              },
            ].map(({ icon: Icon, label, color, bg, items }) => (
              <div key={label} className="rounded-2xl border p-6″ style={{ backgroundColor: bg, borderColor: `${color}30` }}>
                <div className="flex items-center gap-3 mb-5″>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0″ style={{ backgroundColor: `${color}25` }}>
                    <Icon className="w-4 h-4″ style={{ color }} />
                  </div>
                  <h3 className="text-white font-bold text-base">{label}</h3>
                </div>
                <ul className="space-y-1.5″>
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0″ style={{ backgroundColor: color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network effect */}
      <section className="max-w-5xl mx-auto px-6 py-20″>
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(20,184,166,0.25)", backgroundColor: "rgba(20,184,166,0.05)" }}>
          <div className="p-10 md:p-14″>
            <div className="flex items-start gap-4 mb-8″>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0″ style={{ backgroundColor: "rgba(20,184,166,0.2)" }}>
                <TrendingUp className="w-6 h-6″ style={{ color: TEAL }} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2″>The Network Effect</h2>
                <p className="text-slate-400 text-lg">Every partner's photos make the whole network more valuable.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-10″>
              {[
                { figure: "10″, label: "active partners", sub: "each uploading 5 photos/week" },
                { figure: "50″, label: "AI analyses/week", sub: "= 50 opportunity scans" },
                { figure: "50+", label: "auto-routed leads", sub: "distributed across the network" },
              ].map(({ figure, label, sub }) => (
                <div key={label} className="text-center">
                  <div className="text-5xl font-black mb-1″ style={{ color: TEAL }}>{figure}</div>
                  <div className="text-white font-semibold mb-0.5″>{label}</div>
                  <div className="text-slate-500 text-sm">{sub}</div>
                </div>
              ))}
            </div>

            <p className="text-slate-300 leading-relaxed text-base max-w-2xl">
              As your network grows, photo volume compounds. At 100 partners uploading 5 photos each, that's 500 AI analyses per week — 500 chances to generate a qualified lead for someone in your downline. Leads flow to your tier-matched pros automatically, and you earn on every one.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="border-t py-16″ style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6″>
          <div className="flex flex-col md:flex-row items-start gap-8″>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0″ style={{ backgroundColor: "rgba(20,184,166,0.15)" }}>
              <Shield className="w-7 h-7″ style={{ color: TEAL }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3″>Privacy First</h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-4″>
                Photos are analyzed for property features only. <strong className="text-white">No facial recognition. No personal data extracted.</strong> AI analysis runs in secure, sandboxed cloud environments. Images are processed ephemerally — they are never stored beyond the analysis window. No homeowner data is sold, licensed, or shared with third parties. All findings are permissioned to the originating partner and their approved network only.
              </p>
              <div className="flex flex-wrap gap-3 mt-6″>
                {["No facial recognition", "No personal data extracted", "No data sold", "Sandboxed processing", "Partner-permissioned", "Ephemeral images"].map(badge => (
                  <span
                    key={badge}
                    className="text-sm font-medium px-3 py-1.5 rounded-full border"
                    style={{ borderColor: "rgba(20,184,166,0.3)", color: TEAL, backgroundColor: "rgba(20,184,166,0.08)" }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20″>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4″>Ready to turn your job photos into leads?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Apply as a founding partner and get access to the photo intelligence pipeline when it launches.
          </p>
          <a
            href="/apply"
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-base"
            style={{ backgroundColor: TEAL, color: NAVY }}
          >
            Start uploading job photos
            <ArrowRight className="w-4 h-4″ />
          </a>
        </div>
      </section>
    </div>
  );
}
