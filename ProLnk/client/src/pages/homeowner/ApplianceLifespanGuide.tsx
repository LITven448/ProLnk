import { useState } from 'react';

interface Appliance {
  name: string;
  icon: string;
  avgLifespan: number;
  dfwLifespan: number;
  warningSign: string;
  replacementCost: string;
  runToFailure: boolean;
}

const appliances: Appliance[] = [
  { name: 'HVAC System', icon: '❄️', avgLifespan: 15, dfwLifespan: 12, warningSign: 'Rising energy bills, uneven cooling, frequent repairs', replacementCost: '$4,000–$12,000', runToFailure: false },
  { name: 'Water Heater', icon: '🚿', avgLifespan: 12, dfwLifespan: 8, warningSign: 'Rusty water, rumbling, lukewarm output', replacementCost: '$800–$2,000', runToFailure: false },
  { name: 'Dishwasher', icon: '🍽️', avgLifespan: 10, dfwLifespan: 10, warningSign: 'Water pooling, poor cleaning, door not sealing', replacementCost: '$500–$1,500', runToFailure: true },
  { name: 'Refrigerator', icon: '🧊', avgLifespan: 15, dfwLifespan: 15, warningSign: 'Motor running constantly, food spoiling, frost buildup', replacementCost: '$800–$3,000', runToFailure: false },
  { name: 'Washer', icon: '👕', avgLifespan: 12, dfwLifespan: 12, warningSign: 'Loud banging, leaking, clothes not clean', replacementCost: '$500–$1,200', runToFailure: true },
  { name: 'Dryer', icon: '🌀', avgLifespan: 12, dfwLifespan: 12, warningSign: 'Long drying times, overheating, burning smell', replacementCost: '$400–$1,000', runToFailure: true },
  { name: 'Garbage Disposal', icon: '🔧', avgLifespan: 12, dfwLifespan: 12, warningSign: 'Persistent odors, slow grinding, frequent resets', replacementCost: '$150–$400', runToFailure: true },
  { name: 'Range / Oven', icon: '🔥', avgLifespan: 15, dfwLifespan: 15, warningSign: 'Uneven heating, burner ignition issues, cracked glass', replacementCost: '$600–$3,000', runToFailure: true },
  { name: 'Microwave', icon: '📡', avgLifespan: 10, dfwLifespan: 10, warningSign: 'Sparking, uneven heating, loud humming', replacementCost: '$150–$500', runToFailure: true },
  { name: 'Garage Door Opener', icon: '🚗', avgLifespan: 10, dfwLifespan: 10, warningSign: 'Slow response, grinding noise, reverses randomly', replacementCost: '$200–$500', runToFailure: false },
  { name: 'Roof', icon: '🏠', avgLifespan: 25, dfwLifespan: 20, warningSign: 'Missing shingles, granules in gutters, interior leaks', replacementCost: '$8,000–$25,000', runToFailure: false },
  { name: 'Water Softener', icon: '💧', avgLifespan: 15, dfwLifespan: 15, warningSign: 'Soap not lathering, scale buildup, salty water taste', replacementCost: '$400–$1,200', runToFailure: true },
  { name: 'Pool Pump', icon: '🏊', avgLifespan: 10, dfwLifespan: 10, warningSign: 'Loud motor, low suction, leaking around shaft', replacementCost: '$500–$1,200', runToFailure: false },
  { name: 'Sprinkler Controller', icon: '🌱', avgLifespan: 12, dfwLifespan: 12, warningSign: 'Erratic scheduling, zones not activating, screen failure', replacementCost: '$100–$300', runToFailure: true },
  { name: 'Generator', icon: '⚡', avgLifespan: 20, dfwLifespan: 20, warningSign: 'Doesn’t start, power fluctuations, excessive oil use', replacementCost: '$2,000–$15,000', runToFailure: false },
];

