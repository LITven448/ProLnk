import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, Loader2, Search, TrendingDown, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const POPULAR = [
  "Roof replacement", "AC replacement", "Foundation repair", "Kitchen remodel",
  "Bathroom remodel", "Fence installation", "Window replacement", "Flooring",
  "Exterior painting", "Pool installation", "Plumbing repair", "Electrical panel",
];

export default function TrueCostGuide() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = trpc.homeownerExtras.getTrueCostEstimate.useQuery(
    { service: search },
    { enabled: search.length > 2 }
  );

  const handleSearch = () => { if (query.trim().length > 2) setSearch(query.trim()); };

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">True Cost Guide</h1>
        <p className="text-muted-foreground mt-1">Real DFW pricing for home services — no surprises.</p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="e.g. Roof replacement, AC tune-up..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {data && (
        <Card className="border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg capitalize">{data.service}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1"><TrendingDown className="h-3 w-3" />Low</p>
                <p className="text-xl font-bold text-green-700 dark:text-green-400">${(data.low ?? 0).toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-2 border-blue-200">
                <p className="text-xs text-muted-foreground mb-1">Average</p>
                <p className="text-xl font-bold text-blue-700 dark:text-blue-400">${(data.avg ?? 0).toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1"><TrendingUp className="h-3 w-3" />High</p>
                <p className="text-xl font-bold text-orange-700 dark:text-orange-400">${(data.high ?? 0).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-1"><DollarSign className="h-3 w-3 inline mr-1" />{data.unit}</p>
            <p className="text-sm text-muted-foreground">{data.notes}</p>
            <Link href="/my-home/quick-quote">
              <Button className="w-full mt-4">Get a Free Quote from TrustyPro Partners</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div>
        <p className="text-sm font-medium mb-3">Popular Searches</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR.map(p => (
            <button key={p} onClick={() => { setQuery(p); setSearch(p); }}
              className="text-xs px-3 py-1.5 rounded-full border hover:bg-accent transition-colors">
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
    </HomeownerLayout>
  );
}
