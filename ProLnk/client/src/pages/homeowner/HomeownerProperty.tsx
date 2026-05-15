/**
 * My Home Profile Summary — real data from wizard
 */
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  Home, TrendingUp, Shield, CheckCircle, AlertTriangle,
  Camera, Wrench, Sparkles, Palette, Zap, Droplets, Waves,
  TreePine, Flame, Building2, Leaf,
  Plus, ArrowRight, ChevronDown, ChevronUp, RefreshCw, MapPin, Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SYSTEM_META: Record<string, { label: string; icon: any; color: string }> = {
  hvac:          { label: "HVAC / AC",          icon: Zap,       color: "#3B82F6" },
  roof:          { label: "Roof",                icon: Home,      color: "#6B7280" },
  plumbing:      { label: "Plumbing",            icon: Droplets,  color: "#0EA5E9" },
  electrical:    { label: "Electrical",          icon: Zap,       color: "#F59E0B" },
  pool:          { label: "Pool / Spa",          icon: Waves,     color: "#06B6D4" },
  lawn:          { label: "Lawn / Irrigation",   icon: TreePine,  color: "#10B981" },
  security:      { label: "Security System",     icon: Shield,    color: "#8B5CF6" },
  foundation:    { label: "Foundation",          icon: Building2, color: "#78716C" },
  windows_doors: { label: "Windows & Doors",     icon: Home,      color: "#64748B" },
  fireplace:     { label: "Fireplace / Chimney", icon: Flame,     color: "#EF4444" },
  solar:         { label: "Solar / Battery",     icon: Zap,       color: "#EAB308" },
  pest:          { label: "Pest Control",        icon: Shield,    color: "#84CC16" },
  fence:         { label: "Fence / Gate",        icon: Leaf,      color: "#A3A3A3" },
  driveway:      { label: "Driveway / Concrete", icon: Building2, color: "#9CA3AF" },
  generator:     { label: "Generator",           icon: Zap,       color: "#F97316" },
  water_softener:{ label: "Water Softener",      icon: Droplets,  color: "#38BDF8" },
};
const AGE_LABELS: Record<string, string> = {
  "0_2":"0–2 yrs","3_5":"3–5 yrs","6_10":"6–10 yrs","11_15":"11–15 yrs","over_15":"15+ yrs","unknown":"Unknown age",
};
const URGENCY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  within_30_days:  { label: "Within 30 days",  color: "#DC2626", bg: "#FEE2E2" },
  "1_to_3_months": { label: "1–3 months",      color: "#D97706", bg: "#FEF3C7" },
  "3_to_6_months": { label: "3–6 months",      color: "#059669", bg: "#D1FAE5" },
  "6_to_12_months":{ label: "6–12 months",     color: "#0891B2", bg: "#E0F2FE" },
  just_researching:{ label: "Just researching",color: "#6B7280", bg: "#F3F4F6" },
};
const BUDGET_LABELS: Record<string, string> = {
  under_1k:"Under $1K","1k_5k":"$1K–$5K","5k_15k":"$5K–$15K","15k_50k":"$15K–$50K",over_50k:"Over $50K",not_sure:"Budget TBD",
};
const LOT_LABELS: Record<string, string> = {
  under_0_25:"Under ¼ acre","0_25_to_0_5":"¼–½ acre","0_5_to_1":"½–1 acre",over_1:"Over 1 acre",
};
const OWNERSHIP_LABELS: Record<string, string> = {
  under_1:"< 1 year","1_to_3":"1–3 years","3_to_7":"3–7 years","7_to_15":"7–15 years",over_15:"15+ years",
};

function Section({ title, icon: Icon, count, children, defaultOpen = true }: {
  title: string; icon: any; count?: number; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-[#1B4FD8]" />
          <span className="text-sm font-bold text-gray-900">{title}</span>
          {count !== undefined && (
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#1B4FD8]">{count}</span>
          )}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="border-t border-slate-50">{children}</div>}
    </div>
  );
}

