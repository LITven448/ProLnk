import { useState } from 'react';

const RENOVATION_TAX = [
  {
    type: "Home Office Build-Out",
    use: "Business",
    icon: "💼",
    treatment: "Deductible (Form 8829)",
    detail: "If you use part of your home exclusively and regularly for business, you can deduct a proportional share of renovation costs. The space must be your principal place of business.",
    docs: ["Square footage of office vs total home", "Receipts for all renovation work", "Photos of dedicated workspace", "Business use log if mixed-use risk"],
    benefit: "Immediate deduction equal to office % of renovation cost",
    dfwNote: "DFW remote workers and self-employed homeowners frequently miss this. A dedicated room remodel of $15,000 with 12% office ratio = $1,800 deduction.",
    creditCode: "Form 8829",
  },
  {
    type: "Energy Efficiency Upgrade",
    use: "Personal",
    icon: "⚡",
    treatment: "Energy Efficient Home Improvement Credit (25C) — 30%, max $3,200/year",
    detail: "Covers heat pumps, insulation, windows, doors, water heaters, and HVAC. Must meet energy efficiency standards. Credit is nonrefundable but can reduce tax liability to zero.",
    docs: ["Manufacturer certification statement", "Contractor invoice with equipment model", "ENERGY STAR certification", "Receipt showing install date"],
    benefit: "30% tax credit up to $3,200 per year ($2,000 for heat pumps, $1,200 for insulation/windows/doors)",
    dfwNote: "DFW homeowners replacing aging HVAC with heat pumps are leaving money on the table — $2,000 credit available right now under IRA.",
    creditCode: "Form 5695, Part II",
  },
  {
    type: "Solar Panels",
    use: "Personal",
    icon: "☀️",
    treatment: "Residential Clean Energy Credit (26D) — 30%, no dollar cap through 2032",
    detail: "Must own the system (not lease). Covers panels, battery storage, and installation labor. Credit applies to entire system cost. Unused credit carries forward.",
    docs: ["Installation contract", "Final invoice with equipment specs", "Utility interconnection agreement", "Proof of ownership (not lease agreement)"],
    benefit: "30% of total system cost — a $25,000 system generates a $7,500 credit",
    dfwNote: "Oncor territory has favorable net metering. DFW solar installs are strong ROI — document everything for the credit and cost basis.",
    creditCode: "Form 5695, Part I",
  },
  {
    type: "Medical Modification",
    use: "Medical/Accessibility",
    icon: "♿",
    treatment: "Medical expense deduction — costs exceeding 7.5% of AGI are deductible",
    detail: "Ramps, grab bars, widened doorways, elevator/lift installation, accessible bathroom — if done for medical necessity, costs can be deducted as medical expenses.",
    docs: ["Doctor's letter of medical necessity", "Contractor invoice", "Before/after photos", "Evidence modification does not increase home value"],
    benefit: "Costs exceeding 7.5% of your AGI are deductible — valuable for high-cost modifications",
    dfwNote: "An accessible bathroom remodel of $18,000, with $150,000 AGI and 7.5% floor ($11,250), gives a $6,750 deduction.",
    creditCode: "Schedule A",
  },
  {
    type: "Capital Improvement (General)",
    use: "Personal",
    icon: "🏠",
    treatment: "Adds to cost basis — reduces capital gains tax at sale",
    detail: "Most home improvements (not repairs) are capital improvements that increase your cost basis. When you sell, gains are calculated from adjusted basis. Married couples exclude $500,000 of gain; singles exclude $250,000.",
    docs: ["All contractor invoices", "Material receipts", "Permit numbers", "Before/after photos", "Lien waivers"],
    benefit: "Every $1 of documented capital improvement reduces your taxable gain by $1 at sale",
    dfwNote: "DFW appreciation has been strong — a home bought in 2018 for $350K may sell for $600K+. With $100K in documented improvements, your taxable gain drops by $100K.",
    creditCode: "Schedule D / Form 8949",
  },
  {
    type: "Rental Property Renovation",
    use: "Rental/Investment",
    icon: "🏢",
    treatment: "Depreciable improvement OR immediate deduction under bonus depreciation rules",
    detail: "Improvements to rental properties must be capitalized and depreciated over 27.5 years (residential). However, bonus depreciation and Section 179 may allow immediate deduction of certain components.",
    docs: ["Rental income and expense records", "Contractor invoices by property", "Cost segregation study (for large renovations)", "Property depreciation schedule"],
    benefit: "Depreciation reduces rental income each year; immediate deductions possible with cost segregation",
    dfwNote: "DFW investors with rental properties often skip cost segregation — for renovations over $75K, it can accelerate $15–$40K in deductions into year one.",
    creditCode: "Schedule E + Form 4562",
  },
];

