import { useState } from 'react';

const ecosystems = ['Google Home / Nest', 'Amazon Alexa', 'Apple HomeKit', 'SmartThings / Hub'];
const useCases = ['ERCOT peak demand savings', 'Geofencing empty home', 'Multi-zone voice control', 'Energy monitoring'];

const advice: Record<string, Record<string, string>> = {
  'Google Home / Nest': {
    'ERCOT peak demand savings': 'Nest Learning Thermostat integrates directly with Oncor and TXU Energy Rush Hour Rewards. Enroll and earn $20-120/yr in DFW while letting Nest adjust setpoints automatically during ERCOT peak events.',
    'Geofencing empty home': 'Nest Home/Away Assist uses phone location to detect departure. Set DFW away temp to 82°F max — above this, moisture issues start. Never set above 85°F unoccupied in DFW summer.',
    'Multi-zone voice control': 'Nest works with multi-zone systems but requires one thermostat per zone. Google Home can control all zones by name: "Hey Google, set the upstairs to 74."',
    'Energy monitoring': 'Nest Energy History shows runtime by day. In DFW summer, 12-14 hrs runtime/day is normal. Over 16 hrs suggests undersized system or building envelope issues.',
  },
  'Amazon Alexa': {
    'ERCOT peak demand savings': 'Ecobee with Alexa built-in supports Demand Response programs in DFW. Enroll in OhmConnect or your TDU direct DR program and coordinate through Alexa routines.',
    'Geofencing empty home': 'Ecobee SmartThermostat with Alexa uses occupancy sensors + phone geofencing. More reliable than single-phone detection — critical in DFW when family members have different schedules.',
    'Multi-zone voice control': 'Alexa routines can trigger multi-zone Ecobee setpoints by voice or time. "Alexa, set night mode" can drop all zones by 2°F for DFW sleep comfort.',
    'Energy monitoring': 'Ecobee tracks runtime efficiency and outdoor temp correlation. In DFW, expect longer runtimes on 100°F+ days — Ecobee benchmarks against similar DFW homes for comparison.',
  },
  'Apple HomeKit': {
    'ERCOT peak demand savings': 'HomeKit thermostats (ecobee, Honeywell T9) support HomeKit automations but direct ERCOT utility integration is limited. Use Ecobee via HomeKit and enroll Ecobee directly in demand response separately.',
    'Geofencing empty home': 'HomeKit geofencing is very reliable for single-occupant DFW homes. Set automation: "When last person leaves, set to 82°F." Focus on 82°F ceiling — DFW humidity spikes above that.',
    'Multi-zone voice control': 'Siri controls HomeKit thermostats per zone. "Hey Siri, set the bedroom to 72" works with any HomeKit-compatible thermostat. Scene integration works well for DFW morning/evening routines.',
    'Energy monitoring': 'HomeKit lacks native energy monitoring for HVAC. Pair with Sense energy monitor for circuit-level HVAC runtime data to track DFW cooling costs.',
  },
  'SmartThings / Hub': {
    'ERCOT peak demand savings': 'SmartThings supports complex automation rules. Build a rule that raises setpoint +4°F when ERCOT grid conditions are severe and you receive an alert — manual control but highly customizable.',
    'Geofencing empty home': 'SmartThings geofencing uses phone presence sensors. More reliable with multiple residents — combine with door sensor confirmation to avoid ghost-away events in DFW.',
    'Multi-zone voice control': 'SmartThings with Alexa or Google integration enables full multi-zone control. Scenes ("Good Night") can set all zones simultaneously — useful for DFW homes with 3+ zones.',
    'Energy monitoring': 'SmartThings + Aeotec Home Energy Monitor gives circuit-level data. Track your HVAC compressor runtime directly. DFW baseline: 8-10 hrs/day spring, 14-16 hrs/day peak summer.',
  },
};

export default function DFWHVACSmartHomeIntegration() {
  const [ecosystem, setEcosystem] = useState('');
  const [useCase, setUseCase] = useState('');

  const result = ecosystem && useCase ? advice[ecosystem]?.[useCase] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Smart Home HVAC Integration</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
          Smart HVAC integration in DFW is not just convenience — it's financial. ERCOT demand response programs pay DFW homeowners to shift load during peak events. Geofencing prevents empty homes from running AC at full blast in 105°F weather. The right setup pays for itself.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '14px 18px', marginBottom: 28, fontSize: 14, fontWeight: 600 }}>
          ⚡ ERCOT Rule: Never set your DFW geofence away temp above 82°F. Above this threshold, humidity climbs toward mold territory within 24-48 hours in a closed home.
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📱 Get Your Integration Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>YOUR SMART HOME ECOSYSTEM</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ecosystems.map(e => (
                <button key={e} onClick={() => setEcosystem(e)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: ecosystem === e ? '#F5E642' : '#1e3a5f', background: ecosystem === e ? '#F5E642' : 'transparent', color: ecosystem === e ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{e}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW USE CASE</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {useCases.map(u => (
                <button key={u} onClick={() => setUseCase(u)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: useCase === u ? '#F5E642' : '#1e3a5f', background: useCase === u ? '#F5E642' : 'transparent', color: useCase === u ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{u}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Integration Approach</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{result}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[['⚡', 'ERCOT Demand Response', 'DFW utilities pay you to reduce load during peak events. Smart thermostats automate this without sacrificing comfort.'],['📍', 'Geofencing in DFW', '82°F is the magic number. Above this, a closed DFW home accumulates dangerous humidity. Automate the return temperature too.'],['🎤', 'Voice + Schedule', 'DFW seasonal patterns are predictable. Schedule-based control often beats learning algorithms in extreme climate zones.'],['📊', 'Runtime Tracking', 'Know your baseline. DFW peak summer should be 13-16 hrs/day runtime. Higher signals a problem worth investigating.']].map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📞 Get a ProLnk Quote</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Find DFW HVAC pros who handle smart thermostat installation, zoning integration, and ERCOT demand response setup.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
