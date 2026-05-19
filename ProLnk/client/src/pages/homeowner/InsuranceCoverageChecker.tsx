import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ShieldCheck, AlertTriangle, TrendingDown, DollarSign, ExternalLink, CheckCircle, CircleDot } from "lucide-react";
import { useLocation } from "wouter";

interface CoverageItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  coverageAmount: string;
}

const DEFAULT_COVERAGE_ITEMS: CoverageItem[] = [
  { id: "dwelling", label: "Dwelling (Structure)", description: "Covers repair or rebuild of your home's physical structure", checked: false, coverageAmount: "" },
  { id: "personal_property", label: "Personal Property", description: "Covers furniture, electronics, clothing, and other belongings", checked: false, coverageAmount: "" },
  { id: "liability", label: "Personal Liability", description: "Covers legal costs if someone is injured on your property", checked: false, coverageAmount: "" },
  { id: "loss_of_use", label: "Loss of Use / ALE", description: "Pays for hotel, meals, and living costs if home is uninhabitable", checked: false, coverageAmount: "" },
  { id: "water_damage", label: "Water Damage (Internal)", description: "Burst pipes, appliance overflow, and accidental discharge", checked: false, coverageAmount: "" },
  { id: "wind_hail", label: "Wind & Hail", description: "Roof, siding, and window damage from storms", checked: false, coverageAmount: "" },
  { id: "fire", label: "Fire & Smoke", description: "Fire, smoke, and fire-suppression water damage", checked: false, coverageAmount: "" },
  { id: "theft", label: "Theft & Vandalism", description: "Stolen property and malicious damage", checked: false, coverageAmount: "" },
  { id: "medical_payments", label: "Medical Payments to Others", description: "Minor medical claims from guests injured on property", checked: false, coverageAmount: "" },
  { id: "flood", label: "Flood Insurance (separate policy)", description: "Rising water from external sources — NOT in standard policies", checked: false, coverageAmount: "" },
  { id: "earthquake", label: "Earthquake (endorsement)", description: "Ground movement — requires a rider or separate policy", checked: false, coverageAmount: "" },
  { id: "sewer_backup", label: "Sewer / Water Backup (endorsement)", description: "Drain backup and sump pump overflow — often an add-on", checked: false, coverageAmount: "" },
];

function parseDollars(s: string): number {
  return parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
}

