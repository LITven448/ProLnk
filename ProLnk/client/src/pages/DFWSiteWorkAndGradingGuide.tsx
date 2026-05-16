import { useState } from 'react';

const LOT_SIZES = {
  small: { label: 'Small Lot (under 0.5 ac)', surveyBase: 800, soilTest: 1200, gradeBase: 4000 },
  medium: { label: 'Medium Lot (0.5–2 ac)', surveyBase: 1200, soilTest: 1800, gradeBase: 9000 },
  large: { label: 'Large Lot (2–10 ac)', surveyBase: 2000, soilTest: 3500, gradeBase: 20000 },
  acreage: { label: 'Acreage (10+ ac)', surveyBase: 4000, soilTest: 6000, gradeBase: 45000 },
};

const LOCATIONS = {
  inner: { label: 'Inner DFW / Established Suburb', waterSewer: 3000, septicRisk: false, utilityCost: 4000, clayRisk: 'Medium' },
  suburb: { label: 'Outer Suburb (25–40mi)', waterSewer: 6000, septicRisk: false, utilityCost: 8000, clayRisk: 'High' },
  exurb: { label: 'DFW Exurb (40–70mi)', waterSewer: 0, septicRisk: true, utilityCost: 18000, clayRisk: 'Very High' },
  rural: { label: 'Rural County (70mi+)', waterSewer: 0, septicRisk: true, utilityCost: 28000, clayRisk: 'Extreme' },
};

const CHECKLIST = [
  { item: 'Boundary Survey', required: true, note: 'RPLS-certified surveyor required in Texas' },
  { item: 'Soil Bearing Test', required: true, note: 'Determines foundation type — critical in DFW clay' },
  { item: 'Perc Test (if septic)', required: false, note: 'Required by county health dept before septic permit' },
  { item: 'Topographic Survey', required: false, note: 'Required for engineered drainage plan' },
  { item: 'Tree Survey', required: false, note: 'Required in many DFW cities for protected trees' },
  { item: 'Drainage Engineering Plan', required: true, note: 'Required for building permit in most DFW jurisdictions' },
  { item: 'Utility Locate (811)', required: true, note: 'Free — call before any digging' },
  { item: 'Flood Zone Determination', required: true, note: 'Check FEMA FIRM maps — affects insurance and permitting' },
];

const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function DFWSiteWorkAndGradingGuide() {
  const [lotSize, setLotSize] = useState('medium');
  const [location, setLocation] = useState('suburb');
  const [hasSeptic, setHasSeptic] = useState(false);

  const ls = LOT_SIZES[lotSize as keyof typeof LOT_SIZES];
  const loc = LOCATIONS[location as keyof typeof LOCATIONS];

  const needsSeptic = loc.septicRisk || hasSeptic;
  const septicCost = needsSeptic ? 15000 : 0;
  const percCost = needsSeptic ? 800 : 0;
  const totalEstimate = ls.surveyBase + ls.soilTest + ls.gradeBase + loc.waterSewer + loc.utilityCost + septicCost + percCost + 3500;
  const timelineWeeks = lotSize === 'acreage' ? 16 : lotSize === 'large' ? 12 : 8;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 12 }}>
          DFW Construction Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Site Work &amp; Land Grading Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40 }}>
          Everything you need before breaking ground in DFW — surveys, soil, drainage, and utility connections.
        </p>

        <div style={{ background: '#1a1a0d', borderRadius: 12, padding: 20, marginBottom: 32, border: '1px solid #3a3a1e' }}>
          <div style={{ color: '#fef08a', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>⚠️ DFW Clay Soil Warning</div>
          <div style={{ color: '#fef9c3', fontSize: 14, lineHeight: 1.6 }}>
            Dallas-Fort Worth sits on expansive Blackland Prairie clay. This soil shrinks in drought and swells with rain, causing foundation movement that costs $15,000–$80,000+ to repair. Every custom home in DFW needs a geotechnical report before foundation design.
          </div>
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>📐 Estimate Site Prep Costs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Lot Size</label>
              <select value={lotSize} onChange={e => setLotSize(e.target.value)}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, marginTop: 8 }}>
                {Object.entries(LOT_SIZES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Location</label>
              <select value={location} onChange={e => { setLocation(e.target.value); setHasSeptic(LOCATIONS[e.target.value as keyof typeof LOCATIONS].septicRisk); }}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, marginTop: 8 }}>
                {Object.entries(LOCATIONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <input type="checkbox" id="septic" checked={hasSeptic} onChange={e => setHasSeptic(e.target.checked)}
              style={{ width: 18, height: 18, cursor: 'pointer' }} />
            <label htmlFor="septic" style={{ color: '#cbd5e1', fontSize: 14, cursor: 'pointer' }}>Requires Septic System (no municipal sewer available)</label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Survey', val: fmt(ls.surveyBase) },
              { label: 'Soil/Geotech Testing', val: fmt(ls.soilTest) },
              { label: 'Grading &amp; Drainage', val: fmt(ls.gradeBase) },
              { label: 'Utility Connections', val: fmt(loc.utilityCost) },
              { label: needsSeptic ? 'Septic System' : 'Water/Sewer Tap', val: fmt(needsSeptic ? septicCost : loc.waterSewer) },
              { label: 'Permits &amp; Inspections', val: fmt(3500) },
            ].map(item => (
              <div key={item.label} style={{ background: '#1a2a4a', borderRadius: 8, padding: 14, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: 13 }} dangerouslySetInnerHTML={{ __html: item.label }} />
                <span style={{ fontWeight: 700, fontSize: 14 }}>{item.val}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ color: '#0A1628', fontSize: 13, fontWeight: 700 }}>TOTAL SITE PREP COST</div>
              <div style={{ color: '#0A1628', fontSize: 28, fontWeight: 900 }}>{fmt(totalEstimate)}</div>
            </div>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ color: '#0A1628', fontSize: 13, fontWeight: 700 }}>TIMELINE BEFORE BUILD</div>
              <div style={{ color: '#0A1628', fontSize: 28, fontWeight: 900 }}>{timelineWeeks} weeks</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>📋 Pre-Construction Checklist</h3>
          {CHECKLIST.map(item => (
            <div key={item.item} style={{ display: 'flex', gap: 14, marginBottom: 14, padding: '12px 0', borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ background: item.required ? '#F5E642' : '#1a2a4a', color: item.required ? '#0A1628' : '#64748b', borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 700, flexShrink: 0, height: 'fit-content' }}>
                {item.required ? 'REQUIRED' : 'SITUATIONAL'}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{item.item}</div>
                <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
