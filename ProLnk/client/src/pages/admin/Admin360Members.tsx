import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Building2, Home, Users, Star, TrendingUp, Search, Eye, CheckCircle, XCircle,
  Phone, Mail, MapPin, Calendar, DollarSign, Zap,
} from "lucide-react";

function ScoreBadge({ score }: { score: number | null }) {
  if (score == null) return <Badge variant="outline" className="text-xs">No data</Badge>;
  const color = score >= 80 ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
    : score >= 50 ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
    : "bg-rose-500/10 text-rose-600 border-rose-500/30";
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium ${color}`}>
      <div className="w-1.5 h-1.5 rounded-full bg-current" />
      {score}% complete
    </div>
  );
}

function InfoRow({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 py-1.5 border-b border-border/30 last:border-0">
      {icon && <span className="text-muted-foreground mt-0.5 shrink-0">{icon}</span>}
      <span className="text-xs text-muted-foreground w-36 shrink-0">{label}</span>
      <span className="text-sm font-medium flex-1">{value ?? <span className="text-muted-foreground/50 text-xs">—</span>}</span>
    </div>
  );
}

function BoolChip({ value, label }: { value: boolean | null | undefined; label: string }) {
  if (value == null) return null;
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${value ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" : "bg-rose-500/10 text-rose-600 border-rose-500/30"}`}>
      {value ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
      {label}
    </span>
  );
}

