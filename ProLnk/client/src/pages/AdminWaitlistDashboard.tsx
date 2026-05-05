import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Users, Download, Search, Filter, TrendingUp, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WaitlistSignup {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  source: "pro_waitlist" | "trustypro_7step" | "trustypro_simple";
  position: number;
  createdAt: string;
  tier?: string;
  referredBy?: string;
}

export default function AdminWaitlistDashboard() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "position">("newest");

  const { data: proWaitlist, isLoading: proLoading } = trpc.waitlist.getProWaitlist.useQuery();
  const { data: homeWaitlist, isLoading: homeLoading } = trpc.trustyPro.getHomeWaitlist.useQuery();
  const { data: metrics, isLoading: metricsLoading } = trpc.waitlist.getWaitlistMetrics.useQuery();

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">Access denied. Admin access required.</p>
      </div>
    );
  }

  const allSignups: WaitlistSignup[] = [
    ...(proWaitlist?.map((p) => ({
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      source: "pro_waitlist" as const,
      position: p.position || 0,
      createdAt: p.createdAt?.toString() || new Date().toISOString(),
      tier: p.tier,
      referredBy: p.referredBy,
    })) || []),
    ...(homeWaitlist?.map((h) => ({
      id: h.id,
      firstName: h.firstName,
      lastName: h.lastName,
      email: h.email,
      source: "trustypro_7step" as const,
      position: h.position || 0,
      createdAt: h.createdAt?.toString() || new Date().toISOString(),
    })) || []),
  ];

  const filtered = allSignups.filter((signup) => {
    const matchesSearch =
      signup.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signup.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signup.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSource = sourceFilter === "all" || signup.source === sourceFilter;

    return matchesSearch && matchesSource;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return a.position - b.position;
  });

  const exportCSV = () => {
    const headers = ["First Name", "Last Name", "Email", "Source", "Position", "Referred By", "Date"];
    const rows = sorted.map((s) => [
      s.firstName,
      s.lastName,
      s.email,
      s.source,
      s.position,
      s.referredBy || "",
      new Date(s.createdAt).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-export-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Waitlist Dashboard</h1>
          <p className="text-slate-600">Manage and analyze all waitlist signups</p>
        </div>

        {/* Metrics Grid */}
        {!metricsLoading && metrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-600">Total Signups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{metrics.totalSignups}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-600">Pro Waitlist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{metrics.proSignups || 0}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-600">TrustyPro Signups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{metrics.trustyproSignups || 0}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-600">Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{metrics.referrals || 0}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sources</option>
              <option value="pro_waitlist">Pro Waitlist</option>
              <option value="trustypro_7step">TrustyPro (7-Step)</option>
              <option value="trustypro_simple">TrustyPro (Simple)</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="position">Position</option>
            </select>

            <Button onClick={exportCSV} variant="outline" size="sm" className="flex gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>

          <div className="text-sm text-slate-600 mt-2">
            Showing {sorted.length} of {allSignups.length} signups
          </div>
        </div>

        {/* Table View */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Source</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Position</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Referral</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((signup, idx) => (
                    <tr key={`${signup.source}-${signup.id}`} className="border-b hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm">
                        <span className="font-medium">{signup.firstName} {signup.lastName}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{signup.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                          {signup.source === "pro_waitlist" ? "Pro" : "TrustyPro"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">#{signup.position}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(signup.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {signup.referredBy ? (
                          <span className="text-green-600 font-medium">✓ {signup.referredBy.substring(0, 8)}...</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
