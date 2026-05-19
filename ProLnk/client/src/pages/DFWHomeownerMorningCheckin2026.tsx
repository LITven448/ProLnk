import { useState } from 'react';

export default function DFWHomeownerMorningCheckin2026() {
  const [homeType, setHomeType] = useState('');

  const guides: Record<string, { headline: string; actions: string[] }> = {
    single: {
      headline: '🏡 Single Family — Your DFW Morning Actions',
      actions: ['🌡️ AC tune-up window closing fast — June = emergency pricing. Book now.', '💧 Foundation watering: if no rain in 5+ days, run soaker hose 30 min around perimeter', '⛈️ Hail season peak: April–June. Check your roof and note any damage from recent storms.', '📋 ProLnk Charter approaching 500 — join before soft close to lock in founding homeowner benefits', '🔍 Run a Home Health Vault check on your HVAC age (over 12 years = replacement planning time)'],
    },
    condo: {
      headline: '🏢 Condo Owner — Your DFW Morning Actions',
      actions: ['🌡️ Confirm your HOA AC maintenance schedule — unit responsibility varies by association', '💧 Foundation is HOA-managed but watch for sloping floors or door sticking', '⛈️ Check your balcony and windows after any recent hail or wind event', '📋 ProLnk Charter is open to condo owners for interior service connections', '🔍 HVAC filter replacement: every 60 days in DFW summer — change now if overdue'],
    },
    rental: {
      headline: '🏘️ Rental Property — Your DFW Morning Actions',
      actions: ['🌡️ Tenant AC complaint season starts June 1. Service all units in May or face emergency call-out costs', '💧 Foundation soaking: remind tenants to run soaker hose if no recent rain', '⛈️ Post-storm roof inspection: your liability if damage is known and unreported', '📋 ProLnk pro network covers all your DFW trades from one platform', '🔍 Annual HVAC filter replacement audit due — schedule before tenant season peaks'],
    },
    new: {
      headline: '🆕 New DFW Homeowner — Your Morning Actions',
      actions: ['🌡️ Locate your HVAC model and check SEER2 rating — under 15 SEER2 = replacement within 5 years', '💧 Foundation moisture management is critical in DFW. Learn the soaker hose schedule now.', '⛈️ Review your homeowner insurance for hail/wind coverage before storm season peaks', '📋 ProLnk Charter founding member benefits include priority matching when platform launches', '🔍 Schedule a whole-home inspection within 12 months of purchase if not already done'],
    },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK MORNING BRIEF — MAY 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>☀️ DFW Homeowner Morning Check-In</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>ProLnk's daily briefing for DFW homeowners. May is the action window before summer emergency pricing kicks in.</p>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 28 }}>
          {[['🌡️ HVAC Tune-Up', 'May window closing'], ['💧 Foundation Watering', 'Daily if no rain 5 days'], ['⛈️ Hail Season', 'April–June peak risk'], ['📋 Charter Limit', '~450 of 500 slots filled']].map(([title, sub]) => (
            <div key={title} style={{ background: '#0f1f38', borderRadius: 10, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
              <div style={{ color: '#F5E642', fontSize: 12, marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0f1f38', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🏡 Get your personalized morning guide</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {[['single', '🏡 Single Family'], ['condo', '🏢 Condo'], ['rental', '🏘️ Rental Property'], ['new', '🆕 New Owner']].map(([v, l]) => (
              <button key={v} onClick={() => setHomeType(v)} style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid #1e3a5f', background: homeType === v ? '#F5E642′ : '#0A1628', color: homeType === v ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
          {homeType && guides[homeType] && (
            <div style={{ padding: 16, background: '#0A1628', borderRadius: 8, border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>{guides[homeType].headline}</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#cbd5e1', lineHeight: 2 }}>
                {guides[homeType].actions.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ marginTop: 32, textAlign: 'center', color: '#64748b', fontSize: 12 }}>ProLnk — your DFW home service network — prolnk.io</div>
      </div>
    </div>
  );
}
