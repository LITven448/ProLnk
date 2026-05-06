import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileSearch } from "lucide-react";


export default function LeadDetail() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileSearch className="h-6 w-6 text-teal-400" />
            Lead Details
          </h1>
          <p className="text-slate-400 mt-1">Complete lead information with photos, findings, and homeowner data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-amber-500/20 text-amber-400">In Development</Badge>
              <p className="text-sm text-slate-400 mt-2">This feature is being built as part of the platform expansion.</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-teal-500/20 text-teal-400">Lead Management</Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Planned Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              
              <div className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Homeowner Profile</p>
                  <p className="text-xs text-slate-400 mt-0.5">Contact info, property details, and communication history</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">AI Findings</p>
                  <p className="text-xs text-slate-400 mt-0.5">Detailed analysis with severity scores and cost estimates</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Photo Gallery</p>
                  <p className="text-xs text-slate-400 mt-0.5">All photos from the homeowner scan with annotations</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Action Buttons</p>
                  <p className="text-xs text-slate-400 mt-0.5">Claim lead, schedule visit, send quote, or pass to next pro</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
