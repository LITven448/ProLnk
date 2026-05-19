import { useState } from 'react';

const tiers = [
  { name: 'Starter', matches: '0–9', partners: '0–4', income: '$0–$800/mo', color: '#6B7280′ },
  { name: 'Builder', matches: '10–49', partners: '5–19', income: '$800–$3,200/mo', color: '#3B82F6′ },
  { name: 'Connector', matches: '50–99', partners: '20–49', income: '$3,200–$8,000/mo', color: '#8B5CF6′ },
  { name: 'Champion', matches: '100+', partners: '50+', income: '$8,000–$25,000+/mo', color: '#F5E642′ },
];

const paths: Record<string, { timeline: string; steps: string[]; championIncome: string }> = {
  Starter: {
    timeline: '12–18 months',
    steps: ['Hit 10 matches to unlock Builder perks', 'Recruit 5 active partners in your network', 'Add 20+ homes to the Vault', 'Scale to 50+ matches for Connector status', 'Build a team of 50 active partners for Champion'],
    championIncome: '$8,000–$25,000+/mo',
  },
  Builder: {
    timeline: '8–12 months',
    steps: ['Scale matches to 50+ to reach Connector', 'Recruit 15+ more partners to your network', 'Focus on partner activation, not just recruitment', 'Add homes consistently — 5+ per month', 'Hit 100 matches + 50 partners for Champion'],
    championIncome: '$8,000–$25,000+/mo',
  },
  Connector: {
    timeline: '3–6 months',
    steps: ['Push through 100 total matches', 'Grow network to 50 active partners', 'Coach your Builder-tier partners to level up', 'Maximize origination rights with home additions', 'Champion status unlocks exclusive events + bonuses'],
    championIncome: '$8,000–$25,000+/mo',
  },
  Champion: {
    timeline: 'Already there!',
    steps: ['Maintain 100+ matches per period', 'Keep 50+ partners active in your network', 'Mentor Connectors — their growth compounds yours', 'Origination rights generate passive income permanently', 'Access exclusive Charter events and bonus pools'],
    championIncome: '$8,000–$25,000+/mo',
  },
};

export default function DFWProLnkDFWChampionsGuide() {
  const [selectedTier, setSelectedTier] = useState('Starter');
  const path = paths[selectedTier];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏆</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: 0 }}>DFW Champions Program</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.5rem' }}>What top DFW ProLnk partners look like — and how to get there</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {tiers.map(t => (
            <div key={t.name} style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: `2px solid ${selectedTier === t.name ? '#F5E642' : '#1E3A5F'}`, cursor: 'pointer' }} onClick={() => setSelectedTier(t.name)}>
              <div style={{ color: t.color, fontWeight: 700, fontSize: '1.1rem' }}>{t.name}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: 4 }}>Matches: {t.matches}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Partners: {t.partners}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginTop: 6 }}>{t.income}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 0.5rem' }}>Your Path from {selectedTier} → Champion</h2>
          <div style={{ color: '#94A3B8', marginBottom: '1rem' }}>⏱ Estimated timeline: <span style={{ color: '#fff' }}>{path.timeline}</span></div>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {path.steps.map((s, i) => (
              <li key={i} style={{ color: '#CBD5E1', marginBottom: '0.5rem', lineHeight: 1.5 }}>{s}</li>
            ))}
          </ul>
          <div style={{ marginTop: '1rem', backgroundColor: '#1E3A5F', borderRadius: 6, padding: '0.75rem', color: '#F5E642', fontWeight: 600 }}>
            💰 Champion income potential: {path.championIncome}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', backgroundColor: '#0F2040', borderRadius: 8, padding: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 0.75rem' }}>What Champions Actually Do</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {[['🔁', 'Match 100+', 'Consistent referrals to service pros'], ['👥', 'Lead a Team', '50+ active partners driving network income'], ['🏠', 'Add Homes', 'Origination rights compound forever']].map(([icon, title, desc]) => (
              <div key={title} style={{ textAlign: 'center', padding: '0.75rem' }}>
                <div style={{ fontSize: '1.5rem' }}>{icon}</div>
                <div style={{ color: '#fff', fontWeight: 600, marginTop: 4 }}>{title}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
