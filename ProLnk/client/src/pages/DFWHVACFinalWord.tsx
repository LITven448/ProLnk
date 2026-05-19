import { useState } from 'react';

const stages: { id: string; label: string }[] = [
  { id: 'new_homeowner', label: '🏠 I\’m a new DFW homeowner — just getting started' },
  { id: 'preventive', label: '🛡️ I already maintain my system — looking to optimize' },
  { id: 'aging_system', label: '⏳ My system is aging — preparing for replacement' },
  { id: 'post_repair', label: '🔧 I just had a repair — wondering what\’s next' },
  { id: 'post_install', label: '✅ I just got a new system — want to protect it' },
];

const finalWords: Record<string, { headline: string; truth: string; actions: string[]; promise: string }> = {
  new_homeowner: {
    headline: 'The most important thing you can do right now is understand your system.',
    truth: 'DFW is one of the hardest climates in the country on HVAC equipment. A new homeowner who learns their system early — filter size, refrigerant type, service history — will spend thousands less over the next decade than one who waits for something to break.',
    actions: [
      '📋 Find your system\’s model and serial number (on the outdoor unit)',
      '🗓️ Schedule a professional inspection before your first DFW summer',
      '🔍 Confirm your refrigerant type — R-22, R-410A, or new R-454B',
      '📱 Set a monthly filter change reminder for June–September',
      '📁 Store your documents in ProLnk\’s Home Health Vault',
    ],
    promise: 'ProLnk\’s DFW HVAC network is here every season — from your first inspection to your first replacement.',
  },
  preventive: {
    headline: 'You\’re already winning — the final 20% is where most homeowners leave money on the table.',
    truth: 'Preventive maintenance gets you 80% of the way. The final 20% is about optimizing for DFW\’s specific conditions: ERCOT peak demand management, R-410A phase-out awareness, smart thermostat integration, and knowing exactly when replacement economics beat repair costs.',
    actions: [
      '⚡ Enroll your smart thermostat in Oncor or CoServ demand response for bill credits',
      '🌡️ Pre-cool your home to 72°F before 3pm on ERCOT high-demand days',
      '📊 Track your energy bills — a 15%+ spike in summer often signals refrigerant loss',
      '🔄 Ask your tech about R-454B-compatible systems for your next replacement',
      '💰 Calculate your 5-year repair vs. replace number if system is over 10 years old',
    ],
    promise: 'You\’re a model DFW homeowner. ProLnk exists to connect people like you with the pros who match your standard.',
  },
  aging_system: {
    headline: 'Don\’t wait for failure. Plan your replacement on your timeline, not the heatwave\’s.',
    truth: 'The average DFW homeowner spends $2,000–$4,000 extra on HVAC replacement when they wait for emergency failure in summer. R-410A phase-out is accelerating that cost. The best gift you can give yourself is a planned spring replacement before the system decides for you.',
    actions: [
      '📅 Target spring installation (March–April) — best pricing and availability',
      '💵 Get 3 quotes now, even if you\’re not ready to buy — know your number',
      '🧾 Check for Oncor/CoServ rebates before current programs expire',
      '📐 Ask each contractor to do a Manual J load calculation — not just a guess',
      '🔋 Consider adding a communicating thermostat to your new system for long-term efficiency',
    ],
    promise: 'ProLnk helps DFW homeowners replace on their terms — not in a panic. We\’ll have 3 vetted quotes to you within 24 hours.',
  },
  post_repair: {
    headline: 'A repair bought you time. Use it wisely.',
    truth: 'Every repair on an aging DFW system is an investment decision. If your system is over 10 years old, the repair likely delayed the inevitable. The question is: do you control the next chapter, or does a July breakdown?',
    actions: [
      '🧮 Ask your tech for an honest 5-year repair likelihood assessment',
      '📋 Document what was repaired and why — for your records and next tech',
      '🗓️ If over 12 years old, plan a spring replacement as insurance',
      '💧 Watch for new symptoms: unusual sounds, uneven cooling, humidity spikes',
      '⚡ Monitor your energy bill — inefficiency often follows aging compressor repairs',
    ],
    promise: 'ProLnk\’s DFW pros give honest assessments — not repair upsells. We\’ll tell you when replacement is smarter.',
  },
  post_install: {
    headline: 'Your new system is an investment. The next 3 months determine the next 15 years.',
    truth: 'A new HVAC system installed in DFW can last 15–20 years with proper care, or fail early with neglect. The first summer is the most critical. Proper break-in, filter discipline, and warranty registration in the first 90 days set the trajectory for everything that follows.',
    actions: [
      '📝 Register your warranty within 30 days — many require online registration',
      '🔍 Schedule a 30-day post-install check — confirm refrigerant charge and airflow',
      '📅 Set monthly filter reminders June–September; every 60 days in off-season',
      '📱 Connect your smart thermostat to your utility\’s demand response program',
      '📁 Store your installation invoice, model numbers, and warranty in Home Health Vault',
    ],
    promise: 'ProLnk tracks your system from day one. We\’ll remind you when it\’s time for maintenance — and reach vetted pros when you need them.',
  },
};

export default function DFWHVACFinalWord() {
  const [stage, setStage] = useState<string | null>(null);
  const result = stage ? finalWords[stage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK • DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>The Final Word on<br />DFW HVAC</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          After everything — the guides, the comparisons, the checklists — here's what truly matters for DFW homeowners. The most important things to remember. The ProLnk promise. And what great HVAC ownership actually looks like.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>🏆 What Great DFW HVAC Ownership Looks Like</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🗓️', text: 'Maintenance is scheduled, not reactive. Filter changes happen before the first 90°F day.' },
              { icon: '📋', text: 'System history is documented. Model, serial, every service visit, every repair.' },
              { icon: '💰', text: 'Replacement is planned. You know your system\’s age, refrigerant type, and your 5-year number.' },
              { icon: '🤝', text: 'You have a trusted DFW HVAC pro — not a search-engine-at-midnight emergency contact.' },
              { icon: '🏡', text: 'Your home stays comfortable through DFW\’s worst summers without drama or emergency bills.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginBottom: 32, borderLeft: '4px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 10 }}>THE PROLNK PROMISE FOR DFW HVAC</div>
          <p style={{ color: '#CBD5E1', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            ProLnk exists because finding a trustworthy HVAC pro in DFW has always been harder than it should be. We pre-vet every contractor. We bring you 3 honest quotes, not one upsell. We're here for the $89 filter change and the $11,000 system replacement. Our mission is simple: no DFW homeowner should suffer through a Texas summer because they couldn't find a pro they trust.
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🎯 Your Personalized Final Word</h2>
        <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 16 }}>Where are you in your HVAC journey?</p>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {stages.map((s) => (
            <button key={s.id} onClick={() => setStage(s.id)} style={{
              background: stage === s.id ? '#F5E642' : '#1E3A5F', color: stage === s.id ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 8, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: 600,
            }}>{s.label}</button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#F5E642', marginBottom: 12 }}>"{result.headline}"</div>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{result.truth}</p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#94A3B8', fontWeight: 700, fontSize: 12, marginBottom: 8 }}>YOUR NEXT MOVES</div>
              {result.actions.map((a, i) => (
                <div key={i} style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.6, marginBottom: 6 }}>{a}</div>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 13, color: '#94A3B8', fontStyle: 'italic' }}>{result.promise}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '28px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Ready to Work With DFW's Best HVAC Pros?</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginBottom: 4 }}>ProLnk matches DFW homeowners with pre-vetted HVAC contractors.</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>Free quotes. No obligation. No emergency panic pricing.</div>
        </div>
      </div>
    </div>
  );
}
