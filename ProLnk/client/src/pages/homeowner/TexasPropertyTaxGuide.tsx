import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';

const TAX_RATES = [
  { city: 'Frisco', county: 'Collin', rate: 2.14, cad: 'Collin CAD', cadUrl: 'https://www.collincad.org', example: 485000 },
  { city: 'Plano', county: 'Collin', rate: 2.18, cad: 'Collin CAD', cadUrl: 'https://www.collincad.org', example: 485000 },
  { city: 'McKinney', county: 'Collin', rate: 2.08, cad: 'Collin CAD', cadUrl: 'https://www.collincad.org', example: 485000 },
  { city: 'Allen', county: 'Collin', rate: 2.19, cad: 'Collin CAD', cadUrl: 'https://www.collincad.org', example: 485000 },
  { city: 'Dallas', county: 'Dallas', rate: 2.31, cad: 'Dallas CAD', cadUrl: 'https://www.dallascad.org', example: 485000 },
  { city: 'Irving', county: 'Dallas', rate: 2.24, cad: 'Dallas CAD', cadUrl: 'https://www.dallascad.org', example: 485000 },
  { city: 'Denton', county: 'Denton', rate: 2.12, cad: 'Denton CAD', cadUrl: 'https://www.dentoncad.com', example: 485000 },
  { city: 'Flower Mound', county: 'Denton', rate: 2.09, cad: 'Denton CAD', cadUrl: 'https://www.dentoncad.com', example: 485000 },
  { city: 'Fort Worth', county: 'Tarrant', rate: 2.26, cad: 'Tarrant CAD', cadUrl: 'https://www.tad.org', example: 485000 },
  { city: 'Arlington', county: 'Tarrant', rate: 2.29, cad: 'Tarrant CAD', cadUrl: 'https://www.tad.org', example: 485000 },
];

const PROTEST_STEPS = [
  {
    step: 1,
    title: 'Get your comparable market analysis',
    detail: 'Pull actual sales data for homes similar to yours that sold in the last 6–12 months. Use HAR.com, Zillow sales history, or request comps from a local real estate agent (many will pull these for free).',
    tip: '65% of protests succeed in Texas when backed by documented comps.',
  },
  {
    step: 2,
    title: 'Find 3–5 comps that sold below your assessed value',
    detail: 'You need sales of comparable homes (same neighborhood, same size ±15%, same age) that sold for less than your county\’s assessed value. If your home is assessed at $500K but 4 similar homes sold for $460–$480K, you have a strong case.',
    tip: 'Focus on arm\’s-length sales (not foreclosures or family sales) within 1 mile.',
  },
  {
    step: 3,
    title: 'File your protest online by May 15',
    detail: 'All four DFW counties allow online protest filing. You only need to file a "Notice of Protest" by May 15 — you don\’t need all your evidence yet. Filing preserves your right; evidence comes later.',
    tip: 'If May 15 falls on a weekend, the deadline extends to the next business day.',
  },
  {
    step: 4,
    title: 'Attend the informal hearing with your evidence',
    detail: 'Most protests are resolved at the informal level. Bring: printed comps, photos of property condition issues (deferred maintenance, foundation cracks, old HVAC), and a clear one-page summary of your argument. Be polite and factual.',
    tip: 'Appraisers at informal hearings have authority to reduce your assessment — they prefer settling to scheduling ARB hearings.',
  },
  {
    step: 5,
    title: 'Request formal ARB hearing if unsatisfied',
    detail: 'If the informal hearing doesn\’t produce a satisfactory result, you can escalate to the Appraisal Review Board (ARB) — an independent panel. Bring the same evidence plus any additional documentation. You can also hire a property tax consultant who typically works on contingency (they charge 30–50% of first-year savings).',
    tip: 'ARB hearings are formal but not adversarial. Present your evidence calmly and ask the appraiser to justify their assessment.',
  },
];

const CAD_LINKS = [
  { name: 'Collin CAD', url: 'https://www.collincad.org', counties: 'Frisco, Plano, McKinney, Allen, Prosper' },
  { name: 'Dallas CAD', url: 'https://www.dallascad.org', counties: 'Dallas, Irving, Garland, Mesquite, Grand Prairie' },
  { name: 'Denton CAD', url: 'https://www.dentoncad.com', counties: 'Denton, Flower Mound, Lewisville, Carrollton' },
  { name: 'Tarrant CAD', url: 'https://www.tad.org', counties: 'Fort Worth, Arlington, Mansfield, Grapevine, Southlake' },
];

