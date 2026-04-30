import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Search, X, ArrowRight, Users, Briefcase, DollarSign, Activity, BarChart2, Settings, Home, Zap, Camera, FileText } from "lucide-react";

interface SearchResult {
  label: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const ALL_PAGES: SearchResult[] = [
  // Admin
  { label: "Command Center", description: "Admin overview dashboard", href: "/admin", icon: Activity, category: "Admin" },
  { label: "Partner Applications", description: "Review and approve new partner applications", href: "/admin/applications", icon: Users, category: "Admin" },
  { label: "Partner Network", description: "Manage all active partners", href: "/admin/partners", icon: Users, category: "Admin" },
  { label: "Opportunities", description: "All service opportunities in the pipeline", href: "/admin/opportunities", icon: Briefcase, category: "Admin" },
  { label: "Commission Ledger", description: "Track all commissions and payouts", href: "/admin/commissions", icon: DollarSign, category: "Admin" },
  { label: "Financial Center", description: "Revenue analytics and financial reports", href: "/admin/financial", icon: DollarSign, category: "Admin" },
  { label: "Activity Log", description: "Platform-wide event history", href: "/admin/activity", icon: Activity, category: "Admin" },
  { label: "TrustyPro Leads", description: "Homeowner leads from TrustyPro", href: "/admin/trustypro-leads", icon: Home, category: "Admin" },
  { label: "Platform Health", description: "System health and performance metrics", href: "/admin/health", icon: BarChart2, category: "Admin" },
  { label: "Analytics", description: "Platform-wide analytics and insights", href: "/admin/analytics", icon: BarChart2, category: "Admin" },
  { label: "Leaderboard", description: "Top performing partners", href: "/admin/leaderboard", icon: Users, category: "Admin" },
  { label: "Admin Settings", description: "Platform configuration", href: "/admin/settings", icon: Settings, category: "Admin" },
  // Partner
  { label: "Partner Dashboard", description: "Your partner overview", href: "/dashboard", icon: Activity, category: "Partner" },
  { label: "My Jobs", description: "View and manage your jobs", href: "/dashboard/jobs", icon: Briefcase, category: "Partner" },
  { label: "Log a Job", description: "Record a new completed job", href: "/dashboard/log-job", icon: FileText, category: "Partner" },
  { label: "My Earnings", description: "Track your commissions and payouts", href: "/dashboard/earnings", icon: DollarSign, category: "Partner" },
  { label: "Referral Hub", description: "Share your referral link and track clicks", href: "/dashboard/referral", icon: Zap, category: "Partner" },
  { label: "Analytics", description: "Your performance analytics", href: "/dashboard/analytics", icon: BarChart2, category: "Partner" },
  { label: "AI Assistant", description: "Ask questions about your business", href: "/dashboard/ai", icon: Zap, category: "Partner" },
  { label: "Edit Profile", description: "Update your business profile", href: "/dashboard/profile", icon: Settings, category: "Partner" },
  // TrustyPro
  { label: "TrustyPro Home", description: "Homeowner portal home", href: "/trustypro", icon: Home, category: "TrustyPro" },
  { label: "Find a Pro", description: "Browse verified professionals", href: "/trustypro/pros", icon: Users, category: "TrustyPro" },
  { label: "AI Home Scan", description: "Upload photos for AI analysis", href: "/my-home/photos", icon: Camera, category: "TrustyPro" },
  { label: "My Offers", description: "Service offers for your home", href: "/my-home/offers", icon: Zap, category: "TrustyPro" },
];

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim().length === 0
    ? ALL_PAGES.slice(0, 8)
    : ALL_PAGES.filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) onClose(); // toggle handled by parent
      }
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (href: string) => {
    navigate(href);
    onClose();
  };

  const grouped = filtered.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, features..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {Object.entries(grouped).map(([category, results]) => (
            <div key={category}>
              <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{category}</div>
              {results.map((result) => (
                <button
                  key={result.href}
                  onClick={() => handleSelect(result.href)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                    <result.icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{result.label}</p>
                    <p className="text-xs text-gray-500 truncate">{result.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              No results for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>Navigate with  Enter</span>
          <span>K to open</span>
        </div>
      </div>
    </div>
  );
}

export default GlobalSearch;
