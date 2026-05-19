import { useState } from 'react';

const APPROVAL_ITEMS = [
  { project: 'Exterior Paint Color', required: true, typical: '2-4 weeks', tips: 'Submit 3 color swatches with manufacturer name and code' },
  { project: 'Privacy Fence (new)', required: true, typical: '3-6 weeks', tips: 'Include plot survey; confirm height limits (usually 6ft max in DFW)' },
  { project: 'Driveway Widening', required: true, typical: '4-8 weeks', tips: 'Show impervious coverage stays within HOA allowed percentage' },
  { project: 'Room Addition or Patio Cover', required: true, typical: '4-12 weeks', tips: 'Requires city permit first; HOA approval is a separate process' },
  { project: 'Solar Panels', required: false, typical: 'N/A', tips: 'Texas Property Code 202.010 prohibits HOA from banning solar panels' },
  { project: 'Roof Replacement (same material)', required: false, typical: 'N/A', tips: 'Usually exempt if same color and material; verify in your CC&Rs' },
  { project: 'Front Yard Landscaping', required: true, typical: '1-3 weeks', tips: 'Must meet drought-tolerant or turf ratio requirements' },
  { project: 'Mailbox Replacement', required: true, typical: '1-2 weeks', tips: 'Most HOAs have a specified mailbox vendor or approved model list' },
  { project: 'Portable Basketball Hoop', required: false, typical: 'N/A', tips: 'Usually allowed but must be stored when not in use per most HOAs' },
  { project: 'Pergola or Gazebo', required: true, typical: '3-6 weeks', tips: 'Setback requirements and height limits apply; submit full dimensions' },
];

const LANDSCAPING_STANDARDS = [
  { standard: 'St. Augustine Grass', note: 'Most common in DFW - HOAs typically require 70% minimum turf coverage in front yard' },
  { standard: 'Tree Placement', note: 'Usually requires 10ft setback from property line and must not obstruct neighbor sightlines' },
  { standard: 'Mulch vs Gravel', note: 'Many HOAs specify organic mulch only in planting beds - check before installing rock beds' },
  { standard: 'Seasonal Color', note: 'Some HOAs require blooming annuals maintained April through October' },
  { standard: 'Edging', note: 'Sidewalk and driveway edges must be maintained - one of the most common violations in DFW' },
];

const APPEAL_STEPS = [
  'Submit written denial appeal within 30 days of receiving the rejection letter',
  'Request in writing the specific CC&R section the denial is based on',
  'Provide additional documentation or propose modifications to address cited concerns',
  'Request an in-person hearing before the Architectural Review Committee',
  'Present your case at a full board meeting if ARC hearing is unsuccessful',
  'Consult a Texas HOA attorney if board acts arbitrarily outside their CC&R authority',
];

type ProjectKey = 'fence' | 'paint' | 'addition' | 'driveway' | 'landscape' | 'pergola';

const TIMELINES: Record<ProjectKey, { weeks: string; steps: string[]; tip: string }> = {
  fence: { weeks: '3-6 weeks', steps: ['Submit plot survey with fence line marked', 'ARC reviews materials and height spec', 'Possible site inspection by ARC member', 'Written approval or denial issued'], tip: 'Attach the material spec sheet and manufacturer data to avoid back-and-forth.' },
  paint: { weeks: '2-4 weeks', steps: ['Submit color swatches from approved palette', 'ARC checks against community guidelines', 'Approval issued or alternate suggested', 'Written approval letter issued'], tip: 'Choose from any pre-approved HOA color palette for near-instant approval.' },
  addition: { weeks: '6-12 weeks', steps: ['Obtain city building permit first', 'Submit architectural drawings to ARC', 'Full ARC review and possible site visit', 'Board ratification if over threshold', 'Written approval letter issued'], tip: 'Hire an architect who has worked in your community - saves multiple revision cycles.' },
  driveway: { weeks: '4-8 weeks', steps: ['Calculate and show impervious coverage percentage', 'Submit proposed material and finish', 'City permit if required by municipality', 'Written HOA approval issued'], tip: 'Use the same material visible in nearby approved driveways to minimize review.' },
  landscape: { weeks: '1-3 weeks', steps: ['Submit plant species list and layout diagram', 'ARC checks turf coverage percentage', 'Quick administrative review', 'Written approval issued'], tip: 'Native Texas plants are often fast-tracked due to drought ordinance compliance.' },
  pergola: { weeks: '3-6 weeks', steps: ['Submit exact dimensions and setback measurements', 'Material finish and color review by ARC', 'Height confirmation against CC&R limits', 'Written approval issued'], tip: 'Keep height under 12ft and setbacks at 5ft minimum to avoid extended review.' },
};

