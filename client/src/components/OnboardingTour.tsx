import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { X, ChevronRight, Share2, DollarSign, Briefcase, Zap, ArrowRight } from "lucide-react";

const TOUR_STORAGE_KEY = "prolnk_tour_complete";

type TourStep = {
  id: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  targetSelector?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const STEPS: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to your ProLnk dashboard!",
    body: "You're now part of the ProLnk founding network — here's a quick tour of the 4 most powerful things you can do to start earning.",
    icon: <Zap size={24} style={{ color: "#F5E642" }} />,
  },
  {
    id: "referral",
    title: "Share your referral link",
    body: "Every pro you recruit earns you a 7% job override and 12% subscription override — forever, across 4 levels deep in your network.",
    icon: <Share2 size={24} style={{ color: "#3b82f6" }} />,
    ctaLabel: "Go to Referral Hub",
    ctaHref: "/dashboard/referral",
  },
  {
    id: "earnings",
    title: "Your earnings tracker",
    body: "Watch your commissions grow as your network builds. The calculator shows your projected monthly earnings based on your referral activity.",
    icon: <DollarSign size={24} style={{ color: "#22c55e" }} />,
    ctaLabel: "View Earnings",
    ctaHref: "/dashboard/earnings",
  },
  {
    id: "job-log",
    title: "Log every job you complete",
    body: "Logging jobs builds your work history, improves your algorithm ranking, and qualifies you for higher-tier lead matching when the platform launches.",
    icon: <Briefcase size={24} style={{ color: "#f59e0b" }} />,
    ctaLabel: "Log a Job",
    ctaHref: "/job-log",
  },
  {
    id: "founding",
    title: "You're all set!",
    body: "Check out the Founding Network dashboard to see your tier progress, override depth, and network leaderboard. Your network starts earning the moment you recruit.",
    icon: <Zap size={24} style={{ color: "#F5E642" }} />,
    ctaLabel: "Open Founding Dashboard",
    ctaHref: "/dashboard/founding",
  },
];

function SpotlightOverlay({ onSkip }: { onSkip: () => void }) {
  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(10, 22, 40, 0.82)", backdropFilter: "blur(2px)" }}
      onClick={onSkip}
    />
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? 20 : 8,
            height: 8,
            background: i === current ? "#F5E642" : "rgba(255,255,255,0.15)",
          }}
        />
      ))}
    </div>
  );
}

export default function OnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const done = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!done) {
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const complete = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setVisible(false);
  };

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      complete();
    }
  };

  if (!visible) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <>
      <SpotlightOverlay onSkip={complete} />

      <div
        ref={cardRef}
        className="fixed z-50 left-1/2"
        style={{
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(480px, 92vw)",
        }}
      >
        <div
          className="rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #0f1e35 0%, #0A1628 100%)",
            border: "1px solid rgba(245,230,66,0.2)",
            boxShadow: "0 0 60px rgba(245,230,66,0.08), 0 24px 64px rgba(0,0,0,0.6)",
          }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              ProLnk Tour — {step + 1} of {STEPS.length}
            </span>
            <button
              onClick={complete}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
              aria-label="Skip tour"
            >
              <X size={14} className="text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {current.icon}
            </div>

            <h2 className="text-xl font-bold text-white mb-3 leading-snug">
              {current.title}
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {current.body}
            </p>

            {current.ctaHref && current.ctaLabel && (
              <Link href={current.ctaHref} onClick={complete}>
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold mb-6 transition-all hover:opacity-90"
                  style={{ background: "rgba(245,230,66,0.12)", color: "#F5E642", border: "1px solid rgba(245,230,66,0.25)" }}
                >
                  {current.ctaLabel} <ArrowRight size={14} />
                </span>
              </Link>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-6 pb-5"
          >
            <ProgressDots total={STEPS.length} current={step} />

            <div className="flex items-center gap-3">
              <button
                onClick={complete}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Skip tour
              </button>
              <button
                onClick={next}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "#F5E642", color: "#0A1628" }}
              >
                {isLast ? "Done" : "Next"}
                {!isLast && <ChevronRight size={15} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
