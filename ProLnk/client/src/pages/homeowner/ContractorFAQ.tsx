import { useState, useMemo } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Briefcase,
  Wrench,
  CreditCard,
  BadgeCheck,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  title: string;
  icon: typeof HelpCircle;
  color: string;
  items: FAQItem[];
}

const FAQ_SECTIONS: FAQSection[] = [
  {
    title: "Getting Quotes",
    icon: Briefcase,
    color: "#00D4FF",
    items: [
      {
        q: "How many quotes should I get?",
        a: "Always get at least 3 quotes before hiring a contractor. Multiple quotes help you understand fair market pricing, spot outliers (too low can mean cut corners; too high may not reflect value), and give you negotiating leverage. For projects over $5,000, consider getting 4–5 quotes.",
      },
      {
        q: "Why are quotes so different from each other?",
        a: "Large price differences between quotes usually come down to three factors: scope interpretation (contractors may assume different materials or work included), material quality (standard vs. premium fixtures, brands), and labor rates (which vary by experience level, overhead, and current demand in your area). Always ask each contractor to itemize their quote so you're comparing apples to apples.",
      },
      {
        q: "How long should a quote take?",
        a: "For small jobs (under $1,000), expect a quote within 1–3 days. Mid-size projects ($1,000–$10,000) typically take 3–7 days. Large or complex projects (remodels, additions, HVAC installs) may take 1–2 weeks as the contractor needs to visit your home, take measurements, and source materials pricing. Be wary of contractors who give instant quotes over the phone without seeing the work.",
      },
    ],
  },
  {
    title: "Hiring",
    icon: ShieldCheck,
    color: "#00E676",
    items: [
      {
        q: "What does 'licensed and insured' mean?",
        a: "Licensed means the contractor has passed state or local exams and met requirements to legally perform that type of work in your jurisdiction. Insured means they carry general liability insurance (covers damage to your property) and workers' compensation (covers injuries to their workers). Always ask for proof of both. You can verify licenses at your state's contractor licensing board website. Never hire someone who can't provide current insurance certificates.",
      },
      {
        q: "Should I pay a deposit before work starts?",
        a: "A deposit is normal and expected — but keep it reasonable. For jobs under $5,000, a 10–20% deposit is fair. For larger jobs, 20–30% upfront is typical. Never pay more than 30% upfront, and never pay in full before the job is done. Some states (like California) legally cap deposits at 10% or $1,000. Be very skeptical of any contractor who asks for more than half upfront.",
      },
      {
        q: "What should be in a written contract?",
        a: "Every job, no matter how small, should have a written contract covering: (1) Detailed scope of work — exactly what will and won't be done. (2) Materials list with specific brands/grades. (3) Start and completion dates. (4) Payment schedule tied to milestones. (5) Change order process — how scope changes are approved and priced. (6) Permit responsibilities. (7) Cleanup expectations. (8) Warranty terms for labor and materials. Never start work without a signed contract.",
      },
    ],
  },
  {
    title: "During the Job",
    icon: Wrench,
    color: "#F97316",
    items: [
      {
        q: "What if the scope of work changes mid-project?",
        a: "Changes happen — unforeseen issues get discovered, or you decide to expand the project. Any scope change should be handled through a formal change order: a written document that describes the new or modified work, the cost impact (credit or additional charge), and any schedule impact. Both you and the contractor should sign it before additional work begins. Never agree to scope changes verbally — it leads to disputes about what was agreed and at what price.",
      },
      {
        q: "Can the contractor start work without pulling a permit?",
        a: "No — not for work that requires one. Permits are required for most structural, electrical, plumbing, HVAC, and significant renovation work. If a contractor suggests skipping permits to 'save money' or 'move faster,' that's a red flag. Unpermitted work can: void your homeowner's insurance, create problems when you sell, result in fines, and require tear-out and redo if discovered. Always ask upfront whether permits are required, and confirm they've been pulled before major work starts.",
      },
      {
        q: "What if there are problems during the job?",
        a: "Address issues immediately and in writing. Document with photos. Speak directly with the contractor (not just crew members) and reference the specific contract language. If the issue isn't resolved quickly, send a formal written notice (email with read receipt) describing the problem and a reasonable deadline to fix it. If things escalate, your options include filing a complaint with your state licensing board, disputing payment, mediating through a contractor dispute service, or in serious cases, pursuing small claims court.",
      },
    ],
  },
  {
    title: "Payment",
    icon: CreditCard,
    color: "#A855F7",
    items: [
      {
        q: "When should I pay my contractor?",
        a: "Payment should follow your contract's milestone schedule, not the contractor's cash flow needs. A typical structure: 10–20% upfront deposit, 25–30% after materials delivery and project start, 25–30% at project midpoint, and the final 15–20% only after all work is complete and you've done a final walkthrough. Holding the final payment until completion is your best leverage to ensure punch-list items get finished.",
      },
      {
        q: "Can I legally withhold final payment?",
        a: "Yes, in most cases — if you have legitimate reasons. If work is incomplete, defective, or doesn't match the contract specifications, you have grounds to withhold final payment until it's corrected. Document your reasons clearly in writing. However, you cannot withhold payment for minor issues you're using as leverage; this can expose you to a breach of contract claim. Withhold only what's proportional to the incomplete or defective work.",
      },
      {
        q: "What payment methods are safest?",
        a: "Check or credit card are the safest options. Credit cards give you chargeback protection if the contractor doesn't complete work or disappears. Checks create a paper trail. Avoid cash entirely — it leaves no record and eliminates your recourse. Never pay via wire transfer or Venmo/Zelle for new contractors — these are nearly impossible to reverse if something goes wrong. For large projects, consider using a construction escrow service.",
      },
    ],
  },
  {
    title: "TrustyPro Specific",
    icon: BadgeCheck,
    color: "#FFB300",
    items: [
      {
        q: "How does TrustyPro verify its pros?",
        a: "Every pro on TrustyPro goes through a multi-step verification process: license verification (we check state licensing databases directly), insurance confirmation (COI on file, verified annually), background check (criminal history and business record review), work history review, and a platform performance score based on completed jobs and homeowner ratings. Only pros who pass all steps are listed in the directory and receive leads.",
      },
      {
        q: "What if I have a dispute with a TrustyPro pro?",
        a: "Contact our support team first — we handle many disputes quickly through mediation. For the fastest resolution, document the issue with photos, save all communications, and submit a dispute through your TrustyPro account dashboard. We'll contact the pro on your behalf and attempt to reach a resolution within 5 business days. If mediation fails, we may issue a platform credit, facilitate a third-party inspection, or remove the pro from the platform if warranted.",
      },
      {
        q: "Is ProLnk/TrustyPro a licensed contractor?",
        a: "No — ProLnk and TrustyPro are technology platforms that connect homeowners with independent, licensed contractors. We are not a contractor and do not perform any services. Each pro on our platform is an independent business responsible for their own licensing, insurance, and work quality. Our role is to vet pros before they're listed, provide a trusted marketplace, and mediate disputes when they arise.",
      },
    ],
  },
];

