import { useState } from 'react';

const NOISE_TYPES = ["Banging / Clanking", "Squealing / Screeching", "Clicking / Chattering", "Humming / Buzzing", "Rattling / Vibrating", "Gurgling / Dripping"];
const SOURCE_LOCATIONS = ["Outdoor Condenser Unit", "Indoor Air Handler / Blower", "Ductwork / Vents", "Walls / Ceiling"];

interface NoiseInfo {
  diagnosis: string;
  fix: string;
  urgency: string;
}

const NOISE_GUIDANCE: Record<string, Record<string, NoiseInfo>> = {
  "Banging / Clanking": {
    "Outdoor Condenser Unit": { diagnosis: "Loose or broken compressor mount, fan blade hitting shroud, or loose motor bracket. In DFW, heat degrades rubber compressor mounts.", fix: "Turn off immediately — bent fan blade or broken mount can destroy compressor. Call HVAC pro.", urgency: "🔴 Urgent — shut down system" },
    "Indoor Air Handler / Blower": { diagnosis: "Broken blower wheel, loose blower housing, or object in blower compartment. Common in DFW if attic access panel was left open.", fix: "Turn off system. Inspect blower compartment. Replace damaged blower wheel ($200–$500).", urgency: "🔴 Urgent — risk of motor damage" },
    "Ductwork / Vents": { diagnosis: "Duct expansion from DFW temperature swings — metal expands in 150°F attic heat, contracts when AC runs.", fix: "Normal thermal expansion is minor. Loud banging = undersized duct or blocked return — have a pro evaluate.", urgency: "🟡 Monitor — annoying but usually not urgent" },
    "Walls / Ceiling": { diagnosis: "Disconnected duct boot banging against framing cavity, or refrigerant line knocking against framing.", fix: "Insulate refrigerant lines where they contact framing. Reconnect loose duct boots.", urgency: "🟡 Schedule inspection" },
  },
  "Squealing / Screeching": {
    "Outdoor Condenser Unit": { diagnosis: "Failing fan motor bearings or compressor internal friction. DFW units run 3,000+ hours/year — bearings wear faster.", fix: "Fan motor replacement: $150–$400. Compressor squeal = replace compressor or full system ($1,200–$5,000).", urgency: "🔴 Urgent — imminent failure" },
    "Indoor Air Handler / Blower": { diagnosis: "Worn blower motor belt (older systems) or blower motor bearings failing. DFW attic heat accelerates bearing wear.", fix: "Belt replacement: $50–$150. Motor replacement: $200–$600. Lubricate sealed bearings only if ports exist.", urgency: "🔴 Schedule within 48 hours" },
    "Ductwork / Vents": { diagnosis: "High-velocity air through undersized register or partially closed damper.", fix: "Open register fully or replace with larger register. Check balancing dampers in ductwork.", urgency: "🟢 Low urgency — comfort issue" },
    "Walls / Ceiling": { diagnosis: "Refrigerant pressure squeal through metering device — indicates refrigerant restriction or low charge.", fix: "Have refrigerant charge checked. Low charge is common in DFW after hard summer seasons.", urgency: "🟡 Schedule inspection" },
  },
  "Clicking / Chattering": {
    "Outdoor Condenser Unit": { diagnosis: "Contactor chattering (failing contactor or low voltage), relay clicking, or compressor start capacitor failing.", fix: "Contactor replacement: $75–$200. Capacitor: $50–$150. DFW contractors fail more often from heat cycling.", urgency: "🟡 Schedule within 1 week" },
    "Indoor Air Handler / Blower": { diagnosis: "Relay clicking on startup/shutdown is normal. Continuous clicking = failing control board or relay.", fix: "Control board replacement: $200–$700. Multiple clicks before startup = weak capacitor.", urgency: "🟡 Monitor — schedule if continuous" },
    "Ductwork / Vents": { diagnosis: "Thermal expansion clicks as metal duct heats and cools in DFW attic.", fix: "Normal DFW behavior. Add duct liner or fiberglass duct board to reduce thermal noise.", urgency: "🟢 Normal operation" },
    "Walls / Ceiling": { diagnosis: "Refrigerant line thermal expansion clicking through framing contact points.", fix: "Add foam insulation sleeve where refrigerant lines touch framing studs.", urgency: "🟢 Low urgency" },
  },
  "Humming / Buzzing": {
    "Outdoor Condenser Unit": { diagnosis: "Normal compressor hum. Loud buzz = failing contactor, loose electrical connection, or bad capacitor.", fix: "Loose wire: tighten/replace ($100–$200). Contactor buzz: replace ($75–$200). Never ignore electrical buzzing.", urgency: "🟡 Inspect within 48 hours — fire risk if electrical" },
    "Indoor Air Handler / Blower": { diagnosis: "Transformer hum is normal. Loud buzz = failing capacitor or loose blower motor mount.", fix: "Capacitor: $50–$150. Secure motor mount. Variable-speed motor hum at low speed is normal.", urgency: "🟡 Monitor for changes" },
    "Ductwork / Vents": { diagnosis: "Airflow turbulence or flex duct resonance at certain fan speeds.", fix: "Adjust fan speed on control board. Add turning vanes at sharp duct elbows in DFW attic runs.", urgency: "🟢 Comfort issue only" },
    "Walls / Ceiling": { diagnosis: "Air movement vibrating thin drywall near supply register.", fix: "Add register deflector to redirect airflow. Back-seal register box with foam tape.", urgency: "🟢 Low urgency" },
  },
  "Rattling / Vibrating": {
    "Outdoor Condenser Unit": { diagnosis: "Loose panel screws, debris in unit (DFW storms bring debris), or loose refrigerant line bracket.", fix: "Turn off unit and inspect. Remove debris. Tighten all panels. Replace missing screws.", urgency: "🟡 Inspect before next run" },
    "Indoor Air Handler / Blower": { diagnosis: "Loose access panel, failing blower wheel, or object in air stream.", fix: "Tighten access panel screws. Inspect blower compartment for debris. Balance blower wheel.", urgency: "🟡 Schedule inspection" },
    "Ductwork / Vents": { diagnosis: "Loose register cover, disconnected flex duct vibrating, or loose duct hanger in attic.", fix: "Tighten register screws. Rehang flex duct with proper support straps every 4 feet in DFW attic.", urgency: "🟢 Schedule — not urgent" },
    "Walls / Ceiling": { diagnosis: "Refrigerant line or condensate line vibrating in framing chase.", fix: "Add foam insulation sleeve or rubber isolator at contact points.", urgency: "🟢 Low urgency" },
  },
  "Gurgling / Dripping": {
    "Outdoor Condenser Unit": { diagnosis: "Normal condensate dripping from refrigerant line or mini-split drain. Gurgling refrigerant in liquid line is normal at shutdown.", fix: "No action needed if occasional. Constant gurgling outdoors = check refrigerant charge.", urgency: "🟢 Usually normal" },
    "Indoor Air Handler / Blower": { diagnosis: "Condensate drain gurgling = partially blocked drain line or improper drain slope. Dripping = overflow.", fix: "Flush drain line with water + condensate tablets. Check float switch. DFW summer: check weekly.", urgency: "🟡 Address within 24 hours — ceiling damage risk" },
    "Ductwork / Vents": { diagnosis: "Condensate sweating inside duct (duct too cold or attic humidity intrusion) or disconnected condensate line nearby.", fix: "Increase duct insulation R-value. Seal attic air intrusion at duct boots. Check nearby condensate lines.", urgency: "🟡 Inspect — mold risk" },
    "Walls / Ceiling": { diagnosis: "Condensate overflow reaching wall cavity — emergency situation. Turn off AC.", fix: "Turn off system immediately. Clear drain blockage. Check for water damage and mold.", urgency: "🔴 Emergency — turn off AC now" },
  },
};

