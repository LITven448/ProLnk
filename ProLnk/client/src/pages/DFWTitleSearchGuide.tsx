import { useState } from 'react';

type TitleIssue = {
  insurance: string;
  action: string;
  severity: 'low' | 'medium' | 'high';
};

const titleIssues: Record<string, TitleIssue> = {
  lien: {
    insurance: 'Owner\’s title policy covers undisclosed liens discovered after closing — insurer pays to resolve or compensates you for loss',
    action: 'Before closing: demand seller clear the lien from proceeds or get a lien release. Do not close with an open lien.',
    severity: 'high',
  },
  easement: {
    insurance: 'Survey exception in standard policies may exclude easements shown on survey — ask for survey coverage endorsement',
    action: 'Review easement terms: utility easements are normal; drainage or access easements across your buildable area are significant',
    severity: 'medium',
  },
  forgery: {
    insurance: 'Title insurance covers forged deeds in the chain of title — one of the core coverages for this rare but serious risk',
    action: 'No action needed before closing; this is exactly what title insurance is designed to protect against',
    severity: 'low',
  },
  heir: {
    insurance: 'If an undisclosed heir surfaces post-closing with a claim, your owner\’s title policy defends you and covers losses',
    action: 'Ensure title search goes back at least 40 years (standard in Texas). Ask title company about estates in chain of title.',
    severity: 'medium',
  },
  judgment: {
    insurance: 'Undisclosed judgments against prior owners that attach to property are covered — insurer must resolve the judgment',
    action: 'Title company should catch all judgments in search. If found, seller must clear before closing.',
    severity: 'high',
  },
  encroachment: {
    insurance: 'Standard policies often exclude encroachments shown on survey — require the ALTA/NSPS survey and endorsement',
    action: 'Encroachments onto neighbor\’s property or from neighbor onto yours: get in writing who resolves it and by when',
    severity: 'medium',
  },
};

const issues = [
  { key: 'lien', label: '🔗 Undisclosed Lien' },
  { key: 'easement', label: '📐 Easement Found' },
  { key: 'forgery', label: '🖊️ Forged Deed in Chain' },
  { key: 'heir', label: '👥 Undisclosed Heir' },
  { key: 'judgment', label: '⚖️ Prior Owner Judgment' },
  { key: 'encroachment', label: '🏗️ Survey Encroachment' },
];

const severityColors = { low: '#D1FAE5', medium: '#FEF3C7', high: '#FEE2E2′ };
const severityText = { low: '#065F46', medium: '#92400E', high: '#991B1B' };
const severityLabel = { low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' };

export default function DFWTitleSearchGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const info = selected ? titleIssues[selected] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍 DFW Title Search Guide</div>
          <p style={{ fontSize: '1.05rem', color: '#374151′ }}>
            A title search examines public records to confirm the seller has clear ownership and the property is free of undisclosed claims. In Texas, the title company does this as part of every purchase — but understanding what they find (and what insurance covers) protects you.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>📋 What a Title Search Reveals</div>
          {[
            ['👤', 'Chain of ownership (who has held title)', '40+ year history in Texas'],
            ['🔗', 'Liens (mortgages, mechanic\’s liens, tax liens)', 'Must be cleared at closing'],
            ['⚖️', 'Judgments against prior owners', 'Can attach to property'],
            ['📐', 'Easements and restrictions', 'Utility, drainage, access rights'],
            ['👥', 'Potential heir claims', 'Estates, divorces, probate issues'],
            ['🖊️', 'Forgeries or fraud in chain', 'Rare but title insurance covers'],
          ].map(([icon, label, note], i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0', borderBottom: i < 5 ? '1px solid #F3F4F6′ : ’none', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.2rem' }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{label}</div>
                <div style={{ fontSize: '0.85rem', color: '#6B7280′ }}>{note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>🛡️ Title Insurance in Texas</div>
          <p style={{ fontSize: '0.95rem', color: '#374151', marginBottom: '1rem' }}>
            Texas uses promulgated title rates — you cannot shop for a lower rate, but you can shop for service. Two policies to know:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: '#166534', marginBottom: '0.5rem' }}>Owner's Policy (T-1)</div>
              <div style={{ fontSize: '0.9rem' }}>Protects you. One-time premium at closing. Covers the purchase price forever. Always get this.</div>
            </div>
            <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: '#1D4ED8', marginBottom: '0.5rem' }}>Lender's Policy (T-2)</div>
              <div style={{ fontSize: '0.9rem' }}>Required by your lender. Protects their loan amount only — does NOT protect you as the buyer.</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>🎯 Title Issue Found → What to Do</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: info ? '1.5rem' : 0 }}>
            {issues.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelected(selected === key ? null : key)}
                style={{
                  padding: '0.6rem 1rem', borderRadius: 8, border: '2px solid',
                  borderColor: selected === key ? '#F5E642′ : '#E5E7EB',
                  backgroundColor: selected === key ? '#F5E642′ : '#fff',
                  color: '#0A1628', fontWeight: selected === key ? 700 : 400,
                  cursor: 'pointer', fontSize: '0.88rem',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {info && (
            <div>
              <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 6, marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 700, backgroundColor: severityColors[info.severity], color: severityText[info.severity] }}>
                {severityLabel[info.severity]}
              </div>
              <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ fontWeight: 700, color: '#166534', marginBottom: '0.4rem' }}>🛡️ How Title Insurance Handles This</div>
                <div style={{ fontSize: '0.92rem' }}>{info.insurance}</div>
              </div>
              <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#1D4ED8', marginBottom: '0.4rem' }}>✅ What You Should Do</div>
                <div style={{ fontSize: '0.92rem' }}>{info.action}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#FEF9C3', borderRadius: 12, padding: '1.5rem', border: '1px solid #FDE047′ }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>⚡ DFW Title Tips</div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.8 }}>
            <li>DFW has many older subdivisions with deed restrictions that aren't HOA-enforced but are still binding</li>
            <li>Check if the property is in a PID (Public Improvement District) — separate assessment, not always in title commitment</li>
            <li>Mechanic's liens can be filed up to 4 months after work completes in Texas — get a gap endorsement</li>
            <li>Ask your title company specifically about any oil/gas mineral rights separation in the chain</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
