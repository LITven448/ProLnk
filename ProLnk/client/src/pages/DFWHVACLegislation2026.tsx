import { useState } from 'react';

const projectTypes = ['New Installation', 'System Replacement', 'Repair Only', 'Refrigerant Work', 'Duct Work'];

const regulations: Record<string, { title: string; detail: string; impact: string }[]> = {
  'New Installation': [
    { title: 'SEER2 Minimum: 15 (Climate Zone 3)', detail: 'Federal law effective Jan 1, 2023. All new split AC systems in Texas must be rated at minimum 15 SEER2. Equipment manufactured before 2023 cannot be installed as new in DFW. Packaged units: 14.3 SEER2 minimum.', impact: 'You cannot legally install a 14 SEER unit in DFW. Contractors who do risk losing their license. Verify the SEER2 rating on the yellow EnergyGuide label before installation.' },
    { title: 'Manual J Load Calculation Required', detail: 'Texas state code requires a Manual J load calculation for all new HVAC installations. No code-compliant contractor can legally size a DFW system by square footage alone.', impact: 'Request the Manual J report from your contractor before installation. If they cannot provide one, find a different contractor. Proper sizing is the most important factor in DFW HVAC performance.' },
    { title: 'Permit Required in DFW Municipalities', detail: 'All Dallas and Fort Worth municipalities require permits for new HVAC installations. Permit fees: $75-250. Inspection within 5 business days of completion.', impact: 'Always ensure your contractor pulls the permit. Unpermitted work can void homeowner insurance, cause problems at resale, and leave you liable for code violations.' },
    { title: 'EPA 608 Certification Required', detail: 'Technicians installing systems with refrigerant must hold EPA 608 certification. Applies to R-410A, R-454B, R-32, and all regulated refrigerants in new DFW installations.', impact: 'Ask to see your technician EPA 608 card before work begins. Uncertified refrigerant handling is a federal violation.' },
  ],
  'System Replacement': [
    { title: 'SEER2 15 Minimum — No Grandfather Exemption', detail: 'Replacing an old 10 SEER unit means the replacement must meet current 15 SEER2 minimum. There is no grandfather exemption for replacements in DFW.', impact: 'Budget accordingly — 15+ SEER2 equipment costs more than older low-efficiency units. Energy savings offset costs in 6-10 years in DFW climate.' },
    { title: 'R-22 to R-454B Transition', detail: 'R-22 refrigerant production ended Jan 1, 2020. Replacing an R-22 system requires full system replacement — you cannot retrofit R-454B into R-22 equipment.', impact: 'If your DFW system uses R-22 and has a refrigerant leak, treat it as an automatic system replacement trigger. Budget $5,000-15,000 for full replacement.' },
    { title: 'Duct Inspection Often Required', detail: 'Many DFW municipalities require duct leakage testing on system replacements. Dallas code requires blower door test if replacing equipment more than 5 tons.', impact: 'Do not replace just the equipment and leave leaky DFW attic ducts. Duct sealing during replacement maximizes the efficiency of your new high-SEER2 system.' },
  ],
  'Repair Only': [
    { title: 'EPA 608 Required for Any Refrigerant Work', detail: 'Any repair involving refrigerant — adding charge, recovering, or replacing components — requires EPA 608 certified technicians. Applies to all DFW HVAC service calls involving refrigerant.', impact: 'Refrigerant venting is a federal crime with fines up to $44,539 per day. All refrigerant must be recovered by certified technicians using approved recovery equipment.' },
    { title: 'No Permit Required for Like-for-Like Repairs', detail: 'Replacing a capacitor, contactor, motor, or other component without modifying refrigerant circuits or ductwork typically does not require a permit in DFW municipalities.', impact: 'Save money on repair calls — you do not need permits for standard service repairs. Permits are only required when modifying system design or refrigerant circuit.' },
    { title: 'R-22 Refrigerant — Restricted Availability', detail: 'R-22 can only be sold to EPA 608 certified technicians. Reclaimed R-22 is legal; virgin R-22 production is banned. Expect $150-300 per pound for DFW R-22 service.', impact: 'R-22 repair costs often exceed system value. Get a replacement quote alongside the repair quote for any DFW R-22 system leak.' },
  ],
  'Refrigerant Work': [
    { title: 'AIM Act — HFC Phase-Down Schedule', detail: 'The American Innovation and Manufacturing Act phases down HFCs including R-410A by 85% from 2024-2036. R-454B is the primary replacement for DFW residential systems.', impact: 'New DFW systems installed after 2025 use R-454B. Existing R-410A systems can still be serviced with reclaimed R-410A, but supply is tightening and costs will rise.' },
    { title: 'Venting Prohibition — Clean Air Act Section 608', detail: 'Venting any refrigerant to atmosphere is illegal regardless of type. Fines up to $44,539 per day per violation. DFW EPA Region 6 enforcement is active.', impact: 'Never allow a technician to vent refrigerant outdoors. All refrigerant must be recovered into certified cylinders. Report violations to EPA Region 6 in Dallas.' },
    { title: 'Refrigerant Sales Restrictions', detail: 'R-410A and R-454B may only be sold to EPA 608 certified technicians. Homeowners cannot purchase refrigerant directly. Online sales to uncertified buyers are illegal.', impact: 'Do not attempt DIY refrigerant work. Incorrect charge damages compressors — the most expensive DFW HVAC repair at $800-2,500.' },
  ],
  'Duct Work': [
    { title: 'IECC 2021 — Duct Leakage Limits', detail: 'Texas adopted IECC 2021. New duct systems must pass leakage testing: total leakage at most 4 CFM25 per 100 sq ft. DFW attic ducts must be sealed and insulated to R-8 minimum.', impact: 'Ensure your duct contractor tests with a duct blaster after installation. Failing leakage means failed inspection and rework. Properly sealed DFW ducts save 20-30% on cooling costs.' },
    { title: 'Duct Insulation — R-8 Minimum in DFW Attics', detail: 'DFW attic temperatures reach 140-160 degrees F. IECC 2021 requires R-8 duct insulation in unconditioned attics. Many older DFW homes have R-4 or R-6 — far below current code.', impact: 'Upgrading duct insulation from R-4 to R-8 in a DFW attic reduces conductive losses significantly. Include duct insulation upgrade in any major DFW HVAC project.' },
    { title: 'Mastic or UL-Listed Tape Only — No Standard Duct Tape', detail: 'Building code prohibits standard duct tape for duct sealing. Only mastic sealant or UL-181-rated foil tape may be used on DFW duct systems.', impact: 'Standard silver duct tape fails within 1-3 years in DFW attic heat. Mastic is permanent. Require mastic sealant in any DFW duct work contract.' },
  ],
};

