import { useState } from 'react';

const situations = ['All', 'New Owner', 'Long-Term Owner', 'Senior/Disabled', 'Protesting', 'Exemptions'];

const faqs = [
  { situation: 'Protesting', q: 'When is the property tax protest deadline in DFW?', a: 'May 15 or 30 days after your Notice of Appraised Value is mailed — whichever is later. Tarrant County and Dallas County typically mail notices in April. File your protest online at your county appraisal district website as soon as you receive notice.' },
  { situation: 'Protesting', q: 'What evidence do I need to protest my appraisal?', a: 'Comparable sales (homes similar to yours that sold for less than your appraised value), a recent appraisal report, photos of property defects, repair estimates, or evidence of unequal appraisal compared to similar nearby homes. Pull comps from the CAD website — they are free.' },
  { situation: 'Long-Term Owner', q: 'How much can my appraisal increase each year on homestead?', a: 'Texas caps homestead appraisal increases at 10% per year regardless of market value. If your home is worth $600,000 but was appraised at $400,000 last year, your new appraised value cannot exceed $440,000. This cap only applies if you have a homestead exemption filed.' },
  { situation: 'Senior/Disabled', q: 'What is the over-65 freeze and how does it work?', a: 'Once you turn 65 and file for the over-65 exemption, your school district taxes are frozen at that year\’s amount. The freeze does not apply to city or county taxes. It transfers if you move to a new home in Texas. File at your county appraisal district after your 65th birthday.' },
  { situation: 'Exemptions', q: 'How do I file a homestead exemption in DFW?', a: 'File with your county appraisal district (DCAD for Dallas, TCAD for Tarrant, etc.) by April 30. You need your Texas driver\’s license with your property address. You can now file online. The exemption reduces your taxable value by $100,000 for school district taxes and saves most DFW homeowners $1,200-$2,500/year.' },
  { situation: 'New Owner', q: 'When does the homestead exemption take effect?', a: 'You can now file January 1 of the year you purchase and occupy the home (Texas changed this in 2022). Previously you had to wait until January 1 of the following year. File as soon as you move in and update your drivers license to the new address.' },
  { situation: 'Protesting', q: 'What is informal vs formal protest hearing?', a: 'Informal: a one-on-one meeting with an appraiser where you present evidence and negotiate. Most protests are settled here. Formal: an Appraisal Review Board (ARB) panel hearing if the informal fails. Informal settlements are typically faster and sufficient for most homeowners.' },
  { situation: 'Long-Term Owner', q: 'What happens to my taxes when I sell my home?', a: 'Taxes are prorated at closing based on the prior year tax rate applied to the current year. Your homestead exemption and freeze do not transfer to the buyer. The buyer must file their own homestead exemption the following year.' },
  { situation: 'Senior/Disabled', q: 'Can I defer property taxes if I cannot pay?', a: 'Yes — Texas allows homeowners 65+ or disabled to defer property tax payments. Interest accrues at 5% annually. The deferral ends when the property is sold or no longer qualifies. File a deferral affidavit with your county appraisal district.' },
  { situation: 'Protesting', q: 'Should I hire a property tax consultant to protest?', a: 'For residential properties, most homeowners can protest successfully themselves using the county CAD website. Consultants work on contingency (25-40% of savings) and make sense for high-value properties ($500K+) or commercial. For average DFW homes, DIY protest is very effective.' },
  { situation: 'Exemptions', q: 'What other exemptions are available to DFW homeowners?', a: 'Disabled veteran exemption (100% disabled = 100% exemption). Agricultural exemption (requires active ag use). Historic site exemption. Pollution control exemption. Solar panel exemption in some counties. Check with your specific county CAD for all available exemptions.' },
  { situation: 'New Owner', q: 'Why are my first-year taxes different from what the seller paid?', a: 'The homestead exemption and freeze are personal to the seller. When you buy, the property is taxed at full market value with no exemptions until you file your own. New owners often see a significant tax increase in the first year. This is expected and legal.' },
  { situation: 'Long-Term Owner', q: 'What DFW county has the highest property tax rate?', a: 'Tarrant County cities generally have higher combined rates (school + city + county) than Dallas County suburbs. DFW overall rates range from $1.80 to $2.80 per $100 of assessed value. Frisco and Prosper tend to be lower; Arlington and Irving tend to be higher.' },
  { situation: 'Protesting', q: 'How long does the protest process take in DFW?', a: 'If settled informally: 30-60 minutes plus 2-4 weeks for processing. Formal ARB hearing: may not occur until July-August. The appraisal district must notify you of your hearing date at least 15 days in advance. Most DFW protests filed by May are resolved by August.' },
  { situation: 'Exemptions', q: 'Do I need to refile my homestead exemption every year?', a: 'No — once approved, the homestead exemption stays on your property until you sell, move, or request removal. However, if you change your address on your drivers license or the CAD sends a verification letter, respond promptly to maintain your exemption status.' },
];

export default function DFWPropertyTaxFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [activeSituation, setActiveSituation] = useState('All');
  const filtered = activeSituation === 'All' ? faqs : faqs.filter(f => f.situation === activeSituation);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏛️</div>
          <h1 style={{ color: '#0A1628', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Property Tax FAQ</h1>
          <p style={{ color: '#64748b', fontSize: 16, margin: 0 }}>15 essential questions about property taxes in Dallas-Fort Worth</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #e2e8f0′ }}>
          <p style={{ color: '#0A1628', fontWeight: 700, margin: '0 0 12px', fontSize: 14 }}>🎯 FILTER BY YOUR SITUATION</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {situations.map(s => (
              <button key={s} onClick={() => { setActiveSituation(s); setOpen(null); }}
                style={{ padding: '7px 16px', borderRadius: 20, border: activeSituation === s ? 'none' : '1px solid #e2e8f0', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: activeSituation === s ? '#0A1628′ : '#fff', color: activeSituation === s ? '#F5E642' : '#475569' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((faq, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', border: open === i ? '2px solid #0A1628′ : '1px solid #e2e8f0' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#0A1628', background: '#F5E642', padding: '2px 8px', borderRadius: 10, marginRight: 10 }}>{faq.situation}</span>
                  <span style={{ color: '#0f172a', fontSize: 15, fontWeight: 600 }}>{faq.q}</span>
                </div>
                <span style={{ color: '#0A1628', fontSize: 18, marginLeft: 12 }}>{open === i ? '▲' : '▼'}</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 20px 16px', color: '#475569', fontSize: 14, lineHeight: 1.7, borderTop: '1px solid #f1f5f9′ }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, padding: 20, background: '#0A1628', borderRadius: 10, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 6px' }}>🏠 Maximize your home investment</p>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>ProLnk connects DFW homeowners with licensed pros to maintain and improve property value.</p>
        </div>
      </div>
    </div>
  );
}
