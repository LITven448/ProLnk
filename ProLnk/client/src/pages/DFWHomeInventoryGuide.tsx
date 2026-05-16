import { useState } from 'react';

const sizes = [
  { key: 'small', label: 'Small (under 1,500 sq ft)' },
  { key: 'medium', label: 'Medium (1,500–3,000 sq ft)' },
  { key: 'large', label: 'Large (3,000–5,000 sq ft)' },
  { key: 'xlarge', label: 'Very Large (5,000+ sq ft)' },
];

const approaches: Record<string, { time: string; method: string; apps: string[]; tips: string[] }> = {
  small: { time: '2-3 hours', method: 'Video walkthrough room by room. Open every drawer, closet, and cabinet. Narrate what you see including model numbers.', apps: ['Encircle (free, insurance-focused)', 'Sortly (tracks values)', 'Google Photos (simple, searchable)'], tips: ['Focus on electronics, appliances, and jewelry first', 'Store in cloud — not just on device that could be damaged', 'Update after any significant purchase over '] },
  medium: { time: '4-6 hours', method: 'Combine video walkthrough with a room-by-room photo spreadsheet. Group items by category. Include receipts and serial numbers for items over .', apps: ['Encircle (best for insurance claims)', 'Sortly (best for valuation)', 'Dropbox (receipt storage)'], tips: ['DFW hail season starts March — update inventory by February', 'Do garage separately — often 20-30% of total value', 'Photograph from multiple angles for art, antiques, or collectibles'] },
  large: { time: '1-2 days (spread over a week)', method: 'Room-by-room documentation with dedicated category lists: electronics, furniture, clothing, tools, outdoor equipment. Use a spreadsheet template alongside video.', apps: ['Encircle with room tags', 'Sortly with custom categories', 'Airtable for detailed tracking'], tips: ['Hire a professional inventory service for art or antiques (150-500 range)', 'Consider a rider for jewelry, art, or wine over policy limits', 'Store backup copy with attorney or in safe deposit box'] },
  xlarge: { time: '2-5 days or hire a service', method: 'Professional inventory recommended. Many DFW homes at this size have items exceeding standard coverage limits. Document room by room with dedicated photo sessions per room.', apps: ['Encircle Pro', 'Professional home inventory service (800-2000 for full home)', 'Your insurance carrier may have a preferred vendor'], tips: ['Scheduled personal property endorsements needed for high-value items', 'Annual insurance review to ensure coverage keeps pace with inflation', 'Video and photos plus written appraisals for anything over ,500'] },
};

export default function DFWHomeInventoryGuide() {
  const [size, setSize] = useState('');
  const [hasValuables, setHasValuables] = useState<string[]>([]);
  const [result, setResult] = useState<null | typeof approaches[string]>(null);

  const valuableTypes = ['Jewelry over K', 'Art or collectibles', 'Musical instruments', 'Wine or spirits collection', 'Guns or firearms', 'High-end electronics'];

  function toggle(v: string) {
    setHasValuables(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>📋</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Home Inventory Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>DFW averages 7 significant hail events per year. Without a documented home inventory, your insurance claim will be based on memory under stress. A two-hour investment now protects everything you own.</p>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>⚡ Why DFW Is Urgent</h2>
          {[['Hail is the #1 property claim in DFW', 'March through September is active season — prepare before it starts.'],['Insurers require proof of ownership', 'Without inventory, they estimate low. With inventory, you negotiate from facts.'],['Disasters happen fast', 'A tornado or house fire gives you zero time to document. It must already be done.'],['Claims adjuster visits once', 'You need your documentation ready before they arrive — not after.']].map(([t, d]) => (
            <div key={t} style={{ borderBottom: '1px solid #1E2D4A', padding: '10px 0' }}>
              <div style={{ fontWeight: 600, color: '#F5E642', fontSize: 14 }}>{t}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏠 Build Your Inventory Plan</h2>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>Home Size</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {sizes.map(s => (
              <button key={s.key} onClick={() => { setSize(s.key); setResult(approaches[s.key]); }} style={{ background: size === s.key ? '#F5E642' : '#0A1628', color: size === s.key ? '#0A1628' : '#E8EDF5', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', fontSize: 13, textAlign: 'left', fontWeight: size === s.key ? 700 : 400 }}>{s.label}</button>
            ))}
          </div>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>High-Value Items (check all that apply)</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
            {valuableTypes.map(v => (
              <button key={v} onClick={() => toggle(v)} style={{ background: hasValuables.includes(v) ? '#F5E642' : '#0A1628', color: hasValuables.includes(v) ? '#0A1628' : '#E8EDF5', border: '1px solid #1E2D4A', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontSize: 12, textAlign: 'left' }}>{v}</button>
            ))}
          </div>
          {hasValuables.length > 0 && <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginTop: 8, borderLeft: '3px solid #EF4444' }}><strong style={{ color: '#EF4444' }}>Note:</strong> <span style={{ color: '#94A3B8', fontSize: 14 }}>High-value items often exceed standard policy limits (,000–2,500 cap per category). Ask your agent about a scheduled personal property rider.</span></div>}
        </div>

        {result && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642' }}>⏱️ Estimated Time: {result.time}</div>
            </div>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>📹 Approach</h3>
            <p style={{ color: '#E8EDF5', marginBottom: 16 }}>{result.method}</p>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>📱 Recommended Apps</h3>
            <ul style={{ paddingLeft: 20, marginBottom: 16 }}>{result.apps.map((a, i) => <li key={i} style={{ marginBottom: 6, color: '#E8EDF5' }}>{a}</li>)}</ul>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>💡 DFW-Specific Tips</h3>
            <ul style={{ paddingLeft: 20 }}>{result.tips.map((t, i) => <li key={i} style={{ marginBottom: 6, color: '#E8EDF5' }}>{t}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
