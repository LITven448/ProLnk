import { useState, useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Trophy, Calendar, Users, Star, ArrowRight, CheckCircle, Clock, Share2, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const LAUNCH_DATE = new Date("2026-09-01T00:00:00"); // Target launch date — update when confirmed

const SHARE_URL = "https://prolnk.io/contest";
const SHARE_TEXT = "DFW homeowners & service pros — sign up for ProLnk & TrustyPro and compete for $10,000 in prizes. Top 5 referrers win cash + credits at the live launch event.";

function ShareButtons() {
  const copyLink = () => {
    navigator.clipboard.writeText(SHARE_URL);
    toast.success("Contest link copied!");
  };
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Post on X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Share on Facebook
      </a>
      <a
        href={`sms:?body=${encodeURIComponent(SHARE_TEXT + " " + SHARE_URL)}`}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Text a Friend
      </a>
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
      >
        <Copy className="w-4 h-4" />
        Copy Link
      </button>
    </div>
  );
}

function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = LAUNCH_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      {[
        { label: "Days", value: time.days },
        { label: "Hours", value: time.hours },
        { label: "Minutes", value: time.minutes },
        { label: "Seconds", value: time.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="bg-[#0A1628] text-[#F5E642] font-black text-3xl w-20 h-20 rounded-xl flex items-center justify-center tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">{label}</p>
        </div>
      ))}
    </div>
  );
}

const PRIZES = [
  { place: "1st Place", medal: "🥇", prize: "$10,000 Cash", sub: "Grand Prize — handed to you in person at the launch event", perks: ["Lifetime Founding Member status", "VIP reserved seat at the launch event", "Featured in ProLnk & TrustyPro marketing"], gold: true },
  { place: "2nd Place", medal: "🥈", prize: "$2,500 Credit", sub: "Home Improvement Credit (TrustyPro) or Lead Credits (ProLnk)", perks: ["2 years free Premium membership", "Launch event invite"], gold: false },
  { place: "3rd Place", medal: "🥉", prize: "$1,000 Credit", sub: "Home Improvement Credit (TrustyPro) or Lead Credits (ProLnk)", perks: ["1 year free Premium membership", "Launch event invite"], gold: false },
  { place: "4th Place", medal: "4️⃣", prize: "$500 Credit", sub: "Home Improvement or Lead Credits", perks: ["Priority matching at launch", "Launch event invite"], gold: false },
  { place: "5th Place", medal: "5️⃣", prize: "$250 Credit", sub: "Home Improvement or Lead Credits", perks: ["Priority matching at launch", "Launch event invite"], gold: false },
];

const RULES = [
  "Contest is open to DFW Metroplex residents and service professionals only.",
  "Referrals must sign up using your unique referral link — direct signups without your link do not count.",
  "Both homeowner (TrustyPro) and service pro (ProLnk) referrals count toward your total.",
  "Prizes are awarded at the live launch event. Winners must attend in person to claim cash prizes.",
  "Cash prize ($10,000) is awarded to the single top referrer across both platforms combined.",
  "Credits are non-transferable and expire 24 months after issuance.",
  "ProLnk and TrustyPro reserve the right to disqualify fraudulent or self-referral activity.",
  "Contest runs from the date of waitlist launch through the official product launch date.",
  "Winners will be contacted via the email used during waitlist signup at least 14 days before the event.",
];

