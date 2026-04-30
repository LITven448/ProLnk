import os

base = "/home/ubuntu/duke-partners/client/src/pages/homeowner"

pages = {}

pages["HomeownerInvoices.tsx"] = '''import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { FileText, Download, DollarSign, Clock, CheckCircle } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(Number(n ?? 0) / 100);
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-600",
};

export default function HomeownerInvoices() {
  const { data: deals, isLoading } = trpc.homeowner.getMyDeals.useQuery();
  const { data: milestones } = trpc.payments.getMilestonesForDeal.useQuery({ dealId: 0 }, { enabled: false });

  const allDeals = deals ?? [];
  const totalPaid = allDeals.filter((d: any) => d.status === "completed").reduce((s: number, d: any) => s + Number(d.jobValueCents ?? 0), 0);
  const totalPending = allDeals.filter((d: any) => d.status === "active").reduce((s: number, d: any) => s + Number(d.jobValueCents ?? 0), 0);

  return (
    <HomeownerLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Invoices</h1>
          <p className="text-muted-foreground">Payment history and outstanding balances for all your home service jobs</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Total Paid</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{fmt(totalPaid)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <div className="text-2xl font-bold text-amber-600">{fmt(totalPending)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Total Jobs</span>
              </div>
              <div className="text-2xl font-bold">{allDeals.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading invoices…</div>}
            {!isLoading && allDeals.length === 0 && (
              <div className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                <div className="text-muted-foreground">No invoices yet. Once you hire a pro, your invoices will appear here.</div>
              </div>
            )}
            <div className="space-y-3">
              {allDeals.map((deal: any) => (
                <div key={deal.id} className="border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{deal.serviceType ?? "Home Service"}</span>
                        <Badge className={STATUS_COLORS[deal.status] ?? "bg-gray-100 text-gray-700"}>{deal.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {deal.partnerName && <span>Pro: {deal.partnerName} · </span>}
                        {deal.createdAt && <span>{new Date(deal.createdAt).toLocaleDateString()}</span>}
                      </div>
                      {deal.notes && <div className="text-sm text-muted-foreground mt-1 italic">"{deal.notes}"</div>}
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold">{fmt(deal.jobValueCents ?? 0)}</div>
                      {deal.stripePaymentIntentId && (
                        <Button variant="ghost" size="sm" className="text-xs mt-1 gap-1">
                          <Download className="h-3 w-3" /> Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </HomeownerLayout>
  );
}
'''

pages["HomeownerMessages.tsx"] = '''import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { MessageSquare, Phone, Mail, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function HomeownerMessages() {
  const { data: deals, isLoading } = trpc.homeowner.getMyDeals.useQuery();
  const [search, setSearch] = useState("");

  const activeDeals = (deals ?? []).filter((d: any) => d.status === "active" || d.status === "pending");
  const filtered = activeDeals.filter((d: any) =>
    !search || d.partnerName?.toLowerCase().includes(search.toLowerCase()) || d.serviceType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <HomeownerLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Contact your service pros for active jobs</p>
        </div>

        <div className="relative">
          <Input
            placeholder="Search by pro name or service…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-4"
          />
        </div>

        {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}

        {!isLoading && activeDeals.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
              <div className="text-muted-foreground">No active jobs right now.</div>
              <div className="text-sm text-muted-foreground mt-1">Once you hire a pro, you can contact them here.</div>
              <Link href="/my-home/request-pro">
                <Button className="mt-4">Find a Pro</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {filtered.map((deal: any) => (
            <Card key={deal.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{deal.partnerName ?? "Your Pro"}</span>
                      <Badge className="bg-blue-100 text-blue-700">{deal.serviceType ?? "Service"}</Badge>
                      <Badge className={deal.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>{deal.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Job started: {deal.createdAt ? new Date(deal.createdAt).toLocaleDateString() : "—"}
                    </div>
                    {deal.partnerPhone && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Phone className="h-3 w-3" /> {deal.partnerPhone}
                      </div>
                    )}
                    {deal.partnerEmail && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <Mail className="h-3 w-3" /> {deal.partnerEmail}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    {deal.partnerPhone && (
                      <a href={`tel:${deal.partnerPhone}`}>
                        <Button size="sm" variant="outline" className="gap-1 w-full">
                          <Phone className="h-3 w-3" /> Call
                        </Button>
                      </a>
                    )}
                    {deal.partnerEmail && (
                      <a href={`mailto:${deal.partnerEmail}`}>
                        <Button size="sm" variant="outline" className="gap-1 w-full">
                          <Mail className="h-3 w-3" /> Email
                        </Button>
                      </a>
                    )}
                    {deal.partnerId && (
                      <Link href={`/directory/partner/${deal.partnerId}`}>
                        <Button size="sm" variant="ghost" className="gap-1 w-full">
                          <ExternalLink className="h-3 w-3" /> Profile
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </HomeownerLayout>
  );
}
'''

