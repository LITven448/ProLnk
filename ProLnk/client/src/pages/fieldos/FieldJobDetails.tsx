import React from 'react';
import { useState } from "react";
import { FOS } from "./fosTokens";
import {
  MapPin, Phone, MessageSquare, Camera, CheckCircle,
  ChevronRight, DollarSign, Clock, Wrench, Flame,
  Droplets, Wind, Zap, Navigation, Image,
} from "lucide-react";

const TRADE_ICONS: Record<string, React.ReactNode> = {
  HVAC:       <Wind size={18} color={FOS.teal} />,
  Plumbing:   <Droplets size={18} color={FOS.teal} />,
  Electrical: <Zap size={18} color={FOS.teal} />,
  default:    <Wrench size={18} color={FOS.teal} />,
};

const STEPS = [
  { label: "Accepted",  key: "accepted" },
  { label: "En Route",  key: "enroute" },
  { label: "On Site",   key: "onsite" },
  { label: "Completed", key: "completed" },
];

const JOB = {
  id: 4821,
  status: "In Progress",
  trade: "Plumbing",
  address: "2847 Maple Ridge Dr, Austin TX 78745″,
  homeowner: "Sarah M.",
  service: "Water Heater Replacement",
  priceRange: "$950 – $1,250″,
  notes: "Water heater is 14 years old, making loud popping noises. Located in garage on south wall. Prefer morning start.",
  currentStep: 2,
  eta: "12 min away",
  gross: 1100,
  ratePercent: 28.4,
};

