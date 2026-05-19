/**
 * TrustyPro Homeowner Waitlist Landing Page
 * Route: /waitlist/homeowner  (also /join)
 * PUBLIC — no login required.
 * Standalone marketing page with live counter → redirects to /home-waitlist for full form.
 */
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import {
  Home, Camera, Shield, Star, ArrowRight, Clock,
  CheckCircle, FileText, Wrench, TrendingUp,
} from "lucide-react";

const BENEFITS = [
  {
    icon: <Camera className="w-5 h-5 text-indigo-400" />,
    title: "AI-powered home health score",
    desc: "Upload photos of your home and our AI analyzes every system — roof, HVAC, plumbing, electrical — and tells you what needs attention before it becomes expensive.",
  },
  {
    icon: <Shield className="w-5 h-5 text-indigo-400" />,
    title: "Verified, vetted pros only",
    desc: "Every contractor in the TrustyPro network is background-checked, licensed, and reviewed. No random Craigslist bids.",
  },
  {
    icon: <FileText className="w-5 h-5 text-indigo-400" />,
    title: "Home Passport — your home's full history",
    desc: "Every repair, upgrade, and service visit is documented. When you sell, the new owner gets the complete history — your home's permanent record, built to transfer.",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-indigo-400" />,
    title: "Protect and grow your home's value",
    desc: "Homes with documented maintenance histories sell faster and for more. TrustyPro turns your maintenance records into a financial asset.",
  },
];

const FEATURES = [
  "AI photo analysis — detect issues before they become expensive",
  "Home Health Vault — track every system's condition and life expectancy",
  "Home Passport — transferable history when you sell",
  "Verified contractor network — background-checked pros only",
  "Before & after photo documentation for every job",
  "Maintenance reminders and seasonal checklists",
  "100% free for homeowners — always",
];

export default function WaitlistHomeLanding() {
  const [, navigate] = useLocation();

  const stats = trpc.waitlist.getPublicCounts.useQuery(undefined, { refetchInterval: 60000 });
  const homeCount = (stats.data?.homes as number) ?? 0;
  const goal = 10000;
  const spotsLeft = Math.max(0, goal - homeCount);
  const pct = Math.min(100, Math.round((homeCount / goal) * 100));

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="TrustyPro — Homeowner Waitlist"
        description="Get AI-powered home health scans, find verified local pros, and protect your home's value. Join the TrustyPro waitlist today."
        path="/waitlist/homeowner"
      />
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-gray-900 text-lg tracking-tight">TrustyPro</span>
        </div>
        <Button
          onClick={() => navigate("/home-waitlist")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5"
        >
          Get Early Access
        </Button>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-6">
          <Clock className="w-3.5 h-3.5" />
          DFW Early Access — Free for Homeowners
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
          Your Home Deserves<br />
          <span className="text-indigo-600">A Trusted Network</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          TrustyPro connects homeowners with AI-powered home health analysis, verified contractors, and a complete maintenance history that travels with your home when you sell.
        </p>

        {/* Live Counter */}
        <div className="max-w-sm mx-auto bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 text-sm font-medium">Homeowners on the waitlist</span>
            <span className="text-indigo-600 font-black text-2xl">{homeCount.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(pct, 2)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{pct}% of {goal.toLocaleString()} early access spots filled</span>
            <span className="text-indigo-500 font-semibold">{spotsLeft.toLocaleString()} left</span>
          </div>
        </div>

        <Button
          onClick={() => navigate("/home-waitlist")}
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg px-10 py-4 rounded-xl"
        >
          Get Early Access — Free <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-gray-400 text-sm mt-3">Free forever for homeowners. No credit card required.</p>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Everything Your Home Needs in One Place</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {BENEFITS.map((b, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold mb-1">{b.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature checklist */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-gray-900 text-center mb-8">What You Get</h2>
        <div className="space-y-3">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm font-medium">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Home Passport callout */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FileText className="w-12 h-12 text-indigo-200 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-3">Introducing the Home Passport</h2>
          <p className="text-indigo-200 text-lg mb-6 max-w-xl mx-auto">
            Every repair, photo, and service visit is permanently documented in your Home Passport. When you sell, the new owner inherits the complete history — every upgrade, every inspection, fully verified and transferable.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { value: "Passport", label: "built to transfer" },
              { value: "100%", label: "transferable on sale" },
              { value: "AI", label: "analyzed & verified" },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-2xl font-black text-white mb-1">{s.value}</div>
                <div className="text-xs text-indigo-200">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "$0", label: "Cost to homeowners — forever" },
            { value: "AI", label: "Photo analysis on every upload" },
            { value: "22+", label: "Verified service categories" },
            { value: "DFW", label: "Launching first in Dallas-Fort Worth" },
          ].map((s, i) => (
            <div key={i} className="text-center p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="text-3xl font-black text-indigo-600 mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
          <Star className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-gray-900 mb-3">Join the Early Access List</h2>
          <p className="text-gray-500 mb-6">
            Be among the first homeowners in DFW to get access when TrustyPro launches. Free forever — no catch.
          </p>
          <Button
            onClick={() => navigate("/home-waitlist")}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg px-10 py-4 rounded-xl w-full"
          >
            Get Early Access — Free <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-gray-400 text-xs mt-3">
            Takes 3 minutes. No credit card. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
            <Home className="w-3 h-3 text-white" />
          </div>
          <span className="font-black text-gray-700 text-sm">TrustyPro</span>
        </div>
        <p className="text-gray-400 text-xs">© 2026 TrustyPro by ProLnk. DFW, Texas. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="https://prolnk.io" className="text-gray-400 hover:text-gray-600 text-xs">ProLnk.io</a>
          <a href="/waitlist/pro" className="text-gray-400 hover:text-gray-600 text-xs">Service Pro Waitlist</a>
        </div>
      </footer>
    </div>
  );
}
