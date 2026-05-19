import { useState } from 'react';

const TRADES = [
  'Electrician',
  'Plumber',
  'HVAC Technician',
  'Roofer',
  'Handyman',
  'General Contractor',
  'Irrigation Specialist',
  'Master Electrician',
];

interface TradeInfo {
  stateLicense: string;
  cityPermit: string;
  bondRequired: string;
  board: string;
  boardUrl: string;
  renewalCycle: string;
  examRequired: boolean;
  notes: string;
}

const TRADE_DETAILS: Record<string, TradeInfo> = {
  Electrician: {
    stateLicense: 'TDLR Electrician License (Apprentice, Journeyman, or Master)',
    cityPermit: 'Electrical permits required per job in Dallas, Fort Worth, Arlington',
    bondRequired: 'No state bond, but liability insurance required',
    board: 'TDLR (Texas Department of Licensing & Regulation)',
    boardUrl: 'https://www.tdlr.texas.gov/electricians/',
    renewalCycle: '1 year (must complete continuing education)',
    examRequired: true,
    notes: 'Master Electrician required to pull permits. Journeyman can work under a Master. Dallas requires separate registration with city.',
  },
  Plumber: {
    stateLicense: 'TSBPE License (Apprentice, Journeyman, or Master Plumber)',
    cityPermit: 'City permits required for any new installation, replacement, or repair involving rough-in work',
    bondRequired: 'Surety bond required for Master Plumber businesses',
    board: 'TSBPE (Texas State Board of Plumbing Examiners)',
    boardUrl: 'https://www.tsbpe.texas.gov/',
    renewalCycle: '1 year',
    examRequired: true,
    notes: 'Texas has strict state preemption — TSBPE governs all plumbing statewide. Cities cannot add licensing requirements on top. Master Plumber needed to pull permits.',
  },
  'HVAC Technician': {
    stateLicense: 'TACL License (Technician, Contractor, or Dealer)',
    cityPermit: 'Mechanical permits required for installations and system replacements',
    bondRequired: 'Yes — $10,000 surety bond required for TACL Contractor license',
    board: 'TDLR – TACL Program',
    boardUrl: 'https://www.tdlr.texas.gov/air/',
    renewalCycle: '1 year',
    examRequired: true,
    notes: 'EPA 608 certification also required for handling refrigerants. TACL Contractor needed to run a business. TACL Technician can work under a Contractor.',
  },
  Roofer: {
    stateLicense: 'No state license required in Texas for roofing',
    cityPermit: 'Building permits required for roof replacements (>25% of roof area) in most DFW cities',
    bondRequired: 'No mandatory bond, but strongly recommended. Dallas requires registration.',
    board: 'Local city building departments (no state board)',
    boardUrl: 'https://www.dallascityhall.com/departments/sustainabledevelopment/buildinginspection/',
    renewalCycle: 'N/A (no state license)',
    examRequired: false,
    notes: 'Texas does not require a state roofing license, but Dallas, Fort Worth, and Plano require contractor registration. Insurance and bond are the real differentiators. Storm chaser rules apply post-hail season.',
  },
  Handyman: {
    stateLicense: 'No state license for general handyman work',
    cityPermit: 'Permits required if work involves electrical, plumbing, HVAC, or structural elements',
    bondRequired: 'No mandatory bond, but strongly recommended for customer trust',
    board: 'N/A — handyman work is largely unregulated in Texas',
    boardUrl: 'https://www.tdlr.texas.gov/',
    renewalCycle: 'N/A',
    examRequired: false,
    notes: 'Handymen CANNOT legally perform electrical, plumbing, or HVAC work that requires a license — even if "small." Stick to cosmetic repairs, furniture assembly, painting, and minor carpentry. ProLnk will not match handymen to licensed-trade jobs.',
  },
  'General Contractor': {
    stateLicense: 'No state GC license in Texas (unlike many states)',
    cityPermit: 'Building permits required for structural work. Contractor registration required in Dallas and Fort Worth.',
    bondRequired: 'City registration may require bond. Recommended minimum $25,000.',
    board: 'Local city building departments + individual trade boards',
    boardUrl: 'https://www.fortworthtexas.gov/departments/development-services/',
    renewalCycle: 'Varies by city',
    examRequired: false,
    notes: 'GCs in Texas must subcontract licensed trades (electrical, plumbing, HVAC) to licensed specialists. Many GCs hold individual trade licenses. Insurance and bonding are essential for large projects.',
  },
  'Irrigation Specialist': {
    stateLicense: 'TCEQ Irrigator License required for new irrigation system installation',
    cityPermit: 'Permits required for new irrigation system installations',
    bondRequired: 'Yes — $5,000 bond required for TCEQ Irrigator License',
    board: 'TCEQ (Texas Commission on Environmental Quality)',
    boardUrl: 'https://www.tceq.texas.gov/licensing/irrigation',
    renewalCycle: '1 year',
    examRequired: true,
    notes: 'Separate licenses for installation vs repair. Water meter work requires plumber involvement. DFW water authorities may have additional backflow prevention certifications.',
  },
  'Master Electrician': {
    stateLicense: 'TDLR Master Electrician License (highest tier)',
    cityPermit: 'Permits pulled under Master Electrician license. Dallas requires separate city registration.',
    bondRequired: 'No state bond, but city registration may require it',
    board: 'TDLR (Texas Department of Licensing & Regulation)',
    boardUrl: 'https://www.tdlr.texas.gov/electricians/',
    renewalCycle: '1 year with CE hours',
    examRequired: true,
    notes: 'Master Electricians are required to supervise Journeyman and Apprentice electricians. You can pull permits directly. 8 CE hours per year required for renewal.',
  },
};

