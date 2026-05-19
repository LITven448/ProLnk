import { useState } from 'react';

const issues: Record<string, { law: string; approach: string; escalation: string }> = {
  fence: {
    law: '⚖️ Texas law: fences on the property line are jointly owned and maintained unless a deed restricts otherwise. HOA rules often override — check CC&Rs. Cost sharing is typically 50/50. A survey is legally required to establish true boundary before any dispute.',
    approach: '👋 Step 1: Friendly knock with a photo of the issue. Step 2: Written note with photo + your contact. Say "I wanted to make sure we’re on the same page before I call anyone." Use "we" language — "our fence" not "your fence."',
    escalation: '📋 Escalation: HOA complaint (if applicable) → Mediation through Dallas/Tarrant County dispute center (free) → Small claims court up to $20K. Attorney needed only if survey is contested.'
  },
  tree: {
    law: '🌳 Texas law: you may trim branches that cross your property line at your own expense. You cannot go onto their property without permission. If a healthy tree falls and damages your property, your insurance covers it — not neighbor. Dead/diseased tree: document with photos and send certified letter.',
    approach: '📝 For overhanging branches: friendly note with photo, offer to pay for shared trimming. For fallen damage: contact your insurer first — do not accuse neighbor before you understand liability.',
    escalation: '📋 Escalation: Document dead/diseased tree in writing (certified mail). If ignored, file complaint with city code enforcement. Fort Worth/Dallas both have tree ordinances. Personal injury escalates to attorney.'
  },
  noise: {
    law: '🔊 DFW noise ordinances: most cities (Dallas, Frisco, Plano, McKinney) prohibit loud noise 10 PM–7 AM weekdays, 11 PM–8 AM weekends. HOA rules may be stricter. Construction noise typically restricted to 7 AM–9 PM. Document with video timestamps.',
    approach: '😊 First offense: friendly text or knock. Assume they don’t know. Second offense: note in writing with city ordinance referenced. Avoid threatening language — "I wanted to check in" is better than "you’re violating."',
    escalation: '📋 Escalation: Non-emergency police line for ordinance violation. HOA complaint in writing. For chronic violations, file city code enforcement complaint. Nuisance lawsuit only after documented pattern.'
  },
  hoa: {
    law: '📋 Texas HOA law (TPCA 2021): HOAs must give homeowners 60 days before foreclosure for non-payment of fines. You have the right to attend all board meetings. All HOA financial records must be available to members. Fines must follow adopted enforcement policy.',
    approach: '📧 Always communicate in writing with HOA. Request meeting with board in writing. Bring documentation — photos, code references, dates. Ask board members to cite the specific CC&R section before accepting a violation.',
    escalation: '📋 Escalation: Written dispute to board → Request for hearing (legal right in TX) → Mediation → Attorney General HOA complaint (Texas AG HOA Help Line: 1-800-252-8011) → Civil suit for wrongful enforcement.'
  },
  parking: {
    law: '🚗 Public streets: local city parking ordinances apply (typically 48–72 hour max in same spot). HOA common areas: CC&Rs govern. Driveway blocking: call non-emergency police — it’s an obstruction. RVs and commercial vehicles: most DFW HOAs prohibit visible storage.',
    approach: '📝 Street parking: friendly note first. Driveway blocking: polite knock — could be a guest situation. HOA rule violations: document with dated photos before contacting HOA.',
    escalation: '📋 Escalation: Non-emergency police for driveway blocking or street violations. HOA complaint for CC&R violations. Consistent issues → city code enforcement → HOA attorney if HOA refuses to enforce.'
  }
};

const issueList = [
  { key: 'fence', label: '🪵 Fence Dispute' },
  { key: 'tree', label: '🌳 Tree / Branches' },
  { key: 'noise', label: '🔊 Noise Issues' },
  { key: 'hoa', label: '📋 HOA Conflict' },
  { key: 'parking', label: '🚗 Parking Problems' }
];

export default function DFWNeighborRelationsGuide() {
  const [issue, setIssue] = useState('');
  const data = issue ? issues[issue] : null;

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#059669', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER RESOURCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>🤝 DFW Neighbor Relations Guide</h1>
        <p style={{ color: '#64748B', marginBottom: 32 }}>Navigate suburban neighbor dynamics, Texas law, and HOA conflicts without burning bridges.</p>

        <div style={{ background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🌟 The DFW Rule: Relationships First, Rights Second</div>
          <div style={{ color: '#374151', fontSize: 14 }}>In DFW suburbs, you'll live next to these people for years. Most disputes can be resolved with one friendly conversation before they become legal matters. Document everything, but lead with kindness.</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>What's your situation?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {issueList.map(i => (
              <button key={i.key} onClick={() => setIssue(i.key)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 14, fontWeight: 600, borderColor: issue === i.key ? '#059669′ : '#E2E8F0', background: issue === i.key ? '#ECFDF5' : '#FFFFFF', color: issue === i.key ? '#059669' : '#64748B' }}>{i.label}</button>
            ))}
          </div>
        </div>

        {data && (
          <div style={{ display: 'grid', gap: 16 }}>
            {[['⚖️ Texas Law That Applies', data.law, '#EFF6FF','#1D4ED8'],['💬 How to Approach It', data.approach, '#ECFDF5','#059669'],['📈 Escalation Path', data.escalation, '#FFF7ED','#D97706']].map(([title, content, bg, color]) => (
              <div key={title as string} style={{ background: bg as string, border: `1px solid ${color}30`, borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontWeight: 700, color: color as string, marginBottom: 12 }}>{title as string}</h3>
                <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>{content as string}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
