import { useState } from 'react';

const INSECT_TYPES = [
  { label: 'Paper wasp (long legs hang in flight, open-comb nest)', value: 'paper' },
  { label: 'Yellow jacket (aggressive, ground or wall nests)', value: 'yellowjacket' },
  { label: 'Mud dauber (solitary, mud tubes on walls)', value: 'muddauber' },
  { label: 'Honey bee (fuzzy, docile, round body)', value: 'honeybee' },
  { label: 'Bumble bee (large, fuzzy, yellow-black)', value: 'bumblebee' },
  { label: 'Carpenter bee (large, shiny black abdomen, hovering)', value: 'carpenter' },
];

const NEST_LOCATIONS = [
  { label: 'Eaves or soffit overhang', value: 'eaves' },
  { label: 'Attic or wall void', value: 'attic' },
  { label: 'Ground or lawn', value: 'ground' },
  { label: 'Deck, porch, or outdoor structure', value: 'deck' },
  { label: 'Tree or shrub adjacent to home', value: 'tree' },
];

const RECS: Record<string, Record<string, { approach: string; timing: string; callPro: boolean; note: string }>> = {
  paper: {
    eaves: {
      approach: 'Paper wasps under eaves are the most common DFW summer complaint. Spray nest directly at night with Wasp Freeze or Raid Wasp (reach sprays 20 ft). Remove nest the next morning.',
      timing: 'Treat at night (dusk or dark) — wasps are on the nest and sluggish. DFW summer means wasps are active very early in the morning.',
      callPro: false,
      note: 'Paper wasps are less aggressive than yellow jackets but will sting if nest is disturbed. Treat after dark and approach slowly.',
    },
    attic: {
      approach: 'Paper wasps in attics can build large colonies over DFW summer. Locate entry point, spray with residual (Temprid SC) at entry after dark.',
      timing: 'Treat at night. Wear protective clothing — attic access can agitate the colony. Seal entry point the next day after treatment.',
      callPro: true,
      note: 'Attic paper wasp colonies can be very large by mid-summer. Professional treatment recommended for attic nests to avoid stings in confined space.',
    },
    ground: { approach: 'Paper wasps rarely nest in ground — verify it is not yellow jackets first. If paper wasp, treat and remove small structure they are building on.',
      timing: 'Ground nests — treat at night. Pour dust treatment (Tempo Dust) into void if applicable.',
      callPro: false,
      note: 'Confirm species before treating. Paper wasps near ground are usually on a low structure or object — remove the object after treatment.',
    },
    deck: {
      approach: 'Paper wasps on decks are very common in DFW summer. Spray nest at night and remove. Pre-treat deck wood with residual in May to deter queen nest-building.',
      timing: 'Treat at night. Apply residual spray to deck undersides in late April / early May before DFW wasps start building.',
      callPro: false,
      note: 'Prevention is the best approach for deck paper wasps in DFW. A May perimeter spray prevents most nests from establishing.',
    },
    tree: {
      approach: 'Tree paper wasp nests away from the structure are generally low risk. Only treat if within 10 feet of a frequently used area.',
      timing: 'Treat at night for any nests near patios or play areas. Distant tree nests can be left alone.',
      callPro: false,
      note: 'Paper wasp nests in trees help control caterpillars and other garden pests. Leave distant nests alone — they die off in DFW winter.',
    },
  },
  yellowjacket: {
    eaves: {
      approach: 'Yellow jackets in eaves are aggressive — treat only at night with full protective clothing. Use Wasp Freeze for immediate knockdown, then residual at entry.',
      timing: 'Strictly nighttime (after 10pm in DFW summer — they stay active late). Seal entry point the next morning after all activity stops.',
      callPro: true,
      note: 'Yellow jackets are the most dangerous DFW wasp. Eave/wall nests can house hundreds — professional treatment is strongly recommended.',
    },
    attic: {
      approach: 'Yellow jacket attic colonies can exceed 5,000 individuals by August in DFW. This is a professional-only situation.',
      timing: 'Do not attempt DIY. Large yellow jacket colonies require professional foam or dust injection with proper protective equipment.',
      callPro: true,
      note: 'Call a licensed pest professional immediately. DFW August yellow jacket attic colonies are among the most dangerous residential pest situations.',
    },
    ground: {
      approach: 'Ground yellow jacket nests in DFW yards are common. At night, pour Tempo Dust or Sevin dust directly into the hole. Cover with a bowl to block exit.',
      timing: 'Strictly after dark — 10pm or later in DFW summer. Do not disturb the entrance during the day. Wear long sleeves, pants, gloves.',
      callPro: false,
      note: 'Ground yellow jackets can be DIY treated at night with dust. If near a high-traffic area or if the colony is very active, call a pro.',
    },
    deck: {
      approach: 'Yellow jackets nesting under deck or in deck structure void — treat at night with Temprid SC or Tempo Dust. Seal entry after treatment confirmed effective.',
      timing: 'Night treatment only. Yellow jackets defending a deck void will aggressively pursue threats.',
      callPro: true,
      note: 'Deck void yellow jacket nests are best handled professionally due to confined space and high aggression. Stings near face and neck are common in deck situations.',
    },
    tree: {
      approach: 'Yellow jacket tree nests — treat at night with long-range wasp spray. If nest is large (softball or larger), call a professional.',
      timing: 'Night only. DFW summer: wait until after 9:30pm when ambient temperature drops slightly.',
      callPro: false,
      note: 'Small tree yellow jacket nests can be DIY treated at night. Nests larger than a softball or in high-traffic areas warrant professional help.',
    },
  },
  muddauber: {
    eaves: { approach: 'Mud daubers are solitary and non-aggressive — they rarely sting unless directly handled. Remove mud tubes with a putty knife. No chemical treatment needed.',
      timing: 'Remove tubes any time — mud daubers are not colony defenders. Wait until old tubes are confirmed empty (dry, crumbling).',
      callPro: false, note: 'Mud daubers are beneficial — they hunt black widows and other spiders. Consider tolerating them on out-of-sight surfaces.',
    },
    attic: { approach: 'Mud daubers in attics rarely pose a threat. Remove tubes during a cool morning inspection. No chemical treatment needed.',
      timing: 'Any time. Mud daubers are not aggressive. Wear light gloves when removing old tubes.',
      callPro: false, note: 'No professional needed for mud daubers. They are beneficial, solitary, and non-aggressive.',
    },
    ground: { approach: 'Mud daubers do not nest in ground. If you see ground nesting wasps, it is likely yellow jackets — recheck species ID.',
      timing: 'N/A — if ground nesting, this is a different species. Reidentify before treating.',
      callPro: false, note: 'Mud daubers are aerial nesters. Ground nesting wasps in DFW are typically yellow jackets.',
    },
    deck: { approach: 'Mud tube removal with putty knife. No chemical treatment. Seal bare wood with paint or sealant to discourage re-use.',
      timing: 'Any time. Mud daubers are docile.',
      callPro: false, note: 'Painting or sealing unfinished wood on decks is the best long-term mud dauber deterrent.',
    },
    tree: { approach: 'Mud daubers on trees or structures are low risk. Remove tubes if aesthetically undesirable. Leave if out of sight.',
      timing: 'Any time.',
      callPro: false, note: 'No action required for distant mud dauber tubes. They are DFW\’s free spider control service.',
    },
  },
  honeybee: {
    eaves: { approach: 'Honey bees in eaves are a protected species in Texas. DO NOT spray. Call a beekeeper or bee removal specialist — they can relocate the colony.',
      timing: 'Any time for beekeeper contact. Do not disturb the colony. Seal the area from indoor access if bees are entering living space.',
      callPro: true, note: 'Honey bees require a professional beekeeper or bee removal specialist — not a pest control company. Many DFW beekeepers remove swarms for free.',
    },
    attic: { approach: 'Honey bees in attic walls or void require professional removal — a hive can hold 30,000+ bees and 60+ lbs of honeycomb. Extermination without removal causes wax melt and structural damage.',
      timing: 'Contact a bee removal professional immediately. Do not seal the entry while the colony is alive inside.',
      callPro: true, note: 'Attic honey bee hives are a significant structural issue — the honeycomb must be physically removed or it will melt in DFW summer heat, attracting pests.',
    },
    ground: { approach: 'Ground-nesting honey bees are rare. If you see ground bees, they are likely sweat bees or mining bees — harmless and beneficial. Leave them alone.',
      timing: 'No action needed for ground-nesting native bees.',
      callPro: false, note: 'True honey bees do not nest in ground. Ground bee activity in DFW is almost always harmless solitary native bees.',
    },
    deck: { approach: 'Honey bees under deck should be evaluated by a beekeeper before any action. A swarm on a deck is temporary — they may move in 24-48 hours.',
      timing: 'Wait 48 hours for a swarm to move on. If they begin building comb, contact a beekeeper immediately.',
      callPro: true, note: 'A honey bee swarm resting on your deck is not a threat — they are looking for a new home. Contact a DFW beekeeper to relocate if needed.',
    },
    tree: { approach: 'Swarms in trees are temporary. Contact a local DFW beekeeper — many will collect swarms for free. Do not spray.',
      timing: 'Tree swarms typically leave within 24–72 hours. Contact a beekeeper if they are building comb.',
      callPro: true, note: 'Honey bee swarms in trees are a gift to local beekeepers. Call a DFW beekeeper before any pest control action.',
    },
  },
  bumblebee: {
    eaves: { approach: 'Bumble bees rarely nest in eaves. If confirmed, leave alone — colonies are small (50–500) and die in fall. They rarely sting unless directly handled.',
      timing: 'No action needed. Colony will die naturally in DFW fall.',
      callPro: false, note: 'Bumble bees are critically important pollinators. DFW bumble bee colonies die out naturally each fall — no treatment needed.',
    },
    ground: { approach: 'Ground bumble bee nests are protected in spirit if not by law. Avoid mowing that area until fall. They die out naturally.',
      timing: 'Mark the area and avoid disturbing until October/November when the colony naturally ends.',
      callPro: false, note: 'Bumble bee ground nests are small and non-aggressive unless directly disturbed. Leave them alone through DFW fall.',
    },
    deck: { approach: 'Bumble bees under decks or in deck boxes are usually building a small seasonal colony. Leave alone and they will die out in fall.',
      timing: 'No action needed unless in a high-traffic area where disturbance is likely.',
      callPro: false, note: 'Bumble bees near high-traffic deck areas can be gently relocated by a beekeeper if absolutely necessary.',
    },
    attic: { approach: 'Bumble bees in attics are very rare. If confirmed, contact a beekeeper. Do not spray — bumble bees are important pollinators.',
      timing: 'Contact a beekeeper before any treatment decision.',
      callPro: true, note: 'Bumble bees in attics are unusual — positive species ID recommended before any action.',
    },
    tree: { approach: 'Bumble bee nests in trees are seasonal and low risk. Leave alone until fall.',
      timing: 'No treatment needed.',
      callPro: false, note: 'Tree bumble bee nests die out in DFW fall. No action needed.',
    },
  },
  carpenter: {
    eaves: { approach: 'Carpenter bees drill into unfinished wood. Fill holes with steel wool + wood filler + paint. Apply residual (WD-40 or Cyzmic CS) into open holes before filling.',
      timing: 'Treat holes in early spring before females lay eggs in DFW (March-April). Summer: treat active holes at night.',
      callPro: false, note: 'Prevention is the best approach — paint or stain all exposed wood. Carpenter bees avoid painted surfaces.',
    },
    attic: { approach: 'Carpenter bees entering attic vents or soffits — seal all unfinished wood edges. Treat active bore holes with residual dust (Tempo Dust).',
      timing: 'Treat active holes in late afternoon when bees are near the hole. Seal after treatment.',
      callPro: false, note: 'Carpenter bee structural damage is real but slow. Address all unpainted wood — they will return to the same area year after year.',
    },
    deck: { approach: 'Decks are the most common DFW carpenter bee target. Paint or stain all deck wood. Treat existing holes with Cyzmic CS + plug with steel wool + fill.',
      timing: 'Spring prevention is key — treat in March before DFW carpenter bees become active. Seal holes after treatment.',
      callPro: false, note: 'Carpenter bees cause cosmetic damage and can weaken structural members over many seasons. Annual spring treatment and painting eliminates the problem.',
    },
    ground: { approach: 'Carpenter bees do not nest in ground. If ground nesting, re-identify the species.',
      timing: 'N/A.',
      callPro: false, note: 'Carpenter bees are wood-boring, not ground-nesting. Ground nesting = different species.',
    },
    tree: { approach: 'Carpenter bees in dead wood of trees away from the house — leave alone. They are beneficial pollinators when not damaging structures.',
      timing: 'No action needed for tree carpenter bees away from structure.',
      callPro: false, note: 'Carpenter bees in dead tree limbs are normal. Only treat if they are actively damaging your home structure.',
    },
  },
};

