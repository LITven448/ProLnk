import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  TrendingUp,
  TrendingDown,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Calendar,
  ArrowUpRight,
  Star,
  Zap,
  Shield,
  Thermometer,
  Droplets,
} from "lucide-react";

const subject = {
  address: "3412 Meadowbrook Dr, Frisco TX 75034",
  value: 485000,
  sqft: 2400,
  beds: 4,
  baths: 3,
  yearBuilt: 2009,
  lotSize: "0.22 ac",
  pricePerSqft: 202,
  score: 87,
};

const comps = [
  {
    address: "3208 Willow Creek Ln",
    city: "Frisco TX 75034",
    value: 472000,
    sqft: 2310,
    beds: 4,
    baths: 2.5,
    yearBuilt: 2008,
    soldDate: "Mar 2026",
    pricePerSqft: 204,
    distance: "0.4 mi",
  },
  {
    address: "3519 Oak Ridge Blvd",
    city: "Frisco TX 75034",
    value: 501000,
    sqft: 2520,
    beds: 4,
    baths: 3,
    yearBuilt: 2011,
    soldDate: "Feb 2026",
    pricePerSqft: 199,
    distance: "0.6 mi",
  },
  {
    address: "3100 Sunrise Park Dr",
    city: "Frisco TX 75033",
    value: 463000,
    sqft: 2290,
    beds: 3,
    baths: 3,
    yearBuilt: 2007,
    soldDate: "Jan 2026",
    pricePerSqft: 202,
    distance: "0.9 mi",
  },
];

const valueFactors = [
  { label: "Roof Condition", score: 92, icon: Shield, color: "text-green-400" },
  { label: "HVAC Efficiency", score: 88, icon: Thermometer, color: "text-teal-400" },
  { label: "Electrical Panel", score: 95, icon: Zap, color: "text-yellow-400" },
  { label: "Plumbing Health", score: 79, icon: Droplets, color: "text-blue-400" },
];

const sparklinePoints = [420, 432, 445, 451, 460, 468, 475, 479, 482, 485];
function Sparkline() {
  const max = Math.max(...sparklinePoints);
  const min = Math.min(...sparklinePoints);
  const range = max - min;
  const w = 200;
  const h = 50;
  const pts = sparklinePoints
    .map((v, i) => {
      const x = (i / (sparklinePoints.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12">
      <polyline
        points={pts}
        fill="none"
        stroke="#2dd4bf"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx={w} cy={h - ((sparklinePoints[sparklinePoints.length - 1] - min) / range) * h} r="3" fill="#2dd4bf" />
    </svg>
  );
}

function DeltaBadge({ delta }: { delta: number }) {
  const isPos = delta >= 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isPos ? "text-green-400" : "text-red-400"}`}
    >
      {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {isPos ? "+" : ""}
      {delta.toLocaleString()}
    </span>
  );
}

export default function PropertyComparison() {
  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Property Comparison</h1>
          <p className="text-slate-400 text-sm">Market value analysis against recent comparable sales</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1 bg-gradient-to-br from-teal-900/50 to-[#0F1F38] border border-teal-700">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-teal-600 text-white text-xs border-0">Your Home</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                ${subject.value.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-xs mb-4">
                <MapPin className="w-3 h-3" />
                {subject.address}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <BedDouble className="w-4 h-4 text-teal-400" />
                  {subject.beds} Beds
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Bath className="w-4 h-4 text-teal-400" />
                  {subject.baths} Baths
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Square className="w-4 h-4 text-teal-400" />
                  {subject.sqft.toLocaleString()} sqft
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Calendar className="w-4 h-4 text-teal-400" />
                  Built {subject.yearBuilt}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-teal-800">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Price / sqft</span>
                  <span className="text-white font-semibold">${subject.pricePerSqft}</span>
                </div>
                <div className="flex justify-between text-sm mt-1.5">
                  <span className="text-slate-400">Lot Size</span>
                  <span className="text-white font-semibold">{subject.lotSize}</span>
                </div>
                <div className="flex justify-between text-sm mt-1.5">
                  <span className="text-slate-400">Health Score</span>
                  <span className="text-teal-400 font-bold">{subject.score}/100</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs text-slate-400 mb-1">12-Month Value Trend</div>
                <Sparkline />
                <div className="flex justify-between text-xs text-slate-500 mt-0.5">
                  <span>$420K</span>
                  <span className="text-teal-400 font-semibold">$485K ↑15.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-[#0F1F38] border border-slate-700">
            <CardContent className="p-5">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Home className="w-4 h-4 text-teal-400" />
                Comparable Sales
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-500 text-xs border-b border-slate-700">
                      <th className="text-left pb-2 font-medium">Address</th>
                      <th className="text-right pb-2 font-medium">Sale Price</th>
                      <th className="text-right pb-2 font-medium">vs Yours</th>
                      <th className="text-right pb-2 font-medium">$/sqft</th>
                      <th className="text-right pb-2 font-medium">Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comps.map((c, i) => {
                      const delta = c.value - subject.value;
                      return (
                        <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/40">
                          <td className="py-3">
                            <div className="text-white font-medium leading-tight">{c.address}</div>
                            <div className="text-slate-500 text-xs flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" />
                              {c.distance} · {c.beds}bd/{c.baths}ba · {c.sqft.toLocaleString()} sqft
                            </div>
                          </td>
                          <td className="py-3 text-right text-white font-semibold">
                            ${c.value.toLocaleString()}
                          </td>
                          <td className="py-3 text-right">
                            <DeltaBadge delta={delta} />
                          </td>
                          <td className="py-3 text-right text-slate-300">${c.pricePerSqft}</td>
                          <td className="py-3 text-right text-slate-400 text-xs">{c.soldDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-slate-800/60 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Average Comp Value</div>
                    <div className="text-xl font-bold text-white">
                      ${Math.round(comps.reduce((s, c) => s + c.value, 0) / comps.length).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 mb-0.5">Your Position</div>
                    <div className="text-teal-400 font-semibold text-sm flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4" />
                      Above Avg by $3,333
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 mb-0.5">Avg $/sqft Comps</div>
                    <div className="text-white font-semibold">
                      ${Math.round(comps.reduce((s, c) => s + c.pricePerSqft, 0) / comps.length)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {valueFactors.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.label} className="bg-[#0F1F38] border border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-4 h-4 ${f.color}`} />
                    <span className="text-xs text-slate-400">{f.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{f.score}</div>
                  <div className="text-xs text-slate-500 mb-2">/100</div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-teal-500"
                      style={{ width: `${f.score}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-r from-teal-900/40 to-blue-900/40 border border-teal-700">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">Get a Pro Valuation</span>
              </div>
              <p className="text-slate-400 text-sm">
                Connect with a local agent to get a certified CMA report and maximize your
                home's market value.
              </p>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white whitespace-nowrap flex items-center gap-2">
              Request Valuation
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </HomeownerLayout>
  );
}
