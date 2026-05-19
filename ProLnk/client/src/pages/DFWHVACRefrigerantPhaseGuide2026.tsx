import { useState } from 'react';

export default function DFWHVACRefrigerantPhaseGuide2026() {
  const [vintage, setVintage] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const vintageOptions = [
    { label: 'Pre-2010 (R-22 system)', value: 'pre2010′ },
    { label: '2010–2022 (R-410A system)', value: '2010_2022′ },
    { label: '2023–2024 (R-410A system, newer)', value: '2023_2024′ },
    { label: '2025+ (new system)', value: '2025plus' },
  ];

  const results: Record<string, string> = {
    pre2010: 'Your system uses R-22 (Freon), which was fully phased out in 2020. No new R-22 can be manufactured — only reclaimed stock is available and it is expensive ($50–100/lb). When your system needs a major refrigerant repair, replacement is almost always more cost-effective. Budget for a full system replacement.',
    '2010_2022': 'Your system uses R-410A (Puron). R-410A was phased out for NEW equipment in 2025 per EPA Section 608 rules. Your existing system can still be serviced with R-410A — supply exists. But when you replace, you will move to a next-gen refrigerant like R-32 or R-454B.',
    '2023_2024': 'Your system likely uses R-410A but may use R-32 or R-454B depending on manufacturer. Check the nameplate label on the outdoor unit. R-410A service is still available. R-32 and R-454B are A2L class — mildly flammable — requiring certified technicians with proper equipment.',
    '2025plus': 'Your system uses a next-gen refrigerant: R-32, R-454B (Carrier Puron Advance), or similar A2L refrigerant. These are mildly flammable (not dangerous in normal use, but require certified handling). Ensure any tech servicing your system has A2L certification — this is a code requirement in DFW.',
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>DFW Refrigerant Phase-Out Timeline</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>What DFW homeowners need to know about R-22, R-410A, R-32, and R-454B — and what it means for your system.</p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { emoji: '❌', label: 'R-22 (Freon)', detail: 'Phased out 2020 — no new production. Reclaimed stock only, very expensive.' },
            { emoji: '⚠️', label: 'R-410A (Puron)', detail: 'Phased out for NEW equipment Jan 2025. Existing systems can still be serviced.' },
            { emoji: '✅', label: 'R-32', detail: 'New standard refrigerant. Lower GWP. A2L class — requires certified tech.' },
            { emoji: '✅', label: 'R-454B (Puron Advance)', detail: "Carrier's primary replacement. A2L class — mildly flammable, certified handling required." },
          ].map((r) => (
            <div key={r.label} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24 }}>{r.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{r.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{r.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🔍 What refrigerant does my system use?</div>
          <select
            value={vintage}
            onChange={(e) => { setVintage(e.target.value); setResult(results[e.target.value] ?? null); }}
            style={{ width: '100%', padding: '12px 14px', backgroundColor: '#0A1628', color: '#E8EDF4', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14, marginBottom: 16 }}
          >
            <option value="">Select your system vintage...</option>
            {vintageOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642', color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1a1a2e', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>⚡ ProLnk Charter HVAC Pros</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>All Charter pros hold A2L certification for next-gen refrigerant handling — required for any 2025+ system work in DFW.</div>
        </div>
      </div>
    </div>
  );
}
