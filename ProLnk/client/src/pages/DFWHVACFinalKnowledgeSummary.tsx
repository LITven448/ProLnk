import { useState } from 'react';

type HomeProfile = 'small_older' | 'medium_standard' | 'large_new' | 'large_pool_ev';

const profiles: Record<HomeProfile, { label: string; emoji: string; sqft: string; built: string }> = {
  small_older: { label: 'Small Older Home', emoji: '🏚️', sqft: '< 1,500 sq ft', built: 'Built pre-2000' },
  medium_standard: { label: 'Medium Standard', emoji: '🏠', sqft: '1,500–2,500 sq ft', built: 'Built 2000–2015' },
  large_new: { label: 'Large New Build', emoji: '🏡', sqft: '2,500–4,000 sq ft', built: 'Built 2015+' },
  large_pool_ev: { label: 'Large + Pool + EV', emoji: '🏰', sqft: '3,000+ sq ft', built: 'Any age' },
};

const summaries: Record<HomeProfile, { priority: string; sizing: string; maintenance: string; replacement: string; costs: string; tip: string }> = {
  small_older: {
    priority: '🔴 #1 Priority: Duct sealing and insulation. Older DFW homes lose 25–40% of cooled air to leaky ducts — fixing this before buying a new system is critical.',
    sizing: 'Likely 2–3 ton system. Older insulation means you may need more capacity than Manual J says — audit first.',
    maintenance: 'Monthly filter changes May–Oct. Annual coil cleaning critical — older units accumulate debris faster. Check refrigerant every 2 years.',
    replacement: 'System over 12 years old? Plan replacement within 2 years. R-22 systems cannot be recharged — immediate replacement if leaking.',
    costs: 'DFW summer bill typical: $180–$280/month. After duct sealing: reduce by $40–$80/month.',
    tip: '🏆 Your #1 move: Schedule a duct blaster test ($300–$500). Sealing ducts is the highest ROI action for older DFW homes.',
  },
  medium_standard: {
    priority: '🟡 #1 Priority: Smart thermostat + programmed schedule. Most medium DFW homes are already reasonably efficient — optimization beats replacement.',
    sizing: '3–4 ton system standard. Variable speed (2-stage) significantly outperforms single-stage in DFW humidity control.',
    maintenance: 'Filter monthly May–Oct. Annual professional tune-up. Check and clean condensate drain line — DFW humidity clogs it annually.',
    replacement: 'Replace at 15 years or when repair cost exceeds 50% of new system. Budget $8,000–$14,000 for quality 16+ SEER2 replacement.',
    costs: 'DFW summer bill typical: $200–$340/month. Smart thermostat alone saves $35–$60/month.',
    tip: '🏆 Your #1 move: Install a Honeywell T6 Pro or Ecobee thermostat ($150–$250). Pays back in under 6 months in DFW summers.',
  },
  large_new: {
    priority: '🟢 #1 Priority: Zoning and load scheduling. Your system is modern — maximize it with smart controls and off-peak scheduling.',
    sizing: '4–5 ton or dual-system standard. New DFW builds often over-sized for resale — verify with Manual J if you have comfort complaints.',
    maintenance: 'Filter every 30–45 days May–Oct (multiple air handlers may have multiple filters). Annual VRF/variable-speed calibration.',
    replacement: 'Modern system should last 18–22 years with proper maintenance. Next replacement: budget $14,000–$22,000+ for equivalent quality.',
    costs: 'DFW summer bill typical: $250–$450/month. Zoning + TOU rate can reduce by $60–$100/month.',
    tip: '🏆 Your #1 move: Sign up for Oncor TOU rate and schedule all large loads (pool, EV, laundry) outside 3–7 PM. Saves $50–$90/month.',
  },
  large_pool_ev: {
    priority: '🔴 #1 Priority: Load management and scheduling. You have 3 major electrical loads — AC, pool, and EV. Staggering them is the difference between $400 and $280 bills.',
    sizing: 'Likely 2 systems (4+ ton each). Ensure each system is independently zoned. Dual-fuel heat pump recommended if you have gas available.',
    maintenance: 'Two systems = double maintenance. Stagger annual tune-ups: one in March, one in September. Replace filters on both units monthly in summer.',
    replacement: 'Budget $20,000–$35,000 for full dual-system replacement. Plan 5–7 years ahead with HVAC replacement fund.',
    costs: 'DFW summer bill typical: $380–$600/month. With proper load scheduling: reduce by $80–$140/month.',
    tip: '🏆 Your #1 move: Install a whole-home energy monitor (Emporia Vue, $150) to see real-time load. Then build a charging/pool schedule that avoids AC peak overlap.',
  },
};

