import { useState } from 'react';

const outletTypes = ["Standard", "GFCI Outlet", "Half-Hot (Switch-Controlled)", "USB Combo Outlet"];
const locations = ["Bathroom", "Kitchen", "Garage", "Outdoor", "Living Room", "Bedroom", "Basement"];

const fixes: Record<string, Record<string, string>> = {
  "Standard": {
    "Bathroom": "Check the GFCI outlet in the bathroom (or shared GFCI in hall bath). Press TEST then RESET button.",
    "Kitchen": "Kitchens have GFCI outlets near sink. Check all GFCI outlets — one tripped GFCI can kill multiple outlets.",
    "Garage": "Garage has dedicated GFCI. Check garage GFCI outlet first, then check panel breaker.",
    "Outdoor": "All outdoor outlets are GFCI-protected. Find the GFCI (often in garage) and reset it.",
    "Living Room": "Check breaker first. If tripped, reset. If not, outlet may have loose wiring from DFW foundation settling.",
    "Bedroom": "Check breaker. Half-hot outlets controlled by wall switch are common in bedrooms.",
    "Basement": "DFW homes rarely have basements, but check GFCI and panel. Moisture can trip GFCI in below-grade areas.",
  },
  "GFCI Outlet": {
    "Bathroom": "Press RESET firmly. If won't reset, GFCI has failed or fault is present. Replace or call electrician.",
    "Kitchen": "Dry any moisture near outlet. Press RESET. GFCI outlets in kitchens protect entire counter circuit.",
    "Garage": "Check for moisture or faulty appliance. Unplug everything, reset GFCI, then plug in one device at a time.",
    "Outdoor": "DFW heat degrades outdoor GFCI outlets. If 5+ years old and won't reset, replace the outlet.",
    "Living Room": "GFCI in living room is unusual — may be on same circuit as kitchen/bath GFCI. Trace the circuit.",
    "Bedroom": "GFCI in bedroom? Likely installed by previous owner near a water source. Check for moisture.",
    "Basement": "Moisture-triggered trip. Dry area completely before resetting.",
  },
  "Half-Hot (Switch-Controlled)": {
    "Bathroom": "Uncommon in bathrooms. Check wall switch nearby — one outlet half is switch-controlled.",
    "Kitchen": "Check all wall switches in kitchen. One may control the bottom half of a duplex outlet.",
    "Garage": "Common in garages — top outlet always hot, bottom controlled by switch.",
    "Outdoor": "Check indoor wall switch near the door. Outdoor outlets often switch-controlled in DFW homes.",
    "Living Room": "Very common in DFW living rooms — bottom outlet controlled by switch for lamp circuits. Check all switches.",
    "Bedroom": "Standard in bedrooms. The wall switch by the door likely controls the bottom outlet half.",
    "Basement": "Check all light switches — one controls outlet.",
  },
  "USB Combo Outlet": {
    "Bathroom": "USB ports require reset if GFCI trips. Replace outlet if USB ports stop charging but outlet works.",
    "Kitchen": "USB outlets near kitchen can fail from moisture vapor. Check GFCI first, then replace if needed.",
    "Garage": "USB outlets in garages exposed to heat — DFW summers can degrade electronics. Replace if failed.",
    "Outdoor": "Outdoor USB outlets must be rated for outdoor use (in-use cover). Check rating and GFCI.",
    "Living Room": "USB ports may fail while outlet still works. This is normal wear — replace the outlet (~$25).",
    "Bedroom": "If USB charges but outlet doesn't work, check breaker. If outlet works but USB doesn't, replace outlet.",
    "Basement": "USB outlets in moist areas fail faster. Check GFCI upstream and replace outlet if USB failed.",
  },
};

export default function DFWOutletNotWorkingGuide2026() {
  const [outletType, setOutletType] = useState("");
  const [location, setLocation] = useState("");
  const result = outletType && location ? fixes[outletType]?.[location] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 14, marginBottom: 8 }}>⚡ DFW ELECTRICAL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Outlet Not Working?</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>Most dead outlets in DFW homes are GFCI trips or switch-controlled outlets. Start here before calling an electrician.</p>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", marginBottom: 16, fontSize: 18 }}>🔍 Find the Fix</h2>
          <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "#94a3b8" }}>Outlet Type</label>
          <select value={outletType} onChange={e => setOutletType(e.target.value)} style={{ width: "100%", background: "#1e3a5f", color: "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 15 }}>
            <option value="">Select outlet type...</option>
            {outletTypes.map(o => <option key={o}>{o}</option>)}
          </select>
          <label style={{ display: "block", marginBottom: 8, fontSize: 14, color: "#94a3b8" }}>Location in Home</label>
          <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: "100%", background: "#1e3a5f", color: "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 14px", fontSize: 15 }}>
            <option value="">Select location...</option>
            {locations.map(l => <option key={l}>{l}</option>)}
          </select>
          {result && (
            <div style={{ marginTop: 20, background: "#0a2a0a", border: "1px solid #22c55e", borderRadius: 10, padding: 18 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>✅ Fix Guide</div>
              <div style={{ color: "#e2e8f0", lineHeight: 1.6 }}>{result}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", marginBottom: 16, fontSize: 18 }}>📋 Step-by-Step: GFCI Reset</h2>
          {["1. Find all GFCI outlets in the area (bathroom, kitchen, garage).","2. Press the TEST button first, then press RESET firmly.","3. Check if the dead outlet is now working.","4. If GFCI won't reset, unplug all devices on that circuit first.","5. Still won't reset? The GFCI or a connected device has failed."].map(s => (
            <div key={s} style={{ padding: "8px 0", borderBottom: "1px solid #1e3a5f", color: "#94a3b8", fontSize: 14 }}>{s}</div>
          ))}
        </div>

        <div style={{ background: "#7f1d1d", border: "1px solid #ef4444", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#fca5a5", marginBottom: 12, fontSize: 16 }}>🚨 Call a TDLR-Licensed Electrician If:</h2>
          {["Outlet sparks when plugging in","Outlet feels warm or hot to touch","Burning smell from outlet","Multiple outlets dead with no GFCI found","Breaker trips every time you reset"].map(s => (
            <div key={s} style={{ color: "#fca5a5", fontSize: 14, padding: "4px 0" }}>• {s}</div>
          ))}
        </div>

        <div style={{ background: "#F5E642", color: "#0A1628", borderRadius: 8, padding: 14, fontWeight: 700, textAlign: "center" as const }}>
          🏅 Get TDLR-Licensed DFW Electricians via ProLnk
        </div>
      </div>
    </div>
  );
}
