import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2, Target, Users, Wrench, TrendingUp, Share2, Star, CheckCircle2, ChevronRight,
} from "lucide-react";

const SECTION_ICONS: Record<string, React.ReactNode> = {
  business: <Building2 className="w-4 h-4" />,
  goals: <Target className="w-4 h-4" />,
  team: <Users className="w-4 h-4" />,
  operations: <Wrench className="w-4 h-4" />,
  growth: <TrendingUp className="w-4 h-4" />,
  social: <Share2 className="w-4 h-4" />,
};

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-500" : score >= 50 ? "text-amber-500" : "text-rose-500";
  const label = score >= 80 ? "Excellent" : score >= 50 ? "Good" : "Incomplete";
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`text-5xl font-bold ${color}`}>{score}%</div>
      <Badge variant={score >= 80 ? "default" : "secondary"}>{label}</Badge>
      <p className="text-xs text-muted-foreground mt-1">Profile Completeness</p>
      <Progress value={score} className="w-32 h-2 mt-1" />
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder }: {
  label: string; value?: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select value={value ?? ""} onValueChange={onChange}>
        <SelectTrigger className="h-9 text-sm">
          <SelectValue placeholder={placeholder ?? `Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

function ToggleField({ label, description, checked, onChange }: {
  label: string; description?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export default function Partner360Profile() {
  const { data, isLoading, refetch } = trpc.profile360.getMyPartner360.useQuery();
  const upsert = trpc.profile360.upsertPartner360.useMutation({
    onSuccess: (res) => {
      toast.success(`Profile saved — completeness: ${res.completenessScore}%`);
      refetch();
    },
    onError: () => toast.error("Failed to save profile"),
  });

  const p = data?.profile;
  const [form, setForm] = useState<Record<string, unknown>>({});

  const val = (key: string) => (form[key] !== undefined ? form[key] : (p as any)?.[key]) as any;
  const set = (key: string, value: unknown) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const payload: Record<string, unknown> = {};
    const allKeys = [
      "yearsInBusiness", "teamSize", "annualRevenue", "businessStructure",
      "hasEmployees", "hasSubcontractors", "isLicensed", "isInsured", "isBonded",
      "currentCrm", "currentSchedulingTool", "currentInvoicingTool", "usesQuickbooks",
      "techComfortLevel", "primaryGoal", "revenueGoal12mo", "openToHiring", "openToFranchise",
      "openToAcquisition", "communicationStyle", "bestTimeToContact", "preferredLeadType",
      "avgJobSize", "biggestChallenge", "referralMotivation", "willingToReferCompetitors",
      "hasExistingReferralNetwork", "estimatedMonthlyJobs", "googleBusinessUrl", "yelpUrl",
      "facebookUrl", "instagramUrl", "totalOnlineReviews", "avgOnlineRating",
    ];
    for (const k of allKeys) {
      const v = val(k);
      if (v !== undefined && v !== "" && v !== null) payload[k] = v;
    }
    upsert.mutate(payload as any);
  };

  if (isLoading) {
    return (
      <PartnerLayout>
        <div className="p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </PartnerLayout>
    );
  }

  const score = p?.completenessScore ?? 0;

  return (
    <PartnerLayout>
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">360° Partner Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">
            The more you share, the better we can match you with high-value leads and network partners.
          </p>
        </div>
        <ScoreRing score={score} />
      </div>

      {/* Completeness tips */}
      {score < 80 && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="pt-4 pb-3">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              Complete your profile to unlock premium lead matching and higher visibility in the ProLnk network.
            </p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="business" className="space-y-4">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto gap-1">
          <TabsTrigger value="business" className="text-xs gap-1">{SECTION_ICONS.business} Business</TabsTrigger>
          <TabsTrigger value="team" className="text-xs gap-1">{SECTION_ICONS.team} Team</TabsTrigger>
          <TabsTrigger value="operations" className="text-xs gap-1">{SECTION_ICONS.operations} Ops</TabsTrigger>
          <TabsTrigger value="goals" className="text-xs gap-1">{SECTION_ICONS.goals} Goals</TabsTrigger>
          <TabsTrigger value="growth" className="text-xs gap-1">{SECTION_ICONS.growth} Growth</TabsTrigger>
          <TabsTrigger value="social" className="text-xs gap-1">{SECTION_ICONS.social} Social</TabsTrigger>
        </TabsList>

        {/* Business Tab */}
        <TabsContent value="business">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Business Overview</CardTitle>
              <CardDescription>Tell us about your business structure and scale.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Years in Business" value={val("yearsInBusiness")} onChange={v => set("yearsInBusiness", v)}
                options={[{ value: "under_1", label: "Under 1 year" }, { value: "1_to_3", label: "1–3 years" }, { value: "3_to_7", label: "3–7 years" }, { value: "7_to_15", label: "7–15 years" }, { value: "over_15", label: "15+ years" }]} />
              <SelectField label="Annual Revenue" value={val("annualRevenue")} onChange={v => set("annualRevenue", v)}
                options={[{ value: "under_100k", label: "Under $100K" }, { value: "100k_to_500k", label: "$100K–$500K" }, { value: "500k_to_1m", label: "$500K–$1M" }, { value: "1m_to_5m", label: "$1M–$5M" }, { value: "over_5m", label: "$5M+" }]} />
              <SelectField label="Business Structure" value={val("businessStructure")} onChange={v => set("businessStructure", v)}
                options={[{ value: "sole_prop", label: "Sole Proprietorship" }, { value: "llc", label: "LLC" }, { value: "s_corp", label: "S-Corp" }, { value: "c_corp", label: "C-Corp" }, { value: "partnership", label: "Partnership" }]} />
              <SelectField label="Average Job Size" value={val("avgJobSize")} onChange={v => set("avgJobSize", v)}
                options={[{ value: "under_500", label: "Under $500" }, { value: "500_to_2k", label: "$500–$2K" }, { value: "2k_to_10k", label: "$2K–$10K" }, { value: "over_10k", label: "$10K+" }]} />
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Estimated Monthly Jobs</Label>
                <Input type="number" min={0} placeholder="e.g. 25" value={val("estimatedMonthlyJobs") ?? ""}
                  onChange={e => set("estimatedMonthlyJobs", parseInt(e.target.value) || 0)} className="h-9 text-sm" />
              </div>
              <SelectField label="Preferred Lead Type" value={val("preferredLeadType")} onChange={v => set("preferredLeadType", v)}
                options={[{ value: "residential", label: "Residential" }, { value: "commercial", label: "Commercial" }, { value: "both", label: "Both" }]} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Team & Credentials</CardTitle>
              <CardDescription>Help homeowners understand who will be showing up at their door.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SelectField label="Team Size" value={val("teamSize")} onChange={v => set("teamSize", v)}
                options={[{ value: "solo", label: "Solo operator" }, { value: "2_to_5", label: "2–5 people" }, { value: "6_to_15", label: "6–15 people" }, { value: "16_to_50", label: "16–50 people" }, { value: "over_50", label: "50+ people" }]} />
              <div className="space-y-1">
                <ToggleField label="Has W-2 Employees" description="You employ staff directly" checked={!!val("hasEmployees")} onChange={v => set("hasEmployees", v)} />
                <ToggleField label="Uses Subcontractors" description="You work with 1099 subs" checked={!!val("hasSubcontractors")} onChange={v => set("hasSubcontractors", v)} />
                <ToggleField label="Licensed" description="Holds required state/local license" checked={!!val("isLicensed")} onChange={v => set("isLicensed", v)} />
                <ToggleField label="Insured" description="Carries general liability insurance" checked={!!val("isInsured")} onChange={v => set("isInsured", v)} />
                <ToggleField label="Bonded" description="Carries a surety bond" checked={!!val("isBonded")} onChange={v => set("isBonded", v)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operations Tab */}
        <TabsContent value="operations">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Operations & Tech Stack</CardTitle>
              <CardDescription>How you run your business day-to-day.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Current CRM</Label>
                <Input placeholder="e.g. Jobber, ServiceTitan, None" value={val("currentCrm") ?? ""}
                  onChange={e => set("currentCrm", e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Scheduling Tool</Label>
                <Input placeholder="e.g. Google Calendar, Housecall Pro" value={val("currentSchedulingTool") ?? ""}
                  onChange={e => set("currentSchedulingTool", e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Invoicing Tool</Label>
                <Input placeholder="e.g. QuickBooks, Wave, Invoice Simple" value={val("currentInvoicingTool") ?? ""}
                  onChange={e => set("currentInvoicingTool", e.target.value)} className="h-9 text-sm" />
              </div>
              <SelectField label="Tech Comfort Level" value={val("techComfortLevel")} onChange={v => set("techComfortLevel", v)}
                options={[{ value: "low", label: "Low — I prefer phone calls" }, { value: "medium", label: "Medium — I use apps daily" }, { value: "high", label: "High — I love new tools" }]} />
              <SelectField label="Communication Style" value={val("communicationStyle")} onChange={v => set("communicationStyle", v)}
                options={[{ value: "text_first", label: "Text first" }, { value: "call_first", label: "Call first" }, { value: "email_first", label: "Email first" }, { value: "in_app", label: "In-app only" }]} />
              <SelectField label="Best Time to Contact" value={val("bestTimeToContact")} onChange={v => set("bestTimeToContact", v)}
                options={[{ value: "morning", label: "Morning (7–11am)" }, { value: "midday", label: "Midday (11am–2pm)" }, { value: "afternoon", label: "Afternoon (2–6pm)" }, { value: "evening", label: "Evening (6–9pm)" }, { value: "anytime", label: "Anytime" }]} />
              <div className="sm:col-span-2">
                <ToggleField label="Uses QuickBooks" checked={!!val("usesQuickbooks")} onChange={v => set("usesQuickbooks", v)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Business Goals</CardTitle>
              <CardDescription>What you're working toward in the next 12 months.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Primary Goal" value={val("primaryGoal")} onChange={v => set("primaryGoal", v)}
                options={[
                  { value: "more_leads", label: "More leads" }, { value: "higher_revenue", label: "Higher revenue" },
                  { value: "expand_team", label: "Expand team" }, { value: "new_service_areas", label: "New service areas" },
                  { value: "add_services", label: "Add services" }, { value: "passive_income", label: "Passive income" },
                  { value: "network_growth", label: "Network growth" }, { value: "brand_building", label: "Brand building" },
                ]} />
              <SelectField label="12-Month Revenue Goal" value={val("revenueGoal12mo")} onChange={v => set("revenueGoal12mo", v)}
                options={[{ value: "under_100k", label: "Under $100K" }, { value: "100k_to_250k", label: "$100K–$250K" }, { value: "250k_to_500k", label: "$250K–$500K" }, { value: "500k_to_1m", label: "$500K–$1M" }, { value: "over_1m", label: "$1M+" }]} />
              <SelectField label="Biggest Challenge" value={val("biggestChallenge")} onChange={v => set("biggestChallenge", v)}
                options={[
                  { value: "finding_leads", label: "Finding leads" }, { value: "closing_jobs", label: "Closing jobs" },
                  { value: "collecting_payment", label: "Collecting payment" }, { value: "managing_schedule", label: "Managing schedule" },
                  { value: "hiring_staff", label: "Hiring staff" }, { value: "marketing", label: "Marketing" },
                  { value: "customer_retention", label: "Customer retention" }, { value: "cash_flow", label: "Cash flow" },
                ]} />
              <div className="space-y-2">
                <ToggleField label="Open to Hiring" description="Would expand your team with the right leads" checked={!!val("openToHiring")} onChange={v => set("openToHiring", v)} />
                <ToggleField label="Open to Franchise" description="Would consider franchising your model" checked={!!val("openToFranchise")} onChange={v => set("openToFranchise", v)} />
                <ToggleField label="Open to Acquisition" description="Would consider acquiring another business" checked={!!val("openToAcquisition")} onChange={v => set("openToAcquisition", v)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Growth Tab */}
        <TabsContent value="growth">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Referral & Growth Mindset</CardTitle>
              <CardDescription>How you think about growing through the ProLnk network.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SelectField label="Referral Motivation" value={val("referralMotivation")} onChange={v => set("referralMotivation", v)}
                options={[{ value: "money", label: "Commission / money" }, { value: "relationships", label: "Building relationships" }, { value: "reciprocity", label: "Getting referrals back" }, { value: "all_of_above", label: "All of the above" }]} />
              <ToggleField label="Willing to Refer Competitors" description="Would send overflow jobs to other pros in your trade" checked={!!val("willingToReferCompetitors")} onChange={v => set("willingToReferCompetitors", v)} />
              <ToggleField label="Has Existing Referral Network" description="You already exchange leads with other businesses" checked={!!val("hasExistingReferralNetwork")} onChange={v => set("hasExistingReferralNetwork", v)} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Online Presence</CardTitle>
              <CardDescription>Your digital footprint helps homeowners trust you before they call.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Google Business URL</Label>
                <Input placeholder="https://g.page/..." value={val("googleBusinessUrl") ?? ""}
                  onChange={e => set("googleBusinessUrl", e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Yelp URL</Label>
                <Input placeholder="https://yelp.com/biz/..." value={val("yelpUrl") ?? ""}
                  onChange={e => set("yelpUrl", e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Facebook Page URL</Label>
                <Input placeholder="https://facebook.com/..." value={val("facebookUrl") ?? ""}
                  onChange={e => set("facebookUrl", e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Instagram URL</Label>
                <Input placeholder="https://instagram.com/..." value={val("instagramUrl") ?? ""}
                  onChange={e => set("instagramUrl", e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Total Online Reviews (all platforms)</Label>
                <Input type="number" min={0} placeholder="e.g. 142" value={val("totalOnlineReviews") ?? ""}
                  onChange={e => set("totalOnlineReviews", parseInt(e.target.value) || 0)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Average Rating (e.g. 4.8)</Label>
                <Input placeholder="4.8" value={val("avgOnlineRating") ?? ""}
                  onChange={e => set("avgOnlineRating", e.target.value)} className="h-9 text-sm" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={upsert.isPending} className="gap-2 px-8">
          {upsert.isPending ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          Save 360° Profile
        </Button>
      </div>
    </div>
    </PartnerLayout>
  );
}
