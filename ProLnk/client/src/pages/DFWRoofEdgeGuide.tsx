import { useState } from 'react';

export default function DFWRoofEdgeGuide() {
  const [edgeCondition, setEdgeCondition] = useState('');
  const [rainExposure, setRainExposure] = useState('');
  const [result, setResult] = useState<null | { assessment: string; repairType: string; cost: string; urgency: string; urgencyColor: string }>(null);

  const data: Record<string, Record<string, { assessment: string; repairType: string; cost: string; urgency: string; urgencyColor: string }>> = {
    good: {
      high: { assessment: 'Drip edge is functioning correctly. DFW heavy rain is being directed into gutters rather than wicking under shingles.', repairType: 'No repair needed — inspect annually.', cost: '$0 now. Budget $150-300 for future replacement at reroof time.', urgency: 'No Action Required', urgencyColor: '#10B981' },
      medium: { assessment: 'Good drip edge in moderate rain exposure — solid protection. Fascia boards should be dry and paint intact.', repairType: 'No repair needed.', cost: '$0 now.', urgency: 'No Action Required', urgencyColor: '#10B981' },
      low: { assessment: 'Good drip edge condition. Low rain exposure reduces stress significantly.', repairType: 'No repair needed.', cost: '$0 now.', urgency: 'No Action Required', urgencyColor: '#10B981' }
    },
    rusting: {
      high: { assessment: 'Rusting drip edge in high-rain exposure is actively failing. Surface rust allows water to wick under shingles during DFW heavy rain events.', repairType: 'Full drip edge replacement — do not patch rust. Install aluminum or galvanized steel.', cost: '$200-500 for full perimeter replacement depending on linear footage.', urgency: 'Replace Within 6 Months', urgencyColor: '#F59E0B' },
      medium: { assessment: 'Rust is deteriorating the drip edge metal, reducing its effectiveness at directing water away from fascia.', repairType: 'Replace rusted sections — at minimum all damaged runs. Consider full replacement for consistency.', cost: '$150-400 for partial to full replacement.', urgency: 'Replace This Season', urgencyColor: '#F59E0B' },
      low: { assessment: 'Surface rust with low rain exposure — lower immediate urgency but rust will progress.', repairType: 'Replace at next opportunity or at reroof.', cost: '$150-350 replacement or roll into reroof cost.', urgency: 'Monitor — Replace Within 12 Months', urgencyColor: '#F5E642' }
    },
    missing: {
      high: { assessment: 'Missing drip edge in high-rain DFW exposure means every major storm is driving water directly behind your shingles and into your fascia. Fascia rot and interior soffit damage are likely already occurring.', repairType: 'Emergency installation — aluminum drip edge, full perimeter. Inspect fascia boards for rot simultaneously.', cost: '$250-600 installation + potential $200-800 fascia repair if rot present.', urgency: '🚨 Emergency — Install Immediately', urgencyColor: '#EF4444' },
      medium: { assessment: 'Missing drip edge means DFW rain is wicking behind shingles at the eave. Each rain event causes incremental fascia and soffit damage.', repairType: 'Install drip edge this season. Check fascia for soft spots indicating rot.', cost: '$200-500 installation.', urgency: 'High Priority — Fix This Season', urgencyColor: '#EF4444' },
      low: { assessment: 'Missing drip edge even in low-rain exposure eventually causes fascia damage. Less urgent but should not be permanent.', repairType: 'Install drip edge within 12 months.', cost: '$150-400 installation.', urgency: 'Fix Within 12 Months', urgencyColor: '#F59E0B' }
    },
    improper: {
      high: { assessment: 'Improperly installed drip edge — wrong overlap, reverse installation, or nailed through field shingles — will fail during the first significant DFW storm. Water follows the improper channel behind the fascia.', repairType: 'Remove and reinstall correctly. This requires lifting eave shingles to install drip edge under shingles, over the underlayment at the rake.', cost: '$300-700 depending on scope of improper installation.', urgency: 'Replace Before Storm Season', urgencyColor: '#EF4444' },
      medium: { assessment: 'Improper installation is redirecting water incorrectly. Less urgent than high-exposure but still causing incremental damage each rain event.', repairType: 'Correct installation — cannot be patched, must be reinstalled.', cost: '$250-600.', urgency: 'Fix This Season', urgencyColor: '#F59E0B' },
      low: { assessment: 'Improper installation in low-rain exposure — lowest urgency scenario, but should be corrected.', repairType: 'Reinstall correctly at next roofing opportunity.', cost: '$200-500.', urgency: 'Fix Within 18 Months', urgencyColor: '#F5E642' }
    }
  };

  function analyze() {
    if (!edgeCondition || !rainExposure) return;
    setResult(data[edgeCondition]?.[rainExposure] ?? null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '.25rem' }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '.5rem' }}>
          DFW Roof Edge & Drip Edge Guide
        </h1>
        <p style={{ color: '#9AAAB8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Drip edge is a thin metal strip installed at your roof's edges that directs rainwater away from your fascia and into your gutters. It's one of the least expensive roofing components — and one of the most consequential when it fails or is missing in DFW's heavy-rain climate.
        </p>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '.5rem' }}>🌧️ Why Drip Edge Matters in DFW</div>
            <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>DFW averages 37 inches of rain annually, often delivered in intense bursts — 1-2 inches per hour during spring thunderstorms. Without drip edge, water tension pulls rain water horizontally under shingles at the eave, saturating the wood decking and fascia board. Fascia rot from missing drip edge can cost $800-2,500 to repair — far more than the drip edge itself.</p>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #3B82F6' }}>
            <div style={{ fontWeight: 600, color: '#3B82F6', marginBottom: '.5rem' }}>🔍 How to Inspect Drip Edge</div>
            <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>From the ground, look at the roofline edge where the shingles overhang the gutter or fascia. You should see a straight metal strip (usually white, galvanized, or brown) running the full length of each eave and rake. If you see bare wood, shingles hanging without a metal backing, or rust staining on fascia — your drip edge needs attention.</p>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #10B981' }}>
            <div style={{ fontWeight: 600, color: '#10B981', marginBottom: '.5rem' }}>📋 Correct Installation</div>
            <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>At the eave (bottom edge): drip edge installs under the underlayment — water flows over drip edge into gutter. At the rake (side edge): drip edge installs over the underlayment. Many DFW re-roofs install drip edge incorrectly by not lifting old shingles — common shortcut that creates long-term problems.</p>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>🔍 Assess Your Drip Edge</h2>
          <div style={{ display: 'grid', gap: '.75rem', marginBottom: '1rem' }}>
            <select value={edgeCondition} onChange={e => setEdgeCondition(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>Drip edge condition</option>
              <option value='good'>Good — visible, straight, no rust</option>
              <option value='rusting'>Rusting or corroding</option>
              <option value='missing'>Missing — not visible at eave/rake</option>
              <option value='improper'>Improperly installed (sagging, gaps, over shingles)</option>
            </select>
            <select value={rainExposure} onChange={e => setRainExposure(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>DFW rain exposure</option>
              <option value='high'>High — long eave runs, large roof drainage area</option>
              <option value='medium'>Medium — typical DFW residential exposure</option>
              <option value='low'>Low — short eave, protected by trees or structure</option>
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>
            Get My Drip Edge Assessment
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', border: `1px solid ${result.urgencyColor}` }}>
            <h3 style={{ color: result.urgencyColor, marginBottom: '1rem' }}>{result.urgency}</h3>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <div><div style={{ color: '#9AAAB8', fontSize: '.85rem', marginBottom: '.25rem' }}>ASSESSMENT</div><div style={{ color: '#E8EDF5' }}>{result.assessment}</div></div>
              <div><div style={{ color: '#9AAAB8', fontSize: '.85rem', marginBottom: '.25rem' }}>REPAIR TYPE</div><div style={{ color: '#E8EDF5' }}>{result.repairType}</div></div>
              <div><div style={{ color: '#9AAAB8', fontSize: '.85rem', marginBottom: '.25rem' }}>ESTIMATED COST</div><strong style={{ color: '#F5E642' }}>{result.cost}</strong></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
