import { useState } from 'react';

const roles = [
  { id: 'homeowner', label: 'DFW Homeowner', icon: '🏠', value: 'These 5,000 pages exist for you. Instead of relying on contractor websites with built-in bias, you get independent guidance on every home service decision — from what a fair HVAC quote looks like to how to read a foundation warranty to when to file an insurance claim vs pay out of pocket.' },
  { id: 'pro', label: 'Home Service Professional', icon: '🔧', value: 'ProLnk uses this content library to educate the homeowners you work with. Homeowners who understand the scope of work are better customers — clearer expectations, fewer disputes, and faster close rates. Joining ProLnk means your business is backed by the best-educated homeowner audience in DFW.' },
  { id: 'investor', label: 'Investor or Analyst', icon: '📈', value: '5,000 DFW-specific pages represents a significant SEO and trust moat. Content at this depth attracts high-intent homeowners who are ready to hire — not just researching. The content library feeds both the homeowner funnel and the pro recruitment pipeline, compounding the marketplace flywheel.' },
  { id: 'buyer', label: 'Home Buyer or Real Estate', icon: '🔑', value: 'Buying a DFW home means inheriting its HVAC system, foundation history, and roof age. ProLnk’s content helps buyers understand exactly what they are taking on — from clay soil risk zones by zip code to average repair costs by home age and construction type.' },
  { id: 'media', label: 'Press or Media', icon: '📰', value: 'ProLnk is the first DFW-focused home services marketplace built on a foundation of expert content. The 5,000-page milestone reflects a deliberate strategy: earn homeowner trust through education first, transactions second. This differentiates ProLnk from national lead-gen sites that prioritize volume over value.' },
];

const categories = [
  { label: 'HVAC', pages: '300+', icon: '❄️' },
  { label: 'Foundation', pages: '200+', icon: '🏗️' },
  { label: 'Roofing', pages: '150+', icon: '🏠' },
  { label: 'Plumbing', pages: '120+', icon: '🚿' },
  { label: 'DFW Cities', pages: '100+', icon: '📍' },
  { label: 'Electrical', pages: '80+', icon: '⚡' },
  { label: 'Financial', pages: '75+', icon: '💰' },
  { label: 'Careers', pages: '60+', icon: '💼' },
];

export default function DFWProLnkFiveThoandPagesSummary() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = roles.find(r => r.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW · 2026 Milestone</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>ProLnk 5,000 Pages: What It Means and What Is Next</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          5,000 pages of DFW homeowner content is not a vanity metric — it is the deepest, most locally-specific home services resource library ever built for the Dallas-Fort Worth market. Here is what that means depending on who you are.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 28 }}>
          {categories.map(c => (
            <div key={c.label} style={{ background: '#0f2037', borderRadius: 10, padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{c.pages}</div>
              <div style={{ color: '#94a3b8', fontSize: 11 }}>{c.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2037', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 12 }}>🔮 What Is Next for ProLnk</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Launching the ProLnk marketplace: homeowner-to-pro matching in 2026</li>
            <li>Home Health Vault: permanent, transferable records for every DFW property</li>
            <li>AI-powered quote comparison and contractor vetting built into search</li>
            <li>Expanding to Houston, Austin, and San Antonio markets in 2027</li>
            <li>Mobile app for on-site homeowner guidance and contractor coordination</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, marginBottom: 12 }}>👤 How do 5,000 pages help you?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {roles.map(r => (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              style={{
                background: selected === r.id ? '#1a3a5c' : '#0f2037',
                border: selected === r.id ? '2px solid #F5E642' : '2px solid #1e3a5f',
                borderRadius: 8, padding: '12px 16px', color: '#fff',
                textAlign: 'left', cursor: 'pointer', fontSize: 15,
              }}
            >
              {r.icon} {r.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#0f2037', border: '1px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{result.icon} For {result.label}s</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{result.value}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🚀 Join the ProLnk Waitlist</div>
          <p style={{ color: '#0A1628', fontSize: 14 }}>The marketplace launches in 2026. Join the waitlist today — homeowners get early access to vetted pros, and service professionals lock in Charter Member pricing.</p>
        </div>
      </div>
    </div>
  );
}