export default function Contest() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] via-[#0f2040] to-[#1a2d4a] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5E642]/10 border border-[#F5E642]/30 rounded-full px-4 py-1.5 mb-6">
            <MapPin className="w-3.5 h-3.5 text-[#F5E642]" />
            <span className="text-[#F5E642] text-xs font-semibold uppercase tracking-wider">DFW Metroplex Only</span>
          </div>
          <h1 className="text-5xl font-black mb-4 leading-tight">
            Refer Your Neighbors.<br />
            <span className="text-[#F5E642]">Win $10,000.</span>
          </h1>
          <p className="text-white/70 text-lg mb-2 max-w-xl mx-auto">
            The top 5 people who refer the most DFW homeowners and service pros to ProLnk and TrustyPro win real prizes — handed to you in person at our launch event.
          </p>
          <p className="text-white/50 text-sm mb-8">Contest ends at launch. Winners celebrated live.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/waitlist/pro"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F5E642] text-[#0A1628] font-bold text-sm rounded-none hover:opacity-90 transition-opacity"
            >
              Join as a Service Pro <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/waitlist/homeowner"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 border border-white/20 text-white font-bold text-sm rounded-none hover:bg-white/15 transition-colors"
            >
              Join as a Homeowner <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="bg-gray-50 border-b border-gray-100 py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Estimated Time Until Launch</p>
          </div>
          <Countdown />
          <p className="text-xs text-gray-400 mt-2">Contest ends when ProLnk and TrustyPro officially launch in DFW</p>
        </div>
      </div>

      {/* Prize Tiers */}
      <div className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-black text-[#0A1628]">Prize Breakdown</h2>
            </div>
            <p className="text-gray-500 text-sm">Top 5 referrers across both ProLnk and TrustyPro win. Prizes are cumulative — the more you refer, the higher you climb.</p>
          </div>
          <div className="space-y-3">
            {PRIZES.map(({ place, medal, prize, sub, perks, gold }) => (
              <div
                key={place}
                className={`rounded-xl border p-5 ${gold ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300" : "bg-white border-gray-100"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{medal}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wider ${gold ? "text-amber-600" : "text-gray-400"}`}>{place}</span>
                      <span className={`text-xl font-black ${gold ? "text-amber-700" : "text-[#0A1628]"}`}>{prize}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">{sub}</p>
                    <div className="flex flex-wrap gap-2">
                      {perks.map((perk) => (
                        <span key={perk} className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${gold ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                          <CheckCircle className="w-3 h-3" />
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-[#0A1628] mb-2">How the Contest Works</h2>
            <p className="text-gray-500 text-sm">Simple. Sign up, share your link, climb the leaderboard.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Sign Up", desc: "Join the ProLnk or TrustyPro waitlist. You'll get a unique referral link after signing up.", icon: <Users className="w-6 h-6" /> },
              { step: "02", title: "Share Your Link", desc: "Share with DFW neighbors, contractors, and homeowners. Every signup through your link counts.", icon: <Star className="w-6 h-6" /> },
              { step: "03", title: "Win at the Event", desc: "Top 5 referrers are invited to the launch event where prizes are handed out in person.", icon: <Trophy className="w-6 h-6" /> },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#0A1628]/5 flex items-center justify-center mx-auto mb-4 text-[#0A1628]">
                  {icon}
                </div>
                <div className="text-xs font-black text-gray-300 mb-1 tracking-widest">{step}</div>
                <h3 className="font-bold text-[#0A1628] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Event */}
      <div className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#0A1628] to-[#1a2d4a] rounded-2xl p-8 text-white text-center">
            <Calendar className="w-10 h-10 text-[#F5E642] mx-auto mb-4" />
            <h2 className="text-2xl font-black mb-3">The Launch Event</h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-6">
              When ProLnk and TrustyPro officially launch in DFW, we're hosting a live event to celebrate. The top 5 referrers will be invited as VIP guests. The $10,000 grand prize winner will receive their check on stage. We'll document everything — this is a moment worth being part of.
            </p>
            <div className="flex items-center justify-center gap-2 bg-[#F5E642]/10 border border-[#F5E642]/20 rounded-xl px-6 py-3 inline-flex">
              <MapPin className="w-4 h-4 text-[#F5E642]" />
              <span className="text-[#F5E642] text-sm font-semibold">DFW Metroplex — Location TBD at Launch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-[#0A1628] mb-6">Official Contest Rules</h2>
          <div className="space-y-3">
            {RULES.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg border border-gray-100 px-4 py-3">
                <span className="text-xs font-black text-gray-300 w-5 flex-shrink-0 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <Share2 className="w-8 h-8 text-[#00B5B8] mx-auto mb-4" />
          <h2 className="text-2xl font-black text-[#0A1628] mb-2">Spread the Word</h2>
          <p className="text-gray-500 text-sm mb-6">Share this contest with DFW neighbors, contractors, and friends. The more people who know, the bigger the launch event.</p>
          <ShareButtons />
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-[#0A1628] mb-3">Ready to compete?</h2>
          <p className="text-gray-500 mb-8">Sign up now and start referring. The contest clock is running.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/waitlist/pro"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0A1628] text-white font-bold text-sm hover:opacity-90 transition-opacity"
            >
              I'm a Service Pro <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/waitlist/homeowner"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors"
            >
              I'm a Homeowner <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4">Questions? Contact us at hello@prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
