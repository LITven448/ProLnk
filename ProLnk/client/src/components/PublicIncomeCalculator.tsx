import { useState, useMemo } from "react";
import { Users, DollarSign, TrendingUp, ChevronRight } from "lucide-react";

const PLATFORM_FEE_RATE = 0.10; // ProLnk takes 10% of job value

const NETWORK_OVERRIDE_RATES = [
  { level: "L1 — Direct Recruits",    rate: 0.07,   color: "#17C1E8", label: "7%" },
  { level: "L2 — Their Recruits",     rate: 0.04,   color: "#8B5CF6", label: "4%" },
  { level: "L3 — Next Level",         rate: 0.02,   color: "#F59E0B", label: "2%" },
  { level: "L4 — Final Level",        rate: 0.01,   color: "#22C55E", label: "1%" },
];

function fmt(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${Math.round(n).toLocaleString()}`;
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  accentColor = "#17C1E8",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
  accentColor?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "baseline" }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#94A3B8" }}>{label}</label>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF", fontVariantNumeric: "tabular-nums" }}>{display}</span>
      </div>
      <div style={{ position: "relative", height: 6 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: 3,
          background: "rgba(255,255,255,0.08)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0,
          width: `${pct}%`, borderRadius: 3,
          background: `linear-gradient(90deg, ${accentColor}80, ${accentColor})`,
          transition: "width 0.1s",
        }} />
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            opacity: 0, cursor: "pointer", margin: 0,
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: "#4A6FA5" }}>
        <span>{min === 1 ? "1" : min >= 1000 ? fmt(min) : `$${min}`}</span>
        <span>{max >= 1000 ? fmt(max) : max}</span>
      </div>
    </div>
  );
}

export default function PublicIncomeCalculator() {
  const [directRecruits, setDirectRecruits] = useState(5);
  const [avgJobValue, setAvgJobValue] = useState(1500);
  const [jobsPerMonth, setJobsPerMonth] = useState(4);

  const calc = useMemo(() => {
    const platformFeePerJob = avgJobValue * PLATFORM_FEE_RATE;
    const totalPlatformFeesPerRecruit = jobsPerMonth * platformFeePerJob;

    const l1Volume = directRecruits;
    const l2Volume = directRecruits * 3;
    const l3Volume = directRecruits * 9;
    const l4Volume = directRecruits * 27;

    const l1 = l1Volume * totalPlatformFeesPerRecruit * NETWORK_OVERRIDE_RATES[0].rate;
    const l2 = l2Volume * totalPlatformFeesPerRecruit * NETWORK_OVERRIDE_RATES[1].rate;
    const l3 = l3Volume * totalPlatformFeesPerRecruit * NETWORK_OVERRIDE_RATES[2].rate;
    const l4 = l4Volume * totalPlatformFeesPerRecruit * NETWORK_OVERRIDE_RATES[3].rate;

    const directCommission = jobsPerMonth * avgJobValue * 0.12;
    const networkTotal = l1 + l2 + l3 + l4;
    const grandTotal = directCommission + networkTotal;

    return { l1, l2, l3, l4, directCommission, networkTotal, grandTotal, l1Volume, l2Volume, l3Volume, l4Volume };
  }, [directRecruits, avgJobValue, jobsPerMonth]);

  const overrideLevels = [
    { ...NETWORK_OVERRIDE_RATES[0], amount: calc.l1, volume: calc.l1Volume },
    { ...NETWORK_OVERRIDE_RATES[1], amount: calc.l2, volume: calc.l2Volume },
    { ...NETWORK_OVERRIDE_RATES[2], amount: calc.l3, volume: calc.l3Volume },
    { ...NETWORK_OVERRIDE_RATES[3], amount: calc.l4, volume: calc.l4Volume },
  ];

  return (
    <div style={{
      background: "linear-gradient(160deg, #0a1628 0%, #0d1f3c 100%)",
      border: "1px solid #1E3A5F",
      borderRadius: 20,
      overflow: "hidden",
      maxWidth: 640,
    }}>
      <style>{`
        .pic-override-row:hover { background: rgba(255,255,255,0.04); }
      `}</style>

      {/* Header */}
      <div style={{
        padding: "24px 28px 20px",
        borderBottom: "1px solid #1E3A5F",
        background: "linear-gradient(90deg, #0a1628, #0f2040)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "rgba(23,193,232,0.15)", border: "1px solid rgba(23,193,232,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <TrendingUp style={{ width: 16, height: 16, color: "#17C1E8" }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#FFFFFF" }}>
              Network Income Calculator
            </h3>
            <p style={{ margin: 0, fontSize: 11, color: "#4A6FA5" }}>
              See your 4-level override income across your entire network
            </p>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div style={{ padding: "24px 28px" }}>
        <SliderRow
          label="Your Direct Recruits"
          value={directRecruits}
          min={1} max={20} step={1}
          display={`${directRecruits} partners`}
          onChange={setDirectRecruits}
          accentColor="#17C1E8"
        />
        <SliderRow
          label="Avg Job Value in Their Trade"
          value={avgJobValue}
          min={500} max={10000} step={250}
          display={`$${avgJobValue.toLocaleString()}`}
          onChange={setAvgJobValue}
          accentColor="#8B5CF6"
        />
        <SliderRow
          label="Jobs / Month per Partner"
          value={jobsPerMonth}
          min={1} max={10} step={1}
          display={`${jobsPerMonth} jobs`}
          onChange={setJobsPerMonth}
          accentColor="#F59E0B"
        />

        {/* Network volume note */}
        <div style={{
          fontSize: 11, color: "#4A6FA5", marginTop: -8, marginBottom: 20,
          padding: "8px 12px", borderRadius: 8,
          background: "rgba(255,255,255,0.03)", border: "1px solid #1E3A5F",
        }}>
          Assumes each recruit brings in ~3 partners of their own, compounding across 4 levels.
        </div>

        {/* Override breakdown */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#4A6FA5", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
            Network Override Breakdown
          </div>
          <div style={{ background: "#0a1628", borderRadius: 12, overflow: "hidden", border: "1px solid #1E3A5F" }}>
            {/* Direct commission */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "11px 16px", borderBottom: "1px solid #1E3A5F",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#D4AF37", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#FFFFFF" }}>Your Direct Commission</div>
                  <div style={{ fontSize: 10, color: "#4A6FA5" }}>{jobsPerMonth} jobs × ${avgJobValue.toLocaleString()} × 12%</div>
                </div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#D4AF37", fontVariantNumeric: "tabular-nums" }}>
                {fmt(calc.directCommission)}/mo
              </span>
            </div>

            {overrideLevels.map(({ level, rate, color, label, amount, volume }) => {
              const pf = avgJobValue * PLATFORM_FEE_RATE;
              return (
                <div
                  key={level}
                  className="pic-override-row"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "11px 16px", borderBottom: "1px solid #1E3A5F",
                    transition: "background 0.15s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#FFFFFF" }}>{level}</div>
                      <div style={{ fontSize: 10, color: "#4A6FA5" }}>
                        {volume} partners × {jobsPerMonth} jobs × ${Math.round(pf)} fee × {label}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color, fontVariantNumeric: "tabular-nums", flexShrink: 0, marginLeft: 12 }}>
                    {fmt(amount)}/mo
                  </span>
                </div>
              );
            })}

            {/* Network subtotal */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "11px 16px", background: "rgba(255,255,255,0.03)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Users style={{ width: 14, height: 14, color: "#17C1E8" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#94A3B8" }}>Network Override Subtotal</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#17C1E8", fontVariantNumeric: "tabular-nums" }}>
                {fmt(calc.networkTotal)}/mo
              </span>
            </div>
          </div>
        </div>

        {/* Grand total banner */}
        <div style={{
          borderRadius: 14, padding: "20px 22px",
          background: "linear-gradient(135deg, #0d2040 0%, #112040 100%)",
          border: "1px solid rgba(212,175,55,0.25)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#4A6FA5", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
              Total Monthly Income
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: "#F5D060", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                {fmt(calc.grandTotal)}
              </span>
              <span style={{ fontSize: 13, color: "#4A6FA5", fontWeight: 500 }}>/mo</span>
            </div>
            <div style={{ fontSize: 11, color: "#4A6FA5", marginTop: 4 }}>
              {fmt(calc.grandTotal * 12)}/year · {fmt(calc.directCommission)}/mo direct + {fmt(calc.networkTotal)}/mo network
            </div>
          </div>
          <div style={{ flexShrink: 0 }}>
            <DollarSign style={{ width: 40, height: 40, color: "rgba(212,175,55,0.25)" }} />
          </div>
        </div>

        {/* CTA */}
        <a href="/apply" style={{ display: "block", marginTop: 16, textDecoration: "none" }}>
          <button style={{
            width: "100%", padding: "13px 20px", borderRadius: 12,
            background: "linear-gradient(135deg, #D4AF37, #F5D060)",
            color: "#1a1000", border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 800, letterSpacing: "0.02em",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            Secure Your Founding Network Slot
            <ChevronRight style={{ width: 15, height: 15 }} />
          </button>
        </a>
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "#4A6FA5" }}>
          Waitlist closes at 2,125 founding partner slots. Estimates based on 10% platform fee and 12% L1 commission rate.
        </div>
      </div>
    </div>
  );
}
