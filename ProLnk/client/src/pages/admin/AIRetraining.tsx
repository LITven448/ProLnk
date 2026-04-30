import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import {
  Brain, RefreshCw, CheckCircle, Clock, AlertTriangle,
  TrendingUp, Database, Camera, BarChart3, Zap,
  ChevronRight, Play, Pause, Download
} from "lucide-react";
import { toast } from "sonner";

const MODEL_VERSIONS = [
  { version: "v3.2.1", date: "2026-03-28", accuracy: 94.2, f1Score: 0.931, samples: 12400, status: "active", notes: "Added pool/spa detection, improved HVAC classification" },
  { version: "v3.1.0", date: "2026-02-14", accuracy: 91.8, f1Score: 0.908, samples: 9800, status: "archived", notes: "Baseline DFW model with 70 categories" },
  { version: "v3.0.0", date: "2026-01-01", accuracy: 88.4, f1Score: 0.871, samples: 6200, status: "archived", notes: "Initial production model" },
];

const TRAINING_QUEUE = [
  { category: "Roofing", newSamples: 342, totalSamples: 2840, priority: "high", lastUpdated: "2 days ago" },
  { category: "HVAC", newSamples: 218, totalSamples: 1920, priority: "high", lastUpdated: "3 days ago" },
  { category: "Pool Service", newSamples: 156, totalSamples: 980, priority: "medium", lastUpdated: "5 days ago" },
  { category: "Foundation", newSamples: 89, totalSamples: 640, priority: "medium", lastUpdated: "1 week ago" },
  { category: "Siding", newSamples: 67, totalSamples: 520, priority: "low", lastUpdated: "2 weeks ago" },
  { category: "Windows", newSamples: 45, totalSamples: 410, priority: "low", lastUpdated: "2 weeks ago" },
];

const FEEDBACK_CORRECTIONS = [
  { id: 1, original: "Roofing", corrected: "Gutters", confidence: 0.62, partner: "DFW Roofing Pros", date: "2026-04-01" },
  { id: 2, original: "HVAC", corrected: "Electrical", confidence: 0.71, partner: "Cool Air DFW", date: "2026-03-30" },
  { id: 3, original: "Lawn Care", corrected: "Tree Service", confidence: 0.58, partner: "Green Thumb Lawn", date: "2026-03-29" },
  { id: 4, original: "Concrete", corrected: "Foundation", confidence: 0.69, partner: "DFW Concrete Co", date: "2026-03-28" },
];

export default function AIRetraining() {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const { data: stats } = trpc.admin.getNetworkStats.useQuery();

  const handleStartTraining = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    toast.info("Training job queued", {
      description: "Model retraining will begin within 30 minutes. You'll receive a notification when complete.",
    });
    // Simulate progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          toast.success("Training complete", { description: "Model v3.3.0 is ready for review and deployment." });
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  const totalNewSamples = TRAINING_QUEUE.reduce((sum, q) => sum + q.newSamples, 0);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3">
              <Brain className="w-6 h-6 text-[#0A1628]" />AI Model Retraining
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Monitor model performance, review feedback corrections, and trigger retraining cycles.
            </p>
          </div>
          <Button
            className="bg-[#0A1628] text-white hover:bg-[#0A1628]/90"
            onClick={handleStartTraining}
            disabled={isTraining}
          >
            {isTraining ? (
              <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />Training... {trainingProgress}%</>
            ) : (
              <><Play className="w-4 h-4 mr-2" />Start Retraining</>
            )}
          </Button>
        </div>

        {/* Training Progress Bar */}
        {isTraining && (
          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">Training v3.3.0...</span>
                <span className="text-sm text-blue-600">{trainingProgress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${trainingProgress}%` }}
                />
              </div>
              <p className="text-xs text-blue-600 mt-2">Processing {totalNewSamples.toLocaleString()} new labeled samples across {TRAINING_QUEUE.length} categories</p>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Current Accuracy", value: "94.2%", icon: TrendingUp, color: "text-emerald-600" },
            { label: "New Samples", value: totalNewSamples.toLocaleString(), icon: Camera, color: "text-blue-600" },
            { label: "Feedback Corrections", value: FEEDBACK_CORRECTIONS.length, icon: CheckCircle, color: "text-amber-600" },
            { label: "Total Training Data", value: "12,400", icon: Database, color: "text-purple-600" },
          ].map((s) => (
            <Card key={s.label} className="border border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <s.icon className={`w-8 h-8 ${s.color} opacity-80`} />
                <div>
                  <div className="text-xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Model Versions */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Brain className="w-4 h-4" />Model Version History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MODEL_VERSIONS.map((model) => (
                <div key={model.version} className={`p-3 rounded-lg border ${model.status === "active" ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-sm text-gray-900">{model.version}</span>
                      {model.status === "active" && (
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">Active</Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{model.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-1">
                    <span>Accuracy: <strong>{model.accuracy}%</strong></span>
                    <span>F1: <strong>{model.f1Score}</strong></span>
                    <span>Samples: <strong>{model.samples.toLocaleString()}</strong></span>
                  </div>
                  <p className="text-xs text-gray-500">{model.notes}</p>
                  {model.status === "archived" && (
                    <Button size="sm" variant="outline" className="text-xs mt-2">
                      <RefreshCw className="w-3 h-3 mr-1" />Rollback to this version
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Training Queue */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Database className="w-4 h-4" />Training Queue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {TRAINING_QUEUE.map((item) => (
                <div key={item.category} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{item.category}</span>
                      <Badge className={
                        item.priority === "high" ? "bg-red-100 text-red-700 text-xs" :
                        item.priority === "medium" ? "bg-amber-100 text-amber-700 text-xs" :
                        "bg-gray-100 text-gray-600 text-xs"
                      }>{item.priority}</Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      +{item.newSamples} new / {item.totalSamples.toLocaleString()} total · {item.lastUpdated}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1.5">
                      <div
                        className="bg-[#0A1628] h-1 rounded-full"
                        style={{ width: `${Math.min((item.newSamples / item.totalSamples) * 100 * 3, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Feedback Corrections */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />Recent Feedback Corrections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-xs text-gray-500 font-medium">AI Predicted</th>
                    <th className="text-left py-2 text-xs text-gray-500 font-medium">Corrected To</th>
                    <th className="text-left py-2 text-xs text-gray-500 font-medium">Confidence</th>
                    <th className="text-left py-2 text-xs text-gray-500 font-medium">Partner</th>
                    <th className="text-left py-2 text-xs text-gray-500 font-medium">Date</th>
                    <th className="text-left py-2 text-xs text-gray-500 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {FEEDBACK_CORRECTIONS.map((fc) => (
                    <tr key={fc.id} className="border-b border-gray-50">
                      <td className="py-2.5">
                        <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-xs">{fc.original}</span>
                      </td>
                      <td className="py-2.5">
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs">{fc.corrected}</span>
                      </td>
                      <td className="py-2.5 text-xs text-gray-600">{(fc.confidence * 100).toFixed(0)}%</td>
                      <td className="py-2.5 text-xs text-gray-600">{fc.partner}</td>
                      <td className="py-2.5 text-xs text-gray-500">{fc.date}</td>
                      <td className="py-2.5">
                        <Button size="sm" variant="outline" className="text-xs h-6 px-2"
                          onClick={() => toast.success("Added to training set")}>
                          Add to Training
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
