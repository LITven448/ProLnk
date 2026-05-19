import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Download, Printer, ChevronDown, ChevronRight,
  Shield, CheckCircle, AlertTriangle, DollarSign, Network,
} from "lucide-react";

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
- "Partner Priority Score" or "PPS" means ProLnk's proprietary algorithm for ranking partner routing priority.
- "Network Income" means multi-level override commissions earned on jobs and subscriptions of Partners you recruit.
- "Origination Right" means the permanent revenue share granted to founding members who help homeowners enroll in the Home Health Vault.
- "Founding Member" means a Partner who joined during the initial 500-application enrollment window.`,
  },
  {
    id: "services",
    title: "2. Services and Platform Access",
    content: `**2.1 Grant of Access.** Subject to the terms of this Agreement, ProLnk grants Partner a limited, non-exclusive, non-transferable license to access and use the Platform for the purpose of logging Jobs, receiving Opportunities, and participating in the referral network.

**2.2 Field OS.** Partner may access the Field OS mobile application to log Jobs, upload photos, receive lead notifications, and track earnings. Field OS is provided as a Progressive Web App (PWA) accessible via any modern mobile browser.

**2.3 Account Requirements.** Partner must maintain accurate profile information including: valid contractor license number(s), certificate of insurance (COI) with minimum $1M general liability, service area zip codes, and current contact information. Partner must update this information within 7 days of any change.

**2.4 Founding Member Status.** ProLnk reserves a limited cohort of 500 Founding Member Partner slots. Founding Members are accepted on a first-come, first-served basis during the initial enrollment period. Founding Member benefits are described in Section 3 and are locked for the Partner's lifetime on the Platform.

