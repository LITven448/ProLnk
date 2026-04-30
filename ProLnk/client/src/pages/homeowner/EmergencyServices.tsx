import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, Star, Loader2, Shield, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const EMERGENCY_TIPS = [
  { icon: Zap, title: "Gas Leak", tip: "Leave immediately, call 911, then your gas company. Do NOT use light switches." },
  { icon: AlertTriangle, title: "Burst Pipe", tip: "Turn off main water shutoff immediately. Call a plumber. Open faucets to drain pressure." },
  { icon: Shield, title: "Electrical Fire", tip: "Use a Class C fire extinguisher. Never use water. Call 911 first." },
  { icon: AlertTriangle, title: "Roof Damage", tip: "Cover with tarps if safe. Document with photos for insurance. Call a roofer." },
];

export default function EmergencyServices() {
  const { data: partners, isLoading } = trpc.homeownerExtras.getEmergencyPartners.useQuery({});

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-100 dark:bg-red-950/30 rounded-lg">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Emergency Services</h1>
          <p className="text-muted-foreground text-sm">Fast access to vetted pros for urgent home issues.</p>
        </div>
      </div>

      <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
        <CardContent className="pt-4">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-1">Life-threatening emergency?</p>
          <p className="text-sm text-red-600 dark:text-red-300">Call 911 first. Then use Quick Quote to reach a TrustyPro partner fast.</p>
          <Link href="/my-home/quick-quote">
            <Button className="mt-3 bg-red-600 hover:bg-red-700 text-white w-full">Request Emergency Quote</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        {EMERGENCY_TIPS.map(tip => (
          <Card key={tip.title}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <tip.icon className="h-4 w-4 text-red-500" />
                <p className="font-semibold text-sm">{tip.title}</p>
              </div>
              <p className="text-xs text-muted-foreground">{tip.tip}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="font-semibold mb-3">Available TrustyPro Partners</h2>
        {isLoading ? (
          <div className="flex items-center justify-center h-32"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : (partners ?? []).length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground text-sm">No partners found. Use Quick Quote to broadcast to all available pros.</p>
              <Link href="/my-home/quick-quote">
                <Button className="mt-3">Quick Quote</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {(partners ?? []).slice(0, 8).map((p: any) => (
              <Card key={p.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{p.businessName}</p>
                      <p className="text-xs text-muted-foreground">{p.trade}</p>
                      {p.averageRating && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{Number(p.averageRating).toFixed(1)} ({p.reviewCount} reviews)</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {p.isVerified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                      {p.phone && (
                        <a href={"tel:" + p.phone}>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" />Call
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
    </HomeownerLayout>
  );
}
