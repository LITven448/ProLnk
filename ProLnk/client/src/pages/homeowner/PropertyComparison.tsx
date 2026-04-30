import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Loader2, Home, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

function CompRow({ label, yours, area, higherIsBetter = true }: { label: string; yours: number | null; area: number | null; higherIsBetter?: boolean }) {
  if (!yours || !area) return null;
  const diff = ((yours - area) / area) * 100;
  const isGood = higherIsBetter ? diff >= 0 : diff <= 0;
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Your Home</p>
          <p className="font-semibold text-sm">{yours.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Area Avg</p>
          <p className="font-semibold text-sm">{area.toLocaleString()}</p>
        </div>
        <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${isGood ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {diff >= 0 ? "+" : ""}{diff.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

export default function PropertyComparison() {
  const { data, isLoading } = trpc.homeownerExtras.getPropertyComparison.useQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  );

  if (!data?.property) return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardContent className="py-12 text-center">
          <Home className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="font-medium">No property data yet</p>
          <p className="text-sm text-muted-foreground mt-1">Add your home details to compare with your neighborhood.</p>
          <Link href="/my-home/profile">
            <Button className="mt-4">Add Home Details</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );

  const { property: p, areaAvgSqft, areaAvgValue, areaAvgYearBuilt, totalInArea } = data;

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Property Comparison</h1>
        <p className="text-muted-foreground mt-1">How your home stacks up against others in your zip code.</p>
      </div>

      {p.address && <p className="text-sm text-muted-foreground flex items-center gap-1"><Home className="h-3.5 w-3.5" />{p.address}</p>}

      {totalInArea > 0 && (
        <p className="text-xs text-muted-foreground">Comparing against {totalInArea} properties in {p.zip ?? "your area"}</p>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4" />Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <CompRow label="Square Footage" yours={p.sqft} area={areaAvgSqft} />
          <CompRow label="Estimated Value" yours={p.estimatedValue ? Number(p.estimatedValue) : null} area={areaAvgValue} />
          <CompRow label="Year Built" yours={p.yearBuilt} area={areaAvgYearBuilt} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Your Home Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {p.bedrooms && <div><p className="text-xs text-muted-foreground">Bedrooms</p><p className="font-medium">{p.bedrooms}</p></div>}
            {p.bathrooms && <div><p className="text-xs text-muted-foreground">Bathrooms</p><p className="font-medium">{p.bathrooms}</p></div>}
            {p.propertyType && <div><p className="text-xs text-muted-foreground">Type</p><p className="font-medium capitalize">{p.propertyType.replace(/_/g, " ")}</p></div>}
            {p.lotSize && <div><p className="text-xs text-muted-foreground">Lot Size</p><p className="font-medium">{p.lotSize.replace(/_/g, " ")}</p></div>}
          </div>
        </CardContent>
      </Card>
    </div>
    </HomeownerLayout>
  );
}
