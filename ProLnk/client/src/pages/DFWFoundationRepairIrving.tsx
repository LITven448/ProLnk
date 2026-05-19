import { useState } from 'react';

interface SeverityResult {
  score: number;
  level: string;
  color: string;
  detail: string;
  nextSteps: string[];
  costRange: string;
}

function getSeverity(cracks: boolean, doors: boolean, water: boolean): SeverityResult {
  const count = [cracks, doors, water].filter(Boolean).length;

  if (count === 0) return {
    score: 1, level: 'Low — Monitor Annually', color: '#22c55e',
    detail: 'No active symptoms detected. Irving clay soil still moves seasonally, so annual inspections are wise — especially after drought cycles.',
    nextSteps: ['Schedule a free visual inspection', 'Photograph any future cracks as they appear', 'Ensure gutters drain 6+ feet from foundation', 'Maintain consistent soil moisture around perimeter'],
    costRange: '$0–$500 (inspection + preventive drainage)'
  };

  if (count === 1 && !cracks) return {
    score: 2, level: 'Low-Moderate — Get an Inspection', color: '#22c55e',
    detail: 'One symptom alone may have other causes. Irving homes near the airport corridor experience ground vibration — doors sticking and water pooling can have non-foundation causes. Get a professional evaluation.',
    nextSteps: ['Get a foundation inspection from a licensed engineer', 'Check door frames for signs of racking', 'Evaluate grading and drainage around home', 'Inspect interior walls for hairline cracks'],
    costRange: '$200–$800 (inspection + minor drainage work)'
  };

  if (cracks && count === 1) return {
    score: 3, level: 'Moderate — Schedule Inspection Soon', color: '#F5E642',
    detail: 'Visible cracks in a 1970s-1990s Irving slab home are worth taking seriously. Irving clay soil is highly expansive — cracks can indicate early-stage movement that is far cheaper to address now than later.',
    nextSteps: ['Get a structural engineer evaluation ($400-$700)', 'Document all cracks with photos and measurements', 'Identify whether cracks are active (growing) or dormant', 'Check for door/window sticking as a secondary symptom'],
    costRange: '$3,000–$12,000 (pier installation, typical Irving repair)'
  };

  if (count === 2) return {
    score: 4, level: 'High — Act Within 30 Days', color: '#f97316',
    detail: 'Two active symptoms in an Irving slab home signal foundation movement is underway. Irving’s clay soil near the Trinity River corridor can shift 2-4 inches seasonally. Movement compounds over time — early repair is exponentially cheaper.',
    nextSteps: ['Get 2-3 foundation contractor quotes immediately', 'Request a structural engineering report', 'Check with city for any area subsidence advisories', 'Review your homeowners insurance foundation coverage'],
    costRange: '$8,000–$20,000 (multiple piers, typical Irving mid-repair)'
  };

  return {
    score: 5, level: 'Critical — Get Quotes This Week', color: '#ef4444',
    detail: 'All three symptoms present indicates active, multi-point foundation failure in progress. Irving homes built on 1970s-1990s slabs in clay-heavy soil can experience rapid acceleration once movement starts. Do not delay.',
    nextSteps: ['Call 3 foundation contractors for quotes — this week', 'Get a licensed structural engineer report for insurance', 'Photograph everything: cracks, doors, water pooling areas', 'Ask contractors about transferable lifetime warranties'],
    costRange: '$15,000–$35,000+ (major repair, extensive pier work)'
  };
}

