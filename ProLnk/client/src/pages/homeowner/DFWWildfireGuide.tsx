import { useState } from 'react';

type RiskLevel = 'minimal' | 'moderate' | 'elevated';

const zipRiskMap: Record<string, RiskLevel> = {
  '76082': 'elevated',
  '76087': 'elevated',
  '76048': 'elevated',
  '76049': 'elevated',
  '75009': 'moderate',
  '75078': 'moderate',
  '75009': 'moderate',
  '76227': 'moderate',
  '75007': 'minimal',
  '75024': 'minimal',
  '75025': 'minimal',
  '75034': 'minimal',
  '75035': 'minimal',
  '75013': 'minimal',
  '75252': 'minimal',
  '75001': 'minimal',
};

const riskConfig: Record<RiskLevel, { label: string; color: string; bg: string; border: string; actions: string[] }> = {
  minimal: {
    label: 'Minimal Wildfire Risk',
    color: '#10b981',
    bg: '#0d2f1a',
    border: '#166534',
    actions: [
      'Focus on smoke preparedness — west Texas smoke events affect all DFW ZIP codes.',
      'Stock N95 masks and keep HVAC filters MERV-13 or higher.',
      'Ensure motion security lighting is functional (urban fire risk from drought still applies).',
      'Review your homeowners insurance for wildfire exclusions — becoming more common in Texas.',
    ],
  },
  moderate: {
    label: 'Moderate Wildfire Risk',
    color: '#f59e0b',
    bg: '#2d1f00',
    border: '#92400e',
    actions: [
      'Create Zone 0: no combustible materials within 5 feet of your home. Replace mulch with gravel.',
      'Maintain Zone 1: irrigated lawn, low-fuel plants, branches pruned to 6ft off ground.',
      'Stock smoke preparedness supplies and have N95 masks readily available.',
      'Get a defensible space inspection from your local fire department.',
      'Review wildfire exclusions in your homeowners policy — consider separate wildfire rider.',
    ],
  },
  elevated: {
    label: 'Elevated Wildfire Risk',
    color: '#ef4444',
    bg: '#2d1515',
    border: '#991b1b',
    actions: [
      'Zone 0 (0–5 ft): Non-combustible materials only. Gravel, concrete, stone. No wood mulch touching foundation.',
      'Zone 1 (5–30 ft): Irrigated lawn, fire-resistant plants, no ladder fuels. Prune dead material aggressively.',
      'Zone 2 (30–100 ft): Thin and space all vegetation. Remove all dead plant material.',
      'Install ember-resistant vents (ASTM E2886 rated) — embers are the #1 home ignition source.',
      'Hardscape roof and gutters — metal roofing, ember-guard gutter covers.',
      'Have a written evacuation plan with two routes out of your neighborhood.',
      'Contact your insurer immediately — some companies are non-renewing in elevated-risk Texas areas.',
    ],
  },
};

