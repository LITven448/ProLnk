import { useState } from 'react';

const behaviors = [
  { id: 'door_to_door', label: 'Knocked on my door unsolicited', risk: 2 },
  { id: 'just_in_area', label: 'Said they "just finished a job nearby"', risk: 2 },
  { id: 'storm_chaser', label: 'Appeared right after a storm', risk: 3 },
  { id: 'no_license', label: 'Could not provide TDLR license number', risk: 3 },
  { id: 'cash_only', label: 'Requested cash only payment', risk: 3 },
  { id: 'large_deposit', label: 'Requested >30% deposit upfront', risk: 3 },
  { id: 'no_contract', label: 'Reluctant to provide written contract', risk: 3 },
  { id: 'pressure', label: 'Pressuring me to decide today', risk: 3 },
  { id: 'no_insurance', label: 'Could not verify liability insurance', risk: 3 },
  { id: 'vague_scope', label: 'Quote had no itemized scope of work', risk: 2 },
  { id: 'out_of_state', label: 'Out-of-state plates or address', risk: 1 },
  { id: 'insurance_claim', label: 'Offered to handle my insurance claim for me', risk: 2 },
  { id: 'no_references', label: 'Could not provide local references', risk: 1 },
  { id: 'wire_transfer', label: 'Requested wire transfer payment', risk: 2 },
];

