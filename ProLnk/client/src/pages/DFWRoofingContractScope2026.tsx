import { useState } from 'react';

export default function DFWRoofingContractScope2026() {
  const [element, setElement] = useState('');

  const verifications: Record<string, string> = {
    shingles: 'Shingle brand and model: Your contract must say exactly "GAF Timberline HDZ" or "Owens Corning Duration" — not just "30-year architectural shingles." Vague specs allow the contractor to substitute cheaper shingles after signing. In DFW, Class 4 impact-resistant shingles (Malarkey Legacy, Owens Corning TruDefinition Duration FLEX) qualify for insurance discounts of 15-30% annually. Verify the shingle manufacturer matches what is delivered to your driveway before the crew starts.',
    starter: 'Starter strip brand: Starter strip goes on the eaves and rakes before the first course of shingles. Contract must specify brand-matched starter strip (GAF ProStart for GAF shingles, etc.). Generic or cutoff shingles used as starter = higher risk of wind blow-off. In DFW where storms regularly hit 60-80 mph, this matters. Verify starter strip is installed at the drip edge, not 2-3 inches back.',
    ridge: 'Ridge cap brand: Ridge cap shingles cover the peak of the roof. Contract must specify brand and product (GAF Seal-A-Ridge, Owens Corning Hip & Ridge). Hand-cut shingles used as ridge cap is an inferior and cheaper practice. Ventilated ridge cap (ridge vent + cap) is proper in DFW — verify attic ventilation plan is in the contract. Improper attic ventilation in DFW summers degrades shingles 30-40% faster.',
    underlayment: 'Underlayment type: Minimum standard in DFW is synthetic underlayment (not 15 lb felt). Contract must specify: synthetic, minimum 10-year rated (examples: GAF FeltBuster, CertainTeed DiamondDeck, generic synthetic). For low-slope areas (3:12 or less), ice-and-water shield is required and should be specified. Verify underlayment is lapped correctly (upper laps over lower) — visible from the street before shingles go on.',
    deck_repair: 'Deck repair pricing: Your contract must state a per-sheet price for plywood replacement ($75-120/sheet in DFW 2026). If it says "included" or is vague, you will get a surprise invoice. Average DFW roof has 2-5 sheets needing replacement; hail-damaged or older homes may need 10-20 sheets. Walk the roof with the contractor before signing and mark visibly damaged sections. Get a rough sheet count in writing.',
    cleanup: 'Cleanup protocol: Contract must specify: (1) magnetic sweep for nails in yard and driveway — two passes minimum, (2) dumpster on property or daily debris removal, (3) dumpster placement location (protect driveway with plywood), (4) final walkthrough with homeowner. DFW roofers who skip the magnetic sweep cause tire punctures weeks later. Verify this is explicit, not implied.',
    permit: 'Permit responsibility: Most DFW cities (Dallas, Plano, Frisco, McKinney, Allen) require a roofing permit for full replacement. Contract must state who pulls the permit and who pays the fee ($150-400). If contractor says "you don't need a permit" for a full replacement in a DFW city, that is a red flag. No permit = no inspection = no guarantee of code compliance = potential insurance denial on future claims.',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 4 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW Roofing Contract Scope of Work Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: 28 }}>What every DFW roofing contract must specify — and exactly what to verify before signing.</p>

        <div style={{ background: '#112240', borderRadius: 10, padding: '14px 18px', marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>⚠️ DFW Roofing Reality</div>
          <div style={{ color: '#a0aec0', fontSize: 14 }}>After every DFW hail storm, storm chasers flood the area with vague contracts and inferior materials. A detailed scope of work protects you from substitution, hidden charges, and code violations. Never sign a contract without all 7 elements specified.</div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 Select Contract Element to Verify</h2>
          <select value={element} onChange={e => setElement(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15, marginBottom: 16 }}>
            <option value="">Select element...</option>
            <option value="shingles">Shingle brand and model number</option>
            <option value="starter">Starter strip brand</option>
            <option value="ridge">Ridge cap brand</option>
            <option value="underlayment">Underlayment type</option>
            <option value="deck_repair">Deck repair pricing (per sheet)</option>
            <option value="cleanup">Cleanup protocol (magnetic sweep)</option>
            <option value="permit">Permit responsibility</option>
          </select>
          {element && verifications[element] && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '16px', color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>{verifications[element]}</div>
          )}
        </div>

        <div style={{ marginTop: 28, background: '#112240', borderRadius: 10, padding: '16px 20px' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🏠 ProLnk</span>
          <span style={{ color: '#a0aec0', marginLeft: 8 }}>connects DFW homeowners with vetted roofers who provide detailed scope of work contracts — no vague specs.</span>
        </div>
      </div>
    </div>
  );
}
