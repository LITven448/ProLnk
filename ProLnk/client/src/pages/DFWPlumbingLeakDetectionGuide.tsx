import { useState } from 'react';

const HOME_AGES = [
  { label: 'Under 10 years', value: 'new' },
  { label: '10–20 years', value: 'mid' },
  { label: '20–40 years', value: 'aging' },
  { label: '40+ years', value: 'old' },
];

const PREV_LEAKS = [
  { label: 'No prior leaks', value: 'none' },
  { label: '1 minor leak', value: 'minor' },
  { label: '2+ leaks or a slab leak', value: 'history' },
];

const BUDGETS = [
  { label: 'Under $300', value: 'low' },
  { label: '$300–$600', value: 'mid' },
  { label: '$600+', value: 'high' },
];

const RECS: Record<string, Record<string, Record<string, { device: string; placement: string[]; cost: string; catches: string }>>> = {
  new: {
    none: {
      low: { device: 'Govee or YoLink water sensors x3', placement: ['Under kitchen sink', 'Water heater base', 'Washing machine'], cost: '$60–$120', catches: 'Appliance drips and slow supply line leaks' },
      mid: { device: 'Moen Flo Smart Water Monitor', placement: ['Main line at meter', 'Under all sinks (alert mode)'], cost: '$350–$400 installed', catches: 'Micro-leaks, running toilets, slow slab leaks' },
      high: { device: 'Phyn Plus whole-home monitor', placement: ['Main shutoff line', 'Under sink sensors at high-risk points'], cost: '$550–$750 installed', catches: 'Micro-leaks, freeze risk, all fixture usage anomalies' },
    },
    minor: {
      low: { device: 'YoLink sensors x4 + hub', placement: ['Repeat of prior leak location', 'Under kitchen sink', 'Water heater', 'Washing machine'], cost: '$120–$180', catches: 'Recurrence at known failure points' },
      mid: { device: 'Moen Flo + 2 sensors', placement: ['Main line', 'Prior leak location', 'Under kitchen sink'], cost: '$400–$500', catches: 'Micro-leaks and usage anomalies' },
      high: { device: 'Phyn Plus + AlertLabs sensors', placement: ['Main line + all risk zones'], cost: '$650–$900', catches: 'All micro-leaks, slab leak early signals, freeze risk' },
    },
    history: {
      low: { device: 'Moen Flo (entry level)', placement: ['Main line — this is the minimum for your profile'], cost: '$300–$400', catches: 'Usage anomalies and slow slab leak signals' },
      mid: { device: 'Moen Flo + sensors at all sinks', placement: ['Main line + all sinks + water heater'], cost: '$450–$600', catches: 'Comprehensive — all fixture-level and line-level detection' },
      high: { device: 'Phyn Plus + full AlertLabs deployment', placement: ['Main line + every fixture zone'], cost: '$800–$1,200', catches: 'Every micro-leak and slab leak early warning in the home' },
    },
  },
  mid: {
    none: {
      low: { device: 'Govee water sensors x4', placement: ['Under all sinks', 'Water heater', 'AC condensate pan'], cost: '$80–$150', catches: 'Appliance leaks and supply line drips' },
      mid: { device: 'Moen Flo Smart Water Monitor', placement: ['Main line', 'Under kitchen sink'], cost: '$350–$450', catches: 'All micro-leaks, slab leak risk, usage anomalies' },
      high: { device: 'Phyn Plus full deployment', placement: ['Main line + all high-risk zones'], cost: '$600–$850', catches: 'Every leak type including slab and line micro-leaks' },
    },
    minor: {
      low: { device: 'Moen Flo (critical at this age + history)', placement: ['Main line — point sensors alone are insufficient now'], cost: '$300–$400', catches: 'Usage anomalies and slow developing leaks' },
      mid: { device: 'Moen Flo + sensors x3', placement: ['Main + prior leak zone + water heater + AC pan'], cost: '$450–$600', catches: 'Comprehensive leak detection for your risk profile' },
      high: { device: 'Phyn Plus + sensors', placement: ['Full home coverage'], cost: '$700–$1,000', catches: 'All leak types with auto-shutoff capability' },
    },
    history: {
      low: { device: 'Moen Flo — do not skip main-line monitoring', placement: ['Main line shutoff point'], cost: '$350–$450', catches: 'Slab leak early signals and usage anomalies' },
      mid: { device: 'Moen Flo + sensors at all sinks', placement: ['Full coverage for your risk level'], cost: '$500–$700', catches: 'All fixture and main-line anomalies' },
      high: { device: 'Phyn Plus + AlertLabs full deployment', placement: ['Every zone in the home'], cost: '$900–$1,400', catches: 'Complete detection including insurance-grade documentation' },
    },
  },
  aging: {
    none: {
      low: { device: 'Moen Flo — aging pipes need main-line monitoring', placement: ['Main line — point sensors miss galvanized pipe failures'], cost: '$350–$450', catches: 'Slow pipe corrosion leaks and usage anomalies' },
      mid: { device: 'Moen Flo + sensors x4', placement: ['Main line + all sinks + water heater + AC'], cost: '$500–$700', catches: 'All micro-leaks including aging pipe signals' },
      high: { device: 'Phyn Plus + AlertLabs full deployment', placement: ['Every zone'], cost: '$800–$1,200', catches: 'Complete detection for aging infrastructure' },
    },
    minor: {
      low: { device: 'Moen Flo minimum — your profile demands it', placement: ['Main line'], cost: '$350–$500', catches: 'Usage anomalies and developing leaks' },
      mid: { device: 'Moen Flo + sensors at all prior risk points', placement: ['Full coverage for your history'], cost: '$550–$750', catches: 'All fixture and main-line anomalies' },
      high: { device: 'Phyn Plus full deployment + plumber video inspection', placement: ['Every zone + camera in high-risk lines'], cost: '$1,000–$1,500', catches: 'All current and future leak risks' },
    },
    history: {
      low: { device: 'Moen Flo — non-negotiable at this risk level', placement: ['Main line'], cost: '$400–$500', catches: 'Slab and main-line anomalies' },
      mid: { device: 'Phyn Plus — upgrade to auto-shutoff', placement: ['Main line + all fixture zones'], cost: '$700–$950', catches: 'All leak types with automatic water shutoff' },
      high: { device: 'Phyn Plus + AlertLabs + plumber video scope', placement: ['Full coverage + camera inspection'], cost: '$1,200–$1,800', catches: 'Every current and future leak risk in the home' },
    },
  },
  old: {
    none: {
      low: { device: 'Moen Flo — aging pipes make main-line monitoring essential', placement: ['Main line'], cost: '$400–$500', catches: 'Slow developing leaks from corroded pipes' },
      mid: { device: 'Phyn Plus + sensors', placement: ['Main line + full sensor coverage'], cost: '$700–$950', catches: 'All leak types with shutoff protection' },
      high: { device: 'Phyn Plus + AlertLabs + plumber inspection', placement: ['Full home coverage + camera scope'], cost: '$1,200–$1,800', catches: 'Every leak risk in aging infrastructure' },
    },
    minor: {
      low: { device: 'Phyn Plus minimum for your profile', placement: ['Main line'], cost: '$600–$750', catches: 'Main-line anomalies and slab signals' },
      mid: { device: 'Phyn Plus + sensors at all risk zones', placement: ['Full coverage'], cost: '$800–$1,100', catches: 'All fixture and main-line leaks' },
      high: { device: 'Phyn Plus + AlertLabs + full video scope', placement: ['Every zone + camera inspection'], cost: '$1,400–$2,000', catches: 'Complete leak detection and pipe condition assessment' },
    },
    history: {
      low: { device: 'Phyn Plus — auto-shutoff is critical here', placement: ['Main line'], cost: '$650–$800', catches: 'All anomalies with automatic protection' },
      mid: { device: 'Phyn Plus + AlertLabs full deployment', placement: ['Every zone in the home'], cost: '$1,000–$1,400', catches: 'Complete detection with shutoff' },
      high: { device: 'Phyn Plus + AlertLabs + plumber replacement plan', placement: ['Full monitoring + pipe replacement roadmap'], cost: '$1,500–$2,500', catches: 'All current risks plus proactive infrastructure upgrade' },
    },
  },
};

export default function DFWPlumbingLeakDetectionGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [prevLeaks, setPrevLeaks] = useState('');
  const [budget, setBudget] = useState('');
  const rec = homeAge && prevLeaks && budget ? RECS[homeAge]?.[prevLeaks]?.[budget] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>💧</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Plumbing Leak Detection Guide</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          DFW slab foundations mean plumbing runs under your home — and a slow slab leak can go undetected for months. Smart water monitors detect micro-leaks before they become $30,000 remediation jobs.
        </p>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🚰 Detection Technology Compared</h2>
          {[
            ['💡 Point Sensors (Govee/YoLink)', 'Alert when water contacts the sensor. Low cost, catches appliance leaks, misses slab and micro-leaks.'],
            ['🔬 Moen Flo Smart Water Monitor', 'Installs on main line. Learns your usage baseline and alerts on deviations — catches micro-leaks invisible to sensors.'],
            ['📊 Phyn Plus', 'Whole-home main-line monitor with auto-shutoff. Detects micro-leaks, freeze risk, and every fixture anomaly.'],
            ['🏢 AlertLabs', 'Enterprise-grade sensor deployment with professional monitoring. Insurance-grade leak documentation.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ borderBottom: '1px solid #1E2D45', paddingBottom: 12, marginBottom: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 13, color: '#8899AA' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔧 Get Your Detection Recommendation</h2>
          {[
            ['Home Age', HOME_AGES, homeAge, setHomeAge],
            ['Previous Leak History', PREV_LEAKS, prevLeaks, setPrevLeaks],
            ['Budget', BUDGETS, budget, setBudget],
          ].map(([label, options, selected, setter]) => (
            <div key={label as string} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#8899AA', marginBottom: 8 }}>{label as string}</label>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
                {(options as typeof HOME_AGES).map(o => (
                  <button key={o.value} onClick={() => (setter as (v: string) => void)(o.value)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                      background: selected === o.value ? '#F5E642' : '#0A1628',
                      color: selected === o.value ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Recommended: {rec.device}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Cost: {rec.cost}</div>
              <div style={{ fontSize: 13, color: '#8899AA', marginBottom: 6 }}>Placement priority:</div>
              {rec.placement.map(p => <div key={p} style={{ fontSize: 13, color: '#E8EDF5', marginBottom: 4 }}>📍 {p}</div>)}
              <div style={{ marginTop: 12, fontSize: 13, color: '#8899AA' }}>What this catches: <span style={{ color: '#E8EDF5' }}>{rec.catches}</span></div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' as const }}>
          <a href="/get-quotes" style={{ background: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
            Connect with a DFW Plumber →
          </a>
        </div>
      </div>
    </div>
  );
}