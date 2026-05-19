import { useState } from 'react';

type HomeVintage = '1960s' | '1970s' | '1980s' | '1990s' | '2000s' | '2010s' | '2020s';

const vintages: { id: HomeVintage; label: string; icon: string }[] = [
  { id: '1960s', label: '1960s', icon: '🏚️' },
  { id: '1970s', label: '1970s', icon: '🏠' },
  { id: '1980s', label: '1980s', icon: '🏡' },
  { id: '1990s', label: '1990s', icon: '🏘️' },
  { id: '2000s', label: '2000s', icon: '🏗️' },
  { id: '2010s', label: '2010s', icon: '🏙️' },
  { id: '2020s', label: '2020s', icon: '🆕' },
];

type SummarySection = { icon: string; title: string; content: string };

const summaryByVintage: Record<HomeVintage, SummarySection[]> = {
  '1960s': [
    { icon: '📐', title: 'Sizing', content: 'Homes from this era were often built for window units — central HVAC was added later and may be dramatically oversized for today’s insulation levels. Manual J load calc is essential before replacement. Expect to downsize.' },
    { icon: '⚡', title: 'Efficiency', content: 'Attic insulation is likely R-11 or less. Duct leakage is high. Upgrade insulation before HVAC — the system size drops significantly and efficiency gains multiply. SEER2 16+ recommended.' },
    { icon: '🏭', title: 'Equipment', content: 'R-22 refrigerant systems very likely still present. Full replacement required — R-22 is no longer manufactured. Budget $10,000-$15,000 for system plus duct sealing.' },
    { icon: '📝', title: 'Warranty', content: 'Any existing warranty is long expired. Full documentation reset on new system: register within 60 days, keep all service records from day one.' },
    { icon: '🔧', title: 'Maintenance', content: 'Biannual tune-ups (April before summer, October before winter) are critical. Older ductwork in these homes accumulates debris and loses efficiency rapidly without cleaning.' },
    { icon: '📅', title: 'Replacement Timing', content: 'If HVAC is 15+ years old, plan replacement before the next summer. Do not wait for complete failure in July — emergency install in DFW summer costs $1,000-$2,000 more.' },
  ],
  '1970s': [
    { icon: '📐', title: 'Sizing', content: 'DFW homes built in the 1970s often have marginal insulation and original ductwork. Manual J calculation typically reveals the home needs 15-20% less tonnage than currently installed.' },
    { icon: '⚡', title: 'Efficiency', content: 'R-13 wall insulation was common. Attic may be R-19 or less. Duct sealing before or with replacement yields significant savings. SEER2 16+ is cost-effective with this home envelope.' },
    { icon: '🏭', title: 'Equipment', content: 'R-22 systems likely in homes with original or once-replaced HVAC. Any R-22 system over 10 years old should be budgeted for replacement — refrigerant costs $150-$200/lb.' },
    { icon: '📝', title: 'Warranty', content: 'Reset documentation with any new system. Warranty registration within 60 days is critical — many 1970s homes have had multiple contractors over the years with poor records.' },
    { icon: '🔧', title: 'Maintenance', content: 'Biannual maintenance. Pay attention to drain pan — older homes in DFW have had condensate issues. Install a secondary drain pan if not present.' },
    { icon: '📅', title: 'Replacement Timing', content: 'If system is 12+ years old, begin planning. Get quotes in spring or fall — not mid-summer when demand peaks and pricing rises.' },
  ],
  '1980s': [
    { icon: '📐', title: 'Sizing', content: 'Better insulation than 1960s-70s but still benefits from Manual J re-evaluation. Many 1980s DFW homes have been renovated with additions that changed the load profile significantly.' },
    { icon: '⚡', title: 'Efficiency', content: 'R-19 attic insulation typical. Duct sealing is still worthwhile — 1980s duct tape deteriorates and creates significant air loss. SEER2 14.3 minimum, 16+ recommended.' },
    { icon: '🏭', title: 'Equipment', content: 'R-22 possible if system has not been replaced since original. R-410A systems installed in the 1980s-90s are now at or past expected lifespan. Plan replacement proactively.' },
    { icon: '📝', title: 'Warranty', content: 'Keep thorough records on any system 5 years or younger. If system is over 10 years old, manufacturer warranty is likely expired — focus on home warranty coverage.' },
    { icon: '🔧', title: 'Maintenance', content: 'Check capacitors annually — 1980s-era electrical infrastructure in DFW homes can cause voltage irregularities that stress capacitors. Capacitor failure is the leading cause of summer no-cool calls.' },
    { icon: '📅', title: 'Replacement Timing', content: 'Systems from original construction (40+ years old) must be replaced immediately. Even 1990s-era systems in 1980s homes are 25+ years old and past useful life.' },
  ],
  '1990s': [
    { icon: '📐', title: 'Sizing', content: 'DFW construction in the 1990s followed better building codes. Manual J still recommended — many of these homes were oversized at original installation, causing humidity problems.' },
    { icon: '⚡', title: 'Efficiency', content: 'Better baseline insulation. Duct sealing still valuable. Moving from a 1990s-era SEER 10-12 system to SEER2 16+ cuts cooling costs by 30-40% in DFW conditions.' },
    { icon: '🏭', title: 'Equipment', content: 'R-410A systems common from mid-1990s onward. Systems installed in the late 1990s (25+ years old) are at or past useful life. Budget for replacement within 1-3 years.' },
    { icon: '📝', title: 'Warranty', content: 'Original manufacturer warranty expired. If replacement is recent (under 10 years), verify registration status on manufacturer website using serial number.' },
    { icon: '🔧', title: 'Maintenance', content: 'Biannual tune-ups. Check refrigerant charge — 25-year-old systems with small leaks have lost charge over time, reducing efficiency and stressing the compressor.' },
    { icon: '📅', title: 'Replacement Timing', content: 'Any system from the 1990s still in service should be evaluated for replacement. The efficiency gains alone justify replacement even if the system is technically running.' },
  ],
  '2000s': [
    { icon: '📐', title: 'Sizing', content: 'Better code compliance in 2000s DFW construction. Manual J was more commonly used. Re-evaluation recommended if major renovations have occurred since original build.' },
    { icon: '⚡', title: 'Efficiency', content: 'SEER 13-14 systems were common in 2000s DFW construction. Upgrading to SEER2 16+ still yields 20-30% savings given DFW cooling hours. Duct sealing still worthwhile.' },
    { icon: '🏭', title: 'Equipment', content: 'R-410A standard in 2000s homes. Systems installed early in the decade are 20+ years old. R-410A phase-down has begun — parts availability will tighten on older R-410A equipment.' },
    { icon: '📝', title: 'Warranty', content: 'Systems under 10 years old may still have parts warranty coverage. Check manufacturer website with serial number. Verify registration was completed.' },
    { icon: '🔧', title: 'Maintenance', content: 'Biannual maintenance. Focus on coil cleaning — 20-year coils in DFW attics accumulate dust and lose heat transfer efficiency significantly without periodic cleaning.' },
    { icon: '📅', title: 'Replacement Timing', content: 'Early 2000s systems (20+ years old) should be replaced. Mid-to-late 2000s systems are approaching the 15-year mark — start planning and budgeting.' },
  ],
  '2010s': [
    { icon: '📐', title: 'Sizing', content: 'Strong building codes in 2010s DFW construction. Manual J was required for permits. If system is original, sizing is likely appropriate. Re-evaluate only if major additions occurred.' },
    { icon: '⚡', title: 'Efficiency', content: 'SEER 14-16 systems common in 2010s. Current systems still performing well in most cases. Upgrading to inverter SEER2 18+ is cost-effective if replacing for other reasons.' },
    { icon: '🏭', title: 'Equipment', content: 'R-410A standard. Early 2010s systems approaching 12-15 years — watch for compressor efficiency decline. Late 2010s systems have 5-10 years of useful life remaining.' },
    { icon: '📝', title: 'Warranty', content: 'Check warranty registration status now. Many 2010s homeowners never registered — late registration may be possible with proof of install. Protects remaining coverage years.' },
    { icon: '🔧', title: 'Maintenance', content: 'Biannual maintenance. DFW spring allergens clog coils — annual coil cleaning is cost-effective. Inspect duct connections in attic, as heat cycling causes joint loosening over time.' },
    { icon: '📅', title: 'Replacement Timing', content: 'No urgency for most 2010s systems. Plan budget for replacement in 5-10 years. Watch for rising repair costs (over $1,500/yr) as signal to replace rather than repair.' },
  ],
  '2020s': [
    { icon: '📐', title: 'Sizing', content: 'Modern energy codes require Manual J for all new DFW construction. Your system is properly sized for your home as-built. Any additions should be evaluated for load impact.' },
    { icon: '⚡', title: 'Efficiency', content: 'SEER2 14.3+ required by federal law since 2023. New DFW homes often have SEER2 16-20 systems. You are in the optimal efficiency window — focus on maintenance to preserve performance.' },
    { icon: '🏭', title: 'Equipment', content: 'R-410A systems installed before 2025, R-32 or R-454B in newer systems. All equipment under 5 years old — well within useful life. No replacement consideration needed.' },
    { icon: '📝', title: 'Warranty', content: 'Critical: verify your system was registered within 60 days of installation. Check manufacturer website with serial number. Extended parts warranty requires registration. Labor warranty active.' },
    { icon: '🔧', title: 'Maintenance', content: 'First professional tune-up recommended at 2-3 years. Keep all service records from day one. Spring DFW pollen is the main maintenance driver — check filters monthly April-June.' },
    { icon: '📅', title: 'Replacement Timing', content: 'No replacement needed. Focus entirely on maintenance, warranty protection, and record-keeping. Plan first major tune-up around year 3.' },
  ],
};

