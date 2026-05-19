import React from 'react';
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Wrench,
  Tag,
  User,
  Mail,
  Smartphone,
  MonitorSmartphone,
  Moon,
  CheckCircle,
  Calendar,
} from "lucide-react";

type Channel = "email" | "sms" | "push";

interface NotifItem {
  id: string;
  label: string;
  description: string;
  channels: Record<Channel, boolean>;
  enabled: boolean;
}

interface NotifGroup {
  key: string;
  title: string;
  icon: React.ElementType;
  color: string;
  items: NotifItem[];
}

const initialGroups: NotifGroup[] = [
  {
    key: "maintenance",
    title: "Maintenance & Reminders",
    icon: Wrench,
    color: "text-teal-400″,
    items: [
      {
        id: "m1″,
        label: "Seasonal Maintenance Alerts",
        description: "Spring, fall, and winter prep reminders",
        enabled: true,
        channels: { email: true, sms: false, push: true },
      },
      {
        id: "m2″,
        label: "Filter & Inspection Due",
        description: "HVAC filters, smoke detectors, and more",
        enabled: true,
        channels: { email: true, sms: true, push: true },
      },
      {
        id: "m3″,
        label: "Warranty Expiration",
        description: "Before appliance or roof warranties expire",
        enabled: true,
        channels: { email: true, sms: false, push: false },
      },
    ],
  },
  {
    key: "service",
    title: "Service & Jobs",
    icon: Calendar,
    color: "text-blue-400″,
    items: [
      {
        id: "s1″,
        label: "Job Status Updates",
        description: "When a pro accepts, starts, or completes a job",
        enabled: true,
        channels: { email: true, sms: true, push: true },
      },
      {
        id: "s2″,
        label: "Pro En Route",
        description: "Notification when your pro is on the way",
        enabled: true,
        channels: { email: false, sms: true, push: true },
      },
      {
        id: "s3″,
        label: "Invoice Ready",
        description: "When a new invoice is available to review",
        enabled: true,
        channels: { email: true, sms: false, push: true },
      },
    ],
  },
  {
    key: "deals",
    title: "Deals & Offers",
    icon: Tag,
    color: "text-orange-400″,
    items: [
      {
        id: "d1″,
        label: "Neighborhood Deals",
        description: "Group discounts available in your area",
        enabled: true,
        channels: { email: true, sms: false, push: false },
      },
      {
        id: "d2″,
        label: "Pro Promotions",
        description: "Seasonal offers from your saved pros",
        enabled: false,
        channels: { email: true, sms: false, push: false },
      },
      {
        id: "d3″,
        label: "Savings Milestones",
        description: "When you hit a new savings tier",
        enabled: true,
        channels: { email: true, sms: false, push: true },
      },
    ],
  },
  {
    key: "account",
    title: "Account & Security",
    icon: User,
    color: "text-purple-400″,
    items: [
      {
        id: "a1″,
        label: "Login Alerts",
        description: "Notify on new device sign-ins",
        enabled: true,
        channels: { email: true, sms: true, push: true },
      },
      {
        id: "a2″,
        label: "Payment Processed",
        description: "Receipt confirmation for all transactions",
        enabled: true,
        channels: { email: true, sms: false, push: false },
      },
      {
        id: "a3″,
        label: "ProLnk Product Updates",
        description: "New features and platform announcements",
        enabled: false,
        channels: { email: true, sms: false, push: false },
      },
    ],
  },
];

const channelIcons: Record<Channel, React.ElementType> = {
  email: Mail,
  sms: Smartphone,
  push: MonitorSmartphone,
};

export default function NotificationSettings() {
  const [groups, setGroups] = useState<NotifGroup[]>(initialGroups);
  const [quietHours, setQuietHours] = useState(true);
  const [digest, setDigest] = useState<"instant" | "daily" | "weekly">("daily");
  const [saved, setSaved] = useState(false);

  function toggleItem(gKey: string, itemId: string, field: "enabled" | Channel) {
    setGroups((prev) =>
      prev.map((g) =>
        g.key !== gKey
          ? g
          : {
              ...g,
              items: g.items.map((item) =>
                item.id !== itemId
                  ? item
                  : field === "enabled"
                  ? { ...item, enabled: !item.enabled }
                  : {
                      ...item,
                      channels: { ...item.channels, [field]: !item.channels[field as Channel] },
                    }
              ),
            }
      )
    );
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-8 max-w-2xl mx-auto">
        <div className="mb-8″>
          <h1 className="text-3xl font-bold text-white mb-1″>Notification Settings</h1>
          <p className="text-slate-400 text-sm">Control how and when ProLnk contacts you</p>
        </div>

        <div className="space-y-5″>
          {groups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <Card key={group.key} className="bg-[#0F1F38] border border-slate-700″>
                <CardContent className="p-5″>
                  <div className="flex items-center gap-2 mb-4″>
                    <GroupIcon className={`w-4 h-4 ${group.color}`} />
                    <span className="text-white font-semibold text-sm">{group.title}</span>
                  </div>

                  <div className="space-y-4″>
                    {group.items.map((item) => (
                      <div key={item.id} className="border-b border-slate-800 last:border-0 pb-4 last:pb-0″>
                        <div className="flex items-start justify-between gap-4 mb-2″>
                          <div className="flex-1″>
                            <div className="text-sm text-white font-medium">{item.label}</div>
                            <div className="text-xs text-slate-500 mt-0.5″>{item.description}</div>
                          </div>
                          <Switch
                            checked={item.enabled}
                            onCheckedChange={() => toggleItem(group.key, item.id, "enabled")}
                            className="data-[state=checked]:bg-teal-500 flex-shrink-0″
                          />
                        </div>

                        {item.enabled && (
                          <div className="flex gap-3 mt-2″>
                            {(["email", "sms", "push"] as Channel[]).map((ch) => {
                              const Icon = channelIcons[ch];
                              const active = item.channels[ch];
                              return (
                                <button
                                  key={ch}
                                  onClick={() => toggleItem(group.key, item.id, ch)}
                                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border transition-colors ${
                                    active
                                      ? "border-teal-500 bg-teal-900/40 text-teal-300″
                                      : "border-slate-700 bg-slate-800/40 text-slate-500 hover:border-slate-500″
                                  }`}
                                >
                                  <Icon className="w-3 h-3″ />
                                  <span className="capitalize">{ch}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Card className="bg-[#0F1F38] border border-slate-700″>
            <CardContent className="p-5 space-y-5″>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2″>
                    <Moon className="w-4 h-4 text-indigo-400″ />
                    <span className="text-white text-sm font-semibold">Quiet Hours</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5″>
                    Pause all push & SMS between 10 PM – 7 AM
                  </p>
                </div>
                <Switch
                  checked={quietHours}
                  onCheckedChange={setQuietHours}
                  className="data-[state=checked]:bg-teal-500″
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3″>
                  <Bell className="w-4 h-4 text-yellow-400″ />
                  <span className="text-white text-sm font-semibold">Email Digest Preference</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(["instant", "daily", "weekly"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setDigest(opt)}
                      className={`text-xs px-3 py-1.5 rounded-full border capitalize transition-colors ${
                        digest === opt
                          ? "bg-teal-600 border-teal-500 text-white"
                          : "border-slate-700 text-slate-400 hover:border-slate-500″
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 transition-colors ${
              saved ? "bg-green-600 hover:bg-green-700″ : "bg-teal-600 hover:bg-teal-700"
            } text-white`}
          >
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4″ />
                Saved!
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </div>
      </div>
    </HomeownerLayout>
  );
}
