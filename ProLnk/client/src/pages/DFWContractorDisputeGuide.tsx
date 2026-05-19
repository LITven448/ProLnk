import { useState } from 'react';

const resolutionPaths = [
  {
    path: 'Direct Negotiation',
    cost: '$0', timeline: '1–4 weeks', successRate: '40%',
    bestFor: 'All disputes — always try first',
    steps: ['Document all deficiencies in writing with photos', 'Send certified letter listing specific issues and remedies requested', 'Give 10-business-day response deadline', 'Keep all communication written (no verbal agreements)'],
  },
  {
    path: 'RCLA Demand Notice',
    cost: '$0–$500 (attorney review recommended)', timeline: '60 days', successRate: '55%',
    bestFor: 'Construction defects on residential projects',
    steps: ['Send written notice of defect via certified mail', 'Contractor has 60 days to inspect and offer repair/settlement', 'Texas law: you MUST send RCLA notice before suing for most construction defects', 'Failure to follow RCLA process can bar your lawsuit'],
  },
  {
    path: 'BBB Complaint',
    cost: '$0', timeline: '2–6 weeks', successRate: '30%',
    bestFor: 'Contractors who care about their BBB rating',
    steps: ['File at bbb.org — free and online', 'Contractor given 14 days to respond', 'BBB mediates between parties', 'Public record created — hurts unresponsive contractors more than they want'],
  },
  {
    path: 'Texas AG Consumer Complaint',
    cost: '$0', timeline: '4–12 weeks', successRate: '35%',
    bestFor: 'Fraud, misrepresentation, unlicensed work',
    steps: ['File at texasattorneygeneral.gov/consumer-protection', 'AG investigates patterns of violations (multiple complaints = more action)', 'Can result in fines, license revocation', 'Good leverage if contractor knows you filed'],
  },
  {
    path: 'Small Claims Court',
    cost: '$46–$200 filing fee', timeline: '2–4 months', successRate: '65% (if well-documented)',
    bestFor: 'Disputes under $20,000, clear evidence of breach',
    steps: ['File in Justice Court for your county', 'No attorney required (you may want one for $10K+)', 'Serve contractor with citation (process server ~$100)', 'Bring all contracts, photos, receipts, communications to hearing'],
  },
  {
    path: 'Civil Litigation',
    cost: '$5,000–$25,000+ in attorney fees', timeline: '6–24 months', successRate: 'Varies',
    bestFor: 'Large disputes $20K+, contractor bond claims, fraud',
    steps: ['Hire a Texas construction defect attorney', 'File suit in county district court', 'Discovery process — depositions, document requests', 'Most settle before trial — filing often triggers resolution'],
  },
];

const demandLetter = [
  'Your full name, address, and contact information',
  'Contractor\’s name, license number, and business address',
  'Contract date and project description',
  'Specific deficiencies with dates first noticed',
  'Dollar amount of damages or remedy requested',
  'Response deadline (10–14 business days)',
  'Statement that legal action will follow if unresolved',
  'Send via USPS Certified Mail — return receipt requested',
];

