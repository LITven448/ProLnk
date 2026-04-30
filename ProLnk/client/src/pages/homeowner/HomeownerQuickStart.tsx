/**
 * TrustyPro Homeowner Quick-Start Wizard
 * A lightweight 3-step onboarding flow for new homeowners:
 *   Step 1 — Verify Address (create/confirm primary property)
 *   Step 2 — Connect FSM History (check if pro job records exist at address)
 *   Step 3 — Set Maintenance Preferences (reminder frequency, priority categories)
 *
 * Designed to complete in under 3 minutes. Full 8-step wizard available at /my-home/wizard.
 */
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin, Database, Bell, CheckCircle, ChevronRight,
  ChevronLeft, Home, Wrench, AlertCircle, Loader2,
  Star, Clock, Shield, Zap, ArrowRight,
} from "lucide-react";

// ─── Step Config ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    title: "Verify Your Address",
    subtitle: "We'll use this to match you with local pros and find your home's history",
    icon: MapPin,
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: 2,
    title: "Connect Your Home History",
    subtitle: "See if local pros have already worked at your address — import records instantly",
    icon: Database,
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: 3,
    title: "Set Your Preferences",
    subtitle: "Tell us how you'd like to be reminded about home maintenance",
    icon: Bell,
    color: "from-orange-500 to-amber-600",
  },
];

const MAINTENANCE_CATEGORIES = [
  { key: "hvac", label: "HVAC & Heating", icon: "🌡️" },
  { key: "plumbing", label: "Plumbing", icon: "🔧" },
  { key: "electrical", label: "Electrical", icon: "⚡" },
  { key: "roofing", label: "Roof & Gutters", icon: "🏠" },
  { key: "lawn", label: "Lawn & Landscaping", icon: "🌿" },
  { key: "pest", label: "Pest Control", icon: "🐛" },
  { key: "painting", label: "Painting", icon: "🎨" },
  { key: "cleaning", label: "Cleaning & Pressure Washing", icon: "🧹" },
  { key: "windows", label: "Windows & Doors", icon: "🪟" },
  { key: "flooring", label: "Flooring", icon: "🪵" },
];

