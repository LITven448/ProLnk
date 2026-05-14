import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Leaf, Sun, Wind, Snowflake, DollarSign, Wrench, ChevronRight,
  CheckCircle, ExternalLink, Thermometer, Droplets, Bug, Home,
} from "lucide-react";
import { Link } from "wouter";

type Season = "summer" | "fall" | "spring" | "winter";

interface PrepItem {
  task: string;
  why: string;
  category: string;
  priority: "Critical" | "Recommended" | "Optional";
  estimatedCost: string;
  diy: boolean;
}

const SEASONAL_DATA: Record<Season, { headline: string; tip: string; items: PrepItem[] }> = {
  summer: {
    headline: "Texas Summer Prep",
    tip: "DFW summers routinely hit 105°F+. Your HVAC and foundation are the two biggest risks — prioritize both.",
    items: [
      {
        task: "AC inspection & tune-up",
        why: "A failing AC in 105°F Texas heat is an emergency. A $100 tune-up can prevent a $3,000 emergency call.",
        category: "HVAC",
        priority: "Critical",
        estimatedCost: "$89–150",
        diy: false,
      },
      {
        task: "Attic insulation check",
        why: "Attic temps can hit 150°F in Texas summers. Proper insulation (R-38+) keeps cooling costs 30–40% lower.",
        category: "Insulation",
        priority: "Recommended",
        estimatedCost: "$500–2,500",
        diy: false,
      },
      {
        task: "Irrigation system audit",
        why: "DFW clay soil shrinks dramatically without water. Foundation damage from dry summers costs $10K–$80K.",
        category: "Irrigation",
        priority: "Critical",
        estimatedCost: "$75–150",
        diy: false,
      },
      {
        task: "HVAC filter replacement",
        why: "During peak summer, filters clog monthly. A clogged filter drops efficiency 15% and can freeze the coil.",
        category: "HVAC",
        priority: "Critical",
        estimatedCost: "$15–30",
        diy: true,
      },
      {
        task: "Outdoor faucet & hose bib check",
        why: "Verify no leaks before summer water bills arrive — a dripping faucet wastes 3,000+ gallons per month.",
        category: "Plumbing",
        priority: "Recommended",
        estimatedCost: "$0–80",
        diy: true,
      },
      {
        task: "Window film or shade installation",
        why: "South and west-facing windows absorb massive heat load. Window film reduces heat gain 35–50%.",
        category: "Windows",
        priority: "Optional",
        estimatedCost: "$200–600",
        diy: true,
      },
    ],
  },
  fall: {
    headline: "Texas Fall Prep",
    tip: "Fall in DFW is mild but brief. Use the window between summer and winter to address roofing, gutters, and heating before cold fronts arrive.",
    items: [
      {
        task: "Roof inspection",
        why: "Check for damage from summer hail and UV. Damaged shingles let water in during fall rains.",
        category: "Roofing",
        priority: "Critical",
        estimatedCost: "$150–350",
        diy: false,
      },
      {
        task: "Gutter cleaning",
        why: "DFW has significant leaf fall in October–November. Clogged gutters cause fascia rot and foundation drainage issues.",
        category: "Gutters",
        priority: "Critical",
        estimatedCost: "$150–300",
        diy: true,
      },
      {
        task: "Pest prevention",
        why: "Rodents and insects seek warmth as temps drop. Seal gaps in siding, foundation, and garage before they move in.",
        category: "Pest Control",
        priority: "Recommended",
        estimatedCost: "$200–600",
        diy: false,
      },
      {
        task: "Heating system inspection",
        why: "Texas furnaces sit idle 6+ months. Have it serviced before the first cold front — repairs take days to schedule in November.",
        category: "HVAC",
        priority: "Critical",
        estimatedCost: "$89–150",
        diy: false,
      },
      {
        task: "Exterior paint & caulk check",
        why: "Hot summers crack exterior caulk and paint. Fall is the ideal painting season in DFW (70–85°F).",
        category: "Exterior",
        priority: "Recommended",
        estimatedCost: "$800–3,500",
        diy: false,
      },
      {
        task: "Pipe insulation in garage & crawl space",
        why: "Texas ice storms (February 2021-style) can burst exposed pipes. A $50 fix prevents $10K in water damage.",
        category: "Plumbing",
        priority: "Recommended",
        estimatedCost: "$50–200",
        diy: true,
      },
    ],
  },
  spring: {
    headline: "Texas Spring Prep",
    tip: "Spring in DFW brings severe storms — high winds, hail, and heavy rain. Prep your exterior before peak storm season (April–May).",
    items: [
      {
        task: "AC tune-up before cooling season",
        why: "DFW hits 90°F by May. A spring AC service avoids summer emergency rates and long wait times.",
        category: "HVAC",
        priority: "Critical",
        estimatedCost: "$89–150",
        diy: false,
      },
      {
        task: "Landscaping & tree trimming",
        why: "Overgrown branches are projectiles in spring storms. Trim anything within 10 feet of the house.",
        category: "Landscaping",
        priority: "Recommended",
        estimatedCost: "$300–1,200",
        diy: false,
      },
      {
        task: "Exterior paint check",
        why: "DFW winters crack exterior paint and caulk. Spring is ideal for touch-ups before summer UV accelerates damage.",
        category: "Exterior",
        priority: "Recommended",
        estimatedCost: "$500–3,500",
        diy: false,
      },
      {
        task: "Foundation perimeter inspection",
        why: "Check for winter shrinkage cracks. Start consistent watering schedule to prep foundation for summer heat.",
        category: "Foundation",
        priority: "Critical",
        estimatedCost: "$0 (visual check)",
        diy: true,
      },
      {
        task: "Irrigation system startup",
        why: "Test all zones, check heads for winter damage, calibrate for summer schedule before turf stress begins.",
        category: "Irrigation",
        priority: "Recommended",
        estimatedCost: "$75–150",
        diy: false,
      },
      {
        task: "Window & door seal inspection",
        why: "Weatherstripping degrades after DFW winters. Gaps let allergens and humidity in during spring.",
        category: "Windows",
        priority: "Optional",
        estimatedCost: "$50–200",
        diy: true,
      },
    ],
  },
  winter: {
    headline: "Texas Winter Prep",
    tip: "Texas winters are mild most years but catastrophic ice storms arrive without warning. Uri (2021) caused $195B in damage. Prep now — not during the storm.",
    items: [
      {
        task: "Locate & label your water main shutoff",
        why: "When pipes burst during a freeze, you have minutes to stop flooding. Know exactly where your shutoff is.",
        category: "Plumbing",
        priority: "Critical",
        estimatedCost: "$0 (DIY)",
        diy: true,
      },
      {
        task: "Pipe insulation — garage & exterior walls",
        why: "The #1 cause of winter home damage in Texas. Wrap exposed pipes now for $30–$200 — burst pipe repairs cost $5K–$20K.",
        category: "Plumbing",
        priority: "Critical",
        estimatedCost: "$30–200",
        diy: true,
      },
      {
        task: "Heating system service",
        why: "Furnaces idle for months in Texas. Service before first cold snap — technicians are booked 2–3 weeks out once cold arrives.",
        category: "HVAC",
        priority: "Critical",
        estimatedCost: "$89–150",
        diy: false,
      },
      {
        task: "Exterior faucet cover installation",
        why: "Foam faucet covers ($5 each) insulate outdoor hose bibs. Easy DIY install that prevents common freeze damage.",
        category: "Plumbing",
        priority: "Recommended",
        estimatedCost: "$10–30",
        diy: true,
      },
      {
        task: "Chimney inspection",
        why: "If you have a wood-burning fireplace, annual inspection prevents chimney fires and carbon monoxide risk.",
        category: "Chimney",
        priority: "Recommended",
        estimatedCost: "$150–300",
        diy: false,
      },
      {
        task: "Generator readiness check",
        why: "If you have a generator, test it now. Grid failures during Texas ice storms leave homes without heat for days.",
        category: "Electrical",
        priority: "Optional",
        estimatedCost: "$0 (test)",
        diy: true,
      },
    ],
  },
};

