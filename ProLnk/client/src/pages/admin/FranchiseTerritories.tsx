import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n ?? 0));
}

export default function FranchiseTerritories() {
  const { data, isLoading } = trpc.adminExtras.getFranchiseTerritoryData.useQuery();
  const territories = data ?? [];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Franchise Territories</h1>
          <p className="text-muted-foreground">Partners with defined zip code territories and their coverage</p>
        </div>
        <Card>
          <CardHeader><CardTitle>Territory Assignments</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-muted-foreground"><th className="text-left py-2">Partner</th><th className="text-left py-2">Tier</th><th className="text-right py-2">Zip Codes</th><th className="text-right py-2">Max Allowed</th><th className="text-right py-2">Jobs</th><th className="text-right py-2">Revenue</th></tr></thead>
                <tbody>
                  {territories.map((t: any) => {
                    let zipCount = 0;
                    try { zipCount = JSON.parse(t.serviceZipCodes ?? "[]").length; } catch {}
                    return (
                      <tr key={t.id} className="border-b hover:bg-muted/20">
                        <td className="py-2 font-medium">{t.businessName}</td>
                        <td className="py-2"><Badge>{t.tier}</Badge></td>
                        <td className="py-2 text-right font-mono">{zipCount}</td>
                        <td className="py-2 text-right text-muted-foreground">{t.maxZipCodes ?? "—"}</td>
                        <td className="py-2 text-right">{t.jobsLogged}</td>
                        <td className="py-2 text-right text-green-600">{fmt(t.totalCommissionEarned)}</td>
                      </tr>
                    );
                  })}
                  {territories.length === 0 && !isLoading && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No partners have defined zip code territories yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
