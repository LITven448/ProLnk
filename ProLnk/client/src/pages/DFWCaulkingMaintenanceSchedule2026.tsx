import { useState } from 'react';

const locations = ['Window perimeters (exterior)', 'Door frames (exterior)', 'Tub / shower surround', 'Kitchen backsplash + sink', 'Exterior wall penetrations', 'Foundation-to-siding joint', 'Garage door frame'];

type LocationKey = 'Window perimeters (exterior)' | 'Door frames (exterior)' | 'Tub / shower surround' | 'Kitchen backsplash + sink' | 'Exterior wall penetrations' | 'Foundation-to-siding joint' | 'Garage door frame';

interface LocationInfo {
  lifespan: string;
  season: string;
  diy: string;
  pro: string;
  signs: string;
}

const locationData: Record<LocationKey, LocationInfo> = {
  'Window perimeters (exterior)': { lifespan: '3-5 years in DFW UV', season: 'Spring or fall (50-80F)', diy: 'Yes - silicone exterior caulk, paintable', pro: 'If multiple windows or 2nd story', signs: 'Cracking, pulling away from frame, chalky white appearance' },
  'Door frames (exterior)': { lifespan: '4-6 years', season: 'Spring or fall', diy: 'Yes - polyurethane or silicone', pro: 'If door is warped or frame is rotted', signs: 'Drafts, insects entering, visible gaps' },
  'Tub / shower surround': { lifespan: '2-4 years (high moisture)', season: 'Any time - interior project', diy: 'Yes - 100% silicone only', pro: 'If tile grout also failing or mold present', signs: 'Black mold, peeling, water behind tile' },
  'Kitchen backsplash + sink': { lifespan: '3-5 years', season: 'Any time', diy: 'Yes - clear or matching silicone', pro: 'If countertop or cabinet damage present', signs: 'Lifting edges, discoloration, water under sink' },
  'Exterior wall penetrations': { lifespan: '4-7 years', season: 'Spring - inspect after winter', diy: 'Accessible locations only', pro: 'Highly recommended - critical water intrusion point', signs: 'Staining on interior walls, pest entry' },
  'Foundation-to-siding joint': { lifespan: '5-8 years', season: 'Fall - before rain season', diy: 'Possible but tricky', pro: 'Recommended - needs compatible product for movement', signs: 'Gap visible, bugs entering, water staining at base' },
  'Garage door frame': { lifespan: '4-6 years', season: 'Spring or fall', diy: 'Yes - paintable latex or polyurethane', pro: 'If frame wood is rotted', signs: 'Daylight visible, drafts, insects' },
};

const rules = [
  'Apply only when 50-80F - extreme heat causes shrinkage',
  'Remove all old caulk before applying new - never layer over old',
  'Use 100% silicone for wet areas, polyurethane for exterior wood',
  'Never caulk in direct summer sun or when rain is forecast within 24 hrs',
  'Latex caulk on exterior fails within 1-2 years in DFW UV - avoid it',
];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e3a5f', paddingBottom: '0.6rem' }}>
      <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700 }}>{label}</span>
      <span style={{ color: '#cbd5e1', fontSize: '0.88rem', maxWidth: '60%', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

export default function DFWCaulkingMaintenanceSchedule2026() {
  const [location, setLocation] = useState<LocationKey>('Window perimeters (exterior)');
  const data = locationData[location];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🔧🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Caulking Maintenance Schedule 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>DFW UV degrades caulk in 3-5 years. Best seasons: spring or fall (50-80F). Never caulk in 100F summer heat.</p>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem' }}>
          <p style={{ color: '#F5E642', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Select Caulk Location</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {locations.map(l => (
              <button
                key={l}
                onClick={() => setLocation(l as LocationKey)}
                style={{
                  background: location === l ? '#F5E642′ : '#0A1628',
                  color: location === l ? '#0A1628′ : '#cbd5e1',
                  border: '1px solid #1e3a5f',
                  borderRadius: 6,
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: location === l ? 700 : 400,
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {data && (
          <div style={{ background: '#132040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Details: {location}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <Row label="Lifespan in DFW" value={data.lifespan} />
              <Row label="Best Season to Caulk" value={data.season} />
              <Row label="DIY?" value={data.diy} />
              <Row label="Call a Pro?" value={data.pro} />
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.85rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Signs It Is Time to Re-Caulk</span>
                <span style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>{data.signs}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', fontSize: '0.95rem', marginBottom: '0.75rem' }}>DFW Caulking Rules</h3>
          {rules.map((rule, i) => (
            <p key={i} style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '0.3rem 0′ }}>{i < 3 ? '✅' : '❌'} {rule}</p>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            <strong style={{ color: '#F5E642′ }}>ProLnk Vault</strong> logs every caulking job - location, product used, date - so you never guess when it was last done.
          </p>
        </div>
      </div>
    </div>
  );
}
