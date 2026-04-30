import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminLayout from "@/components/AdminLayout";
import { FlaskConical, CheckCircle, Play, Pause, BarChart2, Plus, X } from "lucide-react";
import { toast } from "sonner";

const TESTS = [
  {
    id: 1,
    name: "Partner Landing Page CTA",
    status: "running",
    startDate: "Mar 20, 2026",
    variants: [
      { name: "Control", label: "Join as a Partner", conversions: 142, visitors: 1840, rate: 7.7 },
      { name: "Variant A", label: "Start Earning Today", conversions: 189, visitors: 1820, rate: 10.4 },
    ],
    winner: "Variant A",
    confidence: 94,
    metric: "Application Started",
  },
  {
    id: 2,
    name: "Homeowner Onboarding Email Subject",
    status: "running",
    startDate: "Apr 1, 2026",
    variants: [
      { name: "Control", label: "Welcome to ProLnk", conversions: 88, visitors: 620, rate: 14.2 },
      { name: "Variant A", label: "Your home is protected — here's what's next", conversions: 104, visitors: 614, rate: 16.9 },
    ],
    winner: null,
    confidence: 71,
    metric: "Email Open Rate",
  },
  {
    id: 3,
    name: "Deal Acceptance Button Color",
    status: "paused",
    startDate: "Mar 10, 2026",
    variants: [
      { name: "Control", label: "Green (#22c55e)", conversions: 312, visitors: 2100, rate: 14.9 },
      { name: "Variant A", label: "Indigo (#6366f1)", conversions: 298, visitors: 2090, rate: 14.3 },
    ],
    winner: "Control",
    confidence: 88,
    metric: "Deal Accepted",
  },
];

const STATUS_COLORS: Record<string, string> = {
  running: "bg-green-100 text-green-700",
  paused: "bg-amber-100 text-amber-700",
  completed: "bg-slate-100 text-slate-600",
};

export default function ABTestManager() {
  const [tests, setTests] = useState(TESTS);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newMetric, setNewMetric] = useState("");
  const [controlLabel, setControlLabel] = useState("");
  const [variantLabel, setVariantLabel] = useState("");

  const createTest = () => {
    if (!newName || !controlLabel || !variantLabel) { toast.error("Fill in all required fields"); return; }
    const newTest = {
      id: Date.now(),
      name: newName,
      status: "running",
      startDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      variants: [
        { name: "Control", label: controlLabel, conversions: 0, visitors: 0, rate: 0 },
        { name: "Variant A", label: variantLabel, conversions: 0, visitors: 0, rate: 0 },
      ],
      winner: null,
      confidence: 0,
      metric: newMetric || "Conversion Rate",
    };
    setTests(prev => [newTest, ...prev]);
    setShowNew(false);
    setNewName(""); setNewMetric(""); setControlLabel(""); setVariantLabel("");
    toast.success("Test created and running!");
  };

  const toggleStatus = (id: number) => {
    setTests(prev => prev.map(t => t.id === id ? { ...t, status: t.status === "running" ? "paused" : "running" } : t));
    toast.success("Test status updated");
  };

  const declareWinner = (id: number, winner: string) => {
    toast.success(`Winner declared: ${winner}. Shipping to 100% of traffic.`);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">A/B Test Manager</h1>
            <p className="text-muted-foreground text-sm mt-1">Run experiments to optimize conversion rates</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setShowNew(true)}>
            <Plus className="w-4 h-4 mr-2" /> New Test
          </Button>
        </div>

        <div className="space-y-5">
          {tests.map(test => {
            const leader = test.variants.reduce((a, b) => a.rate > b.rate ? a : b);
            const isSignificant = test.confidence >= 90;
            return (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{test.name}</CardTitle>
                        <Badge className={`text-xs ${STATUS_COLORS[test.status]}`}>{test.status}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">Started {test.startDate} · Metric: {test.metric}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs" onClick={() => toggleStatus(test.id)}>
                        {test.status === "running" ? <><Pause className="w-3 h-3 mr-1" /> Pause</> : <><Play className="w-3 h-3 mr-1" /> Resume</>}
                      </Button>
                      {isSignificant && !test.winner && (
                        <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700" onClick={() => declareWinner(test.id, leader.name)}>
                          <CheckCircle className="w-3 h-3 mr-1" /> Ship Winner
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {test.variants.map(v => {
                      const isLeader = v.name === leader.name;
                      const isWinner = v.name === test.winner;
                      return (
                        <div key={v.name} className={`p-3 rounded-xl border ${isWinner ? "border-green-300 bg-green-50/30" : isLeader && !test.winner ? "border-indigo-200 bg-indigo-50/20" : "border-border"}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-xs font-semibold text-foreground">{v.name}</div>
                              <div className="text-xs text-muted-foreground">"{v.label}"</div>
                            </div>
                            {isWinner && <Badge className="text-xs bg-green-100 text-green-700">Winner</Badge>}
                            {isLeader && !test.winner && <Badge className="text-xs bg-indigo-100 text-indigo-700">Leading</Badge>}
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div><div className="text-lg font-bold">{v.rate}%</div><div className="text-xs text-muted-foreground">Conv. Rate</div></div>
                            <div><div className="text-lg font-bold">{v.conversions}</div><div className="text-xs text-muted-foreground">Conversions</div></div>
                            <div><div className="text-lg font-bold">{v.visitors.toLocaleString()}</div><div className="text-xs text-muted-foreground">Visitors</div></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={`flex items-center gap-2 text-sm p-2 rounded-lg ${isSignificant ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                    {isSignificant ? <CheckCircle className="w-4 h-4" /> : <BarChart2 className="w-4 h-4" />}
                    <span>Statistical confidence: <strong>{test.confidence}%</strong> {isSignificant ? "— significant result, safe to ship" : "— need more data (target: 90%)"}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><FlaskConical className="w-4 h-4" /> Create New A/B Test</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Test Name *</label>
              <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Partner CTA Button Color" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Primary Metric</label>
              <Input value={newMetric} onChange={e => setNewMetric(e.target.value)} placeholder="e.g. Application Started, Click Rate" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Control Variant Label *</label>
              <Input value={controlLabel} onChange={e => setControlLabel(e.target.value)} placeholder="e.g. Join as a Partner" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Variant A Label *</label>
              <Input value={variantLabel} onChange={e => setVariantLabel(e.target.value)} placeholder="e.g. Start Earning Today" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowNew(false)}><X className="w-4 h-4 mr-1" /> Cancel</Button>
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700" onClick={createTest}><Plus className="w-4 h-4 mr-1" /> Create Test</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
