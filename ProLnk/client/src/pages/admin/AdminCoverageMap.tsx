/**
 * Admin Coverage Map
 * Shows DFW zip code coverage density by partner count and trade type.
 * Identifies coverage gaps and over-saturated zones.
 * Uses serviceArea.getCoverageDensity procedure.
 */
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin, Search, AlertTriangle, CheckCircle, TrendingUp,
  Users, Building2, RefreshCw, ChevronDown, ChevronUp
} from "lucide-react";

const SUBMARKET_ORDER = [
  "Dallas Core", "North Suburbs", "Fort Worth Core",
  "East Suburbs", "South Suburbs", "West Suburbs", "Denton County"
];

function densityColor(count: number): string {
  if (count === 0) return "bg-red-100 border-red-300 text-red-700";
  if (count === 1) return "bg-amber-100 border-amber-300 text-amber-700";
  if (count <= 3) return "bg-green-100 border-green-300 text-green-700";
  return "bg-blue-100 border-blue-300 text-blue-700";
}

function densityLabel(count: number): string {
  if (count === 0) return "Gap";
  if (count === 1) return "Thin";
  if (count <= 3) return "Good";
  return "Dense";
}

export default function AdminCoverageMap() {
  const { data, isLoading, refetch, isFetching } = trpc.serviceArea.getCoverageDensity.useQuery();
  const [search, setSearch] = useState("");
  const [selectedSubmarket, setSelectedSubmarket] = useState<string>("all");
  const [expandedSubmarkets, setExpandedSubmarkets] = useState<Set<string>>(
    new Set(["Dallas Core", "North Suburbs"])
  );
  const [showGapsOnly, setShowGapsOnly] = useState(false);

  const zipCoverage = data?.zipCoverage ?? {};
  const gaps = data?.gaps ?? [];
  const totalCovered = data?.totalCovered ?? 0;
  const totalDFW = data?.totalDFW ?? 0;

  // Build full zip list with coverage data from DFW_ZIP_CODES shape
  // We reconstruct from gaps + zipCoverage
  const allZipData = useMemo(() => {
    const result: Array<{
      zip: string; city: string; submarket: string; medianHomeValue: number;
      count: number; partners: string[]; trades: string[];
    }> = [];
    // Add covered zips
    for (const [zip, cov] of Object.entries(zipCoverage)) {
      result.push({ zip, city: "", submarket: "", medianHomeValue: 0, ...cov });
    }
    // Add gap zips
    for (const g of gaps) {
      result.push({ zip: g.zip, city: g.city, submarket: g.submarket, medianHomeValue: g.medianHomeValue, count: 0, partners: [], trades: [] });
    }
    return result;
  }, [zipCoverage, gaps]);

  // Group by submarket
  const bySubmarket = useMemo(() => {
    const grouped: Record<string, typeof allZipData> = {};
    for (const z of allZipData) {
      const sm = z.submarket || "Other";
      if (!grouped[sm]) grouped[sm] = [];
      grouped[sm].push(z);
    }
    return grouped;
  }, [allZipData]);

  const filteredSubmarkets = useMemo(() => {
    const sms = selectedSubmarket === "all" ? SUBMARKET_ORDER : [selectedSubmarket];
    return sms.filter(sm => bySubmarket[sm]);
  }, [selectedSubmarket, bySubmarket]);

  const filterZips = (zips: typeof allZipData) => {
    return zips.filter(z => {
      if (showGapsOnly && z.count > 0) return false;
      if (search && !z.zip.includes(search) && !z.city.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  };

  const coveragePct = totalDFW > 0 ? Math.round((totalCovered / totalDFW) * 100) : 0;
  const gapCount = gaps.length;
  const thinCount = allZipData.filter(z => z.count === 1).length;
  const goodCount = allZipData.filter(z => z.count >= 2 && z.count <= 3).length;
  const denseCount = allZipData.filter(z => z.count > 3).length;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">DFW Coverage Map</h1>
            <p className="text-sm text-gray-500 mt-0.5">Partner service area density by zip code across the DFW metro</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching} className="gap-2">
            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={14} className="text-blue-500" />
                <p className="text-xs text-gray-500 font-medium">Coverage</p>
              </div>
              <p className="text-xl font-bold text-gray-900">{coveragePct}%</p>
              <p className="text-xs text-gray-400">{totalCovered}/{totalDFW} zips</p>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={14} className="text-red-500" />
                <p className="text-xs text-gray-500 font-medium">Gaps</p>
              </div>
              <p className="text-xl font-bold text-red-600">{gapCount}</p>
              <p className="text-xs text-gray-400">no partners</p>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={14} className="text-amber-500" />
                <p className="text-xs text-gray-500 font-medium">Thin</p>
              </div>
              <p className="text-xl font-bold text-amber-600">{thinCount}</p>
              <p className="text-xs text-gray-400">1 partner</p>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={14} className="text-green-500" />
                <p className="text-xs text-gray-500 font-medium">Good</p>
              </div>
              <p className="text-xl font-bold text-green-600">{goodCount}</p>
              <p className="text-xs text-gray-400">2–3 partners</p>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users size={14} className="text-blue-500" />
                <p className="text-xs text-gray-500 font-medium">Dense</p>
              </div>
              <p className="text-xl font-bold text-blue-600">{denseCount}</p>
              <p className="text-xs text-gray-400">4+ partners</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search zip or city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <select
            value={selectedSubmarket}
            onChange={e => setSelectedSubmarket(e.target.value)}
            className="h-9 text-sm border border-gray-200 rounded-md px-3 bg-white"
          >
            <option value="all">All Submarkets</option>
            {SUBMARKET_ORDER.map(sm => (
              <option key={sm} value={sm}>{sm}</option>
            ))}
          </select>
          <Button
            variant={showGapsOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowGapsOnly(g => !g)}
            className="gap-2"
          >
            <AlertTriangle size={13} />
            Gaps Only
          </Button>
        </div>

        {/* Coverage Grid by Submarket */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmarkets.map(submarket => {
              const zips = filterZips(bySubmarket[submarket] ?? []);
              if (zips.length === 0) return null;
              const isExpanded = expandedSubmarkets.has(submarket);
              const smGaps = zips.filter(z => z.count === 0).length;
              return (
                <Card key={submarket}>
                  <CardHeader
                    className="py-3 px-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setExpandedSubmarkets(prev => {
                        const next = new Set(prev);
                        if (next.has(submarket)) next.delete(submarket);
                        else next.add(submarket);
                        return next;
                      });
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-sm font-semibold text-gray-900">{submarket}</CardTitle>
                        <Badge className="text-xs bg-gray-100 text-gray-600">{zips.length} zips</Badge>
                        {smGaps > 0 && (
                          <Badge className="text-xs bg-red-100 text-red-600">{smGaps} gaps</Badge>
                        )}
                      </div>
                      {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                    </div>
                  </CardHeader>
                  {isExpanded && (
                    <CardContent className="px-4 pb-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {zips.map(z => (
                          <div
                            key={z.zip}
                            className={`rounded-lg border p-2.5 text-xs ${densityColor(z.count)}`}
                            title={z.partners.length > 0 ? `Partners: ${z.partners.join(", ")}` : "No partners"}
                          >
                            <div className="font-bold text-sm">{z.zip}</div>
                            <div className="text-[10px] opacity-75 truncate">{z.city || "—"}</div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-semibold">{densityLabel(z.count)}</span>
                              {z.count > 0 && (
                                <span className="flex items-center gap-0.5">
                                  <Users size={9} />
                                  {z.count}
                                </span>
                              )}
                            </div>
                            {z.trades.length > 0 && (
                              <div className="text-[9px] opacity-60 mt-0.5 truncate">
                                {z.trades.slice(0, 2).join(", ")}
                                {z.trades.length > 2 ? ` +${z.trades.length - 2}` : ""}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* Top Gap Opportunities */}
        {gaps.length > 0 && !showGapsOnly && (
          <Card className="border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-red-700">
                <AlertTriangle size={16} />
                Top Coverage Gaps (High-Value Zip Codes)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Zip</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">City</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Submarket</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Median Home Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {gaps
                      .sort((a, b) => (b.medianHomeValue ?? 0) - (a.medianHomeValue ?? 0))
                      .slice(0, 15)
                      .map(g => (
                        <tr key={g.zip} className="hover:bg-red-50 transition-colors">
                          <td className="py-2.5 px-3 font-mono font-bold text-red-700">{g.zip}</td>
                          <td className="py-2.5 px-3 text-gray-700">{g.city}</td>
                          <td className="py-2.5 px-3">
                            <Badge className="text-xs bg-gray-100 text-gray-600">{g.submarket}</Badge>
                          </td>
                          <td className="py-2.5 px-3 text-right font-semibold text-gray-900">
                            ${((g.medianHomeValue ?? 0) / 1000).toFixed(0)}k
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
