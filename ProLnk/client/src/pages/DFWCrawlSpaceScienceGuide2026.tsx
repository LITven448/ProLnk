import { useState } from 'react';

export default function DFWCrawlSpaceScienceGuide2026() {
  const [condition, setCondition] = useState('visible-moisture');

  const fixes: Record<string, { title: string; science: string; solution: string; cost: string }> = {
    'visible-moisture': {
      title: 'Active Moisture Intrusion',
      science: 'DFW soil releases moisture vapor upward continuously. Without a vapor barrier, relative humidity in pier-and-beam crawl spaces often exceeds 80% — well above the 70% threshold for mold growth.',
      solution: 'Install 6-mil polyethylene vapor barrier across entire soil surface, overlapping 12" at seams, sealed to piers. Eliminates up to 98% of soil vapor transmission.',
      cost: '$1,800–$4,200'
    },
    'musty-smell': {
      title: 'Active Mold / Fungal Growth',
      science: 'Mold spores are always present in DFW air. They germinate on wood above 70% relative humidity and 50°F — conditions easily met under poorly ventilated pier-and-beam homes.',
      solution: 'Mold remediation first (borate treatment on joists), then vapor barrier installation, then humidity monitoring. Encapsulation more effective than open ventilation in high-humidity DFW summers.',
      cost: '$3,500–$9,000'
    },
    'wood-rot': {
      title: 'Structural Wood Degradation',
      science: 'Wood rot requires moisture above 20% wood moisture content (WMC). DFW crawl spaces without vapor control routinely measure 25–30% WMC — decay fungi activate within months.',
      solution: 'Replace damaged sill plates and floor joists. Install full encapsulation system with dehumidifier to maintain WMC below 15%. Add annual WMC monitoring points.',
      cost: '$5,000–$18,000'
    },
    'high-humidity': {
      title: 'Elevated Ambient Humidity',
      science: 'Warm moist air from the crawl space rises into living areas — called the stack effect. A 500 sq ft crawl space can release 10–18 gallons of water vapor into your home daily without a vapor barrier.',
      solution: 'Encapsulation + dehumidifier (70-pint capacity minimum for DFW). Encapsulated crawl spaces outperform vented ones in hot-humid climates like Dallas-Fort Worth.',
      cost: '$4,000–$8,500'
    },
  };

  const current = fixes[condition];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>🏠 ProLnk DFW Home Science Series</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
          🕳️ DFW Crawl Space Science Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Why crawl space moisture is a critical issue for Dallas and Oak Cliff pier-and-beam homes.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '💧', label: 'Daily Vapor Without Barrier', value: '10–18 gal', note: 'per 500 sq ft' },
            { icon: '🦠', label: 'Mold Activation Threshold', value: '70% RH', note: 'at any temperature' },
            { icon: '🪵', label: 'Wood Rot Threshold', value: '20% WMC', note: 'moisture content' },
          ].map(card => (
            <div key={card.label} style={{ background: '#1e3a5f', borderRadius: '10px', padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>{card.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{card.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{card.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔬 The Encapsulation vs. Ventilation Debate</h2>
          {[
            'Older building codes required vented crawl spaces — good in dry climates, counterproductive in humid DFW.',
            'In hot-humid climates, outdoor air brings IN more moisture than it removes — ventilation worsens the problem.',
            'Modern building science (IRC 2012+) allows conditioned/encapsulated crawl spaces — proven superior for DFW.',
            'A properly encapsulated crawl space can reduce whole-home humidity by 15–20% without a whole-house dehumidifier.',
          ].map((fact, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#F5E642' }}>▸</span>
              <span style={{ color: '#cbd5e1' }}>{fact}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2744', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Crawl Space Condition → Science-Based Fix</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {Object.entries({ 'visible-moisture': '💧 Visible Moisture', 'musty-smell': '👃 Musty Smell', 'wood-rot': '🪵 Wood Rot', 'high-humidity': '☁️ High Humidity' }).map(([k, v]) => (
              <button key={k} onClick={() => setCondition(k)}
                style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', background: condition === k ? '#F5E642' : '#1e3a5f', color: condition === k ? '#0A1628' : '#94a3b8', fontWeight: 600 }}>
                {v}
              </button>
            ))}
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{current.title}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>🔬 {current.science}</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem' }}>✅ {current.solution}</div>
            <div style={{ color: '#F5E642', fontWeight: 600 }}>💰 {current.cost}</div>
          </div>
        </div>
      </div>
    </div>
  );
}