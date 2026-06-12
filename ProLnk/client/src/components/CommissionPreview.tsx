import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Calculator, TrendingUp, Home, Users } from "lucide-react";

/**
 * CommissionPreview — shows how much a partner would earn from a given job
 * Used on the partner dashboard and in marketing materials
 */
export default function CommissionPreview({ partnerEmail }: { partnerEmail?: string }) {
  const [jobValue, setJobValue] = useState(5000);
  const [tradeType, setTradeType] = useState("HVAC");
  const [address, setAddress] = useState("");

  const platformFeeRates: Record<string, number> = {
    "Roofing": 0.12, "HVAC": 0.12, "Plumbing": 0.10, "Electrical": 0.10,
    "Landscaping": 0.08, "Painting": 0.08, "Flooring": 0.08, "Windows": 0.10,
    "Gutters": 0.08, "Concrete": 0.08, "Pest Control": 0.10, "Other": 0.10,
  };
  const feeRate = platformFeeRates[tradeType] || 0.10;
  const platformFee = jobValue * feeRate;

  // Simulate what a founding member earns
  const homeOriginationEarning = platformFee * 0.015;
  const l1NetworkEarning = platformFee * 0.07;
  const subscriptionEarning = 149 * 0.12; // L1 subscription override

  const preview = trpc.commissionCascade.previewJob.useQuery({
    jobValue,
    platformFeeRate: feeRate,
    completingProEmail: "demo@example.com",
    propertyAddress: address || "123 Demo St, Dallas TX",
  }, { enabled: false });

  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0A1628", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <Calculator style={{ width: 18, height: 18, color: "#F5E642" }} />
        Commission Calculator
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#6B7280", marginBottom: 6 }}>Job Value ($)</label>
          <input
            type="number" value={jobValue} onChange={e => setJobValue(Number(e.target.value))}
            style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 12px", fontSize: 15, boxSizing: "border-box" as const }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#6B7280", marginBottom: 6 }}>Trade Type</label>
          <select value={tradeType} onChange={e => setTradeType(e.target.value)}
            style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 12px", fontSize: 15, boxSizing: "border-box" as const }}>
            {Object.keys(platformFeeRates).map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div style={{ background: "#F9FAFB", borderRadius: 12, padding: 16, marginBottom: 20 }}>
        <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 12 }}>Platform fee: ${platformFee.toFixed(2)} ({(feeRate * 100).toFixed(0)}% of ${jobValue.toLocaleString()})</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "Home Origination (if you documented this property)", value: homeOriginationEarning, icon: Home, color: "#10B981" },
            { label: "L1 Network Job Commission (if completing pro is your recruit)", value: l1NetworkEarning, icon: Users, color: "#3B82F6" },
            { label: "Monthly Subscription Override (per active L1 recruit)", value: subscriptionEarning, icon: TrendingUp, color: "#F59E0B" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <item.icon style={{ width: 14, height: 14, color: item.color }} />
                <span style={{ fontSize: 13, color: "#374151" }}>{item.label}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: item.color }}>${item.value.toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 8, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#0A1628" }}>Max potential on this job</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#0A1628" }}>${(homeOriginationEarning + l1NetworkEarning).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center" }}>
        Based on Founding Network rates · Platform fee varies by trade · Completing pro keeps 100% of ${jobValue.toLocaleString()} job revenue
      </p>
    </div>
  );
}
