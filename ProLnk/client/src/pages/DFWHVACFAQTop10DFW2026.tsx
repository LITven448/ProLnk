import { useState } from 'react';

const faqs = [
  {
    q: "❄️ Why does my DFW AC run all day in summer?",
    a: "In DFW summers, outdoor temps regularly hit 105 degrees or higher. Your AC may run continuously because your system is undersized, you have poor attic insulation, air is leaking through old ductwork, or refrigerant is low. A properly sized DFW system should cycle off for at least 15-20 minutes per hour even on peak days. Get a Manual J load calculation to determine the right system size for your home."
  },
  {
    q: "🔄 When should I replace my DFW AC?",
    a: "Replace your AC if it is 12-15 or more years old, needs a repair costing more than 50% of replacement value, or uses R-22 refrigerant which was discontinued in 2020 and is now very expensive. In DFW, heat stress on systems accelerates wear. A new 16-18 SEER2 system will cut cooling costs 30-40% versus a 10-year-old system. Most DFW HVAC pros recommend budgeting for replacement at year 12."
  },
  {
    q: "🌿 What MERV filter for DFW cedar season?",
    a: "During cedar fever season (December through February in DFW), use a MERV 11-13 filter to capture pollen and allergens. Avoid MERV 14 and above in standard residential systems as they restrict airflow and can cause your AC to freeze or your blower to fail. Change filters monthly during cedar season. If allergies are severe, pair a MERV 11 filter with a UV air purifier in the air handler."
  },
  {
    q: "💸 Why is my DFW AC bill so high?",
    a: "Average DFW summer electric bills run $250-$450 per month for a 2,000 sq ft home. High bills usually mean a thermostat set below 72 degrees, dirty condenser coils clogged with cottonwood or debris, low refrigerant causing the system to work harder, or an aging system with a low SEER rating. Start by cleaning the condenser coil with a hose and setting the thermostat to 76-78 degrees. If bills stay high, schedule a tune-up."
  },
  {
    q: "🚫 Can I run my AC without a filter?",
    a: "Never run your DFW AC without a filter, even temporarily. DFW air carries high dust, pollen, and allergen loads year-round. Without a filter, your evaporator coil will collect debris within days, reducing airflow and causing the coil to freeze. Repair costs for a frozen or fouled coil run $300-$800. If your filter is missing, buy any 1-inch filter at a hardware store and install it before running the system."
  },
  {
    q: "🌡️ What temperature should I set my DFW thermostat in summer?",
    a: "The sweet spot for DFW homes is 75-78 degrees during the day. Setting below 72 degrees on a 105-degree day often means your AC cannot keep up and runs continuously. Energy Star recommends 78 degrees when home and 85 degrees when away. Use a smart thermostat to pre-cool before you return rather than leaving it cold all day. Every degree above 72 saves roughly 3% on your monthly bill."
  },
  {
    q: "🏗️ What is the best AC brand for DFW heat?",
    a: "Top performers in DFW extreme heat include Trane, Lennox, and Carrier, all of which manufacture systems rated for continuous operation in very high temperatures. Key specs to look for: two-stage or variable-speed compressor for better humidity control in DFW muggy shoulder seasons, 18 or higher SEER2 rating, and a 10-year parts warranty. Avoid single-stage systems for DFW as they blast on at 100% capacity and short-cycle, wearing out faster in the heat."
  },
  {
    q: "💧 Why is my AC leaking water inside my DFW home?",
    a: "A leaking indoor air handler in DFW is almost always a clogged condensate drain line. In humid DFW summers, your AC removes 15-25 gallons of moisture per day from the air. That water drains through a PVC line that can grow algae and clog. Pour 1 cup of distilled white vinegar down the drain pan monthly to prevent clogs. If the pan is already overflowing, use a wet-vac on the drain outlet. Recurring clogs mean you need a secondary drain line installed."
  },
  {
    q: "📅 How often should I service my DFW AC?",
    a: "DFW homes need HVAC service twice a year: a cooling tune-up in March or April before the heat arrives, and a heating tune-up in October or November before the first cold front. Spring service should include coil cleaning, refrigerant check, and electrical inspection. Given DFW's 7-8 month cooling season, skipping annual maintenance is the number one cause of mid-summer breakdowns when every tech in the Metroplex is booked two or more weeks out."
  },
  {
    q: "🔍 How do I find a reliable HVAC tech in DFW?",
    a: "In DFW, always verify HVAC contractors hold a current Texas HVAC license, which you can search at license.state.tx.us. Ask if they pull permits for new installations, which is required by Texas law and skipped by fly-by-night contractors. Get 3 quotes for any system over $5,000. Avoid contractors who quote over the phone without a home assessment. System sizing requires a Manual J load calculation. ProLnk matches DFW homeowners with pre-vetted, licensed HVAC pros typically within 2 hours."
  }
];

export default function DFWHVACFAQTop10DFW2026() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Top 10 HVAC FAQs 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Most common DFW HVAC questions answered for the Metroplex climate</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#0F2040' : '#0D1E35', border: `1px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{faq.q}</div>
              {selected === i && (
                <div style={{ color: '#C8D8E8', fontSize: 14, lineHeight: 1.7, marginTop: 12, paddingTop: 12, borderTop: '1px solid #1E3A5F' }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36, padding: 20, backgroundColor: '#0D1E35', borderRadius: 10, border: '1px solid #F5E642' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Need a DFW HVAC pro right now?</p>
          <p style={{ color: '#8899AA', fontSize: 13 }}>ProLnk matches you with licensed DFW HVAC contractors in under 2 hours.</p>
        </div>
      </div>
    </div>
  );
}