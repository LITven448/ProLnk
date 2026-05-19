import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Wifi,
  AlertTriangle,
  CheckCircle,
  Thermometer,
  Lock,
  Video,
  Flame,
  Droplets,
  Home,
  Zap,
  DollarSign,
  Clock,
  Wrench,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Link } from "wouter";

interface Device {
  name: string;
  brand: string;
  benefit: string;
  connected: boolean;
  icon: typeof Thermometer;
}

interface Upgrade {
  name: string;
  price: string;
  annualSavings: string;
  payback: string;
  diy: boolean;
  icon: typeof Thermometer;
  description: string;
}

const DEVICES: Device[] = [
  { name: "Smart Thermostat", brand: "Nest", benefit: "Saves 15% on heating & cooling", connected: true, icon: Thermometer },
  { name: "Video Doorbell", brand: "Ring", benefit: "See & speak with visitors remotely", connected: true, icon: Video },
  { name: "Smart Lock", brand: "August", benefit: "Keyless entry, access logs", connected: true, icon: Lock },
  { name: "Security Camera", brand: "Arlo", benefit: "24/7 outdoor monitoring", connected: false, icon: Video },
  { name: "Smart Smoke Detector", brand: "Generic", benefit: "Phone alerts + voice warnings", connected: false, icon: Flame },
];

const UPGRADES: Upgrade[] = [
  {
    name: "Smart Thermostat",
    price: "$130″,
    annualSavings: "$180/yr",
    payback: "8.7 months",
    diy: true,
    icon: Thermometer,
    description: "Learning schedule adapts to your routine. Works with Alexa, Google, HomeKit.",
  },
  {
    name: "Smart Water Shutoff",
    price: "$199″,
    annualSavings: "Prevents $5–50K damage",
    payback: "Immediate protection",
    diy: false,
    icon: Droplets,
    description: "Detects leaks and automatically shuts off your main water line. Saves avg $8,200 in water damage.",
  },
  {
    name: "Smart Garage Door",
    price: "$99″,
    annualSavings: "Priceless peace of mind",
    payback: "Day 1″,
    diy: true,
    icon: Home,
    description: "Open, close, and monitor your garage from anywhere. Sends alerts if left open.",
  },
  {
    name: "Smart Smoke Detector",
    price: "$55″,
    annualSavings: "Insurance discount $60/yr",
    payback: "11 months",
    diy: true,
    icon: Flame,
    description: "Voice alerts tell you which room has smoke. Phone push notification the moment it triggers.",
  },
  {
    name: "Video Doorbell",
    price: "$180″,
    annualSavings: "Porch theft prevention",
    payback: "Immediate",
    diy: true,
    icon: Video,
    description: "See every visitor in HD. Motion zones, night vision, two-way audio. Works offline with local storage.",
  },
  {
    name: "Smart Irrigation",
    price: "$150″,
    annualSavings: "$200/yr on water",
    payback: "9 months",
    diy: true,
    icon: Droplets,
    description: "Weather-aware schedule skips watering before rain. DFW savings avg $200/yr on water bills.",
  },
];

export default function SmartHomeGuide() {
  const [devices] = useState<Device[]>(DEVICES);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white p-6 space-y-8″>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1″>
            <Wifi className="text-blue-400″ size={22} />
            <h1 className="text-2xl font-bold">Smart Home Guide</h1>
          </div>
          <p className="text-slate-400 text-sm">Make your home smarter, safer, and more efficient</p>
        </div>

        {/* Connected devices */}
        <div>
          <h2 className="text-lg font-semibold mb-4″>Your Smart Devices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4″>
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <div
                  key={device.name}
                  className={`bg-[#111C30] border rounded-xl p-4 flex items-start gap-4 ${
                    device.connected ? "border-green-500/30″ : "border-white/10"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    device.connected ? "bg-green-500/15″ : "bg-slate-700/50"
                  }`}>
                    <Icon size={18} className={device.connected ? "text-green-400″ : "text-slate-500"} />
                  </div>
                  <div className="flex-1 min-w-0″>
                    <div className="flex items-center gap-2 mb-0.5″>
                      <p className="font-semibold text-sm text-white truncate">{device.name}</p>
                      {device.connected ? (
                        <CheckCircle size={14} className="text-green-400 flex-shrink-0″ />
                      ) : (
                        <AlertTriangle size={14} className="text-yellow-400 flex-shrink-0″ />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mb-1″>{device.brand}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{device.benefit}</p>
                    <Badge
                      className={`mt-2 text-xs ${
                        device.connected
                          ? "bg-green-500/15 text-green-300 border-green-500/20″
                          : "bg-yellow-500/15 text-yellow-300 border-yellow-500/20″
                      }`}
                    >
                      {device.connected ? "Connected" : "Not set up"}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compatibility note */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3″>
          <Wifi className="text-blue-400 flex-shrink-0 mt-0.5″ size={18} />
          <p className="text-blue-200 text-sm">
            Most smart devices work with <span className="font-semibold">Amazon Alexa</span>,{" "}
            <span className="font-semibold">Google Home</span>, and{" "}
            <span className="font-semibold">Apple HomeKit</span>. Check compatibility before purchasing.
          </p>
        </div>

        {/* Recommended upgrades */}
        <div>
          <div className="flex items-center justify-between mb-4″>
            <h2 className="text-lg font-semibold">Recommended Upgrades</h2>
            <Badge className="bg-slate-700 text-slate-300 text-xs">Sorted by ROI</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4″>
            {UPGRADES.map((upgrade) => {
              const Icon = upgrade.icon;
              return (
                <div key={upgrade.name} className="bg-[#111C30] border border-white/10 rounded-xl p-5 hover:border-blue-500/40 transition-colors space-y-3″>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center">
                      <Icon className="text-blue-400″ size={18} />
                    </div>
                    {upgrade.diy ? (
                      <Badge className="bg-green-500/15 text-green-300 border-green-500/20 text-xs">DIY Install</Badge>
                    ) : (
                      <Badge className="bg-orange-500/15 text-orange-300 border-orange-500/20 text-xs">Pro Install</Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{upgrade.name}</h3>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{upgrade.description}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5″>
                    <div>
                      <p className="text-slate-500 text-xs">Cost</p>
                      <p className="text-white text-sm font-semibold">{upgrade.price}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Saves</p>
                      <p className="text-green-400 text-xs font-semibold leading-tight">{upgrade.annualSavings}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Payback</p>
                      <p className="text-blue-400 text-xs font-semibold leading-tight">{upgrade.payback}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Install CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/10 border border-blue-500/30 rounded-xl p-6 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div>
            <h3 className="font-semibold text-white text-lg">Install My Smart Devices</h3>
            <p className="text-slate-400 text-sm mt-1″>
              Connect with trusted electricians and handymen in DFW who specialize in smart home setup.
            </p>
          </div>
          <Link href="/homeowner/pros">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 whitespace-nowrap">
              Find Installers
              <ChevronRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Privacy tip */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3″>
          <Shield className="text-yellow-400 flex-shrink-0 mt-0.5″ size={18} />
          <p className="text-yellow-100 text-sm">
            <span className="font-semibold">Privacy tip:</span> Smart devices collect data. Review privacy settings after
            setup, disable features you don&apos;t need, and always use strong unique passwords on your Wi-Fi and device accounts.
          </p>
        </div>

      </div>
    </HomeownerLayout>
  );
}
