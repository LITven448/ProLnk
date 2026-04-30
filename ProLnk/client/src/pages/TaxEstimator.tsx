import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calculator, TrendingDown, FileText, AlertCircle, CheckCircle, Download } from "lucide-react";
import { toast } from "sonner";

const DEDUCTIONS = [
  { label: "Vehicle Mileage (IRS rate $0.67/mile)", key: "miles", multiplier: 0.67, placeholder: "Miles driven for work" },
  { label: "Tools & Equipment", key: "tools", multiplier: 1, placeholder: "Total cost of tools purchased" },
  { label: "Phone (business use %)", key: "phone", multiplier: 0.8, placeholder: "Monthly phone bill" },
  { label: "Home Office (sq ft)", key: "homeOffice", multiplier: 5, placeholder: "Square feet of dedicated office" },
  { label: "Insurance Premiums", key: "insurance", multiplier: 1, placeholder: "Annual business insurance" },
  { label: "Marketing & Advertising", key: "marketing", multiplier: 1, placeholder: "Annual marketing spend" },
];

const TAX_BRACKETS_2025 = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

function calcFederalTax(income: number): number {
  let tax = 0;
  for (const bracket of TAX_BRACKETS_2025) {
    if (income <= bracket.min) break;
    const taxable = Math.min(income, bracket.max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  return tax;
}

function downloadCsv(data: any[], filename: string) {
  if (!data.length) { toast.error("No data to export"); return; }
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => {
    const val = row[h];
    const str = val == null ? "" : String(val);
    return str.includes(",") || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
  }).join(","));
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
  toast.success(`Exported ${data.length} records`);
}

