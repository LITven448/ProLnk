// EXPERIMENT: 2-step signup at /apply-v2. To make this the default, point the
// ProWaitlist CTAs / openWaitlist here (or replace the modal). Live signup at
// /apply is unchanged.
import { Link } from "wouter";
import ProLnkLogo from "@/components/ProLnkLogo";
import ProSignup2Step from "@/components/ProSignup2Step";
import { Shield, Lock, Percent } from "lucide-react";

const NAVY = "#0A1628";
const YELLOW = "#F5E642";

const TRUST = [
  { icon: Lock, label: "Plans from $99/mo" },
  { icon: Percent, label: "Keep up to 60% of the platform fee" },
  { icon: Shield, label: "Early access status" },
];

export default function ApplyV2() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] text-gray-900">
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <ProLnkLogo height={36} />
          </Link>
          <Link href="/apply" className="text-xs font-semibold text-gray-400 hover:text-gray-600">
            Classic signup
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 sm:py-14">
        <div className="max-w-lg mx-auto text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: NAVY }}>
            Join the ProLnk partner network
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Get your spot and your referral link in 30 seconds. Complete your
            profile after to rank higher.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            {TRUST.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full px-3 py-1.5"
                style={{ backgroundColor: "white", color: NAVY, border: `1px solid ${YELLOW}` }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: NAVY }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <ProSignup2Step />
      </main>
    </div>
  );
}
