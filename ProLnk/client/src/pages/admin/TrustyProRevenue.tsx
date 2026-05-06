import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, Camera } from "lucide-react";

const REVENUE_STREAMS = [
  { name: "Homeowner Subscriptions", desc: "Monthly fee for unlimited photo scans and home health tracking", status: "Planned", color: "#82D616", icon: Users },
  { name: "Pro Commission Share", desc: "Platform retains a portion of the commission collected from ProLnk partners on TrustyPro-originated jobs", status: "Planned", color: "#3b82f6", icon: DollarSign },
  { name: "Photo Analysis Credits", desc: "Pay-per-scan model for homeowners who don't want a subscription", status: "Planned", color: "#f59e0b", icon: Camera },
  { name: "Home Health Reports", desc: "One-time purchase of a full property condition report for buyers, sellers, and lenders", status: "Planned", color: "#8b5cf6", icon: TrendingUp },
];

export default function TrustyProRevenue() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#344767] flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#82D616]" />
            TrustyPro — Revenue
          </h1>
          <p className="text-sm text-[#7B809A] mt-1">
            Revenue streams, financial metrics, and payout tracking for TrustyPro.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "MRR", value: "$0", note: "Pre-launch" },
            { label: "Total Homeowners", value: "0", note: "Waitlist building" },
            { label: "Scans Completed", value: "0", note: "Beta not started" },
            { label: "Jobs Generated", value: "0", note: "Pipeline pending" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="text-xs text-[#7B809A] mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-[#344767]">{stat.value}</div>
                <div className="text-[10px] text-[#AEAEAE] mt-0.5">{stat.note}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REVENUE_STREAMS.map((stream) => {
            const Icon = stream.icon;
            return (
              <Card key={stream.name} className="border border-[#E9ECEF]">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: stream.color + "20" }}>
                      <Icon className="w-4 h-4" style={{ color: stream.color }} />
                    </div>
                    <CardTitle className="text-sm font-semibold text-[#344767]">{stream.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-[#7B809A] leading-relaxed">{stream.desc}</p>
                  <div className="mt-2 text-[10px] font-medium text-zinc-400">{stream.status}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
