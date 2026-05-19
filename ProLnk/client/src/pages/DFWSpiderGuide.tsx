import { useState } from 'react';

const SPIDER_TYPES = [
  { label: 'Black widow (black, red hourglass)', value: 'blackwidow' },
  { label: 'Brown recluse (tan, violin marking)', value: 'brownrecluse' },
  { label: 'Large orb weaver / garden spider (outdoor)', value: 'orbweaver' },
  { label: 'Small house spiders (not identified as above)', value: 'house' },
];

const SITUATIONS = [
  { label: 'Found in garage or outdoor storage', value: 'garage' },
  { label: 'Found inside living area (bedroom, closet, bathroom)', value: 'indoor' },
  { label: 'Found in woodpile or landscaping near home', value: 'outdoor' },
  { label: 'Multiple sightings / seems widespread', value: 'widespread' },
];

const RECS: Record<string, Record<string, { exclusion: string; treatment: string; callPro: boolean; proNote: string }>> = {
  blackwidow: {
    garage: {
      exclusion: 'Black widows love garages. Clear clutter, seal gaps in garage door and walls. Wear gloves when moving stored items.',
      treatment: 'Residual spray (Temprid SC) in corners, under shelving, around door frames. Remove webs with a broom and treat site.',
      callPro: false,
      proNote: 'DIY is appropriate for garage black widows if you exercise caution. Call a pro if you have children who access the garage.',
    },
    indoor: {
      exclusion: 'Seal all baseboards, check under furniture and behind appliances. Black widows inside living areas are a significant concern.',
      treatment: 'Professional treatment strongly recommended. DIY residual spray under furniture and in closets if you proceed — use a respirator.',
      callPro: true,
      proNote: 'Black widows inside living areas warrant a professional visit. A bite to a child or pet can be medically serious.',
    },
    outdoor: {
      exclusion: 'Move woodpiles at least 20 feet from structure. Clear ground-level debris. Wear heavy gloves when gardening near foundation.',
      treatment: 'Perimeter spray (Temprid SC or Talstar) at foundation level. Treat woodpile surroundings. Relocate or remove wood if possible.',
      callPro: false,
      proNote: 'Outdoor black widows in DFW are very common — nearly every yard has them. Treatment focuses on keeping them away from the structure.',
    },
    widespread: {
      exclusion: 'Full perimeter audit required. Black widows widespread inside = structural gap issue. Check all entry points, attic, and crawl spaces.',
      treatment: 'Professional treatment required for widespread indoor black widow presence. Multiple treatment points needed.',
      callPro: true,
      proNote: 'Widespread black widow activity inside a DFW home is unusual and requires professional assessment and treatment.',
    },
  },
  brownrecluse: {
    garage: {
      exclusion: 'Brown recluses hide in boxes, fabric, and clutter. Seal all interior wall gaps. Store items in plastic bins, not cardboard boxes.',
      treatment: 'Glue boards placed along walls catch recluses. Residual spray (Web Out or Temprid) in corners and wall voids.',
      callPro: false,
      proNote: 'Garage brown recluses — use glue boards to monitor and residual spray. Call a pro if you find them inside the house.',
    },
    indoor: {
      exclusion: 'Brown recluses inside living areas are a serious concern in DFW. Seal all baseboards, door frames, and interior wall penetrations.',
      treatment: 'Professional treatment required. Glue board monitoring + residual spray + potentially dust treatments in wall voids.',
      callPro: true,
      proNote: 'Brown recluses inside DFW homes require professional treatment. Their bite can cause necrotic tissue damage — do not underestimate the risk.',
    },
    outdoor: {
      exclusion: 'Brown recluses are less common in outdoor woodpiles than black widows, but do occur. Wear gloves and seal all ground-level entry points.',
      treatment: 'Perimeter residual spray at foundation. Place glue boards inside garage near entry points to catch any that wander in.',
      callPro: false,
      proNote: 'Outdoor brown recluses are rarely a structural concern. Focus on preventing entry — seal foundation gaps and use glue board monitoring inside.',
    },
    widespread: {
      exclusion: 'Widespread brown recluse infestation is a significant DFW problem in some older homes. Full exclusion + decluttering required immediately.',
      treatment: 'Professional treatment required — multiple applications, glue board network, wall void dust treatments. This is not a DIY situation.',
      callPro: true,
      proNote: 'Call a licensed DFW pest professional immediately. Widespread brown recluse infestations require specialized treatment protocols and monitoring.',
    },
  },
  orbweaver: {
    garage: {
      exclusion: 'Orb weavers are beneficial predators — consider tolerating if not near entry points. Remove webs near doors and lights.',
      treatment: 'No chemical treatment needed for outdoor orb weavers. Remove webs mechanically. Reduce exterior lighting to cut insect attraction.',
      callPro: false,
      proNote: 'Orb weavers are harmless and beneficial. DFW homeowners often misidentify them as dangerous. No professional treatment needed.',
    },
    indoor: {
      exclusion: 'Orb weavers rarely come inside. If found indoors, capture and release. Seal the entry point (usually a gap near a window or door).',
      treatment: 'No chemical treatment needed. Capture and release. Seal the specific entry gap with caulk.',
      callPro: false,
      proNote: 'An orb weaver inside is a one-off wanderer — not an infestation. No professional needed.',
    },
    outdoor: {
      exclusion: 'Orb weavers are beneficial garden spiders. Tolerate them away from entry points. They control mosquitoes and other pests.',
      treatment: 'No treatment recommended. Remove webs near paths or doors if they are a nuisance. Reduce exterior lighting to lower insect density.',
      callPro: false,
      proNote: 'Orb weavers near DFW homes are normal and beneficial. Only remove if they are directly blocking entry points or creating a nuisance.',
    },
    widespread: {
      exclusion: 'Large orb weaver populations indicate high insect prey density. Consider reducing exterior lighting — the primary attractant.',
      treatment: 'Reduce exterior lighting. Insect control measures (perimeter spray) reduce the prey base and orb weaver populations follow.',
      callPro: false,
      proNote: 'No professional treatment needed for orb weavers. If the sight is distressing, a pest pro can advise on reducing the prey base.',
    },
  },
  house: {
    garage: {
      exclusion: 'Reduce clutter — house spiders need harborage. Seal gaps in garage walls. Remove webs regularly to discourage re-establishment.',
      treatment: 'Residual spray (Temprid SC) in corners and along wall-floor junctions. Glue boards along walls to monitor activity.',
      callPro: false,
      proNote: 'House spiders in the garage are very common in DFW. DIY treatment and decluttering resolves most cases.',
    },
    indoor: {
      exclusion: 'Seal door sweeps, window frames, and utility penetrations. High indoor spider count = high insect prey count. Address the prey source.',
      treatment: 'Perimeter residual spray inside. Reduce moisture sources (spiders follow insects which follow water). Glue board monitoring.',
      callPro: false,
      proNote: 'Many indoor house spiders suggest a prey insect issue. Address the root cause — seal entry points and reduce interior moisture.',
    },
    outdoor: {
      exclusion: 'Reduce exterior lighting (attracts insects = attracts spiders). Keep vegetation trimmed away from house. Clear ground debris.',
      treatment: 'Perimeter spray at foundation reduces prey insects. House spiders follow their food source.',
      callPro: false,
      proNote: 'Outdoor house spiders are normal in DFW. Perimeter spray and lighting reduction is typically sufficient.',
    },
    widespread: {
      exclusion: 'Widespread spider activity indicates high prey insect density inside the home. Full exclusion audit and moisture inspection recommended.',
      treatment: 'Professional general pest treatment to address the prey insect base. Spider populations drop significantly when prey is reduced.',
      callPro: true,
      proNote: 'Widespread house spiders often signal a larger pest issue. A professional general pest inspection can identify and address the root cause.',
    },
  },
};

