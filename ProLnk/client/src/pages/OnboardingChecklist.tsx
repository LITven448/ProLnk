import { useState, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  CheckCircle, Circle, ChevronRight, Zap, DollarSign,
  Users, Star, Shield, BookOpen, CreditCard, Bell, ArrowRight
} from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  cta: string;
  href: string;
  points: number;
  category: "setup" | "earn" | "grow";
}

const CHECKLIST: ChecklistItem[] = [
  {
    id: "profile",
    title: "Complete your business profile",
    description: "Add your logo, service areas, and bio to build trust with homeowners",
    icon: Shield,
    color: "#6366F1",
    bg: "#EEF2FF",
    cta: "Edit Profile",
    href: "/dashboard/profile",
    points: 100,
    category: "setup",
  },
  {
    id: "payout",
    title: "Set up your payout account",
    description: "Connect Stripe to receive commission payments directly to your bank",
    icon: CreditCard,
    color: "#10B981",
    bg: "#D1FAE5",
    cta: "Set Up Payouts",
    href: "/dashboard/payout-setup",
    points: 200,
    category: "setup",
  },
  {
    id: "notifications",
    title: "Configure notifications",
    description: "Turn on lead alerts so you never miss a new opportunity",
    icon: Bell,
    color: "#F59E0B",
    bg: "#FEF3C7",
    cta: "Set Notifications",
    href: "/dashboard/notifications",
    points: 50,
    category: "setup",
  },
  {
    id: "first_lead",
    title: "Accept your first lead",
    description: "Browse available opportunities and accept one to get started",
    icon: Zap,
    color: "#EC4899",
    bg: "#FCE7F3",
    cta: "View Leads",
    href: "/dashboard/leads",
    points: 300,
    category: "earn",
  },
  {
    id: "referral",
    title: "Refer your first partner",
    description: "Invite a fellow contractor to join and earn referral commissions",
    icon: Users,
    color: "#0EA5E9",
    bg: "#E0F2FE",
    cta: "Get Referral Link",
    href: "/dashboard/referral",
    points: 250,
    category: "grow",
  },
  {
    id: "academy",
    title: "Complete the ProLnk Academy",
    description: "Learn best practices for maximizing your earnings on the platform",
    icon: BookOpen,
    color: "#8B5CF6",
    bg: "#EDE9FE",
    cta: "Start Academy",
    href: "/dashboard/academy",
    points: 150,
    category: "grow",
  },
  {
    id: "first_commission",
    title: "Earn your first commission",
    description: "Complete a job and watch your first commission hit your account",
    icon: DollarSign,
    color: "#16A34A",
    bg: "#DCFCE7",
    cta: "View Earnings",
    href: "/dashboard/earnings",
    points: 500,
    category: "earn",
  },
  {
    id: "review",
    title: "Get your first homeowner review",
    description: "Ask a satisfied homeowner to leave you a 5-star review",
    icon: Star,
    color: "#EAB308",
    bg: "#FEF9C3",
    cta: "View Reviews",
    href: "/dashboard/reviews",
    points: 200,
    category: "grow",
  },
];

const CATEGORY_LABELS = { setup: "Account Setup", earn: "Start Earning", grow: "Grow Your Network" };
const CATEGORY_COLORS = { setup: "#6366F1", earn: "#10B981", grow: "#0EA5E9" };

