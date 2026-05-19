import { useState } from 'react';

const VISIT_TYPES = ['Annual tune-up', 'Repair call', 'New system install', 'Second opinion', 'Pre-purchase inspection'];
const SITUATIONS = ['First time using this tech', 'System over 10 years old', 'Had issues all season', 'Just moved in', 'Everything seems fine'];

type ChecklistKey = string;

const CHECKLISTS: Record<ChecklistKey, { before: string[]; during: string[]; after: string[]; questions: string[] }> = {
  'Annual tune-up|First time using this tech': {
    before: ['📋 Write down equipment model, serial number, and install year', '🗂️ Gather any past service records you have', '🐾 Secure pets away from equipment areas', '🚪 Clear 3 ft around all indoor and outdoor units'],
    during: ['👀 Stay present for the first 10 minutes to answer history questions', '📸 Ask if you can photograph anything flagged', '📝 Take notes on everything the tech mentions'],
    after: ['📄 Request a written summary of findings', '💾 Store the report in your Home Health Vault', '📅 Book next year now while you have rapport'],
    questions: ['What is the current refrigerant charge level?', 'Any signs of wear I should watch over the next year?', 'What is your availability in peak summer weeks?'],
  },
  default: {
    before: ['📋 Note symptoms: when it started, how often, any sounds or smells', '🌡️ Check if thermostat is set correctly before the tech arrives', '🚪 Ensure access to all units, attic, and electrical panel', '💡 Note any recent changes: new insulation, rooms added, filter changes'],
    during: ['🔍 Ask the tech to explain what they are finding in plain language', '📸 Photograph any parts being replaced before and after', '💰 Get verbal confirmation of cost before any repair begins'],
    after: ['📄 Get an itemized invoice with parts and labor listed separately', '🔧 Ask what the expected lifespan is for any repair made', '📅 Confirm what follow-up, if any, is needed'],
    questions: ['What caused this issue?', 'Is this a symptom of a larger problem?', 'What can I do to prevent this from recurring?', 'How long should this repair last?'],
  },
};

function getChecklist(visitType: string, situation: string) {
  const key = `${visitType}|${situation}`;
  return CHECKLISTS[key] || CHECKLISTS['default'];
}

export default function DFWHVACTechVisitGuide() {
  const [visitType, setVisitType] = useState('');
  const [situation, setSituation] = useState('');
  const checklist = visitType && situation ? getChecklist(visitType, situation) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>How to Prepare for a DFW HVAC Service Visit</h1>
        <p style={{ color: '#8899AA', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          A prepared homeowner gets more value from every service visit. Know what to do before the tech arrives, what to watch during, and how to capture the value after.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>📅 Step 1: Select Visit Type</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {VISIT_TYPES.map(v => (
              <button key={v} onClick={() => setVisitType(v)} style={{ background: visitType === v ? '#F5E642′ : '#162030', color: visitType === v ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: visitType === v ? 700 : 400, fontSize: 13 }}>{v}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🏠 Step 2: Your Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SITUATIONS.map(s => (
              <button key={s} onClick={() => setSituation(s)} style={{ background: situation === s ? '#F5E642′ : '#162030', color: situation === s ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: situation === s ? 700 : 400, fontSize: 14 }}>{s}</button>
            ))}
          </div>
        </div>

        {checklist && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>✅ Your Preparation Checklist</h2>
            {[['Before the Visit', checklist.before], ['During the Visit', checklist.during], ['After the Visit', checklist.after]].map(([label, items]) => (
              <div key={label as string} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15 }}>{label as string}</div>
                {(items as string[]).map(item => <div key={item} style={{ marginBottom: 8, fontSize: 14, color: '#ddd', lineHeight: 1.6 }}>{item}</div>)}
              </div>
            ))}
            <div style={{ borderTop: '1px solid #1e3050', paddingTop: 16, marginTop: 8 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15 }}>💬 Questions to Ask</div>
              {checklist.questions.map(q => <div key={q} style={{ marginBottom: 8, fontSize: 14, color: '#ddd', lineHeight: 1.6 }}>→ {q}</div>)}
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Need a Vetted DFW HVAC Tech?</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk matches you with NATE-certified technicians who share visit summaries automatically with your Home Health Vault.</div>
        </div>
      </div>
    </div>
  );
}
