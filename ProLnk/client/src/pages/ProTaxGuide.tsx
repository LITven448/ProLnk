import { useState } from 'react';

const deductions = [
  {
    id: 'mileage',
    label: 'Vehicle Mileage',
    description: '67 cents/mile (2026 IRS rate)',
    defaultValue: 18000,
    unit: 'miles',
    min: 0,
    max: 60000,
    step: 1000,
    calc: (v: number) => Math.round(v * 0.67),
    helper: 'Average ProLnk pro drives 18,000 business miles/year',
  },
  {
    id: 'subscription',
    label: 'ProLnk Subscription',
    description: '$149/mo platform fee is fully deductible',
    defaultValue: 12,
    unit: 'months',
    min: 0,
    max: 12,
    step: 1,
    calc: (v: number) => v * 149,
    helper: '$149 × 12 months = $1,788/yr deduction',
  },
  {
    id: 'tools',
    label: 'Tools & Equipment',
    description: 'Full cost deductible under Section 179',
    defaultValue: 3500,
    unit: 'dollars',
    min: 0,
    max: 50000,
    step: 500,
    calc: (v: number) => v,
    helper: 'Deduct the full purchase price in year of purchase — no depreciation required',
  },
  {
    id: 'phone',
    label: 'Phone (Business Use %)',
    description: 'Monthly bill × business use percentage',
    defaultValue: 70,
    unit: '% business',
    min: 0,
    max: 100,
    step: 5,
    calc: (v: number) => Math.round(100 * 12 * v / 100),
    helper: 'Assuming $100/mo plan. Keep a log for 30 days to establish your business-use percentage.',
  },
  {
    id: 'homeoffice',
    label: 'Home Office',
    description: '$5/sqft (IRS simplified method, exclusive use required)',
    defaultValue: 150,
    unit: 'sqft',
    min: 0,
    max: 400,
    step: 10,
    calc: (v: number) => v * 5,
    helper: 'Must be used exclusively and regularly for business. No mixed-use rooms qualify.',
  },
  {
    id: 'training',
    label: 'Training & Certifications',
    description: 'Courses, licenses, subscriptions related to your trade',
    defaultValue: 800,
    unit: 'dollars',
    min: 0,
    max: 10000,
    step: 100,
    calc: (v: number) => v,
    helper: 'License renewal fees, continuing education, industry association dues all qualify.',
  },
  {
    id: 'insurance',
    label: 'Business Liability Insurance',
    description: 'Premiums paid for business insurance coverage',
    defaultValue: 1800,
    unit: 'dollars',
    min: 0,
    max: 20000,
    step: 100,
    calc: (v: number) => v,
    helper: 'General liability, professional liability, and commercial auto insurance are deductible.',
  },
];

