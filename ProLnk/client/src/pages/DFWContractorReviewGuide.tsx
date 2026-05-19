import { useState } from 'react';

const platforms = [
  { name: 'Google', reliability: 85, notes: 'Hardest to fake at scale, widely used, owner responses visible' },
  { name: 'Nextdoor', reliability: 90, notes: 'Verified DFW neighbors only — highest local signal' },
  { name: 'Houzz', reliability: 78, notes: 'Project photos + reviews — good for remodel/design work' },
  { name: 'BBB', reliability: 70, notes: 'Good for complaints history, less for quality signal' },
  { name: 'Yelp', reliability: 60, notes: 'Aggressive filtering hides real reviews — use cautiously' },
  { name: 'ProLnk', reliability: 95, notes: 'Verified post-job reviews from matched DFW homeowners only' },
];

const purposes = [
  { label: 'Hiring decision', tips: 'Look at volume (20+ reviews), recency (last 6 months), and how owner responds to negatives.' },
  { label: 'Spotting fake reviews', tips: 'Watch for reviewer with 1 review ever, generic praise, all 5-star same week, no photos.' },
  { label: 'Red flag check', tips: 'Search for "no-show," "ghosted," "price changed," "permit," "damage" in 1–3 star reviews.' },
  { label: 'Comparing contractors', tips: 'Score each contractor: avg rating × log(review count). Higher = more reliable signal.' },
];

export default function DFWContractorReviewGuide() {
  const [platform, setPlatform] = useState('');
  const [purpose, setPurpose] = useState('');

  const selectedPlatform = platforms.find(p => p.name === platform);
  const selectedPurpose = purposes.find(p => p.label === purpose);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8ECF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>
          ⭐ DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
          How to Read & Leave Contractor Reviews in DFW
        </h1>
        <p style={{ color: '#9BA8B8', fontSize: 16, marginBottom: 36 }}>
          Where Dallas-Fort Worth homeowners leave reviews, what makes them useful, and how to spot the fakes.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 Where DFW Homeowners Leave Reviews</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 36 }}>
          {platforms.map(p => (
            <div key={p.name} style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 6 }}>Reliability: {p.reliability}%</div>
              <div style={{ fontSize: 12, color: '#9BA8B8' }}>{p.notes}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🚩 Red Flags in Reviews</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li>Reviewer has posted exactly 1 review ever</li>
          <li>Five 5-star reviews posted in a single week</li>
          <li>No mention of the actual project type or outcome</li>
          <li>No photos, no specifics — just "great job!"</li>
          <li>Negative reviews mention permit issues, no-shows, or bait-and-switch pricing</li>
          <li>Owner responds to negatives with defensiveness or accusations</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>✍️ What Makes a Useful Review</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li>Specific trade + project type mentioned (e.g. "replaced 40-gallon water heater in Frisco")</li>
          <li>Timeline — did they show up on time? Finish when promised?</li>
          <li>Photo of completed work attached</li>
          <li>Mention of permits, cleanup, and follow-up</li>
          <li>Honest about what went wrong and how it was resolved</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Interactive: Platform + Purpose Lookup</h2>
        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ fontSize: 12, color: '#9BA8B8', display: 'block', marginBottom: 6 }}>REVIEW PLATFORM</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8ECF0', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select platform...</option>
                {platforms.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ fontSize: 12, color: '#9BA8B8', display: 'block', marginBottom: 6 }}>READING PURPOSE</label>
              <select value={purpose} onChange={e => setPurpose(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8ECF0', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select purpose...</option>
                {purposes.map(p => <option key={p.label} value={p.label}>{p.label}</option>)}
              </select>
            </div>
          </div>
          {selectedPlatform && (
            <div style={{ marginBottom: 12, padding: 14, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{selectedPlatform.name} — Reliability: <span style={{ color: '#F5E642' }}>{selectedPlatform.reliability}%</span></div>
              <div style={{ fontSize: 14, color: '#9BA8B8' }}>{selectedPlatform.notes}</div>
            </div>
          )}
          {selectedPurpose && (
            <div style={{ padding: 14, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642' }}>{selectedPurpose.label}</div>
              <div style={{ fontSize: 14, color: '#9BA8B8' }}>{selectedPurpose.tips}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628' }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>💡 ProLnk Advantage</div>
          <div style={{ fontSize: 14 }}>Every review on ProLnk is verified — left only after a matched job is completed in DFW. No fake reviews. No cherry-picked testimonials.</div>
        </div>
      </div>
    </div>
  );
}