function FAQItemRow({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{ border: `1px solid ${isOpen ? "#252A3A" : "#1A1E2A"}`, background: isOpen ? "#13161E" : "#0F1520" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-4 text-left transition-colors hover:bg-[#13161E]"
      >
        <span className="text-white font-medium text-sm leading-relaxed flex-1">{item.q}</span>
        {isOpen
          ? <ChevronUp className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#8B91A8" }} />
          : <ChevronDown className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#8B91A8" }} />
        }
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <div style={{ borderTop: "1px solid #252A3A" }} className="pt-3">
            <p className="text-[#8B91A8] text-sm leading-relaxed">{item.a}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContractorFAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  function toggleItem(key: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  const filteredSections = useMemo(() => {
    if (!search.trim()) return FAQ_SECTIONS;
    const q = search.toLowerCase();
    return FAQ_SECTIONS
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [search]);

  const totalResults = filteredSections.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white p-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-8 text-center">
            <div
              className="inline-flex items-center justify-center p-3 rounded-2xl mb-4"
              style={{ background: "linear-gradient(135deg, #FFB30022, #FFB30044)", border: "1px solid #FFB30030" }}
            >
              <HelpCircle className="w-8 h-8" style={{ color: "#FFB300" }} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Contractor FAQ</h1>
            <p className="text-[#8B91A8]">Answers to your most common questions</p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#8B91A8" }} />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
              style={{
                background: "#13161E",
                border: "1px solid #252A3A",
                color: "#F0F2FF",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#FFB30060")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#252A3A")}
            />
            {search && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs" style={{ color: "#555B72" }}>
                {totalResults} result{totalResults !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* FAQ Sections */}
          {filteredSections.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="w-10 h-10 mx-auto mb-3" style={{ color: "#555B72" }} />
              <p className="text-[#8B91A8]">No questions match your search.</p>
              <button
                onClick={() => setSearch("")}
                className="mt-3 text-sm underline"
                style={{ color: "#FFB300" }}
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.title}>
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="p-1.5 rounded-lg"
                        style={{ background: `${section.color}15` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: section.color }} />
                      </div>
                      <h2 className="text-white font-semibold">{section.title}</h2>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${section.color}15`, color: section.color }}
                      >
                        {section.items.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {section.items.map((item, idx) => {
                        const key = `${section.title}-${idx}`;
                        return (
                          <FAQItemRow
                            key={key}
                            item={item}
                            isOpen={openItems.has(key)}
                            onToggle={() => toggleItem(key)}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Still Have Questions CTA */}
          <div
            className="mt-12 rounded-2xl p-6"
            style={{ background: "#13161E", border: "1px solid #252A3A" }}
          >
            <h3 className="text-white font-semibold text-lg mb-1 text-center">Still have questions?</h3>
            <p className="text-[#8B91A8] text-sm text-center mb-5">
              Our AI assistant can answer follow-up questions, or connect with a real support agent.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all"
                style={{ background: "linear-gradient(135deg, #FFB300, #F97316)", color: "#0A1628" }}
              >
                <Sparkles className="w-4 h-4" />
                Ask our AI assistant
              </button>
              <button
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all"
                style={{
                  background: "transparent",
                  border: "1px solid #252A3A",
                  color: "#F0F2FF",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#FFB30060")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#252A3A")}
              >
                <MessageCircle className="w-4 h-4" style={{ color: "#8B91A8" }} />
                Chat with support
              </button>
            </div>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
