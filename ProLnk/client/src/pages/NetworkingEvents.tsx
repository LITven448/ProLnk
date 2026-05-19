import { useState, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Video, Clock, CheckCircle, Star, ChevronRight, Image } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const EVENTS = [
  {
    id: 1,
    title: "ProLnk Monthly Contractor Meetup — Dallas",
    type: "In-Person",
    date: "Jun 10, 2026″,
    time: "6:00 PM – 9:00 PM",
    location: "The Statler Hotel, Dallas TX",
    attendees: 47,
    maxAttendees: 75,
    description: "Meet top-performing partners, hear from the ProLnk founders, and network over dinner. Gold and Platinum partners get priority seating.",
    tags: ["Networking", "Founders", "Dinner"],
    featured: true,
    registered: false,
  },
  {
    id: 2,
    title: "DFW Home Services Trade Show",
    type: "In-Person",
    date: "Jun 21, 2026″,
    time: "9:00 AM – 5:00 PM",
    location: "Kay Bailey Hutchison Convention Center, Dallas TX",
    attendees: 340,
    maxAttendees: 1000,
    description: "ProLnk has a booth — come represent the network, meet homeowners, and connect with other trades.",
    tags: ["Trade Show", "Networking", "Homeowners"],
    featured: false,
    registered: false,
  },
  {
    id: 3,
    title: "Contractor Lunch & Learn — Houston",
    type: "In-Person",
    date: "Jul 9, 2026″,
    time: "11:30 AM – 1:30 PM",
    location: "Brennan's of Houston, Houston TX",
    attendees: 22,
    maxAttendees: 40,
    description: "Casual lunch for trades in the Houston area. Share referral strategies, talk shop, and grow your local network.",
    tags: ["Lunch", "Networking", "Houston"],
    featured: false,
    registered: false,
  },
  {
    id: 4,
    title: "ProLnk Partner Q&A — Founders Edition",
    type: "Virtual",
    date: "Jul 17, 2026″,
    time: "12:00 PM – 1:00 PM CST",
    location: "Zoom",
    attendees: 89,
    maxAttendees: 150,
    description: "Open Q&A session with the CEO. Ask anything about the platform, upcoming features, income streams, or growth strategy.",
    tags: ["Q&A", "Leadership", "Virtual"],
    featured: false,
    registered: true,
  },
];

