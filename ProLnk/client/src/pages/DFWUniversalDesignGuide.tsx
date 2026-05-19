import { useState } from 'react';

const homeAges = ['Built after 2010', 'Built 1990–2010', 'Built 1970–1990', 'Built before 1970'];
const budgets = ['Under $5,000', '$5,000–$15,000', '$15,000–$40,000', '$40,000+'];

type UpgradeItem = { upgrade: string; cost: string; roiBoost: string; difficulty: 'Low' | 'Medium' | 'High'; desc: string };
type BudgetMap = Record<string, UpgradeItem[]>;
type AgeMap = Record<string, BudgetMap>;

const upgradeMap: AgeMap = {
  'Built after 2010': {
    'Under $5,000': [
      { upgrade: 'Lever door handles throughout', cost: '$200–600', roiBoost: '+$500–1,500', difficulty: 'Low', desc: 'Replace round knobs with levers on all interior doors. Easy DIY or 1-day pro job.' },
      { upgrade: 'Rocker light switches', cost: '$150–400', roiBoost: '+$300–800', difficulty: 'Low', desc: 'Replace toggle switches with wide rocker switches — easier for limited hand mobility.' },
      { upgrade: 'Motion-sensor exterior lighting', cost: '$300–800', roiBoost: '+$500–1,000', difficulty: 'Low', desc: 'Enhances safety and accessibility for all ages, improves curb appeal.' },
      { upgrade: 'Non-slip entry threshold', cost: '$200–500', roiBoost: '+$300–700', difficulty: 'Low', desc: 'Zero-step or minimal-step entry treatment at main door.' },
    ],
    '$5,000–$15,000': [
      { upgrade: 'Lever door handles + rocker switches', cost: '$400–1,000', roiBoost: '+$1,000–2,000', difficulty: 'Low', desc: 'Complete the hardware swap throughout the house.' },
      { upgrade: 'Walk-in shower addition or conversion', cost: '$3,000–8,000', roiBoost: '+$5,000–12,000', difficulty: 'High', desc: 'Walk-in shower is one of top 5 features buyers want — universal appeal.' },
      { upgrade: 'Smart home basics (thermostat, locks, lighting)', cost: '$800–2,500', roiBoost: '+$2,000–4,000', difficulty: 'Low', desc: 'Voice-activated and app-controlled features command premiums in DFW.' },
      { upgrade: 'Comfort-height toilets', cost: '$400–900', roiBoost: '+$500–1,500', difficulty: 'Low', desc: 'Standard on new builds — if missing, high ROI upgrade.' },
    ],
    '$15,000–$40,000': [
      { upgrade: 'Curbless shower suite', cost: '$5,000–12,000', roiBoost: '+$10,000–20,000', difficulty: 'High', desc: 'Premium master bath renovation with zero-threshold shower.' },
      { upgrade: 'Smart home full integration', cost: '$3,000–8,000', roiBoost: '+$5,000–12,000', difficulty: 'Medium', desc: 'Full lighting, HVAC, security, and voice control integration.' },
      { upgrade: 'First-floor flex room (office→bedroom)', cost: '$2,000–5,000', roiBoost: '+$8,000–15,000', difficulty: 'Medium', desc: 'Closet + egress window addition converts office to legal bedroom.' },
      { upgrade: 'Wide hallways + doorway upgrade', cost: '$3,000–8,000', roiBoost: '+$4,000–10,000', difficulty: 'High', desc: '36" doorways and 42" hallways support aging in place and wheelchair access.' },
    ],
    '$40,000+': [
      { upgrade: 'Full ADA-ready master suite', cost: '$15,000–35,000', roiBoost: '+$20,000–45,000', difficulty: 'High', desc: 'Roll-in shower, grab bars, wide doorways, and smart home integration.' },
      { upgrade: 'Accessible kitchen renovation', cost: '$10,000–25,000', roiBoost: '+$12,000–30,000', difficulty: 'High', desc: 'Pull-out shelves, varying counter heights, touchless faucets, knee clearance.' },
      { upgrade: 'Zero-step entry regrade/ramp', cost: '$5,000–15,000', roiBoost: '+$5,000–12,000', difficulty: 'High', desc: 'Grading or permanent ramp at all entries — top universal design feature.' },
      { upgrade: 'Open floor plan conversion', cost: '$15,000–40,000', roiBoost: '+$20,000–50,000', difficulty: 'High', desc: 'Remove non-load-bearing walls for wider circulation paths — huge resale value in DFW.' },
    ],
  },
  'Built 1990–2010': {
    'Under $5,000': [
      { upgrade: 'Lever handles + rocker switches', cost: '$400–1,000', roiBoost: '+$1,000–2,500', difficulty: 'Low', desc: 'Hardware dating from this era is often toggle and round-knob — quick upgrade.' },
      { upgrade: 'Non-slip flooring treatment (bathrooms)', cost: '$200–600', roiBoost: '+$500–1,200', difficulty: 'Low', desc: 'Anti-slip treatment on tile and smooth flooring surfaces.' },
      { upgrade: 'Grab bars (bathroom)', cost: '$300–800', roiBoost: '+$500–1,500', difficulty: 'Low', desc: 'High-ROI safety addition — required for aging-in-place appeal.' },
      { upgrade: 'Comfort-height toilet', cost: '$300–700', roiBoost: '+$500–1,000', difficulty: 'Low', desc: 'Easy swap, immediate aging-in-place benefit.' },
    ],
    '$5,000–$15,000': [
      { upgrade: 'Walk-in shower conversion', cost: '$3,000–8,000', roiBoost: '+$6,000–14,000', difficulty: 'High', desc: 'Homes from this era often have garden tubs — converting to walk-in shower has strong ROI.' },
      { upgrade: 'Smart home upgrade', cost: '$1,500–4,000', roiBoost: '+$3,000–7,000', difficulty: 'Medium', desc: 'Retrofit smart home with lighting, thermostat, security.' },
      { upgrade: 'First-floor bedroom addition', cost: '$3,000–8,000', roiBoost: '+$5,000–12,000', difficulty: 'High', desc: 'Convert flex room or office with closet and proper egress.' },
      { upgrade: 'Wider doorway (master suite)', cost: '$800–2,000', roiBoost: '+$1,500–3,000', difficulty: 'Medium', desc: 'Widen to 36" — improves accessibility and perceived spaciousness.' },
    ],
    '$15,000–$40,000': [
      { upgrade: 'Master bath full renovation (UD)', cost: '$8,000–20,000', roiBoost: '+$12,000–25,000', difficulty: 'High', desc: 'Zero-threshold shower, grab bars, comfort toilet, wide doorway — full universal design.' },
      { upgrade: 'Smart home full integration', cost: '$4,000–10,000', roiBoost: '+$6,000–15,000', difficulty: 'Medium', desc: 'Full voice + app control — major DFW buyer demand.' },
      { upgrade: 'Main floor accessibility overhaul', cost: '$5,000–12,000', roiBoost: '+$8,000–18,000', difficulty: 'High', desc: 'Wide doors, lever handles, non-slip floors, lighting upgrade.' },
    ],
    '$40,000+': [
      { upgrade: 'Full universal design renovation', cost: '$25,000–60,000', roiBoost: '+$35,000–80,000', difficulty: 'High', desc: 'Comprehensive update — open floor plan, ADA bath, kitchen UD, zero-step entry, smart home.' },
      { upgrade: 'Zero-step entry + covered accessible entry', cost: '$8,000–20,000', roiBoost: '+$8,000–15,000', difficulty: 'High', desc: 'Grade-level entry with covered walkway — premium curb appeal + full accessibility.' },
    ],
  },
  'Built 1970–1990': {
    'Under $5,000': [
      { upgrade: 'Lever handles + rocker switches', cost: '$500–1,200', roiBoost: '+$1,000–2,500', difficulty: 'Low', desc: 'Older hardware throughout — full replacement adds polish and accessibility.' },
      { upgrade: 'Grab bars (full bathroom set)', cost: '$500–1,000', roiBoost: '+$700–1,800', difficulty: 'Low', desc: 'Homes from this era rarely have grab bars — high safety and sale value addition.' },
      { upgrade: 'Non-slip flooring (bathrooms + kitchen)', cost: '$400–1,200', roiBoost: '+$800–2,000', difficulty: 'Low', desc: 'Older smooth tile is a slip hazard — treatment or replacement.' },
    ],
    '$5,000–$15,000': [
      { upgrade: 'Walk-in shower conversion', cost: '$3,500–9,000', roiBoost: '+$7,000–16,000', difficulty: 'High', desc: 'Most homes from this era have tub-only bathrooms — high ROI conversion.' },
      { upgrade: 'Widen key doorways (2–3 doors)', cost: '$1,500–4,000', roiBoost: '+$2,000–5,000', difficulty: 'High', desc: 'Older homes have 28–30" doors — widening to 36" is significant structural upgrade.' },
      { upgrade: 'HVAC smart thermostat + zoning', cost: '$1,000–3,500', roiBoost: '+$2,000–5,000', difficulty: 'Medium', desc: 'Older HVAC systems benefit most from smart control — DFW energy savings.' },
    ],
    '$15,000–$40,000': [
      { upgrade: 'Master bath full UD renovation', cost: '$10,000–25,000', roiBoost: '+$15,000–30,000', difficulty: 'High', desc: 'Full accessible bath — often requires plumbing relocation in homes from this era.' },
      { upgrade: 'Main floor accessibility + open plan', cost: '$8,000–20,000', roiBoost: '+$12,000–25,000', difficulty: 'High', desc: 'Structural wall removal + wide doors + lever handles + smart lighting.' },
    ],
    '$40,000+': [
      { upgrade: 'Comprehensive UD whole-home renovation', cost: '$40,000–100,000', roiBoost: '+$50,000–120,000', difficulty: 'High', desc: 'Full aging-in-place renovation — electric, plumbing, structure, finishes. Transforms older home.' },
      { upgrade: 'Zero-step addition + first-floor suite', cost: '$20,000–45,000', roiBoost: '+$25,000–55,000', difficulty: 'High', desc: 'Major structural addition — creates fully accessible ground-floor living suite.' },
    ],
  },
  'Built before 1970': {
    'Under $5,000': [
      { upgrade: 'Lever handles + rocker switches', cost: '$500–1,200', roiBoost: '+$800–2,000', difficulty: 'Low', desc: 'Quick wins — hardware dating from this era needs full replacement.' },
      { upgrade: 'Grab bars + non-slip flooring', cost: '$600–1,500', roiBoost: '+$1,000–2,500', difficulty: 'Low', desc: 'Safety essentials in pre-1970 homes — no blocking behind walls, so blocking must be added.' },
    ],
    '$5,000–$15,000': [
      { upgrade: 'Bathroom blocking + grab bar installation', cost: '$2,000–5,000', roiBoost: '+$3,000–7,000', difficulty: 'High', desc: 'Pre-1970 walls lack blocking — contractor must open wall, add blocking, then install.' },
      { upgrade: 'Walk-in shower conversion', cost: '$4,000–10,000', roiBoost: '+$7,000–15,000', difficulty: 'High', desc: 'Pre-1970 plumbing may require full replacement — budget accordingly.' },
      { upgrade: 'Electrical upgrade for smart home', cost: '$2,000–5,000', roiBoost: '+$2,000–5,000', difficulty: 'High', desc: 'Pre-1970 homes may need panel upgrade before smart home devices can be added.' },
    ],
    '$15,000–$40,000': [
      { upgrade: 'Full bathroom accessible renovation', cost: '$12,000–28,000', roiBoost: '+$15,000–35,000', difficulty: 'High', desc: 'Plumbing, blocking, tile, fixtures — comprehensive pre-1970 bath renovation.' },
      { upgrade: 'Main floor accessibility overhaul', cost: '$8,000–20,000', roiBoost: '+$12,000–25,000', difficulty: 'High', desc: 'Structural doorway widening, flooring, lighting, hardware — complete UD package.' },
    ],
    '$40,000+': [
      { upgrade: 'Full UD renovation + systems upgrade', cost: '$50,000–150,000', roiBoost: '+$60,000–160,000', difficulty: 'High', desc: 'Electrical, plumbing, structural, and finish renovation. Transforms pre-1970 home into modern accessible home.' },
      { upgrade: 'First-floor accessible addition', cost: '$40,000–100,000', roiBoost: '+$40,000–90,000', difficulty: 'High', desc: 'New addition with modern construction standards — ADA-compliant, energy-efficient, accessible.' },
    ],
  },
};

