import { useState } from 'react';

const HVAC_SITUATIONS = [
  'My AC stopped working and it is hot',
  'I need a tune-up before summer',
  'I am getting quotes for a new system',
  'I had a bad experience with a contractor',
  'I want to track my HVAC history',
  'My primary tech is not available',
  'I am buying or selling a home',
];

type HelpMap = Record<string, { headline: string; points: string[]; vault: string }>;

const HOW_PROLNK_HELPS: HelpMap = {
  'My AC stopped working and it is hot': {
    headline: '⚡ Emergency Match — Vetted Tech, Fast',
    points: ['ProLnk matches you to available vetted DFW techs — no waiting days for your usual contractor', 'All ProLnk techs are licensed, insured, and background-checked before appearing on the platform', 'Describe your symptoms once — ProLnk routes to techs with the right experience for your issue', 'No lead auction: one match, not five contractors calling you at once'],
    vault: 'The repair is logged to your Home Health Vault so every future tech understands your system history.',
  },
  'I need a tune-up before summer': {
    headline: '📅 Pre-Summer Tune-Up Match',
    points: ['DFW HVAC demand spikes in May — ProLnk connects you to techs with availability before the rush', 'Vetted techs run the full tune-up checklist, not a shortened version to fit more appointments', 'You receive a written summary of findings, not just a verbal report', 'Annual tune-up relationship builds your system history over time'],
    vault: 'Tune-up findings are stored in your Home Health Vault — model, refrigerant charge, filter condition, and any advisory flags.',
  },
  'I am getting quotes for a new system': {
    headline: '💰 Competitive Quotes Without the Games',
    points: ['ProLnk does not sell leads to the highest bidder — techs compete on quality, not speed to answer the phone', 'All quotes come with matched equipment specs so you can compare apples to apples', 'ProLnk techs know DFW load requirements and will not install an oversized system to inflate the ticket', 'Rebate eligibility is flagged automatically for heat pump and high-efficiency quotes'],
    vault: 'New system install is recorded in your Home Health Vault with model, SEER2, warranty dates, and install tech information.',
  },
  'I had a bad experience with a contractor': {
    headline: '🛡️ Vetted Techs Only — No Surprises',
    points: ['Every ProLnk tech passes licensing verification, insurance check, and background screening', 'Reviews are from verified DFW homeowners who completed a real service job — no anonymous ratings', 'You see the tech profile before they arrive: certifications, experience, and review history', 'If something goes wrong, ProLnk mediates — you are not on your own'],
    vault: 'Every visit is documented so if you need to dispute work or file a claim, you have a timestamped record.',
  },
  'I want to track my HVAC history': {
    headline: '🗂️ Home Health Vault — Your Permanent HVAC Record',
    points: ['Every ProLnk service visit is automatically logged with date, tech, findings, and cost', 'Model number, serial number, install date, and refrigerant charge are stored from day one', 'When you sell your home, your HVAC history is a documented asset buyers can see', 'When you call a new tech, they arrive already knowing your system history'],
    vault: 'The Vault is the core of how ProLnk makes your home smarter over time — every visit adds to it.',
  },
  'My primary tech is not available': {
    headline: '🔄 Your On-Demand Backup Network',
    points: ['ProLnk is built for exactly this — vetted backup techs available when your primary is booked', 'Share your system history with the ProLnk-matched tech so they arrive informed', 'All ProLnk work is logged to your Vault, so your primary tech can see what was done on their return', 'No awkward situation — ProLnk is a platform, not a competing contractor'],
    vault: 'Backup visits are stored alongside your primary tech history so there are no gaps in your record.',
  },
  'I am buying or selling a home': {
    headline: '🏠 HVAC History as a Home Asset',
    points: ['A documented HVAC history increases buyer confidence and can justify asking price', 'ProLnk generates a Home Health Vault report you can share during the inspection process', 'Buyers can verify system age, last service date, and any known issues without guessing', 'Sellers with ProLnk Vault history avoid renegotiation after inspection surprises'],
    vault: 'The Home Health Vault travels with the home — the new owner inherits the full documented history.',
  },
};

const PILLARS = [
  { icon: '✅', title: 'Vetted Before They Arrive', desc: 'Every ProLnk tech is license-verified, insured, and background-checked. You see their profile before they knock.' },
  { icon: '🚫', title: 'No Lead-Buying Games', desc: 'ProLnk does not auction your request to the fastest-calling contractor. One match, selected on fit.' },
  { icon: '🤝', title: 'Match Only When Work Is Done', desc: 'ProLnk is paid when a job is completed, not when a lead is sold. Our incentives align with your outcome.' },
  { icon: '🗂️', title: 'Home Health Vault', desc: 'Every visit is logged permanently. Your HVAC history belongs to you — and travels with your home.' },
];

export default function DFWHVACProLnkFinalPage() {
  const [selected, setSelected] = useState('');
  const help = HVAC_SITUATIONS.find(s => s === selected) ? HOW_PROLNK_HELPS[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>How ProLnk Makes DFW HVAC Better</h1>
        <p style={{ color: '#8899AA', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          ProLnk is not a contractor directory. It is a vetted matching platform that changes how DFW homeowners and HVAC professionals find each other — and how your home's health is tracked over time.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🏗️ The Four ProLnk Pillars</h2>
          {PILLARS.map(p => (
            <div key={p.title} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{p.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: '#8899AA', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📍 Your HVAC Situation → How ProLnk Helps</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {HVAC_SITUATIONS.map(s => (
              <button key={s} onClick={() => setSelected(s)} style={{ background: selected === s ? '#F5E642′ : '#162030', color: selected === s ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: selected === s ? 700 : 400, fontSize: 14 }}>{s}</button>
            ))}
          </div>
          {help && (
            <div style={{ background: '#162030', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, color: '#F5E642′ }}>{help.headline}</div>
              {help.points.map(pt => <div key={pt} style={{ marginBottom: 10, fontSize: 14, color: '#ddd', lineHeight: 1.6 }}>→ {pt}</div>)}
              <div style={{ marginTop: 16, background: '#0F2040', borderRadius: 8, padding: 12, fontSize: 13, color: '#8899AA', lineHeight: 1.6 }}>🗂️ {help.vault}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Ready to Try ProLnk?</div>
          <div style={{ color: '#0A1628', fontSize: 15, marginBottom: 16 }}>Join the waitlist. First 500 pros and 5,000 homeowners get charter access — and lock in the lowest pricing ProLnk will ever offer.</div>
          <div style={{ display: 'inline-block', background: '#0A1628', color: '#F5E642', fontWeight: 800, fontSize: 15, padding: '14px 32px', borderRadius: 8 }}>Join the ProLnk Waitlist →</div>
        </div>
      </div>
    </div>
  );
}
