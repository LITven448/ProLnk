import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy, CheckCircle, Zap, MessageSquare, Share2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Post {
  id: string;
  platform: "LinkedIn" | "Twitter/X" | "Facebook" | "SMS";
  platformColor: string;
  platformBg: string;
  characterLimit: number;
  label: string;
  hook: string;
  body: string;
  tip: string;
}

// ─── Platform SVG icons ───────────────────────────────────────────────────────
function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24″ fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterXIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24″ fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24″ fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SmsIcon({ size = 18 }: { size?: number }) {
  return <MessageSquare width={size} height={size} />;
}

const PLATFORM_ICONS: Record<Post["platform"], typeof LinkedInIcon> = {
  LinkedIn: LinkedInIcon,
  "Twitter/X": TwitterXIcon,
  Facebook: FacebookIcon,
  SMS: SmsIcon,
};

// ─── Post data (referral link placeholder substituted at render time) ─────────
function buildPosts(referralLink: string, partnerCode: string): Post[] {
  return [
    {
      id: "linkedin_founding",
      platform: "LinkedIn",
      platformColor: "#0A66C2″,
      platformBg: "#EBF3FB",
      characterLimit: 3000,
      label: "Founding Network Announcement",
      hook: "I secured one of 500 founding partner spots in ProLnk — before the platform opens to the public.",
      body: `Excited to share that I've joined the ProLnk Founding Partner Network — one of only 500 contractors nationwide to secure a founding spot before the platform opens to the public.

ProLnk is an AI-powered home services marketplace that connects verified contractors with pre-qualified homeowners. As a founding member, I've locked in exclusive rates and a 4-level network income structure that isn’t available after launch.

If you're a licensed home service contractor — HVAC, plumbing, electrical, roofing, or any other trade — I’d love to connect. This is unlike any opportunity I’ve seen in our industry.

Learn more or apply through my link: ${referralLink}

#HomeServices #Contractor #ProLnk #FoundingPartner #Entrepreneurship`,
      tip: "Post Tuesday or Wednesday morning for peak LinkedIn contractor engagement.",
    },
    {
      id: "linkedin_passive",
      platform: "LinkedIn",
      platformColor: "#0A66C2″,
      platformBg: "#EBF3FB",
      characterLimit: 3000,
      label: "Passive Income Story",
      hook: "Most contractors trade time for money. I found a better model.",
      body: `Most contractors I know are trading time for money. I've been doing the same for years.

That changed when I joined ProLnk as a founding partner. The income structure:

→ Direct commissions on matched jobs (12–50% tier-based)
→ Override income from contractors in my network (4 levels deep)
→ Recurring subscription overrides from pros I refer
→ Homeowner origination fees — permanent and recurring

If you're in the trades and want predictable income that doesn’t stop when you put down your tools, I’m happy to share more.

My referral link: ${referralLink}

#ContractorLife #PassiveIncome #ProLnk #HomeServices`,
      tip: "Include specific numbers and percentages — LinkedIn audiences engage more with concrete data.",
    },
    {
      id: "twitter_hook",
      platform: "Twitter/X",
      platformColor: "#000000″,
      platformBg: "#F7F7F7″,
      characterLimit: 280,
      label: "Passive Income Hook",
      hook: "Short, punchy hook for maximum reach",
      body: `Contractors: what if your network paid you while you sleep?

Joined @ProLnk as a founding partner. 4-level override income. 500 founding spots left.

${referralLink}`,
      tip: "Tweet 7–9am local time. Pin to profile for 30 days. Add a screenshot of your dashboard for 3× engagement.",
    },
    {
      id: "twitter_announce",
      platform: "Twitter/X",
      platformColor: "#000000″,
      platformBg: "#F7F7F7″,
      characterLimit: 280,
      label: "Short Announcement",
      hook: "Crisp announcement format",
      body: `Just locked in my founding partner spot with @ProLnk — AI-powered marketplace for licensed contractors.

500 founding spots. Exclusive income structure. If you're in the trades, you should see this.

${referralLink}`,
      tip: "Pair with a photo of your job site or tools for 2× more impressions.",
    },
    {
      id: "facebook_community",
      platform: "Facebook",
      platformColor: "#1877F2″,
      platformBg: "#E7F3FF",
      characterLimit: 63206,
      label: "Community Outreach Post",
      hook: "Local neighborhood or Facebook group post",
      body: `Hey neighbors! 👋

I'm part of a new home services network called ProLnk and wanted to share it with our community.

Here's how it works for homeowners:
✅ Describe what you need (roof repair, HVAC, plumbing, etc.)
✅ ProLnk's AI matches you with verified local contractors
✅ Get 3 quotes — no cold calls, no strangers at your door
✅ Every job is tracked so you have a permanent record

And for any local contractors — there's a founding partner opportunity with income streams I’ve never seen in the industry.

Happy to answer questions below. Or use my link to learn more:
${referralLink}

#HomeServices #ProLnk #LocalBusiness #[YourCity]`,
      tip: "Post in local neighborhood Facebook groups for 5× more organic reach than your personal page.",
    },
    {
      id: "facebook_story",
      platform: "Facebook",
      platformColor: "#1877F2″,
      platformBg: "#E7F3FF",
      characterLimit: 63206,
      label: "My ProLnk Story",
      hook: "Personal story format — highest conversion",
      body: `I want to tell you why I joined ProLnk as a founding partner.

After years in the trades, I was tired of slow seasons, chasing leads, and paying high fees to lead services that sent me garbage.

ProLnk is different. The AI pre-screens homeowners before sending them to you. You pay a fair fee on closed jobs. And you earn override income from every contractor you bring into your network.

I joined as one of the 500 founding partners — and I'm already building something that pays me passively.

If you're a contractor who wants more predictable income, or a homeowner who wants better vetted professionals, use my link:
${referralLink}

Real people. Real results. That's why I’m here.`,
      tip: "This personal story format (pain → solution → result → CTA) converts 3–5× better than product announcements.",
    },
    {
      id: "sms_colleague",
      platform: "SMS",
      platformColor: "#16A34A",
      platformBg: "#F0FDF4″,
      characterLimit: 160,
      label: "Colleague Invite",
      hook: "Direct text to a contractor contact",
      body: `Hey [Name], heard of ProLnk? AI home services marketplace — founding partner spots open. Check it out: ${referralLink}`,
      tip: "98% open rate vs. 20% for email. Text existing contractor contacts directly.",
    },
    {
      id: "sms_homeowner",
      platform: "SMS",
      platformColor: "#16A34A",
      platformBg: "#F0FDF4″,
      characterLimit: 160,
      label: "Homeowner Invite",
      hook: "Text to a past customer",
      body: `Hi [Name], it's [Your Name]. Get free quotes from vetted local contractors through ProLnk — no cold callers. ${referralLink}`,
      tip: "Send to past customers who gave you 5-star reviews for best conversion.",
    },
  ];
}

