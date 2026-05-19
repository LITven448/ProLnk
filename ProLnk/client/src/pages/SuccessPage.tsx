import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Copy,
  Check,
  ArrowRight,
  Share2,
  Home,
  Users,
  Clock,
  Mail,
  Star,
  Zap,
} from "lucide-react";
import ProLnkLogo from "@/components/ProLnkLogo";

type SuccessType = "pro-signup" | "home-signup" | "checkout" | "generic";

function useQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    type: (params.get("type") ?? "generic") as SuccessType,
    ref: params.get("ref") ?? "",
    code: params.get("code") ?? "",
    position: params.get("position") ?? "",
    email: params.get("email") ?? "",
    name: params.get("name") ?? "",
    confirmation: params.get("confirmation") ?? Math.random().toString(36).slice(2, 10).toUpperCase(),
  };
}

function AnimatedCheck() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);
  return (
    <div
      className={`w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${
        visible ? "scale-100 opacity-100″ : "scale-50 opacity-0"
      }`}
    >
      <CheckCircle className="w-10 h-10 text-emerald-600″ />
    </div>
  );
}

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [value]);
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-500″ /> : <Copy className="w-4 h-4" />}
      {label && <span>{copied ? "Copied!" : label}</span>}
    </button>
  );
}

function StepItem({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3″>
      <div className="w-7 h-7 rounded-full bg-[#0A1628] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5″>
        {number}
      </div>
      <span className="text-sm text-gray-700″>{text}</span>
    </div>
  );
}

function ProSignupContent({ ref: refCode, position, email }: { ref: string; position: string; email: string }) {
  const shareUrl = refCode
    ? `${window.location.origin}/apply?ref=${refCode}`
    : `${window.location.origin}/apply`;
  const positionNum = position ? parseInt(position, 10) : null;
  const shareText = `I just reserved a Charter spot on ProLnk — the network income platform for home service pros. Join before spots fill: ${shareUrl}`;

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: "Join ProLnk", text: shareText, url: shareUrl }).catch(() => {});
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <AnimatedCheck />
      <div className="text-center mb-8″>
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-4″>
          <Star className="w-3.5 h-3.5″ /> Charter Spot Reserved
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2″>Application Received!</h1>
        <p className="text-gray-500″>Your charter spot is secured. We'll review your application within 1–2 business days.</p>
      </div>

      {refCode && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-5″>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3″>Your Referral Code</p>
          <div className="flex items-center justify-between mb-4″>
            <span className="text-3xl font-mono font-bold tracking-widest text-gray-900″>{refCode}</span>
            <CopyButton value={refCode} label="Copy code" />
          </div>
          {positionNum !== null && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2.5 mb-4″>
              <Users className="w-4 h-4 text-emerald-600 shrink-0″ />
              <p className="text-sm text-emerald-800″>
                <strong>Share with 3 friends</strong> and jump to position{" "}
                <strong>#{Math.max(1, positionNum - 3)}</strong>
              </p>
            </div>
          )}
          <div className="flex gap-2″>
            <Button
              onClick={handleNativeShare}
              className="flex-1 bg-[#0A1628] hover:bg-[#0A1628]/80 text-white text-sm"
            >
              <Share2 className="w-4 h-4 mr-1.5″ /> Share your link
            </Button>
            <CopyButton value={shareUrl} label="" />
          </div>
        </div>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-5″>
        <p className="text-sm font-semibold text-gray-700 mb-4″>Next steps</p>
        <div className="space-y-3″>
          <StepItem number={1} text="Check your email for a confirmation from ProLnk" />
          <StepItem number={2} text="Join the ProLnk partner community group" />
          <StepItem number={3} text="Set up your profile while you wait for approval" />
        </div>
      </div>

      {email && (
        <div className="flex items-center gap-2 text-sm text-gray-500 justify-center mb-6″>
          <Mail className="w-4 h-4″ />
          Confirmation sent to <strong className="ml-0.5″>{email}</strong>
        </div>
      )}

      <Link href="/application-status">
        <Button variant="outline" className="w-full">
          Check application status <ArrowRight className="w-4 h-4 ml-1.5″ />
        </Button>
      </Link>
    </div>
  );
}

