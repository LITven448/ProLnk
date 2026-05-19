import { useState } from 'react';

type Contingency = 'Financing' | 'Inspection' | 'Appraisal' | 'Sale of Home' | 'None (Cash/Waived)';

const contingencyWeights: Record<Contingency, number> = {
  'None (Cash/Waived)': 35,
  'Financing': 15,
  'Inspection': 10,
  'Appraisal': 10,
  'Sale of Home': -15,
};

const contingencyNotes: Record<Contingency, string> = {
  'None (Cash/Waived)': 'Strongest signal. Cash or waived contingency offers in DFW often win at lower prices.',
  'Financing': 'Standard — request pre-approval letter and lender contact. Pre-underwritten preferred.',
  'Inspection': 'Expect inspection requests. Texas option period (7–10 days) gives buyers broad exit rights.',
  'Appraisal': 'With DFW values volatile post-2023, appraisal gaps are common. Ask if buyer will cover gap.',
  'Sale of Home': 'Weakest contingency in DFW. Only accept if your home has been on market 30+ days.',
};

export default function DFWOfferReviewGuide() {
  const [offerAmount, setOfferAmount] = useState('');
  const [listPrice, setListPrice] = useState('');
  const [closeTimeline, setCloseTimeline] = useState('');
  const [earnestMoney, setEarnestMoney] = useState('');
  const [optionFee, setOptionFee] = useState('');
  const [optionDays, setOptionDays] = useState('');
  const [selectedContingencies, setSelectedContingencies] = useState<Contingency[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggleContingency = (c: Contingency) => {
    setSelectedContingencies(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
    setShowResult(false);
  };

  const calculate = () => {
    if (offerAmount && listPrice) setShowResult(true);
  };

  const getScore = () => {
    if (!offerAmount || !listPrice) return null;
    const offer = parseFloat(offerAmount.replace(/[^0-9.]/g, ''));
    const list = parseFloat(listPrice.replace(/[^0-9.]/g, ''));
    const em = parseFloat(earnestMoney.replace(/[^0-9.]/g, '')) || 0;
    const optFee = parseFloat(optionFee.replace(/[^0-9.]/g, '')) || 0;
    const days = parseInt(optionDays) || 10;
    const close = parseInt(closeTimeline) || 30;

    let score = 50;
    const offerPct = (offer / list) * 100;
    if (offerPct >= 105) score += 25;
    else if (offerPct >= 100) score += 15;
    else if (offerPct >= 97) score += 5;
    else if (offerPct < 93) score -= 20;
    else score -= 10;

    if (close <= 21) score += 15;
    else if (close <= 30) score += 8;
    else if (close > 45) score -= 10;

    const emPct = (em / offer) * 100;
    if (emPct >= 1.5) score += 10;
    else if (emPct >= 1) score += 5;
    else score -= 5;

    if (optFee >= 300) score += 8;
    else if (optFee >= 100) score += 3;
    else score -= 5;

    if (days <= 5) score += 5;
    else if (days > 10) score -= 5;

    selectedContingencies.forEach(c => { score += contingencyWeights[c]; });

    const pct = Math.round(offerPct * 10) / 10;
    score = Math.max(10, Math.min(100, score));

    let strength: string;
    let color: string;
    let advice: string;
    if (score >= 80) { strength = 'Strong Offer'; color = '#4ade80'; advice = 'Accept or counter minimally. Strong terms across the board.'; }
    else if (score >= 60) { strength = 'Solid Offer'; color = '#F5E642'; advice = 'Consider countering on price or option period. Terms are workable.'; }
    else if (score >= 40) { strength = 'Weak Offer'; color = '#fb923c'; advice = 'Counter on price, close timeline, and earnest money. Contingencies are a concern.'; }
    else { strength = 'Pass or Heavy Counter'; color = '#f87171'; advice = 'This offer has too many risk factors for DFW market conditions. Counter aggressively or decline.'; }

    return { score, offer, list, pct, close, em, emPct, optFee, days, strength, color, advice };
  };

  const r = showResult ? getScore() : null;

  const contingencies: Contingency[] = ['None (Cash/Waived)', 'Financing', 'Inspection', 'Appraisal', 'Sale of Home'];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW Offer Review Guide
          </h1>
          <p style={{ fontSize: 18, color: '#9aa5b4', maxWidth: 620, margin: '0 auto' }}>
            How to evaluate home purchase offers in the DFW market — price, terms, contingencies, and Texas-specific factors.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
          <div style={{ backgroundColor: '#1a2a40', borderRadius: 16, padding: 28, border: '1px solid #2a3a50′ }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎯 Price vs Terms in DFW</h2>
            <p style={{ color: '#9aa5b4', fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>DFW sellers often choose a <strong style={{ color: '#fff' }}>faster close over a higher price</strong>. A $10K lower offer with 21-day close can be worth more than a higher offer with 45-day financing and a sale contingency.</p>
            <ul style={{ paddingLeft: 20, color: '#ccc', fontSize: 14, lineHeight: 2 }}>
              <li>Earnest money signal: $1,000–$5,000 typical in DFW</li>
              <li>High EM = serious buyer, low EM = risk</li>
              <li>Cash offers often accepted at 2–5% below asking</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#1a2a40', borderRadius: 16, padding: 28, border: '1px solid #2a3a50′ }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⏱️ Texas Option Period</h2>
            <p style={{ color: '#9aa5b4', fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>Unique to Texas: buyers pay an <strong style={{ color: '#fff' }}>option fee ($100–$500)</strong> for the right to back out for any reason within the option period (typically 7–10 days). After option period ends, backing out means losing earnest money.</p>
            <ul style={{ paddingLeft: 20, color: '#ccc', fontSize: 14, lineHeight: 2 }}>
              <li>Shorter option period = stronger offer</li>
              <li>Higher option fee = more committed buyer</li>
              <li>Option fee goes to seller even if deal falls</li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#1a2a40', borderRadius: 16, padding: 28, marginBottom: 48, border: '1px solid #2a3a50′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📋 Contingency Quick Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {contingencies.map(c => (
              <div key={c} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 18 }}>{contingencyWeights[c] > 0 ? '✅' : contingencyWeights[c] === 0 ? '⚠️' : '❌'}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 14, marginBottom: 4 }}>{c}</div>
                  <div style={{ color: '#9aa5b4', fontSize: 13 }}>{contingencyNotes[c]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1a2a40', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #2a3a50′ }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Offer Strength Scorer</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Offer Amount ($)', value: offerAmount, setter: (v: string) => { setOfferAmount(v); setShowResult(false); }, placeholder: 'e.g. 450000′ },
              { label: 'List Price ($)', value: listPrice, setter: (v: string) => { setListPrice(v); setShowResult(false); }, placeholder: 'e.g. 445000′ },
              { label: 'Close Timeline (days)', value: closeTimeline, setter: (v: string) => { setCloseTimeline(v); setShowResult(false); }, placeholder: 'e.g. 30′ },
              { label: 'Earnest Money ($)', value: earnestMoney, setter: (v: string) => { setEarnestMoney(v); setShowResult(false); }, placeholder: 'e.g. 3000′ },
              { label: 'Option Fee ($)', value: optionFee, setter: (v: string) => { setOptionFee(v); setShowResult(false); }, placeholder: 'e.g. 250′ },
              { label: 'Option Period (days)', value: optionDays, setter: (v: string) => { setOptionDays(v); setShowResult(false); }, placeholder: 'e.g. 7′ },
            ].map(field => (
              <div key={field.label}>
                <label style={{ display: 'block', marginBottom: 6, color: '#ccc', fontSize: 13 }}>{field.label}</label>
                <input type="number" placeholder={field.placeholder} value={field.value} onChange={e => field.setter(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#0A1628', color: '#fff', border: '1px solid #2a3a50', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 10, color: '#ccc', fontSize: 13 }}>Contingencies Included</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {contingencies.map(c => {
                const selected = selectedContingencies.includes(c);
                return (
                  <button key={c} onClick={() => toggleContingency(c)}
                    style={{ padding: '8px 16px', borderRadius: 20, border: `1px solid ${selected ? '#F5E642' : '#2a3a50'}`, backgroundColor: selected ? '#F5E642′ : '#0A1628', color: selected ? '#0A1628' : '#ccc', fontSize: 13, cursor: ’pointer', fontWeight: selected ? 700 : 400 }}>
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={calculate} disabled={!offerAmount || !listPrice}
            style={{ padding: '12px 32px', backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: offerAmount && listPrice ? 'pointer' : 'not-allowed', opacity: offerAmount && listPrice ? 1 : 0.5 }}>
            Score This Offer
          </button>

          {r && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: 60, fontWeight: 900, color: r.color, lineHeight: 1 }}>{r.score}</div>
                <div style={{ fontSize: 14, color: '#9aa5b4', marginBottom: 4 }}>OFFER STRENGTH SCORE /100</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: r.color }}>{r.strength}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Price vs List', value: `${r.pct}%` },
                  { label: 'Close Timeline', value: `${r.close} days` },
                  { label: 'Earnest Money', value: `${r.emPct.toFixed(1)}% of offer` },
                ].map(stat => (
                  <div key={stat.label} style={{ textAlign: 'center', backgroundColor: '#1a2a40', borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 11, color: '#9aa5b4', marginBottom: 4 }}>{stat.label}</div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 16, backgroundColor: '#1a2a40', borderRadius: 8, borderLeft: `4px solid ${r.color}` }}>
                <strong style={{ color: r.color }}>💡 Recommendation: </strong>
                <span style={{ color: '#ccc', fontSize: 14 }}>{r.advice}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