function PartnerDetailModal({ partnerId, onClose }: { partnerId: number; onClose: () => void }) {
  const { data, isLoading } = trpc.profile360.adminGetMember360.useQuery({ type: "partner", id: partnerId });

  if (isLoading) return (
    <div className="flex items-center justify-center h-48">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );

  if (!data || data.type !== "partner") return <div className="p-8 text-center text-muted-foreground">No data found.</div>;

  const { partner, profile360, user } = data;
  const p = profile360;

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{partner.businessName}</h3>
          <p className="text-sm text-muted-foreground">{partner.businessType} · {partner.tier ?? "scout"} tier</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <Badge variant={partner.status === "approved" ? "default" : "secondary"}>{partner.status}</Badge>
            <ScoreBadge score={p?.completenessScore ?? null} />
          </div>
        </div>
        {p && <Progress value={p.completenessScore ?? 0} className="w-24 h-2 mt-2" />}
      </div>

      <Tabs defaultValue="contact" className="space-y-3">
        <TabsList className="grid grid-cols-4 h-auto">
          <TabsTrigger value="contact" className="text-xs">Contact</TabsTrigger>
          <TabsTrigger value="business" className="text-xs">Business</TabsTrigger>
          <TabsTrigger value="goals" className="text-xs">Goals</TabsTrigger>
          <TabsTrigger value="social" className="text-xs">Social</TabsTrigger>
        </TabsList>

        <TabsContent value="contact">
          <Card><CardContent className="pt-4 space-y-0">
            <InfoRow label="Contact Name" value={partner.contactName} icon={<Users className="w-3 h-3" />} />
            <InfoRow label="Email" value={partner.contactEmail} icon={<Mail className="w-3 h-3" />} />
            <InfoRow label="Phone" value={partner.contactPhone} icon={<Phone className="w-3 h-3" />} />
            <InfoRow label="Website" value={partner.website} icon={<Zap className="w-3 h-3" />} />
            <InfoRow label="Service Area" value={partner.serviceArea} icon={<MapPin className="w-3 h-3" />} />
            <InfoRow label="Applied" value={partner.appliedAt ? new Date(partner.appliedAt).toLocaleDateString() : null} icon={<Calendar className="w-3 h-3" />} />
            {p && <>
              <InfoRow label="Comm. Style" value={p.communicationStyle?.replace(/_/g, " ")} />
              <InfoRow label="Best Time" value={p.bestTimeToContact?.replace(/_/g, " ")} />
            </>}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="business">
          <Card><CardContent className="pt-4 space-y-0">
            {p ? <>
              <InfoRow label="Years in Business" value={p.yearsInBusiness?.replace(/_/g, " ")} />
              <InfoRow label="Team Size" value={p.teamSize?.replace(/_/g, " ")} />
              <InfoRow label="Annual Revenue" value={p.annualRevenue?.replace(/_/g, " ")} />
              <InfoRow label="Business Structure" value={p.businessStructure?.replace(/_/g, " ")} />
              <InfoRow label="Avg Job Size" value={p.avgJobSize?.replace(/_/g, " ")} />
              <InfoRow label="Est. Monthly Jobs" value={p.estimatedMonthlyJobs} />
              <InfoRow label="Preferred Lead" value={p.preferredLeadType} />
              <InfoRow label="Tech Comfort" value={p.techComfortLevel} />
              <InfoRow label="CRM" value={p.currentCrm} />
              <div className="flex flex-wrap gap-1.5 pt-2">
                <BoolChip value={p.isLicensed} label="Licensed" />
                <BoolChip value={p.isInsured} label="Insured" />
                <BoolChip value={p.isBonded} label="Bonded" />
                <BoolChip value={p.hasEmployees} label="Has Employees" />
                <BoolChip value={p.hasSubcontractors} label="Uses Subs" />
              </div>
            </> : <p className="text-sm text-muted-foreground py-4 text-center">No 360 data collected yet.</p>}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card><CardContent className="pt-4 space-y-0">
            {p ? <>
              <InfoRow label="Primary Goal" value={p.primaryGoal?.replace(/_/g, " ")} />
              <InfoRow label="Revenue Goal 12mo" value={p.revenueGoal12mo?.replace(/_/g, " ")} />
              <InfoRow label="Biggest Challenge" value={p.biggestChallenge?.replace(/_/g, " ")} />
              <InfoRow label="Referral Motivation" value={p.referralMotivation?.replace(/_/g, " ")} />
              <div className="flex flex-wrap gap-1.5 pt-2">
                <BoolChip value={p.openToHiring} label="Open to Hiring" />
                <BoolChip value={p.openToFranchise} label="Open to Franchise" />
                <BoolChip value={p.openToAcquisition} label="Open to Acquisition" />
                <BoolChip value={p.willingToReferCompetitors} label="Refers Competitors" />
                <BoolChip value={p.hasExistingReferralNetwork} label="Has Referral Network" />
              </div>
            </> : <p className="text-sm text-muted-foreground py-4 text-center">No 360 data collected yet.</p>}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="social">
          <Card><CardContent className="pt-4 space-y-0">
            {p ? <>
              <InfoRow label="Google Business" value={p.googleBusinessUrl ? <a href={p.googleBusinessUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs">View</a> : null} />
              <InfoRow label="Yelp" value={p.yelpUrl ? <a href={p.yelpUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs">View</a> : null} />
              <InfoRow label="Facebook" value={p.facebookUrl ? <a href={p.facebookUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs">View</a> : null} />
              <InfoRow label="Instagram" value={p.instagramUrl ? <a href={p.instagramUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs">View</a> : null} />
              <InfoRow label="Total Reviews" value={p.totalOnlineReviews} />
              <InfoRow label="Avg Rating" value={p.avgOnlineRating ? `⭐ ${p.avgOnlineRating}` : null} />
            </> : <p className="text-sm text-muted-foreground py-4 text-center">No 360 data collected yet.</p>}
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HomeownerDetailModal({ userId, onClose }: { userId: number; onClose: () => void }) {
  const { data, isLoading } = trpc.profile360.adminGetMember360.useQuery({ type: "homeowner", id: userId });

  if (isLoading) return (
    <div className="flex items-center justify-center h-48">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );

  if (!data || data.type !== "homeowner") return <div className="p-8 text-center text-muted-foreground">No data found.</div>;

  const { user, profile360: p, homeProfile, properties } = data;

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{homeProfile?.displayName ?? user.name ?? "Homeowner"}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <Badge variant="secondary">{properties.length} {properties.length === 1 ? "property" : "properties"}</Badge>
            <ScoreBadge score={p?.completenessScore ?? null} />
          </div>
        </div>
      </div>

      {properties.length > 0 && (
        <Card className="bg-muted/30">
          <CardContent className="pt-3 pb-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">Primary Property</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <InfoRow label="Address" value={properties[0].address} />
              <InfoRow label="Type" value={properties[0].propertyType} />
              <InfoRow label="Sq Ft" value={properties[0].sqft?.toLocaleString()} />
              <InfoRow label="Year Built" value={properties[0].yearBuilt} />
              <InfoRow label="Beds/Baths" value={properties[0].bedrooms ? `${properties[0].bedrooms}bd / ${properties[0].bathrooms}ba` : null} />
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="lifestyle" className="space-y-3">
        <TabsList className="grid grid-cols-3 h-auto">
          <TabsTrigger value="lifestyle" className="text-xs">Lifestyle</TabsTrigger>
          <TabsTrigger value="finances" className="text-xs">Finances</TabsTrigger>
          <TabsTrigger value="goals" className="text-xs">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="lifestyle">
          <Card><CardContent className="pt-4 space-y-0">
            {p ? <>
              <InfoRow label="Household Size" value={p.householdSize?.replace(/_/g, " ")} />
              <InfoRow label="Lifestyle Type" value={p.lifestyleType?.replace(/_/g, " ")} />
              <InfoRow label="Comm. Style" value={p.communicationStyle?.replace(/_/g, " ")} />
              <InfoRow label="Best Time" value={p.bestTimeToContact?.replace(/_/g, " ")} />
              <InfoRow label="Response Expectation" value={p.responseExpectation?.replace(/_/g, " ")} />
              <div className="flex flex-wrap gap-1.5 pt-2">
                <BoolChip value={p.hasChildren} label="Has Children" />
                <BoolChip value={p.entertainsFrequently} label="Entertains" />
                <BoolChip value={p.workFromHome} label="WFH" />
                <BoolChip value={p.requiresBackground} label="Requires BGC" />
                <BoolChip value={p.prefersVideoConsult} label="Video Consult" />
              </div>
            </> : <p className="text-sm text-muted-foreground py-4 text-center">No 360 data collected yet.</p>}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="finances">
          <Card><CardContent className="pt-4 space-y-0">
            {p ? <>
              <InfoRow label="Budget Comfort" value={p.budgetComfort?.replace(/_/g, " ")} />
              <InfoRow label="Typical Budget" value={p.typicalProjectBudget?.replace(/_/g, " ")} />
              <InfoRow label="Insurance Provider" value={p.insuranceProvider} />
              <InfoRow label="Decision Maker" value={p.decisionMaker} />
              <InfoRow label="Decision Speed" value={p.decisionSpeed?.replace(/_/g, " ")} />
              <div className="flex flex-wrap gap-1.5 pt-2">
                <BoolChip value={p.financesBigProjects} label="Finances Projects" />
                <BoolChip value={p.hasHomeWarranty} label="Home Warranty" />
                <BoolChip value={p.hasHomeInsurance} label="Home Insurance" />
                <BoolChip value={p.hasMortgage} label="Has Mortgage" />
              </div>
            </> : <p className="text-sm text-muted-foreground py-4 text-center">No 360 data collected yet.</p>}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card><CardContent className="pt-4 space-y-0">
            {p ? <>
              <InfoRow label="Primary Goal" value={p.primaryHomeGoal?.replace(/_/g, " ")} />
              <InfoRow label="Sell Timeframe" value={p.sellTimeframe?.replace(/_/g, " ")} />
              <InfoRow label="Referral Motivation" value={p.referralMotivation} />
              <InfoRow label="NPS Score" value={p.npsScore != null ? `${p.npsScore}/10` : null} />
              {p.dreamProjects && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Dream Projects</p>
                  <p className="text-sm bg-muted/40 rounded p-2">{p.dreamProjects}</p>
                </div>
              )}
              {p.satisfactionNotes && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Feedback</p>
                  <p className="text-sm bg-muted/40 rounded p-2">{p.satisfactionNotes}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-1.5 pt-2">
                <BoolChip value={p.planningToSell} label="Planning to Sell" />
                <BoolChip value={p.hasReferredBefore} label="Has Referred" />
                <BoolChip value={p.socialMediaActive} label="Social Active" />
                <BoolChip value={p.wouldLeaveReview} label="Would Review" />
              </div>
            </> : <p className="text-sm text-muted-foreground py-4 text-center">No 360 data collected yet.</p>}
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Admin360Members() {
  const [tab, setTab] = useState<"partners" | "homeowners">("partners");
  const [search, setSearch] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
  const [selectedHomeowner, setSelectedHomeowner] = useState<number | null>(null);

  const { data: partnerRows = [], isLoading: loadingPartners } = trpc.profile360.adminListMembers360.useQuery(
    { type: "partners", limit: 50, offset: 0 },
    { enabled: tab === "partners" }
  );
  const { data: homeownerRows = [], isLoading: loadingHomeowners } = trpc.profile360.adminListMembers360.useQuery(
    { type: "homeowners", limit: 50, offset: 0 },
    { enabled: tab === "homeowners" }
  );

  const filteredPartners = (partnerRows as any[]).filter(p =>
    !search || p.businessName?.toLowerCase().includes(search.toLowerCase()) ||
    p.contactEmail?.toLowerCase().includes(search.toLowerCase()) ||
    p.businessType?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredHomeowners = (homeownerRows as any[]).filter(h =>
    !search || h.displayName?.toLowerCase().includes(search.toLowerCase()) ||
    h.userId?.toString().includes(search)
  );

  return (
    <AdminLayout>
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">360° Member Intelligence</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Deep profile data for every partner and homeowner in the network.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Partners", value: partnerRows.length, icon: <Building2 className="w-4 h-4 text-blue-500" /> },
          { label: "Homeowners", value: homeownerRows.length, icon: <Home className="w-4 h-4 text-emerald-500" /> },
          { label: "Partners w/ 360 Data", value: (partnerRows as any[]).filter(p => p.profile360).length, icon: <Star className="w-4 h-4 text-amber-500" /> },
          { label: "Homeowners w/ 360 Data", value: (homeownerRows as any[]).filter(h => h.profile360).length, icon: <TrendingUp className="w-4 h-4 text-purple-500" /> },
        ].map(item => (
          <Card key={item.label} className="p-3">
            <div className="flex items-center gap-2">
              {item.icon}
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-lg font-bold">{item.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, email, trade..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
        </div>
        <Tabs value={tab} onValueChange={v => setTab(v as any)}>
          <TabsList>
            <TabsTrigger value="partners" className="text-xs gap-1"><Building2 className="w-3 h-3" /> Partners</TabsTrigger>
            <TabsTrigger value="homeowners" className="text-xs gap-1"><Home className="w-3 h-3" /> Homeowners</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Partners table */}
      {tab === "partners" && (
        <Card>
          <CardContent className="p-0">
            {loadingPartners ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              </div>
            ) : filteredPartners.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">No partners found.</div>
            ) : (
              <div className="divide-y divide-border">
                {filteredPartners.map((p: any) => (
                  <div key={p.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{p.businessName}</p>
                        <p className="text-xs text-muted-foreground truncate">{p.businessType} · {p.contactEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant={p.status === "approved" ? "default" : "secondary"} className="text-xs hidden sm:inline-flex">{p.status}</Badge>
                      <ScoreBadge score={p.profile360?.completenessScore ?? null} />
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setSelectedPartner(p.id)}>
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Homeowners table */}
      {tab === "homeowners" && (
        <Card>
          <CardContent className="p-0">
            {loadingHomeowners ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              </div>
            ) : filteredHomeowners.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">No homeowners found.</div>
            ) : (
              <div className="divide-y divide-border">
                {filteredHomeowners.map((h: any) => (
                  <div key={h.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Home className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{h.displayName ?? `Homeowner #${h.userId}`}</p>
                        <p className="text-xs text-muted-foreground truncate">User ID: {h.userId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <ScoreBadge score={h.profile360?.completenessScore ?? null} />
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setSelectedHomeowner(h.userId)}>
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Partner detail modal */}
      <Dialog open={selectedPartner != null} onOpenChange={() => setSelectedPartner(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Partner 360° Profile</DialogTitle>
          </DialogHeader>
          {selectedPartner != null && <PartnerDetailModal partnerId={selectedPartner} onClose={() => setSelectedPartner(null)} />}
        </DialogContent>
      </Dialog>

      {/* Homeowner detail modal */}
      <Dialog open={selectedHomeowner != null} onOpenChange={() => setSelectedHomeowner(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Homeowner 360° Profile</DialogTitle>
          </DialogHeader>
          {selectedHomeowner != null && <HomeownerDetailModal userId={selectedHomeowner} onClose={() => setSelectedHomeowner(null)} />}
        </DialogContent>
      </Dialog>
    </div>
    </AdminLayout>
  );
}
