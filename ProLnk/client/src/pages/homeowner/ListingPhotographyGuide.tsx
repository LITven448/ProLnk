import { useState } from 'react';

const CHECKLIST_ITEMS = [
  { id: 'lights', label: 'All lights on — and bulbs matching color temperature throughout', category: 'Lighting' },
  { id: 'blinds', label: 'Blinds set at a consistent level in every room', category: 'Lighting' },
  { id: 'toilets', label: 'Toilet lids down, towels straight and matching', category: 'Bathrooms' },
  { id: 'clutter', label: 'No personal photos, trophies, or decorative clutter', category: 'Staging' },
  { id: 'cars', label: 'All cars removed from driveway and street in front of home', category: 'Exterior' },
  { id: 'lawn', label: 'Lawn mowed within 2 days, edges trimmed', category: 'Exterior' },
  { id: 'surfaces', label: 'All countertops clear of mail, appliances, papers', category: 'Kitchen' },
  { id: 'cords', label: 'Power cords hidden or removed behind furniture', category: 'Staging' },
  { id: 'pets', label: 'Pet items removed (bowls, beds, crates)', category: 'Staging' },
  { id: 'trash', label: 'Trash cans moved to garage or backyard', category: 'Exterior' },
  { id: 'mirrors', label: 'Mirrors cleaned — no streaks or fingerprints', category: 'Bathrooms' },
  { id: 'garage', label: 'Garage door closed (unless showcasing garage interior)', category: 'Exterior' },
];

export default function ListingPhotographyGuide() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  const progress = Math.round((checked.size / CHECKLIST_ITEMS.length) * 100);

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>
          📸 Pre-Sale Resources
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.2, color: '#f8fafc' }}>
          Pre-Sale Photography Guide
        </h1>
        <p style={{ fontSize: 20, color: '#38bdf8', fontWeight: 600, marginBottom: 12 }}>
          Photos That Sell DFW Homes Faster
        </p>
        <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 40, lineHeight: 1.7, maxWidth: 680 }}>
          <strong style={{ color: '#f8fafc' }}>90% of buyers tour properties they found online first.</strong> Bad photos mean fewer showings — and fewer showings mean longer days on market and lower offers. Here's how to get it right.
        </p>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #334155' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#f8fafc' }}>💰 What Does Professional Photography Cost?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { tier: 'Standard', price: '$200–$500', desc: 'Interior + exterior, HDR processing, 25–50 edited photos' },
              { tier: 'Premium', price: '$400–$800', desc: 'Standard + twilight shots, virtual tour, floor plan' },
              { tier: 'Luxury + Drone', price: '$500–$1,200', desc: 'Everything above + aerial drone, video walkthrough, staging consult' },
            ].map(item => (
              <div key={item.tier} style={{ backgroundColor: '#0f172a', borderRadius: 8, padding: 16, border: '1px solid #1e3a5f', textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>{item.tier}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#38bdf8', marginBottom: 8 }}>{item.price}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #334155' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#f8fafc' }}>📷 What Professional Photos Do That iPhone Can't</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['🔭', 'Wide-angle lenses', 'Make rooms look spacious and inviting without the fisheye distortion of phone cameras.'],
              ['☀️', 'HDR processing', 'Balances bright windows with dark interiors — iPhone just blows out windows.'],
              ['👁️', 'Staging awareness', 'Experienced photographers notice the power cord, the crooked pillow, the dish in the rack — and tell you.'],
              ['🎨', 'Consistent color grading', 'Every photo in the listing feels cohesive — like a property brochure, not a phone dump.'],
            ].map(([icon, title, desc]) => (
              <div key={String(title)} style={{ display: 'flex', gap: 14, padding: 14, backgroundColor: '#0f172a', borderRadius: 8, border: '1px solid #1e3a5f' }}>
                <div style={{ fontSize: 22, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: 14, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #334155' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#f8fafc' }}>🤔 When to Use Which Type</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['✅ Professional Photographer', 'Always for listings $300K+, vacant homes, or staged homes. No exceptions.', true],
              ['📱 iPhone / DIY DSLR', 'Acceptable for rentals under $1,200/mo or bare land listings where interior photos aren’t the selling point.', false],
              ['🚁 Drone', 'Always for lots over 1 acre, homes with pools, scenic views, or acreage listings. Adds perceived value.', true],
            ].map(([label, desc, recommended]) => (
              <div key={String(label)} style={{ padding: 16, borderRadius: 8, border: `1px solid ${recommended ? '#166534' : '#334155'}`, backgroundColor: recommended ? '#0c2118' : '#0f172a' }}>
                <div style={{ fontWeight: 700, color: recommended ? '#4ade80' : '#94a3b8', fontSize: 14, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f8fafc', margin: 0 }}>✅ Pre-Shoot Checklist</h2>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: progress === 100 ? '#4ade80' : '#38bdf8' }}>{progress}%</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{checked.size}/{CHECKLIST_ITEMS.length} complete</div>
            </div>
          </div>
          <div style={{ height: 6, backgroundColor: '#334155', borderRadius: 3, marginBottom: 20 }}>
            <div style={{ height: '100%', backgroundColor: progress === 100 ? '#4ade80' : '#38bdf8', borderRadius: 3, width: `${progress}%`, transition: 'width 0.3s' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CHECKLIST_ITEMS.map(item => (
              <label
                key={item.id}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 8, cursor: 'pointer', backgroundColor: checked.has(item.id) ? '#0c2118' : '#0f172a', border: `1px solid ${checked.has(item.id) ? '#166534' : '#1e3a5f'}`, transition: 'all 0.2s' }}
              >
                <input
                  type="checkbox"
                  checked={checked.has(item.id)}
                  onChange={() => toggle(item.id)}
                  style={{ marginTop: 2, accentColor: '#4ade80', width: 16, height: 16, flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontSize: 14, color: checked.has(item.id) ? '#4ade80' : '#f1f5f9', textDecoration: checked.has(item.id) ? 'line-through' : 'none', lineHeight: 1.5 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{item.category}</div>
                </div>
              </label>
            ))}
          </div>
          {progress === 100 && (
            <div style={{ marginTop: 20, padding: 16, backgroundColor: '#0c2118', borderRadius: 8, border: '1px solid #4ade80', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🎉</div>
              <div style={{ fontWeight: 700, color: '#4ade80' }}>Your home is photo-ready! Call your photographer.</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0c2340', borderRadius: 12, padding: 28, border: '1px solid #0ea5e9', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🛠️</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>Need Pre-Listing Contractors to Prepare?</h2>
          <p style={{ color: '#7dd3fc', marginBottom: 20 }}>Paint touch-ups, carpet cleaning, fixture replacement, landscaping — get matched with vetted pros before your shoot.</p>
          <a
            href="/trustypro/book"
            style={{ backgroundColor: '#0ea5e9', color: '#fff', textDecoration: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, display: 'inline-block' }}
          >
            Find Pre-Listing Contractors →
          </a>
        </div>

      </div>
    </div>
  );
}
