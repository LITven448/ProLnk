import { useState } from 'react';

const situations = [
  {
    id: 'income',
    label: '💬 Talking About Income',
    compliant: [
      '"My results may not be typical. Income depends on your activity and network."',
      '"Some partners earn $X/month — that reflects their effort and network size."',
      '"Here is what ProLnk shows is possible at different activity levels."',
    ],
    avoid: [
      'Showing your own income as guaranteed or typical',
      '"You will make $X if you join" — no guarantees',
      'Sharing screenshots without disclosing they are atypical',
    ],
  },
  {
    id: 'recruiting',
    label: '👥 Recruiting a New Partner',
    compliant: [
      '"ProLnk is a referral platform — income requires active participation."',
      '"There is no guaranteed income. Results depend on your market and effort."',
      '"I can show you the compensation structure — actual earnings vary widely."',
    ],
    avoid: [
      'Implying that joining = income automatically',
      'Downplaying that it requires real work',
      'Exaggerating the ease of reaching Champion tier',
    ],
  },
  {
    id: 'homeowner',
    label: '🏠 Referring a Homeowner',
    compliant: [
      '"ProLnk connects you with vetted service professionals in your area."',
      '"You will receive multiple quotes — you choose who to hire."',
      '"I earn a referral fee when you use ProLnk, disclosed here."',
    ],
    avoid: [
      'Steering homeowners to specific pros you have relationships with',
      'Failing to disclose your financial relationship with ProLnk',
      'Misrepresenting what ProLnk does or how matching works',
    ],
  },
  {
    id: 'social',
    label: '📱 Posting on Social Media',
    compliant: [
      'Always include #ad or #sponsored if you earn from the content',
      'Disclose your partner relationship: "I am a ProLnk partner"',
      'Focus on value delivered — matches made, homes added, services connected',
    ],
    avoid: [
      'Posting income claims without FTC-compliant disclosures',
      'Using testimonials without permission and disclosure',
      'Implying ProLnk is risk-free or guaranteed income',
    ],
  },
];

export default function DFWProLnkEthicsGuide() {
  const [selected, setSelected] = useState(situations[0]);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>⚖️</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: '0.5rem 0 0′ }}>Partner Ethics & Compliance</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.5rem' }}>FTC-compliant language for every situation DFW partners encounter</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s)} style={{ padding: '0.5rem 1rem', borderRadius: 6, border: `2px solid ${selected.id === s.id ? '#F5E642' : '#1E3A5F'}`, backgroundColor: selected.id === s.id ? '#1E3A5F' : 'transparent', color: selected.id === s.id ? '#F5E642′ : '#94A3B8', cursor: ’pointer', fontSize: '0.85rem' }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: '1px solid #166534′ }}>
            <div style={{ color: '#4ADE80', fontWeight: 700, marginBottom: '0.75rem' }}>✅ Compliant Language</div>
            {selected.compliant.map((c, i) => (
              <div key={i} style={{ color: '#CBD5E1', marginBottom: '0.75rem', lineHeight: 1.5, fontSize: '0.88rem', borderLeft: '3px solid #166534', paddingLeft: '0.75rem' }}>{c}</div>
            ))}
          </div>
          <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: '1px solid #7F1D1D' }}>
            <div style={{ color: '#F87171', fontWeight: 700, marginBottom: '0.75rem' }}>❌ What to Avoid</div>
            {selected.avoid.map((a, i) => (
              <div key={i} style={{ color: '#94A3B8', marginBottom: '0.75rem', lineHeight: 1.5, fontSize: '0.88rem', borderLeft: '3px solid #7F1D1D', paddingLeft: '0.75rem' }}>{a}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📋 FTC Income Disclosure Rule</div>
          <div style={{ color: '#94A3B8', lineHeight: 1.6 }}>Any income claim — including testimonials, screenshots, or lifestyle implications — requires a clear, conspicuous disclosure that results are not typical and depend on individual effort. When in doubt, say less and disclose more. ProLnk provides approved disclosure language in your partner dashboard.</div>
        </div>
      </div>
    </div>
  );
}
