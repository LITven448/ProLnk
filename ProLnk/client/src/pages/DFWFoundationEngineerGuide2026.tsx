import { useState } from 'react';

const decisions: Record<string, { recommendation: string; reason: string; cost: string; urgency: string }> = {
  quote_received: { recommendation: '✅ Get Engineer First', reason: 'Before spending $5K-15K, a $400 engineer report verifies if repair is needed and prevents over-selling.', cost: '$300-600', urgency: 'Schedule within 2 weeks' },
  insurance_claim: { recommendation: '✅ Engineer Required', reason: 'Insurance adjusters and attorneys require a licensed PE report for claims over $5K. Non-negotiable.', cost: '$400-700', urgency: 'Get immediately, before repairs' },
  buying_home: { recommendation: '✅ Get Engineer First', reason: 'A PE report during due diligence protects you from buying a money pit. Foundation issues are the #1 deal-killer in DFW.', cost: '$300-500', urgency: 'Order during inspection period' },
  small_cracks: { recommendation: '📋 Contractor OK', reason: 'Hairline cracks under 1/8in are often cosmetic. A reputable contractor can assess and monitor. Engineer if cracks grow.', cost: 'Free estimate', urgency: 'Monitor quarterly' },
  sticking_doors: { recommendation: '📋 Contractor OK', reason: 'Start with 2-3 foundation contractor inspections (free). Only escalate to engineer if quotes vary wildly or seem excessive.', cost: 'Free estimates', urgency: 'Get quotes within 30 days' },
  major_damage: { recommendation: '🚨 Engineer Immediately', reason: 'Severe cracking, visible tilt, or structural compromise requires a PE report before any work begins. Safety issue.', cost: '$500-800', urgency: 'Schedule within 48 hours' },
};

export default function DFWFoundationEngineerGuide2026() {
  const [situation, setSituation] = useState('');
  const result = situation ? decisions[situation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          DFW FOUNDATION GUIDE 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Engineer vs Contractor Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Knowing when to hire a structural engineer vs going straight to a contractor can save you thousands in DFW.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { label: '🏗️ Structural Engineer (PE)', desc: 'Licensed by Texas Board of Professional Engineers. Provides unbiased assessment. Has no financial interest in repair scope. Report costs $300-600.' },
            { label: '🔧 Foundation Contractor', desc: 'Has a financial interest in recommending repairs. Free inspections. Legitimate companies give honest assessments — but get 3 quotes minimum.' },
            { label: '📋 What PE Report Covers', desc: 'Current elevation readings, soil analysis, pier recommendations with exact specs, written opinion on repair necessity and scope.' },
            { label: '⚖️ Texas Licensing Requirement', desc: 'Only a licensed Professional Engineer (PE) can provide a structural report. Always verify Texas PE license at Texas.gov before paying.' },
          ].map((c) => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 8, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 8, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h3 style={{ fontWeight: 700, marginBottom: 8 }}>💡 Pro Tip: Use Engineer Report as Leverage</h3>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>A PE report specifying exactly how many piers and what depth eliminates over-selling. Contractors must bid to the spec, not their own assessment. This alone often saves $2,000-5,000 on a typical DFW job.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 8, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎯 Engineer vs Contractor Decision Tool</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>My situation is:</label>
          <select value={situation} onChange={(e) => setSituation(e.target.value)}
            style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, marginBottom: 16 }}>
            <option value="">Select your situation...</option>
            <option value="quote_received">I received a large contractor quote ($5K+)</option>
            <option value="insurance_claim">Filing an insurance claim</option>
            <option value="buying_home">Buying a home with foundation concerns</option>
            <option value="small_cracks">Small hairline cracks only</option>
            <option value="sticking_doors">Sticking doors / minor unevenness</option>
            <option value="major_damage">Major damage or visible structural issues</option>
          </select>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 6, padding: 16, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.recommendation}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8 }}>{result.reason}</div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>💰 {result.cost}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>⏱️ {result.urgency}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, padding: 20, background: '#112240', borderRadius: 8, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get 3 Vetted Foundation Quotes</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects you with licensed, reviewed DFW foundation specialists. Free, no pressure, no obligation.</div>
        </div>
      </div>
    </div>
  );
}
