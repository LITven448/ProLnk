import { useState } from 'react';

const projectTypes = [
  { label: 'Roof Replacement', value: 'roof' },
  { label: 'HVAC Install/Replace', value: 'hvac' },
  { label: 'Kitchen Remodel', value: 'kitchen' },
  { label: 'Bathroom Remodel', value: 'bathroom' },
  { label: 'Foundation Repair', value: 'foundation' },
  { label: 'Electrical Panel Upgrade', value: 'electrical' },
  { label: 'Plumbing Repipe', value: 'plumbing' },
  { label: 'Window Replacement', value: 'windows' },
];

const templates: Record<string, string[]> = {
  roof: [
    'What roofing material do you recommend for my climate and why?',
    'Will you remove the existing roof or layer over it?',
    'What is the estimated timeline from start to completion?',
    'What decking replacement is included if damage is found?',
    'What warranty do you offer on workmanship vs materials?',
    'Are you licensed with TDLR and carrying liability + workers comp?',
    'What is the payment schedule (avoid >10% deposit)?',
  ],
  hvac: [
    'What brand and SEER rating are you proposing and why?',
    'Is this a full system replacement or partial?',
    'Will you perform Manual J load calculation before sizing?',
    'What permits will be pulled and who handles inspection?',
    'What does the install include — pads, lineset, disconnect, thermostat?',
    'What is the manufacturer warranty vs your labor warranty?',
    'How do you handle haul-away of the old unit?',
  ],
  kitchen: [
    'What is included in scope — demo, plumbing rough, electrical, drywall, finish?',
    'Who are your subs and are they licensed?',
    'How do you handle material procurement — allowances or selections?',
    'What is your project schedule and how do you handle delays?',
    'What is your change order policy — written approval before work?',
    'What is the payment schedule tied to milestones?',
    'What warranty covers your workmanship?',
  ],
  bathroom: [
    'What is included — demo, waterproofing, tile, fixtures, vanity, plumbing?',
    'How do you waterproof the shower — backer board, membrane, pan?',
    'Who handles plumbing and are they licensed?',
    'What is the realistic timeline for completion?',
    'How do you protect the rest of the home during demo?',
    'What is the payment schedule?',
    'What is included in your workmanship warranty?',
  ],
  foundation: [
    'What method are you proposing — piers, pilings, mudjacking?',
    'How many piers and where will they be placed?',
    'What is the engineer\’s involvement in the repair plan?',
    'Does the quote include a post-repair elevation certificate?',
    'What is the warranty on the foundation work?',
    'What happens if the repair requires additional piers?',
    'Are permits included and who pulls them?',
  ],
  electrical: [
    'What size panel are you upgrading to and why?',
    'Is this a full panel replacement or adding a subpanel?',
    'Are permits and inspection by the city included?',
    'Will you replace the meter base if needed?',
    'What brand of breakers will be installed?',
    'How long will power be out during the swap?',
    'What is your workmanship warranty?',
  ],
  plumbing: [
    'What pipe material are you using — PEX, copper, CPVC?',
    'Is this a whole-house repipe or partial?',
    'Will walls be opened and who patches drywall?',
    'Are permits and inspection included?',
    'How long will water be off and will it be restored daily?',
    'What warranty covers the piping and fittings?',
    'What is the payment schedule?',
  ],
  windows: [
    'What brand, series, and glass package are you proposing?',
    'What is the U-factor and SHGC rating?',
    'Is installation full-frame or insert?',
    'How do you handle exterior trim and interior casing?',
    'What is the manufacturer warranty and your labor warranty?',
    'How many windows per day can your crew install?',
    'What is the cleanup process after installation?',
  ],
};

