import { useState } from 'react';

const dfwAreas = ['Uptown/Oak Lawn','Preston Hollow','Lakewood','Frisco','Plano','McKinney','Allen','Southlake','Colleyville','Flower Mound','Irving','Grand Prairie','Garland','Mesquite','Arlington'];
const situations = ['First time selling','Selling and buying simultaneously','Inherited property','Relocating out of DFW','Divorce sale','Investment property','Luxury home ($1M+)','Fixer-upper'];

const criteria: Record<string, string[]> = {
  'First time selling': ['Patient communicator','Education-first approach','Strong marketing reach','Negotiation coaching'],
  'Selling and buying simultaneously': ['Bridge loan knowledge','Coordination expertise','Contingency management','Strong local network'],
  'Inherited property': ['Probate experience','Estate sale coordination','As-is pricing expertise','Compassionate approach'],
  'Relocating out of DFW': ['Remote transaction capability','Fast timelines','Strong buyer network','Digital-first process'],
  'Divorce sale': ['Neutral mediator skills','Court order experience','Discreet communication','Equal party representation'],
  'Investment property': ['Cap rate analysis','Investor buyer network','Off-market connections','1031 exchange knowledge'],
  'Luxury home ($1M+)': ['Luxury marketing portfolio','High-net-worth buyer network','Premium photography standard','Global MLS exposure'],
  'Fixer-upper': ['Contractor network','Renovation ROI knowledge','Cash buyer connections','Realistic pricing'],
};

const metrics = ['List-to-sale price ratio (target: 98%+ in DFW)','Average days on market vs DFW average','Number of transactions in your zip code last 12 months','Percentage of listings that sell first time listed','Average sale price achieved vs initial list price'];

const redFlags = ['Suggests highest list price without supporting comps','Portfolio shows dark or amateur photography','Cannot name recent sold comps in your neighborhood','Pushes for 6+ month listing period upfront','Vague answers about their marketing strategy'];

const interviewQs = ['What was your list-to-sale ratio in the last 12 months?','How many homes have you sold in my zip code this year?','Walk me through your photography and marketing process.','What is your strategy if we receive no offers in the first 21 days?','Can I speak to two recent sellers you represented?'];

export default function DFWSelectingAgentGuide() {
  const [situation, setSituation] = useState('');
  const [area, setArea] = useState('');

  const agentCriteria = situation ? criteria[situation] : [];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui,sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 24px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Selecting a DFW Listing Agent</h1>
          <p style={{ color: '#CBD5E1', margin: 0 }}>What separates top DFW agents — and how to verify their track record before signing anything.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🔑 What Top DFW Agents Do Differently</h2>
          {[['📊 List Price Accuracy','They price to sell, not to impress. DFW top agents hit within 1-2% of list price consistently.'],['📅 Days on Market','Best agents average 18-28 DOM in DFW. Anything over 45 days is a signal of overpricing.'],['📸 Photography Standards','Professional HDR photography + drone + twilight shots are table stakes in DFW competitive submarkets.'],['🗺️ DFW Market Knowledge','They know which school districts move volume, which zip codes have appraisal gaps, and DFW seasonal patterns.'],['📈 Sell-to-List Ratio','Ask for their trailing 12-month ratio. Top DFW agents average 98-101% in normal market conditions.']].map(([title, desc]) => (
            <div key={title} style={{ background: '#F8FAFC', borderRadius: 8, padding: '10px 14px', marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
              <div style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🚩 Red Flags — Walk Away If You See These</h2>
          {redFlags.map(f => (
            <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 13, color: '#0A1628′ }}>
              <span style={{ color: '#EF4444', flexShrink: 0 }}>✕</span>{f}
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>🛠️ Your Situation → Agent Criteria</h2>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 10 }}>Select your situation and DFW area to get tailored criteria.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, background: '#fff', color: '#0A1628′ }}>
              <option value=''>Select your situation</option>
              {situations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={area} onChange={e => setArea(e.target.value)} style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, background: '#fff', color: '#0A1628′ }}>
              <option value=''>Select DFW area</option>
              {dfwAreas.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          {agentCriteria.length > 0 && (
            <div style={{ background: '#FFFBEA', border: '1px solid #F5E642', borderRadius: 8, padding: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Priority criteria for {situation}{area ? ` in ${area}` : ''}:</div>
              {agentCriteria.map(c => <div key={c} style={{ fontSize: 13, marginBottom: 4 }}>✅ {c}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>❓ Interview Questions to Ask Every Agent</h2>
          {interviewQs.map((q, i) => (
            <div key={i} style={{ background: '#F1F5F9', borderRadius: 7, padding: '9px 12px', marginBottom: 6, fontSize: 13 }}>
              {i + 1}. {q}
            </div>
          ))}
          <div style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>📋 Metrics to Request From Every Candidate</div>
            {metrics.map(m => <div key={m} style={{ fontSize: 13, marginBottom: 4, color: '#334155′ }}>• {m}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
