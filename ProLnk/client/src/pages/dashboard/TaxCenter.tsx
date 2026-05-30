import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Download,
  AlertCircle,
  Info,
  Calculator,
  Receipt,
  DollarSign,
  CheckCircle,
  TrendingUp,
  Shield,
  Clipboard,
  ExternalLink,
} from "lucide-react";

const PLATFORM_FEE_RATE = 0.28;
const PRO_KEEP_RATE = 0.72;

const MOCK_INCOME: Record<string, { grossIncome: number; jobCount: number }> = {
  "2025": { grossIncome: 18_420, jobCount: 47 },
  "2026": { grossIncome: 6_840, jobCount: 19 },
};

const QUARTERLY_DUE_DATES = [
  { label: "Q1", due: "April 15", status: "paid" as const },
  { label: "Q2", due: "June 16", status: "upcoming" as const },
  { label: "Q3", due: "September 15", status: "upcoming" as const },
  { label: "Q4", due: "January 15 (next year)", status: "upcoming" as const },
];

const DEDUCTIONS = [
  { name: "Vehicle mileage", detail: "3,240 miles × $0.67", amount: 2171 },
  { name: "Home office", detail: "Dedicated workspace", amount: 420 },
  { name: "Phone bill", detail: "Business portion (70%)", amount: 840 },
  { name: "Professional tools", detail: "Equipment & supplies", amount: 1200 },
  { name: "Liability insurance", detail: "Annual premium", amount: 780 },
];