pages["HomeownerPros.tsx"] = '''import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Star, Phone, MapPin, Shield, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function HomeownerPros() {
  const { data: networkPartners, isLoading } = trpc.directory.getApprovedPartners.useQuery();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const partners = networkPartners ?? [];
  const categories = ["all", ...Array.from(new Set(partners.map((p: any) => p.serviceType).filter(Boolean)))];

  const filtered = partners.filter((p: any) => {
    const matchSearch = !search || p.businessName?.toLowerCase().includes(search.toLowerCase()) || p.serviceType?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.serviceType === category;
    return matchSearch && matchCat;
  });

  return (
    <HomeownerLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Pros Network</h1>
          <p className="text-muted-foreground">Verified, background-checked service professionals in your area</p>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Search by name or service…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(c => (
                <SelectItem key={c} value={c}>{c === "all" ? "All Categories" : c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading && <div className="py-8 text-center text-muted-foreground">Loading pros…</div>}

        {!isLoading && filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No pros found matching your search.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p: any) => (
            <Card key={p.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold">{p.businessName}</div>
                    <Badge className="mt-1 text-xs">{p.serviceType ?? "General"}</Badge>
                  </div>
                  {p.tier && (
                    <Badge className={p.tier === "Company" ? "bg-purple-100 text-purple-700" : p.tier === "Crew" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}>
                      {p.tier}
                    </Badge>
                  )}
                </div>

                {p.avgRating > 0 && (
                  <div className="flex items-center gap-1 text-sm mb-2">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{Number(p.avgRating).toFixed(1)}</span>
                    <span className="text-muted-foreground">({p.reviewCount ?? 0} reviews)</span>
                  </div>
                )}

                {p.serviceArea && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" /> {p.serviceArea}
                  </div>
                )}

                {p.isVerified && (
                  <div className="flex items-center gap-1 text-xs text-green-600 mb-3">
                    <Shield className="h-3 w-3" /> Background Checked
                  </div>
                )}

                {p.bio && <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{p.bio}</p>}

                <div className="flex gap-2">
                  {p.phone && (
                    <a href={`tel:${p.phone}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full gap-1">
                        <Phone className="h-3 w-3" /> Call
                      </Button>
                    </a>
                  )}
                  <Link href={`/directory/partner/${p.id}`} className="flex-1">
                    <Button size="sm" className="w-full gap-1">
                      <ExternalLink className="h-3 w-3" /> View
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </HomeownerLayout>
  );
}
'''

