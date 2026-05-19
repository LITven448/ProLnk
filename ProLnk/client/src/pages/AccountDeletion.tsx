import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowLeft,
  Trash2,
  ShieldOff,
  DollarSign,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";

const CONSEQUENCES = [
  {
    icon: Star,
    title: "Charter position lost permanently",
    desc: "Your founding network spot cannot be recovered. It will go to the next person on the waitlist.",
  },
  {
    icon: Users,
    title: "Referral network dissolved",
    desc: "Everyone you referred will lose their upline connection. Your 4-level commission cascade ends immediately.",
  },
  {
    icon: DollarSign,
    title: "Pending commissions forfeited",
    desc: "Any commissions not yet paid out (pending, in-review, or escrow) will be permanently cancelled.",
  },
  {
    icon: ShieldOff,
    title: "All data permanently erased",
    desc: "Job history, reviews, verification documents, and profile data will be deleted per CCPA. This cannot be undone.",
  },
];

export default function AccountDeletion() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [emailConfirm, setEmailConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const requestDeletion = trpc.partnerAuth.requestAccountDeletion?.useMutation?.({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Request failed. Please email support@prolnk.io directly.");
    },
  });

  const userEmail = user?.email ?? "";
  const emailMatches = emailConfirm.trim().toLowerCase() === userEmail.toLowerCase();
  const canSubmit = emailMatches && !submitted;

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (requestDeletion) {
      requestDeletion.mutate({ email: userEmail });
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4″>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5″>
            <CheckCircle className="w-9 h-9 text-gray-400″ />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2″>Deletion Request Received</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6″>
            We've received your request and will process it within 45 days as required by CCPA.
            You'll receive a confirmation email at{" "}
            <span className="font-semibold text-gray-700″>{userEmail}</span>.
          </p>
          <p className="text-xs text-gray-400″>
            Questions? Email{" "}
            <a href="mailto:privacy@prolnk.io" className="underline hover:text-gray-600″>
              privacy@prolnk.io
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8″>
      <div className="max-w-lg mx-auto">
        {/* Back link */}
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6″
        >
          <ArrowLeft className="w-4 h-4″ />
          Back to Settings
        </button>

        {/* Warning banner */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-red-200 mb-6″>
          <div className="bg-red-600 px-5 py-4 flex items-center gap-3″>
            <AlertTriangle className="w-6 h-6 text-white flex-shrink-0″ />
            <div>
              <h1 className="text-white font-bold text-base">Delete Your Account</h1>
              <p className="text-red-100 text-xs mt-0.5″>This action is permanent and cannot be undone.</p>
            </div>
          </div>
          <div className="bg-red-50 px-5 py-4″>
            <p className="text-red-800 text-sm font-semibold leading-snug">
              Your charter spot will be given to the next person on the waitlist the moment this is confirmed.
            </p>
          </div>
        </div>

        {/* Consequences */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-5″>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4″>
            What you will lose
          </h2>
          <div className="space-y-4″>
            {CONSEQUENCES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3″>
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5″>
                  <Icon className="w-4 h-4 text-red-500″ />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900″>{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm email */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-5″>
          <h2 className="text-sm font-bold text-gray-900 mb-1″>Confirm your email to proceed</h2>
          <p className="text-xs text-gray-500 mb-4″>
            Type <span className="font-mono font-bold text-gray-700″>{userEmail}</span> exactly to
            enable the delete button.
          </p>
          <Input
            type="email"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
            placeholder="Enter your email address"
            className={`h-10 text-sm transition-colors ${
              emailConfirm.length > 0
                ? emailMatches
                  ? "border-red-400 focus:border-red-500″
                  : "border-gray-200″
                : "border-gray-200″
            }`}
            autoComplete="off"
            autoCapitalize="off"
          />
          {emailConfirm.length > 0 && !emailMatches && (
            <p className="text-xs text-gray-400 mt-1.5″>Email doesn't match yet</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3″>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || requestDeletion?.isPending}
            className="w-full h-11 font-semibold text-sm flex items-center justify-center gap-2″
            style={
              canSubmit
                ? { backgroundColor: "#dc2626″, color: "#ffffff" }
                : { backgroundColor: "#f3f4f6″, color: "#9ca3af", cursor: "not-allowed" }
            }
          >
            <Trash2 className="w-4 h-4″ />
            {requestDeletion?.isPending ? "Submitting Request..." : "Submit Account Deletion Request"}
          </Button>

          <Button
            onClick={() => navigate("/dashboard/settings")}
            variant="outline"
            className="w-full h-11 font-semibold text-sm border-gray-200 hover:bg-gray-50″
          >
            Cancel — Keep My Account
          </Button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed">
          This initiates a CCPA deletion request processed within 45 days.
          Active subscriptions are cancelled immediately upon request confirmation.
        </p>
      </div>
    </div>
  );
}
