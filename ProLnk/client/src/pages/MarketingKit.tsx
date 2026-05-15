/**
 * Marketing Kit — /dashboard/marketing-kit
 * Partner-facing page for co-branded marketing materials:
 * door hangers, yard signs, email templates, social media assets, QR codes.
 */
import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Download, Copy, QrCode, Mail, Share2, Megaphone,
  Image, FileText, Smartphone, Star, CheckCircle,
  ExternalLink, Palette, Zap, Users, TrendingUp,
} from "lucide-react";
import { Link } from "wouter";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  navy:   "#0A1628",
  teal:   "#00B5B8",
  lime:   "#A8E063",
  white:  "#FFFFFF",
  bg:     "#F0F2F5",
  card:   "#FFFFFF",
  text:   "#344767",
  muted:  "#7B809A",
  border: "#E9ECEF",
};

// ─── Print Materials ──────────────────────────────────────────────────────────
const PRINT_MATERIALS = [
  {
    id: "door_hanger",
    title: "Door Hanger",
    desc: "4.25\" × 11\" co-branded door hanger with your business name, ProLnk badge, and QR code",
    icon: FileText,
    color: "#3B82F6",
    pages: 1,
    format: "PDF",
    tip: "Leave after every job — 3x more effective than business cards",
  },
  {
    id: "yard_sign",
    title: "Yard Sign",
    desc: "18\" × 24\" corrugated plastic yard sign with your logo and ProLnk partner badge",
    icon: Image,
    color: "#10B981",
    pages: 1,
    format: "PDF",
    tip: "Ask homeowners to display during and after the job",
  },
  {
    id: "invoice_footer",
    title: "Invoice Footer Insert",
    desc: "Branded footer for your invoices that promotes the ProLnk referral program",
    icon: FileText,
    color: "#8B5CF6",
    pages: 1,
    format: "PDF",
    tip: "Add to every invoice to generate passive referrals",
  },
  {
    id: "business_card",
    title: "Business Card Back",
    desc: "Business card back design with your referral link and ProLnk partner badge",
    icon: FileText,
    color: "#F59E0B",
    pages: 1,
    format: "PDF",
    tip: "Print on the back of your existing business cards",
  },
];

// ─── Email Templates ──────────────────────────────────────────────────────────
const EMAIL_TEMPLATES = [
  {
    id: "job_followup",
    title: "Post-Job Follow-Up",
    subject: "Thanks for choosing [Your Business] — a gift for you",
    preview: "Hi [Homeowner Name], it was a pleasure serving you today. As a ProLnk partner, I wanted to share something special...",
    useCase: "Send 24 hours after job completion",
    color: "#3B82F6",
  },
  {
    id: "referral_ask",
    title: "Referral Request",
    subject: "Know someone who needs [Your Service]?",
    preview: "Hi [Name], if you've been happy with our service, we'd love to help your neighbors too. Through ProLnk, you can earn rewards for every referral...",
    useCase: "Send to past customers monthly",
    color: "#10B981",
  },
  {
    id: "seasonal",
    title: "Seasonal Reminder",
    subject: "Time to get your [Season] home maintenance done",
    preview: "Hi [Name], as we head into [Season], here are the top home maintenance tasks we recommend — and we can help with all of them...",
    useCase: "Send at start of each season",
    color: "#F59E0B",
  },
  {
    id: "review_request",
    title: "Review Request",
    subject: "Quick favor — would you leave us a review?",
    preview: "Hi [Name], we hope you were thrilled with our recent work. Reviews help us grow and serve more homeowners like you...",
    useCase: "Send 3 days after job completion",
    color: "#8B5CF6",
  },
];

// ─── Platform-specific Social Posts ──────────────────────────────────────────
interface PlatformPost {
  id: string;
  platform: "LinkedIn" | "Twitter/X" | "Facebook" | "SMS";
  platformIcon: string;
  platformColor: string;
  characterLimit: number;
  title: string;
  post: string;
  tip: string;
}

