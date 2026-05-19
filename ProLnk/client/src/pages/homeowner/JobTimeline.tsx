import HomeownerLayout from "@/components/HomeownerLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wrench,
  Zap,
  Droplets,
  Wind,
  Paintbrush,
  Hammer,
  TreePine,
  Star,
  DollarSign,
  Calendar,
  RefreshCw,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    date: "Mar 12, 2026",
    title: "HVAC Annual Tune-Up",
    pro: "Arctic Air HVAC",
    trade: "HVAC",
    amount: 189,
    rating: 5,
    color: "bg-cyan-500",
    icon: Wind,
    status: "Completed",
  },
  {
    id: 2,
    date: "Feb 28, 2026",
    title: "Bathroom Faucet Replacement",
    pro: "FlowRight Plumbing",
    trade: "Plumbing",
    amount: 210,
    rating: 5,
    color: "bg-blue-500",
    icon: Droplets,
    status: "Completed",
  },
  {
    id: 3,
    date: "Feb 3, 2026",
    title: "Exterior Paint Touch-Up",
    pro: "FineLine Painting Co.",
    trade: "Painting",
    amount: 320,
    rating: 4,
    color: "bg-orange-400",
    icon: Paintbrush,
    status: "Completed",
  },
  {
    id: 4,
    date: "Jan 15, 2026",
    title: "Panel Inspection & GFCI Install",
    pro: "Volt Pro Electric",
    trade: "Electrical",
    amount: 275,
    rating: 5,
    color: "bg-yellow-400",
    icon: Zap,
    status: "Completed",
  },
  {
    id: 5,
    date: "Dec 8, 2025",
    title: "Deck Board Replacement",
    pro: "Cornerstone Carpentry",
    trade: "Carpentry",
    amount: 410,
    rating: 5,
    color: "bg-amber-600",
    icon: Hammer,
    status: "Completed",
  },
  {
    id: 6,
    date: "Nov 19, 2025",
    title: "Water Heater Flush",
    pro: "FlowRight Plumbing",
    trade: "Plumbing",
    amount: 95,
    rating: 4,
    color: "bg-blue-500",
    icon: Droplets,
    status: "Completed",
  },
  {
    id: 7,
    date: "Oct 5, 2025",
    title: "Tree Trimming & Cleanup",
    pro: "GreenScape Landscaping",
    trade: "Landscaping",
    amount: 346,
    rating: 5,
    color: "bg-green-500",
    icon: TreePine,
    status: "Completed",
  },
];

const totalSpent = jobs.reduce((sum, j) => sum + j.amount, 0);
const avgRating = (jobs.reduce((sum, j) => sum + j.rating, 0) / jobs.length).toFixed(1);

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3 h-3 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}`}
        />
      ))}
    </div>
  );
}

export default function JobTimeline() {
  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Job Timeline</h1>
          <p className="text-slate-400 text-sm">Your complete service history with ProLnk pros</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <Card className="bg-[#0F1F38] border border-slate-700">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-5 h-5 text-teal-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-white">${totalSpent.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-0.5">Total Invested</div>
            </CardContent>
          </Card>
          <Card className="bg-[#0F1F38] border border-slate-700">
            <CardContent className="p-4 text-center">
              <Wrench className="w-5 h-5 text-teal-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-white">{jobs.length}</div>
              <div className="text-xs text-slate-400 mt-0.5">Jobs Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-[#0F1F38] border border-slate-700">
            <CardContent className="p-4 text-center">
              <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-white">{avgRating}★</div>
              <div className="text-xs text-slate-400 mt-0.5">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700" />

          <div className="space-y-6">
            {jobs.map((job, i) => {
              const Icon = job.icon;
              return (
                <div key={job.id} className="relative flex gap-5 pl-14">
                  <div
                    className={`absolute left-0 w-12 h-12 rounded-full ${job.color} flex items-center justify-center shadow-lg flex-shrink-0 z-10`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {i < jobs.length - 1 && (
                    <div className={`absolute left-6 top-12 w-0.5 h-6 ${job.color} opacity-40`} />
                  )}

                  <Card className="bg-[#0F1F38] border border-slate-700 flex-1 hover:border-slate-500 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-white font-semibold text-sm">{job.title}</h3>
                            <Badge className="bg-teal-900 text-teal-300 text-xs border-0 px-2 py-0">
                              {job.trade}
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-xs mt-0.5">{job.pro}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-white font-bold text-sm">${job.amount}</div>
                          <div className="text-slate-500 text-xs">paid</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar className="w-3 h-3" />
                            {job.date}
                          </div>
                          <StarRow rating={job.rating} />
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 border-teal-700 text-teal-400 hover:bg-teal-900 hover:text-teal-200 flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          Book Again
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6">
            Book a New Service
          </Button>
        </div>
      </div>
    </HomeownerLayout>
  );
}
