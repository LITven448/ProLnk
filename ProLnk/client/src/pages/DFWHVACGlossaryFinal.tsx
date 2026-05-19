import { useState } from 'react';

const terms = [
  { letter: 'A', term: 'AFUE', def: 'Annual Fuel Utilization Efficiency — measures furnace efficiency. DFW standard: 80% AFUE minimum; 96%+ AFUE recommended for mild DFW winters.' },
  { letter: 'A', term: 'Air Handler', def: 'Indoor unit that circulates air through your duct system. In DFW, typically installed in attic — extreme heat (140°F+) can stress components; insulate the unit itself.' },
  { letter: 'A', term: 'ARI', def: 'Air-Conditioning, Heating, and Refrigeration Institute — sets testing standards for SEER2 and other efficiency ratings used in DFW equipment specs.' },
  { letter: 'B', term: 'BTU', def: 'British Thermal Unit — base measure of heating/cooling capacity. DFW homes typically need 24,000-60,000 BTU cooling (2-5 tons). Manual J determines your exact BTU requirement.' },
  { letter: 'B', term: 'Blower Motor', def: 'Fan motor that pushes air through your ducts. DFW systems with variable-speed blower motors run longer at lower speeds — better dehumidification in DFW\’s humid spring.' },
  { letter: 'C', term: 'CFM', def: 'Cubic Feet per Minute — airflow measurement. DFW standard: 400 CFM per ton of cooling. Low CFM (restricted airflow) is a top cause of DFW system failures.' },
  { letter: 'C', term: 'COP', def: 'Coefficient of Performance — heat pump efficiency ratio. DFW heat pumps deliver COP of 3-4 in mild weather (65°F), dropping to 1.5-2 during rare hard freezes.' },
  { letter: 'C', term: 'Condenser', def: 'Outdoor unit that releases heat. DFW condensers face brutal conditions — 100°F ambient air, hail, UV radiation. Keep 18″ clearance, clean fins annually, never cover.' },
  { letter: 'C', term: 'Compressor', def: 'Heart of the AC system — compresses refrigerant. The most expensive component ($800-2,500). DFW\’s 3,000+ annual runtime hours stress compressors; proper charge is critical.' },
  { letter: 'D', term: 'Duct Leakage', def: 'Air escaping from unsealed ducts. DFW attic ducts in 140°F heat with gaps waste 20-30% of conditioned air. Duct sealing/Aeroseal is high-ROI in DFW.' },
  { letter: 'D', term: 'Dual Fuel', def: 'System combining a heat pump with a gas furnace backup. Ideal for DFW: heat pump handles 95% of heating; gas activates below 30-35°F during ice storms.' },
  { letter: 'D', term: 'Desuperheater', def: 'Heat recovery device that uses waste heat from AC to preheat water. In DFW\’s long cooling season, a desuperheater can provide 50-60% of hot water needs free.' },
  { letter: 'E', term: 'EER', def: 'Energy Efficiency Ratio — efficiency at a single high-temp point (95°F). EER matters more in DFW than northern states because we operate at extreme temps most of summer.' },
  { letter: 'E', term: 'Evaporator Coil', def: 'Indoor coil where refrigerant absorbs heat and moisture. DFW\’s humidity causes heavy condensation — dirty coils grow mold (dirty sock syndrome). Clean annually.' },
  { letter: 'F', term: 'Filter Drier', def: 'Component that removes moisture from refrigerant. DFW\’s humidity makes filter driers critical — replace during every DFW system service to protect the compressor.' },
  { letter: 'H', term: 'HSPF2', def: 'Heating Seasonal Performance Factor 2 — heat pump heating efficiency. DFW minimum: 7.5 HSPF2. For mild DFW winters, HSPF2 matters less than SEER2, but still affects winter bills.' },
  { letter: 'H', term: 'Heat Pump', def: 'System that moves heat rather than generating it — highly efficient in DFW\’s mild winters. Modern cold-climate heat pumps work to -15°F, well below DFW\’s coldest temps.' },
  { letter: 'I', term: 'IAQ', def: 'Indoor Air Quality — DFW has some of the worst outdoor air quality in Texas (cedar, oak pollen; ozone alerts). MERV-13+ filters, UV lights, and fresh air ventilation address DFW IAQ.' },
  { letter: 'L', term: 'Latent Load', def: 'Moisture (humidity) that your AC must remove, measured in BTU. DFW has extremely high latent loads in spring. Systems that short-cycle can\’t remove latent load adequately.' },
  { letter: 'L', term: 'Load Calculation', def: 'Engineering analysis of your home\’s heating/cooling needs. Manual J is the standard. Every DFW HVAC replacement should include a load calc — 60% of DFW systems are oversized.' },
  { letter: 'M', term: 'Manual J', def: 'ACCA\’s residential load calculation standard. Accounts for DFW-specific factors: 105°F design day, solar exposure, attic conditions, window efficiency. Required for proper DFW sizing.' },
  { letter: 'M', term: 'MERV', def: 'Minimum Efficiency Reporting Value — filter efficiency rating. DFW recommendation: MERV-11 for pollen; MERV-13 for allergy sufferers. Check your system\’s max MERV before upgrading.' },
  { letter: 'M', term: 'Mini Split', def: 'Ductless system — single outdoor unit, one or more indoor heads. Popular in DFW for room additions, garages, upstairs zones. No duct losses, precise control, easy install.' },
  { letter: 'M', term: 'Modulating', def: 'Variable-capacity system that adjusts output in small increments. A modulating furnace or inverter-driven AC runs continuously at low capacity — ideal for DFW comfort and humidity control.' },
  { letter: 'N', term: 'NATE Certified', def: 'North American Technician Excellence — the gold standard HVAC certification. Always use NATE-certified techs in DFW; certification ensures proper charge, airflow, and safety testing.' },
  { letter: 'P', term: 'Psychrometrics', def: 'Science of air properties — temperature, humidity, enthalpy. DFW techs use psychrometric charts to diagnose comfort problems beyond simple temperature control.' },
  { letter: 'R', term: 'R-22', def: 'Legacy refrigerant (Freon) — no longer manufactured. If your DFW system uses R-22, you\’re on borrowed time. R-22 costs $150-300/lb and a full recharge can cost more than replacement.' },
  { letter: 'R', term: 'R-410A', def: 'Common refrigerant through 2025 in DFW. Being phased out — R-454B is the low-GWP replacement. New DFW systems (2025+) use R-454B or R-32.' },
  { letter: 'R', term: 'R-454B', def: 'Next-generation low-GWP refrigerant replacing R-410A. New DFW systems installed after January 2025 use R-454B. Requires updated recovery equipment from your tech.' },
  { letter: 'R', term: 'Refrigerant Charge', def: 'Amount of refrigerant in your system. Low charge = frozen coils, high bills, compressor damage. DFW systems should be charged by weight with a digital scale — not by feel or rule of thumb.' },
  { letter: 'S', term: 'SEER2', def: 'Seasonal Energy Efficiency Ratio 2 — the 2023 efficiency standard. DFW minimum: 15 SEER2. Recommended: 17-20 SEER2. Higher SEER2 = lower summer bills in DFW\’s long cooling season.' },
  { letter: 'S', term: 'Sensible Heat', def: 'Temperature change (vs humidity). DFW has both high sensible (100°F days) and high latent (humidity) loads — your system must handle both for comfort.' },
  { letter: 'S', term: 'Short Cycling', def: 'System turns on/off too frequently. Usually means oversized equipment. DFW homes frequently have oversized AC — causes humidity problems, comfort issues, and premature wear.' },
  { letter: 'S', term: 'Static Pressure', def: 'Resistance to airflow in duct system. High static pressure reduces efficiency and causes noise. DFW attic ducts often have excessive static from poor design or excessive duct length.' },
  { letter: 'S', term: 'Subcooling', def: 'Measure of liquid refrigerant below condensing temperature. DFW target: 10-15°F subcooling. Low subcooling with high ambient temps (100°F+) indicates refrigerant or TXV issues.' },
  { letter: 'S', term: 'Superheat', def: 'Measure of refrigerant vapor above boiling point at evaporator. DFW target: 8-14°F. Used to verify proper charge on TXV systems operating in extreme DFW summer heat.' },
  { letter: 'T', term: 'TXV', def: 'Thermostatic Expansion Valve — precisely meters refrigerant flow. DFW systems with TXV handle wide temperature variations better than fixed orifice metering devices.' },
  { letter: 'T', term: 'Ton', def: '12,000 BTU/hr of cooling capacity. DFW homes: 1 ton per 400-600 sq ft depending on insulation, windows, orientation. Never exceed by more than 15% without Manual J justification.' },
  { letter: 'V', term: 'Variable Speed', def: 'Compressor or blower that adjusts speed based on demand. Variable-speed systems are ideal for DFW: efficient at part load on mild days, full power for 105°F design days.' },
  { letter: 'V', term: 'VRF', def: 'Variable Refrigerant Flow — commercial-grade mini-split system. Increasingly used in large DFW homes and light commercial. One outdoor unit serves multiple indoor zones precisely.' },
  { letter: 'Z', term: 'Zoning', def: 'Multiple thermostats controlling different areas via dampers. Solves DFW\’s two-story heat problem — upstairs zone can call for more cooling while downstairs is comfortable.' },
];

