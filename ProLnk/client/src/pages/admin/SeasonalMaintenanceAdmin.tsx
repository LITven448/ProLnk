import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Sun, Snowflake, Cloud, Wrench, ThermometerSun, Droplets, Zap, Bug, Home, Paintbrush, Fan, Calendar, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const SEASON_CONFIG = {
  spring: { icon: Leaf, color: "text-green-400", bg: "bg-green-500/20", label: "Spring", months: "Mar - May" },
  summer: { icon: Sun, color: "text-amber-400", bg: "bg-amber-500/20", label: "Summer", months: "Jun - Aug" },
  fall: { icon: Cloud, color: "text-orange-400", bg: "bg-orange-500/20", label: "Fall", months: "Sep - Nov" },
  winter: { icon: Snowflake, color: "text-blue-400", bg: "bg-blue-500/20", label: "Winter", months: "Dec - Feb" },
};

const CATEGORY_ICONS: Record<string, any> = {
  hvac: Fan,
  roof: Home,
  plumbing: Droplets,
  electrical: Zap,
  exterior: Paintbrush,
  interior: Home,
  landscaping: Leaf,
  pest_control: Bug,
  appliance: Wrench,
};

const DEFAULT_TASKS = {
  spring: [
    { name: "HVAC Spring Tune-Up", category: "hvac", priority: "high", description: "Schedule annual AC inspection and filter replacement before summer heat" },
    { name: "Gutter Cleaning", category: "exterior", priority: "medium", description: "Clear gutters and downspouts of winter debris" },
    { name: "Roof Inspection", category: "roof", priority: "high", description: "Check for winter storm damage, missing shingles, and flashing issues" },
    { name: "Irrigation System Check", category: "landscaping", priority: "medium", description: "Test sprinkler heads, check for leaks, adjust coverage" },
    { name: "Pest Prevention Treatment", category: "pest_control", priority: "medium", description: "Schedule preventive pest treatment before bug season" },
  ],
  summer: [
    { name: "AC Filter Replacement", category: "hvac", priority: "high", description: "Replace AC filters for peak summer performance" },
    { name: "Exterior Paint Touch-Up", category: "exterior", priority: "low", description: "Touch up exterior paint before fall weather" },
    { name: "Window Seal Inspection", category: "interior", priority: "medium", description: "Check window seals for energy efficiency" },
  ],
  fall: [
    { name: "HVAC Fall Tune-Up", category: "hvac", priority: "high", description: "Schedule furnace inspection before winter" },
    { name: "Gutter Cleaning (Fall)", category: "exterior", priority: "medium", description: "Clear fall leaves from gutters and downspouts" },
    { name: "Water Heater Flush", category: "plumbing", priority: "medium", description: "Flush water heater to remove sediment buildup" },
    { name: "Weatherstripping Check", category: "interior", priority: "medium", description: "Replace worn weatherstripping on doors and windows" },
  ],
  winter: [
    { name: "Pipe Insulation Check", category: "plumbing", priority: "high", description: "Ensure exposed pipes are insulated against freezing" },
    { name: "Smoke/CO Detector Test", category: "electrical", priority: "high", description: "Test all smoke and carbon monoxide detectors, replace batteries" },
    { name: "Appliance Deep Clean", category: "appliance", priority: "low", description: "Deep clean oven, dishwasher, and refrigerator coils" },
  ],
};

const PRIORITY_STYLES: Record<string, string> = {
  high: "bg-red-500/20 text-red-400",
  medium: "bg-amber-500/20 text-amber-400",
  low: "bg-slate-500/20 text-slate-400",
  urgent: "bg-red-600/30 text-red-300",
};

export default function SeasonalMaintenanceAdmin() {
  const currentMonth = new Date().getMonth() + 1;
  const currentSeason = currentMonth >= 3 && currentMonth <= 5 ? "spring"
    : currentMonth >= 6 && currentMonth <= 8 ? "summer"
    : currentMonth >= 9 && currentMonth <= 11 ? "fall"
    : "winter";

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="h-6 w-6 text-green-400" />
            Seasonal Maintenance System
          </h1>
          <p className="text-slate-400 mt-1">Manage seasonal maintenance reminders and task templates for homeowners</p>
        </div>

        {/* Current Season Highlight */}
        <Card className={`border-slate-700 ${SEASON_CONFIG[currentSeason].bg} bg-opacity-10`} style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {(() => {
                const SeasonIcon = SEASON_CONFIG[currentSeason].icon;
                return <SeasonIcon className={`h-10 w-10 ${SEASON_CONFIG[currentSeason].color}`} />;
              })()}
              <div>
                <h2 className={`text-xl font-bold ${SEASON_CONFIG[currentSeason].color}`}>
                  Current Season: {SEASON_CONFIG[currentSeason].label}
                </h2>
                <p className="text-slate-400">
                  {DEFAULT_TASKS[currentSeason].length} maintenance tasks recommended for homeowners this season
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Season Tabs */}
        <Tabs defaultValue={currentSeason} className="space-y-4">
          <TabsList className="bg-slate-800">
            {Object.entries(SEASON_CONFIG).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <TabsTrigger key={key} value={key} className="flex items-center gap-1">
                  <Icon className={`h-4 w-4 ${key === currentSeason ? config.color : ''}`} />
                  {config.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(DEFAULT_TASKS).map(([season, tasks]) => {
            const config = SEASON_CONFIG[season as keyof typeof SEASON_CONFIG];
            return (
              <TabsContent key={season} value={season} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-semibold ${config.color}`}>
                      {config.label} Maintenance Tasks ({config.months})
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {tasks.length} tasks · These are auto-generated for each homeowner property
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {tasks.map((task, i) => {
                    const CategoryIcon = CATEGORY_ICONS[task.category] || Wrench;
                    return (
                      <Card key={i} className="bg-slate-800/60 border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${config.bg}`}>
                              <CategoryIcon className={`h-5 w-5 ${config.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-white">{task.name}</h4>
                                <Badge className={PRIORITY_STYLES[task.priority] + " text-xs"}>
                                  {task.priority}
                                </Badge>
                                <Badge variant="outline" className="text-xs border-slate-600 text-slate-400 capitalize">
                                  {task.category.replace("_", " ")}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-400 mt-1">{task.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Auto-sent 14 days before due
                                </span>
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Connects to ProLnk leads
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* How It Works */}
        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">How Seasonal Maintenance Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {[
                { step: "1", title: "Auto-Generate", desc: "Tasks are auto-created for each property based on home profile data", icon: Calendar },
                { step: "2", title: "Notify", desc: "Homeowners receive email reminders 14 days before each task is due", icon: AlertTriangle },
                { step: "3", title: "Connect", desc: "Each task includes a 'Hire a Pro' button that creates a ProLnk lead", icon: Wrench },
                { step: "4", title: "Track", desc: "Completion is tracked in the Home Health Vault for long-term home health scoring", icon: CheckCircle2 },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="text-center">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-5 w-5 text-teal-400" />
                    </div>
                    <h4 className="text-sm font-medium text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