export default function DFWContractorDisputeGuide() {
  const [disputeType, setDisputeType] = useState('defective');
  const [amount, setAmount] = useState(12000);
  const [result, setResult] = useState<{ primary: string; secondary: string; timeline: string; rcla: string; tip: string } | null>(null);

  function calculate() {
    const paths: Record<string, { primary: string; secondary: string; rcla: string }> = {
      defective: {
        primary: amount < 20000 ? '⚖️ Small Claims Court — strong option for documented defects under $20K' : '🏛️ Civil Litigation — large defect claims benefit from attorney representation',
        secondary: '📋 RCLA Notice — required before lawsuit for construction defects in Texas',
        rcla: 'Yes — RCLA notice required. Send certified letter before filing any lawsuit for construction defects.',
      },
      unfinished: {
        primary: amount < 5000 ? '📧 Direct Negotiation + BBB Complaint — leverage their reputation' : amount < 20000 ? '⚖️ Small Claims Court — breach of contract is straightforward' : '🏛️ Civil Litigation — get attorney for large abandoned project claims',
        secondary: '📬 Texas AG Complaint if contractor abandoned and kept deposit (fraud)',
        rcla: 'Partial — RCLA applies if work is structurally defective; general breach of contract has different notice rules.',
      },
      overcharge: {
        primary: '📧 Direct Negotiation — most overcharge disputes resolve with written demand',
        secondary: amount > 10000 ? '⚖️ Small Claims Court if negotiation fails' : '📋 BBB Complaint for documented overcharges',
        rcla: 'No — RCLA does not apply to billing disputes, only construction defects.',
      },
      unlicensed: {
        primary: '🏛️ Texas AG + TDLR Complaint — unlicensed contracting is a state violation',
        secondary: '⚖️ Small Claims or Civil Court — unlicensed contractors have limited legal defenses',
        rcla: 'Possible — but unlicensed contractor status strengthens your position in any claim.',
      },
    };
    const timelines: Record<string, string> = { defective: amount < 20000 ? '2–5 months' : '8–24 months', unfinished: '1–6 months', overcharge: '1–3 months', unlicensed: '2–6 months' };
    const tips: Record<string, string> = {
      defective: 'Get an independent contractor\’s written assessment of the defects — this is your strongest evidence in any proceeding.',
      unfinished: 'If contractor has your deposit and won\’t respond, file AG complaint immediately — this triggers fraud investigation and creates urgency.',
      overcharge: 'Compare your final invoice line-by-line against the original written contract. Verbal change orders are difficult to enforce.',
      unlicensed: 'Verify license at tdlr.texas.gov — if unlicensed, you may be entitled to contract rescission and refund under Texas law.',
    };
    const info = paths[disputeType];
    setResult({ primary: info.primary, secondary: info.secondary, timeline: timelines[disputeType], rcla: info.rcla, tip: tips[disputeType] });
  }

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', color: '#1A2640', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#0A1628', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.5 }}>DFW Homeowner Resource · 2026</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#0A1628', marginBottom: 12, lineHeight: 1.1 }}>Contractor Dispute Resolution Guide — DFW</h1>
        <p style={{ fontSize: 18, color: '#4A5568', marginBottom: 48, maxWidth: 680 }}>When work is substandard, unfinished, or overpriced — here's every option available to DFW homeowners, from demand letters to court.</p>

        <div style={{ background: '#FFF3E0', borderRadius: 16, padding: 28, marginBottom: 40, borderLeft: '4px solid #E65100′ }}>
          <h2 style={{ color: '#E65100', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⚖️ Texas RCLA — Critical Before You Sue</h2>
          <p style={{ color: '#4A5568', lineHeight: 1.7, marginBottom: 16 }}>The Texas Residential Construction Liability Act (RCLA) requires homeowners to send a formal written notice of construction defects to the contractor <strong>at least 60 days before filing a lawsuit</strong>. Skipping this step can get your case dismissed.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#FFFFFF', borderRadius: 10, padding: 16 }}><div style={{ color: '#E65100', fontWeight: 700, marginBottom: 8 }}>RCLA Applies To</div><div style={{ color: '#4A5568', fontSize: 14, lineHeight: 1.7 }}>Structural defects · Plumbing/electrical failures · Foundation issues · Roof defects · Code violations</div></div>
            <div style={{ background: '#FFFFFF', borderRadius: 10, padding: 16 }}><div style={{ color: '#E65100', fontWeight: 700, marginBottom: 8 }}>Contractor's Rights Under RCLA</div><div style={{ color: '#4A5568', fontSize: 14, lineHeight: 1.7 }}>60 days to inspect · Make written repair offer · If offer reasonable and refused, limits homeowner’s damages</div></div>
          </div>
        </div>

        <h2 style={{ color: '#0A1628', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Resolution Paths — All Options</h2>
        <div style={{ marginBottom: 48 }}>
          {resolutionPaths.map((r, i) => (
            <div key={r.path} style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, marginBottom: 12, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18 }}>{r.path}</div>
                  <div style={{ color: '#4A5568', fontSize: 13, marginTop: 4 }}>Best for: {r.bestFor}</div>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ background: '#F8F9FA', color: '#1A2640', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>💰 {r.cost}</span>
                  <span style={{ background: '#F8F9FA', color: '#1A2640', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>⏱️ {r.timeline}</span>
                  <span style={{ background: '#F8F9FA', color: '#1A2640', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>✅ {r.successRate}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
                {r.steps.map(step => (
                  <div key={step} style={{ color: '#4A5568', fontSize: 13, lineHeight: 1.6, display: 'flex', gap: 8 }}>
                    <span style={{ color: '#0A1628', fontWeight: 700, flexShrink: 0 }}>→</span>{step}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📬 What to Include in Your Demand Letter</h2>
          {demandLetter.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < demandLetter.length - 1 ? '1px solid #E2E8F0′ : ’none', alignItems: 'flex-start' }}>
              <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: 50, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ color: '#1A2640', fontSize: 15, lineHeight: 1.6 }}>{item}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 36, marginBottom: 40, boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>🔍 Find Your Best Resolution Path</h2>
          <p style={{ color: '#4A5568', marginBottom: 28 }}>Based on dispute type and amount, get a recommended path and timeline.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ color: '#4A5568', fontSize: 13, display: 'block', marginBottom: 8 }}>Type of Dispute</label>
              <select value={disputeType} onChange={e => setDisputeType(e.target.value)} style={{ width: '100%', background: '#F8F9FA', color: '#1A2640', border: '1px solid #CBD5E0', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value="defective">Defective / Substandard Work</option>
                <option value="unfinished">Abandoned / Unfinished Project</option>
                <option value="overcharge">Overcharge / Billing Dispute</option>
                <option value="unlicensed">Unlicensed Contractor</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#4A5568', fontSize: 13, display: 'block', marginBottom: 8 }}>Dispute Amount: ${amount.toLocaleString()}</label>
              <input type="range" min={500} max={100000} step={500} value={amount} onChange={e => setAmount(Number(e.target.value))} style={{ width: '100%', accentColor: '#0A1628', marginTop: 10 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#718096', fontSize: 12, marginTop: 4 }}><span>$500</span><span>$100K</span></div>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%', marginBottom: 24 }}>Get Recommended Resolution Path →</button>
          {result && (
            <div style={{ background: '#F8F9FA', borderRadius: 12, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              <div style={{ gridColumn: '1 / -1′ }}><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>Primary Recommendation</div><div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>{result.primary}</div></div>
              <div style={{ gridColumn: '1 / -1′ }}><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>Secondary Option</div><div style={{ color: '#1A2640', fontWeight: 600 }}>{result.secondary}</div></div>
              <div><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>Expected Timeline</div><div style={{ color: '#0A1628', fontWeight: 700 }}>{result.timeline}</div></div>
              <div><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>RCLA Notice Required?</div><div style={{ color: '#1A2640', fontSize: 14 }}>{result.rcla}</div></div>
              <div style={{ gridColumn: '1 / -1', background: '#FFFFFF', borderRadius: 10, padding: 16, borderLeft: '3px solid #0A1628′ }}><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>Key Tip</div><div style={{ color: '#1A2640', fontSize: 14, lineHeight: 1.7 }}>{result.tip}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔧</div>
          <h3 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Need a Licensed Contractor for a Second Opinion?</h3>
          <p style={{ color: '#8BA3C7', marginBottom: 20 }}>ProLnk connects DFW homeowners with vetted, licensed contractors who can document substandard work — essential evidence for disputes, RCLA notices, and court.</p>
          <a href="/" style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '12px 28px', fontWeight: 800, textDecoration: 'none', fontSize: 15 }}>Get a Licensed Contractor Quote →</a>
        </div>
      </div>
    </div>
  );
}