export default function HowToGetHomeRepairQuotes() {
  const [selectedProject, setSelectedProject] = useState('');
  const [showTemplate, setShowTemplate] = useState(false);

  const handleGenerate = () => {
    if (selectedProject) setShowTemplate(true);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#FFFFFF', fontFamily: 'sans-serif', padding: '0 0 60px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ padding: '48px 0 32px' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            📋 ProLnk Homeowner Guide
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
            How to Get Home Repair Quotes the Right Way
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7 }}>
            Most homeowners get burned not because they hired the wrong contractor — but because they got quotes wrong. Here's the full playbook.
          </p>
        </div>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📌 The 3-Quote Minimum Rule</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.8, marginBottom: 12 }}>
            Always get at least 3 quotes. Not because you should pick the middle one — because it gives you a market baseline. One quote tells you nothing. Two quotes create a coin flip. Three quotes reveal whether someone is dramatically over or under market.
          </p>
          <div style={{ backgroundColor: '#132040', borderRadius: 12, padding: '20px 24px', borderLeft: '4px solid #F5E642' }}>
            <strong style={{ color: '#F5E642' }}>Pro tip:</strong>
            <span style={{ color: '#CBD5E1' }}> Get all 3 quotes in the same week. Prices fluctuate with material costs — a quote from 3 months ago is worthless for comparison.</span>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📝 What to Include in Your Quote Request</h2>
          {[
            ['📐 Exact scope', 'Write down exactly what you want done. Vague requests get vague quotes. "Fix my roof" gets a ballpark. "Replace shingles on 2,200 sq ft 4/12 pitch roof including drip edge and ice & water shield" gets an apples-to-apples bid.'],
            ['📸 Photos', 'Send photos of the problem area, access points, and any existing damage. Contractors who can\’t quote from photos will waste your time on-site.'],
            ['📅 Timeline', 'Tell them your target start date. Backlogged contractors won\’t admit it upfront — but it\’ll surface when you ask.'],
            ['🏠 Property details', 'Stories, square footage, age of home, HOA restrictions. These affect material and labor costs significantly.'],
          ].map(([icon, text]) => (
            <div key={icon as string} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{icon}</div>
              <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>{text}</p>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🚩 Quote Red Flags</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              ['Too low (>30% under others)', 'They\’re cutting corners on materials, skipping permits, or using unlicensed subs. You\’ll pay double to fix it.'],
              ['Too high (>40% over others)', 'Either they don\’t want the job or they\’re padding heavily. Ask them to itemize labor vs materials.'],
              ['Verbal only', 'No written quote = no accountability. Walk away from any contractor who won\’t put it in writing.'],
              ['No license or insurance', 'Texas requires TDLR licensing for most trades. Ask for their license number before they set foot on your property.'],
              ['Pressure to decide today', 'Urgency tactics are a scam signal. Any legitimate contractor will give you time to compare.'],
              ['No itemization', 'A single lump-sum number tells you nothing. Require labor, materials, permits, and markup broken out separately.'],
            ].map(([flag, detail]) => (
              <div key={flag as string} style={{ backgroundColor: '#1a0a0a', borderRadius: 10, padding: '16px 20px', border: '1px solid #3a1515' }}>
                <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>⚠️ {flag}</div>
                <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{detail}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>✅ What a Good Quote Includes</h2>
          {[
            '📋 Written scope of work — specific, not vague',
            '🏗️ Materials specified by brand, grade, and quantity',
            '📅 Start date and estimated completion date',
            '💰 Payment schedule tied to milestones, not dates',
            '🔧 Permit responsibility and cost (who pulls, who pays)',
            '🛡️ Workmanship warranty duration and what it covers',
            '🧹 Site cleanup and debris removal included',
            '📞 Single point of contact throughout the project',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E2D45' }}>
              <span style={{ color: '#F5E642' }}>✓</span>
              <span style={{ color: '#CBD5E1' }}>{item}</span>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40, backgroundColor: '#0D2240', borderRadius: 16, padding: '32px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔧 Quote Request Template Generator</h2>
          <p style={{ color: '#94A3B8', marginBottom: 24 }}>Select your project type and get the exact questions to ask every contractor before they quote.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10, marginBottom: 24 }}>
            {projectTypes.map((pt) => (
              <button
                key={pt.value}
                onClick={() => { setSelectedProject(pt.value); setShowTemplate(false); }}
                style={{
                  padding: '12px 16px', borderRadius: 8, border: '2px solid',
                  borderColor: selectedProject === pt.value ? '#F5E642' : '#1E3A5F',
                  backgroundColor: selectedProject === pt.value ? '#1a1a00' : 'transparent',
                  color: selectedProject === pt.value ? '#F5E642' : '#94A3B8',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600, textAlign: 'left',
                }}
              >
                {pt.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={!selectedProject}
            style={{
              backgroundColor: selectedProject ? '#F5E642' : '#1E2D45',
              color: selectedProject ? '#0A1628' : '#475569',
              border: 'none', borderRadius: 8, padding: '14px 28px',
              fontWeight: 700, fontSize: 15, cursor: selectedProject ? 'pointer' : 'not-allowed', marginBottom: 24,
            }}
          >
            Generate My Quote Questions →
          </button>

          {showTemplate && selectedProject && (
            <div style={{ backgroundColor: '#081525', borderRadius: 12, padding: '24px' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, fontSize: 16 }}>
                📋 Questions to ask every {projectTypes.find(p => p.value === selectedProject)?.label} contractor:
              </div>
              {templates[selectedProject].map((q, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E2D45' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                  <span style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{q}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, padding: '14px 18px', backgroundColor: '#132040', borderRadius: 8, color: '#94A3B8', fontSize: 13 }}>
                💡 <strong style={{ color: '#F5E642' }}>Tip:</strong> Any contractor who refuses to answer these questions in writing is telling you something important.
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