const keyFacts = [
  { fact: 'DFW sizing rule', detail: '400–500 sq ft per ton — but older homes may need more due to poor insulation' },
  { fact: 'SEER2 minimum 2023+', detail: '14.3 SEER2 South (was 14 SEER) — always buy 16+ for DFW ROI' },
  { fact: 'Oncor peak hours', detail: '3–7 PM weekdays — run nothing extra during this window' },
  { fact: 'Filter truth', detail: 'Monthly May–Oct is not optional in DFW — pollen + dust = coil damage' },
  { fact: 'Humidity target', detail: '45–55% RH indoors — dehumidify mode on hot days prevents mold' },
  { fact: 'Away temp limit', detail: 'Never above 82°F when away — above that, humidity damages walls and wood' },
  { fact: 'Refrigerant law 2025', detail: 'R-410A banned in new systems — R-454B replacements cost more to service' },
  { fact: 'Lifespan DFW', detail: '12–15 years average (shorter than national avg due to extreme runtime)' },
];

export default function DFWHVACFinalKnowledgeSummary() {
  const [profile, setProfile] = useState<HomeProfile>('medium_standard');
  const summary = summaries[profile];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', color: '#1E293B', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#0A1628', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>🏆 DFW HVAC Master Reference</div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px', color: '#0A1628' }}>Final Knowledge Summary</h1>
        <p style={{ color: '#64748B', marginBottom: '28px', fontSize: '15px' }}>Everything a DFW homeowner needs to know — organized by what matters most for your home.</p>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, marginBottom: '10px' }}>YOUR HOME PROFILE</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {(Object.keys(profiles) as HomeProfile[]).map(p => (
              <button key={p} onClick={() => setProfile(p)} style={{ padding: '14px', borderRadius: '12px', border: profile === p ? '2px solid #0A1628' : '2px solid #E2E8F0', cursor: 'pointer', backgroundColor: profile === p ? '#0A1628' : '#FFFFFF', textAlign: 'left' }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{profiles[p].emoji}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: profile === p ? '#F5E642' : '#1E293B', marginBottom: '2px' }}>{profiles[p].label}</div>
                <div style={{ fontSize: '11px', color: profile === p ? '#94A3B8' : '#64748B' }}>{profiles[p].sqft} · {profiles[p].built}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: '14px', padding: '20px', marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', color: '#F5E642', fontWeight: 700, marginBottom: '8px' }}>YOUR TOP PRIORITY</div>
          <div style={{ fontSize: '14px', color: '#E8EDF5', lineHeight: 1.7 }}>{summary.priority}</div>
        </div>

        {[
          { label: '📐 SIZING', value: summary.sizing },
          { label: '🔧 MAINTENANCE SCHEDULE', value: summary.maintenance },
          { label: '🔄 REPLACEMENT PLANNING', value: summary.replacement },
          { label: '💡 COST EXPECTATIONS', value: summary.costs },
        ].map((item, i) => (
          <div key={i} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', marginBottom: '10px' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, marginBottom: '6px' }}>{item.label}</div>
            <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>{item.value}</div>
          </div>
        ))}

        <div style={{ backgroundColor: '#F5E642', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0A1628' }}>{summary.tip}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0A1628', marginBottom: '14px' }}>📋 Key Facts Every DFW Homeowner Needs</div>
          {keyFacts.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: i < keyFacts.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <div style={{ minWidth: '140px', fontSize: '12px', fontWeight: 700, color: '#0A1628' }}>{item.fact}</div>
              <div style={{ fontSize: '13px', color: '#475569' }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