**2.5 Acceptable Use.** Partner agrees not to: (a) share login credentials with unauthorized persons; (b) use the Platform to solicit homeowners outside the Platform; (c) circumvent the commission system by accepting referrals and completing jobs outside the Platform; (d) upload fraudulent, staged, or misleading photos; or (e) engage in any conduct that damages ProLnk's reputation or the partner network.`,
  },
  {
    id: "commissions",
    title: "3. Commission Structure and Network Income",
    content: `**3.1 Founding Member Commission Rate.** All Founding Members earn a 72% keep rate on each matched job's platform fee — meaning ProLnk retains 28% and Partner retains 72% of all fees collected on jobs attributed to the Partner. This rate is locked for life and is not subject to the standard tier schedule.

**3.2 Platform Subscription.** All Partners (Founding and Standard) pay $149/month. This rate is locked for Founding Members and will not increase regardless of future price changes to the standard subscription tier.

**3.3 Network Income — Stream 1 (Job Override).** When a Partner you directly recruited completes a matched job, you earn an override commission as follows:
- Level 1 (direct recruits): 7% of job platform fee
- Level 2 (recruits' recruits): 4% of job platform fee
- Level 3: 2% of job platform fee
- Level 4: 1% of job platform fee

**3.4 Network Income — Stream 2 (Subscription Override).** When a Partner you directly recruited pays their monthly subscription, you earn a recurring commission:
- Level 1 (direct recruits): 12% of their monthly subscription
- Level 2: 6% of their monthly subscription
- Level 3: 3% of their monthly subscription
- Level 4: 1.5% of their monthly subscription

**3.5 Network Income — Stream 3 (Origination Rights).** For each homeowner you help enroll in the ProLnk Home Health Vault, you earn 1.5% of all platform fees generated by that home — permanently. This right transfers to your estate and is not revocable by ProLnk except for fraud or Agreement violation.

**3.6 Job Verification.** Commissions are earned only on Referred Jobs that are: (a) completed and invoiced; (b) reported to ProLnk via the Platform, FSM integration, or manual confirmation within 30 days of the Deal acceptance; and (c) paid by the homeowner.

**3.7 Payment Schedule.** Commissions are processed weekly via Stripe Connect to Partner's linked bank account. Minimum payout threshold is $25.00. Commissions below the threshold roll over to the next payment cycle.

**3.8 Commission Disputes.** Partner may dispute a commission calculation within 30 days of the payment date by submitting a written dispute through the Platform. ProLnk will investigate and respond within 10 business days.

**3.9 Clawback.** If a Referred Job is cancelled, reversed, or disputed by the homeowner after commission payment, ProLnk reserves the right to deduct the corresponding commission from future payments. ProLnk will provide written notice before any clawback.

**3.10 Tax Reporting.** Partner is responsible for all tax obligations arising from commission income. ProLnk will issue IRS Form 1099-NEC for partners earning $600 or more in a calendar year. Partner must provide a valid W-9 before first commission payment.`,
  },
  {
    id: "network_rules",
    title: "4. Network Income Rules and Restrictions",
    content: `**4.1 Eligibility.** Network Income commissions are available to all Founding Member Partners. Standard Partners at ProLnk's discretion may opt into Network Income by completing a separate Network Participation Addendum.

**4.2 Legitimate Recruitment Only.** Partner agrees to recruit only genuine home service professionals who meet ProLnk's licensing and insurance requirements. Recruiting fictitious, unqualified, or nominee accounts is a violation of this Agreement and grounds for immediate termination and forfeiture of all earned but unpaid Network Income.

**4.3 Tier Structure.** The 500 Founding Member spots are allocated in cohorts: Charter (first 25), Founding (next 100), Level 3 (next 400), Level 4 (next 1,600). All cohorts share the same $149/month rate and 72% keep rate. Cohort assignment determines the order of Network Income distribution when cascading through levels.

**4.4 No Pyramid or Ponzi Structure.** ProLnk's Network Income system is based exclusively on commissions derived from real job completions and actual paid subscriptions. No earnings are derived from recruitment fees alone. No Partner is required to recruit other Partners as a condition of earning commission on their own job completions.

**4.5 Earnings Disclosure.** ProLnk makes no guarantee of earnings from Network Income. Actual results depend on the volume of jobs completed by recruited Partners and the size of the Partner's network. ProLnk will publish an annual income disclosure statement.

**4.6 Network Income Cap.** No single Partner's Network Income shall exceed 30% of ProLnk's total platform fees in any calendar quarter. Amounts above this threshold will be held in reserve and paid in the following quarter. This cap exists to maintain platform financial stability.`,
  },
  {
    id: "conduct",
    title: "5. Partner Conduct and Compliance",
    content: `**5.1 Professional Standards.** Partner agrees to maintain the standards required for participation in the ProLnk network, including: (a) valid contractor license(s) for all services offered; (b) general liability insurance of at least $1M per occurrence; (c) workers' compensation insurance as required by applicable state law; (d) professional conduct in all homeowner interactions; and (e) timely response to Deal notifications (within 24 hours).

**5.2 Strike System.** ProLnk operates a three-strike compliance system:
- **Strike 1 (Warning):** Written notice via Platform notification. No service restriction.
- **Strike 2 (Final Warning):** Written notice. Partner placed on probation for 30 days. Lead routing priority reduced by 50%.
- **Strike 3 (Suspension):** Account suspended pending review. Partner may appeal within 10 business days.

**5.3 Strike Triggers.** Strikes may be issued for: (a) no-show to a scheduled appointment without 24-hour notice; (b) homeowner complaint substantiated by ProLnk investigation; (c) failure to maintain required insurance or licensing; (d) commission circumvention; (e) fraudulent job logging; or (f) violation of any provision of this Agreement.

**5.4 Commission Dispute Resolution.** Partner may submit a written commission dispute within 30 days of payment via the Platform's Commission Dispute form. ProLnk's Finance team will review the dispute and respond within 10 business days. If the dispute is unresolved, it escalates to binding arbitration under Section 7.5. During dispute review, the disputed amount is held in escrow and not subject to clawback.

**5.5 Reinstatement.** Suspended partners may apply for reinstatement after 30 days. Reinstatement requires: (a) written explanation of the violation; (b) corrective action plan; and (c) ProLnk approval.

**5.6 Termination for Cause.** ProLnk may terminate this Agreement immediately, without notice, for: (a) fraud or misrepresentation; (b) criminal conduct; (c) three strikes within any 12-month period; or (d) any conduct that poses a risk to homeowner safety.`,
  },
  {
    id: "ip",
    title: "6. Intellectual Property",
    content: `**6.1 ProLnk IP.** Partner acknowledges that the Platform, AI detection technology, Partner Priority Score algorithm, and all associated software, data, and content are the exclusive property of ProLnk. Partner receives no ownership interest in any ProLnk IP.

**6.2 Photo License.** By uploading photos to the Platform, Partner grants ProLnk a perpetual, worldwide, royalty-free license to use, analyze, and store those photos for the purpose of: (a) AI opportunity detection; (b) deal generation; (c) platform improvement; and (d) anonymized training of ProLnk's machine learning models.

**6.3 Partner Data.** ProLnk may use Partner's performance data (job count, conversion rate, ratings, earnings) in aggregate, anonymized form for platform analytics and marketing. ProLnk will not share Partner's personally identifiable information with third parties except as required by law or as necessary to process payments.

**6.4 Co-Branded Materials.** ProLnk grants Partner a limited license to use ProLnk's trademarks and co-branded marketing materials provided through the Platform's Marketing Kit. Partner may not modify these materials or use ProLnk's trademarks in any other context without written permission.`,
  },
  {
    id: "liability",
    title: "7. Limitation of Liability and Indemnification",
    content: `**7.1 Disclaimer.** THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. PROLNK DOES NOT WARRANT THAT THE AI DETECTION SYSTEM WILL IDENTIFY ALL SERVICE OPPORTUNITIES, THAT DEALS WILL RESULT IN CLOSED JOBS, OR THAT THE PLATFORM WILL BE UNINTERRUPTED OR ERROR-FREE.

**7.2 Limitation of Liability.** IN NO EVENT SHALL PROLNK BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM PARTNER'S USE OF THE PLATFORM. PROLNK'S TOTAL LIABILITY TO PARTNER FOR ANY CLAIM SHALL NOT EXCEED THE COMMISSIONS PAID TO PARTNER IN THE 90 DAYS PRECEDING THE CLAIM.

**7.3 Partner Indemnification.** Partner agrees to indemnify and hold harmless ProLnk, its officers, directors, employees, and agents from any claims, damages, or expenses (including reasonable attorneys' fees) arising from: (a) Partner's performance of services; (b) Partner's violation of this Agreement; (c) Partner's negligence or misconduct; or (d) any claim by a homeowner related to services performed by Partner.

**7.4 Insurance.** Partner's obligation to maintain insurance is a material term of this Agreement. Failure to maintain required insurance is grounds for immediate suspension.`,
  },
  {
    id: "term",
    title: "8. Term, Termination, and Dispute Resolution",
    content: `**8.1 Term.** This Agreement begins on the Effective Date and continues until terminated by either party.

**8.2 Termination by Partner.** Partner may terminate this Agreement at any time by providing 30 days' written notice via the Platform. Partner remains responsible for all obligations arising before the termination date, including any pending commission clawbacks.

**8.3 Termination by ProLnk.** ProLnk may terminate this Agreement: (a) for cause, immediately and without notice; (b) without cause, with 30 days' written notice; or (c) upon discontinuation of the Platform, with 60 days' written notice.

**8.4 Effect of Termination.** Upon termination: (a) Partner's access to the Platform is revoked; (b) pending commissions for verified Referred Jobs completed before termination will be paid on the next regular payment cycle; (c) Origination Rights earned before termination survive and continue to pay out; (d) Network Income stops accruing as of the termination date; (e) Partner's profile and reviews will be removed from the public directory within 30 days.

**8.5 Dispute Resolution.** Any dispute arising from this Agreement shall be resolved by binding arbitration under the American Arbitration Association Commercial Arbitration Rules. Arbitration shall be conducted in Dallas, Texas. The prevailing party shall be entitled to recover reasonable attorneys' fees.

**8.6 Governing Law.** This Agreement is governed by the laws of the State of Texas, without regard to conflict of law principles.

**8.7 Entire Agreement.** This Agreement constitutes the entire agreement between the parties regarding the subject matter hereof and supersedes all prior agreements, representations, and understandings.`,
  },
];