function formatDollars(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export default function InsuranceCoverageChecker() {
  const [, navigate] = useLocation();
  const [items, setItems] = useState<CoverageItem[]>(DEFAULT_COVERAGE_ITEMS);
  const [homeValue, setHomeValue] = useState("");
  const [annualPremium, setAnnualPremium] = useState("");

  const toggleItem = (id: string) =>
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, checked: !item.checked } : item));

  const updateAmount = (id: string, value: string) =>
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, coverageAmount: value } : item));

  const checkedItems = items.filter((i) => i.checked);
  const dwellingItem = items.find((i) => i.id === "dwelling");
  const dwellingCoverage = parseDollars(dwellingItem?.coverageAmount || "");
  const homeVal = parseDollars(homeValue);

  const underinsured = homeVal > 0 && dwellingCoverage > 0 && dwellingCoverage < homeVal * 0.8;
  const coverageGap = homeVal > 0 && dwellingCoverage > 0 ? Math.max(0, homeVal - dwellingCoverage) : 0;
  const coverageRatio = homeVal > 0 && dwellingCoverage > 0 ? (dwellingCoverage / homeVal) * 100 : null;

  const totalCoverage = checkedItems.reduce((sum, i) => sum + parseDollars(i.coverageAmount), 0);
  const premium = parseDollars(annualPremium);

  const criticalMissing = [
    !items.find((i) => i.id === "flood")?.checked && "Flood insurance",
    !items.find((i) => i.id === "sewer_backup")?.checked && "Sewer backup endorsement",
    !items.find((i) => i.id === "loss_of_use")?.checked && "Loss of use / ALE",
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-slate-950″>
      <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6″>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2″>
            <Search className="h-6 w-6 text-teal-400″ />
            Insurance Coverage Tracker
          </h1>
          <p className="text-slate-400 mt-1″>Check what your policy covers, estimate if you're underinsured, and track your annual premium.</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3″>
          <Card className="bg-slate-800/60 border-slate-700″>
            <CardContent className="pt-4 pb-3 text-center">
              <p className="text-2xl font-bold text-white">{checkedItems.length}</p>
              <p className="text-slate-400 text-xs mt-1″>Coverage types active</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700″>
            <CardContent className="pt-4 pb-3 text-center">
              <p className="text-2xl font-bold text-teal-400″>{totalCoverage > 0 ? formatDollars(totalCoverage) : "—"}</p>
              <p className="text-slate-400 text-xs mt-1″>Total coverage entered</p>
            </CardContent>
          </Card>
          <Card className={`border col-span-2 sm:col-span-1 ${underinsured ? "bg-red-900/20 border-red-600/40" : "bg-slate-800/60 border-slate-700"}`}>
            <CardContent className="pt-4 pb-3 text-center">
              {coverageRatio !== null ? (
                <>
                  <p className={`text-2xl font-bold ${underinsured ? "text-red-400" : "text-green-400"}`}>
                    {coverageRatio.toFixed(0)}%
                  </p>
                  <p className="text-slate-400 text-xs mt-1″>Dwelling vs. home value</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-slate-500″>—</p>
                  <p className="text-slate-400 text-xs mt-1″>Enter values below</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Am I underinsured calculator */}
        <Card className="bg-slate-800/60 border-slate-700″>
          <CardHeader className="pb-3″>
            <CardTitle className="text-white text-base flex items-center gap-2″>
              <TrendingDown className="h-4 w-4 text-teal-400″ />
              Am I underinsured?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4″>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4″>
              <div className="space-y-1.5″>
                <Label className="text-slate-300 text-sm">Estimated home value ($)</Label>
                <Input
                  placeholder="e.g. $450,000″
                  value={homeValue}
                  onChange={(e) => setHomeValue(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500″
                />
              </div>
              <div className="space-y-1.5″>
                <Label className="text-slate-300 text-sm">Dwelling coverage amount ($)</Label>
                <Input
                  placeholder="From your policy declarations"
                  value={dwellingItem?.coverageAmount || ""}
                  onChange={(e) => updateAmount("dwelling", e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500″
                />
              </div>
            </div>

            {homeVal > 0 && dwellingCoverage > 0 && (
              <div className={`rounded-lg p-4 border ${underinsured ? "bg-red-900/20 border-red-600/40" : "bg-green-900/20 border-green-600/40"}`}>
                <div className="flex items-start gap-3″>
                  {underinsured
                    ? <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5″ />
                    : <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5″ />
                  }
                  <div>
                    <p className={`font-semibold text-sm ${underinsured ? "text-red-300" : "text-green-300"}`}>
                      {underinsured ? "Potentially underinsured" : "Coverage looks adequate"}
                    </p>
                    <p className="text-slate-400 text-xs mt-1″>
                      {underinsured
                        ? `Your dwelling coverage is ${formatDollars(dwellingCoverage)} but your home is worth ${formatDollars(homeVal)}. You may be underinsured by ${formatDollars(coverageGap)}. Most insurers recommend coverage of at least 80–100% of home value.`
                        : `Your dwelling coverage of ${formatDollars(dwellingCoverage)} covers ${coverageRatio?.toFixed(0)}% of your ${formatDollars(homeVal)} home value. That's within the recommended range.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Coverage checklist */}
        <Card className="bg-slate-800/60 border-slate-700″>
          <CardHeader className="pb-3″>
            <CardTitle className="text-white text-base flex items-center gap-2″>
              <ShieldCheck className="h-4 w-4 text-teal-400″ />
              What does your policy cover?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2″>
            <p className="text-slate-400 text-xs mb-3″>Check each coverage type your policy includes and enter the amount from your declarations page.</p>
            {items.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg border p-3 transition-all ${item.checked ? "border-teal-600/40 bg-teal-900/10" : "border-slate-700 bg-slate-800/30"}`}
              >
                <div className="flex items-start gap-3″>
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`flex-shrink-0 mt-0.5 ${item.checked ? "text-teal-400" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    {item.checked ? <CheckCircle className="h-5 w-5″ /> : <CircleDot className="h-5 w-5" />}
                  </button>
                  <div className="flex-1 min-w-0″>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="text-sm text-white font-medium">{item.label}</p>
                      {item.id === "flood" || item.id === "earthquake" || item.id === "sewer_backup" ? (
                        <Badge className="text-xs bg-amber-500/20 text-amber-400 border-amber-500/30″>Add-on required</Badge>
                      ) : null}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5″>{item.description}</p>
                    {item.checked && (
                      <div className="mt-2 flex items-center gap-2″>
                        <DollarSign className="h-3.5 w-3.5 text-slate-400 flex-shrink-0″ />
                        <Input
                          placeholder="Coverage amount (optional)"
                          value={item.coverageAmount}
                          onChange={(e) => updateAmount(item.id, e.target.value)}
                          className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 text-xs h-8″
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Premium tracker */}
        <Card className="bg-slate-800/60 border-slate-700″>
          <CardHeader className="pb-3″>
            <CardTitle className="text-white text-base flex items-center gap-2″>
              <DollarSign className="h-4 w-4 text-teal-400″ />
              Annual premium tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4″>
            <div className="space-y-1.5″>
              <Label className="text-slate-300 text-sm">Annual premium ($)</Label>
              <Input
                placeholder="e.g. $1,800″
                value={annualPremium}
                onChange={(e) => setAnnualPremium(e.target.value)}
                className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500″
              />
            </div>
            {premium > 0 && totalCoverage > 0 && (
              <div className="grid grid-cols-2 gap-3″>
                <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                  <p className="text-teal-400 font-semibold">{formatDollars(premium / 12)}/mo</p>
                  <p className="text-slate-400 text-xs mt-0.5″>Monthly equivalent</p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                  <p className="text-teal-400 font-semibold">{((premium / totalCoverage) * 100).toFixed(3)}%</p>
                  <p className="text-slate-400 text-xs mt-0.5″>Premium-to-coverage ratio</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gaps / warnings */}
        {criticalMissing.length > 0 && (
          <Card className="bg-amber-900/20 border-amber-600/40″>
            <CardHeader className="pb-3″>
              <CardTitle className="text-white text-base flex items-center gap-2″>
                <AlertTriangle className="h-4 w-4 text-amber-400″ />
                Coverage gaps to consider
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2″>
              {criticalMissing.map((gap) => (
                <div key={gap} className="flex items-start gap-2 text-sm text-amber-200″>
                  <span className="text-amber-400 mt-0.5″>•</span>
                  {gap} is not checked — many homeowners overlook this until they need it.
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Get a better rate */}
        <Card className="bg-teal-900/30 border-teal-600/40″>
          <CardContent className="pt-6 pb-5″>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4″>
              <div>
                <p className="text-white font-semibold">Get a better rate</p>
                <p className="text-slate-400 text-sm mt-0.5″>TrustyPro-connected insurance partners can quote your current coverage at a lower premium. Most homeowners save $300–$700/year.</p>
              </div>
              <Button
                onClick={() => navigate("/trustypro/book")}
                className="bg-teal-600 hover:bg-teal-700 text-white whitespace-nowrap flex-shrink-0 gap-2″
              >
                <ExternalLink className="h-4 w-4″ />
                Get quotes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
