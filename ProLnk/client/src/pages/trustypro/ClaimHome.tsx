import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Home, CheckCircle, ArrowRight, Search, Camera, FileText, Wrench, Loader2, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { TrustyProLogo } from "@/components/TrustyProLogo";

const ACCENT = "#4F46E5";
const EASE = "easeOut" as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type Screen = "search" | "found" | "verify" | "welcome";

interface PropertyResult {
  address: string;
  squareFeet: number | null;
  yearBuilt: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
}

function ScreenSearch({ onFound }: { onFound: (result: PropertyResult) => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const utils = trpc.useUtils();

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (trimmed.length < 8) {
      toast.error("Please enter your full street address.");
      return;
    }
    setLoading(true);
    try {
      const result = await utils.propertyEnrichment.enrichAddress.fetch({ address: trimmed, state: "TX" });
      onFound({
        address: trimmed,
        squareFeet: result?.squareFeet ?? null,
        yearBuilt: result?.yearBuilt ?? null,
        bedrooms: result?.bedrooms ?? null,
        bathrooms: result?.bathrooms ?? null,
      });
    } catch {
      onFound({
        address: trimmed,
        squareFeet: null,
        yearBuilt: null,
        bedrooms: null,
        bathrooms: null,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key="search"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg mx-auto text-center"
    >
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-bold"
        style={{ backgroundColor: "#ede9fe", color: ACCENT, border: `1.5px solid #c4b5fd` }}
      >
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
        Over 800,000 DFW homes already have a profile
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-gray-950 leading-tight mb-4">
        Is your home already<br />
        <span style={{ color: ACCENT }}>in TrustyPro?</span>
      </h1>
      <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
        Over 800,000 DFW homes have a profile waiting to be claimed. Search yours and see what's ready for you.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="123 Main St, Frisco, TX 75034"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !loading && handleSearch()}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white shadow-sm"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-black text-white hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60"
          style={{ backgroundColor: ACCENT }}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5" /> Find My Home</>}
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Searching only matches your address — we never share or sell your information.
      </p>
    </motion.div>
  );
}

function ScreenFound({ property, onClaim }: { property: PropertyResult; onClaim: () => void }) {
  const hasFacts = property.squareFeet || property.yearBuilt || property.bedrooms || property.bathrooms;

  return (
    <motion.div
      key="found"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.1 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        style={{ backgroundColor: "#dcfce7", border: "2px solid #86efac" }}
      >
        <CheckCircle className="w-10 h-10 text-green-600" />
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-black text-gray-950 mb-2">We found your home!</h2>
      <p className="text-gray-500 mb-8 text-base">Your Home Health Vault is set up and waiting for you.</p>

      <div
        className="rounded-2xl p-6 mb-8 text-left shadow-sm"
        style={{ border: `1.5px solid rgba(79,70,229,0.2)`, backgroundColor: "#fafafa" }}
      >
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#ede9fe" }}>
            <Home className="w-5 h-5" style={{ color: ACCENT }} />
          </div>
          <div>
            <p className="font-black text-gray-900 text-base leading-tight">{property.address}</p>
            <p className="text-sm text-gray-500 mt-0.5">Dallas–Fort Worth, TX</p>
          </div>
        </div>

        {hasFacts && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {property.bedrooms != null && (
              <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "#f3f4f6" }}>
                <p className="text-xl font-black text-gray-900">{property.bedrooms}</p>
                <p className="text-xs text-gray-500 mt-0.5">Beds</p>
              </div>
            )}
            {property.bathrooms != null && (
              <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "#f3f4f6" }}>
                <p className="text-xl font-black text-gray-900">{property.bathrooms}</p>
                <p className="text-xs text-gray-500 mt-0.5">Baths</p>
              </div>
            )}
            {property.squareFeet != null && (
              <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "#f3f4f6" }}>
                <p className="text-xl font-black text-gray-900">{property.squareFeet.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-0.5">Sq Ft</p>
              </div>
            )}
            {property.yearBuilt != null && (
              <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "#f3f4f6" }}>
                <p className="text-xl font-black text-gray-900">{property.yearBuilt}</p>
                <p className="text-xs text-gray-500 mt-0.5">Built</p>
              </div>
            )}
          </div>
        )}

        <div
          className="rounded-xl p-4 flex items-center gap-3"
          style={{ backgroundColor: "#ede9fe" }}
        >
          <Star className="w-5 h-5 flex-shrink-0" style={{ color: ACCENT }} />
          <p className="text-sm font-semibold" style={{ color: ACCENT }}>
            Your Home Health Vault is ready and waiting
          </p>
        </div>
      </div>

      <button
        onClick={onClaim}
        className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-black text-white hover:opacity-90 transition-opacity shadow-xl w-full justify-center"
        style={{ backgroundColor: ACCENT }}
      >
        Claim This Home <ArrowRight className="w-5 h-5" />
      </button>
      <p className="text-xs text-gray-400 mt-3">Free to claim. Takes 30 seconds.</p>
    </motion.div>
  );
}

