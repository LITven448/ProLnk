import { useState } from 'react';

const months = [
  { name: 'January', pests: [], prevention: 'No major pest threats — inspect foundation for entry points while it’s dry' },
  { name: 'February', pests: ['Cedar elm aphids on early budding trees', 'Boxelder bugs congregating on south-facing walls'], prevention: 'Check window seals — boxelders squeeze through tiny gaps. Avoid squashing — they stain walls' },
  { name: 'March', pests: ['Termite swarm season begins (subterranean termites)', 'Fire ants emerge and rebuild mounds after winter'], prevention: 'Schedule termite inspection now before swarms peak. Apply fire ant bait to yard perimeter' },
  { name: 'April', pests: ['Termite swarms peak — watch for winged reproductives', 'Carpenter bees boring into wood trim'], prevention: 'Seal exposed wood with paint or sealant. Call termite pro if you see swarmers inside home' },
  { name: 'May', pests: ['Mosquito season officially starts', 'Aphid populations explode on garden plants'], prevention: 'Eliminate standing water weekly — saucers, gutters, tarps. Apply mosquito barrier spray to shrubs' },
  { name: 'June', pests: ['Fleas peak — especially in shaded yard areas', 'Chinch bugs damaging St. Augustine lawns'], prevention: 'Treat yard for fleas before they enter home. Watch for yellow lawn patches — sign of chinch bugs' },
  { name: 'July', pests: ['Fire ant peak activity — mounds expand rapidly', 'Mosquitoes peak — dawn and dusk worst'], prevention: 'Broadcast fire ant bait in early morning when ants are foraging. Avoid yard at dawn/dusk without repellent' },
  { name: 'August', pests: ['Wasps and yellow jackets peak', 'Scorpions more active seeking water'], prevention: 'Inspect eaves and soffits for paper wasp nests. Shake out shoes — scorpions hide in dark cool spots' },
  { name: 'September', pests: ['Stink bugs begin moving toward warm structures', 'Wolf spiders entering homes as temps drop'], prevention: 'Check door sweeps and window screens — stink bugs exploit any gap. Seal garage door weatherstripping' },
  { name: 'October', pests: ['Rodents (mice, rats) seeking warmth inside', 'Asian lady beetles congregating on walls'], prevention: 'Inspect roof line and foundation for gaps. Mice enter through 1/4 inch gaps — stuff with steel wool' },
  { name: 'November', pests: ['Brown recluse more active indoors in cooler temps', 'Subterranean termites still active in soil'], prevention: 'Shake out stored boxes and clothing. Brown recluse hides in undisturbed clutter in garages and attics' },
  { name: 'December', pests: ['Rodents peak — food sources scarce outdoors', 'German cockroaches in warm kitchens'], prevention: 'Store food in sealed containers. Check under sinks for cockroach activity and moisture' },
];

export default function DFWPestSeasonGuide2026() {
  const [selected, setSelected] = useState(new Date().getMonth());
  const m = months[selected];
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🐜</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Pest Season Calendar 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Month-by-month pest threats across the Dallas–Fort Worth area</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {months.map((mo, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#e2e8f0', fontWeight: 600, fontSize: 13 }}>{mo.name}</button>
          ))}
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🗓️ {m.name} — Active Pest Threats</h2>
          {m.pests.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: 14 }}>Low pest activity this month — great time for preventive sealing and inspection.</p>
          ) : (
            m.pests.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18 }}>⚠️</span>
                <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>{p}</span>
              </div>
            ))
          )}
          <div style={{ borderTop: '1px solid #1e3a5f', marginTop: 16, paddingTop: 16 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>🛡️ Prevention Action</h3>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{m.prevention}</p>
          </div>
        </div>
        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>ProLnk — Connecting DFW Homeowners with Licensed Pest Control Pros</p>
      </div>
    </div>
  );
}
