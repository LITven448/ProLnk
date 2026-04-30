import { Link } from "wouter";
import { Home, Search } from "lucide-react";
import ProLnkLogo from "@/components/ProLnkLogo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F0F2F5" }}>
      {/* Minimal nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <Link href="/">
          <ProLnkLogo height={32} variant="light" className="cursor-pointer" />
        </Link>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-md">
          {/* Big 404 watermark */}
          <div
            className="text-[9rem] font-black leading-none mb-2 select-none"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#0A1628", opacity: 0.07 }}
          >
            404
          </div>

          {/* Icon badge */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 -mt-8"
            style={{ background: "linear-gradient(135deg, #0A1628, #1a3050)" }}
          >
            <Search className="w-8 h-8 text-white" />
          </div>

          <h1
            className="text-3xl font-black text-gray-900 mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Page Not Found
          </h1>
          <p className="text-gray-500 mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#0A1628" }}
              >
                <Home className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
            <Link href="/apply">
              <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all">
                Apply to Join
              </button>
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">Quick Links</p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500">
              <Link href="/dashboard" className="hover:text-gray-900 transition-colors">Partner Login</Link>
              <Link href="/leaderboard" className="hover:text-gray-900 transition-colors">Leaderboard</Link>
              <Link href="/trustypro" className="hover:text-gray-900 transition-colors">TrustyPro</Link>
              <Link href="/partners" className="hover:text-gray-900 transition-colors">Directory</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
