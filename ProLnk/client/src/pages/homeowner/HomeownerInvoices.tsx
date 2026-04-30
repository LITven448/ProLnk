import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { FileText, Download, DollarSign, Clock, CheckCircle } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(Number(n ?? 0) / 100);
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-600",
};

export default function HomeownerInvoices() {
  const { data: deals, isLoading } = trpc.homeowner.getMyDeals.useQuery();
  const { data: milestones } = trpc.payments.getMilestonesForDeal.useQuery({ dealId: 0 }, { enabled: false });

  const allDeals = deals ?? [];
  const totalPaid = allDeals.filter((d: any) => d.status === "completed").reduce((s: number, d: any) => s + Number(d.jobValueCents ?? 0), 0);
  const totalPending = allDeals.filter((d: any) => d.status === "active").reduce((s: number, d: any) => s + Number(d.jobValueCents ?? 0), 0);

  return (
    <HomeownerLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Invoices</h1>
          <p className="text-muted-foreground">Payment history and outstanding balances for all your home service jobs</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Total Paid</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{fmt(totalPaid)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <div className="text-2xl font-bold text-amber-600">{fmt(totalPending)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Total Jobs</span>
              </div>
              <div className="text-2xl font-bold">{allDeals.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading invoices…</div>}
            {!isLoading && allDeals.length === 0 && (
              <div className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                <div className="text-muted-foreground">No invoices yet. Once you hire a pro, your invoices will appear here.</div>
              </div>
            )}
            <div className="space-y-3">
              {allDeals.map((deal: any) => (
                <div key={deal.id} className="border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{deal.serviceType ?? "Home Service"}</span>
                        <Badge className={STATUS_COLORS[deal.status] ?? "bg-gray-100 text-gray-700"}>{deal.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {deal.partnerName && <span>Pro: {deal.partnerName} · </span>}
                        {deal.createdAt && <span>{new Date(deal.createdAt).toLocaleDateString()}</span>}
                      </div>
                      {deal.notes && <div className="text-sm text-muted-foreground mt-1 italic">"{deal.notes}"</div>}
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold">{fmt(deal.jobValueCents ?? 0)}</div>
                      {deal.stripePaymentIntentId && (
                        <Button variant="ghost" size="sm" className="text-xs mt-1 gap-1">
                          <Download className="h-3 w-3" /> Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </HomeownerLayout>
  );
}
