import { useState } from 'react';

const terms = [
  { letter: 'A', term: 'ARM (Adjustable-Rate Mortgage)', def: 'A mortgage with an interest rate that changes periodically based on a market index.', dfw: 'Common in DFW during low-rate environments; watch for 5/1 or 7/1 ARM products.' },
  { letter: 'A', term: 'ARV (After Repair Value)', def: 'Estimated market value of a property after all planned renovations are complete.', dfw: 'Used heavily by DFW investors buying distressed homes in East Dallas, Oak Cliff, and South Fort Worth.' },
  { letter: 'C', term: 'Cap Rate', def: 'Annual net operating income divided by property value; measures investment return.', dfw: 'DFW rental cap rates typically range 5–7%, lower in Frisco/Allen, higher in East Fort Worth.' },
  { letter: 'C', term: 'Contingency', def: 'A condition that must be met for a real estate contract to become binding.', dfw: 'DFW\’s hot market often sees buyers waiving inspection contingencies — risky on pier-and-beam homes.' },
  { letter: 'C', term: 'Cap Rate (HOA)', def: 'Annual HOA budget divided by units; indicates association financial health.', dfw: 'Many DFW master-planned communities (Stonebriar, Lakewood) have high HOA caps for amenities.' },
  { letter: 'D', term: 'Deed Restriction', def: 'A limitation placed on property use recorded in the deed itself.', dfw: 'Very common in older DFW neighborhoods like Highland Park; prohibit certain uses, colors, or structures.' },
  { letter: 'E', term: 'Earnest Money', def: 'A deposit made by the buyer showing good faith when making an offer.', dfw: 'DFW standard is 1% of purchase price; competitive offers often go 2–3% in suburbs like Prosper.' },
  { letter: 'E', term: 'Easement', def: 'A legal right to use another\’s property for a specific purpose.', dfw: 'Utility easements are common along creek corridors and Oncor power line routes throughout DFW.' },
  { letter: 'E', term: 'Encroachment', def: 'When a structure extends onto a neighboring property or easement area.', dfw: 'Fences and sheds often encroach in older DFW neighborhoods; surveyor required before closing.' },
  { letter: 'E', term: 'Equity', def: 'The portion of property value the owner actually owns, free of liens.', dfw: 'DFW homeowners gained an average of $68,000 in equity 2020–2024 per NTREIS data.' },
  { letter: 'E', term: 'Escrow', def: 'A neutral third-party account that holds funds during a real estate transaction.', dfw: 'Texas title companies (Capital Title, Republic Title) typically serve as escrow agents in DFW.' },
  { letter: 'H', term: 'HOA (Homeowners Association)', def: 'An organization in a planned community that sets and enforces rules for properties.', dfw: 'Over 60% of DFW homes are in HOAs; fees range from $30/mo (basic) to $500+/mo (luxury communities).' },
  { letter: 'H', term: 'HVAC SEER Rating', def: 'Seasonal Energy Efficiency Ratio — measures cooling efficiency of AC systems.', dfw: 'Texas requires minimum SEER2 14.3 for new installs; older DFW systems often run at SEER 10–12.' },
  { letter: 'L', term: 'Lien', def: 'A legal claim against a property, typically for unpaid debts.', dfw: 'Mechanic\’s liens are common in DFW after contractor disputes; always get lien waivers at project close.' },
  { letter: 'M', term: 'MERV Rating', def: 'Minimum Efficiency Reporting Value — rates air filter effectiveness (1–16 scale).', dfw: 'DFW allergists recommend MERV 11–13 filters due to cedar, ragweed, and high dust levels.' },
  { letter: 'M', term: 'MLS (Multiple Listing Service)', def: 'A database of properties listed for sale, shared among brokers.', dfw: 'DFW uses NTREIS (North Texas Real Estate Information Systems) as its MLS platform.' },
  { letter: 'P', term: 'PITI', def: 'Principal, Interest, Taxes, and Insurance — the four components of a mortgage payment.', dfw: 'DFW property taxes averaging 2.1–2.5% make the T in PITI especially significant here.' },
  { letter: 'P', term: 'PMI (Private Mortgage Insurance)', def: 'Insurance protecting the lender when the borrower puts less than 20% down.', dfw: 'Many DFW first-time buyers use TSAHC programs that include PMI assistance.' },
  { letter: 'P', term: 'Pier and Beam', def: 'A foundation type using concrete piers and wood beams instead of a concrete slab.', dfw: 'Common in older DFW homes (pre-1960s); more forgiving on expansive clay soils than slab foundations.' },
  { letter: 'P', term: 'Post-Tension Slab', def: 'A concrete slab reinforced with steel cables tensioned after concrete cures.', dfw: 'Dominant DFW foundation type since 1980s; requires licensed engineer for any penetrations.' },
  { letter: 'P', term: 'Punch List', def: 'A list of items a contractor must complete before final payment is made.', dfw: 'Essential for new DFW construction — builders like Toll Brothers and DR Horton have formal processes.' },
  { letter: 'R', term: 'R-Value', def: 'A measure of insulation\’s resistance to heat flow; higher = better insulation.', dfw: 'Texas energy code requires R-38 attic insulation; many DFW homes only have R-19 or less.' },
  { letter: 'R', term: 'Right of First Refusal', def: 'The right to purchase a property before the owner accepts another offer.', dfw: 'Common in DFW HOA governing documents for shared-ownership or condominium communities.' },
  { letter: 'S', term: 'SEER2', def: 'Updated efficiency standard for HVAC systems replacing the older SEER metric.', dfw: 'Effective Jan 2023 in Texas; all new DFW AC installations must meet SEER2 14.3 minimum.' },
  { letter: 'S', term: 'Survey (Property)', def: 'A legal document showing exact property boundaries and improvements.', dfw: 'Texas title companies require current surveys; DFW buyers often pay $450–700 for new surveys.' },
  { letter: 'T', term: 'Title Insurance', def: 'Insurance protecting against losses from title defects discovered after purchase.', dfw: 'Texas regulates title insurance rates; DFW buyers pay roughly $1,700 per $300K of purchase price.' },
  { letter: 'T', term: 'Tuckpointing', def: 'Repairing mortar joints in brick or masonry by removing damaged mortar and replacing it.', dfw: 'Needed on many DFW brick homes 20+ years old; DFW clay soil movement accelerates mortar cracking.' },
  { letter: 'U', term: 'Under Contract', def: 'A property where the seller has accepted an offer but the sale is not yet final.', dfw: 'DFW median time under contract is 18 days in suburban markets like McKinney and Celina.' },
  { letter: 'V', term: 'Variance', def: 'An exemption from local zoning regulations granted by a municipality.', dfw: 'Common in older DFW inner-ring suburbs (Garland, Mesquite) for non-conforming lot uses.' },
  { letter: 'W', term: 'Walk-Through (Final)', def: 'A buyer\’s inspection of the property just before closing to confirm condition.', dfw: 'Texas law gives buyers the right to a final walk-through; schedule 24 hours before DFW closings.' },
];

