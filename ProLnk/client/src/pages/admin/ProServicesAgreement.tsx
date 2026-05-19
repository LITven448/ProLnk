import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Download, Search, CheckCircle, Clock, Eye, X, Copy
} from "lucide-react";
import { toast } from "sonner";

const TIER_CONFIG: Record<string, { label: string; keepRate: number; cap: string; fee: string }> = {
  scout:      { label: "Scout",      keepRate: 0.40, cap: "$500/month", fee: "$0/month" },
  pro:        { label: "Pro",        keepRate: 0.55, cap: "None",       fee: "$29/month" },
  crew:       { label: "Crew",       keepRate: 0.65, cap: "None",       fee: "$79/month" },
  company:    { label: "Company",    keepRate: 0.72, cap: "None",       fee: "$149/month" },
  enterprise: { label: "Enterprise", keepRate: 0.78, cap: "None",       fee: "$299/month" },
};

function generateAgreementText(partner: any): string {
  const tier = TIER_CONFIG[partner.tier ?? "scout"] ?? TIER_CONFIG.scout;
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const keepPct = (tier.keepRate * 100).toFixed(0);
  const platformPct = ((1 - tier.keepRate) * 100).toFixed(0);

  return `PRO SERVICES AGREEMENT

ProLnk Network -- Pro Services Agreement
Effective Date: ${today}

PARTIES

This Pro Services Agreement ("Agreement") is entered into as of ${today} between:

  ProLnk LLC, a Texas limited liability company ("ProLnk"), and
  ${partner.businessName}, operated by ${partner.contactName ?? "the undersigned"} ("Pro").

RECITALS

ProLnk operates a home service professional referral network that connects home service professionals with homeowners and other professionals who may benefit from their services. Pro desires to participate in the ProLnk network as a verified service professional.

1. DEFINITIONS

"Lead" means a referral opportunity dispatched by ProLnk to Pro through the ProLnk platform.
"Job" means a service engagement completed by Pro that originated from a Lead.
"Platform Fee" means the percentage of each Job's value retained by ProLnk as described in Section 4.
"Commission" means the portion of the Platform Fee paid to the Referring Pro as described in Section 4.
"Lead Source Tag" means the identifier "ProLnk-${partner.id}" that Pro must apply to every Job originating from a ProLnk Lead in Pro's field service management (FSM) software.
"Service Area" means ${partner.serviceArea ?? "the geographic area specified in Pro's profile"}.

2. NETWORK PARTICIPATION

2.1 Pro agrees to maintain an accurate and complete profile on the ProLnk platform, including current service area, trade categories, licensing, and insurance information.

2.2 Pro agrees to respond to dispatched Leads within 24 hours of receipt. Failure to respond within 24 hours will result in the Lead being routed to another Pro and may negatively affect Pro's Priority Pro Score.

2.3 Pro agrees to maintain all required licenses, certifications, and insurance for the services Pro provides. ProLnk reserves the right to require proof of insurance and licensing at any time.

2.4 Pro agrees to upload job photos through the ProLnk platform or connected photo documentation tool (CompanyCam, Jobber, or Housecall Pro) for every Job completed through the network.

3. LEAD SOURCE TAGGING (COMMISSION PROTECTION)

3.1 Pro agrees to tag every Job originating from a ProLnk Lead with the Lead Source Tag "ProLnk-${partner.id}" in Pro's FSM software at the time the job is created.

3.2 Failure to apply the Lead Source Tag constitutes a material breach of this Agreement. ProLnk reserves the right to audit Pro's FSM records and cross-reference with ProLnk dispatch records.

3.3 If ProLnk determines that Pro completed a Job originating from a ProLnk Lead without reporting it or applying the Lead Source Tag, Pro agrees to pay ProLnk two times (2) the Platform Fee that would have been owed on that Job ("Clawback Amount"). The Clawback Amount will be deducted from future Commission payments or invoiced directly.

4. COMMISSION STRUCTURE

4.1 Platform Fee Rate: ProLnk charges a platform fee on each Job value as follows:
    - Jobs under $2,500: 12% of Job value
    - Jobs $2,500-$9,999: 10% of Job value
    - Jobs $10,000-$49,999: 8% of Job value
    - Jobs $50,000+: 6% of Job value

4.2 Pro's Tier: ${tier.label}
    Monthly Subscription Fee: ${tier.fee}
    Commission Keep Rate: ${keepPct}% of Platform Fee
    ProLnk Net Rate: ${platformPct}% of Platform Fee
    Monthly Commission Cap: ${tier.cap}

4.3 Example: On a $1,000 Job, the Platform Fee is $120 (12%). Pro keeps ${keepPct}% = $${(120 * tier.keepRate).toFixed(2)}. ProLnk nets $${(120 * (1 - tier.keepRate)).toFixed(2)}.

4.4 Commissions are paid monthly via ACH direct deposit or Stripe Connect on or before the 15th of the following month for all Jobs closed in the prior month.

4.5 Scout tier Pros are subject to a $500/month commission cap. Commissions earned above $500 in a calendar month are forfeited. Pro may upgrade to a paid tier at any time to remove the cap.

5. EXCLUSIVITY AND NON-CIRCUMVENTION

5.1 Pro agrees not to solicit, accept, or complete work from any homeowner or client introduced through the ProLnk network outside of the ProLnk platform for a period of twelve (12) months following the initial introduction.

5.2 Pro agrees not to directly recruit other ProLnk Pros to leave the ProLnk network or join a competing referral network.

5.3 Violation of this Section constitutes a material breach and entitles ProLnk to liquidated damages equal to the estimated annual commission value of the circumvented relationship.

6. INTELLECTUAL PROPERTY -- PHOTOS AND DATA

6.1 Pro grants ProLnk a perpetual, royalty-free, non-exclusive license to use, display, analyze, and distribute job photos and property condition data submitted through the ProLnk platform for the purposes of operating the network, training AI models, generating market intelligence reports, and marketing ProLnk's services.

6.2 ProLnk will not identify Pro by name in any external data products without Pro's written consent.

6.3 Pro retains ownership of all photos and data submitted. This license survives termination of this Agreement.

7. TERM AND TERMINATION

7.1 This Agreement commences on the Effective Date and continues on a month-to-month basis unless terminated.

7.2 Either party may terminate this Agreement with 30 days written notice.

7.3 ProLnk may terminate this Agreement immediately for cause, including but not limited to: material breach, failure to maintain required licenses or insurance, fraudulent activity, or conduct that damages the ProLnk brand.

7.4 Upon termination, all pending Commissions for Jobs already closed will be paid on the next regular payout date. Commissions for Jobs not yet closed at termination are forfeited.

8. LIMITATION OF LIABILITY

ProLnk's total liability to Pro under this Agreement shall not exceed the total Commissions paid to Pro in the three (3) months preceding the claim. ProLnk is not liable for indirect, consequential, or punitive damages.

9. GOVERNING LAW

This Agreement is governed by the laws of the State of Texas. Any disputes shall be resolved in Dallas County, Texas.

10. ENTIRE AGREEMENT

This Agreement constitutes the entire agreement between the parties regarding Pro's participation in the ProLnk network and supersedes all prior discussions and agreements.

SIGNATURES

ProLnk LLC
By: ___________________________
Name: Andrew Duke
Title: Managing Member
Date: ${today}

${partner.businessName}
By: ___________________________
Name: ${partner.contactName ?? "___________________________"}
Title: ___________________________
Date: ___________________________

Pro's Business Name: ${partner.businessName}
Pro's License Number (if applicable): ___________________________
Pro's Insurance Policy Number: ___________________________
Pro's ProLnk Partner ID: ${partner.id}
Pro's Lead Source Tag: ProLnk-${partner.id}
`;
}