export default function ApplianceLifespanGuide() {
  const [birthYear, setBirthYear] = useState('');
  const currentYear = 2026;

  function getAge(yearStr: string): number {
    const y = parseInt(yearStr, 10);
    if (isNaN(y) || y < 1900 || y > currentYear) return -1;
    return currentYear - y;
  }

  const homeAge = getAge(birthYear);

  function getStatus(dfwLife: number): { label: string; color: string } {
    if (homeAge < 0) return { label: '—', color: '#6B7280′ };
    const pct = homeAge / dfwLife;
    if (pct < 0.6) return { label: 'Good', color: '#22C55E' };
    if (pct < 0.85) return { label: 'Watch', color: '#F59E0B' };
    return { label: 'Due Soon', color: '#EF4444′ };
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#F1F5F9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: '#3B82F6', fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            DFW Homeowner Guide
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
            How Long Should Your Appliances Last?
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', margin: 0 }}>
            DFW's extreme heat, hard water, and soil movement shorten appliance lifespans significantly. 
            Know what's coming before it fails at the worst time.
          </p>
        </div>

        {/* Calculator */}
        <div style={{ background: '#1E3A5F', borderRadius: 16, padding: 32, marginBottom: 48, border: '1px solid #2D4A7A' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>🏡 Calculate Your Home's Appliance Timeline</h2>
          <p style={{ color: '#94A3B8', margin: '0 0 24px', fontSize: 15 }}>Enter your home's build year to see which appliances may be approaching end of life.</p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="number"
              placeholder="e.g. 2008″
              value={birthYear}
              onChange={e => setBirthYear(e.target.value)}
              style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #3B5780', background: '#0A1628', color: '#F1F5F9', fontSize: 16, width: 160 }}
            />
            {homeAge >= 0 && (
              <div style={{ color: '#60A5FA', fontWeight: 600, fontSize: 16 }}>
                Your home is {homeAge} years old — status column is now personalized ↓
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #2D4A7A' }}>
                {['Appliance', 'Avg Lifespan', 'DFW Lifespan', 'Warning Signs', 'Replacement Cost', 'Strategy', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#94A3B8', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appliances.map((a, i) => {
                const status = getStatus(a.dfwLifespan);
                return (
                  <tr key={a.name} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(30,58,95,0.3)', borderBottom: '1px solid #1E2D45′ }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600 }}>{a.icon} {a.name}</td>
                    <td style={{ padding: '14px 16px', color: '#94A3B8′ }}>{a.avgLifespan} yrs</td>
                    <td style={{ padding: '14px 16px', color: '#F59E0B', fontWeight: 600 }}>{a.dfwLifespan} yrs</td>
                    <td style={{ padding: '14px 16px', color: '#CBD5E1', maxWidth: 220 }}>{a.warningSign}</td>
                    <td style={{ padding: '14px 16px', color: '#22C55E', fontWeight: 600 }}>{a.replacementCost}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: a.runToFailure ? 'rgba(100,116,139,0.2)' : 'rgba(239,68,68,0.15)', color: a.runToFailure ? '#94A3B8′ : '#FCA5A5' }}>
                        {a.runToFailure ? 'Run to Failure OK' : 'Replace Proactively'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      {homeAge >= 0 ? (
                        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, color: status.color, background: `${status.color}22` }}>
                          {status.label}
                        </span>
                      ) : (
                        <span style={{ color: '#4B5563′ }}>Enter year ↑</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Strategy Guide */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 48 }}>
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#FCA5A5', margin: '0 0 12px' }}>⚠️ Replace Before Failure</h3>
            <p style={{ color: '#CBD5E1', margin: '0 0 12px', fontSize: 14 }}>These appliances cause significant secondary damage when they fail unexpectedly:</p>
            <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#94A3B8', fontSize: 14, lineHeight: 1.8 }}>
              <li>HVAC — failed in August means $5K rush premium</li>
              <li>Water heater — flooding can destroy flooring and subfloor</li>
              <li>Roof — a single storm causes interior damage</li>
              <li>Pool pump — green pool in 72 hours</li>
              <li>Garage door opener — security risk if fails in open position</li>
            </ul>
          </div>
          <div style={{ background: 'rgba(100,116,139,0.08)', border: '1px solid rgba(100,116,139,0.3)', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#94A3B8', margin: '0 0 12px' }}>✅ Run to Failure OK</h3>
            <p style={{ color: '#CBD5E1', margin: '0 0 12px', fontSize: 14 }}>These appliances fail cleanly — no secondary damage, easy swap:</p>
            <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#94A3B8', fontSize: 14, lineHeight: 1.8 }}>
              <li>Dishwasher — inconvenience, not emergency</li>
              <li>Microwave — cheap, immediate replacement</li>
              <li>Garbage disposal — DIY replacement often under $200</li>
              <li>Dryer — no water, no flooding risk</li>
              <li>Sprinkler controller — landscaping inconvenience only</li>
            </ul>
          </div>
        </div>

        {/* DFW Note */}
        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 24, border: '1px solid #2D4A7A', marginBottom: 48 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px', color: '#60A5FA' }}>🌡️ Why DFW Shortens Appliance Life</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: '💧', title: 'Hard Water', desc: 'Mineral scale destroys water heaters, dishwashers, and softeners 30–40% faster than national average.' },
              { icon: '🔥', title: 'Extreme Heat', desc: '100°F+ summers run HVAC 24/7 for months. DFW systems accumulate 30% more operating hours than northern systems.' },
              { icon: '🌪️', title: 'Hail & Storms', desc: 'DFW averages 12 hail events per year — roofs and HVAC condenser units absorb thousands of micro-impacts annually.' },
              { icon: '🏔️', title: 'Clay Soil', desc: 'Foundation movement stresses rigid connections — gas lines, drain pipes, and ducting can shift and degrade over time.' },
            ].map(item => (
              <div key={item.title}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4, color: '#E2E8F0′ }}>{item.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '32px', background: 'linear-gradient(135deg, #1E3A5F, #1a2a4a)', borderRadius: 16, border: '1px solid #2D4A7A' }}>
          <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 12px' }}>Don't wait for appliances to fail</h3>
          <p style={{ color: '#94A3B8', margin: '0 0 24px' }}>ProLnk connects you with DFW-verified pros who specialize in appliance replacement and preventive maintenance.</p>
          <a href="/get-quotes" style={{ display: 'inline-block', padding: '14px 32px', background: '#3B82F6', color: '#fff', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>
            Get Quotes From Verified Pros →
          </a>
        </div>
      </div>
    </div>
  );
}
