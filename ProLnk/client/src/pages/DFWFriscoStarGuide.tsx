import { useState } from 'react';

const buildYears = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];

type WarrantyInfo = {
  builderStatus: string;
  structuralStatus: string;
  hvacStatus: string;
  applianceStatus: string;
};

type InspectionItem = { item: string; urgency: string; why: string };
type CommonIssue = { issue: string; type: string; action: string };

function getWarrantyInfo(year: number): WarrantyInfo {
  const age = 2026 - year;
  return {
    builderStatus: age <= 1 ? '✅ Active (1-year workmanship)' : '❌ Expired',
    structuralStatus: age <= 10 ? `✅ Active (${10 - age} yrs remain — structural defects)` : '❌ Expired',
    hvacStatus: age <= 5 ? `✅ Likely active (check paperwork — ${5 - age} yrs typical)` : '⚠️ Likely expired — check manufacturer warranty',
    applianceStatus: age <= 2 ? '✅ Likely active (1–2 yr manufacturer)' : '⚠️ Expired — check individual appliance warranties',
  };
}

function getInspectionItems(year: number): InspectionItem[] {
  const age = 2026 - year;
  const items: InspectionItem[] = [];

  if (age <= 1) {
    items.push(
      { item: 'Pre-warranty-expiry inspection (11-month inspection)', urgency: '🔴 Do this NOW', why: 'Before 1-yr builder warranty expires — find all defects while covered' },
      { item: 'Foundation settlement cracks (interior + exterior)', urgency: '🔴 Urgent', why: 'New builds settle aggressively in year 1; document everything' },
      { item: 'Grading + drainage away from foundation', urgency: '🔴 Urgent', why: 'Builders grade minimally; improper drainage = foundation damage' },
      { item: 'HVAC airflow balance (each room)', urgency: '🟡 High', why: 'Builders often oversize HVAC for DFW; check for hot/cold spots' },
      { item: 'Window + door seals (air infiltration test)', urgency: '🟡 High', why: 'Common installation defects in new builds' },
      { item: 'Attic insulation coverage + ventilation', urgency: '🟡 High', why: 'Frisco summers are brutal; verify R-38+ in attic' },
    );
  } else if (age <= 3) {
    items.push(
      { item: 'Foundation crack monitoring', urgency: '🔴 Urgent', why: 'Year 2–3 is peak settlement; new cracks need documentation' },
      { item: 'Concrete driveway + walkway cracking', urgency: '🟡 High', why: 'DFW clay expansion is aggressive; seal cracks before water intrusion' },
      { item: 'Fence post settling (wood or metal)', urgency: '🟡 High', why: 'Posts set in clay soil shift as ground moves' },
      { item: 'HVAC filter + coil cleaning (post-construction)', urgency: '🟡 High', why: 'Construction dust in ducts causes coil fouling' },
      { item: 'Plumbing: check for slow drains (root intrusion rare but possible)', urgency: '🟡 High', why: 'New landscaping roots grow fast in DFW' },
      { item: 'Caulking around tubs, showers, countertops', urgency: '🟢 Standard', why: 'Settlement causes caulk to crack; regrout/recaulk every 2–3 yrs' },
    );
  } else if (age <= 5) {
    items.push(
      { item: 'Roof inspection (post-hail season)', urgency: '🔴 Urgent', why: 'DFW hail damage not always visible from ground; inspect after every major storm' },
      { item: 'HVAC refrigerant check + coil inspection', urgency: '🟡 High', why: 'Year 3–5 leaks show up; catch before compressor fails' },
      { item: 'Foundation monitoring (annual measurement)', urgency: '🟡 High', why: 'Peak movement period still active in clay soils' },
      { item: 'Water heater anode rod replacement', urgency: '🟡 High', why: 'DFW hard water degrades anode fast; replace yr 4–5' },
      { item: 'Exterior caulking + paint (if Hardie plank)', urgency: '🟡 High', why: 'Hardie needs repaint at 5–7 yrs in DFW UV' },
      { item: 'Irrigation head adjustment + controller programming', urgency: '🟢 Standard', why: 'Landscape matures; adjust zones for established plants' },
    );
  } else if (age <= 8) {
    items.push(
      { item: 'HVAC efficiency check (approaching warranty end)', urgency: '🔴 Urgent', why: 'HVAC warranty typically 5 yrs; any issues must be filed now' },
      { item: 'Roof full inspection (7–8 yr check)', urgency: '🟡 High', why: 'Minor hail damage accumulates; verify no slow leaks started' },
      { item: 'Water heater replacement planning', urgency: '🟡 High', why: 'Tank WH lifespan 8–12 yrs; start planning replacement' },
      { item: 'Garage door spring + opener service', urgency: '🟡 High', why: 'Springs last 7–10 yrs; lubricate and tension check' },
      { item: 'Foundation measurement (establish baseline)', urgency: '🟡 High', why: '10-year warranty window closing; document current state' },
      { item: 'Wood fence replacement planning', urgency: '🟢 Standard', why: 'Cedar fence in DFW lasts ~7–10 yrs; inspect for rot' },
    );
  } else {
    items.push(
      { item: '10-year structural warranty expiring — full inspection NOW', urgency: '🔴 Critical', why: 'File all structural defects before 10-yr warranty closes forever' },
      { item: 'HVAC replacement planning', urgency: '🔴 Urgent', why: 'DFW climate is brutal on HVAC; plan for year 12–15 replacement' },
      { item: 'Roof replacement assessment', urgency: '🟡 High', why: '30-yr shingles degrade faster in DFW heat; inspect now' },
      { item: 'Water heater replacement', urgency: '🟡 High', why: 'Exceeding average lifespan in hard water DFW market' },
      { item: 'Foundation full assessment (end of warranty)', urgency: '🟡 High', why: 'Document foundation health before warranty expires' },
      { item: 'Smart home system updates (aging hardware)', urgency: '🟢 Standard', why: 'Hardware from 2015–2016 build era needs upgrade' },
    );
  }

  return items;
}

