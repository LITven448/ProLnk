import { useState } from 'react';

const homeEras = ['Pre-1990', '1990-2005', '2006-2015', '2016-Present'];
const damageTypes = ['No Recent Storm', 'Minor Hail', 'Major Hail / Wind', 'Visible Damage'];

const eraData: Record<string, { urgency: string; action: string; costRange: string }> = {
  'Pre-1990': {
    urgency: '🔴 High Priority',
    action: 'Full replacement likely needed — shingles past 30-year lifespan. Schedule inspection immediately.',
    costRange: '$9,500 – $16,000',
  },
  '1990-2005': {
    urgency: '🟡 Moderate Priority',
    action: 'Inspection recommended — roof is 20+ years old. May need replacement within 2–3 years.',
    costRange: '$8,000 – $14,500',
  },
  '2006-2015': {
    urgency: '🟢 Monitor Closely',
    action: 'Mid-life roof — schedule annual inspection and address any missing shingles promptly.',
    costRange: '$6,500 – $11,000',
  },
  'Post-2016': {
    urgency: '✅ Low Priority',
    action: 'Newer roof — focus on storm damage checks and keep gutters clear.',
    costRange: '$3,000 – $7,000',
  },
};

const damageBoost: Record<string, string> = {
  'No Recent Storm': '',
  'Minor Hail': '⚡ Minor hail may void manufacturer warranty. Insurance inspection recommended.',
  'Major Hail / Wind': '🚨 Major storm event — document all damage for insurance claim before repairs.',
  'Visible Damage': '🚨 Visible damage requires immediate temporary weatherproofing and contractor inspection.',
};

export default function DFWRooferMcKinney() {
  const [era, setEra] = useState('');
  const [damage, setDamage] = useState('');

  const result = era ? eraData[era] ?? eraData['Post-2016'] : null;
  const boost = damage ? damageBoost[damage] : '';

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          🏠 ProLnk · McKinney TX
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          McKinney TX Roofers
        </h1>
        <p style={{ fontSize: 18, color: '#F5E642', marginBottom: 8 }}>
          Historic Downtown to New Suburb Specialists
        </p>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 40, maxWidth: 640 }}>
          McKinney spans more than a century of roofing eras — Victorian-era downtown homes to brand-new master-planned subdivisions. Collin County's hail corridor means storm exposure is a year-round concern for every homeowner.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          <div style={{ backgroundColor: '#111e35', borderRadius: 12, padding: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🌪️</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Collin County Hail Corridor</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>McKinney sits in one of North Texas's most active hail paths. Roofs here take more storm hits than DFW average.</div>
          </div>
          <div style={{ backgroundColor: '#111e35', borderRadius: 12, padding: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🏡</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Wide Roof Age Range</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>From 100-year-old historic homes to new construction — McKinney roofers must be fluent in every era and material.</div>
          </div>
          <div style={{ backgroundColor: '#111e35', borderRadius: 12, padding: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>📈</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Fastest Growing City in Texas</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>New subdivisions are constantly being added, creating demand for both installation and warranty-related service calls.</div>
          </div>
          <div style={{ backgroundColor: '#111e35', borderRadius: 12, padding: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🛡️</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Insurance Claim Expertise</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>Top McKinney roofers know how to document hail damage and work with adjusters to maximize your approved claim.</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111e35', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>⚡ Get Your McKinney Roof Assessment</h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>
              When was your home built?
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {homeEras.map(e => (
                <button
                  key={e}
                  onClick={() => setEra(e)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 8,
                    border: '2px solid',
                    borderColor: era === e ? '#F5E642' : '#1e3a5f',
                    backgroundColor: era === e ? '#F5E642' : 'transparent',
                    color: era === e ? '#0A1628' : '#fff',
                    fontWeight: era === e ? 700 : 400,
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>
              Any recent storm damage?
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {damageTypes.map(d => (
                <button
                  key={d}
                  onClick={() => setDamage(d)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 8,
                    border: '2px solid',
                    borderColor: damage === d ? '#F5E642' : '#1e3a5f',
                    backgroundColor: damage === d ? '#F5E642' : 'transparent',
                    color: damage === d ? '#0A1628' : '#fff',
                    fontWeight: damage === d ? 700 : 400,
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{result.urgency}</div>
              <div style={{ color: '#cbd5e1', marginBottom: 12 }}>{result.action}</div>
              {boost && <div style={{ color: '#fbbf24', marginBottom: 12, fontSize: 14 }}>{boost}</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 2 }}>Estimated McKinney Cost Range</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{result.costRange}</div>
                </div>
                <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 15 }}>
                  Get Free Quotes →
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
          ProLnk connects McKinney homeowners with vetted local roofers — no spam, no pressure.
        </div>
      </div>
    </div>
  );
}
