import { useState } from 'react';

export default function DFWRoofingGutterSystem2026() {
  const [homeSituation, setHomeSituation] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const situationOptions = [
    { label: 'Standard DFW home, no large trees', value: 'standard' },
    { label: 'Home with heavy oak or pecan tree canopy', value: 'heavy_trees' },
    { label: 'Long roof run (60ft+ on one side)', value: 'long_run' },
    { label: 'Basement or finished lower level', value: 'basement' },
    { label: 'Recently had foundation work done', value: 'foundation' },
  ];

  const results: Record<string, string> = {
    standard: 'STANDARD SYSTEM: 5-inch K-style gutters are fine for most DFW homes. One downspout per 35-40 linear feet. Minimum 6-foot extensions routing away from foundation. Clean twice a year: after November oak drop and after March-April pollen season.',
    heavy_trees: 'UPGRADED SYSTEM NEEDED: With heavy oak or pecan canopy, debris load is extreme. Upgrade to 6-inch K-style gutters for higher capacity. Add micro-mesh gutter guards (not foam inserts — DFW pollen clogs them). Still clean annually even with guards. Consider downspout screens to prevent clogs at outlets.',
    long_run: 'LONG RUN STRATEGY: For runs over 60 feet, you need a midpoint downspout or the gutter will overflow in DFW heavy rain events (2-4 inch/hour rates). One downspout at each end is NOT enough for long runs. Add a center drop or use 6-inch gutters with oversized 3x4 downspouts.',
    basement: 'CRITICAL DRAINAGE: With finished lower levels, downspout routing is critical. 6-foot minimum extensions are a baseline — consider buried underground extensions routing 10+ feet from foundation, or connecting to a French drain system. Even one overflow event can cause costly water intrusion.',
    foundation: 'POST-REPAIR PRIORITY: After foundation work, gutter system performance is critical to maintaining the repair. Ensure all downspouts have proper 6-foot+ extensions. Any pooling within 10 feet of foundation will re-introduce moisture differential and accelerate soil movement. Consider a buried drainage system.',
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>DFW Roofing Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>DFW Complete Gutter System Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>Getting gutters right for DFW — size, downspout count, extensions, guards, and cleaning frequency for North Texas conditions.</p>

        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {[
            { emoji: '📏', label: 'Gutter Size', detail: '5-inch K-style is standard. 6-inch for heavy tree coverage or long runs over 60 ft.' },
            { emoji: '🔽', label: 'Downspout Count', detail: 'One downspout per 40 linear feet minimum. DFW 2-4 inch/hour rains require more capacity.' },
            { emoji: '↔️', label: 'Extensions', detail: '6-foot minimum from foundation. Post-foundation work: consider buried 10+ foot extensions.' },
            { emoji: '🍂', label: 'Cleaning Schedule', detail: 'After November oak drop plus after March-April pollen. Twice yearly minimum in DFW.' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{item.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{item.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🏠 Get your gutter system recommendation</div>
          <select
            value={homeSituation}
            onChange={(e) => { setHomeSituation(e.target.value); setResult(results[e.target.value] ?? null); }}
            style={{ width: '100%', padding: '12px 14px', backgroundColor: '#0A1628', color: '#E8EDF4', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14, marginBottom: 16 }}
          >
            <option value="">Select your home situation...</option>
            {situationOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642', color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#F5E642′ }}>⚠️ A note on gutter guards in DFW</div>
          <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>Results are mixed in DFW. Micro-mesh guards work reasonably well for leaf debris but DFW spring pollen creates a biofilm that can clog even fine mesh. Foam inserts fill with debris in one season. If you use guards, budget for at least one annual cleaning regardless.</div>
        </div>

        <div style={{ backgroundColor: '#1a1a2e', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🔧 ProLnk Charter Roofers</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>Charter pros provide written gutter assessments with every roofing inspection — no upsell pressure, just accurate documentation for your records.</div>
        </div>
      </div>
    </div>
  );
}
