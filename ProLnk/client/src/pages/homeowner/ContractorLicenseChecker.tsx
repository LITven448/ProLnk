import { useState } from 'react';
import HomeownerLayout from '@/layouts/HomeownerLayout';

const licenseTypes = [
  {
    trade: 'HVAC',
    authority: 'TDLR Required',
    color: '#3B82F6',
    verify: 'tdlr.texas.gov/license-search',
    verifyUrl: 'https://www.tdlr.texas.gov/license-search',
    detail: 'All HVAC technicians and contractors must hold a TDLR license. Ask for their license number before work begins.',
  },
  {
    trade: 'Electrical',
    authority: 'TDLR Required',
    color: '#F59E0B',
    verify: 'tdlr.texas.gov/license-search',
    verifyUrl: 'https://www.tdlr.texas.gov/license-search',
    detail: 'Electricians must be TDLR-licensed as Apprentice, Journeyman, Master, or Electrical Contractor.',
  },
  {
    trade: 'Plumbing',
    authority: 'TSBPE Required',
    color: '#10B981',
    verify: 'plumbers.texas.gov',
    verifyUrl: 'https://www.tsbpe.texas.gov',
    detail: 'Plumbers are licensed by the Texas State Board of Plumbing Examiners. Verify before any work.',
  },
  {
    trade: 'General Contractor',
    authority: 'City Permits Required',
    color: '#8B5CF6',
    verify: 'Check with your city building department',
    verifyUrl: '',
    detail: 'Texas has no state GC license, but city permits are required. Always verify they pull permits — not you.',
  },
  {
    trade: 'Roofing',
    authority: 'No State License — Must Be Insured',
    color: '#EF4444',
    verify: 'Verify insurance certificate + BBB',
    verifyUrl: 'https://www.bbb.org',
    detail: 'Roofing requires no TX state license, making it highest-fraud. Always demand a certificate of insurance.',
  },
];

const redFlags = [
  "Won't provide license number when asked",
  'Wants full payment upfront',
  'No physical business address',
  'Unusually low bid (>30% below others)',
  'High-pressure "today only" pricing',
  'Offers to waive insurance deductible (illegal in TX)',
];

export default function ContractorLicenseChecker() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  const flagCount = Object.values(checked).filter(Boolean).length;

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-12">
        <div className="max-w-4xl mx-auto">

          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">Contractor License Checker</h1>
            <p className="text-[#64B5F6] text-lg">Verify before you sign</p>
          </div>

          <div className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-6 mb-10">
            <p className="text-gray-300 text-base leading-relaxed">
              In Texas,{' '}
              <span className="text-[#EF4444] font-semibold">73% of home improvement fraud</span>{' '}
              involves unlicensed contractors. A licensed contractor costs the same as an unlicensed
              one — the difference is protection for your home, your wallet, and your family.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-6">Texas License Types by Trade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {licenseTypes.map(lt => (
              <div
                key={lt.trade}
                className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-2 h-10 rounded-full flex-shrink-0"
                    style={{ backgroundColor: lt.color }}
                  />
                  <div>
                    <div className="text-white font-semibold text-lg">{lt.trade}</div>
                    <div
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: lt.color }}
                    >
                      {lt.authority}
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3">{lt.detail}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Verify at:</span>
                  {lt.verifyUrl ? (
                    <a
                      href={lt.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#64B5F6] hover:text-white transition-colors underline"
                    >
                      {lt.verify}
                    </a>
                  ) : (
                    <span className="text-[#64B5F6]">{lt.verify}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold text-white mb-4">Red Flag Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Check any red flags you noticed. If you check 2 or more, walk away.
          </p>

          <div className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-6 mb-6">
            <div className="space-y-4">
              {redFlags.map((flag, i) => (
                <label
                  key={i}
                  className="flex items-start gap-4 cursor-pointer group"
                  onClick={() => toggle(i)}
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                      checked[i]
                        ? 'bg-[#EF4444] border-[#EF4444]'
                        : 'border-[#2D4A6B] group-hover:border-[#EF4444]'
                    }`}
                  >
                    {checked[i] && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${checked[i] ? 'text-[#EF4444]' : 'text-gray-300'}`}>
                    {flag}
                  </span>
                </label>
              ))}
            </div>

            {flagCount >= 2 && (
              <div className="mt-6 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl p-4">
                <p className="text-[#EF4444] font-semibold text-sm">
                  ⚠ {flagCount} red flags detected — we strongly recommend finding a different contractor.
                </p>
              </div>
            )}

            {flagCount === 0 && (
              <div className="mt-6 bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl p-4">
                <p className="text-[#10B981] font-semibold text-sm">
                  No red flags checked — good sign. Still verify their license before signing anything.
                </p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-[#0D1F3C] to-[#1E3A5F] border border-[#2D6A4F] rounded-2xl p-8 text-center">
            <div className="text-[#10B981] text-sm font-semibold uppercase tracking-widest mb-3">
              Skip the verification hassle
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              All TrustyPro Partners Are Pre-Verified
            </h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto text-sm">
              Every pro on TrustyPro has passed a license check, insurance verification, and background
              check before their first job. You never have to guess.
            </p>
            <a
              href="/trustypro/book"
              className="inline-block bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Find a Verified Pro
            </a>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