// ─── Character count bar ──────────────────────────────────────────────────────
function CharBar({ count, limit, color }: { count: number; limit: number; color: string }) {
  const pct = Math.min(100, Math.round((count / limit) * 100));
  const isOver = count > limit;
  if (limit >= 63206) return null;
  return (
    <div className="flex items-center gap-2 mt-1.5″>
      <div className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: isOver ? "#EF4444″ : color }} />
      </div>
      <span className={`text-[10px] font-mono font-bold tabular-nums ${isOver ? "text-red-500" : "text-gray-400"}`}>
        {count}/{limit}
      </span>
    </div>
  );
}

// ─── Post card ────────────────────────────────────────────────────────────────
function PostCard({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);
  const PlatformIcon = PLATFORM_ICONS[post.platform];

  const handleCopy = () => {
    navigator.clipboard.writeText(post.body).then(() => {
      setCopied(true);
      toast.success(`${post.platform} post copied! Open ${post.platform} and paste.`);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => toast.error("Copy failed — please select and copy the text manually."));
  };

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Platform header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100″ style={{ backgroundColor: post.platformBg }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0″ style={{ backgroundColor: post.platformColor }}>
          <PlatformIcon size={16} />
        </div>
        <div className="flex-1 min-w-0″>
          <p className="text-xs font-bold text-gray-800 truncate">{post.label}</p>
          <p className="text-[10px] text-gray-500″>{post.platform}</p>
        </div>
        <Badge className="text-[10px] bg-white/70 text-gray-500 border-gray-200 flex-shrink-0″>
          {post.characterLimit < 63206 ? `${post.characterLimit} char limit` : "No limit"}
        </Badge>
      </div>

      <div className="p-4″>
        {/* Hook label */}
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-2″>{post.hook}</p>

        {/* Post preview */}
        <div className="p-3 rounded-xl bg-gray-50 text-xs text-gray-600 leading-relaxed whitespace-pre-wrap max-h-44 overflow-y-auto mb-1.5 border border-gray-100″>
          {post.body}
        </div>

        <CharBar count={post.body.length} limit={post.characterLimit} color={post.platformColor} />

        {/* Tip */}
        <div className="flex items-start gap-1.5 mt-3 mb-3 p-2 rounded-lg" style={{ backgroundColor: `${post.platformColor}10` }}>
          <Zap className="w-3 h-3 mt-0.5 flex-shrink-0″ style={{ color: post.platformColor }} />
          <p className="text-[10px] leading-snug" style={{ color: post.platformColor }}>{post.tip}</p>
        </div>

        {/* CTA */}
        <Button
          size="sm"
          className="w-full gap-2 text-xs font-semibold text-white transition-all"
          style={{ backgroundColor: post.platformColor }}
          onClick={handleCopy}
        >
          {copied ? <CheckCircle className="w-3.5 h-3.5″ /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied! Now open " + post.platform : `Copy + Post to ${post.platform}`}
        </Button>
      </div>
    </div>
  );
}

// ─── Platform filter pill ─────────────────────────────────────────────────────
const FILTERS: Array<{ label: string; value: Post["platform"] | "all"; color: string }> = [
  { label: "All Platforms", value: "all", color: "#6B7280″ },
  { label: "LinkedIn", value: "LinkedIn", color: "#0A66C2″ },
  { label: "Twitter/X", value: "Twitter/X", color: "#000000″ },
  { label: "Facebook", value: "Facebook", color: "#1877F2″ },
  { label: "SMS", value: "SMS", color: "#16A34A" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SocialShare() {
  const { user } = useAuth();
  const { data: partner } = trpc.partners.getMyProfile.useQuery();
  const [activeFilter, setActiveFilter] = useState<Post["platform"] | "all">("all");

  const partnerCode = partner?.partner?.id ? `P${partner.partner.id}` : "YOUR_CODE";
  const referralLink = `${window.location.origin}/ref/${partnerCode}`;

  const allPosts = buildPosts(referralLink, partnerCode);
  const filtered = activeFilter === "all" ? allPosts : allPosts.filter(p => p.platform === activeFilter);

  const platformCounts = allPosts.reduce<Record<string, number>>((acc, p) => {
    acc[p.platform] = (acc[p.platform] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gray-50″>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10″>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-base font-black text-gray-800 flex items-center gap-2″>
                <Share2 className="w-4 h-4 text-teal-500″ />
                Social Share Hub
              </h1>
              <p className="text-xs text-gray-400″>
                Your referral link is embedded in every post. Copy and paste directly into each platform.
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="text-xs gap-1.5″>← Dashboard</Button>
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6″>
          {/* Referral link display */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
            <div className="flex-1 min-w-0″>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-0.5″>Your Referral Link (embedded in all posts)</p>
              <p className="text-sm font-mono font-bold text-teal-600 truncate">{referralLink}</p>
            </div>
            <Button
              size="sm"
              className="flex-shrink-0 gap-1.5 text-xs bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => {
                navigator.clipboard.writeText(referralLink);
                toast.success("Referral link copied!");
              }}
            >
              <Copy className="w-3.5 h-3.5″ />
              Copy Link
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6″>
            {[
              { label: "Total Posts", value: allPosts.length, color: "#6B7280″ },
              { label: "LinkedIn Posts", value: platformCounts["LinkedIn"] ?? 0, color: "#0A66C2″ },
              { label: "Twitter/X Posts", value: platformCounts["Twitter/X"] ?? 0, color: "#000000″ },
              { label: "Facebook Posts", value: platformCounts["Facebook"] ?? 0, color: "#1877F2″ },
            ].map(s => (
              <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm text-center">
                <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] text-gray-400 mt-0.5″>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Platform filter */}
          <div className="flex flex-wrap gap-2 mb-6″>
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={activeFilter === f.value
                  ? { backgroundColor: f.color, color: "#fff", borderColor: f.color }
                  : { backgroundColor: "#fff", color: "#6B7280″, borderColor: "#E5E7EB" }
                }
              >
                {f.label}
                {f.value !== "all" && (
                  <span className="text-[10px] opacity-70″>({platformCounts[f.value as string] ?? 0})</span>
                )}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8″>
            {filtered.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-3″>
              <Share2 className="w-5 h-5 text-teal-500″ />
            </div>
            <h3 className="font-black text-gray-800 mb-1″>More Marketing Tools</h3>
            <p className="text-xs text-gray-400 mb-4 max-w-sm mx-auto">
              Access print materials, email templates, QR codes, logo downloads, and co-branded assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link href="/dashboard/marketing-kit">
                <Button size="sm" className="gap-1.5 text-xs bg-teal-600 hover:bg-teal-700 text-white">
                  Marketing Kit <ArrowRight className="w-3.5 h-3.5″ />
                </Button>
              </Link>
              <Link href="/content-library">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                  Content Library <ArrowRight className="w-3.5 h-3.5″ />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
