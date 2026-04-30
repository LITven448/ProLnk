import { useState, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Bell, Mail, MessageSquare, Zap, DollarSign, Star, TrendingUp, Megaphone, Calendar, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface PrefItem {
  key: keyof NotifPrefs;
  label: string;
  description: string;
  icon: React.ReactNode;
  category: "activity" | "channel";
}

interface NotifPrefs {
  newLead: boolean;
  leadExpired: boolean;
  commissionPaid: boolean;
  tierUpgrade: boolean;
  newReview: boolean;
  broadcastMessages: boolean;
  weeklyDigest: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
}

const DEFAULT_PREFS: NotifPrefs = {
  newLead: true,
  leadExpired: true,
  commissionPaid: true,
  tierUpgrade: true,
  newReview: true,
  broadcastMessages: true,
  weeklyDigest: true,
  emailEnabled: true,
  smsEnabled: false,
};

const ACTIVITY_PREFS: PrefItem[] = [
  {
    key: "newLead",
    label: "New Lead Dispatched",
    description: "Get notified when a new lead is routed to you for review",
    icon: <Zap className="h-4 w-4 text-purple-500" />,
    category: "activity",
  },
  {
    key: "leadExpired",
    label: "Lead Expired",
    description: "Alert when a lead expires before you accept it",
    icon: <TrendingUp className="h-4 w-4 text-orange-500" />,
    category: "activity",
  },
  {
    key: "commissionPaid",
    label: "Commission Paid",
    description: "Notification when a commission payment is processed",
    icon: <DollarSign className="h-4 w-4 text-green-500" />,
    category: "activity",
  },
  {
    key: "tierUpgrade",
    label: "Tier Upgrade",
    description: "Celebrate when your plan tier is upgraded",
    icon: <Star className="h-4 w-4 text-yellow-500" />,
    category: "activity",
  },
  {
    key: "newReview",
    label: "New Review Received",
    description: "Alert when a homeowner submits a review for your business",
    icon: <Star className="h-4 w-4 text-[#0A1628]" />,
    category: "activity",
  },
  {
    key: "broadcastMessages",
    label: "Network Broadcasts",
    description: "Messages from the ProLnk admin team (announcements, tips)",
    icon: <Megaphone className="h-4 w-4 text-blue-500" />,
    category: "activity",
  },
  {
    key: "weeklyDigest",
    label: "Weekly Performance Digest",
    description: "Summary of your referrals, commissions, and network activity",
    icon: <Calendar className="h-4 w-4 text-indigo-500" />,
    category: "activity",
  },
];

const CHANNEL_PREFS: PrefItem[] = [
  {
    key: "emailEnabled",
    label: "Email Notifications",
    description: "Receive notifications to your registered email address",
    icon: <Mail className="h-4 w-4 text-blue-500" />,
    category: "channel",
  },
  {
    key: "smsEnabled",
    label: "SMS Notifications",
    description: "Receive text messages for urgent alerts (new leads, expirations)",
    icon: <MessageSquare className="h-4 w-4 text-green-500" />,
    category: "channel",
  },
];

export default function NotificationPreferences() {
  const { data: serverPrefs, isLoading } = trpc.partners.getNotificationPrefs.useQuery();
  const [prefs, setPrefs] = useState<NotifPrefs>(DEFAULT_PREFS);
  const [isDirty, setIsDirty] = useState(false);

  const updatePrefs = trpc.partners.updateNotificationPrefs.useMutation({
    onSuccess: () => {
      toast.success("Notification preferences saved");
      setIsDirty(false);
    },
    onError: (err) => toast.error(err.message || "Failed to save preferences"),
  });

  useEffect(() => {
    if (serverPrefs) {
      setPrefs({
        newLead: serverPrefs.newLead ?? true,
        leadExpired: serverPrefs.leadExpired ?? true,
        commissionPaid: serverPrefs.commissionPaid ?? true,
        tierUpgrade: serverPrefs.tierUpgrade ?? true,
        newReview: serverPrefs.newReview ?? true,
        broadcastMessages: serverPrefs.broadcastMessages ?? true,
        weeklyDigest: serverPrefs.weeklyDigest ?? true,
        emailEnabled: serverPrefs.emailEnabled ?? true,
        smsEnabled: serverPrefs.smsEnabled ?? false,
      });
    }
  }, [serverPrefs]);

  const toggle = (key: keyof NotifPrefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    setIsDirty(true);
  };

  const handleSave = () => {
    updatePrefs.mutate(prefs);
  };

  if (isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A1628]" />
        </div>
      </PartnerLayout>
    );
  }

  const activeCount = ACTIVITY_PREFS.filter((p) => prefs[p.key]).length;

  return (
    <PartnerLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading text-gray-900">Notification Preferences</h1>
            <p className="text-gray-500 text-sm mt-1">
              Control which alerts you receive and how they're delivered.
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={!isDirty || updatePrefs.isPending}
            className="shrink-0 gap-2"
            style={{ backgroundColor: isDirty ? "#0A1628" : undefined, color: isDirty ? "white" : undefined }}
          >
            {updatePrefs.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="h-4 w-4" /> Save Changes</>
            )}
          </Button>
        </div>

        {/* Summary badge */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F5E642]/10 border border-teal-100">
          <Bell className="h-4 w-4 text-[#0A1628]" />
          <span className="text-sm text-[#0A1628]">
            <strong>{activeCount}</strong> of {ACTIVITY_PREFS.length} notification types enabled
            {prefs.emailEnabled && "  Email on"}
            {prefs.smsEnabled && "  SMS on"}
          </span>
        </div>

        {/* Activity notifications */}
        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Activity Notifications</h2>
            <p className="text-xs text-gray-400 mt-0.5">Choose which events trigger a notification</p>
          </div>
          <div className="divide-y divide-gray-50">
            {ACTIVITY_PREFS.map((item) => (
              <div key={item.key} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                      {item.key === "newLead" && (
                        <Badge className="bg-purple-100 text-purple-700 text-xs h-4 px-1.5">High Priority</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                </div>
                <Switch
                  checked={prefs[item.key]}
                  onCheckedChange={() => toggle(item.key)}
                  className="shrink-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Delivery channels */}
        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Delivery Channels</h2>
            <p className="text-xs text-gray-400 mt-0.5">How you want to receive notifications</p>
          </div>
          <div className="divide-y divide-gray-50">
            {CHANNEL_PREFS.map((item) => (
              <div key={item.key} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                      {item.key === "smsEnabled" && (
                        <Badge variant="outline" className="text-xs h-4 px-1.5 text-gray-400">Coming soon</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                </div>
                <Switch
                  checked={prefs[item.key]}
                  onCheckedChange={() => toggle(item.key)}
                  className="shrink-0"
                  disabled={item.key === "smsEnabled"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* In-app always on note */}
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-100 text-sm text-blue-700">
          <strong>In-app notifications</strong> are always enabled and cannot be disabled. They appear in your notification bell in the dashboard.
        </div>
      </div>
    </PartnerLayout>
  );
}
