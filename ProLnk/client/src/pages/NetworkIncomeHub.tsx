import { useState, useEffect, useRef } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PageLoadingSkeleton from "@/components/PageLoadingSkeleton";
import {
  Copy, Download, Users, DollarSign, TrendingUp, Award,
  CheckCircle, Clock, QrCode, Share2, ChevronDown, ChevronUp, Link2
} from "lucide-react";
import QRCode from "qrcode";

const LEVEL_NAMES: Record<number, string> = {
  1: "Charter Partner",
  2: "Founding Partner",
  3: "Growth Pro",
  4: "Standard Pro",
};

const LEVEL_COLORS: Record<number, string> = {
  1: "bg-amber-100 text-amber-800",
  2: "bg-blue-100 text-blue-800",
  3: "bg-purple-100 text-purple-800",
  4: "bg-gray-100 text-gray-700",
};

const PAYOUT_TYPE_LABELS: Record<string, string> = {
  own_job: "Own Job",
  network_l1: "Direct Referral (L1)",
  network_l2: "2nd Level (L2)",
  network_l3: "3rd Level (L3)",
  photo_origination: "Photo Origination",
};

export default function NetworkIncomeHub() {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [showTree, setShowTree] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { data, isLoading } = trpc.network.getDashboard.useQuery();
  const { data: payoutHistory } = trpc.network.getPayoutHistory.useQuery({ limit: 20 });
  const signAgreement = trpc.network.signAgreement.useMutation({
    onSuccess: () => toast.success("Agreement signed!"),
  });

  useEffect(() => {
    if (data?.referralLink) {
      QRCode.toDataURL(data.referralLink, { width: 240, margin: 2, color: { dark: "#0A1628" } })
        .then(setQrDataUrl)
        .catch(() => {});
    }
  }, [data?.referralLink]);

  if (isLoading) return <PartnerLayout><PageLoadingSkeleton statCards={4} /></PartnerLayout>;

  if (!data) {
    return (
      <PartnerLayout>
        <div className="max-w-lg mx-auto p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#0A1628]/10 flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-8 h-8 text-[#0A1628]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Join the Network</h2>
          <p className="text-sm text-gray-500 mb-6">
            Enroll in the ProLnk partner network to get your referral link, QR code, and start earning network income.
          </p>
          <Button
            className="bg-[#0A1628] text-white"
            onClick={() => window.location.href = "/apply"}
          >
            Get Started
          </Button>
        </div>
      </PartnerLayout>
    );
  }

  const copyLink = () => {
    navigator.clipboard.writeText(data.referralLink).then(() => toast.success("Referral link copied!"));
  };

  return (
    <PartnerLayout>
      <div className="p-4 max-w-2xl mx-auto space-y-4">

        {/* Level badge */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Your Network Level</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{LEVEL_NAMES[data.networkLevel] ?? "Standard Pro"}</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${LEVEL_COLORS[data.networkLevel] ?? "bg-gray-100 text-gray-700"}`}>
            L{data.networkLevel}
          </span>
        </div>

        {/* Agreement banner */}
        {!data.agreementSignedAt && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">Sign your partner agreement</p>
              <p className="text-xs text-amber-700 mt-0.5">Required to receive payouts. Review and sign your {LEVEL_NAMES[data.networkLevel]} agreement.</p>
            </div>
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white flex-shrink-0"
              onClick={() => signAgreement.mutate({ version: "2026-v1" })}
              disabled={signAgreement.isPending}
            >
              Sign Now
            </Button>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">This Month</p>
            <p className="text-2xl font-bold text-green-600 mt-1">${data.monthlyTotal.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-0.5">Network income</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">Pending Payout</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">${data.pendingPayoutAmount.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-0.5">Disbursed monthly</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">Direct Referrals</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">{data.directReferrals}</p>
            <p className="text-xs text-gray-400 mt-0.5">Pros you recruited</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">Total Downline</p>
            <p className="text-2xl font-bold text-[#0A1628] mt-1">{data.totalDownline}</p>
            <p className="text-xs text-gray-400 mt-0.5">All levels</p>
          </div>
        </div>

        {/* Referral link */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <Link2 className="w-4 h-4 text-[#0A1628]" /> Your Referral Link
          </h3>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
            <p className="text-xs text-gray-600 truncate flex-1 font-mono">{data.referralLink}</p>
            <button onClick={copyLink} className="text-gray-400 hover:text-[#0A1628] transition-colors flex-shrink-0">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Share this link — anyone who joins through it is attributed to you.</p>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <QrCode className="w-4 h-4 text-[#0A1628]" /> Your QR Code
          </h3>
          {qrDataUrl ? (
            <div className="flex flex-col items-center gap-3">
              <img src={qrDataUrl} alt="Your referral QR code" className="w-48 h-48 rounded-xl border border-gray-100" />
              <a
                href={qrDataUrl}
                download="prolnk-qr-code.png"
                className="flex items-center gap-2 text-xs font-semibold text-[#0A1628] hover:underline"
              >
                <Download className="w-3.5 h-3.5" /> Download QR Code
              </a>
              <p className="text-xs text-gray-400 text-center">Print this on business cards, flyers, and door hangers.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-gray-300">
              <QrCode className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Income breakdown */}
        {Object.keys(data.incomeByType).length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-500" /> This Month by Income Type
            </h3>
            <div className="space-y-2">
              {Object.entries(data.incomeByType).map(([type, amount]) => (
                <div key={type} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-600">{PAYOUT_TYPE_LABELS[type] ?? type}</span>
                  <span className="text-sm font-semibold text-green-600">${(amount as number).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Downline tree */}
        {data.directReferralList.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <button
              className="w-full flex items-center justify-between text-sm font-semibold text-gray-800"
              onClick={() => setShowTree(!showTree)}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0A1628]" />
                Your Network ({data.totalDownline} pros)
              </span>
              {showTree ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {showTree && (
              <div className="mt-3 space-y-2">
                {data.directReferralList.map((pro) => (
                  <div key={pro.referralCode} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{pro.businessName}</p>
                      <p className="text-xs text-gray-400">{pro.trade}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[pro.level] ?? "bg-gray-100 text-gray-700"}`}>
                        {LEVEL_NAMES[pro.level]}
                      </span>
                      <p className="text-xs text-gray-400 mt-0.5">{pro.jobsThisMonth} jobs this month</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Payout history */}
        {payoutHistory && payoutHistory.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-green-500" /> Payout History
            </h3>
            <div className="space-y-2">
              {payoutHistory.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm text-gray-700">{PAYOUT_TYPE_LABELS[p.payoutType] ?? p.payoutType}</p>
                    <p className="text-xs text-gray-400">{p.payoutMonth}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">${p.amount.toFixed(2)}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                      p.status === "paid" ? "bg-green-100 text-green-700" :
                      p.status === "approved" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
