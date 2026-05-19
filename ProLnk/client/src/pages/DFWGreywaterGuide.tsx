import { useState } from 'react';

const feasibility: Record<string, Record<string, { feasible: string; system: string; cost: string; savings: string; notes: string }>> = {
  low: {
    never: { feasible: '🟢 High Value', system: 'Laundry-to-landscape system: direct washer drain to outdoor irrigation via 3/4" polyethylene tubing. No permit required in Texas for simple laundry greywater systems.', cost: '$50–$300 DIY or $200–$800 installed', savings: 'Save 20–30 gallons per laundry load. For 8 loads/week: ~10,000 gallons/year.', notes: 'Texas allows laundry greywater for subsurface drip or mulch basin irrigation without permit. Must stay 100 ft from water well.' },
    occasional: { feasible: '🟢 Excellent ROI', system: 'Laundry-to-landscape + optional sink greywater with branched drain system. Gravity-fed to mulch basins in landscape beds.', cost: '$300–$1,200 for branched drain system', savings: '15,000–25,000 gallons/yr saved. At DFW Tier 2 rates ($5–$8/1000 gal): $75–$200/yr.', notes: 'During occasional DFW restrictions, greywater irrigation stays permitted when outdoor hose use is banned.' },
    frequent: { feasible: '🟡 Essential During Restrictions', system: 'Full laundry + shower greywater system with surge tank and timer-controlled drip emitters.', cost: '$1,500–$4,000 for full system with surge tank', savings: '30,000–50,000 gallons/yr. At restricted-period pricing: $150–$400/yr savings.', notes: 'North Texas Water District frequent restrictions make greywater critical for landscape survival. System pays back in 5–8 years.' },
  },
  medium: {
    never: { feasible: '🟢 Good Investment', system: 'Laundry-to-landscape: simplest entry point. Extend washer drain line to valve box in landscape.', cost: '$100–$500', savings: '8,000–12,000 gallons/yr depending on household size.', notes: 'Medium water users benefit most from laundry greywater as it is the cleanest and easiest greywater to reuse safely.' },
    occasional: { feasible: '🟢 Strong Case', system: 'Laundry greywater + bathroom sink branched drain to mulch basins. Timer-controlled to match plant water needs.', cost: '$500–$2,000', savings: '15,000–20,000 gallons/yr. Roughly $60–$160/yr savings at current DFW rates.', notes: 'Medium users with occasionally restricted properties: this system keeps landscaping alive without restriction penalties.' },
    frequent: { feasible: '🟡 High Priority', system: 'Comprehensive greywater system: laundry + sinks + shower to surge tank + drip irrigation. Automated valve control.', cost: '$2,000–$5,000 installed', savings: '25,000–40,000 gallons/yr. Payback 6–10 years at current rates; faster if rates increase.', notes: 'Frequent Stage 2/3 restrictions in many DFW cities mean outdoor irrigation ban. Greywater is specifically exempted.' },
  },
  high: {
    never: { feasible: '🟡 Lower Priority', system: 'Simple laundry-to-landscape. High water users may benefit less per dollar invested compared to efficiency upgrades.', cost: '$150–$600', savings: '6,000–10,000 gallons/yr — lower % of total use.', notes: 'High water users: consider fixing leaks and switching to WaterSense fixtures before greywater investment.' },
    occasional: { feasible: '🟡 Moderate Value', system: 'Laundry greywater system. Consider pairing with landscape efficiency audit to maximize water budget.', cost: '$300–$1,000', savings: '10,000–15,000 gallons/yr. Higher overall water bill means lower % savings from greywater alone.', notes: 'High-use households often have irrigation leaks or inefficient heads — fix these first for faster ROI.' },
    frequent: { feasible: '🟢 Essential', system: 'Full greywater system critical for high-use households in frequent-restriction areas. Laundry + shower + sinks.', cost: '$2,500–$6,000', savings: '35,000–55,000 gallons/yr. High absolute savings even as % varies.', notes: 'Frequent restrictions + high base use: greywater can offset irrigation ban impact entirely. Priority investment.' },
  },
};

export default function DFWGreywaterGuide() {
  const [waterUse, setWaterUse] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const result = waterUse && restrictions ? feasibility[waterUse]?.[restrictions] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🏡 DFW HOME SYSTEMS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Greywater Reuse Guide — DFW</h1>
        <p style={{ color: '#A0AABB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Texas allows laundry greywater reuse for outdoor irrigation — no permit required for simple systems. With DFW facing increasing water restrictions, greywater systems keep your landscape alive when hose use is banned.
        </p>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💧 What is Greywater?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { emoji: '✅', label: 'IS Greywater', desc: 'Laundry (washing machine), bathroom sinks, showers, bathtubs. Relatively clean wastewater.' },
              { emoji: '❌', label: 'NOT Greywater', desc: 'Toilet waste (blackwater), kitchen sink (food debris + grease), diaper wash water. These require sewer.' },
              { emoji: '⚠️', label: 'Texas Requirements', desc: 'Must apply to soil — not spray or run off. Keep 2 ft from property line. 100 ft from drinking water wells.' },
              { emoji: '🌱', label: 'Best Uses in DFW', desc: 'Established trees and shrubs. Not vegetable gardens. Drip to mulch basins is safest and most efficient.' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.emoji}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#A0AABB', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Feasibility Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>Household Water Use</label>
              <select value={waterUse} onChange={e => setWaterUse(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select usage level...</option>
                <option value="low">💧 Low (under 4,000 gal/mo)</option>
                <option value="medium">💧💧 Medium (4,000–8,000 gal/mo)</option>
                <option value="high">💧💧💧 High (over 8,000 gal/mo)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Restriction History</label>
              <select value={restrictions} onChange={e => setRestrictions(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select frequency...</option>
                <option value="never">🟢 Rarely / Never Restricted</option>
                <option value="occasional">🟡 Occasional (Stage 1–2 some summers)</option>
                <option value="frequent">🔴 Frequent (Stage 2–3 most summers)</option>
              </select>
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800, marginBottom: 16 }}>{result.feasible}</div>
              {[
                { label: 'RECOMMENDED SYSTEM', val: result.system },
                { label: 'ESTIMATED COST', val: result.cost },
                { label: 'WATER SAVINGS', val: result.savings },
                { label: 'DFW CONTEXT', val: result.notes },
              ].map(row => (
                <div key={row.label} style={{ marginBottom: 14 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{row.label}</div>
                  <div style={{ color: '#A0AABB', fontSize: 14, lineHeight: 1.5 }}>{row.val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
