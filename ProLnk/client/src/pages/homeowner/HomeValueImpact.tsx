import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, Loader2, DollarSign, Wrench } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function HomeValueImpact() {
  const { data, isLoading } = trpc.homeownerExtras.getHomeValueImpact.useQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  );

  const { improvements = [], estimatedValueAdded = 0, propertyValue, address } = data ?? {};

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Home Value Impact</h1>
        <p className="text-muted-foreground mt-1">See how your improvements affect your home's estimated value.</p>
      </div>

      {address && <p className="text-sm text-muted-foreground flex items-center gap-1"><Home className="h-3.5 w-3.5" />{address}</p>}

      <div className="grid grid-cols-2 gap-4">
        {propertyValue && (
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Estimated Value</p>
              <p className="text-2xl font-bold">${Number(propertyValue).toLocaleString()}</p>
            </CardContent>
          </Card>
        )}
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardContent className="pt-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Value Added</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">+${estimatedValueAdded.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {improvements.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <TrendingUp className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No improvements logged yet</p>
            <p className="text-sm text-muted-foreground mt-1">Log your home improvements to see their estimated impact on value.</p>
            <Link href="/my-home/projects">
              <Button className="mt-4">Log an Improvement</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <h2 className="font-semibold text-sm">Logged Improvements</h2>
          {improvements.map((imp: any) => {
            const cost = Number(imp.cost ?? 0);
            const roi = 0.65;
            const valueAdded = Math.round(cost * roi);
            return (
              <Card key={imp.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{imp.title ?? imp.category}</p>
                      <p className="text-xs text-muted-foreground">{imp.completedAt ? new Date(imp.completedAt).toLocaleDateString() : "Date unknown"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold flex items-center gap-0.5"><DollarSign className="h-3.5 w-3.5" />{cost.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+${valueAdded.toLocaleString()} est. value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
    </HomeownerLayout>
  );
}