export default function DFWSpiderGuide() {
  const [spiderType, setSpiderType] = useState('');
  const [situation, setSituation] = useState('');

  const rec = spiderType && situation ? RECS[spiderType]?.[situation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🕷️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Spider Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW homeowners face two medically significant spiders: the black widow and the brown recluse.
          Black widows prefer dark undisturbed areas (garages, woodpiles, outdoor furniture). Brown recluses prefer
          boxes, fabric, and cluttered areas — and can establish large indoor populations in some DFW homes.
          DFW landscaping habits directly affect spider populations near homes.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🏡 DFW Landscaping & Spider Risk</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 2, paddingLeft: 20 }}>
            <li>Rock mulch and flagstone near foundation = black widow habitat</li>
            <li>Dense ground cover (liriope, monkey grass) adjacent to home increases populations</li>
            <li>Woodpiles stored against the house are a major black widow harborage in DFW</li>
            <li>Exterior lighting attracts insects → attracts spiders → increases indoor pressure</li>
            <li>Moving shrubs 12" from foundation dramatically reduces spider entry</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Get Your Spider Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>Spider Type</label>
            <select value={spiderType} onChange={e => setSpiderType(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select type…</option>
              {SPIDER_TYPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select situation…</option>
              {SITUATIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          {rec && (
            <div style={{ background: rec.callPro ? '#FF4444′ : '#F5E642', borderRadius: 8, padding: 16 }}>
              {rec.callPro && (
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>⚠️ CALL A PROFESSIONAL</div>
              )}
              <div style={{ color: rec.callPro ? '#fff' : '#0A1628', fontWeight: 700, marginBottom: 6 }}>🚪 Exclusion</div>
              <div style={{ color: rec.callPro ? '#fff' : '#0A1628', lineHeight: 1.6, marginBottom: 10 }}>{rec.exclusion}</div>
              <div style={{ color: rec.callPro ? '#fff' : '#0A1628', fontWeight: 700, marginBottom: 6 }}>🧪 Treatment</div>
              <div style={{ color: rec.callPro ? '#fff' : '#0A1628', lineHeight: 1.6, marginBottom: 10 }}>{rec.treatment}</div>
              <div style={{ color: rec.callPro ? '#fff' : '#0A1628', fontWeight: 700, marginBottom: 4 }}>💡 Note</div>
              <div style={{ color: rec.callPro ? '#fff' : '#0A1628', lineHeight: 1.6 }}>{rec.proNote}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
