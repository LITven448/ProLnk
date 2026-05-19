import { useState } from 'react';

const noiseTypes = [
  { id: 'clicking', label: 'Clicking', emoji: '🔘' },
  { id: 'banging', label: 'Banging / Thumping', emoji: '💥' },
  { id: 'squealing', label: 'Squealing / Screeching', emoji: '🔊' },
  { id: 'rattling', label: 'Rattling / Vibrating', emoji: '📳' },
  { id: 'humming', label: 'Humming / Buzzing', emoji: '🔔' },
  { id: 'whooshing', label: 'Whooshing / Whistling', emoji: '💨' },
];

const whenOccurs = [
  { id: 'startup', label: 'Only at Startup' },
  { id: 'running', label: 'While Running' },
  { id: 'shutdown', label: 'At Shutdown' },
  { id: 'always', label: 'Constantly / All The Time' },
];

type NoiseEntry = { diagnosis: string; urgency: 'EMERGENCY' | 'URGENT' | 'SOON' | 'NORMAL'; fix: string; cost: string; dfwContext: string };
const diagnostics: Record<string, Record<string, NoiseEntry>> = {
  'clicking': {
    'startup': { diagnosis: 'Normal relay click when thermostat signals startup. Contactor engaging. This is expected.', urgency: 'NORMAL', fix: 'No action needed — this is normal contactor operation', cost: '$0', dfwContext: 'DFW AC clicks on 15–20 times per day in peak summer. Normal wear pattern.' },
    'running': { diagnosis: 'Continuous clicking while running = failing contactor or relay. Electrical component not engaging cleanly.', urgency: 'URGENT', fix: 'Replace contactor ($150–$350) — do not delay in DFW summer', cost: '$150–$350', dfwContext: 'Contactors fail frequently in DFW — heat and high cycle counts wear them in 5–7 years.' },
    'shutdown': { diagnosis: 'Click at shutdown is normal — contactor releasing. If persistent clicking after shutdown, could be refrigerant pressure equalization.', urgency: 'NORMAL', fix: 'Single click at shutdown = normal. Multiple clicks = HVAC inspection warranted', cost: '$0–$200', dfwContext: 'DFW systems shut down abruptly at setpoint — pressure equalization click is common.' },
    'always': { diagnosis: 'Constant clicking = definite electrical fault. Contactor chattering, loose wire, or control board issue.', urgency: 'URGENT', fix: 'HVAC technician inspection — likely contactor replacement or control board service', cost: '$150–$600', dfwContext: 'Do not ignore constant clicking in DFW summer — system may fail to cool completely.' },
  },
  'banging': {
    'startup': { diagnosis: 'Loose part in blower wheel or something in the duct that gets knocked at airflow startup. Could be refrigerant hammer.', urgency: 'URGENT', fix: 'Inspect blower wheel for debris or loose fins. Check duct at air handler for loose material.', cost: '$100–$400', dfwContext: 'DFW storms drive debris into outdoor units. Banging at startup often means something got inside.' },
    'running': { diagnosis: 'Blower wheel loose or cracked, bent fan blade on outdoor unit, or compressor valve failure — serious mechanical issue.', urgency: 'EMERGENCY', fix: 'Shut down system. Call HVAC immediately. Bent fan blade or loose blower can cause major damage.', cost: '$300–$1,200', dfwContext: 'DFW hail can damage outdoor fan blades. Inspect after severe weather.' },
    'shutdown': { diagnosis: 'Duct expansion/contraction as airflow stops — common in DFW with large temperature swings. Also called "oil canning."', urgency: 'NORMAL', fix: 'Usually normal. If loud, add duct insulation wrap or reduce static pressure with larger return', cost: '$0–$500', dfwContext: 'DFW ducts expand and contract dramatically — 140°F attic to 55°F supply air causes metal movement.' },
    'always': { diagnosis: 'Severe mechanical fault — compressor, blower wheel, or fan blade is critically damaged and banging continuously.', urgency: 'EMERGENCY', fix: 'Shut down immediately. Emergency HVAC call. Running a system with continuous banging destroys components.', cost: '$500–$3,000+', dfwContext: 'DFW compressors under peak load stress — continuous banging means failure is imminent.' },
  },
  'squealing': {
    'startup': { diagnosis: 'Belt-drive blower needs lubrication or replacement. Also: PSC motor bearing starting to fail — common in older DFW systems.', urgency: 'SOON', fix: 'Lubricate belt/bearing if accessible. Schedule bearing replacement for PSC motor ($200–$500).', cost: '$50–$500', dfwContext: 'DFW heat accelerates bearing wear. Squeal at startup = early warning, act before failure.' },
    'running': { diagnosis: 'Blower motor bearing failure in progress. Squeal while running = bearing seizing. Also check outdoor fan motor bearing.', urgency: 'URGENT', fix: 'Schedule bearing/motor replacement within days. Motor failure in DFW summer = no AC during 100°F heat.', cost: '$300–$700', dfwContext: 'Motor bearing failure in June/July DFW = emergency — replace before peak season if any squeal.' },
    'shutdown': { diagnosis: 'Motor winding down with bearing noise. Less urgent than running squeal but bearing is failing.', urgency: 'SOON', fix: 'Schedule motor bearing inspection and replacement within 2–4 weeks', cost: '$300–$700', dfwContext: 'DFW summer: a bearing that squeals only at shutdown today will squeal all day in 90 days.' },
    'always': { diagnosis: 'Motor bearing severely compromised — running on a damaged bearing continuously. Failure could happen at any time.', urgency: 'URGENT', fix: 'Priority repair. Schedule HVAC within 48 hours. Motor failure during DFW summer peak = 1–3 day wait for parts.', cost: '$400–$800', dfwContext: 'Parts shortages in DFW summer are real. A bearing that squeals constantly will fail soon — act before it does.' },
  },
  'rattling': {
    'startup': { diagnosis: 'Loose panel, screw, or debris vibrating at airflow startup. Often the simplest fix.', urgency: 'SOON', fix: 'Check all access panels and screws. Inspect indoor and outdoor unit for loose debris or components.', cost: '$0–$50', dfwContext: 'DFW wind and storms shake homes enough to loosen HVAC panel screws over time.' },
    'running': { diagnosis: 'Debris in blower or ductwork, loose duct connection, or failing capacitor vibrating inside cabinet.', urgency: 'SOON', fix: 'Inspect blower for debris. Check all duct connections at air handler. Listen for location of rattle.', cost: '$0–$350', dfwContext: 'DFW roaches and insects love to nest in HVAC — debris rattles are common in older equipment.' },
    'shutdown': { diagnosis: 'Duct vibration as air pressure drops — ductwork not properly supported. Also normal expansion clicks in thin-walled ducts.', urgency: 'NORMAL', fix: 'Add duct support straps. Seal any loose duct connections at air handler.', cost: '$50–$200', dfwContext: 'DFW attic temperatures make ductwork expand and contract significantly — strapping helps.' },
    'always': { diagnosis: 'Internal component loose — capacitor mount, fan blade balance weight, or loose refrigerant line vibrating against cabinet.', urgency: 'SOON', fix: 'HVAC tech to open cabinet and identify loose component. Check refrigerant line insulation and mounts.', cost: '$150–$400', dfwContext: 'Constant rattle = something has worked loose from vibration over years of operation.' },
  },
  'humming': {
    'startup': { diagnosis: 'Capacitor struggling to start compressor or fan motor. Hum at startup without compressor running = capacitor failure.', urgency: 'URGENT', fix: 'Replace capacitor immediately ($150–$300). System cannot cool without compressor starting reliably.', cost: '$150–$300', dfwContext: 'DFW capacitors fail in summer heat — most common HVAC failure in DFW. Replace every 7–10 years proactively.' },
    'running': { diagnosis: 'Low-level hum is normal. Loud hum while running = failing contactor or transformer. Also check for refrigerant line vibration.', urgency: 'SOON', fix: 'Have HVAC tech check contactor and transformer. Inspect refrigerant line vibration isolators.', cost: '$150–$400', dfwContext: 'DFW transformers handle high cycle counts — a buzzing transformer often precedes failure.' },
    'shutdown': { diagnosis: 'Refrigerant pressure equalization — hissing/humming as high-pressure side equalizes. Normal.', urgency: 'NORMAL', fix: 'No action needed. Normal refrigerant equalization noise after shutdown.', cost: '$0', dfwContext: 'The refrigerant hum/hiss at shutdown is more noticeable in DFW because systems shut off at higher pressures in the heat.' },
    'always': { diagnosis: 'Contactor buzzing or transformer failing. Constant electrical hum = component under stress or failing.', urgency: 'URGENT', fix: 'HVAC inspection within 48 hours. Contactor or control transformer replacement needed.', cost: '$150–$500', dfwContext: 'Constant buzzing in DFW summer = act now. Contactor failure stops cooling completely.' },
  },
  'whooshing': {
    'startup': { diagnosis: 'Normal airflow surge as system starts — ductwork filling with air. Pronounced in DFW where ducts are hot before startup.', urgency: 'NORMAL', fix: 'No action needed if brief. Persistent whoosh = return air restriction (dirty filter).', cost: '$0–$25', dfwContext: 'DFW attic ducts heat to 130°F — air pressure surge at startup sounds different than northern climates.' },
    'running': { diagnosis: 'Airflow restriction — dirty filter, blocked return, or undersized ductwork. High-velocity air through restriction creates whoosh.', urgency: 'SOON', fix: 'Replace filter immediately. Check all return grilles for blockage. Have static pressure tested.', cost: '$0–$400', dfwContext: 'DFW homes collect dust rapidly — filter replacement every 45 days in summer is not unusual.' },
    'shutdown': { diagnosis: 'Air pressure in ducts releasing — normal. If very loud, check for loose duct connection that flaps.', urgency: 'NORMAL', fix: 'If very loud, inspect duct connections at air handler for loose flex duct connections.', cost: '$0–$100', dfwContext: 'Flex duct connections in DFW attics loosen over time from heat expansion — check annually.' },
    'always': { diagnosis: 'Chronic high static pressure — ductwork is undersized for the system, or return air is severely restricted.', urgency: 'SOON', fix: 'HVAC tech to measure static pressure. Add return air duct or replace undersized ductwork sections.', cost: '$300–$1,500', dfwContext: 'DFW builder-grade ductwork is often undersized. High static pressure destroys blower motors prematurely.' },
  },
};

