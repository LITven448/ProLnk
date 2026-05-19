import { useState } from 'react';

const topics = ['HVAC', 'Foundation', 'Roofing', 'Plumbing', 'Electrical', 'City Guides', 'Financial', 'Pro Guides'];

const resources: Record<string, { count: string; desc: string; examples: string[] }> = {
  HVAC: { count: '300+ pages', desc: 'Everything DFW homeowners need to know about heating and cooling', examples: ['AC tune-up timing guide — March vs April cost difference', 'ERCOT peak avoidance thermostat programming', 'Cedar season filter upgrade guide (MERV-11 vs MERV-13)', 'DFW HVAC contractor vetting checklist', 'Heat pump vs gas furnace in DFW climate analysis'] },
  Foundation: { count: '200+ pages', desc: 'DFW black clay foundation expertise — the most expansive soil in North America', examples: ['Foundation watering schedule by month and rainfall', 'Signs of foundation movement — early warning guide', 'Pier & beam vs slab: which needs more care in DFW', 'Drainage grading guide for DFW yards', 'Foundation repair contractor questions to ask'] },
  Roofing: { count: '150+ pages', desc: 'Storm season roofing guides for Hail Alley homeowners', examples: ['Class 4 impact-resistant shingles — cost vs insurance savings', 'Post-hail roof inspection checklist', 'Insurance claim process for hail damage', 'DFW roofer vetting — avoiding storm chasers', 'Roof lifespan by material in DFW heat'] },
  Plumbing: { count: '200+ pages', desc: 'Freeze protection and plumbing guides for DFW homes', examples: ['Pipe insulation guide — foam vs heat tape by location', 'Water main shutoff location guide by home type', 'Uri lessons — pier & beam pipe protection', 'Smart water shutoff sensors for DFW', 'Hard water and water softener guide for DFW'] },
  Electrical: { count: '150+ pages', desc: 'Generator, backup power, and electrical safety for DFW', examples: ['Generator sizing guide for DFW freeze and storm outages', 'Whole-home battery backup vs generator comparison', 'GFCI and AFCI upgrade guide for older DFW homes', 'EV charger installation guide for DFW homeowners', 'Solar panel ROI calculator for DFW sun hours'] },
  'City Guides': { count: '150+ pages', desc: 'Neighborhood-specific homeowner guides across DFW', examples: ['Frisco homeowner guide — fast-growing soil movement', 'Plano homeowner guide — older home electrical updates', 'McKinney homeowner guide — hail alley storm prep', 'Fort Worth homeowner guide — pier & beam considerations', 'Allen homeowner guide — newer construction warranty guide'] },
  Financial: { count: '100+ pages', desc: 'Home investment, insurance, and maintenance budget guides', examples: ['DFW homeowner insurance optimization guide', 'Annual maintenance budget by home age', 'ROI of preventive maintenance vs reactive repair', 'Home equity and maintenance spending correlation', 'Tax deductions for home office and rental property'] },
  'Pro Guides': { count: '200+ pages', desc: 'How to find, vet, and work with home service professionals', examples: ['How to vet a DFW contractor — 10 questions to ask', 'Red flags in home service estimates', 'Getting 3 bids — what to compare beyond price', 'Contractor licensing lookup for DFW trades', 'ProLnk verified pro network — how it works'] },
};

export default function DFWProLnkResourceIndex2026() {
  const [selected, setSelected] = useState('');
  const res = selected ? resources[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>📚 PROLNK DFW RESOURCE INDEX 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>ProLnk DFW Resource Index 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>Navigate 4,700+ pages of DFW homeowner content — organized by topic.</p>
        <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 600, marginBottom: 32 }}>Total: HVAC 300+ · Foundation 200+ · Roofing 150+ · Plumbing 200+ · Electrical 150+ · City Guides 150+ · Financial 100+ · Pro Guides 200+</div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 8 }}>🗂️ SELECT YOUR TOPIC</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {topics.map(t => (
              <button key={t} onClick={() => setSelected(t)} style={{ background: selected === t ? '#F5E642′ : '#132035', color: selected === t ? '#0A1628' : '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '10px 8px', cursor: ’pointer', fontWeight: 700, fontSize: 13 }}>{t}</button>
            ))}
          </div>
        </div>

        {res && (
          <div style={{ background: '#132035', borderRadius: 10, padding: 24, marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{selected}</div>
              <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 20 }}>{res.count}</div>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>{res.desc}</p>
            <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 8 }}>FEATURED GUIDES IN THIS CATEGORY:</div>
            {res.examples.map((ex, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
                <span style={{ color: '#F5E642′ }}>▸</span>
                <span style={{ color: '#cbd5e1', fontSize: 14 }}>{ex}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#132035', borderRadius: 10, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📚 About This Index</div>
          {['4,700+ pages covering every major DFW homeowner topic','Content written specifically for DFW climate, soil, and storm patterns','ProLnk connects you to vetted pros for every category above','All guides updated for 2026 — reflects current DFW market conditions','New guides added weekly based on homeowner questions'].map((f,i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}><span style={{ color: '#F5E642′ }}>▸</span><span style={{ color: '#cbd5e1', fontSize: 14 }}>{f}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
