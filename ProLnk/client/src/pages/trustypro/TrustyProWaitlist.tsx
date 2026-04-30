/**
 * TrustyPro Waitlist / Coming Soon page
 * Route: /trustypro/waitlist
 * Shown to public visitors when the homeowner platform is in waitlist mode.
 * Admin can toggle the waitlist gate from the admin panel.
 */
import { useState } from "react";
import { Link } from "wouter";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle, Shield, Star, Home, Zap, ArrowRight, Users, ChevronRight } from "lucide-react";

const BENEFITS = [
  { icon: <Shield className="w-5 h-5 text-indigo-400" />, title: "Vetted Pros Only", desc: "Every professional is license-verified, insured, and background-checked." },
  { icon: <Zap className="w-5 h-5 text-indigo-400" />, title: "AI-Powered Matching", desc: "Upload photos of your home and our AI identifies the right pros for each job." },
  { icon: <Star className="w-5 h-5 text-indigo-400" />, title: "Real Homeowner Reviews", desc: "Ratings from verified homeowners in your neighborhood — no fake reviews." },
  { icon: <Home className="w-5 h-5 text-indigo-400" />, title: "Your Home Profile", desc: "Track improvements, warranties, and maintenance history all in one place." },
];

export default function TrustyProWaitlist() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const joinWaitlist = trpc.trustyPro.joinWaitlist.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("You're on the list! We'll be in touch soon.");
    },
    onError: (e) => toast.error(e.message ?? "Something went wrong. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    joinWaitlist.mutate({ email: email.trim(), name: name.trim() || undefined });
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0F0C29 0%, #1B1464 50%, #24243e 100%)" }}>
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
        <TrustyProLogo height={36} />
        <Link href="/">
          <span className="text-sm text-white/50 hover:text-white/80 cursor-pointer transition-colors">ProLnk for Pros →</span>
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-6">
              <Users className="w-3.5 h-3.5" /> DFW Beta — Limited Spots
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Find Pros You Can<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #818CF8, #C084FC)" }}>
                Actually Trust
              </span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              TrustyPro connects DFW homeowners with pre-vetted, insured, and reviewed home service professionals. 
              AI scans your home photos to match you with the right pros — before you even ask.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="mt-0.5 flex-shrink-0">{b.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{b.title}</p>
                    <p className="text-xs text-white/50 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((l, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1B1464] flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: ["#6366F1", "#8B5CF6", "#A78BFA", "#C084FC"][i] }}>
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/60">
                <span className="text-white font-semibold">200+ homeowners</span> already on the waitlist
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">You're on the list!</h2>
                <p className="text-white/60 text-sm mb-6">
                  We'll send you an invite when TrustyPro launches in your area. 
                  Expect early access within the next few weeks.
                </p>
                <Link href="/">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Learn About ProLnk for Pros
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                <h2 className="text-xl font-bold text-white mb-2">Join the Waitlist</h2>
                <p className="text-white/60 text-sm mb-6">
                  Be first in line when TrustyPro opens in your neighborhood.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-white/60 uppercase tracking-wide block mb-1.5">Your Name</label>
                    <Input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Jane Smith"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-white/60 uppercase tracking-wide block mb-1.5">Email Address <span className="text-red-400">*</span></label>
                    <Input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-indigo-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-white font-semibold gap-2"
                    style={{ background: "linear-gradient(90deg, #6366F1, #8B5CF6)" }}
                    disabled={joinWaitlist.isPending}
                  >
                    {joinWaitlist.isPending ? "Joining..." : "Get Early Access"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
                <p className="text-xs text-white/30 text-center mt-4">
                  No spam. Unsubscribe anytime. DFW area only during beta.
                </p>
              </div>
            )}

            {/* Already have access */}
            <div className="mt-4 text-center">
              <Link href="/trustypro/login">
                <span className="text-sm text-indigo-300 hover:text-indigo-200 cursor-pointer transition-colors">
                  Already have access? Sign in <ChevronRight className="w-3.5 h-3.5 inline" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
