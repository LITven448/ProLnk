/**
 * ACH Authorization Signing Page
 * 
 * Partners sign a NACHA-compliant ACH debit mandate for insurance jobs.
 * The signed authorization allows ProLnk to automatically pull the platform
 * commission from the partner's bank account when the homeowner confirms
 * job completion via the check-in system.
 * 
 * Patent Claim 21: ACH debit authorization for insurance job commission pulls.
 */
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";
import {
  Building2, Shield, CheckCircle, AlertTriangle,
  FileText, DollarSign, Clock
} from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? "");

function AchForm({
  clientSecret,
  dealId,
  jobPaymentId,
  onSuccess,
}: {
  clientSecret: string;
  dealId: number;
  jobPaymentId: number;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [signerName, setSignerName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const createAuth = trpc.payments.signAchAuthorization.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !signerName.trim() || !agreed) return;
    setLoading(true);

    const { setupIntent, error } = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (setupIntent?.payment_method) {
      try {
        await createAuth.mutateAsync({
          dealId,
          jobPaymentId,
          stripePaymentMethodId: setupIntent.payment_method as string,
          authorizationType: "single_job",
          signerName: signerName.trim(),
        });
        toast.success("Authorization signed — commission will be collected automatically on job completion.");
        onSuccess();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label className="text-gray-300">Bank Account</Label>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
          <PaymentElement
            options={{
              fields: { billingDetails: { name: "never" } },
              defaultValues: { billingDetails: { name: signerName } },
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-300">Authorized Signer Name</Label>
        <Input
          value={signerName}
          onChange={(e) => setSignerName(e.target.value)}
          placeholder="Full legal name"
          className="bg-gray-800 border-gray-700 text-white"
          required
        />
      </div>

      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-amber-400">NACHA ACH Debit Authorization</span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          By signing below, you authorize ProLnk LLC to initiate a one-time ACH debit from your bank account
          for the platform commission on this insurance job. The debit will be initiated automatically upon
          homeowner confirmation of job completion via the TrustyPro check-in system. You will receive email
          notification when the debit is initiated. You may revoke this authorization by contacting
          support@prolnk.io at least 3 business days before the scheduled debit.
          This authorization is governed by the ProLnk Partner Agreement and NACHA Operating Rules.
        </p>
        <div className="flex items-start gap-2">
          <Checkbox
            id="agree"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(!!v)}
            className="mt-0.5"
          />
          <label htmlFor="agree" className="text-xs text-gray-300 cursor-pointer">
            I have read and agree to the ACH debit authorization terms above. I authorize ProLnk LLC
            to debit my bank account for the platform commission on this job.
          </label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading || !stripe || !signerName.trim() || !agreed}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold"
      >
        {loading ? "Signing..." : "Sign ACH Authorization"}
      </Button>
    </form>
  );
}

export default function AchAuthorizationPage() {
  
  const [, navigate] = useLocation();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [jobPaymentId, setJobPaymentId] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  // Get dealId from URL params
  const params = new URLSearchParams(window.location.search);
  const dealId = parseInt(params.get("dealId") ?? "0");

  const createSetupIntent = trpc.payments.createAchSetupIntent.useMutation();

  const handleStart = async () => {
    if (!dealId) {
      toast.error("Missing deal ID");
      return;
    }
    try {
      const result = await createSetupIntent.mutateAsync({ dealId });
      setClientSecret(result.clientSecret ?? null);
      // jobPaymentId would come from the deal context — for now use dealId as proxy
      setJobPaymentId(dealId);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <Card className="bg-gray-900 border-gray-700 max-w-md w-full">
          <CardContent className="pt-8 pb-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Authorization Signed</h2>
            <p className="text-sm text-gray-400 text-center">
              Your ACH authorization is on file. The platform commission will be automatically
              collected when the homeowner confirms job completion.
            </p>
            <Button onClick={() => navigate("/dashboard")} className="bg-emerald-600 hover:bg-emerald-700">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ACH Debit Authorization</h1>
            <p className="text-sm text-gray-400">Insurance Job — Deal #{dealId}</p>
          </div>
          <Badge className="ml-auto bg-amber-900/50 text-amber-300 border-amber-700">Insurance Job</Badge>
        </div>

        {/* How it works */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-400 font-medium uppercase tracking-wide">How Insurance Job Commissions Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: <Building2 className="w-4 h-4 text-blue-400" />, text: "Insurance pays you directly for the job — no homeowner card required" },
              { icon: <DollarSign className="w-4 h-4 text-amber-400" />, text: "ProLnk's platform fee is automatically deducted from your payout via ACH" },
              { icon: <Clock className="w-4 h-4 text-emerald-400" />, text: "Debit is triggered only after the homeowner confirms job completion" },
              { icon: <Shield className="w-4 h-4 text-purple-400" />, text: "NACHA-compliant authorization — you receive email notice before every debit" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                <p className="text-sm text-gray-300">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alert */}
        <div className="flex items-start gap-2 bg-amber-900/20 border border-amber-800/50 rounded-lg p-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300">
            This authorization is required to proceed with insurance-funded jobs on the ProLnk platform.
            Without it, the job cannot be assigned to you.
          </p>
        </div>

        {/* Form */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Bank Account Authorization</CardTitle>
          </CardHeader>
          <CardContent>
            {!clientSecret ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-400">
                  Click below to securely connect your bank account via Stripe. Your account details
                  are encrypted and never stored by ProLnk.
                </p>
                <Button
                  onClick={handleStart}
                  disabled={createSetupIntent.isPending}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  {createSetupIntent.isPending ? "Loading..." : "Connect Bank Account"}
                </Button>
              </div>
            ) : (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "night",
                    variables: { colorPrimary: "#d97706" },
                  },
                }}
              >
                <AchForm
                  clientSecret={clientSecret}
                  dealId={dealId}
                  jobPaymentId={jobPaymentId ?? dealId}
                  onSuccess={() => setDone(true)}
                />
              </Elements>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