export default function DFWHVACFinalSummary() {
  const [vintage, setVintage] = useState<HomeVintage | null>(null);
  const summary = vintage ? summaryByVintage[vintage] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Complete DFW HVAC Knowledge Summary</h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Everything a DFW homeowner needs to know about HVAC — sizing, efficiency, brands, warranty, maintenance, and replacement timing — customized for your home's era.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '📐', title: 'Manual J Required', desc: 'Never accept a replacement quote without a load calculation.' },
            { icon: '⭐', title: 'SEER2 14.3+ Minimum', desc: 'Federal law. Most DFW homeowners benefit from 16+ given cooling hours.' },
            { icon: '📝', title: 'Register in 60 Days', desc: 'Register your system with the manufacturer within 60 days of install.' },
            { icon: '🔧', title: 'Biannual Maintenance', desc: 'Spring (April) + Fall (October) tune-ups are the DFW standard.' },
            { icon: '🏛️', title: 'Always Pull Permits', desc: 'Unpermitted work voids insurance and creates sale complications.' },
            { icon: '📋', title: 'Keep All Records', desc: 'Installation, EPA service, maintenance, warranty, and permit records.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0f2240', border: '1px solid #1e3a5f', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#F5E642', marginBottom: '0.25rem' }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.4 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>Get your personalized DFW HVAC summary — when was your home built?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
          {vintages.map(v => (
            <button key={v.id} onClick={() => setVintage(v.id === vintage ? null : v.id)}
              style={{ background: vintage === v.id ? '#F5E642' : '#0f2240', color: vintage === v.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: vintage === v.id ? '#F5E642' : '#1e3a5f', borderRadius: 8, padding: '0.65rem 1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
              {v.icon} {v.label}
            </button>
          ))}
        </div>

        {summary && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {summary.map(s => (
              <div key={s.title} style={{ background: '#0f2240', border: '1px solid #1e3a5f', borderRadius: 10, padding: '1.25rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1rem', alignItems: 'start' }}>
                <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.35rem', fontSize: '0.9rem' }}>{s.title}</div>
                  <p style={{ color: '#e2e8f0', lineHeight: 1.6, margin: 0, fontSize: '0.9rem' }}>{s.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0f2240', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '0.75rem' }}>🏠 Ready to Take Action? ProLnk Connects You.</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            ProLnk matches DFW homeowners with HVAC contractors who are TACL-licensed, EPA 608 certified, permit-pulling, and rated by your neighbors. Get 3 quotes and compare — for free, with no obligation.
          </p>
        </div>
      </div>
    </div>
  );
}