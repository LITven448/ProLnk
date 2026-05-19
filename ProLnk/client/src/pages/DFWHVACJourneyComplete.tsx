import { useState } from 'react';

const knowledgeAreas = [
  { id: 'maintenance', label: '🔧 Maintenance & Prevention', description: 'Annual tune-ups, filter changes, coil cleaning — the foundation of HVAC longevity.' },
  { id: 'money', label: '💰 Money & Negotiation', description: 'When to spend, when to save, how to negotiate in DFW’s competitive HVAC market.' },
  { id: 'equity', label: '🏠 Home Equity & Value', description: 'How HVAC age and condition directly affects what buyers will pay for your home.' },
  { id: 'appreciation', label: '📈 Appreciation & Market', description: 'DFW submarket dynamics and how a new system creates buyer premiums.' },
  { id: 'prolnk', label: '⚡ ProLnk & Vetted Pros', description: 'How the ProLnk platform eliminates HVAC service anxiety for DFW homeowners.' },
];

const actionPlans: Record<string, { title: string; steps: string[]; cta: string }> = {
  maintenance: {
    title: 'Your Maintenance Action Plan',
    steps: [
      'Schedule a tune-up this month if you haven’t had one in 12+ months ($89-$150)',
      'Set a recurring October calendar reminder for annual fall HVAC service',
      'Replace filters every 60-90 days — mark it on your calendar now',
      'Keep a simple log of all service dates, techs, and findings',
    ],
    cta: 'Find a vetted DFW HVAC pro for your tune-up on ProLnk',
  },
  money: {
    title: 'Your HVAC Money Action Plan',
    steps: [
      'If your system is 8+ years old, open a $800/month replacement savings account now',
      'Get your baseline quote this season — before you need it urgently',
      'Always request itemized quotes (labor vs. parts) from every contractor',
      'Plan any replacement for October-November or February-March for 10-20% savings',
    ],
    cta: 'Get 3 competing quotes from vetted DFW pros on ProLnk',
  },
  equity: {
    title: 'Your Home Equity Action Plan',
    steps: [
      'Get a full HVAC inspection if your system is 8+ years old — know your exposure',
      'Gather all existing maintenance records into one folder',
      'Budget for replacement 12-18 months before you plan to list',
      'Ask your realtor: "How is our HVAC age likely to affect our sale price?"',
    ],
    cta: 'Protect your equity — get a DFW HVAC assessment via ProLnk',
  },
  appreciation: {
    title: 'Your Appreciation Action Plan',
    steps: [
      'Research your DFW submarket’s average sale price for similar homes',
      'Get a quote for a new 16+ SEER2 system — know the investment needed',
      'Track your neighborhood’s HVAC disclosure patterns in recent sales',
      'Document your current system’s age, brand, and SEER rating for future buyers',
    ],
    cta: 'Get a DFW HVAC upgrade quote from ProLnk vetted pros',
  },
  prolnk: {
    title: 'Your ProLnk Action Plan',
    steps: [
      'Join the ProLnk waitlist — DFW HVAC pros are being vetted and added now',
      'Add your home’s HVAC details to the Home Health Vault for permanent records',
      'Refer one neighbor — they get vetted service, you build your ProLnk network',
      'When you need HVAC service, use ProLnk first — not Google, not Angi',
    ],
    cta: 'Join the ProLnk waitlist — your DFW HVAC future starts here',
  },
};

const milestones = [
  { icon: '📚', label: 'DFW HVAC Basics', done: true },
  { icon: '🌡️', label: 'Climate & System Sizing', done: true },
  { icon: '🔧', label: 'Maintenance Mastery', done: true },
  { icon: '💰', label: 'Money & Negotiation', done: true },
  { icon: '🏠', label: 'Equity & Value', done: true },
  { icon: '📈', label: 'Appreciation Factors', done: true },
  { icon: '⚡', label: 'The ProLnk Difference', done: true },
  { icon: '🎓', label: 'Journey Complete', done: true },
];

export default function DFWHVACJourneyComplete() {
  const [selected, setSelected] = useState<string | null>(null);
  const plan = selected ? actionPlans[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🎓</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>Your DFW HVAC Journey Is Complete</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
            You now know more about DFW HVAC than 90% of homeowners in the metroplex. Here's what to do with that knowledge.
          </p>
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 16, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏆 Knowledge Milestones Unlocked</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {milestones.map(m => (
              <div key={m.label} style={{ background: '#0A1628', border: '1px solid #22C55E', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{m.icon}</span>
                <span style={{ fontSize: 13, color: '#4ADE80', fontWeight: 600 }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🗺️ Your Personalized HVAC Action Plan</h2>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Which topic resonated most? Get your tailored next steps:</p>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {knowledgeAreas.map(k => (
              <button key={k.id} onClick={() => setSelected(k.id)}
                style={{ background: selected === k.id ? '#F5E642′ : '#0A1628', color: selected === k.id ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 10, padding: '14px 16px', cursor: ’pointer', textAlign: 'left', fontWeight: 600, fontSize: 15 }}>
                <div>{k.label}</div>
                {selected !== k.id && <div style={{ fontSize: 12, color: '#64748B', marginTop: 4, fontWeight: 400 }}>{k.description}</div>}
              </button>
            ))}
          </div>
          {plan && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18, marginBottom: 14 }}>{plan.title}</div>
              <ol style={{ margin: 0, paddingLeft: 20 }}>
                {plan.steps.map((step, i) => (
                  <li key={i} style={{ color: '#CBD5E1', lineHeight: 1.8, marginBottom: 6, fontSize: 14 }}>{step}</li>
                ))}
              </ol>
              <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5E642', borderRadius: 8, color: '#0A1628', fontWeight: 700, fontSize: 14 }}>
                ➜ {plan.cta}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🚀</div>
          <div style={{ fontWeight: 800, fontSize: 22, color: '#0A1628', marginBottom: 10 }}>Ready to put your knowledge to work?</div>
          <div style={{ color: '#1A2A40', fontSize: 15, lineHeight: 1.6, marginBottom: 4 }}>
            ProLnk is building the smarter way for DFW homeowners to manage HVAC — vetted pros, transparent pricing, and a permanent home health record in the Vault.
          </div>
          <div style={{ color: '#1A2A40', fontWeight: 700, fontSize: 15, marginTop: 12 }}>Join the waitlist. Your DFW home deserves better than phone book roulette.</div>
        </div>
      </div>
    </div>
  );
}
