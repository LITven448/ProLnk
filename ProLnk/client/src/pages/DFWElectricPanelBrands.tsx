import { useState } from 'react';

type SafetyLevel = 'danger' | 'caution' | 'safe';

interface PanelBrand {
  brand: string;
  aliases: string;
  safety: SafetyLevel;
  era: string;
  identify: string;
  issue: string;
  dfwRisk: string;
  action: string;
  urgency: string;
}

const brands: PanelBrand[] = [
  {
    brand: 'Federal Pacific Electric (Stab-Lok)',
    aliases: 'FPE, Stab-Lok, Federal Pacific',
    safety: 'danger',
    era: '1950s–1980s',
    identify: 'Look for "Federal Pacific Electric" or "Stab-Lok" on the panel door. Breakers are narrow with a distinctive red stripe. Common in DFW homes built 1955–1983.',
    issue: 'Stab-Lok breakers have a documented failure to trip under overload conditions. A breaker that won\’t trip allows wiring to overheat and ignite. Studies estimate 2,800 fires per year nationally attributed to FPE panels.',
    dfwRisk: 'DFW\’s extreme summer heat accelerates the degradation of the Stab-Lok bimetallic trip mechanism. A panel that barely passes in mild climates may be significantly more dangerous at 105°F ambient garage temperatures common in DFW July–August.',
    action: 'Replace the entire panel — not just the breakers. Stab-Lok replacement breakers have not been proven to solve the tripping failure. Full replacement with a Square D QO or Eaton BR panel is the only reliable fix.',
    urgency: '🔴 Urgent — schedule replacement within 90 days',
  },
  {
    brand: 'Zinsco / Sylvania / GTE-Sylvania',
    aliases: 'Zinsco, Sylvania, GTE-Sylvania, Magnetrip',
    safety: 'danger',
    era: '1950s–1970s',
    identify: 'Look for "Zinsco," "Sylvania," or "GTE-Sylvania" on the panel label. Breakers are colorful (red, blue, green handles) and clip into aluminum bus bars. Found in DFW homes built 1950–1975.',
    issue: 'Zinsco breakers can weld themselves to the aluminum bus bar, making them impossible to turn off manually — a severe hazard. The breakers also fail to trip, similar to FPE. Aluminum bus bars corrode and make poor contact over time.',
    dfwRisk: 'DFW\’s humidity combined with aluminum oxidation accelerates bus bar corrosion. Corrosion at the bus bar connection increases resistance, generating heat at the connection point — a hidden fire risk inside the panel.',
    action: 'Full panel replacement required. No code-compliant replacement breakers exist for Zinsco panels. Replace with Square D QO, Eaton BR, or Siemens Q. Any licensed DFW electrician can perform this work with a permit.',
    urgency: '🔴 Urgent — schedule replacement within 90 days',
  },
  {
    brand: 'Pushmatic / ITE-Pushmatic',
    aliases: 'Pushmatic, Bulldog, ITE',
    safety: 'caution',
    era: '1950s–1980s',
    identify: 'No toggle switches — breakers reset by pushing a button. "Pushmatic" or "Bulldog" labeled. Unusual appearance compared to modern panels.',
    issue: 'Pushmatics are old and replacement breakers are hard to find. They do not have a clear ON/OFF visual indicator, making it harder to verify circuit status. They are not inherently as dangerous as FPE or Zinsco, but their age and obsolescence is a concern.',
    dfwRisk: 'Age alone is a risk factor in DFW — 40–60 year old panels have worn components. Breaker testing is difficult. Parts availability for repairs is extremely limited.',
    action: 'Plan for replacement at next major renovation or within 5 years. Not an emergency, but do not expand circuits or add loads to this panel. Have a DFW electrician inspect for loose connections and proper grounding.',
    urgency: '🟡 Non-urgent — plan replacement within 5 years',
  },
  {
    brand: 'Square D QO / Homeline',
    aliases: 'Square D, Schneider Electric',
    safety: 'safe',
    era: '1955–Present',
    identify: '"Square D" name on panel; QO breakers have a visible green indicator window when properly set. Homeline is the builder-grade version. Both are very common in DFW new construction.',
    issue: 'No known systemic safety issues. QO is one of the most-tested, most-widely used residential panels in the US.',
    dfwRisk: 'Performs reliably in DFW heat. QO breakers are rated for high ambient temperatures and trip reliably.',
    action: 'No action needed. Standard maintenance: have a licensed DFW electrician inspect for loose connections every 10–15 years, especially after DFW hailstorms that may affect service entrance conductors.',
    urgency: '✅ Safe — standard maintenance schedule',
  },
  {
    brand: 'Eaton BR / CH',
    aliases: 'Eaton, Cutler-Hammer, CH, BR',
    safety: 'safe',
    era: '1960s–Present',
    identify: '"Eaton," "Cutler-Hammer," or "CH/BR" on the panel. Very common in DFW homes built after 1990.',
    issue: 'No known systemic safety issues. Eaton BR and CH are reliable, code-compliant panels widely used in DFW residential construction.',
    dfwRisk: 'Performs reliably in DFW conditions.',
    action: 'No action needed. Inspect service entrance conductors and main breaker connections periodically.',
    urgency: '✅ Safe — standard maintenance schedule',
  },
  {
    brand: 'Siemens / Murray',
    aliases: 'Siemens, Murray, Gould',
    safety: 'safe',
    era: '1970s–Present',
    identify: '"Siemens" or "Murray" on the panel label. Common in DFW homes built 1980–2010.',
    issue: 'No known systemic safety issues.',
    dfwRisk: 'Performs reliably in DFW conditions.',
    action: 'No action needed. Standard maintenance applies.',
    urgency: '✅ Safe — standard maintenance schedule',
  },
];

