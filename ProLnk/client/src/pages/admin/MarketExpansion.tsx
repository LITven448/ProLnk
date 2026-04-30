import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { MapView } from "@/components/Map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin, TrendingUp, Users, Target, Building2, ChevronRight,
  Globe, Star, Zap, DollarSign, BarChart3, CheckCircle2
} from "lucide-react";
import { SERVICE_GROUPS, SERVICE_CATEGORIES } from "../../../../shared/serviceCategories";

// --- DFW Market Data ----------------------------------------------------------
const DFW_ZONES = [
  { name: "Dallas Core", lat: 32.7767, lng: -96.7970, status: "active", partners: 0, target: 25, priority: 1 },
  { name: "Fort Worth", lat: 32.7555, lng: -97.3308, status: "recruiting", partners: 0, target: 20, priority: 2 },
  { name: "Plano / Frisco", lat: 33.0198, lng: -96.6989, status: "recruiting", partners: 0, target: 30, priority: 1 },
  { name: "Arlington", lat: 32.7357, lng: -97.1081, status: "planned", partners: 0, target: 15, priority: 3 },
  { name: "Irving / Las Colinas", lat: 32.8140, lng: -96.9489, status: "planned", partners: 0, target: 15, priority: 3 },
  { name: "McKinney / Allen", lat: 33.1972, lng: -96.6397, status: "recruiting", partners: 0, target: 20, priority: 2 },
  { name: "Southlake / Keller", lat: 32.9401, lng: -97.1325, status: "planned", partners: 0, target: 12, priority: 4 },
  { name: "Garland / Mesquite", lat: 32.9126, lng: -96.6389, status: "planned", partners: 0, target: 10, priority: 4 },
];

// --- National Expansion Markets -----------------------------------------------
const NATIONAL_MARKETS = [
  { city: "Houston, TX", lat: 29.7604, lng: -95.3698, tier: 1, homeowners: 890000, score: 94, status: "next" },
  { city: "Austin, TX", lat: 30.2672, lng: -97.7431, tier: 1, homeowners: 380000, score: 91, status: "next" },
  { city: "San Antonio, TX", lat: 29.4241, lng: -98.4936, tier: 1, homeowners: 420000, score: 88, status: "next" },
  { city: "Phoenix, AZ", lat: 33.4484, lng: -112.0740, tier: 2, homeowners: 620000, score: 85, status: "planned" },
  { city: "Denver, CO", lat: 39.7392, lng: -104.9903, tier: 2, homeowners: 290000, score: 82, status: "planned" },
  { city: "Atlanta, GA", lat: 33.7490, lng: -84.3880, tier: 2, homeowners: 510000, score: 80, status: "planned" },
  { city: "Charlotte, NC", lat: 35.2271, lng: -80.8431, tier: 2, homeowners: 320000, score: 78, status: "planned" },
  { city: "Nashville, TN", lat: 36.1627, lng: -86.7816, tier: 2, homeowners: 280000, score: 76, status: "planned" },
  { city: "Las Vegas, NV", lat: 36.1699, lng: -115.1398, tier: 3, homeowners: 350000, score: 72, status: "future" },
  { city: "Orlando, FL", lat: 28.5383, lng: -81.3792, tier: 3, homeowners: 310000, score: 70, status: "future" },
  { city: "Tampa, FL", lat: 27.9506, lng: -82.4572, tier: 3, homeowners: 290000, score: 68, status: "future" },
  { city: "Raleigh, NC", lat: 35.7796, lng: -78.6382, tier: 3, homeowners: 240000, score: 66, status: "future" },
];

const STATUS_COLORS: Record<string, string> = {
  active: "bg-teal-500",
  recruiting: "bg-yellow-500",
  planned: "bg-blue-500",
  future: "bg-gray-400",
  next: "bg-orange-500",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  recruiting: "Recruiting",
  planned: "Planned",
  next: "Next Launch",
  future: "Future",
};

