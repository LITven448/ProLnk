import { useState } from 'react';

type Situation = 'primary' | 'senior' | 'disabled' | 'veteran' | 'investor';

const profiles: Record<Situation, { label: string; protections: string[]; howToClaim: string[]; whatProtected: string[]; notProtected: string[]; deadline: string }> = {
  primary: {
    label: 'Primary Homeowner',
    protections: [
      'Forced sale protection: Cannot be forced to sell your home to satisfy most debts (credit cards, medical bills, personal loans)',
      'Homestead exemption (tax): $100,000 off appraised value for school district taxes (2023 law — largest in TX history)',
      'General exemption: Additional $25,000 for non-school taxes in most DFW counties',
      'Cap on appraisal increases: 10%/yr max increase on homestead property',
      'Equity protection: Cannot be stripped via judgment liens for non-mortgage debts',
    ],
    howToClaim: [
      'File Form 50-114 with your DFW county appraisal district (Dallas CAD, Tarrant CAD, Collin CAD, etc.)',
      'Deadline: April 30 of the tax year (late filing allowed with good cause)',
      'Required: Texas driver\’s license or ID matching property address',
      'File once — exemption auto-renews each year unless you move',
      'Homestead designation (legal protection) is automatic — no filing needed',
    ],
    whatProtected: ['Primary residence only (not rental properties)', 'All equity regardless of amount', 'Against: credit card debt, medical bills, most lawsuits', 'Against: IRS liens (federal — partial protection only)'],
    notProtected: ['Mortgage (purchase money lien)', 'Home equity loans (HELOC)', 'Property taxes', 'HOA liens in some cases', 'Mechanic\’s liens for unpaid contractors'],
    deadline: 'April 30 annually for exemption; designation is automatic',
  },
  senior: {
    label: 'Homeowner 65+',
    protections: [
      'Additional $10,000 school tax exemption on top of standard homestead',
      'School tax freeze: Your school district taxes are frozen at age 65 — they can never increase',
      'Same forced sale protections as primary homeowner',
      'Surviving spouse continuation: spouse inherits freeze if they are 55+',
      'DFW-specific: Tarrant and Dallas CAD offer additional optional exemptions — varies by city',
    ],
    howToClaim: [
      'File Form 50-114 with "Over 65″ checkbox — same form as standard homestead',
      'File in the year you turn 65 or the following year',
      'School tax freeze is automatic once exemption is filed',
      'Contact your specific DFW city — many offer additional senior exemptions beyond state law',
      'Irving, Garland, Plano, Arlington all have optional city-level senior exemptions',
    ],
    whatProtected: ['All primary homestead protections plus enhanced tax benefits', 'School taxes frozen forever after age 65', 'Surviving spouse retains freeze at age 55+'],
    notProtected: ['Same exceptions as primary homeowner apply', 'Freeze only on school taxes — non-school taxes can still increase'],
    deadline: 'April 30; can file late up to 2 years back',
  },
  disabled: {
    label: 'Disabled Homeowner',
    protections: [
      'Same $100,000 school district exemption as primary homeowner',
      'Additional $10,000 exemption (same as over-65 — cannot combine with over-65)',
      'School tax freeze: same as over-65 once disabled exemption is in place',
      'Cannot combine over-65 and disabled — choose the more beneficial',
      'Disability definition: unable to engage in gainful employment per SSA determination',
    ],
    howToClaim: [
      'File Form 50-114 with disability documentation',
      'Accepted proof: Social Security disability award letter or physician\’s statement',
      'DFW county will verify disability status',
      'Re-application may be required if disability status changes',
    ],
    whatProtected: ['All primary homestead protections', 'Enhanced school tax benefits', 'School tax freeze same as senior exemption'],
    notProtected: ['Same exceptions as primary homeowner', 'Cannot combine with over-65 exemption'],
    deadline: 'April 30; retroactive filing allowed up to 2 years',
  },
  veteran: {
    label: 'Veteran Homeowner',
    protections: [
      '100% disabled veteran: Full property tax exemption on one property of any value',
      'Partial disability: Percentage exemption ($5K–$12K) based on VA rating',
      'Surviving spouse: Inherits 100% exemption if veteran was 100% disabled at death',
      'DFW-specific: Tarrant County has additional optional veteran exemptions',
      'Homestead forced sale protections apply in full',
    ],
    howToClaim: [
      'File Form 50-135 (disabled veterans) with your DFW county appraisal district',
      'Required: VA disability rating letter',
      '100% disabled veterans: file for full exemption — no income or value limits',
      'Surviving spouse: file Form 50-114 plus veteran documentation',
    ],
    whatProtected: ['Primary residence — full exemption for 100% disabled vets', 'All homestead forced sale protections', 'Surviving spouse inherits if 55+ and veteran was 100% disabled'],
    notProtected: ['Exemption is per-person, not per-property — applies to one primary residence', 'Rental properties not covered'],
    deadline: 'April 30; retroactive to January 1 of that tax year',
  },
  investor: {
    label: 'Investment Property Owner',
    protections: [
      'No homestead exemption available — rental/investment properties are excluded',
      'Cannot claim homestead designation on property where you do not reside',
      'Standard Texas forced sale protections do NOT extend to investment properties',
      'Your primary residence is still protected even if you own investment properties',
      'Investment property equity IS subject to judgment liens if you lose a lawsuit',
    ],
    howToClaim: ['No homestead exemption to claim on investment properties', 'Ensure your primary residence homestead is filed if you have a personal home', 'Consult a TX real estate attorney about LLC structuring for investment property liability'],
    whatProtected: ['Your primary residence (separate from investment property)', 'Business entity assets if properly structured (LLC, etc.)', 'Retirement accounts — separate protection under Texas law'],
    notProtected: ['Investment property equity', 'Investment property from judgment liens', 'Investment property from forced sale for debts'],
    deadline: 'N/A for investment property — but file homestead on your primary residence by April 30',
  },
};

