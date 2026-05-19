/**
 * /admin/api-credits — Free API Credits Guide
 * Comprehensive guide to free-tier API credits available for the ProLnk AI pipeline.
 * Helps the team maximize free usage before incurring costs.
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign, Zap, ExternalLink, CheckCircle, AlertTriangle,
  Gift, Star, Clock, Shield, ChevronDown, ChevronUp, Copy
} from "lucide-react";
import { toast } from "sonner";

const API_CREDITS = [
  {
    category: "AI Vision / Photo Analysis",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    apis: [
      {
        name: "Google Cloud Vision API",
        freeCredits: "$300 free trial + 1,000 units/month free forever",
        monthlyFreeUnits: "1,000 images/month",
        costAfterFree: "$1.50 per 1,000 units",
        url: "https://cloud.google.com/vision/pricing",
        useCase: "Tier 1 triage — label detection, object detection, damage classification",
        priority: "primary",
        notes: "Best for initial photo triage. Activate $300 credit first. Set budget alert at $50.",
        setupSteps: [
          "Go to console.cloud.google.com",
          "Enable Vision API",
          "Create API key under Credentials",
          "Add GOOGLE_VISION_API_KEY to Secrets",
        ],
      },
      {
        name: "AWS Rekognition",
        freeCredits: "5,000 images/month free for 12 months",
        monthlyFreeUnits: "5,000 images/month",
        costAfterFree: "$0.001 per image",
        url: "https://aws.amazon.com/rekognition/pricing/",
        useCase: "Tier 1 backup — label detection, scene analysis",
        priority: "secondary",
        notes: "12-month free tier. Excellent for damage detection and property condition scoring.",
        setupSteps: [
          "Create AWS account",
          "Navigate to IAM → Create user with Rekognition access",
          "Generate access key",
          "Add AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY to Secrets",
        ],
      },
      {
        name: "Clarifai",
        freeCredits: "1,000 operations/month free forever",
        monthlyFreeUnits: "1,000 ops/month",
        costAfterFree: "$0.004 per operation",
        url: "https://www.clarifai.com/pricing",
        useCase: "Specialized home damage models — roof, siding, structural",
        priority: "secondary",
        notes: "Has pre-built real estate and construction models. Good for specialized damage detection.",
        setupSteps: [
          "Sign up at clarifai.com",
          "Create an app and get Personal Access Token",
          "Add CLARIFAI_API_KEY to Secrets",
        ],
      },
    ],
  },
  {
    category: "AI Language / GPT Analysis",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    apis: [
      {
        name: "OpenAI (Built-in via OpenAI)",
        freeCredits: "Pay per use — no additional cost",
        monthlyFreeUnits: "Unlimited via platform key",
        costAfterFree: "Usage-based pricing",
        url: "https://openai.com",
        useCase: "Tier 2 & 3 deep analysis — GPT-4o Vision for complex damage assessment",
        priority: "primary",
        notes: "Already configured via BUILT_IN_FORGE_API_KEY. Use invokeLLM() helper. No setup needed.",
        setupSteps: [
          "Already active — use invokeLLM() in server code",
          "No additional API key needed",
        ],
      },
      {
        name: "Anthropic Claude (via OpenAI)",
        freeCredits: "Pay per use",
        monthlyFreeUnits: "Per API call",
        costAfterFree: "Usage-based pricing",
        url: "https://openai.com",
        useCase: "Alternative deep analysis model — better for structured JSON output",
        priority: "secondary",
        notes: "Access via OpenAI built-in API. Useful as fallback when GPT-4o is rate-limited.",
        setupSteps: [
          "Use BUILT_IN_FORGE_API_KEY with model parameter",
          "Specify model: 'claude-3-5-sonnet' in invokeLLM call",
        ],
      },
    ],
  },
  {
    category: "Property Data & Geocoding",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    apis: [
      {
        name: "Google Maps Platform",
        freeCredits: "$200/month free credit forever",
        monthlyFreeUnits: "~40,000 geocoding requests/month",
        costAfterFree: "$5 per 1,000 requests",
        url: "https://cloud.google.com/maps-platform/pricing",
        useCase: "Geocoding, address validation, neighborhood mapping",
        priority: "primary",
        notes: "$200/month credit covers most small-to-medium usage. Already configured via OpenAI proxy.",
        setupSteps: [
          "Already active via OpenAI Maps proxy",
          "No additional setup needed for frontend Maps",
          "For backend geocoding: use GOOGLE_MAPS_API_KEY",
        ],
      },
      {
        name: "ATTOM Property Data",
        freeCredits: "Trial available — contact sales",
        monthlyFreeUnits: "Limited trial",
        costAfterFree: "Custom pricing",
        url: "https://www.attomdata.com/",
        useCase: "Property valuations, permit history, neighborhood comps",
        priority: "future",
        notes: "Best-in-class property data. Request trial for AVM and permit data integration.",
        setupSteps: [
          "Request trial at attomdata.com",
          "Add ATTOM_API_KEY to Secrets when available",
        ],
      },
      {
        name: "Zillow Bridge API",
        freeCredits: "Zestimate API — limited free tier",
        monthlyFreeUnits: "1,000 requests/day",
        costAfterFree: "Contact Zillow",
        url: "https://www.zillow.com/howzillow/zestimate/",
        useCase: "Home value estimates for deal pricing context",
        priority: "future",
        notes: "Useful for displaying estimated home value in homeowner dashboard.",
        setupSteps: [
          "Apply at zillow.com/howzillow/zestimate",
          "Add ZILLOW_API_KEY to Secrets when approved",
        ],
      },
    ],
  },
  {
    category: "Weather & Storm Data",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    apis: [
      {
        name: "NOAA / NWS API",
        freeCredits: "100% free — government data",
        monthlyFreeUnits: "Unlimited",
        costAfterFree: "Free forever",
        url: "https://www.weather.gov/documentation/services-web-api",
        useCase: "Storm alerts, severe weather events, hail/wind reports",
        priority: "primary",
        notes: "Already integrated in storm-agent.ts. No API key needed. Rate limit: 1 req/sec.",
        setupSteps: [
          "Already active — no setup needed",
          "Endpoint: api.weather.gov",
        ],
      },
      {
        name: "OpenWeatherMap",
        freeCredits: "1,000 calls/day free forever",
        monthlyFreeUnits: "30,000 calls/month",
        costAfterFree: "$40/month for 100k calls",
        url: "https://openweathermap.org/price",
        useCase: "Historical weather data, forecast for maintenance scheduling",
        priority: "secondary",
        notes: "Good for predictive maintenance alerts (freeze warnings → pipe checks).",
        setupSteps: [
          "Sign up at openweathermap.org",
          "Get API key from dashboard",
          "Add OPENWEATHER_API_KEY to Secrets",
        ],
      },
    ],
  },
  {
    category: "Email & Notifications",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    apis: [
      {
        name: "Resend",
        freeCredits: "3,000 emails/month free forever",
        monthlyFreeUnits: "3,000 emails/month",
        costAfterFree: "$20/month for 50k emails",
        url: "https://resend.com/pricing",
        useCase: "Transactional emails — deal notifications, partner alerts, homeowner updates",
        priority: "primary",
        notes: "Already configured via RESEND_API_KEY. Excellent deliverability.",
        setupSteps: [
          "Already active — RESEND_API_KEY configured",
          "Monitor usage at resend.com/dashboard",
        ],
      },
    ],
  },
];

const PRIORITY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  primary:   { label: "Primary",   color: "text-emerald-400", bg: "bg-emerald-500/10" },
  secondary: { label: "Backup",    color: "text-blue-400",    bg: "bg-blue-500/10" },
  future:    { label: "Future",    color: "text-amber-400",   bg: "bg-amber-500/10" },
};

function ApiCard({ api }: { api: typeof API_CREDITS[0]["apis"][0] }) {
  const [expanded, setExpanded] = useState(false);
  const p = PRIORITY_CONFIG[api.priority];

  const copyStep = (step: string) => {
    navigator.clipboard.writeText(step);
    toast.success("Copied!");
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-white">{api.name}</h3>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${p.bg} ${p.color}`}>
                {p.label}
              </span>
            </div>
            <p className="text-xs text-emerald-400 font-medium">{api.freeCredits}</p>
          </div>
          <a href={api.url} target="_blank" rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors flex-shrink-0">
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-xs text-slate-400 mb-3">{api.useCase}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Gift className="w-3 h-3 text-emerald-400" />
              {api.monthlyFreeUnits}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-amber-400" />
              {api.costAfterFree}
            </span>
          </div>
          <button onClick={() => setExpanded(!expanded)}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
            Setup {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-slate-700/50 p-4 bg-slate-900/30">
          <p className="text-xs text-slate-300 mb-3 italic">{api.notes}</p>
          <div className="space-y-1.5">
            {api.setupSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 group">
                <span className="text-[10px] font-bold text-slate-500 mt-0.5 w-4 flex-shrink-0">{i + 1}.</span>
                <span className="text-xs text-slate-300 flex-1">{step}</span>
                {step.includes("KEY") && (
                  <button onClick={() => copyStep(step)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy className="w-3 h-3 text-slate-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApiCreditsGuide() {
  const totalFreeValue = "$300+ in cloud credits + unlimited government APIs";

  return (
    <AdminLayout>
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Free API Credits Guide</h1>
          <p className="text-slate-400 text-sm">
            Maximize free-tier usage across the AI pipeline before incurring costs.
            Prioritize primary APIs first, use backups when rate limits are hit.
          </p>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
          {totalFreeValue}
        </Badge>
      </div>

      {/* Summary Banner */}
      <Card className="bg-emerald-950/30 border-emerald-500/20">
        <CardContent className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Already Active", value: "4 APIs", icon: CheckCircle, color: "text-emerald-400" },
              { label: "Free Forever", value: "3 APIs", icon: Gift, color: "text-blue-400" },
              { label: "Trial Credits", value: "$300+", icon: DollarSign, color: "text-amber-400" },
              { label: "Future Integrations", value: "3 APIs", icon: Clock, color: "text-purple-400" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="text-center">
                <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Optimization Tips */}
      <Card className="bg-amber-950/20 border-amber-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-amber-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Cost Optimization Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Always run Tier 1 (cheap triage) first — only escalate to Tier 2/3 if confidence < 0.7",
            "Cache AI results for 30 days — never re-analyze the same photo twice",
            "Suppress analysis for photos > 36 months old (stale data, low ROI)",
            "Rate limit: max 1 AI analysis per address per 90 days (unsolicited outreach)",
            "Set budget alerts at $25, $50, and $100 in Google Cloud and AWS consoles",
            "Use NOAA/NWS for storm data — it's free forever and already integrated",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-300">{tip}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* API Categories */}
      {API_CREDITS.map((category) => (
        <div key={category.category}>
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full ${category.bg.replace('/10', '')}`} />
            <h2 className={`text-sm font-bold ${category.color}`}>{category.category}</h2>
            <div className={`flex-1 h-px ${category.border}`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.apis.map((api) => (
              <ApiCard key={api.name} api={api} />
            ))}
          </div>
        </div>
      ))}

      {/* Monthly Cost Projection */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-white flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            Estimated Monthly Cost at Scale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-400 font-medium">Volume</th>
                  <th className="text-right py-2 text-slate-400 font-medium">Photos/Month</th>
                  <th className="text-right py-2 text-slate-400 font-medium">AI Calls</th>
                  <th className="text-right py-2 text-slate-400 font-medium">Est. Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {[
                  { volume: "Early Stage (0–500 partners)", photos: "5,000", calls: "1,500", cost: "$0 (free tier)" },
                  { volume: "Growth (500–2,000 partners)", photos: "25,000", calls: "7,500", cost: "~$15–30/mo" },
                  { volume: "Scale (2,000–10,000 partners)", photos: "100,000", calls: "30,000", cost: "~$75–150/mo" },
                  { volume: "Enterprise (10,000+ partners)", photos: "500,000", calls: "150,000", cost: "~$400–800/mo" },
                ].map((row) => (
                  <tr key={row.volume}>
                    <td className="py-2 text-slate-300">{row.volume}</td>
                    <td className="py-2 text-right text-slate-400">{row.photos}</td>
                    <td className="py-2 text-right text-slate-400">{row.calls}</td>
                    <td className="py-2 text-right font-semibold text-emerald-400">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-slate-500 mt-3">
            * Assumes 30% of photos escalate to Tier 2 (deep analysis). Caching reduces repeat costs by ~60%.
            Manus built-in LLM costs are covered by platform subscription and not included above.
          </p>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}
