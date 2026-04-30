import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Loader2, PiggyBank, TrendingDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function SavingsTracker() {
  const { data, isLoading } = trpc.homeownerExtras.getSavingsData.useQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  );

  const { totalSaved = 0, deals = [] } = data ?? {};

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Savings Tracker</h1>
        <p className="text-muted-foreground mt-1">Track how much you've saved through TrustyPro deals.</p>
      </div>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200">
        <CardContent className="pt-6 text-center">
          <PiggyBank className="h-10 w-10 mx-auto text-green-600 mb-2" />
          <p className="text-4xl font-bold text-green-700 dark:text-green-400">${totalSaved.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">Total saved through TrustyPro</p>
        </CardContent>
      </Card>

      {deals.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <TrendingDown className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No savings recorded yet</p>
            <p className="text-sm text-muted-foreground mt-1">Book services through TrustyPro to start tracking your savings.</p>
            <Link href="/my-home/neighborhood-deals">
              <Button className="mt-4">Browse Deals</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <h2 className="font-semibold text-sm">Deal History</h2>
          {deals.map((deal: any) => {
            const orig = Number(deal.originalPrice ?? 0);
            const final = Number(deal.dealPrice ?? deal.finalPrice ?? orig);
            const saved = Math.max(0, orig - final);
            return (
              <Card key={deal.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{deal.title ?? deal.serviceType ?? "Service"}</p>
                      <p className="text-xs text-muted-foreground">{deal.partnerName} · {new Date(deal.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">${final.toLocaleString()}</p>
                      {saved > 0 && (
                        <p className="text-xs text-green-600 flex items-center gap-0.5 justify-end">
                          <DollarSign className="h-3 w-3" />saved ${saved.toLocaleString()}
                        </p>
                      )}
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
