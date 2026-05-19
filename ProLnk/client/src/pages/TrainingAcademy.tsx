import { useState, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, CheckCircle, Lock, Clock, Award, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const TRACKS = [
  {
    id: "foundation",
    title: "ProLnk Foundation",
    description: "Everything you need to start earning on day one",
    modules: [
      { id: 1, title: "How ProLnk Works", duration: "8 min", type: "video" },
      { id: 2, title: "Your Partner Dashboard", duration: "12 min", type: "video" },
      { id: 3, title: "Accepting Your First Deal", duration: "6 min", type: "video" },
      { id: 4, title: "The Check-In System", duration: "10 min", type: "video" },
      { id: 5, title: "Getting Paid: How Commissions Work", duration: "15 min", type: "video" },
    ],
    badge: "Foundation Badge",
    color: "border-blue-200 bg-blue-50/30",
    headerColor: "text-blue-700",
  },
  {
    id: "sales",
    title: "Sales Mastery",
    description: "Close more deals and increase your average job value",
    modules: [
      { id: 6, title: "The 3-Question Discovery Call", duration: "18 min", type: "video" },
      { id: 7, title: "Handling Objections", duration: "22 min", type: "video" },
      { id: 8, title: "Upsell Techniques That Don't Feel Pushy", duration: "16 min", type: "video" },
      { id: 9, title: "Following Up Without Being Annoying", duration: "12 min", type: "video" },
    ],
    badge: "Sales Pro Badge",
    color: "border-green-200 bg-green-50/30",
    headerColor: "text-green-700",
    locked: true,
  },
  {
    id: "insurance",
    title: "Insurance Job Specialist",
    description: "Master the insurance claim process and earn 40% more per job",
    modules: [
      { id: 10, title: "How Insurance Claims Work", duration: "25 min", type: "video" },
      { id: 11, title: "Working with Adjusters", duration: "20 min", type: "video" },
      { id: 12, title: "Documentation Best Practices", duration: "14 min", type: "video" },
      { id: 13, title: "Supplement Strategies", duration: "30 min", type: "video" },
    ],
    badge: "Insurance Specialist Badge",
    color: "border-amber-200 bg-amber-50/30",
    headerColor: "text-amber-700",
    locked: true,
  },
  {
    id: "growth",
    title: "Growing Your Business",
    description: "Build a team, get referrals, and scale beyond solo work",
    modules: [
      { id: 14, title: "Building a Referral Network", duration: "20 min", type: "video" },
      { id: 15, title: "Hiring Your First Sub", duration: "28 min", type: "video" },
      { id: 16, title: "Managing Multiple Jobs at Once", duration: "18 min", type: "video" },
      { id: 17, title: "Franchise Opportunities with ProLnk", duration: "15 min", type: "video" },
    ],
    badge: "Growth Leader Badge",
    color: "border-violet-200 bg-violet-50/30",
    headerColor: "text-violet-700",
    locked: true,
  },
];

export default function TrainingAcademy() {
  const [activeTrack, setActiveTrack] = useState("foundation");
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const { user } = useAuth();

  const { data: myEnrollments } = trpc.partnerTools.training.myEnrollments.useQuery();
  const enrollMutation = trpc.partnerTools.training.enroll.useMutation();
  const progressMutation = trpc.partnerTools.training.updateProgress.useMutation();

  useEffect(() => {
    if (myEnrollments) {
      const completed = new Set<number>();
      for (const enrollment of myEnrollments) {
        const track = TRACKS.find(t => t.id === enrollment.courseId);
        if (track && enrollment.status === "completed") {
          track.modules.forEach(m => completed.add(m.id));
        } else if (track && enrollment.progress) {
          // Mark modules as done proportionally based on progress
          const doneCount = Math.floor((enrollment.progress / 100) * track.modules.length);
          track.modules.slice(0, doneCount).forEach(m => completed.add(m.id));
        }
      }
      setCompletedModules(completed);
    }
  }, [myEnrollments]);

  const handleModuleClick = async (mod: { id: number; title: string }, trackId: string, trackTitle: string) => {
    if (completedModules.has(mod.id)) { toast.info("Module already completed"); return; }
    const newCompleted = new Set(Array.from(completedModules).concat(mod.id));
    setCompletedModules(newCompleted);
    toast.success(`Starting: ${mod.title}`);

    const track = TRACKS.find(t => t.id === trackId)!;
    const doneInTrack = track.modules.filter(m => newCompleted.has(m.id)).length;
    const progress = Math.round((doneInTrack / track.modules.length) * 100);

    const existing = myEnrollments?.find(e => e.courseId === trackId);
    if (!existing) {
      enrollMutation.mutate({ courseId: trackId, courseName: trackTitle }, {
        onSuccess: (result) => {
          if (result.id) progressMutation.mutate({ enrollmentId: result.id, progress });
        }
      });
    } else {
      progressMutation.mutate({ enrollmentId: existing.id, progress });
    }
  };

  const totalCompleted = TRACKS.flatMap(t => t.modules).filter(m => completedModules.has(m.id)).length;
  const totalModules = TRACKS.flatMap(t => t.modules).length;
  const progressPct = Math.round((totalCompleted / totalModules) * 100);
  const track = TRACKS.find(t => t.id === activeTrack)!;
  const badgesEarned = TRACKS.filter(t => t.modules.every(m => completedModules.has(m.id))).length;

  return (
    <PartnerLayout>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">ProLnk Academy</h1>
          <p className="text-slate-500 mt-1">Training that turns good pros into top earners</p>
        </div>

        {/* Progress Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm text-indigo-200 mb-1">Your Progress</div>
              <div className="text-3xl font-bold">{totalCompleted}/{totalModules} modules</div>
              <div className="text-indigo-200 text-sm mt-1">{progressPct}% complete</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-indigo-200 mb-1">Badges Earned</div>
              <div className="text-3xl font-bold">{badgesEarned}/4</div>
            </div>
          </div>
          <div className="mt-3 h-2 bg-indigo-500/50 rounded-full">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Track List */}
          <div className="space-y-2">
            {TRACKS.map(t => {
              const completedCount = t.modules.filter(m => completedModules.has(m.id)).length;
              const isActive = activeTrack === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    if (t.locked) { toast.info("Complete the Foundation track to unlock this"); return; }
                    setActiveTrack(t.id);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isActive ? "border-indigo-300 bg-indigo-50" : t.locked ? "opacity-60 cursor-not-allowed bg-white border-slate-200" : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-semibold ${isActive ? "text-indigo-700" : "text-slate-800"}`}>{t.title}</span>
                    {t.locked ? <Lock className="w-3.5 h-3.5 text-slate-400" /> : completedCount === t.modules.length ? <Award className="w-3.5 h-3.5 text-amber-500" /> : null}
                  </div>
                  <div className="text-xs text-slate-500">{completedCount}/{t.modules.length} complete</div>
                  <div className="mt-1.5 h-1 bg-slate-200 rounded-full">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${(completedCount / t.modules.length) * 100}%` }} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Module List */}
          <div className="md:col-span-2">
            <Card className={track.color}>
              <CardHeader>
                <CardTitle className={`text-base ${track.headerColor}`}>{track.title}</CardTitle>
                <p className="text-xs text-slate-500">{track.description}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {track.modules.map((mod) => {
                  const isDone = completedModules.has(mod.id);
                  return (
                    <div
                      key={mod.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isDone ? "bg-green-50 border-green-200" : "bg-white border-slate-200 hover:border-indigo-200"
                      }`}
                      onClick={() => handleModuleClick(mod, track.id, track.title)}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDone ? "bg-green-500" : "bg-indigo-100"
                      }`}>
                        {isDone
                          ? <CheckCircle className="w-4 h-4 text-white" />
                          : <Play className="w-3 h-3 text-indigo-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800">{mod.title}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <Clock className="w-3 h-3" /> {mod.duration}
                          <Badge className="text-xs bg-slate-100 text-slate-500">{mod.type}</Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  );
                })}

                {/* Badge */}
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-amber-800">{track.badge}</div>
                    <div className="text-xs text-amber-600">Complete all modules to earn this badge</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </PartnerLayout>
  );
}