export default function HomeRepairScamGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const score = behaviors.filter(b => checked[b.id]).reduce((sum, b) => sum + b.risk, 0);
  const flags = behaviors.filter(b => checked[b.id]);

  const riskLevel = score === 0 ? null : score <= 3 ? 'low' : score <= 7 ? 'medium' : 'high';
  const riskColors: Record<string, string> = { low: '#4ade80', medium: '#facc15', high: '#f87171' };
  const riskLabels: Record<string, string> = {
    low: '🟡 Low Risk — Proceed with caution and verify license',
    medium: '🟠 Medium Risk — Multiple red flags present. Verify all credentials before proceeding.',
    high: '🔴 HIGH RISK — This contractor profile matches known scam patterns. Do not pay anything.',
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#FFFFFF', fontFamily: 'sans-serif', padding: '0 0 60px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ padding: '48px 0 32px' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            🛡️ ProLnk Homeowner Guide
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
            DFW Home Repair Scam Prevention Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7 }}>
            Texas homeowners lose millions every year to contractor fraud. Here's how the most common DFW scams work — and how to stop them before they start.
          </p>
        </div>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🌪️ DFW's Most Common Contractor Scams</h2>

          {[
            {
              title: '1. Storm Chasers',
              desc: 'After every major DFW hailstorm, out-of-state roofing companies flood the area. They knock on doors, offer "free inspections," and push homeowners to file inflated insurance claims. After cashing the insurance check, they disappear or do shoddy work that fails inspection. In 2023 alone, Texas saw thousands of storm chaser complaints.',
              signs: ['Arrived right after the storm', 'Out-of-state license plates', 'Offers to "handle your insurance claim"', 'Can\’t provide a local TDLR number'],
            },
            {
              title: '2. The "Just Finished Nearby" Knocker',
              desc: 'A truck parks on your street. Someone knocks and says they just finished a driveway, fence, or exterior paint job nearby and have leftover materials at a huge discount. The discount is fake — they\’ll use low-grade materials and the job will fail within months. No contract, no license, no recourse.',
              signs: ['Unsolicited door knock', 'Claims "leftover materials" from nearby job', 'Pushes for same-day decision', 'No written quote available'],
            },
            {
              title: '3. Sealcoating / Driveway Scams',
              desc: 'One of the oldest scams in DFW: a crew in an unmarked truck offers to sealcoat your driveway at a steep discount. They may use motor oil or waste product instead of actual sealcoat — which will wash off in the first rain and can damage the concrete. When you call to complain, the number is disconnected.',
              signs: ['No company markings on truck', 'Extremely low price', 'Demands cash only', 'Can\’t explain what product they\’re applying'],
            },
            {
              title: '4. HVAC Tune-Up Bait and Switch',
              desc: 'Advertised at $49–$79, these "tune-up" visits always find a "critical" problem. The tech shows homeowners a photo of a dirty part or fake meter reading and quotes $800–$3,000 for "emergency" repairs. Many repairs are invented or unnecessary. Always get a second opinion before authorizing HVAC repairs over $500.',
              signs: ['Unusually cheap inspection offer', 'Finds expensive problem every single visit', 'Pressure to approve same-day repairs', 'Can\’t show you the actual failed part'],
            },
          ].map((scam) => (
            <div key={scam.title} style={{ backgroundColor: '#132040', borderRadius: 12, padding: '24px', marginBottom: 16 }}>
              <h3 style={{ color: '#f87171', fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{scam.title}</h3>
              <p style={{ color: '#CBD5E1', lineHeight: 1.8, marginBottom: 14 }}>{scam.desc}</p>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 6, fontWeight: 700 }}>RED FLAGS:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {scam.signs.map(s => (
                  <span key={s} style={{ backgroundColor: '#2d0a0a', color: '#f87171', borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
                    ⚠️ {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 How to Verify a Contractor in Texas</h2>
          {[
            ['TDLR License Lookup', 'Most Texas trade contractors (HVAC, electricians, plumbers) must be licensed with the Texas Department of Licensing and Regulation. Go to tdlr.texas.gov and verify their license number before allowing any work.', 'tdlr.texas.gov'],
            ['BBB Search', 'Search the Better Business Bureau at bbb.org for complaints. A pattern of complaints — even resolved ones — tells a story.', 'bbb.org'],
            ['Secretary of State', 'Verify the company is a legitimate Texas entity at mycpa.cpa.state.tx.us. No registration = no accountability.', 'mycpa.cpa.state.tx.us'],
            ['Insurance Certificate', 'Request a Certificate of Insurance directly from their insurer, not from the contractor. The certificate should name you as an additional insured for the duration of the project.', ''],
          ].map(([step, detail, url]) => (
            <div key={step as string} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid #1E2D45' }}>
              <div style={{ color: '#F5E642', fontSize: 20, flexShrink: 0, marginTop: 2 }}>✓</div>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 4 }}>{step}</div>
                <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>{detail}</div>
                {url && <div style={{ color: '#F5E642', fontSize: 13, marginTop: 4 }}>🔗 {url}</div>}
              </div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📣 What to Do If You've Been Scammed</h2>
          {[
            ['Texas Attorney General', 'File a consumer complaint at texasattorneygeneral.gov. The AG office has a contractor fraud unit and actively pursues repeat offenders.'],
            ['Better Business Bureau', 'File at bbb.org. Even if nothing comes of it, it protects the next homeowner who searches.'],
            ['Texas TDLR', 'If a licensed contractor did substandard work, file a complaint with TDLR — they can revoke the license.'],
            ['Your insurance company', 'If damage resulted from the fraud, your homeowner\’s policy may cover some losses.'],
            ['Local police', 'If the contractor took money and disappeared (contractor abandonment), this is criminal fraud. File a police report.'],
          ].map(([action, detail]) => (
            <div key={action as string} style={{ backgroundColor: '#132040', borderRadius: 10, padding: '16px 20px', marginBottom: 10 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{action}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{detail}</div>
            </div>
          ))}
        </section>

        <section style={{ backgroundColor: '#0D2240', borderRadius: 16, padding: '32px', marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔎 Contractor Behavior Checker</h2>
          <p style={{ color: '#94A3B8', marginBottom: 24 }}>Check every behavior this contractor has shown. We'll calculate your scam risk score.</p>

          <div style={{ marginBottom: 24 }}>
            {behaviors.map(b => (
              <label key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid #1E2D45' }}>
                <input
                  type="checkbox"
                  checked={!!checked[b.id]}
                  onChange={() => toggle(b.id)}
                  style={{ width: 18, height: 18, accentColor: '#F5E642', cursor: 'pointer' }}
                />
                <span style={{ color: '#CBD5E1', fontSize: 15 }}>{b.label}</span>
                <span style={{ marginLeft: 'auto', color: '#64748B', fontSize: 12 }}>+{b.risk} pts</span>
              </label>
            ))}
          </div>

          <button
            onClick={() => setShowResult(true)}
            style={{
              backgroundColor: '#F5E642', color: '#0A1628', border: 'none',
              borderRadius: 8, padding: '14px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 20,
            }}
          >
            Calculate Scam Risk Score →
          </button>

          {showResult && (
            <div style={{ backgroundColor: '#081525', borderRadius: 12, padding: '24px' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: riskLevel ? riskColors[riskLevel] : '#4ade80', marginBottom: 12 }}>
                Risk Score: {score}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: riskLevel ? riskColors[riskLevel] : '#4ade80', marginBottom: 16 }}>
                {score === 0 ? '✅ No red flags identified. Still verify license and insurance.' : riskLabels[riskLevel!]}
              </div>
              {flags.length > 0 && (
                <div>
                  <div style={{ color: '#64748B', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>RED FLAGS IDENTIFIED:</div>
                  {flags.map(f => (
                    <div key={f.id} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #1E2D45' }}>
                      <span style={{ color: '#f87171' }}>⚠️</span>
                      <span style={{ color: '#CBD5E1', fontSize: 14 }}>{f.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
