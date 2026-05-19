import { ArrowRight, TrendingUp, DollarSign, Users, Star } from "lucide-react";

type Row = { label: string; prolnk: string; w2: string; solo: string; angi: string; thumbtack: string };

const rows: Row[] = [
  { label: "Keep % of earnings", prolnk: "72%", w2: "55–65%", solo: "65–75%", angi: "35–55%", thumbtack: "40–60%" },
  { label: "Passive income", prolnk: "Yes — 4 levels", w2: "None", solo: "None", angi: "None", thumbtack: "None" },
  { label: "Upfront costs", prolnk: "$149/mo", w2: "None", solo: "Tools only", angi: "$300+/mo", thumbtack: "$150+/mo" },
  { label: "Lead quality", prolnk: "AI-matched", w2: "N/A", solo: "Self-sourced", angi: "Shared leads", thumbtack: "Shared leads" },
  { label: "Network effect", prolnk: "Grows forever", w2: "None", solo: "None", angi: "None", thumbtack: "None" },
  { label: "Avg monthly extra", prolnk: "$2,160–$6,100+", w2: "$0", solo: "$800–$2K", angi: "-$300 net", thumbtack: "-$150 net" },
];

type Scenario = { title: string; detail: string; result: string; note: string };

const scenarios: Scenario[] = [
  {
    title: "Part-Time",
    detail: "5 jobs/mo × $3,000 avg",
    result: "$2,160/mo kept",
    note: "72% commission on $3,000 avg job value",
  },
  {
    title: "Full-Time",
    detail: "15 jobs/mo × $5,000 avg",
    result: "$5,400/mo kept",
    note: "72% commission on $5,000 avg job value",
  },
  {
    title: "With Network of 10",
    detail: "Full-time + 10 referred pros",
    result: "+$700/mo passive",
    note: "4-level override on your network's jobs",
  },
];

export default function ProIncomeComparison() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B2A4A] mb-4 leading-tight">
            Why Home Service Pros Choose ProLnk<br className="hidden md:block" /> Over Traditional Employment
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            The math is simple. The choice is clear.
          </p>
        </div>

        <div className="overflow-x-auto mb-16">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide bg-gray-100 rounded-tl-xl">Metric</th>
                <th className="py-4 px-4 text-sm font-semibold text-white bg-[#1B2A4A] border-x-4 border-[#F59E0B]">ProLnk</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-600 bg-gray-100">W-2 Employee</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-600 bg-gray-100">Solo Contractor</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-600 bg-gray-100">Angi / HA</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-600 bg-gray-100 rounded-tr-xl">Thumbtack</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-4 px-4 text-sm font-medium text-gray-700">{row.label}</td>
                  <td className="py-4 px-4 text-center text-sm font-bold text-[#1B2A4A] bg-[#FFFBEB] border-x-4 border-[#F59E0B]">
                    {row.prolnk}
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-gray-500">{row.w2}</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-500">{row.solo}</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-500">{row.angi}</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-500">{row.thumbtack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-2">The Math</h2>
          <p className="text-gray-500 mb-8">Real scenarios. Real numbers.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-[#F59E0B]" />
                  <span className="font-semibold text-[#1B2A4A]">{s.title}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{s.detail}</p>
                <div className="text-3xl font-bold text-[#1B2A4A] mb-2">{s.result}</div>
                <p className="text-xs text-gray-400">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-2xl p-8 mb-16">
          <div className="flex items-start gap-4">
            <DollarSign className="w-8 h-8 text-[#D97706] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">What You Give Up to Join Angi</h3>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">$300/mo in lead fees</span> + <span className="font-semibold">30% commission cut</span> ={" "}
                <span className="text-2xl font-bold text-[#D97706]">$6,600/year</span> you hand to them — for shared, unvetted leads.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center bg-[#1B2A4A] rounded-3xl py-14 px-6">
          <div className="flex justify-center mb-4">
            <Users className="w-10 h-10 text-[#F59E0B]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Keep More of What You Earn?</h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Join the waitlist. Charter members lock in $149/mo forever and keep 72% from day one.
          </p>
          <a
            href="/apply"
            className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#1B2A4A] font-bold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Join ProLnk — Keep 72%
            <ArrowRight className="w-5 h-5" />
          </a>
          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-[#F59E0B]" /> No contracts</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-[#F59E0B]" /> Cancel anytime</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-[#F59E0B]" /> 500-member limit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