export default function DFWHVACNoiseMap() {
  const [noiseType, setNoiseType] = useState("");
  const [sourceLocation, setSourceLocation] = useState("");

  const result = noiseType && sourceLocation ? NOISE_GUIDANCE[noiseType]?.[sourceLocation] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Noise Source Map 🔊</h1>
        <p style={{ color: "#94a3b8″, fontSize: 15, marginBottom: 32 }}>
          Which parts of your DFW HVAC make which noises — outdoor unit, indoor unit, and ductwork mapped with diagnosis, fix, and urgency rating.
        </p>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🎧 Noise Diagnosis Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>Noise Type</label>
            <select value={noiseType} onChange={e => setNoiseType(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", fontSize: 14 }}>
              <option value="">Select noise type...</option>
              {NOISE_TYPES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>Sound Source Location</label>
            <select value={sourceLocation} onChange={e => setSourceLocation(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", fontSize: 14 }}>
              <option value="">Select location...</option>
              {SOURCE_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 20, borderLeft: "4px solid #F5E642" }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{result.urgency}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔍 Diagnosis</div>
              <p style={{ color: "#e2e8f0″, fontSize: 14, marginBottom: 14 }}>{result.diagnosis}</p>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔧 Fix</div>
              <p style={{ color: "#e2e8f0″, fontSize: 14 }}>{result.fix}</p>
            </div>
          )}
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 10, padding: 20 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🌡️ Why DFW HVAC Is Noisier</div>
          <p style={{ color: "#94a3b8″, fontSize: 14, lineHeight: 1.6 }}>DFW HVAC systems run 10–14 hours/day in summer — more than nearly any US metro. This accelerates bearing wear, contactor pitting, capacitor failure, and thermal expansion noise. A noise that would wait weeks in a northern climate may indicate imminent failure in DFW&apos;s aggressive run cycle.</p>
        </div>

        <div style={{ marginTop: 32, textAlign: "center", color: "#475569″, fontSize: 12 }}>
          ProLnk connects DFW homeowners with HVAC diagnostic pros. © 2026 ProLnk
        </div>
      </div>
    </div>
  );
}