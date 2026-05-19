import { useState } from 'react';

const levels = [
  {
    id: 'small',
    label: 'Simple Project',
    sub: 'Paint, flooring, fixtures',
    steps: [
      { icon: '📸', title: 'Daily Photos', detail: 'Photograph start and end of each work day. Focus on areas being covered up — pipes, wires, subfloor. These are your only evidence if something is wrong after walls close.' },
      { icon: '📝', title: 'Written Change Log', detail: 'Keep a running log of any verbal discussions. Even if it does not become a formal CO, having your notes dated is valuable.' },
      { icon: '✅', title: 'Milestone Sign-Off', detail: 'Walk the job at each payment milestone. Do not pay until you have confirmed the milestone is complete and you have signed off in writing.' },
    ]
  },
  {
    id: 'medium',
    label: 'Medium Renovation',
    sub: 'Kitchen, bathroom, addition',
    steps: [
      { icon: '📸', title: 'Daily Photo Documentation', detail: 'Photograph every area before it is covered. Plumbing rough-in, electrical rough-in, insulation, framing — all become invisible once drywall goes up.' },
      { icon: '📅', title: 'Weekly Schedule Review', detail: 'Hold a 15-minute weekly check-in with the contractor. Review the schedule, flag upcoming decisions (tile selection, fixture delivery), and document in writing.' },
      { icon: '🚚', title: 'Materials Delivery Log', detail: 'Sign off on every materials delivery. Verify quantity and quality match the contract spec before the contractor bills for materials.' },
      { icon: '📋', title: 'Inspection Attendance', detail: 'Attend every city inspection. The inspector works for you — ask questions, request the inspection report, and ensure any corrections are documented.' },
    ]
  },
  {
    id: 'large',
    label: 'Major Project',
    sub: 'Full remodel, new construction',
    steps: [
      { icon: '📸', title: 'Daily Photo & Video Log', detail: 'Full walkthrough video every day. Narrate what you are seeing. This becomes your project timeline and is legally valuable if disputes arise.' },
      { icon: '📈', title: 'Schedule of Values Tracking', detail: 'Request a schedule of values at project start. Track every line item against actual completion percentage before approving draws.' },
      { icon: '🦺', title: 'Owner Rep or PM', detail: 'For projects over $150K, consider hiring an independent owner representative or project manager. They cost 3-5% but save 10-15% by catching problems early.' },
      { icon: '📋', title: 'Subcontractor Roster', detail: 'Get the names of all subcontractors before they step on site. Verify licenses via TDLR. Collect lien waivers from each at every payment.' },
      { icon: '📝', title: 'RFI Log', detail: 'Maintain a Request for Information log. Every question to the contractor and every answer gets logged with date and name. Eliminates "I never said that" disputes.' },
    ]
  },
];

export default function DFWProjectManagementGuide2026() {
  const [level, setLevel] = useState<string>('medium');
  const active = levels.find(l => l.id === level)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Project Management Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>How to manage a DFW renovation without losing your budget. Select your project complexity.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {levels.map(l => (
            <button key={l.id} onClick={() => setLevel(l.id)}
              style={{ flex: 1, padding: '12px 8px', borderRadius: 10, border: '2px solid', borderColor: level === l.id ? '#F5E642' : '#1e3a5f', background: level === l.id ? '#F5E642' : '#0f2340', color: level === l.id ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>
              <div>{l.label}</div>
              <div style={{ fontWeight: 400, marginTop: 2, fontSize: 11 }}>{l.sub}</div>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {active.steps.map((step, i) => (
            <div key={i} style={{ background: '#0f2340', border: '1px solid #1e3a5f', borderRadius: 14, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 28, minWidth: 40 }}>{step.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{step.title}</div>
                <p style={{ margin: 0, color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2340', border: '1px solid #1e3a5f', borderRadius: 16, padding: 20, marginTop: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 700, color: '#F5E642' }}>🔒 ProLnk Health Vault</p>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Every photo, CO, lien waiver, inspection report, and payment record from your ProLnk project is automatically stored in your Home Health Vault — permanently attached to your property address and available at resale.</p>
        </div>
      </div>
    </div>
  );
}