export default function PartnerAgreement() {
  const [expanded, setExpanded] = useState<string>("parties");
  const [accepted, setAccepted] = useState(false);
  const [signed, setSigned] = useState(false);

  const handleAccept = () => {
    if (!accepted) return;
    setSigned(true);
  };

  return (
    <>
      <Helmet>
        <title>Partner Services Agreement | ProLnk</title>
        <meta name="description" content="ProLnk Partner Services Agreement — commission structure, network income rules, and partnership terms." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-teal-400" />
              <div>
                <h1 className="font-bold text-white text-lg">ProLnk Partner Services Agreement</h1>
                <p className="text-slate-400 text-xs">Version 3.0 — Effective May 2026</p>
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
                onClick={() => alert("PDF download coming soon.")}
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
                    This agreement governs your participation in the ProLnk partner network, including commission
                    rates, network income rules, origination rights, and conduct requirements. Please read all
                    sections before accepting.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Legally Binding
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Texas Law</Badge>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">AAA Arbitration</Badge>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Version 3.0</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Quick-Reference */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white">Founding Member Commission Quick Reference</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/60 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Keep Rate</div>
                  <div className="text-2xl font-bold text-teal-400">72%</div>
                  <div className="text-xs text-slate-400 mt-1">of all job fees, locked for life</div>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Subscription</div>
                  <div className="text-2xl font-bold text-white">$149<span className="text-sm font-normal text-slate-400">/mo</span></div>
                  <div className="text-xs text-slate-400 mt-1">price locked, never increases</div>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Network Levels</div>
                  <div className="text-2xl font-bold text-white">4</div>
                  <div className="text-xs text-slate-400 mt-1">levels deep, 7/4/2/1% job overrides</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network Income Quick-Reference */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Network className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white">Network Income Override Rates</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Job Overrides</div>
                  <div className="space-y-2">
                    {[
                      { level: "Level 1 (direct recruits)", rate: "7%" },
                      { level: "Level 2", rate: "4%" },
                      { level: "Level 3", rate: "2%" },
                      { level: "Level 4", rate: "1%" },
                    ].map((r) => (
                      <div key={r.level} className="flex items-center justify-between bg-slate-900/60 rounded px-3 py-2">
                        <span className="text-sm text-slate-300">{r.level}</span>
                        <span className="text-sm font-bold text-teal-400">{r.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Subscription Overrides</div>
                  <div className="space-y-2">
                    {[
                      { level: "Level 1 (direct recruits)", rate: "12%" },
                      { level: "Level 2", rate: "6%" },
                      { level: "Level 3", rate: "3%" },
                      { level: "Level 4", rate: "1.5%" },
                    ].map((r) => (
                      <div key={r.level} className="flex items-center justify-between bg-slate-900/60 rounded px-3 py-2">
                        <span className="text-sm text-slate-300">{r.level}</span>
                        <span className="text-sm font-bold text-teal-400">{r.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between bg-teal-900/30 border border-teal-700/30 rounded px-3 py-2">
                <span className="text-sm text-teal-200">Origination Rights (Home Health Vault)</span>
                <span className="text-sm font-bold text-teal-400">1.5% permanent</span>
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

          {/* Legal Disclaimers */}
          <Card className="bg-amber-900/20 border-amber-700/40 mt-6">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-200 leading-relaxed space-y-2">
                  <p><strong className="text-amber-100">Income Disclaimer:</strong> ProLnk makes no guarantee of earnings. Network Income depends on the job volume and subscriptions of Partners you recruit. Past performance of other Partners is not indicative of your results.</p>
                  <p><strong className="text-amber-100">Not a Franchise:</strong> This Agreement does not create a franchise, employment, or agency relationship. Partner is an independent contractor solely responsible for their own taxes, insurance, and licensing.</p>
                  <p><strong className="text-amber-100">Patent Pending:</strong> ProLnk's Network Income System and Lead Matching Algorithm are protected by pending U.S. patent application. Reverse engineering or imitation is prohibited.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acceptance Block */}
          {!signed ? (
            <Card className="bg-slate-800/50 border-slate-700 mt-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-white mb-4">Electronic Acceptance</h3>
                <p className="text-slate-300 text-sm mb-5">
                  By checking the box below and clicking "I Accept This Agreement," you acknowledge that you have read,
                  understood, and agree to be bound by this Partner Services Agreement, including all commission terms,
                  network income rules, and conduct requirements. This electronic acceptance constitutes a legally binding
                  signature under the Electronic Signatures in Global and National Commerce Act (E-SIGN Act).
                </p>

                <label className="flex items-start gap-3 cursor-pointer group mb-5">
                  <div
                    onClick={() => setAccepted((v) => !v)}
                    className={`w-5 h-5 flex-shrink-0 rounded border-2 mt-0.5 flex items-center justify-center transition-all ${
                      accepted ? "bg-teal-500 border-teal-500" : "border-slate-500 group-hover:border-teal-400"
                    }`}
                  >
                    {accepted && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-slate-300">
                    I have read and agree to the ProLnk Partner Services Agreement, including the commission structure,
                    network income rules, origination rights, conduct standards, and dispute resolution terms.
                  </span>
                </label>

                <div className="grid grid-cols-2 gap-6 mb-5">
                  <div className="border border-slate-600 rounded p-4">
                    <div className="text-slate-500 text-xs mb-2">ProLnk Inc.</div>
                    <div className="text-white font-semibold">Andrew Frakes</div>
                    <div className="text-slate-400 text-sm">Founder & CEO</div>
                    <div className="text-slate-500 text-xs mt-2">Dallas, Texas</div>
                  </div>
                  <div className="border border-slate-600 rounded p-4">
                    <div className="text-slate-500 text-xs mb-2">Partner</div>
                    <div className="text-slate-400 text-sm italic">Your electronic signature will be recorded upon acceptance.</div>
                    <div className="text-slate-500 text-xs mt-2">Date and IP recorded at submission</div>
                  </div>
                </div>

                <Button
                  onClick={handleAccept}
                  disabled={!accepted}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  I Accept This Agreement
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-teal-900/30 border-teal-700/50 mt-6">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Agreement Accepted</h3>
                <p className="text-slate-300 text-sm">
                  Your electronic signature has been recorded. A confirmation copy will be sent to your registered email address.
                </p>
              </CardContent>
            </Card>
          )}

          <p className="text-slate-600 text-xs text-center mt-6">
            © 2026 ProLnk Inc. | Dallas, TX | legal@prolnk.io
          </p>
        </div>
      </div>
    </>
  );
}
