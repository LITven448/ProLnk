import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Star, Loader2, Users, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

function timeLeft(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d left`;
  const hours = Math.floor(diff / 3600000);
  return `${hours}h left`;
}

export default function NeighborhoodDeals() {
  const { data: deals, isLoading } = trpc.homeownerExtras.getNeighborhoodDeals.useQuery();

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Neighborhood Deals</h1>
        <p className="text-muted-foreground mt-1">Group discounts when multiple homeowners book the same service.</p>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm">How it works</p>
              <p className="text-xs text-muted-foreground mt-1">When 3+ neighbors book the same service in the same week, everyone gets a group discount. The more who join, the bigger the savings.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : (deals ?? []).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Tag className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No active deals in your area</p>
            <p className="text-sm text-muted-foreground mt-1">Check back soon — deals are added as partners offer group pricing.</p>
            <Link href="/my-home/quick-quote">
              <Button className="mt-4">Request a Service</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {(deals ?? []).map((deal: any) => (
            <Card key={deal.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{deal.title ?? deal.serviceType}</p>
                      {deal.discountPercent && <Badge className="text-xs">{deal.discountPercent}% off</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{deal.partnerName} · {deal.trade}</p>
                    {deal.averageRating && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{Number(deal.averageRating).toFixed(1)}</span>
                      </div>
                    )}
                    {deal.expiresAt && (
                      <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />{timeLeft(deal.expiresAt)}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {deal.dealPrice && <p className="text-lg font-bold text-primary">${Number(deal.dealPrice).toLocaleString()}</p>}
                    {deal.originalPrice && <p className="text-xs text-muted-foreground line-through">${Number(deal.originalPrice).toLocaleString()}</p>}
                    <Button size="sm" className="mt-2">Claim Deal</Button>
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