const PLATFORM_POSTS: PlatformPost[] = [
  {
    id: "linkedin_founding",
    platform: "LinkedIn",
    platformIcon: "in",
    platformColor: "#0A66C2",
    characterLimit: 3000,
    title: "Founding Network Announcement",
    post: `Excited to share that I've joined the ProLnk Founding Partner Network — one of only 500 contractors nationwide to secure a founding spot before the platform opens to the public.

ProLnk is an AI-powered home services marketplace that connects verified contractors with pre-qualified homeowners in their local market. As a founding member, I've locked in exclusive rates and commission structures that aren't available after launch.

If you're a licensed home service contractor — HVAC, plumbing, electrical, roofing, or any other trade — I'd love to connect and share more about the network income opportunity. The referral structure is unlike anything I've seen in this industry.

Learn more or apply through my link: [YOUR_REFERRAL_LINK]

#HomeServices #Contractor #ProLnk #FoundingPartner #Entrepreneurship`,
    tip: "Post on Tuesday or Wednesday morning for highest LinkedIn engagement from contractors.",
  },
  {
    id: "linkedin_income",
    platform: "LinkedIn",
    platformIcon: "in",
    platformColor: "#0A66C2",
    characterLimit: 3000,
    title: "Passive Income Story",
    post: `Most contractors I know are trading time for money. I've been doing the same for [X] years.

That changed when I joined ProLnk as a founding partner. Here's what the income model looks like:

→ Direct commissions on matched jobs
→ Override income from contractors in my network (4 levels deep)
→ Subscription overrides from pros I refer
→ Homeowner origination fees — permanent, recurring

My goal is to build a network of [X] contractors this year. That creates passive income that doesn't stop when I put down my tools.

If you want to hear more, I'm happy to connect. Link in bio.

#ContractorLife #PassiveIncome #ProLnk #HomeServices`,
    tip: "Share specific goals and numbers — LinkedIn audiences engage more with concrete data.",
  },
  {
    id: "twitter_hook",
    platform: "Twitter/X",
    platformIcon: "𝕏",
    platformColor: "#000000",
    characterLimit: 280,
    title: "Hook — Passive Income",
    post: `Contractors: what if your network paid you while you sleep?

Joined @ProLnk as a founding partner. 4-level override income. 500 founding spots left.

[YOUR_REFERRAL_LINK]`,
    tip: "Tweet in the morning between 7–9am for max reach. Pin to profile for 30 days.",
  },
  {
    id: "twitter_announcement",
    platform: "Twitter/X",
    platformIcon: "𝕏",
    platformColor: "#000000",
    characterLimit: 280,
    title: "Short Announcement",
    post: `Just locked in my founding partner spot with @ProLnk — an AI-powered marketplace connecting licensed contractors with homeowners.

Only 500 founding spots. If you're in the trades, you should see this.

[YOUR_REFERRAL_LINK]`,
    tip: "Add a screenshot of your partner dashboard for 3× more engagement.",
  },
  {
    id: "facebook_community",
    platform: "Facebook",
    platformIcon: "f",
    platformColor: "#1877F2",
    characterLimit: 63206,
    title: "Community Outreach Post",
    post: `Hey [City] neighbors! 👋

I'm part of a new home services network called ProLnk and I wanted to share it with our community.

Here's how it works for homeowners:
✅ Describe what you need (roof repair, HVAC, plumbing, etc.)
✅ ProLnk's AI matches you with verified local contractors
✅ Get 3 quotes — no cold calls, no strangers at your door
✅ Everything is tracked so you have a record of every job done on your home

And for any local contractors following me — there's a founding partner opportunity with income streams I've never seen in the industry before.

Happy to answer questions in the comments. Or use my link to learn more: [YOUR_REFERRAL_LINK]

#[City] #HomeServices #ProLnk #LocalBusiness`,
    tip: "Post in local neighborhood Facebook groups for 5× more organic reach than your personal page.",
  },
  {
    id: "facebook_story",
    platform: "Facebook",
    platformIcon: "f",
    platformColor: "#1877F2",
    characterLimit: 63206,
    title: "My ProLnk Story",
    post: `I want to tell you why I joined ProLnk as a founding partner.

After [X] years as a [Your Trade] contractor, I was tired of slow seasons, chasing leads, and paying high fees to lead services that sent me garbage.

A colleague told me about ProLnk — an AI platform that pre-screens homeowners before sending them to you, takes a fair fee on closed jobs, and pays you override income from every contractor you bring into your network.

I joined as one of the 500 founding partners. It cost me [nothing / $149/mo] and I've already [referred X partners / received X leads].

If you're a contractor who wants more predictable income, or a homeowner who wants better vetted professionals — use my link: [YOUR_REFERRAL_LINK]

Real people. Real results. That's why I'm here.`,
    tip: "This format (personal story → pain → solution → result → CTA) converts best on Facebook.",
  },
  {
    id: "sms_colleague",
    platform: "SMS",
    platformIcon: "💬",
    platformColor: "#22C55E",
    characterLimit: 160,
    title: "Colleague Invite",
    post: `Hey [Name], heard of ProLnk? AI home services marketplace — founding partner spots open. Check it out: [YOUR_REFERRAL_LINK]`,
    tip: "Text existing contractor contacts directly. 98% open rate vs 20% email.",
  },
  {
    id: "sms_homeowner",
    platform: "SMS",
    platformIcon: "💬",
    platformColor: "#22C55E",
    characterLimit: 160,
    title: "Homeowner Invite",
    post: `Hi [Name], it's [Your Name]. Get free quotes from vetted local contractors through ProLnk — no cold callers, no guessing. [YOUR_REFERRAL_LINK]`,
    tip: "Send to past customers who gave you 5-star reviews for best conversion.",
  },
];