const PAST_EVENTS = [
  { id: 1, title: "ProLnk Kickoff — April Dallas", date: "Apr 15, 2026″, attendees: 74, gradient: "from-indigo-500 to-purple-600" },
  { id: 2, title: "Insurance Claims Masterclass", date: "Apr 22, 2026″, attendees: 112, gradient: "from-blue-500 to-cyan-600" },
  { id: 3, title: "Spring Trade Show Mixer", date: "May 3, 2026″, attendees: 210, gradient: "from-teal-500 to-emerald-600" },
  { id: 4, title: "Contractor Lunch — Austin", date: "May 20, 2026″, attendees: 38, gradient: "from-amber-500 to-orange-600" },
  { id: 5, title: "Network Income Workshop", date: "May 28, 2026″, attendees: 95, gradient: "from-rose-500 to-pink-600" },
  { id: 6, title: "Monthly Meetup — Dallas", date: "Jun 4, 2026″, attendees: 63, gradient: "from-violet-500 to-indigo-600" },
];

export default function NetworkingEvents() {
  const [registered, setRegistered] = useState<number[]>([]);
  const [showIdeaForm, setShowIdeaForm] = useState(false);
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDetails, setIdeaDetails] = useState("");
  const [submittingIdea, setSubmittingIdea] = useState(false);

  const { data: myRegistrations } = trpc.partnerTools.events.list.useQuery();
  const registerMutation = trpc.partnerTools.events.register.useMutation({
    onSuccess: () => toast.success("Registered! Check your email for confirmation."),
    onError: (err) => toast.error(`Registration failed: ${err.message}`),
  });

  useEffect(() => {
    if (myRegistrations) {
      const ids = myRegistrations
        .filter(r => r.status !== "cancelled")
        .map(r => EVENTS.find(e => e.title === r.eventName)?.id)
        .filter((id): id is number => id !== undefined);
      setRegistered(ids);
    }
  }, [myRegistrations]);

  const register = (id: number, event: typeof EVENTS[0]) => {
    setRegistered(prev => [...prev, id]);
    registerMutation.mutate({ eventName: event.title, eventDate: new Date(event.date).toISOString(), location: event.location });
  };

  const submitIdea = () => {
    if (!ideaTitle.trim()) { toast.error("Please enter an event title"); return; }
    setSubmittingIdea(true);
    setTimeout(() => {
      toast.success("Event idea submitted! We'll review it soon.");
      setIdeaTitle("");
      setIdeaDetails("");
      setShowIdeaForm(false);
      setSubmittingIdea(false);
    }, 800);
  };

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900″>
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 px-6 py-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/20 to-transparent" />
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-4 py-1.5 text-indigo-300 text-sm font-medium mb-5″>
              <Users className="w-4 h-4″ />
              Contractor Community Events
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4″>Build Your Network In Person</h1>
            <p className="text-lg text-indigo-200 max-w-xl mx-auto">
              The strongest referral networks are built face-to-face. Join monthly meetups, trade shows, and contractor lunches across Texas.
            </p>
            <div className="flex items-center justify-center gap-8 mt-8 text-indigo-200 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-xs">Events This Quarter</div>
              </div>
              <div className="w-px h-8 bg-indigo-500/40″ />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">498</div>
                <div className="text-xs">Spots Claimed</div>
              </div>
              <div className="w-px h-8 bg-indigo-500/40″ />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs">Cities</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10″>
          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-5″>
              <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
              <span className="text-xs text-slate-400″>{EVENTS.length} events scheduled</span>
            </div>
            <div className="space-y-4″>
              {EVENTS.map(event => {
                const isRegistered = registered.includes(event.id);
                const fillPct = (event.attendees / event.maxAttendees) * 100;
                const almostFull = fillPct >= 80;

                return (
                  <Card key={event.id} className={`border transition-all ${event.featured ? "border-indigo-400/50 bg-indigo-950/40 shadow-indigo-900/30 shadow-lg" : "border-slate-700 bg-slate-800/50"}`}>
                    <CardContent className="pt-5 pb-5″>
                      {event.featured && (
                        <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-semibold mb-3″>
                          <Star className="w-3.5 h-3.5 fill-indigo-400″ /> Featured Event
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0″>
                          <div className="flex items-center gap-2 flex-wrap mb-2″>
                            <span className="font-bold text-white text-base">{event.title}</span>
                            <Badge className={`text-xs shrink-0 ${event.type === "Virtual" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : "bg-green-500/20 text-green-300 border-green-500/30"}`}>
                              {event.type === "Virtual" ? <Video className="w-2.5 h-2.5 mr-1 inline" /> : <MapPin className="w-2.5 h-2.5 mr-1 inline" />}
                              {event.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 flex-wrap">
                            <span className="flex items-center gap-1.5″><Calendar className="w-3.5 h-3.5 text-indigo-400" />{event.date}</span>
                            <span className="flex items-center gap-1.5″><Clock className="w-3.5 h-3.5 text-indigo-400" />{event.time}</span>
                            <span className="flex items-center gap-1.5″><MapPin className="w-3.5 h-3.5 text-indigo-400" />{event.location}</span>
                          </div>
                          <p className="text-sm text-slate-300 mb-3 leading-relaxed">{event.description}</p>
                          <div className="flex gap-1.5 flex-wrap mb-3″>
                            {event.tags.map(t => <Badge key={t} className="text-xs bg-slate-700/60 text-slate-400 border-slate-600/50″>{t}</Badge>)}
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className={`flex items-center gap-1.5 ${almostFull ? "text-red-400 font-semibold" : "text-slate-400"}`}>
                              <Users className="w-3.5 h-3.5″ />
                              {event.attendees} attending · {event.maxAttendees - event.attendees} spots left
                            </span>
                            {almostFull && <span className="text-red-400 font-semibold">Almost full!</span>}
                          </div>
                        </div>
                        <div className="shrink-0 flex flex-col items-end gap-2″>
                          <Button
                            size="sm"
                            disabled={isRegistered || registerMutation.isPending}
                            className={`font-semibold ${isRegistered ? "bg-green-600/80 hover:bg-green-600 text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white"}`}
                            onClick={() => !isRegistered && register(event.id, event)}
                          >
                            {isRegistered ? (
                              <><CheckCircle className="w-3.5 h-3.5 mr-1.5″ /> Registered</>
                            ) : (
                              "RSVP Free"
                            )}
                          </Button>
                          <span className="text-xs text-slate-500″>No cost · Cancel anytime</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-xl font-bold text-white mb-5″>Past Events</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3″>
              {PAST_EVENTS.map(pe => (
                <div key={pe.id} className="relative rounded-xl overflow-hidden aspect-video cursor-pointer group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${pe.gradient} opacity-80`} />
                  <div className="absolute inset-0 flex flex-col justify-between p-3″>
                    <div className="flex justify-end">
                      <Image className="w-4 h-4 text-white/60″ />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs leading-snug">{pe.title}</p>
                      <p className="text-white/70 text-xs mt-0.5″>{pe.date} · {pe.attendees} attended</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Event Idea */}
          <div className="border border-dashed border-slate-600 rounded-2xl p-6 bg-slate-800/30″>
            {!showIdeaForm ? (
              <div className="text-center">
                <div className="text-3xl mb-3″>💡</div>
                <h3 className="text-white font-bold text-lg mb-1″>Have an event idea?</h3>
                <p className="text-slate-400 text-sm mb-4″>
                  Suggest a city, format, or topic for the next ProLnk contractor gathering.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowIdeaForm(true)}
                  className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-600/20″
                >
                  Submit an Idea <ChevronRight className="w-4 h-4 ml-1″ />
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-w-md mx-auto">
                <h3 className="text-white font-bold text-base">Submit an Event Idea</h3>
                <Input
                  placeholder="Event title (e.g. 'Plumber Lunch — Austin')"
                  value={ideaTitle}
                  onChange={e => setIdeaTitle(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500″
                />
                <Textarea
                  placeholder="City, format, topics you'd like covered..."
                  value={ideaDetails}
                  onChange={e => setIdeaDetails(e.target.value)}
                  rows={3}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 resize-none"
                />
                <div className="flex gap-2″>
                  <Button
                    onClick={submitIdea}
                    disabled={submittingIdea}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white"
                  >
                    {submittingIdea ? "Submitting..." : "Submit Idea"}
                  </Button>
                  <Button variant="ghost" onClick={() => setShowIdeaForm(false)} className="text-slate-400 hover:text-white">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
