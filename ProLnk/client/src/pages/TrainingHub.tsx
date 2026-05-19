/**
 * Partner Training Hub
 * Video library, certification tracker, and quiz system for ProLnk partners.
 * Wave 18 — autonomous build
 */
import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlayCircle, CheckCircle, Lock, Award, BookOpen,
  ChevronRight, Star, Clock, Trophy, Zap, Target
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";

// ─── Training content ────────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1,
    title: "ProLnk Partner Fundamentals",
    description: "How the network works, commission structure, and your first referral.",
    duration: "12 min",
    category: "Onboarding",
    badge: "Certified Partner",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    lessons: [
      { id: 1, title: "Welcome to ProLnk", duration: "2 min", type: "video" },
      { id: 2, title: "How AI Detects Opportunities", duration: "4 min", type: "video" },
      { id: 3, title: "Commission Structure Explained", duration: "3 min", type: "video" },
      { id: 4, title: "Fundamentals Quiz", duration: "3 min", type: "quiz", questions: 5 },
    ],
  },
  {
    id: 2,
    title: "Field OS Mastery",
    description: "Camera best practices, GPS tagging, and offline job logging.",
    duration: "18 min",
    category: "Field Skills",
    badge: "Field Pro",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    lessons: [
      { id: 5, title: "Camera Angle & Lighting Guide", duration: "5 min", type: "video" },
      { id: 6, title: "What the AI Looks For", duration: "4 min", type: "video" },
      { id: 7, title: "GPS Auto-Fill & Offline Mode", duration: "3 min", type: "video" },
      { id: 8, title: "Photo Best Practices", duration: "3 min", type: "video" },
      { id: 9, title: "Field OS Quiz", duration: "3 min", type: "quiz", questions: 6 },
    ],
  },
  {
    id: 3,
    title: "Referral Conversion Mastery",
    description: "How to follow up on inbound leads and close more jobs.",
    duration: "15 min",
    category: "Sales",
    badge: "Top Referrer",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
    lessons: [
      { id: 10, title: "Responding to Inbound Leads", duration: "4 min", type: "video" },
      { id: 11, title: "The 24-Hour Response Rule", duration: "3 min", type: "video" },
      { id: 12, title: "Building Trust with Homeowners", duration: "4 min", type: "video" },
      { id: 13, title: "Conversion Quiz", duration: "4 min", type: "quiz", questions: 7 },
    ],
  },
  {
    id: 4,
    title: "Dispute Prevention & Compliance",
    description: "How to avoid strikes, document jobs properly, and stay in good standing.",
    duration: "10 min",
    category: "Compliance",
    badge: "Compliance Pro",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    lessons: [
      { id: 14, title: "The 3-Strike System", duration: "3 min", type: "video" },
      { id: 15, title: "Documenting Jobs to Prevent Disputes", duration: "4 min", type: "video" },
      { id: 16, title: "Compliance Quiz", duration: "3 min", type: "quiz", questions: 5 },
    ],
  },
  {
    id: 5,
    title: "Tier Advancement Playbook",
    description: "Strategies to move from Scout to Enterprise tier and maximize earnings.",
    duration: "20 min",
    category: "Growth",
    badge: "Growth Champion",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    locked: true,
    lessons: [
      { id: 17, title: "Understanding Tier Requirements", duration: "4 min", type: "video" },
      { id: 18, title: "Building Your Referral Network", duration: "5 min", type: "video" },
      { id: 19, title: "Co-Marketing with ProLnk", duration: "4 min", type: "video" },
      { id: 20, title: "Advanced Earnings Strategies", duration: "4 min", type: "video" },
      { id: 21, title: "Growth Playbook Quiz", duration: "3 min", type: "quiz", questions: 8 },
    ],
  },
];

