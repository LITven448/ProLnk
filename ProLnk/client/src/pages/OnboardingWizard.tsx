import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2, ArrowRight, ArrowLeft, Building2, MapPin,
  Zap, DollarSign, Sparkles, Users, Star, CreditCard, Lock, ShieldCheck
} from "lucide-react";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const FSM_SOFTWARE = [
  "Jobber", "Housecall Pro", "ServiceTitan", "CompanyCam",
  "FieldEdge", "ServiceFusion", "Workiz", "Google Drive / Photos",
  "I don't use software"
];

const SERVICE_CATEGORIES = [
  "Pet Waste Removal", "Lawn & Landscaping", "HVAC", "Plumbing", "Electrical",
  "House Cleaning", "Pest Control", "Pressure Washing", "Window Cleaning",
  "Handyman", "Gutter Cleaning", "Roofing", "Painting", "Pool Service",
  "Water Filtration", "Garage Organization", "Irrigation / Sprinklers",
  "Fence & Gate", "Tree Service", "Concrete & Masonry"
];

const DFW_ZIPS = [
  "75201", "75202", "75203", "75204", "75205", "75206", "75207", "75208",
  "75209", "75210", "75211", "75212", "75214", "75215", "75216", "75217",
  "75218", "75219", "75220", "75221", "75222", "75223", "75224", "75225",
  "75226", "75227", "75228", "75229", "75230", "75231", "75232", "75233",
  "75234", "75235", "75236", "75237", "75238", "75240", "75241", "75242",
  "76001", "76002", "76006", "76010", "76011", "76012", "76013", "76014",
  "76015", "76016", "76017", "76018", "76019", "76020", "76021", "76022"
];

const TIER_BENEFITS = [
  { tier: "Scout",      price: "Free",      keepRate: "40%", seats: "1 seat",     color: "bg-slate-100 text-slate-700",  cap: "$500/mo cap" },
  { tier: "Pro",        price: "$29/mo",    keepRate: "55%", seats: "3 seats",    color: "bg-[#0A1628]/10 text-[#0A1628]",   cap: "No cap" },
  { tier: "Crew",       price: "$79/mo",    keepRate: "65%", seats: "5 seats",    color: "bg-indigo-100 text-indigo-700", cap: "No cap", recommended: true },
  { tier: "Company",    price: "$149/mo",   keepRate: "72%", seats: "15 seats",   color: "bg-amber-100 text-amber-700", cap: "No cap" },
  { tier: "Enterprise", price: "$299/mo",   keepRate: "78%", seats: "Unlimited",  color: "bg-slate-800 text-slate-100", cap: "No cap" },
];

