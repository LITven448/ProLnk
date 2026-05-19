import { useState } from 'react';

const CONCERNS = [
  {
    concern: 'I want to avoid probate for my DFW home',
    rec: 'Revocable Living Trust',
    why: 'A living trust lets your home pass directly to heirs without going through Texas probate court. DFW real estate probate typically takes 6 to 18 months and costs 3 to 5% of estate value in attorney and court fees. A trust avoids all of this.',
    vs: 'A will still requires probate in Texas. A living trust does not — it transfers the home immediately upon your death through the trustee, with no court involvement.',
    steps: [
      '1. Hire a Texas estate planning attorney to draft the trust (cost: $1,500 to $3,500)',
      '2. The attorney prepares a new deed transferring your home into the trust',
      '3. New deed is recorded at Dallas / Tarrant / Collin / Denton County Clerk',
      '4. Update your homeowners insurance to reflect trust ownership',
      '5. Notify your mortgage lender (Garn-St. Germain Act typically exempts revocable trusts from due-on-sale)',
    ],
    homestead: 'CRITICAL: In Texas, transferring your home to a revocable living trust where you are the trustee preserves your homestead exemption. If you transfer to an irrevocable trust or one where you are not the primary beneficiary, you may lose the exemption.',
  },
  {
    concern: 'I want to protect my home from probate AND long-term care costs',
    rec: 'Consult elder law attorney — consider Texas Lady Bird Deed',
    why: 'An irrevocable Medicaid Asset Protection Trust can shield assets from Medicaid estate recovery, but the 5-year lookback period means planning must happen well in advance. A Texas Lady Bird Deed is often simpler and preserves more control.',
    vs: 'Unlike a revocable trust, an irrevocable trust cannot be changed. You lose control of the asset. A Lady Bird Deed (Enhanced Life Estate Deed) lets you keep full control during life and avoids probate without the drawbacks of irrevocability.',
    steps: [
      '1. Consult a Texas elder law attorney (different specialty than general estate planning)',
      '2. Understand the 5-year Medicaid lookback — transfers within 5 years can cause ineligibility',
      '3. A Texas Lady Bird Deed often achieves the same probate-avoidance goal more simply',
      '4. Lady Bird Deed cost: $300 to $500 attorney fee, recorded at county clerk',
    ],
    homestead: 'A Texas Lady Bird Deed preserves the homestead exemption, allows you to retain control during life, and passes the property at death without probate. It is frequently the best single-property solution for DFW homeowners.',
  },
  {
    concern: 'I want my home to pass to my children easily when I die',
    rec: 'Revocable Living Trust or Lady Bird Deed',
    why: 'Both tools avoid probate. A living trust is more comprehensive (covers all assets). A Texas Lady Bird Deed is simpler and cheaper if the house is your primary concern. Texas does not have a standard Transfer-on-Death deed — Lady Bird Deed is the equivalent.',
    vs: 'A regular will requires probate. A Lady Bird Deed or living trust does not. For a single property with straightforward heirs, a Lady Bird Deed at $300 to $500 is often sufficient.',
    steps: [
      'Option A — Lady Bird Deed: Attorney drafts an Enhanced Life Estate Deed ($300 to $500). You retain full control during life. At death, home passes to named beneficiaries without probate.',
      'Option B — Living Trust: More comprehensive, covers all assets. Attorney drafts trust and deed ($1,500 to $3,500). Better for larger estates or multiple properties.',
    ],
    homestead: 'Lady Bird Deed preserves the Texas homestead exemption throughout your lifetime. It is the most cost-efficient probate-avoidance tool for a single DFW property.',
  },
  {
    concern: 'I am remarried and want to protect my children from a prior marriage',
    rec: 'Revocable Living Trust with specific distribution provisions',
    why: 'Texas community property law means your current spouse has rights to property acquired during marriage. A properly structured trust ensures your separate property (home from prior marriage or inherited) passes to your children.',
    vs: 'A simple will is easier to contest and can conflict with Texas community property rights. A trust with clear distribution instructions and proper separate property classification is more defensible.',
    steps: [
      '1. Work with a Texas estate planning attorney who specializes in blended family issues',
      '2. Clearly classify property as separate vs. community in the trust document',
      '3. Specify distribution to children from prior marriage vs. current spouse explicitly',
      '4. Consider a Qualified Terminable Interest Property (QTIP) trust for blended families',
      '5. A pre- or post-nuptial agreement can reinforce the trust structure',
    ],
    homestead: 'IMPORTANT: In Texas, a surviving spouse has a constitutional right to occupy the homestead for life, even if the trust names your children as beneficiaries. This cannot be fully eliminated without careful legal planning — discuss with your attorney.',
  },
];

