import { useState } from 'react';

export default function DFWRoofingHailSizeTracking2026() {
  const [stage, setStage] = useState('');
  const [guide, setGuide] = useState('');

  const stages = [
    'Storm still happening — collecting live',
    'Storm just ended — specimens available',
    'A few hours after storm',
    'Next day — no specimens left',
    'Filing insurance claim now',
  ];

  const generate = () => {
    if (!stage) return;
    let tips = [];
    if (stage === 'Storm still happening — collecting live') {
      tips.push('🥣 Place a shallow pan or bowl outside to catch hailstones as they fall — metal cookie sheet works well');
      tips.push('📸 Photograph hailstones immediately next to a ruler or coin for scale — timestamps matter for claims');
      tips.push('🌡️ Move caught hailstones to freezer IMMEDIATELY — DFW heat melts specimens within minutes');
    }
    if (stage === 'Storm just ended — specimens available') {
      tips.push('❄️ Freeze all hailstones within 5 minutes — DFW temperatures above 85°F destroy evidence fast');
      tips.push('📏 Measure largest specimens with ruler against flat surface — record in fractions of an inch');
      tips.push('📱 Open iHail, HailTrace, or Weather Underground apps — submit size report with your ZIP code now');
    }
    if (stage === 'A few hours after storm') {
      tips.push('🔍 Check frozen specimens in freezer — measure diameter at widest point with ruler');
      tips.push('📊 1″ hail = dime size, 1.5″ = quarter size, 1.75″ = golf ball — insurance thresholds differ by carrier');
      tips.push('📸 Photograph damage to soft metals: gutters, downspouts, AC fins — these document hail size forensically');
    }
    if (stage === 'Next day — no specimens left') {
      tips.push('🌐 Pull SPC Storm Reports for your ZIP — NOAA logs confirmed hail size from trained spotters');
      tips.push('🛰️ Request Verisk/CoreLogic hail report — insurance adjusters use these, you can too (some are free)');
      tips.push('🏠 Soft metal damage (AC fins, gutters, fascia) tells size story even without specimens');
    }
    if (stage === 'Filing insurance claim now') {
      tips.push('📋 Class 4 shingles require 1.75″+ hail for impact damage — know your shingle class before claim');
      tips.push('💰 Larger documented size = higher claim value — every 0.25″ matters for adjuster assessment');
      tips.push('🤝 Hire a public adjuster for DFW hail claims over $15K — they average 20-40% higher settlements');
    }
    tips.push('🔧 $5-10 hail measuring tool from hardware store — keep it in your storm kit permanently');
    tips.push('📱 HailTrace app provides historical hail maps for DFW — free tier shows events back 2 years');
    setGuide(tips.join('
'));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', borderRadius: 8, padding: '4px 12px', display: 'inline-block', marginBottom: 12 }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 12 }}>DFW ROOFING GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Hail Size Tracking & Documentation</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>How to measure and document DFW hail for maximum insurance claim value — from live collection to NOAA reports.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⛈️ Get Your Documentation Guide</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>Where Are You in the Process?</label>
          <select value={stage} onChange={e => setStage(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, marginBottom: 20, boxSizing: 'border-box' }}>
            <option value="">Select stage...</option>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Generate Documentation Guide</button>
        </div>

        {guide && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📏 Your Hail Documentation Plan</h3>
            {guide.split('
').map((line, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>{line}</div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[['🪙 Size Reference', '1″=dime, 1.25″=nickel, 1.5″=quarter, 1.75″=golf ball threshold'],['❄️ Freeze Fast', 'DFW heat destroys specimens — freezer within 5 min of storm end'],['📱 Apps', 'iHail and HailTrace for real-time DFW hail size crowd-sourcing'],['🛡️ Class 4 Threshold', '1.75″+ hail required for Class 4 shingle impact claim in DFW']].map(([title, desc]) => (
            <div key={title} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Get a DFW roofing contractor to inspect for hail damage</p>
          <div style={{ background: '#F5E642', borderRadius: 8, padding: '10px 20px', display: 'inline-block', cursor: 'pointer' }}>
            <span style={{ color: '#0A1628', fontWeight: 700 }}>🏠 Find Roofer in DFW</span>
          </div>
        </div>
      </div>
    </div>
  );
}