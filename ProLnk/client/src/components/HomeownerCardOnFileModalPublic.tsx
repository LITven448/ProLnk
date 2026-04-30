/**
 * HomeownerCardOnFileModalPublic
 *
 * Public (no-auth) version of the card-on-file modal. Used on the CustomerDealPage
 * (/deal/:token) where homeowners are not logged in.
 *
 * Uses createSetupIntentByToken (publicProcedure) instead of createSetupIntent
 * (protectedProcedure). The homeowner email/name are collected from the contact form.
 *
 * Patent Claim 20: Automatic commission collection triggered by homeowner check-in.
 */
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CreditCard, Shield, CheckCircle, Clock, DollarSign, Loader2, Lock } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? "");

interface Props {
  open: boolean;
  onClose: () => void;
  token: string;
  homeownerEmail: string;
  homeownerName: string;
  onSuccess?: () => void;
}

function CardForm({
  clientSecret,
  milestonePreview,
  onSuccess,
  onClose,
}: {
  clientSecret: string;
  milestonePreview: Array<{ label: string; amountDollars: string; trigger: string }>;
  onSuccess?: () => void;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const cardEl = elements.getElement(CardElement);
    if (!cardEl) { setLoading(false); return; }
    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: { card: cardEl },
    });
    if (error) {
      toast.error(error.message ?? "Card setup failed. Please try again.");
      setLoading(false);
      return;
    }
    if (setupIntent?.status === "succeeded") {
      setDone(true);
      toast.success("Card saved! You're all set — no further action needed.");
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center py-8 gap-3">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-emerald-600" />
        </div>
        <p className="font-semibold text-gray-900">Card Saved Successfully</p>
        <p className="text-sm text-gray-500 text-center">
          You're all set. Your card will be charged automatically at each milestone — no action needed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Milestone preview */}
      {milestonePreview.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Payment Schedule</p>
          {milestonePreview.map((m, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-700">{m.label}</span>
              </div>
              <span className="text-xs font-semibold text-gray-900">${parseFloat(m.amountDollars).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}

      {/* Card input */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">Card Details</p>
        <div className="border border-gray-200 rounded-xl p-3 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "15px",
                  color: "#111827",
                  "::placeholder": { color: "#9ca3af" },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Security note */}
      <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg p-3">
        <Lock className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-700">
          Your card is encrypted and stored securely by Stripe. ProLnk never sees your full card number.
          You can remove your card at any time.
        </p>
      </div>

      <Button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-[#0A1628] hover:bg-teal-700 text-white font-semibold py-3 rounded-xl"
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin mr-2" /> Saving Card...</>
        ) : (
          <><CreditCard size={16} className="mr-2" /> Save Card on File</>
        )}
      </Button>

      <button
        type="button"
        onClick={onClose}
        className="w-full text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors"
      >
        Skip for now (you can add this later)
      </button>
    </form>
  );
}

export function HomeownerCardOnFileModalPublic({
  open,
  onClose,
  token,
  homeownerEmail,
  homeownerName,
  onSuccess,
}: Props) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [milestonePreview, setMilestonePreview] = useState<Array<{ label: string; amountDollars: string; trigger: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  const createSetupIntent = trpc.payments.createSetupIntentByToken.useMutation();

  useEffect(() => {
    if (!open || clientSecret || !homeownerEmail) return;
    createSetupIntent.mutateAsync({
      token,
      homeownerEmail,
      homeownerName,
    }).then((result) => {
      setClientSecret(result.clientSecret ?? null);
      setMilestonePreview(result.milestonePreview ?? []);
    }).catch((err) => {
      console.warn("[CardOnFile] SetupIntent failed:", err.message);
      setError(err.message);
    });
  }, [open, token, homeownerEmail]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-white border-gray-200 max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-[#0A1628]/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[#0A1628]" />
            </div>
            <div>
              <DialogTitle className="text-gray-900">Save Card on File</DialogTitle>
              <DialogDescription className="text-gray-500 text-xs">
                Automatic milestone payments — no action needed at each step
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
            <p className="text-xs text-emerald-800">
              Your card will be charged automatically at each milestone. No surprise charges — you'll receive email confirmation at each step.
            </p>
          </div>

          {error ? (
            <div className="text-center py-6">
              <p className="text-sm text-red-600 mb-3">{error}</p>
              <button
                onClick={onClose}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          ) : !clientSecret ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A1628]" />
            </div>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CardForm
                clientSecret={clientSecret}
                milestonePreview={milestonePreview}
                onSuccess={onSuccess}
                onClose={onClose}
              />
            </Elements>
          )}

          <div className="flex items-center justify-center gap-2 pt-1">
            <Shield className="w-3.5 h-3.5 text-gray-400" />
            <p className="text-xs text-gray-400">256-bit SSL encryption · Powered by Stripe</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
