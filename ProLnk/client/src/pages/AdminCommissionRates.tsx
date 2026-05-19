import { useState } from "react";
import { Link } from "wouter";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  ArrowLeft, Loader2, DollarSign, Percent, Edit2, Save, X, Plus, Info
} from "lucide-react";

const INDUSTRY_PRESETS = [
  "Lawn Care", "Landscaping", "Pest Control", "Pool Service", "Pool Cleaning",
  "Pressure Washing", "Window Cleaning", "Handyman", "Painting", "Remodeling",
  "Roofing", "HVAC", "Plumbing", "Electrical", "Tree Service", "Gutter Cleaning",
  "Pet Waste Removal", "Dog Walking", "Dog Grooming", "Water Filtration",
  "Security", "Smart Home", "Concrete", "Garage Epoxy", "Artificial Turf", "Irrigation",
];

type IndustryRate = {
  id: number;
  industryName: string;
  platformFeeRate: string;
  referralCommissionRate: string;
  notes: string | null;
  updatedAt: Date;
};

function RateRow({ rate, onSave }: { rate: IndustryRate; onSave: () => void }) {
  const [editing, setEditing] = useState(false);
  const [platformFee, setPlatformFee] = useState((parseFloat(rate.platformFeeRate) * 100).toFixed(1));
  const [referralFee, setReferralFee] = useState((parseFloat(rate.referralCommissionRate) * 100).toFixed(1));
  const [notes, setNotes] = useState(rate.notes ?? "");

  const upsertMutation = trpc.admin.upsertIndustryRate.useMutation({
    onSuccess: () => {
      toast.success(`Rates updated for ${rate.industryName}`);
      setEditing(false);
      onSave();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSave = () => {
    const pf = parseFloat(platformFee) / 100;
    const rf = parseFloat(referralFee) / 100;
    if (isNaN(pf) || pf < 0 || pf > 0.30) { toast.error("Platform fee must be 0-30%"); return; }
    if (isNaN(rf) || rf < 0 || rf > 0.15) { toast.error("Referral commission must be 0-15%"); return; }
    upsertMutation.mutate({
      industryName: rate.industryName,
      platformFeeRate: pf,
      referralCommissionRate: rf,
      notes: notes || undefined,
    });
  };

  const platformPct = parseFloat(rate.platformFeeRate) * 100;
  const referralPct = parseFloat(rate.referralCommissionRate) * 100;
  const proLinkNet = platformPct - referralPct;

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <td className="py-3 px-4">
        <span className="font-medium text-gray-900 text-sm">{rate.industryName}</span>
        {rate.notes && (
          <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">{rate.notes}</p>
        )}
      </td>
      <td className="py-3 px-4 text-center">
        {editing ? (
          <div className="flex items-center gap-1 justify-center">
            <Input
              value={platformFee}
              onChange={(e) => setPlatformFee(e.target.value)}
              className="w-16 h-7 text-xs text-center"
            />
            <span className="text-xs text-gray-500">%</span>
          </div>
        ) : (
          <span className={`text-sm font-semibold ${platformPct >= 12 ? "text-[#0A1628]" : platformPct >= 9 ? "text-blue-600" : "text-gray-600"}`}>
            {platformPct.toFixed(1)}%
          </span>
        )}
      </td>
      <td className="py-3 px-4 text-center">
        {editing ? (
          <div className="flex items-center gap-1 justify-center">
            <Input
              value={referralFee}
              onChange={(e) => setReferralFee(e.target.value)}
              className="w-16 h-7 text-xs text-center"
            />
            <span className="text-xs text-gray-500">%</span>
          </div>
        ) : (
          <span className="text-sm font-semibold text-amber-600">{referralPct.toFixed(1)}%</span>
        )}
      </td>
      <td className="py-3 px-4 text-center">
        <span className={`text-sm font-bold ${proLinkNet > 0 ? "text-green-600" : "text-gray-400"}`}>
          {proLinkNet.toFixed(1)}%
        </span>
      </td>
      <td className="py-3 px-4">
        {editing ? (
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes..."
            className="h-7 text-xs"
          />
        ) : (
          <span className="text-xs text-gray-400">{rate.notes ?? "--"}</span>
        )}
      </td>
      <td className="py-3 px-4 text-right">
        {editing ? (
          <div className="flex items-center gap-1 justify-end">
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setEditing(false)}>
              <X className="w-3.5 h-3.5 text-gray-400" />
            </Button>
            <Button
              size="sm"
              className="h-7 px-2 text-xs text-white"
              style={{ backgroundColor: "var(--teal)" }}
              disabled={upsertMutation.isPending}
              onClick={handleSave}
            >
              {upsertMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setEditing(true)}>
            <Edit2 className="w-3.5 h-3.5 text-gray-400 hover:text-[#0A1628]" />
          </Button>
        )}
      </td>
    </tr>
  );
}

export default function AdminCommissionRates() {
  const { user, loading: authLoading } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIndustry, setNewIndustry] = useState("");
  const [newPlatformFee, setNewPlatformFee] = useState("12");
  const [newReferralFee, setNewReferralFee] = useState("5");
  const [newNotes, setNewNotes] = useState("");

  const { data: rates, isLoading, refetch } = trpc.admin.getIndustryRates.useQuery();

  const addMutation = trpc.admin.upsertIndustryRate.useMutation({
    onSuccess: () => {
      toast.success(`Rates added for ${newIndustry}`);
      setShowAddForm(false);
      setNewIndustry("");
      setNewPlatformFee("12");
      setNewReferralFee("5");
      setNewNotes("");
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0A1628]" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <h2 className="text-2xl font-heading text-gray-900">Admin Access Required</h2>
        <p className="text-gray-500 text-sm">You need admin privileges to view this page.</p>
        <Button onClick={() => { window.location.href = getLoginUrl(); }}>Sign In</Button>
      </div>
    );
  }

  const avgPlatformFee = rates?.length
    ? rates.reduce((sum, r) => sum + parseFloat(r.platformFeeRate), 0) / rates.length * 100
    : 0;
  const avgNetRate = rates?.length
    ? rates.reduce((sum, r) => sum + (parseFloat(r.platformFeeRate) - parseFloat(r.referralCommissionRate)), 0) / rates.length * 100
    : 0;

  return (
    <AdminLayout title="Commission Rates" subtitle="Manage platform fee and referral commission rates by industry">
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="font-heading text-gray-900 tracking-wide">COMMISSION RATES</span>
          </div>
          <Button
            size="sm"
            className="gap-2 text-white font-heading"
            style={{ backgroundColor: "var(--teal)" }}
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="w-4 h-4" /> Add Industry
          </Button>
        </div>
      </header>

      <div className="container py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Percent className="w-4 h-4 text-[#0A1628]" />
                <span className="text-xs text-gray-500 font-medium">Avg Platform Fee</span>
              </div>
              <p className="text-2xl font-heading text-gray-900">{avgPlatformFee.toFixed(1)}%</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-xs text-gray-500 font-medium">Avg ProLnk Net</span>
              </div>
              <p className="text-2xl font-heading text-gray-900">{avgNetRate.toFixed(1)}%</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-gray-500 font-medium">Industries Configured</span>
              </div>
              <p className="text-2xl font-heading text-gray-900">{rates?.length ?? 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* Info banner */}
        <div className="bg-[#F5E642]/10 border border-[#0A1628]/20 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#0A1628] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-teal-800">
            <strong>How rates work:</strong> When a partner closes a referred job, ProLnk collects the Platform Fee from the receiving partner. The Referral Commission is paid out to the partner who generated the lead. ProLnk Net = Platform Fee  Referral Commission.
            <br />
            <span className="text-[#0A1628] text-xs mt-1 block">
              Example: $1,000 job at 12% platform fee  ProLnk collects $120. Referring partner gets $50 (5%). ProLnk nets $70.
            </span>
          </div>
        </div>

        {/* Add form */}
        {showAddForm && (
          <Card className="border-[#0A1628]/20 shadow-sm mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-heading tracking-wide">ADD NEW INDUSTRY RATE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label className="text-xs font-medium text-gray-700 mb-1 block">Industry Name</Label>
                  <Input
                    list="industry-presets"
                    placeholder="e.g., Lawn Care"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="h-9"
                  />
                  <datalist id="industry-presets">
                    {INDUSTRY_PRESETS.map(p => <option key={p} value={p} />)}
                  </datalist>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-700 mb-1 block">Platform Fee (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="30"
                    step="0.5"
                    value={newPlatformFee}
                    onChange={(e) => setNewPlatformFee(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-700 mb-1 block">Referral Commission (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="15"
                    step="0.5"
                    value={newReferralFee}
                    onChange={(e) => setNewReferralFee(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-700 mb-1 block">Notes (optional)</Label>
                  <Input
                    placeholder="Brief note..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>
              {newPlatformFee && newReferralFee && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
                  <span className="text-gray-600">ProLnk Net: </span>
                  <span className="font-bold text-green-600">
                    {(parseFloat(newPlatformFee) - parseFloat(newReferralFee)).toFixed(1)}%
                  </span>
                  <span className="text-gray-400 text-xs ml-2">
                    (on a $1,000 job = ${((parseFloat(newPlatformFee) - parseFloat(newReferralFee)) * 10).toFixed(0)} net to ProLnk)
                  </span>
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <Button
                  className="text-white font-heading"
                  style={{ backgroundColor: "var(--teal)" }}
                  disabled={!newIndustry.trim() || addMutation.isPending}
                  onClick={() => addMutation.mutate({
                    industryName: newIndustry.trim(),
                    platformFeeRate: parseFloat(newPlatformFee) / 100,
                    referralCommissionRate: parseFloat(newReferralFee) / 100,
                    notes: newNotes || undefined,
                  })}
                >
                  {addMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Add Industry
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rates table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Industry</th>
                  <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Platform Fee</th>
                  <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Referral Commission</th>
                  <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">ProLnk Net</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</th>
                  <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Edit</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="py-3 px-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (rates ?? []).map((rate) => (
                  <RateRow key={rate.id} rate={rate} onSave={refetch} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
    </AdminLayout>
  );
}
