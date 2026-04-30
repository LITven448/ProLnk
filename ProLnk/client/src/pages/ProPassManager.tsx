/**
 * Pro Pass Manager
 * Route: /dashboard/pro-passes
 * Partners manage their team members' Pro Passes.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User, Plus, Shield, CheckCircle, Clock, QrCode, AlertTriangle } from "lucide-react";

const CLEARANCE_COLORS: Record<string, string> = {
  residential: "bg-blue-500/10 text-blue-400",
  commercial: "bg-indigo-500/10 text-indigo-400",
  school: "bg-purple-500/10 text-purple-400",
  healthcare: "bg-pink-500/10 text-pink-400",
  government: "bg-red-500/10 text-red-400",
};

const BG_STATUS_COLORS: Record<string, string> = {
  not_submitted: "text-gray-500",
  pending: "text-yellow-400",
  clear: "text-green-400",
  consider: "text-orange-400",
  suspended: "text-red-400",
};

export default function ProPassManager() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [newPass, setNewPass] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    role: "", primaryTrade: "", clearanceLevel: "residential" as const,
    employmentType: "employee" as const,
  });

  const { data, isLoading, refetch } = trpc.proPass.getMyPasses.useQuery();
  const createPass = trpc.proPass.createPass.useMutation({
    onSuccess: (r) => {
      toast.success(`Pro Pass created for ${newPass.firstName} ${newPass.lastName}!`);
      setShowNewForm(false);
      setNewPass({ firstName: "", lastName: "", email: "", phone: "", role: "", primaryTrade: "", clearanceLevel: "residential", employmentType: "employee" });
      refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  const passes = data?.passes ?? [];
  const limit = data?.limit ?? 1;
  const used = data?.used ?? 0;

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Pro Passes</h1>
            <p className="text-gray-400 text-sm mt-1">Digital credentials for your team members</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <span className="text-white font-bold">{used}/{limit}</span>
              <span className="text-gray-500 ml-1">passes used</span>
            </div>
            {used < limit && (
              <Button onClick={() => setShowNewForm(true)} className="bg-teal-500 hover:bg-teal-400 text-white gap-2">
                <Plus className="w-4 h-4" /> Add Pass
              </Button>
            )}
          </div>
        </div>

        {/* New pass form */}
        {showNewForm && (
          <div className="bg-gray-800 rounded-2xl p-6 border border-teal-500/30 space-y-4">
            <h3 className="font-bold text-white">New Pro Pass</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="First name *" value={newPass.firstName} onChange={e => setNewPass(p => ({ ...p, firstName: e.target.value }))} className="bg-gray-700 border-gray-600 text-white" />
              <Input placeholder="Last name *" value={newPass.lastName} onChange={e => setNewPass(p => ({ ...p, lastName: e.target.value }))} className="bg-gray-700 border-gray-600 text-white" />
              <Input type="email" placeholder="Email" value={newPass.email} onChange={e => setNewPass(p => ({ ...p, email: e.target.value }))} className="bg-gray-700 border-gray-600 text-white" />
              <Input placeholder="Phone" value={newPass.phone} onChange={e => setNewPass(p => ({ ...p, phone: e.target.value }))} className="bg-gray-700 border-gray-600 text-white" />
              <Input placeholder="Role/Title" value={newPass.role} onChange={e => setNewPass(p => ({ ...p, role: e.target.value }))} className="bg-gray-700 border-gray-600 text-white" />
              <Input placeholder="Primary trade (e.g. hvac, roofing)" value={newPass.primaryTrade} onChange={e => setNewPass(p => ({ ...p, primaryTrade: e.target.value }))} className="bg-gray-700 border-gray-600 text-white" />
              <select value={newPass.clearanceLevel} onChange={e => setNewPass(p => ({ ...p, clearanceLevel: e.target.value as any }))} className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm">
                <option value="residential">Residential Clearance</option>
                <option value="commercial">Commercial Clearance</option>
                <option value="school">School Clearance</option>
                <option value="healthcare">Healthcare Clearance</option>
                <option value="government">Government Clearance</option>
              </select>
              <select value={newPass.employmentType} onChange={e => setNewPass(p => ({ ...p, employmentType: e.target.value as any }))} className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm">
                <option value="employee">Employee</option>
                <option value="contractor">Subcontractor</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-teal-500 hover:bg-teal-400 text-white font-bold" disabled={!newPass.firstName || !newPass.lastName || createPass.isPending} onClick={() => createPass.mutate(newPass)}>
                {createPass.isPending ? "Creating..." : "Create Pro Pass"}
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-400" onClick={() => setShowNewForm(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Pass list */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : passes.length === 0 ? (
          <div className="text-center py-16">
            <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">No Pro Passes yet</h3>
            <p className="text-gray-500 text-sm mb-6">Add your first team member to get started</p>
            <Button onClick={() => setShowNewForm(true)} className="bg-teal-500 hover:bg-teal-400 text-white gap-2">
              <Plus className="w-4 h-4" /> Add First Pass
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {passes.map((pass: any) => (
              <div key={pass.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                    {pass.firstName?.[0]}{pass.lastName?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white">{pass.firstName} {pass.lastName}</div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      {pass.role || "Team member"} · {pass.primaryTrade || "General"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${CLEARANCE_COLORS[pass.clearanceLevel] ?? ""}`}>
                      {pass.clearanceLevel}
                    </Badge>
                    <div className={`flex items-center gap-1 text-xs ${BG_STATUS_COLORS[pass.backgroundCheckStatus] ?? "text-gray-500"}`}>
                      <Shield className="w-3 h-3" />
                      {pass.backgroundCheckStatus === "clear" ? "Clear" :
                       pass.backgroundCheckStatus === "pending" ? "Pending" :
                       pass.backgroundCheckStatus === "not_submitted" ? "No BG check" : pass.backgroundCheckStatus}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{pass.passScore}</div>
                    <div className="text-gray-500 text-xs">score</div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => window.open(`/pass/${pass.passCode}`, "_blank")}>
                    <QrCode className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {used >= limit && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
            <p className="text-yellow-400 font-semibold text-sm">Pro Pass Limit Reached</p>
            <p className="text-gray-400 text-xs mt-1">Your plan includes {limit} Pro Pass{limit === 1 ? "" : "es"}. Upgrade your plan to add more team members.</p>
            <Button size="sm" className="mt-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold" onClick={() => window.location.href = "/dashboard/tier"}>
              Upgrade Plan
            </Button>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
