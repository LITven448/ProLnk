import { useState } from 'react';

const journeys = [
  {
    situation: 'Bad credit, no savings',
    headline: '"I thought DFW was out of reach. 14 months later I had keys."',
    buyer: 'Alicia M., McKinney',
    creditStart: '588',
    creditEnd: '672',
    downPayment: 'TSAHC DPA 5% grant',
    purchasePrice: '$289,000',
    monthlyPayment: '$1,847/mo',
    timeline: '14 months credit-to-close',
    story: 'Alicia had a 588 score and $1,200 in savings when she decided to get serious. She enrolled in a free HUD-approved credit counseling program, paid off two collections ($1,400 total), and added herself as an authorized user on her sister\’s credit card. 8 months later she was at 672. She found a McKinney starter home through a ProLnk partner network contact and used the Texas State Affordable Housing Corporation\’s 5% down payment assistance grant. She closed with $0 out of pocket on the down payment.',
    wishTheyKnew: 'Collections under $500 often fall off faster than expected. Paying them in full with a "pay for delete" letter is faster than disputing. Also — HUD counseling is free and most people skip it. Don\’t.',
  },
  {
    situation: 'Good income, no credit history',
    headline: '"High earner, zero credit score. Took 9 months to get mortgage-ready."',
    buyer: 'Daniel K., Allen',
    creditStart: 'No score',
    creditEnd: '701',
    downPayment: '3.5% FHA ($12,600)',
    purchasePrice: '$360,000',
    monthlyPayment: '$2,290/mo',
    timeline: '9 months',
    story: 'Daniel earned $94,000 a year as a software contractor but had never had a credit card. He had no score at all. His loan officer told him to open 2 secured cards, set them up for auto-pay, and wait. 9 months later he had a 701. He qualified for an FHA loan at 3.5% down and bought a 3-bed home in Allen. The $360,000 purchase was $40K under his max approval.',
    wishTheyKnew: 'Secured cards from a credit union report faster than most bank cards. OpenSky and NFCU are favorites. You don\’t need a high limit — you just need consistent on-time payments.',
  },
  {
    situation: 'Relocating from high-cost city',
    headline: '"Moved from LA. Bought a bigger house for half the price."',
    buyer: 'The Ramos Family, Frisco',
    creditStart: '744',
    creditEnd: '744',
    downPayment: '20% ($86,000)',
    purchasePrice: '$430,000',
    monthlyPayment: '$2,780/mo',
    timeline: '60 days from arrival to close',
    story: 'The Ramos family sold their Culver City condo for $820,000 and moved to Frisco. Their LA equity became a 20% down payment with cash left over. They closed in 60 days. Their Frisco home is 2,400 sq ft — three times the size of their LA condo — at 60% of the monthly payment. First year lessons: HOA fees were higher than expected and DFW property tax ($8,600/yr) was a shock after California\’s Prop 13 cap.',
    wishTheyKnew: 'DFW property taxes are 2–2.7% of assessed value and reassess every year. Run the full PITI (principal, interest, tax, insurance) not just the mortgage payment. We were $430/mo off in our initial budget.',
  },
  {
    situation: 'Buying after divorce',
    headline: '"Bought my first-ever home alone at 41."',
    buyer: 'Sandra H., Garland',
    creditStart: '618',
    creditEnd: '688',
    downPayment: 'SETH grant (5%)',
    purchasePrice: '$265,000',
    monthlyPayment: '$1,790/mo',
    timeline: '11 months',
    story: 'Sandra\’s credit was tangled up in joint accounts from her marriage. She had to dispute 4 incorrect entries, get removed from her ex-husband\’s accounts, and rebuild her solo credit profile. 11 months of disciplined work got her to 688. She used the Southeast Texas Housing Finance Corporation 5% grant and bought a 3-bedroom in Garland — her first home in her own name only. She described closing day as the best day of her life.',
    wishTheyKnew: 'Joint account removal takes longer than you expect. Start the process immediately after separation, not when you start house hunting. Also — grants like SETH have income limits that change. Check current limits early.',
  },
];

export default function DFWFirstHomeBuyerSuccessStory() {
  const [selected, setSelected] = useState(0);
  const j = journeys[selected];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          FIRST-TIME BUYER STORIES — DFW
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>"I Can't Afford DFW" — Then They Bought a Home Here</h1>
        <p style={{ color: '#4B5563', marginBottom: 28 }}>Four real journeys from "not ready" to keys in hand. Select the situation that matches yours.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {journeys.map((j, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              padding: '8px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12,
              backgroundColor: selected === i ? '#0A1628′ : '#E5E7EB', color: selected === i ? '#F5E642' : '#0A1628',
            }}>
              {j.situation}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <div style={{ fontStyle: 'italic', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{j.headline}</div>
          <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 20 }}>— {j.buyer}</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 20 }}>
            {[
              ['Credit Start', j.creditStart],
              ['Credit End', j.creditEnd],
              ['Down Payment', j.downPayment],
              ['Purchase Price', j.purchasePrice],
              ['Monthly Payment', j.monthlyPayment],
              ['Timeline', j.timeline],
            ].map(([label, value]) => (
              <div key={label} style={{ backgroundColor: '#F3F4F6', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ color: '#6B7280', fontSize: 11, marginBottom: 2 }}>{label}</div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{value}</div>
              </div>
            ))}
          </div>

          <p style={{ lineHeight: 1.8, marginBottom: 20, color: '#374151′ }}>{j.story}</p>

          <div style={{ backgroundColor: '#FAFAFA', borderLeft: '3px solid #F5E642', padding: '12px 16px', borderRadius: 4 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>💡 What They Wish They Knew</div>
            <p style={{ margin: 0, lineHeight: 1.7, color: '#374151′ }}>{j.wishTheyKnew}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0A1628', borderRadius: 12, padding: 24, color: '#fff' }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600 }}>Once you're in your home, ProLnk helps you maintain it. Get 3 contractor quotes for any home need.</p>
          <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 6, display: 'inline-block', fontWeight: 700, cursor: 'pointer' }}>
            Get Started Free at prolnk.io →
          </div>
        </div>
      </div>
    </div>
  );
}
