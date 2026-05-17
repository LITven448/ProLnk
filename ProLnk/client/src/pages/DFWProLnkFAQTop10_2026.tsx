import { useState } from 'react';

const faqs = [
  {
    q: "🏠 Is ProLnk free for homeowners in DFW?",
    a: "Yes. ProLnk is completely free for DFW homeowners. You submit your project details, get matched with licensed vetted local pros, receive quotes, and choose who to hire. ProLnk earns a small match fee paid by the service professional, not the homeowner. There are no subscription fees, no hidden charges, and no obligation to hire any pro you are matched with. The goal is to make finding quality DFW contractors as easy as ordering from your phone."
  },
  {
    q: "⚡ How fast do I get matched with a DFW pro?",
    a: "Most DFW homeowners receive their first match within 2 hours during business hours (7am-8pm). Urgent requests such as active leaks or HVAC failures in summer are flagged as priority and typically matched within 30-60 minutes. After-hours submissions are matched the next morning. Match speed depends on trade availability. HVAC matches in DFW during July may take slightly longer during peak season when every tech is booked. ProLnk notifies you by text and email the moment a pro accepts your request."
  },
  {
    q: "✅ Are all DFW pros on ProLnk licensed and insured?",
    a: "Every pro on ProLnk must pass a verification process before receiving any match: valid Texas state license for their trade (HVAC, plumbing, electrical, roofing, etc.), active general liability insurance minimum $1M per occurrence, background check clearance, and identity verification. Pros are also reviewed for complaint history with the Texas Department of Licensing and Regulation. ProLnk re-verifies credentials annually."
  },
  {
    q: "🥇 What is the Charter Pro tier on ProLnk?",
    a: "The Charter tier is ProLnk's founding membership level for the first 25 pros in the DFW network. Charter Pros lock in the lowest monthly subscription rate ($149/mo, price-guaranteed for life), receive the highest lead priority in the match algorithm, and earn network income from a 4-level referral system. Charter status is limited and closes when the tier fills. Charter Pros also gain permanent origination rights on the first 50 homeowners they refer to the Home Health Vault."
  },
  {
    q: "🏡 What is the Home Health Vault?",
    a: "The Home Health Vault is ProLnk's permanent digital record system for DFW homes. It stores service history, inspection reports, appliance warranties, permits, HVAC service records, foundation repair documents, and structural notes for a specific property address. The Vault transfers to the next owner when a home is sold, making it a long-term asset for the property. For homeowners it simplifies maintenance tracking, strengthens insurance claims, and gives buyers confidence."
  },
  {
    q: "🗺️ Does ProLnk work in all of DFW?",
    a: "ProLnk serves the full Dallas-Fort Worth Metroplex including Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Garland, Irving, Arlington, Grand Prairie, Southlake, Colleyville, Keller, Flower Mound, Lewisville, Denton, Rockwall, Mesquite, Carrollton, and surrounding areas. Coverage expands continuously as new pros join the network. If your city is not yet served, ProLnk adds you to a waitlist and notifies you when a verified pro in your area joins."
  },
  {
    q: "📊 How does ProLnk match me with the right pro?",
    a: "ProLnk's match algorithm considers the specific trade and service required, your zip code and surrounding service areas, pro availability and current workload, past homeowner ratings for similar jobs, and your project timeline. The system does not rotate pros randomly. It selects based on fit quality. You receive a match profile showing the pro's license number, years in DFW, ratings, and a brief bio so you can make an informed decision before they arrive."
  },
  {
    q: "⭐ How are DFW pros rated on ProLnk?",
    a: "After every completed job, DFW homeowners rate their pro on 5 dimensions: quality of work, communication, timeliness, cleanliness, and value. Ratings aggregate into a composite score visible on each pro's profile. Pros who fall below a 4.0 average receive a performance warning. Below 3.5 triggers a review and potential suspension. Pros cannot pay to remove reviews. Homeowners can also flag serious issues such as a no-show, unlicensed work, or safety concern for immediate ProLnk review."
  },
  {
    q: "🔁 Can I request the same DFW pro again?",
    a: "Yes. Once you have had a positive experience with a ProLnk pro, you can mark them as a favorite in your account. Future requests in their trade will prioritize your favorite pro first. If they are unavailable, the system finds the next best match. ProLnk also notifies your favorite pros when you submit a new request, giving them first right of acceptance. Building a trusted relationship with a DFW plumber, HVAC tech, or electrician through ProLnk is encouraged."
  },
  {
    q: "📞 What if I have a problem with a ProLnk job?",
    a: "Contact ProLnk support within 30 days of the completed job. ProLnk will first attempt to resolve the issue directly with the pro. Most problems are communication issues resolved with a callback or minor touch-up visit. For unresolved disputes, ProLnk has a formal mediation process. For serious issues such as shoddy work, property damage, or a no-show, ProLnk works with the pro's insurance carrier and may issue compensation credits. Every licensed pro on ProLnk carries liability insurance."
  }
];

export default function DFWProLnkFAQTop10_2026() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔗</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Top 10 ProLnk FAQs 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Most common ProLnk questions answered for DFW homeowners and pros</p>
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
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Ready to get started with ProLnk?</p>
          <p style={{ color: '#8899AA', fontSize: 13 }}>Join DFW homeowners getting matched with vetted pros. It is free and takes under 2 minutes.</p>
        </div>
      </div>
    </div>
  );
}