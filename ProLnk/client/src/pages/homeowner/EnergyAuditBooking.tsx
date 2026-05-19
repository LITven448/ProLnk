import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Link } from "wouter";
import {
  Zap, ThermometerSun, Wind, FileText, DollarSign, Star, CheckCircle,
  Calendar, Clock, ChevronRight, AlertTriangle, Leaf,
} from "lucide-react";

type AuditorId = 1 | 2 | 3;

const AUDITORS: { id: AuditorId; name: string; rating: number; reviews: number; price: number; badge: string; color: string }[] = [
  { id: 1, name: "Energy Pro DFW",       rating: 4.9, reviews: 214, price: 249, badge: "Top Rated",     color: "teal" },
  { id: 2, name: "EnergyWise Texas",     rating: 4.8, reviews: 178, price: 279, badge: "BPI Certified", color: "purple" },
  { id: 3, name: "Green Home Audits",    rating: 4.7, reviews: 96,  price: 199, badge: "Best Value",    color: "green" },
];

const AVAILABLE_DATES = [
  "Mon, May 19″,
  "Tue, May 20″,
  "Wed, May 21″,
  "Fri, May 23″,
  "Sat, May 24″,
];

const TIME_SLOTS = ["8:00 AM – 10:00 AM", "11:00 AM – 1:00 PM", "2:00 PM – 4:00 PM"];

