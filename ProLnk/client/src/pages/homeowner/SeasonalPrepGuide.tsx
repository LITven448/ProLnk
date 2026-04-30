import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Leaf, Sun, Snowflake, Wind, DollarSign, Wrench, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const SEASON_ICONS = { spring: Leaf, summer: Sun, fall: Wind, winter: Snowflake };
const SEASON_COLORS: Record<string, string> = {
  spring: "text-green-600", summer: "text-yellow-600", fall: "text-orange-600", winter: "text-blue-600"
};
const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

type Season = "spring" | "summer" | "fall" | "winter";

export default function SeasonalPrepGuide() {
  const now = new Date();
  const month = now.getMonth();
  const defaultSeason: Season = month >= 2 && month <= 4 ? "spring" : month >= 5 && month <= 7 ? "summer" : month >= 8 && month <= 10 ? "fall" : "winter";
  const [season, setSeason] = useState<Season>(defaultSeason);
  const { data, isLoading } = trpc.homeownerExtras.getSeasonalPrepGuide.useQuery({ season });

  const SeasonIcon = SEASON_ICONS[season];

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Seasonal Prep Guide</h1>
        <p className="text-muted-foreground mt-1">DFW-specific home maintenance checklist by season.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["spring", "summer", "fall", "winter"] as Season[]).map(s => {
          const Icon = SEASON_ICONS[s];
          return (
            <Button key={s} variant={season === s ? "default" : "outline"} size="sm" onClick={() => setSeason(s)} className="capitalize">
              <Icon className="h-3.5 w-3.5 mr-1.5" />{s}
            </Button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : (
        <>
          {data?.tip && (
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-4">
                <p className="text-sm font-medium flex items-start gap-2">
                  <SeasonIcon className={`h-4 w-4 mt-0.5 shrink-0 ${SEASON_COLORS[season]}`} />
                  {data.tip}
                </p>
              </CardContent>
            </Card>
          )}
          <div className="space-y-3">
            {(data?.checklist ?? []).map((item: any, i: number) => (
              <Card key={i}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{item.task}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[item.priority]}`}>{item.priority}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Wrench className="h-3 w-3" />{item.category}</span>
                        <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{item.estimatedCost}</span>
                        {item.diy && <span className="flex items-center gap-1 text-green-600"><CheckCircle className="h-3 w-3" />DIY Possible</span>}
                      </div>
                    </div>
                    {!item.diy && (
                      <Link href="/my-home/quick-quote">
                        <Button size="sm" variant="outline" className="shrink-0">Get Quote</Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
    </HomeownerLayout>
  );
}
