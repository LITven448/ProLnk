import { useState } from 'react';

export default function DFWElectricalSafetyGuide() {
  const [homeAge, setHomeAge] = useState(2000);
  const [hasBathrooms, setHasBathrooms] = useState(true);
  const [hasGarage, setHasGarage] = useState(true);
  const [hasOutdoor, setHasOutdoor] = useState(true);
  const [hasUnfinishedBasement, setHasUnfinishedBasement] = useState(false);
  const [result, setResult] = useState<null | {
    gfciGaps: string[];
    afciGaps: string[];
    costLow: number;
    costHigh: number;
    priority: string[];
  }>(null);

  function calculate() {
    const gfciGaps: string[] = [];
    const afciGaps: string[] = [];
    const priority: string[] = [];

    if (hasBathrooms && homeAge < 1975) { gfciGaps.push('Bathroom outlets (required since 1975)'); priority.push('Bathroom GFCI outlets — electrocution risk near water'); }
    if (hasGarage && homeAge < 1978) { gfciGaps.push('Garage outlets (required since 1978)'); priority.push('Garage GFCI outlets'); }
    if (hasOutdoor && homeAge < 1978) { gfciGaps.push('All outdoor outlets (required since 1978)'); priority.push('Outdoor GFCI outlets'); }
    if (hasUnfinishedBasement && homeAge < 1990) { gfciGaps.push('Unfinished basement outlets (required since 1990)'); }
    if (homeAge < 2000) gfciGaps.push('Kitchen outlets within 6 feet of sink (required since 1987)');
    if (homeAge < 2002) afciGaps.push('Bedroom circuits (AFCI required in bedrooms since 2002)');
    if (homeAge < 2014) afciGaps.push('All living areas including hallways, dining, family room (required 2014)');
    if (homeAge < 2020) afciGaps.push('Laundry and kitchen circuits (required 2020 NEC)');

    const gfciOutlets = gfciGaps.length * 3;
    const afciBreakers = afciGaps.length * 2;
    const costLow = gfciOutlets * 75 + afciBreakers * 65;
    const costHigh = gfciOutlets * 150 + afciBreakers * 120;

    setResult({ gfciGaps, afciGaps, costLow, costHigh, priority });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>⚡ DFW HOME SAFETY GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>Electrical Safety Guide</h1>
        <p style={{ color: '#9AA3B2', marginBottom: '2rem' }}>GFCI and AFCI protection requirements change with each NEC update. Older DFW homes often have significant gaps — and DFW's cold snaps make space heater fires a top hazard. Find your gaps below.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.2rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔌</div>
            <h3 style={{ color: '#F5E642', fontSize: '0.95rem', marginBottom: '0.4rem' }}>GFCI Protection</h3>
            <p style={{ color: '#9AA3B2', fontSize: '0.85rem', lineHeight: 1.6 }}>Ground Fault Circuit Interrupter — shuts off power in 1/40 second if current goes where it shouldn't. Required near all water sources since 1975.</p>
          </div>
          <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.2rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔁</div>
            <h3 style={{ color: '#F5E642', fontSize: '0.95rem', marginBottom: '0.4rem' }}>AFCI Protection</h3>
            <p style={{ color: '#9AA3B2', fontSize: '0.85rem', lineHeight: 1.6 }}>Arc Fault Circuit Interrupter — detects dangerous arcing in wiring that causes fires. Required in bedrooms since 2002, expanded to most rooms by 2020 NEC.</p>
          </div>
        </div>

        <div style={{ background: '#2B1A0D', border: '1px solid #E67E22', borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#E67E22', fontSize: '1rem', marginBottom: '0.5rem' }}>⚠️ DFW Winter Warning</h3>
          <p style={{ color: '#C8D0DC', fontSize: '0.9rem', lineHeight: 1.6 }}>Space heaters cause 1,700 house fires nationwide every winter. In DFW homes with outdated wiring, overloaded circuits are a primary ignition source. Never use extension cords with space heaters — plug directly into a wall outlet and never leave unattended.</p>
        </div>

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏠 Your Home Details</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Year Home Was Built</span>
              <input type="number" min={1900} max={2026} value={homeAge} onChange={e => setHomeAge(Number(e.target.value))} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }} />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasBathrooms} onChange={e => setHasBathrooms(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>Bathrooms with outlets</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasGarage} onChange={e => setHasGarage(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>Garage with outlets</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasOutdoor} onChange={e => setHasOutdoor(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>Outdoor outlets</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasUnfinishedBasement} onChange={e => setHasUnfinishedBasement(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>Unfinished basement or crawl space</span>
            </label>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontSize: '1rem' }}>
              Identify My Electrical Gaps
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚡ Your Upgrade Report</h2>
            {result.gfciGaps.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#E67E22', fontWeight: 600, marginBottom: '0.4rem' }}>GFCI Gaps Found:</div>
                {result.gfciGaps.map((g, i) => <div key={i} style={{ color: '#C8D0DC', padding: '0.25rem 0′ }}>🔌 {g}</div>)}
              </div>
            )}
            {result.afciGaps.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#E67E22', fontWeight: 600, marginBottom: '0.4rem' }}>AFCI Gaps Found:</div>
                {result.afciGaps.map((g, i) => <div key={i} style={{ color: '#C8D0DC', padding: '0.25rem 0′ }}>🔁 {g}</div>)}
              </div>
            )}
            {result.gfciGaps.length === 0 && result.afciGaps.length === 0 && (
              <div style={{ color: '#2ECC71', fontWeight: 600 }}>✅ No major gaps detected for your home's age and features!</div>
            )}
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>Estimated Upgrade Cost: ${result.costLow.toLocaleString()} – ${result.costHigh.toLocaleString()}</div>
              <div style={{ color: '#9AA3B2', fontSize: '0.85rem', marginTop: 4 }}>GFCI outlets: DIY-friendly ($10–25/unit). AFCI breakers: electrician required ($65–120/breaker).</div>
            </div>
          </div>
        )}

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🧰 DIY vs. Electrician</h2>
          <p style={{ color: '#C8D0DC', lineHeight: 1.7 }}>GFCI outlet replacement is safe for confident homeowners — turn off the breaker and follow the wiring diagram. AFCI breakers require a licensed electrician and panel work. Any work on a panel, new circuit runs, or service upgrade requires a permit in all DFW cities.</p>
        </div>
      </div>
    </div>
  );
}
