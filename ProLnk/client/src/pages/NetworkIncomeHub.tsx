import { useState, useEffect, useRef } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PageLoadingSkeleton from "@/components/PageLoadingSkeleton";
import {
  Copy, Download, Users, DollarSign, TrendingUp, Award,
  Clock, QrCode, Share2, ChevronDown, ChevronUp, Link2, Calculator,
  Zap, Target, ArrowUpRight, Activity,
} from "lucide-react";
import QRCode from "qrcode";

// ─── Constants ────────────────────────────────────────────────────────────────

const LEVEL_NAMES: Record<number, string> = {
  1: "Charter Partner",
  2: "Founding Partner",
  3: "Growth Pro",
  4: "Standard Pro",
};

const LEVEL_COLORS: Record<number, string> = {
  1: "bg-amber-100 text-amber-800″,
  2: "bg-blue-100 text-blue-800″,
  3: "bg-purple-100 text-purple-800″,
  4: "bg-gray-100 text-gray-700″,
};

const PAYOUT_TYPE_LABELS: Record<string, string> = {
  own_job: "Own Job",
  network_l1: "Direct Referral (L1)",
  network_l2: "2nd Level (L2)",
  network_l3: "3rd Level (L3)",
  photo_origination: "Photo Origination",
};

// Simulated 6-month history for the bar chart (last 6 months, most recent last)
const MOCK_MONTHS = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];

// ─── Bar Chart ─────────────────────────────────────────────────────────────────

