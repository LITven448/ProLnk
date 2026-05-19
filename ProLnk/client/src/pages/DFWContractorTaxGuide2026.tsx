import { useState } from 'react';

export default function DFWContractorTaxGuide2026() {
  const [annualRevenue, setAnnualRevenue] = useState<string>("");

  const revenueBrackets = [
    { id: "under30k", label: "Under $30K/yr", selfEmploymentTax: "~$4,239″, incomeTax: "$0–$1,500", quarterlyPayment: "$1,000–1,500", topDeductions: ["Standard deduction ($14,600 single)", "Home office (if dedicated space)", "Vehicle mileage at $0.67/mile", "Tools and supplies"], mileageValue: "Deduct all work trips — avg DFW contractor drives 12,000 work miles/yr = $8,040 deduction" },
    { id: "30to60k", label: "$30K–$60K/yr", selfEmploymentTax: "~$6,358–$8,478″, incomeTax: "$2,000–$5,000", quarterlyPayment: "$2,000–3,500", topDeductions: ["Home office ($5/sq ft up to 300 sq ft = $1,500)", "Vehicle mileage at $0.67/mile", "Tools and equipment (Section 179 full deduction)", "Health insurance premiums (100% deductible)", "Retirement contributions (SEP-IRA up to 25% of net)"], mileageValue: "At 15,000 work miles/yr = $10,050 mileage deduction" },
    { id: "60to100k", label: "$60K–$100K/yr", selfEmploymentTax: "~$8,478–$14,130″, incomeTax: "$5,000–$12,000", quarterlyPayment: "$3,500–6,500", topDeductions: ["Section 179 on all equipment (up to $1.16M in 2026)", "Vehicle mileage or actual expense method — compare both", "SEP-IRA contributions (up to $69,000 in 2026)", "Qualified Business Income (QBI) deduction — 20% of net income", "Subcontractor 1099 payments (fully deductible)"], mileageValue: "At 20,000 work miles/yr = $13,400 mileage deduction — or use actual expenses if truck costs more" },
    { id: "over100k", label: "$100K+/yr", selfEmploymentTax: "$14,130+ (capped on income portion)", incomeTax: "$15,000–$35,000+", quarterlyPayment: "$7,500–15,000″, topDeductions: ["S-Corp election can save $5K–$20K+ in SE tax annually", "QBI deduction worth $20,000+ at this income level", "Maximize SEP-IRA or Solo 401K ($69,000 limit in 2026)", "Hire spouse for retirement contribution doubling", "Depreciate vehicles under Section 179 or bonus depreciation"], mileageValue: "Consider S-Corp election with payroll — saves SE tax on profit above reasonable salary" },
  ];

  const selected = revenueBrackets.find(r => r.id === annualRevenue);

  const quarterlyDates = [
    { quarter: "Q1 2026″, due: "April 15, 2026", income: "Jan 1 – Mar 31" },
    { quarter: "Q2 2026″, due: "June 16, 2026", income: "Apr 1 – May 31" },
    { quarter: "Q3 2026″, due: "September 15, 2026", income: "Jun 1 – Aug 31" },
    { quarter: "Q4 2026″, due: "January 15, 2027", income: "Sep 1 – Dec 31" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628″, color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📊</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#F5E642″, marginBottom: "0.5rem" }}>DFW Contractor Tax Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>Quarterly taxes, mileage deductions, Section 179, and 1099 filing for DFW contractors</p>
        </div>

        <div style={{ backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1.25rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h3 style={{ color: "#F5E642″, marginBottom: "0.75rem", fontSize: "1rem" }}>📅 2026 Quarterly Estimated Tax Due Dates</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
            {quarterlyDates.map(d => (
              <div key={d.quarter} style={{ backgroundColor: "#162035″, borderRadius: "8px", padding: "0.75rem" }}>
                <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: "0.9rem" }}>{d.quarter} — Due {d.due}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.8rem" }}>Income earned: {d.income}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>💵 Select Your Annual Revenue</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
            {revenueBrackets.map(r => (
              <button key={r.id} onClick={() => setAnnualRevenue(r.id)} style={{ backgroundColor: annualRevenue === r.id ? "#F5E642″ : "#162035", color: annualRevenue === r.id ? "#0A1628" : "#fff", border: "2px solid", borderColor: annualRevenue === r.id ? "#F5E642" : "#1e3a5f", borderRadius: "8px", padding: "0.75rem", fontWeight: 600, cursor: "pointer", textAlign: "left", fontSize: "0.9rem" }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              {[{ label: "SE Tax Estimate", value: selected.selfEmploymentTax, note: "15.3% on net profit" }, { label: "Income Tax Estimate", value: selected.incomeTax, note: "Federal only, TX has no state income tax" }, { label: "Pay Each Quarter", value: selected.quarterlyPayment, note: "Set aside from each payment" }].map(m => (
                <div key={m.label} style={{ backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″ }}>{m.value}</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#fff", marginTop: "0.25rem" }}>{m.label}</div>
                  <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "0.2rem" }}>{m.note}</div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1.5rem", border: "2px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642″, marginBottom: "1rem", fontSize: "1.1rem" }}>🚗 Mileage Note</h3>
              <p style={{ color: "#cbd5e1″, fontSize: "0.9rem", marginBottom: "1.25rem", lineHeight: 1.6 }}>{selected.mileageValue}</p>
              <h3 style={{ color: "#F5E642″, marginBottom: "0.75rem", fontSize: "1.1rem" }}>✂️ Top Deductions at Your Income Level</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {selected.topDeductions.map((d, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", color: "#cbd5e1″, fontSize: "0.9rem" }}>
                    <span style={{ color: "#F5E642″ }}>→</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div style={{ marginTop: "2rem", backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1.25rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
          <p style={{ color: "#94a3b8″, marginBottom: "0.5rem", fontSize: "0.9rem" }}>More income means more deductions — maximize your lead flow</p>
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: "1rem" }}>📊 Join ProLnk — More jobs, more mileage deductions, more DFW income</p>
        </div>
      </div>
    </div>
  );
}
