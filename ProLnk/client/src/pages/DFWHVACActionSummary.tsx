import { useState } from 'react';

const actions = [
  { id: 'filter', label: 'Change your air filter', emoji: '🔄', detail: 'In DFW summers, filters should be changed every 3 to 4 weeks. A clogged filter raises your energy bill 5 to 15% and stresses the blower motor. Cost: $8 to $25. Time: 5 minutes.', done: false },
  { id: 'shutoffs', label: 'Locate emergency shutoffs', emoji: '🚨', detail: 'Find your main electrical disconnect (usually outside near the condenser) and your gas shutoff if applicable. In an emergency you need to act in seconds, not minutes. Do it now while conditions are calm.', done: false },
  { id: 'age', label: 'Find your system age', emoji: '📅', detail: 'Look at the data plate on your outdoor condenser unit. Find the manufacture date. If it is 12 or more years old, start budgeting for replacement. A failure during a DFW heat wave can cost you $3,000 in emergency fees alone.', done: false },
  { id: 'warranty', label: 'Find your warranty status', emoji: '📄', detail: 'Check your original installation paperwork or call the installer with your serial number. Many DFW homeowners have expired warranties and do not know it. Knowing means you plan — not react.', done: false },
  { id: 'prolnk', label: 'Join ProLnk waitlist', emoji: '⭐', detail: 'Takes 90 seconds. You get early access, priority matching with vetted DFW HVAC pros, and Home Health Vault registration for your property. The waitlist closes at 500 applications.', done: false },
];

export default function DFWHVACActionSummary() {
  const [completed, setCompleted] = useState<string[]>([]);

  const toggle = (id: string) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const count = completed.length;
  const pct = Math.round((count / actions.length) * 100);

  const getMessage = () => {
    if (count === 0) return 'Start with the filter — it takes 5 minutes and pays off immediately.';
    if (count === 1) return 'Good start. Each action compounds the one before it.';
    if (count === 2) return 'You are ahead of 80% of DFW homeowners already.';
    if (count === 3) return 'Three down. Your system is safer and you are saving money.';
    if (count === 4) return 'One left. The ProLnk waitlist connects everything you have learned to real action.';
    return 'Complete. You are now a proactive DFW homeowner. That puts you in rare company.';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#F5E642', marginBottom: '16px', lineHeight: 1.2 }}>
            5 Actions for This Week
          </h1>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            Knowledge without action is just information. These 5 actions take less than 30 minutes combined and protect a system worth $11,000 on average in DFW.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '14px', padding: '24px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '15px', color: '#94a3b8' }}>Actions completed</span>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#F5E642' }}>{count} / {actions.length}</span>
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: '100px', height: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, backgroundColor: '#F5E642', height: '100%', borderRadius: '100px', transition: 'width 0.4s ease' }} />
          </div>
          <p style={{ marginTop: '16px', fontSize: '15px', color: '#e2e8f0', lineHeight: 1.6 }}>{getMessage()}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
          {actions.map((action, i) => {
            const isDone = completed.includes(action.id);
            return (
              <div
                key={action.id}
                onClick={() => toggle(action.id)}
                style={{
                  backgroundColor: isDone ? '#0f2040' : '#0f2040',
                  border: `2px solid ${isDone ? '#F5E642' : '#1e3a5f'}`,
                  borderRadius: '14px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: `2px solid ${isDone ? '#F5E642' : '#4a5568'}`, backgroundColor: isDone ? '#F5E642' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px', color: '#0A1628', fontWeight: '800' }}>
                    {isDone ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: '24px' }}>{action.emoji}</span>
                  <span style={{ fontSize: '17px', fontWeight: '700', color: isDone ? '#F5E642' : '#fff', textDecoration: isDone ? 'line-through' : 'none' }}>{action.label}</span>
                </div>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginLeft: '42px' }}>{action.detail}</p>
              </div>
            );
          })}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: '14px', padding: '28px', textAlign: 'center' }}>
          <p style={{ fontSize: '20px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>Action 5 is the multiplier</p>
          <p style={{ fontSize: '15px', color: '#0A1628', marginBottom: '16px' }}>The ProLnk waitlist connects you to vetted pros who handle actions 1 through 4 — every year, automatically.</p>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', borderRadius: '8px', padding: '14px 28px', display: 'inline-block', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
            Join the ProLnk Waitlist →
          </div>
        </div>
      </div>
    </div>
  );
}
