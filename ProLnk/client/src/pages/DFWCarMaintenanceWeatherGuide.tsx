import { useState } from 'react';

type VehicleType = 'sedan' | 'suv' | 'truck' | 'ev';
type WeatherConcern = 'summer' | 'ice' | 'hail';

interface CarPlan {
  title: string;
  checks: string[];
  storage: string;
  urgency: string;
  tip: string;
}

const summerPlans: Record<VehicleType, CarPlan> = {
  sedan: { title: 'Summer Sedan Care for DFW', checks: ['Check tire pressure weekly — loses 1 PSI per 10°F rise', 'Test battery before June (fails 3x faster in DFW heat)', 'Flush and refill coolant every 2 years', 'Check AC refrigerant — DFW AC runs 8+ months', 'Park in shade or use windshield sunshade always'], storage: 'Garage parking reduces paint oxidation by 80% in DFW UV', urgency: 'Battery and coolant are top risks in DFW summer heat', tip: 'Replace battery at 3 years in DFW — heat kills batteries 2 years before manufacturer rating' },
  suv: { title: 'Summer SUV Care for DFW', checks: ['Check all 4 tires + spare (larger tires lose PSI faster)', 'Test battery health free at any auto parts store', 'Inspect transmission fluid — DFW towing in heat is brutal', 'Check tow hitch for corrosion if towing in heat', 'Roof cargo boxes trap heat — store separately if unused'], storage: 'Larger vehicles absorb more solar heat — window tint is worth the investment', urgency: 'Transmission overheating under DFW towing loads is #1 SUV summer failure', tip: 'DFW SUV AC should cool interior from 140°F to 72°F in under 8 min — if not, service immediately' },
  truck: { title: 'Summer Truck Care for DFW', checks: ['Check truck bed liner — UV degrades uncoated beds in 2 seasons', 'Inspect trailer wiring for heat damage if towing', 'Check coolant capacity — DFW towing generates extreme heat', 'Inspect leaf springs and shocks for heat-related wear', 'Bed cover keeps cargo temps 30°F cooler than open bed'], storage: 'Spray-in bed liner lasts 3-5x longer than drop-in mats in DFW UV', urgency: 'DFW summer towing with low coolant can destroy an engine in 20 minutes', tip: 'Invest in spray-in bed liner once rather than replacing cheap mats every 2 years' },
  ev: { title: 'Summer EV Care for DFW', checks: ['Charge to 80% daily — avoid 100% in heat to extend battery life', 'Pre-condition cabin while plugged in to reduce battery drain', 'Check tire pressure weekly — heat affects EV range significantly', 'Park in shade or garage — thermal management uses energy', 'Monitor battery temp in app — alert above 95°F ambient'], storage: 'EV range drops 20-30% on peak DFW summer days from thermal management', urgency: 'Level 2 home charger essential in DFW — range loss in heat requires overnight recovery', tip: 'Set departure time in app so car pre-cools on grid power before driving — saves range and battery health' },
};

const icePlans: Record<VehicleType, CarPlan> = {
  sedan: { title: 'Ice Storm Sedan Prep for DFW', checks: ['Keep gas tank above 1/2 in ice season (Oct–Feb)', 'Verify antifreeze to -20°F — DFW can spike cold fast', 'Keep ice scraper in car — DFW ice forms within 1 hour', 'Never use hot water on frozen windshield (cracks glass)', 'Windshield washer fluid must be freeze-rated'], storage: 'Park in garage — exposed cars take 3x longer to thaw', urgency: 'DFW ice storms give 1-4 hours warning — prep the night before', tip: 'Spray windshield with 3:1 water/vinegar the night before — prevents ice bonding' },
  suv: { title: 'Ice Storm SUV Prep for DFW', checks: ['Verify 4WD/AWD engagement before ice season', '4WD helps you go but not stop on ice — slow down anyway', 'Carry jumper cables — DFW cold kills batteries overnight', 'Check brake fluid — moisture lowers boiling point on icy hills', 'Sandbag in cargo area for traction if rear-wheel drive'], storage: 'SUV height catches more wind chill — park in garage or south-facing driveway', urgency: 'DFW black ice forms on bridges 30 min before surface roads — use feeder roads', tip: 'Feeder roads (service roads) beside highways stay clear longer than elevated overpasses in DFW ice' },
  truck: { title: 'Ice Storm Truck Prep for DFW', checks: ['Most DFW trucks are RWD — add sandbags or concrete bags in bed', 'Check 4x4 switch or locking hubs before winter season', 'Carry tow strap — DFW trucks often help neighbors in ice', 'Diesel: verify winter-blend fuel from October on (anti-gel)', 'Keep DEF fluid above 1/4 — can freeze in extreme cold'], storage: 'Diesel trucks may need block heater below 10°F — DFW rarely but occasionally hits this', urgency: 'RWD trucks without weight in bed are the most common DFW ice accident vehicle', tip: '2 bags of Texas Traction sand (80 lbs) in bed transforms RWD traction on DFW ice' },
  ev: { title: 'Ice Storm EV Prep for DFW', checks: ['Charge to 90-100% before DFW ice storm — cold cuts range 30-40%', 'Pre-heat cabin while plugged in before driving on ice', 'Turn off aggressive regen braking on ice — causes slides', 'Keep home Level 2 charger operational — grid may fail in storms', 'Download your EV app — remote preheat before you go out'], storage: 'EVs parked in cold overnight lose 5-15% charge — garage parking critical', urgency: 'Feb 2021 DFW blackouts showed EV grid dependency — keep above 50% during ice warnings', tip: 'EVs generate no waste heat — cabin heating draws from battery directly, so always precondition while plugged in' },
};

