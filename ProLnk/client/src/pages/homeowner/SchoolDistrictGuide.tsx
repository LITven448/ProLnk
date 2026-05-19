import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap, Star, MapPin, TrendingUp, Home,
  Info, ChevronRight, Users, Award
} from "lucide-react";
import { Link } from "wouter";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface School {
  name: string;
  level: "Elementary" | "Middle" | "High";
  rating: number;
  distance: string;
  enrollment: number;
  grades: string;
}

interface DistrictComparison {
  name: string;
  rating: number;
  color: string;
  highlight?: boolean;
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const NEARBY_SCHOOLS: School[] = [
  {
    name: "Robertson Elementary",
    level: "Elementary",
    rating: 9,
    distance: "0.4mi",
    enrollment: 842,
    grades: "PK–5″,
  },
  {
    name: "Staley Middle School",
    level: "Middle",
    rating: 9,
    distance: "1.2mi",
    enrollment: 1_204,
    grades: "6–8″,
  },
  {
    name: "Lone Star High School",
    level: "High",
    rating: 10,
    distance: "2.1mi",
    enrollment: 2_617,
    grades: "9–12″,
  },
];

const DISTRICT_COMPARISONS: DistrictComparison[] = [
  { name: "Frisco ISD", rating: 9, color: "bg-teal-500″, highlight: true },
  { name: "Plano ISD", rating: 9, color: "bg-blue-500″ },
  { name: "Allen ISD", rating: 9, color: "bg-indigo-500″ },
  { name: "McKinney ISD", rating: 8, color: "bg-violet-500″ },
  { name: "Prosper ISD", rating: 8, color: "bg-slate-500″ },
];

const LEVEL_COLORS: Record<School["level"], string> = {
  Elementary: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30″,
  Middle: "bg-blue-500/15 text-blue-300 border-blue-500/30″,
  High: "bg-violet-500/15 text-violet-300 border-violet-500/30″,
};

// ─── StarRating ─────────────────────────────────────────────────────────────────
function StarRating({ rating, max = 10 }: { rating: number; max?: number }) {
  const filled = Math.round((rating / max) * 5);
  return (
    <div className="flex items-center gap-0.5″>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < filled ? "text-amber-400 fill-amber-400" : "text-slate-600 fill-slate-600"}`}
        />
      ))}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────────
export default function SchoolDistrictGuide() {
  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6″>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1″>
            <GraduationCap className="w-5 h-5 text-teal-400″ />
            <h1 className="text-2xl font-bold text-white">School District Guide</h1>
          </div>
          <p className="text-slate-400″>How schools affect your home value</p>
        </div>

        {/* Your district */}
        <Card className="bg-teal-900/20 border-teal-600/40″>
          <CardContent className="p-5″>
            <div className="flex items-start justify-between gap-4″>
              <div>
                <div className="flex items-center gap-2 mb-1″>
                  <Award className="w-4 h-4 text-teal-400″ />
                  <span className="text-white font-semibold">Frisco ISD</span>
                  <Badge variant="outline" className="border-teal-500/40 text-teal-300 text-xs">
                    Top 5% in Texas
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mb-3″>
                  <StarRating rating={9} />
                  <span className="text-teal-300 font-semibold">9/10</span>
                  <span className="text-slate-400 text-xs">on GreatSchools.org</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Your home benefits from a premium location in one of Texas's highest-rated school districts.
                  Frisco ISD consistently ranks in the top 5% statewide for academic performance, graduation rates,
                  and post-secondary readiness.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Value impact */}
        <Card className="bg-[#111C2D] border-slate-700″>
          <CardContent className="p-5″>
            <div className="flex items-center gap-2 mb-3″>
              <TrendingUp className="w-4 h-4 text-emerald-400″ />
              <span className="text-white font-semibold text-sm">District Value Premium</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4″>
              Homes in Frisco ISD carry a{" "}
              <span className="text-emerald-300 font-semibold">12–18% price premium</span> vs. comparable homes in
              lower-rated districts. Buyers actively filter by school district before touring — it's one of the
              top 3 search criteria for families with children.
            </p>
            <div className="bg-emerald-900/20 border border-emerald-600/25 rounded-lg p-4″>
              <div className="flex items-center gap-2 mb-2″>
                <Home className="w-4 h-4 text-emerald-400″ />
                <span className="text-emerald-300 font-semibold text-sm">Estimated premium on your $485K home</span>
              </div>
              <div className="flex items-baseline gap-2″>
                <span className="text-2xl font-bold text-white">$58K – $87K</span>
                <span className="text-slate-400 text-sm">attributable to Frisco ISD</span>
              </div>
              <p className="text-slate-500 text-xs mt-1″>Based on comparable sales data in adjacent districts Q1 2026</p>
            </div>
          </CardContent>
        </Card>

        {/* School list */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3″>Your Nearby Schools</h2>
          <div className="space-y-3″>
            {NEARBY_SCHOOLS.map(school => (
              <Card key={school.name} className="bg-[#111C2D] border-slate-700″>
                <CardContent className="p-4″>
                  <div className="flex items-start justify-between gap-3″>
                    <div className="flex-1 min-w-0″>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-white font-medium text-sm">{school.name}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${LEVEL_COLORS[school.level]}`}
                        >
                          {school.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mb-2″>
                        <StarRating rating={school.rating} />
                        <span className="text-amber-300 font-semibold text-sm">{school.rating}/10</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 text-xs">
                        <span className="flex items-center gap-1″>
                          <MapPin className="w-3 h-3″ /> {school.distance}
                        </span>
                        <span className="flex items-center gap-1″>
                          <Users className="w-3 h-3″ /> {school.enrollment.toLocaleString()} enrolled
                        </span>
                        <span>Grades {school.grades}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center flex-shrink-0″>
                      <span className="text-amber-300 font-bold text-sm">{school.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* District comparison */}
        <Card className="bg-[#111C2D] border-slate-700″>
          <CardContent className="p-5″>
            <h3 className="text-white font-semibold text-sm mb-4″>Nearby District Comparison</h3>
            <div className="space-y-3″>
              {DISTRICT_COMPARISONS.map(d => (
                <div key={d.name} className="flex items-center gap-3″>
                  <span className={`text-sm w-28 flex-shrink-0 ${d.highlight ? "text-white font-semibold" : "text-slate-400"}`}>
                    {d.name}
                    {d.highlight && (
                      <span className="ml-1.5 text-xs text-teal-400 font-normal">← you</span>
                    )}
                  </span>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${d.color} rounded-full transition-all`}
                      style={{ width: `${(d.rating / 10) * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm font-semibold w-10 text-right flex-shrink-0 ${d.highlight ? "text-teal-300" : "text-slate-400"}`}>
                    {d.rating}/10
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Moving tip */}
        <Card className="bg-blue-900/20 border-blue-600/30″>
          <CardContent className="p-4″>
            <div className="flex items-start gap-3″>
              <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5″ />
              <div>
                <p className="text-blue-300 font-semibold text-sm mb-1″>Selling Tip</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  If you're considering selling, <span className="text-white font-medium">Frisco ISD is a major selling point</span>.
                  Always mention it in your listing description, MLS notes, and open house materials.
                  Buyers filtering by school district will find your home first — and pay a premium to stay in it.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="text-slate-600 text-xs text-center">
          School ratings from GreatSchools.org — updated annually. Ratings reflect academic performance, equity, and test scores.
        </p>

        {/* CTA */}
        <Link href="/my-home/value">
          <Button className="w-full bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center gap-2″>
            See how districts affect home prices
            <ChevronRight className="w-4 h-4″ />
          </Button>
        </Link>

      </div>
    </HomeownerLayout>
  );
}
