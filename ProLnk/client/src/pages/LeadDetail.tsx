import React from 'react';
import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin, Clock, DollarSign, ShieldCheck, CheckCircle,
  ChevronLeft, Thermometer, Droplets, Zap, Home, HardHat,
  CalendarCheck, AlertCircle, User, ArrowRight, Star,
} from "lucide-react";
import { toast } from "sonner";

type TradeCategory = "HVAC" | "Plumbing" | "Electrical" | "Roofing" | "General";
type Urgency = "routine" | "soon" | "urgent";

interface Lead {
  id: string;
  displayName: string;
  city: string;
  zip: string;
  trade: TradeCategory;
  serviceNeeded: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  urgency: Urgency;
  submittedAt: string;
  matchedAt: string;
  responseWindow: string;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
  verifiedAddress: boolean;
  homeAge: number;
  sqft: number;
}

interface SimilarLead {
  id: string;
  city: string;
  trade: TradeCategory;
  serviceNeeded: string;
  budgetMax: number;
  urgency: Urgency;
  distance: number;
}

const MOCK_LEAD: Lead = {
  id: "lead-8821″,
  displayName: "Dallas Homeowner",
  city: "Dallas",
  zip: "75201″,
  trade: "HVAC",
  serviceNeeded: "AC Repair / Tune-Up",
  description: "Central AC stopped blowing cold air two days ago. Fan runs fine but warm air only. Unit is about 9 years old — never had service before. House is 2,200 sqft. Need someone out this week before temperatures peak.",
  budgetMin: 200,
  budgetMax: 600,
  urgency: "soon",
  submittedAt: "2026-05-13 at 9:41 AM",
  matchedAt: "2026-05-13 at 9:43 AM",
  responseWindow: "48 hours",
  verifiedEmail: true,
  verifiedPhone: true,
  verifiedAddress: true,
  homeAge: 12,
  sqft: 2200,
};

