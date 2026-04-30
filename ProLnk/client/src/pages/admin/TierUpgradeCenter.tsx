import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ArrowUpCircle, CheckCircle, Zap } from "lucide-react";

export default function TierUpgradeCenter() {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.adminExtras.getTierUpgradeCandidates.useQuery();
  const forceTierUpgrade = trpc.adminExtras.forceTierUpgrade.useMutation({
    onSuccess: (result) => {
      toast.success(`Partner upgraded to ${result.newTier}! Congratulations email sent.`);
      utils.adminExtras.getTierUpgradeCandidates.invalidate();
    },
    onError: (err) => {
      toast.error(`Upgrade failed: ${err.message}`);
    },
  });

  const candidates = data?.candidates ?? [];
  const ready = candidates.filter((c: any) => c.readyToUpgrade);
  const notReady = candidates.filter((c: any) => !c.readyToUpgrade);

  const TIER_ORDER = ["scout", "pro", "crew", "company", "enterprise"];

  function handleUpgrade(partnerId: number, currentTier: string, nextTier: string) {
    if (!TIER_ORDER.includes(nextTier)) return;
    forceTierUpgrade.mutate({
      partnerId,
      newTier: nextTier as "scout" | "pro" | "crew" | "company" | "enterprise",
    });
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Tier Upgrade Center</h1>
          <p className="text-muted-foreground">Partners who qualify for tier upgrades based on jobs and referrals</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Ready to Upgrade</span>
              </div>
              <div className="text-3xl font-bold text-green-600">{data?.readyCount ?? 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <ArrowUpCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Total Candidates</span>
              </div>
              <div className="text-3xl font-bold">{data?.totalCandidates ?? 0}</div>
            </CardContent>
          </Card>
        </div>

        {ready.length > 0 && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center gap-2">
                <Zap className="h-5 w-5" /> Ready for Upgrade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ready.map((p: any) => (
                  <div key={p.id} className="flex items-center justify-between border rounded-lg p-3 bg-green-50">
                    <div>
                      <div className="font-medium">{p.businessName}</div>
                      <div className="text-sm text-muted-foreground">
                        {p.tier} → <span className="font-semibold text-green-700">{p.thresholds.nextTier}</span>
                        {" · "}{p.jobsLogged} jobs · {p.referralCount} referrals
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700">Eligible</Badge>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        disabled={forceTierUpgrade.isPending}
                        onClick={() => handleUpgrade(p.id, p.tier, p.thresholds.nextTier)}
                      >
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle>In Progress</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="space-y-3">
              {notReady.slice(0, 30).map((p: any) => (
                <div key={p.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div>
                    <div className="font-medium">{p.businessName}</div>
                    <div className="text-sm text-muted-foreground">{p.tier} → {p.thresholds.nextTier}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-right">
                      <div className={p.jobsMet ? "text-green-600" : "text-muted-foreground"}>
                        {p.jobsMet ? "✓" : "✗"} {p.jobsLogged}/{p.thresholds.jobs} jobs
                      </div>
                      <div className={p.referralsMet ? "text-green-600" : "text-muted-foreground"}>
                        {p.referralsMet ? "✓" : "✗"} {p.referralCount}/{p.thresholds.referrals} referrals
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={forceTierUpgrade.isPending}
                      onClick={() => handleUpgrade(p.id, p.tier, p.thresholds.nextTier)}
                    >
                      Force Upgrade
                    </Button>
                  </div>
                </div>
              ))}
              {notReady.length === 0 && !isLoading && (
                <div className="py-8 text-center text-muted-foreground">No candidates yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