const QUIZ_QUESTIONS: Record<number, { q: string; options: string[]; correct: number }[]> = {
  4: [
    { q: "What is the minimum description length when filing a dispute?", options: ["10 chars", "20 chars", "50 chars", "100 chars"], correct: 1 },
    { q: "How many strikes result in account suspension?", options: ["1", "2", "3", "5"], correct: 2 },
    { q: "What is the admin SLA for dispute resolution?", options: ["24 hours", "48 hours", "72 hours", "1 week"], correct: 2 },
    { q: "Which of these helps prevent disputes?", options: ["Submitting without photos", "Documenting job address and date", "Filing disputes frequently", "Ignoring homeowner feedback"], correct: 1 },
    { q: "Can you appeal a strike?", options: ["No, strikes are permanent", "Yes, within 72 hours", "Yes, within 30 days", "Only Enterprise partners can appeal"], correct: 1 },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function TrainingHub() {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [quizMode, setQuizMode] = useState(false);

  const { data: myEnrollments } = trpc.partnerTools.training.myEnrollments.useQuery();
  const enrollMutation = trpc.partnerTools.training.enroll.useMutation();
  const progressMutation = trpc.partnerTools.training.updateProgress.useMutation();

  useEffect(() => {
    if (myEnrollments) {
      const mods = new Set<number>();
      myEnrollments.forEach(e => {
        // courseId is stored as string like "module-1"
        const moduleId = parseInt(e.courseId.replace("module-", ""), 10);
        if (e.status === "completed" && !isNaN(moduleId)) mods.add(moduleId);
      });
      setCompletedModules(mods);
    }
  }, [myEnrollments]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"library" | "certifications">("library");

  const module = MODULES.find(m => m.id === activeModule);
  const lesson = module?.lessons.find(l => l.id === activeLesson);

  const completeLesson = (lessonId: number) => {
    const next = new Set(completedLessons);
    next.add(lessonId);
    setCompletedLessons(next);
    if (module) {
      const allDone = module.lessons.every(l => next.has(l.id));
      if (allDone) {
        const mods = new Set(completedModules);
        mods.add(module.id);
        setCompletedModules(mods);
        toast.success(`🏆 Module complete! You earned the "${module.badge}" badge.`);
      }
    }
    setActiveLesson(null);
    setQuizMode(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const submitQuiz = (moduleId: number) => {
    const questions = QUIZ_QUESTIONS[moduleId] ?? [];
    if (questions.length === 0) { completeLesson(activeLesson!); return; }
    const correct = questions.filter((q, i) => quizAnswers[i] === q.correct).length;
    const pct = Math.round((correct / questions.length) * 100);
    setQuizSubmitted(true);
    if (pct >= 80) {
      toast.success(`Quiz passed! ${correct}/${questions.length} correct (${pct}%)`);
    } else {
      toast.error(`${correct}/${questions.length} correct (${pct}%). Need 80% to pass — try again!`);
    }
  };

  const totalLessons = MODULES.flatMap(m => m.lessons).length;
  const earnedBadges = MODULES.filter(m => completedModules.has(m.id));

  // ── Quiz view ──────────────────────────────────────────────────────────────
  if (quizMode && lesson && module) {
    const questions = QUIZ_QUESTIONS[lesson.id] ?? [];
    return (
      <PartnerLayout>
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => { setQuizMode(false); setQuizSubmitted(false); setQuizAnswers({}); }} className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1">
              ← Back
            </button>
            <span className="text-muted-foreground text-sm">/</span>
            <span className="text-sm font-medium">{lesson.title}</span>
          </div>
          <div className="bg-card border rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-primary" />
              <div>
                <h2 className="font-bold text-foreground">{lesson.title}</h2>
                <p className="text-xs text-muted-foreground">{questions.length} questions · Pass score: 80%</p>
              </div>
            </div>
            {questions.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-semibold">No questions for this quiz yet.</p>
                <Button className="mt-4" onClick={() => completeLesson(activeLesson!)}>Mark Complete</Button>
              </div>
            ) : (
              <div className="space-y-5">
                {questions.map((q, qi) => (
                  <div key={qi} className="space-y-2">
                    <p className="text-sm font-medium text-foreground">{qi + 1}. {q.q}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, oi) => {
                        const selected = quizAnswers[qi] === oi;
                        const isCorrect = quizSubmitted && oi === q.correct;
                        const isWrong = quizSubmitted && selected && oi !== q.correct;
                        return (
                          <button
                            key={oi}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                            className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                              isCorrect ? "bg-green-50 border-green-400 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                              : isWrong ? "bg-red-50 border-red-400 text-red-800 dark:bg-red-950/30 dark:text-red-300"
                              : selected ? "bg-primary/10 border-primary text-primary"
                              : "bg-background border-border hover:border-primary/50"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {!quizSubmitted ? (
                  <Button
                    className="w-full"
                    disabled={Object.keys(quizAnswers).length < questions.length}
                    onClick={() => submitQuiz(lesson.id)}
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    {(() => {
                      const correct = questions.filter((q, i) => quizAnswers[i] === q.correct).length;
                      const pct = Math.round((correct / questions.length) * 100);
                      return pct >= 80 ? (
                        <Button className="flex-1" onClick={() => completeLesson(activeLesson!)}>
                          <CheckCircle className="w-4 h-4 mr-2" /> Complete Lesson
                        </Button>
                      ) : (
                        <Button className="flex-1" variant="outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>
                          Retry Quiz
                        </Button>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </PartnerLayout>
    );
  }

  // ── Lesson view ────────────────────────────────────────────────────────────
  if (activeLesson && lesson && module) {
    return (
      <PartnerLayout>
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => setActiveLesson(null)} className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1">
              ← {module.title}
            </button>
          </div>
          <div className="bg-card border rounded-xl overflow-hidden">
            {lesson.type === "video" ? (
              <>
                <div className="aspect-video bg-gradient-to-br from-[#0A1628] to-[#0d2040] flex flex-col items-center justify-center gap-4">
                  <PlayCircle className="w-16 h-16 text-[#00B5B8] opacity-80" />
                  <p className="text-white/60 text-sm">{lesson.title}</p>
                  <p className="text-white/40 text-xs">{lesson.duration} · Video lesson</p>
                </div>
                <div className="p-5 space-y-4">
                  <h2 className="font-bold text-foreground text-lg">{lesson.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    This lesson covers the key concepts from the {module.title} module.
                    Watch the full video to mark it complete and unlock the next lesson.
                  </p>
                  <Button className="w-full" onClick={() => completeLesson(lesson.id)}>
                    <CheckCircle className="w-4 h-4 mr-2" /> Mark as Complete
                  </Button>
                </div>
              </>
            ) : (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  <div>
                    <h2 className="font-bold text-foreground">{lesson.title}</h2>
                    <p className="text-xs text-muted-foreground">{(lesson as any).questions} questions · Pass score: 80%</p>
                  </div>
                </div>
                <Button className="w-full" onClick={() => setQuizMode(true)}>
                  Start Quiz <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </PartnerLayout>
    );
  }

  // ── Module view ────────────────────────────────────────────────────────────
  if (activeModule && module) {
    const moduleProgress = module.lessons.filter(l => completedLessons.has(l.id)).length;
    return (
      <PartnerLayout>
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          <button onClick={() => setActiveModule(null)} className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1">
            ← Training Hub
          </button>
          <div className="bg-card border rounded-xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge className={`text-xs border ${module.badgeColor} mb-2`}>{module.category}</Badge>
                <h2 className="font-bold text-foreground text-xl">{module.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
              </div>
              {completedModules.has(module.id) && (
                <div className="flex flex-col items-center gap-1">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <span className="text-[10px] text-yellow-600 font-semibold">Certified</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {module.duration}</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {module.lessons.length} lessons</span>
              <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> Earns: {module.badge}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-[#00B5B8] h-2 rounded-full transition-all"
                style={{ width: `${(moduleProgress / module.lessons.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{moduleProgress}/{module.lessons.length} lessons complete</p>
          </div>
          <div className="space-y-2">
            {module.lessons.map((lesson, idx) => {
              const done = completedLessons.has(lesson.id);
              const prevDone = idx === 0 || completedLessons.has(module.lessons[idx - 1].id);
              return (
                <button
                  key={lesson.id}
                  disabled={!prevDone && !done}
                  onClick={() => setActiveLesson(lesson.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-colors ${
                    done ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                    : prevDone ? "bg-card border-border hover:border-primary/50 cursor-pointer"
                    : "bg-muted/30 border-border opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    done ? "bg-green-100 dark:bg-green-900" : "bg-muted"
                  }`}>
                    {done ? <CheckCircle className="w-4 h-4 text-green-600" />
                    : !prevDone ? <Lock className="w-4 h-4 text-muted-foreground" />
                    : lesson.type === "quiz" ? <Target className="w-4 h-4 text-primary" />
                    : <PlayCircle className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {lesson.duration} · {lesson.type === "quiz" ? `${(lesson as any).questions} questions` : "Video"}
                    </p>
                  </div>
                  {!done && prevDone && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </button>
              );
            })}
          </div>
        </div>
      </PartnerLayout>
    );
  }

  // ── Library / Certifications view ─────────────────────────────────────────
  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Training Hub</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Complete modules to earn certifications and unlock higher tier opportunities.
          </p>
        </div>

        {/* Progress summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Lessons Done", value: completedLessons.size, total: totalLessons, icon: CheckCircle, color: "text-green-500" },
            { label: "Certifications", value: earnedBadges.length, total: MODULES.length, icon: Award, color: "text-yellow-500" },
            { label: "Completion", value: `${Math.round((completedLessons.size / totalLessons) * 100)}%`, total: null, icon: Zap, color: "text-[#00B5B8]" },
          ].map(stat => (
            <div key={stat.label} className="bg-card border rounded-xl p-4 text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-xl font-bold text-foreground">{stat.value}{stat.total ? `/${stat.total}` : ""}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit">
          {(["library", "certifications"] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                activeTab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Library */}
        {activeTab === "library" && (
          <div className="space-y-3">
            {MODULES.map(mod => {
              const done = completedModules.has(mod.id);
              const progress = mod.lessons.filter(l => completedLessons.has(l.id)).length;
              return (
                <button
                  key={mod.id}
                  disabled={mod.locked}
                  onClick={() => setActiveModule(mod.id)}
                  className={`w-full text-left bg-card border rounded-xl p-5 hover:border-primary/50 transition-colors ${mod.locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`text-[10px] border ${mod.badgeColor}`}>{mod.category}</Badge>
                        {done && <Badge className="text-[10px] bg-green-100 text-green-800 border-green-200">Certified</Badge>}
                        {mod.locked && <Badge className="text-[10px] bg-muted text-muted-foreground border-border"><Lock className="w-2.5 h-2.5 mr-1" />Locked</Badge>}
                      </div>
                      <h3 className="font-semibold text-foreground">{mod.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{mod.description}</p>
                    </div>
                    {done ? (
                      <Award className="w-8 h-8 text-yellow-500 flex-shrink-0 ml-3" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-3 mt-1" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{mod.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{mod.lessons.length} lessons</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" />Earns: {mod.badge}</span>
                  </div>
                  {!mod.locked && (
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-[#00B5B8] h-1.5 rounded-full transition-all"
                        style={{ width: `${(progress / mod.lessons.length) * 100}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Certifications */}
        {activeTab === "certifications" && (
          <div className="space-y-4">
            {MODULES.map(mod => {
              const earned = completedModules.has(mod.id);
              return (
                <div key={mod.id} className={`bg-card border rounded-xl p-5 flex items-center gap-4 ${!earned ? "opacity-50" : ""}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${earned ? "bg-yellow-50 dark:bg-yellow-950/30" : "bg-muted"}`}>
                    <Award className={`w-7 h-7 ${earned ? "text-yellow-500" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{mod.badge}</p>
                    <p className="text-xs text-muted-foreground">{mod.title}</p>
                    {earned ? (
                      <Badge className="mt-1 text-[10px] bg-green-100 text-green-800 border-green-200">Earned</Badge>
                    ) : (
                      <Badge className="mt-1 text-[10px] bg-muted text-muted-foreground border-border">Not yet earned</Badge>
                    )}
                  </div>
                  {!earned && (
                    <Button size="sm" variant="outline" onClick={() => setActiveModule(mod.id)}>
                      Start <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
