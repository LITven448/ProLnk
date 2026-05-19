import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import {
  Inbox, MapPin, Wrench, DollarSign, Zap, Clock,
  AlertTriangle, CheckCircle, ArrowRight, BookOpen,
} from "lucide-react";

interface MockLead {
  id: string;
  trade: string;
  location: string;
  description: string;
  estimatedValue: number;
  aiConfidence: number;
  urgency: "high" | "medium" | "low";
  detectedBy: string;
  hoursAgo: number;
}

const MOCK_LEADS: MockLead[] = [
  {
    id: "lead-001″,
    trade: "HVAC",
    location: "Charlotte, NC 28202″,
    description: "AI detected aging HVAC unit (14 yrs) via home health scan. Homeowner reported cooling issues last summer. Permit history shows no replacement since install.",
    estimatedValue: 6800,
    aiConfidence: 91,
    urgency: "high",
    detectedBy: "Asset Aging Engine",
    hoursAgo: 2,
  },
  {
    id: "lead-002″,
    trade: "Roofing",
    location: "Atlanta, GA 30318″,
    description: "Storm Watch engine flagged hail event (0.9\") on May 9. Home is 22 years old with no documented roof replacement. 3 neighbors already filed insurance claims.",
    estimatedValue: 12400,
    aiConfidence: 87,
    urgency: "high",
    detectedBy: "Storm Watch Engine",
    hoursAgo: 6,
  },
  {
    id: "lead-003″,
    trade: "Plumbing",
    location: "Dallas, TX 75204″,
    description: "Homeowner submitted Home Health survey noting water pressure drop and occasional discolored water. Water heater installed 2009. Pipe material flagged as galvanized.",
    estimatedValue: 3200,
    aiConfidence: 74,
    urgency: "medium",
    detectedBy: "Home Health Vault",
    hoursAgo: 14,
  },
];

