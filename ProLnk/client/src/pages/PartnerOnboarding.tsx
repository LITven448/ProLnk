import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Check, Copy, ChevronRight, MapPin, Camera, CreditCard, Rocket } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const STEP_LABELS = ["Welcome", "Profile", "Payout", "Ready"];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1" style={{ flex: 1 }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
              style={{
                background: i < step ? "#F5E642" : i === step ? "#F5E642" : "rgba(255,255,255,0.08)",
                color: i <= step ? "#0A1628" : "#6b7280",
              }}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className="text-xs font-medium hidden sm:block" style={{ color: i <= step ? "#F5E642" : "#6b7280" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="absolute h-full rounded-full transition-all duration-500"
          style={{ width: `${(step / (STEP_LABELS.length - 1)) * 100}%`, background: "#F5E642" }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2 text-right">Step {step + 1} of {STEP_LABELS.length}</p>
    </div>
  );
}

function ConfettiDots() {
  const dots = [
    { left: "10%", top: "15%", size: 10, color: "#F5E642", delay: 0 },
    { left: "80%", top: "10%", size: 8,  color: "#3b82f6", delay: 0.2 },
    { left: "25%", top: "30%", size: 6,  color: "#22c55e", delay: 0.4 },
    { left: "70%", top: "25%", size: 12, color: "#F5E642", delay: 0.1 },
    { left: "50%", top: "8%",  size: 7,  color: "#f59e0b", delay: 0.3 },
    { left: "90%", top: "40%", size: 5,  color: "#22c55e", delay: 0.5 },
    { left: "5%",  top: "50%", size: 9,  color: "#3b82f6", delay: 0.15 },
    { left: "60%", top: "15%", size: 6,  color: "#F5E642", delay: 0.35 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: d.color,
            opacity: 0.6,
            animation: `bounce 1.2s ease-in-out ${d.delay}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          from { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          to   { transform: translateY(-18px) rotate(15deg); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

function Step1Welcome({ onNext, tier, position }: { onNext: () => void; tier: string; position: number }) {
  const TIER_LABEL: Record<string, string> = {
    charter: "Charter Member",
    founding: "Founding Member",
    level3: "Level 3 Partner",
    level4: "Level 4 Partner",
    waitlist: "Waitlist Member",
  };
  const TIER_COLOR: Record<string, string> = {
    charter: "#22c55e",
    founding: "#3b82f6",
    level3: "#f59e0b",
    level4: "#8b5cf6",
    waitlist: "#6b7280",
  };
  const color = TIER_COLOR[tier] ?? "#F5E642";
  const label = TIER_LABEL[tier] ?? "Partner";

  return (
    <div className="relative text-center py-6" style={{ zIndex: 1 }}>
      <ConfettiDots />
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
        style={{ background: "rgba(245,230,66,0.15)", border: "2px solid rgba(245,230,66,0.3)" }}
      >
        <Rocket size={36} style={{ color: "#F5E642" }} />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Welcome to ProLnk!</h1>
      <p className="text-gray-400 text-base mb-6 max-w-sm mx-auto">
        You're officially part of the founding network. Let's get you set up to start earning.
      </p>

      <div
        className="inline-flex flex-col items-center gap-1 px-6 py-4 rounded-2xl mb-8"
        style={{ background: `${color}15`, border: `1px solid ${color}40` }}
      >
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Your Tier</p>
        <p className="text-2xl font-bold" style={{ color }}>{label}</p>
        {position > 0 && (
          <p className="text-xs text-gray-500">Network Position #{position}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 text-left">
        {[
          { icon: "🎯", label: "4-Level Overrides", desc: "Earn from your entire network" },
          { icon: "🔒", label: "$149/mo Locked", desc: "Founding price, forever" },
          { icon: "🏆", label: "Charter Benefits", desc: "First access to every feature" },
        ].map(({ icon, label: l, desc }) => (
          <div
            key={l}
            className="rounded-xl p-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-xl mb-1">{icon}</p>
            <p className="text-xs font-bold text-white">{l}</p>
            <p className="text-xs text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
        style={{ background: "#F5E642", color: "#0A1628" }}
      >
        Let's Get You Set Up <ChevronRight size={16} />
      </button>
    </div>
  );
}

function Step2Profile({ onNext }: { onNext: () => void }) {
  const [serviceZips, setServiceZips] = useState("");
  const [description, setDescription] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => onNext(), 800);
  };

  return (
    <div className="py-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(245,230,66,0.12)" }}>
          <MapPin size={20} style={{ color: "#F5E642" }} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Complete Your Profile</h2>
          <p className="text-gray-400 text-sm">Help homeowners find you in their area</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Service Area Zip Codes
          </label>
          <input
            type="text"
            value={serviceZips}
            onChange={(e) => setServiceZips(e.target.value)}
            placeholder="75201, 75202, 75204, 75205"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-2"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
          <p className="text-xs text-gray-500 mt-1">Comma-separated zip codes where you accept jobs</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Business Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell homeowners what you do, how long you've been in business, and what makes you stand out..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-2 resize-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
          <p className="text-xs text-gray-500 mt-1 text-right">{description.length}/500</p>
        </div>

        <div
          className="flex items-center gap-4 p-4 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,230,66,0.1)" }}>
            <Camera size={18} style={{ color: "#F5E642" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">Business Photo</p>
            <p className="text-xs text-gray-400">Add a photo to build trust with homeowners</p>
          </div>
          <Link href="/photo-upload">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
              style={{ background: "rgba(245,230,66,0.12)", color: "#F5E642", border: "1px solid rgba(245,230,66,0.25)" }}
            >
              Upload Photo
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saved}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all"
          style={{ background: saved ? "rgba(34,197,94,0.2)" : "#F5E642", color: saved ? "#22c55e" : "#0A1628" }}
        >
          {saved ? (
            <><Check size={16} /> Saved!</>
          ) : (
            <>Save & Continue <ChevronRight size={16} /></>
          )}
        </button>
      </div>
    </div>
  );
}

function Step3Payout({ onNext }: { onNext: () => void }) {
  return (
    <div className="py-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(59,130,246,0.12)" }}>
          <CreditCard size={20} style={{ color: "#3b82f6" }} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Set Up Your Payout Account</h2>
          <p className="text-gray-400 text-sm">Receive monthly commissions directly to your bank</p>
        </div>
      </div>

      <div
        className="rounded-2xl p-6 mb-6"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,230,66,0.1)" }}>
            <span className="text-2xl">🏦</span>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">Connect your bank account</p>
            <p className="text-sm text-gray-400">
              Link your bank via Stripe Connect to receive commission payouts on the 1st of each month. Your banking info is encrypted and never stored on ProLnk servers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Payout Day", value: "1st of month" },
            { label: "Processing", value: "1–2 business days" },
            { label: "Minimum", value: "$25 threshold" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className="text-xs font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        <Link href="/dashboard/payout-setup">
          <span
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{ background: "#3b82f6", color: "#fff" }}
          >
            <CreditCard size={16} />
            Connect Bank Account
          </span>
        </Link>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
        style={{ background: "rgba(255,255,255,0.06)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        I'll do this later
      </button>
    </div>
  );
}

function Step4Ready({ referralLink }: { referralLink: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const markComplete = () => {
    localStorage.setItem("prolnk_onboarding_complete", "true");
  };

  return (
    <div className="py-4 text-center">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
        style={{ background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.3)" }}
      >
        <Check size={36} style={{ color: "#22c55e" }} />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">You're Ready to Earn!</h2>
      <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
        Your profile is set up and you're part of the founding network. Start sharing your referral link to grow your income.
      </p>

      <div
        className="rounded-2xl p-5 mb-5 text-left"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Your Referral Link</p>
        <div
          className="flex items-center gap-3 p-3 rounded-xl mb-3"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="flex-1 text-sm text-gray-300 truncate font-mono min-w-0">{referralLink}</p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold flex-shrink-0 transition-all"
            style={{
              background: copied ? "rgba(34,197,94,0.15)" : "rgba(245,230,66,0.12)",
              color: copied ? "#22c55e" : "#F5E642",
              border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(245,230,66,0.25)"}`,
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-xs text-gray-500">Every pro you recruit earns you a 7% override on their commissions — forever.</p>
      </div>

      <div className="space-y-3 mb-8 text-left">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Setup Summary</p>
        {[
          { label: "Profile Info", done: true },
          { label: "Service Areas", done: true },
          { label: "Payout Account", done: false, note: "Optional — set up anytime" },
        ].map(({ label, done, note }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: done ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)" }}
            >
              {done ? <Check size={12} style={{ color: "#22c55e" }} /> : <span className="text-gray-600 text-xs">–</span>}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{label}</p>
              {note && <p className="text-xs text-gray-500">{note}</p>}
            </div>
          </div>
        ))}
      </div>

      <Link href="/dashboard/partner-home">
        <span
          onClick={markComplete}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
          style={{ background: "#F5E642", color: "#0A1628" }}
        >
          Go to Dashboard <ChevronRight size={16} />
        </span>
      </Link>
    </div>
  );
}

export default function PartnerOnboarding() {
  const [step, setStep] = useState(0);
  const { user } = useAuth();
  const email = user?.email ?? "";

  const { data: status } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email },
    { enabled: !!email }
  );

  const tier = (status as any)?.tier ?? "waitlist";
  const position = (status as any)?.position ?? 0;
  const referralCode = (status as any)?.referralCode ?? "";
  const referralLink = `${typeof window !== "undefined" ? window.location.origin : "https://prolnk.io"}/join?ref=${referralCode}`;

  return (
    <div className="min-h-screen flex items-start justify-center pt-8 pb-16 px-4" style={{ background: "#0A1628" }}>
      <div
        className="w-full max-w-lg rounded-3xl p-6 sm:p-8"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight" style={{ color: "#F5E642" }}>ProLnk</span>
          </div>
          <span className="text-xs text-gray-500">Partner Setup</span>
        </div>

        <ProgressBar step={step} />

        {step === 0 && <Step1Welcome onNext={() => setStep(1)} tier={tier} position={position} />}
        {step === 1 && <Step2Profile onNext={() => setStep(2)} />}
        {step === 2 && <Step3Payout onNext={() => setStep(3)} />}
        {step === 3 && <Step4Ready referralLink={referralLink} />}
      </div>
    </div>
  );
}
