import { useState } from 'react';

const disabilityTypes = [
  { id: 'ssi', label: 'SSI / SSDI Recipient', exemptions: ['$10,000 homestead exemption for disabilities','School tax freeze (same as over-65)','Stacks with standard $40,000 homestead exemption'] },
  { id: 'va100', label: '100% VA Disability Rating', exemptions: ['100% property tax exemption — entire bill eliminated','Applies to school, city, county all portions','Surviving spouse may maintain exemption'] },
  { id: 'va70', label: '70–99% VA Disability Rating', exemptions: ['$12,000 property value exemption','Stacks with homestead and over-65 if applicable','Additional exemption for unemployable veterans'] },
  { id: 'blind', label: 'Legally Blind', exemptions: ['$10,000 disability exemption on school taxes','Stacks with homestead exemption','May qualify for both disability and over-65 but cannot claim school freeze twice'] },
  { id: 'other', label: 'Other Qualifying Disability', exemptions: ['$10,000 disability exemption (state-mandated)','Must have documentation from Social Security or physician','Applies to school district taxes'] },
];

const counties = [
  { id: 'dallas', label: 'Dallas County', form: 'Form 50-114 or 50-116', contact: 'Dallas CAD · (214) 631-0910′ },
  { id: 'tarrant', label: 'Tarrant County', form: 'Form 50-114', contact: 'Tarrant CAD · (817) 284-0024′ },
  { id: 'collin', label: 'Collin County', form: 'Form 50-114', contact: 'Collin CAD · (469) 742-9200′ },
  { id: 'denton', label: 'Denton County', form: 'Form 50-114', contact: 'Denton CAD · (940) 349-3800′ },
];

const docs: Record<string, string[]> = {
  ssi: ['SSA award letter','Texas DL or ID','Deed or property tax statement'],
  va100: ['VA award letter showing 100% rating','DD-214','Texas DL or ID','Deed or property tax statement'],
  va70: ['VA award letter showing 70–99% rating','DD-214','Texas DL'],
  blind: ['Physician certification of legal blindness','Texas DL','Deed'],
  other: ['Social Security disability determination letter OR physician letter','Texas ID','Deed or tax statement'],
};

export default function DFWDisabilityTaxExemptionGuide() {
  const [disType, setDisType] = useState<string>('');
  const [county, setCounty] = useState<string>('');
  const disChosen = disabilityTypes.find(d => d.id === disType);
  const countyChosen = counties.find(c => c.id === county);

  return (
    <div style={{ background: '#F8F9FB', minHeight: '100vh', color: '#1A2332', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#7C3AED', fontWeight: 600 }}>♿ DFW Property Tax</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Disability Property Tax Exemption Guide</h1>
        <p style={{ color: '#64748B', marginBottom: 24, fontSize: 15 }}>Texas provides significant property tax exemptions for homeowners with qualifying disabilities. Understand what you qualify for, what documents you need, and how to apply at your county appraisal district.</p>

        <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 10, padding: '14px 18px', marginBottom: 28, fontSize: 14, color: '#4C1D95′ }}>
          <strong>Key difference from over-65:</strong> The disability exemption applies to the $10,000 school exemption only (not a freeze). However, 100% VA-rated veterans get a full exemption across all tax portions. You cannot claim both the disability and over-65 school freeze simultaneously — use whichever benefits you more.
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>🔍 Select Your Disability Type</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {disabilityTypes.map(d => (
            <div key={d.id} onClick={() => setDisType(d.id)} style={{ background: disType === d.id ? '#F5F3FF' : '#FFFFFF', border: `1px solid ${disType === d.id ? '#7C3AED' : '#E2E8F0'}`, borderRadius: 10, padding: '14px 16px', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{d.label}</div>
              {disType === d.id && d.exemptions.map((e, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#374151', marginTop: 4 }}><span style={{ color: '#7C3AED' }}>✓</span>{e}</div>
              ))}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>📍 Your DFW County</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
          {counties.map(c => (
            <div key={c.id} onClick={() => setCounty(c.id)} style={{ background: county === c.id ? '#F5F3FF' : '#FFFFFF', border: `1px solid ${county === c.id ? '#7C3AED' : '#E2E8F0'}`, borderRadius: 10, padding: '14px 16px', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{c.contact}</div>
            </div>
          ))}
        </div>

        {disChosen && countyChosen && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>📋 Application Guide — {countyChosen.label}</h3>
            <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13 }}>
              <strong>Form needed:</strong> {countyChosen.form} · <strong>Contact:</strong> {countyChosen.contact}
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Required Documents:</div>
            {(docs[disChosen.id] || []).map((doc, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: '#374151', marginBottom: 8 }}><span style={{ color: '#7C3AED' }}>→</span>{doc}</div>
            ))}
            <div style={{ marginTop: 16, background: '#F5F3FF', borderRadius: 8, padding: 12, fontSize: 13, color: '#4C1D95′ }}>
              💡 Estimated savings: $10,000 exemption = ~$250–$450/yr reduction in school taxes. 100% VA exemption = full bill eliminated (avg $4,000–$12,000/yr in DFW).
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
