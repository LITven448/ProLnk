import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard } from "lucide-react";


export default function AgentDashboard() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-teal-400" />
            Agent Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Track your homes, vault reports, and referral commissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-amber-500/20 text-amber-400">In Development</Badge>
              <p className="text-sm text-slate-400 mt-2">This feature is being built as part of the platform expansion.</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-teal-500/20 text-teal-400">Agent Portal</Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Planned Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              
              <div key="0" className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Homes Listed</p>
                  <p className="text-xs text-slate-400 mt-0.5">Properties you have referred to the platform</p>
                </div>
              </div>
              <div key="1" className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Vault Reports</p>
                  <p className="text-xs text-slate-400 mt-0.5">Home Health Vault reports shared with your clients</p>
                </div>
              </div>
              <div key="2" className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Referral Commissions</p>
                  <p className="text-xs text-slate-400 mt-0.5">Track earnings from home service jobs on referred homes</p>
                </div>
              </div>
              <div key="3" className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Client Activity</p>
                  <p className="text-xs text-slate-400 mt-0.5">See which clients are actively using the platform</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
