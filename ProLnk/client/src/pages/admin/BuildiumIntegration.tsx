import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, RefreshCw, CheckCircle, XCircle, Building2, Wrench } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function BuildiumIntegration() {
  const statusQuery = trpc.buildium.status.useQuery();
  const workOrdersQuery = trpc.buildium.getWorkOrders.useQuery(undefined, {
    enabled: statusQuery.data?.configured === true,
  });
  const vendorsQuery = trpc.buildium.getVendors.useQuery(undefined, {
    enabled: statusQuery.data?.configured === true,
  });

  const assignMutation = trpc.buildium.assignVendor.useMutation({
    onSuccess: () => {
      toast.success("Vendor assigned — work order updated in Buildium");
      workOrdersQuery.refetch();
      setAssignDialog(null);
    },
    onError: (err) => {
      toast.error(`Assignment failed: ${err.message}`);
    },
  });

  const completeMutation = trpc.buildium.markComplete.useMutation({
    onSuccess: () => {
      toast.success("Work order completed — status updated in Buildium");
      workOrdersQuery.refetch();
      setCompleteDialog(null);
    },
    onError: (err) => {
      toast.error(`Completion failed: ${err.message}`);
    },
  });

  const [assignDialog, setAssignDialog] = useState<{ workOrderId: string; title: string } | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string>("");

  const [completeDialog, setCompleteDialog] = useState<{ workOrderId: string; title: string } | null>(null);
  const [completionNotes, setCompletionNotes] = useState("");

  const handleAssign = () => {
    if (!assignDialog || !selectedVendor) return;
    assignMutation.mutate({ workOrderId: assignDialog.workOrderId, vendorId: selectedVendor });
  };

  const handleComplete = () => {
    if (!completeDialog || !completionNotes.trim()) {
      toast.error("Completion notes required");
      return;
    }
    completeMutation.mutate({ workOrderId: completeDialog.workOrderId, notes: completionNotes });
  };

  if (statusQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (!statusQuery.data?.configured) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Alert>
          <Building2 className="h-5 w-5" />
          <AlertDescription>
            <strong>Buildium integration not configured.</strong> Add <code>BUILDIUM_CLIENT_ID</code> and{" "}
            <code>BUILDIUM_CLIENT_SECRET</code> in Settings → Secrets to enable work order sync.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const workOrders = workOrdersQuery.data?.workOrders ?? [];
  const vendors = vendorsQuery.data?.vendors ?? [];

  return (
    <AdminLayout>
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Buildium Integration</h1>
          <p className="text-gray-600 mt-1">Sync work orders and assign vendors</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            workOrdersQuery.refetch();
            vendorsQuery.refetch();
          }}
          disabled={workOrdersQuery.isLoading || vendorsQuery.isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Open Work Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{workOrders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Registered Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{vendors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Integration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="default" className="bg-green-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Work Orders</CardTitle>
          <CardDescription>Open work orders from Buildium property management system</CardDescription>
        </CardHeader>
        <CardContent>
          {workOrdersQuery.isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-teal-500" />
            </div>
          ) : workOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No open work orders found</div>
          ) : (
            <div className="space-y-4">
              {workOrders.map((wo: any) => (
                <div key={wo.buildiumId} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{wo.title}</h3>
                        <Badge variant={wo.status === "New" ? "default" : "secondary"}>{wo.status}</Badge>
                        <Badge variant="outline">{wo.priority}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{wo.description || "No description"}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>📍 {wo.propertyAddress}, {wo.propertyCity}, {wo.propertyState} {wo.propertyZip}</span>
                        <span>📅 {new Date(wo.createdAt).toLocaleDateString()}</span>
                      </div>
                      {wo.requestedByName && (
                        <div className="text-sm text-gray-500 mt-1">
                          Requested by: {wo.requestedByName} {wo.requestedByEmail && `(${wo.requestedByEmail})`}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setAssignDialog({ workOrderId: wo.buildiumId, title: wo.title })}
                      >
                        <Wrench className="h-4 w-4 mr-1" />
                        Assign Vendor
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-teal-500 hover:bg-teal-600"
                        onClick={() => setCompleteDialog({ workOrderId: wo.buildiumId, title: wo.title })}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registered Vendors</CardTitle>
          <CardDescription>Vendors from Buildium available for work order assignment</CardDescription>
        </CardHeader>
        <CardContent>
          {vendorsQuery.isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-teal-500" />
            </div>
          ) : vendors.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No vendors found</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendors.map((v: any) => (
                <div key={v.buildiumVendorId} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">{v.name}</h3>
                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    {v.email && <div>📧 {v.email}</div>}
                    {v.phone && <div>📞 {v.phone}</div>}
                    {v.category && <Badge variant="outline" className="mt-2">{v.category}</Badge>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assign Vendor Dialog */}
      <Dialog open={!!assignDialog} onOpenChange={(open) => !open && setAssignDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Vendor</DialogTitle>
            <DialogDescription>Select a vendor to assign to work order: {assignDialog?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={selectedVendor} onValueChange={setSelectedVendor}>
              <SelectTrigger>
                <SelectValue placeholder="Select vendor..." />
              </SelectTrigger>
              <SelectContent>
                {vendors.map((v: any) => (
                  <SelectItem key={v.buildiumVendorId} value={v.buildiumVendorId}>
                    {v.name} {v.category && `— ${v.category}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialog(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              disabled={!selectedVendor || assignMutation.isPending}
              className="bg-teal-500 hover:bg-teal-600"
            >
              {assignMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mark Complete Dialog */}
      <Dialog open={!!completeDialog} onOpenChange={(open) => !open && setCompleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Work Order Complete</DialogTitle>
            <DialogDescription>Work order: {completeDialog?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Enter completion notes..."
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompleteDialog(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleComplete}
              disabled={!completionNotes.trim() || completeMutation.isPending}
              className="bg-teal-500 hover:bg-teal-600"
            >
              {completeMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Mark Complete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </AdminLayout>
  );
}