const letters = Array.from(new Set(terms.map(t => t.letter))).sort();

export default function DFWHVACGlossaryFinal() {
  const [activeLetter, setActiveLetter] = useState('All');

  const filtered = activeLetter === 'All' ? terms : terms.filter(t => t.letter === activeLetter);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>📖</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW HVAC Glossary</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>40+ HVAC terms every DFW homeowner should know — with local context</p>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          <button onClick={() => setActiveLetter('All')}
            style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
              background: activeLetter === 'All' ? '#F5E642′ : '#1e2d45', color: activeLetter === ’All' ? '#0A1628′ : '#94a3b8' }}>
            All
          </button>
          {letters.map(l => (
            <button key={l} onClick={() => setActiveLetter(l)}
              style={{ width: 38, height: 38, borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: activeLetter === l ? '#F5E642′ : '#1e2d45', color: activeLetter === l ? '#0A1628' : '#94a3b8' }}>
              {l}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          {filtered.map((item, i) => (
            <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: '18px 20px', border: '1px solid #2a3f5f' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ background: '#F5E642', color: '#0A1628', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                  {item.letter}
                </div>
                <h3 style={{ color: '#F5E642', margin: 0, fontSize: 17, fontWeight: 700 }}>{item.term}</h3>
              </div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.7 }}>{item.def}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', background: '#1e2d45', borderRadius: 16, padding: '28px 24px' }}>
          <div style={{ fontSize: 32 }}>🔧</div>
          <h3 style={{ color: '#F5E642', margin: '10px 0 8px' }}>Need a DFW HVAC Expert?</h3>
          <p style={{ color: '#94a3b8', margin: '0 0 16px', fontSize: 14 }}>ProLnk matches DFW homeowners with certified, vetted HVAC professionals.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