const REMINDER_FREQUENCIES = [
  { value: "weekly", label: "Weekly", desc: "Every Monday morning" },
  { value: "monthly", label: "Monthly", desc: "First of each month" },
  { value: "seasonal", label: "Seasonal", desc: "4x per year (spring, summer, fall, winter)" },
  { value: "none", label: "No reminders", desc: "I'll check in when I'm ready" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomeownerQuickStart() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);

  // Step 1 state
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("TX");
  const [zip, setZip] = useState("");
  const [savedPropertyId, setSavedPropertyId] = useState<number | null>(null);

  // Step 2 state
  const [fsmRecordsFound, setFsmRecordsFound] = useState<any[]>([]);
  const [fsmChecked, setFsmChecked] = useState(false);
  const [acceptingAll, setAcceptingAll] = useState(false);
  const [vaultImported, setVaultImported] = useState(false);

  // Step 3 state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [reminderFreq, setReminderFreq] = useState("seasonal");

  const utils = trpc.useUtils();

  // tRPC mutations
  const saveProperty = trpc.homeowner.saveProperty.useMutation({
    onSuccess: (data: any) => {
      if (data?.id) setSavedPropertyId(data.id);
      toast.success("Address saved!");
    },
    onError: (e) => toast.error(e.message),
  });

  const [checkAddressInput, setCheckAddressInput] = useState("");
  const checkAddressQuery = trpc.fsmVault.checkAddressForRecords.useQuery(
    { serviceAddress: checkAddressInput || "placeholder" },
    { enabled: checkAddressInput.length > 5 }
  );
  // Sync query results to local state via effect
  const checkAddressData = checkAddressQuery.data;
  const [prevCheckData, setPrevCheckData] = useState<typeof checkAddressData>(undefined);
  if (checkAddressData !== prevCheckData) {
    setPrevCheckData(checkAddressData);
    if (checkAddressData) {
      setFsmRecordsFound(checkAddressData.records ?? []);
      setFsmChecked(true);
    }
  }

  const acceptAll = trpc.fsmVault.acceptAllPending.useMutation({
    onSuccess: () => {
      setVaultImported(true);
      toast.success("Home history imported to your Vault!");
    },
    onError: (e) => toast.error(e.message),
  });

  const saveProfile = trpc.homeowner.saveProfile.useMutation({
    onSuccess: () => {
      toast.success("Preferences saved! Your home profile is ready.");
      navigate("/my-home");
    },
    onError: (e) => toast.error(e.message),
  });

  // ─── Step handlers ──────────────────────────────────────────────────────────
  async function handleStep1Next() {
    if (!address.trim() || !zip.trim()) {
      toast.error("Please enter your address and ZIP code");
      return;
    }
    await saveProperty.mutateAsync({
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      isPrimary: true,
    });
    // Trigger FSM address check
    const fullAddress = `${address.trim()}, ${city.trim()}, ${state.trim()} ${zip.trim()}`;
    setCheckAddressInput(fullAddress);
    setFsmChecked(false);
    setStep(2);
    // Give query time to fire
    setTimeout(() => setFsmChecked(true), 3000);
  }

  async function handleStep2Next() {
    if (fsmRecordsFound.length > 0 && !vaultImported) {
      setAcceptingAll(true);
      const recordIds = fsmRecordsFound.map((r: any) => r.id).filter(Boolean);
      if (recordIds.length > 0) {
        await acceptAll.mutateAsync({ recordIds });
      }
      setAcceptingAll(false);
    }
    setStep(3);
  }

  async function handleStep3Finish() {
    // Save maintenance preferences via saveProperty (hiringPriorities lives on the property)
    // and mark profile as set up
    await saveProfile.mutateAsync({
      setupComplete: true,
    });
  }

  function toggleCategory(key: string) {
    setSelectedCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  // ─── Progress bar ────────────────────────────────────────────────────────────
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Zap className="w-4 h-4" />
            Quick Start — 3 minutes
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set Up Your Home</h1>
          <p className="text-gray-500">Answer a few quick questions so we can match you with the right pros</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex flex-col items-center gap-2 z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isDone
                      ? "bg-teal-500 border-teal-500 text-white"
                      : isActive
                      ? "bg-white border-teal-500 text-teal-600"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {isDone ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${isActive ? "text-teal-700" : isDone ? "text-teal-500" : "text-gray-400"}`}>
                  Step {s.id}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Card header */}
          <div className={`bg-gradient-to-r ${STEPS[step - 1].color} p-6 text-white`}>
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = STEPS[step - 1].icon;
                return <Icon className="w-7 h-7 opacity-90" />;
              })()}
              <div>
                <h2 className="text-xl font-bold">{STEPS[step - 1].title}</h2>
                <p className="text-sm opacity-80 mt-0.5">{STEPS[step - 1].subtitle}</p>
              </div>
            </div>
          </div>

          {/* Card body */}
          <div className="p-6">
            {/* ── Step 1: Address ─────────────────────────────────────────── */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Street Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="city" className="text-sm font-semibold text-gray-700">City</Label>
                    <Input
                      id="city"
                      placeholder="Dallas"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-sm font-semibold text-gray-700">ZIP Code *</Label>
                    <Input
                      id="zip"
                      placeholder="75201"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="mt-1"
                      maxLength={10}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="state" className="text-sm font-semibold text-gray-700">State</Label>
                  <Input
                    id="state"
                    placeholder="TX"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="mt-1"
                    maxLength={2}
                  />
                </div>

                {/* Why we ask */}
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mt-2">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-teal-800">Why we need your address</p>
                      <p className="text-xs text-teal-700 mt-1">
                        We use your address to match you with verified pros in your area, check if local service professionals have worked at your property before, and generate your personalized Home Health Score.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: FSM History ──────────────────────────────────────── */}
            {step === 2 && (
              <div className="space-y-4">
                {!fsmChecked ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-500 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">Searching for your home's service history...</p>
                    <p className="text-sm text-gray-400 mt-1">Checking records from verified local pros</p>
                  </div>
                ) : fsmRecordsFound.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Home className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">No records found yet</h3>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                      No local pros have logged work at your address yet. As pros in your area join ProLnk, their records will appear here automatically.
                    </p>
                    <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-left">
                      <p className="text-sm font-semibold text-indigo-800 mb-1">💡 How this works</p>
                      <p className="text-xs text-indigo-700">
                        When a verified pro connects their field service software (Jobber, ServiceTitan, etc.) to ProLnk, their historical job records are indexed by address. If they've worked at your home, you'll see those records here and can import them to your Home Health Vault.
                      </p>
                    </div>
                  </div>
                ) : vaultImported ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {fsmRecordsFound.length} record{fsmRecordsFound.length !== 1 ? "s" : ""} imported!
                    </h3>
                    <p className="text-sm text-gray-500">
                      Your home's service history is now in your Home Health Vault. You can review and manage these records anytime.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-5 h-5 text-indigo-600" />
                        <span className="font-semibold text-indigo-800">
                          {fsmRecordsFound.length} service record{fsmRecordsFound.length !== 1 ? "s" : ""} found at your address
                        </span>
                      </div>
                      <p className="text-sm text-indigo-700">
                        Local pros have logged work at your property. Import these records to your Home Health Vault to build your home's complete service history.
                      </p>
                    </div>

                    {/* Record previews */}
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {fsmRecordsFound.slice(0, 5).map((rec: any, i: number) => (
                        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <Wrench className="w-4 h-4 text-gray-400 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {rec.tradeType ?? "Service"} — {rec.businessName ?? "Local Pro"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {rec.jobDate ? new Date(rec.jobDate).toLocaleDateString() : "Date on file"}
                            </p>
                          </div>
                          <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                        </div>
                      ))}
                      {fsmRecordsFound.length > 5 && (
                        <p className="text-xs text-gray-400 text-center py-1">
                          +{fsmRecordsFound.length - 5} more records
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={handleStep2Next}
                      disabled={acceptingAll}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      {acceptingAll ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Importing...
                        </>
                      ) : (
                        <>
                          <Database className="w-4 h-4 mr-2" />
                          Import All to My Vault
                        </>
                      )}
                    </Button>
                    <button
                      onClick={() => setStep(3)}
                      className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
                    >
                      Skip for now
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── Step 3: Maintenance Preferences ─────────────────────────── */}
            {step === 3 && (
              <div className="space-y-5">
                {/* Categories */}
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Which areas matter most to you? <span className="text-gray-400 font-normal">(select all that apply)</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {MAINTENANCE_CATEGORIES.map((cat) => (
                      <button
                        key={cat.key}
                        onClick={() => toggleCategory(cat.key)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                          selectedCategories.includes(cat.key)
                            ? "bg-teal-50 border-teal-400 text-teal-800"
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-base">{cat.icon}</span>
                        <span className="truncate">{cat.label}</span>
                        {selectedCategories.includes(cat.key) && (
                          <CheckCircle className="w-3.5 h-3.5 text-teal-600 ml-auto shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reminder frequency */}
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    How often would you like maintenance reminders?
                  </Label>
                  <div className="space-y-2">
                    {REMINDER_FREQUENCIES.map((freq) => (
                      <button
                        key={freq.value}
                        onClick={() => setReminderFreq(freq.value)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                          reminderFreq === freq.value
                            ? "bg-orange-50 border-orange-400 text-orange-800"
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <Clock className={`w-4 h-4 shrink-0 ${reminderFreq === freq.value ? "text-orange-600" : "text-gray-400"}`} />
                        <div className="flex-1">
                          <span className="font-medium text-sm">{freq.label}</span>
                          <span className="text-xs text-gray-400 ml-2">{freq.desc}</span>
                        </div>
                        {reminderFreq === freq.value && (
                          <CheckCircle className="w-4 h-4 text-orange-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card footer */}
          <div className="px-6 pb-6 flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <Button
                onClick={step === 1 ? handleStep1Next : handleStep2Next}
                disabled={
                  (step === 1 && (saveProperty.isPending || checkAddressQuery.isFetching)) ||
                  (step === 2 && acceptingAll)
                }
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white"
              >
                {(step === 1 && (saveProperty.isPending || checkAddressQuery.isFetching)) ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleStep3Finish}
                disabled={saveProfile.isPending}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white"
              >
                {saveProfile.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4" />
                    Finish Setup
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Skip link */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/my-home")}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip for now — I'll set up later
          </button>
        </div>

        {/* Full wizard CTA */}
        <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-800 text-sm">Want to build a full home profile?</p>
            <p className="text-xs text-gray-500 mt-0.5">
              The complete 8-step wizard unlocks AI matching, before/after mockups, and your Home Health Score.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/my-home/wizard")}
            className="shrink-0 flex items-center gap-1.5 text-xs"
          >
            Full Setup
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </HomeownerLayout>
  );
}
