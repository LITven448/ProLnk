import { useState } from 'react';

const quizQuestions = [
  {
    id: 1,
    question: "How important is a brand-new, never-lived-in home to you?",
    options: ["Critical — I only want new", "Nice to have", "Doesn't matter", "Prefer character of older home"],
    weights: [4, 2, 0, -2],
  },
  {
    id: 2,
    question: "What's your timeline to move in?",
    options: ["6–18 months (I can wait)", "3–6 months", "Under 3 months", "Already past deadline"],
    weights: [3, 0, -2, -4],
  },
  {
    id: 3,
    question: "How do you feel about yard size?",
    options: ["Bigger lot is a must", "Medium lot is fine", "Small lot or zero-lot is OK", "No yard needed"],
    weights: [-3, -1, 1, 2],
  },
  {
    id: 4,
    question: "How important is established mature trees and landscaping?",
    options: ["Very important", "Somewhat important", "Not important", "I prefer open lots"],
    weights: [-3, -1, 1, 3],
  },
  {
    id: 5,
    question: "Are you comfortable with a competitive bidding situation?",
    options: ["No — I hate bidding wars", "Somewhat — I can handle it", "Yes — I'm ready to compete", "I always win bids"],
    weights: [3, 1, -2, -3],
  },
  {
    id: 6,
    question: "How much do builder warranties matter to you?",
    options: ["A lot — I love peace of mind", "Somewhat", "I prefer to negotiate my own repairs", "Not at all"],
    weights: [3, 1, -1, -3],
  },
  {
    id: 7,
    question: "What's your price flexibility (above median DFW $420K)?",
    options: ["I need the lowest price/sqft", "I can go a little above median", "Flexible — best value wins", "Budget isn't a concern"],
    weights: [-2, 0, 1, 3],
  },
  {
    id: 8,
    question: "How important is neighborhood walkability and community feel?",
    options: ["Essential — I want neighbors and sidewalks", "Nice to have", "Doesn't matter", "I prefer privacy and space"],
    weights: [-2, -1, 1, 2],
  },
];

const builders = [
  { name: "DR Horton", segment: "Entry–Mid ($300K–$500K)", note: "Largest US builder, fast build times, Express series for budget buyers" },
  { name: "Lennar", segment: "Mid–Move-up ($380K–$650K)", note: "Everything's Included® pricing, strong tech integrations, popular in Frisco/Allen" },
  { name: "Meritage Homes", segment: "Mid–Luxury ($420K–$800K)", note: "Energy efficiency leader, HERS-rated, popular in McKinney and Celina" },
  { name: "Toll Brothers", segment: "Luxury ($600K+)", note: "Semi-custom finishes, longer build timelines, premium communities in Prosper/Westlake" },
  { name: "Highland Homes", segment: "Mid–Luxury ($450K–$900K)", note: "Texas-based, known for quality construction and customer service scores" },
];

const neighborhoods = [
  { name: "University Park / Highland Park", type: "Resale", note: "Mature trees, HPISD schools, premium lots, $1M+ entry point" },
  { name: "Lakewood / M Streets", type: "Resale", note: "1920s–50s architecture, Dallas ISD magnet schools, walkable retail" },
  { name: "Kessler Park", type: "Resale", note: "Scenic bluffs, mid-century homes, artist community vibe" },
  { name: "Frisco (new developments)", type: "New Construction", note: "Master-planned, top-rated FISD, 30-min commute to Legacy West" },
  { name: "Celina / Prosper", type: "New Construction", note: "Fastest growing, larger lots, newer schools, 45-min to Dallas core" },
];

