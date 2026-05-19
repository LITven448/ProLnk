import { useState } from 'react';

type Interest = 'predictive' | 'selfdiag' | 'heatpump' | 'smartgrid' | 'alltech';

interface TechData {
  label: string;
  timeline: string;
  how: string;
  dfwRelevance: string;
  readyNow: string;
}

const techData: Record<Interest, TechData> = {
  predictive: {
    label: '🤖 AI Predictive Maintenance',
    timeline: '2026–2028 for mainstream DFW adoption',
    how: 'Sensors monitor vibration, temperature deltas, refrigerant pressure, and power draw continuously. AI models trained on millions of unit failures flag anomalies 2–6 weeks before breakdowns. Alerts go to your phone and your HVAC company.',
    dfwRelevance: 'DFW summer extremes mean HVAC runs near max load 4–5 months/year. Predictive AI can schedule service before peak heat — eliminating the weekend emergency call at $250/hour.',
    readyNow: 'Nest, Ecobee, and Carrier Infinity already offer early versions. Third-party retrofit sensors (Augury, Samsara HVAC) add capability to any existing system.',
  },
  selfdiag: {
    label: '🔍 Self-Diagnosing Systems',
    timeline: '2026–2027 for new installs in DFW',
    how: 'Next-gen systems run internal diagnostic cycles and generate fault codes that map to specific components. They connect to manufacturer databases that correlate faults with outcomes — telling you "capacitor at 78% life, replace within 45 days" rather than just "error code E4."',
    dfwRelevance: 'DFW\’s aging housing stock (many 2000s-era systems) means retrofits will come before replacement. Expect smart diagnostic boards ($200–$600) that upgrade existing systems.',
    readyNow: 'Lennox iComfort, Carrier Infinity, and Trane ComfortLink II already have partial self-diagnostics. Full fault mapping is 1–2 years from broad availability.',
  },
  heatpump: {
    label: '🔄 Heat Pump Adoption Acceleration',
    timeline: '2025–2028 mass adoption curve in DFW',
    how: 'Federal tax credits (25C — up to $2,000), Inflation Reduction Act incentives, and DFW utility rebates are accelerating heat pump installs. Cold-climate heat pumps now perform well down to 0°F — solving the previous DFW winter concern. Dual-fuel systems (heat pump + gas backup) bridge the gap.',
    dfwRelevance: 'DFW\’s mild winters make heat pumps ideal — heating efficiency is 200–300% vs 95% for gas furnaces. Many DFW utilities (Oncor territory) offer $300–$1,000 rebates.',
    readyNow: 'Available now. Dual-fuel systems are the DFW sweet spot. Ask for SEER2 18+ and HSPF2 9+ specs. Budget $8,000–$14,000 installed.',
  },
  smartgrid: {
    label: '⚡ Smart Grid Integration',
    timeline: '2026–2029 for DFW Oncor territory',
    how: 'Smart thermostats and connected HVAC systems will negotiate directly with the grid. During peak demand (DFW summer afternoons), your system pre-cools your home and reduces load automatically — and you get bill credits from Oncor. In severe events, it avoids grid stress that leads to rolling outages.',
    dfwRelevance: 'ERCOT experienced near-collapse in Feb 2021 and stress events every summer. Smart grid HVAC is both a resilience and financial play for DFW homeowners. Oncor\’s GridDynamic program is expanding.',
    readyNow: 'Sign up for Oncor GridDynamic now (free). Nest and Ecobee already participate. Full automated negotiation requires next-gen smart meters — rolling out 2026–2028.',
  },
  alltech: {
    label: '🌐 All Technologies Overview',
    timeline: '2025–2030 full adoption curve',
    how: 'The convergence of AI diagnostics, self-healing systems, heat pump efficiency, and smart grid integration creates a fundamentally different HVAC experience — less emergency service, lower bills, better comfort, and grid resilience. DFW is a leading market for adoption due to extreme climate pressure.',
    dfwRelevance: 'By 2030, a typical new DFW home will have: a connected heat pump with AI monitoring, smart grid load management, predictive maintenance alerts, and near-zero emergency service calls. Retrofit options will make this available to existing homes.',
    readyNow: 'Start with a smart thermostat + Oncor GridDynamic enrollment today. Add AI monitoring sensors when replacing or servicing. Ask your HVAC pro about dual-fuel heat pump options.',
  },
};

export default function DFWHVACFutureTechGuide() {
  const [interest, setInterest] = useState<Interest | null>(null);

  const data = interest ? techData[interest] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🚀 Future HVAC Technology Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW's extreme climate is making it a testing ground for the next generation of HVAC technology. Here's what's coming — and when it helps you.
        </p>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 10 }}>What interests you most?</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {(Object.entries(techData) as [Interest, TechData][]).map(([k, v]) => (
              <button key={k} onClick={() => setInterest(k)} style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${interest === k ? '#F5E642' : '#1e3a5f'}`, background: interest === k ? '#F5E642' : 'transparent', color: interest === k ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{v.label}</button>
            ))}
          </div>
        </div>

        {data ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#0f2236', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 6, fontWeight: 600 }}>⏱️ Timeline</div>
              <div style={{ color: '#cbd5e1' }}>{data.timeline}</div>
            </div>
            <div style={{ background: '#0f2236', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 6, fontWeight: 600 }}>⚙️ How It Works</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{data.how}</div>
            </div>
            <div style={{ background: '#0f2236', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#38bdf8', fontSize: 13, marginBottom: 6, fontWeight: 600 }}>🌡️ DFW Relevance</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{data.dfwRelevance}</div>
            </div>
            <div style={{ background: '#0f2236', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#22c55e', fontSize: 13, marginBottom: 6, fontWeight: 600 }}>✅ What You Can Do Right Now</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{data.readyNow}</div>
            </div>
          </div>
        ) : (
          <div style={{ background: '#0f2236', borderRadius: 12, padding: 32, textAlign: 'center', color: '#94a3b8' }}>Select a technology to see your DFW-specific guide</div>
        )}

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', fontWeight: 600, textAlign: 'center' }}>
          🔧 Find a DFW HVAC pro who knows the latest tech — ProLnk matches you in minutes.
        </div>
      </div>
    </div>
  );
}