export default function TexasPropertyTaxGuide() {
  const [assessedValue, setAssessedValue] = useState('');
  const [marketValue, setMarketValue] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const assessed = parseFloat(assessedValue.replace(/,/g, '')) || 0;
  const market = parseFloat(marketValue.replace(/,/g, '')) || 0;
  const selectedRate = TAX_RATES.find((r) => r.city === selectedCity);
  const rate = selectedRate ? selectedRate.rate / 100 : 0.022;

  const currentBill = assessed * rate;
  const marketBill = market > 0 ? market * rate : 0;
  const potentialSavings = market > 0 && market < assessed ? (assessed - market) * rate : 0;
  const homesteadSavings = assessed * rate - (assessed - 40000) * rate;
  const appealWorthIt = market > 0 && assessed > 0 && assessed > market * 1.05;

  const formatCurrency = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const formatInput = (val: string) => {
    const num = val.replace(/[^0-9]/g, '');
    return num ? parseInt(num).toLocaleString('en-US') : '';
  };

  return (
    <>
      <Helmet>
        <title>Texas Property Tax Guide — Fight Your Assessment | ProLnk</title>
        <meta name="description" content="DFW property tax rates, homestead exemption guide, and step-by-step protest instructions. 65% of appeals succeed — find out if yours is worth filing." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 border-b border-slate-800″>
          <div className="max-w-4xl mx-auto px-6 py-12″>
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 mb-4″>
              <span className="text-yellow-400 text-sm font-medium">💰 Texas Property Tax Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3″>
              Fight Your Assessment and Save $1,000+
            </h1>
            <p className="text-slate-400 text-lg mb-4″>
              Texas has no state income tax — but property taxes average 2.0–2.3% in DFW, among the highest in the US. A $485K home pays $10,000–$11,000 per year. Here's how to fight back.
            </p>
            <div className="grid grid-cols-3 gap-4″>
              {['65% of appeals succeed', 'Avg homestead saves $1,200/yr', 'Protest deadline: May 15'].map((stat) => (
                <div key={stat} className="bg-slate-800/60 rounded-xl p-3 text-center border border-slate-700″>
                  <p className="text-yellow-400 text-sm font-semibold">{stat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8 space-y-10″>

          {/* DFW Tax Rates Table */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4″>DFW Property Tax Rates by City</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-700″>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800 border-b border-slate-700″>
                    <th className="text-left px-4 py-3 text-slate-400 font-medium">City</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-medium">County</th>
                    <th className="text-right px-4 py-3 text-slate-400 font-medium">Rate</th>
                    <th className="text-right px-4 py-3 text-slate-400 font-medium">On $485K Home</th>
                    <th className="text-left px-4 py-3 text-slate-400 font-medium">CAD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800″>
                  {TAX_RATES.map((row) => (
                    <tr key={row.city} className="hover:bg-slate-800/40″>
                      <td className="px-4 py-3 text-white font-medium">{row.city}</td>
                      <td className="px-4 py-3 text-slate-400″>{row.county}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-semibold ${row.rate >= 2.25 ? 'text-red-400' : row.rate >= 2.15 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {row.rate}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300″>{formatCurrency(row.example * row.rate / 100)}/yr</td>
                      <td className="px-4 py-3″>
                        <a href={row.cadUrl} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline text-xs">{row.cad} →</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-2″>Rates shown are effective 2024 combined rates (city + county + school district + MUD). Verify current rates at your county appraisal district.</p>
          </section>

          {/* Homestead Exemption */}
          <section className="bg-green-950/30 border border-green-700/30 rounded-2xl p-6″>
            <h2 className="text-xl font-bold text-white mb-2″>🏡 Homestead Exemption — File First, Everything Else Second</h2>
            <p className="text-slate-300 text-sm mb-4″>
              If your primary residence in Texas doesn't have a homestead exemption on file, you’re leaving $1,000–$1,500 per year on the table. The state mandates a $40,000 exemption from school district taxes.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4″>
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700″>
                <p className="text-green-400 font-semibold text-lg">$40,000</p>
                <p className="text-slate-400 text-xs mt-1″>Mandatory school district exemption removes this from taxable value</p>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700″>
                <p className="text-green-400 font-semibold text-lg">April 30</p>
                <p className="text-slate-400 text-xs mt-1″>Annual deadline to file for homestead exemption (no penalty for late first-time filings)</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-300″>
              <p><span className="text-white font-medium">How to file:</span> Download Form 50-114 from your county CAD website. Attach a copy of your TX driver's license showing your home address. Mail or submit online — no in-person required.</p>
              <p><span className="text-white font-medium">Who qualifies:</span> You must own and occupy the home as your primary residence as of January 1 of the tax year. Rental properties and investment homes do not qualify.</p>
              <p><span className="text-white font-medium">Bonus:</span> Once you turn 65 or claim disability status, you receive an additional $10,000+ exemption and school tax freeze.</p>
            </div>
          </section>

          {/* Protest Calculator */}
          <section className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6″>
            <h2 className="text-xl font-bold text-white mb-1″>Is a Protest Worth It?</h2>
            <p className="text-slate-400 text-sm mb-5″>Enter your assessed value and estimated true market value to see if you should protest.</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6″>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5″>Your City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500″
                >
                  <option value="">Select city...</option>
                  {TAX_RATES.map((r) => (
                    <option key={r.city} value={r.city}>{r.city} ({r.rate}%)</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5″>County Assessed Value ($)</label>
                <input
                  type="text"
                  value={assessedValue}
                  onChange={(e) => setAssessedValue(formatInput(e.target.value))}
                  placeholder="e.g. 520,000″
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-yellow-500″
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5″>Estimated True Market Value ($)</label>
                <input
                  type="text"
                  value={marketValue}
                  onChange={(e) => setMarketValue(formatInput(e.target.value))}
                  placeholder="e.g. 480,000″
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-yellow-500″
                />
              </div>
            </div>

            {assessed > 0 && (
              <div className="space-y-3″>
                <div className="grid sm:grid-cols-3 gap-3″>
                  <div className="bg-slate-900/60 rounded-xl p-4 text-center border border-slate-700″>
                    <p className="text-red-400 text-2xl font-bold">{formatCurrency(currentBill)}</p>
                    <p className="text-slate-500 text-xs mt-1″>Current annual tax bill</p>
                  </div>
                  {market > 0 && (
                    <div className="bg-slate-900/60 rounded-xl p-4 text-center border border-slate-700″>
                      <p className="text-yellow-400 text-2xl font-bold">{formatCurrency(marketBill)}</p>
                      <p className="text-slate-500 text-xs mt-1″>Tax bill at market value</p>
                    </div>
                  )}
                  <div className="bg-green-950/40 rounded-xl p-4 text-center border border-green-700/30″>
                    <p className="text-green-400 text-2xl font-bold">{formatCurrency(homesteadSavings)}</p>
                    <p className="text-slate-500 text-xs mt-1″>Homestead exemption savings/yr</p>
                  </div>
                </div>

                {market > 0 && (
                  <div className={`rounded-xl p-4 border ${appealWorthIt ? 'bg-green-950/30 border-green-700/30' : 'bg-slate-800/40 border-slate-700'}`}>
                    {appealWorthIt ? (
                      <div>
                        <p className="text-green-400 font-semibold">✅ Protest looks worthwhile</p>
                        <p className="text-slate-300 text-sm mt-1″>
                          Your assessed value is {Math.round(((assessed - market) / market) * 100)}% above estimated market value. A successful protest to market value could save you <span className="text-green-400 font-semibold">{formatCurrency(potentialSavings)}/year</span>. That's worth a few hours of your time.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-slate-400 font-semibold">The math may not support a protest</p>
                        <p className="text-slate-500 text-sm mt-1″>
                          Your assessed value appears close to or below market value. Texas CADs generally won't reduce below market value. Focus on the homestead exemption instead.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {assessed === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm">
                Enter your assessed value to see the analysis.
              </div>
            )}
          </section>

          {/* Protest Steps */}
          <section>
            <h2 className="text-xl font-bold text-white mb-2″>How to Protest — Step by Step</h2>
            <p className="text-slate-400 text-sm mb-5″>65% of Texas property tax protests result in a reduction. Here's the process:</p>
            <div className="space-y-4″>
              {PROTEST_STEPS.map((step) => (
                <div key={step.step} className="bg-slate-800/40 border border-slate-700 rounded-xl p-5″>
                  <div className="flex items-start gap-4″>
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 mt-0.5″>
                      <span className="text-yellow-400 font-bold text-sm">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1″>{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-2″>{step.detail}</p>
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2″>
                        <p className="text-yellow-300 text-xs">💡 {step.tip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CAD Links */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4″>DFW County Appraisal Districts</h2>
            <div className="grid sm:grid-cols-2 gap-4″>
              {CAD_LINKS.map((cad) => (
                <a
                  key={cad.name}
                  href={cad.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800/40 border border-slate-700 hover:border-teal-500/50 rounded-xl p-4 block transition-colors"
                >
                  <p className="text-white font-semibold">{cad.name} →</p>
                  <p className="text-slate-400 text-xs mt-1″>{cad.counties}</p>
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-br from-teal-900/40 to-slate-800/60 border border-teal-700/30 rounded-2xl p-8 text-center">
            <p className="text-2xl font-bold text-white mb-2″>Know your home's true market value</p>
            <p className="text-slate-400 mb-5″>A current market value estimate is the core of any successful protest. ProLnk's Home Health Vault gives you a data-backed value estimate for your DFW property.</p>
            <Link href="/my-home/value">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 rounded-xl text-slate-900 font-semibold transition-colors">
                Get My Home Value Estimate →
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