// ─── My ProLnk Story Templates ────────────────────────────────────────────────
const STORY_TEMPLATES = [
  {
    id: "founding_story",
    title: "The Founding Partner Story",
    blanks: ["years in the trades", "your trade", "city/market", "your biggest pain point", "what changed"],
    template: `I've been a [years in the trades]-year [your trade] contractor in [city/market]. For most of my career, [your biggest pain point].

That's why when I discovered ProLnk, [what changed]. I'm now a founding partner — one of 500 nationwide.

If you want to know more: [YOUR_REFERRAL_LINK]`,
  },
  {
    id: "income_story",
    title: "The Income Stream Story",
    blanks: ["what you were doing before", "how many pros you've referred", "estimated monthly override income"],
    template: `Before ProLnk, I was [what you were doing before] to find work.

Now I've referred [how many pros you've referred] contractors into my network. That earns me ~$[estimated monthly override income]/month in override income on top of my direct job commissions.

It's not magic — it's a system. Happy to explain: [YOUR_REFERRAL_LINK]`,
  },
  {
    id: "homeowner_story",
    title: "The Homeowner Value Story",
    blanks: ["your trade", "what homeowners struggle with", "what ProLnk solves"],
    template: `As a [your trade] contractor, I see firsthand that [what homeowners struggle with].

ProLnk solves this by [what ProLnk solves]. As a verified partner, every homeowner I send gets pre-screened quotes from licensed pros.

Get your free quote: [YOUR_REFERRAL_LINK]`,
  },
];

// ─── Social Templates (legacy, kept for backward compat) ─────────────────────
const SOCIAL_TEMPLATES = [
  {
    id: "before_after",
    title: "Before & After Post",
    platform: "Instagram / Facebook",
    caption: "Swipe to see the transformation! 🏠✨ Another happy homeowner in [City]. ProLnk partner — trusted, verified, and ready to serve your neighborhood. #HomeServices #ProLnk #[YourCity]",
    icon: Image,
    color: "#EC4899",
  },
  {
    id: "5star_review",
    title: "5-Star Review Share",
    platform: "Facebook / Google",
    caption: "We're so grateful for this review! ⭐⭐⭐⭐⭐ As a ProLnk verified partner, we're committed to earning trust in every home we serve. #CustomerLove #ProLnk",
    icon: Star,
    color: "#F59E0B",
  },
  {
    id: "referral_promo",
    title: "Referral Program Promo",
    platform: "Nextdoor / Facebook",
    caption: "Did you know? Through ProLnk, your neighbors can earn rewards when they refer you to trusted home service pros in [City]. Ask me how! 🏡",
    icon: Share2,
    color: "#3B82F6",
  },
  {
    id: "seasonal_tip",
    title: "Seasonal Home Tip",
    platform: "All Platforms",
    caption: "🏠 [Season] Home Tip: [Tip content]. Need help? We're a ProLnk verified partner — tap the link in bio to schedule. #HomeTips #ProLnk",
    icon: Zap,
    color: "#10B981",
  },
];