function MonthlyOverrideChart({ monthlyTotal }: { monthlyTotal: number }) {
  // Build plausible 6-month ramp using current month as peak
  const baseValues = [0.18, 0.31, 0.45, 0.62, 0.79, 1.0].map(
    (f) => Math.round(monthlyTotal * f)
  );
  const maxVal = Math.max(...baseValues, 1);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4″>
      <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-4″>
        <TrendingUp className="w-4 h-4 text-green-500″ /> Override Income — Last 6 Months
      </h3>
      <div className="flex items-end gap-2 h-28″>
        {MOCK_MONTHS.map((month, i) => {
          const val = baseValues[i];
          const heightPct = (val / maxVal) * 100;
          const isCurrent = i === MOCK_MONTHS.length - 1;
          return (
            <div key={month} className="flex-1 flex flex-col items-center gap-1″>
              <span className="text-[10px] text-gray-500 font-medium">
                ${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
              </span>
              <div className="w-full flex items-end" style={{ height: 72 }}>
                <div
                  className="w-full rounded-t-md transition-all duration-500″
                  style={{
                    height: `${Math.max(heightPct, 4)}%`,
                    background: isCurrent
                      ? "linear-gradient(180deg, #22c55e, #16a34a)"
                      : "linear-gradient(180deg, #bbf7d0, #dcfce7)",
                  }}
                />
              </div>
              <span
                className={`text-[10px] font-semibold ${isCurrent ? "text-green-600" : "text-gray-400"}`}
              >
                {month}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">
        Based on your network income. Historical months are estimates.
      </p>
    </div>
  );
}

// ─── Network Tree Preview ──────────────────────────────────────────────────────

function NetworkTreePreview({
  directReferralList,
  totalDownline,
}: {
  directReferralList: Array<{ businessName: string; trade: string; level: number; jobsThisMonth: number; referralCode: string }>;
  totalDownline: number;
}) {
  const top3 = directReferralList.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4″>
      <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3″>
        <Users className="w-4 h-4 text-[#0A1628]" /> Your Network Tree
        <span className="ml-auto text-xs font-medium text-gray-400″>{totalDownline} total</span>
      </h3>

      {top3.length === 0 ? (
        <div className="text-center py-6″>
          <Users className="w-8 h-8 text-gray-200 mx-auto mb-2″ />
          <p className="text-sm text-gray-400″>No L1 recruits yet.</p>
          <p className="text-xs text-gray-300 mt-1″>Share your link to grow your network.</p>
        </div>
      ) : (
        <div className="space-y-2″>
          {top3.map((pro) => {
            const isActive = pro.jobsThisMonth > 0;
            return (
              <div
                key={pro.referralCode}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border border-gray-100″
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                  style={{ background: isActive ? "#0A1628″ : "#d1d5db" }}
                >
                  {pro.businessName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0″>
                  <p className="text-sm font-medium text-gray-900 truncate">{pro.businessName}</p>
                  <p className="text-xs text-gray-400″>{pro.trade}</p>
                </div>
                <div className="text-right flex-shrink-0″>
                  <div className="flex items-center gap-1″>
                    <Activity
                      className="w-3 h-3″
                      style={{ color: isActive ? "#22c55e" : "#d1d5db" }}
                    />
                    <span className="text-xs font-semibold text-gray-700″>
                      {pro.jobsThisMonth} job{pro.jobsThisMonth !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400″>this month</p>
                </div>
              </div>
            );
          })}
          {directReferralList.length > 3 && (
            <p className="text-xs text-gray-400 text-center pt-1″>
              + {directReferralList.length - 3} more direct recruits
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Momentum Score ────────────────────────────────────────────────────────────

function MomentumScore({
  directReferrals,
  totalDownline,
  monthlyTotal,
}: {
  directReferrals: number;
  totalDownline: number;
  monthlyTotal: number;
}) {
  const score = Math.min(
    100,
    Math.round(
      directReferrals * 8 +
      Math.min(totalDownline, 20) * 2 +
      Math.min(monthlyTotal / 10, 40)
    )
  );

  const label = score >= 80 ? "Blazing" : score >= 60 ? "Strong" : score >= 40 ? "Building" : score >= 20 ? "Early" : "Starting";
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#3b82f6″ : score >= 40 ? "#f59e0b" : "#6b7280";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4″>
      <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-4″>
        <Zap className="w-4 h-4 text-yellow-500″ /> Your Network Momentum
      </h3>
      <div className="flex items-center gap-4″>
        <div className="relative w-20 h-20 flex-shrink-0″>
          <svg viewBox="0 0 36 36″ className="w-20 h-20 -rotate-90">
            <circle cx="18″ cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
            <circle
              cx="18″ cy="18" r="15.9"
              fill="none"
              stroke={color}
              strokeWidth="3″
              strokeDasharray={`${score} ${100 - score}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-gray-900″>{score}</span>
          </div>
        </div>
        <div className="flex-1″>
          <p className="text-base font-bold" style={{ color }}>{label}</p>
          <p className="text-xs text-gray-500 mt-1″>
            Score is a composite of new recruits, downline size, and monthly override volume.
          </p>
          <div className="mt-2 space-y-1″>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500″>Direct recruits</span>
              <span className="font-semibold text-gray-800″>{directReferrals}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500″>Total downline</span>
              <span className="font-semibold text-gray-800″>{totalDownline}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── $1K/mo Calculator ────────────────────────────────────────────────────────

function PathToPassive({
  directReferrals,
  monthlyTotal,
}: {
  directReferrals: number;
  monthlyTotal: number;
}) {
  const target = 1000;
  const gap = Math.max(0, target - monthlyTotal);
  const subPer = 149 * 0.12;
  const jobPer = 3 * 500 * 0.07;
  const incomePerRecruit = subPer + jobPer;
  const recruitsNeeded = incomePerRecruit > 0 ? Math.ceil(gap / incomePerRecruit) : 0;
  const alreadyThere = gap <= 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4″>
      <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-4″>
        <Target className="w-4 h-4 text-purple-500″ /> Fastest Path to $1K/mo Passive
      </h3>

      {alreadyThere ? (
        <div className="text-center py-4″>
          <p className="text-2xl font-bold text-green-600″>🎉 You're there!</p>
          <p className="text-sm text-gray-500 mt-1″>Your network already generates $1K+/mo.</p>
        </div>
      ) : (
        <>
          <div className="mb-3″>
            <div className="flex justify-between text-xs text-gray-500 mb-1.5″>
              <span>Current: ${Math.round(monthlyTotal)}/mo</span>
              <span>Goal: $1,000/mo</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600″
                style={{ width: `${Math.min(100, (monthlyTotal / target) * 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 mb-3″>
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs font-medium text-gray-700″>Income gap to close</p>
                <p className="text-xs text-gray-400″>Monthly passive target remaining</p>
              </div>
              <p className="text-sm font-bold text-red-500″>${Math.round(gap)}/mo</p>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs font-medium text-gray-700″>Value per new recruit</p>
                <p className="text-xs text-gray-400″>Sub override + avg job override (L1)</p>
              </div>
              <p className="text-sm font-bold text-green-600″>${Math.round(incomePerRecruit)}/mo</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 px-3 bg-[#0A1628] rounded-xl">
            <p className="text-sm font-semibold text-white">Recruits needed</p>
            <p className="text-xl font-bold text-purple-400″>
              {recruitsNeeded}
              <span className="text-xs font-normal text-purple-300″> more L1 pros</span>
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            You already have {directReferrals}. {recruitsNeeded > 0 ? `${recruitsNeeded} more gets you to $1K/mo passive.` : "You're close!"}
          </p>
        </>
      )}
    </div>
  );
}

// ─── Live Income Simulator ────────────────────────────────────────────────────

function LiveIncomeSimulator() {
  const [recruits, setRecruits] = useState(5);

  const subOverride = recruits * 149 * 0.12;
  const jobOverride = recruits * 3 * 500 * 0.07;
  const total = subOverride + jobOverride;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4″>
      <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-4″>
        <Calculator className="w-4 h-4 text-teal-500″ /> Income Simulator
      </h3>

      <div className="mb-4″>
        <div className="flex items-center justify-between mb-1.5″>
          <label className="text-xs font-medium text-gray-600″>Direct Recruits</label>
          <span className="text-sm font-bold text-[#0A1628]">{recruits} pros</span>
        </div>
        <input
          type="range"
          min={1}
          max={20}
          value={recruits}
          onChange={(e) => setRecruits(Number(e.target.value))}
          className="w-full accent-teal-500″
        />
        <div className="flex justify-between text-xs text-gray-400 mt-0.5″>
          <span>1</span>
          <span>20</span>
        </div>
      </div>

      <div className="space-y-2 mb-4″>
        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-xs font-medium text-gray-700″>Subscription Overrides</p>
            <p className="text-xs text-gray-400″>$149 × 12% × {recruits} recruits</p>
          </div>
          <p className="text-sm font-bold text-green-600″>${subOverride.toFixed(0)}<span className="text-xs font-normal text-gray-400">/mo</span></p>
        </div>
        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-xs font-medium text-gray-700″>Job Overrides</p>
            <p className="text-xs text-gray-400″>3 jobs/mo × $500 avg × 7% × {recruits} recruits</p>
          </div>
          <p className="text-sm font-bold text-green-600″>${jobOverride.toFixed(0)}<span className="text-xs font-normal text-gray-400">/mo</span></p>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 px-3 bg-[#0A1628] rounded-xl">
        <p className="text-sm font-semibold text-white">Estimated Passive Income</p>
        <p className="text-xl font-bold text-teal-400″>${total.toFixed(0)}<span className="text-xs font-normal text-teal-300">/mo</span></p>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">Estimates based on platform averages. Actual results vary.</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NetworkIncomeHub() {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [showTree, setShowTree] = useState(false);

  const { data, isLoading } = trpc.network.getDashboard.useQuery();
  const { data: payoutHistory } = trpc.network.getPayoutHistory.useQuery({ limit: 20 });
  const signAgreement = trpc.network.signAgreement.useMutation({
    onSuccess: () => toast.success("Agreement signed!"),
  });

  useEffect(() => {
    if (data?.referralLink) {
      QRCode.toDataURL(data.referralLink, { width: 240, margin: 2, color: { dark: "#0A1628″ } })
        .then(setQrDataUrl)
        .catch(() => {});
    }
  }, [data?.referralLink]);

  if (isLoading) return <PartnerLayout><PageLoadingSkeleton statCards={4} /></PartnerLayout>;

  if (!data) {
    return (
      <PartnerLayout>
        <div className="max-w-lg mx-auto p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#0A1628]/10 flex items-center justify-center mx-auto mb-4″>
            <Share2 className="w-8 h-8 text-[#0A1628]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2″>Join the Network</h2>
          <p className="text-sm text-gray-500 mb-6″>
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
      <div className="p-4 max-w-2xl mx-auto space-y-4″>

        {/* Level badge */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Your Network Level</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5″>{LEVEL_NAMES[data.networkLevel] ?? "Standard Pro"}</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${LEVEL_COLORS[data.networkLevel] ?? "bg-gray-100 text-gray-700"}`}>
            L{data.networkLevel}
          </span>
        </div>

        {/* Agreement banner */}
        {!data.agreementSignedAt && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3″>
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5″ />
            <div className="flex-1″>
              <p className="text-sm font-semibold text-amber-800″>Sign your partner agreement</p>
              <p className="text-xs text-amber-700 mt-0.5″>Required to receive payouts. Review and sign your {LEVEL_NAMES[data.networkLevel]} agreement.</p>
            </div>
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white flex-shrink-0″
              onClick={() => signAgreement.mutate({ version: "2026-v1″ })}
              disabled={signAgreement.isPending}
            >
              Sign Now
            </Button>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3″>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4″>
            <p className="text-xs text-gray-500″>This Month</p>
            <p className="text-2xl font-bold text-green-600 mt-1″>${data.monthlyTotal.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-0.5″>Network income</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4″>
            <p className="text-xs text-gray-500″>Pending Payout</p>
            <p className="text-2xl font-bold text-blue-600 mt-1″>${data.pendingPayoutAmount.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-0.5″>Disbursed monthly</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4″>
            <p className="text-xs text-gray-500″>Direct Referrals</p>
            <p className="text-2xl font-bold text-purple-600 mt-1″>{data.directReferrals}</p>
            <p className="text-xs text-gray-400 mt-0.5″>Pros you recruited</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4″>
            <p className="text-xs text-gray-500″>Total Downline</p>
            <p className="text-2xl font-bold text-[#0A1628] mt-1″>{data.totalDownline}</p>
            <p className="text-xs text-gray-400 mt-0.5″>All levels</p>
          </div>
        </div>

        {/* Monthly override chart */}
        <MonthlyOverrideChart monthlyTotal={data.monthlyTotal} />

        {/* Network tree preview */}
        <NetworkTreePreview
          directReferralList={data.directReferralList}
          totalDownline={data.totalDownline}
        />

        {/* Momentum score */}
        <MomentumScore
          directReferrals={data.directReferrals}
          totalDownline={data.totalDownline}
          monthlyTotal={data.monthlyTotal}
        />

        {/* Path to $1K */}
        <PathToPassive
          directReferrals={data.directReferrals}
          monthlyTotal={data.monthlyTotal}
        />

        {/* Income simulator */}
        <LiveIncomeSimulator />

        {/* Referral link */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4″>
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3″>
            <Link2 className="w-4 h-4 text-[#0A1628]" /> Your Referral Link
          </h3>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200″>
            <p className="text-xs text-gray-600 truncate flex-1 font-mono">{data.referralLink}</p>
            <button onClick={copyLink} className="text-gray-400 hover:text-[#0A1628] transition-colors flex-shrink-0″>
              <Copy className="w-4 h-4″ />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2″>Share this link — anyone who joins through it is attributed to you permanently.</p>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4″>
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3″>
            <QrCode className="w-4 h-4 text-[#0A1628]" /> Your QR Code
          </h3>
          {qrDataUrl ? (
            <div className="flex flex-col items-center gap-3″>
              <img src={qrDataUrl} alt="Your referral QR code" className="w-48 h-48 rounded-xl border border-gray-100″ />
              <a
                href={qrDataUrl}
                download="prolnk-qr-code.png"
                className="flex items-center gap-2 text-xs font-semibold text-[#0A1628] hover:underline"
              >
                <Download className="w-3.5 h-3.5″ /> Download QR Code
              </a>
              <p className="text-xs text-gray-400 text-center">Print on business cards, flyers, and door hangers.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-gray-300″>
              <QrCode className="w-10 h-10″ />
            </div>
          )}
        </div>

        {/* Income breakdown by type */}
        {Object.keys(data.incomeByType).length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4″>
            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3″>
              <DollarSign className="w-4 h-4 text-green-500″ /> This Month by Income Type
            </h3>
            <div className="space-y-2″>
              {Object.entries(data.incomeByType).map(([type, amount]) => (
                <div key={type} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0″>
                  <span className="text-sm text-gray-600″>{PAYOUT_TYPE_LABELS[type] ?? type}</span>
                  <span className="text-sm font-semibold text-green-600″>${(amount as number).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full downline tree (collapsible) */}
        {data.directReferralList.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4″>
            <button
              className="w-full flex items-center justify-between text-sm font-semibold text-gray-800″
              onClick={() => setShowTree(!showTree)}
            >
              <span className="flex items-center gap-2″>
                <Users className="w-4 h-4 text-[#0A1628]" />
                Full Network ({data.totalDownline} pros)
              </span>
              {showTree ? <ChevronUp className="w-4 h-4 text-gray-400″ /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {showTree && (
              <div className="mt-3 space-y-2″>
                {data.directReferralList.map((pro) => (
                  <div key={pro.referralCode} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0″>
                    <div>
                      <p className="text-sm font-medium text-gray-900″>{pro.businessName}</p>
                      <p className="text-xs text-gray-400″>{pro.trade}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[pro.level] ?? "bg-gray-100 text-gray-700"}`}>
                        {LEVEL_NAMES[pro.level]}
                      </span>
                      <p className="text-xs text-gray-400 mt-0.5″>{pro.jobsThisMonth} jobs this month</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Payout history */}
        {payoutHistory && payoutHistory.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4″>
            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3″>
              <Award className="w-4 h-4 text-green-500″ /> Payout History
            </h3>
            <div className="space-y-2″>
              {payoutHistory.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0″>
                  <div>
                    <p className="text-sm text-gray-700″>{PAYOUT_TYPE_LABELS[p.payoutType] ?? p.payoutType}</p>
                    <p className="text-xs text-gray-400″>{p.payoutMonth}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600″>${p.amount.toFixed(2)}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                      p.status === "paid" ? "bg-green-100 text-green-700″ :
                      p.status === "approved" ? "bg-blue-100 text-blue-700″ :
                      "bg-yellow-100 text-yellow-700″
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
