import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Star, Phone, MapPin, Shield, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function HomeownerPros() {
  const { data: networkPartners, isLoading } = trpc.directory.getApprovedPartners.useQuery();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const partners = networkPartners ?? [];
  const categories = ["all", ...Array.from(new Set(partners.map((p: any) => p.serviceType).filter(Boolean)))];

  const filtered = partners.filter((p: any) => {
    const matchSearch = !search || p.businessName?.toLowerCase().includes(search.toLowerCase()) || p.serviceType?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.serviceType === category;
    return matchSearch && matchCat;
  });

  return (
    <HomeownerLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Pros Network</h1>
          <p className="text-muted-foreground">Verified, background-checked service professionals in your area</p>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Search by name or service…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(c => (
                <SelectItem key={c} value={c}>{c === "all" ? "All Categories" : c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading && <div className="py-8 text-center text-muted-foreground">Loading pros…</div>}

        {!isLoading && filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No pros found matching your search.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p: any) => (
            <Card key={p.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold">{p.businessName}</div>
                    <Badge className="mt-1 text-xs">{p.serviceType ?? "General"}</Badge>
                  </div>
                  {p.tier && (
                    <Badge className={p.tier === "Company" ? "bg-purple-100 text-purple-700" : p.tier === "Crew" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}>
                      {p.tier}
                    </Badge>
                  )}
                </div>

                {p.avgRating > 0 && (
                  <div className="flex items-center gap-1 text-sm mb-2">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{Number(p.avgRating).toFixed(1)}</span>
                    <span className="text-muted-foreground">({p.reviewCount ?? 0} reviews)</span>
                  </div>
                )}

                {p.serviceArea && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" /> {p.serviceArea}
                  </div>
                )}

                {p.isVerified && (
                  <div className="flex items-center gap-1 text-xs text-green-600 mb-3">
                    <Shield className="h-3 w-3" /> Background Checked
                  </div>
                )}

                {p.bio && <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{p.bio}</p>}

                <div className="flex gap-2">
                  {p.phone && (
                    <a href={`tel:${p.phone}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full gap-1">
                        <Phone className="h-3 w-3" /> Call
                      </Button>
                    </a>
                  )}
                  <Link href={`/directory/partner/${p.id}`} className="flex-1">
                    <Button size="sm" className="w-full gap-1">
                      <ExternalLink className="h-3 w-3" /> View
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </HomeownerLayout>
  );
}
