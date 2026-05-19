import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star, MessageSquare, Video, CheckCircle, XCircle, Edit3,
  Send, GripVertical, X, ToggleLeft, ToggleRight,
} from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
  id: number;
  author: string;
  role: string;
  rating: number;
  text: string;
  submitted: string;
  source: "in-app" | "email" | "sms";
  status: "pending" | "approved" | "rejected";
}

interface Featured {
  id: number;
  author: string;
  text: string;
  platform: "homepage" | "email" | "social";
  order: number;
}

interface VideoTestimonial {
  id: number;
  author: string;
  role: string;
  duration: string;
  transcript: string;
  featured: boolean;
}

const PENDING: Testimonial[] = [
  {
    id: 1,
    author: "Maria T.",
    role: "Homeowner",
    rating: 5,
    text: "ProLnk found me a plumber within 2 hours of my kitchen pipe bursting. The partner was professional, clean, and priced fairly. I'll never use anyone else.",
    submitted: "May 12, 2026″,
    source: "in-app",
    status: "pending",
  },
  {
    id: 2,
    author: "James R.",
    role: "Partner",
    rating: 5,
    text: "I was skeptical about another lead platform but ProLnk is different. The leads are warm, homeowners are pre-qualified, and the commission structure actually makes sense.",
    submitted: "May 11, 2026″,
    source: "email",
    status: "pending",
  },
  {
    id: 3,
    author: "Sandra L.",
    role: "Homeowner",
    rating: 4,
    text: "Great experience overall. The app made it easy to track my job status and communicate with the contractor. Would have liked more updates during the estimate process.",
    submitted: "May 10, 2026″,
    source: "sms",
    status: "pending",
  },
  {
    id: 4,
    author: "Carlos M.",
    role: "Partner",
    rating: 5,
    text: "The network income system is real — I'm making money from pros I referred. Just hit Tier 3 last month. This is the future of home services.",
    submitted: "May 9, 2026″,
    source: "in-app",
    status: "pending",
  },
  {
    id: 5,
    author: "Diane K.",
    role: "Homeowner",
    rating: 4,
    text: "Hired an HVAC partner through ProLnk for an AC tune-up before summer. He arrived on time, explained everything clearly, and was a third cheaper than my last service call.",
    submitted: "May 8, 2026″,
    source: "email",
    status: "pending",
  },
];

const FEATURED_LIST: Featured[] = [
  { id: 1, author: "Kevin P.", text: "Best contractor platform in DFW. Period.", platform: "homepage", order: 1 },
  { id: 2, author: "Jennifer W.", text: "Found a roofer, got 3 quotes, hired the best one — all in one afternoon.", platform: "homepage", order: 2 },
  { id: 3, author: "Tony G.", text: "ProLnk helped me build a $4K/month passive income just by referring other pros.", platform: "email", order: 3 },
  { id: 4, author: "Rosalind F.", text: "Finally a platform that vets contractors. My home, my rules, my peace of mind.", platform: "social", order: 4 },
];

const VIDEOS: VideoTestimonial[] = [
  { id: 1, author: "Mark E.", role: "Partner — Electrician", duration: "1:24″, transcript: ""I was running my own business, chasing leads that never converted. With ProLnk I get 8-10 warm leads a week..."", featured: true },
  { id: 2, author: "Priya N.", role: "Homeowner", duration: "0:58″, transcript: ""I'd been burned by contractors before. ProLnk's vetting process gave me confidence I hadn't felt in years..."", featured: false },
  { id: 3, author: "Derek B.", role: "Partner — HVAC", duration: "2:03″, transcript: ""The network income blew my mind. I referred 12 pros in 6 months, now I earn overrides on all their jobs..."", featured: true },
  { id: 4, author: "Alicia H.", role: "Homeowner", duration: "1:15″, transcript: ""Getting 3 quotes used to take me a week of phone calls. ProLnk gets them in under an hour..."", featured: false },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5″>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < n ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`} />
      ))}
    </div>
  );
}

