import { useState } from "react";
import { Link } from "wouter";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import {
  Users, MapPin, Briefcase, CalendarDays, DollarSign,
  MessageSquare, Search, ChevronRight, UserPlus,
} from "lucide-react";
import { Input } from "@/components/ui/input";

type Recruit = {
  id: number;
  businessName: string;
  businessType: string;
  serviceArea: string;
  joinDate: string;
  commissionEarnedForYou: number;
};

function RecruitCard({ recruit }: { recruit: Recruit }) {
  const initials = recruit.businessName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0A1628 0%, #1B4FD8 100%)" }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 truncate">{recruit.businessName}</p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
            <Briefcase className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{recruit.businessType}</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="w-3 h-3 flex-shrink-0 text-gray-400" />
          <span className="truncate">{recruit.serviceArea || "—"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <CalendarDays className="w-3 h-3 flex-shrink-0 text-gray-400" />
          <span>Joined {recruit.joinDate}</span>
        </div>
      </div>

      {/* Commission earned */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-xs text-gray-500">Commission earned for you</span>
        </div>
        <span className="text-sm font-bold text-emerald-600">
          ${recruit.commissionEarnedForYou.toFixed(0)}
        </span>
      </div>

      {/* Actions */}
      <button
        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
        onClick={() => {}}
        title="Messaging coming soon"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Send Message
      </button>
    </div>
  );
}

export default function NetworkPartnerDirectory() {
  const [search, setSearch] = useState("");

  const { data: rawRecruits, isLoading } = trpc.partners.getOutboundReferrals.useQuery(
    undefined,
    { retry: false }
  );

  const recruits: Recruit[] = (rawRecruits ?? [])
    .reduce((acc: Recruit[], r: any) => {
      if (!r.receivingPartnerName) return acc;
      const existing = acc.find((x) => x.businessName === r.receivingPartnerName);
      const commAmount = Number(r.commissionAmount ?? 0);
      if (existing) {
        existing.commissionEarnedForYou += commAmount;
      } else {
        acc.push({
          id: r.id,
          businessName: r.receivingPartnerName,
          businessType: r.opportunityType?.replace(/_/g, " ") ?? "Home Services",
          serviceArea: r.serviceArea ?? "",
          joinDate: r.createdAt
            ? new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
            : "—",
          commissionEarnedForYou: commAmount,
        });
      }
      return acc;
    }, [])
    .filter((r: Recruit) =>
      !search ||
      r.businessName.toLowerCase().includes(search.toLowerCase()) ||
      r.businessType.toLowerCase().includes(search.toLowerCase()) ||
      r.serviceArea.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: Recruit, b: Recruit) => b.commissionEarnedForYou - a.commissionEarnedForYou);

  const totalCommission = recruits.reduce((s, r) => s + r.commissionEarnedForYou, 0);

  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Network Directory</h1>
              <p className="text-sm text-gray-500">Your Level 1 recruits — pros you brought into ProLnk</p>
            </div>
          </div>
          <Link href="/dashboard/recruit">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-colors"
              style={{ backgroundColor: "#0A1628" }}>
              <UserPlus className="w-3.5 h-3.5" />
              Recruit More
            </button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-indigo-500" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">Direct Recruits</p>
              <p className="text-xl font-bold text-gray-900">{recruits.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">Total Earned From Network</p>
              <p className="text-xl font-bold text-emerald-600">${totalCommission.toFixed(0)}</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name, trade, or area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white border-gray-200 h-10"
          />
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse h-44" />
            ))}
          </div>
        ) : recruits.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 py-20 text-center">
            <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium text-sm">
              {search ? `No recruits matching "${search}"` : "No direct recruits yet"}
            </p>
            <p className="text-gray-400 text-xs mt-1 mb-6">
              Invite pros to join ProLnk and earn subscription overrides on every active recruit.
            </p>
            <Link href="/dashboard/recruit">
              <button className="px-5 py-2 text-sm font-semibold text-white rounded-lg" style={{ backgroundColor: "#0A1628" }}>
                Start Recruiting <ChevronRight className="inline w-3.5 h-3.5 ml-1" />
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recruits.map((r) => (
              <RecruitCard key={r.id} recruit={r} />
            ))}
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
