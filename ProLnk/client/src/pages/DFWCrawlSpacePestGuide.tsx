import { useState } from 'react';

type CrawlResult = { pestLikelihood: string; color: string; treatment: string; moistureControl: string; cost: string; notes: string[] };

const crawlMatrix: Record<string, Record<string, CrawlResult>> = {
  'vented': {
    'termite-damage': {
      pestLikelihood: 'Subterranean Termites — HIGH likelihood',
      color: '#FF4444',
      treatment: 'Liquid termiticide barrier treatment or Sentricon baiting system. Both require licensed Texas pest control applicators. Do not use DIY products for subterranean termite infestations — colony is underground and requires professional access.',
      moistureControl: 'Vented crawl spaces with active termite damage almost always have excess moisture. Install or repair vapor barrier (6-mil poly) and ensure vents are functional and unobstructed.',
      cost: '$800 to $2,500 for termite treatment in DFW market depending on linear footage. Annual monitoring contracts run $200 to $400/year.',
      notes: [
        'DFW has one of the highest subterranean termite pressures in Texas — Formosan and Eastern subterranean termites are both present.',
        'Termite mud tubes on piers, band joists, or foundation walls confirm active infestation.',
        'Structural repair of damaged wood is a separate cost from termite treatment — get both assessed simultaneously.',
        'DFW moisture in crawl spaces is the #1 driver of termite attraction — moisture control is as important as treatment.',
      ],
    },
    'standing-water': {
      pestLikelihood: 'Wood-Boring Beetles and Termites — ELEVATED likelihood if prolonged',
      color: '#FF9944',
      treatment: 'Identify and eliminate water source first — grading, downspout extension, or plumbing leak. After drying, treat any affected wood. Schedule termite inspection since standing water in a vented crawl space strongly correlates with termite activity.',
      moistureControl: 'Install sump pump if water intrusion is from groundwater. Extend downspouts minimum 6 feet from foundation. Regrade soil away from the home if drainage is the cause.',
      cost: '$500 to $1,500 for moisture control improvements. Termite inspection $75 to $150 additional.',
      notes: [
        'Standing water in a DFW crawl space is unusual — most moisture issues are humidity, not standing water.',
        'Check for plumbing leaks from supply lines or drain lines running through the crawl space.',
        'DFW expansive clay soil can pond water against foundations after heavy rain — grading is the fix.',
        'Mold grows within 24-48 hours of wood contact with standing water — remediation may be needed.',
      ],
    },
    'musty-odor': {
      pestLikelihood: 'Wood-Boring Beetles — MODERATE likelihood; Termites possible',
      color: '#FF9944',
      treatment: 'Inspect for wood-boring beetle exit holes (small round holes in wood members). If found, treat with borates (Tim-bor or similar) applied by pest professional. Schedule full termite inspection as part of the same visit.',
      moistureControl: 'Musty odor in a vented crawl space indicates humidity above 60%. Install a dehumidifier rated for crawl space use, or upgrade vapor barrier to fully encapsulated system.',
      cost: '$300 to $800 for borate treatment. Encapsulation upgrade $3,000 to $7,000 for DFW crawl spaces.',
      notes: [
        'Powder post beetles are common in DFW crawl spaces — they attack hardwood framing and subflooring.',
        'Exit holes the size of a pinhead (1/32 inch) indicate powder post beetles. Larger holes indicate old house borers.',
        'Borate treatments penetrate wood and prevent re-infestation but require dry wood to be effective.',
        'DFW summer humidity makes crawl space moisture management an ongoing issue, not a one-time fix.',
      ],
    },
    'no-issues': {
      pestLikelihood: 'Current Risk — LOW (preventive action still recommended)',
      color: '#44BB44',
      treatment: 'Annual termite inspection is strongly recommended in DFW given regional termite pressure. No treatment indicated at this time.',
      moistureControl: 'Inspect vapor barrier annually for gaps, tears, or displaced sections. Ensure vents are open and unobstructed spring through fall.',
      cost: '$75 to $150 for annual termite inspection. Vapor barrier repair under $200 in most cases.',
      notes: [
        'DFW termite pressure is high enough that proactive annual inspections are standard practice.',
        'Ask your pest professional about Sentricon monitoring stations as a preventive measure.',
        'Check crawl space access door seal — gaps allow rodent entry and humidity intrusion.',
        'Document your vapor barrier install date — most should be replaced every 10 to 15 years.',
      ],
    },
  },
  'encapsulated': {
    'termite-damage': {
      pestLikelihood: 'Subterranean Termites — HIGH likelihood despite encapsulation',
      color: '#FF4444',
      treatment: 'Encapsulation does not prevent subterranean termites — they travel through the concrete foundation, not the vapor barrier. Liquid barrier or Sentricon treatment required. Inspect where encapsulation meets foundation walls for mud tube activity.',
      moistureControl: 'Check encapsulation seams and penetrations for breaches. Dehumidifier should maintain humidity below 50% — verify it is operational.',
      cost: '$800 to $2,500 for termite treatment. Encapsulation repair $150 to $500 if barrier is compromised.',
      notes: [
        'Termites exploit any gap where encapsulation meets the foundation — inspect these joints carefully.',
        'An encapsulated crawl space with a dehumidifier significantly reduces termite attraction but does not eliminate risk in DFW.',
        'Check that the dehumidifier drain line is functional — a flooded encapsulated space is worse than a vented one.',
      ],
    },
    'musty-odor': {
      pestLikelihood: 'Possible breach in encapsulation system — mold or condensation likely',
      color: '#FF9944',
      treatment: 'Inspect encapsulation for tears, especially at seams and pipe penetrations. Check dehumidifier operation and capacity rating. If mold is confirmed, professional remediation required before re-sealing.',
      moistureControl: 'An encapsulated crawl space should not have musty odor if the system is functioning. Inspect dehumidifier capacity — undersized units are common in older encapsulation installs.',
      cost: '$200 to $800 for mold testing and remediation in small crawl spaces. Dehumidifier upgrade $400 to $900.',
      notes: [
        'Musty odor in an encapsulated space indicates system failure, not normal operation.',
        'Check the crawl space access door seal — it is the most common moisture entry point in otherwise functional encapsulated crawl spaces.',
        'HVAC ducts running through the crawl space can condense moisture if the encapsulation is compromised.',
      ],
    },
    'no-issues': {
      pestLikelihood: 'Current Risk — LOW',
      color: '#44BB44',
      treatment: 'Annual termite inspection recommended regardless of encapsulation. DFW termite pressure warrants year-round monitoring.',
      moistureControl: 'Verify dehumidifier is draining properly and maintaining below 50% relative humidity. Inspect encapsulation annually for damage.',
      cost: '$75 to $150 for annual termite inspection.',
      notes: [
        'An encapsulated crawl space in good condition is the gold standard for DFW homes with crawl spaces.',
        'Document your encapsulation install date and dehumidifier service date for future reference.',
        'Proactive Sentricon baiting stations around the perimeter provide the best long-term termite protection.',
      ],
    },
  },
};