function SourceBadge({ source }: { source: Testimonial["source"] }) {
  const map: Record<string, string> = { "in-app": "bg-blue-900/40 text-blue-300″, email: "bg-green-900/40 text-green-300", sms: "bg-purple-900/40 text-purple-300" };
  return <span className={`text-xs px-2 py-0.5 rounded-full ${map[source]}`}>{source}</span>;
}

export default function TestimonialManager() {
  const [pending, setPending] = useState<Testimonial[]>(PENDING);
  const [featured, setFeatured] = useState<Featured[]>(FEATURED_LIST);
  const [videos, setVideos] = useState<VideoTestimonial[]>(VIDEOS);
  const [settings, setSettings] = useState({ landing: true, profiles: true, emailFooter: false });

  function handleApprove(id: number) {
    setPending((p) => p.filter((t) => t.id !== id));
    toast.success("Testimonial approved and queued for review");
  }

  function handleReject(id: number) {
    setPending((p) => p.filter((t) => t.id !== id));
    toast.error("Testimonial rejected");
  }

  function removeFromFeatured(id: number) {
    setFeatured((f) => f.filter((t) => t.id !== id));
    toast.info("Removed from featured");
  }

  function toggleVideoFeature(id: number) {
    setVideos((v) => v.map((t) => t.id === id ? { ...t, featured: !t.featured } : t));
  }

  const stats = [
    { label: "Total Collected", value: "247″, icon: MessageSquare, color: "#3b82f6" },
    { label: "Featured on Site", value: "12″, icon: Star, color: "#F5E642" },
    { label: "Video Testimonials", value: "4″, icon: Video, color: "#a855f7" },
    { label: "Avg Rating", value: "4.8★", icon: Star, color: "#22c55e" },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] text-white pb-16″>
        <div className="max-w-6xl mx-auto px-4 py-10″>

          {/* Header */}
          <div className="mb-8″>
            <h1 className="text-3xl font-bold text-white">Testimonial Manager</h1>
            <p className="text-slate-400 mt-1″>Let your customers do the selling</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10″>
            {stats.map((s) => (
              <Card key={s.label} className="bg-[#111C2E] border border-slate-700/50″>
                <CardContent className="p-5″>
                  <s.icon className="w-5 h-5 mb-3″ style={{ color: s.color }} />
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-1″>{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pending Approval */}
          <div className="mb-10″>
            <h2 className="text-xl font-semibold text-white mb-4″>
              Pending Approval
              <Badge className="ml-2 bg-yellow-900/40 text-yellow-300 border-yellow-700/40″>{pending.length}</Badge>
            </h2>
            <div className="space-y-4″>
              {pending.length === 0 && (
                <Card className="bg-[#111C2E] border border-slate-700/50″>
                  <CardContent className="p-8 text-center text-slate-400″>
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400″ />
                    All caught up — no pending testimonials.
                  </CardContent>
                </Card>
              )}
              {pending.map((t) => (
                <Card key={t.id} className="bg-[#111C2E] border border-slate-700/50″>
                  <CardContent className="p-5″>
                    <div className="flex items-start justify-between gap-4″>
                      <div className="flex-1 min-w-0″>
                        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                          <span className="font-semibold text-white">{t.author}</span>
                          <Badge className="bg-slate-700/50 text-slate-300 text-xs border-0″>{t.role}</Badge>
                          <Stars n={t.rating} />
                          <SourceBadge source={t.source} />
                          <span className="text-xs text-slate-500″>{t.submitted}</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                      </div>
                      <div className="flex gap-2 shrink-0″>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(t.id)}
                          className="bg-green-700 hover:bg-green-600 text-white h-8 px-3″
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1″ /> Approve
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleReject(t.id)}
                          className="bg-red-900/60 hover:bg-red-800 text-red-300 h-8 px-3″
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1″ /> Reject
                        </Button>
                        <Button
                          size="sm"
                          className="bg-slate-700 hover:bg-slate-600 text-slate-200 h-8 px-3″
                        >
                          <Edit3 className="w-3.5 h-3.5″ />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Testimonials */}
          <div className="mb-10″>
            <h2 className="text-xl font-semibold text-white mb-4″>Featured Testimonials</h2>
            <div className="space-y-3″>
              {featured.map((t) => (
                <Card key={t.id} className="bg-[#111C2E] border border-slate-700/50″>
                  <CardContent className="p-4 flex items-center gap-4″>
                    <GripVertical className="w-4 h-4 text-slate-500 shrink-0 cursor-grab" />
                    <div className="flex-1 min-w-0″>
                      <div className="flex items-center gap-2 mb-0.5″>
                        <span className="text-xs font-bold text-white">#{t.order}</span>
                        <span className="font-semibold text-white text-sm">{t.author}</span>
                        <Badge className={`text-xs border-0 ${
                          t.platform === "homepage" ? "bg-blue-900/40 text-blue-300″ :
                          t.platform === "email" ? "bg-green-900/40 text-green-300″ :
                          "bg-purple-900/40 text-purple-300″
                        }`}>{t.platform}</Badge>
                      </div>
                      <p className="text-sm text-slate-300 truncate">&ldquo;{t.text}&rdquo;</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => removeFromFeatured(t.id)}
                      className="bg-slate-700 hover:bg-red-900/40 text-slate-300 h-8 px-3 shrink-0″
                    >
                      <X className="w-3.5 h-3.5 mr-1″ /> Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Request Campaign */}
          <Card className="bg-blue-900/20 border border-blue-700/40 mb-10″>
            <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold text-blue-200 mb-1″>Review Request Campaign</p>
                <p className="text-sm text-slate-300″>Send review request to <strong>47 homeowners</strong> who completed jobs in the last 30 days.</p>
              </div>
              <Button
                onClick={() => toast.success("Campaign queued — 47 review requests will send within the hour")}
                className="bg-blue-600 hover:bg-blue-700 text-white shrink-0″
              >
                <Send className="w-4 h-4 mr-2″ /> Send Campaign
              </Button>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card className="bg-[#111C2E] border border-slate-700/50 mb-10″>
            <CardHeader className="pb-3″>
              <CardTitle className="text-base text-white">Display Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4″>
              {[
                { key: "landing" as const, label: "Show on landing page" },
                { key: "profiles" as const, label: "Show on partner profiles" },
                { key: "emailFooter" as const, label: "Show in email footer" },
              ].map((s) => (
                <div key={s.key} className="flex items-center justify-between">
                  <span className="text-sm text-slate-200″>{s.label}</span>
                  <button
                    onClick={() => setSettings((prev) => ({ ...prev, [s.key]: !prev[s.key] }))}
                    className="text-slate-400″
                  >
                    {settings[s.key]
                      ? <ToggleRight className="w-7 h-7 text-blue-400″ />
                      : <ToggleLeft className="w-7 h-7″ />}
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Video Testimonials */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4″>Video Testimonials</h2>
            <div className="grid sm:grid-cols-2 gap-4″>
              {videos.map((v) => (
                <Card key={v.id} className="bg-[#111C2E] border border-slate-700/50″>
                  <CardContent className="p-5″>
                    {/* Placeholder player */}
                    <div className="w-full h-32 bg-slate-800/70 rounded-lg mb-4 flex items-center justify-center border border-slate-700/40″>
                      <Video className="w-8 h-8 text-slate-500″ />
                      <span className="ml-2 text-slate-500 text-sm">{v.duration}</span>
                    </div>
                    <div className="mb-1″>
                      <span className="font-semibold text-white text-sm">{v.author}</span>
                      <span className="text-xs text-slate-400 ml-2″>{v.role}</span>
                    </div>
                    <p className="text-xs text-slate-400 italic mb-4 leading-relaxed">{v.transcript}</p>
                    <div className="flex items-center justify-between">
                      {v.featured && (
                        <Badge className="bg-yellow-900/40 text-yellow-300 border-0 text-xs">Featured</Badge>
                      )}
                      {!v.featured && <span />}
                      <Button
                        size="sm"
                        onClick={() => { toggleVideoFeature(v.id); toast.success(v.featured ? "Removed from featured" : "Video featured"); }}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-200 h-7 px-3 text-xs"
                      >
                        {v.featured ? "Unfeature" : "Feature"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
