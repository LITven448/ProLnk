import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitCompare, Star, Loader2, DollarSign, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function ContractorComparison() {
  const { data: quotes, isLoading } = trpc.homeownerExtras.getContractorComparisons.useQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  );

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Compare Contractors</h1>
        <p className="text-muted-foreground mt-1">Side-by-side comparison of quotes you've received.</p>
      </div>

      {(quotes ?? []).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <GitCompare className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No quotes to compare yet</p>
            <p className="text-sm text-muted-foreground mt-1">Request quotes from multiple partners to compare them here.</p>
            <Link href="/my-home/quick-quote">
              <Button className="mt-4">Request Quotes</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {(quotes ?? []).map((q: any) => (
            <Card key={q.id} className={q.quotedAmount === Math.min(...(quotes ?? []).map((x: any) => x.quotedAmount ?? Infinity)) ? "border-green-300 ring-1 ring-green-300" : ""}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{q.businessName}</p>
                      {q.tier && <Badge variant="secondary" className="text-xs capitalize">{q.tier}</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{q.trade}</p>
                    {q.averageRating && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{Number(q.averageRating).toFixed(1)} ({q.reviewCount} reviews)</span>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{q.serviceCategory} · {new Date(q.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-primary">${Number(q.quotedAmount).toLocaleString()}</p>
                    <Button size="sm" className="mt-2">Accept Quote</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    </HomeownerLayout>
  );
}
