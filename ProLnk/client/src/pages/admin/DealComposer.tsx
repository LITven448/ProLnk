/**
 * Admin Deal Composer — /admin/deal-composer
 * Create manual deal pages from scratch without needing a photo queue entry.
 * Supports: partner assignment, issue details, estimated value, homeowner info,
 * AI description generation, and one-click send.
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Send, Copy, CheckCircle2, Sparkles, User, Home, DollarSign,
  ChevronDown, ExternalLink, Loader2, AlertCircle, X, Plus,
  Wrench, Zap, RefreshCw
} from "lucide-react";
import { toast } from "sonner";

// ─── Service Categories ───────────────────────────────────────────────────────
const SERVICE_CATEGORIES = [
  { category: "Roofing",        types: ["Shingle Repair", "Full Replacement", "Storm Damage", "Gutter Repair", "Leak Repair"] },
  { category: "HVAC",           types: ["AC Service", "Heating Repair", "New Install", "Duct Cleaning", "Filter Change"] },
  { category: "Plumbing",       types: ["Leak Repair", "Drain Cleaning", "Water Heater", "Pipe Replacement", "Fixture Install"] },
  { category: "Electrical",     types: ["Panel Inspection", "Outlet Repair", "Lighting Install", "Safety Check", "Wiring"] },
  { category: "Fencing",        types: ["Fence Repair", "New Fence", "Gate Install", "Staining", "Post Replacement"] },
  { category: "Landscaping",    types: ["Lawn Mowing", "Tree Trimming", "Sprinkler Repair", "Mulching", "Cleanup"] },
  { category: "Painting",       types: ["Interior Paint", "Exterior Paint", "Touch-up", "Pressure Wash", "Staining"] },
  { category: "Pest Control",   types: ["Inspection", "Treatment", "Termite Check", "Rodent Control", "Prevention"] },
  { category: "Flooring",       types: ["Hardwood Repair", "Tile Install", "Carpet Repair", "Grout Cleaning", "Refinishing"] },
  { category: "Foundation",     types: ["Crack Repair", "Waterproofing", "Leveling", "Inspection", "Drainage"] },
  { category: "Windows/Doors",  types: ["Window Replacement", "Door Install", "Seal Repair", "Screen Repair", "Weatherstripping"] },
  { category: "Concrete",       types: ["Driveway Repair", "Patio Pour", "Crack Fill", "Resurfacing", "Sidewalk"] },
];

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepDot({ n, current, label }: { n: number; current: number; label: string }) {
  const done    = current > n;
  const active  = current === n;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
        done   ? "bg-teal-500 text-white" :
        active ? "bg-[#0A1628] text-white" :
                 "bg-gray-100 text-gray-400"
      }`}>
        {done ? <CheckCircle2 className="w-4 h-4" /> : n}
      </div>
      <span className={`text-[10px] font-medium ${active ? "text-[#0A1628]" : "text-gray-400"}`}>{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DealComposer() {
  const [step, setStep]           = useState(1);
  const [category, setCategory]   = useState("");
  const [issueType, setIssueType] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [estLow, setEstLow]       = useState("");
  const [estHigh, setEstHigh]     = useState("");
  const [address, setAddress]     = useState("");
  const [city, setCity]           = useState("");
  const [zip, setZip]             = useState("");
  const [homeowner, setHomeowner] = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [fieldPartnerId, setFieldPartnerId]     = useState<number | null>(null);
  const [receivingPartnerId, setReceivingPartnerId] = useState<number | null>(null);
  const [generatingAI, setGeneratingAI]         = useState(false);
  const [createdDeal, setCreatedDeal]           = useState<{ token: string; dealUrl: string } | null>(null);
  const [sending, setSending]     = useState(false);

  const { data: partners } = trpc.admin.getApprovedPartnersForDispatch.useQuery();
  const createDealMutation = trpc.deals.createDeal.useMutation();
  const sendDealMutation   = trpc.deals.sendDeal.useMutation();

  const selectedCat = SERVICE_CATEGORIES.find(c => c.category === category);

  // AI description generation
  const generateDescription = async () => {
    if (!issueType || !category) return;
    setGeneratingAI(true);
    try {
      const res = await fetch("/api/trpc/ai.generateDescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: { issueType, category, address } }),
      });
      if (res.ok) {
        const d = await res.json();
        setIssueDesc(d?.result?.data?.json?.description ?? issueDesc);
      }
    } catch { /* use manual */ }
    setGeneratingAI(false);
  };

  const handleCreate = async () => {
    if (!fieldPartnerId) { toast.error("Select a referring partner"); return; }
    try {
      const result = await createDealMutation.mutateAsync({
        opportunityId: 0,
        referringPartnerId: fieldPartnerId,
        receivingPartnerId: receivingPartnerId ?? undefined,
        issueType,
        issueCategory: category,
        issueDescription: issueDesc,
        estimatedValueLow: estLow ? Number(estLow) : undefined,
        estimatedValueHigh: estHigh ? Number(estHigh) : undefined,
        homeownerAddress: address || undefined,
        homeownerCity: city || undefined,
        homeownerZip: zip || undefined,
      });
      setCreatedDeal(result);
      setStep(4);
      toast.success("Deal page created!");
    } catch (err: any) {
      toast.error(err.message || "Failed to create deal");
    }
  };

  const handleSend = async () => {
    if (!createdDeal) return;
    setSending(true);
    try {
      await sendDealMutation.mutateAsync({ token: createdDeal.token });
      toast.success("Deal sent to homeowner!");
    } catch (err: any) {
      toast.error(err.message || "Failed to send");
    }
    setSending(false);
  };

  const dealUrl = createdDeal ? `${window.location.origin}/job/${createdDeal.token}` : "";

  return (
    <AdminLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-[#0A1628]">Deal Composer</h1>
              <p className="text-sm text-gray-500 mt-0.5">Create a manual deal page and send to a homeowner</p>
            </div>
            {step < 4 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setStep(1); setCreatedDeal(null); setCategory(""); setIssueType(""); setIssueDesc(""); setEstLow(""); setEstHigh(""); setAddress(""); setCity(""); setZip(""); setHomeowner(""); setEmail(""); setPhone(""); setFieldPartnerId(null); setReceivingPartnerId(null); }}
                className="text-gray-500 gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset
              </Button>
            )}
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-0">
            {[
              { n: 1, label: "Issue" },
              { n: 2, label: "Partners" },
              { n: 3, label: "Homeowner" },
              { n: 4, label: "Send" },
            ].map(({ n, label }, i) => (
              <div key={n} className="flex items-center">
                <StepDot n={n} current={step} label={label} />
                {i < 3 && <div className="w-8 h-px bg-gray-200 mx-1 mb-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* ── Step 1: Issue Details ── */}
          {step === 1 && (
            <div className="max-w-lg space-y-5">
              <h2 className="text-base font-bold text-[#0A1628]">What's the issue?</h2>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Service Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {SERVICE_CATEGORIES.map(c => (
                    <button
                      key={c.category}
                      onClick={() => { setCategory(c.category); setIssueType(""); }}
                      className="px-3 py-2 rounded-xl text-xs font-medium border transition-all text-left"
                      style={{
                        backgroundColor: category === c.category ? "#0A1628" : "transparent",
                        color: category === c.category ? "#fff" : "#6B7280",
                        borderColor: category === c.category ? "#0A1628" : "#E5E7EB",
                      }}
                    >
                      {c.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Issue Type */}
              {selectedCat && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Issue Type</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCat.types.map(t => (
                      <button
                        key={t}
                        onClick={() => setIssueType(t)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                        style={{
                          backgroundColor: issueType === t ? "#00B5B8" : "transparent",
                          color: issueType === t ? "#fff" : "#6B7280",
                          borderColor: issueType === t ? "#00B5B8" : "#E5E7EB",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</label>
                  <button
                    onClick={generateDescription}
                    disabled={!issueType || generatingAI}
                    className="flex items-center gap-1 text-xs text-[#00B5B8] hover:text-[#0A1628] disabled:opacity-40"
                  >
                    {generatingAI ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    AI Generate
                  </button>
                </div>
                <textarea
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00B5B8]"
                  rows={4}
                  placeholder="Describe the issue in detail for the homeowner..."
                  value={issueDesc}
                  onChange={e => setIssueDesc(e.target.value)}
                />
              </div>

              {/* Estimated Value */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Estimated Value Range</label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input className="pl-8" placeholder="Low" value={estLow} onChange={e => setEstLow(e.target.value)} type="number" />
                  </div>
                  <span className="text-gray-400">—</span>
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input className="pl-8" placeholder="High" value={estHigh} onChange={e => setEstHigh(e.target.value)} type="number" />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Property Address (optional)</label>
                <div className="space-y-2">
                  <Input placeholder="Street address" value={address} onChange={e => setAddress(e.target.value)} />
                  <div className="flex gap-2">
                    <Input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                    <Input placeholder="ZIP" value={zip} onChange={e => setZip(e.target.value)} className="w-28" />
                  </div>
                </div>
              </div>

              <Button
                className="w-full text-white gap-2"
                style={{ backgroundColor: "#0A1628" }}
                disabled={!category || !issueType || !issueDesc}
                onClick={() => setStep(2)}
              >
                Next: Assign Partners <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </Button>
            </div>
          )}

          {/* ── Step 2: Partner Assignment ── */}
          {step === 2 && (
            <div className="max-w-lg space-y-5">
              <h2 className="text-base font-bold text-[#0A1628]">Assign Partners</h2>

              {/* Referring Partner */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Referring Partner (Field Partner) *</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {(partners ?? []).map((p: any) => (
                    <button
                      key={p.id}
                      onClick={() => setFieldPartnerId(p.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left"
                      style={{
                        backgroundColor: fieldPartnerId === p.id ? "#EFF6FF" : "transparent",
                        borderColor: fieldPartnerId === p.id ? "#3B82F6" : "#E5E7EB",
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {(p.businessName || p.name || "P")[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{p.businessName || p.name}</p>
                        <p className="text-xs text-gray-400 truncate">{p.serviceType} · {p.tier}</p>
                      </div>
                      {fieldPartnerId === p.id && <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Receiving Partner */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Receiving Partner (optional — can assign later)</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setReceivingPartnerId(null)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left"
                    style={{
                      backgroundColor: receivingPartnerId === null ? "#F0FDF4" : "transparent",
                      borderColor: receivingPartnerId === null ? "#22C55E" : "#E5E7EB",
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Plus className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-500">Assign Later (Auto-route)</span>
                    {receivingPartnerId === null && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 ml-auto" />}
                  </button>
                  {(partners ?? []).filter((p: any) => p.id !== fieldPartnerId).map((p: any) => (
                    <button
                      key={p.id}
                      onClick={() => setReceivingPartnerId(p.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left"
                      style={{
                        backgroundColor: receivingPartnerId === p.id ? "#F0FDF4" : "transparent",
                        borderColor: receivingPartnerId === p.id ? "#22C55E" : "#E5E7EB",
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {(p.businessName || p.name || "P")[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{p.businessName || p.name}</p>
                        <p className="text-xs text-gray-400 truncate">{p.serviceType} · {p.tier}</p>
                      </div>
                      {receivingPartnerId === p.id && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button
                  className="flex-1 text-white gap-2"
                  style={{ backgroundColor: "#0A1628" }}
                  disabled={!fieldPartnerId}
                  onClick={() => setStep(3)}
                >
                  Next: Homeowner Info
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 3: Homeowner Info ── */}
          {step === 3 && (
            <div className="max-w-lg space-y-5">
              <h2 className="text-base font-bold text-[#0A1628]">Homeowner Info</h2>
              <p className="text-sm text-gray-500">Optional — used to pre-fill the deal page and send notifications.</p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Name</label>
                  <Input placeholder="Jennifer Martinez" value={homeowner} onChange={e => setHomeowner(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Email</label>
                  <Input type="email" placeholder="jennifer@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Phone</label>
                  <Input type="tel" placeholder="(214) 555-0123" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>

              {/* Deal Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Deal Summary</p>
                {[
                  { label: "Category", value: category },
                  { label: "Issue", value: issueType },
                  { label: "Value", value: estLow && estHigh ? `$${estLow}–$${estHigh}` : "TBD" },
                  { label: "Address", value: [address, city, zip].filter(Boolean).join(", ") || "Not specified" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{label}</span>
                    <span className="text-xs font-semibold text-gray-700">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
                <Button
                  className="flex-1 text-white gap-2"
                  style={{ backgroundColor: "#0A1628" }}
                  onClick={handleCreate}
                  disabled={createDealMutation.isPending}
                >
                  {createDealMutation.isPending
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>
                    : <><Zap className="w-4 h-4" /> Create Deal Page</>
                  }
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 4: Created + Send ── */}
          {step === 4 && createdDeal && (
            <div className="max-w-lg space-y-5">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-green-800">Deal Page Created!</p>
                  <p className="text-xs text-green-600 mt-0.5">The homeowner deal page is ready to share.</p>
                </div>
              </div>

              {/* Deal URL */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Deal Page URL</label>
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                  <span className="text-xs text-gray-600 flex-1 truncate font-mono">{dealUrl}</span>
                  <button
                    onClick={() => { navigator.clipboard.writeText(dealUrl); toast.success("Link copied!"); }}
                    className="flex-shrink-0 text-[#00B5B8] hover:text-[#0A1628]"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a href={dealUrl} target="_blank" rel="noreferrer" className="flex-shrink-0 text-[#00B5B8] hover:text-[#0A1628]">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Send notifications */}
              {(email || phone) && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Send to Homeowner</p>
                  <div className="space-y-2">
                    {email && (
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Send className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-blue-800">Email</p>
                          <p className="text-xs text-blue-600 truncate">{email}</p>
                        </div>
                      </div>
                    )}
                    {phone && (
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                        <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Send className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-green-800">SMS</p>
                          <p className="text-xs text-green-600">{phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    className="w-full mt-3 text-white gap-2"
                    style={{ backgroundColor: "#00B5B8" }}
                    onClick={handleSend}
                    disabled={sending || sendDealMutation.isPending}
                  >
                    {sending
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                      : <><Send className="w-4 h-4" /> Send Deal to Homeowner</>
                    }
                  </Button>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => { setStep(1); setCreatedDeal(null); setCategory(""); setIssueType(""); setIssueDesc(""); setEstLow(""); setEstHigh(""); setAddress(""); setCity(""); setZip(""); setHomeowner(""); setEmail(""); setPhone(""); setFieldPartnerId(null); setReceivingPartnerId(null); }}
                >
                  Create Another
                </Button>
                <Button
                  className="flex-1 text-white gap-2"
                  style={{ backgroundColor: "#0A1628" }}
                  onClick={() => window.open("/admin/deals", "_self")}
                >
                  View All Deals
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
