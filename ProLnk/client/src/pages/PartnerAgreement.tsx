import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Printer, ChevronDown, ChevronRight, Shield, CheckCircle } from "lucide-react";

const SECTIONS = [
  {
    id: "parties",
    title: "1. Parties and Definitions",
    content: `This Partner Services Agreement ("Agreement") is entered into as of the date of electronic acceptance ("Effective Date") between:

**ProLnk Inc.**, a Texas corporation ("ProLnk," "Company," "we," or "us"), and

**Partner** (as identified during registration), a licensed home service professional or business entity ("Partner," "you," or "your").

**Definitions:**
- "Platform" means the ProLnk web application, Field OS mobile app, and all associated APIs and services.
- "Job" means a completed home service visit logged by Partner through the Platform.
- "Opportunity" means an AI-detected adjacent service need identified from Job photos.
- "Deal" means a structured referral sent to a homeowner based on an Opportunity.
- "Commission" means the fee paid to Partner for a successfully closed referred Job.
- "Referred Job" means a Job completed by a third-party partner as a result of a Deal originated by Partner.
- "Partner Priority Score" or "PPS" means ProLnk's proprietary algorithm for ranking partner routing priority.`,
  },
  {
    id: "services",
    title: "2. Services and Platform Access",
    content: `**2.1 Grant of Access.** Subject to the terms of this Agreement, ProLnk grants Partner a limited, non-exclusive, non-transferable license to access and use the Platform for the purpose of logging Jobs, receiving Opportunities, and participating in the referral network.

**2.2 Field OS.** Partner may access the Field OS mobile application to log Jobs, upload photos, receive lead notifications, and track earnings. Field OS is provided as a Progressive Web App (PWA) accessible via any modern mobile browser.

**2.3 Account Requirements.** Partner must maintain accurate profile information including: valid contractor license number(s), certificate of insurance (COI) with minimum $1M general liability, service area zip codes, and current contact information. Partner must update this information within 7 days of any change.

**2.4 Tier System.** ProLnk offers four service tiers: Scout (free), Pro ($49/month), Elite ($99/month), and Enterprise ($299/month). Features available at each tier are described in the current pricing schedule, which ProLnk may update with 30 days' notice.

**2.5 Acceptable Use.** Partner agrees not to: (a) share login credentials with unauthorized persons; (b) use the Platform to solicit homeowners outside the Platform; (c) circumvent the commission system by accepting referrals and completing jobs outside the Platform; (d) upload fraudulent, staged, or misleading photos; or (e) engage in any conduct that damages ProLnk's reputation or the partner network.`,
  },
  {
    id: "commissions",
    title: "3. Commission Structure and Payments",
    content: `**3.1 Referral Commission.** When Partner logs a Job and ProLnk generates a Deal from an AI-detected Opportunity, and that Deal results in a Referred Job completed by another partner, Partner earns a referral commission of five percent (5%) of the Referred Job's gross invoice value, as reported to ProLnk.

**3.2 ProLnk Fee.** ProLnk earns a platform fee of ten to fifteen percent (10-15%) on each Referred Job, depending on Partner's tier and the service category. The net spread between ProLnk's fee and Partner's commission is ProLnk's margin.

**3.3 Job Verification.** Commissions are earned only on Referred Jobs that are: (a) completed and invoiced; (b) reported to ProLnk via the Platform, FSM integration, or manual confirmation within 30 days of the Deal acceptance; and (c) paid by the homeowner.

**3.4 Payment Schedule.** Commissions are processed weekly via Stripe Connect to Partner's linked bank account. Minimum payout threshold is $25.00. Commissions below the threshold roll over to the next payment cycle.

**3.5 Commission Disputes.** Partner may dispute a commission calculation within 30 days of the payment date by submitting a written dispute through the Platform. ProLnk will investigate and respond within 10 business days.

**3.6 Clawback.** If a Referred Job is cancelled, reversed, or disputed by the homeowner after commission payment, ProLnk reserves the right to deduct the corresponding commission from future payments. ProLnk will provide written notice before any clawback.

**3.7 Tax Reporting.** Partner is responsible for all tax obligations arising from commission income. ProLnk will issue IRS Form 1099-NEC for partners earning $600 or more in a calendar year. Partner must provide a valid W-9 before first commission payment.`,
  },
  {
    id: "conduct",
    title: "4. Partner Conduct and Compliance",
    content: `**4.1 Professional Standards.** Partner agrees to maintain the standards required for participation in the ProLnk network, including: (a) valid contractor license(s) for all services offered; (b) general liability insurance of at least $1M per occurrence; (c) workers' compensation insurance as required by Texas law; (d) professional conduct in all homeowner interactions; and (e) timely response to Deal notifications (within 24 hours).

**4.2 Strike System.** ProLnk operates a three-strike compliance system:
- **Strike 1 (Warning):** Written notice via Platform notification. No service restriction.
- **Strike 2 (Final Warning):** Written notice. Partner placed on probation for 30 days. Lead routing priority reduced by 50%.
- **Strike 3 (Suspension):** Account suspended pending review. Partner may appeal within 10 business days.

**4.3 Strike Triggers.** Strikes may be issued for: (a) no-show to a scheduled appointment without 24-hour notice; (b) homeowner complaint substantiated by ProLnk investigation; (c) failure to maintain required insurance or licensing; (d) commission circumvention; (e) fraudulent job logging; or (f) violation of any provision of this Agreement.

**4.4 Reinstatement.** Suspended partners may apply for reinstatement after 30 days. Reinstatement requires: (a) written explanation of the violation; (b) corrective action plan; and (c) ProLnk approval. ProLnk may require additional conditions for reinstatement at its discretion.

**4.5 Termination for Cause.** ProLnk may terminate this Agreement immediately, without notice, for: (a) fraud or misrepresentation; (b) criminal conduct; (c) three strikes within any 12-month period; or (d) any conduct that poses a risk to homeowner safety.`,
  },
  {
    id: "ip",
    title: "5. Intellectual Property",
    content: `**5.1 ProLnk IP.** Partner acknowledges that the Platform, AI detection technology, Partner Priority Score algorithm, and all associated software, data, and content are the exclusive property of ProLnk. Partner receives no ownership interest in any ProLnk IP.

**5.2 Photo License.** By uploading photos to the Platform, Partner grants ProLnk a perpetual, worldwide, royalty-free license to use, analyze, and store those photos for the purpose of: (a) AI opportunity detection; (b) deal generation; (c) platform improvement; and (d) anonymized training of ProLnk's machine learning models.

**5.3 Partner Data.** ProLnk may use Partner's performance data (job count, conversion rate, ratings, earnings) in aggregate, anonymized form for platform analytics and marketing. ProLnk will not share Partner's personally identifiable information with third parties except as required by law or as necessary to process payments.

**5.4 Co-Branded Materials.** ProLnk grants Partner a limited license to use ProLnk's trademarks and co-branded marketing materials provided through the Platform's Marketing Kit. Partner may not modify these materials or use ProLnk's trademarks in any other context without written permission.`,
  },
  {
    id: "liability",
    title: "6. Limitation of Liability and Indemnification",
    content: `**6.1 Disclaimer.** THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. PROLNK DOES NOT WARRANT THAT THE AI DETECTION SYSTEM WILL IDENTIFY ALL SERVICE OPPORTUNITIES, THAT DEALS WILL RESULT IN CLOSED JOBS, OR THAT THE PLATFORM WILL BE UNINTERRUPTED OR ERROR-FREE.

**6.2 Limitation of Liability.** IN NO EVENT SHALL PROLNK BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM PARTNER'S USE OF THE PLATFORM. PROLNK'S TOTAL LIABILITY TO PARTNER FOR ANY CLAIM SHALL NOT EXCEED THE COMMISSIONS PAID TO PARTNER IN THE 90 DAYS PRECEDING THE CLAIM.

**6.3 Partner Indemnification.** Partner agrees to indemnify and hold harmless ProLnk, its officers, directors, employees, and agents from any claims, damages, or expenses (including reasonable attorneys' fees) arising from: (a) Partner's performance of services; (b) Partner's violation of this Agreement; (c) Partner's negligence or misconduct; or (d) any claim by a homeowner related to services performed by Partner.

**6.4 Insurance.** Partner's obligation to maintain insurance is a material term of this Agreement. Failure to maintain required insurance is grounds for immediate suspension.`,
  },
  {
    id: "term",
    title: "7. Term, Termination, and Dispute Resolution",
    content: `**7.1 Term.** This Agreement begins on the Effective Date and continues until terminated by either party.

**7.2 Termination by Partner.** Partner may terminate this Agreement at any time by providing 30 days' written notice via the Platform. Partner remains responsible for all obligations arising before the termination date, including any pending commission clawbacks.

**7.3 Termination by ProLnk.** ProLnk may terminate this Agreement: (a) for cause, immediately and without notice; (b) without cause, with 30 days' written notice; or (c) upon discontinuation of the Platform, with 60 days' written notice.

**7.4 Effect of Termination.** Upon termination: (a) Partner's access to the Platform is revoked; (b) pending commissions for verified Referred Jobs completed before termination will be paid on the next regular payment cycle; (c) Partner's profile and reviews will be removed from the public directory within 30 days.

**7.5 Dispute Resolution.** Any dispute arising from this Agreement shall be resolved by binding arbitration under the American Arbitration Association Commercial Arbitration Rules. Arbitration shall be conducted in Dallas, Texas. The prevailing party shall be entitled to recover reasonable attorneys' fees.

**7.6 Governing Law.** This Agreement is governed by the laws of the State of Texas, without regard to conflict of law principles.

**7.7 Entire Agreement.** This Agreement constitutes the entire agreement between the parties regarding the subject matter hereof and supersedes all prior agreements, representations, and understandings.`,
  },
];

