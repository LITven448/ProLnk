import { useState } from 'react';

const TASKS = [
  { label: '🖼️ Hang pictures / TV mount', hrs: 1.5, licensed: false },
  { label: '🚪 Fix doors / hardware', hrs: 1, licensed: false },
  { label: '🔧 Plumbing fixture swap', hrs: 1.5, licensed: true },
  { label: '💡 Light fixture swap', hrs: 1, licensed: true },
  { label: '🪟 Window / screen repair', hrs: 1, licensed: false },
  { label: '🎨 Drywall patch + paint', hrs: 2, licensed: false },
  { label: '🚿 Caulk tubs / showers', hrs: 1, licensed: false },
  { label: '🪚 Furniture assembly', hrs: 1.5, licensed: false },
];

export default function DFWHandymanServiceGuide() {
  const [sel, setSel] = useState<number[]>([]);
  const tog = (i: number) => setSel(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  const totalHrs = sel.reduce((a, i) => a + TASKS[i].hrs, 0);
  const hasLicensed = sel.some(i => TASKS[i].licensed);
  const rate = 85;
  const monthly = Math.round(totalHrs * rate);
  const annual = monthly * 12;
  const btn = (active: boolean) => ({ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' as const, fontSize: 13, background: active ? '#F5E642′ : '#1A2E4A', color: active ? '#0A1628' : '#E8EDF5', fontWeight: active ? 700 : 400 });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>Handyman Service in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>A reliable handyman is one of the most valuable relationships a homeowner can build. Here is how handyman pricing works in DFW, what they can and cannot do, and how to find someone worth keeping long-term.</p>

        {[
          { icon: '💲', title: 'Hourly vs Project Pricing', body: 'DFW handymen typically charge $65-110/hr depending on experience. Simple jobs (under 2 hrs) often have a minimum trip charge of $100-150. Project pricing makes sense for multi-day jobs — ask for a fixed quote with materials itemized separately.' },
          { icon: '🚫', title: 'What Handymen Cannot Do in Texas', body: 'Texas law requires licensed contractors for: any electrical beyond fixture swaps (new circuits, panel work), plumbing beyond fixture swaps (new lines, gas work), HVAC, structural changes, and roofing over a certain dollar threshold. Unlicensed work voids your homeowner insurance — always ask.' },
          { icon: '🤝', title: 'Building a Long-Term Handyman Relationship', body: 'The best handymen have full schedules. Treat yours well: pay promptly, tip on complex jobs, give referrals, do not ghost on appointments. A trusted handyman who knows your home is worth more than the cheapest bid on every job.' },
          { icon: '🔍', title: 'Finding Reliable vs Unreliable in DFW', body: 'Red flags: no business name (just a cell number), no insurance, insists on cash only, cannot give references. ProLnk handymen carry liability insurance and are background checked before being placed on the platform.' },
        ].map(({ icon, title, body }) => (
          <div key={title} style={{ background: '#0F1E35', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{icon} {title}</div>
            <div style={{ color: '#94A3B8', lineHeight: 1.6 }}>{body}</div>
          </div>
        ))}

        <div style={{ background: '#0F1E35', borderRadius: 16, padding: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>🔨 Monthly Task Estimator</div>
          <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 20 }}>Select the tasks you typically need done each month:</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8, marginBottom: 20 }}>
            {TASKS.map((t, i) => (
              <button key={i} onClick={() => tog(i)} style={{ padding: '10px 14px', borderRadius: 8, border: `2px solid ${sel.includes(i) ? '#F5E642' : '#1A2E4A'}`, cursor: 'pointer', fontSize: 13, background: sel.includes(i) ? '#1A2E4A' : '#0A1628', color: '#E8EDF5', textAlign: 'left' as const }}>
                {t.label}
                {t.licensed && <span style={{ color: '#F5A623', fontSize: 11, marginLeft: 6 }}>⚠️ licensed</span>}
                <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 2 }}>~{t.hrs} hrs</div>
              </button>
            ))}
          </div>

          {hasLicensed && (
            <div style={{ background: '#1A2E4A', borderRadius: 8, padding: '12px 16px', marginBottom: 16, color: '#F5A623', fontSize: 13 }}>
              ⚠️ Some selected tasks require a licensed contractor, not just a handyman. ProLnk can match you with the right specialist.
            </div>
          )}

          {sel.length === 0 ? (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, color: '#94A3B8', textAlign: 'center' as const }}>Select tasks above to see your estimate</div>
          ) : (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Est. monthly hours @ ${rate}/hr</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{totalHrs.toFixed(1)} hrs/mo</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Monthly / Annual</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 26 }}>${monthly}/mo — ${annual}/yr</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