export default function OnboardingWizard() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    category: "",
    software: "",
    serviceZips: [] as string[],
    selectedTier: "Crew",
    agreeTerms: false,
    agreeCommission: false,
    // Payout info
    payoutMethod: "bank" as "bank" | "check",
    bankAccountHolder: "",
    bankRoutingNumber: "",
    bankAccountNumber: "",
    skipPayout: false,
  });

  const submitMutation = trpc.partners.submitApplication.useMutation({
    onSuccess: () => {
      setStep(6);
    },
    onError: (err: { message?: string }) => {
      toast.error(err.message || "Submission failed. Please try again.");
    },
  });

  const update = (key: keyof typeof formData, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleZip = (zip: string) => {
    setFormData(prev => ({
      ...prev,
      serviceZips: prev.serviceZips.includes(zip)
        ? prev.serviceZips.filter(z => z !== zip)
        : [...prev.serviceZips, zip]
    }));
  };

  const next = () => {
    if (step === 1 && (!formData.businessName || !formData.ownerName || !formData.phone || !formData.email)) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (step === 2 && (!formData.category || !formData.software)) {
      toast.error("Select your service category and software");
      return;
    }
    if (step === 3 && formData.serviceZips.length === 0) {
      toast.error("Select at least one service zip code");
      return;
    }
    if (step < 6) setStep((step + 1) as Step);
  };

  const submitAgreement = () => {
    if (!formData.agreeTerms || !formData.agreeCommission) {
      toast.error("Please agree to both terms to continue");
      return;
    }
    setStep(5);
  };

  const submitFinal = () => {
    submitMutation.mutate({
      businessName: formData.businessName,
      businessType: formData.category,
      serviceArea: formData.serviceZips.join(", ") || "DFW",
      contactName: formData.ownerName,
      contactEmail: formData.email,
      contactPhone: formData.phone || undefined,
    });
  };

  const progressPercent = Math.min(100, ((step - 1) / 6) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#0A1628] text-white px-4 py-1.5 rounded-full text-sm font-medium mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            5-Minute Partner Application
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Join the ProLnk Network</h1>
          <p className="text-gray-500 text-sm mt-1">Start earning referral commissions from jobs you already do</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>Step {step} of 6</span>
            <span>{Math.round(progressPercent)}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0A1628] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step 1: Business Info */}
        {step === 1 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-5 w-5 text-[#0A1628]" />
                <h2 className="font-semibold text-gray-800">Business Information</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Business Name *</Label>
                  <Input placeholder="Acme Lawn Care" value={formData.businessName} onChange={e => update("businessName", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Owner Name *</Label>
                  <Input placeholder="John Smith" value={formData.ownerName} onChange={e => update("ownerName", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Phone Number *</Label>
                  <Input placeholder="(214) 555-0100" value={formData.phone} onChange={e => update("phone", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Email Address *</Label>
                  <Input placeholder="john@acmelawncare.com" value={formData.email} onChange={e => update("email", e.target.value)} className="mt-1" />
                </div>
              </div>
              <Button className="w-full gap-2 bg-[#0A1628] hover:bg-teal-700 mt-2" onClick={next}>
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Service & Software */}
        {step === 2 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-5 w-5 text-[#0A1628]" />
                <h2 className="font-semibold text-gray-800">Your Business</h2>
              </div>
              <div>
                <Label className="text-sm">Primary Service Category *</Label>
                <Select value={formData.category} onValueChange={v => update("category", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="What service do you provide?" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm">Job Management Software *</Label>
                <Select value={formData.software} onValueChange={v => update("software", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="What software do you use?" />
                  </SelectTrigger>
                  <SelectContent>
                    {FSM_SOFTWARE.map(sw => (
                      <SelectItem key={sw} value={sw}>{sw}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.software && formData.software !== "I don't use software" && (
                <div className="bg-[#F5E642]/10 rounded-xl p-3 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0A1628] mt-0.5 shrink-0" />
                  <p className="text-xs text-[#0A1628]">
                    ProLnk integrates directly with {formData.software}. Once approved, your job photos will sync automatically -- no extra steps required.
                  </p>
                </div>
              )}
              {formData.software === "I don't use software" && (
                <div className="bg-blue-50 rounded-xl p-3 flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-700">
                    No problem -- you'll get access to the ProLnk Field OS, a free mobile tool for logging jobs and uploading photos in under 60 seconds.
                  </p>
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-1" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4" /> Back</Button>
                <Button className="flex-1 gap-2 bg-[#0A1628] hover:bg-teal-700" onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Service Area */}
        {step === 3 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-5 w-5 text-[#0A1628]" />
                <h2 className="font-semibold text-gray-800">Service Area</h2>
                <Badge variant="outline" className="ml-auto text-xs">{formData.serviceZips.length} selected</Badge>
              </div>
              <p className="text-sm text-gray-500">Select the DFW zip codes you serve. You'll only receive leads in these areas.</p>
              <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto">
                {DFW_ZIPS.slice(0, 30).map(zip => (
                  <button
                    key={zip}
                    onClick={() => toggleZip(zip)}
                    className={`text-xs py-1.5 rounded-lg border font-mono transition-all ${
                      formData.serviceZips.includes(zip)
                        ? "bg-[#0A1628] text-white border-[#0A1628]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#0A1628]/30"
                    }`}
                  >
                    {zip}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-1" onClick={() => setStep(2)}><ArrowLeft className="h-4 w-4" /> Back</Button>
                <Button className="flex-1 gap-2 bg-[#0A1628] hover:bg-teal-700" onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Tier Selection + Agreement */}
        {step === 4 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-5 w-5 text-[#0A1628]" />
                <h2 className="font-semibold text-gray-800">Choose Your Tier</h2>
              </div>
              <div className="space-y-2">
                {TIER_BENEFITS.map(tier => (
                  <button
                    key={tier.tier}
                    onClick={() => update("selectedTier", tier.tier)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                      formData.selectedTier === tier.tier ? "border-[#0A1628] bg-[#F5E642]/10" : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={tier.color}>{tier.tier}</Badge>
                        {tier.recommended && <Badge className="bg-[#0A1628]/10 text-[#0A1628] text-xs">Recommended</Badge>}
                      </div>
                      <span className="font-bold text-gray-800">{tier.price}</span>
                    </div>
                    <div className="flex gap-4 mt-1.5 text-xs text-gray-500">
                      <span>Keep: <strong className="text-gray-700">{tier.keepRate}</strong></span>
                      <span>Seats: <strong className="text-gray-700">{tier.seats}</strong></span>
                      <span className="text-amber-600">{tier.cap}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={v => update("agreeTerms", v)}
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer">
                    I agree to the ProLnk Partner Agreement and Terms of Service
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="commission"
                    checked={formData.agreeCommission}
                    onCheckedChange={v => update("agreeCommission", v)}
                  />
                  <label htmlFor="commission" className="text-xs text-gray-600 cursor-pointer">
                    I understand the commission structure and non-circumvention policy
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-1" onClick={() => setStep(3)}><ArrowLeft className="h-4 w-4" /> Back</Button>
                <Button className="flex-1 gap-2 bg-[#0A1628] hover:bg-teal-700" onClick={submitAgreement}>
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Payout Setup */}
        {step === 5 && (
          <Card className="border-gray-200">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-[#0A1628]" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Payout Setup</h2>
                  <p className="text-xs text-gray-500">Where should we send your commissions?</p>
                </div>
              </div>

              {/* Payout method toggle */}
              <div className="grid grid-cols-2 gap-2">
                {(["bank", "check"] as const).map(method => (
                  <button
                    key={method}
                    onClick={() => update("payoutMethod", method)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      formData.payoutMethod === method
                        ? "border-[#0A1628] bg-[#F5E642]/10 text-[#0A1628]"
                        : "border-gray-200 bg-white text-gray-600"
                    }`}
                  >
                    {method === "bank" ? " Direct Deposit" : " Paper Check"}
                  </button>
                ))}
              </div>

              {formData.payoutMethod === "bank" && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-600">Account Holder Name</Label>
                    <Input
                      placeholder="Full name on account"
                      value={formData.bankAccountHolder}
                      onChange={e => update("bankAccountHolder", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-600">Routing Number</Label>
                      <Input
                        placeholder="9 digits"
                        maxLength={9}
                        value={formData.bankRoutingNumber}
                        onChange={e => update("bankRoutingNumber", e.target.value.replace(/\D/g, ""))}
                        className="mt-1 font-mono"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Account Number</Label>
                      <Input
                        placeholder="Account #"
                        value={formData.bankAccountNumber}
                        onChange={e => update("bankAccountNumber", e.target.value.replace(/\D/g, ""))}
                        className="mt-1 font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                    <Lock className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <p className="text-xs text-gray-500">Bank info is encrypted and stored securely. Used only for commission payouts.</p>
                  </div>
                </div>
              )}

              {formData.payoutMethod === "check" && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="text-xs text-amber-800">Paper checks are mailed within 5 business days of commission approval. Direct deposit is faster and recommended.</p>
                </div>
              )}

              <div className="flex items-center gap-2 bg-[#F5E642]/10 border border-[#0A1628]/20 rounded-xl px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-[#0A1628] shrink-0" />
                <p className="text-xs text-teal-800">You can update payout info anytime from your Partner Portal settings.</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-1" onClick={() => setStep(4)}><ArrowLeft className="h-4 w-4" /> Back</Button>
                <Button className="flex-1 gap-2 bg-[#0A1628] hover:bg-teal-700" onClick={() => setStep(6)}>
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <button
                onClick={() => { update("skipPayout", true); submitFinal(); }}
                className="w-full text-xs text-gray-400 hover:text-gray-600 text-center"
              >
                Skip for now -- I'll add payout info after approval
              </button>
            </CardContent>
          </Card>
        )}

        {/* Step 6: FSM Lead Source Tag Setup */}
        {step === 6 && (
          <Card className="border-gray-200">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Set Up Your Lead Source Tag</h2>
                  <p className="text-xs text-gray-500">This is how we track your commissions automatically</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-blue-800">Your unique ProLnk tag:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white border border-blue-300 text-blue-900 font-mono text-sm px-3 py-2 rounded-lg">
                    ProLnk-{formData.businessName ? formData.businessName.replace(/\s+/g, "").substring(0, 8).toUpperCase() : "YOURNAME"}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const tag = `ProLnk-${formData.businessName.replace(/\s+/g, "").substring(0, 8).toUpperCase()}`;
                      navigator.clipboard.writeText(tag);
                      toast.success("Tag copied!");
                    }}
                    className="shrink-0"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-blue-700">
                  When you close a job that came from a ProLnk referral, enter this tag as the <strong>Lead Source</strong> in your {formData.software || "FSM software"}. This is how we know to pay you.
                </p>
              </div>

              {formData.software && formData.software !== "I don't use software" && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1.5">
                  <p className="text-xs font-semibold text-gray-700">How to set it in {formData.software}:</p>
                  {formData.software === "Housecall Pro" && (
                    <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                      <li>Open the job in Housecall Pro</li>
                      <li>Scroll to <strong>Lead Source</strong> field</li>
                      <li>Type or select your ProLnk tag</li>
                      <li>Save the job</li>
                    </ol>
                  )}
                  {formData.software === "Jobber" && (
                    <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                      <li>Open the job in Jobber</li>
                      <li>Go to <strong>Job Details  Lead Source</strong></li>
                      <li>Enter your ProLnk tag</li>
                      <li>Save</li>
                    </ol>
                  )}
                  {!["Housecall Pro", "Jobber"].includes(formData.software) && (
                    <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                      <li>Open the job in {formData.software}</li>
                      <li>Find the <strong>Lead Source</strong> or <strong>Source</strong> field</li>
                      <li>Enter your ProLnk tag exactly as shown above</li>
                      <li>Save the job</li>
                    </ol>
                  )}
                </div>
              )}

              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  <strong>Important:</strong> Every ProLnk-referred job that closes without this tag will not be tracked. Per the Partner Agreement, untagged jobs are subject to a clawback of 2 the commission amount.
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-1" onClick={() => setStep(5)}><ArrowLeft className="h-4 w-4" /> Back</Button>
                <Button
                  className="flex-1 gap-2 bg-[#0A1628] hover:bg-teal-700"
                  onClick={submitFinal}
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                  {!submitMutation.isPending && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 7: Confirmation */}
        {step === 7 && (
          <Card className="border-[#0A1628]/20">
            <CardContent className="p-8 flex flex-col items-center gap-5 text-center">
              <div className="w-16 h-16 rounded-full bg-[#0A1628]/10 flex items-center justify-center">
                <CheckCircle2 className="h-9 w-9 text-[#0A1628]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Application Submitted!</h2>
                <p className="text-gray-500 text-sm">Welcome to the ProLnk network, {formData.ownerName}. You'll receive a decision within 24 hours.</p>
              </div>
              <div className="w-full bg-gray-50 rounded-xl p-4 space-y-2 text-left">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What happens next</p>
                {[
                  "Auto-verification of your business license and insurance",
                  `${formData.software !== "I don't use software" ? `${formData.software} integration activated` : "ProLnk Field OS access granted"}`,
                  "Approval email sent within 24 hours",
                  "First lead delivered within 48 hours of approval",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#0A1628]/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-[#0A1628]">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-500" />)}
                <span className="text-xs text-gray-500 ml-1">Avg partner earns $400/mo in commissions</span>
              </div>
              <Button className="w-full bg-[#0A1628] hover:bg-teal-700" onClick={() => window.location.href = "/dashboard"}>
                <Users className="h-4 w-4 mr-2" /> Go to Partner Portal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
