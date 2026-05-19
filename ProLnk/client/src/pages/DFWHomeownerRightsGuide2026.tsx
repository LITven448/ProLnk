import { useState } from 'react';

const disputes = [
  {
    type: "Contractor Dispute",
    icon: "🔨",
    rights: [
      "Right to Cure (Texas Property Code Ch. 27): Contractor must receive 30 days written notice before you can file suit — failure to give notice can get your case dismissed.",
      "Mechanic's Lien Warning: Contractors must give you a 10-day notice before filing a lien. If they skip this step, the lien may be unenforceable.",
      "TDLR Complaint: For licensed trades (HVAC, electrical), file a complaint at tdlr.texas.gov — TDLR can revoke licenses and impose fines.",
      "BBB Complaint: For unlicensed trades like roofing, file at bbb.org — creates a public record and may trigger mediation.",
      "Small Claims Court: Claims under $20,000 can go to Justice of the Peace court without an attorney.",
    ],
    action: "Send written 30-day cure notice via certified mail. Document all defects with photos and dates. If unresolved, file TDLR complaint (licensed) or pursue small claims.",
  },
  {
    type: "HOA Dispute",
    icon: "🏘️",
    rights: [
      "Texas Property Code Chapter 209 governs HOA-homeowner relations for planned communities.",
      "Right to Request Hearing: Before any fine over $200, the HOA must give you an opportunity to present your case.",
      "Right to Inspect Records: HOAs must give you access to meeting minutes, financials, and governing documents within 10 days.",
      "Dispute Resolution: Most HOAs must have an internal dispute process before escalating. Check your CC&Rs.",
      "TDLR HOA Registration: HOAs with 14+ units must register with TDLR and follow complaint procedures.",
    ],
    action: "Request a formal hearing in writing. Review CC&Rs for violation specifics. File with TDLR if HOA is unresponsive. Consider a property rights attorney for large fines.",
  },
  {
    type: "Lien Dispute",
    icon: "📜",
    rights: [
      "Unperfected Lien: A lien is invalid if the contractor did not send required pre-lien notices — Constitutional Lien has fewer requirements than Statutory Lien.",
      "10-Day Pre-Lien Notice: Subcontractors must give 10-day notice to owner before filing. General contractors have different rules.",
      "Lien Release: Once paid, demand a signed lien release within 10 days — required by Texas law.",
      "Bond Over Lien: You can file a bond to remove the lien from your property title while the dispute continues.",
      "Lien Filing Deadline: Liens must be filed within 15 days of the month following the last work performed — late liens are unenforceable.",
    ],
    action: "Consult a Texas construction attorney immediately. Check filing dates and notice records. If lien is defective, file a challenge with the county. Get a release in exchange for final payment.",
  },
  {
    type: "Insurance Claim Dispute",
    icon: "🛡️",
    rights: [
      "Texas Prompt Payment Act: Insurer must acknowledge your claim within 15 days and accept or reject within 15 business days of receiving all information.",
      "Right to an Appraisal: Most Texas homeowner policies include an appraisal clause — request independent appraisers to resolve disputes.",
      "Texas Department of Insurance (TDI): File a complaint at tdi.texas.gov for bad faith claims handling.",
      "Hailstorm Fraud Warning: Do not let roofers file claims on your behalf — this can constitute insurance fraud in Texas.",
      "Public Adjuster: You can hire a licensed public adjuster (check TDI) to negotiate on your behalf.",
    ],
    action: "Request your insurer's written explanation for any denial or underpayment. File an appraisal demand if available. Contact TDI at tdi.texas.gov for unresolved bad faith issues.",
  },
];

export default function DFWHomeownerRightsGuide2026() {
  const [selected, setSelected] = useState(0);
  const info = disputes[selected];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>⚖️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", marginBottom: ".5rem" }}>DFW Homeowner Rights Guide 2026</h1>
          <p style={{ color: "#94a3b8″ }}>Texas homeowner rights — lien law, HOA disputes, contractor issues, and insurance claims</p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {disputes.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{ padding: ".6rem 1.1rem", borderRadius: 8, border: "none", cursor: "pointer", background: selected === i ? "#F5E642″ : "#0f2040", color: selected === i ? "#0A1628" : "#94a3b8", fontWeight: 600 }}
            >
              {d.icon} {d.type}
            </button>
          ))}
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", borderLeft: "4px solid #F5E642", marginBottom: "1.5rem" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "1.1rem", marginBottom: "1rem" }}>{info.icon} Your Rights: {info.type}</div>
          {info.rights.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", marginTop: ".75rem", color: "#94a3b8″, lineHeight: 1.5 }}>
              <span style={{ color: "#F5E642″, minWidth: "1.25rem" }}>•</span>
              <span>{r}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f38″, border: "1px solid #F5E642", borderRadius: 12, padding: "1.25rem" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: ".5rem" }}>✅ Recommended Action</div>
          <div style={{ color: "#94a3b8″, lineHeight: 1.6 }}>{info.action}</div>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.25rem", marginTop: "1.5rem" }}>
          <h3 style={{ color: "#F5E642″, marginBottom: ".75rem" }}>📞 Texas Homeowner Resources</h3>
          {[
            { label: "TDLR — HVAC, electrical, mold, HOA complaints", url: "tdlr.texas.gov" },
            { label: "TSBPE — plumbing license board", url: "tsbpe.texas.gov" },
            { label: "Texas Dept of Insurance", url: "tdi.texas.gov" },
            { label: "Texas Attorney General Consumer Protection", url: "texasattorneygeneral.gov" },
          ].map(r => (
            <div key={r.label} style={{ display: "flex", gap: ".75rem", marginTop: ".6rem", color: "#94a3b8″ }}>
              <span style={{ color: "#F5E642″ }}>→</span>
              <span>{r.label}: <span style={{ color: "#60a5fa" }}>{r.url}</span></span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#64748b", fontSize: ".85rem" }}>
          ProLnk only works with verified, licensed contractors to protect DFW homeowners from day one. Data current as of 2026.
        </div>
      </div>
    </div>
  );
}
