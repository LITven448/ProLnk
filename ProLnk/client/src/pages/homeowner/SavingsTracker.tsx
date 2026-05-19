import { useState } from "react";
import { Link } from "wouter";
import {
  DollarSign,
  TrendingDown,
  Clock,
  Users,
  Star,
  ArrowRight,
  ChevronRight,
  Wrench,
  Wind,
  Droplets,
  Home,
  Zap,
  Leaf,
  Share2,
  CheckCircle,
  BarChart2,
} from "lucide-react";

interface Job {
  id: string;
  service: string;
  icon: typeof Wrench;
  iconColor: string;
  date: Date;
  proName: string;
  prolnkPrice: number;
  marketAvg: number;
  hoursSearchSaved: number;
  rating: number;
  status: "completed";
}

const JOBS: Job[] = [
  {
    id: "j1″,
    service: "HVAC Annual Tune-Up",
    icon: Wind,
    iconColor: "#0891b2″,
    date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    proName: "Apex HVAC Solutions",
    prolnkPrice: 129,
    marketAvg: 189,
    hoursSearchSaved: 2.5,
    rating: 5,
    status: "completed",
  },
  {
    id: "j2″,
    service: "Kitchen Faucet Replacement",
    icon: Droplets,
    iconColor: "#6366f1″,
    date: new Date(Date.now() - 34 * 24 * 60 * 60 * 1000),
    proName: "Clear Flow Plumbing",
    prolnkPrice: 210,
    marketAvg: 310,
    hoursSearchSaved: 3,
    rating: 5,
    status: "completed",
  },
  {
    id: "j3″,
    service: "Roof Shingle Repair",
    icon: Home,
    iconColor: "#10b981″,
    date: new Date(Date.now() - 51 * 24 * 60 * 60 * 1000),
    proName: "Summit Roofing Co.",
    prolnkPrice: 285,
    marketAvg: 420,
    hoursSearchSaved: 3.5,
    rating: 5,
    status: "completed",
  },
  {
    id: "j4″,
    service: "Outlet & Switch Replacement",
    icon: Zap,
    iconColor: "#f59e0b",
    date: new Date(Date.now() - 72 * 24 * 60 * 60 * 1000),
    proName: "BrightSpark Electric",
    prolnkPrice: 165,
    marketAvg: 240,
    hoursSearchSaved: 2,
    rating: 4,
    status: "completed",
  },
  {
    id: "j5″,
    service: "Lawn Aeration & Fertilization",
    icon: Leaf,
    iconColor: "#22c55e",
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    proName: "GreenEdge Lawn Care",
    prolnkPrice: 95,
    marketAvg: 145,
    hoursSearchSaved: 1.5,
    rating: 4,
    status: "completed",
  },
  {
    id: "j6″,
    service: "Water Heater Flush & Inspection",
    icon: Droplets,
    iconColor: "#ec4899″,
    date: new Date(Date.now() - 115 * 24 * 60 * 60 * 1000),
    proName: "Clear Flow Plumbing",
    prolnkPrice: 89,
    marketAvg: 140,
    hoursSearchSaved: 1.5,
    rating: 5,
    status: "completed",
  },
];

const totalProlnkSpend = JOBS.reduce((s, j) => s + j.prolnkPrice, 0);
const totalMarketSpend = JOBS.reduce((s, j) => s + j.marketAvg, 0);
const totalSavings = totalMarketSpend - totalProlnkSpend;
const totalHoursSaved = JOBS.reduce((s, j) => s + j.hoursSearchSaved, 0);
const avgSavingsPct = Math.round((totalSavings / totalMarketSpend) * 100);

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5″>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="w-3 h-3″
          style={{ color: s <= rating ? "#fbbf24″ : "#374151", fill: s <= rating ? "#fbbf24" : "none" }}
        />
      ))}
    </div>
  );
}

