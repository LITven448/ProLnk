import { useState } from 'react';

export default function DFWFoundationAccessPanel2026() {
  const [situation, setSituation] = useState('');
  const [guide, setGuide] = useState('');

  const situations = [
    'No access panel exists',
    'Single small hatch only',
    'Panel too far from plumbing',
    'Panel missing vapor barrier seal',
    'Planning new construction',
  ];

  const generate = () => {
    if (!situation) return;
    let tips = [];
    if (situation === 'No access panel exists') {
      tips.push('🚪 Install minimum 18″x24″ access panel per IRC — larger (24″x36″) strongly recommended for DFW pier and beam homes');
      tips.push('📍 Locate within 20 feet of all plumbing cleanouts — DFW clay soil shifts require frequent plumber access');
    }
    if (situation === 'Single small hatch only') {
      tips.push('📐 Add a second panel on opposite end of crawl space — cross-access reduces inspection time by 60%');
      tips.push('🔧 Small hatches (under 18″x24″) prevent proper equipment entry — plumbers charge premium for cramped access');
    }
    if (situation === 'Panel too far from plumbing') {
      tips.push('💧 Add panel within 5 feet of main plumbing stack — DFW homes average 2-3 plumbing calls per decade');
      tips.push('🔩 Closer access reduces plumbing labor by 1-2 hours per service call — panel pays for itself in one visit');
    }
    if (situation === 'Panel missing vapor barrier seal') {
      tips.push('🌫️ Vapor barrier must continue under and around panel frame — gaps allow DFW humidity infiltration');
      tips.push('🦟 Unsealed panels are entry points for DFW pests — termites, rodents, and moisture all exploit gaps');
    }
    if (situation === 'Planning new construction') {
      tips.push('📋 Specify 24″x36″ panels minimum — DFW market expectation for pier and beam resale value');
      tips.push('🗺️ Plan panel location relative to HVAC equipment and plumbing during framing stage');
    }
    tips.push('🛡️ Install pest exclusion mesh at panel frame edges — standard hardware cloth 1/4″ mesh stops DFW critters');
    tips.push('🌡️ Vapor barrier continuation around panel reduces crawl space humidity 20-40% — critical for DFW summers');
    tips.push('🔒 Use lockable panels in DFW — neighborhood code enforcement sometimes inspects exposed crawl access');
    setGuide(tips.join('
'));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', borderRadius: 8, padding: '4px 12px', display: 'inline-block', marginBottom: 12 }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 12 }}>DFW FOUNDATION GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Foundation Access Panel Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Installing and upgrading access panels for DFW pier and beam foundations — proper size, location, vapor barrier, and pest exclusion.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Get Your Access Panel Guide</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>Current Crawl Space Situation</label>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, marginBottom: 20, boxSizing: 'border-box' }}>
            <option value="">Select situation...</option>
            {situations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Generate Access Panel Guide</button>
        </div>

        {guide && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🚪 Your Access Panel Recommendations</h3>
            {guide.split('
').map((line, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>{line}</div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[['📐 Minimum Size', '18″x24″ IRC minimum — 24″x36″ recommended for DFW pier and beam'],['📍 Location', 'Within 20 feet of all plumbing — multiple panels for larger footprints'],['🌫️ Vapor Barrier', 'Continuous under panel frame — gaps cause DFW humidity infiltration'],['🦟 Pest Exclusion', '1/4″ hardware cloth mesh at all frame edges — critical in DFW']].map(([title, desc]) => (
            <div key={title} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Connect with a DFW foundation specialist for access panel installation</p>
          <div style={{ background: '#F5E642', borderRadius: 8, padding: '10px 20px', display: 'inline-block', cursor: 'pointer' }}>
            <span style={{ color: '#0A1628', fontWeight: 700 }}>🏗️ Find Foundation Pro in DFW</span>
          </div>
        </div>
      </div>
    </div>
  );
}