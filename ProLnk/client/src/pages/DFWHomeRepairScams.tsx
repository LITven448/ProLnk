import { useState } from 'react';
import { Link } from "wouter";
import { AlertTriangle, Shield, Phone, ChevronDown, ChevronUp, CheckCircle, XCircle, ExternalLink } from "lucide-react";

const SCAMS = [
  {
    id: 1,
    title: "Storm Chaser Roofers",
    tag: "Most Common After Hail",
    tagColor: "#EF4444″,
    howItWorks: "After a major hail or wind event, out-of-state contractors flood DFW neighborhoods going door-to-door. They offer to inspect your roof for free, then claim significant damage that often doesn't exist — or barely exists — to justify a full replacement claim to your insurer.",
    redFlags: [
      "Knocks on your door unsolicited, especially after a storm",
      "Out-of-state license plates on their trucks",
      "Pressures you to sign a work authorization before insurance adjuster visits",
      "Asks for your insurance policy number upfront",
      "No local address, only a cell phone number",
    ],
    protection: [
      "Always get a second opinion from a licensed local roofer before filing a claim",
      "Verify TDLR contractor license at tdlr.texas.gov",
      "Never sign a direction-to-pay or assignment of benefits form",
      "Ask your insurance company to send their own adjuster first",
    ],
  },
  {
    id: 2,
    title: "Deductible Waiver Offers",
    tag: "Illegal in Texas",
    tagColor: "#7C3AED",
    howItWorks: "A contractor offers to waive your insurance deductible, claiming 'we absorb the cost' or 'your insurance pays everything.' This is insurance fraud under Texas SB 2268 (effective Sept 1, 2019). The contractor inflates the claim to cover what you should owe — exposing you to policy cancellation and criminal charges.",
    redFlags: [
      '"We’ll waive your deductible — you pay nothing out of pocket"',
      '"We handle everything, just sign here"',
      "Offers that seem too good to be true on full roof replacements",
      "Contractor insists on meeting with your adjuster in private",
    ],
    protection: [
      "Any deductible waiver offer is illegal — report it immediately",
      "You are required to pay your deductible under Texas law",
      "Contact Texas Department of Insurance if offered: 800-252-3439″,
      "Your insurer can cancel your policy for participating in fraud",
    ],
  },
  {
    id: 3,
    title: '"I Have Leftover Materials" Driveway Scam',
    tag: "Targets Elderly Homeowners",
    tagColor: "#D97706″,
    howItWorks: "A truck pulls up claiming they just finished a job nearby and have extra asphalt, sealant, or paint. They offer a deep discount to use it on your driveway, walkway, or home exterior. The 'materials' are often diluted or completely wrong for the application. Work quality is terrible, and the crew disappears before you can complain.",
    redFlags: [
      "Unsolicited offer from someone who just 'happened to be in the area'",
      "Cash only, no receipts",
      "No written contract or estimate",
      "Rushes you to decide immediately",
      "No company name, no vehicle markings",
    ],
    protection: [
      "Never hire anyone who approaches you unsolicited",
      "Always get 3 written estimates for any paving or exterior work",
      "Legitimate contractors don't have 'leftover materials' to resell",
      "Ask for proof of insurance and Texas contractor license before any work",
    ],
  },
  {
    id: 4,
    title: "Utility Company Imposters",
    tag: "Identity & Access Fraud",
    tagColor: "#DC2626″,
    howItWorks: "Someone in a vest or uniform knocks claiming to be from Oncor, Atmos Energy, or the city water department, saying they need to 'check your meter' or 'inspect your gas lines.' Once inside, they case the home for valuables, steal personal documents, or pressure you into signing up for expensive 'protection plans.'",
    redFlags: [
      "No scheduled appointment — utility companies send notices",
      "Vague badge or ID that doesn't match the utility company's logo",
      "Wants to enter your home without a clear utility reason",
      "Tries to sell you a service plan while 'inspecting'",
      "Arrived in an unmarked or personal vehicle",
    ],
    protection: [
      "Call the utility company directly (number from their website, not from them) to verify",
      "Legitimate utility workers never sell plans during routine visits",
      "Ask for photo ID and employee number — they are required to provide it",
      "Oncor: 888-313-4747 | Atmos: 888-286-6700″,
    ],
  },
  {
    id: 5,
    title: "Foundation Emergency Scam",
    tag: "High-Dollar Target",
    tagColor: "#7C3AED",
    howItWorks: "A contractor — often posing as a 'structural inspector' — knocks and offers a free foundation assessment. They show you normal settling cracks (common in DFW clay soil) and claim they're catastrophic, requiring $15,000–80,000 in pier installation. DFW's expansive black clay soil means every home has some movement — scammers exploit this.",
    redFlags: [
      "Diagnoses major structural failure from a 5-minute visual inspection",
      "Pressures you to sign a contract before getting other opinions",
      "Quote seems dramatically out of range ($20K+ for a modest home)",
      "Refuses to provide a written engineering report",
      "No licensed structural engineer involved in assessment",
    ],
    protection: [
      "Any foundation repair over $10K should have a licensed structural engineer's report",
      "Get 3 competing bids — prices should be within 20–30% of each other",
      "Texas requires foundation contractors to be licensed — verify at tdlr.texas.gov",
      "DFW soil movement is normal — get an unbiased second opinion",
    ],
  },
  {
    id: 6,
    title: "Fake Energy Audit Scam",
    tag: "Utility Bill Bait",
    tagColor: "#0891B2″,
    howItWorks: "Someone offers a 'free energy audit' or government-sponsored efficiency inspection. After a quick walkthrough, they identify dozens of 'problems' — inadequate insulation, air leaks, inefficient equipment — and pressure you to purchase upgrades costing thousands. The work is often unnecessary, substandard, or never completed.",
    redFlags: [
      '"Government rebate" or "utility company partner" claims without verification',
      "Audit is free but everything they recommend is immediately for sale",
      "Before-and-after claims with no measurement data",
      "Requires payment upfront for all materials",
      "No Energy Star certification or BPI credentials",
    ],
    protection: [
      "Real utility efficiency programs are run through Oncor, Atmos, or directly via energystar.gov",
      "Ask for BPI (Building Performance Institute) or HERS rater certification",
      "Legitimate audits use blower door tests and thermal cameras — not eyeballing",
      "Verify rebate programs at dsireusa.org or your utility's website",
    ],
  },
  {
    id: 7,
    title: "Fake Google Reviews & Unlicensed Work",
    tag: "Digital Age Scam",
    tagColor: "#059669″,
    howItWorks: "Unlicensed contractors buy fake 5-star Google reviews and create professional-looking websites. They bid low, collect a deposit, do poor or incomplete work, then become unreachable. Some operate multiple business names across DFW — when reviews catch up with one name, they start a new one.",
    redFlags: [
      "All Google reviews posted within a short window (1–2 months)",
      "Reviews are generic and don't describe specific work",
      "Can't provide a Texas contractor license number when asked",
      "Bid is 40–60% below all other quotes",
      "Requires large upfront deposit (>30%) before starting",
    ],
    protection: [
      "Verify license at tdlr.texas.gov — takes 30 seconds",
      "Look for reviews that mention specific project details over 12+ months",
      "Never pay more than 10–30% upfront; Texas law limits deposits",
      "Use the BBB (bbb.org/local/texas/dallas) to check complaint history",
    ],
  },
];

