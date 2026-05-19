import { useState } from 'react';

const faqs = [
  {
    q: "📁 What records does the Home Health Vault store?",
    a: "The Home Health Vault stores a comprehensive digital history for your DFW home: HVAC service records (dates, work performed, refrigerant levels), foundation inspection and repair reports, roofing permits and installation dates, plumbing service history and leak repairs, electrical panel upgrades and permits, appliance warranties and model numbers, HOA approval documents, insurance claim history, and general contractor invoices. Every document is tagged to your property address and organized by trade category for easy retrieval."
  },
  {
    q: "👀 Who can see my Home Health Vault data?",
    a: "You control access entirely. By default, only you can view your Vault. You can grant read-only access to specific parties: your insurance agent, a contractor performing work, or a potential buyer during a home sale. ProLnk staff cannot view your individual Vault records without your explicit consent. Only aggregated anonymized data is used for platform analytics. You can revoke any granted access at any time from your account dashboard. All data is encrypted at rest and in transit."
  },
  {
    q: "🏡 Does the Vault transfer when I sell my DFW home?",
    a: "Yes. The Home Health Vault is tied to the property address, not the owner. When you sell, you can transfer Vault access to the buyer as part of closing. Buyers increasingly request Vault access as a selling point because it demonstrates maintained systems, reduces inspection surprises, and builds confidence. The transferring seller chooses what to share: full history or selected categories. In DFW's competitive market, a complete Vault history reduces negotiation friction and speeds closing timelines."
  },
  {
    q: "🔒 How is my Home Health Vault data protected?",
    a: "Vault data is stored with AES-256 encryption at rest on enterprise-grade cloud infrastructure with SOC 2 compliance. All transfers use TLS 1.3. Access is controlled by two-factor authentication. ProLnk does not sell, rent, or share individual homeowner data with third parties for marketing. Data is backed up daily to geographically separate locations. In the event of a breach, ProLnk is required by Texas law to notify you within 60 days and provide identity protection services."
  },
  {
    q: "What happens to my Vault data if I cancel ProLnk?",
    a: "Your Home Health Vault data belongs to you. If you cancel your ProLnk account, you have 90 days to export your complete Vault in PDF or JSON format. After 90 days, data is archived for an additional 12 months before permanent deletion per ProLnk's data retention policy. If you rejoin ProLnk within 12 months of cancellation, your full Vault history is restored automatically. ProLnk does not delete data immediately upon cancellation."
  },
  {
    q: "🛡️ Does the Vault help with DFW insurance claims?",
    a: "Significantly. DFW homeowners with documented Vault records resolve insurance claims faster and more favorably. A timestamped HVAC service record proves regular maintenance when an insurer questions a compressor claim. Foundation repair reports with engineer sign-off support a coverage dispute. Roofing permits and installation photos document pre-existing conditions versus hail damage. Insurance adjusters respond better to organized documentation than verbal claims. Several DFW insurers recognize Vault documentation during the claims process."
  },
  {
    q: "🏗️ How do contractors add records to my Vault?",
    a: "ProLnk-verified contractors can submit service records directly to your Vault after completing a job, with your permission. They upload photos, invoices, permit numbers, and work summaries through the ProLnk contractor portal. You receive a notification and must approve before the record is added. You can also add records manually by uploading documents, photos, or notes from any device. Records from non-ProLnk contractors can be uploaded manually. The Vault is not limited to ProLnk-sourced work."
  },
  {
    q: "💰 Is there a cost for the Home Health Vault?",
    a: "The Home Health Vault is included with your ProLnk homeowner account at no additional charge. There is no storage limit for standard residential use. ProLnk pros who refer homeowners to the Vault earn origination rights, which is a small recurring revenue share that funds the Vault without charging homeowners. This creates an incentive for pros to encourage homeowners to maintain complete records, which benefits everyone: better-maintained homes, fewer surprises, and faster job completions."
  },
  {
    q: "📱 Can I access my Vault from my phone?",
    a: "Yes. The Home Health Vault is fully mobile-accessible through the ProLnk web app and native iOS and Android apps launching in 2026. You can view records, upload photos and documents, share access, and grant temporary contractor access directly from your phone. A contractor arrives and needs to see the previous HVAC service record? You grant 24-hour read access from your phone in seconds. You can also look up your water heater model number while standing at the hardware store."
  },
  {
    q: "🔮 What is the long-term vision for the Home Health Vault?",
    a: "ProLnk's long-term vision is for the Home Health Vault to become the standard digital identity layer for every home in DFW and eventually nationwide. Integrations in development include automated permit pulling from city databases, NOAA weather event logging tied to your address, integration with home inspection software, and AI-powered maintenance reminders based on your home's age and service history. The Vault becomes more valuable as it accumulates data. A 10-year-old Vault is exponentially more useful than a new one."
  }
];

export default function DFWHomeHealthVaultFAQ2026() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏦</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Home Health Vault FAQs 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Top 10 questions about ProLnk's permanent home record system</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#0F2040′ : '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 10, padding: '16px 20px', cursor: ’pointer', transition: 'all 0.2s' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{faq.q}</div>
              {selected === i && (
                <div style={{ color: '#C8D8E8', fontSize: 14, lineHeight: 1.7, marginTop: 12, paddingTop: 12, borderTop: '1px solid #1E3A5F' }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36, padding: 20, backgroundColor: '#0D1E35', borderRadius: 10, border: '1px solid #F5E642′ }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Start your DFW Home Health Vault today</p>
          <p style={{ color: '#8899AA', fontSize: 13 }}>Free with every ProLnk homeowner account. Your home's permanent digital record starts now.</p>
        </div>
      </div>
    </div>
  );
}