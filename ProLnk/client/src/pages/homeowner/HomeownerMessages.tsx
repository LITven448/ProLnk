import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { MessageSquare, Phone, Mail, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function HomeownerMessages() {
  const { data: deals, isLoading } = trpc.homeowner.getMyDeals.useQuery();
  const [search, setSearch] = useState("");

  const activeDeals = (deals ?? []).filter((d: any) => d.status === "active" || d.status === "pending");
  const filtered = activeDeals.filter((d: any) =>
    !search || d.partnerName?.toLowerCase().includes(search.toLowerCase()) || d.serviceType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <HomeownerLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Contact your service pros for active jobs</p>
        </div>

        <div className="relative">
          <Input
            placeholder="Search by pro name or service…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-4"
          />
        </div>

        {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}

        {!isLoading && activeDeals.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
              <div className="text-muted-foreground">No active jobs right now.</div>
              <div className="text-sm text-muted-foreground mt-1">Once you hire a pro, you can contact them here.</div>
              <Link href="/my-home/request-pro">
                <Button className="mt-4">Find a Pro</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {filtered.map((deal: any) => (
            <Card key={deal.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{deal.partnerName ?? "Your Pro"}</span>
                      <Badge className="bg-blue-100 text-blue-700">{deal.serviceType ?? "Service"}</Badge>
                      <Badge className={deal.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>{deal.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Job started: {deal.createdAt ? new Date(deal.createdAt).toLocaleDateString() : "—"}
                    </div>
                    {deal.partnerPhone && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Phone className="h-3 w-3" /> {deal.partnerPhone}
                      </div>
                    )}
                    {deal.partnerEmail && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <Mail className="h-3 w-3" /> {deal.partnerEmail}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    {deal.partnerPhone && (
                      <a href={`tel:${deal.partnerPhone}`}>
                        <Button size="sm" variant="outline" className="gap-1 w-full">
                          <Phone className="h-3 w-3" /> Call
                        </Button>
                      </a>
                    )}
                    {deal.partnerEmail && (
                      <a href={`mailto:${deal.partnerEmail}`}>
                        <Button size="sm" variant="outline" className="gap-1 w-full">
                          <Mail className="h-3 w-3" /> Email
                        </Button>
                      </a>
                    )}
                    {deal.partnerId && (
                      <Link href={`/directory/partner/${deal.partnerId}`}>
                        <Button size="sm" variant="ghost" className="gap-1 w-full">
                          <ExternalLink className="h-3 w-3" /> Profile
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </HomeownerLayout>
  );
}
