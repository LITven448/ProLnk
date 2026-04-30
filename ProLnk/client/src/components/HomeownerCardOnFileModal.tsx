/**
 * HomeownerCardOnFileModal
 * 
 * Appears after a homeowner accepts a deal. Collects card via Stripe Elements
 * SetupIntent so the card can be charged automatically at each milestone trigger
 * (deposit on job start, balance on check-in confirmation).
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
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CreditCard, Shield, CheckCircle, Clock, DollarSign } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? "");

interface Props {
  open: boolean;
  onClose: () => void;
  dealId: number;
  onSuccess?: () => void;
}

function CardForm({
  clientSecret,
  dealId,
  milestonePreview,
  onSuccess,
  onClose,
}: {
  clientSecret: string;
  dealId: number;
  milestonePreview: Array<{ label: string; amountDollars: string; trigger: string }>;
  onSuccess?: () => void;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const confirmCard = trpc.payments.confirmCardSaved.useMutation();

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
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (setupIntent?.payment_method) {
      try {
        await confirmCard.mutateAsync({
          dealId,
          setupIntentId: setupIntent.id,
          paymentMethodId: setupIntent.payment_method as string,
          jobValueDollars: milestonePreview.reduce((sum, m) => sum + parseFloat(m.amountDollars), 0),
        });
        setDone(true);
        toast.success("Your card will be charged automatically at each milestone.");
        onSuccess?.();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Card Saved Successfully</h3>
        <p className="text-sm text-gray-400 text-center max-w-xs">
          Your card is on file. You won't need to do anything else — payments are handled automatically at each milestone.
        </p>
        <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700">Done</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Milestone Preview */}
      {milestonePreview.length > 0 && (
        <div className="bg-gray-800/60 rounded-lg p-4 space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Payment Schedule</p>
          {milestonePreview.map((m, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-gray-300">{m.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">${m.amountDollars}</span>
                <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                  {m.trigger === "job_start_confirmed" ? "On job start" :
                   m.trigger === "homeowner_checkin" ? "On completion" : "Mid-job"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Card Element */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Card Details</label>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "15px",
                  color: "#f3f4f6",
                  fontFamily: "Inter, sans-serif",
                  "::placeholder": { color: "#6b7280" },
                },
                invalid: { color: "#ef4444" },
              },
            }}
          />
        </div>
      </div>

      {/* Security Note */}
      <div className="flex items-start gap-2 text-xs text-gray-500">
        <Shield className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-500" />
        <span>
          Your card is stored securely by Stripe. ProLnk never stores card numbers.
          You will be notified before each charge.
        </span>
      </div>

      <Button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
      >
        {loading ? "Saving card..." : "Save Card & Confirm Deal"}
      </Button>
    </form>
  );
}

export function HomeownerCardOnFileModal({ open, onClose, dealId, onSuccess }: Props) {
  
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [milestonePreview, setMilestonePreview] = useState<Array<{ label: string; amountDollars: string; trigger: string }>>([]);

  const createSetupIntent = trpc.payments.createSetupIntent.useMutation();

  useEffect(() => {
    if (!open || clientSecret) return;
    createSetupIntent.mutateAsync({
      dealId,
      origin: window.location.origin,
    }).then((result) => {
      setClientSecret(result.clientSecret ?? null);
      setMilestonePreview(result.milestonePreview ?? []);
    }).catch((err) => {
      toast.error(err.message);
    });
  }, [open, dealId]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <DialogTitle className="text-white">Save Card on File</DialogTitle>
              <DialogDescription className="text-gray-400 text-xs">
                Secure, automatic milestone payments
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-emerald-900/30 border border-emerald-800/50 rounded-lg p-3">
            <DollarSign className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <p className="text-xs text-emerald-300">
              Your card will be charged automatically — no action needed from you at each milestone.
            </p>
          </div>

          {!clientSecret ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CardForm
                clientSecret={clientSecret}
                dealId={dealId}
                milestonePreview={milestonePreview}
                onSuccess={onSuccess}
                onClose={onClose}
              />
            </Elements>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