export default function PartnerAgreement() {
  const [expanded, setExpanded] = useState<string>("parties");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-teal-400" />
            <div>
              <h1 className="font-bold text-white text-lg">ProLnk Partner Services Agreement</h1>
              <p className="text-slate-400 text-xs">Version 2.1 — Effective March 2026</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="gap-2 border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button
              size="sm"
              onClick={() => window.print()}
              className="gap-2 bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Preamble */}
        <Card className="bg-slate-800/50 border-slate-700 mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <FileText className="w-8 h-8 text-teal-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold text-white mb-2">ProLnk Partner Services Agreement</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  This agreement governs your participation in the ProLnk partner network. By creating an account
                  and using the Platform, you agree to be bound by these terms. Please read this agreement carefully
                  before proceeding.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Legally Binding
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Texas Law</Badge>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">AAA Arbitration</Badge>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Version 2.1</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-3">
          {SECTIONS.map((section) => {
            const isOpen = expanded === section.id;
            return (
              <Card key={section.id} className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/30 transition-colors"
                  onClick={() => setExpanded(isOpen ? "" : section.id)}
                >
                  <span className="font-semibold text-white">{section.title}</span>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="border-t border-slate-700 pt-4">
                      {section.content.split("\n\n").map((para, i) => (
                        <p
                          key={i}
                          className="text-slate-300 text-sm leading-relaxed mb-3"
                          dangerouslySetInnerHTML={{
                            __html: para
                              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                              .replace(/\n/g, "<br />"),
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Signature Block */}
        <Card className="bg-slate-800/50 border-slate-700 mt-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-white mb-4">Electronic Acceptance</h3>
            <p className="text-slate-300 text-sm mb-4">
              By creating a ProLnk account and clicking "I Agree" during registration, Partner acknowledges that
              they have read, understood, and agree to be bound by this Partner Services Agreement. This electronic
              acceptance constitutes a legally binding signature under the Electronic Signatures in Global and
              National Commerce Act (E-SIGN Act).
            </p>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="border border-slate-600 rounded p-4">
                <div className="text-slate-500 text-xs mb-2">ProLnk Inc.</div>
                <div className="text-white font-semibold">Andrew Duke</div>
                <div className="text-slate-400 text-sm">Founder & CEO</div>
                <div className="text-slate-500 text-xs mt-2">Dallas, Texas</div>
              </div>
              <div className="border border-slate-600 rounded p-4">
                <div className="text-slate-500 text-xs mb-2">Partner</div>
                <div className="text-slate-400 text-sm italic">Accepted electronically upon account creation</div>
                <div className="text-slate-500 text-xs mt-2">Date recorded at registration</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-slate-600 text-xs text-center mt-6">
          © 2026 ProLnk Inc. | Dallas, TX | legal@prolnk.com
        </p>
      </div>
    </div>
  );
}