function ScreenVerify({
  property,
  onClaimed,
}: {
  property: PropertyResult;
  onClaimed: (name: string) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const claimMutation = trpc.waitlist.joinHomeWaitlist.useMutation({
    onSuccess: () => {
      onClaimed(firstName);
    },
    onError: (err) => {
      if (err.message?.includes("already registered")) {
        onClaimed(firstName);
      } else {
        toast.error(err.message || "Something went wrong. Please try again.");
        setLoading(false);
      }
    },
  });

  const handleSubmit = () => {
    if (!firstName.trim() || !lastName.trim()) { toast.error("Please enter your name."); return; }
    if (!email.trim() || !email.includes("@")) { toast.error("Please enter a valid email."); return; }
    if (!checked) { toast.error("Please confirm you own or live at this property."); return; }
    setLoading(true);
    claimMutation.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      address: property.address,
      city: "Dallas",
      state: "TX",
      zipCode: "75000",
      serviceNeeded: "Home Health Vault Claim",
    });
  };

  return (
    <motion.div
      key="verify"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-950 mb-2">Just confirm it's yours</h2>
        <p className="text-gray-500 text-base">We want to make sure your vault stays private.</p>
      </div>

      <div
        className="rounded-2xl p-6 mb-6 text-xs text-gray-500 flex items-center gap-2"
        style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
      >
        <Home className="w-4 h-4 flex-shrink-0 text-gray-400" />
        <span className="truncate">{property.address}</span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">First Name *</label>
            <input
              type="text"
              placeholder="Jane"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Last Name *</label>
            <input
              type="text"
              placeholder="Smith"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
          <input
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
          />
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <div
            onClick={() => setChecked(!checked)}
            className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors cursor-pointer"
            style={{
              backgroundColor: checked ? ACCENT : "transparent",
              borderColor: checked ? ACCENT : "#d1d5db",
            }}
          >
            {checked && <CheckCircle className="w-3 h-3 text-white" />}
          </div>
          <span className="text-sm text-gray-600 leading-snug">
            I live at or own this property
          </span>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-black text-white hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60"
        style={{ backgroundColor: ACCENT }}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Claim My Home <ArrowRight className="w-5 h-5" /></>}
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        No ID required. No payment info. We keep your data private.
      </p>
    </motion.div>
  );
}

function ScreenWelcome({ name }: { name: string }) {
  const [, navigate] = useLocation();

  return (
    <motion.div
      key="welcome"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.05 }}
        className="text-6xl mb-4"
        role="img"
        aria-label="house"
      >
        🏠
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
      >
        <h2 className="text-3xl md:text-4xl font-black text-gray-950 mb-2">
          Welcome home{name ? `, ${name}` : ""}!
        </h2>
        <p className="text-gray-500 text-base mb-8">
          Your Home Health Vault is set up. The more you add, the smarter it gets.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
        className="rounded-2xl overflow-hidden mb-8 text-left"
        style={{ border: "1.5px solid #e5e7eb" }}
      >
        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Your vault is empty — start filling it</p>
        </div>
        {[
          {
            icon: Camera,
            title: "Add your first photo scan",
            desc: "AI detects 50+ issue types from your photos",
            href: "/trustypro/scan",
            color: "#ede9fe",
            iconColor: ACCENT,
            cta: "Start scan",
          },
          {
            icon: Wrench,
            title: "Log your first maintenance record",
            desc: "Keep a permanent history of repairs and upgrades",
            href: "/trustypro/scan",
            color: "#f0fdf4",
            iconColor: "#16a34a",
            cta: "Coming soon",
          },
          {
            icon: FileText,
            title: "Upload home documents",
            desc: "Warranties, inspection reports, permits — all in one place",
            href: "/trustypro/scan",
            color: "#fefce8",
            iconColor: "#ca8a04",
            cta: "Coming soon",
          },
        ].map(({ icon: Icon, title, desc, href, color, iconColor, cta }) => (
          <Link key={title} href={href}>
            <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color }}>
                <Icon className="w-5 h-5" style={{ color: iconColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{desc}</p>
              </div>
              <span className="text-xs font-semibold whitespace-nowrap" style={{ color: iconColor }}>{cta} →</span>
            </div>
          </Link>
        ))}
      </motion.div>

      <motion.button
        onClick={() => navigate("/trustypro/scan")}
        className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-black text-white hover:opacity-90 transition-opacity shadow-xl w-full justify-center"
        style={{ backgroundColor: ACCENT }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4, ease: EASE }}
      >
        Start My First Scan <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}

export default function ClaimHome() {
  const [screen, setScreen] = useState<Screen>("search");
  const [property, setProperty] = useState<PropertyResult | null>(null);
  const [claimedName, setClaimedName] = useState("");
  const [, navigate] = useLocation();

  const handleFound = (result: PropertyResult) => {
    setProperty(result);
    setScreen("found");
  };

  const handleClaim = () => setScreen("verify");

  const handleClaimed = (name: string) => {
    setClaimedName(name);
    setScreen("welcome");
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/trustypro">
            <TrustyProLogo height={48} />
          </Link>
          <button
            onClick={() => navigate("/trustypro")}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to TrustyPro
          </button>
        </div>
      </nav>

      {/* Progress indicator */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="max-w-lg mx-auto px-6 flex items-center gap-2">
          {(["search", "found", "verify", "welcome"] as Screen[]).map((s, i) => {
            const steps: Screen[] = ["search", "found", "verify", "welcome"];
            const currentIdx = steps.indexOf(screen);
            const stepIdx = steps.indexOf(s);
            const isDone = stepIdx < currentIdx;
            const isActive = stepIdx === currentIdx;
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className="h-1.5 flex-1 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: isDone || isActive ? ACCENT : "#e5e7eb",
                    opacity: isActive ? 1 : isDone ? 0.7 : 0.3,
                  }}
                />
                {i < 3 && (
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: isDone ? ACCENT : "#e5e7eb" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {screen === "search" && (
            <ScreenSearch key="search" onFound={handleFound} />
          )}
          {screen === "found" && property && (
            <ScreenFound key="found" property={property} onClaim={handleClaim} />
          )}
          {screen === "verify" && property && (
            <ScreenVerify key="verify" property={property} onClaimed={handleClaimed} />
          )}
          {screen === "welcome" && (
            <ScreenWelcome key="welcome" name={claimedName} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
