import { useState } from 'react';

export default function DFWRoofingDecking2026B() {
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState('');

  const conditions = [
    { id: 'soft_spots', label: 'Soft spots when walking roof' },
    { id: 'water_stains', label: 'Water stains in attic' },
    { id: 'hail_bruising', label: 'Hail bruising visible from attic' },
    { id: 'looks_ok', label: 'Deck looks OK from attic' },
  ];

  const decisions: Record<string, { verdict: string; color: string; steps: string[] }> = {
    soft_spots: {
      verdict: 'REPLACE — Do Not Skip', color: '#ef4444',
      steps: [
        '🔴 Soft spots = structural failure from moisture intrusion',
        '🔴 Cannot install new shingles over failing decking',
        '🔴 Cost: $2-3 per sq ft in DFW (typical 2,000 sq ft deck = $4K-6K)',
        '✅ Consider ZIP System upgrade — better moisture barrier than standard OSB',
        '✅ Confirm contractor breaks down deck replacement cost separately in bid',
      ],
    },
    water_stains: {
      verdict: 'INSPECT FURTHER — Likely Partial Replace', color: '#f97316',
      steps: [
        '🟡 Stains indicate prior or active leak — probe stained areas',
        '🟡 DFW hail events often create slow leaks that are not caught immediately',
        '🟡 Look for black discoloration (mold) vs. gray (old/dry stain)',
        '🟡 Replace any section that feels spongy or shows delamination',
        '✅ Partial deck replacement common in DFW — price per sheet (4x8 = $45-75 installed)',
      ],
    },
    hail_bruising: {
      verdict: 'REPLACE AFFECTED SECTIONS', color: '#f97316',
      steps: [
        '🟡 Hail bruising from attic = impact damage visible in OSB fiber pattern',
        '🟡 Bruised decking loses structural integrity over time under DFW heat',
        '🟡 Insurance adjuster should document this before tear-off',
        '✅ ZIP System upgrade worth considering after hail event',
        '✅ Request inspector photograph all damaged sections before new shingles go on',
      ],
    },
    looks_ok: {
      verdict: 'PROCEED — Monitor After Install', color: '#22c55e',
      steps: [
        '✅ No visible damage — standard reroof can proceed',
        '✅ Ask crew to flag any soft spots discovered during tear-off',
        '✅ Get pre-agreed per-sheet price for any incidental replacement',
        '✅ Typical DFW reroof: 10-20 sheets of incidental decking expected',
        '✅ ProLnk contractors document all deck conditions in post-install report',
      ],
    },
  };

  const handleCondition = (id: string) => { setCondition(id); setResult(id); };
  const current = decisions[result];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🏠 DFW Roof Deck Replacement Guide 2026 — Part 2</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>When to replace roof decking during a DFW reroof and how to price it correctly.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📐 DFW Deck Replacement Basics</div>
          {[
            { icon: '💰', fact: 'Standard replacement cost in DFW: $2-3 per sq ft installed (OSB or plywood).' },
            { icon: '🦺', fact: 'ZIP System boards run $3.50-5/sq ft but eliminate need for separate house wrap.' },
            { icon: '🌡️', fact: 'DFW heat cycles accelerate OSB delamination — boards installed before 2005 warrant extra scrutiny.' },
            { icon: '📋', fact: 'Always get per-sheet pricing in writing before reroof starts — avoids change order disputes.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
              <span>{item.icon}</span><span>{item.fact}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🎯 My Deck Condition</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            {conditions.map((s) => (
              <button key={s.id} onClick={() => handleCondition(s.id)} style={{ backgroundColor: condition === s.id ? '#F5E642' : '#1a2f50', color: condition === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: '8px', padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>{s.label}</button>
            ))}
          </div>
          {current && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: current.color, fontWeight: 700, marginBottom: '0.75rem' }}>{current.verdict}</div>
              {current.steps.map((step, i) => <div key={i} style={{ color: '#e2e8f0', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{step}</div>)}
              <div style={{ marginTop: '1rem', color: '#F5E642', fontSize: '0.85rem' }}>ProLnk-matched DFW roofers document all deck decisions before covering them up. 🛡️</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