const crawlTypes = [
  { value: 'vented', label: 'Vented Crawl Space (open vents in foundation walls)' },
  { value: 'encapsulated', label: 'Encapsulated Crawl Space (sealed with vapor barrier)' },
];

const issueOptions = [
  { value: 'termite-damage', label: 'Visible wood damage or termite mud tubes' },
  { value: 'standing-water', label: 'Standing water or wet soil' },
  { value: 'musty-odor', label: 'Musty odor or visible mold' },
  { value: 'no-issues', label: 'No visible issues — preventive assessment' },
];

export default function DFWCrawlSpacePestGuide() {
  const [crawlType, setCrawlType] = useState('');
  const [issue, setIssue] = useState('');

  const result = crawlType && issue ? crawlMatrix[crawlType]?.[issue] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Crawl Space Pest Guide</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 24, lineHeight: 1.6 }}>
          Most DFW homes are slab-on-grade, but a meaningful portion of older homes in areas like East Dallas, Richardson, and older Garland neighborhoods
          were built with crawl spaces. These spaces create unique pest and moisture challenges in the DFW climate —
          particularly for subterranean termites, which are endemic throughout North Texas.
        </p>
        <div style={{ background: '#162844', borderRadius: 10, padding: '14px 18px', marginBottom: 28 }}>
          <strong style={{ color: '#F5E642' }}>DFW Crawl Space Context:</strong>
          <ul style={{ color: '#8FA3BF', marginTop: 8, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>DFW has high subterranean termite pressure — Formosan termites (more aggressive) are established in Dallas County.</li>
            <li>DFW summer humidity levels of 60-80% make moisture management critical in any crawl space.</li>
            <li>Expansive clay soil causes seasonal movement that can open new foundation gaps and pest entry points.</li>
          </ul>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Assess Your Crawl Space</h2>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>Crawl Space Type</label>
          <select value={crawlType} onChange={e => setCrawlType(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 15 }}>
            <option value="">Select crawl space type...</option>
            {crawlTypes.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>Observed Issues</label>
          <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
            <option value="">Select issue...</option>
            {issueOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontWeight: 700, marginBottom: 10 }}>{result.pestLikelihood}</div>
              <div style={{ marginBottom: 10 }}><strong style={{ color: '#F5E642' }}>Treatment:</strong> <span style={{ color: '#8FA3BF' }}>{result.treatment}</span></div>
              <div style={{ marginBottom: 10 }}><strong style={{ color: '#F5E642' }}>Moisture Control:</strong> <span style={{ color: '#8FA3BF' }}>{result.moistureControl}</span></div>
              <div style={{ marginBottom: 12 }}><strong style={{ color: '#F5E642' }}>Estimated DFW Cost:</strong> <span style={{ color: '#8FA3BF' }}>{result.cost}</span></div>
              <strong style={{ color: '#F5E642' }}>Key Notes:</strong>
              <ul style={{ paddingLeft: 20, color: '#8FA3BF', lineHeight: 1.8, marginTop: 8 }}>
                {result.notes.map((note, i) => <li key={i}>{note}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛡️ Crawl Space Maintenance Checklist</h2>
          {[
            { icon: '📅', title: 'Annual termite inspection', body: 'Required in DFW regardless of crawl space type. Subterranean termites are present throughout North Texas.' },
            { icon: '💧', title: 'Monitor humidity year-round', body: 'Install a crawl space hygrometer. Humidity above 60% creates conditions for mold, wood rot, and pest attraction.' },
            { icon: '🔲', title: 'Inspect vapor barrier twice yearly', body: 'Spring and fall inspections catch tears from pest activity, HVAC service visits, or seasonal soil movement.' },
            { icon: '🚪', title: 'Seal the access door properly', body: 'The access door is the most common moisture and pest entry point in otherwise well-maintained crawl spaces.' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
              <div><strong style={{ color: '#E8EDF5' }}>{item.title}:</strong> <span style={{ color: '#8FA3BF' }}>{item.body}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
