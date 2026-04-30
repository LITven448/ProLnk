import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
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
import { CheckCircle2, ChevronRight, Home, Heart, DollarSign, Users, Star, Zap } from "lucide-react";

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-500" : score >= 50 ? "text-amber-500" : "text-rose-500";
  const label = score >= 80 ? "Complete" : score >= 50 ? "In Progress" : "Just Started";
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`text-5xl font-bold ${color}`}>{score}%</div>
      <Badge variant={score >= 80 ? "default" : "secondary"}>{label}</Badge>
      <p className="text-xs text-muted-foreground mt-1">Profile Depth</p>
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

export default function Homeowner360Profile() {
  const { data, isLoading, refetch } = trpc.profile360.getMyHomeowner360.useQuery();
  const upsert = trpc.profile360.upsertHomeowner360.useMutation({
    onSuccess: (res) => {
      toast.success(`Profile saved — depth: ${res.completenessScore}%`);
      refetch();
    },
    onError: () => toast.error("Failed to save profile"),
  });

  const p = data?.profile360;
  const [form, setForm] = useState<Record<string, unknown>>({});

  const val = (key: string) => (form[key] !== undefined ? form[key] : (p as any)?.[key]) as any;
  const set = (key: string, value: unknown) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const payload: Record<string, unknown> = {};
    const allKeys = [
      "householdSize", "hasChildren", "lifestyleType", "entertainsFrequently", "workFromHome",
      "budgetComfort", "typicalProjectBudget", "financesBigProjects", "hasHomeWarranty",
      "hasHomeInsurance", "insuranceProvider", "hasMortgage", "decisionMaker", "decisionSpeed",
      "requiresBackground", "communicationStyle", "bestTimeToContact", "responseExpectation",
      "prefersVideoConsult", "planningToSell", "sellTimeframe", "primaryHomeGoal", "dreamProjects",
      "referralMotivation", "hasReferredBefore", "socialMediaActive", "wouldLeaveReview",
      "npsScore", "satisfactionNotes",
    ];
    for (const k of allKeys) {
      const v = val(k);
      if (v !== undefined && v !== "" && v !== null) payload[k] = v;
    }
    upsert.mutate(payload as any);
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const score = p?.completenessScore ?? 0;
  const homeProfile = data?.homeProfile;
  const properties = data?.properties ?? [];

  return (
    <HomeownerLayout>
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">My 360° Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Help us match you with the right pros and personalize your TrustyPro experience.
          </p>
        </div>
        <ScoreRing score={score} />
      </div>

      {/* Home summary strip */}
      {properties.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Properties", value: properties.length, icon: <Home className="w-4 h-4 text-blue-500" /> },
            { label: "Bedrooms", value: properties[0]?.bedrooms ?? "—", icon: <Users className="w-4 h-4 text-purple-500" /> },
            { label: "Sq Ft", value: properties[0]?.sqft ? `${properties[0].sqft.toLocaleString()}` : "—", icon: <Zap className="w-4 h-4 text-amber-500" /> },
            { label: "Year Built", value: properties[0]?.yearBuilt ?? "—", icon: <Star className="w-4 h-4 text-emerald-500" /> },
          ].map(item => (
            <Card key={item.label} className="p-3">
              <div className="flex items-center gap-2">
                {item.icon}
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-bold">{item.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {score < 60 && (
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardContent className="pt-4 pb-3">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              A complete profile helps us find the right pros for your home faster and gives you better AI scan results.
            </p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="lifestyle" className="space-y-4">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto gap-1">
          <TabsTrigger value="lifestyle" className="text-xs gap-1"><Heart className="w-3 h-3" /> Lifestyle</TabsTrigger>
          <TabsTrigger value="finances" className="text-xs gap-1"><DollarSign className="w-3 h-3" /> Finances</TabsTrigger>
          <TabsTrigger value="decisions" className="text-xs gap-1"><Users className="w-3 h-3" /> Decisions</TabsTrigger>
          <TabsTrigger value="home_goals" className="text-xs gap-1"><Home className="w-3 h-3" /> Goals</TabsTrigger>
          <TabsTrigger value="referrals" className="text-xs gap-1"><Star className="w-3 h-3" /> Referrals</TabsTrigger>
          <TabsTrigger value="feedback" className="text-xs gap-1"><Zap className="w-3 h-3" /> Feedback</TabsTrigger>
        </TabsList>

        {/* Lifestyle Tab */}
        <TabsContent value="lifestyle">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Lifestyle & Household</CardTitle>
              <CardDescription>Help us understand who lives in your home.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Household Size" value={val("householdSize")} onChange={v => set("householdSize", v)}
                options={[{ value: "1", label: "Just me" }, { value: "2", label: "2 people" }, { value: "3_to_4", label: "3–4 people" }, { value: "5_plus", label: "5+ people" }]} />
              <SelectField label="Lifestyle Type" value={val("lifestyleType")} onChange={v => set("lifestyleType", v)}
                options={[{ value: "busy_professional", label: "Busy professional" }, { value: "family_focused", label: "Family focused" }, { value: "retiree", label: "Retiree / empty nester" }, { value: "investor", label: "Investor / landlord" }, { value: "weekend_warrior", label: "Weekend warrior / DIYer" }]} />
              <ToggleField label="Has Children at Home" checked={!!val("hasChildren")} onChange={v => set("hasChildren", v)} />
              <ToggleField label="Entertains Frequently" description="Hosts guests, parties, or events regularly" checked={!!val("entertainsFrequently")} onChange={v => set("entertainsFrequently", v)} />
              <ToggleField label="Works from Home" description="Home office or remote work setup" checked={!!val("workFromHome")} onChange={v => set("workFromHome", v)} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Finances Tab */}
        <TabsContent value="finances">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Budget & Financial Profile</CardTitle>
              <CardDescription>Helps us match you with pros who fit your budget.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Budget Comfort" value={val("budgetComfort")} onChange={v => set("budgetComfort", v)}
                options={[{ value: "budget_conscious", label: "Budget conscious — best price wins" }, { value: "value_seeker", label: "Value seeker — quality for fair price" }, { value: "quality_focused", label: "Quality focused — I pay for the best" }, { value: "premium_only", label: "Premium only — top tier always" }]} />
              <SelectField label="Typical Project Budget" value={val("typicalProjectBudget")} onChange={v => set("typicalProjectBudget", v)}
                options={[{ value: "under_500", label: "Under $500" }, { value: "500_to_2k", label: "$500–$2K" }, { value: "2k_to_10k", label: "$2K–$10K" }, { value: "10k_to_50k", label: "$10K–$50K" }, { value: "over_50k", label: "$50K+" }]} />
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Insurance Provider</Label>
                <Input placeholder="e.g. State Farm, Allstate" value={val("insuranceProvider") ?? ""}
                  onChange={e => set("insuranceProvider", e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <ToggleField label="Finances Large Projects" description="Would use financing / payment plans for big jobs" checked={!!val("financesBigProjects")} onChange={v => set("financesBigProjects", v)} />
                <ToggleField label="Has Home Warranty" checked={!!val("hasHomeWarranty")} onChange={v => set("hasHomeWarranty", v)} />
                <ToggleField label="Has Home Insurance" checked={!!val("hasHomeInsurance")} onChange={v => set("hasHomeInsurance", v)} />
                <ToggleField label="Has Mortgage" checked={!!val("hasMortgage")} onChange={v => set("hasMortgage", v)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Decisions Tab */}
        <TabsContent value="decisions">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Hiring & Decision Style</CardTitle>
              <CardDescription>How you choose and communicate with service pros.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Decision Maker" value={val("decisionMaker")} onChange={v => set("decisionMaker", v)}
                options={[{ value: "solo", label: "I decide alone" }, { value: "partner", label: "Me and my partner" }, { value: "committee", label: "Multiple people involved" }]} />
              <SelectField label="Decision Speed" value={val("decisionSpeed")} onChange={v => set("decisionSpeed", v)}
                options={[{ value: "same_day", label: "Same day — I move fast" }, { value: "within_week", label: "Within a week" }, { value: "takes_time", label: "I take my time" }, { value: "research_heavy", label: "Heavy researcher" }]} />
              <SelectField label="Communication Style" value={val("communicationStyle")} onChange={v => set("communicationStyle", v)}
                options={[{ value: "text_first", label: "Text first" }, { value: "call_first", label: "Call first" }, { value: "email_first", label: "Email first" }, { value: "in_app", label: "In-app messaging" }]} />
              <SelectField label="Best Time to Contact" value={val("bestTimeToContact")} onChange={v => set("bestTimeToContact", v)}
                options={[{ value: "morning", label: "Morning (7–11am)" }, { value: "midday", label: "Midday (11am–2pm)" }, { value: "afternoon", label: "Afternoon (2–6pm)" }, { value: "evening", label: "Evening (6–9pm)" }, { value: "anytime", label: "Anytime" }]} />
              <SelectField label="Response Expectation" value={val("responseExpectation")} onChange={v => set("responseExpectation", v)}
                options={[{ value: "within_1h", label: "Within 1 hour" }, { value: "within_4h", label: "Within 4 hours" }, { value: "same_day", label: "Same day" }, { value: "next_day", label: "Next day is fine" }, { value: "flexible", label: "Flexible" }]} />
              <div className="space-y-2">
                <ToggleField label="Requires Background Check" description="I only hire pros who pass a background check" checked={!!val("requiresBackground")} onChange={v => set("requiresBackground", v)} />
                <ToggleField label="Prefers Video Consultation" description="I like video calls before committing to a pro" checked={!!val("prefersVideoConsult")} onChange={v => set("prefersVideoConsult", v)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Home Goals Tab */}
        <TabsContent value="home_goals">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Home Goals & Dream Projects</CardTitle>
              <CardDescription>What you're working toward with your home.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Primary Home Goal" value={val("primaryHomeGoal")} onChange={v => set("primaryHomeGoal", v)}
                options={[
                  { value: "maintain_value", label: "Maintain current value" },
                  { value: "increase_value", label: "Increase property value" },
                  { value: "comfort_upgrade", label: "Comfort upgrades" },
                  { value: "energy_efficiency", label: "Energy efficiency" },
                  { value: "aesthetic_refresh", label: "Aesthetic refresh" },
                  { value: "prepare_to_sell", label: "Prepare to sell" },
                  { value: "rental_income", label: "Rental income" },
                  { value: "age_in_place", label: "Age in place" },
                ]} />
              <SelectField label="Planning to Sell?" value={val("planningToSell") === true ? "yes" : val("planningToSell") === false ? "no" : ""}
                onChange={v => set("planningToSell", v === "yes")}
                options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
              {val("planningToSell") === true && (
                <SelectField label="Sell Timeframe" value={val("sellTimeframe")} onChange={v => set("sellTimeframe", v)}
                  options={[{ value: "within_1yr", label: "Within 1 year" }, { value: "1_to_3yr", label: "1–3 years" }, { value: "3_to_5yr", label: "3–5 years" }, { value: "not_planning", label: "Not planning to sell" }]} />
              )}
              <div className="sm:col-span-2 space-y-1">
                <Label className="text-xs text-muted-foreground">Dream Projects (describe what you'd love to do to your home)</Label>
                <Textarea placeholder="e.g. Remodel the master bath, add a pergola to the backyard, upgrade the kitchen countertops..."
                  value={val("dreamProjects") ?? ""} onChange={e => set("dreamProjects", e.target.value)}
                  className="text-sm min-h-[80px]" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referrals Tab */}
        <TabsContent value="referrals">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Referral & Community</CardTitle>
              <CardDescription>How you like to share and connect with your community.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <SelectField label="Referral Motivation" value={val("referralMotivation")} onChange={v => set("referralMotivation", v)}
                options={[{ value: "credits", label: "Platform credits" }, { value: "cash", label: "Cash rewards" }, { value: "altruism", label: "Helping friends" }, { value: "all", label: "All of the above" }]} />
              <ToggleField label="Has Referred Before" description="You've referred a friend to a service pro or platform" checked={!!val("hasReferredBefore")} onChange={v => set("hasReferredBefore", v)} />
              <ToggleField label="Active on Social Media" description="Would share your experience on Facebook, Instagram, etc." checked={!!val("socialMediaActive")} onChange={v => set("socialMediaActive", v)} />
              <ToggleField label="Would Leave a Review" description="Happy to leave a Google/Yelp review after a great job" checked={!!val("wouldLeaveReview")} onChange={v => set("wouldLeaveReview", v)} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Satisfaction & Feedback</CardTitle>
              <CardDescription>How are we doing? Your feedback shapes the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">How likely are you to recommend TrustyPro? (0–10)</Label>
                <div className="flex gap-1 flex-wrap">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <button key={n} onClick={() => set("npsScore", n)}
                      className={`w-9 h-9 rounded text-sm font-medium border transition-colors ${val("npsScore") === n ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Any notes or suggestions for us?</Label>
                <Textarea placeholder="Tell us what's working, what's not, or what you'd love to see..."
                  value={val("satisfactionNotes") ?? ""} onChange={e => set("satisfactionNotes", e.target.value)}
                  className="text-sm min-h-[80px]" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={upsert.isPending} className="gap-2 px-8">
          {upsert.isPending ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          Save My Profile
        </Button>
      </div>
    </div>
    </HomeownerLayout>
  );
}
