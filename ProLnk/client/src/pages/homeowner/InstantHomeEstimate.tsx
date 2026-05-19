import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Home, TrendingUp, MapPin, ShieldCheck,
  Star, AlertTriangle, CheckCircle, BarChart2,
  Bell, Search, ChevronRight, Zap
} from "lucide-react";
import { toast } from "sonner";

const COMPS = [
  { address: "1219 Oak Creek Dr", sqft: 2480, value: 479000, ppsf: 193 },
  { address: "1247 Creekside Ln",  sqft: 2610, value: 501000, ppsf: 192 },
  { address: "1291 Meadow Ridge",  sqft: 2330, value: 461000, ppsf: 198 },
];

const VALUE_CHIPS = [
  { icon: Star,         label: "School District",    impact: "⭐ Top rated",    color: "#F59E0B" },
  { icon: AlertTriangle,label: "Storm History",      impact: "⚠️ Minor",        color: "#EF4444″ },
  { icon: CheckCircle,  label: "Recent Renovations", impact: "✅ 2022 kitchen", color: "#10B981″ },
  { icon: TrendingUp,   label: "Market Trend",       impact: "📈 +4.1% YoY",   color: "#6366F1″ },
];

export default function InstantHomeEstimate() {
  const [address, setAddress] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEstimate = () => {
    if (!address.trim() && address !== "") {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 800);
  };

  const handleTrack = () => {
    setTracking(true);
    toast.success("You're now tracking this home's value. We'll email you monthly updates.");
  };

  return (
    <HomeownerLayout>
      <div style={{ padding: "24px", maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Home size={22} color="#14B8A6″ />
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#F9FAFB", margin: 0 }}>
              Instant Home Estimate
            </h1>
          </div>
          <p style={{ color: "#9CA3AF", fontSize: 14, margin: 0 }}>
            Know your home's value today — powered by ATTOM property data.
          </p>
        </div>

        {/* Address Input */}
        <div style={{
          background: "#1F2937″, border: "1px solid #374151",
          borderRadius: 12, padding: "20px 24px", marginBottom: 24
        }}>
          <label style={{ color: "#9CA3AF", fontSize: 13, display: "block", marginBottom: 8 }}>
            Enter your home address
          </label>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <MapPin size={16} color="#6B7280″ style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <Input
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="e.g. 1234 Main St, Frisco, TX 75034″
                onKeyDown={e => e.key === "Enter" && handleEstimate()}
                style={{
                  paddingLeft: 36, background: "#111827″,
                  border: "1px solid #374151″, color: "#F9FAFB",
                  height: 44, fontSize: 14
                }}
              />
            </div>
            <Button
              onClick={handleEstimate}
              disabled={loading}
              style={{
                background: "#14B8A6″, color: "#fff",
                border: "none", fontWeight: 600, height: 44, padding: "0 20px",
                display: "flex", alignItems: "center", gap: 6
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{
                    width: 14, height: 14, border: "2px solid #ffffff44″,
                    borderTop: "2px solid #fff", borderRadius: "50%",
                    display: "inline-block", animation: "spin 0.8s linear infinite"
                  }} />
                  Analyzing...
                </span>
              ) : (
                <>
                  <Search size={15} />
                  Get Estimate
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Result Card */}
        {showResult && (
          <>
            <div style={{
              background: "#1F2937″, border: "1px solid #14B8A6",
              borderRadius: 12, padding: "24px", marginBottom: 20,
              boxShadow: "0 0 0 1px #14B8A630″
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <p style={{ color: "#9CA3AF", fontSize: 12, margin: "0 0 4px" }}>
                    <MapPin size={11} style={{ marginRight: 4 }} />
                    1234 Oak Creek Dr, Frisco TX 75034
                  </p>
                  <p style={{ color: "#14B8A6″, fontSize: 40, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-1px" }}>
                    $485,000
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{
                      background: "#134E4A", color: "#34D399″, border: "1px solid #059669",
                      borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 600
                    }}>
                      High confidence — 87%
                    </span>
                    <span style={{ color: "#6B7280″, fontSize: 12 }}>
                      Range: $461,000 – $509,000
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: "#6B7280″, fontSize: 11, margin: "0 0 2px" }}>Data source</p>
                  <p style={{ color: "#D1D5DB", fontSize: 13, fontWeight: 600, margin: "0 0 10px" }}>ATTOM Property Data</p>
                  {!tracking ? (
                    <Button
                      onClick={handleTrack}
                      style={{
                        background: "#1E3A5F", color: "#93C5FD",
                        border: "1px solid #3B82F6″, fontWeight: 600,
                        fontSize: 12, height: 32, padding: "0 12px",
                        display: "flex", alignItems: "center", gap: 5
                      }}
                    >
                      <Bell size={13} />
                      Track this value
                    </Button>
                  ) : (
                    <span style={{ color: "#10B981″, fontSize: 13, fontWeight: 600 }}>
                      ✓ Tracking active
                    </span>
                  )}
                </div>
              </div>

              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14, marginTop: 20, paddingTop: 20,
                borderTop: "1px solid #374151″
              }}>
                <div>
                  <p style={{ color: "#6B7280″, fontSize: 11, margin: "0 0 2px" }}>Last sale</p>
                  <p style={{ color: "#D1D5DB", fontSize: 14, fontWeight: 600, margin: 0 }}>May 2019 — $387,000</p>
                </div>
                <div>
                  <p style={{ color: "#6B7280″, fontSize: 11, margin: "0 0 2px" }}>Appreciation since purchase</p>
                  <p style={{ color: "#10B981″, fontSize: 14, fontWeight: 600, margin: 0 }}>+25.3%</p>
                </div>
                <div>
                  <p style={{ color: "#6B7280″, fontSize: 11, margin: "0 0 2px" }}>Estimated gain</p>
                  <p style={{ color: "#34D399″, fontSize: 14, fontWeight: 600, margin: 0 }}>+$98,000</p>
                </div>
              </div>
            </div>

            {/* Neighborhood Comps */}
            <div style={{
              background: "#1F2937″, border: "1px solid #374151",
              borderRadius: 12, padding: "20px 24px", marginBottom: 20
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <BarChart2 size={16} color="#6366F1″ />
                <span style={{ color: "#F9FAFB", fontWeight: 600, fontSize: 15 }}>Nearby Comparables</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {COMPS.map(comp => (
                  <div key={comp.address} style={{
                    background: "#111827″, border: "1px solid #374151",
                    borderRadius: 8, padding: "14px 16px"
                  }}>
                    <p style={{ color: "#9CA3AF", fontSize: 11, margin: "0 0 6px" }}>{comp.address}</p>
                    <p style={{ color: "#14B8A6″, fontSize: 20, fontWeight: 700, margin: "0 0 2px" }}>
                      ${comp.value.toLocaleString()}
                    </p>
                    <p style={{ color: "#6B7280″, fontSize: 11, margin: 0 }}>
                      {comp.sqft.toLocaleString()} sqft · ${comp.ppsf}/sqft
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Value Factors */}
            <div style={{
              background: "#1F2937″, border: "1px solid #374151",
              borderRadius: 12, padding: "20px 24px", marginBottom: 20
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Zap size={16} color="#F59E0B" />
                <span style={{ color: "#F9FAFB", fontWeight: 600, fontSize: 15 }}>What Affects Your Value</span>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {VALUE_CHIPS.map(chip => (
                  <div key={chip.label} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "#111827″, border: `1px solid ${chip.color}40`,
                    borderRadius: 8, padding: "8px 14px"
                  }}>
                    <chip.icon size={14} color={chip.color} />
                    <div>
                      <p style={{ color: "#D1D5DB", fontSize: 12, fontWeight: 600, margin: 0 }}>{chip.label}</p>
                      <p style={{ color: chip.color, fontSize: 11, margin: 0 }}>{chip.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Banner */}
            {!tracking && (
              <div style={{
                background: "#1E1B4B", border: "1px solid #4338CA",
                borderRadius: 10, padding: "14px 20px", marginBottom: 20,
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Bell size={16} color="#A5B4FC" />
                  <p style={{ color: "#C7D2FE", fontSize: 13, margin: 0 }}>
                    Get monthly updates when your estimate changes
                  </p>
                </div>
                <Button
                  onClick={handleTrack}
                  style={{
                    background: "#4338CA", color: "#fff",
                    border: "none", fontSize: 12, fontWeight: 600,
                    height: 32, padding: "0 14px",
                    display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap"
                  }}
                >
                  Track this value
                  <ChevronRight size={12} />
                </Button>
              </div>
            )}

            {/* Pro Valuation CTA */}
            <div style={{
              background: "#1F2937″, border: "1px solid #374151",
              borderRadius: 12, padding: "20px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ padding: 10, borderRadius: 8, background: "#111827″ }}>
                  <ShieldCheck size={20} color="#10B981″ />
                </div>
                <div>
                  <p style={{ color: "#F9FAFB", fontWeight: 700, fontSize: 14, margin: "0 0 3px" }}>
                    Get a Pro Valuation
                  </p>
                  <p style={{ color: "#6B7280″, fontSize: 12, margin: 0 }}>
                    For an accurate valuation, get a licensed appraiser.
                    AI estimates vary ±5–10%.
                  </p>
                </div>
              </div>
              <Button
                style={{
                  background: "#10B981″, color: "#fff",
                  border: "none", fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 6
                }}
              >
                <Search size={14} />
                Find a Pro
              </Button>
            </div>
          </>
        )}

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </HomeownerLayout>
  );
}
