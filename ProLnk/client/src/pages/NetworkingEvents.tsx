import { useState, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Video, Clock, CheckCircle, Star } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const EVENTS = [
  {
    id: 1,
    title: "ProLnk Partner Kickoff — Dallas",
    type: "In-Person",
    date: "Apr 15, 2026",
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
    title: "Insurance Claims Masterclass",
    type: "Virtual",
    date: "Apr 22, 2026",
    time: "2:00 PM – 4:00 PM CST",
    location: "Zoom",
    attendees: 112,
    maxAttendees: 200,
    description: "Learn how to handle insurance claims from start to finish. Special guest: a licensed public adjuster shares insider tips.",
    tags: ["Training", "Insurance", "Webinar"],
    featured: false,
    registered: true,
  },
  {
    id: 3,
    title: "Partner Q&A with Andrew Duke",
    type: "Virtual",
    date: "May 1, 2026",
    time: "12:00 PM – 1:00 PM CST",
    location: "Zoom",
    attendees: 89,
    maxAttendees: 150,
    description: "Open Q&A session with the CEO. Ask anything about the platform, upcoming features, or growth strategy.",
    tags: ["Q&A", "Leadership"],
    featured: false,
    registered: false,
  },
  {
    id: 4,
    title: "DFW Home Services Trade Show",
    type: "In-Person",
    date: "May 8, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "Kay Bailey Hutchison Convention Center",
    attendees: 340,
    maxAttendees: 1000,
    description: "ProLnk has a booth — come represent the network, meet homeowners, and connect with other trades.",
    tags: ["Trade Show", "Networking", "Homeowners"],
    featured: false,
    registered: false,
  },
];

export default function NetworkingEvents() {
  const [registered, setRegistered] = useState<number[]>([]);

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

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Events & Networking</h1>
          <p className="text-slate-500 mt-1">Connect with other pros, learn from experts, and grow your network</p>
        </div>

        <div className="space-y-4">
          {EVENTS.map(event => {
            const isRegistered = registered.includes(event.id);
            const fillPct = (event.attendees / event.maxAttendees) * 100;
            const almostFull = fillPct >= 80;

            return (
              <Card key={event.id} className={event.featured ? "border-indigo-300 bg-indigo-50/30" : ""}>
                <CardContent className="pt-4">
                  {event.featured && (
                    <div className="flex items-center gap-1 text-xs text-indigo-600 font-medium mb-2">
                      <Star className="w-3 h-3 fill-indigo-400" /> Featured Event
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-slate-900">{event.title}</span>
                        <Badge className={`text-xs ${event.type === "Virtual" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                          {event.type === "Virtual" ? <Video className="w-2.5 h-2.5 mr-1 inline" /> : <MapPin className="w-2.5 h-2.5 mr-1 inline" />}
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                      <div className="flex gap-1 flex-wrap mb-2">
                        {event.tags.map(t => <Badge key={t} className="text-xs bg-slate-100 text-slate-500">{t}</Badge>)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Users className="w-3 h-3" />
                        <span className={almostFull ? "text-red-500 font-medium" : ""}>{event.attendees} attending · {event.maxAttendees - event.attendees} spots left</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        size="sm"
                        disabled={isRegistered}
                        className={`text-xs ${isRegistered ? "bg-green-600 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
                        onClick={() => register(event.id, event)}
                      >
                        {isRegistered ? <><CheckCircle className="w-3 h-3 mr-1" /> Registered</> : "Register"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
