import { useState } from 'react';

const MOISTURE_CONCERNS = [
  "Too Much Humidity Inside",
  "Too Little Humidity Inside",
  "Water Pooling Near Unit",
  "Condensation on Vents",
  "Musty Smell from HVAC",
  "Mold on Vents or Coil",
];

interface MoistureInfo {
  map: string;
  approach: string;
  dfwSeason: string;
}

const MOISTURE_GUIDANCE: Record<string, MoistureInfo> = {
  "Too Much Humidity Inside": {
    map: "Evaporator coil in indoor air handler is primary dehumidification point. When properly sized and operating, the DFW system removes 15-25 pints/hour. If humidity stays above 55% RH, check coil operation first.",
    approach: "Verify thermostat fan is set to AUTO (not ON). Run system in cooling mode — latent cooling removes moisture. If still humid, check that unit is not oversized (a 2-stage or modulating system dehumidifies better). Add whole-home dehumidifier if system is oversized.",
    dfwSeason: "DFW spring (March-May): outdoor humidity 70-90% RH. System runs less but humidity intrudes — set fan to circulate less, use ERV/HRV, or add dehumidifier.",
  },
  "Too Little Humidity Inside": {
    map: "In DFW winter, the heating cycle adds zero moisture. Combustion furnaces actually consume indoor moisture. Humidifier (bypass or steam) connects to supply plenum and adds moisture during heating mode only.",
    approach: "Install bypass humidifier ($300-$700 installed) or steam humidifier ($700-$1,500) on supply plenum. Set target 35-45% RH for DFW winters. Fan-powered humidifiers are more effective in 2-zone systems.",
    dfwSeason: "DFW winter (Dec-Feb): outdoor RH drops to 20-40%. Homes without humidifiers typically hit 20-25% RH indoors — causes static electricity, wood floor gaps, respiratory irritation.",
  },
  "Water Pooling Near Unit": {
    map: "Condensate from evaporator coil drains to primary drain pan, then primary PVC drain line, then exterior or floor drain. Secondary drain pan sits under air handler (required by DFW code for attic installations). Float switch shuts off system when secondary fills.",
    approach: "If pooling at indoor unit: clear primary drain line with wet/dry vac or nitrogen flush. Check float switch in secondary pan. If pooling at outdoor unit: normal condensate from refrigerant lines — not concerning unless excessive.",
    dfwSeason: "DFW summer: indoor air handler can remove 20-30 pints/hour at peak load. A blocked drain fills in 2-4 hours. Inspect monthly June through September.",
  },
  "Condensation on Vents": {
    map: "Supply air exits registers at 55-58 degrees F in DFW cooling mode. If warm humid air contacts the cold metal register, condensation forms on the register surface — not inside the duct.",
    approach: "Improve register insulation by replacing metal registers with insulated diffusers. Seal any gaps between duct boot and drywall — warm attic air entering the gap accelerates condensation. Run exhaust fans in humid rooms.",
    dfwSeason: "DFW spring: most common time for register sweating — outdoor humidity is high, system is just starting to run, and attic has not fully warmed to summer temps yet.",
  },
  "Musty Smell from HVAC": {
    map: "Odor source is almost always the evaporator coil, drain pan, or duct interior. Evaporator coil stays wet during cooling — it is a prime surface for microbial growth. DFW humidity feeds mold faster than drier climates.",
    approach: "1) Clean evaporator coil with coil cleaner spray. 2) Flush drain pan and line with bleach solution or condensate tablets. 3) Run UV light in air handler — 24/7 UV kills mold on coil. 4) Test duct interior for mold if smell persists after coil cleaning.",
    dfwSeason: "DFW post-spring: after months of condensate buildup, musty smell peaks in June. Annual coil cleaning before summer prevents most cases.",
  },
  "Mold on Vents or Coil": {
    map: "Visible mold on supply registers indicates mold inside the duct or at the evaporator coil. The coil is always wet during cooling and is the most common mold surface. DFW attic humidity can also allow mold inside flex duct if boots are not properly sealed.",
    approach: "Do not run the system until mold is addressed. Call HVAC pro for coil inspection and cleaning. If ductwork shows visible mold, get an air quality test and consider duct cleaning or replacement. Install UV air purifier at coil to prevent recurrence.",
    dfwSeason: "DFW summer: high latent load means coil is always wet — ideal for mold. UV coil lights reduce mold by 99% on coil surface. Get annual inspection every March before cooling season.",
  },
};

const STATS = [
  ["Summer Goal", "Below 55% RH indoors — AC removes moisture"],
  ["Winter Goal", "35-45% RH indoors — humidifier adds moisture"],
  ["DFW Avg Summer RH", "65-75% outdoor — system works hard"],
  ["DFW Avg Winter RH", "25-40% outdoor — homes get dry fast"],
];

export default function DFWHVACMoistureMap() {
  const [concern, setConcern] = useState("");

  const result = concern ? MOISTURE_GUIDANCE[concern] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Moisture Management Map 💦</h1>
        <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 32 }}>
          Where your DFW HVAC adds or removes moisture — evaporator removes moisture in summer, humidifier adds in winter, condensate routes moisture away — mapped to your specific concern.
        </p>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>💧 Moisture Concern Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Your Moisture Concern</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", fontSize: 14 }}>
              <option value="">Select your concern...</option>
              {MOISTURE_CONCERNS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: "#0A1628", borderRadius: 8, padding: 20, borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🗺️ Moisture Map</div>
              <p style={{ color: "#e2e8f0", fontSize: 14, marginBottom: 14 }}>{result.map}</p>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔧 Management Approach</div>
              <p style={{ color: "#e2e8f0", fontSize: 14, marginBottom: 14 }}>{result.approach}</p>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>📅 DFW Season Context</div>
              <p style={{ color: "#e2e8f0", fontSize: 14 }}>{result.dfwSeason}</p>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {STATS.map(([label, desc]) => (
            <div key={label} style={{ background: "#0f2040", borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{label}</div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#475569", fontSize: 12 }}>
          ProLnk connects DFW homeowners with HVAC moisture and IAQ specialists. © 2026 ProLnk
        </div>
      </div>
    </div>
  );
}
