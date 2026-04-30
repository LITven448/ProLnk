import PartnerLayout from "@/components/PartnerLayout";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Shield, TrendingUp, Bell, Map, BarChart2, Bot, DollarSign, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";

const CHANGELOG = [
  {
    version: "v3.0",
    date: "March 2026",
    label: "Major Release",
    labelColor: "#1B4FD8",
    items: [
      { icon: Bot, color: "#8B5CF6", title: "AI Assistant", desc: "Ask your AI partner coach anything -- lead strategy, commission tips, tier advice." },
      { icon: BarChart2, color: "#3B82F6", title: "Advanced Analytics Dashboard", desc: "4 interactive charts: jobs per month, earnings trend, lead funnel, and outbound referrals." },
      { icon: Bell, color: "#F59E0B", title: "Performance Alerts", desc: "Smart alerts for pending leads, tier progress milestones, and payout thresholds." },
      { icon: Sparkles, color: "#10B981", title: "Referral Hub Upgrade", desc: "QR code generation, LinkedIn/Twitter/Facebook share buttons, and real click tracking." },
    ],
  },
  {
    version: "v2.5",
    date: "February 2026",
    label: "Feature Update",
    labelColor: "#10B981",
    items: [
      { icon: DollarSign, color: "#10B981", title: "Earnings Tracker", desc: "View your commission history with a 6-month area chart and CSV export." },
      { icon: Users, color: "#6B7280", title: "Profile Editor", desc: "Update your business name, service area, bio, website, and contact info." },
      { icon: Map, color: "#EF4444", title: "Service Area Map", desc: "Your public profile now shows a Google Maps embed of your service area." },
      { icon: TrendingUp, color: "#F59E0B", title: "Tier Upgrade CTA", desc: "See exactly what you unlock at the next tier and how many referrals you need." },
    ],
  },
  {
    version: "v2.0",
    date: "January 2026",
    label: "Feature Update",
    labelColor: "#10B981",
    items: [
      { icon: Zap, color: "#F59E0B", title: "ProLnk Mobile App Mobile App", desc: "Log jobs from the field, upload photos, and trigger AI analysis on the go." },
      { icon: Shield, color: "#1B4FD8", title: "TrustyPro Integration", desc: "Homeowner-originated leads now flow directly to your inbound leads queue." },
      { icon: Bell, color: "#EF4444", title: "Network Feed", desc: "See real-time activity across the ProLnk network -- new partners, closed jobs, and more." },
    ],
  },
  {
    version: "v1.0",
    date: "December 2025",
    label: "Launch",
    labelColor: "#6B7280",
    items: [
      { icon: Sparkles, color: "#1B4FD8", title: "ProLnk Partner Portal", desc: "Dashboard, inbound leads, referral tracking, commission ledger, and tier system." },
    ],
  },
];

export default function WhatsNew() {
  const { data: liveAnnouncements } = trpc.partnerTools.content.list.useQuery({ contentType: "announcement" });

  return (
    <PartnerLayout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#EEF2FF" }}>
            <Sparkles className="w-5 h-5" style={{ color: "#1B4FD8" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">What's New</h1>
            <p className="text-sm text-gray-500">Feature updates and improvements to your ProLnk experience</p>
          </div>
        </div>

        {/* Live announcements from admin */}
        {liveAnnouncements && liveAnnouncements.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2"><Bell className="w-4 h-4 text-indigo-600" /> Latest Announcements</h2>
            {liveAnnouncements.map((item) => (
              <div key={item.id} className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <p className="text-sm font-semibold text-indigo-900">{item.title}</p>
                {item.body && <p className="text-xs text-indigo-700 mt-1">{item.body}</p>}
                {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 underline mt-1 block">Learn more</a>}
                <p className="text-xs text-indigo-400 mt-2">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ""}</p>
              </div>
            ))}
          </div>
        )}

        {/* Changelog timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />

          <div className="space-y-10">
            {CHANGELOG.map((release) => (
              <div key={release.version} className="relative pl-14">
                {/* Version dot */}
                <div
                  className="absolute left-3 top-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                  style={{ backgroundColor: release.labelColor }}
                />

                {/* Release header */}
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-bold text-gray-900">{release.version}</h2>
                  <Badge
                    className="text-xs font-semibold border-0"
                    style={{ backgroundColor: `${release.labelColor}15`, color: release.labelColor }}
                  >
                    {release.label}
                  </Badge>
                  <span className="text-xs text-gray-400 ml-auto">{release.date}</span>
                </div>

                {/* Feature items */}
                <div className="space-y-3">
                  {release.items.map((item) => (
                    <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">More features shipping every week. Have a suggestion? Message us through the AI Assistant.</p>
        </div>

      </div>
    </PartnerLayout>
  );
}
