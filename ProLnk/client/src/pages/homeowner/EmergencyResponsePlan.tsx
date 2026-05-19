import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle, CheckCircle, Phone, Zap, Shield,
  ChevronDown, ChevronUp, Star, Clock, Users,
} from "lucide-react";

interface Contact {
  id: string;
  label: string;
  company: string;
  phone: string;
  account: string;
}

interface GuideItem {
  id: string;
  icon: string;
  title: string;
  steps: string[];
}

interface EmergencyPro {
  trade: string;
  company: string;
  responseTime: string;
  rating: number;
  reviews: number;
  phone: string;
}

const CHECKLIST = [
  { label: "Know your water shutoff location", done: true },
  { label: "HVAC emergency contact saved", done: true },
  { label: "Pipe insulation installed", done: true },
  { label: "Emergency fund $1,000+", done: false },
  { label: "Storm supply kit stocked", done: false },
];

const INITIAL_CONTACTS: Contact[] = [
  { id: "gas", label: "Gas Company", company: "Atmos Energy", phone: "1-888-286-6700", account: "AC-7741923" },
  { id: "water", label: "Water Utility", company: "City of Frisco", phone: "(972) 292-5550", account: "FW-002847" },
  { id: "electric", label: "Electric", company: "Oncor", phone: "1-888-313-4747", account: "OE-5593812" },
  { id: "insurance", label: "Insurance Agent", company: "State Farm — Mark Liu", phone: "(972) 540-3300", account: "HO-48291" },
];

const GUIDES: GuideItem[] = [
  {
    id: "burst",
    icon: "🚿",
    title: "Burst Pipe",
    steps: [
      "Immediately turn off your main water shutoff valve — usually near the water meter or where the main line enters your home.",
      "Turn on all faucets to drain remaining water from the pipes and relieve pressure.",
      "Turn off your water heater and boiler to prevent damage from operating without water.",
      "Document the damage with photos before any cleanup or repairs begin.",
      "Call a licensed emergency plumber and your insurance agent within the hour.",
    ],
  },
  {
    id: "gas",
    icon: "⚠️",
    title: "Gas Leak",
    steps: [
      "Do not flip any light switches, use your phone, or create any spark inside the home.",
      "Leave all doors open as you exit — do not stop to grab belongings.",
      "Evacuate everyone in the building immediately, including pets.",
      "Once outside and away from the building, call 911 and then your gas utility emergency line.",
      "Do not re-enter until the gas company and fire department give the all-clear.",
    ],
  },
  {
    id: "power",
    icon: "⚡",
    title: "Power Outage",
    steps: [
      "Check your breaker panel first — a tripped breaker is the most common cause.",
      "Report the outage to your utility provider via their outage map or emergency line.",
      "Unplug sensitive electronics to protect them from a power surge when service restores.",
      "Keep refrigerator and freezer doors closed — food stays safe for 4 hours (fridge) and 48 hours (full freezer).",
      "If outage lasts more than 4 hours in extreme heat or cold, relocate to a friend, family, or a warming/cooling center.",
    ],
  },
  {
    id: "storm",
    icon: "🌩️",
    title: "Storm Damage",
    steps: [
      "Stay inside until the storm passes and conditions are safe — check local emergency alerts.",
      "Once safe, do a perimeter walk and document all visible damage with timestamped photos.",
      "If there is roof or structural damage, cover exposed areas with a tarp to prevent further water intrusion.",
      "Call your insurance agent within 24 hours to open a claim — document the claim number.",
      "Hire only licensed, insured contractors — be wary of storm chasers who appear after severe weather.",
    ],
  },
];

const EMERGENCY_PROS: EmergencyPro[] = [
  { trade: "HVAC Emergency", company: "AirPro 24/7", responseTime: "< 1 hr", rating: 4.9, reviews: 312, phone: "(972) 555-0191" },
  { trade: "Plumbing Emergency", company: "FlowFix Emergency", responseTime: "< 45 min", rating: 4.8, reviews: 228, phone: "(972) 555-0244" },
  { trade: "Electrical Emergency", company: "Volt Response", responseTime: "< 90 min", rating: 4.7, reviews: 189, phone: "(972) 555-0317" },
];

const score = 72;
const doneCount = CHECKLIST.filter(c => c.done).length;

