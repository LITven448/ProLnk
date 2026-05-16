import { useState } from 'react';

const elderlySituations = ['Living alone, age 65–75', 'Living alone, age 75+', 'With family caregiver in home', 'Mobility limitations', 'Heart or lung condition', 'Recently moved to DFW from cooler climate'];
const homeTypes = ['Own DFW home (any age)', 'DFW apartment / assisted living', 'Recent DFW construction', 'Older DFW home (pre-1990)', 'DFW townhome / condo'];

type ElderlyPlan = { hvacPriority: string[]; backupCooling: string[]; safetyChecks: string[]; cost: string; emergencyNote: string; };

function getElderlyPlan(situation: string, home: string): ElderlyPlan {
  const isAlone75 = situation.includes('75+');
  const isAlone = situation.includes('alone');
  const isHeart = situation.includes('Heart');
  const isMobility = situation.includes('Mobility');
  const isNewToDFW = situation.includes('cooler climate');
  const isOldHome = home.includes('pre-1990');
  const isApt = home.includes('apartment');
  return {
    hvacPriority: [
      '🔴 HVAC reliability is a life-safety system for elderly DFW residents — 150+ heat-related deaths occur in DFW area annually',
      `⚙️ Schedule HVAC tune-up every spring (April) — ${isOldHome ? 'older systems fail most often at peak demand in July' : 'preventive maintenance prevents emergency failures when temps hit 108°F'}`,
      isHeart ? '❤️ Maintain 72–74°F consistently — temperature fluctuations trigger cardiac stress in elderly with heart conditions' : '🌡️ Set thermostat no higher than 76°F — elderly body thermoregulation declines with age; heat stress begins at lower temps',
      isOldHome ? '⚠️ Replace system if 15+ years old — older DFW HVAC systems have 40% higher failure rate during heat waves' : '✅ Install smart thermostat with remote monitoring — family members can check and adjust temperature remotely',
      isAlone ? '📱 Set up HVAC monitoring app with family alerts — if home temp exceeds 80°F for 30+ min, alert caregiver immediately' : '✅ Ensure caregiver knows thermostat location and emergency HVAC shutoff valve location',
    ],
    backupCooling: [
      '🌀 Keep one portable AC unit in closet as emergency backup — DFW HVAC wait times during July heat waves reach 5–7 days',
      isAlone75 ? '📞 Register with DFW county cooling center program — free transportation to air-conditioned centers during HVAC emergencies' : '🏥 Identify nearest hospital, library, and shopping center as cooling refuges if AC fails',
      '🧊 Emergency cooling kit: spray bottles, wet towels for wrists/neck, electrolyte drinks, battery-powered fan',
      isMobility ? '♿ Pre-identify neighbor or caregiver who can transport to cooling center if mobility prevents self-evacuation' : '🚗 Always keep car in garage during summer — provides air-conditioned refuge for first 30 min after AC failure',
      isNewToDFW ? '⚠️ NEW TO DFW: Your body has not acclimated to 108°F heat — heat illness risk is 3x higher your first two DFW summers. AC is not optional.' : '📋 Keep HVAC emergency contact in phone AND posted on refrigerator — cognitive stress during heat emergencies makes recall difficult',
    ],
    safetyChecks: [
      '🔴 Install CO detector at breathing level — elderly with reduced mobility cannot escape CO leaks as quickly',
      isOldHome ? '🔥 Annual furnace heat exchanger inspection — cracked exchangers in older DFW homes are the #1 CO source for elderly' : '✅ Test CO detector monthly and replace batteries annually — test dates: April (before AC season) and October (before heating season)',
      isHeart ? '💊 Discuss with physician — some heart medications impair heat dissipation; your HVAC target temp may need to be 70–72°F, not 76°F' : '🌡️ Keep indoor thermometer in bedroom — elderly often cannot perceive dangerous temperatures until symptoms appear',
      isAlone ? '📅 Create check-in system — caregiver or neighbor checks in by phone daily when outdoor temps exceed 95°F' : '✅ Label thermostat controls with large print — cognitive changes can make unfamiliar controls dangerous in emergencies',
      '💧 Drink 8oz water every hour when staying in air-conditioned home during DFW summer — elderly have reduced thirst sensation',
    ],
    cost: isOldHome ? '$400–$1,200 (system inspection + upgrades + backup unit)' : isAlone75 ? '$300–$700 (monitoring + backup + safety upgrades)' : '$150–$450 (monitoring + CO safety + tune-up)',
    emergencyNote: isAlone75 || isMobility ? '🚨 EMERGENCY: If elderly person shows confusion, hot dry skin, or stops sweating in heat — call 911 immediately. Heat stroke kills within 1–2 hours without treatment. Do NOT wait to see if they improve.' : '⚠️ Heat illness warning signs: heavy sweating, weakness, fast pulse, nausea. Move to AC immediately and call 911 if symptoms worsen in 15 minutes.',
  };
}

