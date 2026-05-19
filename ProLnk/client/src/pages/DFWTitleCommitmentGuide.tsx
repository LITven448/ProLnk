import { useState } from 'react';

const CONCERNS = [
  { concern: 'I see an easement listed — should I worry?', schedule: 'Schedule B-2', meaning: 'Easements are permanent rights others have to use part of your property (utility lines, drainage, access). Most are routine. The concern is when an easement runs through your planned building footprint or affects property access.', action: ['Ask the title company for a copy of the easement document', 'Have your survey show the easement location', 'Ask: does this affect my planned use of the property?', 'Utility easements along property lines are almost always fine'] },
  { concern: 'There is an HOA covenant listed — what does that mean?', schedule: 'Schedule B-2', meaning: 'HOA declarations and restrictions are listed as exceptions — title insurance does not cover violations. You must read the HOA documents separately (provided in the option period via TREC Addendum for Property Subject to HOA).',action: ['Request HOA documents within option period', 'Review restrictions: fences, outbuildings, parking, rentals', 'Confirm HOA transfer fees and dues are current', 'Verify no pending HOA violations from seller'] },
  { concern: 'There are outstanding liens on Schedule B-2', schedule: 'Schedule B-2', meaning: 'Liens must be paid off and released before or at closing. Your title company should require the seller to clear all liens. Unpaid property taxes, contractor liens (mechanic’s liens), and HOA assessment liens are the most common in DFW.',action: ['Title company will require payoff letters from lienholders', 'Confirm all liens appear on closing disclosure', 'Do not close if any Schedule B-2 liens are still outstanding', 'Get written confirmation of lien release after closing'] },
  { concern: 'Schedule A shows a different ownership name than the seller', schedule: 'Schedule A', meaning: 'Schedule A lists the current vested owner. If the seller’s name does not match, there may be an estate, trust, divorce, or probate issue that must be resolved before they can legally sell.',action: ['Alert your realtor and title company immediately', 'Seller may need to provide death certificate, probate order, or trust documents', 'Do not waive this — title cannot pass from someone who does not own it', 'Allow extra time if probate is involved (can take weeks)'] },
  { concern: 'B-1 shows requirements I need to meet before closing', schedule: 'Schedule B-1', meaning: 'Schedule B-1 are requirements that must be satisfied to issue final title insurance. Common items: pay off existing mortgage, release existing liens, provide affidavit of marital status, correct deed errors.',action: ['Review B-1 at contract — confirm items are achievable', 'Track completion of each requirement before closing', 'Title company will not close until all B-1 items are cleared', 'Most B-1 items are handled automatically by the title company'] },
  { concern: 'There is a survey exception — what does that mean?', schedule: 'Schedule B-2', meaning: 'The standard survey exception means title insurance does not cover boundary disputes, encroachments, or easements that would be revealed by an accurate survey. You can remove this exception by providing a new survey.',action: ['Order a survey during option period', 'Negotiate with seller to pay for survey or share cost', 'New survey allows title company to remove or limit the exception', 'ALTA survey provides the most comprehensive coverage'] },
];

const TIMELINE = [
  { day: 'Day 1-3', event: 'Title commitment ordered by title company after contract execution' },
  { day: 'Day 5-7', event: 'Preliminary title commitment issued — review Schedules A, B-1, B-2' },
  { day: 'Day 7-14', event: 'Curative work begins: paying off liens, getting releases, fixing title defects' },
  { day: 'Day 14-25', event: 'Survey received and reviewed (if ordered)' },
  { day: 'Day 25-30', event: 'Final title commitment issued — all B-1 requirements cleared' },
  { day: 'Closing Day', event: 'Title policy issued, title insurance becomes effective upon recording' },
];

export default function DFWTitleCommitmentGuide() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('concerns');

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🛡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Title Commitment Guide</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Schedule A, B-1, B-2 decoded — and what exceptions to watch for in Dallas-Fort Worth</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
          {[['Schedule A','Who owns it, loan amount, how title is being taken'],['Schedule B-1','Requirements that must be met before title insurance is issued'],['Schedule B-2','Exceptions — things title insurance does NOT cover']].map(([name,desc],i)=>(
            <div key={i} style={{ background: ['#F0FDF4','#FFF9E6','#FEF2F2'][i], borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: ['#166534','#92400E','#991B1B'][i], fontSize: 15 }}>{name}</div>
              <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {['concerns','timeline'].map(tab=>(
            <button key={tab} onClick={()=>{setActiveTab(tab);setSelected(null);}}
              style={{ padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
                background: activeTab===tab ? '#F5E642' : '#fff', color: activeTab===tab ? '#0A1628' : '#64748B' }}>
              {tab==='concerns' ? '❓ Common Concerns' : '📅 Timeline'}
            </button>
          ))}
        </div>

        {activeTab==='concerns' && (
          <div style={{ display: 'grid', gap: 12 }}>
            {CONCERNS.map((c,i)=>(
              <div key={i} onClick={()=>setSelected(selected===i?null:i)}
                style={{ background: '#fff', borderRadius: 10, padding: '1.2rem', cursor: 'pointer',
                  border: selected===i ? '2px solid #F5E642' : '2px solid transparent', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#0A1628', flex: 1 }}>{c.concern}</div>
                  <div style={{ background: c.schedule==='Schedule B-2'?'#FEF2F2':c.schedule==='Schedule A'?'#F0FDF4':'#FFF9E6',
                    color: c.schedule==='Schedule B-2'?'#991B1B':c.schedule==='Schedule A'?'#166534':'#92400E',
                    padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, marginLeft: 12, whiteSpace: 'nowrap' }}>
                    {c.schedule}
                  </div>
                </div>
                {selected===i && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '0.8rem', fontSize: 14, color: '#334155', lineHeight: 1.6, marginBottom: 12 }}>{c.meaning}</div>
                    <div style={{ background: '#F0FDF4', borderRadius: 8, padding: '0.8rem' }}>
                      <div style={{ fontWeight: 700, color: '#166534', fontSize: 12, marginBottom: 6 }}>✅ WHAT TO DO</div>
                      {c.action.map((a,j)=><div key={j} style={{ fontSize: 13, color: '#166534', marginBottom: 4 }}>• {a}</div>)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab==='timeline' && (
          <div style={{ display: 'grid', gap: 12 }}>
            {TIMELINE.map((t,i)=>(
              <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: 8, padding: '4px 12px', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>{t.day}</div>
                <div style={{ color: '#334155', fontSize: 14, lineHeight: 1.6 }}>{t.event}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.2rem', marginTop: 24, textAlign: 'center' }}>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>🛡️ Always purchase Owner's Title Insurance in addition to the Lender's policy. It's a one-time premium that protects you forever.</div>
        </div>
      </div>
    </div>
  );
}