const SEASON_CONFIG: Record<Season, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  summer: {
    label: "Summer",
    icon: <Sun className="w-4 h-4" />,
    color: "text-yellow-600",
    bg: "bg-yellow-50 border-yellow-200",
  },
  fall: {
    label: "Fall",
    icon: <Wind className="w-4 h-4" />,
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-200",
  },
  spring: {
    label: "Spring",
    icon: <Leaf className="w-4 h-4" />,
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
  },
  winter: {
    label: "Winter",
    icon: <Snowflake className="w-4 h-4" />,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
  },
};

const PRIORITY_COLORS: Record<string, string> = {
  Critical: "bg-red-100 text-red-700 border-red-200",
  Recommended: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Optional: "bg-green-100 text-green-700 border-green-200",
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  HVAC: <Thermometer className="w-3.5 h-3.5" />,
  Plumbing: <Droplets className="w-3.5 h-3.5" />,
  "Pest Control": <Bug className="w-3.5 h-3.5" />,
  Foundation: <Home className="w-3.5 h-3.5" />,
};

function getCurrentSeason(): Season {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 8) return "summer";
  if (m >= 9 && m <= 10) return "fall";
  return "winter";
}

export default function SeasonalPrepGuide() {
  const [season, setSeason] = useState<Season>(getCurrentSeason());
  const { headline, tip, items } = SEASONAL_DATA[season];
  const config = SEASON_CONFIG[season];
  const criticalCount = items.filter(i => i.priority === "Critical").length;

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto space-y-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Seasonal Prep Guide</h1>
          <p className="text-muted-foreground mt-1">Texas-specific home prep by season — what to do and why it matters here.</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {(["spring", "summer", "fall", "winter"] as Season[]).map(s => {
            const sc = SEASON_CONFIG[s];
            return (
              <button
                key={s}
                onClick={() => setSeason(s)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all text-sm font-medium ${
                  season === s
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
                }`}
              >
                <span className={season === s ? "text-white" : sc.color}>{sc.icon}</span>
                {sc.label}
              </button>
            );
          })}
        </div>

        <Card className={`border-l-4 ${config.bg} ${season === "summer" ? "border-l-yellow-400" : season === "fall" ? "border-l-orange-400" : season === "spring" ? "border-l-green-400" : "border-l-blue-400"}`}>
          <CardContent className="pt-4 pb-3">
            <h2 className={`font-bold text-base mb-1 ${config.color}`}>{headline}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
            {criticalCount > 0 && (
              <p className="text-xs text-red-600 font-medium mt-2">
                {criticalCount} critical item{criticalCount !== 1 ? "s" : ""} — act before the season starts
              </p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-3">
          {items.map((item, i) => (
            <Card key={i} className="shadow-sm border-gray-100">
              <CardContent className="pt-4 pb-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold text-sm text-gray-900">{item.task}</p>
                      <Badge className={`text-xs border font-medium ${PRIORITY_COLORS[item.priority]}`}>
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{item.why}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        {CATEGORY_ICONS[item.category] ?? <Wrench className="w-3 h-3" />}
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {item.estimatedCost}
                      </span>
                      {item.diy && (
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <CheckCircle className="w-3 h-3" />DIY possible
                        </span>
                      )}
                    </div>
                  </div>
                  {!item.diy && (
                    <Link href="/trustypro/book">
                      <Button size="sm" variant="outline" className="shrink-0 text-xs h-7 px-2">
                        Book a Pro
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center pb-2">
          <Link href="/trustypro/book">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Find a Trusted Pro for Any Task
              <ExternalLink className="w-3.5 h-3.5 ml-2" />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-2">
            TrustyPro connects you with vetted, background-checked professionals in your area
          </p>
        </div>
      </div>
    </HomeownerLayout>
  );
}