export default function ProServicesAgreement() {
  const [search, setSearch] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const { data: allPartners, isLoading } = trpc.admin.getAllPartners.useQuery();

  const filtered = (allPartners ?? []).filter((p: any) =>
    p.status === "approved" &&
    (p.businessName?.toLowerCase().includes(search.toLowerCase()) ||
     p.contactName?.toLowerCase().includes(search.toLowerCase()) ||
     p.contactEmail?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleGenerate = (partner: any) => {
    setSelectedPartner(partner);
    setShowPreview(true);
  };

  const handleDownload = () => {
    if (!selectedPartner) return;
    const text = generateAgreementText(selectedPartner);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ProLnk-Pro-Services-Agreement-${selectedPartner.businessName.replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Agreement downloaded -- ready for DocuSign or printing");
  };

  const handleCopy = () => {
    if (!selectedPartner) return;
    navigator.clipboard.writeText(generateAgreementText(selectedPartner));
    toast.success("Agreement text copied to clipboard");
  };

  const tierColor: Record<string, string> = {
    scout: "bg-gray-100 text-gray-700",
    pro: "bg-blue-100 text-blue-700",
    crew: "bg-purple-100 text-purple-700",
    company: "bg-amber-100 text-amber-700",
    enterprise: "bg-teal-100 text-teal-700",
  };

  return (
    <AdminLayout title="Pro Services Agreement" subtitle="Generate pre-filled agreements for each partner">

      {/* Agreement Preview Modal */}
      {showPreview && selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <h2 className="font-bold text-gray-900">Pro Services Agreement</h2>
                <p className="text-sm text-gray-500">{selectedPartner.businessName}  Partner #{selectedPartner.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
                  <Copy className="w-4 h-4" /> Copy
                </Button>
                <Button size="sm" onClick={handleDownload} className="gap-1.5 bg-teal-600 hover:bg-teal-700 text-gray-800">
                  <Download className="w-4 h-4" /> Download .txt
                </Button>
                <button onClick={() => setShowPreview(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                {generateAgreementText(selectedPartner)}
              </pre>
            </div>
            <div className="p-4 border-t bg-amber-50 rounded-b-2xl">
              <p className="text-xs text-amber-700">
                <strong>Note:</strong> This is a template agreement. Have your attorney review before use. Upload to DocuSign or HelloSign for e-signature collection.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Approved Partners", value: (allPartners ?? []).filter((p: any) => p.status === "approved").length, icon: CheckCircle, color: "text-green-600" },
            { label: "Agreements Needed", value: (allPartners ?? []).filter((p: any) => p.status === "approved").length, icon: FileText, color: "text-blue-600" },
            { label: "Pending Partners", value: (allPartners ?? []).filter((p: any) => p.status === "pending").length, icon: Clock, color: "text-amber-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border p-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-xs" style={{ color: "#7B809A" }}>{label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{isLoading ? "..." : value}</p>
            </div>
          ))}
        </div>

        {/* Info card */}
        <div className="rounded-xl border p-4 flex items-start gap-3" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <FileText className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-800">How to use this tool</p>
            <p className="text-xs mt-1" style={{ color: "#7B809A" }}>
              Select any approved partner to generate a pre-filled Pro Services Agreement with their business name, Partner ID, Lead Source Tag (ProLnk-{"{id}"}), tier details, and commission rates. Download as .txt and upload to DocuSign, HelloSign, or PandaDoc for e-signature. Each agreement is unique to the partner.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search approved partners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 border-slate-700 bg-slate-800 text-gray-800 placeholder:text-slate-500"
          />
        </div>

        {/* Partner list */}
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E9ECEF" }}>
          <div className="px-4 py-3 border-b flex items-center justify-between" style={{ backgroundColor: "#0A1628", borderColor: "#E9ECEF" }}>
            <span className="text-xs font-semibold text-gray-800">Approved Partners</span>
            <span className="text-xs" style={{ color: "#7B809A" }}>{filtered.length} partners</span>
          </div>
          {isLoading ? (
            <div className="p-8 text-center text-gray-400 text-sm">Loading partners...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No approved partners found</div>
          ) : (
            <div className="divide-y divide-slate-700">
              {filtered.map((partner: any) => (
                <div key={partner.id} className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors" style={{ backgroundColor: "#FFFFFF" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-gray-800 shrink-0"
                    style={{ backgroundColor: "#1E3A5F" }}>
                    {(partner.businessName ?? "?")[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{partner.businessName}</p>
                    <p className="text-xs truncate" style={{ color: "#7B809A" }}>
                      {partner.contactName}  Partner #{partner.id}  Tag: ProLnk-{partner.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${tierColor[partner.tier ?? "scout"] ?? "bg-gray-100 text-gray-700"}`}>
                      {partner.tier ?? "scout"}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleGenerate(partner)}
                      className="gap-1.5 text-xs border-slate-600 text-slate-300 hover:bg-white/10"
                    >
                      <Eye className="w-3.5 h-3.5" /> Generate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