export default function DFWHVACElderlyGuide() {
  const [situation, setSituation] = useState('');
  const [home, setHome] = useState('');
  const [plan, setPlan] = useState<ElderlyPlan | null>(null);
  function generate() { if (situation && home) setPlan(getElderlyPlan(situation, home)); }
  const sel = { width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 } as const;
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', paddingBottom: 60 }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '1px solid #1E3A5F', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC GUIDE</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>HVAC Safety for Elderly<br /><span style={{ color: '#F5E642' }}>DFW Homeowners</span></h1>
          <p style={{ fontSize: 17, color: '#A8B4C8', lineHeight: 1.7, margin: 0 }}>DFW's extreme heat kills 150+ elderly residents annually. For older adults, HVAC is not a comfort system — it is a life-safety system. This guide covers reliability, backup plans, and the monitoring strategies that save lives.</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['⚠️', '150+', 'DFW elderly heat deaths/yr'], ['🌡️', '108°F', 'DFW peak — dangerous for elderly'], ['⏱️', '2 hrs', 'Time to dangerous heat stroke']].map(([icon, stat, label]) => (
            <div key={label} style={{ background: '#0D1F3C', borderRadius: 12, padding: '20px 16px', textAlign: 'center', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642' }}>{stat}</div>
              <div style={{ fontSize: 12, color: '#6B7A99', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: '#F5E642' }}>👴 Get Your Elderly HVAC Safety Plan</h2>
          <p style={{ fontSize: 13, color: '#6B7A99', margin: '0 0 20px' }}>Tell us about the elderly person's situation and their DFW home for a tailored HVAC priority and safety checklist.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>ELDERLY SITUATION</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={sel}>
                <option value="">Select situation</option>
                {elderlySituations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>DFW HOME TYPE</label>
              <select value={home} onChange={e => setHome(e.target.value)} style={sel}>
                <option value="">Select home type</option>
                {homeTypes.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} disabled={!situation || !home} style={{ background: situation && home ? '#F5E642' : '#1E3A5F', color: situation && home ? '#0A1628' : '#4A5568', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: situation && home ? 'pointer' : 'not-allowed' }}>Get Safety Plan →</button>
        </div>
        {plan && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #F5E642' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: '#F5E642' }}>⚙️ HVAC Priority Plan</h3>
              <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 14 }}>Estimated investment: <span style={{ color: '#F5E642', fontWeight: 700 }}>{plan.cost}</span></div>
              {plan.hvacPriority.map((item, i) => <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1E3A5F', fontSize: 14, lineHeight: 1.6 }}>{item}</div>)}
            </div>
            <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #F59E0B' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 12px', color: '#F59E0B' }}>🌀 Backup Cooling Plan</h3>
              {plan.backupCooling.map((item, i) => <div key={i} style={{ padding: '7px 0', borderBottom: '1px solid #1E3A5F', fontSize: 14, lineHeight: 1.6 }}>{item}</div>)}
            </div>
            <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 12px', color: '#F5E642' }}>🔴 Safety Checklist</h3>
              {plan.safetyChecks.map((item, i) => <div key={i} style={{ padding: '7px 0', borderBottom: '1px solid #1E3A5F', fontSize: 14, lineHeight: 1.6 }}>{item}</div>)}
            </div>
            <div style={{ background: '#1A0A0A', borderRadius: 16, padding: 20, border: '2px solid #EF4444' }}>
              <div style={{ fontSize: 14, color: '#E8EAF0', lineHeight: 1.8, fontWeight: 500 }}>{plan.emergencyNote}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
