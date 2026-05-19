import { useState } from 'react';

const dfwCities = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Allen', 'Garland', 'Irving', 'Mesquite', 'Arlington', 'Denton', 'Flower Mound', 'Lewisville', 'Carrollton', 'Richardson'];

const cityGuide: Record<string, { required: boolean; type: string; test: string; testCost: string; replaceCost: string; note: string }> = {
  Dallas: { required: true, type: 'Pressure Vacuum Breaker (PVB) — most common for DFW residential', test: 'Annual test required by Dallas Water Utilities — TCEQ licensed tester', testCost: '$50–80/yr', replaceCost: '$280–420 installed', note: 'Dallas Water Utilities enforces backflow requirements strictly — non-compliant systems can be disconnected.' },
  'Fort Worth': { required: true, type: 'PVB or Reduced Pressure Zone (RPZ) depending on installation', test: 'Annual test by licensed TCEQ tester required — submit results to FW Water Dept', testCost: '$55–85/yr', replaceCost: '$300–450 installed', note: 'Fort Worth requires test results submitted by March 1 each year for irrigation systems.' },
  Plano: { required: true, type: 'PVB standard for residential irrigation connections', test: 'Annual test required — Plano Utilities maintains approved tester list', testCost: '$50–75/yr', replaceCost: '$260–400 installed', note: 'Plano will add test fee to water bill if not submitted on time — use a Plano-approved tester.' },
  Frisco: { required: true, type: 'PVB for irrigation, RPZ for commercial or high-hazard', test: 'Annual, TCEQ licensed tester, results to Frisco Water', testCost: '$50–80/yr', replaceCost: '$275–425 installed', note: 'Frisco Water is expanding enforcement — new home inspections now include backflow check.' },
  McKinney: { required: true, type: 'PVB required at irrigation connection point', test: 'Annual test, licensed tester, submit to McKinney Utilities', testCost: '$55–80/yr', replaceCost: '$280–440 installed', note: 'McKinney has grown significantly — enforcement increasing with new developments.' },
  Allen: { required: true, type: 'PVB standard residential; RPZ for pools or fertilizer injection', test: 'Annual test required — Allen Water Department', testCost: '$50–75/yr', replaceCost: '$265–410 installed', note: 'Allen requires backflow on all new irrigation permits issued after 2010.' },
  Garland: { required: true, type: 'PVB most common for residential', test: 'Annual test, TCEQ licensed tester required', testCost: '$50–75/yr', replaceCost: '$260–400 installed', note: 'Garland actively audits irrigation systems on meter reads — keep test records on file.' },
  Irving: { required: true, type: 'PVB or Double Check Valve Assembly (DCVA)', test: 'Annual by TCEQ licensed tester', testCost: '$50–80/yr', replaceCost: '$270–420 installed', note: 'Irving allows DCVA as an alternative to PVB in some locations — confirm with Irving Utilities.' },
  Mesquite: { required: true, type: 'PVB standard', test: 'Annual test required, licensed tester', testCost: '$50–75/yr', replaceCost: '$260–400 installed', note: 'Mesquite Utilities enforces backflow at permit stage — systems without preventer cannot receive permit.' },
  Arlington: { required: true, type: 'PVB for residential irrigation', test: 'Annual test, TCEQ licensed, submit to Arlington Utilities', testCost: '$55–85/yr', replaceCost: '$280–430 installed', note: 'Arlington has one of the larger DFW utility territories — enforcement is consistent across the city.' },
  Denton: { required: true, type: 'PVB or RPZ depending on risk assessment', test: 'Annual test required — Denton Utilities', testCost: '$50–80/yr', replaceCost: '$270–420 installed', note: 'Denton Utilities provides a licensed tester list on their website — use only approved testers.' },
  'Flower Mound': { required: true, type: 'PVB standard', test: 'Annual test, TCEQ licensed tester, submit to Flower Mound Utilities', testCost: '$50–75/yr', replaceCost: '$265–410 installed', note: 'Flower Mound is strict about annual deadlines — late submissions can result in a penalty fee.' },
  Lewisville: { required: true, type: 'PVB most common', test: 'Annual by TCEQ licensed tester', testCost: '$50–75/yr', replaceCost: '$260–400 installed', note: 'Lewisville Utilities handles backflow compliance through their online portal — easy to submit test results.' },
  Carrollton: { required: true, type: 'PVB for residential irrigation', test: 'Annual test required — Carrollton Utilities', testCost: '$50–75/yr', replaceCost: '$270–415 installed', note: 'Carrollton irrigation permits require backflow installation — required before system activation.' },
  Richardson: { required: true, type: 'PVB standard for residential', test: 'Annual test by TCEQ licensed tester', testCost: '$50–75/yr', replaceCost: '$260–400 installed', note: 'Richardson enforces backflow compliance during meter reads — submit annual test results proactively.' },
};

export default function DFWIrrigationBackflowDFW2026() {
  const [city, setCity] = useState('');

  const guide = city ? cityGuide[city] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk DFW Guide · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>🛡️ DFW Irrigation Backflow Preventer Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>Backflow preventers are required by virtually all DFW municipalities for irrigation systems — protecting the public water supply from contamination. Here's what you need to know by city.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '⚖️', title: 'Required by Law', body: 'TCEQ and most DFW cities mandate backflow preventers on all irrigation connections to potable water.' },
            { icon: '🔬', title: 'Annual Testing', body: 'Texas law requires annual testing by a TCEQ-licensed tester — results must be submitted to your city.' },
            { icon: '💰', title: 'Typical Costs', body: 'Annual test: $50–100. Replacement: $250–450 installed. Most last 10–15 years with proper maintenance.' },
            { icon: '🏗️', title: 'PVB Most Common', body: 'Pressure Vacuum Breaker (PVB) is the standard for DFW residential irrigation — installed above ground at the meter.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏙️ DFW City Backflow Requirements</h2>
          <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Select your DFW city</label>
          <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', background: '#162035', border: '1px solid #1E3A5F', color: '#E8EAF6', borderRadius: 8, padding: '12px 14px', fontSize: 15, marginBottom: 20 }}>
            <option value=''>Select city</option>
            {dfwCities.map(c => <option key={c}>{c}</option>)}
          </select>
          {guide && (
            <div style={{ background: '#162035', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>🏙️ {city} Backflow Requirements</div>
                <div style={{ background: '#10B981', color: '#FFFFFF', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>✅ Required</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                {[
                  { label: 'Device Type', val: guide.type },
                  { label: 'Test Requirement', val: guide.test },
                  { label: 'Annual Test Cost', val: guide.testCost },
                  { label: 'Replacement Cost', val: guide.replaceCost },
                ].map(r => (
                  <div key={r.label} style={{ background: '#0F2040', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#94A3B8', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{r.label}</div>
                    <div style={{ color: '#E8EAF6', fontSize: 13 }}>{r.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 12 }}>📋 CITY NOTE: </span>
                <span style={{ color: '#94A3B8', fontSize: 12 }}>{guide.note}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Schedule DFW Backflow Testing or Replacement</div>
          <div style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>TCEQ licensed DFW testers — annual testing, repair, and replacement. Fast scheduling, city reporting included.</div>
          <a href='/' style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}