// ─── Copy to Clipboard ────────────────────────────────────────────────────────
function copyToClipboard(text: string, label: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success(`${label} copied to clipboard`);
  }).catch(() => {
    toast.error("Failed to copy");
  });
}

// ─── Print Material Card ──────────────────────────────────────────────────────
function generatePrintHTML(item: typeof PRINT_MATERIALS[0], businessName: string, referralLink: string): string {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(referralLink)}`;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${item.title} — ${businessName}</title>
<style>body{margin:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#fff;color:#111;}
.page{width:4.25in;min-height:11in;margin:0 auto;padding:0.4in;box-sizing:border-box;display:flex;flex-direction:column;gap:16px;}
.header{display:flex;align-items:center;gap:12px;padding-bottom:12px;border-bottom:3px solid ${item.color};}
.logo-badge{width:48px;height:48px;background:${item.color};border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;font-weight:900;}
.biz{font-size:18px;font-weight:800;color:#111;} .sub{font-size:11px;color:#666;margin-top:2px;}
.headline{font-size:26px;font-weight:900;color:${item.color};line-height:1.2;}
.body{font-size:13px;color:#444;line-height:1.6;}
.qr-section{display:flex;align-items:center;gap:16px;background:#f8f9fa;border-radius:12px;padding:16px;}
.qr-text{font-size:11px;color:#666;}
.footer{margin-top:auto;font-size:10px;color:#999;text-align:center;border-top:1px solid #eee;padding-top:8px;}
@media print{body{-webkit-print-color-adjust:exact;}}
</style></head><body><div class="page">
<div class="header"><div class="logo-badge">P</div><div><div class="biz">${businessName}</div><div class="sub">Proud Member of the ProLnk Partner Network</div></div></div>
<div class="headline">${item.title}</div>
<div class="body">${item.desc}<br><br>As a trusted ProLnk partner, I connect homeowners with the right professionals for every home service need. When your neighbors need work done, I make sure they get the best — and I earn a referral for every job that closes.</div>
<div class="qr-section"><img src="${qrUrl}" width="100" height="100" alt="QR Code" /><div><div style="font-weight:700;font-size:13px;margin-bottom:4px;">Scan to Get a Free Estimate</div><div class="qr-text">Or visit: ${referralLink}</div><div class="qr-text" style="margin-top:4px;">Reference code: ${referralLink.split('/').pop()}</div></div></div>
<div class="footer">ProLnk Partner Network · prolnk.com · Powered by AI-driven home intelligence</div>
</div></body></html>`;
}

