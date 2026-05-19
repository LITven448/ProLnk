import React from 'react';
/**
 * Bid Board — Project Marketplace
 * Route: /dashboard/bid-board
 * Partners browse and bid on projects. Includes status pipeline view for submitted bids.
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  ClipboardList, MapPin, Clock, ArrowRight,
  CheckCircle, XCircle, Award, Star, Circle,
} from "lucide-react";

const PROPERTY_ICONS: Record<string, string> = {
  residential: "🏠", commercial: "🏢", multifamily: "🏘️",
  school: "🏫", healthcare: "🏥", other: "📋",
};

type BidStatus = "submitted" | "under_review" | "shortlisted" | "awarded" | "declined";

const PIPELINE_STAGES: { key: BidStatus; label: string; icon: React.ReactNode; color: string; bg: string }[] = [
  {
    key: "submitted",
    label: "Submitted",
    icon: <ClipboardList className="w-4 h-4″ />,
    color: "#818cf8″,
    bg: "rgba(99,102,241,0.12)",
  },
  {
    key: "under_review",
    label: "Under Review",
    icon: <Circle className="w-4 h-4″ />,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
  },
  {
    key: "shortlisted",
    label: "Shortlisted",
    icon: <Star className="w-4 h-4″ />,
    color: "#38bdf8″,
    bg: "rgba(14,165,233,0.12)",
  },
  {
    key: "awarded",
    label: "Awarded",
    icon: <Award className="w-4 h-4″ />,
    color: "#4ade80″,
    bg: "rgba(34,197,94,0.12)",
  },
  {
    key: "declined",
    label: "Declined",
    icon: <XCircle className="w-4 h-4″ />,
    color: "#f87171″,
    bg: "rgba(239,68,68,0.12)",
  },
];

function getBidStageIndex(status: string): number {
  const activeStages: BidStatus[] = ["submitted", "under_review", "shortlisted", "awarded"];
  return activeStages.indexOf(status as BidStatus);
}

function BidPipelineBar({ status }: { status: string }) {
  const activeStages: BidStatus[] = ["submitted", "under_review", "shortlisted", "awarded"];
  const currentIdx = getBidStageIndex(status);
  const isDeclined = status === "declined";

  if (isDeclined) {
    return (
      <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <XCircle className="w-4 h-4 flex-shrink-0″ style={{ color: "#f87171" }} />
        <span className="text-xs font-semibold" style={{ color: "#f87171″ }}>Bid Declined</span>
        <span className="text-xs ml-1″ style={{ color: "rgba(255,255,255,0.3)" }}>— This position has been filled</span>
      </div>
    );
  }

  return (
    <div className="mt-3″>
      <div className="flex items-center gap-0″>
        {activeStages.map((stage, idx) => {
          const stageInfo = PIPELINE_STAGES.find((s) => s.key === stage)!;
          const isPast = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const isLast = idx === activeStages.length - 1;

          return (
            <div key={stage} className="flex items-center flex-1 min-w-0″>
              <div className="flex flex-col items-center gap-1 flex-shrink-0″>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: isPast || isCurrent ? stageInfo.bg : "rgba(255,255,255,0.05)",
                    border: `2px solid ${isPast || isCurrent ? stageInfo.color : "rgba(255,255,255,0.12)"}`,
                    color: isPast || isCurrent ? stageInfo.color : "rgba(255,255,255,0.25)",
                  }}
                >
                  {isPast ? (
                    <CheckCircle className="w-3.5 h-3.5″ />
                  ) : (
                    <span className="scale-75″>{stageInfo.icon}</span>
                  )}
                </div>
                <span
                  className="text-xs font-medium text-center leading-tight"
                  style={{
                    color: isCurrent ? stageInfo.color : isPast ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
                    fontSize: "10px",
                    maxWidth: "52px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {stageInfo.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className="h-0.5 flex-1 mx-1 mb-4″
                  style={{
                    backgroundColor: isPast ? "#4ade8060″ : "rgba(255,255,255,0.08)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BidBoardPage() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<"browse" | "my-bids" | "my-projects">("browse");
  const [filter, setFilter] = useState({ trade: "", zip: "" });
  const [bidAmount, setBidAmount] = useState<Record<number, string>>({});
  const [showBidForm, setShowBidForm] = useState<number | null>(null);
  const [pipelineFilter, setPipelineFilter] = useState<BidStatus | "all">("all");

  const openProjects = trpc.bidBoard.listOpenProjects.useQuery({ tradeFilter: filter.trade || undefined, zipFilter: filter.zip || undefined });
  const myBids = trpc.bidBoard.getMyBids.useQuery(undefined, { enabled: tab === "my-bids" });
  const myProjects = trpc.bidBoard.getMyProjects.useQuery(undefined, { enabled: tab === "my-projects" });

  const submitBid = trpc.bidBoard.submitBid.useMutation({
    onSuccess: () => { toast.success("Bid submitted!"); setShowBidForm(null); openProjects.refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const filteredBids = (myBids.data ?? []).filter((bid: any) =>
    pipelineFilter === "all" || bid.status === pipelineFilter
  );

  const statusCounts = (myBids.data ?? []).reduce((acc: Record<string, number>, bid: any) => {
    acc[bid.status] = (acc[bid.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <PartnerLayout>
      <div className="space-y-6″>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Bid Board</h1>
            <p className="text-gray-400 text-sm mt-1″>Projects posted by Scouts and general contractors</p>
          </div>
          <Button onClick={() => navigate("/dashboard/bid-board/new")} className="bg-teal-500 hover:bg-teal-400 text-white gap-2″>
            <ClipboardList className="w-4 h-4″ /> Post a Project
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
            <div className="flex gap-3″>
              <Input placeholder="Filter by trade (e.g. roofing)" value={filter.trade} onChange={e => setFilter(f => ({ ...f, trade: e.target.value }))} className="bg-gray-800 border-gray-700 text-white max-w-xs" />
              <Input placeholder="Filter by ZIP code" value={filter.zip} onChange={e => setFilter(f => ({ ...f, zip: e.target.value }))} className="bg-gray-800 border-gray-700 text-white max-w-xs" />
            </div>

            {openProjects.isLoading ? (
              <div className="text-center py-12 text-gray-500″>Loading projects...</div>
            ) : !openProjects.data?.projects?.length ? (
              <div className="text-center py-16″>
                <ClipboardList className="w-16 h-16 text-gray-600 mx-auto mb-4″ />
                <p className="text-gray-500″>No open projects in your area yet</p>
              </div>
            ) : (
              <div className="space-y-3″>
                {openProjects.data.projects.map((project: any) => (
                  <div key={project.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-all">
                    <div className="flex items-start gap-4″>
                      <div className="text-3xl">{PROPERTY_ICONS[project.propertyType] ?? "📋"}</div>
                      <div className="flex-1 min-w-0″>
                        <div className="flex items-start justify-between gap-4″>
                          <div>
                            <h3 className="font-bold text-white">{project.projectTitle}</h3>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400″>
                              <span className="flex items-center gap-1″><MapPin className="w-3 h-3" />{project.propertyZip || "DFW"}</span>
                              <span className="flex items-center gap-1″><Clock className="w-3 h-3" />Closes {new Date(project.biddingDeadline).toLocaleDateString()}</span>
                              <span>{project.bidCount ?? 0} bids</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0″>
                            <div className="text-xl font-black text-teal-400″>${parseFloat(project.totalEstimatedValue).toLocaleString()}</div>
                            <div className="text-gray-500 text-xs">est. value</div>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-2 line-clamp-2″>{project.projectDescription}</p>
                        {project.tradesNeeded && (
                          <div className="flex flex-wrap gap-1.5 mt-3″>
                            {JSON.parse(project.tradesNeeded || "[]").slice(0, 4).map((t: string) => (
                              <Badge key={t} className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-xs">{t}</Badge>
                            ))}
                          </div>
                        )}

                        {/* Bid form */}
                        {showBidForm === project.id ? (
                          <div className="mt-4 bg-gray-700 rounded-xl p-4 space-y-3″>
                            <div className="flex items-center gap-3″>
                              <Input
                                type="number"
                                placeholder="Your bid amount ($)"
                                value={bidAmount[project.id] ?? ""}
                                onChange={e => setBidAmount(prev => ({ ...prev, [project.id]: e.target.value }))}
                                className="bg-gray-600 border-gray-500 text-white"
                              />
                              <Button
                                className="bg-teal-500 hover:bg-teal-400 text-white font-bold shrink-0″
                                disabled={!bidAmount[project.id] || submitBid.isPending}
                                onClick={() => submitBid.mutate({ projectId: project.id, bidAmount: parseFloat(bidAmount[project.id]) })}
                              >
                                Submit Bid
                              </Button>
                              <Button variant="ghost" className="text-gray-400″ onClick={() => setShowBidForm(null)}>Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 mt-4″>
                            {project.myBidCount > 0 ? (
                              <Badge className="bg-green-500/10 text-green-400 border-green-500/30″>You bid on this</Badge>
                            ) : (
                              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white gap-1″ onClick={() => setShowBidForm(project.id)}>
                                Submit a Bid <ArrowRight className="w-3.5 h-3.5″ />
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
          <div className="space-y-4″>
            {/* Pipeline summary bar */}
            <div className="grid grid-cols-5 gap-2″>
              {PIPELINE_STAGES.map((stage) => {
                const count = statusCounts[stage.key] ?? 0;
                const isActive = pipelineFilter === stage.key;
                return (
                  <button
                    key={stage.key}
                    onClick={() => setPipelineFilter(isActive ? "all" : stage.key)}
                    className="flex flex-col items-center gap-1 px-3 py-3 rounded-xl border transition-all text-center"
                    style={{
                      backgroundColor: isActive ? stage.bg : "rgba(255,255,255,0.03)",
                      borderColor: isActive ? `${stage.color}50` : "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: stage.bg, color: stage.color }}
                    >
                      {stage.icon}
                    </div>
                    <span
                      className="text-lg font-black"
                      style={{ color: count > 0 ? stage.color : "rgba(255,255,255,0.2)" }}
                    >
                      {count}
                    </span>
                    <span
                      className="text-xs font-medium leading-tight"
                      style={{ color: isActive ? stage.color : "rgba(255,255,255,0.4)", fontSize: "10px" }}
                    >
                      {stage.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {pipelineFilter !== "all" && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400″>
                  Showing <span className="text-white font-semibold">{filteredBids.length}</span> bids in{" "}
                  <span style={{ color: PIPELINE_STAGES.find((s) => s.key === pipelineFilter)?.color }}>
                    {PIPELINE_STAGES.find((s) => s.key === pipelineFilter)?.label}
                  </span>
                </span>
                <button
                  onClick={() => setPipelineFilter("all")}
                  className="text-xs text-gray-500 hover:text-white transition-colors underline"
                >
                  Show all
                </button>
              </div>
            )}

            {/* Bid cards with pipeline status */}
            <div className="space-y-3″>
              {(myBids.isLoading ? [] : filteredBids).map((bid: any) => {
                const stageInfo = PIPELINE_STAGES.find((s) => s.key === bid.status) ?? PIPELINE_STAGES[0];
                return (
                  <div
                    key={bid.id}
                    className="rounded-xl p-4 border transition-all"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      borderColor: bid.status === "awarded"
                        ? "rgba(34,197,94,0.25)"
                        : bid.status === "declined"
                        ? "rgba(239,68,68,0.15)"
                        : "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-start gap-4″>
                      <div className="flex-1 min-w-0″>
                        <div className="flex items-start justify-between gap-3″>
                          <div>
                            <div className="font-semibold text-white text-sm">{bid.projectTitle}</div>
                            <div className="text-gray-400 text-xs mt-0.5″>{bid.propertyAddress}</div>
                          </div>
                          <div className="text-right shrink-0″>
                            <div className="text-lg font-bold text-teal-400″>${parseFloat(bid.bidAmount).toLocaleString()}</div>
                            <div
                              className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-1″
                              style={{ backgroundColor: stageInfo.bg, color: stageInfo.color }}
                            >
                              {stageInfo.icon}
                              {stageInfo.label}
                            </div>
                          </div>
                        </div>
                        <BidPipelineBar status={bid.status} />
                      </div>
                    </div>
                  </div>
                );
              })}
              {!myBids.isLoading && filteredBids.length === 0 && (
                <div className="text-center py-12 text-gray-500″>
                  {pipelineFilter === "all"
                    ? "No bids submitted yet"
                    : `No bids in ${PIPELINE_STAGES.find((s) => s.key === pipelineFilter)?.label} stage`}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "my-projects" && (
          <div className="space-y-3″>
            {myProjects.data?.map((project: any) => (
              <div key={project.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex items-center gap-4″>
                <div className="flex-1″>
                  <div className="font-semibold text-white text-sm">{project.projectTitle}</div>
                  <div className="text-gray-400 text-xs mt-0.5″>{project.propertyAddress} · {project.bidCount ?? 0} bids received</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">${parseFloat(project.totalEstimatedValue).toLocaleString()}</div>
                  <Badge className="text-xs mt-1 bg-gray-700 text-gray-400″>{project.status}</Badge>
                </div>
                {project.bidCount > 0 && (
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 text-xs" onClick={() => navigate(`/dashboard/bid-board/${project.id}`)}>
                    View Bids
                  </Button>
                )}
              </div>
            ))}
            {!myProjects.data?.length && <div className="text-center py-12 text-gray-500″>No projects posted yet</div>}
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