export default function TaxEstimator() {
  const [grossIncome, setGrossIncome] = useState("48000");
  const [deductionValues, setDeductionValues] = useState<Record<string, string>>({});
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single");

  const { data: commissions = [] } = trpc.partners.getPaidCommissions.useQuery();

  const gross = parseFloat(grossIncome) || 0;

  const totalDeductions = DEDUCTIONS.reduce((sum, d) => {
    const val = parseFloat(deductionValues[d.key] || "0") || 0;
    return sum + val * d.multiplier;
  }, 0);

  const seDeduction = gross * 0.0765; // 50% of SE tax
  const standardDeduction = filingStatus === "single" ? 14600 : 29200;
  const qbiDeduction = gross * 0.20; // 20% QBI deduction for self-employed
  const totalDeductionsAll = totalDeductions + seDeduction + standardDeduction + qbiDeduction;
  const taxableIncome = Math.max(0, gross - totalDeductionsAll);
  const federalTax = calcFederalTax(taxableIncome);
  const seTax = gross * 0.153 * 0.9235; // SE tax on 92.35% of net
  const stateTax = gross * 0.05; // Approximate TX has no income tax, using 5% as generic
  const totalTax = federalTax + seTax;
  const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;
  const quarterlyPayment = totalTax / 4;

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Tax Estimator</h1>
          <p className="text-slate-500 mt-1">Estimate your self-employment tax and quarterly payments</p>
          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-xs text-amber-700">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            This is an estimate only. Consult a tax professional for filing.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            {/* Gross Income */}
            <Card>
              <CardHeader><CardTitle className="text-sm">Annual Gross Income</CardTitle></CardHeader>
              <CardContent>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input type="number" value={grossIncome} onChange={e => setGrossIncome(e.target.value)} className="pl-8 text-lg font-bold" />
                </div>
                <div className="flex gap-2 mt-2">
                  {["single", "married"].map(s => (
                    <button
                      key={s}
                      onClick={() => setFilingStatus(s as any)}
                      className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${filingStatus === s ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200"}`}
                    >
                      {s === "single" ? "Single" : "Married Filing Jointly"}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Deductions */}
            <Card>
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><TrendingDown className="w-4 h-4 text-green-500" /> Business Deductions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {DEDUCTIONS.map(d => (
                  <div key={d.key}>
                    <label className="text-xs font-medium text-slate-600 mb-1 block">{d.label}</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <Input
                        type="number"
                        placeholder={d.placeholder}
                        value={deductionValues[d.key] || ""}
                        onChange={e => setDeductionValues(prev => ({ ...prev, [d.key]: e.target.value }))}
                        className="pl-7 text-sm"
                      />
                    </div>
                    {deductionValues[d.key] && (
                      <div className="text-xs text-green-600 mt-0.5">
                        Deduction: ${(parseFloat(deductionValues[d.key]) * d.multiplier).toFixed(0)}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div>
            <Card className="sticky top-6">
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Calculator className="w-4 h-4" /> Tax Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Gross Income</span><span className="font-medium">${gross.toLocaleString()}</span></div>
                  <div className="flex justify-between text-green-600"><span>Business Deductions</span><span>-${totalDeductions.toFixed(0)}</span></div>
                  <div className="flex justify-between text-green-600"><span>SE Tax Deduction</span><span>-${seDeduction.toFixed(0)}</span></div>
                  <div className="flex justify-between text-green-600"><span>QBI Deduction (20%)</span><span>-${qbiDeduction.toFixed(0)}</span></div>
                  <div className="flex justify-between text-green-600"><span>Standard Deduction</span><span>-${standardDeduction.toLocaleString()}</span></div>
                  <div className="flex justify-between font-semibold border-t pt-1.5"><span>Taxable Income</span><span>${taxableIncome.toLocaleString()}</span></div>
                </div>

                <div className="space-y-1.5 text-sm border-t pt-2">
                  <div className="flex justify-between"><span className="text-slate-500">Federal Income Tax</span><span className="text-red-500">-${federalTax.toFixed(0)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Self-Employment Tax</span><span className="text-red-500">-${seTax.toFixed(0)}</span></div>
                  <div className="flex justify-between font-bold text-base border-t pt-1.5"><span>Total Tax Owed</span><span className="text-red-600">-${totalTax.toFixed(0)}</span></div>
                </div>

                <div className="bg-indigo-50 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Effective Rate</span>
                    <span className="text-indigo-700">{effectiveRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Quarterly Payment</span>
                    <span className="text-indigo-700">${quarterlyPayment.toFixed(0)}</span>
                  </div>
                  <div className="text-xs text-indigo-600">Due: Apr 15 · Jun 16 · Sep 15 · Jan 15</div>
                </div>

                <div className="bg-green-50 rounded-xl p-3 text-xs text-green-700">
                  <div className="font-semibold mb-1">💡 Tax Tip</div>
                  You saved <strong>${(totalDeductions + qbiDeduction).toFixed(0)}</strong> through deductions. Keep receipts for all business expenses.
                </div>

                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm" onClick={() => {
                  const printContent = `<html><head><title>Tax Summary ${new Date().getFullYear()}</title>
                  <style>body{font-family:Arial,sans-serif;padding:40px;color:#1e293b}h1{font-size:22px;margin-bottom:4px}.sub{color:#64748b;margin-bottom:24px}table{width:100%;border-collapse:collapse;margin:16px 0}th{background:#f1f5f9;padding:10px 14px;text-align:left;font-size:13px}td{padding:10px 14px;border-bottom:1px solid #e2e8f0;font-size:14px}.highlight{background:#eff6ff;font-weight:bold}.footer{margin-top:32px;font-size:11px;color:#94a3b8}@media print{body{padding:20px}}</style>
                  </head><body>
                  <h1>Self-Employment Tax Summary ${new Date().getFullYear()}</h1>
                  <div class="sub">Filing Status: ${filingStatus === 'single' ? 'Single' : 'Married Filing Jointly'}</div>
                  <table><thead><tr><th>Item</th><th>Amount</th></tr></thead><tbody>
                  <tr><td>Gross Income</td><td>$${gross.toLocaleString()}</td></tr>
                  <tr><td>Total Deductions</td><td>-$${totalDeductionsAll.toFixed(0)}</td></tr>
                  <tr><td>Taxable Income</td><td>$${taxableIncome.toFixed(0)}</td></tr>
                  <tr><td>Federal Income Tax</td><td>$${federalTax.toFixed(0)}</td></tr>
                  <tr><td>Self-Employment Tax (15.3%)</td><td>$${seTax.toFixed(0)}</td></tr>
                  <tr class="highlight"><td>Total Estimated Tax</td><td>$${totalTax.toFixed(0)}</td></tr>
                  <tr class="highlight"><td>Effective Rate</td><td>${effectiveRate.toFixed(1)}%</td></tr>
                  <tr><td>Quarterly Payment (est.)</td><td>$${quarterlyPayment.toFixed(0)}</td></tr>
                  </tbody></table>
                  <p style="font-size:11px;color:#94a3b8">⚠️ This is an estimate only. Consult a tax professional for filing.</p>
                  <div class="footer">Generated by ProLnk Partner Platform &bull; ${new Date().toLocaleDateString()}</div>
                  </body></html>`;
                  const w = window.open('', '_blank');
                  if (w) { w.document.write(printContent); w.document.close(); w.print(); }
                }}>
                  <FileText className="w-4 h-4 mr-2" /> Download Summary
                </Button>
                <Button variant="outline" className="w-full mt-2" onClick={() => {
                  const year = new Date().getFullYear();
                  const exportData = commissions.map((c: any) => ({
                    Date: c.paidAt ? new Date(c.paidAt).toLocaleDateString() : "",
                    Description: c.description || "",
                    Amount: c.amount || 0,
                    Status: c.paid ? "Paid" : "Pending",
                    DisputeStatus: c.disputeStatus || "none",
                  }));
                  downloadCsv(exportData, `prolnk-1099-earnings-${year}.csv`);
                }}>
                  <Download className="w-4 h-4 mr-2" /> Export 1099 CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
