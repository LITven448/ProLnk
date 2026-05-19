import { useState } from 'react';

const acronyms = [
  { acronym: 'TREC', full: 'Texas Real Estate Commission', meaning: 'State agency regulating real estate brokers, agents, and inspectors.', when: 'License verification, filing complaints, or reviewing inspector standards.' },
  { acronym: 'TRELA', full: 'Texas Real Estate License Act', meaning: 'The law governing real estate licensing and practice in Texas.', when: 'Understanding your agent\’s legal obligations during a transaction.' },
  { acronym: 'TDHCA', full: 'Texas Department of Housing and Community Affairs', meaning: 'State agency managing affordable housing programs and mortgage assistance.', when: 'First-time buyer programs, low-income tax credits, and rental assistance.' },
  { acronym: 'TSAHC', full: 'Texas State Affordable Housing Corporation', meaning: 'Provides down payment assistance and mortgage programs for DFW buyers.', when: 'Applying for down payment assistance or low-interest first-time buyer loans.' },
  { acronym: 'NTREIS', full: 'North Texas Real Estate Information Systems', meaning: 'The MLS (Multiple Listing Service) used by agents in the DFW market.', when: 'Every time an agent pulls listings or comps in the DFW metro area.' },
  { acronym: 'MLS', full: 'Multiple Listing Service', meaning: 'A database of active property listings shared between brokers.', when: 'Searching for homes, pulling comps, or listing a property for sale.' },
  { acronym: 'ARV', full: 'After Repair Value', meaning: 'Estimated market value of a home after all renovations are completed.', when: 'Investment property analysis, flip underwriting, or renovation loan applications.' },
  { acronym: 'DTI', full: 'Debt-to-Income Ratio', meaning: 'Monthly debt obligations divided by gross monthly income; key lending metric.', when: 'Mortgage pre-approval; most DFW lenders require DTI below 43%.' },
  { acronym: 'LTV', full: 'Loan-to-Value Ratio', meaning: 'Loan amount divided by property value; determines mortgage terms and PMI.', when: 'Every mortgage application; drives interest rate, PMI requirement, and max loan.' },
  { acronym: 'PMI', full: 'Private Mortgage Insurance', meaning: 'Insurance protecting lenders when borrowers put less than 20% down.', when: 'Conventional loans with less than 20% down payment in DFW.' },
  { acronym: 'MIP', full: 'Mortgage Insurance Premium', meaning: 'FHA\’s version of PMI — both upfront and annual premiums.', when: 'FHA loan applications; common for DFW first-time buyers using FHA financing.' },
  { acronym: 'PITI', full: 'Principal, Interest, Taxes, Insurance', meaning: 'The four components making up a total monthly mortgage payment.', when: 'Budget planning; DFW\’s high property taxes make the T especially large.' },
  { acronym: 'HVAC', full: 'Heating, Ventilation, and Air Conditioning', meaning: 'The system controlling climate, air quality, and ventilation in a building.', when: 'Home inspections, system replacements, and energy efficiency discussions.' },
  { acronym: 'SEER', full: 'Seasonal Energy Efficiency Ratio', meaning: 'Measures how efficiently an air conditioner cools relative to energy used.', when: 'AC replacement quotes; older DFW systems run SEER 10–12, new min is SEER2 14.3.' },
  { acronym: 'SEER2', full: 'Seasonal Energy Efficiency Ratio 2 (updated standard)', meaning: 'Updated SEER calculation method effective 2023; replaces the original SEER.', when: 'All new DFW HVAC equipment since January 2023; required on all new installs.' },
  { acronym: 'AFCI', full: 'Arc Fault Circuit Interrupter', meaning: 'A circuit breaker detecting dangerous electrical arcs to prevent fires.', when: 'Electrical inspections and panel upgrades in DFW residential properties.' },
  { acronym: 'GFCI', full: 'Ground Fault Circuit Interrupter', meaning: 'An outlet or breaker that cuts power when current leaks to ground.', when: 'Required in kitchens, bathrooms, garages, and outdoor areas in DFW homes.' },
  { acronym: 'TDLR', full: 'Texas Department of Licensing and Regulation', meaning: 'State agency licensing electricians, HVAC techs, plumbers, and other contractors.', when: 'Verifying contractor licenses before hiring for DFW home projects.' },
  { acronym: 'TSBPE', full: 'Texas State Board of Plumbing Examiners', meaning: 'Licenses plumbers and inspects plumbing work across Texas.', when: 'Verifying plumber credentials or pulling a plumbing permit in DFW.' },
  { acronym: 'HOA', full: 'Homeowners Association', meaning: 'An organization enforcing community rules and collecting fees in planned communities.', when: 'Over 60% of DFW homes are in HOAs; review CC&Rs before buying.' },
  { acronym: 'CC&R', full: 'Covenants, Conditions, and Restrictions', meaning: 'Legal rules governing what homeowners can and cannot do with their property.', when: 'Reviewing HOA documents; critical before any addition, fence, or exterior change.' },
  { acronym: 'HUD', full: 'U.S. Department of Housing and Urban Development', meaning: 'Federal agency overseeing FHA loans, fair housing, and housing assistance.', when: 'FHA loan applications, fair housing complaints, and HUD-1 settlement statements.' },
  { acronym: 'FHA', full: 'Federal Housing Administration', meaning: 'Insures mortgages for buyers with lower down payments and credit scores.', when: 'DFW first-time buyers; FHA minimum is 3.5% down with 580+ credit score.' },
  { acronym: 'VA', full: 'Department of Veterans Affairs (loan)', meaning: 'Provides zero-down mortgage loans for eligible veterans and military families.', when: 'DFW has 200,000+ veterans; VA loans are a major mortgage category here.' },
  { acronym: 'ARM', full: 'Adjustable-Rate Mortgage', meaning: 'A mortgage where the interest rate changes after an initial fixed period.', when: 'Shopping mortgages; 5/1 and 7/1 ARMs popular in DFW during high-rate periods.' },
  { acronym: 'APR', full: 'Annual Percentage Rate', meaning: 'The true annual cost of a loan including fees and interest.', when: 'Comparing mortgage offers; use APR not just interest rate for accurate comparison.' },
  { acronym: 'MERV', full: 'Minimum Efficiency Reporting Value', meaning: 'Rating scale 1–16 measuring air filter effectiveness.', when: 'Choosing HVAC filters; DFW allergists recommend MERV 11–13 for pollen.' },
  { acronym: 'GFI', full: 'Ground Fault Interrupter (informal for GFCI)', meaning: 'Common informal shorthand for GFCI used by contractors and inspectors.', when: 'You\’ll hear this from DFW electricians as a casual reference to GFCI devices.' },
  { acronym: 'HEL', full: 'Home Equity Loan', meaning: 'A lump-sum loan using home equity as collateral; fixed rate.', when: 'Financing DFW home improvements; Texas has strict 80% LTV cap on HELs.' },
  { acronym: 'HELOC', full: 'Home Equity Line of Credit', meaning: 'A revolving credit line using home equity; variable rate.', when: 'Flexible DFW renovation financing; draw as needed, subject to Texas 80% LTV rule.' },
  { acronym: 'REO', full: 'Real Estate Owned', meaning: 'Properties owned by a bank after foreclosure when no buyer bid at auction.', when: 'Buying bank-owned homes; DFW REO inventory spikes in economic downturns.' },
  { acronym: 'FSBO', full: 'For Sale By Owner', meaning: 'When a homeowner sells their property without hiring a real estate agent.', when: 'Common in DFW among experienced sellers; buyers still typically use an agent.' },
  { acronym: 'ALTA', full: "American Land Title Association (survey)", meaning: 'The most detailed and legally comprehensive property survey type.', when: 'Commercial DFW properties; some luxury residential closings require ALTA surveys.' },
  { acronym: 'NOD', full: 'Notice of Default', meaning: 'Official notice that a borrower is behind on mortgage payments.', when: 'Pre-foreclosure stage; DFW investors track NODs to find distressed properties.' },
  { acronym: 'TCO', full: 'Total Cost of Ownership', meaning: 'All costs of owning a home: mortgage, taxes, insurance, maintenance, HOA.', when: 'Budgeting for DFW homeownership; experts recommend budgeting 1–2% of value annually for maintenance.' },
  { acronym: 'RESPA', full: 'Real Estate Settlement Procedures Act', meaning: 'Federal law protecting buyers from kickbacks and undisclosed fees in settlement.', when: 'Reviewing closing disclosures; ensures DFW title and lender fees are transparent.' },
  { acronym: 'GFE', full: 'Good Faith Estimate (now Loan Estimate)', meaning: 'Lender disclosure of estimated closing costs; now called Loan Estimate under TRID.', when: 'Receiving mortgage quotes; compare GFEs from multiple DFW lenders before committing.' },
  { acronym: 'TRID', full: 'TILA-RESPA Integrated Disclosure', meaning: 'Federal rule combining mortgage disclosures into Loan Estimate and Closing Disclosure.', when: 'All DFW residential mortgage closings since 2015; protects buyer transparency.' },
  { acronym: 'CMA', full: 'Comparative Market Analysis', meaning: 'An analysis of recently sold comparable homes to estimate property value.', when: 'Pricing a DFW home for sale or making an offer; prepared by real estate agents.' },
  { acronym: 'MUD', full: 'Municipal Utility District', meaning: 'A special-purpose district providing water, sewer, and drainage in unincorporated Texas areas.', when: 'Buying in outer DFW suburbs (Prosper, Celina, Fate); MUD taxes add to your PITI.' },
];

