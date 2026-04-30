/**
 * Platform Settings — Admin feature flags and system controls
 * Wired to real tRPC: admin.getFeatureFlags + admin.setFeatureFlag
 */
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Settings, Users, Home, Briefcase, RefreshCw, Shield, Zap } from "lucide-react";

interface FlagRowProps {
  label: string;
  description: string;
  flagKey: string;
  value: boolean;
  icon: React.ReactNode;
  badgeLabel?: string;
  badgeColor?: string;
  onToggle: (key: string, value: boolean) => void;
  isPending: boolean;
}

function FlagRow({ label, description, flagKey, value, icon, badgeLabel, badgeColor, onToggle, isPending }: FlagRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/20 transition-colors">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-foreground">{label}</span>
            {badgeLabel && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor ?? "bg-muted text-muted-foreground"}`}>
                {badgeLabel}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`text-xs font-semibold ${value ? "text-emerald-600" : "text-muted-foreground"}`}>
          {value ? "ON" : "OFF"}
        </span>
        <Switch
          checked={value}
          onCheckedChange={(checked) => onToggle(flagKey, checked)}
          disabled={isPending}
        />
      </div>
    </div>
  );
}

export default function PlatformSettings() {
  const utils = trpc.useUtils();
  const { data: flags, isLoading } = trpc.admin.getFeatureFlags.useQuery();

  const setFlagMutation = trpc.admin.setFeatureFlag.useMutation({
    onSuccess: (_, variables) => {
      toast.success(`${variables.key} set to ${variables.value ? "ON" : "OFF"}`);
      utils.admin.getFeatureFlags.invalidate();
    },
    onError: (err) => toast.error(`Failed to update flag: ${err.message}`),
  });

  const toggle = (key: string, value: boolean) => {
    setFlagMutation.mutate({ key, value });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />Loading settings...
        </div>
      </AdminLayout>
    );
  }

  const f = flags ?? { homeownerSignupOpen: false, trustyProLive: false, partnerApplicationsOpen: true };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-3">
            <Settings className="w-6 h-6 text-teal-600" />Platform Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Control platform-wide feature flags and access gates. Changes take effect immediately.
          </p>
        </div>

        {/* TrustyPro Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Home className="w-4 h-4 text-teal-600" />TrustyPro — Homeowner Platform
            </CardTitle>
            <CardDescription>
              Control homeowner access and TrustyPro platform availability.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <FlagRow
              label="Homeowner Signup Open"
              description="When ON, homeowners can create accounts and join TrustyPro. When OFF, new signups are redirected to the waitlist page."
              flagKey="homeownerSignupOpen"
              value={f.homeownerSignupOpen}
              icon={<Users className="w-4 h-4 text-teal-600" />}
              badgeLabel={f.homeownerSignupOpen ? "Accepting signups" : "Waitlist only"}
              badgeColor={f.homeownerSignupOpen ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}
              onToggle={toggle}
              isPending={setFlagMutation.isPending}
            />
            <FlagRow
              label="TrustyPro Platform Live"
              description="When ON, TrustyPro is publicly accessible and indexed. When OFF, the platform shows a coming-soon page to non-admin visitors."
              flagKey="trustyProLive"
              value={f.trustyProLive}
              icon={<Zap className="w-4 h-4 text-purple-600" />}
              badgeLabel={f.trustyProLive ? "Live" : "Coming soon"}
              badgeColor={f.trustyProLive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}
              onToggle={toggle}
              isPending={setFlagMutation.isPending}
            />
          </CardContent>
        </Card>

        {/* ProLnk Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase className="w-4 h-4 text-[#0A1628]" />ProLnk — Partner Network
            </CardTitle>
            <CardDescription>
              Control partner application access and network availability.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <FlagRow
              label="Partner Applications Open"
              description="When ON, new service providers can submit applications to join the ProLnk network. When OFF, the application form is hidden."
              flagKey="partnerApplicationsOpen"
              value={f.partnerApplicationsOpen}
              icon={<Shield className="w-4 h-4 text-[#0A1628]" />}
              badgeLabel={f.partnerApplicationsOpen ? "Accepting applications" : "Closed"}
              badgeColor={f.partnerApplicationsOpen ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}
              onToggle={toggle}
              isPending={setFlagMutation.isPending}
            />
          </CardContent>
        </Card>

        {/* Status Summary */}
        <Card className="border-dashed border-2 border-border bg-muted/10">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Current Platform Status</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={f.homeownerSignupOpen ? "border-emerald-300 text-emerald-700 bg-emerald-50" : "border-amber-300 text-amber-700 bg-amber-50"}>
                Homeowner Signup: {f.homeownerSignupOpen ? "Open" : "Waitlist"}
              </Badge>
              <Badge variant="outline" className={f.trustyProLive ? "border-emerald-300 text-emerald-700 bg-emerald-50" : "border-slate-300 text-slate-600 bg-slate-50"}>
                TrustyPro: {f.trustyProLive ? "Live" : "Coming Soon"}
              </Badge>
              <Badge variant="outline" className={f.partnerApplicationsOpen ? "border-emerald-300 text-emerald-700 bg-emerald-50" : "border-red-300 text-red-700 bg-red-50"}>
                Partner Apps: {f.partnerApplicationsOpen ? "Open" : "Closed"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
