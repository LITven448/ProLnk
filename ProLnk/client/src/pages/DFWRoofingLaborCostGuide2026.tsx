import { useState } from 'react';

const factors = [
  { icon: '👷', title: 'Crew Size Affects Speed and Cost', detail: 'Standard DFW roofing crew is 4–6 workers. Smaller crews mean more days on-site, increasing your exposure to DFW weather windows. Larger crews cost more per hour but finish faster.' },
  { icon: '📦', title: 'Daily Production in DFW Heat', detail: 'Experienced DFW crews install 15–20 squares per day in spring/fall. In summer heat (100°F+), production drops to 10–14 squares — early morning start required by most contractors.' },
  { icon: '🌅', title: 'DFW Summer Overtime Economics', detail: 'Crews start at 5:30–6 AM to beat peak heat. Work halts by 1–2 PM in July–August. This compresses the work window — expect multi-day jobs to take longer in summer.' },
  { icon: '🚗', title: 'DFW Sprawl and Travel Time', detail: 'DFW metro spans 9,000+ square miles. Crews traveling from Fort Worth to Frisco add 45–90 min daily. Ask contractors if they have a local crew or charge travel time.' },
  { icon: '✅', title: 'Verifying Full Labor Scope', detail: 'Labor should include: tear-off, haul-away, deck inspection, underlayment installation, starter strip, field shingles, ridge cap, flashing, and cleanup. Get each line item confirmed in writing.' },
];

const projects = [
  { type: '1,500 sq ft single-story, standard pitch', insight: '10–11 squares. 1 day for average DFW crew in spring. Labor typically $1,800–$2,800. Verify tear-off and haul-away are included.' },
  { type: '2,400 sq ft two-story, moderate pitch', insight: '18–22 squares. 1.5–2 days. Pitch factor adds 15–25% to labor. Ask about safety equipment costs — steep pitch surcharges are legitimate.' },
  { type: '3,500 sq ft with multiple valleys', insight: '28–35 squares with waste factor. 2–3 days. Valley flashing labor is time-intensive — verify it’s itemized, not buried in a flat rate.' },
  { type: 'DFW summer replacement', insight: 'Add 20–30% time buffer for heat restrictions. Crew size matters more in summer — larger crews complete before peak heat. Ask planned start time explicitly.' },
  { type: 'Insurance claim replacement', insight: 'Xactimate labor rates are regional benchmarks. DFW contractor bids should be within 10–15% of Xactimate. Major gaps signal either padding or scope cuts.' },
];

export default function DFWRoofingLaborCostGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW ROOFING</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW Roofing Labor Cost Breakdown Guide 2026</h1>
        <p style={{ color: '#8899aa', fontSize: 14, marginBottom: 32 }}>What drives roofing labor costs in DFW — and how to verify your bid covers the full scope.</p>

        <div style={{ marginBottom: 36 }}>
          {factors.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, background: '#0f1f38', borderRadius: 10, padding: '16px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 24 }}>{f.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                <div style={{ color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>{f.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f38', borderRadius: 12, padding: '24px 20px', marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🔨 Project Type → Labor Cost Insight</div>
          <p style={{ color: '#8899aa', fontSize: 13, marginBottom: 16 }}>Select your roofing project to understand DFW labor expectations:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {projects.map((p, i) => (
              <div key={i}>
                <button
                  onClick={() => setSelected(selected === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', background: selected === i ? '#F5E642′ : '#162035', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
                >
                  {p.type}
                </button>
                {selected === i && (
                  <div style={{ background: '#1a2d4a', borderRadius: '0 0 8px 8px', padding: '12px 16px', color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>
                    {p.insight}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '18px 20px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>🏠 Compare DFW Roofing Bids with ProLnk</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 6 }}>Get multiple licensed DFW roofer quotes — ProLnk helps you compare labor scope, not just price.</div>
        </div>
      </div>
    </div>
  );
}