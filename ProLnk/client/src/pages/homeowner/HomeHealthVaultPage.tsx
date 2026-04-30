/**
 * Home Health Vault — Full Property History
 * Route: /my-home/vault
 * Shows complete Zep-backed property intelligence history.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Home, Shield, TrendingUp, FileText, Calendar,
  Wrench, Zap, Droplets, Wind, CheckCircle, AlertTriangle,
} from "lucide-react";

const CONDITION_CONFIG: Record<string, { color: string; label: string; bg: string }> = {
  good:     { color: "text-green-400", label: "Good", bg: "bg-green-500/10" },
  fair:     { color: "text-yellow-400", label: "Fair", bg: "bg-yellow-500/10" },
  poor:     { color: "text-orange-400", label: "Poor", bg: "bg-orange-500/10" },
  critical: { color: "text-red-400", label: "Critical", bg: "bg-red-500/10" },
  unknown:  { color: "text-gray-400", label: "Unknown", bg: "bg-gray-700" },
};

const URGENCY_CONFIG: Record<string, { icon: React.ReactNode; label: string }> = {
  safety_hazard:  { icon: <AlertTriangle className="w-4 h-4 text-red-400" />, label: "Safety Hazard" },
  code_violation: { icon: <AlertTriangle className="w-4 h-4 text-orange-400" />, label: "Code Violation" },
  immediate:      { icon: <Zap className="w-4 h-4 text-orange-400" />, label: "Immediate" },
  routine:        { icon: <Wrench className="w-4 h-4 text-yellow-400" />, label: "Routine" },
  deferred:       { icon: <Calendar className="w-4 h-4 text-blue-400" />, label: "Deferred" },
  cosmetic:       { icon: <CheckCircle className="w-4 h-4 text-gray-400" />, label: "Cosmetic" },
};

export default function HomeHealthVaultPage() {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"systems" | "history" | "reports">("systems");

  const properties = trpc.homeowner.getMyProperties.useQuery();
  const scanHistory = trpc.homeowner.getScanHistory.useQuery();

  const property = properties.data?.[0];

  return (
    <HomeownerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-600" />
              Home Health Vault
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {property?.address || "Your home's permanent condition record"}
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 border-indigo-200 text-indigo-600">
            <FileText className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Home Health Score */}
        {property && (
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-5xl font-black mb-1">
                  {property.homeHealthScore ?? "--"}
                </div>
                <div className="text-indigo-200 text-sm">Home Health Score</div>
                <div className="mt-4 text-indigo-200 text-xs">
                  {property.totalJobsLogged ?? 0} service visits documented ·{" "}
                  {property.totalOpportunitiesDetected ?? 0} opportunities detected
                </div>
              </div>
              <div className="text-right">
                <div className="text-indigo-200 text-xs mb-1">Est. value protected</div>
                <div className="text-2xl font-black">
                  ${parseFloat(property.totalRevenueGenerated || "0").toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/20 rounded-full">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${property.homeHealthScore ?? 0}%` }}
              />
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
          {(["systems", "history", "reports"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "systems" ? "Home Systems" : tab === "history" ? "Service History" : "AI Reports"}
            </button>
          ))}
        </div>

        {/* Systems view */}
        {activeTab === "systems" && (
          <div className="space-y-3">
            {[
              { system: "Roof & Gutters", icon: <Home className="w-5 h-5" />, condition: property?.roofCondition },
              { system: "HVAC", icon: <Wind className="w-5 h-5" />, condition: property?.hvacCondition },
              { system: "Electrical", icon: <Zap className="w-5 h-5" />, condition: property?.electricalCondition },
              { system: "Plumbing", icon: <Droplets className="w-5 h-5" />, condition: property?.plumbingCondition },
            ].map((item, i) => {
              const condConf = CONDITION_CONFIG[item.condition ?? "unknown"];
              return (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.system}</div>
                    <div className="text-gray-400 text-xs">Last documented: check scan history</div>
                  </div>
                  <Badge className={`${condConf.bg} ${condConf.color} border-0 text-xs font-semibold`}>
                    {condConf.label}
                  </Badge>
                </div>
              );
            })}
            <Button variant="outline" className="w-full border-dashed border-indigo-200 text-indigo-600 hover:bg-indigo-50">
              + Upload photos to update home systems
            </Button>
          </div>
        )}

        {/* Service history */}
        {activeTab === "history" && (
          <div className="space-y-3">
            {scanHistory.isLoading ? (
              <div className="text-center py-8 text-gray-400">Loading history...</div>
            ) : !scanHistory.data?.length ? (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-semibold">No service history yet</p>
                <p className="text-gray-400 text-sm mt-1">Upload photos from any service visit to build your Home Health Vault</p>
              </div>
            ) : (
              scanHistory.data.map((scan: any, i: number) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-900 text-sm">{scan.roomLabel || "Home Scan"}</div>
                    <div className="text-gray-400 text-xs">{new Date(scan.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{scan.issueCount ?? 0} issues found</span>
                    <span>·</span>
                    <span>{scan.upgradeCount ?? 0} upgrade opportunities</span>
                    {scan.overallCondition && (
                      <>
                        <span>·</span>
                        <Badge className={`${CONDITION_CONFIG[scan.overallCondition]?.bg ?? ""} ${CONDITION_CONFIG[scan.overallCondition]?.color ?? ""} border-0 text-xs`}>
                          {scan.overallCondition}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* AI Reports */}
        {activeTab === "reports" && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-semibold">No Scout assessments yet</p>
            <p className="text-gray-400 text-sm mt-1 mb-6">Schedule a ProLnk Scout assessment to get your full Home Intelligence Report</p>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Request a Home Assessment
            </Button>
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}
