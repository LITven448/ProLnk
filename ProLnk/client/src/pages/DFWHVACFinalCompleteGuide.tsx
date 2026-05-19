import { useState } from 'react';

const stages = [
  'Just moved to DFW — learning the basics',
  'My system is struggling this summer',
  'Planning to replace my system',
  'Getting quotes from contractors',
  'Just got a new system installed',
  'Doing annual maintenance',
  'Selling my DFW home',
  'Buying a DFW home',
];

const stageContent: Record<string, { headline: string; items: [string, string][] }> = {
  'Just moved to DFW — learning the basics': {
    headline: '🌡️ Welcome to DFW — HVAC Is Different Here',
    items: [
      ['Your AC runs ~7 months', 'April through October. Budget accordingly — filter changes every 45-60 days, not 90.'],
      ['105°F is normal in July', 'Your system is designed for it — but it needs to be properly sized and maintained.'],
      ['Humidity is the silent enemy', 'Not just heat — DFW humidity makes 78°F feel like 88°F. Your system must dehumidify, not just cool.'],
      ['Change filters religiously', 'DFW dust and allergens are extreme. Clogged filters cause 80% of breakdowns.'],
      ['Get a smart thermostat', 'Pre-cool before peak hours (3-7pm). Set 76-78°F, not 72°F, to avoid constant running.'],
      ['Find a pro before you need one', 'DFW HVAC companies are slammed in July. Build the relationship in April.'],
    ]
  },
  'My system is struggling this summer': {
    headline: '🔴 Diagnosing Your DFW System\’s Struggle',
    items: [
      ['Check the filter first', 'A clogged filter causes 80% of "struggling" symptoms. Replace if you haven\’t in 45 days.'],
      ['Inspect outdoor unit', 'Clear debris from around condenser. Coils should be clean — dirty coils = 30% efficiency loss.'],
      ['Check for ice on lines', 'Frost on refrigerant lines = airflow problem or refrigerant issue. Shut down and call a pro.'],
      ['Measure supply air temp', 'Put thermometer at a vent. Should read 15-20°F below thermostat setpoint. Less = problem.'],
      ['Look at run cycles', 'Running constantly = struggling to keep up. Short cycling = possibly oversized or low refrigerant.'],
      ['Call a pro with specifics', 'Note: does it struggle in peak heat (2-5pm)? Is humidity high even when cool? That info helps diagnosis.'],
    ]
  },
  'Planning to replace my system': {
    headline: '📋 DFW System Replacement Planning Guide',
    items: [
      ['Get Manual J load calculation', 'Never accept "same size as old system" — proper sizing requires math. Insist on it.'],
      ['Target 18+ SEER2', 'Texas heat means efficiency pays off faster than northern states. Higher SEER2 = faster ROI.'],
      ['Variable speed is worth it in DFW', 'DFW\’s 7-month season makes variable speed payback 4-6 years — better than most markets.'],
      ['Check rebates first', 'Oncor offers $200-500 rebates on high-efficiency systems. Manufacturer rebates often stack.'],
      ['Consider dual-fuel heat pump', 'Heat pump down to 30°F, gas backup below that — optimal for DFW winters.'],
      ['Plan for summer installation', 'If possible, install in spring before peak demand. Better pricing, better scheduling.'],
    ]
  },
  'Getting quotes from contractors': {
    headline: '💼 What to Look for in DFW HVAC Quotes',
    items: [
      ['Did they do a load calc?', 'If they measured your home and calculated heat gain/loss, that\’s a good sign. If not, red flag.'],
      ['Is the brand reputable?', 'Carrier, Lennox, Trane, Rheem all have DFW dealer networks. Beware obscure brands.'],
      ['What SEER2 rating?', 'Texas minimum is 15 SEER2. Good DFW quotes show 17-21 SEER2 options.'],
      ['What\’s the warranty?', '10-year parts, 1-year labor minimum. Some manufacturers offer 12-year with registration.'],
      ['Is the contractor NATE certified?', 'North American Technician Excellence certification = proper training. Ask to see it.'],
      ['What does removal include?', 'Old system disposal, permits, and inspection should be included. Confirm in writing.'],
    ]
  },
  'Just got a new system installed': {
    headline: '✅ Your New DFW System — First Steps',
    items: [
      ['Register your warranty immediately', 'Most manufacturers require registration within 60-90 days for extended warranty. Do it today.'],
      ['Set your first filter reminder', 'DFW: 45-60 days, not 90. Set a phone reminder. This is the single biggest maintenance item.'],
      ['Learn your thermostat', 'Program setback schedules. 78°F when home, 82°F when away in summer. Saves 10-15%.'],
      ['Document everything', 'Photo your unit\’s model/serial numbers, system diagram, and installation paperwork.'],
      ['Check your first electric bill', 'Compare to same month last year. A properly sized, efficient new system should show improvement.'],
      ['Schedule first annual tune-up', 'For 12 months out. Catching early issues under warranty is free — after warranty, you pay.'],
    ]
  },
  'Doing annual maintenance': {
    headline: '🔧 DFW Annual HVAC Maintenance Checklist',
    items: [
      ['Spring (March-April)', 'AC tune-up: coil cleaning, refrigerant check, capacitor test, drain line flush, blower cleaning.'],
      ['Filter check schedule', 'Replace 1-2″ filters every 45-60 days in DFW. 4-5″ media filters every 6-9 months.'],
      ['Outdoor unit clearance', 'Keep 18″ clearance around condenser. Trim back plants — they reduce airflow significantly.'],
      ['Drain line maintenance', 'Pour 1 cup bleach into condensate drain monthly during cooling season to prevent algae clogs.'],
      ['Fall (October)', 'Furnace tune-up before DFW heating season: heat exchanger inspection, combustion analysis, ignitor check.'],
      ['Annual CO detector test', 'Replace batteries, test all CO alarms. DFW winter fires up furnaces dormant for 6+ months.'],
    ]
  },
  'Selling my DFW home': {
    headline: '🏡 DFW HVAC for Home Sale',
    items: [
      ['Age matters to buyers', 'Systems over 12 years get flagged by inspectors. Over 15 years = negotiating leverage for buyers.'],
      ['Get inspection before listing', 'A pre-listing HVAC inspection ($100-175) lets you fix issues before buyers use them against you.'],
      ['Document maintenance history', 'Show receipts for tune-ups, filter changes, and repairs. It signals a cared-for home.'],
      ['Consider a tune-up', 'A $150 spring tune-up cleans coils and ensures the system runs well during showing season.'],
      ['Disclose what you know', 'Known issues must be disclosed in Texas. Better to fix than face post-sale disputes.'],
      ['New system = selling point', 'A system under 3 years old is a marketing asset. Feature it in the listing with SEER2 rating.'],
    ]
  },
  'Buying a DFW home': {
    headline: '🔍 Evaluating HVAC When Buying a DFW Home',
    items: [
      ['Ask for the age and service history', 'A seller should have service records. No records = inspect more carefully.'],
      ['Have inspector run it on hottest day possible', 'Ask inspection to be done midday. Can it maintain setpoint? That\’s the real test.'],
      ['Check the outdoor unit condition', 'Dented fins, rust, or debris around unit = deferred maintenance. Factor in $500-2,000 cleanup.'],
      ['Budget for age', 'System 10+ years old: budget $500-1,000/year for repairs. Over 15: budget for full replacement.'],
      ['Ask about refrigerant type', 'R-22 system = replacement is imminent and expensive ($4,500-9,000). Factor into offer.'],
      ['Negotiate a home warranty', 'A 1-year HVAC warranty ($400-600) gives peace of mind for the first year after purchase.'],
    ]
  },
};