const hailPlans: Record<VehicleType, CarPlan> = {
  sedan: { title: 'Hail Protection for DFW Sedan', checks: ['Monitor DFW storm radar (April–June is peak hail season)', 'Know your nearest covered parking garage by address', 'Keep comprehensive insurance current — DFW hail claims average $4,500', 'Hail blanket or fitted car cover for unexpected storms', 'Never park under trees — branches cause as much damage as hail'], storage: 'Garage is best; covered parking garages second; street parking last', urgency: 'DFW gets 50+ hail events annually — have a plan before storm season', tip: 'WFAA and NBC5 DFW storm alerts give 15-30 min warning — enough to move the car to cover' },
  suv: { title: 'Hail Protection for DFW SUV', checks: ['SUV roof has more surface area — hail costs more than sedans', 'Foam hail blankets are at Walmart/Home Depot — keep in cargo area', 'Know covered parking garages near home and work', 'Comprehensive insurance essential — verify your deductible amount', 'Document pre-existing roof dents before storm season with photos'], storage: 'Park east or north-facing when possible — DFW hail typically comes from the southwest', urgency: 'SUV roof dent repair averages $5,000-8,000 after major DFW hail', tip: 'Paintless dent repair (PDR) works on most hail dents and costs 40% less than traditional repair' },
  truck: { title: 'Hail Protection for DFW Trucks', checks: ['Truck beds are hail magnets — keep covered or indoors during storms', 'Cab roof is most expensive hail repair on pickup trucks', 'Dual cab trucks have more surface area = more expensive repairs', 'Document truck condition with photos every spring before hail season', 'Call multiple PDR shops for estimates — backlogs form after storms'], storage: 'Even carport parking saves 60% of potential damage vs open driveway', urgency: 'DFW truck hail claims average $6,000-10,000 — insurance deductible matters a lot', tip: 'Top-rated DFW PDR shops book 6-8 weeks out after storms — call and file claims immediately' },
  ev: { title: 'Hail Protection for DFW EVs', checks: ['EV panoramic glass roofs are especially vulnerable to hail', 'Hail damage to EV sensors (cameras, radar) runs $2,000+ per sensor', 'Verify your EV policy covers hail damage to electronic systems', 'Get a hail blanket designed for EVs with glass roof protection', 'Know location of covered charging stations near home and work'], storage: 'Garage parking for EVs during hail season is the best investment you can make', urgency: 'EV hail repair costs 40-60% more than ICE vehicles due to sensor complexity', tip: 'Tesla Body Centers in DFW have 3-4 week waits after major hail — document and file claims immediately' },
};

const allPlans = { summer: summerPlans, ice: icePlans, hail: hailPlans };

export default function DFWCarMaintenanceWeatherGuide() {
  const [vehicle, setVehicle] = useState<VehicleType | ''>('');
  const [concern, setConcern] = useState<WeatherConcern | ''>('');
  const [result, setResult] = useState<CarPlan | null>(null);

  function getPlan() {
    if (!vehicle || !concern) return;
    setResult(allPlans[concern as WeatherConcern]?.[vehicle as VehicleType] || null);
  }

  const concernColors: Record<string, string> = { summer: '#ef4444', ice: '#60a5fa', hail: '#a78bfa' };
  const color = concern ? (concernColors[concern] || '#F5E642') : '#F5E642';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚗</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Car Maintenance Weather Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Protecting your vehicle from 110°F summers, ice storms, and hail season in DFW</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {[['☀️','Summer','110°F heat destroys batteries and coolant 2x faster'],['🧊','Ice Storm','1-4 hour warning windows — roads freeze fast'],['⛈️','Hail','50+ hail events/year — DFW hail capital of Texas']].map(([icon, label, desc]) => (
            <div key={String(label)} style={{ background: '#1e3a5f', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Get Your Vehicle Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Vehicle Type</label>
              <select value={vehicle} onChange={e => setVehicle(e.target.value as VehicleType)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334d6e', fontSize: 14 }}>
                <option value="">Select vehicle...</option>
                <option value="sedan">Car / Sedan / Coupe</option>
                <option value="suv">SUV / Crossover</option>
                <option value="truck">Pickup Truck</option>
                <option value="ev">Electric Vehicle (EV)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Weather Concern</label>
              <select value={concern} onChange={e => setConcern(e.target.value as WeatherConcern)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334d6e', fontSize: 14 }}>
                <option value="">Select concern...</option>
                <option value="summer">Extreme Summer Heat</option>
                <option value="ice">Ice Storms</option>
                <option value="hail">Hail Season</option>
              </select>
            </div>
          </div>
          <button onClick={getPlan}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Get My Plan →
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
            <h2 style={{ color, fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{result.title}</h2>
            <div style={{ background: '#112240', borderRadius: 8, padding: 12, marginBottom: 16, borderLeft: `3px solid ${color}` }}>
              <span style={{ color: '#94a3b8', fontSize: 12 }}>TOP RISK: </span><span style={{ color: '#fff', fontSize: 13 }}>{result.urgency}</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ color: '#94a3b8', fontSize: 12, marginBottom: 10 }}>MAINTENANCE CHECKLIST</h3>
              {result.checks.map((c, i) => (
                <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 6, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#4ade80', flexShrink: 0 }}>✓</span>{c}
                </div>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <span style={{ color: '#94a3b8', fontSize: 12 }}>STORAGE: </span><span style={{ color: '#cbd5e1', fontSize: 13 }}>{result.storage}</span>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <span style={{ color: '#F5E642', fontSize: 12 }}>💡 TIP: </span><span style={{ color: '#cbd5e1', fontSize: 13 }}>{result.tip}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
