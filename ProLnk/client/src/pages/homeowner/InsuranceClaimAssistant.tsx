import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileCheck, Phone, Copy, CheckCircle, ExternalLink, AlertTriangle, Droplets, Wind, Flame, ShieldAlert, Building2, HelpCircle } from "lucide-react";
import { useLocation } from "wouter";

type ClaimType = "water" | "storm" | "fire" | "theft" | "foundation" | "other";

interface ClaimTypeInfo {
  label: string;
  icon: React.ReactNode;
  color: string;
  typicalRange: string;
  covered: string[];
  notCovered: string[];
  docs: string[];
}

const CLAIM_TYPES: Record<ClaimType, ClaimTypeInfo> = {
  water: {
    label: "Water Damage",
    icon: <Droplets className="h-5 w-5" />,
    color: "text-blue-400",
    typicalRange: "$3,000 – $75,000",
    covered: [
      "Sudden burst pipe or supply line failure",
      "Accidental overflow from appliances",
      "Ice dam roof damage causing interior water",
      "Fire-suppression water damage",
    ],
    notCovered: [
      "Gradual leaks and seepage (maintenance issue)",
      "Flooding from external water (needs flood policy)",
      "Sewer backup without endorsement",
      "Roof leaks from lack of maintenance",
    ],
    docs: [
      "Photos/video of all affected areas",
      "Plumber report showing cause and date",
      "Receipts for emergency mitigation (water extraction, fans)",
      "Inventory of damaged personal property with values",
      "Contractor estimate for structural repairs",
    ],
  },
  storm: {
    label: "Storm / Wind Damage",
    icon: <Wind className="h-5 w-5" />,
    color: "text-purple-400",
    typicalRange: "$5,000 – $50,000",
    covered: [
      "Wind and hail damage to roof, siding, windows",
      "Fallen tree or debris damage",
      "Structural damage from high winds",
      "Interior damage from storm-caused opening",
    ],
    notCovered: [
      "Flooding from storm surge (needs flood policy)",
      "Cosmetic damage that doesn't affect function",
      "Pre-existing roof wear",
      "Damage below your deductible",
    ],
    docs: [
      "NOAA weather report or local news confirming storm date",
      "Before/after photos showing damage extent",
      "Roofing contractor inspection report",
      "Tree removal receipts",
      "Temporary repair receipts (tarps, board-ups)",
    ],
  },
  fire: {
    label: "Fire Damage",
    icon: <Flame className="h-5 w-5" />,
    color: "text-orange-400",
    typicalRange: "$15,000 – $300,000+",
    covered: [
      "Structural repair or rebuild costs",
      "Personal property replacement",
      "Smoke and soot remediation",
      "Additional living expenses while displaced",
      "Debris removal",
    ],
    notCovered: [
      "Intentional acts",
      "Vacant property (30+ days unoccupied)",
      "Arson",
      "Certain types of electrical fires if negligent wiring was known",
    ],
    docs: [
      "Fire department incident report",
      "Photos/video before cleanup begins",
      "Complete home inventory of personal property",
      "Hotel/rental receipts for additional living expenses",
      "Restoration company estimate",
      "Proof of ownership for high-value items",
    ],
  },
  theft: {
    label: "Theft / Vandalism",
    icon: <ShieldAlert className="h-5 w-5" />,
    color: "text-yellow-400",
    typicalRange: "$2,000 – $30,000",
    covered: [
      "Stolen personal property",
      "Damage from forced entry",
      "Vandalism to structure",
      "Jewelry and electronics up to policy sublimits",
    ],
    notCovered: [
      "Items above scheduled limit without a rider",
      "Cash (typically capped at $200)",
      "Theft without evidence of forced entry (claims vary)",
      "Items left in vehicles",
    ],
    docs: [
      "Police report (required — file immediately)",
      "Photos of forced entry points",
      "List of stolen items with model/serial numbers",
      "Receipts, photos, or appraisals for stolen items",
      "Bank/credit card statements showing purchases",
    ],
  },
  foundation: {
    label: "Foundation / Structural",
    icon: <Building2 className="h-5 w-5" />,
    color: "text-red-400",
    typicalRange: "$8,000 – $100,000",
    covered: [
      "Sudden collapse from covered peril",
      "Earthquake damage (with earthquake endorsement)",
      "Foundation damage from burst pipe",
    ],
    notCovered: [
      "Gradual settling or soil movement (almost always excluded)",
      "Tree root intrusion",
      "Poor original construction",
      "Flooding or water table (needs flood policy)",
    ],
    docs: [
      "Structural engineer inspection report",
      "Photos showing cracks, settlement, or collapse",
      "Soil report if available",
      "Documentation linking cause to a covered peril",
      "Contractor repair estimates from 2+ companies",
    ],
  },
  other: {
    label: "Other",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "text-slate-400",
    typicalRange: "Varies by damage type",
    covered: [
      "Damage from covered perils in your specific policy",
      "Review your policy declarations page for named perils",
      "Call your agent to confirm coverage before filing",
    ],
    notCovered: [
      "Excluded perils listed in your policy",
      "Maintenance-related deterioration",
      "Cosmetic damage only",
    ],
    docs: [
      "Photos/video of all damage",
      "Third-party inspection or assessment",
      "Any receipts for emergency repairs",
      "Inventory of damaged items with values",
    ],
  },
};