const quarterlyDates = [
  { quarter: 'Q1', label: 'April 15', income: 'Jan 1 – Mar 31′ },
  { quarter: 'Q2', label: 'June 15', income: 'Apr 1 – May 31′ },
  { quarter: 'Q3', label: 'September 15', income: 'Jun 1 – Aug 31′ },
  { quarter: 'Q4', label: 'January 15', income: 'Sep 1 – Dec 31′ },
];

export default function ProTaxGuide() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(deductions.map((d) => [d.id, d.defaultValue]))
  );

  const totalDeduction = deductions.reduce((acc, d) => acc + d.calc(values[d.id]), 0);
  const taxSavings = Math.round(totalDeduction * 0.153 + totalDeduction * 0.22);

  const updateValue = (id: string, val: number) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF9', fontFamily: 'system-ui, sans-serif' }}>
      <div className="max-w-4xl mx-auto px-4 py-12″>

        {/* Header */}
        <div className="mb-10″>
          <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Partner Resource
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3″ style={{ color: '#1E3A5F' }}>
            ProLnk Partner Tax Guide
          </h1>
          <p className="text-lg text-gray-600″>Keep More of What You Earn — Deductions Every Home Service Pro Should Know</p>
        </div>

        {/* Self-Employment Context */}
        <div
          className="rounded-2xl p-6 mb-8″
          style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}
        >
          <h2 className="text-lg font-bold mb-3″ style={{ color: '#1E3A5F' }}>
            Your Tax Situation as a ProLnk Partner
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3″>
            As a ProLnk partner, you're self-employed. Unlike W-2 employees who split payroll taxes
            with an employer, you pay both the employer and employee portions of Social Security and
            Medicare — a combined <strong>15.3% self-employment tax</strong> — on top of your income
            tax bracket. On $60,000 of net profit, that's over $9,000 in SE tax alone before income tax.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            The good news: self-employed workers have access to far more deductions than employees.
            Used correctly, these deductions directly reduce your taxable income, cutting both your
            income tax and your self-employment tax. This guide helps you find every dollar.
          </p>
        </div>

        {/* Quarterly Dates */}
        <div className="mb-8″>
          <h2 className="text-xl font-bold mb-4″ style={{ color: '#1E3A5F' }}>
            Quarterly Estimated Tax Deadlines
          </h2>
          <p className="text-sm text-gray-500 mb-4″>
            If you expect to owe $1,000+ in taxes for the year, you must pay quarterly or face penalties.
            Set calendar reminders for all four.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3″>
            {quarterlyDates.map((q) => (
              <div key={q.quarter} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: '#1E3A5F' }}
                >
                  {q.quarter}
                </div>
                <div className="font-bold text-lg" style={{ color: '#1E3A5F' }}>{q.label}</div>
                <div className="text-xs text-gray-500 mt-1″>Income period:<br />{q.income}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Deduction Calculator */}
        <div className="mb-8″>
          <div className="flex items-center justify-between mb-4″>
            <h2 className="text-xl font-bold" style={{ color: '#1E3A5F' }}>
              Deduction Calculator
            </h2>
            <div className="text-right">
              <div className="text-xs text-gray-500″>Estimated Total Deduction</div>
              <div className="text-2xl font-bold" style={{ color: '#1E3A5F' }}>
                ${totalDeduction.toLocaleString()}
              </div>
              <div className="text-xs text-green-600 font-medium">
                ~${taxSavings.toLocaleString()} in estimated tax savings
              </div>
            </div>
          </div>

          <div className="space-y-4″>
            {deductions.map((d) => {
              const deductionAmt = d.calc(values[d.id]);
              return (
                <div key={d.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5″>
                  <div className="flex items-start justify-between mb-2″>
                    <div>
                      <h3 className="font-semibold text-gray-800″>{d.label}</h3>
                      <p className="text-xs text-gray-500″>{d.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4″>
                      <div className="font-bold text-lg" style={{ color: '#1E3A5F' }}>
                        ${deductionAmt.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400″>deductible</div>
                    </div>
                  </div>

                  {d.unit !== 'dollars' || d.id === 'tools' || d.id === 'training' || d.id === 'insurance' ? (
                    <div className="mt-3″>
                      <div className="flex justify-between text-xs text-gray-400 mb-1″>
                        <span>
                          {d.unit === 'dollars'
                            ? `$${values[d.id].toLocaleString()}`
                            : d.unit === 'miles'
                            ? `${values[d.id].toLocaleString()} miles`
                            : d.unit === '% business'
                            ? `${values[d.id]}% business use`
                            : d.unit === 'sqft'
                            ? `${values[d.id]} sqft`
                            : `${values[d.id]} months`}
                        </span>
                        <span>{d.helper}</span>
                      </div>
                      <input
                        type="range"
                        min={d.min}
                        max={d.max}
                        step={d.step}
                        value={values[d.id]}
                        onChange={(e) => updateValue(d.id, Number(e.target.value))}
                        className="w-full"
                        style={{ accentColor: '#F59E0B' }}
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 mt-2″>{d.helper}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* S-Corp Strategy */}
        <div
          className="rounded-2xl p-6 mb-8″
          style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
        >
          <h2 className="text-xl font-bold mb-3″ style={{ color: '#92400E' }}>
            S-Corp Strategy — Save $3,000–$8,000/Year at Scale
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3″>
            When you exceed <strong>$40,000 in net profit</strong>, forming an S-Corp can significantly
            reduce your self-employment tax. Here's how it works: Instead of paying SE tax on all
            your earnings, you pay yourself a "reasonable salary" (e.g., $35,000) and take the rest
            as S-Corp distributions — which are not subject to self-employment tax.
          </p>
          <div className="bg-white rounded-xl p-4 text-sm">
            <div className="grid grid-cols-2 gap-4″>
              <div>
                <div className="text-xs text-gray-500 mb-1″>As a Sole Proprietor at $80K net</div>
                <div className="text-red-600 font-bold">SE Tax: $12,240</div>
                <div className="text-gray-600″>Paid on 100% of earnings</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1″>As an S-Corp at $80K net</div>
                <div className="text-green-600 font-bold">SE Tax: $5,355</div>
                <div className="text-gray-600″>Paid on $35K salary only</div>
              </div>
            </div>
            <div
              className="mt-3 pt-3 border-t border-gray-100 text-center font-semibold"
              style={{ color: '#059669′ }}
            >
              Annual savings: $6,885 — exceeds S-Corp formation and accounting costs in Year 1
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3″>
            S-Corp requires payroll setup, quarterly filing, and a CPA. Net benefit typically starts at
            $40K+ in net profit. Consult a CPA before forming.
          </p>
        </div>

        {/* CTA */}
        <div className="grid md:grid-cols-2 gap-4″>
          <div
            className="rounded-2xl p-6″
            style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #2D5F8A 100%)' }}
          >
            <h3 className="font-bold text-white mb-2″>Find a Gig-Worker CPA</h3>
            <p className="text-blue-200 text-sm mb-4″>
              Not all CPAs understand self-employment tax strategy. Find one who specializes in
              1099 contractors and home service businesses.
            </p>
            <a
              href="https://www.irs.gov/tax-professionals/choosing-a-tax-professional"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold px-4 py-2 rounded-lg"
              style={{ background: '#F59E0B', color: '#1E3A5F' }}
            >
              IRS Tax Professional Directory →
            </a>
          </div>
          <div
            className="rounded-2xl p-6″
            style={{ background: '#F0FDF4', border: '1px solid #BBF7D0′ }}
          >
            <h3 className="font-bold mb-2″ style={{ color: '#065F46' }}>
              Join ProLnk — Your $149/mo is Deductible
            </h3>
            <p className="text-sm text-green-700 mb-4″>
              ProLnk membership pays for itself through leads. After tax deduction,
              your net cost is as low as $94/mo depending on your bracket.
            </p>
            <a
              href="/apply"
              className="inline-block text-sm font-semibold px-4 py-2 rounded-lg"
              style={{ background: '#1E3A5F', color: '#fff' }}
            >
              Apply to Join ProLnk →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
