import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { AddressAutofill } from "@/components/AddressAutofill";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  MapPin, DollarSign, Home, TrendingUp, Plus, CheckCircle2,
  Loader2, Sparkles, Infinity as InfinityIcon, Building2,
} from "lucide-react";

const NAVY = "#0A1628";
const YELLOW = "#FFD60A";

function money(n: number): string {
  return `$${(n ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function StatCard({
  icon: Icon, label, value, accent, sub,
}: { icon: any; label: string; value: string; accent?: boolean; sub?: string }) {
  return (
    <div
      className="rounded-2xl p-5 border shadow-sm relative overflow-hidden"
      style={{
        background: accent ? NAVY : "white",
        borderColor: accent ? NAVY : "#e5e7eb",
        color: accent ? "white" : NAVY,
      }}
    >
      <div className="flex items-center gap-2 mb-2 opacity-80">
        <Icon className="w-4 h-4" style={{ color: accent ? YELLOW : NAVY }} />
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-2xl font-extrabold">{value}</div>
      {sub && <div className="text-xs mt-1 opacity-70">{sub}</div>}
    </div>
  );
}

export default function ScoutDashboard() {
  const utils = trpc.useUtils();
  const earnings = trpc.scout.getOriginationEarnings.useQuery();
  const properties = trpc.scout.getMyProperties.useQuery();

  const [address, setAddress] = useState("");
  const [homeownerName, setHomeownerName] = useState("");
  const [homeownerEmail, setHomeownerEmail] = useState("");

  const onboard = trpc.scout.onboardProperty.useMutation({
    onSuccess: (res) => {
      if (res.claimed) {
        toast.success(res.message);
        setAddress(""); setHomeownerName(""); setHomeownerEmail("");
      } else if (res.heldByMe) {
        toast.info(res.message);
      } else {
        toast.warning(res.message);
      }
      utils.scout.getMyProperties.invalidate();
      utils.scout.getOriginationEarnings.invalidate();
    },
    onError: (err) => toast.error(err.message || "Could not onboard property"),
  });

  const e = earnings.data;
  const props = properties.data ?? [];

  return (
    <PartnerLayout>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5" style={{ color: YELLOW }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: NAVY }}>
              Scout Cockpit
            </span>
          </div>
          <h1 className="text-3xl font-extrabold" style={{ color: NAVY }}>
            Origination Income
          </h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <InfinityIcon className="w-4 h-4" />
            You earn 5% of the platform fee on every job at properties you bring in — forever.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={DollarSign}
            label="Total Earned"
            value={earnings.isLoading ? "…" : money(e?.totalEarned ?? 0)}
            accent
            sub="Lifetime origination"
          />
          <StatCard
            icon={TrendingUp}
            label="This Month"
            value={earnings.isLoading ? "…" : money(e?.thisMonth ?? 0)}
          />
          <StatCard
            icon={Home}
            label="Properties"
            value={earnings.isLoading ? "…" : String(e?.propertyCount ?? 0)}
            sub="Documented by you"
          />
          <StatCard
            icon={TrendingUp}
            label="Projected / Yr"
            value={earnings.isLoading ? "…" : money(e?.projectedAnnual ?? 0)}
            sub="Annualized run-rate"
          />
        </div>

        {/* Onboard a property */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="w-5 h-5" style={{ color: NAVY }} />
            <h2 className="text-lg font-bold" style={{ color: NAVY }}>Onboard a Property</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Document a property to TrustyPro and claim permanent origination rights. First documenter wins —
            you keep 5% of every job's platform fee at this address, forever.
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Property Address</label>
              <AddressAutofill
                value={address}
                onAddressSelect={(a) => {
                  const full = [a.street, a.city, a.state, a.zip].filter(Boolean).join(", ");
                  setAddress(full);
                }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Homeowner Name (optional)</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                  value={homeownerName}
                  onChange={(ev) => setHomeownerName(ev.target.value)}
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Homeowner Email (optional)</label>
                <input
                  type="email"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                  value={homeownerEmail}
                  onChange={(ev) => setHomeownerEmail(ev.target.value)}
                  placeholder="jane@example.com"
                />
              </div>
            </div>
            <Button
              disabled={!address || address.length < 5 || onboard.isPending}
              onClick={() =>
                onboard.mutate({
                  address,
                  homeownerName: homeownerName || undefined,
                  homeownerEmail: homeownerEmail || undefined,
                })
              }
              className="w-full sm:w-auto font-bold"
              style={{ background: NAVY, color: YELLOW }}
            >
              {onboard.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Claiming…</>
              ) : (
                <><CheckCircle2 className="w-4 h-4 mr-2" /> Claim Origination Rights</>
              )}
            </Button>
          </div>
        </div>

        {/* My properties */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 p-6 pb-3">
            <Building2 className="w-5 h-5" style={{ color: NAVY }} />
            <h2 className="text-lg font-bold" style={{ color: NAVY }}>My Properties</h2>
            <span className="ml-auto text-xs text-gray-400">{props.length} documented</span>
          </div>

          {properties.isLoading ? (
            <div className="p-10 flex justify-center text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : props.length === 0 ? (
            <div className="p-10 text-center">
              <Home className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p className="font-semibold text-gray-600">No properties yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Onboard your first property above to start earning permanent origination income.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {props.map((p: any) => (
                <div key={p.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${NAVY}10` }}>
                    <MapPin className="w-4 h-4" style={{ color: NAVY }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate" style={{ color: NAVY }}>{p.address}</div>
                    <div className="text-xs text-gray-400">
                      Onboarded {p.documentedAt ? new Date(p.documentedAt).toLocaleDateString() : "—"}
                      {" · "}{p.jobsCompleted ?? 0} job{(p.jobsCompleted ?? 0) === 1 ? "" : "s"}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-gray-400">Origination</div>
                    <div className="font-bold text-sm" style={{ color: NAVY }}>{money(p.originationEarned ?? 0)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Explainer */}
        <div className="rounded-2xl p-6" style={{ background: `${NAVY}08`, border: `1px solid ${NAVY}1a` }}>
          <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: NAVY }}>
            <InfinityIcon className="w-4 h-4" /> How origination income works
          </h3>
          <ul className="text-sm text-gray-600 space-y-1.5 list-disc pl-5">
            <li>Document a property and you become its <strong>first documenter</strong> — that claim is permanent.</li>
            <li>Every time a verified pro completes a job at that address, you earn <strong>5% of the platform fee</strong>.</li>
            <li>This income compounds: more properties × more jobs = a growing, passive revenue base.</li>
            <li>Origination rights belong to the first Scout to document an address — they can never be taken away.</li>
          </ul>
        </div>
      </div>
    </PartnerLayout>
  );
}