export default function DFWHVACLegislation2026() {
  const [activeType, setActiveType] = useState(projectTypes[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>⚖️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW HVAC Regulations 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Current laws and regulations affecting DFW HVAC projects — select your project type</p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {projectTypes.map(type => (
            <button key={type} onClick={() => setActiveType(type)}
              style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: activeType === type ? '#F5E642' : '#1e2d45', color: activeType === type ? '#0A1628' : '#94a3b8' }}>
              {type}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(regulations[activeType] || []).map((reg, i) => (
            <div key={i} style={{ background: '#1e2d45', borderRadius: 14, padding: '22px 24px', border: '1px solid #2a3f5f' }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 12px', fontSize: 17, fontWeight: 700 }}>📋 {reg.title}</h3>
              <p style={{ color: '#cbd5e1', margin: '0 0 14px', fontSize: 14, lineHeight: 1.7 }}>{reg.detail}</p>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', borderLeft: '3px solid #F5E642' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, marginBottom: 6 }}>WHAT THIS MEANS FOR YOU</div>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: 13, lineHeight: 1.6 }}>{reg.impact}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', background: '#1e2d45', borderRadius: 16, padding: '28px 24px' }}>
          <div style={{ fontSize: 32 }}>✅</div>
          <h3 style={{ color: '#F5E642', margin: '10px 0 8px' }}>Find Code-Compliant DFW Contractors</h3>
          <p style={{ color: '#94a3b8', margin: '0 0 16px', fontSize: 14 }}>ProLnk verifies contractor licenses and ensures all work meets 2026 DFW HVAC codes.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Compliant Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