export default function DFWFoundationRepairIrving() {
  const [cracks, setCracks] = useState<boolean | null>(null);
  const [doors, setDoors] = useState<boolean | null>(null);
  const [water, setWater] = useState<boolean | null>(null);

  const ready = cracks !== null && doors !== null && water !== null;
  const result = ready ? getSeverity(cracks!, doors!, water!) : null;

  const YesNo = ({ label, value, onChange }: { label: string; value: boolean | null; onChange: (v: boolean) => void }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10, color: '#e2e8f0′ }}>{label}</div>
      <div style={{ display: 'flex', gap: 10 }}>
        {([true, false] as const).map(v => (
          <button key={String(v)} onClick={() => onChange(v)}
            style={{ padding: '10px 24px', borderRadius: 8, border: `2px solid ${value === v ? '#F5E642' : '#2d4a7a'}`, background: value === v ? '#F5E642′ : ’transparent', color: value === v ? '#0A1628′ : ’white', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            {v ? 'Yes' : 'No'}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
            🏗️ Irving, TX
          </span>
        </div>

        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          Irving TX Foundation Repair —{' '}
          <span style={{ color: '#F5E642′ }}>Urban Suburb Specialists</span>
        </h1>

        <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, marginBottom: 40, maxWidth: 700 }}>
          Irving is one of DFW's most complex foundation markets. The Trinity River corridor clay soil,
          decades of airport construction runoff, and a massive 1970s-1990s housing stock combine to
          make Irving one of the highest foundation repair volume cities in North Texas.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🏗️', title: 'Irving Clay Soil Experts', desc: 'Irving sits on some of DFW\’s most expansive clay soil. Our crews install deep bell-bottom concrete piers engineered for local conditions.' },
            { icon: '✈️', title: 'Airport Corridor Specialists', desc: 'Homes near DFW and Love Field experience unique ground vibration and runoff patterns. We know Irving micro-zones.' },
            { icon: '📋', title: 'Engineered Repair Reports', desc: 'We partner with licensed structural engineers for certified reports — required for insurance claims and real estate transactions.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111f3a', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f', marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>🔍 Irving Foundation Severity Checker</h2>
          <p style={{ color: '#94a3b8', marginBottom: 28 }}>
            Answer three questions about your Irving home. We will estimate severity and recommend next steps.
          </p>

          <YesNo label="Are there visible cracks in walls, ceilings, or around door frames?" value={cracks} onChange={setCracks} />
          <YesNo label="Are doors or windows sticking, not closing fully, or gaps visible?" value={doors} onChange={setDoors} />
          <YesNo label="Is water pooling near the foundation after rain?" value={water} onChange={setWater} />

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, borderLeft: `4px solid ${result.color}`, marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 2 }}>SEVERITY SCORE</div>
                  <div style={{ fontSize: 48, fontWeight: 900, color: result.color, lineHeight: 1 }}>{result.score}<span style={{ fontSize: 24, color: '#64748b' }}>/5</span></div>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: result.color }}>{result.level}</div>
                  <div style={{ fontSize: 14, color: '#F5E642', fontWeight: 700 }}>Estimated cost: {result.costRange}</div>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 16 }}>{result.detail}</p>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>RECOMMENDED NEXT STEPS</div>
              {result.nextSteps.map(step => (
                <div key={step} style={{ fontSize: 14, color: '#94a3b8', marginBottom: 6, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#F5E642′ }}>→</span> {step}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0d2240', borderRadius: 12, padding: 20, marginBottom: 48, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>🏗️ Irving Foundation Fact:</span> Irving has one of the highest
            pier installation rates per capita in DFW. The Las Colinas, Valley Ranch, and Heritage District
            neighborhoods all sit on Trinity clay. A typical Irving repair installs 15-30 concrete piers at
            $800-$1,500 each. Get multiple quotes — pricing varies 30-40% between contractors.
          </p>
        </div>

        <div style={{ textAlign: 'center', background: '#111f3a', borderRadius: 16, padding: 40, border: '2px solid #F5E642′ }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🏗️</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Get Irving Foundation Repair Quotes Today</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>ProLnk connects Irving homeowners with licensed foundation contractors. Compare 3 quotes — all with written estimates.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '16px 40px', borderRadius: 10, fontWeight: 800, fontSize: 17, border: 'none', cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>

      </div>
    </div>
  );
}