export default function HomeownerProperty() {
  const { data: properties, isLoading: propsLoading, refetch: refetchProps } = trpc.homeowner.getMyProperties.useQuery();
  const primaryProperty = useMemo(() => (properties as any[])?.[0] ?? null, [properties]);
  const propertyId = primaryProperty?.id ?? null;

  const { data: improvements = [] } = trpc.homeowner.getImprovements.useQuery(
    { propertyId: propertyId! }, { enabled: !!propertyId }
  );
  const { data: wishes = [] } = trpc.homeowner.getWishes.useQuery(
    { propertyId: propertyId! }, { enabled: !!propertyId }
  );
  const { data: photos = [] } = trpc.homeowner.getPropertyPhotos.useQuery(
    { propertyId: propertyId! }, { enabled: !!propertyId }
  );

  const uploadMockupPhoto = trpc.homeowner.uploadMockupPhoto.useMutation();
  const generateMockup = trpc.homeowner.generateMockup.useMutation();
  const [generatingMockup, setGeneratingMockup] = useState(false);
  const [mockupError, setMockupError] = useState<string | null>(null);

  if (propsLoading) {
    return (
      <HomeownerLayout>
        <div className="p-6 max-w-4xl mx-auto space-y-4">
          {[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl border border-slate-100 h-32 animate-pulse" />)}
        </div>
      </HomeownerLayout>
    );
  }

  if (!primaryProperty) {
    return (
      <HomeownerLayout>
        <div className="p-6 max-w-xl mx-auto text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-[#1B4FD8]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No property profile yet</h2>
          <p className="text-gray-500 text-sm mb-6">Complete the home setup wizard to build your property profile and unlock AI-powered maintenance suggestions.</p>
          <Link href="/my-home/setup">
            <Button className="gap-2" style={{ backgroundColor: "#1B4FD8" }}>
              <Sparkles className="w-4 h-4" /> Start Home Profile
            </Button>
          </Link>
        </div>
      </HomeownerLayout>
    );
  }

  const homeSystems: string[] = primaryProperty.homeSystems ?? [];
  const systemAges: Record<string, string> = primaryProperty.systemAges ?? {};
  const stylePrefs = primaryProperty.stylePreferences as Record<string, string> | null;
  const hiringPriorities: string[] = primaryProperty.hiringPriorities ?? [];
  const aiMockupUrl = primaryProperty.aiMockupUrl as string | null;
  const aiMockupStatus = (primaryProperty.aiMockupStatus ?? "pending") as string;
  const aiMockupSourcePhotoUrl = primaryProperty.aiMockupSourcePhotoUrl as string | null;

  const healthScore = Math.min(100, Math.round(
    40 +
    (homeSystems.length > 0 ? 10 : 0) +
    ((improvements as any[]).length > 0 ? 15 : 0) +
    ((photos as any[]).length > 0 ? 15 : 0) +
    (stylePrefs ? 10 : 0) +
    ((wishes as any[]).length > 0 ? 10 : 0)
  ));

  const urgencyOrder = ["within_30_days","1_to_3_months","3_to_6_months","6_to_12_months","just_researching"];
  const sortedWishes = [...(wishes as any[])].sort(
    (a, b) => urgencyOrder.indexOf(a.urgency) - urgencyOrder.indexOf(b.urgency)
  );

  async function handleMockupPhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !propertyId) return;
    setMockupError(null);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = (ev.target?.result as string).split(",")[1];
      try {
        await uploadMockupPhoto.mutateAsync({ propertyId, photoBase64: base64, mimeType: file.type });
        toast.success("Photo uploaded — generating AI mockup…");
        setGeneratingMockup(true);
        try {
          await generateMockup.mutateAsync({ propertyId });
          refetchProps();
        } catch (err: any) { setMockupError(err.message ?? "Mockup generation failed."); }
        setGeneratingMockup(false);
      } catch (err: any) { setMockupError(err.message ?? "Upload failed."); }
    };
    reader.readAsDataURL(file);
  }

  return (
    <HomeownerLayout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Home className="w-6 h-6 text-[#1B4FD8]" />
              My Home Profile
            </h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {primaryProperty.address}{primaryProperty.city ? `, ${primaryProperty.city}` : ""}{primaryProperty.state ? `, ${primaryProperty.state}` : ""}
            </p>
          </div>
          <Link href="/my-home/setup">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs border-[#1B4FD8] text-[#1B4FD8] hover:bg-[#EFF6FF]">
              Edit Profile
            </Button>
          </Link>
        </div>

        {/* Health Score */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#1B4FD8]" /> Profile Completeness
              </p>
              <div className="text-3xl font-black text-gray-900">{healthScore}<span className="text-lg text-gray-300 font-normal">/100</span></div>
              <p className="text-xs text-gray-400 mt-1">
                {healthScore < 70 ? "Add systems, photos, and wish list items to improve your score" :
                 healthScore < 90 ? "Almost complete — add more photos or wish list items" :
                 "Excellent profile — your home data is working for you"}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-400 mb-0.5">Property Type</p>
              <div className="text-sm font-bold text-gray-700 capitalize">{(primaryProperty.propertyType ?? "single_family").replace(/_/g, " ")}</div>
              {primaryProperty.ownershipYears && (
                <p className="text-xs text-gray-400 mt-1">{OWNERSHIP_LABELS[primaryProperty.ownershipYears] ?? ""} owned</p>
              )}
            </div>
          </div>
          <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="h-2 rounded-full transition-all duration-700"
              style={{ width: `${healthScore}%`, background: "linear-gradient(90deg, #1B4FD8, #10B981)" }} />
          </div>
        </div>

        {/* Property Basics */}
        <Section title="Property Basics" icon={Home}>
          <div className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { label: "Year Built", value: primaryProperty.yearBuilt?.toString() ?? "—" },
                { label: "Square Feet", value: primaryProperty.sqft ? primaryProperty.sqft.toLocaleString() : "—" },
                { label: "Bedrooms",   value: primaryProperty.bedrooms?.toString() ?? "—" },
                { label: "Bathrooms",  value: primaryProperty.bathrooms?.toString() ?? "—" },
              ].map(item => (
                <div key={item.label} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {primaryProperty.lotSize && <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">{LOT_LABELS[primaryProperty.lotSize] ?? primaryProperty.lotSize}</span>}
              {primaryProperty.hasPool && <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">Pool</span>}
              {primaryProperty.hasGarage && <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">Garage ({primaryProperty.garageType ?? "attached"})</span>}
              {primaryProperty.hasFence && <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-600 font-medium">Fenced</span>}
              {primaryProperty.isRental && <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 font-medium">Rental</span>}
            </div>
            {hiringPriorities.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-50">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hiring Priorities</p>
                <div className="flex flex-wrap gap-1.5">
                  {hiringPriorities.map((p: string) => (
                    <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1B4FD8] font-medium">{p}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* Home Systems */}
        <Section title="Home Systems" icon={Wrench} count={homeSystems.length}>
          {homeSystems.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500 mb-3">No systems added yet</p>
              <Link href="/my-home/setup"><Button variant="outline" size="sm" className="gap-1.5 text-xs"><Plus className="w-3.5 h-3.5" /> Add Systems</Button></Link>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {homeSystems.map((sysId: string) => {
                const meta = SYSTEM_META[sysId] ?? { label: sysId, icon: Wrench, color: "#6B7280" };
                const Icon = meta.icon;
                const age = systemAges[sysId];
                const ageLabel = age ? AGE_LABELS[age] ?? age : null;
                const isAging = age === "11_15" || age === "over_15";
                return (
                  <div key={sysId} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${meta.color}15` }}>
                      <Icon className="w-4 h-4" style={{ color: meta.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{meta.label}</p>
                      {ageLabel && <p className={`text-xs ${isAging ? "text-amber-600 font-medium" : "text-gray-400"}`}>{ageLabel}{isAging ? " — consider replacement" : ""}</p>}
                    </div>
                    {isAging && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                  </div>
                );
              })}
            </div>
          )}
        </Section>

        {/* Past Improvements */}
        <Section title="Past Improvements" icon={CheckCircle} count={(improvements as any[]).length} defaultOpen={(improvements as any[]).length > 0}>
          {(improvements as any[]).length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500 mb-3">No improvements logged yet</p>
              <Link href="/my-home/setup"><Button variant="outline" size="sm" className="gap-1.5 text-xs"><Plus className="w-3.5 h-3.5" /> Add Improvements</Button></Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {(improvements as any[]).map((imp: any, i: number) => (
                <div key={i} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{imp.category}</p>
                      <p className="text-xs text-gray-400">
                        {imp.completedYear ? `Completed ${imp.completedYear}` : "Year unknown"}
                        {imp.cost ? ` · $${Number(imp.cost).toLocaleString()}` : ""}
                      </p>
                    </div>
                  </div>
                  {imp.hasWarranty && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">Warranty</span>}
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Wish List */}
        <Section title="Project Wish List" icon={Heart} count={sortedWishes.length} defaultOpen={sortedWishes.length > 0}>
          {sortedWishes.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500 mb-3">No wish list items yet</p>
              <Link href="/my-home/setup"><Button variant="outline" size="sm" className="gap-1.5 text-xs"><Plus className="w-3.5 h-3.5" /> Add Projects</Button></Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {sortedWishes.map((wish: any, i: number) => {
                const urg = URGENCY_CONFIG[wish.urgency] ?? URGENCY_CONFIG["just_researching"];
                return (
                  <div key={i} className="flex items-center justify-between px-5 py-3 gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: urg.bg }}>
                        <Heart className="w-3.5 h-3.5" style={{ color: urg.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{wish.category}</p>
                        <p className="text-xs text-gray-400">{BUDGET_LABELS[wish.budgetRange] ?? "Budget TBD"}{wish.notes ? ` · ${wish.notes}` : ""}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap"
                      style={{ backgroundColor: urg.bg, color: urg.color }}>{urg.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Section>

        {/* Style Preferences & AI Mockup */}
        <Section title="Style Preferences & AI Mockup" icon={Palette} defaultOpen={!!stylePrefs}>
          {stylePrefs ? (
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {stylePrefs.homeStyle && <div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Home Style</p><p className="text-sm font-semibold text-gray-800">{stylePrefs.homeStyle}</p></div>}
                {stylePrefs.exteriorColor && <div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Exterior Color</p><p className="text-sm font-semibold text-gray-800">{stylePrefs.exteriorColor}</p></div>}
                {stylePrefs.interiorPalette && <div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Interior Palette</p><p className="text-sm font-semibold text-gray-800">{stylePrefs.interiorPalette}</p></div>}
                {stylePrefs.designAesthetic && <div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Aesthetic</p><p className="text-sm font-semibold text-gray-800">{stylePrefs.designAesthetic}</p></div>}
              </div>
              {stylePrefs.styleNotes && <p className="text-xs text-gray-500 italic">"{stylePrefs.styleNotes}"</p>}
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#1B4FD8]" /> AI Renovation Preview
                </p>
                {aiMockupUrl && aiMockupStatus === "ready" ? (
                  <div className="relative rounded-xl overflow-hidden" style={{ height: 220 }}>
                    <img src={aiMockupUrl} alt="AI renovation mockup" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-end p-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }}>
                      <div className="flex-1"><p className="text-white text-xs font-semibold">AI Renovation Preview</p><p className="text-white/70 text-xs">Based on your {stylePrefs.homeStyle ?? "style"} preferences</p></div>
                      <label className="cursor-pointer"><input type="file" accept="image/*" className="hidden" onChange={handleMockupPhotoUpload} /><span className="text-xs px-2 py-1 rounded-lg font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}>Regenerate</span></label>
                    </div>
                  </div>
                ) : aiMockupStatus === "processing" || generatingMockup ? (
                  <div className="rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 h-32 flex items-center justify-center">
                    <div className="text-center"><div className="w-6 h-6 border-2 border-[#1B4FD8] border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-xs text-gray-500">Generating AI mockup…</p></div>
                  </div>
                ) : (
                  <div className="rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 p-6 text-center">
                    <Camera className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-600 mb-1">Upload a photo to generate a mockup</p>
                    <p className="text-xs text-gray-400 mb-3">Our AI will show you what your home could look like with renovations</p>
                    <label className="cursor-pointer"><input type="file" accept="image/*" className="hidden" onChange={handleMockupPhotoUpload} /><span className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg" style={{ backgroundColor: "#1B4FD8", color: "white" }}><Camera className="w-3.5 h-3.5" /> Upload Photo</span></label>
                    {aiMockupSourcePhotoUrl && (
                      <div className="mt-3">
                        <img src={aiMockupSourcePhotoUrl} alt="Source" className="w-full h-24 object-cover rounded-lg" />
                      </div>
                    )}
                    {mockupError && <p className="text-xs text-red-500 mt-2">{mockupError}</p>}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Palette className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-700 mb-1">No style preferences yet</p>
              <p className="text-xs text-gray-400 mb-4">Add your style preferences to unlock AI-generated renovation mockups.</p>
              <Link href="/my-home/setup"><Button size="sm" className="gap-1.5 text-xs" style={{ backgroundColor: "#1B4FD8" }}><Sparkles className="w-3.5 h-3.5" /> Add Style Preferences</Button></Link>
            </div>
          )}
        </Section>

        {/* Property Photos */}
        <Section title="Property Photos" icon={Camera} count={(photos as any[]).length} defaultOpen={(photos as any[]).length > 0}>
          {(photos as any[]).length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500 mb-3">No photos uploaded yet</p>
              <Link href="/my-home/photos"><Button variant="outline" size="sm" className="gap-1.5 text-xs"><Camera className="w-3.5 h-3.5" /> Upload Photos</Button></Link>
            </div>
          ) : (
            <div className="p-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {(photos as any[]).slice(0, 12).map((photo: any, i: number) => (
                  <div key={i} className="relative rounded-xl overflow-hidden aspect-square bg-slate-100">
                    <img src={photo.url} alt={photo.roomLabel ?? `Photo ${i + 1}`} className="w-full h-full object-cover" />
                    {photo.roomLabel && (
                      <div className="absolute bottom-0 inset-x-0 bg-black/40 px-1.5 py-1">
                        <p className="text-[9px] text-white font-medium capitalize">{photo.roomLabel.replace(/_/g, " ")}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {(photos as any[]).length > 12 && <p className="text-center text-xs text-gray-400 mt-3">+{(photos as any[]).length - 12} more photos</p>}
              <div className="mt-3 text-center">
                <Link href="/my-home/photos"><span className="text-xs font-semibold text-[#1B4FD8] hover:underline cursor-pointer flex items-center justify-center gap-1">Manage Photos <ArrowRight className="w-3 h-3" /></span></Link>
              </div>
            </div>
          )}
        </Section>

        {/* Re-scan CTA */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1B4FD8] rounded-2xl p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Re-scan My Home
            </p>
            <p className="text-white/70 text-xs mt-0.5">Update your profile after new work is completed to refresh your AI match score.</p>
          </div>
          <Link href="/my-home/setup">
            <Button size="sm" className="bg-white text-[#0A1628] hover:bg-white/90 font-bold text-xs flex-shrink-0">Update Profile</Button>
          </Link>
        </div>

      </div>
    </HomeownerLayout>
  );
}
