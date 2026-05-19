import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, User, Users, ChevronUp, ChevronDown, Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const TIER_COLORS: Record<string, string> = {
  charter:  "bg-yellow-100 text-yellow-800 border-yellow-300″,
  founding: "bg-purple-100 text-purple-800 border-purple-300″,
  level3:   "bg-blue-100 text-blue-800 border-blue-300″,
  level4:   "bg-green-100 text-green-800 border-green-300″,
  waitlist: "bg-gray-100 text-gray-600 border-gray-300″,
  standard: "bg-gray-100 text-gray-600 border-gray-300″,
};

const TIER_LABELS: Record<string, string> = {
  charter:  "Charter",
  founding: "Founding",
  level3:   "Level 3″,
  level4:   "Level 4″,
  waitlist: "Waitlist",
  standard: "Standard",
};

function TierBadge({ tier }: { tier?: string }) {
  const t = tier ?? "standard";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${TIER_COLORS[t] ?? TIER_COLORS.standard}`}>
      {TIER_LABELS[t] ?? t}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <button onClick={copy} title="Copy" className="ml-1.5 text-gray-400 hover:text-gray-700 transition-colors">
      {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-500″ /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function CommissionPreview({ referralCode, tier }: { referralCode?: string; tier?: string }) {
  const [jobValue, setJobValue] = useState(5000);
  const keepRate = 0.72;
  const platformFee = jobValue * 0.10;
  const proEarns = (jobValue - platformFee) * keepRate;
  const l1Override = platformFee * 0.07;
  const l2Override = platformFee * 0.04;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5″>
      <h3 className="text-sm font-bold text-gray-900 mb-3″>Commission Preview</h3>
      <div className="flex items-center gap-2 mb-4″>
        <label className="text-xs text-gray-500 whitespace-nowrap">Job Value ($)</label>
        <input
          type="number"
          value={jobValue}
          onChange={e => setJobValue(Math.max(100, Number(e.target.value)))}
          className="w-28 text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500″
        />
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-500″>Job value</span>
          <span className="font-semibold">${jobValue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500″>Platform fee (10%)</span>
          <span className="text-gray-700″>−${platformFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-2″>
          <span className="text-gray-700 font-medium">Pro keeps (72%)</span>
          <span className="font-bold text-green-700″>${proEarns.toFixed(0)}</span>
        </div>
        <div className="flex justify-between mt-1 pt-1 border-t border-gray-100″>
          <span className="text-gray-500″>Your L1 override (7%)</span>
          <span className="font-semibold text-blue-700″>${l1Override.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500″>Your L2 override (4%)</span>
          <span className="font-semibold text-blue-600″>${l2Override.toFixed(2)}</span>
        </div>
      </div>
      {tier && (
        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400″>
          Rates shown for <TierBadge tier={tier} /> tier (founding network)
        </div>
      )}
    </div>
  );
}

export default function ReferralTree() {
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState("");

  const statusQuery = trpc.waitlist.getWaitlistStatus.useQuery(
    { email: submitted.includes("@") ? submitted : undefined, referralCode: !submitted.includes("@") ? submitted.toUpperCase() : undefined },
    { enabled: submitted.length > 0 }
  );

  function handleSearch() {
    const val = search.trim();
    if (!val) return;
    setSubmitted(val);
  }

  const data = statusQuery.data;

  return (
    <AdminLayout>
      <div className="p-6″ style={{ background: "#F0F2F5", minHeight: "100%" }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6″>
            <h1 className="text-2xl font-black text-gray-900″>Referral Network Tree</h1>
            <p className="text-sm text-gray-500 mt-1″>Search any partner by email or referral code to view their position in the recruiting network.</p>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6″>
            <div className="flex gap-3″>
              <div className="relative flex-1″>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400″ />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                  placeholder="Enter email or referral code (e.g. ABC1234)..."
                  className="pl-9 text-sm"
                />
              </div>
              <Button onClick={handleSearch} disabled={!search.trim()} className="bg-gray-900 text-white hover:bg-gray-800″>
                Search
              </Button>
            </div>
          </div>

          {statusQuery.isLoading && (
            <div className="text-center text-gray-400 py-12 text-sm">Searching...</div>
          )}

          {statusQuery.isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700″>
              {statusQuery.error?.message ?? "Not found on waitlist"}
            </div>
          )}

          {data && (
            <div className="space-y-4″>
              {/* Profile Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5″>
                <div className="flex items-start gap-4″>
                  <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-lg flex-shrink-0″>
                    {data.firstName?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="flex-1 min-w-0″>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-black text-gray-900″>{data.firstName} {data.lastName}</span>
                      <TierBadge tier={data.tier} />
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5″>{data.trade} · {data.city}, {data.state}</div>
                    <div className="flex items-center flex-wrap gap-4 mt-3 text-sm">
                      <div>
                        <span className="text-gray-400 text-xs block">Waitlist Position</span>
                        <span className="font-bold text-gray-900″>#{data.position}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs block">Referrals Made</span>
                        <span className="font-bold text-gray-900″>{data.referralCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs block">Referral Code</span>
                        <span className="font-mono font-bold text-gray-900 flex items-center">
                          {data.referralCode}
                          <CopyButton text={data.referralCode ?? ""} />
                        </span>
                      </div>
                      {data.referredBy && (
                        <div>
                          <span className="text-gray-400 text-xs block">Referred By</span>
                          <span className="font-mono font-bold text-gray-700 flex items-center">
                            {data.referredBy}
                            <button
                              className="ml-1.5 text-xs text-blue-600 hover:underline"
                              onClick={() => { setSearch(data.referredBy!); setSubmitted(data.referredBy!); }}
                            >
                              view
                            </button>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4″>
                {/* Upline / Referrer chain */}
                <div className="bg-white rounded-xl border border-gray-200 p-5″>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2″>
                    <ChevronUp className="w-4 h-4 text-gray-400″ />
                    Upline (who recruited them)
                  </h3>
                  {data.referredBy ? (
                    <div className="space-y-2″>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100″>
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0″>L1</div>
                        <div className="flex-1 min-w-0″>
                          <div className="text-sm font-semibold text-gray-900 font-mono">{data.referredBy}</div>
                          <div className="text-xs text-gray-400″>Direct recruiter</div>
                        </div>
                        <button
                          onClick={() => { setSearch(data.referredBy!); setSubmitted(data.referredBy!); }}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-2″>Click "View" to navigate up the chain level by level.</p>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 py-4 text-center">
                      <User className="w-8 h-8 mx-auto mb-2 text-gray-200″ />
                      No upline — organic signup
                    </div>
                  )}
                </div>

                {/* Downline / Direct recruits */}
                <div className="bg-white rounded-xl border border-gray-200 p-5″>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2″>
                    <ChevronDown className="w-4 h-4 text-gray-400″ />
                    Downline L1 ({data.referrals?.length ?? 0} direct recruits)
                  </h3>
                  {data.referrals && data.referrals.length > 0 ? (
                    <div className="space-y-1.5 max-h-56 overflow-y-auto">
                      {data.referrals.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100″>
                          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700 flex-shrink-0″>
                            {r.firstName?.[0]?.toUpperCase() ?? "?"}
                          </div>
                          <div className="flex-1 min-w-0″>
                            <div className="text-sm font-semibold text-gray-900 truncate">{r.firstName}</div>
                            <div className="text-xs text-gray-400″>{r.trade} · {new Date(r.joinedAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 py-4 text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 text-gray-200″ />
                      No direct recruits yet
                    </div>
                  )}
                </div>
              </div>

              {/* Commission Preview */}
              <CommissionPreview referralCode={data.referralCode ?? undefined} tier={data.tier} />

              {/* Tier Progress */}
              <div className="bg-white rounded-xl border border-gray-200 p-5″>
                <h3 className="text-sm font-bold text-gray-900 mb-2″>Tier Progress</h3>
                <p className="text-sm text-gray-600″>{data.upgradeMessage}</p>
                <div className="mt-3 grid grid-cols-4 gap-2″>
                  {(["charter", "founding", "level3″, "level4"] as const).map(t => {
                    const caps: Record<string, number> = { charter: 25, founding: 125, level3: 525, level4: 2125 };
                    const isCurrent = data.tier === t;
                    return (
                      <div
                        key={t}
                        className={`rounded-lg p-2 text-center text-xs border ${isCurrent ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-gray-50 text-gray-500"}`}
                      >
                        <div className="font-bold">{TIER_LABELS[t]}</div>
                        <div className="opacity-70 mt-0.5″>Top {caps[t]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {!data && !statusQuery.isLoading && !statusQuery.isError && submitted && (
            <div className="text-center text-gray-400 py-12 text-sm">No results</div>
          )}

          {!submitted && (
            <div className="text-center py-16 text-gray-300″>
              <Users className="w-12 h-12 mx-auto mb-3″ />
              <div className="text-sm">Search for a partner above to view their referral tree</div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
