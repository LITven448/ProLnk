import { useState, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sliders, MapPin, DollarSign, Wrench, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const SERVICE_CATEGORIES = [
  "Roofing", "HVAC", "Plumbing", "Electrical", "Lawn Care", "Landscaping",
  "Painting (Interior)", "Painting (Exterior)", "Windows", "Gutters",
  "Pressure Washing", "Flooring", "Remodeling", "Pest Control", "Cleaning",
];

const JOB_TYPES = ["Residential", "Commercial", "Insurance Claims", "New Construction", "Renovation"];

export default function JobMatchingPreferences() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["Roofing", "Gutters"]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(["Residential", "Insurance Claims"]);
  const [minJobValue, setMinJobValue] = useState("500");
  const [maxRadius, setMaxRadius] = useState("25");
  const [maxJobsPerWeek, setMaxJobsPerWeek] = useState("5");
  const [emergencyJobs, setEmergencyJobs] = useState(true);
  const [weekendJobs, setWeekendJobs] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleService = (s: string) => {
    setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const toggleJobType = (t: string) => {
    setSelectedJobTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const { data: savedPrefs } = trpc.partnerTools.jobPreferences.get.useQuery();
  const saveMutation = trpc.partnerTools.jobPreferences.save.useMutation({
    onSuccess: () => { setSaved(true); toast.success("Preferences saved!"); setTimeout(() => setSaved(false), 3000); },
    onError: (err) => toast.error(`Save failed: ${err.message}`),
  });

  useEffect(() => {
    if (savedPrefs) {
      if (savedPrefs.serviceCategories?.length) setSelectedServices(savedPrefs.serviceCategories);
      if (savedPrefs.preferredDays?.length) {
        // preferredDays are 0-6 numbers; map to job types by index
        const dayNames = ["Residential", "Commercial", "Insurance Claims", "New Construction", "Renovation"];
        setSelectedJobTypes(savedPrefs.preferredDays.map(d => dayNames[d]).filter(Boolean));
      }
      if (savedPrefs.minJobValue != null) setMinJobValue(String(savedPrefs.minJobValue));
      if (savedPrefs.maxJobDistance != null) setMaxRadius(String(savedPrefs.maxJobDistance));
      setEmergencyJobs(savedPrefs.acceptsEmergency ?? true);
    }
  }, [savedPrefs]);

  const save = () => {
    const JOB_TYPE_TO_DAY: Record<string, number> = {
      "Residential": 0, "Commercial": 1, "Insurance Claims": 2, "New Construction": 3, "Renovation": 4
    };
    saveMutation.mutate({
      serviceCategories: selectedServices,
      preferredDays: selectedJobTypes.map(t => JOB_TYPE_TO_DAY[t]).filter(d => d !== undefined),
      minJobValue: String(parseInt(minJobValue) || 0),
      maxJobDistance: parseInt(maxRadius) || 25,
      acceptsEmergency: emergencyJobs,
    });
  };

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Job Matching Preferences</h1>
          <p className="text-slate-500 mt-1">Tell us what jobs you want — we'll only send you the right ones</p>
        </div>

        <div className="space-y-5">
          {/* Service Categories */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Wrench className="w-4 h-4" /> Services You Offer</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {SERVICE_CATEGORIES.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleService(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedServices.includes(s)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    {selectedServices.includes(s) && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {s}
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-400 mt-2">{selectedServices.length} selected</div>
            </CardContent>
          </Card>

          {/* Job Types */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Sliders className="w-4 h-4" /> Job Types</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => toggleJobType(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedJobTypes.includes(t)
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-green-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Numeric Preferences */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><DollarSign className="w-4 h-4" /> Job Parameters</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Min Job Value ($)</label>
                  <Input type="number" value={minJobValue} onChange={e => setMinJobValue(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Max Radius (miles)</label>
                  <Input type="number" value={maxRadius} onChange={e => setMaxRadius(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Max Jobs/Week</label>
                  <Input type="number" value={maxJobsPerWeek} onChange={e => setMaxJobsPerWeek(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Toggles */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4" /> Availability</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Accept Emergency Jobs", sub: "24-48 hour turnaround, 50% premium", value: emergencyJobs, set: setEmergencyJobs },
                { label: "Accept Weekend Jobs", sub: "Saturday and Sunday availability", value: weekendJobs, set: setWeekendJobs },
              ].map(toggle => (
                <div key={toggle.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-slate-800">{toggle.label}</div>
                    <div className="text-xs text-slate-500">{toggle.sub}</div>
                  </div>
                  <button
                    onClick={() => toggle.set(!toggle.value)}
                    className={`w-11 h-6 rounded-full transition-all ${toggle.value ? "bg-indigo-600" : "bg-slate-300"}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-all mx-1 ${toggle.value ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button onClick={save} disabled={saveMutation.isPending} className="w-full bg-indigo-600 hover:bg-indigo-700 py-5">
            {saveMutation.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : saved ? <><CheckCircle className="w-4 h-4 mr-2" /> Saved!</> : "Save Preferences"}
          </Button>
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
