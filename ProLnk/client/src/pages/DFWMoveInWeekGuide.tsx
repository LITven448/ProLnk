import { useState } from 'react';

const homeAges = ['0–5 years', '6–15 years', '16–30 years', '31+ years'];
const features = ['Pool', 'Gas appliances', 'Sprinkler system', 'Septic system', 'HOA community'];

type Priority = { task: string; urgency: 'urgent' | 'this-week' | 'soon'; why: string };

const baseTasks: Priority[] = [
  { task: 'Change all exterior door locks and garage codes', urgency: 'urgent', why: 'Previous owners, contractors, and realtors may have copies' },
  { task: 'Locate main water shut-off valve', urgency: 'urgent', why: 'Critical if a pipe bursts — know before you need it' },
  { task: 'Locate main electrical panel and label all breakers', urgency: 'urgent', why: 'Safety and convenience — do it before you unpack' },
  { task: 'Test all smoke and carbon monoxide detectors', urgency: 'urgent', why: 'Texas law and your safety — replace batteries immediately' },
  { task: 'Locate gas shut-off valves at meter and appliances', urgency: 'urgent', why: 'DFW has natural gas lines — know your emergency shut-offs' },
  { task: 'Turn on AC and verify it cools before moving electronics in', urgency: 'urgent', why: 'DFW summers are extreme — electronics fail in heat' },
  { task: 'Set up pest control service', urgency: 'this-week', why: 'DFW is high-risk for scorpions, cockroaches, and termites' },
  { task: 'Document condition of every room with photos/video', urgency: 'this-week', why: 'Protects your warranty claims and home insurance' },
  { task: 'Find HVAC filter location and check/replace filter', urgency: 'this-week', why: 'Dirty filters = high DFW energy bills and HVAC failure' },
  { task: 'Introduce yourself to immediate neighbors', urgency: 'this-week', why: 'They’ll look out for your home and alert you to issues' },
  { task: 'Update address with USPS, bank, DMV, and employer', urgency: 'soon', why: 'Texas requires updated license within 30 days' },
  { task: 'Register with HOA and review CC&Rs if applicable', urgency: 'soon', why: 'Avoid fines from day one — know the rules' },
];

const ageExtras: Record<string, Priority[]> = {
  '0–5 years': [
    { task: 'Submit builder warranty registration if not done at closing', urgency: 'urgent', why: 'Structural warranty is void if not registered in time' },
  ],
  '6–15 years': [
    { task: 'Schedule HVAC tuneup — system is approaching mid-life', urgency: 'this-week', why: 'DFW heat is brutal on systems 8+ years old' },
  ],
  '16–30 years': [
    { task: 'Have foundation checked by specialist within first month', urgency: 'urgent', why: 'DFW clay soil causes movement — catch early before costly' },
    { task: 'Check water heater age and condition', urgency: 'this-week', why: 'If 15+ years old, plan for replacement before it fails' },
  ],
  '31+ years': [
    { task: 'Have electrician evaluate panel for safety', urgency: 'urgent', why: 'Older panels may have recalls or unsafe wiring (aluminum, FPE)' },
    { task: 'Camera inspect main sewer line', urgency: 'this-week', why: 'Cast iron drains common in older DFW homes — cracks cause backups' },
  ],
};

const featureExtras: Record<string, Priority> = {
  'Pool': { task: 'Test pool chemistry and locate all equipment shut-offs', urgency: 'urgent', why: 'DFW sun degrades chemistry fast — green pool in days without care' },
  'Gas appliances': { task: 'Test all gas appliances and check for odors', urgency: 'urgent', why: 'Pilot lights, connections, and venting should all be verified' },
  'Sprinkler system': { task: 'Run all sprinkler zones and check heads and coverage', urgency: 'this-week', why: 'DFW Stage 2 restrictions apply — make sure system is compliant' },
  'Septic system': { task: 'Locate septic tank and get it inspected and pumped', urgency: 'urgent', why: 'Rural DFW properties often have old systems needing immediate service' },
  'HOA community': { task: 'Introduce yourself to HOA board member or management company', urgency: 'this-week', why: 'Avoid surprise violations — learn community rules directly' },
};

export default function DFWMoveInWeekGuide() {
  const [age, setAge] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [checked, setChecked] = useState<string[]>([]);

  const toggleFeature = (f: string) =>
    setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const toggleCheck = (task: string) =>
    setChecked(prev => prev.includes(task) ? prev.filter(x => x !== task) : [...prev, task]);

  const allTasks: Priority[] = [
    ...baseTasks,
    ...(age ? ageExtras[age] ?? [] : []),
    ...selectedFeatures.map(f => featureExtras[f]).filter(Boolean),
  ];

  const urgent = allTasks.filter(t => t.urgency === 'urgent');
  const thisWeek = allTasks.filter(t => t.urgency === 'this-week');
  const soon = allTasks.filter(t => t.urgency === 'soon');
  const done = checked.length;
  const total = allTasks.length;

  const renderGroup = (title: string, emoji: string, tasks: Priority[], color: string) => (
    tasks.length > 0 && (
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ fontWeight: 700, marginBottom: 12, color }}>
          {emoji} {title} ({tasks.filter(t => checked.includes(t.task)).length}/{tasks.length} done)
        </div>
        {tasks.map(t => (
          <label key={t.task} style={{ display: 'flex', gap: 12, marginBottom: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
            <input type="checkbox" checked={checked.includes(t.task)} onChange={() => toggleCheck(t.task)} style={{ marginTop: 3, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: checked.includes(t.task) ? 400 : 600, color: checked.includes(t.task) ? '#94a3b8' : '#0A1628', textDecoration: checked.includes(t.task) ? 'line-through' : 'none' }}>{t.task}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>💡 {t.why}</div>
            </div>
          </label>
        ))}
      </div>
    )
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>DFW MOVE-IN WEEK GUIDE</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>📦 Your First Week in Your DFW Home</h1>
          <p style={{ color: '#94a3b8', margin: '8px 0 0' }}>Done: {done}/{total} tasks · The first week sets up the next 30 years.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>🏠 Home Age</div>
            {homeAges.map(a => (
              <button key={a} onClick={() => setAge(a === age ? '' : a)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: age === a ? '2px solid #F5E642' : '1px solid #e2e8f0', background: age === a ? '#0A1628' : '#F9FAFB', color: age === a ? '#F5E642' : '#0A1628', fontWeight: age === a ? 700 : 400, cursor: 'pointer', fontSize: 14, marginBottom: 6 }}>
                {a}
              </button>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>✨ Your Home Has (select all)</div>
            {features.map(f => (
              <button key={f} onClick={() => toggleFeature(f)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: selectedFeatures.includes(f) ? '2px solid #F5E642' : '1px solid #e2e8f0', background: selectedFeatures.includes(f) ? '#0A1628' : '#F9FAFB', color: selectedFeatures.includes(f) ? '#F5E642' : '#0A1628', fontWeight: selectedFeatures.includes(f) ? 700 : 400, cursor: 'pointer', fontSize: 14, marginBottom: 6 }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {renderGroup('Do Today — Urgent', '🚨', urgent, '#dc2626')}
        {renderGroup('This Week', '📅', thisWeek, '#d97706')}
        {renderGroup('Soon — Within 30 Days', '📌', soon, '#0A1628')}
      </div>
    </div>
  );
}
