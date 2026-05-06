import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";


export default function PhotoGuide() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Camera className="h-6 w-6 text-teal-400" />
            How to Take Great Job Photos
          </h1>
          <p className="text-slate-400 mt-1">Tips and best practices for capturing professional job photos</p>
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
              <Badge className="bg-teal-500/20 text-teal-400">Training</Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Planned Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              
              <div key="0" className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Lighting Tips</p>
                  <p className="text-xs text-slate-400 mt-0.5">How to get the best lighting for indoor and outdoor photos</p>
                </div>
              </div>
              <div key="1" className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Composition</p>
                  <p className="text-xs text-slate-400 mt-0.5">Framing techniques for before/after and detail shots</p>
                </div>
              </div>
              <div key="2" className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Equipment</p>
                  <p className="text-xs text-slate-400 mt-0.5">Recommended phone settings and accessories</p>
                </div>
              </div>
              <div key="3" className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Examples</p>
                  <p className="text-xs text-slate-400 mt-0.5">Gallery of excellent job photos from top partners</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