export default function DFWTexasTrustGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏛️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Texas Living Trust Guide</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Revocable trusts, Lady Bird deeds, homestead exemption impact, and how to transfer DFW property into a trust</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
          {[
            ['Avoids Probate', 'Home passes to heirs immediately — no court, no 6 to 18 month wait, no 3 to 5% estate fees', '#F0FDF4', '#166534'],
            ['Homestead Preserved', 'Revocable trust where you are trustee keeps your Texas homestead exemption intact', '#FFF9E6', '#92400E'],
            ['You Stay in Control', 'Revocable trust can be changed, amended, or revoked anytime during your lifetime', '#EFF6FF', '#1E40AF'],
          ].map(([title, desc, bg, color], i) => (
            <div key={i} style={{ background: bg, borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontWeight: 700, color, fontSize: 14, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color: '#475569′ }}>{desc}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#64748B', marginBottom: 16 }}>Select your estate planning concern to see recommendations, trust vs. will comparison, and next steps:</p>
        <div style={{ display: 'grid', gap: 12 }}>
          {CONCERNS.map((c, i) => (
            <div
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: '#fff', borderRadius: 10, padding: '1.2rem', cursor: 'pointer',
                border: selected === i ? '2px solid #F5E642′ : '2px solid transparent',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ fontWeight: 600, color: '#0A1628', flex: 1 }}>{c.concern}</div>
                <div style={{ background: '#F0FDF4', color: '#166534', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {c.rec}
                </div>
              </div>

              {selected === i && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '0.8rem', fontSize: 14, color: '#334155', lineHeight: 1.6, marginBottom: 12 }}>
                    {c.why}
                  </div>
                  <div style={{ background: '#EFF6FF', borderRadius: 8, padding: '0.8rem', marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: '#1E40AF', fontSize: 12, marginBottom: 4 }}>TRUST VS. WILL</div>
                    <div style={{ fontSize: 13, color: '#1E3A8A', lineHeight: 1.6 }}>{c.vs}</div>
                  </div>
                  <div style={{ background: '#F0FDF4', borderRadius: 8, padding: '0.8rem', marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: '#166534', fontSize: 12, marginBottom: 6 }}>STEPS TO TRANSFER YOUR DFW PROPERTY</div>
                    {c.steps.map((s, j) => (
                      <div key={j} style={{ fontSize: 13, color: '#166534', marginBottom: 6, lineHeight: 1.5 }}>{s}</div>
                    ))}
                  </div>
                  <div style={{ background: '#FFF9E6', borderRadius: 8, padding: '0.8rem', border: '1px solid #F5E642′ }}>
                    <div style={{ fontWeight: 700, color: '#92400E', fontSize: 12, marginBottom: 4 }}>TEXAS HOMESTEAD EXEMPTION IMPACT</div>
                    <div style={{ fontSize: 13, color: '#78350F', lineHeight: 1.6 }}>{c.homestead}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.2rem', marginTop: 24, textAlign: 'center' }}>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>
            Texas trust law is unique — always use a licensed Texas estate planning attorney. The State Bar of Texas (texasbar.com) has a referral service.
          </div>
        </div>
      </div>
    </div>
  );
}