const safetyConfig: Record<SafetyLevel, { color: string; bg: string; label: string }> = {
  danger: { color: '#EF4444', bg: '#1a0a0a', label: '🔴 KNOWN HAZARD' },
  caution: { color: '#F59E0B', bg: '#1a150a', label: '🟡 USE CAUTION' },
  safe: { color: '#22C55E', bg: '#0a1a0a', label: '✅ SAFE PANEL' },
};

export default function DFWElectricPanelBrands() {
  const [selected, setSelected] = useState('');
  const [filter, setFilter] = useState<SafetyLevel | 'all'>('all');

  const panel = brands.find(b => b.brand === selected);
  const filtered = filter === 'all' ? brands : brands.filter(b => b.safety === filter);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>⚡ DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Electrical Panel Brand Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          Two panel brands — Federal Pacific Stab-Lok and Zinsco — are responsible for DFW house fires every year.
          Find your panel brand and get an honest safety assessment.
        </p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {(['all', 'danger', 'caution', 'safe'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                background: filter === f ? '#F5E642' : '#0F1F3D', color: filter === f ? '#0A1628' : '#94A3B8' }}>
              {f === 'all' ? 'All Panels' : f === 'danger' ? '🔴 Hazardous' : f === 'caution' ? '🟡 Caution' : '✅ Safe'}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {filtered.map(b => {
            const cfg = safetyConfig[b.safety];
            return (
              <button key={b.brand} onClick={() => setSelected(selected === b.brand ? '' : b.brand)}
                style={{ textAlign: 'left', padding: '14px 18px', background: selected === b.brand ? cfg.bg : '#0F1F3D', border: `1px solid ${selected === b.brand ? cfg.color : '#2D3F5E'}`, borderRadius: 10, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#E8F0FE', fontWeight: 700, fontSize: 15 }}>{b.brand}</div>
                  <div style={{ color: '#64748B', fontSize: 12, marginTop: 2 }}>Also known as: {b.aliases} · Era: {b.era}</div>
                </div>
                <span style={{ color: cfg.color, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 12 }}>{cfg.label}</span>
              </button>
            );
          })}
        </div>

        {panel && (
          <div style={{ background: safetyConfig[panel.safety].bg, borderRadius: 12, padding: 24, border: `1px solid ${safetyConfig[panel.safety].color}`, marginBottom: 24 }}>
            <div style={{ color: safetyConfig[panel.safety].color, fontWeight: 800, fontSize: 18, marginBottom: 20 }}>{safetyConfig[panel.safety].label} — {panel.brand}</div>
            {[
              ['🔍 How to Identify', panel.identify],
              ['⚠️ Known Issue', panel.issue],
              ['🏙️ DFW-Specific Risk', panel.dfwRisk],
              ['✅ Recommended Action', panel.action],
            ].map(([label, val]) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{label}</div>
                <p style={{ color: '#CBD5E1', lineHeight: 1.6, margin: 0, fontSize: 14 }}>{val}</p>
              </div>
            ))}
            <div style={{ background: '#162035', borderRadius: 8, padding: '12px 16px', borderLeft: `3px solid ${safetyConfig[panel.safety].color}` }}>
              <span style={{ fontWeight: 700, color: safetyConfig[panel.safety].color }}>{panel.urgency}</span>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', marginBottom: 12 }}>Need a licensed DFW electrician to inspect or replace your panel?</p>
          <a href="/get-quote" style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Get a Free DFW Panel Replacement Quote</a>
        </div>
      </div>
    </div>
  );
}