export default function FieldJobDetails() {
  const [siteNotes, setSiteNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [photos] = useState<number[]>([1, 2, 3]);

  const estimated = Math.round(JOB.gross * (JOB.ratePercent / 100));
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(JOB.address)}`;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: FOS.bg, color: FOS.white, fontFamily: "'Geist Sans', system-ui, sans-serif" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-4 py-3″
        style={{ background: FOS.surface, borderBottom: `1px solid ${FOS.border}` }}
      >
        <div className="flex items-center gap-2″>
          {TRADE_ICONS[JOB.trade] ?? TRADE_ICONS.default}
          <span className="font-bold text-base">Job #{JOB.id}</span>
        </div>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: FOS.tealDim, color: FOS.teal }}
        >
          {JOB.status}
        </span>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 max-w-sm mx-auto w-full pb-24″>

        {/* Job Summary Card */}
        <div className="rounded-2xl p-4 flex flex-col gap-3″ style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
          <div className="flex items-start gap-2″>
            <MapPin size={15} color={FOS.teal} className="mt-0.5 shrink-0″ />
            <div>
              <p className="text-sm font-semibold">{JOB.address}</p>
              <p className="text-xs mt-0.5″ style={{ color: FOS.muted }}>{JOB.homeowner} · {JOB.service}</p>
            </div>
          </div>
          <div className="flex items-center gap-2″>
            <DollarSign size={14} color={FOS.lime} />
            <span className="text-sm font-bold" style={{ color: FOS.lime }}>{JOB.priceRange}</span>
          </div>
          <div
            className="rounded-xl p-3 text-xs leading-relaxed"
            style={{ background: FOS.card, color: FOS.muted }}
          >
            <span className="font-semibold text-white">Homeowner notes: </span>{JOB.notes}
          </div>
        </div>

        {/* Navigation */}
        <div className="rounded-2xl p-4 flex items-center justify-between" style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
          <div className="flex items-center gap-2″>
            <Clock size={15} color={FOS.amber} />
            <span className="text-sm font-semibold" style={{ color: FOS.amber }}>{JOB.eta}</span>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: FOS.teal, color: FOS.white }}
          >
            <Navigation size={15} />
            Get Directions
          </a>
        </div>

        {/* Progress Timeline */}
        <div className="rounded-2xl p-4″ style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4″ style={{ color: FOS.muted }}>Progress</p>
          <div className="relative flex items-start">
            {/* connector line */}
            <div
              className="absolute top-[14px] left-[14px] right-[14px] h-[2px]"
              style={{ background: FOS.border }}
            />
            <div
              className="absolute top-[14px] left-[14px] h-[2px] transition-all"
              style={{ background: FOS.teal, width: `${(JOB.currentStep / (STEPS.length - 1)) * (100 - (100 / STEPS.length))}%` }}
            />
            {STEPS.map((s, i) => {
              const done = i < JOB.currentStep;
              const active = i === JOB.currentStep;
              return (
                <div key={s.key} className="flex-1 flex flex-col items-center gap-1.5 relative z-10″>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: done || active ? FOS.teal : FOS.card,
                      border: `2px solid ${done || active ? FOS.teal : FOS.border}`,
                      boxShadow: active ? `0 0 12px ${FOS.tealGlow}` : "none",
                    }}
                  >
                    {done ? <CheckCircle size={14} color={FOS.white} /> : (
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: active ? FOS.white : FOS.faint }}
                      />
                    )}
                  </div>
                  <span
                    className="text-[10px] text-center leading-tight"
                    style={{ color: active ? FOS.teal : done ? FOS.white : FOS.faint, fontWeight: active ? 700 : 400 }}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Photo Upload */}
        <div className="rounded-2xl p-4″ style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3″ style={{ color: FOS.muted }}>Job Photos</p>
          <div className="grid grid-cols-3 gap-2 mb-3″>
            {photos.map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl flex items-center justify-center"
                style={{ background: FOS.card, border: `1px solid ${FOS.border}` }}
              >
                <Image size={20} color={FOS.faint} />
              </div>
            ))}
          </div>
          <button
            className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
            style={{ background: FOS.card, border: `1px dashed ${FOS.teal}`, color: FOS.teal }}
          >
            <Camera size={16} />
            Add Photo
          </button>
        </div>

        {/* Check-in Form */}
        <div className="rounded-2xl p-4 flex flex-col gap-3″ style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: FOS.muted }}>Site Check-In</p>
          <textarea
            value={siteNotes}
            onChange={e => setSiteNotes(e.target.value)}
            placeholder="Add site notes (access code, parking, issues found…)"
            rows={3}
            className="w-full rounded-xl p-3 text-sm resize-none outline-none"
            style={{
              background: FOS.card,
              border: `1px solid ${FOS.border}`,
              color: FOS.white,
              caretColor: FOS.teal,
            }}
          />
          {submitted ? (
            <div
              className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold"
              style={{ background: "rgba(16,185,129,0.15)", color: FOS.green }}
            >
              <CheckCircle size={18} />
              Job Completed!
            </div>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-4 rounded-2xl text-base font-black tracking-wide"
              style={{ background: FOS.teal, color: FOS.white, boxShadow: `0 0 24px ${FOS.tealGlow}` }}
            >
              Complete Job
            </button>
          )}
        </div>

        {/* Contact Homeowner */}
        <div className="rounded-2xl p-4″ style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3″ style={{ color: FOS.muted }}>Contact {JOB.homeowner}</p>
          <div className="flex gap-3″>
            <button
              className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ background: FOS.card, border: `1px solid ${FOS.border}`, color: FOS.white }}
            >
              <Phone size={16} color={FOS.teal} />
              Call
            </button>
            <button
              className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ background: FOS.card, border: `1px solid ${FOS.border}`, color: FOS.white }}
            >
              <MessageSquare size={16} color={FOS.teal} />
              Message
            </button>
          </div>
        </div>

        {/* Earnings Preview */}
        <div
          className="rounded-2xl p-4 flex items-center justify-between"
          style={{ background: FOS.limeDim, border: `1px solid rgba(232,255,71,0.20)` }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1″ style={{ color: FOS.faint }}>Estimated Earnings</p>
            <p className="text-2xl font-black" style={{ color: FOS.lime }}>${estimated}</p>
            <p className="text-xs mt-0.5″ style={{ color: FOS.faint }}>
              ${JOB.gross.toLocaleString()} gross × {JOB.ratePercent}%
            </p>
          </div>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: FOS.limeGlow }}
          >
            <DollarSign size={24} color={FOS.lime} />
          </div>
        </div>
      </div>
    </div>
  );
}