export default function EmergencyResponsePlan() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  function updateContact(id: string, field: keyof Contact, value: string) {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="max-w-2xl mx-auto space-y-6 p-4 pb-12">

          <div className="pt-2">
            <h1 className="text-2xl font-bold text-white">Emergency Response Plan</h1>
            <p className="text-slate-400 mt-1 text-sm">Be ready before disaster strikes</p>
          </div>

          {/* Readiness Score */}
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Your Readiness Score</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-teal-400">{score}</span>
                    <span className="text-slate-400 text-sm mb-1">/100</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{doneCount} of {CHECKLIST.length} items complete</p>
                </div>
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#1e293b" strokeWidth="8" />
                    <circle
                      cx="40" cy="40" r="32" fill="none"
                      stroke="#14b8a6" strokeWidth="8"
                      strokeDasharray={`${(score / 100) * 201} 201`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <Shield className="absolute inset-0 m-auto w-7 h-7 text-teal-400" />
                </div>
              </div>
              <div className="space-y-2 border-t border-slate-700 pt-3">
                {CHECKLIST.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 text-sm">
                    {item.done
                      ? <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                      : <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    }
                    <span className={item.done ? "text-slate-300" : "text-slate-400"}>{item.label}</span>
                    {!item.done && (
                      <span className="ml-auto text-xs text-red-400 font-medium">Missing</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <div>
            <h2 className="text-base font-semibold text-white mb-3">Emergency Contacts</h2>
            <div className="space-y-3">
              {contacts.map(contact => (
                <Card key={contact.id} className="bg-slate-800/60 border-slate-700">
                  <CardContent className="pt-4 pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-slate-400">{contact.label}</p>
                        <p className="text-sm font-semibold text-white">{contact.company}</p>
                      </div>
                      <button
                        onClick={() => setEditingId(editingId === contact.id ? null : contact.id)}
                        className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        {editingId === contact.id ? "Done" : "Edit"}
                      </button>
                    </div>
                    {editingId === contact.id ? (
                      <div className="space-y-2 mt-2">
                        <input
                          className="w-full bg-slate-700 border border-slate-600 rounded px-2.5 py-1.5 text-sm text-white"
                          value={contact.phone}
                          onChange={e => updateContact(contact.id, "phone", e.target.value)}
                          placeholder="Phone number"
                        />
                        <input
                          className="w-full bg-slate-700 border border-slate-600 rounded px-2.5 py-1.5 text-sm text-white"
                          value={contact.account}
                          onChange={e => updateContact(contact.id, "account", e.target.value)}
                          placeholder="Account number"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between mt-1">
                        <div>
                          <p className="text-sm text-white font-mono">{contact.phone}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Acct: {contact.account}</p>
                        </div>
                        <a href={`tel:${contact.phone.replace(/\D/g, "")}`}>
                          <Button size="sm" className="bg-teal-600 hover:bg-teal-500 text-white text-xs h-8 px-3 gap-1.5">
                            <Phone className="w-3 h-3" />
                            Call Now
                          </Button>
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* What to do when... */}
          <div>
            <h2 className="text-base font-semibold text-white mb-3">What to do when...</h2>
            <div className="space-y-2">
              {GUIDES.map(guide => (
                <Card key={guide.id} className="bg-slate-800/60 border-slate-700 overflow-hidden">
                  <button
                    onClick={() => setExpanded(expanded === guide.id ? null : guide.id)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{guide.icon}</span>
                      <span className="text-sm font-semibold text-white">{guide.title}</span>
                    </div>
                    {expanded === guide.id
                      ? <ChevronUp className="w-4 h-4 text-slate-400" />
                      : <ChevronDown className="w-4 h-4 text-slate-400" />
                    }
                  </button>
                  {expanded === guide.id && (
                    <div className="px-4 pb-4 border-t border-slate-700">
                      <ol className="space-y-2.5 mt-3">
                        {guide.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-300">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Emergency Pros */}
          <div>
            <h2 className="text-base font-semibold text-white mb-1">Emergency Pros Near You</h2>
            <p className="text-xs text-slate-400 mb-3">Verified 24/7 responders in 75034</p>
            <div className="space-y-3">
              {EMERGENCY_PROS.map(pro => (
                <Card key={pro.trade} className="bg-slate-800/60 border-slate-700">
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-400">{pro.trade}</p>
                        <p className="text-sm font-semibold text-white">{pro.company}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs text-yellow-400">
                            <Star className="w-3 h-3 fill-yellow-400" />{pro.rating}
                          </span>
                          <span className="text-xs text-slate-500">{pro.reviews} reviews</span>
                          <span className="flex items-center gap-1 text-xs text-teal-400">
                            <Clock className="w-3 h-3" />{pro.responseTime}
                          </span>
                        </div>
                      </div>
                      <a href={`tel:${pro.phone.replace(/\D/g, "")}`}>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-500 text-white text-xs h-8 px-3 gap-1.5 shrink-0">
                          <Phone className="w-3 h-3" />
                          Call Now
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Prepare Now CTA */}
          <Card className="bg-gradient-to-r from-teal-900/60 to-slate-800/60 border-teal-700/50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-600/30 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-teal-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Complete your emergency plan</p>
                  <p className="text-xs text-slate-400 mt-0.5">Earn the Prepared Homeowner badge by completing all 5 checklist items.</p>
                  <Button className="mt-3 bg-teal-600 hover:bg-teal-500 text-white text-xs h-8 px-4">
                    Finish My Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </HomeownerLayout>
  );
}
