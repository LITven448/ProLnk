// Style A: Comic/Illustrated -- Bold characters with speech bubbles and hand-drawn feel

export function InfographicStyleA() {
  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden border-4 border-gray-900 shadow-[8px_8px_0px_0px_#111]">
      {/* Header */}
      <div className="bg-gray-900 px-8 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl font-black tracking-tight">HOW ProLnk WORKS</h2>
          <p className="text-[#0A1628]/70 text-sm font-bold mt-0.5">Every Job Photo Becomes a Lead -- Patent Pending</p>
        </div>
        <div className="bg-teal-400 text-gray-900 px-4 py-2 rounded-full font-black text-sm"> AI-POWERED</div>
      </div>

      {/* Characters Row */}
      <div className="px-8 py-8 bg-gradient-to-b from-amber-50 to-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">

          {/* Referring Pro */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              {/* Character SVG - lawn care worker */}
              <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <rect x="30" y="55" width="40" height="45" rx="8" fill="#22c55e"/>
                {/* Head */}
                <circle cx="50" cy="38" r="22" fill="#fbbf24"/>
                {/* Hard hat */}
                <ellipse cx="50" cy="20" rx="26" ry="8" fill="#16a34a"/>
                <rect x="24" y="18" width="52" height="6" rx="3" fill="#15803d"/>
                {/* Eyes */}
                <circle cx="43" cy="38" r="3" fill="#1f2937"/>
                <circle cx="57" cy="38" r="3" fill="#1f2937"/>
                {/* Smile */}
                <path d="M43 47 Q50 53 57 47" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none"/>
                {/* Arms */}
                <rect x="10" y="58" width="22" height="10" rx="5" fill="#22c55e"/>
                <rect x="68" y="58" width="22" height="10" rx="5" fill="#22c55e"/>
                {/* Camera in hand */}
                <rect x="72" y="55" width="18" height="14" rx="3" fill="#374151"/>
                <circle cx="81" cy="62" r="4" fill="#9ca3af"/>
                <circle cx="81" cy="62" r="2" fill="#1f2937"/>
                {/* Legs */}
                <rect x="33" y="95" width="14" height="20" rx="5" fill="#15803d"/>
                <rect x="53" y="95" width="14" height="20" rx="5" fill="#15803d"/>
                {/* Boots */}
                <rect x="31" y="110" width="18" height="8" rx="3" fill="#1f2937"/>
                <rect x="51" y="110" width="18" height="8" rx="3" fill="#1f2937"/>
              </svg>
              {/* Speech bubble */}
              <div className="absolute -top-2 -right-4 bg-white border-2 border-gray-900 rounded-2xl px-3 py-1.5 shadow-[3px_3px_0px_0px_#111] text-xs font-black text-gray-900 whitespace-nowrap">
                 Job done!
                <div className="absolute bottom-0 left-3 w-3 h-3 bg-white border-b-2 border-l-2 border-gray-900 transform rotate-45 translate-y-1.5 -translate-x-0" />
              </div>
            </div>
            <div className="bg-green-500 text-white px-4 py-1.5 rounded-full font-black text-sm border-2 border-gray-900 shadow-[3px_3px_0px_0px_#111] mb-2">
              REFERRING PRO
            </div>
            <p className="text-gray-700 text-xs font-bold leading-tight">Takes job photos.<br/>Earns commission.</p>
            <div className="mt-2 bg-green-100 border-2 border-green-500 rounded-xl px-3 py-1.5 text-green-700 font-black text-sm">
              Earns 6%
            </div>
          </div>

          {/* Arrow + AI */}
          <div className="flex flex-col items-center justify-center text-center pt-4">
            {/* Arrow */}
            <div className="text-4xl font-black text-gray-300 mb-3"></div>
            {/* AI Brain character */}
            <div className="relative">
              <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Robot body */}
                <rect x="15" y="45" width="50" height="35" rx="8" fill="#0d9488"/>
                {/* Robot head */}
                <rect x="18" y="10" width="44" height="38" rx="10" fill="#134e4a"/>
                {/* Antenna */}
                <rect x="37" y="2" width="6" height="12" rx="3" fill="#0d9488"/>
                <circle cx="40" cy="2" r="5" fill="#14b8a6"/>
                {/* Eye screens */}
                <rect x="22" y="18" width="16" height="12" rx="4" fill="#0f766e"/>
                <rect x="42" y="18" width="16" height="12" rx="4" fill="#0f766e"/>
                {/* Scanning lines in eyes */}
                <rect x="24" y="21" width="12" height="2" rx="1" fill="#2dd4bf"/>
                <rect x="44" y="21" width="12" height="2" rx="1" fill="#2dd4bf"/>
                <rect x="24" y="25" width="8" height="2" rx="1" fill="#2dd4bf"/>
                <rect x="44" y="25" width="8" height="2" rx="1" fill="#2dd4bf"/>
                {/* Mouth grill */}
                <rect x="25" y="36" width="30" height="6" rx="3" fill="#0f766e"/>
                <rect x="28" y="37" width="4" height="4" rx="1" fill="#2dd4bf"/>
                <rect x="35" y="37" width="4" height="4" rx="1" fill="#2dd4bf"/>
                <rect x="42" y="37" width="4" height="4" rx="1" fill="#2dd4bf"/>
                {/* Body details */}
                <circle cx="40" cy="60" r="8" fill="#0f766e"/>
                <text x="36" y="64" fontSize="10" fill="#2dd4bf" fontWeight="bold">AI</text>
                {/* Arms */}
                <rect x="2" y="48" width="15" height="8" rx="4" fill="#0d9488"/>
                <rect x="63" y="48" width="15" height="8" rx="4" fill="#0d9488"/>
              </svg>
              {/* Analysis bubble */}
              <div className="absolute -top-1 -right-8 bg-teal-400 border-2 border-gray-900 rounded-xl px-2 py-1 shadow-[2px_2px_0px_0px_#111] text-xs font-black text-gray-900 whitespace-nowrap">
                [SEARCH] Fence!
              </div>
            </div>
            <div className="bg-[#0A1628] text-white px-3 py-1.5 rounded-full font-black text-xs border-2 border-gray-900 shadow-[3px_3px_0px_0px_#111] mt-2">
              ProLnk AI
            </div>
            <p className="text-gray-700 text-xs font-bold mt-1 leading-tight">Scans photos.<br/>Detects needs.</p>
            <div className="mt-2 bg-[#0A1628]/10 border-2 border-[#0A1628] rounded-xl px-3 py-1.5 text-[#0A1628] font-black text-sm">
              Keeps 5%
            </div>
          </div>

          {/* Arrow + Receiving Pro */}
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl font-black text-gray-300 mb-3 mt-4"></div>
            <div className="relative mb-3">
              {/* Character SVG - fence/trade worker */}
              <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <rect x="30" y="55" width="40" height="45" rx="8" fill="#7c3aed"/>
                {/* Head */}
                <circle cx="50" cy="38" r="22" fill="#fbbf24"/>
                {/* Helmet */}
                <ellipse cx="50" cy="20" rx="26" ry="8" fill="#6d28d9"/>
                <rect x="24" y="18" width="52" height="6" rx="3" fill="#5b21b6"/>
                {/* Eyes - determined look */}
                <circle cx="43" cy="38" r="3" fill="#1f2937"/>
                <circle cx="57" cy="38" r="3" fill="#1f2937"/>
                {/* Eyebrows - focused */}
                <path d="M40 32 L46 34" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M54 34 L60 32" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Confident smile */}
                <path d="M43 47 Q50 54 57 47" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none"/>
                {/* Arms */}
                <rect x="10" y="58" width="22" height="10" rx="5" fill="#7c3aed"/>
                <rect x="68" y="58" width="22" height="10" rx="5" fill="#7c3aed"/>
                {/* Tool in hand */}
                <rect x="8" y="52" width="6" height="24" rx="3" fill="#92400e"/>
                {/* Legs */}
                <rect x="33" y="95" width="14" height="20" rx="5" fill="#5b21b6"/>
                <rect x="53" y="95" width="14" height="20" rx="5" fill="#5b21b6"/>
                {/* Boots */}
                <rect x="31" y="110" width="18" height="8" rx="3" fill="#1f2937"/>
                <rect x="51" y="110" width="18" height="8" rx="3" fill="#1f2937"/>
              </svg>
              {/* Speech bubble */}
              <div className="absolute -top-2 -left-6 bg-white border-2 border-gray-900 rounded-2xl px-3 py-1.5 shadow-[3px_3px_0px_0px_#111] text-xs font-black text-gray-900 whitespace-nowrap">
                 I got this!
                <div className="absolute bottom-0 right-3 w-3 h-3 bg-white border-b-2 border-r-2 border-gray-900 transform rotate-45 translate-y-1.5" />
              </div>
            </div>
            <div className="bg-violet-600 text-white px-4 py-1.5 rounded-full font-black text-sm border-2 border-gray-900 shadow-[3px_3px_0px_0px_#111] mb-2">
              RECEIVING PRO
            </div>
            <p className="text-gray-700 text-xs font-bold leading-tight">Gets the lead.<br/>Closes the job.</p>
            <div className="mt-2 bg-violet-100 border-2 border-violet-500 rounded-xl px-3 py-1.5 text-violet-700 font-black text-sm">
              Pays 11%
            </div>
          </div>

          {/* Arrow + Homeowner */}
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl font-black text-gray-300 mb-3 mt-4"></div>
            <div className="relative mb-3">
              {/* Character SVG - homeowner */}
              <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <rect x="30" y="55" width="40" height="45" rx="8" fill="#f59e0b"/>
                {/* Head */}
                <circle cx="50" cy="38" r="22" fill="#fcd34d"/>
                {/* Hair */}
                <path d="M28 30 Q50 10 72 30" fill="#92400e"/>
                {/* Eyes - happy */}
                <path d="M40 37 Q43 34 46 37" stroke="#1f2937" strokeWidth="2" fill="none"/>
                <path d="M54 37 Q57 34 60 37" stroke="#1f2937" strokeWidth="2" fill="none"/>
                {/* Big smile */}
                <path d="M40 47 Q50 57 60 47" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                {/* Arms - one holding phone */}
                <rect x="10" y="58" width="22" height="10" rx="5" fill="#f59e0b"/>
                <rect x="68" y="58" width="22" height="10" rx="5" fill="#f59e0b"/>
                {/* Phone in hand */}
                <rect x="70" y="50" width="14" height="22" rx="3" fill="#1f2937"/>
                <rect x="72" y="53" width="10" height="14" rx="2" fill="#3b82f6"/>
                {/* Legs */}
                <rect x="33" y="95" width="14" height="20" rx="5" fill="#d97706"/>
                <rect x="53" y="95" width="14" height="20" rx="5" fill="#d97706"/>
                {/* Shoes */}
                <rect x="31" y="110" width="18" height="8" rx="3" fill="#1f2937"/>
                <rect x="51" y="110" width="18" height="8" rx="3" fill="#1f2937"/>
              </svg>
              {/* Speech bubble */}
              <div className="absolute -top-2 -left-8 bg-white border-2 border-gray-900 rounded-2xl px-3 py-1.5 shadow-[3px_3px_0px_0px_#111] text-xs font-black text-gray-900 whitespace-nowrap">
                 Great deal!
                <div className="absolute bottom-0 right-3 w-3 h-3 bg-white border-b-2 border-r-2 border-gray-900 transform rotate-45 translate-y-1.5" />
              </div>
            </div>
            <div className="bg-amber-500 text-white px-4 py-1.5 rounded-full font-black text-sm border-2 border-gray-900 shadow-[3px_3px_0px_0px_#111] mb-2">
              HOMEOWNER
            </div>
            <p className="text-gray-700 text-xs font-bold leading-tight">Gets a deal.<br/>Saves money.</p>
            <div className="mt-2 bg-amber-100 border-2 border-amber-500 rounded-xl px-3 py-1.5 text-amber-700 font-black text-sm">
              Saves 10-15%
            </div>
          </div>
        </div>
      </div>

      {/* Commission breakdown bar */}
      <div className="px-8 py-5 bg-gray-900 border-t-4 border-gray-900">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-black">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
            <span className="text-white">Referring Pro earns <span className="text-green-400">$150</span></span>
          </div>
          <span className="text-gray-500 text-lg">+</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-teal-400 border-2 border-white" />
            <span className="text-white">ProLnk keeps <span className="text-[#0A1628]/70">$125</span></span>
          </div>
          <span className="text-gray-500 text-lg">=</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-violet-400 border-2 border-white" />
            <span className="text-white">Receiving Pro pays <span className="text-violet-400">$275</span> on a <span className="text-yellow-400">$2,500</span> job</span>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mt-3 font-bold">vs. Angi: $80-$200 per unqualified lead  ProLnk: $275 only on a closed $2,500 job</p>
      </div>
    </div>
  );
}
