import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Copy, Check, Link2, Clock, Instagram, MessageSquare,
  TrendingUp, Share2, Zap, ExternalLink
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Platform = "LinkedIn" | "Facebook" | "Instagram" | "SMS";

interface Post {
  id: string;
  platform: Platform;
  label: string;
  body: string;
  tip?: string;
}

// ─── Platform icons ─────────────────────────────────────────────────────────────
function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24″ fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24″ fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// ─── Constants ──────────────────────────────────────────────────────────────────
const REFERRAL_LINK = "prolnk.io/join?ref=partner123″;
const PARTNER_CODE = "partner123″;

const STAT_CARDS = [
  {
    id: "jobs",
    text: `I've completed 84 jobs on ProLnk`,
    subtext: "Home services platform",
    icon: <Zap className="w-4 h-4 text-teal-400″ />,
    color: "border-teal-500/30 bg-teal-500/5″,
  },
  {
    id: "earnings",
    text: `I earn $3,200/month with ProLnk`,
    subtext: "Monthly active earnings",
    icon: <TrendingUp className="w-4 h-4 text-emerald-400″ />,
    color: "border-emerald-500/30 bg-emerald-500/5″,
  },
  {
    id: "passive",
    text: `My network earns me $247/month passively`,
    subtext: "Network override income",
    icon: <Share2 className="w-4 h-4 text-blue-400″ />,
    color: "border-blue-500/30 bg-blue-500/5″,
  },
];

const POSTS: Post[] = [
  {
    id: "li_1″,
    platform: "LinkedIn",
    label: "6-Month Milestone",
    body: `I've been building my home services business with ProLnk for 6 months — and I want to share what's actually working.

Before ProLnk, I was chasing leads on outdated platforms, paying high referral fees, and dealing with homeowners who weren't serious. The math didn’t work.

ProLnk changed that. AI pre-screens every homeowner before a lead reaches me. My close rate went from 30% to 68%. And the network income structure means my busiest season is now my teammates' season too.

If you're in the trades and tired of the old model, I’d love to connect.

Apply through my link: prolnk.io/join?ref=${PARTNER_CODE}

#HomeServices #Contractor #ProLnk #Trades #PassiveIncome`,
    tip: "Best posted Tuesday or Wednesday 8–10am for peak contractor engagement.",
  },
  {
    id: "li_2″,
    platform: "LinkedIn",
    label: "Passive Income Angle",
    body: `Most contractors trade time for money. I found a better model.

For the past several months I've been earning override income from every contractor I’ve brought into my ProLnk network — even on days I don’t run a single job.

This isn't an MLM. It’s a performance-based referral structure that rewards the pros who grow the platform. I earn a percentage of every job my recruits close, down 4 levels deep.

If you're a licensed contractor who wants predictable, scalable income — this is what I’d look at first.

Link in comments. Happy to answer questions.

#Contractor #NetworkIncome #ProLnk #HomeServices #Trades`,
    tip: "Leads with 'I found a better model' outperform product-first intros by 2.3×.",
  },
  {
    id: "li_3″,
    platform: "LinkedIn",
    label: "Founding Partner Announcement",
    body: `I secured one of 500 founding partner spots in ProLnk before the public launch.

ProLnk is an AI-powered home services marketplace — it matches verified contractors with pre-qualified homeowners and pays 5 income streams per job. Founding partners locked in rates that won't be available after launch.

I'm looking to connect with licensed contractors in the DFW area who want to build alongside me.

Apply here: prolnk.io/join?ref=${PARTNER_CODE}

#ProLnk #FoundingPartner #HomeServices #DFW #Contractor`,
    tip: "Tag 2–3 contractor colleagues in a comment for 4× more organic reach.",
  },
  {
    id: "fb_1″,
    platform: "Facebook",
    label: "Platform Changed My Business",
    body: `Guys, this platform changed my business and I have to share it.

I was skeptical at first — I've tried every lead service out there. But ProLnk is different. The AI actually screens homeowners before sending them to me. No tire-kickers. No wasted estimates.

I've done 84 jobs through the platform and my passive income from my network is up to $247/month on top of my regular work.

If you're a contractor OR a homeowner who wants better pros — check this out:
prolnk.io/join?ref=${PARTNER_CODE}

Real talk, this is the best thing I've joined in years.`,
    tip: "Post in local neighborhood Facebook groups for 5× more organic reach.",
  },
  {
    id: "fb_2″,
    platform: "Facebook",
    label: "Homeowner-Friendly Post",
    body: `Hey everyone — wanted to share a resource for anyone who's struggled to find a trustworthy contractor.

ProLnk is a platform that vets home service pros (HVAC, plumbing, roofing, electrical, etc.) and lets homeowners request quotes without the runaround.

As one of the verified pros on the platform, I'm proud to say every job I do through ProLnk is tracked, rated, and backed.

If you need work done on your home, use my link to get started:
prolnk.io/join?ref=${PARTNER_CODE}

No cold calls. No strangers at your door. Just verified pros.`,
    tip: "This post targets homeowners directly — great for neighborhood groups.",
  },
  {
    id: "fb_3″,
    platform: "Facebook",
    label: "Personal Story",
    body: `I want to be honest about something.

Three years ago, I was driving 45 minutes for estimates on jobs I didn't close. Paying $50–$80 per lead to platforms that oversold the same homeowner to 10 contractors.

I almost quit the trades.

Then I found ProLnk. Pre-qualified leads. AI matching. A network structure that pays me even when I'm not working.

I'm not quitting anytime soon.

If you're in home services, reach out or use my link:
prolnk.io/join?ref=${PARTNER_CODE}`,
    tip: "Pain → solution → result stories convert 3–5× better than product posts.",
  },
  {
    id: "ig_1″,
    platform: "Instagram",
    label: "Short Punchy Caption",
    body: `84 jobs. $3,200/month. $247/month passive.

That's what 6 months on ProLnk looks like. 🏠⚡

DM me if you're in the trades and want in on the founding partner network.

Link in bio → prolnk.io/join?ref=${PARTNER_CODE}

#HomeServices #Contractor #SideIncome #Trades #ProLnk #DFW`,
    tip: "Pair with a before/after photo of a completed job for 2× saves.",
  },
  {
    id: "ig_2″,
    platform: "Instagram",
    label: "Network Income Hook",
    body: `Unpopular opinion: you shouldn't be trading time for money in 2026.

I get paid when my network works. ProLnk's 4-level override structure means my recruits' jobs = my income. 🔄

Only 500 founding partner spots. Link in bio.

#PassiveIncome #Contractor #NetworkIncome #ProLnk #Trades #HomeServices`,
    tip: "Post at 7–9am local time when trades pros are starting their day.",
  },
  {
    id: "sms_1″,
    platform: "SMS",
    label: "Contractor Invite",
    body: `Hey [Name], heard of ProLnk? AI home services platform — I'm a founding partner. Only 500 spots. Check it out: prolnk.io/join?ref=${PARTNER_CODE}`,
    tip: "98% open rate vs. 20% for email. Text existing contractor contacts directly.",
  },
  {
    id: "sms_2″,
    platform: "SMS",
    label: "Homeowner Invite",
    body: `Hey [Name]! If you ever need a contractor, check out ProLnk. I'm a verified pro on it — fast quotes, vetted contractors: prolnk.io/join?ref=${PARTNER_CODE}`,
    tip: "Great for sending to neighbors and past homeowner clients.",
  },
];

