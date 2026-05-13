import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Library, Download, Search, FileText, Image, Mail, Presentation, ChevronRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

type AssetFormat = "PDF" | "PNG" | "DOCX" | "PPTX";

interface Asset {
  id: number;
  title: string;
  category: string;
  format: AssetFormat;
  size: string;
  gradient: string;
  description: string;
  downloads: number;
  updated: string;
}

const FORMAT_ICONS: Record<AssetFormat, React.ElementType> = {
  PDF: FileText,
  PNG: Image,
  DOCX: FileText,
  PPTX: Presentation,
};

const FORMAT_COLORS: Record<AssetFormat, string> = {
  PDF: "bg-red-500/20 text-red-400 border-red-500/30",
  PNG: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  DOCX: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  PPTX: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const CATEGORIES = [
  { id: "all", label: "All Assets", icon: "📦" },
  { id: "recruiting", label: "Recruiting", icon: "🤝" },
  { id: "homeowner", label: "Homeowner Outreach", icon: "🏠" },
  { id: "tradeshow", label: "Trade Show Materials", icon: "🎪" },
  { id: "social", label: "Social Posts", icon: "📱" },
];

const ASSETS: Asset[] = [
  {
    id: 1,
    title: "ProLnk Partner Pitch Deck",
    category: "recruiting",
    format: "PPTX",
    size: "4.2 MB",
    gradient: "from-indigo-500 to-violet-600",
    description: "Full 22-slide deck to recruit new contractors into your network. Covers all 5 income streams.",
    downloads: 312,
    updated: "May 10, 2026",
  },
  {
    id: 2,
    title: "Network Income 1-Pager",
    category: "recruiting",
    format: "PDF",
    size: "1.1 MB",
    gradient: "from-violet-500 to-purple-700",
    description: "Single-page visual breakdown of all 5 streams. Perfect to leave with a prospect after a call.",
    downloads: 547,
    updated: "May 8, 2026",
  },
  {
    id: 3,
    title: "Homeowner Intro Flyer",
    category: "homeowner",
    format: "PDF",
    size: "850 KB",
    gradient: "from-teal-500 to-emerald-600",
    description: "Door-hanger or handout explaining ProLnk and how homeowners can get free quotes.",
    downloads: 198,
    updated: "May 6, 2026",
  },
  {
    id: 4,
    title: "Homeowner Cold Email Template",
    category: "homeowner",
    format: "DOCX",
    size: "45 KB",
    gradient: "from-cyan-500 to-blue-600",
    description: "3-email drip sequence for outreach to homeowners in your service area. Includes subject lines.",
    downloads: 423,
    updated: "May 7, 2026",
  },
  {
    id: 5,
    title: "Trade Show Booth Banner",
    category: "tradeshow",
    format: "PNG",
    size: "12 MB",
    gradient: "from-amber-500 to-orange-600",
    description: "Print-ready 3x8 banner for trade show booths. Customize with your name and QR code.",
    downloads: 87,
    updated: "May 9, 2026",
  },
  {
    id: 6,
    title: "Trade Show Handout Pack",
    category: "tradeshow",
    format: "PDF",
    size: "3.8 MB",
    gradient: "from-orange-500 to-red-600",
    description: "5-page printable pack: overview, income streams, FAQ, testimonials, and sign-up QR code.",
    downloads: 134,
    updated: "May 11, 2026",
  },
  {
    id: 7,
    title: "Instagram Story — $8K Override Post",
    category: "social",
    format: "PNG",
    size: "2.1 MB",
    gradient: "from-rose-500 to-pink-600",
    description: "Editable template celebrating a $8K network override milestone. Swap in your numbers.",
    downloads: 261,
    updated: "May 12, 2026",
  },
  {
    id: 8,
    title: "LinkedIn Post — Recruiting Contractors",
    category: "social",
    format: "DOCX",
    size: "30 KB",
    gradient: "from-blue-500 to-indigo-600",
    description: "5 LinkedIn post drafts for recruiting contractors to your ProLnk network.",
    downloads: 305,
    updated: "May 10, 2026",
  },
];

export default function ContentLibrary() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDetails, setRequestDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState<Set<number>>(new Set());

  const filtered = ASSETS.filter(a => {
    if (activeCategory !== "all" && a.category !== activeCategory) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleDownload = (asset: Asset) => {
    setDownloaded(prev => new Set(Array.from(prev).concat(asset.id)));
    toast.success(`Downloading "${asset.title}"`);
  };

  const handleRequest = () => {
    if (!requestTitle.trim()) { toast.error("Please describe the asset you need"); return; }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Request submitted! We'll create it within 3 business days.");
      setRequestTitle("");
      setRequestDetails("");
      setShowRequestForm(false);
      setSubmitting(false);
    }, 800);
  };

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 px-6 py-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 rounded-full px-4 py-1.5 text-teal-300 text-sm font-medium mb-5">
              <Library className="w-4 h-4" />
              Sales Materials Library
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">Content Library</h1>
            <p className="text-teal-200 text-lg max-w-xl mx-auto">
              Ready-to-use pitch decks, flyers, email templates, and social posts. Download and start closing.
            </p>
            <div className="flex items-center justify-center gap-8 mt-7 text-teal-200 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{ASSETS.length}</div>
                <div className="text-xs">Assets Available</div>
              </div>
              <div className="w-px h-8 bg-teal-500/40" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{ASSETS.reduce((s, a) => s + a.downloads, 0).toLocaleString()}</div>
                <div className="text-xs">Total Downloads</div>
              </div>
              <div className="w-px h-8 bg-teal-500/40" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-xs">Categories</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Search + Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-7">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search assets..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    activeCategory === c.id
                      ? "bg-teal-600/20 text-teal-300 border-teal-500/40"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-white"
                  }`}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Assets Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Library className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No assets match your search. Try a different filter or request a custom asset.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
              {filtered.map(asset => {
                const FormatIcon = FORMAT_ICONS[asset.format];
                const isDownloaded = downloaded.has(asset.id);
                return (
                  <Card key={asset.id} className="bg-slate-800/60 border-slate-700 hover:border-slate-600 transition-all overflow-hidden group">
                    {/* Thumbnail */}
                    <div className={`relative h-28 bg-gradient-to-br ${asset.gradient} flex items-center justify-center`}>
                      <FormatIcon className="w-10 h-10 text-white/40" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
                      <Badge className={`absolute top-2 right-2 text-xs border ${FORMAT_COLORS[asset.format]}`}>
                        {asset.format}
                      </Badge>
                    </div>
                    <CardContent className="pt-3 pb-4">
                      <h3 className="text-white font-semibold text-sm leading-snug mb-1">{asset.title}</h3>
                      <p className="text-slate-400 text-xs mb-3 line-clamp-2 leading-relaxed">{asset.description}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1"><Download className="w-3 h-3" />{asset.downloads}</span>
                        <span>{asset.size}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleDownload(asset)}
                        className={`w-full text-xs font-semibold transition-all ${
                          isDownloaded
                            ? "bg-green-600/80 hover:bg-green-600 text-white"
                            : "bg-teal-600 hover:bg-teal-500 text-white"
                        }`}
                      >
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        {isDownloaded ? "Downloaded" : "Download"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Request Custom Asset CTA */}
          <div className="border border-dashed border-slate-600 rounded-2xl p-8 bg-slate-800/30">
            {!showRequestForm ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
                  <Sparkles className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Need something custom?</h3>
                <p className="text-slate-400 text-sm mb-5 max-w-sm mx-auto">
                  Request a custom pitch deck, flyer, or email sequence tailored to your market or trade.
                </p>
                <Button
                  onClick={() => setShowRequestForm(true)}
                  variant="outline"
                  className="border-teal-500/50 text-teal-300 hover:bg-teal-600/20"
                >
                  Request Custom Asset <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            ) : (
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex items-center gap-2 text-teal-400 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-bold text-white text-base">Request a Custom Asset</h3>
                </div>
                <Input
                  placeholder="What do you need? (e.g. 'Flyer for roofers in Houston')"
                  value={requestTitle}
                  onChange={e => setRequestTitle(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
                <Textarea
                  placeholder="Any specific details — trade, city, target audience, format preference..."
                  value={requestDetails}
                  onChange={e => setRequestDetails(e.target.value)}
                  rows={3}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 resize-none"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleRequest}
                    disabled={submitting}
                    className="bg-teal-600 hover:bg-teal-500 text-white"
                  >
                    {submitting ? "Submitting..." : "Submit Request"}
                  </Button>
                  <Button variant="ghost" onClick={() => setShowRequestForm(false)} className="text-slate-400 hover:text-white">
                    Cancel
                  </Button>
                </div>
                <p className="text-xs text-slate-500">Delivered within 3 business days. You'll receive an email when it's ready.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
