import { useState } from 'react';

const tradeItems = [
  { id: 'demo', label: 'Demolition / Tearout', order: 1, conflicts: ['framing', 'mep_rough'], note: 'Must complete before any new construction begins.' },
  { id: 'foundation', label: 'Foundation Work', order: 2, conflicts: ['framing'], note: 'Any foundation repairs must be done before framing above.' },
  { id: 'framing', label: 'Framing / Structural', order: 3, conflicts: ['insulation', 'drywall'], note: 'Must pass framing inspection before enclosing walls.' },
  { id: 'roofing', label: 'Roofing', order: 4, conflicts: ['insulation'], note: 'Roof should be weather-tight before interior trades begin.' },
  { id: 'windows', label: 'Window / Door Install', order: 4, conflicts: ['insulation', 'drywall'], note: 'Install after framing, before insulation and drywall.' },
  { id: 'mep_rough', label: 'MEP Rough-In (Plumbing, Electric, HVAC)', order: 5, conflicts: ['insulation', 'drywall'], note: 'All three trades must rough in and pass inspection before closing walls.' },
  { id: 'insulation', label: 'Insulation', order: 6, conflicts: ['drywall'], note: 'Insulation inspection required before drywall in most cities.' },
  { id: 'drywall', label: 'Drywall / Sheetrock', order: 7, conflicts: ['flooring', 'tile'], note: 'Hang and tape before any finish flooring starts.' },
  { id: 'tile', label: 'Tile Work', order: 8, conflicts: ['paint'], note: 'Tile before paint in wet areas. Allow cure time before grouting.' },
  { id: 'cabinets', label: 'Cabinets / Millwork', order: 8, conflicts: ['countertops', 'paint'], note: 'Install cabinets before countertops and after drywall finish.' },
  { id: 'paint', label: 'Painting (Interior)', order: 9, conflicts: ['flooring', 'trim', 'fixtures'], note: 'Paint walls before finish flooring is installed to protect floors.' },
  { id: 'flooring', label: 'Finish Flooring', order: 10, conflicts: ['trim', 'fixtures'], note: 'Install flooring before base trim and finish fixtures.' },
  { id: 'countertops', label: 'Countertops', order: 10, conflicts: ['fixtures'], note: 'Template after cabinets, install before plumbing fixtures.' },
  { id: 'trim', label: 'Trim / Base / Casings', order: 11, conflicts: ['fixtures'], note: 'Install trim after flooring, before finish hardware.' },
  { id: 'fixtures', label: 'Plumbing & Electrical Fixtures', order: 12, conflicts: [], note: 'Final step — set fixtures, connect devices, test all systems.' },
  { id: 'punch', label: 'Punch List / Final Inspection', order: 13, conflicts: [], note: 'Walk every trade\’s work before final release of holdbacks.' },
];

