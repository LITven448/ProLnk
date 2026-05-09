import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Search, Users, TrendingUp, ArrowDown } from "lucide-react";

export default function ReferralTree() {
  const [searchEmail, setSearchEmail] = useState("");
  const [email, setEmail] = useState("");

  const { data: status, isLoading } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email },
    { enabled: !!email }
  );
  const { data: chain } = trpc.commissionCascade.getChain.useQuery(
    { partnerId: 1 },
    { enabled: false }
  );

  function search(e: React.FormEvent) {
    e.preventDefault();
    setEmail(searchEmail);
  }

  return (
    <AdminLayout title="Referral Tree" subtitle="Trace recruiting chains and commission relationships">
      <div className="p-6 space-y-6">

        {/* Search */}
        <form onSubmit={search} className="flex gap-3">
          <input
            type="email" value={searchEmail} onChange={e => setSearchEmail(e.target.value)}
            placeholder="Search partner by email..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
          <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold">
            <Search className="w-4 h-4" /> Search
          </button>
        </form>

        {isLoading && <div className="text-gray-500 text-sm">Loading...</div>}

        {status && (
          <div className="space-y-4">
            {/* Profile card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{status.firstName} {status.lastName}</h3>
                  <p className="text-gray-500 text-sm">{status.trade} · {status.city}, {status.state}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#F5F0E8", color: "#0A1628" }}>
                    {status.tierLabel}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Position #{status.position}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-50">
                <div>
                  <p className="text-xs text-gray-400">Referral Code</p>
                  <p className="font-mono text-sm font-semibold">{status.referralCode}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Referrals Made</p>
                  <p className="text-sm font-semibold text-green-600">{status.referralCount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Referred By</p>
                  <p className="text-sm font-semibold">{status.referredBy || "Organic"}</p>
                </div>
              </div>
            </div>

            {/* Commission preview */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Commission on $5,000 HVAC job completed by direct recruit
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Home Origination (if they documented this address)", value: (600 * 0.015).toFixed(2), color: "#10B981" },
                  { label: "L1 Network Job Commission (direct recruit)", value: (600 * 0.07).toFixed(2), color: "#3B82F6" },
                  { label: "Monthly Subscription Override (per active L1)", value: (149 * 0.12).toFixed(2), color: "#F59E0B" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>${item.value}/mo</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">Based on 12% platform fee on $5,000 job = $600 pool · Rates for Founding Network tier</p>
            </div>

            {/* Referrals list */}
            {status.referrals && status.referrals.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  Direct Referrals ({status.referrals.length})
                </h3>
                <div className="space-y-2">
                  {status.referrals.map((ref: any, i: number) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{ref.firstName}</span>
                        <span className="text-xs text-gray-500 ml-2">{ref.trade}</span>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(ref.joinedAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {email && !status && !isLoading && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 text-sm">
            No partner found with email: {email}
          </div>
        )}

        {!email && (
          <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
            <Users className="w-8 h-8 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Search for a partner to see their referral tree and commission relationships</p>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