const diffColors: Record<string, string> = { Low: '#22c55e', Medium: '#f97316', High: '#ef4444' };

export default function DFWUniversalDesignGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [budget, setBudget] = useState('');

  const upgrades = homeAge && budget ? upgradeMap[homeAge]?.[budget] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14 }}>🏗️ ProLnk DFW Universal Design Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Universal Design for DFW Homes</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8, lineHeight: 1.6 }}>
          Universal design makes your home accessible for all ages and abilities — and significantly increases resale value in the DFW market.
        </p>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '10px 16px', marginBottom: 32, display: 'inline-block', fontWeight: 700, fontSize: 14 }}>
          DFW Trend: Universal design features add 5–12% to home resale value
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>♾️ Core Universal Design Principles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '🚪', t: 'Zero-Step Entry', d: 'No threshold between outside and inside — wheelchair, stroller, and grocery cart accessible' },
              { icon: '🛋️', t: 'Open Floor Plans', d: 'Wide circulation paths (42"+ hallways) for walkers, wheelchairs, and aging mobility' },
              { icon: '🔧', t: 'Lever Handles', d: 'All doors — lever handles instead of knobs, operable with closed fist or elbow' },
              { icon: '💡', t: 'Rocker Switches', d: 'Wide rocker light switches — operable without fine motor control' },
              { icon: '🚿', t: 'Curbless Showers', d: 'Zero-threshold entry — universally safer and preferred by all ages' },
              { icon: '📐', t: '36" Doorways', d: 'Minimum for wheelchair access — also feels more spacious to all buyers' },
            ].map((p) => (
              <div key={p.t} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{p.t}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📈 DFW Resale Value Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { feature: 'Walk-in Shower', boost: '+$8,000–20,000', note: 'Top 5 DFW buyer request' },
              { feature: 'First-Floor Master', boost: '+$10,000–25,000', note: 'Critical for aging buyers' },
              { feature: 'Open Floor Plan', boost: '+$15,000–40,000', note: 'DFW market premium' },
              { feature: 'Smart Home Features', boost: '+$5,000–15,000', note: 'Growing DFW demand' },
              { feature: 'Wide Doorways', boost: '+$3,000–8,000', note: 'Increasingly standard' },
              { feature: 'Zero-Step Entry', boost: '+$4,000–10,000', note: 'Rare — commands premium' },
            ].map((v) => (
              <div key={v.feature} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{v.feature}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{v.boost}</div>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>{v.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🎯 Upgrades Prioritized by ROI</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Home Age</label>
              <select value={homeAge} onChange={(e) => setHomeAge(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select home age...</option>
                {homeAges.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Budget</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select budget...</option>
                {budgets.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {upgrades && (
            <div>
              {upgrades.map((u, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontWeight: 700 }}>{u.upgrade}</span>
                    </div>
                    <span style={{ background: diffColors[u.difficulty], color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{u.difficulty} difficulty</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ color: '#94a3b8', fontSize: 13 }}>Cost: <strong style={{ color: '#fff' }}>{u.cost}</strong></span>
                    <span style={{ color: '#94a3b8', fontSize: 13 }}>Resale boost: <strong style={{ color: '#F5E642' }}>{u.roiBoost}</strong></span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{u.desc}</div>
                </div>
              ))}
              <button style={{ marginTop: 8, width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                Get Free Quote from a DFW Universal Design Contractor →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