const HOW_PROLNK_HELPS = [
  { point: "Every pro is licensed and insured", detail: "We verify Texas contractor licenses through TDLR before any pro is accepted." },
  { point: "Background-checked professionals only", detail: "Criminal background checks are run on all platform members — no exceptions." },
  { point: "No door-to-door solicitation", detail: "Pros on ProLnk only connect with homeowners who have requested service. We ban unsolicited contact." },
  { point: "Verified reviews from confirmed jobs", detail: "Reviews can only be left by homeowners who completed a job through the platform — not paid or fake." },
  { point: "Transparent pricing before you commit", detail: "Get multiple quotes from vetted pros before selecting anyone. No pressure, no rush." },
  { point: "Dispute resolution built in", detail: "If something goes wrong, our team mediates — giving you recourse traditional hiring doesn't." },
  { point: "No deductible scams possible", detail: "Pros on ProLnk cannot offer to waive insurance deductibles — it violates our terms and Texas law." },
];

export default function DFWHomeRepairScams() {
  const [openScam, setOpenScam] = useState<number | null>(0);

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF9″, color: "#0A1628" }}>
      {/* Header */}
      <div style={{ background: "#0A1628″ }} className="px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <span className="text-white font-black text-xl tracking-tight cursor-pointer">
              Pro<span style={{ color: "#F5E642″ }}>Lnk</span>
            </span>
          </Link>
          <Link href="/homeowner-signup">
            <span className="text-xs font-semibold px-4 py-2 rounded-full cursor-pointer" style={{ background: "#F5E642″, color: "#0A1628" }}>
              Find Verified Pros
            </span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: "#0A1628″ }} className="px-6 pt-12 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold mb-6″ style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" }}>
            <AlertTriangle className="w-4 h-4″ />
            DFW Homeowner Alert — 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            7 Home Repair Scams Happening Right Now in Dallas-Fort Worth
          </h1>
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            <span>Texas AG received <strong className="text-white">14,847</strong> home repair fraud complaints in 2025</span>
            <span className="hidden sm:inline">|</span>
            <span>Up <strong className="text-red-400″>34%</strong> from 2024</span>
            <span className="hidden sm:inline">|</span>
            <span>DFW is the <strong className="text-yellow-400″>#1 target zone</strong> in Texas</span>
          </div>
        </div>
      </div>

      {/* Scam List */}
      <div className="max-w-4xl mx-auto px-6 py-12″>
        <h2 className="text-2xl font-black mb-8″ style={{ color: "#0A1628" }}>The 7 Scams — Click to Expand</h2>
        <div className="space-y-3″>
          {SCAMS.map((scam) => (
            <div key={scam.id} className="rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid #E5E7EB", background: "white" }}>
              <button
                onClick={() => setOpenScam(openScam === scam.id ? null : scam.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <div className="flex items-center gap-4″>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0″ style={{ background: scam.tagColor }}>
                    {scam.id}
                  </div>
                  <div>
                    <div className="font-bold text-base" style={{ color: "#0A1628″ }}>{scam.title}</div>
                    <div className="text-xs font-semibold mt-0.5″ style={{ color: scam.tagColor }}>{scam.tag}</div>
                  </div>
                </div>
                {openScam === scam.id
                  ? <ChevronUp className="w-5 h-5 shrink-0″ style={{ color: "#9CA3AF" }} />
                  : <ChevronDown className="w-5 h-5 shrink-0″ style={{ color: "#9CA3AF" }} />
                }
              </button>

              {openScam === scam.id && (
                <div className="px-6 pb-6 border-t" style={{ borderColor: "#F3F4F6″ }}>
                  <div className="grid md:grid-cols-3 gap-6 pt-5″>
                    <div>
                      <h4 className="font-bold text-sm mb-3″ style={{ color: scam.tagColor }}>How It Works</h4>
                      <p className="text-sm leading-relaxed" style={{ color: "#4B5563″ }}>{scam.howItWorks}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-3″ style={{ color: "#EF4444" }}>Red Flags</h4>
                      <ul className="space-y-2″>
                        {scam.redFlags.map((flag, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#4B5563″ }}>
                            <XCircle className="w-4 h-4 shrink-0 mt-0.5″ style={{ color: "#EF4444" }} />
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-3″ style={{ color: "#059669" }}>How to Protect Yourself</h4>
                      <ul className="space-y-2″>
                        {scam.protection.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#4B5563″ }}>
                            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5″ style={{ color: "#059669" }} />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* How ProLnk Prevents All of These */}
      <div className="px-6 py-16″ style={{ background: "#0A1628" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4″>
            <Shield className="w-6 h-6″ style={{ color: "#F5E642" }} />
            <h2 className="text-2xl font-black text-white">How ProLnk/TrustyPro Prevents All 7 Scams</h2>
          </div>
          <p className="mb-10 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Every pro on our platform goes through verification before they ever contact a homeowner.
          </p>
          <div className="grid sm:grid-cols-2 gap-4″>
            {HOW_PROLNK_HELPS.map((item, i) => (
              <div key={i} className="rounded-2xl p-5″ style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-start gap-3″>
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5″ style={{ color: "#F5E642" }} />
                  <div>
                    <div className="font-bold text-sm text-white mb-1″>{item.point}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/homeowner-signup">
              <span className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl cursor-pointer transition-all" style={{ background: "#F5E642″, color: "#0A1628" }}>
                Find Verified DFW Pros
              </span>
            </Link>
            <p className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Free to use · No commitment required</p>
          </div>
        </div>
      </div>

      {/* Report Fraud */}
      <div className="px-6 py-10″ style={{ background: "#FEF2F2", borderTop: "1px solid #FECACA" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4″>
          <div>
            <div className="font-bold text-lg" style={{ color: "#991B1B" }}>Report Home Repair Fraud in Texas</div>
            <p className="text-sm mt-1″ style={{ color: "#DC2626" }}>
              Texas Attorney General Consumer Protection Division — available 24/7
            </p>
          </div>
          <a href="tel:18006210508″ className="flex items-center gap-2 font-black text-xl px-6 py-3 rounded-2xl" style={{ background: "#DC2626", color: "white" }}>
            <Phone className="w-5 h-5″ />
            800-621-0508
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "#E5E7EB" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3″>
          <Link href="/">
            <span className="font-black text-lg cursor-pointer" style={{ color: "#0A1628″ }}>
              Pro<span style={{ color: "#F5E642″ }}>Lnk</span>
            </span>
          </Link>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>© 2026 ProLnk. All rights reserved.</p>
          <div className="flex gap-4 text-xs" style={{ color: "#6B7280″ }}>
            <Link href="/"><span className="cursor-pointer hover:underline">Home</span></Link>
            <Link href="/homeowner-signup"><span className="cursor-pointer hover:underline">Find Pros</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
