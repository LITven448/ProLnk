import { useState } from 'react';

const dfwLocations = ['Dallas (urban/inner)', 'Fort Worth', 'Plano / Frisco / McKinney', 'Denton / Lewisville', 'Arlington / Mansfield', 'Garland / Mesquite', 'Grand Prairie / Irving', 'Kaufman / Hunt County (east)'];
const homeTypes = ['Single-family (brick)', 'Single-family (wood frame)', 'Townhome / Row home', 'Manufactured / Mobile home', 'Condo / High-rise unit'];

type CoverageItem = { name: string; icon: string; dfwRisk: string; includedInHO3: boolean; separate: boolean; avgPremium: string; priority: number; notes: string };

const getCoverageItems = (loc: string, type: string): CoverageItem[] => {
  const isEast = loc.includes('Kaufman');
  const isMobile = type.includes('Manufactured');
  const isCondo = type.includes('Condo');
  return [
    { name: 'Windstorm & Hail', icon: '🌪️', dfwRisk: 'Extreme', includedInHO3: true, separate: false, avgPremium: 'Included — verify deductible (1–3%)', priority: 1, notes: 'DFW averages 5+ named hail events per year. Check your hail deductible — many policies now use a separate 1–3% hail deductible vs. flat dollar amount.' },
    { name: 'Flood Insurance', icon: '🌊', dfwRisk: loc.includes('east') || loc.includes('Kaufman') ? 'High' : 'Moderate', includedInHO3: false, separate: true, avgPremium: '$500–$2,400/yr (NFIP or private)', priority: isEast ? 1 : 2, notes: 'Standard homeowners policies DO NOT cover flood. DFW flash flooding events have increased significantly. Even 1 inch of water causes $25K+ in damage.' },
    { name: 'Winter Storm / Freeze', icon: '❄️', dfwRisk: 'High (post-Uri)', includedInHO3: true, separate: false, avgPremium: 'Included — verify pipe freeze coverage', priority: 2, notes: 'Post-Uri freeze events are now standard DFW risk. Verify your policy covers burst pipes and resulting water damage. Some policies require maintained heat.' },
    { name: 'Extended Replacement Cost', icon: '🏗️', dfwRisk: 'High', includedInHO3: false, separate: false, avgPremium: '+$100–$300/yr rider', priority: 2, notes: 'Post-storm rebuilding in DFW can exceed policy limits due to contractor demand and material costs. Extended replacement cost (125–150%) is a high-value add-on.' },
    { name: 'Sewer & Water Backup', icon: '🚿', dfwRisk: 'Moderate', includedInHO3: false, separate: false, avgPremium: '+$50–$150/yr rider', priority: 3, notes: 'Standard HO3 does not cover sewer backup. In DFW, heavy storms can overwhelm municipal systems. A $10K sewer cleanup is common without coverage.' },
    { name: 'Earthquake', icon: '🌍', dfwRisk: isMobile ? 'Low-Moderate' : 'Low', includedInHO3: false, separate: true, avgPremium: '$200–$500/yr (rarely worth it)', priority: 5, notes: 'DFW has minimal seismic activity. Earthquake coverage is generally not recommended unless in far eastern Dallas metro near fault zones.' },
  ].sort((a, b) => a.priority - b.priority);
};

const priorityColor: Record<number, string> = { 1: '#ef4444', 2: '#f97316', 3: '#eab308', 4: '#22c55e', 5: '#64748b' };
const priorityLabel: Record<number, string> = { 1: 'Critical', 2: 'High', 3: 'Medium', 4: 'Low', 5: 'Skip' };

export default function DFWDisasterInsurancePlanGuide() {
  const [loc, setLoc] = useState('Dallas (urban/inner)');
  const [homeType, setHomeType] = useState('Single-family (brick)');

  const items = getCoverageItems(loc, homeType);
  const gaps = items.filter(i => !i.includedInHO3 && i.priority <= 3);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, fontWeight: 600 }}>🏠 DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Disaster Insurance Coverage Checklist for DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 28 }}>
          DFW homeowners face windstorm, hail, flash flooding, and winter freezes — each requiring different coverage. Most homeowners discover gaps only after a disaster. Check yours now.
        </p>

        {gaps.length > 0 && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1.5px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 14, color: '#fca5a5′ }}>
            ⚠️ Based on your selections, you likely have <strong>{gaps.length} coverage gap{gaps.length > 1 ? 's' : ''}</strong> not included in a standard HO3 policy.
          </div>
        )}

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>📍 Your DFW Profile</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1′ }}>DFW Location</label>
              <select value={loc} onChange={e => setLoc(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #334155', fontSize: 15, background: '#0f2040', color: '#fff' }}>
                {dfwLocations.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1′ }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #334155', fontSize: 15, background: '#0f2040', color: '#fff' }}>
                {homeTypes.map(h => <option key={h}>{h}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14, marginBottom: 24 }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 20, borderLeft: `4px solid ${priorityColor[item.priority]}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>DFW Risk: <span style={{ color: item.dfwRisk === 'Extreme' || item.dfwRisk === 'High (post-Uri)' ? '#ef4444′ : item.dfwRisk.includes(’High') ? '#f97316′ : '#eab308' }}>{item.dfwRisk}</span></div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: priorityColor[item.priority], background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '3px 8px', marginBottom: 4 }}>{priorityLabel[item.priority]}</div>
                  <div style={{ fontSize: 11, color: item.includedInHO3 ? '#22c55e' : '#ef4444′ }}>{item.includedInHO3 ? '✓ In HO3' : '✗ Not in HO3'}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>💰 {item.avgPremium}</div>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>{item.notes}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(245,230,66,0.1)', border: '1.5px solid rgba(245,230,66,0.3)', borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 10 }}>📞 Next Steps for DFW Homeowners</div>
          {['Call your agent and ask specifically about hail deductible structure (% vs. flat dollar)', 'Request a flood zone determination for your specific address at FEMA.gov', 'Add extended replacement cost rider — especially after any major DFW storm', 'Review winter storm / pipe freeze language before next November'].map((step, i) => (
            <div key={i} style={{ fontSize: 14, color: '#cbd5e1', padding: '8px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none', display: 'flex', gap: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>{i + 1}.</span>{step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
