import { useState } from 'react';

type AgeKey = 'new' | 'mid' | 'old';
type StatusKey = 'registered' | 'not_registered' | 'expired' | 'unknown';

const assessments: Record<AgeKey, Record<StatusKey, { coverage: string; status: string; action: string[]; extendedCost: string; color: string }>> = {
  new: {
    registered: {
      coverage: 'Full 10-year parts + 1-year labor',
      status: 'Fully Protected',
      action: ['Keep all maintenance records', 'Schedule annual tune-up to maintain coverage', 'Use licensed contractor for all service calls'],
      extendedCost: '$350 - $600 for extended labor warranty',
      color: '#065F46',
    },
    not_registered: {
      coverage: '5-year parts only (default unregistered)',
      status: 'Partially Protected',
      action: ['Register immediately at manufacturer website', 'Registration extends parts to 10 years', 'Most brands allow 60-90 days to register after install'],
      extendedCost: '$350 - $600 for extended labor warranty',
      color: '#78350F',
    },
    expired: {
      coverage: 'None - registration window closed',
      status: 'Reduced Coverage',
      action: ['Call manufacturer to see if late registration is possible', 'Purchase third-party extended warranty immediately', 'Get annual maintenance contract with local HVAC company'],
      extendedCost: '$450 - $750 for third-party warranty',
      color: '#78350F',
    },
    unknown: {
      coverage: 'Unknown - needs verification',
      status: 'Verify Status',
      action: ['Find model and serial number on outdoor unit label', 'Check manufacturer website with serial to see warranty status', 'Contact installing contractor for warranty documentation'],
      extendedCost: '$350 - $600 depending on what you find',
      color: '#1E3A5F',
    },
  },
  mid: {
    registered: {
      coverage: 'Parts covered through year 10, labor expired',
      status: 'Parts Only',
      action: ['Labor warranty likely expired - you pay labor on repairs', 'Consider HVAC service contract for labor coverage', 'Keep maintenance records to protect remaining parts warranty'],
      extendedCost: '$400 - $650 for service contract coverage',
      color: '#94A3B8',
    },
    not_registered: {
      coverage: 'Limited or no parts warranty remaining',
      status: 'Minimal Coverage',
      action: ['Purchase third-party extended warranty now', 'Annual maintenance contract strongly recommended', 'Budget for potential repairs out of pocket'],
      extendedCost: '$500 - $800 for third-party warranty',
      color: '#78350F',
    },
    expired: {
      coverage: 'No manufacturer warranty',
      status: 'No Coverage',
      action: ['Third-party warranty is your best option', 'HVAC service contract covers labor and some parts', 'Start planning for replacement within 3-5 years'],
      extendedCost: '$500 - $900 for third-party warranty',
      color: '#7F1D1D',
    },
    unknown: {
      coverage: 'Unknown - likely expired',
      status: 'Likely Expired',
      action: ['Verify with manufacturer using serial number', 'Assume minimal coverage and consider service contract', 'Get system inspection to assess remaining lifespan'],
      extendedCost: '$400 - $700 depending on system condition',
      color: '#1E3A5F',
    },
  },
  old: {
    registered: {
      coverage: 'All manufacturer warranty periods have expired',
      status: 'Out of Warranty',
      action: ['No manufacturer coverage remaining', 'Third-party warranty may not be available for systems over 10 years', 'Start budgeting for replacement - DFW average system life is 12-15 years'],
      extendedCost: 'Replacement planning: $5,000 - $12,000',
      color: '#7F1D1D',
    },
    not_registered: {
      coverage: 'No warranty coverage',
      status: 'No Coverage',
      action: ['No coverage options available from manufacturer', 'Focus on maintenance to extend system life', 'Get a system assessment and start replacement planning'],
      extendedCost: 'Replacement planning: $5,000 - $12,000',
      color: '#7F1D1D',
    },
    expired: {
      coverage: 'No warranty coverage',
      status: 'No Coverage',
      action: ['System is past typical warranty lifespan', 'Annual tune-up to maximize remaining life', 'DFW heat is hard on systems - plan replacement in next 1-3 years'],
      extendedCost: 'Replacement planning: $5,000 - $12,000',
      color: '#7F1D1D',
    },
    unknown: {
      coverage: 'No coverage - system too old',
      status: 'Plan for Replacement',
      action: ['Warranty irrelevant at this age in DFW climate', 'Get a comprehensive system inspection', 'Start comparing replacement options and financing'],
      extendedCost: 'Replacement planning: $5,000 - $12,000',
      color: '#7F1D1D',
    },
  },
};

export default function DFWHVACWarrantyGuide() {
  const [age, setAge] = useState<AgeKey | ''>('');
  const [status, setStatus] = useState<StatusKey | ''>('');
  const [result, setResult] = useState<{ coverage: string; status: string; action: string[]; extendedCost: string; color: string } | null>(null);

  function calculate() {
    if (!age || !status) return;
    setResult(assessments[age][status]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>HVAC Warranty Guide for DFW</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          Most DFW homeowners do not know what their HVAC warranty covers. A common mistake costs thousands in avoidable repair bills.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Two Types of HVAC Warranty</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['Manufacturer Parts Warranty', '10 years on parts when registered within 60 days of install. Covers compressor, coils, heat exchanger. Does NOT cover labor.'],
              ['Labor Warranty', 'Provided by your installing contractor, typically 1 year. After that, you pay labor even if the part is still under warranty.'],
              ['What Voids Your Warranty', 'Skipping annual maintenance, dirty coils from neglect, unauthorized modifications, refrigerant added without leak repair.'],
              ['Extended Warranty Options', 'Third-party service contracts cover both parts and labor after manufacturer warranty expires. Cost varies by system age and brand.'],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{title as string}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Check Your Coverage</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>System age</label>
              <select value={age} onChange={e => setAge(e.target.value as AgeKey)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select age</option>
                <option value="new">0-3 years old</option>
                <option value="mid">4-10 years old</option>
                <option value="old">Over 10 years old</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Warranty registration status</label>
              <select value={status} onChange={e => setStatus(e.target.value as StatusKey)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select status</option>
                <option value="registered">Registered with manufacturer</option>
                <option value="not_registered">Never registered</option>
                <option value="expired">Registration window passed</option>
                <option value="unknown">Not sure</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Check My Coverage
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ background: result.color, borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 700 }}>{result.status}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>CURRENT COVERAGE</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{result.coverage}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>WHAT TO DO NOW</div>
              {result.action.map(a => <div key={a} style={{ marginBottom: 8, fontSize: 14, paddingLeft: 12, borderLeft: '2px solid #1E3A5F' }}>{a}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>Extended protection cost</span>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 15 }}>{result.extendedCost}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
