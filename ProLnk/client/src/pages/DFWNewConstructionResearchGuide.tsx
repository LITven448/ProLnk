import { useState } from 'react';

const builderAreas = [
  { builder: 'Lennar', area: 'Frisco / Prosper' },
  { builder: 'D.R. Horton', area: 'McKinney / Anna' },
  { builder: 'Toll Brothers', area: 'Southlake / Westlake' },
  { builder: 'K. Hovnanian', area: 'Flower Mound / Lewisville' },
  { builder: 'Meritage Homes', area: 'North Fort Worth / Keller' },
  { builder: 'Other / Unknown', area: 'DFW General' },
];

const checklistItems = [
  { category: 'Builder License & Legal', emoji: '📋', items: [
    'Verify TRCC (Texas Residential Construction Commission) builder registration — search at trcc.state.tx.us',
    'Check TDLR (Texas Department of Licensing and Regulation) for any disciplinary actions',
    'Search builder name + "lawsuit" or "BBB" — look at the last 24 months specifically',
    'Verify builder\’s general contractor license with Texas Department of Licensing',
  ]},
  { category: 'Financial Stability', emoji: '💰', items: [
    'Search for builder UCC filings or mechanics liens on their active DFW projects via county clerk records',
    'Check if builder is publicly traded — review earnings reports for warning signs (layoffs, cost-cutting language)',
    'Ask sales agent: "How many homes has this builder delivered in this community so far?" — healthy builders move at consistent pace',
    'Google "[Builder name] DFW delays 2024 2025" — buyer forums reveal financial problems before press does',
  ]},
  { category: 'MUD Tax Districts', emoji: '🏛️', items: [
    'Ask the sales agent for the MUD (Municipal Utility District) tax rate — some DFW MUDs add $3,000–8,000/year to your tax bill',
    'Request the MUD bond authorization amount — tells you how much debt the district can issue',
    'Check TCEQ\’s MUD database (tceq.texas.gov) for the district\’s current bond balance and tax rate history',
    'Ask: "When does the MUD tax phase out?" — some districts reduce rates once bonds are retired (10–20 year horizon)',
  ]},
  { category: 'Permit & Build Quality', emoji: '🔍', items: [
    'Pull the city\’s permit portal and look at how many failed inspections builder has on record for other lots in the community',
    'Find buyer Facebook groups: "[Builder] [Community Name] Owners" — people post photos of construction defects',
    'Visit the community during framing stage — look for proper moisture barriers, straight framing, and correct spacing',
    'Ask what warranty is provided: 1-year workmanship, 2-year mechanical, 10-year structural is Texas standard minimum',
  ]},
];

const salesAgentQuestions = [
  'What is the current and projected MUD tax rate for this community?',
  'How many homes have been delivered in this phase? How many remain?',
  'What is the estimated completion timeline and how accurate have past timelines been?',
  'What inspections does the city perform during construction?',
  'Can I bring my own independent inspector during framing and pre-drywall stages?',
  'What is included in the warranty and who administers warranty claims?',
  'Are there any deed restrictions or HOA architectural controls I should know about?',
  'Has this builder completed other communities in DFW? Can you provide references from buyers?',
];

export default function DFWNewConstructionResearchGuide() {
  const [selected, setSelected] = useState('');
  const [showChecklist, setShowChecklist] = useState(false);

  const selectedBuilder = builderAreas.find(b => `${b.builder}|${b.area}` === selected);

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>DFW New Construction Research Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 16, margin: 0 }}>Buying new in DFW means navigating builders, MUD taxes, and salespeople who work for the builder — not you.</p>
        </div>

        <div style={{ backgroundColor: '#FEF3C7', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #F59E0B' }}>
          <p style={{ color: '#92400E', fontWeight: 600, margin: 0 }}>⚡ Critical reminder: The sales agent at a new construction community works for the builder, not for you. Bring your own buyer\'s agent (usually free to you — builder pays commission) and consider a real estate attorney for contract review. Builder contracts heavily favor builders.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Select your builder + area to get started</h2>
          <select value={selected} onChange={e => { setSelected(e.target.value); setShowChecklist(false); }}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '2px solid #E2E8F0', fontSize: 15, color: '#0A1628', backgroundColor: '#F9FAFB', marginBottom: 16 }}>
            <option value="">Select builder and area...</option>
            {builderAreas.map(b => (
              <option key={`${b.builder}|${b.area}`} value={`${b.builder}|${b.area}`}>{b.builder} — {b.area}</option>
            ))}
          </select>
          {selected && (
            <button onClick={() => setShowChecklist(true)}
              style={{ width: '100%', backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
              🔍 Generate Research Checklist
            </button>
          )}
        </div>

        {showChecklist && selectedBuilder && (
          <div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>Research checklist: {selectedBuilder.builder} in {selectedBuilder.area}</div>
            </div>
            {checklistItems.map(section => (
              <div key={section.category} style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <h3 style={{ color: '#0A1628', fontWeight: 700, marginBottom: 16 }}>{section.emoji} {section.category}</h3>
                {section.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                    <span style={{ minWidth: 24, height: 24, borderRadius: 6, backgroundColor: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: '#0A1628' }}>{i + 1}</span>
                    <p style={{ color: '#334155', margin: 0, lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: '#0A1628', fontWeight: 700, marginBottom: 16 }}>💬 Questions to ask the sales agent</h3>
              {salesAgentQuestions.map((q, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid #F1F5F9', color: '#334155' }}>❓ {q}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
