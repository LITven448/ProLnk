import { useState } from 'react';

export default function DFWOutdoorSpacesGuide() {
  const [budget, setBudget] = useState<string>('');

  const projects = [
    {
      rank: 1,
      name: 'Patio Cover / Pergola',
      cost: '$3,000 – $12,000',
      minBudget: 3000,
      roi: 'High',
      useRate: '94%',
      icon: '🏠',
      description: 'Highest use rate of any outdoor feature in DFW. Essential for blocking intense UV while keeping outdoor space usable during summer heat.',
      tip: 'Go with aluminum or steel frame over wood — DFW heat/humidity degrades wood rapidly.',
    },
    {
      rank: 2,
      name: 'Outdoor Kitchen',
      cost: '$8,000 – $35,000',
      minBudget: 8000,
      roi: 'Very High',
      useRate: '87%',
      icon: '🍳',
      description: 'Major resale value driver. DFW’s 9-month outdoor season makes this a genuine extension of your living space, not a luxury.',
      tip: 'Minimum: built-in grill + counter + mini fridge. Add sink only if plumbing access is nearby.',
    },
    {
      rank: 3,
      name: 'Deck Addition',
      cost: '$6,000 – $20,000',
      minBudget: 6000,
      roi: 'High',
      useRate: '81%',
      icon: '🪵',
      description: 'Adds functional square footage. Use composite or concrete decking — wood warps and splinters in DFW heat cycles.',
      tip: 'Orient deck to catch prevailing south wind. Add ceiling fans for comfort June-August.',
    },
    {
      rank: 4,
      name: 'Swimming Pool',
      cost: '$35,000 – $80,000',
      minBudget: 35000,
      roi: 'Moderate',
      useRate: '76%',
      icon: '🏊',
      description: 'DFW pool season is genuinely long (May-October). But ongoing costs are real: $1,200-2,400/yr in chemicals, electricity, and maintenance.',
      tip: 'Add a pool only if you plan to stay 5+ years. Resale premium rarely covers full pool cost.',
    },
    {
      rank: 5,
      name: 'Fire Pit',
      cost: '$500 – $5,000',
      minBudget: 500,
      roi: 'Best Per Dollar',
      useRate: '91%',
      icon: '🔥',
      description: 'Highest immediate enjoyment per dollar. Extends outdoor season into December-February when evenings cool off.',
      tip: 'Gas fire pits (propane/natural gas) are cleaner and more usable than wood. Check HOA rules first.',
    },
  ];

  const budgetOptions = [
    { label: 'Under $5,000', max: 5000 },
    { label: '$5,000 – $15,000', max: 15000 },
    { label: '$15,000 – $40,000', max: 40000 },
    { label: '$40,000+', max: 999999 },
  ];

  const filteredProjects = budget
    ? projects.filter(p => {
        const selected = budgetOptions.find(b => b.label === budget);
        return selected ? p.minBudget <= selected.max : true;
      })
    : projects;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Homeowner Guide</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#F8FAFC', marginBottom: 16, lineHeight: 1.1 }}>
          DFW Outdoor Living
        </h1>
        <p style={{ fontSize: 20, color: '#94A3B8', marginBottom: 48, lineHeight: 1.6 }}>
          Maximize Your Home's Outdoor Season
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
          {[
            { stat: '234', label: 'Sunny Days/Year', sub: 'vs 205 national avg', icon: '☀️' },
            { stat: '9 mo', label: 'Outdoor Season', sub: 'March through November', icon: '🌿' },
            { stat: '2.3×', label: 'National Average', sub: 'outdoor living ROI in DFW', icon: '📈' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0F2033', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F59E0B', marginBottom: 4 }}>{item.stat}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: '#64748B' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132038', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>🎯 Project Planner — Filter by Budget</h2>
          <p style={{ color: '#64748B', marginBottom: 20, fontSize: 14 }}>Select your budget to see which outdoor projects make the most sense</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {budgetOptions.map(opt => (
              <button
                key={opt.label}
                onClick={() => setBudget(budget === opt.label ? '' : opt.label)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: `2px solid ${budget === opt.label ? '#F59E0B' : '#1E3A5F'}`,
                  background: budget === opt.label ? '#F59E0B20′ : '#0F2033',
                  color: budget === opt.label ? '#F59E0B' : '#94A3B8',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F8FAFC', marginBottom: 24 }}>
          Outdoor ROI Rankings {budget ? `— ${budget}` : ''}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
          {filteredProjects.map(project => (
            <div
              key={project.rank}
              style={{ background: '#0F2033', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                <div style={{ background: '#1E3A5F', borderRadius: 8, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {project.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, background: '#1E3A5F', color: '#64748B', borderRadius: 4, padding: '2px 8px' }}>#{project.rank}</span>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F8FAFC', margin: 0 }}>{project.name}</h3>
                    <span style={{ fontSize: 13, background: '#F59E0B20', color: '#F59E0B', borderRadius: 4, padding: '2px 8px', fontWeight: 600 }}>{project.roi}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#3B82F6′ }}>{project.cost}</span>
                    <span style={{ fontSize: 14, color: '#22C55E' }}>✓ {project.useRate} use rate in DFW</span>
                  </div>
                </div>
              </div>
              <p style={{ color: '#94A3B8', lineHeight: 1.6, marginBottom: 12 }}>{project.description}</p>
              <div style={{ background: '#132038', borderRadius: 8, padding: 12, borderLeft: '3px solid #F59E0B', fontSize: 14, color: '#F59E0B' }}>
                💡 {project.tip}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132038', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F8FAFC', marginBottom: 16 }}>🌡️ DFW-Specific Outdoor Tips</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '☂️', tip: 'Always include overhead cover — intense UV + unpredictable storms make uncovered patios miserable June-September' },
              { icon: '🪨', tip: 'Use concrete, stone, or composite decking over wood — heat and humidity cycles cause wood to warp, crack, and splinter within 3-5 years' },
              { icon: '💨', tip: 'Outdoor ceiling fans are essential, not optional — a good fan makes 95°F feel like 85°F' },
              { icon: '🌧️', tip: 'Grade your outdoor drainage away from the house — DFW flash flooding can inundate patios in under 20 minutes' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ color: '#94A3B8', lineHeight: 1.6, fontSize: 15 }}>{item.tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #132038 100%)', border: '1px solid #3B82F6', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🏡</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC', marginBottom: 12 }}>Ready to Start Your Outdoor Project?</h3>
          <p style={{ color: '#94A3B8', marginBottom: 24 }}>TrustyPro connects you with verified DFW outdoor living contractors who specialize in pergolas, outdoor kitchens, decks, and pools.</p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F59E0B', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Find Outdoor Living Contractors
          </a>
        </div>

      </div>
    </div>
  );
}
