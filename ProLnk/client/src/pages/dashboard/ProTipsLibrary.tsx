import { useState } from "react";
import {
  Bookmark,
  Camera,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Calculator,
  Star,
  Bell,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Category = "All" | "Winning Bids" | "Customer Service" | "Photos" | "Growth" | "Tax & Finance" | "Tools & Equipment";

interface Tip {
  id: number;
  title: string;
  body: string;
  category: Category;
  icon: typeof Clock;
  stat: string;
  statLabel: string;
  saved: boolean;
}

const CATEGORIES: Category[] = ["All", "Winning Bids", "Customer Service", "Photos", "Growth", "Tax & Finance", "Tools & Equipment"];

const TIPS_DATA: Omit<Tip, "saved">[] = [
  {
    id: 1,
    title: "Upload 3+ photos per bid",
    body: "Bids with at least 3 job photos convert at more than double the rate of text-only bids. Homeowners trust what they can see.",
    category: "Photos",
    icon: Camera,
    stat: "2.3x",
    statLabel: "win rate",
  },
  {
    id: 2,
    title: "Reply within 4 minutes",
    body: "Speed is the single biggest predictor of winning a bid. Partners who respond in under 4 minutes win 3.7x more jobs than those who wait 30+ minutes.",
    category: "Winning Bids",
    icon: Clock,
    stat: "3.7x",
    statLabel: "win rate",
  },
  {
    id: 3,
    title: "Use the homeowner's first name",
    body: "Opening your message with the homeowner's first name increases response rates by 41%. Pull it from the lead card before you type.",
    category: "Customer Service",
    icon: Users,
    stat: "41%",
    statLabel: "better response",
  },
  {
    id: 4,
    title: "Morning leads are worth more",
    body: "Leads submitted between 8–10 AM have a 23% higher average job value. Homeowners planning their day are more serious buyers.",
    category: "Winning Bids",
    icon: TrendingUp,
    stat: "23%",
    statLabel: "higher value",
  },
  {
    id: 5,
    title: "HVAC filter upsell every time",
    body: "Adding a filter change to every HVAC service visit raises average ticket from $89 to $127. It takes 3 minutes and almost every homeowner says yes.",
    category: "Tools & Equipment",
    icon: DollarSign,
    stat: "+$38″,
    statLabel: "avg ticket",
  },
  {
    id: 6,
    title: "Set aside 22% for taxes",
    body: "Self-employed contractors owe both income and self-employment tax. Set aside 22% of every payment before you spend it — no surprises at filing.",
    category: "Tax & Finance",
    icon: Calculator,
    stat: "22%",
    statLabel: "set aside",
  },
  {
    id: 7,
    title: "Shoot 'before' photos at every job",
    body: "Before photos protect you from disputes, give you proof of scope, and make future bids more compelling when you can show before/after comparisons.",
    category: "Photos",
    icon: Camera,
    stat: "100%",
    statLabel: "dispute protection",
  },
  {
    id: 8,
    title: "Recruit in September",
    body: "September sees 28% more partner applicants than any other month. Seasonal contractors finishing summer work are actively looking for new income streams.",
    category: "Growth",
    icon: Users,
    stat: "28%",
    statLabel: "more applicants",
  },
];

export default function ProTipsLibrary() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [tips, setTips] = useState<Tip[]>(TIPS_DATA.map((t) => ({ ...t, saved: false })));
  const [subscribed, setSubscribed] = useState(false);

  const filtered = activeCategory === "All" ? tips : tips.filter((t) => t.category === activeCategory);

  function toggleSave(id: number) {
    setTips((prev) => prev.map((t) => (t.id === id ? { ...t, saved: !t.saved } : t)));
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white p-6 space-y-8″>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1″>
          <Lightbulb className="text-yellow-400″ size={22} />
          <h1 className="text-2xl font-bold">Pro Tips Library</h1>
        </div>
        <p className="text-slate-400 text-sm">Learn from the best in DFW</p>
      </div>

      {/* Featured tip */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 space-y-4″>
        <div className="flex items-start gap-3″>
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0″>
            <Star className="text-yellow-400″ size={20} />
          </div>
          <div>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs mb-2″>Featured Tip</Badge>
            <h2 className="text-lg font-bold text-yellow-100 leading-snug">
              The 4-Minute Rule: Partners who respond to leads within 4 minutes win 3.7x more jobs. Here&apos;s how to make it automatic.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3″>
          {[
            { step: 1, text: "Turn on push notifications in your ProLnk app settings" },
            { step: 2, text: "Set your phone to Never Silent during business hours (7am–7pm)" },
            { step: 3, text: "Pre-write 3 opening templates so you can reply in seconds, not minutes" },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3 bg-white/5 rounded-lg p-3″>
              <div className="w-6 h-6 rounded-full bg-yellow-500 text-black text-xs font-bold flex items-center justify-center flex-shrink-0″>
                {step}
              </div>
              <p className="text-slate-300 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1″>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-slate-400 hover:bg-white/15 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tip cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4″>
        {filtered.map((tip) => {
          const Icon = tip.icon;
          return (
            <div key={tip.id} className="bg-[#111C30] border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:border-blue-500/40 transition-colors">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <Icon className="text-blue-400″ size={18} />
                </div>
                <button
                  onClick={() => toggleSave(tip.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    tip.saved ? "text-yellow-400 bg-yellow-400/10″ : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Bookmark size={16} fill={tip.saved ? "currentColor" : "none"} />
                </button>
              </div>
              <div>
                <Badge variant="outline" className="text-xs text-slate-400 border-slate-600 mb-2″>
                  {tip.category}
                </Badge>
                <h3 className="font-semibold text-white text-sm leading-snug">{tip.title}</h3>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed flex-1″>{tip.body}</p>
              <div className="flex items-baseline gap-1 pt-1 border-t border-white/5″>
                <span className="text-blue-400 font-bold text-lg">{tip.stat}</span>
                <span className="text-slate-500 text-xs">{tip.statLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly tip subscribe */}
      <div className="bg-[#111C30] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-3″>
          <div className="w-10 h-10 rounded-lg bg-green-500/15 flex items-center justify-center">
            <Bell className="text-green-400″ size={20} />
          </div>
          <div>
            <p className="font-semibold text-white">Weekly Tip</p>
            <p className="text-slate-400 text-sm">Get a new tip every Monday morning</p>
          </div>
        </div>
        {subscribed ? (
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
            <CheckCircle size={16} />
            Subscribed
          </div>
        ) : (
          <Button
            onClick={() => setSubscribed(true)}
            className="bg-green-600 hover:bg-green-500 text-white text-sm px-6″
          >
            Subscribe
          </Button>
        )}
      </div>
    </div>
  );
}
