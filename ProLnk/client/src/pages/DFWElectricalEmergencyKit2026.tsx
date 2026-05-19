import { useState } from 'react';

const EMERGENCIES = [
  { id: 'outage', label: '⚡ Power Outage' },
  { id: 'tripping', label: '🔁 Breaker Tripping' },
  { id: 'dead-outlet', label: '🔌 Dead Outlet' },
  { id: 'sparks', label: '🔥 Sparks / Smell' },
];

const KITS: Record<string, { title: string; items: string[] }> = {
  'outage': {
    title: 'Power Outage Kit Items',
    items: [
      '🔍 Non-contact voltage tester ($20) — safely check if power is live at panel',
      '🧪 GFCI tester ($15) — verify if issue is GFCI trip vs. breaker vs. utility',
      '📱 Oncor outage map bookmarked — DFW storms cause widespread Oncor outages',
      '🔦 Flashlight + batteries — stored near electrical panel location',
      '📋 Label your breaker panel now — know which breaker serves which room',
      '📱 ProLnk TDLR electrician contact — saved under "Emergency Electrician"',
    ],
  },
  'tripping': {
    title: 'Breaker Tripping Kit Items',
    items: [
      '🔍 Non-contact voltage tester — check for voltage before resetting',
      '⚡ Spare circuit breakers — must match your panel brand (Square D, Eaton, etc.)',
      '🧪 GFCI tester — many DFW GFCI trips look like breaker trips',
      '📋 Know your panel brand before buying spare breakers — mixing brands is a fire risk',
      '📱 TDLR license lookup: tdlr.texas.gov — verify any electrician before hiring',
      '⚠️ Breaker that trips repeatedly needs an electrician — do not keep resetting',
    ],
  },
  'dead-outlet': {
    title: 'Dead Outlet Kit Items',
    items: [
      '🧪 GFCI tester ($15) — most DFW dead outlets are tripped GFCI in another room',
      '🔌 Spare GFCI outlet — 2026 code: all bathroom, kitchen, garage, outdoor outlets',
      '🔍 Non-contact voltage tester — check outlet before assuming it is dead',
      '🔧 Flathead + Phillips screwdriver — for outlet cover removal and swap',
      '📋 Know GFCI reset locations: check bathroom, garage, kitchen, outside',
      '📱 If GFCI reset did not fix it: ProLnk TDLR electrician for diagnosis',
    ],
  },
  'sparks': {
    title: 'Sparks / Burning Smell Kit — Immediate Action',
    items: [
      '🚨 Turn off main breaker immediately — do not investigate first',
      '📱 Call 911 if burning smell is active — DFW fire code: electrical fire risk',
      '📱 ProLnk TDLR electrician after fire department clears — do not restore power alone',
      '🔍 Non-contact tester — only use after fire department confirms it is safe',
      '⚠️ TDLR license required for repair — sparks mean code violation or damage',
      '📋 Document outlet/switch location for electrician before calling',
    ],
  },
};

export default function DFWElectricalEmergencyKit2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          PROLNK DFW RESOURCE GUIDE 2026
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          ⚡ DFW Electrical Emergency Kit Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          The tools, testers, and contacts every DFW homeowner should have before an electrical emergency — plus when to call a TDLR-licensed electrician immediately.
        </p>

        <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
            What type of electrical emergency?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {EMERGENCIES.map(e => (
              <button
                key={e.id}
                onClick={() => setSelected(e.id)}
                style={{
                  background: selected === e.id ? '#F5E642' : '#1e3a5f',
                  color: selected === e.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: '8px', padding: '0.75rem',
                  fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
                }}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '1rem' }}>{KITS[selected].title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {KITS[selected].items.map((item, i) => (
                <li key={i} style={{ padding: '0.75rem', borderBottom: '1px solid #1e3a5f', lineHeight: 1.5, color: '#cbd5e1' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, marginBottom: '0.25rem' }}>Find a TDLR-Licensed DFW Electrician</div>
          <div style={{ color: '#1e3a5f', fontSize: '0.9rem' }}>ProLnk verifies every electrician license before matching — no unlicensed referrals</div>
        </div>
      </div>
    </div>
  );
}
