import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Check,
  Copy,
  ChevronRight,
  MapPin,
  Camera,
  CreditCard,
  Rocket,
  Network,
  Home,
  Share2,
  Info,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const STEP_LABELS = ["Welcome", "Profile", "Network", "Home Docs", "Referral"];

const TRADE_OPTIONS = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Roofing",
  "General Contractor",
  "Landscaping",
  "Pest Control",
  "Painting",
  "Flooring",
  "Remodeling",
  "Appliance Repair",
  "Pool & Spa",
  "Other",
];

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
            <span
              className="text-xs font-medium hidden sm:block"
              style={{ color: i <= step ? "#F5E642" : "#6b7280" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="absolute h-full rounded-full transition-all duration-500"
          style={{
            width: `${(step / (STEP_LABELS.length - 1)) * 100}%`,
            background: "#F5E642",
          }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2 text-right">
        Step {step + 1} of {STEP_LABELS.length}
      </p>
    </div>
  );
}

function WhyItMatters({ text }: { text: string }) {
  return (
    <div
      className="flex items-start gap-2 p-3 rounded-xl mt-4 mb-2"
      style={{ background: "rgba(245,230,66,0.07)", border: "1px solid rgba(245,230,66,0.18)" }}
    >
      <Info size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#F5E642" }} />
      <p className="text-xs text-yellow-200/70 leading-relaxed">
        <span className="font-semibold text-yellow-300">Why this matters: </span>
        {text}
      </p>
    </div>
  );
}

function ConfettiDots() {
  const dots = [
    { left: "10%", top: "15%", size: 10, color: "#F5E642", delay: 0 },
    { left: "80%", top: "10%", size: 8, color: "#3b82f6", delay: 0.2 },
    { left: "25%", top: "30%", size: 6, color: "#22c55e", delay: 0.4 },
    { left: "70%", top: "25%", size: 12, color: "#F5E642", delay: 0.1 },
    { left: "50%", top: "8%", size: 7, color: "#f59e0b", delay: 0.3 },
    { left: "90%", top: "40%", size: 5, color: "#22c55e", delay: 0.5 },
    { left: "5%", top: "50%", size: 9, color: "#3b82f6", delay: 0.15 },
    { left: "60%", top: "15%", size: 6, color: "#F5E642", delay: 0.35 },
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

function Step1Welcome({
  onNext,
  tier,
  position,
}: {
  onNext: () => void;
  tier: string;
  position: number;
}) {
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
        style={{
          background: "rgba(245,230,66,0.15)",
          border: "2px solid rgba(245,230,66,0.3)",
        }}
      >
        <Rocket size={36} style={{ color: "#F5E642" }} />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Welcome to ProLnk!</h1>
      <p className="text-gray-400 text-base mb-6 max-w-sm mx-auto">
        You're officially part of the founding network. This 5-step setup takes under 3 minutes and
        unlocks all 5 income streams.
      </p>

      <div
        className="inline-flex flex-col items-center gap-1 px-6 py-4 rounded-2xl mb-8"
        style={{ background: `${color}15`, border: `1px solid ${color}40` }}
      >
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Your Tier</p>
        <p className="text-2xl font-bold" style={{ color }}>
          {label}
        </p>
        {position > 0 && <p className="text-xs text-gray-500">Network Position #{position}</p>}
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
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
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
  const [businessName, setBusinessName] = useState("");
  const [trade, setTrade] = useState("");
  const [serviceZips, setServiceZips] = useState("");
  const [description, setDescription] = useState("");
  const [saved, setSaved] = useState(false);

  const isValid = businessName.trim().length > 0 && trade.length > 0 && serviceZips.trim().length > 0;

  const handleSave = () => {
    if (!isValid) return;
    setSaved(true);
    setTimeout(() => onNext(), 800);
  };

  return (
    <div className="py-4">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(245,230,66,0.12)" }}
        >
          <MapPin size={20} style={{ color: "#F5E642" }} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Your Business Profile</h2>
          <p className="text-gray-400 text-sm">Help homeowners find and trust you</p>
        </div>
      </div>

      <WhyItMatters text="Your profile is the first thing homeowners see when you get matched. A complete profile with your trade and service area gets 3x more accepted jobs than an incomplete one." />

      <div className="space-y-5 mt-5">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Business Name <span style={{ color: "#F5E642" }}>*</span>
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Johnson Plumbing LLC"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-2"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Trade Type <span style={{ color: "#F5E642" }}>*</span>
          </label>
          <select
            value={trade}
            onChange={(e) => setTrade(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none focus:ring-2 appearance-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: trade ? "#fff" : "#4b5563",
            }}
          >
            <option value="" disabled style={{ color: "#4b5563", background: "#0A1628" }}>
              Select your primary trade
            </option>
            {TRADE_OPTIONS.map((t) => (
              <option key={t} value={t} style={{ background: "#0A1628" }}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Service Area Zip Codes <span style={{ color: "#F5E642" }}>*</span>
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
          <p className="text-xs text-gray-500 mt-1">
            Comma-separated zip codes where you accept jobs
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            Business Description{" "}
            <span className="text-gray-600 normal-case font-normal">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell homeowners what you do, how long you've been in business, and what makes you stand out..."
            rows={3}
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
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(245,230,66,0.1)" }}
          >
            <Camera size={18} style={{ color: "#F5E642" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">Business Photo</p>
            <p className="text-xs text-gray-400">Add a photo to build trust with homeowners</p>
          </div>
          <Link href="/photo-upload">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
              style={{
                background: "rgba(245,230,66,0.12)",
                color: "#F5E642",
                border: "1px solid rgba(245,230,66,0.25)",
              }}
            >
              Upload
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saved || !isValid}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all"
          style={{
            background: saved
              ? "rgba(34,197,94,0.2)"
              : isValid
              ? "#F5E642"
              : "rgba(255,255,255,0.06)",
            color: saved ? "#22c55e" : isValid ? "#0A1628" : "#6b7280",
            cursor: isValid ? "pointer" : "not-allowed",
          }}
        >
          {saved ? (
            <>
              <Check size={16} /> Saved!
            </>
          ) : (
            <>
              Save & Continue <ChevronRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function CommissionCascadeRow({
  level,
  label,
  color,
  jobPct,
  subPct,
  depth,
  isYou,
}: {
  level: number;
  label: string;
  color: string;
  jobPct: string;
  subPct: string;
  depth: number;
  isYou?: boolean;
}) {
  return (
    <div className="flex items-center gap-2" style={{ marginLeft: depth * 16 }}>
      {depth > 0 && (
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 border-2"
          style={{ borderColor: color, background: "transparent" }}
        />
      )}
      <div
        className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: isYou ? `${color}18` : "rgba(255,255,255,0.03)",
          border: `1px solid ${isYou ? color + "40" : "rgba(255,255,255,0.07)"}`,
        }}
      >
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: `${color}20`, color }}
        >
          L{level}
        </span>
        <span className="text-xs font-semibold text-white flex-1">{label}</span>
        <span className="text-xs text-gray-400 flex-shrink-0">{jobPct} job</span>
        <span className="text-xs text-gray-500 flex-shrink-0">{subPct} sub</span>
      </div>
    </div>
  );
}

function Step3Network({ onNext, tier }: { onNext: () => void; tier: string }) {
  const isCharter = tier === "charter";
  const isFounding = tier === "founding";
  const isL3 = tier === "level3";

  return (
    <div className="py-4">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(59,130,246,0.12)" }}
        >
          <Network size={20} style={{ color: "#3b82f6" }} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Your Commission Cascade</h2>
          <p className="text-gray-400 text-sm">Earn on every partner you bring in — 4 levels deep</p>
        </div>
      </div>

      <WhyItMatters text="Every partner you personally recruit pays you a 7% override on their job commissions and a 12% override on their $149/mo subscription — every month, forever. That's $17.88/mo per recruited partner at zero incremental effort." />

      <div className="mt-5 space-y-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Cascade Diagram — Your Position
        </p>
        <CommissionCascadeRow
          level={1}
          label="You (Charter)"
          color="#22c55e"
          jobPct="7%"
          subPct="12%"
          depth={0}
          isYou
        />
        <CommissionCascadeRow
          level={2}
          label="Your Direct Recruit"
          color="#3b82f6"
          jobPct="4%"
          subPct="6%"
          depth={1}
        />
        <CommissionCascadeRow
          level={3}
          label="Their Recruit"
          color="#f59e0b"
          jobPct="2%"
          subPct="3%"
          depth={2}
        />
        <CommissionCascadeRow
          level={4}
          label="4th-Level Partner"
          color="#8b5cf6"
          jobPct="1%"
          subPct="1.5%"
          depth={3}
        />
      </div>

      <div
        className="mt-5 rounded-xl p-4 grid grid-cols-2 gap-3"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div>
          <p className="text-xs text-gray-500 mb-1">If you recruit 10 partners</p>
          <p className="text-lg font-bold text-white">$178.80/mo</p>
          <p className="text-xs text-gray-500">subscription overrides alone</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">If each recruits 10 more</p>
          <p className="text-lg font-bold" style={{ color: "#F5E642" }}>$1,788+/mo</p>
          <p className="text-xs text-gray-500">passive at Level 2</p>
        </div>
      </div>

      <div
        className="mt-4 p-4 rounded-xl"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="text-xs font-semibold text-gray-300 mb-2">All Tier Rates at a Glance</p>
        <div className="space-y-1">
          {[
            { tier: "Charter", sub: "12%", job: "7%", color: "#22c55e" },
            { tier: "Founding", sub: "6%", job: "4%", color: "#3b82f6" },
            { tier: "Level 3", sub: "3%", job: "2%", color: "#f59e0b" },
            { tier: "Level 4", sub: "1.5%", job: "1%", color: "#8b5cf6" },
          ].map((row) => (
            <div key={row.tier} className="flex items-center gap-2 py-1">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: row.color }}
              />
              <span className="text-xs text-gray-300 flex-1">{row.tier}</span>
              <span className="text-xs text-gray-400">{row.sub} sub override</span>
              <span className="text-xs text-gray-500 ml-2">{row.job} job override</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2">
          + 1.5% origination rights on every home your network documents
        </p>
      </div>

      <button
        onClick={onNext}
        className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
        style={{ background: "#F5E642", color: "#0A1628" }}
      >
        Got It — Next Step <ChevronRight size={16} />
      </button>
    </div>
  );
}

function Step4HomeDocs({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState<"intro" | "address" | "photos" | "done">("intro");
  const [address, setAddress] = useState("");
  const [photoCount, setPhotoCount] = useState(0);

  const DOC_STEPS = [
    {
      id: "address",
      num: 1,
      icon: "📍",
      title: "Enter the property address",
      desc: "The homeowner's full street address creates the Home Health Record.",
    },
    {
      id: "photos",
      num: 2,
      icon: "📸",
      title: "Photograph key systems",
      desc: "HVAC, electrical panel, water heater, roof — each photo earns $0.25 toward your origination credit.",
    },
    {
      id: "details",
      num: 3,
      icon: "📋",
      title: "Log system ages & condition",
      desc: "Note the age and condition of each system. This is what makes the Home Health Vault valuable.",
    },
    {
      id: "share",
      num: 4,
      icon: "🔗",
      title: "Share the Vault link with the homeowner",
      desc: "They get a permanent, private record of their home. You earn 1.5% origination rights permanently.",
    },
  ];

  return (
    <div className="py-4">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(34,197,94,0.12)" }}
        >
          <Home size={20} style={{ color: "#22c55e" }} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Document Your First Property</h2>
          <p className="text-gray-400 text-sm">
            Turn any job site into a Home Health Vault record
          </p>
        </div>
      </div>

      <WhyItMatters text="Every home you document earns you 1.5% origination rights — permanently. If that home generates $500 in platform fees over 3 years, you collect $7.50 with zero additional work. At 100 homes documented, that's a real passive income stream." />

      <div className="mt-5 space-y-3">
        {DOC_STEPS.map((s, i) => (
          <div
            key={s.id}
            className="flex items-start gap-3 p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
              style={{ background: "rgba(34,197,94,0.1)" }}
            >
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-green-400">Step {s.num}</span>
                <span className="text-sm font-semibold text-white">{s.title}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-5 rounded-xl p-4"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="text-xs font-semibold text-gray-300 mb-3">Try It: Document a Practice Home</p>
        <div className="space-y-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, Dallas, TX 75201"
            className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
          <div className="flex items-center gap-3">
            <button
              className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90"
              style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}
              onClick={() => setPhotoCount((n) => n + 1)}
            >
              + Add System Photo ({photoCount} added)
            </button>
            <Link href="/dashboard/home-vault">
              <span
                className="px-4 py-2.5 rounded-xl text-xs font-bold"
                style={{ background: "#22c55e", color: "#0A1628" }}
              >
                Full Vault
              </span>
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
        style={{ background: "#F5E642", color: "#0A1628" }}
      >
        Continue to Referral Setup <ChevronRight size={16} />
      </button>
    </div>
  );
}

function Step5Referral({ referralLink, referralCode }: { referralLink: string; referralCode: string }) {
  const [copied, setCopied] = useState(false);
  const [smsCopied, setSmsCopied] = useState(false);

  const smsText = `Hey! I just joined ProLnk — the network that pays contractors for every job and every referral 4 levels deep. Get in now at founding rates: ${referralLink}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSmsCopy = () => {
    navigator.clipboard.writeText(smsText).then(() => {
      setSmsCopied(true);
      setTimeout(() => setSmsCopied(false), 2500);
    });
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join my ProLnk network",
        text: smsText,
        url: referralLink,
      });
    } else {
      handleCopy();
    }
  };

  const markComplete = () => {
    localStorage.setItem("prolnk_onboarding_complete", "true");
  };

  return (
    <div className="py-4">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(245,230,66,0.12)" }}
        >
          <Share2 size={20} style={{ color: "#F5E642" }} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Your Referral Link is Live</h2>
          <p className="text-gray-400 text-sm">Share it once and earn forever</p>
        </div>
      </div>

      <WhyItMatters text="Every pro who signs up through your link pays you 12% of their $149/mo subscription — that's $17.88/mo per recruit. Recruit 10 people and you've covered your own subscription plus $29/mo profit, passively." />

      <div
        className="mt-5 rounded-2xl p-5"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Your Referral Code
          </p>
          <span
            className="text-xs font-black tracking-widest px-3 py-1 rounded-lg"
            style={{ background: "rgba(245,230,66,0.15)", color: "#F5E642" }}
          >
            {referralCode || "PROLNK"}
          </span>
        </div>
        <div
          className="flex items-center gap-3 p-3 rounded-xl mt-3"
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
      </div>

      <div className="mt-4 space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Share Channels
        </p>

        <button
          onClick={handleNativeShare}
          className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:opacity-80"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-xl flex-shrink-0">📱</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">Text / Share</p>
            <p className="text-xs text-gray-400">Send via iMessage, WhatsApp, or any app</p>
          </div>
          <ChevronRight size={14} className="text-gray-500 flex-shrink-0" />
        </button>

        <button
          onClick={handleSmsCopy}
          className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:opacity-80"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-xl flex-shrink-0">📋</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">Copy SMS Script</p>
            <p className="text-xs text-gray-400 truncate">{smsText.slice(0, 60)}…</p>
          </div>
          {smsCopied ? (
            <Check size={14} className="flex-shrink-0" style={{ color: "#22c55e" }} />
          ) : (
            <Copy size={14} className="text-gray-500 flex-shrink-0" />
          )}
        </button>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:opacity-80"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-xl flex-shrink-0">📘</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">Share on Facebook</p>
            <p className="text-xs text-gray-400">Reach contractors in your network</p>
          </div>
          <ChevronRight size={14} className="text-gray-500 flex-shrink-0" />
        </a>
      </div>

      <div className="mt-5 space-y-2 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Setup Summary
        </p>
        {[
          { label: "Business Profile", done: true },
          { label: "Service Areas", done: true },
          { label: "Network Commission Explained", done: true },
          { label: "Home Documentation Walkthrough", done: true },
          { label: "Referral Link", done: true },
        ].map(({ label, done }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(34,197,94,0.15)" }}
            >
              <Check size={12} style={{ color: "#22c55e" }} />
            </div>
            <p className="text-sm font-medium text-white">{label}</p>
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
  const referralLink = `${
    typeof window !== "undefined" ? window.location.origin : "https://prolnk.io"
  }/join?ref=${referralCode}`;

  return (
    <div
      className="min-h-screen flex items-start justify-center pt-8 pb-16 px-4"
      style={{ background: "#0A1628" }}
    >
      <div
        className="w-full max-w-lg rounded-3xl p-6 sm:p-8"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight" style={{ color: "#F5E642" }}>
              ProLnk
            </span>
          </div>
          <span className="text-xs text-gray-500">Partner Setup</span>
        </div>

        <ProgressBar step={step} />

        {step === 0 && (
          <Step1Welcome onNext={() => setStep(1)} tier={tier} position={position} />
        )}
        {step === 1 && <Step2Profile onNext={() => setStep(2)} />}
        {step === 2 && <Step3Network onNext={() => setStep(3)} tier={tier} />}
        {step === 3 && <Step4HomeDocs onNext={() => setStep(4)} />}
        {step === 4 && (
          <Step5Referral referralLink={referralLink} referralCode={referralCode} />
        )}
      </div>
    </div>
  );
}