export default function DFWAcronymGuide() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = query.length > 1
    ? acronyms.filter(a =>
        a.acronym.toLowerCase().includes(query.toLowerCase()) ||
        a.full.toLowerCase().includes(query.toLowerCase()) ||
        a.meaning.toLowerCase().includes(query.toLowerCase())
      )
    : acronyms;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔤</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Acronym Guide</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>40 real estate & home service acronyms decoded for DFW homeowners</p>
        </div>

        <input
          type="text"
          placeholder="Search acronym, name, or meaning..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0D2137', color: '#fff', fontSize: 15, marginBottom: 24, boxSizing: 'border-box' }}
        />

        <div style={{ color: '#64748B', fontSize: 13, marginBottom: 16 }}>{filtered.length} acronyms shown — click any to expand</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((a) => (
            <div
              key={a.acronym}
              onClick={() => setExpanded(expanded === a.acronym ? null : a.acronym)}
              style={{ background: '#0D2137', border: `1px solid ${expanded === a.acronym ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: 16, cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#F5E642′ }}>{a.acronym}</span>
                  <span style={{ fontSize: 13, color: '#94A3B8′ }}>{a.full}</span>
                </div>
                <span style={{ color: '#F5E642', fontSize: 18 }}>{expanded === a.acronym ? '▲' : '▼'}</span>
              </div>
              {expanded === a.acronym && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1E3A5F' }}>
                  <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{a.meaning}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 15 }}>📅</span>
                    <span style={{ color: '#64748B', fontSize: 13 }}><strong style={{ color: '#94A3B8′ }}>When you’ll see it:</strong> {a.when}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <div style={{ textAlign: 'center', color: '#64748B', padding: 40 }}>No acronyms match "{query}"</div>}
        </div>
      </div>
    </div>
  );
}
