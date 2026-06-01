import { useState, useMemo } from "react";
import type { ChangeEvent } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { SERVICE_CATEGORIES, SERVICE_GROUPS } from "../../../shared/serviceCategories";
import { AddressAutofill } from "@/components/AddressAutofill";
import { CheckCircle, Copy, Crown, ArrowRight, TrendingUp } from "lucide-react";

const NAVY = "#0A1628";
const YELLOW = "#F5E642";

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0A1628]/30 bg-white";
const labelCls = "text-xs font-semibold text-gray-600 mb-1 block";

const TRADE_GROUPS = SERVICE_GROUPS.map((group) => ({
  group,
  trades: SERVICE_CATEGORIES.filter(
    (c: { group: string; name: string }) => c.group === group
  ).map((c: { group: string; name: string }) => c.name),
}));

function getInboundRefCode(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const p = new URLSearchParams(window.location.search);
  return (
    p.get("ref") ||
    p.get("referredBy") ||
    localStorage.getItem("prolnk_referral_code") ||
    undefined
  );
}

type Step1Result = {
  id?: number;
  position?: number;
  tier?: string;
  tierLabel?: string;
  referralCode?: string;
};

export default function ProSignup2Step() {
  const [phase, setPhase] = useState<"step1" | "success">("step1");

  // --- Step 1 (required) state ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [trade, setTrade] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  // --- Result of step 1 ---
  const [result, setResult] = useState<Step1Result | null>(null);
  const [referralLink, setReferralLink] = useState("");

  // --- Step 2 (optional) state ---
  const [businessName, setBusinessName] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [estimatedJobsPerMonth, setEstimatedJobsPerMonth] = useState("");
  const [avgJobValue, setAvgJobValue] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [insuranceCarrier, setInsuranceCarrier] = useState("");
  const [additionalTrades, setAdditionalTrades] = useState<string[]>([]);
  const [additionalZips, setAdditionalZips] = useState("");
  const [step2Done, setStep2Done] = useState(false);

  const refCode = useMemo(() => getInboundRefCode(), []);

  const join = trpc.waitlist.joinProWaitlist.useMutation({
    onSuccess: (data, vars) => {
      const base = typeof window !== "undefined" ? window.location.origin : "https://prolnk.xyz";
      const code =
        (data as { referralCode?: string })?.referralCode ||
        btoa(vars.email).replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
      if (typeof window !== "undefined") {
        localStorage.setItem("prolnk_referral_code", code);
        localStorage.setItem("prolnk_user_email", vars.email);
      }
      setReferralLink(`${base}/join?ref=${code}`);
      setResult({ ...(data as Step1Result), referralCode: code });
      setPhase("success");
    },
    onError: (e: { message?: string }) => toast.error(e.message || "Something went wrong."),
  });

  const enrich = trpc.waitlist.updateProWaitlistProfile.useMutation({
    onSuccess: () => {
      setStep2Done(true);
      toast.success("Profile saved — you just moved up the ranking!");
    },
    onError: (e: { message?: string }) => toast.error(e.message || "Could not save profile."),
  });

  const submitStep1 = () => {
    if (!firstName.trim()) return toast.error("First name is required.");
    if (!email.trim()) return toast.error("Email is required.");
    if (phone.replace(/\D/g, "").length < 7) return toast.error("Please enter a valid phone number.");
    if (!trade) return toast.error("Please select your primary trade.");
    const stateNorm = state.trim().toUpperCase().slice(0, 2);
    if (!city.trim()) return toast.error("Please enter your service city/area.");
    if (!/^[A-Z]{2}$/.test(stateNorm)) return toast.error("Please enter a valid 2-letter state (e.g. TX).");

    join.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim() || firstName.trim(),
      email: email.trim().toLowerCase(),
      phone,
      trade,
      primaryCity: city.trim(),
      primaryState: stateNorm,
      referredBy: refCode,
    });
  };

  const submitStep2 = () => {
    if (!result) return;
    const zips = additionalZips
      .split(/[,\s]+/)
      .map((z) => z.trim())
      .filter(Boolean);
    enrich.mutate({
      email: email.trim().toLowerCase(),
      id: result.id,
      businessName: businessName.trim() || undefined,
      yearsInBusiness: yearsInBusiness ? Number(yearsInBusiness) : undefined,
      employeeCount: employeeCount || undefined,
      estimatedJobsPerMonth: estimatedJobsPerMonth ? Number(estimatedJobsPerMonth) : undefined,
      avgJobValue: avgJobValue || undefined,
      licenseNumber: licenseNumber.trim() || undefined,
      insuranceCarrier: insuranceCarrier.trim() || undefined,
      trades: additionalTrades.length ? [trade, ...additionalTrades] : undefined,
      serviceZipCodes: [zip, ...zips].filter(Boolean).length ? [zip, ...zips].filter(Boolean) : undefined,
    });
  };

  const set =
    (fn: (v: string) => void) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      fn(e.target.value);

  const toggleAddlTrade = (name: string) => {
    if (name === trade) return;
    setAdditionalTrades((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  // ---------------- SUCCESS / STEP 2 ----------------
  if (phase === "success" && result) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: NAVY }}>
              You're on the list!
            </h2>
            {typeof result.position === "number" && (
              <p className="text-gray-500 text-sm mt-1">
                Position <span className="font-bold" style={{ color: NAVY }}>#{result.position}</span>
                {result.tierLabel ? (
                  <>
                    {" "}·{" "}
                    <span className="inline-flex items-center gap-1 font-semibold" style={{ color: NAVY }}>
                      <Crown className="w-3.5 h-3.5" style={{ color: YELLOW }} />
                      {result.tierLabel}
                    </span>
                  </>
                ) : null}
              </p>
            )}
          </div>

          <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: NAVY }}>
            <div className="text-[10px] font-black tracking-widest uppercase mb-2" style={{ color: YELLOW }}>
              Your referral link — share it to move up
            </div>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={referralLink}
                className="flex-1 bg-white/10 text-white text-xs rounded px-3 py-2 font-mono outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                  toast.success("Link copied!");
                }}
                className="shrink-0 px-3 py-2 rounded text-xs font-bold"
                style={{ backgroundColor: YELLOW, color: NAVY }}
              >
                <Copy className="w-3.5 h-3.5 inline mr-1" />
                Copy
              </button>
            </div>
            {result.referralCode && (
              <div className="text-white/60 text-[11px] mt-2">
                Code: <span className="font-mono text-white/90">{result.referralCode}</span>
              </div>
            )}
          </div>

          {step2Done ? (
            <div className="text-center py-4">
              <TrendingUp className="w-7 h-7 mx-auto mb-2 text-green-600" />
              <p className="font-semibold" style={{ color: NAVY }}>Profile complete.</p>
              <p className="text-gray-500 text-sm">
                We'll be in touch as we open access in your area.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" style={{ color: NAVY }} />
                <h3 className="text-sm font-bold" style={{ color: NAVY }}>
                  Complete your profile to rank higher
                </h3>
              </div>
              <p className="text-gray-500 text-xs mb-4">
                Optional — but verified, complete profiles get priority access. Takes 60 seconds.
              </p>

              <div className="space-y-3">
                <div>
                  <label className={labelCls}>Business name</label>
                  <input value={businessName} onChange={set(setBusinessName)} className={inputCls} placeholder="Acme Plumbing LLC" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Years in business</label>
                    <input type="number" min={0} value={yearsInBusiness} onChange={set(setYearsInBusiness)} className={inputCls} placeholder="5" />
                  </div>
                  <div>
                    <label className={labelCls}>Team size</label>
                    <select value={employeeCount} onChange={set(setEmployeeCount)} className={inputCls}>
                      <option value="">Select…</option>
                      <option value="1">Just me</option>
                      <option value="2-5">2–5</option>
                      <option value="6-15">6–15</option>
                      <option value="16-50">16–50</option>
                      <option value="50+">50+</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Jobs / month</label>
                    <input type="number" min={0} value={estimatedJobsPerMonth} onChange={set(setEstimatedJobsPerMonth)} className={inputCls} placeholder="20" />
                  </div>
                  <div>
                    <label className={labelCls}>Avg job value</label>
                    <select value={avgJobValue} onChange={set(setAvgJobValue)} className={inputCls}>
                      <option value="">Select…</option>
                      <option value="$0-$500">$0–$500</option>
                      <option value="$500-$1k">$500–$1k</option>
                      <option value="$1k-$5k">$1k–$5k</option>
                      <option value="$5k-$15k">$5k–$15k</option>
                      <option value="$15k+">$15k+</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>License #</label>
                    <input value={licenseNumber} onChange={set(setLicenseNumber)} className={inputCls} placeholder="Optional" />
                  </div>
                  <div>
                    <label className={labelCls}>Insurance carrier</label>
                    <input value={insuranceCarrier} onChange={set(setInsuranceCarrier)} className={inputCls} placeholder="Optional" />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Additional service zips (comma separated)</label>
                  <input value={additionalZips} onChange={set(setAdditionalZips)} className={inputCls} placeholder="75001, 75002" />
                </div>
                <div>
                  <label className={labelCls}>Additional trades</label>
                  <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2 space-y-2">
                    {TRADE_GROUPS.map(({ group, trades }) => (
                      <div key={group}>
                        <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">{group}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {trades.map((name) => {
                            const active = additionalTrades.includes(name) || name === trade;
                            return (
                              <button
                                key={name}
                                type="button"
                                onClick={() => toggleAddlTrade(name)}
                                disabled={name === trade}
                                className={`text-[11px] px-2 py-1 rounded-full border transition-colors ${
                                  active
                                    ? "border-[#0A1628] bg-[#0A1628] text-white"
                                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                                } ${name === trade ? "opacity-60 cursor-default" : ""}`}
                              >
                                {name}
                                {name === trade ? " (primary)" : ""}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setStep2Done(true)}
                  className="flex-1 py-3 rounded-lg text-sm font-semibold text-gray-500 hover:text-gray-700 border border-gray-200"
                >
                  Skip for now
                </button>
                <button
                  onClick={submitStep2}
                  disabled={enrich.isPending}
                  className="flex-[2] py-3 rounded-lg text-sm font-bold disabled:opacity-50"
                  style={{ backgroundColor: YELLOW, color: NAVY }}
                >
                  {enrich.isPending ? "Saving…" : "Save & rank higher"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ---------------- STEP 1 ----------------
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-6 h-1.5 rounded-full" style={{ backgroundColor: NAVY }} />
          <span className="w-6 h-1.5 rounded-full bg-gray-200" />
          <span className="text-[11px] text-gray-400 ml-2 font-medium">Step 1 of 2</span>
        </div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: NAVY }}>
          Claim your spot
        </h2>
        <p className="text-gray-500 text-sm mb-5">
          Takes 30 seconds — you'll get your referral link instantly. No payment, no commitment.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <input placeholder="First name *" value={firstName} onChange={set(setFirstName)} className={inputCls} />
          <input placeholder="Last name" value={lastName} onChange={set(setLastName)} className={inputCls} />
        </div>
        <div className="space-y-3 mb-3">
          <input type="email" placeholder="Email address *" value={email} onChange={set(setEmail)} className={inputCls} />
          <input placeholder="Phone number *" value={phone} onChange={set(setPhone)} className={inputCls} />
        </div>

        <div className="mb-3">
          <label className={labelCls}>Primary trade *</label>
          <select value={trade} onChange={set(setTrade)} className={inputCls}>
            <option value="">Select your trade…</option>
            {TRADE_GROUPS.map(({ group, trades }) => (
              <optgroup key={group} label={group}>
                {trades.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className={labelCls}>Primary service area *</label>
          <AddressAutofill
            onAddressSelect={(addr) => {
              if (addr.city) setCity(addr.city);
              if (addr.state) setState(addr.state.toUpperCase().slice(0, 2));
              if (addr.zip) setZip(addr.zip);
            }}
          />
          <div className="grid grid-cols-3 gap-2 mt-2">
            <input placeholder="City *" value={city} onChange={set(setCity)} className={inputCls + " col-span-2"} />
            <input placeholder="ST *" maxLength={2} value={state} onChange={set(setState)} className={inputCls} />
          </div>
        </div>

        {refCode && (
          <div className="mb-4 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
            Referred by code: <span className="font-mono font-semibold" style={{ color: NAVY }}>{refCode}</span>
          </div>
        )}

        <button
          onClick={submitStep1}
          disabled={join.isPending}
          className="w-full py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          style={{ backgroundColor: YELLOW, color: NAVY }}
        >
          {join.isPending ? "Claiming your spot…" : "Claim my spot"}
          {!join.isPending && <ArrowRight className="w-4 h-4" />}
        </button>
        <p className="text-center text-[11px] text-gray-400 mt-3">
          You can complete the rest of your profile after — it only takes a moment.
        </p>
      </div>
    </div>
  );
}