// --- Partner Recruitment Templates -------------------------------------------
const RECRUITMENT_TEMPLATES = [
  {
    title: "Cold Outreach -- Lawn Care",
    subject: "Join the ProLnk Network -- Earn More From Every Job",
    preview: "Hi [Name], I noticed your lawn care business in [City]...",
    category: "Lawn & Outdoor",
    conversionRate: "18%",
  },
  {
    title: "Referral Partner Invite",
    subject: "Your neighbor [Partner Name] thinks you'd be a great fit",
    preview: "Hi [Name], [Partner Name] from [Business] recommended...",
    category: "All Categories",
    conversionRate: "34%",
  },
  {
    title: "Trade Show Follow-Up",
    subject: "Great meeting you at [Event] -- here's what ProLnk can do for you",
    preview: "Hi [Name], it was great connecting at [Event]...",
    category: "All Categories",
    conversionRate: "22%",
  },
  {
    title: "Facebook/Instagram DM",
    subject: "N/A (Social DM)",
    preview: "Hey [Name]! I came across your business and wanted to share...",
    category: "All Categories",
    conversionRate: "12%",
  },
];

export default function MarketExpansion() {
  const [mapView, setMapView] = useState<"dfw" | "national">("dfw");
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

  const { data: partners } = trpc.admin.getAllPartners.useQuery();

  // Count partners per zone (simplified -- in production would use geolocation)
  const approvedPartners = (partners ?? []).filter((p: { status: string; serviceAreaLat?: string | null; serviceAreaLng?: string | null; businessName?: string }) => p.status === "approved");

  function handleMapReady(map: google.maps.Map) {
    setMapInstance(map);

    if (mapView === "dfw") {
      map.setCenter({ lat: 32.8, lng: -97.0 });
      map.setZoom(10);

      // Add DFW zone circles
      DFW_ZONES.forEach(zone => {
        const circle = new google.maps.Circle({
          strokeColor: zone.status === "active" ? "#00B5B8" : zone.status === "recruiting" ? "#F59E0B" : "#6366F1",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: zone.status === "active" ? "#00B5B8" : zone.status === "recruiting" ? "#F59E0B" : "#6366F1",
          fillOpacity: 0.15,
          map,
          center: { lat: zone.lat, lng: zone.lng },
          radius: 8000,
        });

        const marker = new google.maps.Marker({
          position: { lat: zone.lat, lng: zone.lng },
          map,
          title: zone.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: zone.status === "active" ? "#00B5B8" : zone.status === "recruiting" ? "#F59E0B" : "#6366F1",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family: sans-serif; padding: 8px; min-width: 180px;">
              <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">${zone.name}</div>
              <div style="color: #666; font-size: 12px;">Status: <span style="color: ${zone.status === "active" ? "#00B5B8" : "#F59E0B"}; font-weight: 600;">${STATUS_LABELS[zone.status]}</span></div>
              <div style="color: #666; font-size: 12px;">Partners: ${zone.partners} / ${zone.target} target</div>
              <div style="color: #666; font-size: 12px;">Priority: ${zone.priority === 1 ? " High" : zone.priority === 2 ? " Medium" : " Low"}</div>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
          setSelectedZone(zone.name);
        });
      });

      // Add approved partner markers
      approvedPartners.forEach((partner: { status: string; serviceAreaLat?: string | null; serviceAreaLng?: string | null; businessName?: string }) => {
        if (partner.serviceAreaLat && partner.serviceAreaLng) {
          new google.maps.Marker({
            position: { lat: Number(partner.serviceAreaLat), lng: Number(partner.serviceAreaLng) },
            map,
            title: partner.businessName ?? "",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: "#00B5B8",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          });
        }
      });

    } else {
      // National view
      map.setCenter({ lat: 35.0, lng: -95.0 });
      map.setZoom(5);

      NATIONAL_MARKETS.forEach(market => {
        const color = market.status === "next" ? "#F97316" : market.status === "planned" ? "#6366F1" : "#9CA3AF";

        const marker = new google.maps.Marker({
          position: { lat: market.lat, lng: market.lng },
          map,
          title: market.city,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: Math.max(8, market.score / 10),
            fillColor: color,
            fillOpacity: 0.85,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family: sans-serif; padding: 8px; min-width: 200px;">
              <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">${market.city}</div>
              <div style="color: #666; font-size: 12px;">Homeowners: ${market.homeowners.toLocaleString()}</div>
              <div style="color: #666; font-size: 12px;">Market Score: <strong>${market.score}/100</strong></div>
              <div style="color: #666; font-size: 12px;">Tier: ${market.tier === 1 ? " Priority 1" : market.tier === 2 ? " Priority 2" : " Priority 3"}</div>
              <div style="color: #666; font-size: 12px; margin-top: 4px;">Status: <span style="color: ${color}; font-weight: 600;">${STATUS_LABELS[market.status]}</span></div>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
          setSelectedMarket(market.city);
        });
      });

      // DFW marker (current)
      new google.maps.Marker({
        position: { lat: 32.7767, lng: -96.7970 },
        map,
        title: "Dallas-Fort Worth (LIVE)",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 14,
          fillColor: "#00B5B8",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3,
        },
      });
    }
  }

  return (
    <AdminLayout title="Market Expansion" subtitle="DFW launch command + national growth roadmap">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-heading">
              Market Expansion
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              DFW launch command + national growth roadmap
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={mapView === "dfw" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("dfw")}
              className={mapView === "dfw" ? "bg-teal-500 hover:bg-teal-600 text-white" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
            >
              <MapPin className="w-4 h-4 mr-1" /> DFW View
            </Button>
            <Button
              variant={mapView === "national" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("national")}
              className={mapView === "national" ? "bg-teal-500 hover:bg-teal-600 text-white" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
            >
              <Globe className="w-4 h-4 mr-1" /> National View
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Markets", value: "1", sub: "DFW Launch", icon: MapPin, color: "text-teal-400" },
            { label: "Planned Markets", value: "12", sub: "Next 24 months", icon: Globe, color: "text-blue-400" },
            { label: "Total Addressable", value: "4.2M", sub: "Homeowners", icon: Building2, color: "text-purple-400" },
            { label: "Revenue Potential", value: "$84M", sub: "At full scale", icon: DollarSign, color: "text-yellow-400" },
          ].map(stat => (
            <Card key={stat.label} className="bg-slate-800/60 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-slate-400 text-xs">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-white font-heading">
                  {stat.value}
                </div>
                <div className="text-slate-500 text-xs">{stat.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map + Side Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/60 border-slate-700 overflow-hidden">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  {mapView === "dfw" ? "DFW Coverage Zones" : "National Expansion Roadmap"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[420px]">
                  <MapView
                    key={mapView}
                    onMapReady={handleMapReady}
                    className="w-full h-full"
                  />
                </div>
                {/* Legend */}
                <div className="px-4 py-3 border-t border-slate-700 flex flex-wrap gap-4">
                  {mapView === "dfw" ? (
                    <>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-3 h-3 rounded-full bg-teal-500 inline-block" /> Active
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" /> Recruiting
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" /> Planned
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-3 h-3 rounded-full bg-teal-500 inline-block" /> Live (DFW)
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" /> Next Launch
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" /> Planned
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-3 h-3 rounded-full bg-gray-500 inline-block" /> Future
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {mapView === "dfw" ? (
              <>
                <Card className="bg-slate-800/60 border-slate-700">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-white text-sm">DFW Zone Status</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 space-y-3">
                    {DFW_ZONES.map(zone => (
                      <div key={zone.name} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300 text-xs font-medium">{zone.name}</span>
                          <Badge className={`${STATUS_COLORS[zone.status]} text-white text-[10px] px-1.5 py-0`}>
                            {STATUS_LABELS[zone.status]}
                          </Badge>
                        </div>
                        <Progress
                          value={(zone.partners / zone.target) * 100}
                          className="h-1.5 bg-slate-700"
                        />
                        <div className="text-slate-500 text-[10px]">
                          {zone.partners}/{zone.target} partners
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-slate-800/60 border-slate-700">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-white text-sm">Top Priority Markets</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-2">
                  {NATIONAL_MARKETS.filter(m => m.tier <= 2).map(market => (
                    <div
                      key={market.city}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 cursor-pointer transition-colors"
                      onClick={() => setSelectedMarket(market.city)}
                    >
                      <div>
                        <div className="text-slate-200 text-xs font-medium">{market.city}</div>
                        <div className="text-slate-500 text-[10px]">{market.homeowners.toLocaleString()} homeowners</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-teal-400 text-xs font-bold">{market.score}</div>
                          <div className="text-slate-500 text-[10px]">score</div>
                        </div>
                        <Badge className={`${STATUS_COLORS[market.status]} text-white text-[10px] px-1.5 py-0`}>
                          {STATUS_LABELS[market.status]}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Bottom Tabs */}
        <Tabs defaultValue="categories" className="space-y-4">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="categories" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white text-slate-400">
              Service Categories
            </TabsTrigger>
            <TabsTrigger value="recruitment" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white text-slate-400">
              Partner Recruitment
            </TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white text-slate-400">
              Market Marketing
            </TabsTrigger>
          </TabsList>

          {/* Service Categories */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICE_GROUPS.map(group => {
                const cats = SERVICE_CATEGORIES.filter(c => c.group === group);
                return (
                  <Card key={group} className="bg-slate-800/60 border-slate-700">
                    <CardHeader className="pb-2 pt-4 px-4">
                      <CardTitle className="text-teal-400 text-sm">{group}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 space-y-1">
                      {cats.map(cat => (
                        <div key={cat.id} className="flex items-center justify-between py-1 border-b border-slate-700/50 last:border-0">
                          <span className="text-slate-300 text-xs">{cat.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 text-[10px]">${cat.avgJobValue.toLocaleString()} avg</span>
                            <Badge variant="outline" className="border-teal-700 text-teal-400 text-[10px] px-1 py-0">
                              {Math.round(cat.platformFeeRate * 100)}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Partner Recruitment */}
          <TabsContent value="recruitment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RECRUITMENT_TEMPLATES.map(template => (
                <Card key={template.title} className="bg-slate-800/60 border-slate-700 hover:border-teal-700 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-white text-sm font-semibold">{template.title}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{template.category}</div>
                      </div>
                      <Badge className="bg-teal-500/20 text-teal-400 border-teal-700 text-xs">
                        {template.conversionRate} CVR
                      </Badge>
                    </div>
                    <div className="text-slate-500 text-xs mb-1">Subject: {template.subject}</div>
                    <div className="text-slate-400 text-xs italic">"{template.preview}"</div>
                    <Button size="sm" variant="outline" className="mt-3 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs w-full">
                      Use Template <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Market Marketing */}
          <TabsContent value="marketing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/60 border-slate-700">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-teal-400" /> DFW Launch Marketing Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  {[
                    { channel: "Facebook / Instagram Ads", budget: "$1,500/mo", target: "Homeowners 30-65", status: "planned" },
                    { channel: "Google Local Service Ads", budget: "$800/mo", target: "High-intent searches", status: "planned" },
                    { channel: "Nextdoor Advertising", budget: "$400/mo", target: "Neighborhood targeting", status: "planned" },
                    { channel: "Direct Mail (EDDM)", budget: "$600/mo", target: "Zip code targeting", status: "planned" },
                    { channel: "Partner Co-Marketing", budget: "$0 (shared)", target: "Partner customer lists", status: "active" },
                    { channel: "Yard Signs / Door Hangers", budget: "$300/mo", target: "Post-job visibility", status: "active" },
                  ].map(item => (
                    <div key={item.channel} className="flex items-center justify-between p-2 rounded-lg bg-slate-700/40">
                      <div>
                        <div className="text-slate-200 text-xs font-medium">{item.channel}</div>
                        <div className="text-slate-500 text-[10px]">{item.target}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-teal-400 text-xs font-semibold">{item.budget}</div>
                        <Badge className={`${item.status === "active" ? "bg-teal-500/20 text-teal-400" : "bg-slate-600 text-slate-400"} text-[10px] px-1 py-0`}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border-slate-700">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <Target className="w-4 h-4 text-teal-400" /> Market Launch Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-2">
                  {[
                    { task: "Recruit 5 anchor partners (lawn, pest, pool, HVAC, handyman)", done: false },
                    { task: "Set up Google Business Profile for ProLnk DFW", done: false },
                    { task: "Create DFW-specific landing page", done: false },
                    { task: "Launch Facebook/Instagram campaign", done: false },
                    { task: "Partner co-marketing materials designed", done: false },
                    { task: "First 10 jobs logged and AI analyzed", done: false },
                    { task: "First referral successfully routed and closed", done: false },
                    { task: "First commission paid out", done: false },
                    { task: "Case study / testimonial from first partner", done: false },
                    { task: "Expand to 20+ partners", done: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-slate-700/40 transition-colors">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.done ? "text-teal-400" : "text-slate-600"}`} />
                      <span className={`text-xs ${item.done ? "text-slate-500 line-through" : "text-slate-300"}`}>
                        {item.task}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
