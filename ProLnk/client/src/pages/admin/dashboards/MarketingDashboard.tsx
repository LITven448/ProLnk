import AdminLayout from "@/components/AdminLayout";
import {
  D, MetricCard, SectionHeader, DataTable, BarChart, DonutChart,
  DCard, ActivityItem, ProgressBar,
} from "@/components/DashboardShared";
import {
  Megaphone, TrendingUp, Users, Globe, Mail, Star,
  BarChart3, Target, Share2, Eye, AlertTriangle,
} from "lucide-react";

export default function MarketingDashboard() {
  return (
    <AdminLayout title="Marketing Dashboard" subtitle="Campaigns, waitlist growth, media, and brand performance">
      <div className="p-6 space-y-6 overflow-y-auto" style={{ backgroundColor: D.bg, minHeight: "100%" }}>
        {/* Pre-Launch Banner */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#00D4FF15", border: "1px solid #00D4FF33" }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: "#00D4FF" }} />
          <div>
            <span className="text-xs font-bold" style={{ color: "#00D4FF" }}>Pre-Launch Mode</span>
            <span className="text-xs ml-2" style={{ color: "#7B809A" }}>Data shown represents projections and targets. Live metrics will populate after launch.</span>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Waitlist Signups (MTD)" value="284" sub="Partners + homeowners" trend={31.2} color={D.pink} sparkline={[42,58,67,81,94,108,121,134,147,162,178,284]} icon={<Users className="w-4 h-4" />} />
          <MetricCard label="Email Open Rate" value="38.4%" sub="Last campaign avg" trend={4.2} color={D.cyan} icon={<Mail className="w-4 h-4" />} />
          <MetricCard label="Referral Signups" value="67" sub="Via partner referral codes" trend={22.1} color={D.green} icon={<Share2 className="w-4 h-4" />} />
          <MetricCard label="Ad Impressions" value="84.2K" sub="ProLnk Media network" trend={17.8} color={D.amber} sparkline={[28,34,41,48,55,62,68,74,78,82,84,84]} icon={<Eye className="w-4 h-4" />} />
        </div>

        {/* ── Waitlist Growth + Channel Mix ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DCard className="lg:col-span-2">
            <SectionHeader title="Waitlist Growth" subtitle="Cumulative signups over time" />
            <BarChart
              data={["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => ({
                label: m, value: [42,58,67,81,94,108,121,134,147,162,178,284][i],
              }))}
              color={D.pink}
              height={150}
            />
          </DCard>
          <DCard>
            <SectionHeader title="Signup Channel Mix" subtitle="How they found us" />
            <DonutChart
              size={110}
              segments={[
                { label: "Organic Search",  value: 98,  color: D.cyan },
                { label: "Partner Referral",value: 67,  color: D.green },
                { label: "Social Media",    value: 54,  color: D.pink },
                { label: "Direct",          value: 41,  color: D.amber },
                { label: "Email",           value: 24,  color: D.purple },
              ]}
            />
          </DCard>
        </div>

        {/* ── Email Campaigns + Advertiser Performance ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DCard>
            <SectionHeader title="Email Campaigns" subtitle="Last 5 campaigns performance" />
            <DataTable
              accentCol="name"
              columns={[
                { key: "name",    label: "Campaign" },
                { key: "sent",    label: "Sent",    align: "right" },
                { key: "opens",   label: "Opens",   align: "right" },
                { key: "clicks",  label: "Clicks",  align: "right" },
                { key: "conv",    label: "Conv",    align: "right" },
              ]}
              rows={[
                { name: "Partner Tier Upgrade",   sent: "112",  opens: "43%", clicks: "18%", conv: "12%" },
                { name: "Homeowner Welcome",      sent: "1,847",opens: "52%", clicks: "24%", conv: "8%" },
                { name: "Storm Alert — DFW",      sent: "89",   opens: "71%", clicks: "38%", conv: "22%" },
                { name: "Weekly Partner Digest",  sent: "112",  opens: "34%", clicks: "14%", conv: "6%" },
                { name: "TrustyPro Launch Teaser",sent: "2,100",opens: "41%", clicks: "19%", conv: "11%" },
              ]}
            />
          </DCard>

          <DCard>
            <SectionHeader title="Top Advertisers" subtitle="ProLnk Media network performance" />
            <DataTable
              accentCol="advertiser"
              columns={[
                { key: "advertiser", label: "Advertiser" },
                { key: "type",       label: "Type" },
                { key: "impressions",label: "Impr.",   align: "right" },
                { key: "ctr",        label: "CTR",     align: "right" },
                { key: "spend",      label: "Spend",   align: "right" },
              ]}
              rows={[
                { advertiser: "Apex Insurance DFW",  type: "Home Ins.",  impressions: "24.1K", ctr: "3.2%", spend: "$1,200" },
                { advertiser: "DFW Mortgage Co.",    type: "Mortgage",   impressions: "18.7K", ctr: "2.8%", spend: "$940" },
                { advertiser: "Frisco Title Group",  type: "Title",      impressions: "14.2K", ctr: "2.1%", spend: "$710" },
                { advertiser: "Texas Home Warranty", type: "Warranty",   impressions: "12.8K", ctr: "1.9%", spend: "$640" },
                { advertiser: "Allen Real Estate",   type: "Real Est.",  impressions: "14.4K", ctr: "2.4%", spend: "$720" },
              ]}
            />
          </DCard>
        </div>

        {/* ── Brand Goals + Social ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DCard>
            <SectionHeader title="Marketing Goals" subtitle="Progress to quarterly targets" />
            <div className="space-y-4">
              {[
                { label: "Partner Waitlist: 500",         value: 284, max: 500, color: D.cyan },
                { label: "Homeowner Waitlist: 5,000",     value: 1847, max: 5000, color: D.pink },
                { label: "Email List: 3,000",             value: 1959, max: 3000, color: D.green },
                { label: "Ad Revenue: $5,000/mo",         value: 3210, max: 5000, color: D.amber },
                { label: "Referral Signups: 200",         value: 67, max: 200, color: D.purple },
              ].map(g => (
                <ProgressBar key={g.label} label={g.label} value={g.value} max={g.max} color={g.color} />
              ))}
            </div>
          </DCard>

          <DCard>
            <SectionHeader title="Marketing Activity Feed" subtitle="Recent campaigns and events" />
            <div style={{ maxHeight: 280, overflowY: "auto" }}>
              <ActivityItem time="12:01 PM" type="success" message="4 new homeowner signups from TrustyPro organic search — ZIP 75034" icon={<Users className="w-3.5 h-3.5" />} />
              <ActivityItem time="11:30 AM" type="info"    message="Weekly partner digest sent to 112 active partners — 34% open rate" icon={<Mail className="w-3.5 h-3.5" />} />
              <ActivityItem time="11:00 AM" type="success" message="Storm Alert campaign: 71% open rate, 22 partner responses" icon={<Megaphone className="w-3.5 h-3.5" />} />
              <ActivityItem time="10:15 AM" type="info"    message="Referral code PARTNER-42 credited: 2 homeowner signups" icon={<Share2 className="w-3.5 h-3.5" />} />
              <ActivityItem time="9:30 AM"  type="success" message="ProLnk Media: 84.2K impressions this month — new record" icon={<Eye className="w-3.5 h-3.5" />} />
              <ActivityItem time="9:00 AM"  type="info"    message="TrustyPro launch teaser sent to 2,100 homeowners — 41% open rate" icon={<Star className="w-3.5 h-3.5" />} />
            </div>
          </DCard>
        </div>

      </div>
    </AdminLayout>
  );
}
