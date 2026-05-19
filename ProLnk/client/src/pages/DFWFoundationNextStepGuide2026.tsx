import { useState } from 'react';

const situations = [
  { id: 'new-home', label: '🏠 New Home Purchase' },
  { id: 'no-symptoms', label: '✅ No Symptoms — Preventive Care' },
  { id: 'early-symptoms', label: '🟡 Early Symptoms (minor cracks, sticking doors)' },
  { id: 'active-movement', label: '🔴 Active Movement (visible settling, large cracks)' },
];

const guides: Record<string, { title: string; steps: string[]; waterSchedule: string; callProLnk: string; urgency: string }> = {
  'new-home': {
    title: '🏠 New Home — Establish Your Baseline',
    urgency: '🟡 Within 60 Days',
    steps: [
      '📋 Walk the perimeter — photograph every exterior crack, gap, or separation',
      '🚪 Open and close every door — note any sticking or misalignment',
      '🔍 Check interior walls for diagonal cracks at window/door corners',
      '🌊 Inspect gutters and grading — poor drainage is the #1 DFW foundation threat',
      '📐 Hire a ProLnk engineer-supervised pro for a baseline measurement report',
      '🗃️ Log all photos and measurements in your Home Health Vault',
    ],
    waterSchedule: 'Begin consistent perimeter watering immediately — DFW clay shrinks fast.',
    callProLnk: 'Schedule a baseline foundation inspection within 60 days of purchase.',
  },
  'no-symptoms': {
    title: '✅ No Symptoms — Stay Ahead of DFW Clay',
    urgency: '🟢 Seasonal Priority',
    steps: [
      '💧 Water foundation perimeter 2–3x per week during dry months (May–Oct)',
      '🌱 Maintain consistent soil moisture — avoid drought/flood cycles',
      '🍃 Trim tree roots within 20 feet of foundation — oak roots are highly aggressive',
      '🌊 Clean gutters every spring and fall — direct water 6ft away from foundation',
      '🔍 Inspect for new cracks each season — especially after drought or heavy rain',
      '📊 Annual ProLnk check-in keeps your Vault data current and your warranty valid',
    ],
    waterSchedule: 'Water slowly and deeply 2–3x per week in summer. Reduce in winter but don\’t stop entirely.',
    callProLnk: 'Schedule an annual foundation review to catch movement before it becomes costly.',
  },
  'early-symptoms': {
    title: '🟡 Early Symptoms — Act Before It Worsens',
    urgency: '🟠 Act Within 30 Days',
    steps: [
      '📸 Document all cracks with measurements — use a ruler for scale in photos',
      '🔍 Note crack direction: diagonal = structural concern; vertical = usually shrinkage',
      '🌡️ Check interior humidity — dry air accelerates shrinkage movement',
      '💧 Increase perimeter watering immediately — begin 3x per week schedule',
      '📞 Schedule a ProLnk foundation assessment — do NOT wait for summer',
      '📋 Get a written report with measurements to track future movement',
    ],
    waterSchedule: 'Increase to 3x per week immediately. Use soaker hose 18 inches from foundation edge.',
    callProLnk: 'Early symptoms catch = $3,000–$8,000 fix vs. advanced symptoms = $15,000–$40,000.',
  },
  'active-movement': {
    title: '🔴 Active Movement — Call ProLnk Today',
    urgency: '🔴 Emergency — Act Immediately',
    steps: [
      '🚨 Stop all irrigation changes — sudden moisture changes worsen active movement',
      '📞 Call ProLnk NOW — active foundation movement requires immediate assessment',
      '🚫 Do not attempt DIY repairs — improper fixes void warranty and worsen issues',
      '🏛️ An engineer-supervised inspection is required before any repair begins',
      '💰 Budget $10,000–$50,000 depending on extent — get 2–3 written bids',
      '📋 All repairs must be documented in Home Health Vault for resale disclosure',
    ],
    waterSchedule: 'Do not change water schedule until engineer advises — sudden changes during active movement cause additional damage.',
    callProLnk: 'Active foundation movement is an emergency in DFW. Get matched with a Charter pro today.',
  },
};

export default function DFWFoundationNextStepGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? guides[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Foundation Next Step Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Select your situation for a personalized action plan</p>
        </div>

        <div style={{ background: '#132039', border: '1px solid #F5E64244', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#94a3b8′ }}>
          ⚠️ <strong style={{ color: '#F5E642′ }}>DFW Fact:</strong> North Texas sits on expansive clay soil that shrinks and swells with moisture — more foundation claims than any other U.S. metro.
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#F5E642′ : '#132039', color: selected === s.id ? '#0A1628' : '#fff',
                border: '1px solid ' + (selected === s.id ? '#F5E642′ : '#1e3a5f'), borderRadius: 10,
                padding: '14px 18px', textAlign: 'left', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              {s.label}
            </button>
          ))}
        </div>

        {guide && (
          <div style={{ background: '#132039', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, margin: 0 }}>{guide.title}</h2>
              <span style={{ fontSize: 13, background: '#0A1628', padding: '4px 10px', borderRadius: 20 }}>{guide.urgency}</span>
            </div>
            <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: 1.5 }}>
                  {step}
                </div>
              ))}
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '12px 14px', fontSize: 13, marginBottom: 16, color: '#94a3b8′ }}>
              💧 <strong style={{ color: '#F5E642′ }}>Watering Schedule:</strong> {guide.waterSchedule}
            </div>
            <div style={{ background: '#F5E642', borderRadius: 10, padding: '14px 18px', color: '#0A1628′ }}>
              <strong>📞 When to Call ProLnk:</strong> {guide.callProLnk}
              <div style={{ marginTop: 10 }}>
                <a href="https://prolnk.io" style={{ background: '#0A1628', color: '#F5E642', padding: '8px 18px',
                  borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
                  → Get My Charter Foundation Match
                </a>
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 28, color: '#475569', fontSize: 12 }}>
          ProLnk Charter Pros • DFW Metro • Engineer-Supervised Assessments • prolnk.io
        </div>
      </div>
    </div>
  );
}
