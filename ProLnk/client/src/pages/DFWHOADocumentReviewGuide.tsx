import { useState } from 'react';

type DocInfo = {
  what: string;
  lookFor: string[];
  redFlags: string[];
  questions: string[];
};

const docGuide: Record<string, DocInfo> = {
  ccrs: {
    what: 'CC&Rs (Declaration of Covenants, Conditions & Restrictions)',
    lookFor: ['Rental restrictions', 'Pet rules', 'Fence/shed/pool approvals', 'Exterior modification process', 'Parking rules'],
    redFlags: ['Rental bans with no grandfather clause', 'Vague language giving board unlimited authority', 'No amendment process defined'],
    questions: ['Are there any pending amendments to the CC&Rs?', 'How often can the board change rules without member vote?'],
  },
  bylaws: {
    what: 'Bylaws',
    lookFor: ['Board election process', 'Quorum requirements', 'Meeting frequency', 'How assessments are raised', 'Voting rights'],
    redFlags: ['Board can raise dues without member vote', 'No term limits for board members', 'No recall process for board'],
    questions: ['When was the last board election?', 'Has the board ever been recalled or sued by residents?'],
  },
  financials: {
    what: 'Financial Statements (Last 2 Years)',
    lookFor: ['Reserve fund balance', 'Operating budget vs actuals', 'Delinquency rate', 'Pending special assessments', 'Audit or review status'],
    redFlags: ['Reserve fund below 10% of annual budget', 'Delinquency rate above 15%', 'No audit for 3+ years', 'Pending special assessment not disclosed'],
    questions: ['What is the current reserve fund balance?', 'Are there any planned special assessments in the next 24 months?'],
  },
  minutes: {
    what: 'Board Meeting Minutes (Last 12 Months)',
    lookFor: ['Pending litigation', 'Deferred maintenance discussions', 'Vendor disputes', 'Rule changes voted on', 'Owner complaints discussed'],
    redFlags: ['Litigation mentioned but not disclosed', 'Same maintenance issues recurring', 'Hostile board dynamics visible'],
    questions: ['Is the HOA currently in litigation with any homeowner or vendor?', 'What maintenance projects are currently deferred?'],
  },
  reserve: {
    what: 'Reserve Study',
    lookFor: ['Funded percentage (aim for 70%+)', 'Component list (roof, pool, paving)', 'Recommended vs actual contributions', 'Study age (should be within 3 years)'],
    redFlags: ['Funded below 30%', 'No reserve study available', 'Study older than 5 years', 'Major components not listed'],
    questions: ['When was the last reserve study completed?', 'Is the HOA currently following the recommended reserve contribution?'],
  },
  rules: {
    what: 'Rules & Regulations',
    lookFor: ['Enforcement process', 'Fine schedule', 'Appeal process', 'Architectural review timeline', 'Short-term rental policy'],
    redFlags: ['Fines with no cap', 'No formal appeal process', 'ARC approval can take 60+ days', 'Inconsistent enforcement documented'],
    questions: ['How many homes are currently under violation notice?', 'What is the average ARC approval time?'],
  },
};

const docs = [
  { key: 'ccrs', label: '📜 CC&Rs' },
  { key: 'bylaws', label: '🗳️ Bylaws' },
  { key: 'financials', label: '💰 Financials' },
  { key: 'minutes', label: '📝 Meeting Minutes' },
  { key: 'reserve', label: '🏗️ Reserve Study' },
  { key: 'rules', label: '📋 Rules & Regs' },
];

export default function DFWHOADocumentReviewGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const info = selected ? docGuide[selected] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏘️ DFW HOA Document Review Guide</div>
          <p style={{ fontSize: '1.05rem', color: '#374151' }}>
            In DFW, HOAs govern thousands of communities. Before closing, request and review these 6 document types. Texas law (§207.003) requires HOAs to provide resale certificates — use that as your baseline, then dig deeper.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.75rem' }}>🔑 Your Texas Rights as a Buyer</div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.9 }}>
            <li>Seller must provide HOA resale certificate within 10 days of request</li>
            <li>You have 5 days to cancel after receiving all HOA documents (check your contract)</li>
            <li>HOA can charge up to $375 for resale certificate (capped by Texas law)</li>
            <li>Request documents directly from HOA management company, not just the seller</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>📂 Select a Document Type</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: info ? '1.5rem' : 0 }}>
            {docs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelected(selected === key ? null : key)}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: 8,
                  border: '2px solid',
                  borderColor: selected === key ? '#F5E642' : '#E5E7EB',
                  backgroundColor: selected === key ? '#F5E642' : '#fff',
                  color: '#0A1628',
                  fontWeight: selected === key ? 700 : 400,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {info && (
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', color: '#0A1628' }}>{info.what}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: '1rem' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#166534' }}>✅ What to Look For</div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    {info.lookFor.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div style={{ backgroundColor: '#FEF2F2', borderRadius: 8, padding: '1rem' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#991B1B' }}>🚩 Red Flags</div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    {info.redFlags.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1D4ED8' }}>❓ Questions to Ask</div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  {info.questions.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#FEF9C3', borderRadius: 12, padding: '1.5rem', border: '1px solid #FDE047' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>⚡ DFW HOA Watch-Outs</div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.8 }}>
            <li>Frisco, Allen, McKinney HOAs can have very strict exterior rules — read every page</li>
            <li>Master-planned communities (Stonebriar, Watters Creek) often have multiple HOA layers</li>
            <li>New DFW communities may have developer-controlled boards still — bylaws can shift post-developer</li>
            <li>HOA fees in DFW range from $50 to $500+/mo — confirm the exact current amount</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