const PLATFORM_META: Record<Platform, { icon: JSX.Element; color: string; badge: string }> = {
  LinkedIn: {
    icon: <LinkedInIcon />,
    color: "bg-blue-600/20 text-blue-300 border-blue-500/30″,
    badge: "text-blue-400″,
  },
  Facebook: {
    icon: <FacebookIcon />,
    color: "bg-indigo-600/20 text-indigo-300 border-indigo-500/30″,
    badge: "text-indigo-400″,
  },
  Instagram: {
    icon: <Instagram className="w-4 h-4″ />,
    color: "bg-pink-600/20 text-pink-300 border-pink-500/30″,
    badge: "text-pink-400″,
  },
  SMS: {
    icon: <MessageSquare className="w-4 h-4″ />,
    color: "bg-emerald-600/20 text-emerald-300 border-emerald-500/30″,
    badge: "text-emerald-400″,
  },
};

const PLATFORMS: Platform[] = ["LinkedIn", "Facebook", "Instagram", "SMS"];

const ASSET_TILES = [
  { label: "ProLnk Logo — White", size: "1080×1080″, ext: "PNG" },
  { label: "Founding Partner Badge", size: "500×500″, ext: "PNG" },
  { label: "Stats Card Template", size: "1080×1350″, ext: "PNG" },
  { label: "Referral Banner", size: "1200×628″, ext: "PNG" },
];

// ─── CopyButton ─────────────────────────────────────────────────────────────────
function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400″ /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

// ─── PostCard ───────────────────────────────────────────────────────────────────
function PostCard({ post }: { post: Post }) {
  const meta = PLATFORM_META[post.platform];
  return (
    <Card className="bg-[#111C2D] border-slate-700″>
      <CardContent className="p-4″>
        <div className="flex items-center justify-between mb-3″>
          <div className="flex items-center gap-2″>
            <span className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border ${meta.color}`}>
              {meta.icon}
              {post.platform}
            </span>
            <span className="text-slate-400 text-xs">{post.label}</span>
          </div>
          <CopyButton text={post.body} />
        </div>
        <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
          {post.body}
        </pre>
        {post.tip && (
          <p className="mt-3 text-xs text-amber-400/80 bg-amber-500/5 border border-amber-500/20 rounded px-3 py-2″>
            💡 {post.tip}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────────
export default function SocialSharingKit() {
  const [activePlatform, setActivePlatform] = useState<Platform>("LinkedIn");

  const filteredPosts = POSTS.filter(p => p.platform === activePlatform);

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8″>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Social Sharing Kit</h1>
          <p className="text-slate-400 mt-1″>Grow your network with ready-to-post content</p>
        </div>

        {/* Shareable stat cards */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3″>Your Stats to Share</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3″>
            {STAT_CARDS.map(card => (
              <Card key={card.id} className={`border ${card.color} bg-transparent`}>
                <CardContent className="p-4″>
                  <div className="flex items-center gap-2 mb-2″>
                    {card.icon}
                    <span className="text-slate-400 text-xs">{card.subtext}</span>
                  </div>
                  <p className="text-white text-sm font-medium leading-snug mb-3″>"{card.text}"</p>
                  <CopyButton text={card.text} label="Copy stat" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pre-written posts */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3″>Pre-Written Posts</h2>

          {/* Platform tabs */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {PLATFORMS.map(platform => {
              const meta = PLATFORM_META[platform];
              const active = activePlatform === platform;
              return (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors ${
                    active
                      ? "bg-teal-600/20 border-teal-500/50 text-teal-300″
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  {meta.icon}
                  {platform}
                </button>
              );
            })}
          </div>

          <div className="space-y-4″>
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Visual assets placeholder */}
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3″>Visual Assets</h2>
          <p className="text-slate-500 text-sm mb-3″>Download ProLnk branded images for your posts</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3″>
            {ASSET_TILES.map(tile => (
              <div
                key={tile.label}
                className="aspect-square rounded-lg border-2 border-dashed border-slate-700 bg-slate-800/30 flex flex-col items-center justify-center gap-2 p-3 cursor-pointer hover:border-teal-600/50 hover:bg-teal-900/10 transition-colors group"
              >
                <div className="w-8 h-8 rounded-md bg-slate-700 group-hover:bg-teal-900/30 flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-slate-400 group-hover:text-teal-400″ />
                </div>
                <p className="text-slate-400 text-xs text-center leading-tight">{tile.label}</p>
                <Badge variant="outline" className="text-slate-500 border-slate-700 text-[10px]">
                  {tile.ext} · {tile.size}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Referral link banner */}
        <Card className="bg-teal-900/20 border-teal-600/30″>
          <CardContent className="p-5″>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4″>
              <div className="flex-1″>
                <div className="flex items-center gap-2 mb-1″>
                  <Link2 className="w-4 h-4 text-teal-400″ />
                  <span className="text-white font-semibold text-sm">Your Referral Link</span>
                </div>
                <code className="text-teal-300 text-sm font-mono">{REFERRAL_LINK}</code>
                <p className="text-slate-400 text-xs mt-1″>Share this link in every post to track referral credit</p>
              </div>
              <div className="flex gap-2″>
                <CopyButton text={`https://${REFERRAL_LINK}`} label="Copy link" />
                <button className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md bg-teal-600 hover:bg-teal-500 text-white transition-colors">
                  <ExternalLink className="w-3 h-3″ /> Open
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best time to post */}
        <Card className="bg-[#111C2D] border-slate-700″>
          <CardContent className="p-5″>
            <div className="flex items-center gap-2 mb-1″>
              <Clock className="w-4 h-4 text-amber-400″ />
              <span className="text-white font-semibold text-sm">Best Time to Post</span>
            </div>
            <p className="text-slate-300 text-sm">
              DFW pros get <span className="text-amber-300 font-semibold">3× more responses</span> to LinkedIn posts on{" "}
              <span className="text-white font-medium">Tuesday 8–10am</span>. Facebook neighborhood groups peak{" "}
              <span className="text-white font-medium">Sunday 6–8pm</span>. Instagram performs best at{" "}
              <span className="text-white font-medium">7am and 5pm</span> on weekdays.
            </p>
          </CardContent>
        </Card>

        {/* Schedule CTA */}
        <div className="flex items-center gap-3″>
          <Button
            disabled
            className="bg-teal-600/30 text-teal-300 border border-teal-600/30 cursor-not-allowed hover:bg-teal-600/30″
          >
            Schedule a Post
          </Button>
          <Badge variant="outline" className="border-amber-500/40 text-amber-400 text-xs">
            Coming Soon
          </Badge>
        </div>

      </div>
    </div>
  );
}