export default function DFWHomestead2026Guide() {
  const [situation, setSituation] = useState<Situation | null>(null);
  const [activeTab, setActiveTab] = useState<'protections' | 'claim' | 'scope'>('protections');

  const profile = situation ? profiles[situation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>TEXAS HOMESTEAD LAW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Texas Homestead Protection Guide for DFW Homeowners</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 24, lineHeight: 1.6 }}>
          Texas has the strongest homestead protections in the US. There are two distinct things: homestead designation (legal protection) and homestead exemption (tax savings). They are different — both matter.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>⚠️ DESIGNATION vs. EXEMPTION</div>
          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>🛡️ Homestead Designation (Legal Protection)</div>
              <div style={{ color: '#9BA3B8', fontSize: 13 }}>Automatic — you do not file anything. Protects your home from forced sale for most debts the moment you move in.</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>💰 Homestead Exemption (Tax Savings)</div>
              <div style={{ color: '#9BA3B8', fontSize: 13 }}>Must be filed by April 30. Reduces your taxable property value. In DFW this saves most homeowners $1,200–$3,000/yr in taxes.</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>🏠 WHAT IS YOUR SITUATION?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {([['primary', '🏠 Primary Homeowner'], ['senior', '👴 Homeowner 65+'], ['disabled', '♿ Disabled Homeowner'], ['veteran', '🎖️ Veteran'], ['investor', '💼 Investment Property']] as [Situation, string][]).map(([k, label]) => (
              <button key={k} onClick={() => { setSituation(k); setActiveTab('protections'); }} style={{ background: situation === k ? '#F5E642′ : '#111E35', color: situation === k ? '#0A1628' : '#E8EAF0', border: '1px solid ' + (situation === k ? '#F5E642' : '#1E2D45'), borderRadius: 8, padding: '12px 14px', cursor: ’pointer', fontWeight: 700, fontSize: 13, textAlign: 'left' }}>{label}</button>
            ))}
          </div>
        </div>

        {profile && (
          <div>
            <div style={{ color: '#F5E642', fontSize: 16, fontWeight: 800, marginBottom: 16 }}>{profile.label}</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {[['protections', '🛡️ Protections'], ['claim', '📋 How to Claim'], ['scope', '🔍 What\’s Covered']] .map(([k, label]) => (
                <button key={k} onClick={() => setActiveTab(k as 'protections' | 'claim' | 'scope')} style={{ background: activeTab === k ? '#F5E642′ : '#111E35', color: activeTab === k ? '#0A1628' : '#E8EAF0', border: '1px solid ' + (activeTab === k ? '#F5E642' : '#1E2D45'), borderRadius: 8, padding: '8px 14px', cursor: ’pointer', fontWeight: 700, fontSize: 12 }}>{label}</button>
              ))}
            </div>
            {activeTab === 'protections' && (
              <div style={{ display: 'grid', gap: 8 }}>
                {profile.protections.map((p, i) => <div key={i} style={{ background: '#111E35', borderRadius: 8, padding: 14, fontSize: 13, color: '#C8D0E0', lineHeight: 1.6 }}>• {p}</div>)}
                <div style={{ background: '#111E35', borderRadius: 8, padding: 12, fontSize: 12, color: '#9BA3B8′ }}>⏰ Deadline: {profile.deadline}</div>
              </div>
            )}
            {activeTab === 'claim' && (
              <div style={{ display: 'grid', gap: 8 }}>
                {profile.howToClaim.map((s, i) => <div key={i} style={{ background: '#111E35', borderRadius: 8, padding: 14, fontSize: 13, color: '#C8D0E0', lineHeight: 1.6 }}>{i + 1}. {s}</div>)}
              </div>
            )}
            {activeTab === 'scope' && (
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ background: '#111E35', borderRadius: 10, padding: 16 }}>
                  <div style={{ color: '#22C55E', fontWeight: 700, marginBottom: 10 }}>✅ PROTECTED</div>
                  {profile.whatProtected.map((w, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 6, padding: 8, fontSize: 13, color: '#C8D0E0', marginBottom: 6 }}>• {w}</div>)}
                </div>
                <div style={{ background: '#111E35', borderRadius: 10, padding: 16 }}>
                  <div style={{ color: '#EF4444', fontWeight: 700, marginBottom: 10 }}>❌ NOT PROTECTED</div>
                  {profile.notProtected.map((n, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 6, padding: 8, fontSize: 13, color: '#C8D0E0', marginBottom: 6 }}>• {n}</div>)}
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 24, color: '#6B7894', fontSize: 12, lineHeight: 1.6 }}>
          This guide is for informational purposes. Consult a licensed Texas attorney for your specific situation. ProLnk connects DFW homeowners with verified local professionals for all home service needs.
        </div>
      </div>
    </div>
  );
}