export default function DFWHVACFinalCompleteGuide() {
  const [stage, setStage] = useState('');
  const content = stage ? stageContent[stage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>The Complete DFW HVAC Reference Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Whether you just moved to DFW, your system is struggling, or you're replacing a unit — this guide covers every stage of the DFW HVAC journey.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌡️ Why DFW HVAC Is Different</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['7 months of cooling', '~5,500+ cooling hours/year vs 2,500 national average — your equipment works twice as hard'],['Extreme temperature swings', '20°F in January, 107°F in July — systems must handle both extremes reliably'],['High humidity summers', '70%+ outdoor RH June-September — dehumidification is as important as cooling'],['Severe weather events', 'Ice storms, tornado-force winds, flash floods — all stress HVAC infrastructure']].map(([title, desc]) => (
              <div key={title} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Where Are You in Your DFW HVAC Journey?</h2>
          <select value={stage} onChange={e => setStage(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 16px', fontSize: 15, marginBottom: 20 }}>
            <option value="">Select your stage...</option>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {content && (
            <div>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>{content.headline}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {content.items.map(([title, desc]) => (
                  <div key={title} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'flex', gap: 12 }}>
                    <div style={{ color: '#F5E642', fontWeight: 600, minWidth: 180, fontSize: 14 }}>{title}</div>
                    <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📚 More DFW HVAC Guides</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Compressor Types', 'Refrigerant Types', 'Fan Motors (PSC vs ECM)', 'Heat Exchangers', 'HRV vs ERV'].map(g => (
              <div key={g} style={{ background: '#0A1628', borderRadius: 6, padding: '6px 12px', fontSize: 13, color: '#94a3b8′ }}>🔗 {g}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Get Matched with a Vetted DFW HVAC Pro</div>
          <div style={{ color: '#1a2f4a', fontSize: 14 }}>ProLnk connects DFW homeowners with certified HVAC contractors — no spam, no cold calls, just quotes from pros who know DFW</div>
        </div>
      </div>
    </div>
  );
}