function SavingsBar({ prolnkPrice, marketAvg }: { prolnkPrice: number; marketAvg: number }) {
  const prolnkPct = Math.round((prolnkPrice / marketAvg) * 100);
  const savingsPct = 100 - prolnkPct;

  return (
    <div className="space-y-1.5″>
      <div className="flex items-center gap-2″>
        <span className="text-xs text-slate-400 w-24 shrink-0″>Your price</span>
        <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden relative">
          <div
            className="h-full bg-teal-500 rounded-full flex items-center justify-end pr-2 transition-all duration-700″
            style={{ width: `${prolnkPct}%` }}
          >
            <span className="text-xs font-bold text-[#0A1628]">{formatCurrency(prolnkPrice)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2″>
        <span className="text-xs text-slate-400 w-24 shrink-0″>Market avg</span>
        <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden relative">
          <div className="h-full bg-slate-500 rounded-full flex items-center justify-end pr-2″ style={{ width: "100%" }}>
            <span className="text-xs font-bold text-white">{formatCurrency(marketAvg)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <span className="text-xs font-bold text-emerald-400 bg-emerald-900/30 border border-emerald-700/40 px-2 py-0.5 rounded-full">
          You saved {savingsPct}%
        </span>
      </div>
    </div>
  );
}

export default function SavingsTracker() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0A1628]/95 backdrop-blur-sm border-b border-slate-800 px-4 py-3″>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2″>
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-teal-400″ />
            </div>
            <span className="text-sm font-bold text-white">Savings Tracker</span>
          </div>
          <Link href="/trustypro/referral">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-400 text-[#0A1628] hover:bg-teal-300 transition-colors">
              <Share2 className="w-3.5 h-3.5″ />
              Invite & Save
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6″>
        {/* Header */}
        <div>
          <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1″>TrustyPro</p>
          <h1 className="text-2xl font-black text-white">Your Savings Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1″>See exactly how much you've saved vs. going it alone.</p>
        </div>

        {/* Total Savings Hero */}
        <div
          className="rounded-2xl p-6 relative overflow-hidden border border-teal-500/20″
          style={{ background: "linear-gradient(135deg, #0d2240 0%, #0a1f3a 50%, #061528 100%)" }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 bg-teal-400 -translate-y-10 translate-x-10″ />
          <div className="relative z-10″>
            <p className="text-xs font-bold text-teal-300 uppercase tracking-widest mb-3″>Total Savings Since Joining</p>
            <p className="text-5xl font-black text-teal-400 mb-1″>{formatCurrency(totalSavings)}</p>
            <p className="text-sm text-slate-300 mb-5″>
              Saved <strong className="text-white">{avgSavingsPct}% on average</strong> vs. market rate for the same work
            </p>

            <div className="grid grid-cols-3 gap-3″>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10″>
                <p className="text-xl font-black text-white">{JOBS.length}</p>
                <p className="text-xs text-slate-400 mt-0.5″>Jobs Done</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10″>
                <p className="text-xl font-black text-white">{formatCurrency(totalProlnkSpend)}</p>
                <p className="text-xs text-slate-400 mt-0.5″>You Paid</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10″>
                <p className="text-xl font-black text-white">{totalHoursSaved}h</p>
                <p className="text-xs text-slate-400 mt-0.5″>Hours Saved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Savings vs Market — CSS bar chart */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-5″>
            <BarChart2 className="w-4 h-4 text-teal-400″ />
            <p className="font-bold text-white">ProLnk Price vs. Market Rate</p>
          </div>

          <div className="space-y-4″>
            {JOBS.map((job) => {
              const savingsAmt = job.marketAvg - job.prolnkPrice;
              const savingsPct = Math.round((savingsAmt / job.marketAvg) * 100);
              const prolnkBarPct = Math.round((job.prolnkPrice / job.marketAvg) * 100);

              return (
                <div key={job.id} className="space-y-2″>
                  <div className="flex items-center gap-2″>
                    <job.icon className="w-3.5 h-3.5 shrink-0″ style={{ color: job.iconColor }} />
                    <p className="text-xs font-semibold text-slate-300 truncate">{job.service}</p>
                    <span className="ml-auto text-xs font-bold text-emerald-400 whitespace-nowrap">
                      -{savingsPct}%
                    </span>
                  </div>

                  <div className="space-y-1″>
                    <div className="flex items-center gap-2″>
                      <span className="text-xs text-teal-400 w-16 shrink-0 font-semibold">ProLnk</span>
                      <div className="flex-1 bg-slate-700 rounded h-5 overflow-hidden">
                        <div
                          className="h-full bg-teal-500 flex items-center px-2 rounded"
                          style={{ width: `${prolnkBarPct}%`, minWidth: "20%" }}
                        >
                          <span className="text-xs font-bold text-[#0A1628]">{formatCurrency(job.prolnkPrice)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2″>
                      <span className="text-xs text-slate-500 w-16 shrink-0″>Market</span>
                      <div className="flex-1 bg-slate-700 rounded h-5 overflow-hidden">
                        <div className="h-full bg-slate-600 flex items-center px-2 rounded" style={{ width: "100%" }}>
                          <span className="text-xs text-slate-300″>{formatCurrency(job.marketAvg)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals row */}
          <div className="mt-5 pt-4 border-t border-slate-700/60″>
            <div className="flex items-center justify-between mb-2″>
              <p className="text-sm font-bold text-white">Total Comparison</p>
            </div>
            <div className="space-y-1″>
              <div className="flex items-center gap-2″>
                <span className="text-xs text-teal-400 w-16 shrink-0 font-semibold">You paid</span>
                <div className="flex-1 bg-slate-700 rounded h-6 overflow-hidden">
                  <div
                    className="h-full bg-teal-500 flex items-center px-2 rounded"
                    style={{ width: `${Math.round((totalProlnkSpend / totalMarketSpend) * 100)}%` }}
                  >
                    <span className="text-xs font-bold text-[#0A1628]">{formatCurrency(totalProlnkSpend)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2″>
                <span className="text-xs text-slate-500 w-16 shrink-0″>Market</span>
                <div className="flex-1 bg-slate-700 rounded h-6 overflow-hidden">
                  <div className="h-full bg-slate-600 flex items-center px-2 rounded" style={{ width: "100%" }}>
                    <span className="text-xs font-bold text-slate-300″>{formatCurrency(totalMarketSpend)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-2″>
              <span className="text-sm font-black text-emerald-400″>
                Total saved: {formatCurrency(totalSavings)} ({avgSavingsPct}% off)
              </span>
            </div>
          </div>
        </div>

        {/* Job-by-job breakdown */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-5″>
            <Wrench className="w-4 h-4 text-teal-400″ />
            <p className="font-bold text-white">Completed Jobs</p>
            <span className="ml-auto text-xs font-semibold text-slate-500 bg-slate-700 border border-slate-600 px-2 py-0.5 rounded-full">
              {JOBS.length} total
            </span>
          </div>

          <div className="space-y-3″>
            {JOBS.map((job) => {
              const savings = job.marketAvg - job.prolnkPrice;
              const savingsPct = Math.round((savings / job.marketAvg) * 100);
              const isExpanded = expandedJob === job.id;

              return (
                <div
                  key={job.id}
                  className="border border-slate-700/60 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full flex items-center gap-3 p-3.5 bg-slate-700/30 hover:bg-slate-700/50 transition-colors text-left"
                    onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0″
                      style={{ backgroundColor: `${job.iconColor}20` }}
                    >
                      <job.icon className="w-4 h-4″ style={{ color: job.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0″>
                      <p className="text-sm font-semibold text-white truncate">{job.service}</p>
                      <p className="text-xs text-slate-500″>{job.proName} · {formatDate(job.date)}</p>
                    </div>
                    <div className="text-right shrink-0″>
                      <p className="text-sm font-black text-teal-400″>{formatCurrency(job.prolnkPrice)}</p>
                      <p className="text-xs font-bold text-emerald-400″>-{savingsPct}%</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-600 shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-3 bg-slate-800/60 border-t border-slate-700/40 space-y-3″>
                      <SavingsBar prolnkPrice={job.prolnkPrice} marketAvg={job.marketAvg} />
                      <div className="flex items-center justify-between text-xs text-slate-400″>
                        <div className="flex items-center gap-1″>
                          <Clock className="w-3 h-3″ />
                          <span>Search time saved: ~{job.hoursSearchSaved}h</span>
                        </div>
                        <div className="flex items-center gap-1″>
                          <StarRow rating={job.rating} />
                          <span className="ml-1″>{job.rating}/5</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-1″>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0″ />
                        <span className="text-xs text-emerald-400 font-semibold">
                          You saved {formatCurrency(savings)} on this job
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Time Saved */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4″>
            <Clock className="w-4 h-4 text-teal-400″ />
            <p className="font-bold text-white">Time You Got Back</p>
          </div>

          <div className="flex items-center gap-6″>
            <div className="text-center">
              <p className="text-4xl font-black text-teal-400″>{totalHoursSaved}h</p>
              <p className="text-xs text-slate-400 mt-1″>Hours saved</p>
            </div>
            <div className="flex-1 space-y-3″>
              <p className="text-sm text-slate-300″>
                Finding, vetting, and scheduling service pros takes an average of{" "}
                <strong className="text-white">2–3.5 hours per job</strong>. TrustyPro handles all of it.
              </p>
              <div className="space-y-1.5″>
                {[
                  { label: "Research & reviews", hours: "45 min" },
                  { label: "Calling for quotes", hours: "30 min" },
                  { label: "Scheduling & coordination", hours: "25 min" },
                  { label: "Vetting & verifying", hours: "30 min" },
                ].map(({ label, hours }) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400″>{label}</span>
                    <span className="text-slate-500 font-semibold">{hours} avg/job</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Referral Section */}
        <div
          className="rounded-2xl p-6 relative overflow-hidden border border-teal-500/20″
          style={{ background: "linear-gradient(135deg, #0d2240 0%, #0a1f3a 100%)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 bg-teal-400 -translate-y-8 translate-x-8″ />
          <div className="relative z-10″>
            <div className="flex items-center gap-2 mb-2″>
              <Users className="w-5 h-5 text-teal-400″ />
              <p className="text-sm font-bold text-teal-300″>Invite a Neighbor</p>
            </div>
            <h2 className="text-xl font-black text-white mb-2″>Both of you save 10% on your next job</h2>
            <p className="text-sm text-slate-300 mb-4″>
              When a neighbor joins TrustyPro through your link and books their first service, you both get{" "}
              <strong className="text-white">10% off</strong> your next project — automatically applied at booking.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4″>
              <div className="flex items-center gap-3″>
                <div className="flex-1″>
                  <p className="text-xs text-slate-400 mb-0.5″>Your referral link</p>
                  <p className="text-sm font-mono font-semibold text-teal-300″>trustypro.io/join/sarah-maple</p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-400 text-xs font-semibold hover:bg-teal-500/30 transition-colors">
                  <Share2 className="w-3.5 h-3.5″ />
                  Copy
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4″>
              {[
                { label: "Neighbors Invited", value: "3″ },
                { label: "Joined", value: "1″ },
                { label: "Your Earned Credits", value: "$24″ },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-black text-white">{value}</p>
                  <p className="text-xs text-slate-400 mt-0.5″>{label}</p>
                </div>
              ))}
            </div>

            <Link href="/trustypro/referral">
              <button className="w-full flex items-center justify-center gap-2 bg-teal-400 text-[#0A1628] px-5 py-3 rounded-xl text-sm font-bold hover:bg-teal-300 transition-colors">
                <Users className="w-4 h-4″ />
                Invite Your Neighbors
                <ArrowRight className="w-4 h-4″ />
              </button>
            </Link>
          </div>
        </div>

        {/* CTA — book next job */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 backdrop-blur-sm flex items-center gap-4″>
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0″>
            <TrendingDown className="w-6 h-6 text-teal-400″ />
          </div>
          <div className="flex-1 min-w-0″>
            <p className="text-sm font-bold text-white">Book your next project and keep saving</p>
            <p className="text-xs text-slate-400 mt-0.5″>Average homeowner saves {avgSavingsPct}% per job through TrustyPro</p>
          </div>
          <Link href="/trustypro/book">
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-teal-400 text-[#0A1628] hover:bg-teal-300 transition-colors shrink-0″>
              Book <ArrowRight className="w-4 h-4″ />
            </button>
          </Link>
        </div>

        <div className="h-6″ />
      </div>
    </div>
  );
}
