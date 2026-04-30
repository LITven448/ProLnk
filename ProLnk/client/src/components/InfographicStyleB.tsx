// Style B: Clean Modern -- Flowing timeline with avatar circles, gradient accents, minimal and professional

export function InfographicStyleB() {
  const steps = [
    {
      icon: "",
      party: "Referring Pro",
      subtitle: "Lawn care  HVAC  Pest control  Any trade",
      action: "Completes a job and uploads 1-3 photos through the ProLnk Field OS. Takes 60 seconds.",
      color: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      badge: "bg-emerald-500",
      earn: "Earns 6% = $150",
      earnColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
      avatar: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="28" fill="url(#scoutGrad)"/>
          <defs>
            <linearGradient id="scoutGrad" x1="0" y1="0" x2="56" y2="56">
              <stop stopColor="#10b981"/>
              <stop offset="1" stopColor="#0d9488"/>
            </linearGradient>
          </defs>
          {/* Person silhouette */}
          <circle cx="28" cy="20" r="8" fill="white" fillOpacity="0.9"/>
          <path d="M14 44 C14 36 20 32 28 32 C36 32 42 36 42 44" fill="white" fillOpacity="0.9"/>
          {/* Camera icon overlay */}
          <rect x="32" y="30" width="14" height="10" rx="2" fill="#10b981" stroke="white" strokeWidth="1.5"/>
          <circle cx="39" cy="35" r="2.5" fill="white"/>
        </svg>
      ),
    },
    {
      icon: "[BOT]",
      party: "ProLnk AI",
      subtitle: "Computer vision  Property analysis  50+ detection categories",
      action: "Scans every photo in seconds. Detects fences, drainage, overgrown areas, damaged gutters, and 50+ other service needs.",
      color: "from-teal-500 to-cyan-500",
      bg: "bg-[#F5E642]/10",
      border: "border-[#0A1628]/20",
      badge: "bg-[#0A1628]",
      earn: "Keeps 5% = $125",
      earnColor: "text-[#0A1628] bg-[#F5E642]/10 border-[#0A1628]/20",
      avatar: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="28" fill="url(#aiGrad)"/>
          <defs>
            <linearGradient id="aiGrad" x1="0" y1="0" x2="56" y2="56">
              <stop stopColor="#0d9488"/>
              <stop offset="1" stopColor="#06b6d4"/>
            </linearGradient>
          </defs>
          {/* Robot face */}
          <rect x="16" y="16" width="24" height="20" rx="4" fill="white" fillOpacity="0.9"/>
          <rect x="19" y="20" width="7" height="5" rx="2" fill="#0d9488"/>
          <rect x="30" y="20" width="7" height="5" rx="2" fill="#0d9488"/>
          <rect x="20" y="29" width="16" height="3" rx="1.5" fill="#0d9488"/>
          {/* Antenna */}
          <rect x="26" y="10" width="4" height="8" rx="2" fill="white" fillOpacity="0.9"/>
          <circle cx="28" cy="9" r="3" fill="#2dd4bf"/>
          {/* Body */}
          <rect x="20" y="38" width="16" height="10" rx="3" fill="white" fillOpacity="0.7"/>
          <circle cx="28" cy="43" r="3" fill="#0d9488"/>
        </svg>
      ),
    },
    {
      icon: "",
      party: "The Homeowner",
      subtitle: "Receives job completion + deal in one notification",
      action: "Gets a text/email with the before & after photos of their completed job -- plus a bundled deal for the detected service need at 10-15% off.",
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
      badge: "bg-amber-500",
      earn: "Saves 10-15%",
      earnColor: "text-amber-600 bg-amber-50 border-amber-200",
      avatar: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="28" fill="url(#hoGrad)"/>
          <defs>
            <linearGradient id="hoGrad" x1="0" y1="0" x2="56" y2="56">
              <stop stopColor="#f59e0b"/>
              <stop offset="1" stopColor="#f97316"/>
            </linearGradient>
          </defs>
          {/* House */}
          <path d="M28 12 L42 24 L42 44 L14 44 L14 24 Z" fill="white" fillOpacity="0.9"/>
          <path d="M24 44 L24 34 L32 34 L32 44" fill="#f59e0b"/>
          <rect x="20" y="26" width="7" height="6" rx="1" fill="#f59e0b"/>
          <rect x="29" y="26" width="7" height="6" rx="1" fill="#f59e0b"/>
          {/* Roof */}
          <path d="M10 26 L28 10 L46 26" fill="white" fillOpacity="0.9"/>
        </svg>
      ),
    },
    {
      icon: "",
      party: "Receiving Pro",
      subtitle: "Fence  HVAC  Plumbing  Electrical  Any trade",
      action: "Receives a qualified, pre-approved lead. Contacts the homeowner, closes the job, and pays the referral fee only on the closed job.",
      color: "from-violet-500 to-purple-600",
      bg: "bg-violet-50",
      border: "border-violet-200",
      badge: "bg-violet-600",
      earn: "Pays 11% = $275",
      earnColor: "text-violet-600 bg-violet-50 border-violet-200",
      avatar: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="28" fill="url(#closerGrad)"/>
          <defs>
            <linearGradient id="closerGrad" x1="0" y1="0" x2="56" y2="56">
              <stop stopColor="#7c3aed"/>
              <stop offset="1" stopColor="#9333ea"/>
            </linearGradient>
          </defs>
          {/* Person */}
          <circle cx="28" cy="20" r="8" fill="white" fillOpacity="0.9"/>
          <path d="M14 44 C14 36 20 32 28 32 C36 32 42 36 42 44" fill="white" fillOpacity="0.9"/>
          {/* Checkmark badge */}
          <circle cx="40" cy="16" r="8" fill="#7c3aed" stroke="white" strokeWidth="2"/>
          <path d="M36 16 L39 19 L44 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#050d1a] to-[#0d2137] px-8 py-8 text-center">
        <div className="inline-flex items-center gap-2 bg-[#0A1628]/20 border border-[#0A1628]/30 rounded-full px-4 py-1.5 mb-4">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-teal-300 text-xs font-semibold tracking-widest uppercase">Patent Pending  AI-Powered</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">How ProLnk Works</h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">One photo. Three parties. Every step from job completion to commission paid -- automatically.</p>
      </div>

      {/* Steps */}
      <div className="px-6 py-8">
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-7 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-0.5 bg-gradient-to-r from-emerald-300 via-teal-300 via-amber-300 to-violet-300" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {/* Step number + avatar */}
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                    {step.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    {i + 1}
                  </div>
                </div>

                {/* Party name */}
                <div className={`${step.badge} text-white text-xs font-bold px-3 py-1 rounded-full mb-2`}>
                  {step.party}
                </div>

                {/* Subtitle */}
                <p className="text-gray-400 text-xs mb-3 leading-tight">{step.subtitle}</p>

                {/* Action card */}
                <div className={`${step.bg} ${step.border} border rounded-2xl p-4 text-left w-full mb-3`}>
                  <p className="text-gray-700 text-xs leading-relaxed">{step.action}</p>
                </div>

                {/* Earn/pay badge */}
                <div className={`${step.earnColor} border text-xs font-bold px-3 py-1.5 rounded-xl`}>
                  {step.earn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom commission summary */}
      <div className="mx-6 mb-6 bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <div className="text-center mb-4">
          <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest">Live Example  $2,500 Fence Job</span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-emerald-200 shadow-sm">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-gray-600">Scout earns</span>
            <span className="font-bold text-emerald-600">$150</span>
          </div>
          <span className="text-gray-300 text-lg font-light">+</span>
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-[#0A1628]/20 shadow-sm">
            <div className="w-3 h-3 rounded-full bg-[#0A1628]" />
            <span className="text-gray-600">ProLnk keeps</span>
            <span className="font-bold text-[#0A1628]">$125</span>
          </div>
          <span className="text-gray-300 text-lg font-light">=</span>
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-violet-200 shadow-sm">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            <span className="text-gray-600">Closer pays</span>
            <span className="font-bold text-violet-600">$275 total</span>
          </div>
          <span className="text-gray-300 text-lg font-light"></span>
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-amber-200 shadow-sm">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-gray-600">Closer nets</span>
            <span className="font-bold text-amber-600">$2,225</span>
          </div>
        </div>
        <p className="text-center text-gray-400 text-xs mt-3">
          Compare: Angi charges $80-$200 per <em>unqualified</em> lead  ProLnk charges $275 only when the job <strong>closes</strong>
        </p>
      </div>
    </div>
  );
}