export default function InsuranceClaimAssistant() {
  const [, navigate] = useLocation();
  const [selectedType, setSelectedType] = useState<ClaimType | null>(null);
  const [incidentDate, setIncidentDate] = useState("");
  const [estimatedDamage, setEstimatedDamage] = useState("");
  const [description, setDescription] = useState("");
  const [copied, setCopied] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const info = selectedType ? CLAIM_TYPES[selectedType] : null;

  const generateSummary = () => {
    if (!selectedType || !incidentDate || !description) return "";
    const typeLabel = CLAIM_TYPES[selectedType].label;
    const dmg = estimatedDamage ? ` Estimated damage is approximately ${estimatedDamage}.` : "";
    return `On ${incidentDate}, my property sustained ${typeLabel.toLowerCase()} damage.${dmg} ${description.trim()} I am requesting a claim inspection and adjuster visit at your earliest availability. I have documentation available including photos of the damage and relevant contractor or inspection reports.`;
  };

  const handleCopy = () => {
    const summary = generateSummary();
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const claimTypeKeys: ClaimType[] = ["water", "storm", "fire", "theft", "foundation", "other"];

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-teal-400" />
            Insurance Claim Assistant
          </h1>
          <p className="text-slate-400 mt-1">Step-by-step help filing your insurance claim with the right documentation.</p>
        </div>

        {/* Step 1: Claim Type */}
        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base">Step 1 — What type of claim?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {claimTypeKeys.map((key) => {
                const t = CLAIM_TYPES[key];
                const active = selectedType === key;
                return (
                  <button
                    key={key}
                    onClick={() => { setSelectedType(key); setShowSummary(false); }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border text-center transition-all ${
                      active
                        ? "border-teal-500 bg-teal-500/10"
                        : "border-slate-600 bg-slate-800/40 hover:border-slate-500"
                    }`}
                  >
                    <span className={t.color}>{t.icon}</span>
                    <span className="text-xs text-white font-medium leading-tight">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Info panel for selected type */}
        {info && (
          <div className="space-y-4">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <span className={info.color}>{info.icon}</span>
                  {info.label} — Coverage Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Typical claim range</p>
                  <p className="text-teal-400 font-semibold">{info.typicalRange}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-green-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Typically covered
                    </p>
                    <ul className="space-y-1">
                      {info.covered.map((item, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-red-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> Usually not covered
                    </p>
                    <ul className="space-y-1">
                      {info.notCovered.map((item, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documentation checklist */}
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base">Documents to gather before calling</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {info.docs.map((doc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded border border-slate-600 flex-shrink-0 mt-0.5" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Step 2: Incident form */}
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base">Step 2 — Pre-fill claim details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-slate-300 text-sm">Incident date</Label>
                    <Input
                      type="date"
                      value={incidentDate}
                      onChange={(e) => setIncidentDate(e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-300 text-sm">Estimated damage ($)</Label>
                    <Input
                      placeholder="e.g. $12,000"
                      value={estimatedDamage}
                      onChange={(e) => setEstimatedDamage(e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-300 text-sm">Describe what happened</Label>
                  <Textarea
                    placeholder="Describe the incident in your own words — what occurred, where in the home, and what was damaged..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 resize-none"
                  />
                </div>
                <Button
                  onClick={() => setShowSummary(true)}
                  disabled={!incidentDate || !description}
                  className="bg-teal-600 hover:bg-teal-700 text-white w-full"
                >
                  Generate claim summary
                </Button>
              </CardContent>
            </Card>

            {/* Generated summary */}
            {showSummary && (
              <Card className="bg-slate-800/60 border-teal-600/40">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-base flex items-center justify-between">
                    <span>Claim summary — copy & paste for adjuster</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCopy}
                      className="text-teal-400 hover:text-teal-300 gap-1"
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-200 text-sm leading-relaxed bg-slate-900/60 rounded-lg p-4 border border-slate-700">
                    {generateSummary()}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Insurance contacts reference */}
        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Phone className="h-4 w-4 text-teal-400" />
              First call: your insurer's claims hotline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-slate-400">Always call your insurer first before starting repairs. Unauthorized repairs can jeopardize your claim.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "State Farm", phone: "1-800-732-5246" },
                { name: "Allstate", phone: "1-800-255-7828" },
                { name: "USAA", phone: "1-800-531-8722" },
                { name: "Liberty Mutual", phone: "1-800-225-2467" },
                { name: "Farmers", phone: "1-800-435-7764" },
                { name: "Nationwide", phone: "1-800-421-3535" },
              ].map((carrier) => (
                <div key={carrier.name} className="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg">
                  <span className="text-sm text-white">{carrier.name}</span>
                  <a href={`tel:${carrier.phone.replace(/-/g, "")}`} className="text-teal-400 text-sm font-mono hover:underline">
                    {carrier.phone}
                  </a>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">Don't see your carrier? Check your policy declarations page or the insurer's website for claims contact info.</p>
          </CardContent>
        </Card>

        {/* Book a pro CTA */}
        <Card className="bg-teal-900/30 border-teal-600/40">
          <CardContent className="pt-6 pb-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold">Need a damage assessment?</p>
                <p className="text-slate-400 text-sm mt-0.5">A TrustyPro-verified contractor can document your damage and provide a certified estimate for your adjuster.</p>
              </div>
              <Button
                onClick={() => navigate("/trustypro/book")}
                className="bg-teal-600 hover:bg-teal-700 text-white whitespace-nowrap flex-shrink-0 gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Book assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