export default function MultipleContractorProjectGuide() {
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [showSequence, setShowSequence] = useState(false);

  const toggle = (id: string) => {
    setSelectedTrades(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selected = tradeItems.filter(t => selectedTrades.includes(t.id));
  const sorted = [...selected].sort((a, b) => a.order - b.order);

  const conflicts: string[] = [];
  selected.forEach(t => {
    t.conflicts.forEach(cId => {
      if (selectedTrades.includes(cId)) {
        const conflictTrade = tradeItems.find(x => x.id === cId);
        const key = [t.label, conflictTrade?.label].sort().join(' + ');
        if (!conflicts.includes(key)) conflicts.push(key);
      }
    });
  });

  const needsGC = selected.length >= 5 || conflicts.length >= 2;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#FFFFFF', fontFamily: 'sans-serif', padding: '0 0 60px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ padding: '48px 0 32px' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            🏗️ ProLnk Homeowner Guide
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
            Managing Multiple Contractors: A Homeowner's Playbook
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7 }}>
            Self-managing multiple trades can save 15–25% over hiring a general contractor — but only if you know the sequence, dependencies, and how to handle disputes.
          </p>
        </div>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>👷 GC vs. Self-Managing: The Real Tradeoff</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ backgroundColor: '#132040', borderRadius: 12, padding: '24px' }}>
              <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>✅ Self-Manage When:</h3>
              {[
                'Project has 3 or fewer trade scopes',
                'You have time for daily site oversight',
                'Each trade\’s scope is clearly independent',
                'You\’ve done this project type before',
                'Saving 15–25% on overhead is material to your budget',
              ].map(i => <div key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '6px 0', borderBottom: '1px solid #1E2D45' }}>{i}</div>)}
            </div>
            <div style={{ backgroundColor: '#132040', borderRadius: 12, padding: '24px' }}>
              <h3 style={{ color: '#f87171', fontWeight: 700, marginBottom: 14 }}>❌ Hire a GC When:</h3>
              {[
                'Project involves 5+ separate trade scopes',
                'You travel or can\’t be on-site daily',
                'Structural or MEP work is involved',
                'Project requires multiple permits and inspections',
                'Budget exceeds $75K — coordination risk compounds',
              ].map(i => <div key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '6px 0', borderBottom: '1px solid #1E2D45' }}>{i}</div>)}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📐 The Standard Construction Sequence</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.8, marginBottom: 20 }}>
            The order of trades is not arbitrary — it's driven by physics, inspection requirements, and irreversibility. Getting the sequence wrong means paying twice.
          </p>
          {[
            ['Phase 1: Site Prep', ['Demo / tearout', 'Foundation repairs (if any)', 'Rough grading / drainage']],
            ['Phase 2: Structure', ['Framing (walls, roof structure)', 'Roofing (weather-tight shell)', 'Windows and exterior doors']],
            ['Phase 3: Rough-In (Must all pass inspection before closing walls)', ['Rough plumbing', 'Rough electrical', 'HVAC ductwork and rough-in', 'Low-voltage / data / security rough']],
            ['Phase 4: Close Walls', ['Insulation (inspection first)', 'Drywall hang', 'Tape, float, texture']],
            ['Phase 5: Finish Work', ['Tile (wet areas)', 'Cabinets and millwork', 'Interior paint', 'Finish flooring', 'Countertops', 'Trim and base']],
            ['Phase 6: Final', ['Plumbing fixtures', 'Electrical fixtures and devices', 'HVAC registers and trim', 'Final inspections', 'Punch list']],
          ].map(([phase, items]) => (
            <div key={phase as string} style={{ backgroundColor: '#132040', borderRadius: 10, padding: '18px 22px', marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>{phase}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {(items as string[]).map(item => (
                  <span key={item} style={{ backgroundColor: '#0A1628', color: '#CBD5E1', borderRadius: 6, padding: '4px 12px', fontSize: 13 }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>⚡ Managing Scheduling Conflicts</h2>
          {[
            ['Build buffer into every milestone', 'Any contractor will take longer than estimated. Build 10–15% schedule buffer at every phase transition, especially before inspections.'],
            ['Never let one trade hold another\’s check', 'If the plumber finishes rough-in but the electrician is delayed, the plumber still gets paid. Don\’t chain payments across trades.'],
            ['Confirm inspections before scheduling next trade', 'Never let Trade B start until Trade A\’s inspection is officially passed. One failed inspection cascades into weeks of delay.'],
            ['Get a weekly schedule commitment in writing', 'At the start of each week, email every active contractor to confirm their days on-site and scope for the week. This creates accountability.'],
          ].map(([tip, detail]) => (
            <div key={tip as string} style={{ backgroundColor: '#0D2240', borderRadius: 10, padding: '18px 22px', marginBottom: 10 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>💡 {tip}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{detail}</div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>⚠️ Scope Overlap Disputes</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.8, marginBottom: 16 }}>
            The #1 cause of multi-contractor project failures is undefined scope at the boundary between trades. Every contractor needs to know exactly where their scope ends and the next one begins.
          </p>
          {[
            ['Drywall vs. Tile', 'Who installs the cement board behind the tile? Define it. Drywall crew says it\’s tile\’s job. Tile crew says it\’s drywall\’s job.'],
            ['Plumber vs. HVAC', 'Who installs the condensate drain line for the AC? Both trades touch it. Define ownership in each contract.'],
            ['Electrician vs. Low-Voltage', 'Who runs wire for the thermostat? Who installs the panel for the security system? Define both.'],
            ['GC vs. Homeowner-Supplied Materials', 'If you supply fixtures or appliances, define who is responsible if they arrive damaged and who is responsible for installation defects.'],
          ].map(([overlap, detail]) => (
            <div key={overlap as string} style={{ backgroundColor: '#1a0a0a', borderRadius: 10, padding: '16px 20px', marginBottom: 10, border: '1px solid #3a1515' }}>
              <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>⚠️ {overlap}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{detail}</div>
            </div>
          ))}
        </section>

        <section style={{ backgroundColor: '#0D2240', borderRadius: 16, padding: '32px', marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔧 Project Sequence Planner</h2>
          <p style={{ color: '#94A3B8', marginBottom: 24 }}>Select every trade scope in your project. We'll show you the correct sequence, flag conflicts, and tell you whether you should self-manage or hire a GC.</p>

          <div style={{ marginBottom: 24 }}>
            {tradeItems.map(t => (
              <label key={t.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid #1E2D45' }}>
                <input
                  type="checkbox"
                  checked={selectedTrades.includes(t.id)}
                  onChange={() => toggle(t.id)}
                  style={{ width: 18, height: 18, accentColor: '#F5E642', cursor: 'pointer', marginTop: 2 }}
                />
                <div>
                  <div style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 600 }}>{t.label}</div>
                  <div style={{ color: '#64748B', fontSize: 12 }}>Phase {t.order}</div>
                </div>
              </label>
            ))}
          </div>

          <button
            onClick={() => setShowSequence(true)}
            disabled={selectedTrades.length === 0}
            style={{
              backgroundColor: selectedTrades.length > 0 ? '#F5E642' : '#1E2D45',
              color: selectedTrades.length > 0 ? '#0A1628' : '#475569',
              border: 'none', borderRadius: 8, padding: '14px 28px',
              fontWeight: 700, fontSize: 15, cursor: selectedTrades.length > 0 ? 'pointer' : 'not-allowed', marginBottom: 24,
            }}
          >
            Generate My Sequence Plan →
          </button>

          {showSequence && selected.length > 0 && (
            <div style={{ backgroundColor: '#081525', borderRadius: 12, padding: '24px' }}>
              <div style={{ marginBottom: 20, padding: '14px 18px', borderRadius: 8, backgroundColor: needsGC ? '#1a0a0a' : '#0a1f0a', border: `1px solid ${needsGC ? '#5a1a1a' : '#1a5a1a'}` }}>
                <div style={{ fontWeight: 700, color: needsGC ? '#f87171' : '#4ade80', fontSize: 16 }}>
                  {needsGC ? '⚠️ Recommendation: Hire a General Contractor' : '✅ Recommendation: You can self-manage this project'}
                </div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 6 }}>
                  {needsGC
                    ? `${selected.length} trade scopes with ${conflicts.length} scheduling dependency conflict(s) — this level of coordination risk warrants a GC.`
                    : `${selected.length} trade scopes with manageable dependencies. Use the sequence below and confirm inspections before advancing each phase.`}
                </div>
              </div>

              <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 14 }}>Recommended Sequence:</div>
              {sorted.map((t, i) => (
                <div key={t.id} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid #1E2D45' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, minWidth: 28, fontSize: 16 }}>{i + 1}</div>
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600 }}>{t.label}</div>
                    <div style={{ color: '#64748B', fontSize: 13, marginTop: 3 }}>💡 {t.note}</div>
                  </div>
                </div>
              ))}

              {conflicts.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 10 }}>⚠️ Scheduling Dependencies to Coordinate:</div>
                  {conflicts.map((c, i) => (
                    <div key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '8px 0', borderBottom: '1px solid #1E2D45' }}>
                      🔗 {c} — these trades must be sequenced and cannot overlap
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
