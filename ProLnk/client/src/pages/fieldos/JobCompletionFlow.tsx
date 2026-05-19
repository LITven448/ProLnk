import React from 'react';
import { useState } from "react";
import { FOS } from "./fosTokens";
import {
  CheckSquare,
  Square,
  Wind,
  Droplets,
  Zap,
  Wrench,
  Plus,
  Image,
  DollarSign,
  CheckCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const TRADE_ICONS: Record<string, React.ReactNode> = {
  HVAC:       <Wind size={18} color={FOS.teal} />,
  Plumbing:   <Droplets size={18} color={FOS.teal} />,
  Electrical: <Zap size={18} color={FOS.teal} />,
  default:    <Wrench size={18} color={FOS.teal} />,
};

const JOB = {
  id: 4821,
  trade: "HVAC",
  address: "2847 Maple Ridge Dr, Austin TX 78745″,
  homeowner: "Sarah",
  service: "HVAC Tune-Up",
  gross: 1100,
  ratePercent: 28.4,
};

const CHECKLIST = [
  { id: "cleanup",    label: "Work area cleaned up" },
  { id: "walkthrough",label: "Customer walkthrough done" },
  { id: "photos",     label: "Final photos uploaded (3 of 3 required)" },
  { id: "signature",  label: "Customer signature obtained" },
  { id: "summary",    label: "Send completion summary to homeowner" },
];

const SUMMARY_TEMPLATE =
  `Hi ${JOB.homeowner}, your HVAC tune-up is complete! Here's what was done: [work summary]. Your system is running at peak efficiency. Thank you for choosing us.`;

export default function JobCompletionFlow() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    cleanup:     true,
    walkthrough: true,
    photos:      true,
    signature:   true,
    summary:     false,
  });
  const [summaryText, setSummaryText] = useState(SUMMARY_TEMPLATE);
  const [completed, setCompleted] = useState(false);
  const [upsellResponse, setUpsellResponse] = useState<"yes" | "no" | null>(null);

  const allChecked = CHECKLIST.every((c) => checked[c.id]);
  const commission = Math.round(JOB.gross * (JOB.ratePercent / 100));

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  if (completed) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4″
        style={{ background: FOS.bg, color: FOS.white }}
      >
        <div className="max-w-sm w-full flex flex-col items-center gap-6 text-center">
          {/* Animated check */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "rgba(16,185,129,0.15)", border: `2px solid ${FOS.green}` }}
          >
            <CheckCircle size={48} color={FOS.green} />
          </div>
          <div>
            <p className="text-2xl font-black">Job Complete!</p>
            <p className="text-sm mt-1″ style={{ color: FOS.muted }}>Job #{JOB.id} · {JOB.service}</p>
          </div>
          <div
            className="w-full rounded-2xl p-5″
            style={{ background: FOS.limeDim, border: "1px solid rgba(232,255,71,0.20)" }}
          >
            <p className="text-xs uppercase tracking-widest font-semibold mb-2″ style={{ color: FOS.faint }}>
              Commission on the way 🎉
            </p>
            <p className="text-4xl font-black" style={{ color: FOS.lime }}>${commission}</p>
            <p className="text-xs mt-1″ style={{ color: FOS.faint }}>
              Arrives via Stripe in 2–3 business days
            </p>
          </div>

          {/* Upsell prompt */}
          {upsellResponse === null ? (
            <div
              className="w-full rounded-2xl p-4 text-left"
              style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
            >
              <div className="flex items-start gap-3 mb-4″>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0″
                  style={{ background: FOS.tealDim }}
                >
                  <Sparkles size={18} color={FOS.teal} />
                </div>
                <div>
                  <p className="text-sm font-bold">AI found 2 more opportunities</p>
                  <p className="text-xs mt-0.5″ style={{ color: FOS.muted }}>
                    Detected at this home. Share with a colleague?
                  </p>
                </div>
              </div>
              <div className="flex gap-3″>
                <button
                  onClick={() => setUpsellResponse("yes")}
                  className="flex-1 py-3 rounded-xl text-sm font-bold"
                  style={{ background: FOS.teal, color: FOS.white }}
                >
                  Yes, share
                </button>
                <button
                  onClick={() => setUpsellResponse("no")}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: FOS.card, border: `1px solid ${FOS.border}`, color: FOS.muted }}
                >
                  No thanks
                </button>
              </div>
            </div>
          ) : (
            <div
              className="w-full rounded-2xl p-4 text-center"
              style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
            >
              {upsellResponse === "yes" ? (
                <p className="text-sm font-semibold" style={{ color: FOS.teal }}>
                  Opportunities sent to your network.
                </p>
              ) : (
                <p className="text-sm" style={{ color: FOS.muted }}>
                  Got it — dismissed.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

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
          <span className="font-bold text-base">Complete Job #{JOB.id}</span>
        </div>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: FOS.tealDim, color: FOS.teal }}
        >
          {JOB.service}
        </span>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 max-w-sm mx-auto w-full pb-28″>

        {/* Address */}
        <p className="text-xs px-1″ style={{ color: FOS.muted }}>{JOB.address}</p>

        {/* Checklist */}
        <div
          className="rounded-2xl p-4 flex flex-col gap-1″
          style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3″ style={{ color: FOS.muted }}>
            Completion Checklist
          </p>
          {CHECKLIST.map((item) => (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className="flex items-center gap-3 w-full py-3 px-1 rounded-xl text-left"
              style={{
                background: checked[item.id] ? "rgba(13,148,136,0.06)" : "transparent",
                transition: "background 0.15s",
              }}
            >
              {checked[item.id]
                ? <CheckSquare size={20} color={FOS.teal} />
                : <Square size={20} color={FOS.faint} />
              }
              <span
                className="text-sm font-medium"
                style={{ color: checked[item.id] ? FOS.white : FOS.muted }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Photo upload mini-grid */}
        <div
          className="rounded-2xl p-4″
          style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3″ style={{ color: FOS.muted }}>
            Job Photos (3 required)
          </p>
          <div className="grid grid-cols-3 gap-2″>
            {/* Slot 1 — filled */}
            <div
              className="aspect-square rounded-xl overflow-hidden relative"
              style={{ background: "linear-gradient(135deg, #0D9488 0%, #0f766e 100%)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image size={20} color="rgba(255,255,255,0.6)" />
              </div>
            </div>
            {/* Slot 2 — filled */}
            <div
              className="aspect-square rounded-xl overflow-hidden relative"
              style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0D1525 100%)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image size={20} color="rgba(255,255,255,0.6)" />
              </div>
            </div>
            {/* Slot 3 — empty */}
            <div
              className="aspect-square rounded-xl flex items-center justify-center"
              style={{ background: FOS.card, border: `2px dashed ${FOS.border}` }}
            >
              <Plus size={22} color={FOS.faint} />
            </div>
          </div>
        </div>

        {/* Summary to homeowner */}
        <div
          className="rounded-2xl p-4 flex flex-col gap-3″
          style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: FOS.muted }}>
            Summary to Homeowner
          </p>
          <textarea
            value={summaryText}
            onChange={(e) => setSummaryText(e.target.value)}
            rows={5}
            className="w-full rounded-xl p-3 text-sm resize-none outline-none leading-relaxed"
            style={{
              background: FOS.card,
              border: `1px solid ${FOS.border}`,
              color: FOS.white,
              caretColor: FOS.teal,
            }}
          />
        </div>

        {/* Commission preview */}
        <div
          className="rounded-2xl p-5″
          style={{ background: FOS.limeDim, border: "1px solid rgba(232,255,71,0.20)" }}
        >
          <p className="text-xs uppercase tracking-widest font-semibold mb-1″ style={{ color: FOS.faint }}>
            Your Commission
          </p>
          <p className="text-4xl font-black mb-2″ style={{ color: FOS.lime }}>
            ${commission}
          </p>
          <div className="flex items-center gap-2 text-xs" style={{ color: FOS.faint }}>
            <DollarSign size={12} />
            <span>
              Gross ${JOB.gross.toLocaleString()} × {JOB.ratePercent}% = ${commission}
            </span>
          </div>
          <p className="text-xs mt-2″ style={{ color: FOS.faint }}>
            Arrives via Stripe in 2–3 business days
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => setCompleted(true)}
          disabled={!allChecked}
          className="w-full py-5 rounded-2xl text-base font-black tracking-wide flex items-center justify-center gap-2 transition-all"
          style={{
            background: allChecked ? FOS.teal : FOS.ghost,
            color: allChecked ? FOS.white : FOS.faint,
            boxShadow: allChecked ? `0 0 28px ${FOS.tealGlow}` : "none",
            cursor: allChecked ? "pointer" : "not-allowed",
          }}
        >
          Complete Job
          <ChevronRight size={18} />
        </button>
        {!allChecked && (
          <p className="text-center text-xs" style={{ color: FOS.faint }}>
            Complete all checklist items to proceed
          </p>
        )}
      </div>
    </div>
  );
}