export default function ContractorLicensingDFW() {
  const [selectedTrade, setSelectedTrade] = useState('');
  const info = selectedTrade ? TRADE_DETAILS[selectedTrade] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#1e3a5f', color: '#60a5fa', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            📋 Texas Licensing Guide
          </span>
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2, color: '#f1f5f9' }}>
          DFW Contractor Licensing<br />Requirements
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 40 }}>
          Know exactly what licenses you need to legally operate in Dallas–Fort Worth. Select your trade for a full breakdown.
        </p>

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 32, marginBottom: 32 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 10, fontSize: 15, color: '#cbd5e1' }}>🔍 Select Your Trade</label>
          <select
            value={selectedTrade}
            onChange={e => setSelectedTrade(e.target.value)}
            style={{ width: '100%', maxWidth: 400, padding: '12px 14px', background: '#0f172a', border: '1px solid #475569', borderRadius: 8, fontSize: 16, color: '#e2e8f0' }}
          >
            <option value="">Choose a trade...</option>
            {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          {info && (
            <div style={{ marginTop: 28 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 20 }}>
                {[
                  { icon: '📜', label: 'State License', value: info.stateLicense },
                  { icon: '🏛️', label: 'City Permits (DFW)', value: info.cityPermit },
                  { icon: '🔒', label: 'Bond Requirement', value: info.bondRequired },
                  { icon: '🔄', label: 'Renewal Cycle', value: info.renewalCycle },
                ].map(item => (
                  <div key={item.label} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 10, padding: 18 }}>
                    <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.5 }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                <span style={{ background: info.examRequired ? '#7f1d1d' : '#14532d', color: info.examRequired ? '#fca5a5' : '#86efac', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                  {info.examRequired ? '📝 Exam Required' : '✅ No Exam Required'}
                </span>
              </div>

              <div style={{ background: '#1e3a5f', border: '1px solid #1e40af', borderRadius: 10, padding: 18, marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#93c5fd', fontWeight: 600, marginBottom: 8 }}>📌 Important Notes</div>
                <p style={{ fontSize: 14, color: '#bfdbfe', margin: 0, lineHeight: 1.7 }}>{info.notes}</p>
              </div>

              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 10, padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Licensing Board</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0' }}>{info.board}</div>
                </div>
                <a href={info.boardUrl} target="_blank" rel="noopener noreferrer"
                  style={{ background: '#2563eb', color: '#fff', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
                  Official Website →
                </a>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: '#f1f5f9' }}>⚡ Quick Reference: State vs City</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155' }}>
                  {['Trade', 'State License', 'Board', 'City Permit Needed?'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Electrician', '✅ Yes', 'TDLR', '✅ Yes'],
                  ['Plumber', '✅ Yes', 'TSBPE', '✅ Yes'],
                  ['HVAC Tech', '✅ Yes', 'TDLR / TACL', '✅ Yes'],
                  ['Roofer', '❌ No', '—', '✅ Yes (>25% roof)'],
                  ['Handyman', '❌ No', '—', '⚠️ Depends on work'],
                  ['General Contractor', '❌ No', '—', '✅ Yes for structural'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e293b', background: i % 2 === 0 ? '#0f172a' : 'transparent' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '10px 14px', color: '#cbd5e1' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#1e3a5f', border: '1px solid #1e40af', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 8px', color: '#f1f5f9' }}>💡 ProLnk & Licensing</h3>
          <p style={{ fontSize: 14, color: '#93c5fd', margin: 0, lineHeight: 1.7 }}>
            ProLnk verifies your license before activating your account. Operating without a required license is illegal and will result in immediate removal from the platform. Unlicensed pros also expose homeowners to legal liability and void their homeowner's insurance on related claims.
          </p>
        </div>
      </div>
    </div>
  );
}