const BADGE_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  teal:   { text: "text-teal-400″,   bg: "bg-teal-500/10",   border: "border-teal-500/30" },
  purple: { text: "text-purple-400″, bg: "bg-purple-500/10", border: "border-purple-500/30" },
  green:  { text: "text-green-400″,  bg: "bg-green-500/10",  border: "border-green-500/30" },
};

export default function EnergyAuditBooking() {
  const [selectedAuditor, setSelectedAuditor] = useState<AuditorId | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const auditor = AUDITORS.find(a => a.id === selectedAuditor);

  const handleConfirm = () => {
    if (selectedAuditor && selectedDate && selectedSlot) setConfirmed(true);
  };

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white p-6 space-y-8″>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1″>
            <Leaf size={22} className="text-teal-400″ />
            <h1 className="text-2xl font-bold text-white">Energy Audit</h1>
          </div>
          <p className="text-slate-400″>Find every dollar of wasted energy</p>
        </div>

        {/* What's Included */}
        <div>
          <h2 className="text-base font-semibold text-white mb-3″>What's Included</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3″>
            {[
              { icon: Wind,          label: "Insulation Assessment",  desc: "Attic, walls, crawlspace graded" },
              { icon: ThermometerSun,label: "HVAC Efficiency Test",   desc: "Blower door & duct leakage" },
              { icon: Zap,           label: "Air Sealing Inspection", desc: "Doors, windows, penetrations" },
              { icon: FileText,      label: "Utility Bill Analysis",  desc: "12-month spend vs. benchmarks" },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-[#0D1F3C] border border-white/5 rounded-xl p-4″>
                  <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-3″>
                    <Icon size={18} className="text-teal-400″ />
                  </div>
                  <div className="font-medium text-white text-sm">{item.label}</div>
                  <div className="text-xs text-slate-500 mt-1″>{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Savings Potential */}
        <div className="bg-gradient-to-r from-teal-600/20 to-green-600/20 border border-teal-500/30 rounded-xl p-5″>
          <div className="flex items-start gap-4″>
            <DollarSign size={28} className="text-teal-400 shrink-0 mt-0.5″ />
            <div>
              <p className="text-white font-semibold text-base">
                DFW homes save avg <span className="text-teal-400″>$450–$840/year</span> after an energy audit
              </p>
              <p className="text-slate-400 text-sm mt-1″>ROI in under 8 months — most improvements pay for themselves within the first heating or cooling season</p>
            </div>
          </div>
        </div>

        {/* Audit Cost + Rebate */}
        <div className="bg-[#0D1F3C] border border-amber-500/20 rounded-xl p-5″>
          <div className="flex items-center gap-2 mb-3″>
            <AlertTriangle size={16} className="text-amber-400″ />
            <h2 className="text-base font-semibold text-white">Cost & Rebate</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$200–$400</div>
              <div className="text-slate-500 mt-1″>Professional audit cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400″>–$200</div>
              <div className="text-slate-500 mt-1″>Frisco utility rebate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-400″>$0–$200</div>
              <div className="text-slate-500 mt-1″>Your net cost</div>
            </div>
          </div>
        </div>

        {/* Pro Selection */}
        <div>
          <h2 className="text-base font-semibold text-white mb-3″>Choose an Auditor</h2>
          <div className="space-y-3″>
            {AUDITORS.map(a => {
              const clr = BADGE_COLORS[a.color];
              const isSelected = selectedAuditor === a.id;
              return (
                <div
                  key={a.id}
                  onClick={() => setSelectedAuditor(a.id)}
                  className={`bg-[#0D1F3C] border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                    isSelected ? "border-teal-500/50 ring-1 ring-teal-500/30″ : "border-white/5 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0″>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shrink-0 ${clr.bg} ${clr.text}`}>
                      {a.name[0]}
                    </div>
                    <div className="min-w-0″>
                      <div className="flex items-center gap-2″>
                        <span className="font-semibold text-white">{a.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${clr.text} ${clr.bg} ${clr.border}`}>{a.badge}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5″>
                        <Star size={12} className="fill-amber-400 text-amber-400″ />
                        <span className="text-amber-400 text-sm font-semibold">{a.rating}</span>
                        <span className="text-slate-500 text-xs">({a.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0″>
                    <div className="text-xl font-bold text-teal-400″>${a.price}</div>
                    <div className="text-xs text-slate-500″>full audit</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Form */}
        {selectedAuditor && !confirmed && (
          <div className="bg-[#0D1F3C] border border-teal-500/20 rounded-xl p-5 space-y-5″>
            <h2 className="text-base font-semibold text-white flex items-center gap-2″>
              <Calendar size={16} className="text-teal-400″ />
              Schedule with {auditor?.name}
            </h2>

            {/* Date Picker */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2″>Available Dates</div>
              <div className="flex flex-wrap gap-2″>
                {AVAILABLE_DATES.map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                      selectedDate === d
                        ? "bg-teal-500/20 text-teal-400 border-teal-500/40″
                        : "bg-white/5 text-slate-300 border-white/10 hover:border-white/25″
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-2″>Available Times</div>
                <div className="flex flex-wrap gap-2″>
                  {TIME_SLOTS.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSlot(s)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                        selectedSlot === s
                          ? "bg-teal-500/20 text-teal-400 border-teal-500/40″
                          : "bg-white/5 text-slate-300 border-white/10 hover:border-white/25″
                      }`}
                    >
                      <Clock size={13} />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Confirmation */}
            {selectedSlot && (
              <div className="bg-white/5 rounded-lg p-3 text-sm space-y-1″>
                <div className="text-slate-400″>Confirmation will be sent to:</div>
                <div className="text-white font-medium">sarah.johnson@email.com · (469) 555-0198</div>
              </div>
            )}

            <button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedSlot}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                selectedDate && selectedSlot
                  ? "bg-teal-600 hover:bg-teal-500 text-white"
                  : "bg-white/5 text-slate-600 cursor-not-allowed"
              }`}
            >
              Confirm Booking
            </button>
          </div>
        )}

        {/* Booking Confirmed */}
        {confirmed && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center space-y-2″>
            <CheckCircle size={36} className="text-green-400 mx-auto" />
            <div className="text-xl font-bold text-white">Booking Confirmed!</div>
            <div className="text-slate-400 text-sm">
              {auditor?.name} · {selectedDate} · {selectedSlot}
            </div>
            <div className="text-green-400 text-sm">Confirmation email sent to your inbox</div>
          </div>
        )}

        {/* After the Audit */}
        <div>
          <h2 className="text-base font-semibold text-white mb-4″>After the Audit</h2>
          <div className="space-y-3″>
            {[
              { step: 1, title: "Get your report",                      desc: "Receive a detailed PDF with every finding, photo evidence, and ranked improvements by savings potential" },
              { step: 2, title: "Review findings with AI",              desc: "Our AI assistant walks you through the report, explains each issue in plain language, and answers your questions" },
              { step: 3, title: "Get quotes for improvements",         desc: "With one click, request quotes from vetted pros for the top improvements — we pre-fill all job details" },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-4 bg-[#0D1F3C] border border-white/5 rounded-xl p-4″>
                <div className="w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-sm shrink-0″>
                  {item.step}
                </div>
                <div>
                  <div className="font-medium text-white">{item.title}</div>
                  <div className="text-slate-400 text-sm mt-0.5″>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DIY Link */}
        <div className="border-t border-white/5 pt-5″>
          <Link href="/homeowner/energy-efficiency-guide">
            <a className="flex items-center gap-2 text-slate-400 hover:text-teal-400 text-sm transition-colors">
              <ChevronRight size={16} />
              I'll do it myself — view the DIY energy audit checklist
            </a>
          </Link>
        </div>

      </div>
    </HomeownerLayout>
  );
}