const letters = [...new Set(terms.map(t => t.letter))].sort();

export default function DFWHomeGlossaryGuide() {
  const [activeLetter, setActiveLetter] = useState('A');
  const [search, setSearch] = useState('');

  const filtered = search.length > 0
    ? terms.filter(t => t.term.toLowerCase().includes(search.toLowerCase()) || t.def.toLowerCase().includes(search.toLowerCase()))
    : terms.filter(t => t.letter === activeLetter);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📖</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Home Glossary</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>30 essential terms every DFW homeowner should know</p>
        </div>

        <input
          type="text"
          placeholder="Search any term or definition..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0D2137', color: '#fff', fontSize: 15, marginBottom: 24, boxSizing: 'border-box' }}
        />

        {search.length === 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {letters.map(l => (
              <button
                key={l}
                onClick={() => setActiveLetter(l)}
                style={{ padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: activeLetter === l ? '#F5E642' : '#1E3A5F', color: activeLetter === l ? '#0A1628' : '#fff' }}
              >
                {l}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((t, i) => (
            <div key={i} style={{ background: '#0D2137', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{t.term}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>{t.def}</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontSize: 16 }}>🏙️</span>
                <span style={{ color: '#64748B', fontSize: 13, fontStyle: 'italic' }}>{t.dfw}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', color: '#64748B', padding: 40 }}>No terms found for "{search}"</div>
          )}
        </div>
      </div>
    </div>
  );
}
