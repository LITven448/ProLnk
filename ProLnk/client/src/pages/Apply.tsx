import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { SERVICE_CATEGORIES, SERVICE_GROUPS } from "../../../shared/serviceCategories";
import { Shield, CheckCircle2, ArrowRight, Award, Zap, DollarSign, MapPin, Users, TrendingUp, Star } from "lucide-react";
import ProLnkLogo from "@/components/ProLnkLogo";
import { Link } from "wouter";

const BUSINESS_TYPES_GROUPED = SERVICE_GROUPS.map(group => ({
  group,
  types: SERVICE_CATEGORIES.filter((c: { group: string; name: string }) => c.group === group).map((c: { group: string; name: string }) => c.name),
}));

const schema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.string().min(1, "Please select a business type"),
  serviceArea: z.string().min(3, "Service area is required"),
  contactName: z.string().min(2, "Contact name is required"),
  contactEmail: z.string().email("Valid email required"),
  contactPhone: z.string().optional(),
  website: z.string().url("Must be a valid URL (include https://)").optional().or(z.literal("")),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const BENEFITS = [
  { icon: DollarSign, title: "Earn on Every Referral", desc: "Get paid when you refer a homeowner to another pro in the network. Passive income from your existing relationships." },
  { icon: Users, title: "Receive Qualified Leads", desc: "TrustyPro homeowners are matched to you by AI -- based on your trade, location, and availability. No chasing." },
  { icon: Shield, title: "TrustyPro Certified Badge", desc: "Stand out with a verified badge that tells homeowners you've been background-checked and vetted by the network." },
  { icon: TrendingUp, title: "Grow Your Business", desc: "Access a full partner dashboard with lead tracking, earnings, referral links, and performance analytics." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Apply & Get Approved", desc: "Fill out this form. Our team reviews your application within 24 hours." },
  { step: "02", title: "Complete Onboarding", desc: "Set up your partner profile, connect your payout account, and get your referral link." },
  { step: "03", title: "Start Earning", desc: "Refer homeowners, receive matched leads, and earn commissions on every completed job." },
];

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referrerName, setReferrerName] = useState<string | null>(null);
  const [addrStreet, setAddrStreet] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("TX");
  const [addrZip, setAddrZip] = useState("");
  const [serviceRadius, setServiceRadius] = useState("25");
  const trackClick = trpc.referralTracking.trackClick.useMutation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferralCode(ref);
      const parts = ref.split("-");
      if (parts.length >= 3) setReferrerName(decodeURIComponent(parts.slice(2).join("-")));
      trackClick.mutate({ referralCode: ref });
    }
  }, []);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const applyMutation = trpc.partners.submitApplication.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err: { message?: string }) => toast.error(err.message || "Something went wrong. Please try again."),
  });

  const onSubmit = (data: FormData) => {
    // Compose address into serviceArea field
    const addressParts = [addrStreet, addrCity, addrState, addrZip].filter(Boolean);
    const composed = addressParts.length > 0
      ? `${addressParts.join(", ")} (${serviceRadius}mi radius)`
      : data.serviceArea;
    applyMutation.mutate({
      ...data,
      serviceArea: composed || data.serviceArea,
      referredByCode: referralCode ?? undefined,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full bg-[#0A1628]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#0A1628]/70" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h1>
          <p className="text-gray-600 text-lg mb-3">
            Welcome to the ProLnk network. Our team will review your application and reach out within <strong className="text-gray-900">24 hours</strong>.
          </p>
          <p className="text-gray-500 text-sm mb-8">Check your email for a confirmation.</p>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 text-left space-y-3">
            <p className="text-xs text-[#0A1628]/70 font-semibold uppercase tracking-widest mb-4">What happens next</p>
            {["Application review (within 24 hrs)", "Onboarding call with your ProLnk rep", "Partner dashboard access + referral link", "TrustyPro Certified badge (after verification)"].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0A1628]/70 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <Link href="/"><Button className="bg-[#0A1628] hover:bg-[#0A1628]/80 text-white px-8 py-3 rounded-xl font-semibold">Back to ProLnk Home</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-gray-900">
      {/* Nav */}
      <nav className="border-b border-gray-800/60 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/"><ProLnkLogo height={36} /></Link>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Shield className="w-4 h-4 text-[#0A1628]/70" /><span>Secure Application</span>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-[#0A1628] border-b border-[#0A1628]/10">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          {referrerName && (
            <div className="inline-flex items-center gap-2 bg-[#0A1628]/10 border border-[#0A1628]/30 rounded-full px-4 py-2 text-sm text-[#0A1628]/60 mb-5">
              <Users className="w-4 h-4" /><span>Referred by <strong>{referrerName}</strong></span>
            </div>
          )}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 text-sm text-amber-300 mb-5">
            <Award className="w-4 h-4" /><span>Founding Partner Applications -- DFW Launch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Become a <span className="text-[#0A1628]/70">ProLnk Partner</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Join the DFW network of verified home service professionals. Earn commissions, receive matched leads, and get TrustyPro Certified.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-200">
            {["Free to join", "No monthly fees to start", "24-hr approval", "DFW-focused network"].map((t, i) => (
              <div key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0A1628]/70" /><span>{t}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column -- Benefits */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="text-xs text-[#0A1628]/70 font-semibold uppercase tracking-widest mb-6">Partner Benefits</p>
              <div className="space-y-5">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0A1628]/10 border border-[#0A1628]/20 flex items-center justify-center flex-shrink-0">
                      <b.icon className="w-5 h-5 text-[#0A1628]/70" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{b.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-[#0A1628]/70 font-semibold uppercase tracking-widest mb-6">How It Works</p>
              <div className="space-y-6">
                {HOW_IT_WORKS.map((h, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-3xl font-bold text-gray-800 leading-none w-10 flex-shrink-0">{h.step}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{h.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TrustyPro Certified Box */}
            <div className="bg-gradient-to-br from-[#0A1628]/5 to-[#0A1628]/10 border border-[#0A1628]/15 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#0A1628]" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">TrustyPro Certified</p>
                  <p className="text-xs text-[#0A1628]/60">Elite Partner Status</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                After joining, complete our verification process to earn the <strong className="text-gray-900">TrustyPro Certified</strong> badge -- displayed on your profile and visible to every homeowner in the network.
              </p>
              {["Background check passed", "License & insurance verified", "3+ completed jobs on platform", "4.5+ star rating maintained"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" /><span>{item}</span>
                </div>
              ))}
            </div>

            {/* Earnings Box */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-xs text-[#0A1628]/70 font-semibold uppercase tracking-widest mb-4">Earning Potential</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Referring Pro commission</span>
                  <span className="text-gray-900 font-bold">40% of platform fee</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Receiving Pro commission</span>
                  <span className="text-gray-900 font-bold">55% of platform fee</span>
                </div>
                <div className="border-t border-gray-800 pt-3 flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Avg. commission per job</span>
                  <span className="text-[#0A1628]/70 font-bold text-lg">$85-$340</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">Based on average DFW home service job values of $500-$2,000.</p>
            </div>
          </div>

          {/* Right Column -- Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#0A1628]/10 border border-[#0A1628]/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#0A1628]/70" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Partner Application</h2>
                  <p className="text-sm text-gray-500">Takes about 3 minutes to complete</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-4">Business Information</p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="businessName" className="text-sm font-medium text-gray-700 mb-1.5 block">Business Name <span className="text-red-400">*</span></Label>
                      <Input id="businessName" placeholder="Your business name" {...register("businessName")} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#0A1628]" />
                      {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="businessType" className="text-sm font-medium text-gray-700 mb-1.5 block">Primary Trade / Service <span className="text-red-400">*</span></Label>
                      <Select onValueChange={(v) => setValue("businessType", v)}>
                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                          <SelectValue placeholder="Select your primary trade" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 max-h-64">
                          {BUSINESS_TYPES_GROUPED.map(({ group, types }) => (
                            <div key={group}>
                              <div className="px-2 py-1.5 text-xs font-semibold text-[#0A1628]/70 uppercase tracking-wider">{group}</div>
                              {types.map((type: string) => <SelectItem key={type} value={type} className="text-gray-200 focus:bg-gray-700">{type}</SelectItem>)}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.businessType && <p className="text-red-400 text-xs mt-1">{errors.businessType.message}</p>}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Business Address <span className="text-red-400">*</span></Label>
                      <div className="space-y-2">
                        <Input
                          placeholder="Street address"
                          value={addrStreet}
                          onChange={e => setAddrStreet(e.target.value)}
                          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#0A1628]"
                        />
                        <div className="grid grid-cols-5 gap-2">
                          <Input
                            placeholder="City"
                            value={addrCity}
                            onChange={e => setAddrCity(e.target.value)}
                            className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#0A1628] col-span-2"
                          />
                          <Input
                            placeholder="ST"
                            value={addrState}
                            onChange={e => setAddrState(e.target.value)}
                            maxLength={2}
                            className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#0A1628] col-span-1"
                          />
                          <Input
                            placeholder="ZIP"
                            value={addrZip}
                            onChange={e => setAddrZip(e.target.value)}
                            className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#0A1628] col-span-2"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Label className="text-sm text-gray-600 whitespace-nowrap">Service radius:</Label>
                          <Select value={serviceRadius} onValueChange={setServiceRadius}>
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900 flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-200">
                              {["10","15","25","35","50","75","100","150"].map(r => (
                                <SelectItem key={r} value={r}>{r} miles</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {errors.serviceArea && <p className="text-red-400 text-xs mt-1">{errors.serviceArea.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="website" className="text-sm font-medium text-gray-700 mb-1.5 block">Website <span className="text-gray-600 font-normal">(optional)</span></Label>
                      <Input id="website" placeholder="https://yourbusiness.com" {...register("website")} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#0A1628]" />
                      {errors.website && <p className="text-red-400 text-xs mt-1">{errors.website.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1.5 block">Tell us about your business <span className="text-gray-600 font-normal">(optional)</span></Label>
                      <Textarea id="description" placeholder="How long have you been operating? What makes your work stand out?" rows={3} {...register("description")} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#0A1628] resize-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-4">Your Contact Information</p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contactName" className="text-sm font-medium text-gray-700 mb-1.5 block">Your Full Name <span className="text-red-400">*</span></Label>
                      <Input id="contactName" placeholder="First and last name" {...register("contactName")} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#0A1628]" />
                      {errors.contactName && <p className="text-red-400 text-xs mt-1">{errors.contactName.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address <span className="text-red-400">*</span></Label>
                        <Input id="contactEmail" type="email" placeholder="you@yourbusiness.com" {...register("contactEmail")} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#0A1628]" />
                        {errors.contactEmail && <p className="text-red-400 text-xs mt-1">{errors.contactEmail.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="contactPhone" className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number <span className="text-gray-600 font-normal">(optional)</span></Label>
                        <Input id="contactPhone" type="tel" placeholder="(555) 000-0000" {...register("contactPhone")} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#0A1628]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <input
                    type="checkbox"
                    id="partnerAgreement"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#0A1628] cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="partnerAgreement" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                    I have read and agree to the{" "}
                    <Link href="/terms"><span className="text-[#0A1628] font-semibold underline">ProLnk Partner Agreement</span></Link>
                    {" "}and{" "}
                    <Link href="/privacy"><span className="text-[#0A1628] font-semibold underline">Privacy Policy</span></Link>.
                    I confirm that I am a licensed home service professional operating in my listed service area.
                  </label>
                </div>

                <Button type="submit" disabled={applyMutation.isPending} className="w-full py-4 text-base font-bold bg-[#0A1628] hover:bg-[#0A1628]/80 text-white rounded-xl flex items-center justify-center gap-2">
                  {applyMutation.isPending ? <span>Submitting...</span> : <><span>Submit Application</span><ArrowRight className="w-5 h-5" /></>}
                </Button>

                <div className="flex items-center justify-center gap-6 pt-2">
                  {["Secure & encrypted", "Free to apply", "24-hr response"].map((label, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /><span>{label}</span>
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
