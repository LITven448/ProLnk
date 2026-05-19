import { useState, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, BookOpen, Clock, Star, TrendingUp, CheckCircle, Lock, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const COURSES = [
  {
    id: 1,
    title: "ProLnk Certified Partner",
    category: "Core",
    provider: "ProLnk Academy",
    duration: "2 hours",
    level: "Beginner",
    badge: "🏅",
    description: "Master the ProLnk platform: lead management, check-in system, commission tracking, and homeowner communication best practices.",
    outcomes: ["Platform navigation", "Lead response protocol", "Commission maximization", "5-star review strategy"],
    enrolled: 312,
    rating: 4.9,
    free: true,
    completed: true,
  },
  {
    id: 2,
    title: "Insurance Claim Specialist",
    category: "Specialty",
    provider: "ProLnk Academy",
    duration: "4 hours",
    level: "Intermediate",
    badge: "🛡️",
    description: "Learn how to work with insurance adjusters, document storm damage, and close insurance-funded jobs at 3x the average ticket.",
    outcomes: ["Xactimate basics", "Adjuster communication", "Supplement strategy", "ACH authorization process"],
    enrolled: 147,
    rating: 4.8,
    free: false,
    completed: false,
    price: "$49",
  },
  {
    id: 3,
    title: "5-Star Review Playbook",
    category: "Sales",
    provider: "ProLnk Academy",
    duration: "1 hour",
    level: "Beginner",
    badge: "⭐",
    description: "A proven system for generating 5-star reviews on every job. Includes scripts, timing strategies, and follow-up templates.",
    outcomes: ["Review request timing", "Text scripts", "Handling negative feedback", "Google Business optimization"],
    enrolled: 289,
    rating: 4.9,
    free: true,
    completed: false,
  },
  {
    id: 4,
    title: "Upsell Mastery: Reading the Property",
    category: "Sales",
    provider: "ProLnk Academy",
    duration: "3 hours",
    level: "Intermediate",
    badge: "💰",
    description: "Train your eye to spot cross-sell opportunities on every job. The same skill set our top partners use to earn 40% more per visit.",
    outcomes: ["Visual opportunity scanning", "Soft offer scripts", "Referral timing", "Commission stacking"],
    enrolled: 198,
    rating: 4.7,
    free: false,
    completed: false,
    price: "$39",
  },
  {
    id: 5,
    title: "Platinum Partner Accelerator",
    category: "Growth",
    provider: "ProLnk Academy",
    duration: "6 hours",
    level: "Advanced",
    badge: "💎",
    description: "The complete playbook for reaching Platinum tier. Covers team building, territory expansion, and building a referral engine.",
    outcomes: ["Tier advancement strategy", "Team onboarding", "Territory mapping", "Referral network building"],
    enrolled: 89,
    rating: 5.0,
    free: false,
    completed: false,
    price: "$99",
    platinumOnly: false,
  },
  {
    id: 6,
    title: "Digital Marketing for Home Service Pros",
    category: "Marketing",
    provider: "ProLnk Academy",
    duration: "3 hours",
    level: "Intermediate",
    badge: "📱",
    description: "Build your personal brand and generate inbound leads outside of ProLnk. Google Business, Facebook, Nextdoor, and more.",
    outcomes: ["Google Business setup", "Facebook ads basics", "Nextdoor strategy", "Before/after content"],
    enrolled: 156,
    rating: 4.6,
    free: false,
    completed: false,
    price: "$29",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Core: "bg-indigo-100 text-indigo-700",
  Specialty: "bg-violet-100 text-violet-700",
  Sales: "bg-green-100 text-green-700",
  Growth: "bg-amber-100 text-amber-700",
  Marketing: "bg-blue-100 text-blue-700",
};

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "bg-green-50 text-green-600",
  Intermediate: "bg-amber-50 text-amber-600",
  Advanced: "bg-red-50 text-red-600",
};

export default function SkillsMarketplace() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [enrolledIds, setEnrolledIds] = useState<Set<number>>(new Set(COURSES.filter(c => c.completed).map(c => c.id)));

  const { data: mySkills } = trpc.partnerTools.skills.mySkills.useQuery();
  const enrollMutation = trpc.partnerTools.skills.enroll.useMutation({
    onError: (err) => toast.error(`Enrollment failed: ${err.message}`),
  });

  useEffect(() => {
    if (mySkills) {
      const ids = new Set(Array.from(enrolledIds));
      mySkills
        .filter(s => s.status === "active")
        .forEach(s => {
          const course = COURSES.find(c => c.title === s.skillName);
          if (course) ids.add(course.id);
        });
      setEnrolledIds(ids);
    }
  }, [mySkills]);

  const categories = ["All", "Core", "Specialty", "Sales", "Growth", "Marketing"];
  const filtered = COURSES.filter(c => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "All" && c.category !== category) return false;
    return true;
  });

  const completedCount = enrolledIds.size;

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">ProLnk Academy</h1>
          <p className="text-slate-500 mt-1">Earn certifications that unlock higher tiers, better leads, and more commissions</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6 bg-gradient-to-r from-indigo-600 to-violet-600 border-0">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-white font-bold text-lg">{completedCount} of {COURSES.length} courses completed</div>
                <div className="text-indigo-200 text-sm">Complete 3 more to unlock Gold tier benefits</div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-2xl">{Math.round((completedCount / COURSES.length) * 100)}%</div>
                <div className="text-indigo-200 text-xs">Complete</div>
              </div>
            </div>
            <div className="h-2 bg-indigo-500/40 rounded-full">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${(completedCount / COURSES.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  category === cat ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border hover:border-indigo-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(course => (
            <Card key={course.id} className={`relative ${enrolledIds.has(course.id) ? "border-green-200 bg-green-50/30" : ""}`}>
              {enrolledIds.has(course.id) && (
                <div className="absolute top-3 right-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
              <CardContent className="pt-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">{course.badge}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">{course.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <Badge className={`text-xs ${CATEGORY_COLORS[course.category]}`}>{course.category}</Badge>
                      <Badge className={`text-xs ${LEVEL_COLORS[course.level]}`}>{course.level}</Badge>
                      {course.free && <Badge className="text-xs bg-green-100 text-green-700">Free</Badge>}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-3 leading-relaxed">{course.description}</p>

                <div className="space-y-1 mb-3">
                  {course.outcomes.slice(0, 3).map(o => (
                    <div key={o} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      {o}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{course.rating}</span>
                    <span>{course.enrolled} enrolled</span>
                  </div>
                  <Button
                    size="sm"
                    className={`text-xs ${enrolledIds.has(course.id) ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
                    onClick={() => {
                      if (enrolledIds.has(course.id)) { toast.success("Certificate downloaded!"); return; }
                      if (!course.free) { toast.info(`Redirecting to checkout for ${course.title} — ${course.price}`); return; }
                      setEnrolledIds(prev => new Set(Array.from(prev).concat(course.id)));
                      enrollMutation.mutate({ skillId: String(course.id), skillName: course.title, price: "Free" });
                      toast.success(`Enrolled in ${course.title}! Check your email for access.`);
                    }}
                  >
                    {enrolledIds.has(course.id) ? "Download Certificate" : course.free ? "Enroll Free" : `Enroll ${course.price}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
