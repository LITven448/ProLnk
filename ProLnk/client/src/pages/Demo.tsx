import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Demo() {
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);

  const demoLogin = trpc.auth.demoLogin.useMutation({
    onSuccess: () => {
      // Hard reload to pick up the new session cookie, then go to dashboard
      window.location.href = "/dashboard";
    },
    onError: (err) => {
      setError(err.message || "Demo login failed. Please try again.");
    },
  });

  useEffect(() => {
    demoLogin.mutate();
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #f0fafa 0%, #e8f8f8 100%)" }}
    >
      <div className="text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="8" r="5" fill="#0A1628" />
            <circle cx="8" cy="30" r="5" fill="#0A1628" />
            <circle cx="32" cy="30" r="5" fill="#0A1628" />
            <line x1="20" y1="13" x2="8" y2="25" stroke="#0A1628" strokeWidth="2" />
            <line x1="20" y1="13" x2="32" y2="25" stroke="#0A1628" strokeWidth="2" />
            <line x1="13" y1="30" x2="27" y2="30" stroke="#0A1628" strokeWidth="2" />
          </svg>
          <span className="text-2xl font-bold tracking-tight" style={{ color: "#0A1628" }}>
            ProLnk
          </span>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-sm">
            <p className="text-red-700 font-medium mb-3">Something went wrong</p>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={() => { setError(null); demoLogin.mutate(); }}
              className="px-4 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: "#0A1628" }}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: "#0A1628", borderTopColor: "transparent" }}
            />
            <p className="text-base font-medium" style={{ color: "#0A1628" }}>
              Loading Partner Portal...
            </p>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Signing you in as Demo Partner
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