pages["HomeownerRequestPro.tsx"] = '''import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Send, CheckCircle } from "lucide-react";

const SERVICE_CATEGORIES = [
  "Roofing", "HVAC", "Plumbing", "Electrical", "Landscaping",
  "Painting", "Flooring", "Windows & Doors", "Fencing", "Gutters",
  "Pressure Washing", "Tree Service", "Pest Control", "General Handyman", "Other"
];

const URGENCY_OPTIONS = [
  { value: "emergency", label: "Emergency (ASAP)" },
  { value: "within_48h", label: "Within 48 hours" },
  { value: "this_week", label: "This week" },
  { value: "flexible", label: "Flexible" },
];

export default function HomeownerRequestPro() {
  const submitLead = trpc.trustyPro.submitRequest.useMutation({
    onSuccess: () => {
      toast.success("Request submitted! Pros in your area will reach out shortly.");
      setSubmitted(true);
    },
    onError: (err) => toast.error(err.message),
  });

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    serviceType: "",
    description: "",
    urgency: "flexible",
    address: "",
    name: "",
    email: "",
    phone: "",
  });

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  if (submitted) {
    return (
      <HomeownerLayout>
        <div className="p-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
            <p className="text-muted-foreground mb-6">Verified pros in your area will contact you soon.</p>
            <Button onClick={() => setSubmitted(false)}>Submit Another Request</Button>
          </div>
        </div>
      </HomeownerLayout>
    );
  }

  return (
    <HomeownerLayout>
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Request a Pro</h1>
          <p className="text-muted-foreground">Tell us what you need and we'll connect you with verified pros in your area</p>
        </div>

        <Card>
          <CardHeader><CardTitle>Service Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Service Category *</label>
              <Select value={form.serviceType} onValueChange={v => set("serviceType", v)}>
                <SelectTrigger><SelectValue placeholder="Select a service…" /></SelectTrigger>
                <SelectContent>
                  {SERVICE_CATEGORIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Describe what you need *</label>
              <Textarea
                placeholder="Describe the issue or project in detail…"
                value={form.description}
                onChange={e => set("description", e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Urgency</label>
              <Select value={form.urgency} onValueChange={v => set("urgency", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {URGENCY_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Service Address *</label>
              <Input placeholder="123 Main St, Dallas, TX" value={form.address} onChange={e => set("address", e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Your Contact Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Name *</label>
                <Input placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <Input placeholder="(214) 555-0100" value={form.phone} onChange={e => set("phone", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email *</label>
              <Input type="email" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full gap-2"
          size="lg"
          disabled={!form.serviceType || !form.description || !form.address || !form.name || !form.email || submitLead.isPending}
          onClick={() => submitLead.mutate({
            serviceType: form.serviceType,
            description: form.description,
            urgency: form.urgency,
            address: form.address,
            contactName: form.name,
            contactEmail: form.email,
            contactPhone: form.phone,
          })}
        >
          <Send className="h-4 w-4" />
          {submitLead.isPending ? "Submitting…" : "Submit Request"}
        </Button>
      </div>
    </HomeownerLayout>
  );
}
'''

pages["HomeownerReviews.tsx"] = '''import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Star, PenLine } from "lucide-react";

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          className={`h-5 w-5 cursor-pointer transition-colors ${n <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
          onClick={() => onChange?.(n)}
        />
      ))}
    </div>
  );
}

export default function HomeownerReviews() {
  const { data: reviews, isLoading, refetch } = trpc.homeowner.getMyReviews.useQuery();
  const submitReview = trpc.reviews.submitReview.useMutation({
    onSuccess: () => { toast.success("Review submitted!"); setWriting(null); refetch(); },
    onError: (err) => toast.error(err.message),
  });
  const { data: deals } = trpc.homeowner.getMyDeals.useQuery();

  const [writing, setWriting] = useState<number | null>(null);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const completedDeals = (deals ?? []).filter((d: any) => d.status === "completed");
  const reviewedDealIds = new Set((reviews ?? []).map((r: any) => r.dealId));
  const unreviewedDeals = completedDeals.filter((d: any) => !reviewedDealIds.has(d.id));

  return (
    <HomeownerLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Reviews</h1>
          <p className="text-muted-foreground">Your feedback helps other homeowners find great pros</p>
        </div>

        {unreviewedDeals.length > 0 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader><CardTitle className="text-blue-700 text-base">Leave a Review</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {unreviewedDeals.map((deal: any) => (
                <div key={deal.id}>
                  {writing === deal.id ? (
                    <div className="space-y-3 border rounded-lg p-4 bg-white">
                      <div className="font-medium">{deal.partnerName} — {deal.serviceType}</div>
                      <StarRating value={rating} onChange={setRating} />
                      <Textarea placeholder="Share your experience…" value={text} onChange={e => setText(e.target.value)} rows={3} />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          disabled={!text || submitReview.isPending}
                          onClick={() => submitReview.mutate({ dealId: deal.id, partnerId: deal.partnerId, rating, reviewText: text })}
                        >
                          {submitReview.isPending ? "Submitting…" : "Submit Review"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setWriting(null)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between border rounded-lg p-3 bg-white">
                      <div>
                        <div className="font-medium">{deal.partnerName}</div>
                        <div className="text-sm text-muted-foreground">{deal.serviceType}</div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => { setWriting(deal.id); setRating(5); setText(""); }}>
                        <PenLine className="h-3 w-3" /> Write Review
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle>My Reviews ({(reviews ?? []).length})</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            {!isLoading && (reviews ?? []).length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <Star className="h-12 w-12 mx-auto opacity-20 mb-3" />
                <div>No reviews yet. Complete a job to leave your first review.</div>
              </div>
            )}
            <div className="space-y-4">
              {(reviews ?? []).map((r: any) => (
                <div key={r.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold">{r.partnerName ?? "Pro"}</div>
                      <div className="text-sm text-muted-foreground">{r.serviceType}</div>
                    </div>
                    <div className="text-right">
                      <StarRating value={r.rating} />
                      <div className="text-xs text-muted-foreground mt-1">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}</div>
                    </div>
                  </div>
                  {r.reviewText && <p className="text-sm text-muted-foreground italic">"{r.reviewText}"</p>}
                  {r.partnerResponse && (
                    <div className="mt-3 pl-3 border-l-2 border-blue-200">
                      <div className="text-xs font-medium text-blue-700 mb-1">Pro Response:</div>
                      <p className="text-sm text-muted-foreground">{r.partnerResponse}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </HomeownerLayout>
  );
}
'''

