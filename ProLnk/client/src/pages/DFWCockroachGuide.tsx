import { useState } from 'react';

const ROACH_TYPES = [
  { label: 'German cockroach (small, tan, indoor)', value: 'german' },
  { label: 'American cockroach (large, reddish-brown)', value: 'american' },
  { label: 'Not sure / mixed', value: 'unknown' },
];

const LOCATIONS = [
  { label: 'Kitchen (cabinets, under sink)', value: 'kitchen' },
  { label: 'Bathroom (drains, under vanity)', value: 'bathroom' },
  { label: 'Garage or utility room', value: 'garage' },
  { label: 'Multiple rooms / widespread', value: 'widespread' },
];

const RECS: Record<string, Record<string, { treatment: string; exclusion: string; tip: string }>> = {
  german: {
    kitchen: {
      treatment: 'Gel bait (Advion or Maxforce) under cabinet edges and appliance motors. DO NOT spray — spreads them. Bait stations near harborage sites.',
      exclusion: 'Seal gaps around plumbing under sink. Fix any dripping pipes. Remove cardboard boxes (German roaches breed in them).',
      tip: 'German roaches reproduce fast — a DFW infestation can go from 10 to 1,000 in 60 days. Act immediately.',
    },
    bathroom: {
      treatment: 'Gel bait under vanity and near drain. Inspect for moisture source — German roaches need water within 24 hours.',
      exclusion: 'Seal overflow drains, fix leaking supply lines. Check for gap around toilet base.',
      tip: 'In DFW humid summers, bathrooms become ideal German roach habitat. Monthly inspections recommended.',
    },
    garage: {
      treatment: 'Gel bait near appliances (fridge, freezer, water heater). Spray perimeter with residual (Temprid SC) as secondary measure.',
      exclusion: 'Seal garage door sweep gaps. Remove cardboard storage. Fix any moisture sources.',
      tip: 'German roaches in garages often hitchhike in on grocery bags or boxes from stores.',
    },
    widespread: {
      treatment: 'Professional treatment required for widespread German roach infestations. Gel bait + IGR (insect growth regulator) combination.',
      exclusion: 'Full kitchen and bathroom audit. Seal all plumbing penetrations, fix moisture issues throughout.',
      tip: 'Widespread German roach infestations in DFW typically require 2–3 professional treatments 2 weeks apart.',
    },
  },
  american: {
    kitchen: {
      treatment: 'American roaches come in for water — fix any drips first. Perimeter spray (Temprid SC) plus drain treatments with gel bait.',
      exclusion: 'Seal gaps around dishwasher drain hose and under-sink plumbing. Check exterior at foundation level for entry points.',
      tip: 'American roaches (palmetto bugs) are seasonal in DFW — peak invasion happens in summer heat and winter cold snaps.',
    },
    bathroom: {
      treatment: 'Treat drains with American Roach Gel or drain foam. Perimeter spray exterior near foundation. They\’re coming in, not breeding inside.',
      exclusion: 'Seal gaps around tub drain, toilet base, and supply lines. Check exterior for cracks near bathroom exterior wall.',
      tip: 'American roaches found in bathrooms are usually individuals seeking water, not a full infestation. Exclusion fixes 80% of cases.',
    },
    garage: {
      treatment: 'Perimeter spray exterior at foundation. Seal garage door sweep. American roaches enter from outside — focus on exterior.',
      exclusion: 'Seal all gaps in garage walls, especially where utilities enter. Check for mulch piled against foundation — prime habitat.',
      tip: 'Mulch beds touching the house are a top American roach harborage in DFW. Move mulch 12" from foundation.',
    },
    widespread: {
      treatment: 'Multiple entry points — do a full exterior perimeter inspection. Spray exterior with residual + seal all gaps found.',
      exclusion: 'Widespread American roach access = major exclusion gap. Check foundation, soffits, utility entries, and all door sweeps.',
      tip: 'DFW cold snaps in Jan/Feb drive mass American roach invasions. Pre-treat exterior in November each year.',
    },
  },
  unknown: {
    kitchen: {
      treatment: 'Use gel bait for small ones (German), perimeter spray for large ones (American). Photograph and compare to ID species.',
      exclusion: 'Seal plumbing gaps under sink. Remove cardboard. Fix any drips. Cover both small and large species entry points.',
      tip: 'In DFW, if they\’re small and tan indoors, assume German. If large and reddish-brown, assume American entering from outside.',
    },
    bathroom: {
      treatment: 'Gel bait under vanity for German roaches. Drain treatments for American roaches. Both if you see both sizes.',
      exclusion: 'Fix all moisture sources. Seal drain gaps and plumbing penetrations.',
      tip: 'Mixed infestations are uncommon — size is the key differentiator. Photograph for positive ID.',
    },
    garage: {
      treatment: 'Perimeter spray exterior + gel bait near appliances covers both species. Monitor for 2 weeks to gauge response.',
      exclusion: 'Seal all gaps in garage, fix moisture, remove cardboard. Comprehensive approach covers both species.',
      tip: 'Garages in DFW can harbor both species. American roaches from outside, German roaches from boxes brought in.',
    },
    widespread: {
      treatment: 'Call a professional for species ID before treating widespread infestations. Wrong treatment wastes time and money.',
      exclusion: 'Full perimeter audit: plumbing, foundation, roofline, door sweeps. Seal everything before or alongside treatment.',
      tip: 'DFW pest pros can identify species on first visit and deploy the right treatment protocol immediately.',
    },
  },
};

export default function DFWCockroachGuide() {
  const [roachType, setRoachType] = useState('');
  const [location, setLocation] = useState('');

  const rec = roachType && location ? RECS[roachType]?.[location] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🪳</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Cockroach Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW has two major cockroach problems: German cockroaches (small, indoor infestations) and American cockroaches
          (large, entering from outside). DFW summer heat drives both species indoors, as do winter cold snaps. Treatment
          strategy differs completely by species — identification matters.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 Quick ID Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>German Cockroach</div>
              <ul style={{ color: '#94A3B8', lineHeight: 1.8, paddingLeft: 16, fontSize: 14 }}>
                <li>½–⅝ inch, tan/brown</li>
                <li>2 dark stripes on head</li>
                <li>Indoor breeder — infests kitchens, baths</li>
                <li>Rapid reproduction</li>
              </ul>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>American Cockroach</div>
              <ul style={{ color: '#94A3B8', lineHeight: 1.8, paddingLeft: 16, fontSize: 14 }}>
                <li>1.5–2 inch, reddish-brown</li>
                <li>Yellow band behind head</li>
                <li>Lives outdoors, enters for water</li>
                <li>Seasonal invasions</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧪 Get Your Treatment Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>Cockroach Type</label>
            <select value={roachType} onChange={e => setRoachType(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select type…</option>
              {ROACH_TYPES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>Location in Home</label>
            <select value={location} onChange={e => setLocation(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select location…</option>
              {LOCATIONS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
          {rec && (
            <div style={{ background: '#F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 8 }}>🧪 Treatment</div>
              <div style={{ color: '#0A1628', lineHeight: 1.6, marginBottom: 12 }}>{rec.treatment}</div>
              <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 8 }}>🚪 Exclusion</div>
              <div style={{ color: '#0A1628', lineHeight: 1.6, marginBottom: 12 }}>{rec.exclusion}</div>
              <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 4 }}>💡 DFW Tip</div>
              <div style={{ color: '#0A1628', lineHeight: 1.6 }}>{rec.tip}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