const ENTITY_COMPARISON = [
  {
    type: "Sole Prop",
    icon: "👤",
    at50k: 7063,
    at100k: 14125,
    at150k: 21188,
    savings50k: 0,
    savings100k: 0,
    savings150k: 0,
    note: "Simplest, pay full SE tax (15.3%)",
    highlight: false,
  },
  {
    type: "LLC",
    icon: "🏢",
    at50k: 7063,
    at100k: 14125,
    at150k: 21188,
    savings50k: 0,
    savings100k: 0,
    savings150k: 0,
    note: "Same tax as Sole Prop unless S-Corp election",
    highlight: false,
  },
  {
    type: "S-Corp",
    icon: "⚡",
    at50k: 5250,
    at100k: 8750,
    at150k: 11250,
    savings50k: 1813,
    savings100k: 5375,
    savings150k: 9938,
    note: "Pay yourself salary, rest as distributions — saves SE tax",
    highlight: true,
  },
];

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function downloadCSV(filename: string, rows: string[][], headers: string[]) {
  const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function TaxCenter() {
  const [taxYear, setTaxYear] = useState<"2025" | "2026">("2026");
  const [annualEstimate, setAnnualEstimate] = useState("");

  const data = MOCK_INCOME[taxYear];
  const platformFees = Math.round(data.grossIncome * PLATFORM_FEE_RATE);
  const netIncome = Math.round(data.grossIncome * PRO_KEEP_RATE);
  const needs1099 = data.grossIncome >= 600;
  const threshold1099 = 20000;
  const earningsProgress = Math.min((data.grossIncome / threshold1099) * 100, 100);

  const totalDeductions = DEDUCTIONS.reduce((s, d) => s + d.amount, 0);

  const quarterlyAmount =
    annualEstimate && parseFloat(annualEstimate) > 0
      ? Math.round(parseFloat(annualEstimate) * 0.275 * 0.25)
      : null;

  function handleExportIncomeCsv() {
    downloadCSV(
      `prolnk-income-${taxYear}.csv`,
      [
        ["Gross Income", formatCurrency(data.grossIncome)],
        ["Platform Fees Paid", formatCurrency(platformFees)],
        ["Net Income (60%)", formatCurrency(netIncome)],
        ["Jobs Completed", String(data.jobCount)],
        ["Tax Year", taxYear],
        ["1099 Required", needs1099 ? "Yes" : "No"],
      ],
      ["Category", "Amount"],
    );
  }

  function handleExportJobLogCsv() {
    const jobRows = Array.from({ length: data.jobCount }, (_, i) => [
      `JOB-${taxYear}-${String(i + 1).padStart(4, "0")}`,
      `${taxYear}-${String(Math.ceil(((i + 1) / data.jobCount) * 12)).padStart(2, "0")}-01`,
      formatCurrency(Math.round(data.grossIncome / data.jobCount)),
      formatCurrency(Math.round((data.grossIncome / data.jobCount) * PRO_KEEP_RATE)),
      "Paid",
    ]);
    downloadCSV(
      `prolnk-job-log-${taxYear}.csv`,
      jobRows,
      ["Job ID", "Date", "Gross Amount", "Your Earnings", "Status"],
    );
  }

  function handleDownload1099Pdf() {
    const content = [
      "PROLNK LLC — 1099-NEC SUMMARY",
      `Tax Year: ${taxYear}`,
      "",
      "This document is for your records.",
      "An official 1099-NEC will be filed with the IRS and mailed to you by January 31.",
      "",
      `Total Non-Employee Compensation (Box 1): ${formatCurrency(netIncome)}`,
      `Gross Income Through ProLnk: ${formatCurrency(data.grossIncome)}`,
      `Platform Fees: ${formatCurrency(platformFees)}`,
      "",
      "Payer: ProLnk LLC, Dallas TX 75201",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prolnk-1099-summary-${taxYear}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Tax Center</h1>
        <p className="text-slate-400 mt-1">Income summaries, exports, and tax guidance for your ProLnk earnings</p>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <Label className="text-slate-300 whitespace-nowrap">Tax Year</Label>
        <Select value={taxYear} onValueChange={(v) => setTaxYear(v as "2025" | "2026")}>
          <SelectTrigger className="w-32 bg-slate-800 border-slate-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700 text-white">
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 1099 Status Card */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <FileText className="h-5 w-5 text-teal-400" />
            1099 Status — {taxYear}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-900 rounded-lg p-4 border border-teal-500/20">
            <p className="text-teal-300 font-semibold text-lg">
              Your {taxYear} 1099 will be available January 31, {parseInt(taxYear) + 1}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Official 1099-NEC forms are filed with the IRS and emailed to you by January 31.
              Ensure your W-9 is on file in account settings.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Earnings threshold progress</span>
              <span className="text-white font-semibold">
                {formatCurrency(data.grossIncome)} / {formatCurrency(threshold1099)}
                <span className="text-slate-500 font-normal ml-1">({earningsProgress.toFixed(1)}%)</span>
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-teal-400 h-3 rounded-full transition-all"
                style={{ width: `${earningsProgress}%` }}
              />
            </div>
            <p className="text-slate-500 text-xs">
              1099-NEC is required once earnings exceed $20,000 (IRS threshold for platform payments)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Income Summary */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <DollarSign className="h-5 w-5 text-green-400" />
            Income Summary — {taxYear}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Gross Income</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(data.grossIncome)}</p>
              <p className="text-slate-500 text-xs mt-1">{data.jobCount} jobs</p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Platform Fees</p>
              <p className="text-2xl font-bold text-red-400">-{formatCurrency(platformFees)}</p>
              <p className="text-slate-500 text-xs mt-1">28% retained by ProLnk</p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Net Income</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(netIncome)}</p>
              <p className="text-slate-500 text-xs mt-1">60% you keep</p>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          <div className="flex items-start gap-3">
            {needs1099 ? (
              <>
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-yellow-300 font-medium">1099-NEC Required</p>
                  <p className="text-slate-400 text-sm">
                    You earned over $600 through ProLnk in {taxYear}. ProLnk will file a 1099-NEC with the
                    IRS and email it to you by January 31, {parseInt(taxYear) + 1}.
                  </p>
                </div>
              </>
            ) : (
              <>
                <Info className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-blue-300 font-medium">Below 1099 Threshold</p>
                  <p className="text-slate-400 text-sm">
                    You earned under $600 in {taxYear}. No 1099-NEC will be filed, but you're still
                    responsible for reporting all self-employment income to the IRS.
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Estimates */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calculator className="h-5 w-5 text-purple-400" />
            Quarterly Tax Estimates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUARTERLY_DUE_DATES.map((q) => {
              const amount = Math.round(netIncome * 0.275 * 0.25);
              const bgColor =
                q.status === "paid"
                  ? "bg-green-500/10 border-green-500/30"
                  : q.label === "Q2"
                  ? "bg-yellow-500/10 border-yellow-500/30"
                  : "bg-slate-900 border-slate-700";
              const textColor =
                q.status === "paid"
                  ? "text-green-400"
                  : q.label === "Q2"
                  ? "text-yellow-400"
                  : "text-slate-400";
              const statusLabel =
                q.status === "paid" ? "Paid" : q.label === "Q2" ? "Upcoming" : "Upcoming";
              return (
                <div key={q.label} className={`rounded-lg p-4 border ${bgColor}`}>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="outline"
                      className={`text-xs border-current ${textColor}`}
                    >
                      {q.label}
                    </Badge>
                    <span className={`text-xs font-medium ${textColor}`}>{statusLabel}</span>
                  </div>
                  <p className="text-white font-bold text-xl">{formatCurrency(amount)}</p>
                  <p className="text-slate-500 text-xs mt-1">Due {q.due}</p>
                </div>
              );
            })}
          </div>
          <Separator className="bg-slate-700" />
          <div>
            <Label className="text-slate-300 text-sm mb-2 block">
              Override with custom annual estimate
            </Label>
            <div className="flex items-center gap-3 max-w-xs">
              <span className="text-slate-400">$</span>
              <Input
                type="number"
                placeholder="e.g. 40000"
                value={annualEstimate}
                onChange={(e) => setAnnualEstimate(e.target.value)}
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
          </div>
          {quarterlyAmount !== null && (
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Estimated quarterly payment:</p>
              <p className="text-2xl font-bold text-purple-400">{formatCurrency(quarterlyAmount)} / quarter</p>
              <p className="text-slate-500 text-xs mt-2">~27.5% effective rate (SE tax + income tax). Consult a CPA for your actual liability.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deductions Tracker */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Clipboard className="h-5 w-5 text-teal-400" />
            Deductions Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Expense</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Detail</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium">Deduction</th>
                </tr>
              </thead>
              <tbody>
                {DEDUCTIONS.map((d) => (
                  <tr key={d.name} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="py-2.5 px-3 text-white font-medium">{d.name}</td>
                    <td className="py-2.5 px-3 text-slate-400">{d.detail}</td>
                    <td className="py-2.5 px-3 text-right text-teal-400 font-semibold">{formatCurrency(d.amount)}</td>
                  </tr>
                ))}
                <tr className="bg-teal-500/10">
                  <td className="py-3 px-3 text-white font-bold" colSpan={2}>Total Deductions</td>
                  <td className="py-3 px-3 text-right text-teal-300 font-bold text-lg">{formatCurrency(totalDeductions)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-xs">
            Track receipts for all business expenses. These are common deductions for ProLnk partners — consult a CPA to confirm eligibility.
          </p>
        </CardContent>
      </Card>

      {/* Business Entity Optimizer */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="h-5 w-5 text-blue-400" />
            Optimize Your Tax Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-400 text-sm">
            Estimated tax liability by entity type at different income levels. S-Corp election can significantly reduce self-employment tax.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Entity</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium">At $50K</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium">At $100K</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium">At $150K</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium hidden sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {ENTITY_COMPARISON.map((e) => (
                  <tr
                    key={e.type}
                    className={`border-b border-slate-700/50 ${e.highlight ? "bg-teal-500/10" : ""}`}
                  >
                    <td className="py-3 px-3">
                      <span className="mr-2">{e.icon}</span>
                      <span className={`font-semibold ${e.highlight ? "text-teal-300" : "text-white"}`}>
                        {e.type}
                      </span>
                      {e.highlight && (
                        <Badge className="ml-2 bg-teal-500/20 text-teal-300 border-teal-500/40 text-xs">Recommended</Badge>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={e.highlight ? "text-teal-300 font-semibold" : "text-white"}>{formatCurrency(e.at50k)}</span>
                      {e.savings50k > 0 && (
                        <p className="text-green-400 text-xs">save {formatCurrency(e.savings50k)}</p>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={e.highlight ? "text-teal-300 font-semibold" : "text-white"}>{formatCurrency(e.at100k)}</span>
                      {e.savings100k > 0 && (
                        <p className="text-green-400 text-xs">save {formatCurrency(e.savings100k)}</p>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={e.highlight ? "text-teal-300 font-semibold" : "text-white"}>{formatCurrency(e.at150k)}</span>
                      {e.savings150k > 0 && (
                        <p className="text-green-400 text-xs">save {formatCurrency(e.savings150k)}</p>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-xs hidden sm:table-cell">{e.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-xs">
            Estimates assume standard deductions and 24% federal bracket. State taxes vary. S-Corp election requires reasonable salary determination.
          </p>
        </CardContent>
      </Card>

      {/* Export + Resources */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Download className="h-5 w-5 text-blue-400" />
            Downloads & Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDownload1099Pdf}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Download 2024 Tax Summary PDF
            </Button>
            <Button
              onClick={handleExportIncomeCsv}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              <Receipt className="h-4 w-4 mr-2" />
              Export Income Statement (CSV)
            </Button>
            <Button
              onClick={handleExportJobLogCsv}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Job Log (CSV)
            </Button>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-900 rounded-lg border border-slate-700">
            <ExternalLink className="h-4 w-4 text-teal-400 shrink-0" />
            <div>
              <p className="text-slate-300 text-sm font-medium">Find a CPA who works with gig workers</p>
              <p className="text-slate-500 text-xs mt-0.5">
                <a
                  href="https://www.aicpa.org/forthepublic/findacpa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:underline"
                >
                  Search AICPA CPA directory →
                </a>
                {" "}or ask in your trade association for referrals.
              </p>
            </div>
          </div>
          <p className="text-slate-500 text-xs">
            CSV exports include job-level detail. The 1099 summary is for your records — official 1099-NEC forms
            are issued by ProLnk directly to your email and the IRS.
          </p>
        </CardContent>
      </Card>

      {/* Tax Tips */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            Tax Tips for ProLnk Partners
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <TaxTip
              title="Deductible business expenses"
              body="Tools and equipment, vehicle mileage (67¢/mile in 2024), work phone and internet, liability insurance, licensing fees, advertising, and ProLnk subscription fees."
            />
            <TaxTip
              title="Set aside 25–30% for taxes"
              body="As a self-employed contractor you owe both income tax and self-employment tax (15.3%). Setting aside 25–30% of each ProLnk payment avoids a surprise bill in April."
            />
            <TaxTip
              title="Pay quarterly to avoid penalties"
              body="The IRS expects quarterly estimated payments if you owe more than $1,000 in a year. Use the calculator above to estimate your payments."
            />
            <TaxTip
              title="Talk to a tax professional"
              body="A CPA familiar with self-employment can identify deductions specific to your trade, set up an S-Corp if it saves you money, and prepare your Schedule C and SE."
            />
          </div>
          <Separator className="bg-slate-700" />
          <p className="text-slate-500 text-xs">
            ProLnk does not provide tax advice. Information here is general guidance only. Consult a licensed tax
            professional for advice specific to your situation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function TaxTip({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
      <div>
        <p className="text-slate-200 font-medium text-sm">{title}</p>
        <p className="text-slate-400 text-sm">{body}</p>
      </div>
    </div>
  );
}