export default function OnboardingChecklist() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [, setLocation] = useLocation();

  const { data: savedProgress } = trpc.partnerTools.onboarding.get.useQuery();
  const updateMutation = trpc.partnerTools.onboarding.update.useMutation();

  // Map boolean columns to checklist item IDs
  const FIELD_MAP: Record<string, string> = {
    profile: "profileComplete",
    payout: "payoutConnected",
    first_lead: "firstReferralSent",
    academy: "trainingComplete",
    review: "agreementSigned",
  };

  useEffect(() => {
    if (savedProgress) {
      const done = new Set<string>();
      if (savedProgress.profileComplete) done.add("profile");
      if (savedProgress.payoutConnected) done.add("payout");
      if (savedProgress.firstReferralSent) done.add("first_lead");
      if (savedProgress.trainingComplete) done.add("academy");
      if (savedProgress.agreementSigned) done.add("review");
      setCompleted(done);
    }
  }, [savedProgress]);

  const toggle = (id: string) => {
    const isCurrentlyDone = completed.has(id);
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        const item = CHECKLIST.find(c => c.id === id);
        if (item) toast.success(`+${item.points} points! "${item.title}" completed`);
      }
      return next;
    });
    const field = FIELD_MAP[id];
    if (field) updateMutation.mutate({ [field]: !isCurrentlyDone } as Record<string, boolean>);
  };

  const totalPoints = CHECKLIST.reduce((sum, item) => sum + (completed.has(item.id) ? item.points : 0), 0);
  const maxPoints = CHECKLIST.reduce((sum, item) => sum + item.points, 0);
  const progress = Math.round((completed.size / CHECKLIST.length) * 100);

  const categories = ["setup", "earn", "grow"] as const;

  return (
    <PartnerLayout>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Onboarding Checklist</h1>
          <p className="text-sm text-gray-500 mt-1">Complete these steps to unlock your full earning potential on ProLnk</p>
        </div>

        {/* Progress Card */}
        <Card className="border-0" style={{ background: "linear-gradient(135deg, #0A1628, #1e3a5f)" }}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white/70 text-xs font-medium">Overall Progress</p>
                <p className="text-white text-2xl font-bold">{progress}%</p>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-xs font-medium">Points Earned</p>
                <p className="text-[#F5E642] text-2xl font-bold">{totalPoints.toLocaleString()}</p>
                <p className="text-white/50 text-xs">of {maxPoints.toLocaleString()} possible</p>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
            <div className="flex justify-between mt-2">
              <span className="text-white/50 text-xs">{completed.size} of {CHECKLIST.length} completed</span>
              {progress === 100 && (
                <Badge className="bg-[#F5E642] text-[#0A1628] text-xs font-bold">🎉 All Done!</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Checklist by Category */}
        {categories.map(category => {
          const items = CHECKLIST.filter(i => i.category === category);
          const categoryCompleted = items.filter(i => completed.has(i.id)).length;
          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700">{CATEGORY_LABELS[category]}</h2>
                <span className="text-xs text-gray-400">{categoryCompleted}/{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map(item => {
                  const done = completed.has(item.id);
                  return (
                    <Card key={item.id} className={`border transition-all ${done ? "opacity-60" : "hover:shadow-sm"}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggle(item.id)}
                            className="flex-shrink-0 transition-transform hover:scale-110"
                          >
                            {done ? (
                              <CheckCircle className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300" />
                            )}
                          </button>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.bg }}>
                            <item.icon className="w-4 h-4" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm font-medium ${done ? "line-through text-gray-400" : "text-gray-900"}`}>
                                {item.title}
                              </p>
                              <Badge variant="outline" className="text-xs flex-shrink-0" style={{ borderColor: item.color, color: item.color }}>
                                +{item.points}pts
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                          </div>
                          {!done && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-shrink-0 text-xs"
                              onClick={() => setLocation(item.href)}
                            >
                              {item.cta}
                              <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Completion CTA */}
        {progress === 100 ? (
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="p-5 text-center">
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-emerald-800 font-bold text-lg">You're fully onboarded!</p>
              <p className="text-emerald-600 text-sm mt-1">You've earned {totalPoints.toLocaleString()} points and unlocked all partner features.</p>
              <Button className="mt-4" onClick={() => setLocation("/dashboard")}>
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-gray-100 bg-gray-50">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600">
                Complete all steps to earn <span className="font-bold text-gray-900">{maxPoints.toLocaleString()} points</span> and unlock <span className="font-bold text-indigo-600">Silver Partner status</span>
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PartnerLayout>
  );
}
