import { useState, type FormEvent } from "react";
import { useLocation, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft, Shield, BadgeCheck, CalendarDays, Clock,
  FileText, User, Mail, Phone, CheckCircle, Loader2,
  ChevronDown, Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SERVICE_TYPES = [
  "HVAC Repair / Replacement",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Lawn Care",
  "Pest Control",
  "Pressure Washing",
  "Handyman",
  "Fencing",
  "Gutters",
  "Painting",
  "Landscaping",
  "Pool Service",
  "Window Cleaning",
  "Tree Service",
  "Concrete / Flatwork",
  "Flooring",
  "Insulation",
  "Drywall",
  "Other",
];

const TIME_SLOTS = [
  "Morning (8 am – 12 pm)",
  "Afternoon (12 pm – 5 pm)",
  "Evening (5 pm – 8 pm)",
  "Flexible / Anytime",
];

function useQueryParam(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) ?? "";
}

function avatarColor(id: string) {
  const colors = ["#1B4FD8", "#0d9488", "#7c3aed", "#d97706", "#059669", "#0891b2"];
  let h = 0;
  for (let i = 0; i < id.length; i++) h = id.charCodeAt(i) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
}

export default function BookPro() {
  const [, navigate] = useLocation();
  const proId = useQueryParam("pro");
  const serviceParam = useQueryParam("service");

  const { data: proData } = trpc.directory.getApprovedPartners.useQuery(undefined, {
    select: (partners) => partners.find((p) => String(p.id) === proId),
    enabled: !!proId,
  });

  const submitMutation = trpc.waitlist.joinHomeWaitlist.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err) => {
      if (err.message?.includes("already registered")) {
        toast.error("This email is already on the waitlist. We'll match you when we launch.");
        setSubmitted(true);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Dallas",
    state: "TX",
    zipCode: "",
    serviceNeeded: serviceParam || "",
    date: "",
    timeSlot: TIME_SLOTS[3],
    description: "",
  });

  const proName = proData?.businessName ?? (proId ? `Pro #${proId}` : "a TrustyPro Professional");
  const proTrade = proData?.businessType ?? serviceParam ?? "Home Services";
  const proArea = proData?.serviceArea ?? "DFW";

  function set(field: keyof typeof form, val: string) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.address || !form.zipCode || !form.serviceNeeded) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const descriptionNote = [
      form.description ? `Note: ${form.description}` : "",
      form.date ? `Preferred date: ${form.date}` : "",
      form.timeSlot ? `Preferred time: ${form.timeSlot}` : "",
      proId ? `Requested pro ID: ${proId}` : "",
    ].filter(Boolean).join(" | ");

    submitMutation.mutate({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone || undefined,
      address: form.address,
      city: form.city,
      state: form.state,
      zipCode: form.zipCode,
      serviceNeeded: `${form.serviceNeeded}${descriptionNote ? ` — ${descriptionNote}` : ""}`,
    });
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#F8FAFF" }}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-9 h-9 text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Request Sent!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Your quote request has been sent to <span className="font-semibold text-gray-800">{proName}</span>.
            You'll hear back within 24 hours.
          </p>
          <div className="rounded-xl p-4 text-sm text-left space-y-2" style={{ backgroundColor: "#EFF6FF" }}>
            <div className="flex items-center gap-2 text-gray-700">
              <BadgeCheck className="w-4 h-4 text-blue-500" />
              Pro is background-checked & insured
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Shield className="w-4 h-4 text-blue-500" />
              Your info is only shared with this pro
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-blue-500" />
              Average response time: 2–4 hours
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <Button
              className="w-full text-white"
              style={{ backgroundColor: "#1B4FD8" }}
              onClick={() => navigate("/trustypro/pros")}
            >
              Browse More Pros
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/trustypro")}>
              Back to TrustyPro
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFF" }}>
      <Helmet>
        <title>Request a Quote — TrustyPro</title>
      </Helmet>

      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate("/trustypro/pros")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </button>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" style={{ color: "#1B4FD8" }} />
            <span className="font-bold text-gray-900 text-sm">Request a Quote</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Pro card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Sending quote request to</p>
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-xl flex-shrink-0"
              style={{ backgroundColor: avatarColor(proId || "default") }}
            >
              {proName[0]?.toUpperCase() ?? "P"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-gray-900">{proName}</p>
                <BadgeCheck className="w-4 h-4 text-blue-500" />
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">Verified</span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{proTrade}</p>
              <p className="text-xs text-gray-400 mt-0.5">{proArea}</p>
            </div>
            <Link href={proId ? `/partner/${proId}` : "/trustypro/pros"}>
              <button className="text-xs text-blue-600 hover:underline whitespace-nowrap">View Profile →</button>
            </Link>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Service */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-bold text-gray-900">Service Details</h2>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Service Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={form.serviceNeeded}
                  onChange={(e) => set("serviceNeeded", e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 appearance-none bg-white transition-colors"
                >
                  <option value="">Select a service...</option>
                  {SERVICE_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description of Work Needed</label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Describe what you need done — the more detail, the better the quote..."
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Scheduling */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <CalendarDays className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-bold text-gray-900">Preferred Schedule</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Preferred Date (optional)</label>
                <Input
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => set("date", e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Preferred Time</label>
                <div className="relative">
                  <select
                    value={form.timeSlot}
                    onChange={(e) => set("timeSlot", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 appearance-none bg-white transition-colors"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-bold text-gray-900">Your Contact Info</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  placeholder="Jane"
                  required
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  placeholder="Smith"
                  required
                  className="text-sm"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="jane@example.com"
                    required
                    className="pl-9 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone (optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="(214) 555-0123"
                    className="pl-9 text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Service Address <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-2">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder="1234 Maple St"
                  required
                  className="pl-9 text-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <Input
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="City"
                    required
                    className="text-sm"
                  />
                </div>
                <div>
                  <Input
                    value={form.state}
                    onChange={(e) => set("state", e.target.value)}
                    placeholder="TX"
                    maxLength={2}
                    required
                    className="text-sm"
                  />
                </div>
                <div>
                  <Input
                    value={form.zipCode}
                    onChange={(e) => set("zipCode", e.target.value)}
                    placeholder="75001"
                    required
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 text-xs text-gray-500 space-y-1" style={{ backgroundColor: "#EFF6FF" }}>
            <div className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-blue-500" /> Your info is shared only with this pro</div>
            <div className="flex items-center gap-2"><BadgeCheck className="w-3.5 h-3.5 text-blue-500" /> All TrustyPro pros are background-checked & insured</div>
            <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-blue-500" /> No payment required — this is a free quote request</div>
          </div>

          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full text-white font-bold text-base h-12 rounded-xl gap-2"
            style={{ backgroundColor: "#1B4FD8" }}
          >
            {submitMutation.isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending Request...</>
            ) : (
              <><CalendarDays className="w-4 h-4" /> Send Quote Request to {proName}</>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
