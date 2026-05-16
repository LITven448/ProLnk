import { useState } from 'react';

const submarkets = ['Frisco/McKinney', 'Plano/Allen', 'Irving/Las Colinas', 'Fort Worth/Keller', 'Arlington/Mansfield', 'Denton/Lewisville', 'Rockwall/Rowlett', 'Garland/Mesquite'];
const homeTypes = ['Single Family', 'Townhome', 'Condo', 'New Build'];
const timelines = ['ASAP (within 30 days)', '1-3 months', '3-6 months', '6+ months'];

function getStrategy(type: string, market: string, timeline: string) {
  const isHot = ['Frisco/McKinney','Plano/Allen'].includes(market);
  const dom = isHot ? '4-7' : '10-18';
  const timing = timeline === 'ASAP (within 30 days)' ? 'List Thursday for weekend showings — maximize first-weekend foot traffic.' : 'Plan for Thursday listing day regardless of month; spring (Mar-May) adds 8-12% premium.';
  const photo = type === 'Condo' ? 'Wide-angle interior shots + rooftop/amenity photos — exterior matters less.' : 'Golden hour exterior shot (6-7pm in spring) is non-negotiable. Aerial drone for lots over 0.2 acres.';
  const price = isHot ? 'Price just below psychological round numbers (,900 vs K). In hot submarkets, slight underpricing triggers bidding war — net 2-4% more.' : 'Price at fair market value. Overpricing by even 3% in this submarket adds 30+ days on market and flags the listing.';
  const outcome = isHot ? 'Expect multiple offers by Sunday. Counter highest with best terms, not just price.' : 'Expect 1-3 showings/week. First offer often closest to best — do not let it expire waiting for more.';
  return { dom, timing, photo, price, outcome };
}

export default function DFWListingStrategies2026() {
  const [homeType, setHomeType] = useState('');
  const [submarket, setSubmarket] = useState('');
  const [timeline, setTimeline] = useState('');
  const result = homeType && submarket && timeline ? getStrategy(homeType, submarket, timeline) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'Georgia, serif', padding: '0' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ borderBottom: '3px solid #F5E642', paddingBottom: 24, marginBottom: 40 }}>
          <p style={{ color: '#F5E642', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase', margin: '0 0 12px' }}>DFW Real Estate Guide • 2026</p>
          <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.15 }}>Listing Strategies for DFW Sellers</h1>
          <p style={{ color: '#9BACC7', fontSize: 17, margin: 0, lineHeight: 1.6 }}>Timing, photography, and pricing tactics that move DFW homes faster and for more money in 2026.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          {[['🏠 Home Type', homeTypes, homeType, setHomeType], ['📍 DFW Submarket', submarkets, submarket, setSubmarket]].map(([label, opts, val, setter]: any) => (
            <div key={label as string}>
              <label style={{ display: 'block', color: '#F5E642', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{label}</label>
              <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', background: '#0D1F3C', border: '1px solid #1E3A6E', color: '#E8EDF5', padding: '12px 16px', fontSize: 15, borderRadius: 4 }}>
                <option value=''>Select...</option>
                {(opts as string[]).map((o: string) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 40 }}>
          <label style={{ display: 'block', color: '#F5E642', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>📅 Timeline to List</label>
          <select value={timeline} onChange={e => setTimeline(e.target.value)} style={{ width: '100%', background: '#0D1F3C', border: '1px solid #1E3A6E', color: '#E8EDF5', padding: '12px 16px', fontSize: 15, borderRadius: 4 }}>
            <option value=''>Select...</option>
            {timelines.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ background: '#0D1F3C', border: '1px solid #F5E642', borderRadius: 6, padding: 32, marginBottom: 40 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 24px' }}>Your Listing Strategy →</h2>
            {[['⏰ Timing', result.timing], ['📸 Photography', result.photo], ['💰 Pricing Tactic', result.price], ['📊 Expected DOM', result.dom + ' days on market'], ['🎯 Likely Outcome', result.outcome]].map(([label, text]) => (
              <div key={label as string} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 16, marginBottom: 20 }}>
                <div style={{ color: '#F5E642', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#E8EDF5', lineHeight: 1.6 }}>{text}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[['Thursday', 'Best listing day — weekend showings peak Friday-Sunday'],['Spring Premium', '8-12% more vs fall/winter listings in DFW'],['First Weekend', 'Drives 60% of all offers — price right from day one']].map(([stat, desc]) => (
            <div key={stat as string} style={{ background: '#0D1F3C', border: '1px solid #1E3A6E', borderRadius: 4, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{stat}</div>
              <div style={{ color: '#9BACC7', fontSize: 13, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
