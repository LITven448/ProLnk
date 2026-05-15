import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Megaphone, DollarSign, Eye, MousePointerClick, Plus, Pencil, Trash2,
  TrendingUp, Star, MapPin, RefreshCw, CheckCircle, PauseCircle, XCircle, Clock,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  paused: "bg-yellow-100 text-yellow-700 border-yellow-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  pending: "bg-blue-100 text-blue-700 border-blue-200",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  active: <CheckCircle className="w-3 h-3" />,
  paused: <PauseCircle className="w-3 h-3" />,
  cancelled: <XCircle className="w-3 h-3" />,
  pending: <Clock className="w-3 h-3" />,
};

const CATEGORIES = [
  "Lawn Care", "Landscaping", "HVAC", "Plumbing", "Electrical", "Roofing",
  "Pest Control", "Pool Service", "Pressure Washing", "Painting", "Handyman",
  "Tree Service", "Gutter Cleaning", "Window Cleaning", "Concrete", "Fencing",
  "Irrigation", "Security", "Water Filtration", "Remodeling", "Other",
];

const emptyForm = {
  businessName: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  category: "",
  zipCodes: "",
  monthlyFee: "",
  status: "pending" as const,
  bannerTitle: "",
  bannerSubtitle: "",
  bannerCtaText: "Learn More",
  bannerCtaUrl: "",
  bannerLogoUrl: "",
  showOnDashboard: true,
  showOnScanResults: true,
  showInEmails: false,
  startDate: "",
  endDate: "",
  notes: "",
};