export default function DFWWildfireGuide() {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<RiskLevel | null>(null);
  const [notFound, setNotFound] = useState(false);

  const checkRisk = () => {
    const trimmed = zip.trim();
    if (zipRiskMap[trimmed]) {
      setResult(zipRiskMap[trimmed]);
      setNotFound(false);
    } else if (trimmed.length === 5) {
      setResult('minimal');
      setNotFound(true);
    }
  };

  const config = result ? riskConfig[result] : null;

  return (
    <div style={{ background: '#0a0a0a', color: '#e5e7eb', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#6b7280′ }}>
          🔥 ProLnk Homeowner Resource — DFW Edition
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 700, color: '#f9fafb', lineHeight: 1.2, marginBottom: 16 }}>
          DFW Wildfire Preparedness Guide
        </h1>
        <p style={{ fontSize: 18, color: '#9ca3af', marginBottom: 48 }}>
          West Texas Smoke, Interface Risk, and What Every DFW Homeowner Should Know
        </p>

        {/* Risk Types */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f3f4f6', marginBottom: 24 }}>
            🌬️ Is DFW at Wildfire Risk? Yes — 3 Types
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                num: '1',
                icon: '💨',
                title: 'Smoke Transport (Affects ALL DFW)',
                detail: 'Wildfire smoke from west Texas and New Mexico regularly drifts into DFW, causing AQI readings of 100–200+. This is not a fire risk — but it is a real health risk. Anyone with asthma, COPD, or heart conditions should have a preparedness plan.',
                color: '#f59e0b',
              },
              {
                num: '2',
                icon: '🔥',
                title: 'Interface Risk (Outer Suburbs)',
                detail: 'Areas adjacent to brush and cedar — Granbury area, Cedar Hill State Park surroundings, Celina outskirts — face direct wildfire risk when conditions align. High winds + drought + low humidity = dangerous days.',
                color: '#ef4444',
              },
              {
                num: '3',
                icon: '🏘️',
                title: 'Urban Fire Risk (Any DFW Suburb)',
                detail: 'Drought-stressed dead vegetation combined with strong north Texas winds (25–50+ mph common) creates fire risk in any DFW neighborhood. Fence fires, utility sparks, and burning debris can spread quickly in dry conditions.',
                color: '#f97316',
              },
            ].map(risk => (
              <div key={risk.num} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, padding: 24, display: 'flex', gap: 16 }}>
                <div style={{ background: '#1f2937', borderRadius: 8, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: risk.color, fontWeight: 800, fontSize: 18 }}>
                  {risk.num}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#f3f4f6', marginBottom: 8, fontSize: 16 }}>
                    {risk.icon} {risk.title}
                  </div>
                  <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{risk.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Home Hardening Zones */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f3f4f6', marginBottom: 24 }}>
            🏠 Home Hardening — Defensible Space Zones
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { zone: 'Zone 0', distance: '0–5 feet from home', color: '#ef4444', items: ['Non-combustible materials only', 'Gravel, concrete, stone, brick', 'NO mulch touching foundation', 'Clean roof gutters of debris'] },
              { zone: 'Zone 1', distance: '5–30 feet', color: '#f59e0b', items: ['Low-fuel, fire-resistant plants', 'Irrigated lawn where possible', 'No ladder fuels (branches 6ft+ off ground)', 'Remove dead plant material regularly'] },
              { zone: 'Zone 2', distance: '30–100 feet', color: '#10b981', items: ['Thin and space all vegetation', 'Remove all dead and dying material', 'Keep grass mowed short in summer', 'Limb up trees to reduce fuel continuity'] },
            ].map(zone => (
              <div key={zone.zone} style={{ background: '#111827', border: `1px solid ${zone.color}40`, borderRadius: 12, padding: 20 }}>
                <div style={{ color: zone.color, fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{zone.zone}</div>
                <div style={{ color: '#9ca3af', fontSize: 12, marginBottom: 16 }}>{zone.distance}</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#d1d5db', lineHeight: 2, fontSize: 13 }}>
                  {zone.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Smoke Prep */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f3f4f6', marginBottom: 24 }}>
            😷 Smoke Preparedness (Most Relevant for DFW)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '😷', title: 'N95 Masks', detail: 'For any outdoor activity during smoke events. Standard surgical masks do NOT filter smoke particles.' },
              { icon: '🌬️', title: 'HEPA Air Purifier', detail: 'HEPA + activated carbon filter. Run on high during smoke events. One unit per main living area.' },
              { icon: '🏠', title: 'MERV-13 HVAC Filter', detail: 'Upgrade your HVAC filter to MERV-13 or higher. Significantly reduces indoor smoke particle penetration.' },
              { icon: '🪟', title: 'Seal and Recirculate', detail: 'Close all windows and doors. Set HVAC to recirculation mode (not fresh air intake) during smoke events.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#f3f4f6', marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: '#2d1515', border: '1px solid #991b1b', borderRadius: 10, padding: 16 }}>
            <span style={{ color: '#fca5a5', fontWeight: 700 }}>⚠️ Insurance Note: </span>
            <span style={{ color: '#d1d5db', fontSize: 14 }}>Wildfire exclusions are becoming more common in Texas homeowner policies. Review your policy annually and consider a separate wildfire endorsement if you're in a higher-risk area.</span>
          </div>
        </section>

        {/* Risk Checker */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f3f4f6', marginBottom: 8 }}>
            🗺️ DFW Wildfire Risk Checker
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: 24, fontSize: 15 }}>
            Enter your ZIP code for a risk category and recommended actions.
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <input
              type="text"
              value={zip}
              onChange={e => setZip(e.target.value)}
              placeholder="Enter ZIP code (e.g. 75034)"
              maxLength={5}
              style={{ flex: 1, minWidth: 200, background: '#111827', border: '1px solid #374151', borderRadius: 8, padding: '12px 16px', color: '#f3f4f6', fontSize: 15, outline: 'none' }}
            />
            <button
              onClick={checkRisk}
              style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}
            >
              Check Risk
            </button>
          </div>
          {config && (
            <div style={{ background: config.bg, border: `1px solid ${config.border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 800, color: config.color, fontSize: 18, marginBottom: 4 }}>
                {notFound ? '⚠️ ZIP Not Found — Defaulting to: ' : '📍 Your Risk Category: '}{config.label}
              </div>
              {notFound && <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 16 }}>This ZIP was not in our database. Most core DFW urban ZIPs are minimal risk. Contact your local fire department for a site-specific assessment.</div>}
              <div style={{ fontWeight: 700, color: '#f3f4f6', marginBottom: 12, marginTop: 12 }}>Recommended Actions:</div>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, color: '#d1d5db', fontSize: 14 }}>
                {config.actions.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          )}
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e1b4b)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🛡️</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f9fafb', marginBottom: 12 }}>
            Is Your Home Prepared?
          </h3>
          <p style={{ color: '#9ca3af', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
            ProLnk connects you with licensed fire mitigation and home hardening professionals in DFW.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Find a Pro Near Me
          </a>
        </div>
      </div>
    </div>
  );
}