function PrintCard({ item, referralLink, businessName }: { item: typeof PRINT_MATERIALS[0]; referralLink: string; businessName: string }) {
  const Icon = item.icon;
  const handleDownload = () => {
    const html = generatePrintHTML(item, businessName, referralLink);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prolnk-${item.id}-${businessName.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Template Downloaded', { description: 'Open the HTML file in your browser and use File → Print → Save as PDF.' });
  };
  return (
    <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: T.border }}>
      {/* Color bar */}
      <div className="h-1.5" style={{ backgroundColor: item.color }} />
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15` }}>
            <Icon className="w-5 h-5" style={{ color: item.color }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-bold" style={{ color: T.text }}>{item.title}</p>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">{item.format}</Badge>
            </div>
            <p className="text-xs" style={{ color: T.muted }}>{item.desc}</p>
          </div>
        </div>
        <div className="flex items-start gap-1.5 mb-4 p-2.5 rounded-xl" style={{ backgroundColor: `${item.color}08` }}>
          <Zap className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: item.color }} />
          <p className="text-[11px]" style={{ color: item.color }}>{item.tip}</p>
        </div>
        <Button
          className="w-full gap-2 text-sm font-semibold"
          style={{ backgroundColor: item.color, color: T.white }}
          onClick={handleDownload}
        >
          <Download className="w-4 h-4" />
          Download Co-Branded Template
        </Button>
      </div>
    </div>
  );
}

// ─── Email Template Card ──────────────────────────────────────────────────────
function EmailCard({ tpl }: { tpl: typeof EMAIL_TEMPLATES[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: T.border }}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tpl.color }} />
              <p className="text-sm font-bold" style={{ color: T.text }}>{tpl.title}</p>
            </div>
            <p className="text-xs" style={{ color: T.muted }}>{tpl.useCase}</p>
          </div>
          <Badge variant="outline" className="text-[10px] flex-shrink-0">Email</Badge>
        </div>
        <div className="p-3 rounded-xl mb-3" style={{ backgroundColor: T.bg }}>
          <p className="text-[11px] font-semibold mb-1" style={{ color: T.text }}>Subject: {tpl.subject}</p>
          <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: T.muted }}>{tpl.preview}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5 text-xs"
            onClick={() => copyToClipboard(`Subject: ${tpl.subject}\n\n${tpl.preview}`, "Email template")}
          >
            <Copy className="w-3.5 h-3.5" />
            Copy Template
          </Button>
          <Button
            size="sm"
            className="flex-1 gap-1.5 text-xs text-white"
            style={{ backgroundColor: tpl.color }}
            onClick={() => toast.info("Full template available in your email marketing integration")}
          >
            <Mail className="w-3.5 h-3.5" />
            Use in Email
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Social Template Card ─────────────────────────────────────────────────────
function SocialCard({ tpl }: { tpl: typeof SOCIAL_TEMPLATES[0] }) {
  const Icon = tpl.icon;
  return (
    <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: T.border }}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${tpl.color}15` }}>
            <Icon className="w-4 h-4" style={{ color: tpl.color }} />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: T.text }}>{tpl.title}</p>
            <p className="text-[10px]" style={{ color: T.muted }}>{tpl.platform}</p>
          </div>
        </div>
        <div className="p-3 rounded-xl mb-3 text-xs leading-relaxed" style={{ backgroundColor: T.bg, color: T.muted }}>
          {tpl.caption}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5 text-xs"
          onClick={() => copyToClipboard(tpl.caption, "Caption")}
        >
          <Copy className="w-3.5 h-3.5" />
          Copy Caption
        </Button>
      </div>
    </div>
  );
}

// ─── Platform Post Card ───────────────────────────────────────────────────────
function PlatformPostCard({ post, referralLink }: { post: PlatformPost; referralLink: string }) {
  const [copied, setCopied] = useState(false);
  const finalPost = post.post.replace(/\[YOUR_REFERRAL_LINK\]/g, referralLink);
  const charCount = finalPost.length;
  const charPct = Math.min(100, Math.round((charCount / post.characterLimit) * 100));
  const isOver = charCount > post.characterLimit;

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPost).then(() => {
      setCopied(true);
      toast.success(`${post.platform} post copied!`);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: T.border }}>
      {/* Platform header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: T.border, backgroundColor: `${post.platformColor}08` }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0"
          style={{ backgroundColor: post.platformColor }}>
          {post.platformIcon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold truncate" style={{ color: T.text }}>{post.title}</p>
          <p className="text-[10px]" style={{ color: T.muted }}>{post.platform}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className={`text-[10px] font-mono font-bold ${isOver ? "text-red-500" : ""}`} style={!isOver ? { color: T.muted } : {}}>
            {charCount.toLocaleString()}{post.characterLimit < 63206 ? `/${post.characterLimit}` : ""}
          </p>
          {post.characterLimit < 63206 && (
            <div className="w-16 h-1 rounded-full mt-0.5 overflow-hidden" style={{ backgroundColor: T.border }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${charPct}%`, backgroundColor: isOver ? "#EF4444" : post.platformColor }} />
            </div>
          )}
        </div>
      </div>

      {/* Post preview */}
      <div className="px-4 py-3">
        <div className="p-3 rounded-xl text-xs leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto" style={{ backgroundColor: T.bg, color: T.muted }}>
          {finalPost}
        </div>

        {/* Tip */}
        <div className="flex items-start gap-1.5 mt-2.5 mb-3 p-2 rounded-lg" style={{ backgroundColor: `${post.platformColor}08` }}>
          <Zap className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: post.platformColor }} />
          <p className="text-[10px] leading-snug" style={{ color: post.platformColor }}>{post.tip}</p>
        </div>

        <Button
          size="sm"
          className="w-full gap-1.5 text-xs font-semibold text-white"
          style={{ backgroundColor: post.platformColor }}
          onClick={handleCopy}
        >
          {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : `Copy + Post to ${post.platform}`}
        </Button>
      </div>
    </div>
  );
}