export default function FeaturedAdvertisers() {
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "paused" | "cancelled" | "pending">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const { data: stats, refetch: refetchStats } = trpc.featuredAdvertisers.getStats.useQuery();
  const { data: advertisers = [], refetch } = trpc.featuredAdvertisers.list.useQuery({ status: filterStatus });

  const upsert = trpc.featuredAdvertisers.upsert.useMutation({
    onSuccess: () => {
      toast.success(editId ? "Advertiser updated" : "Advertiser created");
      setFormOpen(false);
      setEditId(null);
      setForm({ ...emptyForm });
      refetch();
      refetchStats();
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteAdv = trpc.featuredAdvertisers.delete.useMutation({
    onSuccess: () => {
      toast.success("Advertiser deleted");
      setDeleteConfirmId(null);
      refetch();
      refetchStats();
    },
    onError: (e) => toast.error(e.message),
  });

  const openEdit = (adv: any) => {
    setEditId(adv.id);
    setForm({
      businessName: adv.businessName ?? "",
      contactName: adv.contactName ?? "",
      contactEmail: adv.contactEmail ?? "",
      contactPhone: adv.contactPhone ?? "",
      category: adv.category ?? "",
      zipCodes: (() => { try { return JSON.parse(adv.zipCodes ?? "[]").join(", "); } catch { return ""; } })(),
      monthlyFee: String(adv.monthlyFee ?? ""),
      status: adv.status ?? "pending",
      bannerTitle: adv.bannerTitle ?? "",
      bannerSubtitle: adv.bannerSubtitle ?? "",
      bannerCtaText: adv.bannerCtaText ?? "Learn More",
      bannerCtaUrl: adv.bannerCtaUrl ?? "",
      bannerLogoUrl: adv.bannerLogoUrl ?? "",
      showOnDashboard: !!adv.showOnDashboard,
      showOnScanResults: !!adv.showOnScanResults,
      showInEmails: !!adv.showInEmails,
      startDate: adv.startDate ? String(adv.startDate).slice(0, 10) : "",
      endDate: adv.endDate ? String(adv.endDate).slice(0, 10) : "",
      notes: adv.notes ?? "",
    });
    setFormOpen(true);
  };

  const handleSubmit = () => {
    if (!form.businessName || !form.category) {
      toast.error("Business name and category are required");
      return;
    }
    const zipCodes = form.zipCodes
      .split(/[,\s]+/)
      .map((z) => z.trim())
      .filter(Boolean);
    upsert.mutate({
      ...(editId ? { id: editId } : {}),
      businessName: form.businessName,
      contactName: form.contactName || undefined,
      contactEmail: form.contactEmail || undefined,
      contactPhone: form.contactPhone || undefined,
      category: form.category,
      zipCodes: zipCodes.length ? zipCodes : ["*"],
      monthlyFee: Number(form.monthlyFee) || 0,
      status: form.status,
      bannerTitle: form.bannerTitle || undefined,
      bannerSubtitle: form.bannerSubtitle || undefined,
      bannerCtaText: form.bannerCtaText || "Learn More",
      bannerCtaUrl: form.bannerCtaUrl || undefined,
      bannerLogoUrl: form.bannerLogoUrl || undefined,
      showOnDashboard: form.showOnDashboard,
      showOnScanResults: form.showOnScanResults,
      showInEmails: form.showInEmails,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
      notes: form.notes || undefined,
    });
  };

  const ctr = stats && Number(stats.totalImpressions) > 0
    ? ((Number(stats.totalClicks) / Number(stats.totalImpressions)) * 100).toFixed(1)
    : "0.0";

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Oswald, sans-serif" }}>
              Featured Advertisers
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage sponsored partner placements — territory-exclusive, context-relevant banners for homeowners.
            </p>
          </div>
          <Dialog open={formOpen} onOpenChange={(o) => { setFormOpen(o); if (!o) { setEditId(null); setForm({ ...emptyForm }); } }}>
            <DialogTrigger asChild>
              <Button className="bg-[#00B5B8] hover:bg-[#009a9d] text-white gap-2">
                <Plus className="w-4 h-4" /> New Advertiser
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editId ? "Edit Advertiser" : "New Featured Advertiser"}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="col-span-2">
                  <Label>Business Name *</Label>
                  <Input value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} placeholder="e.g. Green Thumb Lawn Care" />
                </div>
                <div>
                  <Label>Contact Name</Label>
                  <Input value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} placeholder="John Smith" />
                </div>
                <div>
                  <Label>Contact Email</Label>
                  <Input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} placeholder="john@example.com" />
                </div>
                <div>
                  <Label>Contact Phone</Label>
                  <Input value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} placeholder="(214) 555-0100" />
                </div>
                <div>
                  <Label>Category *</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label>Zip Codes (comma-separated, leave blank for all)</Label>
                  <Input value={form.zipCodes} onChange={(e) => setForm({ ...form, zipCodes: e.target.value })} placeholder="75009, 75024, 75034" />
                </div>
                <div>
                  <Label>Monthly Fee ($)</Label>
                  <Input type="number" value={form.monthlyFee} onChange={(e) => setForm({ ...form, monthlyFee: e.target.value })} placeholder="299" />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v: any) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 border-t pt-3">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Banner Content</p>
                </div>
                <div className="col-span-2">
                  <Label>Banner Title</Label>
                  <Input value={form.bannerTitle} onChange={(e) => setForm({ ...form, bannerTitle: e.target.value })} placeholder="Professional Lawn Care in Your Area" />
                </div>
                <div className="col-span-2">
                  <Label>Banner Subtitle</Label>
                  <Input value={form.bannerSubtitle} onChange={(e) => setForm({ ...form, bannerSubtitle: e.target.value })} placeholder="Trusted by 500+ homeowners. Free estimates." />
                </div>
                <div>
                  <Label>CTA Button Text</Label>
                  <Input value={form.bannerCtaText} onChange={(e) => setForm({ ...form, bannerCtaText: e.target.value })} placeholder="Get a Free Quote" />
                </div>
                <div>
                  <Label>CTA URL</Label>
                  <Input value={form.bannerCtaUrl} onChange={(e) => setForm({ ...form, bannerCtaUrl: e.target.value })} placeholder="https://..." />
                </div>
                <div className="col-span-2">
                  <Label>Logo URL</Label>
                  <Input value={form.bannerLogoUrl} onChange={(e) => setForm({ ...form, bannerLogoUrl: e.target.value })} placeholder="https://cdn.example.com/logo.png" />
                </div>
                <div className="col-span-2 border-t pt-3">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Placement Settings</p>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <Switch checked={form.showOnDashboard} onCheckedChange={(v) => setForm({ ...form, showOnDashboard: v })} />
                      <Label>Show on Homeowner Dashboard</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={form.showOnScanResults} onCheckedChange={(v) => setForm({ ...form, showOnScanResults: v })} />
                      <Label>Show in Scan Results</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={form.showInEmails} onCheckedChange={(v) => setForm({ ...form, showInEmails: v })} />
                      <Label>Include in Emails</Label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <Label>Internal Notes</Label>
                  <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Contract details, special terms..." rows={2} />
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <Button variant="outline" onClick={() => { setFormOpen(false); setEditId(null); setForm({ ...emptyForm }); }}>Cancel</Button>
                <Button className="bg-[#00B5B8] hover:bg-[#009a9d] text-white" onClick={handleSubmit} disabled={upsert.isPending}>
                  {upsert.isPending ? "Saving..." : editId ? "Save Changes" : "Create Advertiser"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Advertisers", value: Number(stats?.total ?? 0), icon: <Megaphone className="w-5 h-5 text-[#00B5B8]" /> },
            { label: "Active", value: Number(stats?.active ?? 0), icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
            { label: "Monthly Revenue", value: `$${Number(stats?.totalMrr ?? 0).toLocaleString()}`, icon: <DollarSign className="w-5 h-5 text-emerald-500" /> },
            { label: "Total Impressions", value: Number(stats?.totalImpressions ?? 0).toLocaleString(), icon: <Eye className="w-5 h-5 text-blue-500" /> },
            { label: "CTR", value: `${ctr}%`, icon: <MousePointerClick className="w-5 h-5 text-purple-500" /> },
          ].map((s) => (
            <Card key={s.label} className="border border-gray-100 shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">{s.icon}</div>
                <div>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-lg font-bold text-gray-900">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "active", "pending", "paused", "cancelled"] as const).map((s) => (
            <Button
              key={s}
              variant={filterStatus === s ? "default" : "outline"}
              size="sm"
              className={filterStatus === s ? "bg-[#00B5B8] text-white hover:bg-[#009a9d]" : ""}
              onClick={() => setFilterStatus(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={() => { refetch(); refetchStats(); }} className="ml-auto gap-1">
            <RefreshCw className="w-3 h-3" /> Refresh
          </Button>
        </div>

        {/* Advertiser Table */}
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-800">
              {filterStatus === "all" ? "All Advertisers" : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Advertisers`}
              <span className="ml-2 text-sm font-normal text-gray-400">({advertisers.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {advertisers.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Megaphone className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No advertisers found</p>
                <p className="text-sm mt-1">Create your first featured advertiser to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Business</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Zip Codes</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Monthly Fee</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Placements</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Performance</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advertisers.map((adv: any) => {
                      const zips: string[] = (() => { try { return JSON.parse(adv.zipCodes ?? "[]"); } catch { return []; } })();
                      const advCtr = Number(adv.impressions) > 0
                        ? ((Number(adv.clicks) / Number(adv.impressions)) * 100).toFixed(1)
                        : "—";
                      return (
                        <tr key={adv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {adv.bannerLogoUrl ? (
                                <img src={adv.bannerLogoUrl} alt="" className="w-7 h-7 rounded object-cover border" />
                              ) : (
                                <div className="w-7 h-7 rounded bg-[#00B5B8]/10 flex items-center justify-center">
                                  <Star className="w-3.5 h-3.5 text-[#00B5B8]" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-gray-900">{adv.businessName}</p>
                                {adv.contactEmail && <p className="text-xs text-gray-400">{adv.contactEmail}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{adv.category}</td>
                          <td className="py-3 px-4">
                            {zips.length === 0 || zips[0] === "*" ? (
                              <span className="text-xs text-gray-400 italic">All areas</span>
                            ) : (
                              <div className="flex flex-wrap gap-1">
                                {zips.slice(0, 3).map((z) => (
                                  <span key={z} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{z}</span>
                                ))}
                                {zips.length > 3 && <span className="text-xs text-gray-400">+{zips.length - 3}</span>}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900">
                            ${Number(adv.monthlyFee).toLocaleString()}/mo
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1 flex-wrap">
                              {adv.showOnDashboard && <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">Dashboard</span>}
                              {adv.showOnScanResults && <span className="text-xs bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded border border-purple-100">Scan</span>}
                              {adv.showInEmails && <span className="text-xs bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100">Email</span>}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-xs text-gray-600 space-y-0.5">
                              <div className="flex items-center gap-1"><Eye className="w-3 h-3" /> {Number(adv.impressions).toLocaleString()} views</div>
                              <div className="flex items-center gap-1"><MousePointerClick className="w-3 h-3" /> {Number(adv.clicks).toLocaleString()} clicks ({advCtr}%)</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`text-xs border gap-1 ${STATUS_COLORS[adv.status] ?? ""}`}>
                              {STATUS_ICONS[adv.status]}
                              {adv.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => openEdit(adv)}>
                                <Pencil className="w-3.5 h-3.5 text-gray-500" />
                              </Button>
                              <Dialog open={deleteConfirmId === adv.id} onOpenChange={(o) => !o && setDeleteConfirmId(null)}>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setDeleteConfirmId(adv.id)}>
                                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-sm">
                                  <DialogHeader>
                                    <DialogTitle>Delete Advertiser?</DialogTitle>
                                  </DialogHeader>
                                  <p className="text-sm text-gray-600">This will permanently delete <strong>{adv.businessName}</strong> and all associated data.</p>
                                  <div className="flex gap-2 justify-end mt-4">
                                    <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
                                    <Button variant="destructive" onClick={() => deleteAdv.mutate({ id: adv.id })} disabled={deleteAdv.isPending}>
                                      {deleteAdv.isPending ? "Deleting..." : "Delete"}
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pricing Guide */}
        <Card className="border border-[#00B5B8]/20 bg-[#00B5B8]/5 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-[#00B5B8] mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 mb-1">Suggested Pricing Tiers</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {[
                    { tier: "Starter", price: "$149/mo", desc: "1 zip code, 1 category" },
                    { tier: "Growth", price: "$299/mo", desc: "3 zip codes, 1 category" },
                    { tier: "Pro", price: "$499/mo", desc: "5 zip codes, 1 category" },
                    { tier: "Territory", price: "$799/mo", desc: "10 zip codes, exclusive" },
                  ].map((t) => (
                    <div key={t.tier} className="bg-white rounded-lg p-3 border border-[#00B5B8]/20">
                      <p className="font-semibold text-[#00B5B8]">{t.tier}</p>
                      <p className="text-lg font-bold text-gray-900">{t.price}</p>
                      <p className="text-xs text-gray-500">{t.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Territory exclusivity: one advertiser per category per zip code. First to pay wins the territory.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