function HomeSignupContent({ code, email }: { code: string; email: string }) {
  const shareUrl = `${window.location.origin}`;
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Get 3 free home service quotes",
        text: "I just signed up for ProLnk — get 3 quotes from vetted local pros in 24 hours.",
        url: shareUrl,
      }).catch(() => {});
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <AnimatedCheck />
      <div className="text-center mb-8″>
        <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4″>
          <Home className="w-3.5 h-3.5″ /> You're on the list
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2″>You're on the list!</h1>
        <p className="text-gray-500″>Get 3 quotes from vetted local pros in 24 hours once we launch in your area.</p>
      </div>

      {code && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5″>Confirmation #</p>
            <span className="font-mono text-lg font-bold text-gray-900″>{code}</span>
          </div>
          <CopyButton value={code} label="Copy" />
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-5″>
        <p className="text-sm font-semibold text-blue-900 mb-3″>What happens next</p>
        <div className="space-y-3″>
          <div className="flex items-start gap-2.5″>
            <Mail className="w-4 h-4 text-blue-500 mt-0.5 shrink-0″ />
            <span className="text-sm text-blue-800″>Check your email for a confirmation</span>
          </div>
          <div className="flex items-start gap-2.5″>
            <Clock className="w-4 h-4 text-blue-500 mt-0.5 shrink-0″ />
            <span className="text-sm text-blue-800″>We'll notify you when pros are available in your area</span>
          </div>
          <div className="flex items-start gap-2.5″>
            <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0″ />
            <span className="text-sm text-blue-800″>You'll receive up to 3 competitive quotes from vetted pros</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5″>
        <p className="text-sm font-semibold text-gray-700 mb-2″>Tell a neighbor</p>
        <p className="text-xs text-gray-500 mb-3″>Help your neighbors get great service too — share ProLnk.</p>
        <Button
          onClick={handleNativeShare}
          variant="outline"
          className="w-full text-sm"
        >
          <Share2 className="w-4 h-4 mr-1.5″ /> Share with a neighbor
        </Button>
      </div>

      {email && (
        <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
          <Mail className="w-4 h-4″ />
          Confirmation sent to <strong className="ml-0.5″>{email}</strong>
        </div>
      )}
    </div>
  );
}

function CheckoutContent({ name }: { name: string }) {
  return (
    <div className="max-w-lg mx-auto">
      <AnimatedCheck />
      <div className="text-center mb-8″>
        <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full mb-4″>
          <Zap className="w-3.5 h-3.5″ /> Founding Spot Secured
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2″>Founding spot reserved!</h1>
        <p className="text-gray-500″>
          {name ? `Welcome, ${name}! ` : ""}Your 90-day trial starts now. Lock in your Founding Member rates for life.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-5″>
        <p className="text-sm font-semibold text-gray-700 mb-4″>What happens next</p>
        <div className="space-y-4″>
          {[
            { icon: <Mail className="w-4 h-4 text-purple-500″ />, label: "Now", text: "Check your email for account activation" },
            { icon: <CheckCircle className="w-4 h-4 text-purple-500″ />, label: "Day 1", text: "Complete your profile and set your service area" },
            { icon: <Users className="w-4 h-4 text-purple-500″ />, label: "Day 3", text: "Your first lead opportunities appear in your feed" },
            { icon: <Star className="w-4 h-4 text-purple-500″ />, label: "Day 90", text: "Founding rate locked in — your network income activates" },
          ].map(({ icon, label, text }) => (
            <div key={label} className="flex items-start gap-3″>
              <div className="shrink-0 mt-0.5″>{icon}</div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label} </span>
                <span className="text-sm text-gray-700″>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link href="/partner/dashboard">
        <Button className="w-full bg-[#0A1628] hover:bg-[#0A1628]/80 text-white mb-3″>
          Access your dashboard <ArrowRight className="w-4 h-4 ml-1.5″ />
        </Button>
      </Link>
      <Link href="/application-status">
        <Button variant="outline" className="w-full">Check application status</Button>
      </Link>
    </div>
  );
}

function GenericContent() {
  return (
    <div className="max-w-lg mx-auto text-center">
      <AnimatedCheck />
      <h1 className="text-3xl font-bold text-gray-900 mb-3″>You're all set!</h1>
      <p className="text-gray-500 mb-8″>Your request was received. We'll be in touch soon.</p>
      <Link href="/">
        <Button className="bg-[#0A1628] hover:bg-[#0A1628]/80 text-white">
          <Home className="w-4 h-4 mr-1.5″ /> Back to home
        </Button>
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  const params = useQueryParams();
  const { type, ref, code, position, email, name, confirmation } = params;

  const titles: Record<SuccessType, string> = {
    "pro-signup": "Application Received — ProLnk",
    "home-signup": "You're on the List — ProLnk",
    "checkout": "Founding Spot Reserved — ProLnk",
    "generic": "Success — ProLnk",
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Helmet>
        <title>{titles[type] ?? titles.generic}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <nav className="border-b border-gray-200 bg-white px-6 py-4″>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/"><ProLnkLogo height={36} variant="light" /></Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="text-xs">Home</Button>
          </Link>
        </div>
      </nav>

      <div className="px-4 py-16″>
        {type === "pro-signup" && (
          <ProSignupContent ref={ref} position={position} email={email} />
        )}
        {type === "home-signup" && (
          <HomeSignupContent code={code || confirmation} email={email} />
        )}
        {type === "checkout" && (
          <CheckoutContent name={name} />
        )}
        {(type === "generic" || !["pro-signup", "home-signup", "checkout"].includes(type)) && (
          <GenericContent />
        )}
      </div>
    </div>
  );
}
