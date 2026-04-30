/**
 * Bid Board — Project Marketplace
 * Route: /dashboard/bid-board
 * Partners browse and bid on projects posted by Scouts and GCs.
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  ClipboardList, DollarSign, MapPin, Clock, ArrowRight,
  Home, Building2, Filter, Briefcase,
} from "lucide-react";

const PROPERTY_ICONS: Record<string, string> = {
  residential: "🏠", commercial: "🏢", multifamily: "🏘️",
  school: "🏫", healthcare: "🏥", other: "📋",
};

export default function BidBoardPage() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<"browse" | "my-bids" | "my-projects">("browse");
  const [filter, setFilter] = useState({ trade: "", zip: "" });
  const [bidAmount, setBidAmount] = useState<Record<number, string>>({});
  const [showBidForm, setShowBidForm] = useState<number | null>(null);

  const openProjects = trpc.bidBoard.listOpenProjects.useQuery({ tradeFilter: filter.trade || undefined, zipFilter: filter.zip || undefined });
  const myBids = trpc.bidBoard.getMyBids.useQuery(undefined, { enabled: tab === "my-bids" });
  const myProjects = trpc.bidBoard.getMyProjects.useQuery(undefined, { enabled: tab === "my-projects" });

  const submitBid = trpc.bidBoard.submitBid.useMutation({
    onSuccess: () => { toast.success("Bid submitted!"); setShowBidForm(null); openProjects.refetch(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Bid Board</h1>
            <p className="text-gray-400 text-sm mt-1">Projects posted by Scouts and general contractors</p>
          </div>
          <Button onClick={() => navigate("/dashboard/bid-board/new")} className="bg-teal-500 hover:bg-teal-400 text-white gap-2">
            <ClipboardList className="w-4 h-4" /> Post a Project
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-800 p-1 rounded-xl border border-gray-700 w-fit">
          {(["browse", "my-bids", "my-projects"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}
            >
              {t === "browse" ? "Browse Projects" : t === "my-bids" ? "My Bids" : "My Projects"}
            </button>
          ))}
        </div>

        {tab === "browse" && (
          <>
            {/* Filters */}
            <div className="flex gap-3">
              <Input placeholder="Filter by trade (e.g. roofing)" value={filter.trade} onChange={e => setFilter(f => ({ ...f, trade: e.target.value }))} className="bg-gray-800 border-gray-700 text-white max-w-xs" />
              <Input placeholder="Filter by ZIP code" value={filter.zip} onChange={e => setFilter(f => ({ ...f, zip: e.target.value }))} className="bg-gray-800 border-gray-700 text-white max-w-xs" />
            </div>

            {openProjects.isLoading ? (
              <div className="text-center py-12 text-gray-500">Loading projects...</div>
            ) : !openProjects.data?.projects?.length ? (
              <div className="text-center py-16">
                <ClipboardList className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">No open projects in your area yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {openProjects.data.projects.map((project: any) => (
                  <div key={project.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{PROPERTY_ICONS[project.propertyType] ?? "📋"}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-white">{project.projectTitle}</h3>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{project.propertyZip || "DFW"}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Closes {new Date(project.biddingDeadline).toLocaleDateString()}</span>
                              <span>{project.bidCount ?? 0} bids</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xl font-black text-teal-400">${parseFloat(project.totalEstimatedValue).toLocaleString()}</div>
                            <div className="text-gray-500 text-xs">est. value</div>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{project.projectDescription}</p>
                        {project.tradesNeeded && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {JSON.parse(project.tradesNeeded || "[]").slice(0, 4).map((t: string) => (
                              <Badge key={t} className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-xs">{t}</Badge>
                            ))}
                          </div>
                        )}

                        {/* Bid form */}
                        {showBidForm === project.id ? (
                          <div className="mt-4 bg-gray-700 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-3">
                              <Input
                                type="number"
                                placeholder="Your bid amount ($)"
                                value={bidAmount[project.id] ?? ""}
                                onChange={e => setBidAmount(prev => ({ ...prev, [project.id]: e.target.value }))}
                                className="bg-gray-600 border-gray-500 text-white"
                              />
                              <Button
                                className="bg-teal-500 hover:bg-teal-400 text-white font-bold shrink-0"
                                disabled={!bidAmount[project.id] || submitBid.isPending}
                                onClick={() => submitBid.mutate({ projectId: project.id, bidAmount: parseFloat(bidAmount[project.id]) })}
                              >
                                Submit Bid
                              </Button>
                              <Button variant="ghost" className="text-gray-400" onClick={() => setShowBidForm(null)}>Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 mt-4">
                            {project.myBidCount > 0 ? (
                              <Badge className="bg-green-500/10 text-green-400 border-green-500/30">You bid on this</Badge>
                            ) : (
                              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white gap-1" onClick={() => setShowBidForm(project.id)}>
                                Submit a Bid <ArrowRight className="w-3.5 h-3.5" />
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "my-bids" && (
          <div className="space-y-3">
            {myBids.data?.map((bid: any) => (
              <div key={bid.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{bid.projectTitle}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{bid.propertyAddress}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-teal-400">${parseFloat(bid.bidAmount).toLocaleString()}</div>
                  <Badge className={`text-xs mt-1 ${bid.status === "awarded" ? "bg-green-500/10 text-green-400" : bid.status === "rejected" ? "bg-red-500/10 text-red-400" : "bg-gray-700 text-gray-400"}`}>
                    {bid.status}
                  </Badge>
                </div>
              </div>
            ))}
            {!myBids.data?.length && <div className="text-center py-12 text-gray-500">No bids submitted yet</div>}
          </div>
        )}

        {tab === "my-projects" && (
          <div className="space-y-3">
            {myProjects.data?.map((project: any) => (
              <div key={project.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{project.projectTitle}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{project.propertyAddress} · {project.bidCount ?? 0} bids received</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">${parseFloat(project.totalEstimatedValue).toLocaleString()}</div>
                  <Badge className="text-xs mt-1 bg-gray-700 text-gray-400">{project.status}</Badge>
                </div>
                {project.bidCount > 0 && (
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 text-xs" onClick={() => navigate(`/dashboard/bid-board/${project.id}`)}>
                    View Bids
                  </Button>
                )}
              </div>
            ))}
            {!myProjects.data?.length && <div className="text-center py-12 text-gray-500">No projects posted yet</div>}
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
