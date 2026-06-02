import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, CheckCircle, XCircle, RefreshCw, AlertTriangle,
  Globe, Wifi,
} from "lucide-react";

const RECENT_VALIDATIONS = [
  { original: "142 Elm St, Austin TX 78701",        corrected: null,                                 result: "valid",     source: "homeowner signup",  time: "2 min ago"  },
  { original: "88 Maplewood Dr, Dallas TX 75201",   corrected: "88 Maple Wood Dr, Dallas TX 75201", result: "corrected", source: "partner apply",     time: "5 min ago"  },
  { original: "9901 Sunset Blvd, Houston TX 77002", corrected: null,                                 result: "valid",     source: "homeowner signup",  time: "11 min ago" },
  { original: "PO Box 4421, San Antonio TX 78205",  corrected: null,                                 result: "invalid",   source: "homeowner signup",  time: "14 min ago" },
  { original: "310 Braker Ln, Austin TX 78753",     corrected: null,                                 result: "valid",     source: "partner apply",     time: "17 min ago" },
  { original: "5544 Riveroaks Ct, Frisco TX 75034", corrected: "5544 River Oaks Ct, Frisco TX 75034", result: "corrected", source: "manual",           time: "23 min ago" },
  { original: "1 Fake Street, Nowhere TX 99999",    corrected: null,                                 result: "invalid",   source: "homeowner signup",  time: "31 min ago" },
  { original: "2800 N Loop W, Houston TX 77092",    corrected: null,                                 result: "valid",     source: "partner apply",     time: "38 min ago" },
  { original: "404 Missing Ave, Austin TX 78756",   corrected: null,                                 result: "invalid",   source: "homeowner signup",  time: "44 min ago" },
  { original: "700 Congress Ave, Austin TX 78701",  corrected: "700 Congress Ave Ste 100, Austin TX 78701", result: "corrected", source: "manual",    time: "51 min ago" },
];

const INVALID_REPORT = [
  { address: "PO Box 4421, San Antonio TX 78205",  issue: "PO Box",       action: "Homeowner contacted" },
  { address: "1 Fake Street, Nowhere TX 99999",    issue: "Non-existent", action: "Rejected"            },
  { address: "404 Missing Ave, Austin TX 78756",   issue: "Non-existent", action: "Homeowner contacted" },
  { address: "99 Typo Stret, Austin TX 78756",     issue: "Typo",         action: "Homeowner contacted" },
  { address: "0000 Test Blvd, Dallas TX 75001",    issue: "Non-existent", action: "Rejected"            },
  { address: "PO Box 9900, Houston TX 77001",      issue: "PO Box",       action: "Rejected"            },
];

const TODAY_STATS = [
  { label: "Validations Today", value: 147, sub: null,      color: "#00D4FF" },
  { label: "Valid",             value: 138, sub: "94%",     color: "#16A34A" },
  { label: "Invalid",          value: 6,   sub: "4%",      color: "#EA0606" },
  { label: "Corrected",        value: 3,   sub: "2%",      color: "#FBB140" },
];

function ResultBadge({ result }: { result: string }) {
  if (result === "valid")
    return <Badge variant="outline" className="border-green-500/50 text-green-700 text-xs">Valid</Badge>;
  if (result === "corrected")
    return <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs">Corrected</Badge>;
  return <Badge variant="outline" className="border-red-500/50 text-red-600 text-xs">Invalid</Badge>;
}

export default function AddressValidationLog() {
  const usedPct = (147 / 10000) * 100;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #00D4FF25, #0D948825)" }}
            >
              <MapPin className="w-6 h-6" style={{ color: "#00D4FF" }} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Address Validation</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Smarty Streets Integration</p>
            </div>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
            style={{ background: "#16A34A15", borderColor: "#16A34A40" }}
          >
            <Wifi className="h-3.5 w-3.5" style={{ color: "#16A34A" }} />
            <span className="text-xs font-bold" style={{ color: "#16A34A" }}>
              Connected — Smarty Streets API responding normally
            </span>
          </div>
        </div>

        {/* ── Today's Stats ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TODAY_STATS.map((s) => (
            <Card key={s.label} className="border border-border">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-gray-900">{s.value}</span>
                  {s.sub && <span className="text-sm font-bold" style={{ color: s.color }}>{s.sub}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── API Usage ──────────────────────────────────────────────────────── */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Monthly API Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-900 font-medium">147 of 10,000 free lookups used</span>
              <a
                href="#"
                className="text-xs font-bold"
                style={{ color: "#00D4FF" }}
              >
                Upgrade for more →
              </a>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "#ffffff12" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${usedPct}%`,
                  background: "linear-gradient(90deg, #00D4FF, #0D9488)",
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
              <span>0</span>
              <span>1.47% used</span>
              <span>10,000</span>
            </div>
          </CardContent>
        </Card>

        {/* ── Recent Validations Log ─────────────────────────────────────────── */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Recent Validations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground">Original Input</th>
                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground">Corrected Output</th>
                    <th className="text-center py-2 px-4 text-xs font-bold text-muted-foreground">Result</th>
                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground">Source</th>
                    <th className="text-right py-2 px-4 text-xs font-bold text-muted-foreground">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_VALIDATIONS.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="py-2.5 px-4 text-xs font-mono text-foreground/80 max-w-[200px] truncate">
                        {row.original}
                      </td>
                      <td className="py-2.5 px-4 text-xs font-mono max-w-[200px] truncate">
                        {row.corrected
                          ? <span className="text-yellow-400">{row.corrected}</span>
                          : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <ResultBadge result={row.result} />
                      </td>
                      <td className="py-2.5 px-4 text-xs text-muted-foreground capitalize">{row.source}</td>
                      <td className="py-2.5 px-4 text-xs text-muted-foreground text-right">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ── Invalid Address Report ─────────────────────────────────────────── */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="font-bold uppercase tracking-widest text-muted-foreground text-xs">
                Invalid Address Report
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground">Submitted Address</th>
                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground">Likely Issue</th>
                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground">Action Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {INVALID_REPORT.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="py-2.5 px-4 text-xs font-mono text-foreground/80">{row.address}</td>
                      <td className="py-2.5 px-4">
                        <Badge
                          variant="outline"
                          className={
                            row.issue === "PO Box"
                              ? "border-yellow-500/50 text-yellow-400 text-xs"
                              : row.issue === "Typo"
                              ? "border-blue-500/50 text-blue-400 text-xs"
                              : "border-red-500/50 text-red-600 text-xs"
                          }
                        >
                          {row.issue}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-4 text-xs text-muted-foreground">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ── Coverage Map Placeholder ───────────────────────────────────────── */}
        <div
          className="rounded-2xl flex items-center justify-center border"
          style={{
            height: 160,
            background: "linear-gradient(135deg, #F8FAFC 0%, #0e2040 100%)",
            borderColor: "#ffffff15",
          }}
        >
          <div className="text-center">
            <Globe className="h-8 w-8 mx-auto mb-2" style={{ color: "#00D4FF" }} />
            <p className="text-sm font-bold text-gray-900">Address validation coverage: 99.9% of US addresses</p>
            <p className="text-xs text-muted-foreground mt-1">Interactive coverage map — coming soon</p>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