export default function DFWHOAMaintenanceGuide() {
  const [selectedProject, setSelectedProject] = useState<ProjectKey>('fence');
  const [result, setResult] = useState<{ timeline: string; steps: string[]; tip: string } | null>(null);

  const projectOptions: { value: ProjectKey; label: string }[] = [
    { value: 'fence', label: '🪵 Privacy Fence' },
    { value: 'paint', label: '🎨 Exterior Paint' },
    { value: 'addition', label: '🏗️ Room Addition' },
    { value: 'driveway', label: '🚗 Driveway' },
    { value: 'landscape', label: '🌿 Landscaping' },
    { value: 'pergola', label: '🏠 Pergola' },
  ];

  const check = () => setResult(TIMELINES[selectedProject]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 32px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', letterSpacing: '2px', marginBottom: '12px' }}>🏘️ DFW HOA SERIES</div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 12px' }}>HOA Exterior Approval Guide</h1>
          <p style={{ fontSize: '16px', color: '#94A3B8', margin: '0', maxWidth: '620px' }}>
            What requires HOA approval in DFW, how to submit requests, and how to get approved faster.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '20px' }}>📋 Approval Requirements</h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            {APPROVAL_ITEMS.map((item, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: '10px', padding: '16px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.required ? '✅' : '⚡'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>{item.project}</span>
                    <span style={{ fontSize: '12px', color: item.required ? '#F5E642′ : '#22C55E', fontWeight: '600' }}>
                      {item.required ? item.typical : 'No approval needed'}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{item.tips}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '20px' }}>🌿 DFW Landscaping Standards</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {LANDSCAPING_STANDARDS.map((ls, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: '10px', padding: '16px 20px', display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🌱</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>{ls.standard}</div>
                  <div style={{ fontSize: '13px', color: '#94A3B8′ }}>{ls.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '20px' }}>🔄 How to Appeal a Denial</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {APPEAL_STEPS.map((step, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: '10px', padding: '14px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>{i + 1}</div>
                <span style={{ fontSize: '14px', color: '#CBD5E1', paddingTop: '3px' }}>{step}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '40px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>⏱️ Approval Timeline Checker</h2>
          <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>Select your project type to see the typical HOA process and tips to move faster.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
            {projectOptions.map(p => (
              <button key={p.value} onClick={() => setSelectedProject(p.value)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', fontSize: '13px', cursor: 'pointer',
                  background: selectedProject === p.value ? '#F5E642′ : ’transparent',
                  color: selectedProject === p.value ? '#0A1628′ : '#94A3B8',
                  borderColor: selectedProject === p.value ? '#F5E642′ : '#334155' }}>
                {p.label}
              </button>
            ))}
          </div>

          <button onClick={check}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            Check Timeline
          </button>

          {result && (
            <div style={{ marginTop: '24px', padding: '20px', background: '#0A1628', borderRadius: '10px' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#F5E642', marginBottom: '16px' }}>Typical Timeline: {result.timeline}</div>
              {result.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ color: '#F5E642', fontWeight: '700′ }}>{i + 1}.</span>
                  <span style={{ fontSize: '14px', color: '#CBD5E1′ }}>{s}</span>
                </div>
              ))}
              <div style={{ background: '#112240', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', color: '#94A3B8', marginTop: '16px' }}>
                💡 <strong style={{ color: '#F5E642′ }}>Speed Tip:</strong> {result.tip}
              </div>
            </div>
          )}
        </section>

        <div style={{ background: '#112240', borderRadius: '10px', padding: '20px', fontSize: '13px', color: '#64748B' }}>
          📋 Texas Property Code 209.00505 governs ARC procedures. HOAs must respond within their CC&R-stated timeframes.
        </div>
      </div>
    </div>
  );
}
