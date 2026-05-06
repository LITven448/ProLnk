import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Network, Megaphone, Camera, TrendingUp, Building2, Star } from "lucide-react";

const ORG_NODES = [
  { role: "Owner / Founder", name: "Andrew", level: 0, color: "#FBB140", icon: Megaphone },
  { role: "Media Director", name: "TBD", level: 1, color: "#f97316", icon: TrendingUp },
  { role: "Content Lead", name: "TBD", level: 1, color: "#ec4899", icon: Camera },
  { role: "Advertiser Relations", name: "TBD", level: 1, color: "#3b82f6", icon: Building2 },
  { role: "Real Estate Partnerships", name: "TBD", level: 2, color: "#8b5cf6", icon: Building2 },
  { role: "Brand & Creative", name: "TBD", level: 2, color: "#10b981", icon: Star },
];

export default function MediaOrgChart() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#344767] flex items-center gap-2">
            <Network className="w-6 h-6 text-[#FBB140]" />
            ProLnk Media — Org Chart
          </h1>
          <p className="text-sm text-[#7B809A] mt-1">Team structure and role assignments for ProLnk Media operations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ORG_NODES.map((node) => {
            const Icon = node.icon;
            return (
              <Card key={node.role} className="border border-[#E9ECEF]">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: node.color + "20" }}>
                    <Icon className="w-5 h-5" style={{ color: node.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#344767]">{node.role}</div>
                    <div className="text-xs text-[#7B809A]">{node.name}</div>
                    <div className="text-[10px] text-[#AEAEAE] mt-0.5">Level {node.level + 1}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <p className="text-xs text-[#7B809A] text-center pt-4">Full interactive org chart coming soon. Roles marked TBD are open positions.</p>
      </div>
    </AdminLayout>
  );
}
