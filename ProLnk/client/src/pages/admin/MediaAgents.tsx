import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Clock, Zap, Camera, TrendingUp, Megaphone, Star, Building2 } from "lucide-react";

const MEDIA_AGENTS = [
  {
    id: "content-gen",
    name: "Content Generation Agent",
    description: "Auto-generates before/after social posts, job highlight reels, and partner spotlights from completed job data and photos.",
    status: "planned",
    triggers: ["Job marked complete", "Partner hits milestone", "Weekly schedule"],
    outputs: ["Social post draft", "Image carousel", "Email newsletter block"],
    icon: Camera,
    color: "#FBB140",
  },
  {
    id: "advertiser-match",
    name: "Advertiser Matching Agent",
    description: "Matches local advertisers (real estate agents, home warranty companies, lenders) to active ProLnk service areas based on zip code overlap and audience fit.",
    status: "planned",
    triggers: ["New advertiser signup", "New service area activated", "Monthly refresh"],
    outputs: ["Advertiser match list", "Outreach email draft", "Ad placement recommendation"],
    icon: Megaphone,
    color: "#f97316",
  },
  {
    id: "review-amplifier",
    name: "Review Amplifier Agent",
    description: "Monitors completed jobs and automatically sends review request sequences to homeowners, then surfaces 5-star reviews as social proof content.",
    status: "planned",
    triggers: ["Job completed + homeowner confirmed", "7-day post-job timer"],
    outputs: ["Review request SMS/email", "Review badge for partner profile", "Social proof snippet"],
    icon: Star,
    color: "#ec4899",
  },
  {
    id: "real-estate-intel",
    name: "Real Estate Intel Agent",
    description: "Tracks listing activity in ProLnk service areas and surfaces pre-listing repair opportunities to both real estate agents and ProLnk partners.",
    status: "planned",
    triggers: ["New listing detected in service area", "Price reduction event"],
    outputs: ["Pre-listing repair alert", "Agent outreach email", "Partner opportunity notification"],
    icon: Building2,
    color: "#3b82f6",
  },
  {
    id: "campaign-optimizer",
    name: "Campaign Optimizer Agent",
    description: "Analyzes ad campaign performance across channels and auto-adjusts targeting, creative rotation, and spend allocation to maximize advertiser ROI.",
    status: "planned",
    triggers: ["Weekly performance review", "CTR drops below threshold", "Budget milestone"],
    outputs: ["Campaign adjustment recommendation", "Performance report", "Creative rotation schedule"],
    icon: TrendingUp,
    color: "#8b5cf6",
  },
];

export default function MediaAgents() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#344767] flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#FBB140]" />
            ProLnk Media — AI Agents
          </h1>
          <p className="text-sm text-[#7B809A] mt-1">
            Automated agents powering content generation, advertiser matching, and campaign optimization for ProLnk Media.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-500 shrink-0" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">0</div>
                <div className="text-xs text-[#7B809A]">Active</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="w-8 h-8 text-zinc-400 shrink-0" />
              <div>
                <div className="text-2xl font-bold text-zinc-500">{MEDIA_AGENTS.length}</div>
                <div className="text-xs text-[#7B809A]">Planned</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Bot className="w-8 h-8 text-[#FBB140] shrink-0" />
              <div>
                <div className="text-2xl font-bold text-[#FBB140]">{MEDIA_AGENTS.length}</div>
                <div className="text-xs text-[#7B809A]">Total Agents</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {MEDIA_AGENTS.map((agent) => {
            const AgentIcon = agent.icon;
            return (
              <Card key={agent.id} className="border border-[#E9ECEF] hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: agent.color + "20" }}
                    >
                      <AgentIcon className="w-5 h-5" style={{ color: agent.color }} />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold text-[#344767]">{agent.name}</CardTitle>
                      <div className="flex items-center gap-1 text-xs mt-0.5 text-zinc-400">
                        <Clock className="w-3 h-3" />
                        Planned
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-[#7B809A] leading-relaxed">{agent.description}</p>
                  <div>
                    <div className="text-xs font-medium text-[#344767] mb-1.5">Triggers</div>
                    <div className="flex flex-wrap gap-1">
                      {agent.triggers.map((t) => (
                        <Badge key={t} variant="outline" className="text-[10px] border-[#E9ECEF] text-[#7B809A]">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#344767] mb-1.5">Outputs</div>
                    <div className="flex flex-wrap gap-1">
                      {agent.outputs.map((o) => (
                        <Badge key={o} variant="outline" className="text-[10px]" style={{ borderColor: agent.color + "60", color: agent.color }}>{o}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
