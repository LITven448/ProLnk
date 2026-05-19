import { useState } from "react";
import {
  Users, TrendingUp, Repeat, Clock, Star, ChevronDown, ChevronUp,
  Send, CheckCircle, DollarSign, Calendar, Wrench, Zap, Home,
  Droplets, Shield, Wind, Heart, Award,
} from "lucide-react";

type RelationshipStrength = "Occasional" | "Regular" | "Loyal";

const STRENGTH_CONFIG: Record<RelationshipStrength, { color: string; bg: string; border: string }> = {
  Occasional: { color: "text-slate-400″,  bg: "bg-slate-500/10",  border: "border-slate-500/30" },
  Regular:    { color: "text-teal-400″,   bg: "bg-teal-500/10",   border: "border-teal-500/30" },
  Loyal:      { color: "text-amber-400″,  bg: "bg-amber-500/10",  border: "border-amber-500/30" },
};

type Job = { date: string; service: string; amount: string; rating: number };

type Customer = {
  id: number;
  name: string;
  city: string;
  service: string;
  lastJob: string;
  jobCount: number;
  rating: number;
  nextService: string;
  totalSpent: number;
  strength: RelationshipStrength;
  jobs: Job[];
};

const CUSTOMERS: Customer[] = [
  {
    id: 1, name: "Jennifer Walsh",    city: "Frisco",      service: "HVAC",      lastJob: "Mar 12, 2026″, jobCount: 4, rating: 5, nextService: "HVAC tune-up due May 2026",    totalSpent: 1840, strength: "Loyal",
    jobs: [
      { date: "Mar 12, 2026″, service: "HVAC Repair",       amount: "$380", rating: 5 },
      { date: "Nov 8, 2025″,  service: "HVAC Tune-Up",      amount: "$195", rating: 5 },
      { date: "Jun 3, 2025″,  service: "AC Installation",   amount: "$890", rating: 5 },
      { date: "Jan 14, 2025″, service: "Heating Check",     amount: "$375", rating: 5 },
    ],
  },
  {
    id: 2, name: "Marcus Thompson",   city: "Plano",       service: "Plumbing",  lastJob: "Apr 5, 2026″,  jobCount: 3, rating: 5, nextService: "Water heater flush due Jul 2026", totalSpent: 1120, strength: "Regular",
    jobs: [
      { date: "Apr 5, 2026″,  service: "Pipe Repair",       amount: "$320", rating: 5 },
      { date: "Oct 22, 2025″, service: "Drain Cleaning",    amount: "$180", rating: 5 },
      { date: "May 9, 2025″,  service: "Water Heater",      amount: "$620", rating: 5 },
    ],
  },
  {
    id: 3, name: "Sandra Kim",        city: "Allen",       service: "Electrical","lastJob": "Feb 28, 2026″, jobCount: 2, rating: 4, nextService: "Panel inspection due Aug 2026",  totalSpent: 840, strength: "Regular",
    jobs: [
      { date: "Feb 28, 2026″, service: "Panel Upgrade",     amount: "$580", rating: 4 },
      { date: "Sep 15, 2025″, service: "Outlet Install",    amount: "$260", rating: 4 },
    ],
  },
  {
    id: 4, name: "David Reyes",       city: "McKinney",    service: "Roofing",   lastJob: "Jan 20, 2026″, jobCount: 1, rating: 5, nextService: "Roof inspection due Sep 2026",   totalSpent: 4200, strength: "Occasional",
    jobs: [
      { date: "Jan 20, 2026″, service: "Full Roof Replace", amount: "$4,200", rating: 5 },
    ],
  },
  {
    id: 5, name: "Amy Collins",       city: "Prosper",     service: "Painting",  lastJob: "Apr 18, 2026″, jobCount: 3, rating: 5, nextService: "Exterior paint due Jun 2027",    totalSpent: 2100, strength: "Regular",
    jobs: [
      { date: "Apr 18, 2026″, service: "Interior Paint",   amount: "$780", rating: 5 },
      { date: "Aug 11, 2025″, service: "Cabinet Repaint",  amount: "$420", rating: 5 },
      { date: "Mar 4, 2025″,  service: "Exterior Paint",   amount: "$900", rating: 5 },
    ],
  },
  {
    id: 6, name: "Robert Nguyen",     city: "Celina",      service: "Landscaping", lastJob: "Mar 30, 2026″, jobCount: 5, rating: 5, nextService: "Spring cleanup due May 2026",  totalSpent: 3250, strength: "Loyal",
    jobs: [
      { date: "Mar 30, 2026″, service: "Spring Cleanup",    amount: "$480", rating: 5 },
      { date: "Oct 5, 2025″,  service: "Fall Cleanup",      amount: "$460", rating: 5 },
      { date: "Jun 20, 2025″, service: "Sod Installation",  amount: "$1,200", rating: 5 },
      { date: "Apr 2, 2025″,  service: "Spring Cleanup",    amount: "$440", rating: 5 },
      { date: "Oct 8, 2024″,  service: "Fall Cleanup",      amount: "$670", rating: 5 },
    ],
  },
  {
    id: 7, name: "Laura Bennett",     city: "Frisco",      service: "Pest Control", lastJob: "Feb 10, 2026″, jobCount: 4, rating: 4, nextService: "Quarterly treatment due May 2026", totalSpent: 960, strength: "Loyal",
    jobs: [
      { date: "Feb 10, 2026″, service: "Quarterly Treatment", amount: "$240", rating: 4 },
      { date: "Nov 10, 2025″, service: "Quarterly Treatment", amount: "$240", rating: 4 },
      { date: "Aug 10, 2025″, service: "Quarterly Treatment", amount: "$240", rating: 4 },
      { date: "May 10, 2025″, service: "Initial Treatment",   amount: "$240", rating: 4 },
    ],
  },
  {
    id: 8, name: "Tom Vasquez",       city: "Little Elm",  service: "Fencing",   lastJob: "Jan 8, 2026″,  jobCount: 1, rating: 5, nextService: "Fence stain due Jul 2026",       totalSpent: 2800, strength: "Occasional",
    jobs: [
      { date: "Jan 8, 2026″, service: "Cedar Fence Install", amount: "$2,800", rating: 5 },
    ],
  },
  {
    id: 9, name: "Patricia Lee",      city: "Richardson",  service: "Cleaning",  lastJob: "Apr 25, 2026″, jobCount: 6, rating: 5, nextService: "Deep clean due Jun 2026",        totalSpent: 1440, strength: "Loyal",
    jobs: [
      { date: "Apr 25, 2026″, service: "House Cleaning",    amount: "$240", rating: 5 },
      { date: "Mar 25, 2026″, service: "House Cleaning",    amount: "$240", rating: 5 },
      { date: "Feb 25, 2026″, service: "House Cleaning",    amount: "$240", rating: 5 },
      { date: "Jan 25, 2026″, service: "House Cleaning",    amount: "$240", rating: 5 },
      { date: "Dec 25, 2025″, service: "Deep Clean",        amount: "$280", rating: 5 },
      { date: "Nov 25, 2025″, service: "House Cleaning",    amount: "$200", rating: 5 },
    ],
  },
  {
    id: 10, name: "Gary Mitchell",    city: "Garland",     service: "Concrete",  lastJob: "Feb 1, 2026″,  jobCount: 1, rating: 4, nextService: "Driveway seal due Aug 2026",      totalSpent: 3600, strength: "Occasional",
    jobs: [
      { date: "Feb 1, 2026″, service: "Driveway Pour",      amount: "$3,600", rating: 4 },
    ],
  },
  {
    id: 11, name: "Rachel Foster",    city: "Wylie",       service: "HVAC",      lastJob: "Mar 5, 2026″,  jobCount: 2, rating: 5, nextService: "AC checkup due Jun 2026",        totalSpent: 680, strength: "Regular",
    jobs: [
      { date: "Mar 5, 2026″,  service: "AC Tune-Up",        amount: "$195", rating: 5 },
      { date: "Sep 18, 2025″, service: "AC Repair",         amount: "$485", rating: 5 },
    ],
  },
  {
    id: 12, name: "Carlos Hernandez", city: "Murphy",      service: "Gutters",   lastJob: "Apr 12, 2026″, jobCount: 2, rating: 4, nextService: "Gutter clean due Oct 2026",      totalSpent: 540, strength: "Regular",
    jobs: [
      { date: "Apr 12, 2026″, service: "Gutter Clean",      amount: "$180", rating: 4 },
      { date: "Oct 14, 2025″, service: "Gutter Guards",     amount: "$360", rating: 4 },
    ],
  },
];

const FOLLOW_UP_IDS = [4, 8, 10, 3, 7];

const SERVICE_ICON: Record<string, typeof Wrench> = {
  HVAC: Zap, Plumbing: Droplets, Electrical: Zap, Roofing: Home, Painting: Award,
  Landscaping: Heart, "Pest Control": Shield, Fencing: Home, Cleaning: Wind,
  Concrete: Home, Gutters: Droplets,
};

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5″>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} className={i <= rating ? "fill-amber-400 text-amber-400″ : "text-slate-600"} />
      ))}
    </span>
  );
}

export default function CustomerRelationshipManager() {
  const [sentIds, setSentIds] = useState<Set<number>>(new Set());
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [thankYouSent, setThankYouSent] = useState(false);

  const followUpQueue = CUSTOMERS.filter(c => FOLLOW_UP_IDS.includes(c.id));
  const topFive = [...CUSTOMERS].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);

  const toggleSent = (id: number) => {
    setSentIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1628] text-white p-6 space-y-8″>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Customers</h1>
        <p className="text-slate-400 mt-1″>Build relationships, earn repeat business</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4″>
        {[
          { label: "Total Customers",    value: "47″,   icon: Users,      color: "text-teal-400",   sub: "across all time" },
          { label: "Repeat Rate",        value: "31%",  icon: Repeat,     color: "text-amber-400″,  sub: "returned for 2+ jobs" },
          { label: "Avg Jobs/Customer",  value: "2.1″,  icon: TrendingUp, color: "text-purple-400", sub: "industry avg: 1.4" },
          { label: "Due for Follow-up",  value: "8″,    icon: Clock,      color: "text-red-400",    sub: "haven't heard from you" },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#0D1F3C] border border-white/5 rounded-xl p-4″>
              <div className="flex items-center gap-2 mb-2″>
                <Icon size={16} className={stat.color} />
                <span className="text-xs text-slate-500″>{stat.label}</span>
              </div>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1″>{stat.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Revenue Banner */}
      <div className="bg-gradient-to-r from-teal-600/20 to-purple-600/20 border border-teal-500/30 rounded-xl p-4 flex items-center gap-4″>
        <DollarSign size={32} className="text-teal-400 shrink-0″ />
        <div>
          <p className="text-white font-semibold">Your average customer has spent <span className="text-teal-400″>$847 total</span></p>
          <p className="text-slate-400 text-sm">Your top 20% spend <span className="text-amber-400 font-semibold">$2,400+</span> — focus your follow-ups there first</p>
        </div>
      </div>

      {/* Follow-up Queue */}
      <div>
        <div className="flex items-center justify-between mb-4″>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2″>
            <Clock size={18} className="text-amber-400″ />
            Follow-Up Queue
            <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">5 pending</span>
          </h2>
        </div>
        <div className="space-y-3″>
          {followUpQueue.map(c => {
            const isSent = sentIds.has(c.id);
            const Icon = SERVICE_ICON[c.service] ?? Wrench;
            return (
              <div key={c.id} className="bg-[#0D1F3C] border border-amber-500/20 rounded-xl p-4 flex items-center justify-between gap-4″>
                <div className="flex items-center gap-3 min-w-0″>
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0″>
                    <Icon size={16} className="text-amber-400″ />
                  </div>
                  <div className="min-w-0″>
                    <div className="font-medium text-white">{c.name}</div>
                    <div className="text-xs text-slate-500″>{c.city} · {c.service} · Last job {c.lastJob}</div>
                    <div className="text-xs text-amber-400 mt-0.5″>Last job 3+ months ago, haven't reached out</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSent(c.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isSent
                      ? "bg-green-500/10 text-green-400 border border-green-500/30″
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20″
                  }`}
                >
                  {isSent ? <><CheckCircle size={14} /> Sent ✅</> : <><Send size={14} /> Send Follow-up</>}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Thank-You Campaign */}
      <div className="bg-[#0D1F3C] border border-purple-500/20 rounded-xl p-5″>
        <div className="flex items-center justify-between mb-4″>
          <div>
            <h2 className="text-base font-semibold text-white flex items-center gap-2″>
              <Heart size={16} className="text-purple-400″ />
              Thank-You Campaign
            </h2>
            <p className="text-slate-400 text-sm mt-0.5″>Send a thank-you to your top 5 customers</p>
          </div>
          <button
            onClick={() => setThankYouSent(true)}
            disabled={thankYouSent}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              thankYouSent
                ? "bg-green-500/10 text-green-400 border border-green-500/30 cursor-default"
                : "bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20″
            }`}
          >
            {thankYouSent ? <><CheckCircle size={14} /> Sent to 5 customers</> : <><Send size={14} /> Send All</>}
          </button>
        </div>
        <div className="flex flex-wrap gap-2″>
          {topFive.map((c, i) => (
            <div key={c.id} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5 text-sm">
              <span className="text-purple-400 font-bold">#{i + 1}</span>
              <span className="text-white">{c.name}</span>
              <span className="text-slate-500″>${c.totalSpent.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer List */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2″>
          <Users size={18} className="text-teal-400″ />
          All Customers
        </h2>
        <div className="bg-[#0D1F3C] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-slate-500″>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">City</th>
                  <th className="text-left px-4 py-3 font-medium">Service</th>
                  <th className="text-left px-4 py-3 font-medium">Last Job</th>
                  <th className="text-center px-4 py-3 font-medium">Jobs</th>
                  <th className="text-center px-4 py-3 font-medium">Rating</th>
                  <th className="text-left px-4 py-3 font-medium">Strength</th>
                  <th className="text-left px-4 py-3 font-medium">Next Service</th>
                  <th className="px-4 py-3″ />
                </tr>
              </thead>
              <tbody>
                {CUSTOMERS.map(c => {
                  const expanded = expandedId === c.id;
                  const cfg = STRENGTH_CONFIG[c.strength];
                  return (
                    <>
                      <tr
                        key={c.id}
                        onClick={() => setExpandedId(expanded ? null : c.id)}
                        className="border-b border-white/5 hover:bg-white/3 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-white">{c.name}</td>
                        <td className="px-4 py-3 text-slate-400″>{c.city}</td>
                        <td className="px-4 py-3 text-slate-300″>{c.service}</td>
                        <td className="px-4 py-3 text-slate-400″>{c.lastJob}</td>
                        <td className="px-4 py-3 text-center text-white font-semibold">{c.jobCount}</td>
                        <td className="px-4 py-3 text-center"><StarRow rating={c.rating} /></td>
                        <td className="px-4 py-3″>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                            {c.strength}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs">{c.nextService}</td>
                        <td className="px-4 py-3 text-slate-500″>
                          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </td>
                      </tr>
                      {expanded && (
                        <tr key={`${c.id}-detail`} className="bg-white/2 border-b border-white/5″>
                          <td colSpan={9} className="px-6 py-4″>
                            <div className="text-xs text-slate-500 uppercase tracking-wide mb-2″>Job History</div>
                            <div className="space-y-2″>
                              {c.jobs.map((j, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2″>
                                  <div className="flex items-center gap-3″>
                                    <Calendar size={12} className="text-teal-400″ />
                                    <span className="text-slate-400 text-xs">{j.date}</span>
                                    <span className="text-white text-sm">{j.service}</span>
                                  </div>
                                  <div className="flex items-center gap-3″>
                                    <StarRow rating={j.rating} />
                                    <span className="text-teal-400 font-semibold text-sm">{j.amount}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
