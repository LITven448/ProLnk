import { useState } from 'react';

const ALL_MISTAKES = [
  { id: 'overpricing', label: 'Overpricing the home', icon: '💸', severity: 'critical', detail: 'The #1 DFW listing killer. Buyers and agents pull comps instantly. An overpriced home sits, stigmatizes, and ultimately sells for less than a well-priced listing would have on day one.', fix: 'Price within 1–2% of the most recent comparable closed sales in your ZIP code. Use Zillow, Redfin, and a local CMA to anchor your price.' },
  { id: 'bad-photos', label: 'Bad listing photos', icon: '📸', severity: 'critical', detail: 'Over 95% of DFW buyers begin their search online. Dark, low-resolution, or portrait-mode phone photos immediately signal an unprofessional listing — buyers skip without clicking.', fix: 'Hire a real estate photographer ($150–300). Twilight exterior shots and wide-angle interior shots with proper lighting increase click-through rates 2–3x.' },
  { id: 'august-listing', label: 'Listing in August (DFW)', icon: '☀️', severity: 'high', detail: "August is the worst month to list in DFW. Triple-digit heat keeps buyers inside, families are in back-to-school mode, and showings drop 35–40% vs. spring peak. Homes listed in August average 15+ more days on market.", fix: 'If possible, wait for September (second wind) or plan a March–May launch for peak demand. If you must list in August, price aggressively and use high-quality marketing to compensate.' },
  { id: 'foundation', label: 'Not addressing foundation issues', icon: '🏗️', severity: 'critical', detail: 'DFW clay soil causes foundation movement in nearly every home. If you know about cracks, sticking doors, or previous repairs, disclosing them proactively is legally required and strategically smart. Buyers who discover them during inspection will demand 2–3x the repair cost in credits.', fix: 'Get a foundation inspection before listing ($300–500). If issues exist, get repair quotes and disclose everything. A repaired and warrantied foundation is a selling point — not a liability.' },
  { id: 'clutter', label: 'Clutter in listing photos and showings', icon: '📦', severity: 'high', detail: 'Buyers cannot visualize themselves in a cluttered home. Personal photos, excess furniture, and countertop clutter make rooms look smaller and distract from the home\’s features.', fix: 'Spend 1–2 weekends decluttering before photos are taken. Rent a storage unit if needed. Remove 30–40% of furniture from each room. Buyers buy space, not stuff.' },
  { id: 'utilities', label: 'Turning off utilities before closing', icon: '💡', severity: 'medium', detail: 'Some sellers turn off electricity or water to save money before closing. This prevents inspectors from testing appliances, HVAC, and plumbing — and can kill deals or delay closing by 1–2 weeks.', fix: 'Keep all utilities on through closing day. The $100–200 in savings is not worth risking your sale. Include a utility credit in your closing cost if you need the offset.' },
  { id: 'disclosure', label: 'Incomplete seller disclosure', icon: '📋', severity: 'critical', detail: "Texas law requires a comprehensive Seller's Disclosure Notice. Omitting known issues (past flooding, foundation repairs, roof leaks, HVAC problems, HOA violations) creates legal liability that can follow you years after closing.", fix: 'Complete the TREC Seller\’s Disclosure Notice fully and honestly. When in doubt, disclose. A disclosed issue is a negotiating point — an undisclosed issue is a lawsuit.' },
  { id: 'hoa', label: 'Ignoring HOA requirements before listing', icon: '🏘️', severity: 'medium', detail: 'Many DFW neighborhoods (especially in Frisco, Allen, Prosper, Southlake) have strict HOA rules. Violations — visible at the time of listing — can delay closings and require last-minute repairs that kill deals.', fix: 'Request an HOA estoppel letter before listing. Fix visible violations (paint, landscaping, fencing) before your first showing. Know your transfer fee amount — buyers often ask sellers to cover it.' },
];

export default function DFWListingMistakesGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [shown, setShown] = useState(false);

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const filtered = shown
    ? ALL_MISTAKES.filter(m => selected.length === 0 || selected.includes(m.id))
    : [];

  const sevColor = (s: string) => s === 'critical' ? '#eb5757′ : s === ’high' ? '#f2994a' : '#f2c94c';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", color: '#e8e8e8′ }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: '#F5E642', fontWeight: 600 }}>DFW Seller Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 12px', lineHeight: 1.2, color: '#fff' }}>
          ⚠️ Common DFW Listing Mistakes
        </h1>
        <p style={{ fontSize: 17, color: '#aaa', marginBottom: 40, lineHeight: 1.7 }}>
          These mistakes cost DFW sellers thousands — and sometimes the entire deal. Most are preventable with the right preparation. Select the situations that apply to you for personalized guidance.
        </p>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '32px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 20px', color: '#F5E642′ }}>Select situations that apply to you:</h2>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {ALL_MISTAKES.map(m => (
              <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '12px 16px', background: selected.includes(m.id) ? 'rgba(245,230,66,0.1)' : 'rgba(255,255,255,0.03)', borderRadius: 10, border: `1.5px solid ${selected.includes(m.id) ? '#F5E642' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.15s' }}>
                <input
                  type="checkbox"
                  checked={selected.includes(m.id)}
                  onChange={() => toggle(m.id)}
                  style={{ accentColor: '#F5E642', width: 16, height: 16 }}
                />
                <span style={{ fontSize: 20 }}>{m.icon}</span>
                <span style={{ fontSize: 15, color: '#fff' }}>{m.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: sevColor(m.severity), textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.severity}</span>
              </label>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => { setShown(true); }}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
            >
              {selected.length === 0 ? 'Show All Mistakes' : `Show ${selected.length} Risk${selected.length !== 1 ? 's' : ''} + How to Fix`} →
            </button>
            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                style={{ background: 'transparent', color: '#aaa', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '12px 20px', fontSize: 15, cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {shown && (
          <div style={{ display: 'grid', gap: 20 }}>
            {(selected.length === 0 ? ALL_MISTAKES : ALL_MISTAKES.filter(m => selected.includes(m.id))).map(m => (
              <div key={m.id} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '24px 28px', border: `1px solid ${sevColor(m.severity)}33` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{m.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 17, color: '#fff' }}>{m.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: sevColor(m.severity), textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.severity} risk</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#aaa', lineHeight: 1.7, margin: '0 0 14px' }}>{m.detail}</p>
                <div style={{ padding: '12px 16px', background: 'rgba(245,230,66,0.08)', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>HOW TO AVOID</div>
                  <div style={{ fontSize: 14, color: '#ccc', lineHeight: 1.6 }}>{m.fix}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
