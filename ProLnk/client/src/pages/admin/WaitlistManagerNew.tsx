/**
 * Admin Waitlist Manager (New)
 * Route: /admin/waitlist-new
 * Full-featured waitlist management replacing the stub.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Users, Mail, Search, Calendar } from "lucide-react";

export default function WaitlistManagerNew() {
  const [activeTab, setActiveTab] = useState<"pro" | "homeowner">("pro");
  const [search, setSearch] = useState("");

  const proWaitlist = trpc.waitlist.getAdminList.useQuery({ type: "pro", limit: 200 }, { enabled: activeTab === "pro" });
  const homeWaitlist = trpc.waitlist.getAdminList.useQuery({ type: "homeowner", limit: 200 }, { enabled: activeTab === "homeowner" });
  const publicCounts = trpc.waitlist.getPublicCounts.useQuery();

  const list = activeTab === "pro" ? proWaitlist.data : homeWaitlist.data;
  const filtered = (list ?? []).filter((p: any) =>
    !search || [p.email, p.firstName, p.lastName, p.businessName].some(v => v?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-400" />
              Waitlist Manager
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage founding partner and homeowner waitlists</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Pro Waitlist", value: publicCounts.data?.pros ?? "-", color: "text-teal-400" },
            { label: "Homeowner Waitlist", value: publicCounts.data?.homes ?? "-", color: "text-indigo-400" },
          ].map((s, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-1 bg-gray-800 p-1 rounded-xl border border-gray-700 w-fit">
          {(["pro", "homeowner"] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === t ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>
              {t === "pro" ? "Service Pros" : "Homeowners"}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-gray-800 border-gray-700 text-white" />
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-white text-sm font-semibold">{filtered.length} on waitlist</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-700 max-h-[500px] overflow-y-auto">
              {filtered.map((person: any, i: number) => (
                <div key={i} className="px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400 text-sm font-bold shrink-0">
                    {((person.firstName || person.businessName || "?")[0]).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-semibold truncate">
                      {person.firstName ? `${person.firstName} ${person.lastName ?? ""}`.trim() : person.businessName}
                    </div>
                    <div className="text-gray-400 text-xs">{person.email}</div>
                  </div>
                  {person.primaryCity && <span className="text-gray-500 text-xs hidden md:block">{person.primaryCity}, {person.primaryState}</span>}
                  <div className="text-gray-600 text-xs flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3" />
                    {new Date(person.createdAt).toLocaleDateString()}
                  </div>
                  <Button size="sm" className="bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white text-xs shrink-0">
                    Activate
                  </Button>
                </div>
              ))}
              {filtered.length === 0 && !proWaitlist.isLoading && !homeWaitlist.isLoading && (
                <div className="p-8 text-center text-gray-500">No results</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
