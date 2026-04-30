import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MapPin, Search, CheckCircle2, Lock, TrendingUp, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";

const TIER_COLORS: Record<string, string> = {
  scout: "bg-gray-100 text-gray-700 border-gray-300",
  pro: "bg-blue-100 text-blue-700 border-blue-300",
  crew: "bg-green-100 text-green-700 border-green-300",
  company: "bg-purple-100 text-purple-700 border-purple-300",
  enterprise: "bg-amber-100 text-amber-800 border-amber-300",
};

const TIER_UPGRADE_MSG: Record<string, string> = {
  scout: "Upgrade to Pro to unlock 15 zip codes",
  pro: "Upgrade to Crew to unlock 30 zip codes",
  crew: "Upgrade to Company to unlock 60 zip codes",
  company: "Upgrade to Enterprise for unlimited coverage",
  enterprise: "You have full DFW coverage",
};

type ZipEntry = {
  zip: string;
  city: string;
  county: string;
  submarket: string;
  medianHomeValue: number;
  tier: string;
};

export default function ServiceAreaManager() {
  const [search, setSearch] = useState("");
  const [selectedSubmarket, setSelectedSubmarket] = useState<string>("all");
  const [expandedSubmarkets, setExpandedSubmarkets] = useState<Set<string>>(new Set(["Dallas Core", "North Suburbs"]));
  const [pendingZips, setPendingZips] = useState<Set<string> | null>(null);
  const [saving, setSaving] = useState(false);

  const { data, isLoading, refetch } = trpc.serviceArea.getServiceAreaData.useQuery();
  const updateMutation = trpc.serviceArea.updateServiceZipCodes.useMutation({
    onSuccess: (result: { savedZips: number; maxAllowed: number }) => {
      toast.success("Service area saved!", { description: `${result.savedZips} zip codes saved. You have ${result.maxAllowed - result.savedZips} slots remaining.` });
      setPendingZips(null);
      refetch();
    },
    onError: (err: { message: string }) => {
      toast.error("Could not save", { description: err.message });
    },
  });

  const activeZips = pendingZips ?? new Set(data?.currentZips ?? []);
  const maxAllowed = data?.maxAllowed ?? 5;
  const tier = data?.tier ?? "scout";
  const allZips: ZipEntry[] = (data?.allZips ?? []) as ZipEntry[];

  // Group zips by submarket
  const submarkets = useMemo(() => {
    const map: Record<string, ZipEntry[]> = {};
    for (const z of allZips) {
      if (!map[z.submarket]) map[z.submarket] = [];
      map[z.submarket].push(z);
    }
    return map;
  }, [allZips]);

  const submarketNames = Object.keys(submarkets).sort();

  // Filter by search + submarket
  const filteredZips = useMemo(() => {
    const q = search.toLowerCase();
    return allZips.filter(z => {
      const matchSearch = !q || z.zip.includes(q) || z.city.toLowerCase().includes(q) || z.submarket.toLowerCase().includes(q);
      const matchSubmarket = selectedSubmarket === "all" || z.submarket === selectedSubmarket;
      return matchSearch && matchSubmarket;
    });
  }, [allZips, search, selectedSubmarket]);

  const filteredBySubmarket = useMemo(() => {
    const map: Record<string, ZipEntry[]> = {};
    for (const z of filteredZips) {
      if (!map[z.submarket]) map[z.submarket] = [];
      map[z.submarket].push(z);
    }
    return map;
  }, [filteredZips]);

  function toggleZip(zip: string) {
    const next = new Set(activeZips);
    if (next.has(zip)) {
      next.delete(zip);
    } else {
      if (next.size >= maxAllowed) {
        toast.error(`Limit reached (${maxAllowed} zip codes)`, { description: TIER_UPGRADE_MSG[tier] ?? "Upgrade your plan to add more coverage." });
        return;
      }
      next.add(zip);
    }
    setPendingZips(next);
  }

  function toggleSubmarket(sm: string) {
    const smZips = (submarkets[sm] ?? []).map(z => z.zip);
    const allSelected = smZips.every(z => activeZips.has(z));
    const next = new Set(activeZips);
    if (allSelected) {
      smZips.forEach(z => next.delete(z));
    } else {
      const available = maxAllowed - next.size;
      const toAdd = smZips.filter(z => !next.has(z)).slice(0, available);
      if (toAdd.length < smZips.filter(z => !next.has(z)).length) {
        toast("Partial selection", { description: `Added ${toAdd.length} zip codes. Upgrade to add the rest.` });
      }
      toAdd.forEach(z => next.add(z));
    }
    setPendingZips(next);
  }

  function toggleExpand(sm: string) {
    const next = new Set(expandedSubmarkets);
    if (next.has(sm)) next.delete(sm);
    else next.add(sm);
    setExpandedSubmarkets(next);
  }

  async function handleSave() {
    if (!pendingZips || pendingZips.size === 0) {
      toast("No changes to save", { description: "Select at least one zip code." });
      return;
    }
    setSaving(true);
    try {
      await updateMutation.mutateAsync({ zipCodes: Array.from(pendingZips) });
    } finally {
      setSaving(false);
    }
  }

  const hasChanges = pendingZips !== null;
  const selectedCount = activeZips.size;

  if (isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              Service Area Manager
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Select the DFW zip codes where you want to receive leads and quote requests.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`text-sm px-3 py-1 border ${TIER_COLORS[tier] ?? TIER_COLORS.scout}`}>
              {tier.charAt(0).toUpperCase() + tier.slice(1)} Plan
            </Badge>
            {hasChanges && (
              <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white">
                {saving ? "Saving..." : `Save Changes`}
              </Button>
            )}
          </div>
        </div>

        {/* Coverage Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-blue-50">
            <CardContent className="pt-4 pb-3">
              <div className="text-2xl font-bold text-blue-700">{selectedCount}</div>
              <div className="text-xs text-blue-600 mt-0.5">Zip Codes Selected</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-green-50">
            <CardContent className="pt-4 pb-3">
              <div className="text-2xl font-bold text-green-700">{maxAllowed === 999 ? "∞" : maxAllowed - selectedCount}</div>
              <div className="text-xs text-green-600 mt-0.5">Slots Remaining</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-purple-50">
            <CardContent className="pt-4 pb-3">
              <div className="text-2xl font-bold text-purple-700">{maxAllowed === 999 ? "Unlimited" : maxAllowed}</div>
              <div className="text-xs text-purple-600 mt-0.5">Max Allowed ({tier})</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-amber-50">
            <CardContent className="pt-4 pb-3">
              <div className="text-2xl font-bold text-amber-700">{allZips.length}</div>
              <div className="text-xs text-amber-600 mt-0.5">Total DFW Zips</div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade CTA */}
        {tier !== "enterprise" && (
          <Card className="border border-amber-200 bg-amber-50">
            <CardContent className="py-3 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-sm font-medium text-amber-800">{TIER_UPGRADE_MSG[tier]}</span>
                <span className="text-xs text-amber-600 ml-2">More coverage = more leads.</span>
              </div>
              <Button size="sm" variant="outline" className="border-amber-400 text-amber-700 hover:bg-amber-100 flex-shrink-0"
                onClick={() => window.location.href = "/dashboard/settings"}>
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by zip code, city, or submarket..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={selectedSubmarket}
            onChange={e => setSelectedSubmarket(e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Submarkets</option>
            {submarketNames.map(sm => (
              <option key={sm} value={sm}>{sm}</option>
            ))}
          </select>
        </div>

        {/* Zip Code Grid by Submarket */}
        <div className="space-y-3">
          {Object.entries(filteredBySubmarket).map(([sm, zips]) => {
            const smSelected = zips.filter(z => activeZips.has(z.zip)).length;
            const smTotal = zips.length;
            const allSmSelected = smSelected === smTotal;
            const expanded = expandedSubmarkets.has(sm);

            return (
              <Card key={sm} className="border border-gray-200 shadow-sm overflow-hidden">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 select-none"
                  onClick={() => toggleExpand(sm)}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={e => { e.stopPropagation(); toggleSubmarket(sm); }}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        allSmSelected ? "bg-blue-600 border-blue-600" : smSelected > 0 ? "bg-blue-200 border-blue-400" : "border-gray-300"
                      }`}
                    >
                      {allSmSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      {!allSmSelected && smSelected > 0 && <div className="w-2 h-2 rounded-sm bg-blue-600" />}
                    </button>
                    <span className="font-semibold text-gray-800">{sm}</span>
                    <Badge variant="outline" className="text-xs">
                      {smSelected}/{smTotal} selected
                    </Badge>
                  </div>
                  {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>

                {expanded && (
                  <div className="border-t border-gray-100 px-4 py-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {zips.map(z => {
                      const selected = activeZips.has(z.zip);
                      const atLimit = !selected && selectedCount >= maxAllowed;
                      return (
                        <button
                          key={z.zip}
                          onClick={() => toggleZip(z.zip)}
                          disabled={atLimit}
                          className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all ${
                            selected
                              ? "bg-blue-600 border-blue-600 text-white"
                              : atLimit
                              ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-mono font-bold text-sm">{z.zip}</span>
                            {atLimit && !selected && <Lock className="w-3 h-3" />}
                            {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <span className={`text-xs mt-0.5 truncate w-full ${selected ? "text-blue-100" : "text-gray-500"}`}>{z.city}</span>
                          <span className={`text-xs ${selected ? "text-blue-200" : "text-gray-400"}`}>
                            ${(z.medianHomeValue / 1000).toFixed(0)}k avg
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Save Footer */}
        {hasChanges && (
          <div className="sticky bottom-4 flex justify-end">
            <div className="bg-white shadow-lg rounded-xl border border-gray-200 px-5 py-3 flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-amber-700">
                <AlertTriangle className="w-4 h-4" />
                <span>Unsaved changes — {selectedCount} zip codes selected</span>
              </div>
              <Button
                onClick={() => setPendingZips(null)}
                variant="outline"
                size="sm"
              >
                Discard
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {saving ? "Saving..." : "Save Service Area"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