export default function DFWWaspBeePestGuide() {
  const [insect, setInsect] = useState('');
  const [nestLocation, setNestLocation] = useState('');

  const rec = insect && nestLocation ? RECS[insect]?.[nestLocation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🐝</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Wasp & Bee Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW summer is peak wasp season — paper wasps begin building in April, yellow jackets peak in August.
          Identifying wasp vs. bee determines the entire response: bees are protected pollinators requiring specialist
          removal; wasps are pests. Timing matters — most treatments are far safer and more effective after dark.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>⚡ DFW Seasonal Calendar</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 2, paddingLeft: 20 }}>
            <li><strong style={{ color: '#E8F0FE' }}>March–April</strong>: Queen paper wasps start building — treat eaves and deck wood now</li>
            <li><strong style={{ color: '#E8F0FE' }}>May–July</strong>: Paper wasp colonies expand, honey bee swarm season in DFW</li>
            <li><strong style={{ color: '#E8F0FE' }}>August</strong>: Yellow jacket colonies at maximum size and aggression in DFW</li>
            <li><strong style={{ color: '#E8F0FE' }}>September–October</strong>: Yellow jackets become more aggressive as food sources diminish</li>
            <li><strong style={{ color: '#E8F0FE' }}>November–March</strong>: Wasp colonies die out; queens overwinter in protected spots</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Get Your Response Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>Insect Type</label>
            <select value={insect} onChange={e => setInsect(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select insect…</option>
              {INSECT_TYPES.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>Nest Location</label>
            <select value={nestLocation} onChange={e => setNestLocation(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select location…</option>
              {NEST_LOCATIONS.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
            </select>
          </div>
          {rec && (
            <div style={{ background: rec.callPro ? '#1a0a0a' : '#F5E642', border: rec.callPro ? '2px solid #FF4444' : 'none', borderRadius: 8, padding: 16 }}>
              {rec.callPro && (
                <div style={{ color: '#FF4444', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>⚠️ PROFESSIONAL RECOMMENDED</div>
              )}
              <div style={{ color: rec.callPro ? '#E8F0FE' : '#0A1628', fontWeight: 700, marginBottom: 6 }}>🧪 Approach</div>
              <div style={{ color: rec.callPro ? '#94A3B8' : '#0A1628', lineHeight: 1.6, marginBottom: 10 }}>{rec.approach}</div>
              <div style={{ color: rec.callPro ? '#E8F0FE' : '#0A1628', fontWeight: 700, marginBottom: 6 }}>⏰ Timing</div>
              <div style={{ color: rec.callPro ? '#94A3B8' : '#0A1628', lineHeight: 1.6, marginBottom: 10 }}>{rec.timing}</div>
              <div style={{ color: rec.callPro ? '#E8F0FE' : '#0A1628', fontWeight: 700, marginBottom: 4 }}>💡 Note</div>
              <div style={{ color: rec.callPro ? '#94A3B8' : '#0A1628', lineHeight: 1.6 }}>{rec.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
