import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Users, DollarSign, Copy, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const TIERS = [
  { referrals: 1, reward: "$25 credit", badge: "First Referral" },
  { referrals: 3, reward: "$75 credit", badge: "3 Referrals" },
  { referrals: 5, reward: "$150 credit + Free Inspection", badge: "5 Referrals" },
  { referrals: 10, reward: "$350 credit + Priority Booking", badge: "10 Referrals" },
];

export default function ReferralProgram() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const { data: balance } = trpc.homeowner.getCreditBalance.useQuery();
  const { data: referrals, isLoading } = trpc.homeowner.getMyReferrals.useQuery();
  const submitMutation = trpc.homeowner.submitReferral.useMutation({
    onSuccess: (d) => { toast.success(d.message); setEmail(""); },
    onError: (e) => toast.error(e.message),
  });

  const referralCode = balance?.referralCode ?? (user ? `HO-${String(user.id).padStart(6, "0")}` : "HO-000001");
  const referralLink = `${window.location.origin}/trustypro?ref=${referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const sendInvite = () => {
    if (!email.includes("@")) { toast.error("Please enter a valid email"); return; }
    submitMutation.mutate({ email });
  };

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Refer a Neighbor</h1>
        <p className="text-muted-foreground mt-1">Earn credits for every neighbor you bring to TrustyPro.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="pt-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto text-primary mb-1" />
            <p className="text-2xl font-bold">${(balance?.creditBalance ?? 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Credit Balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Users className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
            <p className="text-2xl font-bold">{balance?.referralCount ?? 0}</p>
            <p className="text-xs text-muted-foreground">Referrals Made</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Your Referral Link</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input value={referralLink} readOnly className="text-xs" />
            <Button variant="outline" onClick={copyLink} className="shrink-0">
              {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Friend's email address" value={email} onChange={e => setEmail(e.target.value)} />
            <Button onClick={sendInvite} disabled={submitMutation.isPending} className="shrink-0">
              {submitMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Invite"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Reward Tiers</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {TIERS.map(tier => {
            const count = balance?.referralCount ?? 0;
            const achieved = count >= tier.referrals;
            return (
              <div key={tier.referrals} className={`flex items-center justify-between p-3 rounded-lg border ${achieved ? "border-green-300 bg-green-50 dark:bg-green-950/20" : ""}`}>
                <div className="flex items-center gap-3">
                  {achieved ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Gift className="h-4 w-4 text-muted-foreground" />}
                  <div>
                    <p className="text-sm font-medium">{tier.badge}</p>
                    <p className="text-xs text-muted-foreground">{tier.referrals} referral{tier.referrals > 1 ? "s" : ""} needed</p>
                  </div>
                </div>
                <Badge variant={achieved ? "default" : "secondary"}>{tier.reward}</Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {isLoading ? null : (referrals ?? []).length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Your Referrals</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {(referrals ?? []).map((r: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm p-2 rounded border">
                <span className="text-muted-foreground">{r.referredEmail ?? "Referred user"}</span>
                <Badge variant="secondary" className="capitalize">{r.status ?? "pending"}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
    </HomeownerLayout>
  );
}
