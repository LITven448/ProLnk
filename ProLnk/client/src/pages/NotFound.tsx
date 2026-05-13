import { Link } from "wouter";
import { Home, Search, ArrowRight, Shield } from "lucide-react";
import ProLnkLogo from "@/components/ProLnkLogo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0A1628" }}>
      {/* Minimal nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <Link href="/">
          <ProLnkLogo height={32} variant="dark" className="cursor-pointer" />
        </Link>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg">
          {/* Big 404 watermark */}
          <div
            className="text-[10rem] font-black leading-none mb-2 select-none"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#F5E642", opacity: 0.06 }}
          >
            404
          </div>

          {/* Icon badge */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 -mt-8"
            style={{ background: "linear-gradient(135deg, #F5E642, #e6d520)" }}
          >
            <Search className="w-8 h-8 text-[#0A1628]" />
          </div>

          <h1
            className="text-3xl font-black text-white mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Page Not Found
          </h1>
          <p className="text-white/50 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Try searching or use the links below.
          </p>

          {/* Search bar (UI only) */}
          <div className="relative mb-8 max-w-sm mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search ProLnk..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#F5E642]/50 rounded-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="/">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#F5E642", color: "#0A1628" }}
              >
                <Home className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
            <Link href="/apply">
              <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold border-2 border-white/20 text-white hover:border-[#F5E642] hover:text-[#F5E642] transition-all">
                Join Network
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/trustypro">
              <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold border-2 border-white/20 text-white hover:border-teal-400 hover:text-teal-400 transition-all">
                <Shield className="w-4 h-4" />
                TrustyPro
              </button>
            </Link>
          </div>

          {/* Quick links */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-4 font-semibold">Quick Links</p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-white/50">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/apply" className="hover:text-white transition-colors">Join Network</Link>
              <Link href="/trustypro" className="hover:text-white transition-colors">TrustyPro</Link>
              <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
              <Link href="/waitlist-status" className="hover:text-white transition-colors">Waitlist Status</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
