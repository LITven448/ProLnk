import { useState } from 'react';

type PetType = 'dog-small' | 'dog-large' | 'cat' | 'rabbit';
type HomeType = 'house-yard' | 'house-no-yard' | 'apartment';

interface SafetyPlan {
  threshold: string;
  walkTiming: string;
  steps: string[];
  shelter: string;
  emergency: string;
  heatStroke: string[];
}

const plans: Record<PetType, Record<HomeType, SafetyPlan>> = {
  'dog-small': {
    'house-yard': { threshold: 'Stay inside above 85°F air temp — small dogs overheat in 10-15 min', walkTiming: 'Before 8am or after 8pm in DFW summer — pavement test: hand to ground 5 sec = too hot for paws', steps: ['Pavement test before every walk — black asphalt hits 160°F in DFW summer', 'Keep walks under 10 min above 90°F air temp', 'Always bring water and a collapsible bowl', 'Wet paws and belly with cool (not cold) water before going out', 'Dog door in summer lets AC out — use only during cooler morning/evening'], shelter: 'Shaded outdoor rest area with fresh water changed 3x daily in DFW heat', emergency: 'BluePearl DFW: 972-994-9111 | VCA Animal Hospital: multiple DFW locations — call ahead', heatStroke: ['Excessive panting or drooling', 'Bright red or pale gums', 'Vomiting or diarrhea', 'Staggering or confusion', 'Collapse — call vet immediately'] },
    'house-no-yard': { threshold: 'No yard buffer — all outdoor time is walk-only; above 90°F limit to 5 min bathroom breaks', walkTiming: 'Before 7:30am or after 8:30pm in DFW peak summer', steps: ['Test pavement with bare hand — if uncomfortable after 5 sec, use boots or skip', 'Carry pet to grass when possible — avoid concrete in midday', 'Return immediately if panting becomes rapid', 'Keep indoor temp 72-76°F — small dogs are sensitive to heat shock from cold AC to hot sidewalk'], shelter: 'Indoor with AC — small dogs should not be outside above 95°F for any extended time', emergency: 'VCA Preston Park Animal Hospital: 972-985-8826 | Texas A&M Vet Emergency: 979-664-3000', heatStroke: ['Rapid shallow breathing', 'Weakness or stumbling', 'Red/dark gums', 'Drooling excessively', 'Loss of consciousness'] },
    apartment: { threshold: 'Above 88°F — restrict to brief 3-5 min potty trips only; no exercise walks', walkTiming: 'Before 7am or after 9pm; avoid pool deck and rooftop areas — concrete bakes heat', steps: ['Booties protect paws on hot apartment complex pavement', 'Indoor potty mat as backup for extreme heat days (above 100°F)', 'Cooling mat inside provides relief on hot days', 'Carry water for any outing over 5 min'], shelter: 'Climate-controlled unit only — no outdoor kenneling for apartment small dogs in DFW summer', emergency: 'DFW emergency vet: BluePearl Grand Prairie 972-994-9111 | Irving Pet Hospital: 972-253-4116', heatStroke: ['Panting excessively indoors', 'Seeking cool floors compulsively', 'Vomiting after coming inside', 'Red or sticky gums'] },
  },
  'dog-large': {
    'house-yard': { threshold: 'Limit outdoor time above 100°F to 15 min; above 105°F to 5 min bathroom only', walkTiming: 'Before 8am or after 7:30pm in DFW summer — pavement test is critical for large paws too', steps: ['Large dogs generate more body heat — watch for panting that does not slow after resting', 'Provide shaded yard area with kiddie pool for cooling (most effective for large dogs)', 'Change water bowl 3x daily in DFW heat — bacteria grows fast in warm water', 'Dark-coated large dogs overheat faster — extra caution required', 'Dog door can let in 100°F air all day — timer or manual control recommended'], shelter: 'Shaded structure with air circulation + kiddie pool + fresh water — do not leave unshaded above 95°F', emergency: 'Metroplex Veterinary Centre: 817-430-4425 | TLC Animal Hospital: 972-234-1688', heatStroke: ['Excessive panting not slowing after rest', 'Glazed eyes or confusion', 'Red or purple gums', 'Drooling thick saliva', 'Collapse — cool immediately and call vet'] },
    'house-no-yard': { threshold: 'Large dogs need regular exercise — heat requires moving all activity to early morning', walkTiming: 'Before 7:30am (under 80°F target) and optional very short 8pm walk if below 90°F', steps: ['Plan for 45+ min morning walk before DFW heat peaks', 'Mental enrichment indoors replaces exercise on peak heat days', 'Bring extra water — large dogs need 1 oz per lb of body weight in DFW heat', 'Cool wet towel on belly and paws between walks provides 15-20°F body temp reduction'], shelter: 'Indoor with AC set below 76°F — large dogs in DFW summer need consistent cool space', emergency: 'Prestonwood Animal Clinic: 972-447-8030 | Blue Pearl Plano: 972-867-7575', heatStroke: ['Cannot stop panting after 30 min rest', 'Seeking cold floor, tile, or bathtub', 'Drooling heavily indoors', 'Dark red gums'] },
    apartment: { threshold: 'Large dogs in apartments face DFW summer as a serious management challenge — plan ahead', walkTiming: '5:30-7am walk + optional 8:30pm walk; skip all midday outdoor time June-September', steps: ['Create a morning routine before DFW heat peaks — large dogs need it', 'Dog daycare with AC is a valid summer solution for working owners', 'Portable fan + cooling mat as indoor heat management tools', 'Freeze treats and lick mats for mental stimulation on skip-walk days'], shelter: 'Full indoor climate control — no outdoor patio kenneling above 90°F for large dogs', emergency: 'North Texas Emergency Pet Clinic: 972-994-9110 | Cedar Hill Animal Hospital: 972-291-2230', heatStroke: ['Cannot settle after coming inside', 'Bright red mucous membranes', 'Vomiting after exertion', 'Muscle tremors'] },
  },
  cat: {
    'house-yard': { threshold: 'Outdoor cats in DFW summer need access to shade and water at all times; limit above 105°F', walkTiming: 'If leash-trained: before 9am or after 8pm only — cats are more heat-tolerant than dogs but still at risk', steps: ['Ensure outdoor cats have 3+ shaded areas to rotate', 'Fresh water in shade — cats stop drinking warm water and dehydrate', 'Check on outdoor cats every 2 hours above 100°F', 'Feral/outdoor cats: provide shaded insulated shelter with water'], shelter: 'Insulated outdoor cat shelter with ventilation in shade — cats self-regulate but need options', emergency: 'Cats show heat distress later than dogs — DFW Cat Clinic: 972-403-2287 | Cat Specialist: 214-351-1512', heatStroke: ['Panting (rare in cats — serious sign)', 'Drooling heavily', 'Lethargy or hiding', 'Warm to touch on ears and paws'] },
    'house-no-yard': { threshold: 'Indoor cats: maintain indoor temp below 80°F — cats in homes without AC are at serious risk above 95°F outdoor temp', walkTiming: 'Indoor-only: no outdoor restriction needed; harness-trained cats: before 9am or after 8pm', steps: ['Close blinds on south-facing windows in DFW summer — reduces indoor temp 5-8°F', 'Ceramic tile areas are natural cat cooling zones — keep accessible', 'Fresh water fountain encourages hydration in heat', 'Multiple water stations around home in DFW summer'], shelter: 'Ensure cat can access coolest room — bathroom tile, basement if available', emergency: 'All Cats Hospital: 972-387-2287 | DFW Feline Medical Center: 817-421-5000', heatStroke: ['Panting — immediate vet attention', 'Collapse or unresponsiveness', 'Vomiting or seizures in heat'] },
    apartment: { threshold: 'Apartment cats at risk if AC fails — have backup plan for DFW grid outages in summer', walkTiming: 'Indoor-only cats: manage indoor temp only; no outdoor restriction needed', steps: ['Keep emergency carrier ready in case you need to relocate if AC fails', 'Battery-powered fan for power outage preparedness in DFW summer', 'Frozen water bottles wrapped in towels as emergency cooling tools', 'Sign up for Oncor outage alerts — know when your area loses power'], shelter: 'AC-controlled apartment; have pet-friendly hotel or friends as backup if grid fails', emergency: 'Garland Animal Emergency: 972-278-3647 | Richardson Emergency Vet: 972-907-8668', heatStroke: ['Labored breathing or panting', 'Body feels very hot to touch', 'Unresponsive or seizing — cool and call immediately'] },
  },
  rabbit: {
    'house-yard': { threshold: 'Rabbits are extremely heat-sensitive — dangerous above 80°F; deadly above 90°F in DFW', walkTiming: 'No outdoor time above 80°F for rabbits — DFW summer kills rabbits within 30-60 min in heat', steps: ['Rabbits cannot survive DFW summer outdoors without full shade and cooling', 'Frozen water bottle in hutch for rabbit to lean against', 'Wet their ears — primary heat dissipation mechanism for rabbits', 'Move outdoor rabbits inside June-September in DFW'], shelter: 'Indoor with AC is mandatory for DFW rabbits in summer — outdoor hutches are not safe above 80°F', emergency: 'Rabbit-savvy vets in DFW: Exotic Animal Hospital: 972-867-8660 | DFW Wildlife: 972-234-9453', heatStroke: ['Rapid shallow breathing', 'Limp or unresponsive', 'Wet around nose', 'Blue-tinged lips — emergency'] },
    'house-no-yard': { threshold: 'Indoor rabbits: maintain home below 75°F — rabbits in DFW heat above 80°F can go into heat stroke within an hour', walkTiming: 'No outdoor exercise above 80°F for any rabbit in DFW — no exceptions', steps: ['Ceramic tile floor play area inside keeps rabbits naturally cooler', 'Fresh cold water every 4 hours in DFW summer', 'Frozen veggie treats (kale, lettuce) help hydration and cooling', 'Never leave rabbit in car in DFW — car reaches 150°F in minutes'], shelter: 'Climate-controlled home; if AC fails — wet towels over cage, frozen bottles, or relocate immediately', emergency: 'North Texas Exotic Animal Hospital: 972-867-8660 | Texas Rabbit House: 214-770-9940 (rescue info)', heatStroke: ['Labored breathing', 'Stretched out limp on side', 'Wet around mouth or nose', 'Seizures — wrap in cool (not cold) wet towel and call vet immediately'] },
    apartment: { threshold: 'Apartment rabbits: DFW grid outages during peak summer are the #1 risk — have backup plan always', walkTiming: 'Indoor only in summer — no exceptions for apartment rabbits in DFW heat', steps: ['Keep rabbit area away from south-facing windows — sun exposure in apartment raises local temp significantly', 'Battery-powered fan and frozen bottles as outage backup', 'Emergency contacts ready: DFW rabbit vets are few — know yours before emergency', 'Alert neighbors to check on rabbit if you lose power and cannot get home quickly'], shelter: 'Always AC-controlled; have pet carrier and emergency cooling supplies stocked', emergency: 'Exotic Animal Hospital Coppell: 972-462-2223 | call ahead — rabbit emergencies need specialist', heatStroke: ['Any panting or labored breathing — immediate vet', 'Limp or glassy-eyed', 'Twitching or seizures'] },
  },
};

