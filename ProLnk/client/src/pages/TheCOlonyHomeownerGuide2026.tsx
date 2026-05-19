import { useState } from 'react';

const decadeGuides: Record<string, { label: string; items: string[] }> = {
  '1980s': { label: '1980s Homes — Major System Refresh Era', items: ['Galvanized plumbing reaching 40–45yr lifespan — replace now', 'Original HVAC well past life — budget $8K–$15K replacement', 'Single-pane windows losing efficiency — upgrade to Low-E', 'Flat or low-slope roofs at critical age — full replacement likely', 'Asbestos possible in floor tiles, insulation, popcorn ceilings', 'Lake humidity has accelerated wood decay on fascia and soffits'] },
  '1990s': { label: '1990s Homes — Mid-Life Maintenance', items: ['HVAC at 25–35 yrs — replacement overdue or imminent', 'Polybutylene pipes may still be present — inspect and replace', 'Irrigation systems at 25+ yrs — valves and heads failing', 'Roof at 25–35 yrs — full replacement due within 5 years', 'Golf course sections: irrigation backflow valve annual testing', 'Humidity from lake elevates exterior paint degradation rate'] },
  '2000s': { label: '2000s Homes — Proactive Planning', items: ['HVAC at 15–25 yrs — plan replacement, budget now', 'Roof inspection critical — 20+ yr asphalt shingles showing wear', 'Water heater likely original — replace before failure', 'Irrigation system valve check and controller upgrade', 'Window seal failures starting — look for foggy double panes', 'Lakefront homes: dock and pier inspection if applicable'] },
};

export default function TheCOlonyHomeownerGuide2026() {
  const [decade, setDecade] = useState('');
  const guide = decade ? decadeGuides[decade] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>⛳</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>The Colony TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
            Established Denton County suburb on Lewisville Lake. 1980s–2000s homes face lake humidity, aging systems, and golf course irrigation demands.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '🌊', label: 'Lake Humidity', desc: 'Accelerates exterior wood rot, paint, and HVAC coil corrosion.' },
            { icon: '⛳', label: 'Golf Sections', desc: 'HOA irrigation requirements and backflow testing annual.' },
            { icon: '🏚️', label: 'Aging Systems', desc: '1980s–2000s homes: HVAC, plumbing, and roofs at end of life.' },
            { icon: '🛣️', label: 'Established Area', desc: 'Mature trees near foundations. Root intrusion a real risk.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🗓️ When Was Your Home Built?</h2>
          <div style={{ display: 'flex', gap: 10 }}>
            {['1980s', '1990s', '2000s'].map(d => (
              <button key={d} onClick={() => setDecade(d)}
                style={{ flex: 1, background: decade === d ? '#F5E642' : '#1a2f50', color: decade === d ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {guide ? (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 14 }}>🔧 {guide.label}</h3>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {guide.items.map((item, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8 }}>{item}</li>)}
            </ul>
          </div>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
            Select your home's decade above to see The Colony maintenance priorities.
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontSize: 14, marginBottom: 12 }}>🌊 Lake Lewisville Humidity — Year-Round Watch List</h3>
          {['Exterior paint check every spring — peeling accelerates near water', 'HVAC coil cleaning annually — salt humidity causes corrosion', 'Crawl space vapor barrier if applicable — moisture intrusion risk', 'Dock/pier inspection if lakefront — bi-annual minimum'].map((item, i) => (
            <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #F5E642' }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, margin: '8px 0 6px' }}>The Colony Trusted Contractors</h3>
          <p style={{ color: '#1a2f50', fontSize: 13, margin: '0 0 14px' }}>ProLnk matches you with pros who know lakefront aging homes and Colony HOA standards.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
