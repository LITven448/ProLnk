import { useState } from 'react';

const goals = [
  { emoji: '🏠', number: '1,000,000', label: 'DFW Homes in Health Vault', detail: 'Every home in the vault is a protected asset — repair history, system data, and health scores that travel with the property and inform every future decision.' },
  { emoji: '🔧', number: '50,000', label: 'Vetted Contractor Partners', detail: 'Not just licensed — genuinely vetted. Background-checked, reviewed, and accountable. Every contractor in the network has earned their place.' },
  { emoji: '💰', number: '$2 Billion', label: 'In Improved Home Services', detail: 'By connecting informed homeowners with verified contractors, ProLnk shifts billions in annual DFW home service spending away from predatory pricing and toward fair, transparent transactions.' },
];

const stakeholderImpact: Record<string, string> = {
  'Homeowner': 'When you join the waitlist, add your home to the Health Vault, and hire through ProLnk, you protect your home\’s value, save money on every service call, and contribute verified demand that brings better contractors to your neighborhood.',
  'Contractor': 'When a quality contractor joins ProLnk, they raise the bar for everyone. Their verified presence creates competitive pressure that improves outcomes for homeowners across DFW — and earns them better jobs.',
  'Referrer': 'When you refer a homeowner or contractor to ProLnk, you\’re not just earning — you\’re building the network that makes your neighborhood more protected. Every referral compounds.',
  'Community Leader': 'When you advocate for ProLnk in your HOA, neighborhood association, or business community, you accelerate the trust network. Community credibility is how we reach every home, not just digitally-connected ones.',
};

export default function DFWProLnkImpactPage() {
  const [selectedStakeholder, setSelectedStakeholder] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🌟</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            ProLnk's Impact Goal
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.6 }}>
            What we're building toward — and how individual actions build to collective transformation.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 20, marginBottom: 40 }}>
          {goals.map((g, i) => (
            <div key={i} style={{ background: '#132040', borderRadius: 16, padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ fontSize: 36 }}>{g.emoji}</div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', lineHeight: 1 }}>{g.number}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', margin: '6px 0 10px' }}>{g.label}</div>
                  <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0, fontSize: 15 }}>{g.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🎯 What's your role in this?</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>Select your stakeholder type to see your individual impact:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {Object.keys(stakeholderImpact).map(s => (
              <button key={s} onClick={() => setSelectedStakeholder(selectedStakeholder === s ? null : s)}
                style={{ background: selectedStakeholder === s ? '#F5E642' : '#0A1628', color: selectedStakeholder === s ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 10, padding: '14px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
                {s === 'Homeowner' ? '🏠' : s === 'Contractor' ? '🔧' : s === 'Referrer' ? '🤝' : '🏘️'} {s}
              </button>
            ))}
          </div>
          {selectedStakeholder && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, color: '#CBD5E1', lineHeight: 1.7 }}>
              {stakeholderImpact[selectedStakeholder]}
            </div>
          )}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📈 How Individual Actions Compound</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            One homeowner adds their home → their contractor reviews improve the network → better contractors join → neighboring homeowners get better service. ProLnk's impact isn't linear — it compounds. Every action you take creates ripple effects across DFW.
          </p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 10 }}>Your Action Matters</h2>
          <p style={{ color: '#132040', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
            The path to 1M homes and $2B in better services starts with one waitlist signup. Be part of what ProLnk is building.
          </p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Join the Waitlist →
          </button>
        </div>

      </div>
    </div>
  );
}
