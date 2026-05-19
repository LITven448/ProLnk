import { useState } from 'react';

const findings = ['Clean History', 'Quitclaim Deed', 'Foreclosure History', 'Estate Sale', 'Multiple Owners'];

const explanations: Record<string, { meaning: string; whatItMeans: string[]; titleInsurance: string }> = {
  'Clean History': {
    meaning: 'Every transfer in the chain has a warranty deed, proper consideration, and no gaps in ownership. This is what you want to see.',
    whatItMeans: [
      '✅ Grantor (seller) had legal authority to convey title',
      '✅ Deed was properly signed, notarized, and recorded',
      '✅ No gaps or missing links in ownership chain',
      '✅ All prior liens released and recorded',
      '✅ Title insurance will issue standard policy with minimal exceptions',
    ],
    titleInsurance: 'Standard ALTA Owner Policy with minimal schedule B exceptions. Your title insurer is comfortable with the chain.',
  },
  'Quitclaim Deed': {
    meaning: 'A quitclaim deed conveys only whatever interest the grantor may have — nothing more. It contains no warranty that the grantor actually owns the property. In Texas, quitclaims in residential chains are a red flag.',
    whatItMeans: [
      '⚠️ Grantor made no guarantee they actually owned the property',
      '⚠️ Common in divorce transfers, estate distributions, tax sales',
      '⚠️ Breaks the warranty deed chain — prior owners cannot be held liable',
      '⚠️ Title company may require extensive additional documentation',
      '⚠️ May indicate clouded title from prior dispute or probate issue',
    ],
    titleInsurance: 'Title insurer will likely add Schedule B exceptions or require a title curative action (affidavit of heirship, court order, or quiet title suit) before issuing full coverage.',
  },
  'Foreclosure History': {
    meaning: 'The property was previously foreclosed. In Texas, non-judicial foreclosure is fast (21 days notice), which can leave loose ends — junior liens, right of redemption issues, or improper notice defects.',
    whatItMeans: [
      '⚠️ Check if foreclosure was judicial or non-judicial (Texas default = non-judicial)',
      '⚠️ Verify all junior liens were properly wiped out in foreclosure',
      '⚠️ Texas has no statutory right of redemption for residential (unlike other states)',
      '⚠️ HOA super-priority claims may survive some foreclosures',
      '⚠️ If foreclosed by HOA — first mortgage lien likely survived and is now your problem',
    ],
    titleInsurance: 'Underwriters scrutinize foreclosure chains heavily. Expect additional requirements including a foreclosure review letter from title counsel and potentially a gap indemnity.',
  },
  'Estate Sale': {
    meaning: 'Property sold out of a deceased person estate. Texas allows multiple transfer methods — probate, muniment of title, affidavit of heirship — each with different risk profiles.',
    whatItMeans: [
      '📋 Verify method of transfer: formal probate vs. affidavit of heirship vs. muniment of title',
      '⚠️ Affidavit of heirship: not a court order — can be challenged by unknown heirs for 4 years',
      '✅ Formal probate with court order: strongest title for estate sales',
      '⚠️ If multiple heirs involved, verify all signed the deed (missing heir = cloud on title)',
      '📜 Check for any estate creditor claims that could attach to property',
    ],
    titleInsurance: 'Affidavit of heirship transfers may result in an exception for rights of unknown heirs. Muniment of title requires recording the court order. Formal probate deed is cleanest.',
  },
  'Multiple Owners': {
    meaning: 'Property held by multiple parties — joint tenants, tenants in common, LLCs, trusts. Each ownership structure has different requirements for a valid conveyance.',
    whatItMeans: [
      '👥 Joint Tenancy: all owners must sign — one owner cannot convey alone',
      '👥 Tenants in Common: each owner can sell their undivided interest independently',
      '🏢 LLC ownership: requires authority from operating agreement and proper member/manager signing',
      '🏛️ Trust ownership: trustee signs — verify trust document authorizes sale',
      '⚠️ Deceased co-owner: surviving joint tenant must record affidavit of survivorship',
    ],
    titleInsurance: 'Title will require all parties with an ownership interest to sign the deed. For entities, title will require formation documents, authorization resolutions, and good standing certificates.',
  },
};

export default function DFWChainOfTitleGuide2026() {
  const [activeFinding, setActiveFinding] = useState('Clean History');
  const g = explanations[activeFinding];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⛓️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Chain of Title Guide 2026</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', margin: 0 }}>Understanding property ownership history in DFW — how to read deeds, spot quitclaims, and know when title insurance protects you.</p>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 10, padding: '14px 20px', marginBottom: 28, border: '1px solid #2D3F5A' }}>
          <p style={{ margin: 0, fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>Texas Rule of Thumb:</span> A clean chain of title uses warranty deeds going back 50+ years, with no gaps, no quitclaims in the residential chain, and every lien showing a recorded release. Select a finding below to understand what it means for your purchase.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
          {findings.map(f => (
            <button key={f} onClick={() => setActiveFinding(f)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: activeFinding === f ? '#F5E642′ : '#1E2D45', color: activeFinding === f ? '#0A1628' : '#94A3B8', transition: ’all 0.2s' }}>{f}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, border: '1px solid #2D3F5A' }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 10px' }}>📖 What this means</h3>
            <p style={{ color: '#CBD5E1', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{g.meaning}</p>
          </div>
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, border: '1px solid #2D3F5A' }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 14px' }}>🔍 Key considerations</h3>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {g.whatItMeans.map((item, i) => (
                <li key={i} style={{ fontSize: 14, color: '#CBD5E1', paddingLeft: 20, position: 'relative', lineHeight: 1.5 }}>
                  <span style={{ position: 'absolute', left: 0, color: '#F5E642′ }}>›</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, border: '1px solid #2D3F5A' }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 10px' }}>🛡️ Title Insurance Impact</h3>
            <p style={{ color: '#CBD5E1', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{g.titleInsurance}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
