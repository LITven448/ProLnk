import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileSignature, CheckCircle, Shield, AlertTriangle, Printer } from "lucide-react";

const AGREEMENT_VERSION = "1.0";

export default function AgentAgreement() {
  const { user } = useAuth();
  const { data: agent, isLoading, refetch } = trpc.realEstateAgents.getMyAgentProfile.useQuery(undefined, {
    enabled: !!user,
  });
  const signMutation = trpc.realEstateAgents.acceptAgentAgreement.useMutation({
    onSuccess: () => {
      toast.success("Agreement signed successfully!");
      refetch();
    },
  });

  const [fullName, setFullName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const agreementRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-96 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  const alreadySigned = !!agent?.agreementSignedAt;

  const handleSign = () => {
    if (!fullName.trim() || fullName.trim().length < 2) {
      toast.error("Please enter your full legal name.");
      return;
    }
    if (!agreed) {
      toast.error("You must agree to the terms before signing.");
      return;
    }
    signMutation.mutate({ fullName: fullName.trim(), agreementVersion: AGREEMENT_VERSION });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Referral Agreement</h1>
          <p className="text-sm text-gray-500 mt-1">ProLnk Real Estate Agent Partnership Terms</p>
        </div>
        {alreadySigned && (
          <Badge className="bg-green-100 text-green-700 gap-1">
            <CheckCircle className="w-3 h-3" /> Signed
          </Badge>
        )}
      </div>

      {alreadySigned && (
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="pt-4 pb-3 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">Agreement signed</p>
              <p className="text-xs text-green-600">
                Signed by {agent.agreementSignedBy} on {new Date(agent.agreementSignedAt).toLocaleDateString()}{" "}
                (Version {agent.agreementVersion})
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Agreement Terms — Version {AGREEMENT_VERSION}</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-1" /> Print
          </Button>
        </CardHeader>
        <CardContent>
          <div ref={agreementRef} className="prose prose-sm max-w-none text-gray-700 space-y-4 max-h-[500px] overflow-y-auto pr-2">
            <h3 className="text-base font-semibold">ProLnk Agent Referral Program Agreement</h3>
            <p>This Agent Referral Agreement ("Agreement") is entered into between ProLnk, LLC ("ProLnk", "we", "us") and the undersigned Real Estate Agent ("Agent", "you").</p>

            <h4 className="font-semibold">1. Purpose</h4>
            <p>ProLnk operates a home services marketplace connecting homeowners with vetted service professionals. This Agreement governs the terms under which Agent may refer homeowners to ProLnk's TrustyPro platform and receive referral compensation.</p>

            <h4 className="font-semibold">2. Agent Responsibilities</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Refer homeowners to ProLnk in good faith, providing accurate contact information and property details.</li>
              <li>Maintain a valid real estate license in the State of Texas throughout the term of this Agreement.</li>
              <li>Comply with all applicable laws and regulations, including but not limited to the Real Estate Settlement Procedures Act (RESPA).</li>
              <li>Represent ProLnk professionally and not make any misleading claims about our services.</li>
              <li>Disclose to homeowners that you may receive compensation for referrals.</li>
            </ul>

            <h4 className="font-semibold">3. Referral Compensation</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Per-Referral Fee:</strong> Agent receives a one-time referral fee for each qualified homeowner who signs up for TrustyPro through Agent's unique referral link. Current fee: $50 per qualified signup.</li>
              <li><strong>Perpetual Commission:</strong> Agent receives a monthly recurring commission equal to 10% of the referred homeowner's TrustyPro subscription fee, for as long as the homeowner remains an active subscriber.</li>
              <li><strong>Home Sale Bonus:</strong> When a referred homeowner sells their home and ProLnk services are used during the transaction, Agent may receive an additional bonus as determined by ProLnk.</li>
            </ul>

            <h4 className="font-semibold">4. Payment Terms</h4>
            <p>Referral fees and commissions are paid monthly, net-30, via direct deposit or check. Minimum payout threshold is $25. ProLnk reserves the right to adjust compensation rates with 30 days written notice.</p>

            <h4 className="font-semibold">5. RESPA Compliance</h4>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800">
                  <strong>Important:</strong> This program is structured to comply with RESPA Section 8. Referral fees are paid for the actual service of referring homeowners to ProLnk's home maintenance platform — not for referrals related to settlement services, mortgage lending, or title/escrow services. Agent agrees not to tie or condition any real estate settlement service on whether a homeowner signs up for ProLnk.
                </div>
              </div>
            </div>

            <h4 className="font-semibold">6. Term and Termination</h4>
            <p>This Agreement is effective upon signing and continues until terminated by either party with 30 days written notice. Upon termination, Agent's perpetual commissions will continue for referrals made during the active term, subject to the homeowner remaining an active subscriber.</p>

            <h4 className="font-semibold">7. Confidentiality</h4>
            <p>Agent agrees to keep confidential any proprietary information, customer data, or business strategies shared by ProLnk. This obligation survives termination of this Agreement.</p>

            <h4 className="font-semibold">8. Independent Contractor</h4>
            <p>Agent is an independent contractor and not an employee, partner, or joint venturer of ProLnk. Agent is responsible for their own taxes, insurance, and licensing.</p>

            <h4 className="font-semibold">9. Limitation of Liability</h4>
            <p>ProLnk's total liability under this Agreement shall not exceed the total referral fees paid to Agent in the preceding 12 months.</p>

            <h4 className="font-semibold">10. Governing Law</h4>
            <p>This Agreement is governed by the laws of the State of Texas. Any disputes shall be resolved through binding arbitration in Dallas County, Texas.</p>
          </div>
        </CardContent>
      </Card>

      {!alreadySigned && (
        <Card className="border-[#00B5B8]/20">
          <CardContent className="pt-5 space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong>Electronic Signature Disclosure:</strong> By typing your full legal name and clicking "Sign Agreement", you consent to electronically sign this Agreement. This electronic signature has the same legal effect as a handwritten signature under the ESIGN Act (15 U.S.C. § 7001).
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Legal Name</label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Jane Smith"
                className="max-w-sm"
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">
                I have read, understand, and agree to the terms of this Agent Referral Agreement. I confirm that I hold a valid real estate license and will comply with all applicable laws including RESPA.
              </span>
            </label>

            <Button
              onClick={handleSign}
              disabled={!fullName.trim() || !agreed || signMutation.isPending}
              className="bg-[#00B5B8] hover:bg-[#009a9d] gap-2"
            >
              <FileSignature className="w-4 h-4" />
              {signMutation.isPending ? "Signing..." : "Sign Agreement"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
