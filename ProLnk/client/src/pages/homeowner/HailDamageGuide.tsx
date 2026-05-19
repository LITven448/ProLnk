import HomeownerLayout from "../../layouts/HomeownerLayout";
import { AlertTriangle, Clock, Camera, Phone, FileText, CheckCircle, XCircle, Shield } from "lucide-react";

const timeline = [
  {
    hours: "Hour 0–2″,
    color: "#EF4444″,
    steps: [
      "Don't go on the roof under any circumstances",
      "Photograph all visible damage from the ground",
      "Note date and exact time of storm",
    ],
  },
  {
    hours: "Hour 2–6″,
    color: "#F59E0B",
    steps: [
      "Call your insurance company immediately",
      "Get your claim number — write it down",
      "Do NOT sign any restoration contracts yet",
    ],
  },
  {
    hours: "Hour 6–24″,
    color: "#14B8A6″,
    steps: [
      "Get 3 roofing estimates from licensed contractors",
      "Compare written scopes of work — not just price",
      "Verify each contractor's license on TDLR website",
    ],
  },
  {
    hours: "Hour 24–72″,
    color: "#6366F1″,
    steps: [
      "Select your contractor based on scope + reviews",
      "Ensure a written contract with full scope, timeline, and payment terms",
      "Never pay more than 10% upfront",
    ],
  },
];

const damageTypes = [
  { label: "Circular dents on shingles", detail: "Dark spots indicating granule bruising from hail impact" },
  { label: "Granule loss in gutters", detail: "Excessive shingle granules washed into downspouts" },
  { label: "Dented metal vents", detail: "Soft aluminum ridge vents and pipe flashings dent easily" },
  { label: "Bruised fascia boards", detail: "Check wood trim along roofline for soft spots or cracking" },
  { label: "Cracked skylights", detail: "Inspect for hairline cracks or shattered acrylic panels" },
  { label: "Damaged AC condenser fins", detail: "Bent or crushed aluminum fins reduce unit efficiency" },
];

const goodSigns = [
  "Licensed with TDLR (verify at tdlr.texas.gov)",
  "Local business with physical address",
  "Carries general liability + workers' comp",
  "Provides written contract before starting",
  "Doesn't offer to waive your deductible",
];

const redFlags = [
  "Shows up door-to-door right after the storm",
  "Offers to waive your insurance deductible",
  "Wants 50%+ payment upfront",
  "No local address or references",
  "Pressures you to sign immediately",
];

export default function HailDamageGuide() {
  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="max-w-4xl mx-auto px-4 py-12″>
          <div className="mb-8″>
            <h1 className="text-4xl font-bold mb-2″>DFW Hail Damage Guide</h1>
            <p className="text-[#94A3B8] text-lg">What to do in the first 72 hours</p>
          </div>

          <div className="bg-[#EF4444]/10 border border-[#EF4444]/40 rounded-xl p-4 mb-10 flex items-start gap-3″>
            <AlertTriangle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5″ />
            <p className="text-[#FCA5A5] text-sm font-medium">
              After any hail event: Document EVERYTHING before cleanup. Insurance requires proof of damage as it occurred — not after you've touched anything.
            </p>
          </div>

          <section className="mb-12″>
            <h2 className="text-xl font-semibold mb-6 text-[#14B8A6] flex items-center gap-2″>
              <Clock className="w-5 h-5″ /> 72-Hour Action Timeline
            </h2>
            <div className="space-y-4″>
              {timeline.map((block) => (
                <div key={block.hours} className="bg-[#1E293B] rounded-2xl p-5″>
                  <div className="flex items-center gap-3 mb-3″>
                    <span
                      className="text-sm font-bold px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${block.color}20`, color: block.color }}
                    >
                      {block.hours}
                    </span>
                  </div>
                  <ul className="space-y-2″>
                    {block.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#CBD5E1] text-sm">
                        <span style={{ color: block.color }} className="font-bold mt-0.5″>›</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12″>
            <h2 className="text-xl font-semibold mb-6 text-[#14B8A6] flex items-center gap-2″>
              <Camera className="w-5 h-5″ /> What Hail Damage Looks Like
            </h2>
            <div className="grid sm:grid-cols-2 gap-4″>
              {damageTypes.map((d) => (
                <div key={d.label} className="bg-[#1E293B] rounded-xl p-4″>
                  <p className="font-semibold text-white mb-1″>{d.label}</p>
                  <p className="text-[#94A3B8] text-sm">{d.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12″>
            <h2 className="text-xl font-semibold mb-4 text-[#EF4444] flex items-center gap-2″>
              <Shield className="w-5 h-5″ /> Insurance Red Flag — Texas Law
            </h2>
            <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-2xl p-6″>
              <p className="text-[#FCA5A5] font-semibold mb-2″>Deductible waiver offers are illegal in Texas (SB 2268).</p>
              <p className="text-[#CBD5E1] text-sm">
                Any contractor offering to "work with your insurance" to waive your deductible is committing insurance fraud. You could be held liable. Report to the Texas Department of Insurance at 800-252-3439.
              </p>
            </div>
          </section>

          <section className="mb-12″>
            <h2 className="text-xl font-semibold mb-6 text-[#14B8A6] flex items-center gap-2″>
              <FileText className="w-5 h-5″ /> Finding a Legitimate Roofer
            </h2>
            <div className="grid sm:grid-cols-2 gap-6″>
              <div className="bg-[#1E293B] rounded-2xl p-5″>
                <div className="flex items-center gap-2 mb-4″>
                  <CheckCircle className="w-5 h-5 text-[#14B8A6]" />
                  <span className="font-semibold text-[#14B8A6]">Green Flags</span>
                </div>
                <ul className="space-y-2″>
                  {goodSigns.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#CBD5E1] text-sm">
                      <CheckCircle className="w-4 h-4 text-[#14B8A6] flex-shrink-0 mt-0.5″ />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#1E293B] rounded-2xl p-5″>
                <div className="flex items-center gap-2 mb-4″>
                  <XCircle className="w-5 h-5 text-[#EF4444]" />
                  <span className="font-semibold text-[#EF4444]">Red Flags</span>
                </div>
                <ul className="space-y-2″>
                  {redFlags.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#CBD5E1] text-sm">
                      <XCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0 mt-0.5″ />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <div className="bg-[#1E293B] rounded-2xl p-8 text-center">
            <Phone className="w-10 h-10 text-[#F59E0B] mx-auto mb-4″ />
            <h3 className="text-xl font-bold mb-2″>Need a Verified Roofer Now?</h3>
            <p className="text-[#94A3B8] text-sm mb-6″>
              TrustyPro roofers are licensed, insured, and locally verified. No storm chasers. No door-knockers.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#1B2A4A] font-bold px-8 py-3 rounded-xl transition-colors">
              Find a TrustyPro Roofer
            </button>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