const commonNewConstructionIssues: CommonIssue[] = [
  { issue: 'Concrete slab cracking (DFW clay expansion)', type: '🏗️ Structural', action: 'Document, monitor, file warranty claim if >1/4 inch' },
  { issue: 'HVAC oversizing (too large for square footage)', type: '❄️ HVAC', action: 'Get Manual J calculation; right-size system if comfort issues persist' },
  { issue: 'Poor grading (water pools near foundation)', type: '💧 Drainage', action: 'Re-grade immediately; French drain if needed — do not delay' },
  { issue: 'Window moisture between panes (seal failure)', type: '🪟 Windows', action: 'Builder warranty covers in year 1; document and file claim' },
  { issue: 'Nail pops in drywall (normal settlement)', type: '🔨 Cosmetic', action: 'Touch up paint; expected in year 1–3; not a defect' },
  { issue: 'Stucco or brick mortar cracks', type: '🧱 Exterior', action: 'Monitor size; hairline is normal, >1/4 inch file warranty claim' },
  { issue: 'Irrigation zone failure (controller or head)', type: '🌿 Landscaping', action: 'Annual startup/shutdown service with irrigation company' },
  { issue: 'Attic heat buildup (insufficient ventilation)', type: '🌡️ Energy', action: 'Add ridge vent or power attic ventilator; check soffit vents are clear' },
];

export default function DFWFriscoStarGuide() {
  const [buildYear, setBuildYear] = useState('');

  const year = buildYear ? parseInt(buildYear) : 0;
  const warranty = buildYear ? getWarrantyInfo(year) : null;
  const inspectionItems = buildYear ? getInspectionItems(year) : [];
  const age = buildYear ? 2026 - year : 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>⭐ FRISCO NEIGHBORHOOD GUIDE</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Frisco Star District Area</h1>
        <h2 style={{ fontSize: 18, fontWeight: 400, color: '#a0b0c8', marginBottom: 24 }}>New Home Warranty & Maintenance Guide (2018–2026 Builds)</h2>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
          <p style={{ margin: 0, lineHeight: 1.7, color: '#c8d8e8' }}>
            The Frisco Star and Hall Park corridor contains some of DFW's newest residential development — homes built from <strong style={{ color: '#F5E642' }}>2018 through 2026</strong>. New construction comes with warranties, but also with unique first-decade issues: clay soil settlement, HVAC sizing errors, grading problems, and builder shortcuts that only show up after year 1. Know your warranty status and what to inspect now.
          </p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', marginBottom: 10, color: '#F5E642', fontWeight: 600, fontSize: 14 }}>📅 Select Your Build Year</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {buildYears.map(y => (
              <button key={y} onClick={() => setBuildYear(y)} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${buildYear === y ? '#F5E642' : '#1e3a5f'}`, backgroundColor: buildYear === y ? '#1a2e4a' : '#0f2040', color: buildYear === y ? '#F5E642' : '#c8d8e8', fontWeight: buildYear === y ? 700 : 400, cursor: 'pointer', fontSize: 15 }}>
                {y}
              </button>
            ))}
          </div>
        </div>

        {warranty && (
          <div>
            <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 17 }}>Warranty Status — {buildYear} Build ({age} year{age !== 1 ? 's' : ''} old)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: '1-Year Builder', value: warranty.builderStatus },
                  { label: '10-Year Structural', value: warranty.structuralStatus },
                  { label: 'HVAC System', value: warranty.hvacStatus },
                  { label: 'Appliances', value: warranty.applianceStatus },
                ].map((w, i) => (
                  <div key={i} style={{ backgroundColor: '#162840', borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: 12, color: '#a0b0c8', marginBottom: 4 }}>{w.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{w.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 17 }}>What to Inspect Now</h3>
            {inspectionItems.map((item, i) => (
              <div key={i} style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '14px 18px', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{item.item}</div>
                  <div style={{ fontSize: 13 }}>{item.urgency}</div>
                </div>
                <div style={{ fontSize: 13, color: '#a0b0c8' }}>→ {item.why}</div>
              </div>
            ))}

            <div style={{ marginTop: 28 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 17 }}>Common New Construction Issues in DFW</h3>
              {commonNewConstructionIssues.map((issue, i) => (
                <div key={i} style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '12px 16px', marginBottom: 10, display: 'grid', gridTemplateColumns: '1fr auto', gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 3 }}>{issue.issue}</div>
                    <div style={{ fontSize: 12, color: '#a0b0c8', marginBottom: 4 }}>{issue.type}</div>
                    <div style={{ fontSize: 13, color: '#c8d8e8' }}>✅ {issue.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!buildYear && (
          <div style={{ textAlign: 'center', padding: 40, color: '#4a6a8a' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏗️</div>
            <div style={{ fontSize: 16 }}>Select your build year to see warranty status and what to inspect right now.</div>
          </div>
        )}

        <div style={{ marginTop: 36, padding: 20, backgroundColor: '#0f2040', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get a New Construction Inspection</div>
          <div style={{ color: '#a0b0c8', fontSize: 14, marginBottom: 16 }}>ProLnk connects Frisco homeowners with inspectors and contractors who specialize in new construction warranty claims and first-decade maintenance.</div>
          <div style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Schedule My Inspection →</div>
        </div>
      </div>
    </div>
  );
}
