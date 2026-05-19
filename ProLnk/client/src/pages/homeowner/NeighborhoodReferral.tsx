import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Copy,
  Mail,
  MessageSquare,
  QrCode,
  Trophy,
  Gift,
  CheckCircle,
  Star,
  TrendingUp,
  Scan,
  CalendarClock,
  Tag,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useState } from "react";

const REFERRAL_LINK = "https://trustypro.io/join?ref=HO-76092-A8F3";

const REWARDS = [
  {
    icon: <Scan className="h-5 w-5 text-teal-400" />,
    title: "Free Home Health Scan",
    description: "A full AI-powered scan of your home's systems",
    unlocksAt: 1,
  },
  {
    icon: <CalendarClock className="h-5 w-5 text-purple-400" />,
    title: "Priority Scheduling",
    description: "Skip the queue — get same-week service appointments",
    unlocksAt: 3,
  },
  {
    icon: <Tag className="h-5 w-5 text-orange-400" />,
    title: "Neighborhood Pricing (10% off all services)",
    description: "Permanent discount on every job booked through TrustyPro",
    unlocksAt: 5,
  },
];

const LEADERBOARD = [
  { rank: 1, neighborhood: "Southlake 76092", count: 38, badge: "🏆" },
  { rank: 2, neighborhood: "Keller 76248", count: 29, badge: "🥈" },
  { rank: 3, neighborhood: "Colleyville 76034", count: 24, badge: "🥉" },
  { rank: 4, neighborhood: "Grapevine 76051", count: 19, badge: "" },
  { rank: 5, neighborhood: "Flower Mound 75028", count: 15, badge: "" },
  { rank: 6, neighborhood: "Coppell 75019", count: 11, badge: "" },
];

const MY_JOINED = 2;
const MY_GOAL = 5;
const MY_REFERRALS_SENT = 6;
const MY_PENDING = 4;

