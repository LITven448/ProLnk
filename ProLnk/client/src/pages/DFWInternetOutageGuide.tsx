import { useState } from 'react';

const providers = ['AT&T Fiber', 'AT&T DSL', 'Spectrum', 'Frontier Fiber', 'Grande/Astound', 'T-Mobile Home Internet', 'Starlink'];
const outageTypes = ['Storm Knocked Out', 'Random Drop', 'Slow But Connected', 'Full Neighborhood Out', 'Just My Home'];

function getOutageInfo(provider: string, outageType: string) {
  const times: Record<string, { eta: string; backup: string; tip: string; cost: string }> = {
    'AT&T Fiber-Storm Knocked Out': { eta: '4-12 hours (fiber cuts take longer)', backup: 'AT&T mobile hotspot or Visible $25/mo prepaid', tip: 'Fiber lines are buried in DFW — outages usually from node flooding not line breaks', cost: 'Backup hotspot: $0-25/mo' },
    'Spectrum-Storm Knocked Out': { eta: '2-8 hours (coax infrastructure)', backup: 'Spectrum mobile hotspot or T-Mobile prepaid', tip: 'Spectrum coax is above-ground in many DFW neighborhoods — storm damage is common', cost: 'Backup hotspot: $15-40/mo' },
    'AT&T DSL-Full Neighborhood Out': { eta: '8-24 hours', backup: 'Strongly consider upgrading to fiber — DSL in DFW is unreliable', tip: 'DFW DSL copper lines corrode from heat cycling — outages increase each summer', cost: 'Fiber upgrade: $55-80/mo replaces DSL' },
    'Starlink-Storm Knocked Out': { eta: '30-60 minutes (clears after storm passes)', backup: 'Starlink recovers fastest of any DFW provider post-storm', tip: 'DFW storms cause 15-45min outages — Starlink self-heals quickly once clouds clear', cost: 'No backup needed — fastest recovery' },
  };
  const key = `${provider}-${outageType}`;
  return times[key] || {
    eta: provider.includes('Fiber') ? '2-8 hours' : provider.includes('DSL') ? '12-48 hours' : '4-12 hours',
    backup: 'T-Mobile Prepaid hotspot (best DFW coverage) or Visible $25/mo unlimited',
    tip: 'DFW severe weather season April-June causes most multi-hour outages. Always have mobile backup ready.',
    cost: 'Prepaid hotspot: $15-40/mo. 4G home router: $50-150 device + plan',
  };
}

export default function DFWInternetOutageGuide() {
  const [provider, setProvider] = useState('');
  const [outageType, setOutageType] = useState('');
  const [result, setResult] = useState<{ eta: string; backup: string; tip: string; cost: string } | null>(null);

  function handleCheck() {
    if (!provider || !outageType) return;
    setResult(getOutageInfo(provider, outageType));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>📡🌩️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Internet Outage Survival Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW severe weather (especially spring storms April–June) routinely knocks out internet for hours. Know your provider's
          typical recovery time and always have a mobile backup plan ready.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 32, fontWeight: 600 }}>
          🌪️ DFW Storm Season: April–June avg 15 severe weather events. Have backup internet ready BEFORE storm season starts.
        </div>

        <div style={{ display: 'grid', gap: 20, marginBottom: 28 }}>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontWeight: 600 }}>Your Internet Provider</label>
            <select value={provider} onChange={e => setProvider(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#1E2D45', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select provider...</option>
              {providers.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontWeight: 600 }}>Type of Outage</label>
            <select value={outageType} onChange={e => setOutageType(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#1E2D45', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select outage type...</option>
              {outageTypes.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <button onClick={handleCheck}
          style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 32, width: '100%' }}>
          📋 Get DFW Outage Response Plan
        </button>

        {result && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <div style={{ display: 'grid', gap: 16 }}>
              {[{ label: '⏱️ Expected Resolution', value: result.eta }, { label: '📱 Best Backup Option', value: result.backup }, { label: '💡 DFW Context', value: result.tip }, { label: '💰 Backup Cost', value: result.cost }].map(item => (
                <div key={item.label} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 16 }}>
                  <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: '#CBD5E1', lineHeight: 1.5 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📱 DFW Backup Internet Options Ranked</h3>
          {[
            { name: 'T-Mobile 4G Hotspot', cost: '$30-50/mo', note: 'Best DFW tower density — works when others fail' },
            { name: 'Visible (Verizon backbone)', cost: '$25/mo unlimited', note: 'Strong in DFW suburbs, slower in outages due to deprioritization' },
            { name: 'AT&T Mobile Hotspot', cost: '$35-60/mo', note: 'Good downtown DFW, thinner in outer suburbs' },
            { name: 'Starlink Portability', cost: '$120/mo + hardware', note: 'Best for rural DFW fringe — overkill for suburbs with 4G' },
          ].map(opt => (
            <div key={opt.name} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #334155′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>{opt.name}</span>
                <span style={{ color: '#F5E642′ }}>{opt.cost}</span>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{opt.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
