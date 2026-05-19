import { useState } from "react";
import {
  CheckCircle, PlayCircle, FileText, HelpCircle, Download,
  Award, Calendar, ChevronRight, Lock, Star, Zap,
} from "lucide-react";

type TrackKey = "start" | "grow" | "advanced";
type ModuleFormat = "Video" | "Article" | "Quiz";
type ModuleStatus = "complete" | "in-progress" | "locked";

interface Module {
  id: string;
  title: string;
  duration: string;
  format: ModuleFormat;
  status: ModuleStatus;
  xp: number;
}

interface Track {
  key: TrackKey;
  label: string;
  color: string;
  modules: Module[];
}

interface Certificate {
  title: string;
  date: string;
  icon: typeof Award;
  color: string;
}

const TRACKS: Track[] = [
  {
    key: "start",
    label: "Getting Started",
    color: "text-teal-400″,
    modules: [
      { id: "s1″, title: "ProLnk Basics",                  duration: "8 min",  format: "Video",   status: "complete",    xp: 50  },
      { id: "s2″, title: "Setting Up Your Profile",         duration: "10 min", format: "Article", status: "complete",    xp: 75  },
      { id: "s3″, title: "How to Respond to Leads",         duration: "12 min", format: "Video",   status: "in-progress", xp: 100 },
      { id: "s4″, title: "Your First Job",                  duration: "15 min", format: "Quiz",    status: "locked",      xp: 150 },
    ],
  },
  {
    key: "grow",
    label: "Growing Your Business",
    color: "text-purple-400″,
    modules: [
      { id: "g1″, title: "Photo Strategy",                  duration: "9 min",  format: "Article", status: "complete",    xp: 75  },
      { id: "g2″, title: "Winning More Bids",               duration: "14 min", format: "Video",   status: "complete",    xp: 100 },
      { id: "g3″, title: "Building Your Network",           duration: "11 min", format: "Video",   status: "locked",      xp: 125 },
      { id: "g4″, title: "Customer Retention",              duration: "13 min", format: "Article", status: "locked",      xp: 100 },
    ],
  },
  {
    key: "advanced",
    label: "Advanced",
    color: "text-amber-400″,
    modules: [
      { id: "a1″, title: "Tax Strategy for Pros",           duration: "15 min", format: "Article", status: "locked",      xp: 150 },
      { id: "a2″, title: "Scaling to a Crew",               duration: "12 min", format: "Video",   status: "locked",      xp: 175 },
      { id: "a3″, title: "Franchise Opportunities",         duration: "10 min", format: "Video",   status: "locked",      xp: 200 },
      { id: "a4″, title: "Passive Income Mastery",          duration: "15 min", format: "Quiz",    status: "locked",      xp: 250 },
    ],
  },
];

const CERTIFICATES: Certificate[] = [
  { title: "ProLnk Certified Pro",     date: "Apr 15, 2026″, icon: Award,  color: "text-teal-400"   },
  { title: "Network Income Basics",    date: "Apr 28, 2026″, icon: Star,   color: "text-purple-400" },
];

const FORMAT_ICONS: Record<ModuleFormat, typeof PlayCircle> = {
  Video:   PlayCircle,
  Article: FileText,
  Quiz:    HelpCircle,
};

const FORMAT_COLORS: Record<ModuleFormat, string> = {
  Video:   "text-teal-400 bg-teal-900/20″,
  Article: "text-blue-400 bg-blue-900/20″,
  Quiz:    "text-amber-400 bg-amber-900/20″,
};

function ProgressRing({ pct }: { pct: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90″ width="144" height="144">
        <circle cx="72″ cy="72" r={r} stroke="#1e293b" strokeWidth="12" fill="none" />
        <circle
          cx="72″ cy="72" r={r}
          stroke="url(#trainGrad)" strokeWidth="12″ fill="none"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="trainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6″ />
            <stop offset="100%" stopColor="#14b8a6″ />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center z-10″>
        <div className="text-3xl font-bold text-white">{pct}%</div>
        <div className="text-xs text-slate-400″>complete</div>
      </div>
    </div>
  );
}

function ModuleCard({ mod }: { mod: Module }) {
  const FmtIcon = FORMAT_ICONS[mod.format];
  const fmtColor = FORMAT_COLORS[mod.format];
  const isLocked = mod.status === "locked";
  const isDone = mod.status === "complete";

  return (
    <div className={`flex items-center gap-4 rounded-xl p-4 border transition-colors ${
      isDone
        ? "bg-teal-900/10 border-teal-700/30″
        : isLocked
        ? "bg-slate-800/30 border-slate-700/30 opacity-60″
        : "bg-purple-900/10 border-purple-700/30″
    }`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${fmtColor}`}>
        <FmtIcon className="w-4 h-4″ />
      </div>
      <div className="flex-1 min-w-0″>
        <div className="text-slate-200 text-sm font-medium truncate">{mod.title}</div>
        <div className="flex items-center gap-3 mt-1″>
          <span className="text-slate-500 text-xs">{mod.duration}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${fmtColor}`}>{mod.format}</span>
          <span className="text-amber-400 text-xs flex items-center gap-1″>
            <Zap className="w-3 h-3″ />
            {mod.xp} XP
          </span>
        </div>
      </div>
      {isDone ? (
        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0″ />
      ) : isLocked ? (
        <Lock className="w-4 h-4 text-slate-600 flex-shrink-0″ />
      ) : (
        <button className="text-xs bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1 transition-colors flex-shrink-0″>
          Continue
          <ChevronRight className="w-3 h-3″ />
        </button>
      )}
    </div>
  );
}

export default function TrainingLibrary() {
  const [activeTrack, setActiveTrack] = useState<TrackKey>("start");

  const allModules = TRACKS.flatMap((t) => t.modules);
  const completed = allModules.filter((m) => m.status === "complete").length;
  const total = allModules.length;
  const pct = Math.round((completed / total) * 100);

  const currentTrack = TRACKS.find((t) => t.key === activeTrack)!;

  return (
    <div className="min-h-screen bg-[#0A1628] p-6″>
      <div className="max-w-4xl mx-auto space-y-8 pb-12″>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/40 to-teal-900/30 border border-purple-700/40 rounded-2xl p-8″>
          <div className="flex items-center gap-3 mb-2″>
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-purple-400″ />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Training Library</h1>
              <p className="text-purple-300 text-sm">Get better, earn more</p>
            </div>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6″>
          <h2 className="text-lg font-semibold text-white mb-5″>Your Progress</h2>
          <div className="flex flex-col sm:flex-row items-center gap-8″>
            <ProgressRing pct={pct} />
            <div className="flex-1 space-y-3 w-full">
              {TRACKS.map((track) => {
                const done = track.modules.filter((m) => m.status === "complete").length;
                const trackPct = Math.round((done / track.modules.length) * 100);
                return (
                  <div key={track.key}>
                    <div className="flex items-center justify-between text-sm mb-1″>
                      <span className={track.color}>{track.label}</span>
                      <span className="text-slate-400″>{done}/{track.modules.length}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          track.key === "start" ? "bg-teal-400″ :
                          track.key === "grow" ? "bg-purple-500″ : "bg-amber-400"
                        }`}
                        style={{ width: `${trackPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="text-slate-400 text-sm mt-2″>
                {completed} of {total} modules complete
              </div>
            </div>
          </div>
        </div>

        {/* Track Tabs + Modules */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6″>
          <div className="flex gap-2 mb-6 flex-wrap">
            {TRACKS.map((track) => (
              <button
                key={track.key}
                onClick={() => setActiveTrack(track.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeTrack === track.key
                    ? "bg-purple-600 text-white"
                    : "bg-slate-800/60 text-slate-400 hover:text-slate-200″
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>
          <div className="space-y-3″>
            {currentTrack.modules.map((mod) => (
              <ModuleCard key={mod.id} mod={mod} />
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6″>
          <h2 className="text-lg font-semibold text-white mb-5″>Your Certificates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4″>
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.title}
                className="flex items-center gap-4 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4″
              >
                <div className="w-10 h-10 bg-slate-700/60 rounded-xl flex items-center justify-center flex-shrink-0″>
                  <cert.icon className={`w-5 h-5 ${cert.color}`} />
                </div>
                <div className="flex-1 min-w-0″>
                  <div className="text-slate-200 text-sm font-medium truncate">{cert.title}</div>
                  <div className="text-slate-500 text-xs mt-0.5″>Earned {cert.date}</div>
                </div>
                <button className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg px-3 py-1.5 flex items-center gap-1 transition-colors flex-shrink-0″>
                  <Download className="w-3 h-3″ />
                  PDF
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Training */}
        <div className="bg-gradient-to-r from-blue-900/30 to-teal-900/20 border border-blue-700/40 rounded-2xl p-6″>
          <div className="flex items-start gap-4″>
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0″>
              <Calendar className="w-5 h-5 text-blue-400″ />
            </div>
            <div className="flex-1″>
              <div className="text-white font-semibold mb-1″>Next Live Webinar</div>
              <div className="text-blue-200 text-sm font-medium mb-1″>
                How to Win HVAC Storm Leads — May 20, 7PM CST
              </div>
              <div className="text-slate-400 text-xs mb-4″>47 partners registered</div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors">
                Register Free
              </button>
            </div>
          </div>
        </div>

        {/* Master Partner Banner */}
        <div className="bg-gradient-to-r from-amber-900/40 to-yellow-900/20 border border-amber-600/40 rounded-2xl p-6 flex items-center gap-5″>
          <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center flex-shrink-0″>
            <Award className="w-7 h-7 text-amber-400″ />
          </div>
          <div className="flex-1″>
            <div className="text-white font-bold text-lg mb-1″>Earn All 12 Certificates</div>
            <div className="text-amber-200 text-sm">
              Complete all training modules and unlock the <span className="font-bold text-amber-300″>Master Partner Badge</span> + <span className="font-bold text-green-300">$50 bonus</span>.
              {completed < total && ` ${total - completed} modules remaining.`}
            </div>
          </div>
          <button className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors flex-shrink-0″>
            Start Now
            <ChevronRight className="w-4 h-4″ />
          </button>
        </div>

      </div>
    </div>
  );
}
