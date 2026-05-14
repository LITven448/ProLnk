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
} from "lucide-react";

const PLATFORM_FEE_RATE = 0.28;
const PRO_KEEP_RATE = 0.72;

const MOCK_INCOME: Record<string, { grossIncome: number; jobCount: number }> = {
  "2025": { grossIncome: 18_420, jobCount: 47 },
  "2026": { grossIncome: 6_840, jobCount: 19 },
};

const QUARTERLY_DUE_DATES = [
  { label: "Q1", due: "April 15" },
  { label: "Q2", due: "June 16" },
  { label: "Q3", due: "September 15" },
  { label: "Q4", due: "January 15 (next year)" },
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
        ["Net Income (72%)", formatCurrency(netIncome)],
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
    <div className="min-h-screen bg-gray-950 text-white p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Tax Center</h1>
        <p className="text-gray-400 mt-1">Income summaries, exports, and tax guidance for your ProLnk earnings</p>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <Label className="text-gray-300 whitespace-nowrap">Tax Year</Label>
        <Select value={taxYear} onValueChange={(v) => setTaxYear(v as "2025" | "2026")}>
          <SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700 text-white">
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Income Summary */}
      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <DollarSign className="h-5 w-5 text-green-400" />
            Income Summary — {taxYear}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Gross Income</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(data.grossIncome)}</p>
              <p className="text-gray-500 text-xs mt-1">{data.jobCount} jobs</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Platform Fees</p>
              <p className="text-2xl font-bold text-red-400">-{formatCurrency(platformFees)}</p>
              <p className="text-gray-500 text-xs mt-1">28% retained by ProLnk</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Net Income</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(netIncome)}</p>
              <p className="text-gray-500 text-xs mt-1">72% you keep</p>
            </div>
          </div>

          <Separator className="bg-gray-700" />

          <div className="flex items-start gap-3">
            {needs1099 ? (
              <>
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-yellow-300 font-medium">1099-NEC Required</p>
                  <p className="text-gray-400 text-sm">
                    You earned over $600 through ProLnk in {taxYear}. ProLnk will file a 1099-NEC with the
                    IRS and email it to you by January 31, {parseInt(taxYear) + 1}. Make sure your W-9 is on
                    file in your account settings.
                  </p>
                </div>
              </>
            ) : (
              <>
                <Info className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-blue-300 font-medium">Below 1099 Threshold</p>
                  <p className="text-gray-400 text-sm">
                    You earned under $600 in {taxYear}. No 1099-NEC will be filed, but you're still
                    responsible for reporting all self-employment income to the IRS.
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Download className="h-5 w-5 text-blue-400" />
            Export Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDownload1099Pdf}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Download 1099 Summary
            </Button>
            <Button
              onClick={handleExportIncomeCsv}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-200 hover:bg-gray-800"
            >
              <Receipt className="h-4 w-4 mr-2" />
              Export Income Statement (CSV)
            </Button>
            <Button
              onClick={handleExportJobLogCsv}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-200 hover:bg-gray-800"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Job Log (CSV)
            </Button>
          </div>
          <p className="text-gray-500 text-xs">
            CSV exports include job-level detail. The 1099 summary is for your records — official 1099-NEC forms
            are issued by ProLnk directly to your email and the IRS.
          </p>
        </CardContent>
      </Card>

      {/* Quarterly Tax Calculator */}
      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calculator className="h-5 w-5 text-purple-400" />
            Quarterly Tax Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300 text-sm mb-2 block">
              Estimated annual ProLnk income
            </Label>
            <div className="flex items-center gap-3 max-w-xs">
              <span className="text-gray-400">$</span>
              <Input
                type="number"
                placeholder="e.g. 40000"
                value={annualEstimate}
                onChange={(e) => setAnnualEstimate(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          {quarterlyAmount !== null && (
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-3">
                Estimated quarterly payment (~27.5% self-employment + income tax):
              </p>
              <p className="text-3xl font-bold text-purple-400 mb-4">
                {formatCurrency(quarterlyAmount)} / quarter
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {QUARTERLY_DUE_DATES.map((q) => (
                  <div key={q.label} className="bg-gray-700 rounded p-2 text-center">
                    <Badge variant="outline" className="border-purple-500 text-purple-300 text-xs mb-1">
                      {q.label}
                    </Badge>
                    <p className="text-gray-300 text-xs">{q.due}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-3">
                This is an estimate only. Consult a tax professional for your actual liability.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tax Tips */}
      <Card className="bg-gray-900 border-gray-800">
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
          <Separator className="bg-gray-700" />
          <p className="text-gray-500 text-xs">
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
        <p className="text-gray-200 font-medium text-sm">{title}</p>
        <p className="text-gray-400 text-sm">{body}</p>
      </div>
    </div>
  );
}
