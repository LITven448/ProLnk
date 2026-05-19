import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, AlertTriangle, Clock, Users } from "lucide-react";

const pendingQueue = [
  { name: "Marcus Johnson", trade: "Plumber", applied: "May 12", status: "Pending", days: 3 },
  { name: "Derek Williams", trade: "Electrician", applied: "May 11", status: "In Review", days: 4 },
  { name: "Samantha Torres", trade: "HVAC", applied: "May 10", status: "Pending", days: 5 },
  { name: "Brian Nguyen", trade: "Roofer", applied: "May 9", status: "In Review", days: 6 },
  { name: "Kevin Smith", trade: "Painter", applied: "May 8", status: "Pending", days: 7 },
  { name: "Rachel Green", trade: "Landscaper", applied: "May 7", status: "Pending", days: 8 },
  { name: "James Carter", trade: "Handyman", applied: "May 6", status: "In Review", days: 9 },
  { name: "Olivia Brown", trade: "Locksmith", applied: "May 5", status: "Pending", days: 10 },
];

const recentResults = [
  { name: "Tyler Adams", result: "Clear", checkType: "Criminal", completed: "May 13", validThrough: "May 2027" },
  { name: "Nina Patel", result: "Clear", checkType: "Criminal + MVR", completed: "May 12", validThrough: "May 2027" },
  { name: "Ethan Moore", result: "Flagged", checkType: "Criminal", completed: "May 11", validThrough: "—" },
  { name: "Jasmine Lee", result: "Clear", checkType: "ID Verification", completed: "May 11", validThrough: "May 2027" },
  { name: "Carlos Reyes", result: "Clear", checkType: "Criminal + MVR", completed: "May 10", validThrough: "May 2027" },
  { name: "Amber Wilson", result: "Clear", checkType: "Criminal", completed: "May 9", validThrough: "May 2027" },
  { name: "Darius King", result: "Flagged", checkType: "MVR", completed: "May 8", validThrough: "—" },
  { name: "Priya Sharma", result: "Clear", checkType: "Criminal", completed: "May 7", validThrough: "May 2027" },
  { name: "Liam Foster", result: "Clear", checkType: "ID Verification", completed: "May 6", validThrough: "May 2027" },
  { name: "Maya Johnson", result: "Clear", checkType: "Criminal + MVR", completed: "May 5", validThrough: "May 2027" },
];

const statusBadge = (status: string) => {
  if (status === "In Review") return <Badge className="bg-blue-500/20 text-blue-400">In Review</Badge>;
  return <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>;
};

export default function BackgroundChecks() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="h-6 w-6 text-teal-400" />
              Background Checks
            </h1>
            <p className="text-slate-400 mt-1">Pro Verification</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <Users className="h-4 w-4 mr-2" />
            Run Bulk Check
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Checked", value: 147, color: "text-teal-400", Icon: Shield },
            { label: "Pending", value: 8, color: "text-yellow-400", Icon: Clock },
            { label: "Passed", value: 134, color: "text-green-400", Icon: CheckCircle },
            { label: "Failed", value: 5, color: "text-red-400", Icon: AlertTriangle },
          ].map(({ label, value, color, Icon }) => (
            <Card key={label} className="bg-slate-800/60 border-slate-700">
              <CardContent className="pt-5">
                <div className="flex items-center gap-3">
                  <Icon className={`h-8 w-8 ${color}`} />
                  <div>
                    <p className={`text-2xl font-bold ${color}`}>{value}</p>
                    <p className="text-xs text-slate-400">{label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-400" />
              Verification Queue
              <Badge className="bg-yellow-500/20 text-yellow-400 ml-1">{pendingQueue.length} pending</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-700">
                    <th className="pb-2 pr-4">Pro Name</th>
                    <th className="pb-2 pr-4">Trade</th>
                    <th className="pb-2 pr-4">Applied</th>
                    <th className="pb-2 pr-4">Status</th>
                    <th className="pb-2 pr-4">Days Waiting</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody>
                  {pendingQueue.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50 last:border-0">
                      <td className="py-2.5 pr-4 text-white font-medium">{row.name}</td>
                      <td className="py-2.5 pr-4 text-slate-300">{row.trade}</td>
                      <td className="py-2.5 pr-4 text-slate-400 text-xs">{row.applied}</td>
                      <td className="py-2.5 pr-4">{statusBadge(row.status)}</td>
                      <td className="py-2.5 pr-4">
                        <span className={row.days >= 7 ? "text-red-400" : "text-slate-400"}>
                          {row.days}d
                        </span>
                      </td>
                      <td className="py-2.5">
                        <Button size="sm" className="h-7 text-xs bg-teal-600 hover:bg-teal-700 text-white">
                          Run Check
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-base">Recent Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-700">
                    <th className="pb-2 pr-4">Pro Name</th>
                    <th className="pb-2 pr-4">Result</th>
                    <th className="pb-2 pr-4">Check Type</th>
                    <th className="pb-2 pr-4">Completed</th>
                    <th className="pb-2 pr-4">Valid Through</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody>
                  {recentResults.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50 last:border-0">
                      <td className="py-2.5 pr-4 text-white font-medium">{row.name}</td>
                      <td className="py-2.5 pr-4">
                        {row.result === "Clear" ? (
                          <span className="flex items-center gap-1 text-green-400">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Clear
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-400">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            Flagged
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 pr-4 text-slate-300 text-xs">{row.checkType}</td>
                      <td className="py-2.5 pr-4 text-slate-400 text-xs">{row.completed}</td>
                      <td className="py-2.5 pr-4 text-slate-400 text-xs">{row.validThrough}</td>
                      <td className="py-2.5">
                        <Button size="sm" variant="outline" className="h-7 text-xs border-slate-600 text-slate-300 hover:bg-slate-700">
                          View Report
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Check Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Criminal History",
                price: "$29.99",
                desc: "County, state, and federal criminal record search. Covers felonies, misdemeanors, and sex offender registry.",
                icon: Shield,
                color: "text-red-400",
                bg: "bg-red-500/10",
              },
              {
                title: "Motor Vehicle Record",
                price: "$9.99",
                desc: "Driving history including violations, suspensions, and DUI records for pros who drive to job sites.",
                icon: AlertTriangle,
                color: "text-yellow-400",
                bg: "bg-yellow-500/10",
              },
              {
                title: "Identity Verification",
                price: "$4.99",
                desc: "SSN trace and identity validation to confirm the pro is who they claim to be.",
                icon: CheckCircle,
                color: "text-teal-400",
                bg: "bg-teal-500/10",
              },
            ].map(({ title, price, desc, icon: Icon, color, bg }) => (
              <Card key={title} className="bg-slate-800/60 border-slate-700">
                <CardContent className="pt-5">
                  <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div className="flex items-baseline justify-between mb-2">
                    <p className="text-white font-semibold">{title}</p>
                    <span className={`text-lg font-bold ${color}`}>{price}</span>
                  </div>
                  <p className="text-xs text-slate-400">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-slate-800/60 border-slate-700 border-l-4 border-l-teal-500">
          <CardContent className="pt-5">
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="text-white font-semibold">ProLnk requires a clear criminal background check</span> for all
              active partners. Checks are processed via Checkr and renewed annually. Partners with flagged results are
              placed in a manual review queue before activation.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