export default function DFWPetSafetyHeatGuide() {
  const [petType, setPetType] = useState<PetType | ''>('');
  const [homeType, setHomeType] = useState<HomeType | ''>('');
  const [result, setResult] = useState<SafetyPlan | null>(null);

  function getPlan() {
    if (!petType || !homeType) return;
    setResult(plans[petType as PetType]?.[homeType as HomeType] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🐾</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Pet Heat Safety Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Protect your pets from DFW's deadly summer heat — pavement, timing, and heat stroke prevention</p>
        </div>

        <div style={{ background: '#7c1d1d', borderRadius: 12, padding: 16, marginBottom: 24, borderLeft: '4px solid #ef4444′ }}>
          <h2 style={{ color: '#fca5a5', fontSize: 15, marginBottom: 8 }}>🔥 The Pavement Test — Do This Every Time</h2>
          <p style={{ color: '#fecaca', fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            Place the back of your hand on the pavement. If you cannot hold it there for <strong>5 seconds</strong>, it is too hot for your pet's paws. DFW black asphalt reaches <strong>160°F</strong> on peak summer days — paw burns occur in 60 seconds.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🐶 Get Your Pet Safety Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pet Type</label>
              <select value={petType} onChange={e => setPetType(e.target.value as PetType)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334d6e', fontSize: 14 }}>
                <option value="">Select pet...</option>
                <option value="dog-small">Dog (Small — under 25 lbs)</option>
                <option value="dog-large">Dog (Large — over 25 lbs)</option>
                <option value="cat">Cat (Indoor or Outdoor)</option>
                <option value="rabbit">Rabbit</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value as HomeType)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334d6e', fontSize: 14 }}>
                <option value="">Select home type...</option>
                <option value="house-yard">House with Yard</option>
                <option value="house-no-yard">House without Yard</option>
                <option value="apartment">Apartment / Condo</option>
              </select>
            </div>
          </div>
          <button onClick={getPlan}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Get Safety Plan →
          </button>
        </div>

        {result && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>🌡️ Temperature Threshold</h2>
              <p style={{ color: '#fca5a5', fontWeight: 600, fontSize: 14, margin: 0 }}>{result.threshold}</p>
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>⏰ Walk Timing for DFW Summer</h2>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{result.walkTiming}</p>
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>✅ Heat Safety Steps</h2>
              {result.steps.map((s, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 6, display: 'flex', gap: 8 }}><span style={{ color: '#4ade80', flexShrink: 0 }}>✓</span>{s}</div>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div style={{ background: '#112240', borderRadius: 10, padding: 14 }}>
                <h3 style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>SHELTER GUIDANCE</h3>
                <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0, lineHeight: 1.5 }}>{result.shelter}</p>
              </div>
              <div style={{ background: '#112240', borderRadius: 10, padding: 14 }}>
                <h3 style={{ color: '#ef4444', fontSize: 12, marginBottom: 8 }}>HEAT STROKE SIGNS</h3>
                {result.heatStroke.map((s, i) => <div key={i} style={{ color: '#fca5a5', fontSize: 12, marginBottom: 3 }}>• {s}</div>)}
              </div>
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 10, padding: 14 }}>
              <h3 style={{ color: '#ef4444', fontSize: 13, marginBottom: 6 }}>🚨 Emergency Contacts</h3>
              <p style={{ color: '#fca5a5', fontSize: 13, margin: 0 }}>{result.emergency}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
