import { useState } from 'react';

export default function ProLnkForMilitary() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id);

  const faqs = [
    { id: 'va', q: 'Can I use my VA home loan with TrustyPro?', a: 'Yes. TrustyPro works with any home regardless of loan type. VA loans require no down payment — TrustyPro helps you protect that investment from day one with AI-powered home health monitoring.' },
    { id: 'pcs', q: 'What happens to my TrustyPro account when I PCS?', a: 'Your origination rights on your current home transfer to the new owner as a selling point — or you retain them if you keep the property. When you purchase your next home, you can add that property to your account.' },
    { id: 'deployment', q: 'How does TrustyPro help during deployment?', a: 'TrustyPro scans your home continuously and alerts your designated contact (spouse, family member) to issues before they become emergencies. Automatic contractor dispatch can handle routine maintenance without requiring anyone to search for a contractor.' },
    { id: 'gi', q: 'Can GI Bill funding cover trade certifications for ProLnk?', a: 'GI Bill (Chapter 33 and Chapter 30) can fund trade certification programs at accredited schools. Many DFW community colleges offer plumbing, electrical, and HVAC certification through approved programs. Check VA.gov for approved programs.' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f172a)', padding: '48px 24px 64px', marginBottom: -32 }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>🎖️</span>
            <span style={{ fontSize: 13, color: '#7dd3fc', letterSpacing: 1, fontWeight: 600 }}>FOR MILITARY FAMILIES</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.15, marginBottom: 16 }}>
            ProLnk for Military Families<br />
            <span style={{ color: '#38bdf8′ }}>VA Benefits + Home Income Opportunities</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 600, margin: 0 }}>
            DFW has 400,000+ veterans and proximity to Fort Hood (3 hrs), Naval Air Station Fort Worth JRB, and major veteran communities across the suburbs.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px 48px' }}>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏠 VA Home Loan + ProLnk</h2>
          <p style={{ color: '#475569', marginBottom: 16 }}>
            VA loans require no down payment — one of the most powerful benefits in the military toolkit. ProLnk and TrustyPro help you protect and maximize that investment.
          </p>
          <div style={{ background: '#eff6ff', borderRadius: 10, padding: 20, border: '1px solid #bfdbfe' }}>
            <p style={{ color: '#1d4ed8', margin: 0, fontWeight: 600, fontSize: 15 }}>
              "Zero down + TrustyPro home monitoring = maximum protection on your VA investment from day one."
            </p>
          </div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🛡️ TrustyPro Benefits for Military</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 48 }}>
          {[
            { emoji: '📡', title: 'Deployment Protection', body: 'AI scan catches issues before they become major while you’re deployed. Your spouse or designated contact gets alerts and automatic contractor dispatch — no need to search for contractors during a stressful time.' },
            { emoji: '📋', title: 'Home Health Record', body: 'Every maintenance event, contractor visit, and repair is logged. When you sell to another military family, the complete home health record transfers — a documented home commands a premium price.' },
            { emoji: '🚚', title: 'PCS-Ready Home', body: 'Origination rights on your home transfer when you sell, or you retain them if you keep the property as a rental. Your TrustyPro investment follows your life — not just your address.' },
          ].map(b => (
            <div key={b.title} style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16 }}>
              <div style={{ fontSize: 28 }}>{b.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{b.title}</div>
                <div style={{ color: '#64748b', fontSize: 14 }}>{b.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0', marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>💼 ProLnk Income for Veterans</h2>
          <p style={{ color: '#475569', marginBottom: 20 }}>Veterans bring something irreplaceable to the trades community: trust. Veteran-owned businesses consistently outperform on ProLnk because of the credibility they carry.</p>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { point: 'Veteran-owned businesses are trusted in the trades community', icon: '⭐' },
              { point: 'GI Bill may fund trade certifications needed to qualify for ProLnk', icon: '🎓' },
              { point: 'Strong candidate for Charter or Founding membership before waitlist fills', icon: '🏅' },
              { point: 'Military discipline translates directly to lead follow-up and job completion rates', icon: '📈' },
            ].map(p => (
              <div key={p.point} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #f1f5f9′ }}>
                <span style={{ fontSize: 18 }}>{p.icon}</span>
                <span style={{ color: '#334155', fontSize: 15 }}>{p.point}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 12, padding: 24, marginBottom: 48 }}>
          <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 8, fontSize: 16 }}>🏛️ Texas Property Tax Exemption</div>
          <p style={{ color: '#78350f', margin: 0, fontSize: 15 }}>
            100% service-connected disabled veterans receive a <strong>100% exemption from Texas property taxes</strong> — potentially saving $6,000–$14,000/year in DFW counties. File with your county appraisal district with your VA disability rating letter.
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>❓ Military FAQ</h2>
        <div style={{ display: 'grid', gap: 8, marginBottom: 48 }}>
          {faqs.map(f => (
            <div key={f.id} style={{ background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <button
                onClick={() => toggle(f.id)}
                style={{ width: '100%', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 15 }}>{f.q}</span>
                <span style={{ fontSize: 20, color: '#64748b', marginLeft: 16 }}>{expanded === f.id ? '−' : '+'}</span>
              </button>
              {expanded === f.id && (
                <div style={{ padding: '0 24px 18px', color: '#475569', fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1d4ed8)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🎖️</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: '12px 0 8px', color: '#f1f5f9′ }}>Apply for Charter Membership</h3>
          <p style={{ color: '#93c5fd', marginBottom: 8 }}>Charter membership closes at 25 partners. Veterans are strong candidates — apply before the waitlist fills.</p>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Lock in $149/mo rate before Charter closes and launch date pricing applies.</p>
          <a href="/apply" style={{ display: 'inline-block', background: '#fff', color: '#1d4ed8', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Apply Now — Honor the Opportunity →
          </a>
        </div>

      </div>
    </div>
  );
}
