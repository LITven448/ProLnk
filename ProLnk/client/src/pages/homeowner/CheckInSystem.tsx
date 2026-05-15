import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  ClipboardCheck, CheckCircle, Circle, Phone, MessageSquare,
  AlertTriangle, Star, Camera, Clock, ChevronDown, ChevronUp,
} from "lucide-react";

const STEPS = ["Scheduled", "Started", "Midpoint Check", "Complete"] as const;
type Step = typeof STEPS[number];

const PRO_UPDATES = [
  {
    id: 1,
    time: "9:14 AM",
    text: "Arrived on site. Beginning system assessment and refrigerant check.",
    hasPhoto: true,
  },
  {
    id: 2,
    time: "10:32 AM",
    text: "Old unit removed. New HVAC unit staged and ready for installation.",
    hasPhoto: true,
  },
  {
    id: 3,
    time: "12:05 PM",
    text: "Installation 60% complete. Ductwork connected. Electrical wiring in progress.",
    hasPhoto: false,
  },
];

function Countdown({ target }: { target: Date }) {
  const [remaining, setRemaining] = useState({ h: 0, m: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setRemaining({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000) });
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <span className="font-mono text-teal-400 font-bold">
      {remaining.h}h {remaining.m}m
    </span>
  );
}

export default function CheckInSystem() {
  const [arrived, setArrived] = useState<"yes" | "no" | "not_yet" | null>(null);
  const [accessible, setAccessible] = useState<boolean | null>(null);
  const [concern, setConcern] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [issueText, setIssueText] = useState("");
  const [issueSent, setIssueSent] = useState(false);

  const currentStep: Step = "Started";
  const currentStepIdx = STEPS.indexOf(currentStep);

  const estCompletion = new Date();
  estCompletion.setHours(16, 30, 0, 0);

  const handleSubmit = () => {
    if (arrived === null) {
      toast.error("Please indicate if the pro has arrived");
      return;
    }
    setSubmitted(true);
    toast.success("Check-in submitted — thanks!");
  };

  const handleIssue = () => {
    if (!issueText.trim()) {
      toast.error("Please describe the issue");
      return;
    }
    setIssueSent(true);
    toast.success("Issue reported. We'll follow up shortly.");
  };

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ClipboardCheck className="w-5 h-5 text-teal-400" />
              <span className="text-gray-400 text-sm">Active Job Check-In</span>
            </div>
            <h1 className="text-xl font-black text-white leading-tight">
              HVAC Replacement
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">Johnson HVAC Services</p>
          </div>
          <Badge className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs">
            In Progress
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#0F1E35] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, i) => {
              const done = i < currentStepIdx;
              const active = i === currentStepIdx;
              return (
                <div key={step} className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                    ${done ? "bg-teal-500 text-white" : active ? "bg-teal-400 text-white ring-4 ring-teal-400/30" : "bg-gray-700 text-gray-500"}`}>
                    {done ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </div>
                  <span className={`text-[10px] text-center leading-tight ${active ? "text-teal-300 font-semibold" : done ? "text-gray-400" : "text-gray-600"}`}>
                    {step}
                  </span>
                  {active && <span className="text-[10px] text-gray-500">9:14 AM</span>}
                </div>
              );
            })}
          </div>
          <div className="relative h-1.5 bg-gray-700 rounded-full">
            <div className="absolute h-full bg-teal-400 rounded-full transition-all"
              style={{ width: `${((currentStepIdx) / (STEPS.length - 1)) * 100}%` }} />
          </div>
        </div>

        {/* Estimated completion + countdown */}
        <div className="flex items-center justify-between bg-[#0F1E35] border border-white/10 rounded-2xl px-5 py-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-400" />
            <span className="text-gray-300 text-sm">Est. completion: <span className="text-white font-semibold">4:30 PM today</span></span>
          </div>
          <div className="text-sm text-gray-400">
            <Countdown target={estCompletion} /> remaining
          </div>
        </div>

        {/* Check-in Form */}
        {!submitted ? (
          <div className="bg-[#0F1E35] border border-white/10 rounded-2xl p-5 space-y-5">
            <h2 className="text-white font-bold text-base">Your Check-In</h2>

            {/* Q1 */}
            <div className="space-y-2">
              <p className="text-gray-300 text-sm font-medium">Has the pro arrived?</p>
              <div className="flex gap-2">
                {(["yes", "not_yet", "no"] as const).map(opt => (
                  <button key={opt} onClick={() => setArrived(opt)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all
                      ${arrived === opt
                        ? opt === "yes" ? "bg-teal-500 border-teal-400 text-white"
                          : opt === "no" ? "bg-red-500/30 border-red-400 text-red-300"
                          : "bg-amber-500/20 border-amber-400 text-amber-300"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"}`}>
                    {opt === "yes" ? "Yes" : opt === "no" ? "No" : "Not Yet"}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-2">
              <p className="text-gray-300 text-sm font-medium">Work area accessible?</p>
              <div className="flex gap-2">
                {([true, false] as const).map(opt => (
                  <button key={String(opt)} onClick={() => setAccessible(opt)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all
                      ${accessible === opt
                        ? opt ? "bg-teal-500 border-teal-400 text-white" : "bg-red-500/30 border-red-400 text-red-300"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"}`}>
                    {opt ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3 */}
            <div className="space-y-2">
              <p className="text-gray-300 text-sm font-medium">Any concerns? <span className="text-gray-500">(optional)</span></p>
              <Textarea value={concern} onChange={e => setConcern(e.target.value)}
                placeholder="Describe any issues or questions..."
                className="bg-white/5 border-white/10 text-white placeholder-gray-600 resize-none text-sm rounded-xl focus:border-teal-500" rows={3} />
            </div>

            {/* Q4 */}
            <div className="space-y-2">
              <p className="text-gray-300 text-sm font-medium">Rate current progress</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onMouseEnter={() => setHoverRating(n)} onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(n)}
                    className={`transition-transform hover:scale-110 ${(hoverRating || rating) >= n ? "text-yellow-400" : "text-gray-600"}`}>
                    <Star className="w-7 h-7 fill-current" />
                  </button>
                ))}
                {rating > 0 && <span className="text-gray-400 text-sm self-center ml-1">{["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}</span>}
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl">
              Submit Check-In
            </Button>
          </div>
        ) : (
          <div className="bg-teal-900/30 border border-teal-500/40 rounded-2xl p-6 text-center space-y-2">
            <CheckCircle className="w-10 h-10 text-teal-400 mx-auto" />
            <p className="text-white font-bold">Check-in submitted!</p>
            <p className="text-gray-400 text-sm">We&apos;ll notify you when the job moves to the next stage.</p>
          </div>
        )}

        {/* Pro Updates */}
        <div className="bg-[#0F1E35] border border-white/10 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-bold text-base">Updates from Pro</h2>
          <div className="space-y-4">
            {PRO_UPDATES.map((u, i) => (
              <div key={u.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  {i < PRO_UPDATES.length - 1 && <div className="w-0.5 flex-1 bg-gray-700 mt-1" />}
                </div>
                <div className="pb-4 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-teal-300 text-xs font-semibold">{u.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{u.text}</p>
                  {u.hasPhoto && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                      <Camera className="w-3 h-3" />
                      <span>Photo attached</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Pro */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 gap-2 rounded-xl" variant="outline">
            <Phone className="w-4 h-4" /> Call Pro
          </Button>
          <Button className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 gap-2 rounded-xl" variant="outline">
            <MessageSquare className="w-4 h-4" /> Message
          </Button>
        </div>

        {/* Report Issue */}
        <div>
          <button
            onClick={() => setShowIssueForm(v => !v)}
            className="w-full flex items-center justify-between px-5 py-3 bg-red-900/20 border border-red-500/30 text-red-400 rounded-2xl hover:bg-red-900/30 transition-colors font-semibold text-sm">
            <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Report an Issue</span>
            {showIssueForm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showIssueForm && !issueSent && (
            <div className="mt-3 p-4 bg-[#0F1E35] border border-red-500/20 rounded-2xl space-y-3">
              <p className="text-gray-400 text-sm">Describe the issue and we&apos;ll escalate immediately.</p>
              <Textarea value={issueText} onChange={e => setIssueText(e.target.value)}
                placeholder="What's going wrong?"
                className="bg-white/5 border-white/10 text-white placeholder-gray-600 resize-none text-sm rounded-xl focus:border-red-500" rows={3} />
              <Button onClick={handleIssue} className="bg-red-600 hover:bg-red-700 text-white w-full rounded-xl">
                Submit Issue Report
              </Button>
            </div>
          )}
          {issueSent && (
            <div className="mt-3 p-4 bg-red-900/20 border border-red-500/30 rounded-2xl text-center">
              <p className="text-red-300 text-sm font-semibold">Issue reported. Support will contact you within 15 minutes.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