const URGENCY_CONFIG = {
  high:   { label: "Urgent",  bg: "bg-red-500/15″,   text: "text-red-400",   border: "border-red-500/30",   dot: "bg-red-400"   },
  medium: { label: "Active",  bg: "bg-amber-500/15″, text: "text-amber-400", border: "border-amber-500/30", dot: "bg-amber-400" },
  low:    { label: "Routine", bg: "bg-teal-500/15″,  text: "text-teal-400",  border: "border-teal-500/30",  dot: "bg-teal-400"  },
};

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 85 ? "bg-teal-400″ : value >= 70 ? "bg-amber-400" : "bg-slate-500";
  return (
    <div className="flex items-center gap-2″>
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-slate-400 w-8 text-right">{value}%</span>
    </div>
  );
}

function MockLeadCard({ lead }: { lead: MockLead }) {
  const urg = URGENCY_CONFIG[lead.urgency];
  return (
    <div className={`relative rounded-xl border ${urg.border} bg-slate-800/50 p-5 opacity-60 select-none`}>
      <div className="absolute top-3 right-3″>
        <Badge className="bg-slate-700/60 text-slate-400 text-[10px] font-medium px-2 py-0.5 border border-slate-600″>
          Preview only
        </Badge>
      </div>

      <div className="flex items-start gap-3 mb-3″>
        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${urg.dot}`} />
        <div className="flex-1 min-w-0″>
          <div className="flex flex-wrap items-center gap-2 mb-1″>
            <span className="text-white font-semibold text-sm">{lead.trade}</span>
            <Badge className={`${urg.bg} ${urg.text} border ${urg.border} text-[10px] px-2 py-0`}>{urg.label}</Badge>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <MapPin className="h-3 w-3″ />
            <span>{lead.location}</span>
            <span className="mx-1 text-slate-600″>·</span>
            <Clock className="h-3 w-3″ />
            <span>{lead.hoursAgo}h ago</span>
          </div>
        </div>
      </div>

      <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-2″>{lead.description}</p>

      <div className="grid grid-cols-3 gap-3 mb-3″>
        <div className="bg-slate-900/50 rounded-lg p-2.5 text-center">
          <DollarSign className="h-3.5 w-3.5 text-teal-400 mx-auto mb-1″ />
          <div className="text-white font-bold text-sm">${lead.estimatedValue.toLocaleString()}</div>
          <div className="text-slate-500 text-[10px]">Est. Value</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-2.5 text-center">
          <Zap className="h-3.5 w-3.5 text-purple-400 mx-auto mb-1″ />
          <div className="text-white font-bold text-sm">{lead.aiConfidence}%</div>
          <div className="text-slate-500 text-[10px]">AI Confidence</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-2.5 text-center">
          <Wrench className="h-3.5 w-3.5 text-blue-400 mx-auto mb-1″ />
          <div className="text-white font-bold text-sm">{lead.trade}</div>
          <div className="text-slate-500 text-[10px]">Trade</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-3 border-t border-slate-700/50″>
        <span className="flex items-center gap-1″>
          <Zap className="h-3 w-3″ />
          {lead.detectedBy}
        </span>
        <span>AI Confidence</span>
      </div>
      <ConfidenceBar value={lead.aiConfidence} />
    </div>
  );
}

export default function LeadInbox() {
  return (
    <div className="min-h-screen bg-slate-950″>
      <div className="container max-w-5xl mx-auto px-4 py-10 space-y-10″>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2″>
            <Inbox className="h-6 w-6 text-teal-400″ />
            Lead Inbox
          </h1>
          <p className="text-slate-400 mt-1″>Your AI-detected leads, matched to your trade and service area</p>
        </div>

        {/* How Leads Work */}
        <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-6″>
          <div className="flex items-center gap-2 mb-4″>
            <BookOpen className="h-4 w-4 text-teal-400″ />
            <h2 className="text-white font-semibold text-sm tracking-wide uppercase">How Leads Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
            {[
              {
                step: "01″,
                icon: Zap,
                title: "AI Detects the Need",
                desc: "ProLnk's 4 autonomous engines — Storm Watch, Asset Aging, Market Events, and Safety Recalls — continuously scan home data for service opportunities.",
                color: "text-purple-400″,
              },
              {
                step: "02″,
                icon: MapPin,
                title: "Matched to You",
                desc: "When a lead matches your trade and service area, it appears in your inbox with an AI confidence score, estimated job value, and urgency tier.",
                color: "text-teal-400″,
              },
              {
                step: "03″,
                icon: CheckCircle,
                title: "You Claim, You Earn",
                desc: "Claim the lead within the window, complete the job, and your commission is tracked automatically. No bidding wars — first-qualified-pro wins.",
                color: "text-green-400″,
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-3″>
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-300″>{item.step}</span>
                </div>
                <div>
                  <item.icon className={`h-4 w-4 ${item.color} mb-1`} />
                  <p className="text-white text-sm font-medium mb-1″>{item.title}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unlock Banner */}
        <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-6″>
          <div className="flex items-start gap-4″>
            <AlertTriangle className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5″ />
            <div className="flex-1″>
              <h3 className="text-white font-semibold mb-1″>Your first lead unlocks when you're approved + have 1 documented home</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4″>
                Once your account is approved and you've documented your first home in the Home Health Vault, ProLnk’s AI begins generating leads matched to your trade and service area. The more homes documented, the more leads you receive.
              </p>
              <div className="flex flex-wrap gap-3″>
                <Link href="/job-log">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold transition-colors">
                    Log a Job to Get Started
                    <ArrowRight className="h-3.5 w-3.5″ />
                  </button>
                </Link>
                <Link href="/home-health">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors border border-slate-600″>
                    Add a Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Lead Cards */}
        <div>
          <div className="flex items-center justify-between mb-4″>
            <h2 className="text-white font-semibold text-sm tracking-wide uppercase flex items-center gap-2″>
              <Zap className="h-4 w-4 text-purple-400″ />
              What an AI-Detected Lead Looks Like
            </h2>
            <Badge className="bg-slate-700 text-slate-400 border border-slate-600 text-[10px]">Sample data — not real leads</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4″>
            {MOCK_LEADS.map((lead) => (
              <MockLeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