const SIMILAR_LEADS: SimilarLead[] = [
  { id: "lead-8819″, city: "Dallas", trade: "HVAC", serviceNeeded: "AC Installation", budgetMax: 4500, urgency: "routine", distance: 2.1 },
  { id: "lead-8815″, city: "Plano", trade: "HVAC", serviceNeeded: "HVAC Maintenance", budgetMax: 350, urgency: "routine", distance: 5.4 },
  { id: "lead-8802″, city: "Irving", trade: "HVAC", serviceNeeded: "AC Refrigerant Recharge", budgetMax: 400, urgency: "soon", distance: 8.9 },
];

const TRADE_ICONS: Record<TradeCategory, React.ElementType> = {
  HVAC: Thermometer,
  Plumbing: Droplets,
  Electrical: Zap,
  Roofing: Home,
  General: HardHat,
};

const URGENCY_CONFIG: Record<Urgency, { label: string; color: string; icon: React.ElementType }> = {
  routine: { label: "Routine", color: "bg-emerald-500/20 text-emerald-400″, icon: CalendarCheck },
  soon: { label: "Needs Service Soon", color: "bg-yellow-500/20 text-yellow-400″, icon: Clock },
  urgent: { label: "Urgent", color: "bg-red-500/20 text-red-400″, icon: AlertCircle },
};

export default function LeadDetail() {
  const [, setLocation] = useLocation();
  const [decision, setDecision] = useState<"accepted" | "passed" | null>(null);

  const lead = MOCK_LEAD;
  const TradeIcon = TRADE_ICONS[lead.trade];
  const urgencyConf = URGENCY_CONFIG[lead.urgency];
  const UrgencyIcon = urgencyConf.icon;

  function handleAccept() {
    setDecision("accepted");
    toast.success("Lead accepted! Homeowner contact info unlocked.");
  }

  function handlePass() {
    setDecision("passed");
    toast("Lead passed. It will be offered to the next matched pro.");
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-6″>

        <div className="flex items-center gap-3″>
          <button
            onClick={() => setLocation("/leads")}
            className="flex items-center gap-1 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <ChevronLeft className="h-4 w-4″ />
            Back to Leads
          </button>
          <span className="text-slate-600″>·</span>
          <span className="text-xs text-slate-500 font-mono">{lead.id}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4″>
          <div>
            <div className="flex items-center gap-2 mb-1″>
              <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                <TradeIcon className="h-4 w-4 text-teal-400″ />
              </div>
              <h1 className="text-xl font-bold text-white">{lead.serviceNeeded}</h1>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin className="h-3.5 w-3.5″ />
              <span>{lead.city}, TX {lead.zip}</span>
            </div>
          </div>
          <div className="flex items-center gap-2″>
            <Badge className={`border-0 ${urgencyConf.color}`}>
              <UrgencyIcon className="h-3 w-3 mr-1″ />
              {urgencyConf.label}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
          <Card className="bg-slate-800/60 border-slate-700″>
            <CardContent className="pt-5″>
              <div className="flex items-center gap-1.5 mb-1″>
                <DollarSign className="h-4 w-4 text-teal-400″ />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Budget Range</span>
              </div>
              <div className="text-2xl font-bold text-white">${lead.budgetMin}–${lead.budgetMax}</div>
              <p className="text-xs text-slate-500 mt-0.5″>Homeowner estimate</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700″>
            <CardContent className="pt-5″>
              <div className="flex items-center gap-1.5 mb-1″>
                <Home className="h-4 w-4 text-teal-400″ />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Property</span>
              </div>
              <div className="text-2xl font-bold text-white">{lead.sqft.toLocaleString()} sqft</div>
              <p className="text-xs text-slate-500 mt-0.5″>{lead.homeAge}-year-old home</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700″>
            <CardContent className="pt-5″>
              <div className="flex items-center gap-1.5 mb-1″>
                <Clock className="h-4 w-4 text-teal-400″ />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Response Window</span>
              </div>
              <div className="text-2xl font-bold text-white">{lead.responseWindow}</div>
              <p className="text-xs text-slate-500 mt-0.5″>To accept this lead</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/60 border-slate-700″>
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2″>
              <User className="h-4 w-4 text-slate-400″ />
              Lead Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4″>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1.5″>Homeowner</p>
              <div className="flex items-center gap-2″>
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-slate-400″ />
                </div>
                <span className="text-white font-medium">{lead.displayName}</span>
                <span className="text-slate-500 text-sm">· Contact unlocked after accept</span>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1.5″>Description</p>
              <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/50 rounded-lg p-3″>{lead.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700″>
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2″>
              <CalendarCheck className="h-4 w-4 text-slate-400″ />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3″>
              <div className="flex items-start gap-3″>
                <div className="w-2 h-2 bg-teal-400 rounded-full mt-1.5 flex-shrink-0″ />
                <div>
                  <p className="text-sm text-white">Lead Submitted</p>
                  <p className="text-xs text-slate-500″>{lead.submittedAt}</p>
                </div>
              </div>
              <div className="flex items-start gap-3″>
                <div className="w-2 h-2 bg-teal-400 rounded-full mt-1.5 flex-shrink-0″ />
                <div>
                  <p className="text-sm text-white">Matched to You</p>
                  <p className="text-xs text-slate-500″>{lead.matchedAt}</p>
                </div>
              </div>
              <div className="flex items-start gap-3″>
                <div className="w-2 h-2 bg-slate-600 rounded-full mt-1.5 flex-shrink-0″ />
                <div>
                  <p className="text-sm text-slate-400″>Expected Response</p>
                  <p className="text-xs text-slate-500″>Within {lead.responseWindow} of match</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700″>
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2″>
              <ShieldCheck className="h-4 w-4 text-slate-400″ />
              Trust Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3″>
              <div className={`flex items-center gap-2 p-3 rounded-lg ${lead.verifiedEmail ? "bg-emerald-500/10" : "bg-slate-900/50"}`}>
                <CheckCircle className={`h-4 w-4 ${lead.verifiedEmail ? "text-emerald-400" : "text-slate-600"}`} />
                <div>
                  <p className={`text-sm font-medium ${lead.verifiedEmail ? "text-emerald-400" : "text-slate-500"}`}>Email Verified</p>
                  <p className="text-xs text-slate-500″>{lead.verifiedEmail ? "Confirmed" : "Unverified"}</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 p-3 rounded-lg ${lead.verifiedPhone ? "bg-emerald-500/10" : "bg-slate-900/50"}`}>
                <CheckCircle className={`h-4 w-4 ${lead.verifiedPhone ? "text-emerald-400" : "text-slate-600"}`} />
                <div>
                  <p className={`text-sm font-medium ${lead.verifiedPhone ? "text-emerald-400" : "text-slate-500"}`}>Phone Verified</p>
                  <p className="text-xs text-slate-500″>{lead.verifiedPhone ? "Confirmed" : "Unverified"}</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 p-3 rounded-lg ${lead.verifiedAddress ? "bg-emerald-500/10" : "bg-slate-900/50"}`}>
                <CheckCircle className={`h-4 w-4 ${lead.verifiedAddress ? "text-emerald-400" : "text-slate-600"}`} />
                <div>
                  <p className={`text-sm font-medium ${lead.verifiedAddress ? "text-emerald-400" : "text-slate-500"}`}>Address Verified</p>
                  <p className="text-xs text-slate-500″>{lead.verifiedAddress ? "Confirmed" : "Unverified"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {decision === null ? (
          <div className="grid grid-cols-2 gap-4″>
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-500 text-white h-14 text-base font-semibold"
              onClick={handleAccept}
            >
              <CheckCircle className="h-5 w-5 mr-2″ />
              Accept Lead
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 h-14 text-base"
              onClick={handlePass}
            >
              Pass
            </Button>
          </div>
        ) : (
          <Card className={`border ${decision === "accepted" ? "bg-teal-500/10 border-teal-700/50" : "bg-slate-800/40 border-slate-700"}`}>
            <CardContent className="pt-5 pb-5 text-center">
              {decision === "accepted" ? (
                <>
                  <CheckCircle className="h-8 w-8 text-teal-400 mx-auto mb-2″ />
                  <p className="text-white font-semibold">Lead Accepted</p>
                  <p className="text-slate-400 text-sm mt-1″>Homeowner contact info is now visible in your Job Log</p>
                  <Button className="mt-4 bg-teal-600 hover:bg-teal-500 text-white" onClick={() => setLocation("/job-log")}>
                    Go to Job Log
                    <ArrowRight className="h-4 w-4 ml-1″ />
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-slate-400 font-medium">Lead Passed</p>
                  <p className="text-slate-500 text-sm mt-1″>This lead has been returned to the pool</p>
                  <Button variant="outline" className="mt-4 border-slate-700 text-slate-300″ onClick={() => setLocation("/leads")}>
                    Browse More Leads
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}

        <div>
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2″>
            <Star className="h-4 w-4 text-teal-400″ />
            Similar Leads Near You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4″>
            {SIMILAR_LEADS.map((similar) => {
              const SimilarIcon = TRADE_ICONS[similar.trade];
              const simUrgency = URGENCY_CONFIG[similar.urgency];
              return (
                <Card key={similar.id} className="bg-slate-800/40 border-slate-700 hover:border-slate-500 transition-colors cursor-pointer">
                  <CardContent className="pt-4 pb-4″>
                    <div className="flex items-center gap-1.5 mb-2″>
                      <SimilarIcon className="h-3.5 w-3.5 text-teal-400″ />
                      <span className="text-xs text-slate-400″>{similar.trade}</span>
                    </div>
                    <p className="text-white text-sm font-medium mb-2″>{similar.serviceNeeded}</p>
                    <div className="space-y-1″>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400″>
                        <MapPin className="h-3 w-3″ />
                        {similar.city} · {similar.distance} mi away
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400″>
                        <DollarSign className="h-3 w-3″ />
                        Up to ${similar.budgetMax}
                      </div>
                    </div>
                    <div className="mt-3″>
                      <Badge className={`text-xs border-0 ${simUrgency.color}`}>{simUrgency.label}</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
