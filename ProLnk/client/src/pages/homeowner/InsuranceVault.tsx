import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield, AlertTriangle, CheckCircle, Download, Calendar,
  DollarSign, Clock, FileText,
} from "lucide-react";

interface Claim {
  date: string;
  type: string;
  claimed: number;
  paid: number;
  status: "Settled" | "Pending";
}

interface PolicyDoc {
  name: string;
  type: string;
  uploaded: string;
}

const CLAIMS: Claim[] = [
  { date: "Mar 2024″, type: "Hail Damage — Roof", claimed: 12400, paid: 11200, status: "Settled" },
  { date: "Jan 2025″, type: "Water Damage — Pipe Burst", claimed: 8750, paid: 0, status: "Pending" },
];

const DOCS: PolicyDoc[] = [
  { name: "Homeowners Policy", type: "Policy PDF", uploaded: "Jan 15, 2025″ },
  { name: "Declarations Page", type: "Declarations", uploaded: "Jan 15, 2025″ },
  { name: "Exclusions List", type: "Exclusions", uploaded: "Jan 15, 2025″ },
  { name: "Emergency Contacts", type: "Contact list", uploaded: "Jan 15, 2025″ },
];

const PREMIUM_HOME = 2400;
const PREMIUM_WARRANTY = 840;
const PREMIUM_TOTAL = PREMIUM_HOME + PREMIUM_WARRANTY;

export default function InsuranceVault() {
  const [showReviewBanner, setShowReviewBanner] = useState(true);

  const homeAngle = Math.round((PREMIUM_HOME / PREMIUM_TOTAL) * 360);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="max-w-2xl mx-auto space-y-6 p-4 pb-12″>

          <div className="pt-2″>
            <h1 className="text-2xl font-bold text-white">Insurance Vault</h1>
            <p className="text-slate-400 mt-1 text-sm">All your coverage in one place</p>
          </div>

          {/* Coverage Overview */}
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3″>Coverage Overview</h2>
            <div className="space-y-3″>

              {/* Homeowners */}
              <Card className="bg-slate-800/60 border-slate-700″>
                <CardContent className="pt-4 pb-3″>
                  <div className="flex items-start justify-between mb-2″>
                    <div>
                      <p className="text-xs text-slate-400″>Homeowners Insurance</p>
                      <p className="text-sm font-semibold text-white">State Farm</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-teal-400 font-medium bg-teal-400/10 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3″ /> Active
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-2 pt-2 border-t border-slate-700″>
                    <div>
                      <p className="text-xs text-slate-500″>Policy #</p>
                      <p className="text-xs text-slate-300 font-mono">HO-48291</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500″>Dwelling</p>
                      <p className="text-xs text-slate-300″>$485K</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500″>Expires</p>
                      <p className="text-xs text-slate-300″>Dec 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flood */}
              <Card className="bg-slate-800/60 border-slate-700″>
                <CardContent className="pt-4 pb-3″>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-slate-400″>Flood Insurance</p>
                      <p className="text-sm font-semibold text-slate-400 italic">None — no coverage</p>
                    </div>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-500 text-white text-xs h-7 px-3″>
                      Get a Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Home Warranty */}
              <Card className="bg-slate-800/60 border-slate-700″>
                <CardContent className="pt-4 pb-3″>
                  <div className="flex items-start justify-between mb-2″>
                    <div>
                      <p className="text-xs text-slate-400″>Home Warranty</p>
                      <p className="text-sm font-semibold text-white">First American</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-teal-400 font-medium bg-teal-400/10 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3″ /> Active
                    </span>
                  </div>
                  <div className="flex items-center gap-1 pt-2 border-t border-slate-700″>
                    <Calendar className="w-3 h-3 text-slate-500″ />
                    <p className="text-xs text-slate-400″>Expires Aug 2026</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Coverage Gaps */}
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3″>Coverage Gaps</h2>
            <div className="space-y-2″>
              <Card className="bg-amber-900/20 border-amber-700/50″>
                <CardContent className="pt-3 pb-3″>
                  <div className="flex items-start gap-2.5″>
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5″ />
                    <div>
                      <p className="text-sm font-medium text-amber-300″>No flood coverage</p>
                      <p className="text-xs text-slate-400 mt-0.5″>Your area has an 8% flood risk. NFIP policies start at $700/yr.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-yellow-900/20 border-yellow-700/50″>
                <CardContent className="pt-3 pb-3″>
                  <div className="flex items-start gap-2.5″>
                    <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5″ />
                    <div>
                      <p className="text-sm font-medium text-yellow-300″>HVAC not covered by warranty</p>
                      <p className="text-xs text-slate-400 mt-0.5″>Add HVAC coverage to your First American plan for $89/mo.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Claims History */}
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3″>Claims History</h2>
            <Card className="bg-slate-800/60 border-slate-700″>
              <CardContent className="pt-0 pb-0″>
                <div className="divide-y divide-slate-700″>
                  {CLAIMS.map((claim, i) => (
                    <div key={i} className="py-3 px-1″>
                      <div className="flex items-start justify-between gap-2″>
                        <div className="min-w-0″>
                          <p className="text-xs text-slate-400″>{claim.date}</p>
                          <p className="text-sm text-white font-medium mt-0.5 truncate">{claim.type}</p>
                          <div className="flex items-center gap-3 mt-1″>
                            <span className="text-xs text-slate-400″>
                              Claimed: <span className="text-slate-300″>${claim.claimed.toLocaleString()}</span>
                            </span>
                            {claim.status === "Settled" && (
                              <span className="text-xs text-slate-400″>
                                Paid: <span className="text-teal-400″>${claim.paid.toLocaleString()}</span>
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0″>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            claim.status === "Settled"
                              ? "bg-teal-400/10 text-teal-400″
                              : "bg-yellow-400/10 text-yellow-400″
                          }`}>
                            {claim.status}
                          </span>
                          {claim.status === "Pending" && (
                            <Button size="sm" variant="outline" className="text-xs h-7 px-2.5 border-slate-600 text-slate-300″>
                              Track Status
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents */}
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3″>Documents</h2>
            <div className="grid grid-cols-2 gap-2″>
              {DOCS.map(doc => (
                <Card key={doc.name} className="bg-slate-800/60 border-slate-700″>
                  <CardContent className="pt-3 pb-3″>
                    <div className="flex items-start justify-between gap-2″>
                      <div className="min-w-0″>
                        <FileText className="w-5 h-5 text-teal-400 mb-1.5″ />
                        <p className="text-xs font-medium text-white leading-tight">{doc.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5″>{doc.type}</p>
                        <p className="text-xs text-slate-500 mt-0.5″>{doc.uploaded}</p>
                      </div>
                      <button className="text-slate-400 hover:text-teal-400 transition-colors mt-0.5″>
                        <Download className="w-4 h-4″ />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Premium Tracker */}
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3″>Premium Tracker</h2>
            <Card className="bg-slate-800/60 border-slate-700″>
              <CardContent className="pt-4 pb-4″>
                <div className="flex items-center gap-6″>
                  <div className="relative w-24 h-24 shrink-0″>
                    <svg viewBox="0 0 96 96″ className="w-full h-full">
                      <circle cx="48″ cy="48" r="38" fill="none" stroke="#1e293b" strokeWidth="10" />
                      <circle
                        cx="48″ cy="48" r="38"
                        fill="none" stroke="#14b8a6″ strokeWidth="10"
                        strokeDasharray={`${(homeAngle / 360) * 239} 239`}
                        strokeDashoffset="60″
                        strokeLinecap="butt"
                      />
                      <circle
                        cx="48″ cy="48" r="38"
                        fill="none" stroke="#6366f1″ strokeWidth="10"
                        strokeDasharray={`${((360 - homeAngle) / 360) * 239} 239`}
                        strokeDashoffset={`${239 - (homeAngle / 360) * 239 + 60}`}
                        strokeLinecap="butt"
                      />
                    </svg>
                    <DollarSign className="absolute inset-0 m-auto w-5 h-5 text-slate-400″ />
                  </div>
                  <div className="flex-1″>
                    <p className="text-xs text-slate-400 mb-0.5″>Combined Annual Premium</p>
                    <p className="text-2xl font-bold text-white">${PREMIUM_TOTAL.toLocaleString()}</p>
                    <div className="mt-2 space-y-1″>
                      <div className="flex items-center gap-2″>
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shrink-0″ />
                        <span className="text-xs text-slate-400″>Homeowners</span>
                        <span className="ml-auto text-xs text-slate-300″>${PREMIUM_HOME.toLocaleString()}/yr</span>
                      </div>
                      <div className="flex items-center gap-2″>
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0″ />
                        <span className="text-xs text-slate-400″>Home warranty</span>
                        <span className="ml-auto text-xs text-slate-300″>${PREMIUM_WARRANTY.toLocaleString()}/yr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Review Coverage CTA */}
          {showReviewBanner && (
            <Card className="bg-gradient-to-r from-indigo-900/50 to-slate-800/60 border-indigo-700/50″>
              <CardContent className="pt-4 pb-4″>
                <div className="flex items-start gap-3″>
                  <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center shrink-0″>
                    <Clock className="w-5 h-5 text-indigo-400″ />
                  </div>
                  <div className="flex-1″>
                    <p className="text-sm font-semibold text-white">Your coverage was last reviewed 18 months ago</p>
                    <p className="text-xs text-slate-400 mt-0.5″>Home values and risk profiles change — a quick review ensures you're not under-insured.</p>
                    <Button className="mt-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-8 px-4″>
                      Schedule a Review
                    </Button>
                  </div>
                  <button onClick={() => setShowReviewBanner(false)} className="text-slate-500 hover:text-slate-300 text-lg leading-none mt-0.5″>
                    ×
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </HomeownerLayout>
  );
}
