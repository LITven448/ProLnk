import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Copy, Check, Users, Link as LinkIcon, Clock } from "lucide-react";
import { toast } from "sonner";

const BASE_URL = "https://prolnk.io/join/charter";

interface InviteCode {
  id: string;
  code: string;
  status: "unused" | "claimed";
  claimedBy?: string;
  claimedAt?: string;
  trade?: string;
  city?: string;
}

const MOCK_INVITES: InviteCode[] = [
  { id: "1″,  code: "CHR-A7K2-9P4Q", status: "claimed", claimedBy: "Marcus Thompson",  claimedAt: "May 2, 2026",  trade: "HVAC",       city: "Dallas"     },
  { id: "2″,  code: "CHR-B3M8-1R6W", status: "claimed", claimedBy: "Deja Williams",     claimedAt: "May 3, 2026",  trade: "Electrical", city: "Fort Worth" },
  { id: "3″,  code: "CHR-C9N5-7T2X", status: "claimed", claimedBy: "Carlos Mendoza",    claimedAt: "May 4, 2026",  trade: "Plumbing",   city: "Frisco"     },
  { id: "4″,  code: "CHR-D4P1-3V8Y", status: "claimed", claimedBy: "Priya Sharma",      claimedAt: "May 5, 2026",  trade: "Roofing",    city: "McKinney"   },
  { id: "5″,  code: "CHR-E6Q7-5Z0A", status: "claimed", claimedBy: "Tyrone Benson",     claimedAt: "May 6, 2026",  trade: "Landscaping", city: "Plano"     },
  { id: "6″,  code: "CHR-F2R3-8B4C", status: "claimed", claimedBy: "Lauren Kim",        claimedAt: "May 7, 2026",  trade: "Painting",   city: "Garland"    },
  { id: "7″,  code: "CHR-G8S9-2D6E", status: "claimed", claimedBy: "Andre Franklin",    claimedAt: "May 8, 2026",  trade: "Carpentry",  city: "Irving"     },
  { id: "8″,  code: "CHR-H1T4-9F1G", status: "claimed", claimedBy: "Sofia Reyes",       claimedAt: "May 9, 2026",  trade: "Flooring",   city: "Arlington"  },
  { id: "9″,  code: "CHR-I5U6-4H7J", status: "claimed", claimedBy: "Kevin Okafor",      claimedAt: "May 10, 2026", trade: "HVAC",       city: "Denton"     },
  { id: "10″, code: "CHR-J3V2-6K3L", status: "claimed", claimedBy: "Tamara Nguyen",     claimedAt: "May 11, 2026", trade: "Electrical", city: "Lewisville" },
  { id: "11″, code: "CHR-K7W8-1M9N", status: "claimed", claimedBy: "James Whitfield",   claimedAt: "May 12, 2026", trade: "Plumbing",   city: "Mesquite"   },
  { id: "12″, code: "CHR-L4X5-7P2Q", status: "claimed", claimedBy: "Alicia Torres",     claimedAt: "May 12, 2026", trade: "Insulation", city: "Carrollton" },
  { id: "13″, code: "CHR-M9Y1-3R8S", status: "unused"  },
  { id: "14″, code: "CHR-N2Z6-5T4U", status: "unused"  },
  { id: "15″, code: "CHR-O8A3-9V0W", status: "unused"  },
  { id: "16″, code: "CHR-P5B7-2X6Y", status: "unused"  },
  { id: "17″, code: "CHR-Q1C4-8Z1A", status: "unused"  },
  { id: "18″, code: "CHR-R6D9-4B7C", status: "unused"  },
  { id: "19″, code: "CHR-S3E2-1D3E", status: "unused"  },
  { id: "20″, code: "CHR-T7F8-6F9G", status: "unused"  },
  { id: "21″, code: "CHR-U4G5-2H5J", status: "unused"  },
  { id: "22″, code: "CHR-V9H1-8K1L", status: "unused"  },
  { id: "23″, code: "CHR-W2J6-4M7N", status: "unused"  },
  { id: "24″, code: "CHR-X8K3-9P3Q", status: "unused"  },
  { id: "25″, code: "CHR-Y5L7-1R8S", status: "unused"  },
];

function getInitials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

const AVATAR_PALETTE = [
  "bg-violet-600″, "bg-blue-600", "bg-emerald-600",
  "bg-rose-600″, "bg-amber-600", "bg-cyan-600",
  "bg-indigo-600″, "bg-pink-600", "bg-teal-600",
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

function CopyButton({ text, label = "Copy Link" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Invite link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        copied
          ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30″
          : "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600″
      }`}
    >
      {copied ? <Check className="w-3 h-3″ /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

export default function CharterInvites() {
  const [filter, setFilter] = useState<"all" | "unused" | "claimed">("all");

  const claimed = MOCK_INVITES.filter((i) => i.status === "claimed");
  const unused = MOCK_INVITES.filter((i) => i.status === "unused");
  const filtered = filter === "all" ? MOCK_INVITES : filter === "unused" ? unused : claimed;

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6″>
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-8″>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-4″>
              <Crown className="w-4 h-4 text-amber-400″ />
              <span className="text-amber-400 text-sm font-medium">Charter Member Exclusive</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Your Charter Invites</h1>
            <p className="text-slate-400 mt-1 text-sm">
              As a Charter member, you have 25 founding-tier invite codes. Each code unlocks Charter access for the person you invite.
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 mb-8″>
            <Card className="bg-slate-800/50 border-slate-700″>
              <CardContent className="pt-4 pb-4 text-center">
                <div className="text-2xl font-bold text-white">{claimed.length}</div>
                <div className="text-slate-400 text-xs mt-0.5 flex items-center justify-center gap-1″>
                  <Check className="w-3 h-3 text-emerald-400″ /> Claimed
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700″>
              <CardContent className="pt-4 pb-4 text-center">
                <div className="text-2xl font-bold text-white">{unused.length}</div>
                <div className="text-slate-400 text-xs mt-0.5 flex items-center justify-center gap-1″>
                  <Clock className="w-3 h-3 text-amber-400″ /> Remaining
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700″>
              <CardContent className="pt-4 pb-4 text-center">
                <div className="text-2xl font-bold text-white">25</div>
                <div className="text-slate-400 text-xs mt-0.5 flex items-center justify-center gap-1″>
                  <Users className="w-3 h-3 text-slate-400″ /> Total Slots
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Claim progress */}
          <div className="mb-8 bg-amber-500/5 border border-amber-500/20 rounded-2xl px-5 py-4″>
            <div className="flex items-center justify-between mb-2″>
              <span className="text-amber-300 text-sm font-semibold">Charter Network Progress</span>
              <span className="text-amber-400 font-bold text-sm">{claimed.length} / 25 filled</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-3 rounded-full transition-all"
                style={{ width: `${(claimed.length / 25) * 100}%` }}
              />
            </div>
            <p className="text-slate-500 text-xs mt-2″>
              Each claimed invite earns you a 12% subscription override forever. {unused.length} slots remaining before Charter waitlist closes.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6″>
            {(["all", "unused", "claimed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all capitalize ${
                  filter === f
                    ? "bg-amber-500 text-slate-900″
                    : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-500/40 hover:text-white"
                }`}
              >
                {f === "all" ? `All (${MOCK_INVITES.length})` : f === "unused" ? `Available (${unused.length})` : `Claimed (${claimed.length})`}
              </button>
            ))}
          </div>

          {/* Invite list */}
          <Card className="bg-slate-800/50 border-slate-700″>
            <CardHeader className="pb-3″>
              <CardTitle className="text-white text-base flex items-center gap-2″>
                <LinkIcon className="w-4 h-4 text-slate-400″ />
                {filter === "all" ? "All 25 Invite Codes" : filter === "unused" ? `${unused.length} Available Codes` : `${claimed.length} Claimed Codes`}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0″>
              <div className="divide-y divide-slate-700/50″>
                {filtered.map((invite, i) => {
                  const inviteUrl = `${BASE_URL}/${invite.code}`;
                  const overallIndex = MOCK_INVITES.findIndex((x) => x.id === invite.id) + 1;
                  return (
                    <div
                      key={invite.id}
                      className={`flex items-start gap-3 px-5 py-4 ${
                        invite.status === "claimed" ? "opacity-75″ : "hover:bg-slate-700/20 transition-colors"
                      }`}
                    >
                      {/* Slot number */}
                      <div className="w-7 text-slate-500 text-xs font-bold mt-1 flex-shrink-0 text-right">
                        {overallIndex}
                      </div>

                      {/* Status indicator */}
                      <div className="mt-1 flex-shrink-0″>
                        {invite.status === "claimed" ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                            <Check className="w-3 h-3 text-emerald-400″ />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400″ />
                          </div>
                        )}
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0″>
                        <div className="flex items-center gap-2 flex-wrap mb-1″>
                          <code className="text-sm font-mono text-slate-200 bg-slate-700/60 px-2 py-0.5 rounded">
                            {invite.code}
                          </code>
                          <Badge className={
                            invite.status === "claimed"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs"
                          }>
                            {invite.status === "claimed" ? "Claimed" : "Available"}
                          </Badge>
                        </div>

                        {invite.status === "claimed" && invite.claimedBy ? (
                          <div className="flex items-center gap-2 mt-1″>
                            <div className={`w-6 h-6 rounded-full ${avatarColor(invite.claimedBy)} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}>
                              {getInitials(invite.claimedBy)}
                            </div>
                            <div className="min-w-0″>
                              <span className="text-slate-300 text-sm font-medium">{invite.claimedBy}</span>
                              {invite.trade && <span className="text-slate-500 text-xs ml-2″>{invite.trade}{invite.city ? ` · ${invite.city}` : ""}</span>}
                            </div>
                            {invite.claimedAt && (
                              <span className="text-slate-600 text-xs ml-auto flex-shrink-0″>{invite.claimedAt}</span>
                            )}
                          </div>
                        ) : (
                          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                            <span className="text-slate-500 text-xs font-mono truncate max-w-xs">{inviteUrl}</span>
                          </div>
                        )}
                      </div>

                      {/* Action */}
                      <div className="flex-shrink-0 mt-0.5″>
                        {invite.status === "unused" ? (
                          <CopyButton text={inviteUrl} />
                        ) : (
                          <CopyButton text={inviteUrl} label="Copy Link" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bottom info */}
          <div className="mt-6 bg-slate-800/30 border border-slate-700/50 rounded-xl px-5 py-4 text-sm text-slate-400 space-y-1.5″>
            <p className="font-semibold text-slate-300 flex items-center gap-2″><Crown className="w-4 h-4 text-amber-400" /> How Charter Invites Work</p>
            <p>Each invite code gives the recipient Charter member pricing ($149/mo locked) and founding-tier network position.</p>
            <p>When they activate, you earn a <span className="text-emerald-400 font-semibold">12% subscription override</span> on their account — permanently.</p>
            <p>Unused codes remain active until the Charter waitlist closes at 25 Charter members or 500 total founding applications.</p>
          </div>

        </div>
      </div>
    </PartnerLayout>
  );
}
