import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  MessageSquare, Clock, MapPin, Phone, Mail, AlertTriangle,
  CloudLightning, CheckCircle2, XCircle, DollarSign, Inbox, RefreshCw
} from "lucide-react";

const URGENCY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  emergency:   { label: "Emergency",    color: "text-red-400",    bg: "bg-red-500/10 border-red-500/30" },
  within_48h:  { label: "Within 48h",   color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" },
  this_week:   { label: "This Week",    color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
  flexible:    { label: "Flexible",     color: "text-green-400",  bg: "bg-green-500/10 border-green-500/30" },
};

export default function PartnerQuoteInbox() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [responseType, setResponseType] = useState<"quoted" | "declined" | null>(null);
  const [quotedAmount, setQuotedAmount] = useState("");
  const [partnerMessage, setPartnerMessage] = useState("");

  const { data: requests, isLoading, refetch } = trpc.quickQuote.getForPartner.useQuery(undefined, {
    refetchInterval: 60_000, // refresh every minute
  });

  const respondMutation = trpc.quickQuote.respond.useMutation({
    onSuccess: () => {
      toast.success(responseType === "quoted" ? "Quote sent to homeowner!" : "Request declined.");
      setSelectedRequest(null);
      setResponseType(null);
      setQuotedAmount("");
      setPartnerMessage("");
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleRespond = () => {
    if (!selectedRequest || !responseType) return;
    if (responseType === "quoted" && !quotedAmount) {
      toast.error("Please enter a quote amount.");
      return;
    }
    respondMutation.mutate({
      requestId: selectedRequest.id,
      response: responseType,
      quotedAmount: quotedAmount ? parseFloat(quotedAmount) : undefined,
      partnerResponse: partnerMessage || undefined,
    });
  };

  const pending = requests?.filter(r => r.status === "pending" || r.status === "sent") ?? [];
  const responded = requests?.filter(r => r.status === "quoted" || r.status === "declined") ?? [];

  return (
    <PartnerLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Inbox className="w-6 h-6 text-teal-400" />
              Quote Request Inbox
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Homeowners in your service area requesting quotes
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2 text-slate-300 border-slate-600">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-teal-400">{pending.length}</div>
              <div className="text-xs text-slate-400 mt-1">Awaiting Response</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {responded.filter(r => r.status === "quoted").length}
              </div>
              <div className="text-xs text-slate-400 mt-1">Quotes Sent</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-300">{requests?.length ?? 0}</div>
              <div className="text-xs text-slate-400 mt-1">Total Received</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending requests */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Needs Your Response
            {pending.length > 0 && (
              <Badge className="ml-2 bg-teal-500/20 text-teal-400 border-teal-500/30">{pending.length}</Badge>
            )}
          </h2>

          {isLoading && (
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-32 bg-slate-800/50 rounded-xl animate-pulse" />
              ))}
            </div>
          )}

          {!isLoading && pending.length === 0 && (
            <Card className="bg-slate-800/30 border-slate-700 border-dashed">
              <CardContent className="p-8 text-center">
                <Inbox className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No pending quote requests in your service area.</p>
                <p className="text-slate-500 text-sm mt-1">
                  Make sure your service zip codes are set in Settings → Service Area.
                </p>
              </CardContent>
            </Card>
          )}

          {pending.map(req => {
            const urgency = URGENCY_CONFIG[req.urgency] ?? URGENCY_CONFIG.flexible;
            const photos: string[] = Array.isArray(req.photoUrls) ? req.photoUrls : [];
            return (
              <Card key={req.id} className={`bg-slate-800/50 border ${urgency.bg} hover:border-teal-500/50 transition-colors cursor-pointer`}
                onClick={() => setSelectedRequest(req)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge className={`${urgency.bg} ${urgency.color} border text-xs`}>
                          {req.urgency === "emergency" && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {urgency.label}
                        </Badge>
                        {req.isWeatherRelated && (
                          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                            <CloudLightning className="w-3 h-3 mr-1" />
                            Weather Related
                          </Badge>
                        )}
                        <span className="text-xs text-slate-500">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-semibold text-white text-sm">{req.serviceCategory}</h3>
                      <p className="text-slate-400 text-sm mt-1 line-clamp-2">{req.serviceDescription}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {req.propertyAddress} ({req.propertyZipCode})
                        </span>
                        {photos.length > 0 && (
                          <span className="text-teal-400">{photos.length} photo{photos.length > 1 ? "s" : ""}</span>
                        )}
                      </div>
                    </div>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-500 text-white shrink-0"
                      onClick={(e) => { e.stopPropagation(); setSelectedRequest(req); setResponseType("quoted"); }}>
                      Respond
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Responded requests */}
        {responded.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white text-slate-400">Already Responded</h2>
            {responded.map(req => (
              <Card key={req.id} className="bg-slate-800/30 border-slate-700 opacity-70">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-300 text-sm">{req.serviceCategory}</h3>
                      <p className="text-slate-500 text-xs mt-0.5">{req.propertyAddress}</p>
                    </div>
                    <Badge className={req.status === "quoted"
                      ? "bg-green-500/10 text-green-400 border-green-500/30"
                      : "bg-slate-500/10 text-slate-400 border-slate-500/30"}>
                      {req.status === "quoted" ? (
                        <><CheckCircle2 className="w-3 h-3 mr-1" />Quoted</>
                      ) : (
                        <><XCircle className="w-3 h-3 mr-1" />Declined</>
                      )}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Response Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => { if (!open) { setSelectedRequest(null); setResponseType(null); setQuotedAmount(""); setPartnerMessage(""); } }}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">
              {selectedRequest?.serviceCategory}
            </DialogTitle>
            <CardDescription className="text-slate-400">
              {selectedRequest?.propertyAddress} · {selectedRequest?.propertyZipCode}
            </CardDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              {/* Request details */}
              <div className="bg-slate-800 rounded-lg p-3 space-y-2 text-sm">
                <p className="text-slate-300">{selectedRequest.serviceDescription}</p>
                <div className="flex items-center gap-4 text-slate-400 text-xs pt-1">
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{selectedRequest.homeownerPhone || "Not provided"}</span>
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{selectedRequest.homeownerEmail}</span>
                </div>
              </div>

              {/* Photos */}
              {Array.isArray(selectedRequest.photoUrls) && selectedRequest.photoUrls.length > 0 && (
                <div>
                  <p className="text-xs text-slate-400 mb-2">Attached Photos</p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedRequest.photoUrls.map((url: string, i: number) => (
                      <img key={i} src={url} alt={`Photo ${i+1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-slate-600 cursor-pointer hover:opacity-80"
                        onClick={() => window.open(url, '_blank')} />
                    ))}
                  </div>
                </div>
              )}

              {/* Response type selector */}
              <div className="flex gap-2">
                <Button
                  variant={responseType === "quoted" ? "default" : "outline"}
                  className={responseType === "quoted" ? "flex-1 bg-teal-600 hover:bg-teal-500" : "flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"}
                  onClick={() => setResponseType("quoted")}>
                  <DollarSign className="w-4 h-4 mr-1" />
                  Send a Quote
                </Button>
                <Button
                  variant={responseType === "declined" ? "default" : "outline"}
                  className={responseType === "declined" ? "flex-1 bg-slate-600" : "flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"}
                  onClick={() => setResponseType("declined")}>
                  <XCircle className="w-4 h-4 mr-1" />
                  Decline
                </Button>
              </div>

              {responseType === "quoted" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Estimated Quote Amount ($)</label>
                    <Input
                      type="number"
                      placeholder="e.g. 350"
                      value={quotedAmount}
                      onChange={e => setQuotedAmount(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Message to Homeowner (optional)</label>
                    <Textarea
                      placeholder="Hi! I'd be happy to help with your project. Here's what I can offer..."
                      value={partnerMessage}
                      onChange={e => setPartnerMessage(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {responseType === "declined" && (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Reason (optional)</label>
                  <Textarea
                    placeholder="Outside my service area, fully booked, etc."
                    value={partnerMessage}
                    onChange={e => setPartnerMessage(e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white resize-none"
                    rows={2}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setSelectedRequest(null); setResponseType(null); }}
              className="border-slate-600 text-slate-300">
              Cancel
            </Button>
            <Button
              onClick={handleRespond}
              disabled={!responseType || respondMutation.isPending}
              className="bg-teal-600 hover:bg-teal-500 text-white">
              {respondMutation.isPending ? "Sending..." : responseType === "quoted" ? "Send Quote" : "Decline Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PartnerLayout>
  );
}
