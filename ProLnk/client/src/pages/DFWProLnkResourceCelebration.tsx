import { useState } from 'react';

type UseType = 'homeowner' | 'contractor' | 'partner' | 'investor';

const STATS = [
  { emoji: '📄', value: '3,000', label: 'Resource Pages' },
  { emoji: '🏠', value: '500K+', label: 'DFW Homes Covered' },
  { emoji: '🔧', value: '200+', label: 'Trade Categories' },
  { emoji: '📅', value: '18 mo', label: 'To Build' },
];

const LIBRARY_VALUE: Record<UseType, { headline: string; mostValuable: string; examples: string[] }> = {
  homeowner: {
    headline: 'Your home has never been better understood.',
    mostValuable: '🏠 Home Care Guides + Home Health Vault Records',
    examples: [
      'Seasonal maintenance checklists tailored to DFW climate.',
      'Step-by-step guides for every major home system.',
      'Complete service history for your property — permanent and private.',
      'Contractor vetting checklist: what to ask before you hire.',
      'Cost guides for 200+ repair and renovation categories.',
    ],
  },
  contractor: {
    headline: 'The most prepared homeowners in DFW are waiting for you.',
    mostValuable: '📋 Job Prep Guides + Homeowner Education Resources',
    examples: [
      'Homeowners who read our guides arrive with realistic expectations.',
      'Job-specific prep checklists reduce site visits for quotes.',
      'Trade category pages showcase verified credentials to homeowners.',
      'Service area guides help homeowners understand local code requirements.',
      'Review frameworks give homeowners language to describe their issues accurately.',
    ],
  },
  partner: {
    headline: 'The library is your recruiting engine.',
    mostValuable: '🤝 Network Income Guides + Origination Education',
    examples: [
      'How the 4-level cascade works — explained for every prospect you recruit.',
      'Origination rights explainer: what it means to bring a home into the Vault.',
      'Charter partner economics: the math behind why now is the only time.',
      'Scripts for recruiting contractors and homeowners to your network.',
      'Leaderboard guides: what the top DFW partners have in common.',
    ],
  },
  investor: {
    headline: 'The resource library is a defensible data asset.',
    mostValuable: '📊 Market Coverage + Data Moat Documentation',
    examples: [
      '3,000 indexed pages create organic SEO coverage across DFW home service queries.',
      'Every resource page deepens the Home Health Vault data layer.',
      'Content is a homeowner acquisition channel with near-zero marginal cost.',
      'Contractor recruitment content reduces CAC by 40% vs. paid channels.',
      'The library compounds: more homes in the Vault → better content → more homes.',
    ],
  },
};

export default function DFWProLnkResourceCelebration() {
  const [useType, setUseType] = useState<UseType>('homeowner');

  const labels: Record<UseType, string> = {
    homeowner: '🏠 Homeowner',
    contractor: '🔧 Contractor',
    partner: '🤝 Partner',
    investor: '📊 Investor',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 56 }}>🎉</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>3,000 Pages. Complete.</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>The most comprehensive DFW homeowner resource library ever built.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 36 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{s.emoji}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 28, borderTop: '4px solid #F5E642′ }}>
          <p style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            What took 18 months to build cannot be replicated overnight. Every page deepens the Home Health Vault data layer, drives organic homeowner discovery, and educates the DFW market on what trustworthy home services actually look like. This library is both a user resource and a competitive moat.
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12, textAlign: 'center' }}>How do you use ProLnk?</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {(Object.keys(labels) as UseType[]).map(u => (
              <button key={u} onClick={() => setUseType(u)}
                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: useType === u ? '#F5E642′ : '#1e3a5f', color: useType === u ? '#0A1628' : '#94a3b8' }}>
                {labels[u]}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>{LIBRARY_VALUE[useType].headline}</h3>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 16px', marginBottom: 16, fontWeight: 600, color: '#e2e8f0', fontSize: 14 }}>
            Most valuable for you: {LIBRARY_VALUE[useType].mostValuable}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LIBRARY_VALUE[useType].examples.map((e, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 16px', color: '#94a3b8', fontSize: 13 }}>✦ {e}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