export default function DFWHomeRenovationTaxGuide() {
  const [selected, setSelected] = useState<string>("");
  const detail = RENOVATION_TAX.find((r) => r.type === selected);

  return (
    <div style={{ background: "#F5F7FA", minHeight: "100vh", color: "#1A2B4A", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{ background: "#0A1628", color: "#F5E642", padding: "0.25rem 0.75rem", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginTop: "1rem", marginBottom: "0.5rem", color: "#0A1628" }}>💰 Home Renovation Tax Guide</h1>
          <p style={{ color: "#4A5D7A", fontSize: 16 }}>Most DFW homeowners dramatically underclaim renovation tax benefits. Here is exactly what qualifies, what documents you need, and how much you can save.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: "1.25rem", color: "#E8EDF5", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: "0.5rem" }}>📉</div>
            <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 15 }}>Capital Gains Reduction</div>
            <div style={{ color: "#9BAAC5", fontSize: 13, marginTop: "0.25rem" }}>Every improvement dollar reduces taxable gain</div>
          </div>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: "1.25rem", color: "#E8EDF5", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: "0.5rem" }}>⚡</div>
            <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 15 }}>Energy Credits (30%)</div>
            <div style={{ color: "#9BAAC5", fontSize: 13, marginTop: "0.25rem" }}>IRA credits up to $3,200/year still active</div>
          </div>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: "1.25rem", color: "#E8EDF5", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: "0.5rem" }}>🏢</div>
            <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 15 }}>Home Office Deduction</div>
            <div style={{ color: "#9BAAC5", fontSize: 13, marginTop: "0.25rem" }}>Often overlooked by DFW remote workers</div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: 10, padding: "1.5rem", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0" }}>
          <h2 style={{ fontSize: 18, color: "#0A1628", marginBottom: "1rem" }}>🔍 Look Up Your Renovation Type</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem", marginBottom: "1.25rem" }}>
            {RENOVATION_TAX.map((r) => (
              <button key={r.type} onClick={() => setSelected(r.type)} style={{ background: selected === r.type ? "#0A1628" : "#F5F7FA", color: selected === r.type ? "#F5E642" : "#1A2B4A", border: `2px solid ${selected === r.type ? "#0A1628" : "#CBD5E0"}`, borderRadius: 8, padding: "0.75rem", fontSize: 13, cursor: "pointer", textAlign: "left", fontWeight: selected === r.type ? 700 : 400 }}>
                <div style={{ fontSize: 20, marginBottom: "0.25rem" }}>{r.icon}</div>
                <div>{r.type}</div>
                <div style={{ fontSize: 11, marginTop: "0.2rem", color: selected === r.type ? "#F5E642" : "#718096" }}>{r.use}</div>
              </button>
            ))}
          </div>

          {detail ? (
            <div style={{ background: "#0A1628", borderRadius: 10, padding: "1.5rem", color: "#E8EDF5" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <h3 style={{ color: "#F5E642", fontSize: 20 }}>{detail.icon} {detail.type}</h3>
                <span style={{ background: "#F5E642", color: "#0A1628", padding: "0.25rem 0.75rem", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>{detail.creditCode}</span>
              </div>
              <div style={{ background: "#111E35", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
                <div style={{ color: "#9BAAC5", fontSize: 12, marginBottom: "0.25rem" }}>TAX TREATMENT</div>
                <div style={{ color: "#2ECC71", fontSize: 15, fontWeight: 600 }}>{detail.treatment}</div>
              </div>
              <p style={{ color: "#CBD5E8", fontSize: 14, lineHeight: 1.7, marginBottom: "1rem" }}>{detail.detail}</p>
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ color: "#9BAAC5", fontSize: 12, marginBottom: "0.5rem" }}>REQUIRED DOCUMENTATION</div>
                {detail.docs.map((d) => <div key={d} style={{ color: "#E8EDF5", fontSize: 14, padding: "0.2rem 0" }}>📎 {d}</div>)}
              </div>
              <div style={{ background: "#1A2E10", border: "1px solid #2ECC71", borderRadius: 8, padding: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ color: "#2ECC71", fontSize: 13, fontWeight: 700 }}>💵 Estimated Benefit: {detail.benefit}</div>
              </div>
              <div style={{ background: "#1A1A00", border: "1px solid #F5E642", borderRadius: 8, padding: "0.75rem" }}>
                <div style={{ color: "#F5E642", fontSize: 13, fontWeight: 700, marginBottom: "0.25rem" }}>🌟 DFW Insight</div>
                <div style={{ color: "#CBD5E8", fontSize: 13 }}>{detail.dfwNote}</div>
              </div>
            </div>
          ) : (
            <div style={{ color: "#718096", textAlign: "center", padding: "2rem", fontSize: 15 }}>Select a renovation type above to see your tax treatment, required documents, and estimated benefit</div>
          )}
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: 10, padding: "1.25rem", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ color: "#0A1628", fontSize: 16, marginBottom: "0.75rem" }}>⚠️ DFW Property Tax Note</h3>
          <p style={{ color: "#4A5D7A", fontSize: 14, lineHeight: 1.7 }}>Significant improvements can trigger a property tax reassessment in Texas. Counties like Collin, Denton, and Dallas may increase your appraised value after permitted work. Budget for a potential tax increase in year 2 after major renovations. File a protest if the increase seems excessive — DFW homeowners who protest appraisals win or reduce increases in 60–70% of cases.</p>
        </div>
      </div>
    </div>
  );
}
