import { useState } from 'react';

const resources = [
  {
    category: 'Before You Buy',
    icon: '🔍',
    pages: [
      { title: 'DFW HVAC Sizing Guide', desc: 'Manual J sizing for DFW climate — 100°F design temp, CDD/HDD, latent load' },
      { title: 'DFW System Types Compared', desc: 'Heat pump vs. central AC vs. dual-fuel — which wins in DFW and why' },
      { title: 'DFW HVAC Cost Guide', desc: 'Real DFW install costs: 2-ton through 5-ton, single-stage through variable-speed' },
      { title: 'DFW HVAC Contractor Checklist', desc: 'How to vet a DFW HVAC contractor — license, permit, Manual J, commissioning' },
      { title: 'DFW Install Quality Guide', desc: 'What a proper DFW installation looks like — and the red flags to reject' },
    ],
  },
  {
    category: 'Climate & Data',
    icon: '🌡️',
    pages: [
      { title: 'DFW Climate Data Guide', desc: '100°F design temp, 74°F wet bulb, 2,900 CDD, 1,100 HDD, 50% RH — why each matters' },
      { title: 'DFW Energy Efficiency Guide', desc: 'SEER2 ratings optimized for DFW — what efficiency tier actually pays off at 2,900 CDD' },
      { title: 'DFW Humidity Control Guide', desc: 'Managing DFW summer humidity inside — target RH, equipment options, dehumidifier sizing' },
      { title: 'DFW Adaptation Guide', desc: 'HVAC protocols for DFW extreme events: heat waves, ice storms, power outages, hail' },
      { title: 'DFW Long-Term HVAC Plan', desc: '10-year HVAC roadmap by home type — replacement windows, technology trajectory' },
    ],
  },
  {
    category: 'Ownership & Maintenance',
    icon: '🔧',
    pages: [
      { title: 'DFW HVAC Maintenance Calendar', desc: 'Month-by-month DFW maintenance — pre-summer prep, fall startup, filter schedule' },
      { title: 'DFW Emergency HVAC Guide', desc: 'System down at 102°F — step-by-step DFW emergency response and who to call' },
      { title: 'DFW HVAC Warranty Guide', desc: 'Manufacturer vs. labor warranty in DFW — what voids coverage, what to register' },
      { title: 'DFW HVAC Insurance Claim Guide', desc: 'Lightning surge, hail, fire: coverage assessment, documentation, adjuster strategy' },
      { title: 'DFW HVAC Tax Credit Guide', desc: 'IRA federal credits up to $2,000 + Texas utility rebates for DFW homeowners' },
    ],
  },
  {
    category: 'Specialized Use Cases',
    icon: '🏠',
    pages: [
      { title: 'DFW Smart Thermostat Guide', desc: 'Nest vs. Ecobee vs. Honeywell for DFW climate — setup, scheduling, utility programs' },
      { title: 'DFW Indoor Air Quality Guide', desc: 'DFW allergens, VOCs, humidity, and the HVAC add-ons that address each' },
      { title: 'DFW Heat Pump Guide', desc: 'Heat pump viability in DFW — efficiency gains, freeze thresholds, dual-fuel setup' },
      { title: 'DFW Commercial HVAC Guide', desc: 'RTU, chilled water, VRF — DFW commercial HVAC fundamentals for small business owners' },
      { title: 'DFW Rental Property HVAC Guide', desc: 'Landlord-specific HVAC decisions: durability, tenant management, repair vs. replace' },
    ],
  },
];

const needs = [
  { need: 'Getting quotes for new system', categories: ['Before You Buy', 'Climate & Data'] },
  { need: 'System just failed or broke', categories: ['Ownership & Maintenance'] },
  { need: 'Preparing for DFW summer', categories: ['Climate & Data', 'Ownership & Maintenance'] },
  { need: 'Rental or investment property', categories: ['Specialized Use Cases', 'Before You Buy'] },
  { need: 'Filing an insurance claim', categories: ['Ownership & Maintenance'] },
  { need: 'Long-term home planning', categories: ['Climate & Data', 'Specialized Use Cases'] },
];

export default function DFWHVACFinalResourcePage() {
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);

  const activeCategories = selectedNeed
    ? needs.find((n) => n.need === selectedNeed)?.categories ?? []
    : resources.map((r) => r.category);

  const filtered = resources.filter((r) => activeCategories.includes(r.category));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>ProLnk · DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#FFFFFF' }}>Complete DFW HVAC Resource Catalog</h1>
        <p style={{ color: '#9AA3B2', fontSize: 15, margin: '0 0 28px', lineHeight: 1.6 }}>
          Every ProLnk DFW HVAC resource — organized by topic, stage, and homeowner type. Select your need to find the most relevant pages.
        </p>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 14 }}>🎯 What do you need right now?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {needs.map((n) => (
              <button
                key={n.need}
                onClick={() => setSelectedNeed(selectedNeed === n.need ? null : n.need)}
                style={{
                  background: selectedNeed === n.need ? '#F5E642' : '#0F1E35',
                  color: selectedNeed === n.need ? '#0A1628' : '#C8CDD8',
                  border: `1.5px solid ${selectedNeed === n.need ? '#F5E642' : '#1E2D45'}`,
                  borderRadius: 20,
                  padding: '7px 16px',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: selectedNeed === n.need ? 700 : 500,
                  transition: 'all 0.15s',
                }}
              >
                {n.need}
              </button>
            ))}
          </div>
        </div>

        {filtered.map((section) => (
          <div key={section.category} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>{section.icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: 0 }}>{section.category}</h2>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {section.pages.map((page, i) => (
                <div
                  key={i}
                  style={{
                    background: '#0F1E35',
                    border: '1px solid #1E2D45',
                    borderRadius: 8,
                    padding: '12px 16px',
                  }}
                >
                  <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{page.title}</div>
                  <div style={{ color: '#9AA3B2', fontSize: 13, lineHeight: 1.5 }}>{page.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: '#132040', border: '1.5px solid #F5E642', borderRadius: 12, padding: '20px 24px', marginTop: 8 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>⚡ Get Matched to a DFW HVAC Pro</div>
          <p style={{ color: '#9AA3B2', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            ProLnk connects DFW homeowners with licensed, vetted HVAC contractors who have been reviewed by real homeowners. Tell us your need and receive quotes from 3 pros — no spam, no pressure.
          </p>
        </div>
      </div>
    </div>
  );
}