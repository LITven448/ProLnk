import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, Home, ArrowRight, CheckCircle, QrCode, HelpCircle, ChevronDown, ChevronUp, Link } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

const FAQS: FAQ[] = [
  {
    q: "When do I get paid?",
    a: "You earn your referral fee when the homeowner you referred completes their first service booking through TrustyPro. Payment is processed within 7 business days via direct deposit.",
  },
  {
    q: "How much can I earn per referral?",
    a: "Referral fees range from $25 to $100 per homeowner depending on the value of the first job booked. Higher-value services (HVAC, roofing, electrical) earn the higher end of the range.",
  },
  {
    q: "Is there a limit to how many homeowners I can refer?",
    a: "No limit. Top field partners refer 10–20 homeowners per month from their service routes alone. At $50 average, that is $500–$1,000 in extra monthly income.",
  },
  {
    q: "What if the homeowner doesn\'t sign up right away?",
    a: "Your referral link is cookied for 90 days. If a homeowner you sent signs up within 90 days, you still get credit.",
  },
];

const HOW_IT_WORKS = [
  { step: "1", label: "Share your link", detail: "Every ProLnk partner gets a personal homeowner referral link and QR code." },
  { step: "2", label: "Homeowner signs up", detail: "They complete the TrustyPro homeowner signup using your link." },
  { step: "3", label: "First job completes", detail: "Once their first service is completed, your fee is triggered." },
  { step: "4", label: "You get paid", detail: "$25–$100 deposited to your account within 7 business days." },
];

const BENEFITS = [
  {
    icon: Home,
    title: "Every homeowner becomes a future lead source",
    detail: "When homeowners are in the TrustyPro vault, AI scans return to your pipeline first. The homeowners you refer become your future customers.",
    color: "#3B82F6",
  },
  {
    icon: DollarSign,
    title: "Earn immediately when they book",
    detail: "Your referral fee triggers the moment their first service completes — no waiting for platform growth or equity events.",
    color: "#10B981",
  },
  {
    icon: Users,
    title: "Build your local network",
    detail: "Homeowners who trust you enough to enter your referral link become part of your professional network permanently.",
    color: "#8B5CF6",
  },
];

export default function PartnerReferralProgram() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const monthlyReferrals = 5;
  const avgEarning = 50;
  const monthly = monthlyReferrals * avgEarning;

  return (
    <div className="min-h-screen bg-white text-[#0A1628]">
      {/* Hero */}
      <div className="bg-[#0A1628] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-5">
            <DollarSign size={14} className="text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Partner Referral Program</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Refer a Homeowner to TrustyPro
          </h1>
          <p className="text-2xl font-bold text-yellow-400 mb-3">Earn $25–$100 Per Referral</p>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Share your homeowner referral link. When they complete their first service booking, you get paid — automatically.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Math */}
        <section className="mb-16">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-[#0A1628] mb-5 text-center">The Math Is Simple</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-xl p-4 border border-yellow-200">
                  <div className="text-3xl font-bold text-[#0A1628]">5</div>
                  <div className="text-sm text-gray-600 mt-1">referrals/month</div>
                  <div className="text-xs text-gray-400 mt-0.5">from your service routes</div>
                </div>
                <div className="flex items-center justify-center text-3xl text-gray-300">×</div>
                <div className="bg-white rounded-xl p-4 border border-yellow-200">
                  <div className="text-3xl font-bold text-[#0A1628]">$50</div>
                  <div className="text-sm text-gray-600 mt-1">avg per referral</div>
                  <div className="text-xs text-gray-400 mt-0.5">range is $25–$100</div>
                </div>
              </div>
              <div className="mt-6 bg-[#0A1628] rounded-xl p-5 text-center">
                <div className="text-xs text-gray-400 mb-1">Extra income per month</div>
                <div className="text-4xl font-bold text-yellow-400">${monthly.toLocaleString()}</div>
                <div className="text-sm text-gray-400 mt-1">in addition to your ProLnk commissions</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-8 text-center">How It Works</h2>
          <div className="space-y-4">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#0A1628] text-yellow-400 font-bold text-lg flex items-center justify-center flex-shrink-0">
                  {step.step}
                </div>
                <div className="pt-1">
                  <div className="font-bold text-[#0A1628] mb-0.5">{step.label}</div>
                  <div className="text-gray-600 text-sm">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Refer */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-8 text-center">Why Pros Should Refer Homeowners</h2>
          <div className="space-y-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex gap-4 bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: b.color + "22" }}>
                  <b.icon size={20} style={{ color: b.color }} />
                </div>
                <div>
                  <div className="font-bold text-[#0A1628] mb-1">{b.title}</div>
                  <div className="text-gray-600 text-sm">{b.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QR + Link section */}
        <section className="mb-16">
          <Card className="border-gray-200">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-[#0A1628] mb-5 text-center">How to Refer</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Link size={32} className="text-[#0A1628]" />
                  </div>
                  <div className="font-bold text-[#0A1628] mb-1">Share Your Referral Link</div>
                  <div className="text-gray-500 text-sm">Available in your ProLnk partner dashboard after you join. Send it via text, email, or social.</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <QrCode size={32} className="text-[#0A1628]" />
                  </div>
                  <div className="font-bold text-[#0A1628] mb-1">QR Code for In-Field Use</div>
                  <div className="text-gray-500 text-sm">Print your QR code and hand it to homeowners at the job site. Scans directly to the signup page with your referral ID attached.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#0A1628] text-sm">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-3">Ready to Start Earning?</h2>
          <p className="text-gray-500 mb-7">Join ProLnk to get your personal homeowner referral link and QR code.</p>
          <a href="/apply">
            <Button className="bg-[#0A1628] hover:bg-[#0d1e38] text-yellow-400 font-bold px-10 py-4 text-lg">
              Apply to Join ProLnk <ArrowRight size={18} className="ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
