import { useState } from 'react';

type SystemKey = 'HVAC' | 'Roof' | 'Water Heater' | 'Electrical Panel' | 'Plumbing' | 'Windows' | 'Garage Door';

const SYSTEM_LIFE: Record<SystemKey, number> = {
  'HVAC': 13,
  'Roof': 22,
  'Water Heater': 10,
  'Electrical Panel': 35,
  'Plumbing': 40,
  'Windows': 25,
  'Garage Door': 18,
};
const SYSTEM_COST: Record<SystemKey, number> = {
  'HVAC': 7500,
  'Roof': 14000,
  'Water Heater': 1800,
  'Electrical Panel': 4200,
  'Plumbing': 6000,
  'Windows': 9000,
  'Garage Door': 1500,
};
const SYSTEM_ICONS: Record<SystemKey, string> = {
  'HVAC': '❄️',
  'Roof': '🏠',
  'Water Heater': '🚿',
  'Electrical Panel': '⚡',
  'Plumbing': '🔧',
  'Windows': '🪟',
  'Garage Door': '🚗',
};
const SYSTEMS = Object.keys(SYSTEM_LIFE) as SystemKey[];
const CURRENT_YEAR = 2026;

export default function DFWSystemReplacementForecast() {
  const [ages, setAges] = useState<Record<SystemKey, string>>(
    SYSTEMS.reduce((acc, s) => ({ ...acc, [s]: '' }), {} as Record<SystemKey, string>)
  );
  const [forecast, setForecast] = useState<null | { system: SystemKey; replaceYear: number; cost: number; monthlySave: number; yearsLeft: number }[]>(null);

  function setAge(sys: SystemKey, val: string) {
    setAges(prev => ({ ...prev, [sys]: val }));
  }

  function calculate() {
    const results = SYSTEMS.map(sys => {
      const age = parseInt(ages[sys], 10);
      if (isNaN(age)) return null;
      const yearsLeft = Math.max(0, SYSTEM_LIFE[sys] - age);
      const replaceYear = CURRENT_YEAR + yearsLeft;
      const cost = SYSTEM_COST[sys];
      const monthlySave = Math.round(cost / Math.max(1, yearsLeft * 12));
      return { system: sys, replaceYear, cost, monthlySave, yearsLeft };
    }).filter(Boolean) as { system: SystemKey; replaceYear: number; cost: number; monthlySave: number; yearsLeft: number }[];
    results.sort((a, b) => a.replaceYear - b.replaceYear);
    setForecast(results);
  }

  const totalCost = forecast ? forecast.reduce((s, r) => s + r.cost, 0) : 0;
  const totalMonthly = forecast ? forecast.reduce((s, r) => s + r.monthlySave, 0) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>📅</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW System Replacement Forecast</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Enter your home system ages — get a 10-year DFW replacement calendar with savings targets.</p>
        </div>
        <div style={{ background: '#0f2039', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {SYSTEMS.map(sys => (
              <label key={sys} style={{ display: 'block' }}>
                <span style={{ color: '#F5E642', fontSize: 12 }}>{SYSTEM_ICONS[sys]} {sys} Age (yrs)</span>
                <input type="number" value={ages[sys]} onChange={e => setAge(sys, e.target.value)} placeholder="e.g. 8″
                  style={{ display: 'block', width: '100%', marginTop: 4, padding: '8px 12px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
              </label>
            ))}
          </div>
          <button onClick={calculate}
            style={{ width: '100%', marginTop: 20, padding: '13px 0', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Generate 10-Year Forecast
          </button>
        </div>
        {forecast && forecast.length > 0 && (
          <div>
            <div style={{ background: '#0f2039', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>📊 Replacement Calendar</h2>
              {forecast.map(r => (
                <div key={r.system} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{SYSTEM_ICONS[r.system]} {r.system}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{r.yearsLeft === 0 ? '🔴 Replace now' : `${r.yearsLeft}yr left → ${r.replaceYear}`}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#F5E642', fontWeight: 700 }}>${r.cost.toLocaleString()}</div>
                    <div style={{ color: '#94a3b8', fontSize: 12 }}>${r.monthlySave}/mo to save</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0f2039', borderRadius: 12, padding: 20, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Total Replacement Budget</div>
                <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>${totalCost.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Monthly Savings Target</div>
                <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>${totalMonthly}/mo</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
