import { useState } from 'react';

export default function DFWProMorningCheckin2026() {
  const [trade, setTrade] = useState('');

  const guides: Record<string, { headline: string; actions: string[] }> = {
    hvac: {
      headline: '🌡️ HVAC Pro — Your DFW Morning Brief',
      actions: ['📅 Peak season starts June 1. You have ~2 weeks to book your recurring clients before emergency call-out demand explodes', '💰 Charter tier income: every pro you recruit now earns you 7% of their job income — forever', '📲 ProLnk platform matches you to pre-qualified DFW homeowners — no cold calls', '⭐ Charter tier limit approaching 500 — each recruit you add now locks in their network position under yours', '🔧 Pre-season AC tune-up is your highest-margin service — push now before demand peaks'],
    },
    roofing: {
      headline: '🏠 Roofing Pro — Your DFW Morning Brief',
      actions: ['⛈️ Hail season peak: April–June. Storm-chasing leads incoming — be ready to move fast', '💰 Class 4 impact-resistant upsells = 30–50% higher ticket. Lead with the insurance discount angle', '📲 ProLnk matches storm-affected DFW homeowners with verified roofing pros — join now', '⭐ Charter tier approaching limit — each recruit under you earns you long-term network income', '🔧 Supplement training for insurance claims = your competitive edge this season'],
    },
    plumbing: {
      headline: '🔧 Plumbing Pro — Your DFW Morning Brief',
      actions: ['💧 May = water heater season (end-of-year replacements planned by homeowners before summer)', '💰 Tankless upsell: position as summer-ready, energy-efficient, never runs cold during peak demand', '📲 ProLnk leads are pre-qualified homeowners — no tire-kickers, no low-ball requests', '⭐ Recruit 2 plumbers this week to fill your Charter network slot capacity', '🔧 Foundation moisture damage often means plumbing re-route work — DFW opportunity'],
    },
    electrical: {
      headline: '⚡ Electrical Pro — Your DFW Morning Brief',
      actions: ['🌡️ AC load upgrades: new HVAC systems often require panel upgrades — coordinate with HVAC pros', '💰 EV charger installs are growing 40% YoY in DFW — price as premium service', '📲 ProLnk connects you to homeowners planning major projects — not just service calls', '⭐ Charter limit approaching 500 — your network income compounds the earlier you join', '🔧 Smart home integration (thermostats, panels, lighting) = highest-margin residential category'],
    },
    foundation: {
      headline: '🏗️ Foundation Pro — Your DFW Morning Brief',
      actions: ['💧 Dry May + no rain = foundation movement season. Homeowner anxiety = lead volume', '💰 Engineer report upsell: offer to coordinate the structural engineer report — add $300–500 to ticket', '📲 ProLnk pre-qualifies foundation leads — homeowners already know they have a problem', '⭐ Recruit 2 foundation specialists this week before Charter closes', '🔧 Drainage system add-ons convert single-repair jobs into $12,000+ full remediation projects'],
    },
  };

  const trades = [['hvac', '🌡️ HVAC'], ['roofing', '🏠 Roofing'], ['plumbing', '🔧 Plumbing'], ['electrical', '⚡ Electrical'], ['foundation', '🏗️ Foundation']];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK PRO MORNING BRIEF — MAY 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>🌅 DFW Service Pro Morning Check-In</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Your ProLnk daily brief. May is the highest-opportunity month before summer demand overwhelms supply in every DFW trade.</p>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 28 }}>
          {[['🌡️ Peak Season', 'June 1 — 3 weeks away'], ['💰 Charter Income', '7% of every recruit job'], ['📋 Charter Slots', '~450 of 500 filled'], ['📲 New Leads', 'DFW homeowners waiting']].map(([title, sub]) => (
            <div key={title} style={{ background: '#0f1f38', borderRadius: 10, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
              <div style={{ color: '#F5E642', fontSize: 12, marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0f1f38', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔧 Get your trade-specific morning brief</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {trades.map(([v, l]) => (
              <button key={v} onClick={() => setTrade(v)} style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid #1e3a5f', background: trade === v ? '#F5E642′ : '#0A1628', color: trade === v ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
          {trade && guides[trade] && (
            <div style={{ padding: 16, background: '#0A1628', borderRadius: 8, border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>{guides[trade].headline}</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#cbd5e1', lineHeight: 2 }}>
                {guides[trade].actions.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ marginTop: 32, textAlign: 'center', color: '#64748b', fontSize: 12 }}>ProLnk — the DFW home service professional network — prolnk.io</div>
      </div>
    </div>
  );
}