pages["MilestoneTracker.tsx"] = '''import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { CheckCircle, Circle, DollarSign, Clock } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(Number(n ?? 0) / 100);
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600",
  scheduled: "bg-blue-100 text-blue-700",
  charged: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
};

export default function MilestoneTracker() {
  const { data: deals } = trpc.homeowner.getMyDeals.useQuery();
  const activeDeals = (deals ?? []).filter((d: any) => d.status === "active" || d.status === "completed");
  const [selectedId, setSelectedId] = useState<number>(0);
  const dealId = selectedId || (activeDeals[0]?.id ?? 0);

  const { data, isLoading } = trpc.payments.getMilestonesForDeal.useQuery(
    { dealId },
    { enabled: dealId > 0 }
  );

  const milestones = data ?? [];
  const selectedDeal = activeDeals.find((d: any) => d.id === dealId);
  const totalPaid = milestones.filter((m: any) => m.status === "paid").reduce((s: number, m: any) => s + Number(m.amountCents ?? 0), 0);
  const totalRemaining = milestones.filter((m: any) => m.status !== "paid").reduce((s: number, m: any) => s + Number(m.amountCents ?? 0), 0);

  return (
    <HomeownerLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Milestone Tracker</h1>
          <p className="text-muted-foreground">Track payment milestones for your active jobs</p>
        </div>

        {activeDeals.length > 1 && (
          <Select value={String(dealId)} onValueChange={v => setSelectedId(Number(v))}>
            <SelectTrigger className="w-full max-w-sm">
              <SelectValue placeholder="Select a job…" />
            </SelectTrigger>
            <SelectContent>
              {activeDeals.map((d: any) => (
                <SelectItem key={d.id} value={String(d.id)}>
                  {d.serviceType ?? "Job"} — {d.partnerName ?? "Pro"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {dealId > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Paid</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{fmt(totalPaid)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-muted-foreground">Remaining</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-600">{fmt(totalRemaining)}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDeal ? `${selectedDeal.serviceType ?? "Job"} — ${selectedDeal.partnerName ?? "Pro"}` : "Payment Milestones"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && <div className="py-8 text-center text-muted-foreground">Loading milestones…</div>}
                {!isLoading && milestones.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    No payment milestones set up for this job yet.
                  </div>
                )}
                <div className="space-y-3">
                  {milestones.map((m: any, i: number) => (
                    <div key={m.id ?? i} className="flex items-center gap-4 border rounded-lg p-4">
                      <div className="flex-shrink-0">
                        {m.status === "paid" ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium capitalize">{m.milestoneType?.replace(/_/g, " ") ?? `Milestone ${i + 1}`}</div>
                        {m.milestoneLabel && <div className="text-sm text-muted-foreground">{m.milestoneLabel}</div>}
                        {m.scheduledAt && <div className="text-xs text-muted-foreground mt-0.5">Due: {new Date(m.scheduledAt).toLocaleDateString()}</div>}
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{fmt(m.amountCents ?? 0)}</div>
                        <Badge className={STATUS_COLORS[m.status] ?? "bg-gray-100 text-gray-600"}>{m.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeDeals.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <DollarSign className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
              <div className="text-muted-foreground">No active jobs with payment milestones.</div>
              <div className="text-sm text-muted-foreground mt-1">Milestones are set up when you hire a pro for a job.</div>
            </CardContent>
          </Card>
        )}
      </div>
    </HomeownerLayout>
  );
}
'''

for filename, content in pages.items():
    path = os.path.join(base, filename)
    with open(path, "w") as f:
        f.write(content)
    print(f"Written: {filename}")

print("All homeowner stub pages written successfully.")
