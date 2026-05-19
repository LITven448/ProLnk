/**
 * Homeowner Referral Program — Wave 52 upgrade
 * Real tRPC data: credit balance, referral history, submit referral, redeem credit
 */
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import {
  Gift, Copy, Share2, Users, CheckCircle, Clock,
  ArrowRight, Wallet, Sparkles, QrCode, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

const CREDIT_PER_REFERRAL = 25;
const REFERRAL_STEPS = [
  { icon: Share2,  label: "Share your link",          desc: "Send your unique referral link to a neighbor or friend." },
  { icon: Users,   label: "They sign up & scan",       desc: "Your neighbor creates a TrustyPro account and uploads their first photo." },
  { icon: Gift,    label: "You both earn $25 credit",  desc: "Once their first scan is complete, you each receive a $25 service credit." },
];

export default function HomeownerReferral() {
  const utils = trpc.useUtils();
  const { data: creditData, isLoading: creditLoading } = trpc.homeowner.getCreditBalance.useQuery();
  const { data: referrals = [] } = trpc.homeowner.getMyReferrals.useQuery();

  const submitReferral = trpc.homeowner.submitReferral.useMutation({
    onSuccess: (res) => {
      toast.success(res.message);
      setEmailInput("");
      utils.homeowner.getMyReferrals.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const redeemCredit = trpc.homeowner.redeemCredit.useMutation({
    onSuccess: (res) => {
      toast.success(`$${redeemAmount} credit applied to your account!`);
      setRedeemOpen(false);
      utils.homeowner.getCreditBalance.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState(25);

  const creditBalance = creditData?.creditBalance ?? 0;
  const referralCount = creditData?.referralCount ?? 0;
  const referralCode = creditData?.referralCode ?? "TP-XXXXXX";
  const referralUrl = `${window.location.origin}/join?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSendEmail = () => {
    if (!emailInput.trim()) { toast.error("Enter an email address"); return; }
    submitReferral.mutate({ email: emailInput.trim(), name: nameInput.trim() || undefined });
  };

  const pendingCount = referrals.filter((r: any) => r.status === "pending").length;
  const completedCount = referrals.filter((r: any) => r.status === "completed").length;

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#00B5B8]/10 flex items-center justify-center mx-auto">
            <Gift className="w-7 h-7 text-[#00B5B8]" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Refer a Neighbor</h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Share TrustyPro with neighbors and earn{" "}
            <strong className="text-foreground">${CREDIT_PER_REFERRAL} service credit</strong>{" "}
            for every friend who completes their first scan.
          </p>
        </div>

        {/* Credit balance card */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#0d2040] rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60 font-medium uppercase tracking-wide">Your Referral Credits</p>
              {creditLoading ? (
                <div className="h-9 w-24 bg-white/10 rounded animate-pulse mt-1" />
              ) : (
                <p className="text-3xl font-black mt-1">${creditBalance.toFixed(2)}</p>
              )}
              <p className="text-xs text-white/60 mt-1">{referralCount} successful referral{referralCount !== 1 ? "s" : ""}</p>
            </div>
            <div className="text-right space-y-2">
              <div>
                <p className="text-xs text-white/60">Pending</p>
                <p className="text-xl font-bold text-[#F5E642]">{pendingCount} invite{pendingCount !== 1 ? "s" : ""}</p>
              </div>
              {creditBalance >= 25 && (
                <Button
                  size="sm"
                  onClick={() => setRedeemOpen(true)}
                  className="bg-[#00B5B8] hover:bg-[#009fa2] text-white text-xs gap-1.5 h-8"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  Redeem Credit
                </Button>
              )}
            </div>
          </div>
          {/* Progress to next reward */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between text-xs text-white/60 mb-1.5">
              <span>Next reward milestone</span>
              <span>{Math.min(referralCount % 5, 5)}/5 referrals</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00B5B8] to-[#F5E642] rounded-full transition-all"
                style={{ width: `${Math.min((referralCount % 5) / 5, 1) * 100}%` }}
              />
            </div>
            <p className="text-xs text-white/40 mt-1.5">
              {5 - (referralCount % 5)} more to unlock a <span className="text-[#F5E642] font-semibold">$50 bonus credit</span>
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-card border rounded-xl p-5 space-y-4">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00B5B8]" />
            How it works
          </p>
          <div className="space-y-3">
            {REFERRAL_STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00B5B8]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <step.icon className="w-4 h-4 text-[#00B5B8]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share link */}
        <div className="bg-card border rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <QrCode className="w-4 h-4 text-[#00B5B8]" />
            Your Referral Link
          </p>
          <div className="flex gap-2">
            <Input
              readOnly
              value={referralUrl}
              className="text-xs font-mono bg-muted/50 flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex-shrink-0 gap-1.5"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5 text-xs"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Join TrustyPro — Get a Free Home Scan", url: referralUrl });
                } else {
                  handleCopy();
                }
              }}
            >
              <Share2 className="w-3.5 h-3.5" />
              Share via App
            </Button>
          </div>
        </div>

        {/* Send by email */}
        <div className="bg-card border rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#00B5B8]" />
            Invite by Email
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Neighbor's name (optional)"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              className="flex-1 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="neighbor@example.com"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSendEmail()}
              className="flex-1 text-sm"
            />
            <Button
              size="sm"
              onClick={handleSendEmail}
              disabled={submitReferral.isPending}
              className="flex-shrink-0 gap-1.5 bg-[#0A1628] hover:bg-[#0d2040] text-white"
            >
              {submitReferral.isPending ? "Sending..." : <><ArrowRight className="w-4 h-4" /> Send</>}
            </Button>
          </div>
        </div>

        {/* Referral history */}
        {referrals.length > 0 && (
          <div className="bg-card border rounded-xl p-5 space-y-3">
            <p className="text-sm font-semibold text-foreground">Your Referrals</p>
            <div className="space-y-2">
              {referrals.map((r: any, i: number) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">
                      {(r.refereeName ?? r.refereeEmail ?? "?")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {r.refereeName ?? r.refereeEmail ?? "Invited Friend"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.status === "completed" ? (
                      <>
                        <span className="text-sm font-bold text-green-500">+${CREDIT_PER_REFERRAL}</span>
                        <Badge variant="outline" className="text-[10px] text-green-600 border-green-200 bg-green-50">
                          <CheckCircle className="w-2.5 h-2.5 mr-1" /> Earned
                        </Badge>
                      </>
                    ) : (
                      <Badge variant="outline" className="text-[10px] text-yellow-600 border-yellow-200 bg-yellow-50">
                        <Clock className="w-2.5 h-2.5 mr-1" /> Pending
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {referrals.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
            No referrals yet — share your link to get started!
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Credits are applied automatically to your next service booking. No expiration.
        </p>
      </div>

      {/* Redeem Credit Dialog */}
      <Dialog open={redeemOpen} onOpenChange={setRedeemOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#00B5B8]" />
              Redeem Service Credit
            </DialogTitle>
            <DialogDescription>
              Apply your referral credits toward your next service booking.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground">Available Balance</p>
              <p className="text-3xl font-black text-foreground mt-1">${creditBalance.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Amount to Redeem</label>
              <div className="flex gap-2">
                {[25, 50, 100].filter(a => a <= creditBalance).map(a => (
                  <button
                    key={a}
                    onClick={() => setRedeemAmount(a)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                      redeemAmount === a
                        ? "bg-[#00B5B8] text-white border-[#00B5B8]"
                        : "bg-card border-border text-foreground hover:border-[#00B5B8]"
                    }`}
                  >
                    ${a}
                  </button>
                ))}
              </div>
              <Input
                type="number"
                min={1}
                max={creditBalance}
                value={redeemAmount}
                onChange={e => setRedeemAmount(Math.min(Number(e.target.value), creditBalance))}
                className="text-sm"
              />
            </div>
            <Button
              className="w-full bg-[#0A1628] hover:bg-[#0d2040] text-white gap-2"
              disabled={redeemCredit.isPending || redeemAmount < 1 || redeemAmount > creditBalance}
              onClick={() => redeemCredit.mutate({ amount: redeemAmount })}
            >
              {redeemCredit.isPending ? "Processing..." : `Redeem $${redeemAmount} Credit`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </HomeownerLayout>
  );
}