const urgencyStyle: Record<string, { bg: string; color: string; label: string }> = {
  'EMERGENCY': { bg: '#EF4444', color: '#fff', label: '🚨 EMERGENCY — Shut Down Now' },
  'URGENT': { bg: '#F97316', color: '#fff', label: '⚡ URGENT — Act Within 48 Hours' },
  'SOON': { bg: '#F5E642', color: '#0A1628', label: '📅 SOON — Schedule This Week' },
  'NORMAL': { bg: '#22C55E', color: '#fff', label: '✅ NORMAL — No Action Needed' },
};

export default function DFWHVACNoiseTypes() {
  const [noise, setNoise] = useState('');
  const [when, setWhen] = useState('');
  const result = noise && when ? diagnostics[noise]?.[when] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔊</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Noise Guide</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Diagnose every DFW AC noise — what it means, how urgent, and what to do</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔊 What Type of Noise?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {noiseTypes.map(n => (
              <button key={n.id} onClick={() => setNoise(n.id)}
                style={{ background: noise === n.id ? '#F5E642′ : '#1A3060', color: noise === n.id ? '#0A1628' : '#E2E8F0', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: noise === n.id ? 700 : 400, textAlign: 'left' }}>
                {n.emoji} {n.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⏱️ When Does It Occur?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {whenOccurs.map(w => (
              <button key={w.id} onClick={() => setWhen(w.id)}
                style={{ background: when === w.id ? '#F5E642′ : '#1A3060', color: when === w.id ? '#0A1628' : '#E2E8F0', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: when === w.id ? 700 : 400 }}>
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div>
            <div style={{ background: urgencyStyle[result.urgency].bg, borderRadius: 12, padding: 16, marginBottom: 16, textAlign: 'center' }}>
              <span style={{ color: urgencyStyle[result.urgency].color, fontWeight: 700, fontSize: 18 }}>{urgencyStyle[result.urgency].label}</span>
            </div>
            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 Diagnosis</h2>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6, marginBottom: 16 }}>{result.diagnosis}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#1A3060', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Recommended Fix</div>
                  <div style={{ color: '#E2E8F0', fontWeight: 600 }}>{result.fix}</div>
                </div>
                <div style={{ background: '#1A3060', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Estimated Cost</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{result.cost}</div>
                </div>
              </div>
              <div style={{ background: '#1A3060', borderRadius: 8, padding: 14, borderLeft: '4px solid #F5E642′ }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>🌡️ DFW Context: </span>
                <span style={{ color: '#CBD5E1′ }}>{result.dfwContext}</span>
              </div>
            </div>
          </div>
        )}

        {!result && (
          <div style={{ textAlign: 'center', color: '#475569', padding: 40 }}>
            Select the noise type and when it occurs above to get your DFW HVAC noise diagnosis
          </div>
        )}
      </div>
    </div>
  );
}
