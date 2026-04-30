/**
 * Communication Sequence -- Admin visual of every message ProLnk sends
 * Shows the full timeline per referral lifecycle event
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare, Mail, Bell, Smartphone, Clock, CheckCircle,
  ChevronRight, Eye, Edit2, Send, User, Briefcase, Home,
  Sparkles, DollarSign, ArrowRight, Circle, Wand2, Copy
} from "lucide-react";
import { toast } from "sonner";

// --- Types ---------------------------------------------------------------------
type Channel = "sms" | "email" | "in_app" | "push";
type Recipient = "field_partner" | "receiving_partner" | "homeowner" | "admin";

interface CommEvent {
  id: string;
  trigger: string;
  triggerIcon: typeof Sparkles;
  triggerColor: string;
  messages: Array<{
    id: string;
    channel: Channel;
    recipient: Recipient;
    subject?: string;
    preview: string;
    delay: string;
    status: "sent" | "pending" | "template";
    aiGenerated?: boolean;
  }>;
}

// --- Demo Data -----------------------------------------------------------------
const SEQUENCE: CommEvent[] = [
  {
    id: "ev1", trigger: "AI Detects Opportunity", triggerIcon: Sparkles, triggerColor: "#8B5CF6",
    messages: [
      { id: "m1", channel: "in_app", recipient: "admin", preview: "New opportunity detected -- Fence & Deck at 4821 Willow Creek Dr. Review required before routing.", delay: "Instant", status: "sent" },
    ],
  },
  {
    id: "ev2", trigger: "Admin Approves Referral", triggerIcon: CheckCircle, triggerColor: "#3B82F6",
    messages: [
      { id: "m2", channel: "in_app", recipient: "receiving_partner", subject: "New Lead Available", preview: "A new Fence & Deck lead is available in Frisco, TX. Estimated value: $1,400. You have 24 hours to accept.", delay: "Instant", status: "sent" },
      { id: "m3", channel: "email", recipient: "receiving_partner", subject: "ProLnk: New Lead -- Fence & Deck, Frisco TX", preview: "Hi [Partner], a homeowner in your service area needs fence work. Estimated job: $1,400. Tap to accept or pass.", delay: "Instant", status: "sent" },
    ],
  },
  {
    id: "ev3", trigger: "Receiving Partner Accepts Lead", triggerIcon: Briefcase, triggerColor: "#F59E0B",
    messages: [
      { id: "m4", channel: "sms", recipient: "homeowner", preview: "Hi Jennifer! Your lawn service was just completed. Our AI noticed something at your property -- tap to see before/after photos and a special offer. [link]", delay: "Instant", status: "sent", aiGenerated: true },
      { id: "m5", channel: "email", recipient: "homeowner", subject: "Your Lawn Service is Complete + A Special Offer", preview: "Hi Jennifer,\n\nYour lawn looks great -- Green Blade Lawn Care just finished up at 4821 Willow Creek Dr.\n\nWhile our AI was reviewing the job photos, it noticed something that might save you some headaches: the fence along your back property line has some rotted boards and a broken gate hinge. Left unaddressed, this can become a bigger (and more expensive) repair.\n\nWe've lined up DFW Fence Pros -- a vetted ProLnk partner with 4.9 reviews in Frisco -- to give you a free estimate. No obligation.\n\n[View Before & After Photos + Claim Your Free Estimate ]\n\nThis offer expires in 48 hours.\n\nBest,\nThe ProLnk Team", delay: "2 min", status: "sent", aiGenerated: true },
      { id: "m6", channel: "in_app", recipient: "field_partner", preview: "Your referral was accepted! DFW Fence Pros will contact Jennifer Martinez. You'll earn $70 when the job closes.", delay: "Instant", status: "sent" },
    ],
  },
  {
    id: "ev4", trigger: "Homeowner Clicks 'Claim This Deal'", triggerIcon: Home, triggerColor: "#00B5B8",
    messages: [
      { id: "m7", channel: "sms", recipient: "receiving_partner", preview: "Jennifer Martinez is interested in the fence job! Contact her at (214) 555-0142 within 2 hours to schedule.", delay: "Instant", status: "sent" },
      { id: "m8", channel: "sms", recipient: "homeowner", preview: "Great news! DFW Fence Pros will contact you shortly to schedule your fence repair. Questions? Reply HELP.", delay: "Instant", status: "sent" },
    ],
  },
  {
    id: "ev5", trigger: "Homeowner Declines Offer", triggerIcon: Circle, triggerColor: "#6B7280",
    messages: [
      { id: "m9", channel: "in_app", recipient: "admin", preview: "Jennifer Martinez declined the fence offer. Offer a second partner? [Accept] [Archive]", delay: "Instant", status: "template" },
    ],
  },
  {
    id: "ev6", trigger: "24h No Response from Partner", triggerIcon: Clock, triggerColor: "#EF4444",
    messages: [
      { id: "m10", channel: "in_app", recipient: "admin", preview: "DFW Fence Pros has not responded to the Frisco lead in 24 hours. Auto-reassigning to next available partner.", delay: "24h", status: "template" },
      { id: "m11", channel: "in_app", recipient: "receiving_partner", preview: "Your lead for Fence & Deck in Frisco has been reassigned due to no response.", delay: "24h", status: "template" },
    ],
  },
  {
    id: "ev7", trigger: "Job Closed", triggerIcon: CheckCircle, triggerColor: "#10B981",
    messages: [
      { id: "m12", channel: "in_app", recipient: "field_partner", preview: "Commission earned! $70 has been added to your ProLnk ledger. View your earnings.", delay: "Instant", status: "template" },
      { id: "m13", channel: "sms", recipient: "homeowner", preview: "Hope your fence repair went great! Leave DFW Fence Pros a review -- it helps other homeowners in your area. [link]", delay: "1h", status: "template" },
      { id: "m14", channel: "email", recipient: "admin", preview: "Commission record created: Field $70 + ProLnk $140 = $210 total. Payout queue updated.", delay: "Instant", status: "template" },
    ],
  },
  {
    id: "ev8", trigger: "Commission Paid", triggerIcon: DollarSign, triggerColor: "#059669",
    messages: [
      { id: "m15", channel: "in_app", recipient: "field_partner", preview: "Your commission of $70 has been paid! Check your bank account in 1-3 business days.", delay: "Instant", status: "template" },
      { id: "m16", channel: "email", recipient: "field_partner", subject: "ProLnk Commission Paid -- $70", preview: "Your referral commission for the Fence & Deck job at 4821 Willow Creek Dr has been processed.", delay: "Instant", status: "template" },
    ],
  },
];

const CHANNEL_CFG: Record<Channel, { label: string; color: string; bg: string; icon: typeof MessageSquare }> = {
  sms:     { label: "SMS",     color: "#10B981", bg: "bg-emerald-100", icon: Smartphone    },
  email:   { label: "Email",   color: "#3B82F6", bg: "bg-blue-100",    icon: Mail          },
  in_app:  { label: "In-App",  color: "#8B5CF6", bg: "bg-purple-100",  icon: Bell          },
  push:    { label: "Push",    color: "#F59E0B", bg: "bg-amber-100",   icon: Smartphone    },
};

const RECIPIENT_CFG: Record<Recipient, { label: string; color: string }> = {
  field_partner:     { label: "Field Partner",     color: "#00B5B8" },
  receiving_partner: { label: "Receiving Partner", color: "#F59E0B" },
  homeowner:         { label: "Homeowner",         color: "#3B82F6" },
  admin:             { label: "ProLnk Admin",     color: "#8B5CF6" },
};

const STATUS_CFG: Record<string, { label: string; color: string; bg: string }> = {
  sent:     { label: "Sent",     color: "#10B981", bg: "bg-emerald-100" },
  pending:  { label: "Pending",  color: "#F59E0B", bg: "bg-amber-100"  },
  template: { label: "Template", color: "#6B7280", bg: "bg-gray-100"   },
};

export default function CommSequence() {
  const [expanded, setExpanded] = useState<string | null>("ev1");
  const [activeReferral] = useState("Fence & Deck -- Jennifer Martinez, Frisco TX");

  const totalMessages = SEQUENCE.reduce((s, e) => s + e.messages.length, 0);
  const sentCount = SEQUENCE.flatMap(e => e.messages).filter(m => m.status === "sent").length;

  return (
    <AdminLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Communication Sequence</h1>
        <p className="text-sm text-gray-500 mt-0.5">Every message ProLnk sends -- you control the timing, content, and recipients</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border border-gray-200">
          <CardContent className="p-3">
            <div className="text-2xl font-heading font-bold text-gray-900">{SEQUENCE.length}</div>
            <div className="text-xs text-gray-500 mt-0.5">Trigger Events</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-3">
            <div className="text-2xl font-heading font-bold text-gray-900">{totalMessages}</div>
            <div className="text-xs text-gray-500 mt-0.5">Total Messages</div>
          </CardContent>
        </Card>
        <Card className="border border-emerald-200 bg-emerald-50">
          <CardContent className="p-3">
            <div className="text-2xl font-heading font-bold text-emerald-700">{sentCount}</div>
            <div className="text-xs text-emerald-600 mt-0.5">Sent (Demo)</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-3">
            <div className="text-2xl font-heading font-bold text-gray-900">4</div>
            <div className="text-xs text-gray-500 mt-0.5">Recipients</div>
          </CardContent>
        </Card>
      </div>

      {/* Active referral context */}
      <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5">
        <Eye className="w-4 h-4 text-teal-600 flex-shrink-0" />
        <span className="text-sm text-teal-800">Viewing sequence for: <strong>{activeReferral}</strong></span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(CHANNEL_CFG).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className={`w-5 h-5 rounded-md ${v.bg} flex items-center justify-center`}>
              <v.icon className="w-3 h-3" style={{ color: v.color }} />
            </span>
            {v.label}
          </div>
        ))}
        <div className="w-px h-4 bg-gray-200 self-center" />
        {Object.entries(RECIPIENT_CFG).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
            {v.label}
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 z-0" />

        <div className="space-y-4">
          {SEQUENCE.map((event, idx) => {
            const isExpanded = expanded === event.id;
            return (
              <div key={event.id} className="relative z-10">
                {/* Trigger row */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : event.id)}
                  className="flex items-center gap-3 w-full text-left group"
                >
                  <div className="w-10 h-10 rounded-full bg-white border-2 flex items-center justify-center flex-shrink-0 shadow-sm" style={{ borderColor: event.triggerColor }}>
                    <event.triggerIcon className="w-4 h-4" style={{ color: event.triggerColor }} />
                  </div>
                  <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center justify-between hover:shadow-sm transition-shadow">
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{event.trigger}</span>
                      <span className="text-xs text-gray-400 ml-2">{event.messages.length} message{event.messages.length !== 1 ? "s" : ""}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </div>
                </button>

                {/* Messages */}
                {isExpanded && (
                  <div className="ml-10 mt-2 space-y-2 pl-3 border-l-2 border-dashed" style={{ borderColor: event.triggerColor + "40" }}>
                    {event.messages.map(msg => {
                      const ch = CHANNEL_CFG[msg.channel];
                      const rec = RECIPIENT_CFG[msg.recipient];
                      const st = STATUS_CFG[msg.status];
                      return (
                        <Card key={msg.id} className="border border-gray-200">
                          <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                              <div className={`w-7 h-7 rounded-lg ${ch.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <ch.icon className="w-3.5 h-3.5" style={{ color: ch.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <span className="text-xs font-semibold" style={{ color: ch.color }}>{ch.label}</span>
                                  <ArrowRight className="w-3 h-3 text-gray-300" />
                                  <span className="text-xs font-semibold" style={{ color: rec.color }}>{rec.label}</span>
                                  {msg.aiGenerated && (
                                    <span className="flex items-center gap-1 text-[10px] font-semibold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-full">
                                      <Wand2 className="w-2.5 h-2.5" />AI-Generated
                                    </span>
                                  )}
                                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: st.bg, color: st.color }}>{st.label}</span>
                                </div>
                                {msg.subject && <p className="text-xs font-medium text-gray-700 mb-0.5">Subject: {msg.subject}</p>}
                                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{msg.preview}</p>
                                <div className="flex items-center gap-3 mt-1.5">
                                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />Delay: {msg.delay}</span>
                                  {msg.aiGenerated && (
                                    <button
                                      className="text-xs text-purple-600 hover:underline flex items-center gap-1"
                                      onClick={() => toast.success("AI message regenerated with fresh personalization")}
                                    >
                                      <Wand2 className="w-3 h-3" />Regenerate AI
                                    </button>
                                  )}
                                  <button className="text-xs text-teal-600 hover:underline flex items-center gap-1 ml-auto">
                                    <Edit2 className="w-3 h-3" />Edit Template
                                  </button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <Card className="border border-teal-200 bg-teal-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-2"><Send className="w-4 h-4" />ProLnk Controls Every Message</h3>
          <p className="text-sm text-teal-700">Partners and homeowners never communicate directly through ProLnk until after a job is booked. Every notification, offer, and update flows through this sequence -- giving you full control over brand, timing, and content.</p>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}
