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
} from "lucide-react";

export default function HowAIWorks() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
      <Helmet>
        <title>How ProLnk AI Works | Photo Intelligence Pipeline</title>
        <meta
          name="description"
          content="ProLnk's AI analyzes job site photos in under 2 seconds, detecting 65+ categories of home systems and routing leads automatically to licensed pros in your network."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-teal-900/40">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 60% 40%, #14b8a6 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5 mb-8">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-teal-400 text-sm font-medium">
              Sub-2-second analysis
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            ProLnk's AI turns job photos
            <br />
            <span style={{ color: "#14b8a6" }}>into revenue.</span>
            <br />
            <span className="text-slate-300">Here's how.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every photo a partner uploads is a scan of the homeowner's systems.
            Our AI identifies 65+ categories of work, then routes those
            opportunities as leads — automatically, in real time.
          </p>
        </div>
      </section>

      {/* Pipeline */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">
            The Photo Intelligence Pipeline
          </h2>
          <p className="text-slate-400 text-lg">
            Three steps from shutter click to qualified lead.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: Camera,
              title: "Partner uploads on-site",
              body: "While finishing a job, your partner snaps a photo of the HVAC unit, roof, panel, or any visible system. Takes 3 seconds.",
              highlight: "Upload from field app",
            },
            {
              step: "02",
              icon: Cpu,
              title: "AI analyzes in <2 seconds",
              body: "Our vision model scans the image for 65+ detection categories — age, condition, brand, material, and safety signals — returning a structured report.",
              highlight: "65+ detection categories",
            },
            {
              step: "03",
              icon: Network,
              title: "Leads auto-route to your network",
              body: "Detected opportunities are matched to licensed pros by trade, zip code, and tier. The lead lands in their dashboard before the partner leaves the driveway.",
              highlight: "Real-time routing",
            },
          ].map(({ step, icon: Icon, title, body, highlight }) => (
            <div
              key={step}
              className="relative rounded-2xl border p-8 flex flex-col gap-5"
              style={{
                backgroundColor: "rgba(20, 184, 166, 0.04)",
                borderColor: "rgba(20, 184, 166, 0.2)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-5xl font-black"
                  style={{ color: "rgba(20, 184, 166, 0.15)" }}
                >
                  {step}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(20, 184, 166, 0.15)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#14b8a6" }} />
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
              </div>
              <div
                className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 self-start"
                style={{
                  backgroundColor: "rgba(20, 184, 166, 0.12)",
                  color: "#14b8a6",
                }}
              >
                <CheckCircle className="w-3 h-3" />
                {highlight}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detection categories */}
      <section
        className="border-t border-b py-20"
        style={{ borderColor: "rgba(20, 184, 166, 0.15)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">
              What We Can See
            </h2>
            <p className="text-slate-400 text-lg">
              65 detection categories organized by trade. Every category maps to
              a lead.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Wind,
                label: "HVAC",
                color: "#14b8a6",
                bg: "rgba(20,184,166,0.1)",
                items: [
                  "Unit age & model",
                  "Filter condition",
                  "Ductwork visible",
                  "Refrigerant lines",
                  "Thermostat type",
                  "Outdoor condenser",
                  "Heat pump vs. gas",
                  "Mini-split presence",
                  "Return air grilles",
                  "Zoning indicators",
                ],
              },
              {
                icon: Home,
                label: "Roofing",
                color: "#f59e0b",
                bg: "rgba(245,158,11,0.1)",
                items: [
                  "Shingle material",
                  "Roof age estimate",
                  "Moss / algae",
                  "Missing shingles",
                  "Flashing condition",
                  "Ridge cap wear",
                  "Skylight presence",
                  "Chimney condition",
                  "Gutter attachment",
                  "Ice dam risk",
                ],
              },
              {
                icon: Droplets,
                label: "Plumbing",
                color: "#3b82f6",
                bg: "rgba(59,130,246,0.1)",
                items: [
                  "Water heater age",
                  "Tank vs. tankless",
                  "Pipe material",
                  "Fixture brands",
                  "Shutoff valve type",
                  "Sump pump visible",
                  "Hose bib condition",
                  "Water softener",
                  "PRV presence",
                  "Sediment trap",
                ],
              },
              {
                icon: Plug,
                label: "Electrical",
                color: "#a78bfa",
                bg: "rgba(167,139,250,0.1)",
                items: [
                  "Panel age",
                  "Breaker brand",
                  "Amp capacity",
                  "Grounding indicators",
                  "Fuse vs. breaker",
                  "Knob-and-tube flags",
                  "EV charger readiness",
                  "Generator tie-in",
                  "Outlet type (2 vs. 3)",
                  "GFCI presence",
                ],
              },
              {
                icon: Thermometer,
                label: "Exterior",
                color: "#f97316",
                bg: "rgba(249,115,22,0.1)",
                items: [
                  "Siding material & age",
                  "Window type & seals",
                  "Door condition",
                  "Gutter material",
                  "Downspout routing",
                  "Foundation cracks",
                  "Deck condition",
                  "Fascia & soffit",
                  "Caulk condition",
                  "Driveway surface",
                ],
              },
              {
                icon: AlertTriangle,
                label: "Safety",
                color: "#ef4444",
                bg: "rgba(239,68,68,0.1)",
                items: [
                  "Mold indicators",
                  "Structural sag",
                  "Fire hazard flags",
                  "CO detector absence",
                  "Smoke detector age",
                  "Exposed wiring",
                  "Trip hazards",
                  "Asbestos-era materials",
                  "Lead paint risk",
                  "Radon test kit absent",
                ],
              },
              {
                icon: TreePine,
                label: "Landscaping",
                color: "#22c55e",
                bg: "rgba(34,197,94,0.1)",
                items: [
                  "Tree proximity to roof",
                  "Irrigation visible",
                  "Lawn condition",
                  "Retaining wall",
                  "Drainage grade",
                  "Hardscape type",
                  "Fence material",
                  "Outdoor lighting",
                  "Pool / spa presence",
                  "Pest indicators",
                ],
              },
              {
                icon: Home,
                label: "Interior",
                color: "#e879f9",
                bg: "rgba(232,121,249,0.1)",
                items: [
                  "Flooring type & wear",
                  "Paint condition",
                  "Cabinet style & age",
                  "Countertop material",
                  "Appliance brands",
                  "Ceiling condition",
                  "Insulation visible",
                  "Attic access",
                  "Crawl space signs",
                  "Vapor barrier",
                ],
              },
            ].map(({ icon: Icon, label, color, bg, items }) => (
              <div
                key={label}
                className="rounded-2xl border p-6"
                style={{
                  backgroundColor: bg,
                  borderColor: `${color}30`,
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${color}25` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color }} />
                  </div>
                  <h3 className="text-white font-bold text-base">{label}</h3>
                </div>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-slate-300 text-sm"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
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
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(20,184,166,0.25)", backgroundColor: "rgba(20,184,166,0.05)" }}>
          <div className="p-10 md:p-14">
            <div className="flex items-start gap-4 mb-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(20,184,166,0.2)" }}
              >
                <TrendingUp className="w-6 h-6" style={{ color: "#14b8a6" }} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  The Network Effect
                </h2>
                <p className="text-slate-400 text-lg">
                  Every partner's photos make the whole network more valuable.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {[
                {
                  figure: "10",
                  label: "active partners",
                  sub: "each uploading 5 photos/week",
                },
                {
                  figure: "50",
                  label: "AI analyses/week",
                  sub: "= 50 opportunity scans",
                },
                {
                  figure: "50+",
                  label: "auto-routed leads",
                  sub: "distributed across the network",
                },
              ].map(({ figure, label, sub }) => (
                <div key={label} className="text-center">
                  <div
                    className="text-5xl font-black mb-1"
                    style={{ color: "#14b8a6" }}
                  >
                    {figure}
                  </div>
                  <div className="text-white font-semibold mb-0.5">{label}</div>
                  <div className="text-slate-500 text-sm">{sub}</div>
                </div>
              ))}
            </div>

            <p className="text-slate-300 leading-relaxed text-base max-w-2xl">
              As your network grows, photo volume compounds. At 100 partners
              uploading 5 photos each, that's 500 AI analyses per week — 500
              chances to generate a qualified lead for someone in your downline.
              Leads flow to your tier-matched pros automatically, and you earn on
              every one.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section
        className="border-t py-16"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(20,184,166,0.15)" }}
            >
              <Shield className="w-7 h-7" style={{ color: "#14b8a6" }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Privacy First
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                AI analysis runs in secure, sandboxed cloud environments. Images
                are processed ephemerally — they are never stored beyond the
                analysis window. No homeowner data is sold, licensed, or shared
                with third parties. All findings are permissioned to the
                originating partner and their approved network only.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  "No data sold",
                  "Sandboxed processing",
                  "Partner-permissioned",
                  "Ephemeral images",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="text-sm font-medium px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: "rgba(20,184,166,0.3)",
                      color: "#14b8a6",
                      backgroundColor: "rgba(20,184,166,0.08)",
                    }}
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
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to turn your job photos into leads?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Apply as a founding partner and get access to the photo intelligence
            pipeline when it launches.
          </p>
          <a
            href="/apply"
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-base transition-all hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#14b8a6", color: "#0A1628" }}
          >
            Start uploading job photos
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