export default function DFWNewHomeBuyersGuide() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<'compare' | 'quiz' | 'builders' | 'hoods'>('compare');

  const handleAnswer = (questionId: number, weight: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: weight }));
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const allAnswered = Object.keys(answers).length === quizQuestions.length;

  const getRecommendation = () => {
    if (totalScore >= 8) return { type: 'New Construction', color: '#F5E642', emoji: '🏗️', reason: 'You value peace of mind, modern layouts, and are willing to wait for the right build. DFW\’s builder market is ideal for you — consider Frisco, Celina, or Prosper master-planned communities.' };
    if (totalScore >= 2) return { type: 'Either Could Work', color: '#60A5FA', emoji: '⚖️', reason: 'You\’re flexible. Compare specific homes rather than categories. New construction in outer suburbs vs. resale in established Plano or Richardson corridors could both fit your needs.' };
    return { type: 'Resale', color: '#34D399', emoji: '🏡', reason: 'You want established neighborhoods, larger lots, mature trees, and/or a faster move-in. Target University Park, Lakewood, Kessler Park, or inner-ring suburbs like Richardson and Garland.' };
  };

  const rec = getRecommendation();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏘️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW New Construction vs Resale
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 640, margin: '0 auto' }}>
            Which is right for you? Compare the real tradeoffs, meet the major builders, and take our 8-question quiz to get a personalized recommendation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {(['compare', 'quiz', 'builders', 'hoods'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: activeTab === tab ? '#F5E642' : '#1E3A5F', color: activeTab === tab ? '#0A1628' : '#fff',
              }}
            >
              {tab === 'compare' ? '⚖️ Compare' : tab === 'quiz' ? '📋 Quiz' : tab === 'builders' ? '🏗️ Builders' : '🗺️ Neighborhoods'}
            </button>
          ))}
        </div>

        {activeTab === 'compare' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, border: '2px solid #F5E642' }}>
                <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🏗️ New Construction</h2>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ color: '#34D399', fontSize: 15, marginBottom: 10 }}>✅ Pros</h3>
                  {['Builder warranty (1-2-10 standard)', 'Modern open floor plans', 'No bidding wars — fixed price', 'Brand new systems (HVAC, roof, plumbing)', 'Energy-efficient builds (lower utility bills)', 'Customization options during construction', 'Smart home tech standard in new builds'].map(p => (
                    <div key={p} style={{ display: 'flex', gap: 8, marginBottom: 8, color: '#CBD5E1', fontSize: 14 }}>
                      <span style={{ color: '#34D399', flexShrink: 0 }}>✓</span> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <h3 style={{ color: '#F87171', fontSize: 15, marginBottom: 10 }}>❌ Cons</h3>
                  {['Smaller lots (zero or 6,000 sqft common)', 'No mature trees — you\’re starting bare', '6–18 month build timeline', 'Outer suburbs only (Celina, Prosper, Forney)', 'Builder incentives can mask inflated price', 'HOA fees and restrictions common', 'Community feels generic initially'].map(c => (
                    <div key={c} style={{ display: 'flex', gap: 8, marginBottom: 8, color: '#CBD5E1', fontSize: 14 }}>
                      <span style={{ color: '#F87171', flexShrink: 0 }}>✗</span> {c}
                    </div>
                  ))}
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginTop: 20 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>💰 DFW Avg Price/SqFt</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>$165–$195</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>Varies by builder tier and suburb</div>
                </div>
              </div>

              <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, border: '2px solid #60A5FA' }}>
                <h2 style={{ color: '#60A5FA', fontSize: 22, marginBottom: 20 }}>🏡 Resale</h2>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ color: '#34D399', fontSize: 15, marginBottom: 10 }}>✅ Pros</h3>
                  {['Established neighborhoods with character', 'Larger lots — 8,000–15,000+ sqft common', 'Mature trees and landscaping', 'Lower price per square foot in many areas', 'Closer to Dallas core and employment centers', 'Move-in ready (30–60 day close)', 'Known schools and community track record'].map(p => (
                    <div key={p} style={{ display: 'flex', gap: 8, marginBottom: 8, color: '#CBD5E1', fontSize: 14 }}>
                      <span style={{ color: '#34D399', flexShrink: 0 }}>✓</span> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <h3 style={{ color: '#F87171', fontSize: 15, marginBottom: 10 }}>❌ Cons</h3>
                  {['Competitive bidding in desirable areas', 'Deferred maintenance and repair costs', 'Dated layouts (smaller closets, galley kitchens)', 'Foundation risk in Dallas clay soil', 'Older HVAC and roof (replacement budget needed)', 'Limited inventory in top neighborhoods', 'May need renovation budget'].map(c => (
                    <div key={c} style={{ display: 'flex', gap: 8, marginBottom: 8, color: '#CBD5E1', fontSize: 14 }}>
                      <span style={{ color: '#F87171', flexShrink: 0 }}>✗</span> {c}
                    </div>
                  ))}
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginTop: 20 }}>
                  <div style={{ color: '#60A5FA', fontWeight: 700, marginBottom: 4 }}>💰 DFW Avg Price/SqFt</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>$145–$175</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>Inner suburbs 10–20% premium over outer</div>
                </div>
              </div>
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginTop: 24 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 Side-by-Side at a Glance</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr>
                      {['Factor', '🏗️ New Construction', '🏡 Resale'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#94A3B8', borderBottom: '1px solid #2D4A6B' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Move-in timeline', '6–18 months', '30–60 days'],
                      ['Lot size', '5,000–8,000 sqft typical', '8,000–15,000+ sqft typical'],
                      ['Foundation risk', 'Low (new pour)', 'Medium–High (clay expansion)'],
                      ['Customization', 'High (during build)', 'Limited (post-purchase renovation)'],
                      ['Location options', 'Outer suburbs only', 'All areas including Dallas core'],
                      ['Negotiating room', 'Builder incentives (not price)', 'Flexible on price + repairs'],
                      ['Warranty', '1-2-10 builder warranty', 'Home warranty optional'],
                    ].map(([factor, nc, resale]) => (
                      <tr key={factor} style={{ borderBottom: '1px solid #1A2E4A' }}>
                        <td style={{ padding: '12px 16px', color: '#F5E642', fontWeight: 600 }}>{factor}</td>
                        <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>{nc}</td>
                        <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>{resale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>📋 Find Your Match</h2>
              <p style={{ color: '#94A3B8', marginBottom: 24 }}>Answer 8 questions and we'll tell you whether new construction or resale fits your priorities.</p>
              {quizQuestions.map((q, qi) => (
                <div key={q.id} style={{ marginBottom: 28 }}>
                  <div style={{ color: '#fff', fontWeight: 600, marginBottom: 12 }}>{qi + 1}. {q.question}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {q.options.map((opt, oi) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(q.id, q.weights[oi])}
                        style={{
                          padding: '10px 14px', borderRadius: 8, border: `2px solid ${answers[q.id] === q.weights[oi] ? '#F5E642' : '#2D4A6B'}`,
                          background: answers[q.id] === q.weights[oi] ? '#F5E642' : 'transparent',
                          color: answers[q.id] === q.weights[oi] ? '#0A1628' : '#CBD5E1',
                          cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: answers[q.id] === q.weights[oi] ? 700 : 400,
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={() => setShowResult(true)}
                disabled={!allAnswered}
                style={{
                  width: '100%', padding: '16px', borderRadius: 10, border: 'none', cursor: allAnswered ? 'pointer' : 'not-allowed',
                  background: allAnswered ? '#F5E642' : '#2D4A6B', color: allAnswered ? '#0A1628' : '#64748B',
                  fontWeight: 700, fontSize: 16,
                }}
              >
                {allAnswered ? '🎯 Get My Recommendation' : `Answer all ${quizQuestions.length} questions to continue`}
              </button>
            </div>
            {showResult && allAnswered && (
              <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, border: `2px solid ${rec.color}` }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{rec.emoji}</div>
                <h2 style={{ color: rec.color, fontSize: 26, fontWeight: 800, marginBottom: 12 }}>We Recommend: {rec.type}</h2>
                <p style={{ color: '#CBD5E1', fontSize: 16, lineHeight: 1.6, marginBottom: 20 }}>{rec.reason}</p>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>Your score: <span style={{ color: rec.color, fontWeight: 700 }}>{totalScore > 0 ? '+' : ''}{totalScore}</span> (range: -20 to +20)</div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'builders' && (
          <div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🏗️ DFW's Top Builders</h2>
              <p style={{ color: '#94A3B8', marginBottom: 24 }}>Know who you're buying from before you visit a model home.</p>
              <div style={{ display: 'grid', gap: 16 }}>
                {builders.map(b => (
                  <div key={b.name} style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{b.name}</div>
                      <div style={{ background: '#1E3A5F', padding: '4px 12px', borderRadius: 20, fontSize: 12, color: '#F5E642', fontWeight: 600 }}>{b.segment}</div>
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: 14 }}>{b.note}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💡 Builder Negotiation Tips</h3>
              {['Builders rarely cut price — negotiate upgrades, lot premiums, and closing cost credits instead', 'Ask about inventory homes (completed but unsold) for faster close and better deals', 'Get your own agent — builder\’s rep works for the builder, not you', 'Compare the true cost: base price + upgrades + lot premium + HOA', 'Builder incentives (rate buydowns, appliance packages) expire — lock them in writing', 'Hire an independent inspector even on new construction — defects are common'].map(tip => (
                <div key={tip} style={{ display: 'flex', gap: 12, marginBottom: 12, color: '#CBD5E1', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span> {tip}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'hoods' && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🗺️ Notable DFW Neighborhoods</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {neighborhoods.map(n => (
                <div key={n.name} style={{ background: '#1E3A5F', borderRadius: 10, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>{n.name}</div>
                    <div style={{ background: n.type === 'Resale' ? '#1A4A3A' : '#1A2E6A', padding: '4px 12px', borderRadius: 20, fontSize: 12, color: n.type === 'Resale' ? '#34D399' : '#60A5FA', fontWeight: 600 }}>
                      {n.type === 'Resale' ? '🏡 Resale' : '🏗️ New Construction'}
                    </div>
                  </div>
                  <div style={{ color: '#94A3B8', fontSize: 14 }}>{n.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginTop: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🤝</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Ready to Start Your DFW Home Search?</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Get matched with vetted local service professionals — from buyer's agents to home inspectors — through ProLnk.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Connect with a DFW Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
