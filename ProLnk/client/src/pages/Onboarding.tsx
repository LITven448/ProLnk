import { useState } from "react";
import ProLnkLogo from "@/components/ProLnkLogo";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { CheckCircle, ChevronRight, ChevronLeft, Building2, MapPin, Tag, User, CreditCard, Rocket } from "lucide-react";


const STEPS = [
  { id: 1, label: "Business Info", icon: Building2 },
  { id: 2, label: "Service Area", icon: MapPin },
  { id: 3, label: "Categories", icon: Tag },
  { id: 4, label: "Contact", icon: User },
  { id: 5, label: "Go Live", icon: Rocket },
];

const SERVICE_CATEGORIES = [
  "Lawn Care & Mowing", "Landscaping & Design", "Tree Service & Trimming",
  "Pest Control", "Pool Service & Cleaning", "Pressure Washing",
  "Window Cleaning", "Gutter Cleaning", "Roof Cleaning",
  "Fence & Gate Repair", "Handyman Services", "Painting (Interior)",
  "Painting (Exterior)", "Flooring Installation", "Tile & Grout",
  "Plumbing", "Electrical", "HVAC & AC Repair",
  "Appliance Repair", "Garage Door Repair", "Locksmith",
  "Security Systems", "Solar Installation", "Roofing",
  "Foundation Repair", "Waterproofing", "Insulation",
  "Drywall & Patching", "Deck & Patio", "Concrete & Flatwork",
  "Junk Removal", "Moving Services", "House Cleaning",
  "Carpet Cleaning", "Upholstery Cleaning", "Mold Remediation",
  "Water Damage Restoration", "Fire Damage Restoration", "Chimney Sweep",
  "Dryer Vent Cleaning", "Air Duct Cleaning", "Garage Organization",
  "Water Filtration & Softeners", "Pet Waste Removal", "Dog Training",
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    serviceArea: "",
    serviceRadiusMiles: 15,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    description: "",
    selectedCategories: [] as string[],
  });

  const submitMutation = trpc.partners.submitApplication.useMutation({
    onSuccess: () => setStep(5),
  });

  const update = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleCategory = (cat: string) => {
    setForm((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(cat)
        ? prev.selectedCategories.filter((c) => c !== cat)
        : [...prev.selectedCategories, cat],
    }));
  };

  const handleSubmit = () => {
    submitMutation.mutate({
      businessName: form.businessName,
      businessType: form.selectedCategories[0] ?? form.businessType,
      serviceArea: form.serviceArea,
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      website: form.website,
      description: form.description,
    });
  };

  const canProceed = () => {
    if (step === 1) return form.businessName.length >= 2;
    if (step === 2) return form.serviceArea.length >= 3;
    if (step === 3) return form.selectedCategories.length > 0;
    if (step === 4) return form.contactName.length >= 2 && form.contactEmail.includes("@");
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <ProLnkLogo height={28} variant="light" className="shrink-0" />
        <span className="text-sm text-gray-400">Partner Onboarding</span>
      </header>

      {/* Progress steps */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center gap-2 ${step === s.id ? "opacity-100" : step > s.id ? "opacity-70" : "opacity-30"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step > s.id ? "bg-[#0A1628] text-white" : step === s.id ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {step > s.id ? <CheckCircle className="w-4 h-4" /> : s.id}
                </div>
                <span className={`hidden sm:block text-xs font-medium ${step === s.id ? "text-[#0A1628]" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-2 ${step > s.id ? "bg-[#0A1628]/80" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Step 1: Business Info */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#0A1628]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Tell us about your business</h2>
                  <p className="text-sm text-gray-500">This is what other partners and homeowners will see</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) => update("businessName", e.target.value)}
                    placeholder="e.g. Green Thumb Lawn Care"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website (optional)</label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Description (optional)</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Briefly describe your services, years in business, and what makes you stand out..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Service Area */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Where do you work?</h2>
                  <p className="text-sm text-gray-500">We'll only send you leads within your service area</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Service City / Zip Code *</label>
                  <input
                    type="text"
                    value={form.serviceArea}
                    onChange={(e) => update("serviceArea", e.target.value)}
                    placeholder="e.g. Frisco, TX or 75034"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Radius: <span className="text-[#0A1628] font-semibold">{form.serviceRadiusMiles} miles</span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={5}
                    value={form.serviceRadiusMiles}
                    onChange={(e) => update("serviceRadiusMiles", Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5 mi</span><span>25 mi</span><span>50 mi</span>
                  </div>
                </div>
                <div className="bg-[#F5E642]/10 rounded-xl p-4 text-sm text-[#0A1628]">
                  <strong>Tip:</strong> A 15-mile radius is the sweet spot for most DFW partners -- enough coverage to stay busy without driving too far between jobs.
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Categories */}
          {step === 3 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">What services do you offer?</h2>
                  <p className="text-sm text-gray-500">Select all that apply -- you'll receive leads for these categories</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto pr-1">
                {SERVICE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      form.selectedCategories.includes(cat)
                        ? "bg-[#0A1628] text-white border-[#0A1628]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#0A1628]/30 hover:text-[#0A1628]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {form.selectedCategories.length > 0 && (
                <p className="text-xs text-[#0A1628] mt-3 font-medium">
                  {form.selectedCategories.length} categor{form.selectedCategories.length === 1 ? "y" : "ies"} selected
                </p>
              )}
            </div>
          )}

          {/* Step 4: Contact */}
          {step === 4 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Your contact info</h2>
                  <p className="text-sm text-gray-500">How ProLnk will reach you with leads and commission updates</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={form.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    placeholder="you@yourbusiness.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (optional)</label>
                  <input
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)}
                    placeholder="(214) 555-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500">
                  <strong className="text-gray-700">Privacy note:</strong> Your contact info is never shared with homeowners. It's only used for lead notifications and commission payouts.
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F5E642]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#0A1628]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">
                Your application is under review. Most applications are approved within 24 hours. We'll email you at <strong>{form.contactEmail}</strong> once you're live.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                {[
                  { step: "1", label: "Application submitted", done: true },
                  { step: "2", label: "ProLnk review (24h)", done: false },
                  { step: "3", label: "Go live & start earning", done: false },
                ].map((s) => (
                  <div key={s.step} className={`p-3 rounded-xl ${s.done ? "bg-[#F5E642]/10" : "bg-gray-50"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2 ${s.done ? "bg-[#0A1628] text-white" : "bg-gray-200 text-gray-500"}`}>
                      {s.done ? "" : s.step}
                    </div>
                    <p className="text-xs text-gray-600">{s.label}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setLocation("/dashboard")}
                className="px-6 py-3 rounded-xl text-white text-sm font-medium"
                style={{ backgroundColor: "#0A1628" }}
              >
                View My Dashboard
              </button>
            </div>
          )}

          {/* Navigation */}
          {step < 5 && (
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              {step < 4 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#0A1628" }}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || submitMutation.isPending}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#0A1628" }}
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                  <Rocket className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