export default function NeighborhoodReferral() {
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  function copyLink() {
    navigator.clipboard?.writeText(REFERRAL_LINK).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function sendEmail() {
    window.location.href = `mailto:?subject=Join%20TrustyPro%20with%20me!&body=Hey%2C%20I%20use%20TrustyPro%20to%20find%20trusted%20home%20service%20pros%20in%20our%20neighborhood.%20Use%20my%20link%20to%20join%3A%20${encodeURIComponent(REFERRAL_LINK)}`;
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  }

  function sendText() {
    window.location.href = `sms:?body=Join%20TrustyPro%20with%20me%20%E2%80%94%20trusted%20home%20pros%20in%20our%20neighborhood%3A%20${encodeURIComponent(REFERRAL_LINK)}`;
  }

  const progressPercent = Math.min(100, (MY_JOINED / MY_GOAL) * 100);
  const nextReward = REWARDS.find(r => r.unlocksAt > MY_JOINED);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="max-w-2xl mx-auto space-y-5 p-4 pb-12">

          <div>
            <h1 className="text-2xl font-bold text-white">Neighborhood Referral</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Invite neighbors to TrustyPro — unlock better pricing and rewards for everyone.
            </p>
          </div>

          <Card className="bg-gradient-to-br from-teal-900/40 to-[#0F1E35] border-teal-400/40">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start gap-3 mb-4">
                <Users className="h-6 w-6 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-base">When 5 neighbors join → Neighborhood Pricing unlocked</p>
                  <p className="text-sm text-gray-400 mt-0.5">Everyone in your ZIP gets 10% off all services — permanently.</p>
                </div>
              </div>

              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  <span className="text-teal-400 font-bold text-lg">{MY_JOINED}</span>
                  <span className="text-gray-500"> of {MY_GOAL} neighbors joined</span>
                </span>
                {MY_JOINED < MY_GOAL && nextReward && (
                  <span className="text-xs text-gray-500">{MY_GOAL - MY_JOINED} more to unlock pricing</span>
                )}
                {MY_JOINED >= MY_GOAL && (
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-0 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Unlocked!
                  </Badge>
                )}
              </div>

              <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {REWARDS.map(r => {
                  const unlocked = MY_JOINED >= r.unlocksAt;
                  return (
                    <div
                      key={r.title}
                      className={`rounded-lg p-3 flex flex-col items-center text-center gap-1.5 transition-all ${
                        unlocked
                          ? "bg-teal-900/40 border border-teal-400/30"
                          : "bg-white/5 border border-white/10 opacity-60"
                      }`}
                    >
                      <div className={`${!unlocked ? "grayscale" : ""}`}>{r.icon}</div>
                      <p className="text-xs font-medium text-white leading-tight">{r.title}</p>
                      {unlocked ? (
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-xs px-1.5">Unlocked</Badge>
                      ) : (
                        <span className="text-xs text-gray-600">{r.unlocksAt} neighbor{r.unlocksAt !== 1 ? "s" : ""}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0F1E35] border-white/10">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Gift className="h-4 w-4 text-teal-400" /> Share Your Referral Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-4">
              <div className="flex gap-2">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-gray-400 truncate font-mono">
                  {REFERRAL_LINK}
                </div>
                <Button
                  size="sm"
                  onClick={copyLink}
                  className={`shrink-0 gap-1 transition-all ${copied ? "bg-emerald-500 text-white" : "bg-teal-500 hover:bg-teal-400 text-black"}`}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={sendEmail}
                  className={`border-white/15 gap-1.5 text-xs font-medium ${emailSent ? "text-emerald-400 border-emerald-400/30" : "text-gray-300 hover:text-white hover:border-white/30"}`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  {emailSent ? "Sent!" : "Email"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={sendText}
                  className="border-white/15 text-gray-300 hover:text-white hover:border-white/30 gap-1.5 text-xs font-medium"
                >
                  <MessageSquare className="h-3.5 w-3.5" /> Text
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/15 text-gray-300 hover:text-white hover:border-white/30 gap-1.5 text-xs font-medium"
                  onClick={() => alert("QR code generation coming soon!")}
                >
                  <QrCode className="h-3.5 w-3.5" /> QR Code
                </Button>
              </div>

              <div className="bg-white/5 border border-dashed border-white/10 rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-center">
                <QrCode className="h-12 w-12 text-gray-600" />
                <p className="text-xs text-gray-600">QR code will appear here</p>
                <p className="text-xs text-gray-700">Print or share at neighborhood events</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0F1E35] border-white/10">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-teal-400" /> Your Referral Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-teal-400">{MY_JOINED}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Joined</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-orange-400">{MY_PENDING}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Pending</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-white">{MY_REFERRALS_SENT}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Sent</p>
                </div>
              </div>

              <div className="space-y-2">
                {REWARDS.filter(r => MY_JOINED >= r.unlocksAt).length === 0 ? (
                  <div className="text-xs text-gray-600 text-center py-2">Invite 1 neighbor to unlock your first reward.</div>
                ) : (
                  REWARDS.filter(r => MY_JOINED >= r.unlocksAt).map(r => (
                    <div key={r.title} className="flex items-center gap-2 bg-teal-900/20 border border-teal-400/20 rounded-lg px-3 py-2">
                      {r.icon}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">{r.title}</p>
                        <p className="text-xs text-gray-500 truncate">{r.description}</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    </div>
                  ))
                )}

                {nextReward && (
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 opacity-60">
                    {nextReward.icon}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-400 truncate">{nextReward.title}</p>
                      <p className="text-xs text-gray-600 truncate">Invite {nextReward.unlocksAt - MY_JOINED} more neighbor{nextReward.unlocksAt - MY_JOINED !== 1 ? "s" : ""} to unlock</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-600 shrink-0" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0F1E35] border-white/10">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-400" /> DFW Neighborhood Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> Top neighborhoods bringing their communities to TrustyPro
              </p>
              <div className="space-y-2">
                {LEADERBOARD.map((row, i) => {
                  const isMyNeighborhood = row.neighborhood === "Southlake 76092";
                  return (
                    <div
                      key={row.rank}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                        isMyNeighborhood
                          ? "bg-teal-900/30 border border-teal-400/30"
                          : "bg-white/3"
                      }`}
                    >
                      <span className={`text-sm font-bold w-5 text-center ${
                        row.rank === 1 ? "text-yellow-400"
                          : row.rank === 2 ? "text-gray-300"
                          : row.rank === 3 ? "text-orange-400"
                          : "text-gray-600"
                      }`}>
                        {row.badge || `#${row.rank}`}
                      </span>
                      <div className="flex-1 flex items-center gap-2 min-w-0">
                        <span className="text-sm text-white truncate">{row.neighborhood}</span>
                        {isMyNeighborhood && (
                          <Badge className="bg-teal-500/20 text-teal-300 border-0 text-xs shrink-0">You</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Users className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-sm font-semibold text-white">{row.count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-600 text-center mt-3">Updated daily · Top 10 neighborhoods win quarterly bonuses</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-900/30 to-blue-900/20 border-teal-400/20">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-sm">Why invite your neighbors?</p>
                  <ul className="mt-2 space-y-1 text-xs text-gray-400 list-none">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-teal-400 shrink-0" /> Pros prioritize neighborhoods with more users — faster response</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-teal-400 shrink-0" /> Group pricing unlocks at 5 neighbors → 10% off all services</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-teal-400 shrink-0" /> Community reviews help everyone find the best pros</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-teal-400 shrink-0" /> Storm alerts get smarter when more homes are in your area</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </HomeownerLayout>
  );
}
