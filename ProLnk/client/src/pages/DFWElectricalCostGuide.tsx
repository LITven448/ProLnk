import { useState } from 'react';

export default function DFWElectricalCostGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const faqs = [
    {
      q: 'Do I need a permit for electrical work in DFW?',
      a: 'Yes. Most electrical work in Dallas, Fort Worth, and surrounding cities requires a permit. Your licensed electrician should pull the permit — if they suggest skipping it, walk away.',
    },
    {
      q: 'How do I verify a Texas electrician’s license?',
      a: 'Visit the TDLR website (tdlr.texas.gov) and search by license number or name. Ask the contractor for their license number before work begins — any legitimate electrician will provide it immediately.',
    },
    {
      q: 'How long does a panel upgrade take?',
      a: 'A 200A panel upgrade typically takes 6–8 hours. A 400A service upgrade may take 1–2 days. Budget for your power to be off for the majority of that time.',
    },
  ];

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1B2B4B' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 14, color: '#718096' }}>ProLnk Cost Guide · Dallas-Fort Worth · Updated May 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, margin: '0 0 20px' }}>
          DFW Electrical Cost Guide 2026 —<br />Panel Upgrades, Wiring, and EV Chargers
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: '#4A5568', margin: '0 0 40px', maxWidth: 680 }}>
          Electrical work is one of the most regulated trades in Texas — and for good reason. These prices reflect what licensed, permitted work costs in the DFW metro in 2026.
        </p>

        {/* Licensing Banner */}
        <div style={{ background: '#EBF4FF', border: '1.5px solid #3182CE', borderRadius: 10, padding: '18px 24px', marginBottom: 40 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#1A365D', marginBottom: 4 }}>Texas Licensing Requirement</div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#2C5282' }}>
            TDLR (Texas Department of Licensing and Regulation) requires a license for all electrical work except minor repairs. <strong>Always ask for the license number before any work begins.</strong> Unlicensed work voids your homeowner's insurance and creates liability issues when you sell.
          </p>
        </div>

        {/* Pricing Table */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px' }}>DFW Electrical Service Pricing</h2>
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #E2E8F0', marginBottom: 40 }}>
          {[
            ['Panel upgrade — 100A to 200A', '$1,800 – $3,500'],
            ['Panel upgrade — 200A to 400A', '$3,500 – $6,000'],
            ['Outlet installation (per outlet)', '$150 – $300'],
            ['GFCI outlet replacement', '$150 – $250'],
            ['Light fixture installation', '$100 – $300'],
            ['Ceiling fan install (existing wiring)', '$150 – $350'],
            ['EV charger — Level 2 (installed)', '$800 – $1,500'],
            ['Whole-home surge protector', '$300 – $600'],
            ['Smoke detector installation', '$75 – $150'],
            ['Smoke / CO combo detector', '$150 – $250'],
          ].map(([service, price], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: i % 2 === 0 ? '#fff' : '#F7F9FC', borderBottom: i < 9 ? '1px solid #E2E8F0' : 'none' }}>
              <span style={{ fontSize: 15, color: '#2D3748' }}>{service}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1B2B4B', whiteSpace: 'nowrap' }}>{price}</span>
            </div>
          ))}
        </div>

        {/* EV Charger Callout */}
        <div style={{ background: '#F0FFF4', border: '1.5px solid #38A169', borderRadius: 10, padding: '20px 24px', marginBottom: 40 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#22543D', marginBottom: 8 }}>EV Charger Demand Surge in DFW</div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#276749' }}>
            DFW EV registrations are up <strong>340% since 2022</strong>. Wait times for Level 2 charger installation now run <strong>2–4 weeks</strong> with most licensed electricians. If you're buying an EV, book your charger installation before or at the same time as the vehicle purchase — not after delivery.
          </p>
          <div style={{ marginTop: 16, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              ['30–60 amp circuit required', ''],
              ['240V outlet or hardwire', ''],
              ['Permit required in all DFW cities', ''],
              ['Installation: 3–5 hrs typical', ''],
            ].map(([fact], i) => (
              <div key={i} style={{ fontSize: 13, color: '#2F855A', fontWeight: 600 }}>✓ {fact}</div>
            ))}
          </div>
        </div>

        {/* What Drives Cost */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px' }}>What Drives Electrical Costs in DFW</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { title: 'Panel Location', desc: 'Garage panels cost less to access than attic or crawlspace. Distance from meter to panel adds cost.' },
            { title: 'Home Age', desc: 'Pre-1980 homes with aluminum wiring or fuse boxes need remediation before upgrades. Budget 20–40% more.' },
            { title: 'Permit Complexity', desc: 'Dallas, Fort Worth, and Frisco have different inspection cadences. Rural Tarrant County is fastest.' },
            { title: 'Labor Timing', desc: 'Emergency or weekend work adds $100–$250. Schedule during business hours for base pricing.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '20px' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{card.title}</div>
              <div style={{ fontSize: 14, color: '#718096', lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px' }}>Common Questions</h2>
        <div style={{ marginBottom: 40 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, marginBottom: 10, overflow: 'hidden' }}>
              <button onClick={() => setExpanded(expanded === String(i) ? null : String(i))}
                style={{ width: '100%', textAlign: 'left', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 15, color: '#1B2B4B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {faq.q}
                <span style={{ fontSize: 20, color: '#E8D87A' }}>{expanded === String(i) ? '−' : '+'}</span>
              </button>
              {expanded === String(i) && (
                <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#4A5568', lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: '#1B2B4B', borderRadius: 14, padding: '36px 40px', textAlign: 'center' }}>
          <h3 style={{ color: '#E8D87A', fontSize: 22, fontWeight: 800, margin: '0 0 12px' }}>Find a Licensed DFW Electrician</h3>
          <p style={{ color: '#A0AEC0', margin: '0 0 24px', fontSize: 15 }}>
            ProLnk verifies TDLR license numbers, insurance, and reviews before any electrician joins the network.
          </p>
          <a href="/apply" style={{ display: 'inline-block', background: '#E8D87A', color: '#1B2B4B', fontWeight: 800, fontSize: 16, padding: '14px 36px', borderRadius: 10, textDecoration: 'none' }}>
            Get Free Estimates →
          </a>
        </div>

      </div>
    </div>
  );
}
