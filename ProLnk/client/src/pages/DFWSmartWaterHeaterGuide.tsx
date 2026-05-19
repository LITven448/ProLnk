import { useState } from 'react';

const situations = ['Primary Residence (Full Time)', 'Second Home / Vacation Property', 'Rental Property', 'Short-Term Rental (Airbnb/VRBO)'];
const energyConcerns = ['High Oncor Electric Bills', 'Avoiding Peak Demand Charges', 'Water Leak Prevention', 'Vacation / Away Mode', 'Remote Monitoring'];

export default function DFWSmartWaterHeaterGuide() {
  const [situation, setSituation] = useState('');
  const [concern, setEnergyConcern] = useState('');
  const [result, setResult] = useState<null | { features: string[]; units: string; premium: string; dfwTip: string }>(null);

  function calculate() {
    if (!situation || !concern) return;
    const isRental = situation.includes('Rental');
    const isVacation = situation.includes('Second') || situation.includes('Short');
    const isPrimary = situation.includes('Primary');
    const concernLower = concern.toLowerCase();

    const features: string[] = [];
    if (concernLower.includes('oncor') || concernLower.includes('peak')) {
      features.push('⚡ Peak Demand Scheduling — heat water during Oncor off-peak hours (typically 9pm–6am) to save $15–$40/month');
      features.push('📊 Energy Usage Tracking — identify waste and optimize heating cycles');
    }
    if (concernLower.includes('leak')) {
      features.push('💧 Leak Detection Integration — pairs with Moen Flo, Phyn, or LeakSmart sensors; auto-shutoff on detection');
      features.push('🔔 Instant Leak Alerts — push notification to your phone when moisture detected');
    }
    if (concernLower.includes('vacation') || concernLower.includes('away') || isVacation) {
      features.push('🏖️ Vacation Mode — critical for DFW: prevents legionella in standing water during long absences');
      features.push('🌡️ Freeze Protection Mode — ensures minimum temp during DFW cold snaps (Feb 2021 showed this matters)');
      features.push('📱 Remote On/Off — turn on water heater 1 hour before returning home');
    }
    if (concernLower.includes('monitor') || isRental) {
      features.push('📡 Remote Monitoring — check unit status, water temp, and error codes from anywhere');
      features.push('🔔 Maintenance Alerts — notified when descaling is needed (critical for DFW hard water)');
    }
    if (isPrimary) {
      features.push('📅 Smart Scheduling — learns your hot water usage patterns and pre-heats just in time');
    }

    const units = isRental
      ? '🏆 Top picks for DFW rentals: Rheem ProTerra 65-gal (WiFi, leak sensor port) | Bradford White AeroTherm (utility monitoring) | A.O. Smith Voltex (Oncor-ready scheduling)'
      : '🏆 Top picks for DFW: Rheem ProTerra Series | A.O. Smith Signature 700 | Bradford White eF Series | Rinnai RUR (tankless with smart module)';

    const premium = '💰 Smart feature premium: $100–$300 over standard unit | Monthly savings from peak scheduling: $15–$40 | Payback: 6–18 months in DFW';

    const dfwTip = isVacation || isRental
      ? '📍 DFW vacation property tip: Smart WH pays for itself in one prevented freeze or leak event. DFW pipes freeze fast during winter storms — remote monitoring is not optional for unoccupied homes.'
      : '📍 DFW Oncor tip: Oncor\’s 4-9pm peak window costs 3× more than off-peak rates in summer. Smart scheduling to heat at 9pm instead of 5pm saves meaningful money across DFW\’s 100°F summers.';

    setResult({ features, units, premium, dfwTip });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>📱 DFW WATER HEATER GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Smart Water Heaters for DFW Homes</h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>WiFi-enabled water heaters are especially valuable in DFW — schedule around Oncor peak rates, protect vacant homes from freezes, and detect leaks before they cause damage.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '💰', label: '$15–$40/mo', sub: 'savings from peak scheduling' },
            { icon: '🧊', label: 'Freeze Protection', sub: 'critical after Feb 2021' },
            { icon: '💧', label: 'Leak Detection', sub: 'avg claim: $11K in DFW' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0D1F3C', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: '0.5rem' }}>{c.label}</div>
              <div style={{ color: '#aaa', fontSize: '0.8rem' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>Why Smart WHs Matter More in DFW</h2>
          {[
            '⚡ Oncor peak rates (4–9pm) are 2–3× higher in summer — smart scheduling avoids them automatically',
            '🧊 DFW freeze events (Feb 2021) showed that remote monitoring of vacant homes prevents $10K+ water damage',
            '💧 DFW hard water accelerates sediment — smart units alert you when efficiency drops before failure',
            '☀️ Pair with solar panels (DFW gets 234 sunny days) to heat water with free solar energy midday',
          ].map(item => (
            <div key={item} style={{ color: '#ccc', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📱 Find Your Smart WH Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Home Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {situations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>DFW Energy Concern</label>
              <select value={concern} onChange={e => setEnergyConcern(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {energyConcerns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Find My Smart WH Features →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Your Smart WH Recommendation</h3>
            <div style={{ marginBottom: '1rem' }}>
              {result.features.map((f, i) => (
                <div key={i} style={{ color: '#ccc', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{f}</div>
              ))}
            </div>
            <div style={{ color: '#ccc', marginBottom: '0.6rem', fontSize: '0.95rem' }}>{result.units}</div>
            <div style={{ color: '#ccc', marginBottom: '0.6rem', fontSize: '0.95rem' }}>{result.premium}</div>
            <div style={{ color: '#ccc', marginBottom: '1rem', fontSize: '0.95rem' }}>{result.dfwTip}</div>
            <div style={{ padding: '0.75rem', background: '#0A1628', borderRadius: 6, color: '#F5E642', fontSize: '0.9rem', textAlign: 'center' }}>
              Get quotes from DFW plumbers for smart water heater installation — free on ProLnk.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
