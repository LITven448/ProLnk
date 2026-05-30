import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import {
  BookOpen, Play, Download, ExternalLink, Rocket, DollarSign,
  Network, Wrench, Megaphone, GraduationCap, FileText, Image,
  LayoutTemplate, ArrowRight, Star,
} from "lucide-react";

type Resource = {
  title: string;
  description: string;
  type: "download" | "guide";
  badge?: string;
};

type Category = {
  id: string;
  label: string;
  icon: typeof Rocket;
  color: string;
  bg: string;
  resources: Resource[];
};

const CATEGORIES: Category[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Rocket,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    resources: [
      {
        title: "Partner Activation Checklist",
        description: "Step-by-step guide to complete your profile, upload credentials, and receive your first lead.",
        type: "download",
        badge: "PDF",
      },
      {
        title: "Field OS Quick Start Guide",
        description: "How to log jobs, upload photos, and use the mobile app in under 10 minutes.",
        type: "guide",
        badge: "Interactive",
      },
      {
        title: "ProLnk Glossary",
        description: "Definitions for all platform terms: PPS, Deal, Opportunity, Origination Rights, and more.",
        type: "guide",
      },
      {
        title: "Platform Walkthrough Video",
        description: "12-minute video tour of the full partner portal — dashboard, leads, earnings, and settings.",
        type: "guide",
        badge: "Video",
      },
    ],
  },
  {
    id: "fsm",
    label: "FSM Integration",
    icon: Wrench,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    resources: [
      {
        title: "Jobber Integration Guide",
        description: "Connect your Jobber account to ProLnk in 5 minutes for automatic job sync.",
        type: "guide",
        badge: "Jobber",
      },
      {
        title: "Housecall Pro Integration Guide",
        description: "OAuth setup, field mapping, and photo sync for HCP users.",
        type: "guide",
        badge: "HCP",
      },
      {
        title: "ServiceTitan Integration Guide",
        description: "Enterprise-level sync for ServiceTitan — includes dispatch and invoice sync.",
        type: "guide",
        badge: "ServiceTitan",
      },
      {
        title: "Manual Job Logging Template",
        description: "Spreadsheet template for partners logging jobs manually until FSM is connected.",
        type: "download",
        badge: "CSV",
      },
    ],
  },
  {
    id: "commission",
    label: "Commission Guide",
    icon: DollarSign,
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
    resources: [
      {
        title: "Founding Member Commission Deep Dive",
        description: "Complete breakdown of the 60% keep rate, how fees are calculated, and payout timelines.",
        type: "download",
        badge: "PDF",
      },
      {
        title: "Commission Calculator Worksheet",
        description: "Excel model to project your annual earnings based on job volume and network size.",
        type: "download",
        badge: "Excel",
      },
      {
        title: "How to Read Your Commission Ledger",
        description: "Video walkthrough explaining every field, filter, and export option in the Ledger.",
        type: "guide",
        badge: "Video",
      },
      {
        title: "Dispute Resolution Guide",
        description: "Step-by-step process for submitting, tracking, and escalating commission disputes.",
        type: "guide",
      },
    ],
  },
  {
    id: "network",
    label: "Network Building",
    icon: Network,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    resources: [
      {
        title: "Network Income Playbook",
        description: "Strategies for recruiting quality partners, maximizing override earnings, and growing your tree.",
        type: "download",
        badge: "PDF",
      },
      {
        title: "Origination Rights Guide",
        description: "How to enroll homeowners in the Home Health Vault and lock in permanent 1.5% origination rights.",
        type: "guide",
        badge: "Important",
      },
      {
        title: "Referral Link Setup",
        description: "Generate your custom referral link and track clicks, signups, and conversion rates.",
        type: "guide",
      },
      {
        title: "Network Tree Visual Guide",
        description: "How to read and interpret your 4-level network visualization and earnings reports.",
        type: "guide",
        badge: "Video",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing Tools",
    icon: Megaphone,
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
    resources: [
      {
        title: "ProLnk Partner Logo Pack",
        description: "SVG, PNG, and white/color variants of the ProLnk 'Trusted Partner' badge for your website.",
        type: "download",
        badge: "Logos",
      },
      {
        title: "Branded Email Templates",
        description: "Co-branded HTML email templates for recruiting partners and referring homeowners.",
        type: "download",
        badge: "HTML",
      },
      {
        title: "Partner One-Pager",
        description: "Print-ready one-pager explaining the ProLnk Network Income opportunity to recruit partners.",
        type: "download",
        badge: "PDF",
      },
      {
        title: "Social Media Asset Kit",
        description: "Instagram, LinkedIn, and Facebook post templates sized and designed for partner promotion.",
        type: "download",
        badge: "PNG/MP4",
      },
    ],
  },
];

const VIDEOS = [
  {
    title: "How ProLnk's AI Opportunity Engine Works",
    duration: "8 min",
    desc: "See how photos from your jobs are analyzed to detect adjacent service opportunities.",
  },
  {
    title: "Building Your Network: A Founding Member Story",
    duration: "14 min",
    desc: "Watch how a plumber built a 40-partner network in 6 months and what it earns monthly.",
  },
  {
    title: "TrustyPro Profile Optimization",
    duration: "6 min",
    desc: "How to improve your public TrustyPro profile to rank higher and close more leads.",
  },
];

const DOWNLOADS = [
  {
    title: "ProLnk Logo Pack",
    icon: Image,
    size: "2.4 MB",
    format: "ZIP (SVG + PNG)",
    desc: "Official logos, badges, and brand colors for partner use.",
  },
  {
    title: "Partner One-Pager",
    icon: FileText,
    size: "1.1 MB",
    format: "PDF",
    desc: "Print-ready document to share the ProLnk opportunity with other trades.",
  },
  {
    title: "Branded Templates Pack",
    icon: LayoutTemplate,
    size: "3.8 MB",
    format: "ZIP (HTML + PNG)",
    desc: "Email, social, and print templates with ProLnk branding.",
  },
];

export default function PartnerResourceCenter() {
  return (
    <>
      <Helmet>
        <title>Partner Resource Center | ProLnk</title>
        <meta name="description" content="Guides, downloads, video tutorials, and marketing tools for ProLnk service professional partners." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <div className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 mb-4">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-teal-300 font-medium">Partner Resource Center</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Everything You Need to Succeed</h1>
                <p className="text-slate-400 text-lg">
                  Guides, integrations, commission tools, and marketing assets — all in one place.
                </p>
              </div>
              <Link href="/resources/academy">
                <button className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors">
                  <GraduationCap className="w-4 h-4" />
                  ProLnk Academy
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10 space-y-14">

          {/* Resource categories */}
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <section key={cat.id}>
                <div className="flex items-center gap-2 mb-5">
                  <div className={`p-2 rounded-lg border ${cat.bg}`}>
                    <Icon className={`w-4 h-4 ${cat.color}`} />
                  </div>
                  <h2 className="text-xl font-bold text-white">{cat.label}</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.resources.map((res) => (
                    <div
                      key={res.title}
                      className="group flex flex-col bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 hover:border-teal-500/40 hover:bg-slate-800/80 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-white leading-snug">{res.title}</h3>
                        </div>
                        {res.badge && (
                          <span className="ml-2 flex-shrink-0 text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded-full border border-slate-600">
                            {res.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed flex-1">{res.description}</p>
                      <button className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors self-start">
                        {res.type === "download" ? (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-3.5 h-3.5" />
                            View Guide
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Video tutorials */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <Play className="w-4 h-4 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Video Tutorials</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {VIDEOS.map((video) => (
                <div
                  key={video.title}
                  className="group relative bg-slate-800/50 border border-slate-700/60 rounded-xl overflow-hidden hover:border-teal-500/40 transition-all cursor-pointer"
                >
                  {/* Thumbnail placeholder */}
                  <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 h-36 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-teal-500/30 group-hover:border-teal-400/50 transition-all">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                    <span className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-white mb-1 leading-snug">{video.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{video.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Downloads */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-lg bg-slate-700 border border-slate-600">
                <Download className="w-4 h-4 text-slate-300" />
              </div>
              <h2 className="text-xl font-bold text-white">Quick Downloads</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {DOWNLOADS.map((dl) => {
                const Icon = dl.icon;
                return (
                  <div
                    key={dl.title}
                    className="flex items-start gap-4 bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 hover:border-teal-500/40 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">{dl.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{dl.desc}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-500">{dl.format}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs text-slate-500">{dl.size}</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 p-1.5 rounded-lg bg-teal-600/20 border border-teal-600/30 hover:bg-teal-600/40 transition-all">
                      <Download className="w-4 h-4 text-teal-400" />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ProLnk Academy promo */}
          <section className="bg-gradient-to-br from-teal-900/40 via-slate-800/60 to-slate-900/80 border border-teal-700/30 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1 mb-3">
                  <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-xs text-teal-300 font-medium">Coming Soon</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">ProLnk Academy</h3>
                <p className="text-slate-400 leading-relaxed mb-3">
                  Structured courses for service professionals: lead conversion tactics, job photo best practices,
                  network building strategies, and AI opportunity recognition. Earn certifications that boost your
                  Partner Priority Score.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Lead Conversion", "Photo Best Practices", "Network Building", "AI Opportunity Mastery"].map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-xs text-slate-300 bg-slate-700/60 border border-slate-600/50 rounded-full px-3 py-1">
                      <Star className="w-3 h-3 text-teal-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <Link href="/resources/academy">
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-colors">
                    <GraduationCap className="w-4 h-4" />
                    Visit ProLnk Academy
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Footer nav */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800 text-sm text-slate-500">
            <Link href="/partner-faq"><span className="hover:text-teal-400 cursor-pointer transition-colors">Partner FAQ</span></Link>
            <Link href="/partner-agreement"><span className="hover:text-teal-400 cursor-pointer transition-colors">Partner Agreement</span></Link>
            <Link href="/compliance"><span className="hover:text-teal-400 cursor-pointer transition-colors">Compliance & Legal</span></Link>
            <a href="mailto:support@prolnk.io" className="hover:text-teal-400 transition-colors">support@prolnk.io</a>
          </div>
        </div>
      </div>
    </>
  );
}
