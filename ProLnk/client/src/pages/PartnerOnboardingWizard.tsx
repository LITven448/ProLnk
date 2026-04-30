/**
 * Partner Onboarding Wizard
 * Route: /dashboard/onboarding
 * 7-step guided setup for newly approved partners.
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  User, MapPin, Shield, Users, CreditCard, Zap, Camera,
  CheckCircle, ChevronRight, ChevronLeft,
} from "lucide-react";

const STEPS = [
  { id: "profile", title: "Complete Your Profile", icon: <User className="w-5 h-5" />, description: "Add your business details and contact information" },
  { id: "service-area", title: "Set Service Area", icon: <MapPin className="w-5 h-5" />, description: "Define the ZIP codes you serve" },
  { id: "briefcase", title: "Initialize Briefcase", icon: <Shield className="w-5 h-5" />, description: "Set up your company credential portfolio" },
  { id: "pro-passes", title: "Add Team Members", icon: <Users className="w-5 h-5" />, description: "Create Pro Passes for your technicians" },
  { id: "stripe-connect", title: "Set Up Payouts", icon: <CreditCard className="w-5 h-5" />, description: "Connect your bank account to receive commissions" },
  { id: "fsm", title: "Connect Your Software", icon: <Zap className="w-5 h-5" />, description: "Link CompanyCam, Jobber, or other tools (optional)" },
  { id: "first-photo", title: "Log Your First Job", icon: <Camera className="w-5 h-5" />, description: "Take before & after photos on your next job" },
];

export default function PartnerOnboardingWizard() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const initBriefcase = trpc.briefcase.initializeBriefcase.useMutation({
    onSuccess: () => {
      markComplete("briefcase");
      toast.success("Briefcase created!");
    },
    onError: (e) => toast.error(e.message),
  });

  const createConnectLink = trpc.payments.createConnectOnboardingLink.useMutation({
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
    onError: (e) => toast.error(e.message),
  });

  const markComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const step = STEPS[currentStep];
  const allCompleted = completedSteps.size >= STEPS.length - 1; // FSM is optional

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">Welcome to ProLnk!</h1>
          <p className="text-gray-400">Complete these steps to start earning commissions</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setCurrentStep(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  completedSteps.has(s.id) ? "bg-green-500 text-white" :
                  i === currentStep ? "bg-teal-500 text-white" :
                  "bg-gray-700 text-gray-400"
                }`}
              >
                {completedSteps.has(s.id) ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </button>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-8 ${i < currentStep ? "bg-teal-500" : "bg-gray-700"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Current step card */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-teal-400">{step.icon}</div>
            <h2 className="text-xl font-bold text-white">{step.title}</h2>
            {completedSteps.has(step.id) && <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />}
          </div>
          <p className="text-gray-400 text-sm mb-6">{step.description}</p>

          {/* Step-specific content */}
          {step.id === "profile" && (
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Your profile is created from your application. Update it anytime in Settings → Profile.</p>
              <Button className="w-full bg-teal-500 hover:bg-teal-400 text-white" onClick={() => navigate("/dashboard/profile")}>
                Edit My Profile
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300" onClick={() => markComplete("profile")}>
                Looks good, continue →
              </Button>
            </div>
          )}

          {step.id === "service-area" && (
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Add the ZIP codes where you work. This determines which leads you receive.</p>
              <Button className="w-full bg-teal-500 hover:bg-teal-400 text-white" onClick={() => navigate("/dashboard/service-area")}>
                Set Service Area ZIP Codes
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300" onClick={() => markComplete("service-area")}>
                Done, continue →
              </Button>
            </div>
          )}

          {step.id === "briefcase" && (
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Your Briefcase holds your company credentials — insurance, license, W-9. Higher score = more leads.</p>
              <Button
                className="w-full bg-teal-500 hover:bg-teal-400 text-white"
                onClick={() => initBriefcase.mutate()}
                disabled={initBriefcase.isPending || completedSteps.has("briefcase")}
              >
                {completedSteps.has("briefcase") ? "✓ Briefcase Created" : "Initialize My Briefcase"}
              </Button>
              {completedSteps.has("briefcase") && (
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white" onClick={() => navigate("/dashboard/briefcase")}>
                  Upload Documents →
                </Button>
              )}
            </div>
          )}

          {step.id === "pro-passes" && (
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Add Pro Passes for your technicians. They'll carry digital credentials for site access and background check status.</p>
              <Button className="w-full bg-teal-500 hover:bg-teal-400 text-white" onClick={() => navigate("/dashboard/pro-passes")}>
                Add Team Members
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300" onClick={() => markComplete("pro-passes")}>
                Skip for now →
              </Button>
            </div>
          )}

          {step.id === "stripe-connect" && (
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Connect your bank account through Stripe to receive commission payouts. Secure and takes about 5 minutes.</p>
              <Button
                className="w-full bg-teal-500 hover:bg-teal-400 text-white"
                onClick={() => createConnectLink.mutate({ origin: window.location.origin })}
                disabled={createConnectLink.isPending}
              >
                {createConnectLink.isPending ? "Opening Stripe..." : "Connect My Bank Account"}
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300" onClick={() => markComplete("stripe-connect")}>
                Do this later →
              </Button>
            </div>
          )}

          {step.id === "fsm" && (
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Connect your field service software to automatically sync job photos. This is optional but makes everything hands-free.</p>
              <div className="grid grid-cols-2 gap-2">
                {["CompanyCam", "Jobber", "Housecall Pro", "ServiceTitan"].map(tool => (
                  <button key={tool} className="bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl py-3 px-4 text-sm font-semibold transition-all">
                    Connect {tool}
                  </button>
                ))}
              </div>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300" onClick={() => markComplete("fsm")}>
                Skip for now →
              </Button>
            </div>
          )}

          {step.id === "first-photo" && (
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">On your next job, take before & after photos and log them through the Field App. The AI detects opportunities for you automatically.</p>
              <Button className="w-full bg-teal-500 hover:bg-teal-400 text-white" onClick={() => navigate("/field-app")}>
                Open Field App
              </Button>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white" onClick={() => { markComplete("first-photo"); navigate("/dashboard"); }}>
                Go to My Dashboard →
              </Button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button variant="outline" className="border-gray-700 text-gray-400" onClick={() => setCurrentStep(p => p - 1)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          )}
          {currentStep < STEPS.length - 1 && (
            <Button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white" onClick={() => setCurrentStep(p => p + 1)}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
          {allCompleted && (
            <Button className="flex-1 bg-teal-500 hover:bg-teal-400 text-white font-bold" onClick={() => navigate("/dashboard")}>
              Go to Dashboard →
            </Button>
          )}
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">
          You can complete these steps anytime from your Settings menu
        </p>
      </div>
    </div>
  );
}
