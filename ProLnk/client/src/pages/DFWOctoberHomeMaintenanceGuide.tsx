import { useState } from 'react';

export default function DFWOctoberHomeMaintenanceGuide() {
  const [projectType, setProjectType] = useState<string>('');

  const tasks: Record<string, { icon: string; title: string; timing: string }[]> = {
    exterior: [
      { icon: '🎨', title: 'Paint exterior — October is peak window: 55-80°F, low humidity', timing: 'Best Month' },
      { icon: '🏠', title: 'Schedule roof inspection — mild weather, pre-winter critical', timing: 'Book Now' },
      { icon: '🍂', title: 'Clean gutters after oak leaf drop (usually mid-to-late October)', timing: 'Late Oct' },
      { icon: '🧱', title: 'Repair driveway cracks before winter freeze-thaw cycles', timing: 'Early Oct' },
      { icon: '🌿', title: 'Overseed thin lawn areas — October is last good window', timing: 'Early Oct' },
    ],
    hvac: [
      { icon: '🔥', title: 'Heating system check before first cold snap — book now', timing: 'Book Now' },
      { icon: '🔄', title: 'Replace air filter with high-MERV rating for winter allergens', timing: 'Early Oct' },
      { icon: '📋', title: 'Clean and inspect gas furnace heat exchanger', timing: 'Best Month' },
      { icon: '🌬️', title: 'Seal HVAC ductwork leaks — heating efficiency critical in winter', timing: 'Best Month' },
    ],
    landscaping: [
      { icon: '🌷', title: 'Plant fall flowers and shrubs — soil temps still warm', timing: 'Best Month' },
      { icon: '🍂', title: 'Apply pre-emergent herbicide for spring weed prevention', timing: 'Early Oct' },
      { icon: '✂️', title: 'Final lawn mowing — lower blade slightly for winter', timing: 'Late Oct' },
      { icon: '💧', title: 'Begin cutting irrigation to 1-2x/week as temps drop', timing: 'Early Oct' },
      { icon: '🌳', title: 'Hire arborist for tree trimming — dormancy starts, sap not flowing', timing: 'Late Oct' },
    ],
  };

  const timingColor: Record<string, string> = {
    'Best Month': '#4CAF50',
    'Book Now': '#FF4444',
    'Early Oct': '#F5E642',
    'Late Oct': '#60A5FA',
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🍂</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW October Home Maintenance</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Best Month for Exterior Work · Roof · HVAC Heat Check · Fall Landscaping</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <p style={{ color: '#CBD5E1', marginBottom: 12, fontWeight: 600 }}>What project are you planning?</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[{ key: 'exterior', label: '🎨 Exterior & Roof' }, { key: 'hvac', label: '🔥 HVAC & Heating' }, { key: 'landscaping', label: '🌿 Landscaping' }].map(opt => (
              <button key={opt.key} onClick={() => setProjectType(opt.key)} style={{ padding: '10px 20px', borderRadius: 8, border: '2px solid', borderColor: projectType === opt.key ? '#F5E642' : '#1E3A5F', backgroundColor: projectType === opt.key ? '#1a2f4e' : '#0D1F3C', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>{opt.label}</button>
            ))}
          </div>
        </div>

        {projectType && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Your October Scheduling Guide</h2>
            {tasks[projectType].map((task, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, backgroundColor: '#0D1F3C', borderRadius: 10, padding: '14px 16px', marginBottom: 10, borderLeft: `4px solid ${timingColor[task.timing]}` }}>
                <span style={{ fontSize: 24 }}>{task.icon}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: '#E2E8F0' }}>{task.title}</p>
                  <span style={{ fontSize: 12, color: timingColor[task.timing], fontWeight: 700 }}>{task.timing}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, backgroundColor: '#0D1F3C', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', margin: '0 0 12px' }}>October slots fill fast — get a DFW pro before winter rush.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}