// ─── Story Template Card ──────────────────────────────────────────────────────
function StoryCard({ tpl, referralLink }: { tpl: typeof STORY_TEMPLATES[0]; referralLink: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const filled = tpl.template.replace(/\[YOUR_REFERRAL_LINK\]/g, referralLink).replace(
    /\[([^\]]+)\]/g,
    (_, key) => values[key] ? `**${values[key]}**` : `[${key}]`
  );

  const handleCopy = () => {
    const plain = tpl.template
      .replace(/\[YOUR_REFERRAL_LINK\]/g, referralLink)
      .replace(/\[([^\]]+)\]/g, (_, key) => values[key] || `[${key}]`);
    navigator.clipboard.writeText(plain).then(() => {
      setCopied(true);
      toast.success("Story template copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: T.border }}>
      <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: T.border, backgroundColor: `${T.teal}08` }}>
        <Users className="w-4 h-4 flex-shrink-0" style={{ color: T.teal }} />
        <p className="text-xs font-bold" style={{ color: T.text }}>{tpl.title}</p>
      </div>
      <div className="p-4">
        {/* Fill in the blanks */}
        <div className="space-y-2 mb-3">
          {tpl.blanks.map(blank => (
            <div key={blank}>
              <label className="text-[10px] font-semibold uppercase tracking-wide mb-1 block" style={{ color: T.muted }}>{blank}</label>
              <Input
                placeholder={`Enter ${blank}...`}
                value={values[blank] ?? ""}
                onChange={e => setValues(v => ({ ...v, [blank]: e.target.value }))}
                className="h-7 text-xs"
                style={{ fontSize: "12px" }}
              />
            </div>
          ))}
        </div>

        {/* Preview */}
        <div className="p-3 rounded-xl text-xs leading-relaxed whitespace-pre-wrap mb-3 max-h-40 overflow-y-auto" style={{ backgroundColor: T.bg, color: T.muted }}>
          {filled.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
            part.startsWith("**") ? (
              <span key={i} className="font-bold" style={{ color: T.text }}>{part.replace(/\*\*/g, "")}</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>

        <Button
          size="sm"
          className="w-full gap-1.5 text-xs text-white"
          style={{ backgroundColor: T.teal }}
          onClick={handleCopy}
        >
          {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy Filled Story"}
        </Button>
      </div>
    </div>
  );
}

// ─── QR Code Section ─────────────────────────────────────────────────────────
function QRSection({ referralLink }: { referralLink: string }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralLink)}&color=00B5B8&bgcolor=FFFFFF`;

  return (
    <div className="bg-white rounded-2xl border p-5" style={{ borderColor: T.border }}>
      <div className="flex items-center gap-2 mb-4">
        <QrCode className="w-5 h-5" style={{ color: T.teal }} />
        <h3 className="text-sm font-bold" style={{ color: T.text }}>Your Referral QR Code</h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 items-center">
        {/* QR Code */}
        <div className="flex-shrink-0 p-3 rounded-2xl border" style={{ borderColor: T.border }}>
          <img
            src={qrUrl}
            alt="Referral QR Code"
            className="w-32 h-32 rounded-xl"
          />
        </div>
        {/* Info */}
        <div className="flex-1">
          <p className="text-xs mb-3 leading-relaxed" style={{ color: T.muted }}>
            This QR code links directly to your ProLnk referral page. Print it on door hangers, yard signs, business cards, and invoices to generate passive referrals.
          </p>
          <div className="p-2.5 rounded-xl mb-3 flex items-center gap-2" style={{ backgroundColor: T.bg }}>
            <p className="text-xs font-mono flex-1 truncate" style={{ color: T.text }}>{referralLink}</p>
            <button
              className="flex-shrink-0"
              onClick={() => copyToClipboard(referralLink, "Referral link")}
            >
              <Copy className="w-3.5 h-3.5" style={{ color: T.muted }} />
            </button>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 gap-1.5 text-xs text-white"
              style={{ backgroundColor: T.teal }}
              onClick={() => {
                const a = document.createElement("a");
                a.href = qrUrl;
                a.download = "prolnk-referral-qr.png";
                a.click();
              }}
            >
              <Download className="w-3.5 h-3.5" />
              Download QR
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5 text-xs"
              onClick={() => copyToClipboard(referralLink, "Referral link")}
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MarketingKit() {
  const { user } = useAuth();
  const { data: partner } = trpc.partners.getMyProfile.useQuery();

  const partnerCode = partner?.partner?.id ? `P${partner.partner.id}` : "YOUR_CODE";
  const referralLink = `${window.location.origin}/ref/${partnerCode}`;

  return (

    <PartnerLayout>

    <div className="min-h-screen" style={{ background: T.bg }}>
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10" style={{ borderColor: T.border }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-base font-black" style={{ color: T.text }}>Marketing Kit</h1>
            <p className="text-xs" style={{ color: T.muted }}>Co-branded materials to grow your referral network</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs gap-1.5">
              ← Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Print Materials",   value: "4",    icon: FileText,  color: "#3B82F6" },
            { label: "Email Templates",   value: "4",    icon: Mail,      color: "#10B981" },
            { label: "Social Templates",  value: "4",    icon: Share2,    color: "#EC4899" },
            { label: "Your Referral Code", value: partnerCode, icon: QrCode, color: T.teal },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl p-3.5 border" style={{ borderColor: T.border }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                  <p className="text-[10px]" style={{ color: T.muted }}>{s.label}</p>
                </div>
                <p className="text-lg font-black" style={{ color: T.text }}>{s.value}</p>
              </div>
            );
          })}
        </div>

        {/* QR Code */}
        <div className="mb-6">
          <QRSection referralLink={referralLink} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="print">
          <TabsList className="mb-5 bg-white border flex-wrap h-auto gap-1 p-1" style={{ borderColor: T.border }}>
            <TabsTrigger value="print" className="text-xs gap-1.5 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600">
              <FileText className="w-3.5 h-3.5" /> Print
            </TabsTrigger>
            <TabsTrigger value="email" className="text-xs gap-1.5 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600">
              <Mail className="w-3.5 h-3.5" /> Email
            </TabsTrigger>
            <TabsTrigger value="platforms" className="text-xs gap-1.5 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600">
              <Share2 className="w-3.5 h-3.5" /> Platform Posts
            </TabsTrigger>
            <TabsTrigger value="stories" className="text-xs gap-1.5 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600">
              <Users className="w-3.5 h-3.5" /> My Story
            </TabsTrigger>
            <TabsTrigger value="social" className="text-xs gap-1.5 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600">
              <Image className="w-3.5 h-3.5" /> Image Captions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="print">
            <div className="grid md:grid-cols-2 gap-4">
              {PRINT_MATERIALS.map(item => (
                <PrintCard key={item.id} item={item} referralLink={referralLink} businessName={partner?.partner?.businessName ?? user?.name ?? 'Your Business'} />
              ))}
            </div>
            <div className="mt-4 p-4 rounded-2xl border" style={{ borderColor: T.border, background: `${T.teal}08` }}>
              <div className="flex items-start gap-2">
                <Megaphone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: T.teal }} />
                <p className="text-xs leading-relaxed" style={{ color: T.muted }}>
                  <strong style={{ color: T.text }}>Pro Tip:</strong> Partners who use 3+ marketing materials generate 4× more referrals than those who don't. Start with the door hanger — it's the highest-converting single piece.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="email">
            <div className="grid md:grid-cols-2 gap-4">
              {EMAIL_TEMPLATES.map(tpl => (
                <EmailCard key={tpl.id} tpl={tpl} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="platforms">
            <div className="mb-4 p-3 rounded-2xl border flex items-start gap-2" style={{ borderColor: T.border, background: `${T.teal}08` }}>
              <Smartphone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: T.teal }} />
              <p className="text-xs leading-relaxed" style={{ color: T.muted }}>
                <strong style={{ color: T.text }}>Your referral link is embedded.</strong> Each post is tailored to the platform's tone, length, and audience. Click "Copy + Post" and paste directly into the platform.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {PLATFORM_POSTS.map(p => (
                <PlatformPostCard key={p.id} post={p} referralLink={referralLink} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories">
            <div className="mb-4 p-3 rounded-2xl border flex items-start gap-2" style={{ borderColor: T.border, background: `${T.teal}08` }}>
              <Users className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: T.teal }} />
              <p className="text-xs leading-relaxed" style={{ color: T.muted }}>
                <strong style={{ color: T.text }}>Fill in the blanks, then copy your personalized story.</strong> Personal stories convert 3–5× better than generic posts. Your referral link is auto-included.
              </p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
              {STORY_TEMPLATES.map(tpl => (
                <StoryCard key={tpl.id} tpl={tpl} referralLink={referralLink} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="grid md:grid-cols-2 gap-4">
              {SOCIAL_TEMPLATES.map(tpl => (
                <SocialCard key={tpl.id} tpl={tpl} />
              ))}
            </div>
            <div className="mt-4 p-4 rounded-2xl border" style={{ borderColor: T.border, background: `${T.teal}08` }}>
              <div className="flex items-start gap-2">
                <Smartphone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: T.teal }} />
                <p className="text-xs leading-relaxed" style={{ color: T.muted }}>
                  <strong style={{ color: T.text }}>Best Practice:</strong> Post before/after photos within 24 hours of job completion while the homeowner is still excited. Tag your city and use #ProLnk to build local visibility.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Brand guidelines */}
        <div className="mt-6 bg-white rounded-2xl border p-5" style={{ borderColor: T.border }}>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4" style={{ color: T.teal }} />
            <h3 className="text-sm font-bold" style={{ color: T.text }}>Brand Guidelines</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Primary Teal",   hex: "#00B5B8", name: "ProLnk Teal" },
              { label: "Navy",           hex: "#0A1628", name: "ProLnk Navy" },
              { label: "Lime Accent",    hex: "#A8E063", name: "ProLnk Lime" },
              { label: "White",          hex: "#FFFFFF", name: "Background" },
            ].map(c => (
              <button
                key={c.hex}
                className="text-left p-3 rounded-xl border transition-all hover:shadow-sm"
                style={{ borderColor: T.border }}
                onClick={() => copyToClipboard(c.hex, c.name)}
              >
                <div className="w-full h-8 rounded-lg mb-2 border" style={{ backgroundColor: c.hex, borderColor: T.border }} />
                <p className="text-[10px] font-bold" style={{ color: T.text }}>{c.name}</p>
                <p className="text-[10px] font-mono" style={{ color: T.muted }}>{c.hex}</p>
              </button>
            ))}
          </div>
          <p className="text-[11px] mt-3" style={{ color: T.muted }}>
            Click any color to copy the hex code. Use these colors on all co-branded materials to maintain consistency with the ProLnk brand.
          </p>
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
